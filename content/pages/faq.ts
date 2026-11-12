import type { FAQItem } from "@/components/sections/FAQAccordion";
import { priceDisplay } from "@/content/site/pricing";

/**
 * Shared FAQ source. Rendered in full by /faq (which also builds its FAQPage
 * structured data from this array) and as the first five entries on /contact, so
 * a correction here lands everywhere at once.
 *
 * Commercial answers follow the fee-claim rules in content/site/pricing.ts:
 * card processing, delivery charges and the Neighborhood fee are always named as
 * separate from N4Cluster's fees.
 */
export const faqItems: FAQItem[] = [
  {
    question: "Is it really commission-free?",
    answer:
      "Yes. No commission, ever. You pay one fixed price, the same on every order whatever the ticket size, plus standard card processing. On a $40 order, you keep $38.04. The exact figures are on our pricing page. Any delivery charges are separate.",
  },
  {
    question: "What does my customer pay?",
    answer:
      "Your menu prices, plus a small flat Neighborhood fee at checkout. That fee is on top of the order, not taken out of your share, unless you choose to absorb it.",
  },
  {
    question: "What is N4Cluster?",
    answer:
      "N4Cluster gives neighborhood restaurants a branded direct-ordering channel, so customers who already know you can order from you under your own name. It includes your own ordering site, rewards, growth tools, and delivery coordination, for one fixed price with no commission, ever. Card processing and any delivery charges are separate.",
  },
  {
    question: "How is N4Cluster different from marketplace delivery platforms?",
    answer:
      "Marketplaces typically take 20–30% commission on every order and keep the customer relationship. N4Cluster charges one fixed, published price instead of a share of your revenue, with no commission, ever. You take orders under your own brand and domain, and the customer and order information from those orders is available to you. Card processing and any delivery charges are separate from N4Cluster's fees.",
  },
  {
    question: "Do I have to quit DoorDash or Uber Eats?",
    answer:
      "No. You can keep the delivery apps that help people discover your restaurant. N4Cluster gives customers who already know you a direct way to order under your own brand. You decide how each channel fits your business.",
  },
  {
    question: "What does the price cover?",
    answer:
      "They cover the N4Cluster platform: your branded ordering site, rewards, growth tools, delivery coordination, and POS integration. There are no tiered plans and no add-on modules. Two things are not included: card processing, which your payment processor charges separately, and any delivery charges. Diners normally pay a small N4Cluster fee at checkout unless you choose to absorb it.",
  },
  {
    question: "What is the Neighborhood fee?",
    answer:
      "Diners see a small Neighborhood fee at checkout, described as a fee that supports local operations in their neighborhood. N4Cluster collects it; it is not a surcharge added to your menu prices. If a customer asks you about it, our support team can help you answer. Restaurants who prefer to absorb it or build it into menu pricing can opt out of the customer-facing display.",
  },
  {
    question: "Will my prices ever increase?",
    answer:
      "The published per-order rate does not increase merely because an order value or your order volume goes up. It is not a permanent price freeze either: fees can be adjusted, and your merchant agreement governs how. Under the current terms an adjustment must follow a CPI-based formula with a hard cap and at least 90 days written notice; a material change to the pricing model requires 180 days notice and activates your right to exit. You can also lock in your merchant fees for 1 or 2 years for cost certainty. Your signed agreement is what governs these rights — ask us for the current version before you sign.",
  },
  {
    question: "How does N4Cluster help me grow?",
    answer:
      "Once you go live, we draft win-back campaigns for the regulars who have drifted. Nothing goes out without your OK. Separately, AI demand forecasting shows your busy windows and flags high-margin items. None of it changes your pricing. Your Google Business Profile is kept in sync with your menu, and multi-location restaurants are supported.",
  },
  {
    question: "How does delivery work?",
    answer:
      "We dispatch through DoorDash Drive and Uber Direct and chase any order that runs late, with delivery-time tracking on every order, so you are not managing drivers. Delivery charges depend on your address and are separate from N4Cluster's fees. Ask us what applies at your address before you rely on it.",
  },
  {
    question: "How quickly can I go live?",
    answer:
      "Live in days. Not quarters. We scope the exact steps and timing for your restaurant before you commit. When you connect your POS, your menu can be imported and structured automatically and your ordering site built for your review, so nothing goes live without your sign-off. How long that takes depends on your POS, how your menu is structured, and how quickly you can review it — so we would rather scope it with you than quote a deadline that may not hold.",
  },
  {
    question: "Can I try it free?",
    answer:
      "Yes — 30 days. The trial waives N4Cluster's merchant platform fee and per-order fees, so you pay no N4Cluster merchant fees during that period. Card processing still applies to any card payment you take, and the Neighborhood fee is a separate charge — ask us how it is handled during your trial. We build a working demo storefront with your real menu and walk you through it before you decide anything.",
  },
  {
    question: "I don't have a website. Is that a problem?",
    answer:
      "Not at all. We'll set up your domain too and build your ordering site for you.",
  },
  {
    question: "What if I want to cancel?",
    answer: `30 days free, then month-to-month. Cancel with 30 days' written notice. Your customer data is yours — we'll send you a copy whenever you ask.`,
  },
  {
    question: "Am I locked in?",
    answer:
      `No. ${priceDisplay.cancel} Your customer data is yours — we'll send you a copy whenever you ask, before, during, or after you leave. Customer privacy and communication preferences still apply to how that information can be used.`,
  },
  {
    question: "What POS systems does N4Cluster integrate with?",
    answer:
      "N4Cluster integrates with major POS systems including Toast, Square, Clover, Lightspeed, and others. POS connection enables automatic menu import, real-time availability sync, and direct order injection into your kitchen workflow — no extra tablets required. Contact us to confirm your specific POS is supported before you commit.",
  },
];

/** The five questions shown on the homepage, in mockup order. */
export const homeFaqItems: FAQItem[] = [
  "Is it really commission-free?",
  "What does my customer pay?",
  "Do I have to quit DoorDash or Uber Eats?",
  "I don't have a website. Is that a problem?",
  "What if I want to cancel?",
].map((q) => faqItems.find((i) => i.question === q)!);
