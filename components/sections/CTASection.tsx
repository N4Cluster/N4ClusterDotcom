import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  heading: string;
  subheading?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
}

export function CTASection({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  dark = true,
}: CTASectionProps) {
  return (
    <section className={`${dark ? "on-dark bg-ink" : "bg-cream-2"} py-16 md:py-24`}>
      <Container size="lg" className="text-center">
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              dark ? "text-white/75" : "text-ink-3"
            }`}
          >
            {subheading}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              size="lg"
              variant={dark ? "outline" : "secondary"}
              className={dark ? "border-white text-white hover:bg-white hover:text-ink" : undefined}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
