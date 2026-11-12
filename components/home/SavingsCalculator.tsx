"use client";

import Link from "next/link";
import { useState } from "react";
import { PROCESSING_FLAT, PROCESSING_RATE } from "@/content/site/pricing";
import { HOME_SAVINGS_DEFAULTS, homeSavings } from "@/lib/home-savings";

const RATES = [20, 25, 30] as const;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const display = "font-display font-extrabold";

function Slider({ id, label, value, shown, min, max, step, onChange }: {
  id: string; label: string; value: number; shown: string; min: number; max: number; step: number; onChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-semibold">{label}</label>
        <span className={`${display} text-[28px]`}>{shown}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="h-7 w-full accent-gold" />
    </div>
  );
}

export function SavingsCalculator() {
  const [orders, setOrders] = useState<number>(HOME_SAVINGS_DEFAULTS.orders);
  const [ticket, setTicket] = useState<number>(HOME_SAVINGS_DEFAULTS.ticket);
  const [rate, setRate] = useState<20 | 25 | 30>(HOME_SAVINGS_DEFAULTS.rate);
  const r = homeSavings(orders, ticket, rate);

  return (
    <section id="savings" className="on-dark bg-ink text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-14 px-6 py-[104px]">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[30px]">
          <div>
            <div className="mb-3.5 text-sm font-bold uppercase tracking-[0.08em] text-gold">Run your numbers</div>
            <h2 className={`${display} mb-3.5 text-[clamp(38px,5vw,64px)] leading-none tracking-[-0.035em]`}>What is the app really costing you?</h2>
            <p className="text-lg text-white/75">Slide to match your restaurant. Commission grows with every order. Our fee doesn&apos;t.</p>
          </div>
          <Slider id="orders" label="Online orders per month" value={orders} shown={orders.toLocaleString("en-US")} min={50} max={2000} step={10} onChange={setOrders} />
          <Slider id="ticket" label="Average order size" value={ticket} shown={`$${ticket}`} min={15} max={90} step={1} onChange={setTicket} />
          <div className="flex flex-col gap-2.5">
            <span id="rate-label" className="font-semibold">Commission your delivery app charges</span>
            <div role="group" aria-labelledby="rate-label" className="flex flex-wrap gap-2.5">
              {RATES.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={rate === p}
                  onClick={() => setRate(p)}
                  className={`min-h-[46px] min-w-20 cursor-pointer rounded-full border-[1.5px] px-[18px] text-base font-bold ${rate === p ? "border-gold bg-gold text-ink" : "border-white/40 bg-transparent text-white"}`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_420px] justify-center">
          <div className="on-light box-border flex w-full max-w-[440px] flex-col gap-5 rounded-3xl bg-white p-8 text-ink shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-4">
              <span className={`${display} text-xl`}>Your monthly receipt</span>
              <span className="text-xs font-bold text-muted">ESTIMATE</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between"><span>Marketplace commission</span><span className="font-bold text-red">{usd(r.marketplace)}</span></div>
              <div className="h-3 rounded-full bg-red" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between"><span>N4Cluster, all-in</span><span className="font-bold">{usd(r.n4)}</span></div>
              <div className="h-3 rounded-full bg-cream-2"><div className="h-3 rounded-full bg-ink" style={{ width: `${r.n4BarPct}%` }} /></div>
            </div>
            <div className="border-t-2 border-dashed border-line pt-[18px]" aria-live="polite">
              <div className="text-[15px] text-ink-2">You&apos;d keep an extra</div>
              <div className={`${display} text-[clamp(54px,6vw,76px)] leading-none tracking-[-0.04em] text-green`}>{usd(r.monthlySaving)}</div>
              <div className="mt-1.5">a month · <strong>{usd(r.yearlySaving)}</strong> a year</div>
            </div>
            <Link href="/contact" className="rounded-full bg-gold px-[22px] py-[15px] text-center font-bold text-ink no-underline">Get my free demo storefront</Link>
            <p className="text-xs leading-normal text-muted">
              Same menu subtotal on both channels, though apps often push menu prices higher to offset commission. N4Cluster: our fixed price (figures on the <Link href="/pricing" className="underline">pricing page</Link>) + card processing ({+(PROCESSING_RATE * 100).toFixed(1)}% + {Math.round(PROCESSING_FLAT * 100)}¢). The diner&apos;s separate fee isn&apos;t part of your cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
