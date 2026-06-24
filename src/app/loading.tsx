export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28">
      <div className="animate-pulse">
        <div className="mb-4 h-16 w-3/4 rounded-lg bg-[var(--muted-bg)]" />
        <div className="mb-4 h-6 w-2/3 rounded bg-[var(--muted-bg)]" />
        <div className="flex gap-4">
          <div className="h-10 w-32 rounded-lg bg-[var(--muted-bg)]" />
          <div className="h-10 w-28 rounded-lg bg-[var(--muted-bg)]" />
        </div>
      </div>
    </div>
  );
}
