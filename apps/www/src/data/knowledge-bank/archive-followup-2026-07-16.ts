import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";

export const archiveFollowupSourceRecords20260716 = [
  {
    id: "SRC-JPH-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    title: "A Sorted Audio File",
    organization: "Monthly Music Hackathon NYC",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2013-02-27",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Monthly Music Hackathon NYC, 'A Sorted Audio File,' February 27, 2013.",
    publicNote:
      "The institutional project page documents one working creative-technology prototype and attributes it to Jamie; it does not establish his later organizer role or a continuing product.",
    supportsGenerally: [
      "Jamie made a Max/MSP prototype at the February 2013 Music Hackathon NYC",
      "the program segmented an audio file and sorted the resulting clips by a selected feature",
      "the published example sorted fragments of Spencer Owen's 'Jeu des Treize' by pitch"
    ],
    doesNotEstablish: [
      "Jamie's later co-organizer role at Monthly Music Hackathon",
      "a production-ready audio product",
      "adoption, audience scale, or measured technical performance",
      "permission to republish Spencer Owen's recording"
    ]
  },
  {
    id: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
    title: "Open Data Foundation for a Future Commercial Rent Guidelines Board",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2025-11-26",
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart for NYC Artist Coalition, 'Open Data Foundation for a Future Commercial Rent Guidelines Board,' November 26, 2025.",
    publicNote:
      "Only the memo's public-safe structure is retained. The underlying working copy and circulation context remain protected.",
    protectedLocatorId: "ARCHIVE-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
    supportsGenerally: [
      "Jamie prepared an NYC Artist Coalition policy memo addressed to the Office of the New York City Comptroller",
      "the memo translated a future Commercial Rent Guidelines Board data need into two bounded requests",
      "the requests were aggregated machine-readable indicator tables and a short technical note defining a minimum public data suite",
      "the memo explicitly excluded confidential and proprietary microdata and called for suppression and licensing safeguards"
    ],
    doesNotEstablish: [
      "that the Comptroller's office adopted or implemented the requests",
      "that the requested datasets or technical note were released",
      "that Jamie represented the Comptroller, City Council, or another government body",
      "that Jamie alone originated every policy or data concept in the memo",
      "permission to publish protected circulation or contact details"
    ]
  },
  {
    id: "SRC-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026-06-18",
    title: "Source-correction working artifact for Source-Backed Team Memory follow-up",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-06-26",
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, private source-correction working artifact prepared for a Source-Backed Team Memory follow-up, June 2026.",
    publicNote:
      "The source remains private. Its public-safe metadata documents the correction and governance method, not the conversation's confidential substance.",
    protectedLocatorId: "ARCHIVE-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026",
    supportsGenerally: [
      "Jamie converted automated speech-to-text output into a readable working source artifact",
      "the artifact documented corrections for speaker continuity, topic flow, terminology, and selected speaker assignments",
      "the artifact explicitly identified itself as non-forensic, not independently fact-checked, private, and subject to human agreement",
      "the artifact preserved thinking-aloud texture while reducing automated transcription friction"
    ],
    doesNotEstablish: [
      "a legal or verbatim record",
      "independent verification of statements made during the conversation",
      "permission to publish the working record or identify private organizational context",
      "that a proposed sprint was commissioned or completed",
      "client adoption, product outcomes, or revenue"
    ]
  }
] satisfies SourceRecord[];

export const archiveFollowupClaimRecords20260716 = [
  {
    id: "CLM-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    project: "creative-technology-practice",
    internalClaim:
      "Monthly Music Hackathon NYC documented Jamie's February 2013 Max/MSP prototype, which segmented an audio file and sorted the clips by a selected feature; the published example sorted fragments by pitch.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Built a Max/MSP prototype that segmented an audio file and reordered the clips by pitch during a 2013 Music Hackathon NYC.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JPH-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        relationship: "direct-support",
        supports: [
          "Jamie's maker attribution",
          "Max/MSP implementation",
          "audio segmentation and feature sorting",
          "pitch-sorted published example"
        ],
        locator: "project title, introductory paragraph, and Jamie quotation",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Use this as evidence of one working creative-technology prototype, not a continuing product or measured system performance.",
      "Do not republish the source recording."
    ],
    antiClaims: [
      "Jamie created Monthly Music Hackathon alone.",
      "The prototype became a production audio product.",
      "The page establishes Jamie's later co-organizer role."
    ],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-FOLLOWUP-2026"],
    reviewedAt,
    reviewedBy: ["Codex iCloud archive follow-up review"]
  },
  {
    id: "CLM-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie prepared an NYC Artist Coalition memo that translated a future Commercial Rent Guidelines Board's data need into two bounded asks: publish aggregated indicator tables already used in public reports and issue a short technical note defining a minimum public data suite, while excluding confidential and proprietary microdata.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Prepared an NYC Artist Coalition memo that translated a future Commercial Rent Guidelines Board data need into bounded indicator-release and technical-documentation requests with confidentiality safeguards.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
        relationship: "private-support",
        supports: [
          "Jamie's preparation role",
          "two-part implementation request",
          "aggregated indicator and technical-note scope",
          "confidentiality, suppression, and licensing boundaries"
        ],
        locator:
          "memo header, two concrete steps, requested indicator list, and confidentiality boundary",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe the source as an authored coalition memo, not an adopted government plan.",
      "Keep the request distinct from the later public School of Data handout and from any actual agency release.",
      "Preserve the memo's exclusion of confidential and proprietary microdata and its suppression and licensing safeguards.",
      "Credit NYC Artist Coalition and the public reports and laws whose data lineage the memo synthesized."
    ],
    antiClaims: [
      "The Comptroller adopted Jamie's proposal.",
      "The requested datasets were released.",
      "Jamie represented a government office.",
      "Jamie alone originated Commercial Rent Stabilization's data strategy."
    ],
    researchInquiryIds: ["INQ-ICLOUD-TEAMS-FOLLOWUP-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex iCloud archive follow-up review"]
  },
  {
    id: "CLM-SOURCE-BACKED-CORRECTION-ARTIFACT-2026",
    project: "source-backed-team-memory",
    internalClaim:
      "Jamie produced a governed working record by correcting automated speech-to-text output for speaker continuity, topic flow, terminology, and selected speaker assignments while explicitly preserving privacy, non-forensic status, lack of independent fact-checking, and human agreement boundaries.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Turned automated speech-to-text output into a readable, source-governed working artifact with explicit correction, privacy, uncertainty, and human-review boundaries.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026-06-18",
        relationship: "private-support",
        supports: [
          "completed transcript-correction artifact",
          "named correction method",
          "privacy and non-forensic status",
          "human agreement boundary"
        ],
        locator: "status, note on this version, and transcript-editorial method",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source proves production of a governed working artifact, not independent truth of the conversation.",
      "Keep the working record, recipient context, organizational details, and conversational substance private.",
      "Human review and agreement remain authoritative over automated source correction.",
      "Do not convert artifact production into a commissioned-engagement or client-outcome claim."
    ],
    antiClaims: [
      "The working record is legal, verbatim, or independently fact-checked.",
      "The working record may be published without mutual permission.",
      "The artifact proves a paid or completed client engagement.",
      "AI served as the authority for the corrected record."
    ],
    researchInquiryIds: [
      "INQ-JOB-HUNT-SOURCE-BACKED-MEMORY-OUTCOME-2026",
      "INQ-ICLOUD-TEAMS-FOLLOWUP-2026"
    ],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex iCloud archive follow-up review"]
  }
] satisfies ClaimRecord[];

export const archiveFollowupResearchInquiries20260716 = [
  {
    id: "INQ-ICLOUD-TEAMS-FOLLOWUP-2026",
    project: "knowledge-bank",
    question:
      "Which non-duplicative professional evidence can a follow-up close reading recover across Jamie Projects History, CRS, and job-hunt without promoting working material into unsupported outcomes?",
    methods: [
      "Audited the July 14 archive records and unresolved research queue before selecting new material.",
      "Rechecked local iCloud data-fork availability rather than relying on filenames or logical sizes.",
      "Close-read one newly selected record from each required collection.",
      "Separated public institutional evidence, public-safe private metadata, and protected source content.",
      "Checked each candidate against existing knowledge-bank records to avoid duplicate ingestion."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Jamie Projects History yielded an institutional 2013 record of Jamie's Max/MSP sorted-audio prototype.",
      "CRS yielded a 2025 memo that decomposed a commercial-rent-data ambition into two bounded implementation requests with confidentiality safeguards.",
      "job-hunt yielded a completed source-correction artifact demonstrating the source-backed method's correction, privacy, uncertainty, and human-review boundaries.",
      "The newly reviewed job-hunt artifact strengthens evidence for the method but does not establish a commissioned or completed client engagement.",
      "Selected dataless placeholders remained not materialized after a fresh local availability check."
    ],
    limitations: [
      "This was an anchor-first follow-up, not an exhaustive read of every file in the three large collections.",
      "Not materialized remains a time-bounded availability status and is not evidence that a file is empty, lost, or never existed.",
      "A private working artifact can establish Jamie's method and completed artifact production without independently verifying its subject matter.",
      "No new aggregate portfolio metric was independently resolved in this pass."
    ],
    sourceIds: [
      "SRC-JPH-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
      "SRC-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026-06-18"
    ],
    publicSummary:
      "A second iCloud Teams pass recovered one non-duplicative professional source from each named collection while preserving materialization, privacy, proposal, and outcome boundaries.",
    protectedLocatorId: "RESEARCH-ICLOUD-TEAMS-FOLLOWUP-2026"
  }
] satisfies ResearchInquiry[];

export const archiveFollowupIntakeRecords20260716 = [
  {
    id: "INTAKE-JPH-MUSIC-HACKATHON-SORTED-AUDIO-2026",
    capturedAt: reviewedAt,
    capturedBy: "Codex iCloud archive follow-up review",
    kind: "public-url",
    title: "Monthly Music Hackathon sorted-audio prototype",
    publicSafeSummary:
      "An institutional 2013 page documents Jamie building a Max/MSP prototype that segmented an audio file and reordered the clips by pitch.",
    whyItMatters:
      "Adds a concrete, independently attributed creative-technology artifact to Jamie's record without inflating a one-day prototype into a product claim.",
    projectHints: ["creative-technology-practice", "monthly-music-hackathon"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    sourceIds: ["SRC-JPH-MUSIC-HACKATHON-SORTED-AUDIO-2013"],
    claimIds: ["CLM-MUSIC-HACKATHON-SORTED-AUDIO-2013"],
    inquiryIds: ["INQ-ICLOUD-TEAMS-FOLLOWUP-2026"],
    limitations: [
      "The source establishes one working prototype, not later organizer status, adoption, or continuing operation."
    ],
    nextActions: [
      "Retain as a candidate for a future creative-technology project cluster; do not add it to the current hiring narrative without a compositional need."
    ]
  },
  {
    id: "INTAKE-CRS-OPEN-DATA-FOUNDATION-MEMO-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex iCloud archive follow-up review",
    kind: "artifact-lead",
    title: "Open Data Foundation for a Future Commercial Rent Guidelines Board memo",
    publicSafeSummary:
      "Jamie prepared an NYC Artist Coalition memo that turned a future Commercial Rent Guidelines Board data need into bounded indicator-release and technical-documentation requests with confidentiality safeguards.",
    whyItMatters:
      "Shows policy translation as implementation scoping: defining the smallest useful public outputs, their users, and the data that must remain protected.",
    projectHints: ["fair-rent-nyc", "commercial-rent-stabilization", "open-data"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26"],
    claimIds: ["CLM-CRS-OPEN-DATA-FOUNDATION-MEMO-2025"],
    inquiryIds: ["INQ-ICLOUD-TEAMS-FOLLOWUP-2026"],
    limitations: [
      "The memo is an authored coalition request, not evidence of government adoption, release, or policy authority.",
      "The working copy and circulation context remain protected."
    ],
    nextActions: [
      "Keep the memo as policy-product evidence and use the later public School of Data handout for any current website projection."
    ]
  },
  {
    id: "INTAKE-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex iCloud archive follow-up review",
    kind: "artifact-lead",
    title: "Source-correction working record as method artifact",
    publicSafeSummary:
      "Jamie repaired automated speech-to-text output into a readable working artifact with explicit correction, privacy, non-forensic, uncertainty, and human-agreement boundaries.",
    whyItMatters:
      "Demonstrates the Source-Backed Team Memory practice through a completed artifact rather than a proposal alone.",
    projectHints: ["source-backed-team-memory", "job-hunt"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: ["SRC-JOB-HUNT-SOURCE-CORRECTION-ARTIFACT-2026-06-18"],
    claimIds: ["CLM-SOURCE-BACKED-CORRECTION-ARTIFACT-2026"],
    inquiryIds: [
      "INQ-JOB-HUNT-SOURCE-BACKED-MEMORY-OUTCOME-2026",
      "INQ-ICLOUD-TEAMS-FOLLOWUP-2026"
    ],
    limitations: [
      "The working record and its conversational substance remain private.",
      "Artifact production does not establish a commissioned engagement, independent factual verification, adoption, or client outcome."
    ],
    nextActions: [
      "Use only the public-safe method description unless all conversation participants separately approve a narrower excerpt.",
      "Keep the engagement-outcome inquiry open."
    ]
  }
] satisfies IntakeRecord[];
