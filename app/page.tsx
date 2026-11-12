import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Hero } from "@/components/home/Hero";
import { StatStrip } from "@/components/home/StatStrip";
import { FourNs } from "@/components/home/FourNs";
import { PlatformSections } from "@/components/home/PlatformSections";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { LiveInDays } from "@/components/home/LiveInDays";
import { PilotSection } from "@/components/home/PilotSection";
import { FinalCta } from "@/components/home/FinalCta";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { homeFaqItems } from "@/content/pages/faq";
import { siteConfig } from "@/content/site/settings";

export const metadata: Metadata = {
  title: "N4Cluster | Commission-Free Online Ordering for Neighborhood Restaurants",
  description:
    `Give customers who already know your restaurant a direct way to order, under your own brand. One fixed price. No commission, ever. Keep your delivery apps for discovery.`,
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <StatStrip />
      <FourNs />
      <PlatformSections />
      <SavingsCalculator />
      <PhotoMarquee />
      <ComparisonTable />
      <LiveInDays />
      <PilotSection />
      <FAQAccordion heading="Questions owners ask us" items={homeFaqItems} />
      <div className="bg-cream pb-16 md:pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-1.5 rounded-[22px] bg-cream-2 p-[22px]">
          <div className="text-[17px] font-bold">Rather just talk?</div>
          <div className="text-[15px] text-ink-2">
            {siteConfig.contact.founderLine} Or email{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold underline">
              {siteConfig.contact.email}
            </a>
            .
          </div>
        </div>
      </div>
      <FinalCta />
    </>
  );
}
