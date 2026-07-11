import { citationNoteRecordSchema, type CitationNoteRecord } from "./schemas.ts";

const citationNoteRecordsInput = [
  {
    id: "callnyc-event",
    shortLabel: "event date, place, and hours",
    claimIds: ["callnyc-event-date-time"],
    sourceIds: [
      "civic-hall-hackathon-announcement-2016",
      "nyc-council-councilstat-hackathon-post-2016",
      "civic-hall-embedded-feed-wayback-2016-01-31"
    ],
    publicNote:
      "Civic Hall announced a January 30, 2016 New York City Council constituent-services hackathon for 1-3 p.m. The Council posted from Civic Hall on the event day.",
    publicCaveat:
      "The Wayback capture preserves these posts through an embedded social feed; it is not a recovered Civic Hall calendar listing or dedicated event page."
  },
  {
    id: "callnyc-branding-and-councilstat",
    shortLabel: "event branding and CouncilStat context",
    claimIds: ["callnyc-event-branding", "callnyc-councilstat-context"],
    sourceIds: [
      "civic-hall-hackathon-promotional-graphic-2016",
      "nyc-council-councilstat-hackathon-post-2016",
      "civic-hall-embedded-feed-wayback-2016-01-31"
    ],
    publicNote:
      "The promotional graphic reads 'New York City Council Hackathon.' The Council described the gathering as its first CouncilStat hackathon.",
    publicCaveat:
      "The graphic supports recovered event branding, not a longer formal registration title."
  },
  {
    id: "callnyc-digital-district",
    shortLabel: "Digital District breakout",
    claimIds: ["callnyc-digital-district-breakout"],
    sourceIds: ["participant-archive-digital-district-2016"],
    publicNote:
      "A private participant photograph documents a breakout placard reading 'Digital District - Help improve City Council District office operations.'",
    publicCaveat:
      "This supports a breakout-table title only. The photograph remains private, and its approximate 2:10 p.m. timestamp is not the event start time."
  },
  {
    id: "callnyc-project-and-iteration",
    shortLabel: "independent project and iteration",
    claimIds: ["callnyc-independent-follow-on", "callnyc-rapid-build-and-iteration"],
    sourceIds: ["politico-callnyc-2016-03-14", "callnyc-source-repository"],
    publicNote:
      "Politico New York reported the sequence from the Civic Hall event and full CouncilStat release to Jamie's independent development of CallNYC, including search/share choices and later contact-option changes. The public repository preserves the implementation.",
    publicCaveat:
      "CallNYC was an independent follow-on, not a commissioned Council product, formal hackathon submission, or official service."
  },
  {
    id: "callnyc-data-limits",
    shortLabel: "data filtering and interpretive limits",
    claimIds: ["callnyc-data-limitations"],
    sourceIds: ["politico-callnyc-2016-03-14"],
    publicNote:
      "Politico described Jamie's exclusion of records without borough data as a way to reduce apparent spam or out-of-city entries and reported the limits he placed on reading office case totals.",
    publicCaveat:
      "The dataset does not independently measure office quality, effectiveness, specialization, resident need, case resolution, efficiency, or constituent satisfaction."
  },
  {
    id: "callnyc-archive-status",
    shortLabel: "archived and unofficial status",
    claimIds: ["callnyc-archived-unofficial-status"],
    sourceIds: ["callnyc-source-repository", "politico-callnyc-2016-03-14"],
    publicNote:
      "The surviving repository and contemporaneous coverage document CallNYC as Jamie's independent civic-data prototype.",
    publicCaveat:
      "It is archived and unofficial. Historical officeholders, rankings, statistics, categories, and contact information are not present-day constituent-service guidance."
  }
] satisfies CitationNoteRecord[];

export const citationNoteRecords = citationNoteRecordSchema
  .array()
  .parse(citationNoteRecordsInput);

export const citationNoteRecordsById = Object.fromEntries(
  citationNoteRecords.map((note) => [note.id, note])
) as Record<string, CitationNoteRecord>;
