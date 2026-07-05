import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const appEnv = process.env.APP_ENV ?? "staging";
const siteUrl = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (appEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art")
).replace(/\/+$/, "");
const isProduction = appEnv === "production" || siteUrl === "https://jamieburk.art";

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
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()"
      }
    ];

    if (!isProduction) {
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }

    return [
      {
        source: "/(.*)",
        headers
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
