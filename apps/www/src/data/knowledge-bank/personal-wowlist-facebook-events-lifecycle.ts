import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-15";
const personalTaskId = "TASK-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT";
const wowListTaskId = "TASK-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT";
const corroborationTaskId = "TASK-FACEBOOK-PERSONAL-EVENT-CORROBORATION";

const projectIds = [
  "PRJ-SUNDAY-DINNER-196",
  "PRJ-WOWLIST",
  "PRJ-WATERWAYS-PARTICIPATORY-ART",
  "PRJ-NYC-ARTIST-COALITION"
];

const entityIds = [
  "ENT-JAMIE-BURKART",
  "ENT-SUNDAY-DINNER",
  "ENT-JULIA-FREDENBERG",
  "ENT-WOWLIST"
];

export const personalWowListFacebookEventLifecycle = {
  leads: [
    {
      id: "LEAD-FACEBOOK-PERSONAL-EVENT-FULL-POPULATION",
      title: "Jamie Burkart personal Facebook Events population",
      kind: "document",
      capturedAt: reviewedAt,
      capturedBy: "Codex authenticated archival-production review",
      state: "extracted",
      visibility: "public-safe",
      publicSummary: "A public-safe census accounts for all 511 event-card instances exposed by Jamie's authenticated personal Events index while withholding private records and separating profile association from event roles.",
      publicUrl: "https://www.facebook.com/jburkart/events",
      projectAssociationStatus: "assigned",
      projectIds,
      entityIds,
      sourceIds: [
        "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
        "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
        "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-RUN-2026"
      ],
      candidateClaimIds: [
        "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
        "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE",
        "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES",
        "CND-FACEBOOK-WOWLIST-IN-PRACTICE",
        "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"
      ],
      researchTaskIds: [personalTaskId, corroborationTaskId],
      nextAction: "Reconcile a native Meta owner export and independent project records against the capture-date census without exposing private social data."
    },
    {
      id: "LEAD-FACEBOOK-WOWLIST-EVENT-CURRENT-SURFACE",
      title: "WOW List Facebook Page owner Events surface",
      kind: "document",
      capturedAt: reviewedAt,
      capturedBy: "Codex authenticated page-owner review",
      state: "extracted",
      visibility: "public-safe",
      publicSummary: "The current WOW List owner-visible Events surface displays no event cards; this dated current-state finding does not establish historical absence.",
      publicUrl: "https://www.facebook.com/wowlist/events",
      projectAssociationStatus: "assigned",
      projectIds: ["PRJ-WOWLIST"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-WOWLIST"],
      sourceIds: [
        "SRC-FACEBOOK-WOWLIST-EVENT-SURFACE-2026",
        "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026"
      ],
      candidateClaimIds: [
        "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
        "CND-FACEBOOK-WOWLIST-IN-PRACTICE"
      ],
      researchTaskIds: [wowListTaskId],
      nextAction: "Seek a native Page export or archived WOW List event index before making any lifetime-history claim."
    }
  ] satisfies KnowledgeLifecycle["leads"],

  observations: [
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-POPULATION-REPRODUCED",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Authenticated terminal scrolling exposed 511 personal-profile event-card instances representing 502 unique parent events; four recurring parent events account for 13 displayed instances. Ten consecutive terminal loads produced no new instance keys, and the normalized key set exactly matched the protected capture.",
      locator: "Fixture sections surfaces.personal and populationLedger; authenticated replay dated 2026-07-15",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["a complete native owner export", "a complete lifetime event history", "Jamie's relationship to every displayed event"],
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-DISPOSITIONS",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "The 511-row anonymous public ledger dispositions 398 public profile-association-only rows, 33 withheld private rows, 23 records represented in the NYC Artist Coalition census, 36 detail-recovery gaps, and 21 selected public Jamie-attributed records.",
      locator: "Fixture sections dispositionCounts and populationLedger",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["that held records are Jamie projects", "that a recovery gap means an event did not exist", "permission to publish private event content"],
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-ROLE-SUBSET",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Twenty-one selected public event pages spanning December 2006 through February 2019 explicitly display Jamie as organizer or co-organizer across participatory art, waterways, community meals, music networks, cultural-space safety, public discussion, and civic participation.",
      locator: "Fixture section selectedPublicEvents",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["sole authorship", "sole production", "attendance", "the complete inventory of Jamie's event work"],
      candidateClaimIds: ["CND-FACEBOOK-JAMIE-CONVENING-PRACTICE"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-SOURCE-ROUTES",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Recovered detail bodies contain 77 external-URL occurrences. The public fixture retains nine mission-relevant routes with relationship labels, including Talks Not Raids, Let NYC Dance, WOW List, River Marvel, Semantic Web and imagined-community references, a Kansas City DIY resource, and two profile-association-only research leads.",
      locator: "Fixture sections surfaces.personal.externalUrlOccurrences and missionRelevantSourceRoutes",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["agreement with every linked statement", "readership", "conversion", "Jamie's role in profile-association-only records"],
      candidateClaimIds: [
        "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
        "CND-FACEBOOK-WOWLIST-IN-PRACTICE"
      ],
      candidateRelationships: [
        {
          candidateClaimId: "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
          evidenceRole: "context",
          supports: "the bounded inventory of recovered external source routes",
          limitations: ["does not establish agreement, readership, conversion, or event role"]
        },
        {
          candidateClaimId: "CND-FACEBOOK-WOWLIST-IN-PRACTICE",
          evidenceRole: "corroborating",
          supports: "the direct WOW List route preserved in the selected event subset",
          limitations: ["one route is not a complete adoption or traffic census"]
        }
      ],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-SUNDAY-DINNER-100-MILESTONE",
      sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      projectIds: ["PRJ-SUNDAY-DINNER-196"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-SUNDAY-DINNER"],
      statement: "A public event page titles a March 2014 gathering as the 100th Sunday Dinner and displays Jamie as organizer.",
      locator: "Fixture section selectedPublicEvents and public event page at ordinal 497",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["an independent audit of 100 gatherings", "attendance", "continuous weekly frequency", "sole production by Jamie"],
      candidateClaimIds: ["CND-FACEBOOK-SUNDAY-DINNER-MILESTONES"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-SUNDAY-DINNER-200-WOWLIST-ROUTE",
      sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
      projectIds: ["PRJ-SUNDAY-DINNER-196", "PRJ-WOWLIST"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-JULIA-FREDENBERG", "ENT-SUNDAY-DINNER", "ENT-WOWLIST"],
      statement: "A public event page titles a June 2016 gathering as the 200th Sunday Dinner, displays Julia Fredenberg and Jamie as co-organizers, and links directly to a WOW List event route.",
      locator: "Fixture section selectedPublicEvents and public event page at ordinal 425",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["an independent audit of 200 gatherings", "attendance", "continuous weekly frequency", "sole production by Jamie", "platform-wide WOW List adoption"],
      candidateClaimIds: ["CND-FACEBOOK-SUNDAY-DINNER-MILESTONES", "CND-FACEBOOK-WOWLIST-IN-PRACTICE"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES",
          evidenceRole: "direct-support",
          supports: "the contemporaneous 200th milestone title and exact co-organizer display",
          limitations: ["does not independently audit the gathering count or establish attendance"]
        },
        {
          candidateClaimId: "CND-FACEBOOK-WOWLIST-IN-PRACTICE",
          evidenceRole: "direct-support",
          supports: "the direct route from the public invitation to a WOW List event page",
          limitations: ["does not identify who entered the record or establish broader adoption"]
        }
      ],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds: ["PRJ-WATERWAYS-PARTICIPATORY-ART"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-MISSOURI-RIVER"],
      statement: "Selected Jamie-attributed public pages preserve a 2006-2010 sequence of occasions around place, movement, technology, and distributed community: a Semantic Web music discussion, trolley-tunnel screening, scene-theory gathering, raft design meal, raft send-off, and silent group night walk.",
      locator: "Fixture section selectedPublicEvents, public event pages at ordinals 511 through 506",
      evidenceRole: "corroborating",
      certainty: "moderate",
      doesNotEstablish: ["attendance", "full project outcomes", "sole authorship", "implementation of a technology standard"],
      candidateClaimIds: ["CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE", "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
          evidenceRole: "corroborating",
          supports: "the bounded archival synthesis across the 2006-2010 invitation sequence",
          limitations: ["does not establish outcomes, attendance, or sole authorship"]
        },
        {
          candidateClaimId: "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE",
          evidenceRole: "context",
          supports: "the early end of the selected public organizer-attributed chronology",
          limitations: ["the synthesis does not allocate every production task"]
        }
      ],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-WOWLIST-CURRENT-ZERO",
      sourceId: "SRC-FACEBOOK-WOWLIST-EVENT-SURFACE-2026",
      projectIds: ["PRJ-WOWLIST"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-WOWLIST"],
      statement: "While acting as the WOW List Page owner, the alias and legacy-ID Events routes exposed zero cards and displayed 'No events to show.'",
      locator: "Fixture section surfaces.wowlist and dated authenticated owner-surface review",
      evidenceRole: "supports-boundary",
      certainty: "high",
      doesNotEstablish: ["that WOW List never created events", "that it never cohosted, shared, imported, or linked events", "a complete Page history"],
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-FACEBOOK-PERSONAL-EVENT-RESPONSE-BOUNDARY",
      sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Historical Facebook response labels are retained only on selected public Jamie-attributed records and are not summed or converted into people, attendance, reach, endorsement, conversion, mandate, or impact.",
      locator: "Fixture section selectedPublicEvents, historicalResponseDisplay and responseInterpretation metadata",
      evidenceRole: "supports-boundary",
      certainty: "high",
      doesNotEstablish: ["attendance", "unique people", "reach", "impact"],
      candidateClaimIds: ["CND-FACEBOOK-JAMIE-CONVENING-PRACTICE"],
      candidateRelationships: [],
      reviewedAt
    }
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
      projectIds,
      proposition: "The capture-date personal Facebook Events index is fully accounted for as 511 displayed instances representing 502 unique parent events, while the current WOW List Page owner Events surface exposes zero cards.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-FACEBOOK-PERSONAL-EVENT-POPULATION-REPRODUCED",
        "OBS-FACEBOOK-PERSONAL-EVENT-DISPOSITIONS",
        "OBS-FACEBOOK-PERSONAL-EVENT-SOURCE-ROUTES",
        "OBS-FACEBOOK-WOWLIST-CURRENT-ZERO"
      ],
      requiredEvidence: ["Stable terminal instance-key population", "Anonymous row-level disposition ledger", "Current Page-owner surface check", "Privacy and relationship boundaries"],
      boundaries: ["Complete means capture-date interface accounting, not a native export or lifetime history.", "Profile association does not establish an event role.", "Zero current WOW List cards does not establish historical absence."],
      antiClaims: ["Jamie organized 511 events", "Jamie attended 511 events", "WOW List never had Facebook events"],
      counterevidencePosture: "Reconcile native exports and archived indexes without erasing the dated interface result or exposing private records.",
      sourceIndependenceNote: "The authenticated interface establishes current exposed metadata, not individual role, attendance, or impact.",
      researchTaskIds: [personalTaskId, wowListTaskId, corroborationTaskId],
      promotionDecisionIds: ["DEC-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-PROMOTE"],
      targetCanonicalClaimId: "CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
      updatedAt: reviewedAt
    },
    {
      id: "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE",
      projectIds,
      proposition: "Twenty-one selected public event pages from 2006-2019 explicitly name Jamie as organizer or co-organizer across participatory art, waterways, meals, music networks, cultural-space safety, public discussion, and civic participation.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-FACEBOOK-PERSONAL-EVENT-ROLE-SUBSET",
        "OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
        "OBS-FACEBOOK-PERSONAL-EVENT-RESPONSE-BOUNDARY"
      ],
      requiredEvidence: ["Public detail-page organizer display", "Selected public chronology", "Collective-credit boundary"],
      boundaries: ["Use organizer or co-organizer attribution only.", "Do not infer Jamie's role from the other 490 records.", "Do not convert response labels into impact."],
      antiClaims: ["Jamie alone produced all 21 events", "Jamie organized every event on his profile", "The selected pages prove attendance"],
      counterevidencePosture: "Invite collaborators and independent records to refine role allocation event by event.",
      sourceIndependenceNote: "Facebook pages directly support bounded event-page attribution; independent sources remain necessary for outcomes.",
      researchTaskIds: [corroborationTaskId],
      promotionDecisionIds: ["DEC-FACEBOOK-JAMIE-CONVENING-PRACTICE-PROMOTE"],
      targetCanonicalClaimId: "CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE",
      updatedAt: reviewedAt
    },
    {
      id: "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES",
      projectIds: ["PRJ-SUNDAY-DINNER-196"],
      proposition: "Public Facebook event pages preserve contemporaneous 100th and 200th Sunday Dinner milestone titles in 2014 and 2016, with Jamie named on both and Julia Fredenberg co-credited on the 200th.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-FACEBOOK-SUNDAY-DINNER-100-MILESTONE",
        "OBS-FACEBOOK-SUNDAY-DINNER-200-WOWLIST-ROUTE"
      ],
      requiredEvidence: ["Public event pages", "Exact organizer displays", "Milestone-title boundary"],
      boundaries: ["Treat the titles as contemporaneous milestones, not an independent count audit.", "Preserve Julia Fredenberg's co-organizer credit."],
      antiClaims: ["Facebook independently audited 200 gatherings", "Jamie solely produced both milestones", "The pages prove the 300-plus aggregate"],
      counterevidencePosture: "Prefer independent records for a full gathering count while retaining the contemporaneous milestone pages.",
      sourceIndependenceNote: "The two event pages directly support their own titles and organizer displays, not every gathering in the sequence.",
      researchTaskIds: [wowListTaskId, corroborationTaskId],
      promotionDecisionIds: ["DEC-FACEBOOK-SUNDAY-DINNER-MILESTONES-PROMOTE"],
      targetCanonicalClaimId: "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES",
      updatedAt: reviewedAt
    },
    {
      id: "CND-FACEBOOK-WOWLIST-IN-PRACTICE",
      projectIds: ["PRJ-WOWLIST", "PRJ-SUNDAY-DINNER-196"],
      proposition: "The public 200th Sunday Dinner event page links directly to its WOW List event route, preserving one concrete bridge from a recurring gathering into the community-calendar platform.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-FACEBOOK-SUNDAY-DINNER-200-WOWLIST-ROUTE", "OBS-FACEBOOK-PERSONAL-EVENT-SOURCE-ROUTES"],
      requiredEvidence: ["Public Facebook event page", "Direct WOW List URL", "Adoption and authorship boundaries"],
      boundaries: ["This is one documented route, not a complete adoption or traffic census.", "The link does not identify who entered the WOW List record."],
      antiClaims: ["Every Sunday Dinner used WOW List", "The link proves platform-wide adoption", "Jamie alone created the event record"],
      counterevidencePosture: "Recover archived WOW List records and Page exports before extending beyond this one concrete route.",
      sourceIndependenceNote: "The source establishes a direct historical route but not platform use across all events or communities.",
      researchTaskIds: [wowListTaskId, corroborationTaskId],
      promotionDecisionIds: ["DEC-FACEBOOK-WOWLIST-IN-PRACTICE-PROMOTE"],
      targetCanonicalClaimId: "CLM-FACEBOOK-WOWLIST-IN-PRACTICE",
      updatedAt: reviewedAt
    },
    {
      id: "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
      projectIds: ["PRJ-WATERWAYS-PARTICIPATORY-ART"],
      proposition: "Selected public event pages preserve an early Jamie-attributed practice of composing participatory occasions around waterways, movement, site-specific media, technology standards, and distributed cultural scenes between 2006 and 2010.",
      maturity: "promoted",
      confidence: "moderate",
      observationIds: ["OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"],
      requiredEvidence: ["Public organizer-attributed invitations", "Cross-event chronology", "Independent corroboration plan"],
      boundaries: ["Present the throughline as an archival synthesis.", "Event pages do not establish attendance, full outcomes, or sole authorship."],
      antiClaims: ["Every invited event occurred exactly as described", "Jamie alone authored every project", "The pages prove attendance or impact"],
      counterevidencePosture: "Use project archives, reporting, and collaborator accounts to mature individual event claims.",
      sourceIndependenceNote: "The throughline synthesizes several direct invitations; outcome evidence remains project-specific and independent.",
      researchTaskIds: [corroborationTaskId],
      promotionDecisionIds: ["DEC-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE-PROMOTE"],
      targetCanonicalClaimId: "CLM-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    { id: "EVT-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-PROMOTED", candidateClaimId: "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "Stable terminal reproduction and full public-safe disposition accounting support the bounded capture-date claim.", decisionId: "DEC-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-PROMOTE" },
    { id: "EVT-FACEBOOK-JAMIE-CONVENING-PRACTICE-PROMOTED", candidateClaimId: "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "Twenty-one public detail pages provide explicit organizer or co-organizer attribution with collective-credit limits.", decisionId: "DEC-FACEBOOK-JAMIE-CONVENING-PRACTICE-PROMOTE" },
    { id: "EVT-FACEBOOK-SUNDAY-DINNER-MILESTONES-PROMOTED", candidateClaimId: "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The two public pages support bounded contemporaneous milestone wording and exact co-credit.", decisionId: "DEC-FACEBOOK-SUNDAY-DINNER-MILESTONES-PROMOTE" },
    { id: "EVT-FACEBOOK-WOWLIST-IN-PRACTICE-PROMOTED", candidateClaimId: "CND-FACEBOOK-WOWLIST-IN-PRACTICE", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The direct event link preserves one concrete and appropriately bounded product-use route.", decisionId: "DEC-FACEBOOK-WOWLIST-IN-PRACTICE-PROMOTE" },
    { id: "EVT-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE-PROMOTED", candidateClaimId: "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The organizer-attributed chronology supports a bounded archival synthesis while outcomes remain held for corroboration.", decisionId: "DEC-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE-PROMOTE" }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: personalTaskId,
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION"],
      question: "Can a native Meta owner export reconcile records absent from the current personal index and clarify recurrence metadata without publishing private social data?",
      status: "open",
      priority: "medium",
      methods: ["Compare an owner export with the normalized 511-key protected capture.", "Keep private records anonymous and outside the public repository."],
      sourceIds: ["SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026", "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026"],
      observationIds: ["OBS-FACEBOOK-PERSONAL-EVENT-POPULATION-REPRODUCED", "OBS-FACEBOOK-PERSONAL-EVENT-DISPOSITIONS"],
      findings: ["The current interface population is reproducible at 511 instances and 502 parent events."],
      limitations: ["No native owner export was available in this pass.", "The live surface cannot reveal removed records."],
      nextActions: ["Request or generate a Meta owner export when useful.", "Reconcile only public-safe metadata into the bank."],
      openedAt: reviewedAt
    },
    {
      id: wowListTaskId,
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION", "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES", "CND-FACEBOOK-WOWLIST-IN-PRACTICE"],
      question: "What native export or archived index can recover WOW List's historical Facebook event activity beyond the empty current owner surface?",
      status: "open",
      priority: "high",
      methods: ["Review a native Page export if available.", "Search archived Page event indexes and corroborating public event links."],
      sourceIds: ["SRC-FACEBOOK-WOWLIST-EVENT-SURFACE-2026", "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026", "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"],
      observationIds: ["OBS-FACEBOOK-WOWLIST-CURRENT-ZERO", "OBS-FACEBOOK-PERSONAL-EVENT-SOURCE-ROUTES", "OBS-FACEBOOK-SUNDAY-DINNER-200-WOWLIST-ROUTE"],
      findings: ["The current owner surface is empty.", "A public 2016 Sunday Dinner page preserves one direct WOW List event route."],
      limitations: ["Current emptiness cannot establish historical absence.", "No native Page export was available."],
      nextActions: ["Recover a native Page export or archived event index.", "Preserve current-state and historical-state findings separately."],
      openedAt: reviewedAt
    },
    {
      id: corroborationTaskId,
      candidateClaimIds: ["CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION", "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE", "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES", "CND-FACEBOOK-WOWLIST-IN-PRACTICE", "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"],
      question: "Which independent publications, project archives, and collaborator accounts can mature the 21 selected public event-page records into stronger role, method, attendance, and outcome claims?",
      status: "in-progress",
      priority: "medium",
      methods: ["Associate public event pages with existing knowledge-bank sources.", "Invite collaborator correction for event-level production roles.", "Keep source routes separate from endorsement or impact claims."],
      sourceIds: ["SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026", "SRC-FACEBOOK-SUNDAY-DINNER-100-2014", "SRC-FACEBOOK-SUNDAY-DINNER-200-2016", "SRC-FACEBOOK-RAFT-LAUNCH-2007", "SRC-FACEBOOK-MICROPOP-2007", "SRC-FACEBOOK-SEMANTIC-WEB-2006"],
      observationIds: ["OBS-FACEBOOK-PERSONAL-EVENT-ROLE-SUBSET", "OBS-FACEBOOK-PERSONAL-EVENT-SOURCE-ROUTES", "OBS-FACEBOOK-SUNDAY-DINNER-100-MILESTONE", "OBS-FACEBOOK-SUNDAY-DINNER-200-WOWLIST-ROUTE", "OBS-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"],
      findings: ["Twenty-one public pages support bounded organizer attribution.", "Nine mission-relevant source routes provide project-specific research leads."],
      limitations: ["Event pages do not establish attendance or outcomes.", "Organizer display does not allocate every production task."],
      nextActions: ["Corroborate the selected records project by project.", "Revise role allocation when collaborators or independent sources provide stronger evidence."],
      openedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    { id: "DEC-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION-PROMOTE", candidateClaimId: "CND-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION", decision: "promote", rationale: "The live terminal state, exact protected-key match, anonymous ledger, and current WOW List owner check support the bounded capture-date census.", evidenceThreshold: "Stable live population, exact key-set reproduction, complete row dispositions, and current-versus-historical boundary.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated archival review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION", allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/personal-wowlist-facebook-events"], guardrails: ["Do not infer a role from profile association", "Do not publish private records", "Do not convert current WOW List emptiness into historical absence"] },
    { id: "DEC-FACEBOOK-JAMIE-CONVENING-PRACTICE-PROMOTE", candidateClaimId: "CND-FACEBOOK-JAMIE-CONVENING-PRACTICE", decision: "promote", rationale: "Twenty-one public pages explicitly display Jamie as organizer or co-organizer and support a bounded cross-project chronology.", evidenceThreshold: "Public organizer attribution, public-safe selection, response boundary, and collective-credit language.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated archival review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE", allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/personal-wowlist-facebook-events"], guardrails: ["Use organizer or co-organizer attribution", "Do not infer roles for the remaining profile records", "Do not treat responses as attendance or impact"] },
    { id: "DEC-FACEBOOK-SUNDAY-DINNER-MILESTONES-PROMOTE", candidateClaimId: "CND-FACEBOOK-SUNDAY-DINNER-MILESTONES", decision: "promote", rationale: "The public 2014 and 2016 pages support exact bounded milestone and organizer wording.", evidenceThreshold: "Direct public event pages, exact co-credit, and explicit count-audit boundary.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated archival review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES", allowedSurfaces: ["knowledge-bank", "/work/196-sunday-dinner"], guardrails: ["Treat numbered titles as contemporaneous milestones", "Credit Julia Fredenberg on the 200th", "Do not use the pages as an independent audit of 300-plus gatherings"] },
    { id: "DEC-FACEBOOK-WOWLIST-IN-PRACTICE-PROMOTE", candidateClaimId: "CND-FACEBOOK-WOWLIST-IN-PRACTICE", decision: "promote", rationale: "The 200th Sunday Dinner invitation preserves one direct historical route into WOW List and materially clarifies the product's relationship to community practice.", evidenceThreshold: "Direct public route with adoption, authorship, and traffic boundaries.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated archival review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-FACEBOOK-WOWLIST-IN-PRACTICE", allowedSurfaces: ["knowledge-bank", "/work/wowlist"], guardrails: ["Describe one documented route", "Do not claim platform-wide adoption or traffic", "Do not infer who entered the WOW List record"] },
    { id: "DEC-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE-PROMOTE", candidateClaimId: "CND-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE", decision: "promote", rationale: "The public organizer-attributed sequence supports a bounded archival synthesis valuable to future project research.", evidenceThreshold: "Multiple public invitations, explicit organizer attribution, cross-event synthesis label, and outcome holds.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated archival review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE", allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/personal-wowlist-facebook-events"], guardrails: ["Present as an archival synthesis", "Do not claim attendance, sole authorship, or outcomes from invitations alone"] }
  ] satisfies KnowledgeLifecycle["promotionDecisions"]
};
