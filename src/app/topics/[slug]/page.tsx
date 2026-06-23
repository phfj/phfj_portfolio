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
    <div>
      <h1>{topic.name}</h1>
    </div>
  );
}
