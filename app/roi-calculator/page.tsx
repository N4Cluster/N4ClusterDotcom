import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ROICalculator } from "./ROICalculator";

export const metadata: Metadata = {
  title: "Fee Comparison Calculator",
  description:
    "Estimate the fee difference between marketplace commission and N4Cluster's fixed price, no commission, using your own direct-order volume, ticket size, and commission rate. A fee comparison, not a profit projection.",
};

export default function ROICalculatorPage() {
  return (
    <>
      {/* ponytail: compact hero so heading + calculator + result fit one desktop screen */}
      <section className="bg-cream pt-8 pb-6 md:pt-10 md:pb-8">
        <Container size="lg" className="text-center">
          <Badge variant="accent">Fee comparison</Badge>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance text-ink">
            Compare the fees on your own numbers.
          </h1>
          <p className="mt-3 text-base leading-relaxed max-w-3xl mx-auto text-ink-3 text-balance">
            Marketplaces charge a percentage of every order. N4Cluster charges
            one fixed price, with no commission, ever. Card processing is
            separate. Set the sliders to your restaurant to see the estimated fee
            difference — and the assumptions behind it.
          </p>
        </Container>
      </section>
      <ROICalculator />
    </>
  );
}
