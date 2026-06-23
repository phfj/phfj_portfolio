import { getPosts, getPost, getRelatedPosts } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { PortableText } from "@/components/portable-text";
import { PostCard } from "@/components/post-card";
import { getReadingTime } from "@/lib/reading-time";
import { getImageUrl } from "@/lib/sanity/image";

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

  const readingTime = getReadingTime(post.body);
  const topicIds = post.topics?.map((t) => t._id) ?? [];
  const relatedPosts = await getRelatedPosts(slug, topicIds);
  const coverUrl = getImageUrl(post.coverImage, 1200);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        &larr; Blog
      </Link>

      <article className="mt-8">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={post.title}
            width={1200}
            height={675}
            className="mb-8 w-full rounded-xl border border-[var(--border)]"
            priority
          />
        )}

        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {readingTime !== null && <span>&middot; {readingTime} min read</span>}
        </div>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>

        {post.topics && post.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.topics.map((topic) => (
              <Link
                key={topic._id}
                href={`/topics/${topic.slug.current}`}
                className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}

        {post.summary && (
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            {post.summary}
          </p>
        )}

        {post.body && post.body.length > 0 && (
          <div className="mt-8">
            <PortableText value={post.body} />
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <hr className="mb-10 border-[var(--border)]" />
          <h2 className="text-xl font-semibold tracking-tight">
            More from this topic
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {relatedPosts.map((related) => (
              <PostCard key={related._id} post={related} />
            ))}
          </div>
        </section>
      )}

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
