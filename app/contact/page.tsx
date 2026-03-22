import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { faqItems } from "@/content/pages/faq";

export const metadata: Metadata = {
  title: "Contact and Request a Demo",
  description:
    "Request a demo, discuss a pilot, or start a partner conversation with the N4Cluster team.",
};

export default function ContactPage() {
  return (
    <>
      <section className="gradient-hero pt-32 pb-20">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: context */}
            <div className="pt-4">
              <div className="mb-5">
                <Badge variant="dark">Get in touch</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance leading-tight mb-5">
                Let&apos;s explore what N4Cluster could support for your business
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Tell us about your business, operating model, or pilot interest, and we&apos;ll follow up with the right next step.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Request a demo",
                    description: "See the platform walkthrough tailored to your business model.",
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
                    <div className="w-2 h-2 rounded-full bg-cobalt-400 flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-lg font-bold text-navy-950 mb-1">Submit your request</h2>
              <p className="text-sm text-slate-500 mb-6">
                Use the form below to request a demo, discuss a pilot, or start a partner conversation.
              </p>
              <ContactForm variant="demo" />
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
