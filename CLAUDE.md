# N4ClusterDotcom

## Branching
Never commit directly to `master` or any `release/*` branch. Always create a feature branch first (`feat/*`, `fix/*`, `chore/*`, `docs/*`) and open a PR.

Current integration target: `release/2026.06`. PR feature branches into it, not `master`.

## After merging a feature branch
Run `/graphify --update` (or `graphify update` if outside Claude Code) on the integration branch so `graphify-out/graph.json` reflects the merged changes.
