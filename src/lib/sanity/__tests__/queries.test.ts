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
    expect(projectsQuery).toBe(
      '*[_type == "project"] | order(publishedAt desc)',
    );
  });

  it("projectBySlugQuery fetches a project by slug", () => {
    expect(projectBySlugQuery).toBe(
      '*[_type == "project" && slug.current == $slug][0]',
    );
  });
});

describe("post queries", () => {
  it("postsQuery fetches all posts sorted by published date", () => {
    expect(postsQuery).toBe(
      '*[_type == "post"] | order(publishedAt desc) { ..., topics[]->{ _id, name, slug } }',
    );
  });

  it("postBySlugQuery fetches a post by slug", () => {
    expect(postBySlugQuery).toBe(
      '*[_type == "post" && slug.current == $slug][0] { ..., topics[]->{ _id, name, slug } }',
    );
  });
});

describe("featuredProjectsQuery", () => {
  it("queries only featured projects sorted by date", () => {
    expect(featuredProjectsQuery).toBe(
      '*[_type == "project" && featured == true] | order(publishedAt desc)',
    );
  });
});
