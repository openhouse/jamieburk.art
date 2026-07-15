import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated Facebook archival review"
];

const ids = {
  corpus: "SRC-KCSPACES-FACEBOOK-POST-CORPUS-2026-07-15",
  protectedRun: "SRC-KCSPACES-FACEBOOK-POST-RESEARCH-2026-07-15",
  page: "SRC-KCSPACES-FACEBOOK-PAGE-2026-07-15",
  campaignSite: "SRC-KCSPACES-CAMPAIGN-SITE-2020",
  goFundMe: "SRC-KCSPACES-GOFUNDME-2020",
  oddities: "SRC-KCSPACES-ODDITIES-PRINTS-2020",
  do816: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
  kcStar: "SRC-KCSPACES-KCSTAR-HELP-KC-2020",
  existingClaim: "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION",
  inquiry: "INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"
} as const;

export const kcSpacesFundFacebookPostsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-KCSPACES-FACEBOOK-POST-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated public KC Spaces Fund Facebook Page and protected archival captures",
      publicSafeSummary:
        "A public-safe 38-row inventory of every record exposed by the Page's authenticated 2020 filter, with operating themes, posted routes, bounded interaction values, and unresolved authorship preserved.",
      projects: ["kc-spaces-fund"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        ids.corpus,
        ids.protectedRun,
        ids.page,
        ids.campaignSite,
        ids.goFundMe,
        ids.oddities,
        ids.do816,
        ids.kcStar
      ],
      claimIds: [ids.existingClaim],
      researchTaskIds: [
        "TASK-KCSPACES-FACEBOOK-OWNER-EXPORT",
        "TASK-KCSPACES-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
        "TASK-KCSPACES-NAMING-ALIGNMENT",
        "TASK-KCSPACES-DO816-PRESERVATION"
      ],
      notes: [
        "One hundred percent means all 38 distinct records exposed by the authenticated 2020 Page filter after four stable terminal checks, not every post ever created or deleted-post recovery.",
        "The public ledger excludes post bodies, native identities, rendered tokens, comments, engager identities, authenticated routes, and private contact details.",
        "The Page identity does not identify the human publisher of each post; Jamie states he was not the stakeholder or owner posting to the account.",
        "Jamie's memory that he supported selection of a name available across domains and social platforms remains a research lead, not an established Facebook-corpus claim."
      ],
      reviewedAt,
      reviewedBy
    },
    {
      id: "INT-KCSPACES-NAMING-ALIGNMENT-RECOLLECTION-2026",
      kind: "recollection",
      capturedAt: reviewedAt,
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Research Jamie's remembered support for selecting a KC Spaces Fund name available across domain and social-account surfaces.",
      projects: ["kc-spaces-fund"],
      status: "decomposed",
      disposition: "research-queued",
      sourceIds: [],
      claimIds: [],
      researchTaskIds: ["TASK-KCSPACES-NAMING-ALIGNMENT"],
      notes: [
        "Participant memory is an important lead but does not independently establish decision ownership or a complete naming process."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: ids.corpus,
      title: "KC Spaces Fund Facebook posts full-population public-safe corpus",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex authenticated archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/15046d080c3ee374923cf6de25d5903f443d70a4/docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Spaces Fund Facebook posts full-population public-safe corpus, July 15, 2026.",
      publicNote:
        "A 38-row ledger of dates, one-way reconciliation hashes, content-recovery states, posted route keys, overlapping mission classifications, and bounded capture-date reaction values. Raw post bodies, native IDs, tokens, comments, identities, authenticated routes, and private contact details are excluded.",
      supportsGenerally: [
        "38 records exposed by the authenticated 2020 Page filter",
        "a 2020-04-07 through 2020-07-09 surviving chronology",
        "33 recovered public bodies, two unavailable embedded sources, and three unrecovered bodies",
        "nine distinct posted external routes",
        "overlapping application, fundraising, volunteer, grantee, and media patterns",
        "eleven visible named grantee or funded-space highlights",
        "bounded capture-date reaction and follower displays"
      ],
      doesNotEstablish: [
        "every post ever created or deleted-post recovery",
        "historical human publisher identity or Jamie's Page authorship",
        "incoming engagement by named stakeholder groups",
        "unique-person reach, donations, applications, attendance, endorsement, conversion, or impact",
        "Jamie's role in name selection"
      ]
    },
    {
      id: ids.protectedRun,
      title: "Authenticated KC Spaces Fund Facebook post archival-production run",
      author: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Authenticated archival-production pass over the surviving KC Spaces Fund Facebook Page, July 15, 2026.",
      publicNote:
        "Protected research materials retain rendered post text and traversal evidence for verification; the public repository retains only public-safe aggregates and one-way reconciliation hashes.",
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "terminal Page traversal",
        "record-level date recovery",
        "source-route extraction",
        "mission and stakeholder-reference close reading",
        "public-safe population reconciliation"
      ],
      doesNotEstablish: [
        "permission to publish protected captures",
        "Meta owner-export completeness",
        "deleted-post recovery",
        "historical post-level human authorship",
        "stakeholder identity behind visible reaction values"
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
      publicCitation: "KC Spaces Fund Facebook Page, accessed July 15, 2026.",
      publicNote:
        "The Page identified the project as supporting grassroots arts and culture spaces during COVID-19 and displayed 108 followers on the review date.",
      supportsGenerally: [
        "current Page identity",
        "project-purpose tagline",
        "a dated current follower display"
      ],
      doesNotEstablish: [
        "historical audience size",
        "the identity of readers or engagers",
        "historical human publisher identity",
        "complete lifetime publishing history"
      ]
    },
    {
      id: ids.campaignSite,
      title: "KC Spaces Fund",
      organization: "KC Spaces Fund",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-07",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kcspacesfund.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Spaces Fund campaign site, accessed July 15, 2026.",
      publicNote:
        "The campaign site describes a rolling April-June 2020 emergency-relief fund, grants up to $500, eligibility and priority criteria, Allied Media Projects as fiscal sponsor, and named public organizers.",
      supportsGenerally: [
        "rolling April-June 2020 emergency-relief applications",
        "grants up to $500",
        "priority criteria and eligible geography",
        "Allied Media Projects as fiscal sponsor",
        "Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as named public organizers"
      ],
      doesNotEstablish: [
        "Jamie's grant-selection, fundraising-control, or campaign-organizer role",
        "Facebook post authorship",
        "a complete award ledger"
      ]
    },
    {
      id: ids.goFundMe,
      title: "KC Spaces Fund",
      organization: "KC Spaces Fund",
      author: "Kendell Harbin",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-07",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Spaces Fund, GoFundMe campaign page, 2020.",
      publicNote:
        "The public campaign identifies Kendell Harbin as organizer for Allied Media Projects and reports $9,590 raised against a $9,500 goal from 107 donations.",
      supportsGenerally: [
        "public fundraising route",
        "$9,590 raised against a $9,500 goal",
        "107 donations",
        "Kendell Harbin as organizer for Allied Media Projects"
      ],
      doesNotEstablish: [
        "Jamie's fundraising control",
        "the identity of every donor",
        "causation by a particular Facebook post"
      ]
    },
    {
      id: ids.oddities,
      title: "COVID-19 fundraiser prints benefiting KC Spaces Fund",
      organization: "Oddities Prints",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-09",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.odditiesprints.com/odd-shop/frank-norton-kaiju",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Oddities Prints, fundraiser-print product record benefiting KC Spaces Fund and KC Tenants, accessed July 15, 2026.",
      publicNote:
        "A surviving product page states that the print was part of a fundraiser series whose proceeds partially benefited KC Spaces Fund and KC Tenants.",
      supportsGenerally: [
        "a mission-relevant fundraising-print collaboration",
        "partial proceeds benefiting KC Spaces Fund and KC Tenants"
      ],
      doesNotEstablish: [
        "the amount transferred to either beneficiary",
        "Jamie's authorship or administration of the fundraiser",
        "Facebook-caused sales"
      ]
    },
    {
      id: ids.do816,
      title: "The Daily DoGood: Kansas City",
      organization: "Do816",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-21",
      accessedAt: reviewedAt,
      canonicalUrl: "https://do816.com/p/the-daily-dogood-kansas-city",
      preferredPublicUrl: "canonical",
      publicCitation: "Do816, 'The Daily DoGood: Kansas City,' April 21, 2020.",
      publicNote:
        "The Facebook record preserves the article title and route; direct retrieval was access-restricted during review, so no article-body claim is made.",
      supportsGenerally: [
        "a published-media route circulated by the Page",
        "the article title and April 21, 2020 circulation context"
      ],
      doesNotEstablish: [
        "the unrecovered article body's complete contents",
        "Jamie's authorship of the Page post",
        "audience reach or outcome"
      ]
    },
    {
      id: ids.kcStar,
      title: "Your money, your blood, your time: How to help Kansas City during COVID-19 crisis",
      organization: "The Kansas City Star",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-07",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.kansascity.com/news/coronavirus/article241807581.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "The Kansas City Star, 'Your money, your blood, your time: How to help Kansas City during COVID-19 crisis,' April 7, 2020.",
      publicNote:
        "Search-indexed article text lists KC Spaces Fund and its campaign site among ways to support Kansas City artists and artisans; direct retrieval was unavailable during review.",
      supportsGenerally: [
        "independent local-media circulation of the KC Spaces Fund campaign route",
        "April 7, 2020 public launch context"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "Facebook engagement",
        "the complete article body beyond the recovered indexed passage"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "Four stable terminal checks account for all 38 distinct records exposed by the authenticated 2020 Page filter from April 7 through July 9, 2020.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-COMPLETENESS-BOUNDARY-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "The 38-row denominator is complete for the surviving public records exposed on the review date; it is not a Meta owner export, every-post-ever claim, or deleted-post recovery.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-OPERATING-PATTERNS-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "Overlapping record-level classifications identify 12 grant or grantee records, 10 application or eligibility records, 23 fundraising or mutual-aid print records, six coalition or volunteer records, and one press or media record.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-ROUTE-INVENTORY-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "The 38 records contain nine distinct posted external routes, including the campaign site, application and volunteer routes, GoFundMe, fundraising-print pages, a recipient page, a recipient donation route, and local media.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-NAMED-HIGHLIGHTS-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "The surviving Page population contains eleven visible named grantee or funded-space highlights, corroborating the independently preserved project-account timeline evidence.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-INTERACTION-BOUNDARY-2026",
      sourceId: ids.corpus,
      project: "kc-spaces-fund",
      assertion:
        "Twenty-eight rows displayed 119 reactions in aggregate on July 15, 2026; these are post-level interface values, not unique people, historical reach, stakeholder-group engagement, donations, applications, attendance, endorsement, conversion, or impact.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-AUTHORSHIP-BOUNDARY-2026",
      sourceId: ids.protectedRun,
      project: "kc-spaces-fund",
      assertion:
        "The shared Page identity does not recover the historical human publisher of each post, and Jamie states he was not the stakeholder or owner posting to the account.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-ORGANIZER-CREDIT-2026",
      sourceId: ids.campaignSite,
      project: "kc-spaces-fund",
      assertion:
        "The campaign site names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as public organizers; the Facebook corpus does not transfer that credit to Jamie.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-NAMING-ALIGNMENT-RESEARCH-LEAD-2026",
      sourceId: ids.protectedRun,
      project: "kc-spaces-fund",
      assertion:
        "Jamie's recollection that he supported selecting a project name available across domain and social-account surfaces is a participant-memory research lead, not a claim established by the Facebook corpus.",
      relationship: "raises-question",
      confidence: "moderate",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-FACEBOOK-PAGE-IDENTITY-2026",
      sourceId: ids.page,
      project: "kc-spaces-fund",
      assertion:
        "The current Page identifies KC Spaces Fund as supporting grassroots arts and culture spaces during COVID-19; its 108-follower display is a July 15, 2026 snapshot, not evidence of 2020 reach.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-GOFUNDME-PUBLIC-RESULT-2020",
      sourceId: ids.goFundMe,
      project: "kc-spaces-fund",
      assertion:
        "The public GoFundMe identifies Kendell Harbin as organizer for Allied Media Projects and reports $9,590 raised against a $9,500 goal from 107 donations; it does not establish Jamie's fundraising control or Facebook causation.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-ODDITIES-FUNDRAISER-2020",
      sourceId: ids.oddities,
      project: "kc-spaces-fund",
      assertion:
        "A surviving Oddities Prints product page states that its fundraiser series partially benefited KC Spaces Fund and KC Tenants; it does not recover the amount transferred or establish Jamie's administration of the fundraiser.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-DO816-ROUTE-BOUNDARY-2020",
      sourceId: ids.do816,
      project: "kc-spaces-fund",
      assertion:
        "The Facebook population preserves Do816's April 21, 2020 article title and route, while the inaccessible article body remains unrecovered and supports no additional content claim.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-KCSPACES-KCSTAR-LAUNCH-CONTEXT-2020",
      sourceId: ids.kcStar,
      project: "kc-spaces-fund",
      assertion:
        "Search-indexed Kansas City Star text listed KC Spaces Fund and its campaign site among ways to support local artists and artisans on April 7, 2020; the unretrieved article body supports no broader claim.",
      relationship: "corroborates",
      confidence: "moderate",
      candidateClaimIds: [ids.existingClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [],
  researchTasks: [
    {
      id: "TASK-KCSPACES-FACEBOOK-OWNER-EXPORT",
      project: "kc-spaces-fund",
      question:
        "Can an owner-authorized Meta export reconcile deleted, hidden, unpublished, or otherwise unexposed records with the 38-row surviving Page surface?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Request an owner-authorized export with stable post identities and publication states",
        "Crosswalk exported, public-surface, unavailable, and deleted records",
        "Version any denominator correction rather than overwriting the surviving-surface result"
      ],
      successCriteria: [
        "Account for every exported record without calling unrecovered records nonexistent",
        "Keep messages, comments, engager identities, and private account data outside the public repository",
        "Preserve the historical human-publisher field as unresolved unless native evidence supports it"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.existingClaim],
      publicSummary:
        "The surviving public surface is fully accounted for; owner-export and deleted-post completeness remain open.",
      reviewedAt
    },
    {
      id: "TASK-KCSPACES-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
      project: "kc-spaces-fund",
      question:
        "Can identity-complete, owner-authorized data establish whether grantees, applicants, donors, artists, organizers, public agencies, or media engaged with the Page?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Obtain an owner-authorized reaction and comment export if one exists",
        "Define stakeholder groups before counting and deduplicate people across records",
        "Separate public references by the Page from incoming engagement with the Page"
      ],
      successCriteria: [
        "Report stakeholder-group engagement only against a complete and documented identity denominator",
        "Do not publish private identities or comment text",
        "Keep engagement distinct from endorsement, donation, application, attendance, conversion, and impact"
      ],
      sourceIds: [ids.corpus, ids.protectedRun],
      claimIds: [ids.existingClaim],
      publicSummary:
        "The Page's outgoing stakeholder routing is documented; incoming stakeholder-group engagement remains unmeasured.",
      reviewedAt
    },
    {
      id: "TASK-KCSPACES-NAMING-ALIGNMENT",
      project: "kc-spaces-fund",
      question:
        "What dated records or collaborator testimony can corroborate Jamie's remembered role supporting a project name available across domain and social-account surfaces?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Review dated naming, domain-search, account-creation, repository, and launch records",
        "Invite the named organizers to confirm, refine, or contest the remembered role",
        "Separate availability research, recommendation, decision authority, account creation, and later stewardship"
      ],
      successCriteria: [
        "Corroborate a bounded contribution or retain the recollection as unresolved",
        "Credit collective decision-making and named organizers",
        "Avoid inferring ownership from matching handles and domain names"
      ],
      sourceIds: [ids.protectedRun],
      claimIds: [],
      publicSummary:
        "Jamie's remembered naming-alignment support is preserved as a research lead pending dated corroboration.",
      reviewedAt
    },
    {
      id: "TASK-KCSPACES-DO816-PRESERVATION",
      project: "kc-spaces-fund",
      question:
        "Can the complete April 21, 2020 Do816 article be recovered from a stable public archive?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Check public web archives for the canonical route",
        "Search the project archive for a public-safe saved copy or contemporaneous excerpt",
        "Keep title-and-route evidence distinct from unrecovered body text"
      ],
      successCriteria: [
        "Recover and close-read an attributable article body or preserve the current access-restricted state",
        "Create no content claim from an unrecovered body",
        "Associate any archive URL with an explicit capture date"
      ],
      sourceIds: [ids.corpus, ids.do816],
      claimIds: [],
      publicSummary:
        "The Page preserves a Do816 article title and route; the article body remains to be recovered.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: ids.inquiry,
      project: "kc-spaces-fund",
      question:
        "What does the full surviving KC Spaces Fund Facebook Page population establish about public operations, sources, traction, stakeholder patterns, and Jamie's role?",
      methods: [
        "Verified Jamie's authenticated Facebook session and opened the public KC Spaces Fund Page.",
        "Confirmed that the Page was not among the assets available through Jamie's current Meta Business Suite management view.",
        "Applied the 2020 Page filter, repeatedly scrolled to the terminal record, and required four consecutive stable terminal checks with no visible loading boundary.",
        "Reconciled all 38 distinct rendered records using protected identifiers and published only one-way hashes.",
        "Recovered all 38 publication dates, classified overlapping mission and stakeholder-reference patterns, and inventoried nine posted external routes.",
        "Separated outgoing Page references from incoming engagement and bounded current reaction and follower displays.",
        "Close-read public campaign, fundraiser-print, and local-media sources while preserving access-restricted article bodies as unrecovered."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 38 records exposed by the authenticated 2020 Page filter were accounted for across an April 7-July 9 chronology.",
        "The population contains 33 recovered public bodies, two unavailable embedded sources, and three unrecovered bodies.",
        "Overlapping classifications preserve 12 grant or grantee records, 10 application or eligibility records, 23 fundraising or mutual-aid print records, six coalition or volunteer records, and one press or media record.",
        "Nine distinct external routes connect the Page to the campaign site, applications, volunteer participation, GoFundMe, fundraiser prints, recipient context, and local media.",
        "The Facebook population corroborates eleven visible named grantee or funded-space highlights already preserved from the project's X account.",
        "Twenty-eight rows displayed 119 reactions on the capture date, but stakeholder identities were not recovered and incoming stakeholder-group engagement remains unmeasured.",
        "The historical human publisher was not recovered; Jamie states he was not the stakeholder or owner posting, while the campaign site credits Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as organizers.",
        "Jamie's remembered support for cross-platform name availability remains a research lead; his separately documented public-safe contribution remains behind-the-scenes digital infrastructure."
      ],
      limitations: [
        "The denominator covers the complete surviving public surface exposed on July 15, 2026, not every post ever created or deleted, hidden, private, unpublished, or no-longer-retained records.",
        "The shared Page identity does not identify the historical human publisher of each post.",
        "Reaction and commenter identities were not recovered, so key-stakeholder-group engagement cannot be counted.",
        "Current reaction and follower displays are volatile snapshots, not historical reach, unique people, attendance, donation, application, endorsement, conversion, or impact measures.",
        "Two embedded sources and three post bodies remain unrecovered; not recovered is distinct from never existing.",
        "Direct retrieval of the Do816 and Kansas City Star article bodies was unavailable during review, so only recovered title, route, and indexed context are represented."
      ],
      sourceIds: [
        ids.corpus,
        ids.protectedRun,
        ids.page,
        ids.campaignSite,
        ids.goFundMe,
        ids.oddities,
        ids.do816,
        ids.kcStar
      ],
      publicSummary:
        "A complete surviving-surface pass accounted for 38 KC Spaces Fund Facebook records, preserving application, fundraising, volunteer, grantee, and source-routing activity while leaving deleted-post recovery, human publisher attribution, stakeholder identities, and Jamie's remembered naming role unresolved.",
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001"
    }
  ]
};
