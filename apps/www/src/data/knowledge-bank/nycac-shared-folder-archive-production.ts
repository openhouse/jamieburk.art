import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-19";
const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

export const nycacSharedFolderSources: SourceRecord[] = [
  {
    id: "SRC-NYCAC-SHARED-FOLDER-PUBLIC-CENSUS-2026",
    title: "NYC Artist Coalition shared-folder public-safe census",
    organization: "NYC Artist Coalition",
    author: "Codex public-safe archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-19",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe census of the authenticated NYC Artist Coalition shared archive, July 19, 2026.",
    publicNote:
      "The census accounts for 2,408 unique accessible items across 258 folders. Every item received a source class and one primary disposition; exact filenames, identifiers, content, and private locators remain outside the public repository.",
    supportsGenerally: [
      "2,408 unique accessible items were inventoried",
      "258 folders were traversed and closed",
      "inventory, classification, and disposition totals each equal the accessible population",
      "the surviving archive spans coalition operations, public communications, government interfaces, campaigns, and visual or audiovisual production"
    ],
    doesNotEstablish: [
      "Jamie's authorship of every item",
      "permission to publish any underlying item",
      "a complete record of deleted, inaccessible, external, or collaborator-held materials",
      "individual causality for coalition, legislative, agency, or movement outcomes",
      "that every file was content-read, rights-cleared, or selected for projection"
    ]
  },
  {
    id: "SRC-NYCAC-SHARED-FOLDER-CUSTODY-MANIFEST-2026",
    title: "NYC Artist Coalition shared-folder private custody manifest",
    organization: "NYC Artist Coalition",
    author: "Codex authorized archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected item-level custody manifest for the authenticated NYC Artist Coalition shared archive, July 19, 2026.",
    publicNote:
      "The exact item-level manifest is held outside the public repository. Its public-safe digest is 94d36f269cf4db36b64ca86210a58929bb64a2a0e599648a65919d88d0d9b5f8.",
    protectedLocatorId: "ARCHIVE-NYCAC-SHARED-FOLDER-MANIFEST-2026",
    supportsGenerally: [
      "item-level inventory closure",
      "parent-lineage and folder-traversal reconciliation",
      "one source class and one primary disposition for every accessible item",
      "private custody of exact source coordinates"
    ],
    doesNotEstablish: [
      "publication permission",
      "authorship from Drive ownership or modification metadata",
      "content review of every file",
      "rights or participant consent",
      "completeness beyond the accessible snapshot population"
    ]
  }
];

export const nycacSharedFolderClaims: ClaimRecord[] = [
  {
    id: "CLM-NYCAC-SHARED-ARCHIVE-CENSUS",
    project: "nyc-artist-coalition",
    internalClaim:
      "A July 19, 2026, authenticated census accounts for all 2,408 unique accessible items across 258 folders in the NYC Artist Coalition shared archive, with every item inventoried, classified, and dispositioned. The census establishes archival breadth and governed custody, not item-level authorship, publication rights, or outcome causality.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The governed project record accounts for 2,408 unique accessible shared-archive items across 258 folders; every item is classified and dispositioned while exact records remain protected.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder"
        ],
        rationale:
          "The aggregate census is useful provenance for researchers without exposing the private manifest or implying item-level review."
      },
      {
        key: "case-study",
        text:
          "A governed census now accounts for 2,408 accessible items across the coalition's shared archive, with every item classified and dispositioned while private records remain offline.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/nyc-artist-coalition"],
        rationale:
          "One concise sentence shows the depth and current governance of the project record without turning the portfolio into an archive catalog."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-SHARED-FOLDER-PUBLIC-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "2,408-item accessible population",
          "258-folder traversal",
          "complete inventory, classification, and disposition accounting"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-SHARED-FOLDER-CUSTODY-MANIFEST-2026",
        relationship: "private-support",
        supports: [
          "item-level custody and reconciliation",
          "exact population and folder closure"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "One hundred percent means every accessible item was accounted for and governed, not that every file body was close-read or copied into git.",
      "Drive ownership, location, and modification metadata are not conclusive evidence of authorship, delivery, approval, or impact.",
      "All underlying items remain protected until separate public-source, rights, consent, attribution, and editorial decisions are complete.",
      "The accessible snapshot excludes deleted, no-longer-shared, external, and collaborator-held materials outside the folder."
    ],
    antiClaims: [
      "Jamie authored all 2,408 items.",
      "All 2,408 items are approved for publication.",
      "Every item was content-read or rights-reviewed.",
      "The archive proves that Jamie alone caused NYC Artist Coalition's policy outcomes.",
      "The census is the complete historical record of NYC Artist Coalition."
    ],
    researchInquiryIds: ["INQ-NYCAC-SHARED-ARCHIVE-ROLE-ATTRIBUTION-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const nycacSharedFolderInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-SHARED-ARCHIVE-ROLE-ATTRIBUTION-2026",
    project: "nyc-artist-coalition",
    question:
      "Which shared-archive artifacts can support source-specific claims about Jamie's creation, implementation, coordination, maintenance, or handoff work?",
    methods: [
      "Completed a read-only authenticated census of every accessible folder and item.",
      "Classified each item by source class and assigned one primary public-safety disposition.",
      "Opened a priority close-reading queue for coalition formation, Cabaret Law, MARCH, Office of Nightlife, Fair Rent, participation, and public identity materials.",
      "Compared selected archive leads with existing official, independent, public-campaign, code, testimony, and first-person records."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The archive preserves substantial operating infrastructure across campaigns, government interfaces, participation systems, public communications, and visual production.",
      "Selected first-person testimony drafts and public-action materials create useful corroboration leads for Jamie's already documented coalition role.",
      "Existing official and independent sources remain stronger authorities for public outcomes and institutional recognition.",
      "The census supports a mature aggregate custody claim; consequential item-level role claims still require source-specific close reading and, where appropriate, collaborator review."
    ],
    limitations: [
      "Filenames, folder placement, and modification metadata do not establish authorship.",
      "Nine priority documents received title and metadata review in this pass; readable body text was recovered from two.",
      "Private drafts and operational records cannot substitute for official or independent evidence of public outcomes.",
      "Rights, consent, attribution, and publication review remain separate human gates."
    ],
    sourceIds: [
      "SRC-NYCAC-SHARED-FOLDER-PUBLIC-CENSUS-2026",
      "SRC-NYCAC-SHARED-FOLDER-CUSTODY-MANIFEST-2026",
      "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
      "SRC-NYCAC-CREATENYC-APPENDIX-2017",
      "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017"
    ],
    publicSummary:
      "The accessible archive is completely accounted, but item-level role attribution remains a staged inquiry governed by source quality, collective credit, rights, and consent.",
    protectedLocatorId: "RESEARCH-NYCAC-SHARED-FOLDER-ROLE-2026"
  }
];

export const nycacSharedFolderIntake: IntakeRecordInput[] = [
  {
    id: "INT-NYCAC-SHARED-FOLDER-2026",
    receivedAt: reviewedAt,
    kind: "claim-hypothesis",
    visibility: "protected-summary",
    title: "NYC Artist Coalition shared-folder archival production",
    description:
      "Authorized read-only census and staged close reading of the accessible NYC Artist Coalition shared archive.",
    whyItMatters:
      "The archive can strengthen Jamie's professional record by preserving operating evidence while keeping collective credit, private records, rights, and uncertainty intact.",
    projectIds: ["nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "The population-closure claim matured; item-level role claims remain linked to an open, partially recovered inquiry.",
    sourceIds: [
      "SRC-NYCAC-SHARED-FOLDER-PUBLIC-CENSUS-2026",
      "SRC-NYCAC-SHARED-FOLDER-CUSTODY-MANIFEST-2026"
    ],
    claimIds: ["CLM-NYCAC-SHARED-ARCHIVE-CENSUS"],
    inquiryIds: ["INQ-NYCAC-SHARED-ARCHIVE-ROLE-ATTRIBUTION-2026"],
    artifactPaths: [
      "docs/knowledge-bank/corpora/nycac-shared-folder-public-census-2026-07-19.json",
      "docs/knowledge-bank/runs/2026-07-19-nycac-shared-folder-full-population.md",
      "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder.md",
      "docs/knowledge-bank/briefs/nycac-civic-operations-application-brief.md"
    ],
    boundaries: [
      "The item-level custody manifest and underlying archive remain outside the public repository.",
      "No private note, correspondence, participant data, contact record, strategy, media, font binary, or exact source locator is published.",
      "Portfolio selection does not approve any underlying artifact for public display."
    ]
  }
];
