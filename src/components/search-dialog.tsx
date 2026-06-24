"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { SearchItem } from "@/lib/search-data";

interface Props {
  items: SearchItem[];
}

export function SearchDialog({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "summary", "topics"],
        threshold: 0.4,
        includeScore: true,
      }),
    [items],
  );

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return fuse
      .search(query)
      .slice(0, 8)
      .map((r) => r.item);
  }, [query, fuse]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative z-50 mx-4 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl">
            <div className="flex items-center border-b border-[var(--border)] px-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-[var(--muted)]"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts and projects..."
                className="flex-1 bg-transparent px-3 py-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
              />
              <button
                onClick={close}
                className="rounded-lg p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
                aria-label="Close search"
              >
                <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted)]">
                  Esc
                </kbd>
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {query.length > 0 && query.length < 2 && (
                <p className="px-4 py-8 text-center text-sm text-[var(--muted)]">
                  Type at least 2 characters to search.
                </p>
              )}
              {query.length >= 2 && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-[var(--muted)]">
                  No results for &quot;{query}&quot;.
                </p>
              )}
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.type}s/${item.slug}`}
                  onClick={close}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[var(--muted-bg)]"
                >
                  <span className="mt-0.5 shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted)]">
                    {item.type === "post" ? "Post" : "Project"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--foreground)]">
                      {item.title}
                    </p>
                    {item.summary && (
                      <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
