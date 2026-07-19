import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

const ids = {
  corpus: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
  report: "SRC-KCSPACES-FACEBOOK-POST-REPORT-2026",
  page: "SRC-KCSPACES-FACEBOOK-PAGE",
  protectedRun: "SRC-KCSPACES-FACEBOOK-PROTECTED-RUN-2026",
  campaignSite: "SRC-KCSPACES-CAMPAIGN-SITE-2020",
  goFundMe: "SRC-KCSPACES-GOFUNDME-2020",
  roleClarification: "SRC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026",
  digitalArchive: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
  kansasCityStar: "SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10",
  odditiesPrint: "SRC-KCSPACES-ODDITIES-KAIJU-PRINT-2020",
  do816: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
  twocc: "SRC-KCSPACES-TWOCC-DONATION-RESOURCE-2020",
  survivingPopulation: "CLM-KCSPACES-FACEBOOK-SURVIVING-POPULATION",
  campaignRouting: "CLM-KCSPACES-FACEBOOK-MUTUAL-AID-ROUTING",
  digitalSupport: "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT",
  interactionSignals: "CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS",
  independentRecognition:
    "CLM-KCSPACES-INDEPENDENT-COVID-RESOURCE-RECOGNITION",
  nativeExportInquiry: "INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT",
  stewardshipInquiry: "INQ-KCSPACES-FACEBOOK-STEWARDSHIP",
  sourceInquiry: "INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION"
} as const;

export const kcSpacesFundFacebookPostReviewSummary = {
  survivingPublicRecords: 40,
  terminalTraversalCounts: [40, 38, 40],
  independentVerificationCount: 40,
  independentVerificationSnapshots: 61,
  independentVerificationTerminalChecks: 8,
  stableMediaIds: 21,
  dateRange: { earliest: "2020-04-07", latest: "2020-07-09" },
  mediaBackedRecords: 20,
  nonMediaRecords: 20,
  fundedSpaceSpotlights: 11,
  applicationRoutingRecords: 8,
  fundraisingRecords: 14,
  recordsWithVisibleReactionSignals: 28,
  visibleReactionSignalFloor: 119,
  recordsWithVisibleCommentRelations: 4,
  exactPublicRoutes: 8
} as const;

export const kcSpacesFundFacebookPostSources: SourceRecord[] = [
  {
    id: ids.corpus,
    title: "KC Spaces Fund Facebook posts full-population public-safe census",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund Facebook posts full-population public-safe census, reconciled July 15-16, 2026.",
    publicNote:
      "A 40-row minimized ledger preserving public identities, recovery states, mission classifications, destination routes, named funded-space spotlights, and bounded interaction signals without raw bodies or personal social-graph identities.",
    supportsGenerally: [
      "40 surviving public Page records",
      "repeated terminal-traversal reconciliation",
      "April 7 through July 9, 2020 visible endpoint range",
      "11 funded-space spotlights",
      "application and fundraising routing",
      "bounded displayed interaction signals"
    ],
    doesNotEstablish: [
      "complete lifetime Page history",
      "a native Meta export or deletion history",
      "human post authorship",
      "reach, endorsement, conversion, partnership, causality, or impact"
    ]
  },
  {
    id: ids.report,
    title: "KC Spaces Fund Facebook post archival-production report",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated public-safe archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund Facebook post archival-production report, July 16, 2026.",
    publicNote:
      "Documents population reconciliation, routes, mission patterns, interaction boundaries, collective credit, and selective projection.",
    supportsGenerally: [
      "capture method",
      "population boundary",
      "privacy and credit boundaries",
      "source roles",
      "projection decision"
    ],
    doesNotEstablish: [
      "a native Meta export",
      "post-level authorship",
      "complete deleted-post recovery",
      "private campaign operations"
    ]
  },
  {
    id: ids.page,
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund Facebook Page, accessed July 16, 2026.",
    publicNote:
      "The Page supplies the public project name, mission line, current follower display, fundraiser route, and surviving feed surface.",
    supportsGenerally: [
      "public Page identity",
      "mission line",
      "108-follower and one-following capture labels",
      "public GoFundMe route"
    ],
    doesNotEstablish: [
      "which human published a post",
      "that Jamie managed or posted from the Page",
      "who originated the campaign name",
      "historical reach or impact"
    ]
  },
  {
    id: ids.protectedRun,
    title: "Authenticated KC Spaces Fund Facebook research capture",
    author: "Codex authenticated public-safe archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production review of the KC Spaces Fund Facebook surface, July 16, 2026.",
    publicNote:
      "The protected capture preserves a 61-snapshot terminal traversal with 40 distinct post identities and eight stable terminal checks. Raw bodies, identities, authenticated state, and Page-management data remain outside the public repository.",
    protectedLocatorId: "LOC-KCSPACES-FACEBOOK-POST-RESEARCH-2026",
    supportsGenerally: [
      "independent 40-record verification",
      "terminal-scroll reconciliation",
      "post-body and route inspection"
    ],
    doesNotEstablish: [
      "permission to publish protected contents",
      "a native Meta export",
      "historical human publisher identity"
    ]
  },
  {
    id: ids.campaignSite,
    title: "KC Spaces Fund campaign site",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kcspacesfund.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund campaign site, accessed July 16, 2026.",
    publicNote:
      "The site describes support for grassroots arts and culture spaces during COVID-19 and preserves donate, join, apply, and contact routes.",
    supportsGenerally: [
      "campaign mission",
      "public action routes",
      "grant application guidance",
      "consistent campaign identity"
    ],
    doesNotEstablish: [
      "Jamie's role without archive evidence",
      "complete grant outcomes",
      "current program operation",
      "Page-post authorship"
    ]
  },
  {
    id: ids.goFundMe,
    title: "KC Spaces Fund GoFundMe campaign",
    organization: "KC Spaces Fund and Allied Media Projects",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-07",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund GoFundMe campaign, created April 7, 2020, accessed July 16, 2026.",
    publicNote:
      "The campaign displays $9,590 raised against a $9,500 goal from 107 donations, names four organizers, and identifies Allied Media Projects as fiscal sponsor.",
    supportsGenerally: [
      "public fundraising total",
      "donation count",
      "emergency-grant framing",
      "named organizer credit",
      "fiscal sponsorship",
      "consistent campaign identity"
    ],
    doesNotEstablish: [
      "Jamie's ownership or operation of the fundraiser",
      "Jamie's role in grant decisions or disbursement",
      "sole naming authorship",
      "Page-post authorship"
    ]
  },
  {
    id: ids.roleClarification,
    title: "Jamie Burkart KC Spaces Fund role clarification",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart firsthand role clarification supplied during July 2026 archival review.",
    publicNote:
      "Jamie recalls supporting website creation and cross-channel project naming while explicitly disclaiming stakeholder ownership and Facebook publishing responsibility.",
    protectedLocatorId: "LOC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026",
    supportsGenerally: [
      "website-creation role",
      "cross-channel naming support",
      "non-posting boundary"
    ],
    doesNotEstablish: [
      "sole naming authorship",
      "campaign ownership",
      "public-organizer status",
      "authorship of any Facebook post"
    ]
  },
  {
    id: ids.digitalArchive,
    title: "KC Spaces Fund digital-infrastructure archival review",
    author: "Codex AI-assisted archive review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-09",
    publicCitation:
      "Public-safe summary of a July 2026 archival review of KC Spaces Fund digital infrastructure.",
    publicNote:
      "The review covers a launch assignment and Git history for the Ghost site, campaign theme, and fundraising widget without publishing private project records.",
    protectedLocatorId: "LOC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
    supportsGenerally: [
      "Jamie's campaign-site and theme implementation",
      "fundraising-widget implementation",
      "behind-the-scenes deployment support",
      "domain and platform continuity"
    ],
    doesNotEstablish: [
      "public-organizer or fundraiser ownership",
      "grant decision authority",
      "sole campaign naming or ownership",
      "permission to publish private project records"
    ]
  },
  {
    id: ids.kansasCityStar,
    title:
      "Your money, your blood, your time: How to help Kansas City during COVID-19 crisis",
    organization: "The Kansas City Star",
    author: "Dan Kelly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-10",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Dan Kelly, 'Your money, your blood, your time: How to help Kansas City during COVID-19 crisis,' The Kansas City Star, updated April 10, 2020.",
    publicNote:
      "The service article lists KC Spaces Fund and its site among ways to support artists and artisans.",
    supportsGenerally: [
      "independent contemporary recognition",
      "KC Spaces Fund as an artist-support resource during COVID-19",
      "public campaign-site route"
    ],
    doesNotEstablish: [
      "coverage of Jamie",
      "Jamie's role",
      "Facebook distribution",
      "campaign reach, causation, or outcome"
    ]
  },
  {
    id: ids.odditiesPrint,
    title: "Frank Norton Kaiju print",
    organization: "Oddities Prints",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Oddities Prints, 'Frank Norton Kaiju' product page, accessed July 16, 2026.",
    publicNote:
      "The product description says print proceeds partially benefited KC Spaces Fund and KC Tenants.",
    supportsGenerally: [
      "mutual-aid print fundraising context",
      "a public route connecting Oddities Prints and KC Spaces Fund"
    ],
    doesNotEstablish: [
      "amount raised",
      "formal partnership terms",
      "Jamie's role",
      "Page authorship"
    ]
  },
  {
    id: ids.do816,
    title: "The Daily DoGood: Kansas City",
    organization: "Do816",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: reviewedAt,
    canonicalUrl: "https://do816.com/p/the-daily-dogood-kansas-city",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Do816, 'The Daily DoGood: Kansas City,' posted by the KC Spaces Fund Facebook Page in 2020; exact route recovered July 2026.",
    publicNote:
      "The Page preserves the article title, visible issue-framing preview, and exact destination. Direct live retrieval was blocked during review.",
    supportsGenerally: [
      "Page-posted source-article route",
      "public issue framing around Kansas City community arts spaces",
      "campaign distribution context"
    ],
    doesNotEstablish: [
      "the complete article body",
      "endorsement or readership",
      "campaign reach or impact",
      "Jamie's role or Page authorship"
    ]
  },
  {
    id: ids.twocc,
    title: "Trans Women of Color Collective donation resource",
    organization: "Trans Women of Color Collective",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "dead",
    accessedAt: reviewedAt,
    canonicalUrl: "http://twocc.us/donate",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Trans Women of Color Collective donation resource, exact route recovered from the KC Spaces Fund Facebook Page, July 2026.",
    publicNote:
      "The Page pairs this route with a public statement that an Emergency Relief Grant was on its way to the collective. Direct live retrieval was unavailable.",
    supportsGenerally: [
      "public recipient spotlight",
      "Page-posted donation route",
      "campaign fundraising communication"
    ],
    doesNotEstablish: [
      "grant amount or payment record",
      "grant-selection authority",
      "formal partnership terms",
      "Jamie's role or Page authorship"
    ]
  }
];

export const kcSpacesFundFacebookPostClaims: ClaimRecord[] = [
  {
    id: ids.survivingPopulation,
    project: "kc-spaces-fund",
    internalClaim:
      "The complete capture-date KC Spaces Fund Facebook Page population contains 40 surviving public records spanning visible endpoints from April 7 through July 9, 2020, reproduced by repeated terminal traversals and an independent July 16 verification.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Repeated authenticated passes account for 40 surviving public KC Spaces Fund Facebook records from April through July 2020.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"
        ],
        rationale:
          "The bounded population belongs in the research record, not as a portfolio accomplishment metric."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "40-row ledger",
          "terminal traversal counts",
          "stable media reconciliation",
          "visible endpoint range"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.protectedRun,
        relationship: "corroborating",
        supports: [
          "independent 40-record traversal",
          "61 captured scroll states",
          "eight stable terminal checks"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.report,
        relationship: "corroborating",
        supports: ["capture method", "population and privacy boundary"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every record exposed by the authenticated capture-date Page feed received a public-safe ledger row.",
      "The capture is not a native Meta export, deletion history, or proof that every historical post survives.",
      "Non-media records without durable public permalinks retain order-based identities rather than invented post IDs or dates."
    ],
    antiClaims: [
      "The ledger contains every Facebook item ever published by KC Spaces Fund.",
      "Forty records are a complete Meta owner export.",
      "Every ledger row preserves a complete readable post."
    ],
    researchInquiryIds: [ids.nativeExportInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.campaignRouting,
    project: "kc-spaces-fund",
    internalClaim:
      "The surviving Page population documents a mutual-aid operating sequence across campaign and application routes, fundraising, resource amplification, and 11 named funded-space spotlights.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The surviving Page record routes applications and fundraising and preserves 11 funded-space spotlights within a collaborator-led mutual-aid campaign.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"
        ],
        rationale:
          "Preserve the collective operating record without converting it into Jamie's individual impact claim."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "11 spotlight rows",
          "eight application-routing rows",
          "14 fundraising rows",
          "eight exact destinations"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.goFundMe,
        relationship: "corroborating",
        supports: [
          "fundraising outcome",
          "emergency-grant framing",
          "named organizer credit",
          "fiscal sponsorship"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.campaignSite,
        relationship: "corroborating",
        supports: ["campaign mission", "donate, join, apply, and contact routes"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.odditiesPrint,
        relationship: "corroborating",
        supports: ["mutual-aid print benefit context"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The Page documents public communication and routing, not every campaign operation, application, grant decision, or payment.",
      "A posted route or public comment relationship does not establish readership, endorsement, formal partnership, conversion, or outcome.",
      "The Page preview and exact Do816 route establish distribution, not the complete article body or its readership."
    ],
    antiClaims: [
      "The Facebook Page is a complete grant-administration record.",
      "Every linked organization endorsed or formally partnered with the campaign.",
      "One Page-posted article makes the population a comprehensive press corpus."
    ],
    researchInquiryIds: [ids.sourceInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.digitalSupport,
    project: "kc-spaces-fund",
    internalClaim:
      "Jamie supported KC Spaces Fund behind the scenes by building its web infrastructure and supporting the choice of an available cross-channel project identity; the collaborator-led Page, domain, and fundraiser used that identity consistently, while Jamie was not the account stakeholder or publisher.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "technical-operations",
        text:
          "For KC Spaces Fund, Jamie built campaign web infrastructure and supported an available cross-channel identity; collaborator-led channels used it to route applications, donations, and funded-space updates.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "This is the strongest role-specific statement supported by Jamie's firsthand clarification and the protected technical archive."
      },
      {
        key: "archive-note",
        text:
          "Jamie's bounded role was website, digital-infrastructure, and cross-channel naming support, not Facebook publishing, public organizing, fundraising ownership, or grant decisions.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts"
        ],
        rationale:
          "The research-facing note preserves both useful credit and the essential collective boundary."
      }
    ],
    evidence: [
      {
        sourceId: ids.digitalArchive,
        relationship: "private-support",
        supports: [
          "campaign-site, theme, widget, deployment, and continuity work"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.roleClarification,
        relationship: "private-support",
        supports: ["cross-channel naming support", "non-posting boundary"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: ids.page,
        relationship: "context",
        supports: ["public Page identity and fundraiser route"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.corpus,
        relationship: "context",
        supports: [
          "consistent site, application, fundraising, and spotlight routing"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie with bounded web infrastructure and cross-channel naming support, not public organizing, fundraising ownership, grant decisions, or campaign voice.",
      "The public channels corroborate identity consistency; Jamie's firsthand clarification supplies the naming-support and non-posting account, pending collaborator confirmation of process detail.",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as named by the fundraiser."
    ],
    antiClaims: [
      "Jamie organized KC Spaces Fund.",
      "Jamie alone named KC Spaces Fund.",
      "Jamie managed or posted from the KC Spaces Fund Facebook Page.",
      "Jamie ran the fundraiser or made grant decisions."
    ],
    researchInquiryIds: [ids.stewardshipInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.interactionSignals,
    project: "kc-spaces-fund",
    internalClaim:
      "Twenty-eight of 40 surviving Page records retain at least one visible reaction signal, totaling a mutable capture-date floor of 119, while four records retain public comment relationships including three classified only as cultural-space accounts.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty-eight surviving records retain at least one visible reaction signal, with a capture-date floor of 119; four retain public comment relationships.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Preserve the measured state without presenting volatile platform labels as audience, endorsement, or impact."
      }
    ],
    evidence: [
      {
        sourceId: ids.corpus,
        relationship: "direct-support",
        supports: [
          "aggregate displayed reaction floor",
          "record-level reaction signals",
          "bounded comment-relation classes"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The signal floor is a mutable July 2026 interface value, not a historical peak.",
      "Personal identities and comment text are withheld and stakeholder-group engagement is not inferred.",
      "Displayed interaction signals are not unique people, reach, impressions, attendance, conversion, endorsement, mandate, causality, or impact."
    ],
    antiClaims: [
      "KC Spaces Fund reached 119 people.",
      "One hundred nineteen stakeholders endorsed the campaign.",
      "Three cultural-space comment relationships prove partnership or grant impact."
    ],
    researchInquiryIds: [ids.nativeExportInquiry],
    reviewedAt,
    reviewedBy
  },
  {
    id: ids.independentRecognition,
    project: "kc-spaces-fund",
    internalClaim:
      "The Kansas City Star independently listed KC Spaces Fund as a COVID-era artist-support resource, the Page circulated a Do816 article route about the response, and an Oddities Prints page preserved a product-benefit connection to the campaign.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Contemporary public sources independently identify KC Spaces Fund as an artist-support resource and preserve one mutual-aid print-benefit route.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "The sources deepen the bank but do not independently establish Jamie's individual role."
      }
    ],
    evidence: [
      {
        sourceId: ids.kansasCityStar,
        relationship: "direct-support",
        supports: [
          "independent contemporary listing as an artist-support resource"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.odditiesPrint,
        relationship: "corroborating",
        supports: ["public product-benefit connection"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: ids.do816,
        relationship: "context",
        supports: ["Page-posted article route and visible issue framing"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The Kansas City Star article lists the campaign as a resource; it is not coverage of Jamie or evidence of campaign causation.",
      "The Do816 route and Page preview establish circulation and issue framing, not the complete article body, endorsement, or readership.",
      "The product page does not establish proceeds raised or partnership terms."
    ],
    antiClaims: [
      "The Kansas City Star profiled Jamie's KC Spaces Fund work.",
      "Oddities Prints proves a quantified fundraising outcome.",
      "Independent source recognition establishes Jamie's individual role."
    ],
    researchInquiryIds: [ids.sourceInquiry],
    reviewedAt,
    reviewedBy
  }
];

export const kcSpacesFundFacebookPostInquiries: ResearchInquiry[] = [
  {
    id: ids.nativeExportInquiry,
    project: "kc-spaces-fund",
    question:
      "Can a native Meta owner export reconcile complete lifetime history, publication dates, durable post identities, publisher metadata, and deleted or hidden states?",
    methods: [
      "Repeated authenticated public Page-feed traversal to terminal state.",
      "Compared record counts and stable public media IDs across traversals.",
      "Performed an independent 61-snapshot traversal on July 16 that recovered 40 distinct records and reached eight stable terminal checks.",
      "Checked the authenticated Meta Business Suite asset selector; KC Spaces Fund was not among Jamie's currently available Page assets.",
      "Excluded raw bodies, personal social-graph identities, private analytics, authenticated state, and Page-management data from the public corpus."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "Prior traversals recovered 40, 38, and 40 records, and the independent July 16 traversal again recovered 40.",
      "The same 21 public media IDs anchor the canonical population.",
      "Forty surviving public records are accounted for, but native owner-export history was not recovered."
    ],
    limitations: [
      "The live Page feed can omit deleted, hidden, private, unpublished, no-longer-retained, or owner-export-only records.",
      "Non-media remnants do not expose durable public permalinks or complete individual dates.",
      "Current asset access does not prove historical access or authorship."
    ],
    sourceIds: [ids.corpus, ids.page, ids.protectedRun],
    publicSummary:
      "Repeated authenticated traversal accounts for 40 surviving public records while leaving lifetime-history and publisher questions open.",
    protectedLocatorId: "LOC-KCSPACES-FACEBOOK-POST-RESEARCH-2026"
  },
  {
    id: ids.stewardshipInquiry,
    project: "kc-spaces-fund",
    question:
      "How should account creation, naming, identity design, website implementation, publishing, moderation, and campaign operations be credited among collaborators?",
    methods: [
      "Compared Jamie's firsthand role clarification with the protected digital-infrastructure review.",
      "Compared public identity strings across the Page, campaign domain, and GoFundMe.",
      "Preserved named public organizer credit from the fundraiser."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Protected archive evidence supports Jamie's website and digital-infrastructure contribution.",
      "Jamie recalls supporting an available cross-channel project name and explicitly disclaims Page publishing ownership.",
      "The public Page, domain, and fundraiser use a consistent KC Spaces Fund identity.",
      "The fundraiser names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as organizers."
    ],
    limitations: [
      "The public channels do not identify who proposed, approved, registered, or published each element.",
      "Jamie's naming-process memory should be corroborated before expanding beyond support language.",
      "Current authenticated access would establish present custody only, not historical publishing authorship."
    ],
    sourceIds: [
      ids.roleClarification,
      ids.digitalArchive,
      ids.page,
      ids.campaignSite,
      ids.goFundMe
    ],
    publicSummary:
      "The defensible current credit is Jamie's bounded web-infrastructure and cross-channel naming support within a collaborator-led campaign.",
    protectedLocatorId: "LOC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026"
  },
  {
    id: ids.sourceInquiry,
    project: "kc-spaces-fund",
    question:
      "Which campaign routes and independent sources can be preserved and closely read without turning distribution into endorsement or outcome evidence?",
    methods: [
      "Dispositioned every destination family exposed by the 40-row public corpus.",
      "Opened the campaign site, application route, fundraiser, Facebook destination Pages, and recoverable independent sources.",
      "Searched for contemporary independent reporting while keeping sources not posted by the Page distinct from posted routes."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All eight public destination families retain exact routes.",
      "The Page posted one recovered source-article route, Do816's 'The Daily DoGood: Kansas City.'",
      "A Kansas City Star service article independently listed KC Spaces Fund as an artist-support resource.",
      "An Oddities Prints page independently preserves a product-benefit connection to KC Spaces Fund and KC Tenants."
    ],
    limitations: [
      "The Do816 article body and Trans Women of Color Collective resource were not directly retrievable during review; exact routes and Page context remain preserved.",
      "The independent Kansas City Star article was discovered separately and must not be described as Page-posted.",
      "Posted or linked material does not establish endorsement, formal partnership, conversion, proceeds, causation, or impact."
    ],
    sourceIds: [
      ids.corpus,
      ids.campaignSite,
      ids.goFundMe,
      ids.kansasCityStar,
      ids.odditiesPrint,
      ids.do816,
      ids.twocc
    ],
    publicSummary:
      "The Page is primarily an action and mutual-aid routing record, with one recovered posted article route and separately governed independent contemporary context."
  }
];

export const kcSpacesFundFacebookPostIntake: IntakeRecordInput[] = [
  {
    id: "INT-KCSPACES-FACEBOOK-POSTS-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "KC Spaces Fund Facebook posts full-population archival pass",
    description:
      "Authenticated archival production over all 40 distinct surviving records exposed by the public Page feed, preserved as a minimized public corpus with a protected raw capture.",
    whyItMatters:
      "The record documents a collaborator-led mutual-aid operating surface and strengthens the evidence for Jamie's bounded web-infrastructure and cross-channel identity support without absorbing organizer, publisher, fundraiser, or grant-making credit.",
    projectIds: ["kc-spaces-fund"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created five governed claims and three inquiries; only the bounded technical-operations projection is active on the website, while population, interaction, and independent-source detail remain knowledge-bank depth.",
    sourceIds: kcSpacesFundFacebookPostSources.map((source) => source.id),
    claimIds: [
      ids.survivingPopulation,
      ids.campaignRouting,
      ids.digitalSupport,
      ids.interactionSignals,
      ids.independentRecognition
    ],
    inquiryIds: [
      ids.nativeExportInquiry,
      ids.stewardshipInquiry,
      ids.sourceInquiry
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json",
      "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.manifest.json",
      "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md",
      "docs/knowledge-bank/runs/2026-07-16-kcspacesfund-facebook-posts-full-population.md"
    ],
    boundaries: [
      "One hundred percent means every distinct surviving record exposed by repeated authenticated Page-feed traversals, not every post ever created.",
      "Jamie was not the stakeholder or owner posting from the Facebook Page.",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo.",
      "Raw bodies, personal identities, authenticated state, private analytics, Page-management records, applicant or grantee materials, donor data, and private project files remain protected.",
      "Displayed interaction signals are not unique people, reach, endorsement, conversion, mandate, causation, or impact."
    ]
  }
];
