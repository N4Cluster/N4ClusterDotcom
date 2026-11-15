import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { floorToCents, formatUsd, growthPartner, partnerPay, PARTNER_MONTHS, PARTNER_SHARE } from "@/content/careers/growth-partner";

const BANNED = /\b(hire|hiring|salary|wage|benefits|manager|shift|full-time|employee|employment)\b/i;
const allCopy = JSON.stringify(growthPartner);

describe("Growth Partner pay figures", () => {
  it("are 75% for 6 months, rounded down", () => {
    expect(PARTNER_SHARE).toBe(0.75);
    expect(PARTNER_MONTHS).toBe(6);
    expect(floorToCents(0.75 * 1.49)).toBe(1.11);
    expect(floorToCents(0.75 * 0.99)).toBe(0.74);
    expect(partnerPay).toEqual({ serviceFeeAtStandard: "$74", perOrder: "$1.11", freeMonthPerOrder: "$0.74" });
    expect(formatUsd(74)).toBe("$74");
  });
  it("never shows the rounded-up per-order figure", () => {
    expect(allCopy).not.toContain("$1.12");
  });
  it("states the monthly share as a percentage of what the restaurant pays", () => {
    expect(growthPartner.pay[0]).toContain("75% of the monthly service fee the restaurant actually pays");
    expect(growthPartner.footnote).toContain("reduced monthly fee");
  });
  it("uses contractor language only, and names no launch city", () => {
    expect(allCopy).not.toMatch(BANNED);
    expect(allCopy).not.toMatch(/franklin/i);
    expect(allCopy).not.toMatch(/could earn|up to \$/i);
    expect(growthPartner.meta).toEqual(["Independent contractor", "Commission only", "No cap", "Open to anyone in the US"]);
  });
  it("computes figures from the pricing constants, not literals", () => {
    const src = readFileSync("content/careers/growth-partner.ts", "utf8");
    expect(src).toContain('from "@/content/site/pricing"');
  });
});
