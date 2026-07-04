import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withMDX(nextConfig);
