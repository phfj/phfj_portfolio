export default function PostsLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="animate-pulse">
        <div className="mb-4 h-10 w-32 rounded bg-[var(--muted-bg)]" />
        <div className="mb-12 h-6 w-96 rounded bg-[var(--muted-bg)]" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6"
          >
            <div className="mb-2 h-4 w-24 rounded bg-[var(--border)]" />
            <div className="mb-2 h-6 w-3/4 rounded bg-[var(--border)]" />
            <div className="h-4 w-full rounded bg-[var(--border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
