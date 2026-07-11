import { evidenceNoteRecordSchema, type EvidenceNoteRecord } from "./schemas.ts";

const evidenceNoteRecordsInput = [
  {
    id: "callnyc-event-date-time",
    title: "January 30 Civic Hall constituent-services hackathon",
    claimIds: [
      "callnyc.event.date-and-venue",
      "callnyc.event.time",
      "callnyc.event.constituent-services-purpose"
    ],
    sourceIds: [
      "civic-hall-x-693124020917522433",
      "nyc-council-x-693509031768506368",
      "civic-hall-wayback-2016-01-31"
    ],
    publicSummary:
      "Civic Hall announced a January 30, 2016 New York City Council hackathon focused on constituent services for 1-3 p.m.; the Council posted from Civic Hall that day.",
    qualification:
      "The Wayback page preserves the posts through an embedded social feed, not a recovered Civic Hall calendar listing.",
    preferredSourceId: "civic-hall-x-693124020917522433",
    renderMode: "full"
  },
  {
    id: "callnyc-event-branding-councilstat",
    title: "Recovered event branding and CouncilStat context",
    claimIds: ["callnyc.event.branding", "callnyc.event.councilstat"],
    sourceIds: [
      "nyc-council-hackathon-promotional-graphic",
      "nyc-council-x-693509031768506368",
      "civic-hall-wayback-2016-01-31"
    ],
    publicSummary:
      "The promotional graphic reads 'New York City Council Hackathon,' while the Council's event-day post calls the gathering its first #CouncilStat hackathon.",
    qualification:
      "The graphic establishes recovered event branding, not the complete formal registration title. The Wayback page is an embedded-feed carrier.",
    preferredSourceId: "nyc-council-hackathon-promotional-graphic",
    renderMode: "full"
  },
  {
    id: "callnyc-participation-follow-on",
    title: "Jamie's participation and independent CallNYC follow-on",
    claimIds: ["callnyc.participation-and-follow-on"],
    sourceIds: ["callnyc-politico-2016-03-14", "callnyc-github-repository"],
    publicSummary:
      "Politico New York reports Jamie's attendance at the January Civic Hall gathering and independent development of CallNYC after the full CouncilStat dataset became public; the repository preserves the implementation.",
    qualification:
      "CallNYC was an independent follow-on, not a commissioned Council product, formal hackathon submission, or official service.",
    preferredSourceId: "callnyc-politico-2016-03-14",
    renderMode: "full"
  },
  {
    id: "callnyc-product-method",
    title: "Resident-facing translation and responsible data limits",
    claimIds: [
      "callnyc.product-method",
      "callnyc.project.archived-unofficial-status"
    ],
    sourceIds: ["callnyc-politico-2016-03-14", "callnyc-github-repository"],
    publicSummary:
      "Contemporaneous reporting and the public repository document issue-oriented pages, office contact paths, and explicit caution around uneven CouncilStat records.",
    qualification:
      "Administrative case totals could reveal patterns, but did not independently measure office performance, specialization, resident need, case resolution, efficiency, or satisfaction.",
    preferredSourceId: "callnyc-politico-2016-03-14",
    renderMode: "full"
  },
  {
    id: "callnyc-digital-district-photo",
    title: "Restricted participant photograph of Digital District discussion",
    claimIds: ["callnyc.event.digital-district"],
    sourceIds: ["callnyc-digital-district-participant-photo"],
    publicSummary:
      "A participant photograph in the governed archive shows a placard reading 'Digital District - Help improve City Council District office operations.'",
    qualification:
      "Publication is restricted pending rights and consent review. The image does not establish the full event title, agenda, facilitator, roster, or schedule.",
    renderMode: "summary-only"
  },
  {
    id: "callnyc-calendar-search-limit",
    title: "Documented archival search and its limit",
    claimIds: ["callnyc.research.calendar-not-recovered"],
    sourceIds: ["civic-hall-cdx-research-run"],
    publicSummary:
      "A governed search reviewed 4,630 deduplicated HTML captures representing 1,240 original URLs. An all-status event-prefix pass found 296 event URL keys: 215 successful pages, 74 redirects, and seven 404 captures. No matching event slug was recovered.",
    qualification:
      "No matching listing was recovered in the documented search. This does not prove that no listing ever existed.",
    renderMode: "summary-only"
  }
] satisfies EvidenceNoteRecord[];

export const evidenceNoteRecords = evidenceNoteRecordSchema
  .array()
  .parse(evidenceNoteRecordsInput);
export const evidenceNoteRecordsById = Object.fromEntries(
  evidenceNoteRecords.map((note) => [note.id, note])
) as Record<string, EvidenceNoteRecord>;
