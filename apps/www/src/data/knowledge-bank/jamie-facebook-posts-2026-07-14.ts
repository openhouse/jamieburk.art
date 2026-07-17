import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const archiveIntakeId = "INTAKE-JAMIE-FACEBOOK-POST-POPULATION-2026";
const articleIntakeId = "INTAKE-JAMIE-FACEBOOK-ARTTATTLER-2009";
const inquiryId = "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026";

const archiveSourceIds = [
  "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
  "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
  "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
  "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
  "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"
] as const;

const archiveClaimIds = [
  "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
  "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
  "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
  "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
  "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026"
] as const;

export const jamieFacebookPostCensus = {
  observedAt: "2026-07-14",
  authenticatedControl: "Manage Posts > Posted by: You",
  cursorPages: 621,
  returnedNodes: 3728,
  uniqueRecords: 1243,
  recordsAppearingThreeTimes: 1242,
  recordsAppearingTwice: 1,
  survivingYearRange: "2006 through 2022",
  readableMessages: 998,
  mediaLedOrUnavailable: 245,
  professionalCandidates: {
    total: 222,
    projectSpecific: 158,
    practiceRelated: 64,
    wowListRelated: 47,
    sundayDinnerRelated: 43,
    nycArtistCoalitionAndCampaignRelated: 33
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
  completenessStatement:
    "Every unique record returned by the surviving owner-filtered surface received an aggregate-only disposition after the server cursor reached its terminal flag. This is not a native Meta export, deletion history, or complete lifetime record.",
  publicLedger:
    "docs/knowledge-bank/data/jamie-facebook-post-census-2026-07-14.csv"
} as const;

export const jamieFacebookPostEntities = [
  {
    id: "ENT-JAMIE-FACEBOOK-ARCHIVE",
    kind: "project",
    label: "Jamie Burkart personal Facebook post archive",
    publicSafeSummary:
      "Protected first-person project and practice evidence derived from an authenticated owner-authored post census, represented publicly only through aggregate accounting, bounded source descriptions, and selected independent sources.",
    aliases: ["Jamie Facebook authored-post census"],
    projectKey: "jamie-facebook-archive",
    relatedEntityIds: [
      "ENT-WOWLIST",
      "ENT-SUNDAY-DINNER",
      "ENT-NYC-ARTIST-COALITION",
      "ENT-RIVER-PUBLIC-ENGAGEMENT"
    ],
    status: "historical"
  }
] satisfies EntityRecord[];

export const jamieFacebookPostIntake = [
  {
    id: archiveIntakeId,
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Authenticated full-population archival-production pass over Jamie's surviving owner-authored Facebook post surface, with aggregate accounting, protected close reading, posted-destination discovery, and explicit personal and engagement boundaries.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    entityIds: ["ENT-JAMIE-FACEBOOK-ARCHIVE"],
    disposition: "source-created",
    sourceIds: [...archiveSourceIds],
    claimIds: [...archiveClaimIds],
    researchTaskIds: [
      "TASK-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
      "TASK-JAMIE-FACEBOOK-ENGAGEMENT-RECOVERY-2026",
      "TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026"
    ],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: articleIntakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Independent 2009 review of Great Accommodations recovered from a posted source route and verified in a public Wayback capture.",
    submittedBy: "Codex public-source review",
    sourceUrl:
      "https://web.archive.org/web/20141018214944/http://arttattler.com/commentaryjamieburkart.html",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"],
    claimIds: ["CLM-RIVER-GREAT-ACCOMMODATIONS"],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const jamieFacebookPostSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
    title: "Jamie Burkart Facebook owner-authored post population control",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 authenticated review of Facebook's Manage Posts surface filtered to records posted by Jamie Burkart.",
    publicNote:
      "The review selected Facebook's Posted by: You control, confirmed the owner-filtered state, and followed its cursor chain to the terminal flag.",
    intakeIds: [archiveIntakeId],
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "the authenticated Posted by: You population control",
      "an owner-authored surface distinct from posts by others and tagged-only records",
      "a terminal server-pagination flag"
    ],
    doesNotEstablish: [
      "an official Meta account export",
      "records deleted, hidden, removed, or omitted before capture",
      "public visibility for every returned record",
      "every post Jamie ever created"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
    title: "Jamie Burkart Facebook full owner-authored post population run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 record-level accounting of Jamie Burkart's surviving Facebook owner-authored post population.",
    publicNote:
      "The cursor returned 3,728 nodes across 621 pages before its terminal flag. Stable-story deduplication produced 1,243 records after Facebook replayed almost the full population three times.",
    intakeIds: [archiveIntakeId],
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
      "Public-safe metadata for a July 2026 close reading of professionally relevant records surfaced from Jamie Burkart's surviving Facebook owner-authored post population.",
    publicNote:
      "A deterministic first pass marked 222 records for professional review: 158 project-specific and 64 practice-related. Raw text and social context remain protected.",
    intakeIds: [archiveIntakeId],
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
      "Public-safe aggregate metadata for a July 2026 inventory of external destinations in Jamie Burkart's surviving Facebook owner-authored post population.",
    publicNote:
      "The protected inventory normalized external destinations across every unique record and retained only aggregate counts and independently public-safe source discoveries in the repository.",
    intakeIds: [archiveIntakeId],
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
      "The independent review documents Great Accommodations as a participatory river-centered exhibition and describes its trust, mutual-help, and connection premise. The original site timed out during July 2026 verification; the archived capture remains available.",
    intakeIds: [archiveIntakeId, articleIntakeId],
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

export const jamieFacebookPostReadings = [
  {
    id: "READ-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-JAMIE-FACEBOOK-OWNER-FILTER",
        text: "Facebook's Posted by: You filter selected the owner-authored Manage Posts population and excluded the Others and tagged-only controls.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-facebook-owner-filter"],
        confidence: "high",
        locator: "Authenticated Manage Posts filter control"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-TERMINAL-CURSOR",
        text: "The owner-filtered pagination chain eventually returned its terminal server flag.",
        relationToJamie: "project-context",
        supportTags: ["jamie-facebook-terminal-cursor"],
        confidence: "high",
        locator: "Terminal pagination response"
      }
    ],
    limitations: [
      "The authenticated interface is not an official export and cannot disclose records deleted, hidden, or removed before review.",
      "The source is retained as protected metadata; no authentication material or raw response is present in the repository."
    ],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"]
  },
  {
    id: "READ-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-JAMIE-FACEBOOK-POPULATION-1243",
        text: "The terminal run returned 3,728 nodes across 621 pages and resolved to 1,243 unique stable story records.",
        relationToJamie: "project-context",
        supportTags: ["jamie-facebook-population-1243"],
        confidence: "high",
        locator: "Cursor and stable-story reconciliation"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-REPLAY-PATTERN",
        text: "Facebook replayed 1,242 records three times and one record twice before returning the terminal flag.",
        relationToJamie: "project-context",
        supportTags: ["jamie-facebook-replay-audit"],
        confidence: "high",
        locator: "Duplicate-frequency audit"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-TEXT-AVAILABILITY",
        text: "The unique population contains 998 records with readable message text and 245 records whose text was unavailable or media-led.",
        relationToJamie: "project-context",
        supportTags: ["jamie-facebook-text-availability"],
        confidence: "high",
        locator: "Aggregate record dispositions"
      }
    ],
    limitations: [
      "Privacy labels were unavailable for most records, so raw content remains protected.",
      "Interaction values were not part of the recovered population query; absent values are unknown rather than zero."
    ],
    researchTaskIds: [
      "TASK-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
      "TASK-JAMIE-FACEBOOK-ENGAGEMENT-RECOVERY-2026"
    ]
  },
  {
    id: "READ-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-JAMIE-FACEBOOK-PROFESSIONAL-CANDIDATES-222",
        text: "The first-pass classification surfaced 158 project-specific and 64 practice-related records for closer review.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-facebook-professional-candidates-222"],
        confidence: "high",
        locator: "Professional-relevance dispositions"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
        text: "Close reading identified recurring implementation patterns: participation routes, usable instructions, recurring-program operations, public identity, documentation, and follow-through.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-facebook-project-operations-thread"],
        confidence: "moderate",
        locator: "Protected professional-candidate close reading"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION",
        text: "Thirty-three NYC Artist Coalition and campaign-related records document meetings, hearings, action routes, safety training, public-input workflows, milestone communication, and collective credit in Jamie's authored record.",
        relationToJamie: "collective-role",
        supportTags: ["jamie-facebook-nycartc-implementation"],
        confidence: "moderate",
        locator: "Protected NYC Artist Coalition candidate cluster"
      }
    ],
    limitations: [
      "Jamie's own contemporaneous record supports role understanding but is not independent corroboration of outcomes or causality.",
      "Keyword-assisted group counts are non-exclusive research aids and do not measure work or importance."
    ],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026"]
  },
  {
    id: "READ-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    sourceId: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-JAMIE-FACEBOOK-EXTERNAL-DESTINATIONS-564",
        text: "Across the full population, 718 destination occurrences resolve to 564 unique URLs across 195 domains.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-facebook-external-destinations-564"],
        confidence: "high",
        locator: "Protected normalized-destination inventory"
      },
      {
        id: "PROP-JAMIE-FACEBOOK-MISSION-DESTINATIONS-176",
        text: "The 222 professionally relevant records contain 242 destination occurrences resolving to 176 unique URLs across 74 domains.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-facebook-mission-destinations-176"],
        confidence: "high",
        locator: "Protected mission-relevant destination inventory"
      }
    ],
    limitations: [
      "The full URL inventory remains protected because a destination can reveal personal subject, audience, or relationship context.",
      "Outgoing links are source and action routes, not inbound engagement, endorsement, readership, conversion, or impact."
    ],
    researchTaskIds: [
      "TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026",
      "TASK-JAMIE-FACEBOOK-ENGAGEMENT-RECOVERY-2026"
    ]
  },
  {
    id: "READ-GREAT-ACCOMMODATIONS-ARTTATTLER-2009",
    sourceId: "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-ARTTATTLER-GREAT-ACCOMMODATIONS-PARTICIPATORY",
        text: "The independent review describes Great Accommodations as a participatory exhibition centered on the Missouri River as a social network.",
        relationToJamie: "direct-role",
        supportTags: ["great-accommodations-independent-participatory-review"],
        confidence: "high",
        locator: "Review body"
      },
      {
        id: "PROP-ARTTATTLER-GREAT-ACCOMMODATIONS-TRUST",
        text: "The review interprets the installation through trust, accepting help, and the river's capacity to connect people, places, and ideas.",
        relationToJamie: "direct-role",
        supportTags: ["great-accommodations-trust-and-connection"],
        confidence: "high",
        locator: "Installation discussion"
      },
      {
        id: "PROP-ARTTATTLER-RIVER-JOURNEY-UNTIL-SALT",
        text: "The review repeats Jamie's account that the bicycle-powered raft traveled down the Missouri and Mississippi until the water tasted like salt.",
        relationToJamie: "direct-role",
        supportTags: ["river-journey-until-salt"],
        confidence: "moderate",
        locator: "Closing paragraph"
      }
    ],
    limitations: [
      "The route description is quoted from Jamie and does not independently establish an exact Gulf endpoint.",
      "The archived article includes photographs whose republication rights have not been cleared.",
      "The original site timed out during July 2026 verification; the public Wayback capture was available."
    ],
    researchTaskIds: ["TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026"]
  }
] satisfies SourceReading[];

export const jamieFacebookPostClaims = [
  {
    id: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The authenticated Posted by: You control returned 3,728 nodes across 621 pages and terminated after resolving to 1,243 unique stable story records from 2006 through 2022.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [archiveIntakeId],
    requiredSupportTags: [
      "jamie-facebook-owner-filter",
      "jamie-facebook-terminal-cursor",
      "jamie-facebook-population-1243",
      "jamie-facebook-replay-audit"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
        relationship: "context",
        supports: ["the owner-filtered population control and terminal pagination method"],
        propositionIds: [
          "PROP-JAMIE-FACEBOOK-OWNER-FILTER",
          "PROP-JAMIE-FACEBOOK-TERMINAL-CURSOR"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        relationship: "direct-support",
        supports: ["returned-node, unique-record, replay, year, form, and text-availability counts"],
        propositionIds: [
          "PROP-JAMIE-FACEBOOK-POPULATION-1243",
          "PROP-JAMIE-FACEBOOK-REPLAY-PATTERN",
          "PROP-JAMIE-FACEBOOK-TEXT-AVAILABILITY"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the surviving owner-filtered population exposed in the authenticated July 2026 session reached Facebook's terminal server flag.",
      "The control cannot reveal records deleted, hidden, removed, or omitted before capture and is not an official Meta export.",
      "Privacy labels were unavailable for most records, so the raw population remains protected."
    ],
    antiClaims: [
      "The census contains every Facebook post Jamie ever created.",
      "All 1,243 records were public.",
      "The 3,728 returned nodes are 3,728 unique posts.",
      "Missing years prove Jamie did not post during those years."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The full population contains 718 external-destination occurrences resolving to 564 unique URLs across 195 domains; the 222 professionally relevant records include 176 unique destinations across 74 domains.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [archiveIntakeId],
    requiredSupportTags: [
      "jamie-facebook-external-destinations-564",
      "jamie-facebook-mission-destinations-176"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
        relationship: "direct-support",
        supports: ["record, occurrence, unique-URL, domain, and mission-relevant destination counts"],
        propositionIds: [
          "PROP-JAMIE-FACEBOOK-EXTERNAL-DESTINATIONS-564",
          "PROP-JAMIE-FACEBOOK-MISSION-DESTINATIONS-176"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The full URL inventory remains protected because a link can reveal personal subject, audience, or relationship context.",
      "A posted URL is an outgoing source or action route, not proof of inbound engagement, endorsement, readership, conversion, or impact."
    ],
    antiClaims: [
      "All 564 destinations are approved for public association with Jamie.",
      "Destination owners or named stakeholders engaged with Jamie's post.",
      "Posted-link frequency measures adoption or impact."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
    project: "jamie-facebook-archive",
    internalClaim:
      "A close reading of 222 professionally relevant candidate records documents recurring implementation work across civic, cultural, community, and technical projects.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [archiveIntakeId],
    requiredSupportTags: [
      "jamie-facebook-professional-candidates-222",
      "jamie-facebook-project-operations-thread"
    ],
    composition: {
      action:
        "Repeatedly translated emerging collective purposes into invitations, participation routes, usable instructions, recurring-program operations, public identity, documentation, and follow-through.",
      intendedEnd:
        "Help collaborators, residents, artists, organizers, and participants understand how to join, contribute, respond, or carry work forward.",
      usableResult:
        "A recurring implementation practice visible across civic, cultural, community, and technical projects rather than a collection of isolated announcements.",
      audience:
        "Hiring readers and collaborators evaluating technical project management, product operations, implementation, and public-facing systems work.",
      collectiveCredit:
        "Jamie's authored record documents his recurring contribution; the projects and their outcomes belong to collaborators, participants, institutions, and communities as well.",
      causalBoundary:
        "The first-person archive supports role understanding but does not independently prove external outcomes, causality, adoption, or sole leadership."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
        relationship: "private-support",
        supports: ["recurring implementation patterns across the protected professional candidate set"],
        propositionIds: [
          "PROP-JAMIE-FACEBOOK-PROFESSIONAL-CANDIDATES-222",
          "PROP-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD"
        ],
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
      "Every professionally relevant record represents a separate project or outcome.",
      "Posting frequency measures Jamie's labor or impact.",
      "Jamie's authored record independently proves policy causality or sole leadership."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: [
      "Jamie Burkart",
      "Codex protected-source review",
      "Codex Chad-lens composition review"
    ]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
    project: "nyc-artist-coalition",
    internalClaim:
      "Thirty-three NYC Artist Coalition or campaign-related authored records document Jamie's implementation practice across meetings, hearings, call scripts, action routes, safety training, public input, milestones, and collective credit.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [archiveIntakeId],
    requiredSupportTags: ["jamie-facebook-nycartc-implementation"],
    composition: {
      action:
        "Created and maintained public participation infrastructure around coalition meetings, hearings, call scripts, action routes, fire-safety learning, public input, and milestone communication.",
      intendedEnd:
        "Make civic processes more usable for artists, organizers, venue operators, and small cultural spaces seeking safety, affordability, dignity, and a meaningful voice in city decisions.",
      usableResult:
        "Repeatable ways to learn, meet, testify, call, respond, and understand movement from lived experience through public process.",
      audience:
        "Artists, event organizers, small-space operators, coalition collaborators, public officials, and future implementation-focused hiring readers.",
      collectiveCredit:
        "Jamie's contemporaneous record clarifies his implementation contribution while preserving the work of coalition co-founders, venue hosts, artists, organizers, advocates, public participants, and officials.",
      causalBoundary:
        "Personal posts support Jamie's role but do not prove policy causality, sole coalition leadership, attendance, audience size, or every collaborator's contribution."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
        relationship: "private-support",
        supports: ["Jamie's contemporaneous descriptions of coalition implementation work"],
        propositionIds: ["PROP-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use independent public sources for campaign outcomes, government action, attendance, and causal claims.",
      "The record supports Jamie's implementation contribution, not sole coalition leadership or policy credit."
    ],
    antiClaims: [
      "Jamie alone created or led every NYC Artist Coalition campaign.",
      "Thirty-three personal posts prove campaign impact or policy causality.",
      "Every person, place, or event in the raw record is approved for publication."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: [
      "Jamie Burkart",
      "Codex protected-source review",
      "Codex Chad-lens composition review"
    ]
  },
  {
    id: "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026",
    project: "jamie-facebook-archive",
    internalClaim:
      "The owner-filtered population query did not provide complete reaction, comment, or share metrics and cannot support a full stakeholder-identity engagement census.",
    status: "not-recovered",
    maturity: "researching",
    intakeIds: [archiveIntakeId],
    requiredSupportTags: [],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        relationship: "supports-boundary",
        supports: ["the absence of complete interaction fields from the recovered population query"],
        propositionIds: [],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
        relationship: "supports-boundary",
        supports: ["the distinction between outgoing references and inbound engagement"],
        propositionIds: [],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not describe absent interaction values as zero.",
      "Do not convert tags, actors, organizations, or posted destinations into viewers, responders, endorsers, partners, or stakeholder engagement."
    ],
    antiClaims: [
      "The archive shows zero engagement.",
      "Every referenced stakeholder engaged with Jamie's post.",
      "Post counts or destination counts measure reach or impact."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex data-quality review"]
  }
] satisfies ClaimRecord[];

export const jamieFacebookPostResearchTasks = [
  {
    id: "TASK-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
    project: "jamie-facebook-archive",
    question:
      "Can every unique record exposed by Facebook's surviving owner-authored post surface receive a public-safe archival disposition?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [archiveIntakeId],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026"
    ],
    claimIds: [...archiveClaimIds],
    nextActions: [
      "Re-run the owner-filtered terminal control and reconcile the aggregate ledger if Facebook exposes a materially different surviving population."
    ],
    resolutionSummary:
      "Yes. The cursor reached its terminal flag after 621 pages and 3,728 returned nodes; stable-story deduplication produced 1,243 unique records, each represented by one aggregate-only ledger row."
  },
  {
    id: "TASK-JAMIE-FACEBOOK-ENGAGEMENT-RECOVERY-2026",
    project: "jamie-facebook-archive",
    question:
      "Can a privacy-safe research method recover complete interaction totals and defensible stakeholder-group engagement without publishing a personal social graph?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [archiveIntakeId],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026"
    ],
    claimIds: ["CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026"],
    nextActions: [
      "Design a privacy-safe analysis of an authorized native Facebook account export if the product exposes complete post-interaction data.",
      "Define public-interest stakeholder groups before analysis and keep private individuals, relationship context, and raw interaction rows outside the repository.",
      "Treat missing metrics as unknown, distinguish exposure from response, and independently verify any selected public stakeholder-account interaction before promotion."
    ]
  },
  {
    id: "TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026",
    project: "jamie-facebook-archive",
    question:
      "Which mission-relevant posted destinations can become independently verified public sources that strengthen existing project claims?",
    status: "in-progress",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [archiveIntakeId, articleIntakeId],
    sourceIds: [
      "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026",
      "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"
    ],
    claimIds: [
      "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
      "CLM-RIVER-GREAT-ACCOMMODATIONS"
    ],
    nextActions: [
      "Continue resolving the protected mission-relevant destination queue against public originals and archives.",
      "Promote only independently public-safe sources after close reading and attach each to the specific claim it supports.",
      "Keep a post's outgoing association separate from source authorship, endorsement, readership, and inbound engagement."
    ],
    resolutionSummary:
      "The pass recovered and verified Blair Schulman's archived ArtTattler review as one new independent source; remaining protected destination leads continue through the normal source-reading lifecycle."
  }
] satisfies ResearchTask[];

export const jamieFacebookPostInquiries = [
  {
    id: inquiryId,
    project: "jamie-facebook-archive",
    question:
      "Can Jamie's complete surviving owner-filtered Facebook post population be accounted for, mined for source and role evidence, and integrated without publishing a personal dossier or turning outgoing references into engagement claims?",
    methods: [
      "Opened Jamie's authenticated Facebook profile and selected Manage Posts with the Posted by: You control.",
      "Followed the owner-filtered server cursor through its terminal flag and retained all 3,728 returned nodes across 621 pages in the protected workspace.",
      "Deduplicated stable story identifiers into 1,243 unique records and audited Facebook's near-threefold replay behavior.",
      "Classified every unique record by year, primary form, broad theme, professional relevance, accounting status, and public-detail status.",
      "Close-read all 222 project-specific or practice-related candidates while retaining raw social context outside the repository.",
      "Normalized external destinations across all 1,243 records, then separated the protected link inventory from independently public-safe source discoveries.",
      "Checked the population query for interaction coverage and kept absent metrics distinct from zero."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The cursor terminated after 621 pages and 3,728 returned nodes, producing 1,243 unique records after deduplication.",
      "Facebook replayed 1,242 records three times and one record twice before returning the terminal flag.",
      "The population spans 2006 through 2022 and contains 998 records with readable message text plus 245 whose text was unavailable or media-led.",
      "The close read surfaced recurring implementation patterns and project clusters across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, waterways, and technical work.",
      "The full population contains 718 external-destination occurrences resolving to 564 unique URLs across 195 domains.",
      "The professional candidate set contains 176 unique destinations across 74 domains, including project routes, public-process infrastructure, and published-source leads.",
      "A posted ArtTattler route recovered an independent Great Accommodations review that strengthens the canonical participatory-work evidence.",
      "Complete population-level interaction metrics and a stakeholder-identity engagement census were not recovered."
    ],
    limitations: [
      "A terminal current cursor cannot reveal records deleted, hidden, removed, or omitted before capture and is not an official Meta export.",
      "Privacy labels were unavailable for most records, so raw content and the complete URL inventory remain protected.",
      "Broad themes and professional-relevance labels are research aids rather than neutral categories or measures of effort, importance, or impact.",
      "Jamie's own posts are first-person evidence and require independent corroboration for outcomes, causality, and contested role attribution.",
      "The query omitted complete interaction metrics; absent values are unknown, not zero.",
      "Outgoing names, tags, sources, and destinations do not establish inbound engagement, endorsement, partnership, or action."
    ],
    sourceIds: [...archiveSourceIds],
    publicSummary:
      "A terminal-cursor review accounted for all 1,243 unique records exposed by Jamie's surviving Posted by: You surface, classified every record, traced protected source and project routes, and recovered one new independent source while keeping personal and engagement boundaries intact.",
    protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

const deferredClaimIds = archiveClaimIds.filter(
  (claimId) => claimId !== "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026"
);

export const jamieFacebookPostDecisions = [
  ...deferredClaimIds.map((claimId, index) => ({
    id: `DEC-DEFER-JAMIE-FACEBOOK-POST-${index + 1}`,
    claimId,
    surface: "future-portfolio-composition",
    decision: "defer" as const,
    rationale:
      claimId === "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020"
        ? "This public-ready operating-practice claim is valuable reserve depth, but the current portfolio already makes the argument through stronger public sources and clearer project cases."
        : claimId === "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019"
          ? "Retain the first-person implementation record for future audience-specific composition while independent press, campaign, and government records continue to carry public outcomes."
          : "Retain population and source-routing accountability in the knowledge bank without making personal Facebook activity a public portfolio argument.",
    decidedAt: "2026-07-14",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated archival review",
      "Codex Chad-lens composition review"
    ]
  })),
  {
    id: "DEC-DISALLOW-JAMIE-FACEBOOK-ENGAGEMENT-CLAIM",
    claimId: "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026",
    surface: "future-portfolio-composition",
    decision: "disallow",
    rationale:
      "The recovered population query omitted complete interaction values and cannot support reaction totals, stakeholder-response totals, reach, endorsement, adoption, or impact claims.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex data-quality review"]
  }
] satisfies ProjectionDecision[];
