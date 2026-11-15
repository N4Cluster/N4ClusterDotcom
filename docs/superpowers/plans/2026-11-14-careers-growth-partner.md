# Careers Page: Restaurant Growth Partner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/careers` around the Restaurant Growth Partner role (independent contractor, commission only) with an on-page application form that emails each application to the N4Cluster inbox.

**Architecture:** The role's copy and pay figures live in one content module that computes the figures from `content/site/pricing.ts`. A new `parseCareerApplication` validator, an email formatter and a `POST /api/careers` route reuse the contact form's mail, rate-limit and honeypot plumbing. A new client form component posts to that route. The careers page is rewritten to layout C (short header, dark role block with the form, existing "Why join us" / "Introduce yourself" / CTA below), and the privacy policy gains a Job Applicants section.

**Tech Stack:** Next.js (App Router; read `node_modules/next/dist/docs/` before using any Next API, per CLAUDE.md), React, TypeScript, Tailwind v4 tokens from `app/globals.css`, Vitest (node environment; tests read source files or import modules, no React rendering), Gmail API via `lib/mail.ts`.

**Spec:** `docs/superpowers/specs/2026-11-14-careers-growth-partner-design.md`

## Global Constraints

- Branch `feat/careers-growth-partner` (already exists, has the spec). PR targets `master`, like #38 to #41; release 2026.11 already shipped to master.
- Pay figures are always **rounded down**, never up: $74 (from $74.25), $1.11 (from $1.1175), $0.74 (from $0.7425). The string `$1.12` must not appear anywhere in `app/`, `components/` or `content/`.
- The monthly part is "75% of the monthly service fee the restaurant actually pays". `$74` appears only as the example at the standard $99.
- The role block contains none of these words, case-insensitive: `hire`, `hiring`, `salary`, `wage`, `benefits`, `manager`, `shift`, `full-time`, `employee`, `employment`.
- No `Franklin` anywhere in the careers page or the careers content module.
- No "you could earn", totals, monthly-income examples or "up to $" figures.
- Applicants are contacted by phone call or email only: no SMS wording and no consent checkbox on the form.
- Form fields are exactly: full name, phone, email, city (all required) and sales experience (optional). No criminal-history, pay-history, date-of-birth or photo questions.
- Design rules from `DESIGN.md`: gold only for the single primary action and the 75% figure, Bricolage for headings and display numbers, Inter for the rest, 22px cards, 32px panels, `on-dark` on Ink surfaces and `on-light` on light cards nested inside them, placeholders and body text at 4.5:1 or better.
- The privacy policy's SMS wording must stay byte-identical (the Telnyx campaigns quote it), and all of `tests/sms-legal.test.ts` must stay green.
- Commits: conventional messages, no `Co-Authored-By` line.

## Review Focus

1. **Real-world phone formats** such as `(615) 555-0100`, `615.555.0100 ext 2` and `+44 20 7946 0958` must be accepted; text like `call me` or a 3-digit number must be rejected. Pinned in Task 2.
2. **Double-clicking "Send application"** must send one request, not two: the button is disabled while submitting. Pinned in Task 4.
3. **The mail send failing** (Gmail down or misconfigured) must return a 500 with a retry message, and the form must keep what the applicant typed. The 500 is pinned in Task 3; the kept input is checked by hand in Task 7, Step 3.
4. **Line breaks or header-breaking characters in name or city** must never reach the email subject as a line break. Long or multi-line sales experience keeps its newlines but is capped at `LIMITS.message`. Pinned in Task 2.
5. **Arriving from the ad with UTM parameters**: the email must carry the attribution so ad applicants can be told apart. Pinned in Task 2.

---

### Task 1: Growth Partner content and pay figures

**Files:**
- Create: `content/careers/growth-partner.ts`
- Test: `tests/careers-content.test.ts`

**Interfaces:**
- Consumes: `MONTHLY_FEE`, `PER_ORDER_FEE`, `DINER_FEE` from `content/site/pricing.ts`.
- Produces:
  - `PARTNER_SHARE = 0.75`, `PARTNER_MONTHS = 6`
  - `floorToCents(value: number): number`: rounds down to the cent, tolerant of float error (for example `0.75 * 1.49` must give `1.11`).
  - `formatUsd(value: number): string`: `"$74"` for whole dollars, `"$1.11"` otherwise.
  - `partnerPay: { serviceFeeAtStandard: string; perOrder: string; freeMonthPerOrder: string }`, which evaluates to `{ "$74", "$1.11", "$0.74" }`. `serviceFeeAtStandard` is rounded down to whole dollars.
  - `growthPartner`: the role copy below, as a typed object.

- [ ] **Step 1: Write the failing tests** in `tests/careers-content.test.ts`

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { floorToCents, formatUsd, growthPartner, partnerPay, PARTNER_MONTHS, PARTNER_SHARE } from "@/content/careers/growth-partner";

const BANNED = /\b(hire|hiring|salary|wage|benefits|manager|shift|full-time|employee|employment)\b/i;
const allCopy = JSON.stringify(growthPartner);

describe("Growth Partner pay figures", () => {
  it("are 75% for 6 months, rounded down", () => {
    expect(PARTNER_SHARE).toBe(0.75);
    expect(PARTNER_MONTHS).toBe(6);
    expect(floorToCents(0.75 * 1.49)).toBe(1.11);
    expect(floorToCents(0.75 * 0.99)).toBe(0.74);
    expect(partnerPay).toEqual({ serviceFeeAtStandard: "$74", perOrder: "$1.11", freeMonthPerOrder: "$0.74" });
    expect(formatUsd(74)).toBe("$74");
  });
  it("never shows the rounded-up per-order figure", () => {
    expect(allCopy).not.toContain("$1.12");
  });
  it("states the monthly share as a percentage of what the restaurant pays", () => {
    expect(growthPartner.pay[0]).toContain("75% of the monthly service fee the restaurant actually pays");
    expect(growthPartner.footnote).toContain("reduced monthly fee");
  });
  it("uses contractor language only, and names no launch city", () => {
    expect(allCopy).not.toMatch(BANNED);
    expect(allCopy).not.toMatch(/franklin/i);
    expect(allCopy).not.toMatch(/could earn|up to \$/i);
    expect(growthPartner.meta).toEqual(["Independent contractor", "Commission only", "No cap", "Open to anyone in the US"]);
  });
  it("computes figures from the pricing constants, not literals", () => {
    const src = readFileSync("content/careers/growth-partner.ts", "utf8");
    expect(src).toContain('from "@/content/site/pricing"');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/careers-content.test.ts`
Expected: FAIL, cannot resolve `@/content/careers/growth-partner`.

- [ ] **Step 3: Implement `content/careers/growth-partner.ts`**

Figures come from the pricing constants via `floorToCents`. The copy is fixed by the spec; interpolate `partnerPay` values into it:

```ts
export const growthPartner = {
  badge: "Now recruiting · Sales",
  title: "Restaurant Growth Partner",
  meta: ["Independent contractor", "Commission only", "No cap", "Open to anyone in the US"],
  headline: "Every order they take pays you.",
  shareFigure: "75%",
  shareCaption: "of what each restaurant you sign pays N4Cluster, for its first 6 months.",
  pay: [
    `Each month: 75% of the monthly service fee the restaurant actually pays, from its second month. That's ${partnerPay.serviceFeeAtStandard} a month at our standard $99.`,
    `Every order: +${partnerPay.perOrder}, 75% of the $0.50 order fee and the $0.99 Neighborhood fee.`,
    `Free first month: +${partnerPay.freeMonthPerOrder} per order, 75% of the $0.99 Neighborhood fee. Restaurants pay no monthly or order fee while they try N4Cluster.`,
  ],
  points: [
    "Sign independent restaurants in your own city",
    "Pitch training and sales materials provided",
    "You sign them, our team handles setup",
  ],
  arrangement: "Commission only, no base pay. You'll sign an independent contractor agreement that sets out the commission terms.",
  footnote: "Based on current pricing, subject to change. Some restaurants pay a reduced monthly fee, or one that steps up month by month to $99; your share is 75% of what they actually pay.",
} as const;
```

The literal `$99`, `$0.50` and `$0.99` in the copy may instead be built from `priceDisplay` / the constants; either passes.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run tests/careers-content.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add content/careers/growth-partner.ts tests/careers-content.test.ts
git commit -m "feat(careers): Growth Partner copy and pay figures from the pricing constants"
```

---

### Task 2: Application validation and email formatting

**Files:**
- Modify: `lib/validation.ts` (add `phone: 40` to `LIMITS`; add the parser after `parseContactSubmission`)
- Create: `lib/careers.ts`
- Test: `tests/careers-application.test.ts`

**Interfaces:**
- Consumes: `LIMITS`, `toSingleLine`, `isValidEmail`, `ParseResult` (existing, `lib/validation.ts`).
- Produces:
  - `interface CareerApplication { name: string; phone: string; email: string; city: string; experience: string; utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string; utm_term: string }`
  - `parseCareerApplication(body: unknown): ParseResult<CareerApplication>`. Request keys: `name`, `phone`, `email`, `city`, `experience`, `utm_*`. Errors, in this order: `"Name is required."`, `"A valid phone number is required."`, `"A valid email is required."`, `"City is required."`
  - `careerApplicationEmail(app: CareerApplication): { subject: string; body: string }` in `lib/careers.ts`.

- [ ] **Step 1: Write the failing tests** in `tests/careers-application.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { LIMITS, parseCareerApplication } from "@/lib/validation";
import { careerApplicationEmail } from "@/lib/careers";

const valid = { name: "Sam Ortiz", phone: "(615) 555-0100", email: "sam@example.com", city: "Austin, TX" };

describe("parseCareerApplication", () => {
  it("accepts the four required fields, experience optional", () => {
    const r = parseCareerApplication(valid);
    expect(r.ok && r.data.experience).toBe("");
  });
  it.each([["name", "Name is required."], ["phone", "A valid phone number is required."], ["email", "A valid email is required."], ["city", "City is required."]])(
    "rejects a missing %s", (field, error) => {
      expect(parseCareerApplication({ ...valid, [field]: "" })).toEqual({ ok: false, error });
    });
  it.each(["(615) 555-0100", "615.555.0100 ext 2", "+44 20 7946 0958", "6155550100"])("accepts phone %s", (phone) => {
    expect(parseCareerApplication({ ...valid, phone }).ok).toBe(true);
  });
  it.each(["call me", "123", "555-0100-0100-0100-0100"])("rejects phone %s", (phone) => {
    expect(parseCareerApplication({ ...valid, phone }).ok).toBe(false);
  });
  it("flattens header-breaking characters in single-line fields", () => {
    const r = parseCareerApplication({ ...valid, name: "Sam\r\nBcc: x@y.z", city: "Austin\nTX" });
    expect(r.ok && r.data.name).toBe("Sam Bcc: x@y.z");
    expect(r.ok && r.data.city).toBe("Austin TX");
  });
  it("keeps newlines in experience, strips NUL and caps the length", () => {
    const r = parseCareerApplication({ ...valid, experience: "Line 1\nLine 2\0" + "x".repeat(LIMITS.message) });
    expect(r.ok && r.data.experience.startsWith("Line 1\nLine 2x")).toBe(true);
    expect(r.ok && r.data.experience.length).toBe(LIMITS.message);
  });
  it("rejects a non-object body", () => {
    expect(parseCareerApplication(null).ok).toBe(false);
  });
});

describe("careerApplicationEmail", () => {
  const app = { ...valid, experience: "2 years selling POS", utm_source: "instagram", utm_medium: "paid", utm_campaign: "growth-partner", utm_content: "", utm_term: "" };
  it("names the applicant and city in a single-line subject", () => {
    const { subject } = careerApplicationEmail(app);
    expect(subject).toBe("Growth Partner application from Sam Ortiz – Austin, TX");
    expect(subject).not.toMatch(/[\r\n]/);
  });
  it("lists every field and the ad attribution", () => {
    const { body } = careerApplicationEmail(app);
    for (const s of ["Sam Ortiz", "(615) 555-0100", "sam@example.com", "Austin, TX", "2 years selling POS", "Source: instagram", "Campaign: growth-partner"]) expect(body).toContain(s);
  });
  it("says so when no experience was given", () => {
    expect(careerApplicationEmail({ ...app, experience: "" }).body).toContain("Sales experience: none given");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/careers-application.test.ts`
Expected: FAIL, `parseCareerApplication` is not exported.

- [ ] **Step 3: Implement `parseCareerApplication` in `lib/validation.ts`**

Mirror `parseContactSubmission`. Single-line fields use `readString` with `LIMITS.name` (name), `LIMITS.phone` (phone) and `LIMITS.shortField` (city). Experience follows the `message` handling: keep newlines, strip `\0`, cap at `LIMITS.message`. Phone is valid when it matches `/^\+?[\d\s().-]+(?:\s*(?:x|ext\.?)\s*\d{1,6})?$/i` and its main part has 7 to 15 digits. Add `phone: 40` to `LIMITS`.

- [ ] **Step 4: Implement `careerApplicationEmail` in `lib/careers.ts`**

The body starts with `Form: Restaurant Growth Partner application`, then `Name:`, `Phone:`, `Email:`, `City:` lines. Then `\nSales experience:\n<text>`, or `Sales experience: none given` when empty. The attribution block uses the same labels as `app/api/contact/route.ts` (`--- Attribution ---`, `Source:`, `Medium:`, `Campaign:`, `Content:`, `Term:`) and is included only when `utm_source` is set. The subject is exactly `Growth Partner application from {name} – {city}` (en dash).

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run tests/careers-application.test.ts tests/validation.test.ts`
Expected: PASS, with the existing validation tests still green.

- [ ] **Step 6: Commit**

```bash
git add lib/validation.ts lib/careers.ts tests/careers-application.test.ts
git commit -m "feat(careers): validate Growth Partner applications and format the notification"
```

---

### Task 3: `POST /api/careers` route

**Files:**
- Create: `app/api/careers/route.ts`
- Test: `tests/careers-route.test.ts`

**Interfaces:**
- Consumes: `parseCareerApplication` (Task 2), `careerApplicationEmail` (Task 2), `isRateLimited` and `isHoneypotFilled` (`lib/rate-limit.ts`), `sendMail`, `notificationRecipient` and `notificationSender` (`lib/mail.ts`).
- Produces: `POST(req: NextRequest): Promise<NextResponse>`, returning `{ ok: true }` (200), or `{ ok: false, error }` with 400, 429 or 500.

- [ ] **Step 1: Write the failing tests** in `tests/careers-route.test.ts`

Mock `@/lib/mail` with `vi.mock` so `sendMail` is a `vi.fn()` and the recipient and sender return fixed strings. Build requests with `new NextRequest("http://localhost/api/careers", { method: "POST", body: JSON.stringify(...), headers: { "x-forwarded-for": <unique ip per test> } })`.

```ts
it("emails a valid application with the applicant as reply-to", async () => {
  const res = await POST(req({ name: "Sam Ortiz", phone: "(615) 555-0100", email: "sam@example.com", city: "Austin, TX" }));
  expect(res.status).toBe(200);
  expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({ replyTo: "sam@example.com", subject: "Growth Partner application from Sam Ortiz – Austin, TX" }));
});
it("returns 400 with the parser's error for an invalid application", async () => {
  const res = await POST(req({ name: "", phone: "x", email: "a@b.co", city: "Austin" }));
  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({ ok: false, error: "Name is required." });
});
it("silently accepts a filled honeypot without sending", async () => {
  const res = await POST(req({ _hp_website: "spam" }));
  expect(res.status).toBe(200);
  expect(sendMail).not.toHaveBeenCalled();
});
it("returns 500 with a retry message when the mail send fails", async () => {
  sendMail.mockRejectedValueOnce(new Error("gmail down"));
  const res = await POST(req(validBody));
  expect(res.status).toBe(500);
  expect((await res.json()).error).toBe("Failed to send your application. Please try again later.");
});
it("rate limits after 5 requests from one IP", async () => { /* 6th POST from the same IP → 429 */ });
it("returns 400 for a body that isn't JSON", async () => { /* raw "not json" → 400 "Invalid request body." */ });
```

Clear the mock in `beforeEach`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/careers-route.test.ts`
Expected: FAIL, cannot resolve `@/app/api/careers/route`.

- [ ] **Step 3: Implement the route** by mirroring `app/api/contact/route.ts`, without ICP Finder

Rate-limit on the key `` `careers:${ip}` ``, so applicants and contact-form leads have separate budgets. Then: parse the JSON (400 `"Invalid request body."`), check the honeypot (200), run `parseCareerApplication` (400 with its error), then call `sendMail({ to: notificationRecipient(), from: notificationSender(), replyTo: app.email, ...careerApplicationEmail(app) })`. On a throw, `console.error` and return 500 `"Failed to send your application. Please try again later."`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run tests/careers-route.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add app/api/careers/route.ts tests/careers-route.test.ts
git commit -m "feat(careers): /api/careers emails each application to the inbox"
```

---

### Task 4: `CareerApplicationForm` component

**Files:**
- Create: `components/forms/CareerApplicationForm.tsx`
- Test: `tests/careers-form.test.ts` (reads the source, in the style of `tests/sms-page.test.ts`)

**Interfaces:**
- Consumes: `POST /api/careers` (Task 3) with the request keys from Task 2, plus `getUtmParams()` from `lib/utm.ts`.
- Produces: `export function CareerApplicationForm(): JSX.Element`, a client component with no props, styled for a white card.

- [ ] **Step 1: Write the failing tests**

```ts
const src = readFileSync("components/forms/CareerApplicationForm.tsx", "utf8");
it("is a client component posting to /api/careers", () => {
  expect(src.startsWith('"use client"')).toBe(true);
  expect(src).toContain('fetch("/api/careers"');
  expect(src).toContain("getUtmParams()");
  expect(src).toContain("_hp_website");
});
it("has exactly the five fields with the right autocomplete", () => {
  for (const s of ['id="name"', 'autoComplete="name"', 'id="phone"', 'type="tel"', 'autoComplete="tel"', 'id="email"', 'type="email"', 'id="city"', 'placeholder="City, State"', 'id="experience"']) expect(src).toContain(s);
  expect(src).not.toMatch(/type="checkbox"|consent|criminal|convict|salary|date of birth/i);
});
it("links the applicants privacy section and carries the equal-opportunity line", () => {
  expect(src).toContain('href="/privacy#applicants"');
  expect(src).toContain("N4Cluster considers all applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability or any other protected status.");
});
it("disables the button while sending and keeps input on error", () => {
  expect(src).toMatch(/disabled=\{status === "submitting"\}/);
  expect(src).toContain("Send application");
  expect(src).toContain("We'll call or email you.");
  expect(src).not.toMatch(/\bSMS\b|text you/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/careers-form.test.ts`
Expected: FAIL, ENOENT on the component file.

- [ ] **Step 3: Implement the component**

Follow `components/forms/ContactForm.tsx`: the same `inputClass`, `labelClass` and `errorClass` (light variant), honeypot markup and success panel. Copy:
- Labels: `Full name *`, `Phone *`, `Email *`, `City *`, `Sales experience`.
- Experience placeholder: `Any sales experience? Tell us briefly. None is fine too.`
- Button: `Send application`, or `Sending…` while submitting.
- Success panel: heading `Thanks, we've got your application.`, text `We'll call or email you.`
- Error: `Something went wrong. Please try again.`
- Under the button: `We use your details only to review your application. See our <a href="/privacy#applicants">Privacy Policy</a>.`, then the equal-opportunity sentence in muted small text.

Client-side required checks match the server messages from Task 2. Each field with an error gets `aria-invalid` and `aria-describedby` pointing at its error `<p>`. On error, the form state is left as it is (no reset). The submit body is `{ name, phone, email, city, experience, _hp_website, ...getUtmParams() }`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run tests/careers-form.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/forms/CareerApplicationForm.tsx tests/careers-form.test.ts
git commit -m "feat(careers): Growth Partner application form"
```

---

### Task 5: Rebuild `/careers` (layout C)

**Files:**
- Modify: `app/careers/page.tsx` (replace `HeroCentered` and the "Open roles" section; keep `FeatureGrid` "Why join us", the `#introduce-yourself` section and `CTASection` as they are)
- Test: `tests/careers-page.test.ts`

**Interfaces:**
- Consumes: `growthPartner` and `partnerPay` (Task 1), `CareerApplicationForm` (Task 4), `Container` and `Badge` (`components/ui`).
- Produces: the page. Section ids `growth-partner` (role block) and `introduce-yourself` (existing, unchanged).

- [ ] **Step 1: Write the failing tests**

```ts
const page = readFileSync("app/careers/page.tsx", "utf8");
const BANNED = /\b(hire|hiring|salary|wage|benefits|manager|shift|full-time|employee|employment)\b/i;
it("leads with a short header, then the role block with the form", () => {
  expect(page).toContain("Careers at N4Cluster");
  expect(page).toContain('href="#growth-partner"');
  expect(page).toContain('id="growth-partner"');
  expect(page.indexOf('id="growth-partner"')).toBeLessThan(page.indexOf("<FeatureGrid"));
  expect(page).toContain("<CareerApplicationForm />");
  expect(page).toContain("growthPartner.");
  expect(page).not.toContain("HeroCentered");
});
it("removes the four unadvertised full-time roles", () => {
  for (const role of ["Product Engineer", "Platform Designer", "Commerce Growth Lead", "Merchant Success Manager", "Open roles"]) expect(page).not.toContain(role);
});
it("keeps focus visible on the dark panel and the nested light card", () => {
  expect(page).toMatch(/on-dark/);
  expect(page).toMatch(/on-light/);
});
it("has no employee words in the role block, no launch city, no rounded-up figure", () => {
  const block = page.slice(page.indexOf('id="growth-partner"'), page.indexOf("<FeatureGrid"));
  expect(block).not.toMatch(BANNED);
  expect(page).not.toMatch(/franklin/i);
  expect(page).not.toContain("$1.12");
});
it("describes the role in the metadata", () => {
  expect(page).toContain("Restaurant Growth Partner");
  expect(page).toMatch(/description:[\s\S]*independent-contractor, commission-only/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/careers-page.test.ts`
Expected: FAIL (the page still has `HeroCentered` and the old roles).

- [ ] **Step 3: Implement the page**

- **Metadata:** title `Careers`; description `Join N4Cluster as a Restaurant Growth Partner: an independent-contractor, commission-only role signing independent restaurants in your own city.`
- **Header** on cream, `Container size="md"`, left-aligned: an `h1` reading `Careers at N4Cluster`, then the lead `We build direct ordering for independent restaurants at flat utility pricing, not commission. Right now we're looking for people to bring it to restaurants in their own city.`, then a text link `See the Restaurant Growth Partner role` to `#growth-partner`.
- **Role block:** `<section id="growth-partner" className="scroll-mt-24 ...">` containing a `bg-ink text-white rounded-[32px] on-dark` panel with a two-column grid at `lg`, stacked below that. The left column, in order:
  - `Badge variant="dark"` showing `growthPartner.badge`;
  - an `h2` with the title;
  - the meta items joined with ` · `;
  - the headline, at Bricolage display size;
  - `shareFigure` in gold Bricolage at display size, with `shareCaption` beside or below it;
  - `pay` as a list;
  - `points` as a check list using the `lucide-react` `Check` icon in gold;
  - `arrangement`;
  - `footnote` in small `text-white/70`.

  The right column is `<div className="bg-white text-ink rounded-[22px] p-6 sm:p-8 on-light">` with an `h3` reading `Apply` and `<CareerApplicationForm />`. An optional visual echo of the ad's payout ticket is the builder's call, under the DESIGN.md rules.
- Then the existing `FeatureGrid`, `#introduce-yourself` section and `CTASection`, unchanged. Remove the now-unused imports (`HeroCentered`, `SectionIntro` if unused).

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run tests/careers-page.test.ts tests/copy-rules.test.ts tests/site-structure.test.ts`
Expected: PASS. `copy-rules` scans `app/careers` and must stay green; `site-structure` still expects `/careers` to be absent from the footer, so don't add a footer link.

- [ ] **Step 5: Commit**

```bash
git add app/careers/page.tsx tests/careers-page.test.ts
git commit -m "feat(careers): lead /careers with the Growth Partner role and application form"
```

---

### Task 6: Privacy policy, Job Applicants section

**Files:**
- Modify: `app/privacy/page.tsx`. Add a TOC `<li><a href="#applicants">Job Applicants</a></li>` before the Contact Us entry. Insert the new section before `<h2 id="contact">`, rename `17. Contact Us` to `18. Contact Us`, and set `Last updated:` to the implementation date.
- Modify: `tests/sms-legal.test.ts` (the privacy `Last updated` expectation, around line 132, to the same date)
- Test: `tests/careers-privacy.test.ts`

**Interfaces:**
- Consumes: the `/privacy#applicants` link target used by Task 4.
- Produces: `<h2 id="applicants">17. Job Applicants</h2>`.

- [ ] **Step 1: Write the failing test**

```ts
const flat = readFileSync("app/privacy/page.tsx", "utf8").replace(/\s+/g, " ");
it("has a Job Applicants section with the agreed terms", () => {
  expect(flat).toContain('<h2 id="applicants">17. Job Applicants</h2>');
  expect(flat).toContain('<a href="#applicants">Job Applicants</a>');
  expect(flat).toContain('<h2 id="contact">18. Contact Us</h2>');
  for (const s of ["name, phone number, email address, city", "only to review your application", "by phone call or email", "do not send text messages to applicants", "keep applications for 12 months", "contact@n4cluster.com"]) expect(flat).toContain(s);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/careers-privacy.test.ts`
Expected: FAIL.

- [ ] **Step 3: Add the section.** Exact copy:

> If you apply for a role through our careers page, we collect your name, phone number, email address, city, any sales experience you choose to share, and the campaign details (UTM parameters) of the link that brought you to the page. We use this information only to review your application and to contact you about it by phone call or email; we do not send text messages to applicants. We do not sell applicant information or share it with third parties for their marketing. We keep applications for 12 months and then delete them. You can ask us to delete yours sooner by emailing contact@n4cluster.com.

- [ ] **Step 4: Update the date expectation in `tests/sms-legal.test.ts` and run all the legal tests**

Run: `npx vitest run tests/careers-privacy.test.ts tests/sms-legal.test.ts`
Expected: PASS. If the "not contradicted by a broader sharing clause" test fails, reword the new section; don't edit that test.

- [ ] **Step 5: Commit**

```bash
git add app/privacy/page.tsx tests/sms-legal.test.ts tests/careers-privacy.test.ts
git commit -m "feat(privacy): Job Applicants section for the careers application form"
```

---

### Task 7: Full verification, visual check and PR

**Files:** none new.

- [ ] **Step 1: Run the whole suite, typecheck and lint**

Run: `npx vitest run && npx tsc --noEmit && npx eslint .`
Expected: all green, except `dealsDisclosureMatchesTheBff`. That test fails on `master` too, because it reads the local BFF checkout. Report it; don't change it.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: the build succeeds. A Google Fonts fetch error is a network flake; re-run once.

- [ ] **Step 3: Check the page in the browser.** Run `npx next dev -p 3123`, open `/careers` at desktop width and at 390px:
  - the header and role block show first;
  - on mobile the form sits below the details;
  - the 75% is gold and the button is gold, and nothing else is;
  - Tab order reaches every field and the focus ring is visible on the dark panel and the white card;
  - an empty submit shows inline errors;
  - with the network blocked in DevTools, a submit shows the error and keeps every typed value;
  - `/privacy#applicants` scrolls to the new section.

  Don't send a real application from the dev server unless the user asks: it emails the live inbox.

- [ ] **Step 4: Stop the dev server, restore `CLAUDE.md` if `next dev` rewrote it, push and open the PR to `master`.** The PR body lists:
  - what changed;
  - the pay figures and their rounding;
  - the four removed roles;
  - the privacy section;
  - that the recruiting ad still says "$74/mo" and "$1.12", and should say "75% of the monthly service fee" and "$1.11".

  End the body with the Claude Code attribution line.
