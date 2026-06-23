import { SubscribeForm } from "./subscribe-form";

export function Footer() {
  return (
    <footer>
      <div>
        <h3>Stay Curious</h3>
        <p>Get new posts and project updates by email.</p>
        <SubscribeForm />
      </div>
      <p>&copy; {new Date().getFullYear()} Paul Holmes</p>
    </footer>
  );
}
