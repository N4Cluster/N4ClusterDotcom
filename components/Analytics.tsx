"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  onConsentChange,
} from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics 4, loaded only after the visitor grants consent.
 *
 * Consent is read through `useSyncExternalStore`, so the server render and the
 * first client render both see "unknown" and request nothing from Google. The
 * tags mount only once storage has been read and the answer is "granted".
 */
export function Analytics() {
  const consent = useSyncExternalStore(
    onConsentChange,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const granted = consent === "granted";

  /**
   * Unmounting the tags cannot unload a gtag that already ran, so an explicit
   * opt-out flag is set as well. GA checks `window['ga-disable-<ID>']` before
   * sending, which stops collection for a visitor who declines after accepting.
   */
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !granted;
  }, [granted]);

  if (!GA_ID || !granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
