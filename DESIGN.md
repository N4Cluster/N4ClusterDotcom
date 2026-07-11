---
name: N4Cluster
description: Commission-free ordering and delivery infrastructure for independent restaurants
colors:
  trust-cobalt: "#2563eb"
  trust-cobalt-deep: "#1a4fd6"
  trust-cobalt-light: "#3b82f6"
  trust-cobalt-pale: "#93c5fd"
  signal-teal: "#14b8a6"
  signal-teal-deep: "#0d9488"
  signal-teal-light: "#2dd4bf"
  caution-amber: "#f59e0b"
  caution-amber-light: "#fbbf24"
  ink-navy: "#040d1c"
  navy-deep: "#0a1628"
  navy-mid: "#0f2040"
  navy-steel: "#162d58"
  navy-line: "#1e3a70"
  neutral-ink: "#020617"
  neutral-text: "#0f172a"
  neutral-800: "#1e293b"
  neutral-700: "#334155"
  neutral-muted: "#475569"
  neutral-500: "#64748b"
  neutral-300: "#cbd5e1"
  neutral-border: "#e2e8f0"
  neutral-surface: "#f1f5f9"
  neutral-bg: "#f8fafc"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  button: "0.5rem"
  card: "1rem"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.trust-cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.trust-cobalt-deep}"
  button-secondary:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.trust-cobalt}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-700}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: N4Cluster

## 1. Overview

**Creative North Star: "The Utility Ledger"**

N4Cluster's interface reads like a plainspoken account book, not a SaaS pitch deck. Deep navy and a single trustworthy cobalt blue carry most of the visual weight; teal appears only where something is confirmed good (the N4Cluster side of a comparison, a completed step); amber is reserved, used sparingly as a caution or attention marker. Nothing is decorated for its own sake — surfaces sit flat until a user interacts with them, numbers are stated in the largest, boldest type on the page, and color is assigned by function (brand action, positive outcome, caution) rather than by mood. This is the visual expression of "utility pricing, not extraction": every design decision should read as precise and accountable, the way a flat monthly bill reads, not the way a marketing brochure reads.

The system explicitly rejects the generic AI/SaaS template look (purple-to-blue gradient hero cards, identical icon-tile feature grids, a tiny uppercase eyebrow pinned above every section), the flashy consumer delivery-app aesthetic (this is a B2B pitch to operators, not a consumer ordering app), and stiff corporate-consulting visual tropes (stock photography, dense feature-matrix tables, navy-suit gravitas for its own sake).

**Key Characteristics:**
- One dominant brand color (cobalt) used functionally for primary actions and links, not decoratively.
- Flat-by-default surfaces; shadow and lift exist only as a response to hover/focus.
- A single typeface (Inter) carries the entire hierarchy through weight and size, not a serif/sans pairing — the pairing itself is a form of restraint.
- Numbers get the loudest visual treatment on the page; this is a pricing-led brand.

## 2. Colors

The palette is functional, not decorative: navy for depth and dark surfaces, one cobalt for brand/action, teal reserved for "this is the good outcome," amber reserved for caution, and a long slate neutral ramp for everything else.

### Primary
- **Trust Cobalt** (#2563eb): the brand's one committed color. Primary buttons, links, focus rings, active nav states, the primary badge variant. Used functionally — if it's cobalt, it's actionable or it's the brand asserting itself, never a decorative accent.

### Secondary
- **Signal Teal** (#14b8a6): the "confirmed good" color. The N4Cluster side of every marketplace-vs-N4Cluster comparison, checkmarks, positive delta indicators, completed timeline steps. Never used for a neutral or negative state.

### Tertiary
- **Caution Amber** (#f59e0b): reserved for attention/highlight moments — a third accent in a 3-item comparison or pillar grid, a "notice this" marker. Used sparingly; if more than one element on a screen is amber, it has stopped meaning "pay attention here."

### Neutral
- **Ink Navy** (#040d1c): heading text color on light surfaces, and the base of the dark hero gradient. The darkest tone in the system; reserved for maximum-contrast text and the deepest dark-mode surfaces.
- **Navy Deep / Mid / Steel / Line** (#0a1628 / #0f2040 / #162d58 / #1e3a70): the dark-surface ramp — hero backgrounds, dark cards, dark-mode borders. Always used together as a gradient or stepped surface, never as a single flat fill on its own.
- **Neutral Ink** (#020617): reserved, darkest slate value; largely unused in current UI but available for extreme-contrast needs.
- **Neutral Text** (#0f172a): default body text color on white surfaces.
- **Neutral Muted** (#475569): secondary body text — descriptions, supporting copy under a headline.
- **Neutral Border** (#e2e8f0): the standard card/section border and divider color.
- **Neutral Surface** (#f1f5f9): the default badge background and subtle fill color.
- **Neutral Background** (#f8fafc): alternating section background, distinguishing one section from the white section above/below it without a hard border.
- **White** (#ffffff): the default page background.

### Named Rules
**The Functional Color Rule.** Every non-neutral color on screen must be doing a job (brand action = cobalt, confirmed-good = teal, caution = amber). If a color is there only because the layout "needed some color," it's wrong — swap it for a neutral.

**The One Gradient Rule.** Gradients (`.gradient-hero`, `.gradient-dark`, `.gradient-cobalt`) are reserved for large background surfaces (hero sections, dark CTA bands), never for text or small UI elements. The codebase currently has a `.text-gradient` utility (cobalt→teal clip-text) — treat it as legacy, not a pattern to extend; gradient text reads as decorative rather than functional and works against the ledger-plain personality.

## 3. Typography

**Display / Body Font:** Inter (with `ui-sans-serif, system-ui, -apple-system, sans-serif` fallback)

**Character:** A single geometric-humanist sans carries the entire system. There is no second display face — hierarchy comes entirely from size, weight, and color, which reinforces the plainspoken, unfussy personality: nothing is dressed up in a separate "brand font."

### Hierarchy
- **Display** (700, 2.25rem → 3rem → 3.75rem responsive, line-height 1.2, tracking -0.02em): hero H1s only. Steps up at each breakpoint (`text-4xl sm:text-5xl lg:text-6xl`) rather than a fluid clamp.
- **Headline** (700, 1.5rem → 2.25rem responsive, line-height 1.2, tracking -0.02em): section H2s (`SectionIntro`). Steps `text-2xl sm:text-3xl md:text-4xl`, or `text-3xl sm:text-4xl md:text-5xl` for a page's single most important section.
- **Title** (700, 1.25rem, line-height 1.2): card and component-level H3s (`CardTitle`, pillar/feature titles).
- **Body** (400, 1rem, line-height 1.6): default paragraph text. A 1.125rem "lead" variant (`text-lg`, line-height relaxed) is used for hero subheadings and section intros — the one place body text is intentionally larger.
- **Label** (600, 0.75rem, tracking 0.05em, uppercase): eyebrow badges, micro-labels, tags. Always paired with the pill badge shape, never used as a freestanding text style.

### Named Rules
**The One-Face Rule.** Every typographic decision is expressed in Inter through weight and size, never a second font family. If a section needs to feel different, reach for size/weight/color, not a new typeface.

## 4. Elevation

The system is flat by default. Surfaces sit with no shadow at rest; elevation exists only as a response to interaction. Cards and buttons pick up a shadow and a small upward lift (`translateY(-2px)`) on hover, and revert immediately on mouse-out. There is no persistent layered/tonal elevation system — depth is not a resting-state visual language here, it's a state-change signal.

### Shadow Vocabulary
- **Resting** (`none`): the default state for every card, button, and container. Flat is correct, not an oversight.
- **Interactive hover** (`box-shadow: 0 20px 40px -12px rgba(4, 13, 28, 0.15)` + `transform: translateY(-2px)`): applied via the `.card-hover` utility on hoverable cards.
- **Button ambient** (`shadow-sm` → `shadow-md` on hover): primary/secondary/danger buttons carry a light ambient shadow at rest that deepens slightly on hover — the one exception to true flat-at-rest, kept subtle enough not to contradict the rule.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow and lift appear only as a direct response to hover or focus — never as permanent decoration on a card just sitting on the page. `@media (prefers-reduced-motion: reduce)` disables the lift transform entirely; the shadow-on-hover state should degrade gracefully to a shadow-only cue when motion is reduced.

## 5. Components

Buttons, cards, and badges should feel precise and unfussy: sharp edges softened just enough (8–16px radii), color assigned functionally, no ornamentation beyond what a state requires.

### Buttons
- **Shape:** 8px radius (`--radius-button: 0.5rem`), consistent across all variants and sizes.
- **Primary:** Trust Cobalt background (#2563eb), white text, `shadow-sm` at rest deepening to `shadow-md` on hover, background darkens to #1a4fd6 on hover.
- **Secondary:** Navy Deep background (#0a1628), white text — used where a second, quieter CTA needs weight without competing with the primary cobalt action.
- **Outline / Ghost / Danger:** Outline is a cobalt 1px border on transparent, filling solid cobalt with white text on hover. Ghost is transparent with navy text, filling to a neutral surface tint on hover. Danger mirrors primary's shape and shadow behavior in red, reserved for destructive actions only (not currently used in shipped marketing copy).
- **Sizing:** three sizes (`sm`/`md`/`lg`) scale padding and font-size together; all three keep the same 8px radius and font-semibold weight.

### Cards / Containers
- **Corner Style:** 16px radius (`--radius-card: 1rem`) — noticeably softer than buttons, so cards read as containers and buttons read as controls.
- **Background:** white by default; a dark navy variant (`bg-navy-900`) is used for cards that need to sit inside a dark hero/CTA section.
- **Shadow Strategy:** flat at rest; see Elevation. The optional `hover` prop adds `.card-hover` and a pointer cursor for clickable cards.
- **Border:** optional 1px border, `neutral-border` (#e2e8f0) on light cards, `navy-line` (#1e3a70) on dark cards — used to define a card's edge on a same-color background rather than relying on shadow alone.
- **Internal Padding:** 24px (`p-6`) as the default.

### Badges / Labels
- **Style:** pill-shaped (`rounded-full`), uppercase label typography, no border by default.
- **State:** six functional variants tied directly to the color system — `default` (neutral surface fill), `cobalt`/`teal`/`amber` (10–15% tint fills of the matching brand color, colored text), `dark` (navy fill, cobalt-pale text, used on dark sections), `outline` (bordered, transparent, for a quieter tag).

### Navigation
Not deeply extracted in this pass (no distinctive nav-specific tokens found beyond the shared color/typography system); the sticky header follows the same neutral-surface/border and Trust Cobalt active-state conventions as the rest of the system.

## 6. Do's and Don'ts

### Do:
- **Do** assign color functionally: Trust Cobalt for brand/action, Signal Teal only for a confirmed-good outcome, Caution Amber only for a genuine attention moment.
- **Do** keep surfaces flat at rest; add shadow and lift only as a hover/focus response (`.card-hover`, button `shadow-sm` → `shadow-md`).
- **Do** carry the entire type hierarchy through Inter's weight and size — no second display face.
- **Do** give the pricing numbers the loudest visual treatment on any page they appear on; this is a pricing-led, ledger-plain brand.
- **Do** use the 8px button radius / 16px card radius split consistently so controls and containers stay visually distinct.

### Don't:
- **Don't** use the generic SaaS template look: no purple-to-blue gradient hero cards, no identical icon-tile feature grids repeated endlessly, no tiny uppercase eyebrow pinned above every single section (per PRODUCT.md's anti-references).
- **Don't** reach for the consumer delivery-app aesthetic (DoorDash/Uber Eats-style flashy consumer polish) — this is a B2B infrastructure pitch to operators, not a consumer ordering app (per PRODUCT.md's anti-references).
- **Don't** use stiff corporate-consulting visual tropes: no navy-suit stock photography, no dense feature-matrix tables, no jargon-heavy enterprise gravitas for its own sake (per PRODUCT.md's anti-references).
- **Don't** extend `.text-gradient` (cobalt→teal clip-text) further; it's legacy decorative use that works against the ledger-plain, functional-color personality.
- **Don't** add persistent/decorative shadows to cards or buttons at rest — flat-by-default is a deliberate rule, not a gap to fill in.
- **Don't** introduce a second typeface for "brand feel" — hierarchy is Inter's job here, done through weight and size.
- **Don't** use side-stripe borders, gradient text elsewhere in the system, or glassmorphism as decoration — none of these appear in the current system and none should be introduced.
