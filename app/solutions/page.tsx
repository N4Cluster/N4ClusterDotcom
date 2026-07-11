import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — Commission-Free Commerce for Every Restaurant Type",
  description:
    "N4Cluster adapts to independent restaurants, multi-location brands, and delivery-first operators — always a flat $99/month plus $0.50 per order, no commission.",
};

// ─── Solution blocks ─────────────────────────────────────────────────────────
const solutions = [
  {
    id: "independent",
    tag: "For independent restaurants",
    headline: "You're losing $12 of every $40 ticket to a marketplace that doesn't cook your food.",
    subheadline:
      "You built the menu, the regulars, the reputation. A marketplace app didn't build any of that — it just collects rent on it. N4Cluster gives you a branded ordering channel that's actually yours, for a flat $99/month plus $0.50 per order.",
    bullets: [
      "Your name on the ordering page, not a marketplace logo — customers order from you, not through a middleman",
      "Every phone number, email, and order history is yours — not rented from a platform that can cut you off tomorrow",
      "AI Growth Autopilot runs the marketing in the background while you run the line",
      "Neighborhood Hub puts your kitchen in front of neighbors deciding where to order from tonight",
      "We run delivery — 30-minute SLA from pickup, and a late driver is our problem, not a call you have to take",
      "$99/month flat plus $0.50 per order. No commission, ever. Lock the rate for up to two years if you want it in writing.",
    ],
    outcomes: [
      { label: "What stays in your pocket per $40 order vs. a 30% marketplace", value: "$11.50" },
      { label: "Who owns the customer when they order direct", value: "Yours" },
      { label: "Time from signup to live branded ordering", value: "Days" },
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
    headline: "Downtown's slammed and the Airport location can't crack 60 orders a day — and you're finding out from four different logins.",
    subheadline:
      "Every disconnected system you run is another place a problem can hide until payroll tells you about it. N4Cluster puts every location's orders, revenue, and customer data in one dashboard — unified ordering, one flat fee, no guessing which store needs you this week.",
    bullets: [
      "One branded ordering site for every location — customers get the same experience whether they're Downtown or at the Airport counter",
      "One dashboard, every location broken out by orders, revenue, and customer data — not buried across four separate logins",
      "86 an item at one location and it's off the menu everywhere it should be — synced straight from your POS, no manual updates at 11pm",
      "AI flags which locations are pulling their weight and which ones need you to show up this week",
      "Every location shows up in Neighborhood Hub for the neighbors actually close enough to order from it",
      "Flat $99/month plus $0.50 per order across every location — no per-location platform fee stacking up as you grow",
    ],
    outcomes: [
      { label: "Locations you can see from one login", value: "All of them" },
      { label: "What we take in commission", value: "None. Ever." },
      { label: "How long a POS menu change takes to show up online", value: "Real-time" },
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
    headline: "When delivery is the business, one late driver isn't an inconvenience — it's a refund, a one-star review, and a customer who doesn't come back.",
    subheadline:
      "You can't control a driver stuck in traffic. You can control who's on the hook when it happens. N4Cluster runs driver coordination, tracks every order against a 30-minute SLA, and owns the failures — so a late delivery is our accountability, not a conversation you have to have with a customer holding cold food.",
    bullets: [
      "We run delivery — every order tracked against a 30-minute SLA from pickup, timestamped",
      "Driver delays and logistics failures are on us — not a call you have to make to an angry customer",
      "Neighborhood Hub keeps local orders coming in without you babysitting an ad account between rushes",
      "AI Autopilot spots your next rush before it hits, flags zones worth adjusting, and brings back customers who've gone quiet",
      "Availability syncs in real time — you're never taking an order for something the kitchen already ran out of",
      "Every missed delivery gets tracked and root-caused — you see exactly what happened, not just a bad rating",
    ],
    outcomes: [
      { label: "How often deliveries hit the 30-minute window", value: "95%+" },
      { label: "Who eats it when a driver runs late", value: "N4Cluster" },
      { label: "What you pay per order, easy or complicated", value: "$0.50" },
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
    headline: "Plug into a platform that doesn't profit from squeezing the merchants you both serve.",
    subheadline:
      "POS providers, delivery networks, payment platforms — if you serve restaurants, you know what a commission-hungry partner does to trust. N4Cluster runs on a flat fee, not a cut of the merchant's ticket, so your integration doesn't inherit that conflict.",
    bullets: [
      "Connect with webhooks and event triggers — built to plug in without a six-month integration project",
      "Start with a focused pilot, prove it works, then expand — no big-bang rollout required",
      "We make money on a flat fee, same as you'd want from us — not by skimming the merchants you both serve",
      "You get aggregated insights, never a look at a merchant's competitor data — it stays where it belongs",
      "No black-box ranking — merchants know why they show up where they show up, and so do you",
      "Merchant Advisory Council gives partners an actual seat at the table, not a suggestion box",
    ],
    outcomes: [
      { label: "How you connect", value: "API / Webhook" },
      { label: "What merchants pay — nothing to align a commission against", value: "$0.50/order + $99/mo" },
      { label: "How onboarding starts", value: "Pilot-first" },
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
        { label: "Your current marketplace take", value: "-$4,000/mo", sub: "On 400 orders avg $10 commission each", bad: true },
        { label: "N4Cluster total platform cost", value: "-$299/mo", sub: "On 400 orders × $0.50/order + $99/mo platform fee", bad: false },
        { label: "Margin recovered per month", value: "+$3,701", sub: "Stays in your business", good: true },
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
        heading="Independent, multi-location, delivery-first — the price never changes: $99/month + $0.50 per order."
        subheading="However you run your kitchen, the marketplace tax doesn't apply here. No commission, ever — just one flat fee, whether you're running one location or four."
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
                title: "No commission. In writing.",
                body: "The no-commission commitment is in writing, not a handshake. If pricing ever changes materially, you get 90–180 days' advance notice and the right to exit.",
                color: "#2563eb",
              },
              {
                title: "Your prices, your call",
                body: "We'll never make you match pricing across channels or run someone else's discounts. What you charge on your own site is entirely up to you.",
                color: "#14b8a6",
              },
              {
                title: "Lock your rate, if you want it",
                body: "Lock in $0.50 per order and the $99/month platform fee for up to two years. Any adjustment after that is capped by a defined CPI formula — never at our discretion.",
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
