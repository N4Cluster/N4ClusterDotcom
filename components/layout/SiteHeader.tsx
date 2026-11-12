"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { navItems } from "@/content/site/navigation";
import { siteConfig } from "@/content/site/settings";
import { demoCta } from "@/content/company";

const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-[15px] font-semibold text-ink whitespace-nowrap transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const linkClass = "px-3.5 py-2.5 text-[15px] font-medium text-ink rounded-md hover:bg-cream-2";

/** True when `href` addresses the page currently displayed. */
function isCurrent(href: string, pathname: string | null): boolean {
  return !!pathname && href.split("#")[0] === pathname;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Escape closes the mobile menu — expected of any disclosure control.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Navigating away should never leave the menu open over the new page
  // ("adjust state when a prop changes": reset in the same render, no effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  // Lock background scroll and move focus into the panel while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="N4Cluster home" onClick={() => setMobileOpen(false)}>
          <Logo variant="light" size={44} />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
              className={cn(linkClass, isCurrent(item.href, pathname) && "underline decoration-gold decoration-2 underline-offset-8")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={siteConfig.loginUrl} className={cn(linkClass, "font-semibold")}>
            Log in
          </a>
          <Link href={demoCta.href} className={ctaClass}>
            {demoCta.label}
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-ink hover:bg-cream-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="max-h-[80vh] overflow-y-auto border-t border-line bg-cream lg:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink hover:bg-cream-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="space-y-2 border-t border-line pt-4">
              <a href={siteConfig.loginUrl} className={cn(ctaClass, "w-full bg-transparent ring-1 ring-ink")}>
                Log in
              </a>
              <Link href={demoCta.href} className={cn(ctaClass, "w-full")}>
                {demoCta.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
