# Cloudflare Pages deployment

## What to build

Configure Next.js for static export, set up Cloudflare Pages for deployment,
and wire Sanity's webhook to trigger automatic rebuilds on content changes.
This takes the site from a local development project to a live URL on the
internet.

## Acceptance criteria

- [ ] `next.config.ts` configured with `output: "export"`
- [ ] Static export build succeeds (`npm run build` produces `out/`)
- [ ] Cloudflare Pages project created and connected to the git repo
- [ ] Build command configured: `npm run build`, output directory: `out/`
- [ ] Site deploys successfully on push to `main`
- [ ] Custom domain configured (if desired)
- [ ] Sanity webhook created to trigger Cloudflare deploy hook on publish/unpublish/delete
- [ ] Publishing content in Sanity triggers a site rebuild within 60 seconds
- [ ] Published content appears on the live site after rebuild

## Blocked by

- `site-shell` (site should be visually complete before going live)
