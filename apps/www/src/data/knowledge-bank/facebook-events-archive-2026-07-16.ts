import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const facebookEventArchiveSourceRecords20260716: SourceRecord[] = [
  {
    id: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
    title: "Facebook events public-safe aggregate manifest",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/facebook-events-public-safe-manifest-2026-07-16.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Jamie Burkart portfolio knowledge bank, public-safe Facebook event aggregate, reviewed July 16, 2026.",
    publicNote:
      "The manifest publishes population controls and selected public event metadata while withholding the reconstructable personal timeline, addresses, attendee data, raw descriptions, and authenticated state.",
    captureFingerprint:
      "sha256:a37f0bc93967f2c8cff36227c1624be820e67a3609aa0e70c91aed620e1e4d77",
    supportsGenerally: [
      "two matching traversals of 511 occurrence rows across 502 canonical event pages",
      "capture-date chronology and organizer-display aggregates",
      "selected Sunday Dinner milestone metadata",
      "selected 2007 water-project event metadata",
      "the bounded WOW List event-search result"
    ],
    doesNotEstablish: [
      "a native Meta owner export",
      "every event ever created, deleted, withheld, or unindexed",
      "event attendance, unique people, reach, endorsement, mandate, or impact",
      "Jamie's participation in every event on his Past Events surface",
      "complete event-body or posted-URL recovery"
    ]
  },
  {
    id: "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
    title: "Authenticated Jamie Burkart Facebook Past Events census",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production review of Jamie Burkart's capture-date Facebook Past Events interface, July 16, 2026.",
    publicNote:
      "Two independent traversals produced the same occurrence-key digest and terminal population. The raw event ledger remains protected.",
    captureFingerprint:
      "sha256:a37f0bc93967f2c8cff36227c1624be820e67a3609aa0e70c91aed620e1e4d77",
    protectedLocatorId: "LOC-FACEBOOK-JAMIE-PAST-EVENTS-2026",
    supportsGenerally: [
      "511 occurrence rows",
      "502 canonical event pages",
      "nine occurrence-specific rows",
      "capture-date chronology and organizer displays",
      "two independent matching traversals"
    ],
    doesNotEstablish: [
      "a native Meta owner export",
      "all-ever event history",
      "attendance, participation, endorsement, or impact",
      "event-body URL completeness"
    ]
  },
  {
    id: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100! Facebook event record",
    organization: "Sunday Dinner",
    kind: "institutional-social-post",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2014-03-09",
    accessedAt: reviewedAt,
    publicCitation:
      "Sunday Dinner, public Facebook event record identifying the March 9, 2014 gathering as its 100th event.",
    publicNote:
      "The underlying event URL is withheld because the surviving page includes an address. Public-safe metadata is preserved in the aggregate manifest.",
    protectedLocatorId: "LOC-FACEBOOK-SUNDAY-DINNER-100-2014",
    supportsGenerally: [
      "the event's self-described 100th-gathering milestone",
      "March 9, 2014 date",
      "Jamie Burkart organizer display",
      "a mutable 21-people-responded interface label"
    ],
    doesNotEstablish: [
      "an independently audited gathering total",
      "physical attendance",
      "sole authorship or stewardship of Sunday Dinner"
    ]
  },
  {
    id: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
    title: "200th Sunday Dinner Facebook event record",
    organization: "Sunday Dinner",
    kind: "institutional-social-post",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2016-06-26",
    accessedAt: reviewedAt,
    publicCitation:
      "Sunday Dinner, public Facebook event record identifying the June 26, 2016 gathering as its 200th event and displaying Julia Fredenburg and Jamie Burkart as organizers.",
    publicNote:
      "The underlying event URL is withheld because the surviving page includes an address. Public-safe metadata is preserved in the aggregate manifest.",
    protectedLocatorId: "LOC-FACEBOOK-SUNDAY-DINNER-200-2016",
    supportsGenerally: [
      "the event's self-described 200th-gathering milestone",
      "June 26, 2016 date",
      "Julia Fredenburg and Jamie Burkart organizer display",
      "a mutable 22-people-responded interface label"
    ],
    doesNotEstablish: [
      "an independently audited gathering total",
      "physical attendance",
      "the complete Sunday Dinner stewardship history"
    ]
  },
  {
    id: "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
    title: "Release Yourself onto the Water Until it Tastes of Salt Facebook event record",
    author: "Jamie Burkart",
    kind: "institutional-social-post",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2007-07-14",
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, public Facebook event record for 'Release Yourself onto the Water Until it Tastes of Salt,' July 14, 2007.",
    publicNote:
      "The underlying event URL is withheld because the surviving page includes an address. Public-safe metadata is preserved in the aggregate manifest.",
    protectedLocatorId: "LOC-FACEBOOK-WATER-PROJECT-EVENT-2007",
    supportsGenerally: [
      "Jamie Burkart organizer display",
      "a found-material raft with bicycle-powered propulsion",
      "a participatory public presentation of work in progress"
    ],
    doesNotEstablish: [
      "the raft's eventual route",
      "a completed Kansas City-to-Gulf voyage",
      "physical attendance or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-PROFILE-2026",
    title: "WOW List Facebook Page profile",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/wowlist/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List, Facebook Page profile describing the project as an event-sharing tool and community-building project and using the motto 'Being there changes everything,' accessed July 16, 2026.",
    publicNote:
      "This is the project's own public description, not an independent evaluation of adoption or impact.",
    supportsGenerally: [
      "WOW List's stated event-sharing and community-building purpose",
      "the motto 'Being there changes everything'"
    ],
    doesNotEstablish: [
      "adoption, reach, attendance, endorsement, or impact",
      "the complete project team",
      "Facebook event-history completeness"
    ]
  },
  {
    id: "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026",
    title: "Authenticated WOW List Facebook Past Events review",
    organization: "WOW List",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated review of the WOW List Facebook Page Past Events surface, July 16, 2026.",
    publicNote:
      "The capture-date Page context displayed 'No events to show.' This bounded negative result is not a claim that no WOW List event ever existed.",
    protectedLocatorId: "LOC-FACEBOOK-WOWLIST-PAST-EVENTS-2026",
    supportsGenerally: [
      "the capture-date empty Past Events display",
      "zero exact WOW List title and organizer matches in Jamie's current Past Events index"
    ],
    doesNotEstablish: [
      "that WOW List never hosted, cohosted, created, or circulated an event",
      "a native Page owner export",
      "the cause of missing historical event records"
    ]
  }
];

export const facebookEventArchiveClaimRecords20260716: ClaimRecord[] = [
  {
    id: "CLM-FACEBOOK-JAMIE-EVENT-INTERFACE-POPULATION-2026",
    project: "jamie-professional-history",
    internalClaim:
      "Two independent authenticated traversals of Jamie's capture-date Facebook Past Events interface recovered the same 511 occurrence rows across 502 canonical event pages.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The capture-date personal Past Events interface is fully reconciled as 511 occurrence rows across 502 canonical event pages.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
        relationship: "private-support",
        locator: "two independent traversals and sorted occurrence-key digest",
        supports: ["population counts", "matching independent traversals"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "direct-support",
        locator: "personalPastEvents population controls",
        supports: ["redacted population controls and digest"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is 100 percent capture-date index-population reconciliation, not a native Meta owner export or all-ever history.",
      "The full row-level personal timeline remains protected.",
      "A Past Events record does not establish attendance, participation, endorsement, or professional relevance."
    ],
    antiClaims: [
      "Jamie attended all 511 event occurrences.",
      "Facebook exposes every event Jamie ever encountered.",
      "The census is a native Meta owner export."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-JAMIE-OWNER-EXPORT-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FACEBOOK-JAMIE-ORGANIZER-DISPLAY-FLOOR-2026",
    project: "jamie-professional-history",
    internalClaim:
      "Twenty capture-date index cards explicitly displayed Jamie Burkart as event organizer across records dated 2006 through 2017.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty recovered cards explicitly display Jamie as event organizer across records dated 2006 through 2017.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
        relationship: "private-support",
        locator: "organizer-display aggregation",
        supports: ["20 Jamie Burkart organizer displays", "2006-2017 date span"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "direct-support",
        locator: "selectedOrganizerDisplayLeads",
        supports: ["redacted organizer-display count"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The display applies only to the named event records.",
      "It does not identify every collaborator, task, outcome, or event Jamie organized.",
      "The claim remains unsurfaced pending project-by-project decomposition."
    ],
    antiClaims: [
      "Jamie solely produced every event.",
      "The cards establish a complete event-production history.",
      "Organizer display proves attendance or impact."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FACEBOOK-PERSONAL-EVENT-STAKEHOLDER-LEADS-2026",
    project: "jamie-professional-history",
    internalClaim:
      "Selected organizer labels in Jamie's capture-date Past Events interface identify cultural-space, coalition, city-agency, public-official, housing-advocacy, and arts-organization research leads.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Selected public organization labels create a bounded queue for project-specific stakeholder research.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
        relationship: "private-support",
        locator: "selected public organizer-display aggregates",
        supports: ["organization labels and card counts"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "context",
        locator: "selectedOrganizerDisplayLeads",
        supports: ["public-safe source-lead categories"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A card in a personal Past Events interface is a source lead, not direct engagement evidence.",
      "No organizer label proves Jamie attended, collaborated, was endorsed, or caused an outcome.",
      "Each relationship requires event- and project-specific corroboration before public use."
    ],
    antiClaims: [
      "Every named organization engaged with or endorsed Jamie.",
      "The card counts measure stakeholder reach or impact.",
      "The surface proves continuing partnerships."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SUNDAY-DINNER-MILESTONES-2014-2016",
    project: "196-sunday-dinner",
    internalClaim:
      "Public Facebook event records identify a 100th Sunday Dinner on March 9, 2014 and a 200th on June 26, 2016; the latter displays Julia Fredenburg and Jamie Burkart as organizers.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Public event records document Sunday Dinner's 100th gathering in March 2014 and its 200th in June 2016; the 200th listing names Julia Fredenburg and Jamie Burkart as organizers.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
        relationship: "private-support",
        locator: "event title, date, and organizer display",
        supports: ["100th-event wording", "March 9, 2014", "Jamie organizer display"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
        relationship: "private-support",
        locator: "event title, date, and detail organizer display",
        supports: [
          "200th-event wording",
          "June 26, 2016",
          "Julia Fredenburg and Jamie Burkart organizer display"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "direct-support",
        locator: "selectedEventSummaries Sunday Dinner records",
        supports: ["public-safe milestone dates, titles, and organizer displays"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The ordinal milestones come from the events' own titles, not an independent audit.",
      "The organizer display is event-specific and does not identify every contributor or steward.",
      "Historic addresses and mutable response labels remain outside the public projection."
    ],
    antiClaims: [
      "An independent audit verified every Sunday Dinner gathering.",
      "Jamie solely created or produced all 200 gatherings.",
      "Facebook responses prove physical attendance."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SUNDAY-DINNER-FACEBOOK-RESPONSE-LABELS-2026",
    project: "196-sunday-dinner",
    internalClaim:
      "The selected 100th and 200th Sunday Dinner pages displayed aggregate Facebook response labels, while the 200th page's subcounts did not reconcile to its aggregate label.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Selected Sunday Dinner pages retain mutable Facebook response labels with an internal display inconsistency.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
        relationship: "private-support",
        locator: "aggregate response display",
        supports: ["21-people-responded interface label"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
        relationship: "private-support",
        locator: "aggregate and component response displays",
        supports: ["22-people-responded label", "display inconsistency"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Response labels are mutable event-level interface signals.",
      "They are not attendance, unique people, reach, endorsement, mandate, or impact.",
      "The inconsistent detail display is a reason not to aggregate or headline these values."
    ],
    antiClaims: [
      "The response labels equal physical attendance.",
      "The two events reached 43 unique people.",
      "The labels measure Sunday Dinner's impact."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WATER-PARTICIPATORY-PROTOTYPE-2007",
    project: "water-participation",
    internalClaim:
      "A July 2007 public event record identifies Jamie as organizer of a participatory presentation around a found-material raft with bicycle-powered propulsion.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A 2007 event record documents Jamie organizing a participatory public presentation around a found-material raft with bicycle-powered propulsion.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
        relationship: "private-support",
        locator: "event title, organizer display, and public-safe description summary",
        supports: ["Jamie organizer display", "raft materials and propulsion concept"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "context",
        locator: "selectedEventSummaries water record",
        supports: ["public-safe date, title, role, and concept summary"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The event record documents the public presentation and concept, not the later voyage history.",
      "Route, completion, collaborators, and outcomes require separate sources.",
      "The page's historic address and response label remain outside public use."
    ],
    antiClaims: [
      "This source proves a completed Kansas City-to-Gulf voyage.",
      "Jamie completed the project alone.",
      "Facebook responses prove attendance or impact."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026",
    project: "wowlist",
    internalClaim:
      "WOW List's public Facebook Page describes the project as an event-sharing tool and community-building project and uses the motto 'Being there changes everything.'",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "WOW List described itself as an event-sharing tool and community-building project with the motto 'Being there changes everything.'",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-PROFILE-2026",
        relationship: "direct-support",
        locator: "public Page description",
        supports: ["project purpose", "project motto"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is the project's own mission language, not an independent evaluation.",
      "The description does not measure adoption, reach, attendance, endorsement, or impact."
    ],
    antiClaims: [
      "The profile description proves WOW List's impact.",
      "The Page identifies the complete project team.",
      "Current follower counts measure historical adoption."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-EVENTS-NOT-RECOVERED-2026",
    project: "wowlist",
    internalClaim:
      "No WOW List event record was recovered from the capture-date Facebook Page Past Events surface or by exact WOW List title and organizer matching in Jamie's current Past Events index.",
    status: "not-recovered",
    projections: [
      {
        key: "archive-note",
        text:
          "No WOW List Facebook event record was recovered in the July 2026 interface pass.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026",
        relationship: "private-support",
        locator: "capture-date Page-context display and exact-match reconciliation",
        supports: ["bounded negative search finding"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
        relationship: "supports-boundary",
        locator: "wowListPastEvents",
        supports: ["public-safe finding and limitation"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The result is bounded to the capture-date surfaces and exact matching method.",
      "An empty current surface does not establish historical nonexistence.",
      "A Page owner export, direct event links, or archived Page captures may recover more."
    ],
    antiClaims: [
      "WOW List never created or hosted a Facebook event.",
      "No WOW List event ever existed.",
      "The current Page is a complete owner export."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const facebookEventArchiveResearchInquiries20260716: ResearchInquiry[] = [
  {
    id: "INQ-FACEBOOK-JAMIE-OWNER-EXPORT-2026",
    project: "jamie-professional-history",
    question:
      "What would a native Meta account-owner export add to the capture-date 511-row Past Events interface population?",
    methods: [
      "Traversed the authenticated Past Events interface twice to a stable terminal population.",
      "Compared sorted occurrence-key digests across independent reloads.",
      "Preserved only aggregate controls and selected public-safe records in the repository."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Both traversals recovered 511 occurrence rows across 502 canonical event pages.",
      "The two sorted occurrence-key digests matched.",
      "Eighteen repeated terminal observations in each run produced no additional canonical event page."
    ],
    limitations: [
      "The interface is not a native owner export or deletion history.",
      "Events deleted, withheld, private, or unindexed before capture may be absent.",
      "The row-level personal timeline remains protected."
    ],
    sourceIds: [
      "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    publicSummary:
      "The capture-date interface population is fully reconciled; all-ever completeness remains open pending an account-owner export.",
    protectedLocatorId: "LOC-FACEBOOK-JAMIE-PAST-EVENTS-2026"
  },
  {
    id: "INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026",
    project: "jamie-professional-history",
    question:
      "Which mission-relevant event records should receive source-specific close reading for roles, collaborators, posted URLs, artifacts, and outcomes?",
    methods: [
      "Classified capture-date index metadata into public-safe organizer-display leads.",
      "Close-read three role-bearing event pages selected for Sunday Dinner and water-practice relevance.",
      "Separated event-page metadata from independent corroboration and public editorial selection."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The index yielded selected coalition, cultural-space, agency, public-official, housing, and arts-organization research leads.",
      "The selected detail pass matured two Sunday Dinner milestones and one 2007 participatory water-project record.",
      "The current index cards did not expose event-body outbound links."
    ],
    limitations: [
      "A personal Past Events card does not prove attendance, participation, collaboration, endorsement, or impact.",
      "This pass does not claim complete event-body or outbound-URL recovery across all 511 occurrence rows.",
      "Historic addresses, raw descriptions, identities, and response details remain protected or minimized."
    ],
    sourceIds: [
      "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
      "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    publicSummary:
      "Three role-bearing events are decomposed; the remaining index population is a governed research queue, not silently discarded or prematurely published.",
    protectedLocatorId: "LOC-FACEBOOK-JAMIE-PAST-EVENTS-2026"
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026",
    project: "wowlist",
    question:
      "Can a Page owner export, direct event links, archive captures, collaborator records, or personal-account traces recover historical WOW List Facebook events?",
    methods: [
      "Reviewed the authenticated WOW List Page Past Events surface in Page context.",
      "Searched Jamie's fully reconciled current Past Events index for exact WOW List title and organizer matches.",
      "Kept the empty current surface distinct from historical nonexistence."
    ],
    runAt: reviewedAt,
    resultStatus: "not-recovered",
    findings: [
      "The Page-context Past Events surface displayed 'No events to show.'",
      "No exact WOW List title or organizer match appeared in Jamie's current Past Events index.",
      "The current WOW List Page still preserves the project's public mission description and motto."
    ],
    limitations: [
      "The Page surface is not a native owner export.",
      "The result does not prove that no WOW List Facebook event ever existed.",
      "Page migration, deletion, privacy settings, or current interface behavior may hide historical records."
    ],
    sourceIds: [
      "SRC-FACEBOOK-WOWLIST-PROFILE-2026",
      "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026",
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    publicSummary:
      "No WOW List event was recovered in the current interface pass; historical event existence remains open.",
    protectedLocatorId: "LOC-FACEBOOK-WOWLIST-PAST-EVENTS-2026"
  }
];

export const facebookEventArchiveIntakeRecords20260716: IntakeRecord[] = [
  {
    id: "INTAKE-FACEBOOK-JAMIE-EVENTS-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "Jamie Burkart Facebook Past Events full capture-date population",
    publicSafeSummary:
      "Two independent traversals reconciled every record exposed by Jamie's current Past Events index while publishing only aggregate controls and selected mission-relevant event metadata.",
    whyItMatters:
      "The population creates a deep, governed research queue for project chronology, roles, collaborators, public sources, and event practice without publishing a reconstructable personal timeline.",
    projectHints: [
      "jamie-professional-history",
      "196-sunday-dinner",
      "water-participation"
    ],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [
      "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
      "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    claimIds: [
      "CLM-FACEBOOK-JAMIE-EVENT-INTERFACE-POPULATION-2026",
      "CLM-FACEBOOK-JAMIE-ORGANIZER-DISPLAY-FLOOR-2026",
      "CLM-FACEBOOK-PERSONAL-EVENT-STAKEHOLDER-LEADS-2026",
      "CLM-SUNDAY-DINNER-FACEBOOK-RESPONSE-LABELS-2026",
      "CLM-WATER-PARTICIPATORY-PROTOTYPE-2007"
    ],
    inquiryIds: [
      "INQ-FACEBOOK-JAMIE-OWNER-EXPORT-2026",
      "INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"
    ],
    limitations: [
      "Treat this as 100 percent capture-date index-population reconciliation, not a native owner export or all-ever history.",
      "Do not infer attendance, collaboration, endorsement, partnership, reach, or impact from Past Events membership or organizer labels.",
      "Do not publish raw rows, addresses, identities, descriptions, comments, analytics, credentials, or authenticated state.",
      "Body-level posted-URL recovery remains incomplete and explicit."
    ],
    nextActions: [
      "Reconcile a native account-owner export if Jamie authorizes and Meta makes one available.",
      "Close-read additional mission-relevant event details only against a specific claim or inquiry.",
      "Invite collaborators to correct role and stewardship records before strengthening individual credit."
    ]
  },
  {
    id: "INTAKE-FACEBOOK-SUNDAY-DINNER-MILESTONES-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "artifact-lead",
    title: "Sunday Dinner 100th and 200th Facebook event milestones",
    publicSafeSummary:
      "Redacted event metadata documents Sunday Dinner's self-described 100th gathering in 2014 and 200th in 2016, with Julia Fredenburg and Jamie Burkart displayed as organizers of the latter.",
    whyItMatters:
      "The two plot points make long-term continuity and collective stewardship visible without publishing historic addresses or unstable response counts.",
    projectHints: ["196-sunday-dinner"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"],
    claimIds: ["CLM-SUNDAY-DINNER-MILESTONES-2014-2016"],
    inquiryIds: ["INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026"],
    limitations: [
      "The ordinal milestones come from event titles rather than an independent audit.",
      "The organizer display is event-specific and does not assign sole credit or identify every steward.",
      "Historic addresses, raw descriptions, and response labels remain outside the projection."
    ],
    nextActions: [
      "Invite collaborator correction of the event-specific stewardship wording.",
      "Keep the public sentence focused on continuity and shared organization."
    ]
  },
  {
    id: "INTAKE-FACEBOOK-WOWLIST-EVENTS-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "research-lead",
    title: "WOW List Facebook Page Events population and mission record",
    publicSafeSummary:
      "The capture-date WOW List Page Past Events surface displayed no events, while the public profile preserved the project's event-sharing purpose and 'Being there changes everything' motto.",
    whyItMatters:
      "The result preserves both what survived and what did not materialize, without turning a current empty interface into a false historical nonexistence claim.",
    projectHints: ["wowlist"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [
      "SRC-FACEBOOK-WOWLIST-PROFILE-2026",
      "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026",
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    claimIds: [
      "CLM-WOWLIST-FACEBOOK-EVENTS-NOT-RECOVERED-2026"
    ],
    inquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026"],
    limitations: [
      "The current empty Page surface does not prove that no WOW List Facebook event ever existed.",
      "The public profile is first-party mission language, not independent evidence of adoption or impact.",
      "No manager-only publication attribution, credentials, session state, or private account data is retained."
    ],
    nextActions: [
      "Search a Page owner export, direct event links, archives, and collaborator records for historical WOW List events.",
      "Keep mission language selected while the event-history finding remains held and bounded."
    ]
  },
  {
    id: "INTAKE-FACEBOOK-WOWLIST-MISSION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "public-url",
    title: "WOW List Facebook mission language",
    publicSafeSummary:
      "The public WOW List profile describes the project as an event-sharing tool and community-building project with the motto 'Being there changes everything.'",
    whyItMatters:
      "The compact first-party language explains the human purpose of the product without substituting follower counts or an impact claim.",
    projectHints: ["wowlist"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://www.facebook.com/wowlist/",
    sourceIds: ["SRC-FACEBOOK-WOWLIST-PROFILE-2026"],
    claimIds: ["CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026"],
    inquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026"],
    limitations: [
      "This is first-party mission language, not an independent evaluation of adoption or impact.",
      "The Page does not identify the complete WOW List team."
    ],
    nextActions: [
      "Retain the mission sentence as a concise purpose statement.",
      "Keep event-history recovery and impact evidence as separate inquiries."
    ]
  }
];
