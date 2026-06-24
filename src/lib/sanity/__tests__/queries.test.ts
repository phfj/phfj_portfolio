import { describe, it, expect } from "vitest";
import {
  topicsQuery,
  topicBySlugQuery,
  projectsQuery,
  projectBySlugQuery,
  postsQuery,
  postBySlugQuery,
  featuredProjectsQuery,
} from "@/lib/sanity/queries";

describe("topic queries", () => {
  it("topicsQuery fetches all topics", () => {
    expect(topicsQuery).toBe('*[_type == "topic"]');
  });

  it("topicBySlugQuery fetches a topic by slug", () => {
    expect(topicBySlugQuery).toBe(
      '*[_type == "topic" && slug.current == $slug][0]',
    );
  });
});

describe("project queries", () => {
  it("projectsQuery fetches all projects sorted by published date", () => {
    expect(projectsQuery).toContain(
      '*[_type == "project"] | order(publishedAt desc)',
    );
    expect(projectsQuery).toContain('"coverImage": coverImage');
    expect(projectsQuery).toContain('"body": body[]');
  });

  it("projectBySlugQuery fetches a project by slug", () => {
    expect(projectBySlugQuery).toContain(
      '*[_type == "project" && slug.current == $slug][0]',
    );
    expect(projectBySlugQuery).toContain('"socialImage": socialImage');
  });
});

describe("post queries", () => {
  it("postsQuery fetches all posts sorted by published date", () => {
    expect(postsQuery).toContain(
      '*[_type == "post"] | order(publishedAt desc)',
    );
    expect(postsQuery).toContain('"coverImage": coverImage');
    expect(postsQuery).toContain('"topics": topics[]->{ _id, name, slug }');
  });

  it("postBySlugQuery fetches a post by slug", () => {
    expect(postBySlugQuery).toContain(
      '*[_type == "post" && slug.current == $slug][0]',
    );
    expect(postBySlugQuery).toContain('"body": body[]');
  });
});

describe("featuredProjectsQuery", () => {
  it("queries only featured projects sorted by date", () => {
    expect(featuredProjectsQuery).toContain(
      '*[_type == "project" && featured == true] | order(publishedAt desc)',
    );
  });
});
