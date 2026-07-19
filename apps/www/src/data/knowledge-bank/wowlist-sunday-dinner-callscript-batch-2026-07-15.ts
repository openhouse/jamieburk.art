import type { KnowledgeBank } from "./schema.ts";

type WowlistSundayDinnerCallscriptBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const wowlistSundayDinnerCallscriptBatchRecords: WowlistSundayDinnerCallscriptBatch = {
  sources: [
    {
      id: "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
      title: "WOWList production database snapshot series",
      organization: "WOWList",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2016-06-24 to 2017-07-22",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for three surviving WOWList production database snapshots, June 2016 to July 2017.",
      publicNote:
        "The snapshots remain outside the repository. Only aggregate table counts, bounded geography thresholds, and schema-level findings are retained publicly.",
      protectedLocatorId: "ARCHIVE-WOWLIST-DATABASE-SNAPSHOTS-2016-2017-001",
      supportsGenerally: [
        "three distinct production snapshots survive from June 24, 2016, June 1, 2017, and July 22, 2017",
        "the snapshots preserve users, posts or events, tags or lists, follows, saved or starred records, Google Calendar records, geolocation, email settings, and related product tables",
        "the archive supports point-in-time product-scale and growth analysis"
      ],
      doesNotEstablish: [
        "current platform activity",
        "unique human reach or attendance",
        "official city chapters",
        "a complete media archive",
        "permission to publish raw user, email, location, or activity rows"
      ]
    },
    {
      id: "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
      title: "WOWList read-only database aggregate audit",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "research-run",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for a July 15, 2026 read-only aggregate audit of three WOWList database snapshots.",
      publicNote:
        "The audit streamed table data through pg_restore without restoring a live database and emitted aggregate counts only. Checksums, locators, and raw rows remain protected.",
      protectedLocatorId: "RESEARCH-WOWLIST-DATABASE-AUDIT-2026-001",
      supportsGenerally: [
        "the July 22, 2017 snapshot contains 1,846 user rows and 16,142 post or event rows",
        "the July 22, 2017 snapshot contains 23,864 tag or list rows, 28,837 list-follow rows, and 20,927 saved or starred rows",
        "the July 22, 2017 snapshot contains 15,915 Google Calendar event rows and 15,875 post-calendar links",
        "35 city labels have at least 50 geocoded post or event rows",
        "the three-snapshot series shows users growing from 995 to 1,846 and posts or events from 10,136 to 16,142"
      ],
      doesNotEstablish: [
        "that every row represents a unique person or unique public event",
        "attendance, impressions, or audience reach",
        "35 official chapters or equally active communities",
        "activity after July 22, 2017"
      ]
    },
    {
      id: "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
      title: "Sunday Dinner longitudinal participation workbook",
      organization: "Sunday Dinner / 196 Artists Residency",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2012-01-22 to 2021-01-20",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for Jamie Burkart's longitudinal Sunday Dinner participation workbook.",
      publicNote:
        "The workbook remains private because it contains names, contact details, relationship context, invitation history, responses, and attendance indicators. Only structural aggregates are retained in the repository.",
      protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021-001",
      supportsGenerally: [
        "a longitudinal operating workbook exists behind Sunday Dinner",
        "the workbook connects numbered gatherings with invitation, response, attendance, theme, host, and follow-through structures",
        "the primary sheet includes numbered gathering columns continuing beyond 300",
        "the workbook contains reusable formulas and derivative views for recurring participation operations"
      ],
      doesNotEstablish: [
        "a public attendee count",
        "permission to publish any person-level row",
        "that invitations or responses equal attendance",
        "the 20-plus resident-artist total",
        "complete history of every Sunday Dinner gathering"
      ]
    },
    {
      id: "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
      title: "Sunday Dinner workbook public-safe structural audit",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "research-run",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for a July 15, 2026 structural audit of the Sunday Dinner workbook shared by Jamie Burkart.",
      publicNote:
        "The exact shared workbook was downloaded read-only and inspected without publishing participant names, contact data, row values, formulas, or source locators.",
      protectedLocatorId: "RESEARCH-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-001",
      supportsGenerally: [
        "the workbook contains 17 sheets and 21,617 formula cells",
        "the primary sheet contains 340 distinct numbered gathering identifiers through 345, with five numbering gaps and four duplicated identifiers",
        "all 340 distinct numbered gathering identifiers have associated operating data",
        "the workbook explicitly labels a 300th Sunday Dinner and continues with later numbered entries",
        "the workbook includes invitation, response, attendance, theme, host, contact, and follow-through structures"
      ],
      doesNotEstablish: [
        "340 unique public events without numbering reconciliation",
        "a public count of attendees, invitations, responses, or relationships",
        "permission to publish formulas or person-level data",
        "the resident-artist total"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
      title: "Call Script public Facebook page",
      organization: "Call Script",
      kind: "personal-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.facebook.com/callscript",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Call Script public Facebook page, authenticated review accessed July 15, 2026.",
      publicNote:
        "The page links to popular.vote and preserves a post directing people to NYC Artist Coalition's March 2017 general meeting.",
      supportsGenerally: [
        "Call Script publicly linked to the popular.vote calendar",
        "Call Script later directed people to NYC Artist Coalition's March 6, 2017 general meeting",
        "the page functioned as a public action and continuity surface"
      ],
      doesNotEstablish: [
        "individual authorship of every post",
        "sole responsibility for NYC Artist Coalition's formation",
        "attendance, reach, or policy impact"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
      title: "NYC DIY Spaces post-Ghost Ship meeting discussion and naming poll",
      organization: "Call Script and collaborators",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-01-27",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.facebook.com/events/388137698233507/?active_tab=discussion",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Call Script and collaborators, public discussion for 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' January 27, 2017.",
      publicNote:
        "The public event discussion includes a Call Script poll asking participants to choose a durable group name. NYC Artist Coalition is the leading visible result in the authenticated July 2026 capture.",
      supportsGenerally: [
        "Call Script used the public meeting discussion as a group-formation and continuity surface",
        "the poll asked participants to choose a name the group could carry forward",
        "NYC Artist Coalition led the visible poll result",
        "the event joined Call Script, the emerging coalition identity, the Department of Cultural Affairs, and other collaborators"
      ],
      doesNotEstablish: [
        "that a Facebook poll alone legally or organizationally founded the coalition",
        "sole founding authorship by Jamie or Call Script",
        "attendance from 445 Facebook responses",
        "audience reach from the post's historical platform analytics"
      ]
    },
    {
      id: "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
      title: "Jamie Burkart first-person Call Script project context",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata for Jamie Burkart's July 2026 first-person account of Call Script, popular.vote, and NYC Artist Coalition formation context.",
      publicNote:
        "Jamie's account identifies Call Script as his project and directs research toward the public records linking popular.vote with the early NYC Artist Coalition convening. The underlying conversation is not published.",
      protectedLocatorId: "ARCHIVE-JAMIE-CALLSCRIPT-CONTEXT-2026-001",
      supportsGenerally: [
        "Jamie identifies Call Script as his project",
        "Jamie identifies the popular.vote calendar and January 2017 event discussion as important connective evidence",
        "Jamie describes his role as facilitation and public-system establishment rather than sole ownership of collective work"
      ],
      doesNotEstablish: [
        "individual authorship of every Call Script post",
        "sole founding of NYC Artist Coalition",
        "sole causality for later campaign or policy outcomes"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE",
      project: "wowlist",
      internalClaim:
        "Read-only analysis of three production snapshots supports WOWList's bounded 2016-2017 product scale and growth claims.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Read-only analysis of three surviving production database snapshots supports the public scale claim: by July 22, 2017, WOWList contained 1,846 users, 16,142 posts/events, 23,864 tags/lists, 28,837 list follows, and 20,927 saved/starred-event records. Thirty-five city labels had at least 50 geocoded posts/events, the bounded basis for 'roughly 35 city ecosystems.'",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
          relationship: "direct-support",
          supports: [
            "the three-snapshot growth series",
            "the July 22, 2017 table counts",
            "the 50-geocoded-record city threshold"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
          relationship: "private-support",
          supports: ["the underlying production records and schemas"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Treat the counts as point-in-time database rows, not attendance, impressions, or unique audience reach.",
        "Use 35 city ecosystems as a bounded proxy based on city labels with at least 50 geocoded posts or events, not as official chapters.",
        "Do not imply current operation or activity after the latest July 22, 2017 snapshot.",
        "Do not publish raw user, email, geolocation, or activity records."
      ],
      antiClaims: [
        "WOWList had 35 official city chapters",
        "Every database row represents a unique person or attended event",
        "WOWList is currently active",
        "The surviving archive is complete"
      ],
      researchInquiryIds: ["INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM",
      project: "sunday-dinner",
      internalClaim:
        "Jamie designed and maintained a longitudinal participation system behind Sunday Dinner, with numbered gatherings continuing beyond 300 and reusable invitation, response, attendance, theme, host, and follow-through structures.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Behind that aggregate project summary, Jamie designed and maintained a longitudinal participation system: a 17-sheet workbook linking numbered gatherings, invitations, responses, attendance logic, themes, hosts, and reusable formulas. Row-level community records remain private.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/196-sunday-dinner"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
          relationship: "direct-support",
          supports: [
            "the 17-sheet operating structure",
            "numbered gathering columns continuing beyond 300",
            "the invitation, response, attendance, theme, host, and formula structures"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
          relationship: "private-support",
          supports: ["the underlying longitudinal operating record"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
          relationship: "corroborating",
          supports: [
            "Jamie's revision-attributed creation and ongoing maintenance",
            "continuity of the invitation, response, attendance, and follow-through practice"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The workbook substantiates a recurring operating system and numbered history; it is not a public attendance database.",
        "Do not equate invitations, responses, or formula outputs with attendance without row-level reconciliation.",
        "The numbering contains gaps and duplicates, so use 300-plus gatherings rather than 340 unique events.",
        "The workbook does not establish the 20-plus resident-artist total.",
        "Do not publish names, contact details, relationship notes, invitations, responses, attendance indicators, formulas, or source locators."
      ],
      antiClaims: [
        "The workbook proves a public attendee total",
        "Every numbered column is a separately verified event",
        "Invitations or responses equal attendance",
        "The workbook independently proves the resident-artist total"
      ],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie established Call Script as a public action surface linked to popular.vote, and its January 2017 event discussion supported the naming and continuation of the emerging NYC Artist Coalition.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie established Call Script as a public action surface linked to the popular.vote WOWList calendar. On January 27, 2017, Call Script used a public Department of Cultural Affairs meeting discussion to ask participants to choose a durable group name; NYC Artist Coalition led the visible poll result. The page subsequently directed people to the coalition's March general meeting.",
          status: "active",
          citationRequired: false,
          surfaces: ["knowledge-bank-only"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
          relationship: "direct-support",
          supports: ["Jamie's first-person identification of Call Script as his project"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
          relationship: "direct-support",
          supports: [
            "the public popular.vote link",
            "the subsequent NYC Artist Coalition general-meeting route"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
          relationship: "direct-support",
          supports: [
            "the group-naming prompt",
            "NYC Artist Coalition as the leading visible poll result",
            "the public convening context"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-VICE-NYCAC-DIY-SAFETY-2017",
          relationship: "corroborating",
          supports: ["independent contemporaneous reporting on early coalition formation and purpose"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe Jamie's role as establishing and facilitating a public action surface, not solely founding or owning the coalition.",
        "The naming poll is evidence of participatory identity formation, not a legal or organizational founding instrument.",
        "The event and coalition work were collective; preserve collaborator and participant agency.",
        "Do not convert Facebook responses, poll percentages, or historical platform analytics into attendance, unique reach, endorsement, or impact."
      ],
      antiClaims: [
        "Jamie alone founded NYC Artist Coalition",
        "The Facebook poll legally created NYC Artist Coalition",
        "445 Facebook responses equal attendance",
        "Historical Facebook reach analytics are audited impact"
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
      project: "wowlist",
      question:
        "What product-scale, growth, and geography claims can be recomputed from the surviving WOWList database snapshots without exposing raw records?",
      methods: [
        "Verified PostgreSQL custom-format metadata for the June 24, 2016, June 1, 2017, and July 22, 2017 snapshots.",
        "Streamed selected table data through pg_restore in read-only mode and counted COPY rows without restoring a live database.",
        "Mapped post geolocation identifiers to city and region fields and calculated bounded city-label thresholds.",
        "Compared three snapshots to distinguish point-in-time scale from growth."
      ],
      runAt: "2026-07-15",
      resultStatus: "recovered",
      findings: [
        "The latest snapshot contains 1,846 users, 16,142 posts or events, 23,864 tags or lists, 28,837 list follows, and 20,927 saved or starred records.",
        "The latest snapshot contains 15,915 Google Calendar event records and 15,875 post-calendar links.",
        "Thirty-five city labels have at least 50 geocoded posts or events; 48 have at least 25.",
        "From June 2016 to July 2017, user rows increased by 851 and post or event rows by 6,006."
      ],
      limitations: [
        "Database rows are product records, not attendance, reach, or audited social impact.",
        "The city threshold is a conservative activity proxy, not proof of official chapters or equal community depth.",
        "The latest surviving database snapshot is dated July 22, 2017; no current-operation claim follows."
      ],
      sourceIds: [
        "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
        "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15"
      ],
      publicSummary:
        "Read-only aggregate analysis confirms the bounded WOWList scale claim and its roughly 35-city basis without publishing raw records.",
      protectedLocatorId: "RESEARCH-WOWLIST-DATABASE-AUDIT-2026-001"
    },
    {
      id: "INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026",
      project: "sunday-dinner",
      question:
        "What can the shared Sunday Dinner workbook establish about Jamie's recurring participation operations without exposing people or mislabeling invitations and responses as attendance?",
      methods: [
        "Downloaded the exact user-shared Office workbook read-only from its Google Drive surface.",
        "Inspected sheet count, formula count, date coverage, field labels, numbered gathering headers, numbering irregularities, and whether numbered columns contained operating data.",
        "Recorded structural aggregates only; names, contact data, relationship notes, row values, and formulas were excluded."
      ],
      runAt: "2026-07-15",
      resultStatus: "recovered",
      findings: [
        "The workbook contains 17 sheets and 21,617 formula cells.",
        "Its primary sheet contains 340 distinct numbered gathering identifiers through 345, including an explicit 300th Sunday Dinner label and later entries.",
        "All 340 distinct numbered identifiers have associated operating data.",
        "The structure connects gatherings with invitations, responses, attendance logic, themes, hosts, contacts, and follow-through."
      ],
      limitations: [
        "Five numbering gaps and four duplicated identifiers require use of 300-plus rather than 340 unique verified events.",
        "The workbook is not a public attendance database and does not establish a publishable attendee total.",
        "The workbook does not independently establish the 20-plus resident-artist total."
      ],
      sourceIds: [
        "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
        "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
        "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025"
      ],
      publicSummary:
        "A public-safe structural audit confirms a longitudinal participation operating system and numbered history beyond 300 while keeping every person-level record private.",
      protectedLocatorId: "RESEARCH-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-001"
    },
    {
      id: "INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026",
      project: "nyc-artist-coalition",
      question:
        "What surviving public records connect Jamie's Call Script project and popular.vote calendar to the early formation and continuation of NYC Artist Coalition?",
      methods: [
        "Used Jamie's authenticated browser session to inspect the live Call Script page and the January 27, 2017 event discussion.",
        "Expanded the public group-naming poll and verified its prompt and visible result.",
        "Verified the Call Script page's popular.vote link and its subsequent route to NYC Artist Coalition's March 2017 general meeting.",
        "Compared the public sequence with contemporaneous VICE reporting on early coalition formation."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Call Script's public page links to popular.vote.",
        "On January 27, 2017, Call Script asked meeting participants to choose a name the emerging group could carry forward; NYC Artist Coalition led the visible poll result.",
        "Call Script later directed people to NYC Artist Coalition's March 6, 2017 general meeting.",
        "Contemporaneous reporting independently places the coalition's early formation and DIY-space safety purpose in early 2017."
      ],
      limitations: [
        "This was a focused lineage pass, not a complete export or full-population review of Call Script.",
        "Public page administration and post-level authorship were not independently reconstructed.",
        "The poll and event page do not support sole-founder, attendance, reach, or causality claims."
      ],
      sourceIds: [
        "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
        "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
        "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026",
        "SRC-VICE-NYCAC-DIY-SAFETY-2017"
      ],
      publicSummary:
        "The surviving public sequence connects Call Script's popular.vote action surface to participatory naming and continued convening for the emerging NYC Artist Coalition, with collective-credit boundaries.",
      protectedLocatorId: "RESEARCH-CALLSCRIPT-NYCAC-LINEAGE-2026-001"
    }
  ]
};
