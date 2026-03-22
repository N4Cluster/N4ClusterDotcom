import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform — Four Layers. One Monthly Bill.",
  description:
    "N4Cluster is four things working together: white-label ordering, Neighborhood Hub discovery, AI Growth Autopilot, and merchant-accountable delivery — for $0.10 per order.",
};

const pillars = [
  {
    id: "storefront",
    number: "01",
    color: "#2563eb",
    bg: "#f0f6ff",
    tag: "White-label ordering",
    headline: "Your brand. Your domain. Your ordering experience.",
    body: "N4Cluster launches a fully branded ordering site under your restaurant's own domain. Customers order from you — not from a marketplace with your logo as an afterthought. The relationship is yours.",
    features: [
      "Auto-imported from your POS — menu, categories, pricing, availability",
      "Runs under your website domain, not ours",
      "Mobile-first, fast-loading, conversion-optimized checkout",
      "Real-time menu sync — specials, 86'd items, hours update instantly",
      "Merchant controls all pricing and item visibility",
      "No forced restructuring of your menu or categories",
    ],
    metric: { value: "$0.10", label: "per order — regardless of ticket size" },
  },
  {
    id: "hub",
    number: "02",
    color: "#14b8a6",
    bg: "#f0fdfb",
    tag: "Neighborhood Hub",
    headline: "Local discovery that works for independent restaurants, not against them.",
    body: "The Neighborhood Hub is a local discovery feed where your restaurant appears alongside other neighborhood businesses — sorted by distance and customer preference, not by who paid the highest commission or ad fee. No price-based default ranking. No sponsored suppression. Neutral, transparent visibility.",
    features: [
      "Distance and preference-based ranking — not commission-driven",
      "Appears on local discovery feed alongside neighborhood restaurants",
      "No side-by-side price comparison that creates race-to-bottom dynamics",
      "Sponsored placements clearly labeled, capped, and optional",
      "Fair treatment between chains and independents",
      "Your brand remains primary — no competing restaurant shown on your page",
    ],
    metric: { value: "Local first", label: "neighborhood demand built together" },
  },
  {
    id: "autopilot",
    number: "03",
    color: "#f59e0b",
    bg: "#fffbeb",
    tag: "AI Growth Autopilot",
    headline: "We build. You review. The platform grows.",
    body: "AI Growth Autopilot handles the time-consuming parts of running a digital commerce operation — setup, optimization, marketing, monitoring — so you can spend your time on the food. Every action requires your review. Nothing runs without your approval.",
    features: [
      "Auto-imports and structures your menu from POS — you review and approve",
      "Detects peak demand windows, suggests prep time adjustments",
      "Triggers neighborhood campaigns automatically — with clear opt-in controls",
      "Re-engages inactive customers with targeted messaging",
      "Identifies high-margin items for spotlight and promotion",
      "Flags SLA degradation, refund anomalies, and integration issues proactively",
    ],
    metric: { value: "Operator in control", label: "AI recommends — you decide" },
  },
  {
    id: "delivery",
    number: "04",
    color: "#2563eb",
    bg: "#f0f6ff",
    tag: "Delivery orchestration (N4Sync)",
    headline: "Delivery risk belongs to us, not you.",
    body: "N4Cluster owns the logistics layer. We coordinate drivers, monitor pickup timestamps, track delivery completion, and take accountability for delays. Food quality is yours. Everything else is ours. That clear line removes the biggest operational headache from your plate.",
    features: [
      "30-minute SLA from pickup — internal operational target of 95%+ compliance",
      "Merchant chooses preferred delivery partner — we coordinate the rest",
      "Driver delays, cancellations, and logistics failures → N4Cluster accountability",
      "System timestamp monitoring for every order — no manual tracking",
      "Clear refund policy: driver fault vs food fault clearly separated",
      "Delivery coverage across apartments, campuses, and complex drop scenarios",
    ],
    metric: { value: "30 min SLA", label: "logistics risk on us, not you" },
  },
];

export default function PlatformPage() {
  return (
    <>
      <HeroCentered
        eyebrow="The platform"
        heading="One platform. Four things working together."
        subheading="N4Cluster is white-label ordering, neighborhood discovery, AI-powered growth, and merchant-accountable delivery — connected in a single system for $0.10 per order."
        primaryCta={{ label: "Request a Walkthrough", href: "/contact" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
      />

      {/* Overview strip */}
      <div className="py-6" style={{ background: "#040d1c", borderTop: "1px solid #1e3a70", borderBottom: "1px solid #1e3a70" }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <div className="text-xs font-semibold text-white">{p.tag}</div>
                  <div className="text-xs" style={{ color: "#64748b" }}>Layer {p.number}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Pillar sections */}
      {pillars.map((pillar, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className="py-16 md:py-24"
            style={{ background: isEven ? "#ffffff" : "#f8fafc" }}
          >
            <Container size="lg">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Text */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold" style={{ color: pillar.color + "30" }}>{pillar.number}</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: pillar.bg, color: pillar.color }}
                    >
                      {pillar.tag}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "#040d1c" }}>
                    {pillar.headline}
                  </h2>
                  <p className="text-base leading-relaxed mb-7" style={{ color: "#475569" }}>
                    {pillar.body}
                  </p>
                  <ul className="space-y-3 mb-7">
                    {pillar.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: pillar.color }} />
                        <span className="text-sm leading-relaxed" style={{ color: "#475569" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-4 rounded-xl px-5 py-3" style={{ background: pillar.bg, border: `1px solid ${pillar.color}25` }}>
                    <div>
                      <div className="text-xl font-bold" style={{ color: pillar.color }}>{pillar.metric.value}</div>
                      <div className="text-xs" style={{ color: "#64748b" }}>{pillar.metric.label}</div>
                    </div>
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <PillarVisual pillar={pillar} />
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Governance summary */}
      <section className="py-16 md:py-20" style={{ background: "#040d1c" }}>
        <Container size="lg">
          <SectionIntro
            eyebrow="Merchant protections"
            heading="The operating principles don't change."
            subheading="N4Cluster is designed on a flat-fee infrastructure model. These are not marketing claims — they are built into our governance framework."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { title: "No commission. Ever.", body: "Not now. Not later. Not disguised as a service fee. Flat $0.10 per order." },
              { title: "No pricing parity required.", body: "You can charge differently on different channels. We have no say in your pricing." },
              { title: "90–180 day change notice.", body: "Any material policy change comes with advance notice and exit rights. In writing." },
              { title: "Your data. Always.", body: "Customer data is yours to access, market to, and take with you if you leave." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-1 h-6 rounded-full mb-3" style={{ background: "#14b8a6" }} />
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="See the platform in your restaurant's context"
        subheading="Request a walkthrough and we'll show you exactly how each layer works for your business model."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "View Solutions", href: "/solutions" }}
        dark={false}
      />
    </>
  );
}

function PillarVisual({ pillar }: { pillar: (typeof pillars)[number] }) {
  if (pillar.id === "storefront") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "#f1f5f9" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="flex-1 mx-3 rounded-md px-3 py-1 text-xs" style={{ background: "#e2e8f0", color: "#64748b" }}>
            yourrestaurant.com/order
          </div>
        </div>
        {/* Page */}
        <div className="p-6" style={{ background: "#ffffff" }}>
          <div className="h-8 rounded-lg mb-4 w-40" style={{ background: "#2563eb" }} />
          <div className="h-4 rounded mb-2 w-3/4" style={{ background: "#f1f5f9" }} />
          <div className="h-4 rounded mb-5 w-1/2" style={{ background: "#f1f5f9" }} />
          <div className="grid grid-cols-2 gap-3">
            {["Entrees", "Sides", "Drinks", "Desserts"].map((cat) => (
              <div key={cat} className="rounded-xl p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div className="h-16 rounded-lg mb-2" style={{ background: "#e2e8f0" }} />
                <div className="h-3 rounded w-2/3" style={{ background: "#cbd5e1" }} />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl py-3 text-center text-sm font-semibold text-white" style={{ background: "#2563eb" }}>
            Add to order
          </div>
        </div>
      </div>
    );
  }

  if (pillar.id === "hub") {
    return (
      <div className="rounded-2xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-sm" style={{ color: "#040d1c" }}>Near you · 0.8 mi radius</div>
            <div className="text-xs" style={{ color: "#94a3b8" }}>Sorted by distance & preference</div>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: "#f0fdfb", color: "#0d9488", border: "1px solid #99f6e4" }}>
            Neighborhood Hub
          </div>
        </div>
        {[
          { name: "Your Restaurant", dist: "0.2 mi", tag: "Direct ordering", highlight: true },
          { name: "Corner Café", dist: "0.4 mi", tag: "Breakfast", highlight: false },
          { name: "The Pasta Place", dist: "0.6 mi", tag: "Italian", highlight: false },
          { name: "Burger & Co.", dist: "0.8 mi", tag: "American", highlight: false },
        ].map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-xl p-3.5 mb-2.5"
            style={{
              background: r.highlight ? "#f0f6ff" : "#ffffff",
              border: `1px solid ${r.highlight ? "#2563eb30" : "#e2e8f0"}`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg" style={{ background: r.highlight ? "#2563eb20" : "#f1f5f9" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "#040d1c" }}>{r.name}</div>
                <div className="text-xs" style={{ color: "#94a3b8" }}>{r.tag}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium" style={{ color: "#64748b" }}>{r.dist}</div>
              {r.highlight && (
                <div className="text-xs font-semibold" style={{ color: "#2563eb" }}>Order direct</div>
              )}
            </div>
          </div>
        ))}
        <div className="text-xs text-center mt-3" style={{ color: "#94a3b8" }}>Ranking: distance · preference · category — not commission</div>
      </div>
    );
  }

  if (pillar.id === "autopilot") {
    return (
      <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>AI Growth Autopilot</div>
            <div className="font-bold text-white">This week's suggestions</div>
          </div>
          <div className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>3 pending review</div>
        </div>
        {[
          { type: "Campaign", title: "Friday 6–8pm promo ready", sub: "Targets 142 lapsed customers. Est. 28 reorders.", color: "#f59e0b", action: "Review" },
          { type: "Menu", title: "3 low-quality image flags", sub: "Auto-replaced with catalog defaults. Approve to publish.", color: "#2563eb", action: "Approve" },
          { type: "Operations", title: "Prep time +4 min on Fri peak", sub: "Based on last 6 Fridays. Reduces ETA misses by ~40%.", color: "#14b8a6", action: "Accept" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl p-4 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: item.color }}>{item.type}</div>
                <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                <div className="text-xs" style={{ color: "#94a3b8" }}>{item.sub}</div>
              </div>
              <div className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: item.color + "20", color: item.color }}>
                {item.action}
              </div>
            </div>
          </div>
        ))}
        <div className="text-xs text-center mt-2" style={{ color: "#475569" }}>Nothing activates without your approval.</div>
      </div>
    );
  }

  // delivery / N4Sync
  return (
    <div className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>N4Sync Delivery</div>
          <div className="font-bold" style={{ color: "#040d1c" }}>Order #5204 — Live</div>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(20,184,166,0.12)", color: "#0d9488" }}>On track</div>
      </div>
      <div className="space-y-3 mb-5">
        {[
          { label: "Order confirmed", time: "6:02 pm", done: true, owner: "" },
          { label: "Pickup timestamp logged", time: "6:14 pm", done: true, owner: "" },
          { label: "Driver en route", time: "6:15 pm", active: true, owner: "" },
          { label: "Delivery confirmed", time: "Est. 6:32 pm", done: false, owner: "" },
        ].map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
              style={{
                background: step.done ? "rgba(20,184,166,0.15)" : step.active ? "rgba(37,99,235,0.12)" : "#f1f5f9",
                border: `1.5px solid ${step.done ? "#14b8a6" : step.active ? "#2563eb" : "#e2e8f0"}`,
                color: step.done ? "#14b8a6" : step.active ? "#2563eb" : "#94a3b8",
              }}
            >
              {step.done ? "✓" : step.active ? "●" : "○"}
            </div>
            <div className="flex-1">
              <span className="text-sm" style={{ color: step.done || step.active ? "#040d1c" : "#94a3b8", fontWeight: step.active ? 600 : 400 }}>
                {step.label}
              </span>
            </div>
            <span className="text-xs flex-shrink-0" style={{ color: "#64748b" }}>{step.time}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#f0fdfb", border: "1px solid rgba(20,184,166,0.25)" }}>
        <div className="flex items-start gap-3">
          <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#14b8a6" }} />
          <div>
            <div className="text-xs font-semibold mb-0.5" style={{ color: "#0d9488" }}>Driver delay? Our accountability.</div>
            <div className="text-xs" style={{ color: "#64748b" }}>Any logistics failure is logged and owned by N4Cluster — the merchant is never responsible for what happens after pickup.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
