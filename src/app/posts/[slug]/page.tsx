import { getPosts, getPost, getRelatedPosts } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { PortableText } from "@/components/portable-text";
import { PostCard } from "@/components/post-card";
import { getReadingTime } from "@/lib/reading-time";
import {
  buildImageUrl,
  getImageBlurDataUrl,
  getImageDimensions,
  getImageUrl,
  getScaledImageDimensions,
} from "@/lib/sanity/image";
import { SITE_URL } from "@/lib/constants";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { ViewCounter } from "@/components/view-counter";

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

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.summary ?? undefined;
  const socialImageSource = post.seo?.socialImage ?? post.coverImage;
  const ogImage = buildImageUrl(socialImageSource, {
    width: 1200,
    fit: "max",
    auto: "format",
  });
  const ogDimensions = getScaledImageDimensions(socialImageSource, 1200);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `${SITE_URL}/posts/${slug}`,
      ...(ogImage &&
        ogDimensions && {
          images: [
            {
              url: ogImage,
              width: ogDimensions.width,
              height: ogDimensions.height,
            },
          ],
        }),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: `${SITE_URL}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return null;

  const readingTime = getReadingTime(post.body);
  const topicIds = post.topics?.map((t) => t._id) ?? [];
  const relatedPosts = await getRelatedPosts(slug, topicIds);
  const coverUrl = getImageUrl(post.coverImage);
  const coverDimensions = getImageDimensions(post.coverImage);
  const coverBlurDataUrl = getImageBlurDataUrl(post.coverImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary ?? undefined,
    image: coverUrl ?? undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: "Paul Holmes",
      url: SITE_URL,
    },
    url: `${SITE_URL}/posts/${slug}`,
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex gap-12">
        <div className="min-w-0 flex-1">
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
                width={coverDimensions?.width ?? 1200}
                height={coverDimensions?.height ?? 675}
                className="mb-8 w-full rounded-xl border border-[var(--border)]"
                preload
                sizes="(max-width: 768px) 100vw, 800px"
                placeholder={coverBlurDataUrl ? "blur" : "empty"}
                blurDataURL={coverBlurDataUrl}
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
              {readingTime !== null && (
                <span>&middot; {readingTime} min read</span>
              )}
              <ViewCounter slug={slug} track={true} />
            </div>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {post.title}
            </h1>

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
              <p className="mt-5 border-l-2 border-[var(--border)] pl-4 font-serif text-xl leading-[1.8] text-[var(--muted)] italic">
                {post.summary}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <ShareButtons url={jsonLd.url} title={post.title} />
            </div>

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
            <h2 className="text-center text-xl font-semibold">
              Enjoy this post?
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--muted)]">
              Get the next one in your inbox.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <SubscribeForm />
            </div>
          </div>
        </div>

        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-24">
            <TableOfContents body={post.body} />
          </div>
        </aside>
      </div>
    </div>
  );
}
