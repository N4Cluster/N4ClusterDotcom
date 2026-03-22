import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies and Pilots",
  description:
    "Pilot stories and emerging proof points showing how N4Cluster improves brand ownership, coordination, and growth outcomes in local commerce.",
};

const caseStudies = [
  {
    badge: "Design Partner Scenario",
    heading: "Reducing fragmentation and strengthening direct ordering",
    description:
      "How a local operator could reduce operational fragmentation, launch a branded direct channel, and gain visibility into what's driving repeat demand — by replacing multiple disconnected tools with N4Cluster's connected operating layer.",
    outcomes: [
      "Single direct ordering experience launched under the business brand",
      "Customer data owned and accessible to the operator",
      "Operational handoffs coordinated through N4Sync",
      "Demand signals surfaced through N4Logic",
    ],
    accent: "cobalt",
  },
  {
    badge: "Multi-location Scenario",
    heading: "Shared visibility and orchestration across locations",
    description:
      "How shared visibility and orchestration could improve consistency across locations for a growing local brand — without requiring each location to operate as a separate system.",
    outcomes: [
      "Unified ordering experience across all locations",
      "Cross-location performance visibility in one view",
      "N4Sync coordination for order and availability signals",
      "Centralized campaign support via N4Logic",
    ],
    accent: "teal",
  },
  {
    badge: "Neighborhood Growth Scenario",
    heading: "Building repeat behavior through merchant-owned engagement",
    description:
      "How merchant-owned customer engagement could improve repeat purchase behavior over time — replacing marketplace-dependent discovery with a compounding local demand model.",
    outcomes: [
      "Direct customer relationships established through branded channel",
      "Repeat purchase frequency improved through engagement tools",
      "Local demand signals tracked and acted on",
      "Growth compounding over time through neighborhood network effects",
    ],
    accent: "amber",
  },
];

const accentConfig: Record<string, { badge: "cobalt" | "teal" | "amber"; border: string; dot: string }> = {
  cobalt: { badge: "cobalt", border: "border-cobalt-500/20", dot: "bg-cobalt-500" },
  teal: { badge: "teal", border: "border-teal-500/20", dot: "bg-teal-500" },
  amber: { badge: "amber", border: "border-amber-400/20", dot: "bg-amber-500" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Case studies and pilots"
        heading="Pilot stories and emerging proof points"
        subheading="A closer look at how N4Cluster is designed to improve brand ownership, coordination, and growth outcomes in local commerce."
        primaryCta={{ label: "Talk About a Pilot", href: "/contact?interest=pilot" }}
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro
            heading="How the platform performs in practice"
            subheading="These scenarios illustrate the value N4Cluster is designed to create across different business models and operator contexts."
          />

          <div className="space-y-8">
            {caseStudies.map((cs) => {
              const ac = accentConfig[cs.accent];
              return (
                <div
                  key={cs.badge}
                  className={`bg-white border ${ac.border} rounded-2xl p-8 hover:shadow-lg transition-shadow`}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="mb-4">
                        <Badge variant={ac.badge}>{cs.badge}</Badge>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-4">
                        {cs.heading}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {cs.description}
                      </p>
                      <a
                        href="/contact?interest=pilot"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-500 hover:text-cobalt-600 transition-colors group"
                      >
                        Talk about a similar pilot
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Designed outcomes
                      </p>
                      <ul className="space-y-3">
                        {cs.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${ac.dot}`} />
                            <span className="text-sm text-slate-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to explore a pilot?"
        subheading="We work with businesses to define focused pilots that validate outcomes before larger commitments."
        primaryCta={{ label: "Talk About a Pilot", href: "/contact?interest=pilot" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
      />
    </>
  );
}
