import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync("app/careers/page.tsx", "utf8");
const BANNED = /\b(hire|hiring|salary|wage|benefits|manager|shift|full-time|employee|employment)\b/i;

describe("careers page", () => {
  it("leads with a short header, then the role block with the form", () => {
    expect(page).toContain("Careers at N4Cluster");
    expect(page).toContain('href="#growth-partner"');
    expect(page).toContain('id="growth-partner"');
    expect(page.indexOf('id="growth-partner"')).toBeLessThan(page.indexOf("<FeatureGrid"));
    expect(page).toContain("<CareerApplicationForm />");
    expect(page).toContain("growthPartner.");
    expect(page).not.toContain("HeroCentered");
  });

  it("removes the four unadvertised full-time roles", () => {
    for (const role of [
      "Product Engineer",
      "Platform Designer",
      "Commerce Growth Lead",
      "Merchant Success Manager",
      "Open roles",
    ]) {
      expect(page).not.toContain(role);
    }
  });

  it("keeps focus visible on the dark panel and the nested light card", () => {
    expect(page).toMatch(/on-dark/);
    expect(page).toMatch(/on-light/);
  });

  it("has no employee words in the role block, no launch city, no rounded-up figure", () => {
    const block = page.slice(page.indexOf('id="growth-partner"'), page.indexOf("<FeatureGrid"));
    expect(block).not.toMatch(BANNED);
    expect(page).not.toMatch(/franklin/i);
    expect(page).not.toContain("$1.12");
  });

  it("describes the role in the metadata", () => {
    expect(page).toContain("Restaurant Growth Partner");
    expect(page).toMatch(/description:[\s\S]*independent-contractor, commission-only/);
  });
});
