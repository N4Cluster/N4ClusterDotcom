import type { Metadata } from "next";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import { growthPartner } from "@/content/careers/growth-partner";
import { ContactForm } from "@/components/forms/ContactForm";
import { Check, Target, Wrench, Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join N4Cluster as a Restaurant Growth Partner: an independent-contractor, commission-only role signing independent restaurants in your own city.",
};

const reasons = [
  {
    icon: Target,
    title: "Category creation opportunity",
    description:
      "We are defining what merchant-first local commerce infrastructure means. This is a rare chance to work on a genuinely new category.",
  },
  {
    icon: Wrench,
    title: "Real platform design challenges",
    description:
      "Orchestration, AI integration, merchant experience, and ecosystem coordination — substantive technical and product problems.",
  },
  {
    icon: Star,
    title: "Mission-aligned work",
    description:
      "Every feature, design decision, and integration we build is oriented toward helping local businesses grow with more control.",
  },
  {
    icon: Users,
    title: "Small team, high ownership",
    description:
      "Early team members have a real voice in shaping the product, the culture, and the direction of the company.",
  },
];

export default function CareersPage() {
  return (
    <>
      <header className="bg-cream pt-16 md:pt-24 pb-10 md:pb-14">
        <Container size="md">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            Careers at N4Cluster
          </h1>
          <p className="mt-5 text-lg text-ink-2">
            We build direct ordering for independent restaurants at flat utility pricing, not commission. Right now we&apos;re looking for people to bring it to restaurants in their own city.
          </p>
          <a
            href="#growth-partner"
            className="mt-6 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink-2 transition-colors"
          >
            See the Restaurant Growth Partner role
          </a>
        </Container>
      </header>

      <section id="growth-partner" className="scroll-mt-24 bg-cream pb-16 md:pb-24">
        <Container size="xl">
          <div className="on-dark rounded-[32px] bg-ink p-6 text-white sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div>
                <Badge variant="dark" className="text-white">{growthPartner.badge}</Badge>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {growthPartner.title}
                </h2>
                <p className="mt-3 text-sm text-white/80">{growthPartner.meta.join(" · ")}</p>
                <p className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl">
                  {growthPartner.headline}
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-7xl font-extrabold leading-none text-gold">
                    {growthPartner.shareFigure}
                  </span>
                  <span className="min-w-0 flex-1 basis-48 text-white/80">{growthPartner.shareCaption}</span>
                </div>
                <ul className="mt-6 space-y-3 text-white/90">
                  {growthPartner.pay.map((line) => (
                    <li key={line} className="border-t border-white/15 pt-3">{line}</li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-2">
                  {growthPartner.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-white/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-white/90">{growthPartner.arrangement}</p>
                <p className="mt-4 text-sm text-white/70">{growthPartner.footnote}</p>
              </div>
              <div className="on-light rounded-[22px] bg-white p-6 text-ink sm:p-8">
                <h3 className="font-display text-2xl font-bold">Apply</h3>
                <div className="mt-5">
                  <CareerApplicationForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FeatureGrid
        eyebrow="Why join N4Cluster"
        heading="Why join us"
        features={reasons}
        columns={4}
        background="light"
      />

      {/* Introduction form */}
      <section id="introduce-yourself" className="bg-cream-2 py-16 md:py-24">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionIntro
                eyebrow="Apply"
                heading="Introduce yourself"
                subheading="Don't see the right role? Tell us who you are and what kind of work you want to do. We keep strong applications on file as we grow."
                align="left"
                className="mb-0"
              />
            </div>
            <div className="bg-white border border-line rounded-[22px] p-8">
              <ContactForm variant="contact" />
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Help shape the future of local commerce"
        subheading="We are looking for people who care about merchant success, system design, and building something meaningful."
        primaryCta={{ label: "Introduce Yourself", href: "#introduce-yourself" }}
        secondaryCta={{ label: "Learn About the Company", href: "/about" }}
      />
    </>
  );
}
