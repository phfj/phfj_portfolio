"use client";

import { useState, useCallback, useEffect } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setToast({
        text: "Link copied to clipboard!",
        id: Date.now(),
      });
    }
  }, [url, copyToClipboard]);

  const handleInstagramShare = useCallback(async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setToast({
        text: "Link copied! Share it on your Instagram story, bio, or post.",
        id: Date.now(),
      });
    }
  }, [url, copyToClipboard]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
          Share:
        </span>

        {/* X (Twitter) */}
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition-all hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
          aria-label="Share on X"
        >
          <XIcon className="h-4 w-4" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition-all hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition-all hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>

        {/* Instagram */}
        <button
          onClick={handleInstagramShare}
          className="cursor-pointer rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition-all hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
          aria-label="Share on Instagram"
        >
          <InstagramIcon className="h-4 w-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="cursor-pointer rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition-all hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
          aria-label="Copy link"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>

      {toast && (
        <div
          key={toast.id}
          className="animate-toast fixed bottom-6 left-1/2 z-50 flex max-w-[90vw] items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-5 py-2.5 shadow-[var(--shadow-card-hover)] transition-all duration-300 md:max-w-md"
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              className="h-3 w-3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-wide text-[var(--foreground)]">
            {toast.text}
          </span>
        </div>
      )}
    </div>
  );
}
