import type { MetadataRoute } from "next";
import { workItems } from "@/data/work";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapWorkItems = workItems.filter((item) => {
    return item.visibility !== "private" && item.status !== "Draft";
  });

  const staticRoutes = [
    "/",
    "/work",
    "/work/technical-operations",
    "/resume",
    "/about",
    "/contact",
    "/colophon",
    "/lab/source-backed-team-memory"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, SITE_URL).toString(),
      lastModified: new Date()
    })),
    ...sitemapWorkItems.map((item) => ({
      url: new URL(item.href ?? `/work/${item.slug}`, SITE_URL).toString(),
      lastModified: new Date()
    }))
  ];
}
