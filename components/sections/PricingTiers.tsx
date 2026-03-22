import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export interface PricingTier {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

interface PricingTiersProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  tiers: PricingTier[];
}

export function PricingTiers({ eyebrow, heading, subheading, tiers }: PricingTiersProps) {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col ${
                tier.highlighted
                  ? "bg-navy-950 border border-cobalt-500/40 relative overflow-hidden"
                  : "bg-white border border-slate-200"
              }`}
            >
              {tier.highlighted && (
                <>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cobalt-500/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-cobalt-500/20 text-cobalt-300 rounded-full">
                      Most Popular
                    </span>
                  </div>
                </>
              )}
              <div className="relative z-10 flex flex-col flex-1">
                <div className="mb-6">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-navy-950"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-sm font-medium ${
                      tier.highlighted ? "text-cobalt-400" : "text-cobalt-500"
                    }`}
                  >
                    {tier.tagline}
                  </p>
                  <p
                    className={`text-sm mt-3 leading-relaxed ${
                      tier.highlighted ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "bg-teal-500/20" : "bg-teal-500/10"
                        }`}
                      >
                        <Check size={10} className="text-teal-500" strokeWidth={3} />
                      </div>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={tier.cta.href}
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  {tier.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
