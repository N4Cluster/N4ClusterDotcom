import { youKeep } from "./figures";
import { TRIAL_DAYS } from "@/content/site/pricing";

const stats = [
  { value: "$0", caption: "commission on any order, ever" },
  { value: "Fixed", caption: "one price, whatever the ticket size" },
  { value: youKeep, caption: "what you keep on a $40 order", green: true },
  { value: `${TRIAL_DAYS} days`, caption: "free to start, then month-to-month" },
];

export function StatStrip() {
  return (
    <section aria-label="At a glance" className="mx-auto max-w-[1280px] px-6 pb-[88px] pt-14 md:pt-0">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t-2 border-ink">
        {stats.map((s) => (
          <div key={s.caption} className="pr-6 pt-7 md:pt-5">
            <div className={`font-display text-[clamp(40px,min(5vw,7svh),68px)] font-extrabold leading-none tracking-[-0.04em] ${s.green ? "text-green" : ""}`}>
              {s.value}
            </div>
            <div className="mt-2.5 text-base text-ink-2">{s.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
