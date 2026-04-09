import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { isRateLimited, isHoneypotFilled } from "@/lib/rate-limit";

function createOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  return oauth2Client;
}

interface IcpLeadResponse {
  icp_fit_label?: string;
  icp_total_score?: number;
  matched_restaurant_name?: string;
  is_independent?: boolean;
  has_delivery?: boolean;
}

async function postToIcpFinder(
  body: Record<string, string | undefined>
): Promise<IcpLeadResponse | null> {
  const icpUrl = process.env.ICP_FINDER_API_URL;
  if (!icpUrl) return null;

  try {
    const res = await fetch(`${icpUrl}/api/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ICP_FINDER_API_KEY
          ? { "X-API-Key": process.env.ICP_FINDER_API_KEY }
          : {}),
      },
      body: JSON.stringify({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.workEmail,
        company: body.company,
        business_type: body.businessType,
        locations: body.locations,
        interest: body.interest,
        message: body.message,
        source: "website_demo",
        utm_source: body.utm_source || undefined,
        utm_medium: body.utm_medium || undefined,
        utm_campaign: body.utm_campaign || undefined,
      }),
    });
    if (res.ok) return (await res.json()) as IcpLeadResponse;
    console.error("ICP Finder lead creation failed:", res.status, await res.text());
  } catch (err) {
    console.error("ICP Finder unreachable:", err);
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

  const body = await req.json();

  if (isHoneypotFilled(body)) {
    // Silently accept — don't reveal bot detection
    return NextResponse.json({ ok: true });
  }

  const {
    firstName,
    lastName,
    workEmail,
    company,
    businessType,
    locations,
    interest,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
  } = body;

  // POST to ICP Finder for lead enrichment
  const icpResult = await postToIcpFinder(body);

  const icpLines = icpResult
    ? [
        "\n--- ICP Enrichment ---",
        icpResult.icp_fit_label ? `Fit: ${icpResult.icp_fit_label}` : null,
        icpResult.icp_total_score != null ? `Score: ${icpResult.icp_total_score}` : null,
        icpResult.matched_restaurant_name ? `Matched: ${icpResult.matched_restaurant_name}` : null,
        icpResult.is_independent != null ? `Independent: ${icpResult.is_independent}` : null,
        icpResult.has_delivery != null ? `Delivery: ${icpResult.has_delivery}` : null,
      ].filter(Boolean)
    : [];

  const lines = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${workEmail}`,
    `Company: ${company}`,
    businessType ? `Business type: ${businessType}` : null,
    locations ? `Locations: ${locations}` : null,
    interest ? `Interest: ${interest}` : null,
    message ? `\nMessage:\n${message}` : null,
    ...icpLines,
  ].filter(Boolean).join("\n");

  const subject = `New enquiry from ${firstName} ${lastName} - ${company}`;
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const from = `N4Cluster Website <${process.env.GMAIL_USER}>`;
  const to = "founder@n4cluster.com";

  // RFC 2822 message, base64url-encoded
  const raw = Buffer.from(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Reply-To: ${workEmail}`,
      `Subject: ${encodedSubject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      lines,
    ].join("\r\n")
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const oauth2Client = createOAuth2Client();
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
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
