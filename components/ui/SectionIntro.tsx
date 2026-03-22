import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionIntroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  headingClassName?: string;
  size?: "md" | "lg";
}

export function SectionIntro({
  eyebrow,
  heading,
  subheading,
  align = "center",
  dark = false,
  className,
  headingClassName,
  size = "md",
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-4">
          <Badge variant={dark ? "dark" : "cobalt"}>{eyebrow}</Badge>
        </div>
      )}
      <h2
        className={cn(
          "font-bold tracking-tight text-balance",
          size === "lg" ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl md:text-4xl",
          dark ? "text-white" : "text-navy-950",
          headingClassName
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-slate-300" : "text-slate-600",
            align === "center" && "mx-auto"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
