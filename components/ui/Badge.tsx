import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type BadgeVariant = "default" | "cobalt" | "teal" | "amber" | "dark" | "outline";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  cobalt: "bg-cobalt-500/10 text-cobalt-600",
  teal: "bg-teal-500/10 text-teal-600",
  amber: "bg-amber-400/15 text-amber-600",
  dark: "bg-navy-900 text-cobalt-300",
  outline: "border border-slate-300 text-slate-600 bg-transparent",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
