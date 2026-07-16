import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = ["Jamie Burkart", "Codex authenticated archival review"];

export const wowListFacebookPostSourceRecords20260716 = [
  {
    id: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
    title: "Authenticated WOW List Facebook Page post census",
    organization: "WOW List",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/wowlist-facebook-posts-public-safe-manifest-2026-07-16.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated July 16, 2026 archival review of the complete capture-date WOW List Facebook Page post stream.",
    publicNote:
      "Three independent traversals reconciled to 57 semantic Page posts after normalizing duplicate lazy link-card renders and randomized accessibility timestamp characters. The public manifest excludes raw post text and authenticated-session material.",
    captureFingerprint:
      "sha256:1c7a4c56506480e1b8f7d85f5257ad7d01c2f18298e430926dad4d586b0d1e45",
    supportsGenerally: [
      "57 capture-date semantic Page posts",
      "three matching independent traversals",
      "57 unique posted destinations across WOW List and external domains",
      "bounded source, circulation, and visible-response patterns"
    ],
    doesNotEstablish: [
      "every deleted, private, withheld, or historically unindexed Page post",
      "a native Meta owner export",
      "Jamie as author of every Page post",
      "reach, conversion, attendance, endorsement, adoption, or impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
    title: "Meow Wolf's DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2016-12-12",
    accessedAt: reviewedAt,
    canonicalUrl: "https://meowwolf.com/2016/12/meow-wolfs-diy-fund/",
    archiveUrl:
      "https://web.archive.org/web/20170402132355/https://meowwolf.com/2016/12/meow-wolfs-diy-fund/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Meow Wolf, 'Meow Wolf's DIY Fund,' December 12, 2016, archived April 2, 2017.",
    publicNote:
      "A mission-relevant resource circulated by the WOW List Facebook Page. The announcement describes a $100,000 annual fund and consulting support for DIY arts and music spaces.",
    supportsGenerally: [
      "the fund's stated $100,000 annual amount",
      "support for infrastructure, rent, materials, equipment, legal issues, building codes, and organizational structure",
      "the kind of cultural-space resource circulated by the Page"
    ],
    doesNotEstablish: [
      "WOW List involvement in administering the fund",
      "a formal relationship between WOW List and Meow Wolf",
      "grant outcomes or causal impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-DENVER-DIY-SPACES-2017",
    title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
    author: "Patricia Calhoun",
    organization: "Denver Westword",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
    publicNote:
      "A mission-relevant article circulated by the Page. It documents a Denver Arts & Venues contribution and a Meow Wolf partnership for DIY-space support after venue closures.",
    supportsGenerally: [
      "Denver Arts & Venues' stated $20,000 contribution",
      "Meow Wolf's role handling the Denver-specific fund",
      "public-agency and cultural-organization responses to DIY-space safety and continuity"
    ],
    doesNotEstablish: [
      "WOW List involvement in the Denver program",
      "WOW List authorship of the article",
      "grant results or causal impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-2016",
    title: "The Know Is Closing",
    author: "Matthew Singer",
    organization: "Willamette Week",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-07-01",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
    publicNote:
      "A mission-relevant article circulated by the Page. It reports a Portland music venue's planned closure after a stated 150 percent rent increase.",
    supportsGenerally: [
      "the venue's planned November 2016 closure",
      "the owner's stated 150 percent rent increase",
      "cultural-space displacement context represented in the Page's source field"
    ],
    doesNotEstablish: [
      "WOW List involvement in the venue",
      "a general rent trend from one venue",
      "that the Page's circulation changed the outcome"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-GHOST-SHIP-SAFETY-2016",
    title:
      "Artists Who Survived Oakland Warehouse Fire Discuss the Tragedy, Those Missing, Need for Safe Underground Spaces",
    organization: "East Bay Express",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2016-12-03",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.eastbayexpress.com/SevenDays/archives/2016/12/03/artists-at-last-nights-oakland-warehouse-fire-discuss-the-tragedy-those-missing-need-for-safe-underground-spaces",
    archiveUrl:
      "https://web.archive.org/web/20201029162847/https://m.eastbayexpress.com/SevenDays/archives/2016/12/03/artists-at-last-nights-oakland-warehouse-fire-discuss-the-tragedy-those-missing-need-for-safe-underground-spaces",
    preferredPublicUrl: "archive",
    publicCitation:
      "East Bay Express, 'Artists Who Survived Oakland Warehouse Fire Discuss the Tragedy, Those Missing, Need for Safe Underground Spaces,' December 3, 2016.",
    publicNote:
      "A mission-relevant article circulated by the Page. It records artists' accounts of the Ghost Ship fire and arguments for safe, unscripted spaces rather than indiscriminate punishment of underground scenes.",
    supportsGenerally: [
      "the reported cultural-space safety discussion after the Ghost Ship fire",
      "participants' stated relationship between scarce space, marginalization, and underground venues",
      "the kind of safety and cultural-infrastructure reporting circulated by the Page"
    ],
    doesNotEstablish: [
      "WOW List authorship or involvement in the reported events",
      "a complete account of the fire or its causes",
      "that circulation produced policy or safety outcomes"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-SHEA-KICKSTARTER-2017",
    title: "Bring Back Shea Stadium",
    organization: "Shea Stadium / Kickstarter",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2017-03-22",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kickstarter.com/projects/sheastadiumbk/bring-back-shea-stadium",
    archiveUrl:
      "https://web.archive.org/web/20240529055224/https://www.kickstarter.com/projects/sheastadiumbk/bring-back-shea-stadium",
    preferredPublicUrl: "archive",
    publicCitation:
      "Shea Stadium, 'Bring Back Shea Stadium,' Kickstarter, launched March 22, 2017.",
    publicNote:
      "A mission-relevant campaign circulated by the Page. The archived campaign identifies a $50,000 goal, $99,146 pledged, 1,699 backers, and a stated purpose of reopening the Brooklyn community space legally and sustainably.",
    supportsGenerally: [
      "the campaign's stated reopening purpose",
      "the archived campaign's goal, pledged amount, and backer count",
      "a cultural-space continuity campaign represented in the Page's source field"
    ],
    doesNotEstablish: [
      "WOW List involvement in the campaign",
      "how campaign funds were spent",
      "the venue's later operating history or causal impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026",
    title: "Jamie Burkart memory of WOW List social stewardship",
    author: "Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, first-person memory about WOW List social stewardship, captured July 16, 2026.",
    publicNote:
      "The memory is retained as a research lead. It is not independent corroboration and is not projected publicly.",
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-STEWARDSHIP-MEMORY-2026",
    supportsGenerally: [
      "Jamie's present recollection that he managed WOW List's social presence",
      "Jamie's recollection that WOW List was his and Richard's project"
    ],
    doesNotEstablish: [
      "post-level authorship",
      "sole project ownership",
      "independent corroboration of complete social-account stewardship"
    ]
  }
] satisfies SourceRecord[];

export const wowListFacebookPostClaimRecords20260716 = [
  {
    id: "CLM-WOWLIST-FACEBOOK-POSTS-CENSUS-2026",
    project: "wowlist",
    internalClaim:
      "Three independent capture-date traversals of the WOW List Facebook Page post stream reconcile to the same 57 semantic Page posts.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Three independent traversals reconciled the capture-date WOW List Facebook Page stream to 57 semantic posts.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
      relationship: "direct-support",
      supports: [
        "three matching semantic populations",
        "57 semantic Page posts",
        "the canonical population fingerprint"
      ],
      locator: "public manifest populationReconciliation",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Semantic identity removes duplicate lazy link-card variants and randomized accessibility timestamp characters; it does not merge substantively different posts.",
      "This is a complete capture-date Page stream, not a native Meta export or proof of all-ever history."
    ],
    antiClaims: [
      "Facebook rendered exactly 57 raw cards in every pass.",
      "No WOW List Facebook post was ever deleted, withheld, or left unindexed."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-OUTBOUND-SOURCE-FIELD-2026",
    project: "wowlist",
    internalClaim:
      "The 57-post population contains 57 unique posted destinations: 30 WOW List destinations and 27 external destinations; 24 external destinations are retained in the public-safe manifest.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "The Page functioned as a source-routing surface across WOW List calendars and mission-relevant external resources.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "57 unique posted destinations",
          "30 WOW List destinations",
          "27 external destinations",
          "24 public-safe external destination URLs"
        ],
        locator: "public manifest sourceRouting",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
        relationship: "context",
        supports: ["one close-read cultural-space funding destination"],
        locator: "fund announcement paragraphs",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-DENVER-DIY-SPACES-2017",
        relationship: "context",
        supports: ["one close-read public-agency and DIY-space destination"],
        locator: "headline and paragraphs describing the fund arrangement",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-2016",
        relationship: "context",
        supports: ["one close-read venue-displacement destination"],
        locator: "headline and reported rent increase",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-GHOST-SHIP-SAFETY-2016",
        relationship: "context",
        supports: ["one close-read cultural-space safety destination"],
        locator: "article body and participant accounts",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-SHEA-KICKSTARTER-2017",
        relationship: "context",
        supports: ["one close-read cultural-space continuity campaign"],
        locator: "campaign summary and archived funding fields",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted destination establishes circulation by the Page, not readership, agreement, partnership, authorship, or causal impact.",
      "Two sensitive direct-aid destinations and one malformed video destination are counted but not exposed in the public manifest."
    ],
    antiClaims: [
      "WOW List authored every linked source.",
      "Every publisher or fundraiser was a formal WOW List partner.",
      "Posted URLs measure traffic, conversion, or impact."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-PRACTICE-2026",
    project: "wowlist",
    internalClaim:
      "The complete Page population documents WOW List routing people toward community-run calendars, touring projects, product feedback, member meetings, and public-interest event collections.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "case-study",
      text:
        "The Page extended the product practice into public support, community-calendar distribution, and source routing.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
      relationship: "direct-support",
      supports: [
        "community-calendar routing across several cities",
        "tour and event distribution",
        "member feedback and product-support invitations",
        "public-interest calendar adaptation"
      ],
      locator: "semantic population and public-safe thematic classification",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The population demonstrates examples and recurring uses, not complete city-by-city adoption or event attendance.",
      "Shared community content retains its original authorship; the Page's act is circulation and amplification."
    ],
    antiClaims: [
      "Every named city had an official WOW List chapter.",
      "Every shared event was organized by WOW List.",
      "Circulation establishes attendance or impact."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-CULTURAL-SPACE-CONTINUITY-2026",
    project: "wowlist",
    internalClaim:
      "The Page repeatedly circulated public resources concerning cultural-space closure, reopening, safety, emergency support, and public or philanthropic funding.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "The source field repeatedly returned to the continuity and safety of small cultural spaces.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
        relationship: "direct-support",
        supports: ["the repeated source-routing pattern"],
        locator: "selected cultural-space destinations in the semantic population",
        confidence: "high",
        renderCitation: false
      },
      ...[
        "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
        "SRC-WOWLIST-FACEBOOK-DENVER-DIY-SPACES-2017",
        "SRC-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-2016",
        "SRC-WOWLIST-FACEBOOK-GHOST-SHIP-SAFETY-2016",
        "SRC-WOWLIST-FACEBOOK-SHEA-KICKSTARTER-2017"
      ].map((sourceId) => ({
        sourceId,
        relationship: "context" as const,
        supports: ["one close-read example within the source-routing pattern"],
        locator: "source title, public summary, and located support fields",
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "These sources contextualize the Page's curatorial pattern; they do not establish WOW List participation in the underlying campaigns, funds, venues, or reported events."
    ],
    antiClaims: [
      "WOW List administered the linked funds or campaigns.",
      "Page circulation caused a venue, funding, safety, or policy outcome."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-VISIBLE-RECEPTION-2026",
    project: "wowlist",
    internalClaim:
      "The capture-date post stream exposed one identifiable incoming public comment expressing that WOW List was missed and suggesting renewed relevance as Twitter destabilized; a second comment body had unresolved authorship.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text:
        "A later public comment offers one bounded specimen of continued affection for the project.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026",
      relationship: "direct-support",
      supports: [
        "one identifiable incoming public comment",
        "one additional comment body with unresolved authorship"
      ],
      locator: "public-safe visible-response classification",
      confidence: "moderate",
      renderCitation: false
    }],
    boundaries: [
      "One comment is a reception specimen, not a traction metric.",
      "The second comment is not classified as incoming engagement because its author was not recovered.",
      "Follower and following counts are mutable profile controls, not reach or adoption measures."
    ],
    antiClaims: [
      "The comment proves renewed market demand.",
      "Facebook reactions or comments were comprehensively recovered.",
      "Current follower counts measure historical reach."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026",
    project: "wowlist",
    internalClaim:
      "Jamie remembers managing WOW List's social presence for the project he built with Richard.",
    status: "use-with-care",
    projections: [{
      key: "case-study",
      text:
        "Jamie managed WOW List's social presence.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026",
      relationship: "private-support",
      supports: ["Jamie's present first-person recollection"],
      confidence: "limited",
      renderCitation: false
    }],
    boundaries: [
      "The memory is not independent corroboration.",
      "Richard retains co-project credit.",
      "Account custody and first-person memory do not assign every shared Page post to Jamie."
    ],
    antiClaims: [
      "Jamie is independently confirmed as author of every WOW List Facebook post.",
      "Jamie was the sole owner or creator of WOW List.",
      "The memory is ready for public projection without collaborator or archival corroboration."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-STEWARDSHIP-2026"],
    reviewedAt,
    reviewedBy
  }
] satisfies ClaimRecord[];

export const wowListFacebookPostResearchInquiries20260716 = [
  {
    id: "INQ-WOWLIST-FACEBOOK-POSTS-2026",
    project: "wowlist",
    question:
      "What source, operating-practice, circulation, and recoverable engagement patterns appear across the full capture-date WOW List Facebook Page post stream?",
    methods: [
      "Traversed the authenticated public Page stream three times to repeated no-growth terminal states.",
      "Normalized duplicate lazy link-card renders and randomized accessibility timestamp characters without removing substantive post language.",
      "Reconciled all three semantic sets and compared their sorted SHA-256 fingerprint.",
      "Inventoried all posted destinations, retaining safe public URLs while withholding sensitive direct-aid destinations and malformed links.",
      "Close-read five mission-relevant public destinations and separated Page circulation from what each destination independently establishes.",
      "Reviewed visible comments conservatively and excluded unassigned bodies, reactions, followers, and inferred views from direct-engagement claims."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The three traversals produced 79, 81, and 90 raw rendered-card variants but the same 57 semantic Page posts and the same population fingerprint.",
      "The recovered visible post-date range is April 25, 2015 through March 22, 2018.",
      "Fifty-one of 57 semantic posts contained a recovered destination; 28 contained an external destination.",
      "The source field contains 30 unique WOW List destinations and 27 unique external destinations.",
      "The Page repeatedly routed people toward community calendars, touring projects, member feedback, cultural-space continuity, safety, mutual aid, and civic event collections.",
      "One identifiable incoming public comment was recovered as a reception specimen; a second comment body remained unassigned."
    ],
    limitations: [
      "A capture-date Page-stream census is not a native Meta owner export or a complete history of deleted, private, withheld, or unindexed posts.",
      "Meta Business Suite did not offer WOW List in the available Page-export control during this review, so no owner export was generated.",
      "Raw post text, comments, credentials, cookies, session data, analytics, private messages, and machine-local research artifacts remain outside the public repository.",
      "Shared posts retain their original authorship; Page circulation does not establish partnership, endorsement, adoption, attendance, or impact.",
      "Visible reactions and profile counts were not recovered as a reliable full-population engagement measure."
    ],
    sourceIds: wowListFacebookPostSourceRecords20260716
      .filter(({ id }) => id !== "SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026")
      .map(({ id }) => id),
    publicSummary:
      "Three independent traversals reconciled the complete capture-date Page stream to 57 semantic posts. The population documents WOW List's community-calendar distribution, source-routing, cultural-space, and public-interest practices while preserving authorship and engagement boundaries."
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-STEWARDSHIP-2026",
    project: "wowlist",
    question:
      "What public or collaborator evidence can corroborate Jamie's memory that he managed WOW List's social presence?",
    methods: [
      "Captured Jamie's first-person memory as a protected research lead.",
      "Kept project co-ownership, Page administration, and post-level authorship separate.",
      "Checked the available Meta Business Suite export control and found that WOW List was not offered as an exportable Page in the current interface."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Jamie's present recollection is preserved.",
      "The current pass did not recover a Page-owner export or population-wide post-level author field.",
      "The role claim remains held pending collaborator corroboration or durable administrative records."
    ],
    limitations: [
      "First-person memory is not independent corroboration.",
      "Page administration does not establish authorship of every post.",
      "The current interface's missing export option does not establish that no owner archive ever existed."
    ],
    sourceIds: ["SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"],
    protectedLocatorId: "LOC-WOWLIST-FACEBOOK-STEWARDSHIP-INQUIRY-2026"
  }
] satisfies ResearchInquiry[];

export const wowListFacebookPostIntakeRecords20260716 = [
  {
    id: "INTAKE-WOWLIST-FACEBOOK-POSTS-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "Complete capture-date WOW List Facebook Page post population",
    publicSafeSummary:
      "Three matching semantic traversals covering 57 Page posts, 57 unique posted destinations, five close-read mission-relevant sources, and bounded visible-response findings.",
    whyItMatters:
      "Preserves the Page as operating and source-routing infrastructure while keeping circulation, source claims, authorship, engagement, and public projection distinct.",
    projectHints: ["wowlist"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://www.facebook.com/wowlist/",
    sourceIds: wowListFacebookPostSourceRecords20260716
      .filter(({ id }) => id !== "SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026")
      .map(({ id }) => id),
    claimIds: [
      "CLM-WOWLIST-FACEBOOK-POSTS-CENSUS-2026",
      "CLM-WOWLIST-FACEBOOK-OUTBOUND-SOURCE-FIELD-2026",
      "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-PRACTICE-2026",
      "CLM-WOWLIST-FACEBOOK-CULTURAL-SPACE-CONTINUITY-2026",
      "CLM-WOWLIST-FACEBOOK-VISIBLE-RECEPTION-2026"
    ],
    inquiryIds: ["INQ-WOWLIST-FACEBOOK-POSTS-2026"],
    limitations: [
      "The population boundary is capture-date Page visibility, not all-ever history.",
      "Two sensitive direct-aid URLs and one malformed video destination are counted but withheld from the public manifest.",
      "Raw post bodies, comment bodies, session state, analytics, and private account material remain outside the repository."
    ],
    nextActions: [
      "Recover first-party archives for unresolved dead source leads when they can mature an atomic claim.",
      "Keep the population unsurfaced until a composed public sentence reduces a hiring reader's burden.",
      "Re-run the census only when the public Page or owner-export availability materially changes."
    ]
  },
  {
    id: "INTAKE-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex",
    kind: "memory",
    title: "Jamie's memory of managing WOW List's social presence",
    publicSafeSummary:
      "Jamie recalls managing the social presence for WOW List, a project he built with Richard.",
    whyItMatters:
      "The memory may clarify Jamie's operating role, but it requires corroboration and must not erase shared project credit or imply post-level authorship.",
    projectHints: ["wowlist"],
    maturity: "captured",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: ["SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"],
    claimIds: ["CLM-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"],
    inquiryIds: ["INQ-WOWLIST-FACEBOOK-STEWARDSHIP-2026"],
    limitations: [
      "First-person memory is not independent corroboration.",
      "The memory does not assign every Page post to Jamie.",
      "Richard retains co-project credit."
    ],
    nextActions: [
      "Ask Richard or another collaborator for a bounded proof note about social-account stewardship.",
      "Look for public Page-admin records or post-level author fields without publishing private account data.",
      "Keep the role wording out of public projections until corroborated."
    ]
  }
] satisfies IntakeRecord[];
