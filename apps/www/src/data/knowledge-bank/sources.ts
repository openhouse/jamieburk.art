import { sourceRecordSchema, type SourceRecord } from "./schemas.ts";

const sourceRecordsInput = [
  {
    id: "civic-hall-x-693124020917522433",
    title: "Civic Hall announcement of NYC Council constituent-services hackathon",
    kind: "official-social-post",
    visibility: "public",
    availability: "archived",
    account: "Civic Hall",
    accessedAt: "2026-07-11",
    url: "https://x.com/CivicHall/status/693124020917522433",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    publicNote:
      "Announces '1/30 1-3pm' for a New York City Council hackathon focused on improving constituent services. The archived carrier preserves the post within Civic Hall's embedded social feed; it is not the event's calendar listing.",
    establishes: [
      "The announced January 30 date",
      "The announced 1-3 p.m. time",
      "The New York City Council connection",
      "The constituent-services focus"
    ],
    doesNotEstablish: [
      "A complete formal registration title",
      "A full agenda",
      "A participant roster"
    ]
  },
  {
    id: "nyc-council-x-693509031768506368",
    title: "NYC Council event-day post from Civic Hall",
    kind: "official-social-post",
    visibility: "public",
    availability: "archived",
    account: "New York City Council",
    accessedAt: "2026-07-11",
    url: "https://x.com/NYCCouncil/status/693509031768506368",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    publicNote:
      "Identifies the January 30 gathering at Civic Hall as the Council's first #CouncilStat hackathon.",
    establishes: [
      "The January 30 event-day context",
      "The Civic Hall venue",
      "The Council's first-#CouncilStat framing"
    ],
    doesNotEstablish: ["Jamie's role", "A complete event agenda"]
  },
  {
    id: "nyc-council-hackathon-promotional-graphic",
    title: "New York City Council Hackathon promotional graphic",
    kind: "promotional-graphic",
    visibility: "public",
    availability: "live",
    accessedAt: "2026-07-11",
    url: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    publicNote:
      "Visible branding reads 'New York City Council Hackathon' and labs.council.nyc. This does not necessarily establish the complete formal registration title.",
    establishes: ["The visible New York City Council Hackathon branding"],
    doesNotEstablish: ["The complete formal registration title", "The full event agenda"],
    rightsStatus: "Publicly viewable; reproduction rights are not asserted here"
  },
  {
    id: "civic-hall-wayback-2016-01-31",
    title: "Civic Hall page preserving embedded social-feed evidence",
    kind: "archived-carrier-page",
    visibility: "public",
    availability: "archived",
    accessedAt: "2026-07-11",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    publicNote:
      "Evidence carrier for the Civic Hall and NYC Council posts. It is not a recovered event-calendar listing or dedicated event-detail page.",
    establishes: ["The preservation context for embedded public posts"],
    doesNotEstablish: [
      "A recovered Civic Hall calendar listing",
      "A recovered dedicated event-detail page"
    ]
  },
  {
    id: "callnyc-politico-2016-03-14",
    title: "Website provides new information about council members' focus",
    kind: "independent-reporting",
    visibility: "public",
    availability: "live",
    author: "Miranda Neubauer",
    publisher: "Politico New York",
    issuedAt: "2016-03-14",
    accessedAt: "2026-07-11",
    url:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    publicNote:
      "Reports Jamie's attendance at a January Council hackathon at Civic Hall, his independent development of CallNYC after the full dataset became public, the resident-facing purpose, and cautions about differing CouncilStat use across district offices.",
    establishes: [
      "Jamie's attendance at the January Civic Hall gathering",
      "Jamie's independent CallNYC development after the full data release",
      "The project's resident-facing purpose",
      "The need for caution when comparing CouncilStat records"
    ],
    doesNotEstablish: [
      "January 30 as the exact event date by itself",
      "Official Council ownership of CallNYC",
      "Broad public adoption"
    ]
  },
  {
    id: "callnyc-github-repository",
    title: "CallNYC project repository",
    kind: "project-archive",
    visibility: "public",
    availability: "live",
    author: "Jamie Burkart",
    publisher: "GitHub",
    accessedAt: "2026-07-11",
    url: "https://github.com/openhouse/CallNYC",
    publicNote:
      "Documents the surviving implementation of the independent, archived CallNYC prototype.",
    establishes: ["The surviving project implementation"],
    doesNotEstablish: ["Current service status", "Official Council ownership"]
  },
  {
    id: "callnyc-digital-district-participant-photo",
    title: "Participant photograph of Digital District discussion",
    kind: "participant-photograph",
    visibility: "restricted",
    availability: "private",
    publicNote:
      "Participant photograph in the governed archive; publication restricted pending rights and consent review. It shows a placard reading 'Digital District - Help improve City Council District office operations.'",
    internalNote:
      "Publication requires photographer-rights, participant, caption, and crop review.",
    establishes: ["The visible Digital District placard wording"],
    doesNotEstablish: [
      "The formal title of the full hackathon",
      "The complete agenda",
      "Who facilitated the table",
      "A complete participant roster",
      "The event start time"
    ],
    rightsStatus: "Unresolved; publication review required",
    consentStatus: "Unresolved; participant review required"
  },
  {
    id: "civic-hall-cdx-research-run",
    title: "Civic Hall Wayback and CDX event-page reconstruction",
    kind: "research-run",
    visibility: "private",
    availability: "private",
    publicNote:
      "A governed archival search reviewed 4,630 deduplicated HTML captures representing 1,240 original URLs and 296 event URL keys. No matching event listing was recovered in that documented search; this does not prove that no listing ever existed.",
    internalNote: "Raw captures and working materials remain outside the public repository.",
    establishes: ["The result of the documented archival search"],
    doesNotEstablish: ["That no event listing ever existed"]
  }
] satisfies SourceRecord[];

export const sourceRecords = sourceRecordSchema.array().parse(sourceRecordsInput);
export const sourceRecordsById = Object.fromEntries(
  sourceRecords.map((source) => [source.id, source])
) as Record<string, SourceRecord>;
