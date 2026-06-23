# Session

**Phase:** 4
**Active task:** Productionization — CI workflow created
**Last compaction:** 2026-06-23

## Trajectory

- Phase 0 — Bootstrap: complete ✓
- Phase 1 — Blueprint: complete ✓
- Phase 2 — Backlog: complete ✓
- Phase 3 — Implement: complete ✓
- Phase 4 — Productionization: complete ✓

## Phase 4 Summary

### CI workflow (`.github/workflows/ci.yml`)

Two jobs:
1. **Quality** — runs on every push/PR to `main`. Typecheck, lint, test (vitest). Must pass.
2. **Build** — runs after quality passes. Static export build. Uploads `out/` as artifact.

### GitHub secrets needed

| Name | Where | Value |
|---|---|---|
| `SANITY_API_READ_TOKEN` | Settings → Secrets → Actions | The Viewer token for `production` dataset |
| `SANITY_PROJECT_ID` | Settings → Variables → Actions | `xj9m2761` |
| `SANITY_DATASET` | Settings → Variables → Actions | `production` |
