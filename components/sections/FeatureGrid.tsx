import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
  accent?: string; // accepted for backward compatibility; all icon chips share one style
}

interface FeatureGridProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
  background?: "white" | "light" | "dark";
}

const colClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  eyebrow,
  heading,
  subheading,
  features,
  columns = 3,
  dark = false,
  background = "white",
}: FeatureGridProps) {
  const bgClass =
    background === "light"
      ? "bg-cream-2"
      : background === "dark"
      ? "on-dark bg-ink"
      : "bg-cream";

  return (
    <section className={`${bgClass} py-16 md:py-24`}>
      <Container>
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          subheading={subheading}
          dark={dark}
        />
        <div className={`grid ${colClasses[columns]} gap-6`}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                bordered
                hover
                dark={dark}
                className={dark ? "bg-white/5 border-white/15" : ""}
              >
                {Icon && (
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-gold text-ink" : "bg-gold/25 text-ink"}`}
                  >
                    <Icon size={20} />
                  </div>
                )}
                <h3 className={`font-display text-lg font-bold mb-2 ${dark ? "text-white" : "text-ink"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-white/75" : "text-ink-3"}`}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
