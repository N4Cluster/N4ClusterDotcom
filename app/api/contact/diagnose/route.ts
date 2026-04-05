import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  const checks: Record<string, string> = {};

  // Check env vars exist (don't leak values)
  checks.GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID ? "set" : "MISSING";
  checks.GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET ? "set" : "MISSING";
  checks.GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN ? "set" : "MISSING";
  checks.GMAIL_USER = process.env.GMAIL_USER ? "set" : "MISSING";

  // Test OAuth token refresh
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });
    const { token } = await oauth2Client.getAccessToken();
    checks.oauth_token = token ? "valid" : "null_token";
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    checks.oauth_token = `FAILED: ${message}`;
  }

  return NextResponse.json(checks);
}
