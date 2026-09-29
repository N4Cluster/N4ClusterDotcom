/**
 * Fee comparison used by /roi-calculator.
 *
 * Extracted from the component so the arithmetic is testable on its own. The
 * formulas are unchanged — the existing calculator already included the monthly
 * subscription and the processing assumption, and adding them again would
 * double-count.
 *
 * What this computes is an ESTIMATED FEE DIFFERENCE between a commission-based
 * marketplace and N4Cluster's published fees, on the inputs given. It is not
 * profit, not a guaranteed saving, and not a forecast that every marketplace
 * order would migrate to the direct channel.
 */

import {
  MONTHLY_FEE,
  PER_ORDER_FEE,
  PROCESSING_FLAT,
  PROCESSING_RATE,
} from "@/content/site/pricing";

export interface RoiInputs {
  /** Q — direct orders expected per month. Zero is valid. */
  orders: number;
  /** A — menu subtotal per order. */
  avgTicket: number;
  /** r — the merchant's comparison commission rate, as a percentage (e.g. 30). */
  commissionPct: number;
}

export interface RoiResult {
  /** Q × A × r */
  comparisonMonthlyFees: number;
  /** 99 + Q × (0.50 + A × p + f) */
  n4MonthlyFees: number;
  monthlyFeeDifference: number;
  annualFeeDifference: number;
  /** Component parts, for the breakdown table. */
  monthlyFee: number;
  perOrderFees: number;
  processingFees: number;
  /**
   * Difference as a share of the comparison fees, or null when there is no
   * comparison baseline to divide by — a percentage against zero is meaningless,
   * so callers must render an explicit "not applicable" rather than 0%.
   */
  differencePct: number | null;
  /** N4Cluster fees per order, or null at zero orders. */
  feePerOrder: number | null;
  /** True when N4Cluster's fees are lower on these inputs. */
  isLower: boolean;
}

export function calculateRoi({
  orders,
  avgTicket,
  commissionPct,
}: RoiInputs): RoiResult {
  const q = Math.max(0, orders);
  const a = Math.max(0, avgTicket);
  const r = Math.max(0, commissionPct) / 100;

  const comparisonMonthlyFees = q * a * r;

  const monthlyFee = MONTHLY_FEE;
  const perOrderFees = q * PER_ORDER_FEE;
  const processingFees = q * (a * PROCESSING_RATE + PROCESSING_FLAT);
  const n4MonthlyFees = monthlyFee + perOrderFees + processingFees;

  // Signed, deliberately: a negative difference means N4Cluster costs more on
  // these inputs, and that must surface as a negative rather than an absolute
  // value labelled as a saving.
  const monthlyFeeDifference = comparisonMonthlyFees - n4MonthlyFees;

  return {
    comparisonMonthlyFees,
    n4MonthlyFees,
    monthlyFeeDifference,
    annualFeeDifference: monthlyFeeDifference * 12,
    monthlyFee,
    perOrderFees,
    processingFees,
    differencePct:
      comparisonMonthlyFees > 0
        ? (monthlyFeeDifference / comparisonMonthlyFees) * 100
        : null,
    feePerOrder: q > 0 ? n4MonthlyFees / q : null,
    isLower: monthlyFeeDifference > 0,
  };
}
