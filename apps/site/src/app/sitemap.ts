import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllWork } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const work = await getAllWork();
  const staticRoutes = [
    "",
    "/work",
    "/work/technical-operations",
    "/resume",
    "/about",
    "/contact",
    "/colophon",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })),
    ...work.map((item) => ({
      url: `${site.url}/work/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
