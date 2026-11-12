"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  onConsentChange,
  setConsent,
} from "@/lib/consent";

/**
 * Cookie consent banner.
 *
 * The choice recorded here gates whether analytics loads at all — see
 * `lib/consent.ts` and `components/Analytics.tsx`. Declining is a real decision,
 * not a dismissal.
 *
 * Visibility is derived from the consent store rather than held in state, so the
 * banner reappears when the footer's "Cookie preferences" control clears the
 * stored answer. It stays hidden while consent is "unknown" (server render and
 * first hydration) so a visitor who already chose never sees it flash.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(
    onConsentChange,
    getConsentSnapshot,
    getServerConsentSnapshot
  );

  if (consent !== "unset") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 on-dark bg-ink shadow-2xl"
      role="dialog"
      aria-label="Cookie consent"
    >
      {/* Slim bar so it doesn't cover the homepage stat strip on a first visit. */}
      <div className="mx-auto max-w-[1280px] px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="flex-1 min-w-[220px] text-xs text-white/80 leading-snug">
          We use analytics cookies to understand how the site is used. They load
          only if you accept. See our{" "}
          <Link href="/cookies" className="text-gold hover:underline">
            Cookie Notice
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setConsent("denied")}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-full"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent("granted")}
            className="focus-visible:outline-white bg-gold hover:brightness-95 text-ink text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
