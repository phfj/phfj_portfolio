import { getProjects } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { SectionDivider } from "@/components/section-divider";
import { FilteredProjectList } from "@/components/filtered-project-list";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects, open source, talks, and writing.",
  openGraph: {
    title: "Projects",
    description: "Software projects, open source, talks, and writing.",
    url: `${SITE_URL}/projects`,
  },
  twitter: {
    card: "summary",
    title: "Projects",
    description: "Software projects, open source, talks, and writing.",
  },
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
      <SectionDivider className="mt-8 mb-10" />
      <FilteredProjectList projects={projects} />
    </div>
  );
}
