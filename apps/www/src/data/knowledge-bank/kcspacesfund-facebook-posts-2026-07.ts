import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const kcSpacesFundFacebookPostSourceIds = {
  census: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
  report: "SRC-KCSPACES-FACEBOOK-POST-REPORT-2026",
  page: "SRC-KCSPACES-FACEBOOK-PAGE",
  protectedRun: "SRC-KCSPACES-FACEBOOK-PROTECTED-RUN-2026",
  campaignSite: "SRC-KCSPACES-CAMPAIGN-SITE-2020",
  goFundMe: "SRC-KCSPACES-GOFUNDME-2020",
  roleClarification: "SRC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026",
  digitalArchive: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
  kansasCityStar: "SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10",
  odditiesPrint: "SRC-KCSPACES-ODDITIES-KAIJU-PRINT-2020",
  do816: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
  twocc: "SRC-KCSPACES-TWOCC-DONATION-RESOURCE-2020"
} as const;

export const kcSpacesFundFacebookPostClaimIds = {
  survivingPopulation: "CLM-KCSPACES-FACEBOOK-SURVIVING-POPULATION",
  campaignRouting: "CLM-KCSPACES-FACEBOOK-MUTUAL-AID-ROUTING",
  digitalSupport: "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT",
  interactionSignals: "CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS",
  independentRecognition: "CLM-KCSPACES-INDEPENDENT-COVID-RESOURCE-RECOGNITION"
} as const;

export const kcSpacesFundFacebookPostReviewSummary = {
  survivingPublicRecords: 40,
  terminalTraversalCounts: [40, 38, 40],
  terminalNoAdditionPasses: [18, 18, 24],
  captureDateRecheckTraversalCounts: [38, 39],
  captureDateRecheckNoAdditionPasses: [24, 24],
  stableMediaIds: 21,
  dateRange: { earliest: "2020-04-07", latest: "2020-07-09" },
  mediaBackedRecords: 20,
  nonMediaRecords: 20,
  contentMaterializedRecords: 20,
  metadataDepthRecords: 14,
  unavailableAttachmentRecords: 6,
  fundedSpaceSpotlights: 11,
  applicationRoutingRecords: 8,
  fundraisingRecords: 14,
  recordsWithVisibleReactionSignals: 28,
  visibleReactionSignalFloor: 119,
  recordsWithVisibleCommentRelations: 4,
  culturalSpaceAccountCommentRelations: 3,
  exactPublicRoutes: 8,
  previewOnlyOrUnrecoveredRoutes: 0,
  postedSourceArticlesRecovered: 1,
  profileFollowersAtCapture: 108,
  profileFollowingAtCapture: 1
} as const;

const sourceIds = kcSpacesFundFacebookPostSourceIds;
const claimIds = kcSpacesFundFacebookPostClaimIds;
const intakeId = "INTAKE-2026-07-15-KCSPACES-FACEBOOK-POST-FULL-POPULATION";

const observationIds = [
  "OBS-KCSPACES-FACEBOOK-POST-POPULATION",
  "OBS-KCSPACES-FACEBOOK-POST-RECOVERY-STATES",
  "OBS-KCSPACES-FACEBOOK-MISSION-SEQUENCE",
  "OBS-KCSPACES-FACEBOOK-ROUTE-INVENTORY",
  "OBS-KCSPACES-FACEBOOK-DISPLAYED-REACTIONS",
  "OBS-KCSPACES-FACEBOOK-COMMENT-RELATIONS",
  "OBS-KCSPACES-FACEBOOK-PROFILE-IDENTITY",
  "OBS-KCSPACES-GOFUNDME-PUBLIC-OUTCOME",
  "OBS-KCSPACES-KANSAS-CITY-STAR-RESOURCE-LISTING",
  "OBS-KCSPACES-ODDITIES-PRINT-BENEFIT",
  "OBS-KCSPACES-DO816-POSTED-ARTICLE",
  "OBS-KCSPACES-TWOCC-FUNDED-ROUTE",
  "OBS-KCSPACES-JAMIE-ROLE-BOUNDARY"
] as const;

const researchInquiryIds = [
  "INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT",
  "INQ-KCSPACES-FACEBOOK-STEWARDSHIP",
  "INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"
] as const;

export const kcSpacesFundFacebookPostIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "KC Spaces Fund Facebook post full-population archival production",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated public-safe archival review",
    reason:
      "Authenticated full-population archival production across every surviving public record exposed by the KC Spaces Fund Facebook Page, with public-safe dispositions for mission routing, source routes, displayed interaction signals, collective credit, and Jamie's bounded digital-operations role.",
    projectIds: ["kc-spaces-fund"],
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: Object.values(sourceIds),
    observationIds: [...observationIds],
    researchInquiryIds: [...researchInquiryIds],
    boundaries: [
      "Request a native Meta Page-owner export and reconcile publication dates, deleted or hidden history, durable post identities, and publishing metadata without publishing private records.",
      "Invite Caitlin Horsmon, Jordan Carr, Kendell Harbin, Megan Pobywajlo, and other collaborators to clarify account creation, naming, identity design, publishing, moderation, and campaign operations.",
      "Preserve the recovered Do816 article route and its Page preview while direct live retrieval remains blocked.",
      "Keep raw post bodies, personal commenter and reaction identities, private analytics, authenticated state, applicant or grantee files, donor data, and Page-management records outside the public repository."
    ]
  }
];

const observation = (
  id: (typeof observationIds)[number],
  sourceId: string,
  text: string,
  locator: string,
  status: "captured" | "corroborated" | "verified",
  linkedClaimIds: string[],
  linkedInquiryIds: string[],
  kind: "source-fact" | "bounded-inference" | "participant-memory" = "source-fact"
): KnowledgeBank["observations"][number] => ({
  id,
  intakeId,
  sourceId,
  comparisonSourceIds: [],
  project: "kc-spaces-fund",
  kind,
  text,
  locator,
  status,
  publicSafe: true,
  claimIds: linkedClaimIds,
  researchInquiryIds: linkedInquiryIds,
  limitations: []
});

export const kcSpacesFundFacebookPostObservations: KnowledgeBank["observations"] = [
  observation(
    "OBS-KCSPACES-FACEBOOK-POST-POPULATION",
    sourceIds.census,
    "Three authenticated terminal traversals recovered 40, 38, and 40 Page records. The final slower traversal reproduced 40 after 24 no-addition passes; the same 21 public media IDs appeared across all three traversals. Two later verification traversals recovered 38 and 39 records after 24 no-addition passes while again reproducing all 21 media IDs. The canonical 40-row union accounts for every surviving public record exposed by the capture-date research, while the recheck documents Facebook's unstable progressive rendering rather than silently lowering the denominator. Deleted, private, unrendered, or owner-export-only history remains outside the claim.",
    "completeness, dateRange, and records",
    "verified",
    [claimIds.survivingPopulation],
    ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"]
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-POST-RECOVERY-STATES",
    sourceIds.census,
    "The 40-row ledger contains 20 media-backed and 20 non-media records. Twenty records retain enough public material for content classification, 14 retain metadata-level depth, and six retain an unavailable-attachment disposition. A remnant is preserved as a remnant rather than converted into a recovered message or a claim that no message existed.",
    "aggregate and records[].recoveryState",
    "verified",
    [claimIds.survivingPopulation, claimIds.campaignRouting],
    ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"]
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-MISSION-SEQUENCE",
    sourceIds.census,
    "Overlapping record classifications identify 11 funded-space spotlights, eight application-routing records, and 14 fundraising records. The named spotlights are Vulpes Bastille, SWAN, Kansas City Textile Arts Center, Parker 2, Farewell Transmission, One Mic Stand, Blackbox on Troost, GetWoke: Queer and Trans People of Color, UN/TUCK Queer & Trans Collective, Latino Foundation for the Arts, and Trans Women of Color Collective.",
    "aggregate, records[].missionModes, and records[].spotlightSubject",
    "verified",
    [claimIds.campaignRouting],
    []
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-ROUTE-INVENTORY",
    sourceIds.census,
    "The surviving population preserves eight exact destination routes: the campaign site, application guidance, GoFundMe, Oddities Prints' mutual-aid fundraiser and Facebook Page, Farewell Transmission's Facebook Page, Trans Women of Color Collective's donation resource, and Do816's 'The Daily DoGood: Kansas City.' The latter is one Page-posted source-article route; its preview and exact destination are preserved even though direct live retrieval was blocked at review. A posted route documents distribution, not endorsement, partnership, readership, conversion, or impact.",
    "routeDictionary and records[].publicDestinations",
    "verified",
    [claimIds.campaignRouting],
    ["INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"]
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-DISPLAYED-REACTIONS",
    sourceIds.census,
    "At capture time Facebook displayed at least one reaction signal on 28 records, with a mutable aggregate floor of 119. These labels are not unique people, reach, impressions, attendance, conversion, endorsement, mandate, causality, or impact.",
    "aggregate and records[].visibleReactionSignals",
    "verified",
    [claimIds.interactionSignals],
    ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"]
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-COMMENT-RELATIONS",
    sourceIds.census,
    "Four records retain a public comment relationship at capture. Three relationships are classified only at the public cultural-space-account level and one as another public commenter. Personal identities and comment text are withheld, and these relationships do not establish endorsement, partnership, grant receipt, or campaign impact.",
    "aggregate and records[].visibleCommentRelation",
    "verified",
    [claimIds.interactionSignals],
    ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"]
  ),
  observation(
    "OBS-KCSPACES-FACEBOOK-PROFILE-IDENTITY",
    sourceIds.page,
    "The Page displayed the name KC Spaces Fund, the handle @kcspacesfund, the mission line 'Supporting Grassroots Arts & Culture Spaces During COVID-19,' 108 followers, one following, and a GoFundMe route at capture. The campaign domain and fundraiser use the same project string; follower and following counts are mutable current profile labels.",
    "Public Page profile header and About surface",
    "verified",
    [claimIds.digitalSupport],
    ["INQ-KCSPACES-FACEBOOK-STEWARDSHIP"]
  ),
  observation(
    "OBS-KCSPACES-GOFUNDME-PUBLIC-OUTCOME",
    sourceIds.goFundMe,
    "The public GoFundMe displays $9,590 raised against a $9,500 goal from 107 donations. It describes emergency grants up to $500, names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as organizers, and identifies Allied Media Projects as fiscal sponsor. These public totals do not establish Jamie's role in fundraising, grant decisions, or disbursement.",
    "Campaign header, organizer description, and campaign body",
    "verified",
    [claimIds.campaignRouting],
    []
  ),
  observation(
    "OBS-KCSPACES-KANSAS-CITY-STAR-RESOURCE-LISTING",
    sourceIds.kansasCityStar,
    "A contemporaneous Kansas City Star service article listed KC Spaces Fund and its website under ways to support artists and artisans during the COVID-19 crisis. This is independent recognition of the campaign as a public support resource, not evidence of Jamie's role, the Page's reach, or campaign causation.",
    "Section listing support for artists and artisans",
    "verified",
    [claimIds.independentRecognition],
    []
  ),
  observation(
    "OBS-KCSPACES-ODDITIES-PRINT-BENEFIT",
    sourceIds.odditiesPrint,
    "An Oddities Prints product page states that proceeds from a Frank Norton print partially benefited KC Spaces Fund and KC Tenants. This corroborates the population's mutual-aid print-fundraising route, but does not establish proceeds raised, a formal partnership structure, or Jamie's role.",
    "Product description",
    "verified",
    [claimIds.campaignRouting, claimIds.independentRecognition],
    ["INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"]
  ),
  observation(
    "OBS-KCSPACES-DO816-POSTED-ARTICLE",
    sourceIds.do816,
    "The Page thanked Do816 and shared an exact route titled 'The Daily DoGood: Kansas City,' whose visible preview framed KC community arts spaces and a new nonprofit support response. The route and Page preview establish article circulation and issue framing; direct live retrieval was blocked during review, so they do not establish the complete article body, endorsement, readership, reach, or Jamie's role.",
    "Authenticated Page record and recovered exact destination route",
    "verified",
    [claimIds.campaignRouting, claimIds.independentRecognition],
    ["INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"]
  ),
  observation(
    "OBS-KCSPACES-TWOCC-FUNDED-ROUTE",
    sourceIds.twocc,
    "A surviving Page record says another Emergency Relief Grant was on its way to Trans Women of Color Collective and routes readers to the collective's donation resource. This supports an eleventh public recipient spotlight and a campaign fundraising route, not grant-selection authority, grant amount, payment documentation, formal partnership terms, or Jamie's role.",
    "Authenticated Page record and recovered exact destination route",
    "verified",
    [claimIds.campaignRouting],
    []
  ),
  observation(
    "OBS-KCSPACES-JAMIE-ROLE-BOUNDARY",
    sourceIds.roleClarification,
    "Jamie recalls supporting website creation and the choice of a project name available consistently across domain and social surfaces. He explicitly states that he was not the stakeholder or owner posting on the Facebook account. The protected code and project archive independently support his website and infrastructure contribution; collaborator confirmation remains appropriate for naming-process detail.",
    "Jamie's July 15, 2026 role clarification compared with the protected digital-infrastructure review",
    "corroborated",
    [claimIds.digitalSupport],
    ["INQ-KCSPACES-FACEBOOK-STEWARDSHIP"],
    "bounded-inference"
  )
];

export const kcSpacesFundFacebookPostSources: KnowledgeBank["sources"] = [
  {
    id: sourceIds.census,
    title: "KC Spaces Fund Facebook post full-population public-safe census",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/kcspacesfund-facebook-posts-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation: "KC Spaces Fund Facebook post full-population public-safe census, July 15, 2026.",
    publicNote: "A 40-row sanitized ledger preserving record order, public media locators, bounded recovery states, mission modes, destination families, named funded-space spotlights, and aggregate interaction signals without raw bodies or personal social-graph identities.",
    supportsGenerally: [
      "40 surviving public Page records",
      "three terminal-traversal reconciliation",
      "April 7 through July 9, 2020 endpoint range",
      "record recovery states",
      "11 funded-space spotlights",
      "application and fundraising routing",
      "aggregate displayed reaction and comment-relation signals"
    ],
    doesNotEstablish: [
      "complete lifetime Page history",
      "a native Meta export or deletion history",
      "human post authorship",
      "reach, endorsement, conversion, partnership, causality, or impact"
    ]
  },
  {
    id: sourceIds.report,
    title: "KC Spaces Fund Facebook post archival-production report",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund Facebook post archival-production report, July 15, 2026.",
    publicNote: "Documents population reconciliation, public routes, mission and interaction patterns, independent sources, collective credit, and publication decisions.",
    supportsGenerally: ["capture method", "population boundary", "privacy and credit boundaries", "source roles", "projection decision"],
    doesNotEstablish: ["a native Meta export", "post-level authorship", "complete deleted-post recovery", "private campaign operations"]
  },
  {
    id: sourceIds.page,
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund Facebook Page, accessed July 15, 2026.",
    publicNote: "The Page supplies the public project name, handle, mission line, current follower display, fundraiser route, and surviving feed surface.",
    supportsGenerally: ["public Page identity", "mission line", "108-follower and one-following capture labels", "public GoFundMe route"],
    doesNotEstablish: ["which human published a post", "that Jamie managed or posted from the Page", "who originated the campaign name", "historical reach or impact"]
  },
  {
    id: sourceIds.protectedRun,
    title: "Authenticated KC Spaces Fund Facebook research capture",
    author: "Codex authenticated public-safe archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation: "Authenticated archival-production review of the KC Spaces Fund Facebook surface, July 15, 2026.",
    publicNote: "Protected working captures preserve terminal-scroll reconciliation and source inspection; raw bodies, identities, private analytics, authenticated state, and Page-management data remain outside the public repository.",
    protectedLocatorId: "LOC-KCSPACES-FACEBOOK-POST-RESEARCH-2026",
    supportsGenerally: ["three terminal traversals", "post-body verification", "route and interaction inspection"],
    doesNotEstablish: ["permission to publish protected contents", "a native Meta export", "historical human publisher identity"]
  },
  {
    id: sourceIds.campaignSite,
    title: "KC Spaces Fund campaign site",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kcspacesfund.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund campaign site, accessed July 15, 2026.",
    publicNote: "The site describes a coalition supporting grassroots arts and culture spaces during COVID-19 and preserves donate, join, apply, and contact routes.",
    supportsGenerally: ["campaign mission", "public action routes", "grant application guidance", "consistent campaign identity"],
    doesNotEstablish: ["Jamie's individual role without archive evidence", "complete grant outcomes", "current program operation", "individual Page-post authorship"]
  },
  {
    id: sourceIds.goFundMe,
    title: "KC Spaces Fund GoFundMe campaign",
    organization: "KC Spaces Fund and Allied Media Projects",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-07",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund GoFundMe campaign, created April 7, 2020, accessed July 15, 2026.",
    publicNote: "The public campaign displays $9,590 raised against a $9,500 goal from 107 donations, names four organizers, and identifies Allied Media Projects as fiscal sponsor.",
    supportsGenerally: ["public fundraising total", "donation count", "emergency-grant framing", "named organizer credit", "fiscal sponsorship", "consistent campaign identity"],
    doesNotEstablish: ["Jamie's ownership or operation of the fundraiser", "Jamie's role in grant decisions or disbursement", "sole naming authorship", "Facebook Page-post authorship"]
  },
  {
    id: sourceIds.roleClarification,
    title: "Jamie Burkart KC Spaces Fund role clarification",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation: "Jamie Burkart firsthand role clarification supplied during July 2026 archival review.",
    publicNote: "Jamie recalls supporting website creation and cross-channel project naming while explicitly disclaiming stakeholder ownership and Facebook publishing responsibility.",
    protectedLocatorId: "LOC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026",
    supportsGenerally: ["website-creation role", "cross-channel naming support", "non-posting boundary"],
    doesNotEstablish: ["sole naming authorship", "campaign ownership", "public-organizer status", "authorship of any Facebook post"]
  },
  {
    id: sourceIds.digitalArchive,
    title: "KC Spaces Fund digital-infrastructure archival review",
    author: "Codex AI-assisted archive review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-09",
    publicCitation: "Public-safe summary of a July 2026 archival review of KC Spaces Fund digital infrastructure.",
    publicNote: "The review covers a launch assignment and Git history for the Ghost site, campaign theme, and fundraising widget without publishing private project records.",
    protectedLocatorId: "LOC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
    supportsGenerally: ["Jamie's campaign-site and theme implementation", "fundraising-widget implementation", "behind-the-scenes deployment support", "domain and platform continuity"],
    doesNotEstablish: ["public-organizer or fundraiser ownership", "grant decision authority", "sole campaign naming or ownership", "permission to publish private project records"]
  },
  {
    id: sourceIds.kansasCityStar,
    title: "Your money, your blood, your time: How to help Kansas City during COVID-19 crisis",
    organization: "The Kansas City Star",
    author: "Dan Kelly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-10",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.kansascity.com/news/coronavirus/article241807581.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Dan Kelly, 'Your money, your blood, your time: How to help Kansas City during COVID-19 crisis,' The Kansas City Star, updated April 10, 2020.",
    publicNote: "The service article lists KC Spaces Fund and its site among ways to support artists and artisans.",
    supportsGenerally: ["independent contemporary recognition", "KC Spaces Fund as an artist-support resource during COVID-19", "public campaign-site route"],
    doesNotEstablish: ["coverage of Jamie", "Jamie's role", "Facebook distribution", "campaign reach, causation, or outcome"]
  },
  {
    id: sourceIds.odditiesPrint,
    title: "Frank Norton Kaiju print",
    organization: "Oddities Prints",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    preferredPublicUrl: "canonical",
    publicCitation: "Oddities Prints, 'Frank Norton Kaiju' product page, accessed July 15, 2026.",
    publicNote: "The product description says print proceeds partially benefited KC Spaces Fund and KC Tenants.",
    supportsGenerally: ["mutual-aid print fundraising context", "a public route connecting Oddities Prints and KC Spaces Fund"],
    doesNotEstablish: ["amount raised", "formal partnership terms", "Jamie's role", "Facebook Page authorship"]
  },
  {
    id: sourceIds.do816,
    title: "The Daily DoGood: Kansas City",
    organization: "Do816",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: reviewedAt,
    canonicalUrl: "https://do816.com/p/the-daily-dogood-kansas-city",
    preferredPublicUrl: "canonical",
    publicCitation: "Do816, 'The Daily DoGood: Kansas City,' posted by the KC Spaces Fund Facebook Page in 2020; exact route recovered July 15, 2026.",
    publicNote: "The authenticated Page preserves the article title, a visible issue-framing preview, and the exact destination. Direct live retrieval was blocked during review.",
    supportsGenerally: ["Page-posted source-article route", "public issue framing around Kansas City community arts spaces", "campaign distribution context"],
    doesNotEstablish: ["the complete article body", "endorsement or readership", "campaign reach or impact", "Jamie's role or Facebook Page authorship"]
  },
  {
    id: sourceIds.twocc,
    title: "Trans Women of Color Collective donation resource",
    organization: "Trans Women of Color Collective",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: reviewedAt,
    canonicalUrl: "http://twocc.us/donate",
    preferredPublicUrl: "canonical",
    publicCitation: "Trans Women of Color Collective donation resource, exact route recovered from the KC Spaces Fund Facebook Page, July 15, 2026.",
    publicNote: "The authenticated Page pairs this exact donation route with a public statement that an Emergency Relief Grant was on its way to the collective. Direct live retrieval was unavailable during review.",
    supportsGenerally: ["public recipient spotlight", "Page-posted donation route", "campaign fundraising communication"],
    doesNotEstablish: ["grant amount or payment record", "grant-selection authority", "formal partnership terms", "Jamie's role or Facebook Page authorship"]
  }
];

export const kcSpacesFundFacebookPostClaims: KnowledgeBank["claims"] = [
  {
    id: claimIds.survivingPopulation,
    project: "kc-spaces-fund",
    internalClaim: "The complete capture-date KC Spaces Fund Facebook Page population contains 40 surviving public records spanning visible endpoints from April 7 through July 9, 2020, reproduced by two of three terminal traversals.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A repeated authenticated pass accounts for 40 surviving public KC Spaces Fund Facebook records from April through July 2020.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"]
    }],
    evidence: [
      { sourceId: sourceIds.census, relationship: "direct-support", supports: ["40-row ledger", "terminal traversal counts", "stable media reconciliation", "visible endpoint range"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.report, relationship: "corroborating", supports: ["capture method", "population and privacy boundary"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Complete means every record exposed by the authenticated capture-date Page feed received a public-safe ledger row.",
      "The capture is not a native Meta export, deletion history, or proof that every historical post survives.",
      "Non-media records without durable public permalinks retain order-based identities rather than invented post IDs or dates."
    ],
    antiClaims: [
      "The ledger contains every Facebook item ever published by KC Spaces Fund.",
      "Forty records are a complete Meta owner export.",
      "Every ledger row preserves a complete readable post."
    ],
    researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.campaignRouting,
    project: "kc-spaces-fund",
    internalClaim: "The surviving Page population documents a mutual-aid operating sequence across campaign and application routes, fundraising, resource amplification, and 11 named funded-space spotlights.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The surviving Page record routes applications and fundraising and preserves 11 funded-space spotlights within a collaborator-led mutual-aid campaign.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"]
    }],
    evidence: [
      { sourceId: sourceIds.census, relationship: "direct-support", supports: ["11 spotlight rows", "eight application-routing rows", "14 fundraising rows", "eight exact destinations"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.goFundMe, relationship: "corroborating", supports: ["fundraising outcome", "emergency-grant framing", "named organizer credit", "fiscal sponsorship"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.campaignSite, relationship: "corroborating", supports: ["campaign mission", "donate, join, apply, and contact routes"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.odditiesPrint, relationship: "corroborating", supports: ["mutual-aid print benefit context"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.twocc, relationship: "direct-support", supports: ["public recipient spotlight", "donation-resource route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.do816, relationship: "direct-support", supports: ["Page-posted source-article route", "visible issue framing"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "The Page documents public communication and routing, not every campaign operation, application, grant decision, or payment.",
      "A posted route or public comment relationship does not establish readership, endorsement, formal partnership, conversion, or outcome.",
      "One source-article route was recovered from the Page population; the Page preview and exact route establish distribution, not the complete article body or its readership."
    ],
    antiClaims: [
      "The Facebook Page is a complete grant-administration record.",
      "Every linked organization endorsed or formally partnered with the campaign.",
      "One Page-posted article makes the population a comprehensive press corpus."
    ],
    researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.digitalSupport,
    project: "kc-spaces-fund",
    internalClaim: "Jamie supported KC Spaces Fund behind the scenes by building its web infrastructure and supporting the choice of an available cross-channel project identity; the collaborator-led Page, domain, and fundraiser used that identity consistently, while Jamie was not the account stakeholder or publisher.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "technical-operations",
        text: "For KC Spaces Fund, Jamie built campaign web infrastructure and supported an available cross-channel identity; collaborator-led channels used it to route applications, donations, and funded-space updates.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      },
      {
        key: "case-study",
        text: "Jamie built and maintained KC Spaces Fund's campaign web infrastructure, customized a reusable Ghost theme, implemented public action routes, and supported an available cross-channel identity. Collaborator-led channels used that identity to route applications, donations, resources, and funded-space updates.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-spaces-fund"]
      },
      {
        key: "archive-note",
        text: "Jamie's bounded role was website, digital-infrastructure, and cross-channel naming support, not Facebook publishing, public organizing, fundraising ownership, or grant decisions.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"]
      }
    ],
    evidence: [
      { sourceId: sourceIds.digitalArchive, relationship: "private-support", supports: ["campaign-site, theme, widget, deployment, and continuity work"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.roleClarification, relationship: "private-support", supports: ["cross-channel naming support", "non-posting boundary"], confidence: "moderate", renderCitation: false },
      { sourceId: sourceIds.page, relationship: "context", supports: ["public Page identity and fundraiser route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.census, relationship: "context", supports: ["consistent site, application, fundraising, and spotlight routing"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Credit Jamie with bounded web infrastructure and cross-channel naming support, not public organizing, fundraising ownership, grant decisions, or campaign voice.",
      "The public channels corroborate identity consistency; Jamie's firsthand clarification supplies the naming-support and non-posting account, pending collaborator confirmation of process detail.",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as named by the fundraiser."
    ],
    antiClaims: [
      "Jamie organized KC Spaces Fund.",
      "Jamie alone named KC Spaces Fund.",
      "Jamie managed or posted from the KC Spaces Fund Facebook Page.",
      "Jamie ran the fundraiser or made grant decisions."
    ],
    researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-STEWARDSHIP"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.interactionSignals,
    project: "kc-spaces-fund",
    internalClaim: "Twenty-eight of 40 surviving Page records retain at least one visible reaction signal, totaling a mutable capture-date floor of 119, while four records retain public comment relationships including three classified only as cultural-space accounts.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text: "Twenty-eight surviving records retain at least one visible reaction signal, with a capture-date floor of 119; four retain public comment relationships.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{ sourceId: sourceIds.census, relationship: "direct-support", supports: ["aggregate displayed reaction floor", "record-level reaction signals", "bounded comment-relation classes"], confidence: "high", renderCitation: false }],
    boundaries: [
      "The signal floor is a mutable July 15, 2026 interface value, not a historical peak.",
      "Personal identities and comment text are withheld and stakeholder-group engagement is not inferred from reaction identities.",
      "Displayed interaction signals are not unique people, reach, impressions, attendance, conversion, endorsement, mandate, causality, or impact."
    ],
    antiClaims: [
      "KC Spaces Fund reached 119 people.",
      "One hundred nineteen stakeholders endorsed the campaign.",
      "Three cultural-space comment relationships prove partnership or grant impact."
    ],
    researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.independentRecognition,
    project: "kc-spaces-fund",
    internalClaim: "The Kansas City Star independently listed KC Spaces Fund as a COVID-era artist-support resource, the Page circulated a Do816 article route about the response, and an Oddities Prints page independently preserved a product-benefit connection to the campaign.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Contemporary public sources independently identify KC Spaces Fund as an artist-support resource and preserve one mutual-aid print-benefit route.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      { sourceId: sourceIds.kansasCityStar, relationship: "direct-support", supports: ["independent contemporary listing as an artist-support resource"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.odditiesPrint, relationship: "corroborating", supports: ["public product-benefit connection"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.do816, relationship: "context", supports: ["Page-posted article route and visible issue framing"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "The Kansas City Star article lists the campaign as a resource; it is not coverage of Jamie or evidence of campaign causation.",
      "The Do816 route and Page preview establish circulation and issue framing, not the complete article body, endorsement, or readership.",
      "The product page does not establish proceeds raised or partnership terms.",
      "None of these sources establishes Jamie's Page-post authorship or individual campaign impact."
    ],
    antiClaims: [
      "The Kansas City Star profiled Jamie's KC Spaces Fund work.",
      "Oddities Prints proves a quantified fundraising outcome.",
      "Independent source recognition establishes Jamie's individual role."
    ],
    researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"],
    reviewedAt,
    reviewedBy
  }
];

export const kcSpacesFundFacebookPostResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT",
    project: "kc-spaces-fund",
    question: "Can a native Meta owner export reconcile complete lifetime history, publication dates, durable post identities, publisher metadata, and deleted or hidden states?",
    methods: [
      "Repeated authenticated public Page-feed traversal to terminal state three times.",
      "Compared record counts and stable public media IDs across traversals.",
      "Retained order-based identities for non-media remnants without durable public permalinks.",
      "Excluded private platform identities, raw bodies, personal social-graph identities, private analytics, authenticated state, and Page-management data from the public fixture."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "Two traversals recovered 40 records, a faster middle traversal recovered 38, and the final slower traversal reproduced 40.",
      "The same 21 public media IDs appeared across all three traversals.",
      "Forty surviving public records are accounted for, but native owner-export history was not recovered."
    ],
    limitations: [
      "The live Page feed can omit deleted, hidden, private, unpublished, no-longer-retained, or owner-export-only records.",
      "Non-media remnants do not expose durable public permalinks or complete individual dates.",
      "Displayed interaction labels are mutable and incomplete."
    ],
    sourceIds: [sourceIds.census, sourceIds.page, sourceIds.protectedRun],
    publicSummary: "Repeated authenticated traversal accounts for 40 surviving public records while leaving lifetime-history and publisher questions open.",
    protectedLocatorId: "LOC-KCSPACES-FACEBOOK-POST-RESEARCH-2026"
  },
  {
    id: "INQ-KCSPACES-FACEBOOK-STEWARDSHIP",
    project: "kc-spaces-fund",
    question: "How should account creation, naming, identity design, website implementation, publishing, moderation, and campaign operations be credited among collaborators?",
    methods: [
      "Compared Jamie's firsthand role clarification with the protected digital-infrastructure review.",
      "Compared public identity strings across the Page, campaign domain, and GoFundMe.",
      "Preserved named public organizer credit from the fundraiser."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Protected archive evidence supports Jamie's website and digital-infrastructure contribution.",
      "Jamie recalls supporting an available cross-channel project name and explicitly disclaims Page publishing ownership.",
      "The public Page, domain, and fundraiser use a consistent KC Spaces Fund identity.",
      "The fundraiser names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as organizers."
    ],
    limitations: [
      "The public channels do not identify who proposed, approved, registered, or published each element.",
      "Jamie's naming-process memory should be corroborated before expanding beyond support language.",
      "Current authenticated access would establish present custody only, not historical publishing authorship."
    ],
    sourceIds: [sourceIds.roleClarification, sourceIds.digitalArchive, sourceIds.page, sourceIds.campaignSite, sourceIds.goFundMe],
    publicSummary: "The defensible current credit is Jamie's bounded web-infrastructure and cross-channel naming support within a collaborator-led campaign.",
    protectedLocatorId: "LOC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026"
  },
  {
    id: "INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION",
    project: "kc-spaces-fund",
    question: "Which campaign routes and independent sources can be preserved and closely read without turning distribution into endorsement or outcome evidence?",
    methods: [
      "Dispositioned every destination family exposed by the 40-row public ledger.",
      "Opened the campaign site, application route, fundraiser, Facebook destination Pages, and recoverable independent sources.",
      "Searched for contemporary independent reporting while keeping sources not posted by the Page distinct from posted routes."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All eight public destination families now retain exact routes; the previously incomplete Oddities, Trans Women of Color Collective, and Do816 destinations were recovered in a slower authenticated recheck.",
      "The Page posted one recovered source-article route, Do816's 'The Daily DoGood: Kansas City.'",
      "A Kansas City Star service article independently listed KC Spaces Fund as an artist-support resource.",
      "An Oddities Prints page independently preserves a product-benefit connection to KC Spaces Fund and KC Tenants."
    ],
    limitations: [
      "The Do816 article body and Trans Women of Color Collective resource were not directly retrievable during review; the exact routes and Page context remain preserved.",
      "The independent Kansas City Star article was discovered separately and must not be described as Page-posted.",
      "Posted or linked material does not establish endorsement, formal partnership, conversion, proceeds, causation, or impact."
    ],
    sourceIds: [sourceIds.census, sourceIds.campaignSite, sourceIds.goFundMe, sourceIds.kansasCityStar, sourceIds.odditiesPrint, sourceIds.do816, sourceIds.twocc],
    publicSummary: "The Page is primarily an action and mutual-aid routing record, with one recovered posted article route and separately governed independent contemporary context."
  }
];

export const kcSpacesFundFacebookPostKnowledge = {
  intakeItems: kcSpacesFundFacebookPostIntakeItems,
  observations: kcSpacesFundFacebookPostObservations,
  sources: kcSpacesFundFacebookPostSources,
  claims: kcSpacesFundFacebookPostClaims,
  researchInquiries: kcSpacesFundFacebookPostResearchInquiries
};
