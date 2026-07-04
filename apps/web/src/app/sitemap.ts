import type { MetadataRoute } from "next";
import { workEntries } from "../lib/work";

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
  const base = "https://jamieburk.art";
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now
    })),
    ...workEntries.map((entry) => ({
      url: `${base}/work/${entry.slug}`,
      lastModified: now
    }))
  ];
}
