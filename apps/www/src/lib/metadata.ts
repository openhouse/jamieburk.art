import type { Metadata } from "next";
import { site } from "@/data/site";
import { ROBOTS_INDEXABLE, SITE_URL } from "@/lib/site-url";

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
  const url = new URL(path, SITE_URL);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: {
      index: ROBOTS_INDEXABLE,
      follow: ROBOTS_INDEXABLE,
      googleBot: {
        index: ROBOTS_INDEXABLE,
        follow: ROBOTS_INDEXABLE
      }
    },
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: new URL("/opengraph-image", SITE_URL),
          width: 1200,
          height: 630,
          alt: "Jamie Burkart - Technical Project Manager, Product Operations and Implementation"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/opengraph-image", SITE_URL)]
    }
  };
}
