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
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required" },
      { status: 400 }
    );
  }

  const subject = `New newsletter signup - ${email}`;
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const from = `N4Cluster Website <${process.env.GMAIL_USER}>`;
  const to = "founder@n4cluster.com";
  const body = `New newsletter subscription:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}`;

  const raw = Buffer.from(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      body,
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
    console.error("Newsletter signup error:", message, err);
    return NextResponse.json(
      { ok: false, error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
