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
      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md"
    >
      {coverUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={project.title}
            fill
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
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
        <p className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
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
                className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 text-xs text-[var(--muted)]"
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
