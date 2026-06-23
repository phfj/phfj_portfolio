import { getProjects } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects, open source, talks, and writing.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div>
        <h1>Projects</h1>
        <p>No projects yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Projects</h1>
      <div>
        {projects.map((project) => (
          <Link key={project._id} href={`/projects/${project.slug.current}`}>
            <article>
              <h2>{project.title}</h2>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
