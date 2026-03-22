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
    <section className={`${dark ? "gradient-dark" : "bg-slate-50"} py-16 md:py-24 relative overflow-hidden`}>
      {dark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cobalt-600/15 rounded-full blur-3xl" />
        </div>
      )}
      <Container size="lg" className="relative z-10 text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
            dark ? "text-white" : "text-navy-950"
          }`}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              dark ? "text-slate-300" : "text-slate-600"
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
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
