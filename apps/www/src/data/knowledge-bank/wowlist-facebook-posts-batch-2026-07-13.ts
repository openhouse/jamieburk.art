import type { KnowledgeBank } from "./schema.ts";

type WOWListFacebookPostsBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const selectedFacebookPosts = [
  {
    id: "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
    title: "WOW List members introduce community calendars in nine cities",
    publishedAt: "2015-10-05",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/439926419547504",
    publicCitation:
      "WOW List Facebook post announcing member-introduced community calendars in nine cities, October 5, 2015.",
    supportsGenerally: [
      "members introduced WOW List community calendars in nine cities",
      "the post invited people to join a WOW List near them",
      "the current record displays 13 reactions, three comments, and 29 shares"
    ],
    doesNotEstablish: [
      "official chapters in nine cities",
      "the full set of city ecosystems that used WOW List",
      "unique people reached or historical impressions"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
    title: "WOW List credits a contributor with adding 41 Los Angeles events",
    publishedAt: "2015-11-16",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/450622238477922",
    publicCitation:
      "WOW List Facebook post crediting Joe Gutierrez with adding 41 upcoming DIY events to the LADIY calendar, November 16, 2015.",
    supportsGenerally: [
      "a named community contributor was publicly credited with adding 41 upcoming Los Angeles DIY events",
      "the post connected event contribution with joining a local calendar and receiving a weekly list"
    ],
    doesNotEstablish: [
      "independent verification of every event record",
      "Jamie personally entered the 41 events",
      "the full volume of Los Angeles activity"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
    title: "WOW List member reflection on community-first product values",
    publishedAt: "2016-05-23",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/515811585292320",
    publicCitation:
      "WOW List Facebook post sharing a member's reflection on Jamie Burkart's description of the project's community-first structure, May 23, 2016.",
    supportsGenerally: [
      "a member publicly named Jamie in relation to the project's operating values",
      "the reflection described sharing and ease of gathering as central design concerns",
      "the post invited people to join the platform"
    ],
    doesNotEstablish: [
      "that Jamie solely designed or operated WOW List",
      "the individual teammate who published the Facebook post",
      "platform-wide adoption"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
    title: "WOW List route for Women's March gatherings",
    publishedAt: "2017-01-13",
    canonicalUrl: "https://www.facebook.com/wowlist/posts/616983925175085",
    publicCitation:
      "WOW List Facebook post directing people to a project route for Women's March gatherings in Washington, D.C., and cities across the country, January 13, 2017.",
    supportsGenerally: [
      "WOW List infrastructure was used to route people to issue-based gatherings across cities",
      "the account extended event distribution into civic mobilization"
    ],
    doesNotEstablish: [
      "that WOW List organized the Women's March",
      "attendance or causal impact",
      "individual authorship of the shared-account post"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018",
    title: "Phoenix organizer describes continued WOW List use",
    publishedAt: "2018-03-23",
    canonicalUrl:
      "https://www.facebook.com/wowlist/posts/pfbid02Ao38e5ECy89isroMuqjhh62gBdutGNTkgmfYJAzPErEZi3SQ5uD2tRtv2GG8wRZWl",
    publicCitation:
      "WOW List Facebook share of Aaron Ponzo's public post describing use of WOW List while updating PHXDIY.com, March 23, 2018.",
    supportsGenerally: [
      "an external Phoenix organizer publicly described continued WOW List use",
      "the project was presented as a route for following shows outside Facebook"
    ],
    doesNotEstablish: [
      "the complete Phoenix organizer population",
      "current platform activity",
      "the individual teammate who reshared the post"
    ]
  }
] as const;

const selectedFacebookPostSourceIds = selectedFacebookPosts.map(
  (source) => source.id
);

export const wowlistFacebookPostsBatchRecords: WOWListFacebookPostsBatch = {
  sources: [
    {
      id: "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
      title: "WOW List Facebook Page",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://www.facebook.com/wowlist",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List public Facebook Page, accessed July 13, 2026.",
      publicNote:
        "The authenticated Page displayed 185 followers and two following accounts. Its public timeline and management surfaces supplied controls for the post census.",
      supportsGenerally: [
        "the current WOW List Facebook identity",
        "185 currently displayed followers",
        "the Page's current public timeline surface"
      ],
      doesNotEstablish: [
        "historical reach or impressions",
        "the individual teammate who authored a post",
        "records deleted or hidden before the review"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
      title: "WOW List Facebook full-population post run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 terminal-cursor accounting of the surviving WOW List Facebook post population.",
      publicNote:
        "The authenticated owner-timeline query reached `has_next_page: false` after 19 three-record pages. Fifty-seven unique records were recovered and a no-date-ceiling control returned the same March 2018 newest record. Raw responses and full text remain outside the public repository.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "57 unique current owner-timeline records",
        "35 standalone posts and 22 reshared stories",
        "22 records from 2015, 27 from 2016, seven from 2017, and one from 2018",
        "a recovered range from April 25, 2015, through March 23, 2018",
        "47 records with at least one currently visible reaction, comment, or share",
        "94 reactions, 16 comments, and 49 shares across the recovered records as mutable platform signals"
      ],
      doesNotEstablish: [
        "that no record was deleted or hidden before capture",
        "individual authorship or sole social-account management",
        "unique people reached, attendance, endorsement, impressions, or causal impact",
        "the full population of WOW List users, events, organizers, or city ecosystems"
      ]
    },
    ...selectedFacebookPosts.map((source) => ({
      ...source,
      organization: "WOW List",
      author: "WOW List account",
      kind: "institutional-social-post" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-13" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [...source.doesNotEstablish]
    }))
  ],
  claims: [
    {
      id: "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      project: "wowlist",
      internalClaim:
        "The surviving WOW List Facebook owner timeline contains 57 unique records across a terminal 19-page cursor chain: 35 standalone posts and 22 reshared stories published from April 25, 2015, through March 23, 2018.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "A terminal-cursor census recovered 57 unique WOW List Facebook records: 35 standalone posts and 22 reshared stories from April 2015 through March 2018.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
          relationship: "context",
          supports: ["current public Page identity and timeline control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["terminal cursor, record count, date range, and record-type counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means the currently accessible owner-timeline cursor reached its terminal flag; it does not prove that no record was deleted or hidden before capture.",
        "Page-level authorship does not identify the teammate who wrote or published an individual post."
      ],
      antiClaims: [
        "Jamie authored all 57 Facebook records",
        "The current population contains every post ever published",
        "Fifty-seven posts measure platform adoption or impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      project: "wowlist",
      internalClaim:
        "Selected records in the complete Facebook population document member-introduced calendars in nine cities, a contributor adding 41 Los Angeles events, and an external Phoenix organizer describing continued WOW List use.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "The archived public record shows the operating model in use: members introduced calendars in nine cities, a contributor loaded 41 Los Angeles events, and a Phoenix organizer later shared continued use of WOWList.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        },
        {
          key: "archive-note",
          text:
            "Selected Facebook records preserve three forms of distributed use: member-led city calendars, community event contribution, and later external organizer continuity.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
          relationship: "direct-support",
          supports: ["member-introduced calendars in nine cities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
          relationship: "direct-support",
          supports: ["public credit for a 41-event Los Angeles contribution"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018",
          relationship: "corroborating",
          supports: ["external Phoenix organizer use and continuity"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
          relationship: "context",
          supports: ["member articulation of the project's community-first operating values"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The nine-city and 41-event statements are contemporaneous project-account records, not an independent audit of the full platform population.",
        "Use `city calendars` or `city ecosystems`, not official chapters.",
        "The account record does not identify the individual teammate who authored each post."
      ],
      antiClaims: [
        "WOW List operated official chapters in nine cities",
        "Jamie personally entered the 41 Los Angeles events",
        "Three selected records prove the platform's complete adoption scale"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING",
      project: "wowlist",
      internalClaim:
        "The complete Facebook population shows WOW List routes used to distribute gatherings and resources connected to the Women's March, Standing Rock, popular-vote organizing, post-election marches, and cultural-space care.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The Facebook record extends from arts-event distribution into issue-based gathering routes and cultural-space care.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level theme and route review"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
          relationship: "direct-support",
          supports: ["issue-based gathering route across cities"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "WOW List distributed public routes and amplified resources; it did not organize every referenced movement, event, fund, or space.",
        "Publication does not establish attendance, policy causality, or individual authorship."
      ],
      antiClaims: [
        "WOW List organized the Women's March or Standing Rock",
        "Facebook posts prove mobilization impact",
        "Jamie authored every civic or care post"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      project: "wowlist",
      internalClaim:
        "Forty-seven of 57 recovered Facebook records display at least one current interaction; aggregate record-level signals are 94 reactions, 16 comments, and 49 shares. The nine-city post displays the strongest signal with 13 reactions, three comments, and 29 shares.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "Forty-seven recovered records retain at least one visible interaction; the strongest individual signal belongs to the nine-city calendar announcement, including 29 shares.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level reaction, comment, and share counts"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
          relationship: "direct-support",
          supports: ["the strongest current individual-post interaction signal"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Interaction totals are mutable current platform displays and do not represent unique people.",
        "Do not relabel reactions, comments, or shares as reach, impressions, endorsement, attendance, adoption, or impact."
      ],
      antiClaims: [
        "WOW List reached 159 people",
        "The posts generated 159 unique engagements",
        "Interaction counts prove platform adoption or causal impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
      project: "wowlist",
      question:
        "Can 100 percent of the currently surviving WOW List Facebook owner-timeline population be recovered, classified, and integrated with explicit authorship and interaction boundaries?",
      methods: [
        "Reviewed the public Page, authenticated Page-management surface, and Meta Business Suite content controls.",
        "Used the public Page's year filter to obtain the owner-timeline query and a pre-2019 archive starting point.",
        "Followed the authenticated ProfileCometTimelineFeedRefetchQuery cursor until Facebook returned `has_next_page: false`.",
        "Deduplicated every returned story by numeric post ID and checked for repeated cursors.",
        "Repeated the first query without a date ceiling; it returned the same March 2018 newest record, closing the post-2018 control.",
        "Classified all 57 records by year, standalone or reshared form, primary theme, and current reaction, comment, and share signals.",
        "Retained raw responses and full text outside the public repository; committed only public-safe metadata and selected public sources."
      ],
      runAt: "2026-07-13",
      resultStatus: "recovered",
      findings: [
        "The cursor chain terminated after 19 three-record pages with 57 unique post IDs and no repeated cursor.",
        "The population contains 35 standalone posts and 22 reshared stories.",
        "The year distribution is 22 records in 2015, 27 in 2016, seven in 2017, and one in 2018.",
        "The recovered range runs from April 25, 2015, through March 23, 2018; a no-date-ceiling query returned the same newest record.",
        "Selected records document member-led calendars in nine cities, a 41-event Los Angeles contribution, and external Phoenix organizer continuity.",
        "The account also routed issue-based gatherings and cultural-space care resources.",
        "Forty-seven records retain at least one current interaction; the aggregate mutable signals are 94 reactions, 16 comments, and 49 shares."
      ],
      limitations: [
        "A terminal current cursor cannot reveal records deleted, hidden, or removed before capture.",
        "The shared Page identity does not identify the individual teammate who wrote or published each record.",
        "Jamie's memory that he managed the social presence remains a first-person candidate claim pending collaborator confirmation or account-level authorship logs.",
        "Current interaction counts are mutable and do not measure unique people, reach, impressions, attendance, endorsement, adoption, or impact.",
        "The Facebook population is not a substitute for the product database, collaborator testimony, independent reporting, or broader adoption evidence."
      ],
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
        ...selectedFacebookPostSourceIds
      ],
      publicSummary:
        "A terminal-cursor review recovered 57 surviving WOW List Facebook records from April 2015 through March 2018, preserving distributed-use and civic-routing evidence without assigning individual post authorship or converting interactions into reach.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001"
    }
  ]
};
