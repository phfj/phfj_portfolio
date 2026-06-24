import { client } from "./client";
import type { Topic, Project, Post } from "./types";

export const topicsQuery = '*[_type == "topic"]';

export const topicBySlugQuery =
  '*[_type == "topic" && slug.current == $slug][0]';

const imageProjection = `{
  ...,
  asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions{
        width,
        height,
        aspectRatio
      }
    }
  }
}`;

const richBodyProjection = `"body": body[]{
  ...,
  _type == "image" => ${imageProjection}
}`;

const postProjection = `{
  ...,
  "coverImage": coverImage${imageProjection},
  "seo": seo{
    ...,
    "socialImage": socialImage${imageProjection}
  },
  ${richBodyProjection},
  "topics": topics[]->{ _id, name, slug }
}`;

const projectProjection = `{
  ...,
  "coverImage": coverImage${imageProjection},
  "seo": seo{
    ...,
    "socialImage": socialImage${imageProjection}
  },
  ${richBodyProjection}
}`;

export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) ${projectProjection}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`;

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

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) ${postProjection}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${postProjection}`;

export async function getPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(postsQuery);
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(postBySlugQuery, { slug });
}

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc) ${projectProjection}`;

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(featuredProjectsQuery);
}

const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && references($topicIds)] | order(publishedAt desc)[0...3] ${postProjection}`;

export async function getRelatedPosts(
  slug: string,
  topicIds: string[],
): Promise<Post[]> {
  if (topicIds.length === 0) return [];
  return client.fetch<Post[]>(relatedPostsQuery, { slug, topicIds });
}

export const postsByTopicQuery = `*[_type == "post" && $topicId in topics[]._ref] | order(publishedAt desc) ${postProjection}`;

export const projectsByTopicQuery = `*[_type == "project" && $topicId in topics[]._ref] | order(publishedAt desc) ${projectProjection}`;

export async function getPostsByTopic(topicId: string): Promise<Post[]> {
  return client.fetch<Post[]>(postsByTopicQuery, { topicId });
}

export async function getProjectsByTopic(topicId: string): Promise<Project[]> {
  return client.fetch<Project[]>(projectsByTopicQuery, { topicId });
}
