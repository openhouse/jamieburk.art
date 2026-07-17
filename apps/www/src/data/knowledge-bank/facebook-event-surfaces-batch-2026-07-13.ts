import type { KnowledgeBank } from "./schema.ts";

type FacebookEventSurfacesBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const selectedPersonalEventSources = [
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
    title: "Musicians for a Semantic Web",
    publishedAt: "2006-12-02",
    canonicalUrl: "https://www.facebook.com/events/10153308288768593/",
    publicCitation:
      "Jamie Burkart, 'Musicians for a Semantic Web,' Facebook event, December 2, 2006.",
    supportsGenerally: [
      "an early public event connecting music, networked culture, and collaborative discussion"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    title: "Pirate Trolley-In!!",
    publishedAt: "2007-01-06",
    canonicalUrl: "https://www.facebook.com/events/10155459481930035/",
    publicCitation:
      "Jamie Burkart, 'Pirate Trolley-In!!,' Facebook event, January 6, 2007.",
    supportsGenerally: [
      "a participatory public-history event centered on Kansas City's 8th Street Trolley Tunnel"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    publishedAt: "2007-07-14",
    canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
    publicCitation:
      "Jamie Burkart, 'Release Yourself onto the Water Until it Tastes of Salt,' Facebook event, July 14, 2007.",
    supportsGenerally: [
      "an invitation into a found-material, bicycle-powered river expedition"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
    title: "The Night Walk with Jamie Burkart",
    publishedAt: "2010-04-17",
    canonicalUrl: "https://www.facebook.com/events/1090550714295009/",
    publicCitation:
      "Jamie Burkart, 'The Night Walk with Jamie Burkart,' Facebook event, April 17, 2010.",
    supportsGenerally: [
      "a participatory journey using walking as a structure for shared attention to place"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    title: "SUNDAY DINNER Turns 100!",
    publishedAt: "2014-03-09",
    canonicalUrl: "https://www.facebook.com/events/702417306475691/",
    publicCitation:
      "Jamie Burkart, 'SUNDAY DINNER Turns 100!,' Facebook event, March 9, 2014.",
    supportsGenerally: [
      "the longevity of a recurring participatory hospitality format"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
    title: "Why I March: Sunday Dinner Potluck, Sign Making, Costumes!",
    publishedAt: "2017-01-15",
    canonicalUrl: "https://www.facebook.com/events/1416424718368443/",
    publicCitation:
      "Jamie Burkart, 'Why I March: Sunday Dinner Potluck, Sign Making, Costumes!,' Facebook event, January 15, 2017.",
    supportsGenerally: [
      "a civic-learning and public-making event joining hospitality, discussion, and sign making"
    ]
  },
  {
    id: "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
    title: "Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria",
    publishedAt: "2017-02-01",
    canonicalUrl: "https://www.facebook.com/events/278687849214415/",
    publicCitation:
      "Jamie Burkart, 'Movie Club: HyperNormalisation BBC Doc / Brexit, Trump & Syria,' Facebook event, February 1, 2017.",
    supportsGenerally: [
      "a public documentary screening and discussion format for collective civic learning"
    ]
  }
] as const;

export const facebookEventSurfacesBatchRecords: FacebookEventSurfacesBatch = {
  sources: [
    {
      id: "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
      title: "Jamie Burkart Facebook events surface",
      author: "Jamie Burkart",
      kind: "personal-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://www.facebook.com/jburkart/events/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Jamie Burkart Facebook events surface, authenticated review conducted July 13, 2026.",
      publicNote:
        "A terminal scroll exposed 502 distinct public event associations. Event detail host cards supplied a separate control of 21 Jamie-hosted past events.",
      supportsGenerally: [
        "502 distinct event associations visible on the current personal events surface",
        "a separate displayed host-card control of 21 Jamie-hosted past events"
      ],
      doesNotEstablish: [
        "Jamie authored, hosted, attended, endorsed, or produced all 502 associated events",
        "the identity or content of the unresolved hosted-event slot",
        "events deleted before capture and absent from the current host control"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
      title: "Jamie Burkart Facebook hosted-event population accounting run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level accounting of Jamie Burkart's Facebook hosted-event surface.",
      publicNote:
        "The public repository retains a 21-slot aggregate ledger with 20 recovered hosted-event pages and one unresolved historical slot. Full personal-event associations, guest identities, relationship context, addresses, responses, comments, and raw capture data remain outside the repository.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001",
      supportsGenerally: [
        "all 21 hosted-event control slots accounted for",
        "20 recovered hosted-event pages and one unresolved slot",
        "a recovered hosted-event range from December 2006 through February 2017",
        "five recurring primary practice forms across the recovered pages"
      ],
      doesNotEstablish: [
        "the identity or content of the unresolved slot",
        "events deleted before capture and absent from the current control",
        "sole production or authorship of every event",
        "attendance, reach, endorsement, or impact"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
      title: "Jamie Burkart Facebook event-association control run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 control pass over 502 event associations visible on Jamie Burkart's Facebook events surface.",
      publicNote:
        "The control separates 20 recovered Jamie-hosted event pages from 482 public event associations displaying another host. No public record-level association ledger is retained.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001",
      supportsGenerally: [
        "502 distinct visible event associations",
        "20 associations displaying Jamie as host",
        "482 associations displaying another host",
        "295 distinct displayed hosts across the association surface"
      ],
      doesNotEstablish: [
        "attendance, endorsement, participation, production, or authorship",
        "professional significance of an association",
        "a complete history of every event ever associated with the account"
      ]
    },
    ...selectedPersonalEventSources.map((source) => ({
      ...source,
      author: "Jamie Burkart",
      kind: "personal-web-page" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-13" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "sole production of the event",
        "physical attendance or audience reach",
        "policy, commercial, or organizational impact"
      ]
    })),
    {
      id: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      title: "WOW List Facebook events surface",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://www.facebook.com/wowlist/events/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "WOW List Facebook events surface, authenticated review conducted July 13, 2026.",
      publicNote:
        "The authenticated page-management event surface displayed 'No events to show' and exposed no numeric event links.",
      supportsGenerally: [
        "zero event records displayed on the current WOW List Facebook event surface"
      ],
      doesNotEstablish: [
        "that WOW List never created, hosted, co-hosted, promoted, or was associated with Facebook events",
        "that historical event records were not deleted, hidden, or removed from the current interface"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
      title: "WOW List Facebook historical-event recovery run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 bounded recovery search of WOW List Facebook event records.",
      publicNote:
        "Authenticated current and legacy Facebook routes, Facebook event search, Jamie's visible association surface, and bounded Wayback queries recovered no historical WOW List Facebook event record.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001",
      supportsGenerally: [
        "bounded negative recovery finding",
        "live and legacy-route review",
        "Facebook event-search and Wayback-query dispositions"
      ],
      doesNotEstablish: [
        "that no WOW List Facebook event ever existed",
        "that an event was never deleted, hidden, or hosted from another account"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
      project: "professional-archive",
      internalClaim:
        "The July 2026 Facebook hosted-event census accounts for a 21-event host-card control with 20 recovered event pages and one unresolved historical slot.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The 21-slot Facebook hosted-event census contains 20 recovered pages and one unresolved historical slot.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/jamie-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 21-past-events host-card control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
          relationship: "direct-support",
          supports: ["deduplication, page-level close reading, classification, and redaction"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete accounting means every displayed host-control slot has a recovered or unresolved disposition; it does not mean every historical page was recovered.",
        "The unresolved slot cannot be described as deleted or assigned a title, date, host, or format without additional evidence.",
        "The current host control cannot reveal events deleted before capture."
      ],
      antiClaims: [
        "All 21 event pages were recovered",
        "This is an official Facebook export",
        "The current control represents every event Jamie ever hosted"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
      project: "participatory-public-systems",
      internalClaim:
        "Twenty surviving Facebook event pages hosted by Jamie between 2006 and 2017 document a recurring public practice across cultural production, hospitality and care, participatory place journeys, civic learning and making, and networked culture and public history.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Twenty recovered hosted-event pages from 2006 through 2017 document recurring structures for cultural production, hospitality, place-based participation, civic learning, and networked public culture.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/jamie-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
          relationship: "direct-support",
          supports: ["the complete recovered population and five-form classification"],
          confidence: "high",
          renderCitation: false
        },
        ...selectedPersonalEventSources.map((source) => ({
          sourceId: source.id,
          relationship: "direct-support" as const,
          supports: [...source.supportsGenerally],
          confidence: "high" as const,
          renderCitation: false
        }))
      ],
      boundaries: [
        "Facebook host attribution supports Jamie's public event-making role; it does not establish sole production or erase collaborators, performers, venues, or participants.",
        "The five primary forms are an interpretive classification of the recovered pages, not mutually exclusive truths about the work.",
        "Do not convert event associations, response surfaces, or the number of pages into attendance, reach, or impact."
      ],
      antiClaims: [
        "Jamie alone produced every recovered event",
        "All 502 associated events were Jamie's projects",
        "Facebook event records measure attendance or impact"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
      project: "wowlist",
      internalClaim:
        "On July 13, 2026, WOW List's authenticated Facebook event surface displayed no event records; bounded current, legacy-route, event-search, association-surface, and Wayback searches recovered no historical event record.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "WOW List's current Facebook event surface displayed no events in July 2026, and bounded recovery searches found no historical event record.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/wowlist-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the current zero-record event display"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026",
          relationship: "direct-support",
          supports: ["the bounded negative historical-recovery finding"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The zero applies to the current live display, not to all historical WOW List activity.",
        "Negative recovery is not proof of nonexistence.",
        "WOW List's own platform, X account, website archive, and organizer use remain separate evidence surfaces."
      ],
      antiClaims: [
        "WOW List never used Facebook events",
        "No historical WOW List Facebook event ever existed",
        "The current empty display describes WOW List's overall event or community activity"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
      project: "professional-archive",
      question:
        "Can 100 percent of Jamie Burkart's surviving Facebook hosted-event population be accounted for and integrated without converting the wider personal event-association surface into a public dossier?",
      methods: [
        "Claimed Jamie's authenticated Facebook tab and opened his personal past-events surface.",
        "Scrolled the association index to a stable terminal state and deduplicated 502 event links by numeric event ID.",
        "Separated 20 cards displaying Jamie as host from 482 cards displaying another host; retained the wider association data only as a protected control.",
        "Used event detail host cards displaying 21 past events as the hosted-event control and assigned a disposition to all 21 slots.",
        "Opened and close-read every one of the 20 recovered Jamie-hosted event pages.",
        "Classified each recovered hosted page by year and one primary practice form while excluding titles, exact dates, event IDs, URLs, hosts, addresses, responses, guests, comments, relationship context, and raw text from the public census.",
        "Searched Facebook event results, Wayback route captures, and bounded local project archives for the unresolved hosted-event slot."
      ],
      runAt: "2026-07-13",
      resultStatus: "partially-recovered",
      findings: [
        "All 21 displayed host-control slots are accounted for: 20 recovered hosted-event pages and one unresolved historical slot.",
        "The wider current surface exposed 502 distinct event associations: 20 displaying Jamie as host and 482 displaying another host across 295 distinct displayed hosts.",
        "The recovered hosted-event pages span December 2006 through February 2017.",
        "The primary classification contains seven cultural-performance-and-production pages, four recurring-hospitality-and-care pages, four participatory-place-travel-and-water pages, three networked-culture-and-public-history pages, and two civic-learning-and-making pages.",
        "The recovered pages document recurring structures for gathering, shared inquiry, public making, hospitality, cultural production, and participatory engagement with place."
      ],
      limitations: [
        "The authenticated interface is not an official Facebook export.",
        "The 21-event host-card control and 20 recovered pages leave one unresolved historical slot.",
        "Two legacy page layouts exposed event detail but did not yield a parsed public-visibility marker.",
        "Event association does not establish attendance, endorsement, authorship, production, or professional significance.",
        "Host attribution does not establish sole production or a complete collaborator record.",
        "Events deleted before capture and absent from the current host control cannot be detected."
      ],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
        "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
        ...selectedPersonalEventSources.map((source) => source.id)
      ],
      publicSummary:
        "The 21-slot hosted-event control is fully accounted for with 20 recovered pages and one unresolved slot. The public census retains only aggregate practice structure and withholds the wider personal association record.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001"
    },
    {
      id: "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
      project: "wowlist",
      question:
        "Can 100 percent of WOW List's current or surviving historical Facebook event population be recovered and responsibly integrated?",
      methods: [
        "Switched the authenticated Facebook context into the WOW List page identity and reviewed the current event-management surface.",
        "Checked current and legacy page-event routes and inspected each for numeric event links.",
        "Searched Facebook events for the exact project name.",
        "Checked the 502-event personal association control for WOW List host or title matches.",
        "Ran bounded Wayback CDX queries against current, legacy, profile-ID, and events-tab URL patterns."
      ],
      runAt: "2026-07-13",
      resultStatus: "partially-recovered",
      findings: [
        "The current authenticated WOW List event surface displayed 'No events to show' and exposed zero numeric event links.",
        "Current and legacy Facebook routes resolved to the same zero-record event surface.",
        "Facebook event search, the recovered personal association control, and bounded Wayback queries recovered no historical WOW List Facebook event record."
      ],
      limitations: [
        "The current zero-record display does not establish that no historical event ever existed.",
        "Deleted, hidden, transferred, or alternate-host event pages may not appear in the current interface or searched archives.",
        "No official Facebook page export was available.",
        "The finding concerns Facebook events only and does not describe WOW List's own event platform, community activity, or X account."
      ],
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
      ],
      publicSummary:
        "WOW List's current Facebook event population is a verified zero-record display. Historical recovery remains inconclusive because bounded searches found no event page, which is not proof that none ever existed.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001"
    }
  ]
};
