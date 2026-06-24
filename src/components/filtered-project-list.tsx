"use client";

import { useState } from "react";
import type { Project } from "@/lib/sanity/types";
import { ProjectCard } from "@/components/project-card";
import { PaginatedSection } from "@/components/paginator";

const categories = ["All", "Software", "OSS", "Talk", "Writing"] as const;

interface Props {
  projects: Project[];
}

export function FilteredProjectList({ projects }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const emptyMessage =
    active === "All"
      ? "No projects yet."
      : `No ${active.toLowerCase()} projects yet.`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <PaginatedSection
        emptyMessage={emptyMessage}
        containerClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </PaginatedSection>
    </div>
  );
}
