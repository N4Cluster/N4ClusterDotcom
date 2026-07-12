// Trigger redeploy
import type { Metadata } from "next";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTASection } from "@/components/sections/CTASection";
import { StepTimeline } from "@/components/sections/StepTimeline";
import { ComparisonCards } from "@/components/sections/ComparisonCards";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ResourceGrid } from "@/components/sections/ResourceCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { resources } from "@/content/pages/resources";
import {
  Store,
  MapPin,
  Sparkles,
  Truck,
  Search,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "N4Cluster | Commission-Free Commerce for Local Restaurants",
  description:
    "N4Cluster gives restaurants a branded direct ordering channel, neighborhood discovery, AI-powered growth, and delivery — for a flat $99/month plus $0.50 per order. No commissions. Ever.",
};

// ─── Trust strip ────────────────────────────────────────────────────────────
const trustItems = [
  "$99/mo + $0.50 per order",
  "Your brand. Your customers.",
  "You own your customer data",
  "30-minute delivery, on us",
  "Your menu, live in 24 hours",
];

// ─── Platform pillars ────────────────────────────────────────────────────────
const pillars = [
  {
    icon: Store,
    color: "#2563eb",
    title: "Ordering under your own name",
    description:
      "Customers order straight from your branded site — not an app that buries your name three taps deep. You keep the relationship, the contact info, and every dollar of margin.",
  },
  {
    icon: MapPin,
    color: "#14b8a6",
    title: "Neighbors find you first",
    description:
      "Your restaurant shows up in local discovery sorted by distance and preference — not by who paid the biggest ad bill. Built for the regulars five minutes away.",
  },
  {
    icon: Sparkles,
    color: "#f59e0b",
    title: "Growth on autopilot, approved by you",
    description:
      "We import your menu, spot your slow nights, and suggest a campaign to fill them — a Tuesday push, a win-back offer for customers who've gone quiet. Nothing goes out without your OK.",
  },
  {
    icon: Truck,
    color: "#2563eb",
    title: "Delivery that's not your problem",
    description:
      "N4Cluster runs the drivers. 30-minute pickup-to-door SLA. When a route goes sideways, that's on us — you stay on the line, not on the phone with a dispatcher.",
  },
  {
    icon: Search,
    color: "#14b8a6",
    title: "Show up when neighbors search",
    description:
      "Built to help your dishes show up when neighbors search on Google, and designed to keep your Google Business listing accurate as your menu changes.",
  },
];

// ─── How it works ────────────────────────────────────────────────────────────
const timeline = [
  {
    number: "24 Hrs",
    title: "Live in a day, not a quarter",
    description:
      "Connect your POS in the morning, review your branded site by dinner service. No project timeline, no dev team, no waiting on someone else's calendar.",
    accent: "cobalt" as const,
  },
  {
    number: "Week 1",
    title: "Discovery switches on without you touching a setting",
    description:
      "Local discovery activates the day you're live — no campaign to build, no ad account to configure. You just start showing up.",
    accent: "teal" as const,
  },
  {
    number: "Month 1",
    title: "Thirty seconds a week, not a second job",
    description:
      "Campaigns get suggested, not built by you. Approve or skip in the time it takes to read a text.",
    accent: "amber" as const,
  },
  {
    number: "Ongoing",
    title: "Every order compounds your margin",
    description:
      "More neighborhood orders at $0.50 each. More repeat customers you own outright. The model gets stronger the longer it runs.",
    accent: "cobalt" as const,
  },
];

// ─── Segment cards ───────────────────────────────────────────────────────────
const segments = [
  {
    title: "Independent restaurants",
    desc: "Stop paying 20–30% commissions. Own your customer, keep your margin, and build direct demand — for $99/month plus $0.50 per order.",
    outcomes: ["Direct branded ordering under your own domain", "Customer data and loyalty you keep", "Growth campaigns that run themselves, with your OK"],
    href: "/solutions#independent",
    color: "#2563eb",
  },
  {
    title: "Multi-location brands",
    desc: "One system across every location — the same branded experience, one dashboard, no extra headcount to run it.",
    outcomes: ["One dashboard across every location", "Consistent brand experience storefront to storefront", "See every location's numbers in one place"],
    href: "/solutions#multi-location",
    color: "#14b8a6",
  },
  {
    title: "Delivery-first operators",
    desc: "Built for businesses where delivery is the core model. The Neighborhood Hub keeps orders coming in while N4Cluster runs the drivers.",
    outcomes: ["A steady stream of local orders", "30-minute delivery SLA managed by N4Cluster", "Track every delivery without hiring a dispatcher"],
    href: "/solutions#delivery",
    color: "#f59e0b",
  },
  {
    title: "Ecosystem partners",
    desc: "POS providers and delivery networks — plug into pricing that rewards merchant success instead of taking a cut of it.",
    outcomes: ["Straightforward integration, not a rebuild", "Pricing that scales with your merchants, not against them", "Start with a pilot before you commit"],
    href: "/partners",
    color: "#2563eb",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSplit
        eyebrow="Built for restaurant owners, not marketplaces"
        heading="Your Own Branded Ordering & Delivery. Zero Commissions. Period."
        subheading="Marketplace apps take 20–30% off every order. Flat-fee ordering SaaS platforms bill you $300–500 a month whether you sell ten orders or a thousand. N4Cluster is $99/month plus $0.50 per order — no commission, ever. Customers pay a separate $0.99 fee at checkout; it never comes out of your ticket."
        primaryCta={{ label: "Get Started in 24 Hours", href: "/contact" }}
        secondaryCta={{ label: "Calculate Your Savings", href: "/roi-calculator" }}
        microcopy="Now onboarding founding merchants · $99/mo + $0.50 per order · No commitment to request a demo"
      />

      {/* ── Trust strip ── */}
      <TrustStrip items={trustItems} />

      {/* ── Problem: The commission math ── */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#040d1c", lineHeight: 1.2 }}>
                Marketplaces take a cut. Flat-fee SaaS takes a flat bite. N4Cluster takes neither.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#475569" }}>
                Marketplace delivery apps charge 20–30% per order — on a $40 ticket, that&apos;s up to $12 gone before you see a cent, and the cut grows right along with your sales. Flat-fee ordering SaaS platforms typically charge $300–500 a month regardless of order volume — brutal on a slow week, and still not free once you&apos;re busy.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                N4Cluster charges a flat <strong style={{ color: "#040d1c" }}>$99/month plus $0.50 per order</strong> — utility pricing, not commission extraction. Your bill tracks your usage. It doesn&apos;t punish a slow week, and it never caps your upside.
              </p>
            </div>
            <div className="space-y-4">
              {/* Comparison calc */}
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e2e8f0" }}>
                <div className="px-5 py-3" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>On a $40 order</p>
                </div>
                <div className="divide-y" style={{ borderColor: "#e2e8f0" }}>
                  {[
                    { label: "High-commission marketplace", fee: "Up to $12.00 (30%)", keep: "$28.00", bad: true },
                    { label: "Mid-commission marketplace", fee: "Up to $10.80 (27%)", keep: "$29.20", bad: true },
                    { label: "Lower-commission marketplace", fee: "Up to $10.00 (25%)", keep: "$30.00", bad: true },
                    { label: "Flat-fee ordering SaaS", fee: "$300–500/mo flat, regardless of volume", keep: "$40.00", bad: true },
                    { label: "N4Cluster", fee: "$0.50 flat", keep: "$39.50", bad: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: row.bad ? "rgba(239,68,68,0.1)" : "rgba(20,184,166,0.12)" }}
                        >
                          {row.bad
                            ? <X size={10} style={{ color: "#b91c1c" }} strokeWidth={2.5} />
                            : <Check size={10} style={{ color: "#0a5f56" }} strokeWidth={2.5} />}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{row.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold mb-0.5" style={{ color: row.bad ? "#b91c1c" : "#0a5f56" }}>{row.fee}</div>
                        <div className={row.bad ? "text-lg font-bold" : "text-xl font-bold"} style={{ color: row.bad ? "#0f172a" : "#0a5f56" }}>
                          You keep {row.keep}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs pl-2" style={{ color: "#475569" }}>
                * Commission rates and SaaS pricing vary by provider. Comparison illustrates typical marketplace fee ranges and typical flat-fee SaaS pricing vs N4Cluster&apos;s flat $0.50/order fee (plus a separate flat $99/month platform fee, not shown per-order).
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Platform pillars ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            heading="Five things working together, so you don't have to manage them separately"
            subheading="N4Cluster isn't another app to babysit. It's the ordering, discovery, growth, delivery, and local search running quietly behind your brand."
          />
          <div className="rounded-2xl overflow-hidden border bg-white max-w-3xl mx-auto" style={{ borderColor: "#e2e8f0" }}>
            <div className="divide-y" style={{ borderColor: "#e2e8f0" }}>
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-4 px-6 py-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: p.color + "15" }}
                    >
                      <Icon size={20} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1" style={{ color: "#040d1c" }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{p.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <StepTimeline
        heading="From sign-up to neighborhood growth — a clear path"
        subheading="No long onboarding. No setup-time fear. Your restaurant is live in 24 hours, growing within weeks."
        steps={timeline}
      />
      <div className="bg-white text-center pb-16 md:pb-24">
        <a
          href="/how-it-works"
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "#2563eb" }}
        >
          See the full walkthrough <ArrowRight size={14} />
        </a>
      </div>

      {/* ── Solutions by segment ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            heading="Built for every local restaurant model"
            subheading="Whether you're a single-location independent or a growing regional brand, N4Cluster adapts — the pricing model stays the same."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((seg) => (
              <div
                key={seg.title}
                className="rounded-2xl bg-white p-7 flex flex-col"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: "#040d1c" }}>{seg.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#475569" }}>{seg.desc}</p>
                <ul className="space-y-2 flex-1 mb-5">
                  {seg.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-sm" style={{ color: "#475569" }}>
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: seg.color }} />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href={seg.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold group"
                  style={{ color: seg.color }}
                >
                  Learn more
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison: Their model vs N4Cluster ── */}
      <ComparisonCards
        heading="Two ways to run online ordering — only one keeps you whole"
        subheading="Marketplace platforms grow by taking a bigger cut of every order. N4Cluster grows when your neighborhood orders grow — not by squeezing your margin."
        before={{
          type: "before",
          label: "Marketplace model",
          headline: "They win when they take a bigger cut of your ticket.",
          points: [
            "They take up to $12 of every $40 ticket before you see a cent",
            "Your customer data belongs to them, not you",
            "Your name buried behind their app and their branding",
            "Price-parity rules can block you from charging less elsewhere",
            "Where you rank depends on ad spend, not who's closest or best",
            "They can change the rules with little warning",
          ],
        }}
        after={{
          type: "after",
          label: "N4Cluster model",
          headline: "We grow when your neighborhood orders grow — not by taking more per order.",
          points: [
            "$99/month flat plus $0.50 per order. No commission. No percentage of your revenue.",
            "You keep the customer data and the loyalty program",
            "Ordering lives on your own site, under your own name",
            "No price-parity rules — charge whatever you want, wherever you sell",
            "Discovery ranked by distance and preference, not who's paying the most",
            "90–180 days' notice before any policy changes, with the right to walk away",
          ],
        }}
      />

      {/* ── Resources teaser ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            heading="Ideas on building a better local commerce model"
            subheading="Practical thinking on commission-free ordering, neighborhood demand, and AI-assisted growth."
          />
          <ResourceGrid resources={resources.slice(0, 3)} />
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <CTASection
        heading="Ready to stop paying commissions?"
        subheading="No commission. No $300–500/month SaaS bill, either. Just $99/month plus $0.50 per order — see how much margin comes back to your restaurant."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        microcopy="No commitment — a demo is just a look at the numbers."
      />

      {/* ── Newsletter capture ── */}
      <section className="bg-white py-12 border-t border-slate-200">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-navy-950 mb-3">
              Stay updated on N4Cluster
            </p>
            <NewsletterForm placeholder="Enter your email" buttonLabel="Get Updates" />
          </div>
        </Container>
      </section>
    </>
  );
}
