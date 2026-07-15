import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE",
    receivedAt: "2026-07-15",
    kind: "artifact",
    project: "wowlist-sunday-dinner-callscript-bridge",
    publicSummary:
      "A bounded archival pass connected a protected 2017 WOW List production snapshot, a protected Sunday Dinner operating workbook, and public Call Script discussion records to the participatory infrastructure that preceded NYC Artist Coalition.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
      "SRC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
      "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
      "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
      "SRC-CALLSCRIPT-DCLA-EVENT-2017-01-27",
      "SRC-CALLSCRIPT-NYCA-NAMING-POLL-2017-01-27",
      "SRC-CALLSCRIPT-DCLA-LETTER-PROMPT-2017-01-27",
      "SRC-CALLSCRIPT-CURRENT-ADMIN-CONTROL-2026"
    ],
    claimIds: [
      "CLM-WOWLIST-2017-PRODUCTION-SNAPSHOT-SCALE",
      "CLM-WOWLIST-POPULAR-VOTE-SURFACE",
      "CLM-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
      "CLM-CALLSCRIPT-PARTICIPATORY-NAMING-AND-LETTER",
      "CLM-CALLSCRIPT-WOWLIST-NYCA-BRIDGE"
    ],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15"
    ],
    projectionIntent: "bank-only",
    nextActions: [
      "Seek collaborator confirmation or contemporaneous account-creation records before strengthening Jamie's individual Call Script authorship or coalition-founding role.",
      "Keep person-level Sunday Dinner records, WOW List user and geolocation data, and authenticated account-control evidence outside the public repository.",
      "Use social response and reach counters only as platform-displayed context, never as attendance or causal-impact measures."
    ],
    protectedLocatorId: "LOC-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
    title: "WOW List production database snapshot",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-07-22",
    accessedAt: "2026-07-15",
    publicCitation:
      "WOW List production database snapshot, July 22, 2017. Protected archive; aggregate review only.",
    publicNote:
      "A data-only review counted 1,846 users, 16,142 post/event records, 23,864 tags, 28,837 tag follows, 20,927 stars, 2,965 going records, and 35 operational geography labels with at least 50 linked records.",
    protectedLocatorId: "LOC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
    supportsGenerally: [
      "a July 22, 2017 production snapshot with 1,846 user rows and 16,142 post/event rows",
      "23,864 tag rows, 28,837 tag-follow rows, 20,927 star rows, and 2,965 going rows",
      "35 operational city, region, or country labels each linked to at least 50 post/event records",
      "933 distinct post/event records linked to the Popular Vote tag"
    ],
    doesNotEstablish: [
      "current platform activity or a complete lifetime population",
      "official chapters in 35 cities or perfectly deduplicated jurisdictions",
      "unique people represented by every interaction row",
      "permission to expose user, authentication, geolocation, or community records"
    ]
  },
  {
    id: "SRC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
    title: "WOW List production configuration for popular.vote",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "WOW List production configuration for popular.vote. Protected project archive; no public link.",
    publicNote:
      "The production configuration maps popular.vote and www.popular.vote to the Popular Vote community surface within WOW List.",
    protectedLocatorId: "LOC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
    supportsGenerally: [
      "popular.vote and www.popular.vote were configured as custom domains for a Popular Vote WOW List surface",
      "the custom domain resolved to the popularvote community slug"
    ],
    doesNotEstablish: [
      "who authored every item linked to the Popular Vote surface",
      "Call Script account authorship or ownership",
      "the formation of NYC Artist Coalition by itself",
      "current availability of the historic surface"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
    title: "Sunday Dinner attendance and operating workbook",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2012-2021",
    accessedAt: "2026-07-15",
    publicCitation:
      "Sunday Dinner operating workbook, 2012-2021. Protected archive; aggregate review only.",
    publicNote:
      "The working sheet contains 345 numbered gathering columns from January 22, 2012 through March 7, 2021; 340 of those columns contain at least one recorded attendance mark.",
    protectedLocatorId: "LOC-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
    supportsGenerally: [
      "345 numbered Sunday Dinner entries spanning January 22, 2012 through March 7, 2021",
      "340 numbered entries with at least one recorded attendance mark",
      "2,715 recorded attendance marks across the numbered columns",
      "a sustained working practice of attendance tracking and continuity documentation"
    ],
    doesNotEstablish: [
      "a clean attendance census, unique-person count, meal count, or complete lifetime record",
      "that every numbered column represents an identical event format",
      "sole hosting, production, or authorship by Jamie",
      "permission to expose names, phone numbers, email addresses, formulas, or row-level attendance"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
    title: "Call Script public Facebook page",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script, public Facebook page, reviewed July 15, 2026.",
    publicNote:
      "The public page uses the description 'Call your representatives. simply make change,' links to popular.vote, and preserves a route to an early NYC Artist Coalition meeting.",
    supportsGenerally: [
      "Call Script's public identity and popular.vote link",
      "the project's civic call-to-action purpose",
      "a public connection from Call Script to NYC Artist Coalition event organizing"
    ],
    doesNotEstablish: [
      "who created the account or authored every post",
      "Jamie's sole operation of Call Script",
      "a complete account history",
      "coalition formation or institutional endorsement by itself"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-DCLA-EVENT-2017-01-27",
    title: "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs meeting",
    organization: "NYC Artist Coalition and Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/events/388137698233507/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs meeting, Facebook event, January 27, 2017.",
    publicNote:
      "The public event identifies NYC Artist Coalition and Call Script among its hosts and places the meeting at the New York City Department of Cultural Affairs.",
    supportsGenerally: [
      "a January 27, 2017 meeting connecting DIY-space concerns with the Department of Cultural Affairs",
      "NYC Artist Coalition and Call Script as displayed event hosts",
      "the event discussion as a public participatory organizing surface"
    ],
    doesNotEstablish: [
      "attendance from the platform's response counter",
      "Jamie as sole event producer or account operator",
      "Department of Cultural Affairs endorsement of the coalition",
      "a complete host or responsibility map"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-NYCA-NAMING-POLL-2017-01-27",
    title: "Call Script participatory NYC Artist Coalition naming poll",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?post_id=389123648134912&view=permalink",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Call Script, participatory group-naming poll in the January 27, 2017 DCLA event discussion.",
    publicNote:
      "The post asks participants to help choose a name for the group for use in advocacy; NYC Artist Coalition is the leading visible option in the recovered interface.",
    supportsGenerally: [
      "a participatory process for choosing the emerging group's public name",
      "the stated purpose of carrying the name into collective problem-solving and advocacy",
      "NYC Artist Coalition as the leading visible option in the recovered poll interface"
    ],
    doesNotEstablish: [
      "the complete option set or an exact vote count",
      "legal formation of the coalition",
      "Jamie's individual authorship of the post",
      "validated attendance, reach, or long-term impact"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-DCLA-LETTER-PROMPT-2017-01-27",
    title: "Call Script collaborative Department of Cultural Affairs letter prompt",
    organization: "Call Script",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.facebook.com/events/388137698233507/?post_id=388941314819812&view=permalink",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Call Script, collaborative letter prompt in the January 27, 2017 DCLA event discussion.",
    publicNote:
      "The post invites participants to read, edit, and sign a letter to the Commissioner, making collaborative drafting and sign-on part of the meeting's public action path.",
    supportsGenerally: [
      "an invitation to read, edit, and sign a letter to the Commissioner",
      "collaborative drafting and sign-on as public participation mechanisms",
      "Call Script's use as a route from discussion to civic action"
    ],
    doesNotEstablish: [
      "who drafted every part of the letter",
      "the final signatory population or whether the letter was adopted",
      "Jamie's individual authorship of the post",
      "a government response or policy outcome"
    ]
  },
  {
    id: "SRC-CALLSCRIPT-CURRENT-ADMIN-CONTROL-2026",
    title: "Authenticated Call Script page and event administration review",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Authenticated review of current Call Script administration controls, July 15, 2026. Protected research record.",
    publicNote:
      "The authenticated interface displays current management controls for the Call Script page and event discussion to Jamie's account. This is evidence of current custody only.",
    protectedLocatorId: "LOC-CALLSCRIPT-CURRENT-ADMIN-CONTROL-2026",
    supportsGenerally: [
      "current authenticated management access to the Call Script page",
      "current authenticated ability to act as Call Script in the event discussion"
    ],
    doesNotEstablish: [
      "historic account creation, sole ownership, or uninterrupted custody",
      "individual authorship of any 2017 post",
      "the complete collaborator or administrator population",
      "Jamie's sole role in NYC Artist Coalition formation"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-WOWLIST-2017-PRODUCTION-SNAPSHOT-SCALE",
    project: "wowlist",
    internalClaim:
      "A protected July 22, 2017 WOW List production snapshot contains 1,846 user rows and 16,142 post/event rows, with 35 operational geography labels each linked to at least 50 records; these are snapshot aggregates, not current activity, lifetime totals, or official chapters.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A protected July 2017 production snapshot supports WOW List's rounded 1,800-plus-user, 16,000-plus-post/event, and roughly 35-city-ecosystem public scale language.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
        relationship: "private-support",
        supports: [
          "the exact production-snapshot row counts and the bounded 35-geography threshold"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Round public-facing scale language and identify it as a July 2017 production snapshot.",
      "Describe the geography values as operational city ecosystems or labels, never official chapters.",
      "Keep raw users, authentication, geolocation, interactions, and community records offline."
    ],
    antiClaims: [
      "WOW List currently has these users or records",
      "WOW List operated official chapters in 35 cities",
      "The snapshot is a complete lifetime archive"
    ],
    proofClaimIds: ["wowlist-community-platform"],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-POPULAR-VOTE-SURFACE",
    project: "wowlist",
    internalClaim:
      "WOW List's production configuration mapped popular.vote to a Popular Vote community surface, and the July 2017 production snapshot links that tag to 933 distinct post/event records.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "WOW List supported a popular.vote civic-action surface that linked 933 post/event records in the July 2017 production snapshot.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
        relationship: "private-support",
        supports: ["the custom-domain mapping to the Popular Vote community slug"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
        relationship: "private-support",
        supports: ["933 linked distinct post/event records in the snapshot"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat 933 as linked post/event records, not unique actions, organizers, or participants.",
      "Do not infer authorship of every linked record.",
      "Keep the protected production data and configuration locator offline."
    ],
    antiClaims: [
      "Popular Vote had 933 participants",
      "Jamie authored every Popular Vote record",
      "The configuration alone founded NYC Artist Coalition"
    ],
    proofClaimIds: ["wowlist-community-platform"],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
    project: "sunday-dinner",
    internalClaim:
      "A protected Sunday Dinner operating workbook contains 345 numbered gathering columns from January 22, 2012 through March 7, 2021, of which 340 contain at least one recorded attendance mark; the workbook is a working continuity record, not a clean attendance census.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A protected operating workbook tracks 345 numbered Sunday Dinner entries from January 2012 through March 2021; 340 contain at least one recorded attendance mark.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
        relationship: "private-support",
        supports: [
          "the numbered-column count, date span, nonempty-column count, and working-record boundary"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use the workbook to support a 300-plus gathering operating record, not a unique attendance or meal count.",
      "Do not expose names, contact information, row-level participation, formulas, or the workbook location.",
      "Keep collaborative hosting and production credit visible."
    ],
    antiClaims: [
      "The workbook is a comprehensive attendance database",
      "2,715 marks represent 2,715 unique people or meals",
      "Jamie solely hosted or produced all 345 entries"
    ],
    proofClaimIds: ["sunday-dinner-196-participation-infrastructure"],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-CALLSCRIPT-PARTICIPATORY-NAMING-AND-LETTER",
    project: "nyc-artist-coalition",
    internalClaim:
      "In the public discussion for a January 27, 2017 Department of Cultural Affairs meeting, Call Script invited participants to choose the emerging group's public name and separately to read, edit, and sign a letter to the Commissioner; NYC Artist Coalition is the leading visible poll option in the recovered interface.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Call Script's January 2017 event discussion made group naming and collaborative letter drafting public participation mechanisms as NYC Artist Coalition emerged.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-2017-01-27",
        relationship: "context",
        supports: ["the meeting, displayed hosts, date, venue, and discussion context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-NYCA-NAMING-POLL-2017-01-27",
        relationship: "direct-support",
        supports: ["the participatory naming invitation and leading visible option"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-DCLA-LETTER-PROMPT-2017-01-27",
        relationship: "direct-support",
        supports: ["the invitation to read, edit, and sign the letter"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe the records as participatory infrastructure, not proof that a poll legally created the coalition.",
      "Do not assign individual authorship of the shared-account posts without separate evidence.",
      "Do not treat platform response or reach counters as attendance or impact."
    ],
    antiClaims: [
      "The poll alone founded NYC Artist Coalition",
      "Jamie individually authored every Call Script post",
      "The Department of Cultural Affairs endorsed the coalition or letter"
    ],
    proofClaimIds: [
      "nyca-participation-system",
      "nyc-artist-coalition-civic-systems"
    ],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15",
      "INQ-NYCA-JAMIE-INSTRUMENTAL-ROLE"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
  },
  {
    id: "CLM-CALLSCRIPT-WOWLIST-NYCA-BRIDGE",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered project sequence connects WOW List's popular.vote civic-action surface to Call Script's January 2017 participatory naming and letter workflow and onward to NYC Artist Coalition's public event identity. Jamie reports facilitating this bridge; current authenticated Call Script administration corroborates custody but does not independently establish historic creation or sole authorship.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie identifies Call Script as a bridge between WOW List's popular.vote civic-action surface and his facilitation of NYC Artist Coalition's emergence; project records corroborate the sequence while individual authorship remains partly first-person evidence.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
        relationship: "context",
        supports: ["the popular.vote community surface within WOW List"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
        relationship: "corroborating",
        supports: ["the public popular.vote link and Call Script-to-NYC Artist Coalition route"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-NYCA-NAMING-POLL-2017-01-27",
        relationship: "corroborating",
        supports: ["participatory naming in the emerging coalition context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CALLSCRIPT-CURRENT-ADMIN-CONTROL-2026",
        relationship: "private-support",
        supports: ["Jamie's current authenticated custody of the Call Script surface"],
        confidence: "moderate",
        roleBasis: "mixed",
        renderCitation: false
      }
    ],
    boundaries: [
      "Attribute the bridge interpretation and facilitation role to Jamie until collaborator or contemporaneous role evidence is recovered.",
      "Current administration access does not prove historic creation, sole ownership, or individual post authorship.",
      "Keep the coalition's emergence collective and participatory."
    ],
    antiClaims: [
      "Jamie alone founded NYC Artist Coalition",
      "Current Call Script access proves Jamie authored every historic post",
      "WOW List or popular.vote automatically became NYC Artist Coalition"
    ],
    proofClaimIds: [
      "nyc-artist-coalition-public-web-infrastructure",
      "nyca-participation-system"
    ],
    researchInquiryIds: [
      "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15",
      "INQ-NYCA-JAMIE-INSTRUMENTAL-ROLE"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15",
    project: "wowlist-sunday-dinner-callscript-bridge",
    question:
      "What can the WOW List production archive, Sunday Dinner operating workbook, and Call Script event discussion establish about the scale and participatory infrastructure that preceded NYC Artist Coalition?",
    methods: [
      "Restored the latest unique July 2017 WOW List database snapshot into a private data-only working copy and counted governed tables and operational geography labels without copying raw records into the repository.",
      "Verified the production custom-domain mapping for popular.vote and counted distinct post/event records linked to its community tag.",
      "Read the Sunday Dinner workbook as a working operational artifact, enumerating numbered event columns, date range, and attendance-mark coverage while withholding every person-level field.",
      "Used an authenticated browser to close-read the public Call Script page and the complete visible discussion for the January 27, 2017 Department of Cultural Affairs event.",
      "Separated public project sequence, Jamie's first-person role account, current authenticated custody, and shared-account authorship into distinct evidence relationships."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The July 2017 WOW List snapshot directly supports the portfolio's rounded 1,800-plus users, 16,000-plus posts/events, and roughly 35 city-ecosystem scale language.",
      "WOW List production configuration maps popular.vote to a Popular Vote community surface; the snapshot links 933 distinct post/event records to that tag.",
      "The Sunday Dinner workbook tracks 345 numbered entries from January 2012 through March 2021, with 340 containing at least one recorded attendance mark.",
      "Call Script's January 2017 discussion used participatory group naming and collaborative letter editing/sign-on as explicit organizing mechanisms in the emerging NYC Artist Coalition context.",
      "The public page links Call Script to popular.vote and to NYC Artist Coalition events, supporting a project-level bridge; Jamie's individual facilitation and account-establishment role remains partly first-person evidence."
    ],
    limitations: [
      "The WOW List snapshot is not current, comprehensive lifetime data, or evidence of official city chapters.",
      "The Sunday Dinner workbook is a working artifact rather than a clean attendance census; recorded marks are not unique people or meals.",
      "Current authenticated Call Script administration does not prove historic account creation, sole custody, or individual authorship of 2017 posts.",
      "Facebook response and reach counters were not used as attendance or impact measures.",
      "No collaborator confirmation or complete founding responsibility map was recovered in this pass."
    ],
    sourceIds: [
      "SRC-WOWLIST-PRODUCTION-SNAPSHOT-2017-07-22",
      "SRC-WOWLIST-POPULAR-VOTE-CONFIGURATION-2017",
      "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2012-2021",
      "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
      "SRC-CALLSCRIPT-DCLA-EVENT-2017-01-27",
      "SRC-CALLSCRIPT-NYCA-NAMING-POLL-2017-01-27",
      "SRC-CALLSCRIPT-DCLA-LETTER-PROMPT-2017-01-27",
      "SRC-CALLSCRIPT-CURRENT-ADMIN-CONTROL-2026"
    ],
    publicSummary:
      "A bounded archival pass recovered production-scale support for WOW List, a 345-entry Sunday Dinner operating record, and public evidence that Call Script used participatory naming and collaborative letter-writing as NYC Artist Coalition emerged; Jamie's individual bridge role remains explicitly mixed evidence.",
    protectedLocatorId: "LOC-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-BRIDGE-2026-07-15"
  }
] satisfies ResearchInquiry[];

export const wowlistSundayDinnerCallscriptBatch = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
};
