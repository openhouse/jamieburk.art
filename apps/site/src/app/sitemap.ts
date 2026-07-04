import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllWorkItems, getWorkHref } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/work", "/work/technical-operations", "/about", "/resume", "/contact", "/colophon"];
  const workRoutes = getAllWorkItems().map((item) => getWorkHref(item));
  const uniqueRoutes = Array.from(new Set([...staticRoutes, ...workRoutes, "/lab/source-backed-team-memory"]));

  return uniqueRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now
  }));
}
