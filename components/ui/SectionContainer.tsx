import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface SectionContainerProps extends ComponentPropsWithoutRef<"section"> {
  background?: "white" | "light" | "dark" | "navy" | "gradient-light";
  size?: "sm" | "md" | "lg";
}

const bgClasses = {
  white: "bg-white",
  light: "bg-slate-50",
  dark: "gradient-dark",
  navy: "bg-navy-950",
  "gradient-light": "gradient-section",
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
