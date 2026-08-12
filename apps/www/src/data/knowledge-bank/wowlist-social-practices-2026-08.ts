import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-11";
const reviewedBy = ["Jamie Burkart", "Codex archival review"];

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    kind: "analysis-note",
    title: "WOW List social-practice and cross-project synergy synthesis",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex governed-archive review",
    projectIds: ["wowlist", "sunday-dinner", "nyc-artist-coalition"],
    reason: "Document how invitation, orientation, contribution, shared representation, circulation, convening, and continuation operated across WOW List and its adjacent social containers while retaining collective credit and publication gates.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026",
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27"
    ],
    observationIds: [
      "OBS-WOWLIST-RELATIONAL-CURATION-PUBLIC-WORKFLOW",
      "OBS-WOWLIST-RELATIONAL-CURATION-INDEPENDENT-TUTORIAL",
      "OBS-WOWLIST-RELATIONAL-CURATION-PROTECTED-PRACTICE",
      "OBS-SYNERGY-SUNDAY-DINNER-CONTAINER",
      "OBS-SYNERGY-WOWLIST-CONTAINER",
      "OBS-SYNERGY-NYCAC-CONTAINER"
    ],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    boundaries: [
      "Repository access, source visibility, rights, consent, collective credit, and publication authorization remain separate gates.",
      "Continuity across projects does not establish causation, inevitability, institutional succession, or sole authorship.",
      "Public and protected records document practices and structures without proving a uniform or equitable participant experience."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-WOWLIST-RELATIONAL-CURATION-PUBLIC-WORKFLOW",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
    comparisonSourceIds: ["SRC-WOWLIST-SUNDAY-DINNER-POST-2014"],
    project: "wowlist",
    kind: "bounded-inference",
    text: "Public provenance and support records connect Sunday Dinner calendars to an operating workflow of profiles, followed local lists, event contribution, and weekly email.",
    locator: "Public provenance and product-support posts",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-WOWLIST-RELATIONAL-CURATION"],
    researchInquiryIds: [],
    limitations: [
      "The account record does not establish the human author of every post.",
      "Public support exchanges are not a complete support or participant-experience census."
    ]
  },
  {
    id: "OBS-WOWLIST-RELATIONAL-CURATION-INDEPENDENT-TUTORIAL",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
    comparisonSourceIds: [],
    project: "wowlist",
    kind: "source-fact",
    text: "Shelby Turner's independently published tutorial preserves an organizer-facing WOW List learning artifact outside the builders' own support record.",
    locator: "Public YouTube video page and metadata",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-WOWLIST-RELATIONAL-CURATION"],
    researchInquiryIds: [],
    limitations: [
      "The tutorial does not establish platform-wide adoption or present product availability.",
      "The source does not establish equivalent onboarding for every participant."
    ]
  },
  {
    id: "OBS-WOWLIST-RELATIONAL-CURATION-PROTECTED-PRACTICE",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026",
    comparisonSourceIds: [],
    project: "wowlist",
    kind: "bounded-inference",
    text: "A governed private repository supports a bounded synthesis of hub facilitation, service-before-ask outreach, human onboarding, guest hosting, editorial work, meetings, explainable discovery, and shared maintenance.",
    locator: "Opaque summary-only federation record",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-WOWLIST-RELATIONAL-CURATION"],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    limitations: [
      "The underlying private sources are not public citations and are not reproduced in this repository.",
      "The synthesis does not authorize publication of people, communications, database rows, or media."
    ]
  },
  {
    id: "OBS-SYNERGY-SUNDAY-DINNER-CONTAINER",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
    comparisonSourceIds: [],
    project: "sunday-dinner",
    kind: "bounded-inference",
    text: "Public milestone evidence and protected aggregate review support Sunday Dinner as a recurring embodied container at 300-plus scale while participant rows remain private.",
    locator: "Public milestone page compared with existing protected aggregate controls",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY"],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    limitations: [
      "The evidence does not establish unique attendance, equitable experience, endorsement, or a complete lifetime census."
    ]
  },
  {
    id: "OBS-SYNERGY-WOWLIST-CONTAINER",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
    comparisonSourceIds: ["SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016"],
    project: "wowlist",
    kind: "bounded-inference",
    text: "WOW List publicly described its growth from Sunday Dinner calendars and exposed a distributed product workflow for following local lists, contributing events, and receiving weekly recommendations.",
    locator: "Public provenance and product-support posts",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY"],
    researchInquiryIds: [],
    limitations: [
      "Shared provenance does not make the projects identical or establish organizational succession.",
      "Product workflows do not prove participant outcomes."
    ]
  },
  {
    id: "OBS-SYNERGY-NYCAC-CONTAINER",
    intakeId: "INTAKE-WOWLIST-SOCIAL-PRACTICE-SYNTHESIS-2026",
    sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27",
    comparisonSourceIds: [],
    project: "nyc-artist-coalition",
    kind: "bounded-inference",
    text: "The January 2017 public event discussion preserves a transition into collective public agency through event mobilization, participatory naming, collaborative letter work, and a next coalition meeting.",
    locator: "Public event and discussion chronology",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY"],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    limitations: [
      "The record does not establish a legal founding vote, complete labor allocation, attendance, mandate, causation, or policy impact."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026",
    title: "Governed private WOW List knowledge repository",
    organization: "openhouse",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Governed repository synthesis reviewed 2026-08-11",
    accessedAt: reviewedAt,
    publicCitation: "Governed private WOW List knowledge repository, summary-only federation record.",
    publicNote: "The public-safe Wiki stores no repository URL, machine locator, personal data, raw communication, database row, or restricted media from this source.",
    protectedLocatorId: "REPO-WOWLIST-KNOWLEDGE-PROTECTED-2026",
    supportsGenerally: [
      "bounded social-practice synthesis",
      "source and coverage distinctions",
      "collective-credit and projection boundaries"
    ],
    doesNotEstablish: [
      "publication permission",
      "rights or consent for people or communications",
      "uniform participant experience",
      "public access to the private repository"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: "CLM-WOWLIST-RELATIONAL-CURATION",
    project: "wowlist",
    internalClaim: "WOW List joined editable event-discovery software to a repeatable practice of relational curation: invitation, orientation, contribution, shared representation, circulation, convening, and continuation.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "WOW List combined event-discovery software with relational curation and shared maintenance.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      { sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", relationship: "direct-support", supports: ["profiles", "followed local lists", "event contribution", "weekly email"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015", relationship: "corroborating", supports: ["independent organizer-facing learning artifact"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SBDIY-ADOPTION", relationship: "corroborating", supports: ["external local-organizer adoption"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026", relationship: "private-support", supports: ["facilitation", "onboarding", "editorial practice", "meetings", "maintenance", "source boundaries"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Use relational curation as an archival synthesis rather than a historical product slogan.",
      "Keep project credit shared with Richard Caceres and the wider field of contributors.",
      "Keep the private repository source out of rendered citations and public website surfaces."
    ],
    antiClaims: [
      "Every participant had a uniform experience of the intended practices.",
      "Public or archival visibility is consent to unrelated reuse or publication.",
      "Jamie Burkart was the sole author of WOW List or its community outcomes.",
      "Historical activity establishes current operation or causal impact."
    ],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY",
    project: "wowlist",
    internalClaim: "Sunday Dinner, WOW List, and NYC Artist Coalition used differently scaled containers for a recurring social-technical pattern of invitation, orientation, contribution, shared representation, circulation, convening, and continuation.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Sunday Dinner, WOW List, and NYC Artist Coalition reveal a bounded participation-practice continuity across gathering, discovery infrastructure, and collective public agency.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      { sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-200-2016", relationship: "direct-support", supports: ["recurring embodied gathering milestone"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", relationship: "direct-support", supports: ["shared Sunday Dinner provenance", "Richard and Jamie co-builder credit"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", relationship: "direct-support", supports: ["distributed discovery and contribution workflow"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27", relationship: "direct-support", supports: ["public-agency gathering", "participatory naming", "collaborative letter work", "collective formation"], confidence: "high", renderCitation: true }
    ],
    boundaries: [
      "Describe differently scaled containers and reusable methods without treating the projects as one organization.",
      "Retain collective credit and seek collaborator review for finer labor allocation.",
      "Treat participation and platform signals as bounded observations rather than attendance, endorsement, mandate, or impact."
    ],
    antiClaims: [
      "WOW List caused NYC Artist Coalition.",
      "The movement from Sunday Dinner to WOW List to NYC Artist Coalition was inevitable.",
      "Jamie Burkart was the sole founder, author, organizer, or cause of this collective lineage."
    ],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW"],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-WOWLIST-SOCIAL-PRACTICE-COLLABORATOR-REVIEW",
    project: "wowlist",
    question: "How do Richard Caceres, guest writers, editors, facilitators, local maintainers, and early NYC Artist Coalition collaborators describe the practice pattern and division of labor across Sunday Dinner, WOW List, Call Script, and coalition formation?",
    methods: [
      "Invite source-specific collaborator review without treating repository access as consent to publish.",
      "Separate recollection, contemporaneous public record, protected operating evidence, and later interpretation.",
      "Record confirmations, corrections, disagreements, and requested omissions as distinct evidence."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Current public and protected records support a bounded relational-curation and participation-continuity synthesis.",
      "Existing sources allocate some Jamie and Richard contributions but do not fully allocate collective labor across the lineage."
    ],
    limitations: [
      "No new collaborator testimony was collected for this synthesis.",
      "A repository invitation would not authorize quotation, identity publication, or projection of a collaborator's review."
    ],
    sourceIds: [
      "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026",
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27"
    ],
    publicSummary: "The source record supports a bounded synthesis while collaborator review remains necessary for finer attribution and correction.",
    protectedLocatorId: "INQUIRY-WOWLIST-SOCIAL-PRACTICE-COLLABORATORS-2026"
  }
];

export const wowListSocialPracticesAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
