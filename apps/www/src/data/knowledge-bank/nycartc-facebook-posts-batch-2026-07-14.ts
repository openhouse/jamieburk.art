import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const capturedAt = "2026-07-14";
const projectId = "nyc-artist-coalition";

const pageSourceId = "SRC-FB-NYCAC-PAGE-CONTROL-2026";
const populationSourceId = "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026";
const managedContentSourceId = "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026";
const routeResearchSourceId = "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026";
const memorySourceId = "SRC-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026";
const ledgerSourceId = "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026";
const routeLedgerSourceId = "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026";

const populationClaimId = "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE";
const publicationClaimId = "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM";
const stakeholderClaimId = "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING";
const interactionClaimId = "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS";
const routeClaimId = "CLM-NYCAC-FACEBOOK-POSTED-URL-ROUTING";
const roleMemoryClaimId = "CLM-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY";

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
  normalizedPublicSafeRoutes: 33,
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

export const nycartcFacebookPostCaptures = [
  {
    id: "CAP-NYCAC-FACEBOOK-POST-POPULATION-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Account for the complete currently recoverable NYC Artist Coalition Facebook Page-post timeline, route mission-relevant sources, distinguish stakeholder addressing from inbound engagement, and preserve every recovered record without assigning shared-account posts to Jamie.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "collective civic publication infrastructure",
      "campaign and meeting continuity",
      "stakeholder routing",
      "posted source discovery",
      "bounded visible interaction",
    ],
    sourceIds: [
      pageSourceId,
      populationSourceId,
      managedContentSourceId,
      routeResearchSourceId,
      ledgerSourceId,
      routeLedgerSourceId,
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
      ...selectedPostSourceIds,
    ],
    observationIds: [
      "OBS-NYCAC-FB-POST-RESEARCH-METHOD",
      "OBS-NYCAC-FB-POST-POPULATION",
      "OBS-NYCAC-FB-POST-FORMS-AND-THEMES",
      "OBS-NYCAC-FB-POST-STAKEHOLDER-ROUTING",
      "OBS-NYCAC-FB-POST-VISIBLE-INTERACTIONS",
      "OBS-NYCAC-FB-POST-ROUTES",
      "OBS-NYCAC-FB-POST-PUBLISHER-BOUNDARY",
      "OBS-NYCAC-FB-POST-ROLE-MEMORY",
      "OBS-NYCAC-FB-POST-CABARET-RECORD",
      "OBS-NYCAC-FB-POST-TALKS-NOT-RAIDS-RECORD",
      "OBS-NYCAC-FB-POST-COVID-RESOURCE-RECORD",
    ],
    researchTaskIds: [
      "RT-NYCAC-FB-POST-OWNER-EXPORT",
      "RT-NYCAC-FB-POST-LINK-CLOSE-READ",
      "RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    ],
    disposition:
      "Integrated 444 of 444 exact-set-checked surviving Page records, 33 normalized public-safe routes, six bounded claims, and three research inquiries. Raw post text, comments, actor identities, per-record engagement counts, authenticated-session state, and protected action routes remain outside the public repository.",
  },
  {
    id: "CAP-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "memory",
    summary:
      "Jamie recalls being predominantly the person who used NYC Artist Coalition's Facebook Page while also remembering that other collaborators used it. The memory remains a role hypothesis pending collaborator or platform corroboration.",
    status: "researching",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: ["Facebook publishing stewardship", "shared account operations"],
    sourceIds: [memorySourceId, managedContentSourceId],
    observationIds: [
      "OBS-NYCAC-FB-POST-PUBLISHER-BOUNDARY",
      "OBS-NYCAC-FB-POST-ROLE-MEMORY",
    ],
    researchTaskIds: [
      "RT-NYCAC-FB-POST-OWNER-EXPORT",
      "RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    ],
    disposition:
      "Retained as a first-person, explicitly shared-use role hypothesis. No individual publishing projection is approved until a native Page record or collaborator proof note establishes the historic division of labor.",
  },
] satisfies CaptureRecord[];

export const nycartcFacebookPostSources = [
  {
    id: "SRC-FB-NYCAC-PAGE-CONTROL-2026",
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/nycartc",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition public Facebook Page, accessed July 15, 2026.",
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
    capturedAt,
    accessedAt: reviewedAt,
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
    capturedAt,
    accessedAt: reviewedAt,
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
    capturedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe routing metadata derived from the NYC Artist Coalition Facebook Page-post census, July 2026.",
    publicNote:
      "The rendered corpus exposed 64 outbound-link occurrences consolidated into 33 normalized public-safe routes across campaign, Council, public-information, press, cultural, event, fundraising, and resource destinations.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTED-URLS-2026-001",
    supportsGenerally: [
      "64 current outbound-link occurrences",
      "33 normalized public-safe routes",
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
    kind: "firsthand-statement",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person recollection recorded for archival research, July 2026.",
    publicNote:
      "Jamie remembers being predominantly the person who used the Page while also remembering that other coalition collaborators used it.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026-001",
    supportsGenerally: [
      "Jamie's attributed recollection of predominant but shared Page use",
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
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/35a14ed9121dbe56659270b4fb3f227b5481ad5d/docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
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
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/35a14ed9121dbe56659270b4fb3f227b5481ad5d/docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe route ledger for destinations exposed by the currently recoverable NYC Artist Coalition Facebook Page corpus, July 14, 2026.",
    publicNote:
      "Accounts for 64 outbound-link occurrences consolidated into 33 normalized public-safe routes. Two historical meeting-access or form routes remain represented without a public URL.",
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
    id: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
    title: "A compromise for nightlife venues and their neighbors",
    organization: "City & State New York",
    author: "Rafael Espinal, Jr.",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-26",
    accessedAt: reviewedAt,
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
    accessedAt: reviewedAt,
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
    accessedAt: reviewedAt,
    preferredPublicUrl: "canonical" as const,
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [
      ...source.doesNotEstablish,
      "sole coalition ownership of partner work or quoted source material"
    ]
  }))
] satisfies SourceRecord[];

export const nycartcFacebookPostObservations = [
  {
    id: "OBS-NYCAC-FB-POST-RESEARCH-METHOD",
    sourceId: populationSourceId,
    project: projectId,
    statement:
      "Two browser traversals with distinct scroll cadences reached terminal no-growth states and recovered the same set of 444 surviving Page records after 824 combined scroll operations.",
    observationType: "metadata",
    locator: "Protected traversal logs and exact identity-set comparison",
    confidence: "high",
    limitations: [
      "Surface completeness is not a Meta owner export, deletion history, or lifetime account total.",
      "Protected identity keys and authenticated-session data remain outside the public repository.",
    ],
    supportsClaimIds: [populationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-POPULATION",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "The public-safe ledger contains one disposition for each of 444 recovered records spanning January 29, 2017, through September 15, 2021, and publishes a reproducible disposition-set digest.",
    observationType: "metadata",
    locator: "population; records; publicDispositionSetSha256",
    confidence: "high",
    limitations: [
      "The date range describes the surviving Page surface exposed in July 2026.",
      "It does not establish that no deleted, hidden, or otherwise unexposed record existed.",
    ],
    supportsClaimIds: [populationClaimId, publicationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-FORMS-AND-THEMES",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "The population contains 150 event routes, 138 standalone posts, 78 original-media posts, 52 reshared stories, and 26 source-or-resource routes; primary-theme accounting places 157 records in nightlife governance, 71 in commercial rent, and 47 in cultural-space care.",
    observationType: "attributed",
    locator: "forms; primaryThemes; themeOccurrences",
    confidence: "high",
    limitations: [
      "Themes are archival classifications, not Facebook-authored categories.",
      "Multi-label theme occurrences overlap and cannot be summed into a unique-record denominator.",
    ],
    supportsClaimIds: [publicationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-STAKEHOLDER-ROUTING",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "Rule-matched addressing appears in 88 records for NYC Council members or the Council, 40 for cultural or nightlife agencies, and 39 for cultural or advocacy partners.",
    observationType: "attributed",
    locator: "stakeholderRouting.recordOccurrences",
    confidence: "high",
    limitations: [
      "The categories count records containing references or links, not distinct people or institutions.",
      "A mention, tag, quotation, link, or reshare does not establish that a stakeholder saw, authored, endorsed, replied to, or acted on a post.",
    ],
    supportsClaimIds: [stakeholderClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-VISIBLE-INTERACTIONS",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "On July 14, 2026, 389 records retained at least one visible interaction; unlinkable aggregate floors were 2,374 reactions, 212 comments, and 611 shares.",
    observationType: "metadata",
    locator: "visibleInteractionSnapshot",
    confidence: "high",
    limitations: [
      "The counters are mutable interface observations, not historical peaks or complete analytics.",
      "They are not unique people, reach, attendance, stakeholder endorsement, conversion, causality, or impact.",
    ],
    supportsClaimIds: [interactionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-ROUTES",
    sourceId: routeLedgerSourceId,
    project: projectId,
    statement:
      "The rendered corpus exposed 64 outbound-link occurrences consolidated into 33 normalized public-safe routes; two historical meeting-access or form routes remain protected without a public URL.",
    observationType: "metadata",
    locator: "accounting; rows",
    confidence: "high",
    limitations: [
      "A posted route proves circulation through the Page, not the truth of the destination.",
      "It does not establish authorship, readership, endorsement, clicks, partnership, conversion, or outcome.",
    ],
    supportsClaimIds: [routeClaimId, publicationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-PUBLISHER-BOUNDARY",
    sourceId: managedContentSourceId,
    project: projectId,
    statement:
      "The inspected Page and managed-content surfaces did not expose a historic human-level publisher field for the 444-record population, and the managed-content view contained later event-maintenance activity outside the public chronology.",
    observationType: "metadata",
    locator: "Protected managed-content crosscheck",
    confidence: "high",
    limitations: [
      "Absence of an exposed field does not establish that publisher records never existed.",
      "Current access or Page identity cannot be converted into historical individual authorship.",
    ],
    supportsClaimIds: [populationClaimId, roleMemoryClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-ROLE-MEMORY",
    sourceId: memorySourceId,
    project: projectId,
    statement:
      "Jamie recalls being predominantly the person who used the NYC Artist Coalition Facebook Page while also recalling that other collaborators used it.",
    observationType: "attributed",
    locator: "Jamie Burkart first-person account, July 2026",
    confidence: "limited",
    limitations: [
      "The recollection does not identify the publisher of a specific record or quantify a share of publishing labor.",
      "Collaborator accounts and native platform evidence remain to be recovered.",
    ],
    supportsClaimIds: [roleMemoryClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-CABARET-RECORD",
    sourceId: "SRC-FB-NYCAC-CABARET-LAW-CULTURE-POST",
    project: projectId,
    statement:
      "A public coalition post tags Jamie Burkart and Council Member Rafael Espinal while connecting Cabaret Law repeal with venue safety and trust between cultural spaces and city government.",
    observationType: "explicit",
    locator: "Public post body and tagged accounts",
    confidence: "high",
    limitations: [
      "The post does not identify its human publisher or drafter.",
      "A tag does not establish endorsement, response, or policy causality.",
    ],
    supportsClaimIds: [publicationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-TALKS-NOT-RAIDS-RECORD",
    sourceId: "SRC-FB-NYCAC-TALKS-NOT-RAIDS-POST",
    project: projectId,
    statement:
      "A public coalition post preserves Olympia Kazi's attributed safety-and-transparency framing and routes readers to the Talks Not Raids campaign site.",
    observationType: "explicit",
    locator: "Public post body and campaign route",
    confidence: "high",
    limitations: [
      "Olympia Kazi retains authorship credit for her words.",
      "The post does not establish Jamie's individual production role, stakeholder response, or campaign causality.",
    ],
    supportsClaimIds: [publicationClaimId, routeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-COVID-RESOURCE-RECORD",
    sourceId: "SRC-FB-NYCAC-COVID-KNOW-YOUR-RIGHTS-VIDEO",
    project: projectId,
    statement:
      "A public coalition video route connected cultural-space participants to historical rent, tenant, and small-business legal information during the COVID-19 crisis.",
    observationType: "explicit",
    locator: "Public video route and attached resource framing",
    confidence: "high",
    limitations: [
      "The record is historical and is not current legal guidance.",
      "It does not establish audience use, service delivery, conversion, or impact.",
    ],
    supportsClaimIds: [publicationClaimId, routeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-NYCAC-FB-POST-AGENT-OF-CHANGE-SOURCE",
    sourceId: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
    project: projectId,
    statement:
      "In a September 26, 2018, City & State opinion article circulated by the Page, Council Member Rafael Espinal describes an Agent of Change bill that would require soundproofing for new residential construction near existing nightlife venues and new nightlife venues near existing residences.",
    observationType: "explicit",
    locator: "Headline, byline, date, and paragraphs 4-7",
    confidence: "high",
    limitations: [
      "The article describes Espinal's proposal and does not establish enactment or implementation.",
      "Its circulation does not establish NYC Artist Coalition authorship, endorsement by every collaborator, audience use, or Jamie's individual role.",
    ],
    supportsClaimIds: [routeClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const nycartcFacebookPostClaims = [
  {
    id: populationClaimId,
    project: projectId,
    claimType: "context",
    internalClaim:
      "The surviving NYC Artist Coalition public Facebook Page timeline contains 444 unique records from January 29, 2017, through September 15, 2021; a first-party crosscheck shows that this is not equivalent to all managed Page content.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-FB-POST-RESEARCH-METHOD",
      "OBS-NYCAC-FB-POST-POPULATION",
      "OBS-NYCAC-FB-POST-PUBLISHER-BOUNDARY",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Two terminal traversals recovered the same 444 unique surviving public Page timeline records from January 2017 through September 2021.",
        status: "active",
        citationRequired: true,
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
        renderCitation: true
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
    researchTaskIds: ["RT-NYCAC-FB-POST-OWNER-EXPORT"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "public-safety review"],
  },
  {
    id: publicationClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "The 444-record public timeline shows NYC Artist Coalition's shared identity functioning as a durable civic publication system across event routes, public meetings, campaign calls, source and resource routes, partner voices, cultural-space care, nightlife governance, MARCH transparency, and Commercial Rent Stabilization.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-FB-POST-POPULATION",
      "OBS-NYCAC-FB-POST-FORMS-AND-THEMES",
      "OBS-NYCAC-FB-POST-ROUTES",
      "OBS-NYCAC-FB-POST-CABARET-RECORD",
      "OBS-NYCAC-FB-POST-TALKS-NOT-RAIDS-RECORD",
      "OBS-NYCAC-FB-POST-COVID-RESOURCE-RECORD",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The public timeline contains 150 event routes and 26 source-or-resource routes inside a broader 444-record civic publication system.",
        status: "active",
        citationRequired: true,
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
        renderCitation: true
      },
      {
        sourceId: routeLedgerSourceId,
        relationship: "direct-support",
        supports: ["public-safe posted-route accounting"],
        locator: "accounting; rows",
        confidence: "high",
        renderCitation: true
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
    researchTaskIds: ["RT-NYCAC-FB-POST-LINK-CLOSE-READ"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy: ["Codex source review", "collective-credit review", "Chad lens review"],
  },
  {
    id: stakeholderClaimId,
    project: projectId,
    claimType: "context",
    internalClaim:
      "The currently recoverable public timeline contains 88 records referencing or linking NYC Council members or the Council, 40 referencing cultural or nightlife agencies, and 39 referencing cultural or advocacy partners.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-NYCAC-FB-POST-STAKEHOLDER-ROUTING"],
    projections: [
      {
        key: "archive-note",
        text:
          "Stakeholder routing recurs across the timeline: 88 records reference Council members or the Council, 40 reference cultural or nightlife agencies, and 39 reference cultural or advocacy partners.",
        status: "active",
        citationRequired: true,
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
        renderCitation: true
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
    researchTaskIds: ["RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy: ["Codex source review", "metric-boundary review"],
  },
  {
    id: interactionClaimId,
    project: projectId,
    claimType: "scale",
    internalClaim:
      "Three hundred eighty-nine of 444 recovered public timeline records display at least one current interaction; aggregate mutable signals at capture are 2,374 reactions, 212 comments, and 611 shares.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-NYCAC-FB-POST-VISIBLE-INTERACTIONS"],
    projections: [
      {
        key: "archive-note",
        text:
          "Three hundred eighty-nine records retain at least one visible interaction; current record-level totals are 2,374 reactions, 212 comments, and 611 shares.",
        status: "active",
        citationRequired: true,
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
        renderCitation: true
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
    researchTaskIds: ["RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "metric-boundary review"],
  },
  {
    id: routeClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "The current rendered corpus exposed 64 outbound-link occurrences consolidated into 33 normalized public-safe routes across coalition campaign, government, public-information, press, cultural, event, fundraising, and resource destinations.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-FB-POST-ROUTES",
      "OBS-NYCAC-FB-POST-TALKS-NOT-RAIDS-RECORD",
      "OBS-NYCAC-FB-POST-COVID-RESOURCE-RECORD",
      "OBS-NYCAC-FB-POST-AGENT-OF-CHANGE-SOURCE",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The current Page corpus preserves 33 normalized public-safe routes across campaign, civic-information, press, cultural, fundraising, and practical-resource destinations.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-NYCAC-POSTED-URL-INVENTORY-2026",
        relationship: "direct-support",
        supports: ["route-occurrence and normalized-route accounting"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
        relationship: "direct-support",
        supports: ["public-safe normalized route inventory and protected-route boundary"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-TALKS-NOT-RAIDS-POST",
        relationship: "direct-support",
        supports: ["one public campaign-routing record"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-FB-NYCAC-COVID-KNOW-YOUR-RIGHTS-VIDEO",
        relationship: "direct-support",
        supports: ["one public practical-resource routing record"],
        confidence: "high",
        renderCitation: true
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
    researchTaskIds: ["RT-NYCAC-FB-POST-LINK-CLOSE-READ"],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Codex source-routing review", "public-safety review"],
  },
  {
    id: roleMemoryClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie recalls being predominantly the person using NYC Artist Coalition's Facebook Page while other coalition collaborators also used it.",
    epistemicState: "unreviewed",
    publicationState: "restricted",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: [
      "OBS-NYCAC-FB-POST-PUBLISHER-BOUNDARY",
      "OBS-NYCAC-FB-POST-ROLE-MEMORY",
    ],
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
    researchTaskIds: [
      "RT-NYCAC-FB-POST-OWNER-EXPORT",
      "RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "collective-credit review"],
  }
] satisfies ClaimRecord[];

export const nycartcFacebookPostResearchTasks = [
  {
    id: "RT-NYCAC-FB-POST-OWNER-EXPORT",
    project: projectId,
    question:
      "Can an owner-authorized Meta export reconcile deleted, hidden, and managed-content-only NYC Artist Coalition records with the 444-record surviving Page surface and expose historic publisher fields?",
    priority: "high",
    status: "open",
    captureIds: [
      "CAP-NYCAC-FACEBOOK-POST-POPULATION-2026",
      "CAP-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
    ],
    sourceIds: [populationSourceId, managedContentSourceId, ledgerSourceId, memorySourceId],
    claimIds: [populationClaimId, roleMemoryClaimId],
    successCriteria: [
      "Acquire an owner-authorized export with stable record IDs, dates, availability states, and publisher fields when Meta provides them.",
      "Reconcile export-only, current-surface-only, deleted, hidden, and managed-content-only records without overwriting prior denominators.",
      "Keep personal engagement identities, private messages, access data, and authentication material outside the public repository.",
    ],
    nextActions: [
      "Request the available NYC Artist Coalition Page owner export.",
      "Crosswalk stable IDs and dates against the protected identity set and public disposition ledger.",
      "Version any denominator or publisher-attribution correction with explicit provenance.",
    ],
    publicNote:
      "The July 2026 Page surface is exact-set checked as materialized; native-export completeness and historic publisher attribution remain open.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-NYCAC-FB-POST-LINK-CLOSE-READ",
    project: projectId,
    question:
      "Which of the 33 normalized destinations circulated by NYC Artist Coalition can mature from routing leads into independently verified source records?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-NYCAC-FACEBOOK-POST-POPULATION-2026"],
    sourceIds: [
      routeResearchSourceId,
      routeLedgerSourceId,
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
    ],
    claimIds: [publicationClaimId, routeClaimId],
    successCriteria: [
      "Check each live destination or stable archive and record title, author, date, source kind, and preservation state.",
      "Decompose claims only after close reading and never treat circulation as authorship, endorsement, or corroboration.",
      "Preserve dead or sensitive destinations with appropriate archive and public-safety status.",
    ],
    nextActions: [
      "Prioritize Council, campaign, press, cultural-space, and practical-resource routes not already represented in the bank.",
      "Associate existing sources rather than creating duplicate records.",
      "Promote only destinations that materially strengthen a defensible project claim.",
    ],
    publicNote:
      "The full route inventory is preserved; selected destinations are close-read and the remainder stay in the research lifecycle.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-NYCAC-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    project: projectId,
    question:
      "What collaborator and identity-complete evidence can refine Jamie's Page-publishing role and establish mission-relevant stakeholder engagement without transferring collective credit or publishing personal social data?",
    priority: "high",
    status: "in-progress",
    captureIds: [
      "CAP-NYCAC-FACEBOOK-POST-POPULATION-2026",
      "CAP-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
    ],
    sourceIds: [pageSourceId, managedContentSourceId, memorySourceId, ledgerSourceId],
    claimIds: [roleMemoryClaimId, stakeholderClaimId, interactionClaimId],
    successCriteria: [
      "Invite relevant coalition collaborators to confirm, refine, or contest the publishing-role wording.",
      "Establish a complete denominator before reporting engagement by stakeholder group.",
      "Separate Page publishing, source authorship, account administration, coalition strategy, and partner voice.",
      "Publish public-official or institutional identities only when mission relevance and public-safety review justify it.",
    ],
    nextActions: [
      "Request collaborator proof notes through the repository's evidence-intake protocol.",
      "Inspect owner-authorized reactions and comments data if Meta provides an identity-complete export.",
      "Cross-reference public institutional accounts only after denominator and identity reconciliation.",
    ],
    publicNote:
      "The current record supports collective Page-level publishing patterns and aggregate interaction floors. Jamie's predominant-use memory and stakeholder-engagement identities remain research leads.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const nycartcFacebookPostInquiries = [
  {
    id: "INQ-NYCAC-FACEBOOK-POSTS-2026",
    project: projectId,
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
      pageSourceId,
      populationSourceId,
      managedContentSourceId,
      ledgerSourceId,
      ...selectedPostSourceIds,
      "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19",
      "SRC-PRESS-TNR-GOTHAMIST-2019-02-12",
      "SRC-NYCAC-NPR-KUAF-CABARET-2017-09-20",
    ],
    publicSummary:
      "Two exact-set-checked terminal traversals recovered 444 surviving public Page timeline records and identified a durable cross-campaign publication system. Individual publisher attribution and first-party managed-content reconciliation remain open.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTS-2026-001"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-POSTED-SOURCES-2026",
    project: projectId,
    question:
      "Which destinations posted by NYC Artist Coalition can be normalized, close-read, and promoted from routing leads into independent knowledge-bank sources?",
    methods: [
      "Consolidated 64 current outbound-link occurrences into 33 normalized public-safe routes.",
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
      routeResearchSourceId,
      routeLedgerSourceId,
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"
    ],
    publicSummary:
      "The current Page exposed 33 normalized public-safe routes; selected destinations were close-read or retained at explicitly bounded metadata depth.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POSTED-URLS-2026-001"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026",
    project: projectId,
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
      memorySourceId,
      managedContentSourceId,
      pageSourceId,
    ],
    publicSummary:
      "Jamie remembers predominant but shared use of the Page; the current record does not establish historical exclusivity or post-level authorship.",
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-ROLE-2026-001"
  }
] satisfies ResearchInquiry[];

export const nycartcFacebookPostReviewSummary = {
  records: 444,
  dateStart: "2017-01-29",
  dateEnd: "2021-09-15",
  terminalTraversals: 2,
  exactIdentitySetMatch: true,
  normalizedPublicSafeRoutes: 33,
  recordsWithVisibleInteraction: 389,
  publisherAttribution: "unresolved",
  criterion:
    "Every recovered record has a public-safe disposition, two terminal traversals match exactly, route and interaction aggregates reconcile, private social data is excluded, and no Page-level evidence is converted into individual authorship, stakeholder engagement, or impact.",
} as const;
