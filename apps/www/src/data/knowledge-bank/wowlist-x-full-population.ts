import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated WOW List archival review"
];

export const wowListFullPopulationSources: SourceRecord[] = [
  {
    id: "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
    title: "Public-safe WOW List database aggregate review",
    organization: "WOW List",
    author: "Codex archive review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "private",
    capturedAt: "2017-07-22",
    accessedAt: "2026-07-06",
    publicCitation:
      "Aggregate structural review of the WOW List production database snapshot dated July 22, 2017.",
    publicNote:
      "A read-only review counted 1,846 users and 16,142 post/event records; a conservative geography analysis supported 35 or more active city scenes. Person-level rows, contact information, follows, stars, geolocation rows, and raw records remain unpublished.",
    protectedLocatorId: "ARCHIVE-WOWLIST-DATABASE-SNAPSHOT-2017",
    supportsGenerally: [
      "1,846 user records in the snapshot",
      "16,142 post/event records in the snapshot",
      "a conservative 35-plus active-city-scene interpretation"
    ],
    doesNotEstablish: [
      "current platform activity",
      "35 official chapters",
      "one active organizer in every scene",
      "that every post/event record represents a completed public event",
      "Jamie's sole responsibility for adoption"
    ]
  },
  {
    id: "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026",
    title: "Public-safe WOW List technical archive review",
    organization: "WOW List",
    author: "Codex archive review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "private",
    capturedAt: "2026-07-06",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe structural review of WOW List code, project documentation, and approved resume language, July 2026.",
    publicNote:
      "The review supports Jamie's co-builder and product-operator role and identifies Django, PostgreSQL/PostGIS, Ember, natural-language event entry, weekly email digests, embeddable calendars, and low-cost organizer deployment. Raw code archives and private operational records remain outside the public repository.",
    protectedLocatorId: "ARCHIVE-WOWLIST-TECHNICAL-REVIEW-2026",
    supportsGenerally: [
      "Jamie's co-builder and product-operator role",
      "Django and PostgreSQL/PostGIS backend architecture",
      "Ember client architecture",
      "natural-language event entry",
      "weekly email digests and embeddable calendars",
      "organizer-facing deployment"
    ],
    doesNotEstablish: [
      "Jamie's authorship of every line or feature",
      "sole product ownership",
      "current platform availability",
      "that every archived feature shipped unchanged or remained active"
    ]
  },
  {
    id: "SRC-WOWLIST-X-CORPUS-2026-07-15",
    title: "WOW List complete profile-reported public timeline corpus",
    author: "Codex authenticated browser review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-15T00:56:07-04:00",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/wowlist/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated item-level review of the replies-inclusive @wowlist timeline, July 15, 2026.",
    publicNote:
      "Three overlapping complete passes reconciled all 38 profile-reported posts to 38 distinct canonical status IDs. The repository preserves the raw public capture, deterministic derivation, corpus, and manifest without authenticated-session identity.",
    supportsGenerally: [
      "the complete profile-reported public population recoverable on the capture date",
      "22 authored posts and 16 reposts",
      "35 posted short-URL occurrences resolved to their immediate destinations",
      "three recovered public product-support conversations",
      "organizer-use, civic-care, field-learning, and dated visible-engagement patterns"
    ],
    doesNotEstablish: [
      "deleted, hidden, private, or otherwise unavailable activity",
      "the author of every project-account post",
      "complete platform adoption or impact",
      "current availability of historical destinations",
      "attendance, fundraising results, or policy causation"
    ]
  },
  {
    id: "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    organization: "Grasstronaut",
    author: "Elise Granata",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: reviewedAt,
    canonicalUrl: "https://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl:
      "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015.",
    publicNote:
      "WOW List linked this field-context article. It describes practical infrastructure for all-ages venues; it is not evidence Jamie authored the guide or article.",
    supportsGenerally: [
      "contemporaneous field learning about all-ages venue operations",
      "organization, promotion, production, space, fundraising, community-building, and conflict-resolution concerns"
    ],
    doesNotEstablish: [
      "Jamie's authorship of the article or guide",
      "WOW List product adoption",
      "attendance at a particular event"
    ]
  },
  {
    id: "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015",
    title: "Zines 2.0",
    organization: "Good Times",
    author: "Elise Granata",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl:
      "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation:
      "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015.",
    publicNote:
      "WOW List surfaced this article as field context. The archived body argues for self-authored DIY archives and connective infrastructure but does not mention WOW List.",
    supportsGenerally: [
      "contemporaneous DIY-archive concerns",
      "the field need for self-authored documentation and connective infrastructure"
    ],
    doesNotEstablish: [
      "press coverage of WOW List",
      "Jamie's authorship or participation",
      "WOW List adoption or impact"
    ]
  },
  {
    id: "SRC-WOWLIST-MEMBER-TUTORIAL-2015",
    title: "SHELBY'S WOWLIST TUTORIAL",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.youtube.com/watch?v=nQg47LtixPI",
    preferredPublicUrl: "canonical",
    publicCitation: "Public member-made WOW List tutorial linked by the project account in August 2015.",
    publicNote:
      "The project account thanked a member for making the tutorial and linked its join flow. The video is contextual evidence of user-created onboarding, not a complete adoption measure.",
    supportsGenerally: ["user-created onboarding", "public product learning"],
    doesNotEstablish: ["platform-wide adoption", "the number of users helped", "Jamie's authorship of the tutorial"]
  },
  {
    id: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
    title: "Allied Media Conference",
    organization: "Allied Media Projects",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live-and-archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://alliedmedia.org/amc",
    archiveUrl:
      "https://web.archive.org/web/20150619210442/https://www.alliedmedia.org/amc",
    preferredPublicUrl: "archive",
    publicCitation: "Allied Media Conference public information and archived June 2015 conference context.",
    publicNote:
      "The WOW List account announced that the project would be at the June 18-21, 2015 conference. The evidence supports an announced plan, not confirmed attendance or a presenter role.",
    supportsGenerally: ["the public conference context for a WOW List participation announcement"],
    doesNotEstablish: ["confirmed attendance", "a session title", "a presenter role", "attendance totals"]
  },
  {
    id: "SRC-WOWLIST-POPULAR-VOTE-2016",
    title: "popular.vote civic-calendar destination",
    organization: "popular.vote",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://popular.vote/",
    archiveUrl: "https://web.archive.org/web/20161211233030/http://popular.vote/",
    preferredPublicUrl: "archive",
    publicCitation: "Archived popular.vote civic-calendar destination linked by WOW List in November 2016.",
    publicNote:
      "The account described this as a place to add and receive updates on marches, meetings, and local connection after the 2016 election.",
    supportsGenerally: ["a civic-calendar reuse pattern", "post-election event and meeting distribution"],
    doesNotEstablish: ["measured participation", "Jamie's authorship of the destination", "policy outcomes"]
  },
  {
    id: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
    title: "Meow Wolf DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live-and-archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.meowwolf.com/diy",
    archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    preferredPublicUrl: "archive",
    publicCitation: "Meow Wolf DIY Fund public page, linked through a post reposted by WOW List in January 2017.",
    publicNote:
      "The repost places the account within a peer ecosystem supporting DIY arts and music spaces; it is not evidence that Jamie created or administered the fund.",
    supportsGenerally: ["peer infrastructure for DIY arts and music spaces", "field curation by the project account"],
    doesNotEstablish: ["a formal partnership", "Jamie's administration of the fund", "funding received by WOW List"]
  },
  {
    id: "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
    title: "Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland",
    organization: "KQED",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-07",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.youtube.com/watch?v=g7zIdDeRVjU",
    preferredPublicUrl: "canonical",
    publicCitation: "KQED video of an Oakland Ghost Ship vigil, linked by WOW List in December 2016.",
    publicNote:
      "The account paired the video with vigil and relief links. This supports a care-and-mutual-aid communication pattern, not authorship of the reporting or relief campaign.",
    supportsGenerally: ["mourning and relief communication after the Ghost Ship fire"],
    doesNotEstablish: ["Jamie's authorship of the report", "fundraising totals", "attendance caused by WOW List"]
  }
];

export const wowListFullPopulationClaims: ClaimRecord[] = [
  {
    id: "CLM-WOWLIST-ARCHIVE-SCALE",
    project: "wowlist",
    internalClaim:
      "A read-only aggregate review of the July 22, 2017 production database snapshot counted 1,846 users and 16,142 post/event records; conservative geography analysis supported 35 or more active city scenes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "A July 2017 production snapshot supports the bounded scale claim: 1,800+ users, 16,000+ post/event records, and activity across roughly 35 city ecosystems.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Give hiring readers a legible scale signal while keeping the exact archive counts, interpretation method, and privacy boundaries in the source layer."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
        relationship: "direct-support",
        supports: [
          "1,846 user records",
          "16,142 post/event records",
          "conservative 35-plus active-city-scene interpretation"
        ],
        locator: "Aggregate table counts and geography analysis only; person-level rows excluded",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The counts describe one July 22, 2017 production snapshot, not current activity.",
      "City ecosystems are a conservative activity grouping, not official chapters.",
      "The repository and public site omit person-level and raw community records."
    ],
    antiClaims: [
      "WOW List currently has 1,800 active users",
      "WOW List operated official chapters in 35 cities",
      "every post/event record represents a completed public event",
      "Jamie alone produced the adoption"
    ],
    researchInquiryIds: ["INQ-WOWLIST-ARCHIVE-IMPLEMENTATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-TECHNICAL-CONTRIBUTION",
    project: "wowlist",
    internalClaim:
      "Jamie co-built and operated WOW List across its Django/PostgreSQL/PostGIS backend, Ember clients, event-entry and distribution workflows, and organizer-facing deployment surfaces.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Jamie co-built the application and product model, working across Django, PostgreSQL/PostGIS, and Ember. His contribution connected Sunday Dinner's participatory calendar practice to followable keyword communities, natural-language event entry, digest and calendar distribution, embeddable calendars, and organizer-facing deployment.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "State Jamie's actor-action-artifact contribution concretely while separating his role from sole authorship of the codebase or shared account."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's co-builder and product-operator role",
          "technical stack",
          "event-entry and distribution features",
          "organizer-facing deployment"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Co-builder and product operator does not mean sole author or owner.",
      "The archive establishes historical implementation surfaces, not current service availability.",
      "Shared-account product support remains attributed to the project team unless separately identified."
    ],
    antiClaims: [
      "Jamie wrote every line of WOW List",
      "Jamie alone designed every feature",
      "the archived feature set is currently operating"
    ],
    researchInquiryIds: ["INQ-WOWLIST-ARCHIVE-IMPLEMENTATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-PRODUCT-SUPPORT-LOOP",
    project: "wowlist",
    internalClaim:
      "The complete @wowlist population preserves a public product-support loop: users asked about location scope and list discovery, reported excessive event-entry clicks, and received workflow-specific replies from the project account.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The public account did more than announce events: it answered questions about location scope and list discovery, responded to event-entry friction, and thanked a community member for making a product tutorial.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Make organizer-facing product operations concrete without inflating three conversations into representative research."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-LOCATION-SUPPORT-2015",
        relationship: "direct-support",
        supports: ["location-scope question and workflow reply"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-LISTS-SUPPORT-2015",
        relationship: "direct-support",
        supports: ["personal-list discovery question and workflow reply"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-EVENT-SUPPORT-2015",
        relationship: "direct-support",
        supports: ["event-entry friction and stated interface direction"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-MEMBER-TUTORIAL-2015",
        relationship: "corroborating",
        supports: ["user-created onboarding artifact"],
        confidence: "moderate",
        renderCitation: true
      }
    ],
    boundaries: [
      "Three recovered threads do not constitute representative usability research.",
      "A stated interface direction does not prove that a change shipped.",
      "The project-account replies do not identify their individual author."
    ],
    antiClaims: [
      "WOW List completed a representative user-research study",
      "every requested feature shipped",
      "Jamie personally authored every support reply"
    ],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-CIVIC-CARE-USE",
    project: "wowlist",
    internalClaim:
      "Nine items in the complete account population connected direct calendar use, authored curation, and reposted amplification to demonstrations, vigils, fundraisers, or mutual-aid resources.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The calendar also became civic and care infrastructure: the account linked or amplified demonstrations, vigils, fundraisers, and mutual-aid resources, including post-election organizing and Ghost Ship mourning and relief.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Show mission-relevant use while preserving the difference between direct calendar use, authored curation, and reposted amplification."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
        relationship: "direct-support",
        supports: ["nine-item civic-and-mutual-aid pattern and its composition"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-POPULAR-VOTE-2016",
        relationship: "context",
        supports: ["post-election civic-calendar destination"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
        relationship: "context",
        supports: ["Ghost Ship mourning and relief communication"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The nine items combine direct calendar links, authored external curation, reposted external amplification, and one reposted calendar link; those are not interchangeable forms of use.",
      "The record does not establish attendance, money raised, service uptake, or policy outcomes.",
      "Historical links are not current guidance."
    ],
    antiClaims: [
      "WOW List organized every linked action",
      "WOW List caused attendance or fundraising outcomes",
      "Jamie authored every post or resource"
    ],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FIELD-LEARNING-NETWORK",
    project: "wowlist",
    internalClaim:
      "The account publicly circulated a member-made tutorial, all-ages venue guidance, an Allied Media Conference announcement, a peer DIY fund, and two pieces about DIY documentation and infrastructure.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The account paired product communication with field learning: member-made onboarding, all-ages venue guidance, DIY documentation, Allied Media Conference, and peer funding infrastructure.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/wowlist"],
        rationale:
          "Preserve the richer field ecosystem in the bank without crowding the hiring-facing case study."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
        relationship: "context",
        supports: ["all-ages venue operations field context"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015",
        relationship: "context",
        supports: ["DIY archive and connective-infrastructure field context"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-MEMBER-TUTORIAL-2015",
        relationship: "direct-support",
        supports: ["member-made product onboarding"],
        confidence: "moderate",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
        relationship: "context",
        supports: ["conference context for the account's public participation announcement"],
        confidence: "moderate",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
        relationship: "context",
        supports: ["peer DIY-space funding infrastructure"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Sharing a source does not establish authorship, partnership, attendance, adoption, or endorsement.",
      "The Good Times article does not mention WOW List.",
      "The Allied Media evidence establishes an announced plan, not confirmed attendance or a presenter role."
    ],
    antiClaims: [
      "the cited articles covered WOW List",
      "Jamie authored the cited sources",
      "WOW List administered the Meow Wolf DIY Fund",
      "WOW List presented at Allied Media Conference"
    ],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION",
    project: "wowlist",
    internalClaim:
      "On July 15, 2026, 12 of 22 recovered authored posts displayed at least one reply, repost, or like; visible totals were two replies, 20 reposts, and 21 likes.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated observation found visible interaction on 12 of 22 authored posts; the totals remain held because platform metrics are unstable and incomplete.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain the reproducible observation without turning volatile platform labels into an accomplishment claim."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
        relationship: "direct-support",
        supports: ["dated visible engagement labels and authored-post denominator"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Metrics are a July 15, 2026 observation and may omit historical engagement that was deleted, hidden, private, or no longer rendered.",
      "Reposted items and their original-post engagement were excluded from WOW List traction totals.",
      "The result measures visible platform interaction, not adoption, attendance, or civic impact."
    ],
    antiClaims: [
      "these are complete lifetime engagement totals",
      "every interaction came from an organizer or decision-maker",
      "engagement proves product adoption or outcomes"
    ],
    researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const wowListFullPopulationInquiries: ResearchInquiry[] = [
  {
    id: "INQ-WOWLIST-ARCHIVE-IMPLEMENTATION-2026",
    project: "wowlist",
    question:
      "What do the production database snapshot, code archive, project documentation, and approved resume establish about WOW List's historical scale and Jamie's technical contribution?",
    methods: [
      "Performed read-only aggregate inspection of the July 22, 2017 production database snapshot.",
      "Separated aggregate counts from person-level rows and private operational data.",
      "Reviewed the production-style code and project documentation for stack, feature, and deployment surfaces.",
      "Reconciled technical archive findings with approved resume language and collective-credit boundaries."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The snapshot contains 1,846 users and 16,142 post/event records; conservative geography analysis supports 35 or more active city scenes.",
      "The archive identifies Django, PostgreSQL/PostGIS, Ember, natural-language event entry, weekly email digests, embeddable calendars, and organizer-facing deployment.",
      "Approved resume language and the technical archive support Jamie's co-builder and product-operator role."
    ],
    limitations: [
      "The counts describe one historical snapshot, not current activity.",
      "City scenes are not official chapters.",
      "Structural review does not assign every line, feature, or decision to Jamie.",
      "Raw code archives, person-level rows, and private operational records remain unpublished."
    ],
    sourceIds: [
      "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
      "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"
    ],
    publicSummary:
      "A bounded archive review establishes historical platform scale and Jamie's cross-stack co-builder/product-operator contribution without publishing private records or claiming sole authorship."
  },
  {
    id: "INQ-WOWLIST-X-FULL-POPULATION-2026",
    project: "wowlist",
    question:
      "What does the complete profile-reported @wowlist population establish about product operation, organizer use, mission-relevant sources, stakeholder engagement, and visible traction?",
    methods: [
      "Verified an authenticated browser session and recorded the 38-post profile baseline without retaining session identity.",
      "Swept the replies-inclusive timeline in three overlapping passes, deduplicated canonical status URLs, and continued until repeated bottom passes added no records.",
      "Reconciled all 38 IDs, dates, and visible post texts across independent captures.",
      "Classified authored posts separately from reposts and excluded original-post engagement from WOW List traction totals.",
      "Opened public reply conversations, recovered three parent questions, and resolved all 35 posted short URLs to immediate destinations.",
      "Close-read the archived Grasstronaut and Good Times articles and separated field context from product coverage."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "All 38 profile-reported items were recovered as distinct canonical status IDs: 22 authored posts and 16 reposts spanning February 12, 2014-January 12, 2017.",
      "Nineteen authored posts contain 23 outgoing-link occurrences: 12 WOW List destinations, two NYCdiy destinations, and nine external destinations; the full population contains 35 posted short URLs.",
      "Three public support threads preserve location-scope, list-discovery, and event-entry workflow questions.",
      "Organizer and collaborator posts show event publishing, event-page linking, and account tagging without establishing platform-wide adoption.",
      "Nine items form a bounded civic-and-care pattern across direct calendar use, authored curation, reposted amplification, vigils, fundraisers, demonstrations, and mutual-aid resources.",
      "Twelve authored posts displayed visible interaction; the held dated totals are two replies, 20 reposts, and 21 likes.",
      "The archived Good Times article is field context about DIY documentation; it is not coverage of WOW List."
    ],
    limitations: [
      "The result is complete against the profile-reported public denominator on the capture date, not against deleted, hidden, private, or platform-suppressed history.",
      "Project-account output does not identify the individual author of every post.",
      "Visible platform metrics are unstable dated observations.",
      "Historical links may now redirect, be unavailable, or no longer provide current guidance.",
      "The inventory does not establish attendance, fundraising totals, adoption, or causal outcomes."
    ],
    sourceIds: wowListFullPopulationSources
      .filter(
        (source) =>
          ![
            "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
            "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"
          ].includes(source.id)
      )
      .map((source) => source.id),
    publicSummary:
      "A complete 38-of-38 public-account corpus documents organizer-facing product support, user-created onboarding, civic-and-care use, and a wider DIY infrastructure learning network while holding volatile traction and individual post authorship claims."
  }
];

export const wowListFullPopulationIntake = [
  {
    id: "INT-WOWLIST-ARCHIVE-IMPLEMENTATION-2026",
    receivedAt: reviewedAt,
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "WOW List scale and technical implementation archive",
    description:
      "Public-safe aggregate and structural review of the historical production database, code, project documentation, and approved resume language.",
    whyItMatters:
      "Gives platform scale and Jamie's technical contribution their own evidence chain instead of asking the social corpus to prove implementation or adoption.",
    projectIds: ["wowlist", "sunday-dinner"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Promoted separate bounded scale and technical-contribution claims with person-level data, raw code archives, sole authorship, and current availability excluded.",
    sourceIds: [
      "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
      "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"
    ],
    claimIds: [
      "CLM-WOWLIST-ARCHIVE-SCALE",
      "CLM-WOWLIST-TECHNICAL-CONTRIBUTION"
    ],
    inquiryIds: ["INQ-WOWLIST-ARCHIVE-IMPLEMENTATION-2026"],
    artifactPaths: [
      "apps/www/src/data/proofs.ts",
      "docs/knowledge-bank/projects/wowlist.md"
    ],
    boundaries: [
      "Do not publish person-level rows, raw code archives, or private operational records.",
      "Do not describe city scenes as official chapters.",
      "Do not assign every line, feature, or decision to Jamie.",
      "Do not present historical archive evidence as current platform availability."
    ]
  },
  {
    id: "INT-WOWLIST-X-FULL-POPULATION-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "WOW List complete public social population",
    description:
      "Authenticated item-level corpus of all 38 profile-reported public timeline items, with authored posts, reposts, links, support conversations, sources, and visible engagement kept separate.",
    whyItMatters:
      "Turns a small public timeline into reproducible evidence about shared provenance, product support, organizer use, civic-care infrastructure, and field learning.",
    projectIds: ["wowlist", "sunday-dinner"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Promoted product-support and civic-care claims, retained field learning in the deeper bank, and held volatile engagement totals from the website.",
    sourceIds: wowListFullPopulationSources
      .filter(
        (source) =>
          ![
            "SRC-WOWLIST-DATABASE-AGGREGATES-2017",
            "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"
          ].includes(source.id)
      )
      .map((source) => source.id),
    claimIds: wowListFullPopulationClaims
      .filter(
        (claim) =>
          ![
            "CLM-WOWLIST-ARCHIVE-SCALE",
            "CLM-WOWLIST-TECHNICAL-CONTRIBUTION"
          ].includes(claim.id)
      )
      .map((claim) => claim.id),
    inquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
    artifactPaths: [
      "docs/knowledge-bank/corpora/source-captures/wowlist-x-browser-extraction-2026-07-15-utc.json",
      "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.json",
      "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.manifest.json",
      "scripts/derive-wowlist-x-corpus.mjs",
      "docs/knowledge-bank/projects/wowlist.md"
    ],
    boundaries: [
      "Do not assign every account post to Jamie.",
      "Do not infer outcomes from visible engagement or posted links.",
      "Keep historical destinations distinct from current guidance.",
      "Do not expose authenticated-session identity."
    ]
  }
] satisfies IntakeRecordInput[];
