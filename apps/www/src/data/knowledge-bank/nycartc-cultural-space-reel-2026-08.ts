const reviewedAt = "2026-08-21";
const archiveCommit = "e23822538dd6a7464503df6c585dcc680d0cd823";
const mediaSha256 = "91ad379f6edabeea1d83f6970e97917480b6aed5fa4a537de136fcea85107636";
const decodedAudioPcmSha256 = "bffd96151404c8d23bac2a5ba10dcc147a0a2215d98975ad17fe254f94fbaacd";

export const nycartcCulturalSpaceReelAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16",
      kind: "public-artifact",
      title: "NYC Artist Coalition Cultural Space Rent Stabilization Reel",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-source review",
      projectIds: ["fair-rent-nyc"],
      reason: "Preserve the Reel as a distinct public publication while relating its identical decoded audio to the earlier Story and keeping caption, sponsor, invitation, attribution, and rights boundaries explicit.",
      sourceUrl: "https://www.instagram.com/reel/DcHBB6Ix2Pd/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16"],
      observationIds: ["OBS-NYCARTC-CULTURAL-SPACE-REEL-PUBLICATION-2026-08-16"],
      researchInquiryIds: [],
      boundaries: [
        "The Reel and Story have identical decoded audio but remain distinct public objects with different URLs, dates, platform IDs, visual treatments, captions, and media hashes.",
        "The coalition account's sponsor acknowledgement is not a newly recovered first-person statement from each named official.",
        "The event invitation is not evidence of later attendance, speech, consent, or endorsement.",
        "Final human listening/approval and media-display rights remain separate gates."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-NYCARTC-CULTURAL-SPACE-REEL-PUBLICATION-2026-08-16",
      intakeId: "INTAKE-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16",
      sourceId: "SRC-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16",
      comparisonSourceIds: ["SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15"],
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "On August 16, 2026, the NYC Artist Coalition published a distinct Cultural Space Rent Stabilization Reel using the same decoded audio as its August 15 Story, adding a durable public caption that thanked Fair Rent NYC legislative sponsors and invited organizers to an August 18 meetup.",
      locator: "Checksum-bound public Reel source record and decoded-audio comparison",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCARTC-CULTURAL-SPACE-STORY-2026"],
      researchInquiryIds: [],
      limitations: [
        "The Reel establishes publication by the coalition account and words attributed to Jamie, not sole individual authorship, editing, or publishing.",
        "Sponsor acknowledgements are coalition-account words, not newly recovered statements by each named official.",
        "The invitation does not establish later attendance, speech, consent, endorsement, or event outcomes."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16",
      title: "NYC Artist Coalition Cultural Space Rent Stabilization Reel",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2026-08-16",
      capturedAt: "2026-08-21T14:34:00Z",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.instagram.com/reel/DcHBB6Ix2Pd/",
      archiveUrl: `https://github.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/statements/campaigns/fair-rent-nyc/commercial-rent-stabilization/2026-08-16-nycartc-instagram-reel-dchbb6ix2pd/nyc-artist-coalition.md`,
      preferredPublicUrl: "archive",
      publicCitation: "NYC Artist Coalition, Cultural Space Rent Stabilization Instagram Reel, August 16, 2026.",
      publicNote: `The source edition is pinned at commit ${archiveCommit}; the 31-second media SHA-256 is ${mediaSha256}. Its 48 kHz mono decoded-audio SHA-256 is ${decodedAudioPcmSha256}, identical to the August 15 Story audio. The Reel remains a distinct publication with a new public caption and visual treatment. Final human listening/approval remains separate.`,
      supportsGenerally: [
        "coalition-account publication",
        "August 16, 2026 publication date",
        "Jamie's attributed edited voice",
        "city-and-state commercial-rent call to action",
        "coalition acknowledgement of Fair Rent NYC legislative sponsors",
        "August 18 organizer-meetup invitation"
      ],
      doesNotEstablish: [
        "Jamie as sole author, editor, or publisher",
        "a newly recovered statement by each acknowledged sponsor",
        "later attendance, speech, consent, endorsement, or event outcomes",
        "legislative passage or campaign causation",
        "completed final human listening or media-display approval"
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
        captureTimestamp: "2026-08-21T14:34:00Z",
        timestampConfidence: "high"
      }
    }
  ],

  claims: [],
  entities: [],
  agencyRelations: [],
  researchInquiries: []
};
