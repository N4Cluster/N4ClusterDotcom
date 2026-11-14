/**
 * The SMS links in the site footer. Each per-campaign page (/sms/deals, /sms/orders, /sms/verification)
 * is a carrier reviewer's landing page for one program, so its footer links only to that program's
 * Terms section and leaves out /sms, the page that covers all three programs. Mixing programs on the
 * Deals landing page is what got TCR C1DB2ES rejected (602, Nov 2026).
 */
const programAnchors: Record<string, string> = {
  "/sms/deals": "sms-deals",
  "/sms/orders": "sms-orders",
  "/sms/verification": "sms-verification",
};

export type FooterLink = { label: string; href: string };

export function smsFooterLinks(pathname: string | null): FooterLink[] {
  const anchor = programAnchors[(pathname ?? "").replace(/\/+$/, "")];
  if (anchor) return [{ label: "SMS Terms", href: `/terms#${anchor}` }];
  return [
    { label: "SMS Terms", href: "/terms#sms" },
    { label: "Text Messaging", href: "/sms" },
  ];
}
