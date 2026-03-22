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
        "rounded-2xl p-6",
        dark ? "bg-navy-900 text-white" : "bg-white",
        bordered && !dark && "border border-slate-200",
        bordered && dark && "border border-navy-700",
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
  return <h3 className={cn("text-xl font-bold text-navy-950", className)} {...props} />;
}

export function CardBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-slate-600 leading-relaxed", className)} {...props} />;
}
