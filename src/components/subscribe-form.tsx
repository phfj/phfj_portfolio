"use client";

import { useRef, useState, type FormEvent } from "react";
import { BUTTONDOWN_EMBED_ACTION } from "@/lib/constants";

const SUCCESS_MESSAGE = "Check your inbox to confirm your subscription.";
const UNCONFIGURED_MESSAGE =
  "Newsletter signup is not configured yet. Add your Buttondown username to continue.";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const submittedRef = useRef(false);
  const isConfigured = Boolean(BUTTONDOWN_EMBED_ACTION);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!isConfigured) {
      e.preventDefault();
      setMessage(UNCONFIGURED_MESSAGE);
      return;
    }

    if (!email.trim()) {
      e.preventDefault();
      return;
    }

    submittedRef.current = true;
    setIsSubmitting(true);
    setMessage("");
  }

  function handleFrameLoad() {
    if (!submittedRef.current) return;

    submittedRef.current = false;
    setIsSubmitting(false);
    setMessage(SUCCESS_MESSAGE);
    setEmail("");
  }

  return (
    <>
      <form
        action={BUTTONDOWN_EMBED_ACTION || undefined}
        method="post"
        target="buttondown-embed-frame"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input type="hidden" name="embed" value="1" />

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (message) setMessage("");
              }}
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isConfigured}
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-[var(--foreground)]"
          >
            {message}
          </p>
        )}
      </form>

      <iframe
        title="Buttondown subscription response"
        name="buttondown-embed-frame"
        className="hidden"
        onLoad={handleFrameLoad}
      />
    </>
  );
}
