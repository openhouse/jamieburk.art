import type { Metadata } from "next";

import { site } from "./site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function createMetadata({
  title,
  description = site.description,
  path = "/"
}: MetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} — Jamie Burkart Portfolio`
    : "Jamie Burkart — Technical Project Manager | Product Operations & Implementation";

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Jamie Burkart portfolio title card"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description
    }
  };
}
