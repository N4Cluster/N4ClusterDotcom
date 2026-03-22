import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — Commission-Free Commerce for Every Restaurant Type",
  description:
    "N4Cluster adapts to independent restaurants, multi-location brands, and delivery-first operators — always at $0.10 per order, no commission.",
};

// ─── Solution blocks ─────────────────────────────────────────────────────────
const solutions = [
  {
    id: "independent",
    tag: "For independent restaurants",
    headline: "Stop handing 20–30% of every order to a marketplace.",
    subheadline:
      "You built the food. You built the following. N4Cluster gives you the ordering channel to match — under your brand, with your customers, at $0.10 per order.",
    bullets: [
      "Branded direct ordering under your own website — no marketplace branding",
      "Customer data, contact info, and loyalty fully owned by you",
      "AI Growth Autopilot handles the marketing so you can focus on the kitchen",
      "Neighborhood Hub puts you in front of local customers discovering places nearby",
      "Delivery managed by N4Cluster — 30-minute SLA from pickup, logistics risk on us",
      "$0.10 per order flat. No commission. No monthly minimum. Optional price lock.",
    ],
    outcomes: [
      { label: "Commission saved per $40 order vs 30% marketplace", value: "$11.90" },
      { label: "Customers who order direct vs through 3rd party stay", value: "Yours" },
      { label: "Time to go live with branded ordering", value: "Days" },
    ],
    color: "#2563eb",
    bg: "#f0f6ff",
    cta: "See how it works for independents",
    ctaHref: "/how-it-works",
    visual: "independent",
  },
  {
    id: "multi-location",
    tag: "For multi-location brands",
    headline: "Consistent experience across every location. One view of all of it.",
    subheadline:
      "Managing multiple locations shouldn't mean managing multiple disconnected systems. N4Cluster gives you unified ordering, centralized visibility, and location-level performance — in one platform.",
    bullets: [
      "Unified branded ordering across all locations — same experience everywhere",
      "Centralized dashboard with location-level detail for orders, revenue, and customer data",
      "Menu and availability sync from POS — changes reflect instantly, no manual updates",
      "Cross-location AI insights: which locations are growing, which need attention",
      "Neighborhood Hub presence for every location, sorted by proximity to local customers",
      "Flat $0.10 per order across every location — no per-location platform fees",
    ],
    outcomes: [
      { label: "Locations managed in one platform", value: "All of them" },
      { label: "Commission model", value: "None. Ever." },
      { label: "Menu update lag from POS to ordering site", value: "Real-time" },
    ],
    color: "#14b8a6",
    bg: "#f0fdfb",
    cta: "Talk about your multi-location setup",
    ctaHref: "/contact",
    visual: "multi",
  },
  {
    id: "delivery",
    tag: "For delivery-first operators",
    headline: "Delivery is your business model. We built the infrastructure for it.",
    subheadline:
      "N4Cluster owns the logistics layer — driver coordination, SLA monitoring, and delivery accountability. You focus on order volume. We make sure the experience holds.",
    bullets: [
      "N4Cluster manages delivery — 30-minute SLA from pickup, tracked by timestamp",
      "Driver delays and logistics failures are our accountability, not yours",
      "Neighborhood Hub drives local demand without you running ads manually",
      "AI Autopilot detects demand windows, suggests zone adjustments, re-engages lapsed customers",
      "Real-time availability and inventory sync — no overselling, no manual updates",
      "Clear SLA reporting: every missed delivery tracked with root-cause classification",
    ],
    outcomes: [
      { label: "SLA compliance target", value: "95%+" },
      { label: "Who owns logistics risk", value: "N4Cluster" },
      { label: "Fee per order regardless of delivery complexity", value: "$0.10" },
    ],
    color: "#f59e0b",
    bg: "#fffbeb",
    cta: "Talk about your delivery model",
    ctaHref: "/contact",
    visual: "delivery",
  },
  {
    id: "partners",
    tag: "For ecosystem and integration partners",
    headline: "Build on infrastructure that's aligned with merchant success.",
    subheadline:
      "N4Cluster is designed for the partner ecosystem — POS providers, delivery networks, payment platforms, and commerce technology — to connect into a flat-fee infrastructure that grows alongside the merchants it serves.",
    bullets: [
      "Integration-first architecture: webhook and event-driven patterns, extensible by design",
      "Pilot-first onboarding: connect in a focused scope, validate, then expand",
      "Partner economics aligned with merchant growth — not commission extraction",
      "Clear data governance: aggregated insights only, no competitor intelligence leakage",
      "Transparent ranking and discovery rules — no black-box suppression",
      "Merchant Advisory Council model at scale — partner voice in governance",
    ],
    outcomes: [
      { label: "Integration model", value: "API / Webhook" },
      { label: "Merchant fee model (conflict-free)", value: "$0.10 flat" },
      { label: "Onboarding approach", value: "Pilot-first" },
    ],
    color: "#2563eb",
    bg: "#f0f6ff",
    cta: "Start a partner conversation",
    ctaHref: "/partners",
    visual: "partner",
  },
];

// ─── Visual components ────────────────────────────────────────────────────────
function IndependentVisual() {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
      <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Monthly order comparison</div>
      {[
        { label: "Your current marketplace take", value: "-$1,200/mo", sub: "On 400 orders avg $10 commission each", bad: true },
        { label: "N4Cluster total platform cost", value: "-$40/mo", sub: "On 400 orders × $0.10 flat fee", bad: false },
        { label: "Margin recovered per month", value: "+$1,160", sub: "Stays in your business", good: true },
      ].map((row) => (
        <div key={row.label} className="rounded-xl p-4 mb-3" style={{ background: row.good ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${row.good ? "rgba(20,184,166,0.25)" : "rgba(255,255,255,0.07)"}` }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>{row.label}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{row.sub}</div>
            </div>
            <div className="text-base font-bold ml-4" style={{ color: row.bad ? "#ef4444" : "#14b8a6" }}>{row.value}</div>
          </div>
        </div>
      ))}
      <div className="text-xs mt-2 text-center" style={{ color: "#475569" }}>Illustrative estimate. Actual savings vary by volume and marketplace mix.</div>
    </div>
  );
}

function MultiVisual() {
  const locs = ["Downtown", "Midtown", "Westside", "Airport"];
  return (
    <div className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>All locations</div>
          <div className="font-bold" style={{ color: "#040d1c" }}>Live Dashboard</div>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(20,184,166,0.12)", color: "#0d9488" }}>4 locations live</div>
      </div>
      <div className="space-y-3">
        {locs.map((loc, i) => {
          const orders = [142, 89, 210, 63][i];
          const rev = [5680, 3560, 8400, 2520][i];
          const pct = [orders / 210 * 100][0];
          return (
            <div key={loc} className="rounded-xl p-3.5" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: "#040d1c" }}>{loc}</span>
                <span className="text-sm font-bold" style={{ color: "#040d1c" }}>${rev.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "#e2e8f0" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.round(orders / 210 * 100)}%`, background: "#14b8a6" }} />
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: "#64748b" }}>{orders} orders</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeliveryVisual() {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>Delivery Operations</div>
          <div className="font-bold text-white">Live SLA Monitor</div>
        </div>
        <div className="text-2xl font-bold" style={{ color: "#14b8a6" }}>97%</div>
      </div>
      <div className="space-y-3 mb-4">
        {[
          { label: "Orders dispatched", val: "247", color: "#2563eb" },
          { label: "On-time (≤30 min)", val: "239", color: "#14b8a6" },
          { label: "Exceptions (logged + resolved)", val: "8", color: "#f59e0b" },
          { label: "Driver delays (N4Cluster liability)", val: "8", color: "#94a3b8" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="text-xs" style={{ color: "#94a3b8" }}>{row.label}</span>
            <span className="text-sm font-bold" style={{ color: row.color }}>{row.val}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-3.5" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
        <div className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>N4Cluster responsibility</div>
        <div className="text-xs" style={{ color: "#94a3b8" }}>All driver and logistics delays logged, root-caused, and owned by N4Cluster — not escalated to the merchant.</div>
      </div>
    </div>
  );
}

function PartnerVisual() {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
      <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Integration architecture</div>
      <div className="space-y-3">
        {[
          { layer: "POS partners", examples: "Toast · Square · SpotOn · Revel", color: "#2563eb" },
          { layer: "Payment processing", examples: "Fraud detection · Transparent reconciliation", color: "#14b8a6" },
          { layer: "Delivery networks", examples: "Preferred carrier routing · SLA monitoring", color: "#f59e0b" },
          { layer: "Marketing & CRM", examples: "Email · SMS · Loyalty sync", color: "#2563eb" },
          { layer: "Analytics & BI", examples: "Aggregated insights · No competitor leakage", color: "#14b8a6" },
        ].map((row) => (
          <div key={row.layer} className="rounded-xl p-3.5" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.color }} />
              <div>
                <div className="text-xs font-semibold" style={{ color: "#040d1c" }}>{row.layer}</div>
                <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{row.examples}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  independent: <IndependentVisual />,
  multi: <MultiVisual />,
  delivery: <DeliveryVisual />,
  partner: <PartnerVisual />,
};

export default function SolutionsPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Solutions"
        heading="Your restaurant type. Our flat $0.10 per order."
        subheading="N4Cluster adapts to how you operate — independent, multi-location, or delivery-first. The pricing model never changes: no commission, ever."
        primaryCta={{ label: "Talk to the Team", href: "/contact" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
      />

      {/* Solution blocks */}
      {solutions.map((sol, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={sol.id}
            id={sol.id}
            className="py-16 md:py-24"
            style={{ background: isEven ? "#ffffff" : "#f8fafc" }}
          >
            <Container size="lg">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Text */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                    style={{ background: sol.bg, color: sol.color }}
                  >
                    {sol.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "#040d1c" }}>
                    {sol.headline}
                  </h2>
                  <p className="text-base leading-relaxed mb-7" style={{ color: "#475569" }}>
                    {sol.subheadline}
                  </p>
                  <ul className="space-y-3 mb-7">
                    {sol.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: sol.color }} />
                        <span className="text-sm leading-relaxed" style={{ color: "#475569" }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome metrics */}
                  <div className="rounded-xl p-5 mb-6" style={{ background: sol.bg, border: `1px solid ${sol.color}25` }}>
                    <div className="grid grid-cols-3 gap-4">
                      {sol.outcomes.map((o) => (
                        <div key={o.label} className="text-center">
                          <div className="text-base font-bold mb-1" style={{ color: sol.color }}>{o.value}</div>
                          <div className="text-xs leading-tight" style={{ color: "#64748b" }}>{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={sol.ctaHref}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group"
                    style={{ color: sol.color }}
                  >
                    {sol.cta}
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Visual */}
                <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                  {visuals[sol.visual]}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Governance note */}
      <section className="py-14" style={{ background: "#040d1c" }}>
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Merchant Bill of Rights",
                body: "Non-commission commitment in writing. Right to exit if pricing changes. 90–180 day advance notice for any material change.",
                color: "#2563eb",
              },
              {
                title: "No pricing parity required",
                body: "N4Cluster does not require you to match pricing across channels or participate in discounts. Your pricing. Your call.",
                color: "#14b8a6",
              },
              {
                title: "Optional 1–2 year price lock",
                body: "Lock in $0.10 per order for up to two years. CPI-capped adjustments only if necessary, with a defined formula and cap.",
                color: "#f59e0b",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-1.5 h-8 rounded-full mb-4" style={{ background: item.color }} />
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Which model fits your restaurant?"
        subheading="Tell us how you operate and we'll show you exactly how N4Cluster would work for your business."
        primaryCta={{ label: "Talk to the Team", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
