import { getFeaturedProjects, getPosts } from "@/lib/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "Paul Holmes — Developer & Lifelong Learner",
  description:
    "Portfolio of software development work and blog — exploring code, curiosity, and self-education.",
};

export default async function HomePage() {
  const [featuredProjects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
  ]);

  return (
    <div>
      <section>
        <h1>Paul Holmes</h1>
        <p>
          Software developer, lifelong learner, and advocate for curiosity in
          tech. This is my work, my writing, and my journey.
        </p>
        <div>
          <Link href="/projects">View Projects</Link>
          <Link href="/posts">Read Blog</Link>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <h2>Featured Projects</h2>
          <div>
            {featuredProjects.slice(0, 6).map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
              >
                <article>
                  <h3>{project.title}</h3>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2>Latest Posts</h2>
          <div>
            {posts.slice(0, 5).map((post) => (
              <Link key={post._id} href={`/posts/${post.slug.current}`}>
                <article>
                  <h3>{post.title}</h3>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2>Stay Curious</h2>
        <p>Get notified when I publish new posts or ship new projects.</p>
        <SubscribeForm />
      </section>
    </div>
  );
}
