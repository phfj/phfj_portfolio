# Portfolio Site

The online portfolio and blog of Paul Holmes — showcasing software development work, documenting the learning journey, and creating interest in the field through self-education and curiosity.

## Language

### Content

**Project**:
A portfolio entry showcasing a piece of work. Subtyped by Category.
_Avoid_: Showcase, portfolio item, work

**Post**:
A blog article published on the site.
_Avoid_: Article, entry, blog

**Topic**:
A shared taxonomy label applied to both Projects and Posts. Used for cross-content filtering and discovery (e.g., "TypeScript", "DevOps", "Career").
_Avoid_: Tag, label, keyword

**Category**:
The type of a Project: Software, OSS, Talk, or Writing. A fixed enumeration, distinct from the freeform Topic taxonomy.
_Avoid_: Type, kind, group

**Timeline Event**:
A career or biographical entry shown on the About page timeline. Typed by one of four kinds: Work, Education, Project, or Writing. A Timeline Event of kind Project or Writing may reference an existing Project or Post document respectively.
_Avoid_: Milestone, timeline item, career event

### People

**Author**:
Paul Holmes — the solo content creator and site owner. There is exactly one Author.
_Avoid_: Admin, owner, creator, user

**Subscriber**:
A person who signed up to receive email updates when new content is published. Requires double opt-in confirmation.
_Avoid_: Reader, follower, audience

### Relationships

- A **Project** belongs to one **Category** and can have many **Topics**.
- A **Post** can have many **Topics**.
- A **Topic** can be applied to many **Projects** and many **Posts**.
- A **Post** can optionally reference related **Projects**.
- A **Subscriber** signs up via the subscription form and receives notifications when the **Author** publishes a new **Post**.
- A **Timeline Event** of kind Project may reference a **Project** document.
- A **Timeline Event** of kind Writing may reference a **Post** document.

### Example dialogue

> "I just added my React Query library as a Project under the OSS Category."
> "Readers can browse all my TypeScript content by going to the TypeScript Topic page — it shows both Projects and Posts."
> "When I publish a new Post, Buttondown emails every confirmed Subscriber."
