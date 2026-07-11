import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

export interface Step {
  number: string | number;
  title: string;
  description: string;
  accent?: "cobalt" | "teal" | "amber";
}

interface StepTimelineProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  steps: Step[];
  dark?: boolean;
}

// Deep variants so white text clears WCAG AA (4.5:1); bg-amber-500/teal-500 fail with white text.
const accentBg = {
  cobalt: "#1a4fd6",
  teal: "#0d9488",
  amber: "#b8710c",
};

export function StepTimeline({ eyebrow, heading, subheading, steps, dark = false }: StepTimelineProps) {
  return (
    <section className={`py-16 md:py-24 ${dark ? "gradient-dark" : "bg-white"}`}>
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} dark={dark} />
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const accent = step.accent ?? (["cobalt", "teal", "amber", "cobalt"] as const)[idx % 4];
              return (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-start md:items-center md:text-center">
                    <div
                      className="min-w-16 h-16 px-3 rounded-2xl flex items-center justify-center font-bold text-sm text-white mb-5 flex-shrink-0 whitespace-nowrap shadow-md"
                      style={{ background: accentBg[accent] }}
                    >
                      {step.number}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${dark ? "text-white" : "text-navy-950"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
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
