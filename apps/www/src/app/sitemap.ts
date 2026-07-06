import type { MetadataRoute } from "next";
import { workItems } from "@/data/work";
import { SITE_URL } from "@/lib/site-url";

const approvedWorkSlugs = new Set([
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist"
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/work",
    "/work/technical-operations",
    "/resume",
    "/about",
    "/contact",
    "/colophon"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, SITE_URL).toString(),
      lastModified: new Date()
    })),
    ...workItems
      .filter((item) => approvedWorkSlugs.has(item.slug))
      .map((item) => ({
        url: new URL(`/work/${item.slug}`, SITE_URL).toString(),
        lastModified: new Date()
      }))
  ];
}
