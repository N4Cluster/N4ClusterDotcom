import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/content/pages/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about N4Cluster: fees, trial, delivery, your data and how setup works.",
};

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-cream pt-16 pb-16 md:pt-24">
        <Container size="lg" className="text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-5">
            Frequently asked questions
          </h1>
          <p className="text-xl text-ink-3 max-w-2xl mx-auto">
            Answers to common questions about N4Cluster, how it works, and what the platform can do for your business.
          </p>
        </Container>
      </section>

      <FAQAccordion items={faqItems} />

      <CTASection
        heading="Still have questions?"
        subheading="Reach out directly and our team will be happy to help."
        primaryCta={{ label: "Contact the Team", href: "/contact" }}
        secondaryCta={{ label: "View the Platform", href: "/platform" }}
        dark={false}
      />
    </>
  );
}
