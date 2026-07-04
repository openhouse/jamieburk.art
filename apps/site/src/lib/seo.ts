import type { Metadata } from "next";
import { site } from "./site";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path = "/"
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} - Technical Project Manager | Product Operations & Implementation`;
  const pageDescription = description ?? site.description;

  return {
    metadataBase: new URL(site.url),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: absoluteUrl(path),
      siteName: site.name,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Jamie Burkart - operating structure for complex public-facing teams"
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl("/opengraph-image")]
    }
  };
}
