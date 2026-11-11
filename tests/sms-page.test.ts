import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  dealsOptInSteps,
  dealsReplies,
  dealsSampleNote,
  dealsSamples,
  dealsScreenshotAlt,
  orderSampleNote,
  orderSamples,
  otpOptInSteps,
  otpSamples,
  sms2faDisclosure,
  smsDealsCheckboxLabel,
  smsDealsDisclosure,
  smsDealsDisclosureParts,
  smsOrderDisclosure,
} from "@/content/legal/sms-page";

const read = (path: string) => readFileSync(path, "utf8");

const OTP_LITERAL =
  "By tapping Send code, you agree to receive a one-time verification text from N4Cluster at this number. 1 msg per request. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See our SMS Terms and Privacy Policy.";
const ORDER_LITERAL =
  "Text me updates about this order from N4Cluster. By checking this box, you agree to receive order-related text messages from N4Cluster at the number provided. Msg frequency varies by order. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.";
const DEALS_LABEL_LITERAL = "Text me N4Cluster Deals: offers about restaurants I've ordered from.";
const DEALS_LITERAL =
  "By checking this box, you agree to receive recurring automated marketing texts from N4Cluster Deals at the number provided, including offers, new menu items and reminders to order from restaurants you've ordered from on N4Cluster. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See our SMS Terms and Privacy Policy.";

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
      // The BFF either spells the statement out, or joins a label (the clickable part) and details.
      const literal = /SMS_CONSENT_STATEMENT =\s*'([^']*)'/.exec(order);
      const label = /SMS_CONSENT_LABEL =\s*'([^']*)'/.exec(order);
      const details = /SMS_CONSENT_DETAILS =\s*'([^']*)'/.exec(order);
      const statement = literal
        ? literal[1]
        : order.includes("SMS_CONSENT_STATEMENT = `${SMS_CONSENT_LABEL} ${SMS_CONSENT_DETAILS}`")
          ? `${label![1]} ${details![1]}`
          : undefined;
      expect(smsOrderDisclosure).toBe(statement);
    },
  );

  it("pins the Deals label and disclosure literally", () => {
    expect(smsDealsCheckboxLabel).toBe(DEALS_LABEL_LITERAL);
    expect(smsDealsDisclosure).toBe(DEALS_LITERAL);
    expect(smsDealsDisclosureParts.filter((p) => p.type === "link")).toEqual([
      { type: "link", text: "SMS Terms", href: "/terms#sms" },
      { type: "link", text: "Privacy Policy", href: "/privacy" },
    ]);
  });

  // Skipped where the sibling BFF checkout is absent (this repo's CI). The BFF
  // double-quotes strings that contain an apostrophe, so both quote styles are read.
  it.skipIf(!existsSync(`${bffLib}/sms-marketing-consent.ts`))(
    "dealsDisclosureMatchesTheBff",
    () => {
      const deals = read(`${bffLib}/sms-marketing-consent.ts`);
      const quoted = `(?:"([^"]*)"|'([^']*)')`;
      const label = new RegExp(`SMS_DEALS_CHECKBOX_LABEL =\\s*${quoted}`).exec(deals)!;
      expect(smsDealsCheckboxLabel).toBe(label[1] ?? label[2]);

      const block = /SMS_DEALS_DISCLOSURE_PARTS[^=]*=\s*\[([\s\S]*?)\];/.exec(deals)![1];
      const partPattern = new RegExp(`type:\\s*'(text|link)',\\s*text:\\s*${quoted}(?:,\\s*href:\\s*(\\w+))?`, "g");
      const parts = [...block.matchAll(partPattern)].map((m) => ({
        type: m[1],
        text: m[2] ?? m[3],
        hrefConst: m[4],
      }));
      expect(parts.map((p) => p.type)).toEqual(smsDealsDisclosureParts.map((p) => p.type));
      expect(parts.map((p) => p.text)).toEqual(smsDealsDisclosureParts.map((p) => p.text));

      // The BFF links absolute n4cluster.com URLs; this page links the same paths.
      const consts = [read(`${bffLib}/sms-consent.ts`), read(`${bffLib}/sms-otp-consent.ts`)].join("\n");
      const urlOf = (name: string) => new RegExp(`${name} = '([^']*)'`).exec(consts)![1];
      const ours = smsDealsDisclosureParts.filter((p) => p.type === "link");
      const theirs = parts.filter((p) => p.type === "link");
      expect(theirs.map((p) => p.hrefConst)).toEqual(["SMS_TERMS_URL", "SMS_OTP_PRIVACY_URL"]);
      theirs.forEach((p, i) => {
        const url = new URL(urlOf(p.hrefConst!));
        expect(url.origin).toBe("https://www.n4cluster.com");
        expect(url.pathname + url.hash).toBe(ours[i].href);
      });
    },
  );
});

describe("sms page samples", () => {
  it("has the registered order texts and one OTP text per Send code event", () => {
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
    // Phone change sends the sign-up body (notification-service OtpTemplates), so it repeats here.
    expect(otpSamples).toEqual([
      { event: "Sign-up", body: "N4Cluster: Your verification code is 123456. It expires in 10 minutes. Do not share this code." },
      { event: "Login", body: "N4Cluster: Use code 123456 to log in to your account. Valid for 10 minutes. Reply STOP to opt out." },
      { event: "Phone number change", body: "N4Cluster: Your verification code is 123456. It expires in 10 minutes. Do not share this code." },
      { event: "Account recovery", body: "N4Cluster: Your account recovery code is 123456. It expires in 10 minutes. If you did not request this, ignore this message." },
    ]);
  });

  it("has the four Deals samples, each a compliant N4Cluster Deals body", () => {
    expect(dealsSamples).toEqual([
      { event: "Limited-time offer", body: "N4Cluster Deals: $5 off orders of $25+ at Pasta and Pita Grill, today only. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out." },
      { event: "Featured dish", body: "N4Cluster Deals: Try the Beef, Chicken or Mixed Gyro Plate at Pasta and Pita Grill this week. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out." },
      { event: "Order again", body: "N4Cluster Deals: It's been a while! Reorder from Pasta and Pita Grill: https://www.n4cluster.com/r/ppg Reply STOP to opt out." },
      { event: "Weekend offer", body: "N4Cluster Deals: Free baklava with any Pasta and Pita Grill order over $30 this weekend. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out." },
    ]);
    expect(dealsSampleNote).toBe("Offers, restaurants and dishes vary; these examples use one restaurant.");
    for (const { body } of dealsSamples) {
      expect(body.startsWith("N4Cluster Deals: ")).toBe(true);
      expect(body.endsWith(" Reply STOP to opt out.")).toBe(true);
      for (const url of body.match(/https?:\/\/\S+/g) ?? []) {
        expect(url.startsWith("https://www.n4cluster.com/")).toBe(true);
      }
    }
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
    for (const f of ["storefront-send-code.png", "checkout-optin.png", "checkout-deals-optin.png", "account-deals-optin.png"]) {
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

  it("rendersTheDealsSectionAfterVerificationCodes", () => {
    const deals = page.indexOf("<h2>N4Cluster Deals</h2>");
    const more = page.indexOf("<h2>More information</h2>");
    expect(deals).toBeGreaterThan(page.indexOf("<h2>Verification codes</h2>"));
    expect(deals).toBeLessThan(more);
    expect(page).toContain(
      "N4Cluster sends three kinds of text messages, each with its own opt-in. Only N4Cluster Deals contains marketing, and it needs its own checkbox.",
    );
    expect(page).not.toContain("Neither includes marketing");
    const section = page.slice(deals, more);
    expect(section).toContain("How to opt in");
    expect(section).toContain("dealsOptInSteps.map");
    expect(section).toContain("Disclosure shown beneath the checkbox");
    expect(section).toContain("{smsDealsCheckboxLabel}");
    expect(section).toContain("smsDealsDisclosureParts.map");
    expect(section).toContain("dealsSamples.map");
    expect(section).toContain("Confirmation, help and opt-out messages");
    expect(section).toContain("dealsReplies.map");
    // Verbatim from notification-service DealsTemplates and the Telnyx Deals campaign.
    expect(dealsReplies).toEqual([
      { event: "After you opt in", body: "N4Cluster Deals: You're signed up for offers about restaurants you've ordered from on N4Cluster. Msg frequency varies. Msg&data rates may apply. Reply HELP for help, STOP to opt out." },
      { event: "If you reply HELP", body: "N4Cluster Deals: For help, email contact@n4cluster.com. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out." },
      { event: "If you reply STOP", body: "N4Cluster Deals: You are unsubscribed and will receive no further marketing texts. Reply START to resubscribe." },
    ]);
    expect(section).not.toContain("TODO(sms-deals-screenshots)");
    expect(section).toContain("alt={dealsScreenshotAlt.checkout}");
    expect(section).toContain("alt={dealsScreenshotAlt.account}");
    expect(dealsOptInSteps).toEqual([
      "At checkout on any N4Cluster-powered storefront, or in your account settings, find the N4Cluster Deals box. It is unchecked.",
      "Read the disclosure beneath it.",
      "Check the box only if you want deals texts. Your order goes through either way.",
    ]);
  });

  it("hasDealsScreenshotAltTextReady", () => {
    expect(dealsScreenshotAlt.checkout).toBe(
      "Storefront checkout with the N4Cluster Deals checkbox unchecked by default and its marketing disclosure beneath it",
    );
    expect(dealsScreenshotAlt.account).toBe(
      "Storefront account settings page with the N4Cluster Deals checkbox unchecked by default and its marketing disclosure beneath it",
    );
  });

  it("listsTheVerificationOptInStepsAboveTheScreenshot", () => {
    expect(otpOptInSteps).toEqual([
      "On any N4Cluster-powered storefront, open sign up, log in, account recovery or change phone number.",
      "Enter your mobile number.",
      'Read the disclosure below the button and tap "Send code".',
    ]);
    expect(page).toContain("How to opt in");
    expect(page.indexOf("otpOptInSteps.map")).toBeGreaterThan(-1);
    expect(page.indexOf("otpOptInSteps.map")).toBeLessThan(page.indexOf("/sms/storefront-send-code.png"));
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
