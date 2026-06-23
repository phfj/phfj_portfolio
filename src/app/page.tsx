import { getFeaturedProjects, getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "Paul Holmes — Developer & Lifelong Learner",
  description:
    "Portfolio of software development work and blog — exploring code, curiosity, and self-education.",
};

export default async function HomePage() {
  const [featuredProjects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Paul Holmes
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
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
      </section>

      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight">
            Featured Projects
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 6).map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)]"
              >
                <article>
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
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Posts
            </h2>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-6">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug.current}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)]"
              >
                <article>
                  <time className="text-xs text-[var(--muted)]">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                      {post.summary}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pb-32">
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
