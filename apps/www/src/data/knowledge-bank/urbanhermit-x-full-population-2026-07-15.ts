import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const populationSourceId = "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15";
const protectedCaptureSourceId = "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15";

function socialPost(
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord {
  return {
    id,
    title,
    author,
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt,
    accessedAt: reviewedAt,
    canonicalUrl,
    preferredPublicUrl: "canonical",
    publicCitation,
    publicNote,
    supportsGenerally,
    doesNotEstablish
  };
}

export const urbanhermitFullPopulationSourceRecords20260715 = [
  {
    id: populationSourceId,
    title: "Urbanhermit X live-profile population ledger",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt:
      "Three authenticated complete profile passes and year-bounded incoming searches completed July 15, 2026",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/urbanhermit/with_replies",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Population-accounted review of the public @urbanhermit account, July 15, 2026.",
    publicNote:
      "The live profile reported 434 posts. Three independent authenticated passes recovered the same 434-status population. The repository retains only aggregates, digests, and selected mission-relevant source leads; the item-level capture remains protected.",
    captureFingerprint:
      "sha256:822075dc249693da986a217b23591a55ed813058616ce9c9d206f16209a9ed4d",
    supportsGenerally: [
      "434 of 434 live profile-counted records reviewed",
      "353 account-authored records and 81 external-source native reposts",
      "321 distinct posted short URLs across 277 records",
      "six overlapping mission-signal families",
      "15 mission-relevant third-party records from nine accounts plus two conversation contexts"
    ],
    doesNotEstablish: [
      "that no older post was deleted or absent before capture",
      "a complete account-owner archive",
      "Jamie's authorship of external-source reposts",
      "the truth of every historical statement or linked destination",
      "reach, endorsement, conversion, participation, or impact"
    ]
  },
  {
    id: protectedCaptureSourceId,
    title: "Authenticated Urbanhermit archival-production capture",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt:
      "Authenticated profile, conversation-context, posted-source, and year-bounded incoming-search review completed July 15, 2026",
    publicCitation:
      "Protected authenticated capture supporting the July 15, 2026 @urbanhermit archival-production run.",
    publicNote:
      "The protected capture permits future audit and reclassification without publishing raw historical post text, ordinary-life context, other people's unnecessary traces, private analytics, or authenticated-session data.",
    captureFingerprint:
      "sha256:822075dc249693da986a217b23591a55ed813058616ce9c9d206f16209a9ed4d",
    supportsGenerally: [
      "three-pass population reconciliation",
      "source-post close reading",
      "classification provenance",
      "year-bounded incoming-search method"
    ],
    doesNotEstablish: [
      "a complete account-owner archive",
      "deleted or unindexed records",
      "private or nonpublic engagement",
      "permission to publish raw historical post text"
    ]
  },
  socialPost(
    "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
    "Jamie links the Horse Lords Truthers video",
    "Jamie Burkart (@urbanhermit)",
    "2016-04-29",
    "https://x.com/urbanhermit/status/726144972802691073",
    "Jamie Burkart, public post naming M.C. Schmidt as his collaborator on the Horse Lords 'Truthers' video, April 29, 2016.",
    "Jamie's contemporaneous post names M.C. Schmidt and links the NPR publication.",
    ["Jamie's contemporaneous co-creation claim", "the Horse Lords project and NPR destination"],
    ["sole authorship", "the collaborators' precise division of labor", "commission terms", "audience reach"]
  ),
  socialPost(
    "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
    "Drew Daniel credits the Horse Lords video collaboration",
    "Drew Daniel (@DDDrewDaniel)",
    "2016-04-29",
    "https://x.com/DDDrewDaniel/status/726096416070836224",
    "Drew Daniel, public post crediting M.C. Schmidt and Jamie Burkart's Horse Lords video, April 29, 2016.",
    "A collaborator-network post independently names both video collaborators and the NPR destination.",
    ["independent public attribution to Jamie and M.C. Schmidt", "NPR publication of the video"],
    ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  ),
  socialPost(
    "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
    "Julia Fredenburg credits the Horse Lords video collaboration",
    "Julia Fredenburg (@juliafredenburg)",
    "2016-04-29",
    "https://x.com/juliafredenburg/status/726238278433804288",
    "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    "A second collaborator-network post names both collaborators and describes the work as analog video.",
    ["a second public attribution to both video collaborators", "the analog-media context"],
    ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  ),
  {
    id: "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR Music",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Music, April 29, 2016.",
    publicNote:
      "NPR directly credits M.C. Schmidt and Jamie Burkart with the video and quotes Horse Lords member Andrew Bernstein describing how their simple materials, repetition, variation, and color reflect the band's music.",
    supportsGenerally: [
      "shared video credit for M.C. Schmidt and Jamie Burkart",
      "the work's visual method as described by Andrew Bernstein",
      "NPR publication"
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "sole authorship",
      "commission terms",
      "rights clearance",
      "audience reach or impact"
    ]
  },
  socialPost(
    "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
    "Julia Fredenburg shares Jamie's 8th Street Tunnel interview",
    "Julia Fredenburg (@juliafredenburg)",
    "2016-09-13",
    "https://x.com/juliafredenburg/status/775795144553398272",
    "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
    "The collaborator post attributes the historical interpretation to Jamie and links the KCUR publication.",
    ["public collaborator attribution", "the connection between Jamie and the KCUR article"],
    ["complete 2006 event details", "formal access rights", "attendance", "measured public impact"]
  ),
  {
    id: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
    title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    organization: "KCUR",
    author: "Cody Newill",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote:
      "Independent reporting identifies Jamie and documents his 2006 participatory screening and public-history rationale while foregrounding present access and safety limits.",
    supportsGenerally: [
      "Jamie's 2006 downtown route and tunnel screening",
      "the three-part film program",
      "Jamie's attributed public-history and youth-imagination rationale"
    ],
    doesNotEstablish: [
      "tunnel restoration or ownership",
      "a permanent public opening",
      "event authorization terms",
      "attendance",
      "measured educational impact"
    ]
  },
  socialPost(
    "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
    "Aliza Aufrichtig recognizes Jamie and Julia's Cabaret Law work",
    "Aliza Aufrichtig (@alizauf)",
    "2017-10-30",
    "https://x.com/alizauf/status/925021115080232960",
    "Aliza Aufrichtig, public post recognizing Jamie Burkart and Julia Fredenburg's work on the Cabaret Law repeal effort, October 30, 2017.",
    "The peer attribution links contemporaneous repeal reporting and names Jamie and Julia together.",
    ["a public peer attribution of work on the repeal effort", "shared credit to Jamie and Julia"],
    ["a precise role", "legislative authorship", "sole or decisive causation", "the complete coalition roster"]
  ),
  socialPost(
    "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
    "NYC Artist Coalition attributes a cultural-space statement to Jamie",
    "NYC Artist Coalition (@NYCArtC)",
    "2017-10-26",
    "https://x.com/NYCArtC/status/923573066252382209",
    "NYC Artist Coalition, public post attributing a statement about cultural traditions and small diverse spaces to Jamie Burkart, October 26, 2017.",
    "The shared coalition account publicly attributes the statement to @urbanhermit and links Save NYC Spaces.",
    ["Jamie's visible public-speaking contribution", "Save NYC Spaces framing around small diverse cultural spaces"],
    ["sole authorship of coalition strategy", "the individual author of the account post", "policy causation", "audience reach"]
  ),
  socialPost(
    "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
    "NYC Artist Coalition attributes a Cabaret Law statement to Jamie",
    "NYC Artist Coalition (@NYCArtC)",
    "2017-11-01",
    "https://x.com/NYCArtC/status/925875113555357707",
    "NYC Artist Coalition, public post attributing a statement about Cabaret Law repeal, trust, and safety resources to Jamie Burkart, November 1, 2017.",
    "The shared coalition account publicly attributes the statement to @urbanhermit and links Let NYC Dance.",
    ["Jamie's visible public-speaking contribution", "the coalition's trust-and-safety framing for repeal"],
    ["legislative authorship", "sole coalition causation", "the individual author of the account post", "measured policy impact"]
  ),
  socialPost(
    "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
    "NYC Artist Coalition attributes a Save NYC Spaces town-hall statement to Jamie",
    "NYC Artist Coalition (@NYCArtC)",
    "2017-11-26",
    "https://x.com/NYCArtC/status/934923724683431936",
    "NYC Artist Coalition, public post attributing to Jamie Burkart a statement at a Save NYC Spaces and Night Mayor town hall, November 26, 2017.",
    "The direct-status recovery supplies a coalition-account attribution from a public town-hall context.",
    ["Jamie's public-speaking contribution", "Save NYC Spaces town-hall context"],
    ["sole event production", "individual authorship of the shared-account post", "policy causation", "audience reach"]
  ),
  {
    id: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
    title: "NYC's Office of Nightlife expected to be here by 2018",
    organization: "Brooklyn Daily Eagle",
    author: "Scott Enman",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-08-04",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Scott Enman, 'NYC's Office of Nightlife expected to be here by 2018,' Brooklyn Daily Eagle, August 4, 2017.",
    publicNote:
      "The article directly quotes NYC Artist Coalition and documents the Council committee and public-feedback sequence around the proposed Office of Nightlife.",
    supportsGenerally: [
      "direct NYC Artist Coalition quotation",
      "the reported Council committee and public-feedback sequence",
      "the proposed office's outreach, liaison, and public-hearing functions"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship or role",
      "sole coalition causation",
      "final legal status",
      "implementation quality or measured policy impact"
    ]
  },
  socialPost(
    "SRC-URBANHERM-X-KCTH-TIRES-2019",
    "KC Town Hall names Jamie in a Tired of Tires operating update",
    "KC Town Hall (@KCTownHall)",
    "2019-06-02",
    "https://x.com/KCTownHall/status/1135246124883861504",
    "KC Town Hall, public Tired of Tires operating update naming Jamie Burkart among participants, June 2, 2019.",
    "The project account names Jamie among several participants in a recurring pickup and free-disposal workflow. Its tire and savings figures remain first-party project claims.",
    ["Jamie's named participation", "recurring public intake and disposal coordination"],
    ["Jamie's sole operation or design of the program", "every participant's task", "independently audited outcomes"]
  ),
  socialPost(
    "SRC-URBANHERM-X-JIMMY-TIRES-2022",
    "Jimmy Fitzner describes a tire-pickup shift with Jamie",
    "Jimmy Fitzner (@JimmyFitzner)",
    "2022-04-01",
    "https://x.com/JimmyFitzner/status/1510067983456026629",
    "Jimmy Fitzner, public first-person post describing a tire-pickup shift with Jamie Burkart in Northeast Kansas City, April 1, 2022.",
    "The participant account describes using a dump truck with Jamie to pick up tires around Northeast Kansas City.",
    ["a shared tire-pickup shift", "Jamie as a direct participant", "Northeast Kansas City geography"],
    ["sole program design or operation", "every pickup shift", "the complete service geography", "audited outcome totals"]
  ),
  socialPost(
    "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023",
    "Dawnia Darkstone thanks Jamie for artist introductions",
    "Dawnia Darkstone (@letsglitchit)",
    "2023-04-17",
    "https://x.com/letsglitchit/status/1648007189049516032",
    "Dawnia Darkstone, public post thanking Jamie Burkart for artist introductions, April 17, 2023.",
    "The public peer attribution recognizes Jamie's relational contribution across a creative-technology community.",
    ["public thanks for artist introductions", "a cross-community relational contribution"],
    ["a formal convening title", "the complete context", "downstream outcomes", "sole credit for the relationships"]
  )
] satisfies SourceRecord[];

export const urbanhermitFullPopulationClaimRecords20260715 = [
  {
    id: "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
    project: "urbanhermit-public-record",
    internalClaim:
      "The complete capture-date @urbanhermit population preserves records Jamie authored or redistributed from 2008 through 2023 concerning community platforms, civic participation, cultural-space advocacy, public history and waterways, creative media, and neighborhood mutual aid.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "A complete review of the live @urbanhermit profile population preserves a cross-project public record of material Jamie authored or redistributed from 2008 through 2023.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: populationSourceId,
      relationship: "direct-support",
      supports: ["434-record population reconciliation", "date range", "overlapping mission-signal counts"],
      locator: "population, sourceCirculation, and missionSignals aggregates",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The result is complete for the live profile-counted population on July 15, 2026, not all records ever created.",
      "Mission-signal categories overlap and are retrieval aids, not measures of labor, priority, agreement, audience, or impact.",
      "Jamie did not author the 81 external-source native reposts."
    ],
    antiClaims: [
      "The ledger is a complete account-owner export.",
      "Every record is professional work or authored by Jamie.",
      "Mission-signal counts measure accomplishment or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
    project: "urbanhermit-public-record",
    internalClaim:
      "A year-bounded public-index search recovered 15 mission-relevant third-party records from nine accounts and two mission-relevant conversation contexts connecting Jamie to creative technology, public history, NYC Artist Coalition work, and Kansas City neighborhood operations.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "A bounded public search recovered mission-relevant peer, collaborator, coalition, project-account, and neighborhood attributions across Jamie's work.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: populationSourceId,
      relationship: "direct-support",
      supports: ["incoming-search population", "mission-relevant count", "stakeholder-group inventory"],
      locator: "incomingStakeholderSearch aggregate",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The search excludes likes, direct messages, private activity, deleted or unindexed records, and engagement that omits the handle.",
      "Nine non-mission personal or network results retain no public identity, date, URL, or metrics.",
      "The result is not a complete engagement census or an endorsement count."
    ],
    antiClaims: [
      "All historical engagement was recovered.",
      "Fifteen records represent fifteen unique people or endorsements.",
      "The search proves reach or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT",
    project: "urbanhermit-public-record",
    internalClaim:
      "On July 15, 2026, 85 of 353 account-authored records displayed 175 likes, eight replies, and 60 reposts, totaling 243 volatile interaction units.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text: "Dated visible interaction observations are retained for audit, not accomplishment messaging.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: populationSourceId,
      relationship: "direct-support",
      supports: ["dated account-authored visible-counter aggregate"],
      locator: "heldVisibleInteractionObservation aggregate",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Interaction units are not unique people, reach, endorsement, conversion, attendance, or impact.",
      "Counters are mutable observations from one capture date.",
      "Counters displayed on external-source reposts are excluded."
    ],
    antiClaims: [
      "243 people engaged with Jamie's professional work.",
      "The counters measure project adoption or policy influence.",
      "The snapshot is current after July 15, 2026."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
    project: "horse-lords-truthers-video",
    internalClaim:
      "NPR and contemporaneous collaborator records credit M.C. Schmidt and Jamie Burkart as co-creators of the video for Horse Lords' 'Truthers.'",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Co-created the video for Horse Lords' 'Truthers' with M.C. Schmidt; the work was published by NPR Music.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
        relationship: "direct-support",
        supports: ["shared credit to M.C. Schmidt and Jamie Burkart", "NPR publication", "reported visual method"],
        locator: "article introduction and Andrew Bernstein attribution",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
        relationship: "corroborating",
        supports: ["independent public attribution to both collaborators"],
        locator: "X status 726096416070836224: visible credit to M.C. Schmidt and Jamie Burkart",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
        relationship: "corroborating",
        supports: ["a second attribution to both collaborators", "analog-media context"],
        locator: "X status 726238278433804288: visible collaborator credit and analog-video description",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Always credit M.C. Schmidt alongside Jamie.",
      "The sources do not establish the collaborators' precise division of labor, commission terms, rights clearance, reach, or impact.",
      "The mature claim remains knowledge-bank depth and is not selected for the current website."
    ],
    antiClaims: [
      "Jamie alone created the video.",
      "The sources establish the precise production split.",
      "NPR publication establishes audience reach or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
    project: "eighth-street-tunnel",
    internalClaim:
      "In 2006, Jamie led participants through downtown Kansas City and hosted a three-film program inside the historic 8th Street Tunnel, connecting hidden infrastructure with public history and civic imagination.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "In 2006, led participants through downtown Kansas City and hosted a three-film program inside the historic 8th Street Tunnel.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        relationship: "direct-support",
        supports: ["Jamie's leadership of the downtown route and screening", "the three-part film program", "Jamie's public-history rationale"],
        locator: "article paragraphs identifying Jamie and describing the 2006 program",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
        relationship: "corroborating",
        supports: ["public collaborator attribution connecting Jamie to the historical interpretation"],
        locator: "X status 775795144553398272: visible attribution and KCUR link",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe a participatory screening and public-history program, not tunnel restoration, ownership, control, or permanent opening.",
      "The sources do not establish authorization terms, attendance, or measured educational impact.",
      "Any future visual treatment requires rights, consent, present access, and safety review."
    ],
    antiClaims: [
      "Jamie restored or owned the 8th Street Tunnel.",
      "Jamie permanently opened the tunnel.",
      "Historical access authorizes present entry.",
      "The event had a documented attendance or impact total."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
    project: "nyc-artist-coalition",
    internalClaim:
      "NYC Artist Coalition's public account attributed to Jamie statements connecting small diverse cultural spaces to New York's cultural traditions and framing Cabaret Law repeal as a path toward trust and safety resources; a peer separately recognized Jamie and Julia Fredenburg's work on repeal.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Coalition records publicly attribute to Jamie cultural-space and trust-and-safety arguments used in Save NYC Spaces and Let NYC Dance advocacy.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
        relationship: "direct-support",
        supports: ["public attribution of Jamie's cultural-space statement"],
        locator: "X status 923573066252382209: visible @urbanhermit attribution and Save NYC Spaces link",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
        relationship: "direct-support",
        supports: ["public attribution of Jamie's trust-and-safety statement"],
        locator: "X status 925875113555357707: visible @urbanhermit attribution and Let NYC Dance link",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
        relationship: "corroborating",
        supports: ["public attribution of Jamie's Save NYC Spaces town-hall statement"],
        locator: "X status 934923724683431936: visible Jamie Burkart attribution in town-hall context",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
        relationship: "corroborating",
        supports: ["public peer recognition of Jamie and Julia Fredenburg's work on repeal"],
        locator: "X status 925021115080232960: visible shared attribution to Jamie Burkart and Julia Fredenburg",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
        relationship: "context",
        supports: ["contemporaneous coalition quotation", "Council committee and public-feedback sequence"],
        locator: "article passages quoting NYC Artist Coalition and describing the Council committee and public-feedback sequence",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is public-speaking and peer-attribution evidence within collective NYC Artist Coalition work.",
      "Credit remains shared with Julia Fredenburg, coalition collaborators, partner organizations, artists, venue workers, Councilmember Rafael Espinal, Council colleagues, DCLA leadership, and other participants.",
      "The sources do not establish legislative authorship, a complete role description, or sole or decisive policy causation.",
      "The Brooklyn Daily Eagle article quotes NYC Artist Coalition but does not name Jamie individually."
    ],
    antiClaims: [
      "Jamie alone repealed the Cabaret Law.",
      "Jamie authored the legislation.",
      "Jamie alone created the coalition's arguments or strategy.",
      "The peer post proves the precise causal weight of Jamie's work."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
    project: "kc-town-hall",
    internalClaim:
      "Jamie directly participated in KC Town Hall's recurring Tired of Tires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Directly participated in a recurring neighborhood tire-removal workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        relationship: "direct-support",
        supports: ["a first-person shared pickup shift", "dump-truck use", "Northeast Kansas City geography"],
        locator: "X status 1510067983456026629: first-person description of a dump-truck pickup shift with Jamie",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
        relationship: "corroborating",
        supports: ["Jamie's named participation in the recurring pickup and free-disposal workflow"],
        locator: "X status 1135246124883861504: project update naming @urbanhermit among participants",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records establish direct participation, not sole program ownership, design authorship, complete coordination, or every shift.",
      "Exact tire and savings totals remain first-party figures unless independently corroborated.",
      "The KC Town Hall post remains collectively authored without post-level attribution."
    ],
    antiClaims: [
      "Jamie alone created or operated Tired of Tires.",
      "Jamie performed every pickup.",
      "The records independently audit tire or savings totals."
    ],
    researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-CREATIVE-COMMUNITY-INTRODUCTIONS",
    project: "creative-technology-community",
    internalClaim:
      "A creative-technology peer publicly thanked Jamie for introductions to artists she had admired, supplying a bounded trace of his relational contribution across communities.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A creative-technology peer publicly thanked Jamie for artist introductions in New York.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023",
      relationship: "direct-support",
      supports: ["public thanks for artist introductions", "a relational contribution across a creative-technology community"],
      locator: "X status 1648007189049516032: visible public thanks to Jamie for artist introductions",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The post documents thanks for introductions, not a formal convening title or complete event context.",
      "It does not establish downstream outcomes or sole credit for the relationships.",
      "The claim remains knowledge-bank depth and is not selected for the current website."
    ],
    antiClaims: [
      "Jamie alone created the represented relationships.",
      "The introductions produced documented professional outcomes.",
      "The post establishes a formal convening role."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  }
] satisfies ClaimRecord[];

export const urbanhermitFullPopulationResearchInquiries20260715 = [
  {
    id: "INQ-URBANHERM-X-OWNER-ARCHIVE-2026",
    project: "urbanhermit-public-record",
    question:
      "Does Jamie's account-owner X Archive contain deleted, withheld, or otherwise non-live records absent from the 434-item capture-date profile population?",
    methods: [
      "Reconciled three independent authenticated live-profile passes to the 434-post profile counter.",
      "Recorded the live-population boundary and deferred all-ever reconciliation to the account-owner export."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All 434 records represented by the live profile counter were recovered and reviewed.",
      "The capture does not contain a deletion history or records withheld from the live profile before acquisition."
    ],
    limitations: [
      "No account-owner X Archive was inspected in this pass.",
      "The live interface cannot prove that no older record was deleted or withheld."
    ],
    sourceIds: [populationSourceId, protectedCaptureSourceId],
    publicSummary:
      "The capture is complete for the live profile counter; an account-owner export is still needed for all-ever reconciliation."
  },
  {
    id: "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026",
    project: "urbanhermit-public-record",
    question:
      "Which mission-relevant posted destinations and public attributions can mature into defensible professional claims?",
    methods: [
      "Applied auditable overlapping mission-signal rules to all 434 source-post bodies.",
      "Inventoried 321 distinct posted short URLs and prioritized records with independent role attribution.",
      "Close-read selected X records, NPR Music, KCUR, and Brooklyn Daily Eagle reporting.",
      "Separated individual role, collective outcome, source circulation, and volatile engagement propositions."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The existing Music Hackathon record identifies Jamie as a co-organizer and credits him with making WOW List as an event-sharing service.",
      "NPR and collaborator records support shared Horse Lords video credit with M.C. Schmidt.",
      "KCUR and a collaborator record support a bounded 8th Street Tunnel participatory public-history claim.",
      "Coalition and peer records attribute cultural-space, trust-and-safety, and Cabaret Law repeal work to Jamie while retaining collective credit.",
      "Project and participant records support Jamie's direct participation in Tired of Tires.",
      "A creative-technology peer publicly thanked Jamie for artist introductions."
    ],
    limitations: [
      "Most of the 321 distinct posted short URLs remain unprioritized or not close-read at article level.",
      "Posting or reposting is not automatically authorship, endorsement, partnership, participation, reach, or impact.",
      "Creative-media rights and contribution granularity require separate review.",
      "The new claims remain knowledge-bank depth until an audience-specific projection decision is made."
    ],
    sourceIds: urbanhermitFullPopulationSourceRecords20260715
      .filter((source) => source.id !== protectedCaptureSourceId)
      .map((source) => source.id),
    publicSummary:
      "The first maturation pass produced bounded role and program evidence while retaining most posted destinations as a named research queue."
  }
] satisfies ResearchInquiry[];

export const urbanhermitFullPopulationIntakeRecords20260715 = [
  {
    id: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated public-web review",
    kind: "research-lead",
    title: "Urbanhermit live-profile full-population archive",
    publicSafeSummary:
      "Authenticated review of every record represented by the live @urbanhermit profile counter, with the full item-level capture protected and a minimized public ledger.",
    whyItMatters:
      "Preserves a cross-project public record without publishing ordinary life or other people's unnecessary traces.",
    projectHints: ["urbanhermit-public-record"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [populationSourceId, protectedCaptureSourceId],
    claimIds: [
      "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
      "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
      "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT"
    ],
    inquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-2026"],
    limitations: [
      "Raw post text and the item-level capture stay outside the public repository.",
      "The 100 percent result applies to the live profile-counted population, not all-ever account history."
    ],
    nextActions: [
      "Reconcile the live-profile population against Jamie's account-owner X Archive if it becomes available.",
      "Keep all three aggregate projections held unless a future audience-specific composition needs them."
    ]
  },
  {
    id: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated public-web review",
    kind: "engagement-lead",
    title: "Urbanhermit mission-relevant sources and public attributions",
    publicSafeSummary:
      "Selected records concerning WOW List, the Horse Lords Truthers video, the 8th Street Tunnel program, NYC Artist Coalition advocacy, Tired of Tires participation, and creative-community introductions.",
    whyItMatters:
      "Turns diffuse historical traces into bounded source-backed role evidence without confusing circulation, authorship, collective work, and policy causation.",
    projectHints: [
      "urbanhermit-public-record",
      "wowlist",
      "horse-lords-truthers-video",
      "eighth-street-tunnel",
      "nyc-artist-coalition",
      "kc-town-hall",
      "creative-technology-community"
    ],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    sourceIds: [
      ...urbanhermitFullPopulationSourceRecords20260715
        .filter((source) => ![populationSourceId, protectedCaptureSourceId].includes(source.id))
        .map((source) => source.id)
    ],
    claimIds: [
      "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
      "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
      "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
      "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      "CLM-URBANHERM-CREATIVE-COMMUNITY-INTRODUCTIONS"
    ],
    inquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    limitations: [
      "Posted or reposted sources establish circulation, not endorsement or authorship.",
      "Collaborator, project-account, participant, and publication authorship remains attached to each source.",
      "No new website projection was selected in this pass."
    ],
    nextActions: [
      "Continue resolving the protected 321-URL queue by evidentiary value.",
      "Make a separate audience and editorial decision before activating any new public projection."
    ]
  },
  {
    id: "INTAKE-URBANHERM-NPR-HORSE-LORDS-2016",
    capturedAt: reviewedAt,
    capturedBy: "Codex close reading",
    kind: "public-url",
    title: "NPR Music publication of the Horse Lords Truthers video",
    publicSafeSummary:
      "NPR directly credits M.C. Schmidt and Jamie Burkart with the video and records Horse Lords' description of its visual method.",
    whyItMatters:
      "Supplies independent, article-level shared credit for a creative-media collaboration surfaced by the tweet corpus.",
    projectHints: ["horse-lords-truthers-video"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    sourceIds: ["SRC-URBANHERM-NPR-HORSE-LORDS-2016"],
    claimIds: ["CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"],
    inquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    limitations: [
      "The article does not establish the collaborators' production split, terms, rights, reach, or impact."
    ],
    nextActions: ["Review media rights before any visual projection."]
  },
  {
    id: "INTAKE-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
    capturedAt: reviewedAt,
    capturedBy: "Codex close reading",
    kind: "public-url",
    title: "KCUR reporting on Jamie's 8th Street Tunnel program",
    publicSafeSummary:
      "Independent reporting about Jamie's 2006 participatory public-history program and its present access and safety boundary.",
    whyItMatters:
      "Supports a strong, bounded claim connecting facilitation, media programming, hidden infrastructure, and civic imagination.",
    projectHints: ["eighth-street-tunnel"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    sourceIds: ["SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016"],
    claimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"],
    inquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    limitations: [
      "The article documents a participatory screening, not restoration, ownership, permanent opening, attendance, or measured impact."
    ],
    nextActions: ["Review rights, authorization, consent, and current safety before any visual treatment."]
  },
  {
    id: "INTAKE-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
    capturedAt: reviewedAt,
    capturedBy: "Codex close reading",
    kind: "public-url",
    title: "Brooklyn Daily Eagle reporting on the Office of Nightlife sequence",
    publicSafeSummary:
      "Contemporaneous reporting that quotes NYC Artist Coalition and records the Council committee and public-feedback sequence around the proposed Office of Nightlife.",
    whyItMatters:
      "Adds coalition-level context while preserving the distinction between collective advocacy and Jamie's individual attribution.",
    projectHints: ["nyc-artist-coalition"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
    sourceIds: ["SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"],
    claimIds: ["CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION"],
    inquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    limitations: [
      "The article quotes NYC Artist Coalition but does not name Jamie or establish individual authorship, sole causation, or final legal status."
    ],
    nextActions: ["Use official enactment records for legal status and individual attribution sources for Jamie's role."]
  }
] satisfies IntakeRecord[];
