import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = site.deployEnv === "production";

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/"
    },
    sitemap: isProduction ? `${site.url}/sitemap.xml` : undefined
  };
}
