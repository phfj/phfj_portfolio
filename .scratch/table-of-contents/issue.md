# Table of Contents

## What to build

Add a sticky sidebar table of contents for blog posts. Parse headings from the
PortableText body blocks and render them as a navigable list that highlights the
currently visible section as the user scrolls.

## Acceptance criteria

- [ ] TOC rendered on post detail pages as a sticky sidebar (desktop: `lg:block`, mobile: hidden or collapsible)
- [ ] Headings extracted from `post.body` PortableText blocks: all `h2` and `h3` block types
- [ ] TOC items are anchor links: clicking scrolls to the heading (headings get `id` attributes from PortableText)
- [ ] Active heading highlighted based on scroll position (Intersection Observer)
- [ ] TOC scrolls independently if content is long (max height with overflow scroll)
- [ ] Smooth scroll behavior when clicking TOC items
- [ ] Empty state: no TOC rendered when post has fewer than 2 headings
- [ ] PortableText renderer adds `id` to heading blocks (derived from heading text, slugified)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
