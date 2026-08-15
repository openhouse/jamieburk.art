const reviewedAt = "2026-08-15";
const archiveCommit = "ea5497dd910f3402c01e8b560b149d6674f951cc";
const mediaSha256 = "24808b127cd7af7bf0e804db0e27ec59b82d57d96ebf62a2f1e617ed6845caef";

export const nycartcCulturalSpaceStoryAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15",
      kind: "public-artifact",
      title: "NYC Artist Coalition Cultural Space Rent Stabilization Story",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-source review",
      projectIds: ["fair-rent-nyc"],
      reason: "Preserve the launched Story as public evidence of coalition advocacy and Jamie's attributed voice without inflating editorial authorship, tags, or legislative effect.",
      sourceUrl: "https://www.instagram.com/stories/nycartc/3964470891412306511/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15"],
      observationIds: ["OBS-NYCARTC-CULTURAL-SPACE-STORY-PUBLICATION-2026-08-15"],
      researchInquiryIds: [],
      boundaries: [
        "Coalition-account publication does not establish Jamie as the sole author, editor, or publisher.",
        "Tagged accounts and sponsor acknowledgements do not establish endorsement.",
        "The corrected diarized transcript has cross-source editorial review; final human listening/approval remains a separate gate."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-NYCARTC-CULTURAL-SPACE-STORY-PUBLICATION-2026-08-15",
      intakeId: "INTAKE-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15",
      sourceId: "SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "On August 15, 2026, the NYC Artist Coalition published a 31-second Cultural Space Rent Stabilization Story using an edited excerpt of Jamie Burkart's May 19 Wonderville remarks and calling for action by Albany and the New York City Council.",
      locator: "Checksum-bound public Story source record",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCARTC-CULTURAL-SPACE-STORY-2026"],
      researchInquiryIds: [],
      limitations: [
        "The Story establishes publication by the coalition account and words attributed to Jamie, not sole individual editorial authorship.",
        "The media does not establish legislative passage, causation, or endorsement by tagged accounts."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15",
      title: "NYC Artist Coalition Cultural Space Rent Stabilization Story",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2026-08-15",
      capturedAt: "2026-08-15T20:20:28Z",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.instagram.com/stories/nycartc/3964470891412306511/",
      archiveUrl: `https://github.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/statements/campaigns/fair-rent-nyc/commercial-rent-stabilization/2026-08-15-nycartc-instagram-story-3964470891412306511/nyc-artist-coalition.md`,
      preferredPublicUrl: "archive",
      publicCitation: "NYC Artist Coalition, Cultural Space Rent Stabilization Instagram Story, August 15, 2026.",
      publicNote: `The source edition is pinned at commit ${archiveCommit}; the 31-second media SHA-256 is ${mediaSha256}. Local ASR, animated captions, Jamie's supplied cut, and the source-event transcript were reconciled into a corrected diarized transcript. Final human listening/approval remains separate.`,
      supportsGenerally: [
        "coalition-account publication",
        "August 15, 2026 publication date",
        "Jamie's attributed edited voice",
        "city-and-state commercial-rent call to action",
        "cultural-space continuity framing"
      ],
      doesNotEstablish: [
        "Jamie as sole author, editor, or publisher",
        "endorsement by tagged accounts or acknowledged sponsors",
        "support for every proposal by every named person",
        "legislative passage or campaign causation",
        "completed final human listening or publication approval"
      ],
      media: {
        mediaKind: "other",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only",
        visibleText: [
          "NYC's Small Cultural Spaces",
          "Tell Albany + NYC Council",
          "Pass #FairRentNYC",
          "Cultural Space Rent Stabilization"
        ],
        captureTimestamp: "2026-08-15T20:20:28Z",
        timestampConfidence: "high"
      }
    }
  ],

  claims: [
    {
      id: "CLM-NYCARTC-CULTURAL-SPACE-STORY-2026",
      project: "fair-rent-nyc",
      internalClaim: "The NYC Artist Coalition's August 15, 2026 Story used an edited excerpt of Jamie's Wonderville remarks to connect cultural-space continuity and collective agency with city- and state-level commercial-rent action.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "In August 2026, the NYC Artist Coalition published a Cultural Space Rent Stabilization Story using an edited excerpt of Jamie's Wonderville remarks to connect neighborhood cultural continuity with city- and state-level action.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15",
          relationship: "direct-support",
          supports: [
            "coalition-account publication",
            "Jamie's attributed edited voice",
            "cultural-space continuity framing",
            "city-and-state call to action"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the publication as a coalition Story using Jamie's attributed voice, not as a solely authored, edited, or published Jamie artifact.",
        "Do not treat tagged accounts or sponsor acknowledgements as endorsements.",
        "The corrected diarized transcript has cross-source editorial review; final human listening/approval remains separate.",
        "Keep legislative advocacy distinct from passage, official action, and causation."
      ],
      antiClaims: [
        "Jamie solely authored, edited, and published the Story",
        "Every tagged account endorsed the Story",
        "Every named official endorsed every proposal",
        "The Story caused legislative action",
        "The transcript has completed final human listening and publication approval"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-source review"]
    }
  ],

  entities: [],

  agencyRelations: [
    {
      id: "REL-NYCARTC-CULTURAL-SPACE-STORY-ADVOCACY-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-NYC-ARTIST-COALITION"],
      action: "advocated-for",
      objectId: "ENT-COMMERCIAL-RENT-PROTECTIONS",
      purpose: "Connect cultural-space continuity and collective agency to commercial-rent action at both city and state levels.",
      result: "The coalition account published a checksum-bound 31-second Story using Jamie's attributed edited voice.",
      creditScope: "collective",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-NYCARTC-CULTURAL-SPACE-STORY-2026"],
      sourceIds: ["SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15"],
      sourceSupportKeys: [
        "coalition-account publication",
        "Jamie's attributed edited voice",
        "city-and-state commercial-rent call to action"
      ],
      boundaries: [
        "The publication does not assign sole editorial authorship to Jamie, convert tags into endorsements, or establish legislative effect."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-source review"]
    }
  ],

  researchInquiries: []
};
