import type { FAQItem } from "@/components/sections/FAQAccordion";

/**
 * Shared FAQ source. Rendered in full by /faq (which also builds its FAQPage
 * structured data from this array) and as the first five entries on /contact, so
 * a correction here lands everywhere at once.
 *
 * Commercial answers follow the fee-claim rules in content/site/pricing.ts:
 * "commission-free" is always scoped to N4Cluster's own sales commission, and
 * card processing, courier charges and the diner fee are named as separate.
 */
export const faqItems: FAQItem[] = [
  {
    question: "What is N4Cluster?",
    answer:
      "N4Cluster gives neighborhood restaurants a branded direct-ordering channel, so customers who already know you can order from you under your own name. It includes your own ordering site, a listing in the Neighborhood Hub, growth tools (N4Logic), and delivery coordination (N4Sync), for a flat $99/month plus $0.50 per order with zero N4Cluster sales commission. Card processing and any courier charges are separate.",
  },
  {
    question: "How is N4Cluster different from marketplace delivery platforms?",
    answer:
      "Marketplaces typically take 20–30% commission on every order and keep the customer relationship. N4Cluster charges published fees instead of a share of your revenue: a flat $99/month plus $0.50 per order, with zero N4Cluster sales commission. You take orders under your own brand and domain, and the customer and order information from those orders is available to you. Card processing and any courier charges are separate from N4Cluster's fees.",
  },
  {
    question: "Do I need to stop using delivery apps?",
    answer:
      "No. You can keep the delivery apps that help people discover your restaurant. N4Cluster gives customers who already know you a direct way to order under your own brand. You decide how each channel fits your business.",
  },
  {
    question: "What do the $99/month and $0.50 per order cover?",
    answer:
      "They cover the N4Cluster platform: your branded ordering site, your Neighborhood Hub listing, N4Logic growth tools, N4Sync delivery coordination, and POS integration. There are no tiered plans and no add-on modules. Two things are not included: card processing, which your payment processor charges separately, and any courier charges for delivery. Diners normally pay a $0.99 N4Cluster fee at checkout unless you choose to absorb it.",
  },
  {
    question: "What is the $0.99 customer fee?",
    answer:
      "Diners see a $0.99 N4Cluster fee at checkout. It is a platform fee collected by N4Cluster and labelled as N4Cluster's fee, not a surcharge added to your menu prices. If a customer asks you about it, our support team can help you answer. Restaurants who prefer to absorb it or build it into menu pricing can opt out of the customer-facing display.",
  },
  {
    question: "Will my prices ever increase?",
    answer:
      "The published per-order rate does not increase merely because an order value or your order volume goes up. It is not a permanent price freeze either: fees can be adjusted, and your merchant agreement governs how. Under the current terms an adjustment must follow a CPI-based formula with a hard cap and at least 90 days written notice; a material change to the pricing model requires 180 days notice and activates your right to exit. You can also lock in your merchant fee ($0.50/order and $99/month) for 1 or 2 years for cost certainty. Your signed agreement is what governs these rights — ask us for the current version before you sign.",
  },
  {
    question: "What is N4Logic?",
    answer:
      "N4Logic is the growth-tools layer built into the platform. After you go live it looks at your demand patterns, identifies repeat customer behaviour, suggests campaign timing, flags high-margin items, and can run neighborhood re-engagement campaigns — all with your approval. It also watches for risk signals such as abnormal refund patterns, SLA degradation, and POS sync failures. Every automation is reversible, and none of it changes your pricing. Ask us which capabilities are live today for a restaurant like yours.",
  },
  {
    question: "What is N4Sync?",
    answer:
      "N4Sync is N4Cluster's delivery coordination layer. When an order comes in, it handles driver assignment, dispatch, and tracking against the delivery target, so you are not managing a driver pool or chasing logistics exceptions. Coordination is not the same as paying for delivery: courier charges are separate from N4Cluster's fees, and delivery coverage, timing targets and terms depend on your location. Ask us what applies at your address before you rely on it.",
  },
  {
    question: "What is the Neighborhood Hub?",
    answer:
      "The Neighborhood Hub is a local discovery feed where customers can browse and order from nearby restaurants. It sorts restaurants by distance rather than by who pays the most. Your restaurant appears in the Hub as part of the platform at no additional cost.",
  },
  {
    question: "How quickly can I go live?",
    answer:
      "We'll confirm setup steps and timing for your restaurant. When you connect your POS, your menu can be imported and structured automatically and your ordering site built for your review, so nothing goes live without your sign-off. How long that takes depends on your POS, how your menu is structured, and how quickly you can review it — so we would rather scope it with you than quote a deadline that may not hold.",
  },
  {
    question: "Can I try it free?",
    answer:
      "Yes — 30 days. The trial waives N4Cluster's merchant platform fee and per-order fees, so there is no $99/month and no $0.50 per order during that period. Card processing still applies to any card payment you take, and the $0.99 diner fee is a separate charge — ask us how it is handled during your trial. We build a working demo storefront with your real menu and walk you through it before you decide anything.",
  },
  {
    question: "Am I locked in?",
    answer:
      "No. You can cancel according to your merchant agreement. The customer and order information from your N4Cluster orders is your restaurant's business data, and we will explain what is available and how to get a copy of it — before, during, or after you leave. Customer privacy and communication preferences still apply to how that information can be used.",
  },
  {
    question: "What POS systems does N4Cluster integrate with?",
    answer:
      "N4Cluster integrates with major POS systems including Toast, Square, Clover, Lightspeed, and others. POS connection enables automatic menu import, real-time availability sync, and direct order injection into your kitchen workflow — no extra tablets required. Contact us to confirm your specific POS is supported before you commit.",
  },
];
