export type PortfolioPhoto = {
  id:
    | "east-river"
    | "sunday-dinner-shared-map"
    | "kc-town-hall-roof-work";
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
  placements: readonly (
    | "home"
    | "social-card"
    | "196-sunday-dinner"
    | "kc-town-hall"
    | "work-index"
  )[];
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
    placementIds: [
      "projection.photo.layout-c.home.east-river",
      "projection.photo.home-og.east-river"
    ],
    captionAssertionIds: [
      "statement.photo.east-river.place.v1",
      "statement.photo.east-river.capture-year.v1"
    ],
    creditAssertionIds: [
      "statement.photo.east-river.creator.v2",
      "statement.photo.east-river.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["home", "social-card"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Elana Gordon is credited as photographer on the homepage and remains the recorded creator. Her bounded portfolio permission makes visible credit optional at Jamie's discretion. The Open Graph preview uses a metadata-stripped JPEG source with an approved 1200 by 630 cover treatment and no in-image credit; no broader rights are asserted."
  },
  sundayDinnerSharedMap: {
    id: "sunday-dinner-shared-map",
    src: "/images/field-notes/sunday-dinner-shared-map.webp",
    width: 1200,
    height: 797,
    alt: "A person stands at a crowded dinner table, raising one hand and holding up a sheet of paper as others laugh beside a hand-drawn map.",
    caption:
      "A Sunday Dinner gathering with a hand-drawn map and shared table, January 6, 2013.",
    credit: "Photo courtesy of Sunday Dinner NYC.",
    wikiId: "asset.photo.sunday-dinner.shared-map.2013.001",
    derivativeId: "derivative.photo.sunday-dinner.shared-map.v1",
    placementIds: ["projection.photo.sunday-dinner.shared-map"],
    captionAssertionIds: [
      "statement.photo.sunday-dinner.shared-map.context.v1",
      "statement.photo.sunday-dinner.shared-map.capture-date.v1"
    ],
    creditAssertionIds: [
      "statement.photo.sunday-dinner.shared-map.project-credit.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["196-sunday-dinner", "work-index"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. Sunday Dinner NYC receives the public courtesy credit; participant identities, remarks, attendance, and private gathering records remain outside the public bundle."
  },
  kcTownHallRoofWork: {
    id: "kc-town-hall-roof-work",
    src: "/images/field-notes/kc-town-hall-roof-work.webp",
    width: 2400,
    height: 1600,
    alt: "A person in a yellow hard hat and rain jacket uses a drill on a roof assembly.",
    caption: "Roof work during KC Town Hall field implementation, March 24, 2019.",
    credit: "Photo courtesy of KC Town Hall.",
    wikiId: "asset.photo.kc-town-hall.roof-work.2019.001",
    derivativeId: "derivative.photo.kc-town-hall.roof-work.v1",
    placementIds: ["projection.photo.kc-town-hall.roof-work"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.roof-work.context.v1",
      "statement.photo.kc-town-hall.roof-work.capture-date.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.roof-work.project-credit.v1",
      "statement.photo.kc-town-hall.roof-work.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["kc-town-hall", "work-index"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. KC Town Hall receives the public courtesy credit; the image documents field work but does not establish a trade credential, ownership, completed scope, outcome, or sole authorship."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
