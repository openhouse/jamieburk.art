import placementRegistryData from "@/data/photo-placement-registry.json";

type PhotoWorkingReview = {
  workingUse:
    | "authorized-for-features-layout-D-review"
    | "authorized-for-feature-photo-knowledge-D-review";
  production: "hold";
  rights: "review-required" | "portfolio-use-reported";
  credit: "review-required" | "confirmed";
  context: "reviewed-no-sensitive-context-observed";
  contextNote: string;
  representedPeople: "context-and-consent-review-required";
};

type VisualBase = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  wikiId?: string;
  derivativeId?: string;
  placementIds?: readonly string[];
};

export type PortfolioVisual =
  | (VisualBase & {
      kind: "photograph";
      review: PhotoWorkingReview;
    })
  | (VisualBase & {
      kind: "project-screen";
      review?: never;
    })
  | (VisualBase & {
      kind: "project-artifact";
      review?: never;
    });

type PhotoPlacementRecord = {
  context: string;
  occurrenceId: string;
  assetId: string;
  derivativeId: string;
  route: string;
  component: string;
};

export const photoPlacementRegistry =
  placementRegistryData.placements as readonly PhotoPlacementRecord[];

export type PhotoPlacementContext =
  | "home.hero"
  | "home.field-feature"
  | "home.scene.cabaret-law-hearing"
  | "home.scene.dcla-listening-room"
  | "home.scene.kc-town-hall-collaborator"
  | "home.scene.sunday-dinner-preparation"
  | "home.work-card"
  | "about.method"
  | "work-index.hero"
  | "work-index.work-card"
  | "case-study.hero";

function placementIdsForAsset(assetId: string) {
  return photoPlacementRegistry
    .filter((placement) => placement.assetId === assetId)
    .map((placement) => placement.occurrenceId);
}

export function getPhotoOccurrenceId(
  visual: PortfolioVisual,
  context: PhotoPlacementContext
) {
  if (visual.kind !== "photograph") return undefined;

  const placement = photoPlacementRegistry.find(
    (candidate) =>
      candidate.assetId === visual.wikiId &&
      candidate.derivativeId === visual.derivativeId &&
      candidate.context === context
  );

  if (!placement) {
    throw new Error(
      `Missing governed photo occurrence for ${visual.wikiId ?? visual.src} in ${context}`
    );
  }

  return placement.occurrenceId;
}

export const photographs = {
  eastRiver: {
    wikiId: "asset.photo.east-river-manhattan-bridge.2022.001",
    derivativeId: "derivative.photo.east-river.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.east-river-manhattan-bridge.2022.001"
    ),
    src: "/images/field-notes/jamie-east-river.webp",
    width: 1280,
    height: 960,
    alt:
      "Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.",
    caption: "At the East River beneath the Manhattan Bridge, 2022.",
    credit:
      "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    objectPosition: "50% 50%",
    mobileObjectPosition: "70% 50%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-feature-photo-knowledge-D-review",
      production: "hold",
      rights: "portfolio-use-reported",
      credit: "confirmed",
      context: "reviewed-no-sensitive-context-observed",
      contextNote:
        "Jamie is the only clearly represented person; public place precision is limited to a landmark.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  raftInFog: {
    wikiId: "asset.photo.raft-in-fog.waterways",
    derivativeId: "derivative.photo.raft-in-fog.layout-d.v1",
    placementIds: placementIdsForAsset("asset.photo.raft-in-fog.waterways"),
    src: "/images/field-v02/raft-in-fog.jpg",
    width: 860,
    height: 1280,
    alt:
      "A red handmade raft resting at the edge of still water in dense fog while a bundled person sits on deck.",
    caption:
      "The waterways project raft held at the bank in fog: a social and technical container made for a journey with other people.",
    credit: "Photographer not yet confirmed. Jamie Burkart photo archive.",
    objectPosition: "50% 56%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote:
        "A bundled adult sits on the raft deck; no sensitive context is visible.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  cabaretLawHearing: {
    wikiId: "asset.photo.cabaret-law-hearing.2017",
    derivativeId: "derivative.photo.cabaret-law-hearing.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.cabaret-law-hearing.2017"
    ),
    src: "/images/field-v02/cabaret-law-hearing.jpg",
    width: 1368,
    height: 912,
    alt:
      "A crowded New York City Council hearing room with attendees facing a panel.",
    caption:
      "Attendees face the Council panel during the public hearing on repealing the Cabaret Law, September 2017.",
    credit: "Photographer not yet confirmed. Jamie Burkart photo archive.",
    objectPosition: "50% 46%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "A public legislative hearing viewed from the audience.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  fairRentRally: {
    wikiId: "asset.photo.fair-rent-rally.2019",
    derivativeId: "derivative.photo.fair-rent-rally.layout-d.v1",
    placementIds: placementIdsForAsset("asset.photo.fair-rent-rally.2019"),
    src: "/images/field-v02/fair-rent-rally.jpg",
    width: 1368,
    height: 912,
    alt:
      "A speaker at a City Hall rally, with people behind her holding colorful Fair Rent signs.",
    caption:
      "A speaker addresses a Commercial Rent Stabilization rally on the steps of City Hall, November 2019.",
    credit:
      "Photographer not yet confirmed. NYC Artist Coalition photo archive.",
    objectPosition: "50% 45%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "A public rally with a visible speaker and campaign signs.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  kcTownHallWork: {
    wikiId: "asset.photo.kc-town-hall.collaborator-worksite.2018",
    derivativeId:
      "derivative.photo.kc-town-hall.collaborator-worksite.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.kc-town-hall.collaborator-worksite.2018"
    ),
    src: "/images/field-v02/historic-restoration-work.jpg",
    width: 1280,
    height: 854,
    alt:
      "Jamie and a project collaborator standing inside a brick building during restoration work.",
    caption:
      "Jamie and a project collaborator pause inside KC Town Hall during restoration work.",
    credit:
      "Photographer not yet confirmed. KC Town Hall project archive.",
    objectPosition: "50% 43%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "A project worksite with two adults identified by role only.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  sundayDinnerPreparation: {
    wikiId: "asset.photo.sunday-dinner.preparation",
    derivativeId:
      "derivative.photo.sunday-dinner-preparation.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.sunday-dinner.preparation"
    ),
    src: "/images/field-v02/sunday-dinner-preparation.jpg",
    width: 956,
    height: 1276,
    alt:
      "Jamie wearing an apron and seasoning a tray of food in an apartment kitchen.",
    caption:
      "Preparing food at 196, where hospitality supported a recurring participation practice.",
    credit: "Photographer not yet confirmed. Jamie Burkart photo archive.",
    objectPosition: "50% 43%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "Jamie prepares food in his home kitchen; no guests are visible.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  artistCoalitionListeningRoom: {
    wikiId: "asset.photo.nycac.dcla-listening-room.2017-01-27",
    derivativeId:
      "derivative.photo.nycac.dcla-listening-room.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.nycac.dcla-listening-room.2017-01-27"
    ),
    src: "/images/field-v02/artist-coalition-listening-room.jpg",
    width: 1280,
    height: 854,
    alt:
      "People seated closely in a large meeting room while one participant stands to speak.",
    caption:
      "A participant speaks while the room listens at a Department of Cultural Affairs meeting with DIY and alternative cultural-space communities, January 2017.",
    credit:
      "Photographer not yet confirmed. NYC Artist Coalition archive.",
    objectPosition: "50% 52%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "A civic meeting where one adult participant is visibly speaking.",
      representedPeople: "context-and-consent-review-required"
    }
  },
  nightlifeTownHall: {
    wikiId: "asset.photo.nightlife-town-hall.2017",
    derivativeId: "derivative.photo.nightlife-town-hall.layout-d.v1",
    placementIds: placementIdsForAsset(
      "asset.photo.nightlife-town-hall.2017"
    ),
    src: "/images/field-v02/nightlife-town-hall.jpg",
    width: 1368,
    height: 912,
    alt:
      "A packed audience faces a speaker and projected Save NYC Spaces graphics in a small cultural venue.",
    caption:
      "A speaker addresses a packed Night Mayor town hall in a small cultural space, October 2017.",
    credit:
      "Photographer not yet confirmed. NYC Artist Coalition photo archive.",
    objectPosition: "50% 52%",
    kind: "photograph",
    review: {
      workingUse: "authorized-for-features-layout-D-review",
      production: "hold",
      rights: "review-required",
      credit: "review-required",
      context: "reviewed-no-sensitive-context-observed",
      contextNote: "A public town hall viewed across the audience toward a speaker.",
      representedPeople: "context-and-consent-review-required"
    }
  }
} satisfies Record<string, PortfolioVisual>;

const projectScreens = {
  harryJEpstein: {
    src: "/artifacts/hje/public-site.png",
    width: 1200,
    height: 800,
    alt:
      "Harry J. Epstein Company storefront showing product navigation, search, editorial artwork, video, and commerce controls.",
    caption: "The maintained public e-commerce surface.",
    credit: "Harry J. Epstein Company public website",
    objectPosition: "50% 0%",
    kind: "project-screen"
  },
  callNyc: {
    src: "/artifacts/callnyc/archived-prototype.png",
    width: 1200,
    height: 800,
    alt:
      "Archived CallNYC interface showing a resident-facing civic information prototype.",
    caption: "The archived, independent CallNYC civic-data prototype.",
    credit: "CallNYC.org archive",
    objectPosition: "50% 0%",
    kind: "project-screen"
  },
  wowlist: {
    src: "/artifacts/wowlist/project-identity.png",
    width: 800,
    height: 164,
    alt:
      "Distressed red WOWLIST wordmark from the preserved project source code.",
    caption:
      "Original project identity artwork preserved with the WOWList source code.",
    credit: "WOWList project archive",
    objectPosition: "50% 50%",
    kind: "project-artifact"
  }
} satisfies Record<string, PortfolioVisual>;

export const workVisuals: Partial<Record<string, PortfolioVisual>> = {
  "harry-j-epstein": projectScreens.harryJEpstein,
  "fair-rent-nyc": photographs.fairRentRally,
  callnyc: projectScreens.callNyc,
  "196-sunday-dinner": photographs.sundayDinnerPreparation,
  "kc-town-hall": photographs.kcTownHallWork,
  wowlist: projectScreens.wowlist
};

export const photoDisplayBoundary =
  "These photographs document public or project settings. A displayed image does not by itself establish sole authorship, attendance, impact, endorsement, or permission for reuse outside this portfolio. Jamie approved this bounded branch trial; final production rights, credit, and represented-person care and consent review remain open.";

export const photoHeroBoundary =
  "The photograph documents a setting; it does not by itself prove authorship, impact, endorsement, or permission for reuse.";
