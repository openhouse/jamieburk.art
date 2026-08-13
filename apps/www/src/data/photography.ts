export type PortfolioPhoto = {
  id:
    | "east-river"
    | "nycac-shoestring-facilitation"
    | "nycac-market-hotel-banner";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  wikiId: string | null;
  derivativeId: string;
  placementIds: readonly string[];
  captionAssertionIds: readonly string[];
  creditAssertionIds: readonly string[];
  knowledgeStatus: "bound";
  placements: readonly ("home" | "fair-rent-nyc")[];
  publicationStatus: "jamie-authorized";
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    production: "open";
    indexing: "open";
  };
  publicUseBoundary: string;
};

export const portfolioPhotos = {
  eastRiver: {
    id: "east-river",
    src: "/images/field-notes/jamie-east-river.webp",
    width: 1280,
    height: 960,
    alt: "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge.",
    caption: "At the East River beneath the Manhattan Bridge, 2022.",
    credit: "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    wikiId: "asset.photo.east-river-manhattan-bridge.2022.001",
    derivativeId: "derivative.photo.east-river.layout-c.v1",
    placementIds: ["projection.photo.layout-c.home.east-river"],
    captionAssertionIds: [
      "statement.photo.east-river.place.v1",
      "statement.photo.east-river.capture-year.v1"
    ],
    creditAssertionIds: [
      "statement.photo.east-river.creator.v2",
      "statement.photo.east-river.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Elana Gordon is credited as photographer. Use is bounded to this approved portfolio occurrence; no broader rights are asserted."
  },
  nycacShoestringFacilitation: {
    id: "nycac-shoestring-facilitation",
    src: "/images/field-notes/nycac-shoestring-facilitation.webp",
    width: 2400,
    height: 1600,
    alt: "Jamie Burkart, seen from behind, crouches in a garden circle while participants look toward shared handwritten notes on a low grill.",
    caption:
      "Facilitating a coalition working session at Shoestring Press, July 24, 2017.",
    credit: "Photograph by Paul Mossine. From Jamie Burkart's photo archive.",
    wikiId: "asset.photo.nycac-shoestring-facilitation.2017.001",
    derivativeId: "derivative.photo.nycac-shoestring-facilitation.v1",
    placementIds: ["projection.photo.fair-rent-nyc.shoestring-facilitation"],
    captionAssertionIds: [
      "statement.photo.nycac-shoestring.place.v1",
      "statement.photo.nycac-shoestring.capture-date.v1",
      "statement.photo.nycac-shoestring.facilitation.v1"
    ],
    creditAssertionIds: [
      "statement.photo.nycac-shoestring.creator.v1",
      "statement.photo.nycac-shoestring.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["fair-rent-nyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. Paul Mossine is credited as photographer; private People tags, location data, and archive identifiers remain outside the public bundle."
  },
  nycacMarketHotelBanner: {
    id: "nycac-market-hotel-banner",
    src: "/images/field-notes/nycac-market-hotel-banner.webp",
    width: 2400,
    height: 1483,
    alt: "Organizers, artists, and public officials hold a hand-painted Save NYC Spaces and NYC Artist Coalition banner in front of a packed Market Hotel room.",
    caption:
      "A collective Save NYC Spaces town hall at Market Hotel, October 11, 2017.",
    credit: "Photograph by Paul Mossine. From Jamie Burkart's photo archive.",
    wikiId:
      "asset.photo.project-site.save-nyc-spaces-save-nyc-spaces-group-photo-nyc-artist-coalition-6y2gjc2",
    derivativeId: "derivative.photo.nycac-market-hotel-banner.v1",
    placementIds: ["projection.photo.fair-rent-nyc.market-hotel-banner"],
    captionAssertionIds: [
      "statement.photo.nycac-market-hotel.place.v1",
      "statement.photo.nycac-market-hotel.capture-date.v1",
      "statement.photo.nycac-market-hotel.collective-event.v1"
    ],
    creditAssertionIds: [
      "statement.photo.nycac-market-hotel.creator.v1",
      "statement.photo.nycac-market-hotel.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["fair-rent-nyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. Paul Mossine is credited as photographer; the image documents a collective room and does not establish individual remarks, endorsement, attendance count, or sole causation."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
