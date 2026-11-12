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
    <section className="bg-cream-2 py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[22px] p-8 flex flex-col ${
                tier.highlighted
                  ? "on-dark bg-ink relative overflow-hidden shadow-[0_24px_50px_rgba(15,26,58,0.3)]"
                  : "bg-white border border-line"
              }`}
            >
              {tier.highlighted && (
                <>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-gold text-ink rounded-full">
                      Most Popular
                    </span>
                  </div>
                </>
              )}
              <div className="relative z-10 flex flex-col flex-1">
                <div className="mb-6">
                  <h3
                    className={`font-display text-xl font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-ink"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-sm font-medium ${
                      tier.highlighted ? "text-white" : "text-ink-2"
                    }`}
                  >
                    {tier.tagline}
                  </p>
                  <p
                    className={`text-sm mt-3 leading-relaxed ${
                      tier.highlighted ? "text-white/75" : "text-ink-3"
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
                          tier.highlighted ? "bg-gold/20" : "bg-green-tint"
                        }`}
                      >
                        <Check size={10} className={tier.highlighted ? "text-gold" : "text-green"} strokeWidth={3} />
                      </div>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? "text-white/80" : "text-ink-3"
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
