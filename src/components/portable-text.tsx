import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity/image";

interface Props {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-[var(--foreground)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-5 mb-2 text-lg font-semibold text-[var(--foreground)]">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-2 leading-relaxed text-[var(--muted)]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[var(--accent)] bg-[var(--muted-bg)] px-6 py-4 text-[var(--muted)] italic">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      const url = getImageUrl(value, 1200);
      if (!url) return null;
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="w-full rounded-xl border border-[var(--border)]"
          />
        </figure>
      );
    },
    mainImage: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      const url = getImageUrl(value, 1200);
      if (!url) return null;
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="w-full rounded-xl border border-[var(--border)]"
          />
        </figure>
      );
    },
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--foreground)]">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[var(--muted-bg)] px-1.5 py-0.5 font-mono text-sm text-[var(--accent)]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noopener noreferrer"
        : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          target={rel ? "_blank" : undefined}
          className="font-medium text-[var(--accent)] underline underline-offset-2 transition-colors hover:text-[var(--accent-hover)]"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-[var(--muted)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-[var(--muted)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
};

export function PortableText({ value }: Props) {
  return <PortableTextRenderer value={value} components={components} />;
}
