import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const readEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const parseSiteUrl = (value: string | undefined) => {
  const candidate = readEnv(value);
  if (!candidate) return undefined;

  try {
    return stripTrailingSlash(new URL(candidate).toString());
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
  readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) === "index";

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
        source: "/technical-operations",
        destination: "/work/technical-operations",
        permanent: true
      },
      {
        source: "/harry-j-epstein",
        destination: "/work/harry-j-epstein",
        permanent: true
      },
      {
        source: "/fair-rent-nyc",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/fairrentnyc",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/commercial-rent-stabilization",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/callnyc",
        destination: "/work/callnyc",
        permanent: true
      },
      {
        source: "/wowlist",
        destination: "/work/wowlist",
        permanent: true
      },
      {
        source: "/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
