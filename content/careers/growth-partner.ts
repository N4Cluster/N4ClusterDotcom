import { MONTHLY_FEE, PER_ORDER_FEE, DINER_FEE } from "@/content/site/pricing";

/** Share of each restaurant's fees paid to the Growth Partner. */
export const PARTNER_SHARE = 0.75;

/** Months a signed restaurant earns the partner its share. */
export const PARTNER_MONTHS = 6;

/**
 * Round down to the cent. The small epsilon absorbs float error so that
 * products such as 0.75 * 1.49 (1.1175) floor to 1.11 rather than drifting.
 */
export function floorToCents(value: number): number {
  return Math.floor(value * 100 + 1e-9) / 100;
}

/** Whole dollars render without cents; anything else shows two decimals. */
export function formatUsd(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

/** Partner pay figures, derived from the pricing constants and rounded down. */
export const partnerPay = {
  serviceFeeAtStandard: formatUsd(Math.floor(PARTNER_SHARE * MONTHLY_FEE)),
  perOrder: formatUsd(floorToCents(PARTNER_SHARE * (PER_ORDER_FEE + DINER_FEE))),
  freeMonthPerOrder: formatUsd(floorToCents(PARTNER_SHARE * DINER_FEE)),
} as const;

/** Growth Partner role copy for the careers page. */
export const growthPartner = {
  badge: "Now recruiting · Sales",
  title: "Restaurant Growth Partner",
  meta: ["Independent contractor", "Commission only", "No cap", "Open to anyone in the US"],
  headline: "Every order they take pays you.",
  shareFigure: "75%",
  shareCaption: "of the fees each restaurant you sign generates for N4Cluster, for its first 6 months.",
  pay: [
    `Each month: 75% of the monthly service fee the restaurant actually pays, from its second month. That's ${partnerPay.serviceFeeAtStandard} a month at our standard $99.`,
    `Every order: +${partnerPay.perOrder}, 75% of the $0.50 order fee and the $0.99 Neighborhood fee.`,
    `Free first month: +${partnerPay.freeMonthPerOrder} per order, 75% of the $0.99 Neighborhood fee. Restaurants pay no monthly or order fee while they try N4Cluster.`,
  ],
  points: [
    "Sign independent restaurants in your own city",
    "Pitch training and sales materials provided",
    "You sign them, our team handles setup",
  ],
  arrangement:
    "Commission only, no base pay. You'll sign an independent contractor agreement that sets out the commission terms.",
  footnote:
    "Based on current pricing, subject to change. Some restaurants pay a reduced monthly fee, or one that steps up month by month to $99; your share is 75% of what they actually pay.",
} as const;
