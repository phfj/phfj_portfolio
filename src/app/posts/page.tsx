import { getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, learning, and curiosity.",
};

export default async function PostsPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div>
        <h1>Blog</h1>
        <p>No posts yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <article>
              <h2>{post.title}</h2>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
