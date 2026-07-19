import type { KnowledgeBank } from "./schema.ts";

type KCTownHallPopulationBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const publicPosts = [
  {
    id: "SRC-KCTH-SOCIAL-LAUNCH-2018",
    title: "KC Town Hall account launch post",
    publishedAt: "2018-07-02",
    canonicalUrl: "https://x.com/KCTownHall/status/1013893135695601665",
    publicCitation:
      "KC Town Hall post inviting people to follow and participate in building a neighborhood resource and cultural center, July 2, 2018.",
    supportsGenerally: [
      "the public launch of the KC Town Hall account",
      "an invitation to follow and participate in the project"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-NEIGHBORHOOD-PROCESS-2018",
    title: "KC Town Hall neighborhood-process post",
    publishedAt: "2018-07-02",
    canonicalUrl: "https://x.com/KCTownHall/status/1013902884285681665",
    publicCitation:
      "KC Town Hall post inviting neighborhood input on the future use of the site, July 2, 2018.",
    supportsGenerally: [
      "the account invited neighborhood input",
      "the project described itself as committed to a neighborhood process"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
    title: "KC Town Hall Tired of Tires launch post",
    publishedAt: "2019-05-03",
    canonicalUrl: "https://x.com/KCTownHall/status/1124416898064580608",
    publicCitation:
      "KC Town Hall post launching a free home tire-pickup pathway for Oak Park residents, May 3, 2019.",
    supportsGenerally: [
      "a public resident-intake pathway for free tire pickup",
      "home-only eligibility",
      "the beginning of the recurring Tired of Tires account record"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
    title: "KC Town Hall first Tired of Tires results post",
    publishedAt: "2019-05-04",
    canonicalUrl: "https://x.com/KCTownHall/status/1124810411302359040",
    publicCitation:
      "KC Town Hall post reporting the first monthly tire-pickup result and crediting neighborhood collaborators, May 4, 2019.",
    supportsGenerally: [
      "public reporting after a pickup cycle",
      "credit to Oak Park Neighborhood and named collaborators",
      "an invitation to share additional dumped-tire locations"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
    title: "KC Town Hall 2019 Tired of Tires recap post",
    publishedAt: "2019-11-03",
    canonicalUrl: "https://x.com/KCTownHall/status/1190995865814667266",
    publicCitation:
      "KC Town Hall account-reported 2019 Tired of Tires recap, November 3, 2019.",
    supportsGenerally: [
      "the account reported 599 tires collected during 2019",
      "the account reported $13,235 in avoided tire-disposal fees",
      "the account announced that the program would return in 2020"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
    title: "KC Town Hall Tired of Tires follow-through reply",
    publishedAt: "2020-09-04",
    canonicalUrl: "https://x.com/KCTownHall/status/1302003767831912448",
    publicCitation:
      "KC Town Hall reply documenting an after-update and inviting further pickup locations, September 4, 2020.",
    supportsGenerally: [
      "public before-and-after follow-through",
      "continued resident intake for additional locations"
    ]
  },
  {
    id: "SRC-KCTH-SOCIAL-TIRES-2021-RECAP",
    title: "KC Town Hall 2021 Tired of Tires recap post",
    publishedAt: "2021-11-07",
    canonicalUrl: "https://x.com/KCTownHall/status/1457371688300056580",
    publicCitation:
      "KC Town Hall account-reported 2021 Tired of Tires recap and 2022 continuation notice, November 7, 2021.",
    supportsGenerally: [
      "the account reported 112 tires collected that month",
      "the account reported more than $32,000 in avoided disposal fees",
      "the account announced a 2022 return"
    ]
  }
] as const;

const workflowSourceIds = [
  "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
  "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
  "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
  "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
  "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
] as const;

export const kctownhallPopulationBatchRecords: KCTownHallPopulationBatch = {
  sources: [
    {
      id: "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
      title: "KC Town Hall live X profile",
      organization: "KC Town Hall",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/KCTownHall",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Town Hall public X profile, accessed July 12, 2026.",
      publicNote:
        "The live profile displayed 183 posts, a March 2018 join date, and the public project identity @KCTownHall.",
      supportsGenerally: [
        "the account identity @KCTownHall",
        "a displayed control total of 183 posts",
        "a March 2018 join date"
      ],
      doesNotEstablish: [
        "individual authorship of every account post",
        "independent verification of project-reported outcomes",
        "a complete historical interaction graph"
      ]
    },
    {
      id: "SRC-KCTH-FULL-POPULATION-RUN-2026",
      title: "KC Town Hall full-population reconciliation run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level reconciliation of the complete live @KCTownHall profile timeline.",
      publicNote:
        "Fine-grained authenticated harvesting recovered all 183 profile-counted records. The public-safe census omits full post text, phone numbers, resident-submitted locations, and private contact information.",
      protectedLocatorId: "RESEARCH-KCTH-FULL-POPULATION-2026-001",
      supportsGenerally: [
        "183 of 183 profile-counted records recovered with unique status IDs",
        "155 KC Town Hall-authored records: 142 standalone posts and 13 replies",
        "28 reposts from 16 other public accounts",
        "activity from July 2, 2018, through September 24, 2022",
        "100 records concerning resident tire pickup or program follow-through",
        "98 records explicitly carrying the Tired of Tires hashtag"
      ],
      doesNotEstablish: [
        "the individual author of every shared-account record",
        "independent validation of account-reported tire or savings totals",
        "that Jamie remained responsible for the account after his transition",
        "causality for municipal or neighborhood outcomes"
      ]
    },
    {
      id: "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
      title: "Tired of Tires? Free Tire Pickup",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2019-05-02",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://kctownhall.com/tires/",
      archiveUrl:
        "https://web.archive.org/web/20210806195823id_/https://kctownhall.com/tires/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Julia and Jamie, “Tired of Tires? Free Tire Pickup,” KC Town Hall, published May 2, 2019; archived August 6, 2021.",
      publicNote:
        "The archived page credits KC Town Hall and Oak Park Neighborhood Association with the monthly service and provides request and volunteer forms, home-only eligibility, and recurring pickup dates.",
      supportsGenerally: [
        "Julia and Jamie authored the resident-facing service page",
        "KC Town Hall and Oak Park Neighborhood Association were credited with the program",
        "the workflow included a request form, volunteer pathway, eligibility rule, and recurring schedule",
        "the page reported $20,023 in avoided disposal fees as of its 2021 revision"
      ],
      doesNotEstablish: [
        "independent auditing of the reported savings figure",
        "solo authorship or operation by Jamie",
        "the complete program history after the archived revision"
      ]
    },
    ...publicPosts.map((source) => ({
      ...source,
      organization: "KC Town Hall",
      author: "KC Town Hall account",
      kind: "institutional-social-post" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-12" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "the individual teammate who authored the post",
        "independent auditing of project-reported outcome figures"
      ]
    }))
  ],
  claims: [
    {
      id: "CLM-KCTH-COMPLETE-SOCIAL-POPULATION",
      project: "kc-town-hall",
      internalClaim:
        "The complete current @KCTownHall profile population contains 183 unique records: 142 authored standalone posts, 13 authored replies, and 28 reposts from 16 other accounts.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "All 183 profile-counted KC Town Hall records were recovered: 155 account-authored records and 28 reposts from other public accounts.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/kctownhall-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 183-post profile control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level reconciliation and authorship-type counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means all records represented by the July 2026 live profile control were recovered; it does not establish that no older record was deleted before capture.",
        "Account authorship does not identify the individual teammate who wrote each record."
      ],
      antiClaims: [
        "Jamie authored all 183 records",
        "The social account represents every historical KC Town Hall communication",
        "Post count measures project impact"
      ],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
      project: "kc-town-hall",
      internalClaim:
        "Julia and Jamie authored the public Tired of Tires workflow for a recurring service credited to KC Town Hall and Oak Park Neighborhood Association; the account documented resident intake, eligibility, pickup schedules, results, and follow-through.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie and Julia published the resident-facing workflow for #TiredOfTires, a monthly service credited to KC Town Hall and the Oak Park Neighborhood Association: request and volunteer forms, home-only eligibility, recurring pickup dates, and account updates showing pickup and follow-through.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        },
        {
          key: "archive-note",
          text:
            "The Tired of Tires public surface connected resident intake, volunteer coordination, eligibility, recurring schedules, pickup documentation, and follow-through.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/kctownhall-population-2026-07-12"]
        }
      ],
      evidence: workflowSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["the resident-facing workflow or its public follow-through"],
        confidence: "high" as const,
        renderCitation: true
      })),
      boundaries: [
        "Credit the public page to Julia and Jamie and the program to KC Town Hall and Oak Park Neighborhood Association.",
        "Do not infer that Jamie personally authored every account update or operated the program alone.",
        "Treat tire and savings totals as project-reported unless independently corroborated."
      ],
      antiClaims: [
        "Jamie alone created or operated Tired of Tires",
        "Every account-reported result was independently audited",
        "Jamie remained responsible for every post through 2022"
      ],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-FULL-POPULATION-2026",
      project: "kc-town-hall",
      question:
        "Can the full population of @KCTownHall posts be recovered, classified, and integrated without exposing resident-submitted information?",
      methods: [
        "Used the live profile's displayed 183-post count as the control total.",
        "Harvested Posts and Replies separately in 650-pixel increments.",
        "Removed five parent posts rendered as conversation context from the Replies population.",
        "Deduplicated records by primary status ID and reconciled the 170-record Posts surface with 13 additional KC Town Hall-authored replies.",
        "Classified every record by authorship type, primary theme, mentions, and hashtags.",
        "Recovered and read the archived Tired of Tires workflow page and searched for independent public corroboration of account-reported metrics.",
        "Generated a public-safe census without full post text, phone numbers, or resident-submitted locations."
      ],
      runAt: "2026-07-12",
      resultStatus: "recovered",
      findings: [
        "All 183 profile-counted records were recovered with unique status IDs.",
        "The population contains 142 authored standalone posts, 13 authored replies, and 28 reposts from 16 other accounts.",
        "One hundred records concern resident tire pickup or program follow-through, and 98 explicitly carry the Tired of Tires hashtag.",
        "The archived service page identifies Julia and Jamie as authors and credits KC Town Hall and Oak Park Neighborhood Association with the monthly program.",
        "The public workflow included request and volunteer forms, home-only eligibility, recurring dates, account updates, and follow-through.",
        "The account-reported tire and savings totals were not independently corroborated in this pass."
      ],
      limitations: [
        "The shared account does not identify the individual teammate who authored each record.",
        "The current full population does not establish that no older record was deleted before July 2026.",
        "Project-reported tire and savings figures are not independent audits.",
        "The account continued through 2022; the census does not assign Jamie responsibility after his documented transition."
      ],
      sourceIds: [
        "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
        "SRC-KCTH-FULL-POPULATION-RUN-2026",
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        ...publicPosts.map((source) => source.id)
      ],
      publicSummary:
        "All 183 profile-counted KC Town Hall records were recovered and classified, revealing a project identity used for neighborhood input, civic information, recurring resident service, public documentation, and follow-through.",
      protectedLocatorId: "RESEARCH-KCTH-FULL-POPULATION-2026-001"
    }
  ]
};
