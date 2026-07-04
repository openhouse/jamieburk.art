import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description ?? site.description,
    openGraph: {
      title,
      description: description ?? site.description,
      url: site.url,
      siteName: site.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? site.description
    }
  };
}
