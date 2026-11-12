# Site redesign: the warm "neighborhood" look, sitewide

Date: 2026-11-11 · Branch: `feat/site-redesign` → PR into `release/2026.11`

## Why

The current site (dark navy, cobalt/teal, "infrastructure vendor" look) doesn't land with
restaurant owners. The owner wants the site to feel **more trustworthy, premium and
engaging**. A designer mockup of a new homepage exists and is the target look *and* copy.

Success: an independent restaurant owner lands on any page and it feels like a
well-run neighborhood business talking to them, not a SaaS vendor; they request a demo
or run the savings calculator.

## Source material (in this repo)

- `docs/design/homepage-mockup/Main.dc.html` — the reference mockup (a design-tool
  export; see its `README.md`). **Exact values live in its inline `style="…"`
  attributes and `<helmet><style>` block.** Serve the folder (`python3 -m http.server`)
  to view it; it needs its `support.js` + `vendor/` runtime, which were not copied —
  view the original at `~/Documents/N4Cluster/N4cluster.com/Homepage-html/` instead.
  Replicate the design in the site's own components and Tailwind; do not paste the markup.
- `docs/design/homepage-mockup/assets/*.jpg` — 17 stock photos the mockup uses.
- `docs/design/logo/n4cluster-mark.svg` — the hexagon "N" logo mark, traced to vector
  and approved by the owner. `original-logo.jpeg` is the source it was traced from.

## Goals

1. Every page uses the mockup's visual system (below), not just the homepage.
2. The homepage reproduces the mockup's sections, layout and copy, with the copy
   corrections in "Copy decisions".
3. Copy across the whole site follows the decisions below — no page contradicts another.
4. `DESIGN.md`, `.impeccable/design.json` and `PRODUCT.md` are updated to describe the
   new system and positioning, so later work and the design hooks follow it.

## Non-goals

- No new product features, backend changes, or changes to `/api/*`, `/r/*`, `/t/*`.
- Legal pages (`/privacy`, `/terms`, `/cookies`, `/sms`): restyle only (header, footer,
  type, colors). **Do not change their text.**
- No real Pasta and Pita Grill story yet (details come later; see "Case studies").
- No dark mode.

## Anti-goals (failure even if it "works")

- Stock photos presented as real people: a stock face must never be labelled as a named
  owner, customer or the team. Stock photos are atmosphere only.
- Any claim that contradicts "Copy decisions" left anywhere on the site.
- Looking like a consumer delivery app (DoorDash/Uber Eats aesthetic) — the food photos
  and live-order card serve an owner-facing pitch, not a diner-facing one.
- Regressing accessibility: WCAG 2.1 AA (4.5:1 body text, keyboard nav, reduced motion).

## Visual system (from the mockup)

Take exact values from the mockup file. Summary:

| Role | Value |
|---|---|
| Page background (cream) | `#F7F3EA`; alt surfaces `#F2EEE4`, `#E8E1D2` |
| Lines / borders | `#E4DCCB` |
| Ink navy (headings, dark sections, footer, calculator) | `#0F1A3A`; secondary navy `#26335E`, `#3A4570` |
| Body text muted | `#5A6080`, `#4A5170` |
| Accent gold (primary buttons, highlights, slider accent) | `#F4B33E` |
| Positive green ("You keep", ticks) | `#1F7A4D`, deep `#155A38`, tints `#EAF5EE` |
| Negative red ("Commission", marketplace costs) | `#B8371F` |
| White cards | `#FFFFFF` with soft navy shadows, e.g. `0 24px 50px rgba(15,26,58,0.3)` |
| Display / headings | Bricolage Grotesque (via `next/font/google`, self-hosted) |
| Body | Inter (already loaded) |

- Check every text/background pair against AA; the mockup's muted text on cream and
  gold-on-white must be verified, and adjusted if they fail.
- The photo marquee (`@keyframes n4marquee`) must stop under `prefers-reduced-motion`
  (the mockup already does this).
- Teal appears **only inside the logo mark**, never in UI.

## Logo

- Header: the hexagon mark (`n4cluster-mark.svg`, ~44px tall in a 72px header) with
  "N4Cluster" set beside it in Bricolage Grotesque 800, navy. This replaces the mockup's
  "N4" tile. (Owner chose this over the stacked logo, which is unreadable at header size.)
- Footer (navy): the mark with "N4Cluster" beside it in white. The mark keeps its own
  colours on navy.
- Favicon / app icon / OG image: generated from `n4cluster-mark.svg`.
- Ship the SVG as-is in `public/`; don't re-trace or recolour it.

## Copy decisions (owner-confirmed, apply sitewide)

| Topic | Say | Never say |
|---|---|---|
| Commission | "No commission, ever." Hero: "Stop paying 30% to sell your own food." Card processing stays disclosed in the FAQ, /pricing and the calculator fine print. | — (owner chose the mockup's wording over "zero N4Cluster sales commission"; owner confirmed the scoped wording was **not** a legal requirement). Replace the scoped-wording guardrail in `tests/company-content.test.ts` and `feeQualifiers.commission` with the new wording rather than deleting the safety net: tests should still assert processing is disclosed on /pricing and in the FAQ. |
| Fees | $99/month + $0.50 per order + card processing (2.9% + 30¢). $38.04 kept on a $40 order. Diner pays a separate $0.99 fee. | Any N4Cluster fee figure not from `content/site/pricing.ts`. (Competitor figures — "Typically $300–500", "Up to $12.00 (20–30%)" — stay as in the mockup, with their "vary by provider" footnote.) *[Builder's-check call]* |
| Trial / cancelling | "30 days free, then month-to-month. Cancel with 30 days' written notice." The optional 1–2 year price lock on /pricing stays. | "cancel anytime" |
| Customer data | "Your customer data is yours — we'll send you a copy whenever you ask." | "export anytime", self-service export, "exportable" |
| Go-live | "Live in days. Not quarters." with the mockup's Day 1 / Within days / Week 1 / Ongoing timeline, and its qualifier "We scope the exact steps and timing for your restaurant before you commit." Apply on /how-it-works and the FAQ too. | "24 hours", "Day 1" go-live promises beyond the timeline |
| Delivery | "We dispatch through DoorDash Drive and Uber Direct and chase any order that runs late. Courier charges depend on your address." "Delivery we coordinate" is correct. | — |
| Payments | Stripe, restaurant is merchant of record. | — |
| Domain | "No website yet? We'll set up your domain too." | — |
| Rewards | Live today: points on menu subtotal, own reward catalog, redeem at checkout. | — |
| Contact | "Text DEMO to (629) 290-1191 — a founder answers." Email **contact@n4cluster.com** (the mockup's "contacts@" is a typo). | contacts@ |
| Log in | Header "Log in" → `https://merchant.n4cluster.com/merchant/signin` | — |
| Product names | Remove N4Sync, N4Logic, Neighborhood Hub from all marketing pages; describe what they do in plain words. | the names (legal pages untouched) |
| Capabilities on kept pages | Owner confirmed **all true today**, keep them (renamed in plain words, no "coming soon"): a listing in an N4Cluster neighborhood directory alongside other local spots; AI demand forecasting; growth campaigns to lapsed regulars with the owner's OK; Google Business Profile kept in sync with the menu; risk protection and delivery handled "on our risk" with delivery-time tracking; multi-location support. | — |
| Pilot | "We're onboarding pilot restaurants" — **no city named**. Footer may keep "Made in Franklin, TN". | "Franklin & Columbia" pilot limit |
| Pasta and Pita Grill | Named, Columbia, TN, live since October 2026. Owner quote and results stay as clearly-marked placeholders **hidden from production** until supplied. | Stock photo of them; made-up results |

Existing single sources must carry these: `content/site/pricing.ts` (fees),
`content/company.ts` (`demoCta`, values — the "exportable" wording changes),
`content/pages/faq.ts`, `content/site/navigation.ts`, `content/site/footer.ts`.
The ROI math stays in `lib/roi.ts`; the homepage calculator uses it, not the mockup's
inline script. Its defaults are the mockup's (400 orders, $35, 25%; rate chips 20/25/30%).

## Homepage (follow the mockup, top to bottom)

1. Announcement bar — "NEW · Now onboarding pilot restaurants →" (no cities) → `/contact`.
2. Header — logo, nav (Product, Pricing, How it works, Savings, FAQ), Log in, gold "Get a free demo".
3. Hero — headline, subline, restaurant-name field + "Build my demo storefront →"
   (submits to `/contact` with the name pre-filled), trust line, live-order card and
   storefront phone mock (illustrative data: Maple Street Kitchen, Maya, #1042).
4. Stat strip — $0 / 50¢ / $38.04 / 30 days.
5. Platform — 01 Ordering, 02 Rewards, 03 Growth, 04 Delivery, 05 Discovery, each with its
   visual (from the mockup).
6. Savings calculator — navy panel, sliders, rate chips, estimate, fine print.
7. Photo marquee — "Your regulars already love you…" (stock food photos only).
8. Comparison table — Marketplace apps / Flat-fee SaaS / N4Cluster, with the data-row fix:
   "Who owns the customer" N4Cluster cell = "You — copy on request".
   Commitment row = "Month-to-month, 30 days' notice".
9. How it works — "Live in days. Not quarters." timeline.
10. Pilot section — "Built with our neighbors, one restaurant at a time." Copy without
    cities; Pasta and Pita Grill card (Columbia, TN · Live since October 2026) with the
    mockup's photo slot left as a neutral placeholder graphic, not a stock photo;
    "Your restaurant, here." card; "Apply for a pilot spot" → `/contact`.
11. FAQ — the mockup's five questions with the corrected cancel/data answers, plus the
    "Text DEMO" contact line.
12. Final CTA — "Keep the customer. Keep the margin."
13. Footer — per mockup, columns Product / Resources / Company, contact line, legal links
    (Privacy, Terms, Cookies, **SMS Terms**, Cookie preferences — keep what's there now).

## Navigation *[my call, from the builder check]*

- Header on every page: Product → `/platform`, Pricing → `/pricing`, How it works →
  `/how-it-works`, Savings → `/roi-calculator`, FAQ → `/faq` (real pages, not homepage
  anchors, so it works the same everywhere). No dropdowns. Log in + "Get a free demo".
- Footer: the mockup's three columns, extended so no kept page is orphaned —
  Product: Ordering site, Rewards, Delivery (anchors on `/platform`), Pricing, Integrations;
  Resources: Savings calculator, FAQ, Insights (`/resources`);
  Company: About, Mission, Solutions, Partners, Careers, Contact.

## Other pages

All pages get the new header/footer, cream background, type and components. Content
stays, with the copy decisions applied. Specifically:

- **Removed completely:** `/n4logic`. Delete the page, its nav/footer entries, sitemap
  entry, `theme.ts` entry and tests. **No redirect** (owner's decision) — the URL 404s.
  Also remove in-site links pointing to it.
- **Kept + restyled:** `/platform`, `/pricing`, `/how-it-works`, `/solutions`, `/about`,
  `/mission`, `/contact`, `/faq`, `/roi-calculator`, `/resources`, `/resources/[slug]`,
  `/integrations`, `/partners`, `/careers`, legal pages (style only).
- **Case studies:** current `/case-studies` content (three generic pilots) is removed.
  The page is rebuilt for Pasta and Pita Grill once details arrive; until then it is
  removed from nav/sitemap and the route redirects to `/` (temporary redirect).
- `/how-it-works` *[my call]*: its timeline section is replaced by the mockup's 4-step
  "Live in days. Not quarters." timeline + qualifier; the rest of the page is restyled
  with claims corrected per this document.
- Trial terms *[my call]*: wherever "30 days free" appears with its terms (FAQ, /pricing),
  keep "card processing still applies"; the hero/trust-line short form may omit it.
- The header no longer needs the dark-hero/transparent logic in `content/site/theme.ts`
  if every page opens on cream; simplify or remove it accordingly.

## Docs to update in the same PR

- `DESIGN.md` + `.impeccable/design.json`: replace "The Utility Ledger" tokens with the
  system above (so the impeccable hooks stop flagging the new values).
- `PRODUCT.md`: proof is no longer "none" (Pasta and Pita Grill is live); brand
  personality adds "warm, neighborhood, premium"; the mockup's stat strip is an intended
  pattern, so adjust the "hero-metric cards" anti-reference; primary CTA label is
  "Get a free demo" / "Build my demo storefront".

## Constraints

- Next 16 App Router, Tailwind v4, `lucide-react`; no new runtime dependencies beyond the
  Bricolage font via `next/font`.
- CSP in `next.config.ts` is strict: images must be self-hosted (`/public`), fonts via
  `next/font`. Photos go through `next/image`.
- Existing tests (`npm test`) must pass; update tests that assert removed copy/routes.

## Left to the builder

- Component structure, and which existing `components/sections/*` are reused vs replaced.
- Responsive behaviour below the mockup's desktop width (mockup is desktop-first): stack
  sections, keep the calculator usable on 390px phones, no horizontal scroll.
- How the stock photos are named and sized in `public/`.
- Restyling detail for pages the mockup doesn't cover, staying within the system.

## Open (owner will supply later — not blocking)

- Pasta and Pita Grill story: cuisine, owner name/permission, POS, previous apps and
  commission, setup time, results, quote, real photos, written consent.
- Real photos to replace stock, at least for people.
