import { describe, expect, it } from "vitest";
import {
  LIMITS,
  containsHeaderInjection,
  isValidEmail,
  parseContactSubmission,
  parseNewsletterSubmission,
  toSingleLine,
} from "@/lib/validation";

const validContact = {
  firstName: "Dana",
  lastName: "Reyes",
  workEmail: "dana@tacoshop.com",
  company: "Taco Shop",
  consent: true,
};

describe("containsHeaderInjection", () => {
  it("flags carriage return, line feed, and NUL", () => {
    expect(containsHeaderInjection("a\rb")).toBe(true);
    expect(containsHeaderInjection("a\nb")).toBe(true);
    expect(containsHeaderInjection("a\0b")).toBe(true);
  });

  it("accepts ordinary single-line values", () => {
    expect(containsHeaderInjection("Dana Reyes")).toBe(false);
  });
});

describe("toSingleLine", () => {
  it("strips every CR/LF, not just the first", () => {
    const stripped = toSingleLine("a\nb\nc\nd", 100);
    expect(containsHeaderInjection(stripped)).toBe(false);
    expect(stripped).toBe("a b c d");
  });

  it("caps length", () => {
    expect(toSingleLine("x".repeat(500), 10)).toHaveLength(10);
  });
});

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("dana@tacoshop.com")).toBe(true);
  });

  it("rejects an address carrying a header break", () => {
    // The injection this guards: a Bcc smuggled through the Reply-To header.
    expect(isValidEmail("dana@tacoshop.com\r\nBcc: victim@example.com")).toBe(false);
    expect(isValidEmail("dana@tacoshop.com\nBcc: victim@example.com")).toBe(false);
  });

  it("rejects malformed, empty, over-long, and non-string values", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail(`${"a".repeat(LIMITS.email)}@b.com`)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(42)).toBe(false);
    expect(isValidEmail({ toString: () => "a@b.com" })).toBe(false);
  });
});

describe("parseContactSubmission", () => {
  it("accepts a complete submission", () => {
    const result = parseContactSubmission(validContact);
    expect(result.ok).toBe(true);
  });

  it("rejects a non-object body", () => {
    expect(parseContactSubmission(null).ok).toBe(false);
    expect(parseContactSubmission("string").ok).toBe(false);
    expect(parseContactSubmission(undefined).ok).toBe(false);
  });

  it("requires first name, last name, email, company, and consent", () => {
    for (const missing of ["firstName", "lastName", "workEmail", "company", "consent"]) {
      const body: Record<string, unknown> = { ...validContact };
      delete body[missing];
      const result = parseContactSubmission(body);
      expect(result.ok, `expected missing ${missing} to be rejected`).toBe(false);
    }
  });

  it("rejects an injected email rather than passing it to the mailer", () => {
    const result = parseContactSubmission({
      ...validContact,
      workEmail: "dana@tacoshop.com\r\nBcc: victim@example.com",
    });
    expect(result.ok).toBe(false);
  });

  it("does not accept a truthy non-true consent value", () => {
    expect(parseContactSubmission({ ...validContact, consent: "yes" }).ok).toBe(false);
    expect(parseContactSubmission({ ...validContact, consent: 1 }).ok).toBe(false);
  });

  it("caps field lengths so a scripted post cannot send megabytes", () => {
    const result = parseContactSubmission({
      ...validContact,
      firstName: "x".repeat(5000),
      message: "m".repeat(50_000),
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.firstName).toHaveLength(LIMITS.name);
    expect(result.data.message).toHaveLength(LIMITS.message);
  });

  it("keeps newlines in the message, which lands in the body not a header", () => {
    const result = parseContactSubmission({
      ...validContact,
      message: "line one\nline two",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.message).toBe("line one\nline two");
  });

  it("coerces absent optional fields to empty strings, never 'undefined'", () => {
    const result = parseContactSubmission(validContact);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.businessType).toBe("");
    expect(result.data.utm_source).toBe("");
    // The old route interpolated raw values, producing "Name: undefined undefined".
    expect(JSON.stringify(result.data)).not.toContain("undefined");
  });

  it("keeps the form variant so the notification says which page it came from", () => {
    for (const variant of ["contact", "demo", "partner"] as const) {
      const result = parseContactSubmission({ ...validContact, formVariant: variant });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.data.formVariant).toBe(variant);
    }
  });

  it("falls back to 'contact' for a missing or unrecognised variant", () => {
    for (const value of [undefined, "nonsense", 7, null]) {
      const result = parseContactSubmission({ ...validContact, formVariant: value });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.data.formVariant).toBe("contact");
    }
  });

  it("strips header breaks from single-line fields it keeps", () => {
    const result = parseContactSubmission({
      ...validContact,
      company: "Taco\r\nShop",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(containsHeaderInjection(result.data.company)).toBe(false);
  });
});

describe("parseNewsletterSubmission", () => {
  it("accepts a valid email", () => {
    expect(parseNewsletterSubmission({ email: "dana@tacoshop.com" }).ok).toBe(true);
  });

  it("rejects invalid, injected, and missing emails", () => {
    expect(parseNewsletterSubmission({ email: "nope" }).ok).toBe(false);
    expect(parseNewsletterSubmission({ email: "a@b.com\r\nBcc: x@y.com" }).ok).toBe(false);
    expect(parseNewsletterSubmission({}).ok).toBe(false);
    expect(parseNewsletterSubmission(null).ok).toBe(false);
  });
});
