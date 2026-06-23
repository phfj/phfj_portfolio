import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/posts", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Paul Holmes</Link>
        <ul>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
