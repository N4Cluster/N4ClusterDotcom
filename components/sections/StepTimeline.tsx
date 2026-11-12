import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

export interface Step {
  number: string | number;
  title: string;
  description: string;
  accent?: string; // accepted for backward compatibility; unused
}

interface StepTimelineProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  steps: Step[];
  dark?: boolean;
}

export function StepTimeline({ eyebrow, heading, subheading, steps, dark = false }: StepTimelineProps) {
  return (
    <section className={`py-16 md:py-24 ${dark ? "on-dark bg-ink" : "bg-cream"}`}>
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} dark={dark} />
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              return (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-start md:items-center md:text-center">
                    <div
                      className="min-w-16 h-16 px-3 rounded-2xl flex items-center justify-center font-display font-bold text-sm mb-5 flex-shrink-0 whitespace-nowrap bg-gold text-ink"
                    >
                      {step.number}
                    </div>
                    <h3 className={`font-display text-lg font-bold mb-2 ${dark ? "text-white" : "text-ink"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-white/75" : "text-ink-3"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
