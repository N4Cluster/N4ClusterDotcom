import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Growth Autopilot — N4Logic",
  description:
    "N4Logic is N4Cluster's AI Growth Autopilot. It auto-onboards your restaurant, optimizes demand, activates neighborhood marketing, and protects operations — all with your approval.",
};

const pillars = [
  {
    number: "01",
    color: "#2563eb",
    bg: "#f0f6ff",
    tag: "Onboarding",
    headline: "We build it. You review it.",
    body: "The single biggest reason restaurants delay going digital is setup friction. N4Logic eliminates it. The moment you connect your POS, Autopilot pulls your catalog, structures it intelligently, flags gaps, and builds your ordering site — ready for your review.",
    features: [
      "Auto-imports menu from POS — items, categories, pricing, descriptions",
      "AI structures catalog: suggests categories, flags missing descriptions",
      "Identifies low-quality or missing images",
      "Auto-configures delivery radius based on neighborhood density",
      "Prepares full ordering site preview before any merchant approval",
      "Nothing goes live without your final sign-off",
    ],
    principle: "We build. You review.",
  },
  {
    number: "02",
    color: "#f59e0b",
    bg: "#fffbeb",
    tag: "Demand optimization",
    headline: "Insight without interference.",
    body: "After launch, N4Logic continuously monitors how your restaurant is performing in the neighborhood — what's driving orders, when demand peaks, which items are getting attention, and where you're losing customers. It surfaces signals. You act on them.",
    features: [
      "Monitors neighborhood order density and your share of it",
      "Detects peak demand windows and suggests prep time adjustments",
      "Identifies repeat customer behavior and churn risk early",
      "Recommends inventory alerts for high-demand items",
      "Flags high-margin items worth promoting",
      "Surfaces campaign timing based on real order pattern analysis",
    ],
    principle: "Insight without interference.",
  },
  {
    number: "03",
    color: "#14b8a6",
    bg: "#f0fdfb",
    tag: "Marketing activation",
    headline: "Neighborhood growth, automated.",
    body: "N4Logic can run local re-engagement and promotional campaigns on your behalf — but only within guardrails you control. Every campaign type has a clear opt-in. You can override, pause, or disable any automation at any time. The system works for you, not around you.",
    features: [
      "Triggers neighborhood campaigns automatically with clear opt-in controls",
      "Sends re-engagement messages to inactive customers",
      "Suggests loyalty boosts during slow hours",
      "Optimizes delivery zones based on demand cluster data",
      "Identifies high-performing items for Neighborhood Hub spotlight",
      "All campaigns visible and modifiable in your merchant dashboard",
    ],
    principle: "Neighborhood growth, automated.",
  },
  {
    number: "04",
    color: "#2563eb",
    bg: "#f0f6ff",
    tag: "Risk protection",
    headline: "Protection runs in the background.",
    body: "N4Logic also watches for problems before they become crises. Abnormal refund patterns, SLA degradation, integration instability, chargeback risk — the system flags all of it proactively so you can address issues before customers notice.",
    features: [
      "Flags abnormal refund or chargeback patterns early",
      "Detects SLA degradation before it compounds into customer complaints",
      "Monitors POS integration stability — alerts on sync failures",
      "Tracks ETA accuracy and surfaces trend data",
      "Identifies fraud risk patterns in ordering behavior",
      "Operational exception reports available in your merchant dashboard",
    ],
    principle: "Protection runs in the background.",
  },
];

const guardrails = [
  { title: "AI never changes your pricing", body: "No automatic price adjustments. Pricing is yours. Always." },
  { title: "AI never forces discount participation", body: "Promotions are opt-in. N4Logic will suggest — never require." },
  { title: "AI never changes ranking logic silently", body: "Any change to how your restaurant appears in the Hub is visible and documented." },
  { title: "AI never overrides your prep time settings", body: "Suggestions only. You control how long your kitchen needs." },
  { title: "AI never suppresses your visibility", body: "No black-box algorithm with hidden factors affecting your discovery ranking." },
  { title: "AI never replaces your judgment", body: "Every automation is reversible. Merchant override is always available." },
];

export default function N4LogicPage() {
  return (
    <>
      <HeroCentered
        eyebrow="N4Logic — AI Growth Autopilot"
        heading="Set it once. Grow automatically. Stay in control."
        subheading="N4Logic is N4Cluster's AI layer. It handles the heavy operational work — setup, demand monitoring, campaign activation, and risk protection — so you focus on running your restaurant, not managing software."
        primaryCta={{ label: "See It in Action", href: "/contact" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
      />

      {/* Four pillars */}
      {pillars.map((pillar, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={pillar.number}
            className="py-16 md:py-20"
            style={{ background: isEven ? "#ffffff" : "#f8fafc" }}
          >
            <Container size="lg">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>
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
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                    {pillar.body}
                  </p>
                  <ul className="space-y-3">
                    {pillar.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: pillar.color }} />
                        <span className="text-sm leading-relaxed" style={{ color: "#475569" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <AutopilotCard pillar={pillar} />
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Technical underpinning */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            eyebrow="Under the hood"
            heading="AI built for operators, not experiments"
            subheading="N4Logic is designed to use purpose-built models trained on local commerce signals — not generic AI bolted on after the fact."
          />
          <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "NLP catalog classification",
                description: "Automated menu ingestion uses natural language processing to extract items, modifiers, and categories from unstructured POS data.",
              },
              {
                title: "Time-series demand forecasting",
                description: "Neighborhood-level order prediction using historical patterns, temporal signals, and external variables like weather and local events.",
              },
              {
                title: "Behavioral cohort analysis",
                description: "Customer segmentation using purchase frequency, recency, and value signals to identify churn risk and re-engagement windows.",
              },
              {
                title: "Anomaly detection",
                description: "Statistical monitoring for refund spikes, SLA degradation, integration failures, and fraud risk patterns across the order lifecycle.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-navy-950 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Guardrails */}
      <section className="py-16 md:py-24" style={{ background: "#040d1c" }}>
        <Container>
          <SectionIntro
            eyebrow="The guardrails"
            heading="AI Growth Autopilot will never do these six things."
            subheading="These are hard limits, not aspirational principles. They're how we prevent the system from drifting toward marketplace behavior."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {guardrails.map((g) => (
              <div key={g.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(20,184,166,0.15)" }}>
                  <Check size={10} style={{ color: "#14b8a6" }} strokeWidth={2.5} />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{g.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{g.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="See what AI Growth Autopilot can do for your restaurant"
        subheading="Request a demo and we'll walk through how N4Logic would work for your specific menu, volume, and neighborhood."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
        dark={false}
      />
    </>
  );
}

function AutopilotCard({ pillar }: { pillar: (typeof pillars)[number] }) {
  if (pillar.number === "01") {
    return (
      <div className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
        <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Onboarding progress</div>
        {[
          { step: "POS connected", pct: 100, done: true },
          { step: "Menu imported (84 items)", pct: 100, done: true },
          { step: "Catalog structured by AI", pct: 100, done: true },
          { step: "Missing descriptions flagged (3)", pct: 100, done: true },
          { step: "Preview site built", pct: 100, done: true },
          { step: "Awaiting merchant review", pct: 0, pending: true },
        ].map((row) => (
          <div key={row.step} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs" style={{ color: row.pending ? "#2563eb" : "#040d1c", fontWeight: row.pending ? 600 : 400 }}>
                {row.step}
              </span>
              {row.done && <Check size={12} style={{ color: "#14b8a6" }} strokeWidth={2.5} />}
              {row.pending && <span className="text-xs font-semibold" style={{ color: "#2563eb" }}>Your review needed</span>}
            </div>
            {row.done && (
              <div className="h-1 rounded-full" style={{ background: "rgba(20,184,166,0.2)" }}>
                <div className="h-1 rounded-full" style={{ width: "100%", background: "#14b8a6" }} />
              </div>
            )}
          </div>
        ))}
        <div className="rounded-xl p-4 mt-4" style={{ background: "#f0f6ff", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="text-xs font-semibold mb-1" style={{ color: "#2563eb" }}>We built it. Now it's your call.</div>
          <div className="text-xs" style={{ color: "#64748b" }}>Review your ordering site preview and approve to go live. Nothing publishes without your sign-off.</div>
        </div>
      </div>
    );
  }

  if (pillar.number === "02") {
    const signals = [
      { label: "Fri 6–8pm orders", val: "+34% above avg", color: "#f59e0b", bar: 84 },
      { label: "Repeat rate (30d)", val: "38%", color: "#2563eb", bar: 62 },
      { label: "Churn risk: 67 customers", val: "Last order 18+ days ago", color: "#ef4444", bar: 45 },
      { label: "Top margin item", val: "Truffle Fries · $11.50", color: "#14b8a6", bar: 73 },
    ];
    return (
      <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
        <div className="font-bold text-white mb-5">This week's demand signals</div>
        {signals.map((s) => (
          <div key={s.label} className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: "#94a3b8" }}>{s.label}</span>
              <span className="text-xs font-bold" style={{ color: s.color }}>{s.val}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "#1e293b" }}>
              <div className="h-1.5 rounded-full" style={{ width: `${s.bar}%`, background: s.color }} />
            </div>
          </div>
        ))}
        <div className="rounded-xl p-3.5 mt-2" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <div className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>Suggestion: Re-engage the 67</div>
          <div className="text-xs" style={{ color: "#94a3b8" }}>Send a "We miss you" campaign to customers inactive 18+ days. Est. 22 reorders based on historical pattern.</div>
        </div>
      </div>
    );
  }

  if (pillar.number === "03") {
    return (
      <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
        <div className="font-bold text-white mb-5">Active automations</div>
        {[
          { name: "Friday promo blast", status: "Running", color: "#14b8a6", sub: "Sent to 142 lapsed customers · 28 opens so far" },
          { name: "Slow Tuesday re-engagement", status: "Scheduled", color: "#f59e0b", sub: "Tuesday 3pm · Targeting customers who haven't ordered in 14d" },
          { name: "Truffle Fries spotlight", status: "Pending review", color: "#2563eb", sub: "Ready to add to Neighborhood Hub featured slot. Approve?" },
        ].map((item) => (
          <div key={item.name} className="rounded-xl p-4 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-white">{item.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: item.color + "20", color: item.color }}>{item.status}</span>
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>{item.sub}</div>
          </div>
        ))}
        <div className="text-xs text-center mt-3" style={{ color: "#475569" }}>All automations can be paused or overridden anytime.</div>
      </div>
    );
  }

  // Risk protection
  return (
    <div className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
      <div className="font-bold mb-5" style={{ color: "#040d1c" }}>Risk & operations alerts</div>
      {[
        { type: "Refund anomaly", desc: "3 refund requests from same address in 48h. Fraud scoring flagged.", severity: "high", color: "#ef4444" },
        { type: "SLA degradation", desc: "Avg delivery time up 4 min vs last week on Saturday. Driver assignment lag suspected.", severity: "medium", color: "#f59e0b" },
        { type: "Integration notice", desc: "POS menu sync delayed 18 min. Resolved. No customer impact.", severity: "low", color: "#14b8a6" },
      ].map((alert) => (
        <div key={alert.type} className="rounded-xl p-4 mb-3" style={{ background: "#ffffff", border: `1px solid ${alert.color}25` }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.color }} />
            <span className="text-xs font-bold" style={{ color: alert.color }}>{alert.type}</span>
          </div>
          <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>{alert.desc}</div>
        </div>
      ))}
      <div className="text-xs text-center mt-2" style={{ color: "#94a3b8" }}>N4Logic monitors in the background so you don't have to.</div>
    </div>
  );
}
