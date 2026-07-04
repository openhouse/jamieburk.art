import type { Metadata } from "next";
import { site } from "@/data/site";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata({ title, description, path = "/" }: SeoInput = {}): Metadata {
  const pageTitle = title ? `${title} - Jamie Burkart Portfolio` : site.title;
  const url = new URL(path, site.url).toString();

  return {
    title: pageTitle,
    description: description ?? site.description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description: description ?? site.description,
      url,
      siteName: "Jamie Burkart Portfolio",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description ?? site.description
    }
  };
}
