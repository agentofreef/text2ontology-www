import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages. Removes SSR / server-side rendering;
  // every route compiles to a static .html. If we later need API routes or
  // dynamic rendering, drop this line and switch to Cloudflare Pages Functions
  // or a separate origin.
  output: "export",
  // Static export refuses dynamic image optimization. Use the unoptimized
  // fallback so <Image> renders the raw asset.
  images: { unoptimized: true },
  // Trailing slash on every route — Cloudflare Pages serves /docs/index.html
  // for /docs/ requests, and this normalizes URL shape across the build.
  trailingSlash: true,
};

export default nextConfig;
