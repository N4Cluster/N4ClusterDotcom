/**
 * Content for the public /sms page, which lets carrier reviewers see each SMS
 * program's opt-in screen and exact disclosure without placing an order or
 * creating an account.
 *
 * Every string is verbatim from the product and the Telnyx registrations:
 * the disclosures from the storefront BFF (lib/sms-otp-consent.ts and
 * lib/sms-consent.ts), the order samples from notification-service migration
 * V012, the OTP samples from notification-service OtpTemplates and the 2FA
 * campaign. Change them only together
 * with those sources (tests/sms-page.test.ts compares against the BFF).
 */

/** Parts of the verification-code disclosure; link parts render as anchors. */
export const sms2faDisclosureParts = [
  {
    type: "text",
    text: "By tapping Send code, you agree to receive a one-time verification text from N4Cluster at this number. 1 msg per request. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See our ",
  },
  { type: "link", text: "SMS Terms", href: "/terms#sms" },
  { type: "text", text: " and " },
  { type: "link", text: "Privacy Policy", href: "/privacy" },
  { type: "text", text: "." },
] as const;

export const sms2faDisclosure = sms2faDisclosureParts.map((p) => p.text).join("");

/** Checkout consent wording; the Terms and Privacy links follow it on screen. */
export const smsOrderDisclosure =
  "Text me updates about this order from N4Cluster. By checking this box, you agree to receive order-related text messages from N4Cluster at the number provided. Msg frequency varies by order. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.";

export const orderSampleNote =
  "Order number, restaurant name and ready time vary by order; these examples use made-up values.";

export const orderSamples = [
  {
    event: "Order confirmed",
    body: "N4Cluster: Your order #1042 from Pasta and Pita Grill is confirmed. Estimated ready time 6:45 PM. Reply STOP to opt out.",
  },
  {
    event: "Order ready for pickup",
    body: "N4Cluster: Your order #1042 from Pasta and Pita Grill is ready for pickup. Reply STOP to opt out.",
  },
] as const;

export const otpSampleNote =
  "The code varies with each request. The examples below show 123456.";

export const otpOptInSteps = [
  "On any N4Cluster-powered storefront, open sign up, log in, account recovery or change phone number.",
  "Enter your mobile number.",
  'Read the disclosure below the button and tap "Send code".',
] as const;

/** One sample per Send code event; phone change sends the sign-up body. */
export const otpSamples = [
  {
    event: "Sign-up",
    body: "N4Cluster: Your verification code is 123456. It expires in 10 minutes. Do not share this code.",
  },
  {
    event: "Login",
    body: "N4Cluster: Use code 123456 to log in to your account. Valid for 10 minutes. Reply STOP to opt out.",
  },
  {
    event: "Phone number change",
    body: "N4Cluster: Your verification code is 123456. It expires in 10 minutes. Do not share this code.",
  },
  {
    event: "Account recovery",
    body: "N4Cluster: Your account recovery code is 123456. It expires in 10 minutes. If you did not request this, ignore this message.",
  },
] as const;
