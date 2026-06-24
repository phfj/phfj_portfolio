import { describe, it, expect } from "vitest";
import {
  buildImageUrl,
  getImageBlurDataUrl,
  getImageDimensions,
  getImageUrl,
  getScaledImageDimensions,
} from "@/lib/sanity/image";

describe("sanity image helpers", () => {
  it("returns null for null or undefined sources", () => {
    expect(getImageUrl(null)).toBeNull();
    expect(getImageUrl(undefined)).toBeNull();
    expect(getImageDimensions(null)).toBeNull();
    expect(getImageDimensions(undefined)).toBeNull();
  });

  it("returns null for a source without a usable asset reference", () => {
    expect(getImageUrl({ asset: { _ref: "" } })).toBeNull();
    expect(getImageDimensions({ asset: { _ref: "" } })).toBeNull();
  });

  it("prefers the asset url when Sanity metadata is available", () => {
    const source = {
      asset: {
        _ref: "image-abc123-1200x800-jpg",
        url: "https://cdn.sanity.io/images/test-project/test-dataset/abc123-1200x800.jpg",
        metadata: {
          lqip: "data:image/jpeg;base64,abc",
          dimensions: {
            width: 1200,
            height: 800,
            aspectRatio: 1.5,
          },
        },
      },
    };

    expect(getImageUrl(source)).toBe(source.asset.url);
    expect(getImageDimensions(source)).toEqual(
      source.asset.metadata.dimensions,
    );
    expect(getImageBlurDataUrl(source)).toBe(source.asset.metadata.lqip);
  });

  it("falls back to parsing dimensions from the asset ref", () => {
    const source = {
      asset: { _ref: "image-abc123-1200x800-jpg" },
    };

    expect(getImageUrl(source)).toContain("abc123-1200x800.jpg");
    expect(getImageDimensions(source)).toEqual({
      width: 1200,
      height: 800,
      aspectRatio: 1.5,
    });
  });

  it("builds transformed image urls and scales dimensions without changing aspect ratio", () => {
    const source = {
      asset: {
        url: "https://cdn.sanity.io/images/test-project/test-dataset/abc123-1200x800.jpg",
        metadata: {
          dimensions: {
            width: 1200,
            height: 800,
            aspectRatio: 1.5,
          },
        },
      },
    };

    expect(
      buildImageUrl(source, { width: 600, auto: "format", fit: "max" }),
    ).toBe(
      "https://cdn.sanity.io/images/test-project/test-dataset/abc123-1200x800.jpg?w=600&fit=max&auto=format",
    );

    expect(getScaledImageDimensions(source, 600)).toEqual({
      width: 600,
      height: 400,
      aspectRatio: 1.5,
    });
  });
});
