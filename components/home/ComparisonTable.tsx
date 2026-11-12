import { monthly, orderCost } from "./figures";
import { TRIAL_DAYS } from "@/content/site/pricing";

const cols = ["Marketplace apps", "Flat-fee ordering SaaS", "N4Cluster"] as const;
const rows: { label: string; cells: [string, string, string] }[] = [
  { label: "Cost on a $40 order", cells: ["Up to $12.00 (20–30%)", "Card processing, plus the monthly bill", `${orderCost} ($0.50 + card processing)`] },
  { label: "Monthly fee", cells: ["Varies", "Typically $300–500", `${monthly}, first ${TRIAL_DAYS} days free`] },
  { label: "Who owns the customer", cells: ["The app", "You", "You — copy on request"] },
  { label: "Whose brand guests see", cells: ["Theirs", "Yours", "Yours"] },
  { label: "Delivery", cells: ["Inside the commission", "Varies by provider", "We dispatch and track it"] },
  { label: "Commitment", cells: ["Their terms, changed on their schedule", "Varies", "Month-to-month, 30 days' notice"] },
];

export function ComparisonTable() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-[104px]">
      <div className="mb-11 max-w-[820px]">
        <div className="mb-3.5 text-sm font-bold uppercase tracking-[0.08em] text-red">Three ways to sell online</div>
        <h2 className="font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.035em]">
          Marketplaces take a cut. SaaS takes a big flat bite. We take neither.
        </h2>
      </div>

      {/* Desktop table */}
      <table className="hidden w-full border-separate border-spacing-0 text-base sm:table">
        <thead>
          <tr className="text-left">
            <th scope="col" className="w-[26%] p-5"><span className="sr-only">Feature</span></th>
            {cols.map((c, i) => (
              <th key={c} scope="col" className={i === 2 ? "on-dark rounded-t-[20px] bg-ink px-5 py-[22px] font-display text-[22px] font-extrabold text-white" : "p-5 text-[17px] font-bold"}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const last = ri === rows.length - 1;
            return (
              <tr key={row.label}>
                <th scope="row" className={`border-t border-line p-5 text-left font-semibold ${last ? "border-b" : ""}`}>{row.label}</th>
                {row.cells.map((c, i) =>
                  i === 2 ? (
                    <td key={i} className={`border-t border-ink-2 bg-ink p-5 font-bold text-white ${last ? "rounded-b-[20px] font-extrabold text-gold" : ""}`}>{c}</td>
                  ) : (
                    <td key={i} className={`border-t border-line p-5 ${last ? "border-b" : ""}`}>{c}</td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile: one card per column */}
      <div className="flex flex-col gap-4 sm:hidden">
        {cols.map((c, i) => (
          <div key={c} className={`rounded-[20px] p-5 ${i === 2 ? "on-dark bg-ink text-white" : "border border-line bg-white"}`}>
            <h3 className="mb-3 font-display text-xl font-extrabold">{c}</h3>
            <dl className="m-0 flex flex-col gap-3">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className={`text-sm ${i === 2 ? "text-white/70" : "text-muted"}`}>{row.label}</dt>
                  <dd className="m-0 font-semibold">{row.cells[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] text-muted">
        Commission and SaaS pricing vary by provider. N4Cluster per-order cost assumes card processing at 2.9% + 30¢ on a $40 subtotal; the {monthly} monthly fee is separate.
      </p>
    </section>
  );
}
