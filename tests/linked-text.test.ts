import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LinkedText } from "@/components/legal/LinkedText";

describe("LinkedText", () => {
  it("links URLs, the support address and the help line without changing the text", () => {
    const text =
      "Email contact@n4cluster.com, call +1 629-290-1191, or see (https://www.n4cluster.com/privacy).";
    const html = renderToStaticMarkup(createElement(LinkedText, { text }));

    expect(html).toContain('<a href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>');
    expect(html).toContain('<a href="tel:+16292901191">+1 629-290-1191</a>');
    expect(html).toContain(
      '<a href="https://www.n4cluster.com/privacy">https://www.n4cluster.com/privacy</a>'
    );
    expect(html.replace(/<[^>]+>/g, "")).toBe(text);
  });
});
