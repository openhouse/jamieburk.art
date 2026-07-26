export type PhotoAsset = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit: string;
  context: "self-portrait" | "public-event" | "project-documentation" | "material-record";
  objectPosition?: string;
  wikiId?: string;
  derivativeId?: string;
  placementIds?: readonly string[];
  governanceStatus?: "candidate-hold" | "approved";
};

export type GovernedPhotoAsset = PhotoAsset & {
  wikiId: string;
  derivativeId: string;
  placementIds: readonly string[];
  governanceStatus: "candidate-hold" | "approved";
};

export const governedPhotoCandidates = {
  eastRiverLayoutC: {
    id: "photo-east-river-layout-c",
    wikiId: "asset.photo.east-river-manhattan-bridge.2022.001",
    derivativeId: "derivative.photo.east-river.layout-c.v1",
    placementIds: ["projection.photo.layout-c.home.east-river"],
    governanceStatus: "candidate-hold",
    src: "/images/field-notes/jamie-east-river.webp",
    alt: "Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.",
    caption: "At the East River beneath the Manhattan Bridge, 2022.",
    credit: "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    context: "project-documentation",
    objectPosition: "73% 50%"
  } satisfies GovernedPhotoAsset,
} satisfies Record<string, GovernedPhotoAsset>;

export const photos = {
  raftDeltaQueen: {
    id: "photo-waterways-raft-delta-queen",
    src: "/images/photo-fieldwork/raft-delta-queen.jpg",
    alt: "A low handmade raft carrying bicycles, supplies, and an American flag passes a large red-and-white paddlewheel boat on the Mississippi River.",
    caption:
      "A handmade multi-person raft meets the scale of the Mississippi River system. Jamie's role was to help tend a sound, stable, shared experience, not to stand apart from it as captain.",
    credit: "Jamie Burkart archive",
    context: "project-documentation",
    objectPosition: "42% 52%"
  },
  dclaListeningRoom: {
    id: "photo-nycac-dcla-listening-room",
    src: "/images/photo-fieldwork/dcla-listening-room.jpg",
    alt: "A person in a blue work jacket stands to speak in a packed public meeting room while attendees listen from chairs and along the walls.",
    caption:
      "A packed cultural-affairs meeting makes the operating form visible: people gather, lived experience enters the room, and public questions become shared work.",
    credit: "NYC Artist Coalition project archive",
    context: "public-event",
    objectPosition: "50% 45%"
  },
  fairRentCityHall: {
    id: "photo-fair-rent-city-hall",
    src: "/images/photo-fieldwork/fair-rent-city-hall.jpg",
    alt: "A speaker addresses microphones outside New York City Hall as a group behind her holds colorful Fair Rent signs.",
    caption:
      "A Fair Rent NYC public action outside City Hall. The campaign and its outcomes belong to the many organizers, advocates, businesses, workers, and elected officials who carried the work.",
    credit: "NYC Artist Coalition / Fair Rent NYC project archive",
    context: "public-event",
    objectPosition: "50% 45%"
  },
  screenPrinting: {
    id: "photo-nycac-screen-printing",
    src: "/images/photo-fieldwork/nycac-screen-printing.jpg",
    alt: "Jamie works at a screen-printing table behind stacks of bright pink shirts in a print studio.",
    caption:
      "Jamie screen-prints campaign shirts. Public participation also depends on quiet production: files, supplies, signs, shirts, websites, schedules, and follow-through.",
    credit: "NYC Artist Coalition project archive",
    context: "project-documentation",
    objectPosition: "50% 52%"
  },
  selfPortrait: {
    id: "photo-jamie-self-portrait-2026",
    src: "/images/photo-fieldwork/jamie-self-portrait-2026.jpg",
    alt: "Jamie smiles into a carved wooden mirror while holding a compact camera in his Brooklyn apartment.",
    caption:
      "Self-portrait at 196, 2026. Photography is one way Jamie attends to the structures people build and inhabit together.",
    credit: "Self-portrait by Jamie Burkart",
    context: "self-portrait",
    objectPosition: "56% 45%"
  },
  fairRentMaterials: {
    id: "photo-fair-rent-field-materials",
    src: "/images/photo-fieldwork/fair-rent-field-materials.jpg",
    alt: "Clipboards, folders, fabric, and multilingual Fair Rent campaign handbills are arranged on a work surface.",
    caption:
      "Public handbills and field materials turn policy language into portable information infrastructure without exposing private working notes.",
    credit: "Fair Rent NYC project archive",
    context: "material-record",
    objectPosition: "50% 50%"
  },
  repealCabaretLaw: {
    id: "photo-nycac-repeal-cabaret-law",
    src: "/images/photo-fieldwork/repeal-cabaret-law.jpg",
    alt: "Artists, advocates, and public officials stand on the steps of New York City Hall behind a banner reading Repeal the Cabaret Law, NYC Artist Coalition.",
    caption:
      "Artists, advocates, and public officials gather at City Hall around the collective demand to repeal New York City's Cabaret Law.",
    credit: "NYC Artist Coalition project archive",
    context: "public-event",
    objectPosition: "50% 47%"
  },
  letNycDance: {
    id: "photo-nycac-let-nyc-dance",
    src: "/images/photo-fieldwork/let-nyc-dance.jpg",
    alt: "Marchers carry a Legalize Dance, NYC Artist Coalition banner down a Manhattan street during the Dance Parade.",
    caption:
      "Let NYC Dance joins a policy demand to embodied public culture during the Dance Parade. Cultural life is not an abstraction; people make it together.",
    credit: "NYC Artist Coalition project archive",
    context: "public-event",
    objectPosition: "50% 50%"
  }
} satisfies Record<string, PhotoAsset>;

export const projectLeadPhotos: Partial<Record<string, PhotoAsset>> = {
  "fair-rent-nyc": photos.fairRentCityHall
};

export const projectIndexVisuals: Partial<Record<string, PhotoAsset>> = {
  "harry-j-epstein": {
    id: "visual-hje-public-storefront",
    src: "/artifacts/hje/public-site.png",
    alt: "Harry J. Epstein Company storefront showing product navigation, search, editorial artwork, video, and commerce controls.",
    caption:
      "The maintained public storefront joins product discovery, content, marketing, ordering, and customer language.",
    credit: "Harry J. Epstein Company public website",
    context: "material-record",
    objectPosition: "50% 0%"
  },
  "callnyc": {
    id: "visual-callnyc-archived-prototype",
    src: "/artifacts/callnyc/archived-prototype.png",
    alt: "Archived CallNYC prototype showing a resident-facing issue page and civic guidance interface.",
    caption:
      "The archived, unofficial prototype translated constituent-services data into issue pathways and next-step guidance.",
    credit: "CallNYC archived public prototype",
    context: "material-record",
    objectPosition: "50% 0%"
  },
  ...projectLeadPhotos
};

export const fairRentPhotoEssay = [
  photos.dclaListeningRoom,
  photos.screenPrinting,
  photos.repealCabaretLaw,
  photos.letNycDance,
  photos.fairRentMaterials
];
