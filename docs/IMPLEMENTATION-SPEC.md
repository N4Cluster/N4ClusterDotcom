# N4Cluster Marketing Website -- Implementation Specification

**Version:** 1.0  
**Date:** 2026-04-05  
**Status:** Implementation-ready  
**Stack:** Next.js 15 / React 19 / Tailwind CSS v4 / Sanity CMS / Vercel  
**Repo:** `c:\Users\tilak\N4ClusterDotcom`  
**Live:** https://n4cluster.com

---

## Table of Contents

- [A. Executive Framing](#a-executive-framing)
- [B. Site Strategy](#b-site-strategy)
- [C. Sitemap and Navigation](#c-sitemap-and-navigation)
- [D. Page-by-Page Specification](#d-page-by-page-specification)
- [E. Design System Specification](#e-design-system-specification)
- [F. Component Architecture](#f-component-architecture)
- [G. CMS and Content Model (Sanity)](#g-cms-and-content-model-sanity)
- [H. Analytics and Tracking](#h-analytics-and-tracking)
- [I. SEO and Discoverability](#i-seo-and-discoverability)
- [J. Proof and Trust Requirements](#j-proof-and-trust-requirements)
- [K. Launch Readiness Checklist](#k-launch-readiness-checklist)
- [L. 90-Day Phased Plan](#l-90-day-phased-plan)
- [M. Recommended Repo Structure](#m-recommended-repo-structure)
- [N. Code Scaffolding](#n-code-scaffolding)
- [O. Prioritized Backlog](#o-prioritized-backlog)

---

## A. Executive Framing

### What we are building

A rebuild of the N4Cluster marketing website that transitions from hardcoded TypeScript content to a Sanity CMS-backed, page-builder-driven architecture. The site retains the existing Next.js 15 / React 19 / Tailwind v4 stack and Vercel deployment. The visual identity (navy/cobalt/teal/amber palette, Inter typeface) is preserved but systematized into a formal design system. Analytics move from basic GA4 pageview tracking to a full event model (GA4 + PostHog). The content model supports non-engineering content updates, A/B-testable CTAs, and a scalable resource hub.

### Who it is for

- **Primary:** Independent restaurant owners evaluating alternatives to marketplace commission models (DoorDash, Uber Eats, Grubhub).
- **Secondary:** Multi-location restaurant brands seeking unified ordering infrastructure.
- **Tertiary:** Integration/ecosystem partners (POS vendors, delivery networks) evaluating partnership.
- **Internal:** Marketing team needing to publish content, update pages, and track conversion without deploying code.

### Business problem

The current site has strong messaging and a clear value proposition ($0.99 flat per order, no commissions) but suffers from three structural limitations:

1. **Content bottleneck.** Every text change requires a developer commit and deploy. This blocks marketing velocity.
2. **No conversion instrumentation.** GA4 is wired but has no measurement ID. There is zero visibility into which pages, CTAs, or content drive demo requests.
3. **No proof layer.** Early-stage company with no published case studies, testimonials, or partner logos. The site needs a credible trust strategy that works before real social proof exists.

### Success criteria

| Metric | Baseline (current) | 90-day target |
|---|---|---|
| Demo requests per month | Unknown (no tracking) | 50+ tracked submissions |
| Avg time to publish content change | ~1 day (dev cycle) | < 15 min (CMS) |
| Lighthouse performance score | ~85 | 95+ |
| Pages with structured data | 1 (Organization) | All pages |
| Analytics event coverage | Pageviews only | 15+ custom events |
| Bounce rate (homepage) | Unknown | < 45% |

---

## B. Site Strategy

### Target audiences

| Audience | Pain point | What they need to see | Primary CTA |
|---|---|---|---|
| **Independent restaurant owner** | Losing 25-30% margin to marketplaces, no customer data ownership | Savings calculator, $0.99 pricing, branded storefront demo, comparison table | Request a Demo |
| **Multi-location operator** | Fragmented tech stack, inconsistent brand across locations, no centralized visibility | Unified dashboard pitch, location-level analytics, N4Sync orchestration | Request a Demo |
| **Delivery-first brand** | Commission dependency for core business model, SLA accountability gaps | Neighborhood Hub demand engine, N4Sync 30-min SLA, logistics ownership | Request a Demo |
| **Integration partner** | Looking for merchant-aligned platform to integrate with, revenue alignment | API/integration architecture, partner economics, pilot-first model | Partner Inquiry |

### Core conversion goals (ranked)

1. **Demo request form submission** -- the primary business outcome
2. **Newsletter signup** -- email capture for nurture
3. **Resource download/read** -- engagement signal, retargeting audience
4. **Pricing page visit** -- intent signal for sales

### Messaging hierarchy

Every page follows this cascade:

1. **Problem acknowledgment** -- "You built your restaurant. The marketplace owns your customer."
2. **Mechanism** -- "Infrastructure, not extraction. $0.99 flat per order."
3. **Proof** -- Calculator, comparison table, case study reference, partner mention
4. **CTA** -- "Request a Demo" (primary), "See Pricing" or "See How It Works" (secondary)

### CTA strategy

| CTA label | Used where | Action |
|---|---|---|
| Request a Demo | Hero, sticky header, page bottoms, pricing | Navigate to `/request-demo` |
| See Pricing | Homepage secondary, platform, solutions | Navigate to `/pricing` |
| See How It Works | Homepage secondary, pricing | Navigate to `/how-it-works` |
| Talk to Us | Contact, footer | Navigate to `/request-demo` |
| Start Your Pilot | Case study bottoms, about page | Navigate to `/request-demo` |
| Subscribe | Newsletter forms, resource hub | Inline form submission |

### Trust-building strategy

See Section J for full detail. Summary: use design-partner framing, anonymized early metrics, prototype screenshots, and transparent "we are early" language paired with strong pricing guarantees and contractual protections.

---

## C. Sitemap and Navigation

### URL structure

```
/                           Homepage
/platform                   Platform overview
/platform/n4sync            N4Sync orchestration detail (future)
/platform/n4logic           N4Logic AI detail (redirect from /n4logic)
/how-it-works               Onboarding flow walkthrough
/pricing                    Pricing and fee structure
/integrations               Integration ecosystem
/solutions/independent      Independent restaurant solution
/solutions/multi-location   Multi-location brand solution
/request-demo               Demo request form (replaces /contact for primary CTA)
/resources                  Resource hub listing
/resources/[slug]           Individual article
/case-studies               Case studies listing
/case-studies/[slug]        Individual case study
/about                      Company story
/trust-security             Trust, security, and data practices
/faq                        Frequently asked questions
/partners                   Partner program
/careers                    Careers
/privacy                    Privacy policy
/terms                      Terms of service
/cookies                    Cookie notice
```

### Top-level navigation

```
Platform (dropdown)
  - Platform Overview          /platform
  - N4Sync Orchestration       /platform#n4sync
  - N4Logic AI Growth          /platform/n4logic
  - Integrations               /integrations

Solutions (dropdown)
  - Independent Restaurants    /solutions/independent
  - Multi-location Brands      /solutions/multi-location

How It Works                   /how-it-works
Pricing                        /pricing

Resources (dropdown)
  - All Resources              /resources
  - Case Studies               /case-studies
  - FAQ                        /faq

[CTA Button] Request a Demo    /request-demo
```

### Footer columns

| Platform | Solutions | Company | Resources | Legal |
|---|---|---|---|---|
| Platform Overview | Independent Restaurants | About | Insights | Privacy Policy |
| N4Sync | Multi-location Brands | Partners | Case Studies | Terms of Service |
| N4Logic | | Careers | FAQ | Cookie Notice |
| Integrations | | Contact | Pricing | |
| How It Works | | Trust & Security | | |

---

## D. Page-by-Page Specification

### D1. Homepage (`/`)

**Purpose:** Establish the value proposition and drive demo requests.  
**Target persona:** Independent restaurant owner arriving from search or referral.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See How It Works

**Required sections (in order):**

1. **Hero (split layout)** -- Eyebrow: "Commission-free commerce infrastructure". Headline: "Keep more of every order. Grow your neighborhood." Subhead: value prop paragraph. Primary + secondary CTA. Microcopy: "$0.99 per order. No monthly minimum."
2. **Trust strip** -- 5 proof points: "$0.99 flat fee", "Your brand. Your customers.", "Merchant-owned loyalty", "30-min delivery SLA", "AI Growth Autopilot included"
3. **Problem section** -- "You built your restaurant. The marketplace owns your customer." Side-by-side with commission comparison calculator ($40 order example).
4. **Platform pillars** -- 4-card grid: White-label ordering, Neighborhood Hub, AI Growth Autopilot, Delivery.
5. **How it works timeline** -- Day 1, Week 1, Month 1, Ongoing. Vertical timeline with numbered steps.
6. **Solutions by segment** -- 4-card grid: Independent, Multi-location, Delivery-first, Ecosystem partners.
7. **Comparison section** -- "Infrastructure, not extraction." Two-column: Marketplace model (red X items) vs N4Cluster model (green check items).
8. **Resources teaser** -- 3 most recent articles.
9. **Final CTA section** -- "Ready to stop paying commissions?" with demo + pricing CTAs.

**SEO intent:** "commission-free restaurant ordering", "alternative to DoorDash for restaurants", "direct ordering platform"

**Schema markup:** `Organization`, `WebSite`, `FAQPage` (if FAQ section added)

---

### D2. Pricing (`/pricing`)

**Purpose:** Eliminate pricing uncertainty and convert high-intent visitors.  
**Target persona:** Restaurant owner comparing options, already aware of commission problem.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See How It Works

**Required sections:**

1. **Hero (centered)** -- "$0.99 per order. No commission. Ever."
2. **Commission comparison table** -- DoorDash/Uber Eats/Grubhub/N4Cluster across $40/$80/$150 order sizes.
3. **Interactive savings calculator** -- Slider for avg order value + monthly order count. Real-time display of marketplace cost vs N4Cluster cost. Annual savings highlight.
4. **What is included** -- Single tier, everything included. Feature checklist: white-label site, Neighborhood Hub, N4Logic, N4Sync, POS integration, analytics dashboard.
5. **Pricing protections** -- 6 cards: No monthly minimums, no commission, no pricing parity, no bundled charges, no hidden renewals, right to exit.
6. **Customer fee explanation** -- $0.50 Neighborhood Fee details, opt-out info.
7. **Price lock options** -- 1-year and 2-year lock terms, CPI adjustment formula.
8. **FAQ section** -- Pricing-specific questions (subset of main FAQ).
9. **Final CTA** -- "The math works. See for yourself."

**SEO intent:** "restaurant ordering platform pricing", "flat fee ordering system", "DoorDash commission alternative"

**Schema markup:** `Product` with `offers`, `FAQPage`

---

### D3. Platform (`/platform`)

**Purpose:** Explain the four-pillar architecture for technical and business evaluators.  
**Target persona:** Multi-location operator or technical decision-maker.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Integrations

**Required sections:**

1. **Hero (centered)** -- "The connected operating layer for local commerce."
2. **Platform overview** -- Brief paragraph positioning N4Cluster as infrastructure, not a tool.
3. **Pillar deep-dives** -- Four alternating image+text sections:
   - **White-label Ordering** -- Branded storefront, custom domain, menu management, checkout.
   - **Neighborhood Hub** -- Local discovery feed, distance-based ranking, shared demand.
   - **N4Sync Orchestration** -- POS integration, driver dispatch, SLA tracking, order routing. Anchor: `#n4sync`.
   - **N4Logic AI** -- Demand monitoring, campaign automation, risk detection, growth signals.
4. **Integration logos strip** -- POS partners, delivery partners, payment processors.
5. **Architecture diagram** -- Simplified visual: Merchant storefront -> N4Cluster platform -> POS / Delivery / Payments.
6. **Final CTA** -- "See the full platform in action."

**SEO intent:** "restaurant ordering platform", "restaurant technology stack", "POS integration ordering"

**Schema markup:** `SoftwareApplication`

---

### D4. How It Works (`/how-it-works`)

**Purpose:** Reduce perceived complexity by showing a clear onboarding path.  
**Target persona:** Restaurant owner hesitant about switching costs.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Pricing

**Required sections:**

1. **Hero (centered)** -- "Live in days. Growing in weeks."
2. **Step-by-step timeline** -- Expanded 6-step version:
   - Step 1: Sign up and connect your POS
   - Step 2: We auto-import and clean your menu
   - Step 3: Review and approve your branded storefront
   - Step 4: Go live -- orders flow directly to your kitchen
   - Step 5: Join the Neighborhood Hub for local discovery
   - Step 6: N4Logic activates growth automation
3. **What you need to provide** -- Checklist: POS credentials, menu review approval, brand assets (logo, colors). "We handle everything else."
4. **What N4Cluster handles** -- Checklist: Site build, menu import, delivery coordination, analytics setup, AI configuration.
5. **Timeline expectations** -- "Day 1: POS connected. Day 3: Storefront live. Week 1: Neighborhood Hub active. Month 1: AI autopilot running."
6. **Final CTA** -- "Ready to get started?"

**SEO intent:** "how to set up direct ordering", "restaurant ordering setup", "switch from DoorDash"

**Schema markup:** `HowTo` with steps

---

### D5. Integrations (`/integrations`)

**Purpose:** Show ecosystem breadth and reduce "will it work with my POS" objection.  
**Target persona:** Restaurant owner with existing tech stack, IT decision-maker.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** Partner with Us

**Required sections:**

1. **Hero (centered)** -- "Connects to the tools you already use."
2. **Integration categories** -- Tabbed or filtered grid:
   - POS Systems (Square, Toast, Clover, Revel, etc.)
   - Delivery Networks
   - Payment Processors
   - Accounting / Reporting
3. **Integration detail cards** -- For each: logo, name, status (Live / Coming Soon / Beta), brief description.
4. **How integration works** -- 3-step: Connect credentials -> N4Sync maps data -> Orders flow automatically.
5. **API / custom integration** -- Brief section for technical partners.
6. **Final CTA** -- "Don't see your system? Talk to us."

**SEO intent:** "Square POS ordering integration", "Toast direct ordering", "restaurant POS integration"

**Schema markup:** `SoftwareApplication` with `applicationCategory`

---

### D6. Solutions -- Independent Restaurants (`/solutions/independent`)

**Purpose:** Dedicated landing page for the primary audience segment.  
**Target persona:** Single-location restaurant owner paying marketplace commissions.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Pricing

**Required sections:**

1. **Hero (split)** -- "Own your orders. Keep your margin." Subhead focused on commission escape.
2. **Problem quantification** -- "On 200 orders/month at $40 avg, you're paying $2,400/month to DoorDash. With N4Cluster: $198."
3. **Three pillars for independents** -- Branded ordering, customer ownership, AI growth -- each with independent-specific framing.
4. **Savings calculator** -- Pre-filled for single-location scenario.
5. **Social proof / case study teaser** -- Design partner story or anonymized metrics.
6. **Objection handling** -- "But my customers are already on DoorDash" / "I don't have time to manage another platform" / "What if it doesn't work?"
7. **Final CTA** -- "Start your pilot. $0.99 per order."

**SEO intent:** "direct ordering for independent restaurants", "stop paying DoorDash commissions", "restaurant commission-free ordering"

---

### D7. Solutions -- Multi-location Brands (`/solutions/multi-location`)

**Purpose:** Dedicated landing page for multi-location operators.  
**Target persona:** Operations director or owner of 5-50 location restaurant group.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Platform

**Required sections:**

1. **Hero (split)** -- "One platform across every location." Subhead: unified ordering, centralized visibility.
2. **Multi-location challenges** -- Fragmented tech, inconsistent brand, no cross-location analytics.
3. **N4Cluster for multi-location** -- Centralized dashboard, location-level performance, consistent branded experience, single integration.
4. **Operational benefits** -- Menu management at scale, unified reporting, per-location SLA tracking.
5. **Social proof / pilot teaser** -- Multi-location design partner story.
6. **Final CTA** -- "See how it works across locations."

**SEO intent:** "multi-location restaurant ordering platform", "restaurant group technology", "centralized restaurant ordering"

---

### D8. Request a Demo (`/request-demo`)

**Purpose:** Primary conversion page. Every CTA on the site points here.  
**Target persona:** All segments at decision stage.  
**Primary CTA:** Submit form  

**Required sections:**

1. **Split layout** -- Left: form. Right: value reinforcement.
2. **Form fields:**
   - First name (required)
   - Last name (required)
   - Work email (required, validated)
   - Company name (required)
   - Business type (dropdown: Independent Restaurant, Restaurant Group, Delivery-first, Technology Partner, Other)
   - Number of locations (dropdown: 1, 2-5, 6-20, 20+)
   - Area of interest (dropdown: Branded Ordering, N4Sync, N4Logic, Multi-location, Partnership, General)
   - Message (textarea, optional)
   - Consent checkbox (required)
3. **Right column content:**
   - "What happens next" -- 3 steps: We review your submission, schedule a 30-min walkthrough, build a pilot plan.
   - Trust signals: "$0.99/order", "No commitment required", "Live in days"
   - Optional: testimonial quote
4. **Success state** -- Confirmation message, expected response time, link to resources.

**SEO intent:** Not a search landing page. `noindex` is acceptable. Focus on conversion rate.

---

### D9. Resources Hub (`/resources`)

**Purpose:** SEO content hub and thought leadership. Secondary conversion via newsletter.  
**Target persona:** Restaurant owners researching solutions, SEO visitors.  
**Primary CTA:** Subscribe to newsletter  
**Secondary CTA:** Read article

**Required sections:**

1. **Hero (simple)** -- "Ideas on building a better local commerce model."
2. **Category filter** -- Tabs or pills: All, Insights, Guides, Case Studies.
3. **Article grid** -- Card layout: category badge, title, excerpt, read time, date.
4. **Newsletter signup** -- Inline form between rows or sticky sidebar.
5. **Pagination** -- Load more or numbered pages.

**SEO intent:** Hub page for content clusters (see Section I).

---

### D10. Article Template (`/resources/[slug]`)

**Purpose:** Individual content piece for SEO and thought leadership.  
**Target persona:** SEO visitor searching for restaurant commerce topics.  
**Primary CTA:** Request a Demo (contextual)  
**Secondary CTA:** Subscribe to newsletter

**Required sections:**

1. **Article header** -- Category, title, date, read time, author (optional).
2. **Body content** -- Portable text rendered from Sanity. Supports: paragraphs, headings, lists, images, callout blocks, CTA blocks.
3. **Inline CTA block** -- Contextual CTA mid-article or post-article. CMS-configurable.
4. **Related articles** -- 3 articles from same category or cluster.
5. **Newsletter signup** -- Bottom of article.

**SEO intent:** Long-tail keywords per article. Each article targets a specific content cluster.

**Schema markup:** `Article` with `author`, `datePublished`, `publisher`

---

### D11. Case Study Template (`/case-studies/[slug]`)

**Purpose:** Social proof for conversion-stage visitors.  
**Target persona:** Restaurant owner evaluating N4Cluster, wanting proof it works.  
**Primary CTA:** Start Your Pilot  
**Secondary CTA:** See Pricing

**Required sections:**

1. **Header** -- Business name (or anonymized), type, location, key metric highlight.
2. **Challenge** -- What problem the business faced.
3. **Solution** -- How N4Cluster was implemented.
4. **Results** -- Metrics: orders/month, savings, customer retention, time to live.
5. **Quote** -- Pull quote from operator (or anonymized).
6. **Key takeaways** -- 3 bullet summary.
7. **CTA** -- "Start your pilot."

**SEO intent:** "restaurant direct ordering case study", "[business type] commission savings"

**Schema markup:** `Article` with `about` referencing the business

---

### D12. About (`/about`)

**Purpose:** Build trust through founder story and mission clarity.  
**Target persona:** Evaluator doing due diligence, potential partner.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Careers

**Required sections:**

1. **Hero** -- "Why N4Cluster exists."
2. **Origin story** -- Founder narrative: observed the commission problem, built the alternative.
3. **Mission statement** -- "Infrastructure for local commerce. Merchant-first. Always."
4. **Values / principles** -- 4-5 core principles: merchant ownership, transparent pricing, accountability, neighborhood-first.
5. **Team section** -- Founder + key team. Photos optional at early stage; role + brief bio.
6. **Timeline** -- Key milestones (founding, first pilot, platform launch).
7. **CTA** -- "Join us" (careers) + "Work with us" (demo).

---

### D13. Trust and Security (`/trust-security`)

**Purpose:** Address data, security, and compliance concerns for technical evaluators.  
**Target persona:** Multi-location IT team, compliance-conscious operators.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** Contact Us

**Required sections:**

1. **Hero** -- "Your data. Your control. Our responsibility."
2. **Data ownership** -- What data the merchant owns, what N4Cluster accesses, data portability.
3. **Security practices** -- Encryption, access controls, infrastructure (Vercel/GCP), SOC 2 status or roadmap.
4. **Compliance** -- GDPR, CCPA, PCI DSS (via payment processor).
5. **Uptime and reliability** -- SLA commitments, status page link.
6. **Contractual protections** -- Price lock, exit rights, change notice periods.

---

### D14. FAQ (`/faq`)

**Purpose:** Objection handling and SEO capture for question-based searches.  
**Target persona:** All segments with specific questions.  
**Primary CTA:** Request a Demo  
**Secondary CTA:** See Pricing

**Required sections:**

1. **Hero (simple)** -- "Common questions, straight answers."
2. **Category tabs** -- General, Pricing, Platform, Getting Started, Data & Security.
3. **Accordion FAQ items** -- Question/answer pairs, expandable.
4. **CTA** -- "Still have questions? Talk to us."

**SEO intent:** Question-based long-tail queries. Each FAQ item is a featured snippet candidate.

**Schema markup:** `FAQPage` with all `Question` / `Answer` pairs.

---

## E. Design System Specification

### E1. Typography scale

All values use the Inter typeface via `--font-sans` / `--font-display`.

| Token | Size | Weight | Line height | Letter spacing | Usage |
|---|---|---|---|---|---|
| `display-xl` | 56px / 3.5rem | 700 | 1.1 | -0.03em | Homepage hero headline |
| `display-lg` | 48px / 3rem | 700 | 1.15 | -0.025em | Page hero headlines |
| `display-md` | 40px / 2.5rem | 700 | 1.2 | -0.02em | Section headlines |
| `heading-lg` | 32px / 2rem | 700 | 1.25 | -0.02em | Sub-section headlines |
| `heading-md` | 24px / 1.5rem | 700 | 1.3 | -0.015em | Card titles, feature titles |
| `heading-sm` | 20px / 1.25rem | 600 | 1.35 | -0.01em | Small headings |
| `body-lg` | 18px / 1.125rem | 400 | 1.7 | 0 | Hero subheads, lead paragraphs |
| `body-md` | 16px / 1rem | 400 | 1.6 | 0 | Default body text |
| `body-sm` | 14px / 0.875rem | 400 | 1.6 | 0 | Card descriptions, secondary text |
| `caption` | 12px / 0.75rem | 500 | 1.5 | 0.02em | Eyebrows, badges, fine print |
| `eyebrow` | 12px / 0.75rem | 600 | 1.5 | 0.08em | Section eyebrows (uppercase) |

### E2. Color palette

Defined in `globals.css` under `@theme`:

| Role | Token | Hex | Usage |
|---|---|---|---|
| **Navy** (primary dark) | `navy-950` | `#040d1c` | Headlines, hero backgrounds |
| | `navy-900` | `#0a1628` | Dark section backgrounds |
| | `navy-800` | `#0f2040` | Dark cards, dark inputs |
| | `navy-700` | `#162d58` | Dark section accents |
| | `navy-600` | `#1e3a70` | Dark borders |
| **Cobalt** (primary action) | `cobalt-600` | `#1a4fd6` | Hover states |
| | `cobalt-500` | `#2563eb` | Primary buttons, links, focus rings |
| | `cobalt-400` | `#3b82f6` | Light accents |
| | `cobalt-300` | `#93c5fd` | Badges, light fills |
| **Teal** (N4Sync / success) | `teal-600` | `#0d9488` | Hover states |
| | `teal-500` | `#14b8a6` | Success states, N4Sync brand |
| | `teal-400` | `#2dd4bf` | Light accents |
| **Amber** (N4Logic / attention) | `amber-500` | `#f59e0b` | N4Logic brand, warnings |
| | `amber-400` | `#fbbf24` | Light accents |
| **Slate** (neutrals) | `slate-950` to `slate-50` | Standard | Body text, borders, backgrounds |
| **Semantic** | `red-400/500` | `#f87171/#ef4444` | Errors, negative comparison |

### E3. Layout rules

- **Max content width:** 1280px (`max-w-7xl`), centered with `mx-auto px-6`
- **Narrow content:** 960px (`max-w-5xl`) for articles, forms
- **Grid:** 12-column base. Common layouts: 1-col, 2-col (50/50, 60/40), 3-col, 4-col
- **Section padding:** `py-16 md:py-24` (64px / 96px)
- **Card gap:** `gap-6` (24px)
- **Responsive breakpoints:** `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`

### E4. Spacing scale

Use Tailwind's default scale. Key values:

| Token | Value | Usage |
|---|---|---|
| `1` | 4px | Tight internal spacing |
| `2` | 8px | Icon gaps, tight padding |
| `3` | 12px | Small padding |
| `4` | 16px | Standard padding |
| `5` | 20px | Form field spacing |
| `6` | 24px | Card gaps, section internal |
| `8` | 32px | Section internal spacing |
| `10` | 40px | Large internal spacing |
| `12` | 48px | Between major blocks |
| `16` | 64px | Section vertical padding (mobile) |
| `24` | 96px | Section vertical padding (desktop) |

### E5. Buttons

| Variant | Classes | Usage |
|---|---|---|
| **Primary** | `bg-cobalt-500 hover:bg-cobalt-600 text-white font-semibold py-3 px-6 rounded-lg` | Main CTAs |
| **Secondary** | `bg-white border border-slate-300 hover:border-cobalt-500 text-navy-950 font-semibold py-3 px-6 rounded-lg` | Secondary CTAs |
| **Ghost** | `text-cobalt-500 hover:text-cobalt-600 font-semibold py-2 px-4` | Inline links, "Learn more" |
| **Dark primary** | `bg-white text-navy-950 hover:bg-slate-100 font-semibold py-3 px-6 rounded-lg` | CTAs on dark backgrounds |
| **Dark secondary** | `border border-slate-500 text-white hover:border-white font-semibold py-3 px-6 rounded-lg` | Secondary on dark |

All buttons: `text-sm`, `transition-colors`, `focus-visible:outline-2 focus-visible:outline-cobalt-500 focus-visible:outline-offset-2`. Minimum touch target: 44x44px.

### E6. Cards

| Variant | Appearance |
|---|---|
| **Default** | `bg-white rounded-2xl border border-slate-200 p-7` |
| **Hoverable** | Default + `card-hover` utility (translateY -2px, shadow on hover) |
| **Dark** | `bg-navy-900 rounded-2xl border border-navy-600 p-7` |
| **Highlighted** | `bg-navy-950 rounded-2xl border border-cobalt-500 p-7` (featured card) |
| **Metric** | Compact card with large number, label, optional delta badge |

### E7. Forms

- Input: `rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-500/20`
- Select: Same as input
- Textarea: Same as input, `min-h-[120px]`
- Checkbox: `h-4 w-4 rounded border-slate-300 text-cobalt-500 focus:ring-cobalt-500`
- Error state: `border-red-400 focus:border-red-400 focus:ring-red-400/20`
- Error text: `text-xs text-red-500 mt-1`
- Label: `text-sm font-medium text-slate-700 mb-1.5`

### E8. Section variants

| Variant | Background | Text color |
|---|---|---|
| **White** | `bg-white` | `text-navy-950` / `text-slate-600` |
| **Light** | `bg-slate-50` or `gradient-section` | Same |
| **Dark (navy)** | `gradient-hero` or `gradient-dark` | `text-white` / `text-slate-300` |
| **Cobalt** | `gradient-cobalt` | `text-white` |

### E9. Proof modules

- **Trust strip:** Horizontal scrolling bar of text proof points. Light background, `text-sm font-medium`.
- **Logo strip:** Horizontal row of partner/integration logos. Grayscale by default, color on hover. Caption: "Trusted by" or "Integrates with".
- **Metric cards:** Large number + label + context. Used in case studies and comparison sections.
- **Comparison table:** Two-column layout with X/Check iconography. Dark background for N4Cluster column.
- **Testimonial card:** Quote, attribution (name, role, company), optional photo. Light border, left accent bar.

### E10. Savings calculator

Interactive client component:

- **Inputs:** Average order value (slider, $20-$200, default $40), Monthly order count (slider, 50-2000, default 200)
- **Outputs:** Monthly marketplace cost (at 25%), Monthly N4Cluster cost (orders x $0.99), Monthly savings, Annual savings
- **Visual:** Side-by-side bar chart or large number comparison
- **CTA:** "See full pricing" button below calculator

### E11. Header

- **Desktop:** Sticky, white background, blur backdrop on scroll. Logo left, nav center, "Request a Demo" button right.
- **Mobile:** Hamburger menu, slide-in drawer. Logo left, hamburger right.
- **Scroll behavior:** Background transitions from transparent to white with shadow after 50px scroll.
- **Active state:** Current page nav item gets `text-cobalt-500` color.

### E12. Footer

- **Layout:** 5-column link grid (see Section C), newsletter signup form, social links, copyright.
- **Background:** `navy-950` dark footer.
- **Text:** `text-slate-400` for links, `text-white` for headings.

---

## F. Component Architecture

### F1. Component inventory

**Layout components** (Server):
- `SiteHeader` -- Global header with navigation
- `SiteFooter` -- Global footer
- `Container` -- Max-width wrapper (`size="sm" | "md" | "lg" | "xl"`)
- `SectionContainer` -- Section wrapper with background variant

**Section components** (Server, CMS-mappable):
- `HeroSplit` -- Hero with text left, visual right
- `HeroCentered` -- Full-width centered hero
- `TrustStrip` -- Horizontal proof point bar
- `LogoStrip` -- Partner/integration logo row
- `FeatureGrid` -- Grid of feature/pillar cards
- `ImageTextBlock` -- Alternating image + text section
- `StepTimeline` -- Vertical step-by-step timeline
- `ComparisonCards` -- Two-column marketplace vs N4Cluster
- `PricingTiers` -- Pricing feature table
- `FAQAccordion` -- Expandable question/answer list
- `CTASection` -- Full-width CTA banner
- `AudienceSegments` -- Segment cards grid
- `ResourceGrid` -- Article card grid
- `TestimonialBlock` -- Quote card or carousel
- `MetricStrip` -- Row of key metrics
- `ComparisonTable` -- Multi-row feature comparison

**UI components** (Server):
- `Button` -- All button variants
- `Card` -- Base card with variants
- `Badge` -- Category/status badges
- `SectionIntro` -- Eyebrow + heading + subheading
- `Divider` -- Section divider

**Interactive components** (Client -- `"use client"`):
- `SavingsCalculator` -- Pricing page calculator
- `ContactForm` -- Demo request form
- `NewsletterForm` -- Email capture form
- `FAQAccordionClient` -- Accordion expand/collapse logic
- `MobileNav` -- Mobile navigation drawer
- `CookieConsent` -- Cookie banner
- `Analytics` -- GA4 + PostHog script loader
- `TabFilter` -- Category filter tabs (resources, integrations)

### F2. Folder structure

```
components/
  layout/
    SiteHeader.tsx
    SiteFooter.tsx
    MobileNav.tsx          (client)
  sections/
    HeroSplit.tsx
    HeroCentered.tsx
    TrustStrip.tsx
    LogoStrip.tsx
    FeatureGrid.tsx
    ImageTextBlock.tsx
    StepTimeline.tsx
    ComparisonCards.tsx
    ComparisonTable.tsx
    PricingTiers.tsx
    FAQAccordion.tsx       (server wrapper)
    FAQAccordionClient.tsx (client)
    CTASection.tsx
    AudienceSegments.tsx
    ResourceGrid.tsx
    TestimonialBlock.tsx
    MetricStrip.tsx
    SavingsCalculator.tsx  (client)
  forms/
    ContactForm.tsx        (client)
    NewsletterForm.tsx     (client)
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    Container.tsx
    SectionContainer.tsx
    SectionIntro.tsx
    Divider.tsx
  shared/
    Analytics.tsx           (client)
    CookieConsent.tsx       (client)
    SchemaMarkup.tsx        (server -- JSON-LD renderer)
    PortableText.tsx        (server -- Sanity portable text)
```

### F3. Server/client guidance

**Rule:** Default to Server Components. Only use `"use client"` when the component requires:
- `useState`, `useEffect`, or other React hooks
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Third-party client-only libraries

**Pattern for mixed components:** Create a server wrapper that fetches data, passes it to a client child for interactivity. Example: `FAQAccordion` (server, fetches data) renders `FAQAccordionClient` (client, handles expand/collapse).

### F4. CMS block architecture

Each Sanity "page builder" block maps 1:1 to a section component. The page query returns an array of blocks; the renderer maps each block's `_type` to the correct component.

```typescript
// lib/sanity/block-renderer.tsx
import { HeroSplit } from "@/components/sections/HeroSplit";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
// ... etc

const blockComponents: Record<string, React.ComponentType<any>> = {
  "block.heroSplit": HeroSplit,
  "block.heroCentered": HeroCentered,
  "block.trustStrip": TrustStrip,
  "block.logoStrip": LogoStrip,
  "block.featureGrid": FeatureGrid,
  "block.imageText": ImageTextBlock,
  "block.stepTimeline": StepTimeline,
  "block.comparisonCards": ComparisonCards,
  "block.comparisonTable": ComparisonTable,
  "block.pricingTiers": PricingTiers,
  "block.faqAccordion": FAQAccordion,
  "block.ctaSection": CTASection,
  "block.audienceSegments": AudienceSegments,
  "block.resourceGrid": ResourceGrid,
  "block.testimonialBlock": TestimonialBlock,
  "block.metricStrip": MetricStrip,
  "block.savingsCalculator": SavingsCalculator,
  "block.richText": RichTextBlock,
};

export function BlockRenderer({ blocks }: { blocks: SanityBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];
        if (!Component) return null;
        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
```

---

## G. CMS and Content Model (Sanity)

### G1. Sanity project setup

- **Sanity Studio:** Embedded at `/studio` route using `sanity/studio` Next.js integration, or standalone at `studio.n4cluster.com`.
- **Dataset:** `production` (live), `staging` (preview).
- **API version:** `2026-04-01`
- **Content Lake:** Hosted by Sanity.
- **GROQ** for queries. No GraphQL.

### G2. Schema definitions

#### `page` -- CMS-managed pages

```typescript
// sanity/schemas/documents/page.ts
export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO",
      type: "seoObject",
    },
    {
      name: "blocks",
      title: "Page Blocks",
      type: "array",
      of: [
        { type: "block.heroSplit" },
        { type: "block.heroCentered" },
        { type: "block.trustStrip" },
        { type: "block.logoStrip" },
        { type: "block.featureGrid" },
        { type: "block.imageText" },
        { type: "block.stepTimeline" },
        { type: "block.comparisonCards" },
        { type: "block.comparisonTable" },
        { type: "block.pricingTiers" },
        { type: "block.faqAccordion" },
        { type: "block.ctaSection" },
        { type: "block.audienceSegments" },
        { type: "block.resourceGrid" },
        { type: "block.testimonialBlock" },
        { type: "block.metricStrip" },
        { type: "block.savingsCalculator" },
        { type: "block.richText" },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }: { title: string; slug: string }) {
      return { title, subtitle: `/${slug}` };
    },
  },
};
```

#### `block.heroSplit` -- Example page-builder block

```typescript
// sanity/schemas/blocks/heroSplit.ts
export default {
  name: "block.heroSplit",
  title: "Hero (Split)",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule: any) => Rule.required().max(120),
    },
    { name: "subheading", title: "Subheading", type: "text", rows: 3 },
    {
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaObject",
    },
    {
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaObject",
    },
    { name: "microcopy", title: "Microcopy", type: "string" },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "backgroundVariant",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Dark (Navy)", value: "dark" },
          { title: "Light", value: "light" },
          { title: "White", value: "white" },
        ],
      },
      initialValue: "dark",
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }: { title: string }) {
      return { title: `Hero Split: ${title}` };
    },
  },
};
```

#### `block.heroCentered`

```typescript
export default {
  name: "block.heroCentered",
  title: "Hero (Centered)",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "subheading", title: "Subheading", type: "text", rows: 3 },
    { name: "primaryCta", title: "Primary CTA", type: "ctaObject" },
    { name: "secondaryCta", title: "Secondary CTA", type: "ctaObject" },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["dark", "light", "white"] }, initialValue: "dark" },
  ],
};
```

#### `block.trustStrip`

```typescript
export default {
  name: "block.trustStrip",
  title: "Trust Strip",
  type: "object",
  fields: [
    {
      name: "items",
      title: "Trust Points",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.min(3).max(7),
    },
  ],
};
```

#### `block.featureGrid`

```typescript
export default {
  name: "block.featureGrid",
  title: "Feature Grid",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon Name", type: "string", description: "Lucide icon name (e.g., 'Store', 'MapPin')" },
            { name: "color", title: "Accent Color", type: "string", options: { list: ["cobalt", "teal", "amber"] } },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(2).max(8),
    },
    { name: "columns", title: "Columns", type: "number", options: { list: [2, 3, 4] }, initialValue: 2 },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["white", "light", "dark"] }, initialValue: "light" },
  ],
};
```

#### `block.imageText`

```typescript
export default {
  name: "block.imageText",
  title: "Image + Text",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "imagePosition", title: "Image Position", type: "string", options: { list: ["left", "right"] }, initialValue: "right" },
    { name: "cta", title: "CTA", type: "ctaObject" },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["white", "light", "dark"] } },
  ],
};
```

#### `block.stepTimeline`

```typescript
export default {
  name: "block.stepTimeline",
  title: "Step Timeline",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "tag", title: "Tag (e.g., Day 1)", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "color", title: "Accent Color", type: "string", options: { list: ["cobalt", "teal", "amber"] } },
          ],
        },
      ],
    },
    { name: "cta", title: "Bottom CTA", type: "ctaObject" },
  ],
};
```

#### `block.comparisonCards`

```typescript
export default {
  name: "block.comparisonCards",
  title: "Comparison Cards",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "competitorCard",
      title: "Competitor Card",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "items", title: "Items", type: "array", of: [{ type: "string" }] },
      ],
    },
    {
      name: "n4clusterCard",
      title: "N4Cluster Card",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "items", title: "Items", type: "array", of: [{ type: "string" }] },
      ],
    },
  ],
};
```

#### `block.ctaSection`

```typescript
export default {
  name: "block.ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "subheading", title: "Subheading", type: "text" },
    { name: "primaryCta", title: "Primary CTA", type: "ctaObject" },
    { name: "secondaryCta", title: "Secondary CTA", type: "ctaObject" },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["dark", "cobalt"] }, initialValue: "dark" },
  ],
};
```

#### `block.richText`

```typescript
export default {
  name: "block.richText",
  title: "Rich Text",
  type: "object",
  fields: [
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "ctaObject" },
      ],
    },
    { name: "maxWidth", title: "Max Width", type: "string", options: { list: ["sm", "md", "lg"] }, initialValue: "md" },
  ],
};
```

#### `block.savingsCalculator`

```typescript
export default {
  name: "block.savingsCalculator",
  title: "Savings Calculator",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    { name: "defaultOrderValue", title: "Default Avg Order ($)", type: "number", initialValue: 40 },
    { name: "defaultMonthlyOrders", title: "Default Monthly Orders", type: "number", initialValue: 200 },
    { name: "marketplaceRate", title: "Marketplace Rate (%)", type: "number", initialValue: 25 },
    { name: "n4clusterFee", title: "N4Cluster Fee ($)", type: "number", initialValue: 0.99 },
    { name: "cta", title: "CTA", type: "ctaObject" },
  ],
};
```

#### `block.testimonialBlock`

```typescript
export default {
  name: "block.testimonialBlock",
  title: "Testimonial Block",
  type: "object",
  fields: [
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (Rule: any) => Rule.min(1).max(6),
    },
    { name: "layout", title: "Layout", type: "string", options: { list: ["single", "grid", "carousel"] }, initialValue: "grid" },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["white", "light", "dark"] } },
  ],
};
```

#### `block.logoStrip`

```typescript
export default {
  name: "block.logoStrip",
  title: "Logo Strip",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", description: "e.g., 'Integrates with' or 'Trusted by'" },
    {
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Company Name", type: "string" },
            { name: "logo", title: "Logo", type: "image" },
            { name: "url", title: "URL (optional)", type: "url" },
          ],
        },
      ],
    },
  ],
};
```

#### `block.metricStrip`

```typescript
export default {
  name: "block.metricStrip",
  title: "Metric Strip",
  type: "object",
  fields: [
    {
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string", description: "e.g., '$0.99', '30 min', '100%'" },
            { name: "label", title: "Label", type: "string" },
            { name: "description", title: "Description (optional)", type: "string" },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(2).max(5),
    },
    { name: "backgroundVariant", title: "Background", type: "string", options: { list: ["white", "light", "dark"] } },
  ],
};
```

#### `block.faqAccordion`

```typescript
export default {
  name: "block.faqAccordion",
  title: "FAQ Accordion",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    {
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    },
    {
      name: "inlineItems",
      title: "Inline FAQ Items (if not using references)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
    },
    { name: "cta", title: "Bottom CTA", type: "ctaObject" },
  ],
};
```

#### `block.comparisonTable`

```typescript
export default {
  name: "block.comparisonTable",
  title: "Comparison Table",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    {
      name: "columns",
      title: "Columns",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., ['DoorDash', 'Uber Eats', 'Grubhub', 'N4Cluster']",
    },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Row Label", type: "string" },
            { name: "values", title: "Values", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    },
    { name: "highlightColumn", title: "Highlight Column Index", type: "number", description: "0-based index of the column to highlight (N4Cluster)" },
  ],
};
```

#### `block.audienceSegments`

```typescript
export default {
  name: "block.audienceSegments",
  title: "Audience Segments",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "segments",
      title: "Segments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "outcomes", title: "Outcomes", type: "array", of: [{ type: "string" }] },
            { name: "href", title: "Link", type: "string" },
            { name: "color", title: "Accent", type: "string", options: { list: ["cobalt", "teal", "amber"] } },
          ],
        },
      ],
    },
  ],
};
```

#### `block.resourceGrid`

```typescript
export default {
  name: "block.resourceGrid",
  title: "Resource Grid",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "text" },
    {
      name: "source",
      title: "Source",
      type: "string",
      options: { list: [{ title: "Latest articles", value: "latest" }, { title: "Manual selection", value: "manual" }] },
      initialValue: "latest",
    },
    {
      name: "articles",
      title: "Selected Articles (if manual)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      hidden: ({ parent }: any) => parent?.source !== "manual",
    },
    { name: "limit", title: "Limit (if latest)", type: "number", initialValue: 3 },
    { name: "cta", title: "View All CTA", type: "ctaObject" },
  ],
};
```

---

#### Document: `article`

```typescript
export default {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required().max(120) },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string", options: { list: ["Insights", "Guides", "News"] } },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (Rule: any) => Rule.required().max(300) },
    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "block.ctaSection" },
      ],
    },
    { name: "readTime", title: "Read Time", type: "string" },
    { name: "seo", title: "SEO", type: "seoObject" },
    { name: "publishedAt", title: "Published At", type: "datetime", validation: (Rule: any) => Rule.required() },
    {
      name: "contentCluster",
      title: "Content Cluster",
      type: "string",
      options: {
        list: [
          "restaurant-direct-ordering",
          "marketplace-alternatives",
          "pos-integration",
          "restaurant-growth",
          "neighborhood-commerce",
          "logistics-orchestration",
        ],
      },
    },
  ],
  orderings: [{ title: "Published Date", name: "publishedAt", by: [{ field: "publishedAt", direction: "desc" }] }],
};
```

#### Document: `caseStudy`

```typescript
export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "businessName", title: "Business Name", type: "string", description: "Use anonymized name if needed" },
    { name: "businessType", title: "Business Type", type: "string", options: { list: ["Independent Restaurant", "Multi-location Brand", "Delivery-first Operator"] } },
    { name: "location", title: "Location", type: "string" },
    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } },
    {
      name: "metrics",
      title: "Key Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "context", title: "Context", type: "string" },
          ],
        },
      ],
    },
    { name: "challenge", title: "Challenge", type: "array", of: [{ type: "block" }] },
    { name: "solution", title: "Solution", type: "array", of: [{ type: "block" }] },
    { name: "results", title: "Results", type: "array", of: [{ type: "block" }] },
    { name: "quote", title: "Pull Quote", type: "text" },
    { name: "quoteAttribution", title: "Quote Attribution", type: "string" },
    { name: "takeaways", title: "Key Takeaways", type: "array", of: [{ type: "string" }], validation: (Rule: any) => Rule.max(5) },
    { name: "seo", title: "SEO", type: "seoObject" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
  ],
};
```

#### Document: `faq`

```typescript
export default {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "answer", title: "Answer", type: "text", validation: (Rule: any) => Rule.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["General", "Pricing", "Platform", "Getting Started", "Data & Security"] },
    },
    { name: "order", title: "Sort Order", type: "number" },
  ],
  orderings: [{ title: "Sort Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
};
```

#### Document: `testimonial`

```typescript
export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", title: "Quote", type: "text", validation: (Rule: any) => Rule.required() },
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "photo", title: "Photo", type: "image" },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
  ],
};
```

#### Document: `integration`

```typescript
export default {
  name: "integration",
  title: "Integration",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "logo", title: "Logo", type: "image", validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string", options: { list: ["POS", "Delivery", "Payments", "Accounting"] } },
    { name: "description", title: "Description", type: "text" },
    { name: "status", title: "Status", type: "string", options: { list: ["Live", "Beta", "Coming Soon"] }, initialValue: "Coming Soon" },
    { name: "url", title: "Partner URL", type: "url" },
  ],
};
```

#### Document: `author`

```typescript
export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "photo", title: "Photo", type: "image" },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
  ],
};
```

#### Object: `seoObject`

```typescript
export default {
  name: "seoObject",
  title: "SEO",
  type: "object",
  fields: [
    { name: "metaTitle", title: "Meta Title", type: "string", validation: (Rule: any) => Rule.max(70) },
    { name: "metaDescription", title: "Meta Description", type: "text", rows: 3, validation: (Rule: any) => Rule.max(160) },
    { name: "ogImage", title: "OG Image", type: "image" },
    { name: "noIndex", title: "No Index", type: "boolean", initialValue: false },
    { name: "canonicalUrl", title: "Canonical URL", type: "url" },
  ],
};
```

#### Object: `ctaObject`

```typescript
export default {
  name: "ctaObject",
  title: "CTA",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "Link", type: "string" },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["primary", "secondary", "ghost"] },
      initialValue: "primary",
    },
    {
      name: "trackingEvent",
      title: "Analytics Event Name",
      type: "string",
      description: "e.g., hero_cta_click",
    },
  ],
};
```

#### Singleton: `navigation`

```typescript
export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "mainNav",
      title: "Main Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
            { name: "description", title: "Description", type: "string" },
            {
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "href", title: "Link", type: "string" },
                    { name: "description", title: "Description", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "href", title: "Link", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

#### Singleton: `siteSettings`

```typescript
export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "name", title: "Site Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "url", title: "Site URL", type: "url" },
    { name: "ogImage", title: "Default OG Image", type: "image" },
    {
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
      ],
    },
    {
      name: "contact",
      title: "Contact Emails",
      type: "object",
      fields: [
        { name: "demoEmail", title: "Demo Email", type: "string" },
        { name: "pressEmail", title: "Press Email", type: "string" },
      ],
    },
    {
      name: "analytics",
      title: "Analytics",
      type: "object",
      fields: [
        { name: "gaMeasurementId", title: "GA4 Measurement ID", type: "string" },
        { name: "posthogKey", title: "PostHog API Key", type: "string" },
      ],
    },
  ],
};
```

### G3. Publishing workflow

1. **Draft** -- Content creator writes in Sanity Studio. Changes are saved but not visible on production.
2. **Preview** -- Content creator clicks "Preview" to see the page on the staging dataset via Next.js draft mode (`/api/draft`).
3. **Publish** -- Content creator publishes the document. Sanity webhook triggers on-demand revalidation in Next.js via `/api/revalidate`.
4. **Revalidation** -- Next.js `revalidateTag()` or `revalidatePath()` called by the webhook handler. Pages regenerate via ISR.

---

## H. Analytics and Tracking

### H1. Tool stack

| Tool | Purpose | Integration |
|---|---|---|
| **GA4** | Conversion tracking, audience reporting, search console integration | `gtag.js` via `Analytics` component |
| **PostHog** | Product analytics, session replay, feature flags, funnels | `posthog-js` client SDK |

### H2. Event naming convention

Format: `{object}_{action}` using snake_case. All custom events are prefixed with the object they relate to.

### H3. Conversion events (GA4 + PostHog)

| Event name | Trigger | Parameters |
|---|---|---|
| `demo_form_start` | User focuses first field on demo form | `form_variant`, `page_path` |
| `demo_form_submit` | Successful form submission | `form_variant`, `business_type`, `locations`, `interest`, `page_path` |
| `demo_form_error` | Form submission fails | `error_type`, `page_path` |

### H4. Engagement events (PostHog primary, mirror to GA4)

| Event name | Trigger | Parameters |
|---|---|---|
| `hero_cta_click` | Any hero CTA button clicked | `cta_label`, `cta_href`, `page_path`, `variant` |
| `pricing_cta_click` | CTA clicked on pricing page | `cta_label`, `section` |
| `calculator_interact` | User adjusts savings calculator slider | `order_value`, `monthly_orders`, `annual_savings` |
| `calculator_cta_click` | CTA below calculator clicked | `annual_savings`, `page_path` |
| `nav_click` | Top navigation item clicked | `nav_label`, `nav_href`, `is_dropdown` |
| `footer_cta_click` | Footer link or CTA clicked | `link_label`, `link_href`, `column` |
| `resource_signup` | Newsletter form submitted | `page_path`, `form_location` |
| `resource_view` | Article or case study page loaded | `slug`, `category`, `content_cluster` |
| `faq_expand` | FAQ accordion item expanded | `question`, `category` |
| `integration_filter` | Integration category filter changed | `category` |
| `comparison_view` | Comparison section scrolled into viewport | `page_path` |
| `cta_section_click` | Any CTA section button clicked | `cta_label`, `cta_href`, `section_heading` |
| `page_scroll_depth` | User scrolls past 25%, 50%, 75%, 100% | `depth`, `page_path` |
| `cookie_consent` | Cookie consent accepted or rejected | `consent_given` |

### H5. Funnel stages

```
Awareness   -> page_view (any page)
Interest    -> resource_view, faq_expand, calculator_interact
Evaluation  -> pricing page_view, comparison_view, case study resource_view
Intent      -> demo_form_start, hero_cta_click (to /request-demo)
Conversion  -> demo_form_submit
```

### H6. Implementation

```typescript
// lib/analytics.ts
type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams) {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }

  // PostHog
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(name, params);
  }
}

// Convenience helpers
export const analytics = {
  heroCtaClick: (label: string, href: string, variant?: string) =>
    trackEvent("hero_cta_click", { cta_label: label, cta_href: href, page_path: window.location.pathname, variant: variant ?? "default" }),

  pricingCtaClick: (label: string, section: string) =>
    trackEvent("pricing_cta_click", { cta_label: label, section }),

  demoFormStart: (variant: string) =>
    trackEvent("demo_form_start", { form_variant: variant, page_path: window.location.pathname }),

  demoFormSubmit: (data: { businessType: string; locations: string; interest: string }) =>
    trackEvent("demo_form_submit", { ...data, page_path: window.location.pathname }),

  calculatorInteract: (orderValue: number, monthlyOrders: number, annualSavings: number) =>
    trackEvent("calculator_interact", { order_value: orderValue, monthly_orders: monthlyOrders, annual_savings: annualSavings }),

  navClick: (label: string, href: string, isDropdown: boolean) =>
    trackEvent("nav_click", { nav_label: label, nav_href: href, is_dropdown: isDropdown }),

  footerCtaClick: (label: string, href: string, column: string) =>
    trackEvent("footer_cta_click", { link_label: label, link_href: href, column }),

  resourceSignup: (location: string) =>
    trackEvent("resource_signup", { page_path: window.location.pathname, form_location: location }),

  resourceView: (slug: string, category: string, cluster: string) =>
    trackEvent("resource_view", { slug, category, content_cluster: cluster }),

  faqExpand: (question: string, category: string) =>
    trackEvent("faq_expand", { question, category }),

  ctaSectionClick: (label: string, href: string, sectionHeading: string) =>
    trackEvent("cta_section_click", { cta_label: label, cta_href: href, section_heading: sectionHeading }),
};
```

### H7. Dashboard requirements

**GA4 dashboards:**
- Conversion funnel: page_view -> demo_form_start -> demo_form_submit
- Top converting pages (by demo_form_submit source page)
- Traffic sources by conversion rate

**PostHog dashboards:**
- Session recordings filtered by demo_form_start (to watch drop-offs)
- Calculator interaction funnel: calculator_interact -> pricing_cta_click -> demo_form_start
- CTA heatmap: which CTAs get clicked most, by page
- Content engagement: resource_view by content_cluster, avg scroll depth

---

## I. SEO and Discoverability

### I1. Title and meta standards

| Element | Format | Max length |
|---|---|---|
| Title tag | `{Page Title} | N4Cluster` | 60 chars |
| Meta description | Active-voice summary with primary keyword and CTA | 155 chars |
| OG title | Same as title tag | 60 chars |
| OG description | Same as meta description | 155 chars |
| OG image | 1200x630 branded image per page (fallback to default) | -- |
| H1 | One per page, contains primary keyword | -- |

### I2. Schema markup by page type

| Page type | Schema types |
|---|---|
| Homepage | `Organization`, `WebSite`, `SearchAction` |
| Pricing | `Product` with `offers`, `FAQPage` |
| Platform | `SoftwareApplication` |
| How It Works | `HowTo` with `HowToStep` |
| FAQ | `FAQPage` with `Question` + `Answer` |
| Article | `Article` with `author`, `publisher`, `datePublished` |
| Case Study | `Article` with `about` |
| All pages | `BreadcrumbList` |

### I3. Internal linking strategy

- Every article links to at least 2 other articles in the same content cluster.
- Every article links to the relevant solution page.
- Solution pages link to related case studies.
- FAQ answers link to relevant pages (pricing, platform, how-it-works).
- Breadcrumbs on all pages below root level.

### I4. URL strategy

- All lowercase, hyphenated slugs.
- No trailing slashes (Next.js default).
- No date-based URLs for articles (evergreen content).
- Canonical URLs on all pages.
- 301 redirects for any URL changes from current site.

### I5. Content clusters

| Cluster | Hub page | Target keywords |
|---|---|---|
| **Restaurant direct ordering** | `/solutions/independent` | "direct ordering for restaurants", "restaurant branded ordering", "own your restaurant orders" |
| **Marketplace alternatives** | `/pricing` | "DoorDash alternative", "Uber Eats alternative", "commission-free ordering", "restaurant commission comparison" |
| **POS integration** | `/integrations` | "Square restaurant ordering", "Toast direct ordering", "POS integration platform" |
| **Restaurant growth** | `/platform/n4logic` | "restaurant AI growth", "restaurant demand automation", "restaurant customer retention" |
| **Neighborhood commerce** | `/platform` | "local commerce infrastructure", "neighborhood ordering", "local business technology" |
| **Logistics orchestration** | `/platform#n4sync` | "restaurant delivery orchestration", "delivery SLA management", "order fulfillment platform" |

### I6. Technical SEO

- `sitemap.xml` generated by `app/sitemap.ts` -- include all public pages, articles, case studies.
- `robots.txt` generated by `app/robots.ts` -- allow all, exclude `/studio`, `/api`.
- Next.js Image component for all images (automatic WebP/AVIF, lazy loading, srcset).
- Preconnect to Sanity CDN and Google Fonts.
- Structured data rendered server-side via JSON-LD in `<head>`.

---

## J. Proof and Trust Requirements

### J1. Current state

N4Cluster is early-stage. There are no published case studies, customer testimonials, or partner logos. The site needs a trust strategy that is honest about this stage while still being credible.

### J2. What proof is needed

| Proof type | Ideal state | Current fallback |
|---|---|---|
| **Customer logos** | 5+ recognizable restaurant brands | "Design partners" framing -- "Working with select restaurants in [city]" |
| **Case studies** | 3+ detailed stories with metrics | Anonymized pilot data: "A single-location restaurant in [city] processed X orders in their first month" |
| **Testimonials** | 5+ attributed quotes | Founder quotes about the mission; early design partner quotes (with permission, first name + city only) |
| **Metrics** | Platform-wide numbers (orders processed, savings generated) | Per-pilot metrics presented as "early results"; projected savings via calculator |
| **Partner logos** | POS, delivery, payment partner logos | "Integration roadmap" framing with planned partner logos marked as "Coming Soon" |
| **Security** | SOC 2 badge, compliance certifications | "Security-first architecture" section describing practices, SOC 2 on roadmap |

### J3. Fallback strategies

**Anonymized case studies:**
- "A family-owned Italian restaurant in Austin" (no name, but specific enough to be credible)
- Include real metrics from pilot if available, or projected metrics clearly labeled as projections
- Frame as "Design Partner Stories" rather than "Case Studies" until there are 3+ real ones

**Design partner framing:**
- Dedicated section on homepage or about page: "We're working with a small group of design partners to refine the platform before broader launch."
- This is honest, signals exclusivity, and creates urgency ("limited spots")

**Prototype screenshots:**
- Actual screenshots of the platform (storefront, dashboard, N4Logic interface)
- Even if the product is still in development, real UI builds trust over illustrations

**Pricing transparency as proof:**
- The detailed pricing protections (exit rights, CPI caps, price locks) are themselves a trust signal
- Lead with contractual guarantees where you cannot lead with customer proof

**Founder credibility:**
- About page with founder background, LinkedIn link, clear statement of mission
- "Ask me anything" framing -- personal email or calendar link

### J4. Evolution plan

| Phase | Proof additions |
|---|---|
| **Pre-launch** | Anonymized pilot metrics, prototype screenshots, design partner framing, pricing transparency |
| **Month 1-3** | First 1-2 named case studies (design partners), initial partner logos, first real testimonials |
| **Month 3-6** | 3+ case studies, platform metrics (total orders, avg savings), partner integration logos |
| **Month 6+** | Customer logo strip, video testimonials, industry recognition, comparison benchmarks |

---

## K. Launch Readiness Checklist

### K1. Functional QA

- [ ] All pages render without errors (server and client)
- [ ] All internal links resolve (no 404s)
- [ ] Contact/demo form submits successfully and delivers email
- [ ] Newsletter form submits successfully
- [ ] Form validation works (required fields, email format, consent)
- [ ] Form error states display correctly
- [ ] Form success states display correctly
- [ ] Savings calculator computes correctly at boundary values ($20, $200, 50, 2000 orders)
- [ ] FAQ accordions expand/collapse correctly
- [ ] Mobile navigation opens and closes
- [ ] Navigation dropdowns work on hover (desktop) and click (mobile)
- [ ] Cookie consent banner appears on first visit
- [ ] Cookie consent persists across sessions
- [ ] Sanity draft mode / preview works for editors
- [ ] Sanity webhook triggers revalidation

### K2. Analytics QA

- [ ] GA4 measurement ID configured and receiving data
- [ ] PostHog project key configured and receiving data
- [ ] All 15+ custom events fire correctly (verify in GA4 DebugView and PostHog live events)
- [ ] `demo_form_start` fires on first field focus (not on every focus)
- [ ] `demo_form_submit` fires only on successful submission
- [ ] `calculator_interact` debounced (does not fire on every slider pixel)
- [ ] `page_scroll_depth` fires at correct thresholds
- [ ] GA4 conversion events marked in GA4 admin
- [ ] PostHog funnels configured

### K3. SEO QA

- [ ] Every page has unique title tag (< 60 chars)
- [ ] Every page has unique meta description (< 155 chars)
- [ ] Every page has exactly one H1
- [ ] `sitemap.xml` includes all public pages
- [ ] `robots.txt` blocks `/studio` and `/api`
- [ ] Schema markup validates (Google Rich Results Test) for: Organization, FAQPage, HowTo, Article, Product
- [ ] Canonical URLs set on all pages
- [ ] OG image renders correctly (check via og-image debugger)
- [ ] 301 redirects configured for any changed URLs
- [ ] No orphan pages (every page reachable from navigation or internal links)

### K4. Accessibility QA

- [ ] All images have meaningful alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] All form fields have associated labels
- [ ] Keyboard navigation works (Tab through all interactive elements)
- [ ] Focus states visible on all interactive elements
- [ ] ARIA labels on icon-only buttons and navigation
- [ ] Skip-to-content link present
- [ ] Screen reader testing (VoiceOver or NVDA) on homepage, pricing, form
- [ ] `prefers-reduced-motion` respected (animations disabled)

### K5. Mobile QA

- [ ] All pages tested at 375px, 414px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on any page
- [ ] Touch targets minimum 44x44px
- [ ] Mobile navigation works correctly
- [ ] Forms usable on mobile (no tiny inputs, proper keyboard types)
- [ ] Calculator sliders work on touch
- [ ] Tables scroll horizontally on mobile (comparison table)

### K6. Performance QA

- [ ] Lighthouse Performance score >= 95 on homepage
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] No render-blocking resources
- [ ] Images served as WebP/AVIF via Next.js Image
- [ ] Fonts preloaded, no FOUT
- [ ] Bundle size checked -- no unnecessary client JS

### K7. Form QA

- [ ] Demo form submission delivers email to `founder@n4cluster.com`
- [ ] Reply-To set to submitter's email
- [ ] Newsletter form submission delivers email
- [ ] Rate limiting on form endpoints (prevent spam)
- [ ] Honeypot field added for bot detection
- [ ] Form works with JavaScript disabled (graceful degradation or message)

### K8. Content QA

- [ ] All pages proofread for spelling and grammar
- [ ] Pricing numbers consistent across all pages ($0.99, $0.50 customer fee)
- [ ] Commission comparison percentages consistent (DoorDash 30%, Uber Eats 27%, Grubhub 25%)
- [ ] All external links open in new tab with `rel="noopener noreferrer"`
- [ ] Legal pages (privacy, terms, cookies) reviewed by legal counsel
- [ ] Copyright year is current

### K9. Legal QA

- [ ] Privacy policy covers data collection, cookies, analytics, form data
- [ ] Terms of service appropriate for marketing site
- [ ] Cookie notice compliant with applicable regulations
- [ ] Cookie consent gates analytics scripts (GA4, PostHog load only after consent)
- [ ] Email collection compliant with CAN-SPAM (unsubscribe mechanism)

---

## L. 90-Day Phased Plan

### Phase 1: Foundation (Days 1-30)

**Week 1-2: Infrastructure**
- [ ] Set up Sanity project (production + staging datasets)
- [ ] Configure Sanity Studio (embedded at `/studio` or standalone)
- [ ] Set up `sanity-client` with GROQ queries and type generation
- [ ] Implement draft mode / preview for Sanity
- [ ] Set up webhook for on-demand revalidation
- [ ] Install and configure PostHog SDK alongside existing GA4
- [ ] Create `lib/analytics.ts` with all event helpers
- [ ] Add PostHog to `Analytics` component

**Week 2-3: Design system and components**
- [ ] Formalize typography scale in Tailwind config
- [ ] Build/refactor all UI components (`Button`, `Card`, `Badge`, `Container`, `SectionIntro`)
- [ ] Build all section components as CMS-mappable blocks
- [ ] Build `BlockRenderer` for page-builder architecture
- [ ] Build `SavingsCalculator` client component
- [ ] Build `SchemaMarkup` component for JSON-LD

**Week 3-4: Core pages**
- [ ] Migrate homepage to CMS-driven blocks
- [ ] Migrate pricing page to CMS-driven blocks (+ add calculator)
- [ ] Migrate platform page to CMS-driven blocks
- [ ] Migrate how-it-works page to CMS-driven blocks
- [ ] Create `/request-demo` page (replaces `/contact` as primary CTA target)
- [ ] 301 redirect `/contact` to `/request-demo`

**Deliverable:** Core 5 pages live with CMS, analytics wired, calculator functional.

### Phase 2: Build (Days 31-60)

**Week 5-6: Solution and content pages**
- [ ] Build `/solutions/independent` page
- [ ] Build `/solutions/multi-location` page
- [ ] Migrate `/integrations` to CMS with filterable grid
- [ ] Migrate `/faq` to CMS with category tabs
- [ ] Build `/trust-security` page
- [ ] Migrate `/about` page to CMS

**Week 6-7: Content infrastructure**
- [ ] Build `/resources` hub page with category filter
- [ ] Build `/resources/[slug]` article template with Portable Text
- [ ] Build `/case-studies/[slug]` case study template
- [ ] Migrate existing 6 articles from `content/pages/resources.ts` to Sanity
- [ ] Create 3 new articles targeting content clusters
- [ ] Create 1-2 anonymized case studies (design partner stories)

**Week 7-8: Analytics and integration**
- [ ] Wire all 15+ analytics events to components
- [ ] Test all events in GA4 DebugView and PostHog live events
- [ ] Configure GA4 conversion goals
- [ ] Build PostHog funnels and dashboards
- [ ] Add schema markup to all page types
- [ ] Verify `sitemap.xml` includes all dynamic routes

**Deliverable:** All pages built, content migrated to CMS, analytics fully wired, first content pieces published.

### Phase 3: Launch (Days 61-90)

**Week 9-10: QA and optimization**
- [ ] Complete full launch readiness checklist (Section K)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (axe-core, manual keyboard/screen reader testing)
- [ ] Performance optimization (Lighthouse 95+ target)
- [ ] Content proofread and final copy review
- [ ] Legal review of privacy, terms, cookies

**Week 10-11: Content and proof**
- [ ] Publish 2-3 more articles for content clusters
- [ ] Publish first case study (or design partner story)
- [ ] Add integration logos with status badges
- [ ] Finalize "About" page with team info
- [ ] Populate FAQ from Sanity (category-organized)

**Week 11-12: Go-live**
- [ ] Final staging review with stakeholders
- [ ] DNS/domain verification
- [ ] GA4 measurement ID activated in production
- [ ] PostHog production environment activated
- [ ] Cookie consent verified to gate analytics correctly
- [ ] Monitor error rates for first 72 hours
- [ ] Submit updated sitemap to Google Search Console
- [ ] Share launch on social channels

**Deliverable:** Production site live with full CMS, analytics, SEO, and initial content.

---

## M. Recommended Repo Structure

```
c:\Users\tilak\N4ClusterDotcom\
|
+-- app/                            # Next.js App Router
|   +-- (marketing)/                # Route group for marketing pages
|   |   +-- page.tsx                # Homepage
|   |   +-- pricing/page.tsx
|   |   +-- platform/page.tsx
|   |   +-- platform/n4logic/page.tsx
|   |   +-- how-it-works/page.tsx
|   |   +-- integrations/page.tsx
|   |   +-- solutions/
|   |   |   +-- independent/page.tsx
|   |   |   +-- multi-location/page.tsx
|   |   +-- request-demo/page.tsx
|   |   +-- resources/
|   |   |   +-- page.tsx            # Hub listing
|   |   |   +-- [slug]/page.tsx     # Article template
|   |   +-- case-studies/
|   |   |   +-- page.tsx            # Listing
|   |   |   +-- [slug]/page.tsx     # Case study template
|   |   +-- about/page.tsx
|   |   +-- trust-security/page.tsx
|   |   +-- faq/page.tsx
|   |   +-- partners/page.tsx
|   |   +-- careers/page.tsx
|   |   +-- privacy/page.tsx
|   |   +-- terms/page.tsx
|   |   +-- cookies/page.tsx
|   +-- studio/                     # Sanity Studio (embedded)
|   |   +-- [[...index]]/page.tsx
|   +-- api/
|   |   +-- contact/route.ts        # Demo form email
|   |   +-- newsletter/route.ts     # Newsletter signup
|   |   +-- draft/route.ts          # Sanity preview mode
|   |   +-- revalidate/route.ts     # Sanity webhook handler
|   +-- layout.tsx
|   +-- globals.css
|   +-- not-found.tsx
|   +-- sitemap.ts
|   +-- robots.ts
|   +-- opengraph-image.tsx
|
+-- components/
|   +-- layout/
|   |   +-- SiteHeader.tsx
|   |   +-- SiteFooter.tsx
|   |   +-- MobileNav.tsx
|   +-- sections/                   # CMS-mappable section components
|   |   +-- HeroSplit.tsx
|   |   +-- HeroCentered.tsx
|   |   +-- TrustStrip.tsx
|   |   +-- LogoStrip.tsx
|   |   +-- FeatureGrid.tsx
|   |   +-- ImageTextBlock.tsx
|   |   +-- StepTimeline.tsx
|   |   +-- ComparisonCards.tsx
|   |   +-- ComparisonTable.tsx
|   |   +-- PricingTiers.tsx
|   |   +-- FAQAccordion.tsx
|   |   +-- CTASection.tsx
|   |   +-- AudienceSegments.tsx
|   |   +-- ResourceGrid.tsx
|   |   +-- TestimonialBlock.tsx
|   |   +-- MetricStrip.tsx
|   |   +-- SavingsCalculator.tsx
|   |   +-- RichTextBlock.tsx
|   +-- forms/
|   |   +-- ContactForm.tsx
|   |   +-- NewsletterForm.tsx
|   +-- ui/
|   |   +-- Button.tsx
|   |   +-- Card.tsx
|   |   +-- Badge.tsx
|   |   +-- Container.tsx
|   |   +-- SectionContainer.tsx
|   |   +-- SectionIntro.tsx
|   |   +-- Divider.tsx
|   +-- shared/
|       +-- Analytics.tsx
|       +-- CookieConsent.tsx
|       +-- SchemaMarkup.tsx
|       +-- PortableText.tsx
|       +-- BlockRenderer.tsx
|
+-- lib/
|   +-- utils.ts                    # cn() helper
|   +-- analytics.ts                # trackEvent + convenience helpers
|   +-- sanity/
|   |   +-- client.ts               # Sanity client config
|   |   +-- queries.ts              # GROQ queries
|   |   +-- types.ts                # Generated Sanity types
|   |   +-- image.ts                # Sanity image URL builder
|   |   +-- block-renderer.tsx      # Block type -> component mapper
|   +-- metadata.ts                 # generateMetadata helper
|
+-- sanity/
|   +-- sanity.config.ts            # Sanity Studio config
|   +-- sanity.cli.ts
|   +-- schemas/
|   |   +-- index.ts                # Schema registry
|   |   +-- documents/
|   |   |   +-- page.ts
|   |   |   +-- article.ts
|   |   |   +-- caseStudy.ts
|   |   |   +-- faq.ts
|   |   |   +-- testimonial.ts
|   |   |   +-- integration.ts
|   |   |   +-- author.ts
|   |   |   +-- navigation.ts
|   |   |   +-- siteSettings.ts
|   |   +-- blocks/
|   |   |   +-- heroSplit.ts
|   |   |   +-- heroCentered.ts
|   |   |   +-- trustStrip.ts
|   |   |   +-- logoStrip.ts
|   |   |   +-- featureGrid.ts
|   |   |   +-- imageText.ts
|   |   |   +-- stepTimeline.ts
|   |   |   +-- comparisonCards.ts
|   |   |   +-- comparisonTable.ts
|   |   |   +-- pricingTiers.ts
|   |   |   +-- faqAccordion.ts
|   |   |   +-- ctaSection.ts
|   |   |   +-- audienceSegments.ts
|   |   |   +-- resourceGrid.ts
|   |   |   +-- testimonialBlock.ts
|   |   |   +-- metricStrip.ts
|   |   |   +-- savingsCalculator.ts
|   |   |   +-- richText.ts
|   |   +-- objects/
|   |       +-- seoObject.ts
|   |       +-- ctaObject.ts
|
+-- content/                        # Legacy static content (migrate to Sanity)
|   +-- pages/
|   +-- site/
|
+-- public/
|   +-- images/
|   +-- fonts/
|   +-- logo.png
|   +-- og-image.png
|
+-- next.config.ts
+-- package.json
+-- tsconfig.json
+-- postcss.config.js
```

---

## N. Code Scaffolding

### N1. TypeScript interfaces for CMS blocks

```typescript
// lib/sanity/types.ts

// ── Base types ──────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface CtaObject {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  trackingEvent?: string;
}

export interface SeoObject {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
  canonicalUrl?: string;
}

// ── Block types ─────────────────────────────────────────────────────────────

export interface SanityBlockBase {
  _key: string;
  _type: string;
}

export interface HeroSplitBlock extends SanityBlockBase {
  _type: "block.heroSplit";
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryCta?: CtaObject;
  secondaryCta?: CtaObject;
  microcopy?: string;
  image?: SanityImage;
  backgroundVariant?: "dark" | "light" | "white";
}

export interface HeroCenteredBlock extends SanityBlockBase {
  _type: "block.heroCentered";
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryCta?: CtaObject;
  secondaryCta?: CtaObject;
  backgroundVariant?: "dark" | "light" | "white";
}

export interface TrustStripBlock extends SanityBlockBase {
  _type: "block.trustStrip";
  items: string[];
}

export interface LogoStripBlock extends SanityBlockBase {
  _type: "block.logoStrip";
  label?: string;
  logos: Array<{
    name: string;
    logo: SanityImage;
    url?: string;
  }>;
}

export interface FeatureGridBlock extends SanityBlockBase {
  _type: "block.featureGrid";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features: Array<{
    icon: string;
    color: "cobalt" | "teal" | "amber";
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
  backgroundVariant?: "white" | "light" | "dark";
}

export interface ImageTextBlock extends SanityBlockBase {
  _type: "block.imageText";
  eyebrow?: string;
  heading: string;
  body: any[]; // Portable Text
  image?: SanityImage;
  imagePosition?: "left" | "right";
  cta?: CtaObject;
  backgroundVariant?: "white" | "light" | "dark";
}

export interface StepTimelineBlock extends SanityBlockBase {
  _type: "block.stepTimeline";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  steps: Array<{
    tag: string;
    title: string;
    description: string;
    color: "cobalt" | "teal" | "amber";
  }>;
  cta?: CtaObject;
}

export interface ComparisonCardsBlock extends SanityBlockBase {
  _type: "block.comparisonCards";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  competitorCard: {
    label: string;
    heading: string;
    items: string[];
  };
  n4clusterCard: {
    label: string;
    heading: string;
    items: string[];
  };
}

export interface ComparisonTableBlock extends SanityBlockBase {
  _type: "block.comparisonTable";
  heading?: string;
  columns: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
  highlightColumn?: number;
}

export interface PricingTiersBlock extends SanityBlockBase {
  _type: "block.pricingTiers";
  heading?: string;
  subheading?: string;
  features: Array<{
    title: string;
    description: string;
    included: boolean;
  }>;
}

export interface FaqAccordionBlock extends SanityBlockBase {
  _type: "block.faqAccordion";
  heading?: string;
  items?: Array<{ _ref: string }>; // references to faq documents
  inlineItems?: Array<{
    question: string;
    answer: string;
  }>;
  cta?: CtaObject;
}

export interface CtaSectionBlock extends SanityBlockBase {
  _type: "block.ctaSection";
  heading: string;
  subheading?: string;
  primaryCta?: CtaObject;
  secondaryCta?: CtaObject;
  backgroundVariant?: "dark" | "cobalt";
}

export interface AudienceSegmentsBlock extends SanityBlockBase {
  _type: "block.audienceSegments";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  segments: Array<{
    title: string;
    description: string;
    outcomes: string[];
    href: string;
    color: "cobalt" | "teal" | "amber";
  }>;
}

export interface ResourceGridBlock extends SanityBlockBase {
  _type: "block.resourceGrid";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  source: "latest" | "manual";
  articles?: Array<{ _ref: string }>;
  limit?: number;
  cta?: CtaObject;
}

export interface TestimonialBlockType extends SanityBlockBase {
  _type: "block.testimonialBlock";
  testimonials: Array<{ _ref: string }>;
  layout?: "single" | "grid" | "carousel";
  backgroundVariant?: "white" | "light" | "dark";
}

export interface MetricStripBlock extends SanityBlockBase {
  _type: "block.metricStrip";
  metrics: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  backgroundVariant?: "white" | "light" | "dark";
}

export interface SavingsCalculatorBlock extends SanityBlockBase {
  _type: "block.savingsCalculator";
  heading?: string;
  subheading?: string;
  defaultOrderValue?: number;
  defaultMonthlyOrders?: number;
  marketplaceRate?: number;
  n4clusterFee?: number;
  cta?: CtaObject;
}

export interface RichTextBlock extends SanityBlockBase {
  _type: "block.richText";
  content: any[]; // Portable Text
  maxWidth?: "sm" | "md" | "lg";
}

// ── Union type for page blocks ──────────────────────────────────────────────

export type PageBlock =
  | HeroSplitBlock
  | HeroCenteredBlock
  | TrustStripBlock
  | LogoStripBlock
  | FeatureGridBlock
  | ImageTextBlock
  | StepTimelineBlock
  | ComparisonCardsBlock
  | ComparisonTableBlock
  | PricingTiersBlock
  | FaqAccordionBlock
  | CtaSectionBlock
  | AudienceSegmentsBlock
  | ResourceGridBlock
  | TestimonialBlockType
  | MetricStripBlock
  | SavingsCalculatorBlock
  | RichTextBlock;

// ── Document types ──────────────────────────────────────────────────────────

export interface PageDocument {
  _id: string;
  _type: "page";
  title: string;
  slug: SanitySlug;
  seo?: SeoObject;
  blocks: PageBlock[];
  publishedAt?: string;
}

export interface ArticleDocument {
  _id: string;
  _type: "article";
  title: string;
  slug: SanitySlug;
  category: "Insights" | "Guides" | "News";
  excerpt: string;
  featuredImage?: SanityImage;
  author?: {
    name: string;
    photo?: SanityImage;
    role?: string;
  };
  body: any[]; // Portable Text
  readTime?: string;
  seo?: SeoObject;
  publishedAt: string;
  contentCluster?: string;
}

export interface CaseStudyDocument {
  _id: string;
  _type: "caseStudy";
  title: string;
  slug: SanitySlug;
  businessName?: string;
  businessType?: string;
  location?: string;
  featuredImage?: SanityImage;
  metrics: Array<{
    label: string;
    value: string;
    context?: string;
  }>;
  challenge: any[];
  solution: any[];
  results: any[];
  quote?: string;
  quoteAttribution?: string;
  takeaways: string[];
  seo?: SeoObject;
  publishedAt?: string;
}

export interface FaqDocument {
  _id: string;
  _type: "faq";
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface TestimonialDocument {
  _id: string;
  _type: "testimonial";
  quote: string;
  name: string;
  role?: string;
  company?: string;
  photo?: SanityImage;
  featured: boolean;
}

export interface IntegrationDocument {
  _id: string;
  _type: "integration";
  name: string;
  slug: SanitySlug;
  logo: SanityImage;
  category: "POS" | "Delivery" | "Payments" | "Accounting";
  description?: string;
  status: "Live" | "Beta" | "Coming Soon";
  url?: string;
}
```

### N2. Sanity client and queries

```typescript
// lib/sanity/client.ts
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-01",
  useCdn: process.env.NODE_ENV === "production",
});

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

export function getClient(preview = false) {
  return preview ? previewClient : sanityClient;
}
```

```typescript
// lib/sanity/queries.ts

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo,
    blocks[] {
      _key,
      _type,
      ...,
      // Dereference FAQ references
      _type == "block.faqAccordion" => {
        ...,
        items[]-> { _id, question, answer, category }
      },
      // Dereference testimonial references
      _type == "block.testimonialBlock" => {
        ...,
        testimonials[]-> { _id, quote, name, role, company, photo }
      },
      // Dereference article references
      _type == "block.resourceGrid" => {
        ...,
        articles[]-> { _id, title, slug, category, excerpt, readTime, publishedAt }
      }
    },
    publishedAt
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    featuredImage,
    author-> { name, photo, role },
    body,
    readTime,
    seo,
    publishedAt,
    contentCluster
  }
`;

export const articlesListQuery = `
  *[_type == "article"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    category,
    excerpt,
    readTime,
    publishedAt
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    businessName,
    businessType,
    location,
    featuredImage,
    metrics,
    challenge,
    solution,
    results,
    quote,
    quoteAttribution,
    takeaways,
    seo,
    publishedAt
  }
`;

export const faqsByCategoryQuery = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const integrationsQuery = `
  *[_type == "integration"] | order(name asc) {
    _id,
    name,
    slug,
    logo,
    category,
    description,
    status
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    description,
    url,
    ogImage,
    social,
    contact,
    analytics
  }
`;

export const navigationQuery = `
  *[_type == "navigation"][0] {
    mainNav,
    footerColumns
  }
`;
```

### N3. Metadata generation helper

```typescript
// lib/metadata.ts
import type { Metadata } from "next";
import type { SeoObject } from "@/lib/sanity/types";

const SITE_NAME = "N4Cluster";
const SITE_URL = "https://n4cluster.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface MetadataInput {
  title: string;
  description?: string;
  seo?: SeoObject;
  path: string;
  type?: "website" | "article";
  publishedAt?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  seo,
  path,
  type = "website",
  publishedAt,
  noIndex = false,
}: MetadataInput): Metadata {
  const metaTitle = seo?.metaTitle ?? title;
  const metaDescription = seo?.metaDescription ?? description ?? "";
  const url = `${SITE_URL}${path}`;
  const ogImage = seo?.ogImage
    ? `${SITE_URL}/api/sanity-image?ref=${seo.ogImage.asset._ref}` // or use Sanity image URL builder
    : DEFAULT_OG_IMAGE;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: seo?.canonicalUrl ?? url,
    },
    openGraph: {
      type,
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(publishedAt && type === "article" ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index: !(seo?.noIndex ?? noIndex),
      follow: true,
    },
  };
}
```

### N4. Analytics helper (full implementation)

```typescript
// lib/analytics.ts

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (id: string, properties?: Record<string, any>) => void;
    };
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;

  // Clean undefined values
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) cleanParams[key] = value;
    }
  }

  // GA4
  if (window.gtag) {
    window.gtag("event", name, cleanParams);
  }

  // PostHog
  if (window.posthog) {
    window.posthog.capture(name, cleanParams);
  }

  // Debug logging in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, cleanParams);
  }
}

export const analytics = {
  // ── Conversion events ─────────────────────────────────────────────────
  demoFormStart(formVariant: string): void {
    trackEvent("demo_form_start", {
      form_variant: formVariant,
      page_path: window.location.pathname,
    });
  },

  demoFormSubmit(data: {
    formVariant: string;
    businessType?: string;
    locations?: string;
    interest?: string;
  }): void {
    trackEvent("demo_form_submit", {
      form_variant: data.formVariant,
      business_type: data.businessType,
      locations: data.locations,
      interest: data.interest,
      page_path: window.location.pathname,
    });
  },

  demoFormError(errorType: string): void {
    trackEvent("demo_form_error", {
      error_type: errorType,
      page_path: window.location.pathname,
    });
  },

  // ── Engagement events ─────────────────────────────────────────────────
  heroCtaClick(label: string, href: string, variant?: string): void {
    trackEvent("hero_cta_click", {
      cta_label: label,
      cta_href: href,
      page_path: window.location.pathname,
      variant: variant ?? "default",
    });
  },

  pricingCtaClick(label: string, section: string): void {
    trackEvent("pricing_cta_click", {
      cta_label: label,
      section,
    });
  },

  calculatorInteract(orderValue: number, monthlyOrders: number, annualSavings: number): void {
    trackEvent("calculator_interact", {
      order_value: orderValue,
      monthly_orders: monthlyOrders,
      annual_savings: annualSavings,
    });
  },

  calculatorCtaClick(annualSavings: number): void {
    trackEvent("calculator_cta_click", {
      annual_savings: annualSavings,
      page_path: window.location.pathname,
    });
  },

  navClick(label: string, href: string, isDropdown: boolean): void {
    trackEvent("nav_click", {
      nav_label: label,
      nav_href: href,
      is_dropdown: isDropdown,
    });
  },

  footerCtaClick(label: string, href: string, column: string): void {
    trackEvent("footer_cta_click", {
      link_label: label,
      link_href: href,
      column,
    });
  },

  resourceSignup(formLocation: string): void {
    trackEvent("resource_signup", {
      page_path: window.location.pathname,
      form_location: formLocation,
    });
  },

  resourceView(slug: string, category: string, contentCluster?: string): void {
    trackEvent("resource_view", {
      slug,
      category,
      content_cluster: contentCluster,
    });
  },

  faqExpand(question: string, category: string): void {
    trackEvent("faq_expand", {
      question,
      category,
    });
  },

  integrationFilter(category: string): void {
    trackEvent("integration_filter", { category });
  },

  comparisonView(): void {
    trackEvent("comparison_view", {
      page_path: window.location.pathname,
    });
  },

  ctaSectionClick(label: string, href: string, sectionHeading: string): void {
    trackEvent("cta_section_click", {
      cta_label: label,
      cta_href: href,
      section_heading: sectionHeading,
    });
  },

  scrollDepth(depth: 25 | 50 | 75 | 100): void {
    trackEvent("page_scroll_depth", {
      depth,
      page_path: window.location.pathname,
    });
  },

  cookieConsent(consentGiven: boolean): void {
    trackEvent("cookie_consent", {
      consent_given: consentGiven,
    });
  },
};
```

### N5. Form handling with analytics

```typescript
// Example: updated ContactForm handleSubmit with analytics
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});
  setStatus("submitting");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("server error");
    setStatus("success");
    analytics.demoFormSubmit({
      formVariant: variant,
      businessType: formData.businessType,
      locations: formData.locations,
      interest: formData.interest,
    });
  } catch {
    setStatus("error");
    analytics.demoFormError("submission_failed");
  }
};

// Track form start on first field focus
const handleFirstFocus = useCallback(() => {
  if (!hasTrackedStart.current) {
    analytics.demoFormStart(variant);
    hasTrackedStart.current = true;
  }
}, [variant]);
```

### N6. Revalidation webhook handler

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type, slug } = body;

    // Revalidate based on document type
    switch (_type) {
      case "page":
        if (slug?.current) {
          revalidatePath(`/${slug.current}`);
        }
        revalidatePath("/"); // Homepage may reference pages
        break;
      case "article":
        revalidatePath("/resources");
        if (slug?.current) {
          revalidatePath(`/resources/${slug.current}`);
        }
        revalidatePath("/"); // Homepage resource teaser
        break;
      case "caseStudy":
        revalidatePath("/case-studies");
        if (slug?.current) {
          revalidatePath(`/case-studies/${slug.current}`);
        }
        break;
      case "faq":
        revalidatePath("/faq");
        break;
      case "testimonial":
        revalidateTag("testimonials");
        break;
      case "integration":
        revalidatePath("/integrations");
        break;
      case "navigation":
      case "siteSettings":
        // These affect all pages -- revalidate everything
        revalidatePath("/", "layout");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
```

### N7. Environment variables

```bash
# .env.local

# ── Sanity ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_...                    # For preview/draft mode
SANITY_REVALIDATION_SECRET=your_webhook_secret  # Shared with Sanity webhook

# ── Gmail (existing) ────────────────────────────────────────────────────────
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
GMAIL_USER=...

# ── Analytics ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# ── Site ─────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://n4cluster.com
```

### N8. Scroll depth tracker component

```typescript
// components/shared/ScrollDepthTracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          analytics.scrollDepth(threshold);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
```

### N9. Schema markup component

```typescript
// components/shared/SchemaMarkup.tsx

interface SchemaMarkupProps {
  schema: Record<string, any> | Record<string, any>[];
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

// ── Schema builders ─────────────────────────────────────────────────────────

export function buildFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema(steps: Array<{ title: string; description: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to set up N4Cluster for your restaurant",
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedAt,
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : { "@type": "Organization", name: "N4Cluster" },
    publisher: {
      "@type": "Organization",
      name: "N4Cluster",
      url: "https://n4cluster.com",
    },
  };
}

export function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "N4Cluster Commerce Platform",
    description: "Commission-free commerce infrastructure for local restaurants.",
    brand: { "@type": "Brand", name: "N4Cluster" },
    offers: {
      "@type": "Offer",
      price: "0.99",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0.99",
        priceCurrency: "USD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitText: "order",
        },
      },
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

---

## O. Prioritized Backlog

### P0 -- Must ship (launch blockers)

| Item | Owner | Est |
|---|---|---|
| Sanity project setup + client configuration | Eng | 1d |
| Sanity schemas: page, seoObject, ctaObject, all blocks | Eng | 3d |
| Sanity schemas: article, caseStudy, faq, testimonial, integration, author | Eng | 2d |
| Sanity schemas: navigation, siteSettings | Eng | 1d |
| BlockRenderer implementation | Eng | 1d |
| Migrate homepage to CMS blocks | Eng | 2d |
| Migrate pricing page to CMS blocks | Eng | 1d |
| Migrate platform page to CMS blocks | Eng | 1d |
| Migrate how-it-works page to CMS blocks | Eng | 1d |
| Build `/request-demo` page | Eng | 1d |
| Build `/solutions/independent` page | Eng + Content | 2d |
| Build `/solutions/multi-location` page | Eng + Content | 2d |
| Migrate FAQ to Sanity | Eng + Content | 1d |
| `SavingsCalculator` component | Eng | 2d |
| GA4 measurement ID configuration | Eng | 0.5d |
| PostHog installation and configuration | Eng | 0.5d |
| `lib/analytics.ts` with all event helpers | Eng | 1d |
| Wire analytics events to all CTAs and forms | Eng | 2d |
| SEO: meta tags on all pages | Eng | 1d |
| SEO: schema markup (Organization, FAQPage, BreadcrumbList) | Eng | 1d |
| SEO: sitemap.ts and robots.ts update | Eng | 0.5d |
| 301 redirect: `/contact` -> `/request-demo` | Eng | 0.5d |
| Sanity webhook revalidation endpoint | Eng | 0.5d |
| Sanity draft/preview mode | Eng | 1d |
| Mobile navigation QA | Eng | 0.5d |
| Accessibility: keyboard nav, focus states, alt text | Eng | 1d |
| Performance: Lighthouse 95+ | Eng | 1d |

**Total P0 estimate:** ~28 engineering days

### P1 -- Should ship (high value, not blocking launch)

| Item | Owner | Est |
|---|---|---|
| Build `/trust-security` page | Eng + Content | 2d |
| Build `/resources` hub with category filter | Eng | 2d |
| Build `/resources/[slug]` article template with Portable Text | Eng | 2d |
| Build `/case-studies/[slug]` case study template | Eng | 2d |
| Migrate existing 6 articles to Sanity | Content | 1d |
| Write 3 new articles for content clusters | Content | 5d |
| Create 1-2 anonymized design partner stories | Content | 3d |
| Migrate integrations page to CMS with filterable grid | Eng | 2d |
| Migrate about page to CMS | Eng + Content | 1d |
| `LogoStrip` component with integration logos | Eng | 1d |
| `TestimonialBlock` component | Eng | 1d |
| `MetricStrip` component | Eng | 0.5d |
| `ComparisonTable` component | Eng | 1d |
| `ScrollDepthTracker` component | Eng | 0.5d |
| PostHog session replay configuration | Eng | 0.5d |
| PostHog funnels and dashboards setup | Eng | 1d |
| GA4 conversion goals and custom reports | Eng | 1d |
| SEO: HowTo, Article, Product schema markup | Eng | 1d |
| Cookie consent gates analytics loading | Eng | 1d |
| Rate limiting on form API routes | Eng | 0.5d |
| Honeypot spam protection on forms | Eng | 0.5d |

**Total P1 estimate:** ~29 days (eng + content mixed)

### P2 -- Post-launch (iterate and improve)

| Item | Owner | Est |
|---|---|---|
| Sanity Studio standalone at `studio.n4cluster.com` | Eng | 1d |
| Newsletter integration (Mailchimp/Resend/Loops) replacing Gmail relay | Eng | 2d |
| A/B testing framework for CTAs (via PostHog feature flags) | Eng | 2d |
| Video testimonial component and hosting | Eng + Content | 2d |
| Interactive platform architecture diagram | Eng + Design | 3d |
| `/platform/n4sync` and `/platform/n4logic` dedicated pages | Eng + Content | 3d |
| Blog/resource RSS feed | Eng | 0.5d |
| Search functionality for resources | Eng | 2d |
| Multi-language support (i18n foundation) | Eng | 5d |
| Dark mode support | Eng | 2d |
| Chatbot / AI assistant for visitor questions | Eng | 5d |
| Automated OG image generation per page | Eng | 1d |
| Content calendar and editorial workflow in Sanity | Content | 2d |
| Quarterly SEO audit and keyword gap analysis | Marketing | Ongoing |
| Monthly content publishing cadence (2-4 articles/month) | Content | Ongoing |
| Conversion rate optimization based on PostHog data | Marketing + Eng | Ongoing |

---

*End of specification. This document is the single source of truth for the N4Cluster marketing website rebuild. All implementation decisions should reference this spec. Deviations should be documented and agreed upon before implementation begins.*
