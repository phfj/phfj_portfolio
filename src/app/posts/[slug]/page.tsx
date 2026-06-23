import { getPosts, getPost } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPosts();
  if (posts.length === 0) return [{ slug: "__placeholder__" }];
  return posts.map((post) => ({ slug: post.slug.current }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        &larr; Blog
      </Link>

      <article className="mt-8">
        <time className="text-sm text-[var(--muted)]">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>

        {post.summary && (
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            {post.summary}
          </p>
        )}
      </article>

      <hr className="my-12 border-[var(--border)]" />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] p-8">
        <h2 className="text-center text-xl font-semibold">Enjoy this post?</h2>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">
          Get the next one in your inbox.
        </p>
        <div className="mx-auto mt-6 max-w-sm">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
