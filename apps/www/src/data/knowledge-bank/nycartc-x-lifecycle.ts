import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const projectIds = ["PRJ-NYC-ARTIST-COALITION"];
const entityIds = ["ENT-NYC-ARTIST-COALITION"];
const reviewedAt = "2026-07-15";
const sourceId = "SRC-NAC-X-CORPUS-2026-07-15";
const researchTaskId = "TASK-NYCAC-X-FULL-POPULATION-2026-07-15";

export const nycartcXLifecycle = {
  leads: [
    {
      id: "LEAD-NYCAC-X-FULL-POPULATION",
      title: "NYC Artist Coalition X full-population accounting",
      kind: "document",
      capturedAt: reviewedAt,
      capturedBy: "Codex authenticated public-web archival review",
      state: "extracted",
      visibility: "public",
      publicSummary: "A governed authenticated corpus accounts for the 5,124-post profile control as 3,367 recovered public account items and an explicit 1,757-item recovery gap.",
      publicUrl: "https://x.com/NYCArtC/with_replies",
      projectAssociationStatus: "assigned",
      projectIds,
      entityIds: [...entityIds, "ENT-NYC-COUNCIL"],
      sourceIds: [sourceId],
      candidateClaimIds: [
        "CND-NYCAC-X-CAMPAIGN-CONTINUITY",
        "CND-NYCAC-X-SOURCE-CIRCULATION",
        "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION",
        "CND-NYCAC-X-REPOST-SOURCE-PATTERN",
        "CND-NYCAC-X-TRACTION-SNAPSHOT"
      ],
      researchTaskIds: [researchTaskId],
      nextAction: "Seek a lawful owner archive or stronger public archive to reduce the 1,757-item recovery gap without inferring what the unavailable items contained."
    }
  ] satisfies KnowledgeLifecycle["leads"],

  observations: [
    {
      id: "OBS-NYCAC-X-POPULATION-ACCOUNTING",
      sourceId,
      projectIds,
      entityIds,
      statement: "The authenticated profile reported 5,124 posts; overlapping replies-inclusive traversals and monthly historical authored-search partitions recovered 3,367 distinct account items and preserve the remaining 1,757 as an explicit unclassified recovery gap.",
      locator: "Corpus JSON population section and transformation-manifest section",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["the contents or item types of the 1,757 unavailable records", "deleted or private activity", "individual post authorship"],
      candidateClaimIds: ["CND-NYCAC-X-CAMPAIGN-CONTINUITY"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-COMPOSITION",
      sourceId,
      projectIds,
      entityIds,
      statement: "The recovered population contains 696 authored posts and 2,671 native reposts spanning February 3, 2017 through May 18, 2026; third-party repost text is omitted from the public corpus.",
      locator: "Corpus JSON population section and item-kind fields",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["complete lifetime recovery", "Jamie's authorship of 696 posts", "the author or selector behind each shared-account record"],
      candidateClaimIds: ["CND-NYCAC-X-CAMPAIGN-CONTINUITY"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-CAMPAIGN-MARKERS",
      sourceId,
      projectIds,
      entityIds,
      statement: "Among 696 recovered authored posts, 195 distinct posts use #FairRentNYC, 110 use #SaveNYCSpaces, 78 use #LetNYCDance, and 54 use #TalksNotRaids; categories overlap.",
      locator: "Corpus JSON campaignMarkers section and status-ID sets",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["four mutually exclusive campaigns", "audience reach", "campaign outcomes or policy causation"],
      candidateClaimIds: ["CND-NYCAC-X-CAMPAIGN-CONTINUITY"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-SOURCE-CIRCULATION",
      sourceId,
      projectIds,
      entityIds,
      statement: "All 1,235 distinct short URLs in recovered account items resolve. Of 696 authored posts, 446 contain 529 outgoing-link occurrences representing 287 distinct short URLs.",
      locator: "Corpus JSON linkInventory section and per-item outgoing-link fields",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["endorsement of every destination", "article accuracy", "audience reach or conversion"],
      candidateClaimIds: ["CND-NYCAC-X-SOURCE-CIRCULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-SOURCE-LEADS",
      sourceId,
      projectIds,
      entityIds,
      statement: "Mission-relevant destinations span Cabaret Law repeal, Office of Nightlife, MARCH accountability, commercial rent, cultural-space closure, and later venue-enforcement reporting; article-level claims remain source-positioned according to whether their bodies were recovered and close-read.",
      locator: "Corpus JSON sourceLeads section and destination dispositions",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["that every linked article supports a portfolio accomplishment", "that blocked article bodies were reviewed", "authorship of linked work"],
      candidateClaimIds: ["CND-NYCAC-X-SOURCE-CIRCULATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-COUNCIL-OUTBOUND",
      sourceId,
      projectIds,
      entityIds: [...entityIds, "ENT-NYC-COUNCIL"],
      statement: "The recovered authored corpus contains 115 visible @NYCCouncil mention occurrences across 109 posts and repeatedly addresses public agencies, venues, artists, labor, tenant, vendor, and community groups.",
      locator: "Corpus JSON stakeholderCommunication section and outbound mention counts",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["109 Council members", "incoming engagement", "endorsement, adoption, or policy effect"],
      candidateClaimIds: ["CND-NYCAC-X-STAKEHOLDER-COMMUNICATION"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-REPOST-SOURCE-PATTERN",
      sourceId,
      projectIds,
      entityIds,
      statement: "Recovered native reposts most frequently source Olympia Kazi (194), United for Small Business NYC (113), Future of Music Coalition (110), Street Vendor Project (91), Music Workers Alliance (89), Artist Studio Affordability Project (78), Indie Theater Fund (64), and Rafael Espinal (47).",
      locator: "Corpus JSON stakeholderCommunication section and recovered repost-source counts",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["who selected or authored each repost", "endorsement of every coalition position", "a complete lifetime source ranking"],
      candidateClaimIds: ["CND-NYCAC-X-REPOST-SOURCE-PATTERN"],
      candidateRelationships: [],
      reviewedAt
    },
    {
      id: "OBS-NYCAC-X-TRACTION-SNAPSHOT",
      sourceId,
      projectIds,
      entityIds,
      statement: "On July 15, 2026, 630 of 696 recovered authored posts displayed at least one visible interaction; account-owned labels totaled 112 replies, 1,527 reposts, 2,761 likes, and 64 bookmarks.",
      locator: "Held-observations visible-interaction totals",
      evidenceRole: "context",
      certainty: "high",
      doesNotEstablish: ["complete lifetime engagement", "unique people or stakeholder classes", "reach, conversion, endorsement, or impact"],
      candidateClaimIds: ["CND-NYCAC-X-TRACTION-SNAPSHOT"],
      candidateRelationships: [],
      reviewedAt
    }
  ] satisfies KnowledgeLifecycle["observations"],

  candidateClaims: [
    {
      id: "CND-NYCAC-X-CAMPAIGN-CONTINUITY",
      projectIds,
      proposition: "The recovered authored corpus documents one shared public identity carrying four overlapping coalition campaign systems across 2017-2026.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-X-POPULATION-ACCOUNTING", "OBS-NYCAC-X-COMPOSITION", "OBS-NYCAC-X-CAMPAIGN-MARKERS"],
      requiredEvidence: ["Authenticated population control", "Deduplicated status IDs", "Explicit recovery gap", "Shared-authorship boundary"],
      boundaries: ["Describe 5,124 as population accounting, not complete item recovery.", "Campaign categories overlap.", "Do not assign shared-account posts to Jamie or another collaborator."],
      antiClaims: ["All 5,124 items were recovered", "Jamie authored all 696 posts", "Hashtag volume proves policy impact"],
      counterevidencePosture: "Reconcile any lawful owner archive or newly recovered status IDs without erasing the dated public-platform control or gap.",
      sourceIndependenceNote: "The corpus is an authenticated public-platform research run; it is direct evidence of public account output, not independent validation of campaign outcomes.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: ["DEC-NYCAC-X-CAMPAIGN-CONTINUITY-HOLD"],
      targetCanonicalClaimId: "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-X-SOURCE-CIRCULATION",
      projectIds,
      proposition: "The recovered authored corpus preserves a broad source-and-action layer across campaign sites, public records, reporting, forms, events, and field resources.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-X-SOURCE-CIRCULATION", "OBS-NYCAC-X-SOURCE-LEADS"],
      requiredEvidence: ["Complete recovered-item URL disposition", "Destination classification", "Article-body recovery state"],
      boundaries: ["Posting proves circulation, not endorsement.", "Blocked or dead sources remain leads until their bodies are recovered.", "Posted links do not prove reach or conversion."],
      antiClaims: ["Every destination endorses the coalition", "The account authored linked reporting", "Every link is active today"],
      counterevidencePosture: "Preserve redirect changes, dead links, archived copies, and article corrections as dated source-state changes.",
      sourceIndependenceNote: "The corpus establishes circulation; independently published source bodies must support any separate factual claim.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: ["DEC-NYCAC-X-SOURCE-CIRCULATION-HOLD"],
      targetCanonicalClaimId: "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION",
      projectIds,
      proposition: "The recovered authored corpus documents sustained outbound communication to government, arts, venue, labor, tenant, vendor, and community stakeholders.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-X-COUNCIL-OUTBOUND"],
      requiredEvidence: ["Authored-post denominator", "Deduplicated mention counts", "Incoming-versus-outbound distinction"],
      boundaries: ["The 109-post count concerns @NYCCouncil mentions, not Council members.", "Outbound address is not incoming engagement.", "Do not infer endorsement, adoption, or causation."],
      antiClaims: ["109 Council members engaged", "Every mentioned stakeholder replied", "Mentions prove policy influence"],
      counterevidencePosture: "Keep incoming authored interactions in the separate named lower-bound ledger and revise each population independently.",
      sourceIndependenceNote: "The shared account is direct evidence of outbound communication; named external posts are required for incoming engagement.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: ["DEC-NYCAC-X-STAKEHOLDER-COMMUNICATION-HOLD"],
      targetCanonicalClaimId: "CLM-NAC-X-STAKEHOLDER-COMMUNICATION",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-X-REPOST-SOURCE-PATTERN",
      projectIds,
      proposition: "Recovered native reposts document repeated circulation across Olympia Kazi and mission-adjacent arts, labor, tenant, vendor, and government accounts.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-X-REPOST-SOURCE-PATTERN"],
      requiredEvidence: ["Native-repost classification", "Stable source handles", "Recovery-gap disclosure"],
      boundaries: ["Source counts are lower bounds.", "The shared account does not identify who selected each repost.", "Circulation is not endorsement or partnership."],
      antiClaims: ["Olympia Kazi authored 194 coalition posts", "Jamie selected every repost", "The ranking is a complete lifetime network"],
      counterevidencePosture: "Recompute source counts when owner-archive or older native-repost records become available and retain prior snapshots.",
      sourceIndependenceNote: "The public account record establishes source circulation only; collaborator testimony or administrator records are required for stewardship attribution.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: ["DEC-NYCAC-X-REPOST-SOURCE-PATTERN-HOLD"],
      targetCanonicalClaimId: "CLM-NAC-X-REPOST-SOURCE-PATTERN",
      updatedAt: reviewedAt
    },
    {
      id: "CND-NYCAC-X-TRACTION-SNAPSHOT",
      projectIds,
      proposition: "A dated platform snapshot records visible interaction on 630 of 696 recovered authored posts.",
      maturity: "held",
      confidence: "high",
      observationIds: ["OBS-NYCAC-X-TRACTION-SNAPSHOT"],
      requiredEvidence: ["Dated account-owned counters", "Authored-post denominator", "Third-party repost metric exclusion"],
      boundaries: ["Counters are mutable and incomplete.", "They do not identify unique people or stakeholder classes.", "Do not use them as reach, conversion, endorsement, or impact metrics."],
      antiClaims: ["These are lifetime engagement totals", "Visible counters prove policy outcomes", "Every interaction is mission-relevant"],
      counterevidencePosture: "Retain the July 15 snapshot and add future snapshots rather than silently replacing volatile values.",
      sourceIndependenceNote: "Platform labels are first-party interface observations, not independent impact evidence.",
      researchTaskIds: [researchTaskId],
      promotionDecisionIds: ["DEC-NYCAC-X-TRACTION-SNAPSHOT-HOLD"],
      targetCanonicalClaimId: "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION",
      updatedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["candidateClaims"],

  candidateEvents: [
    { id: "EVT-NYCAC-X-CAMPAIGN-CONTINUITY-HOLD-2026-07-15", candidateClaimId: "CND-NYCAC-X-CAMPAIGN-CONTINUITY", toMaturity: "held", occurredAt: reviewedAt, actor: "Jamie Burkart and Codex archival review", reason: "The full accounting strengthens the bank, while the existing website composition already carries a clearer bounded social-identity claim.", decisionId: "DEC-NYCAC-X-CAMPAIGN-CONTINUITY-HOLD" },
    { id: "EVT-NYCAC-X-SOURCE-CIRCULATION-HOLD-2026-07-15", candidateClaimId: "CND-NYCAC-X-SOURCE-CIRCULATION", toMaturity: "held", occurredAt: reviewedAt, actor: "Jamie Burkart and Codex archival review", reason: "The source inventory is valuable research depth but not a standalone accomplishment metric.", decisionId: "DEC-NYCAC-X-SOURCE-CIRCULATION-HOLD" },
    { id: "EVT-NYCAC-X-STAKEHOLDER-COMMUNICATION-HOLD-2026-07-15", candidateClaimId: "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION", toMaturity: "held", occurredAt: reviewedAt, actor: "Jamie Burkart and Codex archival review", reason: "Outbound communication must remain distinct from incoming engagement and policy influence.", decisionId: "DEC-NYCAC-X-STAKEHOLDER-COMMUNICATION-HOLD" },
    { id: "EVT-NYCAC-X-REPOST-SOURCE-PATTERN-HOLD-2026-07-15", candidateClaimId: "CND-NYCAC-X-REPOST-SOURCE-PATTERN", toMaturity: "held", occurredAt: reviewedAt, actor: "Jamie Burkart and Codex archival review", reason: "The pattern illuminates the coalition network but does not establish individual account stewardship or endorsement.", decisionId: "DEC-NYCAC-X-REPOST-SOURCE-PATTERN-HOLD" },
    { id: "EVT-NYCAC-X-TRACTION-SNAPSHOT-HOLD-2026-07-15", candidateClaimId: "CND-NYCAC-X-TRACTION-SNAPSHOT", toMaturity: "held", occurredAt: reviewedAt, actor: "Jamie Burkart and Codex archival review", reason: "Volatile platform counters are archival context rather than accomplishment messaging.", decisionId: "DEC-NYCAC-X-TRACTION-SNAPSHOT-HOLD" }
  ] satisfies KnowledgeLifecycle["candidateEvents"],

  researchTasks: [
    {
      id: researchTaskId,
      candidateClaimIds: ["CND-NYCAC-X-CAMPAIGN-CONTINUITY", "CND-NYCAC-X-SOURCE-CIRCULATION", "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION", "CND-NYCAC-X-REPOST-SOURCE-PATTERN", "CND-NYCAC-X-TRACTION-SNAPSHOT"],
      question: "What does full population accounting of @NYCArtC establish about campaign continuity, sources, stakeholder communication, traction, and evidence gaps?",
      status: "completed",
      priority: "high",
      methods: ["Verified the authenticated 5,124-post profile control", "Traversed the replies-inclusive profile in overlapping passes", "Ran monthly historical authored-search partitions through the profile cutoff", "Deduplicated stable status IDs and separated authored posts from native reposts", "Resolved every recovered-item short URL", "Derived campaign, source, stakeholder, and dated-counter inventories", "Applied public-safety redaction and excluded every private account surface"],
      sourceIds: [sourceId, "SRC-NAC-CITYLIMITS-RENT-COVID-2020", "SRC-NAC-GOTHAMIST-REPEAL-50A-2020", "SRC-NAC-AMERICAN-THEATRE-LARK-2021", "SRC-NAC-HELLGATE-RAIDS-2023", "SRC-NAC-HELLGATE-SAINT-VITUS-2024", "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"],
      observationIds: ["OBS-NYCAC-X-POPULATION-ACCOUNTING", "OBS-NYCAC-X-COMPOSITION", "OBS-NYCAC-X-CAMPAIGN-MARKERS", "OBS-NYCAC-X-SOURCE-CIRCULATION", "OBS-NYCAC-X-SOURCE-LEADS", "OBS-NYCAC-X-COUNCIL-OUTBOUND", "OBS-NYCAC-X-REPOST-SOURCE-PATTERN", "OBS-NYCAC-X-TRACTION-SNAPSHOT"],
      findings: ["The 5,124-post profile control is dispositioned as 3,367 recovered account items and a 1,757-item unclassified recovery gap.", "The recovered population contains 696 authored posts and 2,671 reposts across 2017-2026.", "Four overlapping campaign traces remain visible across hundreds of authored posts.", "All 1,235 recovered-item short URLs resolve, including 287 distinct authored-post short URLs.", "The authored corpus contains 115 @NYCCouncil mentions across 109 posts, which are outbound communications rather than incoming engagement.", "Recovered repost sources show repeated circulation across collaborators and mission-adjacent groups, led by Olympia Kazi with 194 recovered source items.", "Visible counter totals remain held from accomplishment messaging."],
      limitations: ["The 1,757 unavailable profile-count items cannot be classified.", "Historical search did not expose every older native repost.", "The shared account cannot establish individual post authorship or administrator history.", "Outbound mentions, reposts, and counters do not establish endorsement, reach, policy causation, or impact."],
      nextActions: ["Seek a lawful owner archive to reduce the gap", "Close-read blocked or dead article bodies before promoting article claims", "Seek corroboration of Jamie's account-establishment and identity-stewardship role without exposing security data"],
      openedAt: reviewedAt,
      completedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  promotionDecisions: [
    { id: "DEC-NYCAC-X-CAMPAIGN-CONTINUITY-HOLD", candidateClaimId: "CND-NYCAC-X-CAMPAIGN-CONTINUITY", decision: "hold", rationale: "The complete accounting belongs in the bank, while the current website already presents the clearer shared-identity and Council-engagement argument.", evidenceThreshold: "Authenticated population accounting, deduplicated item recovery, campaign-marker derivation, and explicit authorship and recovery boundaries.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated public-web review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER", allowedSurfaces: ["knowledge-bank"], guardrails: ["Say population-accounted, not fully recovered", "Keep campaign categories overlapping", "Do not assign shared posts or outcomes to Jamie alone"] },
    { id: "DEC-NYCAC-X-SOURCE-CIRCULATION-HOLD", candidateClaimId: "CND-NYCAC-X-SOURCE-CIRCULATION", decision: "hold", rationale: "The resolved-link inventory and source leads are durable research infrastructure but do not improve the present hiring narrative as a public metric.", evidenceThreshold: "Complete recovered-item short-link disposition with destination and article-recovery boundaries.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated public-web review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION", allowedSurfaces: ["knowledge-bank"], guardrails: ["Posting is circulation, not endorsement", "Close-read article bodies before factual reuse", "Do not infer reach or conversion"] },
    { id: "DEC-NYCAC-X-STAKEHOLDER-COMMUNICATION-HOLD", candidateClaimId: "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION", decision: "hold", rationale: "Outbound stakeholder communication is defensible, but the six-account incoming Council lower bound remains the more useful public engagement claim.", evidenceThreshold: "Authored-post denominator, exact mention counts, and strict outbound-versus-incoming separation.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated public-web review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-NAC-X-STAKEHOLDER-COMMUNICATION", allowedSurfaces: ["knowledge-bank"], guardrails: ["Do not turn 109 posts into 109 Council members", "Do not infer reply, endorsement, adoption, or impact"] },
    { id: "DEC-NYCAC-X-REPOST-SOURCE-PATTERN-HOLD", candidateClaimId: "CND-NYCAC-X-REPOST-SOURCE-PATTERN", decision: "hold", rationale: "The source pattern helps reconstruct the coalition's public network while remaining insufficient to attribute account stewardship or collaboration terms.", evidenceThreshold: "Native-repost classification, stable source handles, and explicit lower-bound and shared-account boundaries.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated public-web review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-NAC-X-REPOST-SOURCE-PATTERN", allowedSurfaces: ["knowledge-bank"], guardrails: ["Treat counts as recovered lower bounds", "Do not assign selection or authorship", "Do not infer endorsement or formal partnership"] },
    { id: "DEC-NYCAC-X-TRACTION-SNAPSHOT-HOLD", candidateClaimId: "CND-NYCAC-X-TRACTION-SNAPSHOT", decision: "hold", rationale: "The dated counters are useful archival state but too volatile and semantically weak for accomplishment messaging.", evidenceThreshold: "Dated account-owned counters with third-party repost metrics excluded.", decidedAt: reviewedAt, decidedBy: ["Jamie Burkart", "Codex authenticated public-web review"], reviewAuthority: "jamie-approved", humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", targetCanonicalClaimId: "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION", allowedSurfaces: ["knowledge-bank"], guardrails: ["Do not call counters lifetime engagement", "Do not infer unique people, stakeholder classes, reach, conversion, endorsement, or impact"] }
  ] satisfies KnowledgeLifecycle["promotionDecisions"],

  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-X-FULL-POPULATION-DEPTH",
      title: "NYC Artist Coalition full social-corpus depth",
      audience: "Future portfolio editors and public-interest collaborators",
      audienceTags: ["portfolio-editor", "public-interest-operations"],
      goal: "Make the full social record retrievable for future purpose-specific composition without forcing corpus metrics into the current website.",
      purposeTags: ["knowledge-development", "public-documentation"],
      status: "active",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: ["Use full-population accounting only with the recovery gap", "Prefer operating patterns and individually attributable action", "Keep source circulation, outbound communication, repost patterns, and traction semantically distinct"],
      projectIds,
      canonicalClaimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER", "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION", "CLM-NAC-X-STAKEHOLDER-COMMUNICATION", "CLM-NAC-X-REPOST-SOURCE-PATTERN", "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"],
      candidateClaimIds: ["CND-NYCAC-X-CAMPAIGN-CONTINUITY", "CND-NYCAC-X-SOURCE-CIRCULATION", "CND-NYCAC-X-STAKEHOLDER-COMMUNICATION", "CND-NYCAC-X-REPOST-SOURCE-PATTERN", "CND-NYCAC-X-TRACTION-SNAPSHOT"],
      exclusions: ["Private account surfaces", "Raw third-party repost text", "Individual post authorship without evidence", "Platform counters as impact", "Outbound mentions as incoming engagement", "Recovery gaps described as deletion"],
      citationPosture: "Cite the governed corpus for account-output observations and close-read independent sources for article-level facts or policy outcomes.",
      chadLensQuestion: "Does a selected finding make Jamie's operating contribution more legible, or is it merely another number?",
      mediaLeadIds: [],
      pageClaimExclusions: [
        { claimId: "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER", reason: "The current Fair Rent NYC page already carries a clearer bounded social-identity claim." },
        { claimId: "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION", reason: "Useful archival infrastructure, not a current hiring-page accomplishment." },
        { claimId: "CLM-NAC-X-STAKEHOLDER-COMMUNICATION", reason: "The separate incoming Council lower bound is clearer for public engagement." },
        { claimId: "CLM-NAC-X-REPOST-SOURCE-PATTERN", reason: "Network depth remains held pending a future composition that needs it." },
        { claimId: "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION", reason: "Volatile counters remain archival context only." }
      ]
    }
  ] satisfies KnowledgeLifecycle["editorialBriefs"],

  proofSurfaceManifests: [] satisfies KnowledgeLifecycle["proofSurfaceManifests"],
  mediaLeads: [] satisfies KnowledgeLifecycle["mediaLeads"]
};
