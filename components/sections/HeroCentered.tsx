import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroCenteredProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
}

export function HeroCentered({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  dark = false,
}: HeroCenteredProps) {
  return (
    <section
      className={`${dark ? "on-dark bg-ink" : "bg-cream"} pt-16 pb-16 md:pt-24 md:pb-24 relative overflow-hidden`}
    >
      <Container size="lg" className="relative z-10 text-center">
        {eyebrow && (
          <div className="mb-5">
            <Badge variant={dark ? "dark" : "accent"}>{eyebrow}</Badge>
          </div>
        )}
        <h1
          className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h1>
        <p
          className={`mt-6 text-xl leading-relaxed max-w-2xl mx-auto ${
            dark ? "text-white/75" : "text-ink-3"
          }`}
        >
          {subheading}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
            )}
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
        )}
      </Container>
    </section>
  );
}
