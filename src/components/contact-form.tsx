"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");
    setResponse("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setStatus("success");
        setResponse(data.message ?? "Thanks for reaching out!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setResponse(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setResponse("Network error. Please email me directly.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none disabled:opacity-50";

  const disabled = status === "loading" || status === "success";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="_hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]"
        >
          Name <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]"
        >
          Email <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder="What's this about?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-[var(--foreground)]"
        >
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={`Tell me about your project, idea, or opportunity...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          disabled={disabled}
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {response && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === "error" ? "text-red-500" : "text-[var(--foreground)]"}`}
        >
          {response}
        </p>
      )}
    </form>
  );
}
