import { calculateRoi } from "@/lib/roi";

export const HOME_SAVINGS_DEFAULTS = { orders: 400, ticket: 35, rate: 25 } as const;

/** Homepage calculator view of calculateRoi: clamped saving and a bar width for the N4Cluster line. */
export function homeSavings(orders: number, ticket: number, ratePct: 20 | 25 | 30) {
  const roi = calculateRoi({ orders, avgTicket: ticket, commissionPct: ratePct });
  const marketplace = roi.comparisonMonthlyFees;
  const n4 = roi.n4MonthlyFees;
  const monthlySaving = Math.max(0, marketplace - n4);
  const n4BarPct = marketplace === 0 ? 100 : Math.min(100, Math.max(3, (n4 / marketplace) * 100));
  return { marketplace, n4, monthlySaving, yearlySaving: monthlySaving * 12, n4BarPct };
}
