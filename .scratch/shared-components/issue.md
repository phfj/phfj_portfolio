# Shared Components — DRY Refactor

## What to build

Eliminate duplicated markup across the codebase by extracting three shared
components: `SectionDivider`, a social `Icons` module (GitHub, LinkedIn, Email
SVGs), and `ProjectCard`. These are currently copy-pasted across 2-5 files each.

## Acceptance criteria

- [ ] `SectionDivider` component extracted from `src/app/page.tsx:13-19`, exported, and reused in `about/page.tsx`, `posts/page.tsx`, `projects/page.tsx`, `topics/[slug]/page.tsx`
- [ ] Social SVG icons extracted to `src/components/icons.tsx` as named exports (`GitHubIcon`, `LinkedInIcon`, `EmailIcon`), consumed by `footer.tsx` and `about/page.tsx`
- [ ] Icons accept `className` prop for styling
- [ ] `ProjectCard` component extracted from `src/app/projects/page.tsx:33-63`, reused on homepage `src/app/page.tsx` (replacing inline `Link > article`)
- [ ] `ProjectCard` renders: category badge, title, summary (2-line clamp), tech stack pills, hover lift effect
- [ ] Homepage featured projects grid and /projects grid both use the same `ProjectCard`
- [ ] No visual regressions — existing pages render identically
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
