import {
  getFeaturedProjects,
  getPosts,
  getTopics,
  getProjects,
} from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Developer & Lifelong Learner`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Developer & Lifelong Learner`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Developer & Lifelong Learner`,
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const [featuredProjects, posts, topics, allProjects] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
    getTopics(),
    getProjects(),
  ]);

  const displayedProjects =
    featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3);
  const projectsHeader =
    featuredProjects.length > 0 ? "Featured Projects" : "Recent Projects";

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="font-mono text-xs font-medium tracking-widest text-[var(--accent-blue)] uppercase">
          phfj // portfolio
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          Building human-centered systems with code and curiosity.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-[var(--muted)] sm:text-xl">
          Software developer with an eye for systems and a soft spot for the
          human side of software. I build things that solve, in some way,
          humanity&apos;s problems — and hope to have fun along the way.
        </p>

        {topics.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic._id}
                href={`/topics/${topic.slug.current}`}
                className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]"
              >
                #{topic.name}
              </Link>
            ))}
          </div>
        )}

        <hr className="mt-10 border-[var(--border)]" />
      </section>

      {/* ── Featured / Recent Projects ────────────────────────── */}
      {displayedProjects.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-medium tracking-widest text-[var(--accent-blue)] uppercase">
                Work
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                {projectsHeader}
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* ── Latest Posts ─────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-medium tracking-widest text-[var(--accent-blue)] uppercase">
                Writing
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Latest Posts
              </h2>
            </div>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              All posts →
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {posts.slice(0, 5).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
