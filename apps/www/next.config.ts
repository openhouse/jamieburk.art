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

const siteUrl =
  parseSiteUrl(process.env.SITE_URL) ??
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (appEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");

const robotsIndexable =
  appEnv === "production" &&
  siteUrl === "https://jamieburk.art" &&
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";

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
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/work/fairrentnyc",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
      {
        source: "/work/fairrentnyc-commercial-rent-stabilization",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
      {
        source: "/work/commercial-rent-stabilization",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
      {
        source: "/work/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: false
      },
      {
        source: "/work/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: false
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
