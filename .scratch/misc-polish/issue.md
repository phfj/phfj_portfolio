# Miscellaneous Polish

## What to build

A collection of small fixes and optimizations: add `Cache-Control` headers for
static assets, configure font `display: "swap"`, and verify the Sanity API
read token scope is read-only.

## Acceptance criteria

- [ ] `next.config.ts` has `headers()` config with `Cache-Control` for static assets: `public, max-age=31536000, immutable` for `/_next/static/*` and `public, max-age=3600` for HTML pages
- [ ] `next/font/google` calls in `layout.tsx` include `display: "swap"` (if not default)
- [ ] Sanity dashboard checked: `SANITY_API_READ_TOKEN` has viewer/read-only permissions — if it has write access, token rotated to a read-only one
- [ ] `.env.local` updated with new token if rotation was needed
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately. Token audit should be done first regardless.
