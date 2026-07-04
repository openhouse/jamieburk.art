import type { Metadata } from "next";
import { site } from "./site";

type PageMetadata = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title,
  description = site.description,
  path = ""
}: PageMetadata = {}): Metadata {
  const pageTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`;
  const url = new URL(path, site.url);

  return {
    metadataBase: new URL(site.url),
    title: pageTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: site.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description
    }
  };
}
