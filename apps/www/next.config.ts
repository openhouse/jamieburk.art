import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const enableIndexing = process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../../"),
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    const globalHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()"
      }
    ];

    if (!enableIndexing) {
      globalHeaders.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow"
      });
    }

    return [
      {
        source: "/(.*)",
        headers: globalHeaders
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
