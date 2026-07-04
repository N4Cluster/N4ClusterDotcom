import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { ROICalculator } from "./ROICalculator";

export const metadata: Metadata = {
  title: "ROI Calculator | N4Cluster",
  description:
    "See how much your restaurant would save by switching from marketplace aggregator commissions to N4Cluster's flat $0.99 per order fee. Adjust your order volume, ticket size, and commission rate to run the numbers instantly.",
};

export default function ROICalculatorPage() {
  return (
    <>
      <HeroCentered
        eyebrow="ROI Calculator"
        heading="See what commissions are really costing you."
        subheading="Third-party marketplaces take a cut of every order. N4Cluster charges a flat $0.99. Move the sliders to match your restaurant and watch the difference add up — monthly and yearly."
      />
      <ROICalculator />
    </>
  );
}
