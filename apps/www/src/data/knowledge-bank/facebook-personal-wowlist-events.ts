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

export const facebookPersonalWowListEventSources: SourceRecord[] = [
  {
    id: "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
    title: "Jamie Burkart Facebook Past Events surface",
    author: "Jamie Burkart profile",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected review of Jamie Burkart's authenticated Facebook Past Events surface, July 16, 2026.",
    publicNote:
      "The capture-date interface exposed 511 cards representing 502 distinct base event IDs. Twenty cards explicitly identified Jamie as organizer; 491 were profile-associated only.",
    supportsGenerally: [
      "capture-date Past Events card population",
      "explicit organizer versus profile-associated classification",
      "event IDs, dates, titles, organizer displays, and recurring instances"
    ],
    doesNotEstablish: [
      "a complete Meta account-owner export",
      "attendance, interest, authorship, production, support, or endorsement for profile-associated cards",
      "deleted or hidden historical events",
      "event outcomes"
    ]
  },
  {
    id: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
    title: "Personal and WOW List Facebook events minimized public ledger",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe minimized ledger of Jamie Burkart and WOW List Facebook event surfaces, July 16, 2026.",
    publicNote:
      "The ledger publishes aggregate reconciliation, integrity digests, 14 selected organizer records, bounded response labels, a current WOW List surface finding, and explicit anti-inference rules. The complete personal index remains protected.",
    supportsGenerally: [
      "511 personal Past Events cards and 502 base event IDs",
      "20 explicit organizer records and 491 profile-associated records",
      "one unresolved count discrepancy against a separate 21-past-events host control",
      "17 explicit organizer pages with displayed response labels",
      "current WOW List zero-card and no-Events-section finding",
      "bounded capture-date event accounting"
    ],
    doesNotEstablish: [
      "an all-ever account-owner archive",
      "a missing event record or a shared denominator between the separate host controls",
      "attendance, unique people, stakeholder identity, reach, endorsement, conversion, mandate, or impact",
      "historical absence of WOW List Facebook events"
    ]
  },
  {
    id: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-CAPTURE-2026",
    title: "Authenticated personal and WOW List Facebook event capture",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Protected authenticated capture supporting the July 16, 2026 personal and WOW List Facebook event review.",
    publicNote:
      "The protected record preserves the full 511-card index and 20 organizer-detail audits. Its locator, bulk personal metadata, raw descriptions, participant context, and authenticated state are not published.",
    supportsGenerally: [
      "full index reconciliation",
      "explicit organizer-detail review",
      "integrity digest generation",
      "public-safety minimization"
    ],
    doesNotEstablish: [
      "permission to publish the complete personal index",
      "a native Meta owner export",
      "attendance or event outcomes"
    ]
  },
  {
    id: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100!",
    organization: "Sunday Dinner",
    author: "Jamie Burkart Facebook event host",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2014-03-09",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/702417306475691/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Sunday Dinner, 'SUNDAY DINNER Turns 100!,' Facebook event hosted by Jamie Burkart, March 9, 2014.",
    publicNote:
      "The authenticated event page identifies Jamie as host and displays 21 responses.",
    supportsGenerally: [
      "a public Sunday Dinner event titled as a 100th-event milestone",
      "March 9, 2014 event date",
      "Jamie displayed as host",
      "21-response platform display"
    ],
    doesNotEstablish: [
      "an independently audited count of 100 completed gatherings",
      "physical attendance",
      "unique people, reach, endorsement, or impact",
      "the separate 300-plus gathering claim"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
    title: "WOW List Facebook current events surface",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected review of the authenticated WOW List Facebook events surface, July 16, 2026.",
    publicNote:
      "One authenticated rendering exposed no event-detail anchors and no Events profile section. It displayed 185 followers, two following, the project's public statement, and routes to wowlist.org.",
    supportsGenerally: [
      "current zero-card Events rendering",
      "current absence of an Events profile section",
      "dated public profile metadata and routes"
    ],
    doesNotEstablish: [
      "that WOW List never created Facebook events",
      "a complete Page owner export",
      "historical reach, adoption, or event activity",
      "follower conversion or impact"
    ]
  },
  {
    id: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
    title: "Artists Turned Huck Finn, Part III",
    organization: "The Pitch",
    author: "Eric Barton",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-11-12",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Eric Barton, 'Artists Turned Huck Finn, Part III,' The Pitch, November 12, 2007.",
    publicNote:
      "The article names Jamie Burkart and Libby Hendon, reports that they spent weeks building a recycled-material raft for a Kansas City-to-Gulf journey, and says the group had traveled more than 1,000 miles before a Coast Guard interruption.",
    supportsGenerally: [
      "Jamie Burkart and Libby Hendon's participation",
      "their weeks spent constructing the recycled-material raft",
      "the expedition's public title",
      "a Kansas City-to-Gulf project intention",
      "more than 1,000 miles traveled by the group before the reported interruption",
      "a recycled-material raft"
    ],
    doesNotEstablish: [
      "a complete participant roster",
      "every route stop",
      "the later Gulf terminus",
      "Jamie's sole authorship or execution"
    ]
  }
];

export const facebookPersonalWowListEventClaims: ClaimRecord[] = [
  {
    id: "CLM-FACEBOOK-PERSONAL-EVENT-POPULATION",
    project: "participatory-public-practice",
    internalClaim:
      "The authenticated personal Past Events surface exposed 511 cards representing 502 distinct base event IDs, with 20 explicit Jamie-organizer records and 491 profile-associated records.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The capture-date personal Past Events surface is reconciled as 511 cards, 502 base event IDs, 20 explicit Jamie-organizer records, and 491 profile-associated records.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events"
        ],
        rationale:
          "Keep population provenance in the archival layer rather than turning profile association into portfolio scale."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
        relationship: "direct-support",
        supports: [
          "card and event-ID counts",
          "explicit organizer versus profile association",
          "host-control difference"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-CAPTURE-2026",
        relationship: "private-support",
        supports: ["full index and derivation provenance"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is complete accounting for the capture-date card surface, not an all-ever owner export.",
      "Profile association is not attendance, interest, authorship, production, support, or endorsement.",
      "The one-count discrepancy against the separate 21-past-events host display remains unresolved; the controls may not count the same unit, population, or interface state."
    ],
    antiClaims: [
      "Jamie attended or organized all 511 events.",
      "Facebook exposes every event in Jamie's history.",
      "The unresolved host-control event can be inferred."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-PERSONAL-WOWLIST-OWNER-EXPORTS"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FACEBOOK-JAMIE-ORGANIZER-PRACTICE",
    project: "participatory-public-practice",
    internalClaim:
      "Twenty capture-date Facebook cards explicitly identify Jamie as organizer between December 2006 and February 2017; selected public records span participatory art, waterways and mobility, small-space performance, communal meals, media discussion, and civic gathering.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Twenty surviving Facebook event records explicitly identify Jamie as organizer across a 2006-2017 participatory event practice.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events",
          "docs/knowledge-bank/projects/participatory-public-practice"
        ],
        rationale:
          "Preserve the long-running public-practice throughline without adding a low-context social count to the hiring site."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
        relationship: "direct-support",
        supports: [
          "20 explicit organizer records",
          "2006-2017 range",
          "14 selected mission-relevant public event routes"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The surviving cards are not a complete lifetime event denominator.",
      "Six ordinary-life organizer records remain outside the public selected ledger.",
      "An organizer card does not establish attendance, response identity, or event outcome."
    ],
    antiClaims: [
      "Jamie organized only 20 events in his life.",
      "Every profile-associated event was Jamie's work.",
      "Every event achieved its stated purpose."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SUNDAY-DINNER-FACEBOOK-100TH-MILESTONE",
    project: "196-sunday-dinner",
    internalClaim:
      "A March 9, 2014 Facebook event titled 'SUNDAY DINNER Turns 100!' identifies Jamie as host and displays 21 responses.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A March 9, 2014 Facebook event identifies Jamie as host and publicly marks Sunday Dinner's 100th-event milestone.",
        status: "active",
        citationRequired: true,
        surfaces: [
          "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events"
        ],
        rationale:
          "Use as a dated public chronology marker; do not treat the event title as an independently audited count."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
        relationship: "direct-support",
        supports: ["event title", "date", "Jamie host display", "response display"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The 100th-event language is the event's public title, not an independent audit.",
      "The 21-response display is not attendance or unique reach.",
      "This event does not prove the separate 300-plus gathering claim."
    ],
    antiClaims: [
      "Facebook independently verified 100 completed Sunday Dinners.",
      "Twenty-one people attended.",
      "This page proves 300-plus gatherings."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FACEBOOK-JAMIE-ORGANIZER-RESPONSE-SIGNALS",
    project: "participatory-public-practice",
    internalClaim:
      "Seventeen of 20 explicit organizer pages displayed a Facebook response count; six displayed at least 20 responses and the largest display was 119.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Seventeen explicit organizer pages retain dated response labels; the values remain event-level interface signals only.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "The pattern is useful research context but not a clear accomplishment or audience measure."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
        relationship: "direct-support",
        supports: ["response-label coverage and thresholds"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not sum response labels.",
      "Do not treat them as attendance, unique people, stakeholder identity, reach, endorsement, conversion, mandate, or impact.",
      "Three pages did not expose a response label in the reviewed render."
    ],
    antiClaims: [
      "The events reached the sum of their response labels.",
      "Facebook responses verify attendance or impact."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FACEBOOK-PROFILE-ASSOCIATION-STAKEHOLDER-LEADS",
    project: "participatory-public-practice",
    internalClaim:
      "Selected public institutions and civic or cultural organizations recur as organizer displays among Jamie's 491 profile-associated event cards.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text:
          "Selected recurring organizer displays are retained as event-level research leads, not engagement claims.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "An event card surfaced through the profile is too ambiguous for public relationship or traction messaging."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-CAPTURE-2026",
        relationship: "context",
        supports: ["selected organizer-display card counts"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Organizer displays are retrieval leads only.",
      "They do not prove Jamie attended, organized, supported, partnered with, or was endorsed by the named person or institution.",
      "Promotion requires event-level role and source evidence."
    ],
    antiClaims: [
      "Every recurring organizer engaged with Jamie.",
      "The profile surface proves institutional partnership or endorsement."
    ],
    researchInquiryIds: ["INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-CURRENT-RENDER-GAP",
    project: "wowlist",
    internalClaim:
      "One authenticated rendering of the current WOW List Facebook page exposed zero event-detail anchors and no Events section; its historical Facebook event population remains unresolved.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "One July 16, 2026 rendering of WOW List's current Facebook page exposed no Events section; historical Facebook event activity remains an owner-export and web-archive inquiry.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events",
          "docs/knowledge-bank/projects/wowlist"
        ],
        rationale:
          "Record the dated interface observation without turning one authenticated rendering into a stable current-state or historical claim."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
        relationship: "direct-support",
        supports: ["current zero-card render and absent Events section"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
        relationship: "corroborating",
        supports: ["capture and disposition details"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Current absence does not establish historical absence.",
      "A single authenticated render can vary with lazy loading, permissions, personalization, locale, and platform interface changes.",
      "Follower and following displays are dated volatile metadata and held from accomplishment messaging.",
      "The existing database and public-account corpora remain stronger evidence of WOW List event practice."
    ],
    antiClaims: [
      "WOW List never created Facebook events.",
      "The current page is a complete Page owner archive.",
      "Follower counts prove adoption or impact."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-HISTORICAL-EVENTS"],
    reviewedAt,
    reviewedBy
  }
];

export const facebookPersonalWowListEventInquiries: ResearchInquiry[] = [
  {
    id: "INQ-FACEBOOK-PERSONAL-WOWLIST-OWNER-EXPORTS",
    project: "participatory-public-practice",
    question:
      "What would Jamie's Meta account-owner export and the WOW List Page export add to the capture-date event populations?",
    methods: [
      "Parsed every card exposed by the authenticated personal Past Events surface.",
      "Reviewed the current WOW List Events surface and profile sections.",
      "Reconciled the personal index against a separate host-control display."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The personal surface exposed 511 cards and 502 base event IDs.",
      "Twenty cards explicitly identified Jamie as organizer.",
      "A one-count discrepancy remains unresolved against the separate 21-past-events host display; no missing record is inferred.",
      "The current WOW List surface exposed no Events section."
    ],
    limitations: [
      "Neither live surface is a native owner export.",
      "Deleted, hidden, removed, or older records may be absent.",
      "The current WOW List zero-card render cannot establish historical absence."
    ],
    sourceIds: [
      "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
      "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
      "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026"
    ],
    publicSummary:
      "The capture-date cards are fully dispositioned, while all-ever history and the one-count discrepancy between separate host controls remain owner-export questions."
  },
  {
    id: "INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES",
    project: "participatory-public-practice",
    question:
      "Which selected organizer and profile-associated event records can be strengthened with programs, venue records, collaborator accounts, attendance evidence, and independent reporting?",
    methods: [
      "Reviewed all 20 explicit organizer detail routes.",
      "Published only 14 selected mission-relevant records.",
      "Searched selected event titles and close-read one recovered independent article.",
      "Held organizer-display counts as research leads."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The selected organizer record spans multiple participatory formats from 2006 through 2017.",
      "The 2014 Sunday Dinner event supplies a dated public 100th-milestone title.",
      "The 2007 Pitch article supplies an independent mid-journey raft checkpoint.",
      "No external article anchors were exposed on the 20 reviewed event renders."
    ],
    limitations: [
      "Event pages do not establish outcomes or complete production credit.",
      "Response displays do not establish attendance or stakeholder identity.",
      "Profile-associated cards do not establish participation or relationship."
    ],
    sourceIds: [
      "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"
    ],
    publicSummary:
      "Selected organizer events now have a bounded public ledger, one Sunday Dinner milestone source, and one newly matured raft article; event-level role and outcome research remains open."
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-HISTORICAL-EVENTS",
    project: "wowlist",
    question:
      "Did WOW List create, host, cohost, or circulate Facebook events that are no longer exposed on its current Page surface?",
    methods: [
      "Reviewed the current WOW List Events route and all visible profile-section labels.",
      "Inventoried current public profile routes and metadata.",
      "Kept current surface absence separate from historical absence."
    ],
    runAt: reviewedAt,
    resultStatus: "open",
    findings: [
      "The current page exposed zero event-detail anchors.",
      "No Events profile section was visible.",
      "The page still identifies WOW List as an event-sharing and community-building project."
    ],
    limitations: [
      "No native Page owner export was reviewed.",
      "No historical Facebook Events index capture was recovered in this pass.",
      "The current page cannot answer the historical population question."
    ],
    sourceIds: ["SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026"],
    publicSummary:
      "The current WOW List Page preserves project identity but no event index; historical Facebook event activity remains unresolved."
  }
];

export const facebookPersonalWowListEventIntake: IntakeRecordInput[] = [
  {
    id: "INT-FACEBOOK-PERSONAL-WOWLIST-EVENTS-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "Personal and WOW List Facebook events full-population pass",
    description:
      "Authenticated archival production over every personal Past Events card, all explicit organizer detail routes, and the current WOW List Events surface.",
    whyItMatters:
      "The record develops Jamie's long-running event-production and participatory-practice evidence while preventing profile association, response labels, and current platform absence from becoming inflated claims.",
    projectIds: [
      "participatory-public-practice",
      "196-sunday-dinner",
      "wowlist",
      "waterways-participatory-practice"
    ],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created bounded population, organizer-practice, Sunday Dinner milestone, response-signal, stakeholder-lead, and WOW List preservation claims; no new hiring-site projection was selected.",
    sourceIds: [
      "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
      "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-LEDGER-2026",
      "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-CAPTURE-2026",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026",
      "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"
    ],
    claimIds: [
      "CLM-FACEBOOK-PERSONAL-EVENT-POPULATION",
      "CLM-FACEBOOK-JAMIE-ORGANIZER-PRACTICE",
      "CLM-SUNDAY-DINNER-FACEBOOK-100TH-MILESTONE",
      "CLM-FACEBOOK-JAMIE-ORGANIZER-RESPONSE-SIGNALS",
      "CLM-FACEBOOK-PROFILE-ASSOCIATION-STAKEHOLDER-LEADS",
      "CLM-WOWLIST-FACEBOOK-CURRENT-RENDER-GAP",
      "CLM-WATERWAYS-RAFT-EXPEDITION"
    ],
    inquiryIds: [
      "INQ-FACEBOOK-PERSONAL-WOWLIST-OWNER-EXPORTS",
      "INQ-FACEBOOK-SELECTED-EVENT-ROLE-SOURCES",
      "INQ-WOWLIST-FACEBOOK-HISTORICAL-EVENTS"
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.json",
      "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.manifest.json",
      "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events.md",
      "docs/knowledge-bank/runs/2026-07-16-facebook-personal-wowlist-events.md"
    ],
    boundaries: [
      "The complete personal event index remains protected.",
      "Profile association is not participation, authorship, support, or endorsement.",
      "Current WOW List interface absence is not historical absence.",
      "Response labels remain event-level interface signals only."
    ]
  }
];
