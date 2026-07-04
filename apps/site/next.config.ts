import createMDX from "@next/mdx";
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../../"),
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  typedRoutes: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["@jamieburkart/content", "@jamieburkart/design-tokens"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
