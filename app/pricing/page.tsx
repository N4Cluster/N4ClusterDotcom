import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — $99/Month + $0.50 Per Order. No Commission. Ever.",
  description:
    "N4Cluster charges the restaurant a flat $99/month platform fee plus $0.50 per order. No commission. No percentage of revenue. The math is simple by design.",
};

const commissionComparison = [
  { platform: "High-commission marketplace", rate: "30%", on40: "$12.00", on80: "$24.00", on150: "$45.00", color: "#ef4444" },
  { platform: "Mid-commission marketplace", rate: "27%", on40: "$10.80", on80: "$21.60", on150: "$40.50", color: "#f97316" },
  { platform: "Lower-commission marketplace", rate: "25%", on40: "$10.00", on80: "$20.00", on150: "$37.50", color: "#eab308" },
  { platform: "N4Cluster", rate: "0%", on40: "$0.50", on80: "$0.50", on150: "$0.50", color: "#14b8a6", bold: true },
];

const protections = [
  {
    title: "One fee. Zero surprises.",
    body: "The $99/month platform fee is quoted up front and never hidden. No add-on modules, no usage-based minimums, no surprise line items on your invoice.",
  },
  {
    title: "Your revenue stays yours",
    body: "Every dollar of revenue on a $200 order stays with you — minus $0.50. The fee is fixed to the transaction, not to the ticket size.",
  },
  {
    title: "Your prices, your call",
    body: "We will never require you to match or mirror pricing from third-party platforms. Your direct channel prices are yours to set.",
  },
  {
    title: "Nothing's locked behind a paywall",
    body: "N4Sync, N4Logic, and the Neighborhood Hub are included. There are no add-on modules, tiered feature unlocks, or upgrade tiers.",
  },
  {
    title: "We can't ambush you with a price hike",
    body: "Pricing cannot change without 90–180 days of written advance notice. Increases are capped by formula — not at discretion.",
  },
  {
    title: "Protected Exit Right",
    body: "If we ever materially change the pricing model, you have the right to exit your engagement under pre-defined terms without penalty.",
  },
];

const customerFeeDetails = [
  "Labeled clearly as \"N4Cluster Neighborhood Fee\" — not a restaurant surcharge",
  "Visible to customers at checkout before they complete an order",
  "Directed entirely to platform infrastructure and neighborhood support",
  "N4Cluster handles all customer questions about this fee",
  "You are never responsible for explaining or defending it",
  "Opt-out available for restaurants who prefer to absorb it in pricing",
];

const priceLockDetails = [
  { term: "1-year lock", body: "Merchant fee fixed at $0.50/order and $99/month platform fee for 12 months. No adjustments regardless of volume or platform changes." },
  { term: "2-year lock", body: "Merchant fee fixed at $0.50/order and $99/month platform fee for 24 months. Provides longer-horizon cost certainty for planning and negotiations." },
  { term: "Annual review", body: "After the lock period, pricing adjustments are permitted annually — but only up to the CPI cap formula, with full advance notice." },
];

const adjustmentFormula = [
  { label: "Base formula", value: "CPI change × adjustment multiplier" },
  { label: "Cap", value: "Never more than 2× CPI change in any single year" },
  { label: "Minimum notice", value: "90 days written notice for any increase" },
  { label: "Material change notice", value: "180 days written notice" },
  { label: "Exit right", value: "Available within 30 days of any material change notice" },
];

export default function PricingPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Pricing"
        heading="$99/month + $0.50 per order. No commission. Ever."
        subheading="We only make money when your direct ordering actually works — never by skimming your ticket. No revenue share, no fine print, no math you have to double-check at 11pm."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "/how-it-works" }}
      />

      {/* Core fee callout */}
      <section className="py-16 md:py-20" style={{ background: "#ffffff" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdfb", color: "#14b8a6" }}>
                Merchant fee
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: "#040d1c" }}>
                Two flat fees.<br />No commission. Ever.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                You pay a flat <strong style={{ color: "#040d1c" }}>$99 per month</strong> platform fee plus <strong style={{ color: "#040d1c" }}>$0.50 per order</strong> processed through N4Cluster — your branded ordering site, the Neighborhood Hub, or any integrated channel. Neither fee scales with your revenue. Neither fluctuates with ticket size.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#475569" }}>
                No setup charge. No percentage skimmed from every ticket. What you take from the customer is what you keep — minus fifty cents per order, plus one flat $99 platform fee each month.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="rounded-2xl px-8 py-6 text-center" style={{ background: "#f0fdfb", border: "1.5px solid #14b8a620" }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "#040d1c" }}>$99<span className="text-lg">/mo</span></div>
                  <div className="text-xs font-semibold" style={{ color: "#14b8a6" }}>Platform fee — merchant</div>
                </div>
                <div className="rounded-2xl px-8 py-6 text-center" style={{ background: "#f0fdfb", border: "1.5px solid #14b8a620" }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "#040d1c" }}>$0.50</div>
                  <div className="text-xs font-semibold" style={{ color: "#14b8a6" }}>Per order — merchant fee</div>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  The entire platform — white-label ordering, Neighborhood Hub, N4Logic AI, N4Sync delivery coordination — is included at this price.
                </div>
              </div>
            </div>

            {/* Commission comparison table */}
            <div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
                <div className="px-5 py-4" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <div className="text-sm font-bold" style={{ color: "#040d1c" }}>What you keep on a $40 / $80 / $150 order</div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>After per-order fees (excludes N4Cluster's flat $99/month platform fee). Commission rates are typical published rates.</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                        <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#64748b" }}>Platform</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#64748b" }}>Rate</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#64748b" }}>$40 order</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#64748b" }}>$80 order</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#64748b" }}>$150 order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionComparison.map((row, i) => (
                        <tr
                          key={row.platform}
                          style={{
                            borderBottom: i < commissionComparison.length - 1 ? "1px solid #f1f5f9" : "none",
                            background: row.bold ? "#f0fdfb" : "white",
                          }}
                        >
                          <td className="px-5 py-3.5">
                            <span className="font-semibold text-xs" style={{ color: row.bold ? "#040d1c" : "#475569" }}>
                              {row.platform}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-bold" style={{ color: row.color }}>{row.rate}</span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "#14b8a6" : "#ef4444" }}>
                              {row.on40}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "#14b8a6" : "#ef4444" }}>
                              {row.on80}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "#14b8a6" : "#ef4444" }}>
                              {row.on150}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3.5" style={{ background: "#f0fdfb", borderTop: "1px solid #14b8a620" }}>
                  <div className="text-xs" style={{ color: "#64748b" }}>
                    Marketplace fees shown are <em>platform commission only</em> — additional payment processing, listing, and promotional fees often apply separately.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer fee */}
      <section className="py-16 md:py-20" style={{ background: "#f8fafc" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className={""}>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "#fffbeb", color: "#f59e0b" }}>
                Customer fee
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "#040d1c" }}>
                That $0.99 checkout fee? Ours to own, not yours to defend.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#475569" }}>
                Every customer ordering through an N4Cluster channel sees a <strong style={{ color: "#040d1c" }}>$0.99 N4Cluster Neighborhood Fee</strong> at checkout. That's on us — a platform fee we collect, <em>not</em> a surcharge you tacked onto their ticket.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                You never touch that money, and you never field a single question about it. Customers see exactly where it goes — into the platform, not your margin.
              </p>
              <ul className="space-y-3">
                {customerFeeDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#14b8a6" }} />
                    <span className="text-sm" style={{ color: "#475569" }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div>
              <div className="rounded-2xl p-6" style={{ background: "#0a1628", border: "1px solid #1e3a70" }}>
                <div className="font-bold text-white mb-5 text-sm">Order checkout — what customers see</div>
                <div className="rounded-xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-semibold text-white mb-4">Order from Rosario&apos;s Kitchen</div>
                  {[
                    { label: "Truffle Fries", price: "$11.50" },
                    { label: "Chicken Milanese", price: "$22.00" },
                    { label: "House Salad", price: "$9.00" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>{item.label}</span>
                      <span className="text-xs font-semibold text-white">{item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 mt-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-xs" style={{ color: "#94a3b8" }}>Subtotal</span>
                    <span className="text-xs font-semibold text-white">$42.50</span>
                  </div>
                  <div className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>N4Cluster Neighborhood Fee</span>
                      <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>Platform infrastructure — not a restaurant surcharge</div>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "#f59e0b" }}>$0.99</span>
                  </div>
                  <div className="flex justify-between py-3 mt-1">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-sm font-bold text-white">$43.49</span>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#14b8a6" }}>What the restaurant keeps</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">$42.00</span>
                    <span className="text-xs" style={{ color: "#64748b" }}>($42.50 minus $0.50 merchant fee; $99/mo platform fee billed separately)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-20" style={{ background: "#ffffff" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0f6ff", color: "#2563eb" }}>
              What&apos;s included
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#040d1c" }}>
              The entire platform. No tiers. No upgrades.
            </h2>
            <p className="text-base" style={{ color: "#475569" }}>
              $99/month plus $0.50 per order is not a stripped-down entry price with upsells behind it. It covers the full platform — everything N4Cluster runs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "White-label ordering site", sub: "Fully branded under your domain. Menu, categories, imagery, pricing — yours to control." },
              { title: "Neighborhood Hub presence", sub: "Your restaurant listed and discoverable in the local Hub — sorted by distance, not commission." },
              { title: "N4Logic AI Growth Autopilot", sub: "Demand monitoring, campaign activation, and risk protection — running in the background." },
              { title: "N4Sync delivery coordination", sub: "Driver dispatch, SLA tracking, and exception handling — on our risk, not yours." },
              { title: "POS integration and sync", sub: "Real-time menu and availability sync from your POS. No manual updates. No extra tablets." },
              { title: "Merchant dashboard", sub: "Order history, customer data, campaign controls, demand signals, and SLA reporting in one place." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3" style={{ background: "#f0f6ff" }}>
                  <Check size={12} style={{ color: "#2563eb" }} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-bold mb-1.5" style={{ color: "#040d1c" }}>{item.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Six protections */}
      <section className="py-16 md:py-24" style={{ background: "#040d1c" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(20,184,166,0.15)", color: "#14b8a6" }}>
              Pricing protections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Six things the pricing model will never do.
            </h2>
            <p className="text-base" style={{ color: "#94a3b8" }}>
              These are contractual commitments — not aspirational language. They exist to prevent the pricing model from drifting toward the marketplace pattern over time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {protections.map((p) => (
              <div key={p.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(20,184,166,0.15)" }}>
                  <Check size={10} style={{ color: "#14b8a6" }} strokeWidth={2.5} />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{p.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Price lock */}
      <section className="py-16 md:py-20" style={{ background: "#f8fafc" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "#fffbeb", color: "#f59e0b" }}>
                Price lock — optional
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "#040d1c" }}>
                Lock your rate. Sleep better for 1 or 2 years.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#475569" }}>
                Pricing gets reviewed once a year by default. Want more certainty for your own planning? Lock the merchant fee — $0.50/order and the $99/month platform fee — for 1 or 2 years. You won't get a discount for locking in; the price is already as flat as it gets. This just buys you predictability.
              </p>
              <div className="space-y-3 mb-8">
                {priceLockDetails.map((item) => (
                  <div key={item.term} className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "#040d1c" }}>{item.term}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{item.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Adjustment formula */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0f6ff", color: "#2563eb" }}>
                Adjustment formula
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "#040d1c" }}>
                If we ever adjust pricing, here's the exact math.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                Once any lock period ends, we can adjust annually — but only inside a formula we don't get to bend. No discretionary increase. The cap is mathematical, not a mood.
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
                {adjustmentFormula.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 px-5 py-4"
                    style={{ borderBottom: i < adjustmentFormula.length - 1 ? "1px solid #f1f5f9" : "none" }}
                  >
                    <div className="text-xs font-semibold w-36 flex-shrink-0" style={{ color: "#64748b" }}>{row.label}</div>
                    <div className="text-xs font-bold" style={{ color: "#040d1c" }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 mt-4" style={{ background: "#f0f6ff", border: "1px solid rgba(37,99,235,0.15)" }}>
                <div className="text-xs leading-relaxed" style={{ color: "#475569" }}>
                  Any adjustment that falls outside this formula — or constitutes a material change to the pricing model — triggers the full 180-day notice requirement and activates merchant exit rights.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ background: "#ffffff" }}>
        <Container size="md">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#040d1c" }}>Pricing questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is there a setup fee?",
                a: "None. You pay a flat $99/month platform fee plus $0.50 per order — that's it. The $99/month never moves. Have a slow month? Your order volume drops, so your per-order cost drops with it — but the platform fee stays put.",
              },
              {
                q: "Does the fee change if my order volume increases?",
                a: "No. $0.50 per order and $99/month stay flat no matter how busy you get. No volume tiers, no threshold penalties, no rate creep as you grow. Sell more, and your total cost goes up because you're doing more orders — never because the rate did.",
              },
              {
                q: "What if I want to offer delivery — does that cost extra?",
                a: "N4Sync delivery coordination is already included. Driver management, dispatch, and SLA tracking — covered. Paying the actual courier is a separate logistics cost, same as it would be anywhere, but the coordination behind it costs you nothing extra.",
              },
              {
                q: "Is the $0.99 customer fee mandatory?",
                a: "By default, yes — the $0.99 Neighborhood Fee shows up at checkout, and we handle it end to end. If you'd rather absorb it or fold it into your menu pricing, you can opt out of the customer-facing display. Your call.",
              },
              {
                q: "How does the price lock work if I want to cancel?",
                a: "The price lock only fixes your rate — it doesn't chain you to a minimum term unless a separate agreement says otherwise. Want out during a lock period? The terms depend on your specific agreement, and we'll walk you through them honestly before you ever lock in.",
              },
              {
                q: "What counts as a material change that triggers the 180-day notice and exit right?",
                a: "Anything that touches the core structure: moving to commission, switching the fee basis from flat/per-order to revenue-based, raising the $99/month platform fee outside the CPI formula, or changing who the customer fee is attributed to. Adjustments inside the CPI formula with 90-day notice don't count — those are business as usual.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div className="text-sm font-bold mb-3" style={{ color: "#040d1c" }}>{faq.q}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#475569" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Summary strip */}
      <section className="py-12" style={{ background: "#040d1c" }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$99/mo", label: "Flat platform fee — merchant" },
              { value: "$0.50", label: "Per order — merchant fee" },
              { value: "$0.99", label: "Neighborhood fee — customer-facing, N4Cluster's" },
              { value: "0%", label: "Commission on revenue. Ever." },
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
        heading="Ready to run the numbers for your restaurant?"
        subheading="Tell us your current order volume and we'll show you exactly what N4Cluster would cost — and what you'd keep versus your current setup."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "/how-it-works" }}
        dark={false}
      />
    </>
  );
}
