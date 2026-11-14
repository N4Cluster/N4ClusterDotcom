import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import { priceDisplay, protections } from "@/content/site/pricing";

export const metadata: Metadata = {
  title: "Pricing — $99/Month + $0.50 Per Order. No Commission. Ever.",
  description:
    "N4Cluster charges the restaurant a flat $99/month platform fee plus $0.50 per order. No commission. No percentage of revenue. The math is simple by design.",
};

const commissionComparison = [
  { platform: "High-commission marketplace", rate: "30%", on40: "$12.00", on80: "$24.00", on150: "$45.00", color: "var(--color-red)" },
  { platform: "Mid-commission marketplace", rate: "27%", on40: "$10.80", on80: "$21.60", on150: "$40.50", color: "var(--color-red)" },
  { platform: "Lower-commission marketplace", rate: "25%", on40: "$10.00", on80: "$20.00", on150: "$37.50", color: "var(--color-ink-3)" },
  { platform: "N4Cluster", rate: "0%", on40: "$0.50", on80: "$0.50", on150: "$0.50", color: "var(--color-green)", bold: true },
];

const customerFeeDetails = [
  "Shown at checkout as the Neighborhood fee — not a restaurant surcharge",
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
        subheading={`We only make money when your direct ordering actually works — never by skimming your ticket. No revenue share, no fine print, no math you have to double-check at 11pm. Try it free for 30 days. ${priceDisplay.cancel} Card processing still applies.`}
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
      />

      {/* Core fee callout */}
      <section className="py-16 md:py-20" style={{ background: "#fff" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center [&>*]:min-w-0">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "var(--color-green-tint)", color: "var(--color-green)" }}>
                Merchant fee
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: "var(--color-ink)" }}>
                Two flat fees.<br />No commission. Ever.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-ink-3)" }}>
                You pay a flat <strong style={{ color: "var(--color-ink)" }}>$99 per month</strong> platform fee plus <strong style={{ color: "var(--color-ink)" }}>$0.50 per order</strong> processed through N4Cluster — your branded ordering site or any integrated channel. Neither fee scales with your revenue. Neither fluctuates with ticket size.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-ink-3)" }}>
                No setup charge. No percentage skimmed from every ticket. What you take from the customer is what you keep — minus fifty cents per order, plus one flat $99 platform fee each month.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="rounded-2xl px-8 py-6 text-center" style={{ background: "var(--color-green-tint)", border: "1.5px solid var(--color-line)" }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "var(--color-ink)" }}>$99<span className="text-lg">/mo</span></div>
                  <div className="text-xs font-semibold" style={{ color: "var(--color-green)" }}>Platform fee — merchant</div>
                </div>
                <div className="rounded-2xl px-8 py-6 text-center" style={{ background: "var(--color-green-tint)", border: "1.5px solid var(--color-line)" }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "var(--color-ink)" }}>$0.50</div>
                  <div className="text-xs font-semibold" style={{ color: "var(--color-green)" }}>Per order — merchant fee</div>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  The entire platform — your own ordering site, rewards, growth tools and delivery coordination — is included at this price. Card processing (2.9% + 30¢) is separate.
                </div>
              </div>
            </div>

            {/* Commission comparison table */}
            <div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-line)" }}>
                <div className="px-5 py-4" style={{ background: "var(--color-cream-2)", borderBottom: "1px solid var(--color-line)" }}>
                  <div className="text-sm font-bold" style={{ color: "var(--color-ink)" }}>Platform fee taken on a $40 / $80 / $150 order</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>Per-order platform fees only — card processing excluded on both sides, as is N4Cluster&apos;s flat $99/month platform fee. Commission rates are typical published rates and vary by provider.</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--color-line)", background: "var(--color-cream-2)" }}>
                        <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>Platform</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>Rate</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>$40 order</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>$80 order</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>$150 order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionComparison.map((row, i) => (
                        <tr
                          key={row.platform}
                          style={{
                            borderBottom: i < commissionComparison.length - 1 ? "1px solid var(--color-line)" : "none",
                            background: row.bold ? "var(--color-green-tint)" : "white",
                          }}
                        >
                          <td className="px-5 py-3.5">
                            <span className="font-semibold text-xs" style={{ color: row.bold ? "var(--color-ink)" : "var(--color-ink-3)" }}>
                              {row.platform}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-bold" style={{ color: row.color }}>{row.rate}</span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "var(--color-green)" : "var(--color-red)" }}>
                              {row.on40}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "var(--color-green)" : "var(--color-red)" }}>
                              {row.on80}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="text-xs font-semibold" style={{ color: row.bold ? "var(--color-green)" : "var(--color-red)" }}>
                              {row.on150}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3.5" style={{ background: "var(--color-green-tint)", borderTop: "1px solid var(--color-line)" }}>
                  <div className="text-xs" style={{ color: "var(--color-muted)" }}>
                    Marketplace fees shown are <em>platform commission only</em> — additional payment processing, listing, and promotional fees often apply separately.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer fee */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-cream-2)" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className={""}>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(244,179,62,0.25)", color: "var(--color-ink)" }}>
                Neighborhood fee
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "var(--color-ink)" }}>
                That $0.99 checkout fee? Ours to own, not yours to defend.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-ink-3)" }}>
                Every customer ordering through an N4Cluster channel sees a <strong style={{ color: "var(--color-ink)" }}>$0.99 Neighborhood fee</strong> at checkout, described as a fee that supports local operations in their neighborhood. N4Cluster collects it — it is <em>not</em> a surcharge you tacked onto their ticket.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-ink-3)" }}>
                You never touch that money, and it is labelled as our fee rather than a surcharge on your menu prices. If a customer does ask you about it, our support team can help you answer.
              </p>
              <ul className="space-y-3">
                {customerFeeDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-green)" }} />
                    <span className="text-sm" style={{ color: "var(--color-ink-3)" }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div>
              <div className="on-dark rounded-[22px] bg-ink p-6">
                <div className="font-bold text-white mb-5 text-sm">Order checkout — what customers see</div>
                <div className="rounded-xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-semibold text-white mb-4">Order from Rosario&apos;s Kitchen</div>
                  {[
                    { label: "Truffle Fries", price: "$9.00" },
                    { label: "Chicken Milanese", price: "$22.00" },
                    { label: "House Salad", price: "$9.00" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>{item.label}</span>
                      <span className="text-xs font-semibold text-white">{item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 mt-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Subtotal</span>
                    <span className="text-xs font-semibold text-white">$40.00</span>
                  </div>
                  <div className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Neighborhood fee</span>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Platform infrastructure — not a restaurant surcharge</div>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>$0.99</span>
                  </div>
                  <div className="flex justify-between py-3 mt-1">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-sm font-bold text-white">$40.99</span>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(244,179,62,0.1)", border: "1px solid rgba(244,179,62,0.3)" }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-gold)" }}>What the restaurant keeps</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">$38.04</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>($40.00 minus $0.50 merchant fee and $1.46 card processing; $99/mo platform fee billed separately)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-20" style={{ background: "#fff" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "var(--color-green-tint)", color: "var(--color-green)" }}>
              What&apos;s included
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--color-ink)" }}>
              The entire platform. No tiers. No upgrades.
            </h2>
            <p className="text-base" style={{ color: "var(--color-ink-3)" }}>
              $99/month plus $0.50 per order is not a stripped-down entry price with upsells behind it. It covers the full platform — everything N4Cluster runs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "White-label ordering site", sub: "Fully branded under your domain. Menu, categories, imagery, pricing — yours to control." },
              { title: "Win-back campaigns", sub: "Campaigns that bring lapsed regulars back, sent only with your OK." },
              { title: "Delivery coordination", sub: "Dispatch through Uber Direct, delivery-time tracking, and chasing late orders — with risk protection." },
              { title: "Menu setup", sub: "We set up your menu for you. Specials, sold-out items and hours change from your merchant dashboard." },
              { title: "Merchant dashboard", sub: "Order history, customer data and campaign controls in one place." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-5" style={{ background: "var(--color-cream-2)", border: "1px solid var(--color-line)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3" style={{ background: "var(--color-green-tint)" }}>
                  <Check size={12} style={{ color: "var(--color-green)" }} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>{item.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The 4 N's */}
      <section id="four-ns" className="on-dark bg-ink py-16 md:py-24 scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(244,179,62,0.2)", color: "var(--color-gold)" }}>
              Pricing protections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              The 4 N&apos;s of N4Cluster
            </h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
              Four promises written into your agreement, so our pricing never drifts toward the marketplace model.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {protections.map((p) => (
              <div key={p.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div aria-hidden="true" className="font-display mb-3 text-4xl font-extrabold leading-none" style={{ color: "var(--color-gold)" }}>N</div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Price lock */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-cream-2)" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(244,179,62,0.25)", color: "var(--color-ink)" }}>
                Price lock — optional
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "var(--color-ink)" }}>
                Lock your rate. Sleep better for 1 or 2 years.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-ink-3)" }}>
                Pricing gets reviewed once a year by default. Want more certainty for your own planning? Lock the merchant fee — $0.50/order and the $99/month platform fee — for 1 or 2 years. You won&apos;t get a discount for locking in; the price is already as flat as it gets. This just buys you predictability — a lock fixes the rate, not you. A lock fixes the rate; it doesn&apos;t change how you cancel.
              </p>
              <div className="space-y-3 mb-8">
                {priceLockDetails.map((item) => (
                  <div key={item.term} className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid var(--color-line)" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "var(--color-ink)" }}>{item.term}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{item.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Adjustment formula */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4" style={{ background: "var(--color-green-tint)", color: "var(--color-green)" }}>
                Adjustment formula
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: "var(--color-ink)" }}>
                If we ever adjust pricing, here&apos;s the exact math.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-ink-3)" }}>
                Once any lock period ends, pricing can be adjusted annually within the capped formula set out in your merchant agreement rather than at our discretion. The agreement is what governs it — ask us for the current terms before you sign.
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-line)" }}>
                {adjustmentFormula.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 px-5 py-4"
                    style={{ borderBottom: i < adjustmentFormula.length - 1 ? "1px solid var(--color-line)" : "none" }}
                  >
                    <div className="text-xs font-semibold w-36 flex-shrink-0" style={{ color: "var(--color-muted)" }}>{row.label}</div>
                    <div className="text-xs font-bold" style={{ color: "var(--color-ink)" }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 mt-4" style={{ background: "var(--color-green-tint)", border: "1px solid var(--color-line)" }}>
                <div className="text-xs leading-relaxed" style={{ color: "var(--color-ink-3)" }}>
                  Any adjustment that falls outside this formula — or constitutes a material change to the pricing model — triggers the full 180-day notice requirement and activates merchant exit rights.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ background: "#fff" }}>
        <Container size="md">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-ink)" }}>Pricing questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Can I try it free?",
                a: "Yes — 30 days free. No N4Cluster fee while you try it: no $99/month and no per-order fee during your trial. Card processing still applies to any card payment you take. We build a working demo storefront with your real menu and walk you through it before you decide anything.",
              },
              {
                q: "Is there a setup fee?",
                a: "None. You pay a flat $99/month platform fee plus $0.50 per order — that's it. The $99/month doesn't change with your volume. Have a slow month? Your order volume drops, so your per-order cost drops with it — but the platform fee stays put.",
              },
              {
                q: "Does the fee change if my order volume increases?",
                a: "No. $0.50 per order and $99/month stay flat no matter how busy you get. No volume tiers, no threshold penalties, no rate creep as you grow. Sell more, and your total cost goes up because you're doing more orders — never because the rate did.",
              },
              {
                q: "What if I want to offer delivery — does that cost extra?",
                a: "Delivery coordination is already included: we dispatch through Uber Direct and chase any order that runs late. Delivery charges depend on your address and are separate, but the coordination behind them costs you nothing extra.",
              },
              {
                q: "Is the $0.99 Neighborhood fee mandatory?",
                a: "By default, yes — the $0.99 Neighborhood fee shows up at checkout, and we handle it end to end. If you'd rather absorb it or fold it into your menu pricing, you can opt out of the customer-facing display. Your call.",
              },
              {
                q: "Can I cancel during a price lock?",
                a: "It's month-to-month: cancel with 30 days' written notice. The price lock only fixes your rate; it never chains you to us. Your customer data is yours — we'll send you a copy whenever you ask.",
              },
              {
                q: "What counts as a material change that triggers the 180-day notice and exit right?",
                a: "Anything that touches the core structure: moving to commission, switching the fee basis from flat/per-order to revenue-based, raising the $99/month platform fee outside the CPI formula, or changing who the Neighborhood fee is attributed to. Adjustments inside the CPI formula with 90-day notice don't count — those are business as usual.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6" style={{ background: "var(--color-cream-2)", border: "1px solid var(--color-line)" }}>
                <div className="text-sm font-bold mb-3" style={{ color: "var(--color-ink)" }}>{faq.q}</div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--color-ink-3)" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Summary strip */}
      <section className="on-dark bg-ink py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$99/mo", label: "Flat platform fee — merchant" },
              { value: "$0.50", label: "Per order — merchant fee" },
              { value: "$0.99", label: "Neighborhood fee — paid by the diner" },
              { value: "0%", label: "Commission on revenue. Ever." },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to run the numbers for your restaurant?"
        subheading="Tell us your current order volume and we'll show you exactly what N4Cluster would cost — and what you'd keep versus your current setup."
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
        dark={false}
      />
    </>
  );
}
