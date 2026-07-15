import type {
  CitationPage,
  ClaimRecord,
  IntakeRecordInput,
  SourceRecord
} from "./schema.ts";

export const sourceExpansionSources = [
  {
    id: "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
    title: "The Co-op Q&A With Jamie Burkart and Julie Fredenberg",
    organization: "Greene Hill Food Co-op",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-12-19",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    preferredPublicUrl: "canonical",
    publicCitation: "Greene Hill Food Co-op, 'The Co-op Q&A With Jamie Burkart and Julie Fredenberg,' December 19, 2017.",
    publicNote: "The profile documents weekly community-open Sunday dinners, use of WOWList for community events, Jamie's NYC Artist Coalition advocacy, and an invitation to a public Office of Nightlife town hall.",
    supportsGenerally: [
      "Jamie and a co-host hosted weekly Sunday dinners open to the community",
      "Jamie and a co-host posted community events on WOWList",
      "Jamie publicly represented NYC Artist Coalition's community-space advocacy",
      "Jamie invited readers to an Office of Nightlife town hall"
    ],
    doesNotEstablish: [
      "300 or more Sunday Dinner gatherings",
      "20 or more resident artists",
      "WOWList's aggregate user, post, or city counts",
      "Jamie's sole production of the Office of Nightlife town hall",
      "sole causality for Cabaret Law repeal"
    ]
  },
  {
    id: "SRC-KC-TUNNEL-KCUR-2016-09-15",
    title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    organization: "KCUR",
    author: "Cody Newill",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote: "The report documents Jamie's 2006 downtown scavenger-hunt route and three-film tunnel screening, and records his argument for public and school access to Kansas City's transportation history.",
    supportsGenerally: [
      "Jamie hosted a 2006 film screening in the 8th Street Tunnel",
      "Jamie led participants through downtown Kansas City before the screening",
      "the screening included three films",
      "Jamie advocated public and school access to the tunnel"
    ],
    doesNotEstablish: [
      "that Jamie had official permission for the event",
      "that Jamie controlled the tunnel",
      "a complete participant roster",
      "current tunnel access or safety"
    ]
  },
  {
    id: "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
    title: "Former Huck Finn artist now working in a pink, plastic bubble",
    organization: "The Pitch",
    author: "Carolyn Szczepanski",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-03",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
    preferredPublicUrl: "canonical",
    publicCitation: "Carolyn Szczepanski, 'Former Huck Finn artist now working in a pink, plastic bubble,' The Pitch, September 3, 2009.",
    publicNote: "The follow-up independently reports that Jamie and the collaborative raft crew reached the Gulf of Mexico four months after departing Kansas City.",
    supportsGenerally: [
      "Jamie and the raft crew reached the Gulf of Mexico",
      "the journey lasted four months",
      "the expedition departed from Kaw Point",
      "the raft used recycled materials"
    ],
    doesNotEstablish: [
      "that Jamie traveled alone",
      "every participant or stop",
      "a complete route log",
      "authorship of every expedition component"
    ]
  },
  {
    id: "SRC-NYCAC-SAVE-NYC-SPACES",
    title: "Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures",
    organization: "NYC Artist Coalition / Save NYC Spaces coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Save NYC Spaces public campaign website.",
    publicNote: "The campaign page quotes Jamie on cultural traditions born in grassroots spaces, identifies NYC Artist Coalition among a broad partner group, and preserves public town-hall and media materials.",
    supportsGenerally: [
      "Jamie publicly represented NYC Artist Coalition's cultural-space argument",
      "NYC Artist Coalition participated in the Save NYC Spaces coalition",
      "the campaign included a public town hall",
      "the public campaign named a broad partner group"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship or production of the campaign",
      "the identity of every event participant",
      "sole causality for Office of Nightlife policy",
      "permission to republish campaign images"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22",
    title: "New York City Council Committee on Small Business hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-10-22",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=3BAD981A-69D8-4D99-A882-52442F36F5A2&ID=6792384&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Committee on Small Business hearing transcript, October 22, 2018, pp. 346-348.",
    publicNote: "The official transcript records Jamie testifying as an NYC Artist Coalition member, linking commercial affordability to cultural-space safety and advocating lease-renewal and rent protections.",
    supportsGenerally: [
      "Jamie testified before the New York City Council",
      "Jamie identified himself as an NYC Artist Coalition member",
      "Jamie linked commercial affordability to cultural-space safety",
      "Jamie advocated lease-renewal and commercial-rent protections"
    ],
    doesNotEstablish: [
      "independent verification of every example in the testimony",
      "that Jamie authored the Small Business Jobs Survival Act",
      "that Jamie spoke for every coalition member",
      "sole causality for legislation"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
    title: "Central City Economic Development Sales Tax Board 2019 public-meeting record",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    preferredPublicUrl: "canonical",
    publicCitation: "Central City Economic Development Sales Tax Board public-meeting record, 2019.",
    publicNote: "The municipal record identifies Jamie as KC Town-Hall's presenter, labels the $189,629 Phase One cold-shell work completed in 2019, says a neighborhood survey directly shaped the proposal, records a $490,539 request, and records the later unanimous recommendation.",
    supportsGenerally: [
      "Jamie was identified as the KC Town-Hall presenter",
      "Phase One cold-shell work was labeled completed in 2019",
      "the Phase One value was listed as $189,629",
      "Phase One included roof and TPO membrane work, masonry, floor framing, water connection, access, safety, transport, and cleanup",
      "the proposal reproduced the neighborhood survey handbill",
      "the survey was conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "the proposal states that survey results directly shaped the proposal",
      "the proposal requested $490,539",
      "the proposal described four retail spaces and three apartment units",
      "the board unanimously recommended $490,539 to the City Council"
    ],
    doesNotEstablish: [
      "that Jamie acted alone",
      "Jamie's general-contractor title",
      "Jamie's sole authorship of the neighborhood survey handbill or backing data system",
      "completion of Phase Two or the later redevelopment plan",
      "final receipt or disbursement of funds",
      "current project or property status",
      "private financial or legal details"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-CCED-RECOMMENDATION-2019",
    title: "Round Two Recommended Projects - Central City Economic Development Sales Tax Board",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://kansascity.legistar.com/View.ashx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=A318190A-A2D9-436E-8D10-85242BA4ED5F&ID=10628092&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "Central City Economic Development Sales Tax Board, Round Two Recommended Projects presentation, Resolution 190649, 2019.",
    publicNote: "The official presentation records KC Town Hall's project description, $680,169 total budget, and $490,539 recommended funding amount.",
    supportsGenerally: [
      "KC Town Hall was a recommended Round Two project",
      "the project concerned redevelopment of an abandoned building",
      "the total project budget was listed as $680,169",
      "recommended funding was $490,539"
    ],
    doesNotEstablish: [
      "final receipt or disbursement of funds",
      "Jamie's sole ownership or authorship",
      "current project or property status",
      "that projected job estimates were realized"
    ]
  },
  {
    id: "SRC-CLAUDETTE-MAKE-USE-VISIBLE",
    title: "Claudette's Theatre on Wheels",
    organization: "Michael Rees / ad hoc",
    author: "Michael Rees",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://michaelrees.org/claudette",
    preferredPublicUrl: "canonical",
    publicCitation: "Michael Rees, 'Claudette's Theatre on Wheels.'",
    publicNote: "The collaborator-authored page credits Jamie and Michael Rees with an augmented-reality experience for Make Use Visible Munich and credits Jamie, Anne Dufy Burkart, and Julia Fredenberg with producing its 2017 video material with Claudette.",
    supportsGenerally: [
      "Jamie collaborated with Michael Rees on an augmented-reality experience",
      "the work was created for Make Use Visible Munich",
      "Jamie co-produced the source video with Anne Dufy Burkart and Julia Fredenberg",
      "the video was shot with Claudette in 2017"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship",
      "ownership of every underlying performance",
      "permission to republish video or images",
      "current exhibition status"
    ]
  },
  {
    id: "SRC-WOWLIST-SBDIY",
    title: "sbdiy community resources and WOWList calendar",
    organization: "sbdiy",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.sbdiy.org/",
    preferredPublicUrl: "canonical",
    publicCitation: "sbdiy community website and WOWList calendar links.",
    publicNote: "The independent community page links directly to an sbdiy WOWList calendar and an add-event path, documenting one organizer-facing use of the platform.",
    supportsGenerally: [
      "sbdiy used a WOWList community calendar",
      "sbdiy linked an organizer-facing add-event path",
      "WOWList supported an independent local DIY community surface"
    ],
    doesNotEstablish: [
      "WOWList's aggregate user, post, or city counts",
      "current activity of the historical WOWList platform",
      "Jamie's sole responsibility for the integration",
      "official chapter status"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-CCED-MINUTES-2021-09-14",
    title: "Central City Economic Development Sales Tax Board minutes from September 14, 2021",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-10-12",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/7198/637696345156870000",
    preferredPublicUrl: "canonical",
    publicCitation: "Central City Economic Development Sales Tax Board, minutes from September 14, 2021, published October 12, 2021.",
    publicNote: "The official minutes list Jamie Burkart among community members and identify him with KC Town Hall, documenting continued public project representation in 2021.",
    supportsGenerally: [
      "Jamie attended the September 14, 2021, board meeting",
      "the municipal record identified Jamie with KC Town Hall",
      "KC Town Hall remained represented in the public process in 2021"
    ],
    doesNotEstablish: [
      "Jamie's action at the meeting",
      "current project or property status",
      "final receipt or disbursement of funds",
      "Jamie's sole ownership or control"
    ]
  }
] satisfies SourceRecord[];

export const sourceExpansionClaims = [
  {
    id: "CLM-WOWLIST-PUBLIC-COMMUNITY-USE",
    project: "wowlist",
    internalClaim: "Public community pages document WOWList in use for community-event publishing and an independent local DIY calendar.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Public community pages document WOWList in use as event infrastructure: Greene Hill Food Co-op described Jamie and a co-host posting community events there, while sbdiy linked to its own WOWList calendar and add-event flow.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale: "Add two compact external-use examples to the case study so hiring readers can inspect community adoption without exposing user data or relying on aggregate archive counts."
      }
    ],
    evidence: [
      { sourceId: "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19", relationship: "direct-support", supports: ["Jamie and a co-host posted community events on WOWList"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SBDIY", relationship: "direct-support", supports: ["sbdiy used a WOWList community calendar", "sbdiy linked an organizer-facing add-event path"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["These examples do not establish aggregate user, post, or city counts.", "Treat WOWList as a historical platform unless current operation is separately verified."],
    antiClaims: ["WOWList operated official chapters in every city.", "Jamie alone created every community integration."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY-HOSTING",
    project: "196-sunday-dinner",
    internalClaim: "A 2017 Greene Hill Food Co-op profile documented Jamie and a co-host hosting weekly Sunday dinners open to the community.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "A 2017 Greene Hill Food Co-op profile documented Jamie and a co-host hosting Sunday dinner every week and opening it to the community.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"],
        rationale: "Use one contemporaneous public description to make the recurring hosting practice inspectable while keeping guests, addresses, attendance data, and unapproved images private."
      }
    ],
    evidence: [
      { sourceId: "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19", relationship: "direct-support", supports: ["Jamie and a co-host hosted weekly Sunday dinners open to the community"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The source does not establish the 300-plus gathering or 20-plus resident-artist aggregate claims.", "Do not publish addresses, guest identities, attendance records, or images from this source relationship."],
    antiClaims: ["The public profile is a complete archive of Sunday Dinner.", "Jamie solely authored participants' work."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-KC-TUNNEL-PUBLIC-HISTORY-PROGRAM",
    project: "participatory-public-practice",
    internalClaim: "In 2006, Jamie led participants through downtown Kansas City to a three-film screening he hosted in the 8th Street Tunnel and later argued for public and school access to the site.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "In 2006, Jamie led participants through downtown Kansas City to a three-film screening he hosted in the 8th Street Tunnel, connecting a hidden piece of transportation history to a public invitation and a case for school access.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale: "Retain as source-backed historical depth showing Jamie's longstanding public-program and civic-imagination practice."
      },
      {
        key: "about",
        text: "Led a participatory route through downtown Kansas City to a three-film screening in the historic 8th Street Tunnel.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale: "Hold from the current About page until imagery and a concise bridge to Jamie's present technical and civic practice are ready."
      }
    ],
    evidence: [
      { sourceId: "SRC-KC-TUNNEL-KCUR-2016-09-15", relationship: "direct-support", supports: ["Jamie hosted a 2006 film screening in the 8th Street Tunnel", "Jamie led participants through downtown Kansas City before the screening", "the screening included three films", "Jamie advocated public and school access to the tunnel"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Do not imply official permission, present-day access, or present-day safety.", "The article does not provide a complete participant roster."],
    antiClaims: ["Jamie controlled the 8th Street Tunnel.", "The screening was an official City program."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCAC-SAVE-NYC-SPACES-PUBLIC-VOICE",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie publicly represented NYC Artist Coalition's case for protecting small, diverse cultural spaces through the Save NYC Spaces coalition campaign.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "In the Save NYC Spaces campaign, Jamie publicly argued that New York's influential cultural traditions are born in small grassroots spaces; the campaign presented NYC Artist Coalition alongside a broad partner coalition.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
        rationale: "Add Jamie's public voice and visible coalition context to the case study without converting a collective campaign into solo authorship or causality."
      }
    ],
    evidence: [
      { sourceId: "SRC-NYCAC-SAVE-NYC-SPACES", relationship: "direct-support", supports: ["Jamie publicly represented NYC Artist Coalition's cultural-space argument", "NYC Artist Coalition participated in the Save NYC Spaces coalition", "the public campaign named a broad partner group"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Campaign production and policy outcomes remain collectively credited.", "Do not republish campaign images without separate rights review."],
    antiClaims: ["Jamie solely created Save NYC Spaces.", "Jamie alone caused Office of Nightlife policy."],
    researchInquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCAC-COMMERCIAL-RENT-TESTIMONY",
    project: "fair-rent-nyc",
    internalClaim: "In 2018, Jamie testified before the New York City Council as an NYC Artist Coalition member, linking commercial affordability to cultural-space safety and urging lease-renewal protections.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "In 2018, Jamie testified before the New York City Council as an NYC Artist Coalition member, linking commercial affordability to cultural-space safety and urging lease-renewal protections.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
        rationale: "Use the official testimony to establish Jamie's direct public advocacy and the long-running safety-and-affordability throughline behind the current documentation work."
      }
    ],
    evidence: [
      { sourceId: "SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22", relationship: "direct-support", supports: ["Jamie testified before the New York City Council", "Jamie identified himself as an NYC Artist Coalition member", "Jamie linked commercial affordability to cultural-space safety", "Jamie advocated lease-renewal and commercial-rent protections"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Testimony establishes Jamie's advocacy, not authorship or enactment of legislation.", "Do not present testimony examples as independently verified findings without additional sources."],
    antiClaims: ["Jamie authored the Small Business Jobs Survival Act.", "Jamie alone created commercial-rent policy."],
    researchInquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS",
    project: "kc-town-hall",
    internalClaim: "KCMO records identify Jamie as KC Town-Hall's presenter, document a unanimous $490,539 CCED Board recommendation, show the Council adopted the project resolution and appropriated that amount, and later record withdrawal before disbursement and reappropriation of the unused funds.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "KCMO records identify Jamie as KC Town-Hall's presenter. The CCED Board unanimously recommended $490,539; the City Council then adopted the project resolution, and a companion ordinance appropriated that amount. The project later withdrew before the funds were disbursed.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"],
        rationale: "Make Jamie's public municipal-process role and the complete recommendation, Council-action, appropriation, and no-disbursement chronology directly inspectable without implying a completed project."
      }
    ],
    evidence: [
      { sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019", relationship: "direct-support", supports: ["Jamie was identified as the KC Town-Hall presenter", "the proposal requested $490,539", "the board unanimously recommended $490,539 to the City Council"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KC-TOWN-HALL-CCED-RECOMMENDATION-2019", relationship: "corroborating", supports: ["KC Town Hall was a recommended Round Two project", "recommended funding was $490,539"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649", relationship: "direct-support", supports: ["the Council adopted Resolution 190649 as substituted on September 26, 2019", "the resolution accepted the CCED Board's $490,539 recommendation for KC Town Hall", "the resolution authorized negotiation of a funding agreement"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019-09-26", relationship: "corroborating", supports: ["the Council adopted Resolution 190649 as substituted", "the Council passed companion Ordinance 190642 as substituted"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KC-TOWN-HALL-CCED-MINUTES-2021-09-14", relationship: "corroborating", supports: ["the municipal record identified Jamie with KC Town Hall", "KC Town Hall remained represented in the public process in 2021"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12", relationship: "supports-boundary", supports: ["the KC Town Hall allocation was listed as $490,539", "no KC Town Hall funds were disbursed", "the project submitted a letter rescinding the previously awarded funds"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317", relationship: "direct-support", supports: ["Committee Substitute for Ordinance 190642 appropriated $490,539 to KC Town Hall", "KC Town Hall later withdrew from the project", "the unused $490,539 was reappropriated in 2024"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The unanimous vote belongs to the CCED Board; the official Council record does not publish a member-level tally.", "Council adoption and appropriation are not proof of an executed funding agreement, receipt, or disbursement.", "Later municipal records show that the project withdrew and the unused amount was reappropriated in 2024.", "Presenter identification and meeting attendance do not establish sole ownership, authorship, withdrawal responsibility, or current property status."],
    antiClaims: ["Jamie alone owned or controlled KC Town Hall.", "The City Council vote was unanimous.", "KC Town Hall received or spent the $490,539.", "The funded redevelopment was completed.", "The municipal records establish current property status."],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-ACTION-2019"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex official-record review"]
  },
  {
    id: "CLM-CLAUDETTE-AR-COLLABORATION",
    project: "participatory-public-practice",
    internalClaim: "Jamie collaborated with Michael Rees on an augmented-reality experience for Make Use Visible Munich and co-produced its source video with Anne Dufy Burkart and Julia Fredenberg, working with Claudette.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Collaborated with Michael Rees on an augmented-reality experience for Make Use Visible Munich and co-produced its 2017 source video with Anne Dufy Burkart and Julia Fredenberg, working with Claudette.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale: "Retain as public-safe evidence of cross-disciplinary technical collaboration and careful shared credit."
      },
      {
        key: "about",
        text: "Collaborated with Michael Rees on an augmented-reality public-art experience for Munich, built from video co-produced with Anne Dufy Burkart and Julia Fredenberg while working with Claudette.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale: "Hold from the current About page until a visual artifact, rights review, and concise bridge to the hiring narrative are ready."
      }
    ],
    evidence: [
      { sourceId: "SRC-CLAUDETTE-MAKE-USE-VISIBLE", relationship: "direct-support", supports: ["Jamie collaborated with Michael Rees on an augmented-reality experience", "the work was created for Make Use Visible Munich", "Jamie co-produced the source video with Anne Dufy Burkart and Julia Fredenberg", "the video was shot with Claudette in 2017"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Credit Michael Rees, Anne Dufy Burkart, Julia Fredenberg, and Claudette in project-specific descriptions.", "Do not republish video or imagery without rights review."],
    antiClaims: ["Jamie solely authored the augmented-reality experience.", "Jamie owned Claudette's performances."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const sourceExpansionIntake = [
  {
    id: "INT-GREENE-HILL-SUNDAY-WOWLIST-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "Greene Hill Food Co-op profile of Sunday Dinner, WOWList, and NYC Artist Coalition work",
    description: "User-supplied institutional profile documenting weekly community-open Sunday dinners, community-event publishing through WOWList, and Jamie's cultural-space advocacy.",
    whyItMatters: "Provides one contemporaneous public bridge across recurring hosting, community technology, and civic advocacy.",
    projectIds: ["196-sunday-dinner", "wowlist", "nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Decomposed into separate Sunday Dinner and WOWList claims; NYC Artist Coalition details corroborate existing role inquiries without inflating individual causality.",
    sourceIds: ["SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"],
    claimIds: ["CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY-HOSTING", "CLM-WOWLIST-PUBLIC-COMMUNITY-USE"],
    inquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    boundaries: ["The profile does not establish Sunday Dinner aggregate counts, WOWList aggregate counts, or Jamie's sole town-hall production role."]
  },
  {
    id: "INT-KC-TUNNEL-KCUR-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "KCUR report on Jamie's 8th Street Tunnel public-history program",
    description: "Public reporting on a 2006 participatory downtown route, three-film tunnel screening, and Jamie's argument for public access.",
    whyItMatters: "Adds a concrete early example of participatory program design, civic history, facilitation, and public imagination.",
    projectIds: ["participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Recorded as a bounded historical claim held from the current website composition.",
    sourceIds: ["SRC-KC-TUNNEL-KCUR-2016-09-15"],
    claimIds: ["CLM-KC-TUNNEL-PUBLIC-HISTORY-PROGRAM"],
    boundaries: ["Do not imply official permission, current access, or current safety."]
  },
  {
    id: "INT-WATERWAYS-PITCH-GULF-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "The Pitch follow-up confirming the raft expedition's Gulf terminus",
    description: "Independent follow-up reporting that Jamie and the collaborative raft crew reached the Gulf of Mexico four months after leaving Kansas City.",
    whyItMatters: "Resolves the earlier terminus boundary without weakening collective credit or implying a complete route log.",
    projectIds: ["waterways-participatory-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Added as corroborating evidence for the existing raft-expedition claim and used to replace the prior salt-water-only boundary.",
    sourceIds: ["SRC-WATERWAYS-PITCH-GULF-2009-09-03"],
    claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
    boundaries: ["The report confirms the Gulf terminus but does not provide every stop or participant."]
  },
  {
    id: "INT-SAVE-NYC-SPACES-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "Save NYC Spaces public campaign record",
    description: "Coalition campaign page preserving Jamie's public cultural-space argument, partner context, and town-hall materials.",
    whyItMatters: "Makes Jamie's public voice and the coalition scale visible together.",
    projectIds: ["nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Matured into a cited FairRentNYC case-study claim with collective-credit boundaries.",
    sourceIds: ["SRC-NYCAC-SAVE-NYC-SPACES"],
    claimIds: ["CLM-NYCAC-SAVE-NYC-SPACES-PUBLIC-VOICE"],
    inquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    boundaries: ["Campaign production, imagery, and policy outcomes remain separately credited and reviewed."]
  },
  {
    id: "INT-NYC-COUNCIL-SMALL-BUSINESS-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-artifact",
    visibility: "public-safe",
    title: "New York City Council commercial-rent testimony",
    description: "Official 2018 hearing transcript recording Jamie's NYC Artist Coalition testimony on cultural-space affordability, safety, and lease protections.",
    whyItMatters: "Establishes direct public advocacy and a long-running throughline into Jamie's current Commercial Rent Stabilization documentation work.",
    projectIds: ["fair-rent-nyc", "nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Matured into a cited FairRentNYC case-study claim bounded to testimony rather than legislative authorship or outcome causality.",
    sourceIds: ["SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22"],
    claimIds: ["CLM-NYCAC-COMMERCIAL-RENT-TESTIMONY"],
    inquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    boundaries: ["Testimony is evidence of Jamie's advocacy, not independent verification of every example or authorship of legislation."]
  },
  {
    id: "INT-KC-TOWN-HALL-PROPOSAL-RECORD-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-artifact",
    visibility: "public-safe",
    title: "KCMO KC Town-Hall proposal and board minutes",
    description: "Municipal record identifying Jamie as presenter, describing the proposal, and recording the board's recommendation vote.",
    whyItMatters: "Directly documents Jamie's public role and the bounded $490,539 recommendation.",
    projectIds: ["kc-town-hall"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Linked to the canonical municipal-process claim and case-study citation plan.",
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"],
    boundaries: ["Recommendation does not establish receipt, disbursement, sole ownership, or current status."]
  },
  {
    id: "INT-KC-TOWN-HALL-RECOMMENDATION-PRESENTATION-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-artifact",
    visibility: "public-safe",
    title: "KCMO Round Two recommended-project presentation",
    description: "Official presentation recording KC Town Hall's project description, total budget, and recommended funding amount.",
    whyItMatters: "Corroborates the recommendation and provides a durable municipal source for the project scope.",
    projectIds: ["kc-town-hall"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Linked as corroborating evidence for the canonical municipal-process claim.",
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-RECOMMENDATION-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"],
    boundaries: ["Budget and recommendation are not proof of final funding or realized job estimates."]
  },
  {
    id: "INT-CLAUDETTE-AR-COLLABORATION-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "Claudette's Theatre on Wheels augmented-reality collaboration",
    description: "Collaborator-authored project page crediting Jamie's augmented-reality collaboration and shared video production.",
    whyItMatters: "Adds public evidence of cross-disciplinary technical implementation and preserves specific collaborator credit.",
    projectIds: ["participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Matured into a public-safe archive claim held from the current website pending artifact and rights review.",
    sourceIds: ["SRC-CLAUDETTE-MAKE-USE-VISIBLE"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    boundaries: ["Video and image republication requires separate rights review; all named collaborators retain credit."]
  },
  {
    id: "INT-WOWLIST-SBDIY-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-url",
    visibility: "public-safe",
    title: "sbdiy WOWList calendar integration",
    description: "Independent community page linking to an sbdiy WOWList calendar and organizer-facing add-event path.",
    whyItMatters: "Provides an inspectable example of WOWList serving a local DIY organizer ecosystem.",
    projectIds: ["wowlist"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Linked as direct evidence for the cited public-community-use claim.",
    sourceIds: ["SRC-WOWLIST-SBDIY"],
    claimIds: ["CLM-WOWLIST-PUBLIC-COMMUNITY-USE"],
    boundaries: ["One integration does not establish aggregate adoption, current operation, or official chapter status."]
  },
  {
    id: "INT-KC-TOWN-HALL-2021-MINUTES-2026-07-12",
    receivedAt: "2026-07-12",
    kind: "public-artifact",
    visibility: "public-safe",
    title: "KCMO 2021 minutes identifying Jamie with KC Town Hall",
    description: "Official board minutes listing Jamie among community members and identifying him with KC Town Hall.",
    whyItMatters: "Documents sustained public project representation beyond the 2019 recommendation process.",
    projectIds: ["kc-town-hall"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote: "Linked as corroborating continuity evidence for the canonical municipal-process claim.",
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-MINUTES-2021-09-14"],
    claimIds: ["CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"],
    boundaries: ["Attendance and affiliation do not establish meeting action, current status, or sole control."]
  }
] satisfies IntakeRecordInput[];

export const sourceExpansionPages = [
  {
    id: "wowlist",
    surface: "/work/wowlist",
    sourceOrder: [
      "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
      "SRC-WOWLIST-SBDIY",
      "SRC-WOWLIST-X-PROFILE-2026",
      "SRC-WOWLIST-ORIGIN-2014",
      "SRC-WOWLIST-SUPPORT-2016"
    ],
    occurrences: [
      {
        id: "public-community-use",
        claimId: "CLM-WOWLIST-PUBLIC-COMMUNITY-USE",
        projection: "case-study",
        sourceIds: [
          "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
          "SRC-WOWLIST-SBDIY"
        ]
      },
      {
        id: "social-provenance-support",
        claimId: "CLM-WOWLIST-SOCIAL-PROVENANCE-SUPPORT",
        projection: "case-study",
        sourceIds: [
          "SRC-WOWLIST-X-PROFILE-2026",
          "SRC-WOWLIST-ORIGIN-2014",
          "SRC-WOWLIST-SUPPORT-2016"
        ]
      }
    ]
  },
  {
    id: "196-sunday-dinner",
    surface: "/work/196-sunday-dinner",
    sourceOrder: ["SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"],
    occurrences: [
      {
        id: "weekly-community-hosting",
        claimId: "CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY-HOSTING",
        projection: "case-study",
        sourceIds: ["SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"]
      }
    ]
  },
  {
    id: "fair-rent-nyc",
    surface: "/work/fair-rent-nyc",
    sourceOrder: [
      "SRC-NYCAC-SAVE-NYC-SPACES",
      "SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22",
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
      "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
      "SRC-NYCAC-X-PROFILE-2026",
      "SRC-NYCAC-OLYMPIA-RELIEF-2020",
      "SRC-NYCAC-OLYMPIA-FAIR-RENT-2021",
      "SRC-NYCAC-OLYMPIA-NIGHTLIFE-2022"
    ],
    occurrences: [
      {
        id: "save-nyc-spaces-public-voice",
        claimId: "CLM-NYCAC-SAVE-NYC-SPACES-PUBLIC-VOICE",
        projection: "case-study",
        sourceIds: ["SRC-NYCAC-SAVE-NYC-SPACES"]
      },
      {
        id: "commercial-rent-testimony",
        claimId: "CLM-NYCAC-COMMERCIAL-RENT-TESTIMONY",
        projection: "case-study",
        sourceIds: ["SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22"]
      },
      {
        id: "social-council-engagement",
        claimId: "CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT",
        projection: "case-study",
        sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026"]
      },
      {
        id: "social-identity-system",
        claimId: "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT",
        projection: "case-study",
        sourceIds: [
          "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
          "SRC-NYCAC-X-PROFILE-2026",
          "SRC-NYCAC-OLYMPIA-RELIEF-2020",
          "SRC-NYCAC-OLYMPIA-FAIR-RENT-2021",
          "SRC-NYCAC-OLYMPIA-NIGHTLIFE-2022"
        ]
      }
    ]
  },
  {
    id: "kc-town-hall",
    surface: "/work/kc-town-hall",
    sourceOrder: [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12",
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
      "SRC-KCTH-MISSION-2018",
      "SRC-KCTH-SURVEY-2018"
    ],
    occurrences: [
      {
        id: "municipal-process",
        claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS",
        projection: "case-study",
        sourceIds: [
          "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
          "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
          "SRC-KC-TOWN-HALL-ORDINANCE-240317",
          "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12"
        ]
      },
      {
        id: "social-public-operations",
        claimId: "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS",
        projection: "case-study",
        sourceIds: [
          "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
          "SRC-KCTH-MISSION-2018",
          "SRC-KCTH-SURVEY-2018"
        ]
      }
    ]
  }
] satisfies CitationPage[];
