import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-21";
const sharedMemoryReviewedAt = "2026-08-24";
const reviewedBy = ["Jamie Burkart", "Codex architecture review"];
const intakeId = "INTAKE-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const claimId = "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026";
const sharedMemoryIntakeId = "INTAKE-KNOWLEDGE-WIKI-SHARED-MEMORY-PROTOCOL-2026";
const sharedMemoryClaimId = "CLM-KNOWLEDGE-WIKI-SHARED-MEMORY-PROTOCOL-2026";
const sharedMemoryInquiryId = "INQ-KNOWLEDGE-WIKI-SHARED-MEMORY-PILOT";
const rfcFiveSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0005-2026";
const rfcSixSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0006-2026";
const rfcNineSourceId = "SRC-KNOWLEDGE-WIKI-RFC-0009-2026";
const wardFederatedWikiSourceId = "SRC-WARD-CUNNINGHAM-FEDERATED-WIKI";
const abstractWikipediaSourceId = "SRC-WIKIMEDIA-ABSTRACT-WIKIPEDIA";
const emberRfcSourceId = "SRC-EMBER-RFC-PROCESS-2022";
const emberTeamsSourceId = "SRC-EMBER-TEAMS-2026";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Knowledge Wiki Graph ecosystem portfolio representation",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex architecture review",
    projectIds: ["knowledge-wiki-graph", "source-backed-team-memory"],
    reason:
      "Generalize the current cross-repository research architecture into a concise public explanation without exposing protected repository topology or presenting an evolving method as a completed product.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [rfcFiveSourceId, rfcSixSourceId],
    observationIds: [
      "OBS-KNOWLEDGE-WIKI-THREE-GRAPHS",
      "OBS-KNOWLEDGE-WIKI-FEDERATED-AUTHORITY"
    ],
    researchInquiryIds: [],
    boundaries: [
      "Repository roles and graph responsibilities are related but not interchangeable.",
      "The public portfolio explains the operating method without publishing a private repository inventory, source locators, or protected records.",
      "An audience-specific projection is a selected output, not another source of truth or permission to publish."
    ]
  },
  {
    id: sharedMemoryIntakeId,
    kind: "analysis-note",
    title: "Wiki as shared memory protocol for people and agents",
    submittedAt: sharedMemoryReviewedAt,
    submittedBy: "Jamie Burkart and Codex architecture review",
    projectIds: ["knowledge-wiki-graph", "source-backed-team-memory"],
    reason:
      "Preserve Jamie's research proposition that a source-backed, human-inspectable wiki may provide shared factual holding among people and agents with different contexts, while keeping the proposition distinct from proof, adoption, endorsement, or a public portfolio claim.",
    visibility: "public-safe",
    disposition: "researching",
    sourceIds: [
      rfcNineSourceId,
      wardFederatedWikiSourceId,
      abstractWikipediaSourceId,
      emberRfcSourceId,
      emberTeamsSourceId
    ],
    observationIds: [
      "OBS-KNOWLEDGE-WIKI-SHARED-MEMORY-PROPOSITION",
      "OBS-KNOWLEDGE-WIKI-FEDERATED-WIKI-LINEAGE",
      "OBS-KNOWLEDGE-WIKI-ABSTRACT-WIKIPEDIA-LINEAGE",
      "OBS-KNOWLEDGE-WIKI-EMBER-RFC-LINEAGE",
      "OBS-KNOWLEDGE-WIKI-YEHUDA-LENS-SCOPE"
    ],
    researchInquiryIds: [sharedMemoryInquiryId],
    boundaries: [
      "Shared memory means traceable common holding of propositions, sources, disagreement, and change rationale; it does not require identical context or uniform belief.",
      "The cited projects and people are intellectual context only; no source establishes their participation in, review of, or endorsement of Jamie's research.",
      "This proposition remains held from public portfolio projection until a controlled pilot and Jamie's editorial review support a useful public account."
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
    id: "OBS-KNOWLEDGE-WIKI-SHARED-MEMORY-PROPOSITION",
    intakeId: sharedMemoryIntakeId,
    sourceId: rfcNineSourceId,
    comparisonSourceIds: [rfcFiveSourceId, rfcSixSourceId],
    project: "knowledge-wiki-graph",
    kind: "bounded-inference",
    text:
      "RFC 0009 records Jamie's proposition that a wiki can act as a source-backed, model-neutral, human-inspectable coordination layer in which people and agents with different contexts can share a traceable account of claims, sources, disagreements, and revisions.",
    locator: "RFC 0009, Summary and Terminology",
    status: "verified",
    publicSafe: true,
    claimIds: [sharedMemoryClaimId],
    researchInquiryIds: [sharedMemoryInquiryId],
    limitations: [
      "The source verifies that Jamie has articulated the proposition; it does not establish that the proposition works in practice."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-FEDERATED-WIKI-LINEAGE",
    intakeId: sharedMemoryIntakeId,
    sourceId: wardFederatedWikiSourceId,
    comparisonSourceIds: [rfcNineSourceId],
    project: "knowledge-wiki-graph",
    kind: "context",
    text:
      "Ward Cunningham's Federated Wiki describes pages circulating among independently hosted sites: a reader can view pages from many sites and save an edit to a site they control. RFC 0009 draws on that pattern of plural authorship and local authority.",
    locator: "Federated Wiki, opening description and hosting explanation",
    status: "verified",
    publicSafe: true,
    claimIds: [sharedMemoryClaimId],
    researchInquiryIds: [sharedMemoryInquiryId],
    limitations: [
      "The official project page provides design context; it does not establish Ward Cunningham's awareness of or endorsement of Jamie's proposal."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-ABSTRACT-WIKIPEDIA-LINEAGE",
    intakeId: sharedMemoryIntakeId,
    sourceId: abstractWikipediaSourceId,
    comparisonSourceIds: [rfcNineSourceId],
    project: "knowledge-wiki-graph",
    kind: "context",
    text:
      "The Wikimedia announcement for Abstract Wikipedia describes shared, language-independent content that can support multiple language editions while each community retains the choice to use and moderate it. RFC 0009 uses this as context for separating shared structure from audience-specific expression and authority.",
    locator: "Abstract Wikipedia July 2020 announcement, proposal and community-choice sections",
    status: "verified",
    publicSafe: true,
    claimIds: [sharedMemoryClaimId],
    researchInquiryIds: [sharedMemoryInquiryId],
    limitations: [
      "The Wikimedia source provides design context; it does not establish Denny Vrandecic's awareness of or endorsement of Jamie's proposal."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-EMBER-RFC-LINEAGE",
    intakeId: sharedMemoryIntakeId,
    sourceId: emberRfcSourceId,
    comparisonSourceIds: [rfcNineSourceId],
    project: "knowledge-wiki-graph",
    kind: "context",
    text:
      "The Ember RFC process distinguishes proposal, acceptance, implementation, release, and recommendation so a shared design can evolve without confusing discussion with adoption. RFC 0009 applies that staged-governance lesson to shared memory.",
    locator: "Improving Ember's RFC process, Stage descriptions",
    status: "verified",
    publicSafe: true,
    claimIds: [sharedMemoryClaimId],
    researchInquiryIds: [sharedMemoryInquiryId],
    limitations: [
      "The Ember source documents a community process, not a claim that Ember or any individual contributor participated in Jamie's proposal."
    ]
  },
  {
    id: "OBS-KNOWLEDGE-WIKI-YEHUDA-LENS-SCOPE",
    intakeId: sharedMemoryIntakeId,
    sourceId: emberTeamsSourceId,
    comparisonSourceIds: [emberRfcSourceId],
    project: "knowledge-wiki-graph",
    kind: "context",
    text:
      "Ember's public team page lists Yehuda Katz on its Steering Committee and Framework Core Team. That public role is the limited basis for using a fictionalized Yehuda Katz analytical lens on coordination and extension points; it is not evidence of authorship, review, participation, or endorsement.",
    locator: "Ember Teams, Yehuda Katz listing",
    status: "verified",
    publicSafe: true,
    claimIds: [],
    researchInquiryIds: [],
    limitations: [
      "A modeled analytical lens is not the named person and has no editorial or technical authority."
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
    title: "RFC 0009: Wiki as Shared Memory Protocol for People and Agents",
    organization: "openhouse / jamieburk.art",
    author: "Jamie Burkart and Codex, AI-assisted draft",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: sharedMemoryReviewedAt,
    accessedAt: sharedMemoryReviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/work/2026-08-24-A/rfcs/0009-wiki-as-shared-memory-protocol.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart and Codex, RFC 0009: Wiki as Shared Memory Protocol for People and Agents, proposed design record, August 24, 2026.",
    publicNote:
      "The RFC records the research proposition, scoped lineages, smallest useful pilot, and authority boundaries; its proposed status is part of the evidence.",
    supportsGenerally: [
      "Jamie's articulation of the shared-memory proposition",
      "a testable definition of shared factual holding",
      "a controlled pilot design"
    ],
    doesNotEstablish: [
      "that the proposition works in practice",
      "a finished protocol or product",
      "adoption by a team or client",
      "endorsement by any cited person or project"
    ]
  },
  {
    id: wardFederatedWikiSourceId,
    title: "Federated Wiki",
    organization: "Federated Wiki",
    author: "Ward Cunningham and Federated Wiki contributors",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: sharedMemoryReviewedAt,
    canonicalUrl: "https://fed.wiki.org/federated-wiki.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Federated Wiki, project overview, accessed August 24, 2026.",
    publicNote:
      "The project page documents page circulation, independent hosting, and saving edits to a site the reader controls.",
    supportsGenerally: [
      "plural authorship",
      "page circulation among independently hosted sites",
      "local authority over saved edits"
    ],
    doesNotEstablish: [
      "that federation produces factual agreement",
      "fitness for agent memory",
      "Ward Cunningham's participation in or endorsement of Jamie's proposal"
    ]
  },
  {
    id: abstractWikipediaSourceId,
    title: "Abstract Wikipedia: July 2020 announcement",
    organization: "Wikimedia Meta-Wiki",
    author: "Denny Vrandecic",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-07-02",
    accessedAt: sharedMemoryReviewedAt,
    canonicalUrl:
      "https://meta.wikimedia.org/wiki/Abstract_Wikipedia/July_2020_announcement",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Denny Vrandecic, Abstract Wikipedia: July 2020 announcement, Wikimedia Meta-Wiki, July 2, 2020.",
    publicNote:
      "The announcement describes shared language-independent content and preserves each language community's choice over use and moderation.",
    supportsGenerally: [
      "shared structure across different language contexts",
      "separation of content structure from rendered expression",
      "community choice and moderation"
    ],
    doesNotEstablish: [
      "fitness for general agent memory",
      "that shared structure eliminates disagreement",
      "Denny Vrandecic's participation in or endorsement of Jamie's proposal"
    ]
  },
  {
    id: emberRfcSourceId,
    title: "Improving Ember's RFC Process",
    organization: "Ember.js",
    author: "Katie Gengler and Peter Wagenet",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: sharedMemoryReviewedAt,
    canonicalUrl: "https://blog.emberjs.com/improved-rfc-process/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Katie Gengler and Peter Wagenet, Improving Ember's RFC Process, Ember.js Blog, accessed August 24, 2026.",
    publicNote:
      "The official Ember post documents distinct proposal, acceptance, implementation, release, and recommendation stages.",
    supportsGenerally: [
      "explicit stages for shared proposals",
      "separation of acceptance from implementation and release",
      "durable evolution of community decisions"
    ],
    doesNotEstablish: [
      "fitness of the process for every knowledge system",
      "that process alone produces agreement",
      "participation in or endorsement of Jamie's proposal by Ember or an individual contributor"
    ]
  },
  {
    id: emberTeamsSourceId,
    title: "Ember.js Teams",
    organization: "Ember.js",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: sharedMemoryReviewedAt,
    canonicalUrl: "https://emberjs.com/teams/",
    preferredPublicUrl: "canonical",
    publicCitation: "Ember.js Teams, accessed August 24, 2026.",
    publicNote:
      "The page lists current public team memberships and is used only to scope the fictionalized analytical lens.",
    supportsGenerally: [
      "Yehuda Katz's listed Ember Steering Committee membership",
      "Yehuda Katz's listed Ember Framework Core Team membership"
    ],
    doesNotEstablish: [
      "authorship of the current RFC process",
      "participation in this portfolio review",
      "endorsement of Jamie or the Knowledge Wiki research"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "knowledge-wiki-graph",
    internalClaim:
      "Jamie is developing a federated Knowledge Wiki Graph practice that keeps semantic meaning, evidentiary support, and source custody distinct across project-specific repositories, then uses human review to compose audience-specific projections.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I am developing a federated Knowledge Wiki Graph practice that keeps meaning, evidence, and source custody distinct, then composes audience-specific outputs through human review.",
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
          "The Knowledge Wiki Graph connects each public claim to evidence. Jamie decides what appears here and revises it when the record changes.",
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
      }
    ],
    boundaries: [
      "Present this as current research and an operating method in development.",
      "Repository roles do not map one-to-one onto graph responsibilities.",
      "Do not expose protected repository topology, source locators, or private records.",
      "Do not imply a completed client deployment, production platform, market validation, or automatic trust."
    ],
    antiClaims: [
      "Every ecosystem repository corresponds to exactly one graph.",
      "The Knowledge Wiki Graph is a finished production platform.",
      "A client has adopted the system.",
      "Source access, evidence, interpretation, and publication permission are interchangeable.",
      "A context packet or successful eval authorizes release."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: sharedMemoryClaimId,
    project: "knowledge-wiki-graph",
    internalClaim:
      "Jamie is proposing and investigating whether a source-backed, model-neutral, human-inspectable wiki can serve as shared factual holding among people and agents with different contexts by preserving claims, sources, disagreements, decisions, and change rationale under explicit human authority.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I am investigating whether a source-backed, human-inspectable wiki can give people and agents with different contexts a shared, traceable account of what is known, disputed, decided, and revised.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: rfcNineSourceId,
        relationship: "direct-support",
        supports: [
          "Jamie's articulation of the proposition",
          "the qualified meaning of shared factual holding",
          "the proposed controlled pilot"
        ],
        locator: "Summary, Terminology, and Rollout plan",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: wardFederatedWikiSourceId,
        relationship: "context",
        supports: [
          "plural authorship",
          "independent hosting",
          "local authority over edits"
        ],
        locator: "Project overview",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: abstractWikipediaSourceId,
        relationship: "context",
        supports: [
          "shared structure across different language contexts",
          "community choice over use and moderation"
        ],
        locator: "July 2020 announcement",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: emberRfcSourceId,
        relationship: "context",
        supports: [
          "explicit proposal stages",
          "separation of acceptance, implementation, release, and recommendation"
        ],
        locator: "Stage descriptions",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a confirmed account of Jamie's research proposition, not confirmation that the proposed protocol works.",
      "Shared factual holding includes visible disagreement and unresolved questions; it does not require identical context, consensus, or uniform belief.",
      "Source custody, evidentiary support, interpretation, model output, consent, and publication authority remain distinct.",
      "Keep the public projection on hold until the controlled pilot produces useful evidence and Jamie approves a public composition."
    ],
    antiClaims: [
      "A wiki guarantees truth, consensus, trust, or factual agreement.",
      "People and agents must share identical context or arrive at identical beliefs.",
      "Generated text becomes evidence or authority by entering the wiki.",
      "Ward Cunningham, Denny Vrandecic, Yehuda Katz, Wikimedia, Federated Wiki, or Ember participated in, reviewed, or endorsed Jamie's research.",
      "The proposed protocol is implemented, adopted, production-ready, or a completed client system.",
      "A successful evaluation authorizes publication or deployment."
    ],
    researchInquiryIds: [sharedMemoryInquiryId],
    reviewedAt: sharedMemoryReviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: sharedMemoryInquiryId,
    project: "knowledge-wiki-graph",
    question:
      "Can a small source-backed wiki help two people and two agents with different context packets produce, inspect, correct, and continue from one traceable shared account without erasing disagreement or human authority?",
    methods: [
      "Run one controlled task with two people and two agents receiving deliberately different approved context packets.",
      "Require every material proposition to retain source links, status, disagreement, decision owner, and change rationale.",
      "Test whether each participant can find an answer, trace its support, propose a correction, preserve dissent, and identify who may publish or act."
    ],
    runAt: sharedMemoryReviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "RFC 0009 specifies a smallest useful pilot and observable handoff criteria.",
      "No controlled pilot has yet established whether the proposed form improves shared understanding, correction quality, or continuity across different contexts."
    ],
    limitations: [
      "The design record is a proposal rather than implementation evidence.",
      "The cited lineages provide design context and do not endorse the experiment.",
      "A successful pilot would remain local evidence, not proof of universal fitness or automatic trust."
    ],
    sourceIds: [
      rfcNineSourceId,
      wardFederatedWikiSourceId,
      abstractWikipediaSourceId,
      emberRfcSourceId
    ],
    publicSummary:
      "A controlled four-participant pilot is specified but has not yet been run; the proposition remains an open research question."
  }
];

export const knowledgeWikiGraphEcosystemAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
