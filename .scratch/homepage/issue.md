# Homepage

## What to build

The site's landing page at `/`. Includes a hero section with name and tagline,
a grid of featured Projects, a list of latest Posts, and a subscribe CTA section.
This is the first page every visitor sees — it should communicate who you are,
what you do, and invite exploration and subscription.

## Acceptance criteria

- [ ] Hero section with name, tagline, and brief intro
- [ ] Featured Projects grid (filtered to `featured: true`, max 3-6)
- [ ] Latest Posts list (most recent 3-5)
- [ ] Subscribe CTA section with email input and submit button (posts to placeholder endpoint)
- [ ] Links to `/projects`, `/posts`, `/about`
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `project-content` (needs Projects with `featured` field to display)
- `blog-content` (needs Posts to display)
