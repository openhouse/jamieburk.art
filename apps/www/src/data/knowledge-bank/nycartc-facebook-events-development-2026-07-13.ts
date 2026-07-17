import type { KnowledgeBank } from "./schema.ts";

type NycArtistCoalitionFacebookEventsDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

const selectedEventReadings = [
  ["GENERAL-MEETING-2017", "The February 2017 event invited participants into coalition formation, public priority-setting, and cultural-plan work."],
  ["MARCH-MEETING-2017", "The March 2017 meeting combined fire-guard preparation, town-hall strategy, community-space survey design, and participant-proposed working groups."],
  ["CABARET-PANEL-2017", "The April 2017 meeting paired an expert panel with a public action path and explicitly described a monthly practice of meeting in cultural spaces."],
  ["CABARET-HEARING-2017", "The June 2017 event translated Cabaret Law advocacy into a City Hall attendance and testimony pathway."],
  ["NIGHTLIFE-TOWN-HALL-2017", "The October 2017 event convened cultural-space participants and public officials at Market Hotel around the new Office of Nightlife."],
  ["NOVEMBER-MEETING-2017", "The November 2017 meeting created a collective review and priority-setting moment after Cabaret Law repeal and Office of Nightlife creation."],
  ["NIGHT-MAYOR-PANEL-2018", "The March 2018 meeting connected artists, residents, city officials, and cultural spaces through a public panel at Secret Project Robot."],
  ["MARCH-HEARING-2019", "The February 2019 hearing event used the phrase 'Being there changes everything' and asked participants to tell their stories."],
  ["SUMMER-MEETING-2019", "The August 2019 meeting at Ode to Babel joined MARCH-transparency and Commercial Rent Stabilization strategy while inviting additional priorities."],
  ["COVID-RELIEF-2020", "The March 2020 event adapted the convening practice to virtual cross-sector relief coordination."]
] as const;

export const nycartcFacebookEventsDevelopmentRecords: NycArtistCoalitionFacebookEventsDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-13-NYCAC-FACEBOOK-EVENTS",
      receivedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of NYC Artist Coalition's Facebook event population and integrate the relational event practice into the knowledge bank and portfolio.",
      sourceUrl: "https://www.facebook.com/nycartc/events",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition:
        "Accounted for all 34 host-card control slots with 33 recovered event records and one unresolved slot; created a public-safe event census; promoted bounded population and participation-system claims; held response-as-attendance and event-as-policy-causality claims; and projected one concise claim into the case study.",
      linkedRecordIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        "INQ-NYCAC-FACEBOOK-EVENTS-2026",
        "CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING",
        "CND-NYCAC-PARTICIPATION-SYSTEM",
        "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE",
        "CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated Facebook review",
      assertions: [
        {
          id: "ASSERT-NYCAC-FACEBOOK-EVENT-INDEX-33",
          statement: "The terminally loaded past-events index exposed 33 distinct event IDs.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FACEBOOK-HOST-CONTROL-34",
          statement: "Event host cards displayed 34 past events for NYC Artist Coalition.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The discrepancy leaves one unresolved historical slot and the interface is not an official export."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["population-accounting", "public-events"],
      candidateClaimIds: ["CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING"]
    },
    {
      id: "READ-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      sourceId: "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated population reconciliation",
      assertions: [
        {
          id: "ASSERT-NYCAC-FACEBOOK-EVENT-SLOTS-ACCOUNTED",
          statement: "All 34 control slots have a recovered or unresolved disposition.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FACEBOOK-EVENT-YEARS",
          statement: "The 33 recovered records comprise 17 events in 2017, three in 2018, six in 2019, six in 2020, and one in 2021.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FACEBOOK-RECURRING-MEETINGS",
          statement: "Twelve recurring-meeting records span ten distinct named physical venues and two virtual meetings.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-FACEBOOK-RESPONSE-RANGE",
          statement: "Thirty-two event pages display response totals from nine to 1.7K.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Response totals are not unique-person or attendance counts.",
        "Guest identities, invite context, comments, account administration, and access credentials remain protected.",
        "One old event description remained partially collapsed."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["archival-production", "participation", "privacy", "public-events"],
      candidateClaimIds: [
        "CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING",
        "CND-NYCAC-PARTICIPATION-SYSTEM",
        "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE",
        "CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES"
      ]
    },
    {
      id: "READ-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      sourceId: "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      readAt: "2026-07-13",
      reader: "Codex first-person claim review",
      assertions: [
        {
          id: "ASSERT-NYCAC-JAMIE-EVENT-PRACTICE-ROLE",
          statement: "Jamie confirms a substantial role in creating the coalition's public event layer and recurring participation practice.",
          confidence: "moderate",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-JAMIE-WOWLIST-EVENT-LINEAGE",
          statement: "Jamie connects the event practice to lessons developed through WOWList and to legislative advocacy.",
          confidence: "moderate",
          publicSafe: true
        }
      ],
      limitations: [
        "This is Jamie's first-person account, not event-level production metadata or collaborator testimony.",
        "Use contribution language and collective credit."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "WOWList"],
      themeIds: ["participation", "event-systems", "civic-advocacy"],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"]
    },
    ...selectedEventReadings.map(([suffix, statement]) => ({
      id: `READ-NYCAC-FACEBOOK-EVENT-${suffix}`,
      sourceId: `SRC-NYCAC-FACEBOOK-EVENT-${suffix}`,
      readAt: "2026-07-13" as const,
      reader: "Codex public event-page review",
      assertions: [
        {
          id: `ASSERT-NYCAC-FACEBOOK-EVENT-${suffix}`,
          statement,
          confidence: "high" as const,
          publicSafe: true
        }
      ],
      limitations: [
        "The event page documents a collective public event surface, not the individual author or producer of the page.",
        "Facebook response totals are not physical attendance or policy impact."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["participation", "public-events", "civic-advocacy"],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"]
    }))
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING",
      project: "nyc-artist-coalition",
      text: "The 34-slot Facebook event control is fully accounted for with 33 recovered records and one unresolved slot.",
      status: "promoted",
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "The past-events index stabilized at 33 unique event IDs while event host cards displayed a 34-event control; the census assigns a disposition to every slot.",
      missingEvidence: [],
      boundaries: [
        "Describe this as full control-slot accounting, not full content recovery or an official export."
      ],
      promotedClaimId: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-NYCAC-PARTICIPATION-SYSTEM",
      project: "nyc-artist-coalition",
      text:
        "Jamie helped establish and produce a recurring NYC Artist Coalition participation system across public event pages, rotating cultural-space meetings, practical support, issue discovery, hearings, and campaign action.",
      status: "promoted",
      sourceIds: [
        "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
        "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
        "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
        "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        "SRC-NYCAC-CABARET-GOTHAMIST-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "Jamie's first-person account establishes his contribution; the full event population documents the repeatable system; public reporting corroborates his coalition advocacy, safety work, and town-hall participation.",
      missingEvidence: [],
      boundaries: [
        "Use helped establish and produce; credit events and policy outcomes collectively; do not assign Jamie individual authorship of every event page."
      ],
      promotedClaimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE",
      project: "nyc-artist-coalition",
      text: "Facebook response totals measure physical attendance and can be summed into a people-reached metric.",
      status: "research-needed",
      sourceIds: ["SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "The pages display response totals, but Facebook responses combine interested and intended attendance, may overlap across events, and do not establish arrival.",
      missingEvidence: [
        "Event-level attendance records or independent reporting for each event",
        "A deduplicated participant model and valid reach definition"
      ],
      boundaries: [
        "Use response totals only as event-level platform signals and never sum them into attendance or reach."
      ],
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES",
      project: "nyc-artist-coalition",
      text: "The recovered Facebook event practice caused Cabaret Law repeal, Office of Nightlife creation, MARCH reform, and Commercial Rent Stabilization progress.",
      status: "research-needed",
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        "SRC-NYCAC-CABARET-GOTHAMIST-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENTS-2026"],
      supportSummary:
        "The event chronology documents advocacy and institutional interfaces, but chronology and participation do not isolate causality within collective legislative and agency processes.",
      missingEvidence: [
        "Event-specific decision records connecting convenings to defined institutional decisions",
        "Collaborator and public-official testimony about causal contribution"
      ],
      boundaries: [
        "Use collective advocacy and contribution language with independent official outcome sources."
      ],
      reviewedAt: "2026-07-13"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-FACEBOOK-EVENT-ACCOUNTING-2026",
      candidateClaimId: "CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING",
      claimId: "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      decision: "promoted",
      reason:
        "The 33 recovered IDs and one unresolved slot account for every position in the separate 34-event host-card control.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-PARTICIPATION-SYSTEM-2026",
      candidateClaimId: "CND-NYCAC-PARTICIPATION-SYSTEM",
      claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
      decision: "promoted",
      reason:
        "Jamie's first-person account, complete recovered event pattern, and independent reporting support a bounded contribution claim with collective credit.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE-2026",
      candidateClaimId: "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE",
      decision: "held",
      reason:
        "Facebook response totals are neither unique-person nor attendance measures and cannot be summed into reach.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex evidence review"]
    },
    {
      id: "PROM-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES-2026",
      candidateClaimId: "CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES",
      decision: "held",
      reason:
        "The event chronology supports advocacy and implementation context, not sole or isolated policy causality.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex evidence review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NYCAC-PARTICIPATION-SYSTEM-2026",
      audience: "Hiring managers, public-interest product leaders, implementation teams, and civic collaborators",
      goal:
        "Make Jamie's recurring event and participation-system contribution legible without turning the case study into a calendar or claiming sole policy causality.",
      argument:
        "Jamie helped make collective cultural-space advocacy usable in public by joining a durable event identity, rotating place-based meetings, practical support, issue discovery, and paths into hearings and campaign action.",
      selectedClaimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
      heldCandidateClaimIds: [
        "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE",
        "CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES"
      ],
      rationale: [
        "The portfolio needs the operating pattern and Jamie's contribution, not all 34 census slots.",
        "The knowledge bank retains full depth for future applications and editorial composition.",
        "Collective credit and response-versus-attendance boundaries increase trust."
      ],
      createdAt: "2026-07-13"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NYCAC-FACEBOOK-EVENTS-2026",
      kind: "agent-research",
      summary:
        "The event population suggests future photo research around rotating cultural-space meetings, practical safety sessions, public hearings, and the Market Hotel town hall; images require separate rights and consent review.",
      projectHints: ["nyc-artist-coalition"],
      sourceIds: [
        "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
        "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017"
      ],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      rightsReviewRequired: true,
      status: "processed",
      createdAt: "2026-07-13"
    }
  ]
};
