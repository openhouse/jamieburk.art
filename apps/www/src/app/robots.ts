import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      },
      sitemap: `${site.url}/sitemap.xml`
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${site.url}/sitemap.xml`
  };
}
