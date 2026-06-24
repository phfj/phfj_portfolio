import { describe, it, expect } from "vitest";
import { getImageUrl } from "@/lib/sanity/image";

describe("getImageUrl", () => {
  it("returns null for null source", () => {
    expect(getImageUrl(null)).toBeNull();
  });

  it("returns null for undefined source", () => {
    expect(getImageUrl(undefined)).toBeNull();
  });

  it("returns null for source without asset ref", () => {
    expect(getImageUrl({ asset: { _ref: "" } })).toBeNull();
  });

  it("returns a CDN URL for a valid ref", () => {
    const url = getImageUrl({
      asset: { _ref: "image-abc123-1200x800-jpg" },
    });
    expect(url).toContain("cdn.sanity.io");
    expect(url).toContain("test-project");
    expect(url).toContain("test-dataset");
    expect(url).toContain("abc123-1200x800.jpg");
  });

  it("applies width parameter", () => {
    const url = getImageUrl(
      { asset: { _ref: "image-abc123-1200x800-jpg" } },
      600,
    );
    expect(url).toContain("abc123-600x400.jpg");
  });
});
