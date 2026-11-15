import { describe, expect, it } from "vitest";
import { LIMITS, isValidPhone, parseCareerApplication } from "@/lib/validation";
import { careerApplicationEmail } from "@/lib/careers";

const valid = { name: "Sam Ortiz", phone: "(615) 555-0100", email: "sam@example.com", city: "Austin, TX" };

describe("parseCareerApplication", () => {
  it("accepts the four required fields, experience optional", () => {
    const r = parseCareerApplication(valid);
    expect(r.ok && r.data.experience).toBe("");
  });
  it.each([["name", "Name is required."], ["phone", "A valid phone number is required."], ["email", "A valid email is required."], ["city", "City is required."]])(
    "rejects a missing %s", (field, error) => {
      expect(parseCareerApplication({ ...valid, [field]: "" })).toEqual({ ok: false, error });
    });
  it.each(["(615) 555-0100", "615.555.0100 ext 2", "+44 20 7946 0958", "6155550100"])("accepts phone %s", (phone) => {
    expect(parseCareerApplication({ ...valid, phone }).ok).toBe(true);
  });
  it.each(["call me", "123", "555-0100-0100-0100-0100"])("rejects phone %s", (phone) => {
    expect(parseCareerApplication({ ...valid, phone }).ok).toBe(false);
  });
  it("flattens header-breaking characters in single-line fields", () => {
    const r = parseCareerApplication({ ...valid, name: "Sam\r\nBcc: x@y.z", city: "Austin\nTX" });
    expect(r.ok && r.data.name).toBe("Sam Bcc: x@y.z");
    expect(r.ok && r.data.city).toBe("Austin TX");
  });
  it("keeps newlines in experience, strips NUL and caps the length", () => {
    const r = parseCareerApplication({ ...valid, experience: "Line 1\nLine 2\0" + "x".repeat(LIMITS.message) });
    expect(r.ok && r.data.experience.startsWith("Line 1\nLine 2x")).toBe(true);
    expect(r.ok && r.data.experience.length).toBe(LIMITS.message);
  });
  it("rejects a non-object body", () => {
    expect(parseCareerApplication(null).ok).toBe(false);
  });
});

describe("careerApplicationEmail", () => {
  const app = { ...valid, experience: "2 years selling POS", utm_source: "instagram", utm_medium: "paid", utm_campaign: "growth-partner", utm_content: "", utm_term: "" };
  it("names the applicant and city in a single-line subject", () => {
    const { subject } = careerApplicationEmail(app);
    expect(subject).toBe("Growth Partner application from Sam Ortiz – Austin, TX");
    expect(subject).not.toMatch(/[\r\n]/);
  });
  it("lists every field and the ad attribution", () => {
    const { body } = careerApplicationEmail(app);
    for (const s of ["Sam Ortiz", "(615) 555-0100", "sam@example.com", "Austin, TX", "2 years selling POS", "Source: instagram", "Campaign: growth-partner"]) expect(body).toContain(s);
  });
  it("says so when no experience was given", () => {
    expect(careerApplicationEmail({ ...app, experience: "" }).body).toContain("Sales experience: none given");
  });
});

describe("isValidPhone", () => {
  it.each(["(615) 555-0100", "615.555.0100 ext 2", "+44 20 7946 0958", "555 0100"])("accepts %s", (v) => {
    expect(isValidPhone(v)).toBe(true);
  });
  it.each(["123456", "1234567890123456"])("rejects %s", (v) => {
    expect(isValidPhone(v)).toBe(false);
  });
});
