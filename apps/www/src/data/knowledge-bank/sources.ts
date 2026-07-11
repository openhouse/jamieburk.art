import { sourceRecordSchema, type SourceRecord } from "./schemas.ts";

const sourceRecordsInput = [
  {
    id: "civic-hall-x-693124020917522433",
    title: "Civic Hall announcement of NYC Council constituent-services hackathon",
    kind: "official-social-post",
    account: "Civic Hall",
    url: "https://x.com/CivicHall/status/693124020917522433",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    accessedAt: "2026-07-11",
    availability: "archived",
    visibility: "public",
    publicNote:
      "Announces '1/30 1-3pm' for a New York City Council hackathon focused on improving constituent services. The Wayback page preserves the post within Civic Hall's embedded social feed; it is not the event's calendar listing."
  },
  {
    id: "nyc-council-x-693509031768506368",
    title: "NYC Council event-day post from Civic Hall",
    kind: "official-social-post",
    account: "New York City Council",
    url: "https://x.com/NYCCouncil/status/693509031768506368",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    accessedAt: "2026-07-11",
    availability: "archived",
    visibility: "public",
    publicNote:
      "Identifies the January 30 gathering at Civic Hall as the Council's first #CouncilStat hackathon."
  },
  {
    id: "nyc-council-hackathon-promotional-graphic",
    title: "New York City Council Hackathon promotional graphic",
    kind: "promotional-graphic",
    url: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    accessedAt: "2026-07-11",
    availability: "live",
    visibility: "public",
    rightsStatus: "Publicly viewable; reproduction rights are not asserted here",
    publicNote:
      "Reads 'New York City Council Hackathon' and labs.council.nyc. This supports event branding, not necessarily the complete formal registration title."
  },
  {
    id: "civic-hall-wayback-2016-01-31",
    title: "Civic Hall page preserving embedded social-feed evidence",
    kind: "archived-carrier-page",
    archivedUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    archiveTimestamp: "2016-01-31T00:46:01Z",
    archiveRelation: "embedded-social-feed-capture",
    accessedAt: "2026-07-11",
    availability: "archived",
    visibility: "public",
    publicNote:
      "Evidence carrier for the Civic Hall and NYC Council posts. It is not a recovered event-calendar listing or dedicated event-detail page."
  },
  {
    id: "callnyc-politico-2016-03-14",
    title: "Website provides new information about council members' focus",
    kind: "independent-reporting",
    author: "Miranda Neubauer",
    publisher: "Politico New York",
    issuedAt: "2016-03-14",
    url:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    accessedAt: "2026-07-11",
    availability: "live",
    visibility: "public",
    publicNote:
      "Reports Jamie's attendance at a January Council hackathon at Civic Hall, his independent development of CallNYC after the full dataset became public, the rapid build for a BetaNYC School of Data event, the resident-facing purpose, and cautions about differing CouncilStat use across district offices."
  },
  {
    id: "callnyc-github-repository",
    title: "CallNYC project repository",
    kind: "project-archive",
    author: "Jamie Burkart",
    publisher: "GitHub",
    url: "https://github.com/openhouse/CallNYC",
    accessedAt: "2026-07-11",
    availability: "live",
    visibility: "public",
    publicNote:
      "Documents the surviving implementation of the independent, archived CallNYC prototype."
  },
  {
    id: "callnyc-digital-district-participant-photo",
    title: "Participant photograph of 'Digital District' discussion",
    kind: "participant-photograph",
    availability: "private",
    visibility: "restricted",
    rightsStatus: "Publication restricted pending rights and consent review",
    publicNote:
      "Participant photograph in the governed archive; publication restricted pending rights and consent review. It shows a placard reading 'Digital District - Help improve City Council District office operations.'",
    internalNote:
      "Publication requires photographer-rights review, participant review, caption review, and crop approval. The photograph does not establish the full event agenda or prove that Digital District was the formal title of the whole event."
  },
  {
    id: "civic-hall-cdx-research-run",
    title: "Civic Hall Wayback/CDX event-page reconstruction",
    kind: "research-run",
    availability: "private",
    visibility: "private",
    publicNote:
      "A governed archival search reviewed 4,630 deduplicated HTML captures representing 1,240 original URLs and 296 distinct event URL keys. No matching calendar listing or dedicated event page was recovered in that search; this does not prove that no such listing ever existed.",
    internalNote:
      "Keep working files and raw capture data outside the public repository."
  }
] satisfies SourceRecord[];

export const sourceRecords = sourceRecordSchema.array().parse(sourceRecordsInput);

export const sourceRecordsById = Object.fromEntries(
  sourceRecords.map((source) => [source.id, source])
) as Record<string, SourceRecord>;
