import type { KnowledgeBank } from "./schema.ts";

type WOWListFacebookPostsDevelopment = Pick<
  KnowledgeBank,
  "intakeItems" | "sourceReadings" | "candidateClaims" | "promotions" | "editorialBriefs"
>;

const selectedPostReadings = [
  {
    id: "READ-WOWLIST-FACEBOOK-NINE-CITIES-2015",
    sourceId: "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
    assertionId: "ASSERT-WOWLIST-FACEBOOK-NINE-CITIES",
    statement:
      "The post announced member-introduced WOW List community calendars in nine cities and currently displays 13 reactions, three comments, and 29 shares.",
    themes: ["distributed-use", "city-calendars", "interaction-signal"]
  },
  {
    id: "READ-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
    sourceId: "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
    assertionId: "ASSERT-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS",
    statement:
      "The post publicly credited a community contributor with adding 41 upcoming DIY events to the Los Angeles calendar.",
    themes: ["distributed-use", "community-contribution", "event-workflow"]
  },
  {
    id: "READ-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
    sourceId: "SRC-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
    assertionId: "ASSERT-WOWLIST-FACEBOOK-COMMUNITY-VALUES",
    statement:
      "The post shared a member's reflection naming Jamie and describing sharing, community, and ease of gathering as product values.",
    themes: ["product-values", "community-structure", "jamie-role-context"]
  },
  {
    id: "READ-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
    sourceId: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
    assertionId: "ASSERT-WOWLIST-FACEBOOK-WOMENS-MARCH-ROUTE",
    statement:
      "The post directed people to a WOW List route for Women's March gatherings in Washington, D.C., and cities across the country.",
    themes: ["civic-routing", "event-distribution"]
  },
  {
    id: "READ-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018",
    sourceId: "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018",
    assertionId: "ASSERT-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY",
    statement:
      "The reshared external post described continued WOW List use while updating PHXDIY.com and framed the platform as a way to follow shows outside Facebook.",
    themes: ["distributed-use", "external-corroboration", "platform-continuity"]
  }
] as const;

export const wowlistFacebookPostsDevelopmentRecords: WOWListFacebookPostsDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-13-WOWLIST-FACEBOOK-FULL-POPULATION",
      receivedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Perform an archival-production pass on 100 percent of WOW List's Facebook posts and retain Jamie's recollection that he managed the project's social presence with collective-project credit.",
      sourceUrl: "https://www.facebook.com/wowlist",
      projectHints: ["wowlist"],
      status: "processed",
      disposition:
        "Recovered all 57 currently surviving owner-timeline records to a terminal cursor; promoted bounded population, distributed-use, civic-routing, and interaction-signal claims while holding sole-management attribution for corroboration.",
      linkedRecordIds: [
        "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
        "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
        "CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
        "CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
        "CND-WOWLIST-FACEBOOK-CIVIC-ROUTING",
        "CND-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
        "CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated Page review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-FACEBOOK-LIVE-IDENTITY",
          statement:
            "The authenticated public Page identified WOW List and displayed 185 followers and two following accounts.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Current follower counts do not establish historical audience size, impressions, reach, or adoption."
      ],
      entityIds: ["WOWList"],
      themeIds: ["social-identity", "current-control"],
      candidateClaimIds: ["CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION"]
    },
    {
      id: "READ-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated terminal-cursor review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-FACEBOOK-TERMINAL-57",
          statement:
            "Nineteen three-record pages reached `has_next_page: false` with 57 unique post IDs and no repeated cursor.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-FACEBOOK-FORMS-AND-YEARS",
          statement:
            "The population contains 35 standalone posts and 22 reshared stories: 22 records from 2015, 27 from 2016, seven from 2017, and one from 2018.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
          statement:
            "Forty-seven records retain at least one current interaction; aggregate mutable signals are 94 reactions, 16 comments, and 49 shares.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-FACEBOOK-NO-NEWER-POST",
          statement:
            "A no-date-ceiling control returned March 23, 2018, as the same newest record, closing the post-2018 surface.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The current terminal cursor cannot reveal earlier deletions or hidden records.",
        "The shared Page does not identify the teammate who authored each post.",
        "Current interaction counts are mutable signals, not unique people, reach, impressions, attendance, endorsement, or impact."
      ],
      entityIds: ["WOWList"],
      themeIds: [
        "population-accounting",
        "distributed-use",
        "civic-routing",
        "cultural-space-care",
        "interaction-boundaries"
      ],
      candidateClaimIds: [
        "CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
        "CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
        "CND-WOWLIST-FACEBOOK-CIVIC-ROUTING",
        "CND-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"
      ]
    },
    ...selectedPostReadings.map((reading) => ({
      id: reading.id,
      sourceId: reading.sourceId,
      readAt: "2026-07-13" as const,
      reader: "Codex public-post review",
      assertions: [
        {
          id: reading.assertionId,
          statement: reading.statement,
          confidence: "high" as const,
          publicSafe: true
        }
      ],
      limitations: [
        "A public project-account post does not identify the individual teammate who authored or published it."
      ],
      entityIds: ["WOWList"],
      themeIds: [...reading.themes],
      candidateClaimIds: [
        reading.sourceId === "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017"
          ? "CND-WOWLIST-FACEBOOK-CIVIC-ROUTING"
          : "CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE"
      ]
    }))
  ],
  candidateClaims: [
    {
      id: "CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      project: "wowlist",
      text:
        "The currently surviving WOW List Facebook owner timeline contains 57 unique records across a terminal 19-page cursor chain.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
        "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      supportSummary:
        "The authenticated owner feed reached `has_next_page: false` with 57 unique IDs and no repeated cursor; a no-date-ceiling query returned the same newest record.",
      missingEvidence: [],
      boundaries: [
        "Complete describes the current accessible cursor population, not records deleted or hidden before capture."
      ],
      promotedClaimId: "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      project: "wowlist",
      text:
        "The Facebook archive documents member-introduced calendars in nine cities, a 41-event Los Angeles contribution, and later external Phoenix organizer use.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
        "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
        "SRC-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
        "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      supportSummary:
        "Three selected public records provide contemporaneous project and external-organizer evidence for distributed use; the member reflection supplies operating-values context.",
      missingEvidence: [],
      boundaries: [
        "Use city-calendar and contributor language; do not describe official chapters or convert selected examples into the complete adoption scale."
      ],
      promotedClaimId: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-FACEBOOK-CIVIC-ROUTING",
      project: "wowlist",
      text:
        "WOW List's Facebook record extends from arts-event distribution into issue-based gathering routes and cultural-space care.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
        "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      supportSummary:
        "The complete record contains Women's March, Standing Rock, popular-vote, post-election, mutual-aid, vigil, and cultural-space-support routes.",
      missingEvidence: [],
      boundaries: [
        "Distribution and amplification do not establish organizing leadership, attendance, causality, or individual post authorship."
      ],
      promotedClaimId: "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      project: "wowlist",
      text:
        "Forty-seven of 57 recovered records retain at least one current interaction, including 29 shares on the nine-city calendar announcement.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
        "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      supportSummary:
        "Record-level current counts were captured for all 57 records and retained with non-unique, mutable-platform-signal boundaries.",
      missingEvidence: [],
      boundaries: [
        "Do not sum signals as people or relabel them as reach, impressions, attendance, endorsement, adoption, or impact."
      ],
      promotedClaimId: "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT",
      project: "wowlist",
      text:
        "Jamie managed all of WOW List's social presence.",
      status: "research-needed",
      sourceIds: [],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
      supportSummary:
        "Jamie recalls managing the project's social presence and directly confirms establishing the project account, but the Page-level corpus records only the WOW List identity.",
      missingEvidence: [
        "Richard's collaborator confirmation or equivalent contemporaneous role evidence",
        "account-level authorship or administration logs that identify the publishing person"
      ],
      boundaries: [
        "WOW List was Jamie and Richard's shared project; do not convert Page identity into sole project ownership or individual post authorship."
      ],
      reviewedAt: "2026-07-13"
    }
  ],
  promotions: [
    {
      id: "PROM-WOWLIST-FACEBOOK-COMPLETE-POPULATION-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      claimId: "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
      decision: "promoted",
      reason:
        "The authenticated cursor chain reached its terminal server flag with unique record IDs and an independent no-date-ceiling control.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-WOWLIST-FACEBOOK-DISTRIBUTED-USE-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      claimId: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
      decision: "promoted",
      reason:
        "Selected contemporaneous project records and an external organizer post make the distributed operating model concrete without claiming official chapters or full adoption scale.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-WOWLIST-FACEBOOK-CIVIC-ROUTING-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-CIVIC-ROUTING",
      claimId: "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING",
      decision: "promoted",
      reason:
        "The complete record directly preserves issue-based routes and care resources with explicit non-causality boundaries.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      claimId: "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS",
      decision: "promoted",
      reason:
        "All record-level signals were captured and the claim remains archive-only with mutable, non-unique metric boundaries.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT-2026",
      candidateClaimId: "CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT",
      decision: "held",
      reason:
        "Jamie's recollection belongs in the knowledge lifecycle, but the Page corpus cannot identify individual publishers and collective project credit must remain explicit.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-WOWLIST-FACEBOOK-POSTS-EDITORIAL-2026",
      audience:
        "Hiring managers and product, implementation, technical-operations, or community-technology collaborators",
      goal:
        "Use the Facebook population to make distributed operation concrete without turning the case study into a social archive or assigning individual post authorship.",
      argument:
        "WOW List translated community-led event contribution and local calendar stewardship into a public system that organizers used across places and over time.",
      selectedClaimIds: [
        "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
        "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
        "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING",
        "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"
      ],
      heldCandidateClaimIds: ["CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT"],
      rationale: [
        "Project one compact distributed-use sentence because it strengthens the operating-model argument already made by the case study.",
        "Keep the 57-record count, year and form distributions, civic-routing detail, and interaction totals in the knowledge bank.",
        "Preserve Jamie's management recollection as a research candidate rather than presenting shared Page identity as individual authorship.",
        "Do not add a public social-archive route or expose the full-text corpus."
      ],
      createdAt: "2026-07-13"
    }
  ]
};
