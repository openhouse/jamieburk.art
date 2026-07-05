import type { MetadataRoute } from "next";
import { ROBOTS_INDEXABLE, SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!ROBOTS_INDEXABLE) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
