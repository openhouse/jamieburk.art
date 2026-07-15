import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcSpacesFundFacebookAudit = {
  ownerTimelineRecords: 38,
  startBoundary: "2020-04-07",
  endBoundary: "2020-07-09",
  terminalScrollsWithoutAddition: 40,
  pageFollowerDisplay: 108,
  forms: {
    originalMediaPosts: 20,
    statusUpdateRemnants: 11,
    unavailableAttachmentRemnants: 5,
    videoOrGifRoutes: 2
  },
  readableCampaignMessages: 19,
  interfaceRemnants: 19,
  granteeRecognitionRecords: 10,
  namedGrantees: [
    "Vulpes Bastille",
    "SWAN",
    "Kansas City Textile Arts Center",
    "Parker 2",
    "Farewell Transmission",
    "One Mic Stand",
    "Blackbox on Troost",
    "Get Woke",
    "UN/TUCK",
    "Latino Foundation for the Arts"
  ],
  destinationFamilyOccurrences: {
    campaignSite: 17,
    mutualAidPrintFundraiser: 4,
    goFundMe: 1
  },
  sourceArticlesRecovered: 0,
  recordsWithVisibleReactions: 28,
  visibleReactionFloor: 119,
  publisherAttribution: {
    individuallyAttributedRecords: 0,
    jamieAccountPostingRole: "not-claimed"
  },
  censusPath:
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-census-2026-07-14.csv"
} as const;

export const kcSpacesFundFacebookIntake = [
  {
    id: "LEAD-KCSPACESFUND-FACEBOOK-FULL-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for KC Spaces Fund Facebook posts",
    summary:
      "Disposition the complete surviving public Page timeline, identify campaign routes and visible traction, and integrate Jamie's bounded digital-operations and cross-channel naming role without assigning him the campaign voice or organizer credit.",
    sourceUrl: "https://www.facebook.com/KCSpacesFund/",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["kc-spaces-fund", "career-proof-system"],
    sourceIds: [
      "SRC-FB-KCSPACESFUND-PAGE-CONTROL-2026",
      "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-KCSPACESFUND-DIGITAL-ARCHIVE-REVIEW-2026",
      "SRC-JAMIE-KCSPACESFUND-ROLE-CORRECTION-2026",
      "SRC-KCSPACESFUND-GOFUNDME-2020"
    ],
    claimIds: [
      "CLM-KCSPACESFUND-SURVIVING-PUBLIC-TIMELINE",
      "CLM-KCSPACESFUND-CAMPAIGN-ROUTING",
      "CLM-KCSPACESFUND-DIGITAL-IDENTITY-SUPPORT",
      "CLM-KCSPACESFUND-VISIBLE-REACTION-FLOOR"
    ],
    inquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    notes: [
      "An authenticated top-to-bottom traversal recovered 38 unique surviving public Page records. Forty additional endpoint scrolls added no records.",
      "The Page uses KC Spaces Fund as its name and handle, repeatedly routes to kcspacesfund.com, and links a GoFundMe path with the same project string.",
      "Jamie confirms that he supported website creation and the choice of a project name available across social and domain surfaces, but was not the stakeholder or owner posting on the Page.",
      "Raw post text, comments, identities, authentication state, administrator context, contact details, and Page-management data remain outside the public repository."
    ]
  }
] satisfies IntakeRecord[];

export const kcSpacesFundFacebookSources = [
  {
    id: "SRC-FB-KCSPACESFUND-PAGE-CONTROL-2026",
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The Page supplies the public project identity, mission line, current follower display, GoFundMe route, and surviving timeline surface.",
    supportsGenerally: [
      "the KC Spaces Fund public Page name and handle",
      "the mission line Supporting Grassroots Arts & Culture Spaces During COVID-19",
      "a current display of 108 followers",
      "a public GoFundMe route carrying the same project name"
    ],
    doesNotEstablish: [
      "which human published any post",
      "that Jamie managed or posted from the Page",
      "who originated the campaign name",
      "reach, attendance, endorsement, conversion, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
    title: "KC Spaces Fund Facebook surviving-public-timeline run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 accounting of the surviving KC Spaces Fund Facebook Page timeline.",
    publicNote:
      "The public census retains one disposition row per record without reproducing post text, comments, identities, or administrative data.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "38 unique surviving public Page records from April 7 through July 9, 2020",
      "19 readable campaign messages and 19 current-interface remnants",
      "ten readable grantee-recognition records",
      "17 records routing to the campaign site, four to a mutual-aid print fundraiser, and one to GoFundMe",
      "28 records with at least one visible reaction and a mutable floor of 119 reactions",
      "no source-article route recovered from the current Page timeline"
    ],
    doesNotEstablish: [
      "an official Meta export or deletion history",
      "every historical Page post or attachment body",
      "individual publisher, drafter, or source-author identity",
      "unique people, reach, impressions, attendance, conversion, endorsement, causality, or impact"
    ]
  },
  {
    id: "SRC-KCSPACESFUND-DIGITAL-ARCHIVE-REVIEW-2026",
    title: "KC Spaces Fund digital-infrastructure archival review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-09",
    publicCitation:
      "Public-safe summary of a July 2026 archival review of KC Spaces Fund digital infrastructure.",
    publicNote:
      "The review covers a launch assignment, Git history for the Ghost site, campaign theme, and fundraising widget, plus public-safe domain continuity without publishing private project records.",
    protectedLocatorId: "ARCHIVE-KCSPACESFUND-DIGITAL-INFRASTRUCTURE-2026-001",
    supportsGenerally: [
      "Jamie as author of the recovered campaign-site, theme, and fundraising-widget code",
      "Jamie's website-template launch assignment",
      "behind-the-scenes web infrastructure and deployment support",
      "campaign-domain and platform continuity"
    ],
    doesNotEstablish: [
      "that Jamie was a public organizer or fundraiser owner",
      "that Jamie made grant decisions",
      "that Jamie alone named, operated, or owned the campaign",
      "permission to publish private Drive, email, billing, subscriber, applicant, grantee, or payment records"
    ]
  },
  {
    id: "SRC-JAMIE-KCSPACESFUND-ROLE-CORRECTION-2026",
    title: "Jamie Burkart KC Spaces Fund role correction",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart firsthand role clarification supplied during July 2026 archival review.",
    publicNote:
      "Jamie confirms support for website creation and choosing an available cross-channel project name, while explicitly disclaiming stakeholder ownership and Page-posting responsibility.",
    protectedLocatorId: "CONFIRMATION-KCSPACESFUND-ROLE-2026-001",
    supportsGenerally: [
      "Jamie supported website creation",
      "Jamie supported the choice of a project name available across social and domain surfaces",
      "Jamie was not the stakeholder or owner posting on the Facebook account"
    ],
    doesNotEstablish: [
      "sole naming authorship",
      "campaign ownership",
      "public-organizer status",
      "authorship or publication of any Facebook post"
    ]
  },
  {
    id: "SRC-KCSPACESFUND-GOFUNDME-2020",
    title: "KC Spaces Fund GoFundMe campaign",
    organization: "KC Spaces Fund and Allied Media Projects",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund public GoFundMe campaign page.",
    publicNote:
      "The fundraiser route carries the same kcspacesfund project string used by the Page and campaign domain.",
    supportsGenerally: [
      "a public fundraising route for KC Spaces Fund",
      "cross-channel use of the kcspacesfund project string"
    ],
    doesNotEstablish: [
      "Jamie's ownership or operation of the fundraiser",
      "Jamie's role in grant decisions",
      "Jamie's sole naming authorship"
    ]
  }
] satisfies SourceRecord[];

export const kcSpacesFundFacebookClaims = [
  {
    id: "CLM-KCSPACESFUND-SURVIVING-PUBLIC-TIMELINE",
    project: "kc-spaces-fund",
    internalClaim:
      "The current KC Spaces Fund Facebook Page exposes 38 unique surviving public records from April 7 through July 9, 2020; 40 endpoint scrolls added no records.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "A checkpointed census recovered 38 unique surviving public KC Spaces Fund Facebook records from April through July 2020.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record count, surviving date range, and item-level dispositions"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every record exposed by the surviving public Page timeline received a disposition after a top-to-bottom traversal and 40 endpoint checks.",
      "This is not an official Meta export, a deletion history, or proof that every historical post survives."
    ],
    antiClaims: [
      "The census contains every Facebook item ever published by KC Spaces Fund",
      "The 38 records are a complete Meta export"
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-KCSPACESFUND-CAMPAIGN-ROUTING",
    project: "kc-spaces-fund",
    internalClaim:
      "Nineteen readable campaign messages record a public operating sequence across launch, applications, scope and eligibility, mutual-aid fundraising, and ten grantee-recognition posts; the remaining 19 records survive as incomplete interface or attachment remnants.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "The surviving Page records campaign launch and action routes, applications and eligibility, mutual-aid fundraising, and ten named grantee-recognition posts.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level campaign-function and route classification"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The Page documents the campaign's public communication sequence, not every operational decision or grant file.",
      "A posted route does not establish readership, conversion, partnership, endorsement, or outcome.",
      "No source-article route was recovered; this Page functioned primarily as campaign and mutual-aid routing rather than a press index."
    ],
    antiClaims: [
      "The Facebook Page is a complete grant-administration record",
      "Every linked organization endorsed the campaign",
      "The Page archive contains a press corpus"
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source review"]
  },
  {
    id: "CLM-KCSPACESFUND-DIGITAL-IDENTITY-SUPPORT",
    project: "kc-spaces-fund",
    internalClaim:
      "Jamie supported KC Spaces Fund behind the scenes through website creation, campaign infrastructure, and the choice of an available cross-channel project name; the collaborator-led Facebook Page and campaign routes used that identity consistently, while Jamie was not the stakeholder or owner posting on the account.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "technical-operations",
        text:
          "For KC Spaces Fund, Jamie supported the choice of an available cross-channel project name, built the campaign website, and provided behind-the-scenes digital operations. The collaborator-led Facebook Page used the same identity to route people to applications, donations, and grantee updates.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KCSPACESFUND-DIGITAL-ARCHIVE-REVIEW-2026",
        relationship: "private-support",
        supports: ["website creation and behind-the-scenes digital infrastructure"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-KCSPACESFUND-ROLE-CORRECTION-2026",
        relationship: "private-support",
        supports: [
          "cross-channel naming support",
          "the boundary that Jamie did not own or post from the account"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-KCSPACESFUND-PAGE-CONTROL-2026",
        relationship: "direct-support",
        supports: ["public Page identity and same-string GoFundMe route"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "context",
        supports: ["consistent campaign-site, application, fundraising, and grantee routes"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie with bounded digital infrastructure and cross-channel naming support, not public organizing, fundraising ownership, grant decisions, or campaign voice.",
      "The Page and routes corroborate identity consistency; Jamie's firsthand clarification supplies his naming-support and non-posting role.",
      "The work was in service of the campaign's named organizers and collective mutual-aid effort."
    ],
    antiClaims: [
      "Jamie organized KC Spaces Fund",
      "Jamie alone named KC Spaces Fund",
      "Jamie managed or posted from the KC Spaces Fund Facebook account",
      "Jamie ran the fundraiser or made grant decisions"
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-KCSPACESFUND-VISIBLE-REACTION-FLOOR",
    project: "kc-spaces-fund",
    internalClaim:
      "Twenty-eight of 38 surviving Page records display at least one current reaction, with a mutable aggregate floor of 119 reactions at capture.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty-eight surviving records retain at least one visible reaction; the current aggregate reaction floor is 119.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
        relationship: "direct-support",
        supports: ["record-level visible reaction floor at capture"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The count is a mutable July 14, 2026 interface floor, not a historical peak.",
      "Reaction identities were not published or used to infer stakeholder-group engagement.",
      "Reactions are not unique people, reach, impressions, attendance, conversion, endorsement, causality, or impact."
    ],
    antiClaims: [
      "KC Spaces Fund reached 119 people",
      "One hundred nineteen stakeholders endorsed the campaign",
      "The reaction floor measures campaign impact"
    ],
    researchInquiryIds: ["INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const kcSpacesFundFacebookInquiries = [
  {
    id: "INQ-KCSPACESFUND-FACEBOOK-POSTS-2026",
    project: "kc-spaces-fund",
    question:
      "What survives on the KC Spaces Fund Facebook Page, what mission-relevant routing and traction can it support, and how should Jamie's bounded digital role be credited?",
    methods: [
      "Used Jamie's authenticated Facebook session to traverse the public Page from the newest record to the oldest surviving record.",
      "Checkpointed item-level records outside the public repository and performed 40 additional endpoint scrolls without finding another record.",
      "Reconstructed rendered boundary dates from visible timestamp layout and dispositioned every recovered record by form, campaign function, destination family, stakeholder-reference group, and visible reaction floor.",
      "Compared the public Page identity and routes with the existing public-safe digital-infrastructure archive review and Jamie's firsthand role correction.",
      "Withheld raw text, comments, identities, authentication, administration, contact details, and private project records."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The surviving public Page timeline contains 38 records from April 7 through July 9, 2020.",
      "Nineteen readable campaign messages cover launch, application and eligibility routes, fundraising, and ten grantee-recognition posts; 19 records survive only as interface or attachment remnants.",
      "Seventeen records route to the campaign site, four to the Oddities Prints mutual-aid fundraiser, and one to GoFundMe; no press-article route was recovered.",
      "Twenty-eight records retain at least one visible reaction, with a mutable floor of 119 reactions at capture.",
      "The Page, campaign domain, and GoFundMe route use a consistent KC Spaces Fund identity.",
      "Jamie confirms website and cross-channel naming support while disclaiming stakeholder ownership and Page-posting responsibility."
    ],
    limitations: [
      "The surviving public timeline is not an official Meta export or deletion history.",
      "Nineteen interface remnants do not preserve a complete readable message or attachment body.",
      "The Page does not expose individual human publisher identity for the reviewed records.",
      "Outgoing references do not establish inbound engagement, endorsement, partnership, or action by the named stakeholders.",
      "Visible reactions do not establish unique people, reach, impressions, attendance, conversion, causality, or impact."
    ],
    sourceIds: [
      "SRC-FB-KCSPACESFUND-PAGE-CONTROL-2026",
      "SRC-FB-KCSPACESFUND-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-KCSPACESFUND-DIGITAL-ARCHIVE-REVIEW-2026",
      "SRC-JAMIE-KCSPACESFUND-ROLE-CORRECTION-2026",
      "SRC-KCSPACESFUND-GOFUNDME-2020"
    ],
    publicSummary:
      "A full current public-timeline pass recovered 38 surviving Page records and a campaign routing sequence. Jamie's selected role remains bounded to website, digital-infrastructure, and cross-channel naming support.",
    protectedLocatorId: "RESEARCH-KCSPACESFUND-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const kcSpacesFundFacebookPublicationDecisions = [
  {
    id: "PUB-KCSPACESFUND-DIGITAL-IDENTITY-SUPPORT",
    claimId: "CLM-KCSPACESFUND-DIGITAL-IDENTITY-SUPPORT",
    decision: "selected",
    audiences: [
      "hiring managers",
      "public-interest technology peers",
      "implementation and operations teams"
    ],
    surfaces: ["/work/technical-operations"],
    rationale:
      "The bounded claim shows public-facing implementation and cross-channel identity work while preserving organizer credit and Jamie's non-posting boundary.",
    decidedAt: "2026-07-14"
  },
  ...[
    [
      "PUB-KCSPACESFUND-SURVIVING-PUBLIC-TIMELINE",
      "CLM-KCSPACESFUND-SURVIVING-PUBLIC-TIMELINE",
      "Population accounting is durable provenance rather than primary site copy."
    ],
    [
      "PUB-KCSPACESFUND-CAMPAIGN-ROUTING",
      "CLM-KCSPACESFUND-CAMPAIGN-ROUTING",
      "The campaign sequence remains useful archive depth while the site keeps the hiring argument concise."
    ],
    [
      "PUB-KCSPACESFUND-VISIBLE-REACTION-FLOOR",
      "CLM-KCSPACESFUND-VISIBLE-REACTION-FLOOR",
      "Mutable reactions remain archive context rather than a reach or impact claim."
    ]
  ].map(([id, claimId, rationale]) => ({
    id,
    claimId,
    decision: "reserve" as const,
    audiences: ["future editors", "archival researchers"],
    surfaces: [
      "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts"
    ],
    rationale,
    decidedAt: "2026-07-14"
  }))
] satisfies PublicationDecision[];

export const kcSpacesFundFacebookProofCoverage = [] satisfies ProofCoverage[];
