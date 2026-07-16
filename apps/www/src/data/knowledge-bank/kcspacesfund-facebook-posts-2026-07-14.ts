import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const facebookIntakeId = "INTAKE-KCSPACES-FACEBOOK-POST-CENSUS-2026";
const namingIntakeId = "INTAKE-KCSPACES-NAMING-ROLE-MEMORY-2026";

export const kcSpacesFundFacebookPostCensus = {
  observedAt: "2026-07-14",
  page: "https://www.facebook.com/KCSpacesFund/",
  traversal: {
    authenticatedTerminalTraversals: 1,
    terminalScrollsWithoutAddition: 40,
    surfacedPostAndRemnantRecords: 38,
    recoveredRange: "2020-04-07 through 2020-07-09",
    readableCampaignMessages: 19,
    interfaceOrUnavailableRemnants: 19,
    humanPublisherAttribution: "not-exposed"
  },
  forms: {
    originalMediaPost: 20,
    statusUpdateRemnant: 11,
    unavailableAttachmentRemnant: 5,
    videoOrGifRoute: 2
  },
  primaryThemes: {
    interfaceRemnant: 19,
    granteeRecognition: 10,
    applicationScopeAndEligibility: 5,
    applicationDeadline: 2,
    campaignLaunchAndAction: 1,
    mutualAidFundraising: 1
  },
  visibleInteractionSnapshot: {
    recordsWithVisibleReactions: 28,
    reactions: 119,
    recordsWithVisibleComments: 4,
    comments: 4,
    recordsWithVisibleShares: 15,
    shares: 50
  },
  destinationInventory: {
    campaignSiteOccurrences: 17,
    mutualAidPrintFundraiserOccurrences: 4,
    goFundMeOccurrences: 1,
    normalizedPublicRoutes: 3
  },
  namedGranteeRecognitionRecords: 10,
  completenessStatement:
    "Every post or remnant surfaced by the surviving July 2026 Page timeline received a public-safe disposition after 40 terminal scrolls without additions. This is not a native Meta export, deletion history, or proof that no historical post is missing.",
  publicLedger: "docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json",
  publicRouteLedger:
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-route-ledger.json"
} as const;

export const kcSpacesFundFacebookPostIntake = [
  {
    id: facebookIntakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population archival-production pass over the surviving KC Spaces Fund Facebook Page-post surface, with aggregate-safe dispositions, public-operation patterns, grantee-recognition counts, posted routes, mutable response floors, and explicit authorship limits.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    sourceUrl: "https://www.facebook.com/KCSpacesFund/",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: [
      "SRC-FACEBOOK-KCSPACES-PAGE-2026",
      "SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
      "SRC-FACEBOOK-KCSPACES-VULPES-RECOGNITION-2020",
      "SRC-FACEBOOK-KCSPACES-APPLICATION-DEADLINE-2020",
      "SRC-FACEBOOK-KCSPACES-FIRST-ROUND-2020"
    ],
    claimIds: [
      "CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION",
      "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY"
    ],
    researchTaskIds: [
      "TASK-KCSPACES-FACEBOOK-POST-CENSUS",
      "TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"
    ],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: namingIntakeId,
    receivedAt: "2026-07-14",
    kind: "public-memory",
    publicSafeSummary:
      "Jamie recalls supporting selection of the KC Spaces Fund name so a consistent project identity was available across social platforms and domain names; the role claim remains research-stage pending creation records and collaborator corroboration.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-KCSPACES-NAMING-AND-IDENTITY-ROLE-SEED"],
    researchTaskIds: ["TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-KCSPACES-CAMPAIGN-SITE-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Live KC Spaces Fund campaign site documenting donation, application, join, and contact pathways and linking the uniform project identity across public platforms.",
    submittedBy: "Codex public-source review",
    sourceUrl: "https://kcspacesfund.com/",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-KCSPACES-CAMPAIGN-SITE-2026"],
    claimIds: [
      "CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION",
      "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY"
    ],
    researchTaskIds: [
      "TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE",
      "TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"
    ],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCSPACES-GOFUNDME-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Public KC Spaces Fund GoFundMe record documenting the fundraiser result, named organizers, fiscal-sponsor context, eligibility, and rolling-grant process.",
    submittedBy: "Codex public-source review",
    sourceUrl: "https://www.gofundme.com/f/kcspacesfund",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-KCSPACES-GOFUNDME-2020"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Archived Oddities Prints Mutual Aid Print Edition storefront documenting a partner fundraising route for KC Spaces Fund.",
    submittedBy: "Codex public-source review",
    sourceUrl:
      "https://web.archive.org/web/20200528023922/http://www.odditiesprints.com/covid-19-fundraiser",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCSPACES-KANSAS-CITY-STAR-2020",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Kansas City Star COVID-19 help guide listing KC Spaces Fund among support routes for artists and artisans.",
    submittedBy: "Codex public-source review",
    sourceUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-KANSAS-CITY-STAR-KCSPACES-2020"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const kcSpacesFundFacebookPostSources = [
  {
    id: "SRC-FACEBOOK-KCSPACES-PAGE-2026",
    title: "KC Spaces Fund Facebook Page",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund Facebook Page and surviving public post surface, authenticated review, July 14, 2026.",
    publicNote:
      "The Page identifies KC Spaces Fund as supporting grassroots arts and culture spaces during COVID-19 and links the fundraiser. Page identity does not reveal the human author of each post.",
    intakeIds: [facebookIntakeId],
    supportsGenerally: [
      "the public KC Spaces Fund Page identity",
      "the surviving public post surface",
      "the Facebook route using KCSpacesFund"
    ],
    doesNotEstablish: [
      "a native Meta export or deletion history",
      "Jamie as a stakeholder, organizer, Page owner, administrator, or post author",
      "historical reach, adoption, causality, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
    title: "KC Spaces Fund Facebook Page-post population accounting run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata from a July 2026 census of the surviving KC Spaces Fund Facebook Page-post surface.",
    publicNote:
      "The repository retains aggregate accounting and a redacted 38-record disposition ledger. Raw post text, comments, names inside engagement data, per-record metrics, unstable action links, authentication material, and manager state remain protected.",
    intakeIds: [facebookIntakeId],
    protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "38 surfaced post or remnant records",
      "40 terminal scrolls without additions",
      "19 readable campaign messages and 19 interface or unavailable remnants",
      "10 named grantee-recognition records",
      "119 reactions, 4 comments, and 50 shares as dated visible floors",
      "three normalized public destination families"
    ],
    doesNotEstablish: [
      "that no historical post was deleted, hidden, or made unavailable",
      "individual human authorship, Page ownership, or administrator chronology",
      "a complete grant ledger or applicant population",
      "historical analytics, unique people, reach, endorsement, conversion, policy influence, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-KCSPACES-VULPES-RECOGNITION-2020",
    title: "KC Spaces Fund Vulpes Bastille grantee-recognition post",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/photo/?fbid=153638726296561",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund public Facebook post recognizing Vulpes Bastille and routing supporters to the campaign site and mutual-aid print fundraiser.",
    intakeIds: [facebookIntakeId],
    supportsGenerally: [
      "a named grantee-recognition practice",
      "continued donation and print-fundraiser calls"
    ],
    doesNotEstablish: [
      "a complete grantee ledger",
      "Jamie as the post author or grant decision-maker",
      "fundraising causation"
    ]
  },
  {
    id: "SRC-FACEBOOK-KCSPACES-APPLICATION-DEADLINE-2020",
    title: "KC Spaces Fund application-deadline post",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/photo/?fbid=139689317691502",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund public Facebook post routing Kansas City and Lawrence grassroots arts and culture spaces to the application pathway.",
    intakeIds: [facebookIntakeId],
    supportsGenerally: ["public application routing", "Kansas City and Lawrence scope"],
    doesNotEstablish: [
      "that every eligible space saw or used the route",
      "Jamie as the post author, applicant reviewer, or grant decision-maker"
    ]
  },
  {
    id: "SRC-FACEBOOK-KCSPACES-FIRST-ROUND-2020",
    title: "KC Spaces Fund first-round grantee-recognition post",
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/photo/?fbid=121726656154435",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund public Facebook post announcing that a first round of emergency-relief grants was on its way.",
    intakeIds: [facebookIntakeId],
    supportsGenerally: ["public first-round funding communication"],
    doesNotEstablish: [
      "a complete payment or grant ledger",
      "Jamie as the post author, fundraiser, or grant decision-maker"
    ]
  },
  {
    id: "SRC-KCSPACES-CAMPAIGN-SITE-2026",
    title: "KC Spaces Fund campaign site",
    organization: "KC Spaces Fund",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://kcspacesfund.com/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund campaign site with donation, application, join, contact, Facebook, X, and Instagram routes.",
    publicNote:
      "The current site preserves the public campaign surface. Its continued availability does not establish present-day grant operations.",
    intakeIds: ["INTAKE-KCSPACES-CAMPAIGN-SITE-2026"],
    supportsGenerally: [
      "donation, application, join, and contact pathways",
      "KCSpacesFund identity routes on Facebook, X, and Instagram",
      "kcspacesfund.com as the project domain"
    ],
    doesNotEstablish: [
      "current grant availability",
      "Jamie's naming contribution",
      "organizer, fundraiser, or grant-decision credit"
    ]
  },
  {
    id: "SRC-KCSPACES-GOFUNDME-2020",
    title: "KC Spaces Fund Amid COVID19 fundraiser",
    organization: "KC Spaces Fund / Allied Media Projects",
    author: "Kendell Harbin for Allied Media Projects Inc.",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.gofundme.com/f/kcspacesfund",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Spaces Fund GoFundMe record showing $9,590 raised against a $9,500 goal from 107 donations.",
    publicNote:
      "The fundraiser names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as current organizers and Allied Media Projects as fiscal sponsor.",
    intakeIds: ["INTAKE-KCSPACES-GOFUNDME-2026"],
    supportsGenerally: [
      "$9,590 raised against a $9,500 goal",
      "107 donations",
      "emergency grants up to $500",
      "rolling allocation from April through June as funding allowed",
      "named organizer and fiscal-sponsor context"
    ],
    doesNotEstablish: [
      "that Jamie organized or owned the fundraiser",
      "that Jamie made grant decisions",
      "which digital surface caused a donation",
      "the complete disbursement ledger"
    ]
  },
  {
    id: "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
    title: "Oddities Prints COVID-19 Mutual Aid Print Editions",
    organization: "Oddities Prints",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: "2026-07-14",
    archiveUrl:
      "https://web.archive.org/web/20200528023922/http://www.odditiesprints.com/covid-19-fundraiser",
    preferredPublicUrl: "archive",
    publicCitation:
      "May 28, 2020, archived capture of the Oddities Prints Mutual Aid Print Edition storefront benefiting KC Spaces Fund.",
    publicNote:
      "The captured storefront presents 17 print editions and states that $10 from each $30 print purchase was donated to KC Spaces Fund, with another $10 going to the artist.",
    intakeIds: ["INTAKE-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2026"],
    supportsGenerally: [
      "a 17-edition partner fundraising storefront",
      "a stated $10-per-$30-print contribution to KC Spaces Fund",
      "a separate $10 artist payment"
    ],
    doesNotEstablish: [
      "the number of prints sold or total funds transferred",
      "Jamie as the storefront operator or artist coordinator",
      "that Facebook caused print purchases"
    ]
  },
  {
    id: "SRC-KANSAS-CITY-STAR-KCSPACES-2020",
    title: "Your money, your blood, your time: How to help Kansas City during COVID-19 crisis",
    author: "Dan Kelly",
    organization: "The Kansas City Star",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-07",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kansascity.com/news/coronavirus/article241807581.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Dan Kelly, Kansas City Star COVID-19 help guide, updated April 10, 2020.",
    publicNote:
      "The guide lists KC Spaces Fund and kcspacesfund.com under 'Support artists and artisans.'",
    intakeIds: ["INTAKE-KCSPACES-KANSAS-CITY-STAR-2020"],
    supportsGenerally: [
      "independent inclusion in a Kansas City COVID-19 help guide",
      "placement under support for artists and artisans"
    ],
    doesNotEstablish: [
      "editorial endorsement or measured readership",
      "fundraising conversion or campaign impact",
      "Jamie's role"
    ]
  }
] satisfies SourceRecord[];

export const kcSpacesFundFacebookPostReadings = [
  {
    id: "READ-FACEBOOK-KCSPACES-PAGE-2026",
    sourceId: "SRC-FACEBOOK-KCSPACES-PAGE-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-KCSPACES-PAGE-IDENTITY",
        text: "The public Facebook Page uses the KC Spaces Fund name and KCSpacesFund route and describes a COVID-19 support purpose for grassroots arts and culture spaces.",
        relationToJamie: "collective-role",
        supportTags: ["kcspaces-facebook-public-identity"],
        confidence: "high",
        locator: "Page header and public description"
      }
    ],
    limitations: [
      "The Page does not establish Jamie's role in choosing the name, Page ownership, administrator chronology, or individual post authorship."
    ],
    researchTaskIds: ["TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE"]
  },
  {
    id: "READ-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
    sourceId: "SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-KCSPACES-POPULATION-38",
        text: "The authenticated terminal traversal dispositioned 38 surfaced post or remnant records spanning April 7 through July 9, 2020, and reached 40 consecutive terminal scrolls without additions.",
        relationToJamie: "project-context",
        supportTags: ["kcspaces-facebook-population-38"],
        confidence: "high",
        locator: "Terminal population control and public-safe ledger"
      },
      {
        id: "PROP-FACEBOOK-KCSPACES-READABLE-AND-GRANTEE-PATTERN",
        text: "Nineteen records retained readable campaign messages, including 10 named grantee-recognition records; 19 additional records survive only as interface or unavailable-content remnants.",
        relationToJamie: "outcome-context",
        supportTags: [
          "kcspaces-facebook-readable-19",
          "kcspaces-facebook-ten-grantee-recognition"
        ],
        confidence: "high",
        locator: "Record dispositions and theme accounting"
      },
      {
        id: "PROP-FACEBOOK-KCSPACES-VISIBLE-RESPONSE-FLOOR",
        text: "The July 14, 2026, interface retained visible floors of 119 reactions, 4 comments, and 50 shares across the recovered records.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-facebook-visible-response-floor"],
        confidence: "high",
        locator: "Dated visible-interface aggregation"
      },
      {
        id: "PROP-FACEBOOK-KCSPACES-ROUTE-PATTERN",
        text: "Readable Page records repeatedly routed people to the campaign site, the GoFundMe, and the Oddities Prints mutual-aid fundraiser.",
        relationToJamie: "project-context",
        supportTags: ["kcspaces-facebook-three-route-families"],
        confidence: "high",
        locator: "Normalized destination-family inventory"
      }
    ],
    limitations: [
      "The census is not a native Meta export and cannot account for deleted, hidden, unavailable, or differently permissioned records.",
      "Nineteen records lack readable campaign text and remain dispositioned without inferred content.",
      "Page identity does not reveal the human publisher or author.",
      "Mutable response counters do not establish historical analytics, unique people, reach, conversion, endorsement, causality, or impact."
    ],
    researchTaskIds: ["TASK-KCSPACES-FACEBOOK-POST-CENSUS"]
  },
  {
    id: "READ-FACEBOOK-KCSPACES-VULPES-RECOGNITION-2020",
    sourceId: "SRC-FACEBOOK-KCSPACES-VULPES-RECOGNITION-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-KCSPACES-NAMED-GRANTEE-ROUTING",
        text: "A surviving Page post recognizes Vulpes Bastille and directs readers to donate or buy a mutual-aid print.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-facebook-public-grantee-routing"],
        confidence: "high",
        locator: "Public post text"
      }
    ],
    limitations: [
      "One post does not establish the complete grantee population, payment completion, post author, or fundraising causation."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-KCSPACES-APPLICATION-DEADLINE-2020",
    sourceId: "SRC-FACEBOOK-KCSPACES-APPLICATION-DEADLINE-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-KCSPACES-APPLICATION-ROUTE",
        text: "A surviving Page post directs grassroots arts and culture spaces in Kansas City and Lawrence to apply through kcspacesfund.com.",
        relationToJamie: "project-context",
        supportTags: ["kcspaces-facebook-public-application-route"],
        confidence: "high",
        locator: "Public post text"
      }
    ],
    limitations: [
      "The post does not establish application volume, applicant eligibility, grant decisions, or individual post authorship."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-KCSPACES-FIRST-ROUND-2020",
    sourceId: "SRC-FACEBOOK-KCSPACES-FIRST-ROUND-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-KCSPACES-FIRST-ROUND-COMMUNICATION",
        text: "A surviving Page post announces that a first round of emergency-relief grants was on its way.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-facebook-public-funding-announcement"],
        confidence: "high",
        locator: "Public post text"
      }
    ],
    limitations: [
      "The wording is public campaign communication, not a complete payment ledger or evidence of Jamie's role in fundraising, allocation, or post authorship."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-KCSPACES-CAMPAIGN-SITE-2026",
    sourceId: "SRC-KCSPACES-CAMPAIGN-SITE-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KCSPACES-CAMPAIGN-SITE-ACTION-PATHWAYS",
        text: "The campaign site exposes donation, application, join, and contact pathways for a mutual-aid effort supporting grassroots arts and culture spaces.",
        relationToJamie: "project-context",
        supportTags: ["kcspaces-public-action-pathways"],
        confidence: "high",
        locator: "Homepage navigation and project sections"
      },
      {
        id: "PROP-KCSPACES-UNIFORM-PUBLIC-ROUTES",
        text: "The public campaign surface uses kcspacesfund.com and links matching KCSpacesFund identities on Facebook, X, and Instagram.",
        relationToJamie: "project-context",
        supportTags: ["kcspaces-uniform-public-identity-result"],
        confidence: "high",
        locator: "Domain and social navigation"
      }
    ],
    limitations: [
      "The surviving public routes establish the resulting identity system, not who selected the name or created each account.",
      "The current site does not establish present-day grant availability."
    ],
    researchTaskIds: ["TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE"]
  },
  {
    id: "READ-KCSPACES-GOFUNDME-2020",
    sourceId: "SRC-KCSPACES-GOFUNDME-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KCSPACES-GOFUNDME-RESULT",
        text: "The public fundraiser shows $9,590 raised against a $9,500 goal from 107 donations.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-public-fundraiser-result"],
        confidence: "high",
        locator: "Fundraiser progress and donation count"
      },
      {
        id: "PROP-KCSPACES-GOFUNDME-ORGANIZER-BOUNDARY",
        text: "The fundraiser identifies Kendell Harbin for Allied Media Projects Inc. and names Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo as current organizers.",
        relationToJamie: "limitation",
        supportTags: ["kcspaces-named-organizer-boundary"],
        confidence: "high",
        locator: "Organizer and campaign Q&A sections"
      }
    ],
    limitations: [
      "The fundraiser does not identify Jamie as an organizer, fundraiser owner, fiscal sponsor, grant decision-maker, or cause of donations.",
      "The public result is not a complete disbursement ledger."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
    sourceId: "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KCSPACES-ODDITIES-SEVENTEEN-PRINTS",
        text: "The May 28, 2020, archived storefront presents 17 Mutual Aid Print Editions and states that $10 from each $30 purchase went to KC Spaces Fund while $10 went to the artist.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-partner-print-fundraiser"],
        confidence: "high",
        locator: "Product grid and collection footer"
      }
    ],
    limitations: [
      "The storefront does not establish sales volume, total transferred funds, Facebook conversion, or Jamie's role in producing the print series."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-KANSAS-CITY-STAR-KCSPACES-2020",
    sourceId: "SRC-KANSAS-CITY-STAR-KCSPACES-2020",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KANSAS-CITY-STAR-KCSPACES-RESOURCE-LISTING",
        text: "The Kansas City Star listed KC Spaces Fund and kcspacesfund.com under 'Support artists and artisans' in its April 2020 COVID-19 help guide.",
        relationToJamie: "outcome-context",
        supportTags: ["kcspaces-independent-resource-listing"],
        confidence: "high",
        locator: "Support artists and artisans section"
      }
    ],
    limitations: [
      "A resource-guide listing does not establish endorsement, readership, fundraising conversion, project impact, or Jamie's role."
    ],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const kcSpacesFundFacebookPostClaims = [
  {
    id: "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY",
    project: "kc-spaces-fund",
    internalClaim:
      "The resulting public project identity appears uniformly as KC Spaces Fund or KCSpacesFund across kcspacesfund.com, Facebook, X, and Instagram.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [facebookIntakeId, "INTAKE-KCSPACES-CAMPAIGN-SITE-2026"],
    requiredSupportTags: [
      "kcspaces-uniform-public-identity-result",
      "kcspaces-facebook-public-identity",
      "x-profile-kcspaces-2026-identity"
    ],
    composition: {
      action:
        "The project established one legible KC Spaces Fund identity across its domain and principal social routes.",
      intendedEnd:
        "Give supporters and applicants a consistent way to find the emergency-relief campaign across platforms.",
      usableResult:
        "The surviving campaign site links kcspacesfund.com with matching KCSpacesFund identities on Facebook, X, and Instagram.",
      audience:
        "Future editors evaluating project-identity consistency and the context for Jamie's digital-operations contribution.",
      collectiveCredit:
        "This claim describes the resulting collective project identity and does not assign naming or account-creation credit to Jamie or any organizer.",
      causalBoundary:
        "Uniform surviving routes do not establish who selected the name, registered the domain, created each account, administered the accounts, or authored posts."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KCSPACES-CAMPAIGN-SITE-2026",
        relationship: "direct-support",
        supports: ["the uniform domain and linked social identity result"],
        propositionIds: ["PROP-KCSPACES-UNIFORM-PUBLIC-ROUTES"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-KCSPACES-PAGE-2026",
        relationship: "corroborating",
        supports: ["the Facebook KCSpacesFund identity"],
        propositionIds: ["PROP-FACEBOOK-KCSPACES-PAGE-IDENTITY"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-PROFILE-KCSPACES-2026",
        relationship: "corroborating",
        supports: ["the X KCSpacesFund identity"],
        propositionIds: ["PROP-X-PROFILE-KCSPACES-2026-IDENTITY"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Keep the proven uniform public identity separate from Jamie's research-stage naming contribution."
    ],
    antiClaims: [
      "Jamie alone named KC Spaces Fund.",
      "Jamie created or administered every project account.",
      "A uniform handle proves individual authorship or campaign impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source and identity review"]
  },
  {
    id: "CLM-KCSPACES-NAMING-AND-IDENTITY-ROLE-SEED",
    project: "kc-spaces-fund",
    internalClaim:
      "Jamie recalls supporting selection of the KC Spaces Fund name so the project could use a uniform identity across social platforms and domain names.",
    status: "researching",
    maturity: "researching",
    intakeIds: [namingIntakeId],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: [
      "This is Jamie's first-person memory, not yet a collaborator-confirmed or creation-record-backed role claim.",
      "The public routes prove the resulting uniform identity but not Jamie's contribution to selecting it."
    ],
    antiClaims: [
      "Jamie alone named the project.",
      "Jamie was the project stakeholder or owner posting on the Facebook Page.",
      "Jamie authored every KC Spaces Fund social post."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart memory intake", "Codex archival triage"]
  }
] satisfies ClaimRecord[];

export const kcSpacesFundFacebookPostResearchTasks = [
  {
    id: "TASK-KCSPACES-FACEBOOK-POST-CENSUS",
    project: "kc-spaces-fund",
    question:
      "Has every record surfaced by the surviving KC Spaces Fund Facebook Page timeline received a public-safe disposition?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [facebookIntakeId],
    sourceIds: ["SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    nextActions: [
      "Preserve the denominator and terminal condition in tests.",
      "Re-run only if Meta exposes a native export or a materially different public population."
    ],
    resolutionSummary:
      "A terminal authenticated traversal dispositioned all 38 surfaced post or remnant records and stopped after 40 consecutive scrolls without additions."
  },
  {
    id: "TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE",
    project: "kc-spaces-fund",
    question:
      "What creation records and collaborator accounts establish Jamie's precise contribution to selecting a uniformly available KC Spaces Fund name and public identity?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [namingIntakeId, "INTAKE-KCSPACES-CAMPAIGN-SITE-2026"],
    sourceIds: [
      "SRC-KCSPACES-CAMPAIGN-SITE-2026",
      "SRC-FACEBOOK-KCSPACES-PAGE-2026",
      "SRC-X-PROFILE-KCSPACES-2026",
      "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"
    ],
    claimIds: [
      "CLM-KCSPACES-NAMING-AND-IDENTITY-ROLE-SEED",
      "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY"
    ],
    nextActions: [
      "Recover the earliest public-safe name brainstorming, domain-search, registration, and account-creation chronology.",
      "Request proof notes from named organizers about Jamie's naming and identity-infrastructure contribution.",
      "Separate name selection, availability research, domain registration, account creation, administration, and individual post authorship."
    ]
  }
] satisfies ResearchTask[];

export const kcSpacesFundFacebookPostInquiries = [
  {
    id: "INQ-KCSPACES-FACEBOOK-POST-CENSUS-2026",
    project: "kc-spaces-fund",
    question:
      "What does the full surviving KC Spaces Fund Facebook Page surface establish about public operations, grantee recognition, routes, response signals, and role boundaries?",
    methods: [
      "Authenticated top-to-bottom Page traversal with a 40-scroll terminal condition",
      "Record-level form, readability, primary-theme, stakeholder, route, and visible-response classification",
      "Independent verification of the campaign site, GoFundMe, archived Oddities Prints route, and Kansas City Star coverage",
      "Separation of Page identity, named organizers, Jamie's digital-infrastructure role, and Jamie's naming-role memory"
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Thirty-eight surfaced post or remnant records received public-safe dispositions after a terminal traversal.",
      "Nineteen records retain readable campaign messages, including 10 named grantee-recognition records; 19 remain interface or unavailable-content remnants.",
      "The Page routes supporters and applicants among the campaign site, GoFundMe, and an Oddities Prints mutual-aid fundraiser.",
      "The public fundraiser shows $9,590 raised against a $9,500 goal from 107 donations and preserves named organizer and fiscal-sponsor credit.",
      "The Kansas City Star listed KC Spaces Fund under support for artists and artisans.",
      "The resulting KCSpacesFund identity is uniform across the domain, Facebook, X, and Instagram routes."
    ],
    limitations: [
      "The public interface is not a native Meta export or deletion history.",
      "Nineteen records do not retain enough readable text for content reconstruction.",
      "Page identity does not expose the human author, publisher, owner, or administrator.",
      "Visible responses are mutable floors and do not establish historical reach, endorsement, conversion, causality, or impact.",
      "The resulting uniform identity does not itself establish Jamie's naming contribution."
    ],
    sourceIds: [
      "SRC-FACEBOOK-KCSPACES-PAGE-2026",
      "SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
      "SRC-KCSPACES-CAMPAIGN-SITE-2026",
      "SRC-KCSPACES-GOFUNDME-2020",
      "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
      "SRC-KANSAS-CITY-STAR-KCSPACES-2020"
    ],
    publicSummary:
      "The full surviving observed Page surface documents a short, concentrated mutual-aid campaign that routed applications, donations, partner fundraising, and named grantee recognition while preserving named-organizer credit and Jamie's separate digital-infrastructure boundary.",
    protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

export const kcSpacesFundFacebookPostDecisions = [
  {
    id: "DEC-DEFER-KCSPACES-UNIFORM-PUBLIC-IDENTITY-FACEBOOK-2026",
    claimId: "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale:
      "The uniform public identity is source-backed reserve knowledge, but Jamie's contribution to selecting it remains a separate research-stage claim and should not be projected by implication.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ProjectionDecision[];
