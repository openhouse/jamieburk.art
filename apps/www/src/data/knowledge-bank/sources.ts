import { sourceSchema, type SourceRecord } from "./schema.ts";

const sourceInput: SourceRecord[] = [
  {
    id: "civic-hall-hackathon-announcement-2016",
    title: "Civic Hall announcement of the New York City Council hackathon",
    shortLabel: "Civic Hall announcement",
    authorOrAccount: "Civic Hall",
    datePublished: "2016-01-29",
    sourceClass: "official-organizational-social",
    mediaType: "social-post",
    publicUseStatus: "public-with-caveat",
    canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "Civic Hall announced a January 30 New York City Council constituent-services hackathon for 1-3 p.m.",
    preservedBySourceId: "civic-hall-embedded-feed-wayback-2016-01-31"
  },
  {
    id: "civic-hall-hackathon-promotional-graphic-2016",
    title: "New York City Council Hackathon promotional graphic",
    shortLabel: "Promotional graphic",
    authorOrAccount: "Civic Hall",
    datePublished: "2016-01-29",
    sourceClass: "official-organizational-social",
    mediaType: "image",
    publicUseStatus: "public-with-caveat",
    canonicalUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "The Council-branded graphic reads 'New York City Council Hackathon' and displays labs.council.nyc. It documents recovered event branding, not a longer formal registration title."
  },
  {
    id: "nyc-council-councilstat-hackathon-post-2016",
    title: "New York City Council post from the CouncilStat hackathon",
    shortLabel: "Council event-day post",
    authorOrAccount: "New York City Council",
    publisher: "New York City Council",
    datePublished: "2016-01-30",
    sourceClass: "official-institutional",
    mediaType: "social-post",
    publicUseStatus: "public-with-caveat",
    canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "The Council posted from Civic Hall on January 30 and identified the gathering as its first CouncilStat hackathon.",
    preservedBySourceId: "civic-hall-embedded-feed-wayback-2016-01-31"
  },
  {
    id: "civic-hall-embedded-feed-wayback-2016-01-31",
    title: "Civic Hall events page with embedded social feed, January 31, 2016 capture",
    shortLabel: "Civic Hall embedded-feed capture",
    publisher: "Internet Archive",
    datePublished: "2016-01-31",
    sourceClass: "web-archive",
    mediaType: "web-page",
    publicUseStatus: "public-with-caveat",
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    originalUrl: "http://civichall.org/events/page/2/",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "archived",
    publicSourceNote:
      "The capture preserves the relevant Civic Hall and Council posts inside an embedded social feed. It is not a recovered Civic Hall calendar listing."
  },
  {
    id: "participant-archive-digital-district-2016",
    title: "Participant photograph of the Digital District breakout",
    shortLabel: "Participant photograph",
    sourceClass: "participant-archive",
    mediaType: "photograph",
    publicUseStatus: "protected",
    linkStatus: "unavailable",
    publicSourceNote:
      "Participant-archive photograph showing the Digital District placard, the district-office-operations prompt, and a breakout underway at approximately 2:10 p.m. No public link is provided.",
    rightsStatus: "Rights and consent not yet reviewed for public display."
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
    publicUseStatus: "public",
    canonicalUrl:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "Independent reporting connects Jamie Burkart to the January Civic Hall event, the later CouncilStat release, and his independent development and iteration of CallNYC."
  },
  {
    id: "callnyc-source-repository",
    title: "CallNYC source repository",
    shortLabel: "CallNYC repository",
    authorOrAccount: "openhouse",
    publisher: "GitHub",
    sourceClass: "primary-project",
    mediaType: "repository",
    publicUseStatus: "public",
    canonicalUrl: "https://github.com/openhouse/CallNYC",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    linkStatus: "live",
    publicSourceNote:
      "The public source repository documents the surviving independent CallNYC implementation."
  }
];

export const sources = sourceInput.map((source) => sourceSchema.parse(source));
