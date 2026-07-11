import {
  citationNoteSchema,
  type CitationNoteRecord
} from "./schema.ts";

const noteInput: CitationNoteRecord[] = [
  {
    id: "callnyc-event",
    shortLabel: "event date, hours, and Jamie's participation",
    claimIds: ["callnyc-event-date-time", "callnyc-jamie-participation"],
    sourceIds: [
      "civic-hall-hackathon-announcement-2016",
      "civic-hall-embedded-feed-wayback-2016-01-31",
      "politico-callnyc-2016-03-14"
    ],
    publicNote:
      "Civic Hall announced the constituent-services gathering for January 30, 2016, from 1-3 p.m. Politico New York independently connects Jamie to the January event.",
    publicCaveat:
      "The Wayback evidence is an embedded social feed, not a recovered Civic Hall calendar listing."
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
      "The recovered graphic reads 'New York City Council Hackathon'; the Council's event-day post describes its first CouncilStat hackathon.",
    publicCaveat:
      "The graphic supports recovered event branding, not a longer formal registration title."
  },
  {
    id: "callnyc-digital-district",
    shortLabel: "Digital District breakout",
    claimIds: ["callnyc-digital-district-breakout"],
    sourceIds: ["participant-archive-digital-district-2016"],
    publicNote:
      "A protected participant photograph records a breakout-table placard reading 'Digital District - Help improve City Council District office operations' and a breakout underway at approximately 2:10 p.m.",
    publicCaveat:
      "This supports a breakout title only. It does not establish the overall event title or start time, and the image is not published."
  },
  {
    id: "callnyc-project-and-iteration",
    shortLabel: "independent project, product method, and iteration",
    claimIds: [
      "callnyc-independent-follow-on",
      "callnyc-product-method",
      "callnyc-use-and-iteration"
    ],
    sourceIds: ["politico-callnyc-2016-03-14", "callnyc-source-repository"],
    publicNote:
      "Politico New York documents the full data release, Jamie's independent follow-on, his handling of records without borough data, search/share work, and iteration after prospective-user conversations. The repository documents the surviving implementation.",
    publicCaveat:
      "These sources do not establish official Council ownership, commissioning, a hackathon submission or award, broad adoption, or measured service outcomes."
  },
  {
    id: "callnyc-data-limits",
    shortLabel: "CouncilStat data limits",
    claimIds: ["callnyc-data-limitations"],
    sourceIds: ["politico-callnyc-2016-03-14"],
    publicNote:
      "Politico New York records limits in the source data and in what could responsibly be inferred from CouncilStat case totals.",
    publicCaveat:
      "Totals should not be read as simple measures of office quality, effectiveness, specialization, or resident need."
  },
  {
    id: "callnyc-archive-status",
    shortLabel: "archived and unofficial status",
    claimIds: ["callnyc-archived-unofficial-status"],
    sourceIds: ["callnyc-source-repository"],
    publicNote:
      "The public repository preserves the independent implementation. The project is presented here as a historical prototype.",
    publicCaveat:
      "CallNYC is not an official or current New York City Council service."
  }
];

export const citationNotes = noteInput.map((note) => citationNoteSchema.parse(note));
