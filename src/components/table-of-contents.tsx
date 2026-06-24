"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import type { PortableTextBlock } from "@portabletext/react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(
  blocks: PortableTextBlock[],
): { text: string; id: string; level: number }[] {
  const headingTypes = new Set(["h1", "h2", "h3"]);
  return blocks
    .filter(
      (block) => block._type === "block" && headingTypes.has(block.style ?? ""),
    )
    .map((block) => {
      const text =
        block.children
          ?.filter((c) => c._type === "span")
          .map((c) => c.text)
          .join("") ?? "";
      return {
        text,
        id: slugify(text),
        level: Number.parseInt((block.style ?? "h2").slice(1)),
      };
    })
    .filter((h) => h.text.length > 0);
}

interface Props {
  body?: PortableTextBlock[];
}

export function TableOfContents({ body }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = useMemo(() => (body ? extractHeadings(body) : []), [body]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
        On this page
      </p>
      <ul className="mt-3 space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-[var(--foreground)] ${
                h.level === 3 ? "pl-3" : ""
              } ${
                activeId === h.id
                  ? "font-medium text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function getHeadingId(
  blocks: PortableTextBlock[] | undefined,
): Map<string, string> {
  const map = new Map<string, string>();
  if (!blocks) return map;
  const headings = extractHeadings(blocks);
  for (const h of headings) {
    map.set(h.text, h.id);
  }
  return map;
}
