/**
 * Fixed-window rate limiting for the public form endpoints.
 *
 * Scope and limits, stated honestly: this counter lives in the memory of a single
 * serverless instance. It is not shared between concurrent instances and it resets
 * on every cold start, so it raises the cost of casual abuse rather than enforcing
 * a global quota. The window is fixed, not sliding — a caller can send up to
 * `maxRequests` at the end of one window and again at the start of the next.
 *
 * A caller also controls `x-forwarded-for`, so the key is not a trustworthy
 * identity. Moving to shared storage (Vercel KV / Upstash) keyed on a
 * platform-verified IP is the upgrade path when real enforcement is needed.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

/**
 * Hard ceiling on tracked keys. Without it the map grows once per distinct IP for
 * the lifetime of the instance, which is unbounded memory on a public endpoint.
 */
const MAX_ENTRIES = 10_000;

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/** Drop every window that has already elapsed. */
function evictExpired(now: number): void {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (entry && now <= entry.resetAt) {
    entry.count++;
    return entry.count > MAX_REQUESTS;
  }

  // Starting a new window for this key. Sweep elapsed windows first so the map
  // tracks only live ones, and only then enforce the ceiling.
  evictExpired(now);
  if (store.size >= MAX_ENTRIES) {
    // Still full of live windows: refuse rather than grow without bound.
    return true;
  }

  store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  return false;
}

export function isHoneypotFilled(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const raw = body as Record<string, unknown>;
  // The honeypot field is named "_hp_website" — a field bots love to fill.
  // Real users never see it (positioned offscreen and hidden from assistive tech).
  const honeypot = raw._hp_website ?? raw.hp_website ?? "";
  return typeof honeypot === "string" && honeypot.length > 0;
}

/** Exposed for tests: drop all tracked windows. */
export function __resetRateLimitStore(): void {
  store.clear();
}

export const rateLimitConfig = {
  windowMs: WINDOW_MS,
  maxRequests: MAX_REQUESTS,
  maxEntries: MAX_ENTRIES,
} as const;
