import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { LiveInDays } from "@/components/home/LiveInDays";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — Live in Days. Not Quarters.",
  description:
    "We do the setup, you approve it. See who does what from your first call to your first direct orders and beyond.",
};

const phases = [
  {
    tag: "Day 1",
    headline: "A call, then we build. You approve.",
    sub: "We walk through your menu, hours and delivery area and show you your demo storefront. Nothing launches until you say go.",
    tasks: [
      "POS connected — menu data imported",
      "Categories, descriptions and missing items cleaned up for your review",
      "Delivery area set up for your address",
      "No website yet? We'll set up your domain too",
    ],
    merchant: "Review your preview site and approve to launch.",
    n4cluster: "Build your ordering site and clean up your menu.",
  },
  {
    tag: "Within days",
    headline: "One approval. You're live.",
    sub: "Your branded ordering site goes live under your name, and your restaurant is listed in a neighborhood directory alongside other local spots.",
    tasks: [
      "Branded ordering site live under your domain",
      "Menu and availability kept in step with your POS",
      "Rewards switched on: points on the menu subtotal, redeemed at checkout",
      "Delivery coordinated through DoorDash Drive and Uber Direct",
    ],
    merchant: "Accept your first direct orders.",
    n4cluster: "Track delivery times and chase any order that runs late.",
  },
  {
    tag: "Week 1",
    headline: "Point your regulars to it.",
    sub: "Table tents, bag stuffers and your Google listing all send guests to your own site.",
    tasks: [
      "Google Business Profile kept in sync with your menu",
      "AI demand forecasting starts learning your busy windows",
      "Repeat-customer data builds up in your account",
    ],
    merchant: "Share your link with the guests who already love you.",
    n4cluster: "Keep your listing current and surface demand signals.",
  },
  {
    tag: "Ongoing",
    headline: "Every order compounds.",
    sub: `Each direct order is a guest you own, at the same fixed price, plus card processing.`,
    tasks: [
      "Growth campaigns drafted for the regulars who have drifted — sent only with your OK",
      "High-margin items flagged for a spotlight",
      "Your customer data is yours — we'll send you a copy whenever you ask",
    ],
    merchant: "Run your restaurant. Review suggestions and approve what you want.",
    n4cluster: "Run the platform and improve it. Never take a commission.",
  },
];

const summary = [
  { value: "Days", label: "We scope exact timing for your restaurant before you commit" },
  { value: "Fixed price", label: "Card processing separate. Numbers on the pricing page." },
  { value: "Tracked", label: "Delivery times on every order" },
  { value: "0%", label: "Commission. Never." },
];

export default function HowItWorksPage() {
  return (
    <>
      <LiveInDays headingLevel="h1" />

      <section className="bg-cream py-16 md:py-24">
        <Container size="lg">
          <SectionIntro
            eyebrow="Who does what"
            heading="You approve. We do the work."
            subheading="Nothing goes live without your sign-off."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {phases.map((phase) => (
              <Card key={phase.tag} bordered className="flex flex-col">
                <div className="mb-3">
                  <Badge variant="accent">{phase.tag}</Badge>
                </div>
                <h3 className="font-display text-xl font-bold text-ink">{phase.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{phase.sub}</p>
                <ul className="mt-5 space-y-2.5">
                  {phase.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check size={16} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-green" />
                      <span className="text-sm leading-relaxed text-ink-3">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                  <div className="rounded-xl bg-green-tint p-4">
                    <div className="mb-1.5 text-xs font-bold text-green-deep">You do</div>
                    <div className="text-xs leading-relaxed text-ink-3">{phase.merchant}</div>
                  </div>
                  <div className="rounded-xl bg-cream-2 p-4">
                    <div className="mb-1.5 text-xs font-bold text-ink-2">We do</div>
                    <div className="text-xs leading-relaxed text-ink-3">{phase.n4cluster}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="on-dark bg-ink py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {summary.map((stat) => (
              <div key={stat.label}>
                <div className="font-display mb-1 text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to see exactly how this works for your restaurant?"
        subheading="Get a free demo and we'll walk through the full process, from your menu to live ordering."
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "View the platform", href: "/platform" }}
        dark={false}
      />
    </>
  );
}
