import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const jamieFacebookPostAudit = {
  cursorPages: 621,
  returnedNodes: 3728,
  uniqueRecords: 1243,
  recordsAppearingThreeTimes: 1242,
  recordsAppearingTwice: 1,
  survivingYearRange: [2006, 2022],
  readableMessages: 998,
  mediaLedOrUnavailable: 245,
  years: {
    2006: 2,
    2007: 5,
    2008: 4,
    2009: 218,
    2010: 82,
    2011: 88,
    2012: 153,
    2013: 184,
    2014: 109,
    2015: 68,
    2016: 122,
    2017: 118,
    2018: 27,
    2019: 42,
    2020: 19,
    2022: 2
  },
  forms: {
    text: 335,
    sharedStory: 244,
    photo: 221,
    mediaOrTextUnavailable: 159,
    photoAlbum: 135,
    event: 58,
    externalLink: 55,
    video: 36
  },
  relevance: {
    contextual: 1021,
    projectSpecific: 158,
    practiceRelated: 64
  },
  projectClusters: {
    wowList: 47,
    sundayDinner: 43,
    nycArtistCoalitionAndCampaigns: 33
  },
  externalDestinations: {
    recordsWithExternalUrls: 430,
    urlOccurrences: 718,
    uniqueUrls: 564,
    uniqueDomains: 195,
    missionRelevantRecordsWithUrls: 139,
    missionRelevantUrlOccurrences: 242,
    uniqueMissionRelevantUrls: 176,
    uniqueMissionRelevantDomains: 74
  },
  interactionMetrics: "not-recovered",
  stakeholderIdentityCensus: "not-recovered",
  censusPath:
    "docs/knowledge-bank/data/jamie-facebook-post-census-2026-07-14.csv"
} as const;

export const jamieFacebookPostIntake = [
  {
    id: "LEAD-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for Jamie's personal Facebook posts",
    summary:
      "Account for every record returned by Facebook's authenticated Posted by: You control, discover mission-relevant source and project routes, and preserve personal and engagement boundaries.",
    sourceUrl: "https://www.facebook.com/jburkart/",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: [
      "jamie-facebook-archive",
      "career-proof-system",
      "nyc-artist-coalition"
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
      "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"
    ],
    claimIds: [
      "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
      "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
      "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
      "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
      "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026"
    ],
    inquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    notes: [
      "The owner-filtered cursor terminated after 621 pages and 3,728 returned nodes; stable-story deduplication produced 1,243 unique records.",
      "A second-stage review covered all 222 project-specific or practice-related candidates while a destination inventory inspected external URLs across the full 1,243-record population.",
      "The ArtTattler review of Great Accommodations was promoted as an independent public source; the personal post that led to it remains protected provenance.",
      "Raw posts, exact dates, story IDs, URLs, privacy labels, people, comments, interaction data, authenticated responses, and media remain outside the public repository."
    ]
  }
] satisfies IntakeRecord[];

export const jamieFacebookPostSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
    title: "Jamie Burkart Facebook authored-post population control",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 authenticated review of Facebook's Manage Posts surface filtered to records posted by Jamie Burkart.",
    publicNote:
      "The review selected Facebook's Posted by: You control, confirmed the owner-filtered query state, and followed its cursor chain to the terminal flag.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "the authenticated Posted by: You population control",
      "an owner-filtered surface distinct from posts by others or tagged-only records",
      "a terminal server pagination flag"
    ],
    doesNotEstablish: [
      "an official Facebook account export",
      "records deleted, hidden, or removed before capture",
      "public visibility for every returned record",
      "every post Jamie ever created"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
    title: "Jamie Burkart Facebook full authored-post population run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 record-level accounting of Jamie Burkart's surviving Facebook authored-post population.",
    publicNote:
      "The cursor returned 3,728 nodes across 621 pages before its terminal flag. Stable-story deduplication produced 1,243 records after Facebook replayed almost the full population three times.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-002",
    supportsGenerally: [
      "1,243 unique stable story records",
      "3,728 returned nodes across 621 cursor pages",
      "the 2006 through 2022 surviving returned range",
      "998 records with readable message text and 245 records with unavailable or media-led text",
      "record-level year, form, broad-theme, and professional-relevance dispositions"
    ],
    doesNotEstablish: [
      "complete lifetime history",
      "public visibility for every record",
      "zero engagement where the query omitted interaction metrics",
      "professional importance from posting frequency"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
    title: "Jamie Burkart Facebook professional-candidate close reading",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 close reading of professionally relevant records surfaced from Jamie Burkart's surviving Facebook authored-post population.",
    publicNote:
      "A deterministic first pass marked 222 records for professional review: 158 project-specific and 64 practice-related. Raw text and social context remain protected.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-003",
    supportsGenerally: [
      "47 recovered WOW List-related authored records",
      "43 recovered Sunday Dinner-related authored records",
      "33 recovered NYC Artist Coalition or campaign-related authored records",
      "recurring implementation patterns across projects"
    ],
    doesNotEstablish: [
      "complete or exclusive keyword classifications",
      "a measure of effort, importance, reach, or impact",
      "independent corroboration of Jamie's own contemporaneous account",
      "sole credit for collective projects"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    title: "Jamie Burkart Facebook external-destination inventory",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata for a July 2026 inventory of external destinations in Jamie Burkart's surviving Facebook authored-post population.",
    publicNote:
      "The protected inventory normalized external destinations across every unique record and retained only aggregate counts and independently public-safe source discoveries in the repository.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-004",
    supportsGenerally: [
      "430 records with an external destination",
      "718 destination occurrences resolving to 564 unique URLs across 195 domains",
      "139 professionally relevant records carrying 176 unique URLs across 74 domains",
      "repeated routes to project, public-process, cultural, and published-source infrastructure"
    ],
    doesNotEstablish: [
      "that every destination was public-safe to associate with Jamie",
      "that destination owners engaged with or endorsed Jamie",
      "traffic, conversion, readership, attendance, or impact",
      "a complete inbound stakeholder network"
    ]
  },
  {
    id: "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009",
    title: "Big Wheel Keeps on Turning and the River Keeps on Rolling",
    organization: "ArtTattler",
    author: "Blair Schulman",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://arttattler.com/commentaryjamieburkart.html",
    archiveUrl:
      "https://web.archive.org/web/20141018214944/http://arttattler.com/commentaryjamieburkart.html",
    preferredPublicUrl: "archive",
    publicCitation:
      "Blair Schulman, 'Big Wheel Keeps on Turning and the River Keeps on Rolling,' ArtTattler, 2009.",
    publicNote:
      "The independent review documents Great Accommodations as a participatory river-centered exhibition, describes Jamie's practice, and records the prior raft journey and installation's trust-and-connection premise.",
    supportsGenerally: [
      "Great Accommodations as Jamie's participatory exhibition",
      "the river as connective social infrastructure",
      "the Missouri and Mississippi raft journey until salt water",
      "an installation organized around trust, mutual help, and public participation"
    ],
    doesNotEstablish: [
      "an exact Gulf of Mexico endpoint",
      "sole authorship of collective participation",
      "the complete crew, route, or program history",
      "rights to republish the article's installation photographs"
    ]
  }
] satisfies SourceRecord[];

export const jamieFacebookPostClaims = [
  {
    id: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The authenticated Posted by: You control returned 3,728 nodes across 621 pages and terminated after resolving to 1,243 unique stable story records from 2006 through 2022.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "A terminal-cursor census accounted for 1,243 unique records in Jamie's surviving Facebook Posted by: You population while preserving Facebook's replay behavior and the limits of a current authenticated surface.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
        relationship: "context",
        supports: ["the owner-filtered population control and terminal pagination method"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["page, returned-node, unique-record, year, form, and text-availability counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the surviving owner-filtered population exposed in the authenticated July 2026 session reached Facebook's terminal server flag.",
      "The control cannot reveal records deleted, hidden, or removed before capture and is not an official Facebook export.",
      "Privacy labels were unavailable for most records, so the raw population remains protected."
    ],
    antiClaims: [
      "The census contains every Facebook post Jamie ever created",
      "All 1,243 records were public",
      "The 3,728 returned nodes are 3,728 unique posts",
      "Missing years prove Jamie did not post during those years"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The full population contains 718 external-destination occurrences resolving to 564 unique URLs across 195 domains; the 222 professionally relevant records include 176 unique destinations across 74 domains.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "A protected destination inventory traced project routes and source-discovery leads across every surviving authored record without publishing personal-post URLs or relationship context.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
        relationship: "direct-support",
        supports: ["record, occurrence, unique-URL, domain, and mission-relevant destination counts"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The full URL inventory remains protected because a link can reveal personal subject, audience, or relationship context.",
      "A posted URL is an outgoing source or action route, not proof of inbound engagement, endorsement, readership, conversion, or impact."
    ],
    antiClaims: [
      "All 564 destinations are approved for public association with Jamie",
      "Destination owners or named stakeholders engaged with Jamie's post",
      "Posted-link frequency measures adoption or impact"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
    project: "jamie-facebook-archive",
    internalClaim:
      "A close reading of 222 professionally relevant candidate records documents recurring implementation work across civic, cultural, community, and technical projects.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie's personal Facebook record preserves a long implementation throughline: participation routes, usable instructions, recurring-program operations, public identity, documentation, and follow-through.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
        relationship: "private-support",
        supports: ["recurring implementation patterns across the protected professional candidate set"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is synthesis of Jamie's own authored record, not independent validation of every role, result, or causal claim.",
      "Project work was collective; use this archive to clarify Jamie's contribution without absorbing collaborators' work.",
      "The candidate count is a research aid, not a measure of professional effort or importance."
    ],
    antiClaims: [
      "Every professionally relevant record represents a separate project or outcome",
      "Posting frequency measures Jamie's labor or impact",
      "Jamie's authored record independently proves policy causality or sole leadership"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
    project: "nyc-artist-coalition",
    internalClaim:
      "Thirty-three NYC Artist Coalition or campaign-related authored records document Jamie's implementation practice across meetings, hearings, call scripts, action routes, safety training, public input, milestones, and collective credit.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie's contemporaneous authored record documents coalition implementation through meetings, hearings, action routes, safety training, public-input workflows, milestone communication, and collective credit.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
        relationship: "private-support",
        supports: ["Jamie's contemporaneous descriptions of coalition implementation work"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use independent public sources for campaign outcomes, government action, attendance, and causal claims.",
      "The record supports Jamie's implementation contribution, not sole coalition leadership or policy credit."
    ],
    antiClaims: [
      "Jamie alone created or led every NYC Artist Coalition campaign",
      "Thirty-three personal posts prove campaign impact or policy causality",
      "Every person, place, or event in the raw record is approved for publication"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The owner-filtered population query did not provide complete reaction, comment, or share metrics and cannot support a full stakeholder-identity engagement census.",
    status: "not-recovered",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    projections: [
      {
        key: "archive-note",
        text:
          "Population-level traction and stakeholder engagement were not recovered from the owner-filtered query; absent metrics remain unknown rather than zero.",
        status: "hold",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        relationship: "supports-boundary",
        supports: ["the absence of complete interaction fields from the recovered population query"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
        relationship: "supports-boundary",
        supports: ["the distinction between outgoing references and inbound engagement"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not describe absent interaction values as zero.",
      "Do not convert tags, actors, organizations, or posted destinations into viewers, responders, endorsers, partners, or stakeholder engagement."
    ],
    antiClaims: [
      "The archive shows zero engagement",
      "Every referenced stakeholder engaged with Jamie's post",
      "Post counts or destination counts measure reach or impact"
    ],
    researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex data-quality review"]
  }
] satisfies ClaimRecord[];

export const jamieFacebookPostInquiries = [
  {
    id: "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
    project: "jamie-facebook-archive",
    question:
      "Can Jamie's complete surviving owner-filtered Facebook post population be accounted for, mined for source and role evidence, and integrated without publishing a personal dossier or turning outgoing references into engagement claims?",
    methods: [
      "Opened Jamie's authenticated Facebook profile and selected Manage Posts with the Posted by: You control.",
      "Followed the owner-filtered server cursor through has_next_page: false and retained all 3,728 returned nodes across 621 pages.",
      "Deduplicated stable story identifiers into 1,243 unique records and audited Facebook's near-threefold replay behavior.",
      "Classified every unique record by year, primary form, broad theme, professional relevance, accounting status, and public-detail status.",
      "Close-read all 222 project-specific or practice-related candidates while retaining raw social context outside the repository.",
      "Normalized external destinations across all 1,243 records, then separated protected link inventory from independently public-safe source discoveries.",
      "Checked the population query for interaction coverage and kept absent metrics distinct from zero."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "The cursor terminated after 621 pages and 3,728 returned nodes, producing 1,243 unique records after deduplication.",
      "Facebook replayed 1,242 records three times and one record twice before returning the terminal flag.",
      "The population spans 2006 through 2022 and contains 998 records with readable message text plus 245 whose text was unavailable or media-led.",
      "The close read surfaced recurring implementation patterns and project clusters across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, waterways, and technical work.",
      "The full population contains 718 external-destination occurrences resolving to 564 unique URLs across 195 domains.",
      "The professional candidate set contains 176 unique destinations across 74 domains, including project routes, public-process infrastructure, and published-source leads.",
      "A posted ArtTattler route recovered an independent Great Accommodations review that now strengthens the canonical participatory-work evidence.",
      "Complete population-level interaction metrics and a stakeholder-identity engagement census were not recovered."
    ],
    limitations: [
      "A terminal current cursor cannot reveal records deleted, hidden, removed, or omitted before capture and is not an official Facebook export.",
      "Privacy labels were unavailable for most records, so raw content and the complete URL inventory remain protected.",
      "Broad themes and professional-relevance labels are research aids rather than neutral categories or measures of effort, importance, or impact.",
      "Jamie's own posts are first-person evidence and require independent corroboration for outcomes, causality, and contested role attribution.",
      "The query omitted complete interaction metrics; absent values are unknown, not zero.",
      "Outgoing names, tags, sources, and destinations do not establish inbound engagement, endorsement, partnership, or action."
    ],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
      "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"
    ],
    publicSummary:
      "A terminal-cursor review accounted for all 1,243 unique records exposed by Jamie's surviving Posted by: You surface, classified every record, traced protected source and project routes, and recovered one new independent source while keeping personal and engagement boundaries intact.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const jamieFacebookPostPublicationDecisions = [
  {
    id: "PUB-JAMIE-FACEBOOK-POPULATION-RESERVE-2026",
    claimId: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
    decision: "reserve",
    audiences: ["archive researchers", "future portfolio editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"],
    rationale:
      "Population accounting protects completeness and provenance but adds reader burden without improving the current hiring argument.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-DESTINATION-RESERVE-2026",
    claimId: "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    decision: "reserve",
    audiences: ["archive researchers", "future portfolio editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"],
    rationale:
      "The destination inventory is valuable for source discovery while the current site should cite the independently recovered sources rather than narrate personal posting behavior.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-OPERATIONS-RESERVE-2026",
    claimId: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
    decision: "reserve",
    audiences: ["hiring managers", "future case-study editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"],
    rationale:
      "The archive deepens role understanding, but stronger independent sources already carry the current public portfolio argument.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-NYCAC-RESERVE-2026",
    claimId: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
    decision: "reserve",
    audiences: ["hiring managers", "civic and cultural collaborators"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts"],
    rationale:
      "Use the personal archive as protected first-person role evidence while public campaign and government records remain the preferred outcome sources.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-JAMIE-FACEBOOK-ENGAGEMENT-HOLD-2026",
    claimId: "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026",
    decision: "hold",
    audiences: ["archive researchers"],
    surfaces: [],
    rationale:
      "The query did not recover complete interaction data or a defensible stakeholder-identity census; the boundary is retained to prevent future inflation.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const jamieFacebookPostProofCoverage = [] satisfies ProofCoverage[];
