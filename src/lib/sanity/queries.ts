import { client } from "./client";
import type { Topic, Project, Post } from "./types";

export const topicsQuery = '*[_type == "topic"]';

export const topicBySlugQuery =
  '*[_type == "topic" && slug.current == $slug][0]';

export const projectsQuery = '*[_type == "project"] | order(publishedAt desc)';

export const projectBySlugQuery =
  '*[_type == "project" && slug.current == $slug][0]';

export async function getTopics(): Promise<Topic[]> {
  return client.fetch<Topic[]>(topicsQuery);
}

export async function getTopic(slug: string): Promise<Topic | null> {
  return client.fetch<Topic | null>(topicBySlugQuery, { slug });
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(projectsQuery);
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch<Project | null>(projectBySlugQuery, { slug });
}

export const postsQuery =
  '*[_type == "post"] | order(publishedAt desc) { ..., topics[]->{ _id, name, slug } }';

export const postBySlugQuery =
  '*[_type == "post" && slug.current == $slug][0] { ..., topics[]->{ _id, name, slug } }';

export async function getPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(postsQuery);
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(postBySlugQuery, { slug });
}

export const featuredProjectsQuery =
  '*[_type == "project" && featured == true] | order(publishedAt desc)';

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(featuredProjectsQuery);
}

const relatedPostsQuery =
  '*[_type == "post" && slug.current != $slug && references($topicIds)] | order(publishedAt desc)[0...3] { ..., topics[]->{ _id, name, slug } }';

export async function getRelatedPosts(
  slug: string,
  topicIds: string[],
): Promise<Post[]> {
  if (topicIds.length === 0) return [];
  return client.fetch<Post[]>(relatedPostsQuery, { slug, topicIds });
}
