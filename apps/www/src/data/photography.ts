export type PortfolioPhoto = {
  id:
    | "east-river"
    | "east-river-social-preview"
    | "nycac-shoestring-facilitation"
    | "nycac-market-hotel-banner"
    | "sunday-dinner-shared-map"
    | "kc-town-hall-roof-work"
    | "kc-town-hall-tired-of-tires-flyer"
    | "kc-town-hall-tired-of-tires-before"
    | "kc-town-hall-tired-of-tires-after"
    | "knowledge-wiki-collective-map";
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
    | "social-preview"
    | "knowledge-wiki-graph"
  )[];
  publicationStatus: "jamie-authorized";
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    production: "open" | "approved";
    indexing: "open" | "approved";
    decision?: {
      authority: "Jamie Burkart";
      approvedAt: "2026-08-15" | "2026-08-21";
      selectedVariant:
        | "image-4-editorial-proposition"
        | "knowledge-wiki-collective-map";
      alternativesReviewed: 3 | 6;
      uniqueCompositionsReviewed: 3 | 4;
      renderedSha256: string;
    };
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
      "Elana Gordon is credited as photographer. Use is limited to this approved portfolio occurrence; no broader rights are asserted."
  },
  eastRiverSocialPreview: {
    id: "east-river-social-preview",
    src: "/images/social/jamie-east-river-og.jpg",
    width: 1280,
    height: 960,
    alt: "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge.",
    caption: "At the East River beneath the Manhattan Bridge, 2022.",
    credit: "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    wikiId: "asset.photo.east-river-manhattan-bridge.2022.001",
    derivativeId: "derivative.photo.east-river.social-preview.v1",
    placementIds: ["projection.photo.social-preview.east-river"],
    captionAssertionIds: [
      "statement.photo.east-river.place.v1",
      "statement.photo.east-river.capture-year.v1"
    ],
    creditAssertionIds: [
      "statement.photo.east-river.creator.v2",
      "statement.photo.east-river.custody.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["social-preview"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved",
      decision: {
        authority: "Jamie Burkart",
        approvedAt: "2026-08-15",
        selectedVariant: "image-4-editorial-proposition",
        alternativesReviewed: 6,
        uniqueCompositionsReviewed: 4,
        renderedSha256:
          "1f83d66b7e35e8a3a955819cf2104b79a88c9a8bd3953fd6fa691143bdb6da42"
      }
    },
    publicUseBoundary:
      "Elana Gordon remains identified as photographer in the manifest and social-image alt metadata; her portfolio permission makes in-image credit optional. This exact full-bleed 1200 by 630 composition is approved only for the jamieburk.art social-preview occurrence; platform caching does not confer standalone reuse rights."
  },
  nycacShoestringFacilitation: {
    id: "nycac-shoestring-facilitation",
    src: "/images/field-notes/nycac-shoestring-facilitation.webp",
    width: 2400,
    height: 1600,
    alt: "Jamie Burkart, seen from behind, crouches in a garden circle while participants look toward shared handwritten notes on a low grill.",
    caption:
      "Facilitating a coalition working session at Shoestring Press, July 24, 2017.",
    credit: "Photo courtesy of NYC Artist Coalition.",
    wikiId: "asset.photo.nycac-shoestring-facilitation.2017.001",
    derivativeId: "derivative.photo.nycac-shoestring-facilitation.v1",
    placementIds: [
      "projection.photo.home.screen-room-shoestring",
      "projection.photo.fair-rent-nyc.shoestring-facilitation"
    ],
    captionAssertionIds: [
      "statement.photo.nycac-shoestring.place.v1",
      "statement.photo.nycac-shoestring.capture-date.v1",
      "statement.photo.nycac-shoestring.facilitation.v1"
    ],
    creditAssertionIds: [
      "statement.photo.nycac-shoestring.courtesy-credit.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["home", "fair-rent-nyc"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Credit this occurrence to NYC Artist Coalition. Private People tags, location data, and archive identifiers remain outside the public bundle."
  },
  nycacMarketHotelBanner: {
    id: "nycac-market-hotel-banner",
    src: "/images/field-notes/nycac-market-hotel-banner.webp",
    width: 2400,
    height: 1483,
    alt: "Organizers, artists, and public officials hold a hand-painted Save NYC Spaces and NYC Artist Coalition banner in front of a packed Market Hotel room.",
    caption:
      "A collective Save NYC Spaces town hall at Market Hotel, October 11, 2017.",
    credit: "Photo courtesy of NYC Artist Coalition.",
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
      "statement.photo.nycac-market-hotel.courtesy-credit.v1"
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
      "Credit this occurrence to NYC Artist Coalition. The image documents a collective room and does not establish individual remarks, endorsement, attendance count, or sole causation."
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
      "statement.photo.sunday-dinner.shared-map.courtesy-credit.v1"
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
      "Credit this occurrence to Sunday Dinner NYC. This exact occurrence completed human rights and represented-person review for this portfolio display; participant identities, remarks, attendance, and private gathering records remain outside the public bundle."
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
      "statement.photo.kc-town-hall.roof-work.courtesy-credit.v1"
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
      "Credit this occurrence to KC Town Hall. The image documents field work but does not establish a trade credential, ownership, completed scope, outcome, or sole authorship."
  },
  kcTownHallTiredOfTiresFlyer: {
    id: "kc-town-hall-tired-of-tires-flyer",
    src: "/images/artifacts/kc-town-hall-tired-of-tires-flyer.webp",
    width: 912,
    height: 500,
    alt: "Archived Tired of Tires flyer announcing a recurring free residential tire-pickup service from KC Town Hall and the Oak Park Neighborhood Association.",
    caption:
      "An archived outreach design translated eligibility and a recurring schedule into a resident-facing service promise. Obsolete contact details and dates are excluded from this public derivative.",
    credit: "Design courtesy of KC Town Hall.",
    wikiId: "asset.design.kc-town-hall.tired-of-tires-flyer.2019.001",
    derivativeId: "derivative.design.kc-town-hall.tired-of-tires-flyer.public-crop.v1",
    placementIds: ["projection.visual.kc-town-hall.tired-of-tires-flyer"],
    captionAssertionIds: [
      "statement.design.kc-town-hall.tired-of-tires-service-model.v1",
      "statement.design.kc-town-hall.tired-of-tires-public-crop.v1"
    ],
    creditAssertionIds: [
      "statement.design.kc-town-hall.tired-of-tires.courtesy-credit.v1"
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
    credit: "Photo courtesy of KC Town Hall.",
    wikiId: "asset.photo.kc-town-hall.tired-of-tires-before.2022.001",
    derivativeId: "derivative.photo.kc-town-hall.tired-of-tires-before.v1",
    placementIds: ["projection.photo.kc-town-hall.tired-of-tires-before"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-before-context.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-before.courtesy-credit.v1"
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
    credit: "Photo courtesy of KC Town Hall.",
    wikiId: "asset.photo.kc-town-hall.tired-of-tires-after.2022.001",
    derivativeId: "derivative.photo.kc-town-hall.tired-of-tires-after.v1",
    placementIds: ["projection.photo.kc-town-hall.tired-of-tires-after"],
    captionAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-after-context.v1"
    ],
    creditAssertionIds: [
      "statement.photo.kc-town-hall.tired-of-tires-after.courtesy-credit.v1"
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
  },
  knowledgeWikiCollectiveMap: {
    id: "knowledge-wiki-collective-map",
    src: "/images/field-notes/knowledge-wiki-collective-map.webp",
    width: 2400,
    height: 1600,
    alt: "Handwritten cards in several ink colors form clusters across a wooden floor, surrounded by shoes, a book, a plate, and a small light.",
    caption:
      "Handwritten contributions form a shared working map during an NYC Artist Coalition steering-group session, February 2017.",
    credit: "Photo courtesy of NYC Artist Coalition.",
    wikiId: "asset.photo.knowledge-wiki.collective-map.2017.001",
    derivativeId: "derivative.photo.knowledge-wiki.collective-map.v1",
    placementIds: ["projection.photo.knowledge-wiki.collective-map"],
    captionAssertionIds: [
      "statement.photo.knowledge-wiki.collective-map.capture-month.v1",
      "statement.photo.knowledge-wiki.collective-map.visible-action.v1"
    ],
    creditAssertionIds: [
      "statement.photo.knowledge-wiki.collective-map.courtesy-credit.v1"
    ],
    knowledgeStatus: "bound",
    placements: ["knowledge-wiki-graph"],
    publicationStatus: "jamie-authorized",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "approved",
      indexing: "approved",
      decision: {
        authority: "Jamie Burkart",
        approvedAt: "2026-08-21",
        selectedVariant: "knowledge-wiki-collective-map",
        alternativesReviewed: 3,
        uniqueCompositionsReviewed: 3,
        renderedSha256:
          "a596480d6276fd4fb02fcbc6822ef79e049bdeb27c3081a574892ee5b2c0d036"
      }
    },
    publicUseBoundary:
      "Credit this occurrence to NYC Artist Coalition. The photograph documents handwritten contributions arranged into a shared working map; it does not identify authors, preserve exact discussion, prove agreement, or assign ownership of the group's knowledge."
  }
} as const satisfies Record<string, PortfolioPhoto>;

export const publicPhotoManifest = Object.values(portfolioPhotos);
