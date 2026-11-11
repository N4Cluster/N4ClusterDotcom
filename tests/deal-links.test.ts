import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { GET } from "@/app/r/[slug]/route";
import { dealLinks } from "@/content/site/deal-links";

const get = (slug: string) =>
  GET(new Request("https://www.n4cluster.com/r/x"), { params: Promise.resolve({ slug }) });

describe("/r/[slug] deal links", () => {
  it("redirects ppg with a 302 to its storefront dish", async () => {
    const res = await get("ppg");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(
      "https://pastaandpitagrill.com/en/menu/entrees/beef-chicken-or-mixed-gyro-plate",
    );
  });

  it("redirects every registered slug to its target", async () => {
    for (const [slug, target] of Object.entries(dealLinks)) {
      const res = await get(slug);
      expect(res.status, slug).toBe(302);
      expect(res.headers.get("location"), slug).toBe(target);
    }
  });

  it("returns 404 for unknown or malformed slugs", async () => {
    for (const slug of [
      "nope",
      "PPG",
      "p",
      "ppg/x",
      "../ppg",
      "ppg ",
      "ppg_gyro",
      "a".repeat(49),
      "",
      // Object.prototype keys must not resolve to a redirect.
      "constructor",
      "__proto__",
    ]) {
      const res = await get(slug);
      expect(res.status, JSON.stringify(slug)).toBe(404);
      expect(res.headers.get("location")).toBeNull();
    }
  });

  it("points only at https:// item-level storefront URLs, never a shortener or this site", () => {
    expect(Object.keys(dealLinks).length).toBeGreaterThan(0);
    for (const [slug, target] of Object.entries(dealLinks)) {
      expect(slug).toMatch(/^[a-z0-9-]{2,48}$/);
      expect(target.startsWith("https://"), target).toBe(true);
      const url = new URL(target);
      expect(url.protocol, target).toBe("https:");
      expect(url.hostname, target).not.toMatch(/(^|\.)n4cluster\.com$/);
      expect(url.hostname, target).not.toMatch(
        /^(bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|is\.gd|buff\.ly|rebrand\.ly|cutt\.ly)$/,
      );
      expect(url.pathname, target).toMatch(/^\/[a-z]{2}\/menu\/[a-z0-9-]+\/[a-z0-9-]+$/);
      expect(url.search + url.hash, target).toBe("");
    }
  });

  it("is kept out of search by robots.txt", () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];
    expect(list.some((r) => [r.disallow].flat().includes("/r/"))).toBe(true);
  });
});
