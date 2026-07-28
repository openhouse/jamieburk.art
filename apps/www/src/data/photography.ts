export type PortfolioPhoto = {
  id: string;
  candidateId: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  archiveLabel: string;
  objectPosition?: string;
  wikiId?: string;
  derivativeId?: string;
  placementIds?: readonly string[];
  publicationBoundary: string;
  publicationStatus: "branch-review";
};

const publicationBoundary =
  "Selected from the editor-reviewed Apple Photos field for layout review. Final production publication remains subject to exact crop, caption, credit, rights, consent, dignity, and collective-credit review.";
const publicationStatus = "branch-review" as const;

export const photos = {
  cityPortrait: {
    id: "photo-jamie-city-portrait",
    candidateId: "WEB-CAND-001",
    src: "/photos/jamie-city-portrait.jpg",
    width: 1278,
    height: 958,
    alt: "Jamie Burkart in a suit on a New York City street, with a pedestrian signal and tall buildings behind him.",
    caption: "Jamie Burkart in New York City.",
    archiveLabel: "Jamie Burkart photo archive",
    objectPosition: "50% 45%",
    publicationBoundary,
    publicationStatus
  },
  councilChamber: {
    id: "photo-jamie-council-chamber",
    candidateId: "WEB-CAND-002",
    src: "/photos/jamie-council-chamber.jpg",
    width: 1280,
    height: 854,
    alt: "Jamie Burkart smiling in New York City Council chambers, wearing a blue work jacket and carrying a clipboard and papers.",
    caption:
      "Jamie at the New York City Council during Open Data Week 2026, carrying coalition participation materials and public-data research.",
    archiveLabel: "Jamie Burkart photo archive",
    objectPosition: "54% 40%",
    wikiId: "asset.photo.jamie-council-chamber.layout-a",
    derivativeId: "derivative.photo.jamie-council-chamber.layout-a.v1",
    placementIds: ["projection.photo.layout-a.home.hero.council-chamber"],
    publicationBoundary,
    publicationStatus
  },
  waterfrontPortrait: {
    id: "photo-jamie-waterfront-portrait",
    candidateId: "WEB-CAND-003",
    src: "/photos/jamie-waterfront-portrait.jpg",
    width: 956,
    height: 1276,
    alt: "Jamie Burkart standing beside an urban waterway beneath a cloudy sky.",
    caption: "A continuing practice of public geography, participation, and life near the water.",
    archiveLabel: "Jamie Burkart photo archive",
    objectPosition: "50% 35%",
    publicationBoundary,
    publicationStatus
  },
  mirrorCamera: {
    id: "photo-jamie-mirror-camera",
    candidateId: "WEB-CAND-004",
    src: "/photos/jamie-mirror-camera.jpg",
    width: 1280,
    height: 854,
    alt: "Jamie Burkart photographing himself in an apartment mirror with a compact camera.",
    caption: "The portfolio photographs come from a lifetime archive Jamie continues to tend.",
    archiveLabel: "Jamie Burkart photo archive",
    objectPosition: "54% 44%",
    publicationBoundary,
    publicationStatus
  },
  dclaMeeting: {
    id: "photo-dcla-diy-spaces-meeting",
    candidateId: "WEB-CAND-010",
    src: "/photos/dcla-diy-spaces-meeting.jpg",
    width: 1280,
    height: 854,
    alt: "A participant addresses a crowded meeting of cultural-space participants seated and standing in a large room.",
    caption:
      "A 2017 Department of Cultural Affairs and DIY-spaces meeting, held as a container for listening across a crowded room.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 44%",
    wikiId: "asset.photo.dcla-diy-spaces-meeting.layout-a",
    derivativeId: "derivative.photo.dcla-diy-spaces-meeting.layout-a.v1",
    placementIds: [
      "projection.photo.layout-a.technical-operations.dcla-meeting"
    ],
    publicationBoundary,
    publicationStatus
  },
  fairRentGroup: {
    id: "photo-fair-rent-group",
    candidateId: "WEB-CAND-013",
    src: "/photos/fair-rent-nyc-group.jpg",
    width: 1368,
    height: 912,
    alt: "A large group of FairRentNYC participants holds a Commercial Rent Stabilization banner and raises their hands.",
    caption:
      "FairRentNYC participants hold the campaign identity together. The work and its outcomes are collective.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 44%",
    publicationBoundary,
    publicationStatus
  },
  legalizeDance: {
    id: "photo-legalize-dance-parade",
    candidateId: "WEB-CAND-014",
    src: "/photos/legalize-dance-parade.jpg",
    width: 1280,
    height: 854,
    alt: "NYC Artist Coalition participants carry a Legalize Dance banner through a city parade.",
    caption:
      "The Legalize Dance identity moves through the city as a public invitation and a shared demand.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 47%",
    publicationBoundary,
    publicationStatus
  },
  cabaretHearingSteps: {
    id: "photo-cabaret-law-hearing-steps",
    candidateId: "WEB-CAND-015",
    src: "/photos/cabaret-law-hearing-steps.jpg",
    width: 1368,
    height: 912,
    alt: "Council Member Rafael Espinal stands before a Repeal the Cabaret Law banner with NYC Artist Coalition participants on City Hall steps.",
    caption:
      "Public organizing and an institutional pathway meet on the steps of City Hall during the Cabaret Law repeal campaign.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 48%",
    publicationBoundary,
    publicationStatus
  },
  fairRentHandbills: {
    id: "photo-fair-rent-handbills",
    candidateId: "WEB-CAND-019",
    src: "/photos/fair-rent-handbills.jpg",
    width: 1280,
    height: 960,
    alt: "Bilingual FairRentNYC Pass Intro 93 handbills arranged on a wooden table.",
    caption:
      "Bilingual handbills turn a policy proposal into a concrete public invitation and action pathway.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 50%",
    publicationBoundary,
    publicationStatus
  },
  councilHearingRoom: {
    id: "photo-council-hearing-room",
    candidateId: "WEB-CAND-039",
    src: "/photos/council-hearing-room.jpg",
    width: 1368,
    height: 912,
    alt: "Participants and public officials sit around tables in a New York City Council hearing room.",
    caption:
      "Cultural-space knowledge enters formal testimony, deliberation, and the public record.",
    archiveLabel: "NYC Artist Coalition archive",
    objectPosition: "50% 42%",
    publicationBoundary,
    publicationStatus
  },
  raftArrival: {
    id: "photo-raft-arrival",
    candidateId: "WEB-CAND-029",
    src: "/photos/raft-arrival.jpg",
    width: 1280,
    height: 848,
    alt: "People gather on a rocky riverbank around a handmade raft flying an American flag.",
    caption:
      "Arrival: people gather with the raft at the river's edge, one of many encounters that shaped the collective expedition.",
    archiveLabel: "Jamie Burkart waterways archive",
    objectPosition: "50% 48%",
    publicationBoundary,
    publicationStatus
  },
  raftFog: {
    id: "photo-raft-fog",
    candidateId: "WEB-CAND-031",
    src: "/photos/raft-in-fog.jpg",
    width: 860,
    height: 1280,
    alt: "A person sits on a handmade red raft floating in pale fog, reflected in still water.",
    caption:
      "Release: a crew member tends the handmade raft as it waits in fog during the collective river expedition.",
    archiveLabel: "Jamie Burkart waterways archive",
    objectPosition: "50% 50%",
    publicationBoundary,
    publicationStatus
  },
  raftDeltaQueen: {
    id: "photo-raft-delta-queen",
    candidateId: "WEB-CAND-033",
    src: "/photos/raft-and-delta-queen.jpg",
    width: 1280,
    height: 844,
    alt: "A small handmade raft floats near the much larger Delta Queen riverboat.",
    caption:
      "Public geography: the small project travels inside a river system, civic history, and scale far larger than itself.",
    archiveLabel: "Jamie Burkart waterways archive",
    objectPosition: "50% 48%",
    publicationBoundary,
    publicationStatus
  }
} satisfies Record<string, PortfolioPhoto>;

export const projectLeadPhotos: Record<string, PortfolioPhoto> = {
  "fair-rent-nyc": photos.fairRentGroup
};

export const projectPhotoEssays: Record<string, PortfolioPhoto[]> = {
  "fair-rent-nyc": [
    photos.legalizeDance,
    photos.cabaretHearingSteps,
    photos.councilHearingRoom,
    photos.fairRentHandbills
  ]
};
