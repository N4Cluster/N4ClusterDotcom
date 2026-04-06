/**
 * Simple in-memory rate limiter for serverless API routes.
 * Uses a sliding window per IP address.
 */

const windowMs = 10 * 60 * 1000; // 10 minutes
const maxRequests = 5;

const store = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  if (entry.count > maxRequests) {
    return true;
  }
  return false;
}

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  // The honeypot field is named "website_url" — a field bots love to fill.
  // Real users never see it (hidden via CSS).
  const honeypot = body._hp_website ?? body.hp_website ?? "";
  return typeof honeypot === "string" && honeypot.length > 0;
}
