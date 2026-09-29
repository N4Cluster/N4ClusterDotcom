import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  missionCommitments,
  missionStatement,
  missionSupport,
  missionValues,
} from "@/content/pages/mission";

export const metadata: Metadata = {
  title: "Mission and Values",
  description:
    "N4Cluster exists so local operators keep the customer relationship, the data, and the margin — on infrastructure priced at a flat $99/month plus $0.50 per order. Our values, and what each one rules out.",
};

export default function MissionPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Mission and values"
        heading="Keep the customer. Keep the data. Keep the margin."
        subheading="What N4Cluster is for, the values we operate by, and — because a value that forbids nothing is not a commitment — what each one rules out."
        primaryCta={{ label: "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: "Calculate Your Savings", href: "/roi-calculator" }}
      />

      {/* Mission */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <SectionIntro
                eyebrow="Mission"
                heading={missionStatement}
                align="left"
                className="mb-8"
                headingClassName="text-2xl sm:text-3xl"
              />
              {missionSupport.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-slate-600 text-base leading-relaxed mt-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/*
              The price is the claim, so it gets the loudest treatment on the page
              per DESIGN.md — numbers first, prose second.
            */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-600">
                What it costs
              </p>
              <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-navy-950">
                $99
                <span className="text-lg font-semibold text-slate-600">/month</span>
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-navy-950">
                + $0.50
                <span className="text-base font-semibold text-slate-600"> per order</span>
              </p>
              <hr className="my-6 border-slate-200" />
              <p className="text-3xl font-bold tracking-tight text-teal-700">0%</p>
              <p className="mt-1 text-sm text-slate-600">
                commission — at any volume, on any plan.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values ledger */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container size="md">
          <SectionIntro
            eyebrow="Values"
            heading="Five commitments, and what each one rules out"
            subheading="Stated so they can be checked. If we break one, it should be obvious from the outside."
          />

          <ol className="border-t border-slate-200">
            {missionValues.map((value) => (
              <li
                key={value.index}
                className="border-b border-slate-200 py-8 sm:py-10"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold tabular-nums text-slate-500 pt-1 shrink-0"
                  >
                    {value.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-navy-950">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      {value.body}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">
                      <span className="font-semibold text-navy-950">
                        Rules out:{" "}
                      </span>
                      {value.rulesOut}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Checkable commitments */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            eyebrow="Hold us to it"
            heading="The four things you can verify before you talk to us"
            subheading="Each one is published, not promised on a call."
          />
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {missionCommitments.map((commitment) => (
              <div
                key={commitment.label}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <dt className="text-base font-bold tracking-tight text-navy-950">
                  {commitment.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  {commitment.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Where we are today — stated plainly, per PRODUCT.md: no implied proof. */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container size="sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
            Where we are today
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            N4Cluster is an early-stage company building in the open. We are
            working with design partners on focused pilots rather than pointing at
            a customer list we have not earned yet. If you are evaluating us, the
            useful questions are what the platform does today, what it costs, and
            how quickly you could leave — and we would rather answer those than
            show you a logo wall.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            The pricing is published. The math is on the ROI calculator. The exit
            is a data export you can request on any day.
          </p>
        </Container>
      </section>

      <CTASection
        heading="Run the numbers on your own orders"
        subheading="See what a flat $99 per month plus $0.50 per order looks like against what you pay now — then decide whether a conversation is worth your time."
        primaryCta={{ label: "Calculate Your Savings", href: "/roi-calculator" }}
        secondaryCta={{ label: "Request a Demo", href: "/contact" }}
      />
    </>
  );
}
