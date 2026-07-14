const reviewedAt = "2026-07-14";

export const kcTownHallPopulationAudit = {
  profileCountObserved: 183,
  postsTabItemsRecovered: 170,
  repliesTabItemsRecovered: 183,
  accountPostsRecovered: 142,
  accountRepliesRecovered: 13,
  accountAuthoredStatusesRecovered: 155,
  repostsRecovered: 28,
  distinctRepostSourceAccounts: 16,
  uniqueItemsRecovered: 183,
  excludedConversationContextItems: 5,
  unresolvedPopulationSlots: 0,
  dispositionTotal: 183,
  ledgerPath: "docs/knowledge-bank/data/kctownhall-public-post-ledger.json"
} as const;

export const kcTownHallCorpusFindings = {
  tireWorkflowRecords: 100,
  tireWorkflowAccountPosts: 96,
  tireWorkflowAccountReplies: 3,
  tireWorkflowReposts: 1,
  civicInformationRecords: 26,
  neighborhoodCultureRecords: 27,
  townHallDevelopmentRecords: 16,
  racialJusticeRecords: 12,
  pandemicResourceRecords: 2,
  distinctExternalHandlesInAuthoredRecords: 35,
  quintonLucasMentionsInAuthoredRecords: 26,
  melissaRobinsonMentionsInAuthoredRecords: 23,
  repostSourceStatuses: 28,
  cityPoliticalFigureRepostStatuses: 9,
  directCouncilMemberResponseStatuses: 2,
  directCouncilMemberAccounts: 2,
  shortUrlOccurrences: 133,
  uniqueShortUrls: 31,
  uniqueResolvedDestinations: 20,
  uniqueProjectOrLineageDestinations: 9,
  authoredStatusesWithVisibleReaction: 77,
  authoredVisibleReplies: 22,
  authoredVisibleReposts: 70,
  authoredVisibleLikes: 174
} as const;

export const kcTownHallSocialCorpus = {
  intakeItems: [{
    id: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
    kind: "public-artifact",
    title: "Full-population archival production for @KCTownHall",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    projectIds: ["kc-town-hall"],
    reason: "Reconcile every item in the 183-post surviving profile population, preserve every posted URL, and mature bounded findings about resident-service operations, civic information, stakeholder response, neighborhood culture, and visible traction.",
    sourceUrl: "https://x.com/KCTownHall",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      "SRC-X-KCTH-TIRES-LAUNCH-2019-05-03",
      "SRC-X-KCTH-TIRES-2019-YEAR-END",
      "SRC-X-KCTH-TIRES-2021-YEAR-END",
      "SRC-X-KCTH-TIRES-2022-MAY",
      "SRC-X-KCTH-LEONS-PROMPT-2019-04-29",
      "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
      "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
      "SRC-KCMO-COUNCIL-ROSTER-2018",
      "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
      "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
      "SRC-KANSAS-CITY-STAR-LEONS-THRIFTWAY",
      "SRC-CURBED-RENT-RELIEF-ACT-2018"
    ],
    observationIds: [
      "OBS-KCTH-FULL-POPULATION-DISPOSITION",
      "OBS-KCTH-TIRE-WORKFLOW-CORPUS",
      "OBS-KCTH-MISSION-BREADTH",
      "OBS-KCTH-STAKEHOLDER-TOUCHPOINTS",
      "OBS-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR",
      "OBS-KCTH-POSTED-URL-INVENTORY",
      "OBS-KCTH-PUBLIC-KNOWLEDGE-ROUTING",
      "OBS-KCTH-VISIBLE-REACTION-SNAPSHOT"
    ],
    researchInquiryIds: [
      "INQ-KCTH-FULL-POPULATION-2026",
      "INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES",
      "INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP"
    ],
    boundaries: [
      "All 183 items in the July 2026 profile control were recovered at item level; this is not a platform export or proof that no earlier item was deleted before capture.",
      "The shared account does not identify the individual teammate who authored each post or reply.",
      "A mention, reply, repost, linked article, or visible reaction does not by itself establish partnership, endorsement, adoption, causality, or impact.",
      "Project-reported tire and fee figures require independent reconciliation before stronger public use.",
      "Phone numbers, street addresses, direct messages, authentication data, and private service records are not reproduced in the repository."
    ]
  }],

  observations: [
    {
      id: "OBS-KCTH-FULL-POPULATION-DISPOSITION",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Authenticated Posts and Replies passes recovered all 183 items in the live profile control: 142 account posts, 13 account replies, and 28 reposts from 16 public source accounts.",
      locator: "Population audit and 183 item-level records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COMPLETE-SOCIAL-POPULATION"],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      limitations: [
        "The recovery is not an X export, deletion history, withheld-status log, or historical analytics report.",
        "Complete surviving population does not mean no earlier item was deleted before capture."
      ]
    },
    {
      id: "OBS-KCTH-TIRE-WORKFLOW-CORPUS",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "One hundred of the 183 surviving records concern the Tired of Tires workflow: 96 account posts, three account replies, and one repost used for resident intake, pickup coordination, result reporting, or program continuity.",
      locator: "records classified resident-tire-intake-and-operations",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-SOCIAL-SERVICE-REPORTING"],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      limitations: [
        "Classification establishes the account's recurring public operating pattern, not an audited pickup or household-service ledger.",
        "The shared account does not establish which teammate authored each record or performed each pickup."
      ]
    },
    {
      id: "OBS-KCTH-MISSION-BREADTH",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "context",
      text: "Beyond the tire workflow, the corpus contains 27 neighborhood-culture and community records, 26 civic-information and service-routing records, 16 Town Hall development and participation records, 12 racial-justice documentation records, and two pandemic-resource records.",
      locator: "aggregateFindings.primaryThemeCounts",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PUBLIC-IDENTITY-MISSION-BREADTH"],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      limitations: [
        "Themes are an editorial classification of public records rather than proof of project ownership or outcome.",
        "A single primary theme simplifies records that may serve several public functions."
      ]
    },
    {
      id: "OBS-KCTH-STAKEHOLDER-TOUCHPOINTS",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "context",
      text: "The 155 account-authored records mention 35 external handles. The 28 reposts come from 16 accounts spanning city leadership and government, schools, transit, neighborhood organizations, residents, and local media; nine source statuses were authored by Quinton Lucas, Melissa Robinson, or Jolie Justus.",
      locator: "aggregateFindings.repostNetwork and records[].publicMentions",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PUBLIC-IDENTITY-MISSION-BREADTH", "CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR"],
      researchInquiryIds: ["INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES"],
      limitations: [
        "Most of these records are project outreach or project-selected amplification, not engagement authored by an outside stakeholder.",
        "A mention or repost does not establish partnership, endorsement, account use, or organizational affiliation."
      ]
    },
    {
      id: "OBS-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Two then-sitting Kansas City Council members authored direct public responses to @KCTownHall in the April 29, 2019 Leon's Thriftway exchange: Quinton Lucas quote-posted the account and Jolie Justus replied to it.",
      locator: "Statuses 1122866432130334720 and 1122883010582466560; official 2018 Council roster",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR"],
      researchInquiryIds: ["INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES"],
      limitations: [
        "This is a recoverable direct-response floor, not the account's complete lifetime engagement count.",
        "The exchange documents public response and concern; it does not establish partnership, project adoption, or the outcome of efforts concerning the grocery store."
      ]
    },
    {
      id: "OBS-KCTH-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The corpus preserves 133 short-link occurrences: 31 unique short URLs resolving to 20 unique public destinations, including nine KC Town Hall or direct-lineage destinations.",
      locator: "aggregateFindings.postedLinks and records[].postedUrls",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PUBLIC-IDENTITY-MISSION-BREADTH"],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      limitations: [
        "Current redirect resolution does not prove historical availability or continuity.",
        "A posted destination does not establish authorship, partnership, adoption, or impact."
      ]
    },
    {
      id: "OBS-KCTH-PUBLIC-KNOWLEDGE-ROUTING",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "context",
      text: "Mission-relevant external destinations include local election guidance, voter registration, affordable-housing reporting, public-transit information, and reporting about Leon's Thriftway, alongside KC Town Hall participation, survey, temporary-electricity, tire-service, and COVID-19 pages.",
      locator: "aggregateFindings.postedLinks.resolvedDestinations",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PUBLIC-IDENTITY-MISSION-BREADTH"],
      researchInquiryIds: [],
      limitations: [
        "The external sources provide mission context and resident routing; they are not necessarily press coverage of KC Town Hall.",
        "Sharing a public resource does not establish authorship, endorsement of every proposition, or resulting resident action."
      ]
    },
    {
      id: "OBS-KCTH-VISIBLE-REACTION-SNAPSHOT",
      intakeId: "INTAKE-KCTH-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      project: "kc-town-hall",
      kind: "limitation",
      text: "At the July 2026 public snapshot, 77 of 155 account-authored statuses displayed at least one reaction; visible totals were 22 replies, 70 reposts, and 174 likes.",
      locator: "aggregateFindings.accountAuthoredVisibleReactionSnapshot",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-VISIBLE-TRACTION-SNAPSHOT"],
      researchInquiryIds: ["INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES"],
      limitations: [
        "The counts are mutable current interface observations, not contemporaneous analytics.",
        "They do not establish unique people, impressions, clickthrough, service completion, causality, or impact.",
        "Metrics on the 28 reposted source statuses belong to those source posts and are excluded."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      title: "Authenticated @KCTownHall full-population recovery and public-post ledger",
      organization: "KC Town Hall",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/feature/evals-A/docs/knowledge-bank/data/kctownhall-public-post-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation: "Authenticated read-only review of the public @KCTownHall Posts and Replies surfaces, with a 183-record public-safe ledger, July 14, 2026.",
      publicNote: "The profile displayed 183 posts. Cross-tab reconciliation recovered all 183 surviving items: 142 account posts, 13 account replies, and 28 reposts from 16 public accounts. The ledger preserves posted destinations, bounded classifications, and mutable reaction snapshots without reproducing post text, phone numbers, or street addresses.",
      supportsGenerally: [
        "100 percent item-level recovery of the 183-item surviving profile control",
        "142 account posts, 13 account replies, and 28 reposts from 16 public source accounts",
        "100 records in the recurring tire-service workflow",
        "133 posted short-link occurrences resolving to 20 unique public destinations",
        "two direct responses authored by sitting Kansas City Council members",
        "bounded mission, stakeholder, and visible-reaction patterns"
      ],
      doesNotEstablish: [
        "a platform export, deletion history, or proof that no earlier item was removed",
        "the individual teammate who authored each shared-account record",
        "private messages, historical analytics, unique people reached, clickthrough, adoption, or service outcomes",
        "independent verification of project-reported tire or avoided-fee figures",
        "partnership, endorsement, or sole credit from mentions, replies, reposts, or linked sources"
      ]
    },
    {
      id: "SRC-X-KCTH-TIRES-LAUNCH-2019-05-03",
      title: "KC Town Hall Tired of Tires launch post",
      organization: "KC Town Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-05-03",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/KCTownHall/status/1124416898064580608",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Town Hall post launching free resident tire pickup with the Oak Park neighborhood, May 3, 2019.",
      publicNote: "The post solicits resident locations for a recurring pickup program. Contact details and addresses are intentionally not reproduced.",
      supportsGenerally: ["public launch of the tire-pickup workflow", "resident intake", "Oak Park neighborhood collaboration"],
      doesNotEstablish: ["individual authorship", "complete service volume", "sole credit", "independently audited outcomes"]
    },
    {
      id: "SRC-X-KCTH-LEONS-PROMPT-2019-04-29",
      title: "KC Town Hall public prompt concerning Leon's Thriftway",
      organization: "KC Town Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-04-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/KCTownHall/status/1122859036163170304",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Town Hall public post asking whether Leon's Thriftway could be kept open, April 29, 2019.",
      publicNote: "The account tagged public officials and linked reporting about the Black-owned grocery store.",
      supportsGenerally: ["public issue prompt", "outreach to public officials", "linked Leon's Thriftway reporting"],
      doesNotEstablish: ["the grocery store's complete history", "the outcome of preservation efforts", "formal partnership", "individual post authorship"]
    },
    {
      id: "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
      title: "Quinton Lucas quote-post responding to KC Town Hall",
      author: "Quinton Lucas",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-04-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/QuintonLucasKC/status/1122866432130334720",
      preferredPublicUrl: "canonical",
      publicCitation: "Then-Councilmember Quinton Lucas quote-post responding to @KCTownHall about Leon's Thriftway, April 29, 2019.",
      publicNote: "Lucas said he had spoken with ownership and was exploring whether the store could remain open.",
      supportsGenerally: ["direct quote-post response to @KCTownHall", "public concern about East Kansas City food access"],
      doesNotEstablish: ["formal partnership", "project adoption", "the outcome of preservation efforts", "endorsement of every KC Town Hall activity"]
    },
    {
      id: "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
      title: "Jolie Justus reply to KC Town Hall",
      author: "Jolie Justus",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-04-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/joliejustus/status/1122883010582466560",
      preferredPublicUrl: "canonical",
      publicCitation: "Then-Councilmember Jolie Justus reply to @KCTownHall about Leon's Thriftway, April 29, 2019.",
      publicNote: "Justus said work with the Economic Development Corporation and community was underway on possible solutions.",
      supportsGenerally: ["direct public reply to @KCTownHall", "public discussion of possible solutions"],
      doesNotEstablish: ["formal partnership", "project adoption", "the outcome of preservation efforts", "endorsement of every KC Town Hall activity"]
    },
    {
      id: "SRC-KCMO-COUNCIL-ROSTER-2018",
      title: "KCMOre Fall and Winter 2018 City Council roster",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/12/636943889997730000",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, KCMOre Fall and Winter 2018 Council roster.",
      publicNote: "Official city publication identifying Quinton Lucas and Jolie Justus as members of the City Council during the 2015-2019 Council term.",
      supportsGenerally: ["Quinton Lucas as Third District At-Large Councilmember", "Jolie Justus as Fourth District Councilmember"],
      doesNotEstablish: ["control of a social account", "authorship of a particular post", "engagement with KC Town Hall", "project adoption or endorsement"]
    },
    {
      id: "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
      title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
      organization: "KCUR",
      author: "Erica Hunzinger",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-08-05",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
      preferredPublicUrl: "canonical",
      publicCitation: "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
      publicNote: "A public election guide routed by the account as resident-facing civic information.",
      supportsGenerally: ["2018 election-guide context", "resident-facing voting information"],
      doesNotEstablish: ["coverage of KC Town Hall", "KC Town Hall authorship", "reader action", "electoral impact"]
    },
    {
      id: "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
      title: "Affordable Housing Policy hits the docket in KCMO",
      organization: "Northeast News",
      author: "Paul Thompson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-09-19",
      accessedAt: reviewedAt,
      canonicalUrl: "https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
      preferredPublicUrl: "canonical",
      publicCitation: "Paul Thompson, 'Affordable Housing Policy hits the docket in KCMO,' Northeast News, September 19, 2018.",
      publicNote: "Local reporting routed by the account as context for affordable-housing policy and civic participation.",
      supportsGenerally: ["September 2018 affordable-housing policy context", "Kansas City Housing Committee activity"],
      doesNotEstablish: ["coverage of KC Town Hall", "KC Town Hall authorship", "project influence on the policy package", "reader action"]
    },
    {
      id: "SRC-KANSAS-CITY-STAR-LEONS-THRIFTWAY",
      title: "Kansas City Star reporting about Leon's Thriftway",
      organization: "The Kansas City Star",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kansascity.com/news/business/article87241897.html",
      preferredPublicUrl: "canonical",
      publicCitation: "The Kansas City Star reporting about Leon's Thriftway, linked by @KCTownHall in April 2019.",
      publicNote: "The account used this article as context for a public prompt about the store. Current access may be limited by the publisher.",
      supportsGenerally: ["the destination linked in the April 2019 public prompt", "public reporting context concerning Leon's Thriftway"],
      doesNotEstablish: ["coverage of KC Town Hall", "the result of the public exchange", "formal partnership", "KC Town Hall authorship"]
    },
    {
      id: "SRC-CURBED-RENT-RELIEF-ACT-2018",
      title: "Kamala Harris proposes tax credits for renters",
      organization: "Curbed",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-07-20",
      accessedAt: reviewedAt,
      canonicalUrl: "https://archive.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
      preferredPublicUrl: "canonical",
      publicCitation: "Curbed reporting on a proposed rent-relief tax credit, July 20, 2018.",
      publicNote: "A housing-policy article preserved through a Quinton Lucas post reposted by KC Town Hall.",
      supportsGenerally: ["housing-policy context circulated in the account corpus", "the destination of one reposted source status"],
      doesNotEstablish: ["coverage of KC Town Hall", "KC Town Hall endorsement of every policy detail", "policy adoption", "project impact"]
    }
  ],

  claims: [
    {
      id: "CLM-KCTH-COMPLETE-SOCIAL-POPULATION",
      project: "kc-town-hall",
      internalClaim: "All 183 items in the July 2026 @KCTownHall profile control were recovered and dispositioned: 142 account posts, 13 account replies, and 28 reposts.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "All 183 items in the surviving KC Town Hall profile population are preserved as a bounded public-safe ledger.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["183-item population reconciliation and account-relationship counts"], confidence: "high", renderCitation: false }],
      boundaries: ["Say complete surviving profile population, not complete lifetime account history.", "The ledger is not a platform export and does not reproduce raw post text."],
      antiClaims: ["No KC Town Hall post was ever deleted.", "The ledger contains private messages or account analytics.", "Every post was authored by Jamie."],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR",
      project: "kc-town-hall",
      internalClaim: "At least two then-sitting Kansas City Council members authored direct public responses to @KCTownHall: Quinton Lucas and Jolie Justus in an April 2019 Leon's Thriftway exchange.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "A recoverable engagement floor includes direct public responses from two sitting Kansas City Council members.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29", relationship: "direct-support", supports: ["Quinton Lucas quote-post response to @KCTownHall"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29", relationship: "direct-support", supports: ["Jolie Justus direct reply to @KCTownHall"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-KCMO-COUNCIL-ROSTER-2018", relationship: "corroborating", supports: ["both authors' Council roles in the applicable Council term"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Treat two as a recoverable direct-response floor, not a lifetime total.", "Keep project outreach, project-selected reposts, and outside-authored direct response as separate interaction types."],
      antiClaims: ["Nine Council members engaged with KC Town Hall.", "Every tagged official responded.", "The exchange proves formal adoption, endorsement, or a successful grocery-store outcome."],
      researchInquiryIds: ["INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCTH-PUBLIC-IDENTITY-MISSION-BREADTH",
      project: "kc-town-hall",
      internalClaim: "KC Town Hall's shared public identity combined recurring resident-service operations with civic information, neighborhood culture, project participation, racial-justice documentation, and pandemic-resource routing.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The account joined recurring neighborhood operations to civic information, public participation, cultural memory, and care.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["complete-corpus theme counts and posted destination inventory"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018", relationship: "context", supports: ["one resident-facing election resource routed by the account"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", relationship: "context", supports: ["one affordable-housing policy resource routed by the account"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Theme classification describes the public account record, not Jamie's sole authorship or project outcomes.", "Linked sources are resident-routing context, not necessarily press coverage of KC Town Hall."],
      antiClaims: ["KC Town Hall authored every linked resource.", "Every repost establishes partnership.", "The social corpus alone proves community impact."],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KCTH-VISIBLE-TRACTION-SNAPSHOT",
      project: "kc-town-hall",
      internalClaim: "At the July 2026 public snapshot, 77 of 155 account-authored statuses displayed at least one reaction, totaling 22 replies, 70 reposts, and 174 likes.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A July 2026 interface snapshot preserves limited visible reactions on the surviving account-authored corpus; it is not used as an impact claim.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["July 2026 visible reaction snapshot for account-authored statuses"], confidence: "high", renderCitation: false }],
      boundaries: ["The totals are current interface observations rather than contemporaneous analytics.", "Exclude source-post metrics on reposts from KC Town Hall traction."],
      antiClaims: ["The visible counts measure historical reach.", "The counts represent unique people or completed services.", "Source-status reactions belong to KC Town Hall."],
      researchInquiryIds: ["INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-KCTH-FULL-POPULATION-2026",
      project: "kc-town-hall",
      question: "Can the full surviving population of @KCTownHall posts be recovered, classified, linked, and integrated without overstating completeness, authorship, service outcomes, or impact?",
      methods: [
        "Used the authenticated live profile's displayed 183-post count as the control total.",
        "Harvested the Posts and Replies surfaces separately and deduplicated every rendered item by canonical status ID.",
        "Reconciled 170 Posts-surface items with 13 additional account replies from the Replies surface, excluding five other-account conversation-context items.",
        "Resolved all 31 unique short URLs, then classified every record by account relationship, primary theme, public mentions, hashtags, destination, media signals, and visible-reaction boundary.",
        "Closely read high-signal public destinations while distinguishing source context from coverage of KC Town Hall."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "All 183 items in the live-profile control were recovered with unique status IDs.",
        "The population contains 142 account posts, 13 account replies, and 28 reposts from 16 other public accounts.",
        "One hundred records document the recurring Tired of Tires operating workflow.",
        "The corpus preserves 133 short-link occurrences resolving to 20 unique public destinations.",
        "The public identity also routed civic information, neighborhood culture, participation, racial-justice documentation, and pandemic resources."
      ],
      limitations: [
        "A complete current profile population does not prove that no record was deleted before July 2026.",
        "The shared account does not identify the individual teammate who composed each post.",
        "The social record is not a resident-service ledger, project-accounting system, historical analytics export, or independent audit of self-reported figures.",
        "A repost or outbound link does not make KC Town Hall the author or organizer of the underlying work.",
        "Visible reactions are mutable snapshots and are not historical reach or impact measures."
      ],
      sourceIds: [
        "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
        "SRC-X-KCTH-TIRES-LAUNCH-2019-05-03",
        "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
        "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
        "SRC-KANSAS-CITY-STAR-LEONS-THRIFTWAY",
        "SRC-CURBED-RENT-RELIEF-ACT-2018"
      ],
      publicSummary: "All 183 profile-counted KC Town Hall records were recovered and classified, showing a shared public identity used for recurring neighborhood service, civic information, participation, culture, and care."
    },
    {
      id: "INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES",
      project: "kc-town-hall",
      question: "Which records can establish historical reach, direct stakeholder response, independently reconciled service volume, resident outcomes, or resulting public action beyond the social corpus?",
      methods: [
        "Separated project-authored mentions, outside-authored direct responses, project-selected reposts, and visible reaction counts.",
        "Cross-checked direct elected-official responses against an official City Council roster.",
        "Kept July 2026 visible reactions and project-reported tire figures separate from independently verified outcomes.",
        "Flagged service ledgers, disposal receipts, collaborator proofs, public records, and contemporaneous analytics as separate future evidence classes."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Two sitting Council members authored direct public responses in one April 2019 exchange.",
        "Nine reposted source statuses came from three city political figures, but only two records meet the direct-response definition.",
        "The corpus establishes recurring operating and reporting behavior, not independently reconciled service volume or resident outcomes.",
        "Current visible reactions preserve a bounded snapshot but not historical reach."
      ],
      limitations: [
        "The recovered direct-response count is a floor and may omit deleted, unavailable, or search-suppressed records.",
        "Mentions and reposts are not equivalent to outside-authored engagement.",
        "Project self-reporting should not be converted into audited impact without corroborating records.",
        "Account-level evidence does not establish Jamie's individual authorship or sole delivery."
      ],
      sourceIds: [
        "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
        "SRC-X-KCTH-LEONS-PROMPT-2019-04-29",
        "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
        "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
        "SRC-KCMO-COUNCIL-ROSTER-2018"
      ],
      publicSummary: "The corpus preserves a two-member direct-response floor and a broader stakeholder network while keeping outreach, amplification, current reactions, and independently verified outcomes separate."
    },
    {
      id: "INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP",
      project: "kc-town-hall",
      question: "Which teammates authored, administered, or stewarded @KCTownHall during each project period?",
      methods: [
        "Treat the account as a collective public identity unless individual authorship is independently established.",
        "Seek public-safe collaborator proofs, versioned communications plans, approved administrative records, or contemporaneous authored artifacts.",
        "Keep account creation, account stewardship, post authorship, program design, and field delivery as separate propositions."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "The public corpus establishes the shared account's operating behavior but not individual post authorship.",
        "Jamie's wider KC Town Hall role has separate evidence in the knowledge bank; it should not be inferred from every shared-account record."
      ],
      limitations: [
        "Public profile metadata does not expose creator or administrator history.",
        "Writing style, timing, technical custody, or proximity alone cannot identify an author.",
        "Private account credentials or session records must not enter the public repository."
      ],
      sourceIds: ["SRC-X-KCTH-FULL-POPULATION-AUDIT-2026"],
      publicSummary: "The account is treated as a collective project identity until post-level or period-level stewardship can be established safely."
    }
  ]
} as const;
