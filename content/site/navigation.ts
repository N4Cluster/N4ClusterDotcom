export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Product", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Savings", href: "/roi-calculator" },
  { label: "FAQ", href: "/faq" },
];
