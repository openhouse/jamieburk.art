import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const corpusIntakeId = "INT-2026-07-14-FB-NYCARTC-POSTS";
const roleMemoryIntakeId =
  "INT-2026-07-14-FB-NYCARTC-PUBLISHING-MEMORY";

const selectedPostIntakes = [
  {
    id: "INT-2026-07-14-FB-NYCARTC-CABARET-TRUST",
    publicSafeDescription:
      "NYC Artist Coalition post connecting Cabaret Law repeal, venue safety, and trust between community spaces and city government.",
    submittedUrl:
      "https://www.facebook.com/photo/?fbid=1945640715690307&set=a.544849644343446",
    sourceIds: ["SRC-FB-NYCARTC-CABARET-TRUST-POST"]
  },
  {
    id: "INT-2026-07-14-FB-NYCARTC-TALKS-NOT-RAIDS",
    publicSafeDescription:
      "NYC Artist Coalition post preserving Olympia Kazi's safety-and-transparency framing for Talks Not Raids.",
    submittedUrl:
      "https://www.facebook.com/photo/?fbid=2225985110989198&set=a.544849644343446",
    sourceIds: ["SRC-FB-NYCARTC-TALKS-NOT-RAIDS-POST"]
  },
  {
    id: "INT-2026-07-14-FB-NYCARTC-COVID-RIGHTS",
    publicSafeDescription:
      "NYC Artist Coalition COVID-era rent and know-your-rights video route.",
    submittedUrl:
      "https://www.facebook.com/nycartc/videos/632085217644541/",
    sourceIds: ["SRC-FB-NYCARTC-COVID-RIGHTS-VIDEO"]
  }
];

const destinationIntakes = [
  {
    id: "INT-2026-07-14-CITY-STATE-AGENT-OF-CHANGE",
    publicSafeDescription:
      "City & State opinion article by Rafael Espinal describing an Agent of Change proposal for nightlife venues and nearby residential buildings.",
    submittedUrl:
      "https://www.cityandstateny.com/opinion/2018/09/a-compromise-for-nightlife-venues-and-their-neighbors/178085/",
    sourceIds: ["SRC-CITY-STATE-AGENT-OF-CHANGE-2018"]
  },
  {
    id: "INT-2026-07-14-SEATTLE-TIMES-ARTS-RELIEF",
    publicSafeDescription:
      "Seattle Times cultural-relief article posted by NYC Artist Coalition as comparative COVID-era research context.",
    submittedUrl:
      "https://www.seattletimes.com/entertainment/city-announces-1-1-million-and-rent-relief-to-support-arts-organizations-in-the-coronavirus-economic-crisis/",
    sourceIds: ["SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"]
  }
];

export const nycArtcFacebookPostIntakes = [
  {
    id: corpusIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "A record-level census and close reading of all 444 unique posts currently recoverable from NYC Artist Coalition's public Facebook Page timeline, retained outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-01-29 through 2021-09-15"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-FB-NYCARTC-PROFILE-2026",
      "SRC-FB-NYCARTC-POST-CORPUS-2026",
      "SRC-FB-NYCARTC-CONTENT-CONTROL-2026",
      "SRC-FB-NYCARTC-POSTED-URL-INVENTORY-2026"
    ],
    claimIds: [
      "CLM-FB-NYCARTC-POST-POPULATION-2026",
      "CLM-FB-NYCARTC-PARTICIPATION-ROUTING",
      "CLM-FB-NYCARTC-STAKEHOLDER-ROUTING",
      "CLM-FB-NYCARTC-ENGAGEMENT-SNAPSHOT-2026",
      "CLM-FB-NYCARTC-POSTED-URL-ROUTING-2026"
    ],
    inquiryIds: ["INQ-FB-NYCARTC-POST-CORPUS-2026"],
    protectedLocatorId: "FB-NYCARTC-POST-CORPUS-2026-001"
  },
  {
    id: roleMemoryIntakeId,
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription:
      "Jamie's memory that he was predominantly the person using NYC Artist Coalition's Facebook Page while other coalition participants also used it.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-2021"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-JAMIE-NYCARTC-FACEBOOK-PUBLISHING-MEMORY-2026",
      "SRC-FB-NYCARTC-MANAGEMENT-CONTROL-2026"
    ],
    claimIds: ["CLM-FB-NYCARTC-PUBLISHING-ROLE"],
    inquiryIds: ["INQ-FB-NYCARTC-PUBLISHING-ROLE-2026"],
    protectedLocatorId: "MEMORY-NYCARTC-FACEBOOK-PUBLISHING-2026-001"
  },
  ...selectedPostIntakes.map((item) => ({
    ...item,
    kind: "url" as const,
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    claimIds: [],
    inquiryIds: []
  })),
  ...destinationIntakes.map((item) => ({
    ...item,
    kind: "url" as const,
    capturedAt: "2026-07-14",
    submittedBy:
      "Codex source discovery from the authenticated NYC Artist Coalition Facebook corpus",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    claimIds: [],
    inquiryIds: []
  }))
] satisfies IntakeItem[];

export const nycArtcFacebookPostSources = [
  {
    id: "SRC-FB-NYCARTC-PROFILE-2026",
    title: "NYC Artist Coalition public Facebook Page",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.facebook.com/nycartc/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition public Facebook Page, accessed July 14, 2026.",
    publicNote:
      "The current Page identifies NYC Artist Coalition, uses the description 'Protecting Community Spaces,' and exposes the currently recoverable public timeline.",
    locator: "Page identity, description, follower displays, and Posts timeline.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "current Page identity and description",
      "access to the currently recoverable public timeline",
      "mutable rounded follower displays of 1.5K on the Page and 1.6K in Meta Business Suite"
    ],
    doesNotEstablish: [
      "an exact current or historical follower count",
      "deleted, unpublished, or otherwise unavailable posts",
      "human authorship of individual posts",
      "reach, endorsement, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-NYCARTC-POST-CORPUS-2026",
    title: "Authenticated NYC Artist Coalition Facebook public-post census",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated archival review of NYC Artist Coalition's currently recoverable public Facebook posts, July 14, 2026.",
    publicNote:
      "Two independent terminal traversals recovered the same 444 post identities across the January 29, 2017, through September 15, 2021, currently visible Page chronology.",
    locator:
      "Authenticated public Page timeline; two exact 444-ID traversals with distinct scroll cadences; matching non-identifying SHA-256 fingerprints over exact UTF-8 keys sorted under LC_ALL=C with LF delimiters and a final LF; 41 and 42 terminal no-addition controls; record-by-record classification.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "444-record current public-timeline reconciliation",
      "matching SHA-256 fingerprints for both sorted 444-ID traversal sets",
      "150 event routes, 138 standalone posts, 78 original-media posts, 52 reshared stories, and 26 source-or-resource routes",
      "mission-theme and stakeholder-route classification",
      "current visible interaction and outbound-link aggregate snapshots"
    ],
    doesNotEstablish: [
      "posts deleted before capture, unpublished drafts, or a lifetime historical population",
      "human publisher or author of any individual post",
      "sole account administration or a complete administrator chronology",
      "unique people, reach, attendance, endorsement, causality, or impact"
    ],
    protectedLocatorId: "FB-NYCARTC-POST-CORPUS-2026-001"
  },
  {
    id: "SRC-FB-NYCARTC-CONTENT-CONTROL-2026",
    title: "NYC Artist Coalition Meta Business Suite content control",
    organization: "Meta",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated Meta Business Suite review for NYC Artist Coalition, July 14, 2026.",
    publicNote:
      "The current content-management surface was reviewed separately from the historical Page chronology and did not expose a historic human-level publisher field.",
    locator:
      "Meta Business Suite content control for Page asset 1807227006198346; current 90-day view kept separate from the public timeline census.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "a separate current content-management surface",
      "absence of an exposed historic human publisher field in the reviewed control"
    ],
    doesNotEstablish: [
      "that human-level attribution is absent from every native export",
      "the 2017-2021 post denominator",
      "individual authorship or a complete administrator chronology"
    ],
    protectedLocatorId: "FB-NYCARTC-CONTENT-CONTROL-2026-001"
  },
  {
    id: "SRC-FB-NYCARTC-MANAGEMENT-CONTROL-2026",
    title: "NYC Artist Coalition Facebook Page management control",
    organization: "Meta",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated Facebook Page-management control, July 14, 2026.",
    publicNote:
      "Facebook currently lists NYC Artist Coalition among Pages Jamie Burkart manages and states that he has task access to manage it with tools.",
    locator: "Pages Jamie Burkart manages and Manage Page task-access dialog.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [roleMemoryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "Jamie's current Page-management relationship",
      "current task access to manage the Page with tools"
    ],
    doesNotEstablish: [
      "historic exclusive administration",
      "a quantitative share of historic publishing labor",
      "human authorship or publisher identity for any individual post"
    ],
    protectedLocatorId: "FB-NYCARTC-MANAGEMENT-CONTROL-2026-001"
  },
  {
    id: "SRC-FB-NYCARTC-POSTED-URL-INVENTORY-2026",
    title: "NYC Artist Coalition Facebook posted-URL research inventory",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Posted-URL inventory derived from the authenticated NYC Artist Coalition Facebook corpus, July 14, 2026.",
    publicNote:
      "Current cards exposed 64 outbound-link occurrences across 39 unique URLs, including campaign, Council, public-information, press, event, and resource routes.",
    locator:
      "Resolved post-card anchors after Facebook route and tracking cleanup; record-level inventory remains private.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "64 current outbound-link occurrences",
      "39 unique current URLs",
      "campaign, Council, public-information, press, event, and resource routing"
    ],
    doesNotEstablish: [
      "truth of linked content",
      "authorship, readership, endorsement, clicks, conversion, partnership, or outcomes",
      "URLs no longer exposed by the current interface"
    ],
    protectedLocatorId: "FB-NYCARTC-POSTED-URL-INVENTORY-2026-001"
  },
  {
    id: "SRC-JAMIE-NYCARTC-FACEBOOK-PUBLISHING-MEMORY-2026",
    title: "Jamie Burkart first-person NYC Artist Coalition Facebook publishing recollection",
    organization: "Jamie Burkart",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Jamie Burkart first-person recollection recorded for archival research, July 14, 2026.",
    publicNote:
      "Jamie remembers being predominantly the person who used the Page while also remembering that other coalition participants used it.",
    locator: "First-person research intake.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [roleMemoryIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
    supportsGenerally: [
      "Jamie's attributed recollection of predominant Page use",
      "Jamie's explicit shared-use boundary"
    ],
    doesNotEstablish: [
      "the publisher of any specific post",
      "a quantitative share of publishing labor",
      "sole administration, sole authorship, or collaborators' perspectives"
    ],
    protectedLocatorId: "MEMORY-NYCARTC-FACEBOOK-PUBLISHING-2026-001"
  },
  {
    id: "SRC-FB-NYCARTC-CABARET-TRUST-POST",
    title: "NYC Artist Coalition Cabaret Law safety-and-trust post",
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
      "The Page-owned post tags Jamie and Council Member Rafael Espinal while framing repeal as part of rebuilding trust between community spaces and the city.",
    locator: "Public Page photo post and current visible text.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-CABARET-TRUST"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "a public safety-and-trust frame for Cabaret Law repeal",
      "Jamie's named presence in the coalition record",
      "public addressing of a Council member"
    ],
    doesNotEstablish: [
      "the post's human author",
      "sole campaign credit",
      "stakeholder response, endorsement, or legislative causality"
    ]
  },
  {
    id: "SRC-FB-NYCARTC-TALKS-NOT-RAIDS-POST",
    title: "NYC Artist Coalition Talks Not Raids Olympia Kazi post",
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
      "The Page routes readers to TalksNotRaids.com and preserves Olympia Kazi's public campaign voice with her authorship explicit.",
    locator: "Public Page photo post and current visible text.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-TALKS-NOT-RAIDS"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "the Talks Not Raids safety-and-transparency frame",
      "Olympia Kazi's public campaign voice",
      "routing from the Page to the campaign site"
    ],
    doesNotEstablish: [
      "the individual human author of the Page post",
      "that Jamie authored Olympia Kazi's words",
      "policy causality or the later disposition of MARCH"
    ]
  },
  {
    id: "SRC-FB-NYCARTC-COVID-RIGHTS-VIDEO",
    title: "NYC Artist Coalition COVID-19 rent and know-your-rights video",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.facebook.com/nycartc/videos/632085217644541/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition COVID-19 rent and know-your-rights Facebook video.",
    publicNote:
      "The video record documents a practical Q&A route for housing and small-business legal information during COVID-19.",
    locator: "Public Page video and current visible text.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-FB-NYCARTC-COVID-RIGHTS"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "a practical rent and legal-information route during COVID-19",
      "a public comment-and-response support surface"
    ],
    doesNotEstablish: [
      "the individual human author or producer",
      "current legal guidance",
      "unique viewers, service outcomes, adoption, or impact"
    ]
  },
  {
    id: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
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
      "Espinal describes an Agent of Change proposal intended to allocate soundproofing responsibility around new residential construction and new nightlife venues.",
    locator: "Headline, byline, date, proposal description, and limitations.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-CITY-STATE-AGENT-OF-CHANGE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source review"],
    supportsGenerally: [
      "the attributed Agent of Change proposal",
      "a public policy frame balancing residents, cultural venues, and neighborhood change"
    ],
    doesNotEstablish: [
      "enactment or implementation",
      "NYC Artist Coalition authorship of the proposal",
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
      "The Page routed this article as comparative COVID-era cultural-relief context; the article body was not recoverable for close reading in this pass.",
    locator: "Posted URL, destination title, and publisher metadata only.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-SEATTLE-TIMES-ARTS-RELIEF"],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source-routing review"],
    supportsGenerally: ["a posted comparative cultural-relief research lead"],
    doesNotEstablish: [
      "the article's detailed propositions before close reading",
      "a New York City program or NYC Artist Coalition outcome",
      "Jamie's role, authorship, partnership, or impact"
    ]
  }
] satisfies SourceRecord[];

const internalOnly = {
  publicationStatus: "internal-only" as const,
  editorialStatus: "candidate" as const,
  projections: []
};

export const nycArtcFacebookPostClaims = [
  {
    id: "CLM-FB-NYCARTC-POST-POPULATION-2026",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim:
      "Two independent terminal traversals recovered the same 444 currently visible NYC Artist Coalition Facebook post identities from January 29, 2017, through September 15, 2021.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-NYCARTC-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["two exact 444-ID traversals", "current date boundaries"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-CONTENT-CONTROL-2026",
        relationship: "supports-boundary",
        supports: ["separation of the modern content control from the historical denominator"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Completeness is limited to records currently recoverable from the authenticated public Page timeline on July 14, 2026.",
      "Deleted, unpublished, pre-migration-omitted, and otherwise unavailable records are outside the observable population.",
      "This is not a native Meta export or deletion history."
    ],
    antiClaims: [
      "NYC Artist Coalition published exactly 444 Facebook posts in its history.",
      "The current Meta content control is the historical post denominator."
    ],
    researchInquiryIds: ["INQ-FB-NYCARTC-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-PARTICIPATION-ROUTING",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim:
      "The recovered Page record documents a sustained collective publishing and participation system that routed people among events, campaign sites, hearings, public information, press, cultural partners, and practical resources.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-NYCARTC-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["post-form distribution", "multi-year theme and route continuity"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-TALKS-NOT-RAIDS-POST",
        relationship: "corroborating",
        supports: ["one public campaign-voice and campaign-site route"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-COVID-RIGHTS-VIDEO",
        relationship: "corroborating",
        supports: ["one public practical-information route"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is a Page-level collective practice, not an assignment of every post, event, campaign, quotation, or design decision to Jamie.",
      "Routing documents public infrastructure and intent, not readership, conversion, adoption, or impact."
    ],
    antiClaims: [
      "Jamie authored every NYC Artist Coalition Facebook post.",
      "The Page record by itself proves policy impact or organizational outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-STAKEHOLDER-ROUTING",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim:
      "Rule-matched public addressing or routing appeared on 88 records for NYC Council members or the Council, 40 for cultural or nightlife agencies, 39 for cultural or advocacy partners, 13 for business or enforcement agencies, and 12 for press or public-information organizations.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-NYCARTC-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["five-group rule-matched record occurrence distribution"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-CABARET-TRUST-POST",
        relationship: "corroborating",
        supports: ["one public Council-member addressing example"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Counts are record occurrences, not unique people, and categories can overlap.",
      "Tags, mentions, links, quotations, and reshares document public addressing or routing, not verified engagement by the named stakeholder."
    ],
    antiClaims: [
      "Eighty-eight NYC Council members engaged with the Page.",
      "Every referenced stakeholder saw, endorsed, replied to, partnered with, or acted on a post."
    ],
    researchInquiryIds: ["INQ-FB-NYCARTC-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-ENGAGEMENT-SNAPSHOT-2026",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim:
      "On July 14, 2026, 389 of 444 records displayed at least one visible reaction, comment, or share; the mutable counters summed to 2,374 reactions, 212 comments, and 611 shares.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-NYCARTC-POST-CORPUS-2026",
        relationship: "private-support",
        supports: ["dated aggregate visible-interaction floor"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "These are mutable current interface observations and may include attention to reshared material.",
      "They are not unique people, historical reach, attendance, conversion, endorsement, causality, or impact."
    ],
    antiClaims: [
      "The current counters are complete historical engagement analytics.",
      "Visible reactions, comments, or shares prove stakeholder endorsement or public impact."
    ],
    researchInquiryIds: ["INQ-FB-NYCARTC-POST-CORPUS-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-POSTED-URL-ROUTING-2026",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim:
      "The current rendered corpus exposed 64 outbound-link occurrences resolving to 39 unique URLs across coalition campaign, Council, public-information, press, event, and resource routes.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-NYCARTC-POSTED-URL-INVENTORY-2026",
        relationship: "private-support",
        supports: ["64 link occurrences", "39 unique URLs", "route categories"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
        relationship: "context",
        supports: ["one close-read policy-context destination"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020",
        relationship: "supports-boundary",
        supports: ["one metadata-only comparative-relief lead"],
        confidence: "limited",
        renderCitation: false
      }
    ],
    boundaries: [
      "Posted URLs are source-discovery and action-routing leads until their contents are independently reviewed.",
      "A link does not establish authorship, readership, endorsement, clicks, conversion, formal partnership, or outcomes."
    ],
    antiClaims: [
      "Every linked source is true because NYC Artist Coalition posted it.",
      "Every linked organization endorsed or partnered with NYC Artist Coalition."
    ],
    researchInquiryIds: ["INQ-FB-NYCARTC-POSTED-SOURCES-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-NYCARTC-PUBLISHING-ROLE",
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim:
      "Jamie recalls being predominantly the person using NYC Artist Coalition's Facebook Page while other coalition participants also used it; Facebook independently documents only his current Page-management relationship and task access.",
    status: "use-with-care",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-JAMIE-NYCARTC-FACEBOOK-PUBLISHING-MEMORY-2026",
        relationship: "private-support",
        supports: ["Jamie's attributed role recollection and shared-use boundary"],
        confidence: "limited",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-MANAGEMENT-CONTROL-2026",
        relationship: "corroborating",
        supports: ["Jamie's current Page-management relationship and task access"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-CONTENT-CONTROL-2026",
        relationship: "supports-boundary",
        supports: ["absence of exposed historic human-level publisher metadata"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve first-person attribution until a native export, administrator chronology, or collaborator proof notes establish the historic division of labor.",
      "Do not assign any specific post to Jamie without record-level evidence.",
      "Preserve other coalition participants' publishing, authorship, strategy, and campaign credit."
    ],
    antiClaims: [
      "Jamie published or authored all 444 records.",
      "Jamie was the sole Page administrator or sole author of NYC Artist Coalition's public voice.",
      "Current task access proves exclusive historical administration."
    ],
    researchInquiryIds: ["INQ-FB-NYCARTC-PUBLISHING-ROLE-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtcFacebookPostResearchInquiries = [
  {
    id: "INQ-FB-NYCARTC-POST-CORPUS-2026",
    project: "nyc-artist-coalition",
    intakeIds: [corpusIntakeId],
    question:
      "What is the complete current recoverable NYC Artist Coalition Facebook public-post population, and what can its forms, themes, routes, stakeholder references, and visible counters safely establish?",
    methods: [
      "Ran two independent authenticated terminal traversals using distinct scroll cadences.",
      "Compared all 444 stable post identities and required an exact set match.",
      "Classified every retained record by form and primary theme, with multi-label mission and stakeholder rules.",
      "Separated current visible counters, posted URLs, and the modern Meta content control from historical claims."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Both independent traversals recovered the same 444 post identities after 41 and 42 terminal no-addition controls.",
      "The currently visible chronology runs from January 29, 2017, through September 15, 2021.",
      "Every retained record received a public-safe form, primary-theme, route, and visible-counter disposition.",
      "The corpus preserves a sustained collective practice connecting events, campaigns, government, press, cultural partners, and practical resources."
    ],
    limitations: [
      "This is 100 percent coverage of the currently recoverable July 2026 Page surface, not a native export, deletion history, or lifetime total.",
      "Current visible response displays are not unique people, historical reach, attendance, endorsement, causality, or impact.",
      "Page identity and Page-level controls do not identify the human author or publisher of individual historic posts."
    ],
    sourceIds: [
      "SRC-FB-NYCARTC-PROFILE-2026",
      "SRC-FB-NYCARTC-POST-CORPUS-2026",
      "SRC-FB-NYCARTC-CONTENT-CONTROL-2026",
      "SRC-FB-NYCARTC-POSTED-URL-INVENTORY-2026"
    ],
    publicSummary:
      "Two independent traversals reconciled all 444 posts currently recoverable from NYC Artist Coalition's July 2026 public Facebook timeline; deleted, unpublished, and otherwise unavailable records remain outside the observable population.",
    protectedLocatorId: "FB-NYCARTC-POST-CORPUS-2026-001"
  },
  {
    id: "INQ-FB-NYCARTC-PUBLISHING-ROLE-2026",
    project: "nyc-artist-coalition",
    intakeIds: [roleMemoryIntakeId],
    question:
      "What native account records or collaborator proof notes can establish the historical division of NYC Artist Coalition Facebook publishing labor?",
    methods: [
      "Accessioned Jamie's first-person recollection with its explicit shared-use boundary.",
      "Reviewed current Page-management and Meta Business Suite controls for human-level publisher attribution."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "Facebook currently lists NYC Artist Coalition among Pages Jamie manages and gives him task access.",
      "Jamie recalls predominant Page use while explicitly remembering that others also used it.",
      "No inspected surface exposed a historic human publisher field or quantified the division of publishing labor."
    ],
    limitations: [
      "Current task access does not establish historical exclusivity.",
      "Memory does not assign a human publisher to any specific post or quantify a publishing share.",
      "Collaborator perspectives and a native Page export have not yet been recovered."
    ],
    sourceIds: [
      "SRC-JAMIE-NYCARTC-FACEBOOK-PUBLISHING-MEMORY-2026",
      "SRC-FB-NYCARTC-MANAGEMENT-CONTROL-2026",
      "SRC-FB-NYCARTC-CONTENT-CONTROL-2026"
    ],
    publicSummary:
      "Jamie remembers predominant but shared use of the Page; current management access corroborates a relationship to the Page, not historical exclusivity or record-level authorship.",
    protectedLocatorId: "FB-NYCARTC-PUBLISHING-ROLE-2026-001"
  },
  {
    id: "INQ-FB-NYCARTC-POSTED-SOURCES-2026",
    project: "nyc-artist-coalition",
    intakeIds: [corpusIntakeId],
    question:
      "Which destinations posted by NYC Artist Coalition can be recovered, close-read, and promoted from source-discovery leads into independent knowledge-bank sources?",
    methods: [
      "Normalized 64 current outbound-link occurrences into 39 unique URL leads.",
      "Reused existing campaign and press sources where the destination was already in the bank.",
      "Close-read the City & State destination and retained the inaccessible Seattle Times destination at metadata depth."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The route inventory includes coalition domains, Council sources, public information, press, event organizations, and practical resources.",
      "The City & State article is now a close-read policy-context source.",
      "The Seattle Times destination remains a metadata-only comparative-relief lead."
    ],
    limitations: [
      "A posted URL is not automatic corroboration of its propositions.",
      "No route establishes readership, endorsement, clicks, conversion, partnership, or outcomes without additional evidence.",
      "Some current cards may no longer expose their original destinations."
    ],
    sourceIds: [
      "SRC-FB-NYCARTC-POSTED-URL-INVENTORY-2026",
      "SRC-CITY-STATE-AGENT-OF-CHANGE-2018",
      "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"
    ],
    publicSummary:
      "The current Page exposed 39 unique posted URL leads; selected destinations were close-read or retained at explicitly bounded metadata depth.",
    protectedLocatorId: "FB-NYCARTC-POSTED-SOURCES-2026-001"
  }
] satisfies ResearchInquiry[];
