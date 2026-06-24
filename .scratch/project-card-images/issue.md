# Project Card Images

## What to build

Project cards currently show only text — no cover images. Add cover images to
the `ProjectCard` component (with lazy loading) for visual appeal. This makes
the projects grid more engaging and visually competitive with other portfolios.

## Acceptance criteria

- [ ] `ProjectCard` renders `coverImage` when available, with `next/image`
- [ ] Image uses `loading="lazy"`, `width={600}`, `height={340}`, aspect-video ratio
- [ ] Card layout: image on top, content below (category badge, title, summary, tech stack)
- [ ] If no `coverImage`, card renders as before (text-only, no broken image)
- [ ] Homepage featured projects grid and /projects grid both pick up the change
- [ ] Image has subtle border-radius to match card corners
- [ ] Hover effect on the image (subtle scale or brightness) to complement the card lift
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (depends on `ProjectCard` existing)
- `image-optimization` (should use the same sizing/blur conventions)
