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
    <section className="bg-slate-50 py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Before */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full mb-5">
              <X size={12} className="text-slate-500" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                {before.label}
              </span>
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-6">{before.headline}</h3>
            <ul className="space-y-4">
              {before.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={10} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-slate-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-navy-950 border border-navy-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cobalt-500/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cobalt-500/20 rounded-full mb-5">
                <Check size={12} className="text-teal-400" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-cobalt-300 uppercase tracking-wide">
                  {after.label}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6">{after.headline}</h3>
              <ul className="space-y-4">
                {after.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-teal-400" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-slate-300">{point}</span>
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
