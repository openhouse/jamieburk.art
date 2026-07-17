const reviewedAt = "2026-07-15";
const reportPath = "docs/knowledge-bank/nycartc-facebook-posts-2017-2021.md";
const ledgerPath = "docs/knowledge-bank/data/nycartc-facebook-post-ledger.json";

const sourceIds = [
  "SRC-NYCAC-FACEBOOK-PAGE-POSTS-2026",
  "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026",
  "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026",
  "SRC-NYCAC-BEDFORD-MARCH-2019",
  "SRC-NYCAC-BAFFLER-MARCH",
  "SRC-NYCAC-CITY-LIMITS-RENT-COVID-2020",
  "SRC-NYC-COMPTROLLER-RETAIL-VACANCY-2019",
  "SRC-NYCAC-BUZZFEED-MARCH-GENTRIFICATION-2020",
  "SRC-NYCAC-GRUBSTREET-ODE-TO-BABEL-2019",
  "SRC-NYCAC-POND-VENUE-DIVERSITY-2020",
  "SRC-NYCAC-GOTHAMIST-BOOK-CULTURE-2020"
] as const;

const observationIds = [
  "OBS-NYCAC-FACEBOOK-PUBLIC-CENSUS",
  "OBS-NYCAC-FACEBOOK-NATIVE-EXPORT",
  "OBS-NYCAC-FACEBOOK-OVERLAP-BOUNDARY",
  "OBS-NYCAC-FACEBOOK-PUBLIC-THEMES",
  "OBS-NYCAC-FACEBOOK-NATIVE-THEMES",
  "OBS-NYCAC-FACEBOOK-DESTINATION-NETWORK",
  "OBS-NYCAC-FACEBOOK-CAMPAIGN-ACTION-ROUTES",
  "OBS-NYCAC-FACEBOOK-TRACTION-SNAPSHOT",
  "OBS-NYCAC-FACEBOOK-PRODUCT-SURFACE-DRIFT",
  "OBS-NYCAC-FACEBOOK-BEDFORD-MARCH",
  "OBS-NYCAC-FACEBOOK-CITY-LIMITS-RENT",
  "OBS-NYCAC-FACEBOOK-COMPTROLLER-VACANCY",
  "OBS-NYCAC-FACEBOOK-BUZZFEED-MARCH",
  "OBS-NYCAC-FACEBOOK-GRUBSTREET-ODE",
  "OBS-NYCAC-FACEBOOK-POND-DIVERSITY",
  "OBS-NYCAC-FACEBOOK-GOTHAMIST-BOOK-CULTURE",
  "OBS-NYCAC-FACEBOOK-BAFFLER-MARCH",
  "OBS-NYCAC-FACEBOOK-JAMIE-PUBLISHING-MEMORY"
] as const;

const populationInquiryId = "INQ-NYCAC-FACEBOOK-POST-POPULATION-2026";
const creditInquiryId = "INQ-NYCAC-FACEBOOK-PUBLISHING-CREDIT-2026";

export const nycacFacebookPostAudit = {
  publicCandidateRecords: 634,
  publicDistinctNormalizedRecords: 460,
  publicDistinctContentSignatures: 413,
  publicForwardScrollSteps: 522,
  publicTerminalConfirmations: 12,
  publicEarliestObserved: "2017-01-29",
  publicLatestObserved: "2021-09-15",
  nativeExactPosts: 185,
  nativeYearCounts: { 2019: 111, 2020: 69, 2021: 5 },
  nativePostTypeCounts: { Text: 79, Links: 58, Photos: 44, Videos: 4 },
  nativeLifetimeSnapshot: { reactions: 1006, comments: 164, shares: 208 },
  publicSafeDestinationOccurrences: 239,
  publicSafeUniqueDestinations: 83,
  ledgerPath,
  reportPath
} as const;

const newSources = [
  {
    id: "SRC-NYCAC-FACEBOOK-PAGE-POSTS-2026",
    title: "NYC Artist Coalition Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/nycartc/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, Facebook Page, accessed July 15, 2026.",
    publicNote: "Public Page surface for coalition posts and public identity.",
    supportsGenerally: [
      "the public existence of the NYC Artist Coalition Page",
      "the Page's surviving public identity and post surface"
    ],
    doesNotEstablish: [
      "complete lifetime post history",
      "individual publisher identity",
      "authorship of every post or shared source",
      "stakeholder response or impact"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026",
    title: "Protected NYC Artist Coalition Facebook public-chronology audit",
    organization: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    publicCitation: "Protected authenticated public-chronology audit, July 15, 2026.",
    publicNote: "The public repository retains only aggregate controls and a redacted disposition ledger.",
    supportsGenerally: [
      "the completed forward traversal",
      "the conservative content-signature population",
      "redacted theme and route dispositions"
    ],
    doesNotEstablish: [
      "an exact lifetime post count",
      "deleted or hidden history",
      "a successful reverse traversal",
      "publisher identity"
    ],
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-2026-001"
  },
  {
    id: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026",
    title: "Protected Meta Business Suite annual Page-post exports",
    organization: "Meta Business Suite / NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    publicCitation: "Protected native annual Page-post exports for 2019 through 2021, generated July 15, 2026.",
    publicNote: "The public repository retains exact public post IDs, dates, types, aggregate metrics, redacted dispositions, and limitations; raw captions and private analytics remain protected.",
    supportsGenerally: [
      "185 exact unique Page-post IDs across 2019 through 2021",
      "annual chronology and post-type counts",
      "aggregate lifetime metric labels",
      "posted public-destination inventory"
    ],
    doesNotEstablish: [
      "the complete 2017 through 2021 chronology",
      "deleted history",
      "publishing administrator identity",
      "unique people, stakeholder response, reach, or impact"
    ],
    protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-NATIVE-EXPORT-2026-001"
  },
  {
    id: "SRC-NYCAC-CITY-LIMITS-RENT-COVID-2020",
    title: "City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
    organization: "City Limits",
    author: "Bridget Bartolini",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-06",
    accessedAt: reviewedAt,
    canonicalUrl: "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
    preferredPublicUrl: "canonical",
    publicCitation: "Bridget Bartolini, 'City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say,' City Limits, April 6, 2020.",
    publicNote: "Reports the pandemic commercial-rent crisis, advocates' stabilization proposal, legislative context, and opposing positions.",
    supportsGenerally: [
      "the public commercial-rent policy context circulated by the Page",
      "the existence of competing views on Commercial Rent Stabilization"
    ],
    doesNotEstablish: [
      "Jamie's authorship",
      "NYC Artist Coalition's sole ownership of the proposal",
      "bill passage",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYC-COMPTROLLER-RETAIL-VACANCY-2019",
    title: "Retail Vacancy in New York City: Trends and Causes, 2007-2017",
    organization: "Office of the New York City Comptroller",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-25",
    accessedAt: reviewedAt,
    canonicalUrl: "https://comptroller.nyc.gov/reports/retail-vacancy-in-new-york-city/",
    preferredPublicUrl: "canonical",
    publicCitation: "Office of the New York City Comptroller, 'Retail Vacancy in New York City: Trends and Causes, 2007-2017,' September 25, 2019.",
    publicNote: "Official analysis of retail vacancy, rents, and related economic and regulatory factors.",
    supportsGenerally: [
      "the public-data context routed by the Page",
      "official analysis of retail vacancy trends and contributing factors"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition authorship",
      "a single cause of retail vacancy",
      "support for every campaign remedy",
      "campaign impact"
    ]
  },
  {
    id: "SRC-NYCAC-BUZZFEED-MARCH-GENTRIFICATION-2020",
    title: "As Wealthy Residents Moved In, These Business Owners Found Themselves Raided By Police",
    organization: "BuzzFeed News",
    author: "Lam Thuy Vo",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-08-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.buzzfeednews.com/article/lamvo/gentrification-noise-complaints-police",
    preferredPublicUrl: "canonical",
    publicCitation: "Lam Thuy Vo, 'As Wealthy Residents Moved In, These Business Owners Found Themselves Raided By Police,' BuzzFeed News, August 27, 2020.",
    publicNote: "Reports on noise complaints, enforcement, cultural spaces, and M.A.R.C.H.; the article identifies NYC Artist Coalition among its sources.",
    supportsGenerally: [
      "the M.A.R.C.H. and gentrification context circulated by the Page",
      "NYC Artist Coalition identified among the article's sources"
    ],
    doesNotEstablish: [
      "Jamie's individual contribution to the reporting",
      "that the coalition authored the article",
      "a complete causal account",
      "campaign impact"
    ]
  },
  {
    id: "SRC-NYCAC-GRUBSTREET-ODE-TO-BABEL-2019",
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
    publicNote: "Reports neighborhood support for Ode to Babel and the bar's licensing context.",
    supportsGenerally: [
      "one cultural-space continuity story circulated by the Page",
      "reported neighborhood support for Ode to Babel"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition ownership of the outcome",
      "Jamie's individual role",
      "the complete history of the venue",
      "coalition causality"
    ]
  },
  {
    id: "SRC-NYCAC-POND-VENUE-DIVERSITY-2020",
    title: "Why the Future of Venues Depends on Diversity and Inclusivity",
    organization: "Pond Magazine",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-08-25",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.pond-mag.com/culture/2020/8/25/why-the-future-of-venues-depends-on-diversity-inclusivity",
    preferredPublicUrl: "canonical",
    publicCitation: "Pond Magazine, 'Why the Future of Venues Depends on Diversity and Inclusivity,' August 25, 2020.",
    publicNote: "A conversation with Diana Mora and Tracy Adams about diversity, inclusion, and the future of venues.",
    supportsGenerally: [
      "a cultural-space diversity and inclusion context circulated by the Page",
      "the attributed perspectives of Diana Mora and Tracy Adams"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition authorship",
      "Jamie's individual role",
      "agreement by every venue or coalition participant",
      "campaign impact"
    ]
  },
  {
    id: "SRC-NYCAC-GOTHAMIST-BOOK-CULTURE-2020",
    title: "UWS Book Culture Seized By City Marshal Over Unpaid Rent",
    organization: "Gothamist",
    author: "Ben Yakas",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-01-08",
    accessedAt: reviewedAt,
    canonicalUrl: "https://gothamist.com/arts-entertainment/uws-book-culture-seized-city-marshal-over-unpaid-rent",
    preferredPublicUrl: "canonical",
    publicCitation: "Ben Yakas, 'UWS Book Culture Seized By City Marshal Over Unpaid Rent,' Gothamist, January 8, 2020.",
    publicNote: "Reports the seizure and temporary closure of an independent bookstore during a rent dispute.",
    supportsGenerally: [
      "one commercial-rent and neighborhood-culture story circulated by the Page",
      "the reported seizure and closure context"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition authorship",
      "the merits of every party's position",
      "Jamie's individual role",
      "campaign impact"
    ]
  }
] as const;

export const nycacFacebookPosts = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026",
      kind: "public-artifact",
      title: "NYC Artist Coalition Facebook Page post population",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: ["nyc-artist-coalition", "cabaret-law", "office-of-nightlife", "fair-rent-nyc"],
      reason: "Account for the full recovered Page-post population, preserve mission-relevant source routes and operating patterns, and keep population, authorship, collective credit, mutable metrics, stakeholder response, and impact distinct.",
      sourceUrl: "https://www.facebook.com/nycartc/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [...sourceIds],
      observationIds: observationIds.filter(
        (id) => id !== "OBS-NYCAC-FACEBOOK-JAMIE-PUBLISHING-MEMORY"
      ),
      researchInquiryIds: [populationInquiryId, creditInquiryId],
      boundaries: [
        "The 413 public-surface content signatures and 185 native-export post IDs are overlapping controls and must never be added together.",
        "The public repository retains redacted dispositions, public post identifiers and routes, aggregates, selected public sources, and limitations; raw captions, comments, private analytics, people, and access data remain protected.",
        "The native export identifies Page posts but not the publishing administrator.",
        "Posted destinations and mentions establish routing or addressing, not reciprocal engagement, readership, endorsement, adoption, causality, or impact."
      ]
    },
    {
      id: "INTAKE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026",
      kind: "memory-lead",
      title: "Jamie memory of predominant NYC Artist Coalition Page operation",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nyc-artist-coalition"],
      reason: "Preserve Jamie's first-person role memory without upgrading it to verified sole authorship when the native export does not identify administrators and coalition members also published.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: [],
      observationIds: ["OBS-NYCAC-FACEBOOK-JAMIE-PUBLISHING-MEMORY"],
      researchInquiryIds: [creditInquiryId],
      boundaries: [
        "This is Jamie's attributed first-person memory.",
        "Jamie remembers being the predominant operator, not the only person who used the Page.",
        "Native role records or collaborator corroboration are required before public individual attribution is strengthened.",
        "Coalition members and source authors retain credit for their posts, campaigns, events, reporting, images, and ideas."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-NYCAC-FACEBOOK-PUBLIC-CENSUS", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "A completed 522-step forward traversal with 12 stable terminal confirmations recovered 634 candidate cards, 460 distinct normalized records, and 413 conservative content signatures across displayed dates from January 29, 2017 through September 15, 2021.", locator: "Protected forward chronology audit and 413-row redacted public-surface ledger", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The signature count can merge repeated identical posts and is not an exact lifetime post count.", "Deleted, hidden, unavailable, and unrendered records remain outside the public surface.", "A reverse control failed to rehydrate older cards and is retained as a failed control."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-NATIVE-EXPORT", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "Native annual exports contain 185 exact unique Page-post IDs: 111 in 2019, 69 in 2020, and five in 2021, spanning February 6, 2019 through September 15, 2021.", locator: "Protected annual native exports and 185-row redacted native-post ledger", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The exports do not cover the displayed 2017 and 2018 chronology.", "The exports do not establish deletion history or a full lifetime count.", "The export omits publishing-administrator identity."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-OVERLAP-BOUNDARY", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026", project: "nyc-artist-coalition", kind: "limitation",
      text: "The 413 public-surface content signatures and 185 native-export post IDs overlap and are retained as separate controls rather than summed.", locator: "Ledger controls.reconciliation", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The public control has broader displayed chronology but weaker identity precision.", "The native control has exact IDs and dates for fewer years."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-PUBLIC-THEMES", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026", project: "nyc-artist-coalition", kind: "context",
      text: "The 413 public-surface signatures received one primary-theme disposition: 142 cultural-space policy and advocacy, 112 community resource and mutual aid, 75 solidarity and cultural amplification, 51 public meeting and mobilization, 24 coalition governance and listening, and nine source and public knowledge.", locator: "Redacted 413-row publicChronologyDispositions ledger", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-PUBLISHING-OPERATING-SURFACE"], researchInquiryIds: [populationInquiryId],
      limitations: ["Primary-theme classification is interpretive and compresses overlapping concerns.", "Frequency does not measure readership, stakeholder response, adoption, or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-NATIVE-THEMES", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "context",
      text: "The 185 native records received one primary-theme disposition: 116 community resource and mutual aid, 39 cultural-space policy and advocacy, 15 solidarity and cultural amplification, 12 public meeting and mobilization, two coalition governance and listening, and one source and public knowledge.", locator: "Redacted 185-row nativePostDispositions ledger", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-PUBLISHING-OPERATING-SURFACE"], researchInquiryIds: [populationInquiryId],
      limitations: ["This distribution describes the 2019 through 2021 native export only.", "Primary-theme classification is interpretive and does not measure effectiveness."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-DESTINATION-NETWORK", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "The native captions contain 239 public-safe destination occurrences resolving to 83 canonical routes across campaign sites, public events and videos, government records, published reporting, and practical resources.", locator: "Ledger postedDestinationInventory.publicSafeDestinations", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-DESTINATION-NETWORK", "CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["Google working documents, meeting routes, financial-transfer routes, malformed or incidental routes, and participant/profile routes are counted only by protected class.", "A posted route does not establish authorship, endorsement, readership, click-through, response, adoption, causality, or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-CAMPAIGN-ACTION-ROUTES", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "source-fact",
      text: "Frequently repeated public routes include TalksNotRaids.com 40 times, FairRentNYC.com 19 times, the February 2019 M.A.R.C.H. hearing event 18 times, the February 2020 Fair Rent NYC event 19 times, and one coalition M.A.R.C.H. video 12 times.", locator: "Normalized posted-destination occurrence counts", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-PUBLISHING-OPERATING-SURFACE", "CLM-NYCAC-FACEBOOK-DESTINATION-NETWORK"], researchInquiryIds: [populationInquiryId],
      limitations: ["Repeated routing establishes publication practice, not unique campaigns, visitors, conversions, attendance, or outcomes.", "Campaign and event authorship remains collective."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-TRACTION-SNAPSHOT", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "limitation",
      text: "The July 2026 native exports display aggregate lifetime values of 1,006 reactions, 164 comments, and 208 shares across the 185 exported posts.", locator: "Native-export aggregate lifetimeMetricSnapshot", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-TRACTION-SNAPSHOT"], researchInquiryIds: [populationInquiryId],
      limitations: ["The values are mutable and are not unique people or historical snapshots.", "They do not identify stakeholder groups or establish reach, adoption, attendance, endorsement, causality, or impact.", "Per-post reach, click, and engagement fields remain protected."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-PRODUCT-SURFACE-DRIFT", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", project: "nyc-artist-coalition", kind: "limitation",
      text: "Meta Business Suite labeled the Content lifetime as March 31, 2019 through July 14, 2026, while the annual export contains records beginning February 6, 2019.", locator: "Authenticated Content lifetime label and 2019 native export", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The disagreement is retained rather than silently reconciled.", "It does not prove which product surface is historically complete."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-BEDFORD-MARCH", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-BEDFORD-MARCH-2019", project: "talks-not-raids", kind: "source-fact",
      text: "Bedford + Bowery reported on M.A.R.C.H., nightlife operators, coalition testimony, and Brian Abelson's public-record work; the native Page export preserves the article as a posted destination.", locator: "Article body and postedDestinationInventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The article preserves multiple contributors and does not assign the complete work to Jamie.", "Posting the article does not establish its readership or effect."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-CITY-LIMITS-RENT", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-CITY-LIMITS-RENT-COVID-2020", project: "fair-rent-nyc", kind: "source-fact",
      text: "City Limits documented pandemic-era Commercial Rent Stabilization advocacy, legislation, organizational context, and competing positions; the Page routed readers to the article.", locator: "Article body and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The article does not establish Jamie's authorship or coalition control of the wider movement.", "It does not establish passage or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-COMPTROLLER-VACANCY", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYC-COMPTROLLER-RETAIL-VACANCY-2019", project: "fair-rent-nyc", kind: "source-fact",
      text: "The Page routed readers to the NYC Comptroller's official retail-vacancy analysis, joining campaign advocacy to a public data and policy context.", locator: "Official report and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["Routing does not mean the Comptroller endorsed the coalition or its preferred remedy.", "The report does not establish campaign impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-BUZZFEED-MARCH", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-BUZZFEED-MARCH-GENTRIFICATION-2020", project: "talks-not-raids", kind: "source-fact",
      text: "BuzzFeed News reported on gentrification, noise complaints, police enforcement, and M.A.R.C.H., identifying NYC Artist Coalition among its sources; the Page routed readers to the report.", locator: "Article source note and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The article does not establish Jamie's individual contribution to the reporting.", "Source participation does not transfer article authorship or prove campaign causality."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-GRUBSTREET-ODE", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-GRUBSTREET-ODE-TO-BABEL-2019", project: "nyc-artist-coalition", kind: "context",
      text: "The Page circulated Grub Street reporting on neighborhood support for Ode to Babel, a cultural space that also hosted a coalition meeting recovered in the event archive.", locator: "Article body, posted-destination inventory, and Facebook event ledger", status: "corroborated", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The article does not establish NYC Artist Coalition ownership of the venue outcome.", "Meeting-host and article-routing relationships do not establish causality."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-POND-DIVERSITY", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-POND-VENUE-DIVERSITY-2020", project: "nyc-artist-coalition", kind: "context",
      text: "The Page circulated Pond Magazine's attributed conversation with Diana Mora and Tracy Adams about diversity, inclusion, and the future of venues.", locator: "Article body and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["Diana Mora and Tracy Adams retain authorship of their perspectives.", "Posting does not prove agreement by every coalition participant or resulting impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-GOTHAMIST-BOOK-CULTURE", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-GOTHAMIST-BOOK-CULTURE-2020", project: "fair-rent-nyc", kind: "context",
      text: "The Page circulated Gothamist reporting on Book Culture's seizure and closure during a rent dispute as a neighborhood-culture and commercial-rent example.", locator: "Article body and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["The report does not establish the merits of every party's position.", "Posting it does not establish campaign causality or impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-BAFFLER-MARCH", intakeId: "INTAKE-NYCAC-FACEBOOK-POST-POPULATION-2026", sourceId: "SRC-NYCAC-BAFFLER-MARCH", project: "talks-not-raids", kind: "source-fact",
      text: "The Page circulated Liz Pelly's Baffler investigation of M.A.R.C.H. as part of its public explanation and action-routing practice.", locator: "Article record and native posted-destination inventory", status: "verified", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION"], researchInquiryIds: [populationInquiryId],
      limitations: ["Liz Pelly retains article authorship.", "Posting the investigation does not establish readership, stakeholder response, or campaign impact."]
    },
    {
      id: "OBS-NYCAC-FACEBOOK-JAMIE-PUBLISHING-MEMORY", intakeId: "INTAKE-NYCAC-FACEBOOK-PUBLISHING-MEMORY-2026", project: "nyc-artist-coalition", kind: "participant-memory",
      text: "Jamie remembers that he was predominantly the person who used the NYC Artist Coalition Facebook Page while other coalition members used it as well.", locator: "Jamie's July 15, 2026 first-person account", status: "captured", publicSafe: true,
      claimIds: ["CLM-NYCAC-FACEBOOK-PREDOMINANT-PUBLISHER-MEMORY"], researchInquiryIds: [creditInquiryId],
      limitations: ["This is attributed first-person memory, not a native publisher record or collaborator testimonial.", "It does not establish sole administration or authorship of every post."]
    }
  ],

  sources: [...newSources],

  claims: [
    {
      id: "CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION", project: "nyc-artist-coalition",
      internalClaim: "The recovered NYC Artist Coalition Facebook archive has two overlapping controls: 413 conservative public-surface content signatures spanning displayed dates in 2017 through 2021, and 185 exact native Page-post IDs for 2019 through 2021.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The archive retains 413 conservative public-surface content signatures and 185 exact native Page-post IDs as overlapping, non-additive controls.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [
        { sourceId: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026", relationship: "private-support", supports: ["413 conservative public-surface content signatures and the completed forward control"], locator: "Protected public chronology audit", confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", relationship: "private-support", supports: ["185 exact native post IDs and annual chronology"], locator: "Protected annual native exports", confidence: "high", renderCitation: false }
      ],
      boundaries: ["The populations overlap and must never be summed.", "The public-surface count is not an exact lifetime count; the native count covers only 2019 through 2021.", "The failed reverse control and product-surface date disagreement remain documented."],
      antiClaims: ["The Page published 598 posts", "The Page has exactly 413 lifetime posts", "The 185 native posts cover the complete 2017 through 2021 chronology", "The reverse traversal independently confirmed every public-surface record"],
      researchInquiryIds: [populationInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-PUBLISHING-OPERATING-SURFACE", project: "nyc-artist-coalition",
      internalClaim: "Across the recovered Page population, NYC Artist Coalition used Facebook as a shared operating surface for coalition listening, recurring meetings, campaign action, public-source circulation, cultural-space solidarity, and practical relief resources.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The recovered Page functioned as a shared operating surface for meetings, campaign action, public sources, cultural-space solidarity, and practical resources.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [
        { sourceId: "SRC-NYCAC-FACEBOOK-PUBLIC-CHRONOLOGY-AUDIT-2026", relationship: "private-support", supports: ["the 413-row theme and route disposition"], locator: "Redacted public-surface ledger", confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", relationship: "private-support", supports: ["the 185-row native disposition and repeated action routes"], locator: "Redacted native-post ledger", confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-FACEBOOK-PAGE-POSTS-2026", relationship: "corroborating", supports: ["the surviving public Page identity"], confidence: "moderate", renderCitation: false }
      ],
      boundaries: ["The operating pattern is collective and does not identify a sole publisher or author.", "One-primary-theme classification is interpretive.", "Publication practice does not prove audience response or impact."],
      antiClaims: ["Jamie alone authored and published every Page post", "Every post was an official coalition consensus statement", "The Page's repeated actions prove policy outcomes", "Every tagged official reciprocally engaged"],
      researchInquiryIds: [populationInquiryId, creditInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-DESTINATION-NETWORK", project: "nyc-artist-coalition",
      internalClaim: "The 2019 through 2021 native captions contain 239 public-safe route occurrences resolving to 83 canonical destinations across campaigns, public events and videos, government records, reporting, and practical resources.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The native corpus preserves 239 public-safe route occurrences resolving to 83 canonical destinations, while sensitive working, meeting, financial, and participant routes remain protected.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", relationship: "private-support", supports: ["normalized posted public-destination counts and categories"], locator: "postedDestinationInventory", confidence: "high", renderCitation: false }],
      boundaries: ["Sensitive and relationship-bearing routes are withheld by class.", "A posted destination is a routing action, not an endorsement, click, response, partnership, or outcome."],
      antiClaims: ["All 83 destinations were formal coalition partners", "Every posted article covered NYC Artist Coalition", "The route counts measure readership or conversion", "A Page tag or posted route proves reciprocal stakeholder engagement"],
      researchInquiryIds: [populationInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-MISSION-SOURCE-CIRCULATION", project: "nyc-artist-coalition",
      internalClaim: "The Page repeatedly connected coalition actions to public reporting, official data, cultural-space testimony, and practical resources, creating a source-backed public knowledge and action layer across M.A.R.C.H., Commercial Rent Stabilization, neighborhood culture, venue diversity, and pandemic relief.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The Page repeatedly connected coalition actions with public reporting, official data, cultural-space testimony, and practical resources.", status: "active", citationRequired: true, surfaces: [reportPath] }],
      evidence: [
        { sourceId: "SRC-NYCAC-BEDFORD-MARCH-2019", relationship: "direct-support", supports: ["M.A.R.C.H. testimony, public-record work, and coalition context"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-BAFFLER-MARCH", relationship: "direct-support", supports: ["reported M.A.R.C.H. context circulated by the Page"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-CITY-LIMITS-RENT-COVID-2020", relationship: "direct-support", supports: ["pandemic Commercial Rent Stabilization context and competing positions"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYC-COMPTROLLER-RETAIL-VACANCY-2019", relationship: "direct-support", supports: ["official retail-vacancy data context"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-BUZZFEED-MARCH-GENTRIFICATION-2020", relationship: "corroborating", supports: ["M.A.R.C.H., gentrification, enforcement, and NYC Artist Coalition source context"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-GRUBSTREET-ODE-TO-BABEL-2019", relationship: "context", supports: ["one neighborhood cultural-space continuity story"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-POND-VENUE-DIVERSITY-2020", relationship: "context", supports: ["attributed venue diversity and inclusion perspectives"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-GOTHAMIST-BOOK-CULTURE-2020", relationship: "context", supports: ["one commercial-rent and neighborhood-culture example"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Each source supports only its stated proposition and retains its own authorship.", "Posting a source does not establish endorsement by its publisher, readership, stakeholder response, or campaign impact.", "The selected sources are examples within a larger destination inventory, not a complete public bibliography."],
      antiClaims: ["NYC Artist Coalition authored the linked reporting", "Every linked source endorsed every coalition proposal", "Jamie personally wrote or selected every link", "Source circulation proves policy causality"],
      researchInquiryIds: [populationInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-TRACTION-SNAPSHOT", project: "nyc-artist-coalition",
      internalClaim: "The July 2026 native exports display aggregate lifetime values of 1,006 reactions, 164 comments, and 208 shares across 185 posts.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A mutable July 2026 export snapshot displays 1,006 reactions, 164 comments, and 208 shares across 185 posts; the values are retained as labels, not people, stakeholder groups, or impact.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026", relationship: "private-support", supports: ["aggregate lifetime reaction, comment, and share labels"], locator: "lifetimeMetricSnapshot", confidence: "high", renderCitation: false }],
      boundaries: ["The values are mutable and are not unique people or historical snapshots.", "They do not identify stakeholder groups or measure reach, adoption, attendance, endorsement, causality, or impact.", "Per-post analytics remain protected."],
      antiClaims: ["1,378 people engaged with NYC Artist Coalition", "The metrics count elected officials or key stakeholder groups", "The totals measure campaign impact", "The values are a historical launch-time snapshot"],
      researchInquiryIds: [populationInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-PREDOMINANT-PUBLISHER-MEMORY", project: "nyc-artist-coalition",
      internalClaim: "Jamie remembers that he was predominantly the person who used the NYC Artist Coalition Facebook Page while other coalition members also published.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "Jamie remembers being the predominant Page operator while others also published; individual attribution remains held pending stronger evidence.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [],
      boundaries: ["This is Jamie's attributed first-person memory.", "The native export does not identify administrators or publishers.", "Other coalition members also used the Page and collective credit remains required."],
      antiClaims: ["Jamie was the verified sole administrator", "Jamie authored every post", "Other coalition members never published", "The native export proves individual publisher identity"],
      researchInquiryIds: [creditInquiryId], reviewedAt, reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],

  researchInquiries: [
    {
      id: populationInquiryId, project: "nyc-artist-coalition",
      question: "Can the full recovered NYC Artist Coalition Facebook Page-post population receive a public-safe disposition while preserving mission-relevant sources, routing, traction, and completeness boundaries?",
      methods: [
        "Completed an authenticated forward traversal through stable terminal state and retained the failed reverse-rehydration control.",
        "Generated native annual Meta Business Suite Page-post exports for 2019, 2020, and 2021.",
        "Reconciled the public chronology and native exports as overlapping controls rather than summing them.",
        "Assigned one redacted primary theme and route class to every recovered public-surface signature and native post ID.",
        "Normalized posted public destinations while withholding working documents, meeting routes, financial routes, and participant/profile relationships.",
        "Aggregated mutable metrics without exposing per-post analytics or treating values as people, stakeholder groups, or impact.",
        "Close-read selected public sources and preserved source authorship and proposition-level limits."
      ],
      runAt: reviewedAt, resultStatus: "partially-recovered",
      findings: [
        "All 413 conservative public-surface content signatures and 185 exact native post IDs received redacted dispositions.",
        "The public chronology displays dates from 2017 through 2021, while the exact native exports cover 2019 through 2021.",
        "The two populations overlap and cannot be added.",
        "The Page repeatedly connected meetings, campaign actions, public evidence, cultural-space solidarity, and practical relief resources.",
        "The native corpus contains 239 public-safe route occurrences resolving to 83 canonical destinations.",
        "Selected reporting and official records mature mission-relevant source relationships; sensitive routes remain protected.",
        "Aggregate lifetime metrics remain a bounded mutable snapshot, not stakeholder engagement or impact."
      ],
      limitations: [
        "The public Page cannot expose deleted, hidden, or unavailable records.",
        "The reverse traversal did not rehydrate older cards and therefore did not independently reproduce the public chronology.",
        "The annual export process did not recover a comparable native export for 2017 or 2018.",
        "Raw captions, comments, per-post private analytics, people, access state, and sensitive routes remain outside the public repository.",
        "Posting and addressing do not establish reciprocal stakeholder engagement, readership, endorsement, adoption, causality, or impact."
      ],
      sourceIds: [...sourceIds],
      publicSummary: "Every recovered public-surface signature and native post ID received a public-safe disposition. The archive preserves a coherent shared publishing practice across meetings, campaigns, evidence, solidarity, and practical resources while keeping population, credit, mutable metrics, and impact bounded.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-POST-POPULATION-2026-001"
    },
    {
      id: creditInquiryId, project: "nyc-artist-coalition",
      question: "What can the recovered Page evidence establish about Jamie's individual publishing role, and what remains open?",
      methods: [
        "Recorded Jamie's first-person memory as a separate attributed intake.",
        "Inspected the native export schema for publisher or administrator identity.",
        "Separated Page operation from post authorship, campaign authorship, source authorship, and coalition ownership.",
        "Defined native role records or collaborator corroboration as the next evidence threshold."
      ],
      runAt: reviewedAt, resultStatus: "partially-recovered",
      findings: [
        "Jamie remembers being the predominant Page operator.",
        "Jamie also remembers that other coalition members used the Page.",
        "The native export identifies the Page and public posts but not the publishing administrator.",
        "The recovered population supports a coherent shared publishing system without resolving post-by-post individual credit."
      ],
      limitations: [
        "First-person memory is not independent corroboration.",
        "The export lacks a publisher field.",
        "The public Page does not provide a complete historical administrator ledger.",
        "Individual attribution must not erase coalition, campaign, event, source, image, or participant authorship."
      ],
      sourceIds: ["SRC-NYCAC-FACEBOOK-PAGE-POSTS-2026", "SRC-NYCAC-FACEBOOK-NATIVE-EXPORT-2026"],
      publicSummary: "The Page record supports a coherent shared publishing system. Jamie's memory of predominant operation remains attributed and held until stronger role evidence is recovered.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-PUBLISHING-CREDIT-2026-001"
    }
  ]
};
