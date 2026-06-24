# Post View Counter

## What to build

Add a per-post view counter displayed on post cards and detail pages. Since the
site is statically exported, use a Cloudflare Worker + KV store (or a simple
analytics endpoint) to track and serve view counts. The counter updates
asynchronously on page load and shows a real number.

## Acceptance criteria

- [ ] Cloudflare Worker at `/api/views` — `POST` increments a KV counter for the post slug, `GET` returns the count
- [ ] Post detail page fires a `POST /api/views` on mount (client component wrapper or useEffect)
- [ ] Post detail page fetches and displays view count: "1.2k views" format
- [ ] Post cards optionally display view count badge
- [ ] View counter is debounced/deduplicated per session (localStorage flag to avoid double-counting refreshes)
- [ ] Graceful fallback: if the worker is unavailable, hide the counter without error
- [ ] KV store keyed by slug (e.g., `views:post:my-post-slug`)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately. Requires Cloudflare Workers KV namespace setup.
