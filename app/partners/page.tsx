import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { Truck, Monitor, TrendingUp, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with the infrastructure layer for local commerce. N4Cluster is built for ecosystem collaboration across integration, logistics, growth, and operating workflows.",
};

const partnerTypes = [
  {
    icon: Truck,
    title: "Logistics partners",
    description:
      "Delivery and fulfillment providers who want to connect into a merchant-aligned operating layer and reach more local commerce operators.",
    accent: "cobalt" as const,
  },
  {
    icon: Monitor,
    title: "POS and commerce system partners",
    description:
      "Point-of-sale, catalog, and commerce technology providers who want to extend reach and improve interoperability with local operators.",
    accent: "teal" as const,
  },
  {
    icon: TrendingUp,
    title: "Growth and engagement partners",
    description:
      "Marketing, CRM, and customer engagement platforms that want to connect into the operator workflow rather than sit outside it.",
    accent: "amber" as const,
  },
  {
    icon: Network,
    title: "Strategic ecosystem partners",
    description:
      "Organizations with aligned interests in improving the local commerce infrastructure — from industry groups to regional networks.",
    accent: "cobalt" as const,
  },
];

export default function PartnersPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Partners"
        heading="Partner with the infrastructure layer for local commerce"
        subheading="N4Cluster is built for ecosystem collaboration across integration, logistics, growth, and operating workflows."
        primaryCta={{ label: "Start a Partner Conversation", href: "#partner-form" }}
      />

      <FeatureGrid
        eyebrow="Partner types"
        heading="Who we partner with"
        subheading="We are building relationships with organizations that share an interest in better local commerce infrastructure."
        features={partnerTypes}
        columns={4}
        background="light"
      />

      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionIntro
                eyebrow="Why partner with N4Cluster"
                heading="Built for ecosystem collaboration from the start"
                subheading="N4Cluster's integration-first architecture and transparent operating model are designed to make partnership straightforward and mutually beneficial."
                align="left"
                className="mb-6"
              />
              <ul className="space-y-4">
                {[
                  "Extensible architecture designed for partner connection",
                  "Pilot-first approach to validating partnership value",
                  "Transparent economics with no hidden extraction",
                  "Operator-aligned growth that benefits the full ecosystem",
                  "Long-term relationship focus over short-term transaction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cobalt-500 flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="partner-form" className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-950 mb-2">Start a partner conversation</h3>
              <p className="text-sm text-slate-600 mb-6">
                Tell us about your organization and what kind of partnership you have in mind.
              </p>
              <ContactForm variant="partner" />
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to build something together?"
        subheading="We are actively developing our partner ecosystem. If you see an opportunity to create value for local operators, we'd like to hear about it."
        primaryCta={{ label: "Contact the Team", href: "/contact" }}
        secondaryCta={{ label: "View Integrations", href: "/integrations" }}
        dark={false}
      />
    </>
  );
}
