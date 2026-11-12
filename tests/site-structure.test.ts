import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { resources } from "@/content/pages/resources";
import { navItems } from "@/content/site/navigation";
import { footerLinks } from "@/content/site/footer";
import { siteConfig } from "@/content/site/settings";

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

  it("has no /n4logic or /case-studies route", () => {
    const paths = sitemap().map((e) => e.url.replace(siteConfig.url, ""));
    expect(paths).not.toContain("/n4logic");
    expect(paths).not.toContain("/case-studies");
    expect(existsSync("app/n4logic")).toBe(false);
  });

  it("never links to /n4logic or /case-studies outside legal pages", () => {
    const skip = /^(app\/(privacy|terms|cookies|sms)\/|content\/legal\/|app\/case-studies\/page\.tsx$)/;
    const files = ["app", "components", "content"].flatMap((d) => allFiles(d));
    for (const file of files.filter((f) => !skip.test(f))) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toContain("/n4logic");
      expect(text, file).not.toContain("/case-studies");
    }
  });

  it("uses a flat header nav", () => {
    expect(navItems.map((i) => i.label)).toEqual(["Product", "Pricing", "How it works", "Savings", "FAQ"]);
  });

  it("puts the expected links in the footer groups", () => {
    const hrefs = (h: string) => footerLinks.find((g) => g.heading === h)?.links.map((l) => l.href) ?? [];
    expect(footerLinks.map((g) => g.heading)).toEqual(["Product", "Resources", "Company"]);
    expect(hrefs("Company")).toEqual(expect.arrayContaining(["/mission", "/solutions", "/partners", "/careers"]));
    expect(hrefs("Product")).toContain("/integrations");
  });
});

function allFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    return e.isDirectory() ? allFiles(path) : [path];
  });
}

describe("text-in keyword", () => {
  // No campaign covers an inbound "Text DEMO" keyword, so carrier review flags it.
  function sourceFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return sourceFiles(path);
      return /\.tsx?$/.test(e.name) ? [path] : [];
    });
  }

  it("is not offered anywhere on the site", () => {
    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toContain("smsKeyword");
      expect(text, file).not.toContain("Text DEMO");
    }
    expect("smsKeyword" in siteConfig.contact).toBe(false);
  });
});
