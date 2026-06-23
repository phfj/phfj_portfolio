import { getTopics, getTopic } from "@/lib/sanity/queries";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const topics = await getTopics();
  if (topics.length === 0) return [{ slug: "__placeholder__" }];
  return topics.map((topic) => ({ slug: topic.slug.current }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) return { title: "Topic not found" };
  return { title: topic.name };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {topic.name}
      </h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        All projects and posts tagged with {topic.name}.
      </p>
      <hr className="mt-8 h-px border-0 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  );
}
