export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phfj.com";

export const SITE_NAME = "Paul Holmes";

export const SITE_DESCRIPTION =
  "Portfolio of software development work and blog - exploring code, curiosity, and self-education.";

const buttondownUsername = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME?.trim();

export const BUTTONDOWN_EMBED_ACTION =
  process.env.NEXT_PUBLIC_BUTTONDOWN_EMBED_ACTION?.trim() ??
  (buttondownUsername
    ? `https://buttondown.com/api/emails/embed-subscribe/${buttondownUsername}`
    : "");
