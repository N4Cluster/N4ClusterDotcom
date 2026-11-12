import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  hover?: boolean;
  bordered?: boolean;
  dark?: boolean;
}

export function Card({ className, hover = false, bordered = false, dark = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[22px] p-6",
        dark ? "on-dark bg-ink text-white" : "bg-white",
        bordered && !dark && "border border-line",
        bordered && dark && "border border-ink-2",
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return <h3 className={cn("font-display text-xl font-bold text-ink", className)} {...props} />;
}

export function CardBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-ink-3 leading-relaxed", className)} {...props} />;
}
