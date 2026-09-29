/**
 * Cookie-consent state, shared by the banner that collects it and the analytics
 * loader that honours it.
 *
 * The banner used to write a localStorage key nothing ever read, so declining
 * had no effect — GA4 loaded regardless. Analytics now subscribes to this module
 * and only loads once consent is granted.
 */

export type ConsentState = "granted" | "denied";

/** Kept as-is from the original banner so existing visitors' choices survive. */
const STORAGE_KEY = "n4cluster-cookie-consent";

/** Legacy values written by the previous banner implementation. */
const STORED_GRANTED = "accepted";
const STORED_DENIED = "declined";

/** Fired on the window whenever consent changes, so listeners react immediately. */
export const CONSENT_EVENT = "n4-consent-change";

/**
 * The visitor's stored choice, or null if they haven't chosen yet.
 * Returns null when storage is unavailable (private mode, blocked site data) —
 * an unreadable choice is treated as "not yet given", never as consent.
 */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === STORED_GRANTED) return "granted";
    if (raw === STORED_DENIED) return "denied";
    return null;
  } catch {
    return null;
  }
}

/** Record the visitor's choice and notify listeners in this tab. */
export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      state === "granted" ? STORED_GRANTED : STORED_DENIED
    );
  } catch {
    // Storage unavailable — the choice can't persist across page loads, but it
    // still applies to this one via the event below.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/**
 * Snapshot forms for `useSyncExternalStore`, which is how components read this
 * store: it subscribes without a state-setting effect and stays SSR-safe.
 *
 * "unset" means the visitor has been asked and has not chosen; "unknown" means we
 * have not read storage yet (server render and first hydration). Both are treated
 * as "no consent", but only "unset" should prompt — distinguishing them keeps the
 * banner from flashing for a visitor who already chose.
 */
export type ConsentSnapshot = ConsentState | "unset" | "unknown";

export function getConsentSnapshot(): ConsentSnapshot {
  return getConsent() ?? "unset";
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return "unknown";
}

/**
 * Forget the stored choice and notify listeners, which re-shows the banner.
 * Backs the "Cookie preferences" control in the footer, so the Cookie Notice's
 * promise that a choice can be changed is actually actionable.
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored to clear; the event below still resets this page.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function.
 * Also listens for `storage` so a choice made in another tab is respected here.
 */
export function onConsentChange(listener: (state: ConsentState | null) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => listener(getConsent());
  window.addEventListener(CONSENT_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
