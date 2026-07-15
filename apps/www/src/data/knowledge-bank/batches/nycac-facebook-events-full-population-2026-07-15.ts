import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

const articleSourceIds = [
  "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
  "SRC-NAC-PRESS-WNYC-11FD1556",
  "SRC-NAC-PRESS-METRO-NY-0429A30F",
  "SRC-NAC-PRESS-THE-NEW-YORKER-1F1F4EF1",
  "SRC-NAC-PRESS-THE-BAFFLER-1C6EDAAA",
  "SRC-NAC-PRESS-CURBED-CA836BBC",
  "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
];

export const nycacFacebookEventsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated NYC Artist Coalition Facebook Past Events review",
      publicSafeSummary:
        "A public-safe census of every NYC Artist Coalition Facebook event identity exposed after terminal scrolling, with all 34 displayed host-control slots assigned a recovered or unresolved disposition.",
      projects: ["nyc-artist-coalition"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
        ...articleSourceIds
      ],
      claimIds: [
        "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"
      ],
      researchTaskIds: [
        "TASK-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
        "TASK-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
        "TASK-NYCAC-FACEBOOK-EVENT-POSTED-SOURCES"
      ],
      notes: [
        "The authenticated live replay recovered the same 33 event IDs and sorted-ID digest as the governed corpus.",
        "One slot in an earlier 34-past-events host control remains unresolved.",
        "The 100% result is control-slot accounting, not a native Meta owner archive or proof that every historical event remains visible.",
        "Raw descriptions, personal data, access details, and authenticated-session state remain outside the public repository."
      ],
      reviewedAt,
      reviewedBy
    },
    {
      id: "INT-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026",
      kind: "recollection",
      capturedAt: reviewedAt,
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Jamie's first-person account of connecting WOW List's participation ethos with recurring cultural-space meetings, practical support, legislative advocacy, and collective civic action through NYC Artist Coalition.",
      projects: ["nyc-artist-coalition", "wowlist"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NAC-GOTHAMIST-CABARET-2017",
        "SRC-NAC-GREENE-HILL-NEWSLETTER-2017"
      ],
      claimIds: [
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      researchTaskIds: ["TASK-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      notes: [
        "Jamie's account is evidence of his perspective and recalled role, not independent proof of every event-level task.",
        "Democracy-lab, city-nervous-system, events-as-art, and believing-artists language stays attributed to Jamie."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      title: "NYC Artist Coalition Facebook Past Events surface",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
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
        "https://github.com/openhouse/jamieburk.art/blob/c4bed01a8fd68144926f1d29e61f6644fd4dbcfd/docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json",
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
  ],
  sourceAssertions: [
    {
      id: "AST-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Repeated authenticated scrolling of NYC Artist Coalition's live Facebook Past Events surface stabilized at 33 distinct event IDs, while an earlier host control displayed 34 past-event slots.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "An earlier Facebook host control displayed 34 past-event slots while repeated authenticated scrolling exposed 33 unique event IDs; all 33 records were reviewed and one slot remains unresolved.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-EVENT-CHRONOLOGY-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "The 33 recovered records span January 2017 through January 2021: 17 in 2017, three in 2018, six in 2019, six in 2020, and one in 2021; 24 index cards display NYC Artist Coalition as organizer and nine are allied or cohosted listings.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-ROTATING-MEETINGS-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Twelve records are recurring coalition meetings: ten physical meetings at ten different named cultural spaces and two later virtual meetings.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-CIVIC-CULTURAL-INTERFACES-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "The recovered sequence includes meetings, fire-safety sessions, legal and architectural questions, venue-support actions, panels, City Hall hearings, a DCLA meeting, nightlife town halls, small-business advocacy, mutual aid, and pandemic relief.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-RESPONSE-SIGNALS-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Thirty-two recovered pages display historical Facebook response counts; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-POSTED-SOURCE-ROUTES-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Recovered event descriptions routed participants to seven articles from New York Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-DETAIL-VOLATILITY-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Authenticated captures recovered all 33 exposed detail records; a later replay retained all 33 IDs while five detail routes returned an unavailable state.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-FACEBOOK-JAMIE-ROLE-MEMORY-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Jamie identifies the recurring event and participation layer as a substantial coalition contribution that connected WOW List lessons, small cultural spaces, artist listening, practical support, and civic action.",
      relationship: "supports",
      confidence: "moderate",
      candidateClaimIds: [
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-NYPOST-EVENT-SOURCE-ROUTE-2026",
      sourceId: "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
      project: "nyc-artist-coalition",
      assertion:
        "The recovered Cabaret Law hearing event routed participants to this New York Post article.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-GOTHAMIST-EVENT-SOURCE-ROUTE-2026",
      sourceId: "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06",
      project: "nyc-artist-coalition",
      assertion:
        "The recovered Fair Rent NYC rally event routed participants to this Gothamist article on Commercial Rent Stabilization.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION",
      project: "nyc-artist-coalition",
      internalClaim:
        "The displayed NYC Artist Coalition Facebook Past Events control had 34 slots: 33 public event records were recovered and reviewed, while one historical slot remains unmaterialized and unidentified.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text: "Facebook displayed 34 NYC Artist Coalition past-event slots. The knowledge bank recovered all 33 event identities exposed by the live index and preserves the remaining slot as unresolved.",
          status: "active",
          citationRequired: true,
          surfaces: [
            "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
          relationship: "corroborating",
          supports: ["33 exposed event identities", "34-slot earlier host control"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["34-of-34 control-slot disposition", "33 recovered records"],
          locator: "populationReconciliation and events",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026",
          relationship: "private-support",
          supports: ["terminal-scroll reconciliation", "detail availability replay"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is complete displayed-control accounting, not complete historical recovery or a native Meta owner export.",
        "The unresolved slot receives no inferred title, date, host, campaign, or deletion state.",
        "A later unavailable route does not mean an earlier recovered event did not exist."
      ],
      antiClaims: [
        "All 34 event pages were recovered.",
        "NYC Artist Coalition created exactly 34 events in its history.",
        "The unresolved event never existed.",
        "Facebook is a complete owner archive."
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie reports that, beginning in 2017, he helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, rotating meetings in small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings connecting artists' lived experience with civic pathways.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text: "Jamie reports that, beginning in 2017, he helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, meetings rotating through small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings that connected artists' lived experience with civic pathways.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "archive-note",
          text: "Jamie describes the recurring event and participation layer as a major part of his NYC Artist Coalition contribution. The surviving population corroborates the collective system's public form while leaving event-level authorship open.",
          status: "active",
          citationRequired: true,
          surfaces: [
            "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
          relationship: "direct-support",
          supports: ["Jamie's role account", "WOW List method relationship"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: [
            "33-event collective participation system",
            "12 recurring meetings across ten physical cultural spaces"
          ],
          locator: "events, topics, venues, and organizer displays",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NAC-GOTHAMIST-CABARET-2017",
          relationship: "corroborating",
          supports: [
            "Jamie organized fire-code study groups",
            "Jamie participated in City Hall advocacy"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NAC-GREENE-HILL-NEWSLETTER-2017",
          relationship: "corroborating",
          supports: [
            "Jamie's NYC Artist Coalition participation",
            "a nightlife town hall invitation"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use helped establish and produce; do not assign Jamie authorship or sole production of every event.",
        "Preserve partners, venue hosts, artists, advocates, officials, and coalition collaborators as part of the work.",
        "The rotating pattern covers ten physical meeting spaces and two virtual meetings, not one meeting every calendar month.",
        "The event sequence does not establish that any gathering caused a policy outcome."
      ],
      antiClaims: [
        "Jamie solely created or produced every NYC Artist Coalition event.",
        "Jamie alone led the coalition.",
        "Every event used a different venue.",
        "The coalition held a meeting every calendar month.",
        "The event program alone caused Cabaret Law repeal or another policy outcome."
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
      project: "nyc-artist-coalition",
      internalClaim:
        "Thirty-two of the 33 recovered event pages display historical Facebook response counts; 19 display at least 100 responses, seven at least 500, and three at least 1,000.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text: "Thirty-two recovered event pages display Facebook response counts; 19 show at least 100 responses, seven at least 500, and three at least 1,000. The figures remain event-level platform signals only.",
          status: "active",
          citationRequired: true,
          surfaces: [
            "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "direct-support",
          supports: ["response-threshold arithmetic"],
          locator: "aggregateSnapshot and events[].responseSnapshot",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Facebook response labels are not verified attendance, unique people, reach, participation, endorsement, conversion, mandate, or impact.",
        "People may respond to multiple events, and three values are rounded in thousands.",
        "Do not sum event-level values into a people-reached claim.",
        "Use independent reporting for physical attendance when available."
      ],
      antiClaims: [
        "9,989 unique people engaged.",
        "Facebook responses equal event attendance.",
        "Every responder participated in advocacy.",
        "Response counts prove endorsement or policy impact."
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie understands NYC Artist Coalition's recurring event practice as a democracy lab: believing artists, moving through small cultural spaces, translating between cultural and civic codes, and creating occasions where people could build collective agency together.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text: "Jamie describes the event practice as a kind of democracy lab: listening in small cultural spaces, believing artists, and translating lived experience into collective civic pathways.",
          status: "hold",
          citationRequired: true,
          surfaces: [
            "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events"
          ]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
          relationship: "context",
          supports: ["the democracy-lab interpretation as Jamie's perspective"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "corroborating",
          supports: ["recurring meetings across cultural and civic spaces"],
          confidence: "moderate",
          renderCitation: true
        }
      ],
      boundaries: [
        "Keep democracy lab, city nervous system, events as art, and believing artists language attributed to Jamie.",
        "Do not present the metaphor as a measured outcome, participant consensus, or external evaluation."
      ],
      antiClaims: [
        "The events empirically proved a democracy-lab outcome.",
        "Every participant shared Jamie's interpretation.",
        "The event system represented all NYC artists.",
        "Facebook response counts measure democratic participation."
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
      project: "nyc-artist-coalition",
      question:
        "Can a native Meta owner export identify the unresolved control slot and events removed before the current live index?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Request or generate a native Meta owner export",
        "Reconcile stable event IDs without publishing personal or account-administration data",
        "Keep deleted, unavailable, unresolved, and not-recovered states distinct"
      ],
      successCriteria: [
        "Identify or preserve the unresolved slot without inference",
        "Reconcile owner-export and live-index denominators",
        "Keep attendee, contact, and authentication data outside the public repository"
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSummary:
        "Use a native owner export to investigate the one unresolved host-control slot and events no longer exposed by the live index.",
      reviewedAt
    },
    {
      id: "TASK-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
      project: "nyc-artist-coalition",
      question:
        "Which records can further specify Jamie's event-level production work, the transfer of WOW List methods, and independently reported attendance without absorbing collective credit?",
      priority: "high",
      status: "in-progress",
      methodsPlanned: [
        "Crosswalk programs, task artifacts, page-administration history, and collaborator accounts",
        "Invite collaborators and participants to corroborate or correct Jamie's account",
        "Use independent reporting rather than response labels for physical attendance"
      ],
      successCriteria: [
        "Establish event-level responsibilities with dated evidence",
        "Preserve collaborator, host, speaker, partner, and participant credit",
        "Keep platform responses distinct from attendance and impact"
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NAC-GOTHAMIST-CABARET-2017",
        "SRC-NAC-GREENE-HILL-NEWSLETTER-2017"
      ],
      claimIds: [
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS",
        "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
      ],
      publicSummary:
        "Further specify event-level production and attendance while preserving the bounded helped-establish-and-produce claim and collective credit.",
      reviewedAt
    },
    {
      id: "TASK-NYCAC-FACEBOOK-EVENT-POSTED-SOURCES",
      project: "nyc-artist-coalition",
      question:
        "What article-level propositions can the seven recovered event source routes support after close reading?",
      priority: "medium",
      status: "in-progress",
      methodsPlanned: [
        "Preserve every posted article route",
        "Use archive fallbacks for dead or blocked pages",
        "Separate article contents, coalition circulation, event context, and Jamie's role"
      ],
      successCriteria: [
        "Every article has a recovered, archived, blocked, dead, or not-recovered disposition",
        "Article-level assertions carry locators and boundaries",
        "Circulation is not converted into endorsement or authorship"
      ],
      sourceIds: articleSourceIds,
      claimIds: ["CLM-NYCAC-FACEBOOK-EVENT-POPULATION"],
      publicSummary:
        "Mature seven event-routed articles without treating circulation as endorsement, authorship, or policy causation.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT",
      project: "nyc-artist-coalition",
      question:
        "Can a native Meta owner export identify the unresolved control slot and events removed before the current live index?",
      methods: [
        "Exhausted the authenticated Past Events surface through repeated no-growth scrolling.",
        "Reconciled 33 stable event IDs against an earlier 34-past-events host control.",
        "Repeated the event-ID traversal and preserved detail-page availability changes."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Thirty-three event IDs materialized consistently.",
        "All 33 detail records were recovered across authenticated captures.",
        "One host-control slot remains unidentified.",
        "A later replay retained all 33 IDs while five detail routes became unavailable."
      ],
      limitations: [
        "No native Meta owner export was available in this pass.",
        "The live surface cannot reveal events removed before capture.",
        "The unresolved slot cannot be assigned metadata or a deletion state."
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026"
      ],
      publicSummary:
        "The displayed control is reconciled as 33 recovered records plus one unresolved historical slot; a native owner export is the remaining route to literal account-history completeness.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026"
    },
    {
      id: "INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE",
      project: "nyc-artist-coalition",
      question:
        "What can the event population, Jamie's account, and independent public sources establish about the participation system, Jamie's role, and physical attendance?",
      methods: [
        "Captured Jamie's first-hand account as participant memory.",
        "Compared the account with the complete exposed event census.",
        "Connected selected role propositions to contemporaneous Gothamist and Greene Hill records.",
        "Kept Facebook response labels separate from physical attendance."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The event population corroborates a recurring collective participation system across cultural and civic spaces.",
        "Independent sources connect Jamie to coalition work, fire-code study groups, City Hall advocacy, and a nightlife town hall invitation.",
        "Jamie's first-hand account supports a bounded helped-establish-and-produce claim.",
        "Event-level authorship, exact division of labor, WOW List method transfer, and physical attendance remain open for further corroboration."
      ],
      limitations: [
        "Shared event pages do not identify the human author or producer of each event.",
        "Response labels do not establish physical attendance or unique people.",
        "Collaborator and participant accounts may add, complicate, or correct Jamie's interpretation.",
        "Event chronology does not establish policy causality."
      ],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NAC-GOTHAMIST-CABARET-2017",
        "SRC-NAC-GREENE-HILL-NEWSLETTER-2017"
      ],
      publicSummary:
        "The combined record supports Jamie's bounded contribution to a recurring participation system while preserving collective credit and leaving event-level production and actual attendance open for corroboration.",
      protectedLocatorId: "LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026"
    }
  ],
  pages: []
};
