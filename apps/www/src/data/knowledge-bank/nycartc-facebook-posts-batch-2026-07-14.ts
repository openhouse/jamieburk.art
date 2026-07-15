import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type NycartcFacebookPostsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

export const nycartcFacebookPostAudit = {
  ownerTimelineRecords: 444,
  startBoundary: "2017-01-29",
  endBoundary: "2021-09-15",
  terminalTraversals: 2,
  scrollOperations: 824,
  terminalScrollsWithoutAddition: [42, 41],
  exactIdentitySetMatch: true,
  protectedIdentitySetSha256:
    "f1f00d902415ebad0aa37043d7f64070d754c17449c396ac61aa34dec7733955",
  forms: {
    eventRoutes: 150,
    standalonePosts: 138,
    originalMediaPosts: 78,
    resharedStories: 52,
    sourceOrResourceRoutes: 26
  },
  primaryThemes: {
    nightlifeEnforcementAndGovernance: 157,
    generalCoalitionCommunication: 95,
    commercialRentAndTenancy: 71,
    culturalSpaceCare: 47,
    publicMeetingsAndParticipation: 25,
    fundingAndOperationalResources: 21,
    eventAndCulturalDistribution: 15,
    pressAndPublicKnowledge: 11,
    equitySolidarityAndMutualAid: 2
  },
  themeOccurrences: {
    nightlifeEnforcementAndGovernance: 177,
    publicMeetingsAndParticipation: 121,
    culturalSpaceCare: 82,
    commercialRentAndTenancy: 71,
    eventAndCulturalDistribution: 63,
    fundingAndOperationalResources: 44,
    pressAndPublicKnowledge: 24,
    equitySolidarityAndMutualAid: 17
  },
  stakeholderGroupOccurrences: {
    nycCouncilMembersAndCouncil: 88,
    nycCulturalAndNightlifeAgencies: 40,
    culturalAndAdvocacyPartners: 39,
    nycBusinessAndEnforcementAgencies: 13,
    pressAndPublicInformationOrganizations: 12
  },
  recordsWithVisibleInteraction: 389,
  reactions: 2374,
  comments: 212,
  shares: 611,
  outboundLinkOccurrences: 64,
  uniqueDirectOutboundUrls: 39,
  ownerPhotoRecords: 84,
  eventLinkedRecords: 165,
  publisherAttribution: {
    status: "unresolved",
    individuallyAttributedRecords: 0
  },
  firstPartyManagedContentCrosscheck: {
    laterEventMaintenanceObserved: true,
    equivalentToPublicTimeline: false
  },
  ledgerPath:
    "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
  routeLedgerPath:
    "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
  reportPath:
    "docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"
} as const;

const selectedPostSources = [
  {
    id: "SRC-FB-NYCAC-CABARET-LAW-CULTURE-POST",
    title: "Cabaret Law repeal, venue safety, and city trust post",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=1945640715690307&set=a.544849644343446",
    publicCitation:
      "NYC Artist Coalition, Cabaret Law repeal, venue safety, and city trust post, Facebook.",
    supportsGenerally: [
      "the post tags Jamie Burkart and Council Member Rafael Espinal",
      "the post connects Cabaret Law repeal with venue safety and trust between cultural spaces and city government"
    ],
    doesNotEstablish: [
      "unique people reached or historical peak engagement",
      "physical attendance, endorsement, or policy causality",
      "individual publisher or drafter identity"
    ]
  },
  {
    id: "SRC-FB-NYCAC-TALKS-NOT-RAIDS-POST",
    title: "Talks Not Raids safety and transparency post",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2225985110989198&set=a.544849644343446",
    publicCitation:
      "NYC Artist Coalition, Talks Not Raids safety and transparency post, Facebook.",
    supportsGenerally: [
      "the post preserves Olympia Kazi's attributed safety-and-transparency framing",
      "the post routes readers to the Talks Not Raids campaign site"
    ],
    doesNotEstablish: [
      "Jamie's individual production, writing, or publishing tasks",
      "MARCH disbandment, stakeholder response, or policy causality"
    ]
  },
  {
    id: "SRC-FB-NYCAC-COVID-KNOW-YOUR-RIGHTS-VIDEO",
    title: "COVID-19 know-your-rights video route",
    canonicalUrl: "https://www.facebook.com/nycartc/videos/632085217644541/",
    publicCitation:
      "NYC Artist Coalition, COVID-19 know-your-rights video route, Facebook.",
    supportsGenerally: [
      "the Page routed cultural-space participants to practical rent, tenant, and small-business legal information",
      "the shared identity connected cultural-space care with public resource distribution"
    ],
    doesNotEstablish: [
      "current legal guidance or service outcomes",
      "individual publisher identity, audience use, conversion, or impact"
    ]
  }
] as const;

const selectedPostSourceIds = selectedPostSources.map((source) => source.id);

export const nycartcFacebookPostIntake = [
  {
    id: "INTAKE-2026-07-14-NYCAC-FACEBOOK-POST-POPULATION",
    receivedAt: "2026-07-14",
    kind: "artifact",
    project: "nyc-artist-coalition",
    publicSummary:
      "Account for the complete currently recoverable NYC Artist Coalition Facebook Page-post timeline, route mission-relevant sources, distinguish stakeholder addressing from inbound engagement, and preserve every recovered record without assigning shared-account posts to Jamie.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-FB-NYCAC-PAGE-CONTROL-2026",
      "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
      "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026",
      "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
      "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
      "SRC-FB-NYCAC-POST-REPORT-2026",
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
      ...selectedPostSourceIds
    ],
    claimIds: [
      "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
      "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
      "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
      "CLM-NYCAC-FACEBOOK-POSTED-URL-ROUTING"
    ],
    researchInquiryIds: [
      "INQ-NYCAC-FACEBOOK-POSTS-2026",
      "INQ-NYCAC-FACEBOOK-POSTED-SOURCES-2026"
    ],
    projectionIntent: "bank-only",
    nextActions: [
      "Reconcile an authorized Meta export or historical Page backup against the 444-record current public control if one becomes available.",
      "Close-read selected posted destinations before promoting them from routing leads to independent claim evidence.",
      "Keep current response counters out of impact claims and preserve Page identity as collective rather than human authorship metadata.",
      "Use the governed meeting, cultural-space, campaign, public-resource, and stakeholder themes as future composition and photo-retrieval leads without inferring identity, role, rights, outcome, or publication approval."
    ],
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "INTAKE-2026-07-14-NYCAC-FACEBOOK-PUBLISHING-MEMORY",
    receivedAt: "2026-07-14",
    kind: "memory",
    project: "nyc-artist-coalition",
    publicSummary:
      "Jamie recalls being predominantly the person who used NYC Artist Coalition's Facebook Page while also remembering that other collaborators used it. The memory remains a role hypothesis pending collaborator or platform corroboration.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: ["SRC-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026"],
    claimIds: ["CLM-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026"],
    projectionIntent: "bank-only",
    nextActions: [
      "Ask coalition collaborators who created, administered, scheduled, and wrote for the Page.",
      "Review an authorized Page-role history, native export, or contemporaneous operating records if available.",
      "Do not convert current access, Page identity, or writing-style similarity into historical sole authorship."
    ],
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026-001",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
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
      "The public census preserves one aggregate-only disposition row per recovered record, including a stable public-safe identifier, sequence, form, anonymous theme and stakeholder classifications, classification counts, and a visible-interaction boolean. Unlinkable value-frequency tables reproduce aggregate interaction floors without exposing per-record metrics.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "444 unique surviving public Page timeline records",
      "a surviving date range from January 29, 2017, through September 15, 2021",
      "150 event routes, 138 standalone posts, 78 original-media posts, 52 reshared stories, and 26 source-or-resource routes",
      "mission patterns spanning nightlife governance, public participation, cultural-space care, Commercial Rent Stabilization, public resources, and press routing",
      "389 records with at least one visible interaction and aggregate mutable signals of 2,374 reactions, 212 comments, and 611 shares"
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
    title: "NYC Artist Coalition Facebook separate content-control crosscheck",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe boundary metadata from a July 2026 first-party managed-content crosscheck.",
    publicNote:
      "Separately recovered content-control metadata displayed later event-maintenance activity not present in the 444-record public timeline and did not expose individual publisher attribution for the inspected records.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-MANAGED-CONTENT-2026-001",
    supportsGenerally: [
      "the public owner timeline and separate content-control record are not equivalent",
      "later event-maintenance activity exists outside the recovered public timeline",
      "individual publisher attribution remained unresolved on the inspected surfaces"
    ],
    doesNotEstablish: [
      "the complete managed-content population",
      "which teammate published any record",
      "that Jamie was the predominant or sole Page publisher"
    ]
  },
  {
    id: "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026",
    title: "NYC Artist Coalition Facebook posted-URL research inventory",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe routing metadata derived from the NYC Artist Coalition Facebook Page-post census, July 2026.",
    publicNote:
      "The rendered corpus exposed 64 outbound-link occurrences resolving to 39 unique URLs and 33 normalized public-safe routes across campaign, Council, public-information, press, cultural, event, fundraising, and resource destinations.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTED-URLS-2026-001",
    supportsGenerally: [
      "64 current outbound-link occurrences",
      "39 unique current URLs and 33 normalized public-safe routes",
      "campaign, government, public-information, press, event, cultural, fundraising, and practical-resource routing"
    ],
    doesNotEstablish: [
      "the truth of linked content",
      "authorship, readership, endorsement, clicks, conversion, partnership, or outcomes",
      "URLs no longer exposed by the current interface"
    ]
  },
  {
    id: "SRC-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
    title: "Jamie Burkart first-person NYC Artist Coalition Facebook publishing recollection",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person recollection recorded for archival research, July 2026.",
    publicNote:
      "Jamie remembers being predominantly the person who used the Page while also remembering that other coalition collaborators used it.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026-001",
    supportsGenerally: [
      "Jamie's attributed recollection of predominant Page use",
      "Jamie's explicit shared-use boundary"
    ],
    doesNotEstablish: [
      "the publisher of any specific post",
      "a quantitative share of publishing labor",
      "sole administration, sole authorship, or collaborators' perspectives"
    ]
  },
  {
    id: "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
    title: "Public-safe NYC Artist Coalition Facebook post disposition ledger",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/13d9a7c75595f890bdc2e5346ff81ac681e5bbea/docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe disposition ledger for the currently recoverable NYC Artist Coalition Facebook Page timeline, July 14, 2026.",
    publicNote:
      "Contains one aggregate-only disposition row for each of 444 recovered record identities, anonymous row-level classifications, unlinkable interaction-value frequencies, a reproducible public disposition-set digest, and bounded population controls. It omits post text, post URLs, per-record metrics, comments, identities, account state, and private analytics.",
    supportsGenerally: [
      "the exact-set-checked 444-record currently recoverable Page surface",
      "record-form, primary-theme, stakeholder-routing, and aggregate response accounting",
      "the separation of Page identity from individual authorship and current response signals from impact"
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or lifetime population",
      "individual publisher, drafter, or administrator identity",
      "stakeholder engagement, unique people, reach, attendance, conversion, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
    title: "Public-safe NYC Artist Coalition Facebook posted-route ledger",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/13d9a7c75595f890bdc2e5346ff81ac681e5bbea/docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe route ledger for destinations exposed by the currently recoverable NYC Artist Coalition Facebook Page corpus, July 14, 2026.",
    publicNote:
      "Accounts for 64 outbound-link occurrences, 39 unique rendered URLs, and 33 normalized public-safe routes. Two historical meeting-access or form routes remain represented without a public URL.",
    supportsGenerally: [
      "the 33-route public-safe destination inventory",
      "campaign, civic-information, press, cultural, event, fundraising, and practical-resource routing",
      "the distinction between posted source leads and independently corroborated evidence"
    ],
    doesNotEstablish: [
      "the truth of every linked proposition",
      "authorship, readership, endorsement, clicks, conversion, partnership, outcomes, or impact",
      "URLs no longer exposed by the current interface"
    ]
  },
  {
    id: "SRC-FB-NYCAC-POST-REPORT-2026",
    title: "NYC Artist Coalition Facebook post archival-production report",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/0fe3890c7f91c3af328b3af9eb89c66e38b5b620/docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart portfolio research, NYC Artist Coalition Facebook post archival-production report, July 14, 2026.",
    publicNote:
      "Documents population controls, campaign and participation patterns, source routing, stakeholder-reference limits, mutable response boundaries, role uncertainty, lifecycle decisions, and next research actions.",
    supportsGenerally: [
      "the public-safe method and aggregate findings for the 444-record currently recoverable Page surface",
      "the decision to retain these findings as bank-only reserve depth",
      "the distinction among collective Page identity, Jamie's memory, individual publishing labor, stakeholder engagement, and impact"
    ],
    doesNotEstablish: [
      "a native Meta export or deleted-post history",
      "Jamie's predominant or sole social-account management",
      "historical reach, stakeholder response, policy causality, or impact"
    ]
  },
  {
    id: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
    title: "A compromise for nightlife venues and their neighbors",
    organization: "City & State New York",
    author: "Rafael Espinal, Jr.",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.cityandstateny.com/opinion/2018/09/a-compromise-for-nightlife-venues-and-their-neighbors/178085/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Rafael Espinal, Jr., 'A compromise for nightlife venues and their neighbors,' City & State New York, September 26, 2018.",
    publicNote:
      "Espinal describes an Agent of Change proposal intended to allocate soundproofing responsibility around new residential construction and new nightlife venues.",
    supportsGenerally: [
      "the attributed Agent of Change proposal",
      "a public policy frame balancing residents, cultural venues, and neighborhood change"
    ],
    doesNotEstablish: [
      "enactment or implementation",
      "NYC Artist Coalition authorship of the proposal",
      "Jamie's role, stakeholder response, or resulting impact"
    ]
  },
  {
    id: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
    title:
      "City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis",
    organization: "The Seattle Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.seattletimes.com/entertainment/city-announces-1-1-million-and-rent-relief-to-support-arts-organizations-in-the-coronavirus-economic-crisis/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "The Seattle Times, 'City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis.'",
    publicNote:
      "The Page routed this article as comparative cultural-relief context. It remains a metadata-depth lead pending close reading.",
    supportsGenerally: ["a posted comparative cultural-relief research lead"],
    doesNotEstablish: [
      "the article's detailed propositions before close reading",
      "a New York City program or NYC Artist Coalition outcome",
      "Jamie's role, authorship, partnership, or impact"
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
      "The surviving NYC Artist Coalition public Facebook Page timeline contains 444 unique records from January 29, 2017, through September 15, 2021; a first-party crosscheck shows that this is not equivalent to all managed Page content.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Two terminal traversals recovered the same 444 unique surviving public Page timeline records from January 2017 through September 2021.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"]
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
        sourceId: "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe population controls and item-level dispositions"],
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
      "The 444 records are a complete Meta export"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    project: "nyc-artist-coalition",
    internalClaim:
      "The 444-record public timeline shows NYC Artist Coalition's shared identity functioning as a durable civic publication system across event routes, public meetings, campaign calls, source and resource routes, partner voices, cultural-space care, nightlife governance, MARCH transparency, and Commercial Rent Stabilization.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The public timeline contains 150 event routes and 26 source-or-resource routes inside a broader 444-record civic publication system.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"]
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
        sourceId: "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe cross-campaign form and theme accounting"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-CABARET-LAW-CULTURE-POST",
        relationship: "direct-support",
        supports: ["Cabaret Law, venue-safety, and public-trust framing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-TALKS-NOT-RAIDS-POST",
        relationship: "direct-support",
        supports: ["Talks Not Raids framing and campaign routing"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-COVID-KNOW-YOUR-RIGHTS-VIDEO",
        relationship: "direct-support",
        supports: ["COVID-era legal-information and practical-resource routing"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The account is a shared coalition surface; the review does not assign individual authorship or publisher identity record by record.",
      "Campaign and partner work remains collective even when the coalition account routed or amplified it.",
      "The 444-record count describes surviving public timeline records, not impact."
    ],
    antiClaims: [
      "Jamie authored or published all 444 records",
      "The Facebook timeline proves that Jamie alone led the coalition campaigns",
      "Publishing a campaign route caused the associated policy outcome"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The currently recoverable public timeline contains 88 records referencing or linking NYC Council members or the Council, 40 referencing cultural or nightlife agencies, and 39 referencing cultural or advocacy partners.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Stakeholder routing recurs across the timeline: 88 records reference Council members or the Council, 40 reference cultural or nightlife agencies, and 39 reference cultural or advocacy partners.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level stakeholder-reference classification"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe stakeholder-reference occurrence accounting"],
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
      "Eighty-eight Council members engaged with the Facebook Page",
      "The NYC Council endorsed NYC Artist Coalition on Facebook"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
    project: "nyc-artist-coalition",
    internalClaim:
      "Three hundred eighty-nine of 444 recovered public timeline records display at least one current interaction; aggregate mutable signals at capture are 2,374 reactions, 212 comments, and 611 shares.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Three hundred eighty-nine records retain at least one visible interaction; current record-level totals are 2,374 reactions, 212 comments, and 611 shares.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level visible interaction totals at capture"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe visible-interaction aggregate and interpretation boundary"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Counts are mutable current platform signals attached to records, not historical peaks.",
      "Reactions, comments, and shares are different actions and must not be added together as unique people.",
      "No interaction identity is published from the archive pass."
    ],
    antiClaims: [
      "The current response counters measure unique people reached",
      "Reactions, comments, and shares can be added into a unique-engagement total",
      "Visible interactions prove attendance, endorsement, adoption, causality, or impact"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NYCAC-FACEBOOK-POSTED-URL-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The current rendered corpus exposed 64 outbound-link occurrences resolving to 39 unique URLs and 33 normalized public-safe routes across coalition campaign, government, public-information, press, cultural, event, fundraising, and resource destinations.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The current Page corpus preserves 33 normalized public-safe routes across campaign, civic-information, press, cultural, fundraising, and practical-resource destinations.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026",
        relationship: "direct-support",
        supports: ["route occurrence, unique URL, and normalized route accounting"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe normalized route inventory and protected-route boundary"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
        relationship: "context",
        supports: ["one close-read public policy-context destination"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
        relationship: "supports-boundary",
        supports: ["one metadata-depth comparative-relief lead"],
        confidence: "limited",
        renderCitation: false
      }
    ],
    boundaries: [
      "Posted URLs remain source-discovery and action-routing leads until independently close-read.",
      "A route does not establish authorship, readership, endorsement, clicks, conversion, partnership, or outcomes.",
      "Two historical meeting-access or form routes remain protected without public URLs."
    ],
    antiClaims: [
      "Every linked source is true because NYC Artist Coalition posted it",
      "Every linked organization endorsed or partnered with NYC Artist Coalition",
      "The posted routes prove public use or campaign impact"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTED-SOURCES-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source-routing review"]
  },
  {
    id: "CLM-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie recalls being predominantly the person using NYC Artist Coalition's Facebook Page while other coalition collaborators also used it.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie recalls predominant but shared use of NYC Artist Coalition's Facebook Page; collaborator or platform corroboration is required before public role projection.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
        relationship: "private-support",
        supports: ["Jamie's first-person recollection and its shared-use boundary"],
        confidence: "limited",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
        relationship: "supports-boundary",
        supports: ["absence of exposed historic human-level publisher metadata"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve first-person attribution until a native export, administrator chronology, or collaborator proof notes establish the historic division of labor.",
      "Do not assign any specific post to Jamie without record-level evidence.",
      "Preserve other collaborators' publishing, authorship, strategy, and campaign credit."
    ],
    antiClaims: [
      "Jamie authored or published all 444 records",
      "Jamie was the sole Page administrator or sole author of the coalition's public voice",
      "No collaborator posted, edited, scheduled, or administered the Page"
    ],
    proofClaimIds: [],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const nycartcFacebookPostInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-POSTS-2026",
    project: "nyc-artist-coalition",
    question:
      "Can the full surviving public Page timeline be recovered and interpreted while distinguishing publication, stakeholder routing, visible interactions, managed content, and individual publisher identity?",
    methods: [
      "Used two browser-based public Page timeline traversals and checkpointed record fingerprints across 824 scroll operations so an interruption could not silently erase the census.",
      "After reaching 444 unique records, performed 42 and 41 terminal scroll controls; no additional public timeline record appeared.",
      "Compared the two 444-record identity sets and required an exact set match before classifying the population.",
      "Used Page date filters to confirm no public timeline records in 2015 or 2016 and to locate the first surviving record on January 29, 2017.",
      "Classified every record by form, primary theme, stakeholder-reference groups, direct outbound links, and currently visible interaction signals.",
      "Close-read representative records across Cabaret Law repeal, Office of Nightlife, MARCH transparency, cultural-space care, public resources, and FairRentNYC, and associated existing press and government sources where appropriate.",
      "Crosschecked separately recovered content-control metadata and recorded that later event-maintenance activity exists outside the public timeline.",
      "Withheld raw text, comments, actor identities, authentication, administrative locators, and Page-management context from the public repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The surviving public Page timeline contains 444 unique records from January 29, 2017, through September 15, 2021.",
      "The population contains 150 event routes, 138 standalone posts, 78 original-media posts, 52 reshared stories, and 26 source-or-resource routes.",
      "The record functions as a cross-campaign civic publication layer spanning nightlife governance, cultural-space care, public meetings, MARCH transparency, resources, press, and Commercial Rent Stabilization.",
      "Stakeholder references recur across 88 records for Council members or the Council, 40 for cultural or nightlife agencies, and 39 for cultural or advocacy partners; these are routing references, not inbound engagement.",
      "Three hundred eighty-nine records retain a visible interaction; mutable totals at capture are 2,374 reactions, 212 comments, and 611 shares.",
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
      "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
      "SRC-FB-NYCAC-POST-REPORT-2026",
      ...selectedPostSourceIds,
      "SRC-GOTHAMIST-CABARET-LAW-2017-06-19",
      "SRC-GOTHAMIST-MARCH-TRANSPARENCY-2019",
      "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017-09-20"
    ],
    publicSummary:
      "Two exact-set-checked terminal traversals recovered 444 surviving public Page timeline records and identified a durable cross-campaign publication system. Individual publisher attribution and first-party managed-content reconciliation remain open.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-POSTED-SOURCES-2026",
    project: "nyc-artist-coalition",
    question:
      "Which destinations posted by NYC Artist Coalition can be normalized, close-read, and promoted from routing leads into independent knowledge-bank sources?",
    methods: [
      "Normalized 64 current outbound-link occurrences into 39 unique URLs and 33 public-safe routes.",
      "Protected two historical meeting-access or form destinations without publishing their URLs.",
      "Reused existing campaign and press sources where the destination already existed in the bank.",
      "Close-read the City & State destination and retained the inaccessible Seattle Times destination at metadata depth."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The route inventory includes coalition campaign sites, Council sources, public information, press, event and cultural organizations, fundraising pages, and practical resources.",
      "The City & State article is retained as close-read policy context.",
      "The Seattle Times destination remains a metadata-depth comparative-relief lead."
    ],
    limitations: [
      "A posted URL is not automatic corroboration of its propositions.",
      "No route establishes readership, endorsement, clicks, conversion, partnership, or outcomes without additional evidence.",
      "Some current cards may no longer expose their original destinations."
    ],
    sourceIds: [
      "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026",
      "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
      "SRC-FB-NYCAC-POST-REPORT-2026",
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"
    ],
    publicSummary:
      "The current Page exposed 39 unique posted URL leads and 33 normalized public-safe routes; selected destinations were close-read or retained at explicitly bounded metadata depth.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTED-URLS-2026-001"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026",
    project: "nyc-artist-coalition",
    question:
      "What native account records or collaborator proof notes can establish the historical division of NYC Artist Coalition Facebook publishing labor?",
    methods: [
      "Accessioned Jamie's first-person recollection with its explicit shared-use boundary.",
      "Compared separately recovered public-timeline and content-control metadata for historical human-level publisher attribution.",
      "Separated current account relationship, Page identity, and record-level human authorship."
    ],
    runAt: "2026-07-14",
    resultStatus: "inconclusive",
    findings: [
      "Jamie recalls predominant Page use while explicitly remembering that others also used it.",
      "The current public posts publish under the coalition identity rather than a named human author.",
      "No inspected surface exposed a historic human publisher field or quantified the division of publishing labor."
    ],
    limitations: [
      "Present-day content-control metadata does not establish historical exclusivity.",
      "Memory does not assign a human publisher to any specific post or quantify a publishing share.",
      "Collaborator perspectives and a native Page export have not yet been recovered."
    ],
    sourceIds: [
      "SRC-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
      "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
      "SRC-FB-NYCAC-PAGE-CONTROL-2026"
    ],
    publicSummary:
      "Jamie remembers predominant but shared use of the Page; the current record does not establish historical exclusivity or post-level authorship.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026-001"
  }
] satisfies ResearchInquiry[];

export const nycartcFacebookPostsBatch: NycartcFacebookPostsBatch = {
  intakeRecords: nycartcFacebookPostIntake,
  sources: nycartcFacebookPostSources,
  claims: nycartcFacebookPostClaims,
  researchInquiries: nycartcFacebookPostInquiries
};
