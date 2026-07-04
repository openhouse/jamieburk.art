import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import path from "node:path";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: false,
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default withMDX(nextConfig);
