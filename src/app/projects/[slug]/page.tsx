import { getProjects, getProject } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@/components/portable-text";
import { getImageUrl } from "@/lib/sanity/image";

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

  const coverUrl = getImageUrl(project.coverImage, 1200);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        &larr; Projects
      </Link>

      <article className="mt-8">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={project.title}
            width={1200}
            height={675}
            className="mb-10 w-full rounded-xl border border-[var(--border)]"
            priority
          />
        )}

        <p className="text-sm font-medium tracking-wider text-[var(--accent)] uppercase">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {project.title}
        </h1>

        {project.summary && (
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            {project.summary}
          </p>
        )}

        {project.body && project.body.length > 0 && (
          <div className="mt-8">
            <PortableText value={project.body} />
          </div>
        )}
      </article>

      {(project.liveUrl || project.repoUrl) && (
        <section className="mt-12 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              View Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)]"
            >
              Source Code
            </a>
          )}
        </section>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.whatILearned && (
        <section className="border-accent-100 bg-accent-50 mt-10 rounded-xl border p-6">
          <h2 className="text-lg font-semibold">What I Learned</h2>
          <p className="mt-2 leading-relaxed text-[var(--muted)]">
            {project.whatILearned}
          </p>
        </section>
      )}
    </div>
  );
}
