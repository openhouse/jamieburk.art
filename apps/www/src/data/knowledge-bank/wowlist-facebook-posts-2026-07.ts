const reviewedAt = "2026-07-15";

export const wowListFacebookPostClaimIds = {
  operatingRecord: "CLM-WOWLIST-FACEBOOK-PUBLIC-OPERATING-RECORD",
  organizerWorkflows: "CLM-WOWLIST-FACEBOOK-ORGANIZER-WORKFLOWS",
  careAndMobilization: "CLM-WOWLIST-FACEBOOK-CARE-AND-MOBILIZATION"
} as const;

const sourceIds = {
  census: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
  report: "SRC-WOWLIST-FACEBOOK-POST-REPORT-2026",
  page: "SRC-WOWLIST-FACEBOOK-PAGE",
  westword: "SRC-WOWLIST-FACEBOOK-WESTWORD-DIY-FUND-2017",
  eastBayExpress: "SRC-WOWLIST-FACEBOOK-EAST-BAY-SAFE-SPACES-2016",
  willametteWeek: "SRC-WOWLIST-FACEBOOK-KNOW-CLOSING-2016",
  meowWolf: "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
  doDiy: "SRC-WOWLIST-FACEBOOK-DODIY-RESOURCE"
} as const;

export const wowListFacebookPostReviewSummary = {
  exposedDistinctPosts: 57,
  dateRange: { earliest: "2015-04-25", latest: "2018-03-22" },
  yearCounts: { 2015: 22, 2016: 27, 2017: 7, 2018: 1 },
  sharedSourceCardRows: 24,
  pagePostRows: 33,
  distinctPostedUrls: 55,
  wowListUrls: 30,
  externalUrls: 25,
  productOnboardingRows: 17,
  crossCityOrganizerRows: 16,
  participatoryGovernanceRows: 3,
  venueSafetyRows: 12,
  mutualAidAndCivicRows: 6,
  rowsWithLikes: 41,
  displayedLikes: 87,
  rowsWithComments: 12,
  displayedComments: 16,
  rowsWithShares: 10,
  displayedShares: 49
} as const;

export const wowListFacebookPostKnowledge = {
  intakeItems: [
    {
      id: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      kind: "analysis-note",
      title: "WOW List Facebook post full-population archival production",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: ["wowlist"],
      reason: "Account for every distinct post exposed by the authenticated WOW List Facebook feed, preserve public-safe dates, source labels, URL routes, mission tags, and displayed interaction counts, and mature bounded claims without publishing raw post bodies or social-graph data.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: Object.values(sourceIds),
      observationIds: [
        "OBS-WOWLIST-FACEBOOK-POST-POPULATION",
        "OBS-WOWLIST-FACEBOOK-POSTED-URL-INVENTORY",
        "OBS-WOWLIST-FACEBOOK-ORGANIZER-WORKFLOWS",
        "OBS-WOWLIST-FACEBOOK-PARTICIPATORY-GOVERNANCE",
        "OBS-WOWLIST-FACEBOOK-VENUE-SAFETY",
        "OBS-WOWLIST-FACEBOOK-CIVIC-MOBILIZATION",
        "OBS-WOWLIST-FACEBOOK-STAKEHOLDER-PATTERNS",
        "OBS-WOWLIST-FACEBOOK-DISPLAYED-INTERACTIONS",
        "OBS-WOWLIST-FACEBOOK-BUSINESS-SUITE-GAP",
        "OBS-WOWLIST-FACEBOOK-AUTHORSHIP-BOUNDARY"
      ],
      researchInquiryIds: [
        "INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT",
        "INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP",
        "INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION"
      ],
      boundaries: [
        "One hundred percent means every distinct post exposed by the authenticated live page feed on July 15, 2026 received a ledger row; it is not a native Meta export or proof of complete lifetime history.",
        "Shared-source labels, reactions, comments, and shares do not establish who authored the WOW List page post, reach, attendance, conversion, endorsement, mandate, or impact.",
        "WOW List remains a project Jamie and Richard Caceres built together; account evidence cannot assign every social post or project contribution to one person.",
        "Raw post bodies, comment text, interaction identities, follower identities, contact details, authenticated URLs, and session data stay outside the public repository."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-WOWLIST-FACEBOOK-POST-POPULATION",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.page, sourceIds.report],
      project: "wowlist",
      kind: "source-fact",
      text: "Repeated authenticated lazy scrolling reached a stable terminal feed of 57 distinct dated WOW List Facebook posts spanning April 25, 2015 through March 22, 2018: 22 in 2015, 27 in 2016, seven in 2017, and one in 2018.",
      locator: "populationReconciliation and population",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.operatingRecord],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT"],
      limitations: [
        "Completeness is bounded to the capture-date live feed exposed by Facebook.",
        "Deleted, hidden, private, unpublished, or no-longer-retained posts can remain outside the recovered population."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "source-fact",
      text: "The 57 posts contain 55 distinct cleaned URL routes: 30 to WOW List and 25 to external sources. The external inventory includes organizer infrastructure, venue-safety reporting and funds, mutual-aid routes, and cultural-network resources.",
      locator: "urlInventorySummary and postedUrlInventory",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.operatingRecord, wowListFacebookPostClaimIds.organizerWorkflows, wowListFacebookPostClaimIds.careAndMobilization],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION"],
      limitations: [
        "A posted URL documents distribution through the account, not agreement with every linked statement.",
        "A linked source is not coverage of WOW List unless the source itself discusses WOW List."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-ORGANIZER-WORKFLOWS",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: ["SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION", sourceIds.doDiy],
      project: "wowlist",
      kind: "bounded-inference",
      text: "Seventeen ledger rows document product onboarding or use and 16 document cross-city organizer infrastructure. Together they preserve local-calendar, join, tutorial, event-loading, and tour-routing workflows across Phoenix, Santa Barbara, Los Angeles, Seattle, Iowa City, Chicago, Kansas City, and touring projects.",
      locator: "population missionTags and postedUrlInventory",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.organizerWorkflows],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP"],
      limitations: [
        "The rows document historical public use and advocacy, not a platform-wide adoption census or current availability.",
        "Local-scene and artist labels remain attributable to their displayed public sources."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-PARTICIPATORY-GOVERNANCE",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "bounded-inference",
      text: "Three ledger rows preserve participatory product-governance practices: a public invitation to a kitchen-to-kitchen site-design video chat and two records circulating a member-hangout reflection on community values, shared ownership, and distributed contribution.",
      locator: "population ordinals 35, 37, and 40",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.organizerWorkflows],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP"],
      limitations: [
        "The public ledger hashes rather than republishes the post bodies.",
        "Invitations and reflections document process, not attendance, consensus, or resulting product changes."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-VENUE-SAFETY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.westword, sourceIds.eastBayExpress, sourceIds.willametteWeek, sourceIds.meowWolf],
      project: "wowlist",
      kind: "bounded-inference",
      text: "Twelve ledger rows route venue-safety or survival material, including the Ghost Ship tragedy and relief, safer-space resources, the Meow Wolf DIY Fund, public support for Pehrspace, Silent Barn, Trunk Space, Shea Stadium, and reporting on the Know's closure under rent pressure.",
      locator: "population missionTags: venue-safety-and-survival",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.careAndMobilization],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION"],
      limitations: [
        "Distribution does not establish that WOW List caused funding, prevented closures, or changed policy.",
        "The linked articles and institutional pages supply issue context, not coverage of WOW List."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-CIVIC-MOBILIZATION",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "bounded-inference",
      text: "Six ledger rows use the calendar and social channel for mutual aid or civic mobilization, including Standing Rock support, post-election organizing, the Women's March, and Ghost Ship relief or vigil routes.",
      locator: "population missionTags: mutual-aid-and-civic-mobilization",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.careAndMobilization],
      researchInquiryIds: [],
      limitations: [
        "Calendar and social routing do not establish attendance, outcome, endorsement by every community member, or causal impact.",
        "Reposted and linked materials remain attributable to their original sources."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-STAKEHOLDER-PATTERNS",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "bounded-inference",
      text: "Twenty-four posts display a shared-source card. Overlapping public ledger tags identify 12 artist or community sources, eight local-organizer or resource-network sources, five arts-and-civic advocacy sources, five cultural-space sources, and four published-media sources.",
      locator: "population relationship, sharedSourceLabels, and stakeholderGroups",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.operatingRecord, wowListFacebookPostClaimIds.organizerWorkflows],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP"],
      limitations: [
        "Stakeholder tags overlap and describe displayed source relationships, not unique people or formal partnerships.",
        "The pass did not publish reaction, commenter, follower, or other social-graph identities."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-DISPLAYED-INTERACTIONS",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "wowlist",
      kind: "source-fact",
      text: "At capture time, Facebook displayed likes on 41 rows, comments on 12, and shares on ten, totaling 87 likes, 16 comments, and 49 shares. The October 5, 2015 nine-city introduction row had the population's highest displayed counts: 13 likes, three comments, and 29 shares.",
      locator: "displayedInteractionSummary and population ordinal 42",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.operatingRecord],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT"],
      limitations: [
        "Displayed counts are volatile capture-date interface values and can change after review.",
        "The counts are not reach, attendance, conversion, endorsement, unique people, mandate, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-BUSINESS-SUITE-GAP",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.report,
      project: "wowlist",
      kind: "limitation",
      text: "Meta Business Suite labeled a March 31, 2019 through July 14, 2026 window as Lifetime and returned no content, while the authenticated public feed exposed 57 posts from 2015 through 2018. The Business Suite view therefore could not serve as the population source for this pass.",
      locator: "Population method and reconciliation notes",
      status: "verified",
      publicSafe: true,
      claimIds: [wowListFacebookPostClaimIds.operatingRecord],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT"],
      limitations: [
        "The discrepancy reflects the interfaces visible on the capture date, not a general claim about every Meta account or export tool.",
        "An empty bounded Business Suite window is not evidence that no historical posts existed."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-AUTHORSHIP-BOUNDARY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.report,
      project: "wowlist",
      kind: "participant-memory",
      text: "Jamie remembers managing WOW List's social presence and the authenticated account confirms his current page-management access. Neither the page identity nor current access identifies the human author of every historical post.",
      locator: "Account-access note and Jamie's July 2026 participant memory",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP"],
      limitations: [
        "Treat social-management authorship as a research lead until Richard, other collaborators, or native account records clarify it.",
        "Current administrative access does not prove historical account administration."
      ]
    }
  ],
  sources: [
    {
      id: sourceIds.census,
      title: "WOW List Facebook post full-population public-safe census",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Facebook post full-population public-safe census, July 15, 2026.",
      publicNote: "A 57-row ledger of dates, source-card labels, cleaned URL routes, bounded mission and stakeholder tags, content hashes, and displayed interaction counts; raw bodies and social-graph identities are excluded.",
      supportsGenerally: ["57-row population", "date and year reconciliation", "source-card relationships", "posted URLs", "displayed interaction counts", "17 onboarding or use rows", "16 cross-city organizer rows", "three participatory-governance rows", "local-scene and touring routes", "12 venue-safety or survival rows", "six mutual-aid or civic-mobilization rows", "posted URL roles"],
      doesNotEstablish: ["complete lifetime account history", "post-level human authorship", "reach", "attendance", "conversion", "formal partnership", "impact"]
    },
    {
      id: sourceIds.report,
      title: "WOW List Facebook post archival-production report",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/wowlist-facebook-posts.md",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Facebook post archival-production report, July 15, 2026.",
      publicNote: "Documents method, population reconciliation, mission-relevant sources, traction limits, collective credit, and projection decisions.",
      supportsGenerally: ["capture method", "population boundary", "privacy and credit limits", "research method", "source roles", "collective-credit boundary", "projection decision"],
      doesNotEstablish: ["a native Meta export", "individual authorship", "complete deleted-post recovery", "current product availability"]
    },
    {
      id: sourceIds.page,
      title: "WOW List Facebook page",
      organization: "WOW List",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Facebook page, accessed July 15, 2026.",
      publicNote: "The page identifies WOW List as an event-sharing and community-building project and displays the motto 'Being there changes everything.'",
      supportsGenerally: ["public project identity", "event-sharing and community-building framing", "project motto"],
      doesNotEstablish: ["individual historical post authorship", "current product operation", "lifetime post count", "current follower count after access"]
    },
    {
      id: sourceIds.westword,
      title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
      organization: "Denver Westword",
      author: "Patricia Calhoun",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-09",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
      preferredPublicUrl: "canonical",
      publicCitation: "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
      publicNote: "The WOW List page linked this reporting while circulating a venue-support model.",
      supportsGenerally: ["Denver's $20,000 contribution", "Meow Wolf partnership", "DIY-space safety and repair context", "a mission-relevant source distributed by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List causation", "Jamie's authorship of the post", "WOW List impact on the fund"]
    },
    {
      id: sourceIds.eastBayExpress,
      title: "Artists Who Survived Oakland Warehouse Fire Discuss The Tragedy, Those Missing, Need for Safe Underground Spaces",
      organization: "East Bay Express",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-12-03",
      accessedAt: reviewedAt,
      canonicalUrl: "https://eastbayexpress.com/artists-who-survived-oakland-warehouse-fire-discuss-the-tragedy-those-missing-need-for-safe-underground-spaces-2-1/",
      preferredPublicUrl: "canonical",
      publicCitation: "'Artists Who Survived Oakland Warehouse Fire Discuss The Tragedy, Those Missing, Need for Safe Underground Spaces,' East Bay Express, December 3, 2016.",
      publicNote: "The WOW List page linked the reporting during its Ghost Ship safety and relief sequence.",
      supportsGenerally: ["Ghost Ship tragedy context", "artists' safe-underground-space concerns", "a mission-relevant source distributed by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List causation", "individual page-post authorship", "policy impact"]
    },
    {
      id: sourceIds.willametteWeek,
      title: "The Know Is Closing",
      organization: "Willamette Week",
      author: "Matthew Singer",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-07-01",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
      preferredPublicUrl: "canonical",
      publicCitation: "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
      publicNote: "The WOW List page linked this reporting while circulating the pressures on long-running independent venues.",
      supportsGenerally: ["the Know's announced closure", "rent-pressure context", "independent-venue survival context", "a mission-relevant source distributed by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List causation", "Jamie's authorship of the post", "platform impact"]
    },
    {
      id: sourceIds.meowWolf,
      title: "Meow Wolf's DIY Fund",
      organization: "Meow Wolf",
      author: "Meow Wolf",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-12-11",
      accessedAt: reviewedAt,
      canonicalUrl: "https://meowwolf.com/blob/meow-wolfs-diy-fund",
      preferredPublicUrl: "canonical",
      publicCitation: "Meow Wolf, 'Meow Wolf's DIY Fund,' December 11, 2016.",
      publicNote: "The WOW List page linked the fund announcement and later application route.",
      supportsGenerally: ["$100,000 annual DIY fund announcement", "infrastructure and rent support", "legal and building-code consultation", "a mission-relevant source distributed by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List involvement in creating the fund", "Jamie's authorship of the post", "funding outcomes caused by WOW List"]
    },
    {
      id: sourceIds.doDiy,
      title: "DoDIY: DIY Resource & Organizer List",
      organization: "DoDIY",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://dodiy.org/",
      preferredPublicUrl: "canonical",
      publicCitation: "DoDIY: DIY Resource & Organizer List, accessed July 15, 2026.",
      publicNote: "The WOW List page linked DoDIY while documenting touring-event loading and organizer-resource connections.",
      supportsGenerally: ["cross-city DIY-space and organizer resource network", "organizer and performer support context", "a mission-relevant source distributed by WOW List"],
      doesNotEstablish: ["formal partnership with WOW List", "complete historical integration", "Jamie's authorship of linked DoDIY material", "current WOW List availability"]
    }
  ],
  claims: [
    {
      id: wowListFacebookPostClaimIds.operatingRecord,
      project: "wowlist",
      internalClaim: "The complete capture-date Facebook feed population is a 57-post public operating record of WOW List's historical project identity, distribution practices, source relationships, and bounded displayed interactions from 2015 through 2018.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "A complete capture-date pass of the recovered WOW List Facebook feed preserves 57 posts spanning 2015-2018, with public-safe source and URL inventories.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["57-row population", "date and year reconciliation", "source-card relationships", "posted URLs", "displayed interaction counts"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.report, relationship: "corroborating", supports: ["capture method", "population boundary", "privacy and credit limits"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.page, relationship: "context", supports: ["public project identity", "event-sharing and community-building framing"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Describe the recovered live-feed population, not complete lifetime history.",
        "Treat displayed interaction counts as volatile interface values.",
        "Keep raw bodies and social-graph identities outside the public repository.",
        "Keep project credit shared with Richard Caceres and other collaborators."
      ],
      antiClaims: [
        "57 posts are WOW List's complete lifetime Facebook history",
        "Jamie authored every WOW List Facebook post",
        "Jamie alone created WOW List",
        "Facebook reactions are reach, attendance, conversion, endorsement, mandate, or impact",
        "the empty 2019-2026 Business Suite window proves no historical posts existed"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT", "INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: wowListFacebookPostClaimIds.organizerWorkflows,
      project: "wowlist",
      internalClaim: "The recovered Facebook feed documents historical organizer-facing WOW List workflows: local calendar onboarding, event loading, join routes, tutorials, tour distribution, cross-city resource connections, and participatory product discussion.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The recovered Facebook record documents organizer-facing onboarding, event-loading, tour-routing, and participatory product-governance workflows.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["17 onboarding or use rows", "16 cross-city organizer rows", "three participatory-governance rows", "local-scene and touring routes"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015", relationship: "corroborating", supports: ["independent public tutorial", "organizer-facing onboarding"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-WOWLIST-SBDIY-ADOPTION", relationship: "corroborating", supports: ["external organizer adoption", "local calendar publishing"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.doDiy, relationship: "context", supports: ["cross-city DIY-space and organizer resource network"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Document historical workflows and examples, not platform-wide or current adoption.",
        "Attribute shared-source material to the displayed source.",
        "An invitation to participate does not establish attendance, consensus, or a resulting product change."
      ],
      antiClaims: [
        "the Facebook feed is a complete adoption census",
        "every shared source formally partnered with WOW List",
        "Jamie authored every source card",
        "the platform is currently operating"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP", "INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: wowListFacebookPostClaimIds.careAndMobilization,
      project: "wowlist",
      internalClaim: "WOW List's recovered Facebook record used event and social distribution for more than promotion, routing venue-safety and survival information, mutual aid, and civic mobilization alongside cultural events.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The recovered account routed venue-safety, mutual-aid, and civic-mobilization information alongside cultural events.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["12 venue-safety or survival rows", "six mutual-aid or civic-mobilization rows", "posted URL roles"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.westword, relationship: "context", supports: ["DIY-space safety and repair context"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.eastBayExpress, relationship: "context", supports: ["artists' safe-underground-space concerns"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.willametteWeek, relationship: "context", supports: ["independent-venue survival context"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.meowWolf, relationship: "context", supports: ["infrastructure and rent support"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Distribution documents a public-information practice, not causal impact.",
        "Linked mission-context sources are not coverage of WOW List.",
        "Do not infer attendance, outcomes, endorsement, or policy change from posted routes or interaction counts."
      ],
      antiClaims: [
        "WOW List created the linked funds",
        "WOW List caused venue recoveries or policy change",
        "shared mission-context articles are coverage of WOW List",
        "Facebook shares prove public impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT",
      project: "wowlist",
      question: "Can a native Meta page-owner export recover deleted, hidden, unpublished, or otherwise unexposed WOW List posts and post-level administration metadata?",
      methods: [
        "Request a page-owner data export with posts, publishing identities, visibility states, and timestamps if Meta exposes those fields.",
        "Reconcile exported post IDs against the 57-row capture-date ledger without publishing private or session data.",
        "Keep missing-from-live-feed distinct from historically nonexistent."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The authenticated live feed exposed 57 dated posts.", "The visible Business Suite Lifetime window began after the recovered feed ended and therefore could not serve as a lifetime census."],
      limitations: ["No native Meta export was available in this pass.", "Platform retention and permissions may prevent complete recovery."],
      sourceIds: [sourceIds.census, sourceIds.report],
      publicSummary: "The live-feed census is complete for the capture-date surface; lifetime history and administration metadata remain open."
    },
    {
      id: "INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP",
      project: "wowlist",
      question: "What can collaborators and native account records establish about Jamie's role in creating and managing WOW List's social presence?",
      methods: [
        "Ask Richard Caceres and other collaborators to distinguish account creation, identity design, publishing, moderation, and campaign-specific posting.",
        "Review native page-role and publishing audit data if available.",
        "Preserve project stewardship separately from individual post authorship."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["Jamie remembers managing the project's social presence and currently has authenticated page-management access.", "The live page does not identify the historical human author of every post."],
      limitations: ["Participant memory and current access are not sufficient to assign complete historical authorship.", "WOW List remains shared project work with Richard and other contributors."],
      sourceIds: [sourceIds.report, sourceIds.page],
      publicSummary: "Social-presence stewardship is a supported research lead; post-level authorship remains unassigned."
    },
    {
      id: "INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION",
      project: "wowlist",
      question: "Which of the 25 external posted URLs can be preserved and decomposed into stronger issue, workflow, adoption, or historical-context records?",
      methods: [
        "Resolve and archive every external route with a source role and access result.",
        "Distinguish independent WOW List use from mission context, fundraising, event information, and dead-link research leads.",
        "Promote only claims the linked source itself establishes."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The pass preserves all 25 external routes.", "Westword, East Bay Express, Willamette Week, Meow Wolf, DoDIY, the Shelby tutorial, and Santa Barbara DIY now have explicit source roles."],
      limitations: ["Some historical fundraisers and sites are dead, moved, or require Wayback recovery.", "A posted link is not automatically coverage, adoption, endorsement, or outcome evidence."],
      sourceIds: [sourceIds.census, sourceIds.westword, sourceIds.eastBayExpress, sourceIds.willametteWeek, sourceIds.meowWolf, sourceIds.doDiy, "SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION"],
      publicSummary: "All external routes are inventoried; seven high-signal sources have explicit roles and the remaining routes stay available for preservation work."
    }
  ]
};
