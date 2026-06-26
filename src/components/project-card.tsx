"use client";

import { memo } from "react";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/sanity/types";
import { getImageBlurDataUrl, getImageUrl } from "@/lib/sanity/image";

interface Props {
  project: Project;
}

export const ProjectCard = memo(function ProjectCard({ project }: Props) {
  const coverUrl = getImageUrl(project.coverImage);

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] transition-all duration-200 hover:-translate-y-0.5"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Left accent border — appears on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      {coverUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={project.title}
            fill
            className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder={
              getImageBlurDataUrl(project.coverImage) ? "blur" : "empty"
            }
            blurDataURL={getImageBlurDataUrl(project.coverImage)}
          />
        </div>
      )}
      <div className="p-6">
        {/* Category in slate blue — metadata, not a CTA */}
        <p className="font-mono text-xs font-medium tracking-wider text-[var(--accent-blue)] uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold transition-colors duration-150 group-hover:text-[var(--accent)]">
          {project.title}
        </h3>
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
                className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
});
