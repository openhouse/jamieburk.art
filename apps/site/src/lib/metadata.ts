import type { Metadata } from "next";

import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/routes";

type PageMetadataInput = {
  title?: string;
  description?: string;
  pathname?: string;
};

export function pageMetadata(input: PageMetadataInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${site.name}` : `${site.name} | Portfolio`;
  const description = input.description ?? site.description;
  const url = absoluteUrl(input.pathname ?? "/");

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
