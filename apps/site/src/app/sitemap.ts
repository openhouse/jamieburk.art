import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { getVisibleWorkItems } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/resume", "/contact", "/colophon"];
  const workRoutes = getVisibleWorkItems().map((item) => item.href);

  return [...routes, ...workRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-01")
  }));
}
