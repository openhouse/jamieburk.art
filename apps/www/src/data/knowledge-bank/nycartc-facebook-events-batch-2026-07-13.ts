import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

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

export const nycartcFacebookEventIntake = [
  {
    id: "LEAD-NYCAC-FACEBOOK-EVENT-FULL-POPULATION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for NYC Artist Coalition Facebook events",
    summary:
      "Account for every slot in the current event control, preserve public event and link metadata, identify the coalition's participation pattern, and project Jamie's bounded contribution without exposing participants or overstating attendance and causality.",
    sourceUrl: "https://www.facebook.com/nycartc/events",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["nyc-artist-coalition", "participatory-public-practice"],
    sourceIds: [
      "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
      "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
      ...selectedEventSources.map((source) => source.id)
    ],
    claimIds: [
      "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
      "CLM-NYCAC-FACEBOOK-EVENT-LINK-ROUTING"
    ],
    inquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
    notes: [
      "The July 14 authenticated revalidation recovered the same 33 event IDs as the July 13 capture; one of 34 host-card control slots remains unresolved.",
      "The public event ledger retains institutional event metadata only. Guest identities, invite and friend context, comments, participant profiles, access credentials, contact details, and private administration remain excluded.",
      "Expanded descriptions contained 61 outbound-link occurrences across 38 normalized URL rows on 25 events. Posted links are research routes, not automatic corroboration or impact evidence.",
      "Jamie confirms that the event and participation layer was a substantial contribution and connected lessons from WOWList with legislative advocacy. Event-level authorship and production remain collective or open unless separately documented."
    ]
  }
] satisfies IntakeRecord[];

export const nycartcFacebookEventSources = [
    {
      id: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      title: "NYC Artist Coalition Facebook events surface",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://www.facebook.com/nycartc/events",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition Facebook events surface, authenticated capture conducted July 13 and revalidated July 14, 2026.",
      publicNote:
        "The past-events index exposed 33 distinct event records after terminal scrolling. Event host cards displayed a separate control of 34 past events, leaving one historical slot unresolved. A second authenticated traversal recovered the same 33-ID set.",
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
      accessedAt: "2026-07-14",
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
        "32 event pages with displayed Facebook response totals ranging from nine to 1.7K",
        "61 outbound-link occurrences across 38 normalized URL rows on 25 events"
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
      id: "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
      title: "NYC Artist Coalition Facebook event outbound-link inventory",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-14",
      publicCitation:
        "Public-safe metadata for a July 2026 review of outbound links in the surviving NYC Artist Coalition Facebook event descriptions.",
      publicNote:
        "The public repository retains a redacted 38-row routing ledger derived from 61 outbound-link occurrences across 25 events. Working-document locators, meeting-access paths, raw descriptions, and unresolved sensitive destinations remain protected.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENT-LINKS-2026-001",
      supportsGenerally: [
        "61 outbound-link occurrences across 38 normalized URL rows on 25 events",
        "seven posted article destinations",
        "campaign, registration, civic-action, public-resource, reporting, and research-debt link functions"
      ],
      doesNotEstablish: [
        "the truth of every linked proposition",
        "Jamie's authorship or the coalition's endorsement of every destination",
        "readership, conversion, attendance, reach, causality, or impact"
      ]
    },
    {
      id: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      title: "Awaiting the Night Mayor",
      organization: "The Village Voice",
      author: "Roshan Abraham",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-17",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Roshan Abraham, 'Awaiting the Night Mayor,' The Village Voice, November 17, 2017.",
      publicNote:
        "Independent reporting describes about one hundred people gathering at Market Hotel for the NYC Artist Coalition's Save NYC Spaces town hall with Council members and city-agency representatives.",
      supportsGenerally: [
        "approximately one hundred people physically attending the October 2017 Market Hotel town hall",
        "Council-member and city-agency participation",
        "the coalition's use of a cultural space as a public town-hall setting"
      ],
      doesNotEstablish: [
        "Jamie's individual production tasks for the event",
        "that the Facebook response count measured attendance",
        "sole coalition credit or policy causality"
      ]
    },
    {
      id: "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
      title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
      organization: "Gothamist",
      author: "Elizabeth Kim",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-11-06",
      accessedAt: "2026-07-14",
      canonicalUrl:
        "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
      publicNote:
        "Contemporaneous reporting on the proposed commercial-rent-stabilization framework, the storefront-vacancy context, and the coalition of small-business advocates involved in its development.",
      supportsGenerally: [
        "the public policy and storefront-vacancy context for the November 2019 Fair Rent NYC rally",
        "a proposed commercial-rent-stabilization framework in the City Council",
        "the involvement of a wider small-business advocacy coalition"
      ],
      doesNotEstablish: [
        "enactment or implementation of commercial rent stabilization",
        "Jamie's individual authorship or causal role",
        "that every event-page statement was independently verified"
      ]
    },
    {
      id: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      title: "Jamie Burkart first-person account of NYC Artist Coalition event practice",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
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
      accessedAt: "2026-07-14" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "individual authorship of the event page",
        "physical attendance from Facebook response totals",
        "unique responders across events",
        "sole organization or policy causality"
      ]
    }))
] satisfies SourceRecord[];

export const nycartcFacebookEventClaims = [
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      project: "nyc-artist-coalition",
      internalClaim:
        "The July 2026 NYC Artist Coalition Facebook event census accounts for a 34-event host-card control with 33 recovered event records and one unresolved slot.",
      status: "confirmed-with-boundary",
      publicSafety: "public-with-boundary",
      editorialStatus: "reserve",
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
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie helped establish and produce NYC Artist Coalition's recurring participation system across public event pages, rotating cultural-space meetings, practical support, issue discovery, public hearings, and campaign action.",
      status: "confirmed-with-boundary",
      publicSafety: "public-with-boundary",
      editorialStatus: "selected",
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
          sourceId: "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
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
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
      project: "nyc-artist-coalition",
      internalClaim:
        "Thirty-two recovered event pages display Facebook response totals ranging from nine to 1.7K, but those totals are neither unique-person counts nor physical attendance.",
      status: "confirmed-with-boundary",
      publicSafety: "public-with-boundary",
      editorialStatus: "reserve",
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
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-LINK-ROUTING",
      project: "nyc-artist-coalition",
      internalClaim:
        "The recovered event descriptions functioned as a source and action-routing layer, with 61 outbound-link occurrences across 38 normalized URL rows on 25 events.",
      status: "confirmed-with-boundary",
      publicSafety: "public-with-boundary",
      editorialStatus: "reserve",
      projections: [
        {
          key: "archive-note",
          text:
            "Across 25 events, 61 outbound-link occurrences route participants toward campaigns, registration and civic actions, safety and planning resources, organizations, and seven published-article destinations.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
          relationship: "direct-support",
          supports: ["link occurrence, normalized-row, event, category, and redaction accounting"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017",
          relationship: "context",
          supports: ["one close-read Cabaret Law article routed from a meeting page"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PRESS-TNR-BAFFLER-CUT-MUSIC-2018",
          relationship: "context",
          supports: ["one close-read M.A.R.C.H. article routed from a hearing page"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
          relationship: "context",
          supports: ["one close-read commercial-rent-policy article routed from a rally page"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A posted URL is a routing record and research lead, not automatic corroboration, authorship, endorsement, readership, conversion, attendance, reach, or policy impact.",
        "HTTP and HTTPS variants remain separate normalized rows so the 38-row transformation is reproducible.",
        "Working-document and unresolved sensitive locators remain protected until destination-level review is complete."
      ],
      antiClaims: [
        "Every posted URL corroborates the event description",
        "Jamie authored or selected every link",
        "Link volume proves audience reach or policy impact",
        "All historical short-link destinations were recovered"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex source-routing review"]
    }
] satisfies ClaimRecord[];

export const nycartcFacebookEventInquiries = [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENTS-2026",
      project: "nyc-artist-coalition",
      question:
        "Can 100 percent of NYC Artist Coalition's surviving Facebook event population be accounted for and integrated without exposing guest identities or converting platform responses into attendance and causality claims?",
      methods: [
        "Claimed Jamie's authenticated Facebook tab and opened the NYC Artist Coalition past-events surface.",
        "Scrolled the index to a stable terminal state and deduplicated all event links by numeric event ID.",
        "Repeated the authenticated traversal on July 14 and confirmed an exact match with the 33-ID July 13 capture.",
        "Used the separate host-card display of 34 past events as the control and assigned a disposition to all 34 slots.",
        "Opened every one of the 33 recovered event pages, expanded descriptions where the interface allowed, and captured public event metadata while excluding guest identities, invite context, comments, friend context, account administration, and access credentials.",
        "Classified every recovered event by year, relationship, venue or mode, format, primary program, public response display, and recovery status.",
        "Close-read the full recovered population for recurring venue, participation, safety, public-hearing, campaign, and relief patterns.",
        "Inventoried every outbound URL exposed by the expanded public descriptions, normalized query-free destinations, and assigned public, protected, or research-needed dispositions.",
        "Close-read selected published reporting routed by the event pages while retaining posted-but-unreviewed destinations as source leads rather than claim evidence.",
        "Compared Facebook response signals with independently reported approximate attendance for the 2017 Market Hotel town hall.",
        "Projected only the bounded participation-system claim into the portfolio and retained the full chronology in the public-safe knowledge bank."
      ],
      runAt: "2026-07-14",
      resultStatus: "partially-recovered",
      findings: [
        "All 34 displayed control slots are accounted for: 33 recovered event records and one unresolved slot.",
        "The recovered event record spans January 27, 2017, through January 29, 2021: 17 events in 2017, three in 2018, six in 2019, six in 2020, and one in 2021.",
        "Twelve recurring-meeting records span ten distinct named physical venues and two virtual meetings.",
        "The wider population includes public hearings, rallies, panels, safety training, legal and architectural Q&A, venue-support actions, small-business advocacy, and pandemic relief coordination.",
        "Thirty-two event pages display Facebook response totals ranging from nine to 1.7K; 19 display at least 100 responses, nine at least 400, and three at least 1K.",
        "Twenty-five events contain 61 outbound-link occurrences across 38 normalized URL rows, including seven published-article destinations.",
        "One event description uses the action language 'Being there changes everything' and asks participants to tell their stories.",
        "The population documents a repeatable movement from gathering and listening through practical support, issue formation, public action, and institutional interface."
      ],
      limitations: [
        "The authenticated interface is not an official Facebook export.",
        "The 34-event host-card control and 33-record past-event index leave one unresolved historical slot.",
        "One old event description remained partially collapsed, although its title, date, hosts, venue, response total, and public status were recovered.",
        "Facebook response totals are not unique-person, attendance, demographic, reach, impression, or impact measures.",
        "A posted URL is a source-routing trace, not automatic corroboration, authorship, endorsement, conversion, or impact.",
        "Working-document locators, meeting-access paths, guest identities, comments, participant profiles, contact details, and private account context remain outside the public repository.",
        "The public event pages identify collective hosts and outputs, not the individual author or producer of each page.",
        "Events deleted before capture and absent from the current control cannot be detected."
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        ...selectedEventSources.map((source) => source.id),
        "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
        "SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017",
        "SRC-PRESS-TNR-BAFFLER-CUT-MUSIC-2018",
        "SRC-GOTHAMIST-COMMERCIAL-RENT-2019"
      ],
      publicSummary:
        "The 34-slot Facebook event control is fully accounted for with 33 recovered records and one unresolved slot. The event population supports a recurring participation-system claim while preserving collective credit, privacy, and response-versus-attendance boundaries.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001"
    }
] satisfies ResearchInquiry[];

export const nycartcFacebookEventPublicationDecisions = [
  {
    id: "PUB-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
    claimId: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"],
    rationale:
      "The population accounting is essential provenance, while the hiring site should lead with the usable participation system rather than census mechanics.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-NYCAC-PARTICIPATION-SYSTEM",
    claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
    decision: "selected",
    audiences: ["hiring managers", "public-interest product teams", "civic collaborators"],
    surfaces: ["/work/fair-rent-nyc"],
    rationale:
      "The recurring event system makes Jamie's contribution to translation, implementation, public participation, and collective agency legible without claiming sole authorship or policy causality.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
    claimId: "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"],
    rationale:
      "The response distribution is useful platform context only when kept beside its non-attendance boundary.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-NYCAC-FACEBOOK-EVENT-LINK-ROUTING",
    claimId: "CLM-NYCAC-FACEBOOK-EVENT-LINK-ROUTING",
    decision: "reserve",
    audiences: ["future editors", "archival researchers", "photo editors"],
    surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"],
    rationale:
      "The event-to-source graph is valuable research infrastructure, but link volume is not a reader-facing impact claim.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const nycartcFacebookEventProofCoverage = [
  {
    proofId: "nyc-artist-coalition-participation-system",
    status: "source-backed",
    sourceIds: [
      "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
      "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-NYCARTC-CABARET-GOTHAMIST-2017"
    ],
    inquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
    note:
      "Jamie's first-person role account is bounded by the complete recovered event pattern and independent reporting; the public wording preserves collective credit and does not assign him every event page or outcome.",
    reviewedAt: "2026-07-14"
  }
] satisfies ProofCoverage[];
