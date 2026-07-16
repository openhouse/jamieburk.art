import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycartcFacebookPostAudit = {
  ownerTimelineRecords: 441,
  startBoundary: "2017-01-29",
  endBoundary: "2021-09-15",
  scrollOperations: 260,
  terminalScrollsWithoutAddition: 40,
  forms: {
    eventRoutes: 148,
    standalonePosts: 136,
    originalMediaPosts: 78,
    resharedStories: 53,
    sourceOrResourceRoutes: 26
  },
  primaryThemes: {
    nightlifeEnforcementAndGovernance: 157,
    generalCoalitionCommunication: 92,
    commercialRentAndTenancy: 71,
    culturalSpaceCare: 47,
    publicMeetingsAndParticipation: 25,
    fundingAndOperationalResources: 21,
    eventAndCulturalDistribution: 15,
    pressAndPublicKnowledge: 11,
    equitySolidarityAndMutualAid: 2
  },
  stakeholderGroupOccurrences: {
    nycCouncilMembersAndCouncil: 86,
    nycCulturalAndNightlifeAgencies: 40,
    culturalAndAdvocacyPartners: 38,
    nycBusinessAndEnforcementAgencies: 13,
    pressAndPublicInformationOrganizations: 11
  },
  recordsWithVisibleInteraction: 386,
  reactions: 2366,
  comments: 212,
  shares: 611,
  outboundLinkOccurrences: 64,
  uniqueDirectOutboundUrls: 39,
  ownerPhotoRecords: 84,
  eventLinkedRecords: 164,
  publisherAttribution: {
    status: "unresolved",
    individuallyAttributedRecords: 0
  },
  firstPartyManagedContentCrosscheck: {
    laterEventMaintenanceObserved: true,
    equivalentToPublicTimeline: false
  },
  censusPath:
    "docs/knowledge-bank/data/nycartc-facebook-post-census-2026-07-14.csv"
} as const;

const selectedPostSources = [
  {
    id: "SRC-FB-NYCAC-CABARET-REPEAL-EVENT-2017",
    title: "Cabaret Law repeal event route",
    publishedAt: "2017-10-30",
    canonicalUrl: "https://www.facebook.com/events/133554860735306/",
    publicCitation:
      "NYC Artist Coalition, Cabaret Law repeal event route, Facebook, October 30, 2017.",
    supportsGenerally: [
      "the Page routed people to a public Cabaret Law repeal event",
      "the post linked contemporaneous New York Times reporting",
      "the current record displays 95 reactions, four comments, and 60 shares"
    ],
    doesNotEstablish: [
      "unique people reached or historical peak engagement",
      "physical attendance, endorsement, or policy causality",
      "individual publisher or drafter identity"
    ]
  },
  {
    id: "SRC-FB-NYCAC-NIGHT-MAYOR-ROUTE-2018",
    title: "Meet NYC's first Night Mayor route",
    publishedAt: "2018-03-26",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2017203981867313&set=a.544849644343446",
    publicCitation:
      "NYC Artist Coalition, 'Meet NYC's First Night Mayor: Save NYC Spaces,' Facebook post, March 2018.",
    supportsGenerally: [
      "the Page routed people into a coalition event with the Office of Nightlife",
      "the shared identity connected cultural-space advocacy with public participation"
    ],
    doesNotEstablish: [
      "Jamie's individual production or publishing tasks",
      "physical attendance, endorsement, or policy causality"
    ]
  },
  {
    id: "SRC-FB-NYCAC-MARCH-TRANSPARENCY-2020",
    title: "MARCH transparency report route",
    publishedAt: "2020-07-23",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2686676394920065&set=a.544849644343446",
    publicCitation:
      "NYC Artist Coalition, MARCH transparency report route, Facebook, July 2020.",
    supportsGenerally: [
      "the Page carried MARCH accountability work into a public information route",
      "the shared account connected records work with coalition campaigning"
    ],
    doesNotEstablish: [
      "Jamie's individual role in obtaining or analyzing the records",
      "that MARCH was disbanded",
      "sole coalition causality for legislation or agency change"
    ]
  },
  {
    id: "SRC-FB-NYCAC-FAIR-RENT-VIRTUAL-HOUSE-2021",
    title: "FairRentNYC virtual-house action route",
    publishedAt: "2021-09-15",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2960969320824103&set=a.544849644343446",
    publicCitation:
      "NYC Artist Coalition, FairRentNYC virtual-house action route, Facebook, September 15, 2021.",
    supportsGenerally: [
      "the latest surviving public timeline record routed people to a Commercial Rent Stabilization action",
      "the shared identity continued across coalition campaigns through September 2021"
    ],
    doesNotEstablish: [
      "individual publisher or drafter identity",
      "bill passage, attendance, reach, endorsement, or policy causality"
    ]
  }
] as const;

const selectedPostSourceIds = selectedPostSources.map((source) => source.id);

export const nycartcFacebookPostIntake = [
  {
    id: "LEAD-NYCAC-FACEBOOK-FULL-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for NYC Artist Coalition Facebook posts",
    summary:
      "Disposition the complete surviving public Page timeline, identify mission-relevant source and stakeholder-routing patterns, and preserve Jamie's recollection of predominant account operation as a research lead without converting it into unsupported post-level authorship.",
    sourceUrl: "https://www.facebook.com/nycartc",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["nyc-artist-coalition", "career-proof-system"],
    sourceIds: [
      "SRC-FB-NYCAC-PAGE-CONTROL-2026",
      "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
      ...selectedPostSourceIds
    ],
    claimIds: [
      "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
      "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
      "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS"
    ],
    inquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    notes: [
      "A checkpointed authenticated pass recovered 441 unique surviving public Page timeline records. After record 441, 40 additional scrolls and a terminal wait added no records; date filters confirmed the January 29, 2017 start boundary.",
      "A first-party managed-content crosscheck exposed later event-maintenance activity outside the public owner timeline, so 441 is not described as a Meta export or the complete population of all managed Page content.",
      "Jamie recalls being the predominant account operator while others also used the Page. Neither the public timeline nor the inspected first-party management surface assigned individual publisher identity, so that recollection remains an open research lead.",
      "Raw responses, full post text, comments, identities, authentication state, Page-management context, and administrative locators remain outside the public repository."
    ]
  }
] satisfies IntakeRecord[];

export const nycartcFacebookPostSources = [
  {
    id: "SRC-FB-NYCAC-PAGE-CONTROL-2026",
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The Page supplies the public organizational identity and surviving timeline surface. Mutable interaction counts and private Page-management context are not portfolio evidence.",
    supportsGenerally: [
      "the public NYC Artist Coalition Facebook identity",
      "the currently accessible public Page timeline"
    ],
    doesNotEstablish: [
      "records deleted, hidden, or excluded before capture",
      "individual publisher identity",
      "reach, attendance, endorsement, adoption, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
    title: "NYC Artist Coalition Facebook surviving-public-timeline run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 accounting of the surviving NYC Artist Coalition Facebook Page timeline.",
    publicNote:
      "The public census preserves one disposition row per recovered record, including form, primary theme, routing counts, mutable interactions, and a public locator, without reproducing post text or administrative data.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "441 unique surviving public Page timeline records",
      "a surviving date range from January 29, 2017, through September 15, 2021",
      "148 event routes, 136 standalone posts, 78 original-media posts, 53 reshared stories, and 26 source-or-resource routes",
      "mission patterns spanning nightlife governance, public participation, cultural-space care, Commercial Rent Stabilization, public resources, and press routing",
      "386 records with at least one visible interaction and aggregate mutable signals of 2,366 reactions, 212 comments, and 611 shares"
    ],
    doesNotEstablish: [
      "an official Meta export or every item in managed Page content",
      "records deleted or hidden before capture",
      "individual publisher, drafter, or source-author identity",
      "unique people, reach, impressions, attendance, endorsement, adoption, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
    title: "NYC Artist Coalition Facebook managed-content crosscheck",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe boundary metadata from a July 2026 first-party managed-content crosscheck.",
    publicNote:
      "The first-party management surface displayed later event-maintenance activity not present in the 441-record public timeline. The surface did not expose individual publisher attribution for the inspected records.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-MANAGED-CONTENT-2026-001",
    supportsGenerally: [
      "the public owner timeline and first-party managed-content surface are not equivalent",
      "later event-maintenance activity exists outside the recovered public timeline",
      "individual publisher attribution remained unresolved on the inspected surfaces"
    ],
    doesNotEstablish: [
      "the complete managed-content population",
      "which teammate published any record",
      "that Jamie was the predominant or sole Page publisher"
    ]
  },
  ...selectedPostSources.map((source) => ({
    ...source,
    organization: "NYC Artist Coalition and campaign partners",
    author: "NYC Artist Coalition account",
    kind: "institutional-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14" as const,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      ...source.doesNotEstablish,
      "sole coalition ownership of partner work or quoted source material"
    ]
  }))
] satisfies SourceRecord[];

export const nycartcFacebookPostClaims = [
  {
    id: "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
    project: "nyc-artist-coalition",
    internalClaim:
      "The surviving NYC Artist Coalition public Facebook Page timeline contains 441 unique records from January 29, 2017, through September 15, 2021; a first-party crosscheck shows that this is not equivalent to all managed Page content.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "A checkpointed census recovered 441 unique surviving public Page timeline records from January 2017 through September 2021.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record count, boundary dates, forms, and item-level dispositions"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
        relationship: "supports-boundary",
        supports: ["public-timeline versus managed-content distinction"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every unique record surfaced by the currently accessible public owner timeline received a disposition after a checkpointed terminal-scroll and wait check.",
      "This is not an official Meta export, a deletion history, or the complete population of all managed Page content."
    ],
    antiClaims: [
      "The census contains every Facebook item ever published by NYC Artist Coalition",
      "The 441 records are a complete Meta export"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    project: "nyc-artist-coalition",
    internalClaim:
      "The 441-record public timeline shows NYC Artist Coalition's shared identity functioning as a durable civic publication system across event routes, public meetings, campaign calls, source and resource routes, partner voices, cultural-space care, nightlife governance, MARCH transparency, and Commercial Rent Stabilization.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text:
          "Across 441 surviving Facebook timeline records from 2017 through 2021, the coalition's shared identity connected events, public meetings, campaign calls, source routes, and partner voices across Cabaret Law repeal, nightlife governance, cultural-space care, MARCH transparency, and Commercial Rent Stabilization.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text:
          "The public timeline contains 148 event routes and 26 source-or-resource routes inside a broader 441-record civic publication system.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["complete classification and cross-campaign publication pattern"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-CABARET-REPEAL-EVENT-2017",
        relationship: "direct-support",
        supports: ["Cabaret Law event and press routing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-MARCH-TRANSPARENCY-2020",
        relationship: "direct-support",
        supports: ["MARCH public-information routing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-FAIR-RENT-VIRTUAL-HOUSE-2021",
        relationship: "direct-support",
        supports: ["FairRentNYC campaign continuity"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The account is a shared coalition surface; the review does not assign individual authorship or publisher identity record by record.",
      "Campaign and partner work remains collective even when the coalition account routed or amplified it.",
      "The 441-record count describes surviving public timeline records, not impact."
    ],
    antiClaims: [
      "Jamie authored or published all 441 records",
      "The Facebook timeline proves that Jamie alone led the coalition campaigns",
      "Publishing a campaign route caused the associated policy outcome"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The complete public timeline contains 86 records referencing or linking NYC Council members or the Council, 40 referencing cultural or nightlife agencies, and 38 referencing cultural or advocacy partners.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Stakeholder routing recurs across the timeline: 86 records reference Council members or the Council, 40 reference cultural or nightlife agencies, and 38 reference cultural or advocacy partners.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level stakeholder-reference classification"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "These are records containing references or links to stakeholder accounts and groups, not inbound actions by those stakeholders.",
      "A reference does not establish endorsement, attendance, partnership, agreement, or policy causality.",
      "Use the separately audited X corpus for bounded public-official inbound engagement claims."
    ],
    antiClaims: [
      "Eighty-six Council members engaged with the Facebook Page",
      "The NYC Council endorsed NYC Artist Coalition on Facebook"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
    project: "nyc-artist-coalition",
    internalClaim:
      "Three hundred eighty-six of 441 recovered public timeline records display at least one current interaction; aggregate mutable signals at capture are 2,366 reactions, 212 comments, and 611 shares.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Three hundred eighty-six records retain at least one visible interaction; current record-level totals are 2,366 reactions, 212 comments, and 611 shares.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level visible interaction totals at capture"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Counts are mutable current platform signals attached to records, not historical peaks.",
      "Reactions, comments, and shares are different actions and must not be added together as unique people.",
      "No interaction identity is published from the authenticated archive pass."
    ],
    antiClaims: [
      "NYC Artist Coalition reached 3,189 people",
      "The posts generated 3,189 unique engagements",
      "Visible interactions prove attendance, endorsement, adoption, causality, or impact"
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycartcFacebookPostInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-POSTS-2026",
    project: "nyc-artist-coalition",
    question:
      "Can the full surviving public Page timeline be recovered and interpreted while distinguishing publication, stakeholder routing, visible interactions, managed content, and individual publisher identity?",
    methods: [
      "Used an authenticated public Page timeline and checkpointed record fingerprints during 260 scroll operations so a browser-runtime reset could not silently erase the census.",
      "After reaching 441 unique records, performed 40 additional scrolls and a terminal wait; no additional public timeline record appeared.",
      "Used Page date filters to confirm no public timeline records in 2015 or 2016 and to locate the first surviving record on January 29, 2017.",
      "Classified every record by form, primary theme, stakeholder-reference groups, direct outbound links, and currently visible interaction signals.",
      "Close-read representative records across Cabaret Law repeal, Office of Nightlife, MARCH transparency, cultural-space care, public resources, and FairRentNYC, and associated existing press and government sources where appropriate.",
      "Crosschecked a first-party managed-content surface and recorded that later event-maintenance activity exists outside the public timeline.",
      "Withheld raw text, comments, actor identities, authentication, administrative locators, and Page-management context from the public repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The surviving public Page timeline contains 441 unique records from January 29, 2017, through September 15, 2021.",
      "The population contains 148 event routes, 136 standalone posts, 78 original-media posts, 53 reshared stories, and 26 source-or-resource routes.",
      "The record functions as a cross-campaign civic publication layer spanning nightlife governance, cultural-space care, public meetings, MARCH transparency, resources, press, and Commercial Rent Stabilization.",
      "Stakeholder references recur across 86 records for Council members or the Council, 40 for cultural or nightlife agencies, and 38 for cultural or advocacy partners; these are routing references, not inbound engagement.",
      "Three hundred eighty-six records retain a visible interaction; mutable totals at capture are 2,366 reactions, 212 comments, and 611 shares.",
      "Jamie recalls being the predominant Page operator while others also used it, but individual publisher attribution was not exposed by the inspected surfaces."
    ],
    limitations: [
      "The complete surviving public timeline is not an official Meta export, a deletion history, or the complete population of managed Page content.",
      "A first-party export sufficient to reconcile all managed content was not completed in this pass.",
      "Individual publisher, drafter, and source-author identity remain unresolved; Jamie's recollection is not promoted to a public claim.",
      "Direct outbound URLs undercount source attachments routed through Facebook-owned attachment links.",
      "Stakeholder references do not establish inbound engagement, endorsement, attendance, partnership, agreement, or policy causality.",
      "Current interaction signals do not measure unique people, reach, impressions, attendance, endorsement, adoption, causality, or impact."
    ],
    sourceIds: [
      "SRC-FB-NYCAC-PAGE-CONTROL-2026",
      "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
      ...selectedPostSourceIds,
      "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
      "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
      "SRC-PRESS-TNR-GOTHAMIST-MARCH-RAIDS-2019",
      "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017"
    ],
    publicSummary:
      "A checkpointed review recovered 441 surviving public Page timeline records and identified a durable cross-campaign publication system. Individual publisher attribution and first-party managed-content reconciliation remain open.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const nycartcFacebookPostPublicationDecisions = [
  {
    id: "PUB-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    claimId: "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    decision: "selected",
    audiences: [
      "hiring managers",
      "public-interest technology peers",
      "communications and implementation teams"
    ],
    surfaces: ["/work/fair-rent-nyc"],
    rationale:
      "The complete timeline makes Jamie's public-identity systems contribution legible as durable civic publication infrastructure while preserving collective authorship and campaign credit.",
    decidedAt: "2026-07-14"
  },
  ...[
    [
      "PUB-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
      "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
      "The population accounting is durable provenance rather than the page's primary hiring argument."
    ],
    [
      "PUB-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
      "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
      "Stakeholder references remain reserve context because they are not inbound engagement or endorsement."
    ],
    [
      "PUB-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
      "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
      "Mutable platform interactions remain archive context rather than reach, attendance, adoption, causality, or impact proof."
    ]
  ].map(([id, claimId, rationale]) => ({
    id,
    claimId,
    decision: "reserve" as const,
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts"],
    rationale,
    decidedAt: "2026-07-14"
  }))
] satisfies PublicationDecision[];

export const nycartcFacebookPostProofCoverage = [] satisfies ProofCoverage[];
