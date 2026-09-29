import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { mission, values, demoCta, founderQuote } from "@/content/company";
import { faqItems } from "@/content/pages/faq";
import { priceDisplay } from "@/content/site/pricing";

const read = (path: string) => readFileSync(path, "utf8");

describe("canonical mission", () => {
  it("is the exact specified sentence", () => {
    expect(mission).toBe(
      "We help neighborhood restaurants grow profitably, build lasting customer relationships, and stay in control of their business."
    );
  });

  it("carries no price, date, or product module name", () => {
    // The mission must outlive a price change or a module rename.
    for (const forbidden of ["$", "99", "0.50", "N4Sync", "N4Logic", "2026"]) {
      expect(mission).not.toContain(forbidden);
    }
  });
});

describe("canonical values", () => {
  it("has five values with the specified stable ids, in order", () => {
    expect(values.map((v) => v.id)).toEqual([
      "ownership",
      "growth",
      "simplicity",
      "trust",
      "neighborhood",
    ]);
  });

  it("gives each value an operational body, not a one-word label", () => {
    for (const value of values) {
      expect(value.title.length, value.id).toBeGreaterThan(10);
      // A value that says nothing about behaviour is not a commitment.
      expect(value.body.split(" ").length, value.id).toBeGreaterThan(15);
    }
  });

  it("scopes the commission claim to N4Cluster's own sales commission", () => {
    const growth = values.find((v) => v.id === "growth");
    expect(growth?.body).toContain("zero N4Cluster sales commission");
  });
});

describe("shared source is actually shared", () => {
  // Before content/company.ts, /mission and /about stated different missions and
  // two unrelated sets of five principles.
  it("/mission and /about both render the canonical source", () => {
    for (const page of ["app/mission/page.tsx", "app/about/page.tsx"]) {
      expect(read(page), page).toContain('from "@/content/company"');
    }
  });

  it("/about no longer defines its own principles array", () => {
    expect(read("app/about/page.tsx")).not.toContain("const principles");
  });

  it("the demo CTA label is used rather than retyped on the homepage", () => {
    expect(demoCta.label).toBe("Request your demo storefront");
    expect(read("app/page.tsx")).toContain("demoCta.label");
  });

  it("the calculator reads its rates from the pricing source", () => {
    const roi = read("lib/roi.ts");
    expect(roi).toContain('from "@/content/site/pricing"');
    // No duplicate hardcoded fee constants competing with the source.
    expect(roi).not.toMatch(/const\s+MONTHLY_FEE\s*=/);
    expect(read("app/roi-calculator/ROICalculator.tsx")).not.toMatch(
      /const\s+PER_ORDER_FEE\s*=/
    );
  });
});

describe("founder statement", () => {
  it("reproduces the supplied wording and attribution exactly", () => {
    expect(founderQuote.quote).toBe(
      "We built the tech the big platforms have, then priced it so a neighborhood restaurant actually grows on it."
    );
    expect(founderQuote.name).toBe("Prerana Shah");
    expect(founderQuote.role).toBe("Founder");
  });

  it("is presented as a quotation with attribution, used once", () => {
    const page = read("app/mission/page.tsx");
    expect(page).toContain("founderQuote.quote");
    expect(page.match(/founderQuote\.quote/g)?.length).toBe(1);
  });
});

describe("FAQ commercial accuracy", () => {
  const find = (fragment: string) =>
    faqItems.find((item) => item.question.toLowerCase().includes(fragment));

  it("answers the complementary-channel question", () => {
    const item = find("delivery apps");
    expect(item).toBeDefined();
    expect(item?.answer).toContain("You can keep the delivery apps");
  });

  it("puts that answer where /contact will show it (first five)", () => {
    // /contact renders faqItems.slice(0, 5).
    const index = faqItems.findIndex((i) =>
      i.question.toLowerCase().includes("delivery apps")
    );
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(5);
  });

  it("never promises staff will not be asked about the diner fee", () => {
    for (const item of faqItems) {
      expect(item.answer, item.question).not.toMatch(
        /never handle|never field|never touch a single question/i
      );
    }
  });

  it("does not answer the launch-speed question with a bare deadline", () => {
    const item = find("go live");
    expect(item?.answer.startsWith("We'll confirm setup steps and timing")).toBe(true);
  });

  it("names what the trial waives instead of claiming everything is free", () => {
    const item = find("try it free");
    expect(item?.answer).toContain("waives N4Cluster's merchant platform fee");
    expect(item?.answer).toMatch(/card processing still applies/i);
  });

  it("states that card processing is separate wherever the fees are summarised", () => {
    const item = find("what do the");
    expect(item?.answer).toMatch(/card processing/i);
  });

  it("scopes every commission claim to N4Cluster", () => {
    for (const item of faqItems) {
      const text = item.answer;
      // An unqualified "no commission" reads as "no percentage fees at all".
      if (/commission/i.test(text) && /zero|no /i.test(text)) {
        expect(text, item.question).toMatch(
          /zero N4Cluster sales commission|N4Cluster sales commission/
        );
      }
    }
  });
});

describe("fee claims across merchant acquisition copy", () => {
  const pages = [
    "app/page.tsx",
    "app/pricing/page.tsx",
    "app/mission/page.tsx",
    "app/roi-calculator/ROICalculator.tsx",
  ];

  it("no page promises free or unconditional 30-minute delivery", () => {
    for (const page of pages) {
      expect(read(page), page).not.toMatch(/30-minute delivery, on us/);
    }
  });

  it("no page claims the merchant keeps every dollar", () => {
    for (const page of pages) {
      expect(read(page), page).not.toMatch(/every dollar of margin/i);
    }
  });

  it("the mission page shows the trial scope and the separate charges", () => {
    const page = read("app/mission/page.tsx");
    expect(page).toContain("Card processing and any courier charges are separate");
    expect(page).toContain("waives N4Cluster merchant platform and per-order fees");
    expect(page).toContain("Zero N4Cluster sales commission");
  });

  it("quotes the fees from the single pricing source", () => {
    expect(priceDisplay.merchantFees).toBe("$99/month + $0.50 per order");
    expect(read("app/mission/page.tsx")).toContain("priceDisplay");
  });
});
