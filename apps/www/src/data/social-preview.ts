import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

export const socialPreview = {
  route: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Jamie Burkart — Technical Project Manager, with a photograph of Jamie at the East River beneath the Manhattan Bridge.",
  name: site.name,
  role: "Technical Project Manager",
  focus: "Product Operations & Implementation",
  proposition: "I help emerging work become usable systems.",
  image: portfolioPhotos.eastRiverSocialPreview,
  credit: "Photo: Elana Gordon",
  siteLabel: "jamieburk.art"
} as const;
