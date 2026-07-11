import { claimRecordSchema, type ClaimRecord } from "./schemas.ts";

const claimRecordsInput = [
  {
    id: "callnyc.event.date-and-venue",
    publicText:
      "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "civic-hall-x-693124020917522433",
        relationship: "supports",
        locator: "Announcement text",
        supportNote: "Supports January 30 and the constituent-services focus.",
        limitationNote: "Does not establish the complete title, agenda, or roster."
      },
      {
        sourceId: "nyc-council-x-693509031768506368",
        relationship: "supports",
        locator: "Event-day post",
        supportNote: "Supports January 30, Civic Hall, and CouncilStat context."
      },
      {
        sourceId: "callnyc-digital-district-participant-photo",
        relationship: "contextualizes",
        supportNote: "Provides restricted participant-archive corroboration.",
        limitationNote: "The photograph is not publicly linked."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: ["Jamie organized, led, or officially represented the hackathon."]
  },
  {
    id: "callnyc.event.time",
    publicText: "Civic Hall announced the event for 1-3 p.m.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "civic-hall-x-693124020917522433",
        relationship: "supports",
        locator: "Announcement text",
        supportNote: "Directly supports the announced 1-3 p.m. hours.",
        limitationNote: "Announced hours are not proof of exact start or end times."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: [
      "The event began at 2:10 p.m.",
      "The participant photograph establishes the full schedule."
    ]
  },
  {
    id: "callnyc.event.branding",
    publicText:
      "A Council-branded promotional graphic called it the 'New York City Council Hackathon.'",
    status: "qualified",
    confidence: "high",
    qualifiers: [
      "This is recovered event branding, not proof of the complete formal registration title."
    ],
    evidence: [
      {
        sourceId: "nyc-council-hackathon-promotional-graphic",
        relationship: "supports",
        locator: "Visible graphic text",
        supportNote: "Supports the recovered branding and labs.council.nyc address.",
        limitationNote: "Does not establish the complete formal registration title."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: ["Digital District was the formal title of the full hackathon."]
  },
  {
    id: "callnyc.event.councilstat",
    publicText: "NYC Council identified the gathering as its first #CouncilStat hackathon.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "nyc-council-x-693509031768506368",
        relationship: "supports",
        locator: "Event-day post",
        supportNote: "Directly supports the Council's first-#CouncilStat framing."
      },
      {
        sourceId: "civic-hall-wayback-2016-01-31",
        relationship: "contextualizes",
        supportNote: "Preserves the post within an embedded social feed.",
        limitationNote: "The carrier is not a dedicated event page."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: ["Jamie caused the CouncilStat release."]
  },
  {
    id: "callnyc.event.constituent-services-purpose",
    publicText:
      "Civic Hall described the hackathon as focused on improving constituent services.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "civic-hall-x-693124020917522433",
        relationship: "supports",
        supportNote: "Directly supports the constituent-services focus."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11"
  },
  {
    id: "callnyc.event.digital-district",
    publicText:
      "A participant photograph documents a Digital District discussion focused on improving City Council district-office operations.",
    status: "qualified",
    confidence: "high",
    qualifiers: ["The photograph remains restricted pending rights and consent review."],
    evidence: [
      {
        sourceId: "callnyc-digital-district-participant-photo",
        relationship: "supports",
        locator: "Visible placard text",
        supportNote: "Supports the visible Digital District wording and district-office prompt.",
        limitationNote:
          "Does not establish the full event title, agenda, facilitator, roster, or schedule."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: [
      "Digital District was the formal title of the full hackathon.",
      "The photograph establishes the complete discussion agenda.",
      "The photograph proves who facilitated the table.",
      "The photograph establishes a complete participant roster."
    ],
    protectedBoundary:
      "Do not publish the image, private metadata, participant identities, or archive locator without rights and consent review."
  },
  {
    id: "callnyc.participation-and-follow-on",
    publicText:
      "Jamie attended the Council hackathon at Civic Hall and later independently developed CallNYC after the full CouncilStat dataset became public.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "callnyc-politico-2016-03-14",
        relationship: "supports",
        supportNote:
          "Supports Jamie's attendance, the subsequent full data release, and independent development."
      },
      {
        sourceId: "callnyc-github-repository",
        relationship: "contextualizes",
        supportNote: "Documents the surviving implementation."
      }
    ],
    projectionSurfaces: ["work-card", "case-study", "technical-operations"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: [
      "CallNYC was commissioned by the Council.",
      "CallNYC was an official hackathon submission or winning entry.",
      "CallNYC was an official Council product."
    ]
  },
  {
    id: "callnyc.product-method",
    publicText:
      "CallNYC reorganized constituent-service records into issue-oriented pages and office contact paths while making the limits of inconsistent administrative records visible.",
    status: "qualified",
    confidence: "high",
    qualifiers: [
      "CouncilStat totals could reveal patterns but were not a simple performance ranking."
    ],
    evidence: [
      {
        sourceId: "callnyc-politico-2016-03-14",
        relationship: "supports",
        supportNote:
          "Supports the resident-facing purpose, issue organization, contact-path iteration, and caution around uneven CouncilStat use."
      },
      {
        sourceId: "callnyc-github-repository",
        relationship: "supports",
        supportNote: "Documents the surviving implementation."
      }
    ],
    projectionSurfaces: ["work-card", "case-study", "technical-operations"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: [
      "CouncilStat totals independently measure office performance, specialization, or resident need.",
      "CallNYC produced measured improvements in resolution, efficiency, or satisfaction."
    ]
  },
  {
    id: "callnyc.project.archived-unofficial-status",
    publicText:
      "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
    status: "approved",
    confidence: "high",
    evidence: [
      {
        sourceId: "callnyc-github-repository",
        relationship: "supports",
        supportNote: "Documents the surviving independent implementation."
      },
      {
        sourceId: "callnyc-politico-2016-03-14",
        relationship: "contextualizes",
        supportNote: "Provides contemporaneous independent-project framing."
      }
    ],
    projectionSurfaces: ["work-card", "case-study", "technical-operations"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: [
      "CallNYC is a current service.",
      "CallNYC is official City Council guidance."
    ]
  },
  {
    id: "callnyc.research.calendar-not-recovered",
    publicText:
      "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented archival search.",
    status: "qualified",
    confidence: "medium-high",
    qualifiers: [
      "The finding is limited to the documented search and does not prove that no listing ever existed."
    ],
    evidence: [
      {
        sourceId: "civic-hall-cdx-research-run",
        relationship: "supports",
        supportNote:
          "The documented search reviewed 4,630 captures, 1,240 original URLs, and 296 event URL keys without recovering a matching listing.",
        limitationNote:
          "A negative archival finding does not prove that no listing or dedicated page ever existed."
      }
    ],
    projectionSurfaces: ["case-study"],
    approvalOwner: "Jamie Burkart",
    approvedAt: "2026-07-11",
    antiClaims: ["No Civic Hall event listing ever existed."],
    protectedBoundary: "Do not expose raw captures, downloaded corpora, or working paths."
  }
] satisfies ClaimRecord[];

export const claimRecords = claimRecordSchema.array().parse(claimRecordsInput);
export const claimRecordsById = Object.fromEntries(
  claimRecords.map((claim) => [claim.id, claim])
) as Record<string, ClaimRecord>;
