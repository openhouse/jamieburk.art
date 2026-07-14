import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-WOWLIST-FACEBOOK-POST-CENSUS-2026";
const inquiryId = "INQ-WOWLIST-FACEBOOK-POST-CENSUS-2026";

export const wowListFacebookPostCensus = {
  observedAt: "2026-07-14",
  page: "https://www.facebook.com/wowlist/posts",
  currentPageDisplay: { followers: 185, following: 2 },
  traversal: {
    independentPasses: 2,
    renderedRecordsPerPass: [54, 54],
    renderedRecordsWithJamiePublisherAttributionPerPass: [54, 54],
    duplicateFeaturedAndChronologicalInstances: 1,
    distinctSurvivingPosts: 53,
    recoveredRange: "2015-04-25 through 2018-03-22"
  },
  lifetimeContentLibraryControl: {
    displayedRows: 5,
    publishedDates: ["2018-03-22", "2017-07-03", "2017-04-14", "2017-03-22", "2017-03-15"],
    relationshipToTimeline:
      "A modern Meta Content Library control, not the denominator for the older public Page timeline."
  },
  primaryThemeCounts: {
    productOnboardingAndCommunityGovernance: 13,
    eventAndParticipantAmplification: 12,
    culturalSpaceCareAndSafety: 18,
    civicMobilizationAndPublicCare: 7,
    adjacentCulturalKnowledgeAndOpportunity: 3
  },
  destinationInventory: {
    occurrences: 29,
    renderedRecordsWithRecoveredDestination: 26,
    uniqueCanonicalDestinations: 27,
    wowListDestinations: 19,
    externalDestinations: 8
  },
  completenessStatement:
    "Two authenticated terminal traversals each recovered 54 rendered Page-post records. One community-philosophy post appeared both in Featured and in chronology, leaving 53 distinct surviving posts. Every rendered record received a public-safe disposition, and every record in both passes displayed Facebook's manager-only 'Published by Jamie Burkart' attribution. This is a census of the surviving July 2026 Page surface, not a native Meta export, deletion history, or complete administrator chronology.",
  publicLedger: "docs/knowledge-bank/data/wowlist-facebook-post-ledger.json"
} as const;

const claimIds = [
  "CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
  "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE",
  "CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE",
  "CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION",
  "CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK"
];

const sourceIds = [
  "SRC-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
  "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
  "SRC-FACEBOOK-WOWLIST-CONTENT-LIBRARY-CONTROL-2026",
  "SRC-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
  "SRC-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
  "SRC-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
  "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
  "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016"
];

export const wowListFacebookPostIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population archival-production pass over the surviving WOW List Facebook Page-post timeline, with two-pass reconciliation, publisher attribution, source routing, primary-theme classification, selected source readings, and traction boundaries.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    sourceUrl: "https://www.facebook.com/wowlist/posts",
    entityIds: ["ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds,
    claimIds,
    researchTaskIds: [
      "TASK-WOWLIST-FACEBOOK-POST-CENSUS",
      "TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const wowListFacebookPostSources = [
  {
    id: "SRC-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
    title: "WOW List Facebook Page posts",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List Facebook Page-post timeline, authenticated terminal-scroll review, July 14, 2026.",
    publicNote:
      "The current public Page displays WOW List as an event-sharing and community-building project with the motto 'Being there changes everything.' The manager view exposes publisher attribution that is not visible to ordinary readers.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "the surviving public Page-post surface",
      "the current 185-follower and two-following display",
      "the Page's event-sharing and community-building description"
    ],
    doesNotEstablish: [
      "a native Meta export or deletion history",
      "complete historical analytics or administrator chronology",
      "that Jamie authored embedded or shared source material",
      "adoption, endorsement, reach, causality, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
    title: "WOW List Facebook Page-post population accounting run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata from a two-pass July 2026 census of the surviving WOW List Facebook Page-post timeline.",
    publicNote:
      "The public repository retains aggregate accounting, a redacted 53-item disposition ledger, selected public permalinks, and normalized public destinations. Raw post text, comments, manager tokens, authentication state, and record-level relationship data remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "54 rendered records in each of two independent terminal traversals",
      "53 distinct surviving posts after one Featured/chronology duplicate",
      "manager attribution to Jamie on all 54 rendered records in both passes",
      "a 53-post primary-theme disposition",
      "29 recovered destination occurrences resolving to 27 canonical destinations"
    ],
    doesNotEstablish: [
      "that no historical post was deleted, hidden, or made unavailable",
      "sole lifetime administration of the Page",
      "individual authorship of every post, quotation, image, or linked source",
      "historical engagement analytics, unique people, adoption, endorsement, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-CONTENT-LIBRARY-CONTROL-2026",
    title: "WOW List Meta Content Library lifetime control",
    organization: "Meta",
    kind: "institutional-web-page",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata from the WOW List Page's authenticated lifetime Content Library view, July 14, 2026.",
    publicNote:
      "The modern Content Library displayed five published rows dated March 2017 through March 2018. The older public timeline exposed a much larger surviving population, so the five-row control is retained as a separate product-surface finding rather than treated as the historical denominator.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-CONTENT-LIBRARY-2026-001",
    supportsGenerally: ["five current lifetime-library rows", "the latest recovered publication date of March 22, 2018"],
    doesNotEstablish: ["that WOW List published only five Facebook posts", "a complete lifetime archive", "stable historical metrics"]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
    title: "WOW List community-philosophy post",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-05-23",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/515811585292320",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List community-philosophy post, May 23, 2016.",
    publicNote:
      "The post republishes Shermy Turtel's public account of a WOW List members' online hangout and describes a community-first design intended to make gathering easier. It is participant testimony about project values, not independent evidence of adoption or Jamie's sole authorship.",
    intakeIds: [intakeId],
    supportsGenerally: ["a member-articulated community-first design philosophy", "an online member-feedback setting"],
    doesNotEstablish: ["platform-wide consensus", "adoption or impact", "Jamie's sole authorship of the philosophy or post"]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
    title: "WOW List Women's March calendar post",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-13",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/616983925175085",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List Women's March calendar post, January 13, 2017.",
    publicNote:
      "The post routes readers to a WOW List calendar for Women's March gatherings. It supports civic use of the calendar form, not organization of the marches or resulting attendance.",
    intakeIds: [intakeId],
    supportsGenerally: ["a public civic-gathering calendar route", "reuse of the event-discovery form for distributed marches"],
    doesNotEstablish: ["WOW List organization of the Women's March", "attendance generated by the post", "causal civic impact"]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
    title: "WOW List Let NYC Dance advocacy post",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-07-03",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/702379893302154",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List Let NYC Dance advocacy post, July 3, 2017.",
    publicNote:
      "The post republishes NYC Artist Coalition campaign material, routes readers to Cabaret Law repeal action, and tags elected and cultural stakeholders. Facebook's manager view attributes publication of the WOW List post to Jamie; the shared campaign material retains coalition authorship and credit.",
    intakeIds: [intakeId],
    supportsGenerally: ["cross-project publishing by Jamie", "routing from WOW List into Let NYC Dance advocacy", "public stakeholder-addressing practice"],
    doesNotEstablish: [
      "that every tagged stakeholder saw, endorsed, or acted on the post",
      "that Jamie alone authored or led the coalition campaign",
      "causality for Cabaret Law repeal"
    ]
  },
  {
    id: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
    title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
    author: "Patricia Calhoun",
    organization: "Denver Westword",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
    publicNote:
      "WOW List shared the reporting as cultural-space support context. The article documents a Denver Arts & Venues and Meow Wolf funding arrangement for DIY spaces after closures and heightened safety scrutiny.",
    intakeIds: [intakeId],
    supportsGenerally: ["the cultural-space policy and funding context routed by WOW List"],
    doesNotEstablish: ["press coverage of WOW List", "a WOW List partnership or grant", "Jamie organization of the fund", "impact from sharing"]
  },
  {
    id: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
    title: "The Know Is Closing",
    author: "Matthew Singer",
    organization: "Willamette Week",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-07-01",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
    preferredPublicUrl: "canonical",
    publicCitation: "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
    publicNote:
      "WOW List shared the reporting as cultural-space sustainability context. The article attributes the Portland venue's planned closure to a substantial rent increase while noting an intended relocation.",
    intakeIds: [intakeId],
    supportsGenerally: ["the cultural-space affordability and continuity context routed by WOW List"],
    doesNotEstablish: ["press coverage of WOW List", "WOW List involvement in the venue", "a general causal law about venue closures", "impact from sharing"]
  }
] satisfies SourceRecord[];

export const wowListFacebookPostReadings = [
  {
    id: "READ-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
    sourceId: "SRC-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-PAGE-PURPOSE-2026",
        text: "The current Page describes WOW List as an event-sharing and community-building project and displays the motto 'Being there changes everything.'",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-page-purpose"],
        confidence: "high",
        locator: "Page profile header"
      },
      {
        id: "PROP-FACEBOOK-WOWLIST-CURRENT-FOLLOWER-DISPLAY-2026",
        text: "The Page displayed 185 followers and two following on July 14, 2026.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-current-follower-display"],
        confidence: "high",
        locator: "Page profile header"
      }
    ],
    limitations: [
      "Follower displays are mutable current observations and do not establish historical reach, active users, adoption, endorsement, or impact."
    ],
    researchTaskIds: ["TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
    sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-POST-POPULATION",
        text: "Two independent terminal traversals each recovered 54 rendered records; one post was duplicated between Featured and chronology, leaving 53 distinct surviving posts, all with public-safe dispositions.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-post-population"],
        confidence: "high",
        locator: "Two-pass traversal audit and redacted ledger"
      },
      {
        id: "PROP-FACEBOOK-WOWLIST-JAMIE-PUBLISHER-ATTRIBUTION",
        text: "Facebook's manager-only interface displayed 'Published by Jamie Burkart' on all 54 rendered records in both independent passes.",
        relationToJamie: "direct-role",
        supportTags: ["wowlist-facebook-jamie-publisher-attribution"],
        confidence: "high",
        locator: "Manager-only publisher labels across both complete traversals"
      },
      {
        id: "PROP-FACEBOOK-WOWLIST-PRIMARY-THEME-DISPOSITION",
        text: "The 53-post primary-theme disposition contains 13 product/onboarding/community-governance posts, 12 event/participant-amplification posts, 18 cultural-space care/safety posts, seven civic-mobilization/public-care posts, and three adjacent cultural-knowledge/opportunity posts.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-primary-theme-disposition"],
        confidence: "high",
        locator: "Redacted 53-item ledger"
      },
      {
        id: "PROP-FACEBOOK-WOWLIST-DESTINATION-INVENTORY",
        text: "The rendered corpus exposes 29 public destination occurrences across 26 records, resolving to 27 canonical destinations: 19 WOW List routes and eight external routes.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-destination-inventory"],
        confidence: "high",
        locator: "Normalized public outbound-link inventory"
      }
    ],
    limitations: [
      "The census covers the surviving July 2026 Page surface, not deleted, hidden, or unavailable historical records.",
      "Publisher attribution supports who operated the Page publishing action for the recovered record; it does not assign authorship of shared sources, quotations, campaign copy, images, or every underlying idea.",
      "A native Meta export could change the historical denominator or reveal additional administrator context.",
      "Primary-theme classification is interpretive and assigns one primary category to each distinct post.",
      "Posted destinations document routing, not agreement with every linked claim or resulting action."
    ],
    researchTaskIds: ["TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-WOWLIST-CONTENT-LIBRARY-CONTROL-2026",
    sourceId: "SRC-FACEBOOK-WOWLIST-CONTENT-LIBRARY-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-CONTENT-LIBRARY-FIVE-ROW-CONTROL",
        text: "The authenticated lifetime Content Library displayed five rows dated March 2017 through March 2018, while the public Page timeline exposed a larger older population.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-content-library-control"],
        confidence: "high",
        locator: "Lifetime-filtered Content Library table"
      }
    ],
    limitations: ["The five-row modern control is not treated as the Page's complete historical post population or analytics export."],
    researchTaskIds: ["TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
    sourceId: "SRC-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-MEMBER-COMMUNITY-PHILOSOPHY",
        text: "A public member account describes WOW List as community-first infrastructure intended to reduce ownership friction and make it easier for people to gather.",
        relationToJamie: "outcome-context",
        supportTags: ["wowlist-facebook-member-community-philosophy"],
        confidence: "high",
        locator: "Public post and attributed member statement"
      }
    ],
    limitations: ["This is participant testimony about values and experience, not independent evidence of platform-wide adoption, consensus, or impact."],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
    sourceId: "SRC-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-WOMENS-MARCH-CALENDAR",
        text: "WOW List used its calendar form to route readers toward distributed Women's March gatherings.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-civic-calendar-reuse"],
        confidence: "high",
        locator: "Public post"
      }
    ],
    limitations: ["The post does not establish WOW List organization of the marches, resulting attendance, or causal civic impact."],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
    sourceId: "SRC-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-WOWLIST-LET-NYC-DANCE-BRIDGE",
        text: "Jamie published a WOW List post that framed Cabaret Law repeal as support for community spaces and routed readers into NYC Artist Coalition action and reporting.",
        relationToJamie: "direct-role",
        supportTags: ["wowlist-facebook-cross-project-civic-bridge"],
        confidence: "high",
        locator: "Public post plus manager-only publisher attribution"
      },
      {
        id: "PROP-FACEBOOK-WOWLIST-LET-NYC-DANCE-STAKEHOLDER-ADDRESSING",
        text: "The post addressed the New York City Council and tagged elected and cultural stakeholders in the shared campaign material.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-stakeholder-addressing"],
        confidence: "high",
        locator: "Public post"
      }
    ],
    limitations: [
      "Tagging does not establish that a stakeholder saw, endorsed, or acted on a post.",
      "The shared campaign material retains NYC Artist Coalition and collective authorship and credit.",
      "The post does not establish causality for Cabaret Law repeal."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
    sourceId: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-WESTWORD-DENVER-DIY-FUND-CONTEXT",
        text: "Westword reported that Denver Arts & Venues and Meow Wolf created a funding arrangement for local DIY spaces after venue closures and increased safety scrutiny.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-cultural-space-policy-context"],
        confidence: "high",
        locator: "Article"
      }
    ],
    limitations: ["The article is context routed by WOW List, not coverage of WOW List or evidence that Jamie organized the fund."],
    researchTaskIds: []
  },
  {
    id: "READ-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
    sourceId: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-WILLAMETTE-WEEK-THE-KNOW-AFFORDABILITY-CONTEXT",
        text: "Willamette Week reported that a Portland punk venue planned to close after a substantial rent increase while seeking to relocate.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-facebook-cultural-space-affordability-context"],
        confidence: "high",
        locator: "Article"
      }
    ],
    limitations: ["The article is context routed by WOW List, not coverage of WOW List or evidence that WOW List caused a later outcome."],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const wowListFacebookPostClaims = [
  {
    id: "CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
    project: "wowlist",
    internalClaim:
      "Two independent authenticated traversals recovered the same 54 rendered WOW List Facebook Page-post records; after one Featured/chronology duplicate, the surviving surface contains 53 distinct posts, each with a public-safe disposition.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["wowlist-facebook-post-population"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the two-pass 54-record control", "the 53-post deduplication", "complete public-safe disposition"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-POST-POPULATION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every record on the surviving July 2026 Page surface received a disposition.",
      "The census is not a native Meta export and cannot account for deleted, hidden, or unavailable historical posts."
    ],
    antiClaims: ["WOW List published only 53 Facebook posts.", "The ledger is a complete Meta export or deletion history."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE",
    project: "wowlist",
    internalClaim:
      "Across the complete surviving WOW List Facebook Page-post surface, Facebook's manager view attributed publication of all 54 rendered records representing 53 distinct posts to Jamie Burkart.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: ["wowlist-facebook-jamie-publisher-attribution", "wowlist-facebook-page-purpose"],
    composition: {
      action:
        "Operated WOW List's Facebook Page publishing surface, connecting product guidance, community contributors, cultural events, threatened spaces, and civic gathering routes through a coherent public project identity.",
      intendedEnd:
        "Help people move from social discovery into a community-run event infrastructure and show up for one another in physical places.",
      usableResult:
        "The surviving 2015-2018 Page record contains 53 distinct posts spanning onboarding, community governance, participant amplification, cultural-space care, and civic mobilization; every recovered Page-post record is attributed to Jamie in Facebook's manager interface.",
      audience:
        "Hiring readers evaluating product operations, implementation support, community onboarding, public communication, and cross-domain translation.",
      collectiveCredit:
        "WOW List was Jamie and Richard's project and depended on members, organizers, artists, venues, and local scene maintainers. Shared sources, quotations, events, and campaign material retain their original authorship and collective credit.",
      causalBoundary:
        "Manager attribution establishes Jamie's publishing action across the recovered Page record, not sole lifetime administration, authorship of every embedded source, total social workload, platform adoption, or impact."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
        relationship: "private-support",
        supports: ["manager attribution to Jamie across both complete traversals"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-JAMIE-PUBLISHER-ATTRIBUTION"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
        relationship: "context",
        supports: ["the public Page purpose and surviving project identity"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-PAGE-PURPOSE-2026"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
        relationship: "corroborating",
        supports: ["one direct permalink joining public post content to manager publisher attribution"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-LET-NYC-DANCE-BRIDGE"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use 'published' or 'operated the Page publishing surface,' not 'personally authored every post.'",
      "Do not transfer authorship or accomplishment from shared people, sources, campaigns, spaces, events, or organizations to Jamie.",
      "A native export or collaborator proof note could strengthen the administrator chronology and confirm whether any historical records are missing."
    ],
    antiClaims: [
      "Jamie was the sole lifetime administrator of every WOW List social account.",
      "Jamie personally authored every sentence, quotation, image, event, or linked source on the Page.",
      "Jamie alone created or operated WOW List.",
      "Facebook publishing proves platform adoption or impact."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart memory intake", "Codex authenticated social-archive review", "Codex Chad-lens composition review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE",
    project: "wowlist",
    internalClaim:
      "The 53-post surviving Facebook corpus repeatedly connects product onboarding and community governance with event circulation, cultural-space care and safety, civic gathering, and adjacent cultural knowledge.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "wowlist-facebook-primary-theme-disposition",
      "wowlist-facebook-civic-calendar-reuse",
      "wowlist-facebook-cultural-space-policy-context",
      "wowlist-facebook-cultural-space-affordability-context"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the complete primary-theme disposition"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-PRIMARY-THEME-DISPOSITION"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
        relationship: "corroborating",
        supports: ["civic reuse of the calendar form"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-WOMENS-MARCH-CALENDAR"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
        relationship: "context",
        supports: ["one cultural-space funding and policy context routed by WOW List"],
        propositionIds: ["PROP-WESTWORD-DENVER-DIY-FUND-CONTEXT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
        relationship: "context",
        supports: ["one venue-affordability and continuity context routed by WOW List"],
        propositionIds: ["PROP-WILLAMETTE-WEEK-THE-KNOW-AFFORDABILITY-CONTEXT"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The categories are a one-primary-theme archival classification, not a claim that each post fits only one concern.",
      "Routing a source or action does not establish authorship, organization, partnership, agreement with every linked claim, or resulting impact."
    ],
    antiClaims: ["WOW List organized every amplified event or fund.", "The thematic record proves audience reach, adoption, or civic impact."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION",
    project: "wowlist",
    internalClaim:
      "The surviving Page record preserves public participation by local-scene maintainers and members who promoted WOW List, updated local calendars, added event records, made a tutorial, and articulated community-first project values.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["wowlist-facebook-primary-theme-disposition", "wowlist-facebook-member-community-philosophy"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the recovered participant, tutorial, local-calendar, and onboarding pattern"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-PRIMARY-THEME-DISPOSITION"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
        relationship: "corroborating",
        supports: ["one attributed member account of project values and use"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-MEMBER-COMMUNITY-PHILOSOPHY"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a bounded participation pattern in the surviving social record, not a complete user census.",
      "Public praise, tutorials, event additions, or local promotion do not by themselves establish representative satisfaction, formal partnership, platform-wide adoption, or durable impact."
    ],
    antiClaims: [
      "Every featured participant endorsed every aspect of WOW List.",
      "The examples prove national adoption or active use across all archived city scenes.",
      "Jamie's publishing action makes him the author of participants' statements or work."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK",
    project: "wowlist",
    internalClaim:
      "The surviving Facebook corpus exposes 29 destination occurrences across 26 rendered records, resolving to 27 canonical destinations: 19 WOW List routes and eight external scene, organizing, fundraising, or cultural-space routes.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["wowlist-facebook-destination-inventory"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["normalized posted-destination counts and domain classes"],
        propositionIds: ["PROP-FACEBOOK-WOWLIST-DESTINATION-INVENTORY"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The count includes only destinations recoverable from the current rendered interface; link cards without an exposed destination remain labeled source routes.",
      "Current URL normalization does not prove that each destination resolved identically when posted."
    ],
    antiClaims: ["Every linked destination was a formal WOW List partner.", "Posted links establish click-through, conversion, adoption, or impact."],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  }
] satisfies ClaimRecord[];

export const wowListFacebookPostResearchTasks = [
  {
    id: "TASK-WOWLIST-FACEBOOK-POST-CENSUS",
    project: "wowlist",
    question:
      "Can every distinct post exposed by the surviving WOW List Facebook Page timeline receive a public-safe disposition with publisher, source, mission, stakeholder, and traction boundaries?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds,
    claimIds,
    nextActions: ["Re-run both terminal traversals and compare the redacted population control if Facebook exposes a different timeline."],
    resolutionSummary:
      "Yes. Two passes each recovered 54 rendered records; one Featured/chronology duplicate leaves 53 distinct surviving posts. Every distinct post has a ledger disposition, every rendered record was publisher-attributed to Jamie in the manager view, 27 canonical destinations were inventoried, and all claim, credit, privacy, and metric boundaries are explicit."
  },
  {
    id: "TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION",
    project: "wowlist",
    question:
      "Can a native Meta Page export and collaborator proof notes establish the deleted-post denominator, administrator chronology, and division of publishing labor beyond the surviving manager-attributed record?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: [
      "SRC-FACEBOOK-WOWLIST-PAGE-POSTS-2026",
      "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026",
      "SRC-FACEBOOK-WOWLIST-CONTENT-LIBRARY-CONTROL-2026"
    ],
    claimIds: ["CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE"],
    nextActions: [
      "Request a native Meta Page export without committing raw administrator, audience, comment, or relationship data.",
      "Invite Richard and other collaborators to confirm Page establishment, administration, publishing practice, and collective-credit boundaries.",
      "Reconcile any export against the 53-post surviving control and keep deleted or hidden records distinct from nonexistence."
    ]
  }
] satisfies ResearchTask[];

export const wowListFacebookPostInquiries = [
  {
    id: inquiryId,
    project: "wowlist",
    question:
      "What does the complete surviving WOW List Facebook Page-post population establish about Jamie's publishing role, project practice, source routing, and stakeholder participation without converting social activity into sole authorship, adoption, endorsement, or impact?",
    methods: [
      "Used an authenticated read-only Facebook Page-manager session and traversed the complete public Page-post timeline to a stable terminal position.",
      "Repeated the complete traversal independently and recovered 54 rendered records in each pass.",
      "Deduplicated one community-philosophy post appearing in Featured and in chronology, leaving 53 distinct posts.",
      "Verified Facebook's manager-only 'Published by Jamie Burkart' attribution across all 54 rendered records in both passes.",
      "Assigned one public-safe primary-theme disposition to each distinct post and retained a redacted item ledger without raw text.",
      "Normalized exposed outbound destinations while preserving source-card labels when no exact external URL was available.",
      "Close-read selected public post permalinks and mission-relevant articles, preserving original authorship and linked-work credit.",
      "Separated mutable follower, reaction, comment, and event-response displays from adoption and impact claims."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "Two independent traversals each recovered 54 rendered records and reached a stable terminal position.",
      "One post appeared in both Featured and chronology, leaving 53 distinct surviving posts spanning April 25, 2015, through March 22, 2018.",
      "Every rendered record in both passes displayed manager-only publisher attribution to Jamie.",
      "Primary-theme classification yields 13 product/onboarding/community-governance posts, 12 event/participant-amplification posts, 18 cultural-space care/safety posts, seven civic-mobilization/public-care posts, and three adjacent cultural-knowledge/opportunity posts.",
      "The corpus exposes 29 destination occurrences across 26 records, resolving to 27 canonical destinations: 19 WOW List routes and eight external routes.",
      "Public member and organizer records show people promoting WOW List, updating local calendars, adding events, making a tutorial, and articulating community-first project values.",
      "A July 2017 post directly joins Jamie's WOW List Page publishing action to NYC Artist Coalition's Let NYC Dance advocacy while retaining coalition and source credit.",
      "The current Page displayed 185 followers and two following; these mutable counts are retained as dated interface context, not adoption or impact."
    ],
    limitations: [
      "The current interface is not a native Meta export and cannot reveal deleted, hidden, unavailable, or differently permissioned historical posts.",
      "Manager attribution establishes publication of the recovered Page records, not sole lifetime administration or authorship of every embedded source.",
      "The modern lifetime Content Library displayed only five rows and is not treated as the denominator for the older public timeline.",
      "Primary-theme classification is interpretive and simplifies posts with more than one purpose.",
      "Follower and interaction displays are mutable and do not establish unique people, active use, adoption, endorsement, reach, causality, or impact.",
      "Raw post text, comments, administrator state, relationship data, and authentication material remain outside the public repository."
    ],
    sourceIds,
    publicSummary:
      "The surviving WOW List Facebook record is fully dispositioned at 53 distinct posts. Across two complete traversals, every rendered Page-post record carried manager attribution to Jamie; the corpus documents a sustained practice of product onboarding, community amplification, cultural-space care, civic routing, and source-backed public communication with collective credit intact.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const wowListFacebookPostDecisions = claimIds.map((claimId, index) => ({
  id: `DEC-DEFER-WOWLIST-FACEBOOK-POST-${index + 1}`,
  claimId,
  surface: "future-portfolio-composition",
  decision: "defer" as const,
  rationale:
    claimId === "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE"
      ? "This is strong public-ready reserve evidence for product operations, community onboarding, public identity, and cross-domain translation. Keep it available without crowding the current WOW List case study until the portfolio composition has an audience-specific need."
      : "Retain the complete archival control and mission patterns in the knowledge bank without turning a social census, mutable metrics, or linked-source routing into automatic website copy.",
  decidedAt: "2026-07-14",
  reviewedBy: ["Jamie Burkart", "Codex authenticated social-archive review", "Codex Chad-lens composition review"]
})) satisfies ProjectionDecision[];
