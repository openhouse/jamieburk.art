import type { KnowledgeBank } from "./schema.ts";

type NycArtistCoalitionFacebookEventsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

const reportRoot =
  "https://github.com/openhouse/jamieburk.art/blob/13b8a266a453e977acb99f0125af1e2c269d38c1";

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
  intakeRecords: [
    {
      id: "INTAKE-2026-07-14-NYCAC-FACEBOOK-EVENTS",
      receivedAt: "2026-07-14",
      kind: "memory",
      project: "nyc-artist-coalition",
      publicSummary:
        "Jamie identifies NYC Artist Coalition's recurring public events as a major part of his contribution: a participation system informed by WOWList, rotated among cultural spaces, and used to listen, share practical knowledge, and connect artist concerns with public action.",
      privacy: "public-safe-summary",
      status: "claim-linked",
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026",
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026"
      ],
      claimIds: [
        "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
        "CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK",
        "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      projectionIntent: "candidate-for-public-surface",
      nextActions: [
        "Request a native Meta events export or equivalent account record to identify the unresolved 34th control slot and preserve any event bodies no longer available in the public interface.",
        "Seek collaborator confirmation for Jamie's event-system role and event-level divisions of labor where more specific production credit would be useful.",
        "Continue close reading unresolved short links and independently verify attendance or outcome claims before promotion."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    }
  ],
  sources: [
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
        "NYC Artist Coalition Facebook events surface, authenticated review conducted July 13-14, 2026.",
      publicNote:
        "The past-events index exposed 33 distinct event records after terminal scrolling. Event host cards displayed a separate control of 34 past events, leaving one historical slot unresolved. A July 14 authenticated replay reopened all 33 recovered URLs; 28 still rendered full detail modules and five retained dated headers while Facebook reported their detail modules unavailable.",
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
        "The public repository retains a redacted 34-row disposition ledger, a 38-row outbound-link ledger, and aggregate summaries. Public event dates, titles, venues or modes, formats, program classifications, platform-response displays, event URLs, and normalized public links remain visible; guest identities, invite context, comments, private account data, meeting access paths, working-document locators, and credentials remain outside the repository.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001",
      supportsGenerally: [
        "all 34 control slots accounted for",
        "33 recovered event records and one unresolved slot",
        "17 records in 2017, three in 2018, six in 2019, six in 2020, and one in 2021",
        "12 recurring meeting records across ten distinct named physical venues and two virtual meetings",
        "32 event pages with displayed Facebook response totals ranging from nine to 1.7K",
        "61 outbound-link occurrences across 25 events, normalized into 38 routed records"
      ],
      doesNotEstablish: [
        "the identity or content of the unresolved slot",
        "unique people across response totals",
        "physical attendance or turnout",
        "individual event-page authorship",
        "policy causality",
        "that a posted link was read, adopted, endorsed, or acted upon"
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
        "Jamie confirms a substantial role in creating the coalition's public event layer and adapting lessons from WOWList to recurring cultural-space convenings and legislative advocacy. This records Jamie's account while preserving shared event authorship and collective outcomes.",
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
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-REPORT-2026",
      title: "NYC Artist Coalition Facebook event archival production",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: `${reportRoot}/docs/knowledge-bank/nycartc-facebook-events-2026-07-13.md`,
      preferredPublicUrl: "canonical",
      publicCitation:
        "Jamie Burkart portfolio research, 'NYC Artist Coalition Facebook Event Archival Production,' July 14, 2026.",
      publicNote:
        "Documents population reconciliation, event-system interpretation, current preservation drift, link routing, response boundaries, Jamie's first-person role, and collective-credit limits.",
      supportsGenerally: [
        "the public-safe method and aggregate findings for the 34-slot event control",
        "the distinction between event recovery, current availability, and unresolved history",
        "the event and outbound-link lifecycle boundaries"
      ],
      doesNotEstablish: [
        "a native Meta export",
        "individual authorship of every event page",
        "attendance, unique reach, endorsement, or policy causality"
      ]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
      title: "Redacted row-level NYC Artist Coalition Facebook event disposition ledger",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: `${reportRoot}/docs/knowledge-bank/data/nycartc-public-facebook-event-ledger.json`,
      preferredPublicUrl: "canonical",
      publicCitation:
        "Redacted row-level NYC Artist Coalition Facebook event disposition ledger, July 14, 2026.",
      publicNote:
        "Contains 34 ordered dispositions: 33 recovered public event records and one metadata-free unresolved control slot. Because event dates, titles, venues, formats, response displays, and public URLs remain visible, the ledger is intentionally a public historical index rather than an aggregate-only release.",
      supportsGenerally: [
        "control-slot accounting and year distribution",
        "event dates, titles, venue or mode, format, program, page relationship, and recovery state",
        "the recurring-meeting and rotating-venue pattern"
      ],
      doesNotEstablish: [
        "events missing from the current control",
        "guest identities, attendance, unique responders, or private analytics",
        "individual page authorship or policy causality"
      ]
    },
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026",
      title: "Redacted row-level NYC Artist Coalition Facebook event outbound-link ledger",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: `${reportRoot}/docs/knowledge-bank/data/nycartc-public-facebook-event-link-ledger.json`,
      preferredPublicUrl: "canonical",
      publicCitation:
        "Redacted row-level NYC Artist Coalition Facebook event outbound-link ledger, July 14, 2026.",
      publicNote:
        "Routes 61 public outbound-link occurrences into 38 normalized records. A protected working-document locator and unresolved goo.gl destinations are withheld; article and public action links remain research routes rather than proof of readership, endorsement, or impact.",
      supportsGenerally: [
        "61 outbound-link occurrences across 25 recovered events",
        "38 normalized link records, including seven article routes",
        "separate dispositions for public leads, source-routed articles, protected material, and unresolved short links"
      ],
      doesNotEstablish: [
        "that a link was read or acted upon",
        "article endorsement of NYC Artist Coalition or Jamie",
        "registration, attendance, conversion, reach, or policy impact"
      ]
    },
    {
      id: "SRC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06",
      title: "Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization",
      organization: "Gothamist",
      author: "Elizabeth Kim",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-11-06",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://gothamist.com/news/facing-retail-vacancy-crisis-city-council-consider-plan-commercial-rent-stabilization",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Elizabeth Kim, 'Facing Retail Vacancy Crisis, City Council To Consider Plan For Commercial Rent Stabilization,' Gothamist, November 6, 2019.",
      publicNote:
        "The Fair Rent NYC anti-displacement event page routed readers to this article. It reports Stephen Levin's planned commercial-rent bill, United for Small Business NYC input, retail-vacancy context, and competing policy positions.",
      supportsGenerally: [
        "public reporting on the November 2019 commercial-rent-stabilization proposal",
        "United for Small Business NYC's reported input into the proposal",
        "the policy and retail-vacancy context linked from the coalition event"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the bill or article",
        "NYC Artist Coalition's sole role in the proposal",
        "bill passage, adoption, or policy impact"
      ]
    },
    {
      id: "SRC-NYPOST-FOOTLOOSE-CABARET-2017-04-08",
      title: "These Footloose-inspired rebels are fighting NYC's dancing ban",
      organization: "New York Post",
      author: "Melkorka Licea",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2017-04-08",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
      archiveUrl: "https://web.archive.org/web/20170409234308/http://nypost.com/2017/04/08/these-footloose-inspired-rebels-are-fighting-nycs-dancing-ban/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Melkorka Licea, 'These Footloose-inspired rebels are fighting NYC's dancing ban,' New York Post, April 8, 2017.",
      publicNote:
        "The June 2017 Cabaret Law hearing event page routed readers to this article. It reports on Dance Liberation Network and NYC Artist Coalition advocacy, Olympia Kazi's public coalition statement, and Council members Rafael Espinal and Antonio Reynoso's plans for repeal legislation.",
      supportsGenerally: [
        "contemporaneous public reporting on Cabaret Law repeal advocacy",
        "NYC Artist Coalition's participation in the public campaign",
        "publicly reported Council-member plans for repeal legislation"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "authorship of legislation",
        "sole coalition credit or policy causality"
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
      publicNote:
        source.id === "SRC-NYCAC-FACEBOOK-EVENT-CABARET-HEARING-2017"
          ? "The current public page retains its dated event header but reports the detail module unavailable. Detail-level support comes from the July 13 authenticated preservation capture."
          : undefined,
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
      proofClaimIds: [],
      reviewedAt: "2026-07-14",
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
          sourceId: "SRC-NYCA-PUBLIC-MEETING-PRODUCTION-PLAN-2018",
          relationship: "private-support",
          supports: [
            "Jamie's attributed maintenance of a reusable 21-day public-meeting production workflow"
          ],
          publicNote:
            "Supports Jamie's event-operations contribution without exposing the protected coalition workflow or assigning every event to him.",
          confidence: "high",
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
          sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
          relationship: "corroborating",
          supports: ["independent reporting on the town hall, its approximate attendance, and city-participant context"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-GOTHAMIST-CABARET-LAW-2017-06-19",
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
      proofClaimIds: ["nyca-participation-system"],
      reviewedAt: "2026-07-14",
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
          sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
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
      proofClaimIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-LINK-NETWORK",
      project: "nyc-artist-coalition",
      internalClaim:
        "Expanded descriptions in 25 recovered NYC Artist Coalition Facebook event records contain 61 outbound-link occurrences normalized into 38 research routes, including seven published-article links.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Twenty-five recovered event descriptions contain 61 outbound-link occurrences normalized into 38 research routes, including seven published-article links; one working-document locator remains protected and four short-link rows remain unresolved.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-facebook-events-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026",
          relationship: "direct-support",
          supports: [
            "the 61 link occurrences, 25 linked events, 38 normalized records, and disposition counts"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06",
          relationship: "context",
          supports: ["one close-read article routed from the Fair Rent NYC anti-displacement event"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYPOST-FOOTLOOSE-CABARET-2017-04-08",
          relationship: "context",
          supports: ["one close-read article routed from the Cabaret Law hearing event"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A posted URL is a source route or action path, not evidence that anyone read, endorsed, registered through, or acted on it.",
        "Campaign websites and event pages are project artifacts, not independent corroboration of outcomes.",
        "Working-document and meeting-access locators stay protected; unresolved short links remain unresolved."
      ],
      antiClaims: [
        "Seven publishers endorsed NYC Artist Coalition",
        "The event links prove attendance, conversion, reach, or policy impact",
        "Every short link destination was recovered"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      proofClaimIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie understands the coalition's recurring events as a democratic listening and translation practice: believing artists, gathering in cultural spaces, making practical knowledge shareable, and carrying concerns into civic forums.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "The recovered event sequence is consistent with Jamie's description of a democratic listening practice that connected cultural-space experience, practical support, collective priority-setting, and civic action.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: ["Jamie's interpretation of the event practice and its lineage from WOWList"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
          relationship: "corroborating",
          supports: [
            "the sequence of cultural-space meetings, practical support, hearings, campaign action, and relief coordination"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Democracy lab, city nervous system, believing artists, and events as art are Jamie's interpretive language, not neutral platform metadata.",
        "The event archive supports the operating pattern but does not establish every participant's experience or the complete origin of each campaign issue.",
        "Keep this bank-only until a specific public composition benefits from the language and collaborators have room to add perspective."
      ],
      antiClaims: [
        "Every NYC Artist Coalition event followed one uniform theory of change",
        "The event record proves the coalition caused each policy outcome",
        "Jamie speaks for every participant or collaborator"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      proofClaimIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex interpretive review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENTS-2026",
      project: "nyc-artist-coalition",
      question:
        "Can 100 percent of NYC Artist Coalition's surviving Facebook event population be accounted for and integrated without exposing guest identities or converting platform responses into attendance and causality claims?",
      methods: [
        "Used Jamie's authenticated Facebook session to open the NYC Artist Coalition past-events surface and each recoverable event URL.",
        "Scrolled the index to a stable terminal state and deduplicated all event links by numeric event ID.",
        "Used the separate host-card display of 34 past events as the control and assigned a disposition to all 34 slots.",
        "Opened every one of the 33 recovered event pages, expanded descriptions where the interface allowed, and captured public event metadata while excluding guest identities, invite context, comments, friend context, account administration, and access credentials.",
        "Replayed all 33 recovered event URLs in the authenticated session on July 14: all dated headers resolved, 28 current detail modules remained available, and five preserved the event header while reporting the detail module unavailable.",
        "Classified every recovered event by year, relationship, venue or mode, format, primary program, public response display, and recovery status.",
        "Close-read the full recovered population for recurring venue, participation, safety, public-hearing, campaign, and relief patterns.",
        "Extracted outbound links from expanded descriptions, removed query parameters and fragments, withheld working-document and meeting-access locators, and routed articles, public resources, campaign paths, and unresolved short links separately.",
        "Close-read two newly routed articles and matched five other article links to existing campaign-press source records.",
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
        "Twenty-five event descriptions contain 61 outbound-link occurrences normalized into 38 rows: seven published-article routes, one protected working-document row, four unresolved short-link rows, and 26 public campaign, organization, action, or resource leads.",
        "The seven event-linked articles comprise five records already present in the campaign press bank plus newly routed New York Post and Gothamist reporting.",
        "One event description uses the action language 'Being there changes everything' and asks participants to tell their stories.",
        "The population documents a repeatable movement from gathering and listening through practical support, issue formation, public action, and institutional interface."
      ],
      limitations: [
        "The authenticated interface is not an official Facebook export.",
        "The 34-event host-card control and 33-record past-event index leave one unresolved historical slot.",
        "One preservation-capture event description remained partially collapsed, although its title, date, hosts, venue, response total, and public status were recovered.",
        "At the July 14 replay, five event URLs retained dated headers but their current Facebook detail modules reported unavailable; the earlier authenticated preservation capture supplies their detail-level metadata.",
        "Facebook response totals are not unique-person, attendance, demographic, reach, impression, or impact measures.",
        "A posted URL documents routing, not readership, registration, adoption, endorsement, conversion, or impact.",
        "Four shortened-link rows remain unresolved; their destinations are not guessed.",
        "The public event pages identify collective hosts and outputs, not the individual author or producer of each page.",
        "Events deleted before capture and absent from the current control cannot be detected."
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-REPORT-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-LINK-LEDGER-2026",
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        ...selectedEventSources.map((source) => source.id),
        "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
        "SRC-GOTHAMIST-CABARET-LAW-2017-06-19",
        "SRC-GOTHAMIST-COMMERCIAL-RENT-BILL-2019-11-06",
        "SRC-NYPOST-FOOTLOOSE-CABARET-2017-04-08"
      ],
      publicSummary:
        "The 34-slot Facebook event control is fully accounted for with 33 recovered records and one unresolved slot. The event and outbound-link ledgers support a recurring participation-system claim and future historical reconstruction while preserving collective credit, retrieval drift, privacy, and response-versus-attendance boundaries.",
      protectedLocatorId: "RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001"
    }
  ]
};
