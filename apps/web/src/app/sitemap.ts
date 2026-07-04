import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllWork } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/work/technical-operations", "/about", "/resume", "/contact", "/colophon"];
  const workRoutes = getAllWork().map((item) => `/work/${item.slug}`);

  return [...staticRoutes, ...workRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
