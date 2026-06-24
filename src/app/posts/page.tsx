import { getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SectionDivider } from "@/components/section-divider";
import { PaginatedSection } from "@/components/paginator";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, learning, and curiosity.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, learning, and curiosity.",
    url: `${SITE_URL}/posts`,
  },
  twitter: {
    card: "summary",
    title: "Blog",
    description: "Thoughts on software development, learning, and curiosity.",
  },
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
    <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        Thoughts on software development, learning, and curiosity.{" "}
        <Link
          href="/feed.xml"
          className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
        >
          RSS feed
        </Link>
      </p>
      <SectionDivider className="mt-8 mb-10" />
      <PaginatedSection
        emptyMessage="No posts yet."
        containerClassName="flex flex-col gap-8"
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </PaginatedSection>
    </div>
  );
}
