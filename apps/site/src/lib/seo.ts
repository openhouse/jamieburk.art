import type { Metadata } from "next";
import { site } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: "/og/default.svg",
          width: 1200,
          height: 630,
          alt: "Jamie Burkart portfolio source map graphic"
        }
      ],
      type: "website"
    }
  };
}
