interface Props {
  className?: string;
}

export function SectionDivider({ className }: Props) {
  return (
    <div
      className={`mx-auto max-w-5xl px-6 ${className ?? ""}`}
      aria-hidden="true"
    >
      <hr className="h-px border-0 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  );
}
