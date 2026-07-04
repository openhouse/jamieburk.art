import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    "@jamie-burkart/content-schema",
    "@jamie-burkart/design-tokens"
  ],
  experimental: {
    mdxRs: true
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
