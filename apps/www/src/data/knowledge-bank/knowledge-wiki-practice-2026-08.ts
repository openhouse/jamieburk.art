import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-21";
const intakeId = "INTAKE-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026-08-21";
const practiceSourceId = "SRC-KNOWLEDGE-WIKI-GRAPH-PRACTICE-REVIEW-2026-08-21";
const notingSourceId = "SRC-NOTING-US-PRACTICE-REVIEW-2026-08-21";
const practiceClaimId = "CLM-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026";
const lineageClaimId = "CLM-NOTING-US-KNOWLEDGE-WIKI-LINEAGE-2026";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Knowledge Wiki Graph practice public representation",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and governed ecosystem review",
    projectIds: ["source-backed-team-memory", "knowledge-wiki-ecosystem"],
    reason:
      "Represent the cross-repository Knowledge Wiki Graph practice in the portfolio without exposing protected sources or turning the site into an architecture manual.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [practiceSourceId, notingSourceId],
    observationIds: [
      "OBS-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026",
      "OBS-NOTING-US-TRUST-LOOP-2026"
    ],
    researchInquiryIds: [],
    boundaries: [
      "Describe the shared operating pattern, not protected repository names, locators, source bodies, or credentials.",
      "Present Noting.us as an earlier prototype and research lineage, not a production adoption or completed client implementation.",
      "Automated checks preserve contracts; they do not establish truth, consent, rights, editorial approval, or hiring outcomes."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026",
    intakeId,
    sourceId: practiceSourceId,
    comparisonSourceIds: [],
    project: "knowledge-wiki-ecosystem",
    kind: "bounded-inference",
    text:
      "Across the reviewed repository roles, the recurring operating contract separates the source graph, evidence graph, and semantic graph, then composes recipient-specific public or private projections through explicit review gates.",
    locator: "Public-safe multi-repository review dated 2026-08-21",
    status: "verified",
    publicSafe: true,
    claimIds: [practiceClaimId],
    researchInquiryIds: [],
    limitations: [
      "This is a role-level synthesis, not a claim that every repository is synchronized or equally mature.",
      "The three-graph distinction remains an exploring architecture proposal; this public explanation does not advance RFC 0005."
    ]
  },
  {
    id: "OBS-NOTING-US-TRUST-LOOP-2026",
    intakeId,
    sourceId: notingSourceId,
    comparisonSourceIds: [],
    project: "source-backed-team-memory",
    kind: "source-fact",
    text:
      "The Noting.us prototype described a Markdown-first, wiki-backed team-memory trust loop from source artifact through stable segment, Markdown bundle, evaluations, human review, and export.",
    locator: "Summary-only review; protected repository locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [lineageClaimId],
    researchInquiryIds: [],
    limitations: [
      "The prototype does not establish production adoption, a completed client engagement, or a generally available service."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: practiceSourceId,
    title: "Knowledge Wiki Graph ecosystem public-practice review",
    organization: "openhouse",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Read-only role-level review completed 2026-08-21",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public portfolio repository containing the governed Knowledge Wiki, three-graph evaluation prototype, and selective public projections.",
    publicNote:
      "The review also considered public source editions and protected adjacent roles while withholding protected repository identities and locators.",
    supportsGenerally: [
      "source, evidence, and semantic graphs as separate authorities",
      "recipient-specific projection",
      "deterministic checks before human review"
    ],
    doesNotEstablish: [
      "RFC acceptance",
      "automatic cross-repository synchronization",
      "publication, consent, rights, or editorial approval"
    ]
  },
  {
    id: notingSourceId,
    title: "Noting.us architecture review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Summary-only architecture review completed 2026-08-21",
    accessedAt: reviewedAt,
    publicCitation:
      "Summary-only review of the earlier Noting.us Markdown-first source-to-review trust-loop prototype.",
    publicNote:
      "Repository locators, private fixtures, and protected project context remain withheld.",
    protectedLocatorId: "NOTING-US-PRACTICE-REVIEW-2026",
    supportsGenerally: [
      "Noting.us as a prototype predecessor",
      "source artifact to stable segment to Markdown bundle to evaluations to human review to export"
    ],
    doesNotEstablish: [
      "production adoption",
      "completed client implementation",
      "public source access"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: practiceClaimId,
    project: "knowledge-wiki-ecosystem",
    internalClaim:
      "Jamie is developing and applying a three-graph Knowledge Wiki practice that keeps the source graph, evidence graph, and semantic graph distinct, then composes recipient-specific projections through deterministic and human review gates.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I am developing and applying a three-graph Knowledge Wiki practice: sources, evidence, and meaning remain distinct, while each audience-facing output is a deliberate, human-reviewed projection.",
        status: "active",
        citationRequired: false,
        surfaces: ["/lab/source-backed-team-memory"]
      },
      {
        key: "archive-note",
        text:
          "This portfolio is one audience-specific projection of Jamie's Knowledge Wiki Graph practice: a source-backed system that keeps the source graph, evidence graph, and semantic graph distinct, then composes reviewed knowledge for a particular reader and purpose.",
        status: "active",
        citationRequired: false,
        surfaces: ["/colophon"]
      }
    ],
    evidence: [
      {
        sourceId: practiceSourceId,
        relationship: "direct-support",
        supports: [
          "three-graph operating distinction",
          "recipient-specific projection",
          "deterministic and human review gates"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe a developing practice and operating architecture, not a finished SaaS product or automatic truth system.",
      "Do not expose protected repository identities, locators, source bodies, or account state.",
      "Projection remains a human editorial decision rather than an automatic consequence of graph membership."
    ],
    antiClaims: [
      "Every repository is synchronized or one repository controls the entire ecosystem.",
      "Graph structure establishes truth, causation, consent, rights, credit, or publication permission.",
      "The system replaces human judgment or automatically produces an adequate public account."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "governed ecosystem review"]
  },
  {
    id: lineageClaimId,
    project: "source-backed-team-memory",
    internalClaim:
      "The current Knowledge Wiki Graph practice extends a source-to-review trust loop prototyped in Noting.us into a federated, project-by-project operating pattern.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The practice extends research first prototyped in Noting.us: source artifact to stable segment to Markdown bundle to evals to human review to export. The Knowledge Wiki Graph carries that trust loop into a federated, project-by-project system.",
        status: "active",
        citationRequired: false,
        surfaces: ["/lab/source-backed-team-memory"]
      }
    ],
    evidence: [
      {
        sourceId: notingSourceId,
        relationship: "private-support",
        supports: ["Noting.us trust-loop architecture and predecessor relationship"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Present lineage and architectural continuity, not production adoption, a completed client implementation, or a claim that the two systems are identical.",
      "Keep protected repository and project context outside the public surface."
    ],
    antiClaims: [
      "Noting.us was a production team-memory platform adopted by a client.",
      "The Knowledge Wiki Graph is merely a rename of Noting.us.",
      "The lineage establishes market validation."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "governed ecosystem review"]
  }
];

export const knowledgeWikiPracticeAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries: [] as KnowledgeBank["researchInquiries"]
};
