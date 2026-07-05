import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const PRODUCTION_SITE_URL = "https://jamieburk.art";
const STAGING_SITE_URL = "https://staging.jamieburk.art";
const appEnv = process.env.APP_ENV ?? "staging";
const siteUrl = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (appEnv === "production" ? PRODUCTION_SITE_URL : STAGING_SITE_URL)
).replace(/\/+$/, "");
const isProduction = appEnv === "production" || siteUrl === PRODUCTION_SITE_URL;

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
        source: "/:path*",
        headers
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
