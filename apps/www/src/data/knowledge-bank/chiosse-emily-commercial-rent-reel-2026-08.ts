const reviewedAt = "2026-08-15";
const archiveCommit = "ea5497dd910f3402c01e8b560b149d6674f951cc";
const mediaSha256 = "cdef31ffe73e50f70a0d09b32b7863810d39c55bcde4b06c949cafa7595bee01";

export const chiosseEmilyCommercialRentReelAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
      kind: "public-artifact",
      title: "Chi Ossé and Emily Gallagher Small Business Rent Stabilization Reel",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-source archival review",
      projectIds: ["fair-rent-nyc"],
      reason: "Preserve a public joint explanation of the state Small Business Rent Stabilization Act as campaign context without turning it into a claim about Jamie or an unverified quantitative analysis.",
      sourceUrl: "https://www.instagram.com/reel/DbqIqG8PoAQ/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05"],
      observationIds: ["OBS-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05"],
      researchInquiryIds: [],
      boundaries: [
        "The Reel records Chi Ossé and Emily Gallagher advocating for the state bill; Jamie does not speak or appear in the source.",
        "Quantitative claims are transcribed as spoken and were not independently fact-checked in the archival pass.",
        "Cross-source editorial transcript review does not replace final human listening/approval or downstream reproduction rights."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
      intakeId: "INTAKE-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
      sourceId: "SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "In an August 5, 2026 joint Reel, Council Member Chi Ossé and Assembly Member Emily Gallagher advocated for the state Small Business Rent Stabilization Act and asked viewers to contact state representatives about sponsorship.",
      locator: "Checksum-bound public Reel and corrected 32-turn diarized transcript",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026"],
      researchInquiryIds: [],
      limitations: [
        "The source is campaign context and does not establish Jamie's participation, authorship, or endorsement by either speaker.",
        "The archived transcript preserves the speakers' quantitative claims without independently validating them."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
      title: "Chi Ossé and Emily Gallagher Small Business Rent Stabilization Reel",
      organization: "Office of Council Member Chi Ossé and Assembly Member Emily Gallagher",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2026-08-05",
      capturedAt: "2026-08-15T21:17:18Z",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.instagram.com/reel/DbqIqG8PoAQ/",
      archiveUrl: `https://github.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/sources/instagram/2026-08-05-chiosse-instagram-reel-DbqIqG8PoAQ/README.md`,
      preferredPublicUrl: "archive",
      publicCitation: "Chi Ossé with Emily Gallagher, Small Business Rent Stabilization Act Instagram Reel, August 5, 2026.",
      publicNote: `The source edition is pinned at commit ${archiveCommit}; the 95.846-second media SHA-256 is ${mediaSha256}. Its 32 speaker-attributed turns were repaired across local ASR, on-screen captions, and visible named speakers. TinyDiarize omitted complete turns and was retained as a failure receipt. Final human listening/approval remains separate.`,
      supportsGenerally: [
        "Chi Ossé and Emily Gallagher as speakers",
        "direct support for the state Small Business Rent Stabilization Act",
        "call to contact state representatives",
        "commercial rent guidelines board explanation",
        "anti-displacement and neighborhood continuity framing"
      ],
      doesNotEstablish: [
        "Jamie's participation, authorship, or endorsement",
        "independent verification of quantitative claims",
        "support for a distinct city bill",
        "legislative passage or campaign causation",
        "completed final human listening or publication approval"
      ],
      media: {
        mediaKind: "other",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only",
        visibleText: [
          "Small Business Rent Stabilization Act",
          "Call your state representatives"
        ],
        captureTimestamp: "2026-08-15T21:17:18Z",
        timestampConfidence: "high"
      }
    }
  ],

  claims: [
    {
      id: "CLM-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026",
      project: "fair-rent-nyc",
      internalClaim: "Chi Ossé and Emily Gallagher jointly presented the state Small Business Rent Stabilization Act as a response to commercial displacement and asked viewers to contact state representatives about sponsorship.",
      status: "confirmed-with-boundary",
      projections: [],
      evidence: [
        {
          sourceId: "SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05",
          relationship: "direct-support",
          supports: [
            "named speakers",
            "state-bill support",
            "state-representative call to action",
            "anti-displacement framing"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Keep this as Fair Rent campaign context with no portfolio projection; Jamie does not speak or appear in the Reel.",
        "Do not use the Reel as evidence for a distinct city bill or for legislative passage or causation.",
        "Treat quantitative claims as transcribed speech unless separately fact-checked.",
        "Final human listening/approval and reproduction rights remain separate gates."
      ],
      antiClaims: [
        "Jamie authored, appeared in, or was endorsed by the Reel",
        "The Reel proves its quantitative claims",
        "The Reel supports a distinct city bill",
        "The Reel caused legislative action",
        "The transcript has completed final human listening and publication approval"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source archival review"]
    }
  ],

  entities: [
    {
      id: "ENT-CHI-OSSE",
      name: "Chi Ossé",
      kind: "person",
      aliases: [],
      publicSafe: true
    },
    {
      id: "ENT-EMILY-GALLAGHER",
      name: "Emily Gallagher",
      kind: "person",
      aliases: [],
      publicSafe: true
    }
  ],

  agencyRelations: [
    {
      id: "REL-CHIOSSE-EMILY-ADVOCATED-SBRSA-REEL-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-CHI-OSSE", "ENT-EMILY-GALLAGHER"],
      action: "advocated-for",
      objectId: "ENT-SBRSA-2026",
      purpose: "Explain the state Small Business Rent Stabilization Act as a response to commercial displacement and invite constituent action.",
      result: "The public joint Reel presents a 95.846-second, 32-turn explanation and asks viewers to contact state representatives about sponsorship.",
      creditScope: "shared",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026"],
      sourceIds: ["SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05"],
      sourceSupportKeys: [
        "Chi Ossé and Emily Gallagher as speakers",
        "direct support for the state Small Business Rent Stabilization Act",
        "call to contact state representatives"
      ],
      boundaries: [
        "The joint advocacy does not establish Jamie's participation or endorsement, independent fact-checking, city-bill support, passage, or causation."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source archival review"]
    }
  ],

  researchInquiries: []
};
