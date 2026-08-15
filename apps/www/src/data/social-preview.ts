import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

export const socialPreview = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  contentType: "image/png",
  title: site.name,
  role: site.role,
  tagline: site.heroTagline,
  domain: "jamieburk.art",
  photo: portfolioPhotos.eastRiver,
  rendererPhoto: {
    src: "/images/social/jamie-east-river-og.jpg",
    width: 1280,
    height: 960,
    derivativeId: "derivative.photo.east-river.social-preview.v1"
  },
  nameArtwork: {
    text: site.name,
    fontFamily: "Palatino Linotype",
    src: "/images/social/jamie-burkart-palatino.png",
    width: 515,
    height: 257,
    sha256: "ffbff12eb926e327e90fa0002a241fa0230619e970d254791fe55f4d27a73cf5",
    sourceBoundary: "Rasterized from the local system face; no proprietary font file is distributed."
  },
  photoCredit: "East River, 2022 · Photograph by Elana Gordon.",
  placementId: "projection.photo.global-social-preview.east-river",
  alt: "Jamie Burkart beside the East River beneath the Manhattan Bridge, with portfolio text identifying his technical project management, product operations, and implementation practice."
} as const;
