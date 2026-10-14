/**
 * SMS program wording registered with our Telnyx 10DLC campaign (brand
 * "N4Cluster", TCR ID BN2CZLB, use case Low Volume Mixed).
 *
 * Carrier vetting compares these pages against the campaign form, so the text
 * here is verbatim and must not be reworded. A change to any string means the
 * campaign registration (and the storefront checkout label) must change with it.
 */

/** Anchor for both /terms#sms and /privacy#sms, linked from the campaign form. */
export const smsAnchor = "sms";

export const smsTermsHeading = "Text Messaging (SMS) Terms";

export const smsTermsIntro =
  'N4Cluster Inc ("N4Cluster") offers an order notification text message program for diners who order from restaurants using N4Cluster-powered storefronts.';

export const smsTermsItems = [
  "What you'll receive: order-related texts only. These include order confirmations, ready-for-pickup alerts, delivery status updates with tracking links, and replies to your order support questions. We do not send marketing messages through this program.",
  'How to join: check the "Text me updates about this order from N4Cluster" box at checkout. Consent is not a condition of purchase.',
  "Message frequency varies by order.",
  "Message and data rates may apply.",
  "To stop: reply STOP (or UNSUBSCRIBE, CANCEL, END, QUIT) at any time. You'll receive one confirmation message and no further texts. Reply START to resubscribe.",
  "For help: reply HELP, or email contact@n4cluster.com.",
  "Carriers are not liable for delayed or undelivered messages.",
  "Your mobile information is handled under our Privacy Policy (https://www.n4cluster.com/privacy). Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
] as const;

/** The sentence carrier reviewers look for in the Privacy Policy. */
export const smsPrivacyStatement =
  "Mobile numbers and SMS opt-in data will not be sold or shared with third parties for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties, except service providers that help us deliver messages (such as our SMS provider).";
