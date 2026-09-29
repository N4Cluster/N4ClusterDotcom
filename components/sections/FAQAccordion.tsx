"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  dark?: boolean;
}

export function FAQAccordion({ eyebrow, heading, subheading, items, dark = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={`py-16 md:py-24 ${dark ? "gradient-dark" : "bg-white"}`}>
      <Container size="lg">
        {heading && (
          <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} dark={dark} />
        )}
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <div
                key={item.question}
                className={`rounded-xl border ${
                  dark ? "border-navy-700 bg-navy-800/50" : "border-slate-200 bg-white"
                }`}
              >
                <button
                  id={buttonId}
                  onClick={() => toggle(i)}
                  className={cn(
                    "flex w-full items-center justify-between px-6 py-5 text-left transition-colors rounded-xl",
                    dark ? "hover:bg-navy-800" : "hover:bg-slate-50",
                    isOpen && (dark ? "bg-navy-800" : "bg-slate-50")
                  )}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span
                    className={`font-semibold text-sm sm:text-base pr-4 ${
                      dark ? "text-white" : "text-navy-950"
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "flex-shrink-0 transition-transform duration-200",
                      dark ? "text-slate-400" : "text-slate-500",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {/*
                  Rendered only while open. The previous version animated a
                  max-height, which capped long answers at 384px and left closed
                  answers in the accessibility tree for screen readers to read out.
                */}
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`px-6 pb-5 text-sm leading-relaxed ${
                      dark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
