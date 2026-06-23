import { getProjects, getProject } from "@/lib/sanity/queries";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getProjects();
  if (projects.length === 0) return [{ slug: "__placeholder__" }];
  return projects.map((project) => ({ slug: project.slug.current }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return null;
  return (
    <div>
      <h1>{project.title}</h1>
    </div>
  );
}
