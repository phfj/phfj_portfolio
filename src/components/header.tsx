"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";
import type { SearchItem } from "@/lib/search-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/posts", label: "Blog" },
  { href: "/about", label: "About" },
];

interface Props {
  searchItems: SearchItem[];
}

export function Header({ searchItems }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const desktopLinkClass = (href: string) =>
    [
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300",
      isActive(href)
        ? "text-[var(--foreground)] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-[var(--accent)] after:transition-all after:duration-300"
        : "text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]",
    ].join(" ");

  const mobileLinkClass = (href: string) =>
    [
      "block rounded-lg px-3 py-3 text-base font-medium transition-colors duration-200",
      isActive(href)
        ? "bg-[var(--muted-bg)] text-[var(--foreground)] border-l-2 border-[var(--accent)]"
        : "text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)] border-l-2 border-transparent",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--background)]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={close}
          className="font-mono text-lg font-bold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          &lt;phfj/&gt;
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={desktopLinkClass(href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <SearchDialog items={searchItems} />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1 rounded-lg p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 rounded bg-[var(--foreground)] transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 rounded bg-[var(--foreground)] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 rounded bg-[var(--foreground)] transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[57px] z-40 bg-black/20 md:hidden"
            onClick={close}
          />
          <ul className="absolute top-full right-0 left-0 z-40 border-b border-[var(--border)] bg-[var(--background)] px-6 pt-2 pb-4 md:hidden">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className={mobileLinkClass(href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </header>
  );
}
