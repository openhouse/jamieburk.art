import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { workItems } from "@/data/work";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, site.url).toString(),
      lastModified: new Date()
    })),
    ...workItems.map((item) => ({
      url: new URL(`/work/${item.slug}`, site.url).toString(),
      lastModified: new Date()
    }))
  ];
}
