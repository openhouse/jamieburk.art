const reviewedAt = "2026-07-14";

export const wowlistPopulationAudit = {
  profileCountObserved: 38,
  postsTabItemsRecovered: 37,
  repliesTabItemsRecovered: 38,
  accountPostsRecovered: 16,
  accountRepliesRecovered: 6,
  accountAuthoredStatusesRecovered: 22,
  repostsRecovered: 16,
  distinctRepostSourceAccounts: 13,
  uniqueItemsRecovered: 38,
  unresolvedPopulationSlots: 0,
  dispositionTotal: 38,
  repliesOnlyStatusId: "665520472461860864",
  ledgerPath: "docs/knowledge-bank/data/wowlist-public-post-ledger.json"
} as const;

export const wowlistCorpusFindings = {
  directProductSupportReplies: 6,
  eventDistributionPosts: 5,
  sceneKnowledgePosts: 3,
  productCommunityInfrastructurePosts: 3,
  civicCareAuthoredPosts: 5,
  civicCareReposts: 5,
  platformUseAndEventAmplificationReposts: 5,
  communitySceneContextRecords: 6,
  distinctExternalHandlesInAuthoredRecords: 14,
  shortUrlOccurrences: 35,
  uniqueShortUrls: 35,
  uniqueResolvedDestinations: 34,
  uniqueProjectOrLineageDestinations: 19,
  authoredStatusesWithVisibleReaction: 12,
  authoredVisibleReplies: 2,
  authoredVisibleReposts: 20,
  authoredVisibleLikes: 21
} as const;

const supportSource = (
  id: string,
  title: string,
  statusId: string,
  publishedAt: string,
  publicCitation: string,
  supportsGenerally: string[]
) => ({
  id,
  title,
  organization: "WOW List",
  kind: "institutional-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl: `https://x.com/wowlist/status/${statusId}`,
  preferredPublicUrl: "canonical" as const,
  publicCitation,
  publicNote: "A surviving shared-account reply documenting public product support or community onboarding.",
  supportsGenerally,
  doesNotEstablish: [
    "the individual teammate who authored the shared-account reply",
    "the platform's total support workload",
    "platform-wide adoption, audience reach, satisfaction, or impact"
  ]
});

const supportSourceIds = [
  "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015",
  "SRC-X-WOWLIST-SUPPORT-PROFILE-2015",
  "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
  "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"
];

export const wowlistSocialCorpus = {
  intakeItems: [{
    id: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
    kind: "public-artifact",
    title: "Full-population archival production for @wowlist",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    projectIds: ["wowlist"],
    reason: "Reconcile every item in the 38-post surviving profile population, preserve every posted URL, and mature bounded findings about product support, event distribution, scene knowledge, civic care, stakeholder touchpoints, and visible traction.",
    sourceUrl: "https://x.com/wowlist",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      "SRC-X-WOWLIST-MEMBERS-MEETING-665520472461860864",
      ...supportSourceIds,
      "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
      "SRC-GOOD-TIMES-ZINES-2-2015",
      "SRC-KQED-GHOST-SHIP-VIGIL-2016",
      "SRC-MEOW-WOLF-DIY-FUND-2016"
    ],
    observationIds: [
      "OBS-WOWLIST-FULL-POPULATION-DISPOSITION",
      "OBS-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      "OBS-WOWLIST-STAKEHOLDER-TOUCHPOINTS",
      "OBS-WOWLIST-POSTED-URL-INVENTORY",
      "OBS-WOWLIST-EVENT-DISTRIBUTION",
      "OBS-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      "OBS-WOWLIST-CIVIC-CARE-CONTINUITY",
      "OBS-WOWLIST-VISIBLE-REACTION-SNAPSHOT"
    ],
    researchInquiryIds: [
      "INQ-WOWLIST-FULL-POPULATION-2026",
      "INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"
    ],
    boundaries: [
      "All 38 items in the July 2026 profile control were recovered at item level; this is not a platform export or proof that no older item was deleted before capture.",
      "The shared account does not identify the individual teammate who authored each post or reply.",
      "A mention, reply, repost, or linked article does not by itself establish partnership, endorsement, adoption, causality, or impact.",
      "Visible reaction counts are mutable July 2026 observations, not historical account analytics or unique people reached.",
      "No authentication, session, private-message, or account-analytics material enters the repository."
    ]
  }],

  observations: [
    {
      id: "OBS-WOWLIST-FULL-POPULATION-DISPOSITION",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text: "Authenticated Posts and Replies passes recovered all 38 items in the live profile control: 16 account posts, six account replies, and 16 reposts from 13 public source accounts.",
      locator: "Population audit and item-level records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION"],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      limitations: [
        "The recovery is not an X export, deletion history, withheld-status log, or historical analytics report.",
        "Complete surviving population does not mean no earlier post was deleted before capture."
      ]
    },
    {
      id: "OBS-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text: "All six surviving account replies function as public product support or onboarding: feed scope, profile navigation, multi-list event submission, local-calendar identity, joining and receiving email, and the relationship among NYCDIY, WOW List, and Sunday Dinner.",
      locator: "Statuses 591664757473673216, 591666366215811073, 591668857670148096, 771412862191407104, 771455571501416448, and 771457416298921985",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"],
      researchInquiryIds: [],
      limitations: [
        "The account record does not identify which teammate authored each reply.",
        "Six surviving replies do not represent the platform's complete support workload or user experience."
      ]
    },
    {
      id: "OBS-WOWLIST-STAKEHOLDER-TOUCHPOINTS",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "context",
      text: "The 22 account-authored records mention 14 external handles. Direct support exchanges include people and project accounts such as @juliafredenburg, @all_ages, @285KENT, @lil_seltz, @selfdfens, and @showpaper; repost sources include 13 accounts across DIY arts, cultural spaces, public projects, and collaborators.",
      locator: "aggregateFindings and records[].mentionedHandles",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      limitations: [
        "A mention or repost does not establish partnership, endorsement, account use, or organizational affiliation.",
        "Account labels and stakeholder categories are descriptive public context, not a complete network analysis."
      ]
    },
    {
      id: "OBS-WOWLIST-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text: "The corpus preserves 35 short-link occurrences resolving to 34 unique public destinations, including 19 unique WOW List, NYCDIY, or Sunday Dinner destinations and 15 external destinations.",
      locator: "aggregateFindings and records[].outboundLinks",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING", "CLM-WOWLIST-CIVIC-CARE-CONTINUITY"],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      limitations: [
        "Current redirect resolution does not prove historical availability or continuity.",
        "A posted destination does not establish authorship, partnership, use, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-EVENT-DISTRIBUTION",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text: "Five account posts distribute public events through WOW List pages across Kansas City, Chicago, New York, multi-state touring, and Allied Media Conference contexts; five reposts amplify organizers using event or calendar links.",
      locator: "aggregateFindings.themeCounts and item-level destination records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING"],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      limitations: [
        "The corpus demonstrates public distribution behavior, not attendance, adoption scale, geographic completeness, or event outcomes.",
        "A repost does not establish WOW List as organizer of the underlying event."
      ]
    },
    {
      id: "OBS-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "context",
      text: "Three authored posts route practical or historical scene knowledge: an all-ages venue manual, the disconnect between similar arts warehouses, and reporting about documenting and connecting DIY culture and spaces.",
      locator: "Statuses 592810776961916929, 596690796641923073, and 596691623993581568",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING"],
      researchInquiryIds: [],
      limitations: [
        "The linked articles provide mission context and are not press coverage or endorsement of WOW List.",
        "Routing knowledge does not establish authorship, uptake, or outcome."
      ]
    },
    {
      id: "OBS-WOWLIST-CIVIC-CARE-CONTINUITY",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "context",
      text: "Five account posts and five reposts center public gathering, mutual aid, mourning, DIY-space safety, or support for cultural spaces, including Black Lives Matter, nationwide post-election gatherings, Standing Rock, Ghost Ship relief and vigils, and Meow Wolf's DIY Fund.",
      locator: "aggregateFindings.themeCounts and civic-care item records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-CIVIC-CARE-CONTINUITY"],
      researchInquiryIds: [],
      limitations: [
        "Amplification does not establish WOW List or Jamie as organizer, author, participant, beneficiary, or cause.",
        "The corpus documents public routing and care themes, not resulting action or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-VISIBLE-REACTION-SNAPSHOT",
      intakeId: "INTAKE-WOWLIST-FULL-POPULATION-CORPUS-2026",
      sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      project: "wowlist",
      kind: "limitation",
      text: "At the July 2026 public snapshot, 12 of 22 account-authored statuses displayed at least one reaction; the visible totals were two replies, 20 reposts, and 21 likes.",
      locator: "aggregateFindings.accountAuthoredVisibleReactionSnapshot",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-VISIBLE-TRACTION-SNAPSHOT"],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      limitations: [
        "The counts are mutable current interface observations, not contemporaneous analytics.",
        "They do not establish unique people, impressions, clickthrough, adoption, satisfaction, causality, or impact.",
        "Metrics on the 16 reposted source statuses belong to those source posts and are excluded from this account-authored snapshot."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
      title: "Authenticated @wowlist full-population recovery and public-post ledger",
      organization: "WOW List",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/269f97ff752bd201b47ab5932425c50eb7e66759/docs/knowledge-bank/data/wowlist-public-post-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation: "Authenticated read-only review of the public @wowlist Posts and Replies surfaces, with a 38-record public ledger, July 14, 2026.",
      publicNote: "The profile displayed 38 posts. Cross-tab reconciliation recovered all 38 unique public items: 16 account posts, six account replies, and 16 reposts from 13 other public accounts. The ledger preserves every recovered posted URL and bounded classifications without reproducing full post text.",
      supportsGenerally: [
        "100 percent item-level recovery of the 38-item surviving profile control",
        "16 account posts, six account replies, and 16 reposts from 13 public source accounts",
        "six public product-support or onboarding replies",
        "35 posted short links resolving to 34 unique public destinations",
        "bounded patterns in event distribution, scene knowledge, stakeholder touchpoints, civic care, and visible reactions"
      ],
      doesNotEstablish: [
        "a complete platform export, deletion history, or proof that no older post was deleted",
        "the individual teammate who authored each shared-account record",
        "the platform's total support workload, audience, adoption, satisfaction, or impact",
        "WOW List's organization of activities it reposted or linked",
        "historical or project-owned account analytics"
      ]
    },
    {
      id: "SRC-X-WOWLIST-MEMBERS-MEETING-665520472461860864",
      title: "WOW List all-ages calendar members-meeting invitation",
      organization: "WOW List",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2015-11-14",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/wowlist/status/665520472461860864",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List public invitation to an all-ages calendar community meeting, November 14, 2015.",
      publicNote: "This was the one profile-counted record recovered from the Replies surface but absent from the Posts-tab set; it links a public all-ages calendar and members meeting.",
      supportsGenerally: ["cross-tab population reconciliation", "public product and community-infrastructure context"],
      doesNotEstablish: ["the meeting's attendance or outcome", "the individual author of the shared-account post", "platform-wide adoption"]
    },
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015",
      "WOW List reply explaining followed-calendar feed scope",
      "591664757473673216",
      "2015-04-24",
      "WOW List public reply explaining followed-calendar feed scope and a planned local-or-everywhere control, April 24, 2015.",
      ["direct public product support", "feed-scope explanation"]
    ),
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-PROFILE-2015",
      "WOW List reply explaining profile navigation",
      "591666366215811073",
      "2015-04-24",
      "WOW List public reply explaining where a person could find their WOW Lists on their profile, April 24, 2015.",
      ["direct public product support", "profile-navigation explanation"]
    ),
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
      "WOW List reply explaining multi-list event submission",
      "591668857670148096",
      "2015-04-24",
      "WOW List public reply explaining how to add an event and place it on multiple WOW Lists, April 24, 2015.",
      ["direct public product support", "multi-list event submission"]
    ),
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
      "WOW List reply identifying NYCDIY",
      "771412862191407104",
      "2016-09-01",
      "WOW List public reply identifying NYCDIY.org as a local calendar identity, September 1, 2016.",
      ["NYCDIY as a public calendar identity connected to WOW List"]
    ),
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
      "WOW List reply explaining how to join NYCDIY",
      "771455571501416448",
      "2016-09-01",
      "WOW List public reply explaining how people could join NYCDIY, add shows, and receive a weekly email, September 1, 2016.",
      ["direct public onboarding", "event submission", "weekly email"]
    ),
    supportSource(
      "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
      "WOW List reply connecting NYCDIY, WOW List, and Sunday Dinner",
      "771457416298921985",
      "2016-09-01",
      "WOW List public reply explaining that NYCDIY ran on WOW List and connecting the project to the Sunday Dinner potluck, September 1, 2016.",
      ["NYCDIY ran on WOW List", "WOW List's Sunday Dinner lineage"]
    ),
    {
      id: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
      title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
      organization: "Grasstronaut",
      author: "Elise Granata",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-01-29",
      accessedAt: reviewedAt,
      canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
      archiveUrl: "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
      preferredPublicUrl: "archive",
      publicCitation: "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015, archived April 6, 2015.",
      publicNote: "WOW List circulated this guide to organizational structures, promotion, production, space, fundraising, community building, conflict resolution, and the legal and social conditions of all-ages venues. It is not press coverage of WOW List.",
      supportsGenerally: ["mission context for a scene-knowledge link circulated by WOW List", "grassroots cultural-infrastructure knowledge as a subject of the account's public routing"],
      doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship of the article or manual", "platform adoption or impact"]
    },
    {
      id: "SRC-GOOD-TIMES-ZINES-2-2015",
      title: "Zines 2.0",
      organization: "Good Times",
      author: "Elise Granata",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-05-06",
      accessedAt: reviewedAt,
      canonicalUrl: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
      archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
      preferredPublicUrl: "archive",
      publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015, archived September 7, 2015.",
      publicNote: "WOW List linked this reporting about documenting and connecting grassroots arts spaces. It supplies mission context for the shared link; it is not reporting about WOW List.",
      supportsGenerally: ["mission context for a scene-documentation article circulated by WOW List", "the account's routing of knowledge about disconnected but related DIY cultural spaces"],
      doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship of the article", "platform adoption or impact"]
    },
    {
      id: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
      title: "Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
      organization: "KQED",
      author: "Brittany Hosea-Small and Adam Grossberg",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-12-06",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
      preferredPublicUrl: "canonical",
      publicCitation: "Brittany Hosea-Small and Adam Grossberg, 'Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire,' KQED, December 6, 2016.",
      publicNote: "WOW List shared public documentation of the Lake Merritt memorial vigil after the Ghost Ship fire. This supports the linked event's context, not WOW List's organization of the vigil.",
      supportsGenerally: ["public context for a Ghost Ship memorial resource circulated by WOW List"],
      doesNotEstablish: ["WOW List organization of the vigil", "Jamie attendance", "causality or impact from sharing the link"]
    },
    {
      id: "SRC-MEOW-WOLF-DIY-FUND-2016",
      title: "Meow Wolf's DIY Fund",
      organization: "Meow Wolf",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-12-11",
      accessedAt: reviewedAt,
      canonicalUrl: "https://meowwolf.com/blob/meow-wolfs-diy-fund",
      preferredPublicUrl: "canonical",
      publicCitation: "Meow Wolf, 'Meow Wolf's DIY Fund,' December 11, 2016.",
      publicNote: "WOW List reposted the fund announcement. The source documents Meow Wolf's support for DIY arts and music spaces after Ghost Ship; it does not make WOW List a fund organizer or grantee.",
      supportsGenerally: ["public context for a DIY-space support resource amplified by WOW List"],
      doesNotEstablish: ["WOW List organization of the fund", "a grant to WOW List", "causality or impact from the repost"]
    }
  ],

  claims: [
    {
      id: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      project: "wowlist",
      internalClaim: "The complete surviving @wowlist profile population contains 38 unique records matching the live 38-post control: 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "All 38 profile-counted WOW List records were recovered: 22 account-authored records and 16 reposts from 13 other public accounts.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["38-record population reconciliation", "account-post, reply, and repost counts"], confidence: "high", renderCitation: false }],
      boundaries: [
        "Complete means the current 38-item profile control is fully reconciled; it does not establish that no status was deleted before capture.",
        "Account authorship does not identify the individual teammate who composed a post."
      ],
      antiClaims: ["The ledger is a complete X platform export.", "Jamie authored every @wowlist post.", "Thirty-eight posts measure WOW List adoption or impact."],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      project: "wowlist",
      internalClaim: "All six account replies in the complete surviving corpus explain feed scope, profile navigation, multi-list event submission, local-calendar joining, or the relationship among NYCDIY, WOW List, and Sunday Dinner.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "WOW List's shared public account became a direct support surface: its six surviving replies explained feed scope, profile navigation, multi-list event submission, joining local calendars, and how NYCDIY ran on WOW List from the Sunday Dinner potluck.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      }],
      evidence: [
        { sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["complete six-reply support pattern", "population reconciliation"], confidence: "high", renderCitation: true },
        ...supportSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["public product support, onboarding, or calendar-identity guidance"], confidence: "high" as const, renderCitation: true }))
      ],
      boundaries: [
        "Credit the account as shared project infrastructure; do not assign individual reply authorship without direct evidence.",
        "The surviving record demonstrates public support behavior, not the full support workload, adoption, satisfaction, audience, or impact."
      ],
      antiClaims: ["Jamie personally wrote all six replies.", "X was WOW List's only support channel.", "The social record alone proves adoption scale or impact."],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      project: "wowlist",
      internalClaim: "Three account posts routed scene knowledge about grassroots all-ages infrastructure, disconnected but similar arts spaces, and documentation as cultural continuity.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The account did more than distribute events: it routed practical and historical knowledge among DIY cultural scenes.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["three scene-knowledge records and their outbound destinations"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015", relationship: "context", supports: ["grassroots cultural-infrastructure context for one linked guide"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-GOOD-TIMES-ZINES-2-2015", relationship: "context", supports: ["scene-documentation and connection context for one linked article"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["The linked articles supply mission context; they are not press coverage or endorsements of WOW List.", "Routing a resource does not establish authorship, adoption, or outcome."],
      antiClaims: ["Grasstronaut or Good Times reviewed WOW List.", "WOW List authored the linked articles.", "Three links prove nationwide scene impact."],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      project: "wowlist",
      internalClaim: "The complete account corpus contains five account posts and five reposts centered on civic mobilization or care, including public gathering, mutual-aid resources, mourning, DIY-space safety, and cultural-space support.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The account's public record extends from event distribution into gathering, mutual aid, mourning, and support for the conditions that let cultural spaces survive.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["five account civic-care posts and five civic-care reposts"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-KQED-GHOST-SHIP-VIGIL-2016", relationship: "context", supports: ["public context for a memorial resource shared by the account"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-MEOW-WOLF-DIY-FUND-2016", relationship: "context", supports: ["public context for a DIY-space support resource reposted by the account"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Amplifying a gathering or resource does not establish WOW List or Jamie as its organizer, author, participant, beneficiary, or cause.", "The account corpus documents public routing and care themes; it does not measure resulting action or impact."],
      antiClaims: ["WOW List organized every amplified mobilization.", "Jamie authored every shared resource.", "Social posts alone demonstrate civic impact."],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-VISIBLE-TRACTION-SNAPSHOT",
      project: "wowlist",
      internalClaim: "At the July 2026 public snapshot, 12 of 22 account-authored statuses displayed at least one reaction, totaling two replies, 20 reposts, and 21 likes.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A July 2026 interface snapshot preserves limited visible reactions on the surviving account-authored corpus; it is not used as an impact claim.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["July 2026 visible reaction snapshot for account-authored statuses"], confidence: "high", renderCitation: false }],
      boundaries: ["The totals are current interface observations rather than contemporaneous analytics.", "Exclude source-post metrics on reposts from WOW List traction."],
      antiClaims: ["The visible counts measure historical reach.", "The counts represent unique people or completed actions.", "Source-status reactions belong to WOW List."],
      researchInquiryIds: ["INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-WOWLIST-FULL-POPULATION-2026",
      project: "wowlist",
      question: "Can the full surviving population of @wowlist posts be recovered, classified, linked, and integrated without overstating completeness, authorship, adoption, or impact?",
      methods: [
        "Used the authenticated live profile's displayed 38-post count as the control total.",
        "Harvested the Posts and Replies surfaces separately and deduplicated every rendered item by canonical status ID.",
        "Reconciled 37 Posts-tab records with one additional account reply recovered from the Replies tab and directly reconfirmed that status.",
        "Resolved all 35 posted short URLs, then classified every record by account relationship, primary theme, mentions, hashtags, public destination, and visible reaction boundary.",
        "Closely read mission-relevant public destinations while distinguishing source context from coverage of WOW List."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "All 38 items in the live-profile control were recovered with unique status IDs.",
        "The population contains 16 account posts, six account replies, and 16 reposts from 13 other public accounts.",
        "All six account replies function as product support, onboarding, or local-calendar identity guidance.",
        "Five account posts distribute events; three route scene knowledge; three explain product or community infrastructure.",
        "Five account posts and five reposts center civic mobilization or care.",
        "The 35 posted short URLs resolved to 34 unique public destinations."
      ],
      limitations: [
        "A complete current profile population does not prove that no record was deleted before July 2026.",
        "The shared account does not identify the individual teammate who composed each post.",
        "Social records do not measure the platform's full user population, city reach, event volume, support workload, impressions, adoption, or impact.",
        "A repost or outbound link does not make WOW List the author or organizer of the underlying work.",
        "Visible reaction totals are mutable snapshots and are not historical reach measures."
      ],
      sourceIds: [
        "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
        ...supportSourceIds,
        "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
        "SRC-GOOD-TIMES-ZINES-2-2015",
        "SRC-KQED-GHOST-SHIP-VIGIL-2016",
        "SRC-MEOW-WOLF-DIY-FUND-2016"
      ],
      publicSummary: "All 38 profile-counted WOW List records were recovered and classified, showing a shared public identity used for event distribution, product support, community connection, civic mobilization, and care."
    },
    {
      id: "INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION",
      project: "wowlist",
      question: "Which preserved records can establish historical audience reach, clickthrough, organizer adoption, support volume, or resulting community action beyond the public-post corpus?",
      methods: [
        "Keep July 2026 visible reaction counts separate from historical analytics.",
        "Cross-reference public posts with reproducible aggregate database counts, public repository history, archived referral records, and collaborator testimony where available.",
        "Distinguish account mentions, direct replies, event-link use, organizer adoption, audience reach, and downstream action as separate propositions."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "The corpus establishes public support, distribution, stakeholder touchpoints, and current visible reaction counts.",
        "It does not preserve contemporaneous impressions, clickthrough, conversion, support-channel volume, or downstream-action data.",
        "Existing aggregate product records should be integrated separately rather than inferred from social activity."
      ],
      limitations: [
        "Current interface counts are mutable and cannot reconstruct historical analytics.",
        "A public mention, reply, repost, or linked event is not equivalent to adoption or impact.",
        "Collective account use and individual contribution require separate attribution evidence."
      ],
      sourceIds: ["SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026"],
      publicSummary: "The social corpus establishes public operating patterns; historical adoption and impact remain separate evidence tasks."
    }
  ]
} as const;
