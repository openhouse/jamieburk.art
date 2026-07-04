import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { getWorkItems } from "@/lib/content";
import { staticRoutes } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workItems = await getWorkItems();
  const routes = [
    ...staticRoutes,
    ...workItems.map((item) => `/work/${item.meta.slug}`)
  ];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date()
  }));
}
