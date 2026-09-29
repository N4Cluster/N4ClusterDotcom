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



const brandLayers = [
  {
    name: "N4Cluster",
    description: "The overall commerce infrastructure platform",
    color: "#2563eb",
    role: "Platform",
  },
  {
    name: "N4Sync",
    description: "The orchestration and integration layer",
    color: "#14b8a6",
    role: "Orchestration",
  },
  {
    name: "N4Logic",
    description: "The intelligence and automation layer",
    color: "#f59e0b",
    role: "Intelligence",
  },
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
      <section className="bg-white py-16 md:py-24">
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
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <p className="text-slate-600 text-base leading-relaxed">
                A neighborhood restaurant is built one good meal and one returning
                customer at a time. Too often the infrastructure underneath that
                work is misaligned with the operator — taking a share of each order,
                standing between the restaurant and its customers, and making it
                harder to grow over time.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mt-4">
                N4Cluster was built to change that: ordering under your own name,
                straightforward fees, and practical tools for repeat business.{" "}
                {complementaryChannels}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values — the same five commitments, from the same source as /mission */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Values"
            heading="Five commitments to your restaurant"
            subheading="These commitments guide how we build, price, and support N4Cluster."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div key={value.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-cobalt-500/10 flex items-center justify-center mb-4">
                  <Check size={14} className="text-cobalt-500" strokeWidth={3} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy-950 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/mission"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-600 hover:text-cobalt-500 transition-colors"
            >
              Read our mission and values in full
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Brand architecture */}
      <section className="gradient-dark py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Brand architecture"
            heading="The N4Cluster platform layers"
            subheading="N4Cluster is the parent platform. N4Sync and N4Logic are the two core layers that power orchestration and intelligence."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {brandLayers.map((layer) => (
              <div
                key={layer.name}
                className="bg-navy-800 border border-navy-700 rounded-2xl p-6 text-center hover:border-cobalt-500/40 transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: layer.color + "20" }}
                >
                  <span className="font-bold text-xs" style={{ color: layer.color }}>
                    {layer.role}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{layer.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{layer.description}</p>
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
