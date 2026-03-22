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
  dark = true,
}: HeroCenteredProps) {
  return (
    <section
      className={`${dark ? "gradient-hero" : "bg-slate-50"} pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden`}
    >
      {dark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cobalt-600/10 rounded-full blur-3xl" />
        </div>
      )}
      <Container size="lg" className="relative z-10 text-center">
        {eyebrow && (
          <div className="mb-5">
            <Badge variant={dark ? "dark" : "cobalt"}>{eyebrow}</Badge>
          </div>
        )}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight ${
            dark ? "text-white" : "text-navy-950"
          }`}
        >
          {heading}
        </h1>
        <p
          className={`mt-6 text-xl leading-relaxed max-w-2xl mx-auto ${
            dark ? "text-slate-300" : "text-slate-600"
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
