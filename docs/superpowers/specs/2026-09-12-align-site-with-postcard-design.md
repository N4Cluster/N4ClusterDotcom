# Align site with the printed postcard — design

**Date:** 2026-09-12
**Branch:** `fix/align-site-with-postcard` → PR into `release/2026.06`
**Source of truth:** the two-sided N4Cluster postcard (front: "No commission ordering platform for neighborhood restaurants"; back: "Own your storefront. Own your data. Own your growth.")

## Goal

Every number, claim and call to action on n4cluster.com matches the postcard. The pricing page and ROI calculator lead with what the restaurant **keeps**, using the postcard's single worked example (one $40.00 menu subtotal) everywhere.

## Canonical facts

| Fact | Value |
|---|---|
| Merchant fees | $99/month platform fee + $0.50 per order. No commission, no revenue share, ever. |
| Card processing | Not included; merchant's usual processing. Site assumes **2.9% + $0.31** → **$1.47 on $40.00** |
| N4Cluster on a $40 order | $0.50 + $1.47 = **$1.97** fees → merchant keeps **$38.03** |
| Delivery apps on a $40 order | Commissions run 20–30%. At 30%: **−$12.00** → keeps **$28.00** |
| Difference | **$10.03** back per ticket |
| Diner fee | **$0.99 N4Cluster Neighborhood Fee**, paid by the diner, always shown, never the merchant's cost. **No opt-out.** |
| Trial | **Try free for 30 days**: no $99/month and no $0.50/order during the trial. Diner fee still applies. |
| Setup speed | **Live in days** |
| Commitment | Cancel anytime. No lock-in. Orders and regulars belong to you; export anytime. Optional 1–2 yr price lock and CPI formula stay as *protections*, never as terms. |
| Primary CTA | **Request your demo storefront**: "We'll build a working demo with your real menu, then walk you through it. Free, and yours to look at before you decide anything." |
| Secondary contact | n4cluster.com/contact · text **DEMO** to **(629) 290-1191** |
| Founder quote | "We built the tech the big platforms have, then priced it so a neighborhood restaurant actually grows on it." — Prerana Shah, Founder |
| Value framing | Order (placed on your site, at your prices) · Customer (details land in your list, not theirs) · Repeat (bring them back without bidding for your own regulars) |

### Decisions

Confirmed by the user: numbers match the postcard; the $0.99 diner fee is always there; 30-day free trial; fix every conflict in one PR; "Live in days"; logo from `N4Cluster-Logo.png` everywhere.

**Assumed defaults. Confirm when reviewing this spec:**
1. Processing at 2.9% + $0.31, so every page and the calculator produce exactly $1.47 / $1.97 / $38.03.
2. The trial waives both merchant fees; the diner fee still applies.
3. The contact form gains optional **phone** and **menu link** fields.

## Changes

### 1. Pricing page (`app/pricing/page.tsx`)

Follow one $40 order down the page.

- **Hero:** keep the "$99/month + $0.50 per order. No commission. Ever." heading. Add "Try free for 30 days" and the postcard subhead ("No cut taken from your orders. No fee while you try it…").
- **"Same $40.00 menu subtotal, two ways it gets split":** replaces the fee-callout boxes and the $40/$80/$150 three-marketplace table. Two columns: Delivery apps (−$12.00, keep $28.00) and N4Cluster (−$1.97 = $0.50 + $1.47, keep $38.03). Below them, a band reading "$10.03 back in your hands / ticket", a line noting the $99/month is billed separately, and the postcard footnote word for word.
- **Customer fee section:** the checkout mock uses the same order: $40.00 subtotal + $0.99 = $40.99 total; the restaurant keeps $38.03 (the old mock showed $42.00 and left out processing). Remove the opt-out bullet.
- **What's included:** add the Order / Customer / Repeat trio. The dashboard card adds "Export anytime. No lock-in."
- **Protections / price lock / formula:** keep, but open with "Cancel anytime. No lock-in." and label the price lock optional.
- **FAQ:** add "Is card processing included?" and "What does the free trial include?" The setup-fee answer mentions the trial. The $0.99 answer drops the opt-out.
- **Founder quote** before the CTA. **CTA** uses the demo-storefront copy and the text-DEMO line.
- **Metadata:** processing is called out as separate.

### 2. ROI calculator (`app/roi-calculator/page.tsx`, `ROICalculator.tsx`)

Savings are the headline, and the calculator fits one 1440×900 viewport.

```
ROI CALCULATOR
Switch to N4Cluster and keep  $34,920  more a year.        ← live
That's $2,910 a month at 300 orders × $40 with a 30% commission.
┌─────────────────────────────────────┬─────────────────────────────┐
│ EVERY MONTH                         │ YOUR RESTAURANT             │
│ Delivery apps ███████████████ $3,600│ Orders / month    300 ──●── │
│ N4Cluster     ███ $690              │ Avg order         $40 ──●── │
│ ON ONE $40 ORDER                    │ Commission today  30% ──●── │
│ Apps −$12.00 → keep $28.00          │ [Request your demo storefront]
│ Us   −$1.97  → keep $38.03          │ or text DEMO to (629) 290-1191
│ $10.03 back per ticket              │                             │
│ ▸ How we calculated this            │                             │
└─────────────────────────────────────┴─────────────────────────────┘
```

- `HeroCentered` is removed from this page. The live headline is the page's `<h1>`.
- Defaults become 300 orders, $40 average order, 30% commission (was 300 / $28 / 25%). Slider ranges stay the same.
- `PROCESSING_FLAT` changes from 0.30 to 0.31.
- The bars are plain divs whose widths are proportional to monthly cost. No chart library.
- The per-order strip follows the average-order slider: at $40 it matches the postcard exactly.
- "How we calculated this" is a native `<details>` holding the existing $99 / per-order / processing breakdown plus "Diners pay a separate $0.99 fee — not your cost."
- When savings ≤ 0 (for example, very low volume), the headline switches to neutral "difference" wording, as it does today.
- **Mobile (≤ lg):** headline and bars come first, then the sliders. A sticky bottom bar shows the annual savings while the sliders are dragged.
- The separate savings-banner section, the red/green cost cards, and the bottom CTA section are removed. They repeated the same numbers.
- The math moves into one exported pure function in `app/roi-calculator/roi.ts`. `npm run build` type-checks it. `app/roi-calculator/roi.check.ts` is a `node:assert` script run with `node app/roi-calculator/roi.check.ts` (Node 25 strips types natively; no test framework added). It confirms 300 / $40 / 30% gives $3,600 / $690 / $2,910, and that one $40 order gives $1.97 / $38.03 / $10.03.

### 3. Numbers elsewhere

| File | Change |
|---|---|
| `app/page.tsx` comparison table (~177–210) | "$40.00 menu subtotal"; delete the 25% and 27% rows; N4Cluster "$0.50 + $1.47 processing = $1.97", keep **$38.03**; flat-fee SaaS keep **$38.53**; footnote adds "$10.03 back per ticket" and "diner's $0.99 isn't part of your total" |
| `app/solutions/page.tsx` | `:30` $11.50 → **$10.03**; `:123–125` 400-order example → commission −$4,800 (30% × $40), N4Cluster −$887 (400 × $1.97 + $99), net **+$3,913** |
| `content/pages/faq.ts` (feeds /faq, the FAQ data sent to search engines, and /contact) | 25–30% → 20–30% with the $40 example; "Everything." → "everything except card processing (about $1.47 on $40)"; remove the diner-fee opt-out; "Day 1" → "Live in days"; commitment answer opens with cancel anytime and presents the lock as optional; **add** FAQs on the 30-day trial, cancel/export anytime, and the $40 math |

### 4. Postcard claims across the site

- **"+ your usual card processing"** wherever "$99 + $0.50" reads as the full cost: home `:149, :170, :210, :348`; platform `:31, :201`; solutions `:82, :106, :249`; how-it-works `:90, :218`; roi-calculator `:8, :17`.
- **Live in days** (was "24 hours" / "a day" / "Day 1"): home `:36, :81–84, :150, :251`; how-it-works `:113, :217`; faq.ts `:47`.
- **Try free for 30 days** replaces merchant-facing "pilot": home `:136, :152`; case-studies (metadata `:10–12` and body `:70, :103, :129–131` → "example scenarios" + try free); contact page `:11, :35–40`; ContactForm "Pilot Program" → "Demo storefront (try free)"; navigation `:86`; README `:103, :105`. Partner-facing pilots (`integrations`, `partners`) stay.
- **Cancel anytime · No lock-in · Export anytime** opens every commitment passage: home `:329`; platform `:203–204`; solutions `:27, :337–338`; faq.ts `:27`; pricing.

### 5. CTA, contact and founder

- **"Request your demo storefront"** replaces "Request a Demo", "Get Started in 24 Hours", "Request a Walkthrough", "See It in Action", "Talk to the Team", "Contact the Team" and "Talk to us about your numbers": SiteHeader `:78, :223`; home; platform `:114, :263`; solutions `:250, :355`; how-it-works `:115, :234`; n4logic `:101, :212`; about `:70, :154`; ROI calculator. Links stay `/contact`.
- **Phone:** add `phone: "(629) 290-1191"` and `smsKeyword: "DEMO"` to `content/site/settings.ts`. Render "or text DEMO to (629) 290-1191" as an `sms:` link on the contact page, the pricing CTA and the ROI calculator. The ROI calculator's stale `contact@ | /partner` line is removed.
- **Contact form** (`components/forms/ContactForm.tsx`, `app/api/contact/route.ts`): add optional `phone` and `menuUrl` fields (menu link labelled "Link to your current menu (website, DoorDash, Google…)"). The route includes both in the email body, trimmed and capped at 200 characters. The email subject becomes "Demo storefront request from {name} - {company}". The submit button reads "Request your demo storefront".
- **Founder:** the about page mission area gets the quote with attribution. So does the pricing page.

### 6. Brand logo

Source: `~/Documents/N4Cluster/N4Cluster-Logo.png` (the hexagon N mark with the N4CLUSTER wordmark). It goes into `public/logo.png`; the user copies it in, because this terminal can't read ~/Documents.

| Place | Change |
|---|---|
| `SiteHeader.tsx:49` | The "N4" gradient tile is replaced by the logo mark via `next/image`, keeping the "N4Cluster" text if the file is mark-only. The header's transparent-navy state needs a light-on-dark version: a white variant if one is supplied, otherwise the mark on a small white rounded tile. |
| `SiteFooter.tsx:15` | Same treatment on navy-950. |
| `app/icon.png`, `app/apple-icon.png` | Next.js file-convention favicon and touch icon, cropped from the mark. The site has no favicon today. |
| `app/opengraph-image.tsx:39` | Embed the logo as a data URL in place of the drawn tile. Tagline updated (see §7). |
| `app/layout.tsx:69` | Organization JSON-LD `logo` already points to `/logo.png`. It resolves once the file exists (it is a 404 today). |

The exact header treatment is decided once the file is visible. This task is blocked until then; all other tasks proceed.

### 7. SEO and cleanup

- `content/site/settings.ts` tagline/description ("Infrastructure for Local Commerce") → "No-commission ordering for neighborhood restaurants. $99/month + $0.50 per order." This feeds the page titles, OG and Organization data.
- The OG image text uses the new tagline. Platform metadata `:9` becomes "Five Layers. No Commission."
- Footer blurb "Merchant-first infrastructure for local commerce…" → restaurant framing.
- Delete `components/sections/PricingTiers.tsx`. It is not imported anywhere and contradicts the single flat price.
- `PRODUCT.md`: fee model with processing, demo-storefront CTA and phone, try free / cancel / export in the belief ladder, founder quote recorded as proof on hand.

## Out of scope

- `docs/IMPLEMENTATION-SPEC.md` and `2026-07-05-pricing-fee-model-correction-design.md` stay as historical records.
- Terms / privacy / cookies: no conflicts.
- Partner-facing pilot wording.
- The postcard's visual identity (cobalt/gold). The site keeps DESIGN.md's tokens.
- A shared pricing-constants module. Prose keeps literal numbers; add the module if prices change again.

## Branch and PR

`fix/align-site-with-postcard` is branched from `fix/homepage-critique-punch-list` (open PR #17, which rewrote `app/page.tsx`) with `origin/release/2026.06` merged in. The PR targets `release/2026.06`; its diff shrinks to this work once #17 merges.

## Verification

1. `npm run build` passes (types + lint).
2. `node app/roi-calculator/roi.check.ts` passes.
3. A stale-figure grep over `app components content` (excluding `app/privacy`, `app/cookies`, whose opt-out wording is about cookies) returns nothing: `\$39\.50|\$42\.00|\$11\.50|\$3,701|27%\)|25–30%|24 [Hh]our|Live in a day|Day 1\.|Pilot Program|opt.?out|Request a Demo`.
4. Visual check at 1440×900 and 390×844 of `/`, `/pricing`, `/roi-calculator`, `/contact`, plus the header/footer logo. The calculator result must sit fully above the fold at 1440×900.
5. A contact form submit sends phone and menu link in the payload (dev network tab).
