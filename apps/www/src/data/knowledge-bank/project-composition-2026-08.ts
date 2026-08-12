import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-11";
const reviewedBy = ["Jamie Burkart", "Codex governed-archive review"];
const intakeId = "INTAKE-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM-2026";
const claimId = "CLM-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM";
const inquiryId = "INQ-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM-COLLABORATOR-REVIEW";
const campaignSourceId = "SRC-CAMPAIGN-SITE-REPOSITORY-FAMILY-2020-2022";

const observationIds = [
  "OBS-COMPOSITION-OPEN-HOUSE-COMMUNAL-FRAME",
  "OBS-COMPOSITION-GREAT-ACCOMMODATIONS-PUBLIC-PROGRAM",
  "OBS-COMPOSITION-SUNDAY-DINNER-WOWLIST-DIRECT-LINK",
  "OBS-COMPOSITION-CALLSCRIPT-CIVIC-BRIDGE",
  "OBS-COMPOSITION-196-RESIDENCY-ONBOARDING",
  "OBS-COMPOSITION-KCTH-LISTENING-FIELDWORK",
  "OBS-COMPOSITION-KCSPACES-ACTION-INFRASTRUCTURE",
  "OBS-COMPOSITION-CAMPAIGN-SITE-CODE-REUSE"
] as const;

const sourceIds = [
  "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
  "SRC-WATERWAYS-CHARLOTTE-STREET-2009",
  "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
  "SRC-CALLSCRIPT-FACEBOOK-PAGE",
  "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
  "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
  "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
  campaignSourceId
] as const;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Projects as a recomposable civic-cultural system",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex governed-archive review",
    projectIds: [
      "cross-project-system",
      "open-house",
      "great-accommodations",
      "sunday-dinner",
      "wowlist",
      "callscript",
      "nyc-artist-coalition",
      "196-sunday-dinner",
      "kc-town-hall",
      "kc-spaces-fund"
    ],
    reason: "Model how technical modules, social protocols, public artifacts, and stewardship practices can be decomposed and adapted across projects without converting chronology or resemblance into false lineage, causation, ownership, or impact claims.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [...sourceIds],
    observationIds: [...observationIds],
    researchInquiryIds: [inquiryId],
    boundaries: [
      "Distinguish documented transfer or a shared artifact from documented recurrence and from structural comparison.",
      "Adaptation is not duplication: every deployment must reopen purpose, authority, access, consent, credit, maintenance, and stop conditions.",
      "Repository access, private evidence, public visibility, publication authority, and measured community change remain separate states."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: observationIds[0],
    intakeId,
    sourceId: sourceIds[0],
    comparisonSourceIds: [],
    project: "open-house",
    kind: "source-fact",
    text: "A contemporary report documents Open House as an inhabited gallery frame using communal responsibility, changing participant use, institutional negotiation, and many-perspective documentation.",
    locator: "Public article and governed source note",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: ["This earlier component pattern does not by itself establish that later projects directly inherited it."]
  },
  {
    id: observationIds[1],
    intakeId,
    sourceId: sourceIds[1],
    comparisonSourceIds: [],
    project: "great-accommodations",
    kind: "source-fact",
    text: "The Great Accommodations record joins targeted outreach, community stories, interactive installations, public programs, facilitation, and working documentation.",
    locator: "Institutional project description and public-program record",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: ["The source establishes project components, not a measured community outcome or a direct transfer into every later project."]
  },
  {
    id: observationIds[2],
    intakeId,
    sourceId: sourceIds[2],
    comparisonSourceIds: ["SRC-FACEBOOK-SUNDAY-DINNER-200-2016"],
    project: "wowlist",
    kind: "source-fact",
    text: "WOW List's public provenance post credits Richard Caceres and Jamie Burkart and explicitly says the project grew from calendars made at Sunday Dinner.",
    locator: "Public WOW List provenance post",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["The post supports one documented lineage edge; it does not establish sole credit, organizational succession, or causation for later projects."]
  },
  {
    id: observationIds[3],
    intakeId,
    sourceId: sourceIds[3],
    comparisonSourceIds: ["SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026", "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27"],
    project: "callscript",
    kind: "bounded-inference",
    text: "The public record connects WOW List's popular.vote route to Call Script's civic-calendar identity and then documents early NYC Artist Coalition mobilization, participatory naming, collaborative letter work, and a next meeting.",
    locator: "Public project profile and event-discussion chronology",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["The sequence documents a bounded bridge, not sole authorship, complete labor allocation, coalition mandate, policy causation, or measured impact."]
  },
  {
    id: observationIds[4],
    intakeId,
    sourceId: sourceIds[4],
    comparisonSourceIds: ["SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025"],
    project: "196-sunday-dinner",
    kind: "bounded-inference",
    text: "Protected workflow artifacts document proposal review, acceptance, orientation, space configuration, independent access, invitations, response state, and follow-up as repeatable hosting and onboarding components across 196 Artists Residency and Sunday Dinner.",
    locator: "Public-safe summaries of protected workflow artifacts",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["The reviewed specimens do not establish that every resident or guest encountered the same workflow or consented to public identification."]
  },
  {
    id: observationIds[5],
    intakeId,
    sourceId: sourceIds[5],
    comparisonSourceIds: ["SRC-KCTH-FIELD-PRACTICE-REVIEW-2026"],
    project: "kc-town-hall",
    kind: "bounded-inference",
    text: "KC Town Hall records combine adaptive-reuse planning, physical fieldwork, a listening-driven survey process, resident-service routing, public-benefit documentation, funding presentation, compliance coordination, and bounded stewardship transition.",
    locator: "Protected proposal summary, public records, and governed field-practice review",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Listening intent and documented interfaces do not prove representative participation, consensus, completed redevelopment, funding receipt, or a direct lineage from the New York projects."]
  },
  {
    id: observationIds[6],
    intakeId,
    sourceId: sourceIds[6],
    comparisonSourceIds: ["SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026"],
    project: "kc-spaces-fund",
    kind: "source-fact",
    text: "The KC Spaces Fund archive preserves a collaborator-led mutual-aid campaign supported by a reusable campaign site, theme, fundraising display, deployment, and public action routes for applications, donations, contact, and funded-space updates.",
    locator: "Protected digital-infrastructure archive and public-safe campaign census",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Technical support does not establish organizer, publisher, fiscal-sponsor, applicant-review, grantmaking, or causal fundraising authority."]
  },
  {
    id: observationIds[7],
    intakeId,
    sourceId: sourceIds[7],
    comparisonSourceIds: ["SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026"],
    project: "campaign-site",
    kind: "source-fact",
    text: "A read-only comparison of the protected campaign-site repository family reproduced shared Git ancestry across KC Spaces Fund and later campaign instances, alongside reusable theme and fundraiser-display modules.",
    locator: "Opaque repository-family census; count and ancestry summary only",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Shared code history proves technical reuse, not shared organizers, positions, audiences, consent, outcomes, or authorization to expose repositories and infrastructure."]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: campaignSourceId,
    title: "Protected campaign-site repository-family census",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Read-only local Git comparison completed 2026-08-11",
    accessedAt: reviewedAt,
    publicCitation: "Protected repository-family census documenting shared Git ancestry and reusable campaign-site modules.",
    publicNote: "The public-safe layer records only the existence and bounded meaning of shared ancestry and modules; it exposes no repository path, remote, credential, configuration, or private campaign content.",
    protectedLocatorId: "ARCHIVE-CAMPAIGN-SITE-REPOSITORY-FAMILY-2026",
    supportsGenerally: [
      "shared Git ancestry across campaign instances",
      "reusable campaign theme and fundraiser-display modules",
      "literal technical component reuse distinct from social-practice analogy"
    ],
    doesNotEstablish: [
      "shared organizers or governance",
      "authorship of every campaign artifact",
      "publication permission for protected repositories",
      "causal community or fundraising impact"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "cross-project-system",
    internalClaim: "Across Jamie's artistic, hosting, software, coalition, neighborhood, mutual-aid, and archival projects, bounded evidence supports a recomposable system of technical modules and relationship-bearing practices whose transfer must be described by evidence tier and adapted to local authority, credit, consent, and maintenance conditions.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie's projects can be read as context-specific assemblies of reusable civic-cultural components spanning invitation, hosting, representation, circulation, collective action, resource routing, documentation, and stewardship.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      { sourceId: sourceIds[0], relationship: "context", supports: ["communal frame", "institutional negotiation", "multi-perspective documentation"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds[1], relationship: "context", supports: ["outreach", "public programs", "facilitation", "working documentation"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds[2], relationship: "direct-support", supports: ["explicit Sunday Dinner to WOW List lineage", "Richard and Jamie co-builder credit"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds[3], relationship: "direct-support", supports: ["popular.vote and Call Script bridge", "civic action interface"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds[4], relationship: "private-support", supports: ["residency onboarding workflow", "hosting and access components"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds[5], relationship: "private-support", supports: ["listening fieldwork", "public-benefit and service components"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds[6], relationship: "private-support", supports: ["campaign infrastructure", "action routes", "bounded implementation role"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds[7], relationship: "private-support", supports: ["shared Git ancestry", "theme and fundraiser-display reuse"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Label each relationship as documented transfer or shared artifact, documented component recurrence, or structural comparison.",
      "Treat adaptation as a new design and governance decision rather than automatic replication.",
      "Keep collective credit, institutional authority, community knowledge, and maintenance responsibility project-specific."
    ],
    antiClaims: [
      "Every project used the same blueprint.",
      "Structural resemblance alone establishes historical transmission between projects.",
      "Jamie Burkart was the sole author, organizer, or cause of the people, traditions, or collective work represented here.",
      "The presence of a reusable component proves adoption, equitable participation, community change, or causal impact.",
      "Repository access or archival custody authorizes publication of protected evidence."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project: "cross-project-system",
    question: "Which cross-project components were consciously adapted, which traveled through people or shared artifacts, and which are only later structural comparisons?",
    methods: [
      "Seek artifact-specific collaborator review and contemporaneous records for proposed transfer edges.",
      "Record confirmations, disagreements, omissions, and alternative lineages without averaging them into one story.",
      "Keep technical reuse, social-practice transmission, and comparable form as distinct relation types."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The Sunday Dinner to WOW List and WOW List/popular.vote to Call Script/NYCAC edges have public artifact support.",
      "The campaign-site repository family supplies direct technical-reuse evidence.",
      "Open House, Great Accommodations, 196 Artists Residency, KC Town Hall, and KC Spaces Fund supply documented component instances, but wider historical transmission remains partly interpretive."
    ],
    limitations: [
      "No new collaborator testimony was collected for this synthesis.",
      "Chronology and resemblance remain research prompts where no transfer artifact has been recovered."
    ],
    sourceIds: [...sourceIds],
    publicSummary: "Direct artifact links and documented component instances support a bounded composition model; further collaborator review is required before asserting additional lineage.",
    protectedLocatorId: "INQUIRY-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM-2026"
  }
];

export const projectCompositionAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
