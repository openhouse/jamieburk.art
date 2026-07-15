const reviewedAt = "2026-07-15";
const reportUrl =
  "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/participation-infrastructure-2026-07-15.md";

export const participationInfrastructureAudit = {
  wowlist: {
    earlierSnapshotAt: "2016-06-24",
    laterSnapshotAt: "2017-07-22",
    earlierUsers: 995,
    laterUsers: 1846,
    earlierPosts: 10136,
    laterPosts: 16142,
    laterTags: 23864,
    laterPostTagLinks: 45562,
    laterListFollows: 28837,
    laterStars: 20927,
    laterGoingRelationships: 2965,
    laterActivityActions: 92114,
    laterGeolocationRows: 25938,
    geocodedPosts: 12433,
    geographyThresholdPosts: 50,
    qualifyingCityRegionCountryGroups: 35,
    popularVote: {
      createdAt: "2016-11-12",
      eventRecords: 933,
      followerRelationships: 196,
      distinctFollowerAccounts: 196
    }
  },
  sundayDinner: {
    firstNumberedGathering: "001",
    lastNumberedGathering: "345",
    firstGatheringDate: "2012-01-22",
    lastGatheringDate: "2021-03-07",
    numberedEventColumns: 345,
    additionalSequenceColumns: 4,
    sequenceColumns: 349,
    numberedColumnMarks: 2714,
    allSequenceColumnMarks: 2769,
    workbookMealsServedSummary: 2783,
    summaryReconciliationDifference: 14,
    numberedGatheringMedianMarks: 7,
    numberedGatheringsAtLeastTenMarks: 93,
    rowsWithAtLeastOneMark: 411
  },
  callscript: {
    repositoryCommits: 24,
    repositoryAuthors: 1,
    firstRepositoryCommitAt: "2016-11-20",
    dclaDiscussionPostAt: "2017-01-25",
    dclaEventAt: "2017-01-27",
    eventResponseDisplay: 445
  }
} as const;

export const participationInfrastructureProduction = {
  intakeItems: [
    {
      id: "INTAKE-WOWLIST-DATABASE-SNAPSHOT-AUDIT-2026",
      kind: "public-artifact",
      title: "WOW List historical database aggregate audit",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex archival review",
      projectIds: ["wowlist"],
      reason:
        "Turn protected historical database snapshots into reproducible public-safe aggregate support for product scale, geography, and the Popular Vote calendar without exposing user or event rows.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026"],
      observationIds: [
        "OBS-WOWLIST-SNAPSHOT-GROWTH-2026",
        "OBS-WOWLIST-GEOGRAPHY-THRESHOLD-2026",
        "OBS-WOWLIST-POPULAR-VOTE-TRACTION-2026"
      ],
      researchInquiryIds: ["INQ-WOWLIST-POPULAR-VOTE-PARTICIPATION"],
      boundaries: [
        "No raw rows, user identities, event text, contact data, or geolocation records enter the public repository.",
        "Database relationships support product activity and adoption signals, not physical attendance, endorsement, movement membership, or policy impact."
      ]
    },
    {
      id: "INTAKE-SUNDAY-DINNER-ATTENDANCE-AUDIT-2026",
      kind: "public-artifact",
      title: "Sunday Dinner protected attendance-ledger aggregate audit",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex protected workbook review",
      projectIds: ["sunday-dinner", "196-sunday-dinner"],
      reason:
        "Preserve the gathering sequence and aggregate data-quality findings while excluding every participant row, identity, contact field, and attendance history.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [
        "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER",
        "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026"
      ],
      observationIds: [
        "OBS-SUNDAY-DINNER-LEDGER-DISTRIBUTION-2026",
        "OBS-SUNDAY-DINNER-LEDGER-RECONCILIATION-2026",
        "OBS-SUNDAY-DINNER-ROW-IDENTITY-BOUNDARY-2026"
      ],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION"],
      boundaries: [
        "Only public-safe aggregates and method notes may leave the protected workbook.",
        "Rows are not converted into a unique-person count, and marks are not treated as complete physical attendance."
      ]
    },
    {
      id: "INTAKE-CALLSCRIPT-PARTICIPATION-BRIDGE-2026",
      kind: "public-url",
      title: "Call Script, Popular Vote, and DCLA participation bridge",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-source review",
      projectIds: ["callscript", "wowlist", "nyc-artist-coalition"],
      reason:
        "Preserve how a WOW List calendar surface, a Jamie-authored calling application, and a public event discussion formed an early participation workflow around the NYC Artist Coalition period.",
      sourceUrl: "https://www.facebook.com/callscript",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-CALLSCRIPT-FACEBOOK-PAGE",
        "SRC-CALLSCRIPT-PUBLIC-REPOSITORY",
        "SRC-CALLSCRIPT-DCLA-EVENT-2017",
        "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017"
      ],
      observationIds: [
        "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
        "OBS-CALLSCRIPT-JAMIE-REPOSITORY-AUTHORSHIP",
        "OBS-CALLSCRIPT-DCLA-EVENT-BRIDGE",
        "OBS-CALLSCRIPT-DCLA-PREMEETING-LISTENING"
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      boundaries: [
        "The public surfaces establish a connective workflow, not sole creation of NYC Artist Coalition or individual authorship of every shared-account post.",
        "Facebook response displays are mutable platform signals, not attendance, unique people, endorsement, or impact."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-WOWLIST-SNAPSHOT-GROWTH-2026",
      intakeId: "INTAKE-WOWLIST-DATABASE-SNAPSHOT-AUDIT-2026",
      sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Protected database snapshots show WOW List growing from 995 users and 10,136 posts or events on June 24, 2016, to 1,846 users and 16,142 posts or events on July 22, 2017.",
      locator: "Public-safe aggregate table-count audit",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-HISTORICAL-AGGREGATE-SCALE"],
      researchInquiryIds: [],
      limitations: [
        "The counts describe database rows in two snapshots, not active users, physical attendance, or current platform status.",
        "No raw account or event rows are retained in the repository."
      ]
    },
    {
      id: "OBS-WOWLIST-GEOGRAPHY-THRESHOLD-2026",
      intakeId: "INTAKE-WOWLIST-DATABASE-SNAPSHOT-AUDIT-2026",
      sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "A conservative grouping of 12,433 geocoded posts by normalized city, region, and country found 35 groups with at least 50 posts.",
      locator: "Public-safe geography-threshold audit",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-HISTORICAL-AGGREGATE-SCALE"],
      researchInquiryIds: [],
      limitations: [
        "The threshold is a reproducible analytical convention, not an official chapter definition.",
        "City groups may include uneven time spans, organizer activity, and duplicate or syndicated event records."
      ]
    },
    {
      id: "OBS-WOWLIST-POPULAR-VOTE-TRACTION-2026",
      intakeId: "INTAKE-WOWLIST-DATABASE-SNAPSHOT-AUDIT-2026",
      sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "The July 22, 2017 snapshot contains a Popular Vote calendar created November 12, 2016, with 933 distinct event relationships and 196 follow relationships from 196 distinct account IDs.",
      locator: "Popular Vote tag, post-tag, and follow-tag aggregate audit",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-WOWLIST-POPULAR-VOTE-TRACTION",
        "CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY"
      ],
      researchInquiryIds: ["INQ-WOWLIST-POPULAR-VOTE-PARTICIPATION"],
      limitations: [
        "Event and follow relationships do not establish event attendance, agreement, endorsement, organizing responsibility, or policy impact.",
        "Account IDs remain protected and are not retained in the public bank."
      ]
    },
    {
      id: "OBS-SUNDAY-DINNER-LEDGER-DISTRIBUTION-2026",
      intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-AUDIT-2026",
      sourceId: "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026",
      project: "sunday-dinner",
      kind: "source-fact",
      text:
        "The protected workbook contains 345 numbered gathering columns from January 22, 2012, through March 7, 2021; the median numbered column contains seven numeric marks and 93 contain at least ten.",
      locator: "Public-safe event-column aggregate audit",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-SUNDAY-DINNER-LEDGER-AGGREGATE-AUDIT"],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION"],
      limitations: [
        "A column is a recorded gathering entry, not proof of identical event format or complete attendance.",
        "Numeric marks are not converted into unique participants."
      ]
    },
    {
      id: "OBS-SUNDAY-DINNER-LEDGER-RECONCILIATION-2026",
      intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-AUDIT-2026",
      sourceId: "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026",
      project: "sunday-dinner",
      kind: "limitation",
      text:
        "Across 345 numbered and four additional sequence columns, the audit found 2,769 numeric marks, 14 fewer than the workbook's separate summary of 2,783 meals served.",
      locator: "Public-safe reconciliation audit",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-SUNDAY-DINNER-LEDGER-AGGREGATE-AUDIT"],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION"],
      limitations: [
        "The difference may reflect formulas, omitted marks, non-attendee meals, or another workbook convention; the audit does not infer a cause.",
        "Public use must attribute 2,783 to the workbook's own summary rather than present it as a reconstructed headcount."
      ]
    },
    {
      id: "OBS-SUNDAY-DINNER-ROW-IDENTITY-BOUNDARY-2026",
      intakeId: "INTAKE-SUNDAY-DINNER-ATTENDANCE-AUDIT-2026",
      sourceId: "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER",
      project: "sunday-dinner",
      kind: "limitation",
      text:
        "Four hundred eleven workbook rows contain at least one numeric mark, but rows can represent incomplete, duplicated, shared, or non-unique records and therefore cannot establish a participant count.",
      locator: "Protected row-level uniqueness control; aggregate only",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-SUNDAY-DINNER-LEDGER-AGGREGATE-AUDIT"],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION"],
      limitations: [
        "No row content, name, contact field, or attendance history is retained in the repository.",
        "The aggregate does not establish 411 unique people."
      ]
    },
    {
      id: "OBS-CALLSCRIPT-PAGE-POPULAR-VOTE-LINK",
      intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-BRIDGE-2026",
      sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE",
      project: "callscript",
      kind: "source-fact",
      text:
        "The surviving public Call Script Facebook page describes the project as 'Call your representatives. simply make change' and identifies popular.vote as its website.",
      locator: "Page introduction and Links section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY"],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      limitations: [
        "The current page field does not establish the exact date the link was added or every historical Call Script deployment.",
        "A linked website does not establish usage or impact by itself."
      ]
    },
    {
      id: "OBS-CALLSCRIPT-JAMIE-REPOSITORY-AUTHORSHIP",
      intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-BRIDGE-2026",
      sourceId: "SRC-CALLSCRIPT-PUBLIC-REPOSITORY",
      project: "callscript",
      kind: "source-fact",
      text:
        "The public Call Script UI repository contains 24 commits dated from November 20, 2016, through January 18, 2017, all authored by Jamie Burkart in the recovered Git history.",
      locator: "Public repository commit history",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY"],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      limitations: [
        "Repository authorship establishes the surviving UI implementation history, not every Call Script idea, backend service, social post, collaboration, or public outcome.",
        "The repository does not establish sole creation of NYC Artist Coalition."
      ]
    },
    {
      id: "OBS-CALLSCRIPT-DCLA-EVENT-BRIDGE",
      intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-BRIDGE-2026",
      sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-2017",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text:
        "The January 27, 2017 DCLA meeting event names NYC Artist Coalition and Call Script among its hosts, asks people to pack the room in support of DIY spaces and artists, and currently displays 445 people responded.",
      locator: "Public event header, host line, description, and response display",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-CALLSCRIPT-DCLA-LISTENING-WORKFLOW",
        "CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      limitations: [
        "The host line does not establish individual production responsibilities.",
        "The response display is not attendance, unique reach, endorsement, or impact."
      ]
    },
    {
      id: "OBS-CALLSCRIPT-DCLA-PREMEETING-LISTENING",
      intakeId: "INTAKE-CALLSCRIPT-PARTICIPATION-BRIDGE-2026",
      sourceId: "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text:
        "On January 25, Call Script asked what participants should request at the DCLA meeting and recorded needs for non-punitive compliance guidance, grants for infrastructure and compliance work, legal and insurance guidance, and a meeting time outside the workday.",
      locator: "Call Script discussion post and three author comments",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-CALLSCRIPT-DCLA-LISTENING-WORKFLOW",
        "CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      limitations: [
        "The shared-account post does not establish which person authored each sentence or how broadly the comments represented participants.",
        "The thread records pre-meeting listening; it does not prove DCLA adoption, grant delivery, or policy impact."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
      title: "Public-safe aggregate audit of historical WOW List database snapshots",
      organization: "WOW List archival production",
      author: "Codex with Jamie Burkart",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: `${reportUrl}#wow-list-database-audit`,
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart and Codex, public-safe aggregate audit of historical WOW List database snapshots, July 15, 2026.",
      publicNote:
        "The report preserves aggregate counts, comparison dates, a reproducible geography rule, and limitations; protected database rows and archive locations are not published.",
      supportsGenerally: [
        "June 24, 2016 and July 22, 2017 aggregate platform counts",
        "1,846 users and 16,142 posts or events in the later snapshot",
        "35 city-region-country groups at a 50-geocoded-post threshold",
        "933 Popular Vote event relationships",
        "196 Popular Vote follow relationships from 196 distinct account IDs"
      ],
      doesNotEstablish: [
        "current platform status",
        "active-user totals",
        "physical attendance",
        "official city chapters",
        "movement membership or endorsement",
        "individual authorship of every record",
        "policy impact"
      ]
    },
    {
      id: "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026",
      title: "Public-safe aggregate audit of the protected Sunday Dinner ledger",
      organization: "Sunday Dinner archival production",
      author: "Codex with Jamie Burkart",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: `${reportUrl}#sunday-dinner-ledger-audit`,
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart and Codex, public-safe aggregate audit of the protected Sunday Dinner ledger, July 15, 2026.",
      publicNote:
        "The report retains event-column aggregates and a data-quality reconciliation while excluding participant rows, identities, contact fields, and attendance histories.",
      supportsGenerally: [
        "345 numbered gathering columns",
        "January 22, 2012 through March 7, 2021 sequence",
        "median of seven numeric marks across numbered gathering columns",
        "93 numbered columns with at least ten numeric marks",
        "2,769 marks across 349 sequence columns",
        "14-mark difference from the workbook's 2,783 meals-served summary"
      ],
      doesNotEstablish: [
        "complete attendance",
        "unique participant count",
        "411 unique people",
        "the reason for the 14-mark difference",
        "20-plus resident artists",
        "Jamie's sole labor",
        "permission to publish participant records"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-FACEBOOK-PAGE",
      title: "Call Script public Facebook page",
      organization: "Call Script",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/callscript",
      preferredPublicUrl: "canonical",
      publicCitation: "Call Script public Facebook page, accessed July 15, 2026.",
      publicNote:
        "The page describes a representative-calling project and currently identifies popular.vote as its website.",
      supportsGenerally: [
        "Call Script public identity",
        "Call your representatives project framing",
        "current popular.vote website link"
      ],
      doesNotEstablish: [
        "the date the website field was added",
        "historical traffic or usage",
        "individual authorship of every post",
        "sole creation of NYC Artist Coalition",
        "policy impact"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-PUBLIC-REPOSITORY",
      title: "Call Script UI public source repository",
      organization: "openhouse",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/callscript-ui",
      preferredPublicUrl: "canonical",
      publicCitation: "openhouse/callscript-ui public source repository.",
      publicNote:
        "The recovered public history contains 24 Jamie-authored commits from November 2016 through January 2017 implementing the Ember UI.",
      supportsGenerally: [
        "surviving Call Script UI implementation",
        "24 commits in the recovered history",
        "Jamie Burkart as author of the recovered commit history",
        "November 20, 2016 through January 18, 2017 implementation period"
      ],
      doesNotEstablish: [
        "authorship of every project idea or backend service",
        "individual authorship of social posts",
        "sole creation of NYC Artist Coalition",
        "public adoption or policy impact"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-DCLA-EVENT-2017",
      title: "NYC DIY Spaces post Ghost Ship: Department of Cultural Affairs Meeting",
      organization: "NYC Artist Coalition, Call Script, and event partners",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-01-27",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/events/388137698233507/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, Call Script, and event partners, 'NYC DIY Spaces post Ghost Ship: Dept of Cultural Affairs Meeting,' Facebook event, January 27, 2017.",
      publicNote:
        "The public page names the host relationship, asks people to pack the room in support of DIY spaces and artists, and currently displays 445 people responded.",
      supportsGenerally: [
        "January 27, 2017 DCLA meeting event",
        "NYC Artist Coalition and Call Script host relationship",
        "public invitation supporting DIY spaces and artists",
        "mutable 445-response display"
      ],
      doesNotEstablish: [
        "physical attendance",
        "445 unique people",
        "individual production roles",
        "agreement among every host or respondent",
        "agency adoption or policy impact"
      ]
    },
    {
      id: "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017",
      title: "Call Script pre-meeting brainstorming thread for the DCLA DIY-spaces meeting",
      organization: "Call Script",
      kind: "public-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-01-25",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.facebook.com/events/388137698233507/?post_id=388162158231061&view=permalink",
      preferredPublicUrl: "canonical",
      publicCitation: "Call Script, pre-meeting brainstorming thread in the January 27, 2017 DCLA DIY-spaces event discussion, January 25, 2017.",
      publicNote:
        "The thread asks what to request and records needs for safer compliance guidance, infrastructure and compliance grants, legal and insurance guidance, and a meeting time outside the workday.",
      supportsGenerally: [
        "pre-meeting brainstorming prompt",
        "non-punitive compliance-advice need",
        "infrastructure and compliance grant need",
        "legal and insurance guidance need",
        "meeting-time accessibility need"
      ],
      doesNotEstablish: [
        "individual authorship behind the shared account",
        "representativeness of every comment",
        "complete coalition priorities",
        "DCLA adoption",
        "grant delivery",
        "policy impact"
      ]
    }
  ],

  claims: [
    {
      id: "CLM-WOWLIST-HISTORICAL-AGGREGATE-SCALE",
      project: "wowlist",
      internalClaim:
        "Historical snapshots support growth from 995 users and 10,136 posts or events in June 2016 to 1,846 users and 16,142 posts or events in July 2017; a conservative geography audit found 35 city-region-country groups with at least 50 geocoded posts.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Aggregate historical records support 1,800+ users, 16,000+ posts/events, and activity across roughly 35 city ecosystems.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
          relationship: "direct-support",
          supports: [
            "two-snapshot user and post or event counts",
            "the conservative 35-group geography threshold"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use approximate public scale language and retain the exact snapshot dates and threshold in the source note.",
        "Describe city ecosystems or activity groups, not official chapters."
      ],
      antiClaims: [
        "WOW List had official chapters in 35 cities.",
        "Every database user was active.",
        "Post rows prove attendance or impact."
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex aggregate archive review"]
    },
    {
      id: "CLM-WOWLIST-POPULAR-VOTE-TRACTION",
      project: "wowlist",
      internalClaim:
        "The July 22, 2017 WOW List snapshot records 933 distinct event relationships and 196 follow relationships from 196 distinct account IDs for the Popular Vote calendar created November 12, 2016.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "By July 2017, the Popular Vote calendar connected 933 event records with 196 distinct follower accounts.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
          relationship: "direct-support",
          supports: ["Popular Vote creation date", "933 distinct event relationships", "196 distinct follower accounts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Keep event records, follower relationships, attendance, coalition membership, and impact distinct.",
        "Select this claim for a public surface only when the Popular Vote example materially clarifies the argument."
      ],
      antiClaims: [
        "933 people attended Popular Vote events.",
        "196 people joined NYC Artist Coalition.",
        "The calendar caused later civic outcomes."
      ],
      researchInquiryIds: ["INQ-WOWLIST-POPULAR-VOTE-PARTICIPATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex aggregate archive review"]
    },
    {
      id: "CLM-SUNDAY-DINNER-LEDGER-AGGREGATE-AUDIT",
      project: "sunday-dinner",
      internalClaim:
        "The protected ledger contains 345 numbered gathering columns and a separate 2,783 meals-served summary; a public-safe audit found 2,769 marks across 349 sequence columns and does not resolve the 14-mark difference.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "The workbook's own summary records 2,783 meals served; a separate aggregate audit found a small unreconciled difference and therefore does not treat that figure as a reconstructed headcount.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER",
          relationship: "private-support",
          supports: ["protected event sequence", "workbook meals-served summary"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026",
          relationship: "direct-support",
          supports: ["public-safe column aggregates", "14-mark reconciliation difference", "row-uniqueness boundary"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Attribute 2,783 to the workbook's own summary.",
        "Do not infer a cause for the 14-mark difference.",
        "Do not convert rows or marks into unique participants or complete attendance."
      ],
      antiClaims: [
        "The audit independently reconstructed exactly 2,783 attendees or meals.",
        "The workbook proves 411 unique people.",
        "Jamie alone produced every gathering."
      ],
      researchInquiryIds: ["INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex protected workbook review"]
    },
    {
      id: "CLM-CALLSCRIPT-DCLA-LISTENING-WORKFLOW",
      project: "nyc-artist-coalition",
      internalClaim:
        "Before the January 27, 2017 DCLA DIY-spaces meeting, the shared Call Script account used the public event discussion to ask what participants wanted requested and recorded compliance, grant, insurance, legal, and meeting-access needs.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "An early Call Script thread gathered practical needs before a DCLA meeting, creating a traceable bridge from participant concerns to a civic forum.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLSCRIPT-DCLA-EVENT-2017",
          relationship: "context",
          supports: ["event date", "host relationship", "public call to support DIY spaces"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017",
          relationship: "direct-support",
          supports: ["pre-meeting prompt", "recorded practical needs"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Attribute posts and comments to the shared Call Script account unless individual authorship is separately established.",
        "Describe the thread as listening and routing, not proof of representativeness, agency adoption, or policy impact."
      ],
      antiClaims: [
        "Jamie personally authored every Call Script sentence.",
        "The thread represented every NYC artist or space.",
        "DCLA adopted every request."
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-source review"]
    },
    {
      id: "CLM-PARTICIPATION-INFRASTRUCTURE-CONTINUITY",
      project: "career",
      internalClaim:
        "The recovered chronology is consistent with a continuity in Jamie's practice: recurring in-person gathering, followable community calendars, representative-calling software, and pre-meeting issue gathering each created forms through which people could find one another and carry concerns into civic action.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text: "Across Sunday Dinner, WOW List, and Call Script, Jamie developed related forms for recurring gathering, public discovery, and civic participation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
          relationship: "context",
          supports: ["Popular Vote calendar chronology and product activity"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER",
          relationship: "context",
          supports: ["long-running gathering sequence"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-FACEBOOK-PAGE",
          relationship: "corroborating",
          supports: ["Call Script public identity and current popular.vote connection"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-PUBLIC-REPOSITORY",
          relationship: "direct-support",
          supports: ["Jamie's surviving Call Script UI implementation history"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017",
          relationship: "corroborating",
          supports: ["pre-meeting issue-gathering practice"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Treat continuity as an interpretive synthesis, not proof that one project caused another.",
        "Keep collaborators, shared accounts, and collective civic outcomes visible.",
        "Do not project this claim until a specific audience benefits from the cross-project synthesis."
      ],
      antiClaims: [
        "Sunday Dinner caused NYC Artist Coalition.",
        "Jamie alone founded NYC Artist Coalition.",
        "One platform or event produced later legislative outcomes."
      ],
      researchInquiryIds: ["INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival synthesis"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-WOWLIST-POPULAR-VOTE-PARTICIPATION",
      project: "wowlist",
      question:
        "What can the Popular Vote calendar's event and follow relationships establish about product use without converting them into attendance, membership, endorsement, or impact?",
      methods: [
        "Inspected public-safe aggregate counts from the latest unique historical snapshot.",
        "Matched the Popular Vote calendar record to post-tag and follow-tag relationships.",
        "Counted distinct event and account IDs without retaining any IDs or row content in the repository."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "The calendar was created November 12, 2016.",
        "The July 22, 2017 snapshot contains 933 distinct event relationships and 196 follow relationships from 196 distinct account IDs."
      ],
      limitations: [
        "A follow is a product relationship, not movement membership, attendance, endorsement, or impact.",
        "An event relationship does not establish who created, attended, or acted on the event.",
        "The raw snapshot and all account and event rows remain protected."
      ],
      sourceIds: ["SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026"],
      publicSummary:
        "The Popular Vote calendar had 933 event relationships and 196 distinct follower accounts in the July 2017 snapshot; those are bounded product-use signals, not attendance or impact."
    },
    {
      id: "INQ-SUNDAY-DINNER-LEDGER-RECONCILIATION",
      project: "sunday-dinner",
      question:
        "How do the protected Sunday Dinner ledger's event-column marks relate to its separate 2,783 meals-served summary?",
      methods: [
        "Inspected the complete workbook structure in a protected local analysis context.",
        "Identified 345 numbered and four additional sequence columns.",
        "Calculated column-level numeric-mark aggregates without exporting participant rows."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The 349 sequence columns contain 2,769 numeric marks.",
        "The workbook separately records 2,783 meals served, a difference of 14.",
        "The audit does not recover the workbook convention or cause that explains the difference."
      ],
      limitations: [
        "The difference may reflect formulas, omitted marks, non-attendee meals, or another convention; no cause is inferred.",
        "Rows and marks do not establish unique participants or complete physical attendance.",
        "Participant identities, contacts, and attendance histories remain protected."
      ],
      sourceIds: [
        "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER",
        "SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026"
      ],
      publicSummary:
        "The workbook's 2,783 meals-served summary remains usable only as an attributed workbook summary because a public-safe column audit found a small unresolved difference.",
      protectedLocatorId: "RESEARCH-SUNDAY-DINNER-LEDGER-RECONCILIATION-2026"
    },
    {
      id: "INQ-CALLSCRIPT-NYCAC-SEQUENCE-AND-CREDIT",
      project: "nyc-artist-coalition",
      question:
        "What does the surviving Call Script page, repository, and DCLA event discussion establish about Jamie's participation-infrastructure contribution during the early NYC Artist Coalition period?",
      methods: [
        "Reviewed the authenticated public Call Script Facebook page and its public website field.",
        "Inspected the public Call Script UI repository history and bounded it to the surviving implementation.",
        "Read the January 27, 2017 public event and the January 25 Call Script brainstorming thread.",
        "Separated shared-account publishing, public host relationships, Jamie's code authorship, collective coalition formation, and policy outcomes."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The current Call Script page identifies popular.vote as its website.",
        "The surviving Call Script UI repository contains 24 Jamie-authored commits from November 2016 through January 2017.",
        "Call Script and NYC Artist Coalition are named among the hosts of the January 27 DCLA meeting event.",
        "The Call Script discussion thread gathered practical compliance, grant, legal, insurance, and meeting-access needs before the event."
      ],
      limitations: [
        "The sources do not establish individual authorship of every shared-account post or a complete division of coalition labor.",
        "The current page field does not establish when popular.vote was first linked.",
        "The sequence supports a connective participation workflow, not sole founding credit, representative consensus, DCLA adoption, or policy causality."
      ],
      sourceIds: [
        "SRC-CALLSCRIPT-FACEBOOK-PAGE",
        "SRC-CALLSCRIPT-PUBLIC-REPOSITORY",
        "SRC-CALLSCRIPT-DCLA-EVENT-2017",
        "SRC-CALLSCRIPT-DCLA-DISCUSSION-2017"
      ],
      publicSummary:
        "Public sources connect Jamie's Call Script implementation, the Popular Vote calendar surface, and a pre-DCLA listening thread while preserving shared-account and collective-coalition credit."
    }
  ]
} as const;
