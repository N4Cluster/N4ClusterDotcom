import type { Metadata } from "next";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ResourceGrid } from "@/components/sections/ResourceCard";
import { resources } from "@/content/pages/resources";
import {
  Store,
  MapPin,
  Sparkles,
  Truck,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "N4Cluster | Commission-Free Commerce for Local Restaurants",
  description:
    "N4Cluster gives restaurants a branded direct ordering channel, neighborhood discovery, AI-powered growth, and delivery — for a flat $0.10 per order. No commissions. Ever.",
};

// ─── Trust strip ────────────────────────────────────────────────────────────
const trustItems = [
  "$0.10 flat fee per order",
  "Zero commission. Ever.",
  "Your brand. Your customers.",
  "Merchant-owned loyalty",
  "30-min delivery SLA",
  "AI Growth Autopilot included",
];

// ─── Platform pillars ────────────────────────────────────────────────────────
const pillars = [
  {
    icon: Store,
    color: "#2563eb",
    title: "White-label ordering",
    description:
      "Your customers order directly through your own branded website. No marketplace in the middle — you keep the relationship, the data, and the margin.",
  },
  {
    icon: MapPin,
    color: "#14b8a6",
    title: "Neighborhood Hub",
    description:
      "Your restaurant appears on a local discovery feed, sorted by distance and preference — not by who pays the highest commission. Neighborhood demand, built together.",
  },
  {
    icon: Sparkles,
    color: "#f59e0b",
    title: "AI Growth Autopilot",
    description:
      "We auto-import your menu, clean your catalog, activate neighborhood campaigns, and surface growth signals — all with your approval. You decide. We execute.",
  },
  {
    icon: Truck,
    color: "#2563eb",
    title: "Delivery we own",
    description:
      "N4Cluster owns the logistics layer. 30-minute SLA from pickup. Driver delays are our problem — not yours. You focus on the food. We handle the rest.",
  },
];

// ─── How it works ────────────────────────────────────────────────────────────
const timeline = [
  {
    tag: "Day 1",
    title: "Go live with your branded storefront",
    desc: "We auto-import your menu from your POS, clean the catalog, and launch your ordering site under your own brand. Nothing goes live without your sign-off.",
    color: "#2563eb",
  },
  {
    tag: "Week 1",
    title: "Join the Neighborhood Hub",
    desc: "Your restaurant appears in local discovery, sorted by distance and preference. Customers in your area find you — on your terms, not an algorithm's.",
    color: "#14b8a6",
  },
  {
    tag: "Month 1",
    title: "AI Autopilot activates",
    desc: "N4Cluster identifies your peak demand windows, suggests campaigns, re-engages inactive customers, and monitors delivery performance. You review and approve.",
    color: "#f59e0b",
  },
  {
    tag: "Ongoing",
    title: "Order density compounds",
    desc: "More neighborhood orders at $0.10 each. More repeat customers you own. More margin per order. The model gets stronger the more it runs.",
    color: "#2563eb",
  },
];

// ─── Segment cards ───────────────────────────────────────────────────────────
const segments = [
  {
    title: "Independent restaurants",
    desc: "Stop paying 20–30% commissions. Own your customer, keep your margin, and build direct demand — for $0.10 per order.",
    outcomes: ["Direct branded ordering under your domain", "Customer data and loyalty you own", "AI-assisted growth without the overhead"],
    href: "/solutions#independent",
    color: "#2563eb",
  },
  {
    title: "Multi-location brands",
    desc: "Unified ordering, centralized visibility, and consistent growth signals across every location — without adding operational complexity.",
    outcomes: ["One dashboard across all locations", "Consistent brand experience everywhere", "Location-level performance, centralized view"],
    href: "/solutions#multi-location",
    color: "#14b8a6",
  },
  {
    title: "Delivery-first operators",
    desc: "Built for businesses where delivery is the core model. Neighborhood Hub drives demand while N4Cluster handles the logistics.",
    outcomes: ["Neighborhood demand engine", "30-min SLA managed by N4Cluster", "Fulfillment visibility without the ops weight"],
    href: "/solutions#delivery",
    color: "#f59e0b",
  },
  {
    title: "Ecosystem partners",
    desc: "POS providers, delivery networks, and commerce platforms — connect into a flat-fee infrastructure that aligns your growth with merchant success.",
    outcomes: ["Integration-first architecture", "Partner-aligned economics", "Pilot-first connection model"],
    href: "/partners",
    color: "#2563eb",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSplit
        eyebrow="Commission-free commerce infrastructure"
        heading="Keep more of every order. Grow your neighborhood."
        subheading="N4Cluster gives local restaurants a branded direct channel, neighborhood discovery, AI-powered growth automation, and delivery — for a flat $0.10 per order. No commissions. No surprises. Ever."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "/how-it-works" }}
        microcopy="$0.10 per order. No monthly minimum. Optional 1–2 year price lock."
      />

      {/* ── Trust strip ── */}
      <TrustStrip items={trustItems} />

      {/* ── Problem: The commission math ── */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#2563eb" }}>
                The problem
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#040d1c", lineHeight: 1.2 }}>
                You built your restaurant. The marketplace owns your customer.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#475569" }}>
                DoorDash, Uber Eats, and Grubhub charge 20–30% per order. On a $40 ticket, that&apos;s up to $12 gone before you see a cent. They own your customer data. They control discovery. They can change terms whenever they like.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                N4Cluster charges <strong style={{ color: "#040d1c" }}>$0.10 flat per order</strong> — infrastructure pricing, not commission extraction. You keep the customer, the data, and the margin.
              </p>
            </div>
            <div className="space-y-4">
              {/* Comparison calc */}
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e2e8f0" }}>
                <div className="px-5 py-3" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>On a $40 order</p>
                </div>
                <div className="divide-y" style={{ borderColor: "#e2e8f0" }}>
                  {[
                    { label: "DoorDash / Uber Eats", fee: "Up to $12.00 (30%)", keep: "$28.00", bad: true },
                    { label: "Grubhub", fee: "Up to $8.00 (20%)", keep: "$32.00", bad: true },
                    { label: "N4Cluster", fee: "$0.10 flat", keep: "$39.90", bad: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: row.bad ? "rgba(239,68,68,0.1)" : "rgba(20,184,166,0.12)" }}
                        >
                          {row.bad
                            ? <X size={10} style={{ color: "#ef4444" }} strokeWidth={2.5} />
                            : <Check size={10} style={{ color: "#14b8a6" }} strokeWidth={2.5} />}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{row.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs mb-0.5" style={{ color: row.bad ? "#ef4444" : "#14b8a6" }}>{row.fee}</div>
                        <div className="text-sm font-bold" style={{ color: "#0f172a" }}>You keep {row.keep}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs pl-2" style={{ color: "#94a3b8" }}>
                * Commission rates vary. Comparison illustrates typical marketplace fee ranges vs N4Cluster&apos;s flat $0.10/order infrastructure fee.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Platform pillars ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            eyebrow="The platform"
            heading="Four things working together, so you don't have to manage them separately"
            subheading="N4Cluster isn't a tool. It's the operating layer underneath your brand — ordering, discovery, AI, and delivery in one connected system."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl p-7 bg-white"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: p.color + "15" }}
                  >
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#040d1c" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{p.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="How it works"
            heading="From sign-up to neighborhood growth — a clear path"
            subheading="No complex implementation. No long runway. Your restaurant is live in days, growing in weeks."
          />
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block" style={{ background: "#e2e8f0" }} />
            <div className="space-y-8">
              {timeline.map((step, i) => (
                <div key={step.tag} className="flex gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white relative z-10"
                      style={{ background: step.color, boxShadow: `0 0 0 4px ${step.color}25` }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2"
                      style={{ background: step.color + "15", color: step.color }}
                    >
                      {step.tag}
                    </span>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#040d1c" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#2563eb" }}
            >
              See the full walkthrough <ArrowRight size={14} />
            </a>
          </div>
        </Container>
      </section>

      {/* ── Solutions by segment ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            eyebrow="Who it's for"
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
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Why N4Cluster"
            heading="Infrastructure, not extraction"
            subheading="Marketplace platforms grow by taking more from each order. N4Cluster grows when you do — by increasing neighborhood order volume, not margin compression."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Marketplace side */}
            <div className="rounded-2xl p-8 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#fef2f2" }}>
                  <X size={10} style={{ color: "#ef4444" }} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>Marketplace model</span>
              </div>
              <h3 className="text-lg font-bold mb-5" style={{ color: "#0f172a" }}>The platform profits from your success — not with you.</h3>
              <ul className="space-y-4">
                {[
                  "20–30% commission per order, no cap",
                  "Customer data owned by the platform",
                  "Your brand hidden behind their UI",
                  "Pricing parity requirements limit your options",
                  "Ranking controlled by ad spend and algorithm",
                  "Terms can change with little notice",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#fef2f2" }}>
                      <X size={9} style={{ color: "#ef4444" }} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm" style={{ color: "#475569" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* N4Cluster side */}
            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "#040d1c", border: "1px solid #1e3a70" }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl" style={{ background: "rgba(37,99,235,0.12)", transform: "translate(50%, -50%)" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(20,184,166,0.2)" }}>
                    <Check size={10} style={{ color: "#14b8a6" }} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>N4Cluster model</span>
                </div>
                <h3 className="text-lg font-bold mb-5 text-white">We grow when neighborhood order volume grows — not by taking more per order.</h3>
                <ul className="space-y-4">
                  {[
                    "$0.10 flat per order. No commission. No % of revenue.",
                    "Your customer data. Your loyalty program.",
                    "Branded ordering under your own domain and identity",
                    "No pricing parity requirements — ever",
                    "Discovery sorted by distance and preference, not spend",
                    "90–180 day advance notice for any policy changes. Exit rights protected.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(20,184,166,0.15)" }}>
                        <Check size={9} style={{ color: "#14b8a6" }} strokeWidth={2.5} />
                      </div>
                      <span className="text-sm" style={{ color: "#cbd5e1" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Resources teaser ── */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container>
          <SectionIntro
            eyebrow="Resources"
            heading="Ideas on building a better local commerce model"
            subheading="Practical thinking on commission-free ordering, neighborhood demand, and AI-assisted growth."
          />
          <ResourceGrid resources={resources.slice(0, 3)} />
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <CTASection
        heading="Ready to stop paying commissions?"
        subheading="See how N4Cluster can launch your branded direct channel, activate neighborhood demand, and grow your restaurant — for $0.10 per order."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
      />
    </>
  );
}
