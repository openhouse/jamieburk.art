import type { KnowledgeBank } from "./schema.ts";

type WowlistSundayDinnerCallscriptDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const wowlistSundayDinnerCallscriptDevelopmentRecords: WowlistSundayDinnerCallscriptDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-15-WOWLIST-DATABASE-SNAPSHOTS",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Historic WOWList production database dumps offered for aggregate scale, growth, and geography analysis.",
      projectHints: ["wowlist"],
      status: "processed",
      disposition:
        "Recomputed bounded product-scale and city-threshold claims from three snapshots without restoring a live database or publishing raw rows.",
      linkedRecordIds: [
        "INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
        "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
        "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
        "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
        "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE"
      ],
      protectedLocatorId: "ARCHIVE-WOWLIST-DATABASE-SNAPSHOTS-2016-2017-001"
    },
    {
      id: "INT-2026-07-15-SUNDAY-DINNER-WORKBOOK",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Shared Sunday Dinner attendance and participation workbook offered as evidence of recurring operations.",
      projectHints: ["sunday-dinner", "196-artists-residency"],
      status: "processed",
      disposition:
        "Promoted a structural operating-system claim from aggregate workbook analysis while excluding every person-level record and holding attendee totals.",
      linkedRecordIds: [
        "INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026",
        "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
        "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
        "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
        "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM"
      ],
      protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021-001"
    },
    {
      id: "INT-2026-07-15-CALLSCRIPT-NYCAC-LINEAGE",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public-safe",
      summary:
        "Call Script page and January 2017 meeting discussion offered as public lineage evidence connecting popular.vote with the emergence of NYC Artist Coalition.",
      sourceUrl:
        "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
      projectHints: ["wowlist", "nyc-artist-coalition"],
      status: "processed",
      disposition:
        "Promoted a bounded bank-only lineage claim preserving collective formation credit and rejecting reach, attendance, and sole-founder interpretations.",
      linkedRecordIds: [
        "INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026",
        "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
        "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
        "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
        "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
        "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
      sourceId: "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
      readAt: "2026-07-15",
      reader: "Codex read-only archive audit",
      assertions: [
        {
          id: "ASSERT-WOWLIST-SNAPSHOT-DATES",
          statement:
            "Archive metadata identifies three distinct snapshots from June 24, 2016, June 1, 2017, and July 22, 2017.",
          locator: "pg_restore archive headers",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-PRODUCTION-SCHEMA",
          statement:
            "The snapshots preserve a production social-event schema spanning users, posts, tags, follows, saved records, calendar integration, geolocation, email settings, and activity tables.",
          locator: "TABLE DATA catalog",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The snapshots contain private user and activity data, end in July 2017, and do not include a complete media archive."
      ],
      entityIds: ["Jamie-Burkart", "WOWList"],
      themeIds: ["community-platforms", "production-data", "archive-preservation"],
      candidateClaimIds: [
        "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
        "CND-WOWLIST-OFFICIAL-CITY-CHAPTERS"
      ]
    },
    {
      id: "READ-WOWLIST-DATABASE-AUDIT-2026-07-15",
      sourceId: "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
      readAt: "2026-07-15",
      reader: "Codex read-only archive audit",
      assertions: [
        {
          id: "ASSERT-WOWLIST-LATEST-SCALE",
          statement:
            "The July 22, 2017 snapshot contains 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 list follows, and 20,927 saved or starred records.",
          locator: "Aggregate COPY row counts",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-SNAPSHOT-GROWTH",
          statement:
            "Between the June 24, 2016 and July 22, 2017 snapshots, user rows increased by 851 and post or event rows increased by 6,006.",
          locator: "Three-snapshot comparison",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-CITY-THRESHOLD",
          statement:
            "Thirty-five city labels contain at least 50 geocoded posts or events, while 48 contain at least 25.",
          locator: "Post-to-geolocation city aggregation",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Counts represent database rows; the city threshold is an activity proxy rather than proof of official chapters, equivalent communities, attendance, or reach."
      ],
      entityIds: ["Jamie-Burkart", "WOWList"],
      themeIds: ["product-scale", "growth", "geography", "claim-boundaries"],
      candidateClaimIds: [
        "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
        "CND-WOWLIST-OFFICIAL-CITY-CHAPTERS"
      ]
    },
    {
      id: "READ-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
      sourceId: "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
      readAt: "2026-07-15",
      reader: "Codex public-safe workbook audit",
      assertions: [
        {
          id: "ASSERT-SUNDAY-DINNER-LONGITUDINAL-SYSTEM",
          statement:
            "The workbook operates as a longitudinal participation system rather than a simple guest list.",
          locator: "Sheet structure and primary gathering matrix",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SUNDAY-DINNER-OPERATING-FIELDS",
          statement:
            "The structure connects numbered gatherings with invitations, responses, attendance logic, themes, hosts, contact continuity, and follow-through.",
          locator: "Primary and derivative sheet labels",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The workbook contains protected community records and cannot be used as a public attendee directory or response-level evidence source."
      ],
      entityIds: ["Jamie-Burkart", "Sunday-Dinner", "196-Artists-Residency"],
      themeIds: ["hospitality-operations", "participation", "continuity", "privacy"],
      candidateClaimIds: [
        "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
        "CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL"
      ]
    },
    {
      id: "READ-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
      sourceId: "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
      readAt: "2026-07-15",
      reader: "Codex public-safe workbook audit",
      assertions: [
        {
          id: "ASSERT-SUNDAY-DINNER-WORKBOOK-SCALE",
          statement:
            "The shared workbook contains 17 sheets and 21,617 formula cells supporting reusable participation operations.",
          locator: "Workbook structural census",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SUNDAY-DINNER-NUMBERED-HISTORY",
          statement:
            "The primary sheet contains 340 distinct numbered gathering identifiers through 345, explicitly labels a 300th Sunday Dinner, and continues with later entries.",
          locator: "Primary-sheet header census",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SUNDAY-DINNER-NUMBERING-BOUNDARY",
          statement:
            "Five numbering gaps and four duplicated identifiers require a 300-plus claim rather than 340 unique verified events.",
          locator: "Identifier reconciliation",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Structural counts do not establish a public attendee total or permission to expose names, contacts, relationships, invitations, responses, attendance indicators, or formulas."
      ],
      entityIds: ["Jamie-Burkart", "Sunday-Dinner"],
      themeIds: ["longitudinal-operations", "participation", "measurement", "privacy"],
      candidateClaimIds: [
        "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
        "CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL"
      ]
    },
    {
      id: "READ-CALLSCRIPT-PUBLIC-PAGE-2026",
      sourceId: "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
      readAt: "2026-07-15",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-CALLSCRIPT-POPULAR-VOTE-LINK",
          statement: "Call Script's public page links to popular.vote.",
          locator: "Page links section",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLSCRIPT-NYCAC-NEXT-MEETING",
          statement:
            "The page directs people to NYC Artist Coalition's March 6, 2017 general meeting.",
          locator: "Public timeline post and attached event",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "A public page link and post do not establish individual authorship of every account action, attendance, reach, or sole organizational ownership."
      ],
      entityIds: ["Jamie-Burkart", "Call-Script", "WOWList", "NYC-Artist-Coalition"],
      themeIds: ["public-action-surfaces", "calendar-infrastructure", "continuity"],
      candidateClaimIds: [
        "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
        "CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING"
      ]
    },
    {
      id: "READ-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
      sourceId: "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
      readAt: "2026-07-15",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-CALLSCRIPT-GROUP-NAMING-PROMPT",
          statement:
            "Call Script asked meeting participants to choose a name the group could carry forward while finding solutions and advocating for creative community.",
          locator: "January 27, 2017 naming poll",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLSCRIPT-NYCAC-POLL-RESULT",
          statement:
            "NYC Artist Coalition is the leading visible result in the authenticated July 2026 poll capture.",
          locator: "Expanded poll results",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLSCRIPT-COLLECTIVE-EVENT-CONTEXT",
          statement:
            "The public event surface credits Call Script, NYC Artist Coalition, the Department of Cultural Affairs, and other collaborators.",
          locator: "Event hosts and details",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The poll does not legally found an organization or support sole-founder, attendance, reach, endorsement, or policy-impact claims."
      ],
      entityIds: ["Jamie-Burkart", "Call-Script", "NYC-Artist-Coalition"],
      themeIds: ["participatory-naming", "facilitation", "collective-formation"],
      candidateClaimIds: [
        "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
        "CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING"
      ]
    },
    {
      id: "READ-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
      sourceId: "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
      readAt: "2026-07-15",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-JAMIE-CALLSCRIPT-PROJECT-IDENTITY",
          statement: "Jamie identifies Call Script as his project.",
          locator: "July 15, 2026 first-person submission",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-CALLSCRIPT-LINEAGE-INQUIRY",
          statement:
            "Jamie identifies the popular.vote link and January 2017 event discussion as connective evidence for his facilitation of early NYC Artist Coalition formation.",
          locator: "July 15, 2026 first-person submission",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "First-person context establishes Jamie's account and research direction but should be paired with public records and collective-credit boundaries."
      ],
      entityIds: ["Jamie-Burkart", "Call-Script", "NYC-Artist-Coalition"],
      themeIds: ["first-person-context", "facilitation", "collective-credit"],
      candidateClaimIds: ["CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
      project: "wowlist",
      text:
        "By July 22, 2017, WOWList's archived production database contained 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 list follows, and 20,927 saved or starred records, with 35 city labels meeting a 50-geocoded-record threshold.",
      status: "promoted",
      sourceIds: [
        "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
        "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15"
      ],
      researchInquiryIds: ["INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026"],
      supportSummary:
        "Three snapshot headers and a fresh aggregate COPY-row audit directly establish the point-in-time counts and bounded city threshold.",
      missingEvidence: [],
      boundaries: [
        "Describe database rows and a city-activity proxy, not reach, attendance, official chapters, current operation, or a complete archive."
      ],
      promotedClaimId: "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-WOWLIST-OFFICIAL-CITY-CHAPTERS",
      project: "wowlist",
      text: "WOWList operated 35 official city chapters.",
      status: "contradicted",
      sourceIds: ["SRC-WOWLIST-DATABASE-AUDIT-2026-07-15"],
      researchInquiryIds: ["INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026"],
      supportSummary:
        "The archive supports 35 city labels with at least 50 geocoded posts or events, not organizational chapters.",
      missingEvidence: ["Formal chapter records and governance evidence"],
      boundaries: ["Use roughly 35 city ecosystems or 35 city labels meeting the threshold."],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
      project: "sunday-dinner",
      text:
        "Jamie designed and maintained a longitudinal Sunday Dinner participation system connecting numbered gatherings, invitations, responses, attendance logic, themes, hosts, and reusable follow-through structures.",
      status: "promoted",
      sourceIds: [
        "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
        "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
        "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025"
      ],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026"],
      supportSummary:
        "The longitudinal workbook supplies the missing chronology and aggregate 300-plus basis; the revision-attributed tracker corroborates Jamie's ongoing authorship and maintenance.",
      missingEvidence: [],
      boundaries: [
        "Keep every person-level row private, use 300-plus rather than an unreconciled exact event total, and do not infer attendance from invitations or responses."
      ],
      promotedClaimId: "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL",
      project: "sunday-dinner",
      text: "The workbook establishes a publishable total number of Sunday Dinner attendees.",
      status: "research-needed",
      sourceIds: ["SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15"],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026"],
      supportSummary:
        "The workbook contains invitation, response, and attendance structures, but public-safe aggregate analysis did not reconcile people, statuses, duplicates, or attendance semantics into a defensible total.",
      missingEvidence: [
        "A consent-safe deduplication and attendance-definition protocol",
        "Human review of status semantics and duplicate identities",
        "A compelling editorial reason to publish an attendee total"
      ],
      boundaries: ["Do not publish names or convert invitations and responses into attendance."],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
      project: "nyc-artist-coalition",
      text:
        "Jamie established Call Script as a popular.vote-linked public action surface whose January 2017 discussion supported participatory naming and continued convening for the emerging NYC Artist Coalition.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
        "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
        "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
        "SRC-VICE-NYCAC-DIY-SAFETY-2017"
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026"],
      supportSummary:
        "Jamie's first-person context establishes his project relationship; public records establish the popular.vote link, naming poll, and route to the next coalition meeting; contemporaneous reporting corroborates early formation context.",
      missingEvidence: [],
      boundaries: [
        "Preserve collective formation credit and do not convert page administration, poll results, responses, or platform analytics into sole-founder, attendance, reach, or impact claims."
      ],
      promotedClaimId: "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING",
      project: "nyc-artist-coalition",
      text:
        "Call Script reached 10,000 unique people, brought 445 attendees to the meeting, and proves Jamie solely founded NYC Artist Coalition.",
      status: "contradicted",
      sourceIds: ["SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017"],
      researchInquiryIds: ["INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026"],
      supportSummary:
        "The public surface exposes historical platform reach language, response counts, and a participatory poll, none of which establish audited unique reach, attendance, or sole founding authorship.",
      missingEvidence: [
        "Audited analytics definitions",
        "Attendance records",
        "Collective formation testimony and governance records"
      ],
      boundaries: [
        "Use the records to describe public facilitation and continuity only."
      ],
      reviewedAt: "2026-07-15"
    }
  ],
  promotions: [
    {
      id: "PROM-WOWLIST-ARCHIVED-PRODUCTION-SCALE-2026",
      candidateClaimId: "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
      claimId: "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
      decision: "promoted",
      reason:
        "Fresh aggregate analysis directly supports the existing public scale language and gives the roughly 35-city phrase an explicit threshold.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-WOWLIST-OFFICIAL-CITY-CHAPTERS-REJECT-2026",
      candidateClaimId: "CND-WOWLIST-OFFICIAL-CITY-CHAPTERS",
      decision: "rejected",
      reason:
        "Geocoded product activity does not establish formal chapters, governance, or equivalent community depth.",
      decidedAt: "2026-07-15",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-SUNDAY-DINNER-LONGITUDINAL-SYSTEM-2026",
      candidateClaimId: "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
      claimId: "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
      decision: "promoted",
      reason:
        "The shared longitudinal workbook supplies the chronology and operating depth missing from the earlier one-period tracker while preserving strict privacy boundaries.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL-HOLD-2026",
      candidateClaimId: "CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL",
      decision: "held",
      reason:
        "Status semantics, duplicates, consent, and editorial necessity are unresolved; no attendee total is needed for the current hiring argument.",
      decidedAt: "2026-07-15",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026",
      candidateClaimId: "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
      claimId: "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
      decision: "promoted",
      reason:
        "The public sequence is coherent and useful as bank depth, with Jamie's project role and collective formation boundaries explicit.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING-REJECT-2026",
      candidateClaimId: "CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING",
      decision: "rejected",
      reason:
        "Platform reach language, response counts, and naming-poll results do not establish audited reach, attendance, or sole founding authorship.",
      decidedAt: "2026-07-15",
      decidedBy: ["Codex authenticated archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-2026",
      audience:
        "Hiring managers and collaborators evaluating Jamie's technical project management, product operations, implementation, and participatory-systems practice.",
      goal:
        "Strengthen public proof where new evidence reduces reader doubt while preserving deeper lineage for future role-specific composition.",
      argument:
        "Jamie has repeatedly turned emerging cultural and civic activity into durable public and operating systems: a production community platform, a longitudinal participation workflow, and a public action surface that helped collective identity continue.",
      selectedClaimIds: [
        "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
        "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
        "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE"
      ],
      heldCandidateClaimIds: [
        "CND-WOWLIST-OFFICIAL-CITY-CHAPTERS",
        "CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL",
        "CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING"
      ],
      rationale: [
        "Project the database-backed WOWList scale claim because it replaces an approximate unsupported paragraph with a canonical bounded claim.",
        "Project the Sunday Dinner operating-system claim because it makes Jamie's actual design and maintenance work legible without exposing community records.",
        "Keep the Call Script lineage bank-only in this pass; it is valuable connective evidence but not required for the current case-study argument.",
        "Reject official-chapter, attendee-total, reach, and sole-founder readings because they exceed what the sources establish."
      ],
      createdAt: "2026-07-15"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-WOWLIST-SUNDAY-DINNER-CALLSCRIPT-VISUALS-2026",
      kind: "archive-research",
      summary:
        "Future visual selection could use a redacted WOWList system diagram, a privacy-safe reconstruction of the Sunday Dinner operating matrix, and a public Call Script-to-coalition timeline rather than raw database rows, participant records, or Facebook screenshots.",
      projectHints: ["wowlist", "sunday-dinner", "nyc-artist-coalition"],
      sourceIds: [
        "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
        "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
        "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017"
      ],
      candidateClaimIds: [
        "CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
        "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
        "CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE"
      ],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-15"
    }
  ]
};
