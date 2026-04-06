import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — From POS to Neighborhood Growth",
  description:
    "See how N4Cluster goes from POS connection to live branded ordering to AI-powered neighborhood growth — in days, not months.",
};

const phases = [
  {
    tag: "Day 1",
    color: "#2563eb",
    bg: "#f0f6ff",
    headline: "Connect. Import. Preview.",
    sub: "You connect your POS. We handle everything else.",
    tasks: [
      "POS connected — menu data automatically imported",
      "AI structures your catalog: categories, descriptions, missing items flagged",
      "Delivery radius auto-configured based on neighborhood density",
      "Full ordering site built and ready for your review",
      "Nothing goes live until you approve it",
    ],
    merchant: "Review your preview site and approve to launch.",
    n4cluster: "Build your ordering site, clean your catalog, configure delivery radius.",
    visual: [
      { label: "POS connection", status: "done" },
      { label: "Menu import (84 items)", status: "done" },
      { label: "Catalog structured by AI", status: "done" },
      { label: "Preview site ready", status: "done" },
      { label: "Merchant review", status: "active" },
    ],
  },
  {
    tag: "Days 2–5",
    color: "#14b8a6",
    bg: "#f0fdfb",
    headline: "Go live. Join the Hub. Start accepting orders.",
    sub: "Once you approve, your branded ordering site goes live. You appear in the Neighborhood Hub.",
    tasks: [
      "Branded ordering site live under your domain",
      "Your restaurant appears in Neighborhood Hub — sorted by distance, not commission",
      "Real-time POS sync active — menu and availability update automatically",
      "Customer orders flow directly into your POS — no extra tablets",
      "Order confirmation and delivery coordination begins through N4Sync",
    ],
    merchant: "Accept your first direct orders. No additional setup required.",
    n4cluster: "Monitor delivery SLA, coordinate drivers, handle any logistics exceptions.",
    visual: [
      { label: "Branded site live", status: "done" },
      { label: "Hub presence active", status: "done" },
      { label: "POS sync running", status: "done" },
      { label: "First orders received", status: "done" },
      { label: "Delivery SLA tracking", status: "active" },
    ],
  },
  {
    tag: "Week 2–4",
    color: "#f59e0b",
    bg: "#fffbeb",
    headline: "Autopilot activates. Growth compounds.",
    sub: "N4Logic starts identifying your demand patterns and activating growth opportunities — all with your approval.",
    tasks: [
      "AI identifies your peak demand windows and suggests timing adjustments",
      "First neighborhood campaign triggered — sent only with your opt-in",
      "Repeat customer data building: who's ordering, how often, what they prefer",
      "High-margin items identified and flagged for Neighborhood Hub spotlight",
      "Inactive customer re-engagement suggestions queued for your review",
    ],
    merchant: "Review AI suggestions in your dashboard. Approve what you want to activate.",
    n4cluster: "Run approved campaigns, monitor SLA, surface demand signals weekly.",
    visual: [
      { label: "Demand pattern detected", status: "done" },
      { label: "First campaign approved", status: "done" },
      { label: "Repeat customer cohort building", status: "active" },
      { label: "Re-engagement queue ready", status: "pending" },
      { label: "Hub spotlight approved", status: "pending" },
    ],
  },
  {
    tag: "Ongoing",
    color: "#2563eb",
    bg: "#f0f6ff",
    headline: "Neighborhood order density compounds.",
    sub: "Every order builds the model. More direct orders. More repeat customers. More margin.",
    tasks: [
      "$0.99 per order — the same fee regardless of order volume or ticket size",
      "Customer loyalty and data accumulates in your account — not the platform's",
      "N4Logic continuously improves campaign timing based on real data",
      "SLA performance tracked and reported transparently every week",
      "Annual price review: flat fee, CPI-capped adjustments only, with advance notice",
    ],
    merchant: "Operate your restaurant. Review weekly signals. Make the calls that matter.",
    n4cluster: "Run the infrastructure. Improve the system. Never extract more per order.",
    visual: [
      { label: "Direct order volume growing", status: "done" },
      { label: "Customer data owned by merchant", status: "done" },
      { label: "Campaign performance improving", status: "done" },
      { label: "SLA compliance: 97%", status: "done" },
      { label: "$0.99 per order. No change.", status: "done" },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <HeroCentered
        eyebrow="How it works"
        heading="Day 1 to live ordering. Week 1 to neighborhood growth."
        subheading="N4Cluster is designed to get you from POS connection to branded ordering to AI-powered growth in a matter of days — not a multi-month implementation."
        primaryCta={{ label: "See It in Action", href: "/contact" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
      />

      {/* Timeline phases */}
      {phases.map((phase, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={phase.tag}
            className="py-16 md:py-20"
            style={{ background: isEven ? "#ffffff" : "#f8fafc" }}
          >
            <Container size="lg">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Text */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <span
                    className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
                    style={{ background: phase.bg, color: phase.color }}
                  >
                    {phase.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight" style={{ color: "#040d1c" }}>
                    {phase.headline}
                  </h2>
                  <p className="text-base mb-7" style={{ color: "#475569" }}>{phase.sub}</p>
                  <ul className="space-y-3 mb-8">
                    {phase.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                        <span className="text-sm" style={{ color: "#475569" }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Responsibility split */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4" style={{ background: phase.bg, border: `1px solid ${phase.color}25` }}>
                      <div className="text-xs font-bold mb-1.5" style={{ color: phase.color }}>You do</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{phase.merchant}</div>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div className="text-xs font-bold mb-1.5" style={{ color: "#475569" }}>We do</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{phase.n4cluster}</div>
                    </div>
                  </div>
                </div>

                {/* Progress visual */}
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: isEven ? "#f8fafc" : "#ffffff", border: "1px solid #e2e8f0" }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-bold text-sm" style={{ color: "#040d1c" }}>Progress — {phase.tag}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: phase.bg, color: phase.color }}>
                        {phase.visual.filter(v => v.status === "done").length}/{phase.visual.length} complete
                      </span>
                    </div>
                    <div className="space-y-3">
                      {phase.visual.map((step) => (
                        <div key={step.label} className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                            style={{
                              background: step.status === "done"
                                ? `${phase.color}15`
                                : step.status === "active"
                                ? `${phase.color}10`
                                : "#f1f5f9",
                              border: `1.5px solid ${step.status === "pending" ? "#e2e8f0" : phase.color}`,
                              color: step.status === "pending" ? "#94a3b8" : phase.color,
                            }}
                          >
                            {step.status === "done" ? "✓" : step.status === "active" ? "●" : "○"}
                          </div>
                          <span
                            className="text-sm"
                            style={{
                              color: step.status === "pending" ? "#94a3b8" : "#040d1c",
                              fontWeight: step.status === "active" ? 600 : 400,
                            }}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Summary strip */}
      <section className="py-12" style={{ background: "#040d1c" }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "Day 1", label: "Live branded ordering" },
              { value: "$0.99", label: "Per order, flat — forever" },
              { value: "30 min", label: "Delivery SLA, our risk" },
              { value: "0%", label: "Commission. Ever." },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to see exactly how this works for your restaurant?"
        subheading="Request a demo and we'll walk through the full process from POS to live ordering to neighborhood growth."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
        dark={false}
      />
    </>
  );
}
