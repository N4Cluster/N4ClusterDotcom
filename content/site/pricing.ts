/**
 * Single source for the commercial facts the marketing site displays.
 *
 * These numbers were previously hardcoded in ten files, which is how the site
 * ended up with a "$99/month + $0.50 per order" claim next to an "Everything"
 * answer that omitted card processing. Anything quoting a fee should import from
 * here so a change lands everywhere at once.
 *
 * Processing is an ILLUSTRATIVE assumption, not a quoted processor rate, and is
 * only ever used to build example arithmetic. It must always be presented as an
 * assumption with its basis stated.
 */

/** N4Cluster merchant platform fee, charged monthly after the trial. */
export const MONTHLY_FEE = 99;

/** N4Cluster merchant fee per order. */
export const PER_ORDER_FEE = 0.5;

/** Default fee a diner sees at checkout, unless the restaurant absorbs it. */
export const DINER_FEE = 0.99;

/** Free-trial length in days. Waives N4Cluster merchant platform and per-order fees. */
export const TRIAL_DAYS = 30;

/**
 * Illustrative card-processing assumption used in worked examples.
 * Not a processor quote; the charged amount may differ (taxes, tips, fees).
 */
export const PROCESSING_RATE = 0.029;
export const PROCESSING_FLAT = 0.3;

/** Short display strings, so wording stays identical wherever fees are quoted. */
export const priceDisplay = {
  monthly: "$99/month",
  perOrder: "$0.50 per order",
  /** The headline merchant fee, used as one phrase. */
  merchantFees: "$99/month + $0.50 per order",
  dinerFee: "$0.99",
  trial: "30-day trial",
  cancel: "Month-to-month. Cancel with 30 days' written notice.",
} as const;

/**
 * The qualifiers that must accompany a fee claim: card processing and courier
 * costs are always distinguished from N4Cluster's fees.
 */
export const feeQualifiers = {
  commission:
    "No commission, ever. Card processing and any courier charges are separate.",
  separateCharges:
    "Card processing and any courier charges are separate. Diners normally pay a $0.99 N4Cluster fee unless the restaurant chooses to absorb it.",
  trialScope:
    "The trial waives N4Cluster merchant platform and per-order fees. See the full pricing details for other charges and terms.",
  monthlyApplies:
    "The $99 monthly fee applies after the trial, including in a month with few or no orders.",
  rateStability:
    "The published per-order rate does not increase merely because an order value or your order volume goes up.",
} as const;
