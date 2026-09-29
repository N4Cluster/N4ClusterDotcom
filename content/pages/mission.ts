/**
 * Mission & Values copy.
 *
 * Kept as content rather than JSX so the wording can change without touching the
 * page. Each value carries what it rules out: a value that forbids nothing is not
 * a commitment, and the "ledger" framing in DESIGN.md is about being accountable
 * rather than aspirational.
 */

export interface MissionValue {
  /** Ledger line number, rendered as the row marker. */
  index: string;
  title: string;
  body: string;
  /** The concrete thing this value forbids us from doing. */
  rulesOut: string;
}

export const missionStatement =
  "Local operators should keep the customer relationship, the data, and the margin. We build the ordering, delivery, and growth infrastructure that makes that the default — priced like a utility bill, not a cut of every sale.";

export const missionSupport = [
  "A restaurant that wins a customer should keep that customer. For most operators the opposite is true: the marketplace that delivered the order owns the relationship, the contact details, and a fifth to a third of the ticket. The longer it works, the more it costs.",
  "N4Cluster exists to remove that trade-off. A branded direct ordering channel, neighborhood discovery, delivery coordination, and AI-assisted growth — on infrastructure priced the way infrastructure should be: a flat monthly fee plus a flat fee per order, published, and the same at ten orders a week or a thousand.",
];

export const missionValues: MissionValue[] = [
  {
    index: "01",
    title: "The price is the price",
    body: "$99 per month plus $0.50 per order, published on the pricing page, identical for a single location and a small group. If it ever changes, it changes in public and it changes for everyone.",
    rulesOut:
      "Commission tiers, revenue share, percentage-of-ticket fees, volume pricing that quietly penalises growth, and a teaser rate that resets after the first year.",
  },
  {
    index: "02",
    title: "The customer is yours, not ours",
    body: "Order history, customer contact details, and menu performance belong to the operator who earned them. Export is a standing feature, available on any day of the contract, not a concession granted on the way out.",
    rulesOut:
      "Withholding customer data, selling or renting an operator's customer list, and treating data export as a retention lever.",
  },
  {
    index: "03",
    title: "Show the math",
    body: "Every pricing claim on this site is arithmetic an operator can redo on their own numbers. The ROI calculator exists so the comparison against a marketplace commission or a flat-fee competitor is a calculation, not a promise.",
    rulesOut:
      "“Contact us for pricing”, savings percentages with no stated basis, and comparisons that hide the assumptions doing the work.",
  },
  {
    index: "04",
    title: "No proof we have not earned",
    body: "N4Cluster is early, and we would rather say so than imply a track record we do not have. Pilot work is labelled as pilot work. When there are results worth quoting, they will carry the name of the operator who agreed to be quoted.",
    rulesOut:
      "Invented testimonials, logo strips implying customers we do not have, and pilot scenarios presented as shipped outcomes.",
  },
  {
    index: "05",
    title: "Switching is measured in days",
    body: "The most expensive part of changing vendors is the weeks it takes. Menu import, POS connection, and going live are scoped in days, because an operator cannot run two systems through a weekend rush.",
    rulesOut:
      "Multi-quarter onboarding, setup fees that function as lock-in, and migrations that require an operator to stop taking orders.",
  },
];

export const missionCommitments = [
  {
    label: "Flat fee, published",
    detail: "$99/month + $0.50 per order, on the pricing page, not behind a form.",
  },
  {
    label: "0% commission",
    detail: "No percentage of any order, at any volume, on any plan.",
  },
  {
    label: "Export on any day",
    detail: "Customer and order data leaves in a standard format whenever asked.",
  },
  {
    label: "30-day trial",
    detail: "Cancel inside the trial and owe nothing — no notice period.",
  },
];
