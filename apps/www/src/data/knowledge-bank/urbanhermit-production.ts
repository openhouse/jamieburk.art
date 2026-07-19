import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const projectId = "urbanhermit-public-record";
const archiveClaimId = "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE";
const horseLordsClaimId = "CLM-URBANHERM-HORSE-LORDS-VIDEO";
const tunnelClaimId = "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING";
const tireClaimId = "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION";

const fixtureSourceId = "SRC-URBANHERM-FULL-POPULATION-2026-07-15";
const researchSourceId = "SRC-URBANHERM-AUTHENTICATED-RESEARCH-2026-07-15";
const horseLordsPostSourceId = "SRC-URBANHERM-HORSE-LORDS-POST-2016-04-29";
const drewHorseLordsSourceId = "SRC-URBANHERM-DREW-HORSE-LORDS-2016-04-29";
const juliaHorseLordsSourceId = "SRC-URBANHERM-JULIA-HORSE-LORDS-2016-04-29";
const nprHorseLordsSourceId = "SRC-URBANHERM-NPR-HORSE-LORDS-2016-04-29";
const kcurTunnelSourceId = "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15";
const juliaTunnelSourceId = "SRC-URBANHERM-JULIA-EIGHTH-STREET-TUNNEL-2016-09-13";
const kcthTiresSourceId = "SRC-URBANHERM-KCTH-TIRES-2019-06-02";
const jimmyTiresSourceId = "SRC-URBANHERM-JIMMY-TIRES-2022-04-01";

export const urbanhermitCaptures = [
  {
    id: "CAP-URBANHERM-AUTHENTICATED-FULL-POPULATION-2026",
    receivedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Authenticated full-population archival-production pass on Jamie's personal @urbanhermit X account, followed by a public-safe metadata projection, source close reading, and bounded incoming-stakeholder review.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "personal public working surface",
      "cross-project documentation and source circulation",
      "creative-media collaboration",
      "participatory public-history programming",
      "neighborhood mutual-aid participation",
      "public stakeholder response",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      horseLordsPostSourceId,
      drewHorseLordsSourceId,
      juliaHorseLordsSourceId,
      nprHorseLordsSourceId,
      kcurTunnelSourceId,
      juliaTunnelSourceId,
      kcthTiresSourceId,
      jimmyTiresSourceId,
    ],
    observationIds: [
      "OBS-URBANHERM-FULL-POPULATION-RECONCILIATION",
      "OBS-URBANHERM-PUBLISHING-AND-LINK-PATTERN",
      "OBS-URBANHERM-BOUNDED-INCOMING-STAKEHOLDERS",
      "OBS-URBANHERM-AUTHENTICATED-RESEARCH-METHOD",
      "OBS-URBANHERM-HORSE-LORDS-SELF-ATTRIBUTION",
      "OBS-URBANHERM-HORSE-LORDS-NPR-CREDIT",
      "OBS-URBANHERM-HORSE-LORDS-COLLABORATOR-CORROBORATION",
      "OBS-URBANHERM-JULIA-HORSE-LORDS-CORROBORATION",
      "OBS-URBANHERM-KCUR-TUNNEL-SCREENING",
      "OBS-URBANHERM-JULIA-TUNNEL-CORROBORATION",
      "OBS-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      "OBS-URBANHERM-KCTH-TIRE-OPERATING-CORROBORATION",
    ],
    researchTaskIds: [
      "RT-URBANHERM-OWNER-ARCHIVE-RECONCILIATION",
      "RT-URBANHERM-POSTED-SOURCE-CLOSE-READ",
      "RT-URBANHERM-CREATIVE-ASSET-AND-ROLE-REVIEW",
    ],
    disposition:
      "Integrated a metadata-only 434-record fixture, three strong public-source claim families, one bounded neighborhood-participation claim, an incoming-response inventory, and open research for the owner archive, unresolved posted sources, assets, and collaborator role detail. Raw post text remains outside the public repository.",
  },
] satisfies CaptureRecord[];

export const urbanhermitSources = [
  {
    id: fixtureSourceId,
    title: "@urbanhermit full live-profile population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/9689fe6b7ed9db0cbe71f913ff312e87b526f464/apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe metadata inventory of all 434 @urbanhermit records counted by the live profile on July 15, 2026.",
    publicNote:
      "The immutable fixture preserves status identities, dates, source authorship, record types, tab provenance, links, classifications, and dated visible counts while excluding raw post text and authenticated-session state.",
    supportsGenerally: [
      "434 of 434 live profile-counted records reviewed",
      "421 Posts records and 434 primary Replies records",
      "two conversation-parent cards excluded from the profile population",
      "340 originals, 13 replies, and 81 native reposts",
      "349 source-body link occurrences representing 321 distinct short URLs",
      "15 mission-relevant bounded incoming records from nine accounts",
    ],
    doesNotEstablish: [
      "that no older post was deleted or absent before capture",
      "complete historical engagement, reach, readership, or impact",
      "Jamie's authorship of external-source native reposts",
      "the truth of every statement or linked destination in the corpus",
      "professional priority from thematic frequency",
    ],
  },
  {
    id: researchSourceId,
    title: "Authenticated @urbanhermit archival-production research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated July 15, 2026 archival-production run over @urbanhermit Posts, Replies, and year-bounded incoming mentions.",
    publicNote:
      "The protected capture permits audit and future reclassification without publishing raw post text, historical contact details, or authenticated-session data.",
    protectedLocatorId: "PTR-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15",
    supportsGenerally: [
      "traversal method and repeated no-growth stopping rule",
      "private source-body close reading",
      "classification-input provenance",
      "bounded yearly incoming-search method",
    ],
    doesNotEstablish: [
      "a complete owner archive",
      "deleted or unindexed records",
      "private or nonpublic engagement",
      "permission to publish raw historical post text",
    ],
  },
  {
    id: horseLordsPostSourceId,
    title: "Jamie Burkart post linking the Horse Lords 'Truthers' video on NPR",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart, public post linking the Horse Lords 'Truthers' video on NPR, April 29, 2016.",
    publicNote:
      "Jamie's contemporaneous first-hand statement names M.C. Schmidt by handle as his collaborator and links the NPR publication.",
    supportsGenerally: [
      "Jamie's contemporaneous co-creation claim",
      "the Horse Lords project and NPR publication link",
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "sole direction or production by Jamie",
      "audience reach or reception",
    ],
  },
  {
    id: drewHorseLordsSourceId,
    title: "Drew Daniel post crediting the Horse Lords video collaboration",
    author: "Drew Daniel",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/DDDrewDaniel/status/726096416070836224",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Drew Daniel, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    supportsGenerally: [
      "independent collaborator-network attribution",
      "publication of the video by NPR",
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "commission terms, rights, or audience reach",
    ],
  },
  {
    id: juliaHorseLordsSourceId,
    title: "Julia Fredenburg post crediting the Horse Lords video collaboration",
    author: "Julia Fredenburg",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/juliafredenburg/status/726238278433804288",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    supportsGenerally: [
      "a second public collaborator-network attribution",
      "the video's analog-media context",
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "commission terms, rights, or audience reach",
    ],
  },
  {
    id: nprHorseLordsSourceId,
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    archiveUrl:
      "https://web.archive.org/web/20160502131405/http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "archive",
    publicCitation:
      "Lars Gotrich, 'Video: Horse Lords' Hypnotic \"Truthers\" Will Blast Your Noodle,' NPR, April 29, 2016.",
    publicNote:
      "NPR directly credits M.C. Schmidt and Jamie Burkart and includes Horse Lords member Andrew Bernstein's description of how the video's materials and structure mirror the music.",
    supportsGenerally: [
      "M.C. Schmidt and Jamie Burkart as the video's co-creators",
      "NPR publication of the video",
      "the video's glitchy shapes, letters, repetition, variation, color, and text",
      "Andrew Bernstein's attributed account of the music-video relationship",
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "sole authorship by Jamie",
      "commission terms, rights clearance, or audience impact",
    ],
  },
  {
    id: kcurTunnelSourceId,
    title:
      "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    organization: "KCUR",
    author: "Cody Newill",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote:
      "The article identifies Jamie as an artist and filmmaker and documents the participatory screening he hosted inside the historic tunnel in 2006.",
    supportsGenerally: [
      "Jamie's 2006 downtown scavenger-hunt and tunnel-screening program",
      "the three-film program combining artist, popular, and archival media",
      "Jamie's public-history and public-access rationale",
    ],
    doesNotEstablish: [
      "formal ownership or control of the tunnel",
      "that Jamie restored or opened the tunnel",
      "authorization terms for the 2006 event",
      "attendance or measured educational impact",
    ],
  },
  {
    id: juliaTunnelSourceId,
    title: "Julia Fredenburg post sharing Jamie's 8th Street Tunnel interview",
    author: "Julia Fredenburg",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-13",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
    supportsGenerally: [
      "public collaborator sharing of Jamie's historical interpretation",
      "the connection between Jamie and the KCUR tunnel article",
    ],
    doesNotEstablish: [
      "the complete 2006 event details by itself",
      "formal tunnel access rights or measured public impact",
    ],
  },
  {
    id: kcthTiresSourceId,
    title: "KC Town Hall June 2019 TiredOfTires operating update",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-06-02",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Town Hall, June 2019 public TiredOfTires operating update naming Jamie Burkart among participants.",
    publicNote:
      "The first-party project account publicly names Jamie among participants in a recurring tire-disposal workflow. Its exact tire and savings figures require separate corroboration before use as audited outcomes.",
    supportsGenerally: [
      "Jamie's named participation in the TiredOfTires workflow",
      "recurring public intake and disposal coordination",
    ],
    doesNotEstablish: [
      "Jamie's sole operation of the program",
      "independently audited tire or savings totals",
      "which participant performed each task",
    ],
  },
  {
    id: jimmyTiresSourceId,
    title: "Jimmy Fitzner first-hand account of a tire-pickup shift with Jamie",
    author: "Jimmy Fitzner",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-04-01",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jimmy Fitzner, first-hand public account of driving a dump truck with Jamie Burkart to pick up tires in Northeast Kansas City, April 1, 2022.",
    supportsGenerally: [
      "Jamie's direct participation in a neighborhood tire-pickup shift",
      "use of a dump truck for the pickup workflow",
      "Northeast Kansas City as the service area described by the participant",
    ],
    doesNotEstablish: [
      "Jamie's sole operation of the program",
      "a complete program period or participant roster",
      "independently audited tire or savings totals",
    ],
  },
] satisfies SourceRecord[];

export const urbanhermitObservations = [
  {
    id: "OBS-URBANHERM-FULL-POPULATION-RECONCILIATION",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "The authenticated July 15, 2026 pass reconciled every one of the live profile's 434 counted records: Posts yielded 421 primary records, Replies yielded 434 primary records plus two excluded conversation-parent cards, and the union contained 340 originals, 13 replies, and 81 external-source native reposts.",
    observationType: "metadata",
    locator: "Population reconciliation and record-type counts.",
    confidence: "high",
    limitations: [
      "The exact reconciliation covers the live profile-counted population on the capture date, not records deleted or absent from the interface before capture.",
    ],
    supportsClaimIds: [archiveClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-PUBLISHING-AND-LINK-PATTERN",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "The 434-record inventory contains 353 account-authored originals or replies and 81 redistributed external-source records; its source bodies contain 349 external-link occurrences representing 321 distinct short URLs, with strict recurring signals spanning community platforms, civic participation, cultural-space advocacy, public history and place, creative technology, and neighborhood mutual aid.",
    observationType: "metadata",
    locator:
      "Publishing pattern, posted URL inventory, mission-signal manifest, and row-level classifications.",
    confidence: "high",
    limitations: [
      "Theme counts describe visible publishing patterns, not labor, professional priority, reach, endorsement, or impact; native repost text remains attributable to its source author.",
    ],
    supportsClaimIds: [archiveClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-BOUNDED-INCOMING-STAKEHOLDERS",
    sourceId: fixtureSourceId,
    project: projectId,
    statement:
      "A year-by-year authenticated search from 2008 through 2026 recovered 26 public incoming records; close reading classified 15 records from nine accounts as mission-relevant third-party responses across creative technology, media collaboration, civic design, coalition projects, public history, neighborhood work, and creative-community documentation.",
    observationType: "metadata",
    locator: "Stakeholder inventory and row-level incoming classifications.",
    confidence: "high",
    limitations: [
      "The search is a bounded public-index sample and excludes likes, deleted or unindexed records, private activity, and engagement that did not mention the handle.",
    ],
    supportsClaimIds: [archiveClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-AUTHENTICATED-RESEARCH-METHOD",
    sourceId: researchSourceId,
    project: projectId,
    statement:
      "The protected research run preserves the authenticated traversal, source-body close reading, repeated no-growth stopping rule, classification inputs, and year-bounded incoming-search provenance from which the public metadata fixture was derived.",
    observationType: "metadata",
    locator: "Protected capture manifest and research-run log.",
    confidence: "high",
    limitations: [
      "The protected source is not a public citation and does not authorize publication of raw historical post text or authenticated-session data.",
    ],
    supportsClaimIds: [archiveClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-HORSE-LORDS-SELF-ATTRIBUTION",
    sourceId: horseLordsPostSourceId,
    project: projectId,
    statement:
      "On April 29, 2016, Jamie publicly said that he and @lordmcess made a video for Horse Lords and linked its NPR publication.",
    observationType: "attributed",
    locator: "Post body and linked NPR destination.",
    confidence: "high",
    limitations: [
      "This is Jamie's own contemporaneous statement; it does not define the collaborators' individual tasks.",
    ],
    supportsClaimIds: [horseLordsClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-HORSE-LORDS-NPR-CREDIT",
    sourceId: nprHorseLordsSourceId,
    project: projectId,
    statement:
      "NPR directly credits the Horse Lords 'Truthers' video to M.C. Schmidt and Jamie Burkart, describes its rhythmic sequence of glitchy shapes and letters, and attributes to Horse Lords member Andrew Bernstein an explanation of how its simple materials, repetition, variation, color, and text mirror the music.",
    observationType: "explicit",
    locator: "Article introduction and Andrew Bernstein attribution.",
    confidence: "high",
    limitations: [
      "NPR establishes co-credit and an attributed artistic account, not the precise production split, rights status, or audience impact.",
    ],
    supportsClaimIds: [horseLordsClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-HORSE-LORDS-COLLABORATOR-CORROBORATION",
    sourceId: drewHorseLordsSourceId,
    project: projectId,
    statement:
      "Drew Daniel publicly said that M.C. Schmidt made the Horse Lords video with Jamie and that NPR published it; Julia Fredenburg separately credited the video to Jamie and @lordmcess.",
    observationType: "attributed",
    locator:
      "Drew Daniel status 726096416070836224; corroborating Julia Fredenburg source recorded separately.",
    confidence: "high",
    limitations: [
      "These public social statements corroborate collaboration but do not assign individual production responsibilities.",
    ],
    supportsClaimIds: [horseLordsClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-JULIA-HORSE-LORDS-CORROBORATION",
    sourceId: juliaHorseLordsSourceId,
    project: projectId,
    statement:
      "Julia Fredenburg separately credited the Horse Lords video to Jamie and @lordmcess and linked the NPR publication.",
    observationType: "attributed",
    locator: "Status body, collaborator handles, and NPR link.",
    confidence: "high",
    limitations: [
      "The public social statement corroborates co-creation but does not assign individual production responsibilities.",
    ],
    supportsClaimIds: [horseLordsClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-KCUR-TUNNEL-SCREENING",
    sourceId: kcurTunnelSourceId,
    project: projectId,
    statement:
      "KCUR reports that in 2006 Jamie led participants on a scavenger hunt through downtown Kansas City and hosted a film screening inside the historic 8th Street Tunnel, programming an artist call for shared space, a popular film, and an archival streetcar training film; the article also records his public-history and youth-imagination rationale for access.",
    observationType: "explicit",
    locator: "Article sections describing Jamie, the 2006 event, the program, and his access rationale.",
    confidence: "high",
    limitations: [
      "The article does not establish event authorization terms, attendance, measured impact, or that Jamie restored or controlled the tunnel.",
    ],
    supportsClaimIds: [tunnelClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-JULIA-TUNNEL-CORROBORATION",
    sourceId: juliaTunnelSourceId,
    project: projectId,
    statement:
      "Julia Fredenburg publicly shared Jamie's KCUR appearance as historical knowledge about Kansas City's 8th Street Tunnel.",
    observationType: "attributed",
    locator: "Status body and KCUR link.",
    confidence: "high",
    limitations: [
      "This response connects Jamie to the article but does not independently establish all 2006 program details.",
    ],
    supportsClaimIds: [tunnelClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
    sourceId: jimmyTiresSourceId,
    project: projectId,
    statement:
      "Jimmy Fitzner gave a first-hand public account of riding with Jamie in a dump truck to pick up tires around Northeast Kansas City; a KC Town Hall operating update separately names Jamie among participants in the recurring TiredOfTires workflow.",
    observationType: "attributed",
    locator:
      "Jimmy Fitzner status 1510067983456026629 and KC Town Hall status 1135246124883861504.",
    confidence: "high",
    limitations: [
      "The records establish direct participation, not sole program ownership, every shift, or independently audited tire and savings totals.",
    ],
    supportsClaimIds: [tireClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-URBANHERM-KCTH-TIRE-OPERATING-CORROBORATION",
    sourceId: kcthTiresSourceId,
    project: projectId,
    statement:
      "A June 2019 KC Town Hall operating update names Jamie among participants in a recurring free tire-disposal and curbside-pickup workflow.",
    observationType: "attributed",
    locator: "Status body, program link, participant thanks, and next pickup date.",
    confidence: "high",
    limitations: [
      "The first-party project post supports participation and workflow continuity, not sole ownership or independently audited tire and savings totals.",
    ],
    supportsClaimIds: [tireClaimId],
    reviewedAt: "2026-07-15",
  },
] satisfies ObservationRecord[];

export const urbanhermitClaims = [
  {
    id: archiveClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface: documenting community platforms and gatherings, civic participation, cultural-space advocacy, public history and place, creative technology, and neighborhood mutual aid while circulating a large linked source record. A July 15, 2026 authenticated review reconciled all 434 live profile-counted records and retained a bounded incoming-response inventory.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-URBANHERM-FULL-POPULATION-RECONCILIATION",
      "OBS-URBANHERM-PUBLISHING-AND-LINK-PATTERN",
      "OBS-URBANHERM-BOUNDED-INCOMING-STAKEHOLDERS",
      "OBS-URBANHERM-AUTHENTICATED-RESEARCH-METHOD",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie's personal @urbanhermit account preserves a 2008-2023 cross-project public record spanning community platforms, civic participation, cultural-space advocacy, public history, creative technology, and neighborhood work. The knowledge bank reconciles all 434 records counted by the live profile on July 15, 2026 while keeping raw historical post text outside the public repository.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/urbanhermit"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: [
          "full live-profile population reconciliation",
          "source-authorship and record-type separation",
          "posted-link inventory",
          "strict thematic signal inventory",
          "bounded incoming-stakeholder classifications",
        ],
        locator:
          "Population reconciliation, publishing pattern, stakeholder inventory, mission-signal manifest, and 434 metadata rows.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: researchSourceId,
        relationship: "private-support",
        supports: [
          "authenticated traversal provenance",
          "source-body close reading",
          "classification reproducibility without publishing raw text",
        ],
        publicNote:
          "Protected raw capture; the public fixture preserves only redacted evidence and hashes.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "All 434 live profile-counted records were reviewed; this does not prove that no record was deleted or absent before July 15, 2026.",
      "The corpus contains 353 Jamie-authored originals or replies and 81 external-source native reposts; source authorship remains explicit.",
      "Strict signal counts describe visible publishing patterns, not labor, professional priority, reach, endorsement, readership, conversion, or impact.",
      "The 15 mission-relevant incoming records from nine accounts are a bounded public-index sample, not complete historical engagement.",
      "Raw post text, historical contact details, and authenticated-session state remain outside the public repository.",
    ],
    antiClaims: [
      "Jamie authored all 434 source records",
      "The live profile is a complete owner archive of every post Jamie ever published",
      "Every linked source endorses Jamie or a project",
      "Theme frequency measures professional importance or time spent",
      "Visible interaction counts measure unique people, reach, conversion, or impact",
      "The bounded incoming search recovered every historical response",
    ],
    researchTaskIds: [
      "RT-URBANHERM-OWNER-ARCHIVE-RECONCILIATION",
      "RT-URBANHERM-POSTED-SOURCE-CLOSE-READ",
    ],
    researchInquiryIds: ["INQ-URBANHERM-FULL-POPULATION-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival-production review"],
  },
  {
    id: horseLordsClaimId,
    project: projectId,
    claimType: "action",
    internalClaim:
      "Jamie Burkart co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt. NPR published the video and directly credited both collaborators; Horse Lords member Andrew Bernstein described how its simple materials, repetition, subtle variation, color, and text mirrored the band's music.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-URBANHERM-HORSE-LORDS-SELF-ATTRIBUTION",
      "OBS-URBANHERM-HORSE-LORDS-NPR-CREDIT",
      "OBS-URBANHERM-HORSE-LORDS-COLLABORATOR-CORROBORATION",
      "OBS-URBANHERM-JULIA-HORSE-LORDS-CORROBORATION",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Co-created the music video for Horse Lords' 'Truthers' with M.C. Schmidt. NPR published the video and credited both collaborators; Horse Lords member Andrew Bernstein described how its visual materials and rhythms mirrored the band's music.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/urbanhermit"],
      },
    ],
    evidence: [
      {
        sourceId: nprHorseLordsSourceId,
        relationship: "direct-support",
        supports: [
          "co-credit to M.C. Schmidt and Jamie Burkart",
          "NPR publication",
          "the attributed explanation from Horse Lords member Andrew Bernstein",
        ],
        locator: "Article introduction and Andrew Bernstein attribution.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: horseLordsPostSourceId,
        relationship: "corroborating",
        supports: [
          "Jamie's contemporaneous first-hand co-creation statement",
          "the NPR destination",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: drewHorseLordsSourceId,
        relationship: "corroborating",
        supports: [
          "independent public co-creation attribution",
          "NPR publication",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: juliaHorseLordsSourceId,
        relationship: "corroborating",
        supports: ["a second public collaborator-network co-credit"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Always credit M.C. Schmidt alongside Jamie.",
      "The sources establish co-creation but not the precise division of direction, shooting, editing, analog processing, or other production tasks.",
      "Do not embed or republish the video until asset rights and present playability are reviewed.",
      "NPR publication does not establish audience reach, acclaim, or measurable impact.",
    ],
    antiClaims: [
      "Jamie solely created or directed the Horse Lords video",
      "Jamie performed every production role",
      "NPR commissioned the video",
      "The video is cleared for portfolio republication",
    ],
    researchTaskIds: ["RT-URBANHERM-CREATIVE-ASSET-AND-ROLE-REVIEW"],
    researchInquiryIds: ["INQ-URBANHERM-FULL-POPULATION-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and authenticated archive review"],
  },
  {
    id: tunnelClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "In 2006, Jamie led participants through downtown Kansas City on a scavenger hunt and hosted a film screening inside the historic 8th Street Tunnel, combining artist, popular, and archival media to reconnect hidden infrastructure with public history and imagination.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-URBANHERM-KCUR-TUNNEL-SCREENING",
      "OBS-URBANHERM-JULIA-TUNNEL-CORROBORATION",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "In 2006, led participants through downtown Kansas City on a scavenger hunt and hosted a film screening inside the historic 8th Street Tunnel, combining artist, popular, and archival media to connect hidden infrastructure with public history and imagination.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/urbanhermit"],
      },
    ],
    evidence: [
      {
        sourceId: kcurTunnelSourceId,
        relationship: "direct-support",
        supports: [
          "the 2006 date and event form",
          "Jamie's role leading the scavenger hunt and hosting the screening",
          "the three-part media program",
          "Jamie's public-history and youth-imagination rationale",
        ],
        locator: "Article event description and Jamie attribution.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: juliaTunnelSourceId,
        relationship: "corroborating",
        supports: [
          "public collaborator circulation of Jamie's tunnel-history interview",
        ],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe the event as a participatory screening and public-history program, not tunnel restoration, ownership, or a permanent public opening.",
      "The article does not establish authorization terms, attendance, or measured educational outcomes.",
      "Avoid romanticizing unsafe or unauthorized access; any future public treatment should foreground present-day access and safety context.",
    ],
    antiClaims: [
      "Jamie restored or reopened the 8th Street Tunnel",
      "Jamie controlled public access to the tunnel",
      "The event's attendance or educational impact was measured",
      "The 2006 access model should be repeated without present authorization and safety review",
    ],
    researchTaskIds: ["RT-URBANHERM-CREATIVE-ASSET-AND-ROLE-REVIEW"],
    researchInquiryIds: ["INQ-URBANHERM-FULL-POPULATION-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and authenticated archive review"],
  },
  {
    id: tireClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including riding in a dump truck to pick up tires around Northeast Kansas City. A participant's first-hand public account and a project-account operating update corroborate his involvement.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      "OBS-URBANHERM-KCTH-TIRE-OPERATING-CORROBORATION",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Directly participated in KC Town Hall's recurring TiredOfTires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/urbanhermit"],
      },
    ],
    evidence: [
      {
        sourceId: jimmyTiresSourceId,
        relationship: "direct-support",
        supports: [
          "Jamie's direct participation in a tire-pickup shift",
          "the dump-truck workflow",
          "Northeast Kansas City as the described service area",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcthTiresSourceId,
        relationship: "corroborating",
        supports: [
          "project-account naming of Jamie among participants",
          "a recurring free tire-disposal workflow",
        ],
        publicNote:
          "The project account's exact tire and resident-savings figures remain first-party and are not promoted as audited outcomes.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This establishes direct participation, not sole program ownership or operation.",
      "Do not attach independently unaudited tire or savings totals to Jamie as personal outcomes.",
      "The records do not define every participant's task or every program shift.",
    ],
    antiClaims: [
      "Jamie alone ran TiredOfTires",
      "Jamie personally collected every tire reported by KC Town Hall",
      "The project's published tire or savings totals are independently audited",
      "A single participant post establishes the complete program history",
    ],
    researchTaskIds: ["RT-SOCIAL-KCTH-TIRE-OUTCOME-CORROBORATION"],
    researchInquiryIds: ["INQ-URBANHERM-FULL-POPULATION-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and authenticated archive review"],
  },
] satisfies ClaimRecord[];

export const urbanhermitResearchTasks = [
  {
    id: "RT-URBANHERM-OWNER-ARCHIVE-RECONCILIATION",
    project: projectId,
    question:
      "Does Jamie's account-owner X archive contain deleted, withheld, or otherwise absent records beyond the 434-record live-profile population captured on July 15, 2026?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-URBANHERM-AUTHENTICATED-FULL-POPULATION-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [archiveClaimId],
    successCriteria: [
      "Acquire the account-owner archive through Jamie's authenticated export workflow.",
      "Normalize owner-archive records by status identity and reconcile them against the 434-row public fixture.",
      "Preserve deleted or nonpublic discoveries as protected pointers unless each item passes public-safety review.",
      "Update the denominator language without erasing the completed live-profile reconciliation.",
    ],
    nextActions: [
      "Request and download Jamie's X data archive when available.",
      "Run a protected owner-archive diff by status ID and date.",
      "Triage newly surfaced records through the standard source, observation, claim, and promotion lifecycle.",
    ],
    publicNote:
      "The live profile population is complete as captured. The owner archive is a separate historical-completeness question.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt: "2026-07-15",
  },
  {
    id: "RT-URBANHERM-POSTED-SOURCE-CLOSE-READ",
    project: projectId,
    question:
      "Which of the 321 distinct posted short URLs resolve to mission-relevant sources that can support new or existing professional claims?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-URBANHERM-AUTHENTICATED-FULL-POPULATION-2026"],
    sourceIds: [
      fixtureSourceId,
      nprHorseLordsSourceId,
      kcurTunnelSourceId,
    ],
    claimIds: [archiveClaimId, horseLordsClaimId, tunnelClaimId],
    successCriteria: [
      "Resolve every short URL or record a bounded non-recovery outcome.",
      "Distinguish articles about Jamie's work from sources Jamie merely circulated.",
      "Close-read recovered mission-relevant pages into atomic observations and source boundaries.",
      "Promote only claims that improve the portfolio's current argument under Chad's lens.",
    ],
    nextActions: [
      "Prioritize account-authored records with direct project attribution or unique historical sources.",
      "Use Wayback recovery for dead or redirected destinations.",
      "Associate duplicate destinations with one normalized source identity.",
      "Keep unresolved and unread links out of claim evidence.",
    ],
    publicNote:
      "NPR and KCUR sources crossed the promotion threshold in this pass. The remaining posted-source population is inventoried, not presumed read or evidentiary.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt: "2026-07-15",
  },
  {
    id: "RT-URBANHERM-CREATIVE-ASSET-AND-ROLE-REVIEW",
    project: projectId,
    question:
      "What rights-cleared media and collaborator evidence can deepen the Horse Lords and 8th Street Tunnel records without overstating Jamie's individual role?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-URBANHERM-AUTHENTICATED-FULL-POPULATION-2026"],
    sourceIds: [
      horseLordsPostSourceId,
      drewHorseLordsSourceId,
      juliaHorseLordsSourceId,
      nprHorseLordsSourceId,
      kcurTunnelSourceId,
      juliaTunnelSourceId,
    ],
    claimIds: [horseLordsClaimId, tunnelClaimId],
    successCriteria: [
      "Confirm the Horse Lords collaborators' production roles through dated records or collaborator review.",
      "Document video ownership, embedding permission, and present playability.",
      "Recover public-safe 8th Street Tunnel event photographs, invitations, or program artifacts with rights metadata.",
      "Record authorization and safety context before any public visual treatment of tunnel access.",
    ],
    nextActions: [
      "Invite M.C. Schmidt and relevant collaborators to correct the role account.",
      "Review the video host and project files for rights and production metadata.",
      "Search Jamie's photo archive and project files for the 2006 program.",
      "Prepare a photo-editor brief only after rights and safety boundaries are explicit.",
    ],
    publicNote:
      "The claims are source-backed. Role granularity, media rights, and reusable visual documentation remain open.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt: "2026-07-15",
  },
] satisfies ResearchTask[];

export const urbanhermitInquiries = [
  {
    id: "INQ-URBANHERM-FULL-POPULATION-2026-07-15",
    project: projectId,
    question:
      "Can the complete live-profile population of @urbanhermit be reconciled, safely represented in a public repository, and converted into defensible mission-relevant claims without treating social activity as impact?",
    methods: [
      "Use Jamie's authenticated browser session to traverse Posts and Replies to the 2008 beginning and through repeated no-growth passes.",
      "Deduplicate source-status identities and classify two non-profile conversation-parent cards separately.",
      "Separate Jamie-authored originals and replies from external-source native reposts.",
      "Extract source-body links, mentions, hashtags, dated visible interactions, and strict mission signals while excluding quoted-card text.",
      "Search @urbanhermit -from:urbanhermit in bounded yearly windows from 2008 through 2026 and close-read every rendered incoming record.",
      "Keep raw post text and authenticated-session state in a protected capture while committing a metadata-only fixture and immutable classifier manifest.",
      "Resolve and close-read high-value linked sources, then build atomic observations and bounded claims.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "All 434 live profile-counted records materialized and were reviewed: 340 originals, 13 replies, and 81 external-source native reposts.",
      "Posts yielded 421 primary records; Replies yielded 434 primary records plus two excluded conversation-parent cards.",
      "Source bodies contained 349 external-link occurrences representing 321 distinct short URLs.",
      "A bounded yearly incoming search recovered 26 records; 15 records from nine accounts were mission-relevant third-party responses.",
      "NPR directly credits Jamie and M.C. Schmidt for the Horse Lords 'Truthers' video and publishes an attributed artistic account from the band.",
      "KCUR documents Jamie's 2006 scavenger-hunt and film-screening program inside Kansas City's historic 8th Street Tunnel.",
      "A participant and the KC Town Hall account separately corroborate Jamie's direct participation in a neighborhood tire-pickup workflow.",
    ],
    limitations: [
      "The live profile reconciliation cannot establish that no older records were deleted or absent before capture.",
      "The public-index incoming search excludes likes, private activity, deleted or unindexed posts, and responses that omit the handle.",
      "The remaining distinct posted URLs are inventoried but have not all been resolved or close-read.",
      "Dated visible interaction counts are volatile interface context, not reach, endorsement, conversion, attendance, or impact.",
      "Raw post text remains protected because the historical corpus includes personal material and contact details inappropriate for a public repository.",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      horseLordsPostSourceId,
      drewHorseLordsSourceId,
      juliaHorseLordsSourceId,
      nprHorseLordsSourceId,
      kcurTunnelSourceId,
      juliaTunnelSourceId,
      kcthTiresSourceId,
      jimmyTiresSourceId,
    ],
    publicSummary:
      "The live @urbanhermit population is fully reconciled and publicly represented through a redacted 434-row metadata fixture. Three claim families crossed the evidence threshold; the owner archive, remaining posted sources, media rights, and role granularity remain active research.",
    protectedLocatorId: "PTR-URBANHERM-AUTHENTICATED-CAPTURE-2026-07-15",
  },
] satisfies ResearchInquiry[];

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
  missionRelevantIncomingAccountCount: 9,
} as const;
