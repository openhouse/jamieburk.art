export type PortfolioPhoto = {
  id: "east-river" | "raft-riverboat" | "paper-trimming" | "printed-editions";
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
  knowledgeStatus: "bound" | "phase-2-reconciliation-pending";
  placements: readonly ("home" | "about" | "colophon")[];
  publicationStatus: "jamie-authorized";
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
    publicUseBoundary:
      "Authorized by Jamie for this portfolio layout; no third-party authorship or rights are asserted."
  },
  raftRiverboat: {
    id: "raft-riverboat",
    src: "/images/field-notes/raft-riverboat.webp",
    width: 1280,
    height: 844,
    alt: "A small handmade raft on a wide river beside the Delta Queen riverboat.",
    caption: "A handmade raft and the Delta Queen on the river.",
    credit: "Jamie Burkart photo archive; originally filed in Jamie's Flickr corpus.",
    wikiId: null,
    derivativeId: "derivative.photo.raft-riverboat.layout-c.v1",
    placementIds: [],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "phase-2-reconciliation-pending",
    placements: ["about"],
    publicationStatus: "jamie-authorized",
    publicUseBoundary:
      "Authorized by Jamie for this portfolio layout; no third-party authorship or rights are asserted."
  },
  paperTrimming: {
    id: "paper-trimming",
    src: "/images/field-notes/paper-trimming.webp",
    width: 1276,
    height: 956,
    alt: "Hands align a stack of paper against the guide of a tabletop paper trimmer.",
    caption: "Paper aligned at the trimming table.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: null,
    derivativeId: "derivative.photo.paper-trimming.layout-c.v1",
    placementIds: [],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "phase-2-reconciliation-pending",
    placements: ["colophon"],
    publicationStatus: "jamie-authorized",
    publicUseBoundary:
      "Authorized by Jamie for this portfolio layout; visible objects are described without assigning authorship."
  },
  printedEditions: {
    id: "printed-editions",
    src: "/images/field-notes/printed-editions.webp",
    width: 1276,
    height: 956,
    alt: "Small folded printed editions stand among tools on a worktable.",
    caption: "Small printed editions in progress.",
    credit: "From Jamie Burkart's photo archive.",
    wikiId: null,
    derivativeId: "derivative.photo.printed-editions.layout-c.v1",
    placementIds: [],
    captionAssertionIds: [],
    creditAssertionIds: [],
    knowledgeStatus: "phase-2-reconciliation-pending",
    placements: ["colophon"],
    publicationStatus: "jamie-authorized",
    publicUseBoundary:
      "Authorized by Jamie for this portfolio layout; visible objects are described without assigning authorship."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
