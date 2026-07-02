interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function sanityImageLoader({
  src,
  width,
  quality,
}: LoaderProps): string {
  if (src.startsWith("/") || !src.startsWith("http")) {
    return src;
  }

  try {
    const url = new URL(src);

    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", `${width}`);

    if (quality) {
      url.searchParams.set("q", `${quality}`);
    }

    return url.toString();
  } catch (error) {
    console.error("Failed to parse image URL in sanityImageLoader:", error);
    return src;
  }
}
