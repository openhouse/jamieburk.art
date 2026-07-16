import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const nycacFacebookEventSources: SourceRecord[] = [
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
    title: "NYC Artist Coalition Facebook Past Events surface",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/nycartc/events",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, Facebook Past Events surface, authenticated review July 15, 2026.",
    publicNote:
      "Repeated authenticated scrolling reached a stable set of 33 event IDs. An earlier authenticated host control displayed 34 past-event slots.",
    supportsGenerally: [
      "33 currently exposed event identities",
      "event chronology and public metadata",
      "34-past-events host control in an earlier authenticated capture"
    ],
    doesNotEstablish: [
      "a complete native Meta owner export",
      "the identity of the unresolved control slot",
      "individual authorship or production",
      "attendance, reach, endorsement, or policy impact"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    title: "NYC Artist Coalition Facebook event public-safe census",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe census of the full NYC Artist Coalition Facebook Past Events population exposed July 15, 2026.",
    publicNote:
      "The metadata-only corpus retains 33 recovered event identities and a disposition for all 34 displayed control slots while excluding raw descriptions and personal or authenticated-session data.",
    supportsGenerally: [
      "33 recovered event records plus one unresolved control slot",
      "24 direct organizer cards and nine allied or cohosted cards",
      "12 recurring meetings including ten named physical cultural spaces",
      "bounded response thresholds",
      "bounded institutional stakeholder-interface patterns",
      "seven posted source-article routes",
      "13 protected outbound-link occurrences withheld by category"
    ],
    doesNotEstablish: [
      "the unresolved event identity",
      "every historical coalition event",
      "individual event authorship or production",
      "physical attendance or unique people",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
    title: "Authenticated NYC Artist Coalition Facebook event research captures",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production review of the NYC Artist Coalition Facebook event population, July 15, 2026.",
    publicNote:
      "Protected captures preserve traversal, detail-page, host-control, and source-route provenance. Raw bodies, personal data, meeting access details, and authenticated state are not published.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026",
    supportsGenerally: [
      "terminal-scroll reconciliation",
      "33 event IDs across authenticated replays",
      "detail-page availability changes",
      "public-safety review"
    ],
    doesNotEstablish: [
      "permission to publish protected capture data",
      "a complete native owner export",
      "physical attendance",
      "individual event authorship",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
    title: "Jamie Burkart first-hand account of NYC Artist Coalition event practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, first-hand account of his contribution to NYC Artist Coalition's event and participation practice, July 15, 2026.",
    publicNote:
      "Jamie identifies the recurring event system as a major coalition contribution and relates it to WOW List, cultural-space listening, artist trust, legislative advocacy, and collective civic action.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026",
    supportsGenerally: [
      "Jamie's first-hand role account",
      "the intended relationship between WOW List and coalition convening",
      "the democracy-lab interpretation as Jamie's perspective"
    ],
    doesNotEstablish: [
      "independent corroboration of every task",
      "sole authorship or production of every event",
      "participant consensus",
      "physical attendance",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
    title: "These Footloose-inspired rebels are fighting NYC's dancing ban",
    organization: "New York Post",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-04-08",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York Post, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' April 8, 2017.",
    publicNote:
      "The June 2017 Cabaret Law hearing event routed participants to this article as public context.",
    supportsGenerally: ["a Cabaret Law article circulated through the event system"],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every article statement",
      "event attendance",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06",
    title:
      "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
    organization: "Gothamist",
    author: "Elizabeth Kim",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-11-06",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
    publicNote:
      "The November 2019 Fair Rent NYC rally event routed participants to this article as public context.",
    supportsGenerally: [
      "a Commercial Rent Stabilization article circulated through the event system"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "coalition endorsement of every article statement",
      "event attendance",
      "policy adoption or causality"
    ]
  }
];

export const nycacFacebookEventClaims: ClaimRecord[] = [
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "The authenticated Facebook Past Events control has a complete disposition: 33 recovered event records and one unresolved historical slot.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The capture-date Facebook control is fully reconciled as 33 recovered event records and one unresolved historical slot.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
        rationale:
          "Keep population accounting in the archival layer; it is provenance, not portfolio headline copy."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: ["34-slot control", "33 recovered events", "one unresolved slot"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
        relationship: "private-support",
        supports: ["authenticated traversal and replay provenance"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is 100 percent control-slot accounting, not a native owner export or proof of every event ever created.",
      "Do not infer title, date, organizer, deletion state, or content for the unresolved slot."
    ],
    antiClaims: [
      "All 34 historical event pages were recovered.",
      "Facebook exposes every NYC Artist Coalition event ever created."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-PARTICIPATION-SYSTEM",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie reports that he helped establish and produce NYC Artist Coalition's recurring participation system, connecting rotating cultural-space meetings, practical support, public actions, and civic pathways.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Jamie reports that, beginning in 2017, he helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, meetings rotating through small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings that connected artists' lived experience with civic pathways.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/nyc-artist-coalition"],
        rationale:
          "This is the clearest bounded description of Jamie's operating contribution; attribution and collective-credit language preserve the evidence boundary."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        relationship: "private-support",
        supports: ["Jamie's first-hand description of his contribution and intent"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "the recurring event system existed",
          "rotating cultural-space meetings",
          "practical sessions, public actions, hearings, and relief convenings"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-GOTHAMIST-2017-06-19",
        relationship: "corroborating",
        supports: [
          "Jamie's coalition role",
          "fire-code study-group organizing",
          "City Hall advocacy"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-NPR-2017-09-20",
        relationship: "corroborating",
        supports: ["Jamie's founding coalition role", "public advocacy"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
        relationship: "context",
        supports: [
          "Jamie's public cultural-space framing",
          "WOW List as community event infrastructure"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The event pages establish the collective system, not Jamie's authorship or production of every event.",
      "Policy outcomes, programs, hosting, and campaign accomplishments remain collective.",
      "Facebook response labels are not attendance, unique people, reach, endorsement, mandate, or impact."
    ],
    antiClaims: [
      "Jamie solely produced every NYC Artist Coalition event.",
      "Jamie alone caused Cabaret Law repeal, Office of Nightlife creation, or another policy outcome.",
      "Facebook responses equal attendance or unique reach."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
    project: "nyc-artist-coalition",
    internalClaim:
      "Thirty-two recovered event pages retain bounded historical Facebook response labels, with 19 at or above 100 responses, seven at or above 500, and three at or above 1,000.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Thirty-two recovered pages retain dated Facebook response labels; the values remain event-level interface signals only.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "The thresholds are useful archival context but add ambiguity rather than hiring clarity on the public site."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: ["response-label coverage and thresholds"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not sum the labels into people reached.",
      "Do not treat them as attendance, unique people, reach, endorsement, conversion, mandate, or impact.",
      "Three displayed values were rounded in thousands and people may recur across events."
    ],
    antiClaims: [
      "The events reached 9,989 people.",
      "Facebook responses verify physical attendance."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-SOURCE-ROUTES",
    project: "nyc-artist-coalition",
    internalClaim:
      "Recovered event descriptions routed participants to seven mission-relevant published articles spanning Cabaret Law repeal, M.A.R.C.H. enforcement, and Commercial Rent Stabilization.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Recovered event descriptions routed participants to seven published articles across Cabaret Law, M.A.R.C.H., and commercial-rent work.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
        rationale:
          "Preserve source circulation in the bank without turning linked reporting into endorsement or accomplishment evidence."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: ["seven event-to-article routes"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted link establishes a source route, not endorsement of every article statement.",
      "Article-level claims require separate close reading and source-specific evidence."
    ],
    antiClaims: [
      "Every host or participant endorsed every linked article.",
      "Linking an article proves that Jamie authored or was quoted in it."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ARTICLE-CLOSE-READING"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-FACEBOOK-EVENT-STAKEHOLDER-INTERFACES",
    project: "nyc-artist-coalition",
    internalClaim:
      "Recovered public event metadata documents repeated event-level interfaces across cultural spaces, city government, advocacy organizations, and allied cultural groups.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Public event metadata documents repeated interfaces among cultural spaces, city government, advocacy organizations, and allied cultural groups.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"],
        rationale:
          "Keep the cross-sector operating pattern in the archival layer while avoiding endorsement, attendance, or personal-impact claims."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "15 government-interface classifications",
          "public organizer, cohost, and venue displays",
          "institutional names retained in the public-safe corpus"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "An organizer, cohost, venue, or event appearance establishes only an event-level interface.",
      "It does not establish endorsement of Jamie, attendance, agreement, partnership beyond the event, or policy causality.",
      "Names not retained in the public-safe corpus require separate source records before publication."
    ],
    antiClaims: [
      "Every named institution endorsed Jamie or every coalition position.",
      "An event listing proves a continuing partnership or policy result."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie interprets the recurring cultural-space event practice as a democracy lab: events as an art form and a way to believe artists, listen for civic pain, and translate between cultural and government systems.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie describes the recurring event practice as a democracy lab and a form of civic listening.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain the living interpretation in the bank until participant accounts or a dedicated essay can carry it without presenting it as a measured outcome."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        relationship: "private-support",
        supports: ["Jamie's attributed interpretation"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "context",
        supports: ["the recurring civic and cultural event pattern being interpreted"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is Jamie's interpretation, not a measured effect or participant consensus.",
      "Do not convert metaphor into evidence of policy causality."
    ],
    antiClaims: [
      "Artists' accounts were the final word in government decisions.",
      "The event series alone transformed city policy."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy
  }
];

export const nycacFacebookEventInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
    project: "nyc-artist-coalition",
    question:
      "What event history would a native Meta owner export add, including the unresolved control slot and events removed before the live capture?",
    methods: [
      "Repeated authenticated scrolling to a stable terminal event-ID set.",
      "Reconciled the live index against the earlier 34-slot host control.",
      "Compared event-detail availability across authenticated captures."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All 33 event identities exposed by the current index were recovered.",
      "One of 34 displayed historical control slots remains unresolved.",
      "A later replay re-found all 33 IDs while five detail routes were temporarily unavailable."
    ],
    limitations: [
      "The live surface is not a native owner export.",
      "Events removed before the capture date may not be represented.",
      "No metadata is inferred for the unresolved slot."
    ],
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"
    ],
    publicSummary:
      "The capture-date Facebook control is fully reconciled as 33 recovered event records plus one unresolved slot; a native owner export is still needed for historical completeness.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
    project: "nyc-artist-coalition",
    question:
      "Which event-level production tasks, collaborator roles, participant accounts, and independent attendance records can further specify the recurring participation system?",
    methods: [
      "Separated Jamie's first-hand role account from independently recoverable event metadata.",
      "Cross-read existing public reporting that names Jamie's coalition, safety-study, and City Hall advocacy roles.",
      "Held Facebook response labels outside physical-attendance claims."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The public event sequence independently establishes a recurring collective participation system.",
      "Public reporting identifies Jamie as a founding coalition member and documents specific safety-study and City Hall advocacy work.",
      "Jamie's broader event-production account remains first-person and is not yet mapped event by event."
    ],
    limitations: [
      "A complete production roster and page-administration history were not recovered.",
      "Facebook response labels do not establish physical attendance.",
      "Participant and collaborator testimony should be invited with consent."
    ],
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-GOTHAMIST-2017-06-19",
      "SRC-NYCAC-NPR-2017-09-20",
      "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"
    ],
    publicSummary:
      "The public record establishes the collective event system and specific Jamie roles; Jamie's broader production account remains attributed and bounded pending event-level corroboration.",
    protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026"
  },
  {
    id: "INQ-NYCAC-FACEBOOK-EVENT-ARTICLE-CLOSE-READING",
    project: "nyc-artist-coalition",
    question:
      "Which bounded historical or accomplishment claims, if any, should be promoted after close reading the seven articles routed through event descriptions?",
    methods: [
      "Recovered and normalized seven event-to-article routes from the public-safe event census.",
      "Matched five routes to the existing campaign press corpus.",
      "Created source records for the two previously unrecorded articles."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The routes span Cabaret Law repeal, M.A.R.C.H. enforcement, and Commercial Rent Stabilization.",
      "All seven destinations have a typed source record.",
      "The event-to-source circulation pattern is established independently of article-level claim promotion."
    ],
    limitations: [
      "A posted link does not imply endorsement, authorship, partnership, attendance, or policy causality.",
      "The two new article records are routed context and have not been promoted as personal accomplishment evidence.",
      "Article-level propositions require separate close reading and source-specific claim relationships."
    ],
    sourceIds: [
      "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
      "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE",
      "SRC-PRESS-LND-METRO-NY-CABARET",
      "SRC-PRESS-LND-NEW-YORKER-2017-07-03",
      "SRC-PRESS-TNR-BAFFLER-CUT-THE-MUSIC",
      "SRC-PRESS-FAIR-CURBED-RENT-STABILIZATION-2019-11-08",
      "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
    ],
    publicSummary:
      "Seven event-to-article routes are preserved as source circulation; article-level claim promotion remains a separate close-reading task."
  }
];

export const nycacFacebookEventIntake: IntakeRecordInput[] = [
  {
    id: "INT-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "NYC Artist Coalition Facebook Past Events full-population pass",
    description:
      "Authenticated archival production over every slot in the capture-date Past Events control, including event metadata, mission classifications, source routes, stakeholder interfaces, and bounded response labels.",
    whyItMatters:
      "The record makes the coalition's recurring participation system inspectable without publishing private descriptions, attendee data, meeting access details, or authenticated state.",
    projectIds: ["nyc-artist-coalition", "fair-rent-nyc"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Population, source-route, stakeholder-interface, response-boundary, and participation-system claims were created; one bounded role claim was selected for the FairRentNYC case study.",
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
      "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE",
      "SRC-PRESS-LND-METRO-NY-CABARET",
      "SRC-PRESS-LND-NEW-YORKER-2017-07-03",
      "SRC-PRESS-TNR-BAFFLER-CUT-THE-MUSIC",
      "SRC-PRESS-FAIR-CURBED-RENT-STABILIZATION-2019-11-08",
      "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
    ],
    claimIds: [
      "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      "CLM-NYCAC-FACEBOOK-EVENT-SOURCE-ROUTES",
      "CLM-NYCAC-FACEBOOK-EVENT-STAKEHOLDER-INTERFACES"
    ],
    inquiryIds: [
      "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
      "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
      "INQ-NYCAC-FACEBOOK-EVENT-ARTICLE-CLOSE-READING"
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json",
      "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.manifest.json",
      "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
      "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-events-full-population.md"
    ],
    boundaries: [
      "Treat this as 100 percent control-slot accounting, not a native owner export or proof of every event ever created.",
      "Do not convert response labels into attendance, unique people, reach, endorsement, mandate, or impact.",
      "Do not assign shared-event authorship or production to Jamie without source-specific evidence.",
      "Keep raw descriptions, identities, comments, contacts, credentials, working-document locators, and authenticated state out of the public repository."
    ]
  },
  {
    id: "INT-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026",
    receivedAt: reviewedAt,
    kind: "public-safe-memory",
    visibility: "protected-summary",
    title: "Jamie's account of NYC Artist Coalition event practice",
    description:
      "Jamie's first-person account connects WOW List's participation ethos with recurring cultural-space meetings, practical support, legislative advocacy, and collective civic action.",
    whyItMatters:
      "It preserves the operating intention and human meaning of the event system while keeping the public claim attributed and collective.",
    projectIds: ["nyc-artist-coalition", "wowlist"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "The attributed participation-system claim was selected; democracy-lab and events-as-art interpretations remain held in the bank.",
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-GOTHAMIST-2017-06-19",
      "SRC-NYCAC-NPR-2017-09-20",
      "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"
    ],
    claimIds: [
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
    ],
    inquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    artifactPaths: [
      "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md"
    ],
    boundaries: [
      "Jamie's account is evidence of his perspective and recalled role, not independent proof of every event-level task.",
      "Democracy-lab, city-nervous-system, events-as-art, and believing-artists language stays attributed to Jamie.",
      "Collective event and policy credit remains explicit."
    ]
  }
];
