import { join } from "node:path";
import { homeIdentity } from "@/data/home-identity";
import { portfolioPhotos } from "@/data/photography";

export const homeSocialCard = {
  ...homeIdentity,
  width: 1200,
  height: 630,
  revision: "human-index-photo-v3",
  imagePath: "/opengraph-image?v=human-index-photo-v3",
  renderPhotoPath: "/images/social/jamie-east-river-og-source.jpg",
  visibleCopy: {
    role: homeIdentity.role,
    name: homeIdentity.name
  },
  identityFont: {
    family: "TeX Gyre Pagella",
    weight: 400,
    sourcePath: "/fonts/tex-gyre-pagella/texgyrepagella-regular.otf",
    licensePath: "/fonts/tex-gyre-pagella/GUST-FONT-LICENSE.txt"
  },
  interfaceFont: {
    family: "Karla",
    weights: [400, 700],
    sourcePaths: {
      400: "/fonts/karla/Karla-Regular.ttf",
      700: "/fonts/karla/Karla-Bold.ttf"
    },
    licensePath: "/fonts/karla/OFL.txt"
  },
  alt: "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.",
  photo: portfolioPhotos.eastRiver,
  photoLabel: "East River, 2022",
  photoCredit: "Photograph by Elana Gordon"
} as const;

export function resolveSocialCardPhotoPath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.renderPhotoPath.slice(1));
}

export function resolveSocialCardIdentityFontPath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.identityFont.sourcePath.slice(1));
}

export function resolveSocialCardIdentityFontLicensePath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.identityFont.licensePath.slice(1));
}

export function resolveSocialCardInterfaceFontPath(appRoot: string, weight: 400 | 700) {
  return join(appRoot, "public", homeSocialCard.interfaceFont.sourcePaths[weight].slice(1));
}

export function resolveSocialCardInterfaceFontLicensePath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.interfaceFont.licensePath.slice(1));
}
