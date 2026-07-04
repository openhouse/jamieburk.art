import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllWorkItems } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/work/technical-operations", "/about", "/resume", "/contact", "/colophon"];
  const workRoutes = getAllWorkItems().map((item) => `/work/${item.slug}`);

  return [...routes, ...workRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-03")
  }));
}
