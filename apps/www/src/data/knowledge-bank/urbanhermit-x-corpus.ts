import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const fixtureSourceId = "SRC-URBANHERM-X-FULL-POPULATION-2026";
const researchSourceId = "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026";

export const urbanhermitXCorpusIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-URBANHERM-X-FULL-POPULATION",
    receivedAt: reviewedAt,
    inputKind: "metric",
    summary: "Authenticated public-safe archival review reconciling every record counted by the live @urbanhermit profile while separating Jamie-authored posts, external-source reposts, posted links, mission signals, incoming public responses, and volatile interaction counters.",
    projectIds: ["urbanhermit-public-record"],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [fixtureSourceId, researchSourceId],
    observationIds: [
      "OBS-URBANHERM-X-FULL-POPULATION-RECONCILIATION",
      "OBS-URBANHERM-X-PUBLISHING-PATTERN",
      "OBS-URBANHERM-X-BOUNDED-INCOMING-RESPONSE",
      "OBS-URBANHERM-X-VISIBLE-ENGAGEMENT-SNAPSHOT"
    ],
    claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
    researchInquiryIds: [
      "INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION",
      "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"
    ],
    nextActions: [
      "Reconcile the 434 live-profile records against Jamie's account-owner X Archive if it becomes available.",
      "Continue close reading the 321 distinct posted short URLs by evidentiary value, preserving non-recovery distinctly from nonexistence.",
      "Keep raw post text, private analytics, session state, direct messages, and irrelevant personal context outside the public repository."
    ]
  },
  {
    id: "INTAKE-2026-07-15-URBANHERM-MISSION-SOURCES",
    receivedAt: reviewedAt,
    inputKind: "url",
    summary: "Mission-relevant source maturation from the complete @urbanhermit population, including public records concerning Horse Lords, the 8th Street Tunnel, Tired of Tires, and NYC Artist Coalition's Office of Nightlife advocacy.",
    projectIds: [
      "urbanhermit-public-record",
      "creative-technology-and-media",
      "kansas-city-public-programs",
      "kansas-city-neighborhood-programs",
      "nyc-artist-coalition"
    ],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      fixtureSourceId,
      "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      "SRC-URBANHERM-X-KCTH-TIRES-2019",
      "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
    ],
    observationIds: [
      "OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION",
      "OBS-URBANHERM-X-JULIA-TUNNEL-RESPONSE",
      "OBS-URBANHERM-X-TIRED-OF-TIRES-PARTICIPATION",
      "OBS-URBANHERM-X-TIRED-OF-TIRES-PROJECT-CORROBORATION",
      "OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE"
    ],
    claimIds: [
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
      "CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM",
      "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
    nextActions: [
      "Preserve collaborator, participant, project-account, and coalition authorship at source level.",
      "Treat posting and public response as circulation evidence, not automatic endorsement, reach, participation, or impact.",
      "Keep these records available for future composition without forcing them onto the current portfolio site."
    ]
  }
];

export const urbanhermitXCorpusSources: KnowledgeBank["sources"] = [
  {
    id: fixtureSourceId,
    title: "Urbanhermit X full live-profile population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation: "Public-safe metadata inventory of all 434 records counted by the live @urbanhermit profile on July 15, 2026.",
    publicNote: "Preserves status identities, dates, source authorship, record types, retrieval provenance, public links, classifications, bounded mission-relevant incoming records, and dated visible counts while excluding raw post text, private analytics, session state, and unnecessary identity data for non-mission personal context.",
    supportsGenerally: [
      "434-of-434 live profile-counted record review",
      "record-type and source-authorship separation",
      "posted-URL, mission-signal, bounded incoming-response, and visible-interaction inventories"
    ],
    doesNotEstablish: [
      "that no older post was deleted or absent before capture",
      "a complete account-owner archive",
      "Jamie's authorship of external-source native reposts",
      "the truth of every historical statement or linked destination",
      "reach, endorsement, conversion, participation, or impact",
      "the identity or activity of nine redacted non-mission personal-context records"
    ]
  },
  {
    id: researchSourceId,
    title: "Authenticated Urbanhermit archival-production research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Authenticated Posts, Replies, and year-bounded incoming-search review completed July 15, 2026",
    publicCitation: "Authenticated July 15, 2026 archival-production run over @urbanhermit Posts, Replies, and year-bounded incoming mentions.",
    publicNote: "The protected capture permits future audit and reclassification without publishing raw post text, historical personal context, contact details, private analytics, or authenticated-session data.",
    protectedLocatorId: "PTR-URBANHERM-X-AUTHENTICATED-CAPTURE-2026",
    supportsGenerally: [
      "authenticated traversal and repeated no-growth stopping rule",
      "private source-body close reading",
      "classification-input provenance",
      "year-bounded incoming-search method"
    ],
    doesNotEstablish: [
      "a complete account-owner archive",
      "deleted or unindexed records",
      "private or nonpublic engagement",
      "permission to publish raw historical post text"
    ]
  },
  {
    id: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
    title: "Jamie Burkart post linking the Horse Lords Truthers video",
    author: "Jamie Burkart",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, public post linking the Horse Lords 'Truthers' video on NPR, April 29, 2016.",
    publicNote: "The contemporaneous post names M.C. Schmidt's account and Horse Lords and links the NPR publication.",
    supportsGenerally: ["contemporaneous association with the video collaboration", "the NPR publication destination"],
    doesNotEstablish: ["sole authorship", "the precise production split", "commission terms", "rights clearance", "audience reach or impact"]
  },
  {
    id: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
    title: "Julia Fredenburg post sharing Jamie's 8th Street Tunnel interview",
    author: "Julia Fredenburg",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-13",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    preferredPublicUrl: "canonical",
    publicCitation: "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
    supportsGenerally: ["public collaborator response to Jamie's historical interpretation", "the connection between Jamie and the KCUR article"],
    doesNotEstablish: ["the complete 2006 event details", "formal access rights", "attendance", "measured public impact"]
  },
  {
    id: "SRC-URBANHERM-X-KCTH-TIRES-2019",
    title: "KC Town Hall Tired of Tires operating update",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-06-02",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, public Tired of Tires operating update naming Jamie Burkart among participants, June 2, 2019.",
    publicNote: "The project account names Jamie among participants in a recurring pickup and free-disposal workflow; its exact tire and savings figures remain first-party claims.",
    supportsGenerally: ["Jamie's named participation", "recurring public intake and disposal coordination"],
    doesNotEstablish: ["Jamie's sole operation or design of the program", "individual authorship of the post", "every participant's task", "independently audited totals"]
  },
  {
    id: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
    title: "Jimmy Fitzner first-hand account of a tire-pickup shift with Jamie",
    author: "Jimmy Fitzner",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-04-01",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    preferredPublicUrl: "canonical",
    publicCitation: "Jimmy Fitzner, first-hand public account of driving a dump truck with Jamie Burkart to pick up tires in Northeast Kansas City, April 1, 2022.",
    supportsGenerally: ["Jamie's direct participation in a neighborhood tire-pickup shift", "use of a dump truck", "Northeast Kansas City as the described service area"],
    doesNotEstablish: ["Jamie's sole operation or design of the program", "a complete operating period", "every shift", "a complete participant roster", "independently audited totals"]
  },
  {
    id: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
    title: "NYC's Office of Nightlife expected to be here by 2018",
    organization: "Brooklyn Eagle",
    author: "Scott Enman",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-08-04",
    accessedAt: reviewedAt,
    canonicalUrl: "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
    preferredPublicUrl: "canonical",
    publicCitation: "Scott Enman, 'NYC's Office of Nightlife expected to be here by 2018,' Brooklyn Eagle, August 4, 2017.",
    publicNote: "Contemporaneous reporting quotes NYC Artist Coalition and describes the Council committee, public feedback, and proposed Office of Nightlife functions.",
    supportsGenerally: ["direct NYC Artist Coalition quotation", "contemporaneous Office of Nightlife policy sequence", "reported public-feedback process"],
    doesNotEstablish: ["Jamie's individual authorship or role", "sole coalition causation", "final legal status", "implementation quality", "measured policy impact"]
  }
];

export const urbanhermitXCorpusObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-URBANHERM-X-FULL-POPULATION-RECONCILIATION",
    sourceId: fixtureSourceId,
    project: "urbanhermit-public-record",
    text: "The authenticated July 15, 2026 pass reconciled all 434 records counted by the live @urbanhermit profile. Posts yielded 421 primary records; Replies rendered 436 cards comprising 434 primary profile records and two excluded conversation-parent cards authored by another account. The 434-record union contains 340 originals, 13 replies, and 81 external-source native reposts.",
    locator: "populationReconciliation, recordTypeCounts, conversationContextRecords, and 434 row-level records",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
    researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-PUBLISHING-PATTERN",
    sourceId: fixtureSourceId,
    project: "urbanhermit-public-record",
    text: "The population contains 353 account-authored originals or replies and 81 redistributed external-source records. Source bodies contain 349 external-link occurrences representing 321 distinct short URLs across 277 records; strict overlapping rules identify recurring signals in community platforms and gatherings, civic participation, cultural-space advocacy, public history and waterways, creative technology and media, and neighborhood mutual aid.",
    locator: "publishingPattern, postedUrlInventory, missionSignalClassification, and row-level classifications",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-BOUNDED-INCOMING-RESPONSE",
    sourceId: fixtureSourceId,
    project: "urbanhermit-public-record",
    text: "A year-bounded authenticated search from 2008 through 2026 recovered 26 public incoming records. Close reading classified 15 records from nine accounts as mission-relevant third-party responses and retained two additional mission-relevant conversation-context records. Nine personal or network-context records remain only as redacted dispositions: their identities, dates, URLs, and metrics are withheld and they are excluded from professional traction claims.",
    locator: "stakeholderInventory and its 26 row-level dispositions",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
    researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-VISIBLE-ENGAGEMENT-SNAPSHOT",
    sourceId: fixtureSourceId,
    project: "urbanhermit-public-record",
    text: "At the July 15, 2026 access snapshot, 85 of 353 account-authored records displayed at least one interaction. Those records displayed 175 likes, eight replies, and 60 reposts; records redistributed from external sources were excluded from these account-owned totals.",
    locator: "visibleEngagementSnapshot and account-authored row metrics",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION",
    sourceId: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
    project: "creative-technology-and-media",
    text: "Jamie's contemporaneous public post links the NPR publication and names M.C. Schmidt's account and Horse Lords. The independently recovered NPR article directly credits M.C. Schmidt and Jamie Burkart as the video's co-creators.",
    locator: "Status 726144972802691073 and NPR article introduction",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO"],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-JULIA-TUNNEL-RESPONSE",
    sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
    project: "kansas-city-public-programs",
    text: "Julia Fredenburg publicly shared Jamie's KCUR appearance as historical knowledge about Kansas City's 8th Street Tunnel, providing attributable public-response context for the independently reported program.",
    locator: "Status 775795144553398272 and stakeholderInventory",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-TIRED-OF-TIRES-PARTICIPATION",
    sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
    project: "kansas-city-neighborhood-programs",
    text: "Jimmy Fitzner gave a first-hand public account of riding with Jamie in a dump truck to pick up tires around Northeast Kansas City. A KC Town Hall operating update separately names Jamie among participants in the recurring Tired of Tires workflow.",
    locator: "Jimmy Fitzner status 1510067983456026629 and KC Town Hall status 1135246124883861504",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-X-TIRED-OF-TIRES-PROJECT-CORROBORATION",
    sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
    project: "kansas-city-neighborhood-programs",
    text: "A June 2019 KC Town Hall operating update names Jamie among participants in a recurring free tire-disposal and curbside-pickup workflow.",
    locator: "Status 1135246124883861504",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE",
    sourceId: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
    project: "nyc-artist-coalition",
    text: "The Brooklyn Eagle reported the Council committee and public-feedback sequence around the proposed Office of Nightlife and directly quoted NYC Artist Coalition's critique of the Cabaret Law's discriminatory history and its effect on informal cultural spaces.",
    locator: "Article sections on committee progress, feedback, the coalition quotation, and proposed office functions",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
    researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const urbanhermitXCorpusClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
    project: "urbanhermit-public-record",
    internalClaim: "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface spanning community platforms and gatherings, civic participation, cultural-space advocacy, public history and waterways, creative technology, and neighborhood work. The July 15, 2026 archival pass reconciled all 434 records counted by the live profile and retained a bounded incoming-response inventory.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The personal account preserves a complete, public-safe metadata record of its 434 live profile-counted posts and reposts across multiple project lineages.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["434-of-434 live-profile reconciliation", "record-type and source-authorship separation", "posted-link and mission-signal inventories", "bounded incoming-response and visible-interaction inventories"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: researchSourceId,
        relationship: "private-support",
        supports: ["authenticated traversal provenance", "source-body close reading", "classification reproducibility without publishing raw text"],
        publicNote: "Protected raw capture; the public fixture preserves public-safe metadata and hashes only.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "All 434 live profile-counted records were reviewed; this is not proof that no record was deleted or absent before capture.",
      "The corpus contains 353 account-authored originals or replies and 81 external-source native reposts; source authorship remains explicit.",
      "The 15 mission-relevant incoming records from nine accounts are a bounded public-index sample, not complete historical engagement.",
      "Nine non-mission personal or network-context records are represented only by redacted dispositions, not public identities, dates, URLs, or metrics.",
      "Raw post text and protected personal or authenticated-session context remain outside the public repository.",
      "The corpus is knowledge-bank depth and is not selected for the current job-application website."
    ],
    antiClaims: [
      "Jamie authored all 434 source records.",
      "The live profile is a complete account-owner archive of every post Jamie ever published.",
      "Every posted source endorses Jamie or a project.",
      "Theme frequency measures professional importance or work performed.",
      "243 displayed interaction units equal 243 people.",
      "Visible interactions measure reach, conversion, participation, or impact.",
      "The bounded incoming search recovered every historical response."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION", "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
    project: "kansas-city-neighborhood-programs",
    internalClaim: "Jamie directly participated in KC Town Hall's recurring Tired of Tires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie directly participated in a recurring neighborhood tire-removal workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        relationship: "direct-support",
        supports: ["first-hand participant account of a dump-truck tire-pickup shift with Jamie", "Northeast Kansas City service area"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
        relationship: "corroborating",
        supports: ["Jamie's named participation in a recurring tire-pickup and disposal workflow"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records establish direct participation, not sole program ownership, design authorship, complete coordination, or every shift.",
      "Exact tire and savings totals remain project-maintained figures unless independently corroborated.",
      "The KC Town Hall post remains collectively authored without post-level attribution.",
      "The narrow participation claim is mature but not selected for the current website."
    ],
    antiClaims: [
      "Jamie alone created or operated Tired of Tires.",
      "Jamie performed every pickup.",
      "The records establish the complete operating period.",
      "The social posts independently audit tire or savings totals.",
      "The project-account post was authored by Jamie."
    ],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    reviewedAt,
    reviewedBy
  }
];

export const urbanhermitXCorpusResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION",
    project: "urbanhermit-public-record",
    question: "Can the live-profile population be reconciled against Jamie's account-owner X Archive to identify records deleted, withheld, or otherwise absent before July 15, 2026?",
    methods: [
      "Request and download the account-owner X Archive.",
      "Transform it only in a protected workspace and reconcile stable status IDs against the 434-row public fixture.",
      "Publish only public-safe derived metadata and explicit remainder dispositions."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All 434 records counted by the live profile materialized and were reviewed.",
      "Posts and Replies reconciled exactly after excluding two conversation-parent cards authored by another account.",
      "The public fixture is complete for the capture-date profile counter."
    ],
    limitations: [
      "The account-owner archive was not supplied to this production pass.",
      "The live interface cannot establish whether older records were deleted or otherwise absent before capture."
    ],
    sourceIds: [fixtureSourceId, researchSourceId],
    publicSummary: "The capture-date live profile is fully reconciled; all-ever historical completeness remains an account-owner archive question.",
    protectedLocatorId: "PTR-URBANHERM-X-AUTHENTICATED-CAPTURE-2026"
  },
  {
    id: "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION",
    project: "urbanhermit-public-record",
    question: "Which of the 321 distinct posted short URLs should mature from complete inventory into source-level observations, claims, or explicit non-recovery records?",
    methods: [
      "Retain every recovered link in the public-safe fixture.",
      "Prioritize independent sources that identify Jamie, document role or method, establish project outcomes, or clarify collective and institutional context.",
      "Keep circulation, self-description, first-hand testimony, independent reporting, official record, and public response as separate source roles.",
      "Record redirect failures and non-recovery without claiming that a destination never existed."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All 321 distinct short URLs have an inventory disposition in the fixture.",
      "The existing KCUR 8th Street Tunnel source gained attributable collaborator-response context.",
      "Public participant and project-account records matured a narrow direct-participation claim for Tired of Tires.",
      "The corpus independently corroborated the existing Horse Lords co-creation claim.",
      "The Brooklyn Eagle article added a direct coalition quotation and contemporaneous Office of Nightlife policy sequence without assigning Jamie individual causation."
    ],
    limitations: [
      "Not all 321 destinations have been resolved and close-read at article level.",
      "A source posted or reposted by Jamie is not automatically coverage, endorsement, partnership, or evidence of Jamie's role.",
      "Media rights and collaborator role granularity remain separate research questions."
    ],
    sourceIds: [
      fixtureSourceId,
      "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
      "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
      "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      "SRC-URBANHERM-X-KCTH-TIRES-2019",
      "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
    ],
    publicSummary: "Every posted URL is preserved; source-level maturation proceeds by evidentiary value rather than social circulation alone."
  }
];
