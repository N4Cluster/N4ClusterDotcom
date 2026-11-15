import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const flat = readFileSync("app/privacy/page.tsx", "utf8").replace(/\s+/g, " ");

describe("privacy policy Job Applicants section", () => {
  it("has a Job Applicants section with the agreed terms", () => {
    expect(flat).toContain('<h2 id="applicants">17. Job Applicants</h2>');
    expect(flat).toContain('<a href="#applicants">Job Applicants</a>');
    expect(flat).toContain('<h2 id="contact">18. Contact Us</h2>');
    for (const s of [
      "name, phone number, email address, city",
      "only to review your application",
      "by phone call or email",
      "do not send text messages to applicants",
      "keep applications for 12 months",
      "contact@n4cluster.com",
    ]) {
      expect(flat).toContain(s);
    }
  });

  it("points the rights section at Contact Us (Section 18)", () => {
    expect(flat).toContain("listed in Section 18");
    expect(flat).not.toContain("listed in Section 17");
  });
});
