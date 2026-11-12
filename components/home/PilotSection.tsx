import Image from "next/image";
import Link from "next/link";
import { Utensils } from "lucide-react";
import { pilotRestaurants } from "@/content/pages/pilot";

export function PilotSection() {
  return (
    <section id="pilot" className="mx-auto max-w-[1280px] px-6 py-[104px]">
      <div className="flex flex-wrap gap-6">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5 rounded-[32px] bg-gold p-[clamp(32px,4vw,56px)]">
          <div className="text-sm font-bold uppercase tracking-[0.08em]">Made in Middle Tennessee</div>
          <h2 className="font-display text-[clamp(36px,4.4vw,56px)] font-extrabold leading-none tracking-[-0.035em]">
            Built with our neighbors, one restaurant at a time.
          </h2>
          <p className="text-lg">
            We&apos;re onboarding a small group of pilot restaurants. You get a founder on speed dial and a real say in what we build next.
          </p>
          <Link href="/contact" className="on-dark mt-auto self-start rounded-full bg-ink px-6 py-[15px] font-bold text-white hover:bg-ink-2">
            Apply for a pilot spot
          </Link>
        </div>
        <div className="grid min-w-0 flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {pilotRestaurants.map((r) => (
            <article key={r.name} className="flex flex-col overflow-hidden rounded-[32px] border border-line bg-white">
              {r.photo ? (
                <Image src={r.photo} alt="" width={600} height={440} className="h-[220px] w-full object-cover" />
              ) : (
                <div aria-hidden="true" className="flex h-[220px] items-center justify-center bg-cream-3 text-muted">
                  <Utensils size={48} strokeWidth={1.5} />
                </div>
              )}
              <div className="flex flex-col gap-2 p-[22px]">
                <span className="self-start rounded-full bg-green-tint px-2.5 py-1 text-xs font-bold text-green-deep">{r.status}</span>
                <h3 className="text-[22px] font-bold">{r.name}</h3>
                <p className="text-sm text-ink-2">{r.location}</p>
                {r.quote && <blockquote className="text-sm text-ink-2">{r.quote}</blockquote>}
                {r.results && <p className="text-sm font-semibold text-ink">{r.results}</p>}
              </div>
            </article>
          ))}
          <article className="on-dark relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[32px] bg-ink p-[22px] text-white">
            <div className="relative flex flex-col gap-2">
              <span className="self-start rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-ink">Pilot spots open</span>
              <h3 className="font-display text-[26px] font-extrabold">Your restaurant, here.</h3>
              <p className="text-sm text-white/85">Hands-on setup from the founding team.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
