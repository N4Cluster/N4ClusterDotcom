import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform — Ordering, Rewards, Growth, Delivery",
  description: "N4Cluster is four things working together: your own ordering site, a rewards program, growth campaigns, and delivery we coordinate — for one fixed price.",
};

const pillars = [
  {
    id: "ordering",
    number: "01",
    tag: "Ordering",
    headline: "Your brand. Your domain. Your ordering experience.",
    body: "Your ordering site runs on your own domain, branded top to bottom — not tucked inside someone else's app with your logo as an afterthought. Customers order from you, and the relationship stays yours.",
    features: [
      "Menu, categories and pricing set up for you",
      "Runs under your own domain, not ours",
      "Mobile-first, fast checkout",
      "Specials, sold-out items and hours update as you change them",
      "You control all pricing and item visibility",
      "Card payments through Stripe, with the money deposited to you",
    ],
    metric: { value: "Fixed price", label: "no commission, whatever the ticket size" },
  },
  {
    id: "rewards",
    number: "02",
    tag: "Rewards",
    headline: "Give regulars a reason to come back to you.",
    body: "A rewards program on your own site, live today. Guests earn points on their menu subtotal, redeem from your own reward catalog, and apply rewards at checkout.",
    features: [
      "Points earned on the menu subtotal of each order",
      "Your own reward catalog — you choose what guests can redeem",
      "Rewards redeemed right at checkout",
      "Every member is a guest you own",
    ],
    metric: { value: "Your catalog", label: "you decide what rewards are worth" },
  },
  {
    id: "growth",
    number: "03",
    tag: "Growth",
    headline: "We help your regulars come back.",
    body: "When a regular drifts, we draft a win-back campaign for them, and nothing goes out without your OK.",
    features: [
      "Win-back campaigns for regulars who have drifted, sent only with your OK",
      "Multi-location support if you run more than one spot",
    ],
    metric: { value: "You decide", label: "campaigns wait for your approval" },
  },
  {
    id: "delivery",
    number: "04",
    tag: "Delivery",
    headline: "Delivery we coordinate, so late orders aren't your problem.",
    body: "We dispatch through Uber Direct and chase any order that runs late. Delivery charges depend on your address. Delivery runs on our risk protection, with delivery-time tracking on every order.",
    features: [
      "Dispatch through Uber Direct",
      "Delivery-time tracking on every order — no manual checking",
      "We chase any order that runs late",
      "Risk protection: driver-side failures are ours to handle",
      "Delivery charges depend on your address",
    ],
    metric: { value: "Tracked", label: "every pickup and drop-off timestamped" },
  },
];

const protections = [
  { title: "No commission, ever.", body: "Not now, not later. One fixed price, with the numbers on our pricing page. Card processing and any delivery charges are separate." },
  { title: "Charge what you want on your own site.", body: "You can charge differently on different channels. We have no say in your pricing." },
  { title: "Advance notice of changes.", body: "Any material policy change comes with advance notice, in writing." },
  { title: "Your customer data is yours.", body: "We'll send you a copy whenever you ask." },
];

const infra = [
  { title: "Compute & orchestration", description: "Google Kubernetes Engine and Cloud Run for hosting, auto-scaling, and serverless workloads." },
  { title: "Data & analytics", description: "BigQuery for near-real-time merchant analytics and neighborhood demand insight." },
  { title: "AI & machine learning", description: "Vertex AI powering menu intelligence and campaign drafting." },
  { title: "Event streaming", description: "Pub/Sub for real-time order events, integration webhooks, and service-to-service messaging." },
  { title: "Security & isolation", description: "Cloud IAM, Secret Manager, and VPC Service Controls for tenant isolation and PII boundaries." },
  { title: "Observability", description: "Cloud Operations Suite for tracing, metrics, alerting, and SLO tracking." },
];

export default function PlatformPage() {
  return (
    <>
      <HeroCentered
        eyebrow="The platform"
        heading="One platform. Four things working together."
        subheading="Your own ordering site, rewards, growth, and delivery we coordinate — one system, for one fixed price."
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {pillars.map((p, idx) => {
        const even = idx % 2 === 0;
        return (
          <section
            key={p.id}
            id={p.id}
            className={`scroll-mt-24 py-16 md:py-24 ${even ? "bg-white" : "bg-cream"}`}
          >
            <Container size="lg">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={even ? "" : "lg:order-2"}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-3xl font-extrabold text-gold">{p.number}</span>
                    <Badge variant="accent">{p.tag}</Badge>
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">{p.headline}</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-3">{p.body}</p>
                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-green" />
                        <span className="text-sm leading-relaxed text-ink-3">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={even ? "" : "lg:order-1"}>
                  <Card dark className="p-10 text-center">
                    <div className="font-display text-5xl font-extrabold text-gold">{p.metric.value}</div>
                    <div className="mt-3 text-base text-white/75">{p.metric.label}</div>
                  </Card>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="on-dark bg-ink py-16 md:py-20">
        <Container size="lg">
          <SectionIntro
            eyebrow="Merchant protections"
            heading="The rules don't change on you."
            subheading="Flat fee, in writing, every month. Not a promotional rate that quietly turns into a commission."
            dark
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {protections.map((item) => (
              <Card key={item.title} dark bordered className="p-5">
                <div className="mb-3 h-6 w-1 rounded-full bg-gold" />
                <h3 className="mb-2 text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/75">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream-2 py-16 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Infrastructure"
            heading="Built on Google Cloud"
            subheading="N4Cluster runs on Google Cloud Platform for reliability, scale, and AI-ready infrastructure."
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {infra.map((item) => (
              <Card key={item.title} bordered>
                <h3 className="font-display mb-2 font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-3">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="See the platform in your restaurant's context"
        subheading="Get a free demo and we'll show you exactly how each piece works for your business."
        primaryCta={{ label: "Get a free demo", href: "/contact" }}
        secondaryCta={{ label: "View solutions", href: "/solutions" }}
        dark={false}
      />
    </>
  );
}
