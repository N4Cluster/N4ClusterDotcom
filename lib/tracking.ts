/**
 * Short tracking links (`https://www.n4cluster.com/t/{code}`) sent in order
 * notification texts.
 *
 * This site holds no order data. The order platform mints each code when it
 * sends a delivery text and serves a summary for it; this module validates the
 * code, asks the platform for that summary, and treats anything malformed as
 * not found. We never use third-party shorteners: carriers filter them.
 *
 * Platform contract (`TRACKING_RESOLVER_URL`):
 *   GET {TRACKING_RESOLVER_URL}/{code}
 *   Authorization: Bearer {TRACKING_RESOLVER_API_KEY}   (sent when set)
 *   200 → TrackingSummary JSON (fields below)
 *   404 / 410 → unknown or expired code
 */

/** Codes are random base62 (base32 is a subset), at least 6 characters. */
const CODE_PATTERN = /^[0-9A-Za-z]{6,16}$/;

/** The sample link in the 10DLC campaign registration. It always resolves. */
export const DEMO_TRACKING_CODE = "8KX42Q";

const STATUSES = [
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type TrackingStatus = (typeof STATUSES)[number];

export type TrackingSummary = {
  orderNo: string;
  merchantName: string;
  status: TrackingStatus;
  fulfillmentMode: "PICKUP" | "DELIVERY";
  /** Uber Direct / DoorDash Drive tracking page, for delivery orders. */
  courierTrackingUrl?: string;
  /** The order's page on the restaurant's own storefront. */
  orderUrl?: string;
  /** True only for the registration sample, so the page can say so. */
  demo?: boolean;
};

export type TrackingResult =
  | { kind: "found"; summary: TrackingSummary }
  | { kind: "not_found" }
  | { kind: "unavailable" };

export const statusLabels: Record<TrackingStatus, string> = {
  CONFIRMED: "Order confirmed",
  PREPARING: "Being prepared",
  READY: "Ready for pickup",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const demoSummary: TrackingSummary = {
  orderNo: "1042",
  merchantName: "Pasta and Pita Grill",
  status: "OUT_FOR_DELIVERY",
  fulfillmentMode: "DELIVERY",
  demo: true,
};

export function isValidTrackingCode(code: string): boolean {
  return CODE_PATTERN.test(code);
}

/** Only https links are rendered; anything else from upstream is dropped. */
function httpsUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    return new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Narrows an upstream payload to a summary, or null if it is not one. */
export function parseTrackingSummary(data: unknown): TrackingSummary | null {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;
  if (!nonEmpty(d.orderNo) || !nonEmpty(d.merchantName)) return null;
  if (!STATUSES.includes(d.status as TrackingStatus)) return null;
  if (d.fulfillmentMode !== "PICKUP" && d.fulfillmentMode !== "DELIVERY") return null;
  return {
    orderNo: d.orderNo,
    merchantName: d.merchantName,
    status: d.status as TrackingStatus,
    fulfillmentMode: d.fulfillmentMode,
    courierTrackingUrl:
      d.fulfillmentMode === "DELIVERY" ? httpsUrl(d.courierTrackingUrl) : undefined,
    orderUrl: httpsUrl(d.orderUrl),
  };
}

type ResolverEnv = {
  TRACKING_RESOLVER_URL?: string;
  TRACKING_RESOLVER_API_KEY?: string;
};

export async function resolveTrackingCode(
  code: string,
  {
    env = process.env as ResolverEnv,
    fetchImpl = fetch,
  }: { env?: ResolverEnv; fetchImpl?: typeof fetch } = {}
): Promise<TrackingResult> {
  if (!isValidTrackingCode(code)) return { kind: "not_found" };
  if (code === DEMO_TRACKING_CODE) return { kind: "found", summary: demoSummary };

  const base = env.TRACKING_RESOLVER_URL?.replace(/\/+$/, "");
  if (!base) return { kind: "not_found" };

  let response: Response;
  try {
    response = await fetchImpl(`${base}/${encodeURIComponent(code)}`, {
      headers: env.TRACKING_RESOLVER_API_KEY
        ? { Authorization: `Bearer ${env.TRACKING_RESOLVER_API_KEY}` }
        : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    return { kind: "unavailable" };
  }

  if (response.status === 404 || response.status === 410) return { kind: "not_found" };
  if (!response.ok) return { kind: "unavailable" };

  let summary: TrackingSummary | null;
  try {
    summary = parseTrackingSummary(await response.json());
  } catch {
    summary = null;
  }
  return summary ? { kind: "found", summary } : { kind: "unavailable" };
}
