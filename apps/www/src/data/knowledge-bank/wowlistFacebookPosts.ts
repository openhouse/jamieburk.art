import type { KnowledgeBank } from "./schema.ts";

const projectId = "wowlist";
const reportUrl =
  "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/wowlist-facebook-posts.md";

export const wowlistFacebookPostSourceIds = {
  pageSurface: "SRC-WOWLIST-FACEBOOK-PAGE-2026-07-15",
  freshReconciliation: "SRC-WOWLIST-FACEBOOK-LIVE-BIDIRECTIONAL-CONTROL-2026-07-15",
  census: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026-07-15",
  protectedCapture: "SRC-WOWLIST-FACEBOOK-PROTECTED-CAPTURE-2026-07-13",
  publisherAudit: "SRC-WOWLIST-FACEBOOK-PUBLISHER-AUDIT-2026-07-15",
  firsthandMemory: "SRC-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026-07-15",
  managementGap: "SRC-WOWLIST-META-CONTENT-LIBRARY-GAP-2026-07-15",
  westwordDenverFund: "SRC-WOWLIST-FB-SOURCE-WESTWORD-DENVER-DIY-FUND-2017",
  eastBayGhostShip: "SRC-WOWLIST-FB-SOURCE-EAST-BAY-GHOST-SHIP-2016",
  willametteKnowClosing: "SRC-WOWLIST-FB-SOURCE-WILLAMETTE-KNOW-CLOSING-2016",
  pehrspaceFundraiser: "SRC-WOWLIST-FB-SOURCE-PEHRSPACE-FUNDRAISER-2016",
} as const;

export const wowlistFacebookPostClaimIds = {
  population: "CLM-WOWLIST-FACEBOOK-POST-POPULATION",
  publishingManagement: "CLM-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT",
  operatingPractice: "CLM-WOWLIST-FACEBOOK-OPERATING-PRACTICE",
  careAndAdvocacyArc: "CLM-WOWLIST-FACEBOOK-CARE-ADVOCACY-ARC",
} as const;

export const wowlistFacebookPostReviewSummary = {
  protectedCapturePages: 19,
  recoveredPostCount: 57,
  liveMessageRecordCount: 53,
  liveMessageForwardReverseAgreement: 53,
  recordsReviewedPercent: 100,
  availablePostCount: 54,
  unavailablePostCount: 3,
  jamieAttributedPostCount: 51,
  otherPublisherAttributedPostCount: 0,
  attributionNotRecoveredCount: 6,
  pageAuthoredCommentaryRecords: 44,
  attachedSharedSourceRecords: 21,
  noMessageRecords: 4,
  publicUrlOccurrences: 73,
  distinctNormalizedPublicUrls: 65,
  distinctWowListRouteUrls: 36,
  distinctExternalPublicUrls: 29,
  withheldRouteOccurrences: 1,
  recoveredYears: {
    2015: 22,
    2016: 27,
    2017: 7,
    2018: 1,
  },
  missionThemeCounts: {
    "event-discovery-and-circulation": 34,
    "product-onboarding-and-contribution": 21,
    "diy-cultural-space-sustainability": 19,
    "mutual-aid-and-solidarity": 17,
    "peer-learning-and-documentation": 12,
    "civic-and-cultural-advocacy": 9,
  },
} as const;

export const wowlistFacebookPostSources = [
  {
    id: wowlistFacebookPostSourceIds.pageSurface,
    title: "WOW List Facebook page",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/wowlist/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List Facebook page, authenticated review July 15, 2026.",
    publicNote:
      "The live page preserved the WOW List project identity and currently available post routes. Historical Page and current profile-style objects were treated as one migrated project surface only after record-level reconciliation.",
    supportsGenerally: [
      "the current WOW List Facebook identity",
      "currently available post wrappers",
      "a historical Page-to-profile-style migration",
    ],
    doesNotEstablish: [
      "a complete native owner export",
      "the contents of unavailable posts",
      "the publisher of every post",
      "lifetime reach, adoption, or impact",
      "permission to publish comments, contacts, or account administration",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.freshReconciliation,
    title: "Authenticated WOW List Facebook live bidirectional population control",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Authenticated bidirectional population control of the WOW List Facebook page, July 15, 2026.",
    publicNote:
      "Forward and reverse traversals each recovered the same 53 normalized message-bearing records after ten terminal no-growth checks. The protected normalized record-set digest is ed6c06d22696218621963fd4bea7bdf14253576c7b67213e7cbdef30f8e07cf6.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-LIVE-CONTROL-2026-07-15-K",
    supportsGenerally: [
      "53 exact message-bearing live records in each traversal direction",
      "ten forward terminal no-growth checks",
      "ten reverse terminal no-growth checks",
      "current authenticated Page-management access",
    ],
    doesNotEstablish: [
      "a native Meta owner export",
      "the four no-message records in the protected 57-record population",
      "the absence of deleted or withheld posts",
      "publisher identity",
      "stable engagement totals",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.census,
    title: "WOW List Facebook post public-safe full-population census",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    metadataVerifiedAt: "2026-07-15",
    metadataVerifiedBy: "Codex public-fixture and protected-input reconciliation",
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe full-population census of 57 recovered WOW List Facebook posts, July 15, 2026.",
    publicNote:
      "The fixture gives all 57 recovered post identities a public-safe content and live-review disposition, preserves aggregate publishing and source patterns, inventories 65 distinct public posted URLs, and excludes raw post bodies, comments, contacts, ordinary individual source-account names, and authenticated-session state.",
    supportsGenerally: [
      "57-of-57 recovered-population review",
      "April 2015 through March 2018 chronology",
      "44 records with page-authored commentary",
      "21 records with attached shared sources",
      "51 manager-attributed Jamie publisher displays",
      "six publisher attributions not recovered",
      "65 distinct normalized public posted URLs",
      "36 distinct WOW List route URLs",
      "mission-theme and stakeholder-group patterns",
    ],
    doesNotEstablish: [
      "a complete native Meta owner export",
      "the contents or publisher of the six unattributed records",
      "that no post was deleted, withheld, or omitted before capture",
      "shared-source authorship by Jamie",
      "post-level reach, audience identity, endorsement, adoption, or impact",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.protectedCapture,
    title: "Protected terminal WOW List Facebook owner-post capture",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    publicCitation:
      "Protected terminal 19-page capture of WOW List Facebook owner posts, July 13, 2026.",
    publicNote:
      "The protected capture recovered 57 unique records across 19 pages and reached a terminal cursor without repetition. Its raw messages, comments, identities, contact details, platform identifiers, and session context remain outside the public repository.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-POST-CAPTURE-2026-07-13",
    supportsGenerally: [
      "terminal 19-page traversal",
      "57 unique owner-post records",
      "post dates and relationship classification",
      "posted-URL extraction",
      "protected source-actor and message review",
    ],
    doesNotEstablish: [
      "permission to publish the protected record set",
      "a native Meta owner export",
      "the absence of deleted or withheld posts",
      "stable full-population engagement totals",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.publisherAudit,
    title: "Authenticated manager-only WOW List publisher audit",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated manager-only publisher audit of all 57 recovered WOW List Facebook post identities, July 15, 2026.",
    publicNote:
      "The live audit reviewed every recovered post identity. Facebook displayed 'Published by Jamie Burkart' on 51 records and no other publisher on any record. Three unavailable wrappers and three video redirects did not yield publisher attribution.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-PUBLISHER-AUDIT-2026-07-15",
    supportsGenerally: [
      "57-record live attribution review",
      "51 Jamie publisher displays",
      "zero other-publisher displays",
      "three unavailable wrappers",
      "three attribution-less video redirects",
    ],
    doesNotEstablish: [
      "the publisher of the six unresolved records",
      "sole ownership of WOW List",
      "authorship of attached source material",
      "management of every WOW List social platform",
      "permission to publish authenticated administration details",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.firsthandMemory,
    title: "Jamie Burkart first-person WOW List social-management recollection",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart first-person recollection about WOW List social publishing, received July 15, 2026.",
    publicNote:
      "Jamie recalls that WOW List was his and Richard Caceres's project and believes he managed all of the project's social presence. The manager-only Facebook audit corroborates the Facebook portion strongly but leaves six recovered post identities unresolved and does not test every platform.",
    protectedLocatorId: "LOC-WOWLIST-SOCIAL-MANAGEMENT-MEMORY-2026-07-15",
    supportsGenerally: [
      "Jamie's memory of managing project social presence",
      "shared project ownership with Richard Caceres",
      "a lead for cross-platform authorship research",
    ],
    doesNotEstablish: [
      "independent proof of every social-platform post",
      "sole ownership or sole project authorship",
      "the publisher of the six unresolved Facebook records",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.managementGap,
    title: "WOW List Meta Business Suite historical coverage gap",
    organization: "Meta",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated Meta Business Suite content-library review for WOW List, July 15, 2026.",
    publicNote:
      "The interface labeled its Lifetime range as March 31, 2019 through July 14, 2026 and showed no activity. That range begins after the recovered April 2015-March 2018 corpus, so the zero-state is a management-interface coverage gap, not evidence that the earlier posts did not exist.",
    protectedLocatorId: "LOC-WOWLIST-META-CONTENT-LIBRARY-2026-07-15",
    supportsGenerally: [
      "the displayed 2019-2026 management-interface range",
      "the need for an independent historical capture",
      "a platform-migration boundary",
    ],
    doesNotEstablish: [
      "zero historical WOW List posts",
      "deletion of the 2015-2018 corpus",
      "complete management-interface coverage",
      "publisher identity",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.westwordDenverFund,
    title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
    author: "Patricia Calhoun",
    organization: "Denver Westword",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: "2026-07-15",
    metadataVerifiedAt: "2026-07-15",
    metadataVerifiedBy: "Codex canonical-page and corpus-fixture close read",
    canonicalUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
    publicNote:
      "The article documents city and arts-organization responses to DIY-space closures, including short-term funds, safety resources, building-code guidance, and longer-term policy work. WOW List circulated the article with Meow Wolf fund information.",
    supportsGenerally: [
      "a mission-relevant source in the Facebook link trail",
      "Denver DIY-space support and safety context",
      "an example of public and community infrastructure responding together",
    ],
    doesNotEstablish: [
      "WOW List as fund organizer",
      "Jamie as article author",
      "reciprocal endorsement by Denver or Meow Wolf",
      "funding received by a WOW List contributor",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.eastBayGhostShip,
    title:
      "Artists Who Survived Oakland Warehouse Fire Discuss The Tragedy, Those Missing, Need for Safe Underground Spaces",
    organization: "East Bay Express",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-03",
    accessedAt: "2026-07-15",
    metadataVerifiedAt: "2026-07-15",
    metadataVerifiedBy: "Codex canonical-page and corpus-fixture close read",
    canonicalUrl:
      "https://eastbayexpress.com/artists-who-survived-oakland-warehouse-fire-discuss-the-tragedy-those-missing-need-for-safe-underground-spaces-2-1/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "'Artists Who Survived Oakland Warehouse Fire Discuss The Tragedy, Those Missing, Need for Safe Underground Spaces,' East Bay Express, December 3, 2016.",
    publicNote:
      "The article records artists' immediate testimony after the Ghost Ship fire and their insistence that safety requires viable spaces rather than punishment alone. WOW List redistributed the report during a wider relief, mourning, safety, and public-action sequence.",
    supportsGenerally: [
      "Ghost Ship response context",
      "artist testimony about safety and cultural-space precarity",
      "a care-and-advocacy source in the Facebook record",
    ],
    doesNotEstablish: [
      "WOW List as event or relief organizer",
      "Jamie as article author",
      "audience action caused by the post",
      "policy influence",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.willametteKnowClosing,
    title: "The Know Is Closing",
    author: "Matthew Singer",
    organization: "Willamette Week",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-07-01",
    accessedAt: "2026-07-15",
    metadataVerifiedAt: "2026-07-15",
    metadataVerifiedBy: "Codex canonical-page and corpus-fixture close read",
    canonicalUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
    publicNote:
      "The article documents a longstanding Portland punk venue closing after a major rent increase. WOW List circulated the report with a community member's public argument for recognizing all-ages venues as civic resources.",
    supportsGenerally: [
      "cultural-space continuity context",
      "rent-pressure reporting",
      "a mission-relevant source in the Facebook link trail",
    ],
    doesNotEstablish: [
      "WOW List as venue operator",
      "Jamie as article author",
      "causality for the venue's closure or relocation",
      "reciprocal endorsement by the publication",
    ],
  },
  {
    id: wowlistFacebookPostSourceIds.pehrspaceFundraiser,
    title: "Help pehrspace Find A New Home",
    organization: "pehrspace / GoFundMe",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-06-10",
    accessedAt: "2026-07-15",
    metadataVerifiedAt: "2026-07-15",
    metadataVerifiedBy: "Codex canonical-page and corpus-fixture close read",
    canonicalUrl: "https://www.gofundme.com/f/pehrspace",
    preferredPublicUrl: "canonical",
    publicCitation:
      "pehrspace, 'Help pehrspace Find A New Home,' GoFundMe, created June 10, 2016.",
    publicNote:
      "The public fundraiser documents an all-ages, volunteer, not-for-profit arts space seeking relocation funds after a 60-day notice. The page currently displays $16,630 raised against a $16,500 goal from 161 donations; those mutable figures are source context, not WOW List impact metrics.",
    supportsGenerally: [
      "pehrspace relocation context",
      "public fundraiser purpose",
      "a cultural-space mutual-aid source circulated by WOW List",
    ],
    doesNotEstablish: [
      "donations caused by the WOW List post",
      "WOW List as fundraiser organizer",
      "Jamie as campaign author",
      "a stable historical donor or audience count",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const wowlistFacebookPostClaims = [
  {
    id: wowlistFacebookPostClaimIds.population,
    project: projectId,
    internalClaim:
      "The protected WOW List Facebook owner-post capture reached a terminal cursor after 19 pages and recovered 57 unique posts dated April 25, 2015 through March 23, 2018; all 57 received a public-safe record and a live disposition.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A terminal 19-page capture recovered 57 unique WOW List Facebook posts from April 2015 through March 2018. The public-safe census gives every recovered record a content and live-review disposition.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: wowlistFacebookPostSourceIds.protectedCapture,
        relationship: "private-support",
        supports: ["terminal 19-page capture", "57 unique records", "date range"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: ["57-of-57 public-safe disposition", "record-level public census"],
        locator: "populationReconciliation and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.pageSurface,
        relationship: "corroborating",
        supports: ["current project identity", "currently available post routes"],
        confidence: "moderate",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.freshReconciliation,
        relationship: "corroborating",
        supports: [
          "current live 53-record message-bearing population",
          "exact forward and reverse agreement",
          "terminal no-growth control",
        ],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is complete disposition of the recovered 57-record population, not a native Meta owner export.",
      "Do not infer that no earlier post was deleted, withheld, or omitted before the protected capture.",
      "Three post wrappers are currently unavailable; preserve that state rather than calling them deleted or nonexistent.",
    ],
    antiClaims: [
      "WOW List made exactly 57 Facebook posts in its entire history",
      "All 57 post bodies remain live",
      "The capture proves no post was ever deleted",
      "Meta Business Suite supplied the recovered corpus",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"],
  },
  {
    id: wowlistFacebookPostClaimIds.publishingManagement,
    project: projectId,
    internalClaim:
      "Facebook's manager-only interface attributes 51 of the 57 recovered WOW List post identities to Jamie Burkart, attributes none to another publisher, and leaves six unresolved; together with Jamie's first-person recollection, this supports that he managed WOW List's Facebook publishing across the recovered 2015-2018 corpus while WOW List remained his and Richard Caceres's shared project.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Within the project he co-built with Richard Caceres, Jamie managed WOW List's Facebook publishing across the recovered 2015-2018 corpus, using the page to onboard contributors, circulate events, and connect organizers with practical support; a manager audit attributes 51 of 57 recovered posts to Jamie, none to another publisher, and leaves six unresolved.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
      },
      {
        key: "archive-note",
        text: "A record-by-record manager audit attributes 51 of 57 recovered WOW List Facebook posts to Jamie, attributes none to another publisher, and leaves six unresolved. This supports Jamie's account that he managed the project's Facebook publishing while preserving Richard Caceres's shared project credit.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: wowlistFacebookPostSourceIds.publisherAudit,
        relationship: "direct-support",
        supports: [
          "57-record manager-only audit",
          "51 Jamie publisher displays",
          "zero other-publisher displays",
          "six unresolved attributions",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.census,
        relationship: "corroborating",
        supports: ["public-safe attribution ledger", "live-disposition accounting"],
        locator: "livePublisherAudit and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.firsthandMemory,
        relationship: "private-support",
        supports: ["first-person social-management recollection", "shared project credit"],
        confidence: "moderate",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Say 'managed WOW List's Facebook publishing across the recovered corpus,' not 'authored every WOW List social post.'",
      "The audit leaves six unresolved records: three unavailable wrappers and three video redirects.",
      "Attached or quoted source statements retain their original authorship even when Jamie published the WOW List wrapper.",
      "Richard Caceres's shared project ownership and contribution remain explicit.",
      "The evidence does not establish Jamie's operation of every WOW List social platform.",
    ],
    antiClaims: [
      "Jamie authored all 57 post texts",
      "Jamie was WOW List's sole creator or owner",
      "No one else ever published through WOW List",
      "Jamie managed every WOW List social platform",
      "The six unresolved posts were published by Jamie",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated publisher audit"],
  },
  {
    id: wowlistFacebookPostClaimIds.operatingPractice,
    project: projectId,
    internalClaim:
      "The 57-post Facebook corpus documents an operating practice, not only promotion: 44 records contain page-authored commentary, 21 carry attached shared sources, and the account circulated 73 public URL occurrences representing 65 distinct normalized URLs, including 36 distinct WOW List routes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "WOW List's Facebook account functioned as an operating layer for a participatory event system: it onboarded contributors, circulated event and organizer routes, connected scenes to peer knowledge, and made community support actionable. Across 57 recovered posts, 44 include page-authored commentary and the public link trail contains 65 distinct URLs, including 36 WOW List routes.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: wowlistFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: [
          "content-relationship counts",
          "posted-URL inventory",
          "mission-theme classification",
          "stakeholder-group classification",
        ],
        locator: "publishingPattern, postedUrlInventory, and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
        relationship: "corroborating",
        supports: ["participant-created product-onboarding specimen"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The theme classifier allows overlap and measures records, not unique audiences or outcomes.",
      "A posted URL establishes publication or redistribution, not readership, adoption, endorsement, or impact.",
      "The one withheld Google document route remains outside the public fixture pending separate public-safety review.",
      "The corpus does not establish who authored every attached or quoted source statement.",
    ],
    antiClaims: [
      "65 organizations adopted WOW List",
      "36 communities used WOW List",
      "Every linked event was produced by WOW List",
      "Every source account endorsed WOW List",
      "The Facebook posts caused attendance or project outcomes",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOURCE-NETWORK-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex full-population archival-production review"],
  },
  {
    id: wowlistFacebookPostClaimIds.careAndAdvocacyArc,
    project: projectId,
    internalClaim:
      "The Facebook source trail connects event discovery and contributor onboarding with cultural-space continuity, mutual aid, Ghost Ship mourning and safety, peer infrastructure, and civic advocacy including Cabaret Law repeal.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The Facebook record shows the same infrastructure widening its field of care: event discovery and contributor onboarding sit beside venue relocation campaigns, Ghost Ship relief and safety resources, DIY-space funding, and Cabaret Law advocacy. The through-line is practical support for people and places that make culture possible.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: wowlistFacebookPostSourceIds.census,
        relationship: "direct-support",
        supports: [
          "19 cultural-space-sustainability records",
          "17 mutual-aid-and-solidarity records",
          "nine civic-and-cultural-advocacy records",
          "dated source and route inventory",
        ],
        locator: "publishingPattern and records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.eastBayGhostShip,
        relationship: "context",
        supports: ["artist testimony about safety and cultural-space precarity"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.willametteKnowClosing,
        relationship: "context",
        supports: ["venue closure and rent-pressure context"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.pehrspaceFundraiser,
        relationship: "context",
        supports: ["all-ages cultural-space relocation and mutual-aid context"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: wowlistFacebookPostSourceIds.westwordDenverFund,
        relationship: "context",
        supports: ["city and arts-organization DIY-space response context"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
        relationship: "context",
        supports: ["DIY-space infrastructure and operational-support context"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is a source-backed editorial pattern, not proof that WOW List organized every campaign, fundraiser, event, or policy action it circulated.",
      "The source trail does not assign sole causality for Cabaret Law repeal, venue survival, relief fundraising, or safety outcomes.",
      "Treat linked people and organizations as sources or publics, not automatically as partners or endorsers.",
    ],
    antiClaims: [
      "WOW List created every linked cultural-space campaign",
      "WOW List caused the fundraisers to succeed",
      "Jamie alone repealed the Cabaret Law",
      "Every linked organization endorsed WOW List",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOURCE-NETWORK-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex source-trail review"],
  },
] satisfies KnowledgeBank["claims"];

export const wowlistFacebookPostResearchInquiries = [
  {
    id: "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026",
    project: projectId,
    question:
      "Can every recovered WOW List Facebook post identity receive a public-safe content disposition, live availability disposition, and bounded publisher-attribution result?",
    methods: [
      "Reviewed a protected 19-page owner-post capture that terminated without a repeated cursor and contained 57 unique records.",
      "Repeated a fresh authenticated live-page traversal in both directions; each pass recovered the same 53 normalized message-bearing records after ten terminal no-growth checks.",
      "Deduplicated page-authored messages, attached-source messages, actors, post routes, and outbound URLs at record level.",
      "Opened all 57 post identities in an authenticated manager session and retried shallow lazy-loaded pages before assigning attribution state.",
      "Separated unavailable wrappers and video redirects from ordinary post pages rather than treating missing publisher labels as other authorship.",
      "Generated a public-safe 57-row ledger with protected-input SHA-256 controls.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "All 57 protected capture records received a public-safe census row and a live disposition.",
      "The fresh live-page control recovered 53 exact message-bearing records in each direction; the remaining four protected records have no recovered message text and remain governed through the 57-record census.",
      "Fifty-four post identities remained available and three wrappers were unavailable.",
      "Manager-only attribution named Jamie on 51 records, named no other publisher, and remained unrecovered for three unavailable wrappers and three video redirects.",
      "The current management interface begins its displayed Lifetime range in March 2019, after the recovered 2015-2018 population.",
    ],
    limitations: [
      "The protected capture is not a native Meta owner export and cannot prove that no post was deleted, withheld, or omitted before capture.",
      "The six unresolved publisher attributions receive no inferred author.",
      "The publisher audit concerns Facebook wrappers and does not assign authorship of attached source material or establish management of every social platform.",
      "No stable full-population engagement or audience-identity dataset was recovered.",
    ],
    sourceIds: [
      wowlistFacebookPostSourceIds.pageSurface,
      wowlistFacebookPostSourceIds.freshReconciliation,
      wowlistFacebookPostSourceIds.census,
      wowlistFacebookPostSourceIds.protectedCapture,
      wowlistFacebookPostSourceIds.publisherAudit,
      wowlistFacebookPostSourceIds.firsthandMemory,
      wowlistFacebookPostSourceIds.managementGap,
    ],
    publicSummary:
      "All 57 recovered WOW List Facebook post identities were reviewed. Fifty-one display Jamie as publisher, none display another publisher, and six remain unresolved; this is complete disposition of the recovered population, not a complete native account export.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-POST-RESEARCH-2026-07-15",
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-SOURCE-NETWORK-2026",
    project: projectId,
    question:
      "What operating, source, and stakeholder patterns appear across the complete recovered WOW List Facebook post population, and which can become defensible professional claims?",
    methods: [
      "Classified all 57 records by wrapper/source relationship, recurring mission theme, and broad stakeholder group using checked-in deterministic rules.",
      "Unwrapped Facebook redirect routes, removed tracking parameters, excluded platform links, and withheld one Google document route pending separate safety review.",
      "Close-read selected live sources concerning DIY-space funding, Ghost Ship safety, venue rent pressure, and pehrspace relocation.",
      "Kept source publication distinct from reciprocal endorsement, audience conversion, project adoption, and causal impact.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Forty-four records include page-authored commentary; 21 include attached shared-source material; four carry media or links without recovered message text.",
      "The public URL inventory contains 73 occurrences representing 65 distinct normalized URLs, including 36 distinct WOW List routes and 29 distinct external routes.",
      "The largest overlapping mission classifications are event discovery and circulation (34), product onboarding and contribution (21), DIY cultural-space sustainability (19), and mutual aid and solidarity (17).",
      "The source trail joins community contributors and organizers with DIY spaces, arts and civic organizations, public media, documentarians, and movement publics.",
      "The account record supports a professional operating claim about contributor onboarding, event distribution, source curation, and care infrastructure without requiring a public website change today.",
    ],
    limitations: [
      "Theme and stakeholder labels overlap and are rule-based analytical classifications, not native Facebook categories.",
      "A public share or attached source does not establish partnership, endorsement, authorship by Jamie, or measured project impact.",
      "Post-level reaction, share, comment, reach, and audience-identity totals were not recovered for the full population.",
      "One Google document route remains withheld until its contents receive a separate public-safety review.",
    ],
    sourceIds: [
      wowlistFacebookPostSourceIds.census,
      wowlistFacebookPostSourceIds.protectedCapture,
      wowlistFacebookPostSourceIds.westwordDenverFund,
      wowlistFacebookPostSourceIds.eastBayGhostShip,
      wowlistFacebookPostSourceIds.willametteKnowClosing,
      wowlistFacebookPostSourceIds.pehrspaceFundraiser,
      "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
      "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
    ],
    publicSummary:
      "The complete recovered Facebook corpus documents WOW List's account as an operating and editorial layer for contributor onboarding, event circulation, peer knowledge, cultural-space continuity, mutual aid, and advocacy. The analysis does not convert source sharing into endorsement or post publication into impact.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-SOURCE-NETWORK-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const wowlistFacebookPostReportUrl = reportUrl;
