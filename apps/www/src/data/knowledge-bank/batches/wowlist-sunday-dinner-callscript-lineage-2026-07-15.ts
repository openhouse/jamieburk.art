import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex archival review"];

export const wowListSundayDinnerCallScriptLineageBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-LINEAGE-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "WOW List database snapshots, a local Git record, a protected Sunday Dinner workbook, and public Call Script Facebook surfaces",
      publicSafeSummary:
        "Develop a bounded evidence chain from Sunday Dinner's recurring relational operations through WOW List and popular.vote to Call Script's participatory support for NYC Artist Coalition formation.",
      projects: ["wowlist", "sunday-dinner", "nyc-artist-coalition"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
        "SRC-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016",
        "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026",
        "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026",
        "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017"
      ],
      claimIds: [],
      researchTaskIds: [
        "TASK-SUNDAY-DINNER-WORKBOOK-RECONCILIATION",
        "TASK-NAC-CREATION-ROLE"
      ],
      notes: [
        "No new claim or website projection was selected. The evidence strengthens existing candidate claims but still requires collective-credit review before public promotion.",
        "Person-level attendance, contact, account, contributor, and engagement records remain protected."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
      title: "WOW List production database snapshots, 2016-2017",
      author: "WOW List contributors; public-safe aggregate review by Jamie Burkart and Codex",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Public-safe aggregate review of three historic WOW List production database snapshots dated June 24, 2016, June 1, 2017, and July 22, 2017; raw records and person-level data not published.",
      publicNote:
        "The July 2017 snapshot contains 1,846 users, 16,142 posts/events, 23,864 tags/lists, 28,837 list follows, 20,927 stars, and 2,965 going records. These are snapshot table totals, not unique reach, attendance, endorsement, or current activity.",
      supportsGenerally: [
        "growth across three dated production snapshots",
        "the scale of the event, list, follow, star, and going data model",
        "a Popular Vote list created November 12, 2016, with 933 linked post/event records, 196 follows, and 10 anonymous contributor IDs by July 22, 2017",
        "an NYC Artist Coalition list created February 7, 2017, with 82 linked post/event records and two anonymous contributor IDs by July 22, 2017"
      ],
      doesNotEstablish: [
        "unique reach or active-user counts",
        "event attendance, endorsement, conversion, or policy impact",
        "individual authorship of list contents",
        "sole ownership or conception of WOW List, Popular Vote, or NYC Artist Coalition"
      ],
      protectedLocatorId: "ARCHIVE-WOWLIST-PRODUCTION-DB-2016-2017"
    },
    {
      id: "SRC-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016",
      title: "WOW List popular.vote domain-routing commit",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2016-11-12",
      capturedAt: reviewedAt,
      publicCitation:
        "Jamie Burkart-authored local WOW List Git commit 8337b8956050b66702748c727b51f26950b82a35, dated November 12, 2016, adding popular.vote and www.popular.vote routing.",
      publicNote:
        "The commit directly supports Jamie's implementation of the domain route. It does not establish sole conception, ownership, editorial authorship, or later operation of the Popular Vote calendar.",
      supportsGenerally: [
        "Jamie directly implemented popular.vote routing in the WOW List codebase",
        "the implementation date matches the production database date for the Popular Vote list"
      ],
      doesNotEstablish: [
        "sole conception or ownership of Popular Vote",
        "sole authorship of its events or public communication",
        "the identity of every collaborator or contributor"
      ],
      protectedLocatorId: "ARCHIVE-WOWLIST-POPULAR-VOTE-COMMIT-2016"
    },
    {
      id: "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026",
      title: "Sunday Dinner invitation and attendance operating workbook",
      author: "Sunday Dinner collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Public-safe aggregate review of a protected Sunday Dinner operating workbook containing 345 numbered gathering columns spanning January 22, 2012, through March 7, 2021; person-level records not published.",
      publicNote:
        "The workbook's participant-total formula displays 2,783 meals served, while the gathering-sequence columns sum to 2,769. The value remains protected working evidence rather than an audited public total until the 14-instance difference and duplicate gathering labels are reconciled.",
      supportsGenerally: [
        "a long-running, instrumented invitation, response, and attendance practice",
        "345 numbered gathering columns across a January 2012-March 2021 chronology",
        "a workbook-calculated total labeled meals served"
      ],
      doesNotEstablish: [
        "2,783 unique people",
        "an audited or fully reconciled attendance total",
        "public permission for guest identities, contacts, histories, notes, or addresses",
        "sole authorship or operation by Jamie"
      ],
      protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-OPERATING-WORKBOOK-2026"
    },
    {
      id: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026",
      title: "Call Script Facebook Page",
      organization: "Call Script",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/callscript",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Call Script, public Facebook Page, accessed July 15, 2026.",
      publicNote:
        "The Page describes Call Script as a tool to call representatives and links directly to popular.vote. Current follower counts and authenticated administration state are not treated as accomplishment evidence.",
      supportsGenerally: [
        "Call Script's public civic-participation purpose",
        "a direct public link from Call Script to popular.vote"
      ],
      doesNotEstablish: [
        "sole authorship or ownership of Call Script",
        "historical reach or conversion",
        "the individual author of every Page post"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      title:
        "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs Meeting",
      organization: "NYC Artist Coalition, Call Script, and collaborators",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-01-27",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition, Call Script, and collaborators, public Facebook event and discussion for a January 27, 2017, Department of Cultural Affairs meeting, accessed July 15, 2026.",
      publicNote:
        "The event displayed 445 responses, not verified attendance. The discussion preserves Call Script agenda solicitation and peer-city evidence, followed later by an NYC Artist Coalition priority poll. Cohosting and discussion participation do not establish sole coalition creation or every collaborator's role.",
      supportsGenerally: [
        "a January 27, 2017, Department of Cultural Affairs meeting on DIY and alternative art spaces after the Ghost Ship fire",
        "NYC Artist Coalition and Call Script displayed among the event hosts",
        "Call Script solicitation of participant priorities and circulation of an Oakland peer-organizing example",
        "later NYC Artist Coalition public priority-setting on the same discussion surface"
      ],
      doesNotEstablish: [
        "445 attendees",
        "sole creation of NYC Artist Coalition by Jamie or Call Script",
        "individual authorship of every event or discussion contribution",
        "institutional endorsement of Jamie or every coalition position"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-WOWLIST-DB-SCALE-2016-2017",
      sourceId: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
      project: "wowlist",
      assertion:
        "Three production snapshots show WOW List growing from 995 users and 10,136 posts/events in June 2016 to 1,846 users and 16,142 posts/events in July 2017.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-POPULAR-VOTE-SNAPSHOT-2017",
      sourceId: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
      project: "wowlist",
      assertion:
        "By July 22, 2017, the Popular Vote civic calendar contained 933 linked post/event records, 196 follows, and contributions from 10 anonymous contributor IDs.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-WOWLIST-SNAPSHOT-LINEAGE-2017",
      sourceId: "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The production snapshot dates the NYC Artist Coalition list to February 7, 2017, after the January 27 DCLA event, and records 82 linked post/event records by July 22, 2017.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CREATION-ROLE",
        "CLM-NYCAC-FACEBOOK-CIVIC-RELAY"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016",
      sourceId: "SRC-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016",
      project: "wowlist",
      assertion:
        "A Jamie-authored November 12, 2016, Git commit directly implements popular.vote domain routing in the WOW List codebase.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-SUNDAY-DINNER-WORKBOOK-SEQUENCE-2021",
      sourceId: "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026",
      project: "sunday-dinner",
      assertion:
        "The protected workbook contains 345 numbered gathering columns spanning January 22, 2012, through March 7, 2021, supporting a long-running and instrumented hosting practice.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-SUNDAY-DINNER-WORKBOOK-TOTAL-BOUNDARY",
      sourceId: "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026",
      project: "sunday-dinner",
      assertion:
        "The workbook displays 2,783 meals served, but event-sequence counts sum to 2,769; neither value should be projected as audited attendance or unique people until reconciled.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-CALLSCRIPT-POPULAR-VOTE-LINK-2026",
      sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026",
      project: "wowlist",
      assertion:
        "The public Call Script Page links directly to popular.vote, establishing a visible connection between the calling project and the WOW List civic calendar surface.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-CALLSCRIPT-NYCAC-DCLA-COHOST-2017",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The January 27, 2017, DCLA event displays NYC Artist Coalition and Call Script among its hosts and 445 responses; the response label is not attendance.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-CREATION-ROLE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-CALLSCRIPT-AGENDA-SOLICITATION-2017",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Call Script used the event discussion to solicit meeting priorities and circulate peer-city organizing evidence from Oakland.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-CREATION-ROLE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-PARTICIPATORY-PRIORITY-POLL-2017",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      project: "nyc-artist-coalition",
      assertion:
        "A later NYC Artist Coalition poll on the discussion surface asked participants to add and assess coalition priorities across space compliance, displacement, public safety, mutual support, professional services, and advocacy.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NYCAC-FACEBOOK-CIVIC-RELAY"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-CALLSCRIPT-NYCAC-CAUSAL-BOUNDARY-2026",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The event and discussion support Jamie's reported facilitation and infrastructure contribution to coalition formation, but do not independently establish that Jamie alone founded NYC Artist Coalition.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-CREATION-ROLE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [],
  researchTasks: [
    {
      id: "TASK-SUNDAY-DINNER-WORKBOOK-RECONCILIATION",
      project: "sunday-dinner",
      question:
        "Can the workbook's participant-total formula, gathering-sequence totals, duplicate labels, and dated milestones be reconciled without exposing person-level records?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Reconcile the participant-axis total against every gathering-sequence total.",
        "Crosswalk duplicate and unnumbered gathering labels to dated event records.",
        "Compare only aggregate results with public milestone sources and collaborator-confirmed records."
      ],
      successCriteria: [
        "Explain the 14-instance difference between the displayed participant total and the event-sequence sum.",
        "Resolve duplicate gathering labels without publishing identities or histories.",
        "Identify whether an exact total is defensible for public use or should remain bounded working evidence."
      ],
      sourceIds: ["SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026"],
      claimIds: [],
      publicSummary:
        "Reconcile aggregate Sunday Dinner counts and chronology while keeping all participant records protected.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-LINEAGE-2026",
      project: "wowlist",
      question:
        "What defensible evidence connects Sunday Dinner's participation practice, WOW List, popular.vote, Call Script, and the formation-era NYC Artist Coalition participation system?",
      methods: [
        "Streamed aggregate counts from three historic WOW List production database snapshots without retaining raw rows or person identifiers.",
        "Inspected a Jamie-authored local Git commit that added popular.vote domain routing.",
        "Analyzed formulas, labels, and dates in a protected Sunday Dinner workbook while excluding person-level records.",
        "Traversed the authenticated public Call Script Page and the full materialized January 2017 DCLA event discussion to terminal no-growth."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "WOW List grew from 995 users and 10,136 posts/events in June 2016 to 1,846 users and 16,142 posts/events in July 2017.",
        "Jamie directly implemented popular.vote domain routing on November 12, 2016; the July 2017 database snapshot records 933 linked items, 196 follows, and 10 anonymous contributors for the Popular Vote list.",
        "The Sunday Dinner workbook preserves 345 numbered gathering columns across January 2012-March 2021 and a protected total that requires reconciliation.",
        "Call Script links to popular.vote and used the January 2017 DCLA event discussion for agenda solicitation and peer-city learning before later NYC Artist Coalition priority-setting appeared on the same surface."
      ],
      limitations: [
        "Chronology and linked surfaces do not establish a single linear cause or sole founder.",
        "Database counts are snapshot totals, not reach, attendance, conversion, endorsement, or current activity.",
        "The workbook contains private participant records and its two aggregate counting axes do not fully reconcile.",
        "Facebook response labels are not attendance, and shared-account authorship remains bounded."
      ],
      sourceIds: [
        "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017",
        "SRC-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016",
        "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026",
        "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026",
        "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017"
      ],
      publicSummary:
        "A bounded evidence chain connects a decade-long hosting practice, WOW List's civic-calendar deployment, Call Script agenda facilitation, and NYC Artist Coalition's emerging participation system while preserving collective credit and privacy.",
      protectedLocatorId: "RESEARCH-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-2026"
    }
  ]
};
