import type { MetadataRoute } from "next";
import { siteConfig } from "@jamie/site-content/site";
import { getAllWork } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/work/technical-operations", "/about", "/resume", "/contact", "/colophon"];
  const workRoutes = getAllWork().map((work) => `/work/${work.slug}`);

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
