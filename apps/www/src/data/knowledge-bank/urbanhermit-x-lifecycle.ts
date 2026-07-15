import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-15";
const projectIds = ["PRJ-URBANHERM-PUBLIC-RECORD"];
const entityIds = ["ENT-JAMIE-BURKART"];
const horseLordsEntityIds = [...entityIds, "ENT-MC-SCHMIDT", "ENT-HORSE-LORDS"];
const taskId = "TASK-URBANHERM-X-FULL-POPULATION-2026-07-15";

export const urbanhermitXEntities = [
  { id: "ENT-MC-SCHMIDT", type: "person", name: "M.C. Schmidt", aliases: ["Martin Schmidt"], publicSummary: "Artist and musician credited with Jamie Burkart as co-creator of the Horse Lords 'Truthers' music video.", sameAs: [] },
  { id: "ENT-HORSE-LORDS", type: "organization", name: "Horse Lords", aliases: [], publicSummary: "Baltimore experimental music group whose 'Truthers' video was co-created by M.C. Schmidt and Jamie Burkart.", sameAs: ["https://www.horselords.org/"] }
] satisfies KnowledgeLifecycle["entities"];

export const urbanhermitXProject = {
  id: "PRJ-URBANHERM-PUBLIC-RECORD",
  title: "@urbanhermit public working record",
  aliases: ["Urbanhermit X archive"],
  summary: "A governed, public-safe account of Jamie's personal public timeline as a cross-project source-discovery and corroboration surface.",
  dateRange: "2008-2023 live-profile record; reviewed 2026",
  startYear: 2008,
  endYear: 2023,
  domains: ["public documentation", "source discovery", "professional history"],
  capabilities: ["archival production", "source association", "claim development", "privacy governance"],
  canonicalProjectKeys: ["urbanhermit-public-record"],
  proofIds: [],
  entityIds: horseLordsEntityIds,
  status: "researching"
} satisfies KnowledgeLifecycle["projects"][number];

export const urbanhermitXLifecycle = {
  leads: [{
    id: "LEAD-URBANHERM-X-FULL-POPULATION",
    title: "@urbanhermit full live-profile population",
    kind: "document",
    capturedAt: reviewedAt,
    capturedBy: "Codex authenticated archival-production review",
    state: "extracted",
    visibility: "public-safe",
    publicSummary: "An aggregate-only fixture accounts for all 434 records counted by the live @urbanhermit profile while excluding raw post text and item-level personal history.",
    publicUrl: "https://x.com/urbanhermit",
    projectAssociationStatus: "assigned",
    projectIds,
    entityIds,
    sourceIds: ["SRC-URBANHERM-X-PROFILE-2026-07-15", "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15"],
    candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", "CND-URBANHERM-HORSE-LORDS-VIDEO", "CND-URBANHERM-EIGHTH-STREET-TUNNEL", "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
    researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
    nextAction: "Reconcile against an account-owner export and continue close-reading the 321 distinct posted short URLs without publishing the personal row-level timeline."
  }] satisfies KnowledgeLifecycle["leads"],

  observations: [
    {
      id: "OBS-URBANHERM-X-POPULATION-RECONCILIATION",
      sourceId: "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15",
      projectIds,
      entityIds,
      statement: "The authenticated profile reported 434 posts; the deduplicated union contains 434 primary records after two other-account conversation-parent cards are excluded.",
      locator: "Aggregate fixture populationReconciliation section",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["records deleted or absent before capture", "an account-owner all-ever archive"],
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-X-COMPOSITION-AND-LINKS",
      sourceId: "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15",
      projectIds,
      entityIds,
      statement: "The population contains 340 Jamie-authored originals, 13 Jamie-authored replies, and 81 external-source native reposts; 277 records contain 349 link occurrences representing 321 distinct short URLs.",
      locator: "Aggregate fixture recordTypeCounts, publishingPattern, and postedUrlInventory sections",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["Jamie's authorship of native repost source text", "endorsement or accuracy of posted destinations", "audience reach"],
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-X-STAKEHOLDER-SAMPLE",
      sourceId: "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15",
      projectIds,
      entityIds,
      statement: "A year-bounded public-index search recovered 15 mission-relevant third-party records from nine accounts and two additional mission-relevant conversation-context records.",
      locator: "Aggregate fixture stakeholderInventory section",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["complete historical engagement", "endorsement", "reach", "private or unindexed responses"],
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-X-VISIBLE-COUNTERS-HELD",
      sourceId: "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15",
      projectIds,
      entityIds,
      statement: "At capture time, 85 of 353 Jamie-authored records displayed interaction labels totaling 175 likes, eight replies, and 60 reposts.",
      locator: "Aggregate fixture visibleEngagementSnapshot",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["243 unique people", "reach", "endorsement", "conversion", "attendance", "impact"],
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-HORSE-LORDS-NPR-CO-CREDIT",
      sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29",
      projectIds,
      entityIds: horseLordsEntityIds,
      statement: "NPR directly credits M.C. Schmidt and Jamie Burkart as co-creators of the Horse Lords 'Truthers' music video.",
      locator: "NPR article opening credit paragraph",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["precise division of labor", "sole authorship", "commission terms", "rights clearance", "impact"],
      candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-HORSE-LORDS-JAMIE-ACCOUNT",
      sourceId: "SRC-URBANHERM-X-HORSE-LORDS-2016-04-29",
      projectIds,
      entityIds: horseLordsEntityIds,
      statement: "Jamie's contemporaneous post says that he and M.C. Schmidt made the Horse Lords 'Truthers' video and links the NPR publication.",
      locator: "Dated public post body and linked NPR article",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["precise division of labor", "sole authorship", "commission terms", "rights clearance", "impact"],
      candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-HORSE-LORDS-DREW-CREDIT",
      sourceId: "SRC-DREW-DANIEL-X-HORSE-LORDS-2016-04-29",
      projectIds,
      entityIds: horseLordsEntityIds,
      statement: "Drew Daniel publicly credits M.C. Schmidt and Jamie Burkart with making the Horse Lords 'Truthers' video.",
      locator: "Dated public post body",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["precise division of labor", "commission terms", "rights clearance", "reach or impact"],
      candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-HORSE-LORDS-JULIA-CREDIT",
      sourceId: "SRC-JULIA-FREDENBURG-X-HORSE-LORDS-2016-04-29",
      projectIds,
      entityIds: horseLordsEntityIds,
      statement: "Julia Fredenburg publicly credits Jamie Burkart and M.C. Schmidt with the Horse Lords video and identifies its analog-media context.",
      locator: "Dated public post body",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["precise division of labor", "commission terms", "rights clearance", "reach or impact"],
      candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
      sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
      projectIds,
      entityIds,
      statement: "KCUR documents Jamie's 2006 downtown scavenger hunt and three-part film screening inside Kansas City's historic 8th Street Tunnel.",
      locator: "Article paragraphs describing the 2006 scavenger hunt and three-film screening",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["tunnel restoration", "ownership", "permanent public opening", "authorization terms", "attendance or measured impact"],
      candidateClaimIds: ["CND-URBANHERM-EIGHTH-STREET-TUNNEL"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-JULIA-CIRCULATION",
      sourceId: "SRC-JULIA-FREDENBURG-X-EIGHTH-STREET-TUNNEL-2016-09-13",
      projectIds,
      entityIds,
      statement: "Julia Fredenburg publicly shares Jamie's KCUR interview about the 8th Street Tunnel program.",
      locator: "Dated public post body and linked KCUR article",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["complete event details", "access rights", "attendance", "measured impact"],
      candidateClaimIds: ["CND-URBANHERM-EIGHTH-STREET-TUNNEL"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-TIRE-PICKUP-JIMMY-PARTICIPATION",
      sourceId: "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01",
      projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"],
      entityIds: [...entityIds, "ENT-KC-TOWN-HALL"],
      statement: "Jimmy Fitzner's first-hand account documents riding with Jamie in a dump truck to pick up tires in Northeast Kansas City.",
      locator: "Dated participant public post body",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["sole program ownership or operation", "every shift", "audited tire or savings totals"],
      candidateClaimIds: ["CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-TIRE-PICKUP-KCTH-PARTICIPATION",
      sourceId: "SRC-KC-TOWN-HALL-X-TIRES-2019-06-02",
      projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"],
      entityIds: [...entityIds, "ENT-KC-TOWN-HALL"],
      statement: "A KC Town Hall operating update names Jamie among participants in a recurring curbside tire-disposal workflow.",
      locator: "Dated project-account public post body",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["sole program ownership or operation", "each participant's tasks", "audited tire or savings totals"],
      candidateClaimIds: ["CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-CONTEXT",
      sourceId: "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-22",
      projectIds: [...projectIds, "PRJ-NYC-ARTIST-COALITION"],
      entityIds: [...entityIds, "ENT-NYC-ARTIST-COALITION", "ENT-NYC-COUNCIL", "ENT-OFFICE-NIGHTLIFE"],
      statement: "Brooklyn Eagle quotes NYC Artist Coalition and records Council committee and public-feedback chronology around the proposed Office of Nightlife.",
      locator: "Article paragraphs describing Council action and quoting NYC Artist Coalition",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["Jamie's individual authorship or role", "individual causation", "the Office's final implementation choices"],
      candidateClaimIds: [],
      candidateRelationships: [],
      reviewedAt
    }
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: "CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
      projectIds,
      proposition: "Jamie's personal account preserves a 2008-2023 cross-project public working record whose complete live-profile population was reviewed on July 15, 2026.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-X-POPULATION-RECONCILIATION", "OBS-URBANHERM-X-COMPOSITION-AND-LINKS", "OBS-URBANHERM-X-STAKEHOLDER-SAMPLE", "OBS-URBANHERM-X-VISIBLE-COUNTERS-HELD"],
      requiredEvidence: ["Live-profile denominator", "Deduplicated protected record set", "Aggregate-only public artifact", "Explicit all-ever boundary"],
      boundaries: ["Complete means the live profile-counted population at capture, not all-ever activity.", "Separate Jamie-authored records from native repost source text.", "Keep theme and interaction counts out of impact messaging."],
      antiClaims: ["The corpus contains every post Jamie ever made", "Jamie authored all 434 records", "Social counters prove impact"],
      counterevidencePosture: "Reconcile an account-owner export and preserve deletions, gaps, or classification changes as dated corrections.",
      sourceIndependenceNote: "The census establishes the public record and method; it does not independently validate project outcomes described in posts.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-PUBLIC-WORKING-SURFACE-BANK-PROMOTE"],
      targetCanonicalClaimId: "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-HORSE-LORDS-VIDEO",
      projectIds,
      proposition: "Jamie co-created the Horse Lords 'Truthers' video with M.C. Schmidt, and NPR published and credited both collaborators.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-HORSE-LORDS-NPR-CO-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JAMIE-ACCOUNT", "OBS-URBANHERM-HORSE-LORDS-DREW-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JULIA-CREDIT"],
      requiredEvidence: ["Independent publication credit", "Contemporaneous corroboration", "Collaborator-credit boundary"],
      boundaries: ["Always credit M.C. Schmidt.", "Do not infer production split, commission terms, rights, reach, or impact."],
      antiClaims: ["Jamie solely created the video", "NPR commissioned it", "The video is cleared for republication"],
      counterevidencePosture: "Add collaborator role and rights evidence if recovered; narrow the claim if credits are corrected.",
      sourceIndependenceNote: "NPR independently supports the shared credit; Jamie and collaborator-network posts corroborate it.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-HORSE-LORDS-BANK-PROMOTE"],
      targetCanonicalClaimId: "CLM-URBANHERM-HORSE-LORDS-VIDEO",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-EIGHTH-STREET-TUNNEL",
      projectIds,
      proposition: "In 2006, Jamie led a downtown scavenger hunt and hosted a three-part film screening inside Kansas City's historic 8th Street Tunnel.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-JULIA-CIRCULATION"],
      requiredEvidence: ["Independent event account", "Jamie attribution", "Public-safety and access boundary"],
      boundaries: ["Describe a participatory screening, not restoration or ownership.", "Do not infer access terms, attendance, or measured impact."],
      antiClaims: ["Jamie restored the tunnel", "Jamie permanently opened it", "Impact was measured"],
      counterevidencePosture: "Add current access, safety, and media-rights context before any public feature.",
      sourceIndependenceNote: "KCUR independently documents the program; a collaborator post supports source association.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-EIGHTH-STREET-TUNNEL-BANK-PROMOTE"],
      targetCanonicalClaimId: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION",
      projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"],
      proposition: "Jamie directly participated in recurring TiredOfTires fieldwork, including a documented dump-truck pickup shift around Northeast Kansas City.",
      maturity: "promoted",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-TIRE-PICKUP-JIMMY-PARTICIPATION", "OBS-URBANHERM-TIRE-PICKUP-KCTH-PARTICIPATION"],
      requiredEvidence: ["First-hand participant account", "Project-account corroboration", "Sole-credit boundary"],
      boundaries: ["This supports direct participation, not sole program ownership, full coordination, every shift, or aggregate metrics."],
      antiClaims: ["Jamie alone ran TiredOfTires", "Jamie collected every reported tire", "Program totals are independently audited"],
      counterevidencePosture: "Integrate collaborator, municipal, and disposal records while retaining collective credit.",
      sourceIndependenceNote: "A participant account directly corroborates one shift; the project account separately names Jamie in the recurring workflow.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION", "TASK-TIRED-OF-TIRES-ROLE-METRICS"],
      promotionDecisionIds: ["DEC-URBANHERM-TIRE-PICKUP-BANK-PROMOTE"],
      targetCanonicalClaimId: "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    { id: "EVT-URBANHERM-PUBLIC-RECORD-PROMOTED", candidateClaimId: "CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Codex archival-production review", reason: "The bounded aggregate and derivation contract support accession to the internal knowledge bank; public projection still requires an audience-specific, Jamie-approved decision.", decisionId: "DEC-URBANHERM-PUBLIC-WORKING-SURFACE-BANK-PROMOTE" },
    { id: "EVT-URBANHERM-HORSE-LORDS-PROMOTED", candidateClaimId: "CND-URBANHERM-HORSE-LORDS-VIDEO", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "Atomic independent and contemporaneous sources support a narrow shared-credit claim for internal composition; media rights and public-surface fit remain open.", decisionId: "DEC-URBANHERM-HORSE-LORDS-BANK-PROMOTE" },
    { id: "EVT-URBANHERM-TUNNEL-PROMOTED", candidateClaimId: "CND-URBANHERM-EIGHTH-STREET-TUNNEL", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "The independently documented participatory program can enter the bank while present access, safety, media, and audience context remain prerequisites for site use.", decisionId: "DEC-URBANHERM-EIGHTH-STREET-TUNNEL-BANK-PROMOTE" },
    { id: "EVT-URBANHERM-TIRES-PROMOTED", candidateClaimId: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION", toMaturity: "promoted", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "Participant and project-account sources support bounded direct participation for the bank; the current KC Town Hall page does not require another public proof point.", decisionId: "DEC-URBANHERM-TIRE-PICKUP-BANK-PROMOTE" }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: taskId,
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", "CND-URBANHERM-HORSE-LORDS-VIDEO", "CND-URBANHERM-EIGHTH-STREET-TUNNEL", "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      question: "Can every record counted by the live @urbanhermit profile be reviewed and converted into public-safe knowledge without publishing a reconstructable personal timeline?",
      status: "completed",
      priority: "urgent",
      methods: ["Authenticated Posts and Replies traversal", "Repeated no-growth stopping rule", "Deduplication and relationship classification", "Year-bounded incoming search", "Aggregate-only public mutation", "Independent source close reading"],
      sourceIds: ["SRC-URBANHERM-X-PROFILE-2026-07-15", "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15", "SRC-URBANHERM-X-HORSE-LORDS-2016-04-29", "SRC-DREW-DANIEL-X-HORSE-LORDS-2016-04-29", "SRC-JULIA-FREDENBURG-X-HORSE-LORDS-2016-04-29", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29", "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15", "SRC-JULIA-FREDENBURG-X-EIGHTH-STREET-TUNNEL-2016-09-13", "SRC-KC-TOWN-HALL-X-TIRES-2019-06-02", "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01", "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-22"],
      observationIds: ["OBS-URBANHERM-X-POPULATION-RECONCILIATION", "OBS-URBANHERM-X-COMPOSITION-AND-LINKS", "OBS-URBANHERM-X-STAKEHOLDER-SAMPLE", "OBS-URBANHERM-X-VISIBLE-COUNTERS-HELD", "OBS-URBANHERM-HORSE-LORDS-NPR-CO-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JAMIE-ACCOUNT", "OBS-URBANHERM-HORSE-LORDS-DREW-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JULIA-CREDIT", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-JULIA-CIRCULATION", "OBS-URBANHERM-TIRE-PICKUP-JIMMY-PARTICIPATION", "OBS-URBANHERM-TIRE-PICKUP-KCTH-PARTICIPATION", "OBS-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-CONTEXT"],
      findings: ["All 434 live profile-counted records were reviewed with zero recovery gap.", "The public fixture retains exact aggregate accountability without raw text or item-level personal history.", "Three narrow accomplishment families crossed the source threshold and entered the knowledge bank while every website projection remains held."],
      limitations: ["The live profile is not an owner archive.", "Most posted URLs remain source leads.", "Incoming search and interface counters are incomplete and mutable."],
      nextActions: ["Request an owner archive", "Continue source maturation", "Seek collaborator role and rights detail", "Retain all website projections on hold until audience selection"],
      openedAt: reviewedAt,
      completedAt: reviewedAt
    },
    {
      id: "TASK-URBANHERM-X-SOURCE-MATURATION",
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", "CND-URBANHERM-HORSE-LORDS-VIDEO", "CND-URBANHERM-EIGHTH-STREET-TUNNEL", "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      question: "Which of the 321 posted short URLs and 15 mission-relevant incoming records support additional public-safe professional claims?",
      status: "in-progress",
      priority: "high",
      methods: ["Resolve selected destinations", "Close-read source bodies", "Separate circulation from endorsement", "Seek independent and collaborator attribution", "Record rights and safety boundaries"],
      sourceIds: ["SRC-URBANHERM-X-HORSE-LORDS-2016-04-29", "SRC-DREW-DANIEL-X-HORSE-LORDS-2016-04-29", "SRC-JULIA-FREDENBURG-X-HORSE-LORDS-2016-04-29", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29", "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15", "SRC-JULIA-FREDENBURG-X-EIGHTH-STREET-TUNNEL-2016-09-13", "SRC-KC-TOWN-HALL-X-TIRES-2019-06-02", "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01", "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-22"],
      observationIds: ["OBS-URBANHERM-HORSE-LORDS-NPR-CO-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JAMIE-ACCOUNT", "OBS-URBANHERM-HORSE-LORDS-DREW-CREDIT", "OBS-URBANHERM-HORSE-LORDS-JULIA-CREDIT", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-JULIA-CIRCULATION", "OBS-URBANHERM-TIRE-PICKUP-JIMMY-PARTICIPATION", "OBS-URBANHERM-TIRE-PICKUP-KCTH-PARTICIPATION", "OBS-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-CONTEXT"],
      findings: ["NPR supplies direct collaborative credit.", "KCUR supplies an independent participatory-program account.", "A participant record narrows TiredOfTires role uncertainty to direct participation.", "Brooklyn Eagle adds coalition and Council chronology but no Jamie-specific attribution."],
      limitations: ["Most destinations remain inventoried rather than close-read.", "A posted URL alone does not establish authorship, endorsement, participation, or impact."],
      nextActions: ["Resolve high-value project URLs", "Recover archived copies of dead destinations", "Add claims only after source-level boundary review"],
      openedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    { id: "DEC-URBANHERM-PUBLIC-WORKING-SURFACE-BANK-PROMOTE", candidateClaimId: "CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", decision: "promote", rationale: "Accession the bounded aggregate to the internal bank while withholding any item-level archive or public portfolio projection.", evidenceThreshold: "Exact live-profile reconciliation, closed public schema, protected derivation contract, and explicit all-ever boundary.", decidedAt: reviewedAt, decidedBy: ["Codex archival-production review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", targetCanonicalClaimId: "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", allowedSurfaces: ["research-brief"], guardrails: ["No public item-level timeline", "No social activity as impact", "No new public route without Jamie approval"] },
    { id: "DEC-URBANHERM-HORSE-LORDS-BANK-PROMOTE", candidateClaimId: "CND-URBANHERM-HORSE-LORDS-VIDEO", decision: "promote", rationale: "Accession the narrow shared-credit claim to the internal bank; current site composition and media rights do not authorize public projection.", evidenceThreshold: "Independent publication credit, source-specific contemporaneous corroboration, collaborator credit, and rights-aware media treatment.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", targetCanonicalClaimId: "CLM-URBANHERM-HORSE-LORDS-VIDEO", allowedSurfaces: ["research-brief"], guardrails: ["Always credit M.C. Schmidt", "Do not imply sole creation", "Do not embed uncleared media"] },
    { id: "DEC-URBANHERM-EIGHTH-STREET-TUNNEL-BANK-PROMOTE", candidateClaimId: "CND-URBANHERM-EIGHTH-STREET-TUNNEL", decision: "promote", rationale: "Accession the independently documented participatory-program claim to the bank while keeping public use contingent on purpose, safety, and media context.", evidenceThreshold: "Independent event account, exact Jamie attribution, and explicit access, rights, and impact boundaries.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", targetCanonicalClaimId: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING", allowedSurfaces: ["research-brief"], guardrails: ["Do not claim restoration or ownership", "Do not imply unrestricted access", "No attendance or impact claims"] },
    { id: "DEC-URBANHERM-TIRE-PICKUP-BANK-PROMOTE", candidateClaimId: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION", decision: "promote", rationale: "Accession the bounded direct-participation claim to the bank while leaving the current KC Town Hall public composition unchanged.", evidenceThreshold: "Participant account, separate project-account corroboration, and collective-work boundaries.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", targetCanonicalClaimId: "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION", allowedSurfaces: ["research-brief"], guardrails: ["Direct participation only", "No sole ownership", "No unaudited metrics"] }
  ] satisfies KnowledgeLifecycle["promotionDecisions"],

  editorialBriefs: [{
    id: "BRIEF-URBANHERM-RESERVE-PRACTICE",
    title: "Urbanhermit reserve practice composition",
    audience: "Future hiring, curatorial, public-history, or creative-technology readers",
    audienceTags: ["hiring-manager", "creative-technology", "public-history"],
    goal: "Use selected independently supported records to reveal Jamie's long-running participatory and creative-technical practice without turning a personal social account into the portfolio.",
    purposeTags: ["future-case-study", "source-discovery"],
    status: "research",
    publicationIntent: "internal-brief",
    targetSurfaces: ["future-selected-practice-composition"],
    selectionCriteria: ["Choose claims for audience relevance", "Prefer independent direct attribution", "Preserve collaborator credit", "Require rights-aware media", "Keep account census out of foreground copy"],
    projectIds,
    canonicalClaimIds: ["CLM-URBANHERM-HORSE-LORDS-VIDEO", "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING", "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION"],
    candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO", "CND-URBANHERM-EIGHTH-STREET-TUNNEL", "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
    exclusions: ["Raw personal timeline", "Unresolved posted links", "Social counters as impact", "Uncleared media", "Sole-credit language"],
    citationPosture: "Keep citations quiet in the public composition while every selected sentence resolves to a close-read source and explicit boundary.",
    chadLensQuestion: "Does this selected evidence make Jamie's specific craft and range clearer to this audience, or merely make the archive visible?",
    mediaLeadIds: ["MEDIA-URBANHERM-HORSE-LORDS-NPR-VIDEO", "MEDIA-URBANHERM-EIGHTH-STREET-TUNNEL-SOURCE-IMAGES", "MEDIA-URBANHERM-TIRE-PICKUP-PARTICIPANT-PHOTOGRAPHS"],
    pageClaimExclusions: []
  }] satisfies KnowledgeLifecycle["editorialBriefs"],

  proofSurfaceManifests: [] satisfies KnowledgeLifecycle["proofSurfaceManifests"],
  mediaLeads: [
    { id: "MEDIA-URBANHERM-HORSE-LORDS-NPR-VIDEO", title: "Horse Lords 'Truthers' published video", projectIds, kind: "video", publicSafeDescription: "NPR's article contains the published Horse Lords 'Truthers' video credited to M.C. Schmidt and Jamie Burkart.", sourceIds: ["SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29"], rightsStatus: "permission-needed", consentStatus: "not-applicable", displayStatus: "hold", candidateClaimIds: ["CND-URBANHERM-HORSE-LORDS-VIDEO"], researchTaskIds: ["TASK-URBANHERM-X-SOURCE-MATURATION"], researchPrompt: "Verify current playability, credit display, embed terms, and rights with M.C. Schmidt and the relevant rights holders before any portfolio use.", status: "queued" },
    { id: "MEDIA-URBANHERM-EIGHTH-STREET-TUNNEL-SOURCE-IMAGES", title: "8th Street Tunnel program source images", projectIds, kind: "collection", publicSafeDescription: "The KCUR report and associated public circulation may lead to images of the historic tunnel and Jamie's 2006 participatory screening.", sourceIds: ["SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15", "SRC-JULIA-FREDENBURG-X-EIGHTH-STREET-TUNNEL-2016-09-13"], rightsStatus: "unknown", consentStatus: "review-needed", displayStatus: "hold", candidateClaimIds: ["CND-URBANHERM-EIGHTH-STREET-TUNNEL"], researchTaskIds: ["TASK-URBANHERM-X-SOURCE-MATURATION"], researchPrompt: "Identify photographer, date, depicted event, access context, participant consent, and rights without treating an image as proof of attendance or authorization.", status: "queued" },
    { id: "MEDIA-URBANHERM-TIRE-PICKUP-PARTICIPANT-PHOTOGRAPHS", title: "TiredOfTires participant photographs", projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"], kind: "photograph", publicSafeDescription: "Jimmy Fitzner's public participant account includes photographs associated with a dump-truck tire-pickup shift with Jamie.", sourceIds: ["SRC-JIMMY-FITZNER-X-TIRES-2022-04-01"], rightsStatus: "permission-needed", consentStatus: "review-needed", displayStatus: "hold", candidateClaimIds: ["CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"], researchTaskIds: ["TASK-URBANHERM-X-SOURCE-MATURATION", "TASK-TIRED-OF-TIRES-ROLE-METRICS"], researchPrompt: "Seek photographer and depicted-person permission, verify date and setting, and exclude addresses, bystanders, vehicle identifiers, or resident records before display.", status: "queued" }
  ] satisfies KnowledgeLifecycle["mediaLeads"]
};
