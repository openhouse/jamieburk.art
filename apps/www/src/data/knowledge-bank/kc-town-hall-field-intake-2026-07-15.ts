import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const project = "kc-town-hall";

export const kcTownHallFieldSourceIds = {
  proposal: "SRC-KCTH-CCED-PROPOSAL-PHASE-ONE-2019",
  memory: "SRC-KCTH-JAMIE-FIELD-PRACTICE-MEMORY-2026",
  tiresArchive: "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
  tiresUpdate: "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019"
} as const;

export const kcTownHallFieldClaimIds = {
  phaseOne: "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
  survey: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
  siteListening: "CLM-KCTH-SITE-BASED-LISTENING-PRACTICE",
  tiredOfTires: "CLM-KCTH-TIRED-OF-TIRES-OPERATIONS",
  cleveland: "CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-ROLE",
  proBonoDesign: "CLM-KCTH-PRO-BONO-NEIGHBORHOOD-DESIGN"
} as const;

export const kcTownHallFieldSourceRecords20260715 = [
  {
    id: kcTownHallFieldSourceIds.proposal,
    title: "KC Town Hall Central City Economic Development application package",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2019-03-25",
    accessedAt: reviewedAt,
    publicCitation:
      "KC Town Hall, Central City Economic Development application package with Phase One scope, budget, neighborhood-process materials, and support letters, compiled March 25, 2019.",
    publicNote:
      "The 24-page project-authored package remains outside the public repository because its appendices contain personal financial, banking, signature, and contact information.",
    protectedLocatorId: "LOC-KCTH-CCED-PROPOSAL-2019",
    supportsGenerally: [
      "Jamie Burkart and Julia Fredenburg as founders and project managers",
      "a named team spanning historic masonry, architecture, roofing, concrete, electrical work, and legal support",
      "the Phase One cold-shell scope across roof, masonry, floor framing, water service, staging, debris removal, access, transport, acquisition, safety, tools, and soft costs",
      "the package's account of 2018 construction progress and its 2019 Phase One completion label",
      "a displayed Phase One total of $189,629",
      "a neighborhood survey card developed with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "the project statement that ongoing survey results directly shaped the proposal",
      "a project-authored local-hiring and masonry-learning account",
      "third-party letters supporting the restoration and describing a listening-driven process"
    ],
    doesNotEstablish: [
      "an independent audit, completion certificate, permit history, contractor ledger, or reconciled project accounting",
      "Jamie's general-contractor title or every field-coordination duty",
      "Jamie's sole management of Phase One",
      "individual authorship of the survey card, photographs, maps, renderings, or application",
      "completion of Phase Two or the full adaptive reuse",
      "receipt or expenditure of the later CCED appropriation",
      "permission to publish the source PDF or its sensitive appendices"
    ]
  },
  {
    id: kcTownHallFieldSourceIds.memory,
    title: "Jamie Burkart first-person account of KC Town Hall field and neighborhood practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person account of KC Town Hall Phase One and related neighborhood practice, received July 15, 2026.",
    publicNote:
      "This participant-memory record preserves role and process details while keeping them distinct from independent corroboration.",
    protectedLocatorId: "LOC-KCTH-FIELD-PRACTICE-MEMORY-2026",
    supportsGenerally: [
      "Jamie's statement that he served as general contractor for Phase One",
      "daily field coordination across historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing",
      "sequencing of roof membrane and restored parapet work",
      "completion of Phase One in 2019",
      "creation of a four-by-six-inch survey handbill and backing data-collection system",
      "daily site-based gathering of neighborhood histories, appreciation, and future-use ideas",
      "TiredOfTires program design, city coordination, and recurring pickup work for Oak Park",
      "later TiredOfTires service in Indian Mound",
      "co-founding participation in Cleveland Avenue Unify to Beautify",
      "Pastor Lee's authorship of the Cleveland Avenue corridor concept",
      "identity, logo, photography, social-media, listening-session mapping, and resident-reporting support",
      "pro bono design, print production, handbill distribution, service cross-promotion, and pickup tracking"
    ],
    doesNotEstablish: [
      "independent verification of every remembered duty, date, quantity, or outcome",
      "sole credit for collective construction, neighborhood, church, association, coalition, volunteer, or city work",
      "that Jamie personally performed licensed trade work assigned to contractors",
      "the exact number of handbills, responses, tires, volunteers, meetings, or neighborhoods served",
      "that Cleveland Avenue Unify to Beautify caused a particular capital allocation",
      "the complete collaborator roster or division of labor",
      "current program, property, or stewardship status"
    ]
  },
  {
    id: kcTownHallFieldSourceIds.tiresArchive,
    title: "Tired of Tires? Free Tire Pickup",
    organization: "KC Town Hall",
    author: "Julia and Jamie",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2019-05-02",
    capturedAt: "2020-10-30",
    accessedAt: reviewedAt,
    canonicalUrl: "http://kctownhall.com/tires/",
    archiveUrl:
      "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Julia and Jamie, 'Tired of Tires? Free Tire Pickup,' KC Town Hall, published May 2, 2019; archived October 30, 2020.",
    publicNote:
      "The archived page describes a monthly free residential pickup service run by KC Town Hall with Oak Park Neighborhood Association and includes resident-request and volunteer pathways.",
    supportsGenerally: [
      "KC Town Hall and Oak Park Neighborhood Association as program partners",
      "monthly free residential tire pickup",
      "historic east Kansas City neighborhood scope",
      "resident request and volunteer intake",
      "shared Julia and Jamie source authorship"
    ],
    doesNotEstablish: [
      "Jamie's individual design or city-coordination role by itself",
      "sole operation by Jamie, Julia, KC Town Hall, or Oak Park Neighborhood Association",
      "independently audited tire, savings, participation, or neighborhood totals",
      "the complete chronology or every service area",
      "current program operation",
      "permission to publish resident submissions, contact data, or source photographs"
    ]
  },
  {
    id: kcTownHallFieldSourceIds.tiresUpdate,
    title: "KC Town Hall June 2019 TiredOfTires operating update",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-06-02",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Town Hall, public TiredOfTires operating update naming Jamie Burkart among participants, June 2, 2019.",
    publicNote:
      "The shared project account names Jamie's @urbanhermit account in thanks after a pickup and routes residents to the next recurring curbside collection.",
    supportsGenerally: [
      "Jamie's named participation in 2019",
      "a recurring free curbside tire-pickup workflow",
      "future resident intake"
    ],
    doesNotEstablish: [
      "Jamie's sole operation of the program",
      "which participant performed each task",
      "Jamie's individual program-design or city-coordination role",
      "independently audited tire or savings totals",
      "the Indian Mound expansion"
    ]
  }
] satisfies SourceRecord[];

export const kcTownHallFieldClaimRecords20260715 = [
  {
    id: kcTownHallFieldClaimIds.phaseOne,
    project,
    internalClaim:
      "Jamie served as general contractor and daily field coordinator for KC Town Hall's Phase One cold-shell restoration, which he recalls as completed in 2019. He coordinated dependencies across historic masonry, roofing, carpentry and framing, welding, engineering, architecture, and plumbing. The 2019 application independently documents Jamie and Julia as founders and project managers, names a multidisciplinary team, defines the Phase One scope, and displays $189,629 as its project-authored total; it does not independently assign the general-contractor title or function as a completion certificate or reconciled audit.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie served as Phase One general contractor and daily field coordinator for KC Town Hall's cold-shell restoration. A contemporaneous package corroborates his project-manager role, the multidisciplinary team, and the scope; the exact title, full duty list, and 2019 completion are retained as first-person evidence pending further records.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "general-contractor title",
          "daily field coordination",
          "multidisciplinary dependency management",
          "roof-membrane and parapet sequencing",
          "Phase One completion in 2019"
        ],
        locator: "first-person field-practice account: Phase One role, daily coordination, trade dependencies, and completion recollection",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: kcTownHallFieldSourceIds.proposal,
        relationship: "corroborating",
        supports: [
          "founder and project-manager role",
          "named contractor and consultant team",
          "cold-shell scope",
          "2018-2019 chronology",
          "displayed $189,629 Phase One total"
        ],
        locator:
          "PDF pages 2, 7, and 11-12: proposer roster, local-industry account, Phase One narrative, and budget.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Keep the first-person general-contractor title, complete duty list, and completion account distinct from proposal corroboration.",
      "Credit Julia Fredenburg as co-founder and project manager and retain the named trades, consultants, residents, organizations, and city staff in fuller treatments.",
      "Do not imply Jamie personally performed licensed masonry, roofing, engineering, architectural, electrical, or plumbing work assigned to others.",
      "Treat $189,629 as the package's displayed project total, not an independently audited expenditure; the visible arithmetic is not fully reconciled.",
      "Phase One cold-shell completion is not completion of Phase Two or the full adaptive reuse."
    ],
    antiClaims: [
      "Jamie single-handedly restored KC Town Hall",
      "Jamie personally performed every trade",
      "The proposal independently certifies Phase One completion",
      "The $189,629 figure is an audited expenditure",
      "Phase One completion means the full redevelopment was completed"
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: kcTownHallFieldClaimIds.survey,
    project,
    internalClaim:
      "Jamie designed a four-by-six-inch neighborhood survey handbill and backing data-collection system for KC Town Hall. The 2019 application reproduces the card, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as partners, and states that the ongoing survey directly shaped the proposal; individual design and system attribution comes from Jamie's first-person account.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie designed a compact neighborhood survey handbill and backing data workflow. A contemporaneous application reproduces the card, names two neighborhood partners, and says the ongoing survey shaped the proposal; individual design attribution remains first-person evidence.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "Jamie's design attribution",
          "four-by-six-inch format",
          "backing data-collection workflow"
        ],
        locator: "first-person field-practice account: four-by-six-inch survey card and backing data workflow",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: kcTownHallFieldSourceIds.proposal,
        relationship: "corroborating",
        supports: [
          "survey-card artifact",
          "Oak Park Neighborhood Association partnership",
          "New Horizon Missionary Baptist Church partnership",
          "the project statement that results shaped the proposal"
        ],
        locator: "PDF page 4: Neighborhood Process and reproduced survey card.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The proposal establishes the artifact, partners, and stated use; it does not identify the individual designer or data-system builder.",
      "Keep respondent names, phone numbers, email addresses, raw responses, addresses, and other participant data protected.",
      "Do not imply statistical representativeness, a response count, measured impact, or implementation of every resident request.",
      "Credit residents, Oak Park Neighborhood Association, New Horizon Missionary Baptist Church, and other participants."
    ],
    antiClaims: [
      "Jamie alone determined the neighborhood vision",
      "The survey was statistically representative",
      "Every resident response was implemented",
      "The application establishes a respondent count or measured impact"
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: kcTownHallFieldClaimIds.siteListening,
    project,
    internalClaim:
      "Jamie describes daily on-site coordination as a listening practice through which neighborhood histories, appreciation, and ideas for the building's future accumulated over time. A third-party support letter in the 2019 package corroborates that Jamie and Julia were engaged in a listening-driven process centered on surrounding-neighborhood assets and needs, but it does not independently verify each daily exchange or assign the practice to Jamie alone.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie's daily site presence joined construction coordination to neighborhood listening. A contemporaneous support letter corroborates a listening-driven process led with Julia; the daily-detail account remains first-person evidence.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "daily site presence",
          "informal gathering of neighborhood histories and future-use ideas",
          "connection between implementation and participation"
        ],
        locator: "first-person field-practice account: daily site presence and neighborhood listening practice",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: kcTownHallFieldSourceIds.proposal,
        relationship: "corroborating",
        supports: [
          "third-party description of Jamie and Julia's neighborhood engagement",
          "listening-driven project process"
        ],
        locator: "PDF pages 22-23: independent support letter.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not convert remembered conversations into quotations, resident consensus, participation totals, or measured outcomes.",
      "Credit Julia, residents, neighborhood organizations, contractors, and other participants in the listening environment.",
      "Keep identities and sensitive stories protected unless a participant separately approves public use."
    ],
    antiClaims: [
      "Jamie alone represented the neighborhood",
      "Every resident supported the project",
      "Informal site conversations constitute a statistically representative study"
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: kcTownHallFieldClaimIds.tiredOfTires,
    project,
    internalClaim:
      "Jamie designed and coordinated TiredOfTires with the City on behalf of Oak Park Neighborhood Association and conducted recurring pickup operations. An archived page jointly authored as Julia and Jamie independently documents the monthly resident-request and volunteer workflow with Oak Park, while a June 2019 project update names Jamie among participants. The deeper individual design, city-coordination, recurring-operation, and later Indian Mound details remain first-person evidence.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie reports designing and city-coordinating Oak Park's TiredOfTires service and conducting recurring pickups. An archived jointly authored page documents the monthly operating system, and a 2019 project update names him among participants; the deeper role detail remains first-person evidence.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "program design",
          "city coordination for Oak Park",
          "recurring pickup and recycling-center operations",
          "tracking and cross-promotion workflow",
          "later Indian Mound service"
        ],
        locator: "first-person field-practice account: TiredOfTires design, city coordination, pickup operations, and later service area",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: kcTownHallFieldSourceIds.tiresArchive,
        relationship: "direct-support",
        supports: [
          "KC Town Hall and Oak Park partnership",
          "monthly free residential service",
          "resident request and volunteer workflow",
          "shared Julia and Jamie authorship"
        ],
        locator: "Page metadata, introduction, request section, and author card.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFieldSourceIds.tiresUpdate,
        relationship: "corroborating",
        supports: [
          "Jamie's named participation in June 2019",
          "recurring curbside pickup and resident-intake context"
        ],
        locator: "X status 1135246124883861504: participant thanks and next-pickup intake",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Public records corroborate the operating system and Jamie's participation; the individual design, city-coordination, recurring-operation, and Indian Mound details remain first-person evidence.",
      "The archived page is jointly authored as Julia and Jamie and names KC Town Hall and Oak Park as partners; it does not assign sole authorship or operation.",
      "Do not attach project-authored tire or savings totals to Jamie as independently audited personal outcomes.",
      "Do not infer that Jamie operated every later service date or post-transition program period.",
      "Credit neighborhood associations, residents, volunteers, city and recycling staff, and other project participants."
    ],
    antiClaims: [
      "Jamie alone ran TiredOfTires",
      "Jamie personally collected every tire",
      "The available records independently audit quantities or savings",
      "Jamie operated every later service date",
      "The Indian Mound expansion is independently corroborated by the current source set"
    ],
    researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: kcTownHallFieldClaimIds.cleveland,
    project,
    internalClaim:
      "Jamie recalls serving as a co-founding member of Historic East Neighborhoods Coalition's Cleveland Avenue Unify to Beautify program and supporting Pastor Lee's corridor concept through identity, logo, photography, social media, listening-session maps, resident-reporting pathways, and print production. The current source set preserves this as a first-person research lead, not an independently corroborated public claim.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie recalls supporting Pastor Lee's Cleveland Avenue corridor concept through co-founding participation, identity, mapping, listening-session, reporting, and communications work.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "Jamie's co-founding participation",
          "Pastor Lee's origin credit",
          "identity, photography, social-media, mapping, reporting, and print support",
          "elected-official participation and capital-planning relationship as remembered context"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Retain Pastor Lee's authorship of the corridor concept and HENC's collective role.",
      "Do not claim a particular capital allocation, sole causality, formal title, or quantified outcome until corroborated.",
      "Do not publish resident reports, meeting records, contact information, or photographs without review."
    ],
    antiClaims: [
      "Jamie originated Cleveland Avenue Unify to Beautify",
      "Jamie alone founded or ran the program",
      "The program caused a particular discretionary funding decision",
      "The current source set independently verifies the full role account"
    ],
    researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: kcTownHallFieldClaimIds.proBonoDesign,
    project,
    internalClaim:
      "Jamie recalls functioning as a pro bono design studio and print shop for several east Kansas City neighborhood groups, producing and distributing handbills while conducting tire pickup and connecting residents to KC Town Hall surveys, Oak Park and Chestnut Street cleanup services, and Cleveland Avenue Unify to Beautify. This remains a first-person research lead pending artifact and collaborator recovery.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie recalls joining pro bono design and print production to recurring neighborhood field service, distributing information and gathering resident input while conducting tire pickup.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFieldSourceIds.memory,
        relationship: "private-support",
        supports: [
          "pro bono design and print production",
          "handbill distribution during field operations",
          "cross-promotion of surveys, meetings, and cleanup services",
          "pickup counting and city recycling-center handoff"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not quantify print runs, recipients, tire totals, service dates, or outcomes without dated artifacts or corroborating records.",
      "Credit Oak Park, HENC, Chestnut Street Resource Center, residents, volunteers, and city staff as collaborators and service partners.",
      "Keep private contact lists, survey responses, distribution records, and resident information protected."
    ],
    antiClaims: [
      "Jamie alone operated the neighborhood services",
      "Hundreds of handbills were distributed on a documented schedule",
      "The current source set independently verifies every organization, quantity, and route"
    ],
    researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallFieldResearchInquiries20260715 = [
  {
    id: "INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026",
    project,
    question:
      "What does the 2019 CCED application establish about Phase One, Jamie's role, multidisciplinary coordination, completion, resident input, and site-based listening?",
    methods: [
      "Inspected PDF metadata and extracted text from the complete 24-page package.",
      "Rendered and visually reviewed proposer, neighborhood-process, local-industry, budget, and support-letter pages.",
      "Separated project-authored statements, third-party support letters, Jamie's later first-person account, and sensitive appendices by source function.",
      "Kept the source PDF, local paths, personal financial information, contact details, signatures, and unapproved photographs outside the public repository."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The package names Jamie and Julia as founders and project managers and identifies a multidisciplinary team.",
      "It defines Phase One as a cold shell, describes substantial 2018 progress, uses a 2019 completion label, and displays a $189,629 project total.",
      "The visible budget arithmetic does not fully reconcile, so the displayed total is not promoted as an audited expenditure.",
      "The package reproduces a resident survey card, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as partners, and says survey results shaped the proposal.",
      "A third-party support letter corroborates a listening-driven neighborhood process led by Jamie and Julia.",
      "The package corroborates management context, team, scope, and participatory mechanics but does not independently assign Jamie the general-contractor title, survey authorship, every field duty, or final completion."
    ],
    limitations: [
      "The package is an application with selected support letters, not an independent audit, permit history, contractor ledger, or completion certificate.",
      "The 2019 completion label appears in a package compiled in March 2019 and must remain paired with Jamie's later first-person completion account unless later records are recovered.",
      "The package does not establish Phase Two completion, later appropriation expenditure, current property status, or the stewardship transition.",
      "The protected source contains personal financial and contact information and must not be committed or publicly linked."
    ],
    sourceIds: [kcTownHallFieldSourceIds.proposal, kcTownHallFieldSourceIds.memory],
    publicSummary:
      "The application and Jamie's participant account jointly support a bounded record of Phase One coordination, survey infrastructure, and site-based listening while keeping exact role attribution and completion status source-aware.",
    protectedLocatorId: "LOC-KCTH-CCED-PROPOSAL-2019"
  },
  {
    id: "INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026",
    project,
    question:
      "Which parts of Jamie's TiredOfTires, Cleveland Avenue Unify to Beautify, and pro bono neighborhood design account can the current source set corroborate?",
    methods: [
      "Reviewed the archived Tired of Tires page, its metadata, partnership language, intake workflow, and shared author record.",
      "Reviewed the complete authenticated @KCTownHall status population for program, role, place, and chronology evidence.",
      "Separated public evidence of the operating system and Jamie's participation from first-person role details and uncorroborated program expansion or policy-outcome claims."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The archived page documents a monthly free residential tire-pickup service run by KC Town Hall with Oak Park Neighborhood Association and is jointly authored as Julia and Jamie.",
      "A June 2019 project-account update names Jamie's account among participants after a pickup and routes residents to the next collection.",
      "The public sources corroborate the operating system and Jamie's participation, but not his complete design, city-coordination, or recurring field role.",
      "The current source set does not independently establish the Indian Mound expansion, Cleveland Avenue role, pro bono print quantities, or a causal connection to capital allocations."
    ],
    limitations: [
      "Shared project surfaces do not assign every action or post to Jamie.",
      "The current source set lacks a city work order, neighborhood-association minutes, HENC record, Cleveland Avenue artifact set, collaborator statement, and dated print-production ledger.",
      "Do not publish resident submissions, telephone numbers, addresses, private messages, volunteer records, or unreviewed photographs."
    ],
    sourceIds: [
      kcTownHallFieldSourceIds.memory,
      kcTownHallFieldSourceIds.tiresArchive,
      kcTownHallFieldSourceIds.tiresUpdate
    ],
    publicSummary:
      "TiredOfTires' monthly operating system and Jamie's 2019 participation are corroborated. Deeper individual role details remain source-labeled, while Cleveland Avenue and pro bono design details remain active research leads.",
    protectedLocatorId: "LOC-KCTH-FIELD-PRACTICE-MEMORY-2026"
  }
] satisfies ResearchInquiry[];

export const kcTownHallFieldIntakeRecords20260715 = [
  {
    id: "INTAKE-KCTH-PHASE-ONE-FIELD-PRACTICE-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival review",
    kind: "possible-claim",
    title: "KC Town Hall Phase One field coordination and completion account",
    publicSafeSummary:
      "A protected 2019 application and Jamie's participant account preserve a bounded professional record of multidisciplinary cold-shell construction coordination completed in 2019.",
    whyItMatters:
      "Adds concrete general-contractor, dependency-sequencing, vendor-coordination, and built-environment implementation evidence to the technical-project-management record.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: [kcTownHallFieldSourceIds.proposal, kcTownHallFieldSourceIds.memory],
    claimIds: [kcTownHallFieldClaimIds.phaseOne, kcTownHallFieldClaimIds.siteListening],
    inquiryIds: ["INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026"],
    limitations: [
      "The exact general-contractor title, full duty list, and completion account are first-person evidence; the package corroborates role context, team, scope, and schedule.",
      "The source PDF remains protected because it contains sensitive appendices."
    ],
    nextActions: [
      "Recover later-dated permits, invoices, inspections, contractor records, photographs, or collaborator confirmation for the completion chronology and individual duties.",
      "Review a hiring-site projection only when its audience value exceeds the added explanation burden."
    ]
  },
  {
    id: "INTAKE-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival review",
    kind: "possible-claim",
    title: "KC Town Hall neighborhood survey handbill and data workflow",
    publicSafeSummary:
      "Jamie reports designing a compact survey and data workflow; the 2019 application reproduces the artifact, names two neighborhood partners, and says the ongoing results shaped the proposal.",
    whyItMatters:
      "Connects field presence to a repeatable participatory-research system rather than treating community engagement as atmosphere.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: [kcTownHallFieldSourceIds.proposal, kcTownHallFieldSourceIds.memory],
    claimIds: [kcTownHallFieldClaimIds.survey],
    inquiryIds: ["INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026"],
    limitations: [
      "Individual design attribution remains first-person evidence.",
      "Respondent identities, contact details, and raw responses stay protected."
    ],
    nextActions: [
      "Recover the original print file, response schema, public-safe aggregate outputs, or a collaborator confirmation.",
      "Do not publish raw survey records."
    ]
  },
  {
    id: "INTAKE-KCTH-TIRED-OF-TIRES-OPERATIONS-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival review",
    kind: "possible-claim",
    title: "TiredOfTires neighborhood service operations",
    publicSafeSummary:
      "Public records corroborate a monthly Oak Park tire-pickup operating system and Jamie's 2019 participation; Jamie's deeper design, city-coordination, recurring-operation, and Indian Mound account remains first-person evidence.",
    whyItMatters:
      "Shows service design across intake, routing, field execution, recycling handoff, tracking, communication, and recurring delivery.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [
      kcTownHallFieldSourceIds.memory,
      kcTownHallFieldSourceIds.tiresArchive,
      kcTownHallFieldSourceIds.tiresUpdate
    ],
    claimIds: [kcTownHallFieldClaimIds.tiredOfTires],
    inquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    limitations: [
      "Do not infer sole operation, audited outcome totals, every later service date, or independent corroboration of the Indian Mound expansion.",
      "Keep resident requests and contact data protected."
    ],
    nextActions: [
      "Locate Oak Park or city records that assign program design and coordination roles.",
      "Locate dated evidence for the Indian Mound expansion before projecting it publicly."
    ]
  },
  {
    id: "INTAKE-KCTH-CLEVELAND-AND-PRO-BONO-DESIGN-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex archival review",
    kind: "memory",
    title: "Cleveland Avenue Unify to Beautify and pro bono neighborhood design practice",
    publicSafeSummary:
      "Jamie recalls supporting Pastor Lee's corridor concept and multiple east Kansas City neighborhood groups through co-founding participation, identity, mapping, reporting pathways, print production, and field distribution.",
    whyItMatters:
      "Preserves a potentially strong corridor-scale civic-communication and cross-channel service-design practice without prematurely publishing unsupported role or outcome claims.",
    projectHints: [project],
    maturity: "research-needed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: [kcTownHallFieldSourceIds.memory],
    claimIds: [kcTownHallFieldClaimIds.cleveland, kcTownHallFieldClaimIds.proBonoDesign],
    inquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    limitations: [
      "The current source set does not independently corroborate the Cleveland Avenue role, Indian Mound expansion, print quantities, or capital-planning relationship.",
      "Pastor Lee's authorship of the corridor concept and HENC's collective role must remain explicit."
    ],
    nextActions: [
      "Recover program flyers, logos, maps, account records, HENC or neighborhood minutes, city meeting records, funding documents, print files, photographs, and collaborator accounts.",
      "Keep the claims held from public projection until corroborated and compositionally selected."
    ]
  }
] satisfies IntakeRecord[];
