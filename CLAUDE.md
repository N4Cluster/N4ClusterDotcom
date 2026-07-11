# N4ClusterDotcom

## Branching
Never commit directly to `master` or any `release/*` branch. Always create a feature branch first (`feat/*`, `fix/*`, `chore/*`, `docs/*`) and open a PR.

Current integration target: `release/2026.06`. PR feature branches into it, not `master`.

## After merging a feature branch
Run `/graphify --update` (or `graphify update` if outside Claude Code) on the integration branch so `graphify-out/graph.json` reflects the merged changes.

## Design Context
`PRODUCT.md` (register, users, positioning, brand personality, anti-references) and `DESIGN.md` (color/typography/component tokens, North Star "The Utility Ledger") capture this site's strategic and visual identity for the `impeccable` design skill. Read both before any UI/copy work that touches visual design; `.impeccable/design.json` is the machine-readable sidecar DESIGN.md's live-mode tooling reads.
