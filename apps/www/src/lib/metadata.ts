import type { Metadata } from "next";
import { site } from "@/data/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title = site.title,
  description = site.description,
  path = "/"
}: MetadataInput = {}): Metadata {
  const url = new URL(path, site.url);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url
    },
    robots: site.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: new URL("/opengraph-image", site.url),
          width: 1200,
          height: 630,
          alt: "Jamie Burkart - Technical Project Manager"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/opengraph-image", site.url)]
    }
  };
}
