import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";

function socialPost(
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord {
  return {
    id,
    title,
    organization,
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt,
    accessedAt: reviewedAt,
    canonicalUrl,
    preferredPublicUrl: "canonical",
    publicCitation,
    publicNote,
    supportsGenerally,
    doesNotEstablish
  };
}

export const wowListFullPopulationSourceRecords20260715 = [
  {
    id: "SRC-X-WOWLIST-FULL-POPULATION-2026",
    title: "Authenticated @wowlist full-population archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated July 15, 2026 review of all 38 @wowlist records reported by the profile counter, with posted-link and bounded stakeholder metadata preserved in the repository.",
    publicNote: "Posts yielded 37 records and Replies yielded 38; their union reconciles exactly to the 38-post profile counter. The public fixture excludes raw post text and authenticated-session material.",
    supportsGenerally: [
      "complete displayed account population",
      "record-type and posted-URL inventory",
      "publishing-pattern analysis",
      "bounded stakeholder-response inventory"
    ],
    doesNotEstablish: [
      "every deleted, private, withheld, or unindexed historical interaction",
      "authorship of every institutional post",
      "reach, conversion, endorsement, attendance, or platform-wide adoption"
    ]
  },
  socialPost(
    "SRC-X-WOWLIST-NYCDIY-2016",
    "WOW List explanation of the NYC DIY calendar workflow",
    "WOW List",
    "https://x.com/wowlist/status/771457416298921985",
    "2016-09-01",
    "WOW List, public explanation of the NYC DIY community-calendar workflow, September 1, 2016.",
    "The reply connects NYC DIY's use of WOW List to the Sunday Dinner community-calendar lineage.",
    ["community-calendar distribution", "Sunday Dinner lineage", "event workflow"],
    ["exclusive infrastructure", "complete scene adoption", "event attendance"]
  ),
  socialPost(
    "SRC-X-WOWLIST-PRODUCT-SUPPORT-2015",
    "WOW List inline product-support reply",
    "WOW List",
    "https://x.com/wowlist/status/591668857670148096",
    "2015-04-24",
    "WOW List, public reply explaining how to add an event to one or more lists, April 24, 2015.",
    "The reply documents the project account functioning as an inline product-support surface.",
    ["public product support", "event-publishing workflow"],
    ["support-volume scale", "resolution of every user issue", "platform-wide adoption"]
  ),
  socialPost(
    "SRC-X-WOWLIST-NATIONAL-MARCHES-2016",
    "WOW List national march-calendar post",
    "WOW List",
    "https://x.com/wowlist/status/796473557387575297",
    "2016-11-09",
    "WOW List, same-day post distributing a multi-city calendar of marches, November 9, 2016.",
    "The post documents the event-distribution system being adapted for rapid civic coordination.",
    ["rapid civic coordination", "multi-city event distribution"],
    ["event attendance", "organizer ownership", "causal civic impact"]
  ),
  socialPost(
    "SRC-X-WOWLIST-POPULAR-VOTE-2016",
    "WOW List popular.vote coordination post",
    "WOW List",
    "https://x.com/wowlist/status/798274424763981824",
    "2016-11-14",
    "WOW List, public post directing people to popular.vote for events and updates, November 14, 2016.",
    "The post documents a focused civic-coordination surface for contributing events and receiving local updates.",
    ["civic coordination surface", "event contribution and updates", "product adaptation"],
    ["participation totals", "complete team ownership", "causal civic impact"]
  ),
  socialPost(
    "SRC-X-WOWLIST-PUNKS-USE-2015",
    "Punks & Criminals public WOW List use",
    "Punks & Criminals",
    "https://x.com/punkscriminals/status/604360847012413440",
    "2015-05-29",
    "Punks & Criminals, public post saying it was adding shows to WOW List and sharing its project list, May 29, 2015.",
    "The post supplies direct public evidence of a DIY music organizer using the event-publishing workflow.",
    ["organizer product use", "event-publishing workflow", "independent WOW List URL distribution"],
    ["platform-wide adoption", "event attendance", "ongoing use"]
  ),
  socialPost(
    "SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015",
    "Music Hackathon public WOW List attribution",
    "Music Hackathon / Music Community Lab",
    "https://x.com/musichackathon/status/579088937022406657",
    "2015-03-20",
    "Music Hackathon, public post describing WOW List as an event-sharing service made by co-organizer Jamie Burkart, March 20, 2015.",
    "A creative-technology peer publicly attributed the event-sharing service to its co-organizer Jamie while leaving the complete project team open.",
    ["Jamie attribution", "event-sharing product", "creative-technology peer context"],
    ["sole authorship", "complete project team", "platform impact"]
  ),
  socialPost(
    "SRC-X-WOWLIST-ALL-AGES-RESPONSE-2015",
    "All Ages response to a WOW List members meeting",
    "All Ages",
    "https://x.com/all_ages/status/665737833219538946",
    "2015-11-14",
    "All Ages, public response to a WOW List members-meeting invitation, November 14, 2015.",
    "The reply supplies bounded evidence of dialogue with another calendar-community account.",
    ["calendar-community dialogue", "members-meeting response"],
    ["meeting attendance", "formal partnership", "platform-wide participation"]
  ),
  {
    id: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
    title: "Zines 2.0",
    author: "Elise Granata",
    organization: "Santa Cruz Good Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: reviewedAt,
    canonicalUrl: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'Zines 2.0,' Santa Cruz Good Times, May 6, 2015.",
    publicNote: "Mission-relevant reporting circulated by @wowlist; it supplies context for the account's curatorial practice, not coverage of WOW List.",
    supportsGenerally: ["DIY cultural documentation", "distributed grassroots arts networks"],
    doesNotEstablish: ["WOW List coverage", "WOW List platform adoption"]
  },
  {
    id: "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    author: "Elise Granata",
    organization: "Grasstronaut",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: reviewedAt,
    canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl: "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015.",
    publicNote: "Mission-relevant organizing resource circulated by @wowlist; it is not coverage of WOW List.",
    supportsGenerally: ["DIY organizing knowledge", "all-ages cultural infrastructure"],
    doesNotEstablish: ["WOW List coverage", "formal partnership"]
  },
  {
    id: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
    title: "Meow Wolf Creates $100,000 Annual Fund To Support DIY Spaces",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://meowwolf.com/diy/",
    archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    preferredPublicUrl: "archive",
    publicCitation: "Meow Wolf, announcement of a $100,000 annual fund for DIY music and arts spaces.",
    publicNote: "Resource reposted by @wowlist; it does not establish WOW List involvement in the fund.",
    supportsGenerally: ["DIY-space resource circulation", "cultural-space infrastructure"],
    doesNotEstablish: ["WOW List fund administration", "formal partnership"]
  },
  {
    id: "SRC-WOWLIST-KQED-GHOST-SHIP-2016",
    title: "Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland",
    organization: "KQED",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-05",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.youtube.com/watch?v=g7zIdDeRVjU",
    preferredPublicUrl: "canonical",
    publicCitation: "KQED, 'Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland,' December 5, 2016.",
    publicNote: "Community-safety and mourning source circulated by @wowlist; it does not establish event ownership or impact.",
    supportsGenerally: ["community mourning", "cultural-space safety context"],
    doesNotEstablish: ["WOW List event ownership", "causal impact"]
  },
  {
    id: "SRC-WOWLIST-STANDING-ROCK-2016",
    title: "How to Give, and Give Thanks, to Standing Rock",
    organization: "Indian Country Today",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "dead",
    publishedAt: "2016-11-23",
    accessedAt: reviewedAt,
    canonicalUrl: "https://indiancountrytodaymedianetwork.com/2016/11/23/how-give-and-give-thanks-standing-rock-166566",
    preferredPublicUrl: "canonical",
    publicCitation: "Indian Country Today, 'How to Give, and Give Thanks, to Standing Rock,' November 23, 2016.",
    publicNote: "Mission-relevant resource present through a repost; the historical destination no longer resolves reliably.",
    supportsGenerally: ["mutual-aid resource circulation", "Indigenous-led movement context"],
    doesNotEstablish: ["WOW List authorship", "formal partnership", "causal impact"]
  },
  {
    id: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
    title: "Allied Media Conference",
    organization: "Allied Media Projects",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://amc.alliedmedia.org/",
    archiveUrl: "https://web.archive.org/web/20150425020557/https://www.alliedmedia.org/amc",
    preferredPublicUrl: "archive",
    publicCitation: "Allied Media Projects, archived 2015 Allied Media Conference page.",
    publicNote: "The account announced planned presence at the convening; the record does not establish a presentation, partnership, or attendance outcome.",
    supportsGenerally: ["participatory-media peer context", "public project convening"],
    doesNotEstablish: ["conference presentation", "formal partnership", "attendance outcome"]
  },
  {
    id: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
    title: "popular.vote WOW List event-sharing surface",
    organization: "WOW List",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2016-12-11",
    accessedAt: reviewedAt,
    canonicalUrl: "http://popular.vote/",
    archiveUrl: "https://web.archive.org/web/20161211233030/http://popular.vote/",
    preferredPublicUrl: "archive",
    publicCitation: "Archived December 2016 popular.vote WOW List event-sharing surface.",
    publicNote: "The capture establishes a themed project surface, not participation totals or complete team ownership.",
    supportsGenerally: ["rapid civic coordination surface", "WOW List product continuity"],
    doesNotEstablish: ["participation totals", "complete authorship", "causal impact"]
  }
] satisfies SourceRecord[];

export const wowListFullPopulationClaimRecords20260715 = [
  {
    id: "CLM-WOWLIST-FULL-POPULATION-PRACTICE",
    project: "wowlist",
    internalClaim: "The Posts and Replies union recovered on July 15, 2026 contains 38 unique @wowlist records, exactly matching the profile counter displayed during the review.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "An authenticated archival review recovered all 38 records displayed by the @wowlist profile counter on July 15, 2026.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-2026",
        relationship: "direct-support",
        supports: ["38 unique recovered records", "exact reconciliation with the displayed profile counter"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "All 38 records reported by the profile counter materialized across Posts and Replies; this is a complete displayed account population, not a complete history of deleted, private, withheld, or unindexed activity.",
      "The incoming 16-record search inventory is bounded; 10 mission-relevant third-party accounts are not represented as every historical user or stakeholder.",
      "The account's follower and post counts are not used as WOW List adoption measures.",
      "Event distribution does not establish attendance, event ownership, endorsement, or causal movement impact.",
      "Displayed interaction totals are volatile context and are not used as reach, conversion, endorsement, or impact metrics.",
      "Institutional-account records are not attributed post by post to Jamie without authorship evidence."
    ],
    antiClaims: [
      "Only 37 of the 38 profile-counted records were recovered",
      "The 38-record fixture contains every record ever published by @wowlist",
      "The displayed profile population includes deleted, private, withheld, or unindexed activity"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-SOCIAL-PRODUCT-SUPPORT",
    project: "wowlist",
    internalClaim: "The @wowlist account publicly explained event-publishing workflows and answered an inline question about adding an event to one or more lists.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "The project account served as a public support surface for event publishing and list selection.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-PRODUCT-SUPPORT-2015",
        relationship: "direct-support",
        supports: ["an inline reply explaining how to add an event to one or more lists"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-WOWLIST-USER-TUTORIAL-2015",
        relationship: "corroborating",
        supports: ["community-created onboarding for the event-publishing workflow"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records establish examples of public support, not support volume or resolution rate.",
      "Institutional-account records are not attributed post by post to Jamie without separate authorship evidence."
    ],
    antiClaims: ["Jamie personally authored every @wowlist support reply", "The records measure product-support performance"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-SUNDAY-DINNER-LINEAGE",
    project: "wowlist",
    internalClaim: "Public @wowlist records connect the platform's origin and the NYC DIY calendar workflow to Sunday Dinner's community-calendar practice.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "Public records connect WOW List's community-calendar model to Sunday Dinner.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
        relationship: "direct-support",
        supports: ["the stated Sunday Dinner origin of the event-sharing approach"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-WOWLIST-NYCDIY-2016",
        relationship: "corroborating",
        supports: ["the later connection between NYC DIY's workflow and Sunday Dinner"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The records establish stated lineage, not exclusive authorship or complete project history."],
    antiClaims: ["Sunday Dinner alone accounts for every WOW List product decision"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-CIVIC-DISTRIBUTION-ADAPTATION",
    project: "wowlist",
    internalClaim: "In November 2016, @wowlist used the event-distribution model for a multi-city march calendar and a popular.vote surface for contributing events and receiving updates.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "The event-distribution model was later adapted for rapid civic coordination.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-NATIONAL-MARCHES-2016",
        relationship: "direct-support",
        supports: ["same-day distribution of a multi-city march calendar"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-WOWLIST-POPULAR-VOTE-2016",
        relationship: "direct-support",
        supports: ["a themed surface for contributing events and receiving updates"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        relationship: "corroborating",
        supports: ["preservation of the themed event-sharing surface"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Distribution records do not establish attendance, ownership of the listed events, participation totals, or causal civic impact."],
    antiClaims: ["WOW List organized every listed event", "The posts establish civic impact"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
    project: "wowlist",
    internalClaim: "Punks & Criminals publicly said it was adding shows to WOW List and linked to its project list in May 2015.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "Public records show the system in use: in 2015, Punks & Criminals said it was adding shows to WOW List.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/wowlist"]
    }],
    evidence: [{
      sourceId: "SRC-X-WOWLIST-PUNKS-USE-2015",
      relationship: "direct-support",
      supports: ["one DIY music organizer's stated use of WOW List to add shows"],
      confidence: "high",
      renderCitation: true
    }],
    boundaries: ["One organizer's stated use does not establish platform-wide adoption, attendance, or ongoing use."],
    antiClaims: ["Every DIY organizer used WOW List", "The post measures adoption or attendance"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
    project: "wowlist",
    internalClaim: "Music Hackathon publicly described WOW List as an event-sharing service made by its co-organizer Jamie Burkart in March 2015.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "Music Hackathon described WOW List that year as an event-sharing service made by its co-organizer Jamie Burkart.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/wowlist"]
    }],
    evidence: [{
      sourceId: "SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015",
      relationship: "direct-support",
      supports: ["a creative-technology peer's public attribution of Jamie's maker role"],
      confidence: "high",
      renderCitation: true
    }],
    boundaries: ["The attribution supports Jamie's maker role while leaving the complete WOW List team open."],
    antiClaims: ["Jamie was the sole creator of WOW List", "The post identifies the complete project team"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-CALENDAR-COMMUNITY-DIALOGUE",
    project: "wowlist",
    internalClaim: "The All Ages account publicly responded to a WOW List members-meeting invitation in November 2015.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "Another calendar-community account publicly responded to a WOW List members-meeting invitation.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-X-WOWLIST-ALL-AGES-RESPONSE-2015",
      relationship: "direct-support",
      supports: ["a public response to one WOW List members-meeting invitation"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The response does not establish meeting attendance, formal partnership, or wider calendar-community participation."],
    antiClaims: ["All Ages attended the meeting", "The response establishes a formal partnership"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-SOURCE-CURATION-PRACTICE",
    project: "wowlist",
    internalClaim: "The complete displayed population includes mission-relevant sources about DIY cultural documentation, all-ages organizing, cultural-space support and safety, mutual aid, and participatory media.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "The account also circulated sources relevant to grassroots cultural infrastructure.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-2026",
        relationship: "direct-support",
        supports: ["the account records containing the posted source destinations"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-WOWLIST-USER-TUTORIAL-2015",
        relationship: "context",
        supports: ["a community-created tutorial for publishing through WOW List"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
        relationship: "context",
        supports: ["the Sunday Dinner calendar archive named in the project-origin record"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
        relationship: "context",
        supports: ["DIY cultural documentation in a source circulated by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015",
        relationship: "context",
        supports: ["all-ages music organizing guidance in a source circulated by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
        relationship: "context",
        supports: ["a DIY-space funding resource redistributed by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-KQED-GHOST-SHIP-2016",
        relationship: "context",
        supports: ["cultural-space safety and mourning context redistributed by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-STANDING-ROCK-2016",
        relationship: "context",
        supports: ["an Indigenous-led mutual-aid resource redistributed by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
        relationship: "context",
        supports: ["participatory-media convening context circulated by the account"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        relationship: "context",
        supports: ["the archived civic event-sharing surface circulated by the account"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Circulating a source does not establish authorship, formal partnership, endorsement by the publisher, or causal impact."],
    antiClaims: ["WOW List authored the circulated articles", "Every publisher was a formal WOW List partner"],
    researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const wowListFullPopulationResearchInquiries20260715 = [
  {
    id: "INQ-WOWLIST-FULL-POPULATION-2026",
    project: "wowlist",
    question: "What publishing, posted-source, engagement, and stakeholder-response patterns appear across the full displayed @wowlist population?",
    methods: [
      "Traversed authenticated @wowlist Posts and Replies timelines through repeated no-growth states.",
      "Deduplicated primary status IDs across both tabs and reconciled the union against the 38-post profile counter.",
      "Classified all 38 records as original, reply, or repost and inventoried all 35 posted external short URLs without retaining raw post text or session state.",
      "Close-read the 22 @wowlist-authored records and 16 redistributed records for product, curation, distribution, and coordination patterns.",
      "Ran bounded authenticated searches for @wowlist, @WOWListNYC, wowlist.org, and project-name references; deduplicated and classified all 16 recovered incoming records.",
      "Resolved or archived nine representative mission-relevant destinations and kept broken-link and handle-lineage uncertainty explicit."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "Posts yielded 37 records and Replies yielded 38; their union exactly matches the 38-post profile counter.",
      "The population comprises 16 original posts, 6 replies, and 16 reposts; 22 records were authored by @wowlist.",
      "Thirty-one records contained external links, producing 35 occurrences and 35 distinct short URLs; 23 occurred in @wowlist-authored records.",
      "The authored records document Sunday Dinner lineage, inline product support, community-created onboarding, event distribution, source curation, and rapid civic coordination.",
      "Twelve of 22 account-authored records displayed at least one interaction at access time, totaling 2 replies, 20 reposts, and 21 likes; these volatile counts are retained only as dated context.",
      "The bounded incoming search recovered 10 mission-relevant third-party accounts across four stakeholder groups; nine independently posted a WOW List URL.",
      "Punks & Criminals publicly described adding shows to WOW List, while Music Hackathon attributed the event-sharing service to co-organizer Jamie Burkart."
    ],
    limitations: [
      "A complete displayed profile population is not a complete archive of deleted, private, withheld, or unindexed activity.",
      "The incoming search is bounded and does not include every historical mention, native repost, like, or private interaction.",
      "Displayed interaction totals are not unique people and do not measure reach, conversion, endorsement, event attendance, adoption, or impact.",
      "The exact historical relationship between @WOWListNYC and @wowlist remains unresolved.",
      "Institutional-account records are not attributed individually without separate authorship evidence."
    ],
    sourceIds: [
      "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
      ...wowListFullPopulationSourceRecords20260715.map(({ id }) => id),
      "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
      "SRC-X-WOWLIST-USER-TUTORIAL-2015"
    ],
    publicSummary: "All 38 profile-counted records were reviewed. Together with a bounded third-party reception inventory, they show social media operating as product support, community publishing, source curation, event distribution, and rapid civic-coordination infrastructure."
  }
] satisfies ResearchInquiry[];

export const wowListFullPopulationIntakeRecords20260715 = [
  {
    id: "INTAKE-WOWLIST-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "Complete displayed @wowlist population and bounded stakeholder inventory",
    publicSafeSummary: "Public-safe metadata and analysis for all 38 records reported by the @wowlist profile counter, all 35 posted external URLs, dated visible engagement context, and 16 bounded incoming search records.",
    whyItMatters: "Shows the project account functioning as product support, community publishing, source curation, event distribution, and civic-coordination infrastructure while separating public-use signals from reach, adoption, endorsement, and impact.",
    projectHints: ["wowlist"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://x.com/wowlist",
    sourceIds: [
      "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
      ...wowListFullPopulationSourceRecords20260715.map(({ id }) => id),
      "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
      "SRC-X-WOWLIST-USER-TUTORIAL-2015"
    ],
    claimIds: [
      "CLM-WOWLIST-FULL-POPULATION-PRACTICE",
      "CLM-WOWLIST-SOCIAL-PRODUCT-SUPPORT",
      "CLM-WOWLIST-SUNDAY-DINNER-LINEAGE",
      "CLM-WOWLIST-CIVIC-DISTRIBUTION-ADAPTATION",
      "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
      "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
      "CLM-WOWLIST-CALENDAR-COMMUNITY-DIALOGUE",
      "CLM-WOWLIST-SOURCE-CURATION-PRACTICE"
    ],
    inquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
    limitations: [
      "The complete displayed population cannot recover deleted, private, withheld, or unindexed activity outside the profile control.",
      "The incoming search is bounded and is not a complete historical engagement census.",
      "Raw post text, cookies, private account state, credentials, and session data remain outside the repository."
    ],
    nextActions: [
      "Resolve the @WOWListNYC to @wowlist handle lineage if a public first-party source is recovered.",
      "Close-read additional posted sources only when they can support an atomic claim or clarify the project's mission context.",
      "Seek collaborator corroboration before expanding individual authorship or role claims."
    ]
  }
] satisfies IntakeRecord[];
