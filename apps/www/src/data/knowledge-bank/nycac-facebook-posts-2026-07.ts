const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex authenticated public-safe archival review"];

const sourceIds = {
  census: "SRC-NYCAC-FACEBOOK-POST-CENSUS-2026",
  report: "SRC-NYCAC-FACEBOOK-POST-REPORT-2026",
  page: "SRC-NYCAC-FACEBOOK-PAGE",
  grubstreet: "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
  fox5: "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
  timeout: "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22"
} as const;

export const nycacFacebookPostSourceIds = sourceIds;

export const nycacFacebookPostClaimIds = {
  operatingRecord: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  civicRelay: "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
  interactionSignals: "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS"
} as const;

export const nycacFacebookPostReviewSummary = {
  encounteredRenderRows: 598,
  deduplicatedRenderVariants: 153,
  exposedDistinctPosts: 445,
  dateRange: { earliest: "2017-01-29", latest: "2021-09-15" },
  yearCounts: { 2017: 186, 2018: 74, 2019: 111, 2020: 69, 2021: 5 },
  distinctExternalRoutes: 67,
  publishedExactRoutes: 65,
  withheldSensitiveRoutes: 2,
  governedSourceRoutes: 9,
  inventoryOnlyRoutes: 56,
  missionTagCounts: {
    commercialRentAndAntiDisplacement: 48,
    civicSolidarityAndParticipation: 16,
    covidAndSpaceRelief: 30,
    coalitionPublicCommunications: 104,
    nightlifeGovernanceAndListening: 29,
    marchTransparencyAndAccountability: 65,
    cabaretLawAndDanceFreedom: 76,
    culturalPolicyAndCreateNyc: 18,
    culturalSpaceSafetyAndCompliance: 8,
    culturalSpaceSurvivalAndNetwork: 191
  },
  stakeholderTagCounts: {
    nycCouncilAndElectedOfficials: 66,
    culturalAffairsAndCityAgencies: 15,
    officeOfNightlifeAndNightlifeGovernance: 33,
    enforcementAndRegulatoryAgencies: 66,
    artistsCulturalSpacesAndOrganizers: 256,
    publishedMedia: 35,
    stateAndFederalGovernment: 9,
    coalitionAndAdvocacyNetworks: 39,
    generalPublicAndFollowers: 105
  },
  accountReferenceRows: {
    rafaelEspinal: 23,
    nycCouncil: 25,
    stephenLevin: 8,
    antonioReynoso: 1,
    culturalAffairs: 4,
    officeOfNightlife: 4,
    mayor: 3
  },
  rowsWithReactions: 371,
  displayedReactions: 2291,
  maxReactionsOnOneRow: 95,
  rowsWithComments: 128,
  displayedComments: 212,
  maxCommentsOnOneRow: 7,
  rowsWithShares: 0,
  displayedShares: 0,
  authorshipBoundary: "shared-account-human-author-unresolved"
} as const;

export const nycacFacebookPostKnowledge = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      kind: "analysis-note",
      title: "NYC Artist Coalition Facebook post full-population archival production",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: [
        "nyc-artist-coalition",
        "let-nyc-dance",
        "save-nyc-spaces",
        "talks-not-raids",
        "fair-rent-nyc"
      ],
      reason: "Account for every distinct post exposed by the authenticated NYC Artist Coalition Facebook Page feed, preserve public-safe chronology, source routes, mission and stakeholder patterns, and displayed interaction signals, and keep shared-account authorship and platform limits explicit.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: Object.values(sourceIds),
      observationIds: [
        "OBS-NYCAC-FACEBOOK-POST-POPULATION",
        "OBS-NYCAC-FACEBOOK-POST-CHRONOLOGY",
        "OBS-NYCAC-FACEBOOK-POST-MISSION-PATTERNS",
        "OBS-NYCAC-FACEBOOK-POSTED-URL-INVENTORY",
        "OBS-NYCAC-FACEBOOK-STAKEHOLDER-INTERFACES",
        "OBS-NYCAC-FACEBOOK-DISPLAYED-INTERACTIONS",
        "OBS-NYCAC-FACEBOOK-GRUBSTREET-ODE",
        "OBS-NYCAC-FACEBOOK-FOX5-NIGHTLIFE",
        "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT",
        "INQ-NYCAC-FACEBOOK-POST-AUTHORSHIP",
        "INQ-NYCAC-FACEBOOK-POST-SOURCE-PRESERVATION"
      ],
      boundaries: [
        "One hundred percent means every distinct post exposed by the authenticated live Page feed on July 15, 2026 received a public-safe ledger row; it is not a native Meta export or proof of complete lifetime history.",
        "The shared Page identity does not identify which teammate authored an individual historical post.",
        "Stakeholder references, tags, and routes are not attributable incoming engagement, endorsement, formal partnership, mandate, or policy impact.",
        "Raw bodies, comments, interaction identities, follower identities, authenticated URLs, private reconciliation identities, and two sensitive exact routes stay outside the public repository."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-POST-POPULATION",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [sourceIds.page, sourceIds.report],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Repeated authenticated lazy scrolling reached a stable terminal feed. Private per-post reconciliation paired 153 transient duplicate render variants among 598 encountered rows, producing 445 distinct dated posts and a 445-row public-safe ledger.",
      locator: "populationReconciliation, method.terminalControl, and population",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.operatingRecord],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT"],
      limitations: [
        "Completeness is bounded to the capture-date live feed Facebook exposed.",
        "Deleted, hidden, private, unpublished, or no-longer-retained posts can remain outside the recovered population."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POST-CHRONOLOGY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The 445 recovered posts span January 29, 2017 through September 15, 2021: 186 in 2017, 74 in 2018, 111 in 2019, 69 in 2020, and five in 2021.",
      locator: "populationReconciliation.dateRange and yearCounts",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.operatingRecord],
      researchInquiryIds: [],
      limitations: ["The date range describes the exposed population, not the Page's complete lifetime history."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POST-MISSION-PATTERNS",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "Overlapping public-safe classifications identify 76 Cabaret Law and dance-freedom rows, 65 M.A.R.C.H. transparency rows, 48 commercial-rent and anti-displacement rows, 29 nightlife-governance rows, 30 COVID and space-relief rows, 18 cultural-policy and CreateNYC rows, and eight safety-and-compliance rows.",
      locator: "missionSummary.tagCounts and population[].missionTags",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.operatingRecord, nycacFacebookPostClaimIds.civicRelay],
      researchInquiryIds: [],
      limitations: [
        "Tags overlap and describe post-level subject matter rather than mutually exclusive campaigns.",
        "Issue continuity does not establish that the Page or one person caused a policy outcome."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      comparisonSourceIds: [
        "SRC-NYCAC-NYTIMES-CABARET-REPEAL-2017-10-30",
        "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10",
        "SRC-NYCAC-NPR-CABARET-2017-09-20",
        "SRC-NYCAC-GOTHAMIST-MARCH-2019-02-12",
        "SRC-NYCAC-BEDFORD-MARCH-2019",
        "SRC-NYCAC-WNYC-CABARET-2017",
        sourceIds.grubstreet,
        sourceIds.fox5,
        sourceIds.timeout
      ],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The deduplicated posts contain 67 distinct cleaned off-Facebook routes. Sixty-five exact public-safe routes are published, two sensitive meeting or working-document routes are represented only by hashes and host classes, nine routes resolve to governed source records, and 56 remain an explicit preservation queue.",
      locator: "postedUrlSummary and postedUrlInventory",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.operatingRecord, nycacFacebookPostClaimIds.civicRelay],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-SOURCE-PRESERVATION"],
      limitations: [
        "A posted URL documents distribution through the account, not agreement with every linked statement.",
        "A linked article is not coverage of NYC Artist Coalition unless the article itself discusses the coalition.",
        "Not rechecked is distinct from dead, live, or historically nonexistent."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-STAKEHOLDER-INTERFACES",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "Overlapping reference classifications identify 66 rows connected to NYC Council or elected officials, 33 to the Office of Nightlife or nightlife governance, 15 to Cultural Affairs or other city cultural-policy interfaces, 66 to enforcement or regulatory agencies, 256 to artists, cultural spaces, or organizers, and 35 to published media.",
      locator: "stakeholderSummary.tagCounts",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.civicRelay],
      researchInquiryIds: [],
      limitations: [
        "Stakeholder tags overlap and describe references, tags, routes, and issue interfaces, not unique people.",
        "The capture does not attribute reactions or comments to stakeholder groups.",
        "A reference does not establish incoming engagement, endorsement, formal partnership, mandate, or impact."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DISPLAYED-INTERACTIONS",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "At capture time, Facebook displayed reactions on 371 rows and comments on 128, totaling 2,291 reactions and 212 comments. The highest reaction display was 95 on an October 30, 2017 Cabaret Law repeal post. Share counts were not displayed on the capture surface.",
      locator: "displayedInteractionSummary and population ordinal 293",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.interactionSignals],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT"],
      limitations: [
        "Displayed counts are volatile capture-date interface values.",
        "Zero displayed shares is not evidence that no sharing occurred.",
        "The counts are not reach, attendance, conversion, endorsement, unique people, mandate, or impact."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-GRUBSTREET-ODE",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.grubstreet,
      project: "talks-not-raids",
      kind: "source-fact",
      text: "Grub Street reported that community support helped Ode to Babel retain its liquor license and that NYC Artist Coalition, the Hell's Kitchen Democrats, and Council Members Stephen Levin and Rafael Espinal had protested M.A.R.C.H. raids and their lack of transparency.",
      locator: "Article paragraphs describing the community-board response and M.A.R.C.H. history",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.civicRelay],
      researchInquiryIds: [],
      limitations: [
        "The article credits multiple organizers, neighbors, organizations, and officials; it does not assign the outcome to Jamie.",
        "The article's account does not establish the complete coalition division of labor."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-FOX5-NIGHTLIFE",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.fox5,
      project: "save-nyc-spaces",
      kind: "source-fact",
      text: "FOX 5 reported that the first public event of New York City's nightlife director convened a packed room of bar owners, artists, promoters, and performers at Secret Project Robot and surfaced concerns including commercial rents, noise complaints, and city bureaucracy.",
      locator: "Article body describing the March 26, 2018 event",
      status: "verified",
      publicSafe: true,
      claimIds: [nycacFacebookPostClaimIds.civicRelay],
      researchInquiryIds: [],
      limitations: [
        "The source establishes the event and issue context, not NYC Artist Coalition's authorship of the Office of Nightlife.",
        "Packed room is the publication's description, not a verified attendance count."
      ]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY",
      intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      sourceId: sourceIds.report,
      comparisonSourceIds: [sourceIds.page],
      project: "nyc-artist-coalition",
      kind: "participant-memory",
      text: "Jamie remembers predominantly using the NYC Artist Coalition Facebook Page while believing that other collaborators also used it. Current authenticated Page-management access confirms present custody, not historical post-level authorship.",
      locator: "Jamie's July 15, 2026 participant memory and authenticated Page-management view",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-AUTHORSHIP"],
      limitations: [
        "Treat predominant use as a research lead until collaborator testimony or native publishing records corroborate it.",
        "Do not assign all posts to Jamie or erase other collaborators' account work."
      ]
    }
  ],
  sources: [
    {
      id: sourceIds.census,
      title: "NYC Artist Coalition Facebook post full-population public-safe census",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-posts-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition Facebook post full-population public-safe census, July 15, 2026.",
      publicNote: "A 445-row ledger of dates, source-route keys, bounded mission and stakeholder tags, content hashes, and displayed interaction counts. Raw bodies, social-graph identities, authenticated URLs, and sensitive exact routes are excluded.",
      supportsGenerally: [
        "598 encountered render rows",
        "153 deduplicated render variants",
        "445 distinct dated posts",
        "2017-2021 date and year reconciliation",
        "67 distinct off-Facebook routes",
        "65 published exact routes and two withheld sensitive routes",
        "nine governed source routes and 56 inventory-only routes",
        "mission-pattern counts",
        "stakeholder-reference counts",
        "2,291 displayed reactions and 212 displayed comments",
        "95-reaction maximum on population ordinal 293"
      ],
      doesNotEstablish: [
        "complete lifetime account history",
        "post-level human authorship",
        "incoming engagement by named stakeholder groups",
        "reach",
        "attendance",
        "conversion",
        "endorsement",
        "mandate",
        "policy impact"
      ]
    },
    {
      id: sourceIds.report,
      title: "NYC Artist Coalition Facebook post archival-production report",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition Facebook post archival-production report, July 15, 2026.",
      publicNote: "Documents method, population reconciliation, source routing, stakeholder and interaction semantics, shared-account credit, privacy controls, and projection decisions.",
      supportsGenerally: ["capture method", "population boundary", "privacy controls", "shared-account authorship boundary", "source-role distinctions", "projection decision"],
      doesNotEstablish: ["a native Meta export", "individual post authorship", "complete deleted-post recovery", "causal impact"]
    },
    {
      id: sourceIds.page,
      title: "NYC Artist Coalition Facebook Page",
      organization: "NYC Artist Coalition",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/nycartc",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition Facebook Page, accessed July 15, 2026.",
      publicNote: "The authenticated view identified the Page and exposed its capture-date feed and management surface.",
      supportsGenerally: ["public Page identity", "capture-date feed surface", "current authenticated management access"],
      doesNotEstablish: ["historical post-level authorship", "complete lifetime history", "individual engagement identities", "current follower count after access"]
    },
    {
      id: sourceIds.grubstreet,
      title: "Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen",
      organization: "Grub Street",
      author: "Nikita Richardson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-05-22",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.grubstreet.com/2019/05/prospect-heights-ode-to-babel-gentrification.html",
      preferredPublicUrl: "canonical",
      publicCitation: "Nikita Richardson, 'Gentrification Threatened Their Bar - Black Neighbors Refused to Let That Happen,' Grub Street, May 22, 2019.",
      publicNote: "Reporting on community support for Ode to Babel and the venue's M.A.R.C.H. raid history.",
      supportsGenerally: ["community support for Ode to Babel", "liquor-license renewal", "M.A.R.C.H. raid impact described by the owners", "NYC Artist Coalition and named officials protested M.A.R.C.H. raids and transparency gaps"],
      doesNotEstablish: ["Jamie's individual role", "sole coalition causation", "complete coalition division of labor", "a general attendance total"]
    },
    {
      id: sourceIds.fox5,
      title: "New York's 'nightlife mayor' holds first event",
      organization: "FOX 5 New York",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-03-26",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.fox5ny.com/news/new-yorks-nightlife-mayor-holds-first-event",
      preferredPublicUrl: "canonical",
      publicCitation: "FOX 5 New York, 'New York's nightlife mayor holds first event,' March 26, 2018.",
      publicNote: "Reporting on the nightlife director's inaugural public event at Secret Project Robot.",
      supportsGenerally: ["March 26, 2018 public event", "Secret Project Robot venue", "bar owners, artists, promoters, and performers in the audience", "commercial-rent, noise-complaint, and bureaucracy concerns", "Rafael Espinal sponsored the Office of Nightlife law"],
      doesNotEstablish: ["NYC Artist Coalition solely created the Office of Nightlife", "Jamie's sole production credit", "a verified attendance count", "resolution of the concerns raised"]
    },
    {
      id: sourceIds.timeout,
      title: "It's still illegal to dance in some parts of New York",
      organization: "Time Out New York",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-22",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.timeout.com/newyork/blog/its-still-illegal-to-dance-in-some-parts-of-new-york-032217",
      preferredPublicUrl: "canonical",
      publicCitation: "Time Out New York, 'It's still illegal to dance in some parts of New York,' March 22, 2017.",
      publicNote: "Contemporaneous issue context distributed through the Page during the Cabaret Law campaign.",
      supportsGenerally: ["Cabaret Law restrictions remained in force in March 2017", "dance and venue-regulation issue context", "a mission-relevant source distributed through the Page"],
      doesNotEstablish: ["coverage of Jamie", "Jamie's authorship of the Facebook post", "sole coalition causation", "the later repeal outcome"]
    }
  ],
  claims: [
    {
      id: nycacFacebookPostClaimIds.operatingRecord,
      project: "nyc-artist-coalition",
      internalClaim: "The complete capture-date Facebook Page feed is a 445-post public operating record of NYC Artist Coalition's campaign continuity, source routing, and bounded displayed interactions from 2017 through 2021.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "A complete capture-date pass of the surviving NYC Artist Coalition Facebook feed preserves 445 dated posts from 2017-2021, with public-safe source routing and shared-account authorship boundaries.", status: "active", citationRequired: true, surfaces: ["/work/technical-operations", "/work"] },
        { key: "archive-note", text: "The public-safe census reconciles 598 encountered render rows into 445 distinct dated posts spanning 2017-2021.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"] }
      ],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["598 encountered render rows", "153 deduplicated render variants", "445 distinct dated posts", "2017-2021 date and year reconciliation", "67 distinct off-Facebook routes"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.report, relationship: "corroborating", supports: ["capture method", "population boundary", "privacy controls", "shared-account authorship boundary"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.page, relationship: "context", supports: ["public Page identity", "capture-date feed surface"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Describe the complete capture-date exposed population, not complete lifetime history.",
        "Do not attribute every historical post to Jamie or another individual.",
        "Keep raw bodies, identities, authenticated URLs, and sensitive exact routes outside the public repository."
      ],
      antiClaims: [
        "445 posts are NYC Artist Coalition's complete lifetime Facebook history",
        "Jamie authored every NYC Artist Coalition Facebook post",
        "current Page access proves historical authorship",
        "the Page record proves policy impact"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT", "INQ-NYCAC-FACEBOOK-POST-AUTHORSHIP"],
      reviewedAt,
      reviewedBy
    },
    {
      id: nycacFacebookPostClaimIds.civicRelay,
      project: "nyc-artist-coalition",
      internalClaim: "The recovered Page operated as collective civic communications infrastructure, repeatedly routing cultural-space experience, campaign actions, government interfaces, source articles, public meetings, practical resources, and policy developments across multiple advocacy arcs.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "archive-note", text: "Across overlapping campaign arcs, the recovered Page repeatedly connected cultural-space concerns with public meetings, source articles, government interfaces, practical resources, and civic action routes.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"] }
      ],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["mission-pattern counts", "stakeholder-reference counts", "65 published exact routes and two withheld sensitive routes", "nine governed source routes and 56 inventory-only routes"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.grubstreet, relationship: "corroborating", supports: ["community support for Ode to Babel", "NYC Artist Coalition and named officials protested M.A.R.C.H. raids and transparency gaps"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.fox5, relationship: "context", supports: ["March 26, 2018 public event", "commercial-rent, noise-complaint, and bureaucracy concerns"], confidence: "high", renderCitation: true },
        { sourceId: sourceIds.timeout, relationship: "context", supports: ["Cabaret Law restrictions remained in force in March 2017", "a mission-relevant source distributed through the Page"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "Call this collective communications infrastructure, not Jamie's individually authored feed.",
        "Stakeholder references and source distribution do not establish incoming engagement, formal partnership, endorsement, or policy causation.",
        "Mission tags overlap and are not mutually exclusive campaign totals."
      ],
      antiClaims: [
        "every referenced official engaged with NYC Artist Coalition",
        "source distribution proves stakeholder endorsement",
        "the Facebook Page caused Cabaret Law repeal, Office of Nightlife creation, M.A.R.C.H. reform, or commercial-rent legislation",
        "all linked articles are coverage of NYC Artist Coalition"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-SOURCE-PRESERVATION"],
      reviewedAt,
      reviewedBy
    },
    {
      id: nycacFacebookPostClaimIds.interactionSignals,
      project: "nyc-artist-coalition",
      internalClaim: "The capture-date Page surface displayed 2,291 reactions across 371 rows and 212 comments across 128 rows; the highest reaction label was 95 on an October 30, 2017 Cabaret Law repeal post.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "archive-note", text: "At capture time, Facebook displayed 2,291 reactions and 212 comments across the recovered population; these volatile labels are not unique reach, attendance, endorsement, conversion, mandate, or impact.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"] }
      ],
      evidence: [
        { sourceId: sourceIds.census, relationship: "direct-support", supports: ["2,291 displayed reactions and 212 displayed comments", "95-reaction maximum on population ordinal 293"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "Treat counts as volatile capture-date labels.",
        "Do not infer the identities or stakeholder groups behind reactions and comments.",
        "Zero displayed shares means share counts were absent from the captured interface, not that no sharing occurred."
      ],
      antiClaims: [
        "2,503 unique people engaged",
        "Facebook reactions and comments measure reach",
        "the counts prove attendance, endorsement, conversion, mandate, or policy impact",
        "zero displayed shares means no one shared the posts"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT",
      project: "nyc-artist-coalition",
      question: "Can a native Meta owner export recover deleted, hidden, private, unpublished, or otherwise unexposed posts, post IDs, publishing identities, and historical interaction fields?",
      methods: [
        "Request a native Page-owner export if Meta exposes the needed fields.",
        "Reconcile exported post identities against the 445-row public-safe ledger without publishing tokens, private posts, or identities.",
        "Keep missing-from-live-feed distinct from historically nonexistent."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The authenticated live Page feed exposed 445 distinct dated posts.", "Seven consecutive terminal checks produced no additional records or document growth."],
      limitations: ["No native Meta owner export was available in this pass.", "Platform retention and permissions may prevent complete lifetime recovery."],
      sourceIds: [sourceIds.census, sourceIds.report, sourceIds.page],
      publicSummary: "The live-feed census is complete for the capture-date exposed surface; lifetime history, publishing identities, and unexposed records remain open."
    },
    {
      id: "INQ-NYCAC-FACEBOOK-POST-AUTHORSHIP",
      project: "nyc-artist-coalition",
      question: "What can collaborators and native publishing records establish about Jamie's role in creating, managing, and posting through NYC Artist Coalition's Facebook presence?",
      methods: [
        "Ask Olympia Kazi and other collaborators to distinguish account creation, identity design, publishing, moderation, campaign work, and period-specific stewardship.",
        "Review native Page-role and publishing records if available.",
        "Preserve coalition stewardship separately from individual post authorship."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["Jamie remembers predominantly using the Page while believing other collaborators also used it.", "Current authenticated access confirms present management access only.", "The Page does not identify the historical human author of each post."],
      limitations: ["Participant memory and current access cannot assign complete historical authorship.", "Collaborator accounts may add, complicate, or correct Jamie's memory."],
      sourceIds: [sourceIds.report, sourceIds.page],
      publicSummary: "Jamie's predominant-use memory is preserved as a research lead; post-level authorship remains shared-account and unresolved."
    },
    {
      id: "INQ-NYCAC-FACEBOOK-POST-SOURCE-PRESERVATION",
      project: "nyc-artist-coalition",
      question: "Which of the 56 inventory-only off-Facebook routes can be recovered, archived, and decomposed into stronger issue, workflow, stakeholder, or historical-context records?",
      methods: [
        "Resolve and archive each public-safe route with an access result and evidence role.",
        "Keep project routes, issue context, government records, program information, fundraising, and intake resources distinct.",
        "Promote only propositions the linked source itself establishes."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["All 67 distinct routes have a disposition.", "Nine routes resolve to governed source records.", "Fifty-six remain inventory-only, while two sensitive routes are withheld by hash and host class."],
      limitations: ["Not rechecked is distinct from dead, live, or historically nonexistent.", "Posted links are not automatically coverage, endorsement, adoption, partnership, or outcome evidence."],
      sourceIds: [
        sourceIds.census,
        sourceIds.grubstreet,
        sourceIds.fox5,
        sourceIds.timeout,
        "SRC-NYCAC-NYTIMES-CABARET-REPEAL-2017-10-30",
        "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10",
        "SRC-NYCAC-NPR-CABARET-2017-09-20",
        "SRC-NYCAC-GOTHAMIST-MARCH-2019-02-12",
        "SRC-NYCAC-BEDFORD-MARCH-2019",
        "SRC-NYCAC-WNYC-CABARET-2017"
      ],
      publicSummary: "Every route has an explicit access and preservation disposition; nine are governed sources, 56 are an honest research queue, and two sensitive exact routes remain withheld."
    }
  ]
};
