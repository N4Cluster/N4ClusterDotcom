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
    accent: "cobalt" as const,
  },
  {
    icon: Wrench,
    title: "Real platform design challenges",
    description:
      "Orchestration, AI integration, merchant experience, and ecosystem coordination — substantive technical and product problems.",
    accent: "teal" as const,
  },
  {
    icon: Star,
    title: "Mission-aligned work",
    description:
      "Every feature, design decision, and integration we build is oriented toward helping local businesses grow with more control.",
    accent: "amber" as const,
  },
  {
    icon: Users,
    title: "Small team, high ownership",
    description:
      "Early team members have a real voice in shaping the product, the culture, and the direction of the company.",
    accent: "cobalt" as const,
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
      <section className="bg-white py-16 md:py-24">
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
                className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-6 py-5 hover:border-cobalt-500/30 hover:bg-white transition-all"
              >
                <div>
                  <h3 className="font-bold text-navy-950">{role.title}</h3>
                  <p className="text-sm text-slate-500">{role.area} · {role.type}</p>
                </div>
                <a
                  href="#introduce-yourself"
                  className="text-sm font-semibold text-cobalt-500 hover:text-cobalt-600 transition-colors"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Introduction form */}
      <section id="introduce-yourself" className="bg-slate-50 py-16 md:py-24">
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
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
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
