import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} - ${site.name}`,
      description,
      url: site.url,
    },
  };
}
