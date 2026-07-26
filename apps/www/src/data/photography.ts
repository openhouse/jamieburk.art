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

export const photographs = {
  eastRiver: {
    wikiId: "asset.photo.east-river-manhattan-bridge.2022.001",
    derivativeId: "derivative.photo.east-river.layout-d.v1",
    placementIds: ["projection.photo.layout-d.home.east-river"],
    src: "/images/field-notes/jamie-east-river.webp",
    width: 1280,
    height: 960,
    alt:
      "Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.",
    caption: "At the East River beneath the Manhattan Bridge, 2022.",
    credit:
      "Photograph by Elana Gordon. From Jamie Burkart's photo archive",
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
    src: "/images/field-v02/raft-in-fog.jpg",
    width: 860,
    height: 1280,
    alt:
      "A red handmade raft resting at the edge of still water in dense fog while a bundled person sits on deck.",
    caption:
      "The waterways project raft held at the bank in fog: a social and technical container made for a journey with other people.",
    credit: "Jamie Burkart photo archive",
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
    src: "/images/field-v02/cabaret-law-hearing.jpg",
    width: 1368,
    height: 912,
    alt:
      "A crowded New York City Council hearing room with attendees facing a panel.",
    caption:
      "Attendees face the Council panel during the public hearing on repealing the Cabaret Law, September 2017.",
    credit: "Photo: Jamie Burkart",
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
    src: "/images/field-v02/fair-rent-rally.jpg",
    width: 1368,
    height: 912,
    alt:
      "A speaker at a City Hall rally, with people behind her holding colorful Fair Rent signs.",
    caption:
      "A speaker addresses a Commercial Rent Stabilization rally on the steps of City Hall, November 2019.",
    credit: "NYC Artist Coalition photo archive",
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
    src: "/images/field-v02/historic-restoration-work.jpg",
    width: 1280,
    height: 854,
    alt:
      "Jamie and a project collaborator standing inside a brick building during restoration work.",
    caption:
      "Jamie and a project collaborator pause inside KC Town Hall during restoration work.",
    credit: "KC Town Hall project archive",
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
    src: "/images/field-v02/sunday-dinner-preparation.jpg",
    width: 956,
    height: 1276,
    alt:
      "Jamie wearing an apron and seasoning a tray of food in an apartment kitchen.",
    caption:
      "Preparing food at 196, where hospitality supported a recurring participation practice.",
    credit: "Jamie Burkart photo archive",
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
    src: "/images/field-v02/artist-coalition-listening-room.jpg",
    width: 1280,
    height: 854,
    alt:
      "People seated closely in a large meeting room while one participant stands to speak.",
    caption:
      "A participant speaks while the room listens at a Department of Cultural Affairs meeting with DIY and alternative cultural-space communities, January 2017.",
    credit: "NYC Artist Coalition photo archive",
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
    src: "/images/field-v02/nightlife-town-hall.jpg",
    width: 1368,
    height: 912,
    alt:
      "A packed audience faces a speaker and projected Save NYC Spaces graphics in a small cultural venue.",
    caption:
      "A speaker addresses a packed Night Mayor town hall in a small cultural space, October 2017.",
    credit: "NYC Artist Coalition photo archive",
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
