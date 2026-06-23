import { toPlainText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const WORDS_PER_MINUTE = 200;

export function getReadingTime(body?: PortableTextBlock[]): number | null {
  if (!body || body.length === 0) return null;
  const text = toPlainText(body);
  const words = text.trim().split(/\s+/).length;
  if (words === 0) return null;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
