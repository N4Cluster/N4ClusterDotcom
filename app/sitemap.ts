import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/platform",
    "/solutions",
    "/how-it-works",
    "/integrations",
    "/n4logic",
    "/pricing",
    "/resources",
    "/case-studies",
    "/about",
    "/partners",
    "/contact",
    "/faq",
    "/careers",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const resourceRoutes = [
    "/resources/merchant-owned-commerce",
    "/resources/infrastructure-vs-marketplace",
    "/resources/orchestration-in-local-commerce",
    "/resources/ai-for-operators",
    "/resources/neighborhood-demand",
    "/resources/local-commerce-stack",
  ];

  const allRoutes = [...staticRoutes, ...resourceRoutes];

  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/resources/") ? 0.6 : 0.8,
  }));
}
