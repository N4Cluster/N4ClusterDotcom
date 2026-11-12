import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface SectionContainerProps extends ComponentPropsWithoutRef<"section"> {
  background?: "white" | "light" | "dark" | "navy" | "gradient-light";
  size?: "sm" | "md" | "lg";
}

const bgClasses = {
  white: "bg-cream",
  light: "bg-cream-2",
  dark: "on-dark bg-ink text-white",
  navy: "on-dark bg-ink text-white",
  "gradient-light": "bg-cream",
};

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export function SectionContainer({
  background = "white",
  size = "md",
  className,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(paddingClasses[size], bgClasses[background], className)}
      {...props}
    />
  );
}
