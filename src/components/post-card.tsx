"use client";

import { memo } from "react";
import Link from "next/link";
import { getReadingTime } from "@/lib/reading-time";
import type { Post } from "@/lib/sanity/types";

interface Props {
  post: Post;
}

export const PostCard = memo(function PostCard({ post }: Props) {
  const readingTime = getReadingTime(post.body);

  return (
    <article
      className="group relative rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      <Link
        href={`/posts/${post.slug.current}`}
        className="absolute inset-0 z-0"
        aria-label={post.title}
      />

      {/* Left accent border — appears on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] rounded-l-xl bg-[var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="relative z-10">
        {/* Metadata row in mono — the barely-there technical signal */}
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)]">
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {readingTime !== null && <span>&middot; {readingTime} min read</span>}
        </div>

        <h3 className="mt-2 text-lg font-semibold transition-colors duration-150 group-hover:text-[var(--accent)]">
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
                className="relative z-10 rounded-md border border-[var(--border)] px-2 py-0.5 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});
