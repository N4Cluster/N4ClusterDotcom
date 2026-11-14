import { describe, expect, it } from "vitest";
import { HOME_SAVINGS_DEFAULTS, homeSavings } from "@/lib/home-savings";
import { calculateRoi } from "@/lib/roi";

describe("homeSavings", () => {
  it("defaults wrap calculateRoi", () => {
    const { orders, ticket, rate } = HOME_SAVINGS_DEFAULTS;
    const r = homeSavings(orders, ticket, rate);
    expect(r.marketplace).toBe(3500);
    expect(r.n4).toBe(calculateRoi({ orders: 400, avgTicket: 35, commissionPct: 25 }).n4MonthlyFees);
    expect(r.yearlySaving).toBe(r.monthlySaving * 12);
  });

  it("handles zero orders without NaN", () => {
    const r = homeSavings(0, 35, 25);
    expect(r.monthlySaving).toBe(0);
    expect(r.n4BarPct).toBe(100);
    expect(Object.values(r).every(Number.isFinite)).toBe(true);
  });

  it("clamps saving at 0 when N4Cluster costs more", () => {
    const r = homeSavings(10, 15, 20);
    expect(r.n4).toBeGreaterThan(r.marketplace);
    expect(r.monthlySaving).toBe(0);
    expect(r.n4BarPct).toBe(100);
  });

  it("clamps the bar to at least 3%", () => {
    expect(homeSavings(2000, 90, 30).n4BarPct).toBeGreaterThanOrEqual(3);
  });
});
