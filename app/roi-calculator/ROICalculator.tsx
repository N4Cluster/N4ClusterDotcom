"use client";

import { useMemo, useState } from "react";
import { ArrowRight, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const PLATFORM_FEE = 0.99;
const PROCESSING_RATE = 0.029;
const PROCESSING_FLAT = 0.3;

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
}: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-sm font-semibold" style={{ color: "#040d1c" }}>
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
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ accentColor: accent, background: "#e2e8f0" }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-xs" style={{ color: "#94a3b8" }}>
          {minLabel}
        </span>
        <span className="text-xs" style={{ color: "#94a3b8" }}>
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

  const results = useMemo(() => {
    const marketplaceCost = orders * avgTicket * (commission / 100);

    const platformFee = orders * PLATFORM_FEE;
    const processing = orders * (avgTicket * PROCESSING_RATE + PROCESSING_FLAT);
    const n4Cost = platformFee + processing;

    const monthlySavings = marketplaceCost - n4Cost;
    const annualSavings = monthlySavings * 12;
    const savingsPct = marketplaceCost > 0 ? (monthlySavings / marketplaceCost) * 100 : 0;
    const effectivePerOrder = orders > 0 ? n4Cost / orders : 0;

    return {
      marketplaceCost,
      platformFee,
      processing,
      n4Cost,
      monthlySavings,
      annualSavings,
      savingsPct,
      effectivePerOrder,
    };
  }, [orders, avgTicket, commission]);

  const saving = results.monthlySavings > 0;

  return (
    <>
      {/* Calculator */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Inputs */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <span
                className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
                style={{ background: "#f0f6ff", color: "#2563eb" }}
              >
                Your numbers
              </span>
              <div className="space-y-8">
                <Slider
                  label="Delivery orders per month"
                  value={orders}
                  min={50}
                  max={2000}
                  step={10}
                  accent="#2563eb"
                  format={(v) => v.toLocaleString("en-US")}
                  minLabel="50"
                  maxLabel="2,000"
                  onChange={setOrders}
                />
                <Slider
                  label="Average order value"
                  value={avgTicket}
                  min={10}
                  max={60}
                  step={1}
                  accent="#2563eb"
                  format={(v) => usd0(v)}
                  minLabel="$10"
                  maxLabel="$60"
                  onChange={setAvgTicket}
                />
                <Slider
                  label="Current commission rate"
                  value={commission}
                  min={10}
                  max={35}
                  step={1}
                  accent="#dc2626"
                  format={(v) => `${v}%`}
                  minLabel="10%"
                  maxLabel="35%"
                  onChange={setCommission}
                />
              </div>
              <p className="text-xs leading-relaxed mt-8" style={{ color: "#64748b" }}>
                Drag the sliders to match your restaurant. Everything below updates instantly — no sign-up, no
                email required.
              </p>
            </div>

            {/* Results */}
            <div className="space-y-5">
              {/* Marketplace cost */}
              <div className="rounded-2xl p-6" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "#991b1b" }}>
                    Third-party marketplace cost
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#fee2e2", color: "#dc2626" }}>
                    {commission}% commission
                  </span>
                </div>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "#dc2626" }}>
                  {usd(results.marketplaceCost)}
                  <span className="text-sm font-medium ml-1" style={{ color: "#b91c1c" }}>
                    / mo
                  </span>
                </div>
                <div className="text-xs mt-2" style={{ color: "#b91c1c" }}>
                  {orders.toLocaleString("en-US")} orders × {usd0(avgTicket)} avg × {commission}% taken off the top
                </div>
              </div>

              {/* N4Cluster cost */}
              <div className="rounded-2xl p-6" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "#166534" }}>
                    N4Cluster cost
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    $0.99 flat / order
                  </span>
                </div>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "#16a34a" }}>
                  {usd(results.n4Cost)}
                  <span className="text-sm font-medium ml-1" style={{ color: "#15803d" }}>
                    / mo
                  </span>
                </div>
                <div className="text-xs mt-2" style={{ color: "#15803d" }}>
                  Flat platform fee plus standard payment processing — no percentage of revenue
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
                <div className="px-5 py-3" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748b" }}>
                    N4Cluster cost breakdown
                  </span>
                </div>
                <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm" style={{ color: "#475569" }}>
                      Platform fee ($0.99 × {orders.toLocaleString("en-US")} orders)
                    </span>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: "#040d1c" }}>
                      {usd(results.platformFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: "1px solid #f1f5f9" }}>
                    <span className="text-sm" style={{ color: "#475569" }}>
                      Standard payment processing (~2.9% + $0.30)
                    </span>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: "#040d1c" }}>
                      {usd(results.processing)}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between px-5 py-3.5"
                    style={{ borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}
                  >
                    <span className="text-sm font-semibold" style={{ color: "#040d1c" }}>
                      Effective cost per order
                    </span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: "#2563eb" }}>
                      {usd(results.effectivePerOrder)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Savings banner */}
      <section className="gradient-hero py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cobalt-600/10 rounded-full blur-3xl" />
        </div>
        <Container size="lg" className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-5">
              <TrendingDown size={18} style={{ color: "#f97316" }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#f97316" }}>
                {saving ? "Your estimated savings" : "Your estimated difference"}
              </span>
            </div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums leading-none" style={{ color: "#f97316" }}>
              {usd0(Math.abs(results.monthlySavings))}
            </div>
            <div className="text-lg font-medium mt-3 text-white">
              {saving ? "kept in your pocket every month" : "difference per month at these numbers"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-3xl font-bold tabular-nums text-white">{usd0(Math.abs(results.monthlySavings))}</div>
                <div className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                  Monthly savings
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.35)" }}>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "#f97316" }}>
                  {usd0(Math.abs(results.annualSavings))}
                </div>
                <div className="text-xs mt-1" style={{ color: "#fdba74" }}>
                  Every year
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-3xl font-bold tabular-nums text-white">
                  {Math.round(Math.abs(results.savingsPct))}%
                </div>
                <div className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                  {saving ? "Lower than marketplace" : "Difference vs marketplace"}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: "#f8fafc" }}>
        <Container size="md" className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance" style={{ color: "#040d1c" }}>
            Ready to stop paying commissions?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
            These are your real numbers. Let&apos;s walk through what switching to a flat $0.99 per order would mean
            for your restaurant — with no percentage skimmed off every ticket.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-8 py-4 text-base bg-cobalt-500 text-white hover:bg-cobalt-600 shadow-sm hover:shadow-md"
            >
              Talk to us about your numbers
              <ArrowRight size={18} />
            </Link>
          </div>
          <p className="mt-8 text-sm" style={{ color: "#94a3b8" }}>
            contact@n4cluster.com | n4cluster.com/partner
          </p>
        </Container>
      </section>
    </>
  );
}
