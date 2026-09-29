import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site/settings";
import { priceDisplay } from "@/content/site/pricing";
import {
  complementaryChannels,
  demoCta,
  founderQuote,
  merchantJourney,
  mission,
  values,
} from "@/content/company";

export const metadata: Metadata = {
  title: "Mission & Values",
  description:
    "N4Cluster helps neighborhood restaurants grow profitably through direct ordering, lasting customer relationships, fair fees, and merchant control.",
};

export default function MissionPage() {
  return (
    <>
      {/*
        A. Hero. One dominant action, no price comparison, no carousel. The H1 is
        the brand's ownership headline and breaks across three lines naturally.
      */}
      <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] max-w-full bg-cobalt-600/10 rounded-full blur-3xl" />
        </div>
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="mb-5">
              <Badge variant="dark">Our promise to neighborhood restaurants</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
              Own your storefront.
              <br />
              Own your data.
              <br />
              {/* The one accent on this page, so it still means "look here". */}
              <span className="text-amber-400">Own your growth.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-2xl">
              Give customers who already know you a direct way to order from your
              restaurant. {complementaryChannels}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={demoCta.href} size="lg">
                {demoCta.label}
              </Button>
              <Button href="/pricing" size="lg" variant="outline">
                See pricing
              </Button>
            </div>
            <p className="mt-5 text-sm text-slate-300">
              A working demo with your real menu, before you decide.
            </p>
          </div>
        </Container>
      </section>

      {/* B. Mission and reason for being */}
      <section className="bg-white py-16 md:py-24">
        <Container size="md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-navy-950 text-balance">
            A stronger future for neighborhood restaurants.
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-navy-950 font-semibold">
            {mission}
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            A neighborhood restaurant is built one good meal and one returning
            customer at a time. N4Cluster exists to make those relationships easier
            to build online—with ordering under your name, straightforward fees, and
            practical tools for repeat business. You should be able to grow direct
            orders while continuing to use the channels that work for you.
          </p>
        </Container>
      </section>

      {/* C. The merchant experience — stacks on small screens, never scrolls sideways */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container size="md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-navy-950 text-balance">
            From an order to a lasting relationship.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 max-w-2xl">
            A direct order does more than avoid a commission. It tells you who
            ordered, what they ordered, and when they last came back — which is
            what makes a second visit something you can actually encourage.
          </p>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {merchantJourney.map((step, i) => (
              <li
                key={step.label}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-cobalt-600">
                  <span className="tabular-nums">{i + 1}.</span> {step.label}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* D. Values — readable vertical sequence, not five cramped columns */}
      <section className="bg-white py-16 md:py-24">
        <Container size="md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-navy-950 text-balance">
            Five commitments to your restaurant.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            These commitments guide how we build, price, and support N4Cluster.
          </p>

          <ol className="mt-10 border-t border-slate-200">
            {values.map((value, i) => (
              <li
                key={value.id}
                id={value.id}
                className="border-b border-slate-200 py-8 sm:py-10"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold tabular-nums text-slate-500 pt-1 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-navy-950">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      {value.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-600 hover:text-cobalt-500 transition-colors"
            >
              See how N4Cluster works
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/*
        E. Human context. A founder positioning statement, reproduced exactly —
        not a merchant testimonial and not evidence of measured results. No
        portrait is used because no approved photograph exists in the repository.
      */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container size="sm">
          <figure>
            <blockquote className="text-xl sm:text-2xl leading-relaxed font-semibold text-navy-950 text-balance">
              &ldquo;{founderQuote.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-slate-600">
              — {founderQuote.name}, {founderQuote.role}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* F. A concrete way to evaluate */}
      <section className="bg-white py-16 md:py-24">
        <Container size="md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-navy-950 text-balance">
            See what this means for your restaurant.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Start with your own menu. We&rsquo;ll walk you through the ordering
            experience, the fees, and what setup would involve for your restaurant.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Your menu and branding in a working demo.",
              "A cost breakdown using your expected direct-order volume.",
              "The capabilities, setup steps, and support available for your restaurant.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt-500 shrink-0"
                />
                <span className="text-base leading-relaxed text-slate-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/*
            Fee summary sits with the offer, at body size — not in footer small
            print. Every qualifier a merchant needs is visible without interaction.
          */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-950">
              What it costs
            </h3>
            <p className="mt-3 text-base leading-relaxed text-navy-950">
              After the {priceDisplay.trial}: {priceDisplay.merchantFees} in
              N4Cluster merchant fees. Zero N4Cluster sales commission.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Card processing and any courier charges are separate. Diners normally
              pay a {priceDisplay.dinerFee} N4Cluster fee unless the restaurant
              chooses to absorb it.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              The trial waives N4Cluster merchant platform and per-order fees.{" "}
              <Link href="/pricing" className="font-semibold text-cobalt-600 hover:underline">
                See the full pricing details
              </Link>{" "}
              for other charges and terms.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={demoCta.href} size="lg">
              {demoCta.label}
            </Button>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            Sending the form reaches our team — it does not open an account, start
            a trial, or charge anything. We reply to agree a time, and you decide
            what happens next.
          </p>
          <p className="mt-5 text-sm text-slate-600">
            Prefer to text? Send{" "}
            <strong className="text-navy-950">{siteConfig.contact.smsKeyword}</strong> to{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-semibold text-cobalt-600 hover:underline"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
