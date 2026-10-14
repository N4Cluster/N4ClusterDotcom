import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  smsAnchor,
  smsPrivacyStatement,
  smsTermsHeading,
  smsTermsIntro,
  smsTermsItems,
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

  it("is rendered by the Terms page under the #sms anchor, with a current date", () => {
    const page = read("app/terms/page.tsx");
    expect(page).toContain("id={smsAnchor}");
    expect(page).toContain("smsTermsItems.map");
    expect(page).not.toContain("Last updated: March 2025");
  });
});

describe("SMS privacy wording", () => {
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
