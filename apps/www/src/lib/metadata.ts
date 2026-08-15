import type { Metadata } from "next";
import { site } from "@/data/site";
import { homeSocialCard } from "@/data/social-card";
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
          url: new URL(homeSocialCard.imagePath, SITE_URL),
          width: homeSocialCard.width,
          height: homeSocialCard.height,
          alt: homeSocialCard.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: new URL(homeSocialCard.imagePath, SITE_URL),
          alt: homeSocialCard.alt
        }
      ]
    }
  };
}
