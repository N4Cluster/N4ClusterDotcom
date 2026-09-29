# N4Cluster Website

Production-ready marketing website for N4Cluster — the merchant-first infrastructure platform for local commerce.

## Tech Stack

- **Next.js 16** — App Router, static generation
- **TypeScript** — full type coverage
- **Tailwind CSS v4** — CSS-based design tokens, utility-first styling
- **Lucide React** — icon system

## Project Structure

```
n4cluster/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout, metadata, schema
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Tailwind v4 + design tokens
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots.txt
│   ├── opengraph-image.tsx  # OG image (edge runtime)
│   ├── not-found.tsx        # 404 page
│   ├── platform/            # Platform page
│   ├── solutions/           # Solutions page
│   ├── how-it-works/        # How It Works page
│   ├── integrations/        # Integrations page
│   ├── n4logic/             # N4Logic page
│   ├── pricing/             # Pricing page
│   ├── resources/           # Resources listing (client)
│   ├── case-studies/        # Case Studies page
│   ├── about/               # About page
│   ├── mission/             # Mission and values page
│   ├── partners/            # Partners page
│   ├── contact/             # Contact / Demo request page
│   ├── faq/                 # FAQ page (FAQ schema)
│   ├── careers/             # Careers page
│   ├── privacy/             # Privacy Policy
│   ├── terms/               # Terms of Service
│   └── cookies/             # Cookie Notice
│
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx   # Sticky nav with dropdowns + mobile
│   │   └── SiteFooter.tsx   # Multi-column footer
│   ├── ui/                  # UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   ├── Divider.tsx
│   │   ├── SectionContainer.tsx
│   │   └── SectionIntro.tsx
│   ├── sections/            # Marketing section components
│   │   ├── HeroSplit.tsx
│   │   ├── HeroCentered.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── CTASection.tsx
│   │   ├── StepTimeline.tsx
│   │   ├── ComparisonCards.tsx
│   │   ├── AudienceSegments.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ImageTextBlock.tsx
│   │   ├── PricingTiers.tsx
│   │   ├── FAQAccordion.tsx
│   │   └── ResourceCard.tsx
│   └── forms/
│       ├── ContactForm.tsx  # Full demo/contact form with validation
│       └── NewsletterForm.tsx
│
├── content/
│   ├── site/
│   │   ├── navigation.ts    # Nav items and dropdowns
│   │   ├── footer.ts        # Footer link groups
│   │   ├── settings.ts      # Site config (URL, name, etc.)
│   │   └── theme.ts         # Routes whose hero is dark (header contrast)
│   └── pages/
│       ├── faq.ts           # FAQ data
│       ├── mission.ts       # Mission and values copy
│       └── resources.ts     # Resource listing data
│
├── lib/
│   ├── consent.ts           # Cookie-consent store (gates analytics)
│   ├── mail.ts              # Gmail send + RFC 2822 builder
│   ├── rate-limit.ts        # Per-instance fixed-window limiter
│   ├── utils.ts             # cn() utility
│   ├── utm.ts               # UTM capture and persistence
│   └── validation.ts        # Server-side form validation
│
└── tests/                   # Vitest unit tests
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — full conversion-focused landing |
| `/platform` | Platform overview with N4Sync and N4Logic |
| `/solutions` | Solutions by business type |
| `/how-it-works` | Step-by-step process walkthrough |
| `/integrations` | Integration categories and architecture |
| `/n4logic` | N4Logic AI intelligence layer |
| `/pricing` | Engagement tiers |
| `/resources` | Resource library with category filtering |
| `/roi-calculator` | Commission-savings calculator |
| `/case-studies` | Pilot scenarios |
| `/about` | Mission, principles, brand architecture |
| `/mission` | Mission and values, with what each value rules out |
| `/partners` | Partner program |
| `/contact` | Demo request and contact form |
| `/faq` | FAQ with FAQ schema markup |
| `/careers` | Careers and open roles |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookies` | Cookie Notice |

## Design System

The design system is defined in `app/globals.css` using Tailwind v4's `@theme` block:

- **Palette**: Navy, Cobalt, Teal, Amber, Slate
- **Typography**: Inter (Google Fonts via Next.js)
- **Custom utilities**: `.gradient-hero`, `.gradient-dark`, `.text-gradient`, `.card-hover`, `.animate-fade-up`

## Scripts

```bash
npm run dev         # local dev server
npm run build       # production build
npm run lint        # ESLint (flat config; Next 16 removed `next lint`)
npm run typecheck   # tsc --noEmit
npm test            # vitest
```

CI runs typecheck, lint, test, and build on every pull request — see
`.github/workflows/ci.yml`.

## Form Submission

`ContactForm` POSTs to `app/api/contact/route.ts` and `NewsletterForm` to
`app/api/newsletter/route.ts`. Both routes rate-limit by IP, check the honeypot,
validate input in `lib/validation.ts`, and send a notification through the Gmail
API via `lib/mail.ts`. Optionally they also POST the lead to ICP Finder when
`ICP_FINDER_API_URL` is set.

Input that reaches an email header is validated server-side — the browser-side
checks are advisory, since both routes are public endpoints. `lib/mail.ts` refuses
to build a message whose address headers contain a CR or LF, so a submitted value
cannot inject extra headers such as `Bcc`.

`ContactForm`'s `variant` prop (`contact` | `demo` | `partner`) sets the submit
label and is sent as `formVariant`, so the notification email and the ICP `source`
identify which page the enquiry came from.

## SEO Setup

- Per-page `metadata` exports with title and description
- `sitemap.ts` — auto-generated XML sitemap
- `robots.ts` — robots.txt
- `opengraph-image.tsx` — dynamic OG image via Edge Runtime
- Organization schema in root layout
- FAQ schema on `/faq`

## Extending the Site

### Adding resources

Add new entries to `content/pages/resources.ts`. For MDX-based articles, install `@next/mdx` and create files in `content/resources/`.

### Adding pages

Create a new directory under `app/` with a `page.tsx` file. Use the existing section
components for rapid assembly, then:

1. Add the route to `staticRoutes` in `app/sitemap.ts`.
2. Add it to `content/site/navigation.ts` and/or `content/site/footer.ts`.
3. **If the page opens with a dark hero** (`HeroSplit`, `HeroCentered`, or a
   `gradient-hero` section), add its path to `content/site/theme.ts`. The fixed
   header renders transparent with white text over a dark hero and solid otherwise;
   an unregistered route gets the solid treatment, which is always readable.

`tests/site-structure.test.ts` checks that nav and footer links point at routes the
sitemap knows about, so a missed step fails CI rather than shipping a dead link.

### Analytics and consent

Google Analytics 4 is wired up in `components/Analytics.tsx` and loads **only after
the visitor accepts** in the consent banner. Set
`NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable it.

Consent state lives in `lib/consent.ts` (localStorage plus an event, read through
`useSyncExternalStore`). `components/CookieConsent.tsx` collects the choice and the
footer's "Cookie preferences" control clears it so a visitor can change their mind.
Declining after accepting also sets GA's `ga-disable-<ID>` flag, since a script that
has already executed cannot be unloaded.

If you add another third-party script, gate it on consent the same way and update
`/cookies` and section 10 of `/privacy` — those pages describe this behaviour.
