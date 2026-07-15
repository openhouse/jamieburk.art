import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const circulatedSource = (
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publicNote: string,
  doesNotEstablish: string[],
  publishedAt?: string,
  author?: string
): SourceRecord => ({
  id,
  title,
  organization,
  ...(author ? { author } : {}),
  kind: "published-article",
  visibility: "public",
  preservationStatus: "live",
  ...(publishedAt ? { publishedAt } : {}),
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation: `${organization}, “${title}.”`,
  publicNote,
  supportsGenerally: ["one mission-relevant source circulated by @NYCArtC"],
  doesNotEstablish: [
    "Jamie’s authorship of the account post",
    "endorsement of every position in the article",
    ...doesNotEstablish
  ]
});

export const nycArtistCoalitionFullPopulationSources: SourceRecord[] = [
  {
    id: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
    title: "NYC Artist Coalition population-accounted public X corpus",
    author: "Codex authenticated browser review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt:
      "Authenticated replies-inclusive traversal and monthly historical-search partitions completed July 15, 2026",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/NYCArtC/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated population-accounted review of the public @NYCArtC account, July 15, 2026.",
    publicNote:
      "The profile reported 5,124 posts. A protected capture supports a minimized public ledger recording 3,367 recovered account items, an explicit 1,757-item recovery gap, 19 context-only public records, aggregate classifications, and cryptographic reconciliation controls without republishing bulk post text or per-item records.",
    supportsGenerally: [
      "100 percent disposition of the 5,124-post profile control as 3,367 recovered items and a 1,757-item recovery gap",
      "696 recovered authored posts and 2,671 recovered reposts",
      "four campaign-marker traces in recovered authored posts",
      "an earliest recovered #FairRentNYC account marker on October 25, 2018",
      "resolved-link, source-circulation, outbound stakeholder-communication, repost-source, and dated visible-interaction observations"
    ],
    doesNotEstablish: [
      "the contents or item types of 1,757 unrecovered profile-count items",
      "Jamie’s authorship of the account’s posts",
      "the individual author of every shared-account post",
      "complete incoming engagement or lifetime reach",
      "endorsement of posted sources",
      "policy causation or sole campaign credit"
    ]
  },
  circulatedSource(
    "SRC-NYCAC-X-GOTHAMIST-CABARET-MOMENTUM-2017",
    "Movement For Repealing NYC’s Archaic ‘No Dancing’ Law Gains Momentum",
    "Gothamist",
    "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    "Contemporaneous Cabaret Law repeal reporting recovered from the account’s posted-source inventory.",
    ["sole coalition causation for repeal", "authorship of the article"]
  ),
  circulatedSource(
    "SRC-NYCAC-X-AMNY-OFFICE-NIGHTLIFE-2017",
    "Nightlife bill creating advisory board to be passed by City Council",
    "amNewYork",
    "https://www.amny.com/news/nightlife-bill-creating-advisory-board-to-be-passed-by-city-council-rafael-espinal-says-1.14085854/",
    "Contemporaneous Office of Nightlife policy context circulated by the account.",
    ["that NYC Artist Coalition alone created the Office of Nightlife"]
  ),
  circulatedSource(
    "SRC-NYCAC-X-NYT-NIGHT-MAYOR-2017",
    "New York Has a Nightlife Mayor. Other Cities Want One, Too.",
    "The New York Times",
    "https://www.nytimes.com/2017/08/30/arts/new-york-night-mayor-europe.html",
    "Comparative context for the Office of Nightlife discussion circulated by the account.",
    ["the coalition’s individual causal contribution"]
  ),
  circulatedSource(
    "SRC-NYCAC-X-NYT-CABARET-REPEAL-2017",
    "After 91 Years, New York Will Let Its People Boogie",
    "The New York Times",
    "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    "Contemporaneous reporting on the Council's impending Cabaret Law repeal vote circulated by the account.",
    ["sole coalition causation for repeal", "Jamie's individual role in the vote"],
    "2017-10-30"
  ),
  circulatedSource(
    "SRC-NYCAC-X-GOTHAMIST-MARCH-TRANSPARENCY-2019",
    "Lawmakers Demand Transparency On Surprise Multi-Agency Raids On Local Bars And Clubs",
    "Gothamist",
    "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs",
    "Reporting on disparate impacts and Council transparency efforts associated with Talks Not Raids.",
    ["sole campaign causation", "that every venue inspection was a MARCH raid"]
  ),
  circulatedSource(
    "SRC-NYCAC-X-DAILY-NEWS-NIGHTLIFE-2019",
    "Mayor’s Office of Nightlife drastically underfunded and understaffed, pol says",
    "New York Daily News",
    "https://www.nydailynews.com/2019/08/28/mayors-office-of-nightlife-drastically-underfunded-and-understaffed-pol-says/",
    "The destination and headline were recovered from the account and live search metadata. The article body was blocked during this pass, so details remain unpromoted.",
    ["the article body’s complete reporting", "the account’s quoted numerical claim"],
    "2019-08-28"
  ),
  circulatedSource(
    "SRC-NYCAC-X-DAILY-NEWS-FAIR-RENT-2019",
    "Pols, small biz owners rally for law limiting rent hikes on NYC’s beleaguered mom-and-pop shops",
    "New York Daily News",
    "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/",
    "The destination and headline were recovered from the account. Article-body claims remain held pending a recoverable copy.",
    ["the article body’s complete reporting", "passage or policy adoption"],
    "2019-11-14"
  ),
  circulatedSource(
    "SRC-NYCAC-X-CITY-LIMITS-RENT-COVID-2020",
    "City’s Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
    "City Limits",
    "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
    "City Limits documents United for Small Business NYC’s commercial-rent-stabilization argument during the first pandemic shutdown.",
    ["policy adoption", "campaign causation"],
    "2020-04-06",
    "Bridget Bartolini"
  ),
  circulatedSource(
    "SRC-NYCAC-X-GOTHAMIST-REPEAL-50A-2020",
    "New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny",
    "Gothamist",
    "https://gothamist.com/news/new-york-state-legislature-votes-repeal-law-50-shields-police-scrunity",
    "The article establishes the legislative action circulated by the account; its relationship to MARCH accountability remains the account’s interpretation.",
    ["the coalition’s causal role in repeal", "the account’s broader interpretation of MARCH outcomes"],
    "2020-06-09"
  ),
  circulatedSource(
    "SRC-NYCAC-X-AMERICAN-THEATRE-LARK-2021",
    "The Lark Is Grounded: New-Play Incubator to Fold After 27 Years",
    "American Theatre",
    "https://www.americantheatre.org/2021/10/05/the-lark-is-grounded-new-play-incubator-to-fold-after-25-years/",
    "The article reported a proposed rent increase as one factor in the Lark’s closure; @NYCArtC connected that loss to Fair Rent NYC advocacy.",
    ["a single-cause account of the closure", "Fair Rent NYC policy causation"],
    "2021-10-05",
    "American Theatre Editors"
  ),
  circulatedSource(
    "SRC-NYCAC-X-HELL-GATE-RAIDS-2023",
    "Who Is Leading the Raids on NYC Nightclubs?",
    "Hell Gate",
    "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    "Later reporting circulated by the account as continuity evidence for nightlife-enforcement concerns.",
    ["that every described inspection was a MARCH raid", "coalition causation"],
    "2023-06-09",
    "Adlan Jackson"
  ),
  circulatedSource(
    "SRC-NYCAC-X-HELL-GATE-SAINT-VITUS-2024",
    "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
    "Hell Gate",
    "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
    "The article preserves continued public scrutiny after the announced end of MARCH without classifying the Saint Vitus action as MARCH.",
    ["that the Saint Vitus action was a MARCH raid", "the end of all multi-agency venue inspections"],
    "2024-02-22",
    "Adlan Jackson"
  )
];

export const nycArtistCoalitionFullPopulationClaims: ClaimRecord[] = [
  {
    id: "CLM-NYCAC-X-SHARED-PUBLIC-OPERATING-LAYER",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered authored account corpus shows one shared coalition identity carrying Fair Rent NYC, Save NYC Spaces, Let NYC Dance, and Talks Not Raids across 2017–2026.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "One shared coalition account carried four campaign systems across nine years of recovered public communication.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Preserve durable campaign continuity in the bank; the current case study’s shorter identity-system claim is clearer for hiring readers."
    }],
    evidence: [{
      sourceId: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
      relationship: "direct-support",
      supports: [
        "696 recovered authored-post denominator",
        "186 Fair Rent NYC posts",
        "106 Save NYC Spaces posts",
        "76 Let NYC Dance posts",
        "54 Talks Not Raids posts",
        "earliest recovered Fair Rent NYC marker in October 2018",
        "2017–2026 recovered range"
      ],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The profile control is accounted for as 3,367 recovered account items plus an explicit 1,757-item gap; all 5,124 items were not recovered.",
      "Campaign categories overlap and count source-post markers only, excluding quoted-card content.",
      "The shared account does not identify Jamie or any collaborator as author of every post."
    ],
    antiClaims: [
      "all 5,124 profile-reported items were recovered",
      "Jamie authored 696 coalition posts",
      "hashtag volume proves campaign impact or policy causation",
      "the coalition account represents Jamie’s work alone"
    ],
    researchInquiryIds: ["INQ-NYCAC-X-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-X-PUBLIC-SOURCE-CIRCULATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered corpus preserves a broad public source-and-action layer spanning campaign sites, official records, reporting, forms, event pages, and field resources.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "All 1,235 distinct t.co URLs in the recovered account items resolved; 446 authored posts carried 529 links representing 287 distinct short URLs.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Keep the source ecology available for future composition without turning the public case study into a link inventory."
    }],
    evidence: [
      {
        sourceId: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
        relationship: "direct-support",
        supports: ["recovered-account link resolution", "authored-link denominators", "12 mission-relevant source leads"],
        confidence: "high",
        renderCitation: false
      },
      ...nycArtistCoalitionFullPopulationSources.slice(1).map((source) => ({
        sourceId: source.id,
        relationship: "context" as const,
        supports: ["one mission-relevant source circulated by the account"],
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "A resolved destination documents circulation, not endorsement, article accuracy, audience reach, or authorship of the linked work.",
      "Article-level accomplishment claims require close reading and independent evidence."
    ],
    antiClaims: [
      "every linked source endorsed NYC Artist Coalition",
      "the account authored the linked reporting or public records",
      "posted links prove audience reach or policy effect"
    ],
    researchInquiryIds: ["INQ-NYCAC-X-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-X-OUTBOUND-STAKEHOLDER-COMMUNICATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "Within the recovered authored corpus, 100 posts addressed @NYCCouncil in 104 source-body mention occurrences.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "One hundred recovered authored posts addressed @NYCCouncil; this measures outbound communication, not incoming engagement.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Retain the communication-system evidence in the bank while the case study uses the stricter direct incoming-interaction claim."
    }],
    evidence: [{
      sourceId: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
      relationship: "direct-support",
      supports: ["100 authored posts with @NYCCouncil", "104 source-body mention occurrences"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Quoted-card mentions are excluded.",
      "An outbound mention does not establish that the addressee saw, answered, endorsed, or acted on the post.",
      "Use the separately verified Council-interaction ledger for incoming engagement claims."
    ],
    antiClaims: [
      "100 Council members engaged",
      "@NYCCouncil endorsed the coalition",
      "outbound mentions prove policy influence"
    ],
    researchInquiryIds: ["INQ-NYCAC-SOCIAL-ENGAGEMENT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-X-REPOST-SOURCE-PATTERN",
    project: "nyc-artist-coalition",
    internalClaim:
      "The recovered native-repost corpus includes 194 Olympia Kazi source records and sustained circulation from aligned cultural, labor, vendor, venue, and public-official accounts.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text:
        "The recovered account record includes 194 native reposts sourced to Olympia Kazi, alongside recurring cultural, labor, vendor, venue, and civic sources.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Preserve the collective source pattern without treating reposting as authorship, endorsement, reach, or proof of who operated the account."
    }],
    evidence: [{
      sourceId: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
      relationship: "direct-support",
      supports: ["recovered native-repost source counts", "194 Olympia Kazi source records"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The count is a lower bound within recovered native reposts because the historical search did not expose older native reposts.",
      "A source handle does not establish who selected the repost or wrote account-authored posts.",
      "Repost-source frequency is not audience reach or blanket endorsement."
    ],
    antiClaims: [
      "Olympia Kazi authored 194 @NYCArtC posts",
      "Jamie selected every repost",
      "repost frequency proves impact"
    ],
    researchInquiryIds: ["INQ-NYCAC-X-OWNER-ARCHIVE-2026", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-X-DATED-TRACTION-SNAPSHOT",
    project: "nyc-artist-coalition",
    internalClaim:
      "On July 15, 2026, 628 of 696 recovered authored posts displayed at least one reply, repost, or like; observed counters remain held from accomplishment messaging.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text:
        "A dated interface snapshot found a displayed reply, repost, or like on 628 recovered authored posts.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Retain a reproducible comparison point while keeping volatile platform counters out of public accomplishment copy."
    }],
    evidence: [{
      sourceId: "SRC-NYCAC-X-FULL-POPULATION-2026-07-15",
      relationship: "direct-support",
      supports: ["628 qualifying authored posts", "dated visible counter totals"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Counters are volatile, incomplete interface observations rather than lifetime analytics.",
      "Bookmarks and views are excluded from the qualifying-record denominator.",
      "Interaction units are not unique people and do not measure reach, attendance, adoption, endorsement, or policy impact."
    ],
    antiClaims: [
      "628 people engaged",
      "the counters measure campaign impact",
      "the snapshot is complete lifetime analytics"
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const nycArtistCoalitionFullPopulationInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-X-OWNER-ARCHIVE-2026",
    project: "nyc-artist-coalition",
    question:
      "Can a lawful, minimized account-owner X archive reconcile the 1,757 profile-count items not exposed by the exhausted public routes?",
    methods: [
      "Traversed the authenticated replies-inclusive timeline through its historical stopping point.",
      "Ran monthly historical searches to recover older authored posts that the profile timeline did not expose.",
      "Deduplicated by canonical status ID, retained context records outside the denominator, and searched Jamie’s surfaced local archives for an owner export."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The profile reported 5,124 posts; 3,367 distinct account items were recovered and reviewed.",
      "The recovered corpus contains 696 authored posts and 2,671 native reposts.",
      "The remaining 1,757 profile-count slots are explicitly unclassified.",
      "No local owner X Archive was recovered in the searched locations."
    ],
    limitations: [
      "Public X routes can omit deleted, private, suspended, renamed, hidden, or platform-suppressed activity.",
      "The gap does not prove deletion or any item type.",
      "Any future owner archive must be minimized so direct messages, account settings, security data, contacts, and private analytics remain outside this public repository."
    ],
    sourceIds: ["SRC-NYCAC-X-FULL-POPULATION-2026-07-15"],
    publicSummary:
      "All 5,124 profile-reported slots are accounted for as 3,367 recovered items and an explicit 1,757-item recovery gap; an owner archive is needed to reconcile the remainder."
  }
];

export const nycArtistCoalitionFullPopulationIntake = [
  {
    id: "INT-NYCAC-X-FULL-POPULATION-2026-07-15",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "NYC Artist Coalition population-accounted X corpus",
    description:
      "A protected authenticated capture, deterministic minimization process, public aggregate-and-digest ledger, 1,757-item recovery gap, complete recovered-link resolution, mission-source inventory, and explicit traction and authorship boundaries.",
    whyItMatters:
      "It preserves the account as a long-running collective civic operating layer while distinguishing public communication, incoming engagement, individual authorship, endorsement, and policy causation.",
    projectIds: ["nyc-artist-coalition", "fair-rent-nyc", "talks-not-raids"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured into five bounded archive claims. All new projections remain held because the current public case-study language is clearer for hiring readers.",
    sourceIds: nycArtistCoalitionFullPopulationSources.map((source) => source.id),
    claimIds: nycArtistCoalitionFullPopulationClaims.map((claim) => claim.id),
    inquiryIds: [
      "INQ-NYCAC-X-OWNER-ARCHIVE-2026",
      "INQ-NYCAC-SOCIAL-ENGAGEMENT",
      "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.json",
      "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.manifest.json",
      "scripts/build-nycartc-x-public-ledger.mjs",
      "scripts/check-nycartc-x-public-ledger.mjs",
      "scripts/derive-nycartc-x-corpus.mjs"
    ],
    boundaries: [
      "Treat this as 100 percent population accounting, not 100 percent item recovery.",
      "Keep the authenticated capture, full item-level corpus, bulk post text, and per-item interaction data outside this public repository.",
      "Do not infer content, deletion, or item type for the 1,757-item gap.",
      "Do not assign shared-account posts to Jamie or another collaborator without post-level evidence.",
      "Do not project volatile counters, outbound mentions, or repost-source frequency as impact."
    ]
  }
] satisfies IntakeRecordInput[];
