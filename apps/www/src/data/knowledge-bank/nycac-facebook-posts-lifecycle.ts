import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-16";
const projectIds = ["PRJ-NYC-ARTIST-COALITION"];
const entityIds = [
  "ENT-JAMIE-BURKART",
  "ENT-NYC-ARTIST-COALITION",
  "ENT-NYC-COUNCIL",
  "ENT-OFFICE-NIGHTLIFE",
  "ENT-CABARET-LAW",
  "ENT-MARCH",
];

const authorshipTaskId = "TASK-NYCAC-FACEBOOK-HUMAN-AUTHORSHIP";
const engagementTaskId = "TASK-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT";
const sourceTaskId = "TASK-NYCAC-FACEBOOK-SOURCE-PRESERVATION";
const versioningTaskId = "TASK-NYCAC-FACEBOOK-EXPORT-VERSIONING";

export const nycacFacebookPostLifecycle = {
  leads: [
    {
      id: "LEAD-NYCAC-FACEBOOK-POST-FULL-POPULATION",
      title: "NYC Artist Coalition Facebook Published-post population",
      kind: "document",
      capturedAt: reviewedAt,
      capturedBy: "Jamie Burkart and Codex authenticated archival-production review",
      state: "extracted",
      visibility: "public-safe",
      publicSummary:
        "A public-safe corpus accounts for all 444 rows in five annual Meta Published exports for the surviving 2017-2021 chronology, including source routes, overlapping mission and stakeholder-reference patterns, bounded metrics, and explicit shared-authorship limits.",
      publicUrl: "https://www.facebook.com/nycartc/",
      projectAssociationStatus: "assigned",
      projectIds,
      entityIds,
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
        "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
        "SRC-NYCAC-FACEBOOK-PAGE-2026-07-16",
        "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
        "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
        "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
      ],
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
        "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
        "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      ],
      researchTaskIds: [
        authorshipTaskId,
        engagementTaskId,
        sourceTaskId,
        versioningTaskId,
      ],
      nextAction:
        "Close-read the 56 inventory-only routes and seek collaborator or native publisher evidence without weakening collective credit or exposing protected platform data.",
    },
  ] satisfies KnowledgeLifecycle["leads"],

  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-OWNER-EXPORT-POPULATION",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
      projectIds,
      entityIds: ["ENT-NYC-ARTIST-COALITION"],
      statement:
        "Five annual Meta Business Suite Published exports contain 444 rows and 444 unique post IDs: 185 in 2017, 74 in 2018, 111 in 2019, 69 in 2020, and five in 2021.",
      locator: "Corpus sections populationReconciliation and ownerExportReconciliation",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "every post ever created",
        "deleted-post recovery",
        "the historical human publisher of each row",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
          evidenceRole: "direct-support",
          supports: "The native export denominator accounts for every surviving Published row across every nonempty year.",
          limitations: [
            "Export completeness is bounded to records Meta retained and returned on July 15, 2026.",
          ],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-FEED-RECONCILIATION",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
      projectIds,
      entityIds: ["ENT-NYC-ARTIST-COALITION"],
      statement:
        "A terminal authenticated Page-feed traversal independently reconciled to 444 distinct posts after 154 duplicate or embedded render variants were removed from 598 encountered rows.",
      locator: "Protected traversal controls and public corpus section populationReconciliation",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "records deleted or hidden before capture",
        "complete unpublished or private history",
        "human publisher identity",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
          evidenceRole: "corroborating",
          supports: "The separate Page-feed surface reconciles to the same 444-record denominator.",
          limitations: [
            "The control is a surviving-feed crosscheck, not a deletion or unpublished-content history.",
          ],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-MISSION-AND-CIVIC-PATTERNS",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
      projectIds,
      entityIds,
      statement:
        "Overlapping classifications identify 191 cultural-space survival rows, 76 Cabaret Law rows, 65 M.A.R.C.H. accountability rows, 48 commercial-rent rows, 30 relief rows, 29 nightlife-governance rows, and 18 cultural-policy rows; 66 rows reference Council or elected-official subjects and 66 reference enforcement or regulatory agencies.",
      locator: "Corpus sections missionSummary and stakeholderSummary",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "mutually exclusive campaign totals",
        "incoming engagement by named stakeholders",
        "endorsement, partnership, mandate, causality, or policy impact",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-CIVIC-RELAY"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
          evidenceRole: "direct-support",
          supports: "The complete row-level classifications show recurring issue continuity and civic routing across several advocacy arcs.",
          limitations: [
            "References and overlapping tags do not establish incoming stakeholder action or causal effect.",
          ],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POST-CORPUS-ROUTES",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
      projectIds,
      entityIds: ["ENT-NYC-ARTIST-COALITION"],
      statement:
        "The corpus preserves 67 distinct off-Facebook routes: 65 public exact routes, two withheld sensitive routes, nine governed source routes, and 56 inventory-only research routes.",
      locator: "Corpus sections postedUrlSummary and postedUrlInventory",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "the truth of every linked proposition",
        "authorship or endorsement by a linked organization",
        "readership, clicks, conversion, adoption, or impact",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD", "CND-NYCAC-FACEBOOK-CIVIC-RELAY"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
          evidenceRole: "direct-support",
          supports: "The complete route inventory preserves the Page's source and action-routing functions.",
          limitations: ["Fifty-six routes remain research leads rather than close-read evidence."],
        },
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
          evidenceRole: "direct-support",
          supports: "The route classes connect campaign, meeting, public-information, practical-resource, government, fundraising, and issue-context destinations.",
          limitations: ["Distribution is not endorsement, adoption, or causality."],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-PUBLISHED-SOURCE-CONTEXT",
      sourceId: "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
      projectIds,
      entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-NYC-COUNCIL", "ENT-MARCH"],
      statement:
        "Grub Street independently reported community support for Ode to Babel and identified NYC Artist Coalition, Hell's Kitchen Democrats, Stephen Levin, and Rafael Espinal among those protesting M.A.R.C.H. raids and transparency gaps.",
      locator: "Canonical article, paragraphs describing the raid and public protest",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "Jamie's individual role",
        "sole coalition causation",
        "the complete coalition division of labor",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-CIVIC-RELAY"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
          evidenceRole: "corroborating",
          supports: "Independent reporting confirms one mission-relevant coalition-and-government interface preserved in the Page's source trail.",
          limitations: ["The article does not attribute the work to Jamie individually."],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
      projectIds,
      entityIds: ["ENT-NYC-ARTIST-COALITION"],
      statement:
        "The July 15 owner exports display 2,589 reactions, 295 comments, 552 shares, a 48,044 sum of row-level reach, and 2,190 clicks across the 444-row denominator; the live Page separately displayed a rounded 1.5K followers on July 16.",
      locator: "ownerExportReconciliation.metricSnapshot and dated live Page source",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "unique people",
        "stakeholder identity",
        "historical peak engagement",
        "attendance, conversion, endorsement, mandate, or policy impact",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
          evidenceRole: "direct-support",
          supports: "The native exports provide a complete dated metric snapshot for the same 444-row denominator.",
          limitations: [
            "Summed post reach and action totals are not unique-person or stakeholder-group measures.",
            "The separate rounded follower display must not be combined with export metrics.",
          ],
        },
      ],
      reviewedAt,
    },
    {
      id: "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY",
      sourceId: "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
      projectIds,
      entityIds: ["ENT-JAMIE-BURKART", "ENT-NYC-ARTIST-COALITION"],
      statement:
        "Jamie remembers predominantly using the Page while believing other collaborators also used it; neither the exports nor current custody identify the historical human publisher of every post.",
      locator: "Dated first-person statement and authenticated source-field review",
      evidenceRole: "supports-boundary",
      certainty: "moderate",
      doesNotEstablish: [
        "the publisher of any specific row",
        "a quantitative publishing share",
        "sole administration, sole authorship, or sole campaign leadership",
      ],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD", "CND-NYCAC-FACEBOOK-CIVIC-RELAY"],
      candidateRelationships: [
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
          evidenceRole: "supports-boundary",
          supports: "The unresolved human-publisher field keeps the record collective.",
          limitations: ["Jamie's first-person memory remains a research lead, not post-level attribution."],
        },
        {
          candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
          evidenceRole: "supports-boundary",
          supports: "The shared-account record supports coalition infrastructure rather than sole-person authorship.",
          limitations: ["Current management access does not establish historical exclusivity."],
        },
      ],
      reviewedAt,
    },
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
      projectIds,
      proposition:
        "Five annual Published exports and the terminal Page feed preserve a 444-post public operating record of NYC Artist Coalition's campaign continuity and source routing from 2017 through 2021.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-NYCAC-FACEBOOK-OWNER-EXPORT-POPULATION",
        "OBS-NYCAC-FACEBOOK-FEED-RECONCILIATION",
        "OBS-NYCAC-FACEBOOK-POST-CORPUS-ROUTES",
        "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY",
      ],
      requiredEvidence: [
        "Complete annual Published exports",
        "Unique private identity reconciliation",
        "Terminal feed crosscheck",
        "Public-safe 444-row disposition ledger",
      ],
      boundaries: [
        "Complete means every row Meta retained and returned, not every post ever created.",
        "The shared account does not assign every post to Jamie.",
        "Protected post bodies, platform IDs, comments, and identities remain unpublished.",
      ],
      antiClaims: [
        "NYC Artist Coalition made exactly 444 Facebook posts in its lifetime",
        "Jamie authored all 444 posts",
        "the operating record proves policy impact",
      ],
      counterevidencePosture:
        "Version future owner exports and collaborator records as corrections or refinements without silently erasing this dated denominator.",
      sourceIndependenceNote:
        "The denominator and reconciliation do not depend on Jamie's memory; the human-authorship boundary does.",
      researchTaskIds: [authorshipTaskId, sourceTaskId, versioningTaskId],
      promotionDecisionIds: ["DEC-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
      updatedAt: reviewedAt,
    },
    {
      id: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
      projectIds,
      proposition:
        "The recovered Page operated as collective civic communications infrastructure connecting cultural-space experience with campaigns, meetings, government interfaces, source articles, practical resources, and policy developments.",
      maturity: "promoted",
      confidence: "high",
      observationIds: [
        "OBS-NYCAC-FACEBOOK-MISSION-AND-CIVIC-PATTERNS",
        "OBS-NYCAC-FACEBOOK-POST-CORPUS-ROUTES",
        "OBS-NYCAC-FACEBOOK-PUBLISHED-SOURCE-CONTEXT",
        "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY",
      ],
      requiredEvidence: [
        "Complete row-level mission classifications",
        "Complete public-safe route inventory",
        "Stakeholder-reference boundary",
        "Selected close-read independent sources",
      ],
      boundaries: [
        "This is collective communications infrastructure, not Jamie's sole-authored feed.",
        "Stakeholder references are not incoming engagement, endorsement, partnership, mandate, or policy impact.",
        "Posted sources establish routing before they establish independent corroboration.",
      ],
      antiClaims: [
        "Every referenced official engaged with or endorsed NYC Artist Coalition",
        "The Facebook Page caused the policy outcomes it discussed",
        "Every linked article covered the coalition",
      ],
      counterevidencePosture:
        "Use independent stakeholder, event, and policy records to strengthen or narrow specific outcome claims while preserving the Page's distribution role.",
      sourceIndependenceNote:
        "The complete account record supports publishing structure; external sources independently establish only their own reported contexts.",
      researchTaskIds: [authorshipTaskId, engagementTaskId, sourceTaskId],
      promotionDecisionIds: ["DEC-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTE"],
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
      updatedAt: reviewedAt,
    },
    {
      id: "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      projectIds,
      proposition:
        "The July 15, 2026 owner exports preserve a complete capture-date metric snapshot for the 444 exported posts.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT"],
      requiredEvidence: [
        "Complete export denominator",
        "Explicit metric definitions",
        "Unique-person and stakeholder-identity boundaries",
      ],
      boundaries: [
        "Summed post reach is not unique people.",
        "Action counts do not identify stakeholder groups.",
        "The values are capture-date metrics, not historical peaks or outcomes.",
      ],
      antiClaims: [
        "48,044 unique people saw the posts",
        "3,436 unique people engaged",
        "Council members produced the aggregate interactions",
        "the metrics prove attendance, endorsement, adoption, or impact",
      ],
      counterevidencePosture:
        "Preserve future native exports as versioned snapshots and never overwrite the July 2026 values silently.",
      sourceIndependenceNote:
        "The metrics come directly from the owner export, but their meaning remains bounded by Meta's row-level definitions.",
      researchTaskIds: [engagementTaskId, versioningTaskId],
      promotionDecisionIds: ["DEC-NYCAC-FACEBOOK-METRICS-HOLD"],
      updatedAt: reviewedAt,
    },
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    {
      id: "EVT-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTED",
      candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
      toMaturity: "promoted",
      occurredAt: reviewedAt,
      actor: "Jamie Burkart and Codex authenticated archival review",
      reason: "Five complete annual exports, unique-row reconciliation, and a terminal feed crosscheck support the bounded operating-record claim.",
      decisionId: "DEC-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTE",
    },
    {
      id: "EVT-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTED",
      candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
      toMaturity: "promoted",
      occurredAt: reviewedAt,
      actor: "Jamie Burkart and Codex source review",
      reason: "Complete classifications, route inventory, and close-read context support a collective civic-publication claim with explicit engagement boundaries.",
      decisionId: "DEC-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTE",
    },
    {
      id: "EVT-NYCAC-FACEBOOK-METRICS-HELD",
      candidateClaimId: "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      toMaturity: "held",
      occurredAt: reviewedAt,
      actor: "Codex public-safety and Chad-lens review",
      reason: "The metrics are reproducible bank depth but impose more interpretive burden than they add to current accomplishment messaging.",
      decisionId: "DEC-NYCAC-FACEBOOK-METRICS-HOLD",
    },
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: authorshipTaskId,
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
        "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
      ],
      question:
        "What can collaborator testimony or native publisher metadata establish about account creation, identity design, and period-specific Page stewardship?",
      status: "in-progress",
      priority: "high",
      methods: [
        "Invite collaborators to confirm, refine, or contest Jamie's predominant-use memory.",
        "Search authorized owner data for human-publisher metadata without publishing private identities.",
        "Keep account creation, project identity, post drafting, Page publishing, and campaign leadership distinct.",
      ],
      actions: ["corroboration", "metadata-review"],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
        "SRC-NYCAC-FACEBOOK-PAGE-2026-07-16",
      ],
      observationIds: ["OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY"],
      findings: [
        "Jamie remembers predominant but shared Page use.",
        "The current surfaces do not expose historical post-level human publisher identity.",
      ],
      limitations: [
        "Current custody does not prove historical exclusivity.",
        "Memory does not assign a publisher to a specific post or quantify publishing share.",
      ],
      nextActions: [
        "Request bounded collaborator proof notes.",
        "Review any native Page-role or publishing history that becomes available.",
      ],
      openedAt: reviewedAt,
    },
    {
      id: engagementTaskId,
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
        "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      ],
      question:
        "Can lawful, identity-complete records establish incoming engagement by Council members, agencies, cultural spaces, press, or other mission-relevant stakeholder groups?",
      status: "open",
      priority: "high",
      methods: [
        "Acquire an owner-authorized reaction, comment, or share export if Meta exposes one.",
        "Define a complete identity denominator and classification protocol before reporting group counts.",
        "Keep Page references, platform actions, formal participation, endorsement, and policy action distinct.",
      ],
      actions: ["metadata-review", "corroboration"],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
        "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
      ],
      observationIds: [
        "OBS-NYCAC-FACEBOOK-MISSION-AND-CIVIC-PATTERNS",
        "OBS-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      ],
      findings: [
        "The current export establishes aggregate actions but not a complete identity denominator for incoming stakeholder groups.",
        "No defensible stakeholder-engagement count is established by this pass.",
      ],
      limitations: [
        "The current export contains aggregate actions but no complete stakeholder-identity layer.",
        "Page-authored references are outbound routing, not inbound engagement.",
      ],
      nextActions: [
        "Research Meta's current owner-data options for privacy-safe actor-level export.",
        "Retain incoming stakeholder engagement as unmeasured until coverage is explicit.",
      ],
      openedAt: reviewedAt,
    },
    {
      id: sourceTaskId,
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
        "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
      ],
      question:
        "Which of the 56 inventory-only routes can be recovered, preserved, and decomposed into stronger source-backed claims?",
      status: "in-progress",
      priority: "high",
      methods: [
        "Resolve each route or a stable archive.",
        "Record author, organization, date, source type, evidence role, and preservation state.",
        "Promote only propositions the linked source itself establishes.",
      ],
      actions: ["public-source-research", "source-close-read", "claim-decomposition"],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
        "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
        "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
        "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
      ],
      observationIds: [
        "OBS-NYCAC-FACEBOOK-POST-CORPUS-ROUTES",
        "OBS-NYCAC-FACEBOOK-PUBLISHED-SOURCE-CONTEXT",
      ],
      findings: [
        "Nine routes have governed sources.",
        "Fifty-six public routes remain an explicit close-reading queue.",
        "Two sensitive exact routes remain withheld.",
      ],
      limitations: [
        "A posted source is evidence of distribution before it is evidence for the source's propositions.",
        "Not rechecked is distinct from dead, live, or historically nonexistent.",
      ],
      nextActions: [
        "Work through the queue by mission relevance and source independence.",
        "Associate each recovered proposition with a current canonical source ID.",
      ],
      openedAt: reviewedAt,
    },
    {
      id: versioningTaskId,
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
        "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      ],
      question:
        "How does the available Published population and its metric state change across future owner-export snapshots?",
      status: "open",
      priority: "medium",
      methods: [
        "Repeat the annual Published export on a dated cadence.",
        "Compare hashed post-ID sets, annual counts, visibility states, and aggregate metrics.",
        "Record platform-retention or deletion changes as versioned corrections.",
      ],
      actions: ["metadata-review", "corroboration"],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026-07-15",
        "SRC-NYCAC-FACEBOOK-POST-OWNER-RESEARCH-2026-07-15",
      ],
      observationIds: [
        "OBS-NYCAC-FACEBOOK-OWNER-EXPORT-POPULATION",
        "OBS-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      ],
      findings: [
        "The July 2026 snapshot is the first governed baseline for future comparison.",
        "No longitudinal change is established until a later owner export is reconciled.",
      ],
      limitations: [
        "Platform retention and metric values can change after the July 2026 snapshot.",
        "Raw exports must remain protected.",
      ],
      nextActions: [
        "Schedule a dated future export comparison.",
        "Record denominator drift without overwriting the prior snapshot.",
      ],
      openedAt: reviewedAt,
    },
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    {
      id: "DEC-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTE",
      candidateClaimId: "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
      decision: "promote",
      rationale:
        "The five native exports, unique-row accounting, terminal feed reconciliation, and complete public-safe ledger support a bounded operating-record claim.",
      evidenceThreshold:
        "Every retained Published row, every nonempty year, unique identity accounting, terminal crosscheck, and explicit lifetime-history boundary.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
      allowedSurfaces: [
        "knowledge-bank",
        "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md",
      ],
      guardrails: [
        "Say surviving Published-export population, not lifetime total.",
        "Keep the shared Page collective.",
        "Do not publish raw posts or platform identities.",
      ],
    },
    {
      id: "DEC-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTE",
      candidateClaimId: "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
      decision: "promote",
      rationale:
        "Complete classifications and route accounting support a collective civic-publication interpretation, while independent sources corroborate selected contexts.",
      evidenceThreshold:
        "Full-population mission classification, complete route inventory, source close reads, and explicit stakeholder-engagement and authorship boundaries.",
      decidedAt: reviewedAt,
      decidedBy: ["Jamie Burkart", "Codex source review"],
      reviewAuthority: "jamie-approved",
      humanReviewStatus: "approved",
      humanReviewer: "Jamie Burkart",
      targetCanonicalClaimId: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
      allowedSurfaces: [
        "knowledge-bank",
        "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md",
      ],
      guardrails: [
        "Describe collective communications infrastructure.",
        "Do not convert references into incoming engagement.",
        "Do not convert distribution into endorsement or causality.",
      ],
    },
    {
      id: "DEC-NYCAC-FACEBOOK-METRICS-HOLD",
      candidateClaimId: "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
      decision: "hold",
      rationale:
        "The metric snapshot is reproducible archive depth, but its reader burden and unique-person ambiguity outweigh its current portfolio value.",
      evidenceThreshold:
        "Complete native metric denominator plus explicit definitions, stakeholder-identity limits, and non-unique reach treatment.",
      decidedAt: reviewedAt,
      decidedBy: ["Codex public-safety and Chad-lens review"],
      reviewAuthority: "research-review",
      humanReviewStatus: "not-required",
      allowedSurfaces: ["knowledge-bank"],
      guardrails: [
        "Keep capture date attached.",
        "Never describe summed reach or action totals as unique people.",
        "Do not infer stakeholder groups or impact.",
      ],
    },
  ] satisfies KnowledgeLifecycle["promotionDecisions"],
};
