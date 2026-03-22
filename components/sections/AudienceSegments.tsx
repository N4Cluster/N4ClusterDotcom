import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Segment {
  icon?: LucideIcon;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  accent?: "cobalt" | "teal" | "amber" | "slate";
}

interface AudienceSegmentsProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  segments: Segment[];
}

const accentClasses = {
  cobalt: { icon: "bg-cobalt-500/10 text-cobalt-600", border: "hover:border-cobalt-500/50" },
  teal: { icon: "bg-teal-500/10 text-teal-600", border: "hover:border-teal-500/50" },
  amber: { icon: "bg-amber-400/15 text-amber-600", border: "hover:border-amber-400/50" },
  slate: { icon: "bg-slate-100 text-slate-600", border: "hover:border-slate-400/50" },
};

export function AudienceSegments({ eyebrow, heading, subheading, segments }: AudienceSegmentsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {segments.map((seg) => {
            const Icon = seg.icon;
            const accent = seg.accent ?? "cobalt";
            const ac = accentClasses[accent];
            return (
              <div
                key={seg.title}
                className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-200 ${ac.border} hover:shadow-lg`}
              >
                {Icon && (
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${ac.icon}`}>
                    <Icon size={20} />
                  </div>
                )}
                <h3 className="text-lg font-bold text-navy-950 mb-2">{seg.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{seg.description}</p>
                {seg.cta && (
                  <a
                    href={seg.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-500 hover:text-cobalt-600 transition-colors group"
                  >
                    {seg.cta.label}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
