import { claimSchema, type ClaimRecord } from "./schema.ts";

const eventAntiClaims = [
  "Do not say Jamie organized, led, or officially represented the hackathon.",
  "Do not say Speaker Melissa Mark-Viverito attended."
];

const projectAntiClaims = [
  "Do not say Jamie caused the CouncilStat release.",
  "Do not describe CallNYC as an official Council product.",
  "Do not describe CallNYC as a commissioned project, formal hackathon submission, or winning entry."
];

const claimInput: ClaimRecord[] = [
  {
    id: "callnyc-event-date-time",
    projectId: "callnyc",
    publicText:
      "A New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016; Civic Hall announced it for 1-3 p.m.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    antiClaims: [...eventAntiClaims, "Do not say 2:10 p.m. was the event's start time."],
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-event-branding",
    projectId: "callnyc",
    publicText:
      "A recovered promotional graphic branded the gathering 'New York City Council Hackathon.'",
    status: "approved",
    strength: "direct",
    mustCite: true,
    caveat: "Treat this as recovered event branding, not proof of a longer formal registration title.",
    antiClaims: ["Do not describe the recovered evidence as a Civic Hall calendar listing."],
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-councilstat-context",
    projectId: "callnyc",
    publicText:
      "The Council described the gathering on the event day as its first CouncilStat hackathon.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    antiClaims: eventAntiClaims,
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-digital-district-breakout",
    projectId: "callnyc",
    publicText:
      "One documented breakout was titled 'Digital District - Help improve City Council District office operations.'",
    status: "approved",
    strength: "direct",
    mustCite: true,
    caveat: "Participant photographic evidence supports a breakout-table title, not the title of the overall event.",
    antiClaims: [
      "Do not say Digital District was the event's official title.",
      "Do not say Jamie authored all participant recommendations.",
      "Do not say 2:10 p.m. was the event's start time."
    ],
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-jamie-participation",
    projectId: "callnyc",
    publicText:
      "Jamie participated in the January 30 Civic Hall constituent-services hackathon.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    antiClaims: eventAntiClaims,
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-independent-follow-on",
    projectId: "callnyc",
    publicText:
      "After the full CouncilStat dataset was released, Jamie independently developed CallNYC rather than delivering an official Council product.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    antiClaims: projectAntiClaims,
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-product-method",
    projectId: "callnyc",
    publicText:
      "Jamie translated administrative case records into issue-oriented resident pathways while preserving the data's limits.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    antiClaims: [
      ...projectAntiClaims,
      "Do not claim measured improvements in case resolution, district-office efficiency, or constituent satisfaction."
    ],
    allowedSurfaces: ["case-study", "technical-operations"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-use-and-iteration",
    projectId: "callnyc",
    publicText:
      "Jamie optimized CallNYC pages for search and sharing and expanded contact options after conversations with prospective users.",
    status: "approved",
    strength: "direct",
    mustCite: true,
    antiClaims: [
      "Do not imply broad adoption or measured resident outcomes.",
      "Do not claim measured improvements in case resolution, district-office efficiency, or constituent satisfaction."
    ],
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-data-limitations",
    projectId: "callnyc",
    publicText:
      "CouncilStat case totals required cautious interpretation and could not be treated as simple measures of office quality, effectiveness, specialization, or resident need.",
    status: "approved",
    strength: "direct",
    mustCite: true,
    antiClaims: [
      "Do not treat CouncilStat case totals as simple measures of office quality, effectiveness, specialization, or resident need."
    ],
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-archived-unofficial-status",
    projectId: "callnyc",
    publicText:
      "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
    status: "approved",
    strength: "direct",
    mustCite: true,
    antiClaims: projectAntiClaims,
    allowedSurfaces: ["case-study"],
    reviewedBy: ["public-safe archival review"],
    reviewedAt: "2026-07-11"
  }
];

export const claims = claimInput.map((claim) => claimSchema.parse(claim));
