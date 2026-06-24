import { SubscribeForm } from "./subscribe-form";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "./icons";

const socialLinks = [
  {
    href: "https://github.com/phfj",
    label: "GitHub",
    icon: <GitHubIcon />,
  },
  {
    href: "https://www.linkedin.com/in/paul-holmes-10a98424a/",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
  },
  {
    href: "mailto:pauladrianoholmes@gmail.com",
    label: "Email",
    icon: <EmailIcon />,
  },
];

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

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-[var(--border)] pt-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-sm text-[var(--muted)]">
            &copy; {new Date().getFullYear()} Paul Holmes
          </p>
        </div>
      </div>
    </footer>
  );
}
