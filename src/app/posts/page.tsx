import { getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, learning, and curiosity.",
};

export default async function PostsPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        Thoughts on software development, learning, and curiosity.{" "}
        <Link href="/feed.xml" className="text-[var(--accent)] hover:underline">
          RSS feed
        </Link>
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/posts/${post.slug.current}`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)]"
          >
            <article>
              <time className="text-sm text-[var(--muted)]">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              {post.summary && (
                <p className="mt-2 line-clamp-2 leading-relaxed text-[var(--muted)]">
                  {post.summary}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
