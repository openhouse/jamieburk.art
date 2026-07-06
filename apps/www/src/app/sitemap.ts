import type { MetadataRoute } from "next";
import { workItems } from "@/data/work";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const canonicalWorkItems = workItems.filter(
    (item) =>
      item.visibility !== "private" &&
      item.status !== "Draft" &&
      item.approval === "approved"
  );

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, SITE_URL).toString(),
      lastModified: new Date()
    })),
    ...canonicalWorkItems.map((item) => ({
      url: new URL(item.href ?? `/work/${item.slug}`, SITE_URL).toString(),
      lastModified: new Date()
    }))
  ];
}
