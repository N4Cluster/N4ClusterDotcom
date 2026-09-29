import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, isHoneypotFilled } from "@/lib/rate-limit";
import { notificationRecipient, notificationSender, sendMail } from "@/lib/mail";
import {
  parseContactSubmission,
  type ContactSubmission,
} from "@/lib/validation";

/**
 * How long the lead-enrichment call may take before we give up on it.
 * The enrichment is a nice-to-have; the notification email is the thing that
 * must not be lost, so a slow ICP host must never hold the request open long
 * enough for the function itself to time out.
 */
const ICP_TIMEOUT_MS = 5_000;

interface IcpLeadResponse {
  icp_fit_label?: string;
  icp_total_score?: number;
  matched_restaurant_name?: string;
  is_independent?: boolean;
  has_delivery?: boolean;
}

async function postToIcpFinder(
  submission: ContactSubmission
): Promise<IcpLeadResponse | null> {
  const icpUrl = process.env.ICP_FINDER_API_URL;
  if (!icpUrl) return null;

  try {
    const res = await fetch(`${icpUrl}/api/v1/leads`, {
      method: "POST",
      signal: AbortSignal.timeout(ICP_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ICP_FINDER_API_KEY
          ? { "X-API-Key": process.env.ICP_FINDER_API_KEY }
          : {}),
      },
      body: JSON.stringify({
        first_name: submission.firstName,
        last_name: submission.lastName,
        email: submission.workEmail,
        company: submission.company,
        business_type: submission.businessType || undefined,
        locations: submission.locations || undefined,
        interest: submission.interest || undefined,
        message: submission.message || undefined,
        source: `website_${submission.formVariant}`,
        utm_source: submission.utm_source || undefined,
        utm_medium: submission.utm_medium || undefined,
        utm_campaign: submission.utm_campaign || undefined,
      }),
    });
    if (res.ok) return (await res.json()) as IcpLeadResponse;
    console.error(
      "ICP Finder lead creation failed:",
      res.status,
      await res.text()
    );
  } catch (err) {
    console.error("ICP Finder unreachable or too slow:", err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (isHoneypotFilled(body)) {
    // Silently accept — don't reveal bot detection
    return NextResponse.json({ ok: true });
  }

  // The browser validates too, but this endpoint is public: everything that
  // reaches an email header is validated and length-capped here.
  const parsed = parseContactSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const submission = parsed.data;

  // POST to ICP Finder for lead enrichment
  const icpResult = await postToIcpFinder(submission);

  const icpLines = icpResult
    ? [
        "\n--- ICP Enrichment ---",
        icpResult.icp_fit_label ? `Fit: ${icpResult.icp_fit_label}` : null,
        icpResult.icp_total_score != null
          ? `Score: ${icpResult.icp_total_score}`
          : null,
        icpResult.matched_restaurant_name
          ? `Matched: ${icpResult.matched_restaurant_name}`
          : null,
        icpResult.is_independent != null
          ? `Independent: ${icpResult.is_independent}`
          : null,
        icpResult.has_delivery != null
          ? `Delivery: ${icpResult.has_delivery}`
          : null,
      ].filter(Boolean)
    : [];

  const utmLines = submission.utm_source
    ? [
        "\n--- Attribution ---",
        `Source: ${submission.utm_source}`,
        submission.utm_medium ? `Medium: ${submission.utm_medium}` : null,
        submission.utm_campaign ? `Campaign: ${submission.utm_campaign}` : null,
        submission.utm_content ? `Content: ${submission.utm_content}` : null,
        submission.utm_term ? `Term: ${submission.utm_term}` : null,
      ].filter(Boolean)
    : [];

  const formLabels: Record<typeof submission.formVariant, string> = {
    contact: "Contact enquiry",
    demo: "Demo request",
    partner: "Partnership enquiry",
  };

  const lines = [
    `Form: ${formLabels[submission.formVariant]}`,
    `Name: ${submission.firstName} ${submission.lastName}`,
    `Email: ${submission.workEmail}`,
    `Company: ${submission.company}`,
    submission.businessType ? `Business type: ${submission.businessType}` : null,
    submission.locations ? `Locations: ${submission.locations}` : null,
    submission.interest ? `Interest: ${submission.interest}` : null,
    submission.message ? `\nMessage:\n${submission.message}` : null,
    ...utmLines,
    ...icpLines,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendMail({
      to: notificationRecipient(),
      from: notificationSender(),
      replyTo: submission.workEmail,
      subject: `${formLabels[submission.formVariant]} from ${submission.firstName} ${submission.lastName} - ${submission.company}`,
      body: lines,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Contact form mail error:", message, err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
