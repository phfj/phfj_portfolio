import { SubscribeForm } from "./subscribe-form";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted-bg)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Stay Curious
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              Get new posts and project updates by email.
            </p>
          </div>
          <div>
            <SubscribeForm />
          </div>
        </div>
        <p className="mt-16 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Paul Holmes
        </p>
      </div>
    </footer>
  );
}

/**test */

/**test */

/**test */

/**test */

/**test */

/**test */
