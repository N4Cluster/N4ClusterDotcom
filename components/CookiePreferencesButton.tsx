"use client";

import { clearConsent } from "@/lib/consent";

/**
 * Re-opens the consent banner so a visitor can change an earlier choice.
 * Without this the stored choice would be permanent, and the Cookie Notice's
 * statement that a choice can be changed would not be true.
 */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={clearConsent} className={className}>
      Cookie preferences
    </button>
  );
}
