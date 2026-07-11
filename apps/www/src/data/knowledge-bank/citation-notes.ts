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
      "civic-hall-wayback-2016-01-31",
      "callnyc-digital-district-participant-photo"
    ],
    publicSummary:
      "Civic Hall announced a January 30, 2016 New York City Council hackathon focused on improving constituent services for 1-3 p.m.; the Council posted from Civic Hall on the event day.",
    qualification:
      "The Wayback page preserves the public posts within an embedded social feed, not a recovered Civic Hall calendar listing. The restricted participant photograph provides contextual corroboration only and is not linked.",
    preferredSourceId: "civic-hall-x-693124020917522433"
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
    preferredSourceId: "nyc-council-hackathon-promotional-graphic"
  },
  {
    id: "callnyc-participation-follow-on",
    title: "Jamie's participation and independent CallNYC follow-on",
    claimIds: ["callnyc.participation-and-follow-on"],
    sourceIds: ["callnyc-politico-2016-03-14", "callnyc-github-repository"],
    publicSummary:
      "Politico New York reports Jamie's attendance at the January Civic Hall gathering and his independent development of CallNYC after the full CouncilStat dataset became public; the repository preserves the implementation.",
    qualification:
      "CallNYC was an independent follow-on, not a commissioned Council product, formal hackathon submission, or official service.",
    preferredSourceId: "callnyc-politico-2016-03-14"
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
      "Contemporaneous reporting and the public repository document issue-oriented pages, office contact paths, search and sharing choices, and explicit caution around uneven CouncilStat records.",
    qualification:
      "Administrative case totals could reveal patterns, but they did not independently measure office quality, effectiveness, specialization, resident need, case resolution, efficiency, or constituent satisfaction.",
    preferredSourceId: "callnyc-politico-2016-03-14"
  },
  {
    id: "callnyc-digital-district-photo",
    title: "Restricted participant photograph of Digital District discussion",
    claimIds: ["callnyc.event.digital-district"],
    sourceIds: ["callnyc-digital-district-participant-photo"],
    publicSummary:
      "A participant photograph in the governed archive shows a placard reading 'Digital District - Help improve City Council District office operations.'",
    qualification:
      "Publication is restricted pending rights and consent review. The photograph does not establish the full event title, complete agenda, full roster, or event start time."
  },
  {
    id: "callnyc-calendar-search-limit",
    title: "Documented archival search and its limit",
    claimIds: ["callnyc.research.calendar-not-recovered"],
    sourceIds: ["civic-hall-cdx-research-run"],
    publicSummary:
      "A governed archival search reviewed 4,630 deduplicated HTML captures representing 1,240 original URLs. An all-status event-prefix pass found 296 distinct event URL keys: 215 successful pages, 74 redirects, and seven 404 captures. No matching CouncilStat, constituent-services, or NYC Council event slug was recovered.",
    qualification:
      "This means no matching calendar listing or dedicated event page was recovered in the documented search. It does not prove that no such listing ever existed."
  }
] satisfies EvidenceNoteRecord[];

export const evidenceNoteRecords = evidenceNoteRecordSchema
  .array()
  .parse(evidenceNoteRecordsInput);

export const evidenceNoteRecordsById = Object.fromEntries(
  evidenceNoteRecords.map((note) => [note.id, note])
) as Record<string, EvidenceNoteRecord>;

// Backward-compatible aliases while the first citation pilot lands.
export const citationNoteRecords = evidenceNoteRecords;
export const citationNoteRecordsById = evidenceNoteRecordsById;
