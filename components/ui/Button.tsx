"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, ComponentPropsWithoutRef<"button"> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cobalt-500 text-white hover:bg-cobalt-600 shadow-sm hover:shadow-md focus-visible:ring-cobalt-500",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-sm focus-visible:ring-navy-700",
  ghost:
    "bg-transparent text-navy-900 hover:bg-slate-100 focus-visible:ring-slate-300",
  outline:
    "bg-transparent border border-cobalt-500 text-cobalt-500 hover:bg-cobalt-500 hover:text-white focus-visible:ring-cobalt-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, ...rest } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton & { href?: undefined };
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
