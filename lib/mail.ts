/**
 * Shared Gmail delivery for the public form endpoints.
 *
 * Both the contact and newsletter routes send a lead notification through the
 * same Gmail account, so the OAuth client and the RFC 2822 message builder live
 * here rather than being duplicated per route — the duplication is why an input
 * fix previously landed in one route and not the other.
 */

import { google } from "googleapis";
import { containsHeaderInjection } from "./validation";

const DEFAULT_RECIPIENT = "contact@n4cluster.com";

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

/** Where lead notifications are delivered. */
export function notificationRecipient(): string {
  return process.env.CONTACT_RECIPIENT || DEFAULT_RECIPIENT;
}

/** The authenticated sending address. */
export function notificationSender(): string {
  return `N4Cluster Website <${process.env.GMAIL_USER}>`;
}

/**
 * RFC 2047 encoded-word. Encoding the subject means arbitrary user text can
 * never introduce a header break, and non-ASCII survives intact.
 */
export function encodeHeaderWord(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

export interface MailMessage {
  to: string;
  from: string;
  subject: string;
  body: string;
  replyTo?: string;
}

/**
 * Build the base64url-encoded RFC 2822 message the Gmail API expects.
 *
 * Throws on any address header that contains a CR, LF, or NUL. Callers are
 * expected to have validated already; this is the last line of defence, and it
 * fails loudly rather than silently sending a message with injected headers.
 */
export function buildRawMessage({
  to,
  from,
  subject,
  body,
  replyTo,
}: MailMessage): string {
  for (const [name, value] of Object.entries({ to, from, replyTo })) {
    if (typeof value === "string" && containsHeaderInjection(value)) {
      throw new Error(`Refusing to send: unsafe value for "${name}" header.`);
    }
  }

  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodeHeaderWord(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
  ];

  // A blank line separates headers from the body; everything after it is data,
  // so the body cannot introduce a header of its own.
  const message = [...headers, "", body].join("\r\n");

  return Buffer.from(message, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Send a message through the Gmail API as the configured account. */
export async function sendMail(message: MailMessage): Promise<void> {
  const raw = buildRawMessage(message);
  const gmail = google.gmail({ version: "v1", auth: createOAuth2Client() });
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
