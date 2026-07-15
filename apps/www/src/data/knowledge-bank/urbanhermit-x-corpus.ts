import type { KnowledgeBank } from "./schema.ts";

const project = "urbanhermit-public-record";
const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex authenticated archival-production review"];

export const urbanhermitSourceIds = {
  profile: "SRC-URBANHERM-X-PROFILE-2026-07-15",
  census: "SRC-URBANHERM-X-FULL-POPULATION-CENSUS-2026-07-15",
  protectedResearch: "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15",
  horseLordsJamie: "SRC-URBANHERM-X-HORSE-LORDS-2016-04-29",
  horseLordsDrew: "SRC-DREW-DANIEL-X-HORSE-LORDS-2016-04-29",
  horseLordsJulia: "SRC-JULIA-FREDENBURG-X-HORSE-LORDS-2016-04-29",
  horseLordsNpr: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016-04-29",
  tunnelKcur: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15",
  tunnelJulia: "SRC-JULIA-FREDENBURG-X-EIGHTH-STREET-TUNNEL-2016-09-13",
  tiresKcTownHall: "SRC-KC-TOWN-HALL-X-TIRES-2019-06-02",
  tiresJimmy: "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01",
  nightlifeBrooklynEagle: "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-22"
} as const;

export const urbanhermitClaimIds = {
  publicRecord: "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
  horseLords: "CLM-URBANHERM-HORSE-LORDS-VIDEO",
  tunnel: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
  tires: "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION"
} as const;

export const urbanhermitXCorpusSources = [
  {
    id: urbanhermitSourceIds.profile,
    title: "Jamie Burkart X profile",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/urbanhermit",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart (@urbanhermit), authenticated X profile reviewed July 15, 2026.",
    publicNote: "The authenticated profile showed 434 posts and a record beginning in October 2008.",
    supportsGenerally: ["the @urbanhermit account identity", "434-post live-profile count", "October 2008 account chronology"],
    doesNotEstablish: ["a complete owner archive", "that no historical record was deleted or withheld", "professional relevance of every post", "lifetime reach"]
  },
  {
    id: urbanhermitSourceIds.census,
    title: "@urbanhermit full live-profile population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex authenticated archival-production review",
    assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation: "Public-safe aggregate inventory of all 434 records counted by the live @urbanhermit profile on July 15, 2026.",
    publicNote: "The fixture preserves population arithmetic, source-authorship, link, mission-signal, stakeholder-group, and dated interaction aggregates while excluding raw post text and item-level personal history.",
    supportsGenerally: ["434-of-434 live profile-counted record review", "340 originals", "13 replies", "81 native reposts", "349 link occurrences", "321 distinct short URLs", "15 mission-relevant incoming records from nine accounts"],
    doesNotEstablish: ["all-ever completeness", "Jamie's authorship of native repost source text", "the truth of linked sources", "complete engagement", "reach, endorsement, conversion, attendance, or impact"]
  },
  {
    id: urbanhermitSourceIds.protectedResearch,
    title: "Authenticated @urbanhermit archival-production research run",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation: "Authenticated archival-production run over @urbanhermit Posts, Replies, and year-bounded incoming mentions, July 15, 2026.",
    publicNote: "Protected source material supports future reclassification without publishing raw historical post text, personal context, or authenticated-session data.",
    protectedLocatorId: "LOC-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15",
    supportsGenerally: ["authenticated traversal method", "repeated no-growth stopping rule", "classification provenance", "bounded yearly incoming-search method"],
    doesNotEstablish: ["an owner archive", "deleted or unindexed records", "private engagement", "permission to publish raw historical posts"]
  },
  {
    id: urbanhermitSourceIds.horseLordsJamie,
    title: "Jamie Burkart post linking the Horse Lords Truthers video",
    author: "Jamie Burkart",
    kind: "individual-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, public post about the Horse Lords 'Truthers' video, April 29, 2016.",
    publicNote: "Jamie's contemporaneous statement names M.C. Schmidt as collaborator and links the NPR publication.",
    supportsGenerally: ["Jamie's contemporaneous co-creation statement", "Horse Lords project identity", "NPR publication link"],
    doesNotEstablish: ["precise division of labor", "sole direction", "rights clearance", "reach"]
  },
  {
    id: urbanhermitSourceIds.horseLordsDrew,
    title: "Drew Daniel post crediting the Horse Lords video collaboration",
    author: "Drew Daniel",
    kind: "individual-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    canonicalUrl: "https://x.com/DDDrewDaniel/status/726096416070836224",
    preferredPublicUrl: "canonical",
    publicCitation: "Drew Daniel, public post crediting M.C. Schmidt and Jamie Burkart's Horse Lords video, April 29, 2016.",
    supportsGenerally: ["independent public co-creation attribution", "NPR publication"],
    doesNotEstablish: ["precise division of labor", "commission terms", "rights clearance", "reach"]
  },
  {
    id: urbanhermitSourceIds.horseLordsJulia,
    title: "Julia Fredenburg post crediting the Horse Lords video collaboration",
    author: "Julia Fredenburg",
    kind: "individual-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    canonicalUrl: "https://x.com/juliafredenburg/status/726238278433804288",
    preferredPublicUrl: "canonical",
    publicCitation: "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    supportsGenerally: ["a second public co-creation attribution", "the analog-media context"],
    doesNotEstablish: ["precise division of labor", "commission terms", "rights clearance", "reach"]
  },
  {
    id: urbanhermitSourceIds.horseLordsNpr,
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    author: "Lars Gotrich",
    organization: "NPR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live-and-archived",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl: "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    archiveUrl: "https://web.archive.org/web/20160502131405/http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation: "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR, April 29, 2016.",
    publicNote: "NPR directly credits M.C. Schmidt and Jamie Burkart and attributes an account of the music-video relationship to Horse Lords member Andrew Bernstein.",
    supportsGenerally: ["M.C. Schmidt and Jamie Burkart co-credit", "NPR publication", "the video's material and structural relationship to the music"],
    doesNotEstablish: ["precise division of labor", "sole authorship", "commission terms", "rights clearance", "audience impact"]
  },
  {
    id: urbanhermitSourceIds.tunnelKcur,
    title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    author: "Cody Newill",
    organization: "KCUR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote: "The article identifies Jamie as an artist and filmmaker and documents the participatory screening he hosted inside the historic tunnel in 2006.",
    supportsGenerally: ["Jamie's 2006 downtown scavenger hunt and tunnel screening", "the three-film program", "Jamie's public-history rationale"],
    doesNotEstablish: ["ownership or control of the tunnel", "restoration or permanent opening", "authorization terms", "attendance", "measured impact"]
  },
  {
    id: urbanhermitSourceIds.tunnelJulia,
    title: "Julia Fredenburg post sharing Jamie's 8th Street Tunnel interview",
    author: "Julia Fredenburg",
    kind: "individual-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-13",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    preferredPublicUrl: "canonical",
    publicCitation: "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
    supportsGenerally: ["public collaborator circulation", "the connection between Jamie and the KCUR account"],
    doesNotEstablish: ["complete event details", "access rights", "measured impact"]
  },
  {
    id: urbanhermitSourceIds.tiresKcTownHall,
    title: "KC Town Hall June 2019 TiredOfTires operating update",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-06-02",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, public TiredOfTires operating update naming Jamie Burkart among participants, June 2, 2019.",
    publicNote: "The project account names Jamie among participants in a recurring curbside tire-disposal workflow; exact tire and savings figures remain first-party quantities.",
    supportsGenerally: ["Jamie's named participation", "recurring curbside tire-disposal workflow"],
    doesNotEstablish: ["sole operation", "audited totals", "each participant's tasks"]
  },
  {
    id: urbanhermitSourceIds.tiresJimmy,
    title: "Jimmy Fitzner account of a tire-pickup shift with Jamie",
    author: "Jimmy Fitzner",
    kind: "individual-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-04-01",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex authenticated public-web review",
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    preferredPublicUrl: "canonical",
    publicCitation: "Jimmy Fitzner, first-hand public account of riding with Jamie Burkart in a dump truck to pick up tires in Northeast Kansas City, April 1, 2022.",
    publicNote: "The participant account directly corroborates one neighborhood tire-pickup shift; its public photographs are not republished here.",
    supportsGenerally: ["Jamie's direct participation", "a dump-truck pickup shift", "Northeast Kansas City service area"],
    doesNotEstablish: ["sole operation", "complete program period", "complete participant roster", "audited totals", "photo-republication permission"]
  },
  {
    id: urbanhermitSourceIds.nightlifeBrooklynEagle,
    title: "NYC's Office of Nightlife expected to be here by 2018",
    organization: "Brooklyn Eagle",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-22",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex public-source review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex public-source review",
    canonicalUrl: "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
    preferredPublicUrl: "canonical",
    publicCitation: "Brooklyn Eagle, 'NYC's Office of Nightlife expected to be here by 2018,' September 22, 2017.",
    publicNote: "The article quotes NYC Artist Coalition and records the Council committee and public-feedback sequence around the proposed Office of Nightlife.",
    supportsGenerally: ["coalition participation in the public Office of Nightlife discussion", "Council committee and public-feedback chronology"],
    doesNotEstablish: ["Jamie's individual authorship or role", "individual causation", "the later Office's final implementation choices"]
  }
] satisfies KnowledgeBank["sources"];

const heldProjection = (text: string) => [{ key: "archive-note" as const, text, status: "hold" as const, citationRequired: true, surfaces: [] }];

export const urbanhermitXCorpusClaims = [
  {
    id: urbanhermitClaimIds.publicRecord,
    project,
    internalClaim: "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface. The authenticated review reconciled all 434 live profile-counted records and retained a bounded incoming-response inventory.",
    status: "confirmed-with-boundary",
    projections: heldProjection("Jamie's personal @urbanhermit account preserves a 2008-2023 cross-project public record; all 434 records counted by the live profile on July 15, 2026 were reviewed."),
    evidence: [
      { sourceId: urbanhermitSourceIds.profile, relationship: "corroborating", supports: ["identity", "434-post denominator", "chronology"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.census, relationship: "direct-support", supports: ["population reconciliation", "source-authorship separation", "link and mission-signal aggregates", "bounded incoming inventory"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.protectedResearch, relationship: "private-support", supports: ["authenticated traversal and classification provenance"], publicNote: "Protected raw capture; the public fixture preserves aggregates and digests.", confidence: "high", renderCitation: false }
    ],
    boundaries: ["The reconciliation covers the live profile-counted population on July 15, 2026, not records deleted or absent before capture.", "The population contains 353 Jamie-authored originals or replies and 81 external-source native reposts.", "Theme counts are retrieval aids, not measures of labor, priority, reach, endorsement, conversion, or impact.", "The 15 mission-relevant incoming records from nine accounts are a bounded public-index sample, not complete engagement.", "Raw post text and authenticated-session state remain outside the public repository."],
    antiClaims: ["Jamie authored all 434 records", "The live profile is a complete owner archive", "Every linked source endorses Jamie", "Theme frequency measures professional importance", "Visible interactions measure reach or impact", "The incoming search recovered every historical response"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: urbanhermitClaimIds.horseLords,
    project,
    internalClaim: "Jamie Burkart co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt; NPR published the video and directly credited both collaborators.",
    status: "confirmed-with-boundary",
    projections: heldProjection("Co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt. NPR published the video and credited both collaborators."),
    evidence: [
      { sourceId: urbanhermitSourceIds.horseLordsNpr, relationship: "direct-support", supports: ["co-credit", "NPR publication", "attributed artistic account"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsJamie, relationship: "corroborating", supports: ["Jamie's contemporaneous co-creation statement"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsDrew, relationship: "corroborating", supports: ["independent contemporaneous co-credit"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsJulia, relationship: "corroborating", supports: ["second contemporaneous co-credit"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Always credit M.C. Schmidt.", "The sources do not establish the precise production split.", "Do not embed or republish the video before rights and playability review.", "NPR publication does not establish commission terms, reach, or impact."],
    antiClaims: ["Jamie solely created or directed the video", "Jamie performed every production role", "NPR commissioned the video", "The video is cleared for portfolio republication"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: urbanhermitClaimIds.tunnel,
    project,
    internalClaim: "In 2006, Jamie led participants through downtown Kansas City on a scavenger hunt and hosted a three-part film screening inside the historic 8th Street Tunnel.",
    status: "confirmed-with-boundary",
    projections: heldProjection("In 2006, led participants through downtown Kansas City on a scavenger hunt and hosted a three-part film screening inside the historic 8th Street Tunnel."),
    evidence: [
      { sourceId: urbanhermitSourceIds.tunnelKcur, relationship: "direct-support", supports: ["2006 date", "host and guide roles", "three-part media program", "public-history rationale"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.tunnelJulia, relationship: "corroborating", supports: ["public collaborator circulation"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Describe a participatory screening, not tunnel restoration, ownership, or permanent opening.", "The sources do not establish authorization terms, attendance, or measured educational outcomes.", "Future public treatment should foreground present authorization and safety."],
    antiClaims: ["Jamie restored or reopened the tunnel", "Jamie controlled public access", "Attendance or impact was measured", "The access model should be repeated without current authorization and safety review"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: urbanhermitClaimIds.tires,
    project,
    internalClaim: "Jamie directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
    status: "confirmed-with-boundary",
    projections: heldProjection("Directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City."),
    evidence: [
      { sourceId: urbanhermitSourceIds.tiresJimmy, relationship: "direct-support", supports: ["Jamie's direct participation", "dump-truck pickup workflow", "Northeast Kansas City service area"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.tiresKcTownHall, relationship: "corroborating", supports: ["project-account naming of Jamie", "recurring curbside workflow"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["This establishes direct participation, not sole program ownership or operation.", "Do not attach unaudited tire or savings totals to Jamie as personal outcomes.", "The records do not define every participant's task or every program shift."],
    antiClaims: ["Jamie alone ran TiredOfTires", "Jamie personally collected every tire", "The project metrics are independently audited", "One participant post establishes the complete program history"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  }
] satisfies KnowledgeBank["claims"];

export const urbanhermitXCorpusResearchInquiries = [{
  id: "INQ-URBANHERM-X-FULL-POPULATION-2026",
  project,
  question: "Can the complete live-profile population of @urbanhermit be reconciled, safely represented, and converted into defensible mission-relevant claims without treating social activity as impact?",
  methods: ["Traversed authenticated Posts and Replies through the October 2008 beginning and repeated no-growth passes.", "Deduplicated primary records and excluded two other-account conversation-parent cards.", "Separated Jamie-authored originals and replies from native repost source text.", "Inventoried links, mission signals, dated visible counters, and year-bounded incoming records.", "Committed only an aggregate fixture and classifier manifest; raw personal history remains protected.", "Close-read selected independent sources before creating claim records."],
  runAt: reviewedAt,
  resultStatus: "partially-recovered",
  findings: ["All 434 live profile-counted records materialized and were reviewed: 340 originals, 13 replies, and 81 native reposts.", "The population contains 349 external-link occurrences representing 321 distinct short URLs.", "A bounded incoming search recovered 15 mission-relevant third-party records from nine accounts.", "NPR directly credits Jamie and M.C. Schmidt for the Horse Lords 'Truthers' video.", "KCUR documents Jamie's 2006 8th Street Tunnel program.", "A participant account and KC Town Hall post corroborate Jamie's direct tire-pickup participation.", "A Brooklyn Eagle article preserves coalition and Council chronology around the proposed Office of Nightlife without naming Jamie."],
  limitations: ["The live-profile reconciliation cannot establish that no older record was deleted or absent before capture.", "The incoming search excludes likes, private activity, deleted or unindexed records, and responses omitting the handle.", "Most of the 321 distinct short URLs are inventoried but not yet resolved and close-read.", "Visible interactions are volatile context, not reach, endorsement, conversion, attendance, or impact.", "Raw post text remains protected because the historical corpus includes personal material."],
  sourceIds: Object.values(urbanhermitSourceIds),
  publicSummary: "The live @urbanhermit population is fully reconciled through a public-safe aggregate census. Three bounded accomplishment families crossed the source threshold; owner-archive reconciliation, remaining posted sources, media rights, and finer role detail remain active research.",
  protectedLocatorId: "LOC-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15"
}] satisfies KnowledgeBank["researchInquiries"];
