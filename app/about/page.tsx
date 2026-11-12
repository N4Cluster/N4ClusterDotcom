import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { complementaryChannels, mission, values } from "@/content/company";

export const metadata: Metadata = {
  title: "About N4Cluster",
  description:
    "N4Cluster was created so neighborhood restaurants can build direct customer relationships and stay in control of their brand, their data, and their economics.",
};



const capabilities = [
  { name: "Orchestration", description: "Your menu, orders, payments and delivery kept in step, so nothing falls between systems." },
  { name: "Intelligence", description: "Demand forecasting and campaign drafts that wait for your OK." },
  { name: "Discovery", description: "A listing in a neighborhood directory alongside other local spots." },
];

export default function AboutPage() {
  return (
    <>
      <HeroCentered
        eyebrow="About N4Cluster"
        heading="Why N4Cluster exists"
        subheading="N4Cluster was created so neighborhood restaurants can build direct customer relationships and keep control of their brand, their data, and their economics — while continuing to use the channels that already work for them."
        primaryCta={{ label: "Contact the Team", href: "/contact" }}
      />

      {/*
        Mission — the same canonical sentence /mission renders, from
        content/company.ts. This page previously stated a different mission.
      */}
      <section className="bg-cream py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionIntro
                eyebrow="Mission"
                heading={mission}
                align="left"
                className="mb-0"
                headingClassName="text-2xl sm:text-3xl"
              />
            </div>
            <div className="bg-white rounded-[22px] border border-line p-8">
              <p className="text-ink-3 text-base leading-relaxed">
                A neighborhood restaurant is built one good meal and one returning
                customer at a time. Too often the infrastructure underneath that
                work is misaligned with the operator — taking a share of each order,
                standing between the restaurant and its customers, and making it
                harder to grow over time.
              </p>
              <p className="text-ink-3 text-base leading-relaxed mt-4">
                N4Cluster was built to change that: ordering under your own name,
                straightforward fees, and practical tools for repeat business.{" "}
                {complementaryChannels}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values — the same five commitments, from the same source as /mission */}
      <section className="bg-cream-2 py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Values"
            heading="Five commitments to your restaurant"
            subheading="These commitments guide how we build, price, and support N4Cluster."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div key={value.id} className="bg-white border border-line rounded-[22px] p-6">
                <div className="w-8 h-8 rounded-lg bg-gold/25 flex items-center justify-center mb-4">
                  <Check size={14} className="text-ink" strokeWidth={3} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-ink mb-2">{value.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/mission"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ink-2 transition-colors"
            >
              Read our mission and values in full
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-ink py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            eyebrow="What we run"
            heading="One platform, in plain words"
            subheading="Ordering on your own domain, rewards, growth campaigns you approve, delivery we coordinate, and a listing in a neighborhood directory."
            dark
          />
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.name} className="rounded-[22px] border border-ink-2 p-6 text-center">
                <h3 className="font-display mb-2 text-lg font-bold text-white">{c.name}</h3>
                <p className="text-sm leading-relaxed text-white/75">{c.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Want to learn more or get in touch?"
        subheading="Whether you are a merchant, partner, investor, or prospective team member — we would like to hear from you."
        primaryCta={{ label: "Contact the Team", href: "/contact" }}
        secondaryCta={{ label: "View Careers", href: "/careers" }}
        dark={false}
      />
    </>
  );
}
