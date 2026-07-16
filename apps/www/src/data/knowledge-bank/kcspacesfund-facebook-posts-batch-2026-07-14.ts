import type { KnowledgeBank } from "./schema.ts";

type KcSpacesFundFacebookPostsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

export const kcSpacesFundFacebookPostAudit = {
  observedAt: "2026-07-14",
  page: "https://www.facebook.com/KCSpacesFund/",
  survivingPublicPopulation: {
    surfacedPostAndRemnantRecords: 38,
    recoveredRange: "2020-04-07 through 2020-07-09",
    authenticatedTerminalTraversals: 1,
    terminalScrollsWithoutAddition: 40,
    readableCampaignMessages: 19,
    interfaceOrUnavailableRemnants: 19
  },
  forms: {
    originalMediaPosts: 20,
    statusUpdateRemnants: 11,
    unavailableAttachmentRemnants: 5,
    videoOrGifRoutes: 2
  },
  primaryThemes: {
    interfaceRemnants: 19,
    granteeRecognition: 10,
    applicationScopeAndEligibility: 5,
    applicationDeadlines: 2,
    campaignLaunchAndAction: 1,
    mutualAidFundraising: 1
  },
  postedRouteOccurrences: {
    campaignSite: 17,
    mutualAidPrintFundraiser: 4,
    goFundMe: 1
  },
  visibleInteractionFloor: {
    recordsWithReactions: 28,
    reactions: 119,
    comments: 4,
    shares: 50
  },
  publicLedger:
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json",
  publicRouteLedger:
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-route-ledger.json",
  researchReport:
    "docs/knowledge-bank/research/kcspacesfund-facebook-posts-2026-07-14.md"
} as const;

export const kcSpacesFundFacebookPostsBatch = {
  intakeRecords: [
    {
      id: "INTAKE-2026-07-14-KCSPACES-FACEBOOK-POST-POPULATION",
      receivedAt: "2026-07-14",
      kind: "artifact",
      project: "kc-spaces-fund",
      publicSummary:
        "A terminal authenticated pass dispositioned all 38 post or remnant records exposed by the surviving KC Spaces Fund Facebook Page surface and separated campaign routing, mutable interaction floors, collective credit, and Jamie's bounded digital-operations role.",
      privacy: "public-safe-summary",
      status: "claim-linked",
      sourceIds: [
        "SRC-KCSPACES-FACEBOOK-PAGE-2026",
        "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
        "SRC-KCSPACES-FACEBOOK-POST-LEDGER-2026",
        "SRC-KCSPACES-FACEBOOK-ROUTE-LEDGER-2026",
        "SRC-KCSPACES-CAMPAIGN-SITE-2026",
        "SRC-KCSPACES-GOFUNDME-2020",
        "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
        "SRC-KANSAS-CITY-STAR-KCSPACES-2020"
      ],
      claimIds: [
        "CLM-KCSPACES-FACEBOOK-SURVIVING-PUBLIC-POPULATION",
        "CLM-KCSPACES-FACEBOOK-CAMPAIGN-ROUTING",
        "CLM-KCSPACES-FACEBOOK-VISIBLE-INTERACTION-FLOOR",
        "CLM-KCSPACES-INDEPENDENT-RESOURCE-VISIBILITY"
      ],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POSTS-2026"],
      projectionIntent: "bank-only",
      nextActions: [
        "Reconcile an authorized Meta export or historical Page backup against the 38-record surviving-public control if one becomes available.",
        "Keep mutable interaction counters out of reach, endorsement, conversion, or impact claims.",
        "Research press coverage separately; no article route recovered from this Page does not mean no coverage existed."
      ],
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "INTAKE-2026-07-15-KCSPACES-NAMING-ROLE-CORRECTION",
      receivedAt: "2026-07-15",
      kind: "correction",
      project: "kc-spaces-fund",
      publicSummary:
        "Jamie confirms that he supported website creation, digital operations, and selection of a project name available consistently across social platforms and domain names; he was not the stakeholder or owner posting on the Facebook Page.",
      privacy: "public-safe-summary",
      status: "claim-linked",
      sourceIds: [
        "SRC-JAMIE-KCSPACES-ROLE-CORRECTION-2026",
        "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-REVIEW-2026",
        "SRC-KCSPACES-FACEBOOK-PAGE-2026",
        "SRC-KCSPACES-CAMPAIGN-SITE-2026",
        "SRC-KCSPACES-GOFUNDME-2020"
      ],
      claimIds: ["CLM-KCSPACES-DIGITAL-IDENTITY-SUPPORT"],
      researchInquiryIds: ["INQ-KCSPACES-NAMING-ROLE-2026"],
      projectionIntent: "candidate-for-public-surface",
      nextActions: [
        "Seek creation chronology or collaborator confirmation before expanding bounded naming support into sole naming authorship, account ownership, or campaign leadership.",
        "Preserve named-organizer, fundraiser, fiscal-sponsor, grant-decision, campaign-voice, and individual-post credit."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    }
  ],
  sources: [
    {
      id: "SRC-KCSPACES-FACEBOOK-PAGE-2026",
      title: "KC Spaces Fund public Facebook Page",
      organization: "KC Spaces Fund",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "KC Spaces Fund public Facebook Page, authenticated review, July 15, 2026.",
      publicNote:
        "The Page identifies the campaign as supporting grassroots arts and culture spaces during COVID-19, displays the KCSpacesFund identity, and routes to the fundraiser. It does not expose the human publisher of each post.",
      supportsGenerally: [
        "the public Page identity and mission line",
        "the surviving public post surface",
        "the Facebook use of the KCSpacesFund project string",
        "the public fundraiser route"
      ],
      doesNotEstablish: [
        "a native Meta export or deletion history",
        "Jamie as Page owner, administrator, campaign voice, or post author",
        "historical reach, endorsement, conversion, causality, or impact"
      ]
    },
    {
      id: "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
      title: "KC Spaces Fund Facebook surviving-public-population run",
      organization: "Jamie Burkart portfolio research",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata from a July 2026 census of the surviving KC Spaces Fund Facebook Page surface.",
      publicNote:
        "The repository retains aggregate accounting and an aggregate-safe 38-row disposition ledger. Raw text, comments, identities, per-record metrics, unstable links, authentication material, and manager state remain protected.",
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "38 surfaced post or remnant records",
        "the April 7 through July 9, 2020 surviving range",
        "40 terminal scrolls without additions",
        "19 readable messages and 19 interface or unavailable remnants",
        "campaign themes, route floors, stakeholder-reference groups, and mutable interaction floors"
      ],
      doesNotEstablish: [
        "every historical Page post or attachment body",
        "individual publisher, drafter, administrator, or owner identity",
        "a complete grant, applicant, payment, or disbursement ledger",
        "unique people, reach, endorsement, conversion, causality, or impact"
      ]
    },
    {
      id: "SRC-KCSPACES-FACEBOOK-POST-LEDGER-2026",
      title: "KC Spaces Fund Facebook public-safe post ledger",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/25d5237a5d1a49c06c50793f965e3709a77cf50c/docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Public-safe 38-row disposition ledger for the surviving KC Spaces Fund Facebook Page surface, July 2026.",
      publicNote:
        "Each recovered row retains a stable ID, sequence, form, theme, boolean or count classification, and disposition. It excludes raw text, names, comments, per-record metrics, and authentication state.",
      supportsGenerally: [
        "complete disposition of the 38-record surviving-public control",
        "record-form and primary-theme totals",
        "aggregate-safe route and interaction accounting"
      ],
      doesNotEstablish: [
        "a lifetime post denominator",
        "the content of unavailable remnants",
        "individual human authorship or historical impact"
      ]
    },
    {
      id: "SRC-KCSPACES-FACEBOOK-ROUTE-LEDGER-2026",
      title: "KC Spaces Fund Facebook posted-route ledger",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/25d5237a5d1a49c06c50793f965e3709a77cf50c/docs/knowledge-bank/data/kcspacesfund-facebook-post-route-ledger.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Public-safe KC Spaces Fund Facebook posted-route ledger, July 2026.",
      publicNote:
        "Normalizes the campaign site, GoFundMe, and archived Oddities Prints fundraiser as three posted destination families and records occurrence floors without implying use or conversion.",
      supportsGenerally: [
        "17 campaign-site route occurrences",
        "four Oddities Prints fundraiser route occurrences",
        "one GoFundMe route occurrence"
      ],
      doesNotEstablish: [
        "click-through, readership, conversion, partnership ownership, endorsement, or impact",
        "that no other historical destination was ever posted"
      ]
    },
    {
      id: "SRC-KCSPACES-CAMPAIGN-SITE-2026",
      title: "KC Spaces Fund Amid COVID-19",
      organization: "KC Spaces Fund",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-01",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://kcspacesfund.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Spaces Fund, campaign site, accessed July 15, 2026.",
      publicNote:
        "The site exposes donation, application, join, and contact pathways under the KC Spaces Fund identity.",
      supportsGenerally: [
        "the campaign's public donation, application, join, and contact pathways",
        "the KCSpacesFund domain identity",
        "the stated priority for spaces serving BIPOC, LGBTQIA+, Disabled, and Immigrant communities"
      ],
      doesNotEstablish: [
        "individual authorship of campaign copy",
        "Jamie as organizer, fundraiser owner, or grant decision-maker",
        "application volume, disbursement completion, or campaign impact"
      ]
    },
    {
      id: "SRC-KCSPACES-GOFUNDME-2020",
      title: "KC Spaces Fund Amid COVID-19 fundraiser",
      organization: "KC Spaces Fund and Allied Media Projects",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-06",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Spaces Fund public GoFundMe campaign page.",
      publicNote:
        "The fundraiser reports $9,590 raised against a $9,500 goal from 107 donations, names the campaign organizers, and identifies Allied Media Projects as fiscal sponsor.",
      supportsGenerally: [
        "the public fundraiser result",
        "emergency-relief grants up to $500",
        "named-organizer and fiscal-sponsor credit",
        "the same KCSpacesFund project string used across public routes"
      ],
      doesNotEstablish: [
        "Jamie as organizer, fundraiser owner, fiscal sponsor, or grant decision-maker",
        "Facebook conversion or causality",
        "a complete grant-payment ledger"
      ]
    },
    {
      id: "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
      title: "Oddities Prints Mutual Aid Print Editions",
      organization: "Oddities Prints",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2020-05-28",
      accessedAt: "2026-07-15",
      archiveUrl:
        "https://web.archive.org/web/20200528023922/http://www.odditiesprints.com/covid-19-fundraiser",
      preferredPublicUrl: "archive",
      publicCitation:
        "Oddities Prints, Mutual Aid Print Editions, archived May 28, 2020.",
      publicNote:
        "The archived collection describes 17 print editions and a per-print allocation benefiting KC Spaces Fund, participating artists, and production and fulfillment.",
      supportsGenerally: [
        "a partner print-fundraising mechanism",
        "a 17-edition artist network",
        "the stated per-print allocation model"
      ],
      doesNotEstablish: [
        "sales volume or total funds transferred",
        "Facebook conversion",
        "Jamie's role in producing the print series"
      ]
    },
    {
      id: "SRC-KANSAS-CITY-STAR-KCSPACES-2020",
      title: "Your money, your blood, your time: How to help Kansas City during COVID-19 crisis",
      organization: "The Kansas City Star",
      author: "Dan Kelly",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-07",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.kansascity.com/news/coronavirus/article241807581.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Dan Kelly, 'Your money, your blood, your time: How to help Kansas City during COVID-19 crisis,' The Kansas City Star, April 7, 2020.",
      publicNote:
        "The resource guide lists KC Spaces Fund and kcspacesfund.com under support for artists and artisans.",
      supportsGenerally: [
        "independent resource-guide visibility for KC Spaces Fund",
        "the public relationship between the campaign name and domain"
      ],
      doesNotEstablish: [
        "endorsement, readership, fundraising conversion, or campaign impact",
        "Jamie's individual role"
      ]
    },
    {
      id: "SRC-JAMIE-KCSPACES-ROLE-CORRECTION-2026",
      title: "Jamie Burkart KC Spaces Fund role correction",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      publicCitation:
        "Jamie Burkart first-person KC Spaces Fund role clarification, July 2026.",
      publicNote:
        "Jamie confirms website, digital-operations, and cross-channel naming support while disclaiming stakeholder ownership and Facebook posting responsibility.",
      protectedLocatorId: "CONFIRMATION-KCSPACES-ROLE-2026-001",
      supportsGenerally: [
        "Jamie's support for website creation and digital operations",
        "Jamie's support for choosing a project name available across social and domain surfaces",
        "the boundary that Jamie was not the stakeholder or owner posting on the Page"
      ],
      doesNotEstablish: [
        "sole naming authorship, account ownership, or campaign leadership",
        "authorship or publication of any Facebook post",
        "organizer, fundraiser, fiscal-sponsor, or grant-decision authority"
      ]
    },
    {
      id: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-REVIEW-2026",
      title: "KC Spaces Fund digital-infrastructure archival review",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-09",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe summary of a July 2026 archival review of KC Spaces Fund digital infrastructure.",
      publicNote:
        "The review covers a website-template launch assignment, Jamie-authored Ghost site, campaign-theme and fundraising-widget Git history, deployment, and public-safe domain continuity without publishing private project records.",
      protectedLocatorId: "ARCHIVE-KCSPACES-DIGITAL-INFRASTRUCTURE-2026-001",
      supportsGenerally: [
        "Jamie's campaign website and theme implementation",
        "Jamie's fundraising-widget and deployment work",
        "behind-the-scenes digital infrastructure and platform continuity"
      ],
      doesNotEstablish: [
        "Jamie as public organizer, campaign owner, fundraiser owner, or grant decision-maker",
        "Jamie's sole naming authorship",
        "permission to publish private project, applicant, donor, subscriber, or payment records"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KCSPACES-FACEBOOK-SURVIVING-PUBLIC-POPULATION",
      project: "kc-spaces-fund",
      internalClaim:
        "An authenticated terminal traversal dispositioned all 38 post or remnant records exposed by the surviving KC Spaces Fund Facebook Page surface from April 7 through July 9, 2020.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The surviving July 2026 Page surface exposed 38 post or remnant records from April through July 2020; every surfaced row received a public-safe disposition.",
          status: "active",
          citationRequired: false,
          surfaces: [
            "docs/knowledge-bank/research/kcspacesfund-facebook-posts-2026-07-14"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["population, date-range, terminal-condition, and row dispositions"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-POST-LEDGER-2026",
          relationship: "corroborating",
          supports: ["aggregate-safe 38-row accounting"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means 100 percent disposition coverage of the surviving observed Page surface, not a native Meta export, deletion history, or lifetime post denominator.",
        "The 19 interface or unavailable remnants are preserved without reconstructing missing content."
      ],
      antiClaims: [
        "The census contains every Facebook item ever published by KC Spaces Fund",
        "The Page published only 38 posts over its lifetime",
        "The 38 records form a native Meta export"
      ],
      proofClaimIds: [],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POSTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-KCSPACES-FACEBOOK-CAMPAIGN-ROUTING",
      project: "kc-spaces-fund",
      internalClaim:
        "Nineteen readable Page records make a campaign sequence visible across launch, applications and eligibility, fundraising, and ten grantee-recognition posts, with route floors to the campaign site, Oddities Prints fundraiser, and GoFundMe.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The surviving Page records applications and eligibility, fundraising, and ten grantee-recognition posts, with recurring routes to the campaign site, partner print fundraiser, and GoFundMe.",
          status: "active",
          citationRequired: false,
          surfaces: [
            "docs/knowledge-bank/research/kcspacesfund-facebook-posts-2026-07-14"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level theme, route, and stakeholder-reference classifications"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-ROUTE-LEDGER-2026",
          relationship: "corroborating",
          supports: ["three normalized posted destination families and occurrence floors"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
          relationship: "corroborating",
          supports: ["the partner print-fundraising mechanism"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The Page documents public communication and routing, not every campaign decision, application, grant, payment, or disbursement.",
        "Outgoing names, tags, and links do not establish inbound engagement, endorsement, partnership, or action.",
        "Posted routes do not establish readership, click-through, conversion, causality, or impact.",
        "No article route was recovered from the surviving Page surface; this does not mean the campaign received no press."
      ],
      antiClaims: [
        "The Facebook Page is a complete grant-administration record",
        "Every named stakeholder engaged with or endorsed the campaign",
        "The Page archive contains the campaign's complete press corpus"
      ],
      proofClaimIds: ["kc-spaces-fund-public-operations-timeline"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POSTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "CLM-KCSPACES-DIGITAL-IDENTITY-SUPPORT",
      project: "kc-spaces-fund",
      internalClaim:
        "Jamie supported KC Spaces Fund through website creation, behind-the-scenes digital operations, and selection of a project name available across social and domain surfaces; the collaborator-led Facebook Page used that identity consistently, while Jamie was not the stakeholder or owner posting on the account.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "technical-operations",
          text:
            "For KC Spaces Fund, Jamie reports building the campaign website and supporting a project name that worked consistently across web and social channels. A 2026 code and archive review corroborates the digital-infrastructure work; the collaborator-led Page used that shared identity to route people to applications, donations, and grantee updates.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-REVIEW-2026",
          relationship: "private-support",
          supports: ["website creation and behind-the-scenes digital infrastructure"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-JAMIE-KCSPACES-ROLE-CORRECTION-2026",
          relationship: "private-support",
          supports: ["cross-channel naming support and the non-posting boundary"],
          confidence: "high",
          roleBasis: "first-person",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-PAGE-2026",
          relationship: "corroborating",
          supports: ["the resulting public Page identity and fundraiser route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-CAMPAIGN-SITE-2026",
          relationship: "corroborating",
          supports: ["the resulting domain identity and public action pathways"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Jamie with bounded website, digital-operations, and naming support, not sole naming authorship, public organizing, fundraising ownership, grant decisions, campaign voice, or individual post authorship.",
        "The work served a collaborator-led mutual-aid campaign; public organizer and fiscal-sponsor credit remain with the people and organizations named by the campaign."
      ],
      antiClaims: [
        "Jamie organized or owned KC Spaces Fund",
        "Jamie alone named KC Spaces Fund",
        "Jamie managed or posted from the KC Spaces Fund Facebook Page",
        "Jamie ran the fundraiser or made grant decisions"
      ],
      proofClaimIds: ["kc-spaces-fund-digital-infrastructure"],
      researchInquiryIds: ["INQ-KCSPACES-NAMING-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KCSPACES-FACEBOOK-VISIBLE-INTERACTION-FLOOR",
      project: "kc-spaces-fund",
      internalClaim:
        "At the July 14, 2026 capture, the 38 surviving records displayed aggregate floors of 119 reactions, four comments, and 50 shares.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "The July 2026 interface retained aggregate floors of 119 reactions, four comments, and 50 shares across the surviving records.",
          status: "active",
          citationRequired: false,
          surfaces: [
            "docs/knowledge-bank/research/kcspacesfund-facebook-posts-2026-07-14"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["dated aggregate visible-interaction floors"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The counts are mutable interface floors, not historical peaks or analytics.",
        "They are not unique people, reach, impressions, stakeholder endorsement, application conversion, fundraising causation, or impact.",
        "Reaction and commenter identities remain protected and were not used to infer stakeholder-group engagement."
      ],
      antiClaims: [
        "KC Spaces Fund reached 119 people",
        "The visible counts measure campaign impact",
        "Named stakeholder groups endorsed the campaign"
      ],
      proofClaimIds: [],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POSTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-KCSPACES-INDEPENDENT-RESOURCE-VISIBILITY",
      project: "kc-spaces-fund",
      internalClaim:
        "The Kansas City Star's April 2020 COVID-19 resource guide listed KC Spaces Fund and kcspacesfund.com under support for artists and artisans.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The Kansas City Star listed KC Spaces Fund among COVID-19 support routes for artists and artisans in April 2020.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KANSAS-CITY-STAR-KCSPACES-2020",
          relationship: "direct-support",
          supports: ["independent resource-guide listing and campaign-domain association"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe this as independent resource-guide visibility, not endorsement, readership, conversion, or impact.",
        "The article does not establish Jamie's role."
      ],
      antiClaims: [
        "The Kansas City Star endorsed KC Spaces Fund",
        "The listing drove donations or applications",
        "The listing documents Jamie's contribution"
      ],
      proofClaimIds: [],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POSTS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Codex source review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCSPACES-FACEBOOK-POSTS-2026",
      project: "kc-spaces-fund",
      question:
        "What survives on the KC Spaces Fund Facebook Page, what mission-relevant routes and engagement patterns can it support, and which findings belong in the public-safe knowledge lifecycle?",
      methods: [
        "Used Jamie's authenticated Facebook session to traverse the public Page from the newest record to the oldest surviving record.",
        "Checkpointed item-level records outside the repository and continued until 40 terminal scrolls produced no additional record.",
        "Dispositioned all 38 surfaced rows by form, campaign function, posted destination family, stakeholder-reference group, and visible interaction floor.",
        "Close-read the campaign site, GoFundMe, archived Oddities Prints fundraiser, and Kansas City Star resource guide before promoting them as sources.",
        "Withheld raw post text, comments, identities, per-record metrics, authentication state, administrator context, and private project records."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "All 38 records exposed by the surviving Page surface received a disposition; 19 retain readable campaign messages and 19 survive as interface or unavailable remnants.",
        "Readable records make applications, eligibility, fundraising, and ten grantee-recognition communications visible.",
        "Posted route floors include 17 campaign-site occurrences, four Oddities Prints fundraiser occurrences, and one GoFundMe occurrence; no press-article route was recovered from the Page.",
        "The Kansas City Star independently listed KC Spaces Fund in an April 2020 COVID-19 resource guide for artists and artisans.",
        "Stakeholder references show public addressing and routing, not verified inbound engagement, endorsement, or action.",
        "The July 2026 interface retained aggregate floors of 119 reactions, four comments, and 50 shares."
      ],
      limitations: [
        "The surviving surface is not a native Meta export, deletion history, or lifetime post denominator.",
        "Nineteen remnants do not preserve a complete readable message or attachment body.",
        "The Page does not expose individual human publisher identity for the reviewed records.",
        "Outgoing references do not establish inbound stakeholder engagement.",
        "Visible interaction counters do not establish historical analytics, unique people, reach, endorsement, conversion, causality, or impact."
      ],
      sourceIds: [
        "SRC-KCSPACES-FACEBOOK-PAGE-2026",
        "SRC-KCSPACES-FACEBOOK-POPULATION-RUN-2026",
        "SRC-KCSPACES-FACEBOOK-POST-LEDGER-2026",
        "SRC-KCSPACES-FACEBOOK-ROUTE-LEDGER-2026",
        "SRC-KCSPACES-CAMPAIGN-SITE-2026",
        "SRC-KCSPACES-GOFUNDME-2020",
        "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
        "SRC-KANSAS-CITY-STAR-KCSPACES-2020"
      ],
      publicSummary:
        "A complete surviving-surface disposition recovered 38 Page records, an operational mutual-aid communication sequence, three posted route families, an independent resource-guide listing, and carefully bounded mutable interaction floors.",
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001"
    },
    {
      id: "INQ-KCSPACES-NAMING-ROLE-2026",
      project: "kc-spaces-fund",
      question:
        "Which records can further corroborate Jamie's support for choosing a project name available across social and domain surfaces without inflating that contribution into sole naming authorship, account ownership, or campaign leadership?",
      methods: [
        "Recorded Jamie's first-person role correction as a protected source.",
        "Compared the public Facebook Page, campaign domain, GoFundMe route, and existing digital-infrastructure review.",
        "Separated the inspectable identity result from the first-person contribution claim and from human post authorship."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Jamie directly confirms website, digital-operations, and cross-channel naming support and disclaims stakeholder ownership and Page-posting responsibility.",
        "The public Page, campaign domain, and fundraiser use the same KCSpacesFund identity.",
        "The existing archive review independently supports Jamie's website and technical-infrastructure work."
      ],
      limitations: [
        "The public routes do not identify who originated or approved the name.",
        "No name-development record, account-creation chronology, or collaborator proof note was recovered in this pass.",
        "The Page does not identify individual post publishers or administrators."
      ],
      sourceIds: [
        "SRC-JAMIE-KCSPACES-ROLE-CORRECTION-2026",
        "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-REVIEW-2026",
        "SRC-KCSPACES-FACEBOOK-PAGE-2026",
        "SRC-KCSPACES-CAMPAIGN-SITE-2026",
        "SRC-KCSPACES-GOFUNDME-2020"
      ],
      publicSummary:
        "Jamie's first-person account supports bounded cross-channel naming support; public routes corroborate the resulting identity system, while sole authorship and account-ownership questions remain open."
    }
  ]
} satisfies KcSpacesFundFacebookPostsBatch;
