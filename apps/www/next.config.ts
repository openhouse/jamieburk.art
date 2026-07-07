import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const readEnv = (value: string | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const parseSiteUrl = (value: string | undefined) => {
  const normalized = readEnv(value);
  if (!normalized) return undefined;

  try {
    return stripTrailingSlash(new URL(normalized).toString());
  } catch {
    return undefined;
  }
};

const appEnv =
  readEnv(process.env.APP_ENV) ??
  readEnv(process.env.SITE_ENV) ??
  readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ??
  "staging";
const siteEnv = readEnv(process.env.SITE_ENV) ?? appEnv;
const deployEnv = readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ?? appEnv;
const siteUrl =
  parseSiteUrl(process.env.SITE_URL) ??
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (appEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");
const publicSiteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? siteUrl;
const robotsPolicy = readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) ?? "noindex";

const robotsIndexable =
  appEnv === "production" &&
  siteEnv === "production" &&
  deployEnv === "production" &&
  siteUrl === "https://jamieburk.art" &&
  publicSiteUrl === "https://jamieburk.art" &&
  robotsPolicy === "index";

const globalHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  },
  ...(robotsIndexable
    ? []
    : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }])
];

const resumePdfHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "X-Content-Type-Options", value: "nosniff" }
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
        headers: resumePdfHeaders
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
        source: "/work/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      },
      {
        source: "/work/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: true
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
