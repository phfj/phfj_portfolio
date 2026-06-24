import { getFeaturedProjects, getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { PostCard } from "@/components/post-card";
import { SectionDivider } from "@/components/section-divider";
import { ProjectCard } from "@/components/project-card";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { getGitHubRepos } from "@/lib/github";

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
  const [featuredProjects, posts, githubRepos] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
    getGitHubRepos(),
  ]);

  return (
    <div>
      <section className="bg-gradient-to-b from-[var(--accent)]/5 to-transparent">
        <div className="mx-auto max-w-5xl px-6 py-28 md:py-40">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Paul Holmes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            Software developer, lifelong learner, and advocate for curiosity in
            tech. This is my work, my writing, and my journey.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              View Projects
            </Link>
            <Link
              href="/posts"
              className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)]"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {featuredProjects.length > 0 && (
        <>
          <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>

          <SectionDivider />
        </>
      )}

      {posts.length > 0 && (
        <>
          <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Latest Posts
              </h2>
              <Link
                href="/posts"
                className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                View all
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              {posts.slice(0, 5).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>

          <SectionDivider />
        </>
      )}

      {githubRepos.length > 0 && (
        <>
          <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Recent on GitHub
              </h2>
              <a
                href="https://github.com/phfj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                View profile
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {githubRepos.map((repo) => (
                <a
                  key={repo.full_name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md"
                >
                  <h3 className="font-mono text-sm font-semibold transition-colors group-hover:text-[var(--accent)]">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted)]">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 10-1.5 0v.878a2.25 2.25 0 10-1.5 0z" />
                      </svg>
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <SectionDivider />
        </>
      )}

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] p-10 md:p-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Stay Curious
          </h2>
          <p className="mt-3 text-center text-[var(--muted)]">
            Get notified when I publish new posts or ship new projects.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </div>
  );
}
