"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  track?: boolean;
}

export function ViewCounter({ slug, track = false }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchViews() {
      const storageKey = `dev:views:${slug}`;

      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: track ? "POST" : "GET",
        });

        if (!response.ok) {
          if (process.env.NODE_ENV === "development") {
            const stored = localStorage.getItem(storageKey);
            const current = stored ? parseInt(stored, 10) : 0;
            const nextViews = track
              ? (isNaN(current) ? 0 : current) + 1
              : current;
            localStorage.setItem(storageKey, nextViews.toString());
            if (active) setViews(nextViews);
            return;
          }
          throw new Error("Failed to fetch views");
        }

        const data = (await response.json()) as { views?: number };
        if (active && typeof data.views === "number") {
          setViews(data.views);
        }
      } catch {
        if (process.env.NODE_ENV === "development") {
          // Fallback to localStorage simulation on network error in dev
          const stored = localStorage.getItem(storageKey);
          const current = stored ? parseInt(stored, 10) : 0;
          const nextViews = track
            ? (isNaN(current) ? 0 : current) + 1
            : current;
          localStorage.setItem(storageKey, nextViews.toString());
          if (active) setViews(nextViews);
        } else {
          // Fail completely silently in production (e.g. if blocked by adblockers)
          // to keep console clean.
        }
      }
    }

    void fetchViews();

    return () => {
      active = false;
    };
  }, [slug, track]);

  if (views === null) {
    return null;
  }

  return (
    <span className="animate-fade-in font-mono">
      &middot; {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
