import Link from "next/link";
import type { Post } from "@/lib/sanity/types";
import { getReadingTime } from "@/lib/reading-time";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const readingTime = getReadingTime(post.body);

  return (
    <article className="group relative rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md">
      <Link
        href={`/posts/${post.slug.current}`}
        className="absolute inset-0 z-0"
        aria-label={post.title}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {readingTime !== null && <span>&middot; {readingTime} min read</span>}
        </div>

        <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
          {post.title}
        </h3>

        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {post.summary}
          </p>
        )}

        {post.topics && post.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.topics.map((topic) => (
              <Link
                key={topic._id}
                href={`/topics/${topic.slug.current}`}
                className="relative z-10 rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
