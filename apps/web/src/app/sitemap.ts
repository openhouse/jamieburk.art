import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { workItems } from "@/data/work";

const staticRoutes = [
  "",
  "/work",
  "/work/technical-operations",
  "/about",
  "/resume",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...workItems.map((item) => item.route)];

  return Array.from(new Set(routes)).map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
