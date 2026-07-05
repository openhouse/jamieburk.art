import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) {
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
    sitemap: `${site.url}/sitemap.xml`
  };
}
