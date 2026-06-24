# Fix Topic Pages — Show Actual Content

## What to build

Topic pages (`/topics/[slug]`) currently render only the topic name and a
placeholder message. They don't query or display any projects or posts. Fix
them to fetch and display all posts and projects tagged with the current topic.

Also fix the heading hierarchy: the topic name is rendered as a `<p>` instead
of `<h1>`.

## Acceptance criteria

- [ ] Topic page queries posts where `topic._ref` matches the current topic slug
- [ ] Topic page queries projects where `topic._ref` matches the current topic slug
- [ ] Posts are rendered as a list of `PostCard` components with section heading "Posts"
- [ ] Projects are rendered as a grid of `ProjectCard` components with section heading "Projects"
- [ ] Empty state: "No posts or projects yet for this topic." when both are empty
- [ ] Topic name rendered as `<h1>` (not `<p>`)
- [ ] Metadata `title` and `description` describe the topic
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (uses `ProjectCard`)
