import type { KnowledgeBank } from "./schema.ts";

type NycacSharedFolderDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const nycacSharedFolderDevelopmentRecords: NycacSharedFolderDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-18-NYCAC-SHARED-FOLDER-PROPOSAL",
      receivedAt: "2026-07-18",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Approved proposal for complete archival-production accounting of the accessible NYC Artist Coalition Shared Folder, followed by bounded close reading and purpose-built projection.",
      projectHints: ["nyc-artist-coalition", "fair-rent-nyc"],
      status: "processed",
      disposition:
        "Inventoried, classified, and dispositioned all 2,365 accessible descendants; close-read 16 priority documents; promoted one bounded FairRentNYC implementation claim; retained rights, consent, attribution, and Jamie approval as separate gates.",
      linkedRecordIds: [
        "INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026",
        "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
        "CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
        "CLM-NYCAC-SHARED-FOLDER-POPULATION-2026",
        "CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION"
      ],
      protectedLocatorId: "INTAKE-NYCAC-SHARED-FOLDER-PROPOSAL-2026-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-NYCAC-SHARED-FOLDER-CENSUS-2026",
      sourceId: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-CENSUS-COMPLETE-ACCOUNTING",
          statement:
            "The authenticated pass inventoried, broadly classified, and dispositioned all 2,365 accessible descendants.",
          locator: "Protected aggregate manifest",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-CENSUS-FILE-FOLDER-TOTALS",
          statement:
            "The accessible population contained 258 folders and 2,107 files.",
          locator: "Protected aggregate manifest",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-CENSUS-CLOSE-READING-BOUNDARY",
          statement:
            "Sixteen priority documents were close-read and zero media items were rights-cleared by this pass.",
          locator: "Protected close-reading and disposition ledgers",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The census establishes complete accounting of the accessible population, not complete interpretation, authorship, rights, consent, or publication approval."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["archival-production", "coverage-ledger", "rights-boundaries"],
      candidateClaimIds: [
        "CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
        "CND-NYCAC-SHARED-RESOURCE-SYSTEM"
      ]
    },
    {
      id: "READ-NYCAC-FAIRRENT-WEB-IMPLEMENTATION-2019",
      sourceId: "SRC-NYCAC-ARCHIVE-FAIRRENT-WEB-IMPLEMENTATION-2019",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-FAIRRENT-JAMIE-WORKSTREAM",
          statement:
            "The implementation record assigns a concrete FairRentNYC web and data workstream to Jamie.",
          locator: "Jamie-attributed implementation section",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FAIRRENT-IMPLEMENTATION-DOMAINS",
          statement:
            "The workstream spans responsive presentation, mapped and verified location data, forms, sponsor sequencing, press and partner modules, social presentation, and campaign calls to action.",
          locator: "Implementation task list",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The record does not assign Jamie every campaign decision, policy position, copy line, or outcome and does not prove that every listed or proposed feature shipped unchanged."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: [
        "web-implementation",
        "campaign-operations",
        "data-quality",
        "information-architecture"
      ],
      candidateClaimIds: ["CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION"]
    },
    {
      id: "READ-NYCAC-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
      sourceId: "SRC-NYCAC-ARCHIVE-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-FAIRRENT-PRIORITIZED-ACTIONS",
          statement:
            "Jamie designed a multi-issue campaign surface that prioritized next actions instead of presenting every policy ask with equal weight.",
          locator: "Campaign architecture and primary-action guidance",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FAIRRENT-SPONSOR-VIEW",
          statement:
            "The design connected sponsorship progress, map presentation, and campaign-leadership information needs.",
          locator: "Sponsorship-progress and map concepts",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The note proves Jamie's product and information-architecture thinking, not delivery or adoption of every proposed feature."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["product-strategy", "information-architecture", "campaign-action"],
      candidateClaimIds: ["CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION"]
    },
    {
      id: "READ-NYCAC-SMALL-BUSINESS-TESTIMONY-2019",
      sourceId: "SRC-NYCAC-ARCHIVE-SMALL-BUSINESS-TESTIMONY-2019",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-REGULATORY-DATA-PROPOSAL",
          statement:
            "Jamie authored a proposal for machine-readable city regulatory datasets and public tools mapping cultural-space licensing, permitting, and inspection paths to compliance.",
          locator: "Public-data recommendation section",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The reviewed artifact is a testimony draft; it does not by itself prove delivery in a hearing, official adoption, or legal authority."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["open-data", "service-design", "regulatory-navigation"],
      candidateClaimIds: ["CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE"]
    },
    {
      id: "READ-NYCAC-SHARED-RESOURCE-ORIENTATION-2017",
      sourceId: "SRC-NYCAC-ARCHIVE-SHARED-FOLDER-FAQ-2017",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-SHARED-RESOURCE-PURPOSE",
          statement:
            "The coalition described the folder as a collaborative, evolving mutual-support resource assembled from members' distributed knowledge.",
          locator: "Purpose and contribution guidance",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The orientation does not establish Jamie's authorship or ownership of the shared resource."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["shared-knowledge", "mutual-support", "collective-memory"],
      candidateClaimIds: ["CND-NYCAC-SHARED-RESOURCE-SYSTEM"]
    },
    {
      id: "READ-NYCAC-LETNYCDANCE-DIGITAL-GUIDE-2017",
      sourceId: "SRC-NYCAC-ARCHIVE-LETNYCDANCE-DIGITAL-GUIDE-2017",
      readAt: "2026-07-18",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-LETNYCDANCE-ACTION-SYSTEM",
          statement:
            "The digital guide connected a Council call script, target selection, social templates, public handles, and a campaign website into one coordinated participation pathway.",
          locator: "Action sequence and channel templates",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The guide supports a collective campaign-system interpretation but does not establish Jamie's sole authorship or sole causality for the repeal outcome."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["participation-systems", "campaign-communications", "public-action"],
      candidateClaimIds: ["CND-NYCAC-SHARED-RESOURCE-SYSTEM"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
      project: "nyc-artist-coalition",
      text:
        "Jamie translated FairRentNYC campaign needs into a concrete web and data implementation system spanning responsive presentation, mapped and verified location data, reusable forms, sponsor sequencing, partner and press modules, and calls to action.",
      status: "promoted",
      sourceIds: [
        "SRC-NYCAC-ARCHIVE-FAIRRENT-WEB-IMPLEMENTATION-2019",
        "SRC-NYCAC-ARCHIVE-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
        "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "A Jamie-attributed implementation checklist directly documents the workstream, a Jamie-authored architecture note explains its product logic, and the surviving public campaign site corroborates the public surface.",
      missingEvidence: [],
      boundaries: [
        "Separate completed implementation domains from concepts that the architecture note only proposed.",
        "Preserve collective credit for policy, copy, organizing, partnership, and campaign outcomes."
      ],
      promotedClaimId: "CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
      reviewedAt: "2026-07-18"
    },
    {
      id: "CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE",
      project: "nyc-artist-coalition",
      text:
        "Jamie proposed machine-readable regulatory datasets and public tools mapping cultural-space licensing, permitting, and inspection paths to compliance.",
      status: "partially-supported",
      sourceIds: ["SRC-NYCAC-ARCHIVE-SMALL-BUSINESS-TESTIMONY-2019"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The protected draft directly supports Jamie's authorship of the proposal language.",
      missingEvidence: [
        "Official hearing record or other public source confirming delivery",
        "Independent corroboration of any later agency use or adoption"
      ],
      boundaries: [
        "Use authored or proposed, not delivered, adopted, or implemented.",
        "Do not imply official legal or regulatory authority."
      ],
      reviewedAt: "2026-07-18"
    },
    {
      id: "CND-NYCAC-SHARED-RESOURCE-SYSTEM",
      project: "nyc-artist-coalition",
      text:
        "NYC Artist Coalition maintained a collaborative knowledge and participation system connecting shared resources, reusable campaign guides, event templates, and public-action pathways.",
      status: "partially-supported",
      sourceIds: [
        "SRC-NYCAC-ARCHIVE-SHARED-FOLDER-FAQ-2017",
        "SRC-NYCAC-ARCHIVE-LETNYCDANCE-DIGITAL-GUIDE-2017",
        "SRC-NYCAC-ARCHIVE-PARTICIPATION-TEMPLATES-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "Selected protected sources support the collective system and its intended use, but do not allocate individual authorship across its parts.",
      missingEvidence: [
        "Item-level authorship and contribution records",
        "Rights review for representative visual templates",
        "Public corroboration for selected uses and adoption"
      ],
      boundaries: [
        "Credit the system collectively unless an individual role is separately supported.",
        "Do not expose raw shared resources or private participation records."
      ],
      reviewedAt: "2026-07-18"
    },
    {
      id: "CND-NYCAC-NIGHTLIFE-TOWN-HALL-SEVERAL-HUNDRED",
      project: "nyc-artist-coalition",
      text:
        "Several hundred people attended an NYC Artist Coalition nightlife town hall.",
      status: "hold",
      sourceIds: ["SRC-NYCAC-SHARED-FOLDER-CENSUS-2026"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The figure appears in an internal testimony draft, but the draft is not an independent attendance record and a more conservative independently reported estimate already exists.",
      missingEvidence: [
        "Contemporaneous attendance count or venue record",
        "Independent reporting supporting the higher estimate"
      ],
      boundaries: [
        "Do not project the several-hundred figure.",
        "Use the existing conservative public-source wording unless stronger independent evidence is recovered."
      ],
      reviewedAt: "2026-07-18"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION-2026",
      candidateClaimId: "CND-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
      claimId: "CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
      decision: "promoted",
      reason:
        "The implementation record directly attributes a bounded workstream to Jamie, the companion note explains his product judgment, and a surviving public surface provides context.",
      decidedAt: "2026-07-18",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-REGULATORY-PATH-TO-COMPLIANCE-HOLD",
      candidateClaimId: "CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE",
      decision: "held",
      reason:
        "A protected draft supports proposal authorship but not public delivery, official adoption, or implementation.",
      decidedAt: "2026-07-18",
      decidedBy: ["Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-SHARED-RESOURCE-SYSTEM-HOLD",
      candidateClaimId: "CND-NYCAC-SHARED-RESOURCE-SYSTEM",
      decision: "held",
      reason:
        "The collective system is visible, but item-level authorship, rights, and adoption evidence remain incomplete.",
      decidedAt: "2026-07-18",
      decidedBy: ["Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-NIGHTLIFE-TOWN-HALL-SEVERAL-HUNDRED-HOLD",
      candidateClaimId: "CND-NYCAC-NIGHTLIFE-TOWN-HALL-SEVERAL-HUNDRED",
      decision: "held",
      reason:
        "An internal testimony draft is not a sufficient basis to replace the existing, more conservative independent estimate.",
      decidedAt: "2026-07-18",
      decidedBy: ["Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-SHARED-FOLDER-PORTFOLIO-2026",
      audience:
        "Hiring managers and public-interest product, implementation, and technical-operations leaders",
      goal:
        "Make Jamie's concrete FairRentNYC delivery role legible while keeping the shared archive and collective campaign history protected.",
      argument:
        "Jamie did more than publish campaign pages: he translated emerging advocacy needs into a maintainable web and data system with clear actions, structured location data, reusable modules, and implementation follow-through.",
      selectedClaimIds: ["CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION"],
      heldCandidateClaimIds: [
        "CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE",
        "CND-NYCAC-SHARED-RESOURCE-SYSTEM",
        "CND-NYCAC-NIGHTLIFE-TOWN-HALL-SEVERAL-HUNDRED"
      ],
      rationale: [
        "The implementation record is Jamie-specific and translates directly into product-operations and technical-project-management language.",
        "The case study can name concrete implementation domains without displaying private artifacts.",
        "The archive census belongs in the Knowledge Wiki as governance evidence, not as a public-facing portfolio metric."
      ],
      createdAt: "2026-07-18"
    },
    {
      id: "BRIEF-NYCAC-SHARED-FOLDER-APPLICATIONS-2026",
      audience:
        "Resume and application writers tailoring Jamie's evidence to technical project management, product operations, implementation, and civic technology roles",
      goal:
        "Provide a reusable, bounded accomplishment that can be selected when campaign implementation or public-sector product judgment is relevant.",
      argument:
        "Use the FairRentNYC implementation claim to show Jamie converting coalition requirements into public web, data-quality, information-architecture, and campaign-action systems; omit the archive scale and held metrics unless the application specifically calls for archival practice.",
      selectedClaimIds: ["CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION"],
      heldCandidateClaimIds: [
        "CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE",
        "CND-NYCAC-NIGHTLIFE-TOWN-HALL-SEVERAL-HUNDRED"
      ],
      rationale: [
        "The accomplishment names Jamie as the actor and the usable system he made.",
        "Its boundaries prevent a website contribution from becoming a solo policy-impact claim.",
        "The held testimony proposal may become valuable for civic-data applications after official corroboration."
      ],
      createdAt: "2026-07-18"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NYCAC-SHARED-FOLDER-VISUAL-RIGHTS-QUEUE-2026",
      kind: "archive-research",
      summary:
        "The complete census exposes a substantial visual and design corpus that may support future representative artifacts, but selection must begin with item-level authorship, rights, consent, and contextual review rather than visual appeal or file volume.",
      projectHints: ["nyc-artist-coalition", "fair-rent-nyc"],
      sourceIds: ["SRC-NYCAC-SHARED-FOLDER-CENSUS-2026"],
      candidateClaimIds: ["CND-NYCAC-SHARED-RESOURCE-SYSTEM"],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-18"
    },
    {
      id: "DISC-NYCAC-REGULATORY-TESTIMONY-CORROBORATION-2026",
      kind: "agent-research",
      summary:
        "Search official Council hearing records for the 2019 small-business testimony and the specific machine-readable regulatory-data proposal before promoting a delivered-testimony or public-adoption claim.",
      projectHints: ["nyc-artist-coalition"],
      sourceIds: ["SRC-NYCAC-ARCHIVE-SMALL-BUSINESS-TESTIMONY-2019"],
      candidateClaimIds: ["CND-NYCAC-REGULATORY-PATH-TO-COMPLIANCE"],
      rightsReviewRequired: false,
      status: "captured",
      createdAt: "2026-07-18"
    }
  ]
};
