# Site layout & navigation

## What to build

The global site shell: header with navigation links, a footer with the subscribe
form and credits, and a responsive layout that wraps all content pages. This
unifies the site visually and provides consistent navigation. Header and footer
are shared across all routes via the root layout.

## Acceptance criteria

- [ ] Header with site name/logo and navigation links (Home, Projects, Blog, About)
- [ ] Mobile-responsive navigation (hamburger or equivalent for small screens)
- [ ] Footer with subscribe form, copyright, and credits
- [ ] Active route highlighted in navigation
- [ ] Layout wraps all existing pages without breaking their content
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `tracer-bullet` (navigation needs Topic page to link to)
- `project-content` (navigation needs `/projects`)
- `blog-content` (navigation needs `/posts`)
- `about` (navigation needs `/about`)
