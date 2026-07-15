import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const personalWowListFacebookEventsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-PERSONAL-WOWLIST-FACEBOOK-EVENTS-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated Jamie Burkart personal and WOW List Facebook event-surface review",
      publicSafeSummary:
        "A public-safe census of every event slot currently exposed by Jamie Burkart's personal hosted-events control and every event currently exposed by the WOW List Page surfaces.",
      projects: [
        "participatory-programs",
        "sunday-dinner",
        "wowlist",
        "waterway-participation",
        "nter-chng"
      ],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      claimIds: [
        "CLM-PERSONAL-FACEBOOK-EVENT-POPULATION",
        "CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE",
        "CLM-PERSONAL-FACEBOOK-RESPONSE-SIGNALS",
        "CLM-WOWLIST-FACEBOOK-EVENT-SURFACE",
        "CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES",
        "CLM-WATER-FACEBOOK-PLANNING-SENDOFF",
        "CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE"
      ],
      researchTaskIds: [
        "TASK-PERSONAL-FACEBOOK-EVENT-OWNER-EXPORT",
        "TASK-SUNDAY-DINNER-MILESTONE-RECONCILIATION",
        "TASK-PERSONAL-FACEBOOK-EVENT-ROLE-ATTENDANCE"
      ],
      notes: [
        "All 21 displayed personal hosted-event slots have a disposition: 20 public-safe event records and one identity-free private-event-withheld record.",
        "The authenticated WOW List Page review currently exposed zero Page events; this does not establish that no historical Page event ever existed.",
        "The 100% result is current control accounting, not a native Meta owner export or proof that every historical event remains visible.",
        "Private-event identity, residential addresses, phone numbers, guest identities, comments, raw bodies, and authenticated-session state remain outside the repository."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
      title: "Jamie Burkart Facebook hosted Past Events surface",
      author: "Jamie Burkart",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Jamie Burkart, Facebook hosted Past Events surface, authenticated review July 15, 2026.",
      publicNote:
        "Repeated terminal scrolling exposed 21 hosted-event slots. Public event detail pages independently displayed a 21-past-events host count.",
      supportsGenerally: [
        "21 currently exposed hosted-event slots",
        "20 public event identities and one private-event disposition",
        "public chronology from December 2006 through February 2019"
      ],
      doesNotEstablish: [
        "a complete native Meta owner export",
        "events deleted or made unavailable before capture",
        "individual authorship of every planning or production task",
        "attendance, unique people, reach, endorsement, or impact"
      ],
      protectedLocatorId: "LOC-JAMIE-FACEBOOK-HOSTED-EVENT-SURFACE-2026"
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
      title: "WOW List Facebook Page event surfaces",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/events",
      preferredPublicUrl: "canonical",
      publicCitation:
        "WOW List, Facebook Page event surfaces, authenticated review July 15, 2026.",
      publicNote:
        "The Page events view displayed 'No events to show,' and the Page-hosted Past control displayed its empty state during the authenticated review.",
      supportsGenerally: ["zero event records currently exposed by the reviewed WOW List Page surfaces"],
      doesNotEstablish: [
        "that WOW List never held or promoted events",
        "that no historical Page event was deleted or made unavailable",
        "the event population of Jamie's personal account",
        "a native Meta owner export"
      ]
    },
    {
      id: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      title: "Jamie Burkart personal and WOW List Facebook event public-safe census",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex authenticated archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      assetUrl:
        "https://github.com/openhouse/jamieburk.art/blob/feature/evals-I/docs/knowledge-bank/corpora/jamie-wowlist-facebook-events-full-population-2026-07-15.json",
      preferredPublicUrl: "asset",
      publicCitation:
        "Public-safe census of Jamie Burkart's personal hosted Facebook events and the WOW List Page event surfaces exposed July 15, 2026.",
      publicNote:
        "The metadata-only corpus accounts for all 21 displayed personal hosted-event slots and the currently empty WOW List Page surfaces while withholding private and personal data.",
      supportsGenerally: [
        "20 public-safe event records plus one private-withheld disposition",
        "public event chronology from 2006 through 2019",
        "19 materialized historical response labels",
        "16 posted public resource routes",
        "project-level traces for Sunday Dinner, WOW List, waterway participation, and NTER CHNG"
      ],
      doesNotEstablish: [
        "a complete historical Facebook archive",
        "the identity of the private event",
        "individual authorship or sole production",
        "attendance, unique people, reach, endorsement, or impact"
      ]
    },
    {
      id: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      title: "Authenticated personal and WOW List Facebook event research captures",
      author: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Authenticated archival-production review of Jamie Burkart's personal and WOW List Facebook event surfaces, July 15, 2026.",
      publicNote:
        "Protected captures retain traversal and detail-page provenance. Raw descriptions, private-event identity, residential addresses, phone numbers, guest identities, comments, and authenticated state are not published.",
      protectedLocatorId: "LOC-PERSONAL-WOWLIST-FACEBOOK-EVENT-RESEARCH-2026",
      supportsGenerally: [
        "terminal-scroll reconciliation",
        "event-detail review",
        "current WOW List Page empty-state review",
        "privacy and source-route review"
      ],
      doesNotEstablish: [
        "permission to publish protected capture data",
        "a complete native owner export",
        "physical attendance",
        "individual event authorship or policy impact"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-JAMIE-FACEBOOK-HOSTED-SURFACE-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
      project: "participatory-programs",
      assertion:
        "Repeated authenticated traversal exposed 21 personal hosted-event slots, and a public event host panel independently displayed a 21-past-events count.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-PERSONAL-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-PERSONAL-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "participatory-programs",
      assertion:
        "Every one of 21 currently displayed personal hosted-event slots has a public-safe disposition: 20 public event records and one identity-free private-event-withheld record.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-PERSONAL-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-PERSONAL-FACEBOOK-EVENT-PRACTICE-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "participatory-programs",
      assertion:
        "The 20 public records span December 2006 through February 2019 and include participatory technology, waterways, shared meals, music, collective performance, mutual care, civic reflection, and venue safety.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-PERSONAL-FACEBOOK-RESPONSE-SIGNALS-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "participatory-programs",
      assertion:
        "Nineteen public event details display nonzero historical response labels; 13 display at least 10, eight at least 20, and three at least 100.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-PERSONAL-FACEBOOK-RESPONSE-SIGNALS"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
      project: "wowlist",
      assertion:
        "The reviewed WOW List Page currently exposes zero Page event records on both its events view and Page-hosted Past control.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-FACEBOOK-EVENT-SURFACE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-SUNDAY-DINNER-FACEBOOK-MILESTONES-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "sunday-dinner",
      assertion:
        "Public Facebook event titles identify a March 9, 2014 hundredth Sunday Dinner and a June 26, 2016 two-hundredth Sunday Dinner; the latter routes to a WOW List event page.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-SUNDAY-DINNER-MILESTONE-CONFLICT-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "sunday-dinner",
      assertion:
        "The 2014 hundredth-event title and 2016 two-hundredth-event title conflict with a separate 2016 archive label previously read as 'Sunday Dinner 100'; the discrepancy requires reconciliation before milestone dates are projected publicly.",
      relationship: "raises-question",
      confidence: "high",
      candidateClaimIds: [
        "CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES",
        "CLM-SUNDAY-DINNER-100TH-PUBLIC-TRACE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WATER-FACEBOOK-PLANNING-SENDOFF-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "waterway-participation",
      assertion:
        "Public event records preserve a July 9, 2007 raft-design discussion and a July 14, 2007 public sendoff for the found-material raft journey.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WATER-FACEBOOK-PLANNING-SENDOFF",
        "CLM-WATER-RAFT-CONCEPT"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-FACEBOOK-EVENT-TRACE-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "nter-chng",
      assertion:
        "The January 8, 2010 NTER CHNG Facebook event identifies Drew Bolton, Jamie Burkart, and Garrett Fuselier together and describes the project as a public interactive texting installation.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE",
        "CLM-NTER-CHNG-CO-CREATION"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-PERSONAL-FACEBOOK-POSTED-RESOURCES-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
      project: "participatory-programs",
      assertion:
        "The public event descriptions contain 16 distinct public routes to project, artist, music, video, community, and conceptual resources; no independent news article was recovered from this population.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-PERSONAL-WOWLIST-FACEBOOK-PROTECTED-RUN-2026",
      sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      project: "participatory-programs",
      assertion:
        "Protected research captures preserve terminal-scroll reconciliation, detail-page review, the WOW List Page empty-state review, and the privacy disposition without publishing raw or authenticated data.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [
        "CLM-PERSONAL-FACEBOOK-EVENT-POPULATION",
        "CLM-WOWLIST-FACEBOOK-EVENT-SURFACE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-PERSONAL-FACEBOOK-EVENT-POPULATION",
      project: "participatory-programs",
      internalClaim:
        "Facebook currently exposes 21 past hosted-event slots for Jamie Burkart: 20 public event identities were reviewed and one private event is retained only as an identity-free withheld disposition.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "All 21 currently displayed personal hosted-event slots have a disposition: 20 public-safe event records and one private event withheld without identity.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/personal-facebook-events"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
          relationship: "corroborating",
          supports: ["21 displayed hosted-event slots", "public chronology"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["20 public records", "one private-withheld disposition"],
          locator: "populationBoundary, surfaces.personalHostedPast, events",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026",
          relationship: "private-support",
          supports: ["terminal-scroll reconciliation", "privacy review"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is complete current control accounting, not a complete historical archive or native Meta owner export.",
        "The private event receives no title, date, URL, event ID, names, response data, or venue.",
        "Unavailable or deleted events outside the current interface are not inferred."
      ],
      antiClaims: [
        "Facebook preserves Jamie's complete event history.",
        "The private event can be identified from the public repository.",
        "Jamie solely produced every listed event."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-POPULATION-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE",
      project: "participatory-programs",
      internalClaim:
        "The surviving public hosted-event record shows Jamie repeatedly creating or co-creating public interfaces for gathering from 2006 through 2019 across participatory technology and art, river work, shared meals, music, collective performance, mutual care, civic reflection, and venue safety.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "From 2006 through 2019, the surviving event record shows Jamie repeatedly creating or co-creating structures for gathering across participatory art and technology, waterways, shared meals, music, mutual care, civic reflection, and venue safety.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/personal-facebook-events"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["2006-2019 chronology", "event topics and public summaries"],
          locator: "events[].date, events[].topics, events[].publicSafeSummary",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Event host and organizer displays do not assign every planning, production, technical, or facilitation task.",
        "Credit named collaborators and hosts where the public record identifies them.",
        "A public event page does not establish attendance, quality, impact, or Jamie's sole authorship."
      ],
      antiClaims: [
        "Jamie solely created or produced every event.",
        "Every event was part of one continuous formal program.",
        "Facebook responses prove community impact."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-PERSONAL-FACEBOOK-RESPONSE-SIGNALS",
      project: "participatory-programs",
      internalClaim:
        "Nineteen reviewed public event details display nonzero historical Facebook response labels; 13 display at least 10, eight at least 20, and three at least 100.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Nineteen reviewed event details display nonzero Facebook response labels; 13 show at least 10, eight at least 20, and three at least 100. These are platform labels, not attendance.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/personal-facebook-events"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["response-label threshold arithmetic"],
          locator: "responseDisplayAnalysis and events[].responseSnapshot",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Response labels are not physical attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
        "Index cards and detail pages conflict for several events; both observations are preserved without harmonizing them.",
        "Do not sum event-level values into a people-reached claim."
      ],
      antiClaims: [
        "Facebook responses equal attendance.",
        "The thresholds measure unique people.",
        "The response labels prove impact or endorsement."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-EVENT-SURFACE",
      project: "wowlist",
      internalClaim:
        "The WOW List Facebook Page currently exposes no Page-owned or Page-hosted event records on the two reviewed event surfaces, while Jamie's personal event record separately preserves a 200th Sunday Dinner event linking to WOW List.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The current WOW List Facebook Page exposes no event records. A separate personal-account event for the 200th Sunday Dinner links to WOW List, showing why Page and personal event infrastructure must remain distinct.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
          relationship: "direct-support",
          supports: ["current empty Page event surfaces"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "corroborating",
          supports: ["personal-account 200th Sunday Dinner event with WOW List route"],
          locator: "event 551536301637994",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Current zero is a dated interface observation, not evidence that WOW List never held, promoted, or supported events.",
        "The personal account and WOW List Page are distinct publication surfaces."
      ],
      antiClaims: [
        "WOW List never had events.",
        "All personal hosted events were WOW List events.",
        "The current Page is a complete historical owner archive."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-POPULATION-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES",
      project: "sunday-dinner",
      internalClaim:
        "Public Facebook event titles identify the hundredth Sunday Dinner on March 9, 2014 and the two-hundredth on June 26, 2016, but a separate 2016 archive label conflicts with that chronology and must be reconciled before milestone dates are projected.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Facebook event titles preserve a hundredth Sunday Dinner in March 2014 and a two-hundredth in June 2016. A conflicting 2016 archive label remains under review.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/sunday-dinner"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["2014 hundredth title", "2016 two-hundredth title", "WOW List route"],
          locator: "events 702417306475691 and 551536301637994",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016",
          relationship: "contradicts",
          supports: ["a separate March 2016 archive label read as Sunday Dinner 100"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Preserve the source conflict rather than silently choosing one chronology.",
        "Event-number titles do not establish attendance, unique participants, or the later 300-plus total.",
        "Sunday Dinner was collective and participant-made."
      ],
      antiClaims: [
        "The hundredth milestone is resolved beyond dispute.",
        "The two event titles independently prove every prior gathering.",
        "Jamie alone created every Sunday Dinner."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-WATER-FACEBOOK-PLANNING-SENDOFF",
      project: "waterway-participation",
      internalClaim:
        "Two public Facebook event records preserve a July 9, 2007 raft-design discussion and a July 14 public sendoff for the found-material river raft.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Public event records preserve a July 9, 2007 raft-design discussion and a July 14 public sendoff for the found-material river raft.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/waterway-participation"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["dated planning event", "dated public sendoff"],
          locator: "events 10152721710031750 and 10153218027900549",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The events corroborate planning and a public sendoff, not the completed route.",
        "The expedition was collective work; event hosting does not assign every construction or journey role."
      ],
      antiClaims: [
        "The Facebook events prove that the raft reached the Gulf of Mexico.",
        "Jamie alone built or completed the expedition."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE",
      project: "nter-chng",
      internalClaim:
        "A January 8, 2010 public Facebook event corroborates NTER CHNG as a public interactive texting installation and identifies Drew Bolton, Jamie Burkart, and Garrett Fuselier together.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A January 8, 2010 Facebook event corroborates NTER CHNG as a public interactive texting installation and identifies Drew Bolton, Jamie Burkart, and Garrett Fuselier together.",
          status: "hold",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nter-chng"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["public event date", "three named collaborators", "interactive texting format"],
          locator: "event 10153298280050561",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The event record does not assign software, fabrication, spatial-design, motion-graphics, or production responsibilities among collaborators.",
        "The displayed response label is not attendance or impact."
      ],
      antiClaims: [
        "Jamie created NTER CHNG alone.",
        "The event record establishes each collaborator's exact role.",
        "The Facebook response label proves attendance."
      ],
      researchInquiryIds: ["INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-PERSONAL-FACEBOOK-EVENT-OWNER-EXPORT",
      project: "participatory-programs",
      question:
        "Can a native Meta owner export recover events no longer exposed by the current hosted-events surface while preserving private and participant data?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Request or generate a native Meta owner export",
        "Reconcile owner-export and live-interface denominators by stable event ID",
        "Keep private events identity-free in public artifacts unless separately approved",
        "Keep attendee, contact, message, comment, and authentication data outside the public repository"
      ],
      successCriteria: [
        "Document the owner-export denominator and missingness",
        "Assign every discovered event a public-safe disposition",
        "Publish no private-event identity or personal data"
      ],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026"
      ],
      claimIds: [
        "CLM-PERSONAL-FACEBOOK-EVENT-POPULATION",
        "CLM-WOWLIST-FACEBOOK-EVENT-SURFACE"
      ],
      publicSummary:
        "Use a native owner export to test what the current interface omits without publishing private-event or participant data.",
      reviewedAt
    },
    {
      id: "TASK-SUNDAY-DINNER-MILESTONE-RECONCILIATION",
      project: "sunday-dinner",
      question:
        "Why does a 2016 archive label read 'Sunday Dinner 100' when Facebook event titles identify the hundredth dinner in 2014 and the two-hundredth in 2016?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Inspect the underlying 2016 archive context and post sequence",
        "Recover WOW List, Sunday Dinner, calendar, photograph, and collaborator records around both milestones",
        "Test whether the label describes an event number, post title, series, repost, or archive-order artifact",
        "Ask collaborators to corroborate or correct the chronology"
      ],
      successCriteria: [
        "Explain or preserve the source conflict without inference",
        "Separate event numbering from attendance and participant totals",
        "Correct or retire any misleading projection"
      ],
      sourceIds: [
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-TEAMS-SUNDAY-DINNER-ARCHIVE-2016"
      ],
      claimIds: [
        "CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES",
        "CLM-SUNDAY-DINNER-100TH-PUBLIC-TRACE"
      ],
      publicSummary:
        "Reconcile the 2014 hundredth-event and 2016 two-hundredth-event titles with a conflicting 2016 archive label before projecting milestone dates.",
      reviewedAt
    },
    {
      id: "TASK-PERSONAL-FACEBOOK-EVENT-ROLE-ATTENDANCE",
      project: "participatory-programs",
      question:
        "Which project records and collaborator accounts can further specify Jamie's event-level responsibilities and independently reported attendance?",
      priority: "medium",
      status: "in-progress",
      methodsPlanned: [
        "Crosswalk programs, calendars, task artifacts, photographs, press, and collaborator accounts",
        "Distinguish host display, invitation authorship, production, facilitation, technical work, and participation",
        "Use independent reporting rather than Facebook response labels for physical attendance",
        "Preserve collaborator, venue, artist, and participant credit"
      ],
      successCriteria: [
        "Establish event-level responsibilities with dated evidence",
        "Record independently reported attendance only with a direct source",
        "Keep platform responses distinct from attendance and impact"
      ],
      sourceIds: ["SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026"],
      claimIds: [
        "CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE",
        "CLM-PERSONAL-FACEBOOK-RESPONSE-SIGNALS",
        "CLM-WATER-FACEBOOK-PLANNING-SENDOFF",
        "CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE"
      ],
      publicSummary:
        "Deepen event-level role and attendance evidence without converting host labels or response counts into sole credit or impact.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: "INQ-PERSONAL-FACEBOOK-EVENT-POPULATION-2026",
      project: "participatory-programs",
      question:
        "What is the full population currently exposed by Jamie Burkart's personal hosted-events control and the WOW List Page event surfaces?",
      methods: [
        "Used authenticated task tabs without publishing account or session data.",
        "Scrolled the personal Past control until eight consecutive rounds produced no new event slots.",
        "Repeated the personal traversal and reconciled the same 21 displayed slots.",
        "Reviewed all 20 public event identities and retained one private event only as an identity-free withheld disposition.",
        "Reviewed both the WOW List Page events view and Page-hosted Past control."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The personal control exposed 21 slots: 20 public event identities and one private event.",
        "Nineteen public detail pages materialized and one remained unavailable.",
        "The public records span December 2006 through February 2019.",
        "Both reviewed WOW List Page surfaces currently exposed zero event records.",
        "Every currently displayed slot has a public-safe disposition."
      ],
      limitations: [
        "The review is not a native Meta owner export.",
        "Deleted, removed, or otherwise unavailable historical events may not appear.",
        "Current WOW List Page zero does not establish historical absence.",
        "Private and personal data remain intentionally unrecovered in the public corpus."
      ],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      publicSummary:
        "All 21 personal hosted-event slots currently exposed by Facebook have a disposition, and the reviewed WOW List Page surfaces currently expose zero records; neither result is a native historical owner archive.",
      protectedLocatorId: "RESEARCH-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026-001"
    },
    {
      id: "INQ-PERSONAL-FACEBOOK-EVENT-ROLE-2026",
      project: "participatory-programs",
      question:
        "What project, source-route, response, and stakeholder patterns are visible in the public-safe event population?",
      methods: [
        "Read every available public event detail and decomposed it into date, title, setting category, organizer display, summary, topics, response labels, and posted routes.",
        "Classified 16 distinct posted public URLs by resource type.",
        "Calculated response thresholds from materialized detail labels without summing them.",
        "Compared index-card and detail-page response states and preserved their conflicts.",
        "Reviewed organizer displays and descriptions for project and stakeholder relationships."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The public chronology spans participatory technology, waterways, shared meals, music, collective performance, mutual care, civic reflection, and venue safety.",
        "Nineteen event details display nonzero historical response labels; 13 are at least 10, eight at least 20, and three at least 100.",
        "Sixteen posted resources connect project, artist, music, video, community, and conceptual pages; no independent source article was recovered.",
        "Organizer displays identify collaborators on NTER CHNG, Sunday Dinner, venue safety, music, and participatory art records.",
        "No NYC Council-member engagement record was identified within the event-page metadata reviewed."
      ],
      limitations: [
        "Organizer displays do not assign complete task or authorship credit.",
        "Response labels are not attendance, unique people, reach, endorsement, or impact.",
        "The event descriptions are project-controlled or participant-generated surfaces, not independent reporting.",
        "Private-event and residential details are intentionally withheld."
      ],
      sourceIds: [
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      publicSummary:
        "The corpus preserves a long-running cross-project event practice, bounded response signals, collaborator relationships, and 16 public resource routes without turning platform metadata into attendance, sole credit, or impact.",
      protectedLocatorId: "RESEARCH-PERSONAL-WOWLIST-FACEBOOK-EVENTS-2026-002"
    }
  ],
  pages: []
};
