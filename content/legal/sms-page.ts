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

/** Deals checkbox label, verbatim from the BFF's SMS_DEALS_CHECKBOX_LABEL (v2, campaign resubmission). */
export const smsDealsCheckboxLabel = "Text me N4Cluster Deals: marketing offers about restaurants I've ordered from.";

/**
 * Parts of the Deals disclosure shown beneath the checkbox, verbatim from the
 * BFF's SMS_DEALS_DISCLOSURE_PARTS (v2); link parts render as anchors.
 */
export const smsDealsDisclosureParts = [
  {
    type: "text",
    text: "By checking this box, you agree to receive recurring automated marketing texts from N4Cluster Deals (N4Cluster Inc) at the number provided, including offers, new menu items and reminders to reorder from restaurants you've ordered from on N4Cluster. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. See ",
  },
  { type: "link", text: "Program details", href: "/sms/deals" },
  { type: "text", text: ", " },
  { type: "link", text: "SMS Terms", href: "/terms#sms-deals" },
  { type: "text", text: " and " },
  { type: "link", text: "Privacy Policy", href: "/privacy" },
  { type: "text", text: "." },
] as const;

export const smsDealsDisclosure = smsDealsDisclosureParts.map((p) => p.text).join("");

export const dealsOptInSteps = [
  "Order on any N4Cluster-powered restaurant storefront (example: https://pastaandpitagrill.com), or open your account settings on that storefront.",
  "Check the separate, optional box \"Text me N4Cluster Deals: marketing offers about restaurants I've ordered from.\" It is unchecked by default, and your order goes through whether or not you check it.",
  "You'll receive one confirmation text.",
] as const;

/**
 * The Deals screenshots in public/sms (deals-checkout.png from checkout, deals-account.png from
 * /account/settings), cropped so only the Deals checkbox and its disclosure show, captured at 2x
 * with the box unchecked.
 */
export const dealsScreenshotAlt = "N4Cluster Deals marketing checkbox, unchecked by default, with disclosure.";

export const dealsSampleNote = "Offers, restaurants and dishes vary; these examples use one restaurant.";

/** The four marketing samples registered with the Deals campaign (TCR C1DB2ES). */
export const dealsSamples = [
  {
    event: "Limited-time offer",
    body: "N4Cluster Deals: $5 off orders of $25+ at Pasta and Pita Grill, today only. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Featured dish",
    body: "N4Cluster Deals: New at Pasta and Pita Grill: Beef, Chicken or Mixed Gyro Plates. Try one this week: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Order again",
    body: "N4Cluster Deals: It's been a while! Reorder your favorites from Pasta and Pita Grill: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
  {
    event: "Weekend offer",
    body: "N4Cluster Deals: Free baklava with any Pasta and Pita Grill order over $30 this weekend. Order: https://www.n4cluster.com/r/ppg Reply STOP to opt out.",
  },
] as const;

/**
 * The program's own texts, verbatim from notification-service DealsTemplates and the Deals
 * campaign's auto-responses. Shown on /sms only: /sms/deals lists marketing samples alone.
 */
export const dealsReplies = [
  {
    event: "After you opt in",
    body: "N4Cluster Deals: You're signed up for marketing offers from N4Cluster about restaurants you've ordered from. Msg frequency varies. Msg&data rates may apply. Reply HELP for help, STOP to opt out.",
  },
  {
    event: "If you reply HELP",
    body: "N4Cluster Deals: For help, email contact@n4cluster.com or visit https://www.n4cluster.com/sms/deals. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out.",
  },
  {
    event: "If you reply STOP",
    body: "N4Cluster Deals: You are unsubscribed from marketing texts and will receive no further messages from this program. Reply START to resubscribe.",
  },
] as const;

/** /sms/deals: the Deals Marketing campaign's opt-in page. Marketing only (spec section 2.1). */
export const dealsPage = {
  title: "N4Cluster Deals — Marketing Text Messages",
  whoSends:
    "N4Cluster Deals is the marketing text program of N4Cluster Inc (n4cluster.com). N4Cluster sends every message. Restaurants do not send these texts and never receive your SMS consent.",
  whatYouGet:
    "Recurring automated marketing texts: offers, new menu items and reminders to reorder, only about restaurants you have ordered from on N4Cluster.",
  terms:
    "Message frequency varies. Message and data rates may apply. Reply HELP for help or email contact@n4cluster.com. Reply STOP to opt out at any time. Consent is not a condition of purchase.",
  privacy:
    "Mobile numbers and SMS opt-in data are never sold or shared with third parties for marketing or promotional purposes.",
} as const;

/** Words that must not appear on /sms/deals: they belong to the other two programs (spec section 2.1). */
export const dealsPageForbidden = ["order updates", "order notifications", "verification", "code", "2FA", "transactional"] as const;
