import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-15";
const projectIds = ["PRJ-URBANHERM-PUBLIC-RECORD"];
const entityIds = ["ENT-JAMIE-BURKART"];
const taskId = "TASK-URBANHERM-X-FULL-POPULATION-2026-07-15";

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
  entityIds,
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
      id: "OBS-URBANHERM-HORSE-LORDS-CO-CREDIT",
      sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29",
      projectIds,
      entityIds,
      statement: "NPR directly credits M.C. Schmidt and Jamie Burkart as co-creators of the Horse Lords 'Truthers' music video; three contemporaneous public posts align with the co-credit.",
      locator: "NPR article introduction and associated dated public posts",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["precise division of labor", "sole authorship", "commission terms", "rights clearance", "impact"],
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
      id: "OBS-URBANHERM-TIRE-PICKUP-PARTICIPATION",
      sourceId: "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01",
      projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"],
      entityIds: [...entityIds, "ENT-KC-TOWN-HALL"],
      statement: "Jimmy Fitzner's first-hand account documents riding with Jamie in a dump truck to pick up tires in Northeast Kansas City; a KC Town Hall post separately names Jamie among TiredOfTires participants.",
      locator: "Dated participant and project-account posts",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["sole program ownership or operation", "every shift", "audited tire or savings totals"],
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
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-X-POPULATION-RECONCILIATION", "OBS-URBANHERM-X-COMPOSITION-AND-LINKS", "OBS-URBANHERM-X-STAKEHOLDER-SAMPLE", "OBS-URBANHERM-X-VISIBLE-COUNTERS-HELD"],
      requiredEvidence: ["Live-profile denominator", "Deduplicated protected record set", "Aggregate-only public artifact", "Explicit all-ever boundary"],
      boundaries: ["Complete means the live profile-counted population at capture, not all-ever activity.", "Separate Jamie-authored records from native repost source text.", "Keep theme and interaction counts out of impact messaging."],
      antiClaims: ["The corpus contains every post Jamie ever made", "Jamie authored all 434 records", "Social counters prove impact"],
      counterevidencePosture: "Reconcile an account-owner export and preserve deletions, gaps, or classification changes as dated corrections.",
      sourceIndependenceNote: "The census establishes the public record and method; it does not independently validate project outcomes described in posts.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-PUBLIC-WORKING-SURFACE-HOLD"],
      targetCanonicalClaimId: "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-HORSE-LORDS-VIDEO",
      projectIds,
      proposition: "Jamie co-created the Horse Lords 'Truthers' video with M.C. Schmidt, and NPR published and credited both collaborators.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-HORSE-LORDS-CO-CREDIT"],
      requiredEvidence: ["Independent publication credit", "Contemporaneous corroboration", "Collaborator-credit boundary"],
      boundaries: ["Always credit M.C. Schmidt.", "Do not infer production split, commission terms, rights, reach, or impact."],
      antiClaims: ["Jamie solely created the video", "NPR commissioned it", "The video is cleared for republication"],
      counterevidencePosture: "Add collaborator role and rights evidence if recovered; narrow the claim if credits are corrected.",
      sourceIndependenceNote: "NPR independently supports the shared credit; Jamie and collaborator-network posts corroborate it.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-HORSE-LORDS-HOLD"],
      targetCanonicalClaimId: "CLM-URBANHERM-HORSE-LORDS-VIDEO",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-EIGHTH-STREET-TUNNEL",
      projectIds,
      proposition: "In 2006, Jamie led a downtown scavenger hunt and hosted a three-part film screening inside Kansas City's historic 8th Street Tunnel.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"],
      requiredEvidence: ["Independent event account", "Jamie attribution", "Public-safety and access boundary"],
      boundaries: ["Describe a participatory screening, not restoration or ownership.", "Do not infer access terms, attendance, or measured impact."],
      antiClaims: ["Jamie restored the tunnel", "Jamie permanently opened it", "Impact was measured"],
      counterevidencePosture: "Add current access, safety, and media-rights context before any public feature.",
      sourceIndependenceNote: "KCUR independently documents the program; a collaborator post supports source association.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION"],
      promotionDecisionIds: ["DEC-URBANHERM-EIGHTH-STREET-TUNNEL-HOLD"],
      targetCanonicalClaimId: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
      updatedAt: reviewedAt
    },
    {
      id: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION",
      projectIds: [...projectIds, "PRJ-TIRED-OF-TIRES"],
      proposition: "Jamie directly participated in recurring TiredOfTires fieldwork, including a documented dump-truck pickup shift around Northeast Kansas City.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      requiredEvidence: ["First-hand participant account", "Project-account corroboration", "Sole-credit boundary"],
      boundaries: ["This supports direct participation, not sole program ownership, full coordination, every shift, or aggregate metrics."],
      antiClaims: ["Jamie alone ran TiredOfTires", "Jamie collected every reported tire", "Program totals are independently audited"],
      counterevidencePosture: "Integrate collaborator, municipal, and disposal records while retaining collective credit.",
      sourceIndependenceNote: "A participant account directly corroborates one shift; the project account separately names Jamie in the recurring workflow.",
      researchTaskIds: [taskId, "TASK-URBANHERM-X-SOURCE-MATURATION", "TASK-TIRED-OF-TIRES-ROLE-METRICS"],
      promotionDecisionIds: ["DEC-URBANHERM-TIRE-PICKUP-HOLD"],
      targetCanonicalClaimId: "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    { id: "EVT-URBANHERM-PUBLIC-RECORD-HELD", candidateClaimId: "CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", toMaturity: "held", occurredAt: reviewedAt, actor: "Codex archival-production review", reason: "The population is exact for the live profile but a personal timeline needs an editorial purpose and owner-archive reconciliation before public projection.", decisionId: "DEC-URBANHERM-PUBLIC-WORKING-SURFACE-HOLD" },
    { id: "EVT-URBANHERM-HORSE-LORDS-HELD", candidateClaimId: "CND-URBANHERM-HORSE-LORDS-VIDEO", toMaturity: "held", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "The claim is strong knowledge-bank depth; rights and current editorial fit remain open.", decisionId: "DEC-URBANHERM-HORSE-LORDS-HOLD" },
    { id: "EVT-URBANHERM-TUNNEL-HELD", candidateClaimId: "CND-URBANHERM-EIGHTH-STREET-TUNNEL", toMaturity: "held", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "The claim is supported but needs present access, safety, media, and audience context before site use.", decisionId: "DEC-URBANHERM-EIGHTH-STREET-TUNNEL-HOLD" },
    { id: "EVT-URBANHERM-TIRES-HELD", candidateClaimId: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION", toMaturity: "held", occurredAt: reviewedAt, actor: "Codex public-source review", reason: "Direct participation is corroborated, but current hiring-site composition does not need another KC Town Hall proof point.", decisionId: "DEC-URBANHERM-TIRE-PICKUP-HOLD" }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: taskId,
      candidateClaimIds: ["CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", "CND-URBANHERM-HORSE-LORDS-VIDEO", "CND-URBANHERM-EIGHTH-STREET-TUNNEL", "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION"],
      question: "Can every record counted by the live @urbanhermit profile be reviewed and converted into public-safe knowledge without publishing a reconstructable personal timeline?",
      status: "completed",
      priority: "urgent",
      methods: ["Authenticated Posts and Replies traversal", "Repeated no-growth stopping rule", "Deduplication and relationship classification", "Year-bounded incoming search", "Aggregate-only public mutation", "Independent source close reading"],
      sourceIds: ["SRC-URBANHERM-X-PROFILE-2026-07-15", "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29", "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15", "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01"],
      observationIds: ["OBS-URBANHERM-X-POPULATION-RECONCILIATION", "OBS-URBANHERM-X-COMPOSITION-AND-LINKS", "OBS-URBANHERM-X-STAKEHOLDER-SAMPLE", "OBS-URBANHERM-X-VISIBLE-COUNTERS-HELD", "OBS-URBANHERM-HORSE-LORDS-CO-CREDIT", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM", "OBS-URBANHERM-TIRE-PICKUP-PARTICIPATION", "OBS-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-CONTEXT"],
      findings: ["All 434 live profile-counted records were reviewed with zero recovery gap.", "The public fixture retains exact aggregate accountability without raw text or item-level personal history.", "Three narrow accomplishment families crossed the source threshold and remain held from the site."],
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
      sourceIds: Object.values({ npr: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29", kcur: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15", tires: "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01", nightlife: "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-22" }),
      observationIds: ["OBS-URBANHERM-HORSE-LORDS-CO-CREDIT", "OBS-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM", "OBS-URBANHERM-TIRE-PICKUP-PARTICIPATION", "OBS-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-CONTEXT"],
      findings: ["NPR supplies direct collaborative credit.", "KCUR supplies an independent participatory-program account.", "A participant record narrows TiredOfTires role uncertainty to direct participation.", "Brooklyn Eagle adds coalition and Council chronology but no Jamie-specific attribution."],
      limitations: ["Most destinations remain inventoried rather than close-read.", "A posted URL alone does not establish authorship, endorsement, participation, or impact."],
      nextActions: ["Resolve high-value project URLs", "Recover archived copies of dead destinations", "Add claims only after source-level boundary review"],
      openedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    { id: "DEC-URBANHERM-PUBLIC-WORKING-SURFACE-HOLD", candidateClaimId: "CND-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE", decision: "hold", rationale: "The aggregate census is valuable knowledge-bank infrastructure, but a personal social timeline is not current job-application copy.", evidenceThreshold: "Owner-archive reconciliation plus an audience-specific editorial reason.", decidedAt: reviewedAt, decidedBy: ["Codex archival-production review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", allowedSurfaces: ["research-brief"], guardrails: ["No public item-level timeline", "No social activity as impact", "No new public route"] },
    { id: "DEC-URBANHERM-HORSE-LORDS-HOLD", candidateClaimId: "CND-URBANHERM-HORSE-LORDS-VIDEO", decision: "hold", rationale: "The shared credit is strong, but current site composition and media rights do not justify projection yet.", evidenceThreshold: "Audience fit, collaborator role confirmation where useful, and rights-aware media treatment.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", allowedSurfaces: ["research-brief"], guardrails: ["Always credit M.C. Schmidt", "Do not imply sole creation", "Do not embed uncleared media"] },
    { id: "DEC-URBANHERM-EIGHTH-STREET-TUNNEL-HOLD", candidateClaimId: "CND-URBANHERM-EIGHTH-STREET-TUNNEL", decision: "hold", rationale: "The event is well supported but needs a purposeful portfolio composition and current safety and media context.", evidenceThreshold: "Audience fit, rights-cleared media, and explicit present-day access and safety framing.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", allowedSurfaces: ["research-brief"], guardrails: ["Do not claim restoration or ownership", "Do not imply unrestricted access", "No attendance or impact claims"] },
    { id: "DEC-URBANHERM-TIRE-PICKUP-HOLD", candidateClaimId: "CND-URBANHERM-TIRE-PICKUP-PARTICIPATION", decision: "hold", rationale: "The narrow direct-participation claim is corroborated, but the current KC Town Hall case study already carries the more relevant implementation narrative.", evidenceThreshold: "An audience need for field-operations detail and continued collective-credit review.", decidedAt: reviewedAt, decidedBy: ["Codex public-source review"], reviewAuthority: "research-review", humanReviewStatus: "not-required", allowedSurfaces: ["research-brief"], guardrails: ["Direct participation only", "No sole ownership", "No unaudited metrics"] }
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
    mediaLeadIds: [],
    pageClaimExclusions: []
  }] satisfies KnowledgeLifecycle["editorialBriefs"],

  proofSurfaceManifests: [] satisfies KnowledgeLifecycle["proofSurfaceManifests"],
  mediaLeads: [] satisfies KnowledgeLifecycle["mediaLeads"]
};
