import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-NYCARTC-FACEBOOK-POST-CENSUS-2026";
const inquiryId = "INQ-NYCARTC-FACEBOOK-POST-CENSUS-2026";

export const nycArtCFacebookPostCensus = {
  observedAt: "2026-07-14",
  page: "https://www.facebook.com/nycartc/posts",
  traversal: {
    authenticatedTerminalTraversals: 1,
    scrollIterations: 260,
    terminalScrollsWithoutAddition: 40,
    distinctSurvivingPosts: 441,
    recoveredRange: "2017-01-29 through 2021-09-15",
    pageActionControlsObserved: 441,
    humanPublisherAttribution: "not-exposed"
  },
  forms: {
    eventRoute: 148,
    standalonePost: 136,
    originalMediaPost: 78,
    resharedStory: 53,
    sourceOrResourceRoute: 26
  },
  primaryThemes: {
    nightlifeEnforcementAndGovernance: 157,
    generalCoalitionCommunication: 92,
    commercialRentAndTenancy: 71,
    culturalSpaceCare: 47,
    publicMeetingsAndParticipation: 25,
    fundingAndOperationalResources: 21,
    eventAndCulturalDistribution: 15,
    pressAndPublicKnowledge: 11,
    equitySolidarityAndMutualAid: 2
  },
  stakeholderGroupOccurrences: {
    nycCouncilMembersAndCouncil: 86,
    nycCulturalAndNightlifeAgencies: 40,
    culturalAndAdvocacyPartners: 38,
    nycBusinessAndEnforcementAgencies: 13,
    pressAndPublicInformationOrganizations: 11
  },
  visibleInteractionSnapshot: {
    recordsWithAtLeastOneSignal: 386,
    reactions: 2366,
    comments: 212,
    shares: 611
  },
  destinationInventory: {
    outboundLinkOccurrences: 64,
    uniqueOutboundUrls: 39,
    normalizedRoutes: 33,
    protectedRoutes: 2
  },
  completenessStatement:
    "Every record exposed by the surviving July 2026 Page timeline received a public-safe disposition after 40 terminal scrolls without additions. This is not a native Meta export, deletion history, or proof that no historical post is missing.",
  publicLedger: "docs/knowledge-bank/data/nycartc-facebook-post-ledger.json",
  publicRouteLedger:
    "docs/knowledge-bank/data/nycartc-facebook-post-route-ledger.json"
} as const;

const claimIds = [
  "CLM-NYCARTC-FACEBOOK-SURVIVING-POST-POPULATION",
  "CLM-NYCARTC-FACEBOOK-PARTICIPATION-AND-CAMPAIGN-ROUTING",
  "CLM-NYCARTC-FACEBOOK-STAKEHOLDER-ROUTING",
  "CLM-NYCARTC-FACEBOOK-VISIBLE-RESPONSE-FLOOR",
  "CLM-NYCARTC-FACEBOOK-JAMIE-PUBLISHER-SEED",
  "CLM-NYCARTC-FACEBOOK-JAMIE-NAMED-PRACTICE"
] as const;

const sourceIds = [
  "SRC-FACEBOOK-NYCARTC-PAGE-POSTS-2026",
  "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
  "SRC-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
  "SRC-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026",
  "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
  "SRC-FACEBOOK-NYCARTC-TALKS-NOT-RAIDS-OLYMPIA-POST",
  "SRC-FACEBOOK-NYCARTC-COVID-RELIEF-KNOW-YOUR-RIGHTS-VIDEO",
  "SRC-CITY-AND-STATE-AGENT-OF-CHANGE-2018",
  "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"
] as const;

export const nycArtCFacebookPostIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population archival-production pass over the surviving NYC Artist Coalition Facebook Page-post timeline, with record-level dispositions, campaign and source routing, stakeholder-addressing patterns, visible-response boundaries, selected close readings, and a protected human-publisher research route.",
    submittedBy: "Jamie Burkart and Codex authenticated archival review",
    sourceUrl: "https://www.facebook.com/nycartc/posts",
    entityIds: [
      "ENT-NYC-ARTIST-COALITION",
      "ENT-CABARET-LAW-REPEAL",
      "ENT-OFFICE-OF-NIGHTLIFE",
      "ENT-TALKS-NOT-RAIDS",
      "ENT-FAIR-RENT-NYC",
      "ENT-MARCH-OPERATIONS"
    ],
    disposition: "source-created",
    sourceIds: [...sourceIds],
    claimIds: [...claimIds],
    researchTaskIds: [
      "TASK-NYCARTC-FACEBOOK-POST-CENSUS",
      "TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT",
      "TASK-NYCARTC-FACEBOOK-POSTED-SOURCE-RECOVERY"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const nycArtCFacebookPostSources = [
  {
    id: "SRC-FACEBOOK-NYCARTC-PAGE-POSTS-2026",
    title: "NYC Artist Coalition Facebook Page posts",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/posts",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook Page-post timeline, authenticated terminal-scroll review, July 14, 2026.",
    publicNote:
      "The current Page identifies NYC Artist Coalition and uses the public description 'Protecting Community Spaces.' The authenticated post controls identify the Page identity, not the human publisher of each post.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "the surviving public Page-post surface",
      "the Page-level NYC Artist Coalition publishing identity",
      "the public Page description"
    ],
    doesNotEstablish: [
      "a native Meta export or deletion history",
      "individual human authorship or publisher attribution",
      "complete administrator chronology",
      "historical analytics, adoption, endorsement, causality, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
    title: "NYC Artist Coalition Facebook Page-post population accounting run",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe aggregate metadata from a July 2026 census of the surviving NYC Artist Coalition Facebook Page-post timeline.",
    publicNote:
      "The public repository retains aggregate accounting, a redacted 441-item disposition ledger, and selected public sources. Raw post text, comments, exact per-record metrics, unstable action links, manager state, authentication material, and relationship data remain protected.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "441 distinct surviving Page-post records",
      "a stable terminal condition after 40 scrolls without additions",
      "a 441-record form and primary-theme disposition",
      "386 records with at least one currently visible interaction signal",
      "64 outbound-link occurrences resolving to 39 unique URLs",
      "Page-level action controls on all 441 records"
    ],
    doesNotEstablish: [
      "that no historical post was deleted, hidden, or made unavailable",
      "which human published or authored each record",
      "individual engagement or endorsement by tagged stakeholders",
      "historical analytics, unique people, reach, adoption, causality, or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
    title: "NYC Artist Coalition Meta Business Suite content control",
    organization: "Meta",
    kind: "institutional-web-page",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata from the NYC Artist Coalition Page's authenticated Meta Business Suite content control, July 14, 2026.",
    publicNote:
      "The modern content control was reviewed separately from the older Page chronology. It did not expose a historic human-level publisher field and is not used as the 2017-2021 denominator.",
    intakeIds: [intakeId],
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-CONTENT-CONTROL-2026-001",
    supportsGenerally: [
      "a separate modern Meta content-management surface",
      "absence of an exposed historic human-level publisher field in the reviewed control"
    ],
    doesNotEstablish: [
      "that no human-level attribution exists in a native export",
      "the historical post denominator",
      "individual authorship or a complete administrator chronology"
    ]
  },
  {
    id: "SRC-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026",
    title: "Jamie Burkart first-person account of NYC Artist Coalition Facebook publishing",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person account of his contribution to NYC Artist Coalition's Facebook publishing practice, July 2026.",
    publicNote:
      "Jamie remembers being the predominant person using the Page while also remembering that other coalition participants used it. The account is preserved as a research lead pending native records and collaborator corroboration.",
    intakeIds: [intakeId],
    protectedLocatorId: "CONFIRMATION-NYCARTC-FACEBOOK-PUBLISHING-2026-001",
    supportsGenerally: [
      "Jamie's first-person account of substantial Page-publishing labor",
      "Jamie's explicit memory that the Page was not exclusively his"
    ],
    doesNotEstablish: [
      "the publisher of any specific post",
      "a quantitative share of publishing labor",
      "sole administration, sole authorship, or collaborators' perspectives"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
    title: "NYC Artist Coalition Cabaret Law bridge-of-trust post",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=1945640715690307&set=a.544849644343446",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook post connecting Cabaret Law repeal, venue safety, and trust between community spaces and city government.",
    publicNote:
      "The surviving Page-owned photo post tags Jamie and Council Member Rafael Espinal while framing repeal as part of rebuilding trust between community spaces and the city.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "a public safety-and-trust framing for Cabaret Law repeal",
      "Jamie's named presence in the public coalition record",
      "public addressing of a Council member"
    ],
    doesNotEstablish: [
      "the post's individual human author",
      "sole credit for the framing or campaign",
      "stakeholder endorsement or legislative causality"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-TALKS-NOT-RAIDS-OLYMPIA-POST",
    title: "NYC Artist Coalition Talks Not Raids Olympia post",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.facebook.com/photo/?fbid=2225985110989198&set=a.544849644343446",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition Facebook post quoting Olympia Kazi on safety and transparency in the Talks Not Raids campaign.",
    publicNote:
      "The Page post routes readers to TalksNotRaids.com and preserves Olympia Kazi's public campaign voice. Her authorship and coalition credit remain explicit.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "the Talks Not Raids safety-and-transparency frame",
      "Olympia Kazi's public campaign voice",
      "routing from the Page into the campaign site"
    ],
    doesNotEstablish: [
      "individual human authorship of the Page post",
      "that Jamie authored Olympia Kazi's words",
      "policy causality or the later disposition of MARCH"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-COVID-RELIEF-KNOW-YOUR-RIGHTS-VIDEO",
    title: "NYC Artist Coalition COVID-19 rent and know-your-rights video",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/videos/632085217644541/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition COVID-19 rent and know-your-rights Facebook video.",
    publicNote:
      "The surviving video record documents a practical Q&A route for housing and small-business legal information during COVID-19 and links to the coalition relief surface.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "a practical rent and legal-information route during COVID-19",
      "a coalition relief-resource pathway",
      "a public comment-and-response support surface"
    ],
    doesNotEstablish: [
      "the individual human author or producer",
      "legal advice or current guidance",
      "unique viewers, service outcomes, adoption, or impact"
    ]
  },
  {
    id: "SRC-CITY-AND-STATE-AGENT-OF-CHANGE-2018",
    title: "A compromise for nightlife venues and their neighbors",
    organization: "City & State New York",
    author: "Rafael Espinal, Jr.",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.cityandstateny.com/opinion/2018/09/a-compromise-for-nightlife-venues-and-their-neighbors/178085/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Rafael Espinal, Jr., 'A compromise for nightlife venues and their neighbors,' City & State New York, September 26, 2018.",
    publicNote:
      "The coalition Page routed the opinion article as nightlife-policy context. Espinal describes an Agent of Change proposal intended to allocate soundproofing responsibility between new residential construction and new nightlife venues.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "the public Agent of Change proposal",
      "a policy frame balancing residents, cultural venues, and neighborhood change"
    ],
    doesNotEstablish: [
      "enactment or implementation of the proposal",
      "NYC Artist Coalition authorship or endorsement of every statement",
      "Jamie's role, stakeholder response, or resulting impact"
    ]
  },
  {
    id: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
    title:
      "City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis",
    organization: "The Seattle Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.seattletimes.com/entertainment/city-announces-1-1-million-and-rent-relief-to-support-arts-organizations-in-the-coronavirus-economic-crisis/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "The Seattle Times, 'City announces $1.1 million and rent relief to support arts organizations in the coronavirus economic crisis.'",
    publicNote:
      "The coalition Page routed this public article as comparative COVID-19 cultural-relief context. The article was not accessible for close reading in the current research environment and remains queued.",
    intakeIds: [intakeId],
    supportsGenerally: ["a posted comparative cultural-relief research lead"],
    doesNotEstablish: [
      "the article's detailed propositions before close reading",
      "a New York City program or NYC Artist Coalition outcome",
      "Jamie's role, authorship, partnership, or impact"
    ]
  }
] satisfies SourceRecord[];

export const nycArtCFacebookPostReadings = [
  {
    id: "READ-FACEBOOK-NYCARTC-PAGE-POSTS-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-PAGE-POSTS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-PAGE-IDENTITY",
        text: "The surviving public Page presents NYC Artist Coalition as a project identity focused on protecting community spaces.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-page-identity"],
        confidence: "high",
        locator: "Page identity and description"
      }
    ],
    limitations: [
      "The public Page does not identify the human publisher or author of each post.",
      "The current Page description does not establish the complete historical mission or division of labor."
    ],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT"]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-POST-POPULATION",
        text: "One authenticated traversal recovered 441 distinct records and reached a terminal condition of 40 scrolls without additions; every record received a public-safe disposition.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-post-population"],
        confidence: "high",
        locator: "Record-level population reconciliation"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-POST-FORMS",
        text: "The 441-record population contains 148 event routes, 136 standalone posts, 78 original-media posts, 53 reshared stories, and 26 source-or-resource routes.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-post-form-disposition"],
        confidence: "high",
        locator: "Record-form classification"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-CAMPAIGN-CONTINUITY",
        text: "The record repeatedly routes participation and source material across nightlife governance, cultural-space care, commercial rent, public meetings, practical resources, and press.",
        relationToJamie: "collective-role",
        supportTags: ["nycartc-facebook-campaign-continuity"],
        confidence: "high",
        locator: "Primary and multi-label theme classification"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-STAKEHOLDER-ROUTING",
        text: "Rule-matched public addressing occurs on 86 records for Council members or the Council, 40 for cultural or nightlife agencies, 38 for cultural or advocacy partners, 13 for business or enforcement agencies, and 11 for press or public-information organizations.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-stakeholder-routing"],
        confidence: "moderate",
        locator: "Rule-matched record-level stakeholder classification"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-VISIBLE-RESPONSE-FLOOR",
        text: "As observed on July 14, 2026, 386 of 441 records displayed at least one reaction, comment, or share; visible counters summed to a floor of 2,366 reactions, 212 comments, and 611 shares.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-visible-response-floor"],
        confidence: "high",
        locator: "Current visible interaction controls"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-DESTINATION-INVENTORY",
        text: "The current rendered interface exposed 64 outbound-link occurrences resolving to 39 unique URLs, including campaign, Council, public-information, event, press, and resource routes.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-destination-inventory"],
        confidence: "high",
        locator: "Normalized outbound-link inventory"
      },
      {
        id: "PROP-FACEBOOK-NYCARTC-PAGE-LEVEL-ACTION-CONTROLS",
        text: "All 441 records displayed Page-level action controls for NYC Artist Coalition, but neither the public timeline nor the reviewed Meta content control exposed a historic human-level publisher field.",
        relationToJamie: "limitation",
        supportTags: ["nycartc-facebook-human-publisher-not-exposed"],
        confidence: "high",
        locator: "Page action controls and authenticated content-control review"
      }
    ],
    limitations: [
      "The terminal census covers the surviving July 2026 Page surface, not deleted, hidden, unavailable, or differently permissioned records.",
      "Primary-theme and stakeholder classifications are rule-based archival dispositions and can simplify multi-purpose posts.",
      "Page-level controls do not identify the human publisher or author of each record.",
      "Tags, mentions, links, and reshares do not prove stakeholder engagement, endorsement, partnership, or action.",
      "Visible counters are mutable floors, not historical analytics, unique people, reach, attendance, conversion, causality, or impact."
    ],
    researchTaskIds: [
      "TASK-NYCARTC-FACEBOOK-POST-CENSUS",
      "TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT"
    ]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
    sourceId: "SRC-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-META-CONTROL-NO-HUMAN-FIELD",
        text: "The reviewed Meta Business Suite content control operated as a separate modern management surface and did not expose a historic human-level publisher field.",
        relationToJamie: "limitation",
        supportTags: ["nycartc-facebook-human-publisher-not-exposed"],
        confidence: "high",
        locator: "Authenticated content control"
      }
    ],
    limitations: [
      "This does not prove that no publisher attribution exists in a native Meta export or another administrator surface.",
      "The modern content control is not used as the denominator for the older public timeline."
    ],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT"]
  },
  {
    id: "READ-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026",
    sourceId: "SRC-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY",
        text: "Jamie remembers predominantly using the NYC Artist Coalition Facebook Page while also remembering that other people used it.",
        relationToJamie: "direct-role",
        supportTags: ["nycartc-facebook-jamie-publisher-memory"],
        confidence: "limited",
        locator: "First-person memory intake"
      }
    ],
    limitations: [
      "The memory does not quantify labor, identify the publisher of specific records, or supply collaborator perspectives.",
      "The claim remains research-stage until native records or collaborator proof notes corroborate the division of labor."
    ],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT"]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
    sourceId: "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST",
        text: "A surviving coalition post tags Jamie and Council Member Rafael Espinal while connecting Cabaret Law repeal, venue safety, and rebuilding trust between community spaces and the city.",
        relationToJamie: "collective-role",
        supportTags: ["nycartc-facebook-jamie-named-practice"],
        confidence: "high",
        locator: "Page-owned photo post"
      }
    ],
    limitations: [
      "The post does not expose its individual human author or allocate campaign credit.",
      "Tagging a Council member does not establish endorsement, response, or legislative causality."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-NYCARTC-TALKS-NOT-RAIDS-OLYMPIA-POST",
    sourceId: "SRC-FACEBOOK-NYCARTC-TALKS-NOT-RAIDS-OLYMPIA-POST",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-OLYMPIA-TALKS-NOT-RAIDS",
        text: "A surviving coalition post preserves Olympia Kazi's public safety-and-transparency framing and routes readers to the Talks Not Raids campaign site.",
        relationToJamie: "collective-role",
        supportTags: ["nycartc-facebook-campaign-continuity"],
        confidence: "high",
        locator: "Page-owned photo post and exposed destination"
      }
    ],
    limitations: [
      "Olympia Kazi retains authorship of her words and public campaign voice.",
      "The post does not expose its individual human author or establish policy causality."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-FACEBOOK-NYCARTC-COVID-RELIEF-KNOW-YOUR-RIGHTS-VIDEO",
    sourceId: "SRC-FACEBOOK-NYCARTC-COVID-RELIEF-KNOW-YOUR-RIGHTS-VIDEO",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-FACEBOOK-NYCARTC-COVID-RELIEF-PRACTICAL-SUPPORT",
        text: "The surviving video record routes cultural-space participants to practical rent, tenant, and small-business legal information during COVID-19.",
        relationToJamie: "collective-role",
        supportTags: ["nycartc-facebook-campaign-continuity"],
        confidence: "high",
        locator: "Public Page video and relief route"
      }
    ],
    limitations: [
      "The record does not expose its individual human author or producer.",
      "The historical video is not current legal guidance and does not establish service outcomes."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-CITY-AND-STATE-AGENT-OF-CHANGE-2018",
    sourceId: "SRC-CITY-AND-STATE-AGENT-OF-CHANGE-2018",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-CITY-AND-STATE-AGENT-OF-CHANGE-PROPOSAL",
        text: "Rafael Espinal described an Agent of Change bill that would require soundproofing for some new residential construction near existing nightlife venues and some new nightlife venues near existing residences.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-nightlife-policy-context"],
        confidence: "high",
        locator: "Article body"
      },
      {
        id: "PROP-CITY-AND-STATE-NIGHTLIFE-POLICY-CONTINUITY",
        text: "Espinal situated the proposal after Cabaret Law repeal and creation of the Office of Nightlife as a further attempt to balance cultural venues, residents, and neighborhood change.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-facebook-nightlife-policy-context"],
        confidence: "high",
        locator: "Article conclusion"
      }
    ],
    limitations: [
      "The article is an opinion by a Council member and does not establish enactment or implementation of the proposal.",
      "The article does not establish NYC Artist Coalition or Jamie's authorship, endorsement, role, response, or impact."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-SEATTLE-TIMES-ARTS-RELIEF-2020",
    sourceId: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
    status: "revisit",
    propositions: [],
    limitations: [
      "The article could not be accessed for close reading in the current research environment.",
      "Its title and appearance as a posted route do not support a portfolio claim."
    ],
    researchTaskIds: ["TASK-NYCARTC-FACEBOOK-POSTED-SOURCE-RECOVERY"]
  }
] satisfies SourceReading[];

export const nycArtCFacebookPostClaims = [
  {
    id: "CLM-NYCARTC-FACEBOOK-SURVIVING-POST-POPULATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "An authenticated terminal traversal recovered 441 distinct NYC Artist Coalition Facebook Page-post records spanning January 2017 through September 2021, and every recovered record received a public-safe disposition.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-post-population"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the 441-record terminal control", "complete public-safe disposition coverage"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-POST-POPULATION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means every record exposed by the surviving July 2026 Page timeline received a disposition.",
      "The census is not a native Meta export and cannot account for deleted, hidden, unavailable, or differently permissioned records."
    ],
    antiClaims: [
      "NYC Artist Coalition published only 441 Facebook posts.",
      "The ledger is a complete Meta export or deletion history."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-PARTICIPATION-AND-CAMPAIGN-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The surviving Page corpus documents a collective participation and campaign-routing system that repeatedly connected events, public meetings, cultural-space care, Cabaret Law and nightlife governance, Talks Not Raids, commercial rent, COVID-19 resources, press, and campaign sites.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "nycartc-facebook-post-form-disposition",
      "nycartc-facebook-campaign-continuity",
      "nycartc-facebook-destination-inventory"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the post-form distribution", "theme continuity", "the posted-destination inventory"],
        propositionIds: [
          "PROP-FACEBOOK-NYCARTC-POST-FORMS",
          "PROP-FACEBOOK-NYCARTC-CAMPAIGN-CONTINUITY",
          "PROP-FACEBOOK-NYCARTC-DESTINATION-INVENTORY"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-TALKS-NOT-RAIDS-OLYMPIA-POST",
        relationship: "corroborating",
        supports: ["a safety-and-transparency campaign route preserving Olympia Kazi's voice"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-OLYMPIA-TALKS-NOT-RAIDS"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-COVID-RELIEF-KNOW-YOUR-RIGHTS-VIDEO",
        relationship: "corroborating",
        supports: ["a practical COVID-19 legal-information route"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-COVID-RELIEF-PRACTICAL-SUPPORT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017",
        relationship: "corroborating",
        supports: ["a public meeting route connecting cultural-space participants and officials"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-NIGHTLIFE-TOWN-HALL-2017"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CITY-AND-STATE-AGENT-OF-CHANGE-2018",
        relationship: "context",
        supports: ["one nightlife-policy source routed by the Page"],
        propositionIds: [
          "PROP-CITY-AND-STATE-AGENT-OF-CHANGE-PROPOSAL",
          "PROP-CITY-AND-STATE-NIGHTLIFE-POLICY-CONTINUITY"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a Page-level collective practice claim, not an attribution of every post or campaign action to Jamie.",
      "Routing a source, event, organization, or action does not establish authorship, endorsement, formal partnership, readership, conversion, or resulting impact."
    ],
    antiClaims: [
      "Jamie authored or published every post in the corpus.",
      "NYC Artist Coalition alone organized every linked event or campaign.",
      "The social corpus proves policy causality or measured public outcomes."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-STAKEHOLDER-ROUTING",
    project: "nyc-artist-coalition",
    internalClaim:
      "The surviving corpus repeatedly addresses or routes through Council members and the Council, cultural and nightlife agencies, cultural and advocacy partners, business and enforcement agencies, and press or public-information organizations.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-stakeholder-routing"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the five-group rule-matched stakeholder-routing distribution"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-STAKEHOLDER-ROUTING"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
        relationship: "corroborating",
        supports: ["one public Council-member addressing example"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The counts are rule-matched record occurrences and categories can overlap.",
      "Tags, mentions, links, quotations, and reshares document public addressing or routing, not verified engagement by the named stakeholder."
    ],
    antiClaims: [
      "Eighty-six Council members engaged with the Page.",
      "Every tagged stakeholder saw, endorsed, replied to, partnered with, or acted on a post.",
      "Public addressing establishes policy influence or impact."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-VISIBLE-RESPONSE-FLOOR",
    project: "nyc-artist-coalition",
    internalClaim:
      "On July 14, 2026, 386 of 441 surviving records displayed at least one visible reaction, comment, or share; the current counters form a bounded response floor rather than historical analytics or impact evidence.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-visible-response-floor"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
        relationship: "direct-support",
        supports: ["the 386-record visible-response floor", "the dated aggregate counter floor"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-VISIBLE-RESPONSE-FLOOR"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The counters are mutable July 2026 observations and may combine attention to Page-authored and reshared material.",
      "They are not unique people, historical reach, attendance, conversion, endorsement, causality, or impact."
    ],
    antiClaims: [
      "The current counters are complete historical engagement analytics.",
      "Visible reactions, comments, or shares prove adoption, stakeholder endorsement, policy influence, or public impact."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-JAMIE-PUBLISHER-SEED",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie remembers being the predominant person using the NYC Artist Coalition Facebook Page while also remembering that other coalition participants used it.",
    status: "researching",
    maturity: "researching",
    intakeIds: [intakeId],
    requiredSupportTags: ["nycartc-facebook-jamie-publisher-memory"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026",
        relationship: "private-support",
        supports: ["Jamie's first-person account and its explicit shared-use boundary"],
        propositionIds: ["PROP-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY"],
        confidence: "limited",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
        relationship: "supports-boundary",
        supports: ["the current absence of exposed historic human-level publisher attribution"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-META-CONTROL-NO-HUMAN-FIELD"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not quantify Jamie's share of the Page publishing labor from memory alone.",
      "Do not assign any specific record to Jamie without native publisher evidence or record-level corroboration.",
      "Preserve other coalition participants' publishing, authorship, and campaign credit."
    ],
    antiClaims: [
      "Jamie published or authored all 441 records.",
      "Jamie was the sole Page administrator or sole author of NYC Artist Coalition's public voice.",
      "The Page-level action control is human-level publisher attribution."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart memory intake", "Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-FACEBOOK-JAMIE-NAMED-PRACTICE",
    project: "nyc-artist-coalition",
    internalClaim:
      "Independent reporting and the surviving coalition Page record document Jamie's named participation in practical venue-safety work and Cabaret Law repeal advocacy framed around safety and trust between cultural spaces and city government.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "fire-code-study-groups",
      "nycartc-affiliation",
      "nycartc-facebook-jamie-named-practice"
    ],
    composition: {
      action:
        "Connected practical Fire Guard study groups and venue-safety concerns with Cabaret Law repeal advocacy, helping make the relationship between cultural spaces and city government more navigable.",
      intendedEnd:
        "Help small cultural spaces pursue safety without treating their existence, music, or dancing as grounds for exclusion.",
      usableResult:
        "A documented practice joining hands-on safety education, coalition advocacy, public testimony, and a clear trust-and-safety frame for Cabaret Law repeal.",
      audience:
        "Hiring readers evaluating cross-domain translation, program operations, implementation support, public communication, and stakeholder coordination.",
      collectiveCredit:
        "The work belonged to NYC Artist Coalition, venue operators, artists, organizers, advocates, Council members, and agency participants; Jamie's documented contribution sits within that collective effort.",
      causalBoundary:
        "The evidence establishes Jamie's safety and advocacy practice, not individual authorship of the Page post, sole campaign leadership, or sole causality for repeal."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
        relationship: "direct-support",
        supports: ["Jamie's fire-code study groups", "coalition affiliation", "City Hall advocacy and safety framing"],
        propositionIds: [
          "PROP-NYCARTC-FIRE-CODE-GROUPS",
          "PROP-NYCARTC-AFFILIATION",
          "PROP-NYCARTC-RALLY",
          "PROP-NYCARTC-SAFETY-FRAMING"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST",
        relationship: "corroborating",
        supports: ["Jamie's named presence in the coalition Page record", "the safety-and-trust frame"],
        propositionIds: ["PROP-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use the Page source as corroboration of named participation and framing, not human authorship of the post.",
      "Keep the advocacy, legislative outcome, and policy implementation collectively credited."
    ],
    antiClaims: [
      "Jamie alone repealed the Cabaret Law.",
      "Jamie authored the repeal legislation or every coalition communication.",
      "The Facebook post proves Jamie founded the coalition or caused the policy outcome."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-14",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated social-archive review",
      "Codex Chad-lens composition review"
    ]
  }
] satisfies ClaimRecord[];

export const nycArtCFacebookPostResearchTasks = [
  {
    id: "TASK-NYCARTC-FACEBOOK-POST-CENSUS",
    project: "nyc-artist-coalition",
    question:
      "Can every post exposed by the surviving NYC Artist Coalition Facebook Page timeline receive a public-safe disposition with campaign, source, stakeholder, role, and traction boundaries?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: [...sourceIds],
    claimIds: [...claimIds],
    nextActions: [
      "Re-run the terminal traversal and compare the redacted population control if Facebook exposes a different surviving timeline."
    ],
    resolutionSummary:
      "Yes. One authenticated 260-scroll traversal recovered 441 distinct records and reached 40 consecutive terminal scrolls without additions. Every record received a public-safe disposition; post forms, themes, stakeholder routes, visible response floors, and 39 unique outbound URLs were accounted for with role, credit, privacy, and metric boundaries."
  },
  {
    id: "TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT",
    project: "nyc-artist-coalition",
    question:
      "Can a native Meta Page export, administrator chronology, and collaborator proof notes establish the deleted-post denominator and human division of Page publishing labor?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: [
      "SRC-FACEBOOK-NYCARTC-PAGE-POSTS-2026",
      "SRC-FACEBOOK-NYCARTC-POST-CENSUS-RUN-2026",
      "SRC-FACEBOOK-NYCARTC-META-CONTENT-CONTROL-2026",
      "SRC-NYCARTC-JAMIE-FACEBOOK-PUBLISHING-MEMORY-2026"
    ],
    claimIds: ["CLM-NYCARTC-FACEBOOK-JAMIE-PUBLISHER-SEED"],
    nextActions: [
      "Request a native Meta Page export without committing raw administrator, audience, comment, or relationship data.",
      "Invite Olympia Kazi and other coalition participants to confirm Page establishment, administrator chronology, publishing practice, and collective-credit boundaries.",
      "Reconcile any export against the 441-post surviving control and keep deleted or hidden records distinct from nonexistence.",
      "Promote Jamie's publisher claim only to the level supported by corroborated record-level or aggregate publisher evidence."
    ]
  },
  {
    id: "TASK-NYCARTC-FACEBOOK-POSTED-SOURCE-RECOVERY",
    project: "nyc-artist-coalition",
    question:
      "Which posted routes need archive recovery or close reading before they can support a knowledge-bank proposition?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"],
    claimIds: ["CLM-NYCARTC-FACEBOOK-PARTICIPATION-AND-CAMPAIGN-ROUTING"],
    nextActions: [
      "Recover an accessible public or archived copy of the Seattle Times cultural-relief article and close-read it before using any proposition beyond its title.",
      "Review the 33-route public ledger for dead or redirected destinations and preserve archive URLs without making link health a build dependency.",
      "Promote only mission-relevant routes with article-level evidence; leave action, campaign, and cultural links as routing records when they do not support a distinct claim."
    ]
  }
] satisfies ResearchTask[];

export const nycArtCFacebookPostInquiries = [
  {
    id: inquiryId,
    project: "nyc-artist-coalition",
    question:
      "What does the complete surviving NYC Artist Coalition Facebook Page-post population establish about participation infrastructure, campaign continuity, source routing, stakeholder addressing, visible response, and Jamie's role without converting Page identity into individual authorship or social activity into impact?",
    methods: [
      "Used an authenticated read-only Facebook Page-manager session and traversed the public Page timeline through 260 scroll iterations.",
      "Required 40 consecutive terminal scrolls without additions before treating the surviving surface as closed.",
      "Assigned every recovered record a public-safe form, primary-theme, stakeholder-group, outbound-route, and visible-response disposition.",
      "Verified that all 441 records exposed Page-level action controls for NYC Artist Coalition while the public timeline and reviewed Meta content control exposed no historic human-level publisher field.",
      "Separated the modern Meta Business Suite content control from the older public-timeline denominator.",
      "Normalized outbound destinations for aggregate accounting while withholding raw text, comments, per-record metrics, sensitive action routes, relationship data, and authenticated state.",
      "Normalized 39 raw URLs into 33 public-safe routes, withholding two historical meeting-access or form destinations and linking four routes to source records.",
      "Close-read selected public posts representing Cabaret Law safety and trust, Talks Not Raids, and COVID-19 practical support.",
      "Preserved Jamie's publisher memory as a protected research-stage claim and routed it to native-export and collaborator corroboration."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "The terminal traversal recovered 441 distinct records spanning January 29, 2017, through September 15, 2021.",
      "The corpus contains 148 event routes, 136 standalone posts, 78 original-media posts, 53 reshared stories, and 26 source-or-resource routes.",
      "The dominant primary themes are nightlife enforcement and governance, coalition communication, commercial rent and tenancy, cultural-space care, public participation, and practical resources.",
      "Rule-matched stakeholder routing appears on 86 records for Council members or the Council, 40 for cultural or nightlife agencies, 38 for cultural or advocacy partners, 13 for business or enforcement agencies, and 11 for press or public-information organizations.",
      "As currently displayed, 386 records retain at least one visible response signal; the counters are dated mutable floors only.",
      "The rendered corpus exposes 64 outbound-link occurrences resolving to 39 unique URLs across campaign, government, event, press, and resource routes.",
      "URL normalization yields 33 route records: two protected historical action routes and four routes linked to source records, including a new close reading of Rafael Espinal's Agent of Change opinion and a queued Seattle Times cultural-relief article.",
      "The Page repeatedly connected recurring meetings and campaigns with press, practical resources, public hearings, city interfaces, and campaign microsites.",
      "The surviving record preserves Olympia Kazi's campaign voice and names Jamie in Cabaret Law safety-and-trust and Fire Guard contexts, while human post-level authorship remains unresolved."
    ],
    limitations: [
      "The census covers the surviving July 2026 interface, not a native Meta export, deletion history, or all records that may once have existed.",
      "One complete terminal traversal was recovered; deterministic re-analysis is not a second independent browser traversal.",
      "The public timeline and reviewed Meta content control do not expose historic human-level publisher attribution.",
      "Jamie remembers predominantly using the Page while also remembering shared use, but the division of publishing labor remains uncorroborated.",
      "Rule-based themes and stakeholder categories simplify multi-purpose records and can overlap.",
      "Tags, mentions, links, reshares, and quotations do not establish that a stakeholder saw, endorsed, replied to, partnered with, or acted on a post.",
      "Visible reactions, comments, and shares are mutable current floors, not historical analytics, unique people, reach, attendance, conversion, causality, or impact.",
      "Raw post text, comments, per-record counters, administrator state, relationship data, media, authentication material, and sensitive action routes remain outside the public repository."
    ],
    sourceIds: [...sourceIds],
    publicSummary:
      "The surviving NYC Artist Coalition Facebook record is fully dispositioned at 441 posts. It documents a sustained collective practice of meeting, campaign, source, stakeholder, and practical-resource routing; all current social counters and all human-publisher questions remain explicitly bounded.",
    protectedLocatorId: "RESEARCH-NYCARTC-FACEBOOK-POSTS-2026-001"
  }
] satisfies ResearchInquiry[];

const deferredClaimIds = claimIds.filter(
  (claimId) => claimId !== "CLM-NYCARTC-FACEBOOK-JAMIE-PUBLISHER-SEED"
);

export const nycArtCFacebookPostDecisions = deferredClaimIds.map(
  (claimId, index) => ({
    id: `DEC-DEFER-NYCARTC-FACEBOOK-POST-${index + 1}`,
    claimId,
    surface: "future-portfolio-composition",
    decision: "defer" as const,
    rationale:
      claimId === "CLM-NYCARTC-FACEBOOK-JAMIE-NAMED-PRACTICE"
        ? "This is strong public-ready reserve evidence for implementation, civic translation, practical safety support, and coalition advocacy. Keep it available without adding a new website claim until an audience-specific composition pass can place it with the existing NYC Artist Coalition record."
        : "Retain the full-population control and collective operating patterns in the knowledge bank without turning a social census, rule-matched routing, mutable counters, or linked-source inventory into automatic website copy.",
    decidedAt: "2026-07-14",
    reviewedBy: [
      "Jamie Burkart",
      "Codex authenticated social-archive review",
      "Codex Chad-lens composition review"
    ]
  })
) satisfies ProjectionDecision[];
