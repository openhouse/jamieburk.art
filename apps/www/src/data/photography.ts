export type PortfolioPhoto = {
  id:
    | "east-river"
    | "nycac-shoestring-facilitation"
    | "nycac-market-hotel-banner"
    | "sunday-dinner-shared-map"
    | "kc-town-hall-roof-work"
    | "kc-town-hall-tired-of-tires-flyer"
    | "kc-town-hall-tired-of-tires-before"
    | "kc-town-hall-tired-of-tires-after";
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
    | "fair-rent-nyc"
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
  },
  sundayDinnerSharedMap: {
    id: "sunday-dinner-shared-map",
    src: "/images/field-notes/sunday-dinner-shared-map.webp",
    width: 1200,
    height: 797,
    alt: "A person stands at a crowded dinner table, raising one hand and holding up a sheet of paper as others laugh beside a hand-drawn map.",
    caption:
      "A Sunday Dinner gathering with a hand-drawn map and shared table, January 6, 2013.",
    credit:
      "From Jamie Burkart's photo archive. Photographer not identified in the retained export.",
    wikiId: "asset.photo.sunday-dinner.shared-map.2013.001",
    derivativeId: "derivative.photo.sunday-dinner.shared-map.v1",
    placementIds: ["projection.photo.sunday-dinner.shared-map"],
    captionAssertionIds: [
      "statement.photo.sunday-dinner.shared-map.context.v1",
      "statement.photo.sunday-dinner.shared-map.capture-date.v1"
    ],
    creditAssertionIds: [
      "statement.photo.sunday-dinner.shared-map.archive-credit.v1"
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
    placements: ["kc-town-hall", "work-index"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie authorized this exact portfolio occurrence from the designated portfolio album. Paul Mossine is credited as photographer; the image documents field work but does not establish a trade credential, ownership, completed scope, outcome, or sole authorship."
  },
  kcTownHallTiredOfTiresFlyer: {
    id: "kc-town-hall-tired-of-tires-flyer",
    src: "/images/artifacts/kc-town-hall-tired-of-tires-flyer.webp",
    width: 912,
    height: 500,
    alt: "Archived Tired of Tires flyer announcing a recurring free residential tire-pickup service from KC Town Hall and the Oak Park Neighborhood Association.",
    caption:
      "An archived outreach design translated eligibility and a recurring schedule into a resident-facing service promise. Obsolete contact details and dates are excluded from this public derivative.",
    credit:
      "From the KC Town Hall project archive. Component design authorship remains under review.",
    wikiId: "asset.design.kc-town-hall.tired-of-tires-flyer.2019.001",
    derivativeId: "derivative.design.kc-town-hall.tired-of-tires-flyer.public-crop.v1",
    placementIds: ["projection.visual.kc-town-hall.tired-of-tires-flyer"],
    captionAssertionIds: [
      "statement.design.kc-town-hall.tired-of-tires-service-model.v1",
      "statement.design.kc-town-hall.tired-of-tires-public-crop.v1"
    ],
    creditAssertionIds: [
      "statement.design.kc-town-hall.tired-of-tires-archive-custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["kc-town-hall"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie explicitly authorized portfolio use of the project design archive. The public derivative excludes obsolete contact details and dates; it establishes the service promise and project-level design, not individual component authorship."
  },
  kcTownHallTiredOfTiresBefore: {
    id: "kc-town-hall-tired-of-tires-before",
    src: "/images/field-notes/kc-town-hall-tired-of-tires-before.webp",
    width: 912,
    height: 670,
    alt: "A large curbside stack of used tires in front of a residential block and community garden.",
    caption:
      "Before collection: one curbside site in the project's curated June 2022 field archive.",
    credit:
      "From the KC Town Hall project archive. Photographer not identified in the retained export.",
    wikiId: "asset.photo.kc-town-hall.tired-of-tires-before.2022.001",
    derivativeId: "derivative.photo.kc-town-hall.tired-of-tires-before.v1",
    placementIds: ["projection.photo.kc-town-hall.tired-of-tires-before"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-before-context.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-archive-credit.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["kc-town-hall"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie explicitly authorized this portfolio occurrence from the project archive. The image documents a curbside field condition; it does not identify a resident, publish an address, or establish who placed or collected the tires."
  },
  kcTownHallTiredOfTiresAfter: {
    id: "kc-town-hall-tired-of-tires-after",
    src: "/images/field-notes/kc-town-hall-tired-of-tires-after.webp",
    width: 912,
    height: 670,
    alt: "The same residential curb and community-garden frontage after the stack of used tires was removed.",
    caption:
      "After collection: the matched frame retained beside the before image in the project's curated June 2022 field archive.",
    credit:
      "From the KC Town Hall project archive. Photographer not identified in the retained export.",
    wikiId: "asset.photo.kc-town-hall.tired-of-tires-after.2022.001",
    derivativeId: "derivative.photo.kc-town-hall.tired-of-tires-after.v1",
    placementIds: ["projection.photo.kc-town-hall.tired-of-tires-after"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-after-context.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-archive-credit.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["kc-town-hall"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Jamie explicitly authorized this portfolio occurrence from the project archive. The matched pair documents removal at one curbside site; it does not establish an audited program total, identify a resident, or publish an address."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
