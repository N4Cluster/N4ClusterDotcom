/**
 * Content for the public /sms page, which lets carrier reviewers see each SMS
 * program's opt-in screen and exact disclosure without placing an order or
 * creating an account.
 *
 * Every string is verbatim from the product and the Telnyx registrations:
 * the disclosures from the storefront BFF (lib/sms-otp-consent.ts,
 * lib/sms-consent.ts and lib/sms-marketing-consent.ts), the order samples from notification-service migration
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

/** Deals checkbox label, verbatim from the BFF's SMS_DEALS_CHECKBOX_LABEL. */
export const smsDealsCheckboxLabel = "Text me N4Cluster Deals: offers about restaurants I've ordered from.";

/**
 * Parts of the Deals disclosure shown beneath the checkbox, verbatim from the
 * BFF's SMS_DEALS_DISCLOSURE_PARTS; link parts render as anchors.
 */
export const smsDealsDisclosureParts = [
  {
    type: "text",
    text: "By checking this box, you agree to receive recurring automated marketing texts from N4Cluster Deals at the number provided, including offers, new menu items and reminders to order from restaurants you've ordered from on N4Cluster. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See our ",
  },
  { type: "link", text: "SMS Terms", href: "/terms#sms" },
  { type: "text", text: " and " },
  { type: "link", text: "Privacy Policy", href: "/privacy" },
  { type: "text", text: "." },
] as const;

export const smsDealsDisclosure = smsDealsDisclosureParts.map((p) => p.text).join("");

export const dealsOptInSteps = [
  "At checkout on any N4Cluster-powered storefront, or in your account settings, find the N4Cluster Deals box. It is unchecked.",
  "Read the disclosure beneath it.",
  "Check the box only if you want deals texts. Your order goes through either way.",
] as const;

/**
 * Alt text for the Deals screenshots, ready for when they are captured from the
 * live storefront (public/sms/checkout-deals-optin.png and
 * public/sms/account-deals-optin.png). The account one shows /account/settings.
 */
export const dealsScreenshotAlt = {
  checkout:
    "Storefront checkout with the N4Cluster Deals checkbox unchecked by default and its marketing disclosure beneath it",
  account:
    "Storefront account settings page with the N4Cluster Deals checkbox unchecked by default and its marketing disclosure beneath it",
} as const;

export const dealsSampleNote = "Offers, restaurants and dishes vary; these examples use one restaurant.";

export const dealsSamples = [
  {
    event: "Limited-time offer",
    body: "N4Cluster Deals: $5 off orders of $25+ at Pasta and Pita Grill, today only. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Featured dish",
    body: "N4Cluster Deals: Try the Beef, Chicken or Mixed Gyro Plate at Pasta and Pita Grill this week. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Order again",
    body: "N4Cluster Deals: It's been a while! Reorder from Pasta and Pita Grill: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Weekend offer",
    body: "N4Cluster Deals: Free baklava with any Pasta and Pita Grill order over $30 this weekend. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
] as const;
