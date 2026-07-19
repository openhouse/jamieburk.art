const reviewedAt = "2026-07-15";

export const wowListSocialPopulationJuly2026 = {
  intakeItems: [
    {
      id: "INTAKE-WOWLIST-X-FULL-POPULATION-2026",
      kind: "analysis-note",
      title: "WOW List X full-population archival pass",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: ["wowlist", "sunday-dinner"],
      reason: "Account for every profile-reported post while separating project-authored posts, replies, and reposted external posts.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-X-POPULATION-REPORT", "SRC-WOWLIST-X-PROFILE"],
      observationIds: ["OBS-WOWLIST-X-POPULATION-COMPLETE", "OBS-WOWLIST-X-RELATIONSHIP-MIX", "OBS-WOWLIST-X-WORKFLOW-SYSTEM"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT"],
      boundaries: [
        "Complete profile-population recovery is not a complete product archive or lifetime engagement census.",
        "Post-level authorship is not assigned to Jamie, Richard, or another collaborator unless the post itself supplies attribution."
      ]
    },
    {
      id: "INTAKE-WOWLIST-X-URL-SOURCE-ECOSYSTEM-2026",
      kind: "analysis-note",
      title: "WOW List posted-URL and source-reading inventory",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-source review",
      projectIds: ["wowlist"],
      reason: "Preserve every posted URL and distinguish independent product use from mission context, convening context, and historical product-scope evidence.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-WOWLIST-X-POPULATION-MANIFEST",
        "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015",
        "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
        "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
        "SRC-WOWLIST-SBDIY-ADOPTION",
        "SRC-WOWLIST-TRADEMARK-RECORD",
        "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015"
      ],
      observationIds: ["OBS-WOWLIST-X-POSTED-URL-INVENTORY", "OBS-WOWLIST-X-SOURCE-ROLE-BOUNDARY", "OBS-WOWLIST-X-EXTERNAL-ADOPTION"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT"],
      boundaries: [
        "A source shared by the account is not automatically coverage of WOW List.",
        "A historical product-scope record does not establish adoption, operation, or outcomes."
      ]
    },
    {
      id: "INTAKE-WOWLIST-X-ENGAGEMENT-CENSUS-2026",
      kind: "analysis-note",
      title: "WOW List account-owned engagement and external-adoption audit",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: ["wowlist"],
      reason: "Preserve access-time account-owned engagement, named public repost identities, and external organizer use without inheriting metrics from reposted authors.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-X-POPULATION-REPORT", "SRC-WOWLIST-SBDIY-ADOPTION"],
      observationIds: ["OBS-WOWLIST-X-ACCOUNT-OWNED-ENGAGEMENT", "OBS-WOWLIST-X-MISSION-DISTRIBUTION"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
      boundaries: [
        "Metrics on external posts reposted by WOW List belong to their original authors.",
        "Public interaction and event linking establish attributable contact or use, not endorsement, institutional adoption, or authorship."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-WOWLIST-X-POPULATION-COMPLETE",
      intakeId: "INTAKE-WOWLIST-X-FULL-POPULATION-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      comparisonSourceIds: ["SRC-WOWLIST-X-PROFILE", "SRC-WOWLIST-X-POPULATION-REPORT"],
      project: "wowlist",
      kind: "bounded-inference",
      text: "The profile reported 38 posts. Reconciled authenticated Posts and Replies crawls recovered 38 distinct content objects, accounting for 100 percent of the profile-reported population at review time.",
      locator: "Population summary and 38-row manifest",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE", "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT"],
      limitations: ["The result is a dated profile snapshot, not a platform export.", "It does not establish a complete product history or complete external engagement corpus."]
    },
    {
      id: "OBS-WOWLIST-X-RELATIONSHIP-MIX",
      intakeId: "INTAKE-WOWLIST-X-FULL-POPULATION-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      project: "wowlist",
      kind: "source-fact",
      text: "The recovered population contains 16 ordinary WOW List-authored posts, six WOW List replies, and 16 reposted external posts spanning February 12, 2014 through January 12, 2017.",
      locator: "Population relationship counts and recovered date range",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE"],
      researchInquiryIds: [],
      limitations: ["The relationship labels identify public account behavior, not the human author of each post.", "The date range describes the recovered profile population only."]
    },
    {
      id: "OBS-WOWLIST-X-WORKFLOW-SYSTEM",
      intakeId: "INTAKE-WOWLIST-X-FULL-POPULATION-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      comparisonSourceIds: ["SRC-WOWLIST-SUNDAY-DINNER-POST-2014", "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", "SRC-WOWLIST-SHELBY-TUTORIAL-2015"],
      project: "wowlist",
      kind: "bounded-inference",
      text: "The timeline documents a community-calendar operating loop: Sunday Dinner provenance; profiles and followed lists; organizer event publishing; multi-list distribution; weekly email; public onboarding; and event promotion across local scenes.",
      locator: "Chronological workflow classifications across the 38-row manifest",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE", "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"],
      researchInquiryIds: [],
      limitations: ["The posts document historical workflows, not present availability.", "The social timeline does not establish every product feature or usage volume."]
    },
    {
      id: "OBS-WOWLIST-X-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-WOWLIST-X-URL-SOURCE-ECOSYSTEM-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      project: "wowlist",
      kind: "source-fact",
      text: "The 38 recovered objects contain 35 distinct posted short URLs, all resolved to public destinations during the review.",
      locator: "Complete posted-URL inventory",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE"],
      researchInquiryIds: [],
      limitations: ["Resolved destinations can change after the historical post date.", "A linked destination records distribution, not agreement with every statement on the destination."]
    },
    {
      id: "OBS-WOWLIST-X-SOURCE-ROLE-BOUNDARY",
      intakeId: "INTAKE-WOWLIST-X-URL-SOURCE-ECOSYSTEM-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-REPORT",
      comparisonSourceIds: ["SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015", "SRC-WOWLIST-GOOD-TIMES-ZINES-2015", "SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION", "SRC-WOWLIST-TRADEMARK-RECORD", "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015"],
      project: "wowlist",
      kind: "context",
      text: "The Shelby Turner tutorial and Santa Barbara DIY page provide independent product-use evidence; Grasstronaut and Good Times provide mission context; the trademark record corroborates historical product scope; and the Allied Media page supplies convening context only.",
      locator: "Source-role table",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE", "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"],
      researchInquiryIds: [],
      limitations: ["Mission-context articles are not coverage of WOW List.", "The Allied Media page does not independently confirm WOW List participation."]
    },
    {
      id: "OBS-WOWLIST-X-ACCOUNT-OWNED-ENGAGEMENT",
      intakeId: "INTAKE-WOWLIST-X-ENGAGEMENT-CENSUS-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      project: "wowlist",
      kind: "bounded-inference",
      text: "The 22 WOW List-authored or reply posts displayed 20 reposts, 21 likes, and two replies at review time. All 10 posts with displayed reposts were audited; current public lists exposed 16 account appearances from eight distinct accounts, leaving four displayed reposts without a public identity.",
      locator: "Account-owned engagement summary and 10-post public-reposter ledger",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT"],
      limitations: ["Counts and public lists can change.", "Like identities were not audited, and original-author metrics on reposted external posts are excluded."]
    },
    {
      id: "OBS-WOWLIST-X-EXTERNAL-ADOPTION",
      intakeId: "INTAKE-WOWLIST-X-URL-SOURCE-ECOSYSTEM-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      comparisonSourceIds: ["SRC-WOWLIST-SBDIY-ADOPTION", "SRC-WOWLIST-SHELBY-TUTORIAL-2015"],
      project: "wowlist",
      kind: "bounded-inference",
      text: "A bounded public search recovered eight independently authored posts linking to WOW List event or profile pages across music, performance, neighborhood-forum, and benefit contexts; a separate Santa Barbara DIY page directed organizers to add events to its WOW List calendar.",
      locator: "External-adoption ledger and Santa Barbara DIY page",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE", "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT"],
      limitations: ["The eight-post ledger is a bounded search result, not a complete adoption census.", "Linking an event page does not establish continued use, organizational partnership, or platform-wide scale."]
    },
    {
      id: "OBS-WOWLIST-X-MISSION-DISTRIBUTION",
      intakeId: "INTAKE-WOWLIST-X-ENGAGEMENT-CENSUS-2026",
      sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      comparisonSourceIds: ["SRC-WOWLIST-GOOD-TIMES-ZINES-2015", "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015"],
      project: "wowlist",
      kind: "bounded-inference",
      text: "Beyond arts-event distribution, the account routed public information for Black Lives Matter demonstrations, post-election marches, Standing Rock support, Ghost Ship relief and vigils, and support for DIY spaces, showing a care-and-mobilization use of the calendar network.",
      locator: "Mission tags and dated status links in the population manifest",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE"],
      researchInquiryIds: [],
      limitations: ["Distribution does not establish outcome, attendance, or causation.", "Reposted material remains attributable to its original authors."]
    }
  ],
  sources: [
    {
      id: "SRC-WOWLIST-X-POPULATION-MANIFEST",
      title: "WOW List X full-population and engagement manifest",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/wowlist-x-population-2026-07-15.json",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List X full-population and engagement manifest, July 15, 2026.",
      publicNote: "A public-safe 38-row manifest with resolved URLs, bounded classifications, named public repost identities, and external-adoption examples; raw post bodies and session data are excluded.",
      supportsGenerally: ["38 recovered profile objects", "35 posted URLs", "relationship and workflow classifications", "bounded engagement and adoption ledgers"],
      doesNotEstablish: ["a complete product archive", "a complete lifetime engagement census", "individual post authorship", "current product availability", "formal institutional adoption"]
    },
    {
      id: "SRC-WOWLIST-X-POPULATION-REPORT",
      title: "WOW List full social-population archival production report",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/wowlist-social-population.md",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List full social-population archival production report, July 15, 2026.",
      publicNote: "Documents population reconciliation, workflow findings, source roles, external use, stakeholder patterns, and editorial boundaries.",
      supportsGenerally: ["research method", "population reconciliation", "source roles", "stakeholder patterns", "projection decision"],
      doesNotEstablish: ["platform-wide usage totals", "individual post authorship", "formal partnership", "present product availability", "complete external engagement"]
    },
    {
      id: "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015",
      title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
      organization: "Grasstronaut",
      author: "Elise Granata",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-01-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://grasstronaut.com/2015/01/29/homework-in-every-town/",
      archiveUrl: "https://web.archive.org/web/20150201081214/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
      preferredPublicUrl: "archive",
      publicCitation: "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015.",
      publicNote: "The WOW List account shared this independent discussion of practical knowledge for all-ages grassroots venues.",
      supportsGenerally: ["all-ages venue operations context", "community knowledge sharing", "a mission-relevant source shared by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List adoption", "Jamie's authorship", "WOW List outcomes", "current platform availability"]
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
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
      archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
      preferredPublicUrl: "archive",
      publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015.",
      publicNote: "The account shared this independent article on documenting and connecting DIY cultural infrastructure.",
      supportsGenerally: ["DIY documentation context", "the connective problem among geographically separated arts spaces", "a source shared by WOW List"],
      doesNotEstablish: ["coverage of WOW List", "WOW List's solution or impact", "Jamie's role", "platform adoption", "current service availability"]
    },
    {
      id: "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
      title: "SHELBY'S WOWLIST TUTORIAL - for my new fave events website",
      organization: "Shelby Turner / YouTube",
      author: "Shelby Turner",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2015-08-14",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.youtube.com/watch?v=nQg47LtixPI",
      preferredPublicUrl: "canonical",
      publicCitation: "Shelby Turner, 'SHELBY'S WOWLIST TUTORIAL - for my new fave events website,' YouTube, 2015.",
      publicNote: "Public video metadata and the account post identify an independently published WOW List tutorial.",
      supportsGenerally: ["independent public tutorial", "organizer-facing onboarding", "historical product use"],
      doesNotEstablish: ["complete tutorial contents without transcript review", "platform-wide adoption", "formal partnership", "Jamie's authorship", "current product availability"]
    },
    {
      id: "SRC-WOWLIST-SBDIY-ADOPTION",
      title: "Santa Barbara DIY resource page",
      organization: "Santa Barbara DIY",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.sbdiy.org/",
      preferredPublicUrl: "canonical",
      publicCitation: "Santa Barbara DIY resource page, accessed July 15, 2026.",
      publicNote: "The page directs visitors to add events to the wowlist.org/sbdiy calendar and links its WOW List page.",
      supportsGenerally: ["external organizer adoption", "local calendar publishing", "public link to a WOW List community"],
      doesNotEstablish: ["current WOW List availability", "usage volume", "formal partnership", "Jamie's individual role", "city-ecosystem scale"]
    },
    {
      id: "SRC-WOWLIST-TRADEMARK-RECORD",
      title: "WOWLIST trademark details",
      organization: "Justia Trademarks",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2014-06-04",
      accessedAt: reviewedAt,
      canonicalUrl: "https://trademarks.justia.com/863/00/wowlist-86300618.html",
      preferredPublicUrl: "canonical",
      publicCitation: "WOWLIST trademark record, serial 86300618, reproduced by Justia Trademarks.",
      publicNote: "The public record reproduction preserves historical dates and a product-scope description; no correspondence address is reproduced in the knowledge bank.",
      supportsGenerally: ["historical product scope", "first-use date of July 18, 2013", "registration history"],
      doesNotEstablish: ["continuous product operation", "adoption", "outcomes", "individual product authorship", "current trademark status as active"]
    },
    {
      id: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
      title: "Allied Media Conference 2015 page",
      organization: "Allied Media Projects",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-04-22",
      accessedAt: reviewedAt,
      canonicalUrl: "https://alliedmedia.org/amc",
      archiveUrl: "https://web.archive.org/web/20150610120311/https://www.alliedmedia.org/amc",
      preferredPublicUrl: "archive",
      publicCitation: "Allied Media Conference 2015 page, Allied Media Projects.",
      publicNote: "The account linked the conference while announcing WOW List participation; the page supplies event context only.",
      supportsGenerally: ["2015 Allied Media Conference context", "a convening destination linked by WOW List"],
      doesNotEstablish: ["independent confirmation of WOW List participation", "formal partnership", "session selection", "Jamie's attendance", "conference outcomes"]
    }
  ],
  claims: [
    {
      id: "CLM-WOWLIST-SOCIAL-POPULATION-ARCHIVE",
      project: "wowlist",
      internalClaim: "A complete 38-object profile-population pass documents WOW List's provenance, organizer workflows, external event-page use, multi-scene cultural distribution, and care-oriented civic routing while retaining account-authorship and current-availability boundaries.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The complete recovered account population documents historical product workflows, external event-page use, and cultural and civic distribution patterns.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST", relationship: "direct-support", supports: ["38 recovered objects", "35 posted URLs", "workflow and mission classifications", "bounded engagement ledgers"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-WOWLIST-X-POPULATION-REPORT", relationship: "corroborating", supports: ["research method", "source roles", "projection boundaries"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015", relationship: "direct-support", supports: ["independent organizer-facing tutorial"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-WOWLIST-SBDIY-ADOPTION", relationship: "direct-support", supports: ["external organizer adoption"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Keep project credit shared with Richard, Sunday Dinner participants, organizers, and other collaborators.",
        "Do not assign post-level authorship from account identity.",
        "Describe historical workflows rather than current product availability.",
        "Treat external search results and engagement identities as bounded, dated evidence."
      ],
      antiClaims: [
        "Jamie authored every @wowlist post",
        "Jamie alone created WOW List",
        "the account is a complete product archive",
        "the platform is currently operating",
        "metrics on reposted external posts are WOW List traction",
        "eight external linking posts are the complete adoption census",
        "shared mission-context articles are coverage of WOW List"
      ],
      researchInquiryIds: ["INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-X-EXTERNAL-ENGAGEMENT",
      project: "wowlist",
      question: "What additional independent organizer use, account administration, and historical product adoption can be recovered beyond the complete profile population?",
      methods: [
        "Preserve public event-page links, tutorials, adopter pages, and collaborator confirmations with dates and source roles.",
        "Search platform exports and archives without converting ranked X search results into a complete census.",
        "Keep product adoption, account administration, and post authorship as separate propositions."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 38 profile-reported objects were recovered and classified.",
        "A bounded X search recovered eight independently authored posts linking to WOW List pages.",
        "A public tutorial and Santa Barbara DIY page independently document historical organizer-facing use."
      ],
      limitations: [
        "X search ranking, deleted posts, private accounts, suspensions, and renames prevent a complete external engagement census.",
        "No reviewed public source identifies the human author of every account post."
      ],
      sourceIds: ["SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-X-POPULATION-REPORT", "SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION"],
      publicSummary: "The complete profile population and bounded external-use evidence document historical organizer workflows while leaving lifetime adoption and account authorship open."
    }
  ]
};
