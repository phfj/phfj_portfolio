# Project Polish — Reading Time & Updated Timestamp

## What to build

`getReadingTime()` is only used for blog posts. Apply it to project detail
pages too since they have body content. Also display the project's last-updated
timestamp to show maintenance activity.

## Acceptance criteria

- [ ] Project detail page displays estimated reading time alongside category badge
- [ ] Reading time calculated from `project.body` PortableText blocks using existing `getReadingTime()`
- [ ] "Last updated" date displayed on project detail page (from `project._updatedAt` or `project.updatedAt`)
- [ ] Date formatted with `toLocaleDateString` (e.g., "Updated June 2024")
- [ ] Reading time hidden if body is empty
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
