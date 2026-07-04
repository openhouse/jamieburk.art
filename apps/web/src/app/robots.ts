import type { MetadataRoute } from "next";
import { siteConfig } from "@jamie/site-content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
