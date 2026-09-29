import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site/settings";
import { resources } from "@/content/pages/resources";

const staticRoutes = [
  "",
  "/platform",
  "/solutions",
  "/how-it-works",
  "/integrations",
  "/n4logic",
  "/pricing",
  "/roi-calculator",
  "/resources",
  "/case-studies",
  "/about",
  "/mission",
  "/partners",
  "/contact",
  "/faq",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  /**
   * Derived from the same source the article route builds its params from, and
   * filtered on the same condition, so the sitemap can only ever advertise a
   * resource that actually renders. A hand-maintained list drifts into
   * advertising URLs that 404.
   */
  const resourceRoutes = resources
    .filter((resource) => resource.body && resource.body.length > 0)
    .map((resource) => resource.href);

  const allRoutes = [...staticRoutes, ...resourceRoutes];

  // `lastModified` is deliberately omitted: the only value available here is the
  // build time, which would claim every page changed on every deploy. An absent
  // value is more useful to a crawler than a uniformly false one.
  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/resources/") ? 0.6 : 0.8,
  }));
}
