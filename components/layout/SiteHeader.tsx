"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { navItems, type NavItem } from "@/content/site/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg gradient-cobalt flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-bold text-xs tracking-wider">N4</span>
            </div>
            <span
              className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                scrolled ? "text-navy-950" : "text-white"
              )}
            >
              N4Cluster
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                scrolled={scrolled}
                isOpen={activeDropdown === item.label}
                onToggle={() => toggleDropdown(item.label)}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contact" size="sm">
              Request a Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled ? "text-navy-950 hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <MobileNav items={navItems} onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

function DesktopNavItem({
  item,
  scrolled,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  scrolled: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const textClass = scrolled
    ? "text-slate-700 hover:text-navy-950"
    : "text-white/80 hover:text-white";

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          textClass
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          textClass
        )}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="flex flex-col px-4 py-3 hover:bg-slate-50 transition-colors group"
              onClick={onToggle}
            >
              <span className="text-sm font-semibold text-navy-950 group-hover:text-cobalt-500 transition-colors">
                {child.label}
              </span>
              {child.description && (
                <span className="text-xs text-slate-500 mt-0.5">{child.description}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNav({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="px-4 py-4 space-y-1">
        {items.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-navy-950 rounded-lg hover:bg-slate-50"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-slate-400 transition-transform duration-200",
                      expandedItem === item.label && "rotate-180"
                    )}
                  />
                </button>
                {expandedItem === item.label && (
                  <div className="ml-3 pl-3 border-l border-slate-200 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-950 hover:bg-slate-50 rounded-lg"
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className="block px-3 py-2.5 text-sm font-semibold text-navy-950 rounded-lg hover:bg-slate-50"
                onClick={onClose}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="pt-4 pb-2 border-t border-slate-200 space-y-2">
          <Button href="/contact" className="w-full justify-center">
            Request a Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
