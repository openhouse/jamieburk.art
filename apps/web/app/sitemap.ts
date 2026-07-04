import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { workItems } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/work/technical-operations",
    "/about",
    "/resume",
    "/contact",
    "/colophon"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...workItems.map((item) => ({
      url: `${site.url}/work/${item.slug}`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: "monthly" as const,
      priority: item.featured ? 0.8 : 0.6
    }))
  ];
}
