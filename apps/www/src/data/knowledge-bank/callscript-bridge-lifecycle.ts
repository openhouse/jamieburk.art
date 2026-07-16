export const callscriptBridgeLifecycle = {
  entities: [
    {
      id: "ENT-CALL-SCRIPT",
      type: "platform",
      name: "Call Script",
      aliases: ["Callscript"],
      publicSummary:
        "A civic calling and public-coordination project Jamie identifies as part of the operating path into NYC Artist Coalition's early work.",
      sameAs: ["https://www.facebook.com/callscript"]
    }
  ],
  leads: [
    {
      id: "LEAD-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE",
      title: "Call Script, WOW List, and NYC Artist Coalition operating bridge",
      kind: "document",
      capturedAt: "2026-07-16",
      capturedBy: "Jamie Burkart and Codex authenticated archival-production review",
      state: "extracted",
      visibility: "public-safe",
      publicSummary:
        "Public and protected records preserve a bounded operating sequence from WOW List's civic event-sharing adaptation through a Call Script-cohosted DCLA meeting, public issue gathering, collaborative drafting, collective naming, and a follow-up coalition meeting.",
      publicUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
      projectAssociationStatus: "assigned",
      projectIds: ["PRJ-WOWLIST", "PRJ-NYC-ARTIST-COALITION"],
      entityIds: [
        "ENT-JAMIE-BURKART",
        "ENT-WOWLIST",
        "ENT-CALL-SCRIPT",
        "ENT-NYC-ARTIST-COALITION"
      ],
      sourceIds: [
        "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
        "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
        "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017"
      ],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      researchTaskIds: ["TASK-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE-2026"],
      nextAction:
        "Invite collaborator correction and preserve the sequence as helped-establish-and-produce evidence, not sole authorship or single-tool causality."
    },
    {
      id: "LEAD-SUNDAY-DINNER-WORKING-LEDGER",
      title: "Sunday Dinner working participation ledger",
      kind: "document",
      capturedAt: "2026-07-16",
      capturedBy: "Jamie Burkart and Codex protected-workbook review",
      state: "extracted",
      visibility: "private-reference",
      publicSummary:
        "A protected working ledger preserves numbered gathering records through 345 and strengthens the existing 300-plus project-history claim without establishing attendance or unique-participant totals.",
      projectAssociationStatus: "assigned",
      projectIds: ["PRJ-SUNDAY-DINNER-196"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-JULIA-FREDENBERG", "ENT-SUNDAY-DINNER"],
      sourceIds: ["SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021"],
      candidateClaimIds: ["CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING"],
      researchTaskIds: ["TASK-SUNDAY-DINNER-WORKING-LEDGER-2026"],
      protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-WORKING-LEDGER-2012-2021-001",
      nextAction:
        "Retain the aggregate project-history support while keeping row-level participant, contact, response, and formula data private."
    }
  ],
  observations: [
    {
      id: "OBS-CALLSCRIPT-PAGE-LINKS-POPULAR-VOTE",
      sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
      projectIds: ["PRJ-WOWLIST", "PRJ-NYC-ARTIST-COALITION"],
      entityIds: ["ENT-CALL-SCRIPT", "ENT-WOWLIST"],
      statement:
        "The surviving Call Script page links to popular.vote, an archived WOW List civic event-sharing adaptation for marches, meetings, and in-person connection.",
      locator: "Page links and public description",
      evidenceRole: "context",
      certainty: "moderate",
      doesNotEstablish: [
        "when the link was added",
        "Jamie's authorship of every page post",
        "sole ownership or causal impact"
      ],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-CALLSCRIPT-DCLA-PARTICIPATION-SEQUENCE",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      projectIds: ["PRJ-NYC-ARTIST-COALITION"],
      entityIds: [
        "ENT-JAMIE-BURKART",
        "ENT-CALL-SCRIPT",
        "ENT-NYC-ARTIST-COALITION"
      ],
      statement:
        "The January 27, 2017 public event record identifies Call Script as a cohost and preserves issue gathering, collaborative letter drafting, a naming poll led by NYC Artist Coalition at a displayed 57%, and routing into a February 6 follow-up meeting.",
      locator: "Event metadata and complete surviving public discussion",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: [
        "the naming-poll denominator",
        "verified attendance or unique reach",
        "Jamie's authorship of every post or comment",
        "a complete founding roster",
        "sole production or policy causality"
      ],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-WOWLIST-PRODUCTION-NYCAC-EVENT-SEQUENCE",
      sourceId: "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017",
      projectIds: ["PRJ-WOWLIST", "PRJ-SUNDAY-DINNER-196", "PRJ-NYC-ARTIST-COALITION"],
      entityIds: [
        "ENT-JAMIE-BURKART",
        "ENT-WOWLIST",
        "ENT-SUNDAY-DINNER",
        "ENT-NYC-ARTIST-COALITION"
      ],
      statement:
        "A read-only July 2017 production snapshot preserves an adjacent public-event sequence from January Sunday Dinner civic gatherings to the DCLA meeting, February coalition meetings, and later campaign activity.",
      locator: "Dated event-title and date sequence in the protected database snapshot; raw records excluded",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "that sequence proves causality",
        "individual authorship of event copy",
        "attendance, reach, or conversion",
        "permission to publish raw database records"
      ],
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-SUNDAY-DINNER-WORKING-LEDGER-SCALE",
      sourceId: "SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021",
      projectIds: ["PRJ-SUNDAY-DINNER-196"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-JULIA-FREDENBERG", "ENT-SUNDAY-DINNER"],
      statement:
        "The protected working ledger preserves numbered gathering columns through 345, including a contemporaneous 300th record, and recurring event-response workflows spanning 2012 through 2021.",
      locator: "Main-sheet visible dated event headers and numbered columns; participant rows excluded",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: [
        "verified attendance",
        "unique participant totals",
        "a clean independent audit",
        "participant consent or publication rights"
      ],
      candidateClaimIds: ["CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING"],
      reviewedAt: "2026-07-16"
    }
  ],
  researchTasks: [
    {
      id: "TASK-CALLSCRIPT-WOWLIST-NYCAC-BRIDGE-2026",
      candidateClaimIds: ["CND-NYCAC-PARTICIPATION-SYSTEM"],
      question:
        "What source-backed operating sequence connects popular.vote, Call Script, the January 2017 DCLA meeting, and NYC Artist Coalition's recurring participation system?",
      status: "completed",
      priority: "high",
      methods: [
        "Close-read the authenticated public Call Script page and January 27 event discussion",
        "Reconciled the event with the archived popular.vote surface",
        "Queried a read-only WOW List production snapshot for adjacent event records",
        "Separated platform records, protected corroboration, first-hand role context, and causal inference"
      ],
      sourceIds: [
        "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
        "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
        "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
        "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017",
        "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026"
      ],
      observationIds: [
        "OBS-CALLSCRIPT-PAGE-LINKS-POPULAR-VOTE",
        "OBS-CALLSCRIPT-DCLA-PARTICIPATION-SEQUENCE",
        "OBS-WOWLIST-PRODUCTION-NYCAC-EVENT-SEQUENCE"
      ],
      findings: [
        "The public record preserves a usable sequence from civic event sharing to listening, collaborative drafting, collective naming, and follow-up convening.",
        "Jamie identifies this facilitation pattern as part of his contribution; public and protected records corroborate the operating sequence while leaving post-level authorship open."
      ],
      limitations: [
        "The current Call Script link does not establish when it was added.",
        "The naming poll has no displayed denominator.",
        "The records do not establish sole founding credit, complete authorship, attendance, reach, or policy causality."
      ],
      nextActions: [
        "Invite collaborator corrections and first-hand proof notes",
        "Seek a dated primary record tying Call Script to popular.vote in 2016 or 2017",
        "Keep the bounded operating sequence in the Fair Rent composition"
      ],
      openedAt: "2026-07-16",
      completedAt: "2026-07-16"
    },
    {
      id: "TASK-SUNDAY-DINNER-WORKING-LEDGER-2026",
      candidateClaimIds: ["CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING"],
      question:
        "What can the Sunday Dinner working ledger establish without exposing participant records or turning response markers into attendance?",
      status: "completed",
      priority: "high",
      methods: [
        "Reviewed workbook structure without copying participant rows into the repository",
        "Profiled numbered event headers, marker vocabulary, and formula coverage",
        "Recorded duplicate and missing labels as data-quality limitations",
        "Separated project-history support from attendance and unique-participant claims"
      ],
      sourceIds: ["SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021"],
      observationIds: ["OBS-SUNDAY-DINNER-WORKING-LEDGER-SCALE"],
      findings: [
        "The ledger preserves numbered gathering columns through 345 and a contemporaneous 300th record.",
        "The ledger strengthens the existing 300-plus project-history claim as protected project-record support."
      ],
      limitations: [
        "The workbook is a working instrument with duplicate and missing labels, not an independently audited attendance census.",
        "No row-level participant, contact, response, or formula data may enter the public repository."
      ],
      nextActions: [
        "Retain the conservative public wording",
        "Seek collaborator or dated public corroboration if a stronger public metric becomes strategically useful",
        "Keep all row-level records protected"
      ],
      openedAt: "2026-07-16",
      completedAt: "2026-07-16"
    }
  ]
};
