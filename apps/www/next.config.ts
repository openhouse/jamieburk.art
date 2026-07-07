import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const appEnv =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "staging";

const siteUrl = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (appEnv === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

const ROBOTS_INDEXABLE =
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
  ...(ROBOTS_INDEXABLE
    ? []
    : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }])
];

const resumePdfHeaders = [
  ...globalHeaders.filter((header) => header.key !== "X-Robots-Tag"),
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
        source: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
        headers: resumePdfHeaders
      },
      {
        source: "/(.*)",
        headers: globalHeaders
      }
    ];
  },
  async redirects() {
    return [
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
        source: "/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      },
      {
        source: "/noting-us",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      },
      {
        source: "/work/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: true
      },
      {
        source: "/196-artists-residency",
        destination: "/work/196-sunday-dinner",
        permanent: true
      },
      {
        source: "/sunday-dinner",
        destination: "/work/196-sunday-dinner",
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
