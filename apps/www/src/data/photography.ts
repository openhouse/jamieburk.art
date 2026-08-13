export type PortfolioPhoto = {
  id:
    | "east-river"
    | "civic-field-exchange"
    | "collective-synthesis"
    | "civic-interface"
    | "public-information-materials"
    | "bicycle-canoe-system"
    | "maintenance-in-practice";
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
  placements: readonly ("home" | "home-field-record")[];
  publicationStatus: "jamie-authorized";
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    production: "open";
    indexing: "open";
  };
  publicUseBoundary: string;
};

const employmentEditionBoundary =
  "Jamie confirmed portfolio publication rights and permission for every photograph in the source album on August 12, 2026. Use remains bounded to this portfolio; captions preserve collective context and do not imply endorsement.";

export const portfolioPhotos = {
  civicFieldExchange: {
    id: "civic-field-exchange",
    src: "/images/product-practice/civic-field-exchange.webp",
    width: 2560,
    height: 1707,
    alt: "Jamie Burkart and Irene Tung reviewing printed materials together on a New York City sidewalk.",
    caption:
      "Jamie Burkart and Irene Tung review printed materials at a Small Business United report press conference, 2026.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.civic-field-exchange.home.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: [
      "statement.photo.civic-field-exchange.people.v1",
      "statement.photo.civic-field-exchange.context.v1"
    ],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
  },
  collectiveSynthesis: {
    id: "collective-synthesis",
    src: "/images/product-practice/collective-synthesis.webp",
    width: 1920,
    height: 1280,
    alt: "Handwritten cards from a collective planning session arranged in clusters on a wood floor.",
    caption: "Collective synthesis during an NYC Artist Coalition steering-group session, 2017.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.collective-synthesis.field-record.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: ["statement.photo.collective-synthesis.context.v1"],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
  },
  civicInterface: {
    id: "civic-interface",
    src: "/images/product-practice/civic-interface.webp",
    width: 1920,
    height: 1280,
    alt: "A phone displaying a public route interface for a Brooklyn small-business stop.",
    caption: "A public route interface in use during Fair Rent NYC field outreach, 2019.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.civic-interface.field-record.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: ["statement.photo.civic-interface.context.v1"],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
  },
  publicInformationMaterials: {
    id: "public-information-materials",
    src: "/images/product-practice/public-information-materials.webp",
    width: 1200,
    height: 1600,
    alt: "Stacks of English and Spanish Fair Rent NYC public-information cards on a worktable.",
    caption: "Bilingual Fair Rent NYC public-information materials, 2023.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.public-information-materials.field-record.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: ["statement.photo.public-information-materials.context.v1"],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
  },
  bicycleCanoeSystem: {
    id: "bicycle-canoe-system",
    src: "/images/product-practice/bicycle-canoe-system.webp",
    width: 1200,
    height: 1600,
    alt: "Jamie Burkart standing with a bicycle attached to a canoe trailer on a city sidewalk.",
    caption: "A bicycle-and-canoe transport system in use, 2023.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.bicycle-canoe-system.field-record.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: ["statement.photo.bicycle-canoe-system.context.v1"],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
  },
  maintenanceInPractice: {
    id: "maintenance-in-practice",
    src: "/images/product-practice/maintenance-in-practice.webp",
    width: 1920,
    height: 1440,
    alt: "Jamie Burkart repairing mortar between bricks beside a boarded doorway.",
    caption: "Hands-on maintenance at KC Town Hall; capture date remains unverified.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: "asset-set.photo.employment-edition-terminal-six.2026-08",
    derivativeId: "derivative.photo.maintenance-in-practice.field-record.v1",
    placementIds: ["projection.photo.home-product-practice.2026-08"],
    captionAssertionIds: ["statement.photo.maintenance-in-practice.context.v1"],
    creditAssertionIds: ["statement.photo.employment-edition.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary: employmentEditionBoundary
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
    placements: ["home-field-record"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Elana Gordon is credited as photographer. Use is bounded to this approved portfolio occurrence; no broader rights are asserted."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
