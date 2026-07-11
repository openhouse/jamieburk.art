import { sourceRecordSchema, type SourceRecord } from "./schema.ts";

const sourceRecordsInput = [
  {
    id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
    title: "Civic Hall announcement of New York City Council hackathon",
    organization: "Civic Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live-and-archived",
    publishedAt: "2016-01-29",
    accessedAt: "2026-07-11",
    canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Civic Hall announcement of a January 30, 2016, 1-3 p.m. New York City Council hackathon focused on constituent services.",
    publicNote:
      "The archived Civic Hall page preserves the embedded social post. It is not a recovered Civic Hall calendar listing or event-detail page.",
    supportsGenerally: [
      "January 30, 2016",
      "1-3 p.m.",
      "New York City Council hackathon",
      "constituent-services purpose"
    ],
    doesNotEstablish: [
      "a recovered Civic Hall calendar listing",
      "a dedicated event-detail page",
      "the complete formal event title",
      "the agenda",
      "the participant roster"
    ]
  },
  {
    id: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
    title: "New York City Council event-day CouncilStat hackathon post",
    organization: "New York City Council",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live-and-archived",
    publishedAt: "2016-01-30",
    accessedAt: "2026-07-11",
    canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    preferredPublicUrl: "archive",
    publicCitation:
      "New York City Council event-day post from Civic Hall identifying the gathering as the Council's first CouncilStat hackathon.",
    publicNote:
      "The source supports 'first CouncilStat hackathon.' It does not support 'first civic-data hackathon.'",
    supportsGenerally: ["January 30, 2016", "Civic Hall", "first CouncilStat hackathon"],
    doesNotEstablish: [
      "first civic-data hackathon",
      "the full agenda",
      "a complete attendee list",
      "formal winners",
      "CallNYC as an official submission"
    ]
  },
  {
    id: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
    title: "New York City Council Hackathon promotional graphic",
    organization: "New York City Council / Civic Hall",
    kind: "promotional-graphic",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-11",
    assetUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    preferredPublicUrl: "asset",
    publicCitation:
      "NYC Council-branded promotional graphic reading 'New York City Council Hackathon' and displaying labs.council.nyc.",
    publicNote:
      "The graphic supports the event branding 'New York City Council Hackathon.' It does not establish a longer formal registration title.",
    supportsGenerally: ["recovered event branding"],
    doesNotEstablish: [
      "a longer formal registration title",
      "the agenda",
      "breakout structure",
      "participant roster"
    ]
  },
  {
    id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
    title: "Participant photograph of Digital District breakout placard",
    kind: "participant-photograph",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publicCitation:
      "Participant photograph showing a table placard reading 'Digital District - Help improve City Council District office operations.'",
    publicNote:
      "The photograph remains outside the public repository pending rights, consent, and photo-editor review.",
    protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001",
    supportsGenerally: [
      "Digital District placard wording",
      "breakout-table context",
      "collaborative working setting"
    ],
    doesNotEstablish: [
      "the official event title",
      "the facilitator",
      "the complete agenda",
      "the event start time",
      "the identity or consent status of all people depicted"
    ]
  },
  {
    id: "SRC-CALLNYC-POLITICO-2016-03-14",
    title: "Website provides new information about council members' focus",
    organization: "Politico New York",
    author: "Miranda Neubauer",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2016-03-14",
    accessedAt: "2026-07-11",
    archiveUrl:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    preferredPublicUrl: "archive",
    publicCitation:
      "Miranda Neubauer, 'Website provides new information about council members' focus,' Politico New York, March 14, 2016.",
    publicNote:
      "The reporting connects Jamie to the January event, the later full data release, and his independent development and iteration of CallNYC.",
    supportsGenerally: [
      "CallNYC existed",
      "Jamie's relationship to the project",
      "the relationship to CouncilStat and the Civic Hall event",
      "publication date and press coverage"
    ],
    doesNotEstablish: [
      "CallNYC as an official Council product",
      "CallNYC as a formal hackathon submission",
      "CallNYC as a documented winner"
    ]
  },
  {
    id: "SRC-CALLNYC-GITHUB-REPOSITORY",
    title: "CallNYC source repository",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-11",
    canonicalUrl: "https://github.com/openhouse/CallNYC",
    preferredPublicUrl: "canonical",
    publicCitation: "Public CallNYC source repository.",
    publicNote:
      "The repository documents the surviving implementation of the independent, archived prototype.",
    supportsGenerally: ["project implementation", "surviving source code"],
    doesNotEstablish: [
      "official Council ownership",
      "formal hackathon submission status",
      "current resident-service guidance"
    ]
  }
] satisfies SourceRecord[];

export const sourceRecords = sourceRecordSchema.array().parse(sourceRecordsInput);
