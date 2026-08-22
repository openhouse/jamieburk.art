export type ParticipationMedia = {
  id: string;
  kind: "photograph" | "website-capture";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  href?: string;
  knowledgeId: string;
  permissionId: string;
  projectionId: string;
  publicationStatus: "jamie-authorized";
  clearanceAttestation: string;
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    production: "asset-approved-candidate-release-separate";
    indexing: "candidate-release-separate";
  };
  captureSelection?: {
    cadenceSeconds: 1;
    candidateCount: 10;
    selectedFrame: 5;
    capturedAt: "2026-08-13";
  };
};

export const participationMedia = {
  shoestringFacilitation: {
    id: "shoestring-facilitation-2017",
    kind: "photograph",
    src: "/images/participation/shoestring-facilitation.webp",
    width: 1600,
    height: 1067,
    alt: "Jamie Burkart, seen from behind, crouches at a grill used as a table while drawing on large sheets during a circle meeting in the Shoestring Press garden.",
    caption:
      "Facilitating an advocacy-group coordination meeting at Shoestring Press, Brooklyn, July 2017. The scene documents listening and visualization work that preceded shared campaign infrastructure.",
    credit: "Photo courtesy of NYC Artist Coalition.",
    knowledgeId: "asset.photo.nycac.shoestring-facilitation.2017.001",
    permissionId: "source.permission.jamie.photo-select-portfolio.2026-08-13",
    projectionId: "projection.photo.fair-rent.shoestring-facilitation",
    publicationStatus: "jamie-authorized",
    clearanceAttestation:
      "Jamie confirmed this exact album-sourced occurrence is cleared for use on the jamieburk.art portfolio. This records the portfolio publication decision only; it does not grant permission for reuse or imply participant endorsement.",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "asset-approved-candidate-release-separate",
      indexing: "candidate-release-separate"
    }
  },
  letNycDanceSurface: {
    id: "let-nyc-dance-public-surface-2026-08-13",
    kind: "website-capture",
    src: "/artifacts/let-nyc-dance/public-surface.jpg",
    width: 1265,
    height: 712,
    alt: "Let NYC Dance website with an embedded video frame of Rafael Espinal speaking at a podium beneath Let NYC Dance banners, followed by the coalition's thank-you message.",
    caption:
      "Let NYC Dance public campaign surface, captured August 13, 2026 after the embedded hero video loaded. The page preserves the coalition's shared public invitation and later thank-you context.",
    credit: "Let NYC Dance public website; campaign credit remains collective.",
    href: "https://letnycdance.nycartc.com/",
    knowledgeId: "asset.screenshot.let-nyc-dance.public-surface.2026-08-13",
    permissionId: "source.permission.jamie.public-site-captures.2026-08-13",
    projectionId: "projection.screenshot.fair-rent.let-nyc-dance",
    publicationStatus: "jamie-authorized",
    clearanceAttestation:
      "Jamie approved this exact public-site capture for the jamieburk.art portfolio. This records the portfolio publication decision only; it does not imply campaign endorsement or grant permission for reuse.",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "asset-approved-candidate-release-separate",
      indexing: "candidate-release-separate"
    },
    captureSelection: {
      cadenceSeconds: 1,
      candidateCount: 10,
      selectedFrame: 5,
      capturedAt: "2026-08-13"
    }
  },
  marketHotelTownHall: {
    id: "market-hotel-save-nyc-spaces-2017",
    kind: "photograph",
    src: "/images/participation/save-nyc-spaces-market-hotel.webp",
    width: 1600,
    height: 1067,
    alt: "Speakers and organizers hold a Save NYC Spaces and NYC Artist Coalition banner at the front of a packed Market Hotel crowd.",
    caption:
      "NYC Artist Coalition's Save NYC Spaces town hall at Market Hotel, Brooklyn, October 2017. The photograph records a coalition-scale public moment; the work and its outcomes remain collective.",
    credit: "Photo courtesy of NYC Artist Coalition.",
    href: "https://www.flickr.com/photos/nycartc/37918677516",
    knowledgeId: "asset.photo.nycac.market-hotel-town-hall.2017.001",
    permissionId: "source.permission.jamie.photo-select-portfolio.2026-08-13",
    projectionId: "projection.photo.fair-rent.market-hotel-town-hall",
    publicationStatus: "jamie-authorized",
    clearanceAttestation:
      "Jamie confirmed this exact album-sourced occurrence is cleared for use on the jamieburk.art portfolio following the recorded dignity review. This records the portfolio publication decision only; it does not grant permission for reuse or imply participant endorsement.",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "asset-approved-candidate-release-separate",
      indexing: "candidate-release-separate"
    }
  }
} as const satisfies Record<string, ParticipationMedia>;
