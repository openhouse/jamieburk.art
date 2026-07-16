import type { KnowledgeBank } from "./schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

export const nycartcXCorpusIntakeItems: KnowledgeBank["intakeItems"] = [{
  id: "INTAKE-2026-07-15-NYCARTC-X-FULL-POPULATION",
  receivedAt: "2026-07-15",
  inputKind: "metric",
  summary: "Authenticated population-accounted archival review of @NYCArtC, including item-level recovery, an explicit recovery gap, campaign markers, resolved links, source leads, stakeholder communication, and public-safety boundaries.",
  projectIds: ["nyc-artist-coalition"],
  researchStatus: "researched",
  publicationStatus: "projected",
  sourceIds: [
    "SRC-NAC-X-CORPUS-2026-07-15",
    "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
    "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
    "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
    "SRC-NAC-HELLGATE-RAIDS-2023",
    "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
    "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"
  ],
  observationIds: [
    "OBS-NAC-X-POPULATION-ACCOUNTING",
    "OBS-NAC-X-COMPOSITION",
    "OBS-NAC-X-CAMPAIGN-CONTINUITY",
    "OBS-NAC-X-SOURCE-CIRCULATION",
    "OBS-NAC-X-COUNCIL-OUTBOUND",
    "OBS-NAC-X-SOURCE-LEADS",
    "OBS-NAC-X-TRACTION-HOLD"
  ],
  claimIds: [
    "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
    "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION",
    "CLM-NAC-X-STAKEHOLDER-COMMUNICATION",
    "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"
  ],
  researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
  nextActions: [
    "Seek a lawful account archive or stronger public archive to reduce the explicit 1,757-item recovery gap.",
    "Close-read and preserve blocked or dead article bodies before promoting article-level claims.",
    "Corroborate Jamie's account-establishment and identity-stewardship role without assigning shared-account authorship to one person."
  ]
}];

export const nycartcXCorpusSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-NAC-X-CORPUS-2026-07-15",
    title: "Authenticated NYC Artist Coalition population-accounted X corpus",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Authenticated replies-inclusive traversal and monthly historical-search partitions completed July 15, 2026",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/NYCArtC/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated population-accounted review of the public @NYCArtC account, July 15, 2026.",
    publicNote: "The profile reported 5,124 posts. The governed corpus preserves 3,367 recovered account items, an explicit 1,757-item recovery gap, 19 context-only public records, and redirect dispositions for every distinct t.co URL in recovered account items.",
    supportsGenerally: [
      "complete disposition of the 5,124-post profile control as 3,367 recovered items and a 1,757-item recovery gap",
      "696 recovered authored posts and 2,671 recovered reposts",
      "campaign-marker, outgoing-link, stakeholder-communication, source-circulation, and dated visible-interaction classifications"
    ],
    doesNotEstablish: [
      "the contents or item types of 1,757 unrecovered profile-count items",
      "Jamie's authorship of the account's posts",
      "the individual author of every shared-account post",
      "complete incoming engagement or lifetime reach",
      "endorsement of posted sources",
      "policy causation or sole campaign credit"
    ]
  },
  {
    id: "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
    title: "City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
    organization: "City Limits",
    author: "Bridget Bartolini",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
    preferredPublicUrl: "canonical",
    publicCitation: "Bridget Bartolini, 'City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say,' City Limits, April 6, 2020.",
    publicNote: "@NYCArtC circulated the article in a Fair Rent NYC post. The article documents United for Small Business NYC's policy argument during the first pandemic shutdown.",
    supportsGenerally: ["the commercial-rent policy context circulated by the account"],
    doesNotEstablish: ["Jamie's authorship of the post or article", "policy adoption", "campaign causation"]
  },
  {
    id: "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
    title: "New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-06-09",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gothamist.com/news/new-york-state-legislature-votes-repeal-law-50-shields-police-scrunity",
    preferredPublicUrl: "canonical",
    publicCitation: "Gothamist, 'New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny,' June 9, 2020.",
    publicNote: "The article establishes the legislative action the account circulated; the account's relationship between 50-a repeal and MARCH accountability remains a project interpretation.",
    supportsGenerally: ["the June 2020 legislative repeal circulated by the account"],
    doesNotEstablish: ["the coalition's causal role in repeal", "the account's broader interpretation of MARCH outcomes", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
    title: "The Lark Is Grounded: New-Play Incubator to Fold After 27 Years",
    organization: "American Theatre",
    author: "American Theatre Editors",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-10-05",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.americantheatre.org/2021/10/05/the-lark-is-grounded-new-play-incubator-to-fold-after-25-years/",
    preferredPublicUrl: "canonical",
    publicCitation: "American Theatre Editors, 'The Lark Is Grounded: New-Play Incubator to Fold After 27 Years,' October 5, 2021.",
    publicNote: "The article reported a proposed rent increase as one factor in the Lark's closure. @NYCArtC used it to connect a concrete cultural loss to Fair Rent NYC advocacy.",
    supportsGenerally: ["a cultural-space loss circulated in the Fair Rent NYC source field", "the article's report that proposed rent was one closure factor"],
    doesNotEstablish: ["a single-cause account of the closure", "Jamie's authorship of the post", "Fair Rent NYC policy causation"]
  },
  {
    id: "SRC-NAC-HELLGATE-RAIDS-2023",
    title: "Who Is Leading the Raids on NYC Nightclubs?",
    organization: "Hell Gate",
    author: "Adlan Jackson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2023-06-09",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    preferredPublicUrl: "canonical",
    publicCitation: "Adlan Jackson, 'Who Is Leading the Raids on NYC Nightclubs?,' Hell Gate, June 9, 2023.",
    publicNote: "@NYCArtC circulated the article as continuity evidence for nightlife-enforcement concerns while retaining its uncertainty about which operations were MARCH.",
    supportsGenerally: ["continued public scrutiny of multi-agency nightlife enforcement in 2023"],
    doesNotEstablish: ["that every described inspection was a MARCH raid", "coalition causation", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
    title: "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
    organization: "Hell Gate",
    author: "Adlan Jackson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-02-22",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
    preferredPublicUrl: "canonical",
    publicCitation: "Adlan Jackson, 'Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?,' Hell Gate, February 22, 2024.",
    publicNote: "The article and account post preserve continued public scrutiny after the announced end of MARCH without classifying the Saint Vitus action as MARCH.",
    supportsGenerally: ["continued venue-enforcement scrutiny after MARCH's announced end"],
    doesNotEstablish: ["that the Saint Vitus action was a MARCH raid", "the end of all multi-agency venue inspections", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019",
    title: "Mayor's Office of Nightlife drastically underfunded and understaffed, pol says",
    organization: "New York Daily News",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-08-28",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nydailynews.com/2019/08/28/mayors-office-of-nightlife-drastically-underfunded-and-understaffed-pol-says/",
    preferredPublicUrl: "canonical",
    publicCitation: "New York Daily News, 'Mayor's Office of Nightlife drastically underfunded and understaffed, pol says,' August 28, 2019.",
    publicNote: "The destination and headline were recovered from the account and live search metadata. Automated article-body access was blocked, so details remain unpromoted pending a recoverable copy.",
    supportsGenerally: ["a source lead circulated by the account"],
    doesNotEstablish: ["the article body's complete reporting", "the account's quoted numerical claim", "Jamie's authorship of the post"]
  }
];

export const nycartcXCorpusObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-NAC-X-POPULATION-ACCOUNTING",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "The profile reported 5,124 posts; the governed pass recovered 3,367 distinct account items and preserves the 1,757-item difference explicitly rather than inferring deletion or content type. Nineteen context-only public records sit outside that denominator, and 16 duplicate rendered views were removed.",
    locator: "Profile heading, population object, and transformation manifest in docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-COMPOSITION",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "The recovered account population contains 696 authored posts and 2,671 reposts spanning February 3, 2017 through May 18, 2026. Third-party repost text is omitted while stable public identity and classification fields remain auditable.",
    locator: "Corpus population and item kind fields",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-CAMPAIGN-CONTINUITY",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Among 696 recovered authored posts, 195 distinct posts used #FairRentNYC, 110 used #SaveNYCSpaces, 78 used #LetNYCDance, and 54 used #TalksNotRaids. The categories overlap.",
    locator: "Corpus campaignMarkers status-ID sets",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-SOURCE-CIRCULATION",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "All 1,235 distinct t.co URLs in the 3,367 recovered account items resolved. Of 696 authored posts, 446 contained 529 outgoing-link occurrences representing 287 distinct short URLs.",
    locator: "Corpus linkInventory and item outgoingLinks fields",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-COUNCIL-OUTBOUND",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "The recovered authored corpus contains 115 visible @NYCCouncil mention occurrences across 109 posts. These are outbound communications, not incoming Council engagement.",
    locator: "Corpus stakeholderCommunication outboundMentionCounts and authored status IDs",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-STAKEHOLDER-COMMUNICATION"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-SOURCE-LEADS",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Mission-relevant posted destinations span Cabaret Law repeal, Office of Nightlife, MARCH accountability, commercial rent, cultural-space closure, and later venue-enforcement reporting. Posting documents circulation, not endorsement or article accuracy.",
    locator: "Corpus sourceLeads inventory and linked source records",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NAC-X-TRACTION-HOLD",
    sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
    project: "nyc-artist-coalition",
    text: "On July 15, 2026, 630 of 696 authored posts displayed at least one visible interaction; the observed totals were 112 replies, 1,527 reposts, 2,761 likes, and 64 bookmarks. These volatile, incomplete counters remain held from accomplishment messaging.",
    locator: "Corpus heldObservations visibleInteractionTotals",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  }
];

export const nycartcXCorpusClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
    project: "nyc-artist-coalition",
    internalClaim: "The recovered authored account corpus shows one shared coalition identity carrying four campaign systems across 2017-2026, with distinct public traces for Fair Rent NYC, Save NYC Spaces, Let NYC Dance, and Talks Not Raids.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "One shared coalition identity carried four public campaign systems across nine years. Among 696 recovered authored posts, 195 used #FairRentNYC, 110 used #SaveNYCSpaces, 78 used #LetNYCDance, and 54 used #TalksNotRaids; categories overlap.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/fair-rent-nyc"]
    }],
    evidence: [{
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      relationship: "direct-support",
      supports: ["authored-post denominator", "distinct campaign-marker post counts", "2017-2026 recovered range", "population and authorship boundaries"],
      confidence: "high",
      renderCitation: true
    }],
    boundaries: [
      "The profile control is accounted for as 3,367 recovered account items plus an explicit 1,757-item gap; this is not a claim that all 5,124 items were recovered.",
      "Campaign categories overlap and measure public communication, not unique initiatives, audience reach, or policy outcomes.",
      "The account was shared. The corpus does not identify Jamie or any collaborator as author of every post, and it does not independently prove Jamie created the account."
    ],
    antiClaims: ["All 5,124 profile-reported items were recovered", "Jamie authored 696 coalition posts", "Hashtag volume proves campaign impact or causation", "The coalition account represents Jamie's work alone"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION",
    project: "nyc-artist-coalition",
    internalClaim: "The recovered corpus preserves a broad public source-and-action layer spanning campaign sites, official records, reporting, forms, event pages, and field resources.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "All 1,235 distinct t.co URLs in the recovered account items resolved; the governed corpus retains their destinations and source boundaries.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      { sourceId: "SRC-NAC-X-CORPUS-2026-07-15", relationship: "direct-support", supports: ["complete recovered-account-item URL resolution", "authored-post and outgoing-link denominators", "mission-relevant source inventory"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NAC-CITYLIMITS-RENT-COVID-2020", relationship: "context", supports: ["commercial-rent policy source circulation"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NAC-AMERICAN-THEATRE-LARK-2021", relationship: "context", supports: ["cultural-space loss source circulation"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NAC-HELLGATE-SAINT-VITUS-2024", relationship: "context", supports: ["later nightlife-enforcement source circulation"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["A resolved destination documents source circulation, not endorsement, page accuracy, audience reach, or authorship of the linked work.", "Four unresolved links appeared only in supplemental contexts and are excluded from the 1,235-account-item count.", "Every article-level claim still requires close reading before it can support a separate accomplishment claim."],
    antiClaims: ["Every linked source endorses NYC Artist Coalition", "The account authored the linked reporting or public records", "Posted links prove audience reach or policy effect"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "CLM-NAC-X-STAKEHOLDER-COMMUNICATION",
    project: "nyc-artist-coalition",
    internalClaim: "The authored corpus documents sustained outbound communication to government, arts, venue, labor, tenant, vendor, and community stakeholders, while the recovered repost network documents source circulation across those groups.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The authored corpus mentions @NYCCouncil in 109 posts and repeatedly addresses agencies, venues, artists, labor, tenant, vendor, and community groups. These are outbound communication findings, kept separate from incoming engagement.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [{ sourceId: "SRC-NAC-X-CORPUS-2026-07-15", relationship: "direct-support", supports: ["outbound mention counts", "recovered repost-source counts", "stakeholder-classification boundary"], confidence: "high", renderCitation: true }],
    boundaries: ["Outbound mentions and account reposts are not incoming engagement or endorsement.", "The separately governed incoming-engagement corpus retains posts authored by Council accounts.", "Repost-source counts are recovery lower bounds because older native reposts were not exposed by historical search."],
    antiClaims: ["109 Council members engaged with the coalition", "Every mentioned stakeholder replied or endorsed the work", "The account's repost choices represent Jamie alone"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION",
    project: "nyc-artist-coalition",
    internalClaim: "On July 15, 2026, 630 of 696 recovered authored posts displayed at least one visible interaction; totals were 112 replies, 1,527 reposts, 2,761 likes, and 64 bookmarks.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "A dated observation found visible interaction on 630 of 696 recovered authored posts; aggregate counts remain held because platform metrics are unstable, incomplete, and not stakeholder-attributed.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [{ sourceId: "SRC-NAC-X-CORPUS-2026-07-15", relationship: "direct-support", supports: ["authored-post denominator", "dated visible-interaction labels", "held aggregate observation"], confidence: "high", renderCitation: false }],
    boundaries: ["The figures are a July 15, 2026 platform observation, not complete lifetime engagement.", "Metrics attached to third-party reposts are excluded.", "The observation does not identify stakeholder types or measure campaign, policy, organizational, or cultural outcomes."],
    antiClaims: ["These are complete lifetime engagement totals", "Visible engagement proves policy impact", "Every interaction is attributable to a mission-relevant stakeholder"],
    researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy
  }
];

export const nycartcXCorpusResearchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: "INQ-NAC-X-FULL-POPULATION-2026",
  project: "nyc-artist-coalition",
  question: "What does a full population-accounted pass of @NYCArtC establish about campaign continuity, posted sources, stakeholder communication, mission-relevant traction, and evidence gaps?",
  methods: [
    "Verified the authenticated profile control and traversed the replies-inclusive timeline in overlapping passes.",
    "Ran monthly historical authored-search partitions through the profile timeline cutoff and deduplicated stable status IDs.",
    "Classified authored posts and native reposts separately, resolved short URLs, and derived campaign, stakeholder, source-lead, and visible-interaction inventories.",
    "Applied public-safety redaction and excluded all private account surfaces."
  ],
  runAt: "2026-07-15",
  resultStatus: "partially-recovered",
  findings: [
    "The full profile control is dispositioned as 3,367 recovered account items plus an explicit 1,757-item gap against 5,124 reported posts.",
    "The recovered population contains 696 authored posts and 2,671 reposts spanning February 2017 through May 2026.",
    "Distinct authored posts carrying campaign markers total 195 for #FairRentNYC, 110 for #SaveNYCSpaces, 78 for #LetNYCDance, and 54 for #TalksNotRaids; categories overlap.",
    "All 1,235 distinct t.co URLs in recovered account items resolved; 446 authored posts contain 529 outgoing-link occurrences representing 287 distinct short URLs.",
    "The authored corpus mentions @NYCCouncil in 109 posts, while separately governed incoming records retain the stricter Council-member engagement finding.",
    "Mission-relevant posted sources span Cabaret Law repeal, Office of Nightlife, MARCH accountability, commercial rent, cultural-space closure, and later venue-enforcement reporting.",
    "Visible interaction totals remain a dated held observation rather than accomplishment metrics."
  ],
  limitations: [
    "Historical search did not expose older native reposts, and the 1,757-item gap cannot be classified from the available evidence.",
    "A platform population accounting is not a complete project history, stakeholder ledger, or impact study.",
    "Outbound mentions and reposts are communication evidence, not incoming engagement, endorsement, reach, or causation.",
    "The shared account does not identify the person who authored every post and does not independently prove Jamie established it.",
    "Visible metrics may omit deleted, hidden, private, or platform-suppressed activity and are unstable over time."
  ],
  sourceIds: [
    "SRC-NAC-X-CORPUS-2026-07-15",
    "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
    "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
    "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
    "SRC-NAC-HELLGATE-RAIDS-2023",
    "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
    "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"
  ],
  publicSummary: "A full authenticated population-accounting pass preserves 3,367 recovered @NYCArtC account items, an explicit 1,757-item gap, resolved account-item links, four overlapping campaign traces, source leads, and strict stakeholder, authorship, privacy, and traction boundaries."
}];
