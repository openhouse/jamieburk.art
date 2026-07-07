import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const appEnv =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "staging";
const siteEnv = process.env.SITE_ENV ?? appEnv;
const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? siteEnv;

const siteUrl = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (siteEnv === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);
const publicSiteUrl = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl);

const robotsIndexable =
  [appEnv, siteEnv, deployEnv].includes("production") &&
  siteUrl === "https://jamieburk.art" &&
  publicSiteUrl === "https://jamieburk.art" &&
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  }
];
const globalHeaders = [
  ...securityHeaders,
  ...(robotsIndexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }])
];
const resumeHeaders = [
  ...securityHeaders,
  { key: "X-Robots-Tag", value: "noindex, nofollow" }
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
        headers: globalHeaders
      },
      {
        source: "/resume/:path*",
        headers: resumeHeaders
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jamieburk.art" }],
        destination: "https://jamieburk.art/:path*",
        permanent: true
      },
      {
        source: "/work/fairrentnyc-commercial-rent-stabilization",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/work/fairrentnyc",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/work/nyc-artist-coalition-fair-rent",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/work/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: true
      },
      {
        source: "/work/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: false
      },
      {
        source: "/noting-us",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      },
      {
        source: "/technical-operations",
        destination: "/work/technical-operations",
        permanent: true
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
