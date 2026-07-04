import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getWorkItems } from "@/lib/work";

const staticRoutes = ["/", "/work", "/work/technical-operations", "/about", "/resume", "/contact", "/colophon", "/lab/source-backed-team-memory"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workItems = await getWorkItems();
  const routes = [...staticRoutes, ...workItems.map((item) => `/work/${item.slug}`)];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date()
  }));
}
