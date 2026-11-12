import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/contrast";

const css = readFileSync("app/globals.css", "utf8");
const token = (name: string) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`missing token ${name}`);
  return m[1];
};

describe("contrastRatio", () => {
  it("matches WCAG reference values", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
    expect(contrastRatio("#777777", "#FFFFFF")).toBeCloseTo(4.48, 1);
  });
});

describe("design tokens", () => {
  it("defines the headline palette", () => {
    expect(token("cream").toUpperCase()).toBe("#F7F3EA");
    expect(token("ink").toUpperCase()).toBe("#0F1A3A");
    expect(token("gold").toUpperCase()).toBe("#F4B33E");
  });

  it.each([
    ["ink", "cream"],
    ["ink-3", "cream"],
    ["muted", "cream"],
    ["muted", "white"],
    ["white", "ink"],
    ["ink", "gold"],
    ["green", "green-tint"],
    ["red", "white"],
    ["green", "white"],
  ])("%s on %s meets AA (4.5)", (fg, bg) => {
    expect(contrastRatio(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });
});
