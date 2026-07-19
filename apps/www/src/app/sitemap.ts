import type { MetadataRoute } from "next";
import { workItems } from "@/data/work";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

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
      url: new URL(route, SITE_URL).toString()
    })),
    ...workItems.map((item) => ({
      url: new URL(`/work/${item.slug}`, SITE_URL).toString()
    }))
  ];
}
