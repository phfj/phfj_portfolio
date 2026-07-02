import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: "export" }),
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanity/image-loader.ts",
  },
  ...(isDev
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://127.0.0.1:8788/api/:path*",
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
