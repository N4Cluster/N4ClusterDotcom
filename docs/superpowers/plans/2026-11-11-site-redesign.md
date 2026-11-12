# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every page of n4cluster.com in the warm cream/navy/gold system from the designer mockup, rebuild the homepage to the mockup, and apply the owner's copy decisions sitewide.

**Architecture:** Tokens live in `app/globals.css` `@theme`; shared UI primitives (`components/ui/*`) and layout (`components/layout/*`) are restyled once so pages inherit the look. Copy facts stay in the existing single sources under `content/`, and a sitewide guard test enforces the copy rules. The homepage gets new section components under `components/home/`.

**Tech Stack:** Next 16 App Router, React 19, Tailwind v4 (`@theme`), `next/font/google`, `next/image`, `lucide-react`, Vitest (node environment, no DOM).

**Spec:** `docs/superpowers/specs/2026-11-11-site-redesign-design.md`. Read it before any task. Visual reference: `docs/design/homepage-mockup/Main.dc.html` (exact px values, colors, radii, shadows are in its inline styles); view the rendered original at `~/Documents/N4Cluster/N4cluster.com/Homepage-html/` via `python3 -m http.server`.

**Worktree:** `/Users/prerna/IdeaProjects/N4ClusterDotcom/.worktrees/site-redesign`, branch `feat/site-redesign`, PR into `release/2026.11`.

## Global Constraints

- Every task ends green on: `npm test && npm run typecheck && npm run lint`. Tasks that change pages also run `npm run build`.
- No new runtime dependencies. Bricolage Grotesque comes from `next/font/google` (self-hosted at build; CSP has no external font origin).
- Images are self-hosted under `public/` and rendered with `next/image` (CSP `img-src 'self'`).
- Colors: cream `#F7F3EA`, cream-2 `#F2EEE4`, cream-3 `#E8E1D2`, line `#E4DCCB`, ink `#0F1A3A`, ink-2 `#26335E`, ink-3 `#3A4570`, muted `#5A6080`, muted-2 `#4A5170`, gold `#F4B33E`, green `#1F7A4D`, green-deep `#155A38`, green-tint `#EAF5EE`, red `#B8371F`, white `#FFFFFF`. Teal appears only inside the logo SVG.
- Type: headings Bricolage Grotesque; body Inter.
- WCAG 2.1 AA: body text ≥ 4.5:1, large text ≥ 3:1, keyboard reachable, `prefers-reduced-motion` stops the marquee.
- Copy (verbatim from spec; never reintroduce the "Never say" column): "No commission, ever." · "Stop paying 30% to sell your own food." · "30 days free, then month-to-month. Cancel with 30 days' written notice." · "Your customer data is yours — we'll send you a copy whenever you ask." · "Live in days. Not quarters." · "We scope the exact steps and timing for your restaurant before you commit." · "Call or text (629) 290-1191 — a founder answers." · email `contact@n4cluster.com` · Log in → `https://merchant.n4cluster.com/merchant/signin`.
- Forbidden on marketing pages (legal pages `/privacy`, `/terms`, `/cookies`, `/sms` are exempt and their text is not edited): `cancel anytime`, `export anytime`, `exportable`, `N4Sync`, `N4Logic`, `Neighborhood Hub`, `contacts@`, `demo@n4cluster`, `Text DEMO`, `Franklin & Columbia`, `zero N4Cluster sales commission`.
- Fee figures come from `content/site/pricing.ts`; competitor figures ($300–500, up to $12.00 / 20–30%) are allowed with their "vary by provider" footnote.
- Stock photos are atmosphere only — never captioned or alt-texted as a named person, owner, customer or the team.
- Commit after each task with the session attribution trailer.

## Review Focus

1. **Phone-width layouts (390px)** — every section, especially the hero order card, comparison table and calculator, must stack with no horizontal page scroll. Pinned by the visual check step in Tasks 6–10 (`document.documentElement.scrollWidth <= 390`).
2. **Restaurant-name prefill with hostile or odd input** (`?restaurant=` empty, repeated, 5,000 chars, `<script>`) — must prefill a trimmed, length-capped plain string or nothing. Pinned by `tests/prefill.test.ts` in Task 6.
3. **Calculator edge inputs** (0 orders, max sliders, each rate chip) — no NaN, negative savings shown as $0, uses `calculateRoi`. Pinned by `tests/home-savings.test.ts` in Task 8.
4. **Copy drift on a page nobody re-read** (`/solutions`, `/careers`, resource articles) — the sitewide guard test in Task 11 scans every non-legal source file.
5. **Removed routes still linked** (`/n4logic`, `/case-studies`) from nav, footer, sitemap, or in-page links — pinned in Task 3 tests.

---

### Task 1: Design tokens, fonts, logo and photo assets

**Files:**
- Modify: `app/globals.css` (`@theme` palette, fonts, radius; `body` background/color; heading color; `::selection`; `:focus-visible` outline → ink; keep existing utility classes compiling but remove `.gradient-cobalt`-style utilities only once no file uses them — leave them for Task 11 if still referenced)
- Modify: `app/layout.tsx` (load `Bricolage_Grotesque` with `variable: "--font-bricolage"`, weights 600/700/800; add to `<html className>`; drop `N4Sync`/`N4Logic` from `metadata.keywords`)
- Create: `public/brand/n4cluster-mark.svg` (copy of `docs/design/logo/n4cluster-mark.svg`, unmodified)
- Create: `app/icon.svg` (same file — Next serves it as favicon)
- Modify: `app/opengraph-image.tsx` (cream background, mark + "N4Cluster" + "Stop paying 30% to sell your own food.")
- Create: `public/images/stock/*.jpg` — copy the 17 mockup photos with semantic names (e.g. `pasta-penne.jpg`, `cafe-counter.jpg`); keep a `public/images/stock/README.md` mapping new name → original hash and noting "stock, atmosphere only".
- Create: `lib/contrast.ts`, `tests/design-tokens.test.ts`

**Interfaces:**
- Produces: Tailwind colors `cream`, `cream-2`, `cream-3`, `line`, `ink`, `ink-2`, `ink-3`, `muted`, `muted-2`, `gold`, `green`, `green-deep`, `green-tint`, `red` (as `--color-<name>`); fonts `font-display` (Bricolage) and `font-sans` (Inter); `contrastRatio(hexA: string, hexB: string): number` in `lib/contrast.ts`; `/brand/n4cluster-mark.svg`; stock photos at `/images/stock/<name>.jpg`.

- [ ] **Step 1: Write the failing test** `tests/design-tokens.test.ts`:
  - `contrastRatio("#000000", "#FFFFFF")` ≈ 21 (toBeCloseTo, 1); `contrastRatio("#777777", "#FFFFFF")` ≈ 4.48 (toBeCloseTo, 1).
  - Parses `app/globals.css` and expects `--color-cream: #F7F3EA`, `--color-ink: #0F1A3A`, `--color-gold: #F4B33E` (case-insensitive).
  - AA pairs, each `>= 4.5`: ink on cream, ink-3 on cream, muted on cream, muted on white, white on ink, ink on gold, green on green-tint, red on white, green on white. If a mockup value fails, **adjust the token** (darken the text color minimally) and note the change in the test comment — do not lower the threshold.
- [ ] **Step 2:** `npx vitest run tests/design-tokens.test.ts` → FAIL (module/tokens missing).
- [ ] **Step 3:** Implement `contrastRatio` (WCAG relative luminance) and the tokens/fonts/assets above.
- [ ] **Step 4:** `npx vitest run tests/design-tokens.test.ts` → PASS; then `npm test && npm run typecheck && npm run lint && npm run build` → all pass.
- [ ] **Step 5: Commit** `feat(design): cream/navy/gold tokens, Bricolage, logo mark and stock photos`

### Task 2: Content sources carry the copy decisions

**Files:**
- Modify: `content/site/settings.ts` — `tagline: "Commission-free online ordering for neighborhood restaurants"`; new `description` without module names; remove `subBrands`; `contact` becomes `{ email: "contact@n4cluster.com", phone: "(629) 290-1191", phoneHref: "tel:+16292901191", founderLine: "Call or text (629) 290-1191 — a founder answers." }`; add `loginUrl: "https://merchant.n4cluster.com/merchant/signin"`. Fix every consumer of `demoEmail`/`pressEmail`/`subBrands` (grep).
- Modify: `content/company.ts` — `demoCta = { label: "Get a free demo", href: "/contact" }`; add `heroCta = { label: "Build my demo storefront", href: "/contact" }`; `values` "ownership" body says data is the restaurant's and a copy is sent on request (no "exportable"); "growth" body uses "No commission, ever." (keep each body > 15 words).
- Modify: `content/site/pricing.ts` — `feeQualifiers.commission: "No commission, ever. Card processing and any courier charges are separate."`; add `priceDisplay.cancel: "Month-to-month. Cancel with 30 days' written notice."`; update the comment that cites "Section 8".
- Modify: `content/pages/faq.ts` — the go-live answer starts "Live in days. Not quarters." then the scoping qualifier; cancel answer uses `priceDisplay.cancel` wording; data answer uses the copy-on-request sentence; add the mockup's five homepage questions if not present ("Is it really commission-free?", "What does my customer pay?", "Do I have to quit DoorDash or Uber Eats?" — may merge with the existing delivery-apps item, "I don't have a website. Is that a problem?", "What if I want to cancel?"); keep the delivery-apps item in the first five; export a `homeFaqIds` list (or flag) selecting the five shown on the homepage.
- Modify: `tests/company-content.test.ts` — replace the scoped-commission assertions with: growth value contains "No commission, ever."; the "Is it really commission-free?" answer contains "card processing" and "$38.04"; no FAQ answer contains "zero N4Cluster sales commission"; go-live answer starts "Live in days."; trial answer still matches `/card processing still applies/i`; `demoCta.label === "Get a free demo"`. Mission-page assertions move to Task 10 (leave them, they still pass until then).

**Interfaces:**
- Produces: `siteConfig.contact.email`, `siteConfig.contact.founderLine`, `siteConfig.loginUrl`, `demoCta`, `heroCta`, `priceDisplay.cancel`, `feeQualifiers.commission` (new text), `faqItems`, `homeFaqItems` (the five, in mockup order).

- [ ] **Step 1:** Update `tests/company-content.test.ts` as above → `npx vitest run tests/company-content.test.ts` FAILS.
- [ ] **Step 2:** Make the content changes; fix consumers so `npm run typecheck` passes.
- [ ] **Step 3:** `npm test && npm run typecheck && npm run lint` → PASS.
- [ ] **Step 4: Commit** `feat(copy): owner-approved commission, cancel, data and contact wording in content sources`

### Task 3: Route removals and information architecture

**Files:**
- Delete: `app/n4logic/` (no redirect — the URL 404s by owner decision).
- Modify: `app/case-studies/page.tsx` — keep the file but make the route redirect: `redirect("/")` from `next/navigation` (temporary) with a comment "hidden until Pasta and Pita Grill's story is supplied — see spec". Remove its current pilot content.
- Modify: `app/sitemap.ts` — drop `/n4logic`, `/case-studies`.
- Modify: `content/site/navigation.ts` — flat `navItems`: Product `/platform`, Pricing `/pricing`, How it works `/how-it-works`, Savings `/roi-calculator`, FAQ `/faq` (no `children`).
- Modify: `content/site/footer.ts` — groups exactly: Product [Ordering site `/platform#ordering`, Rewards `/platform#rewards`, Delivery `/platform#delivery`, Pricing `/pricing`, Integrations `/integrations`]; Resources [Savings calculator `/roi-calculator`, FAQ `/faq`, Insights `/resources`]; Company [About `/about`, Mission `/mission`, Solutions `/solutions`, Partners `/partners`, Careers `/careers`, Contact `/contact`]. Legal links stay in the footer bottom bar (Task 4).
- Delete: `content/site/theme.ts` and its `hasDarkHero` tests (every page now opens on cream; header is always solid).
- Modify: `tests/site-structure.test.ts`.

**Interfaces:**
- Produces: `navItems: NavItem[]` (flat), `footerLinks` (3 groups above). `/platform` must later expose anchors `#ordering`, `#rewards`, `#delivery` (Task 9).

- [ ] **Step 1: Write failing tests** in `tests/site-structure.test.ts`: remove the `hasDarkHero` describe; nav/footer "links only to routes the sitemap knows about" stays; new: sitemap has no `/n4logic` or `/case-studies`; `existsSync("app/n4logic")` is false; no file in `app/`, `components/`, `content/` (excluding legal pages) contains `"/n4logic"` or `"/case-studies"` (excluding `app/case-studies/page.tsx` itself); footer Company group contains `/mission`, `/solutions`, `/partners`, `/careers`; footer Product group contains `/integrations`; header nav labels equal `["Product","Pricing","How it works","Savings","FAQ"]`. Replace the "mission under Company in both nav and footer" test with the footer-only version.
- [ ] **Step 2:** `npx vitest run tests/site-structure.test.ts` → FAIL.
- [ ] **Step 3:** Make the changes; remove in-page links to `/n4logic` and `/case-studies` (grep `app components`).
- [ ] **Step 4:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS (header/footer may still reference removed exports — fix the imports minimally; full restyle is Task 4).
- [ ] **Step 5: Commit** `feat(ia): flat nav, three-column footer, remove /n4logic, hide /case-studies`

### Task 4: Header and footer

**Files:**
- Modify: `components/layout/SiteHeader.tsx`, `components/layout/SiteFooter.tsx`
- Create: `components/layout/AnnouncementBar.tsx` (homepage only — rendered from `app/page.tsx` in Task 6, not the layout)
- Create: `components/brand/Logo.tsx`

**Interfaces:**
- Produces: `<Logo variant="light" | "dark" size?: number />` — mark (`/brand/n4cluster-mark.svg` via `next/image`, `alt=""`) + "N4Cluster" in `font-display` weight 800, ink (light) or white (dark); wrapped by caller in a link with `aria-label="N4Cluster home"`. `<AnnouncementBar />` with text "Now onboarding pilot restaurants" + "NEW" pill, linking `/contact`.
- Consumes: `navItems`, `footerLinks`, `siteConfig.loginUrl`, `siteConfig.contact`, `demoCta`.

- [ ] **Step 1:** Header per mockup: always solid cream with bottom border `line`, 72px tall, `Logo` (mark ~44px), nav, "Log in" (external link to `siteConfig.loginUrl`), gold pill button `demoCta`. Mobile: menu button (keep existing Escape/route-change close behavior and `aria-expanded`), full-width panel with the same links + both CTAs. Remove dropdown code.
- [ ] **Step 2:** Footer per mockup on ink: `Logo variant="dark"`, line "Commission-free online ordering for neighborhood restaurants. Made in Franklin, TN.", `siteConfig.contact.phone · siteConfig.contact.email` (mailto/tel links), the three `footerLinks` groups (h3 headings), bottom bar "© 2026 N4Cluster Inc. All rights reserved." + **all existing legal links** (Privacy, Terms, SMS Terms `/terms#sms`, SMS programs `/sms`, Cookies, `CookiePreferencesButton`). Remove the "Platform layers" block and the `href="#"` social icons.
- [ ] **Step 3: Verify** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; `npm run dev`, open `/` and `/privacy` at 1440×900 and 390×844: header readable on both, Tab reaches every nav link and the menu button, Escape closes the mobile menu, no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth` in the console).
- [ ] **Step 4: Commit** `feat(layout): cream header and navy footer with traced logo`

### Task 5: Shared UI primitives

**Files:**
- Modify: `components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `SectionIntro.tsx`, `SectionContainer.tsx`, `Container.tsx`, `Divider.tsx`; `components/sections/{CTASection,FAQAccordion,HeroCentered,FeatureGrid,StepTimeline,ComparisonCards,PricingTiers,TrustStrip,ProblemSection,AudienceSegments,ImageTextBlock,ResourceCard}.tsx`; `components/forms/{ContactForm,NewsletterForm}.tsx` (`dark` prop styles).

**Interfaces:**
- Keeps every existing component's props and export names (pages keep compiling). `Button` variants map: `primary` → gold bg / ink text, pill; `secondary` → ink bg / white; `outline` → ink border on cream; any existing variant names stay valid. `HeroCentered`'s `dark` default becomes `false` (cream hero). `FAQAccordion` uses the mockup's `details/summary` + rotating plus.

- [ ] **Step 1:** Restyle to the mockup (cards white, radius and shadows from the mockup, Bricolage headings, cream/cream-2 section bands, ink sections where a component had `dark`).
- [ ] **Step 2: Verify** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; spot-check `/pricing`, `/faq`, `/contact` at 1440 and 390 — legible, no cobalt/teal left in these components (`grep -rn "cobalt\|teal-" components/` returns nothing).
- [ ] **Step 3: Commit** `feat(ui): restyle shared primitives and sections to the new system`

### Task 6: Homepage — announcement, hero, stat strip; contact prefill

**Files:**
- Create: `lib/prefill.ts`, `tests/prefill.test.ts`
- Create: `components/home/Hero.tsx`, `components/home/OrderCard.tsx`, `components/home/StorefrontPhone.tsx`, `components/home/StatStrip.tsx`
- Modify: `app/page.tsx` (this task puts AnnouncementBar → Hero → StatStrip at the top, replacing the old hero; the old sections below stay until Task 9 removes them), `app/contact/page.tsx`, `components/forms/ContactForm.tsx`

**Interfaces:**
- Produces: `restaurantFromParam(value: string | string[] | undefined): string` — first value, trimmed, internal whitespace collapsed, capped at 120 chars, `""` otherwise. `ContactForm` gains `initialCompany?: string` (prefills `company`). `/contact` page reads `searchParams.restaurant` (async `searchParams` prop in Next 16) and passes it through.
- Hero form: `<form action="/contact" method="get">` with `<input name="restaurant" aria-label="Restaurant name" required>` and submit `heroCta.label + " →"`. Works without JS.

- [ ] **Step 1: Write failing test** `tests/prefill.test.ts`: `restaurantFromParam(undefined) === ""`; `("  Maple  Street ") === "Maple Street"`; `(["A","B"]) === "A"`; `("x".repeat(5000)).length === 120`; `("<script>alert(1)</script>")` returns the string unchanged (React escapes it; we only cap/trim).
- [ ] **Step 2:** `npx vitest run tests/prefill.test.ts` → FAIL.
- [ ] **Step 3:** Implement `restaurantFromParam`, the contact wiring, and the three home components per the mockup (headline "Stop paying 30% to sell your own food.", eyebrow "Commission-free online ordering", subline "Your own branded ordering site, built-in rewards and delivery we coordinate. $99 a month plus 50¢ an order. No commission, ever." — fees from `priceDisplay`/constants, trust line "30 days free. Month-to-month. Keep your delivery apps for discovery.", OrderCard #1042 Subtotal $40.00 / Commission $0.00 / You keep $38.04, StorefrontPhone "Maple Street Kitchen", "Maya just reordered" chip; StatStrip $0 / 50¢ / $38.04 / 30 days with the mockup captions). Illustrative data is decorative: wrap mock UI in `aria-hidden` or give it a single descriptive label.
- [ ] **Step 4:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS. Visual: `/` at 1440×900 matches the mockup hero; at 390×844 the order card stacks under the copy and `scrollWidth <= 390`; submitting "Maple Street" lands on `/contact?restaurant=Maple+Street` with the company field filled.
- [ ] **Step 5: Commit** `feat(home): hero with demo-storefront prefill, order card and stat strip`

### Task 7: Homepage — platform sections

**Files:**
- Create: `components/home/PlatformSections.tsx` (and small visual subcomponents if needed: `RewardsCard`, `CampaignCard`, `DeliveryCard`, `SearchResultCard`)
- Modify: `app/page.tsx`

**Interfaces:**
- Sections with ids `ordering`, `rewards`, `growth`, `delivery`, `discovery`; intro "One platform, running quietly behind your brand" / "Everything your digital front door needs."

- [ ] **Step 1:** Build the five blocks with the mockup's copy and visuals, applying: Growth card text "Tuesdays run slow. Send your regulars a double-points offer for tonight?" (no "Text"); Growth body "We spot your quiet nights and draft a campaign for the regulars who've drifted. You approve it, we send it. You stay in the kitchen."; Rewards keeps "Live today"; Delivery copy verbatim from spec; Ordering bullets include "Stripe payments, with you as merchant of record" and "No website yet? We'll set up your domain too". Stock photos only as food/atmosphere.
- [ ] **Step 2:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; visual 1440 + 390, no horizontal scroll.
- [ ] **Step 3: Commit** `feat(home): five platform sections`

### Task 8: Homepage — savings calculator, photo marquee, comparison table

**Files:**
- Create: `lib/home-savings.ts`, `tests/home-savings.test.ts`
- Create: `components/home/SavingsCalculator.tsx` (`"use client"`), `components/home/PhotoMarquee.tsx`, `components/home/ComparisonTable.tsx`
- Modify: `app/page.tsx`, `app/globals.css` (marquee keyframes + reduced-motion rule)

**Interfaces:**
- Consumes: `calculateRoi(inputs: RoiInputs): RoiResult` from `lib/roi.ts`.
- Produces: `homeSavings(orders: number, ticket: number, ratePct: 20 | 25 | 30)` returning `{ marketplace: number; n4: number; monthlySaving: number; yearlySaving: number; n4BarPct: number }` — wraps `calculateRoi`, clamps `monthlySaving` at ≥ 0, `yearlySaving = monthlySaving * 12`, `n4BarPct` = n4/marketplace × 100 clamped to [3, 100] (100 when marketplace is 0). Defaults exported as `HOME_SAVINGS_DEFAULTS = { orders: 400, ticket: 35, rate: 25 }`.

- [ ] **Step 1: Write failing test** `tests/home-savings.test.ts`: defaults give `marketplace === 3500` and `n4 === calculateRoi({orders:400,avgTicket:35,commissionPct:25}).n4MonthlyFees`; `homeSavings(0,35,25)` → `monthlySaving === 0`, `n4BarPct === 100`, no NaN in any field; a case where N4 costs more than the marketplace yields `monthlySaving === 0`; `yearlySaving === monthlySaving * 12`.
- [ ] **Step 2:** `npx vitest run tests/home-savings.test.ts` → FAIL.
- [ ] **Step 3:** Implement `homeSavings`; build the calculator per mockup (navy panel, two range inputs with visible labels and values, three rate chips as `aria-pressed` buttons, "Your monthly receipt · ESTIMATE", CTA "Get my free demo storefront" → `/contact`, fine print verbatim from mockup with fees from `pricing.ts`). Marquee: heading "Your regulars already love you. Give them a better way to order from you.", stock food photos via `next/image`, decorative (`alt=""`, `aria-hidden` on the duplicated track), animation off under `prefers-reduced-motion`. Comparison table per mockup with N4Cluster cells "You — copy on request" and "Month-to-month, 30 days' notice"; on ≤640px render as three stacked cards (no horizontal scroll).
- [ ] **Step 4:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; visual 1440 + 390; with OS reduced-motion on, the marquee is static.
- [ ] **Step 5: Commit** `feat(home): savings calculator, photo marquee and comparison table`

### Task 9: Homepage — how it works, pilot, FAQ, final CTA; homepage complete

**Files:**
- Create: `components/home/LiveInDays.tsx` (also used by `/how-it-works` in Task 10), `components/home/PilotSection.tsx`, `components/home/FinalCta.tsx`
- Create: `content/pages/pilot.ts`
- Modify: `app/page.tsx` (final order: AnnouncementBar, Hero, StatStrip, PlatformSections, SavingsCalculator, PhotoMarquee, ComparisonTable, LiveInDays, PilotSection, FAQ (`homeFaqItems` via `FAQAccordion`) with "Rather just talk?" + `siteConfig.contact.founderLine` and email, FinalCta). Delete the old homepage sections and any now-unused components (only if no other page imports them).
- Modify: `tests/company-content.test.ts` (homepage uses `demoCta.label`)

**Interfaces:**
- Produces: `pilotRestaurants` in `content/pages/pilot.ts`: `[{ name: "Pasta and Pita Grill", location: "Columbia, TN", status: "Live since October 2026", quote: null, results: null, photo: null }]` — components render `quote`/`results` only when non-null; with `photo: null` render a neutral placeholder graphic (no stock photo). `LiveInDays` steps: Day 1 "A 20-minute call" · Within days "We build your site" · Week 1 "Point your regulars to it" · Ongoing "Every order compounds" (mockup bodies verbatim).

- [ ] **Step 1: Write failing tests** (append to `tests/company-content.test.ts`): `pilotRestaurants[0].name === "Pasta and Pita Grill"` and `quote === null && results === null`; `app/page.tsx` source contains `demoCta.label` and does not contain "Franklin & Columbia"; `components/home/PilotSection.tsx` contains no `/images/stock/`.
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** Implement. Pilot copy: "Built with our neighbors, one restaurant at a time." / "We're onboarding a small group of pilot restaurants. You get a founder on speed dial and a real say in what we build next." / "Apply for a pilot spot" → `/contact`; second card "Pilot spots open · Your restaurant, here. · Hands-on setup from the founding team." Final CTA "Keep the customer. Keep the margin." / "See your own demo storefront in one short call." / buttons `demoCta` and "See pricing" → `/pricing`.
- [ ] **Step 4:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; full-page visual compare against the mockup at 1440×900 and a 390×844 pass with `scrollWidth <= 390`; Lighthouse accessibility ≥ 95 on `/`.
- [ ] **Step 5: Commit** `feat(home): how it works, pilot, FAQ and final CTA — homepage matches mockup`

### Task 10: Restyle and correct the kept marketing pages

**Files:**
- Modify: `app/platform/page.tsx` (sections with ids `ordering`, `rewards`, `delivery`; module names → plain words: neighborhood directory listing, AI demand forecasting, growth campaigns with your OK, Google Business Profile sync, delivery coordination with risk protection and delivery-time tracking, multi-location support — all claimed as live), `app/pricing/page.tsx` (keep price lock; "cancel anytime" → `priceDisplay.cancel`; card processing disclosed), `app/how-it-works/page.tsx` (timeline section → `<LiveInDays />`; rest restyled), `app/roi-calculator/{page,ROICalculator}.tsx`, `app/solutions/page.tsx`, `app/about/page.tsx`, `app/mission/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx`, `app/resources/page.tsx`, `app/resources/[slug]/page.tsx`, `content/pages/resources.ts` (article copy), `app/integrations/page.tsx`, `app/partners/page.tsx`, `app/careers/page.tsx`, `app/not-found.tsx`, `components/sections/HeroSplit.tsx` (delete if unused after this task)
- Modify: `tests/company-content.test.ts` — mission-page assertions become: contains `feeQualifiers.commission` usage or "No commission, ever." and "Card processing and any courier charges are separate", still contains the trial-scope text and `priceDisplay`.

- [ ] **Step 1:** Update the mission-page test → FAIL.
- [ ] **Step 2:** Restyle each page with the Task 5 primitives (cream hero, Bricolage headings, ink bands for emphasis) and apply the spec's copy table. Keep `founderQuote` on /mission exactly once.
- [ ] **Step 3:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; visual pass on each page at 1440 and 390 (`scrollWidth` check); `/platform#delivery` scrolls to the delivery section.
- [ ] **Step 4: Commit** `feat(pages): restyle marketing pages and apply copy decisions`

### Task 11: Legal pages style, sitewide copy guard, leftovers

**Files:**
- Modify (style only — no text changes): `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/cookies/page.tsx`, `app/sms/page.tsx`
- Create: `tests/copy-rules.test.ts`
- Modify: `app/globals.css` (remove now-unused legacy utilities, e.g. `gradient-*`, cobalt/teal tokens, once grep shows no users)

- [ ] **Step 1: Write the guard test** `tests/copy-rules.test.ts`: walk `app/`, `components/`, `content/` (`.ts`/`.tsx`), skipping `app/privacy`, `app/terms`, `app/cookies`, `app/sms`, `content/legal`; for each file assert it contains none of the Global Constraints forbidden strings (case-insensitive for the phrases, exact for `contacts@`); also assert `/n4logic` appears nowhere in those files. (Legal text is protected by the diff review in Step 3, not by a test.)
- [ ] **Step 2:** `npx vitest run tests/copy-rules.test.ts` → FAIL if anything slipped; fix the offending copy.
- [ ] **Step 3:** Restyle legal pages (cream background, ink text, Bricolage headings). Review `git diff origin/release/2026.11 -- app/privacy app/terms app/cookies app/sms` and confirm only `className`/wrapper changes.
- [ ] **Step 4:** `npm test && npm run typecheck && npm run lint && npm run build` → PASS; `grep -rn "cobalt\|teal-\|navy-9" app components` returns nothing outside the logo SVG.
- [ ] **Step 5: Commit** `feat(legal,copy): restyle legal pages and add sitewide copy guard`

### Task 12: Design and product docs

**Files:**
- Modify: `DESIGN.md` (frontmatter tokens → the Global Constraints palette/typography/radius/shadows; North Star renamed, e.g. "The Neighborhood Ledger" — warm cream, ink navy, gold actions; components section updated), `PRODUCT.md` (proof: Pasta and Pita Grill live since October 2026, story pending; brand personality adds warm, neighborhood, premium; stat strip is an intended pattern — narrow the "hero-metric cards" anti-reference to generic SaaS metric tiles; primary CTA "Get a free demo" / "Build my demo storefront"; memorable line "No commission, ever."), `CLAUDE.md` (North Star name in the Design Context line). Create `.impeccable/design.json` only if the impeccable tooling in this repo expects it (it does not exist today — skip unless the hook asks for it).

- [ ] **Step 1:** Edit the docs.
- [ ] **Step 2: Verify** the impeccable design hook no longer flags the new palette: re-save `components/home/Hero.tsx` (touch) and confirm no `design-system-color`/`design-system-font` findings for the new tokens; `npm test` → PASS.
- [ ] **Step 3: Commit** `docs(design): DESIGN.md and PRODUCT.md describe the new system`

### Final verification (after Task 12)

- [ ] `npm test && npm run typecheck && npm run lint && npm run build` → all pass, output pasted into the PR.
- [ ] Visual pass of every route in the sitemap at 1440×900 and 390×844; `/n4logic` returns 404; `/case-studies` redirects to `/`.
- [ ] Open PR `feat/site-redesign` → `release/2026.11` with screenshots of `/` (desktop + phone) and a list of the spec's open items still pending (Pasta and Pita Grill story, real photos).
