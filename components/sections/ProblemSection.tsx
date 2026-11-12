import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { AlertTriangle } from "lucide-react";

interface ProblemSectionProps {
  eyebrow?: string;
  heading: string;
  body: string;
  problems: string[];
}

export function ProblemSection({ eyebrow, heading, body, problems }: ProblemSectionProps) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionIntro
              eyebrow={eyebrow}
              heading={heading}
              subheading={body}
              align="left"
              className="mb-0"
            />
          </div>
          <div className="bg-white border border-line rounded-[22px] p-8">
            <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">
              Common pain points
            </p>
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gold/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle size={12} className="text-ink" />
                  </div>
                  <span className="text-sm text-ink-2 leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
