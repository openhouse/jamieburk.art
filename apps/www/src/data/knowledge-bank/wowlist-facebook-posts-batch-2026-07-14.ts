import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type WowlistFacebookPostsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

export const wowlistFacebookPostIntake = [
  {
    id: "INTAKE-2026-07-14-WOWLIST-FACEBOOK-POST-POPULATION",
    receivedAt: "2026-07-14",
    kind: "artifact",
    project: "wowlist",
    publicSummary:
      "Account for the complete current public WOW List Facebook Page timeline, route its mission-relevant sources, distinguish current engagement displays from impact, and preserve every recovered record without forcing the corpus onto the portfolio site.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-WOWLIST-FACEBOOK-PAGE-2026",
      "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
      "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
      "SRC-WOWLIST-FACEBOOK-POST-REPORT-2026",
      "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-POST",
      "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-POST"
    ],
    claimIds: [
      "CLM-WOWLIST-FACEBOOK-CURRENT-POST-POPULATION-2026",
      "CLM-WOWLIST-FACEBOOK-COMMUNITY-ROUTING-PRACTICE",
      "CLM-WOWLIST-FACEBOOK-CROSS-PROJECT-CIVIC-ROUTING",
      "CLM-WOWLIST-FACEBOOK-CURRENT-TRACTION-SNAPSHOT-2026",
      "CLM-WOWLIST-FACEBOOK-ACCOUNT-STATED-SCALE",
      "CLM-WOWLIST-FACEBOOK-COMMUNITY-DESIGN-ATTRIBUTION"
    ],
    researchInquiryIds: [
      "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      "INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"
    ],
    projectionIntent: "bank-only",
    nextActions: [
      "Reconcile an authorized Meta export or historical Page backup against the 53-record current public control if one becomes available.",
      "Close-read and preserve selected posted destinations before promoting them from research routes to independent evidence.",
      "Keep current follower and reaction displays out of impact claims and retain the present site composition unless a role-specific audience needs this reserve depth.",
      "Use the governed event, space, organizer, tour, and participatory-design themes as photo-retrieval leads without inferring identity, role, outcome, rights, consent, or publication approval."
    ],
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POST-POPULATION-2026-001",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "INTAKE-2026-07-14-WOWLIST-SOCIAL-MANAGEMENT-MEMORY",
    receivedAt: "2026-07-14",
    kind: "memory",
    project: "wowlist",
    publicSummary:
      "Jamie recalls that WOW List was his and Richard's project and believes he managed all of the project's social presence. The memory is retained as a role hypothesis while collaborator or platform corroboration remains open.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: ["SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026"],
    claimIds: ["CLM-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY"],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
    projectionIntent: "bank-only",
    nextActions: [
      "Ask Richard and other collaborators who created, administered, scheduled, and wrote for the WOW List social accounts.",
      "Review an authorized Page-role history, account export, password-manager history, or contemporaneous correspondence if available.",
      "Do not convert Page identity, current review state, or writing-style similarity into historical sole authorship."
    ],
    protectedLocatorId: "RESEARCH-WOWLIST-SOCIAL-MANAGEMENT-2026-001",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies IntakeRecord[];

export const wowlistFacebookPostSources = [
  {
    id: "SRC-WOWLIST-FACEBOOK-PAGE-2026",
    title: "WOW List public Facebook Page",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The Page described WOWLIST.ORG as an event-sharing and community-building project, used the line 'Being there changes everything!', and displayed 185 followers. The follower count is a mutable current snapshot.",
    supportsGenerally: [
      "the WOW List Page identity and project description",
      "the current 185-follower display",
      "the relationship between the Page and WOWLIST.ORG"
    ],
    doesNotEstablish: [
      "a lifetime post denominator",
      "historical reach or impact",
      "the human author or administrator of any post",
      "Jamie's sole management of the social presence"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
    title: "Protected WOW List Facebook current-post population run",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 browser census of the current public WOW List Facebook timeline.",
    publicNote:
      "A forward terminal traversal and a reverse traversal each recovered the same 53 distinct top-level public post units. Additional protected controls did not establish a lifetime denominator.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POST-POPULATION-2026-001",
    supportsGenerally: [
      "53 current public timeline records",
      "an exact forward and reverse set match",
      "30 distinct mission-relevant destination URLs across 10 normalized hostnames",
      "37 records with at least one currently displayed like, an 81-like current display floor, and a largest single-post display of 13",
      "the failure of additional protected controls to establish a lifetime denominator"
    ],
    doesNotEstablish: [
      "every Facebook post ever created by WOW List",
      "records deleted, hidden, unpublished, or otherwise unavailable before capture",
      "historical analytics, unique people, reach, attendance, endorsement, conversion, or impact",
      "the human author or administrator of any post"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
    title: "Public-safe WOW List Facebook current-post disposition ledger",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/98851dd8067bc89e09f687c52e58d6420511d6e2/docs/knowledge-bank/data/wowlist-public-facebook-post-ledger.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe row-level disposition ledger for the current WOW List Facebook Page timeline, July 14, 2026.",
    publicNote:
      "Contains one public-safe summary and research disposition for each of 53 recovered current post units, plus posted mission-relevant destinations and aggregate accounting. It omits comments, commenter identities, raw account state, private analytics, and per-record reaction details.",
    supportsGenerally: [
      "complete row-level disposition of the 53-record current control",
      "community-calendar, cultural-space, touring, mutual-aid, civic-action, and participatory-design patterns",
      "30 distinct mission-relevant posted destination URLs across 10 normalized hostnames",
      "the separation of corpus accounting from historical authorship and impact"
    ],
    doesNotEstablish: [
      "a native Meta export or lifetime archive",
      "the truth of every account-stated figure",
      "that every posted destination was used or adopted",
      "individual post authorship"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-POST-REPORT-2026",
    title: "WOW List Facebook current-post archival production report",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/98851dd8067bc89e09f687c52e58d6420511d6e2/docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart portfolio research, WOW List Facebook current-post archival production report, July 14, 2026.",
    publicNote:
      "Documents the population control, source routes, community and stakeholder patterns, mutable engagement snapshot, authorship boundary, and future research actions.",
    supportsGenerally: [
      "the public-safe method and aggregate findings for the current 53-record population",
      "the editorial decision to retain this corpus as bank depth",
      "the distinction between Page identity, Jamie's memory, post authorship, and project outcomes"
    ],
    doesNotEstablish: [
      "a native Meta export",
      "deleted or hidden historical posts",
      "sole social-account management by Jamie",
      "historical reach or impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-POST",
    title: "WOW List post amplifying Let NYC Dance",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/702379893302154",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List public Facebook post amplifying NYC Artist Coalition's Let NYC Dance campaign.",
    publicNote:
      "The post framed community spaces as centers of support, explained the Cabaret Law issue, invited a City Council call to action, and shared NYC Artist Coalition material. It records WOW List's outbound civic routing, not reverse engagement by a Council account.",
    supportsGenerally: [
      "WOW List's public amplification of Let NYC Dance",
      "an account-level connection between cultural event infrastructure and civic advocacy",
      "a public call to contact the New York City Council"
    ],
    doesNotEstablish: [
      "engagement by a Council-member account",
      "Jamie's authorship of the post",
      "policy causality",
      "sole leadership of the coalition campaign"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-POST",
    title: "WOW List Women's March calendar post",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-13",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/616983925175085",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List public Facebook post routing readers to a Women's March calendar, January 13, 2017.",
    publicNote:
      "A dated example of WOW List being used to organize discovery of geographically distributed civic events.",
    supportsGenerally: [
      "WOW List's public routing to a Women's March calendar",
      "event-discovery infrastructure applied to civic participation"
    ],
    doesNotEstablish: [
      "attendance or participation resulting from the post",
      "Jamie's authorship of the post",
      "ownership or production of the Women's March events"
    ]
  },
  {
    id: "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
    title: "Jamie Burkart first-person WOW List social-management recollection",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe record of Jamie Burkart's July 2026 first-person recollection about WOW List social-account management.",
    publicNote:
      "Jamie recalls WOW List as a project with Richard and believes he managed all of its social presence. The account archive does not expose historical per-post authorship or administrator history, so the recollection remains a role hypothesis pending corroboration.",
    protectedLocatorId: "RESEARCH-WOWLIST-SOCIAL-MANAGEMENT-2026-001",
    supportsGenerally: [
      "Jamie's first-person recollection that he managed WOW List's social presence",
      "Jamie's explicit recognition of WOW List as a shared project with Richard"
    ],
    doesNotEstablish: [
      "historical sole administration",
      "individual authorship of all posts",
      "the absence of collaborator posting, editing, scheduling, or account management"
    ]
  }
] satisfies SourceRecord[];

export const wowlistFacebookPostClaims = [
  {
    id: "CLM-WOWLIST-FACEBOOK-CURRENT-POST-POPULATION-2026",
    project: "wowlist",
    internalClaim:
      "Two terminal traversals of WOW List's current public Facebook timeline recovered the same 53 distinct top-level post units.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The current public WOW List Facebook timeline is fully accounted for at 53 distinct post units, with an exact forward and reverse traversal match.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["the 53-record forward and reverse exact set match"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "corroborating",
        supports: ["one public-safe disposition for each of the 53 current records"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a complete accounting of the current public timeline surface, not every post ever created.",
      "Deleted, hidden, unpublished, or otherwise unavailable records cannot be inferred from the current Page.",
      "Additional protected controls did not establish a lifetime denominator."
    ],
    antiClaims: [
      "WOW List created only 53 Facebook posts",
      "The 53 records are a native Meta export",
      "No Facebook post was ever deleted or hidden"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-COMMUNITY-ROUTING-PRACTICE",
    project: "wowlist",
    internalClaim:
      "The current 53-record Page corpus documents WOW List being used to route people toward local community calendars, touring projects, cultural-space support, mutual-aid campaigns, civic-action calendars, and participatory product conversations.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "WOW List's surviving Facebook posts connect event discovery with local calendar stewardship, touring artists, cultural-space mutual aid, civic participation, and an invitation for members to discuss product design.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: [
          "the 53-record thematic disposition",
          "30 distinct mission-relevant destination URLs across 10 normalized hostnames",
          "stakeholder patterns spanning local organizers, artists, space stewards, donors, civic organizers, and event-goers"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-POST",
        relationship: "corroborating",
        supports: ["a dated example of civic-event routing"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted route does not establish that a reader used it, attended, donated, joined, or adopted the platform.",
      "The categories summarize the current surviving corpus and are not a measure of effort, reach, or project importance.",
      "The Page identity does not identify the human author of each post."
    ],
    antiClaims: [
      "Every promoted event or campaign resulted from WOW List",
      "The posts prove attendance, conversion, or adoption",
      "Jamie personally authored every routed item"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-CROSS-PROJECT-CIVIC-ROUTING",
    project: "wowlist",
    internalClaim:
      "WOW List's Page amplified NYC Artist Coalition's Let NYC Dance campaign and used the event-sharing identity to route readers toward a City Council call to action.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "WOW List's public identity crossed from event discovery into civic participation, including amplification of NYC Artist Coalition's Let NYC Dance campaign and a City Council call to action.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-POST",
        relationship: "direct-support",
        supports: [
          "WOW List's amplification of Let NYC Dance",
          "the Page's invitation to contact the New York City Council"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is outbound routing by WOW List, not recovered reverse engagement by a Council-member account.",
      "The post does not identify the human author.",
      "Campaign outcomes and policy causality remain collective."
    ],
    antiClaims: [
      "The New York City Council engaged with WOW List",
      "Jamie authored this post",
      "WOW List caused Cabaret Law repeal"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-CURRENT-TRACTION-SNAPSHOT-2026",
    project: "wowlist",
    internalClaim:
      "On July 14, 2026, the Page displayed 185 followers; 37 of 53 current post units displayed at least one like, with an 81-like aggregate current floor and a largest single-post display of 13.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "The July 2026 interface displayed 185 Page followers and at least one like on 37 of 53 current post units. These mutable displays are retained as a retrieval snapshot, not an impact measure.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-PAGE-2026",
        relationship: "direct-support",
        supports: ["the current 185-follower display"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: [
          "37 current records with at least one displayed like",
          "the 81-like current aggregate floor",
          "the largest single-post display of 13"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "All values are mutable current-interface observations rather than contemporaneous historical analytics.",
      "Likes are not unique people, reach, attendance, endorsement, conversion, or impact.",
      "The aggregate is retained for data-quality accounting and must not be projected as a performance total."
    ],
    antiClaims: [
      "WOW List reached 185 people",
      "The corpus generated 81 engagements",
      "The largest post reached only 13 people",
      "Current visible likes measure project impact"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-ACCOUNT-STATED-SCALE",
    project: "wowlist",
    internalClaim:
      "The surviving Page corpus includes an account post stating that members in nine cities introduced community calendars and another stating that a Los Angeles organizer added 41 upcoming DIY shows.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "The account publicly announced community calendars in nine cities and credited a Los Angeles organizer with adding 41 upcoming DIY shows; independent corroboration of those exact figures remains open.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["the exact account-stated nine-city and 41-show figures"],
        locator: "current-033 and current-039",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The evidence directly supports that the Page made these statements, not that an independent audit verified the figures.",
      "Do not broaden the figures into lifetime platform scale, active-city, user, or event totals.",
      "Do not attribute the statements to Jamie without authorship corroboration."
    ],
    antiClaims: [
      "Independent sources verified nine active WOW List cities from this pass",
      "The platform contained exactly 41 Los Angeles events in total",
      "Jamie authored both posts"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-COMMUNITY-DESIGN-ATTRIBUTION",
    project: "wowlist",
    internalClaim:
      "The surviving Page corpus preserves a member quotation attributing to Jamie a community-first account of WOW List design and a separate invitation to members to help improve the site through a video conversation.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "A surviving member quotation attributes a community-first account of WOW List's design to Jamie, while another post invited members into a live conversation about improving the site.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: [
          "the member quotation attributed to Jamie",
          "the public invitation into participatory site design"
        ],
        locator: "current-032, current-034, and current-037",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The member quotation is a public attribution, not an independently verified transcript of Jamie's words.",
      "The site-design invitation supports an open participation structure, not attendance or resulting product changes.",
      "Preserve Richard's and the community's project contributions."
    ],
    antiClaims: [
      "The Page quote is a verbatim recording of Jamie",
      "Jamie solely designed WOW List's community-participation model",
      "The conversation produced a specific feature or decision"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY",
    project: "wowlist",
    internalClaim:
      "Jamie recalls WOW List as his and Richard's project and believes he managed all of the project's social presence.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie recalls managing WOW List's social presence; collaborator or platform corroboration is still needed before this becomes a public role claim.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
        relationship: "direct-support",
        supports: ["Jamie's first-person recollection and its stated uncertainty"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-PAGE-2026",
        relationship: "supports-boundary",
        supports: ["the Page identity without human authorship metadata"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The Page publishes under the WOW List identity and does not expose historical per-post authorship.",
      "Current review state does not prove historical sole administration.",
      "Writing style, project integration, and a member's attribution are research leads rather than sufficient proof of every-post authorship.",
      "Preserve WOW List as a project shared with Richard."
    ],
    antiClaims: [
      "Jamie has been proven to have authored every WOW List Facebook post",
      "No collaborator ever posted, edited, scheduled, or administered the Page",
      "Current Page access is historical administrator proof"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const wowlistFacebookPostInquiries = [
  {
    id: "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026",
    project: "wowlist",
    question:
      "What is the complete current public WOW List Facebook Page post population, which mission-relevant source routes and stakeholder patterns does it preserve, and what can current engagement displays establish?",
    methods: [
      "Opened the public Page in a browser session and confirmed the WOW List Page identity.",
      "Inspected additional protected controls before determining that they did not establish a lifetime denominator.",
      "Traversed the current public Page timeline to its terminal state and checkpointed each distinct top-level post unit.",
      "Repeated the traversal in reverse and compared the complete record-key sets.",
      "Dispositioned all 53 matched records by mission theme, stakeholder group, and recoverable posted destination.",
      "Separated mutable current follower and like displays from historical analytics, unique people, reach, endorsement, conversion, and impact.",
      "Excluded comments, commenter identities, raw authentication state, private analytics, and browser artifacts from the public repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The forward and reverse terminal traversals each recovered 53 distinct current public post units, with no set difference.",
      "The corpus exposes 30 distinct mission-relevant destination URLs across 10 normalized hostnames, including 20 WOW List routes.",
      "The surviving posts repeatedly connect local calendar stewardship, artist and tour routing, cultural-space support, mutual aid, civic action, and an invitation into participatory product design.",
      "Stakeholder groups include local organizers, artists and touring projects, cultural-space stewards, donors, civic and movement organizers, platform members, and event-goers.",
      "The Page publicly stated that members in nine cities introduced community calendars and that one Los Angeles organizer added 41 upcoming DIY shows; these exact figures were not independently corroborated in this pass.",
      "A Let NYC Dance post documents outbound routing to the New York City Council and NYC Artist Coalition; this population does not establish reverse engagement by Council-member accounts.",
      "The Page displayed 185 followers; 37 of 53 post units displayed at least one like, with an 81-like current aggregate floor and a largest single-post display of 13.",
      "Additional protected controls did not establish a lifetime denominator."
    ],
    limitations: [
      "The current Page timeline is not a native Meta export and cannot reveal records deleted, hidden, unpublished, or otherwise unavailable before capture.",
      "A complete current-surface accounting is not a complete lifetime archive.",
      "Many legacy post dates were not exposed consistently and were not inferred.",
      "A posted destination does not prove that readers used it, attended, joined, donated, or adopted the platform.",
      "Account-stated scale figures are preserved as account statements until independently corroborated.",
      "Current follower and like displays are mutable and do not establish historical reach, unique people, endorsement, conversion, causality, or impact.",
      "The Page identity does not expose the human author or administrator for each post."
    ],
    sourceIds: [
      "SRC-WOWLIST-FACEBOOK-PAGE-2026",
      "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
      "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
      "SRC-WOWLIST-FACEBOOK-POST-REPORT-2026",
      "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-POST",
      "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-POST"
    ],
    publicSummary:
      "Two terminal traversals recovered the same 53-item current public WOW List Facebook population. The posts preserve a cross-city practice of calendar stewardship, cultural-space support, artist routing, civic participation, and participatory design, while lifetime completeness, human authorship, and historical impact remain open.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POST-POPULATION-2026-001"
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026",
    project: "wowlist",
    question:
      "Can Jamie's recollection that he managed all WOW List social presence be corroborated without converting Page identity or current access into historical sole authorship?",
    methods: [
      "Recorded Jamie's first-person recollection and his explicit description of WOW List as a shared project with Richard.",
      "Inspected protected controls for historical per-post authorship or administrator history.",
      "Separated the Page publishing identity, a member quotation attributed to Jamie, and historical human authorship.",
      "Identified collaborator confirmation and authorized platform records as the next evidence needed."
    ],
    runAt: "2026-07-14",
    resultStatus: "inconclusive",
    findings: [
      "Jamie recalls that he managed WOW List's social presence.",
      "The current public posts publish under the WOW List project identity rather than a named human author.",
      "A surviving member quotation attributes a community-first account of WOW List's design to Jamie, but this does not establish authorship of the Page corpus.",
      "The inspected interfaces did not expose historical per-post authorship or a complete administrator-role history."
    ],
    limitations: [
      "The current review state does not prove historical sole administration or authorship.",
      "Writing-style similarity and cross-project integration are circumstantial research leads, not every-post authorship proof.",
      "Richard and other collaborators have not yet been asked to confirm posting and account-management responsibilities.",
      "An authorized Page-role history, account export, password-manager record, or contemporaneous correspondence was not recovered in this pass."
    ],
    sourceIds: [
      "SRC-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026",
      "SRC-WOWLIST-FACEBOOK-PAGE-2026",
      "SRC-WOWLIST-FACEBOOK-POST-POPULATION-RUN-2026",
      "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026"
    ],
    publicSummary:
      "Jamie recalls managing WOW List's social presence, but the current Page archive does not expose historical human authorship or administrator history. The memory remains a governed role hypothesis pending collaborator or platform corroboration.",
    protectedLocatorId: "RESEARCH-WOWLIST-SOCIAL-MANAGEMENT-2026-001"
  }
] satisfies ResearchInquiry[];

export const wowlistFacebookPostsBatch: WowlistFacebookPostsBatch = {
  intakeRecords: wowlistFacebookPostIntake,
  sources: wowlistFacebookPostSources,
  claims: wowlistFacebookPostClaims,
  researchInquiries: wowlistFacebookPostInquiries
};
