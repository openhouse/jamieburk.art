import { sourceRecordSchema, type SourceRecord } from "./schemas.ts";

const sourceRecordsInput = [
  {
    id: "civic-hall-hackathon-announcement-2016",
    title: "Civic Hall announcement of the New York City Council hackathon",
    shortLabel: "Civic Hall hackathon announcement",
    authorOrAccount: "Civic Hall",
    publisher: "X",
    datePublished: "2016-01-29",
    sourceClass: "official-organizational-social",
    mediaType: "social-post",
    publicationStatus: "public-with-caveat",
    canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "Civic Hall announced a January 30 New York City Council hackathon focused on constituent services and gave the event hours as 1-3 p.m.",
    researchNote:
      "Use for the announced date, time, and constituent-services focus, not for a participant roster, agenda, or formal registration title."
  },
  {
    id: "civic-hall-hackathon-promotional-graphic-2016",
    title: "New York City Council Hackathon promotional graphic",
    shortLabel: "Council hackathon graphic",
    authorOrAccount: "Civic Hall",
    datePublished: "2016-01-29",
    sourceClass: "official-organizational-social",
    mediaType: "image",
    publicationStatus: "public-with-caveat",
    canonicalUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    rightsStatus: "Publicly viewable; reproduction rights not asserted",
    publicSourceNote:
      "The Council-branded graphic reads 'New York City Council Hackathon' and displays labs.council.nyc.",
    researchNote:
      "Treat this as recovered event branding, not proof of a longer formal registration title."
  },
  {
    id: "nyc-council-councilstat-hackathon-post-2016",
    title: "New York City Council post from the first CouncilStat hackathon",
    shortLabel: "CouncilStat event-day post",
    authorOrAccount: "New York City Council",
    publisher: "X",
    datePublished: "2016-01-30",
    sourceClass: "official-organizational-social",
    mediaType: "social-post",
    publicationStatus: "public-with-caveat",
    canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "The New York City Council posted from Civic Hall on January 30 and described the gathering as its first CouncilStat hackathon."
  },
  {
    id: "civic-hall-embedded-feed-wayback-2016-01-31",
    title: "Civic Hall events page with embedded social feed",
    shortLabel: "Civic Hall embedded-feed capture",
    publisher: "Internet Archive Wayback Machine",
    datePublished: "2016-01-31",
    sourceClass: "web-archive",
    mediaType: "web-page",
    publicationStatus: "public-with-caveat",
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    originalUrl: "http://civichall.org/events/page/2/",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "archived",
    publicSourceNote:
      "A January 31 Wayback capture preserves the Civic Hall and Council posts inside Civic Hall's embedded social feed.",
    researchNote:
      "This is evidence from an embedded social feed, not a recovered Civic Hall calendar listing or dedicated event page."
  },
  {
    id: "participant-archive-digital-district-2016",
    title: "Participant photograph of the Digital District breakout",
    shortLabel: "Participant photograph",
    datePublished: "2016-01-30",
    sourceClass: "participant-archive",
    mediaType: "photograph",
    publicationStatus: "private",
    linkStatus: "unavailable",
    rightsStatus: "Private participant archive; not cleared for publication",
    publicSourceNote:
      "A participant-archive photograph shows a 'Digital District' placard, the district-office-operations prompt, and a breakout underway at approximately 2:10 p.m. No public link is provided.",
    researchNote:
      "The image supports the breakout-table title and an approximate image timestamp, not the overall event title, event start time, participant roster, or facilitation credit."
  },
  {
    id: "politico-callnyc-2016-03-14",
    title: "Website provides new information about council members' focus",
    shortLabel: "Politico New York coverage",
    authorOrAccount: "Miranda Neubauer",
    publisher: "Politico New York",
    datePublished: "2016-03-14",
    sourceClass: "independent-journalism",
    mediaType: "pdf",
    publicationStatus: "public",
    canonicalUrl:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "Politico New York connected Jamie to the January Civic Hall gathering, the later full CouncilStat data release, and his independent development and iteration of CallNYC."
  },
  {
    id: "callnyc-source-repository",
    title: "CallNYC source repository",
    shortLabel: "CallNYC repository",
    authorOrAccount: "openhouse",
    publisher: "GitHub",
    sourceClass: "primary-project",
    mediaType: "repository",
    publicationStatus: "public",
    canonicalUrl: "https://github.com/openhouse/CallNYC",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "The public repository documents the surviving implementation of the independent, archived CallNYC prototype."
  }
] satisfies SourceRecord[];

export const sourceRecords = sourceRecordSchema.array().parse(sourceRecordsInput);

export const sourceRecordsById = Object.fromEntries(
  sourceRecords.map((source) => [source.id, source])
) as Record<string, SourceRecord>;
