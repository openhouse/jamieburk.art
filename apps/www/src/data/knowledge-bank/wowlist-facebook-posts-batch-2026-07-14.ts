import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const wowlistFacebookPostAudit = {
  ownerTimelineRecords: 57,
  cursorPages: 19,
  standalonePosts: 35,
  resharedStories: 22,
  yearCounts: { "2015": 22, "2016": 27, "2017": 7, "2018": 1 },
  recordsWithVisibleInteraction: 47,
  reactions: 94,
  comments: 16,
  shares: 49,
  publisherAttribution: {
    postIdentitiesChecked: 57,
    jamieBurkart: 51,
    otherPublisher: 0,
    unresolved: 6
  },
  censusPath:
    "docs/knowledge-bank/data/wowlist-facebook-post-census-2026-07-14.csv"
} as const;

const selectedPostSources = [
  {
    id: "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015",
    title: "WOW List members introduce calendars in nine cities",
    publishedAt: "2015-10-05",
    canonicalUrl: "https://www.facebook.com/watch/?v=439926419547504",
    publicCitation:
      "WOW List Facebook video announcing member-introduced community calendars in nine cities, October 5, 2015.",
    supportsGenerally: [
      "members introduced WOW List community calendars in nine cities",
      "the post invited people to join a nearby community calendar",
      "the current display shows 13 reactions and three comments; the population capture recorded 29 shares"
    ],
    doesNotEstablish: [
      "official chapters in nine cities",
      "the full set of city ecosystems that used WOW List",
      "unique people reached, historical impressions, or causal impact"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015",
    title: "WOW List credits a contributor with adding 41 Los Angeles events",
    publishedAt: "2015-11-16",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/450622238477922",
    publicCitation:
      "WOW List Facebook post crediting Joe Gutierrez with adding 41 upcoming DIY events to the LADIY calendar, November 16, 2015.",
    supportsGenerally: [
      "a named community contributor was publicly credited with adding 41 upcoming Los Angeles DIY events",
      "the contribution was connected to joining the local calendar and receiving a weekly list"
    ],
    doesNotEstablish: [
      "independent verification of every event record",
      "that Jamie personally entered the 41 events",
      "the full volume of Los Angeles activity"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-WOMENS-MARCH-ROUTE-2017",
    title: "WOW List route for Women's March gatherings",
    publishedAt: "2017-01-13",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/616983925175085",
    publicCitation:
      "WOW List Facebook post routing people to Women's March gatherings in Washington, D.C., and other cities, January 13, 2017.",
    supportsGenerally: [
      "WOW List infrastructure was used to route people to issue-based gatherings across cities",
      "the account extended event distribution into civic mobilization"
    ],
    doesNotEstablish: [
      "that WOW List organized the Women's March",
      "attendance, reach, endorsement, or causal impact"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018",
    title: "Phoenix organizer describes continued WOW List use",
    publishedAt: "2018-03-23",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/pfbid02Ao38e5ECy89isroMuqjhh62gBdutGNTkgmfYJAzPErEZi3SQ5uD2tRtv2GG8wRZWl",
    publicCitation:
      "WOW List Facebook share of Aaron Ponzo's public post describing WOW List use while updating PHXDIY.com, March 23, 2018.",
    supportsGenerally: [
      "an external Phoenix organizer publicly described continued WOW List use",
      "the project was presented as a route for following shows outside Facebook"
    ],
    doesNotEstablish: [
      "the complete Phoenix organizer population",
      "current platform activity",
      "platform-wide adoption or impact"
    ]
  }
] as const;

const selectedPostSourceIds = selectedPostSources.map((source) => source.id);

export const wowlistFacebookPostIntake = [
  {
    id: "LEAD-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for WOW List Facebook posts",
    summary:
      "Recover and disposition every record in the surviving WOW List owner timeline, identify mission-relevant routes and interaction patterns, and test Jamie's recollection that he managed the project's social presence without erasing shared project credit.",
    sourceUrl: "https://www.facebook.com/wowlist",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["wowlist", "career-proof-system"],
    sourceIds: [
      "SRC-FB-WOWLIST-PAGE-CONTROL-2026",
      "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
      "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026",
      ...selectedPostSourceIds
    ],
    claimIds: [
      "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
      "CLM-WOWLIST-FACEBOOK-CIVIC-CARE",
      "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"
    ],
    inquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    notes: [
      "An authenticated owner-timeline cursor terminated after 19 three-record pages with 57 unique records and no repeated cursor.",
      "A separate record-identity audit found protected Page-management attribution to Jamie on 51 matching post records; six legacy records were unavailable or redirected and remain unresolved, with none attributed to another publisher.",
      "WOW List was Jamie and Richard's shared project. Publisher attribution supports Jamie's Facebook operating role without assigning sole product ownership or authorship of quoted and reshared source material.",
      "Raw responses, authentication state, full text, comments, Page administration, and per-record manager attribution remain outside the public repository."
    ]
  }
] satisfies IntakeRecord[];

export const wowlistFacebookPostSources = [
  {
    id: "SRC-FB-WOWLIST-PAGE-CONTROL-2026",
    title: "WOW List Facebook Page",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The public Page supplied the organizational identity and owner-timeline control. Mutable follower counts and private Page-management context are not portfolio evidence.",
    supportsGenerally: [
      "the public WOW List Facebook identity",
      "the current public owner-timeline surface"
    ],
    doesNotEstablish: [
      "historical reach, impressions, adoption, or impact",
      "records deleted or hidden before the review",
      "individual publisher identity without protected management attribution"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
    title: "WOW List Facebook full-population owner-timeline run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 terminal-cursor accounting of the surviving WOW List Facebook owner timeline.",
    publicNote:
      "The cursor terminated after 19 three-record pages with 57 unique records. The public census preserves dates, form, primary theme, public URL, and mutable interaction signals without reproducing post text or administrative context.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "57 unique current owner-timeline records",
      "35 standalone posts and 22 reshared stories",
      "22 records in 2015, 27 in 2016, seven in 2017, and one in 2018",
      "a recovered range from April 25, 2015, through March 23, 2018",
      "47 records with at least one currently visible interaction",
      "94 reactions, 16 comments, and 49 shares as mutable record-level platform signals"
    ],
    doesNotEstablish: [
      "that no record was deleted or hidden before capture",
      "unique people, reach, impressions, attendance, endorsement, adoption, or impact",
      "the complete population of WOW List users, events, organizers, or city ecosystems"
    ]
  },
  {
    id: "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026",
    title: "WOW List Facebook publisher-attribution audit",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata from an authenticated record-identity audit of WOW List Facebook publisher attribution, July 14, 2026.",
    publicNote:
      "Fifty-one of 57 requested post identities rendered manager-only attribution to Jamie Burkart. Six unavailable or redirected records remain unresolved; none rendered another publisher. Per-record attribution and Page-management context remain protected.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-PUBLISHERS-2026-001",
    supportsGenerally: [
      "51 matching post identities attributed to Jamie Burkart as publisher",
      "six unavailable or redirected records retained as unresolved",
      "zero records attributed to another publisher in the completed audit"
    ],
    doesNotEstablish: [
      "publisher identity for the six unresolved records",
      "that Jamie drafted every word, originated reshared material, or acted without collaborators",
      "sole ownership of WOW List",
      "management of every WOW List social channel"
    ]
  },
  ...selectedPostSources.map((source) => ({
    ...source,
    organization: "WOW List",
    author: "WOW List account",
    kind: "institutional-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      ...source.doesNotEstablish,
      "sole project ownership or authorship of quoted and reshared source material"
    ]
  }))
] satisfies SourceRecord[];

export const wowlistFacebookPostClaims = [
  {
    id: "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
    project: "wowlist",
    internalClaim:
      "The surviving WOW List Facebook owner timeline contains 57 unique records across a terminal 19-page cursor chain: 35 standalone posts and 22 reshared stories published from April 25, 2015, through March 23, 2018.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "A terminal-cursor census recovered 57 unique WOW List Facebook records: 35 standalone posts and 22 reshared stories from April 2015 through March 2018.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["terminal cursor, record count, date range, and form counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the currently accessible owner-timeline cursor reached its terminal flag; it does not prove that no record was deleted or hidden before capture.",
      "The Facebook population is not the WOW List product database or a measure of adoption."
    ],
    antiClaims: [
      "The census contains every post ever published",
      "Fifty-seven posts measure platform adoption or impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
    project: "wowlist",
    internalClaim:
      "Selected records in the complete Facebook population document members introducing calendars in nine cities, a contributor adding 41 Los Angeles events, and an external Phoenix organizer describing continued WOW List use.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text:
          "The operating model traveled: members introduced calendars in nine cities, a contributor loaded 41 Los Angeles events, and a Phoenix organizer later described continued use of WOWList.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      },
      {
        key: "archive-note",
        text:
          "Selected Facebook records preserve member-led city calendars, community event contribution, and later external-organizer continuity.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015",
        relationship: "direct-support",
        supports: ["member-introduced calendars in nine cities"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015",
        relationship: "direct-support",
        supports: ["public credit for a 41-event Los Angeles contribution"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018",
        relationship: "corroborating",
        supports: ["external Phoenix organizer use and continuity"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The nine-city and 41-event statements are contemporaneous project-account records, not an independent audit of platform-wide adoption.",
      "Use city calendars or city ecosystems, not official chapters."
    ],
    antiClaims: [
      "WOW List operated official chapters in nine cities",
      "Jamie personally entered the 41 Los Angeles events",
      "Three selected records prove the platform's complete adoption scale"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
    project: "wowlist",
    internalClaim:
      "Authenticated Page-management records identify Jamie Burkart as publisher on 51 of 57 surviving owner-timeline records; six unavailable or redirected records remain unresolved and none identifies another publisher.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text:
          "Authenticated Page records identify Jamie as publisher on at least 51 of the 57 surviving posts, substantiating his Facebook publishing role while preserving WOW List as a shared project.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/wowlist"]
      },
      {
        key: "archive-note",
        text:
          "The protected publisher audit attributes 51 matching post identities to Jamie, leaves six records unresolved, and finds no record attributed to another publisher.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026",
        relationship: "private-support",
        supports: ["the 51 attributed, six unresolved, zero-other aggregate"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Published by identifies the Page publisher, not necessarily the drafter of every word or originator of reshared material.",
      "The six unresolved records cannot be assigned to Jamie or anyone else.",
      "WOW List was Jamie and Richard's shared project; Facebook publishing responsibility does not become sole product ownership.",
      "This audit covers Facebook posts, not every WOW List social channel."
    ],
    antiClaims: [
      "Jamie published all 57 surviving records",
      "Jamie authored every quoted or reshared word",
      "Jamie solely owned or operated WOW List",
      "Jamie managed every WOW List social channel"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-CIVIC-CARE",
    project: "wowlist",
    internalClaim:
      "The complete Facebook population shows WOW List routes used to distribute gatherings and resources connected to the Women's March, Standing Rock, post-election organizing, Ghost Ship mutual aid and memorials, DIY-space safety, and cultural-space care.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "The Facebook record extends from arts-event distribution into issue-based gathering routes, mutual aid, mourning, and cultural-space care.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level theme and route review"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-WOWLIST-WOMENS-MARCH-ROUTE-2017",
        relationship: "direct-support",
        supports: ["one issue-based gathering route across cities"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "WOW List distributed public routes and amplified resources; it did not organize every referenced movement, event, fund, or space.",
      "Publication does not establish attendance, endorsement, policy causality, or impact."
    ],
    antiClaims: [
      "WOW List organized the Women's March or Standing Rock",
      "Facebook posts prove mobilization impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
    project: "wowlist",
    internalClaim:
      "Forty-seven of 57 recovered Facebook records display at least one current interaction; the aggregate record-level signals are 94 reactions, 16 comments, and 49 shares, with the nine-city record carrying the strongest individual signal.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Forty-seven recovered records retain at least one visible interaction; the nine-city calendar announcement has the strongest individual signal, including 29 shares at capture.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level reaction, comment, and share counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Interaction totals are mutable platform displays and do not represent unique people.",
      "Do not relabel reactions, comments, or shares as reach, impressions, endorsement, attendance, adoption, or impact."
    ],
    antiClaims: [
      "WOW List reached 159 people",
      "The posts generated 159 unique engagements",
      "Interaction counts prove platform adoption or impact"
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const wowlistFacebookPostInquiries = [
  {
    id: "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
    project: "wowlist",
    question:
      "Can 100 percent of the surviving WOW List Facebook owner timeline be recovered, classified, and integrated while testing Jamie's publishing role and preserving collective credit, source attribution, and interaction boundaries?",
    methods: [
      "Used the authenticated Page's owner-timeline query and followed its cursor until Facebook returned `has_next_page: false`.",
      "Recovered 19 three-record pages, deduplicated by numeric post ID, checked for repeated cursors, and reran the first query without a date ceiling.",
      "Classified all 57 records by year, standalone or reshared form, primary theme, and current reaction, comment, and share signals.",
      "Closely read mission-relevant posts and posted destinations while distinguishing project-account statements, external-organizer context, and independent corroboration.",
      "In a separate authenticated Page-management pass, requested all 57 canonical post identities and counted publisher attribution only when the rendered URL matched the requested record.",
      "Retried unresolved records in a fresh tab; stale pages, unavailable posts, and redirects to different record identities remained unresolved rather than inheriting attribution.",
      "Retained raw responses, authentication, full text, comments, Page administration, and per-record manager attribution in protected research storage."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The owner-timeline cursor terminated after 19 pages with 57 unique post IDs and no repeated cursor.",
      "The population contains 35 standalone posts and 22 reshared stories: 22 records in 2015, 27 in 2016, seven in 2017, and one in 2018.",
      "Selected records document member-led calendars in nine cities, a 41-event Los Angeles contribution, and external Phoenix organizer continuity.",
      "The account also routed issue-based gatherings, mutual aid, memorial resources, DIY-space safety, and cultural-space care.",
      "Forty-seven records retain at least one current interaction; aggregate mutable signals are 94 reactions, 16 comments, and 49 shares.",
      "Protected Page-management attribution identified Jamie as publisher on 51 matching post identities; six legacy records remained unavailable or redirected, and none identified another publisher."
    ],
    limitations: [
      "A terminal current cursor cannot reveal records deleted or hidden before capture.",
      "Six publisher identities remain unresolved and cannot be assigned by inference.",
      "Publisher attribution does not establish sole drafting, sole project ownership, or authorship of quoted and reshared source material.",
      "WOW List was Jamie and Richard's shared project; the audit does not erase product, design, community, or collaborator credit.",
      "The publisher audit covers Facebook posts, not every WOW List social channel.",
      "Current interaction counts are mutable and do not measure unique people, reach, impressions, attendance, endorsement, adoption, or impact."
    ],
    sourceIds: [
      "SRC-FB-WOWLIST-PAGE-CONTROL-2026",
      "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026",
      "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026",
      ...selectedPostSourceIds
    ],
    publicSummary:
      "A terminal-cursor review recovered 57 surviving WOW List Facebook records. Selected posts show distributed organizer use, while a separate protected audit identifies Jamie as publisher on at least 51 records and leaves six unresolved.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const wowlistFacebookPostPublicationDecisions = [
  {
    id: "PUB-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
    claimId: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
    decision: "selected",
    audiences: [
      "hiring managers",
      "product-operations leaders",
      "public-interest technology peers"
    ],
    surfaces: ["/work/wowlist"],
    rationale:
      "Three concrete records make the distributed operating model legible without converting city calendars into chapters or selected examples into complete adoption scale.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
    claimId: "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
    decision: "selected",
    audiences: [
      "hiring managers",
      "product-operations leaders",
      "communications and implementation teams"
    ],
    surfaces: ["/work/wowlist"],
    rationale:
      "The protected aggregate directly substantiates Jamie's sustained Facebook publishing responsibility while preserving six unresolved records, Richard's shared-project credit, and source authorship boundaries.",
    decidedAt: "2026-07-14"
  },
  ...[
    [
      "PUB-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      "The complete population is durable provenance rather than the page's main hiring argument."
    ],
    [
      "PUB-WOWLIST-FACEBOOK-CIVIC-CARE",
      "CLM-WOWLIST-FACEBOOK-CIVIC-CARE",
      "The civic-care pattern remains useful depth without claiming ownership of amplified work."
    ],
    [
      "PUB-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      "Mutable platform interactions remain archive context rather than audience, adoption, or impact proof."
    ]
  ].map(([id, claimId, rationale]) => ({
    id,
    claimId,
    decision: "reserve" as const,
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts"],
    rationale,
    decidedAt: "2026-07-14"
  }))
] satisfies PublicationDecision[];

export const wowlistFacebookPostProofCoverage = [] satisfies ProofCoverage[];
