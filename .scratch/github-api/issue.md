# GitHub API Integration

## What to build

Fetch live GitHub data to make the portfolio feel alive. Display repo stats
(stars, forks, primary language, last commit date) on project cards and add a
GitHub activity feed section to the homepage showing recent commits, PRs, and
contributions.

This is the single highest-impact feature for demonstrating coding ability to
recruiters — it turns static content into a dynamic, data-driven application.

## Acceptance criteria

- [ ] GitHub personal access token configured as env var `GITHUB_TOKEN` (fine-grained, read-only: public repos)
- [ ] API route or build-time fetch to get pinned/featured repo data: stars, forks, language, description, last push date
- [ ] Repo stats displayed on project cards as small badges (star count + fork count)
- [ ] Homepage section: "Recent Activity" — fetches latest public events (pushes, PRs, stars) and renders as a timeline
- [ ] GitHub data fetched at build time (static export compatible) — no client-side API calls leaking the token
- [ ] Graceful fallback: if GitHub API is rate-limited or the token is missing, hide the section without error
- [ ] Loading state: skeleton while data is computed (build-time data, but show pattern for future dynamic use)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
