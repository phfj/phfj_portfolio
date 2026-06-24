# About Page Redesign

## What to build

The current About page is purely static text — no photo, no clear value
proposition, no specialization callout. Redesign it to be recruiter-ready:
professional headshot, years of experience, primary tech stack, what you're
passionate about, and a clear CTA to view projects or get in touch.

## Acceptance criteria

- [ ] Professional photo/avatar at the top (from Sanity or a static image)
- [ ] Clear headline: "Hi, I'm Paul — a [specialization] based in [location]"
- [ ] "What I do" section: 2-3 sentences on primary focus, tech stack, and what makes you different
- [ ] "Tech I work with" section: grid of tech icons/badges (React, TypeScript, Next.js, Node.js, etc.)
- [ ] "Curiosity & learning" section: the existing mission text, refined
- [ ] CTA buttons: "View my work" → /projects, "Get in touch" → scrolls to contact form
- [ ] Contact form placed below the CTA (if `contact-form` is done) or link to contact
- [ ] Responsive: single column on mobile, photo + text side-by-side on desktop
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (uses `GitHubIcon`, `LinkedInIcon`, `EmailIcon`)
- `contact-form` (if the contact form is rendered inline)
