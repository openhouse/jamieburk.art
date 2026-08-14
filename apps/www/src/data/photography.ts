export type PortfolioPhoto = {
  id:
    | "east-river"
    | "save-nyc-spaces-town-hall"
    | "coalition-facilitation-shoestring"
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
    | "work-fair-rent-nyc"
    | "work-196-sunday-dinner"
    | "work-kc-town-hall"
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
  saveNYCSpacesTownHall: {
    id: "save-nyc-spaces-town-hall",
    src: "/images/field-notes/save-nyc-spaces-town-hall.webp",
    width: 1600,
    height: 989,
    alt: "Speakers and organizers hold a Save NYC Spaces banner in front of a large crowd at Market Hotel.",
    caption: "NYC Artist Coalition Office of Nightlife town hall at Market Hotel, 2017.",
    credit: "Photo courtesy NYC Artist Coalition.",
    wikiId: "asset.photo.nycac.save-nyc-spaces-town-hall.2017.001",
    derivativeId: "derivative.photo.nycac.save-nyc-spaces-town-hall.launch-2026.v1",
    placementIds: ["projection.photo.launch-2026.home.save-nyc-spaces-town-hall"],
    captionAssertionIds: [
      "statement.photo.nycac.save-spaces.event.v1",
      "statement.photo.nycac.save-spaces.year.v1"
    ],
    creditAssertionIds: ["statement.photo.nycac.save-spaces.custody.v1"],
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
      "Jamie authorized portfolio publication from the source album. The credit identifies archive custody because creator metadata is unresolved; the event and its outcomes remain collective."
  },
  coalitionFacilitationShoestring: {
    id: "coalition-facilitation-shoestring",
    src: "/images/field-notes/coalition-facilitation-shoestring.webp",
    width: 1600,
    height: 1067,
    alt: "Jamie Burkart, seen from behind, crouches beside large paper sheets while facilitating a garden meeting at Shoestring Press.",
    caption: "Jamie facilitating an NYC Artist Coalition meeting at Shoestring Press, 2017.",
    credit: "Photo courtesy NYC Artist Coalition.",
    wikiId: "asset.photo.nycac.shoestring-facilitation.2017.001",
    derivativeId: "derivative.photo.nycac.shoestring-facilitation.launch-2026.v1",
    placementIds: ["projection.photo.launch-2026.fair-rent.shoestring-facilitation"],
    captionAssertionIds: [
      "statement.photo.nycac.shoestring.facilitation.v1",
      "statement.photo.nycac.shoestring.year.v1"
    ],
    creditAssertionIds: ["statement.photo.nycac.shoestring.custody.v1"],
    knowledgeStatus: "bound",
    placements: ["work-fair-rent-nyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized portfolio publication from the source album. The caption is bounded to the visible facilitation moment; the remembered shared-domain and mailing-list agreement remains a research inquiry."
  },
  sundayDinnerSharedMap: {
    id: "sunday-dinner-shared-map",
    src: "/images/field-notes/sunday-dinner-shared-map.webp",
    width: 1200,
    height: 797,
    alt: "A person stands at a crowded dinner table, raising one hand and holding up a sheet of paper as others laugh beside a hand-drawn map.",
    caption: "A Sunday Dinner gathering with a hand-drawn map and shared table, January 6, 2013.",
    credit: "From Jamie Burkart's photo archive. Photographer not identified in the retained export.",
    wikiId: "asset.photo.sunday-dinner.shared-map.2013.001",
    derivativeId: "derivative.photo.sunday-dinner.shared-map.v1",
    placementIds: ["projection.photo.sunday-dinner.shared-map"],
    captionAssertionIds: [
      "statement.photo.sunday-dinner.shared-map.context.v1",
      "statement.photo.sunday-dinner.shared-map.capture-date.v1"
    ],
    creditAssertionIds: ["statement.photo.sunday-dinner.shared-map.archive-credit.v1"],
    knowledgeStatus: "bound",
    placements: ["work-196-sunday-dinner", "work-index"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. The retained export does not identify the photographer; participant identities, remarks, attendance, and private gathering records remain outside the public bundle."
  },
  kcTownHallRoofWork: {
    id: "kc-town-hall-roof-work",
    src: "/images/field-notes/kc-town-hall-roof-work.webp",
    width: 2400,
    height: 1600,
    alt: "A person in a yellow hard hat and rain jacket uses a drill on a roof assembly.",
    caption: "Roof work during KC Town Hall field implementation, March 24, 2019.",
    credit: "Photograph by Paul Mossine. From Jamie Burkart's photo archive.",
    wikiId: "asset.photo.kc-town-hall.roof-work.2019.001",
    derivativeId: "derivative.photo.kc-town-hall.roof-work.v1",
    placementIds: ["projection.photo.kc-town-hall.roof-work"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.roof-work.context.v1",
      "statement.photo.kc-town-hall.roof-work.capture-date.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.roof-work.creator.v1",
      "statement.photo.kc-town-hall.roof-work.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["work-kc-town-hall", "work-index"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. Paul Mossine is credited as photographer; the image documents field work but does not establish a trade credential, ownership, completed scope, outcome, or sole authorship."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
