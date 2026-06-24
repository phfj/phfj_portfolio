import type { SanityImage } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

function getAssetBaseUrl(
  source: SanityImage | null | undefined,
): string | null {
  if (source?.asset?.url) return source.asset.url;
  if (!source?.asset?._ref || !projectId || !dataset) return null;

  const parts = source.asset._ref.split("-");
  if (parts.length < 4) return null;
  const id = parts[1];
  const ext = parts[parts.length - 1];
  const dims = parts[2];

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${ext}`;
}

function parseDimensionsFromRef(ref: string): ImageDimensions | null {
  const parts = ref.split("-");
  if (parts.length < 4) return null;

  const [widthValue, heightValue] = parts[2].split("x");
  const width = Number.parseInt(widthValue, 10);
  const height = Number.parseInt(heightValue, 10);
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  };
}

export function getImageUrl(
  source: SanityImage | null | undefined,
): string | null {
  return getAssetBaseUrl(source);
}

export function getImageDimensions(
  source: SanityImage | null | undefined,
): ImageDimensions | null {
  const dimensions = source?.asset?.metadata?.dimensions;
  if (dimensions?.width && dimensions?.height) {
    return dimensions;
  }

  if (source?.asset?._ref) {
    return parseDimensionsFromRef(source.asset._ref);
  }

  return null;
}

export function getScaledImageDimensions(
  source: SanityImage | null | undefined,
  width: number,
): ImageDimensions | null {
  const dimensions = getImageDimensions(source);
  if (!dimensions) return null;

  const ratio = width / dimensions.width;
  return {
    width,
    height: Math.round(dimensions.height * ratio),
    aspectRatio: width / Math.round(dimensions.height * ratio),
  };
}

export function getImageBlurDataUrl(
  source: SanityImage | null | undefined,
): string | undefined {
  return source?.asset?.metadata?.lqip;
}

export function buildImageUrl(
  source: SanityImage | null | undefined,
  options?: {
    width?: number;
    quality?: number;
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
    auto?: "format";
  },
): string | null {
  const baseUrl = getAssetBaseUrl(source);
  if (!baseUrl) return null;

  const url = new URL(baseUrl);
  if (options?.width) {
    url.searchParams.set("w", `${options.width}`);
  }
  if (options?.quality) {
    url.searchParams.set("q", `${options.quality}`);
  }
  if (options?.fit) {
    url.searchParams.set("fit", options.fit);
  }
  if (options?.auto) {
    url.searchParams.set("auto", options.auto);
  }

  return url.toString();
}
