import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.enableIndexing ? { allow: "/" } : { disallow: "/" })
    },
    sitemap: `${site.url}/sitemap.xml`
  };
}
