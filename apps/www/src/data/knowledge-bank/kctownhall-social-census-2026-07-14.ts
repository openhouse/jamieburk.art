import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const kcTownHallSocialCensus = {
  account: "@KCTownHall",
  observedAt: "2026-07-14",
  observedProfileCount: 183,
  postsRouteRecovered: 170,
  repliesRouteArticles: 188,
  excludedConversationContextArticles: 5,
  recoveredPublicStatuses: 183,
  unresolvedProfileCountSlots: 0,
  relationshipCounts: { accountPosts: 142, accountReplies: 13, reposts: 28 },
  tireWorkflowStatuses: 100,
  tireHashtagBearingStatuses: 98,
  distinctRepostSourceAccounts: 16,
  councilFigureRepostSourceStatuses: 9,
  uniqueShortUrls: 31,
  uniqueResolvedDestinations: 20,
  uniqueProjectOrLineageDestinations: 9,
  accountAuthoredVisibleReactionSnapshot: {
    statuses: 155,
    statusesWithVisibleReaction: 74,
    replies: 22,
    reposts: 69,
    likes: 139
  },
  completenessStatement:
    "The Posts route plus account-authored reply-only records reconcile exactly to the 183-item authenticated profile control. This is complete recovery of the surviving July 2026 profile population, not a native X export, deletion history, or proof that no older item was deleted before capture.",
  publicLedger: "docs/knowledge-bank/data/kctownhall-public-post-ledger.json"
} as const;

const intakeId = "INTAKE-KCTOWNHALL-FULL-POPULATION-X-CENSUS-2026";

export const kcTownHallSocialCensusIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population review of @KCTownHall, combining Posts and Replies routes, a redacted 183-item ledger, posted-link resolution, archived project-page close reading, and bounded stakeholder and traction analysis.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/KCTownHall",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026",
      "SRC-WAYBACK-KCTOWNHALL-HOME-2019",
      "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019",
      "SRC-WAYBACK-KCTOWNHALL-TIRES-2021",
      "SRC-X-KCTOWNHALL-QUINTON-LEONS-2019",
      "SRC-X-KCTOWNHALL-JUSTUS-LEONS-2019",
      "SRC-X-KCTOWNHALL-ROBINSON-TIRES-2020",
      "SRC-X-KCMO311-KCTOWNHALL-WATER-2018",
      "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019",
      "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
      "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
      "SRC-KSHB-LEONS-CLOSURE-2019"
    ],
    claimIds: [
      "CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP",
      "CLM-KCTOWNHALL-FULL-SOCIAL-POPULATION",
      "CLM-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT",
      "CLM-KCTOWNHALL-CIVIC-INFORMATION-ROUTING",
      "CLM-KCTOWNHALL-CURRENT-VISIBLE-REACTION-SNAPSHOT"
    ],
    researchTaskIds: [
      "TASK-KCTOWNHALL-FULL-POPULATION-CENSUS",
      "TASK-KCTOWNHALL-SOCIAL-METRIC-RECONCILIATION"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

const publicSocialSource = (
  id: string,
  title: string,
  organization: string,
  date: string,
  url: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  organization,
  kind: organization === "KC Town Hall" ? "institutional-social-post" : "government-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt: date,
  accessedAt: "2026-07-14",
  canonicalUrl: url,
  preferredPublicUrl: "canonical",
  publicCitation: `${organization}, '${title},' ${date}.`,
  publicNote,
  intakeIds: [intakeId],
  supportsGenerally,
  doesNotEstablish
});

export const kcTownHallSocialCensusSources = [
  {
    id: "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026",
    title: "Authenticated KC Town Hall full-population social census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/KCTownHall",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated, read-only census of the @KCTownHall Posts and Replies routes, with a redacted 183-item ledger, July 14, 2026.",
    publicNote:
      "The route union closes the observed 183-item profile control: 142 account posts, 13 account replies, and 28 reposts. One hundred records belong to the resident tire-intake and operations workflow; 98 distinct records carry #TiredOfTires.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "183-item surviving-profile reconciliation",
      "142 account posts, 13 account replies, and 28 reposts",
      "100 tire-workflow records and 98 hashtag-bearing records",
      "31 shortened URLs resolving to 20 current destinations",
      "bounded stakeholder-network and visible-reaction findings"
    ],
    doesNotEstablish: [
      "a native X export or deletion history",
      "that no older item was deleted before capture",
      "Jamie's authorship of every shared-account post",
      "audited service totals, unique participants, audience reach, adoption, endorsement, or impact",
      "complete historic reaction, follower, mention, or search-index histories"
    ]
  },
  {
    id: "SRC-WAYBACK-KCTOWNHALL-HOME-2019",
    title: "KC Town Hall archived home page",
    organization: "KC Town Hall",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2019-05-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://kctownhall.com/",
    archiveUrl: "https://web.archive.org/web/20190506115340/http://kctownhall.com/",
    preferredPublicUrl: "archive",
    publicCitation: "KC Town Hall home page, archived May 6, 2019.",
    publicNote:
      "The page describes a permanent neighborhood resource and cultural center and presents a monthly free tire-pickup workflow with Oak Park Neighborhood Association. Project posts are attributed to Julia and Jamie.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "KC Town Hall project purpose",
      "monthly resident tire-pickup workflow",
      "Oak Park Neighborhood Association collaboration",
      "Julia and Jamie collective project authorship"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship or sole operation",
      "audited tire totals or neighborhood outcomes",
      "completion of the proposed cultural center"
    ]
  },
  {
    id: "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019",
    title: "KC Town Hall archived about page",
    organization: "KC Town Hall",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2019-08-13",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://kctownhall.com/about/",
    archiveUrl: "https://web.archive.org/web/20190813013145/http://kctownhall.com/about/",
    preferredPublicUrl: "archive",
    publicCitation: "KC Town Hall about page, archived August 13, 2019.",
    publicNote:
      "The page identifies Julia and Jamie as restoring a long-abandoned building through a neighborhood process toward a permanently affordable community space.",
    intakeIds: [intakeId],
    supportsGenerally: ["Julia and Jamie's collective project role", "neighborhood process", "permanently affordable community-space goal"],
    doesNotEstablish: ["sole authorship", "completed construction", "current project status", "the reason for later transition"]
  },
  {
    id: "SRC-WAYBACK-KCTOWNHALL-TIRES-2021",
    title: "KC Town Hall archived tire-pickup page",
    organization: "KC Town Hall",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2021-08-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://kctownhall.com/tires/",
    archiveUrl: "https://web.archive.org/web/20210806195823/https://kctownhall.com/tires/",
    preferredPublicUrl: "archive",
    publicCitation: "KC Town Hall tire-pickup page, archived August 6, 2021.",
    publicNote:
      "The page publishes a recurring resident service schedule and form and phone or text intake routes for free pickup of discarded tires from homes in historic east Kansas City, Missouri. It is attributed to Julia and Jamie.",
    intakeIds: [intakeId],
    supportsGenerally: ["recurring tire-pickup schedule", "resident form and phone or text intake", "Julia and Jamie collective project authorship"],
    doesNotEstablish: ["audited aggregate pickups or savings", "business service", "individual authorship of every operational step"]
  },
  publicSocialSource(
    "SRC-X-KCTOWNHALL-QUINTON-LEONS-2019",
    "Quinton Lucas response to KC Town Hall on Leon's Thriftway",
    "Quinton Lucas",
    "2019-04-29",
    "https://x.com/QuintonLucasKC/status/1122866432130334720",
    "Lucas quoted KC Town Hall's call concerning Leon's Thriftway and said he had spoken with ownership and was trying to help.",
    ["direct public response to KC Town Hall", "city-official follow-up concerning Leon's Thriftway"],
    ["a promised or completed outcome", "endorsement of KC Town Hall", "Jamie's authorship of the initiating post"]
  ),
  publicSocialSource(
    "SRC-X-KCTOWNHALL-JUSTUS-LEONS-2019",
    "Jolie Justus response to KC Town Hall on Leon's Thriftway",
    "Jolie Justus",
    "2019-04-29",
    "https://x.com/joliejustus/status/1122883010582466560",
    "Justus replied in a KC Town Hall and KCUR thread that she was working with the Economic Development Corporation on possible solutions.",
    ["direct public response to KC Town Hall", "city-official follow-up concerning Leon's Thriftway"],
    ["a promised or completed outcome", "endorsement of KC Town Hall", "Jamie's authorship of the initiating post"]
  ),
  publicSocialSource(
    "SRC-X-KCTOWNHALL-ROBINSON-TIRES-2020",
    "Melissa Robinson response to KC Town Hall tire work",
    "Melissa Robinson",
    "2020-08-02",
    "https://x.com/Robinson4kc/status/1289714535251742726",
    "Robinson replied directly to KC Town Hall and thanked the project for its work to improve community conditions.",
    ["direct public Council-member response", "recognition of the project's tire-related community work"],
    ["audited impact", "institutional adoption", "individual credit for Jamie", "authorship of any shared-account post"]
  ),
  publicSocialSource(
    "SRC-X-KCMO311-KCTOWNHALL-WATER-2018",
    "KCMO 311 response to KC Town Hall water report",
    "KCMO 311",
    "2018-08-27",
    "https://x.com/KCMO311/status/1034093516073459712",
    "KCMO 311 asked KC Town Hall whether a publicly reported water issue had been resolved; the account replied with a condition update.",
    ["direct city-service response", "public issue-reporting and follow-up loop"],
    ["a complete 311 case record", "causation", "Jamie's authorship", "general city adoption of the account"]
  ),
  {
    id: "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019",
    title: "Bridging The Gap acknowledgment of KC Town Hall tire drop-off",
    organization: "Bridging The Gap",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-07-08",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/trutheresme/status/1148277187583389703",
    preferredPublicUrl: "canonical",
    publicCitation: "Bridging The Gap acknowledgment of a KC Town Hall tire drop-off, July 8, 2019.",
    publicNote:
      "The post says Bridging The Gap received a large tire drop-off from KC Town Hall at its Deramus facility and frames the work as environmental justice and community building.",
    intakeIds: [intakeId],
    supportsGenerally: ["partner acknowledgment of a KC Town Hall tire drop-off", "environmental-justice framing"],
    doesNotEstablish: ["an audited tire count", "every pickup in the project record", "Jamie's individual role", "a formal partnership agreement"]
  },
  {
    id: "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    organization: "KCUR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-05",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    preferredPublicUrl: "canonical",
    publicCitation: "KCUR, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' August 5, 2018.",
    publicNote: "KC Town Hall shared this nonpartisan election context as civic information. It is not coverage of KC Town Hall.",
    intakeIds: [intakeId],
    supportsGenerally: ["mission-relevant election information shared by the account"],
    doesNotEstablish: ["press coverage of KC Town Hall", "authorship by KC Town Hall", "voter conversion or impact"]
  },
  {
    id: "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
    title: "Affordable housing policy hits docket in KCMO",
    organization: "Northeast News",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-09-19",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    preferredPublicUrl: "canonical",
    publicCitation: "Northeast News, 'Affordable housing policy hits docket in KCMO,' September 19, 2018.",
    publicNote: "KC Town Hall shared this reporting on local affordable-housing proposals as civic information. It is not coverage of KC Town Hall.",
    intakeIds: [intakeId],
    supportsGenerally: ["mission-relevant affordable-housing reporting shared by the account"],
    doesNotEstablish: ["press coverage of KC Town Hall", "KC Town Hall authorship", "policy influence or causation"]
  },
  {
    id: "SRC-KSHB-LEONS-CLOSURE-2019",
    title: "Owners of Leon's Thriftway calling it quits after more than 50 years",
    organization: "KSHB 41",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-04-26",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.kshb.com/news/local-news/owners-of-leons-thriftway-calling-it-quits-after-more-than-50-years",
    preferredPublicUrl: "canonical",
    publicCitation: "KSHB 41, 'Owners of Leon's Thriftway calling it quits after more than 50 years,' April 26, 2019.",
    publicNote:
      "The reporting supplies context for the neighborhood grocery closure discussed in the KC Town Hall, Quinton Lucas, and Jolie Justus exchange. It is not coverage of KC Town Hall.",
    intakeIds: [intakeId],
    supportsGenerally: ["public context for the Leon's Thriftway closure"],
    doesNotEstablish: ["press coverage of KC Town Hall", "a result from the public exchange", "KC Town Hall causation"]
  }
] satisfies SourceRecord[];

const reading = (
  id: string,
  sourceId: string,
  propositions: SourceReading["propositions"],
  limitations: string[]
): SourceReading => ({
  id,
  sourceId,
  status: "closely-read",
  readAt: "2026-07-14",
  propositions,
  limitations,
  researchTaskIds: []
});

export const kcTownHallSocialCensusReadings = [
  reading(
    "READ-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026",
    "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026",
    [
      { id: "PROP-X-KCTOWNHALL-FULL-POPULATION-183", text: "The authenticated Posts and Replies route union reconciles exactly to the 183-item profile control: 142 account posts, 13 account replies, and 28 reposts.", relationToJamie: "project-context", supportTags: ["kctownhall-full-social-population"], confidence: "high", locator: "Route-union population reconciliation" },
      { id: "PROP-X-KCTOWNHALL-TIRE-WORKFLOW-100", text: "One hundred of the 183 records belong to the resident tire-intake and operations workflow; 98 distinct records carry #TiredOfTires.", relationToJamie: "project-context", supportTags: ["kctownhall-tire-workflow-census"], confidence: "high", locator: "Redacted item-ledger classifications" },
      { id: "PROP-X-KCTOWNHALL-LINKS-31", text: "The account record contains 31 distinct shortened URLs resolving to 20 current destinations, including nine project or project-lineage destinations.", relationToJamie: "project-context", supportTags: ["kctownhall-posted-link-inventory"], confidence: "high", locator: "Deduplicated posted-URL inventory" },
      { id: "PROP-X-KCTOWNHALL-REPOST-NETWORK-16", text: "The 28 reposts amplify 16 source accounts, including nine source statuses from three then-serving City Council figures.", relationToJamie: "project-context", supportTags: ["kctownhall-bounded-repost-network"], confidence: "high", locator: "Source-account frequency review" },
      { id: "PROP-X-KCTOWNHALL-CURRENT-REACTIONS", text: "As observed in July 2026, 74 of 155 account-authored statuses displayed at least one reaction, totaling 22 replies, 69 reposts, and 139 likes in the interface.", relationToJamie: "outcome-context", supportTags: ["kctownhall-current-visible-reactions"], confidence: "high", locator: "Dated public-interface metric snapshot" }
    ],
    [
      "This is the complete surviving profile population at capture, not a native export or deletion history.",
      "The shared account does not identify the author of every status.",
      "Current visible reactions are mutable interface observations, not historical analytics, unique people, reach, adoption, endorsement, or impact."
    ]
  ),
  reading(
    "READ-WAYBACK-KCTOWNHALL-HOME-2019",
    "SRC-WAYBACK-KCTOWNHALL-HOME-2019",
    [
      { id: "PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-WORKFLOW", text: "The archived project surface attributes KC Town Hall posts to Julia and Jamie and presents a monthly free tire-pickup workflow with Oak Park Neighborhood Association.", relationToJamie: "collective-role", supportTags: ["kctownhall-jamie-julia-public-workflow", "kctownhall-social-operations-loop"], confidence: "high", locator: "Home page project and tire sections" },
      { id: "PROP-WAYBACK-KCTOWNHALL-PROJECT-PURPOSE", text: "KC Town Hall described its goal as a permanent neighborhood resource and cultural center shaped through neighborhood participation.", relationToJamie: "project-context", supportTags: ["kctownhall-public-project-purpose"], confidence: "high", locator: "Home page introduction" }
    ],
    ["The archived page does not establish sole authorship, completed construction, audited tire totals, or current project status."]
  ),
  reading(
    "READ-WAYBACK-KCTOWNHALL-ABOUT-2019",
    "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019",
    [
      { id: "PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-ROLE", text: "The archived about page identifies Julia and Jamie as restoring a long-abandoned building through a neighborhood process toward a permanently affordable community space.", relationToJamie: "collective-role", supportTags: ["kctownhall-jamie-julia-collective-role"], confidence: "high", locator: "About page introduction" }
    ],
    ["The source does not establish sole credit, completed construction, present status, or the reason the project later transitioned."]
  ),
  reading(
    "READ-WAYBACK-KCTOWNHALL-TIRES-2021",
    "SRC-WAYBACK-KCTOWNHALL-TIRES-2021",
    [
      { id: "PROP-WAYBACK-KCTOWNHALL-RESIDENT-INTAKE", text: "The archived tire page exposes a form and phone or text intake for residents to request free pickup from homes in historic east Kansas City, Missouri.", relationToJamie: "collective-role", supportTags: ["kctownhall-resident-intake"], confidence: "high", locator: "Tire page intake section" },
      { id: "PROP-WAYBACK-KCTOWNHALL-RECURRING-SCHEDULE", text: "The archived tire page publishes a recurring 2021 pickup schedule rather than a one-time event.", relationToJamie: "project-context", supportTags: ["kctownhall-recurring-service-schedule"], confidence: "high", locator: "Tire page schedule" }
    ],
    ["The page's aggregate tire and savings figures are project self-reports and are not treated as audited impact."]
  ),
  ...[
    ["READ-X-KCTOWNHALL-QUINTON-LEONS-2019", "SRC-X-KCTOWNHALL-QUINTON-LEONS-2019", "PROP-X-KCTOWNHALL-QUINTON-LEONS", "Quinton Lucas publicly quoted KC Town Hall's Leon's Thriftway call and described his own follow-up with ownership.", "kctownhall-council-account-engagement"],
    ["READ-X-KCTOWNHALL-JUSTUS-LEONS-2019", "SRC-X-KCTOWNHALL-JUSTUS-LEONS-2019", "PROP-X-KCTOWNHALL-JUSTUS-LEONS", "Jolie Justus publicly replied in a KC Town Hall and KCUR thread and described work with the Economic Development Corporation on possible solutions.", "kctownhall-council-account-engagement"],
    ["READ-X-KCTOWNHALL-ROBINSON-TIRES-2020", "SRC-X-KCTOWNHALL-ROBINSON-TIRES-2020", "PROP-X-KCTOWNHALL-ROBINSON-TIRES", "Melissa Robinson publicly replied to KC Town Hall and thanked the project for its work to improve community conditions.", "kctownhall-council-account-engagement"],
    ["READ-X-KCMO311-KCTOWNHALL-WATER-2018", "SRC-X-KCMO311-KCTOWNHALL-WATER-2018", "PROP-X-KCMO311-KCTOWNHALL-WATER", "KCMO 311 publicly asked whether a condition reported by KC Town Hall had been resolved, and the account supplied a condition update.", "kctownhall-city-service-response"],
    ["READ-X-KCTOWNHALL-BTG-DROPOFF-2019", "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019", "PROP-X-KCTOWNHALL-BTG-DROPOFF", "Bridging The Gap publicly acknowledged receiving a large tire drop-off from KC Town Hall.", "kctownhall-partner-corroboration"]
  ].map(([id, sourceId, propositionId, text, supportTag]) =>
    reading(
      id,
      sourceId,
      [{ id: propositionId, text, relationToJamie: "outcome-context", supportTags: [supportTag], confidence: "high", locator: "Public social post" }],
      ["The exchange does not establish endorsement, adoption, audited impact, individual authorship, or a completed downstream outcome."]
    )
  ),
  ...[
    ["READ-KCUR-MISSOURI-PRIMARY-GUIDE-2018", "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018", "PROP-KCUR-KCTOWNHALL-ELECTION-CONTEXT", "KC Town Hall shared a KCUR primary-election guide as civic information.", "kctownhall-civic-source-routing"],
    ["READ-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "PROP-NORTHEAST-KCTOWNHALL-HOUSING-CONTEXT", "KC Town Hall shared Northeast News reporting on local affordable-housing proposals as civic information.", "kctownhall-civic-source-routing"],
    ["READ-KSHB-LEONS-CLOSURE-2019", "SRC-KSHB-LEONS-CLOSURE-2019", "PROP-KSHB-KCTOWNHALL-LEONS-CONTEXT", "KSHB reporting supplies independent context for the Leon's Thriftway closure discussed in the public KC Town Hall exchange.", "kctownhall-neighborhood-source-context"]
  ].map(([id, sourceId, propositionId, text, supportTag]) =>
    reading(
      id,
      sourceId,
      [{ id: propositionId, text, relationToJamie: "project-context", supportTags: [supportTag], confidence: "high", locator: "Article and posted-link review" }],
      ["The article is contextual material shared or surfaced through the account record, not press coverage of KC Town Hall or evidence of Jamie's authorship or impact."]
    )
  )
] satisfies SourceReading[];

export const kcTownHallSocialCensusClaims = [
  {
    id: "CLM-KCTOWNHALL-FULL-SOCIAL-POPULATION",
    project: "kc-town-hall",
    internalClaim: "The authenticated Posts and Replies route union recovered all 183 items represented by the surviving @KCTownHall profile control: 142 account posts, 13 account replies, and 28 reposts.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["kctownhall-full-social-population"],
    projections: [],
    evidence: [{ sourceId: "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["complete disposition of the 183-item surviving profile control"], propositionIds: ["PROP-X-KCTOWNHALL-FULL-POPULATION-183"], confidence: "high", renderCitation: false }],
    boundaries: ["Complete means the surviving profile population visible on July 14, 2026, not a native export or deletion history."],
    antiClaims: ["No older post was ever deleted.", "The ledger is a native X export.", "Jamie authored every recovered status."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT",
    project: "kc-town-hall",
    internalClaim: "The recovered public record contains direct responses to KC Town Hall from three then-serving City Council figures and KCMO 311, plus partner acknowledgment of a tire drop-off.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: ["kctownhall-council-account-engagement", "kctownhall-city-service-response", "kctownhall-jamie-julia-collective-role"],
    composition: {
      action: "Worked with Julia on a neighborhood project whose public account invited resident reports and put local conditions into visible exchange with city actors.",
      intendedEnd: "Make neighborhood needs easier to report, follow, and connect to practical public or partner response.",
      usableResult: "The recovered record contains direct replies or quotes from three then-serving City Council figures, a KCMO 311 condition check, and partner acknowledgment of a tire drop-off.",
      audience: "Hiring readers evaluating public-interest implementation, stakeholder communication, and operational follow-through.",
      collectiveCredit: "KC Town Hall was collective work by Julia Fredenburg and Jamie Burkart with neighborhood and service partners; the shared account does not identify the author of every post.",
      causalBoundary: "The exchanges document responsiveness and corroboration, not endorsement, institutional adoption, audited impact, a completed solution, or Jamie's individual authorship of the initiating messages."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019", relationship: "direct-support", supports: ["Julia and Jamie's collective project role"], propositionIds: ["PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-ROLE"], confidence: "high", renderCitation: false },
      ...[
        ["SRC-X-KCTOWNHALL-QUINTON-LEONS-2019", "PROP-X-KCTOWNHALL-QUINTON-LEONS"],
        ["SRC-X-KCTOWNHALL-JUSTUS-LEONS-2019", "PROP-X-KCTOWNHALL-JUSTUS-LEONS"],
        ["SRC-X-KCTOWNHALL-ROBINSON-TIRES-2020", "PROP-X-KCTOWNHALL-ROBINSON-TIRES"],
        ["SRC-X-KCMO311-KCTOWNHALL-WATER-2018", "PROP-X-KCMO311-KCTOWNHALL-WATER"]
      ].map(([sourceId, propositionId]) => ({ sourceId, relationship: "corroborating" as const, supports: ["a direct public city or Council response"], propositionIds: [propositionId], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["The count is limited to direct interactions recovered and individually verified in this pass.", "Reposts of Council figures' source posts are amplification by KC Town Hall, not engagement by those figures with KC Town Hall."],
    antiClaims: ["City or Council engagement proves endorsement.", "The exchanges prove institutional adoption or neighborhood impact.", "Jamie personally authored every exchange."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-KCTOWNHALL-CIVIC-INFORMATION-ROUTING",
    project: "kc-town-hall",
    internalClaim: "Beyond project operations, the account routed neighborhood audiences to election, voter, transit, housing, public-health, and city-service information.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["kctownhall-posted-link-inventory", "kctownhall-civic-source-routing"],
    projections: [],
    evidence: [
      { sourceId: "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["the bounded posted-link and civic-information pattern"], propositionIds: ["PROP-X-KCTOWNHALL-LINKS-31"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018", relationship: "corroborating", supports: ["election-information routing"], propositionIds: ["PROP-KCUR-KCTOWNHALL-ELECTION-CONTEXT"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", relationship: "corroborating", supports: ["housing-information routing"], propositionIds: ["PROP-NORTHEAST-KCTOWNHALL-HOUSING-CONTEXT"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Linked sources are mission context shared by the account, not press coverage of KC Town Hall."],
    antiClaims: ["KC Town Hall authored the linked journalism.", "Sharing a resource proves that recipients used it or that it caused an outcome."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-KCTOWNHALL-CURRENT-VISIBLE-REACTION-SNAPSHOT",
    project: "kc-town-hall",
    internalClaim: "As observed in July 2026, 74 of 155 account-authored statuses displayed at least one reaction, totaling 22 replies, 69 reposts, and 139 likes in the public interface.",
    status: "use-with-care",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["kctownhall-current-visible-reactions"],
    projections: [],
    evidence: [{ sourceId: "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["dated current visible-reaction snapshot"], propositionIds: ["PROP-X-KCTOWNHALL-CURRENT-REACTIONS"], confidence: "high", renderCitation: false }],
    boundaries: ["Date every use as a July 2026 interface observation.", "Metrics on 28 reposted source statuses are excluded because they belong to the source statuses."],
    antiClaims: ["These are historical engagement totals.", "The counts represent unique people.", "Visible reactions prove reach, adoption, endorsement, or impact."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallSocialCensusResearchTasks = [
  {
    id: "TASK-KCTOWNHALL-FULL-POPULATION-CENSUS",
    project: "kc-town-hall",
    question: "Can every item represented by the surviving @KCTownHall profile count be recovered, classified, linked, and integrated without overstating completeness, authorship, adoption, or impact?",
    status: "resolved",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", "SRC-WAYBACK-KCTOWNHALL-HOME-2019", "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019", "SRC-WAYBACK-KCTOWNHALL-TIRES-2021"],
    claimIds: ["CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP", "CLM-KCTOWNHALL-FULL-SOCIAL-POPULATION", "CLM-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT", "CLM-KCTOWNHALL-CIVIC-INFORMATION-ROUTING", "CLM-KCTOWNHALL-CURRENT-VISIBLE-REACTION-SNAPSHOT"],
    nextActions: ["Re-run the route union and compare content digests if the live profile count changes.", "Keep audited service totals and individual post authorship in their separate research tasks."],
    resolutionSummary: "Recovered all 183 items represented by the July 2026 profile control: 142 account posts, 13 account replies, and 28 reposts. Resolved 31 shortened URLs to 20 destinations and preserved completeness, authorship, metric, collective-credit, and causality boundaries."
  }
] satisfies ResearchTask[];

export const kcTownHallSocialCensusDecisions = [
  {
    id: "DEC-DEFER-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT",
    claimId: "CLM-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale: "Keep the source-backed stakeholder-response finding available for later composition while the current case study remains focused on the project's core implementation and official funding record.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
