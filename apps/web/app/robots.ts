import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteMetadata.url}/sitemap.xml`
  };
}
