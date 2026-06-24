export default function PostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="animate-pulse">
        <div className="mb-2 h-4 w-16 rounded bg-[var(--muted-bg)]" />
        <div className="mb-8 aspect-video w-full rounded-xl bg-[var(--muted-bg)]" />
        <div className="mb-2 h-4 w-48 rounded bg-[var(--muted-bg)]" />
        <div className="mb-6 h-10 w-3/4 rounded bg-[var(--muted-bg)]" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-3 flex gap-3">
            <div className="h-4 w-full rounded bg-[var(--muted-bg)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--muted-bg)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
