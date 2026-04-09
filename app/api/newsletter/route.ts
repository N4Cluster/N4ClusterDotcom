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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { email } = body;

  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required" },
      { status: 400 }
    );
  }

  // POST to ICP Finder for lead tracking
  const icpUrl = process.env.ICP_FINDER_API_URL;
  if (icpUrl) {
    try {
      await fetch(`${icpUrl}/api/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.ICP_FINDER_API_KEY
            ? { "X-API-Key": process.env.ICP_FINDER_API_KEY }
            : {}),
        },
        body: JSON.stringify({
          first_name: "Newsletter",
          last_name: "Subscriber",
          email,
          source: "website_newsletter",
          utm_source: body.utm_source || undefined,
          utm_medium: body.utm_medium || undefined,
          utm_campaign: body.utm_campaign || undefined,
        }),
      });
    } catch (err) {
      console.error("ICP Finder newsletter lead failed:", err);
    }
  }

  const subject = `New newsletter signup - ${email}`;
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const from = `N4Cluster Website <${process.env.GMAIL_USER}>`;
  const to = "founder@n4cluster.com";
  const emailBody = `New newsletter subscription:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}`;

  const raw = Buffer.from(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      emailBody,
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
