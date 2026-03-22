export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    children: [
      {
        label: "Platform Overview",
        href: "/platform",
        description: "The connected operating layer for local commerce",
      },
      {
        label: "N4Sync",
        href: "/platform#n4sync",
        description: "Delivery coordination and 30-min SLA",
      },
      {
        label: "AI Growth Autopilot",
        href: "/n4logic",
        description: "N4Logic — demand, campaigns, and risk protection",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Connect your existing tools and workflows",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Independent Restaurants",
        href: "/solutions#restaurants",
        description: "Own your orders. Keep your margin.",
      },
      {
        label: "Multi-location Brands",
        href: "/solutions#multi-location",
        description: "One platform across every location",
      },
      {
        label: "Delivery-first Operators",
        href: "/solutions#delivery",
        description: "Commission-free delivery with SLA accountability",
      },
      {
        label: "Ecosystem Partners",
        href: "/solutions#partners",
        description: "POS, logistics, and integration partnerships",
      },
    ],
  },
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "All Resources",
        href: "/resources",
        description: "Insights on local commerce",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Pilot stories and proof points",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions answered",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About",
        href: "/about",
        description: "Why N4Cluster exists",
      },
      {
        label: "Partners",
        href: "/partners",
        description: "Ecosystem collaboration",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join the team",
      },
    ],
  },
];
