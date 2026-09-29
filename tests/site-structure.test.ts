import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { hasDarkHero } from "@/content/site/theme";
import { resources } from "@/content/pages/resources";
import { navItems } from "@/content/site/navigation";
import { footerLinks } from "@/content/site/footer";
import { siteConfig } from "@/content/site/settings";

describe("hasDarkHero", () => {
  it("is true for the routes that actually render a dark hero", () => {
    for (const route of [
      "/",
      "/about",
      "/careers",
      "/case-studies",
      "/contact",
      "/faq",
      "/how-it-works",
      "/integrations",
      "/mission",
      "/n4logic",
      "/partners",
      "/platform",
      "/pricing",
      "/resources",
      "/roi-calculator",
      "/solutions",
    ]) {
      expect(hasDarkHero(route), `${route} has a dark hero`).toBe(true);
    }
  });

  it("is true for resource articles, which open on a gradient hero", () => {
    expect(hasDarkHero("/resources/merchant-owned-commerce")).toBe(true);
  });

  it("is false for the legal pages, which open on white", () => {
    // These render `bg-white` under the header; the transparent white-text
    // treatment made the whole nav invisible there until the user scrolled.
    for (const route of ["/privacy", "/terms", "/cookies"]) {
      expect(hasDarkHero(route), `${route} opens on a light surface`).toBe(false);
    }
  });

  it("defaults to the safe treatment for an unregistered or unknown route", () => {
    expect(hasDarkHero("/a-page-added-later")).toBe(false);
    expect(hasDarkHero(null)).toBe(false);
    expect(hasDarkHero("")).toBe(false);
  });

  it("normalises a trailing slash", () => {
    expect(hasDarkHero("/contact/")).toBe(true);
    expect(hasDarkHero("/")).toBe(true);
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const paths = entries.map((entry) => entry.url.replace(siteConfig.url, ""));

  it("advertises only resources that actually render", () => {
    // The article route calls notFound() when a resource has no body, so a
    // hand-maintained list can advertise URLs that 404.
    const renderable = resources
      .filter((resource) => resource.body && resource.body.length > 0)
      .map((resource) => resource.href);
    const advertised = paths.filter((path) => path.startsWith("/resources/"));
    expect(advertised.sort()).toEqual(renderable.sort());
  });

  it("includes the mission page", () => {
    expect(paths).toContain("/mission");
  });

  it("contains no duplicates", () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every entry an absolute URL under the configured origin", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(siteConfig.url)).toBe(true);
    }
  });

  it("omits lastModified rather than claiming every page changed at build time", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeUndefined();
    }
  });
});

describe("navigation", () => {
  /** Every internal path the nav and footer point at, anchors stripped. */
  function internalPaths(): string[] {
    const found: string[] = [];
    for (const item of navItems) {
      found.push(item.href);
      for (const child of item.children ?? []) found.push(child.href);
    }
    for (const group of footerLinks) {
      for (const link of group.links) found.push(link.href);
    }
    return found
      .filter((href) => href.startsWith("/"))
      .map((href) => href.split("#")[0]);
  }

  it("links only to routes the sitemap knows about", () => {
    const known = new Set(sitemap().map((e) => e.url.replace(siteConfig.url, "") || "/"));
    for (const path of internalPaths()) {
      const normalised = path === "" ? "/" : path;
      expect(known.has(normalised), `${normalised} should be a real route`).toBe(true);
    }
  });

  it("surfaces the mission page under Company in both nav and footer", () => {
    const company = navItems.find((item) => item.label === "Company");
    expect(company?.children?.some((child) => child.href === "/mission")).toBe(true);

    const footerCompany = footerLinks.find((group) => group.heading === "Company");
    expect(footerCompany?.links.some((link) => link.href === "/mission")).toBe(true);
  });
});
