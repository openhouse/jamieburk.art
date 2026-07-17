import type { KnowledgeBank } from "./schema.ts";

const projectId = "kc-spaces-fund";
const reviewedAt = "2026-07-15";
const reportPath = "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md";

export const kcSpacesFundFacebookPostSourceIds = {
  pageSurface: "SRC-KCSPACESFUND-FACEBOOK-PAGE-2026-07-15",
  census: "SRC-KCSPACESFUND-FACEBOOK-CENSUS-2026-07-15",
  protectedCapture: "SRC-KCSPACESFUND-FACEBOOK-PROTECTED-CAPTURE-2026-07-15",
  campaignSite: "SRC-KCSPACESFUND-CAMPAIGN-SITE-2026-07-15",
  applicationGuidance: "SRC-KCSPACESFUND-APPLICATION-GUIDANCE-2020",
  goFundMe: "SRC-KCSPACESFUND-GOFUNDME-2020",
  kansasCityStar: "SRC-KCSPACESFUND-KANSAS-CITY-STAR-2020",
  odditiesPrints: "SRC-KCSPACESFUND-ODDITIES-PRINTS-2020",
  protectedGitReview: "SRC-KCSPACESFUND-PROTECTED-GIT-REVIEW-2026",
  firsthandRole: "SRC-KCSPACESFUND-FIRSTHAND-ROLE-2026-07-15",
} as const;

export const kcSpacesFundFacebookPostClaimIds = {
  population: "CLM-KCSPACESFUND-FACEBOOK-SURVIVING-POPULATION",
  reliefCycle: "CLM-KCSPACESFUND-FACEBOOK-RELIEF-CYCLE",
  publicResults: "CLM-KCSPACESFUND-FUNDRAISING-AND-SPOTLIGHTS",
  visibleSignals: "CLM-KCSPACESFUND-FACEBOOK-VISIBLE-SIGNALS",
  publicIdentity: "CLM-KCSPACESFUND-UNIFORM-PUBLIC-IDENTITY",
  infrastructure: "CLM-JAMIE-KCSPACESFUND-DIGITAL-INFRASTRUCTURE",
  namingMemory: "CLM-JAMIE-KCSPACESFUND-NAMING-MEMORY",
} as const;

export const kcSpacesFundFacebookPostReviewSummary = {
  survivingPublicRecords: 40,
  recordsReviewedPercent: 100,
  traversalCounts: [40, 38, 40],
  scrollIterations: [54, 49, 74],
  terminalNoAdditionPasses: [18, 18, 24],
  stableMediaIds: 21,
  stableMediaSetMatchedAcrossAllTraversals: true,
  mediaBackedRecords: 20,
  nonMediaRecords: 20,
  contentMaterializedRecords: 19,
  metadataDepthRecords: 15,
  unavailableAttachmentRecords: 6,
  applicationRoutingRecords: 8,
  fundraisingRecords: 13,
  fundedSpaceSpotlights: 10,
  recordsWithVisibleReactionSignals: 28,
  visibleReactionSignalFloor: 119,
  recordsWithVisibleCommentRelations: 4,
  culturalSpaceAccountCommentRelations: 3,
  publicRecordIdSetSha256:
    "846f60f1a6dac18bf487652a5d89f9b4dbe979eff662156129b90f2645bac687",
  protectedMediaIdSetSha256:
    "029ffa8737c2e2058b1cc5b582e6cc741eb3242e5e7504a3d4833fa32e4fd1fb",
} as const;

export const kcSpacesFundFacebookPostSources = [
  {
    id: kcSpacesFundFacebookPostSourceIds.pageSurface,
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund Facebook Page, authenticated full-population review July 15, 2026.",
    publicNote:
      "The live Page supplied the surviving public timeline surface and current project identity. Its profile and interaction counters are mutable interface observations.",
    supportsGenerally: [
      "the current KC Spaces Fund Facebook identity",
      "currently surviving public post wrappers",
      "a public campaign surface for relief information and routing",
    ],
    doesNotEstablish: [
      "a native lifetime export or deletion history",
      "the human publisher, administrator, or owner of any post",
      "permission to publish comments, contacts, or authenticated state",
      "reach, endorsement, conversion, causality, or impact",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.census,
    title: "KC Spaces Fund Facebook public-safe post census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of 40 surviving KC Spaces Fund Facebook Page cards, July 15, 2026.",
    publicNote:
      "The ledger gives every surfaced card a form, recovery state, mission-mode, destination, and bounded response disposition while excluding full post transcripts and personal engagement identities.",
    supportsGenerally: [
      "40-of-40 current-surface disposition coverage",
      "20 media-backed and 20 non-media records",
      "ten public funded-space spotlights",
      "eight application-routing and 13 fundraising records",
      "a reproducible public-record digest",
    ],
    doesNotEstablish: [
      "a complete lifetime publication total",
      "the absence of deleted, private, or unrendered posts",
      "individual publisher identity",
      "a complete grantee or disbursement population",
      "reach, conversion, endorsement, or impact",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.protectedCapture,
    title: "Protected KC Spaces Fund Facebook terminal traversals",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Protected terminal Facebook Page traversals supporting the 40-card public-safe census, July 15, 2026.",
    publicNote:
      "Three traversals recovered 40, 38, and 40 deduplicated cards. The final slower traversal reproduced 40; the same 21 stable media identities appeared in all three. Raw post text, identities, contact details, and authenticated state remain outside Git.",
    protectedLocatorId: "LOC-KCSPACESFUND-FACEBOOK-CAPTURES-2026-07-15",
    supportsGenerally: [
      "three terminal traversal counts",
      "54, 49, and 74 scroll iterations",
      "18, 18, and 24 terminal no-addition checks",
      "a stable 21-media-identity set",
      "source-to-ledger review",
    ],
    doesNotEstablish: [
      "permission to publish protected capture contents",
      "a native Meta owner export",
      "human-level publisher identity",
      "that no historical record is missing",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.campaignSite,
    title: "KC Spaces Fund campaign site",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kcspacesfund.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund public campaign site.",
    publicNote:
      "The site describes an emerging coalition supporting grassroots arts and culture spaces during COVID-19 and preserves public donate, join, apply, and contact routes.",
    supportsGenerally: [
      "the campaign purpose",
      "the public action-routing system",
      "the kcspacesfund.com project identity",
      "linked Facebook, X, Instagram, and GoFundMe identities",
    ],
    doesNotEstablish: [
      "individual authorship or implementation roles",
      "who proposed or selected the project name",
      "grant decisions, disbursement totals, or campaign impact",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.applicationGuidance,
    title: "KC Spaces Fund application guidance and FAQ",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-02",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kcspacesfund.com/apply/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund application guidance and FAQ, April 2020.",
    publicNote:
      "The guidance describes emergency grants up to $500, rolling April-June 2020 review as funding allowed, priority communities, the named organizers, and Allied Media Projects as fiscal sponsor.",
    supportsGenerally: [
      "the grant ceiling, rolling process, and priority criteria",
      "public organizer and fiscal-sponsor credit",
      "the June 1 final application deadline",
      "Kansas City regional eligibility",
    ],
    doesNotEstablish: [
      "Jamie's organizer, decision-making, or fiscal-sponsor role",
      "the number of awards or total amount disbursed",
      "the identity of applicants or private application contents",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.goFundMe,
    title: "KC Spaces Fund GoFundMe",
    organization: "KC Spaces Fund / Allied Media Projects Inc.",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-07",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund public GoFundMe, launched April 2020.",
    publicNote:
      "The public fundraiser displays $9,590 raised against a $9,500 goal from 107 donations and identifies Kendell Harbin for Allied Media Projects Inc. The figures belong to the collective campaign.",
    supportsGenerally: [
      "$9,590 raised against a $9,500 goal",
      "107 donations",
      "public organizer and beneficiary framing",
      "the /f/kcspacesfund project route",
    ],
    doesNotEstablish: [
      "Jamie's fundraising, organizing, grant-making, or fiscal-sponsor role",
      "how many grants were awarded or how funds were disbursed",
      "individual causality for the fundraising outcome",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.kansasCityStar,
    title: "Money, blood, time: How to help KC during COVID-19 crisis",
    author: "Dan Kelly",
    organization: "The Kansas City Star",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Dan Kelly, 'Money, blood, time: How to help KC during COVID-19 crisis,' Kansas City Star, updated April 10, 2020.",
    publicNote:
      "The contemporaneous guide independently listed KC Spaces Fund and its campaign site among ways to support Kansas City during the coronavirus crisis.",
    supportsGenerally: [
      "independent public recognition during the campaign launch period",
    ],
    doesNotEstablish: [
      "Jamie's role",
      "audience action, fundraising conversion, or grant outcomes",
      "endorsement by every person or institution in the guide",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.odditiesPrints,
    title: "KAIJU: Frank Norton Riso Edition",
    organization: "Oddities Prints",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    preferredPublicUrl: "canonical",
    publicCitation: "Oddities Prints, 'KAIJU: Frank Norton Riso Edition.'",
    publicNote:
      "The product page states that proceeds from the print partially benefit KC Spaces Fund and KC Tenants, corroborating one fundraising collaboration routed by the Page.",
    supportsGenerally: [
      "an independent public fundraising route benefiting KC Spaces Fund",
    ],
    doesNotEstablish: [
      "the historical Page route or all fundraising collaborations",
      "sales, donation totals, conversion, or Jamie's role",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.protectedGitReview,
    title: "AI-assisted review of KC Spaces Fund campaign repositories",
    author: "Codex archival review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-09",
    publicCitation:
      "AI-assisted archival review of Jamie Burkart's KC Spaces Fund project repositories, July 2026.",
    publicNote:
      "The review found Jamie-authored launch-period history for the Ghost campaign site, custom campaign theme, deployment work, and GoFundMe widget. This is archival evidence, not a human collaborator testimonial.",
    protectedLocatorId: "LOC-KCSPACESFUND-LOCAL-GIT-REVIEW-2026-07-09",
    supportsGenerally: [
      "Jamie's launch-period web implementation and maintenance work",
      "the Ghost site, reusable campaign theme, deployment, and fundraising-widget stack",
    ],
    doesNotEstablish: [
      "public organizer, fundraiser-owner, grant-decision, or fiscal-sponsor status",
      "authorship of Facebook posts",
      "sole ownership of collective strategy, content, or outcomes",
    ],
  },
  {
    id: kcSpacesFundFacebookPostSourceIds.firsthandRole,
    title: "Jamie Burkart first-person KC Spaces Fund role statement",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person KC Spaces Fund role statement, received July 15, 2026.",
    publicNote:
      "Jamie states that he was not the stakeholder or owner posting to the Facebook Page and recalls supporting the search for a project name available consistently across social platforms and domain names.",
    protectedLocatorId: "LOC-KCSPACESFUND-FIRSTHAND-ROLE-2026-07-15",
    supportsGenerally: [
      "Jamie's boundary against claiming Facebook posting or account ownership",
      "Jamie's first-person naming-support recollection",
      "a lead for collaborator or contemporaneous-source corroboration",
    ],
    doesNotEstablish: [
      "who selected the final name or opened each account",
      "record-level Facebook publisher identity",
      "organizer, fundraiser-owner, grant-decision, or fiscal-sponsor status",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const kcSpacesFundFacebookPostClaims = [
  {
    id: kcSpacesFundFacebookPostClaimIds.population,
    project: projectId,
    internalClaim:
      "Three terminal traversals recovered 40, 38, and 40 deduplicated cards from the currently accessible KC Spaces Fund Facebook Page; every one of the final 40 received a public-safe disposition, and all 21 stable media identities matched across passes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Three terminal traversals recovered 40, 38, and 40 surviving public cards; the final slower pass reproduced 40 and all 21 stable media identities matched across passes.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.protectedCapture,
        relationship: "private-support",
        supports: ["traversal counts", "terminal controls", "stable media identity set"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["40-row public-safe disposition", "reproducible record digest"],
        locator: "completeness, aggregate, and records",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Complete means every unique card surfaced by the currently accessible public Page timeline received a disposition.",
      "This is not a native Meta export, deletion history, or every post ever published.",
      "The middle faster traversal's 38-card result remains visible as rendering variance.",
      "Twenty non-media records lack stable public permalinks and retain positional identities.",
    ],
    antiClaims: [
      "The ledger is the complete historical Meta archive",
      "KC Spaces Fund published only 40 Facebook posts",
      "No historical post is missing",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex full-population authenticated archival review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.reliefCycle,
    project: projectId,
    internalClaim:
      "The surviving Page record documents a collective public operating cycle connecting applicant guidance and deadlines, fundraising, funded-space spotlights, community resources, partner material, the campaign site, and the GoFundMe.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The surviving Page record operationalized the relief cycle through application guidance and deadlines, fundraising, funded-space spotlights, community resources, partner amplification, and campaign-site routing.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["record-level mission-mode and destination classifications"],
        locator: "aggregate and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.campaignSite,
        relationship: "corroborating",
        supports: ["public donate, join, apply, and contact system"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.applicationGuidance,
        relationship: "corroborating",
        supports: ["public application process, purpose, and timeline"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is a collective project-system claim, not an attribution of Page publishing or campaign ownership to Jamie.",
      "Mission modes are archival classifications and overlap.",
      "Routing does not itself prove applications, donations, awards, or outcomes.",
    ],
    antiClaims: [
      "Jamie authored or published the KC Spaces Fund Facebook record",
      "Facebook activity alone proves campaign impact",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex collective-credit review", "Chad lens review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.publicResults,
    project: projectId,
    internalClaim:
      "The public fundraiser displays $9,590 raised against a $9,500 goal from 107 donations, while ten surviving Facebook Page records name funded-space spotlights.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The public fundraiser displays $9,590 raised against a $9,500 goal from 107 donations; ten surviving Page records separately name funded-space spotlights.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.goFundMe,
        relationship: "direct-support",
        supports: ["fundraising total", "goal", "donation count", "organizer framing"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["ten named funded-space spotlight records"],
        locator: "records[].spotlightSubject",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The fundraising outcome belongs to the collective campaign and its named organizer and fiscal-sponsor context, not to Jamie individually.",
      "Ten Page spotlights are not proof of the complete grantee population, award amounts, or disbursement total.",
    ],
    antiClaims: [
      "Jamie raised $9,590",
      "KC Spaces Fund awarded exactly ten grants",
      "Facebook spotlights prove grant amounts or complete disbursement",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source review", "collective-credit review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.visibleSignals,
    project: projectId,
    internalClaim:
      "At capture, 28 surviving records displayed at least one visible reaction signal, producing a mutable floor of 119; four displayed a comment relationship, including three cultural-space accounts.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "At capture, 28 records retained visible reaction signals and four retained a comment relationship; these are mutable interface observations, not audience or impact measures.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["anonymous record-level signal counts and relationship categories"],
        locator: "aggregate and records",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The 119-unit value is a mutable visible floor, not unique people or historical peak engagement.",
      "A cultural-space account comment does not establish endorsement, partnership, conversion, attendance, causality, or impact.",
      "Personal commenter and reaction identities remain unpublished.",
    ],
    antiClaims: [
      "The Page reached 119 people",
      "Cultural-space accounts endorsed KC Spaces Fund",
      "Visible Facebook interactions measure campaign impact",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex metric-boundary review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.publicIdentity,
    project: projectId,
    internalClaim:
      "KC Spaces Fund used a consistent public identity across its domain, Facebook, X, Instagram, and GoFundMe route.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The project used the KC Spaces Fund identity consistently across its domain, Facebook, X, Instagram, and GoFundMe route.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.campaignSite,
        relationship: "direct-support",
        supports: ["campaign domain and linked social identities"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.goFundMe,
        relationship: "corroborating",
        supports: ["matching public fundraiser slug"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.pageSurface,
        relationship: "corroborating",
        supports: ["matching Facebook Page identity"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The uniform identity result does not establish who proposed, checked, approved, registered, or administered the name.",
      "Do not convert a public naming pattern into individual naming authorship.",
    ],
    antiClaims: [
      "The public routes prove Jamie alone named KC Spaces Fund",
      "Jamie owned or administered every KC Spaces Fund account",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex attribution-boundary review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.infrastructure,
    project: projectId,
    internalClaim:
      "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure by building and maintaining the Ghost campaign site, customizing a reusable campaign theme, supporting deployment, and implementing fundraising-display controls.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure, building and maintaining its Ghost site, reusable campaign theme, deployment path, and fundraising-display controls.",
        status: "active",
        citationRequired: true,
        surfaces: [reportPath, "docs/knowledge-bank/proofs.md"],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.protectedGitReview,
        relationship: "private-support",
        supports: ["Jamie-authored launch-period site, theme, deployment, and widget work"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.campaignSite,
        relationship: "corroborating",
        supports: ["resulting public campaign site and action routes"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.firsthandRole,
        relationship: "supports-boundary",
        supports: ["Jamie's boundary against claiming Facebook posting or account ownership"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Use behind-the-scenes technical and operational support language.",
      "Do not assign Jamie Facebook posting, public organizer, fundraiser-owner, grant-decision, fiscal-sponsor, or sole campaign credit.",
      "Describe the evidence as AI-assisted archival review, not a human collaborator testimonial.",
    ],
    antiClaims: [
      "Jamie posted the KC Spaces Fund Facebook record",
      "Jamie organized KC Spaces Fund or ran its fundraiser",
      "Jamie made grant decisions or acted as fiscal sponsor",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review", "collective-credit review"],
  },
  {
    id: kcSpacesFundFacebookPostClaimIds.namingMemory,
    project: projectId,
    internalClaim:
      "Jamie recalls supporting the search for a KC Spaces Fund name that was available uniformly across social platforms and domain names.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie recalls supporting the search for a uniformly available project name; collaborator or contemporaneous-source corroboration is required before public role projection.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.firsthandRole,
        relationship: "private-support",
        supports: ["Jamie's first-person naming-support recollection"],
        confidence: "moderate",
        renderCitation: false,
      },
      {
        sourceId: kcSpacesFundFacebookPostSourceIds.campaignSite,
        relationship: "context",
        supports: ["the resulting uniform public identity"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Keep the naming role as first-person memory until collaborator testimony or contemporaneous records identify Jamie's contribution.",
      "The observed uniform identity is not automatic corroboration of individual naming authorship.",
      "Jamie states he was not the stakeholder or owner posting on the Facebook account.",
    ],
    antiClaims: [
      "Jamie alone named KC Spaces Fund",
      "Jamie owned, administered, or posted to the Facebook Page",
      "Uniform handles prove individual naming authorship",
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex attribution-boundary review"],
  },
] satisfies KnowledgeBank["claims"];

export const kcSpacesFundFacebookPostResearchInquiries = [
  {
    id: "INQ-KCSPACESFUND-FACEBOOK-POPULATION-2026",
    project: projectId,
    question:
      "Can every card on the currently accessible KC Spaces Fund Facebook Page receive a public-safe disposition under an auditable completeness control?",
    methods: [
      "Ran three authenticated Page traversals with different scroll cadences.",
      "Continued each traversal through repeated no-addition terminal states.",
      "Compared durable media identity sets across all three passes.",
      "Used the final slower 40-card traversal as the public disposition denominator.",
      "Kept raw post bodies, contact details, engagement identities, and authenticated state outside Git.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The traversals recovered 40, 38, and 40 deduplicated cards.",
      "The final slower traversal reproduced 40, and every one of those 40 received a public-safe disposition.",
      "The same 21 stable media identities appeared across all three passes.",
      "The final census contains 20 media-backed and 20 non-media records.",
    ],
    limitations: [
      "The middle faster pass omitted two non-media cards, preserving evidence of interface rendering variance.",
      "The surviving Page surface is not a native lifetime export or deletion history.",
      "The method cannot establish that no post was deleted, withheld, or omitted before capture.",
    ],
    sourceIds: [
      kcSpacesFundFacebookPostSourceIds.pageSurface,
      kcSpacesFundFacebookPostSourceIds.protectedCapture,
      kcSpacesFundFacebookPostSourceIds.census,
    ],
    publicSummary:
      "Every one of the 40 cards in the final surviving-public Page denominator received a public-safe disposition. This is complete current-surface accounting, not a lifetime Meta export.",
    protectedLocatorId: "LOC-KCSPACESFUND-FACEBOOK-POPULATION-2026-07-15",
  },
  {
    id: "INQ-KCSPACESFUND-FACEBOOK-SOURCES-2026",
    project: projectId,
    question:
      "What mission, source, outcome, and visible-response patterns appear across the complete surviving Page surface?",
    methods: [
      "Classified all 40 records by form, recovery state, overlapping mission modes, public destination, and funded-space spotlight.",
      "Close-read the public campaign site, application guidance, fundraising page, contemporaneous Kansas City Star listing, and Oddities Prints fundraiser page.",
      "Separated Page-level routing from external corroboration and mutable interface counters from impact.",
      "Withheld full post transcripts, commenter identities, and unrecovered historical destination URLs.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The population includes eight application-routing records, 13 fundraising records, and ten funded-space spotlights.",
      "The records document a collective public relief cycle spanning applications, fundraising, public spotlights, resources, partner material, and campaign-site routing.",
      "The campaign site and GoFundMe share the same public identity pattern as Facebook, X, and Instagram.",
      "The Kansas City Star independently listed KC Spaces Fund during its April 2020 launch period.",
      "Oddities Prints published a product page saying proceeds partially benefited KC Spaces Fund and KC Tenants.",
      "At capture, 28 records retained reaction signals and four retained a comment relationship; these are current floors, not outcome measures.",
    ],
    limitations: [
      "Mission modes overlap and are analytical classifications, not native platform categories.",
      "Three historical posted-source destinations remain incompletely recovered.",
      "Ten Page spotlights are not a complete grantee or disbursement record.",
      "Current counters do not identify unique people or historical peak response.",
    ],
    sourceIds: [
      kcSpacesFundFacebookPostSourceIds.census,
      kcSpacesFundFacebookPostSourceIds.campaignSite,
      kcSpacesFundFacebookPostSourceIds.applicationGuidance,
      kcSpacesFundFacebookPostSourceIds.goFundMe,
      kcSpacesFundFacebookPostSourceIds.kansasCityStar,
      kcSpacesFundFacebookPostSourceIds.odditiesPrints,
    ],
    publicSummary:
      "The surviving Page record documents a collective public operating system for COVID-era relief. Source trails and mutable visible-response signals remain distinct from authorship and impact.",
    protectedLocatorId: "LOC-KCSPACESFUND-FACEBOOK-SOURCE-REVIEW-2026-07-15",
  },
  {
    id: "INQ-KCSPACESFUND-ROLE-2026",
    project: projectId,
    question:
      "Which records support Jamie's digital-infrastructure role, and can his naming-support recollection be corroborated without assigning him organizer or Page-publishing credit?",
    methods: [
      "Reused the AI-assisted local Git review of the campaign site, theme, deployment, and fundraising widget.",
      "Accessioned Jamie's explicit boundary that he was not the stakeholder or owner posting to Facebook.",
      "Compared the public domain and platform-name pattern without treating uniformity as actor evidence.",
      "Kept organizer credit with the four people named by the campaign's application guidance.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Protected Git history directly supports Jamie's launch-period site, reusable theme, deployment, and fundraising-display work.",
      "The public project identity is uniform across the campaign domain, Facebook, X, Instagram, and GoFundMe.",
      "No reviewed source assigns Facebook post authorship or account ownership to Jamie.",
      "Jamie's naming-support recollection remains a useful lead but is not corroborated at actor level.",
    ],
    limitations: [
      "No collaborator proof note or contemporaneous naming decision record was recovered in this pass.",
      "Public identity uniformity cannot identify who proposed, checked, approved, registered, or administered the name.",
      "The AI-assisted repository review is not a first-hand human testimonial.",
    ],
    sourceIds: [
      kcSpacesFundFacebookPostSourceIds.protectedGitReview,
      kcSpacesFundFacebookPostSourceIds.firsthandRole,
      kcSpacesFundFacebookPostSourceIds.campaignSite,
      kcSpacesFundFacebookPostSourceIds.pageSurface,
    ],
    publicSummary:
      "Jamie has strong archival support for a behind-the-scenes digital-infrastructure role. Naming support remains attributed memory, and no Facebook post is assigned to him.",
    protectedLocatorId: "LOC-KCSPACESFUND-ROLE-RESEARCH-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const kcSpacesFundFacebookPostIntakeItems = [
  {
    id: "INTAKE-KCSPACESFUND-FACEBOOK-POSTS-2026-07-15",
    title: "KC Spaces Fund Facebook full-population archival production",
    project: projectId,
    kind: "claim-candidate",
    summary:
      "A 40-of-40 public-safe disposition of the currently surviving KC Spaces Fund Facebook Page surface, integrated with public campaign sources, protected role evidence, and explicit collective-credit and authorship boundaries.",
    status: "integrated",
    sourceIds: Object.values(kcSpacesFundFacebookPostSourceIds),
    relatedClaimIds: Object.values(kcSpacesFundFacebookPostClaimIds),
    relatedProofIds: ["kc-spaces-fund-digital-infrastructure"],
    candidateClaims: [
      "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure by building and maintaining the Ghost campaign site, customizing a reusable campaign theme, supporting deployment, and implementing fundraising-display controls.",
    ],
    propositions: [
      {
        id: "PROP-KCSPACESFUND-FACEBOOK-POPULATION-2026",
        text: "Three terminal traversals recovered 40, 38, and 40 deduplicated cards from the currently accessible KC Spaces Fund Facebook Page; all 40 cards in the final slower traversal received a public-safe disposition, and the same 21 stable media identities appeared in all three passes.",
        status: "supported-with-boundary",
        sourceIds: [
          kcSpacesFundFacebookPostSourceIds.protectedCapture,
          kcSpacesFundFacebookPostSourceIds.census,
        ],
        sourceSupport: [
          "three terminal traversal logs",
          "stable media-set comparison",
          "40-row public-safe ledger",
        ],
        boundaries: [
          "This is complete disposition of the surviving Page surface, not a native lifetime export or deletion history.",
        ],
        decisionUse:
          "Supplies an auditable denominator for the archival findings without claiming a complete historical platform archive.",
      },
      {
        id: "PROP-KCSPACESFUND-FACEBOOK-RELIEF-CYCLE-2026",
        text: "The surviving Page record documents a collective public operating cycle connecting applications and deadlines, fundraising, funded-space spotlights, community resources, partner material, the campaign site, and the GoFundMe.",
        status: "synthesis-with-boundary",
        sourceIds: [
          kcSpacesFundFacebookPostSourceIds.census,
          kcSpacesFundFacebookPostSourceIds.campaignSite,
          kcSpacesFundFacebookPostSourceIds.applicationGuidance,
        ],
        sourceSupport: [
          "40-record mission-mode accounting",
          "public action routes",
          "application guidance and timeline",
        ],
        boundaries: [
          "This is collective project evidence and does not assign Page publishing, campaign ownership, or grant decisions to Jamie.",
        ],
        decisionUse:
          "Preserves the operating-system value of the social record beneath the current technical-operations proof.",
      },
      {
        id: "PROP-KCSPACESFUND-PUBLIC-RESULTS-2026",
        text: "The public fundraiser displays $9,590 raised against a $9,500 goal from 107 donations, and ten surviving Facebook Page records separately name funded-space spotlights.",
        status: "supported-with-boundary",
        sourceIds: [
          kcSpacesFundFacebookPostSourceIds.goFundMe,
          kcSpacesFundFacebookPostSourceIds.census,
        ],
        sourceSupport: [
          "public GoFundMe counters and organizer framing",
          "ten named Page spotlight records",
        ],
        boundaries: [
          "The fundraising outcome belongs to the collective campaign; the Page count is not a complete grantee or disbursement record.",
        ],
        decisionUse:
          "Retains campaign scale and public outcome context without assigning fundraising or grant-making credit to Jamie.",
      },
      {
        id: "PROP-KCSPACESFUND-UNIFORM-IDENTITY-2026",
        text: "KC Spaces Fund used a consistent public identity across its domain, Facebook, X, Instagram, and GoFundMe route.",
        status: "direct-support",
        sourceIds: [
          kcSpacesFundFacebookPostSourceIds.campaignSite,
          kcSpacesFundFacebookPostSourceIds.pageSurface,
          kcSpacesFundFacebookPostSourceIds.goFundMe,
        ],
        sourceSupport: [
          "campaign-site navigation",
          "matching public Page identity",
          "matching fundraiser route",
        ],
        boundaries: [
          "Uniform identity does not identify who proposed, checked, approved, registered, or administered the name.",
        ],
        decisionUse:
          "Preserves the project-identity result while keeping Jamie's actor-level naming contribution in research.",
      },
      {
        id: "PROP-JAMIE-KCSPACESFUND-DIGITAL-INFRASTRUCTURE-2026",
        text: "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure by building and maintaining the Ghost campaign site, customizing a reusable campaign theme, supporting deployment, and implementing fundraising-display controls.",
        status: "direct-support",
        sourceIds: [
          kcSpacesFundFacebookPostSourceIds.protectedGitReview,
          kcSpacesFundFacebookPostSourceIds.campaignSite,
        ],
        sourceSupport: [
          "Jamie-authored launch-period Git history",
          "Ghost site and reusable theme",
          "deployment and fundraising-widget implementation",
          "surviving public campaign site",
        ],
        boundaries: [
          "Use behind-the-scenes technical and operational support language and retain the named organizers' public credit.",
          "Do not assign Facebook publishing, grant decisions, fundraising ownership, fiscal sponsorship, or sole campaign ownership to Jamie.",
        ],
        decisionUse:
          "Strengthens the existing public proof with concrete technical mechanisms while preserving collective credit.",
      },
      {
        id: "PROP-JAMIE-KCSPACESFUND-NAMING-MEMORY-2026",
        text: "Jamie recalls supporting the search for a KC Spaces Fund name available uniformly across social platforms and domain names.",
        status: "memory-lead",
        sourceIds: [kcSpacesFundFacebookPostSourceIds.firsthandRole],
        sourceSupport: ["Jamie's attributed first-person recollection"],
        boundaries: [
          "The public identity pattern corroborates the result, not Jamie's actor-level naming role.",
          "Do not say Jamie alone named, registered, administered, or owned the project identities.",
        ],
        decisionUse:
          "Keeps a potentially valuable product-naming and identity-operations contribution in the research lifecycle without publishing it prematurely.",
        nextStep:
          "Recover a collaborator proof note or contemporaneous naming, domain-search, or account-opening record before promoting the role.",
      },
      {
        id: "PROP-KCSPACESFUND-FACEBOOK-VISIBLE-SIGNALS-2026",
        text: "At capture, 28 surviving records displayed at least one visible reaction signal and four displayed a comment relationship, including three cultural-space accounts.",
        status: "supported-with-boundary",
        sourceIds: [kcSpacesFundFacebookPostSourceIds.census],
        sourceSupport: [
          "anonymous signal-bearing record count",
          "unlinkable reaction floor",
          "broad comment-relationship classes",
        ],
        boundaries: [
          "These are mutable interface observations, not unique people, lifetime analytics, reach, endorsement, partnership, conversion, causality, or impact.",
        ],
        decisionUse:
          "Keeps a modest stakeholder-response research lead without turning it into public impact language.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Can a stakeholder-authorized native Meta export reconcile deleted, hidden, or owner-only history with the 40-card surviving surface?",
      "Which collaborator or contemporaneous record can distinguish naming, domain search, account opening, website implementation, and Facebook publishing responsibilities?",
      "Can a public grantee or fiscal-sponsor record establish aggregate disbursement without exposing applicants, donors, or payment details?",
      "Can the historical Do816, Trans Women of Color Collective, and Oddities destination routes be recovered and close-read?",
      "Does any future audience need this Facebook layer on the website, or is the stronger composition the existing concise infrastructure proof?",
    ],
    boundaries: [
      "Do not publish raw post bodies, contact details, comments, reaction identities, authenticated state, account-administration data, applicant records, donor records, subscriber records, payment files, credentials, or private correspondence.",
      "Do not assign any Facebook record to Jamie; he states he was not the stakeholder or owner posting on the account.",
      "Keep organizer credit with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo.",
      "Do not convert uniform public identity into individual naming authorship or current counters into impact.",
      "Keep the Facebook archival layer out of the public website until a separate audience-and-purpose composition decision is made.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: reviewedAt,
    reviewedAt,
    reviewedBy: [
      "Jamie Burkart",
      "Codex full-population authenticated archival-production review",
    ],
  },
] satisfies KnowledgeBank["intakeItems"];

export const kcSpacesFundFacebookPostReportPath = reportPath;
