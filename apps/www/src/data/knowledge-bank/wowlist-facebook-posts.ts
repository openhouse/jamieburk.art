import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const projectId = "wowlist";

const fixtureSourceId = "SRC-WOWLIST-FACEBOOK-POSTS-FULL-POPULATION-2026-07-15";
const researchSourceId = "SRC-WOWLIST-FACEBOOK-POSTS-RESEARCH-2026-07-15";
const pageSourceId = "SRC-WOWLIST-FACEBOOK-PAGE-2026-07-15";
const westwordSourceId = "SRC-WOWLIST-FACEBOOK-DENVER-DIY-FUND-WESTWORD-2017-03-09";

const stewardshipClaimId = "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP";
const distributionClaimId = "CLM-WOWLIST-FACEBOOK-MISSION-DISTRIBUTION";
const metricClaimId = "CLM-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT";
const migrationClaimId = "CLM-WOWLIST-FACEBOOK-MANAGEMENT-MIGRATION-GAP";

export const wowListFacebookPostCaptures = [
  {
    id: "CAP-WOWLIST-FACEBOOK-POSTS-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Authenticated full-population review of every surviving record exposed by the WOW List Facebook Page's Lifetime published-content library, followed by a public-safe immutable fixture and bounded claim development.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "social publishing stewardship",
      "community-calendar distribution",
      "cultural-space support and mutual aid",
      "civic mobilization",
      "participatory product design",
      "bounded social-platform metrics",
    ],
    sourceIds: [fixtureSourceId, researchSourceId, pageSourceId, westwordSourceId],
    observationIds: [
      "OBS-WOWLIST-FB-POST-RESEARCH-METHOD",
      "OBS-WOWLIST-FB-POST-POPULATION",
      "OBS-WOWLIST-FB-POST-PUBLISHER-ATTRIBUTION",
      "OBS-WOWLIST-FB-POST-LINK-INVENTORY",
      "OBS-WOWLIST-FB-POST-MISSION-PATTERNS",
      "OBS-WOWLIST-FB-POST-DENVER-DIY-FUND-SOURCE",
      "OBS-WOWLIST-FB-POST-DASHBOARD-METRICS",
      "OBS-WOWLIST-FB-POST-PAGE-SNAPSHOT",
      "OBS-WOWLIST-FB-POST-MIGRATION-BOUNDARY",
    ],
    researchTaskIds: [
      "RT-WOWLIST-FB-POST-OWNER-EXPORT",
      "RT-WOWLIST-FB-POST-DETAIL-RECOVERY",
      "RT-WOWLIST-FB-POST-LINK-CLOSE-READ",
      "RT-WOWLIST-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    ],
    disposition:
      "Integrated 54 of 54 surviving Lifetime-library records, all 50 recoverable publisher bylines, four table-only records, 42 normalized public destinations, seven mission-pattern classifications, and bounded current dashboard values. Full post text, personal engagement identities, private profile links, and authenticated-session state remain outside the public repository.",
  },
] satisfies CaptureRecord[];

export const wowListFacebookPostSources = [
  {
    id: fixtureSourceId,
    title: "WOW List Facebook posts full-population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/cffc03b0f6550e3b62d73ab84a3fc15d005539a7/apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe full-population inventory of surviving WOW List Facebook Page posts, July 15, 2026.",
    publicNote:
      "The fixture publishes post IDs, dates, recovery and publisher-attribution states, thematic classifications, normalized public links, and bounded current admin metrics. It excludes full post text, commenter identities, private profile links, and authenticated-session data.",
    supportsGenerally: [
      "54 surviving records exposed by the authenticated Lifetime content library",
      "50 recovered detail pages and four table-only records",
      "50 of 50 recovered details attributed by Facebook to Jamie Burkart as publisher",
      "a 2015-04-25 through 2018-03-22 chronology",
      "42 normalized public destinations",
      "mission patterns across community calendars, event distribution, cultural-space support, civic mobilization, and participatory product design",
      "bounded current dashboard values",
    ],
    doesNotEstablish: [
      "a complete Meta owner export or deleted-post history",
      "Jamie's sole ownership of WOW List or sole authorship of quoted and shared material",
      "exclusive management of every project platform or account",
      "historical reach, unique people, attendance, endorsement, conversion, or impact",
      "stakeholder-group engagement counts",
    ],
  },
  {
    id: researchSourceId,
    title: "Authenticated WOW List Facebook post research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production pass over the WOW List Facebook Page's surviving published-post population, July 15, 2026.",
    publicNote:
      "The protected capture retains full post text and traversal provenance for audit while withholding personal engagement identities, private profile links, access details, and authenticated-session state.",
    protectedLocatorId: "PTR-WOWLIST-FACEBOOK-POSTS-2026-07-15",
    supportsGenerally: [
      "terminal-state traversal of the virtualized Lifetime table",
      "detail-page traversal for all 54 post IDs",
      "publisher-byline recovery",
      "link extraction and thematic close reading",
      "legacy Professional Dashboard and modern Meta Business Suite reconciliation",
    ],
    doesNotEstablish: [
      "permission to publish raw social copy or personal engagement identities",
      "a complete Meta owner export",
      "deleted-post recovery",
      "off-platform outcomes",
    ],
  },
  {
    id: pageSourceId,
    title: "WOW List Facebook Page",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/wowlist/",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List Facebook Page, reviewed July 15, 2026.",
    publicNote:
      "The current public Page displayed 185 followers and two accounts followed. These are dated profile counts, not historical reach during the publishing period.",
    supportsGenerally: ["current Page identity", "a dated 2026 profile-count snapshot"],
    doesNotEstablish: [
      "historical audience size",
      "the identity of past readers or engagers",
      "the Page's complete publishing history",
    ],
  },
  {
    id: westwordSourceId,
    title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
    organization: "Denver Westword",
    author: "Patricia Calhoun",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
    publicNote:
      "WOW List circulated the article on the day it was published as part of its cultural-space support and funding coverage.",
    supportsGenerally: [
      "a $20,000 Denver Arts & Venues contribution to a Meow Wolf-administered DIY-space fund",
      "the fund's intended support for Denver DIY and alternative spaces",
      "WOW List's dated circulation of a source about cultural-space funding",
    ],
    doesNotEstablish: [
      "that WOW List or Jamie created, administered, or caused the Denver fund",
      "endorsement by Westword, Meow Wolf, Denver, or any venue",
      "audience use of the posted link",
    ],
  },
] satisfies SourceRecord[];

export const wowListFacebookPostObservations = [
  {
    id: "OBS-WOWLIST-FB-POST-RESEARCH-METHOD",
    sourceId: researchSourceId,
    project: projectId,
    statement:
      "The authenticated review scrolled Facebook's virtualized Lifetime published-content table to a terminal no-growth state, preserved every materialized post ID, and attempted direct detail recovery for all 54 records.",
    observationType: "metadata",
    locator: "Protected traversal log and full-population capture",
    confidence: "high",
    limitations: [
      "Surface completeness does not equal a Meta owner export or deleted-post history.",
      "Authenticated-session details and raw source bodies remain protected.",
    ],
    supportsClaimIds: [stewardshipClaimId, distributionClaimId, migrationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-POPULATION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Facebook's authenticated Lifetime library materialized 54 unique WOW List posts dated April 25, 2015, through March 22, 2018; 50 detail pages rendered and four records remained table-only.",
    observationType: "metadata",
    locator: "populationReconciliation; records",
    confidence: "high",
    limitations: [
      "The denominator is complete only for records exposed by the current authenticated surface.",
      "Four post details were unavailable or redirected and retain unresolved publisher states.",
    ],
    supportsClaimIds: [stewardshipClaimId, distributionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-PUBLISHER-ATTRIBUTION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Every recovered detail page, 50 of 50, displayed Facebook's admin-only 'Published by Jamie Burkart' attribution; four table-only records did not expose a recoverable publisher byline.",
    observationType: "explicit",
    locator: "publishingAttribution; records[*].publisherAttribution",
    confidence: "high",
    limitations: [
      "A Page publisher byline is not sole authorship of quoted or shared material.",
      "WOW List was co-built by Jamie Burkart and Richard Album.",
      "The finding does not establish exclusive management of every WOW List social account or platform.",
    ],
    supportsClaimIds: [stewardshipClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-LINK-INVENTORY",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "The 54-record population preserves 42 normalized public destinations after Facebook and campaign tracking parameters are removed.",
    observationType: "metadata",
    locator: "linkInventory; records[*].sourceLinks",
    confidence: "high",
    limitations: [
      "A circulated link does not establish authorship, endorsement, current availability, audience use, or the truth of its destination.",
      "Most destinations remain leads pending close reading and archival preservation.",
    ],
    supportsClaimIds: [distributionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-MISSION-PATTERNS",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "Record-level close reading classified recurring work around community-calendar onboarding, event and artist distribution, cultural-space support and funding, civic mobilization, community care, and participatory product feedback.",
    observationType: "attributed",
    locator: "missionPatterns.recordCounts; records[*].themes",
    confidence: "moderate",
    limitations: [
      "Themes are an archival classification, not Facebook-authored categories.",
      "Categories overlap and must not be summed into a unique-post total.",
      "Circulation does not prove off-platform outcomes.",
    ],
    supportsClaimIds: [distributionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-DENVER-DIY-FUND-SOURCE",
    sourceId: westwordSourceId,
    project: projectId,
    statement:
      "A March 9, 2017, Denver Westword article reports that Denver Arts & Venues contributed $20,000 to a Meow Wolf-administered fund intended to support Denver DIY and alternative spaces; WOW List circulated the article on its publication date.",
    observationType: "explicit",
    locator: "Article headline, byline, publication date, and paragraphs 1-3; fixture record dated 2017-03-09",
    confidence: "high",
    limitations: [
      "The source does not establish that WOW List or Jamie created, administered, or caused the fund.",
      "Circulation does not establish endorsement by the article's subjects or audience use of the link.",
    ],
    supportsClaimIds: [distributionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-DASHBOARD-METRICS",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "On July 15, 2026, Facebook displayed 108 interactions, 512 impressions, and 11 comments in aggregate across the 54 legacy rows.",
    observationType: "metadata",
    locator: "adminMetricSnapshot",
    confidence: "high",
    limitations: [
      "Legacy metrics may be incomplete or non-comparable after platform migration.",
      "The values are not historical lifetime reach, unique people, attendance, conversion, endorsement, or impact.",
      "The table did not expose a complete population of engager identities for stakeholder classification.",
    ],
    supportsClaimIds: [metricClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-PAGE-SNAPSHOT",
    sourceId: pageSourceId,
    project: projectId,
    statement:
      "The public WOW List Page displayed 185 followers and two accounts followed on July 15, 2026.",
    observationType: "metadata",
    locator: "Public Page profile header",
    confidence: "high",
    limitations: [
      "The current profile count is not historical reach during 2015-2018.",
      "Follower totals do not identify stakeholders or establish engagement quality.",
    ],
    supportsClaimIds: [metricClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-POST-MIGRATION-BOUNDARY",
    sourceId: researchSourceId,
    project: projectId,
    statement:
      "Meta Business Suite's available Lifetime range began March 31, 2019, and displayed no activity, while the legacy Professional Dashboard exposed 54 earlier posts.",
    observationType: "metadata",
    locator: "Authenticated surface reconciliation",
    confidence: "high",
    limitations: [
      "The empty modern table is a migration boundary, not a historical zero.",
      "A Meta owner export is still needed to reconcile deleted or otherwise unexposed records.",
    ],
    supportsClaimIds: [migrationClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const wowListFacebookPostClaims = [
  {
    id: stewardshipClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie stewarded WOW List's Facebook publishing across the surviving 2015-2018 Page record: Facebook attributes all 50 recoverable post details to Jamie as publisher, while four additional records remain table-only in the 54-record inventory.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WOWLIST-FB-POST-RESEARCH-METHOD",
      "OBS-WOWLIST-FB-POST-POPULATION",
      "OBS-WOWLIST-FB-POST-PUBLISHER-ATTRIBUTION",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Jamie also stewarded WOW List's Facebook publishing from 2015 to 2018. Facebook attributes every surviving post detail it still renders, 50 of 50, to him as publisher; four additional records remain table-only. WOW List was co-built with Richard Album, and quoted or shared voices retain their own authorship.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
      },
      {
        key: "resume-html",
        text:
          "Stewarded Facebook publishing for a co-built community-calendar platform across its surviving 2015-2018 Page record.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/resume"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["54-record denominator", "50 recovered publisher bylines", "four table-only records", "date range"],
        locator: "populationReconciliation; publishingAttribution; records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: researchSourceId,
        relationship: "private-support",
        supports: ["authenticated terminal-state method", "detail-page traversal", "publisher-byline recovery method"],
        locator: "Protected traversal log",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "WOW List was co-built by Jamie Burkart and Richard Album.",
      "Use Page publisher or publishing stewardship, not sole authorship of quoted and shared voices.",
      "Four table-only records do not expose a recoverable publisher attribution.",
      "The current surface is not a Meta owner export or deleted-post history.",
      "Do not generalize this Page finding into exclusive management of every WOW List social platform or account.",
    ],
    antiClaims: [
      "Do not say Jamie solely created or owned WOW List.",
      "Do not say Jamie authored every word, image, quotation, or linked source published by the Page.",
      "Do not say all 54 records display Jamie's publisher byline; four remain table-only.",
      "Do not infer historical audience size or impact from the publishing record.",
    ],
    researchTaskIds: [
      "RT-WOWLIST-FB-POST-OWNER-EXPORT",
      "RT-WOWLIST-FB-POST-DETAIL-RECOVERY",
      "RT-WOWLIST-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production", "public-safety review", "Chad lens review"],
  },
  {
    id: distributionClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "The surviving 54-post Page record functioned as a distribution surface for city calendar onboarding, artist and event circulation, cultural-space mutual aid and funding, civic mobilization, community care, and participatory product feedback, preserving 42 normalized public destinations.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WOWLIST-FB-POST-POPULATION",
      "OBS-WOWLIST-FB-POST-LINK-INVENTORY",
      "OBS-WOWLIST-FB-POST-MISSION-PATTERNS",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The 54-record Page inventory preserves 42 normalized destinations and recurring distribution work around community calendars, cultural-space support, civic action, events, and member-led product design.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
      {
        key: "case-study",
        text:
          "The Page connected community-calendar onboarding with event circulation, cultural-space support, civic action, and invitations to shape the product together.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["42 normalized destinations", "record-level themes", "54-record denominator"],
        locator: "linkInventory; missionPatterns; records",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: westwordSourceId,
        relationship: "corroborating",
        supports: ["one dated example of cultural-space funding coverage circulated by WOW List"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Themes are overlapping archival classifications, not platform categories.",
      "A posted URL proves dated circulation, not authorship, endorsement, audience use, or causal effect.",
      "Most destinations remain research leads until they are close-read and archived.",
    ],
    antiClaims: [
      "Do not say WOW List created or administered the initiatives it linked to.",
      "Do not convert content patterns into verified outcomes or stakeholder engagement.",
      "Do not sum overlapping theme counts into a post denominator.",
    ],
    researchTaskIds: ["RT-WOWLIST-FB-POST-LINK-CLOSE-READ"],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production", "editorial review"],
  },
  {
    id: metricClaimId,
    project: projectId,
    claimType: "scale",
    internalClaim:
      "On July 15, 2026, Facebook's legacy table displayed 108 interactions, 512 impressions, and 11 comments across 54 rows; the public Page displayed 185 followers.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: [
      "OBS-WOWLIST-FB-POST-DASHBOARD-METRICS",
      "OBS-WOWLIST-FB-POST-PAGE-SNAPSHOT",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Facebook currently displays 108 interactions, 512 impressions, and 11 comments across the 54 legacy rows; these are migration-sensitive dashboard values, not historical reach or impact.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["row-level and aggregate current dashboard values"],
        locator: "adminMetricSnapshot; records[*].adminMetricSnapshot",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: pageSourceId,
        relationship: "context",
        supports: ["current follower snapshot"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Always date these values July 15, 2026, and call them current displayed dashboard values.",
      "They are not historical lifetime reach, unique people, attendance, conversion, endorsement, or impact.",
      "No complete engager-identity denominator was recovered for stakeholder-group analysis.",
    ],
    antiClaims: [
      "Do not say 512 people saw WOW List posts.",
      "Do not call 108 interactions historical lifetime engagement.",
      "Do not infer engagement by artists, elected officials, agencies, venues, or other stakeholder groups without identity-complete evidence.",
    ],
    researchTaskIds: ["RT-WOWLIST-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION"],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production", "metric-boundary review"],
  },
  {
    id: migrationClaimId,
    project: projectId,
    claimType: "context",
    internalClaim:
      "Meta's modern Business Suite displayed no activity in its available Lifetime range beginning March 31, 2019, while the legacy Professional Dashboard exposed 54 earlier records; the interface gap is a migration boundary, not a historical zero.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "not-recovered",
    observationIds: [
      "OBS-WOWLIST-FB-POST-RESEARCH-METHOD",
      "OBS-WOWLIST-FB-POST-MIGRATION-BOUNDARY",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The modern management surface's empty post-2019 range coexists with 54 records in the legacy dashboard; treat this as migration loss, not historical inactivity.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: researchSourceId,
        relationship: "direct-support",
        supports: ["two-surface authenticated reconciliation", "modern-range boundary"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: fixtureSourceId,
        relationship: "supports-boundary",
        supports: ["54 legacy records", "complete-as-materialized wording"],
        locator: "populationReconciliation; migrationBoundary",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Use no activity displayed in the available modern range, not no historical activity.",
      "Keep owner-export and deleted-post uncertainty attached.",
    ],
    antiClaims: [
      "Do not say WOW List stopped publishing because the modern table is empty.",
      "Do not treat a migrated-interface zero as a complete historical record.",
    ],
    researchTaskIds: ["RT-WOWLIST-FB-POST-OWNER-EXPORT"],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production"],
  },
] satisfies ClaimRecord[];

export const wowListFacebookPostResearchTasks = [
  {
    id: "RT-WOWLIST-FB-POST-OWNER-EXPORT",
    project: projectId,
    question:
      "Can a Meta Page owner export reconcile deleted, removed, and otherwise unexposed WOW List Facebook posts with the 54-record surviving surface?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-WOWLIST-FACEBOOK-POSTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [stewardshipClaimId, migrationClaimId],
    successCriteria: [
      "Acquire an owner-authorized export with stable post IDs and dates.",
      "Reconcile export-only, surface-only, deleted, and unavailable records without erasing uncertainty.",
      "Keep private engagement identities and message data outside the public repository.",
    ],
    nextActions: [
      "Request the available WOW List Page owner export.",
      "Crosswalk post IDs and dates against the immutable 54-record fixture.",
      "Version any denominator correction rather than overwriting the current surface result.",
    ],
    publicNote:
      "The authenticated surface is complete as materialized; owner-export completeness remains open.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-WOWLIST-FB-POST-DETAIL-RECOVERY",
    project: projectId,
    question:
      "Can the four table-only post details and one unresolved attachment be recovered through owner data, archives, or project records?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-WOWLIST-FACEBOOK-POSTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [stewardshipClaimId, distributionClaimId],
    successCriteria: [
      "Recover publisher state, attachment context, and public links for each unresolved record when possible.",
      "Preserve unavailable states when recovery fails.",
      "Do not publish personal engagement identities or raw private metadata.",
    ],
    nextActions: [
      "Search the Meta owner export by the four post IDs.",
      "Search Wayback and local WOW List project archives by date and post ID.",
      "Associate any recovered artifact with explicit provenance and a public-safety review.",
    ],
    publicNote:
      "Four records remain table-only and one recovered no-text attachment remains thematically unresolved.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-WOWLIST-FB-POST-LINK-CLOSE-READ",
    project: projectId,
    question:
      "What additional claims and source relationships can be responsibly developed from the 42 normalized public destinations circulated by WOW List?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-WOWLIST-FACEBOOK-POSTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId, westwordSourceId],
    claimIds: [distributionClaimId],
    successCriteria: [
      "Check every live destination or stable archive and classify source type, date, author, and preservation state.",
      "Decompose claims only after close reading; do not treat circulation as authorship or endorsement.",
      "Preserve dead destinations as historical pointers with archive status.",
    ],
    nextActions: [
      "Prioritize venue-recovery and funding links, city-calendar adoption pages, and civic-mobilization calendars.",
      "Archive high-signal destinations where permitted.",
      "Promote only sources that materially strengthen a defensible project claim.",
    ],
    publicNote:
      "The complete link inventory is preserved; one Westword article is close-read and the remaining destinations stay in research lifecycle.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-WOWLIST-FB-POST-ROLE-AND-ENGAGEMENT-CORROBORATION",
    project: projectId,
    question:
      "How should collaborators and identity-complete records refine Jamie's publishing role and reveal mission-relevant stakeholder engagement without overclaiming?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-WOWLIST-FACEBOOK-POSTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId, pageSourceId],
    claimIds: [stewardshipClaimId, metricClaimId],
    successCriteria: [
      "Invite Richard Album and relevant contributors to confirm, refine, or contest role wording.",
      "Establish a complete denominator before reporting engagement by stakeholder group.",
      "Separate Page publishing, source authorship, project ownership, community voice, and platform administration.",
      "Use public identities only when mission relevance and public-safety review justify publication.",
    ],
    nextActions: [
      "Request collaborator proof notes using the repository's evidence-intake protocol.",
      "Inspect an owner-authorized reactions/comments export if available.",
      "Cross-reference public institutional accounts only after complete identity reconciliation.",
    ],
    publicNote:
      "The Page publisher byline is strong role evidence. Collaborator testimony and identity-complete engagement data can add social and outcome context without displacing collective credit.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const wowListFacebookPostInquiries = [
  {
    id: "INQ-WOWLIST-FACEBOOK-POSTS-2026-07-15",
    project: projectId,
    question:
      "Can every surviving WOW List Facebook post exposed by the authenticated Lifetime library be preserved as public-safe knowledge while establishing Jamie's publishing stewardship, content patterns, source circulation, and honest engagement boundaries?",
    methods: [
      "Switch into the authenticated WOW List Page and open Professional Dashboard > Content Library > Published > Lifetime.",
      "Scroll the virtualized table to its terminal no-growth state and preserve every materialized post ID.",
      "Open every canonical post detail and record publisher-attribution or unavailable state.",
      "Extract and normalize public destination URLs while removing Facebook and campaign tracking parameters.",
      "Classify every record into mission-relevant themes through protected close reading, retaining unresolved artifacts.",
      "Preserve row-level current dashboard values with migration and non-equivalence boundaries.",
      "Exclude full post text, personal engagement identities, private profile links, and authenticated-session data from the public fixture.",
      "Reconcile the legacy dashboard with Meta Business Suite without turning the modern empty range into historical absence.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The Lifetime library materialized 54 unique records from April 25, 2015, through March 22, 2018.",
      "Fifty post details rendered and four records remained table-only.",
      "All 50 recovered details displayed Facebook's 'Published by Jamie Burkart' admin attribution.",
      "The record preserves 42 normalized destinations across community calendars, events, cultural-space support, civic action, and participatory product design.",
      "Current legacy-row values total 108 interactions, 512 impressions, and 11 comments, with migration and non-equivalence boundaries attached.",
      "No complete engager-identity denominator was recovered, so no stakeholder-group engagement count is claimed.",
      "The modern Business Suite range began after the recovered publishing chronology and displayed no activity; the legacy dashboard retained the earlier records.",
    ],
    limitations: [
      "The authenticated surface is not a Meta owner export and cannot establish deleted-post history.",
      "Four detail pages remain unavailable and one attachment remains thematically unresolved.",
      "A publisher byline does not establish sole authorship, sole ownership, or exclusive platform management.",
      "Current dashboard values may be incomplete or non-comparable and are not historical reach or impact.",
      "Engager identities were not collected as a complete population.",
      "Most linked destinations remain leads pending close reading and preservation.",
    ],
    sourceIds: [fixtureSourceId, researchSourceId, pageSourceId, westwordSourceId],
    publicSummary:
      "The surviving Page population is complete as exposed: 54 records, 50 recovered details attributed to Jamie as publisher, four table-only gaps, and 42 normalized destinations. Collective authorship, owner-export completeness, stakeholder engagement, and platform-metric limits remain explicit.",
    protectedLocatorId: "PTR-WOWLIST-FACEBOOK-POSTS-2026-07-15",
  },
] satisfies ResearchInquiry[];

export const wowListFacebookPostReviewSummary = {
  records: 54,
  detailsRecovered: 50,
  tableOnly: 4,
  dateStart: "2015-04-25",
  dateEnd: "2018-03-22",
  detailsAttributedToJamie: 50,
  normalizedDestinations: 42,
  dashboardInteractions: 108,
  dashboardImpressions: 512,
  dashboardComments: 11,
  currentFollowers: 185,
  criterion:
    "Every materialized post has an identity and disposition, every recovered publisher byline is preserved, private social data is excluded, metrics and migration are bounded, and only the role claim is selected for the website.",
} as const;
