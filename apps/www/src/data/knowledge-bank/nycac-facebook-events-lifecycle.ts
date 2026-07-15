import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-15";
const projectIds = ["PRJ-NYC-ARTIST-COALITION"];
const entityIds = [
  "ENT-JAMIE-BURKART",
  "ENT-NYC-ARTIST-COALITION",
  "ENT-NYC-COUNCIL",
  "ENT-OFFICE-NIGHTLIFE",
  "ENT-WOWLIST"
];
const populationTaskId = "TASK-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT";
const roleTaskId = "TASK-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE";

export const nycacFacebookEventLifecycle = {
  leads: [
    {
      id: "LEAD-NYCAC-FACEBOOK-EVENT-FULL-POPULATION",
      title: "NYC Artist Coalition Facebook Past Events population",
      kind: "document",
      capturedAt: reviewedAt,
      capturedBy: "Codex authenticated archival-production review",
      state: "extracted",
      visibility: "public-safe",
      publicSummary: "A metadata-only census assigns a recovered-or-unresolved disposition to all 34 displayed historical event-control slots while excluding attendee identities, raw descriptions, private links, and authenticated state.",
      publicUrl: "https://www.facebook.com/nycartc/events",
      projectAssociationStatus: "assigned",
      projectIds,
      entityIds,
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-EVENT-POPULATION",
        "CND-NYCAC-PARTICIPATION-SYSTEM",
        "CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
        "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      researchTaskIds: [populationTaskId, roleTaskId],
      nextAction: "Reconcile a native Meta owner export against the 33 recovered live-index identities and the one unresolved historical control slot."
    },
    {
      id: "LEAD-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY",
      title: "Jamie Burkart account of NYC Artist Coalition event practice",
      kind: "memory",
      capturedAt: reviewedAt,
      capturedBy: "Jamie Burkart",
      state: "extracted",
      visibility: "public-safe",
      publicSummary: "Jamie identifies recurring events and rotating cultural-space meetings as a substantial coalition contribution connecting WOW List participation lessons with practical support and legislative advocacy.",
      projectAssociationStatus: "assigned",
      projectIds,
      entityIds,
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCA-GOTHAMIST-CABARET-2017",
        "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017"
      ],
      candidateClaimIds: [
        "CND-NYCAC-PARTICIPATION-SYSTEM",
        "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      researchTaskIds: [roleTaskId],
      nextAction: "Invite collaborators to corroborate or complicate event-level production roles while preserving the collective system claim."
    }
  ] satisfies KnowledgeLifecycle["leads"],

  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "An earlier Facebook event-host control displayed 34 past-event slots. Repeated authenticated terminal scrolling exposed 33 unique event IDs, all of which were reviewed, while one control slot remains unresolved.",
      locator: "Fixture populationReconciliation and events sections",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["a complete native owner archive", "the identity or deletion state of the unresolved slot"],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "The 33 recovered records span January 2017 through January 2021: 17 in 2017, three in 2018, six in 2019, six in 2020, and one in 2021; 24 cards display NYC Artist Coalition as organizer and nine are allied or cohosted listings.",
      locator: "Fixture aggregateSnapshot section and events date and relation fields",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["individual page authorship", "the complete history of coalition events"],
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-EVENT-POPULATION",
        "CND-NYCAC-PARTICIPATION-SYSTEM"
      ],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-POPULATION",
          evidenceRole: "direct-support",
          supports: "the bounded chronology and direct-versus-allied event-card accounting",
          limitations: ["does not establish a complete native owner archive"]
        },
        {
          candidateClaimId: "CND-NYCAC-PARTICIPATION-SYSTEM",
          evidenceRole: "corroborating",
          supports: "the recurring collective event system's public chronology",
          limitations: ["does not identify the individual producer of each event"]
        }
      ],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Twelve records are recurring coalition meetings: ten physical meetings name ten different cultural spaces, and two later meetings were virtual.",
      locator: "Fixture events section topics, venue, and date fields",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["a meeting in every calendar month", "that every coalition event used a different venue"],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "The event sequence connects coalition meetings, practical safety and legal sessions, venue-support actions, panels, hearings, town halls, small-business advocacy, mutual aid, and relief convenings across cultural and civic settings.",
      locator: "Fixture events section titles, topics, venue categories, and organizer displays",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["endorsement by every named stakeholder", "a causal path from any one event to a policy outcome"],
      candidateClaimIds: [
        "CND-NYCAC-PARTICIPATION-SYSTEM",
        "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-PARTICIPATION-SYSTEM",
          evidenceRole: "direct-support",
          supports: "the mix of cultural-space convening, practical support, and government-interface formats",
          limitations: ["does not assign Jamie sole authorship or establish policy causality"]
        },
        {
          candidateClaimId: "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
          evidenceRole: "context",
          supports: "the public event pattern underlying Jamie's democracy-lab interpretation",
          limitations: ["does not establish participant consensus or measured democratic impact"]
        }
      ],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Thirty-two recovered event pages display historical Facebook response counts; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
      locator: "Fixture aggregateSnapshot section and event responseSnapshot fields",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["attendance", "unique people", "reach", "endorsement", "conversion", "mandate", "impact"],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      projectIds,
      entityIds,
      statement: "Recovered event descriptions routed participants to seven articles from New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist across Cabaret Law, M.A.R.C.H., and Commercial Rent Stabilization contexts.",
      locator: "Fixture postedSourceArticles section",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["article accuracy", "coalition endorsement of every proposition", "readership or action"],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      projectIds,
      entityIds,
      statement: "Authenticated captures recovered all 33 exposed detail records. A later replay retained the same 33 event IDs while five detail routes temporarily returned an unavailable state.",
      locator: "Protected replay dated capture and fixture detailAvailabilityRecheck section",
      evidenceRole: "supports-boundary",
      certainty: "high",
      doesNotEstablish: ["that unavailable records never existed", "permanent deletion", "complete historical recovery"],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-POPULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      projectIds,
      entityIds,
      statement: "Jamie identifies the recurring event and participation layer as a substantial contribution, connecting WOW List lessons with public event identities, rotating cultural-space meetings, artist listening, practical support, and civic action.",
      locator: "Dated participant-memory intake section supplied July 15, 2026",
      evidenceRole: "direct-support",
      certainty: "moderate",
      doesNotEstablish: ["sole authorship or production of every event", "the precise division of labor", "participant consensus"],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      projectIds,
      entityIds,
      statement: "Jamie describes the event practice as a kind of democracy lab: believing artists, treating events as an art form, and translating between cultural and civic codes so people could build collective agency together.",
      locator: "Dated participant-memory intake section supplied July 15, 2026",
      evidenceRole: "context",
      certainty: "moderate",
      doesNotEstablish: ["a measured democracy outcome", "participant consensus", "representation of all NYC artists"],
      candidateClaimIds: ["CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"],
      candidateRelationships: [],
      reviewedAt
    }
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: "CND-NYCAC-FACEBOOK-EVENT-POPULATION",
      projectIds,
      proposition: "The displayed NYC Artist Coalition Facebook Past Events control is fully accounted for as 33 recovered event records plus one unresolved historical slot.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-NYCAC-FACEBOOK-EVENT-POPULATION",
        "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
        "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES",
        "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY"
      ],
      requiredEvidence: ["Displayed control", "Stable event-ID set", "Detail-page disposition", "Explicit unresolved-slot boundary"],
      boundaries: ["Call this complete displayed-control accounting, not complete historical recovery.", "Infer nothing about the unresolved slot."],
      antiClaims: ["All 34 event pages were recovered", "The coalition created exactly 34 events", "Facebook is a complete owner archive"],
      counterevidencePosture: "Reconcile a native owner export without erasing the dated live-interface control or platform-volatility record.",
      sourceIndependenceNote: "The authenticated Facebook record establishes public event metadata, not policy outcomes or individual production roles.",
      researchTaskIds: [populationTaskId],
      promotionDecisionIds: ["DEC-NYCAC-FACEBOOK-EVENT-POPULATION-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-PARTICIPATION-SYSTEM",
      projectIds,
      proposition: "Beginning in 2017, Jamie helped establish and produce NYC Artist Coalition's recurring participation system across cultural spaces, practical support sessions, town halls, hearings, campaign actions, and relief convenings.",
      maturity: "promoted",
      confidence: "moderate",
      observationIds: [
        "OBS-NYCAC-FACEBOOK-EVENT-CHRONOLOGY",
        "OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS",
        "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
        "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY"
      ],
      requiredEvidence: ["First-hand role account", "Full exposed event census", "Independent role corroboration", "Collective-credit boundary"],
      boundaries: ["Use helped establish and produce.", "Preserve collaborator, host, partner, and participant credit.", "Do not infer event-level authorship or policy causality."],
      antiClaims: ["Jamie solely produced every event", "Every event used a different venue", "The event system alone caused Cabaret Law repeal"],
      counterevidencePosture: "Invite collaborator correction and revise event-level credit without erasing the documented collective system.",
      sourceIndependenceNote: "The role claim combines Jamie's first-hand account with public event-system evidence and independent reporting of related coalition action.",
      researchTaskIds: [roleTaskId],
      promotionDecisionIds: ["DEC-NYCAC-PARTICIPATION-SYSTEM-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      projectIds,
      proposition: "Thirty-two recovered event pages preserve bounded historical Facebook response signals with reproducible threshold counts.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS"],
      requiredEvidence: ["Event-level displayed labels", "Threshold arithmetic", "Attendance and unique-person boundary"],
      boundaries: ["Keep the figures in the knowledge bank.", "Never sum them into people reached or attendance."],
      antiClaims: ["9,989 unique people engaged", "Facebook responses equal attendance", "Response counts prove impact"],
      counterevidencePosture: "Retain the dated interface snapshot and prefer independent reporting for event-specific physical attendance.",
      sourceIndependenceNote: "The platform labels are direct interface evidence but not independent evidence of attendance, reach, or outcomes.",
      researchTaskIds: [roleTaskId],
      promotionDecisionIds: ["DEC-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      projectIds,
      proposition: "Jamie understands the coalition's recurring event practice as a democracy lab that believed artists and translated between cultural and civic codes.",
      maturity: "promoted",
      confidence: "moderate",
      observationIds: [
        "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES",
        "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION"
      ],
      requiredEvidence: ["Attributed first-hand interpretation", "Public event-system context", "Participant-consensus boundary"],
      boundaries: ["Attribute democracy-lab and city-nervous-system language to Jamie.", "Do not present the metaphor as a measured outcome."],
      antiClaims: ["The events empirically proved a democracy outcome", "Every participant shared Jamie's interpretation"],
      counterevidencePosture: "Preserve participant and collaborator accounts that complicate, narrow, or extend Jamie's interpretation.",
      sourceIndependenceNote: "The event census corroborates the setting and recurrence; the democracy-lab interpretation remains Jamie's perspective.",
      researchTaskIds: [roleTaskId],
      promotionDecisionIds: ["DEC-NYCAC-DEMOCRATIC-LISTENING-PRACTICE-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    { id: "EVT-NYCAC-FACEBOOK-EVENT-POPULATION-PROMOTED", candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-POPULATION", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The displayed control and stable live-index population are fully reconciled with one explicit unresolved slot.", decisionId: "DEC-NYCAC-FACEBOOK-EVENT-POPULATION-PROMOTE" },
    { id: "EVT-NYCAC-PARTICIPATION-SYSTEM-PROMOTED", candidateClaimId: "CND-NYCAC-PARTICIPATION-SYSTEM", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The first-hand role account, complete exposed event census, and independent role evidence support a bounded helped-establish-and-produce claim.", decisionId: "DEC-NYCAC-PARTICIPATION-SYSTEM-PROMOTE" },
    { id: "EVT-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS-PROMOTED", candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The threshold arithmetic is reproducible and retained as bounded knowledge-bank context.", decisionId: "DEC-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS-PROMOTE" },
    { id: "EVT-NYCAC-DEMOCRATIC-LISTENING-PRACTICE-PROMOTED", candidateClaimId: "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Jamie Burkart", reason: "The interpretation is preserved as Jamie's attributed perspective and held from the public portfolio page.", decisionId: "DEC-NYCAC-DEMOCRATIC-LISTENING-PRACTICE-PROMOTE" }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: populationTaskId,
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-POPULATION"],
      question: "Can a native Meta owner export identify the unresolved historical control slot and events removed before the current live index?",
      status: "open",
      priority: "medium",
      methods: ["Exhausted the authenticated Past Events surface through repeated terminal scrolling.", "Reconciled the stable 33-ID set against the earlier 34-past-events host control.", "Replayed detail availability and preserved platform-state changes."],
      sourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026", "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026", "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"],
      observationIds: ["OBS-NYCAC-FACEBOOK-EVENT-POPULATION", "OBS-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES", "OBS-NYCAC-FACEBOOK-DETAIL-AVAILABILITY"],
      findings: ["Thirty-three event IDs materialized consistently.", "All 33 detail records were recovered across authenticated captures.", "One displayed control slot remains unidentified."],
      limitations: ["No native Meta owner export was available.", "The live surface cannot reveal events removed before capture."],
      nextActions: ["Obtain a minimized owner export if available.", "Preserve the unresolved slot without inferred metadata."],
      openedAt: reviewedAt
    },
    {
      id: roleTaskId,
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM", "CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS", "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"],
      question: "Which records can further specify Jamie's event-level production work, WOW List method transfer, stakeholder participation, and independently reported attendance without absorbing collective credit?",
      status: "in-progress",
      priority: "high",
      methods: ["Captured Jamie's first-hand account as participant memory.", "Compared it with the complete exposed event census.", "Connected role propositions to contemporaneous public reporting.", "Kept Facebook response labels separate from physical attendance."],
      sourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026", "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026"],
      observationIds: ["OBS-NYCAC-FACEBOOK-ROTATING-MEETINGS", "OBS-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES", "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS", "OBS-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY", "OBS-NYCAC-FACEBOOK-DEMOCRACY-LAB-INTERPRETATION"],
      findings: ["The event population corroborates a recurring collective participation system.", "Jamie's account supports a bounded helped-establish-and-produce claim.", "Event-level authorship, division of labor, and physical attendance remain open for further corroboration."],
      limitations: ["Shared event pages do not identify the human producer of each event.", "Response labels do not establish attendance or unique people.", "Collaborator accounts may add, complicate, or correct Jamie's interpretation."],
      nextActions: ["Invite public-safe collaborator proof notes.", "Crosswalk programs and task artifacts to selected events.", "Use independent reporting for physical attendance."],
      openedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    {
      id: "DEC-NYCAC-FACEBOOK-EVENT-POPULATION-PROMOTE",
      candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-POPULATION",
      decision: "promote",
      rationale: "The stable authenticated 33-ID set and explicit unresolved-slot disposition make the population boundary auditable without pretending to possess a native owner archive.",
      evidenceThreshold: "Displayed control, stable event-ID set, detail disposition, public-safe fixture, and explicit completeness boundary.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      guardrails: ["Say 33 recovered plus one unresolved slot.", "Do not claim complete historical recovery or infer the missing event."]
    },
    {
      id: "DEC-NYCAC-PARTICIPATION-SYSTEM-PROMOTE",
      candidateClaimId: "CND-NYCAC-PARTICIPATION-SYSTEM",
      decision: "promote",
      rationale: "Jamie's authorized first-hand account, the full exposed event census, and independent role evidence make the recurring participation-system contribution useful and defensible for hiring readers.",
      evidenceThreshold: "First-hand role account, complete exposed event census, independent related-role evidence, collective-credit language, and exact-surface approval.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      allowedSurfaces: ["knowledge-bank", "/work/fair-rent-nyc", "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      guardrails: ["Use helped establish and produce.", "Preserve collective credit.", "Do not convert response labels into attendance or event chronology into policy causality."]
    },
    {
      id: "DEC-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS-PROMOTE",
      candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      decision: "promote",
      rationale: "The dated event-level response thresholds are reproducible reserve evidence but would burden the public case study and invite misreading.",
      evidenceThreshold: "Reproducible threshold arithmetic plus explicit attendance, unique-person, reach, endorsement, and impact boundaries.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      guardrails: ["Do not sum event responses.", "Do not call responses attendance, people reached, endorsement, or impact."]
    },
    {
      id: "DEC-NYCAC-DEMOCRATIC-LISTENING-PRACTICE-PROMOTE",
      candidateClaimId: "CND-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      decision: "promote",
      rationale: "Jamie's interpretive language belongs in the knowledge bank as attributed professional philosophy, not as an empirically measured public outcome.",
      evidenceThreshold: "First-hand attribution, event-system context, and explicit participant-consensus and measurement boundaries.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      allowedSurfaces: ["knowledge-bank", "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
      guardrails: ["Attribute the democracy-lab interpretation to Jamie.", "Do not claim measured impact or participant consensus."]
    }
  ] satisfies KnowledgeLifecycle["promotionDecisions"]
};
