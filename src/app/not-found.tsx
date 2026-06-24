import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-28 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-[var(--muted)]">
        404
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Go home
        </Link>
        <Link
          href="/posts"
          className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)]"
        >
          Browse posts
        </Link>
      </div>
    </div>
  );
}
