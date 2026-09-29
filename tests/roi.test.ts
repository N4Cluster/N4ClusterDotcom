import { describe, expect, it } from "vitest";
import { calculateRoi } from "@/lib/roi";
import {
  MONTHLY_FEE,
  PER_ORDER_FEE,
  PROCESSING_FLAT,
  PROCESSING_RATE,
} from "@/content/site/pricing";

/** Currency comparison, tolerant of float representation but not of real drift. */
const money = (n: number) => Number(n.toFixed(2));

describe("configured rates", () => {
  it("matches the rates the regression cases assume", () => {
    // The expected values below are only meaningful at these rates.
    expect(PROCESSING_RATE).toBe(0.029);
    expect(PROCESSING_FLAT).toBe(0.3);
    expect(MONTHLY_FEE).toBe(99);
    expect(PER_ORDER_FEE).toBe(0.5);
  });
});

describe("calculateRoi — specified regression cases", () => {
  it("260 orders, $40 ticket, 30% commission", () => {
    const r = calculateRoi({ orders: 260, avgTicket: 40, commissionPct: 30 });
    expect(money(r.n4MonthlyFees)).toBe(608.6);
    expect(money(r.monthlyFeeDifference)).toBe(2511.4);
    expect(money(r.annualFeeDifference)).toBe(30136.8);
    expect(r.isLower).toBe(true);
  });

  it("300 orders, $28 ticket, 25% commission", () => {
    const r = calculateRoi({ orders: 300, avgTicket: 28, commissionPct: 25 });
    expect(money(r.n4MonthlyFees)).toBe(582.6);
    expect(money(r.monthlyFeeDifference)).toBe(1517.4);
    expect(money(r.annualFeeDifference)).toBe(18208.8);
    expect(r.isLower).toBe(true);
  });

  it("0 orders — the subscription still applies", () => {
    const r = calculateRoi({ orders: 0, avgTicket: 40, commissionPct: 30 });
    expect(money(r.n4MonthlyFees)).toBe(99);
    expect(money(r.monthlyFeeDifference)).toBe(-99);
    expect(money(r.annualFeeDifference)).toBe(-1188);
    expect(r.isLower).toBe(false);
  });

  it("10 orders, $10 ticket, 10% commission — N4Cluster costs more", () => {
    const r = calculateRoi({ orders: 10, avgTicket: 10, commissionPct: 10 });
    expect(money(r.n4MonthlyFees)).toBe(109.9);
    expect(money(r.monthlyFeeDifference)).toBe(-99.9);
    expect(money(r.annualFeeDifference)).toBe(-1198.8);
    expect(r.isLower).toBe(false);
  });
});

describe("calculateRoi — honest result states", () => {
  it("does not double-count the subscription or processing", () => {
    const q = 260;
    const a = 40;
    const r = calculateRoi({ orders: q, avgTicket: a, commissionPct: 30 });
    // Exactly one subscription, one per-order fee, one processing charge.
    expect(money(r.n4MonthlyFees)).toBe(
      money(
        MONTHLY_FEE + q * (PER_ORDER_FEE + a * PROCESSING_RATE + PROCESSING_FLAT)
      )
    );
    expect(money(r.monthlyFee)).toBe(99);
    expect(money(r.perOrderFees)).toBe(130);
    expect(money(r.processingFees)).toBe(379.6);
  });

  it("keeps a negative difference negative rather than reporting a saving", () => {
    const r = calculateRoi({ orders: 5, avgTicket: 12, commissionPct: 10 });
    expect(r.monthlyFeeDifference).toBeLessThan(0);
    expect(r.annualFeeDifference).toBeLessThan(0);
    expect(r.isLower).toBe(false);
  });

  it("reports no percentage when there is no comparison baseline", () => {
    // A percentage against a zero denominator is meaningless — null, not 0.
    expect(calculateRoi({ orders: 0, avgTicket: 40, commissionPct: 30 }).differencePct).toBeNull();
    expect(calculateRoi({ orders: 100, avgTicket: 40, commissionPct: 0 }).differencePct).toBeNull();
    expect(calculateRoi({ orders: 100, avgTicket: 0, commissionPct: 30 }).differencePct).toBeNull();
  });

  it("reports no per-order fee at zero orders instead of dividing by zero", () => {
    const r = calculateRoi({ orders: 0, avgTicket: 40, commissionPct: 30 });
    expect(r.feePerOrder).toBeNull();
    expect(Number.isFinite(r.n4MonthlyFees)).toBe(true);
  });

  it("computes a signed percentage that can be negative", () => {
    const r = calculateRoi({ orders: 10, avgTicket: 10, commissionPct: 10 });
    expect(r.differencePct).not.toBeNull();
    expect(r.differencePct as number).toBeLessThan(0);
  });

  it("does not round intermediate values", () => {
    // $28 × 2.9% = $0.812 — the third decimal must survive into the total.
    const r = calculateRoi({ orders: 1, avgTicket: 28, commissionPct: 25 });
    expect(r.processingFees).toBeCloseTo(1.112, 10);
    expect(r.n4MonthlyFees).toBeCloseTo(100.612, 10);
  });

  it("treats negative inputs as zero rather than producing nonsense", () => {
    const r = calculateRoi({ orders: -5, avgTicket: -10, commissionPct: -30 });
    expect(money(r.n4MonthlyFees)).toBe(99);
    expect(r.comparisonMonthlyFees).toBe(0);
  });

  it("scales linearly in order volume", () => {
    const a = calculateRoi({ orders: 100, avgTicket: 30, commissionPct: 25 });
    const b = calculateRoi({ orders: 200, avgTicket: 30, commissionPct: 25 });
    // Only the per-order components double; the subscription does not.
    expect(money(b.n4MonthlyFees - a.n4MonthlyFees)).toBe(
      money(a.n4MonthlyFees - MONTHLY_FEE)
    );
  });
});
