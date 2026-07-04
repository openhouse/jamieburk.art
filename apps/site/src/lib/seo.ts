import type { Metadata } from "next";
import { site } from "@/data/site";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({ title, description = site.description, path = "/" }: SeoInput = {}): Metadata {
  const pageTitle = title ? `${title} — ${site.name}` : `${site.name} — Technical Project Manager | Product Operations & Implementation`;
  const url = new URL(path, site.url).toString();

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
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name}: ${site.tagline}`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description
    }
  };
}
