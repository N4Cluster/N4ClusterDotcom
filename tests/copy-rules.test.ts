import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import { describe, expect, it } from "vitest";

// Legal pages/content are protected by diff review, /t/* is out of scope.
const SKIP = ["app/privacy", "app/terms", "app/cookies", "app/sms", "app/t", "content/legal"];
const PHRASES = [
  "cancel anytime",
  "export anytime",
  "exportable",
  "n4sync",
  "n4logic",
  "neighborhood hub",
  "demo@n4cluster",
  "text demo",
  "franklin & columbia",
  "zero n4cluster sales commission",
  // Not live yet (owner, 2026-11-13): Uber Direct only; no forecasting, GBP sync or domain setup claims.
  "doordash drive",
  "forecasting",
  "google business profile",
  "high-margin items",
  "set up your domain",
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    // SKIP is written with "/"; join() uses "\" on Windows.
    if (SKIP.includes(p.split(sep).join("/"))) return [];
    return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(p) ? [p] : [];
  });
}

const files = ["app", "components", "content"].flatMap(walk);

describe("sitewide copy rules", () => {
  it("scans files", () => expect(files.length).toBeGreaterThan(20));
  it.each(files)("%s has no forbidden copy", (f) => {
    const text = readFileSync(f, "utf8");
    const lower = text.toLowerCase();
    for (const ph of PHRASES) expect(lower, ph).not.toContain(ph);
    expect(text, "contacts@").not.toContain("contacts@");
    expect(text, "/n4logic").not.toContain("/n4logic");
  });
});
