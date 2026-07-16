import type { KnowledgeBank } from "./schema.ts";

const personalProjectId = "jamie-event-practice";
const wowlistProjectId = "wowlist";
const reportUrl =
  "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md";

export const jamieWowlistFacebookEventSourceIds = {
  personalSurface: "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026-07-15",
  personalCensus: "SRC-JAMIE-FACEBOOK-EVENT-CENSUS-2026-07-15",
  personalProtectedResearch:
    "SRC-JAMIE-FACEBOOK-EVENT-RESEARCH-2026-07-15",
  wowlistSurface: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026-07-15",
  wowlistCensus: "SRC-WOWLIST-FACEBOOK-EVENT-CENSUS-2026-07-15",
  wowlistProtectedResearch:
    "SRC-WOWLIST-FACEBOOK-EVENT-RESEARCH-2026-07-15",
} as const;

export const jamieWowlistFacebookEventClaimIds = {
  personalPopulation: "CLM-JAMIE-FACEBOOK-EVENT-POPULATION",
  personalPractice: "CLM-JAMIE-EVENT-PRACTICE-LONG-ARC",
  personalResponseSignals: "CLM-JAMIE-FACEBOOK-EVENT-RESPONSE-SIGNALS",
  wowlistZeroState: "CLM-WOWLIST-FACEBOOK-EVENT-ZERO-STATE",
  wowlistCrossSurface: "CLM-WOWLIST-FACEBOOK-EVENT-CROSS-SURFACE",
} as const;

export const jamieFacebookEventReviewSummary = {
  displayedControlSlots: 21,
  recoveredIndexEvents: 20,
  recoveredDetailEvents: 20,
  unresolvedControlSlots: 1,
  eventsListingJamieAsOrganizerOrCoorganizer: 20,
  jamieOnlyOrganizerDisplays: 13,
  cohostedOrganizerDisplays: 7,
  recoveredYears: {
    2006: 1,
    2007: 4,
    2010: 1,
    2012: 2,
    2013: 3,
    2014: 3,
    2016: 3,
    2017: 2,
    2019: 1,
  },
  eventsWithDisplayedResponses: 6,
  responseDisplaysAtLeast20: 5,
  responseDisplaysAtLeast100: 2,
  publicResourceOccurrences: 18,
  distinctPublicResourceUrls: 17,
  withheldOutboundLinkOccurrences: 1,
} as const;

export const wowlistFacebookEventReviewSummary = {
  currentDisplayedEvents: 0,
  currentSurfaceMessage: "No events to show",
  preservedPagePostLinkedEvents: 2,
  linkedEventsHostedByWowlist: 0,
} as const;

export const jamieWowlistFacebookEventSources = [
  {
    id: jamieWowlistFacebookEventSourceIds.personalSurface,
    title: "Jamie Burkart Facebook Past Events surface",
    author: "Jamie Burkart",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/jburkart/events",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart, Facebook Past Events surface, authenticated review July 15, 2026.",
    publicNote:
      "Repeated terminal scrolling exposed 20 unique event cards. A separate host-card control displayed 21 past events.",
    supportsGenerally: [
      "20 currently exposed event identities",
      "public event titles, dates, venues, and organizer displays",
      "a 21-past-events host-card control",
    ],
    doesNotEstablish: [
      "a complete Meta owner export",
      "the identity of the unmaterialized historical event",
      "that no event was deleted or withheld before capture",
      "physical attendance, unique reach, endorsement, or impact",
      "permission to publish residential addresses, contacts, guests, or comments",
    ],
  },
  {
    id: jamieWowlistFacebookEventSourceIds.personalCensus,
    title: "Jamie Burkart Facebook event public-safe full-population census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/jamie-facebook-events-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of Jamie Burkart's complete currently exposed Facebook Past Events population, July 15, 2026.",
    publicNote:
      "The fixture preserves 20 public event plot points, purpose summaries, organizer displays, broad venue descriptions, bounded response snapshots, and selected public resource routes while excluding raw or sensitive event data.",
    supportsGenerally: [
      "21-of-21 displayed control-slot accounting",
      "20 recovered detail records from December 2006 through February 2019",
      "20 records naming Jamie as organizer or co-organizer",
      "13 Jamie-only and seven cohosted organizer displays",
      "bounded event-purpose, response-threshold, and source-route findings",
    ],
    doesNotEstablish: [
      "the missing event identity",
      "every event Jamie has organized",
      "physical attendance or unique people",
      "Jamie's sole authorship of cohosted events",
      "measured program impact or policy causality",
    ],
  },
  {
    id: jamieWowlistFacebookEventSourceIds.personalProtectedResearch,
    title: "Authenticated Jamie Burkart Facebook event research run",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated archival-production review of Jamie Burkart's Facebook Past Events population, July 15, 2026.",
    publicNote:
      "The protected record preserves traversal and detail-page provenance without publishing residential addresses, phone numbers, guests, comments, invite context, raw event bodies, or authenticated-session state.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-EVENT-RESEARCH-2026-07-15",
    supportsGenerally: [
      "terminal-scroll reconciliation",
      "20 detail-page reviews",
      "organizer-display and source-route extraction",
      "public-safety classification",
    ],
    doesNotEstablish: [
      "permission to publish protected capture data",
      "a complete Meta owner export",
      "physical attendance, unique reach, or impact",
    ],
  },
  {
    id: jamieWowlistFacebookEventSourceIds.wowlistSurface,
    title: "WOWList Facebook Events surface",
    organization: "WOWList",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/wowlist/events",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOWList, Facebook Events surface, authenticated review July 15, 2026.",
    publicNote:
      "The current authenticated surface displayed the message 'No events to show' and exposed no event cards.",
    supportsGenerally: [
      "a zero-event current interface state on the capture date",
      "the current WOWList Facebook page identity",
    ],
    doesNotEstablish: [
      "that WOWList never hosted a Facebook event",
      "that no event was removed during page migration or platform change",
      "a complete historical event denominator",
      "a native Meta owner export",
    ],
  },
  {
    id: jamieWowlistFacebookEventSourceIds.wowlistCensus,
    title: "WOWList Facebook event-surface and linked-route census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-events-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe reconciliation of the current WOWList Facebook Events surface and the event routes in the preserved full-population page-post corpus, July 15, 2026.",
    publicNote:
      "The fixture keeps the current zero-state separate from two externally hosted event routes shared by the WOWList page account.",
    supportsGenerally: [
      "zero current event cards",
      "two preserved page-post-linked Facebook event routes",
      "zero of the two linked routes hosted by WOWList",
      "cross-surface routing between WOWList, a Chicago DIY event, and NYC cultural-space advocacy",
    ],
    doesNotEstablish: [
      "a historical hosted-event count",
      "that the two linked events were WOWList events",
      "authorship of the shared page posts by Jamie",
      "attendance, adoption, endorsement, or impact",
    ],
  },
  {
    id: jamieWowlistFacebookEventSourceIds.wowlistProtectedResearch,
    title: "Protected WOWList Facebook event and page-post research run",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated and protected archival-production review of WOWList's Facebook Events surface and preserved page-post population, July 15, 2026.",
    publicNote:
      "The protected source preserves the page-post denominator and event-route discovery trail without publishing raw post bodies, comments, reactions, account administration, local archive paths, or authenticated-session state.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-EVENT-RESEARCH-2026-07-15",
    supportsGenerally: [
      "current Events-surface review",
      "full-population page-post event-link search",
      "two event-detail reviews",
      "host and relationship classification",
    ],
    doesNotEstablish: [
      "permission to publish protected archive data",
      "a native Meta owner export",
      "historic hosted-event completeness",
      "individual page-post authorship",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const jamieWowlistFacebookEventClaims = [
  {
    id: jamieWowlistFacebookEventClaimIds.personalPopulation,
    project: personalProjectId,
    internalClaim:
      "Jamie's complete currently exposed Facebook Past Events control contains 21 displayed slots: 20 public event records were recovered and close-read, while one historical slot remains unmaterialized and unidentified.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Facebook displayed 21 past-event slots for Jamie. The knowledge bank recovered all 20 event identities exposed by the live index and records the remaining slot as unresolved.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: jamieWowlistFacebookEventSourceIds.personalSurface,
        relationship: "corroborating",
        supports: ["20-event terminal index population", "21-event host-card control"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamieWowlistFacebookEventSourceIds.personalCensus,
        relationship: "direct-support",
        supports: ["21-of-21 control-slot disposition", "20 recovered detail records"],
        locator: "populationReconciliation and events",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamieWowlistFacebookEventSourceIds.personalProtectedResearch,
        relationship: "private-support",
        supports: ["authenticated traversal provenance", "detail-page review"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is complete control-slot accounting, not complete historical content recovery or a native Meta owner export.",
      "The unresolved slot receives no inferred title, date, host, purpose, or response count.",
      "The live index cannot establish that no event was removed before capture.",
    ],
    antiClaims: [
      "All 21 event pages were recovered",
      "Jamie organized exactly 21 events in his life",
      "The unresolved event never existed",
      "Facebook is a complete owner archive",
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
  {
    id: jamieWowlistFacebookEventClaimIds.personalPractice,
    project: personalProjectId,
    internalClaim:
      "Twenty recovered public event pages from December 2006 through February 2019 name Jamie as organizer or co-organizer across participatory art, public history, DIY music, recurring hosting, mutual aid, civic preparation, cultural-space safety, and interactive media.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Twenty recovered public event pages spanning December 2006 through February 2019 name Jamie as organizer or co-organizer. Together they document a long practice of giving emerging cultural, civic, and community needs a form people could enter: gatherings, screenings, installations, shared meals, safety training, public art, and DIY music programs.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: jamieWowlistFacebookEventSourceIds.personalCensus,
        relationship: "direct-support",
        supports: [
          "20 organizer or co-organizer displays naming Jamie",
          "December 2006 through February 2019 chronology",
          "13 Jamie-only and seven cohosted organizer displays",
          "event-purpose and theme inventory",
        ],
        locator: "aggregateSnapshot and events",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Preserve every named cohost and the distinction between organizer and co-organizer displays.",
      "An organizer display does not establish Jamie's complete task list, sole authorship, production budget, attendance, or measured impact.",
      "The ledger is a recovered public sample bounded by Facebook's current interface, not Jamie's complete event history.",
    ],
    antiClaims: [
      "Jamie solely created every recovered event",
      "Facebook preserves Jamie's complete event practice",
      "Every recovered event was part of one continuous formal program",
      "The event pages prove attendance or impact",
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival-production review"],
  },
  {
    id: jamieWowlistFacebookEventClaimIds.personalResponseSignals,
    project: personalProjectId,
    internalClaim:
      "Six recovered personal event pages display historical Facebook response counts; five display at least 20 responses and two at least 100.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Six recovered event pages retain historical Facebook response labels; five display at least 20 responses and two at least 100. These are event-level platform signals, not verified attendance or unique reach.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: jamieWowlistFacebookEventSourceIds.personalCensus,
        relationship: "direct-support",
        supports: ["six response displays", "five at or above 20", "two at or above 100"],
        locator: "aggregateSnapshot and events[].responseSnapshot",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
      "People may respond to more than one event; do not sum the labels into a people-reached total.",
    ],
    antiClaims: [
      "329 unique people engaged",
      "Facebook responses equal attendance",
      "Every responder participated in the event",
      "Response labels prove program impact",
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival-production review"],
  },
  {
    id: jamieWowlistFacebookEventClaimIds.wowlistZeroState,
    project: wowlistProjectId,
    internalClaim:
      "The current WOWList Facebook Events surface displayed no event cards on July 15, 2026; this is a current zero-state, not evidence that WOWList never hosted an event.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "WOWList's current Facebook Events surface says 'No events to show.' The knowledge bank records that as a capture-date zero-state, not as proof that no historical WOWList event existed.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: jamieWowlistFacebookEventSourceIds.wowlistSurface,
        relationship: "direct-support",
        supports: ["zero current event cards", "current zero-state message"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamieWowlistFacebookEventSourceIds.wowlistCensus,
        relationship: "corroborating",
        supports: ["separation of current surface from preserved post-linked routes"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The claim applies only to the interface state observed on July 15, 2026.",
      "A current zero-state cannot establish that no event was historically hosted, deleted, migrated, restricted, or otherwise removed from the page surface.",
    ],
    antiClaims: [
      "WOWList never hosted a Facebook event",
      "The WOWList page has no event history",
      "Facebook preserves a complete WOWList owner archive",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
  {
    id: jamieWowlistFacebookEventClaimIds.wowlistCrossSurface,
    project: wowlistProjectId,
    internalClaim:
      "The complete preserved WOWList Facebook page-post corpus contains two distinct Facebook event routes: a Chicago DIY gathering whose event description linked a WOWList scene page and a NYC cultural-space safety meeting shared by the WOWList account. Neither event was hosted by WOWList.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Two Facebook event routes survive in the preserved WOWList page-post corpus. One Chicago DIY event linked a dedicated WOWList scene page; the WOWList account also circulated a New York cultural-space safety meeting. Both are evidence of cross-surface curation and routing, not WOWList-hosted events.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: jamieWowlistFacebookEventSourceIds.wowlistCensus,
        relationship: "direct-support",
        supports: [
          "two distinct page-post-linked event routes",
          "zero WOWList-hosted linked events",
          "WOWList scene-page and cultural-space advocacy routing",
        ],
        locator: "linkedEvents",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: jamieWowlistFacebookEventSourceIds.wowlistProtectedResearch,
        relationship: "private-support",
        supports: ["full-population page-post URL search", "two event-detail reviews"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe these as event routes shared through the WOWList page account, not WOWList events.",
      "Do not assign the two page posts to Jamie individually; the account was a shared project identity.",
      "A link to a WOWList scene page does not prove broad project adoption, attendance, endorsement, or impact.",
    ],
    antiClaims: [
      "WOWList hosted the two recovered events",
      "Jamie personally authored both WOWList page posts",
      "Two event links constitute a historical hosted-event denominator",
      "The linked events prove widespread WOWList adoption",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival-production review"],
  },
] satisfies KnowledgeBank["claims"];

export const jamieWowlistFacebookEventResearchInquiries = [
  {
    id: "INQ-JAMIE-FACEBOOK-EVENT-POPULATION-2026",
    project: personalProjectId,
    question:
      "What does the complete currently exposed population of Jamie's personal Facebook Past Events establish about his event practice, and what must remain unresolved or protected?",
    methods: [
      "Repeated authenticated scrolling until the event-ID population remained stable for six terminal rounds.",
      "Reconciled 20 materialized event IDs against the separate 21-past-events host-card control.",
      "Reviewed all 20 exposed event detail pages and retained public-safe dates, titles, broad venues, organizer displays, purpose summaries, bounded response labels, themes, and selected public source routes.",
      "Close-read five event routes recovered from the protected personal-post archive as candidates for the missing slot; none listed Jamie as organizer or co-organizer, so the missing slot remains unresolved.",
      "Excluded exact residential addresses, phone numbers, guest identities, comments, invite context, raw descriptions, tracking parameters, and authenticated-session state.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "All 21 displayed control slots are accounted: 20 event identities and detail pages recovered, one historical slot unresolved.",
      "Every recovered page names Jamie as organizer or co-organizer; 13 display Jamie alone and seven preserve cohost credit.",
      "The recovered chronology spans December 2006 through February 2019 and includes participatory art, public history, DIY music, recurring hosting, mutual aid, civic preparation, cultural-space safety, and interactive media.",
      "Six pages display historical response counts; five are at least 20 and two at least 100.",
      "Eighteen normalized public resource occurrences resolve to 17 distinct URLs; one unresolved short link is withheld by category.",
    ],
    limitations: [
      "The remaining host-card slot did not materialize and cannot be assigned a title, date, host, purpose, or response count.",
      "The live index is not a native Meta owner export and cannot establish that no event was deleted or withheld before capture.",
      "Organizer displays do not establish complete task lists, sole authorship, budgets, physical attendance, unique reach, or measured outcomes.",
      "Response labels are mutable platform signals and must not be summed into a people-reached claim.",
      "Some public event bodies contain residential and contact information that is intentionally excluded from the public repository.",
    ],
    sourceIds: [
      jamieWowlistFacebookEventSourceIds.personalSurface,
      jamieWowlistFacebookEventSourceIds.personalCensus,
      jamieWowlistFacebookEventSourceIds.personalProtectedResearch,
    ],
    publicSummary:
      "The complete displayed control is reconciled as 20 recovered public event records plus one unresolved slot. The record establishes a long organizer and co-organizer practice while preserving collaborator credit, privacy, and the difference between response labels and attendance.",
    protectedLocatorId: "LOC-JAMIE-FACEBOOK-EVENT-RESEARCH-2026-07-15",
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-EVENT-POPULATION-2026",
    project: wowlistProjectId,
    question:
      "Can WOWList's current Facebook event surface and preserved page-post corpus establish a historical hosted-event population or a narrower cross-surface event-routing pattern?",
    methods: [
      "Reviewed the authenticated WOWList Facebook Events surface and recorded its complete current zero-state.",
      "Searched the complete protected WOWList page-post population for Facebook event URLs.",
      "Recovered two distinct linked event routes and reviewed both event detail pages for host, date, purpose, response label, and project relationship.",
      "Separated current page-surface events, page-post-linked external events, and historical hosted-event claims into different denominators.",
      "Excluded raw page-post bodies, comments, reactions, account administration, archive paths, and authenticated-session state.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The current Events surface exposed zero event cards and displayed 'No events to show.'",
      "The complete preserved page-post corpus contains two distinct Facebook event routes.",
      "Neither linked event was hosted by WOWList.",
      "One Chicago DIY event description linked a dedicated WOWList scene page; the WOWList account also circulated a New York cultural-space safety meeting.",
    ],
    limitations: [
      "A current zero-state does not establish that WOWList never hosted an event or that no event was lost through page migration or platform change.",
      "Page-post links are not a hosted-event denominator.",
      "Shared project-account posts do not establish Jamie's individual authorship.",
      "Event links and response labels do not establish attendance, adoption, endorsement, conversion, or impact.",
      "A native Meta owner export or historical page-management archive is needed to evaluate hosted-event completeness.",
    ],
    sourceIds: [
      jamieWowlistFacebookEventSourceIds.wowlistSurface,
      jamieWowlistFacebookEventSourceIds.wowlistCensus,
      jamieWowlistFacebookEventSourceIds.wowlistProtectedResearch,
    ],
    publicSummary:
      "WOWList's current Facebook event surface is empty, while two externally hosted event routes survive in the preserved page-post population. The evidence supports a bounded cross-surface curation pattern, not a historical hosted-event count.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-EVENT-RESEARCH-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const jamieWowlistFacebookEventIntakeItems = [
  {
    id: "INTAKE-JAMIE-FACEBOOK-EVENT-POPULATION-2026-07-15",
    title: "Jamie Burkart personal Facebook event archival production",
    project: personalProjectId,
    kind: "source-link",
    summary:
      "A full-population authenticated review accounts for all 21 displayed personal Facebook event slots, preserves 20 public-safe historical plot points, and develops bounded claims about Jamie's long organizer and co-organizer practice.",
    status: "integrated",
    sourceIds: [
      jamieWowlistFacebookEventSourceIds.personalSurface,
      jamieWowlistFacebookEventSourceIds.personalCensus,
      jamieWowlistFacebookEventSourceIds.personalProtectedResearch,
    ],
    relatedClaimIds: [
      jamieWowlistFacebookEventClaimIds.personalPopulation,
      jamieWowlistFacebookEventClaimIds.personalPractice,
      jamieWowlistFacebookEventClaimIds.personalResponseSignals,
    ],
    relatedProofIds: [],
    candidateClaims: [],
    propositions: [
      {
        id: "PROP-JAMIE-FACEBOOK-EVENT-POPULATION-2026",
        text: "Facebook displayed 21 Jamie Burkart past-event slots; 20 event identities and detail pages were recovered, and one metadata-free historical slot remains unresolved.",
        status: "supported-with-boundary",
        sourceIds: [
          jamieWowlistFacebookEventSourceIds.personalSurface,
          jamieWowlistFacebookEventSourceIds.personalCensus,
          jamieWowlistFacebookEventSourceIds.personalProtectedResearch,
        ],
        sourceSupport: ["21-past-events control", "20-event stable terminal index", "20 reviewed detail pages"],
        boundaries: [
          "This is complete control-slot accounting, not a native Meta export or complete historical content recovery.",
          "The unresolved slot receives no inferred metadata.",
        ],
        decisionUse: "Provides an exact denominator while preserving the unresolved remainder.",
      },
      {
        id: "PROP-JAMIE-EVENT-PRACTICE-LONG-ARC-2026",
        text: "Twenty recovered public event pages from December 2006 through February 2019 name Jamie as organizer or co-organizer across participatory art, public history, DIY music, recurring hosting, mutual aid, civic preparation, cultural-space safety, and interactive media.",
        status: "supported-with-boundary",
        sourceIds: [jamieWowlistFacebookEventSourceIds.personalCensus],
        sourceSupport: ["20 organizer displays naming Jamie", "13 Jamie-only and seven cohosted records", "dated purpose and theme ledger"],
        boundaries: [
          "Preserve cohost credit and do not infer sole authorship, complete task ownership, attendance, or measured impact.",
          "The recovered Facebook population is not Jamie's complete event history.",
        ],
        decisionUse: "Makes Jamie's recurring event and program-formation practice available for future audience-specific composition.",
      },
      {
        id: "PROP-JAMIE-FACEBOOK-EVENT-RESPONSE-SIGNALS-2026",
        text: "Six recovered event pages display historical Facebook response labels; five are at least 20 and two at least 100.",
        status: "supported-with-boundary",
        sourceIds: [jamieWowlistFacebookEventSourceIds.personalCensus],
        sourceSupport: ["six response-bearing records", "auditable threshold arithmetic"],
        boundaries: [
          "These are not attendance, unique people, reach, endorsement, conversion, or impact.",
          "Do not sum the labels into a people-reached claim.",
        ],
        decisionUse: "Preserves bounded traction without converting interface actions into bodies in a room.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Can a Meta owner export identify the unresolved slot and events removed before the live capture?",
      "Which collaborator accounts or production artifacts can specify task-level roles for selected cohosted events?",
      "Which independent records document physical attendance, adoption, or material outcomes for selected events?",
      "Which event-resource routes should be close-read next for project claims and chronology?",
    ],
    boundaries: [
      "Do not publish residential addresses, phone numbers, guest identities, comments, invite context, raw event bodies, tracking parameters, or authenticated-session state.",
      "Do not convert organizer displays into sole authorship or response labels into attendance.",
      "Do not create /proofs, /events, /knowledge-bank, or another public archive route from this intake.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
  {
    id: "INTAKE-WOWLIST-FACEBOOK-EVENT-POPULATION-2026-07-15",
    title: "WOWList Facebook event-surface archival production",
    project: wowlistProjectId,
    kind: "source-link",
    summary:
      "An authenticated zero-state review and a complete protected page-post event-link search preserve WOWList's current Facebook event absence and two externally hosted event routes without turning them into WOWList-hosted events.",
    status: "integrated",
    sourceIds: [
      jamieWowlistFacebookEventSourceIds.wowlistSurface,
      jamieWowlistFacebookEventSourceIds.wowlistCensus,
      jamieWowlistFacebookEventSourceIds.wowlistProtectedResearch,
    ],
    relatedClaimIds: [
      jamieWowlistFacebookEventClaimIds.wowlistZeroState,
      jamieWowlistFacebookEventClaimIds.wowlistCrossSurface,
    ],
    relatedProofIds: [],
    candidateClaims: [],
    propositions: [
      {
        id: "PROP-WOWLIST-FACEBOOK-EVENT-ZERO-STATE-2026",
        text: "The WOWList Facebook Events surface displayed no event cards on July 15, 2026.",
        status: "supported-with-boundary",
        sourceIds: [
          jamieWowlistFacebookEventSourceIds.wowlistSurface,
          jamieWowlistFacebookEventSourceIds.wowlistCensus,
        ],
        sourceSupport: ["current zero-event interface", "'No events to show' message"],
        boundaries: [
          "This is a capture-date interface state, not evidence that WOWList never hosted an event.",
          "The surface is not a native Meta owner export.",
        ],
        decisionUse: "Names a platform absence without turning it into a false historical negative.",
      },
      {
        id: "PROP-WOWLIST-FACEBOOK-EVENT-CROSS-SURFACE-2026",
        text: "Two externally hosted Facebook event routes survive in the complete preserved WOWList page-post corpus: one linked a dedicated WOWList scene page and one carried New York cultural-space safety advocacy.",
        status: "supported-with-boundary",
        sourceIds: [
          jamieWowlistFacebookEventSourceIds.wowlistCensus,
          jamieWowlistFacebookEventSourceIds.wowlistProtectedResearch,
        ],
        sourceSupport: ["two distinct event URLs", "two event-detail reviews", "zero WOWList host displays"],
        boundaries: [
          "These are project-account curation and routing records, not WOWList-hosted events.",
          "Do not infer Jamie's individual authorship, broad adoption, attendance, endorsement, or impact.",
        ],
        decisionUse: "Preserves evidence of WOWList operating across event, scene, and civic surfaces while retaining shared-account boundaries.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Can a native Meta owner export or historical page-management archive recover a true WOWList hosted-event history?",
      "Did a prior WOWList page identity retain event objects that did not migrate to the current surface?",
      "Which public event descriptions or organizer accounts independently document use of WOWList scene pages?",
      "Which collaborator records can identify page-post authorship without treating shared-account custody as sole credit?",
    ],
    boundaries: [
      "Do not publish raw post bodies, comments, reactions, account administration, local archive paths, or authenticated-session state.",
      "Do not describe externally hosted linked events as WOWList events.",
      "Do not create /proofs, /events, /knowledge-bank, or another public archive route from this intake.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
] satisfies KnowledgeBank["intakeItems"];

export const jamieWowlistFacebookEventReportUrl = reportUrl;
