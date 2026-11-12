import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { Target, Wrench, Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Help build the future infrastructure of local commerce. Join a small team working on category-creation challenges.",
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
      <HeroCentered
        eyebrow="Careers"
        heading="Help build the future infrastructure of local commerce"
        subheading="We're building systems for merchant ownership, orchestration, and intelligent growth. If that excites you, we'd love to hear from you."
        primaryCta={{ label: "Introduce Yourself", href: "#introduce-yourself" }}
      />

      <FeatureGrid
        eyebrow="Why join N4Cluster"
        heading="Why join us"
        features={reasons}
        columns={4}
        background="light"
      />

      {/* Open roles */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <SectionIntro
            heading="Open roles"
            subheading="We are building a small, focused team. These are the areas where we are currently looking for people."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { title: "Product Engineer (Full-stack)", type: "Full-time", area: "Engineering" },
              { title: "Platform Designer (UX / UI)", type: "Full-time", area: "Design" },
              { title: "Commerce Growth Lead", type: "Full-time", area: "Growth" },
              { title: "Merchant Success Manager", type: "Full-time", area: "Operations" },
            ].map((role) => (
              <div
                key={role.title}
                className="flex items-center justify-between bg-white border border-line rounded-[22px] px-6 py-5 hover:border-ink/30 transition-all"
              >
                <div>
                  <h3 className="font-display font-bold text-ink">{role.title}</h3>
                  <p className="text-sm text-muted">{role.area} · {role.type}</p>
                </div>
                <a
                  href="#introduce-yourself"
                  className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink-2 transition-colors"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
