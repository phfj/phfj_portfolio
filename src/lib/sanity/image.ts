interface SanityImageSource {
  asset: { _ref: string };
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width?: number,
): string | null {
  if (!source?.asset?._ref || !projectId || !dataset) return null;

  const parts = source.asset._ref.split("-");
  if (parts.length < 4) return null;

  const id = parts[1];
  const ext = parts[parts.length - 1];
  const dims = parts[2];

  let finalDims = dims;
  if (width) {
    const [w, h] = dims.split("x");
    const ratio = width / Number.parseInt(w, 10);
    finalDims = `${width}x${Math.round(Number.parseInt(h, 10) * ratio)}`;
  }

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${finalDims}.${ext}`;
}
