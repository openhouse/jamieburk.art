import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { workItems } from "@/data/work";

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
  const workRoutes = workItems.map((item) => item.href ?? `/work/${item.slug}`);
  const routes = Array.from(new Set([...staticRoutes, ...workRoutes]));

  return routes.map((route) => ({
      url: new URL(route, site.url).toString(),
      lastModified: new Date()
  }));
}
