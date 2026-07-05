# Pricing fee model correction — design

## Background

The live site has the merchant/customer fee assignment backwards, and is missing a merchant subscription fee that the business now charges. Corrected model:

| Fee | Who pays | Amount |
|---|---|---|
| Neighborhood Fee | Customer, at checkout | $0.99 / order |
| Merchant per-order fee | Merchant | $0.50 / order |
| Platform / subscription fee | Merchant | $99 / month flat (covers base features) |

Commission is still 0% — that part of the story doesn't change.

This was found while investigating a user-reported "pricing not reflecting correctly" issue (see conversation history / graphify trace). Root-cause investigation also surfaced 3 unrelated pre-existing bugs (homepage's 2-tier vs pricing page's 3-tier commission comparison table; two arithmetic errors on the solutions page). Those are **out of scope** for this change — tracked separately as GitHub issues — except where a line must be touched anyway to remove a stale $0.99/$0.50 reference.

## Decisions made during brainstorming

1. **"No monthly minimums" protection card**: reframed rather than dropped. New copy: "One flat fee — fully disclosed" / "$99/mo quoted up front. No hidden add-ons or usage-based minimums." Keeps the six-card grid intact (3-column layout stays even).
2. **Bottom summary strip**: stays at 4 stats — `$99/mo` (platform fee), `$0.50` (per-order, merchant), `$0.99` (per-order, customer), `0%` (commission). The `90d+` notice stat is dropped from this strip; that detail still lives in the page's adjustment-formula section further down.
3. **ROI Calculator**: now includes the $99/mo flat fee in its cost model, not just the per-order fee:
   ```
   marketplaceCost = orders × avgTicket × (commission / 100)     // unchanged
   n4Cost          = (orders × $0.50) + $99 + processing          // was: orders × $0.99 + processing
   savings         = marketplaceCost − n4Cost
   ```
   `processing` (payment processing estimate) is unchanged.
4. **docs/IMPLEMENTATION-SPEC.md**: updated alongside the live pages so it stays the accurate source of truth (D2 pricing section, E10 savings calculator section, the QA checklist line, and the `n4clusterFee` schema default).

## Files in scope

| File | Change |
|---|---|
| `app/pricing/page.tsx` | Swap fee labels, add $99/mo throughout (hero callout, summary strip), rewrite checkout mock visual math, reframe one protection card, update price-lock section to cover both the per-order fee and the $99/mo, update on-page FAQ answers |
| `app/page.tsx` | Homepage hero/trust-strip/CTA copy; the "$40 order" example's N4Cluster row goes from "$0.99 flat" → "$0.50/order + $99/mo" |
| `app/platform/page.tsx` | Update "$0.99 per order" mentions |
| `app/solutions/page.tsx` | Update "$0.99 flat" merchant-fee-model line and per-order/monthly cost illustration numbers |
| `app/how-it-works/page.tsx` | Update "$0.99 per order" mentions |
| `app/roi-calculator/ROICalculator.tsx` | `PLATFORM_FEE` 0.99 → 0.50, add flat `$99` monthly term to `n4Cost`, update all "$0.99 flat" UI labels |
| `app/roi-calculator/page.tsx` | Update fee-description copy |
| `content/pages/faq.ts` | Update the two FAQ entries describing the fee split |
| `docs/IMPLEMENTATION-SPEC.md` | Update D2/E10 sections, QA checklist line, `n4clusterFee` schema default |

## Explicitly out of scope (tracked as separate GitHub issues instead)

1. Homepage commission-comparison table uses 2 tiers (30%/20%) vs the spec-mandated 3 tiers (30%/27%/25%) that `/pricing` already uses correctly.
2. Solutions page: "-$1,200/mo... on 400 orders avg $10 commission each" — arithmetic doesn't reconcile (400 × $10 = $4,000, not $1,200).
3. Solutions page: "Commission saved per $40 order vs 30% marketplace" shows $11.90; correct value is $11.01 (pre-swap) / $11.50 (post-swap, since the N4Cluster side of that subtraction is changing from $0.99 to $0.50 anyway, incidental correction acceptable there since we must touch that number regardless).

## Testing

No automated test suite exists for page content. Verification is:
- `npm run build` / `npm run lint` pass (typecheck + Next.js build)
- Manual read-through of every changed page's rendered copy for the new numbers
- `grep` sweep confirming no stray `$0.99` (merchant context) or unswapped `$0.50` (customer context) references remain outside the files intentionally left alone (docs spec, if any historical/archived section is deliberately preserved — none identified)
