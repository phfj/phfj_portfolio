# Project Filtering by Category

## What to build

The `/projects` page shows all projects in a single grid with no filtering.
Add filter pills/tabs for the project categories (Software, OSS, Talk, Writing,
All) so visitors can narrow the grid to what they care about. This also
demonstrates client-side state management capability.

## Acceptance criteria

- [ ] Filter bar with pills: "All" (default selected), "Software", "OSS", "Talk", "Writing"
- [ ] Clicking a pill filters the grid to only projects matching that category
- [ ] Active pill is visually distinct (filled accent background)
- [ ] Filter state preserved in URL query param (`?category=oss`)
- [ ] Filtering is instant (no loading state) — all data is already loaded at build time
- [ ] Empty state per filter: "No {category} projects yet." when filtered list is empty
- [ ] Pagination (if `pagination` is done) works correctly with active filter
- [ ] Responsive: pills wrap on narrow screens, horizontal scroll on mobile
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `pagination` (if both are done, filtering should work across pages)
