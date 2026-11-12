import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { X, Check } from "lucide-react";

interface ComparisonSide {
  label: string;
  headline: string;
  points: string[];
  type: "before" | "after";
}

interface ComparisonCardsProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  before: ComparisonSide & { type: "before" };
  after: ComparisonSide & { type: "after" };
}

export function ComparisonCards({ eyebrow, heading, subheading, before, after }: ComparisonCardsProps) {
  return (
    <section className="bg-cream-2 py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Before */}
          <div className="bg-white border border-line rounded-[22px] p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream-3 rounded-full mb-5">
              <X size={12} className="text-ink-2" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
                {before.label}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-6">{before.headline}</h3>
            <ul className="space-y-4">
              {before.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cream-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={10} className="text-ink-3" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-ink-3">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="on-dark bg-ink rounded-[22px] p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-5">
                <Check size={12} className="text-gold" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                  {after.label}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">{after.headline}</h3>
              <ul className="space-y-4">
                {after.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-gold" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
