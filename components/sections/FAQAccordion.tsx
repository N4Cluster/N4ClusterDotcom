import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

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

// Native details/summary: keyboard and screen-reader behavior for free, closed answers stay out of the a11y tree.
export function FAQAccordion({ eyebrow, heading, subheading, items, dark = false }: FAQAccordionProps) {
  return (
    <section className={`py-16 md:py-24 ${dark ? "on-dark bg-ink" : "bg-cream"}`}>
      <Container size="lg">
        {heading && (
          <SectionIntro eyebrow={eyebrow} heading={heading} subheading={subheading} dark={dark} />
        )}
        <div className={`mx-auto max-w-3xl border-b ${dark ? "border-white/15" : "border-line"}`}>
          {items.map((item) => (
            <details
              key={item.question}
              className={`group border-t py-5 md:py-[22px] ${dark ? "border-white/15" : "border-line"}`}
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold md:text-[19px] [&::-webkit-details-marker]:hidden ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[26px] leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className={`mt-3 text-base leading-relaxed ${dark ? "text-white/75" : "text-ink-3"}`}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
