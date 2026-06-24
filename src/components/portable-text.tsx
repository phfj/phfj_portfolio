import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import {
  getImageBlurDataUrl,
  getImageDimensions,
  getImageUrl,
} from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getChildrenText(children: unknown): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((c: { text?: string }) => c.text ?? "").join("");
  }
  return "";
}

interface Props {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1
        id={slugify(getChildrenText(children))}
        className="mt-10 mb-4 text-3xl font-bold tracking-tight text-[var(--foreground)]"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={slugify(getChildrenText(children))}
        className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(getChildrenText(children))}
        className="mt-6 mb-2 text-xl font-semibold text-[var(--foreground)]"
      >
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
    image: ({ value }: { value: SanityImage }) => {
      const url = getImageUrl(value);
      const dimensions = getImageDimensions(value);
      if (!url || !dimensions) return null;

      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full rounded-xl border border-[var(--border)]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 800px"
            placeholder={getImageBlurDataUrl(value) ? "blur" : "empty"}
            blurDataURL={getImageBlurDataUrl(value)}
          />
        </figure>
      );
    },
    mainImage: ({ value }: { value: SanityImage }) => {
      const url = getImageUrl(value);
      const dimensions = getImageDimensions(value);
      if (!url || !dimensions) return null;

      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full rounded-xl border border-[var(--border)]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 800px"
            placeholder={getImageBlurDataUrl(value) ? "blur" : "empty"}
            blurDataURL={getImageBlurDataUrl(value)}
          />
        </figure>
      );
    },
    code: ({
      value,
    }: {
      value: { language?: string; code?: string; filename?: string };
    }) => {
      if (!value.code) return null;
      return (
        <figure className="my-6">
          <div className="flex items-center justify-between rounded-t-lg border border-[var(--border)] bg-[var(--muted-bg)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--muted)]">
              {value.language ?? "code"}
            </span>
            {value.filename && (
              <span className="font-mono text-xs text-[var(--muted)]">
                {value.filename}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto rounded-b-lg border-x border-b border-[var(--border)] bg-[var(--background)] p-4">
            <code className="font-mono text-sm leading-relaxed text-[var(--foreground)]">
              {value.code}
            </code>
          </pre>
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
