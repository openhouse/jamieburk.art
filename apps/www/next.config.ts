import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const appEnv = process.env.APP_ENV ?? "staging";

const siteUrl = stripTrailingSlash(
  process.env.SITE_URL ??
    (appEnv === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

const publicSiteUrl = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl);

const robotsIndexable =
  appEnv === "production" &&
  siteUrl === "https://jamieburk.art" &&
  publicSiteUrl === "https://jamieburk.art" &&
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
      },
      {
        source: "/resume/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
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
        source: "/fairrentnyc",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
      {
        source: "/fair-rent",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
      {
        source: "/commercial-rent-stabilization",
        destination: "/work/fair-rent-nyc",
        permanent: false
      },
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
        source: "/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: false
      },
      {
        source: "/sunday-dinner",
        destination: "/work/196-sunday-dinner",
        permanent: false
      },
      {
        source: "/work/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: false
      },
      {
        source: "/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: false
      },
      {
        source: "/noting-us",
        destination: "/lab/source-backed-team-memory",
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
