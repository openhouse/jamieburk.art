import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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
  async redirects() {
    return [
      {
        source: "/work/fair-rent-nyc",
        destination: "/work/fairrentnyc-commercial-rent-stabilization",
        permanent: true
      },
      {
        source: "/work/fairrentnyc",
        destination: "/work/fairrentnyc-commercial-rent-stabilization",
        permanent: true
      },
      {
        source: "/work/196-sunday-dinner",
        destination: "/work/196-artists-residency",
        permanent: true
      },
      {
        source: "/work/source-backed-team-memory",
        destination: "/lab/source-backed-team-memory",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);
