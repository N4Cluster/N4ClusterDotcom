import Image from "next/image";

export const liveInDaysSteps = [
  { when: "Day 1", title: "A 20-minute call", body: "We walk through your menu, hours and delivery area and show you your demo storefront." },
  { when: "Within days", title: "We build your site", body: "Menu imported and cleaned up, payments connected, rewards switched on. Nothing goes live without your sign-off." },
  { when: "Week 1", title: "Point your regulars to it", body: "Table tents, bag stuffers and your Google listing all send guests to your own site." },
  { when: "Ongoing", title: "Every order compounds", body: "Each direct order is a guest you own, so the next one costs you nothing to earn." },
];

export function LiveInDays({ headingLevel: H = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="how" aria-labelledby="live-in-days" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-16 px-6 py-[104px]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[22px]">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-red">How it works</div>
          <H id="live-in-days" className="font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.035em]">
            Live in days. Not quarters.
          </H>
          <p className="text-lg text-ink-2">
            We do the setup. You approve it. We scope the exact steps and timing for your restaurant before you commit.
          </p>
          <div className="relative mt-2 h-[300px]">
            <Image src="/images/stock/cafe-interior.jpg" alt="" width={600} height={600} className="absolute left-0 top-0 h-full w-[56%] rounded-3xl object-cover" />
            <Image src="/images/stock/chef-lettuce.jpg" alt="" width={400} height={500} className="absolute right-0 top-10 h-[82%] w-[40%] rounded-3xl border-[6px] border-white object-cover" />
          </div>
        </div>
        <ol className="flex min-w-0 flex-[1_1_520px] flex-col">
          {liveInDaysSteps.map((s, i) => {
            const last = i === liveInDaysSteps.length - 1;
            return (
              <li key={s.title} className={`flex gap-6 border-t border-line py-7 ${last ? "border-b" : ""}`}>
                <span
                  aria-hidden="true"
                  className={`font-display flex size-16 flex-none items-center justify-center rounded-[18px] text-2xl font-extrabold ${last ? "bg-gold text-ink" : "bg-ink text-gold"}`}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-[13px] font-bold uppercase tracking-[0.06em] text-red">{s.when}</div>
                  <h3 className="mb-1.5 mt-1 text-[22px] font-bold">{s.title}</h3>
                  <p className="text-base text-ink-2">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
