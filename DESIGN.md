---
name: N4Cluster
description: Commission-free ordering and delivery infrastructure for independent restaurants
colors:
  cream: "#F7F3EA"
  cream-2: "#F2EEE4"
  cream-3: "#E8E1D2"
  line: "#E4DCCB"
  ink: "#0F1A3A"
  ink-2: "#26335E"
  ink-3: "#3A4570"
  muted: "#5A6080"
  muted-2: "#4A5170"
  gold: "#F4B33E"
  green: "#1F7A4D"
  green-deep: "#155A38"
  green-tint: "#EAF5EE"
  red: "#B8371F"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
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
  button: "9999px"
  chip: "10px"
  card: "22px"
  panel: "32px"
shadows:
  button-rest: "0 1px 2px 0 rgba(0,0,0,0.05)"
  card-hover: "0 20px 40px -12px rgba(4,13,28,0.15)"
  mockup: "0 30px 60px rgba(15,26,58,0.35)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: N4Cluster

## 1. Overview

**Creative North Star: "The Neighborhood Ledger"**

N4Cluster reads like the well-kept ledger on a neighborhood restaurant's back counter: warm cream paper, ink-navy type, and one gold stamp for the thing you should do next. It is plainspoken and premium at once. Numbers are stated big and plain, surfaces are soft and rounded, and color is assigned by job: gold for actions, green for confirmed-good outcomes, red for the marketplace side of a cost comparison. This is the visual expression of "utility pricing, not extraction", warmed up so it feels like a local business, not a vendor.

The system rejects the generic AI/SaaS template look (purple gradients, identical icon-tile grids, an eyebrow above every section), the flashy consumer delivery-app aesthetic, and stiff corporate-consulting tropes.

**Key Characteristics:**
- Warm cream canvas with ink navy text; gold is the single action color.
- Two faces: Bricolage Grotesque for headings and display numbers, Inter for body and UI.
- Generously rounded shapes: pill buttons, 22px cards, 32px feature panels.
- Flat at rest; lift and shadow appear on hover, with a few deliberate large shadows on product mockups.

## 2. Colors

Source of truth: the `@theme` block in `app/globals.css`.

### Surfaces
- **Cream** (#F7F3EA): page background. **Cream 2** (#F2EEE4) and **Cream 3** (#E8E1D2): alternating sections, ghost-button hover fills. **White** (#FFFFFF): cards. **Line** (#E4DCCB): borders and dividers on cream.

### Ink
- **Ink** (#0F1A3A): headings, primary text, dark sections and dark cards. **Ink 2** (#26335E): dark-card borders, secondary-button hover. **Ink 3** (#3A4570): body copy on light. **Muted** (#5A6080) / **Muted 2** (#4A5170): supporting copy, placeholders; both clear 4.5:1 on cream.

### Action and outcome
- **Gold** (#F4B33E): primary buttons and the single highlight on a screen; always with Ink text. Text selection uses gold at 40% alpha.
- **Green** (#1F7A4D), **Green Deep** (#155A38), **Green Tint** (#EAF5EE): the confirmed-good outcome (N4Cluster side of comparisons, live status). Use Green Deep for small text.
- **Red** (#B8371F): the marketplace/negative side of a comparison, danger buttons.

### Legacy
`navy-900`, `navy-800`, `cobalt-*`, `slate-*` remain in `@theme` only for older pages and `app/t/**`. Do not use them in new work.

### Named Rules
**The Functional Color Rule.** Every non-neutral color does a job: gold = act, green = good, red = bad. If a color is there only because the layout needed some, swap it for cream or ink.
**The Teal Mark Rule.** Teal exists only inside the logo mark. It is not a UI color.
**The One Gradient Rule.** No gradient text; gradients, if any, stay on large background surfaces.

## 3. Typography

**Display / Headings:** Bricolage Grotesque (600/700/800), via `--font-display`; applied to all `h1`-`h6` in base styles. **Body / UI:** Inter, via `--font-sans`.

### Hierarchy
- **Display** (700, 2.25rem to 3.75rem responsive, line-height 1.2, tracking -0.02em): hero H1s and big stat numbers.
- **Headline** (700, 1.5rem to 2.25rem+, 1.2): section H2s.
- **Title** (700, 1.25rem, 1.2): card H3s (`font-display`).
- **Body** (400, 1rem, 1.6): paragraphs; a larger `text-lg` lead for intros.
- **Label** (600, 0.75rem, 0.05em tracking): badges and micro-labels, not an eyebrow over every section.

### Named Rules
**The Two-Face Rule.** Bricolage for headings and display numbers, Inter for everything else. No third family.

## 4. Elevation

Flat at rest. Shadow and lift respond to interaction, with deliberate exceptions for product mockups.

- **Button ambient:** `shadow-sm` at rest, `shadow-md` on hover (primary/secondary/danger).
- **Card hover** (`.card-hover`): `0 20px 40px -12px rgba(4,13,28,0.15)` plus `translateY(-2px)`; disabled under `prefers-reduced-motion`.
- **Mockup shadows:** large ink-tinted shadows (e.g. `0 30px 60px rgba(15,26,58,0.35)`) on phone/dashboard mockups only.

## 5. Components

### Buttons
- **Shape:** fully rounded pill (`rounded-full`), `font-semibold`, sizes `sm`/`md`/`lg`.
- **Primary:** Gold background, Ink text; hover `brightness-95` and deeper shadow. CTAs: "Get a free demo", "Build my demo storefront".
- **Secondary:** Ink background, white text, hover Ink 2.
- **Outline:** 1.5px Ink border, fills Ink with white text on hover. **Ghost:** transparent, Cream 3 on hover. **Danger:** Red, destructive only.

### Cards / Containers
- **Corner:** 22px (`rounded-[22px]`), 24px padding. Feature panels use 32px; chips and small tiles 10-20px.
- **Light card:** white on cream, optional 1px Line border. **Dark card:** Ink background, white text, Ink 2 border; carries `on-dark`.
- Hover cards use `.card-hover`.

### Badges
Pill shape, label typography, tinted fills (Green Tint, Cream 3, gold at low alpha), Ink or Green Deep text.

### Stat strip
An intended pattern: a row of plain big-number stats (Bricolage display, Ink on cream) with short labels. It states real figures; it is not a grid of decorative SaaS metric tiles.

### Focus
Global `:focus-visible` is a 2px Ink outline with 2px offset. On Ink surfaces add `on-dark` (white outline); for light cards nested inside an `on-dark` section add `on-light` (restores the Ink outline, must follow `on-dark` in the cascade).

### Logo
The N4Cluster mark is the only place teal appears. Wordmark in Ink on light, white on dark.

### Navigation
Sticky header on cream with Ink text and a gold primary CTA; same focus rules as above.

## 6. Do's and Don'ts

### Do:
- **Do** use gold for the one primary action per view, with Ink text.
- **Do** keep headings in Bricolage and everything else in Inter.
- **Do** state numbers big and plain; the price math is the hero.
- **Do** use the shape scale consistently: pill buttons, 22px cards, 32px panels.
- **Do** add `on-dark` / `on-light` so keyboard focus stays visible on every surface.
- **Do** keep copy claims verifiable; no invented proof.

### Don't:
- **Don't** use the generic SaaS look: purple gradients, repeated icon-tile grids, an eyebrow above every section, decorative metric tiles.
- **Don't** imitate consumer delivery apps (DoorDash/Uber Eats polish).
- **Don't** use corporate-consulting tropes: stock photography, dense feature matrices.
- **Don't** use teal outside the logo mark, or the legacy cobalt/navy/slate tokens in new work.
- **Don't** add persistent decorative shadows to ordinary cards or buttons at rest.
- **Don't** use gradient text, side-stripe borders, or glassmorphism.
