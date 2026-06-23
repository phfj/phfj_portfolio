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
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">No projects yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Projects
      </h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        Software projects, open source, talks, and writing.
      </p>
      <hr className="mt-8 mb-10 h-px border-0 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug.current}`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-all hover:scale-[1.01] hover:border-[var(--accent)] hover:shadow-md"
          >
            <article>
              <p className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">
                {project.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
                {project.title}
              </h2>
              {project.summary && (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                  {project.summary}
                </p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 text-xs text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
