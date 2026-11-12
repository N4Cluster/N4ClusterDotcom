import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

interface ImageTextBlockProps {
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: string[];
  cta?: { label: string; href: string };
  reverse?: boolean;
  dark?: boolean;
  visual?: React.ReactNode;
  accentColor?: string; // accepted for backward compatibility; unused
}

export function ImageTextBlock({
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  reverse = false,
  dark = false,
  visual,
}: ImageTextBlockProps) {
  return (
    <div className={`py-16 ${dark ? "on-dark bg-ink" : "bg-cream"}`}>
      <Container>
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={reverse ? "lg:col-start-2" : ""}>
            {eyebrow && (
              <div className="mb-4">
                <Badge variant={dark ? "dark" : "accent"}>{eyebrow}</Badge>
              </div>
            )}
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4 font-display ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {heading}
            </h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${dark ? "text-white/75" : "text-ink-3"}`}
            >
              {body}
            </p>
            {bullets && (
              <ul className="space-y-3 mb-6">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${dark ? "bg-gold text-ink" : "bg-green-tint text-green"}`}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${dark ? "text-white/80" : "text-ink-3"}`}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Button href={cta.href}>
                {cta.label}
              </Button>
            )}
          </div>

          {visual && <div className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>{visual}</div>}
        </div>
      </Container>
    </div>
  );
}
