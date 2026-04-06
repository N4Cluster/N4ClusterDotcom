import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    workEmail,
    company,
    businessType,
    locations,
    interest,
    message,
  } = body;

  const lines = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${workEmail}`,
    `Company: ${company}`,
    businessType ? `Business type: ${businessType}` : null,
    locations ? `Locations: ${locations}` : null,
    interest ? `Interest: ${interest}` : null,
    message ? `\nMessage:\n${message}` : null,
  ].filter(Boolean).join("\n");

  const subject = `New enquiry from ${firstName} ${lastName} — ${company}`;
  const from = `N4Cluster Website <${process.env.GMAIL_USER}>`;
  const to = "founder@n4cluster.com";

  // RFC 2822 message, base64url-encoded
  const raw = Buffer.from(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Reply-To: ${workEmail}`,
      `Subject: ${subject}`,
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
