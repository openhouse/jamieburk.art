export type PortfolioPhoto = {
  id:
    | "east-river"
    | "raft-riverboat"
    | "kc-town-hall-before"
    | "tired-of-tires-load"
    | "paper-trimming"
    | "printed-editions";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  placements: readonly (
    | "home"
    | "work"
    | "about"
    | "technical-operations"
    | "kc-town-hall"
    | "colophon"
  )[];
  subjectExposure: "self-only" | "no-identifiable-people" | "hands-only";
  publicationStatus: "jamie-authorized-working-review";
  productionApproval: "open";
  publicUseBoundary: string;
};

const workingReviewBoundary =
  "Jamie authorized this metadata-stripped derivative for public pull-request review on 2026-07-26. Final production selection, caption, credit, rights, and consent review remain open.";

const archiveCredit =
  "Jamie Burkart archive. Photographer credit under review.";

export const portfolioPhotos = {
  eastRiver: {
    id: "east-river",
    src: "/images/field-notes/jamie-east-river.webp",
    width: 1280,
    height: 960,
    alt: "Jamie Burkart standing at the East River shoreline beneath the Manhattan Bridge.",
    caption: "Jamie at the East River beneath the Manhattan Bridge, 2022.",
    credit: archiveCredit,
    placements: ["home"],
    subjectExposure: "self-only",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  },
  raftRiverboat: {
    id: "raft-riverboat",
    src: "/images/field-notes/raft-riverboat.webp",
    width: 1280,
    height: 844,
    alt: "A small handmade raft on a wide river beside the Delta Queen riverboat.",
    caption: "A handmade raft and the Delta Queen on the river.",
    credit:
      "Jamie Burkart archive; public Flickr corpus. Photographer credit under review.",
    placements: ["home", "about"],
    subjectExposure: "no-identifiable-people",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  },
  kcTownHallBefore: {
    id: "kc-town-hall-before",
    src: "/images/field-notes/kc-town-hall-before.webp",
    width: 1280,
    height: 854,
    alt: "The long-vacant brick KC Town Hall building at a Kansas City street corner before restoration work.",
    caption: "KC Town Hall before Phase 1 restoration work.",
    credit: archiveCredit,
    placements: ["home", "work", "kc-town-hall"],
    subjectExposure: "no-identifiable-people",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  },
  tiredOfTiresLoad: {
    id: "tired-of-tires-load",
    src: "/images/field-notes/tired-of-tires-load.webp",
    width: 1276,
    height: 956,
    alt: "A yellow dump truck loaded with discarded tires collected from a Kansas City neighborhood.",
    caption: "A neighborhood tire-removal load ready for the city recycling center.",
    credit: archiveCredit,
    placements: ["home", "technical-operations", "kc-town-hall"],
    subjectExposure: "no-identifiable-people",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  },
  paperTrimming: {
    id: "paper-trimming",
    src: "/images/field-notes/paper-trimming.webp",
    width: 1276,
    height: 956,
    alt: "Hands align a stack of paper against the guide of a tabletop paper trimmer.",
    caption: "Paper aligned at the trimming table.",
    credit: archiveCredit,
    placements: ["home", "technical-operations", "colophon"],
    subjectExposure: "hands-only",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  },
  printedEditions: {
    id: "printed-editions",
    src: "/images/field-notes/printed-editions.webp",
    width: 1276,
    height: 956,
    alt: "Small folded printed editions stand among tools on a worktable.",
    caption: "Small printed editions in progress.",
    credit: archiveCredit,
    placements: ["home", "colophon"],
    subjectExposure: "no-identifiable-people",
    publicationStatus: "jamie-authorized-working-review",
    productionApproval: "open",
    publicUseBoundary: workingReviewBoundary
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);

export const caseStudyPhotos = {
  "kc-town-hall": portfolioPhotos.kcTownHallBefore
} as const;

export function getCaseStudyPhoto(slug: string): PortfolioPhoto | undefined {
  return slug in caseStudyPhotos
    ? caseStudyPhotos[slug as keyof typeof caseStudyPhotos]
    : undefined;
}
