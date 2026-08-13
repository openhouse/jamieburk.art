export type PortfolioPhoto = {
  id: string;
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
  knowledgeStatus: "bound" | "portfolio-authorized";
  placements: readonly string[];
  publicationStatus: "jamie-authorized";
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    production: "approved" | "open";
    indexing: "approved" | "open";
  };
  publicUseBoundary: string;
};

const sourceAlbumBoundary =
  "Jamie confirmed on August 12, 2026, that the source album is cleared for publication on his portfolio site, including represented-person permission. Creator credit, factual captions, collective context, and exact crop remain occurrence-specific.";

export const portfolioPhotos = {
  publicWorkConversation: {
    id: "public-work-conversation",
    src: "/images/portfolio/public-work-conversation.webp",
    width: 2200,
    height: 1467,
    alt: "Jamie Burkart listening as a collaborator reviews a printed sheet with him on a New York City sidewalk.",
    caption:
      "Reviewing public-facing materials with a collaborator at a Fair Rent NYC event, July 2026. Coalition work shown collectively.",
    credit: "Portfolio photograph; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.public-work-conversation.2026",
    derivativeId: "derivative.photo.product-folio.conversation.v1",
    placementIds: [
      "projection.photo.product-folio.home.conversation",
      "projection.photo.product-folio.product-delivery.conversation"
    ],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home", "work-technical-operations"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
  collectiveSynthesis: {
    id: "collective-synthesis",
    src: "/images/portfolio/collective-synthesis.webp",
    width: 1800,
    height: 1200,
    alt: "Dozens of handwritten cards arranged across a wooden floor during a collaborative planning session.",
    caption:
      "A collaborative planning field: needs, offers, questions, and possible actions made visible together.",
    credit: "Portfolio photograph; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.collective-synthesis.2017",
    derivativeId: "derivative.photo.product-folio.collective-synthesis.v1",
    placementIds: ["projection.photo.product-folio.home.collective-synthesis"],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
  callNycInterface: {
    id: "callnyc-interface",
    src: "/images/portfolio/callnyc-interface.webp",
    width: 1800,
    height: 1157,
    alt: "A phone displaying an archived CallNYC route page for a Brooklyn business.",
    caption:
      "CallNYC in use: public records translated into an issue- and place-based route. Archived interface; not current service guidance.",
    credit: "Photograph by Paul Mossine; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.callnyc-interface.2019",
    derivativeId: "derivative.photo.product-folio.callnyc-interface.v1",
    placementIds: [
      "projection.photo.product-folio.home.callnyc-interface",
      "projection.photo.product-folio.work-callnyc.callnyc-interface"
    ],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home", "work-callnyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
  fairRentMaterials: {
    id: "fair-rent-materials",
    src: "/images/portfolio/fair-rent-materials.webp",
    width: 1200,
    height: 1600,
    alt: "English- and Spanish-language Fair Rent NYC printed materials arranged on a storefront ledge.",
    caption:
      "Bilingual Fair Rent NYC materials turning a policy proposal into a public next step. Campaign work shown collectively.",
    credit: "Portfolio photograph; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.fair-rent-materials.2023",
    derivativeId: "derivative.photo.product-folio.fair-rent-materials.v1",
    placementIds: [
      "projection.photo.product-folio.home.fair-rent-materials",
      "projection.photo.product-folio.work-fair-rent.fair-rent-materials"
    ],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home", "work-fair-rent-nyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
  materialRepair: {
    id: "material-repair",
    src: "/images/portfolio/material-repair.webp",
    width: 1800,
    height: 1350,
    alt: "Jamie Burkart kneeling beside a brick wall while applying mortar with a trowel.",
    caption:
      "Hands-on masonry repair: maintenance understood as part of making a system durable.",
    credit: "Portfolio photograph; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.material-repair.2018",
    derivativeId: "derivative.photo.product-folio.material-repair.v1",
    placementIds: ["projection.photo.product-folio.home.material-repair"],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
  inventiveLogistics: {
    id: "inventive-logistics",
    src: "/images/portfolio/inventive-logistics.webp",
    width: 1200,
    height: 1600,
    alt: "Jamie Burkart standing with a bicycle attached to a trailer carrying a red canoe on a Brooklyn sidewalk.",
    caption:
      "An unusual system made workable: bicycle, trailer, canoe, route, and the practical details between them.",
    credit: "Portfolio photograph; publication authorized by Jamie Burkart.",
    wikiId: "asset.photo.portfolio-field.inventive-logistics.2023",
    derivativeId: "derivative.photo.product-folio.inventive-logistics.v1",
    placementIds: ["projection.photo.product-folio.home.inventive-logistics"],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "portfolio-authorized",
    placements: ["home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved"
    },
    publicUseBoundary: sourceAlbumBoundary
  },
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
    placements: ["superseded-home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Elana Gordon is credited as photographer. Use is bounded to the previously approved portfolio occurrence; no broader rights are asserted."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
