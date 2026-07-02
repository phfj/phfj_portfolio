import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { SectionDivider } from "@/components/section-divider";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { CareerTimeline } from "@/components/career-timeline";
import { getProjectsAsTimelineEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paul Holmes — software developer, lifelong learner, and advocate for self-education and curiosity in tech.",
  openGraph: {
    title: "About",
    description:
      "Paul Holmes — software developer, lifelong learner, and advocate for self-education and curiosity in tech.",
    url: `${SITE_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About",
    description:
      "Paul Holmes — software developer, lifelong learner, and advocate for self-education and curiosity in tech.",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Holmes",
  url: SITE_URL,
  jobTitle: "Software Developer",
  sameAs: [
    "https://github.com/phfj",
    "https://www.linkedin.com/in/paul-holmes-10a98424a/",
  ],
};

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Sanity CMS",
  "Cloudflare Workers",
  "Git",
  "REST APIs",
  "GROQ",
];

export default async function AboutPage() {
  const timelineEvents = await getProjectsAsTimelineEvents();
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden px-6 py-24 md:py-28">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-10 left-10 -z-10 h-72 w-72 rounded-full bg-[var(--accent)]/10 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-72 w-72 rounded-full bg-[var(--accent-blue)]/5 opacity-40 blur-3xl" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10 flex flex-col items-start gap-8 sm:flex-row">
        <div className="shrink-0">
          <div className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--muted-bg)] to-[var(--background)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card-hover)]">
            {/* Soft inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="font-mono text-2xl font-bold text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--foreground)]">
              &lt;phfj/&gt;
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m Paul
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-[var(--muted)]">
            A software developer passionate about building things, sharing what
            I learn, and sparking curiosity in others.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent)]/10 hover:shadow-lg"
            >
              View my work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="#contact"
              className="group flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-[var(--muted)]/30 hover:bg-[var(--muted-bg)]"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      <SectionDivider className="my-12" />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">What I do</h2>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          I build web applications and tools, write about software development,
          and contribute to open source. This site is my portfolio of work and
          my blog — a place to document my journey, explore ideas, and hopefully
          inspire others to teach themselves and stay curious.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          I believe the best developers are self-taught, endlessly curious, and
          generous with their knowledge. That&apos;s what this site is about.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Tech I work with
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 text-sm text-[var(--muted)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--background)] hover:text-[var(--foreground)] hover:shadow-[var(--shadow-card)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <SectionDivider className="my-12" />

      <CareerTimeline initialEvents={timelineEvents} />

      <SectionDivider className="my-12" />

      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/50 p-4 shadow-sm">
        <span className="mr-2 text-sm font-medium text-[var(--muted)]">
          Find me on:
        </span>
        <a
          href="https://github.com/phfj"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          <GitHubIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/paul-holmes-10a98424a/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          <LinkedInIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          LinkedIn
        </a>
        <a
          href="mailto:pauladrianoholmes@gmail.com"
          className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          <EmailIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          Email
        </a>
      </section>

      <div
        id="contact"
        className="mt-20 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] p-8 md:p-10"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-2 text-[var(--muted)]">
          Have a question, project idea, or just want to chat? Send me a
          message.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
