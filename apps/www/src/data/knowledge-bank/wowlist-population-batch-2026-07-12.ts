import type { KnowledgeBank } from "./schema.ts";

type WOWListPopulationBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const supportPosts = [
  {
    id: "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
    title: "WOWList post naming Jamie, Richard, and Sunday Dinner calendar origins",
    publishedAt: "2014-02-12",
    canonicalUrl: "https://x.com/wowlist/status/433671630837919744",
    publicCitation:
      "WOWList post naming Richard, Jamie Burkart, and the calendars made at Sunday Dinner, February 12, 2014.",
    supportsGenerally: [
      "the public account named Jamie and Richard in relation to the project",
      "the post described the project as based on calendars made at Sunday Dinner"
    ]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
    title: "WOWList reply explaining local and followed-calendar feeds",
    publishedAt: "2015-04-24",
    canonicalUrl: "https://x.com/wowlist/status/591664757473673216",
    publicCitation:
      "WOWList reply explaining the local home calendar and a planned local/everywhere toggle, April 24, 2015.",
    supportsGenerally: ["direct public product support", "feed-scope explanation"]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-PROFILE-2015",
    title: "WOWList reply explaining profile navigation",
    publishedAt: "2015-04-24",
    canonicalUrl: "https://x.com/wowlist/status/591666366215811073",
    publicCitation:
      "WOWList reply explaining where a person's WOW Lists appeared on their profile, April 24, 2015.",
    supportsGenerally: ["direct public product support", "profile-navigation explanation"]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
    title: "WOWList reply explaining multi-list event submission",
    publishedAt: "2015-04-24",
    canonicalUrl: "https://x.com/wowlist/status/591668857670148096",
    publicCitation:
      "WOWList reply explaining how to add an event and place it on additional WOW Lists, April 24, 2015.",
    supportsGenerally: ["direct public product support", "multi-list event submission"]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
    title: "WOWList reply identifying NYCDIY",
    publishedAt: "2016-09-01",
    canonicalUrl: "https://x.com/wowlist/status/771412862191407104",
    publicCitation: "WOWList reply identifying NYCDIY.org, September 1, 2016.",
    supportsGenerally: ["NYCDIY as a public calendar identity connected to WOWList"]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
    title: "WOWList reply explaining how to join NYCDIY",
    publishedAt: "2016-09-01",
    canonicalUrl: "https://x.com/wowlist/status/771455571501416448",
    publicCitation:
      "WOWList reply explaining that people could join NYCDIY to add shows and receive a weekly email, September 1, 2016.",
    supportsGenerally: ["direct public onboarding", "event submission", "weekly email"]
  },
  {
    id: "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
    title: "WOWList reply connecting NYCDIY, WOWList, and Sunday Dinner",
    publishedAt: "2016-09-01",
    canonicalUrl: "https://x.com/wowlist/status/771457416298921985",
    publicCitation:
      "WOWList reply explaining that NYCDIY ran on WOWList and that the project came from the Sunday Dinner potluck, September 1, 2016.",
    supportsGenerally: [
      "NYCDIY ran on WOWList",
      "WOWList was described as a DIY community-calendar project",
      "the account connected the project to Sunday Dinner"
    ]
  }
] as const;

const supportSourceIds = supportPosts.map((source) => source.id);

export const wowlistPopulationBatchRecords: WOWListPopulationBatch = {
  sources: [
    {
      id: "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
      title: "WOWList live X profile",
      organization: "WOWList",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/wowlist",
      preferredPublicUrl: "canonical",
      publicCitation: "WOWList public X profile, accessed July 12, 2026.",
      publicNote:
        "The live profile displayed 38 posts and a February 2014 join date. The count was used as the population control.",
      supportsGenerally: [
        "the account identity @wowlist",
        "a displayed control total of 38 posts",
        "a February 2014 join date"
      ],
      doesNotEstablish: ["historical impressions", "individual authorship of every account post"]
    },
    {
      id: "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
      title: "WOWList full-population reconciliation run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level reconciliation of the complete live @wowlist profile timeline.",
      publicNote:
        "Small-step authenticated harvesting of Posts and Replies recovered 38 unique status records against the 38-post live profile control. The public-safe census records metadata and editorial classification without reproducing full post text.",
      protectedLocatorId: "RESEARCH-WOWLIST-FULL-POPULATION-2026-001",
      supportsGenerally: [
        "38 of 38 profile-counted records recovered with unique status IDs",
        "22 WOWList-authored records: 16 standalone posts and six replies",
        "16 reposts from 13 other public accounts",
        "activity from February 12, 2014, through January 12, 2017",
        "six authored replies functioning as public product support or identity guidance",
        "five authored civic-mobilization or care posts and five civic-care reposts"
      ],
      doesNotEstablish: [
        "individual authorship of every shared-account post",
        "the complete audience or interaction graph",
        "historical impressions",
        "platform-wide adoption from the social account alone",
        "causality for civic or cultural outcomes"
      ]
    },
    ...supportPosts.map((source) => ({
      ...source,
      organization: "WOWList",
      author: "WOWList account",
      kind: "institutional-social-post" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-12" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "the individual teammate who authored the post",
        "platform-wide adoption or audience reach"
      ]
    }))
  ],
  claims: [
    {
      id: "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
      project: "wowlist",
      internalClaim:
        "The complete surviving @wowlist profile population contains 38 unique records matching the live 38-post control: 16 authored standalone posts, six authored replies, and 16 reposts from 13 other accounts.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "All 38 profile-counted WOWList records were recovered: 22 account-authored records and 16 reposts from other public accounts.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["38-post live profile control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level reconciliation and authorship-type counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means the current 38-post control is fully reconciled; it does not establish that no post was deleted before the capture date.",
        "Account authorship does not identify the individual teammate who wrote a post."
      ],
      antiClaims: [
        "Jamie authored every @wowlist post",
        "The social account represents every historical WOWList communication",
        "Thirty-eight posts measure WOWList adoption or impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      project: "wowlist",
      internalClaim:
        "The complete surviving account record includes six authored replies that explain feed scope, profile navigation, event submission, local-calendar joining, and the relationship among NYCDIY, WOWList, and Sunday Dinner.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "The public account Jamie established became a direct support surface: it explained feed scope, profile navigation, multi-list event submission, joining local calendars, and how NYCDIY ran on WOWList from the Sunday Dinner potluck.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        },
        {
          key: "archive-note",
          text:
            "Six recovered authored replies show the WOWList account functioning as a direct product-support and onboarding surface.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-population-2026-07-12"]
        }
      ],
      evidence: [
        ...supportSourceIds.map((sourceId) => ({
          sourceId,
          relationship: "direct-support" as const,
          supports: ["public product lineage, support, or onboarding"],
          confidence: "high" as const,
          renderCitation: true
        })),
        {
          sourceId: "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
          relationship: "context",
          supports: ["Jamie's confirmation that he established the project account"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Jamie with establishing the account and co-building the product; do not assign individual post authorship without direct evidence.",
        "The account record demonstrates public support behavior, not the full support workload."
      ],
      antiClaims: [
        "Jamie personally wrote all six replies",
        "Twitter was WOWList's only support channel",
        "The social record alone proves adoption scale"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      project: "wowlist",
      internalClaim:
        "The complete account record includes five WOWList-authored civic-mobilization or care posts and five civic-care reposts spanning Black Lives Matter gathering, anti-Trump marches, popular-vote organizing, Standing Rock, Ghost Ship mutual aid and vigils, calls to mayors, and support for DIY spaces.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The account moved from event distribution into civic mobilization and care, preserving gathering routes, mutual-aid links, vigils, and support for DIY spaces.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level civic-care classification"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The account amplified public resources and gatherings; it does not establish authorship, leadership, attendance, or causality for every effort.",
        "The Yoko Ono repost is not included in the five civic-care repost count because its resolved destination was not recovered in this pass."
      ],
      antiClaims: [
        "WOWList organized every amplified mobilization",
        "Social posts alone demonstrate civic impact",
        "Jamie authored every amplified resource"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-FULL-POPULATION-2026",
      project: "wowlist",
      question:
        "Can the full population of @wowlist posts be recovered, classified, and integrated into the knowledge-bank lifecycle?",
      methods: [
        "Used the live profile's displayed 38-post count as the control total.",
        "Harvested Posts and Replies separately in 650-pixel increments.",
        "Deduplicated every rendered item by its primary status ID.",
        "Classified every record by account authorship, publication type, primary theme, mentions, and hashtags.",
        "Compared the complete census with previously recovered public oEmbed posts and local WOWList archive context."
      ],
      runAt: "2026-07-12",
      resultStatus: "recovered",
      findings: [
        "All 38 profile-counted records were recovered with unique status IDs.",
        "The population contains 16 authored standalone posts, six authored replies, and 16 reposts from 13 other accounts.",
        "The earliest recovered record is February 12, 2014; the latest is January 12, 2017.",
        "Six authored replies document direct product support or calendar-identity guidance.",
        "The first authored post names Jamie and Richard and connects the project to calendars made at Sunday Dinner.",
        "Five authored posts and five reposts carry civic-mobilization or care themes."
      ],
      limitations: [
        "A complete current profile population does not prove that no record was deleted before July 2026.",
        "The shared account does not identify the teammate who authored each post.",
        "Social records do not measure the platform's full user population, city reach, event volume, or support workload.",
        "Reaction totals and impressions are not used as stable historical reach measures."
      ],
      sourceIds: [
        "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
        ...supportSourceIds
      ],
      publicSummary:
        "All 38 profile-counted WOWList records were recovered and classified, revealing a public identity used for event distribution, product support, community connection, civic mobilization, and care.",
      protectedLocatorId: "RESEARCH-WOWLIST-FULL-POPULATION-2026-001"
    }
  ]
};
