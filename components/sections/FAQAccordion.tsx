"use client";

import { useState } from "react";
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

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={`py-16 md:py-24 ${dark ? "gradient-dark" : "bg-white"}`}>
      <Container size="lg">
        {heading && (
          <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} dark={dark} />
        )}
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => (
            <div
              key={item.question}
              className={`rounded-xl border overflow-hidden ${
                dark ? "border-navy-700 bg-navy-800/50" : "border-slate-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className={cn(
                  "flex w-full items-center justify-between px-6 py-5 text-left transition-colors",
                  dark ? "hover:bg-navy-800" : "hover:bg-slate-50",
                  openIndex === i && (dark ? "bg-navy-800" : "bg-slate-50")
                )}
                aria-expanded={openIndex === i}
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
                  className={cn(
                    "flex-shrink-0 transition-transform duration-200",
                    dark ? "text-slate-400" : "text-slate-400",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === i ? "max-h-96" : "max-h-0"
                )}
              >
                <div
                  className={`px-6 pb-5 text-sm leading-relaxed ${
                    dark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
