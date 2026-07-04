import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/content";
import { siteMetadata } from "@/lib/metadata";
import { futureRoutes, primaryRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const reservedRoutes = new Set<string>(futureRoutes);
  const routeEntries = primaryRoutes
    .filter((route) => !reservedRoutes.has(route.href))
    .map((route) => ({
      url: `${siteMetadata.url}${route.href}`,
      lastModified: now
    }));

  const workEntries = getAllWork().map((work) => ({
    url: `${siteMetadata.url}/work/${work.slug}`,
    lastModified: now
  }));

  return [...routeEntries, ...workEntries];
}
