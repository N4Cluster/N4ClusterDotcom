"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { calculateRoi } from "@/lib/roi";
import {
  PROCESSING_FLAT,
  PROCESSING_RATE,
  priceDisplay,
} from "@/content/site/pricing";
import { demoCta } from "@/content/company";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const usd0 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

/** Formats a signed amount so a higher cost reads as a higher cost. */
const signedUsd0 = (n: number) => (n < 0 ? `−${usd0(Math.abs(n))}` : usd0(n));

const processingAssumption = `${(PROCESSING_RATE * 100).toFixed(1)}% + ${usd(
  PROCESSING_FLAT
)}`;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  accent: string;
  format: (v: number) => string;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
  describedBy?: string;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  accent,
  format,
  minLabel,
  maxLabel,
  onChange,
  describedBy,
}: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3 gap-4">
        <label className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
          {label}
        </label>
        <span className="text-lg font-bold tabular-nums" style={{ color: accent }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-describedby={describedBy}
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ accentColor: accent, background: "var(--color-line)" }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-xs" style={{ color: "var(--color-muted)" }}>
          {minLabel}
        </span>
        <span className="text-xs" style={{ color: "var(--color-muted)" }}>
          {maxLabel}
        </span>
      </div>
    </div>
  );
}

export function ROICalculator() {
  const [orders, setOrders] = useState(300);
  const [avgTicket, setAvgTicket] = useState(28);
  const [commission, setCommission] = useState(25);

  const results = useMemo(
    () => calculateRoi({ orders, avgTicket, commissionPct: commission }),
    [orders, avgTicket, commission]
  );

  const lower = results.isLower;

  return (
    <>
      {/* Calculator */}
      <section className="py-16 md:py-24" style={{ background: "#fff" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Inputs */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "var(--color-cream-2)", border: "1px solid var(--color-line)" }}>
              <span
                className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
                style={{ background: "var(--color-green-tint)", color: "var(--color-green)" }}
              >
                Your numbers
              </span>
              <div className="space-y-8">
                <div>
                  <Slider
                    label="Orders you expect to receive directly per month"
                    value={orders}
                    min={0}
                    max={2000}
                    step={10}
                    accent="var(--color-ink)"
                    format={(v) => v.toLocaleString("en-US")}
                    minLabel="0"
                    maxLabel="2,000"
                    onChange={setOrders}
                    describedBy="orders-help"
                  />
                  <p id="orders-help" className="text-xs mt-2" style={{ color: "var(--color-ink-3)" }}>
                    Direct orders through your own branded site — not your total
                    marketplace volume. Only orders you expect to arrive through
                    the direct channel belong here.
                  </p>
                </div>
                <Slider
                  label="Average order value (menu subtotal)"
                  value={avgTicket}
                  min={10}
                  max={60}
                  step={1}
                  accent="var(--color-ink)"
                  format={(v) => usd0(v)}
                  minLabel="$10"
                  maxLabel="$60"
                  onChange={setAvgTicket}
                />
                <Slider
                  label="Commission rate you pay today"
                  value={commission}
                  min={0}
                  max={35}
                  step={1}
                  accent="var(--color-red)"
                  format={(v) => `${v}%`}
                  minLabel="0%"
                  maxLabel="35%"
                  onChange={setCommission}
                />
              </div>
              <p className="text-xs leading-relaxed mt-8" style={{ color: "var(--color-ink-3)" }}>
                Use your own commission rate rather than an assumed market figure.
                Everything below updates instantly — no sign-up, no email required.
              </p>
            </div>

            {/* Results */}
            <div className="space-y-5">
              {/* Comparison cost */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(184,55,31,0.06)", border: "1px solid rgba(184,55,31,0.25)" }}>
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-red)" }}>
                    Marketplace commission, at your rate
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap" style={{ background: "rgba(184,55,31,0.12)", color: "var(--color-red)" }}>
                    {commission}% commission
                  </span>
                </div>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-red)" }}>
                  {usd(results.comparisonMonthlyFees)}
                  <span className="text-sm font-medium ml-1">/ mo</span>
                </div>
                <div className="text-xs mt-2" style={{ color: "var(--color-red)" }}>
                  {orders.toLocaleString("en-US")} orders × {usd0(avgTicket)} subtotal × {commission}%
                </div>
              </div>

              {/* N4Cluster fees */}
              <div className="rounded-2xl p-6" style={{ background: "var(--color-green-tint)", border: "1px solid var(--color-line)" }}>
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-green-deep)" }}>
                    N4Cluster fees, same volume
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap" style={{ background: "var(--color-green-tint)", color: "var(--color-green)" }}>
                    Fixed price
                  </span>
                </div>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-green)" }}>
                  {usd(results.n4MonthlyFees)}
                  <span className="text-sm font-medium ml-1">/ mo</span>
                </div>
                <div className="text-xs mt-2" style={{ color: "var(--color-green-deep)" }}>
                  Flat monthly fee, a fixed fee per order, and an assumed card
                  processing charge — no commission, ever.
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-line)" }}>
                <div className="px-5 py-3" style={{ background: "var(--color-cream-2)", borderBottom: "1px solid var(--color-line)" }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-ink-3)" }}>
                    N4Cluster fee breakdown
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between px-5 py-3.5 gap-3">
                    <span className="text-sm" style={{ color: "var(--color-ink-3)" }}>
                      N4Cluster fixed fees (monthly + per order)
                    </span>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--color-ink)" }}>
                      {usd(results.monthlyFee + results.perOrderFees)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5 gap-3" style={{ borderTop: "1px solid var(--color-line)" }}>
                    <span className="text-sm" style={{ color: "var(--color-ink-3)" }}>
                      Assumed card processing ({processingAssumption})
                    </span>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--color-ink)" }}>
                      {usd(results.processingFees)}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between px-5 py-3.5 gap-3"
                    style={{ borderTop: "1px solid var(--color-line)", background: "var(--color-cream-2)" }}
                  >
                    <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                      N4Cluster fees per order
                    </span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: "var(--color-green)" }}>
                      {results.feePerOrder === null ? "—" : usd(results.feePerOrder)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Estimated difference */}
      <section className="on-dark bg-ink py-16 md:py-20 relative overflow-hidden">
        <Container size="lg" className="relative z-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--color-gold)" }}>
              Estimated monthly fee difference
            </p>
            <div
              className="text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums leading-none"
              style={{ color: lower ? "var(--color-gold)" : "#ffffff" }}
            >
              {signedUsd0(results.monthlyFeeDifference)}
            </div>
            <div className="text-lg font-medium mt-3 text-white max-w-xl mx-auto text-balance">
              {lower
                ? "lower in fees per month, on the inputs above"
                : "higher in fees per month, on the inputs above"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <div className="text-3xl font-bold tabular-nums text-white">
                  {signedUsd0(results.monthlyFeeDifference)}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Per month
                </div>
              </div>
                            <div className="rounded-2xl p-6" style={{ background: "rgba(244,179,62,0.15)", border: "1px solid rgba(244,179,62,0.5)" }}>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-gold)" }}>
                  {signedUsd0(results.annualFeeDifference)}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--color-gold)" }}>
                  Over twelve months
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <div className="text-3xl font-bold tabular-nums text-white">
                  {results.differencePct === null
                    ? "—"
                    : `${Math.round(results.differencePct)}%`}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {results.differencePct === null
                    ? "No commission baseline to compare"
                    : "Difference vs commission fees"}
                </div>
              </div>
            </div>

            {/* Assumptions sit with the number, not in footer small print. */}
            <div className="mt-10 max-w-3xl mx-auto rounded-2xl p-6 text-left" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <h3 className="text-sm font-bold text-white mb-3">
                What this estimate assumes
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <li>
                  It compares <strong className="text-white">fees</strong>, not
                  profit. Food, labour, occupancy and other costs are unchanged by
                  it, and an amount retained after fees is not profit.
                </li>
                <li>
                  Card processing is assumed at {processingAssumption} of the menu
                  subtotal. Your processor may charge a different rate, and may
                  apply it to a different amount including taxes, tips or fees.
                </li>
                <li>
                  Delivery charges, discounts, advertising and refunds are excluded,
                  and they differ between channels. Comparing marketplace delivery
                  with direct pickup is not a like-for-like delivery comparison.
                </li>
                <li>
                  The Neighbourhood fee diners pay is not included. Diners
                  normally pay it; if your restaurant chooses to absorb it, add it
                  to your own costs.
                </li>
                <li>
                  It assumes the volume above actually arrives through your direct
                  channel. Moving orders off a marketplace is not automatic.
                </li>
                <li>
                  Figures reflect the paid service after the {priceDisplay.trial};
                  no trial discount is modelled.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: "var(--color-cream-2)" }}>
        <Container size="md" className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance" style={{ color: "var(--color-ink)" }}>
            Want to check these numbers against your own?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "var(--color-ink-3)" }}>
            Bring your actual order volume and commission rate, and we&apos;ll walk
            through what the fees would look like for your restaurant — and what
            setup would involve.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={demoCta.href}
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 px-8 py-4 text-base bg-gold text-ink hover:brightness-95 shadow-sm hover:shadow-md"
            >
              {demoCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
