import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/HeroCentered";
import { ROICalculator } from "./ROICalculator";

export const metadata: Metadata = {
  title: "Fee Comparison Calculator",
  description:
    "Estimate the fee difference between marketplace commission and N4Cluster's published $99/month plus $0.50 per order, no commission, using your own direct-order volume, ticket size, and commission rate. A fee comparison, not a profit projection.",
};

export default function ROICalculatorPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Fee comparison"
        heading="Compare the fees on your own numbers."
        subheading="Marketplaces charge a percentage of every order. N4Cluster charges published fees: $99/month plus $0.50 per order, with no commission, ever. Card processing is separate. Set the sliders to your restaurant to see the estimated fee difference — and the assumptions behind it."
      />
      <ROICalculator />
    </>
  );
}
