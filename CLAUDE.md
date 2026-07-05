# N4ClusterDotcom

## Branching
Never commit directly to `master`. Always create a feature branch first (`feat/*`, `fix/*`, `chore/*`, `docs/*`) and open a PR.

## After merging a feature branch
Run `/graphify --update` (or `graphify update` if outside Claude Code) on `master` so `graphify-out/graph.json` reflects the merged changes.
