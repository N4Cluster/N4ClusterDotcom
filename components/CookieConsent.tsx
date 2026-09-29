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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-3xl rounded-xl bg-navy-950 border border-navy-700 px-6 py-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-slate-300 leading-relaxed">
          We use analytics cookies to understand how the site is used. They load
          only if you accept. See our{" "}
          <Link href="/cookies" className="text-cobalt-300 hover:underline">
            Cookie Notice
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setConsent("denied")}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent("granted")}
            className="bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
