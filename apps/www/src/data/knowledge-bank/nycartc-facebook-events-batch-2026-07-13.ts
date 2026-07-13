import type { KnowledgeBank } from "./schema.ts";

type NycArtistCoalitionFacebookEventsBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const selectedEventSources = [
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
    title: "DIY: NYC Artist Coalition - General Meeting",
    publishedAt: "2017-02-06",
    canonicalUrl: "https://www.facebook.com/events/406505576359490/",
    publicCitation:
      "NYC Artist Coalition, 'DIY: NYC Artist Coalition - General Meeting,' Facebook event, February 6, 2017.",
    supportsGenerally: [
      "an open coalition meeting at Magick City",
      "collective priority-setting and cultural-plan work",
      "the use of a public event page as an invitation and action surface"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
    title: "NYC Artist Coalition - March General Meeting",
    publishedAt: "2017-03-06",
    canonicalUrl: "https://www.facebook.com/events/1833265643557435/",
    publicCitation:
      "NYC Artist Coalition, 'NYC Artist Coalition - March General Meeting,' Facebook event, March 6, 2017.",
    supportsGenerally: [
      "a recurring meeting at The Floasis",
      "fire-guard preparation, town-hall strategy, and community-space survey design",
      "participant-proposed working groups"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
    title: "Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting",
    publishedAt: "2017-04-25",
    canonicalUrl: "https://www.facebook.com/events/212427345900529/",
    publicCitation:
      "NYC Artist Coalition, 'Legalize Dance in NYC Panel - NYC Artist Coalition April Meeting,' Facebook event, April 25, 2017.",
    supportsGenerally: [
      "a recurring coalition meeting at Muchmore's",
      "an expert panel and public-action pathway around Cabaret Law repeal",
      "an explicit monthly practice of meeting in cultural spaces"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-CABARET-HEARING-2017",
    title: "Cabaret Law Hearing: One Chance to Legalize Dance!",
    publishedAt: "2017-06-19",
    canonicalUrl: "https://www.facebook.com/events/472114119789400/",
    publicCitation:
      "NYC Artist Coalition and campaign partners, 'Cabaret Law Hearing: One Chance to Legalize Dance!,' Facebook event, June 19, 2017.",
    supportsGenerally: [
      "a City Hall action pathway around Cabaret Law repeal",
      "public event language asking participants to attend and tell their stories",
      "a displayed Facebook response total of 1.7K"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
    title: "Tell NYC's Night Mayor: Save NYC Spaces",
    publishedAt: "2017-10-11",
    canonicalUrl: "https://www.facebook.com/events/120802405289008/",
    publicCitation:
      "NYC Artist Coalition and campaign partners, 'Tell NYC's Night Mayor: Save NYC Spaces,' Facebook event, October 11, 2017.",
    supportsGenerally: [
      "a Market Hotel town hall about the Office of Nightlife",
      "an invitation for cultural-space participants to address public officials",
      "a displayed Facebook response total of 1.2K"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NOVEMBER-MEETING-2017",
    title: "NYC Artist Coalition - November Meeting",
    publishedAt: "2017-11-13",
    canonicalUrl: "https://www.facebook.com/events/144317939631393/",
    publicCitation:
      "NYC Artist Coalition, 'NYC Artist Coalition - November Meeting,' Facebook event, November 13, 2017.",
    supportsGenerally: [
      "a recurring coalition meeting at Chinatown Soup",
      "collective review and priority-setting after Cabaret Law repeal and Office of Nightlife creation"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-NIGHT-MAYOR-PANEL-2018",
    title: "Night Mayor Panel - NAC March Meeting",
    publishedAt: "2018-03-26",
    canonicalUrl: "https://www.facebook.com/events/383292402137451/",
    publicCitation:
      "NYC Artist Coalition and campaign partners, 'Night Mayor Panel - NAC March Meeting,' Facebook event, March 26, 2018.",
    supportsGenerally: [
      "a recurring coalition meeting at Secret Project Robot",
      "a public panel connecting artists, residents, city officials, and cultural spaces",
      "a displayed Facebook response total of 612"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-MARCH-HEARING-2019",
    title: "MARCH Raids in NYC - City Hall Hearing #TalksNotRaids",
    publishedAt: "2019-02-11",
    canonicalUrl: "https://www.facebook.com/events/790581997948463/",
    publicCitation:
      "NYC Artist Coalition and campaign partners, 'MARCH Raids in NYC - City Hall Hearing #TalksNotRaids,' Facebook event, February 11, 2019.",
    supportsGenerally: [
      "a City Hall hearing action around MARCH transparency",
      "public event language stating 'Being there changes everything' and asking participants to tell their stories",
      "a displayed Facebook response total of 299"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-SUMMER-MEETING-2019",
    title: "NYC Artist Coalition: Summer of Change Meeting",
    publishedAt: "2019-08-07",
    canonicalUrl: "https://www.facebook.com/events/373845436658926/",
    publicCitation:
      "NYC Artist Coalition and Ode to Babel, 'NYC Artist Coalition: Summer of Change Meeting,' Facebook event, August 7, 2019.",
    supportsGenerally: [
      "a recurring meeting at Ode to Babel",
      "joint strategy around MARCH transparency and Commercial Rent Stabilization",
      "an open invitation for participants to bring additional coalition priorities"
    ]
  },
  {
    id: "SRC-NYCAC-FACEBOOK-EVENT-COVID-RELIEF-2020",
    title: "Covid-19 Relief: Virtual Meeting - NYC Artist Coalition",
    publishedAt: "2020-03-16",
    canonicalUrl: "https://www.facebook.com/events/1371973329662017/",
    publicCitation:
      "NYC Artist Coalition and campaign partners, 'Covid-19 Relief: Virtual Meeting - NYC Artist Coalition,' Facebook event, March 16, 2020.",
    supportsGenerally: [
      "the adaptation of the coalition meeting practice to a virtual relief format",
      "cross-sector coordination among artists, gig workers, community spaces, health experts, and mutual-aid providers"
    ]
  }
] as const;

export const nycartcFacebookEventsBatchRecords: NycArtistCoalitionFacebookEventsBatch = {
  sources: [
    {
      id: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      title: "NYC Artist Coalition Facebook events surface",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://www.facebook.com/nycartc/events",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Facebook events surface, authenticated review conducted July 13, 2026.",
      publicNote:
        "The past-events index exposed 33 distinct event records after terminal scrolling. Event host cards displayed a separate control of 34 past events, leaving one historical slot unresolved.",
      supportsGenerally: [
        "33 distinct page-listed past-event records",
        "a separate displayed host-card control of 34 past events",
        "a surviving event range from January 27, 2017, through January 29, 2021"
      ],
      doesNotEstablish: [
        "the identity or content of the unresolved control slot",
        "events deleted before capture and absent from the current counter",
        "individual authorship of event pages",
        "physical attendance"
      ]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      title: "NYC Artist Coalition Facebook events full-population accounting run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level accounting of the NYC Artist Coalition Facebook event surface.",
      publicNote:
        "The public repository retains a 34-slot accounting ledger with 33 recovered event records and one unresolved control slot. Guest identities, invite context, comments, private account data, and event-access credentials remain outside the repository.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001",
      supportsGenerally: [
        "all 34 control slots accounted for",
        "33 recovered event records and one unresolved slot",
        "17 records in 2017, three in 2018, six in 2019, six in 2020, and one in 2021",
        "12 recurring meeting records across ten distinct named physical venues and two virtual meetings",
        "32 event pages with displayed Facebook response totals ranging from nine to 1.7K"
      ],
      doesNotEstablish: [
        "the identity or content of the unresolved slot",
        "unique people across response totals",
        "physical attendance or turnout",
        "individual event-page authorship",
        "policy causality"
      ]
    },
    {
      id: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      title: "Jamie Burkart first-person account of NYC Artist Coalition event practice",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      publicCitation:
        "Jamie Burkart first-person account of his contribution to NYC Artist Coalition's public event and participation practice, July 2026.",
      publicNote:
        "Jamie confirms a substantial role in creating the coalition's public event layer and adapting lessons from WOWList to recurring cultural-space convenings and legislative advocacy.",
      protectedLocatorId: "CONFIRMATION-NYCAC-EVENT-PRACTICE-2026-001",
      supportsGenerally: [
        "Jamie's first-person account of his event-system contribution",
        "the connection Jamie draws between WOWList participation practice and coalition advocacy"
      ],
      doesNotEstablish: [
        "sole organization of every event",
        "individual authorship of every event page",
        "the perspective of collaborators or co-hosts",
        "policy causality"
      ]
    },
    ...selectedEventSources.map((source) => ({
      ...source,
      organization: "NYC Artist Coalition and event partners",
      kind: "institutional-web-page" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-13" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "individual authorship of the event page",
        "physical attendance from Facebook response totals",
        "unique responders across events",
        "sole organization or policy causality"
      ]
    }))
  ],
  claims: [
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      project: "nyc-artist-coalition",
      internalClaim:
        "The July 2026 NYC Artist Coalition Facebook event census accounts for a 34-event host-card control with 33 recovered event records and one unresolved slot.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The 34-slot Facebook event census contains 33 recovered page-listed records and one unresolved historical slot.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 33-record event index and separate 34-event host-card control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["deduplication, record-level accounting, classification, and redaction"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete accounting means every displayed control slot has a recovered or unresolved disposition; it does not mean every historical event body was recovered.",
        "The unresolved slot cannot be described as deleted or assigned a title, date, host, or campaign without additional evidence.",
        "The event surface cannot reveal events deleted before capture and absent from the current control."
      ],
      antiClaims: [
        "All 34 event records were recovered",
        "This is an official Facebook export",
        "The current control represents every event ever associated with NYC Artist Coalition"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie helped establish and produce NYC Artist Coalition's recurring participation system across public event pages, rotating cultural-space meetings, practical support, issue discovery, public hearings, and campaign action.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie helped establish and produce the coalition's recurring participation system: public event pages, meetings rotated among cultural spaces, practical safety and advocacy sessions, and pathways from artist concerns to public hearings and campaign action.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "archive-note",
          text:
            "Twelve recovered recurring-meeting records span ten distinct named physical venues and two virtual meetings; the wider event population also includes public hearings, rallies, training and Q&A sessions, venue-support actions, and relief coordination.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: ["Jamie's first-person account of his role in the event and participation system"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
          relationship: "direct-support",
          supports: ["the recurring meeting format and its mix of safety, listening, survey, and town-hall work"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
          relationship: "direct-support",
          supports: ["the rotating cultural-space practice and policy-to-action format"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
          relationship: "direct-support",
          supports: ["a cultural-space town hall connecting lived concerns with public officials"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
          relationship: "corroborating",
          supports: ["independent reporting on the town hall, its approximate attendance, and city-participant context"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-CABARET-GOTHAMIST-2017",
          relationship: "corroborating",
          supports: ["Jamie's named coalition advocacy and the coalition's practical fire-safety study groups"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Credit the event practice and outcomes collectively; Jamie's first-person account supports his contribution, not sole organization or authorship.",
        "Do not attribute every event page, invitation, or facilitation decision to Jamie without event-level production evidence or collaborator confirmation.",
        "The event record supports a recurring rotating-venue practice, not an uninterrupted monthly schedule in every year.",
        "Policy outcomes require independent official evidence and collective-work language."
      ],
      antiClaims: [
        "Jamie alone organized every NYC Artist Coalition event",
        "Jamie authored every event page",
        "Every meeting occurred monthly or at a different venue",
        "The event system alone caused legislation or agency change"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
      project: "nyc-artist-coalition",
      internalClaim:
        "Thirty-two recovered event pages display Facebook response totals ranging from nine to 1.7K, but those totals are neither unique-person counts nor physical attendance.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Thirty-two event pages display Facebook response totals ranging from nine to 1.7K; these are platform response signals, not unique-person or attendance counts.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["the 32 displayed totals, range, and event-level accounting"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
          relationship: "supports-boundary",
          supports: ["an independently reported approximate physical attendance for one event that differs from its Facebook response total"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Responders may overlap across events.",
        "Facebook responses combine interest and intention; they do not establish arrival, duration, participation, or demographic reach.",
        "Do not sum the totals into a people-reached metric."
      ],
      antiClaims: [
        "The events drew the sum of all Facebook responses",
        "1.7K people attended the Cabaret Law hearing",
        "Facebook responses prove policy impact"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENTS-2026",
      project: "nyc-artist-coalition",
      question:
        "Can 100 percent of NYC Artist Coalition's surviving Facebook event population be accounted for and integrated without exposing guest identities or converting platform responses into attendance and causality claims?",
      methods: [
        "Claimed Jamie's authenticated Facebook tab and opened the NYC Artist Coalition past-events surface.",
        "Scrolled the index to a stable terminal state and deduplicated all event links by numeric event ID.",
        "Used the separate host-card display of 34 past events as the control and assigned a disposition to all 34 slots.",
        "Opened every one of the 33 recovered event pages, expanded descriptions where the interface allowed, and captured public event metadata while excluding guest identities, invite context, comments, friend context, account administration, and access credentials.",
        "Classified every recovered event by year, relationship, venue or mode, format, primary program, public response display, and recovery status.",
        "Close-read the full recovered population for recurring venue, participation, safety, public-hearing, campaign, and relief patterns.",
        "Compared Facebook response signals with independently reported approximate attendance for the 2017 Market Hotel town hall.",
        "Projected only the bounded participation-system claim into the portfolio and retained the full chronology in the public-safe knowledge bank."
      ],
      runAt: "2026-07-13",
      resultStatus: "partially-recovered",
      findings: [
        "All 34 displayed control slots are accounted for: 33 recovered event records and one unresolved slot.",
        "The recovered event record spans January 27, 2017, through January 29, 2021: 17 events in 2017, three in 2018, six in 2019, six in 2020, and one in 2021.",
        "Twelve recurring-meeting records span ten distinct named physical venues and two virtual meetings.",
        "The wider population includes public hearings, rallies, panels, safety training, legal and architectural Q&A, venue-support actions, small-business advocacy, and pandemic relief coordination.",
        "Thirty-two event pages display Facebook response totals ranging from nine to 1.7K; 19 display at least 100 responses, nine at least 400, and three at least 1K.",
        "One event description uses the action language 'Being there changes everything' and asks participants to tell their stories.",
        "The population documents a repeatable movement from gathering and listening through practical support, issue formation, public action, and institutional interface."
      ],
      limitations: [
        "The authenticated interface is not an official Facebook export.",
        "The 34-event host-card control and 33-record past-event index leave one unresolved historical slot.",
        "One old event description remained partially collapsed, although its title, date, hosts, venue, response total, and public status were recovered.",
        "Facebook response totals are not unique-person, attendance, demographic, reach, impression, or impact measures.",
        "The public event pages identify collective hosts and outputs, not the individual author or producer of each page.",
        "Events deleted before capture and absent from the current control cannot be detected."
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        ...selectedEventSources.map((source) => source.id),
        "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        "SRC-NYCAC-CABARET-GOTHAMIST-2017"
      ],
      publicSummary:
        "The 34-slot Facebook event control is fully accounted for with 33 recovered records and one unresolved slot. The event population supports a recurring participation-system claim while preserving collective credit, privacy, and response-versus-attendance boundaries.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001"
    }
  ]
};
