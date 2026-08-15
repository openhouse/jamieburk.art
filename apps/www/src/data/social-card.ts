import { join } from "node:path";
import { homeIdentity } from "@/data/home-identity";
import { portfolioPhotos } from "@/data/photography";

export const homeSocialCard = {
  ...homeIdentity,
  width: 1200,
  height: 630,
  revision: "human-index-photo-v1",
  imagePath: "/opengraph-image?v=human-index-photo-v1",
  renderPhotoPath: "/images/social/jamie-east-river-og-source.jpg",
  alt: "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.",
  photo: portfolioPhotos.eastRiver,
  photoLabel: "East River, 2022",
  photoCredit: "Photograph by Elana Gordon"
} as const;

export function resolveSocialCardPhotoPath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.renderPhotoPath.slice(1));
}
