import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  smsAnchor,
  smsPrivacyHeading,
  smsPrivacyIntro,
  smsPrivacyStatement,
  smsPrograms,
  smsSharedItems,
  smsSharedTitle,
  smsTermsHeading,
  smsTermsIntro,
} from "@/content/legal/sms";

const read = (path: string) => readFileSync(path, "utf8");

// The Telnyx campaign forms (order notifications C7Q0BFG, verification codes
// C9LCZ0T) quote these strings. Carrier vetting rejects a campaign whose
// website wording drifts from the registration, so these tests pin the exact
// text rather than its gist.
describe("SMS terms wording", () => {
  it("is anchored at #sms so the campaigns can link /terms#sms", () => {
    expect(smsAnchor).toBe("sms");
    expect(smsTermsHeading).toBe("Text Messaging (SMS) Terms");
  });

  it("introduces both programs", () => {
    expect(smsTermsIntro).toBe(
      'N4Cluster Inc ("N4Cluster") operates two text message programs. Both are sent from N4Cluster and never include marketing.'
    );
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
        "Who: diners using N4Cluster-powered storefronts.",
        'How to join: enter your mobile number and tap "Send code" when signing up, logging in, recovering your account, or changing your phone number.',
        "What you'll receive: a one-time passcode that expires in 10 minutes. No links, no marketing.",
        "Frequency: one message per request.",
      ],
    });
    expect(JSON.stringify(smsPrograms)).not.toMatch(/merchant/i);
  });

  it("carries rates, STOP, HELP, carrier and privacy terms for both programs", () => {
    expect(smsSharedTitle).toBe("For both programs");
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
    expect(page).toContain("smsSharedItems.map");
    expect(page).toContain("Last updated: October 22, 2026");
  });
});

describe("SMS privacy wording", () => {
  it("describes both kinds of text", () => {
    expect(smsPrivacyHeading).toBe("Text messaging (SMS)");
    expect(smsPrivacyIntro).toBe(
      'N4Cluster sends two kinds of texts, described in our Text Messaging (SMS) Terms (https://www.n4cluster.com/terms#sms): (1) order-related texts to diners who opt in at checkout, and (2) one-time verification codes to diners who request one by tapping "Send code". Message frequency varies; message and data rates may apply. Reply STOP to opt out or HELP for help.'
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
    expect(page).toContain("Last updated: October 22, 2026");
  });

  it("is not contradicted by a broader sharing clause elsewhere in the policy", () => {
    // The stricter statement only allows delivery providers. A leftover clause
    // allowing consent-management or support vendors would conflict with it.
    expect(read("app/privacy/page.tsx")).not.toContain("consent management, customer support");
  });
});

describe("SMS links from every page", () => {
  it("puts SMS Terms in the footer next to Privacy and Terms", () => {
    const footer = read("components/layout/SiteFooter.tsx");
    expect(footer).toMatch(/href="\/terms#sms"[^>]*>\s*SMS Terms\s*</);
  });
});
