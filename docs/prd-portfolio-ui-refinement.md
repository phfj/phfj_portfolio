# PRD: Portfolio UI Refinement

## Problem Statement

The developer's portfolio website was tasteful but lacked a distinctive visual identity, feeling somewhat generic. It needed to transition from "tasteful-but-forgettable" to an experience that feels warm, editorial, and quietly technical to leave a memorable impression on engineering peers and potential clients.

## Solution

Overhaul the portfolio UI using a design system anchored in personal warmth (inspired by Builder Methods), with shud.in-style restraint and a minimal level of technical density (inspired by AI Hero). This is achieved through refined typography, a dual-accent palette (warm orange and slate blue), polished micro-animations on interactive elements, and a clean, clutter-free homepage.

## User Stories

1. As an engineering peer, I want the homepage hero to dominate with the developer's name in a large, clean typeface, so that I am immediately greeted with a bold, editorial identity.
2. As a potential client, I want to read a concise, 2-3 sentence bio that explains the developer's focus on systems engineering and human-centered design, so that I can quickly understand their professional values.
3. As a visitor, I want to browse the homepage without distraction from heavy call-to-action buttons or duplicate sections, so that I can explore the site naturally through the navigation bar.
4. As an engineering peer, I want to see a small-caps monospaced label (like "WORK" and "WRITING") above section titles, so that the layout has a subtle, technical feel.
5. As a potential client, I want to read an editorial introduction paragraph at the top of the projects page, so that I have helpful context framing the collection of work.
6. As a visitor, I want project cards to display a subtle accent border and lift slightly with a shadow on hover, so that the page feels responsive and premium.
7. As an engineering peer, I want project categories to be highlighted in a slate-blue color, so that they are clearly distinguished as metadata rather than interactive call-to-action buttons.
8. As a visitor, I want post metadata (date and reading time) to be rendered in a monospaced font, so that I receive a quietly technical design signal.
9. As a visitor, I want a header with a rich backdrop blur and gradient background wash, so that it blends seamlessly into the content as I scroll.
10. As a visitor, I want the active page to be clearly indicated with a smooth underline transition in the header, so that I always know where I am in the site.

## Implementation Decisions

### Modules & Components
- **Global Styles**: Establish slate blue metadata tokens (`--accent-blue`) and custom warm-tinted card shadow tokens (`--shadow-card`, `--shadow-card-hover`) in the CSS design system.
- **Header**: Enhance the navigation bar with higher backdrop blur, a top-to-bottom background gradient wash, and a wider active page underline with a softened transition.
- **Hero & Home Layout**: Redesign the home page to remove the GitHub api integration and homepage subscription form. Restructure the hero with a clean typographic layout, the specific bio text, and a section-divider line.
- **Card Components**: Refactor Project and Post cards to animate a left-border strip on hover, lift their shadows, and format their metadata fields (categories, dates, reading times) using monospaced typography.
- **Projects Page**: Introduce a hardcoded prose framing component (`FeaturedProjectsIntro`) above the project filtering and list view.

### Architectural Decisions
- Keep dynamic CMS query schemas intact. All introductory text (bio and project page frame) is statically hardcoded for now, keeping the implementation simple without adding CMS schema bloat.

### Sanity Timeline Event Migration
- Define a `timelineEvent` document type in Sanity Studio with fields: `title`, `type` (Work | Education | Project | Writing), `organization`, `startDate` (YYYY-MM), `endDate` (YYYY-MM, optional), `description`, `skills` (array of strings), `links` (array of label+url objects), and optional references: `projectRef` (→ Project) and `postRef` (→ Post).
- Timeline Events of kind Project or Writing may optionally reference an existing **Project** or **Post** document respectively, but are not required to.
- Remove the static `timelineEvents` array from `src/lib/timeline.ts` and replace it with a `getTimelineEvents()` query in `src/lib/sanity/queries.ts`.
- Add a `TimelineEvent` type to `src/lib/sanity/types.ts` mirroring the Sanity schema shape.
- Convert the `CareerTimeline` client component to accept `initialEvents: TimelineEvent[]` as a prop; the `about/page.tsx` server component fetches and passes them.
- Existing static seed data in `timeline.ts` to be entered into Sanity Studio as the initial dataset.

## Testing Decisions

- Only test external behavior (e.g. metadata construction, reading time computation, layout rendering) rather than implementation details.
- Ensure that existing test cases covering page layout components and helper functions continue to pass without regression.
- Manual inspection of dark mode colors to verify contrast accessibility for the newly introduced slate blue color palette.

## Out of Scope

- Live API widgets or external sandbox embeds.
- Headshot image placeholders or styling.
- Integration of dynamic site settings panels.

## Further Notes

The triage label `ready-for-agent` should be applied to indicate this spec is verified and completed.
