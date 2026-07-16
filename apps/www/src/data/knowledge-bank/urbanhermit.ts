import type { KnowledgeBank } from "./schema.ts";

const projectId = "urbanhermit-public-record";

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
  tiresJimmy: "SRC-JIMMY-FITZNER-X-TIRES-2022-04-01"
} as const;

export const urbanhermitClaimIds = {
  publicRecord: "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
  horseLords: "CLM-URBANHERM-HORSE-LORDS-VIDEO",
  tunnel: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
  tires: "CLM-URBANHERM-KC-TOWN-HALL-TIRE-PICKUP-PARTICIPATION"
} as const;

export const urbanhermitSources = [
  {
    id: urbanhermitSourceIds.profile,
    title: "Jamie Burkart X profile",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/urbanhermit",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart (@urbanhermit), authenticated X profile reviewed July 15, 2026.",
    publicNote: "The authenticated profile showed 434 posts, a record beginning in October 2008, and a public association with Sunday Dinner, WOW List, and NYC Artist Coalition.",
    supportsGenerally: ["the @urbanhermit account identity", "434-post profile count at access time", "October 2008 account chronology", "public association with three named projects"],
    doesNotEstablish: ["a complete owner archive", "that no historical record was deleted or withheld", "professional relevance of every post", "lifetime reach from current follower counts"]
  },
  {
    id: urbanhermitSourceIds.census,
    title: "@urbanhermit full live-profile population inventory",
    author: "Codex archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    preferredPublicUrl: "asset",
    publicCitation: "Public-safe metadata inventory of all 434 records counted by the live @urbanhermit profile on July 15, 2026.",
    publicNote: "The aggregate fixture preserves population arithmetic, relationship, year, link, mission-signal, stakeholder-group, and dated account-authored interaction totals while excluding raw post text and non-evidence item identifiers.",
    supportsGenerally: ["434-of-434 live profile-counted record review", "421 Posts records", "434 primary Replies records", "two excluded conversation-parent cards", "340 originals", "13 replies", "81 native reposts", "349 external-link occurrences", "321 distinct short URLs", "15 bounded mission-relevant incoming records from nine accounts"],
    doesNotEstablish: ["that no older record was deleted or absent before capture", "a complete historical engagement graph", "Jamie's authorship of external-source native reposts", "the truth of every linked source", "professional priority from thematic frequency", "reach, endorsement, conversion, attendance, or impact"]
  },
  {
    id: urbanhermitSourceIds.protectedResearch,
    title: "Authenticated @urbanhermit archival-production research run",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Authenticated archival-production run over @urbanhermit Posts, Replies, and year-bounded incoming mentions, July 15, 2026.",
    publicNote: "The protected capture supports audit and future reclassification without publishing raw historical post text, personal material, or authenticated-session data.",
    protectedLocatorId: "LOC-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15",
    supportsGenerally: ["authenticated traversal method", "repeated no-growth stopping rule", "source-body close reading", "classification-input provenance", "bounded yearly incoming-search method"],
    doesNotEstablish: ["a complete owner archive", "deleted or unindexed records", "private engagement", "permission to publish raw historical post text"]
  },
  {
    id: urbanhermitSourceIds.horseLordsJamie,
    title: "Jamie Burkart post linking the Horse Lords 'Truthers' video",
    author: "Jamie Burkart",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, public post about the Horse Lords 'Truthers' video, April 29, 2016.",
    publicNote: "Jamie's contemporaneous statement names M.C. Schmidt by handle as his collaborator and links the NPR publication.",
    supportsGenerally: ["Jamie's contemporaneous co-creation statement", "Horse Lords project identity", "NPR publication link"],
    doesNotEstablish: ["the collaborators' precise division of labor", "sole direction or production by Jamie", "audience reach or reception"]
  },
  {
    id: urbanhermitSourceIds.horseLordsDrew,
    title: "Drew Daniel post crediting the Horse Lords video collaboration",
    author: "Drew Daniel",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/DDDrewDaniel/status/726096416070836224",
    preferredPublicUrl: "canonical",
    publicCitation: "Drew Daniel, public post crediting M.C. Schmidt and Jamie Burkart's Horse Lords video, April 29, 2016.",
    publicNote: "The contemporaneous collaborator-network account independently aligns with the co-credit and NPR publication.",
    supportsGenerally: ["independent public co-creation attribution", "NPR publication"],
    doesNotEstablish: ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  },
  {
    id: urbanhermitSourceIds.horseLordsJulia,
    title: "Julia Fredenburg post crediting the Horse Lords video collaboration",
    author: "Julia Fredenburg",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/juliafredenburg/status/726238278433804288",
    preferredPublicUrl: "canonical",
    publicCitation: "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    publicNote: "The public response supplies a second contemporaneous collaborator-network co-credit.",
    supportsGenerally: ["a second public co-creation attribution", "the video's analog-media context"],
    doesNotEstablish: ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  },
  {
    id: urbanhermitSourceIds.horseLordsNpr,
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    author: "Lars Gotrich",
    organization: "NPR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    archiveUrl: "https://web.archive.org/web/20160502131405/http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "archive",
    publicCitation: "Lars Gotrich, 'Video: Horse Lords' Hypnotic \"Truthers\" Will Blast Your Noodle,' NPR, April 29, 2016.",
    publicNote: "NPR directly credits M.C. Schmidt and Jamie Burkart and attributes to Horse Lords member Andrew Bernstein an explanation of how the video's materials and structure mirror the music.",
    supportsGenerally: ["M.C. Schmidt and Jamie Burkart co-credit", "NPR publication", "the video's glitchy shapes and letters", "Andrew Bernstein's attributed account of the music-video relationship"],
    doesNotEstablish: ["the collaborators' precise division of labor", "sole authorship by Jamie", "commission terms", "rights clearance", "audience impact"]
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
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote: "The article identifies Jamie as an artist and filmmaker and documents the participatory screening he hosted inside the historic tunnel in 2006.",
    supportsGenerally: ["Jamie's 2006 downtown scavenger hunt and tunnel screening", "the three-film program combining artist, popular, and archival media", "Jamie's public-history and public-access rationale"],
    doesNotEstablish: ["formal ownership or control of the tunnel", "tunnel restoration or a permanent opening", "authorization terms for the 2006 event", "attendance", "measured educational impact"]
  },
  {
    id: urbanhermitSourceIds.tunnelJulia,
    title: "Julia Fredenburg post sharing Jamie's 8th Street Tunnel interview",
    author: "Julia Fredenburg",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-13",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    preferredPublicUrl: "canonical",
    publicCitation: "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
    publicNote: "The post connects Jamie to the KCUR public-history account without independently establishing every event detail.",
    supportsGenerally: ["public collaborator circulation of Jamie's historical interpretation", "the connection between Jamie and the KCUR article"],
    doesNotEstablish: ["the complete 2006 event details by itself", "formal tunnel access rights", "measured public impact"]
  },
  {
    id: urbanhermitSourceIds.tiresKcTownHall,
    title: "KC Town Hall June 2019 TiredOfTires operating update",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-06-02",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, public TiredOfTires operating update naming Jamie Burkart among participants, June 2, 2019.",
    publicNote: "The shared project account names Jamie among participants in a recurring curbside tire-disposal workflow; its exact tire and savings figures remain first-party quantities.",
    supportsGenerally: ["Jamie's named participation", "recurring free curbside tire-disposal workflow", "a future public intake date"],
    doesNotEstablish: ["Jamie's sole operation of the program", "independently audited tire or savings totals", "which participant performed each task"]
  },
  {
    id: urbanhermitSourceIds.tiresJimmy,
    title: "Jimmy Fitzner account of a tire-pickup shift with Jamie",
    author: "Jimmy Fitzner",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-04-01",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    preferredPublicUrl: "canonical",
    publicCitation: "Jimmy Fitzner, first-hand public account of riding with Jamie Burkart in a dump truck to pick up tires in Northeast Kansas City, April 1, 2022.",
    publicNote: "The participant account directly corroborates one neighborhood tire-pickup shift and includes public photographs that are not republished here.",
    supportsGenerally: ["Jamie's direct participation in a tire-pickup shift", "use of a dump truck", "Northeast Kansas City service area"],
    doesNotEstablish: ["Jamie's sole operation of the program", "a complete program period", "a complete participant roster", "independently audited tire or savings totals", "permission to republish the photographs"]
  }
] satisfies KnowledgeBank["sources"];

export const urbanhermitClaims = [
  {
    id: urbanhermitClaimIds.publicRecord,
    project: projectId,
    internalClaim: "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface for community platforms, civic participation, cultural-space advocacy, public history, creative technology, and neighborhood work. A July 15, 2026 authenticated review reconciled all 434 live profile-counted records and retained a bounded incoming-response inventory.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "Jamie's personal @urbanhermit account preserves a 2008-2023 cross-project public record. The knowledge bank reconciles all 434 records counted by the live profile on July 15, 2026 while keeping raw historical post text outside the public repository.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/urbanhermit.md"] }],
    evidence: [
      { sourceId: urbanhermitSourceIds.profile, relationship: "corroborating", supports: ["live profile identity", "434-post denominator", "October 2008 account chronology"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.census, relationship: "direct-support", supports: ["434-record reconciliation", "source-authorship separation", "posted-link inventory", "strict mission signals", "bounded incoming-response inventory"], locator: "Aggregate population reconciliation, publishing pattern, stakeholder inventory, and protected record-set digests.", confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.protectedResearch, relationship: "private-support", supports: ["authenticated traversal provenance", "source-body close reading", "classification provenance"], publicNote: "Protected raw capture; the public fixture preserves redacted evidence and digests.", confidence: "high", renderCitation: false }
    ],
    boundaries: ["The exact reconciliation covers the live profile-counted population on July 15, 2026, not records deleted or absent before capture.", "The corpus contains 353 Jamie-authored originals or replies and 81 external-source native reposts; source authorship remains explicit.", "Strict theme counts describe visible publishing patterns, not labor, priority, reach, endorsement, readership, conversion, or impact.", "The 15 mission-relevant incoming records from nine accounts are a bounded public-index sample, not a complete historical engagement archive.", "Raw post text and authenticated-session state remain outside the public repository."],
    antiClaims: ["Jamie authored all 434 source records", "The live profile is a complete owner archive", "Every linked source endorses Jamie", "Theme frequency measures professional importance", "Visible interactions measure reach or impact", "The incoming search recovered every historical response"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"]
  },
  {
    id: urbanhermitClaimIds.horseLords,
    project: projectId,
    internalClaim: "Jamie Burkart co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt. NPR published the video and directly credited both collaborators; Horse Lords member Andrew Bernstein described how its materials and structure mirrored the band's music.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "Co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt. NPR published the video and credited both collaborators.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/urbanhermit.md"] }],
    evidence: [
      { sourceId: urbanhermitSourceIds.horseLordsNpr, relationship: "direct-support", supports: ["co-credit", "NPR publication", "Andrew Bernstein's attributed artistic account"], locator: "Article introduction and Andrew Bernstein attribution.", confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsJamie, relationship: "corroborating", supports: ["Jamie's contemporaneous co-creation statement", "NPR destination"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsDrew, relationship: "corroborating", supports: ["independent contemporaneous co-credit"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.horseLordsJulia, relationship: "corroborating", supports: ["second contemporaneous collaborator-network co-credit"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Always credit M.C. Schmidt.", "The sources do not establish the precise production split.", "Do not embed or republish the video before rights and present-playability review.", "NPR publication does not establish commission terms, reach, or measurable impact."],
    antiClaims: ["Jamie solely created or directed the video", "Jamie performed every production role", "NPR commissioned the video", "The video is cleared for portfolio republication"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  },
  {
    id: urbanhermitClaimIds.tunnel,
    project: projectId,
    internalClaim: "In 2006, Jamie led participants through downtown Kansas City on a scavenger hunt and hosted a film screening inside the historic 8th Street Tunnel, combining artist, popular, and archival media to connect hidden infrastructure with public history and imagination.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "In 2006, led participants through downtown Kansas City on a scavenger hunt and hosted a three-part film screening inside the historic 8th Street Tunnel.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/urbanhermit.md"] }],
    evidence: [
      { sourceId: urbanhermitSourceIds.tunnelKcur, relationship: "direct-support", supports: ["2006 date", "Jamie's host and guide roles", "three-part media program", "public-history rationale"], locator: "Article event description and Jamie attribution.", confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.tunnelJulia, relationship: "corroborating", supports: ["public collaborator circulation of Jamie's tunnel-history interview"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Describe the event as a participatory screening and public-history program, not tunnel restoration, ownership, or a permanent public opening.", "The article does not establish authorization terms, attendance, or measured educational outcomes.", "Future public treatment should foreground present authorization and safety."],
    antiClaims: ["Jamie restored or reopened the tunnel", "Jamie controlled public access", "Attendance or educational impact was measured", "The access model should be repeated without current authorization and safety review"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  },
  {
    id: urbanhermitClaimIds.tires,
    project: projectId,
    internalClaim: "Jamie directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "Directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/urbanhermit.md"] }],
    evidence: [
      { sourceId: urbanhermitSourceIds.tiresJimmy, relationship: "direct-support", supports: ["Jamie's direct participation", "dump-truck pickup workflow", "Northeast Kansas City service area"], confidence: "high", renderCitation: true },
      { sourceId: urbanhermitSourceIds.tiresKcTownHall, relationship: "corroborating", supports: ["project-account naming of Jamie among participants", "recurring curbside tire-disposal workflow"], publicNote: "The project account's exact tire and savings figures remain first-party quantities.", confidence: "high", renderCitation: true }
    ],
    boundaries: ["This establishes direct participation, not sole program ownership or operation.", "Do not attach unaudited tire or savings totals to Jamie as personal outcomes.", "The records do not define every participant's task or every program shift."],
    antiClaims: ["Jamie alone ran TiredOfTires", "Jamie personally collected every tire reported by KC Town Hall", "The project's tire or savings totals are independently audited", "One participant post establishes the complete program history"],
    researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  }
] satisfies KnowledgeBank["claims"];

export const urbanhermitResearchInquiries = [
  {
    id: "INQ-URBANHERM-X-FULL-POPULATION-2026",
    project: projectId,
    question: "Can the complete live-profile population of @urbanhermit be reconciled, safely represented in a public repository, and converted into defensible mission-relevant claims without treating social activity as impact?",
    methods: ["Traversed authenticated Posts and Replies to the October 2008 beginning and through repeated no-growth passes.", "Deduplicated source-status identities and excluded two other-account conversation-parent cards from the profile population.", "Separated Jamie-authored originals and replies from external-source native reposts.", "Extracted links, mentions, hashtags, dated visible interactions, and strict mission signals while excluding quoted-card text.", "Searched @urbanhermit -from:urbanhermit in yearly windows from 2008 through 2026 and close-read all 26 rendered incoming records.", "Kept raw post text, non-evidence item identifiers, and authenticated-session state in a protected capture while committing an aggregate fixture and classifier manifest.", "Resolved and close-read high-value linked sources before promoting claims."],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: ["All 434 live profile-counted records materialized and were reviewed: 340 originals, 13 replies, and 81 external-source native reposts.", "Posts yielded 421 primary records; Replies yielded 434 primary records plus two excluded conversation-parent cards.", "Source bodies contained 349 external-link occurrences representing 321 distinct short URLs.", "The bounded incoming search recovered 26 records; 15 records from nine accounts were mission-relevant third-party responses.", "NPR directly credits Jamie and M.C. Schmidt for the Horse Lords 'Truthers' video.", "KCUR documents Jamie's 2006 scavenger-hunt and film-screening program inside the 8th Street Tunnel.", "A participant account and KC Town Hall operating update corroborate Jamie's direct participation in a neighborhood tire-pickup workflow."],
    limitations: ["The live-profile reconciliation cannot establish that no older record was deleted or absent before capture.", "The incoming search excludes likes, private activity, deleted or unindexed records, and responses that omit the handle.", "Most of the 321 distinct posted short URLs are inventoried but not yet resolved and close-read.", "Dated visible interaction counts are volatile interface context, not reach, endorsement, conversion, attendance, or impact.", "Raw post text remains protected because the historical corpus includes personal material inappropriate for a public repository."],
    sourceIds: Object.values(urbanhermitSourceIds),
    publicSummary: "The live @urbanhermit population is fully reconciled through a public-safe aggregate census with protected record-set digests. Three accomplishment families crossed the evidence threshold; owner-archive reconciliation, remaining posted sources, media rights, and finer role detail remain active research.",
    protectedLocatorId: "LOC-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15"
  }
] satisfies KnowledgeBank["researchInquiries"];

export const urbanhermitIntakeItems = [
  {
    id: "INTAKE-URBANHERM-X-FULL-POPULATION-2026-07-15",
    title: "@urbanhermit full-population archival production",
    project: projectId,
    kind: "source-link",
    summary: "An authenticated full-population review reconciled every one of the 434 records counted by Jamie's live personal X profile, preserved public-safe aggregate link and stakeholder inventories, and developed three source-backed accomplishment families without publishing raw historical post text or a personal item-level index.",
    status: "integrated",
    sourceIds: Object.values(urbanhermitSourceIds),
    relatedClaimIds: Object.values(urbanhermitClaimIds),
    relatedProofIds: [],
    candidateClaims: [],
    propositions: [
      {
        id: "PROP-URBANHERM-X-FULL-POPULATION-2026",
        text: "The authenticated review reconciled all 434 live profile-counted records: 340 Jamie-authored originals, 13 Jamie-authored replies, and 81 external-source native reposts.",
        status: "supported-with-boundary",
        sourceIds: [urbanhermitSourceIds.profile, urbanhermitSourceIds.census, urbanhermitSourceIds.protectedResearch],
        sourceSupport: ["live profile denominator", "protected 434-record set and digest", "source-authorship classification", "Posts and Replies reconciliation", "protected traversal provenance"],
        boundaries: ["This is complete for the live profile-counted population on July 15, 2026, not a claim that no record was previously deleted, withheld, or absent.", "Native repost source text is not Jamie-authored."],
        decisionUse: "Creates an exact denominator and preserves source authorship for future research without publishing raw personal history."
      },
      {
        id: "PROP-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE-2026",
        text: "A bounded year-by-year public-index search recovered 15 mission-relevant third-party records from nine accounts connecting Jamie to creative technology, media collaboration, civic design, coalition work, public history, neighborhood service, and creative-community documentation.",
        status: "supported-with-boundary",
        sourceIds: [urbanhermitSourceIds.census, urbanhermitSourceIds.protectedResearch],
        sourceSupport: ["26 incoming public records reviewed", "15 mission-relevant classifications", "nine distinct source accounts", "stakeholder-group labels", "status-level provenance"],
        boundaries: ["The search excludes likes, private activity, deleted or unindexed records, and references that omit the handle.", "The result is not an endorsement count, reach metric, or complete engagement archive."],
        decisionUse: "Preserves typed public response evidence without turning social interaction into a promotional impact score."
      },
      {
        id: "PROP-URBANHERM-HORSE-LORDS-VIDEO-2026",
        text: "Jamie Burkart co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt; NPR published the video and directly credited both collaborators.",
        status: "direct-support",
        sourceIds: [urbanhermitSourceIds.horseLordsNpr, urbanhermitSourceIds.horseLordsJamie, urbanhermitSourceIds.horseLordsDrew, urbanhermitSourceIds.horseLordsJulia],
        sourceSupport: ["NPR direct co-credit", "NPR publication", "Jamie's contemporaneous statement", "two contemporaneous collaborator-network co-credits"],
        boundaries: ["Always credit M.C. Schmidt.", "The sources do not establish the precise production split, commission terms, rights status, or audience impact."],
        decisionUse: "Adds a strong independent-source creative-technology accomplishment to the bank while preserving collaborator credit."
      },
      {
        id: "PROP-URBANHERM-EIGHTH-STREET-TUNNEL-2026",
        text: "In 2006, Jamie led participants through downtown Kansas City on a scavenger hunt and hosted a three-part film screening inside the historic 8th Street Tunnel.",
        status: "direct-support",
        sourceIds: [urbanhermitSourceIds.tunnelKcur, urbanhermitSourceIds.tunnelJulia],
        sourceSupport: ["KCUR event description", "Jamie's attributed host and guide roles", "three-part media program", "collaborator circulation of the public-history account"],
        boundaries: ["This was a participatory screening, not tunnel restoration, ownership, or a permanent public opening.", "Authorization terms, attendance, and measured impact are not established."],
        decisionUse: "Adds a concrete participatory public-history program to Jamie's reserve creative-practice record."
      },
      {
        id: "PROP-URBANHERM-KC-TOWN-HALL-TIRE-PARTICIPATION-2026",
        text: "Jamie directly participated in KC Town Hall's recurring TiredOfTires workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
        status: "direct-support",
        sourceIds: [urbanhermitSourceIds.tiresJimmy, urbanhermitSourceIds.tiresKcTownHall],
        sourceSupport: ["participant's first-hand public account", "project-account naming of Jamie", "dump-truck pickup mechanism", "recurring curbside tire-disposal workflow"],
        boundaries: ["Direct participation is not sole program ownership or operation.", "Do not attach unaudited first-party tire or savings totals to Jamie as personal outcomes."],
        decisionUse: "Makes Jamie's direct service-delivery participation visible without absorbing the shared program or its first-party quantities into a personal claim."
      }
    ],
    tensions: [],
    researchQuestions: ["Does Jamie's account-owner X archive contain records absent from the 434-record live profile population?", "Which of the 321 distinct posted short URLs resolve to mission-relevant sources that can support or correct professional claims?", "What dated collaborator evidence can define the Horse Lords production split more precisely?", "Which rights-cleared artifacts can document the Horse Lords and 8th Street Tunnel work?", "Which independent records can corroborate KC Town Hall's first-party tire and resident-savings quantities?"],
    boundaries: ["Keep raw post text, personal material, historical contact details, cookies, session state, direct messages, and local archive locations outside the public repository.", "Do not infer professional importance, labor, causality, endorsement, reach, or impact from frequency or interaction labels.", "Preserve the distinction between Jamie-authored records and external-source native reposts.", "Do not project this intake item directly to the website; use only separately governed claims after editorial and rights review.", "No /proofs, /urbanhermit, or other public route is created by this archival pass."],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival-production review"]
  }
] satisfies KnowledgeBank["intakeItems"];

export const urbanhermitReviewSummary = {
  profileReportedPostCount: 434,
  recoveredPopulationCount: 434,
  profileCountNotMaterialized: 0,
  postsTimelineUniqueCount: 421,
  repliesTimelineRenderedArticleCount: 436,
  conversationContextCount: 2,
  accountAuthoredRecordCount: 353,
  externalSourceNativeRepostRecordCount: 81,
  externalLinkOccurrences: 349,
  distinctExternalShortUrlCount: 321,
  incomingSearchRecordCount: 26,
  missionRelevantIncomingRecordCount: 15,
  missionRelevantIncomingAccountCount: 9
} as const;
