import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-29";
const reviewedBy = ["Jamie Burkart", "Codex architecture review"];
const intakeId = "INTAKE-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const claimId = "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const rfcFiveSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0005-2026";
const rfcSixSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0006-2026";
const rfcNineSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0009-2026";
const rfcTenSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0010-2026";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Knowledge Wiki Graph ecosystem portfolio representation",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex architecture review",
    projectIds: ["knowledge-wiki-graph", "source-backed-team-memory"],
    reason:
      "Generalize the current cross-repository research architecture and Jamie's wiki-form proposition into a concise public explanation without exposing protected repository topology or presenting an evolving method as a completed product.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [rfcFiveSourceId, rfcSixSourceId, rfcNineSourceId, rfcTenSourceId],
    observationIds: [
      "OBS-KNOWLEDGE-WIKI-THREE-GRAPHS",
      "OBS-KNOWLEDGE-WIKI-FEDERATED-AUTHORITY",
      "OBS-KNOWLEDGE-WIKI-WIKI-FORM",
      "OBS-KNOWLEDGE-WIKI-OPERATING-CONTROL-PLANE"
    ],
    researchInquiryIds: [],
    boundaries: [
      "Repository roles and graph responsibilities are related but not interchangeable.",
      "The public portfolio explains the operating method without publishing a private repository inventory, source locators, or protected records.",
      "An audience-specific projection is a selected output, not another source of truth or permission to publish.",
      "A wiki form can expose the terms and history of a working agreement; it does not automatically produce truth, consensus, or authority.",
      "The operating control plane is an exploring instrumentation proposal, not evidence of adoption, authority, or a permanent health result."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-KNOWLEDGE-WIKI-THREE-GRAPHS",
    intakeId,
    sourceId: rfcFiveSourceId,
    comparisonSourceIds: [],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0005 distinguishes a semantic graph of meaning, an evidence graph of support and complication, and a source-custody layer for authoritative bytes and access conditions; it treats audience-specific projections as a fourth output.",
    locator: "RFC 0005, Summary and Terminology",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0005 remains an exploring design record and does not by itself authorize migration, source access, publication, deployment, or indexing."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-FEDERATED-AUTHORITY",
    intakeId,
    sourceId: rfcSixSourceId,
    comparisonSourceIds: [rfcFiveSourceId],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0006 defines a federated exchange in which repositories retain local authority, packets transport selected context without becoming canonical truth, and release remains a separate human decision.",
    locator: "RFC 0006, Summary, Repository roles, and Context packets",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0006 remains proposed; it records a protocol for review rather than proof of organization-wide adoption or a completed client system."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-WIKI-FORM",
    intakeId,
    sourceId: rfcNineSourceId,
    comparisonSourceIds: [rfcFiveSourceId, rfcSixSourceId],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0009 records Jamie's exploring proposition that a wiki form can provide a human-inspectable, source-backed medium for shared working memory among people, repositories, and agents while preserving provenance, plural context, disagreement, revision history, and human decision authority.",
    locator: "RFC 0009, Summary, Motivation, and Detailed design",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0009 records a design proposition for evaluation; it does not establish automatic factual agreement, production adoption, named-person endorsement, or authority for an agent or model to act."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-OPERATING-CONTROL-PLANE",
    intakeId,
    sourceId: rfcTenSourceId,
    comparisonSourceIds: [rfcFiveSourceId, rfcSixSourceId, rfcNineSourceId],
    project: "knowledge-wiki-graph",
    kind: "source-fact",
    text:
      "RFC 0010 proposes a complementary operating control plane that makes source-family coverage, operating state, perishable health, abstention, exact-candidate evaluation, and human decision authority inspectable without treating that layer as another source of truth.",
    locator: "RFC 0010, Summary, Goals, and Detailed design",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [],
    limitations: [
      "RFC 0010 remains exploring. Its deterministic instrumentation tests the proposal's guardrails but does not establish wider adoption, real-person review, or authorization to act."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: rfcFiveSourceId,
    title: "RFC 0005: Three-Layer Knowledge Graph and Governed Source Materialization",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/0bb9c74de8d774dd2be85f9b16c5e22e56096bfc/rfcs/0005-three-layer-knowledge-graph.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0005: Three-Layer Knowledge Graph and Governed Source Materialization, exploring design record, August 10, 2026.",
    publicNote:
      "The RFC documents the three graph responsibilities and projection boundary; its exploring status is part of the evidence.",
    supportsGenerally: [
      "semantic, evidence, and source-custody separation",
      "audience-specific projection as an output",
      "human authority over publication"
    ],
    doesNotEstablish: [
      "a completed migration",
      "a finished product",
      "client adoption",
      "permission to access or publish protected material"
    ]
  },
  {
    id: rfcSixSourceId,
    title: "RFC 0006: Federated Knowledge Exchange and Release Receipts",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-11",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/0bb9c74de8d774dd2be85f9b16c5e22e56096bfc/rfcs/0006-federated-knowledge-exchange-and-release-receipts.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0006: Federated Knowledge Exchange and Release Receipts, proposed design record, August 11, 2026.",
    publicNote:
      "The RFC documents federation, local repository authority, transport boundaries, and human release control; its proposed status is part of the evidence.",
    supportsGenerally: [
      "federated repository authority",
      "context packets as transport rather than truth",
      "release as a separate human decision"
    ],
    doesNotEstablish: [
      "a universal repository topology",
      "automatic publication authority",
      "a completed production deployment",
      "client adoption"
    ]
  },
  {
    id: rfcNineSourceId,
    title: "RFC 0009: Wiki Form for Shared Agentic Memory",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-24",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/work/2026-08-24-C/rfcs/0009-wiki-form-for-shared-agentic-memory.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0009: Wiki Form for Shared Agentic Memory, exploring design record, August 24, 2026.",
    publicNote:
      "The RFC records the wiki-form proposition, its research status, and its truth, authority, privacy, and named-lens boundaries.",
    supportsGenerally: [
      "wiki form as a human-inspectable source-backed medium",
      "shared working memory across plural human and agent contexts",
      "visible provenance, disagreement, revision, and human decision authority"
    ],
    doesNotEstablish: [
      "automatic truth or consensus",
      "production adoption",
      "named-person participation or endorsement",
      "agent or model authority to publish or act"
    ]
  },
  {
    id: rfcTenSourceId,
    title: "RFC 0010: Knowledge Wiki Operating Control Plane",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-29",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/work/2026-08-24-C/rfcs/0010-knowledge-wiki-operating-control-plane.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0010: Knowledge Wiki Operating Control Plane, exploring design record, August 29, 2026.",
    publicNote:
      "The RFC proposes source coverage, operating-state, perishable-health, abstention, and exact-candidate controls; its exploring status is part of the evidence.",
    supportsGenerally: [
      "source-family coverage and operating-state distinctions",
      "perishable candidate, situational, and strategic health",
      "deterministic-first evaluation, abstention, and human decision authority"
    ],
    doesNotEstablish: [
      "adoption of the control plane",
      "a permanent green health result",
      "real-person participation or endorsement",
      "model authority to publish or act"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "knowledge-wiki-graph",
    internalClaim:
      "Jamie is developing a federated Knowledge Wiki Graph practice: a human-inspectable, source-backed knowledge medium through which people, repositories, and agents can develop shared working memory without erasing provenance, plurality, disagreement, revision history, or human authority. The practice keeps semantic meaning, evidentiary support, and source custody distinct, then uses human review to compose audience-specific projections. An exploring operating control plane makes source coverage, operating state, perishable health, abstention, and exact-candidate decision boundaries inspectable.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I am developing a human-inspectable, source-backed Knowledge Wiki Graph through which people, repositories, and agents can build shared working memory while preserving provenance, plurality, and human authority. A deterministic-first operating control plane keeps source coverage, state, freshness, abstention, and the human decision boundary visible.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "/lab/source-backed-team-memory",
          "/colophon",
          "/work",
          "/about"
        ]
      },
      {
        key: "colophon",
        text:
          "The Knowledge Wiki Graph connects each public claim to evidence and keeps source coverage, status, correction, and human authority visible enough to review. Jamie decides what appears here and revises it when the record changes.",
        status: "active",
        citationRequired: true,
        surfaces: ["/colophon"]
      }
    ],
    evidence: [
      {
        sourceId: rfcFiveSourceId,
        relationship: "direct-support",
        supports: [
          "three separate graph responsibilities",
          "projection as a fourth output",
          "human publication authority"
        ],
        locator: "Summary and Terminology",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: rfcSixSourceId,
        relationship: "corroborating",
        supports: [
          "federated repository authority",
          "transport distinct from truth",
          "separate release decision"
        ],
        locator: "Summary, Repository roles, and Context packets",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: rfcNineSourceId,
        relationship: "direct-support",
        supports: [
          "wiki form as the social interface for shared working memory",
          "plural human and agent contexts",
          "visible provenance, disagreement, revision, and human authority"
        ],
        locator: "Summary, Motivation, and Detailed design",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: rfcTenSourceId,
        relationship: "direct-support",
        supports: [
          "source coverage and operating-state controls",
          "perishable health and abstention",
          "deterministic-first exact-candidate evaluation with human decision authority"
        ],
        locator: "Summary, Goals, and Detailed design",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Present this as current research and an operating method in development.",
      "Repository roles do not map one-to-one onto graph responsibilities.",
      "Do not expose protected repository topology, source locators, or private records.",
      "Do not imply a completed client deployment, production platform, market validation, or automatic trust.",
      "Present wiki form as a design proposition that makes working agreement inspectable, not as a mechanism that guarantees truth or consensus.",
      "Present the operating control plane as exploring instrumentation, not adopted organizational infrastructure or proof of outcomes."
    ],
    antiClaims: [
      "Every ecosystem repository corresponds to exactly one graph.",
      "The Knowledge Wiki Graph is a finished production platform.",
      "A client has adopted the system.",
      "Source access, evidence, interpretation, and publication permission are interchangeable.",
      "A context packet or successful eval authorizes release.",
      "The wiki form automatically produces truth, consensus, or factual agreement.",
      "An LLM, agent, named analytical lens, or passing evaluation has publication or decision authority.",
      "A passing result is permanently healthy after its candidate, situation, strategy, evidence, rights, or consent changes.",
      "Fictionalized model readers must issue a pass when the evidence is insufficient.",
      "Ward Cunningham, Maggie Appleton, or Yehuda Katz participated in, reviewed, approved, or endorsed this project."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const knowledgeWikiGraphEcosystemAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims
};
