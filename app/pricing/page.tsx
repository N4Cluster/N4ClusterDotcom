import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — $0.10 Per Order. No Commission. Ever.",
  description:
    "N4Cluster charges $0.10 flat per order to the restaurant. No commission. No monthly minimum. No percentage of revenue. The math is simple by design.",
};

const commissionComparison = [
  { platform: "DoorDash", rate: "30%", on40: "$12.00", on80: "$24.00", on150: "$45.00", color: "#ef4444" },
  { platform: "Uber Eats", rate: "27%", on40: "$10.80", on80: "$21.60", on150: "$40.50", color: "#f97316" },
  { platform: "Grubhub", rate: "25%", on40: "$10.00", on80: "$20.00", on150: "$37.50", color: "#eab308" },
  { platform: "N4Cluster", rate: "0%", on40: "$0.10", on80: "$0.10", on150: "$0.10", color: "#14b8a6", bold: true },
];

const protections = [
  {
    title: "No monthly minimums",
    body: "You pay $0.10 per order processed. If no orders come through, you pay nothing. There is no base fee, no activation charge, no idle platform fee.",
  },
  {
    title: "No commission on revenue",
    body: "Every dollar of revenue on a $200 order stays with you — minus $0.10. The fee is fixed to the transaction, not to the ticket size.",
  },
  {
    title: "No pricing parity clauses",
    body: "We will never require you to match or mirror pricing from third-party platforms. Your direct channel prices are yours to set.",
  },
  {
    title: "No bundled service charges",
    body: "N4Sync, N4Logic, and the Neighborhood Hub are included. There are no add-on modules, tiered feature unlocks, or upgrade tiers.",
  },
  {
    title: "No hidden renewal increases",
    body: "Pricing cannot change without 90–180 days of written advance notice. Increases are capped by formula — not at discretion.",
  },
  {
    title: "Right to exit",
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
  { term: "1-year lock", body: "Merchant fee fixed at $0.10/order for 12 months. No adjustments regardless of volume or platform changes." },
  { term: "2-year lock", body: "Merchant fee fixed at $0.10/order for 24 months. Provides longer-horizon cost certainty for planning and negotiations." },
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
        heading="$0.10 per order. No commission. Ever."
        subheading="We built the fee structure around one principle: the platform should earn by making direct ordering work, not by taking a cut of your revenue. The math is simple by design."
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
                One flat fee.<br />Every order. No exceptions.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                You pay <strong style={{ color: "#040d1c" }}>$0.10 per order</strong> processed through N4Cluster — your branded ordering site, the Neighborhood Hub, or any integrated channel. The fee is the same whether the order is $15 or $150. It does not scale with your revenue. It does not fluctuate with volume.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#475569" }}>
                No monthly platform fee. No setup charge. No percentage skimmed from every ticket. What you take from the customer is what you keep — minus ten cents.
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl px-8 py-6 text-center" style={{ background: "#f0fdfb", border: "1.5px solid #14b8a620" }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "#040d1c" }}>$0.10</div>
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
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>After platform fees. Commission rates are typical published rates.</div>
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
                    DoorDash and Uber Eats fees shown are <em>platform commission only</em> — additional payment processing, listing, and promotional fees often apply separately.
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
                The $0.50 neighborhood fee is ours — not yours.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#475569" }}>
                Customers who order through N4Cluster channels see a <strong style={{ color: "#040d1c" }}>$0.50 N4Cluster Neighborhood Fee</strong> at checkout. This is a platform infrastructure fee collected by N4Cluster — it is <em>not</em> a surcharge added by your restaurant.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                You never see this money. You never handle customer questions about it. We make the fee attribution clear so customers know it goes to the neighborhood platform — not into restaurant margin.
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
                    <span className="text-xs font-semibold" style={{ color: "#f59e0b" }}>$0.50</span>
                  </div>
                  <div className="flex justify-between py-3 mt-1">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-sm font-bold text-white">$43.00</span>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: "#14b8a6" }}>What the restaurant keeps</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">$42.40</span>
                    <span className="text-xs" style={{ color: "#64748b" }}>($42.50 minus $0.10 merchant fee)</span>
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
              $0.10 per order is not a stripped-down entry price with upsells behind it. It covers the full platform — everything N4Cluster runs.
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
                Lock in $0.10 for 1 or 2 years.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#475569" }}>
                By default, pricing is reviewed annually. If you want cost certainty for planning or multi-year commitments, you can lock the merchant fee at $0.10 for 1 or 2 years. No discounts for locking — the price is already flat. This is a predictability tool.
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
                If pricing ever adjusts, here is the exact formula.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
                After any lock period, annual adjustments are permitted — but only within a defined formula. There is no discretionary increase. The cap is mathematical.
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
                q: "Is there a setup fee or monthly minimum?",
                a: "No. There is no setup charge, no monthly platform fee, and no order minimum. You pay $0.10 per order processed. If you have a slow month and orders drop, your cost drops proportionally.",
              },
              {
                q: "Does the fee change if my order volume increases?",
                a: "No. $0.10 is flat per order regardless of volume. There are no volume tiers, no threshold penalties, and no performance-based rate adjustments. Higher volume means a higher absolute fee — but never a higher per-order rate.",
              },
              {
                q: "What if I want to offer delivery — does that cost extra?",
                a: "N4Sync delivery coordination is included. Driver management, dispatch, and SLA tracking are covered. Third-party driver costs (actual courier compensation) are a separate logistics cost — but the coordination layer is part of the platform at no additional fee.",
              },
              {
                q: "Is the $0.50 customer fee mandatory?",
                a: "By default, the $0.50 Neighborhood Fee is added at checkout and handled entirely by N4Cluster. Restaurants who prefer to absorb it or build it into menu pricing can opt out of customer-facing display — this is a merchant configuration option.",
              },
              {
                q: "How does the price lock work if I want to cancel?",
                a: "The price lock fixes the merchant fee rate during the lock period — it does not lock you into a minimum contract term unless you have a separate engagement agreement. If you exit during a lock period, the terms depend on your specific agreement. We'll discuss this transparently before you lock.",
              },
              {
                q: "What counts as a material change that triggers the 180-day notice and exit right?",
                a: "Changes to the core pricing structure — moving to commission, adding a monthly minimum, changing the fee basis from per-order to revenue-based, or adjusting the customer fee attribution — would all qualify. Adjustments within the CPI formula with 90-day notice do not.",
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
              { value: "$0.10", label: "Per order — merchant fee" },
              { value: "$0.50", label: "Neighborhood fee — customer-facing, N4Cluster's" },
              { value: "0%", label: "Commission on revenue. Ever." },
              { value: "90d+", label: "Notice required for any increase" },
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
