import type { Metadata } from "next";
import Link from "next/link";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Check, ArrowRight } from "lucide-react";
import { priceDisplay } from "@/content/site/pricing";
import { youKeep } from "@/components/home/figures";

export const metadata: Metadata = {
  title: "Solutions — Commission-Free Ordering for Every Restaurant Type",
  description: `N4Cluster adapts to independent restaurants, multi-location brands, and delivery-first operators — always one fixed price. No commission, ever.`,
};

interface Solution {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  outcomes: { label: string; value: string }[];
  cta: string;
  ctaHref: string;
  panel: { title: string; rows: { label: string; value: string }[]; note: string };
}

const solutions: Solution[] = [
  {
    id: "independent",
    tag: "For independent restaurants",
    headline: "Stop paying 30% to sell your own food.",
    subheadline: `You built the menu, the regulars, the reputation. A marketplace app didn't build any of that — it just collects rent on it. N4Cluster gives you a branded ordering channel that's actually yours, for one fixed price.`,
    bullets: [
      "Your name on the ordering page, not a marketplace logo — customers order from you, not through a middleman",
      "Your customer data is yours — we'll send you a copy whenever you ask.",
      "Growth campaigns draft themselves for the regulars who've drifted — nothing goes out without your OK",
      "A listing in a neighborhood directory puts your kitchen in front of neighbors deciding where to order tonight",
      "We dispatch through DoorDash Drive and Uber Direct and chase any order that runs late",
      `One fixed price. No commission, ever. ${priceDisplay.cancel}`,
    ],
    outcomes: [
      { label: "Kept on a $40 order after card processing", value: youKeep },
      { label: "Who owns the customer when they order direct", value: "You" },
      { label: "Go-live", value: "Live in days. Not quarters." },
    ],
    cta: "See how it works",
    ctaHref: "/how-it-works",
    panel: {
      title: "A $40 order, side by side",
      rows: [
        { label: "Marketplace commission at 30%", value: "Up to $12.00" },
        { label: "N4Cluster commission", value: "$0" },
        { label: "You keep with N4Cluster, after the per-order fee and card processing", value: youKeep },
      ],
      note: "Illustrative example. Competitor fees vary by provider; card processing is an assumption (2.9% + 30¢).",
    },
  },
  {
    id: "multi-location",
    tag: "For multi-location brands",
    headline: "One brand, every location, one flat fee.",
    subheadline:
      "Every disconnected system you run is another place a problem can hide. N4Cluster supports multiple locations on one platform, so your customers get the same experience wherever they order from.",
    bullets: [
      "One branded ordering experience across your locations",
      "Multi-location support built in — no separate setup for each spot",
      "Menus, specials and sold-out items update as you change them",
      "Every location can be listed in the neighborhood directory for the neighbors close enough to order",
      "One fixed price. No commission, ever.",
    ],
    outcomes: [
      { label: "What we take in commission", value: "None. Ever." },
      { label: "Your customer data", value: "Yours — a copy whenever you ask" },
      { label: "Go-live", value: "Live in days. Not quarters." },
    ],
    cta: "Talk about your multi-location setup",
    ctaHref: "/contact",
    panel: {
      title: "What carries across locations",
      rows: [
        { label: "Ordering experience", value: "One brand" },
        { label: "Rewards", value: "Your own catalog" },
        { label: "Fees", value: "One fixed price" },
      ],
      note: "Card processing and any courier charges are separate.",
    },
  },
  {
    id: "delivery",
    tag: "For delivery-first operators",
    headline: "When delivery is the business, a late driver can't be your problem.",
    subheadline:
      "You can't control a driver stuck in traffic. You can control who chases it. We dispatch through DoorDash Drive and Uber Direct and chase any order that runs late. Courier charges depend on your address.",
    bullets: [
      "Dispatch through DoorDash Drive and Uber Direct",
      "Delivery-time tracking on every order, timestamped from pickup to drop-off",
      "Risk protection: delivery is handled on our risk, not yours",
      "AI demand forecasting spots your next rush before it hits",
      "Availability stays current, so you're not taking orders for what the kitchen ran out of",
    ],
    outcomes: [
      { label: "Who chases a late order", value: "We do" },
      { label: "Courier charges", value: "Depend on your address" },
      { label: "Commission", value: "None" },
    ],
    cta: "Talk about your delivery model",
    ctaHref: "/contact",
    panel: {
      title: "How a delivery runs",
      rows: [
        { label: "Dispatch", value: "DoorDash Drive / Uber Direct" },
        { label: "Tracking", value: "Every pickup and drop-off" },
        { label: "Late order", value: "We chase it" },
      ],
      note: "Card processing and any courier charges are separate.",
    },
  },
  {
    id: "partners",
    tag: "For ecosystem and integration partners",
    headline: "Plug into a platform that doesn't profit from squeezing the merchants you both serve.",
    subheadline:
      "If you serve restaurants, you know what a commission-hungry partner does to trust. N4Cluster runs on a flat fee, not a cut of the merchant's ticket, so your integration doesn't inherit that conflict.",
    bullets: [
      "Talk to us about how your product could work alongside N4Cluster, without a six-month integration project",
      "Start with a focused pilot, prove it works, then expand",
      "We make money on a flat fee — not by skimming the merchants you both serve",
      "Your customer data is yours — we'll send you a copy whenever you ask.",
    ],
    outcomes: [
      { label: "How you start", value: "A conversation" },
      { label: "What merchants pay", value: "One fixed price" },
      { label: "How onboarding starts", value: "Pilot-first" },
    ],
    cta: "Start a partner conversation",
    ctaHref: "/partners",
    panel: {
      title: "Where partners connect",
      rows: [
        { label: "Menu and catalog tools", value: "Working alongside us" },
        { label: "Delivery networks", value: "Dispatch and tracking" },
        { label: "Marketing and CRM", value: "Customer engagement" },
      ],
      note: "Examples of partnership categories, not a list of live integrations.",
    },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Solutions"
        heading="Independent, multi-location, delivery-first — one fixed price."
        subheading={`However you run your kitchen, the marketplace tax doesn't apply here. No commission, ever — one fixed price, whether you run one location or four.`}
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {solutions.map((sol, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={sol.id}
            id={sol.id}
            className={`scroll-mt-24 py-16 md:py-24 ${isEven ? "bg-white" : "bg-cream"}`}
          >
            <Container size="lg">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className="mb-4">
                    <Badge variant="accent">{sol.tag}</Badge>
                  </div>
                  <h2 className="font-display mb-4 text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {sol.headline}
                  </h2>
                  <p className="mb-7 text-base leading-relaxed text-ink-3">{sol.subheadline}</p>
                  <ul className="mb-7 space-y-3">
                    {sol.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check size={14} aria-hidden="true" className="mt-1 flex-shrink-0 text-green" />
                        <span className="text-sm leading-relaxed text-ink-3">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 rounded-[22px] border border-line bg-green-tint p-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {sol.outcomes.map((o) => (
                        <div key={o.label}>
                          <div className="font-display mb-1 text-base font-bold text-green-deep">{o.value}</div>
                          <div className="text-xs leading-tight text-ink-3">{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={sol.ctaHref}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4"
                  >
                    {sol.cta}
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className={isEven ? "" : "lg:order-1"}>
                  <Card dark className="p-6 sm:p-8">
                    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">{sol.panel.title}</div>
                    <div className="space-y-3">
                      {sol.panel.rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-start justify-between gap-4 rounded-xl border border-ink-2 p-4"
                        >
                          <span className="text-sm text-white/75">{row.label}</span>
                          <span className="font-display flex-shrink-0 text-right text-base font-bold text-white">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-white/60">{sol.panel.note}</p>
                  </Card>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="on-dark bg-ink py-14">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "No commission, ever.",
                body: "Not now, not later. Card processing and any courier charges are separate.",
              },
              {
                title: "Your prices, your call",
                body: "We'll never make you match pricing across channels. What you charge on your own site is entirely up to you.",
              },
              {
                title: "Month-to-month, or lock your rate",
                body: `${priceDisplay.cancel} Want it in writing? Lock the rate for one or two years on the pricing page.`,
              },
            ].map((item) => (
              <Card key={item.title} dark bordered className="p-6">
                <div className="mb-4 h-8 w-1.5 rounded-full bg-gold" />
                <h3 className="font-display mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/75">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Which model fits your restaurant?"
        subheading="Tell us how you operate and we'll show you exactly how N4Cluster would work for your business."
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "View pricing", href: "/pricing" }}
      />
    </>
  );
}
