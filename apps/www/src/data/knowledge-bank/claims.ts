import { claimRecordSchema, type ClaimRecord } from "./schema.ts";

const claimRecordsInput = [
  {
    id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
    project: "callnyc",
    internalClaim:
      "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
    publicProjection:
      "On January 30, 2016, the New York City Council held a 1-3 p.m. hackathon at Civic Hall focused on constituent services.",
    status: "confirmed",
    citationRequired: true,
    surfaces: ["/work/callnyc"],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
        relationship: "direct-support",
        supports: ["date", "time", "organizer", "constituent-services purpose"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
        relationship: "corroborating",
        supports: ["date", "venue", "CouncilStat context"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Do not describe the Wayback page as the recovered event calendar listing."
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
    project: "callnyc",
    internalClaim:
      "The New York City Council described the gathering as its first CouncilStat hackathon.",
    publicProjection:
      "The Council described the gathering as its first CouncilStat hackathon.",
    status: "confirmed-with-boundary",
    citationRequired: true,
    surfaces: ["/work/callnyc", "/resume"],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
        relationship: "direct-support",
        supports: ["the Council's own first-CouncilStat description"],
        confidence: "high",
        renderCitation: true
      }
    ],
    antiClaims: [
      "New York City Council's first civic-data hackathon",
      "New York City's first civic-technology hackathon",
      "the Council's first hackathon of any kind"
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-EVENT-BRANDING",
    project: "callnyc",
    internalClaim:
      "The recovered promotional graphic used the branding 'New York City Council Hackathon.'",
    publicProjection:
      "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
    status: "confirmed-with-boundary",
    citationRequired: true,
    surfaces: ["/work/callnyc"],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
        relationship: "direct-support",
        supports: ["graphic wording", "event branding"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Treat this as recovered branding, not proof of a longer formal registration title."
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-DIGITAL-DISTRICT",
    project: "callnyc",
    internalClaim:
      "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
    status: "use-with-care",
    citationRequired: true,
    surfaces: [],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
        relationship: "private-support",
        supports: ["placard wording", "breakout-table interpretation"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not describe Digital District as the official event title.",
      "Do not publish the photograph before rights, consent, and editorial review."
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-CIVIC-HALL-CALENDAR-NOT-RECOVERED",
    project: "callnyc",
    internalClaim:
      "No Wayback-captured Civic Hall calendar listing or dedicated event-detail page was recovered in the deeper CDX review.",
    status: "not-recovered",
    citationRequired: false,
    surfaces: [],
    evidence: [],
    boundaries: [
      "The archived embedded social feed independently supports the date, time, venue, branding, CouncilStat context, and constituent-services purpose.",
      "Do not describe that embedded feed as a recovered calendar listing."
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
    project: "callnyc",
    internalClaim:
      "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
    publicProjection:
      "After the fuller CouncilStat dataset was released, Jamie developed CallNYC.org as an independent public-facing interpretation of those constituent-services records.",
    shortProjection:
      "Built an independent civic-data follow-on translating CouncilStat records into resident-facing guidance.",
    status: "confirmed-with-boundary",
    citationRequired: true,
    surfaces: ["/work/callnyc", "/resume"],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
        relationship: "direct-support",
        supports: [
          "the sequence from the January event through the full data release",
          "Jamie's independent development and iteration of CallNYC",
          "Politico New York coverage"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY",
        relationship: "corroborating",
        supports: ["the surviving implementation of the independent prototype"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "CallNYC was an independent participant-led follow-on, not an official Council product, documented formal submission, or winner."
    ],
    antiClaims: [
      "Jamie caused the CouncilStat release",
      "CallNYC was commissioned by the Council",
      "CallNYC was a winning hackathon submission"
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
    project: "callnyc",
    internalClaim:
      "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
    publicProjection:
      "CallNYC is an archived independent prototype, not an official or current New York City Council service.",
    status: "confirmed-with-boundary",
    citationRequired: true,
    surfaces: ["/work/callnyc"],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY",
        relationship: "direct-support",
        supports: ["the surviving independent implementation"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
        relationship: "context",
        supports: ["contemporaneous independent-project framing"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Historical officeholders, statistics, categories, and contact information are not current guidance."
    ],
    reviewedAt: "2026-07-11"
  }
] satisfies ClaimRecord[];

export const claimRecords = claimRecordSchema.array().parse(claimRecordsInput);
