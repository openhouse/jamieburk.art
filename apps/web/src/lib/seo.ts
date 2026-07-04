import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata({
  title,
  description,
  pathname = "/"
}: {
  title: string;
  description: string;
  pathname?: string;
}): Metadata {
  const url = new URL(pathname, site.url).toString();

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Jamie Burkart Portfolio",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
