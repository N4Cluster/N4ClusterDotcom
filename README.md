# N4Cluster Website

Production-ready marketing website for N4Cluster — the merchant-first infrastructure platform for local commerce.

## Tech Stack

- **Next.js 15** — App Router, static generation
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
│   │   └── settings.ts      # Site config (URL, name, etc.)
│   └── pages/
│       ├── faq.ts           # FAQ data
│       └── resources.ts     # Resource listing data
│
└── lib/
    └── utils.ts             # cn() utility
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
| `/case-studies` | Pilot scenarios |
| `/about` | Mission, principles, brand architecture |
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

## Form Submission

The `ContactForm` and `NewsletterForm` components use a simulated submission layer. To connect to a real endpoint:

1. Replace the `await new Promise(...)` in `ContactForm.tsx` with a `fetch()` call to your API
2. Target options: HubSpot Forms API, Salesforce Web-to-Lead, custom webhook, or Next.js Server Action

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

Create a new directory under `app/` with a `page.tsx` file. Use the existing section components for rapid assembly.

### Connecting analytics

Add your analytics script in `app/layout.tsx` or use Next.js's built-in analytics support.
