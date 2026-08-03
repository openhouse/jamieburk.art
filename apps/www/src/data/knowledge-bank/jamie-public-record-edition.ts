const reviewedAt = "2026-08-03";

export const jamiePublicRecordEdition = {
  intakeItems: [
    {
      id: "INTAKE-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST",
      kind: "public-artifact",
      title: "Jamie Burkart public-record initial manifest",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex implementation review",
      projectIds: ["jamie-public-record"],
      reason: "Integrate a content-addressed, public-safe reference layer without creating a live dependency on a private sibling repository.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST"],
      observationIds: ["OBS-JAMIE-PUBLIC-RECORD-INITIAL-CORPUS"],
      researchInquiryIds: ["INQ-JAMIE-PUBLIC-RECORD-ENCOUNTER-SOURCES"],
      boundaries: [
        "The source repository remains private and public release is not authorized.",
        "The import contains public-safe metadata and digests only; protected research and source bodies remain outside this repository.",
        "Knowledge Wiki integration does not authorize portfolio projection."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-JAMIE-PUBLIC-RECORD-INITIAL-CORPUS",
      intakeId: "INTAKE-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST",
      sourceId: "SRC-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST",
      project: "jamie-public-record",
      kind: "source-fact",
      text: "The pinned source-edition candidate contains twelve public-safe records: seven canonical public-statement references, one public repository record, and four public-coverage gaps.",
      locator: "Pinned manifest snapshot and lock file",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-PUBLIC-RECORD-INITIAL-INTEGRATION"],
      researchInquiryIds: ["INQ-JAMIE-PUBLIC-RECORD-ENCOUNTER-SOURCES"],
      limitations: [
        "The manifest establishes repository structure and record states, not the truth of every source assertion or the meaning of a relationship.",
        "The source edition remains a private implementation candidate."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST",
      title: "Jamie Burkart public-record initial manifest",
      organization: "openhouse",
      author: "Jamie Burkart and Codex",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "openhouse/jamie-burkart-public-record, initial public-safe manifest candidate at f9858d41b28b36c35aece8e6986629ac569aaa84, imported August 3, 2026.",
      publicNote: "A content-addressed snapshot is retained locally so the public build has no runtime dependency on the private sibling repository.",
      supportsGenerally: [
        "practice-, project-, and encounter-first source-edition structure",
        "seven pinned references to complete public statement records",
        "four explicit public-coverage gaps",
        "content-addressed downstream exchange"
      ],
      doesNotEstablish: [
        "public release authorization",
        "quotation or reproduction rights",
        "private correspondence contents",
        "symposium participation or endorsement",
        "photograph permission",
        "portfolio selection"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-JAMIE-PUBLIC-RECORD-INITIAL-INTEGRATION",
      project: "jamie-public-record",
      internalClaim: "A first Jamie-centered public-source edition and content-addressed Knowledge Wiki import now exist as private, public-safe implementation candidates.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "A Jamie-centered public-source edition now links public words, work, and encounter questions through a pinned Knowledge Wiki manifest.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST",
          relationship: "direct-support",
          supports: ["repository structure", "record population", "manifest exchange contract"],
          locator: "Imported manifest and lock",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the implementation as a private public-safe candidate, not a public release.",
        "Do not project the claim to the portfolio until Jamie separately approves wording, audience, and placement.",
        "Do not treat coverage-gap encounter records as established participation, relationship, or endorsement."
      ],
      antiClaims: [
        "The repository publishes Jamie's private archive",
        "Every source in recommendation research is now public",
        "Symposium participants endorse Jamie",
        "The imported manifest authorizes portfolio placement"
      ],
      researchInquiryIds: ["INQ-JAMIE-PUBLIC-RECORD-ENCOUNTER-SOURCES"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex implementation review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-JAMIE-PUBLIC-RECORD-ENCOUNTER-SOURCES",
      project: "jamie-public-record",
      question: "Which public programs, recordings, publications, or participant-reviewed accounts can establish the Innsbruck, Vienna, and MIT encounter constellations without exposing protected research?",
      methods: [
        "Search official event and institutional archives by place, program, participant, and bounded date.",
        "Keep private research as a recovery lead rather than a public citation.",
        "Require participant-reviewed wording before making relational claims."
      ],
      runAt: reviewedAt,
      resultStatus: "not-recovered",
      findings: [
        "The initial bounded public browser pass did not recover a reliable source establishing Jamie's participation, role, date, or words for the three encounter constellations."
      ],
      limitations: [
        "Search-result failure is not proof that no public source exists.",
        "Photographs cannot establish invisible relationship meaning or endorsement.",
        "The year placeholders in the source edition are research markers, not asserted event dates."
      ],
      sourceIds: ["SRC-JAMIE-PUBLIC-RECORD-INITIAL-MANIFEST"],
      publicSummary: "Innsbruck, Vienna, and MIT remain public-source recovery questions rather than published professional claims."
    }
  ]
} as const;
