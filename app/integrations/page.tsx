import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  CreditCard,
  Package,
  MessageSquare,
  Users,
  BarChart2,
  Monitor,
  Webhook,
  Puzzle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "N4Cluster is built to work as a connected operating layer across the tools and workflows that matter in local commerce.",
};

const integrationCategories = [
  {
    icon: Monitor,
    title: "POS and catalog systems",
    description:
      "Connect point-of-sale and catalog management systems to keep menu data, pricing, and availability synchronized.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Integrate payment processing that keeps transactions flowing securely and reliably across ordering channels.",
  },
  {
    icon: Package,
    title: "Delivery and fulfillment",
    description:
      "Connect delivery services and fulfillment providers to coordinate the last-mile experience.",
  },
  {
    icon: MessageSquare,
    title: "Messaging and notifications",
    description:
      "Send order confirmations and status updates through the right channels at the right time.",
  },
  {
    icon: Users,
    title: "CRM and customer engagement",
    description:
      "Keep customer data and engagement tools working together to support loyalty and retention.",
  },
  {
    icon: BarChart2,
    title: "Analytics and reporting",
    description:
      "Connect analytics and business intelligence tools to surface the metrics that drive better decisions.",
  },
];

const architectureFeatures = [
  {
    icon: Webhook,
    title: "Webhook and event-driven patterns",
    description:
      "Real-time integration via webhooks and event streams — keeping systems in sync without constant polling.",
  },
  {
    icon: Puzzle,
    title: "Pilot-first connection model",
    description:
      "Start with the integrations that matter most and expand the connected footprint progressively.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Integrations"
        heading="Integration-ready by design"
        subheading="N4Cluster is built to work as a connected operating layer across the tools and workflows that matter in local commerce."
        primaryCta={{ label: "Become a Partner", href: "/partners" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
      />

      <FeatureGrid
        eyebrow="Integration categories"
        heading="Connect the tools that power your operation"
        subheading="N4Cluster is designed to work with the systems you already use — not to replace them all at once."
        features={integrationCategories}
        columns={3}
        background="light"
      />

      <section className="bg-cream py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            heading="Flexible integration approach"
            subheading="N4Cluster supports multiple integration patterns to accommodate different technical environments and business needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {architectureFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white border border-line rounded-[22px] p-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/25 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-ink" />
                  </div>
                  <h3 className="font-display font-bold text-ink mb-2">{f.title}</h3>
                  <p className="text-sm text-ink-3 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 on-dark bg-ink rounded-[22px] p-8 max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              Extensible architecture
            </p>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Built for future ecosystem growth
            </h3>
            <p className="text-white/75 text-sm leading-relaxed max-w-lg mx-auto">
              The integration architecture is designed to grow with the ecosystem. As new tools, providers, and standards emerge, N4Cluster can expand its connected footprint without major platform overhauls.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Interested in building a connection?"
        subheading="If you represent a tool or service used in local commerce, we'd like to explore what a partnership could look like."
        primaryCta={{ label: "Become a Partner", href: "/partners" }}
        secondaryCta={{ label: "Contact the Team", href: "/contact" }}
      />
    </>
  );
}
