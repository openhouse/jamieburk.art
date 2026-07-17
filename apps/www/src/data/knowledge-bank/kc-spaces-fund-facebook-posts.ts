import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const projectId = "kc-spaces-fund";

const pageSourceId = "SRC-FB-KCSPACESFUND-PAGE-2026";
const researchSourceId = "SRC-FB-KCSPACESFUND-POPULATION-RUN-2026";
const ledgerSourceId = "SRC-FB-KCSPACESFUND-PUBLIC-LEDGER-2026";
const siteSourceId = "SRC-KCSPACESFUND-CAMPAIGN-SITE-2020";
const applySourceId = "SRC-KCSPACESFUND-APPLICATION-GUIDANCE-2020";
const goFundMeSourceId = "SRC-KCSPACESFUND-GOFUNDME-2020";
const starSourceId = "SRC-KCSPACESFUND-KANSAS-CITY-STAR-2020";
const odditiesSourceId = "SRC-KCSPACESFUND-ODDITIES-PRINTS";
const gitReviewSourceId = "SRC-KCSPACESFUND-LOCAL-GIT-REVIEW-2026";
const roleMemorySourceId = "SRC-JAMIE-KCSPACESFUND-ROLE-MEMORY-2026";

const populationClaimId = "CLM-KCSPACESFUND-FACEBOOK-SURVIVING-POPULATION";
const operatingCycleClaimId = "CLM-KCSPACESFUND-FACEBOOK-RELIEF-CYCLE";
const outcomeClaimId = "CLM-KCSPACESFUND-FUNDRAISING-AND-SPOTLIGHTS";
const interactionClaimId = "CLM-KCSPACESFUND-FACEBOOK-INTERACTION-SNAPSHOT";
const identityClaimId = "CLM-KCSPACESFUND-UNIFORM-PUBLIC-IDENTITY";
const infrastructureClaimId = "CLM-JAMIE-KCSPACESFUND-DIGITAL-INFRASTRUCTURE";
const namingMemoryClaimId = "CLM-JAMIE-KCSPACESFUND-NAMING-MEMORY";

export const kcSpacesFundFacebookPostAudit = {
  survivingPublicRecords: 40,
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
  fundedSpaceSpotlights: 10,
  applicationRoutingRecords: 8,
  fundraisingRecords: 13,
  recordsWithVisibleReactionSignals: 28,
  visibleReactionSignalFloor: 119,
  recordsWithVisibleCommentRelations: 4,
  culturalSpaceAccountCommentRelations: 3,
  publisherAttribution: "unresolved",
  ledgerPath:
    "docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json",
  reportPath:
    "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md",
} as const;

export const kcSpacesFundFacebookPostCaptures = [
  {
    id: "CAP-KCSPACESFUND-FACEBOOK-POSTS-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Full-population review of every surviving public card materialized by the KC Spaces Fund Facebook Page, followed by source research and role-safe claim development.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "mutual-aid operating cycle",
      "fundraising and funded-space documentation",
      "uniform public identity",
      "digital campaign infrastructure",
      "bounded social-platform response",
    ],
    sourceIds: [
      pageSourceId,
      researchSourceId,
      ledgerSourceId,
      siteSourceId,
      applySourceId,
      goFundMeSourceId,
      starSourceId,
      odditiesSourceId,
      gitReviewSourceId,
      roleMemorySourceId,
    ],
    observationIds: [
      "OBS-KCSPACESFUND-FB-RESEARCH-METHOD",
      "OBS-KCSPACESFUND-FB-POPULATION",
      "OBS-KCSPACESFUND-FB-RELIEF-CYCLE",
      "OBS-KCSPACESFUND-FB-FUNDED-SPACES",
      "OBS-KCSPACESFUND-FB-INTERACTION-SNAPSHOT",
      "OBS-KCSPACESFUND-PUBLIC-IDENTITY",
      "OBS-KCSPACESFUND-DIGITAL-INFRASTRUCTURE",
      "OBS-KCSPACESFUND-ROLE-BOUNDARY",
    ],
    researchTaskIds: [
      "RT-KCSPACESFUND-FB-OWNER-EXPORT",
      "RT-KCSPACESFUND-ROLE-CORROBORATION",
      "RT-KCSPACESFUND-POSTED-SOURCE-RECOVERY",
    ],
    disposition:
      "Integrated 40 surviving public Page cards, a bounded response snapshot, ten public funded-space spotlights, public campaign and fundraising sources, and protected role evidence. Full transcripts, personal engagement identities, authenticated state, contact details, applicant or donor data, and private project materials remain outside the public repository.",
  },
] satisfies CaptureRecord[];

export const kcSpacesFundFacebookPostSources = [
  {
    id: pageSourceId,
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund public Facebook Page, accessed July 15, 2026.",
    publicNote:
      "The Page supplies the public project identity and surviving timeline surface. Current follower and interaction values are mutable interface observations.",
    supportsGenerally: [
      "the public KC Spaces Fund Facebook identity",
      "the currently accessible public Page timeline",
    ],
    doesNotEstablish: [
      "deleted, private, hidden, or owner-export-only history",
      "individual publisher, administrator, author, or account owner identity",
      "historical reach, attendance, endorsement, conversion, or impact",
    ],
  },
  {
    id: researchSourceId,
    title: "KC Spaces Fund Facebook surviving-public-population research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe metadata from a July 2026 accounting of the surviving KC Spaces Fund Facebook Page timeline.",
    publicNote:
      "Three terminal traversals recovered 40, 38, and 40 deduplicated cards. The final slower traversal reproduced 40; all 21 stable media identities matched across all three passes.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "40 surviving public Page cards",
      "20 media-backed and 20 non-media records",
      "ten funded-space spotlights, eight application-routing records, and 13 fundraising records",
      "a mutable visible reaction-signal floor of 119 across 28 records",
    ],
    doesNotEstablish: [
      "a native Meta owner export or deleted-post history",
      "historic publisher or administrator identity",
      "unique people, reach, attendance, endorsement, conversion, causality, or impact",
    ],
  },
  {
    id: ledgerSourceId,
    title: "KC Spaces Fund Facebook public post ledger",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/d3683654893ef025fab09a46c7f58eff33c93c32/docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe ledger of the surviving KC Spaces Fund Facebook Page population, July 15, 2026.",
    publicNote:
      "The ledger retains public media routes, record form, recovery state, mission classifications, named public funded-space spotlights, normalized public destinations, and anonymous aggregate response relationships. It omits full transcripts and personal engagement identities.",
    supportsGenerally: [
      "a 40-record public-safe disposition ledger",
      "population, mission-mode, destination, and bounded response accounting",
      "the ten named public funded-space spotlights",
    ],
    doesNotEstablish: [
      "a complete lifetime or deleted-post history",
      "the human publisher of any record",
      "the complete applicant, grantee, donor, or disbursement population",
    ],
  },
  {
    id: siteSourceId,
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
      "The site describes an emerging coalition supporting grassroots arts and culture spaces during COVID-19 and preserves public join, apply, donate, and contact routes.",
    supportsGenerally: [
      "the campaign purpose and coalition framing",
      "the campaign's public action-routing system",
      "the kcspacesfund.com public identity",
    ],
    doesNotEstablish: [
      "individual authorship or implementation roles",
      "who chose the project name",
      "grant decisions, disbursement totals, or campaign impact",
    ],
  },
  {
    id: applySourceId,
    title: "KC Spaces Fund application guidance and FAQ",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kcspacesfund.com/apply/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund application guidance and FAQ.",
    publicNote:
      "The guidance describes emergency grants up to $500, rolling April-June 2020 review as funding allowed, priority communities, organizers, and Allied Media Projects as fiscal sponsor.",
    supportsGenerally: [
      "the grant ceiling, rolling process, and priority criteria",
      "public organizer and fiscal-sponsor credit",
      "the June 1 final application deadline",
    ],
    doesNotEstablish: [
      "Jamie's organizer, decision-making, or fiscal-sponsor role",
      "the number of awards or total amount disbursed",
      "the identity of applicants or private application contents",
    ],
  },
  {
    id: goFundMeSourceId,
    title: "KC Spaces Fund GoFundMe",
    organization: "KC Spaces Fund / Allied Media Projects Inc.",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-07",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund GoFundMe, launched April 2020.",
    publicNote:
      "The public page currently displays $9,590 raised against a $9,500 goal from 107 donations, identifies Kendell Harbin for Allied Media Projects Inc., and names the campaign organizers.",
    supportsGenerally: [
      "$9,590 raised against a $9,500 goal",
      "107 donations",
      "public organizer and beneficiary framing",
      "the /f/kcspacesfund identity",
    ],
    doesNotEstablish: [
      "Jamie's fundraising, organizing, grant-making, or fiscal-sponsor role",
      "how many grants were awarded or how funds were disbursed",
      "individual causality for the fundraising outcome",
    ],
  },
  {
    id: starSourceId,
    title: "How to support Kansas City artists during the coronavirus crisis",
    organization: "The Kansas City Star",
    author: "Dan Kelly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Dan Kelly, Kansas City Star, guide to supporting Kansas City artists during the coronavirus crisis, updated April 10, 2020.",
    publicNote:
      "The published guide independently listed KC Spaces Fund among ways to support artists and artisans during the COVID-19 crisis.",
    supportsGenerally: [
      "independent public recognition of KC Spaces Fund during its launch period",
    ],
    doesNotEstablish: [
      "Jamie's role",
      "audience action, fundraising conversion, or grant outcomes",
      "endorsement by every person or institution mentioned in the article",
    ],
  },
  {
    id: odditiesSourceId,
    title: "Oddities Prints MAPE mutual-aid print",
    organization: "Oddities Prints",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    preferredPublicUrl: "canonical",
    publicCitation: "Oddities Prints MAPE mutual-aid print product page.",
    publicNote:
      "The product page states that proceeds partially benefit KC Spaces Fund and KC Tenants, corroborating one fundraising collaboration routed by the Page.",
    supportsGenerally: [
      "an independent public fundraising route benefiting KC Spaces Fund",
    ],
    doesNotEstablish: [
      "the historical Page route or all fundraising collaborations",
      "sales, donation totals, conversion, or Jamie's role",
    ],
  },
  {
    id: gitReviewSourceId,
    title: "AI-assisted review of KC Spaces Fund campaign repositories",
    author: "Codex archival review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "AI-assisted archival review of Jamie Burkart's KC Spaces Fund project repositories, July 2026.",
    publicNote:
      "The review found Jamie-authored launch-period history for the Ghost campaign site, custom campaign theme, deployment work, and GoFundMe widget. It is archival evidence, not a human collaborator testimonial.",
    protectedLocatorId: "ARCHIVE-KCSPACESFUND-LOCAL-GIT-2026-001",
    supportsGenerally: [
      "Jamie's launch-period web implementation and maintenance work",
      "the Ghost site, campaign-theme, deployment, and fundraising-widget stack",
    ],
    doesNotEstablish: [
      "public organizer, fundraiser-owner, grant-decision, or fiscal-sponsor status",
      "authorship of Facebook posts",
      "sole ownership of collective strategy, content, or outcomes",
    ],
  },
  {
    id: roleMemorySourceId,
    title: "Jamie Burkart first-person KC Spaces Fund role recollection",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person KC Spaces Fund role recollection recorded for archival research, July 2026.",
    publicNote:
      "Jamie recalls supporting selection of a name available consistently across public platforms and domains and states that he was not the stakeholder or owner posting to the Facebook Page.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-ROLE-MEMORY-2026-001",
    supportsGenerally: [
      "Jamie's first-person account of naming support",
      "Jamie's boundary against claiming Facebook posting or account ownership",
    ],
    doesNotEstablish: [
      "who selected the final name or opened each account",
      "record-level Facebook publisher identity",
      "organizer, fundraiser-owner, grant-decision, or fiscal-sponsor status",
    ],
  },
] satisfies SourceRecord[];

export const kcSpacesFundFacebookPostObservations = [
  {
    id: "OBS-KCSPACESFUND-FB-RESEARCH-METHOD",
    sourceId: researchSourceId,
    project: projectId,
    statement:
      "Three terminal traversals recovered 40, 38, and 40 deduplicated public cards; the final slower pass reproduced 40, and the same 21 stable media identities appeared in all three.",
    observationType: "metadata",
    locator: "Protected traversal logs and cross-pass identity comparison",
    confidence: "high",
    limitations: [
      "Non-media cards lacked durable public permalinks and therefore retain positional identities.",
      "The review is not a native Meta export or deletion history.",
    ],
    supportsClaimIds: [populationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-FB-POPULATION",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "The public ledger contains 40 dispositions: 20 media-backed and 20 non-media records, with 19 content-materialized, 15 metadata-depth, and six unavailable-attachment records.",
    observationType: "metadata",
    locator: "completeness; aggregate; records",
    confidence: "high",
    limitations: [
      "The ledger describes the surviving public Page surface on July 15, 2026.",
      "Deleted, private, unrendered, and owner-export-only records may still be missing.",
    ],
    supportsClaimIds: [populationClaimId, operatingCycleClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-FB-RELIEF-CYCLE",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "The ledger classifies eight application-routing records, 13 fundraising records, ten funded-space spotlights, and additional community-resource and partner-amplification records.",
    observationType: "attributed",
    locator: "aggregate; records[].missionModes",
    confidence: "high",
    limitations: [
      "Mission modes are archival classifications rather than Facebook-authored categories.",
      "Overlapping modes cannot be added into a unique-record total.",
    ],
    supportsClaimIds: [operatingCycleClaimId, outcomeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-FB-FUNDED-SPACES",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "Ten Page records publicly name funded-space spotlights: Vulpes Bastille, SWAN, Kansas City Textile Arts Center, Parker 2, Farewell Transmission, One Mic Stand, Blackbox on Troost, GetWoke, UN/TUCK Queer & Trans Collective, and Latino Foundation for the Arts.",
    observationType: "explicit",
    locator: "records[].spotlightSubject",
    confidence: "high",
    limitations: [
      "The ten spotlights are Page records, not a verified complete grantee population.",
      "The ledger does not publish applicant records, award amounts, or disbursement files.",
    ],
    supportsClaimIds: [outcomeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-FB-INTERACTION-SNAPSHOT",
    sourceId: ledgerSourceId,
    project: projectId,
    statement:
      "Twenty-eight records display at least one reaction signal, producing a mutable visible floor of 119; four records expose a current comment relationship, including three from cultural-space accounts.",
    observationType: "metadata",
    locator: "aggregate; records[].visibleReactionSignals; records[].visibleCommentRelation",
    confidence: "high",
    limitations: [
      "The values are current interface signals, not historical peaks or complete analytics.",
      "They do not measure unique people, reach, stakeholder endorsement, conversion, causality, or impact.",
      "Personal commenter identities are intentionally omitted.",
    ],
    supportsClaimIds: [interactionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-PUBLIC-IDENTITY",
    sourceId: siteSourceId,
    project: projectId,
    statement:
      "The public campaign used the KC Spaces Fund identity at kcspacesfund.com, /KCSpacesFund on Facebook, @KCSpacesFund on X, @kcspacesfund on Instagram, and /f/kcspacesfund on GoFundMe.",
    observationType: "metadata",
    locator: "Campaign-site social navigation and public platform routes",
    confidence: "high",
    limitations: [
      "Uniform public availability does not identify who proposed, checked, approved, registered, or administered the name.",
      "Current route availability does not establish uninterrupted historical custody.",
    ],
    supportsClaimIds: [identityClaimId, namingMemoryClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-DIGITAL-INFRASTRUCTURE",
    sourceId: gitReviewSourceId,
    project: projectId,
    statement:
      "AI-assisted local Git review found Jamie-authored launch-period history across the Ghost campaign site, reusable campaign theme, deployment work, and a GoFundMe widget with fundraising-display controls.",
    observationType: "metadata",
    locator: "Protected local Git history review",
    confidence: "high",
    limitations: [
      "The evidence supports technical implementation and operations, not public organizing, Facebook publishing, grant decisions, or collective strategy ownership.",
      "The reviewer is an AI assistant rather than a first-hand human collaborator.",
    ],
    supportsClaimIds: [infrastructureClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCSPACESFUND-ROLE-BOUNDARY",
    sourceId: roleMemorySourceId,
    project: projectId,
    statement:
      "Jamie recalls supporting the search for a uniformly available project name and states that he was not the stakeholder or owner posting on the Facebook account.",
    observationType: "attributed",
    locator: "Jamie Burkart first-person statement, July 2026",
    confidence: "limited",
    limitations: [
      "The naming contribution remains first-person memory pending collaborator or contemporaneous-document corroboration.",
      "The statement does not identify who published individual Page records.",
    ],
    supportsClaimIds: [namingMemoryClaimId, infrastructureClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const kcSpacesFundFacebookPostClaims = [
  {
    id: populationClaimId,
    project: projectId,
    claimType: "context",
    internalClaim:
      "The currently accessible KC Spaces Fund Facebook Page materialized 40 surviving public cards after three terminal traversals; the middle pass's 38-card result is preserved as rendering variance.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCSPACESFUND-FB-RESEARCH-METHOD",
      "OBS-KCSPACESFUND-FB-POPULATION",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Three terminal traversals materialized 40, 38, and 40 surviving public cards; the final slower pass reproduced 40 and all 21 stable media identities matched across passes.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: researchSourceId,
        relationship: "direct-support",
        supports: ["traversal counts and cross-pass identity comparison"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: ledgerSourceId,
        relationship: "direct-support",
        supports: ["public-safe population and row-level dispositions"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Complete means every unique card surfaced by the currently accessible public Page timeline received a disposition.",
      "This is not a native Meta export, a deletion history, or every post ever published.",
      "Twenty non-media records lack stable public permalinks and retain positional identities.",
    ],
    antiClaims: [
      "The ledger is the complete historical Meta archive",
      "KC Spaces Fund published only 40 Facebook posts",
    ],
    researchTaskIds: ["RT-KCSPACESFUND-FB-OWNER-EXPORT"],
    researchInquiryIds: ["INQ-KCSPACESFUND-FB-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "population-boundary review"],
  },
  {
    id: operatingCycleClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "The surviving Page record operationalized a mutual-aid relief cycle through application guidance and deadlines, fundraising routes, funded-space spotlights, community resources, partner amplification, and campaign-site routing.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCSPACESFUND-FB-POPULATION",
      "OBS-KCSPACESFUND-FB-RELIEF-CYCLE",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The surviving Page record operationalized the relief cycle: applications and deadlines, fundraising, funded-space spotlights, community resources, and partner amplification.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: ledgerSourceId,
        relationship: "direct-support",
        supports: ["row-level mission-mode and destination classifications"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: siteSourceId,
        relationship: "corroborating",
        supports: ["public join, apply, donate, and contact system"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: applySourceId,
        relationship: "corroborating",
        supports: ["public application process and timeline"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "This is a collective project-system claim, not an attribution of Page publishing or campaign ownership to Jamie.",
      "Mission modes are archival classifications and may overlap.",
    ],
    antiClaims: [
      "Jamie authored or published the KC Spaces Fund Facebook record",
      "Facebook activity alone proves applications, donations, awards, or impact",
    ],
    researchTaskIds: ["RT-KCSPACESFUND-POSTED-SOURCE-RECOVERY"],
    researchInquiryIds: ["INQ-KCSPACESFUND-FB-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Codex source review", "collective-credit review", "Chad lens review"],
  },
  {
    id: outcomeClaimId,
    project: projectId,
    claimType: "outcome",
    internalClaim:
      "The public GoFundMe currently displays $9,590 raised against a $9,500 goal from 107 donations, while ten surviving Page records name funded-space spotlights.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCSPACESFUND-FB-RELIEF-CYCLE",
      "OBS-KCSPACESFUND-FB-FUNDED-SPACES",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The public fundraiser currently displays $9,590 raised against a $9,500 goal from 107 donations; ten surviving Page records separately name funded-space spotlights.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: goFundMeSourceId,
        relationship: "direct-support",
        supports: ["fundraising total, goal, donation count, and organizer framing"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: ledgerSourceId,
        relationship: "direct-support",
        supports: ["ten named public funded-space spotlight records"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Fundraising figures belong to the collective campaign and its named organizer and fiscal-sponsor context, not to Jamie individually.",
      "Ten Page spotlights are not proof of the complete grantee population or exact disbursement total.",
    ],
    antiClaims: [
      "Jamie raised $9,590",
      "KC Spaces Fund awarded exactly ten grants",
      "Facebook spotlights prove grant amounts or complete disbursement",
    ],
    researchTaskIds: ["RT-KCSPACESFUND-FB-OWNER-EXPORT"],
    researchInquiryIds: ["INQ-KCSPACESFUND-FB-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Codex source review", "collective-credit review"],
  },
  {
    id: interactionClaimId,
    project: projectId,
    claimType: "scale",
    internalClaim:
      "Twenty-eight surviving records display at least one reaction signal, producing a mutable visible floor of 119; four display a current comment relationship, including three cultural-space accounts.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-KCSPACESFUND-FB-INTERACTION-SNAPSHOT"],
    projections: [
      {
        key: "archive-note",
        text:
          "At capture, 28 records retained visible reaction signals and four retained a comment relationship; these are mutable interface observations, not audience or impact measures.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: ledgerSourceId,
        relationship: "direct-support",
        supports: ["anonymous record-level signal counts and relationship categories"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The 119-unit value is a mutable visible floor, not unique people or historical peak engagement.",
      "A visible cultural-space account comment does not establish endorsement, partnership, conversion, attendance, causality, or impact.",
      "Personal commenter and reaction identities remain unpublished.",
    ],
    antiClaims: [
      "The Page reached 119 people",
      "Cultural-space accounts endorsed KC Spaces Fund",
      "Visible Facebook interactions measure campaign impact",
    ],
    researchTaskIds: ["RT-KCSPACESFUND-FB-OWNER-EXPORT"],
    researchInquiryIds: ["INQ-KCSPACESFUND-FB-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "metric-boundary review"],
  },
  {
    id: identityClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "KC Spaces Fund used a consistent public identity across its domain, Facebook, X, Instagram, and GoFundMe route.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-KCSPACESFUND-PUBLIC-IDENTITY"],
    projections: [
      {
        key: "archive-note",
        text:
          "The project used the KC Spaces Fund identity consistently across its domain, Facebook, X, Instagram, and GoFundMe route.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"],
      },
    ],
    evidence: [
      {
        sourceId: siteSourceId,
        relationship: "direct-support",
        supports: ["the campaign domain and linked social identities"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: goFundMeSourceId,
        relationship: "corroborating",
        supports: ["the matching public fundraiser slug"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: pageSourceId,
        relationship: "corroborating",
        supports: ["the matching Facebook Page identity"],
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
    researchTaskIds: ["RT-KCSPACESFUND-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Codex source review", "attribution-boundary review"],
  },
  {
    id: infrastructureClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure by building and maintaining the Ghost campaign site, customizing a reusable campaign theme, supporting deployment, and implementing fundraising-display controls.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCSPACESFUND-DIGITAL-INFRASTRUCTURE",
      "OBS-KCSPACESFUND-ROLE-BOUNDARY",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie supported KC Spaces Fund as behind-the-scenes digital infrastructure, building and maintaining its Ghost site, reusable campaign theme, deployment path, and fundraising-display controls.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md",
          "docs/knowledge-bank/proofs.md",
        ],
      },
    ],
    evidence: [
      {
        sourceId: gitReviewSourceId,
        relationship: "direct-support",
        supports: ["Jamie-authored launch-period site, theme, deployment, and widget work"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: siteSourceId,
        relationship: "corroborating",
        supports: ["the resulting public campaign site and action routes"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: roleMemorySourceId,
        relationship: "supports-boundary",
        supports: ["Jamie's boundary against claiming Facebook posting or account ownership"],
        confidence: "limited",
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
    researchTaskIds: ["RT-KCSPACESFUND-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "collective-credit review", "Jamie review"],
  },
  {
    id: namingMemoryClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie recalls supporting selection of a KC Spaces Fund name that was available uniformly across social platforms and domain names.",
    epistemicState: "unreviewed",
    publicationState: "restricted",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: [
      "OBS-KCSPACESFUND-PUBLIC-IDENTITY",
      "OBS-KCSPACESFUND-ROLE-BOUNDARY",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie recalls supporting the search for a uniformly available project name; collaborator or contemporaneous-source corroboration is required before public role projection.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: roleMemorySourceId,
        relationship: "private-support",
        supports: ["Jamie's first-person naming-support recollection"],
        confidence: "limited",
        renderCitation: false,
      },
      {
        sourceId: siteSourceId,
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
    researchTaskIds: ["RT-KCSPACESFUND-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-KCSPACESFUND-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Codex archival review", "attribution-boundary review"],
  },
] satisfies ClaimRecord[];

export const kcSpacesFundFacebookPostResearchTasks = [
  {
    id: "RT-KCSPACESFUND-FB-OWNER-EXPORT",
    project: projectId,
    question:
      "Can a stakeholder-authorized Meta export reconcile the surviving 40-card Page surface with deleted, hidden, unrendered, and owner-only records while preserving publisher and participant privacy?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    sourceIds: [pageSourceId, researchSourceId, ledgerSourceId],
    claimIds: [populationClaimId, outcomeClaimId, interactionClaimId],
    successCriteria: [
      "Obtain stakeholder authorization before requesting or inspecting an owner export.",
      "Reconcile stable IDs, dates, availability states, and publisher fields without overwriting the surviving-public denominator.",
      "Keep personal identities, messages, authentication data, applicant records, and donor records outside the public repository.",
    ],
    nextActions: [
      "Ask a project stakeholder whether an owner export exists and whether a public-safe archival review is welcome.",
      "Version any denominator correction and retain the July 2026 ledger as a fixed historical observation.",
    ],
    publicNote:
      "The 40-card surviving public surface is fully dispositioned; native-export and deletion-history completeness remain open.",
    owner: "Jamie Burkart / project stakeholder",
    reviewedAt,
  },
  {
    id: "RT-KCSPACESFUND-ROLE-CORROBORATION",
    project: projectId,
    question:
      "What collaborator or contemporaneous evidence can refine Jamie's digital-operations and naming-support role without assigning him Page publishing or public organizer credit?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    sourceIds: [gitReviewSourceId, roleMemorySourceId, siteSourceId],
    claimIds: [identityClaimId, infrastructureClaimId, namingMemoryClaimId],
    successCriteria: [
      "Obtain a collaborator proof note or public-safe contemporaneous record distinguishing website, naming, account-opening, posting, and organizer responsibilities.",
      "Preserve named organizer and collective project credit.",
      "Promote only wording supported independently of current account access or the visual uniformity of handles.",
    ],
    nextActions: [
      "Invite Caitlin Horsmon, Jordan Carr, Kendell Harbin, Megan Pobywajlo, or another informed collaborator to review the bounded role note.",
      "Search contemporaneous domain-search, launch-checklist, and account-opening records for public-safe role evidence.",
    ],
    publicNote:
      "Jamie's technical implementation is strongly supported by local Git history; naming support remains a first-person research claim.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-KCSPACESFUND-POSTED-SOURCE-RECOVERY",
    project: projectId,
    question:
      "Can the historical Do816, Trans Women of Color Collective, and Oddities Prints routes previewed by the Page be recovered and close-read as stable public sources?",
    priority: "medium",
    status: "in-progress",
    captureIds: ["CAP-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    sourceIds: [ledgerSourceId, odditiesSourceId, starSourceId],
    claimIds: [operatingCycleClaimId],
    successCriteria: [
      "Recover canonical or archived URLs with title, publisher, date, and preservation state.",
      "Decompose only propositions supported by close reading.",
      "Keep source circulation separate from authorship, endorsement, partnership, conversion, and outcome.",
    ],
    nextActions: [
      "Search web indexes and the Wayback Machine for The Daily DoGood: Kansas City and the historical Oddities mutual-aid route.",
      "Confirm the exact Trans Women of Color Collective resource before storing a public URL.",
    ],
    publicNote:
      "The Page preserves three source leads whose exact historical destinations remain incomplete or preview-only.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const kcSpacesFundFacebookPostInquiries = [
  {
    id: "INQ-KCSPACESFUND-FB-POPULATION-2026",
    project: projectId,
    question:
      "What is the full population of surviving public KC Spaces Fund Facebook Page cards accessible in July 2026?",
    methods: [
      "Traverse the Page timeline to repeated terminal no-growth states at three scroll cadences.",
      "Deduplicate within each traversal and compare stable media identities across passes.",
      "Assign a public-safe disposition to each recovered card and retain interface limits.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Two traversals recovered 40 cards and one faster pass recovered 38.",
      "The final slower pass reproduced 40 cards.",
      "All 21 stable media identities matched across all three traversals.",
      "Twenty non-media cards lack durable public permalinks and retain positional identities.",
    ],
    limitations: [
      "Deleted, private, unrendered, and owner-export-only history is not represented.",
      "The Page interface did not expose reliable historic publisher metadata.",
    ],
    sourceIds: [researchSourceId, ledgerSourceId],
    publicSummary:
      "Every card materialized by the current public Page surface received a disposition; native-export and deletion-history completeness remain unresolved.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-FACEBOOK-POSTS-2026-001",
  },
  {
    id: "INQ-KCSPACESFUND-FB-SOURCES-2026",
    project: projectId,
    question:
      "What mission-relevant sources and defensible project claims can the full surviving Page population route into the knowledge bank?",
    methods: [
      "Classify each record by mission mode and public destination.",
      "Close-read the campaign site, application guidance, GoFundMe, independent press, and one fundraising collaborator source.",
      "Separate circulation, collective outcome, and individual role claims.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The Page documents an application, fundraising, spotlight, resource, and amplification cycle.",
      "The public fundraiser currently displays $9,590 raised against a $9,500 goal from 107 donations.",
      "Ten Page records publicly name funded-space spotlights.",
      "The Kansas City Star independently listed the fund during its launch period, and Oddities Prints corroborates one fundraising collaboration.",
    ],
    limitations: [
      "Three previewed or historical routes remain incomplete.",
      "The Page does not establish the complete grantee population, disbursement accounting, or individual causality.",
    ],
    sourceIds: [ledgerSourceId, siteSourceId, applySourceId, goFundMeSourceId, starSourceId, odditiesSourceId],
    publicSummary:
      "The surviving Page record preserves the campaign's public relief cycle and routes into stronger campaign, fundraiser, press, and partner sources.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-FACEBOOK-SOURCES-2026-001",
  },
  {
    id: "INQ-KCSPACESFUND-ROLE-2026",
    project: projectId,
    question:
      "What can the record safely establish about Jamie's digital operations, naming support, and relationship to the Facebook account?",
    methods: [
      "Review public project routes and protected local Git history.",
      "Record Jamie's first-person memory separately from independently corroborated evidence.",
      "Test every role claim against named organizer, publisher, fundraiser, grant-decision, and fiscal-sponsor boundaries.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Local Git history strongly supports Jamie's site, theme, deployment, and fundraising-widget implementation.",
      "Public routes establish a uniform KC Spaces Fund identity across the domain and platforms.",
      "Jamie's naming-support account remains first-person memory pending corroboration.",
      "No reviewed source assigns Jamie the Facebook posts, account ownership, public organizer role, grant decisions, or fiscal-sponsor role.",
    ],
    limitations: [
      "A collaborator proof note or contemporaneous role record has not yet been recovered.",
      "Current account or route state cannot establish historical publisher identity.",
    ],
    sourceIds: [siteSourceId, goFundMeSourceId, gitReviewSourceId, roleMemorySourceId],
    publicSummary:
      "Jamie has a defensible behind-the-scenes digital-infrastructure claim; naming support remains a restricted research claim, and Facebook publishing remains unassigned.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-ROLE-2026-001",
  },
] satisfies ResearchInquiry[];

export const kcSpacesFundFacebookPostReviewSummary = {
  records: 40,
  traversalCounts: [40, 38, 40],
  stableMediaIds: 21,
  fundedSpaceSpotlights: 10,
  applicationRoutingRecords: 8,
  fundraisingRecords: 13,
  recordsWithVisibleReactionSignals: 28,
  visibleReactionSignalFloor: 119,
  publisherAttribution: "unresolved",
  namingRole: "first-person-memory-pending-corroboration",
  websiteUpdate: "not-required",
  reviewedAt,
} as const;
