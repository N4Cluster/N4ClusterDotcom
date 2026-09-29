import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, isHoneypotFilled } from "@/lib/rate-limit";
import { notificationRecipient, notificationSender, sendMail } from "@/lib/mail";
import {
  parseNewsletterSubmission,
  type NewsletterSubmission,
} from "@/lib/validation";

/** Same reasoning as the contact route: enrichment must not delay the signup. */
const ICP_TIMEOUT_MS = 5_000;

async function postToIcpFinder(submission: NewsletterSubmission): Promise<void> {
  const icpUrl = process.env.ICP_FINDER_API_URL;
  if (!icpUrl) return;

  try {
    await fetch(`${icpUrl}/api/v1/leads`, {
      method: "POST",
      signal: AbortSignal.timeout(ICP_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ICP_FINDER_API_KEY
          ? { "X-API-Key": process.env.ICP_FINDER_API_KEY }
          : {}),
      },
      body: JSON.stringify({
        first_name: "Newsletter",
        last_name: "Subscriber",
        email: submission.email,
        source: "website_newsletter",
        utm_source: submission.utm_source || undefined,
        utm_medium: submission.utm_medium || undefined,
        utm_campaign: submission.utm_campaign || undefined,
      }),
    });
  } catch (err) {
    console.error("ICP Finder newsletter lead failed:", err);
  }
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
    return NextResponse.json({ ok: true });
  }

  const parsed = parseNewsletterSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const submission = parsed.data;

  // POST to ICP Finder for lead tracking
  await postToIcpFinder(submission);

  const emailBody = [
    "New newsletter subscription:",
    "",
    `Email: ${submission.email}`,
    `Date: ${new Date().toISOString()}`,
    ...(submission.utm_source
      ? [
          "",
          "--- Attribution ---",
          `Source: ${submission.utm_source}`,
          submission.utm_medium ? `Medium: ${submission.utm_medium}` : null,
          submission.utm_campaign ? `Campaign: ${submission.utm_campaign}` : null,
        ].filter((line): line is string => line !== null)
      : []),
  ].join("\n");

  try {
    await sendMail({
      to: notificationRecipient(),
      from: notificationSender(),
      subject: `New newsletter signup - ${submission.email}`,
      body: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Newsletter signup error:", message, err);
    return NextResponse.json(
      { ok: false, error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
