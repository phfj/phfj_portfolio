# Interactive Resume Timeline

## What to build

Replace the static About page text with an interactive career/education timeline.
Use a lightweight custom implementation (no heavy library) with scroll-triggered
animations and expandable sections.

## Acceptance criteria

- [ ] Vertical timeline component on About page showing career milestones, education, and key projects
- [ ] Timeline items have: date range, title/role, organization, brief description
- [ ] Scroll-triggered animation: items fade/slide in as they enter viewport (Intersection Observer)
- [ ] Expandable: clicking an item reveals more detail
- [ ] Timeline data defined as a static array in the component (no CMS dependency)
- [ ] Responsive: vertical line on the left, items offset; collapsing to full-width on mobile
- [ ] Respects `prefers-reduced-motion`
- [ ] Timeline is adjacent to (not replacing) the existing bio text
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `about-redesign` (should be done after the About page is restructured)
