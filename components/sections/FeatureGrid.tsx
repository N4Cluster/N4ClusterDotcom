import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
  accent?: "cobalt" | "teal" | "amber";
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

const accentClasses = {
  cobalt: "bg-cobalt-500/10 text-cobalt-600",
  teal: "bg-teal-500/10 text-teal-600",
  amber: "bg-amber-400/15 text-amber-600",
};

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
      ? "bg-slate-50"
      : background === "dark"
      ? "gradient-dark"
      : "bg-white";

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
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const accent = feature.accent ?? (["cobalt", "teal", "amber"] as const)[i % 3];
            return (
              <Card
                key={feature.title}
                bordered
                hover
                dark={dark}
                className={dark ? "bg-navy-800 border-navy-700" : ""}
              >
                {Icon && (
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accentClasses[accent]}`}
                  >
                    <Icon size={20} />
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${dark ? "text-white" : "text-navy-950"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
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
