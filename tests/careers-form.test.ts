import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const src = readFileSync("components/forms/CareerApplicationForm.tsx", "utf8");

describe("CareerApplicationForm", () => {
  it("is a client component posting to /api/careers", () => {
    expect(src.startsWith('"use client"')).toBe(true);
    expect(src).toContain('fetch("/api/careers"');
    expect(src).toContain("getUtmParams()");
    expect(src).toContain("_hp_website");
  });

  it("has exactly the five fields with the right autocomplete", () => {
    for (const s of [
      'id="name"',
      'autoComplete="name"',
      'id="phone"',
      'type="tel"',
      'autoComplete="tel"',
      'id="email"',
      'type="email"',
      'id="city"',
      'placeholder="City, State"',
      'id="experience"',
    ]) {
      expect(src).toContain(s);
    }
    expect(src).not.toMatch(/type="checkbox"|consent|criminal|convict|salary|date of birth/i);
  });

  it("links the applicants privacy section and carries the equal-opportunity line", () => {
    expect(src).toContain('href="/privacy#applicants"');
    expect(src).toContain(
      "N4Cluster considers all applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability or any other protected status."
    );
  });

  it("disables the button while sending and keeps input on error", () => {
    expect(src).toMatch(/disabled=\{status === "submitting"\}/);
    expect(src).toContain("Send application");
    expect(src).toContain("We'll call or email you.");
    expect(src).not.toMatch(/\bSMS\b|text you/);
  });

  it("announces errors and success to assistive tech", () => {
    expect(src).toContain('(["name", "phone", "email", "city"] as const).find');
    expect(src).toMatch(/getElementById\(firstInvalid\)\?\.focus\(\)/);
    expect(src).toContain('role="status"');
    expect(src).toMatch(/<h3 ref=\{successHeadingRef\} tabIndex=\{-1\}/);
    expect(src).toMatch(/status === "success"\) successHeadingRef\.current\?\.focus\(\)/);
  });

  it("marks required fields and uses a unique honeypot id", () => {
    expect(src.match(/aria-required="true"/g)).toHaveLength(4);
    expect(src).not.toMatch(/\srequired[\s>=]/);
    expect(src).toContain('id="careers_hp_website"');
    expect(src).toContain('htmlFor="careers_hp_website"');
    expect(src).not.toContain('id="hp_website"');
  });

  it("uses the server's phone and email rules", () => {
    expect(src).toMatch(/import \{[^}]*isValidPhone[^}]*\} from "@\/lib\/validation"/);
    expect(src).toMatch(/import \{[^}]*isValidEmail[^}]*\} from "@\/lib\/validation"/);
    expect(src).not.toMatch(/replace\(\/\D/);
    expect(src).not.toMatch(/\.length < 10/);
  });
});
