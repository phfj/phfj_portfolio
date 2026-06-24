import { describe, it, expect } from "vitest";
import { getReadingTime } from "@/lib/reading-time";
import type { PortableTextBlock } from "@portabletext/react";

function mockBody(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text, marks: [] }],
      markDefs: [],
    },
  ];
}

describe("getReadingTime", () => {
  it("returns null for undefined body", () => {
    expect(getReadingTime(undefined)).toBeNull();
  });

  it("returns null for empty body array", () => {
    expect(getReadingTime([])).toBeNull();
  });

  it("returns 1 min for whitespace-only body", () => {
    expect(getReadingTime(mockBody("   "))).toBe(1);
  });

  it("returns 1 min for body under 200 words", () => {
    const text = "word ".repeat(100).trim();
    expect(getReadingTime(mockBody(text))).toBe(1);
  });

  it("returns correct reading time for known-length content", () => {
    const text = "word ".repeat(400).trim();
    expect(getReadingTime(mockBody(text))).toBe(2);
  });

  it("returns at least 1 min for any non-empty body", () => {
    expect(getReadingTime(mockBody("hello"))).toBe(1);
  });
});
