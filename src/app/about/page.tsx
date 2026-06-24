import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { SectionDivider } from "@/components/section-divider";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";

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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col items-start gap-8 sm:flex-row">
        <div className="shrink-0">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-[var(--accent)] text-4xl font-bold text-white">
            PH
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
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              View my work
            </Link>
            <a
              href="#contact"
              className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)]"
            >
              Get in touch
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
              className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 text-sm text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <SectionDivider className="my-12" />

      <section className="flex flex-wrap items-center gap-6">
        <a
          href="https://github.com/phfj"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/paul-holmes-10a98424a/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        <a
          href="mailto:pauladrianoholmes@gmail.com"
          className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <EmailIcon />
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
