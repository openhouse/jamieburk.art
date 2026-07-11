import { claimRecordSchema, type ClaimRecord } from "./schemas.ts";

const callNYCAntiClaims = {
  event: [
    "Do not say Jamie organized, led, or officially represented the hackathon.",
    "Do not say Speaker Melissa Mark-Viverito attended."
  ],
  branding: [
    "Do not say Digital District was the event's official title.",
    "Do not describe the Wayback capture as a recovered Civic Hall calendar listing."
  ],
  breakout: [
    "Do not say 2:10 p.m. was the event's start time.",
    "Do not say Jamie authored all participant recommendations."
  ],
  project: [
    "Do not say Jamie caused the CouncilStat release.",
    "Do not describe CallNYC as an official Council product.",
    "Do not describe CallNYC as commissioned, a formal hackathon submission, or a winning entry."
  ],
  data: [
    "Do not treat CouncilStat totals as simple measures of office quality, effectiveness, specialization, or resident need.",
    "Do not claim measured improvements in case resolution, district-office efficiency, or constituent satisfaction."
  ]
};

const claimRecordsInput = [
  {
    id: "callnyc-event-date-time",
    projectId: "callnyc",
    publicText:
      "A New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016; Civic Hall announced it for 1-3 p.m.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    evidence: [
      {
        sourceId: "civic-hall-hackathon-announcement-2016",
        relation: "supports",
        locator: "Post text",
        supports: "The January 30 date, 1-3 p.m. hours, Council connection, and constituent-services focus.",
        doesNotSupport: "A full agenda, roster, or formal registration title."
      },
      {
        sourceId: "nyc-council-councilstat-hackathon-post-2016",
        relation: "corroborates",
        locator: "Event-day post",
        supports: "The event date, Civic Hall location, and CouncilStat context."
      },
      {
        sourceId: "civic-hall-embedded-feed-wayback-2016-01-31",
        relation: "corroborates",
        supports: "The survival of both posts in Civic Hall's embedded social feed.",
        doesNotSupport: "A recovered calendar listing or dedicated event page."
      }
    ],
    caveat: "No dedicated Civic Hall event-detail or calendar listing was recovered.",
    antiClaims: callNYCAntiClaims.event,
    publicSurfaces: ["callnyc-case-study"],
    reviewedBy: ["Jamie Burkart", "Citational care editorial review"],
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
    evidence: [
      {
        sourceId: "civic-hall-hackathon-promotional-graphic-2016",
        relation: "supports",
        locator: "Visible graphic text",
        supports: "The recovered promotional branding and labs.council.nyc address.",
        doesNotSupport: "A longer formal registration title."
      }
    ],
    caveat: "Recovered event branding is not a complete formal title.",
    antiClaims: callNYCAntiClaims.branding,
    publicSurfaces: ["callnyc-case-study"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-councilstat-context",
    projectId: "callnyc",
    publicText:
      "The Council described the Civic Hall gathering on the event day as its first CouncilStat hackathon.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    evidence: [
      {
        sourceId: "nyc-council-councilstat-hackathon-post-2016",
        relation: "supports",
        supports: "The Council's event-day description of the gathering."
      },
      {
        sourceId: "civic-hall-embedded-feed-wayback-2016-01-31",
        relation: "corroborates",
        supports: "The embedded-feed preservation of the Council post."
      }
    ],
    antiClaims: ["Do not say Jamie caused the CouncilStat release."],
    publicSurfaces: ["callnyc-case-study"],
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
    evidence: [
      {
        sourceId: "participant-archive-digital-district-2016",
        relation: "supports",
        locator: "Visible placard text",
        supports: "The breakout-table title, district-office prompt, and an approximate image timestamp.",
        doesNotSupport: "The overall event title, event start time, roster, or facilitator."
      }
    ],
    caveat: "The participant photograph remains private and has no public link.",
    antiClaims: callNYCAntiClaims.breakout,
    publicSurfaces: ["callnyc-case-study"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-independent-follow-on",
    projectId: "callnyc",
    publicText:
      "After the complete CouncilStat dataset was released, Jamie independently built CallNYC as a resident-facing translation layer.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    evidence: [
      {
        sourceId: "politico-callnyc-2016-03-14",
        relation: "supports",
        supports: "The sequence from the January event through the full data release to Jamie's independent project."
      },
      {
        sourceId: "callnyc-source-repository",
        relation: "corroborates",
        supports: "The surviving implementation of the independent prototype."
      }
    ],
    caveat: "CallNYC was an independent follow-on, not an official Council product.",
    antiClaims: callNYCAntiClaims.project,
    publicSurfaces: ["callnyc-case-study"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-rapid-build-and-iteration",
    projectId: "callnyc",
    publicText:
      "Jamie organized records into issue pathways, optimized pages for search and sharing, and expanded contact options after conversations with prospective users.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    evidence: [
      {
        sourceId: "politico-callnyc-2016-03-14",
        relation: "supports",
        supports: "The project's build sequence, public-discovery approach, and contact-option iteration."
      },
      {
        sourceId: "callnyc-source-repository",
        relation: "corroborates",
        supports: "The surviving implementation."
      }
    ],
    antiClaims: [
      "Do not claim broad adoption from prospective-user conversations.",
      "Do not claim measured improvements in constituent outcomes."
    ],
    publicSurfaces: ["callnyc-case-study"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "callnyc-data-limitations",
    projectId: "callnyc",
    publicText:
      "Jamie filtered records without borough data as one method of excluding apparent spam or out-of-city entries and kept the dataset's interpretive limits visible.",
    status: "approved",
    strength: "corroborated",
    mustCite: true,
    evidence: [
      {
        sourceId: "politico-callnyc-2016-03-14",
        relation: "supports",
        supports: "The borough-data filtering method and stated limits on interpreting constituent-service totals.",
        doesNotSupport: "Simple rankings of office quality, effectiveness, specialization, or resident need."
      }
    ],
    caveat: "Administrative case totals require context and do not measure service quality on their own.",
    antiClaims: callNYCAntiClaims.data,
    publicSurfaces: ["callnyc-case-study"],
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
    evidence: [
      {
        sourceId: "callnyc-source-repository",
        relation: "supports",
        supports: "The surviving independent implementation and archived project context."
      },
      {
        sourceId: "politico-callnyc-2016-03-14",
        relation: "contextualizes",
        supports: "Contemporaneous independent-project framing."
      }
    ],
    antiClaims: [
      "Do not describe CallNYC as an official Council product or current service.",
      "Do not use historical officeholders, rankings, statistics, categories, or contact information as present-day guidance."
    ],
    publicSurfaces: ["callnyc-case-study"],
    reviewedAt: "2026-07-11"
  }
] satisfies ClaimRecord[];

export const claimRecords = claimRecordSchema.array().parse(claimRecordsInput);

export const claimRecordsById = Object.fromEntries(
  claimRecords.map((claim) => [claim.id, claim])
) as Record<string, ClaimRecord>;
