import Image from "next/image";
import Link from "next/link";
import { demoCta } from "@/content/company";

export function FinalCta() {
  return (
    <section className="px-6 pb-24 pt-6">
      <div className="on-dark mx-auto flex max-w-[1280px] flex-wrap overflow-hidden rounded-[36px] bg-ink text-white">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col justify-center gap-[22px] p-[clamp(40px,6vw,80px)]">
          <h2 className="font-display text-[clamp(40px,5.4vw,72px)] font-extrabold leading-[0.98] tracking-[-0.04em]">
            Your guests order straight from you.<br />
            <span className="text-gold">You keep the customer and the margin.</span>
          </h2>
          <p className="text-lg text-white/80">See your own demo storefront in one short call.</p>
          <div className="flex flex-wrap gap-3">
            <Link href={demoCta.href} className="rounded-full bg-gold px-[26px] py-4 text-[17px] font-bold text-ink">
              {demoCta.label}
            </Link>
            <Link href="/pricing" className="rounded-full border-[1.5px] border-white/40 px-[26px] py-4 text-[17px] font-bold text-white">
              See pricing
            </Link>
          </div>
        </div>
        <div className="relative min-h-[380px] min-w-0 flex-[1_1_400px]">
          <Image src="/images/stock/french-toast-raspberry.jpg" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
