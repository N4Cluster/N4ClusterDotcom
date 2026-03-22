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
    accent: "cobalt" as const,
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Integrate payment processing that keeps transactions flowing securely and reliably across ordering channels.",
    accent: "teal" as const,
  },
  {
    icon: Package,
    title: "Delivery and fulfillment",
    description:
      "Connect delivery services and fulfillment providers to coordinate the last-mile experience.",
    accent: "cobalt" as const,
  },
  {
    icon: MessageSquare,
    title: "Messaging and notifications",
    description:
      "Send order confirmations, status updates, and promotional messages through the right channels at the right time.",
    accent: "amber" as const,
  },
  {
    icon: Users,
    title: "CRM and customer engagement",
    description:
      "Keep customer data and engagement tools working together to support loyalty and retention.",
    accent: "teal" as const,
  },
  {
    icon: BarChart2,
    title: "Analytics and reporting",
    description:
      "Connect analytics and business intelligence tools to surface the metrics that drive better decisions.",
    accent: "cobalt" as const,
  },
];

const architectureFeatures = [
  {
    icon: Webhook,
    title: "Webhook and event-driven patterns",
    description:
      "Real-time integration via webhooks and event streams — keeping systems in sync without constant polling.",
    accent: "cobalt" as const,
  },
  {
    icon: Puzzle,
    title: "Pilot-first connection model",
    description:
      "Start with the integrations that matter most and expand the connected footprint progressively.",
    accent: "teal" as const,
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

      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            heading="Flexible integration approach"
            subheading="N4Cluster supports multiple integration patterns to accommodate different technical environments and business needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {architectureFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-cobalt-500/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-cobalt-500" />
                  </div>
                  <h3 className="font-bold text-navy-950 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-navy-950 border border-navy-800 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-cobalt-300 uppercase tracking-wider mb-3">
              Extensible architecture
            </p>
            <h3 className="text-xl font-bold text-white mb-3">
              Built for future ecosystem growth
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
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
