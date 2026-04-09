/**
 * UTM parameter capture and persistence.
 *
 * On first page load, extracts UTM params from the URL and stores them
 * in sessionStorage so they survive navigation across pages.
 * Forms call getUtmParams() to include attribution data in submissions.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_KEY = "n4_utm";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Capture UTM params from current URL into sessionStorage (call once on page load). */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((k) => params.has(k));

  if (!hasUtm) return; // don't overwrite stored params if no UTM in current URL

  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — silently ignore
  }
}

/** Retrieve stored UTM params for inclusion in form submissions. */
export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UtmParams;
  } catch {
    // fall through
  }

  // Fallback: read directly from URL
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}
