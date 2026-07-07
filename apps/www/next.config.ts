import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const PRODUCTION_URL = "https://jamieburk.art";
const STAGING_URL = "https://staging.jamieburk.art";

const readEnv = (value: string | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const normalizeUrl = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;

  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
};

const appEnv =
  readEnv(process.env.APP_ENV) ??
  readEnv(process.env.SITE_ENV) ??
  readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ??
  "staging";

const siteUrl = normalizeUrl(
  readEnv(process.env.SITE_URL) ?? readEnv(process.env.NEXT_PUBLIC_SITE_URL),
  appEnv === "production" ? PRODUCTION_URL : STAGING_URL
);

const robotsPolicy = readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) ?? "noindex";

const robotsIndexable = appEnv === "production" && siteUrl === PRODUCTION_URL && robotsPolicy === "index";

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
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  },
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
        source: "/work/fair-rent-crs",
        destination: "/work/fair-rent-nyc",
        permanent: true
      },
      {
        source: "/work/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: false
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
