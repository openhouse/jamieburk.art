import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
const configuredDeployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV?.trim();
const isStaging =
  configuredDeployEnv === "staging" ||
  configuredSiteUrl === "https://staging.jamieburk.art";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  }
];

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
    return [
      {
        source: "/(.*)",
        headers: isStaging
          ? [
              ...securityHeaders,
              { key: "X-Robots-Tag", value: "noindex, nofollow" }
            ]
          : securityHeaders
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
