import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  orderSampleNote,
  orderSamples,
  otpSamples,
  sms2faDisclosure,
  smsOrderDisclosure,
} from "@/content/legal/sms-page";

const read = (path: string) => readFileSync(path, "utf8");

const OTP_LITERAL =
  "By tapping Send code, you agree to receive a one-time verification text from N4Cluster at this number. 1 msg per request. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See our SMS Terms and Privacy Policy.";
const ORDER_LITERAL =
  "Text me updates about this order from N4Cluster. By checking this box, you agree to receive order-related text messages from N4Cluster at the number provided. Msg frequency varies by order. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.";

const bffLib = "../n4-storefront-bff/apps/storefront-bff/lib";

describe("sms page disclosures", () => {
  it("pins both disclosures literally", () => {
    expect(sms2faDisclosure).toBe(OTP_LITERAL);
    expect(smsOrderDisclosure).toBe(ORDER_LITERAL);
  });

  // Skipped where the sibling BFF checkout is absent (this repo's CI).
  it.skipIf(!existsSync(`${bffLib}/sms-otp-consent.ts`))(
    "disclosuresMatchTheBff",
    () => {
      const otp = read(`${bffLib}/sms-otp-consent.ts`);
      const order = read(`${bffLib}/sms-consent.ts`);
      const otpFirst = /text: '([^']*)'/.exec(otp)![1];
      expect(sms2faDisclosure.startsWith(otpFirst)).toBe(true);
      expect(otp).toContain("text: 'SMS Terms'");
      expect(otp).toContain("text: 'Privacy Policy'");
      expect(sms2faDisclosure.endsWith("SMS Terms and Privacy Policy.")).toBe(true);
      const statement = /SMS_CONSENT_STATEMENT =\s*'([^']*)'/.exec(order)![1];
      expect(smsOrderDisclosure).toBe(statement);
    },
  );
});

describe("sms page samples", () => {
  it("has the registered order texts and three OTP texts", () => {
    expect(orderSamples.map((s) => s.body)).toEqual([
      "N4Cluster: Your order #1042 from Pasta and Pita Grill is confirmed. Estimated ready time 6:45 PM. Reply STOP to opt out.",
      "N4Cluster: Your order #1042 from Pasta and Pita Grill is ready for pickup. Reply STOP to opt out.",
    ]);
    // Only real bodies: a second, template copy of each would drift from them unseen.
    expect(orderSamples.every((s) => Object.keys(s).sort().join() === "body,event")).toBe(true);
    expect(orderSampleNote).not.toMatch(/brace/i);
    for (const value of ["#1042", "Pasta and Pita Grill", "6:45 PM"]) {
      expect(orderSamples.some((s) => s.body.includes(value))).toBe(true);
    }
    expect(otpSamples.map((s) => s.body)).toEqual([
      "N4Cluster: Your verification code is 123456. It expires in 10 minutes. Do not share this code.",
      "N4Cluster: Use code 123456 to log in to your account. Valid for 10 minutes. Reply STOP to opt out.",
      "N4Cluster: Your account recovery code is 123456. It expires in 10 minutes. If you did not request this, ignore this message.",
    ]);
  });
});

describe("sms page", () => {
  const page = read("app/sms/page.tsx");

  it("pageRendersBothProgramsAndBothScreenshots", () => {
    expect(page).toContain("N4Cluster Text Messaging");
    expect(page).toContain("Order notifications");
    expect(page).toContain("Verification codes");
    expect(page).toContain("/sms/storefront-send-code.png");
    expect(page).toContain("/sms/checkout-optin.png");
    expect(page).toContain("sms2faDisclosure");
    expect(page).toContain("smsOrderDisclosure");
    expect(page).toContain("contact@n4cluster.com");
    expect(page).toContain("/terms#sms");
    expect(page).toContain("/privacy");
    expect(page).not.toMatch(/merchant dashboard/i);
  });

  // At least 2x a phone-width card (300 CSS px), and the <Image> size is the file's real size.
  it("screenshotsExistAt2xAndMatchTheirImageSize", () => {
    for (const f of ["storefront-send-code.png", "checkout-optin.png"]) {
      const buf = readFileSync(`public/sms/${f}`);
      expect(buf.subarray(1, 4).toString()).toBe("PNG");
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      expect(width).toBeGreaterThanOrEqual(600);
      expect(page).toMatch(
        new RegExp(`src="/sms/${f.replace(".", "\\.")}"\\s+width=\\{${width}\\}\\s+height=\\{${height}\\}`),
      );
    }
  });

  it("describesTheVerificationDisclosureAsBeneathSendCode", () => {
    expect(page).toContain("Disclosure shown beneath Send code");
    expect(page).toMatch(/alt="[^"]*Send code button[^"]*beneath it"/);
    expect(page).not.toMatch(/beside/i);
  });

  it("pageIsIndexable", () => {
    expect(page).not.toMatch(/index:\s*false/);
    expect(page).not.toMatch(/noindex/);
  });

  it("footerLinksTextMessaging", () => {
    const footer = read("components/layout/SiteFooter.tsx");
    expect(footer).toMatch(/href="\/sms"[^>]*>\s*Text Messaging\s*</);
    expect(footer.indexOf("SMS Terms")).toBeLessThan(footer.indexOf("Text Messaging"));
  });

  it("sitemapIncludesSms", () => {
    expect(read("app/sitemap.ts")).toContain('"/sms"');
  });
});
