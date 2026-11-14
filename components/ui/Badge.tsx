import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type BadgeVariant = "default" | "accent" | "teal" | "amber" | "dark" | "outline";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-cream-3 text-ink-2",
  accent: "bg-green-tint text-green-deep",
  teal: "bg-green-tint text-green-deep",
  amber: "bg-gold/25 text-ink",
  dark: "bg-white/10 text-gold",
  outline: "border border-line text-ink-3 bg-transparent",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
