import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const xPost = (
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
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
});

export const urbanhermitFullPopulationSources: SourceRecord[] = [
  {
    id: "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
    title: "Urbanhermit X live-profile population ledger",
    author: "Codex authenticated browser review",
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
      "The live profile reported 434 posts. Three independent authenticated passes recovered the same 434-status population. A minimized public ledger preserves aggregate classifications, selected source leads, and cryptographic reconciliation controls while the full item-level capture remains protected.",
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
    id: "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15",
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
  xPost(
    "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
    "Music Hackathon identifies Jamie and WOW List",
    "Music Hackathon / Music Community Lab (@musichackathon)",
    "2015-03-20",
    "https://x.com/musichackathon/status/579088937022406657",
    "Music Hackathon / Music Community Lab, public post identifying Jamie Burkart as a co-organizer and WOW List as an event-sharing service he made, March 20, 2015.",
    "The account publicly described @urbanhermit as a co-organizer and linked a WOW List calendar for the community.",
    [
      "Jamie's co-organizer relationship with Music Hackathon",
      "external attribution of Jamie's role making WOW List",
      "WOW List as an event-sharing service"
    ],
    [
      "Jamie's sole authorship of WOW List",
      "the product's complete technical architecture",
      "adoption, audience size, or measured outcomes"
    ]
  ),
  xPost(
    "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
    "Jamie links the Horse Lords Truthers video",
    "Jamie Burkart (@urbanhermit)",
    "2016-04-29",
    "https://x.com/urbanhermit/status/726144972802691073",
    "Jamie Burkart, public post naming M.C. Schmidt as his collaborator on the Horse Lords 'Truthers' video, April 29, 2016.",
    "Jamie's contemporaneous first-person post names M.C. Schmidt and links the NPR publication.",
    ["Jamie's contemporaneous co-creation claim", "the Horse Lords project and NPR destination"],
    ["sole authorship", "the collaborators' precise division of labor", "commission terms", "audience reach"]
  ),
  xPost(
    "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
    "Drew Daniel credits the Horse Lords video collaboration",
    "Drew Daniel (@DDDrewDaniel)",
    "2016-04-29",
    "https://x.com/DDDrewDaniel/status/726096416070836224",
    "Drew Daniel, public post crediting M.C. Schmidt and Jamie Burkart's Horse Lords video, April 29, 2016.",
    "A public collaborator-network post independently names both video collaborators and the NPR destination.",
    ["independent public attribution to Jamie and M.C. Schmidt", "NPR publication of the video"],
    ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  ),
  xPost(
    "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
    "Julia Fredenburg credits the Horse Lords video collaboration",
    "Julia Fredenburg (@juliafredenburg)",
    "2016-04-29",
    "https://x.com/juliafredenburg/status/726238278433804288",
    "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
    "A second public collaborator-network post names both collaborators and describes the work as analog video.",
    ["a second public attribution to both video collaborators", "the analog-media context"],
    ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
  ),
  xPost(
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
  xPost(
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
  xPost(
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
  xPost(
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
  xPost(
    "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
    "NYC Artist Coalition attributes a Save NYC Spaces town-hall statement to Jamie",
    "NYC Artist Coalition (@NYCArtC)",
    "2017-11-26",
    "https://x.com/NYCArtC/status/934923724683431936",
    "NYC Artist Coalition, public post attributing to Jamie Burkart a statement at a Save NYC Spaces and Night Mayor town hall, November 26, 2017.",
    "The direct-status fallback recovered a live coalition-account attribution omitted by the current year-bounded search interface.",
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
      "The article documents the Council committee and public-feedback sequence around the proposed Office of Nightlife and directly quotes NYC Artist Coalition's cultural-space and Cabaret Law statement.",
    supportsGenerally: [
      "direct NYC Artist Coalition quotation",
      "the reported Council committee and public-feedback sequence",
      "the proposed office's outreach, liaison, and public-hearing functions"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship or role",
      "sole coalition causation",
      "that the expected timeline was the final legal record",
      "implementation quality or measured policy impact"
    ]
  },
  xPost(
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
  xPost(
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
  xPost(
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
];

export const urbanhermitFullPopulationClaims: ClaimRecord[] = [
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
      surfaces: [],
      rationale:
        "Retain as knowledge-bank depth; a personal social archive is not needed on the current job-application site."
    }],
    evidence: [{
      sourceId: "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      relationship: "direct-support",
      supports: ["434-record population reconciliation", "date range", "overlapping mission-signal counts"],
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
      surfaces: [],
      rationale:
        "Use the individual source records when an audience needs a specific proof; do not turn a bounded search count into a reach metric."
    }],
    evidence: [{
      sourceId: "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      relationship: "direct-support",
      supports: ["incoming-search population", "mission-relevant count", "stakeholder-group inventory"],
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
      surfaces: [],
      rationale:
        "The interface counters add research context but do not make a defensible hiring proof."
    }],
    evidence: [{
      sourceId: "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      relationship: "direct-support",
      supports: ["dated account-authored visible-counter aggregate"],
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
    id: "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
    project: "wowlist",
    internalClaim:
      "Music Hackathon / Music Community Lab publicly identified Jamie as a co-organizer and credited him with making WOW List as an event-sharing service for the community.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Music Hackathon / Music Community Lab publicly identified Jamie as a co-organizer and credited him with making WOW List as an event-sharing service.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Strong external role attribution stays available as proof-bank depth while the current WOW List case study uses broader system evidence."
    }],
    evidence: [{
      sourceId: "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
      relationship: "direct-support",
      supports: ["Music Hackathon co-organizer attribution", "WOW List maker attribution", "event-sharing purpose"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "This is a public peer attribution, not a complete product history.",
      "WOW List was shared work with Richard Caceres and other collaborators; do not convert the wording into sole authorship.",
      "The source does not establish architecture, adoption, audience size, or measured outcomes."
    ],
    antiClaims: [
      "Jamie alone created WOW List.",
      "The post proves the product's complete technical architecture.",
      "The post proves adoption or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
    project: "nyc-artist-coalition",
    internalClaim:
      "NYC Artist Coalition's public account attributed to Jamie statements connecting small diverse cultural spaces to New York's cultural traditions and framing Cabaret Law repeal as a path toward trust and safety resources; a civic-design peer separately recognized Jamie and Julia Fredenburg's work on repeal.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text:
        "Coalition records publicly attribute to Jamie cultural-space and trust-and-safety arguments used in Save NYC Spaces and Let NYC Dance advocacy.",
      status: "hold",
      citationRequired: true,
      surfaces: [],
      rationale:
        "Retain as speaker and peer-attribution evidence; the current case study already makes the coalition role legible without adding another citation block."
    }],
    evidence: [
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
        relationship: "direct-support",
        supports: ["public attribution of Jamie's cultural-space statement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
        relationship: "direct-support",
        supports: ["public attribution of Jamie's trust-and-safety statement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
        relationship: "corroborating",
        supports: ["public attribution of Jamie's Save NYC Spaces town-hall statement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
        relationship: "corroborating",
        supports: ["public peer recognition of Jamie and Julia Fredenburg's work on repeal"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
        relationship: "context",
        supports: ["contemporaneous coalition quotation", "Council committee and public-feedback sequence"],
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
  }
];

export const urbanhermitFullPopulationInquiries: ResearchInquiry[] = [
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
    sourceIds: [
      "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15"
    ],
    publicSummary:
      "The capture is complete for the live profile counter; an account-owner export is still needed for all-ever reconciliation. The protected capture is tracked outside the public repository without exposing its locator."
  },
  {
    id: "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026",
    project: "urbanhermit-public-record",
    question:
      "Which mission-relevant posted destinations and public attributions can mature into defensible professional claims?",
    methods: [
      "Applied auditable overlapping mission-signal rules to all 434 source-post bodies.",
      "Inventoried 321 distinct posted short URLs and prioritized records with independent role attribution.",
      "Close-read selected X records, KCUR reporting, Brooklyn Daily Eagle reporting, and existing canonical source records.",
      "Separated individual role, collective outcome, source circulation, and volatile engagement propositions."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "A Music Hackathon record identifies Jamie as a co-organizer and credits him with making WOW List as an event-sharing service.",
      "Contemporaneous collaborator records strengthen the existing shared Horse Lords video credit.",
      "A public-history collaborator record strengthens the existing KCUR-backed 8th Street Tunnel claim.",
      "Coalition and peer records publicly attribute cultural-space, trust-and-safety, and Cabaret Law repeal work to Jamie while retaining collective credit.",
      "Project and participant records strengthen Jamie's direct-participation evidence for Tired of Tires.",
      "A creative-technology peer publicly thanked Jamie for artist introductions."
    ],
    limitations: [
      "Most of the 321 distinct posted short URLs remain unprioritized or not close-read at article level.",
      "Posting or reposting is not automatically authorship, endorsement, partnership, participation, reach, or impact.",
      "Creative-media rights and contribution granularity require separate review.",
      "The new claims remain knowledge-bank depth until an audience-specific projection decision is made."
    ],
    sourceIds: [
      "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
      "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
      "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
      "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
      "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
      "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
      "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
      "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      "SRC-URBANHERM-X-KCTH-TIRES-2019",
      "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023"
    ],
    publicSummary:
      "The first maturation pass produced bounded role and program evidence while retaining most posted destinations as a named research queue."
  },
  {
    id: "INQ-URBANHERM-X-PHOTO-RESEARCH-2026",
    project: "urbanhermit-public-record",
    question:
      "Can rights-cleared, consent-aware photographs or photographed artifacts make selected Urbanhermit source clusters inspectable without publishing private archive structure or treating visual resemblance as fact?",
    methods: [
      "Generated a bounded photo-editor brief from selected mature and held claim clusters.",
      "Separated candidate discovery from identity, date, authorship, consent, rights, context, and projection review.",
      "Required every unexpected visual lead to return through typed intake or inquiry before it can support a claim."
    ],
    runAt: reviewedAt,
    resultStatus: "open",
    findings: [
      "The source graph identifies concrete visual subjects across WOW List, Music Hackathon, Horse Lords, 8th Street Tunnel, NYC Artist Coalition, and Tired of Tires.",
      "No candidate image, identity, private locator, or publication approval was produced in this pass."
    ],
    limitations: [
      "The private photo archive was not searched for this inquiry.",
      "A photograph alone cannot establish identity, date, role, authorship, consent, rights, project meaning, or impact.",
      "Selected social records do not grant permission to republish their media."
    ],
    sourceIds: [],
    publicSummary:
      "Urbanhermit source clusters generated a specific photo-research brief; any visual discovery must return to intake and independent verification before claim or publication review."
  }
];

export const urbanhermitFullPopulationIntake: IntakeRecordInput[] = [
  {
    id: "INT-URBANHERM-X-FULL-POPULATION-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Urbanhermit live-profile full-population archive",
    description:
      "Authenticated review of every record represented by the live @urbanhermit profile counter, with a protected full capture and minimized public ledger.",
    whyItMatters:
      "Preserves a cross-project public record without publishing ordinary life or other people's unnecessary traces.",
    projectIds: ["urbanhermit-public-record"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created population, bounded-stakeholder, and held-counter claims; preserved the full capture outside the public repo.",
    sourceIds: [
      "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
      "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15"
    ],
    claimIds: [
      "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
      "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
      "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT"
    ],
    inquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-2026"],
    artifactPaths: [
      "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.json",
      "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.manifest.json",
      "docs/knowledge-bank/runs/2026-07-15-urbanhermit-x-full-population.md"
    ],
    boundaries: [
      "Raw post text and the item-level capture stay outside the public repository.",
      "The 100 percent result applies to the live profile-counted population, not all-ever account history."
    ]
  },
  {
    id: "INT-URBANHERM-X-MISSION-SOURCES-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "Mission-relevant Urbanhermit sources and public attributions",
    description:
      "Selected records concerning WOW List, the Horse Lords Truthers video, the 8th Street Tunnel program, NYC Artist Coalition advocacy, Tired of Tires participation, and creative-community introductions.",
    whyItMatters:
      "Turns diffuse historical traces into bounded source-backed role evidence without confusing circulation, authorship, collective work, and policy causation.",
    projectIds: [
      "urbanhermit-public-record",
      "wowlist",
      "nyc-artist-coalition",
      "participatory-public-practice",
      "kansas-city-neighborhood-operations"
    ],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created two new held claims and added corroborating evidence to three existing canonical claims.",
    sourceIds: urbanhermitFullPopulationSources
      .filter((source) => source.id !== "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15")
      .map((source) => source.id),
    claimIds: [
      "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
      "CLM-KC-TUNNEL-PUBLIC-HISTORY-PROGRAM",
      "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
      "CLM-TIRED-OF-TIRES-NEIGHBORHOOD-OPERATIONS"
    ],
    inquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
    artifactPaths: ["docs/knowledge-bank/projects/urbanhermit.md"],
    boundaries: [
      "Posted or reposted sources establish circulation, not endorsement or authorship.",
      "Collaborator, project-account, participant, and publication authorship remains attached to each source.",
      "No new website projection was selected in this pass."
    ]
  },
  {
    id: "INT-URBANHERM-X-PHOTO-LEAD-2026",
    receivedAt: reviewedAt,
    kind: "photo-lead",
    visibility: "protected-summary",
    title: "Urbanhermit source-cluster photo search",
    description:
      "A public-safe brief for privately locating images or photographed artifacts connected to selected Urbanhermit source clusters.",
    whyItMatters:
      "A carefully verified image could make Jamie's operating and relational contribution more legible without turning the personal timeline into a public gallery.",
    projectIds: [
      "urbanhermit-public-record",
      "wowlist",
      "nyc-artist-coalition",
      "participatory-public-practice",
      "kansas-city-neighborhood-operations"
    ],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "The claim graph generated a bounded photo brief; no image was located, published, or promoted as evidence.",
    inquiryIds: ["INQ-URBANHERM-X-PHOTO-RESEARCH-2026"],
    relatedIntakeIds: [
      "INT-PHOTO-ARCHIVE-RECIPROCAL-DISCOVERY-2026-07-12",
      "INT-URBANHERM-X-MISSION-SOURCES-2026"
    ],
    artifactPaths: ["docs/knowledge-bank/briefs/urbanhermit-photo-editor-brief.md"],
    boundaries: [
      "The lead does not assert that a suitable image exists.",
      "Private locators, pixels, inferred identities, rights information, and consent records stay outside the public repo.",
      "A photo lead cannot directly become evidence, a claim, or a website projection."
    ]
  },
  {
    id: "INT-URBANHERM-X-EVAL-FEEDBACK-2026",
    receivedAt: reviewedAt,
    kind: "reader-feedback",
    visibility: "public-safe",
    title: "Independent Urbanhermit archive and Chad-lens review",
    description:
      "Independent evaluators found missing adversarial capture validation, exposed private-locator metadata, an overstrong WOW List adoption phrase in the resume, and an incomplete project-specific reciprocal-discovery trace.",
    whyItMatters:
      "The feedback improved integrity, privacy, claim precision, and projection governance without becoming evidence for Jamie's accomplishments.",
    projectIds: ["urbanhermit-public-record", "knowledge-bank-governance", "wowlist"],
    status: "triaged",
    disposition: "governance-updated",
    dispositionNote:
      "Added hostile-input validation, removed private locator metadata, corrected the resume's adoption wording, reconciled collaborator credit, and created a project-specific photo lead and inquiry.",
    inquiryIds: ["INQ-READER-FEEDBACK-PROJECTION-GOVERNANCE"],
    correctionIds: ["COR-WOWLIST-RESUME-ADOPTION-2026"],
    relatedIntakeIds: [
      "INT-READER-FEEDBACK-PROJECTION-RATIONALES-2026-07-12",
      "INT-URBANHERM-X-FULL-POPULATION-2026",
      "INT-URBANHERM-X-PHOTO-LEAD-2026"
    ],
    artifactPaths: [
      "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
      "scripts/build-urbanhermit-x-public-ledger.mjs",
      "scripts/check-urbanhermit-x-public-ledger.mjs",
      "docs/knowledge-bank/briefs/urbanhermit-photo-editor-brief.md"
    ],
    boundaries: [
      "Reader feedback can repair evidence and governance systems but cannot establish a historical accomplishment.",
      "The resume correction narrows causation while retaining the supported scale and usage signal."
    ]
  }
];
