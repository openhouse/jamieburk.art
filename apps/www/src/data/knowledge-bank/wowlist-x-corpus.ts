import type { KnowledgeBank } from "./schema.ts";

export const wowlistXCorpusIntakeItems: KnowledgeBank["intakeItems"] = [{
  id: "INTAKE-2026-07-15-WOWLIST-X-FULL-POPULATION",
  receivedAt: "2026-07-15",
  inputKind: "metric",
  summary: "Authenticated full-population review of the 38 public records surviving on @wowlist, including every status, posted URL, public counter, mission pattern, and source relationship.",
  projectIds: ["wowlist", "196-sunday-dinner"],
  researchStatus: "researched",
  publicationStatus: "projected",
  sourceIds: [
    "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01",
    "SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
    "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
    "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016"
  ],
  observationIds: [
    "OBS-WOWLIST-X-POPULATION-ACCOUNTING",
    "OBS-WOWLIST-X-COMPOSITION",
    "OBS-WOWLIST-X-PUBLIC-SUPPORT",
    "OBS-WOWLIST-X-URL-INVENTORY",
    "OBS-WOWLIST-X-SCENE-KNOWLEDGE",
    "OBS-WOWLIST-X-CIVIC-CARE",
    "OBS-WOWLIST-X-COUNTER-SNAPSHOT"
  ],
  claimIds: [
    "CLM-WOWLIST-X-COMPLETE-SURVIVING-POPULATION",
    "CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE",
    "CLM-WOWLIST-X-SCENE-KNOWLEDGE-ROUTING",
    "CLM-WOWLIST-X-CIVIC-CARE-CONTINUITY"
  ],
  researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
  nextActions: [
    "Request a native account export if deleted-history completeness becomes necessary.",
    "Seek collaborator-approved evidence for individual post authorship; keep shared-account authorship unassigned in the meantime.",
    "Treat links and reposts as circulation evidence, not coverage, partnership, adoption, endorsement, organization, or impact.",
    "Retain mutable public counters as dated events and do not convert them into unique-person metrics."
  ]
}];

const supportPost = (
  id: string,
  title: string,
  statusId: string,
  publishedAt: string,
  publicNote: string,
  supportsGenerally: string[]
): KnowledgeBank["sources"][number] => ({
  id,
  title,
  organization: "WOW List",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-15",
  canonicalUrl: `https://x.com/wowlist/status/${statusId}`,
  preferredPublicUrl: "canonical",
  publicCitation: `${title}, ${publishedAt}.`,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "which individual teammate composed the shared-account post",
    "the product's complete support workload",
    "platform-wide adoption, satisfaction, audience, or impact"
  ]
});

export const wowlistXCorpusSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    title: "Authenticated @wowlist full-population archival review",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Two independent July 14 ledgers reconciled against an authenticated July 15 profile and 38 top-level status URLs",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated full-population review of the public @wowlist profile, July 15, 2026.",
    publicNote: "The public JSON corpus preserves all 38 top-level records represented by the live profile count: 16 account posts, six account replies, and 16 reposts from 13 public accounts.",
    supportsGenerally: [
      "38 of 38 surviving profile records recovered at item level",
      "16 account posts, six account replies, and 16 reposts",
      "16 reposts from 13 public accounts",
      "six public product-support and onboarding replies",
      "35 shortened-link occurrences resolving to 34 public destinations",
      "bounded patterns in event distribution, scene knowledge, civic mobilization, and care"
    ],
    doesNotEstablish: [
      "a native X export or deletion history",
      "that no older record was deleted before capture",
      "Jamie's authorship of every shared-account post",
      "the product's complete support workload, user population, adoption, audience, or impact",
      "WOW List organization of activities it linked or reposted",
      "historical or project-owned engagement analytics"
    ]
  },
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
    "WOW List followed-calendar feed reply",
    "591664757473673216",
    "2015-04-24",
    "The account explained the followed-calendar home feed and a planned local-or-everywhere control.",
    ["direct public product support", "feed-scope explanation"]
  ),
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
    "WOW List profile-navigation reply",
    "591666366215811073",
    "2015-04-24",
    "The account explained where a person could find their WOW Lists on their profile.",
    ["direct public product support", "profile-navigation explanation"]
  ),
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
    "WOW List multi-list submission reply",
    "591668857670148096",
    "2015-04-24",
    "The account explained how to add an event and place it on multiple WOW Lists.",
    ["direct public product support", "multi-list event submission"]
  ),
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
    "WOW List NYCDIY identity reply",
    "771412862191407104",
    "2016-09-01",
    "The account identified NYCDIY.org as a local calendar identity.",
    ["NYCDIY local-calendar identity"]
  ),
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
    "WOW List NYCDIY joining reply",
    "771455571501416448",
    "2016-09-01",
    "The account explained how people could join NYCDIY, add shows, and receive the weekly email.",
    ["direct public onboarding", "event submission", "weekly email"]
  ),
  supportPost(
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01",
    "WOW List NYCDIY and Sunday Dinner lineage reply",
    "771457416298921985",
    "2016-09-01",
    "The account explained that NYCDIY ran on WOW List and connected it to the Sunday Dinner potluck.",
    ["NYCDIY ran on WOW List", "WOW List's Sunday Dinner lineage"]
  ),
  {
    id: "SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    organization: "Grasstronaut",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl: "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation: "Grasstronaut, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' January 29, 2015, archived April 6, 2015.",
    publicNote: "WOW List linked this guide as scene knowledge about community building, conflict resolution, organizational knowledge, and documenting all-ages cultural spaces; it is not coverage of WOW List.",
    supportsGenerally: ["mission context for a grassroots cultural-infrastructure resource shared by WOW List"],
    doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship", "adoption or impact"]
  },
  {
    id: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
    title: "Zines 2.0",
    organization: "Good Times",
    author: "Elise Granata",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015, archived September 7, 2015.",
    publicNote: "WOW List linked this reporting about documenting and connecting geographically separated grassroots arts spaces. It supplies mission context, not coverage of WOW List.",
    supportsGenerally: ["mission context for scene documentation and connection"],
    doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship", "adoption or impact"]
  },
  {
    id: "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
    title: "VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
    organization: "KQED",
    author: "Brittany Hosea-Small and Adam Grossberg",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
    preferredPublicUrl: "canonical",
    publicCitation: "Brittany Hosea-Small and Adam Grossberg, 'VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire,' KQED, December 6, 2016.",
    publicNote: "WOW List shared public documentation of the Lake Merritt memorial vigil after the Ghost Ship fire. This supports the linked event's context, not WOW List organization of the vigil.",
    supportsGenerally: ["public context for a Ghost Ship memorial resource shared by WOW List"],
    doesNotEstablish: ["WOW List organization of the vigil", "Jamie attendance", "causality or impact from sharing"]
  },
  {
    id: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016",
    title: "Meow Wolf's DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-11",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://meowwolf.com/blob/meow-wolfs-diy-fund",
    preferredPublicUrl: "canonical",
    publicCitation: "Meow Wolf, 'Meow Wolf's DIY Fund,' December 11, 2016.",
    publicNote: "WOW List reposted the fund announcement. The source documents Meow Wolf's support for DIY arts and music spaces after Ghost Ship; it does not make WOW List a fund organizer or grantee.",
    supportsGenerally: ["public context for a DIY-space support resource amplified by WOW List"],
    doesNotEstablish: ["WOW List organization of the fund", "a grant to WOW List", "causality or impact from the repost"]
  }
];

export const wowlistXCorpusObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-WOWLIST-X-POPULATION-ACCOUNTING",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "The authenticated profile displayed 38 posts. Reconciliation of Posts and Replies recovered all 38 top-level status URLs; two independent ledgers agreed on the same 38 status IDs. This is 100% recovery of the surviving profile control, not a deletion history or native export.",
    locator: "Profile heading, top-level article time links, and docs/knowledge-bank/corpora/wowlist-x-public-corpus.json",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-COMPLETE-SURVIVING-POPULATION"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review and status-ID reconciliation"]
  },
  {
    id: "OBS-WOWLIST-X-COMPOSITION",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "The 38 records comprise 16 account posts, six account replies, and 16 reposts from 13 other public accounts. Twenty-two records are account-authored, but the shared account does not identify which teammate composed each one.",
    locator: "Corpus relationship and authorHandle fields",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-COMPLETE-SURVIVING-POPULATION"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured corpus analysis"]
  },
  {
    id: "OBS-WOWLIST-X-PUBLIC-SUPPORT",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "All six surviving account replies provide product support, onboarding, or calendar-identity guidance: feed scope, profile navigation, multi-list submission, NYCDIY identity, joining and contributing, and the relationship among NYCDIY, WOW List, and Sunday Dinner.",
    locator: "Statuses 591664757473673216, 591666366215811073, 591668857670148096, 771412862191407104, 771455571501416448, and 771457416298921985",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-WOWLIST-X-URL-INVENTORY",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "The corpus contains 35 shortened-link occurrences resolving to 34 distinct public destinations. Nineteen destinations point to WOW List, NYCDIY, Sunday Dinner, or another direct project-lineage surface; the rest route to events, scene resources, cultural organizations, reporting, mutual aid, memorial, and civic-mobilization resources.",
    locator: "Corpus outboundLinks and aggregateFindings fields",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-SCENE-KNOWLEDGE-ROUTING", "CLM-WOWLIST-X-CIVIC-CARE-CONTINUITY"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex redirect and destination analysis"]
  },
  {
    id: "OBS-WOWLIST-X-SCENE-KNOWLEDGE",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "Three account posts routed knowledge about grassroots all-ages infrastructure, the disconnect among similar alternative arts spaces, and documentation as a means of cultural connection and continuity.",
    locator: "Statuses 592810776961916929, 596690796641923073, and 596691623993581568",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-SCENE-KNOWLEDGE-ROUTING"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex post and source close reading"]
  },
  {
    id: "OBS-WOWLIST-X-CIVIC-CARE",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "Five account posts and five reposts connected event-discovery infrastructure to public demonstration, post-election organizing, Standing Rock support, Ghost Ship relief and memorial, and safer conditions for DIY spaces.",
    locator: "Corpus themes civic-mobilization-and-care and civic-care-amplification",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-CIVIC-CARE-CONTINUITY"],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex thematic corpus analysis"]
  },
  {
    id: "OBS-WOWLIST-X-COUNTER-SNAPSHOT",
    sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    project: "wowlist",
    text: "Twelve of 22 account-authored records displayed at least one public interaction in the July 2026 snapshot. Their visible counters summed to two replies, 20 reposts, and 21 likes. These are mutable counter events, not unique people, identified stakeholder accounts, sentiment, endorsement, adoption, or impact.",
    locator: "Account-authored records' visibleMetricsObserved2026 fields",
    status: "verified",
    confidence: "high",
    claimIds: [],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-counter aggregation"]
  }
];

const supportSourceIds = [
  "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01"
];

export const wowlistXCorpusClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-WOWLIST-X-COMPLETE-SURVIVING-POPULATION",
    project: "wowlist",
    internalClaim: "The complete surviving @wowlist profile population contained 38 top-level records in July 2026: 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "All 38 records represented by the surviving July 2026 WOW List profile count were recovered at item level.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/wowlist"]
    }],
    evidence: [{
      sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
      relationship: "direct-support",
      supports: ["38-record population reconciliation", "account-post, reply, and repost counts"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Complete means the current 38-item profile control is fully reconciled; it does not establish that no older record was deleted before capture.",
      "Account authorship does not identify the individual teammate who composed a post."
    ],
    antiClaims: ["The ledger is a complete X export.", "Jamie authored every @wowlist post.", "Thirty-eight posts measure adoption or impact."],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE",
    project: "wowlist",
    internalClaim: "All six surviving account replies explain feed scope, profile navigation, multi-list event submission, local-calendar joining, or the relationship among NYCDIY, WOW List, and Sunday Dinner.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text: "The public account Jamie established became a direct support surface: its six surviving replies explained feed scope, profile navigation, multi-list event submission, local-calendar onboarding, and how NYCDIY ran on WOW List from the Sunday Dinner potluck.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/wowlist"]
    }],
    evidence: [
      ...supportSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["public product support, onboarding, or calendar-identity guidance"],
        confidence: "high" as const,
        renderCitation: true
      })),
      {
        sourceId: "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15",
        relationship: "context",
        supports: ["Jamie's first-person account that he established the project identity"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie with establishing the account only as his first-person account and with co-building the product; do not assign individual post authorship without direct evidence.",
      "The surviving record demonstrates public support behavior, not the complete support workload, audience, adoption, satisfaction, or impact."
    ],
    antiClaims: ["Jamie personally wrote all six replies.", "X was WOW List's only support channel.", "The social record proves adoption scale or impact."],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-WOWLIST-X-SCENE-KNOWLEDGE-ROUTING",
    project: "wowlist",
    internalClaim: "Three surviving account posts routed public knowledge about all-ages cultural infrastructure, disconnected but related grassroots spaces, and scene documentation.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "WOW List used its public account to route practical knowledge about grassroots cultural infrastructure and scene documentation.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/wowlist"]
    }],
    evidence: [
      { sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15", relationship: "direct-support", supports: ["three scene-knowledge account posts"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015", relationship: "context", supports: ["all-ages infrastructure resource context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015", relationship: "context", supports: ["scene documentation and connection context"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Linked articles provide mission context; they are not press coverage or endorsement of WOW List."],
    antiClaims: ["WOW List authored the linked articles.", "The articles covered or endorsed WOW List.", "Sharing caused measurable outcomes."],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex source close reading"]
  },
  {
    id: "CLM-WOWLIST-X-CIVIC-CARE-CONTINUITY",
    project: "wowlist",
    internalClaim: "Five account posts and five reposts connected WOW List's event-discovery surface to civic mobilization, mutual aid, memorial, and DIY-space support.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The surviving account record connects event discovery with public mobilization, mutual aid, memorial, and support for DIY cultural spaces.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/wowlist"]
    }],
    evidence: [
      { sourceId: "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15", relationship: "direct-support", supports: ["five civic-care account posts and five civic-care reposts"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016", relationship: "context", supports: ["public memorial context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016", relationship: "context", supports: ["DIY-space fund context"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The account routed or amplified these resources; the social record does not establish that WOW List organized the activities or caused their outcomes."],
    antiClaims: ["WOW List organized every linked action.", "WOW List administered Meow Wolf's DIY Fund.", "Reposting proves partnership, endorsement, reach, or impact."],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex source close reading"]
  }
];

export const wowlistXCorpusResearchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: "INQ-WOWLIST-X-FULL-POPULATION-2026",
  project: "wowlist",
  question: "What source, URL, claim, traction, support, and stakeholder-pattern evidence is recoverable across 100% of the records represented by @wowlist's surviving profile count?",
  methods: [
    "Recover the union of authenticated Posts and Replies surfaces to stable exhaustion.",
    "Extract top-level status URLs from each article and reconcile them against the displayed profile count.",
    "Compare two independently produced ledgers and resolve discrepancies at status level.",
    "Separate account posts, account replies, and third-party reposts.",
    "Resolve all shortened links and classify destination relationships and mission themes.",
    "Aggregate mutable public counters only for account-authored records.",
    "Close-read mission-relevant linked articles while preserving coverage and causality boundaries."
  ],
  runAt: "2026-07-15",
  resultStatus: "recovered",
  findings: [
    "All 38 top-level status records represented by the surviving profile count were recovered.",
    "The corpus comprises 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
    "All six account replies provide product support, onboarding, or calendar-identity guidance.",
    "All 35 shortened-link occurrences resolve to 34 distinct public destinations.",
    "Three account posts route scene knowledge; five account posts and five reposts connect event discovery to civic mobilization and care.",
    "Twelve account-authored records show nonzero mutable public counters totaling two replies, 20 reposts, and 21 likes in the July 2026 snapshot."
  ],
  limitations: [
    "The recovered population is the surviving current-profile population, not a native X export or deletion history.",
    "The shared account does not identify which teammate composed each account-authored record.",
    "Reposts and posted links do not establish WOW List authorship, organization, partnership, endorsement, adoption, or impact.",
    "Public counters are mutable events and do not identify unique people, stakeholder groups, sentiment, or historical reach.",
    "Authentication state, private messages, private analytics, and credentials were excluded from capture."
  ],
  sourceIds: [
    "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
    "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
    "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01",
    "SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
    "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
    "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016"
  ],
  publicSummary: "All 38 records represented by the surviving profile count were recovered and dispositioned, including every posted URL; account, authorship, analytics, coverage, and impact boundaries remain explicit."
}];
