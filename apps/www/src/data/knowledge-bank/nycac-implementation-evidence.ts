const reviewedAt = "2026-07-14";

export const nycacImplementationEvidence = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-CAMPAIGN-GIT-HISTORIES",
      kind: "public-artifact",
      title: "Retained NYC Artist Coalition campaign-site Git histories",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex archive review",
      projectIds: ["nyc-artist-coalition", "fair-rent-nyc", "talks-not-raids", "let-nyc-dance"],
      reason: "Reconcile Jamie-confirmed campaign-site implementation with repository-level authorship evidence.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
        "SRC-FAIRRENTNYC-GITHUB-REPOSITORY"
      ],
      observationIds: ["OBS-NYCAC-CAMPAIGN-GIT-AUTHORSHIP"],
      researchInquiryIds: ["INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP"],
      boundaries: [
        "Commit authorship supports implementation and maintenance; it does not assign sole authorship of coalition positions, copy, data, design, or outcomes.",
        "The repository locations, deployment remotes, and infrastructure details remain outside the public knowledge bank."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-CAMPAIGN-GIT-AUTHORSHIP",
      intakeId: "INTAKE-NYCAC-CAMPAIGN-GIT-HISTORIES",
      sourceId: "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Retained Git histories identify Jamie as author of every project-specific commit after framework boilerplate in FairRentNYC, Talks Not Raids, and Let NYC Dance, and as author of the retained coalition-site Ghost deployment history.",
      locator: "Repository author summaries and chronological commit logs, reviewed July 14, 2026",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION"],
      researchInquiryIds: ["INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP"],
      limitations: [
        "Repository authorship does not identify the author of every policy position, sentence, dataset, image, or design decision."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
      title: "NYC Artist Coalition campaign-site Git histories",
      organization: "Jamie Burkart retained project archive",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Jamie Burkart retained campaign-site Git histories, author summaries and commit logs reviewed July 14, 2026.",
      publicNote: "The public note reports aggregate authorship evidence without exposing local paths, deployment remotes, credentials, or private repository contents.",
      supportsGenerally: [
        "134 of 135 FairRentNYC commits authored by Jamie; the remaining commit is Ember CLI boilerplate",
        "31 of 32 Talks Not Raids commits authored by Jamie; the remaining commit is Ember CLI boilerplate",
        "133 of 134 Let NYC Dance commits authored by Jamie; the remaining commit is Ember CLI boilerplate",
        "17 retained coalition-site Ghost deployment commits authored by Jamie"
      ],
      doesNotEstablish: [
        "sole authorship of coalition positions",
        "individual authorship of every line of copy or data",
        "sole design authorship",
        "sole causation of campaign or policy outcomes"
      ]
    },
    {
      id: "SRC-FAIRRENTNYC-GITHUB-REPOSITORY",
      title: "FairRentNYC public repository",
      organization: "openhouse",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/FairRentNYC",
      preferredPublicUrl: "canonical",
      publicCitation: "openhouse/FairRentNYC public Git repository, accessed July 14, 2026.",
      publicNote: "Publicly inspectable repository preserving the FairRentNYC implementation and commit history.",
      supportsGenerally: ["FairRentNYC implementation", "Jamie-authored project history", "public inspectability"],
      doesNotEstablish: [
        "sole authorship of coalition policy",
        "authorship of every campaign asset",
        "policy causation",
        "complete collaborator history"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie directly implemented and maintained FairRentNYC, Talks Not Raids, Let NYC Dance, and the retained Ghost deployment for the NYC Artist Coalition site.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Retained Git history documents Jamie's direct implementation and maintenance of FairRentNYC, Talks Not Raids, Let NYC Dance, and the coalition site's Ghost deployment. Campaign positions and outcomes remained collective.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
          relationship: "direct-support",
          supports: ["repository-level implementation and maintenance authorship"],
          locator: "Author summaries and chronological commit logs",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-FAIRRENTNYC-GITHUB-REPOSITORY",
          relationship: "corroborating",
          supports: ["publicly inspectable FairRentNYC implementation history"],
          locator: "Repository commit history",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use implementation and maintenance language rather than sole authorship of coalition policy or public copy.",
        "Keep campaign strategy, participation, and outcomes collectively credited."
      ],
      antiClaims: [
        "Jamie solely authored every policy position, line of copy, dataset, or design decision",
        "Jamie alone produced every campaign image or asset",
        "Jamie's websites caused the policy outcomes"
      ],
      researchInquiryIds: ["INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival Git review"]
    }
  ]
} as const;
