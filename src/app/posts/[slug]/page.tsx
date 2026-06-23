import { getPosts, getPost } from "@/lib/sanity/queries";
import type { Metadata } from "next";

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
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}
