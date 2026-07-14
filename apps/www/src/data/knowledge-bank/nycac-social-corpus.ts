const reviewedAt = "2026-07-14";

export const nycacPopulationAudit = {
  profileCountObserved: 5124,
  uniqueItemsRecovered: 1026,
  accountPostsRecovered: 309,
  accountRepliesRecovered: 33,
  accountAuthoredStatusesRecovered: 342,
  nativeRepostSourceStatusesRecovered: 684,
  distinctRepostSourceAccounts: 216,
  unresolvedPopulationSlots: 4098,
  dispositionTotal: 5124,
  ledgerPath: "docs/knowledge-bank/data/nycartc-public-post-ledger.json"
} as const;

export const nycacCorpusFindings = {
  campaignSignalCounts: {
    fairRentNyc: 104,
    letNycDance: 101,
    saveNycSpaces: 98,
    talksNotRaids: 16
  },
  directOutsideAuthoredMentionStatuses: 25,
  directOutsideAuthoredMentionAccounts: 13,
  shortUrlOccurrences: 536,
  uniqueShortUrls: 408,
  resolvedShortUrls: 384,
  unresolvedShortUrls: 24,
  uniqueResolvedDestinations: 345,
  linkedSourcesCloselyRead: 10,
  authoredStatusesWithVisibleReaction: 311,
  authoredVisibleReplies: 11,
  authoredVisibleReposts: 544,
  authoredVisibleLikes: 1111
} as const;

const linkedArticleSourceIds = [
  "SRC-NYCAC-BAFFLER-MARCH",
  "SRC-NYCAC-X-LINK-HELLGATE-SAINT-VITUS-2024",
  "SRC-NYCAC-X-LINK-HELLGATE-LUCYS-2024",
  "SRC-NYCAC-X-LINK-HELLGATE-CURE-2025",
  "SRC-NYCAC-X-LINK-PITCHFORK-QUEER-NIGHTLIFE-2023",
  "SRC-NYCAC-X-LINK-ABC7-MORSCHERS-2024",
  "SRC-NYCAC-X-LINK-404MEDIA-TICKETMASTER-2024",
  "SRC-NYCAC-X-LINK-CITYSTATE-COMMERCIAL-RENT-2026",
  "SRC-NYCAC-X-LINK-BUSHWICK-LEASE-RENEWAL-2026",
  "SRC-NYCAC-X-LINK-GOTHAMIST-COMMERCIAL-RENT-2026"
];

export const nycacSocialCorpus = {
  intakeItems: [{
    id: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
    kind: "public-artifact",
    title: "Population-reconciled archival production for @NYCArtC",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    projectIds: ["nyc-artist-coalition", "save-nyc-spaces", "cabaret-law", "talks-not-raids", "fair-rent-nyc"],
    reason: "Reconcile the 5,124-post profile control, preserve every item and destination the current carrier exposed, mature significant linked sources, and keep unrecovered activity, shared authorship, outreach, amplification, and impact separate.",
    sourceUrl: "https://x.com/NYCArtC",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: ["SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", ...linkedArticleSourceIds],
    observationIds: [
      "OBS-NYCAC-POPULATION-DISPOSITION",
      "OBS-NYCAC-CAMPAIGN-CONTINUITY",
      "OBS-NYCAC-EDITORIAL-REPOST-NETWORK",
      "OBS-NYCAC-DIRECT-MENTION-FLOOR",
      "OBS-NYCAC-POSTED-URL-INVENTORY",
      "OBS-NYCAC-LINK-BAFFLER-MARCH-2018",
      "OBS-NYCAC-LINK-HELLGATE-SAINT-VITUS-2024",
      "OBS-NYCAC-LINK-HELLGATE-LUCYS-2024",
      "OBS-NYCAC-LINK-HELLGATE-CURE-2025",
      "OBS-NYCAC-LINK-PITCHFORK-QUEER-NIGHTLIFE-2023",
      "OBS-NYCAC-LINK-ABC7-MORSCHERS-2024",
      "OBS-NYCAC-LINK-404MEDIA-TICKETMASTER-2024",
      "OBS-NYCAC-LINK-CITYSTATE-COMMERCIAL-RENT-2026",
      "OBS-NYCAC-LINK-BUSHWICK-LEASE-RENEWAL-2026",
      "OBS-NYCAC-LINK-GOTHAMIST-COMMERCIAL-RENT-2026",
      "OBS-NYCAC-VISIBLE-REACTION-SNAPSHOT"
    ],
    researchInquiryIds: [
      "INQ-NYCAC-FULL-POPULATION-2026",
      "INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY",
      "INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"
    ],
    boundaries: [
      "All 5,124 profile-count slots are dispositioned, but only 1,026 distinct public status records were recovered at item level; 4,098 remain explicitly unresolved.",
      "The recovered records are not a complete export or a statistically representative sample, and the 2019-2022 gap must not be read as inactivity.",
      "A native repost documents coalition-selected amplification of another account's post; the source account retains authorship and its visible metrics.",
      "The shared account does not identify the individual teammate who authored, selected, or administered each record.",
      "Authentication was used only to read public material; private messages, credentials, session data, and private analytics are excluded."
    ]
  }],

  observations: [
    {
      id: "OBS-NYCAC-POPULATION-DISPOSITION",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The July 2026 profile displayed 5,124 posts. Authenticated profile traversal and bounded date searches recovered 1,026 unique public status records: 309 account posts, 33 account replies, and 684 source statuses observed as native reposts; 4,098 profile-count slots remain explicitly unresolved.",
      locator: "Population reconciliation and item-level ledger",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-POPULATION-DISPOSITION", "CLM-NYCAC-SHARED-SOCIAL-IDENTITY"],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026", "INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY"],
      limitations: [
        "This is 100 percent disposition of the displayed population, not 100 percent item-level recovery.",
        "The carrier did not expose a stable complete historical timeline, native export, deletion history, or withheld-status log."
      ]
    },
    {
      id: "OBS-NYCAC-CAMPAIGN-CONTINUITY",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "context",
      text: "Within the recovered corpus, 104 records carry FairRentNYC signals, 101 carry LetNYCDance signals, 98 carry SaveNYCSpaces signals, and 16 carry TalksNotRaids signals.",
      locator: "aggregateFindings.campaignSignalCounts",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY", "CLM-NYCAC-SHARED-SOCIAL-IDENTITY"],
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      limitations: [
        "Signals are editorial text and hashtag classifications, not evidence that every record belongs exclusively to one campaign.",
        "Counts within the recovered corpus cannot be extrapolated to the 4,098 unresolved slots."
      ]
    },
    {
      id: "OBS-NYCAC-EDITORIAL-REPOST-NETWORK",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "context",
      text: "The recovered corpus contains 684 source statuses from 216 public accounts observed as native reposts, spanning artist-worker organizations, cultural groups, community organizations, public agencies, elected officials, journalists, and local media.",
      locator: "aggregateFindings.repostNetwork",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-EDITORIAL-NETWORK"],
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      limitations: [
        "Repost selection is coalition editorial activity, not authorship of the source post.",
        "A repost does not by itself establish partnership, endorsement, account use, causality, or impact."
      ]
    },
    {
      id: "OBS-NYCAC-DIRECT-MENTION-FLOOR",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Twenty-five recovered source statuses authored by 13 outside accounts directly mention @NYCArtC. This item-level floor is separate from the earlier bounded audit that recovered five sitting Council-member accounts engaging with the coalition between 2018 and 2021.",
      locator: "records[].directMentionOfAccount and the existing Council-account engagement audit",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-EDITORIAL-NETWORK"],
      researchInquiryIds: ["INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY"],
      limitations: [
        "The 25 records do not include every recoverable historical interaction and should not replace the separate official-at-date Council-member floor.",
        "A direct mention does not establish partnership, adoption, endorsement, or Jamie's individual role."
      ]
    },
    {
      id: "OBS-NYCAC-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The 1,026-record ledger preserves 536 posted short-link occurrences: 408 unique short URLs, of which 384 currently resolve to 345 unique public destinations; 24 remain unresolved.",
      locator: "aggregateFindings.postedLinks and records[].postedUrls",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING"],
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      limitations: [
        "Current redirects do not prove historical availability, destination continuity, or the content seen when the post was published.",
        "Sharing a destination does not establish authorship, agreement with every proposition, resulting action, or impact."
      ]
    },
    ...[
      {
        id: "OBS-NYCAC-LINK-BAFFLER-MARCH-2018",
        sourceId: "SRC-NYCAC-BAFFLER-MARCH",
        text: "Liz Pelly's 2018 reporting documents public concern about opaque multi-agency M.A.R.C.H. inspections and arguments for transparent, corrective safety processes.",
        locator: "Sections describing M.A.R.C.H. operations and Talks Not Raids demands",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The article does not establish Jamie's authorship, the coalition's complete role, campaign causation, or the later end of M.A.R.C.H."]
      },
      {
        id: "OBS-NYCAC-LINK-HELLGATE-SAINT-VITUS-2024",
        sourceId: "SRC-NYCAC-X-LINK-HELLGATE-SAINT-VITUS-2024",
        text: "Hell Gate's 2024 Saint Vitus reporting documents continuing public questions about multi-agency venue enforcement after the city announced a replacement for M.A.R.C.H.",
        locator: "Reporting on the Saint Vitus inspection and shutdown",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["This is later issue context, not evidence of NYC Artist Coalition causation, Jamie's authorship, or citywide outcomes."]
      },
      {
        id: "OBS-NYCAC-LINK-HELLGATE-LUCYS-2024",
        sourceId: "SRC-NYCAC-X-LINK-HELLGATE-LUCYS-2024",
        text: "Hell Gate's 2024 reporting documents the eviction of Lucy's as one public case of cultural-space and commercial-tenancy displacement.",
        locator: "Reporting on Lucy's eviction and landlord context",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["One case does not establish a general trend, coalition involvement, Jamie's authorship, or policy impact."]
      },
      {
        id: "OBS-NYCAC-LINK-HELLGATE-CURE-2025",
        sourceId: "SRC-NYCAC-X-LINK-HELLGATE-CURE-2025",
        text: "Hell Gate's 2025 reporting describes renewed concern about unannounced multi-agency nightlife inspections under CURE after M.A.R.C.H. was described as ended.",
        locator: "Reporting on the cited 2024 and 2025 inspection counts",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The article does not independently verify every cited count or establish legal identity between CURE and M.A.R.C.H., coalition causation, or Jamie's authorship."]
      },
      {
        id: "OBS-NYCAC-LINK-PITCHFORK-QUEER-NIGHTLIFE-2023",
        sourceId: "SRC-NYCAC-X-LINK-PITCHFORK-QUEER-NIGHTLIFE-2023",
        text: "Pitchfork's 2023 reporting frames queer nightlife as cultural, emotional, and economic infrastructure under legislative and physical threat.",
        locator: "Reported venue and organizer responses to political violence",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The article does not establish NYC Artist Coalition participation, New York-specific policy outcomes, Jamie's role, or universal experience across venues."]
      },
      {
        id: "OBS-NYCAC-LINK-ABC7-MORSCHERS-2024",
        sourceId: "SRC-NYCAC-X-LINK-ABC7-MORSCHERS-2024",
        text: "ABC7's 2024 report documents one long-running Ridgewood business planning to close after a reported fourfold rent increase.",
        locator: "Reported closure and proposed rent increase",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["One closure does not establish citywide commercial-rent trends, coalition involvement, Jamie's authorship, or policy causation."]
      },
      {
        id: "OBS-NYCAC-LINK-404MEDIA-TICKETMASTER-2024",
        sourceId: "SRC-NYCAC-X-LINK-404MEDIA-TICKETMASTER-2024",
        text: "404 Media's 2024 explainer describes the Justice Department's vertical-integration theory concerning Live Nation and Ticketmaster across venues, promotion, booking, and ticketing.",
        locator: "Explanation of the federal antitrust complaint",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The report does not establish the lawsuit's outcome, coalition participation, Jamie's authorship, or agreement with every allegation."]
      },
      {
        id: "OBS-NYCAC-LINK-CITYSTATE-COMMERCIAL-RENT-2026",
        sourceId: "SRC-NYCAC-X-LINK-CITYSTATE-COMMERCIAL-RENT-2026",
        text: "City & State's 2026 reporting describes the proposed Small Business Rent Stabilization Act and situates it within New York City's longer commercial-lease policy history.",
        locator: "Bill mechanism, sponsors, and city-policy history",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The report does not establish enactment, coalition causation, Jamie's authorship, or agreement by every commercial tenant."]
      },
      {
        id: "OBS-NYCAC-LINK-BUSHWICK-LEASE-RENEWAL-2026",
        sourceId: "SRC-NYCAC-X-LINK-BUSHWICK-LEASE-RENEWAL-2026",
        text: "Bushwick Daily's 2026 reporting describes proposed commercial lease-renewal rights and records Olympia Kazi's public framing of commercial space as community infrastructure.",
        locator: "Bill explanation and Olympia Kazi quotation",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The report does not establish enactment, Jamie's role, coalition authorship, or coalition control of Small Business United."]
      },
      {
        id: "OBS-NYCAC-LINK-GOTHAMIST-COMMERCIAL-RENT-2026",
        sourceId: "SRC-NYCAC-X-LINK-GOTHAMIST-COMMERCIAL-RENT-2026",
        text: "Gothamist's 2026 reporting describes a proposed state commercial-rent system alongside supporter, opponent, vacancy, and historical context.",
        locator: "Proposal mechanics and reported stakeholder arguments",
        claimIds: ["CLM-NYCAC-SOCIAL-SOURCE-ROUTING", "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY"],
        limitations: ["The report does not establish enactment, the accuracy of every forecast, coalition causation, or Jamie's authorship."]
      }
    ].map((observation) => ({
      ...observation,
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      project: "nyc-artist-coalition",
      kind: "context",
      status: "corroborated",
      publicSafe: true,
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"]
    })),
    {
      id: "OBS-NYCAC-VISIBLE-REACTION-SNAPSHOT",
      intakeId: "INTAKE-NYCAC-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      project: "nyc-artist-coalition",
      kind: "limitation",
      text: "At the July 2026 interface snapshot, 311 of 342 recovered account-authored statuses displayed at least one reaction; visible totals were 11 replies, 544 reposts, and 1,111 likes.",
      locator: "aggregateFindings.accountAuthoredVisibleReactionSnapshot",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SOCIAL-VISIBLE-REACTIONS"],
      researchInquiryIds: ["INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY"],
      limitations: [
        "The counts are mutable present-day interface observations, not contemporaneous analytics.",
        "They do not establish unique people, impressions, clickthrough, adoption, causality, or impact.",
        "Metrics on the 684 source statuses belong to their original authors and are excluded."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14",
      title: "Authenticated @NYCArtC population reconciliation and public-post ledger",
      organization: "NYC Artist Coalition",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/nycartc-public-post-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation: "Authenticated read-only review of the public @NYCArtC profile and bounded historical searches, with a 1,026-record public-safe ledger, July 14, 2026.",
      publicNote: "The profile displayed 5,124 posts. The audit recovered 1,026 unique public status records and explicitly retains 4,098 unresolved population slots; it preserves classifications, public links, and bounded reaction snapshots without reproducing post text.",
      supportsGenerally: [
        "100 percent disposition of the 5,124-post displayed population",
        "1,026 item-level records and 4,098 unresolved profile-count slots",
        "309 account posts, 33 account replies, and 684 native-repost source statuses",
        "campaign-signal, source-network, direct-mention, posted-link, and visible-reaction findings"
      ],
      doesNotEstablish: [
        "100 percent item-level recovery, a platform export, deletion history, or a representative sample",
        "the content, date, or relationship type of any unresolved slot",
        "the individual teammate who authored, selected, or administered each record",
        "historical analytics, unique people reached, clickthrough, adoption, causality, or impact",
        "partnership or endorsement from a mention, repost, reaction, or linked source"
      ]
    },
    {
      id: "SRC-NYCAC-X-LINK-HELLGATE-SAINT-VITUS-2024",
      title: "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
      organization: "Hell Gate",
      author: "Adlan Jackson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-02-22",
      accessedAt: reviewedAt,
      canonicalUrl: "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
      preferredPublicUrl: "canonical",
      publicCitation: "Adlan Jackson, 'Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?' Hell Gate, February 22, 2024.",
      publicNote: "Later reporting on venue inspection and shutdown questions after the city announced a replacement for M.A.R.C.H.",
      supportsGenerally: ["2024 nightlife-enforcement context", "Saint Vitus inspection and shutdown reporting", "continued scrutiny of multi-agency practice"],
      doesNotEstablish: ["NYC Artist Coalition causation", "Jamie's authorship", "the complete facts of the venue case", "citywide enforcement outcomes"]
    },
    {
      id: "SRC-NYCAC-X-LINK-HELLGATE-LUCYS-2024",
      title: "Lucy's Is Being Evicted. Do the Landlords Care?",
      organization: "Hell Gate",
      author: "Christopher Robbins",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-02-08",
      accessedAt: reviewedAt,
      canonicalUrl: "https://hellgatenyc.com/lucys-east-village-evicted-do-the-landlords-care/",
      preferredPublicUrl: "canonical",
      publicCitation: "Christopher Robbins, 'Lucy's Is Being Evicted. Do the Landlords Care?' Hell Gate, February 8, 2024.",
      publicNote: "Reporting on the eviction of a long-running East Village bar, circulated by the account as cultural-space and commercial-tenancy context.",
      supportsGenerally: ["one 2024 cultural-space displacement case", "commercial-tenancy context", "continued public concern about neighborhood institutions"],
      doesNotEstablish: ["NYC Artist Coalition involvement in the case", "Jamie's authorship", "the prevalence of similar closures", "policy impact"]
    },
    {
      id: "SRC-NYCAC-X-LINK-HELLGATE-CURE-2025",
      title: "Nightclub Raids Are on the Rise in 2025, Report Says",
      organization: "Hell Gate",
      author: "Adlan Jackson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2025-10-03",
      accessedAt: reviewedAt,
      canonicalUrl: "https://hellgatenyc.com/cure-march-raids-2025-report/",
      preferredPublicUrl: "canonical",
      publicCitation: "Adlan Jackson, 'Nightclub Raids Are on the Rise in 2025, Report Says,' Hell Gate, October 3, 2025.",
      publicNote: "Reports a 2025 increase in unannounced multi-agency nightlife inspections under the CURE process after the city described M.A.R.C.H. as ended.",
      supportsGenerally: ["reported 2024 and 2025 multi-agency inspection counts", "CURE and M.A.R.C.H. policy continuity questions", "nightlife-safety implementation context"],
      doesNotEstablish: ["independent verification beyond the cited report", "NYC Artist Coalition causation", "Jamie's authorship", "that CURE and M.A.R.C.H. are legally identical"]
    },
    {
      id: "SRC-NYCAC-X-LINK-PITCHFORK-QUEER-NIGHTLIFE-2023",
      title: "The Fight for Queer Nightlife in an Era of Political Violence",
      organization: "Pitchfork",
      author: "Isabelia Herrera",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2023-06-13",
      accessedAt: reviewedAt,
      canonicalUrl: "https://pitchfork.com/features/article/the-fight-for-queer-nightlife-in-an-era-of-political-violence/",
      preferredPublicUrl: "canonical",
      publicCitation: "Isabelia Herrera, 'The Fight for Queer Nightlife in an Era of Political Violence,' Pitchfork, June 13, 2023.",
      publicNote: "National reporting on queer nightlife as cultural, emotional, and economic infrastructure under legislative and physical threat.",
      supportsGenerally: ["queer-nightlife safety and cultural-infrastructure context", "venue and organizer responses to political violence", "tension between care and punitive policing"],
      doesNotEstablish: ["NYC Artist Coalition authorship or participation", "New York-specific policy outcomes", "universal experience across venues", "Jamie's individual role"]
    },
    {
      id: "SRC-NYCAC-X-LINK-ABC7-MORSCHERS-2024",
      title: "Ridgewood's iconic pork store forced to close its doors after nearly 70 years",
      organization: "ABC7 New York",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-01-30",
      accessedAt: reviewedAt,
      canonicalUrl: "https://abc7ny.com/post/morschers-pork-store-ridgewood-queens-business-closing-nyc/14357620/",
      preferredPublicUrl: "canonical",
      publicCitation: "ABC7 New York, 'Ridgewood's iconic pork store forced to close its doors after nearly 70 years,' January 30, 2024.",
      publicNote: "Reports that a nearly 70-year-old neighborhood business planned to close after a proposed fourfold rent increase.",
      supportsGenerally: ["one documented long-running business closure", "reported rent-increase context", "neighborhood commercial-space continuity"],
      doesNotEstablish: ["general commercial-rent trends", "NYC Artist Coalition involvement", "Jamie's authorship", "policy causation"]
    },
    {
      id: "SRC-NYCAC-X-LINK-404MEDIA-TICKETMASTER-2024",
      title: "The Monopoly Case Against Ticketmaster, Explained",
      organization: "404 Media",
      author: "Jason Koebler",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-05-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.404media.co/the-monopoly-case-against-ticketmaster-explained/",
      preferredPublicUrl: "canonical",
      publicCitation: "Jason Koebler, 'The Monopoly Case Against Ticketmaster, Explained,' 404 Media, May 29, 2024.",
      publicNote: "Explains the U.S. Justice Department's vertical-integration theory concerning Live Nation and Ticketmaster across venues, promotion, booking, and ticketing.",
      supportsGenerally: ["live-music market-power context", "the antitrust complaint's vertical-integration theory", "artist, venue, and audience stakes"],
      doesNotEstablish: ["the outcome of the lawsuit", "NYC Artist Coalition participation", "Jamie's authorship", "agreement with every allegation"]
    },
    {
      id: "SRC-NYCAC-X-LINK-CITYSTATE-COMMERCIAL-RENT-2026",
      title: "Socialists take aim at commercial rent",
      organization: "City & State New York",
      author: "Rebecca C. Lewis",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-02-20",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.cityandstateny.com/policy/2026/02/socialists-take-aim-commercial-rent/411572/",
      preferredPublicUrl: "canonical",
      publicCitation: "Rebecca C. Lewis, 'Socialists take aim at commercial rent,' City & State New York, February 20, 2026.",
      publicNote: "Reports the state-level Small Business Rent Stabilization Act and situates it within New York City's longer commercial-lease policy history.",
      supportsGenerally: ["2026 commercial-rent proposal context", "bill sponsors and core mechanism", "connection to longer city-level policy history"],
      doesNotEstablish: ["bill enactment", "NYC Artist Coalition causation", "Jamie's authorship", "agreement by every commercial tenant"]
    },
    {
      id: "SRC-NYCAC-X-LINK-BUSHWICK-LEASE-RENEWAL-2026",
      title: "New Bill Seeks to Guarantee Lease Renewals for NYC Small Businesses",
      organization: "Bushwick Daily",
      author: "Alec Meeker",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-02-21",
      accessedAt: reviewedAt,
      canonicalUrl: "https://bushwickdaily.com/news/new-bill-seeks-to-guarantee-lease-renewals-for-nyc-small-bus/",
      preferredPublicUrl: "canonical",
      publicCitation: "Alec Meeker, 'New Bill Seeks to Guarantee Lease Renewals for NYC Small Businesses,' Bushwick Daily, February 21, 2026.",
      publicNote: "Explains the proposed commercial rent guidelines board and renewal rights and includes Olympia Kazi's public framing of commercial space as community infrastructure.",
      supportsGenerally: ["2026 bill mechanisms", "Olympia Kazi's public support", "commercial-space-as-community-infrastructure framing"],
      doesNotEstablish: ["bill enactment", "Jamie's role", "NYC Artist Coalition authorship", "coalition control of Small Business United"]
    },
    {
      id: "SRC-NYCAC-X-LINK-GOTHAMIST-COMMERCIAL-RENT-2026",
      title: "New York lawmakers seek rent control to protect small businesses",
      organization: "Gothamist / WNYC",
      author: "Walter Wuthmann",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-02-22",
      accessedAt: reviewedAt,
      canonicalUrl: "https://gothamist.com/news/new-york-lawmakers-seek-rent-control-to-protect-small-businesses",
      preferredPublicUrl: "canonical",
      publicCitation: "Walter Wuthmann, 'New York lawmakers seek rent control to protect small businesses,' Gothamist, February 22, 2026.",
      publicNote: "Reports the proposed state commercial-rent system, supporter and opponent arguments, vacancy context, and historical precedents.",
      supportsGenerally: ["2026 commercial-rent proposal context", "reported supporter and opponent arguments", "historical and vacancy context"],
      doesNotEstablish: ["bill enactment", "the accuracy of every quoted forecast", "NYC Artist Coalition causation", "Jamie's authorship"]
    }
  ],

  claims: [
    {
      id: "CLM-NYCAC-SOCIAL-POPULATION-DISPOSITION",
      project: "nyc-artist-coalition",
      internalClaim: "All 5,124 displayed @NYCArtC profile-count slots are dispositioned: 1,026 unique public status records are preserved at item level and 4,098 remain explicitly unresolved because the current carrier did not expose a stable complete timeline.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "The July 2026 account population is fully reconciled, with 1,026 item-level records and 4,098 explicit carrier gaps.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "direct-support", supports: ["5,124-slot reconciliation", "1,026 item-level records", "4,098 unresolved slots"], confidence: "high", renderCitation: false }],
      boundaries: ["Say fully dispositioned or reconciled, not fully recovered.", "The unresolved population has no inferred dates, themes, relationships, or metrics."],
      antiClaims: ["All 5,124 posts were read individually.", "The ledger is a platform export.", "The recovered records are representative of the account's lifetime activity."],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026", "INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-CAMPAIGN-CONTINUITY",
      project: "nyc-artist-coalition",
      internalClaim: "The recovered @NYCArtC corpus carries all four named campaign lines and continues their underlying concerns through later public circulation about cultural-space survival, non-punitive safety, fair commercial terms, and artist-worker power.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The shared coalition identity carried four campaign lines and continued routing public knowledge around cultural space, safety, commercial terms, and artist-worker power.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "direct-support", supports: ["campaign-signal counts and later source routing"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-X-LINK-HELLGATE-CURE-2025", relationship: "context", supports: ["later nightlife-enforcement context"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-X-LINK-CITYSTATE-COMMERCIAL-RENT-2026", relationship: "context", supports: ["later commercial-rent policy context"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NYCAC-X-LINK-404MEDIA-TICKETMASTER-2024", relationship: "context", supports: ["later live-music market-power context"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Continuity describes the shared account's public editorial field, not Jamie's authorship of every later record.", "Linked reporting is issue context, not evidence of coalition influence."],
      antiClaims: ["Every later post was part of a formal campaign plan.", "Jamie authored or selected every record.", "Public circulation proves policy impact."],
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-EDITORIAL-NETWORK",
      project: "nyc-artist-coalition",
      internalClaim: "The recovered corpus documents a public editorial network: 684 source statuses from 216 accounts were observed as native reposts, and 25 source statuses from 13 accounts directly mention @NYCArtC.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The recovered account record preserves a broad source network and a smaller direct-mention floor, with amplification kept distinct from reciprocal engagement.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "direct-support", supports: ["repost network and direct-mention floor"], confidence: "high", renderCitation: false }],
      boundaries: ["A native repost is coalition-selected amplification of a source-authored status.", "The 25 direct mentions are a recoverable floor, not the complete lifetime engagement count."],
      antiClaims: ["All 216 accounts collaborated with NYC Artist Coalition.", "The coalition authored the 684 source posts.", "A repost or mention proves endorsement, adoption, or impact."],
      researchInquiryIds: ["INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY", "INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-SOURCE-ROUTING",
      project: "nyc-artist-coalition",
      internalClaim: "The recovered corpus preserves 536 posted short-link occurrences, 408 unique short URLs, and 345 currently resolved public destinations spanning campaign sites, government records, journalism, organizing tools, public resources, and cultural opportunities.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The account functioned as a public knowledge-routing surface across campaign pages, reporting, public records, organizing tools, and cultural resources.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "direct-support", supports: ["posted-link inventory and current resolution results"], confidence: "high", renderCitation: false },
        ...linkedArticleSourceIds.map((sourceId) => ({ sourceId, relationship: "context", supports: ["one closely read destination in the public source graph"], confidence: "high", renderCitation: false }))
      ],
      boundaries: ["Current redirect resolution does not prove historical destination content or continuity.", "Most external destinations are context routed by the account, not press coverage of the coalition."],
      antiClaims: ["NYC Artist Coalition authored every linked source.", "A link proves agreement with every proposition.", "A posted destination proves resulting action or impact."],
      researchInquiryIds: ["INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex link and source review"]
    },
    {
      id: "CLM-NYCAC-SOCIAL-VISIBLE-REACTIONS",
      project: "nyc-artist-coalition",
      internalClaim: "At the July 2026 public snapshot, 311 of 342 recovered @NYCArtC-authored statuses displayed at least one reaction, totaling 11 replies, 544 reposts, and 1,111 likes.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A bounded July 2026 interface snapshot preserves visible reactions on the recovered account-authored corpus; it is not used as an impact claim.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "direct-support", supports: ["current visible reactions on recovered account-authored statuses"], confidence: "high", renderCitation: false }],
      boundaries: ["Counts are mutable present-day interface observations rather than historical analytics.", "Exclude source-status metrics from coalition traction."],
      antiClaims: ["The counts measure lifetime reach.", "The counts represent unique people, impressions, or policy outcomes.", "Source-status reactions belong to NYC Artist Coalition."],
      researchInquiryIds: ["INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-NYCAC-FULL-POPULATION-2026",
      project: "nyc-artist-coalition",
      question: "Can the full 5,124-post @NYCArtC profile population be recovered, classified, linked, and integrated without overstating completeness, authorship, engagement, or impact?",
      methods: [
        "Used the authenticated profile's displayed 5,124-post count as the population control.",
        "Traversed the public Posts surface and ran bounded authenticated Latest searches by date, deduplicating every rendered item by canonical status ID.",
        "Checkpointed each recovery pass locally so carrier stalls could not erase prior evidence.",
        "Classified recovered records by account relationship, campaign signal, primary theme, public mentions, posted destinations, media signals, and metric ownership.",
        "Resolved all 408 unique short URLs with timeouts and closely read ten high-signal public destinations."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 5,124 displayed profile-count slots are dispositioned through 1,026 item-level records and 4,098 explicit unresolved slots.",
        "The recovered set contains 309 account posts, 33 account replies, and 684 source statuses observed as native reposts.",
        "The corpus preserves all four campaign lines, a 216-account repost source network, 13 outside accounts directly mentioning @NYCArtC, and 345 currently resolved destinations.",
        "The recovered years are 2017-2018 and 2023-2026; X did not provide a stable carrier to repair the 2019-2022 gap."
      ],
      limitations: [
        "The 1,026 recovered records are not a platform export, complete lifetime history, or statistically representative sample.",
        "The 4,098 unresolved slots cannot be assigned dates, relationships, themes, or metrics.",
        "Profile traversal stopped before 2023 and repeated historical search returned a visible error after earlier bounded results.",
        "The shared account does not establish individual teammate authorship or administrator history.",
        "Reactions, mentions, reposts, and links do not independently measure reach, adoption, causality, or impact."
      ],
      sourceIds: ["SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", ...linkedArticleSourceIds],
      publicSummary: "The 5,124-post profile control is fully reconciled rather than falsely declared complete: 1,026 records are preserved at item level and 4,098 carrier-limited slots remain explicitly unresolved."
    },
    {
      id: "INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY",
      project: "nyc-artist-coalition",
      question: "What approved carrier can recover the 4,098 unresolved @NYCArtC profile-count slots and repair the 2019-2022 and older-repost gaps?",
      methods: [
        "Tested ordinary authenticated profile traversal until the virtualized timeline stopped advancing.",
        "Used bounded date searches to recover older account-authored posts until X began returning a visible error.",
        "Searched the local project and cloud-drive surfaces for an existing native account archive without finding one.",
        "Kept native repost actions distinct from source-status URLs because historical search does not reliably expose the former."
      ],
      runAt: reviewedAt,
      resultStatus: "not-recovered",
      findings: [
        "No complete native account archive or public archival carrier was recovered.",
        "Historical search can recover some account-authored material but not the older native-repost population needed for item-level closure.",
        "A future account-owner export, collaborator-provided export, or independently preserved carrier could reduce the unresolved population."
      ],
      limitations: [
        "Not recovered does not mean no archive exists.",
        "The current logged-in profile is Jamie's personal account, not evidence of @NYCArtC administrator access.",
        "No API account, login change, archive request, credential access, or account-administration action was attempted.",
        "Unresolved slots must remain non-claims until a durable carrier is obtained."
      ],
      sourceIds: ["SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14"],
      publicSummary: "A complete historical carrier was not recovered; the knowledge bank preserves the exact 4,098-item gap and the methods needed to reduce it."
    },
    {
      id: "INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY",
      project: "nyc-artist-coalition",
      question: "What does the recovered account record establish about campaign continuity, public knowledge routing, stakeholder touchpoints, and the shared identity's later stewardship?",
      methods: [
        "Separated account-authored posts and replies from source statuses observed as native reposts.",
        "Classified campaign and issue signals without assigning later record authorship to Jamie.",
        "Resolved posted destinations and closely read ten high-signal articles across nightlife safety, commercial rent, cultural displacement, queer nightlife, and artist-worker economics.",
        "Kept outside-authored direct mentions, project outreach, repost amplification, and mutable reactions as distinct relationship types.",
        "Compared the corpus against the existing five-member Council-account engagement floor without treating either as complete."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All four named campaign lines appear in the recovered item-level corpus.",
        "The shared identity later circulated public knowledge about closely related cultural-space, safety, commercial-rent, and artist-worker concerns.",
        "The recovered repost network contains 684 source statuses from 216 accounts, while 25 source statuses from 13 accounts directly mention @NYCArtC.",
        "The 345 resolved destinations show a broad knowledge-routing function across campaign pages, journalism, public records, organizing tools, and cultural opportunities."
      ],
      limitations: [
        "Later issue continuity does not establish a single formal campaign, editorial plan, administrator, or author across years.",
        "Most linked sources provide context rather than coverage of NYC Artist Coalition.",
        "Repost source networks and direct mentions do not prove partnership or endorsement.",
        "The unresolved population prevents lifetime frequency or trend claims."
      ],
      sourceIds: ["SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", ...linkedArticleSourceIds],
      publicSummary: "The recovered record shows a shared coalition identity routing related public knowledge over time while preserving source authorship, collective credit, and incompleteness."
    }
  ]
} as const;
