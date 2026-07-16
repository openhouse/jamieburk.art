import type {
  ClaimRecord,
  IntakeRecord,
  ProjectRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";
import {
  nterChngArchiveClaimIds,
  nterChngArchiveSourceIds
} from "./nter-chng-archive-expansion-batch-2026-07-14.ts";

const creativeTechnologySourceIds = [
  "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
  "SRC-PITCH-NTER-CHNG-2010",
  "SRC-VIMEO-NTER-CHNG-2011",
  "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
  "SRC-NPR-HORSE-LORDS-TRUTHERS-2016"
] as const;

const creativeTechnologyClaimIds = [
  "CLM-TIME-IS-LONG-DELAY-INSTALLATION-2006",
  "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION-2010",
  "CLM-SORTED-AUDIO-MAX-MSP-2013",
  "CLM-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016"
] as const;

const expandedCreativeTechnologySourceIds = [
  ...creativeTechnologySourceIds,
  ...nterChngArchiveSourceIds
] as const;

const expandedCreativeTechnologyClaimIds = [
  ...creativeTechnologyClaimIds,
  ...nterChngArchiveClaimIds
] as const;

export const iCloudTeamsExpansionIntake = [
  {
    id: "LEAD-ICLOUD-JPH-CREATIVE-TECHNOLOGY-EXPANSION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Jamie Projects History creative-technology expansion",
    summary:
      "A complete packet-level inventory and targeted close reading surfaced independent public documentation of Jamie's creative-technology practice across time-delayed video, real-time text interaction, Max/MSP audio transformation, and collaborative music visuals.",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked"
    ],
    projectIds: ["creative-technology-practice", "career-proof-system"],
    sourceIds: [...creativeTechnologySourceIds],
    claimIds: [...creativeTechnologyClaimIds],
    inquiryIds: ["INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY"],
    notes: [
      "Jamie Projects History contained 15 project packets at the time of review; packet presence was used for routing, not as proof by itself.",
      "Only independently public sources and public-safe source descriptions enter the repository.",
      "Every claim preserves named collaborator credit and remains reserve depth rather than an automatic website selection."
    ]
  },
  {
    id: "LEAD-ICLOUD-CRS-THIRTY-FOUR-PAGE-VERIFICATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Commercial Rent Stabilization running-minutes length verification",
    summary:
      "A preserved 34-page April-May 2026 running-minutes document resolves the portfolio's 30-plus-page aggregate while an earlier 12-page April 29 snapshot remains separately recorded.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked", "protected-from-publication"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026"],
    claimIds: ["CLM-CRS-OPERATING-BACKBONE-2026"],
    inquiryIds: [],
    notes: [
      "The 34-page figure describes one preserved document, not a sum of drafts or pages produced by the whole collaboration.",
      "The earlier 12-page snapshot is retained to prevent accidental substitution or date confusion.",
      "Raw coalition notes, participant details, strategy, legal review, contact data, and correspondence remain protected."
    ]
  },
  {
    id: "LEAD-ICLOUD-JOB-HUNT-JULY-RESUME-AUDIT-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "July 2026 approved-resume proof audit",
    summary:
      "Close reading of the July 11 approved application resume removed the Commercial Rent Stabilization page-count item from the open proof queue and sharpened the remaining quantified and role-attribution research priorities.",
    status: "integrated",
    dispositions: ["source-created", "inquiry-created", "project-linked", "protected-from-publication"],
    projectIds: ["career-proof-system"],
    sourceIds: ["SRC-JOB-HUNT-PROOF-AUDIT-2026"],
    claimIds: [],
    inquiryIds: ["INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT"],
    notes: [
      "The approved resume with Jamie's phone number remains the application PDF; the phone number does not enter website HTML or knowledge-bank prose.",
      "First-party resume wording prioritizes research but does not independently corroborate its own metrics, role language, or causal claims."
    ]
  }
] satisfies IntakeRecord[];

export const iCloudTeamsExpansionProjects = [
  {
    id: "creative-technology-practice",
    title: "Creative technology practice",
    aliases: ["time-based media", "interactive installation", "computational media"],
    period: "2006-2016",
    status: "historical",
    summary:
      "A source-backed reserve record of collaborative work across time-delayed video, real-time text participation, audio transformation, and music visuals.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["creative technology", "participatory media", "installation", "audio and video systems"],
    sourceIds: [...expandedCreativeTechnologySourceIds],
    claimIds: [...expandedCreativeTechnologyClaimIds],
    inquiryIds: [
      "INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY",
      "INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"
    ],
    photoBrief: {
      status: "research-needed",
      selectionQuestion:
        "Which cleared installation or interface images make the interaction legible while preserving collaborator credit and media rights?",
      evidenceNeeds: ["project and date", "interaction visible", "complete collaborator credit", "rights and caption approval"],
      rightsNotes:
        "Public source access does not grant image or video republication rights; recover original assets and permissions before display."
    }
  }
] satisfies ProjectRecord[];

export const iCloudTeamsExpansionSources = [
  {
    id: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
    title: "Cool Hunting Video Presents: BAP Lab Part 1: New Media Artists",
    organization: "Cool Hunting",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-08-01",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://coolhunting.com/culture/bap-lab-part-1/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Cool Hunting, 'Cool Hunting Video Presents: BAP Lab Part 1: New Media Artists,' August 1, 2006.",
    publicNote:
      "The article identifies Jamie's Time is Long as an installation that records viewers and returns their image approximately 20 minutes later through an extended VHS process.",
    supportsGenerally: [
      "Jamie as the artist associated with Time is Long",
      "time-delayed recording and playback as the installation's mechanism",
      "viewer participation as part of the work"
    ],
    doesNotEstablish: [
      "sole engineering or fabrication credit",
      "complete exhibition history",
      "audience size, reception, or later impact",
      "rights to republish article media"
    ]
  },
  {
    id: "SRC-PITCH-NTER-CHNG-2010",
    title: "NTR CHNG",
    organization: "The Pitch",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2010-01-07",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Pitch, 'NTR CHNG,' January 7, 2010.",
    publicNote:
      "The listing describes NTER CHNG as equal parts software application and architectural installation, with audience text messages appearing on a digital wall in real time.",
    supportsGenerally: [
      "NTER CHNG as a software and architectural installation",
      "real-time audience interaction through cell-phone text messages",
      "a public installation context in Kansas City"
    ],
    doesNotEstablish: [
      "the project's complete maker credits or division of labor",
      "Jamie's sole authorship",
      "audience size, technical architecture, or impact",
      "rights to republish article media"
    ]
  },
  {
    id: "SRC-VIMEO-NTER-CHNG-2011",
    title: "NTER CHNG",
    organization: "Vimeo",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-03-23",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://vimeo.com/21395655",
    preferredPublicUrl: "canonical",
    publicCitation: "NTER CHNG project video and credits, Vimeo, March 23, 2011.",
    publicNote:
      "The project page credits Drew Bolton, Jamie Burkart, and Garrett Fuselier with the interactive texting installation and separately credits collaborators who supported construction and performance.",
    supportsGenerally: [
      "Jamie as one of three credited makers of the interactive texting installation",
      "collaborative project credit",
      "real-time text participation and digital-wall display"
    ],
    doesNotEstablish: [
      "sole authorship by any one maker",
      "the detailed division of software, design, fabrication, or production labor",
      "audience size, reception, or impact",
      "rights to republish the video or stills"
    ]
  },
  {
    id: "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    title: "A Sorted Audio File",
    organization: "Monthly Music Hackathon",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2013-02-27",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    preferredPublicUrl: "canonical",
    publicCitation: "Monthly Music Hackathon, 'A Sorted Audio File,' February 27, 2013.",
    publicNote:
      "The project note says Jamie made a Max/MSP program that divides audio into small segments and sorts them according to a selected clip feature, demonstrated by ordering song fragments by pitch.",
    supportsGenerally: [
      "Jamie as maker of the Max/MSP program",
      "segmenting and sorting audio by a clip feature",
      "a pitch-sorted musical demonstration"
    ],
    doesNotEstablish: [
      "production deployment or commercial use",
      "complete code, performance, or exhibition history",
      "audience size or impact",
      "rights to republish embedded media"
    ]
  }
] satisfies SourceRecord[];

export const iCloudTeamsExpansionClaims = [
  {
    id: "CLM-TIME-IS-LONG-DELAY-INSTALLATION-2006",
    project: "creative-technology-practice",
    internalClaim:
      "A 2006 Cool Hunting article identifies Jamie's Time is Long as a participatory installation that records viewers and returns their image approximately 20 minutes later through an extended VHS process.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "In 2006, Jamie made Time is Long, a participatory installation that returned viewers' recorded image approximately 20 minutes after capture.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [{
      sourceId: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
      relationship: "direct-support",
      supports: ["artist attribution", "time-delay mechanism", "viewer participation"],
      confidence: "high",
      renderCitation: true
    }],
    boundaries: [
      "The source describes the artwork and interaction, not complete fabrication or technical credits.",
      "No audience, reception, or impact claim is attached."
    ],
    antiClaims: ["Jamie solely engineered every component", "The installation reached a quantified audience", "The source grants media republication rights"],
    researchInquiryIds: ["INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION-2010",
    project: "creative-technology-practice",
    internalClaim:
      "Public project sources credit Drew Bolton, Jamie Burkart, and Garrett Fuselier with NTER CHNG, a software and architectural installation that displayed audience text messages on a digital wall in real time.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "Jamie Burkart, Drew Bolton, and Garrett Fuselier created NTER CHNG, a software and architectural installation for real-time audience text interaction.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [
      {
        sourceId: "SRC-PITCH-NTER-CHNG-2010",
        relationship: "direct-support",
        supports: ["software and architectural installation form", "real-time audience text interaction"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-VIMEO-NTER-CHNG-2011",
        relationship: "corroborating",
        supports: ["three-person maker credit", "collaborative production context"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
        relationship: "corroborating",
        supports: ["America: Now and Here exhibition inclusion", "three-person visual-artist credit"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
        relationship: "corroborating",
        supports: ["observed visitor use", "text input and projected output"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The source credits three makers and additional collaborators; do not collapse the project into solo authorship.",
      "The exact division of software, design, construction, and production labor remains open."
    ],
    antiClaims: ["Jamie solely created NTER CHNG", "Jamie alone designed or built the wall", "The sources establish audience reach or impact"],
    researchInquiryIds: ["INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-SORTED-AUDIO-MAX-MSP-2013",
    project: "creative-technology-practice",
    internalClaim:
      "A 2013 Monthly Music Hackathon project note says Jamie made a Max/MSP program that segments audio and sorts the fragments by a selected feature, demonstrated by pitch.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "In 2013, Jamie made a Max/MSP program that segmented audio and sorted its fragments by a selected feature, demonstrated by pitch.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [{
      sourceId: "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      relationship: "direct-support",
      supports: ["maker attribution", "Max/MSP implementation", "segment-and-sort behavior", "pitch demonstration"],
      confidence: "high",
      renderCitation: true
    }],
    boundaries: [
      "The source documents a hack and demonstration, not a production product.",
      "The complete code, maintenance history, and later use were not recovered in this pass."
    ],
    antiClaims: ["The program was production software", "The program had commercial adoption", "The source establishes complete technical architecture"],
    researchInquiryIds: ["INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016",
    project: "creative-technology-practice",
    internalClaim:
      "Independent public sources document Jamie's creative-technology work at intervals from 2006 through 2016 across time-delayed video, real-time text interaction, Max/MSP audio transformation, and collaborative music visuals.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "Independent public sources document a decade of Jamie's creative-technology work across time-delayed video, real-time text interaction, audio transformation, and collaborative music visuals.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [
      { sourceId: "SRC-COOL-HUNTING-TIME-IS-LONG-2006", relationship: "direct-support", supports: ["time-delayed video installation in 2006"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-VIMEO-NTER-CHNG-2011", relationship: "direct-support", supports: ["real-time text installation credit"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013", relationship: "direct-support", supports: ["Max/MSP audio transformation in 2013"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016", relationship: "direct-support", supports: ["joint maker credit for a 2016 music video"], confidence: "high", renderCitation: true }
    ],
    boundaries: [
      "The dated sequence documents recurring work at four intervals, not uninterrupted full-time practice.",
      "Each project retains its own collaborator credits, context, and authorship boundary.",
      "Preserve M.C. Schmidt's joint maker credit for the 2016 Horse Lords video.",
      "The sequence does not establish audience reach, commercial success, or causal impact."
    ],
    antiClaims: ["Jamie practiced creative technology continuously and full time for ten years", "Jamie solely authored every project", "The source sequence proves market or audience impact"],
    researchInquiryIds: ["INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const iCloudTeamsExpansionInquiries = [
  {
    id: "INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY",
    project: "creative-technology-practice",
    question:
      "What code, original assets, collaborator accounts, and rights records would clarify Jamie's role and permit a future creative-technology portfolio projection?",
    methods: [
      "Recover project repositories, installation notes, technical diagrams, and dated original media without publishing private working files.",
      "Ask collaborators to confirm credits and division of labor where public sources are broad.",
      "Run project-level image, video, caption, consent, and rights review before any media selection.",
      "Keep each project's role and outcome distinct rather than treating a dated sequence as uninterrupted practice."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The current sources support bounded project descriptions and maker credits, but not complete role decomposition, asset ownership, audience reach, or impact."
    ],
    sourceIds: [...expandedCreativeTechnologySourceIds]
  }
] satisfies ResearchInquiry[];

export const iCloudTeamsExpansionPublicationDecisions = creativeTechnologyClaimIds.map(
  (claimId, index) => ({
    id: [
      "PUB-TIME-IS-LONG-DELAY-INSTALLATION-2006",
      "PUB-NTER-CHNG-COLLABORATIVE-INSTALLATION-2010",
      "PUB-SORTED-AUDIO-MAX-MSP-2013",
      "PUB-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016"
    ][index],
    claimId,
    decision: "reserve" as const,
    audiences: ["creative-technology employers", "media collaborators", "future editors"],
    surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"],
    rationale:
      "The source-backed record adds range and technical specificity, while the current hiring site should remain focused on technical project management, product operations, and implementation.",
    decidedAt: "2026-07-14"
  })
) satisfies PublicationDecision[];

export const iCloudTeamsExpansionProofCoverage = [
  {
    proofId: "creative-technology-practice",
    status: "source-backed",
    sourceIds: [...expandedCreativeTechnologySourceIds],
    inquiryIds: [
      "INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY",
      "INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"
    ],
    note:
      "Nine public records support bounded project, maker, exhibition, and observed-use claims across 2006-2016; complete role decomposition, source assets, republication rights, reach, and impact remain open.",
    reviewedAt: "2026-07-14"
  }
] satisfies ProofCoverage[];
