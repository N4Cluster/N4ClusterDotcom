import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { restaurantFromParam } from "@/lib/prefill";
import { faqItems } from "@/content/pages/faq";
import { siteConfig } from "@/content/site/settings";
import { demoCta } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact and Request a Demo",
  description:
    "Request a demo, discuss a pilot, or start a partner conversation with the N4Cluster team.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ restaurant?: string | string[] }>;
}) {
  const restaurant = restaurantFromParam((await searchParams).restaurant);
  return (
    <>
      <section className="bg-cream pt-16 pb-20">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: context */}
            <div className="pt-4">
              <div className="mb-5">
                <Badge variant="accent">Get in touch</Badge>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink text-balance leading-tight mb-5">
                Let&apos;s build your demo storefront.
              </h1>
              <p className="text-lg text-ink-3 leading-relaxed mb-8">
                Tell us about your restaurant and we&apos;ll build a working demo with your real menu. Asking about a pilot or a partnership instead? Use the same form and we&apos;ll follow up.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: demoCta.label,
                    description: "We'll build a working demo with your real menu, then walk you through it. Free, and yours to look at before you decide anything.",
                  },
                  {
                    title: "Discuss a pilot",
                    description: "Explore a focused pilot to validate outcomes before scaling.",
                  },
                  {
                    title: "Start a partner conversation",
                    description: "Connect as an integration, logistics, or strategic partner.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="text-sm text-ink-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm text-ink-3">
                {siteConfig.contact.founderLine}
                <br />
                Email{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-ink underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>

            {/* Right: form */}
            <div className="bg-white border border-line rounded-[22px] p-8 shadow-[0_24px_50px_rgba(15,26,58,0.12)]">
              <h2 className="font-display text-lg font-bold text-ink mb-1">Submit your request</h2>
              <p className="text-sm text-muted mb-6">
                Use the form below to request a demo, discuss a pilot, or start a partner conversation.
              </p>
              <ContactForm variant="demo" initialCompany={restaurant} />
            </div>
          </div>
        </Container>
      </section>

      <FAQAccordion
        eyebrow="Common questions"
        heading="Frequently asked questions"
        items={faqItems.slice(0, 5)}
      />
    </>
  );
}
