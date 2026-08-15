import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

export const socialPreview = {
  route: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Jamie Burkart — Technical Project Manager — at the East River beneath the Manhattan Bridge. Photograph by Elana Gordon.",
  name: site.name,
  role: "Technical Project Manager",
  proposition: "I help emerging work become usable systems.",
  image: portfolioPhotos.eastRiverSocialPreview,
  siteLabel: "jamieburk.art"
} as const;
