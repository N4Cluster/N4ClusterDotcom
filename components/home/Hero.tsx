import Image from "next/image";
import { heroCta } from "@/content/company";
import { OrderCard } from "./OrderCard";
import { StorefrontPhone } from "./StorefrontPhone";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-14 px-6 pb-[72px] pt-16 md:pb-10 md:pt-8">
      <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-[26px] md:gap-[min(20px,2.4svh)]">
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-[7px] text-sm font-semibold text-ink-2">
          <span className="size-2 rounded-full bg-green" />
          Commission-free online ordering
        </span>
        <h1 className="font-display text-[clamp(48px,6.4vw,88px)] md:text-[clamp(42px,min(6.4vw,7svh),88px)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          Stop paying <span className="box-decoration-clone rounded-[14px] bg-gold px-2.5">30%</span> to sell your own food.
        </h1>
        <p className="max-w-[540px] text-xl leading-[1.55] text-ink-2 md:text-[min(20px,2.6svh)]">
          Your own branded ordering site, built-in rewards and delivery we coordinate. No commission, ever.
        </p>
        <form
          action="/contact"
          method="get"
          className="flex max-w-[560px] flex-wrap gap-2 rounded-[18px] border border-line bg-white p-2 shadow-[0_18px_40px_rgba(15,26,58,0.10)]"
        >
          <input
            name="restaurant"
            required
            maxLength={120}
            aria-label="Restaurant name"
            placeholder="Your restaurant's name"
            className="min-w-0 flex-[1_1_220px] bg-transparent px-4 py-3.5 text-[17px] text-ink focus-visible:outline-solid focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:rounded-xl placeholder:text-muted"
          />
          <button
            type="submit"
            className="min-h-[54px] flex-none rounded-xl bg-ink px-6 text-base font-bold text-white hover:bg-ink-2"
          >
            {heroCta.label} →
          </button>
        </form>
        <p className="text-sm leading-[1.4] text-ink-2">
          <strong className="text-ink">30 days free.</strong> Month-to-month. Keep your delivery apps for discovery.
        </p>
      </div>

      <div className="relative min-w-0 flex-[1_1_540px] max-md:flex max-md:flex-col max-md:items-center max-md:gap-6 md:h-[clamp(370px,calc(100svh-320px),640px)]">
        <Image
          src="/images/stock/cafe-counter.jpg"
          alt=""
          width={900}
          height={1000}
          priority
          sizes="(min-width: 1280px) 600px, 50vw"
          className="rounded-[32px] object-cover object-[70%_center] max-md:h-[320px] max-md:w-full md:absolute md:right-0 md:top-0 md:h-full md:w-[calc(100%-64px)]"
        />
        <OrderCard className="md:absolute md:right-6 md:top-7" />
        <StorefrontPhone className="md:absolute md:-bottom-7 md:left-0 md:origin-bottom-left md:scale-[0.8]" />
        <div
          aria-hidden="true"
          className="flex items-center gap-2.5 rounded-2xl bg-gold px-3.5 py-2.5 text-ink shadow-[0_16px_40px_rgba(15,26,58,0.3)] md:absolute md:bottom-9 md:right-6"
        >
          <span className="size-2 flex-none rounded-full bg-ink" />
          <div>
            <div className="text-[13px] font-bold">Repeat order</div>
            <div className="text-xs">6th visit this month</div>
          </div>
        </div>
      </div>
    </section>
  );
}
