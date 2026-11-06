import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  smsAnchor,
  smsPrivacyHeading,
  smsPrivacyIntro,
  smsPrivacyStatement,
  smsPrograms,
  smsSharedItems,
  smsTermsHeading,
  smsTermsIntro,
} from "@/content/legal/sms";

const read = (path: string) => readFileSync(path, "utf8");

// The Telnyx campaign forms (order notifications C7Q0BFG, verification codes
// C9LCZ0T, and the N4Cluster Deals marketing campaign) quote these strings. Carrier vetting rejects a campaign whose
// website wording drifts from the registration, so these tests pin the exact
// text rather than its gist.
describe("SMS terms wording", () => {
  it("is anchored at #sms so the campaigns can link /terms#sms", () => {
    expect(smsAnchor).toBe("sms");
    expect(smsTermsHeading).toBe("Text Messaging (SMS) Terms");
  });

  it("introduces all three programs", () => {
    expect(smsTermsIntro).toBe(
      'N4Cluster Inc ("N4Cluster") operates three text message programs, each with its own opt-in. Order notifications and verification codes never include marketing. N4Cluster Deals is our marketing program and is sent only to diners who opt in to it separately.'
    );
    expect(smsPrograms.map((p) => p.title)).toEqual([
      "1. Order notifications",
      "2. Verification codes",
      "3. N4Cluster Deals",
    ]);
  });

  it("describes order notifications: who, how to join, what, how often", () => {
    expect(smsPrograms[0]).toEqual({
      title: "1. Order notifications",
      items: [
        "Who: diners who order from a restaurant through an N4Cluster-powered storefront.",
        'How to join: check "Text me updates about this order from N4Cluster" at checkout. Consent is not a condition of purchase.',
        "What you'll receive: texts about that order only, including order confirmation, ready-for-pickup alerts, delivery status with tracking links, a final request to rate your order, and replies to your order support questions.",
        "Frequency: message frequency varies by order.",
      ],
    });
  });

  it("describes verification codes for storefront diners only", () => {
    // Merchant-dashboard SMS login is not built, so the program must not claim it.
    expect(smsPrograms[1]).toEqual({
      title: "2. Verification codes",
      items: [
        "Program: N4Cluster Verification Codes.",
        "Who: diners using N4Cluster-powered storefronts.",
        'How to join: enter your mobile number and tap "Send code" when signing up, logging in, recovering your account, or changing your phone number.',
        "What you'll receive: a one-time passcode that expires in 10 minutes. No links, no marketing.",
        "Frequency: 1 message per request.",
        // True only while guest checkout needs no code; drop it if that changes.
        "Consent is not a condition of purchase.",
      ],
    });
    expect(JSON.stringify(smsPrograms)).not.toMatch(/merchant/i);
  });

  it("describes N4Cluster Deals: program, who, what, how often, consent", () => {
    expect(smsPrograms[2]).toEqual({
      title: "3. N4Cluster Deals",
      items: [
        "Program: N4Cluster Deals, recurring automated marketing texts sent by N4Cluster.",
        "Who: diners who check the optional N4Cluster Deals box at checkout or in account settings. The box is never pre-checked.",
        "What you'll receive: offers, new menu items and reminders to order again from restaurants you have ordered from on N4Cluster. Restaurants do not send these texts and never receive your SMS consent.",
        "Frequency: message frequency varies.",
        "Consent is not a condition of purchase.",
      ],
    });
  });

  it("keeps marketing out of order notifications and verification codes", () => {
    // "Never include marketing" covers programs 1 and 2 only; Deals is the marketing program.
    const nonMarketing = JSON.stringify(smsPrograms.slice(0, 2));
    expect(nonMarketing).not.toMatch(/marketing texts|offers|Deals/);
    expect(JSON.stringify(smsPrograms[2])).toContain("marketing texts");
  });

  it("carries rates, STOP, HELP, carrier and privacy terms for every program", () => {
    expect(smsSharedItems).toEqual([
      "Message and data rates may apply.",
      "To stop: reply STOP (or UNSUBSCRIBE, CANCEL, END, QUIT) at any time. You'll receive one confirmation and no further texts. Reply START to resubscribe.",
      "For help: reply HELP, email contact@n4cluster.com, or call +1 629-290-1191.",
      "Carriers are not liable for delayed or undelivered messages.",
      "Your mobile information is handled under our Privacy Policy (https://www.n4cluster.com/privacy). Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
    ]);
  });

  it("is rendered by the Terms page under the #sms anchor, with a current date", () => {
    const page = read("app/terms/page.tsx");
    expect(page).toContain("id={smsAnchor}");
    expect(page).toContain("smsPrograms.map");
    // The 2FA campaign quotes one program block, so each block carries the shared lines.
    expect(page).toMatch(/smsPrograms\.map\([\s\S]*program\.items\.map[\s\S]*smsSharedItems\.map[\s\S]*\)\)\}/);
    expect(page).not.toContain("smsSharedTitle");
    expect(page).toContain("Last updated: November 5, 2026");
  });
});

describe("SMS privacy wording", () => {
  it("describes all three programs", () => {
    expect(smsPrivacyHeading).toBe("Text messaging (SMS)");
    expect(smsPrivacyIntro).toBe(
      "N4Cluster sends three text message programs, each with its own opt-in, described in our SMS Terms (https://www.n4cluster.com/terms#sms): order notifications, verification codes, and N4Cluster Deals. N4Cluster Deals sends recurring marketing texts about restaurants you have ordered from, only if you check the separate, optional marketing box. Consent to marketing texts is not a condition of purchase. Message frequency varies. Replying STOP to an N4Cluster text ends texts from that program. Message and data rates may apply."
    );
  });

  it("keeps the exact non-sharing sentence reviewers look for", () => {
    expect(smsPrivacyStatement).toBe(
      "Mobile numbers and SMS opt-in data will not be sold or shared with third parties for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties, except service providers that help us deliver messages (such as our SMS provider)."
    );
  });

  it("is rendered by the Privacy page under the #sms anchor, with a current date", () => {
    const page = read("app/privacy/page.tsx");
    expect(page).toContain("id={smsAnchor}");
    expect(page).toContain("{smsPrivacyHeading}");
    expect(page).toContain("<LinkedText text={smsPrivacyIntro} />");
    expect(page).toContain("{smsPrivacyStatement}");
    expect(page).toContain("Last updated: November 5, 2026");
  });

  it("is not contradicted by a broader sharing clause elsewhere in the policy", () => {
    // The stricter statement only allows delivery providers. A leftover clause
    // allowing consent-management or support vendors would conflict with it.
    const page = read("app/privacy/page.tsx");
    expect(page).not.toContain("consent management, customer support");
    // Restaurants never send texts; the only marketing SMS is N4Cluster Deals.
    expect(page).not.toContain("participating restaurants may send");
    expect(page).not.toContain("opt out of promotional SMS");
    const flat = page.replace(/\s+/g, " ");
    expect(flat).not.toContain("does not currently send marketing text");
    expect(flat).toContain(
      "N4Cluster sends marketing text messages only through N4Cluster Deals, to diners who opt in separately. Restaurants do not send marketing texts through N4Cluster and never receive SMS consent records."
    );
  });

  it("tells diners how to stop N4Cluster Deals in the Section 8 opt-out paragraph", () => {
    const page = read("app/privacy/page.tsx");
    const flat = page.replace(/\s+/g, " ");
    const optOut = /You may opt out of promotional email[^<]*/.exec(flat)![0];
    expect(optOut).toContain("You may stop N4Cluster Deals texts at any time by replying STOP.");
  });

  it("excludes SMS opt-in data from every disclosure category in Section 5", () => {
    const page = read("app/privacy/page.tsx");
    const section5 = page.slice(page.indexOf('id="how-we-disclose"'), page.indexOf("We do not sell personal information"));
    expect(section5.replace(/\s+/g, " ")).toContain(
      "None of the categories above includes text messaging originator opt-in data or consent. We share those only with the service providers that deliver our text messages. See"
    );
    expect(section5).toContain('<a href="#sms">Text messaging (SMS)</a>');
  });
});

describe("SMS links from every page", () => {
  it("puts SMS Terms in the footer next to Privacy and Terms", () => {
    const footer = read("components/layout/SiteFooter.tsx");
    expect(footer).toMatch(/href="\/terms#sms"[^>]*>\s*SMS Terms\s*</);
  });
});
