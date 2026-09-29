/**
 * Canonical company story: one mission sentence and five values, rendered by both
 * /mission and /about.
 *
 * Before this existed the two pages carried different missions and two unrelated
 * sets of five principles. Anything presenting the company's mission or values
 * imports from here; a page may show fewer of them or summarise, but must not
 * introduce a competing set.
 *
 * The mission deliberately contains no prices, dates, or product module names.
 */

export const mission =
  "We help neighborhood restaurants grow profitably, build lasting customer relationships, and stay in control of their business.";

/** One-line proposition for the audience, reused in metadata and summaries. */
export const restaurantProposition =
  "Give customers who already know you a direct way to order from your restaurant, under your own brand.";

/**
 * Delivery marketplaces are a complement, not something merchants are asked to
 * abandon. Stated wherever the direct-ordering pitch is made.
 */
export const complementaryChannels =
  "Keep your delivery apps for discovery, and build repeat business under your own brand.";

/** The single merchant CTA, so the label stays identical across the site. */
export const demoCta = {
  label: "Request your demo storefront",
  href: "/contact",
} as const;

export interface CompanyValue {
  /** Stable id — referenced by tests and anchors; do not renumber. */
  id: "ownership" | "growth" | "simplicity" | "trust" | "neighborhood";
  title: string;
  body: string;
}

export const values: CompanyValue[] = [
  {
    id: "ownership",
    title: "Your business stays yours.",
    body: "You control your brand, menu, and prices. Your customer and order data stays accessible and exportable, with customer privacy and communication preferences respected.",
  },
  {
    id: "growth",
    title: "Growth should reward your hard work.",
    body: "We focus on profitable direct orders and repeat business. Our platform uses published monthly and per-order fees, with zero N4Cluster sales commission.",
  },
  {
    id: "simplicity",
    title: "Make the workday easier.",
    body: "Technology should give you time back. We focus on straightforward setup, practical tools, and fewer tasks for you and your team.",
  },
  {
    id: "trust",
    title: "Earn trust every day.",
    body: "We explain what works today, show the assumptions behind our claims, and take responsibility when something needs attention. Clear communication and dependable support are how we earn your confidence.",
  },
  {
    id: "neighborhood",
    title: "Help neighborhoods thrive.",
    body: "Local restaurants bring people together. We help them build lasting relationships with nearby customers, so more of the value they create stays in their community.",
  },
];

/**
 * Founder statement supplied on the marketing card. This is a founder's
 * positioning statement, not a merchant testimonial and not evidence of measured
 * results. The wording is reproduced exactly and must not be edited or replaced.
 */
export const founderQuote = {
  quote:
    "We built the tech the big platforms have, then priced it so a neighborhood restaurant actually grows on it.",
  name: "Prerana Shah",
  role: "Founder",
} as const;

/** The three steps from order to repeat relationship. */
export const merchantJourney = [
  {
    label: "ORDER",
    body: "Customers order from your branded site, at your prices.",
  },
  {
    label: "CUSTOMER",
    body: "See the customer and order information available to your restaurant, with privacy and communication preferences respected.",
  },
  {
    label: "REPEAT",
    body: "Give customers a direct way to come back to your restaurant.",
  },
] as const;
