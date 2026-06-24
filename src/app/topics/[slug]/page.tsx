import {
  getTopics,
  getTopic,
  getPostsByTopic,
  getProjectsByTopic,
} from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { SectionDivider } from "@/components/section-divider";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";

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

  const title = topic.name;
  const description = `All projects and posts tagged with ${title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/topics/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/topics/${slug}`,
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) return null;

  const [posts, projects] = await Promise.all([
    getPostsByTopic(topic._id),
    getProjectsByTopic(topic._id),
  ]);

  const hasContent = posts.length > 0 || projects.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {topic.name}
      </h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        All projects and posts tagged with {topic.name}.
      </p>
      <SectionDivider className="mt-8" />

      {!hasContent && (
        <p className="mt-12 text-center text-lg text-[var(--muted)]">
          No posts or projects yet for this topic.
        </p>
      )}

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Posts</h2>
          <div className="mt-6 flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
