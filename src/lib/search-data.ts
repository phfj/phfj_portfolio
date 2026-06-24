import { getPosts, getProjects } from "@/lib/sanity/queries";

export interface SearchItem {
  id: string;
  type: "post" | "project";
  title: string;
  slug: string;
  summary: string;
  topics: string[];
}

export async function getSearchItems(): Promise<SearchItem[]> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const postItems: SearchItem[] = posts.map((p) => ({
    id: p._id,
    type: "post",
    title: p.title,
    slug: p.slug.current,
    summary: p.summary ?? "",
    topics: p.topics?.map((t) => t.name) ?? [],
  }));

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: p._id,
    type: "project",
    title: p.title,
    slug: p.slug.current,
    summary: p.summary ?? "",
    topics: p.techStack ?? [],
  }));

  return [...postItems, ...projectItems];
}
