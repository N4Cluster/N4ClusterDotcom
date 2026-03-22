import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About N4Cluster",
  description:
    "N4Cluster was created to support a better model for local commerce — one where businesses keep the customer relationship, gain better operating leverage, and grow on infrastructure aligned with their success.",
};

const principles = [
  {
    title: "Merchant-first by design",
    description:
      "Every platform decision is evaluated against whether it gives the business more control, visibility, and long-term leverage.",
  },
  {
    title: "Transparency over hidden extraction",
    description:
      "We believe local businesses deserve to understand how their commerce infrastructure works and what it costs.",
  },
  {
    title: "Orchestration over fragmentation",
    description:
      "The future of local commerce is connected operating layers, not a growing stack of disconnected tools.",
  },
  {
    title: "Intelligence with operator control",
    description:
      "AI should support human judgment, not replace it. N4Logic is built to inform decisions, not make them.",
  },
  {
    title: "Long-term ecosystem value",
    description:
      "We build for outcomes that compound over time — for merchants, partners, and the neighborhoods they serve.",
  },
];

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
        subheading="N4Cluster was created to support a better model for local commerce — one where businesses keep the customer relationship, gain better operating leverage, and grow on infrastructure aligned with their success."
        primaryCta={{ label: "Contact the Team", href: "/contact" }}
      />

      {/* Mission */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionIntro
                eyebrow="Mission"
                heading="Build the infrastructure layer that helps local commerce operate with more ownership, coordination, and intelligence."
                align="left"
                className="mb-0"
                headingClassName="text-2xl sm:text-3xl"
              />
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <p className="text-slate-600 text-base leading-relaxed">
                Local commerce creates real value for neighborhoods, communities, and the people who run independent and regional businesses. But too often, the infrastructure that enables that commerce is misaligned with the interests of the operator — extracting margin, hiding the customer, and making it harder to grow over time.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mt-4">
                N4Cluster was built to change that. We are building the connected operating layer that helps local businesses own their brand, coordinate their operations, and apply intelligence where it matters — without giving up control to do it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Principles"
            heading="What we believe"
            subheading="These are the operating principles that guide every product, partnership, and business decision at N4Cluster."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {principles.map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-cobalt-500/10 flex items-center justify-center mb-4">
                  <Check size={14} className="text-cobalt-500" strokeWidth={3} />
                </div>
                <h3 className="font-bold text-navy-950 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
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
