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
    "bg-gold text-ink hover:brightness-95 shadow-sm hover:shadow-md",
  secondary:
    "bg-ink text-white hover:bg-ink-2 shadow-sm",
  ghost:
    "bg-transparent text-ink hover:bg-cream-3",
  outline:
    "bg-transparent border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
  danger:
    "bg-red text-white hover:brightness-90 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props;
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
