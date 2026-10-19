import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  smsAnchor,
  smsPrivacyIntro,
  smsPrivacyStatement,
  smsTermsHeading,
  smsTermsIntro,
  smsTermsItems,
  smsVerificationIntro,
  smsVerificationItems,
  smsVerificationLabel,
} from "@/content/legal/sms";

const read = (path: string) => readFileSync(path, "utf8");

// The Telnyx campaign form quotes these strings. Carrier vetting rejects a
// campaign whose website wording drifts from the registration, so these tests
// pin the exact text rather than its gist.
describe("SMS terms wording", () => {
  it("is anchored at #sms so the campaign can link /terms#sms", () => {
    expect(smsAnchor).toBe("sms");
    expect(smsTermsHeading).toBe("Text Messaging (SMS) Terms");
  });

  it("names the program, the sender, and who it is for", () => {
    expect(smsTermsIntro).toBe(
      'N4Cluster Inc ("N4Cluster") offers an order notification text message program for diners who order from restaurants using N4Cluster-powered storefronts.'
    );
  });

  it("carries every disclosure carriers require", () => {
    const all = smsTermsItems.join("\n");
    for (const required of [
      "We do not send marketing messages through this program.",
      'check the "Text me updates about this order from N4Cluster" box at checkout',
      "Consent is not a condition of purchase.",
      "Message frequency varies by order.",
      "Message and data rates may apply.",
      "reply STOP (or UNSUBSCRIBE, CANCEL, END, QUIT) at any time",
      "Reply START to resubscribe.",
      "For help: reply HELP, or email contact@n4cluster.com.",
      "Carriers are not liable for delayed or undelivered messages.",
      "Privacy Policy (https://www.n4cluster.com/privacy)",
      "Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
    ]) {
      expect(all).toContain(required);
    }
    expect(smsTermsItems).toHaveLength(8);
  });

  it("says ready-for-pickup alerts carry pickup codes", () => {
    expect(smsTermsItems[0]).toContain("ready-for-pickup alerts with pickup codes,");
  });

  it("is rendered by the Terms page under the #sms anchor, with a current date", () => {
    const page = read("app/terms/page.tsx");
    expect(page).toContain("id={smsAnchor}");
    expect(page).toContain("smsTermsItems.map");
    expect(page).not.toContain("Last updated: March 2025");
    expect(page).toContain("Last updated: October 19, 2026");
  });
});

// The 2FA campaign registration quotes this subsection, so it is pinned verbatim.
describe("SMS verification-code wording", () => {
  it("describes one-time passcodes as requested, non-marketing messages", () => {
    expect(smsVerificationLabel).toBe("Verification codes.");
    expect(smsVerificationIntro).toBe(
      "N4Cluster also sends one-time passcodes by text when you sign up, verify your phone number, or log in on an N4Cluster-powered storefront. A code is sent only when you request one, and these messages contain no marketing."
    );
  });

  it("states how to join, the frequency, rates, STOP and HELP", () => {
    expect(smsVerificationItems).toEqual([
      'How to join: enter your mobile number and tap "Send code" on the sign-up or login screen.',
      "Message frequency: one message per code you request.",
      "Message and data rates may apply. Reply STOP to opt out, or HELP for help.",
    ]);
  });

  it("is rendered on the Terms page after the order-notification items", () => {
    const page = read("app/terms/page.tsx");
    const orderItems = page.indexOf("smsTermsItems.map");
    const verification = page.indexOf("smsVerificationItems.map");
    expect(verification).toBeGreaterThan(orderItems);
    expect(page).toContain("{smsVerificationLabel}");
    expect(page).toContain("{smsVerificationIntro}");
  });
});

describe("SMS privacy wording", () => {
  it("opens by covering both order texts and verification codes", () => {
    expect(smsPrivacyIntro).toBe(
      "Diners who opt in at checkout receive order-related texts from N4Cluster, and customers who request a verification code receive one-time passcodes for sign-up, phone verification and login, as described in our Text Messaging (SMS) Terms."
    );
  });

  it("is dated October 19, 2026", () => {
    expect(read("app/privacy/page.tsx")).toContain("Last updated: October 19, 2026");
  });

  it("is the exact sentence reviewers look for", () => {
    expect(smsPrivacyStatement).toBe(
      "Mobile numbers and SMS opt-in data will not be sold or shared with third parties for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties, except service providers that help us deliver messages (such as our SMS provider)."
    );
  });

  it("is rendered by the Privacy page under the #sms anchor", () => {
    const page = read("app/privacy/page.tsx");
    expect(page).toContain("id={smsAnchor}");
    expect(page).toContain("{smsPrivacyStatement}");
  });

  it("is not contradicted by a broader sharing clause elsewhere in the policy", () => {
    // The stricter statement only allows delivery providers. A leftover clause
    // allowing consent-management or support vendors would conflict with it.
    expect(read("app/privacy/page.tsx")).not.toContain("consent management, customer support");
  });
});
