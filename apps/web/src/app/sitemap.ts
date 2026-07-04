import type { MetadataRoute } from "next";
import { getAllWork, getWorkHref } from "@/lib/content";
import { site } from "@/lib/site";

const staticRoutes = [
  "",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const workRoutes = getAllWork()
    .filter((entry) => entry.slug !== "source-backed-team-memory")
    .map((entry) => getWorkHref(entry));

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
