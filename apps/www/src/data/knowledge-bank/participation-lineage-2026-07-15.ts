import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";

export const participationLineageEntities = [
  {
    id: "ENT-CALL-SCRIPT",
    kind: "project",
    label: "Call Script",
    publicSafeSummary:
      "A public civic-participation project identity connected to popular.vote and later NYC Artist Coalition meeting and action routes.",
    aliases: ["CallScript", "popular.vote"],
    projectKey: "call-script",
    relatedEntityIds: ["ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION"],
    status: "historical"
  }
] satisfies EntityRecord[];

export const participationLineageIntake = [
  {
    id: "INTAKE-WOWLIST-DATABASE-SNAPSHOT-2017",
    receivedAt: reviewedAt,
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Read-only aggregate review of a July 2017 WOWList production database snapshot; account, authentication, contact, location, and participant-level rows remain outside the repository.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-WOWLIST"],
    disposition: "source-created",
    sourceIds: ["SRC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22"],
    claimIds: ["CLM-WOWLIST-DATABASE-SCALE-2017"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021",
    receivedAt: reviewedAt,
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Aggregate review of a protected Sunday Dinner operations workbook spanning 2012 through 2021; participant rows, contact fields, invitations, notes, and attendance detail remain outside the repository.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-SUNDAY-DINNER"],
    disposition: "source-created",
    sourceIds: ["SRC-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021"],
    claimIds: ["CLM-SUNDAY-DINNER-RECORDED-GATHERING-SCALE"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CALLSCRIPT-PARTICIPATION-LINEAGE-MEMORY-2026",
    receivedAt: reviewedAt,
    kind: "public-memory",
    publicSafeSummary:
      "Jamie's first-person account that Call Script and popular.vote connected lessons from WOWList participation design with his facilitation during NYC Artist Coalition's formation.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-CALL-SCRIPT", "ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION"],
    disposition: "research-open",
    sourceIds: ["SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026"],
    claimIds: ["CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE"],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Authenticated read-only review of the public Call Script Facebook page, including its popular.vote link and surviving routes to NYC Artist Coalition meetings and participation calls.",
    submittedBy: "Codex authenticated public-source review",
    sourceUrl: "https://www.facebook.com/callscript",
    entityIds: ["ENT-CALL-SCRIPT", "ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026"],
    claimIds: ["CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE"],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public Facebook event page for the January 27, 2017, DCLA meeting on DIY and alternative art spaces, displaying Call Script and NYC Artist Coalition as co-hosts.",
    submittedBy: "Codex authenticated public-source review",
    sourceUrl: "https://www.facebook.com/events/388137698233507/",
    entityIds: ["ENT-CALL-SCRIPT", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017"],
    claimIds: ["CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE"],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-FACEBOOK-NYCARTC-PRIORITY-POLL-2017",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public Facebook discussion surface preserving a November 2017 NYC Artist Coalition priority poll with twelve issue options and a route to a coalition meeting.",
    submittedBy: "Codex authenticated public-source review",
    sourceUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    entityIds: ["ENT-CALL-SCRIPT", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-FACEBOOK-NYCARTC-PRIORITY-POLL-2017"],
    claimIds: ["CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE"],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const participationLineageSources = [
  {
    id: "SRC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22",
    title: "WOWList production database snapshot aggregate review",
    author: "WOWList project archive; aggregate review by Codex",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    capturedAt: "2017-07-22T08:00:01-04:00",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected WOWList production database snapshot dated July 22, 2017; aggregate structure reviewed July 15, 2026.",
    publicNote:
      "The snapshot records 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and 35 city/region groups with at least 50 geocoded posts/events. No underlying database or participant-level record is public.",
    intakeIds: ["INTAKE-WOWLIST-DATABASE-SNAPSHOT-2017"],
    supportsGenerally: [
      "1,846 user rows",
      "16,142 post/event rows",
      "23,864 list/tag rows",
      "28,837 list-follow rows",
      "35 city/region groups with at least 50 geocoded posts/events"
    ],
    doesNotEstablish: [
      "unique active users",
      "complete lifetime activity",
      "current availability",
      "official city chapters",
      "user satisfaction",
      "institutional adoption",
      "measured cultural impact",
      "Jamie's sole authorship"
    ],
    protectedLocatorId: "ARCHIVE-WOWLIST-DATABASE-2017"
  },
  {
    id: "SRC-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021",
    title: "Sunday Dinner operations workbook aggregate review",
    author: "Sunday Dinner project archive; aggregate review by Codex",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation:
      "Protected Sunday Dinner operations workbook spanning 2012-2021; aggregate structure reviewed July 15, 2026.",
    publicNote:
      "The main sheet contains 345 numbered event columns from January 2012 through March 2021. Four event numbers are duplicated. Participant rows and contact fields remain outside the repository.",
    intakeIds: ["INTAKE-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021"],
    supportsGenerally: [
      "more than 300 numbered gathering records",
      "January 2012 through March 2021 date span",
      "structured invitation and attendance operations"
    ],
    doesNotEstablish: [
      "345 unique gatherings",
      "a complete lifetime event count",
      "a unique attendee count",
      "physical attendance for every invitation",
      "the 20-plus resident-artist figure",
      "Jamie's sole operation of every gathering"
    ],
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-OPERATIONS-2012-2021"
  },
  {
    id: "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026",
    title: "Jamie Burkart first-person account of the Call Script participation lineage",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person account of the relationship among WOWList, Call Script, popular.vote, and NYC Artist Coalition facilitation, July 2026.",
    publicNote:
      "Jamie describes Call Script and popular.vote as a bridge between participation lessons developed with WOWList and his facilitation during NYC Artist Coalition's formation. The account is retained as first-person evidence pending collaborator and project-record corroboration.",
    intakeIds: ["INTAKE-CALLSCRIPT-PARTICIPATION-LINEAGE-MEMORY-2026"],
    supportsGenerally: [
      "Jamie's reported facilitation role",
      "the reported WOWList-to-Call-Script-to-coalition method lineage"
    ],
    doesNotEstablish: [
      "sole creation of NYC Artist Coalition",
      "sole authorship of Call Script or popular.vote",
      "authorship of every project-account post",
      "a transfer of WOWList users",
      "policy causation"
    ],
    protectedLocatorId: "ACCOUNT-CALLSCRIPT-PARTICIPATION-LINEAGE-2026"
  },
  {
    id: "SRC-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
    title: "Call Script public Facebook page",
    organization: "Call Script",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/callscript",
    preferredPublicUrl: "canonical",
    publicCitation: "Call Script public Facebook page, reviewed July 15, 2026.",
    publicNote:
      "The page describes Call Script as a way to call representatives, links to popular.vote, and preserves posts routing readers to a March 2017 NYC Artist Coalition meeting, a community-board participation call, and a coalition sign-up route.",
    intakeIds: ["INTAKE-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026"],
    supportsGenerally: [
      "Call Script's popular.vote link",
      "Call Script routes to NYC Artist Coalition meetings and participation calls"
    ],
    doesNotEstablish: [
      "Jamie's creation or administration of the page",
      "individual post authorship",
      "complete post history",
      "audience transfer",
      "attendance",
      "adoption or impact"
    ]
  },
  {
    id: "SRC-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
    title: "NYC DIY Spaces post-Ghost-Ship DCLA meeting event page",
    organization: "NYC Artist Coalition, Call Script, and collaborators",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-01-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/388137698233507/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public event page for the January 27, 2017, DCLA meeting on DIY and alternative art spaces after the Ghost Ship fire.",
    publicNote:
      "The page displays NYC Artist Coalition and Call Script as co-hosts, identifies the New York City Department of Cultural Affairs as the venue, and displays 445 platform responses at review time.",
    intakeIds: ["INTAKE-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017"],
    supportsGenerally: [
      "January 27, 2017, event date",
      "DCLA venue",
      "Call Script and NYC Artist Coalition co-host display",
      "DIY and alternative art-space meeting purpose"
    ],
    doesNotEstablish: [
      "445 physical attendees",
      "445 unique people reached",
      "Jamie's event role",
      "sole organization by either named page",
      "institutional endorsement",
      "policy outcome"
    ]
  },
  {
    id: "SRC-FACEBOOK-NYCARTC-PRIORITY-POLL-2017",
    title: "NYC Artist Coalition November meeting priority poll",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-11-13",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition priority poll for a November 2017 meeting, preserved on a public Facebook discussion surface.",
    publicNote:
      "The poll asks participants what the coalition should do, exposes twelve issue options, and visibly includes commercial rent stabilization, community-led space legality, noise-complaint procedure, fire-guard testing, and anti-displacement policy.",
    intakeIds: ["INTAKE-FACEBOOK-NYCARTC-PRIORITY-POLL-2017"],
    supportsGenerally: [
      "a twelve-option coalition priority poll",
      "issue intake tied to a public meeting",
      "practical space-policy and operating concerns"
    ],
    doesNotEstablish: [
      "a complete coalition priority history",
      "the identity of every voter",
      "physical meeting attendance",
      "that the poll was part of the January DCLA event program",
      "Jamie's authorship of the poll",
      "policy causation"
    ]
  }
] satisfies SourceRecord[];

export const participationLineageReadings = [
  {
    id: "READ-WOWLIST-DATABASE-SNAPSHOT-2017-07-22",
    sourceId: "SRC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-WOWLIST-DATABASE-CORE-SCALE-2017",
        text:
          "The July 2017 snapshot contains 1,846 user rows, 16,142 post/event rows, 23,864 list/tag rows, and 28,837 list-follow rows.",
        relationToJamie: "outcome-context",
        supportTags: ["wowlist-database-core-scale"],
        confidence: "high",
        locator: "Aggregate table-row audit"
      },
      {
        id: "PROP-WOWLIST-DATABASE-CITY-ACTIVITY-2017",
        text:
          "Thirty-five city/region groupings contain at least 50 geocoded posts/events in the July 2017 snapshot.",
        relationToJamie: "outcome-context",
        supportTags: ["wowlist-database-city-activity-threshold"],
        confidence: "high",
        locator: "Aggregate geolocation-to-post audit"
      }
    ],
    limitations: [
      "Row counts do not establish unique active people, satisfaction, adoption by institutions, or cultural impact.",
      "The snapshot is a July 2017 point-in-time record, not a complete lifetime archive or current-service measure.",
      "City/region groups are an analytical threshold, not official chapters, and private location rows remain outside the repository."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021",
    sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-SUNDAY-DINNER-NUMBERED-EVENT-RECORDS",
        text:
          "The workbook's main sheet contains 345 numbered event columns spanning January 2012 through March 2021, with four duplicated event numbers.",
        relationToJamie: "outcome-context",
        supportTags: ["sunday-dinner-numbered-event-records"],
        confidence: "high",
        locator: "Aggregate header audit"
      },
      {
        id: "PROP-SUNDAY-DINNER-INVITATION-ATTENDANCE-STRUCTURE",
        text:
          "The workbook contains structured invitation and attendance operations across the numbered gathering columns.",
        relationToJamie: "project-context",
        supportTags: ["sunday-dinner-operations-structure"],
        confidence: "high",
        locator: "Aggregate workbook-structure audit"
      }
    ],
    limitations: [
      "Duplicate numbering and non-numbered columns make the workbook unsuitable as an exact unique-event census without further normalization.",
      "Invitation and response fields are not equivalent to physical attendance or unique-person counts.",
      "Participant rows, contact fields, notes, and raw attendance data remain protected outside the repository."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026",
    sourceId: "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE",
        text:
          "Jamie reports using Call Script and popular.vote to carry participation-design lessons from WOWList into facilitation during NYC Artist Coalition's formation.",
        relationToJamie: "collective-role",
        supportTags: ["callscript-participation-lineage-first-person"],
        confidence: "moderate",
        locator: "First-person account"
      }
    ],
    limitations: [
      "This first-person account does not independently establish project creation, coalition founding credit, or the precise chronology of the transition.",
      "Collaborator testimony, code or domain history, and dated project records remain necessary before public projection."
    ],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
    sourceId: "SRC-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-CALLSCRIPT-POPULAR-VOTE-LINK",
        text: "The Call Script page links to popular.vote and describes a representative-calling purpose.",
        relationToJamie: "project-context",
        supportTags: ["callscript-popular-vote-link"],
        confidence: "high",
        locator: "Page description and Links section"
      },
      {
        id: "PROP-CALLSCRIPT-NYCARTC-ROUTING",
        text:
          "The surviving page routes readers to a March 2017 NYC Artist Coalition meeting, a community-board participation call, and a coalition sign-up path.",
        relationToJamie: "project-context",
        supportTags: ["callscript-nycartc-participation-routing"],
        confidence: "high",
        locator: "Surviving public posts"
      }
    ],
    limitations: [
      "The page does not establish who created or administered it, who authored each post, or whether the surviving feed is complete.",
      "Posted links do not establish click-through, user transfer, attendance, adoption, or impact."
    ],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
    sourceId: "SRC-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-CALLSCRIPT-NYCARTC-DCLA-EVENT-COHOSTS",
        text:
          "The January 27, 2017, DCLA meeting page displays Call Script and NYC Artist Coalition together as event co-hosts.",
        relationToJamie: "project-context",
        supportTags: ["callscript-nycartc-event-cohost"],
        confidence: "high",
        locator: "Event details"
      },
      {
        id: "PROP-CALLSCRIPT-DCLA-EVENT-RESPONSE-DISPLAY",
        text: "The event page displayed 445 platform responses on July 15, 2026.",
        relationToJamie: "outcome-context",
        supportTags: ["callscript-dcla-event-response-display"],
        confidence: "high",
        locator: "Event response control"
      }
    ],
    limitations: [
      "A co-host display does not establish Jamie's individual role or sole organization by any host.",
      "Platform responses are mutable and are not physical attendance, unique reach, endorsement, or impact."
    ],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-NYCARTC-PRIORITY-POLL-2017",
    sourceId: "SRC-FACEBOOK-NYCARTC-PRIORITY-POLL-2017",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-NYCARTC-PRIORITY-POLL-2017",
        text:
          "A November 2017 NYC Artist Coalition meeting post asked participants what the coalition should do and presented twelve issue options, including commercial-rent, community-space, noise, fire-guard, and anti-displacement concerns.",
        relationToJamie: "project-context",
        supportTags: ["nycartc-public-priority-intake"],
        confidence: "high",
        locator: "Public discussion rendering"
      }
    ],
    limitations: [
      "The rendering does not identify Jamie as the poll author or preserve a complete coalition decision record.",
      "The poll does not establish participant identities, physical attendance, enacted priorities, or policy outcomes.",
      "Its appearance on the currently rendered discussion surface does not make it part of the January DCLA event program."
    ],
    researchTaskIds: ["TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION"]
  }
] satisfies SourceReading[];

export const participationLineageClaims = [
  {
    id: "CLM-WOWLIST-DATABASE-SCALE-2017",
    project: "wowlist",
    internalClaim:
      "Jamie's collective WOWList role is publicly documented, while a July 2017 production snapshot records 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and 35 city/region groups with at least 50 geocoded posts/events.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-WOWLIST-DATABASE-SNAPSHOT-2017"],
    requiredSupportTags: [
      "wowlist-social-origin",
      "wowlist-database-core-scale",
      "wowlist-database-city-activity-threshold"
    ],
    composition: {
      action: "Worked with Richard to turn Sunday Dinner calendar practice into the WOWList community-event platform.",
      intendedEnd:
        "Let local arts and music communities publish, follow, and distribute events through their own language and relationships.",
      usableResult:
        "A production platform whose July 2017 snapshot contains 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and activity above a conservative threshold in 35 city/region groups.",
      audience: "Community organizers, event participants, and hiring readers evaluating product and operational scale.",
      collectiveCredit:
        "The public origin record names Richard and Jamie together; collaborators and community participants retain credit for the platform's use and cultural life.",
      causalBoundary:
        "Database rows establish point-in-time platform scale and activity, not unique active users, official chapters, satisfaction, institutional adoption, or measured cultural impact."
    },
    projections: [
      {
        key: "case-study",
        text:
          "Jamie worked with Richard to turn Sunday Dinner calendar practice into WOWList. A protected July 2017 database snapshot records 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and 35 city/region groups with at least 50 geocoded posts/events.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-ORIGIN-2014",
        relationship: "direct-support",
        supports: ["Jamie and Richard's collective project role"],
        propositionIds: ["PROP-X-WOWLIST-ORIGIN-2014"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-DATABASE-SNAPSHOT-2017-07-22",
        relationship: "private-support",
        supports: ["the July 2017 aggregate scale and geographic-activity threshold"],
        propositionIds: [
          "PROP-WOWLIST-DATABASE-CORE-SCALE-2017",
          "PROP-WOWLIST-DATABASE-CITY-ACTIVITY-2017"
        ],
        publicNote: "Only aggregate counts and method boundaries are public.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The database snapshot is point-in-time and incomplete as a lifetime or current-service record.",
      "City/region activity means at least 50 geocoded posts/events, not an official chapter or independently verified community organization.",
      "No participant-level, contact, authentication, or location rows are published."
    ],
    antiClaims: [
      "Jamie alone created WOWList.",
      "WOWList had official chapters in 35 cities.",
      "The row counts prove unique active users, satisfaction, adoption, or cultural impact."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex aggregate archive review", "Codex Chad-lens composition review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-RECORDED-GATHERING-SCALE",
    project: "sunday-dinner",
    internalClaim:
      "An independent co-op interview documents Jamie's collective weekly hosting role, while a protected operations workbook preserves 345 numbered event columns spanning January 2012 through March 2021, with four duplicated numbers.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021"],
    requiredSupportTags: ["weekly-community-dinner", "sunday-dinner-numbered-event-records"],
    composition: {
      action: "Co-hosted a recurring Sunday-night dinner open to the community and sustained its operating record over time.",
      intendedEnd: "Create a low-barrier, repeatable setting for people to meet, share a meal, and continue cultural work together.",
      usableResult:
        "A protected operations workbook preserving more than 300 numbered gathering records and their invitation and attendance structure across 2012-2021.",
      audience: "Friends, neighbors, community participants, artists, and hiring readers evaluating participation operations.",
      collectiveCredit:
        "Credit Jamie and his co-host together; the wider Sunday Dinner community made the gatherings meaningful and the workbook does not assign sole credit.",
      causalBoundary:
        "The records support recurring practice and more than 300 gathering entries, not unique attendee totals, exact physical attendance, complete lifetime activity, or measured social outcomes."
    },
    projections: [
      {
        key: "case-study",
        text:
          "Jamie and his co-host opened Sunday Dinner to the community each week. A protected operations workbook preserves more than 300 numbered gathering records spanning January 2012 through March 2021.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-GREENE-HILL-COOP-QA-2017",
        relationship: "direct-support",
        supports: ["Jamie's collective weekly hosting role and community invitation"],
        propositionIds: ["PROP-GREENE-SUNDAY-DINNER-WEEKLY"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-WORKBOOK-2012-2021",
        relationship: "private-support",
        supports: ["more than 300 numbered gathering records and the 2012-2021 span"],
        propositionIds: ["PROP-SUNDAY-DINNER-NUMBERED-EVENT-RECORDS"],
        publicNote: "Only aggregate structure and date span are public.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Four duplicated event numbers prevent treating 345 columns as 345 uniquely numbered gatherings without further normalization.",
      "Invitation and response records are not physical-attendance or unique-person counts.",
      "Participant rows, contact fields, notes, and raw attendance data are not published.",
      "This claim does not support the separate 20-plus resident-artist figure."
    ],
    antiClaims: [
      "Jamie solely created or operated every Sunday Dinner.",
      "The workbook proves 345 unique gatherings or a unique attendee total.",
      "The workbook is a complete public attendance database."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex aggregate archive review", "Codex Chad-lens composition review"]
  },
  {
    id: "CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE",
    project: "call-script",
    internalClaim:
      "Jamie reports using Call Script and popular.vote as a participation bridge from WOWList into NYC Artist Coalition facilitation; public Facebook records corroborate a project-identity intersection, coalition routing, and issue-intake pattern without independently proving Jamie's precise role or sole authorship.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [
      "INTAKE-CALLSCRIPT-PARTICIPATION-LINEAGE-MEMORY-2026",
      "INTAKE-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
      "INTAKE-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
      "INTAKE-FACEBOOK-NYCARTC-PRIORITY-POLL-2017"
    ],
    requiredSupportTags: [
      "callscript-participation-lineage-first-person",
      "callscript-popular-vote-link",
      "callscript-nycartc-participation-routing",
      "callscript-nycartc-event-cohost",
      "nycartc-public-priority-intake"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Jamie's reported facilitation and method lineage"],
        propositionIds: ["PROP-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
        relationship: "corroborating",
        supports: ["the popular.vote link and surviving NYC Artist Coalition participation routes"],
        propositionIds: ["PROP-CALLSCRIPT-POPULAR-VOTE-LINK", "PROP-CALLSCRIPT-NYCARTC-ROUTING"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
        relationship: "corroborating",
        supports: ["Call Script and NYC Artist Coalition's shared event-host identity"],
        propositionIds: ["PROP-CALLSCRIPT-NYCARTC-DCLA-EVENT-COHOSTS"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-NYCARTC-PRIORITY-POLL-2017",
        relationship: "context",
        supports: ["a public coalition issue-intake pattern"],
        propositionIds: ["PROP-NYCARTC-PRIORITY-POLL-2017"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The public records corroborate a project-identity and participation lineage, not Jamie's precise founding or facilitation role.",
      "A current page link and surviving posts do not establish complete chronology, individual authorship, user transfer, or impact.",
      "The priority poll documents issue intake but not who authored it, who voted, what was adopted, or which outcomes followed."
    ],
    antiClaims: [
      "Jamie alone created NYC Artist Coalition.",
      "Jamie solely created Call Script or popular.vote.",
      "Jamie authored every Call Script or NYC Artist Coalition post.",
      "The co-host display proves sole event leadership.",
      "Facebook responses equal physical attendance or unique reach.",
      "The records prove WOWList users transferred to NYC Artist Coalition or caused policy change."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart memory intake", "Codex authenticated Facebook review"]
  }
] satisfies ClaimRecord[];

export const participationLineageResearchTasks = [
  {
    id: "TASK-CALLSCRIPT-NYCARTC-ROLE-AND-CHRONOLOGY-CORROBORATION",
    project: "call-script",
    question:
      "What dated project records and collaborator accounts can establish Jamie's precise Call Script/popular.vote role and how that practice entered NYC Artist Coalition's early facilitation?",
    status: "open",
    priority: "high",
    openedAt: reviewedAt,
    intakeIds: [
      "INTAKE-CALLSCRIPT-PARTICIPATION-LINEAGE-MEMORY-2026",
      "INTAKE-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
      "INTAKE-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
      "INTAKE-FACEBOOK-NYCARTC-PRIORITY-POLL-2017"
    ],
    sourceIds: [
      "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-ACCOUNT-2026",
      "SRC-FACEBOOK-CALLSCRIPT-PUBLIC-PAGE-2026",
      "SRC-FACEBOOK-CALLSCRIPT-NYCARTC-DCLA-EVENT-2017",
      "SRC-FACEBOOK-NYCARTC-PRIORITY-POLL-2017"
    ],
    claimIds: ["CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE"],
    nextActions: [
      "Recover dated Call Script and popular.vote code, domain, planning, or launch records that identify contributors and chronology.",
      "Request bounded proof notes from Call Script and early NYC Artist Coalition collaborators about Jamie's facilitation and the transition between project practices.",
      "Recover stable post permalinks or an account export for the surviving coalition-routing posts and the November 2017 poll.",
      "Stop at corroborated project-identity context if role-specific evidence remains unavailable; do not infer founding credit from co-host or page-admin displays."
    ]
  }
] satisfies ResearchTask[];

export const participationLineageDecisions = [
  {
    id: "DEC-PUBLISH-WOWLIST-DATABASE-SCALE-2017",
    claimId: "CLM-WOWLIST-DATABASE-SCALE-2017",
    surface: "/work/wowlist",
    decision: "publish",
    rationale:
      "The source-backed aggregate replaces ambiguous adoption language with a precise point-in-time scale and activity threshold while exposing only metadata about the protected database.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-PUBLISH-SUNDAY-DINNER-RECORDED-GATHERING-SCALE",
    claimId: "CLM-SUNDAY-DINNER-RECORDED-GATHERING-SCALE",
    surface: "/work/196-sunday-dinner",
    decision: "publish",
    rationale:
      "The independent weekly-practice source and protected aggregate workbook support a calm 300-plus scale claim without exposing participant records or converting invitations into attendance.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE",
    claimId: "CLM-CALLSCRIPT-NYCARTC-PARTICIPATION-LINEAGE",
    surface: "/work/wowlist",
    decision: "defer",
    rationale:
      "The public records establish an important project-identity intersection and participation pattern, but Jamie's specific facilitation and creation chronology still rests materially on first-person evidence.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex evidence and composition review"]
  }
] satisfies ProjectionDecision[];
