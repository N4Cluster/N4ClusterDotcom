# Site redesign — assumptions made overnight (for owner review)

Decisions taken while you were away. Each says what I assumed and what it costs if wrong.

1. FAQ: the five homepage questions are exported as `homeFaqItems`. (Naming only.)
2. Cookie-consent banner is restyled to the new palette too (it shows on every page). If you wanted it untouched, revert one file.
3. `/t/*` (QR tracking pages) are left on the old styling — spec says no changes to `/t/*`. Old colour tokens stay in CSS for them.
4. `.impeccable/design.json` is created to mirror DESIGN.md (spec asks for it; it didn't exist).
5. Visual checks were done per task where a browser was available, plus one full pass at the end.
6. Hero phone mock shows a stock portrait next to the made-up "Maya just reordered" chip, as in the mockup. Maya is fictional; if this reads as a real customer to you, swap the image.
7. In the platform sections the mockup's chef photo and "Maya" avatar were dropped (people photos); a coffee photo and "A guest earned 40 points" are used instead.
8. /how-it-works: the old progress visuals and a "97% SLA" figure were removed (no source for them). Restore if that number is real.
9. /solutions: removed stats with no source (95%+, 97%, 30-minute SLA, Merchant Advisory Council, 90–180 day notice, CPI formula). Restore any that are real.
10. /solutions and /partners: removed POS brand names (Toast, Square, …) since they aren't confirmed as live integrations. Tell us which are live and they go back.
11. /integrations: dropped "promotional messages" (Privacy says no marketing texts yet).
12. Resource articles and /solutions: claims of POS integration, webhooks and data-architecture guarantees were softened (not among confirmed capabilities).
13. POS integrations: older pages (FAQ names Toast/Square/Clover/Lightspeed; /how-it-works, /pricing, /platform, /partners) still claim POS connections, while /solutions, /integrations and articles were softened to "works alongside the tools you already use". Tell us which POS integrations are live and we'll make it uniform.
