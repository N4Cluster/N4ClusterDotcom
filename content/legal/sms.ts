/**
 * SMS program wording registered with our Telnyx 10DLC campaigns (brand
 * "N4Cluster", TCR ID BN2CZLB): the Low Volume Mixed campaign C7Q0BFG for
 * order notifications, and the 2FA campaign C9LCZ0T for verification codes.
 *
 * Carrier vetting compares these pages against the campaign forms, so the text
 * here is verbatim and must not be reworded. A change to any string means the
 * campaign registrations (and the storefront opt-in copy) must change with it.
 */

/** Anchor for both /terms#sms and /privacy#sms, linked from the campaign forms. */
export const smsAnchor = "sms";

export const smsTermsHeading = "Text Messaging (SMS) Terms";

export const smsTermsIntro =
  'N4Cluster Inc ("N4Cluster") operates two text message programs. Both are sent from N4Cluster and never include marketing.';

export const smsPrograms = [
  {
    title: "1. Order notifications",
    items: [
      "Who: diners who order from a restaurant through an N4Cluster-powered storefront.",
      'How to join: check "Text me updates about this order from N4Cluster" at checkout. Consent is not a condition of purchase.',
      "What you'll receive: texts about that order only, including order confirmation, ready-for-pickup alerts, delivery status with tracking links, a final request to rate your order, and replies to your order support questions.",
      "Frequency: message frequency varies by order.",
    ],
  },
  {
    title: "2. Verification codes",
    items: [
      "Who: diners using N4Cluster-powered storefronts.",
      'How to join: enter your mobile number and tap "Send code" when signing up, logging in, recovering your account, or changing your phone number.',
      "What you'll receive: a one-time passcode that expires in 10 minutes. No links, no marketing.",
      "Frequency: one message per request.",
    ],
  },
] as const;

export const smsSharedTitle = "For both programs";

export const smsSharedItems = [
  "Message and data rates may apply.",
  "To stop: reply STOP (or UNSUBSCRIBE, CANCEL, END, QUIT) at any time. You'll receive one confirmation and no further texts. Reply START to resubscribe.",
  "For help: reply HELP, email contact@n4cluster.com, or call +1 629-290-1191.",
  "Carriers are not liable for delayed or undelivered messages.",
  "Your mobile information is handled under our Privacy Policy (https://www.n4cluster.com/privacy). Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
] as const;

export const smsPrivacyHeading = "Text messaging (SMS)";

/** First paragraph of the Privacy Policy's SMS subsection. */
export const smsPrivacyIntro =
  'N4Cluster sends two kinds of texts, described in our Text Messaging (SMS) Terms (https://www.n4cluster.com/terms#sms): (1) order-related texts to diners who opt in at checkout, and (2) one-time verification codes to diners who request one by tapping "Send code". Message frequency varies; message and data rates may apply. Reply STOP to opt out or HELP for help.';

/** The sentence carrier reviewers look for in the Privacy Policy. */
export const smsPrivacyStatement =
  "Mobile numbers and SMS opt-in data will not be sold or shared with third parties for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties, except service providers that help us deliver messages (such as our SMS provider).";
