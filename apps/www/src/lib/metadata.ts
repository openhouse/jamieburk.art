import type { Metadata } from "next";
import { site } from "@/data/site";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

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
  const metadataBase = new URL(SITE_URL);
  const url = new URL(path, SITE_URL);

  return {
    metadataBase,
    title,
    description,
    robots: IS_PRODUCTION
      ? {
          index: true,
          follow: true
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
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
          alt: "Jamie Burkart - Technical Project Manager"
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
