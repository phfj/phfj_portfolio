"use client";

import { useState, type ReactNode } from "react";

const PER_PAGE = 9;

function Paginator({
  totalItems,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / PER_PAGE);

  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-sm text-[var(--muted)]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              page === currentPage
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] hover:bg-[var(--muted-bg)]"
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--muted-bg)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

interface Props {
  children: ReactNode[];
  emptyMessage?: string;
  containerClassName?: string;
}

export function PaginatedSection({
  children,
  emptyMessage = "No items yet.",
  containerClassName = "grid gap-6",
}: Props) {
  const [page, setPage] = useState(1);
  const totalItems = Array.isArray(children) ? children.length : 0;
  const start = (page - 1) * PER_PAGE;
  const pageItems = Array.isArray(children)
    ? children.slice(start, start + PER_PAGE)
    : [];

  if (totalItems === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-[var(--muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className={containerClassName}>{pageItems}</div>
      <Paginator
        totalItems={totalItems}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );
}
