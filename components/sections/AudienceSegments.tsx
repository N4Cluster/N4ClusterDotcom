import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Segment {
  icon?: LucideIcon;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  accent?: string; // accepted for backward compatibility; unused
}

interface AudienceSegmentsProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  segments: Segment[];
}

export function AudienceSegments({ eyebrow, heading, subheading, segments }: AudienceSegmentsProps) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className={`bg-white border border-line rounded-[22px] p-6 transition-all duration-200 hover:border-ink/30 hover:shadow-[0_16px_36px_rgba(15,26,58,0.12)]`}
              >
                {Icon && (
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gold/25 text-ink`}>
                    <Icon size={20} />
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-ink mb-2">{seg.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed mb-4">{seg.description}</p>
                {seg.cta && (
                  <a
                    href={seg.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 decoration-gold decoration-2 hover:text-ink-2 transition-colors group"
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
