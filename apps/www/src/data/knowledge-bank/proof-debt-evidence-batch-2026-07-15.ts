import type {
  ClaimRecord,
  IntakeRecord,
  PublicationDecision,
  SourceRecord
} from "./schema.ts";

export const proofDebtEvidenceSourceIds = [
  "SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026",
  "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
  "SRC-X-WOWLIST-POPULAR-VOTE-2016",
  "SRC-FB-CALLSCRIPT-PAGE-2026",
  "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
  "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026"
] as const;

export const proofDebtEvidenceClaimIds = [
  "CLM-WOWLIST-DATABASE-SCALE-2017",
  "CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
  "CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017"
] as const;

export const proofDebtEvidenceIntake = [
  {
    id: "LEAD-WOWLIST-DATABASE-SCALE-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex protected database review",
    kind: "document",
    title: "WOW List historical database aggregate verification",
    summary:
      "Recompute public-safe platform totals and geographic-activity thresholds from the latest unique protected PostgreSQL snapshot without publishing user, organizer, security, location, or content rows.",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["wowlist"],
    sourceIds: ["SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026"],
    claimIds: ["CLM-WOWLIST-DATABASE-SCALE-2017"],
    inquiryIds: ["INQ-WOWLIST-PUBLIC-SOURCE-COVERAGE"],
    notes: [
      "The public repository retains aggregate counts and data-quality boundaries only; raw dump rows, emails, password hashes, user records, event text, and precise geolocation data remain outside the repository.",
      "Thirty-five means city or region labels with at least 50 geocoded posts or events in the July 22, 2017 snapshot, not official chapters, 35 currently active communities, or 35 independently verified organizer groups.",
      "The snapshot supports historical scale through July 21, 2017; it does not establish current platform status, complete uploads, satisfaction, impact, or Jamie's sole ownership."
    ]
  },
  {
    id: "LEAD-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex protected workbook review",
    kind: "document",
    title: "Sunday Dinner event and attendance workbook aggregate verification",
    summary:
      "Test the 300-plus gathering claim against a broad protected RSVP and attendance workbook while withholding participant identities, contact details, addresses, individual attendance histories, and raw rows.",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["sunday-dinner-196"],
    sourceIds: ["SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021"],
    claimIds: ["CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021"],
    inquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS"],
    notes: [
      "The main worksheet contains 345 event-specific columns spanning January 2012 through March 2021; 340 carry a positive cached yes count.",
      "The workbook contains numbering irregularities, livestream entries, formulas, plus-one behavior, and attendance fields that do not support summing cached yes counts into unique people, meals, attendees, or RSVPs.",
      "The workbook strengthens the 300-plus gathering lane only. It does not verify the separate 20-plus resident-artist aggregate."
    ]
  },
  {
    id: "LEAD-CALLSCRIPT-NYCARTC-FORMATION-LINEAGE-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex authenticated Facebook review",
    kind: "website",
    title: "Call Script, popular.vote, and NYC Artist Coalition formation lineage",
    summary:
      "Trace a bounded public sequence from WOW List's popular.vote route through the Call Script identity and a January 2017 DCLA meeting discussion into an open February NYC Artist Coalition priority-setting meeting.",
    sourceUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked"],
    projectIds: ["wowlist", "nyc-artist-coalition", "participatory-public-practice"],
    sourceIds: [
      "SRC-X-WOWLIST-POPULAR-VOTE-2016",
      "SRC-FB-CALLSCRIPT-PAGE-2026",
      "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
      "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026"
    ],
    claimIds: ["CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017"],
    inquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    notes: [
      "A November 2016 @wowlist post routed people to popular.vote for marches, meetings, and local connection; the Call Script Facebook Page links to popular.vote.",
      "The January 27, 2017 public event identifies NYC Artist Coalition and Call Script among its hosts. Its discussion contains a coalition follow-up poll, a February 6 general-meeting route, and an invitation to help choose what the coalition should work on.",
      "Jamie confirms that he established Call Script and carried participation lessons from WOW List into the convening practice. This supports a consequential facilitation and systems lineage, not sole-founder status or a claim that one event caused the coalition to exist.",
      "Participant identities, comments, profiles, invite context, and private Page administration remain excluded. Mutable Facebook response totals are event-level signals, not attendance."
    ]
  }
] satisfies IntakeRecord[];

export const proofDebtEvidenceSources = [
  {
    id: "SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026",
    title: "WOW List July 2017 protected database aggregate run",
    organization: "WOW List",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22T08:00:01-04:00",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe aggregate analysis of the latest unique WOW List PostgreSQL snapshot, created July 22, 2017 and reviewed July 15, 2026.",
    publicNote:
      "A deterministic aggregate pass records 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 tag follows, 20,927 stars, and 15,915 Google Calendar events. Thirty-five nonblank city or region labels contain at least 50 geocoded posts or events.",
    supportsGenerally: [
      "1,846 historical user records",
      "16,142 historical post or event records",
      "23,864 tag or list records",
      "28,837 tag-follow records",
      "20,927 star records",
      "15,915 Google Calendar event records",
      "35 nonblank city or region labels with at least 50 geocoded posts or events",
      "a post-creation range from November 26, 2012, through July 21, 2017"
    ],
    doesNotEstablish: [
      "35 official chapters or currently active communities",
      "35 distinct organizer groups or independently verified city adoptions",
      "current platform operation",
      "unique active users, satisfaction, retention, reach, or impact",
      "complete media uploads or archival completeness",
      "Jamie's sole product, code, or organizational ownership",
      "permission to publish raw records or sensitive fields"
    ],
    protectedLocatorId: "LOC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22"
  },
  {
    id: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
    title: "Sunday Dinner event and attendance workbook",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "Sunday Dinner event and attendance workbook, protected aggregate review conducted July 15, 2026.",
    publicNote:
      "The main worksheet contains 345 event-specific columns from January 2012 through March 2021, including livestream-era entries; 340 columns have a positive cached yes count. Participant rows and contact details remain private.",
    supportsGenerally: [
      "at least 300 documented Sunday Dinner event columns",
      "345 event-specific columns spanning January 2012 through March 2021",
      "340 event columns with a positive cached yes count",
      "a long-running event, invitation, and attendance-tracking practice"
    ],
    doesNotEstablish: [
      "345 unique in-person dinners",
      "a complete lifetime event population",
      "a unique-attendee, unique-participant, meal, or RSVP total",
      "that every yes count represents one person physically present",
      "the 20-plus resident-artist aggregate",
      "permission to publish participant identities, contacts, locations, or attendance histories"
    ],
    protectedLocatorId: "LOC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021"
  },
  {
    id: "SRC-X-WOWLIST-POPULAR-VOTE-2016",
    title: "WOW List popular.vote civic-calendar route",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-11-14",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/wowlist/status/798274424763981824",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List, public post routing people to popular.vote for marches, meetings, and local connection, November 14, 2016.",
    publicNote:
      "The account post provides a direct dated bridge between WOW List's event-distribution identity and the popular.vote civic-calendar route.",
    supportsGenerally: [
      "@wowlist publicly routed people to popular.vote",
      "popular.vote was framed around adding and receiving updates about marches and meetings",
      "a civic-mobilization extension of the event-distribution practice"
    ],
    doesNotEstablish: [
      "individual authorship of the shared-account post",
      "Jamie as sole creator of WOW List or popular.vote",
      "popular.vote use, adoption, attendance, or impact",
      "a complete technical or organizational relationship among the projects"
    ]
  },
  {
    id: "SRC-FB-CALLSCRIPT-PAGE-2026",
    title: "Call Script Facebook Page",
    organization: "Call Script",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script Facebook Page, authenticated public-page review, July 15, 2026.",
    publicNote:
      "The public Page describes Call Script as a representative-calling project and links directly to popular.vote. Its surviving feed also routes to NYC Artist Coalition meetings.",
    supportsGenerally: [
      "Call Script as a public project identity",
      "a direct Call Script Page link to popular.vote",
      "surviving public routing from Call Script to NYC Artist Coalition meetings"
    ],
    doesNotEstablish: [
      "individual authorship of every Page post",
      "the complete project history",
      "audience, adoption, attendance, endorsement, or policy impact",
      "that Page-management access proves original authorship"
    ]
  },
  {
    id: "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
    title: "NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting discussion",
    organization: "NYC Artist Coalition and Call Script",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Call Script, and collaborators, 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' Facebook event discussion, January-February 2017.",
    publicNote:
      "The public event identifies NYC Artist Coalition and Call Script among its hosts and displays 445 Facebook responses. Institutional posts in the discussion invite a follow-up meeting, poll possible dates, link the February 6 NYC Artist Coalition general meeting, and invite participants to help choose the work.",
    supportsGenerally: [
      "a January 27, 2017 public meeting at the NYC Department of Cultural Affairs",
      "NYC Artist Coalition and Call Script among the displayed event hosts",
      "a displayed 445-person Facebook response signal",
      "a follow-up poll leading to a February 6 NYC Artist Coalition general meeting",
      "an open invitation to help set coalition priorities"
    ],
    doesNotEstablish: [
      "445 physical attendees or 445 unique participants",
      "Jamie as sole host, founder, facilitator, or author",
      "the complete founding group or every formation conversation",
      "that one event created or caused NYC Artist Coalition",
      "attendance, endorsement, government adoption, or policy causality"
    ]
  },
  {
    id: "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026",
    title: "Jamie Burkart Call Script and participation-lineage confirmation",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart, firsthand confirmation of Call Script account establishment and the WOW List-to-coalition participation lineage, July 15, 2026.",
    publicNote:
      "Jamie confirms establishing Call Script and describes carrying participation-system lessons from WOW List and popular.vote into convening and early NYC Artist Coalition work.",
    supportsGenerally: [
      "Jamie's establishment of the Call Script public identity",
      "Jamie's intended lineage from WOW List and popular.vote into civic convening",
      "Jamie's bounded facilitation and systems contribution to early coalition formation"
    ],
    doesNotEstablish: [
      "independent corroboration of every remembered action or conversation",
      "sole authorship of WOW List, popular.vote, Call Script, or NYC Artist Coalition",
      "the complete founding group",
      "that Jamie alone created the coalition or caused its later outcomes"
    ],
    protectedLocatorId: "LOC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026"
  }
] satisfies SourceRecord[];

export const proofDebtEvidenceClaims = [
  {
    id: "CLM-WOWLIST-DATABASE-SCALE-2017",
    project: "wowlist",
    internalClaim:
      "A deterministic public-safe pass over the latest unique WOW List database snapshot records 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 tag follows, 20,927 stars, and 15,915 Google Calendar events; 35 nonblank city or region labels contain at least 50 geocoded posts or events.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "By July 2017, WOW List's protected database recorded 1,800+ users, 16,000+ posts or events, and substantial activity in roughly 35 city or region ecosystems.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/wowlist", "/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026",
        relationship: "direct-support",
        supports: [
          "historical aggregate record counts",
          "35 city or region labels with at least 50 geocoded posts or events",
          "snapshot and post-creation date boundaries"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use 1,800-plus and 16,000-plus as historical snapshot floors, not current or unique-active-user measures.",
      "Roughly 35 city ecosystems means 35 nonblank city or region labels with at least 50 geocoded posts or events; it does not mean official chapters, 35 current communities, or 35 independently verified organizer groups.",
      "The archive contains sensitive user, security, content, and location records that must never enter the public repository.",
      "Preserve Richard's shared-project credit and do not infer Jamie's sole ownership from archive custody."
    ],
    antiClaims: [
      "WOW List had 35 official chapters",
      "All 1,846 records were unique active users",
      "The July 2017 snapshot proves current operation or impact",
      "Jamie alone created or operated WOW List",
      "The public repository contains or can expose the raw database"
    ],
    researchInquiryIds: ["INQ-WOWLIST-PUBLIC-SOURCE-COVERAGE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected database review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    project: "sunday-dinner-196",
    internalClaim:
      "A protected Sunday Dinner workbook contains 345 event-specific columns spanning January 2012 through March 2021, with positive cached yes counts in 340 columns; this directly supports the bounded public claim of 300-plus documented gatherings while withholding participant data.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "A protected event and attendance workbook documents more than 300 Sunday Dinner gatherings across a January 2012-March 2021 record span.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner", "/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
        relationship: "direct-support",
        supports: [
          "345 event-specific columns",
          "January 2012-March 2021 record span",
          "340 columns with positive cached yes counts",
          "the bounded 300-plus gathering claim"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source establishes documented event columns, not 345 unique in-person dinners; some entries are livestreams and event numbering is irregular.",
      "Do not sum cached yes counts into unique attendees, people, meals, or RSVPs; plus-ones, formulas, row semantics, and repeated participants prevent that inference.",
      "The source does not establish a complete lifetime population or the separate 20-plus resident-artist aggregate.",
      "Names, contacts, locations, attendance histories, and raw workbook rows remain protected."
    ],
    antiClaims: [
      "Sunday Dinner had exactly 345 unique in-person dinners",
      "Cached yes counts are unique attendees or meals served",
      "The workbook is a public attendance database",
      "This workbook proves the 20-plus resident-artist aggregate",
      "The source is a complete lifetime population"
    ],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected workbook review"]
  },
  {
    id: "CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "Public records trace a bounded formation lineage: @wowlist routed people to popular.vote in November 2016; Call Script linked to popular.vote; and a January 2017 event displaying NYC Artist Coalition and Call Script among its hosts used its discussion to schedule a February 6 coalition general meeting and invite participants to help choose the work. Jamie confirms establishing Call Script and carrying participation-system lessons into this early coalition convening practice.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Jamie carried an event-participation practice from WOW List and popular.vote into Call Script and early NYC Artist Coalition convening. A January 2017 DCLA event discussion led publicly to a follow-up coalition meeting and an invitation to help set priorities.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-POPULAR-VOTE-2016",
        relationship: "direct-support",
        supports: ["dated WOW List route to popular.vote", "civic meeting and event-distribution framing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-CALLSCRIPT-PAGE-2026",
        relationship: "direct-support",
        supports: ["Call Script public identity", "direct Page link to popular.vote", "coalition meeting routes"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
        relationship: "direct-support",
        supports: [
          "NYC Artist Coalition and Call Script among displayed hosts",
          "follow-up meeting poll",
          "route to the February 6 general meeting",
          "open priority-setting invitation"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
        relationship: "corroborating",
        supports: ["February 6 coalition meeting", "open collective priority-setting"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026",
        relationship: "direct-support",
        supports: ["Call Script account establishment", "Jamie's intended cross-project participation lineage"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The sequence supports Jamie's facilitation and systems contribution, not sole-founder, sole-host, or sole-author status.",
      "A formation pathway is not proof that one project or event caused NYC Artist Coalition to exist.",
      "The event record does not identify every host, participant, conversation, or member of the complete founding group.",
      "Facebook responses are mutable event-level signals, not physical attendance, unique people, endorsement, or impact.",
      "WOW List, popular.vote, Call Script, and NYC Artist Coalition remain distinct projects and collective contexts."
    ],
    antiClaims: [
      "Jamie alone founded NYC Artist Coalition",
      "Call Script created NYC Artist Coalition",
      "Everyone who responded attended or became a coalition member",
      "The event discussion is the complete founding record",
      "WOW List, popular.vote, and Call Script were the same product",
      "Jamie authored every shared-account or event-discussion post"
    ],
    researchInquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated source review"]
  }
] satisfies ClaimRecord[];

export const proofDebtEvidencePublicationDecisions = [
  {
    id: "PUB-WOWLIST-DATABASE-SCALE-2017",
    claimId: "CLM-WOWLIST-DATABASE-SCALE-2017",
    decision: "selected",
    audiences: ["hiring managers", "product operations leaders", "community-platform teams"],
    surfaces: ["/work/wowlist", "/work/technical-operations"],
    rationale:
      "The protected aggregate run makes the existing selected scale claim reviewable without exposing raw user, content, location, or security records.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    claimId: "CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    decision: "selected",
    audiences: ["hiring managers", "program operations leaders", "future editors"],
    surfaces: ["/work/196-sunday-dinner", "/work/technical-operations"],
    rationale:
      "The protected workbook directly supports the existing 300-plus gathering floor while preserving participant privacy and leaving the residency aggregate separate.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    claimId: "CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    decision: "reserve",
    audiences: ["civic technology employers", "public-interest technology peers", "future editors"],
    surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"],
    rationale:
      "The sequence provides valuable depth about Jamie's participation-system craft, while the current public site benefits from a shorter organizer and civic-systems argument and the complete founding group remains open.",
    decidedAt: "2026-07-15"
  }
] satisfies PublicationDecision[];
