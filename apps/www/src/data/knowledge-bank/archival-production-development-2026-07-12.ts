import type { KnowledgeBank } from "./schema.ts";

type ArchivalProductionDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const archivalProductionDevelopmentRecords: ArchivalProductionDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-TEAMS-JAMIE-PROJECTS-HISTORY",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Selective archival review of Jamie Projects History using its overview and curated public project captures.",
      projectHints: ["participatory-public-systems", "technical-prototypes"],
      status: "processed",
      disposition:
        "Added two public sources, strengthened the river-expedition scale evidence, and retained the audio-software fragment for future composition.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-PRODUCTION-2026",
        "SRC-RAFT-SOUNDINGS-2007",
        "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        "CND-SORTED-AUDIO-MAXMSP-2013"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-JAMIE-PROJECTS-HISTORY-2026-001"
    },
    {
      id: "INT-2026-07-12-TEAMS-CRS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Selective archival review of authored Commercial Rent Stabilization data, provenance, and implementation materials.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Promoted the public-data pilot claim, retained the legislative provenance artifact as protected evidence, and excluded raw coalition and legal-review context.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-PRODUCTION-2026",
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-CRS-2026-001"
    },
    {
      id: "INT-2026-07-12-TEAMS-JOB-HUNT",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Close reading of the current resume, job-hunt context outline, and bounded source-backed-memory materials for editorial selection.",
      projectHints: ["portfolio", "source-backed-team-memory"],
      status: "processed",
      disposition:
        "Used as a private editorial routing layer; no resume draft, advisor material, proposal terms, or correspondence was treated as independent public proof.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-PRODUCTION-2026",
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CND-SORTED-AUDIO-MAXMSP-2013"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-JOB-HUNT-2026-001"
    },
    {
      id: "INT-2026-07-12-SOUNDINGS-RAFT",
      receivedAt: "2026-07-12",
      submittedBy: "Codex archive review",
      kind: "url",
      visibility: "public",
      summary:
        "Independent marine reporting on the distance, route, participants, construction, and public-participation design of the 2007 raft expedition.",
      sourceUrl: "https://soundingsonline.com/news/rollin-on-the-river-again/",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition:
        "Added as scale and process evidence while retaining the exact Gulf landing as unresolved.",
      linkedRecordIds: [
        "SRC-RAFT-SOUNDINGS-2007",
        "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
        "CND-RIVER-RAFT-KC-GULF"
      ]
    },
    {
      id: "INT-2026-07-12-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO",
      receivedAt: "2026-07-12",
      submittedBy: "Codex archive review",
      kind: "url",
      visibility: "public",
      summary:
        "Institutional project page documenting Jamie's 2013 Max/MSP audio-processing experiment.",
      sourceUrl:
        "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
      projectHints: ["technical-prototypes"],
      status: "processed",
      disposition:
        "Retained as a mature knowledge-bank candidate and held from the current portfolio composition.",
      linkedRecordIds: [
        "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        "CND-SORTED-AUDIO-MAXMSP-2013"
      ]
    },
    {
      id: "INT-2026-07-12-CRS-FULLER-PUBLIC-BASELINE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "public-safe",
      summary:
        "Approved two-page public brief specifying a privacy-preserving commercial vacancy and lease-cost data pilot.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Published as a public-safe citation artifact and promoted into the FairRentNYC case study.",
      linkedRecordIds: [
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      ]
    },
    {
      id: "INT-2026-07-12-CRS-PROVENANCE-REDLINE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Legislative provenance redline tracing public source layers across NYC and Albany Commercial Rent Stabilization texts.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Retained as protected evidence and a ready-for-promotion candidate; the legal and policy working document remains outside the public repository.",
      linkedRecordIds: [
        "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
        "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT"
      ],
      protectedLocatorId: "ARCHIVE-CRS-PROVENANCE-REDLINE-INTAKE-2026-001"
    },
    {
      id: "INT-2026-07-12-CRS-OPEN-DATA-FOUNDATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Public-safe metadata for an NYC Artist Coalition policy-to-data implementation brief and its distribution context.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Used as non-renderable context for the data-implementation lane; outgoing correspondence remains excluded.",
      linkedRecordIds: [
        "SRC-CRS-OPEN-DATA-FOUNDATION-2025",
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      ],
      protectedLocatorId: "ARCHIVE-CRS-OPEN-DATA-FOUNDATION-INTAKE-2026-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-RAFT-SOUNDINGS-2007",
      sourceId: "SRC-RAFT-SOUNDINGS-2007",
      readAt: "2026-07-12",
      reader: "Codex archive review",
      assertions: [
        {
          id: "ASSERT-RAFT-SOUNDINGS-ROUTE",
          statement:
            "Soundings reports that the expedition began on the Missouri River in Kansas City and reached the Mississippi.",
          locator: "Expedition background",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-RAFT-SOUNDINGS-DISTANCE",
          statement:
            "The report describes approximately 1,100 miles traveled before the group resumed from Vicksburg.",
          locator: "Opening paragraphs",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-RAFT-SOUNDINGS-PARTICIPATION",
          statement:
            "Jamie described inviting people encountered along the route to join and experience the river.",
          locator: "Participant and purpose section",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article describes a Gulf-bound goal and salt-water endpoint but does not document an exact final landing."
      ],
      entityIds: ["Jamie-Burkart", "Libby-Hendon", "Laura-Mattingly", "River-Raft-Project"],
      themeIds: ["participatory-systems", "waterways", "public-engagement"],
      candidateClaimIds: [
        "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
        "CND-RIVER-RAFT-KC-GULF"
      ]
    },
    {
      id: "READ-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      sourceId: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      readAt: "2026-07-12",
      reader: "Codex archive review",
      assertions: [
        {
          id: "ASSERT-SORTED-AUDIO-JAMIE",
          statement:
            "Monthly Music Hackathon NYC identifies Jamie as the maker of the program.",
          locator: "Project description",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SORTED-AUDIO-MAXMSP",
          statement:
            "The program used Max/MSP to split audio into segments and sort them by a selected feature.",
          locator: "Project description",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The page documents a hackathon experiment, not production deployment or commercial adoption."
      ],
      entityIds: ["Jamie-Burkart", "Monthly-Music-Hackathon-NYC"],
      themeIds: ["audio-software", "rapid-prototyping", "creative-technology"],
      candidateClaimIds: ["CND-SORTED-AUDIO-MAXMSP-2013"]
    },
    {
      id: "READ-CRS-FULLER-PUBLIC-BASELINE-2026",
      sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
      readAt: "2026-07-12",
      reader: "Codex archive review",
      assertions: [
        {
          id: "ASSERT-CRS-BASELINE-PILOT",
          statement:
            "Jamie specifies a three-part pilot: an indicator table, coverage and suppression table, and methods note.",
          locator: "Pages 1-2",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-BASELINE-PRIVACY",
          statement:
            "The brief explicitly excludes confidential filings, tenant identities, and parcel- or lease-level records.",
          locator: "Page 2, What this is not",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-BASELINE-COMPLEMENT",
          statement:
            "The proposed indicators complement rather than replace the existing storefront reporting system.",
          locator: "Page 1",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The document is a proposal and does not establish agency adoption, implementation, or access to confidential filings."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "NYC-Open-Data"],
      themeIds: ["public-data", "privacy", "implementation-specification"],
      candidateClaimIds: ["CND-CRS-PRIVACY-PRESERVING-DATA-PILOT"]
    },
    {
      id: "READ-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      sourceId: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      readAt: "2026-07-12",
      reader: "Codex archive review",
      assertions: [
        {
          id: "ASSERT-CRS-PROVENANCE-AUTHOR",
          statement:
            "The document identifies Jamie as its preparer for NYC Artist Coalition.",
          locator: "Title block",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-PROVENANCE-METHOD",
          statement:
            "The redline uses tracked changes and reviewer labels to expose source layers and policy inheritance rather than assign individual legislative authorship.",
          locator: "How to read this document",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The working document is unofficial, not legal advice, and is not cleared for public repository distribution."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["legislative-provenance", "source-lineage", "policy-translation"],
      candidateClaimIds: ["CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT"]
    },
    {
      id: "READ-CRS-OPEN-DATA-FOUNDATION-2025",
      sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-2025",
      readAt: "2026-07-12",
      reader: "Codex archive review",
      assertions: [
        {
          id: "ASSERT-CRS-OPEN-DATA-INDICATORS",
          statement:
            "The brief requests public aggregate indicator tables and a short technical methods note.",
          locator: "Requested actions",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-OPEN-DATA-BOUNDARY",
          statement:
            "The request distinguishes publishable aggregate indicators from confidential and proprietary microdata.",
          locator: "Requested actions",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The correspondence does not establish recipient endorsement, agency adoption, or implementation."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["public-data", "policy-implementation", "privacy"],
      candidateClaimIds: ["CND-CRS-PRIVACY-PRESERVING-DATA-PILOT"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      project: "fair-rent-nyc",
      text:
        "Jamie translated a commercial-vacancy data opportunity into an implementation-ready, privacy-preserving pilot specification.",
      status: "promoted",
      sourceIds: [
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "SRC-CRS-OPEN-DATA-FOUNDATION-2025",
        "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026"
      ],
      researchInquiryIds: [
        "INQ-TEAMS-ARCHIVAL-PRODUCTION-2026",
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"
      ],
      supportSummary:
        "The approved public brief directly specifies the release structure, minimum fields, privacy exclusions, and next-step questions; protected earlier and later artifacts corroborate the policy-to-data lane and its staff handoff.",
      missingEvidence: [],
      boundaries: [
        "Call it a proposal or pilot specification, not an adopted City program.",
        "Do not imply access to confidential records or official statistical authority."
      ],
      promotedClaimId: "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
      project: "fair-rent-nyc",
      text:
        "Jamie created a legislative provenance redline that makes source layers and policy inheritance reviewable across public Commercial Rent Stabilization texts.",
      status: "ready-for-promotion",
      sourceIds: ["SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The source directly identifies Jamie as preparer and explains the source-lineage method.",
      missingEvidence: [
        "A public-safe redacted excerpt or separate public methods note suitable for rendered citation"
      ],
      boundaries: [
        "The document is unofficial and not legal advice.",
        "Reviewer labels identify source layers, not individual legislative authorship.",
        "Do not publish the working document without a separate legal and public-safety review."
      ],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-SORTED-AUDIO-MAXMSP-2013",
      project: "technical-prototypes",
      text:
        "Jamie built a Max/MSP program that segmented audio and sorted the clips by a selected feature at Monthly Music Hackathon NYC in 2013.",
      status: "ready-for-promotion",
      sourceIds: ["SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013"],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The institutional project page directly names Jamie, the tool, and the program behavior.",
      missingEvidence: [],
      boundaries: [
        "Describe it as a hackathon prototype, not a production or commercial system."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-CRS-PRIVACY-PRESERVING-DATA-PILOT-2026",
      candidateClaimId: "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      claimId: "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      decision: "promoted",
      reason:
        "The approved public brief directly supports a concrete hiring claim about requirements, privacy boundaries, and smallest-viable implementation design.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-CRS-LEGISLATIVE-PROVENANCE-HOLD-2026",
      candidateClaimId: "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
      decision: "held",
      reason:
        "The claim is mature in the bank, but the protected working document should not become a rendered public citation without a separate public-safe excerpt.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-SORTED-AUDIO-MAXMSP-HOLD-2026",
      candidateClaimId: "CND-SORTED-AUDIO-MAXMSP-2013",
      decision: "held",
      reason:
        "The fact is defensible and useful for future technical-history composition, but it does not improve the current application-focused page hierarchy enough to project now.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-TEAMS-ARCHIVAL-PRODUCTION-2026-07-12",
      audience:
        "Hiring managers, civic-technology teams, implementation leaders, and public-interest collaborators",
      goal:
        "Use the iCloud working archive to strengthen Jamie's portfolio without turning the site into an archive browser.",
      argument:
        "Jamie's record combines long-running participatory systems practice with current implementation discipline: he can define the smallest useful public-data release, make source lineage reviewable, and preserve boundaries around sensitive material.",
      selectedClaimIds: [
        "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE"
      ],
      heldCandidateClaimIds: [
        "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
        "CND-SORTED-AUDIO-MAXMSP-2013",
        "CND-RIVER-RAFT-KC-GULF"
      ],
      rationale: [
        "Project the CRS pilot because it reduces hiring-manager inference and demonstrates requirements, privacy, and implementation judgment in one artifact.",
        "Use the new raft source to make an existing About-page throughline more concrete without claiming an unverified final landing.",
        "Retain the provenance and audio-software fragments for future page or opportunity-specific composition.",
        "Use job-hunt materials to choose evidence, not as independent verification of Jamie's accomplishments."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-TEAMS-ARCHIVE-RECURSIVE-PASS-2026",
      kind: "archive-research",
      summary:
        "Future Teams passes should follow source references outward from curated overviews, record iCloud hydration state, and prioritize public artifacts that clarify role, implementation choices, scale, or what became usable. The current pass found further technical-history, civic-data, and participatory-program leads without publishing private working records.",
      projectHints: [
        "participatory-public-systems",
        "technical-prototypes",
        "fair-rent-nyc",
        "source-backed-team-memory"
      ],
      sourceIds: [
        "SRC-RAFT-SOUNDINGS-2007",
        "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"
      ],
      candidateClaimIds: [
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
        "CND-SORTED-AUDIO-MAXMSP-2013",
        "CND-RIVER-RAFT-KC-GULF"
      ],
      rightsReviewRequired: false,
      status: "processed",
      createdAt: "2026-07-12"
    }
  ]
};
