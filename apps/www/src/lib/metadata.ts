import type { Metadata } from "next";
import { socialPreview } from "@/data/social-preview";
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
          url: new URL(socialPreview.route, SITE_URL),
          width: socialPreview.width,
          height: socialPreview.height,
          alt: socialPreview.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: new URL(socialPreview.route, SITE_URL),
          alt: socialPreview.alt
        }
      ]
    }
  };
}
