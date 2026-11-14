import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  dealsOptInSteps,
  dealsPage,
  dealsPageForbidden,
  dealsSampleNote,
  dealsSamples,
  dealsScreenshotAlt,
  orderSampleNote,
  orderSamples,
  otpOptInSteps,
  otpSampleNote,
  otpSamples,
  sms2faDisclosure,
  smsDealsCheckboxLabel,
  smsDealsDisclosure,
  smsOrderDisclosure,
} from "@/content/legal/sms-page";
import { siteConfig } from "@/content/site/settings";

const read = (path: string) => readFileSync(path, "utf8");
/** Page source without comments and import lines: what can reach the rendered page. */
const rendered = (path: string) =>
  read(path)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^import[\s\S]*?;$/gm, "");
const hasWord = (text: string, word: string) =>
  new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text);

describe("/sms/deals (Deals Marketing campaign, TCR C1DB2ES)", () => {
  const page = rendered("app/sms/deals/page.tsx");
  const visible = [
    page,
    dealsPage.title,
    dealsPage.whoSends,
    dealsPage.whatYouGet,
    dealsPage.terms,
    dealsPage.privacy,
    ...dealsOptInSteps,
    smsDealsCheckboxLabel,
    smsDealsDisclosure,
    dealsSampleNote,
    ...dealsSamples.flatMap((s) => [s.event, s.body]),
    dealsScreenshotAlt,
  ].join("\n");

  it("has the spec's wording, in order", () => {
    expect(dealsPage.title).toBe("N4Cluster Deals — Marketing Text Messages");
    expect(dealsPage.whoSends).toBe(
      "N4Cluster Deals is the marketing text program of N4Cluster Inc (n4cluster.com). N4Cluster sends every message. Restaurants do not send these texts and never receive your SMS consent.",
    );
    expect(dealsPage.whatYouGet).toBe(
      "Recurring automated marketing texts: offers, new menu items and reminders to reorder, only about restaurants you have ordered from on N4Cluster.",
    );
    expect(dealsPage.terms).toBe(
      "Message frequency varies. Message and data rates may apply. Reply HELP for help or email contact@n4cluster.com. Reply STOP to opt out at any time. Consent is not a condition of purchase.",
    );
    expect(dealsPage.privacy).toBe(
      "Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
    );
    const order = [
      "{dealsPage.title}",
      "{dealsPage.whoSends}",
      "{dealsPage.whatYouGet}",
      "dealsOptInSteps.map",
      "<DealsScreenshots />",
      "{smsDealsCheckboxLabel}",
      "smsDealsDisclosureParts.map",
      "{dealsPage.terms}",
      "dealsSamples.map",
      "{dealsPage.privacy}",
      'href="/terms#sms-deals"',
      'href="/privacy"',
      "{legalName}, {street}",
    ].map((marker) => page.indexOf(marker));
    expect(order.every((i) => i > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("lists the four marketing samples and nothing else", () => {
    expect(page).not.toContain("dealsReplies");
    expect(dealsSamples).toHaveLength(4);
    for (const { body } of dealsSamples) {
      expect(body.startsWith("N4Cluster Deals: ")).toBe(true);
      expect(body).toContain("https://www.n4cluster.com/r/ppg");
      expect(body.endsWith(" Reply STOP to opt out.")).toBe(true);
    }
  });

  it("uses none of the other programs' words or links", () => {
    for (const word of dealsPageForbidden) expect(hasWord(visible, word), word).toBe(false);
    expect(page).not.toMatch(/\/sms\/(orders|verification)/);
    expect(page).not.toMatch(/smsOrderDisclosure|orderSamples|sms2fa|otpSamples|otpOptInSteps/);
    expect(page).not.toContain('href="/sms"');
  });

  it("ends with the company's legal name, address, email and phone", () => {
    expect(siteConfig.company).toEqual({
      legalName: "N4Cluster Inc",
      street: "2001 Cumberland Valley Dr, Franklin, TN 37064",
    });
    expect(page).toContain("{email}");
    expect(page).toContain("{phone}");
  });
});

describe("/sms/orders and /sms/verification", () => {
  it("covers order texts only", () => {
    const page = rendered("app/sms/orders/page.tsx");
    const visible = [page, smsOrderDisclosure, orderSampleNote, ...orderSamples.map((s) => s.body)].join("\n");
    for (const word of ["marketing", "Deals", "verification", "code", "promotional"]) {
      expect(hasWord(visible, word), word).toBe(false);
    }
    expect(page).toContain('href="/terms#sms-orders"');
    expect(page).not.toMatch(/\/sms\/(deals|verification)/);
  });

  it("covers verification codes only, with the 2FA wording unchanged", () => {
    const page = rendered("app/sms/verification/page.tsx");
    const visible = [page, sms2faDisclosure, otpSampleNote, ...otpOptInSteps, ...otpSamples.map((s) => s.body)].join("\n");
    for (const word of ["marketing", "Deals", "offers", "order"]) {
      expect(hasWord(visible, word), word).toBe(false);
    }
    expect(page).toContain("sms2faDisclosureParts.map");
    expect(page).not.toMatch(/\/sms\/(deals|orders)/);
  });
});

describe("brand identity in the site footer", () => {
  it("shows the legal name and street address on every page", () => {
    const footer = read("components/layout/SiteFooter.tsx");
    expect(footer).toContain("{legalName} · {street}");
  });
});
