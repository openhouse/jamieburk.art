import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  const isStaging = site.environment === "staging";

  if (isStaging) {
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
