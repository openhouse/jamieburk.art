import type { KnowledgeBank } from "./schema.ts";
import { urbanhermitSourceIds } from "./urbanhermit.ts";

const projectId = "kc-town-hall";
const reportUrl =
  "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/kc-town-hall-phase-one-and-neighborhood-practice.md";

export const kcTownHallPhaseOneSourceIds = {
  proposal: "SRC-KCTH-CCED-PROPOSAL-PHASE-ONE-2019-03-25",
  firsthandAccount:
    "SRC-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-MEMORY-2026-07-15",
  tiredOfTiresArchive: "SRC-KCTH-TIRED-OF-TIRES-GHOST-EXPORT-2020-12-11",
} as const;

export const kcTownHallPhaseOneClaimIds = {
  fieldCoordination: "CLM-KCTH-PHASE-ONE-FIELD-COORDINATION",
  neighborhoodSurvey: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
  tiredOfTires: "CLM-KCTH-TIRED-OF-TIRES-PROGRAM-OPERATIONS",
} as const;

export const kcTownHallPhaseOneSources = [
  {
    id: kcTownHallPhaseOneSourceIds.proposal,
    title:
      "KC Town Hall Central City Economic Development application package",
    author: "KC Town Hall",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2019-03-25",
    accessedAt: "2026-07-15",
    publicCitation:
      "KC Town Hall, Central City Economic Development application package with Phase One budget and support letters, compiled March 25, 2019.",
    publicNote:
      "A close reading of the 24-page project-authored package documented Jamie Burkart and Julia Fredenburg as founders and project managers; a named contractor and consultant team; the neighborhood survey card and process; local hiring and masonry-learning statements; and a displayed $189,629 Phase One cold-shell total. The source PDF remains outside the public repository because its appendices contain personal financial and contact information.",
    protectedLocatorId: "LOC-KCTH-CCED-PROPOSAL-2019-03-25",
    supportsGenerally: [
      "Jamie Burkart and Julia Fredenburg founder and project-manager roles",
      "named historic-masonry, architecture, roofing, concrete, electrical, and legal collaborators",
      "an ongoing neighborhood survey with the Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "the proposal statement that survey results directly shaped the application",
      "a project-authored statement that more than fifteen minority-owned contractors with nearby team members worked on the project in 2018",
      "masonry skills learning facilitated by Earl Brown",
      "a displayed $189,629 Phase One cold-shell total",
      "Phase One budget categories for roof, masonry, floor framing, water service, construction staging, debris removal, access, materials, and site safety",
      "the package's 2019 Phase One completion label and 2018 progress account",
      "Oak Park Neighborhood Association and independent community-professional support letters",
    ],
    doesNotEstablish: [
      "an independent audit of the Phase One budget, completion, contractor count, or project outcomes",
      "arithmetically reconciled Phase One year columns or row subtotals",
      "Jamie's general-contractor title or every field-coordination duty",
      "Jamie's sole management of the restoration",
      "individual authorship of the proposal, survey card, photographs, maps, or renderings",
      "completion of Phase Two or the full adaptive reuse",
      "execution, receipt, or expenditure of the later CCED appropriation",
      "permission to publish personal financial records, contact details, addresses, signatures, or source photographs",
    ],
  },
  {
    id: kcTownHallPhaseOneSourceIds.firsthandAccount,
    title:
      "Jamie Burkart first-person account of KC Town Hall Phase One and neighborhood practice",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart first-person account of KC Town Hall Phase One restoration and related neighborhood practice, received July 15, 2026.",
    publicNote:
      "Jamie describes serving as Phase One general contractor and daily field coordinator; designing a resident survey handbill and data workflow; designing, coordinating with the city, and operating the Oak Park TiredOfTires program; supporting Cleveland Avenue Unify to Beautify; and providing pro bono design and print production for neighborhood groups. The account is retained as first-person evidence and explicitly separated from independent corroboration.",
    protectedLocatorId: "LOC-KCTH-FIRSTHAND-PRACTICE-2026-07-15",
    supportsGenerally: [
      "Jamie's first-person general-contractor role statement",
      "daily field coordination from basement through scaffolding and roof deck",
      "coordination across masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams",
      "creation of a four-by-six-inch survey handbill and backing data-collection system",
      "neighborhood histories, stories, and future-use ideas gathered through daily on-site presence",
      "TiredOfTires program design, city coordination, and recurring field operation",
      "later TiredOfTires service in the Indian Mound neighborhood",
      "co-founding participation in Cleveland Avenue Unify to Beautify",
      "Pastor Lee's authorship of the Cleveland Avenue corridor concept",
      "identity, logo, photography, social, mapping, listening-session, and resident-reporting support",
      "pro bono neighborhood design and print production",
      "cross-promotion of neighborhood services while conducting tire pickup",
    ],
    doesNotEstablish: [
      "independent verification of every remembered duty, date, quantity, or outcome",
      "sole credit for collective construction, neighborhood, association, church, coalition, or city work",
      "that Jamie personally performed licensed trade work assigned to contractors",
      "the exact number of handbills, survey responses, tires, volunteers, meetings, or neighborhoods served",
      "that Cleveland Avenue Unify to Beautify caused a particular capital allocation",
      "the complete collaborator roster or division of labor",
      "current program or property status",
    ],
  },
  {
    id: kcTownHallPhaseOneSourceIds.tiredOfTiresArchive,
    title: "KC Town Hall Tired of Tires page in the 2020 Ghost export",
    author: "Julia and Jamie",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2019-05-02",
    capturedAt: "2020-12-11",
    accessedAt: "2026-07-15",
    publicCitation:
      "KC Town Hall, 'Tired of Tires? Free Tire Pickup,' published May 2, 2019 and preserved in a December 11, 2020 Ghost export.",
    publicNote:
      "The project page describes KC Town Hall and the Oak Park Neighborhood Association as operating a monthly free residential tire-pickup service in historic east Kansas City neighborhoods. It contains resident request, volunteer, telephone, and city-recycling workflow language. The source author identity is shared as 'Julia and Jamie,' so it does not isolate individual authorship or operation.",
    protectedLocatorId: "LOC-KCTH-GHOST-EXPORT-TIRES-2020-12-11",
    supportsGenerally: [
      "KC Town Hall and Oak Park Neighborhood Association collaboration",
      "monthly free residential tire-pickup service",
      "historic east Kansas City neighborhood scope",
      "resident request and volunteer intake workflow",
      "city-supported free tire recycling context",
      "shared Julia and Jamie source authorship",
    ],
    doesNotEstablish: [
      "Jamie's individual design or coordination role by itself",
      "sole operation by Jamie, Julia, KC Town Hall, or the neighborhood association",
      "independently audited tire, cost-savings, participation, or neighborhood totals",
      "the complete program chronology or every service area",
      "current program operation",
      "permission to publish resident submissions or contact data",
    ],
  },
] satisfies KnowledgeBank["sources"];

export const kcTownHallPhaseOneClaims = [
  {
    id: kcTownHallPhaseOneClaimIds.fieldCoordination,
    project: projectId,
    internalClaim:
      "Jamie served as general contractor for KC Town Hall's 2018-2019 Phase One cold-shell restoration, coordinating a multidisciplinary field team across historic masonry, roofing, structural carpentry and framing, welding, engineering, architecture, and plumbing. A contemporaneous proposal independently documents him as founder and project manager, names key contractors and consultants, and displays $189,629 as the Phase One total; the general-contractor title and complete duty list come from Jamie's first-person account, and the proposal's visible budget arithmetic does not fully reconcile.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie served as KC Town Hall's Phase One general contractor and daily field coordinator. A contemporaneous project package independently documents his founder/project-manager role, a named multidisciplinary local team, and a displayed $189,629 cold-shell total; Jamie's exact general-contractor title and complete duty list are first-person evidence, and the source arithmetic remains unreconciled.",
        status: "active",
        citationRequired: false,
        surfaces: [reportUrl],
      },
    ],
    evidence: [
      {
        sourceId: kcTownHallPhaseOneSourceIds.firsthandAccount,
        relationship: "private-support",
        supports: [
          "general-contractor title",
          "daily field coordination",
          "multidisciplinary team coordination",
          "roof and parapet sequence detail",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcTownHallPhaseOneSourceIds.proposal,
        relationship: "corroborating",
        supports: [
          "founder and project-manager role",
          "named contractor and consultant team",
          "displayed $189,629 Phase One total",
          "cold-shell scope and 2018-2019 chronology",
        ],
        locator:
          "PDF pages 2, 7, 11, and 12: proposer roster; local-industry progress; Phase One summary; Phase One budget.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The general-contractor title and complete duty list are Jamie's first-person evidence; the proposal corroborates project-management context, team, scope, and chronology rather than independently assigning every duty.",
      "Credit Julia Fredenburg as co-founder and project manager and retain named trade, design, engineering, legal, neighborhood, church, and city collaborators in fuller treatments.",
      "Do not imply Jamie personally performed licensed masonry, roofing, electrical, engineering, architectural, or plumbing work assigned to others.",
      "Treat $189,629 as the proposal's displayed Phase One total, not an independently audited expenditure: the visible 2018 and 2019 column totals and at least one row subtotal do not reconcile to the displayed total.",
      "The PDF's 2019 completion label and Jamie's completion account do not establish completion of Phase Two or the full adaptive reuse.",
    ],
    antiClaims: [
      "Jamie single-handedly restored KC Town Hall",
      "Jamie personally performed every trade",
      "The $189,629 Phase One budget is an independently audited spend",
      "The 2019 Phase One record proves completion of the full project",
      "The later $490,539 CCED appropriation paid for Phase One",
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-COORDINATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex archival-production and PDF close reading",
    ],
  },
  {
    id: kcTownHallPhaseOneClaimIds.neighborhoodSurvey,
    project: projectId,
    internalClaim:
      "Jamie designed a four-by-six-inch neighborhood survey handbill and backing data-collection workflow for KC Town Hall. The 2019 proposal reproduces the card, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as survey partners, and states that results of the ongoing survey directly shaped the proposal; individual design and system attribution comes from Jamie's first-person account.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie designed a compact neighborhood survey handbill and backing data workflow. The 2019 application reproduces the card, names two neighborhood partners, and says the ongoing survey directly shaped the proposal; the individual design attribution remains first-person evidence.",
        status: "active",
        citationRequired: false,
        surfaces: [reportUrl],
      },
    ],
    evidence: [
      {
        sourceId: kcTownHallPhaseOneSourceIds.firsthandAccount,
        relationship: "private-support",
        supports: [
          "Jamie's survey-handbill design attribution",
          "four-by-six-inch format",
          "backing data-collection workflow",
          "daily contact and neighborhood-imagination gathering",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcTownHallPhaseOneSourceIds.proposal,
        relationship: "corroborating",
        supports: [
          "survey-card artifact",
          "Oak Park Neighborhood Association partnership",
          "New Horizon Missionary Baptist Church partnership",
          "proposal statement that survey results shaped the application",
        ],
        locator:
          "PDF page 4: Neighborhood Process, survey card, partner names, and direct-shaping statement; pages 22-23: listening-driven support letter.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The proposal establishes the survey artifact, partners, and stated use; it does not identify the card's individual designer or data-system builder.",
      "Do not publish respondent names, contact details, raw responses, addresses, or other participant data.",
      "Do not convert the project-authored shaping statement into a quantified participation or outcome claim.",
      "Credit the Oak Park Neighborhood Association, New Horizon Missionary Baptist Church, residents, and other participants in fuller treatments.",
    ],
    antiClaims: [
      "Jamie alone determined the neighborhood vision",
      "Every resident response was implemented",
      "The survey was statistically representative",
      "The proposal establishes a respondent count or measured impact",
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-COORDINATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex archival-production and PDF close reading",
    ],
  },
  {
    id: kcTownHallPhaseOneClaimIds.tiredOfTires,
    project: projectId,
    internalClaim:
      "Jamie designed and coordinated TiredOfTires with the City on behalf of the Oak Park Neighborhood Association and conducted recurring pickup operations. A shared Julia-and-Jamie project archive independently documents the monthly resident-intake and volunteer workflow with Oak Park, while public accounts name Jamie in the operating work and document one dump-truck pickup shift; the full individual design and coordination attribution remains first-person evidence.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie reports designing and city-coordinating the Oak Park TiredOfTires service and conducting its recurring field operations. A shared project archive documents the monthly resident-intake and volunteer system, while two public records independently corroborate his direct participation.",
        status: "active",
        citationRequired: true,
        surfaces: [reportUrl],
      },
    ],
    evidence: [
      {
        sourceId: kcTownHallPhaseOneSourceIds.firsthandAccount,
        relationship: "private-support",
        supports: [
          "program design",
          "city coordination for Oak Park",
          "recurring field operations",
          "later Indian Mound service memory",
          "cross-promotion and tracking workflow",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcTownHallPhaseOneSourceIds.tiredOfTiresArchive,
        relationship: "corroborating",
        supports: [
          "KC Town Hall and Oak Park collaboration",
          "monthly free residential service",
          "request and volunteer workflow",
          "historic east neighborhood scope",
        ],
        locator:
          "Ghost export post 'Tired of Tires? Free Tire Pickup,' shared author record 'Julia and Jamie.'",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: urbanhermitSourceIds.tiresKcTownHall,
        relationship: "corroborating",
        supports: [
          "KC Town Hall account naming Jamie among participants",
          "recurring curbside workflow",
        ],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: urbanhermitSourceIds.tiresJimmy,
        relationship: "corroborating",
        supports: [
          "Jamie's direct field participation",
          "dump-truck pickup shift",
          "Northeast Kansas City service context",
        ],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The two public records establish direct participation; Jamie's first-person account supplies the deeper design, city-coordination, recurring-operation, and Indian Mound details.",
      "The Ghost source is jointly authored as Julia and Jamie and describes KC Town Hall and Oak Park as collaborators; it cannot assign sole individual authorship or operation.",
      "Do not attach project-authored tire or cost-savings totals to Jamie as independently audited personal outcomes.",
      "Do not infer that Jamie operated every later service date or post-transition program period.",
      "Retain neighborhood associations, volunteers, residents, city staff, recycling staff, and other project participants as part of the operating system.",
    ],
    antiClaims: [
      "Jamie alone ran TiredOfTires",
      "Jamie personally collected every tire",
      "The available records independently audit quantities or savings",
      "The current program or every later service date was operated by Jamie",
      "Indian Mound expansion is independently corroborated by the current source set",
    ],
    researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex archival-production and public-source review",
    ],
  },
] satisfies KnowledgeBank["claims"];

export const kcTownHallPhaseOneResearchInquiries = [
  {
    id: "INQ-KCTH-PHASE-ONE-COORDINATION-2026",
    project: projectId,
    question:
      "What does the 2019 CCED application package establish about KC Town Hall Phase One, Jamie's role, the multidisciplinary team, completion, and the neighborhood survey system?",
    methods: [
      "Inspected PDF metadata and extracted text from all 24 pages.",
      "Rendered and visually reviewed the proposer, neighborhood-process, local-industry, budget, and support-letter pages.",
      "Separated the project-authored proposal, third-party support letters, and sensitive financial appendices by source function.",
      "Compared the package with Jamie's July 15 first-person account and the existing KC Town Hall official-record and public-account research.",
      "Searched bounded local project, iCloud Teams, Google Drive Desktop, and Sites text surfaces for additional TiredOfTires and Cleveland Avenue evidence.",
      "Kept raw source files, contact information, personal financial data, signatures, and unapproved photographs outside the public repository.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The proposal directly names Jamie and Julia as founders and project managers and names six trade, design, and legal team roles on its proposer page.",
      "The package defines Phase One as a cold shell, states 66 percent was complete after 2018, labels the Phase One budget completed in 2019, and displays $189,629 as the total Phase One value.",
      "The visible budget arithmetic does not fully reconcile: the displayed 2018 and 2019 column totals add to $191,895 rather than $189,629, and the legal-fee row's visible year values add to $7,003 rather than its displayed $6,530 total.",
      "The budget and narrative cover roof, masonry, floor framing, water service, construction staging, debris removal, tree removal, basement access, transport, acquisition, safety, air quality, tools, and soft costs.",
      "The package states that more than fifteen minority-owned contractors with nearby team members worked on the project in 2018 and names Earl Brown as a restoration mason and trade mentor; these remain project-authored statements rather than an independent audit.",
      "The neighborhood-process page reproduces a contact-enabled survey card, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as partners, and says the ongoing survey directly shaped the proposal.",
      "A third-party support letter describes Jamie and Julia as engaged in a listening-driven process centered on surrounding-neighborhood assets and needs.",
      "The package corroborates management context, team, scope, and participatory process but does not independently assign Jamie the general-contractor title, the survey-design attribution, or every field duty he recalls.",
    ],
    limitations: [
      "The package is first-party application material with selected third-party letters, not an independent audit, permit history, contractor ledger, or completion certificate.",
      "The budget-table inconsistency is a medium-severity citation risk: use the $189,629 figure only as the proposal's displayed total until invoices or a reconciled ledger establish actual Phase One cost.",
      "The 2019 completion label appears inside a March 2019 compiled application; without invoices, permits, inspection records, or later dated documentation, it should remain paired with Jamie's first-person completion account.",
      "The public repository does not contain the source PDF because its appendices expose personal financial and contact information.",
      "A bounded web and local search did not recover an official permit result or independent Cleveland Avenue record; this is not proof that none exists.",
      "The source package does not establish Phase Two completion, appropriation expenditure, current property status, or the later stewardship transition.",
    ],
    sourceIds: [
      kcTownHallPhaseOneSourceIds.proposal,
      kcTownHallPhaseOneSourceIds.firsthandAccount,
    ],
    publicSummary:
      "The 2019 package and Jamie's first-person account jointly support a bounded Phase One field-coordination and neighborhood-survey record. The proposal corroborates role context, team, scope, budget, and participation mechanics; individual duty attribution remains explicitly first-person where the package is silent.",
    protectedLocatorId: "LOC-KCTH-CCED-PROPOSAL-2019-03-25",
  },
  {
    id: "INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026",
    project: projectId,
    question:
      "Which parts of Jamie's TiredOfTires, Cleveland Avenue Unify to Beautify, and pro bono neighborhood design-and-print account can the current source set corroborate?",
    methods: [
      "Parsed the local KC Town Hall Ghost export with structured JSON tools and reviewed the Tired of Tires page and shared author record.",
      "Reused the governed KC Town Hall and participant public sources already associated with Jamie's direct tire-pickup participation.",
      "Searched bounded local project, iCloud Teams, Google Drive Desktop, and Sites text surfaces for Cleveland Avenue, Unify to Beautify, TiredOfTires, and Tired of Tires.",
      "Separated project-level operation, jointly authored project records, independently corroborated participation, and first-person role detail.",
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The Ghost export preserves a monthly free residential tire-pickup page jointly authored as Julia and Jamie and operated by KC Town Hall with Oak Park Neighborhood Association.",
      "The page documents request and volunteer intake, city-supported recycling context, and a historic east neighborhood service frame.",
      "Two public social sources independently connect Jamie to recurring tire-pickup field operations, including one dump-truck shift.",
      "The current source set does not independently establish Jamie's program-design and city-coordination role, the Indian Mound expansion, the Cleveland Avenue Unify to Beautify role, or the pro bono print-production quantity.",
      "No bounded text search result for Cleveland Avenue or Unify to Beautify was recovered in the reviewed local surfaces.",
    ],
    limitations: [
      "The project export and public account are shared surfaces and do not assign every action to Jamie.",
      "The source set does not include a city work order, neighborhood-association minutes, program flyer, HENC record, listening-session map, social-account custody record, or collaborator statement for the deeper role claims.",
      "A bounded text search cannot establish that visual, cloud-only, unmaterialized, unindexed, or differently named records do not exist.",
      "Do not publish resident submissions, phone numbers, addresses, private messages, or volunteer records.",
    ],
    sourceIds: [
      kcTownHallPhaseOneSourceIds.firsthandAccount,
      kcTownHallPhaseOneSourceIds.tiredOfTiresArchive,
      urbanhermitSourceIds.tiresKcTownHall,
      urbanhermitSourceIds.tiresJimmy,
    ],
    publicSummary:
      "The TiredOfTires operating system and Jamie's direct participation are corroborated. His design and coordination account is preserved with a first-person boundary; Cleveland Avenue and pro bono print-production details remain active research leads.",
    protectedLocatorId: "LOC-KCTH-NEIGHBORHOOD-PRACTICE-2026-07-15",
  },
] satisfies KnowledgeBank["researchInquiries"];

export const kcTownHallPhaseOneIntakeItems = [
  {
    id: "INTAKE-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-2026-07-15",
    title: "KC Town Hall Phase One and neighborhood implementation practice",
    project: projectId,
    kind: "claim-candidate",
    summary:
      "A protected 2019 application package, Jamie's first-person account, a structured Ghost export, and two public participation records recover a professional practice spanning multidisciplinary construction coordination, resident-input systems, recurring neighborhood service operations, and research leads for corridor-scale design support.",
    status: "integrated",
    sourceIds: [
      kcTownHallPhaseOneSourceIds.proposal,
      kcTownHallPhaseOneSourceIds.firsthandAccount,
      kcTownHallPhaseOneSourceIds.tiredOfTiresArchive,
      urbanhermitSourceIds.tiresKcTownHall,
      urbanhermitSourceIds.tiresJimmy,
    ],
    relatedClaimIds: Object.values(kcTownHallPhaseOneClaimIds),
    relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
    candidateClaims: [
      "Jamie served as general contractor for KC Town Hall's 2018-2019 Phase One cold-shell restoration, coordinating a multidisciplinary field team across historic masonry, roofing, structural carpentry and framing, welding, engineering, architecture, and plumbing. A contemporaneous proposal independently documents him as founder and project manager, names key contractors and consultants, and displays $189,629 as the Phase One total; the general-contractor title and complete duty list come from Jamie's first-person account, and the proposal's visible budget arithmetic does not fully reconcile.",
      "Jamie designed a four-by-six-inch neighborhood survey handbill and backing data-collection workflow for KC Town Hall. The 2019 proposal reproduces the card, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as survey partners, and states that results of the ongoing survey directly shaped the proposal; individual design and system attribution comes from Jamie's first-person account.",
      "Jamie designed and coordinated TiredOfTires with the City on behalf of the Oak Park Neighborhood Association and conducted recurring pickup operations. A shared Julia-and-Jamie project archive independently documents the monthly resident-intake and volunteer workflow with Oak Park, while public accounts name Jamie in the operating work and document one dump-truck pickup shift; the full individual design and coordination attribution remains first-person evidence.",
    ],
    propositions: [
      {
        id: "PROP-KCTH-PHASE-ONE-FIELD-COORDINATION-2026",
        text: "Jamie served as general contractor for KC Town Hall's 2018-2019 Phase One cold-shell restoration, coordinating a multidisciplinary field team across historic masonry, roofing, structural carpentry and framing, welding, engineering, architecture, and plumbing. A contemporaneous proposal independently documents him as founder and project manager, names key contractors and consultants, and displays $189,629 as the Phase One total; the general-contractor title and complete duty list come from Jamie's first-person account, and the proposal's visible budget arithmetic does not fully reconcile.",
        status: "supported-with-boundary",
        sourceIds: [
          kcTownHallPhaseOneSourceIds.proposal,
          kcTownHallPhaseOneSourceIds.firsthandAccount,
        ],
        sourceSupport: [
          "first-person general-contractor and duty account",
          "contemporaneous founder and project-manager role",
          "named multidisciplinary team",
          "displayed $189,629 project-authored Phase One total",
          "cold-shell scope and 2018-2019 chronology",
        ],
        boundaries: [
          "Keep the first-person role attribution separate from proposal corroboration.",
          "Credit Julia and the named trades, consultants, residents, and organizations.",
          "Do not treat a project budget as audited expenditure or Phase One as full-project completion; the visible source arithmetic does not fully reconcile.",
        ],
        decisionUse:
          "Supports a concrete technical-project-management claim about field coordination, dependency sequencing, vendor alignment, and public-interest implementation.",
      },
      {
        id: "PROP-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM-2026",
        text: "Jamie designed a four-by-six-inch neighborhood survey handbill and backing data-collection workflow for KC Town Hall. The 2019 proposal reproduces the card, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as survey partners, and states that results of the ongoing survey directly shaped the proposal; individual design and system attribution comes from Jamie's first-person account.",
        status: "supported-with-boundary",
        sourceIds: [
          kcTownHallPhaseOneSourceIds.proposal,
          kcTownHallPhaseOneSourceIds.firsthandAccount,
        ],
        sourceSupport: [
          "first-person design and data-workflow attribution",
          "reproduced survey artifact",
          "two named neighborhood partners",
          "proposal statement that results shaped the application",
        ],
        boundaries: [
          "The source does not identify the individual designer or establish representativeness, response count, or measured outcome.",
          "Keep resident records and contact details private.",
        ],
        decisionUse:
          "Supports a participatory-research and implementation claim showing how field presence became a reusable resident-input system.",
      },
      {
        id: "PROP-KCTH-TIRED-OF-TIRES-OPERATIONS-2026",
        text: "Jamie designed and coordinated TiredOfTires with the City on behalf of the Oak Park Neighborhood Association and conducted recurring pickup operations. A shared Julia-and-Jamie project archive independently documents the monthly resident-intake and volunteer workflow with Oak Park, while public accounts name Jamie in the operating work and document one dump-truck pickup shift; the full individual design and coordination attribution remains first-person evidence.",
        status: "synthesis-with-boundary",
        sourceIds: [
          kcTownHallPhaseOneSourceIds.firsthandAccount,
          kcTownHallPhaseOneSourceIds.tiredOfTiresArchive,
          urbanhermitSourceIds.tiresKcTownHall,
          urbanhermitSourceIds.tiresJimmy,
        ],
        sourceSupport: [
          "first-person design and city-coordination account",
          "monthly resident and volunteer workflow",
          "Oak Park collaboration",
          "two independent public participation records",
        ],
        boundaries: [
          "Direct participation is independently corroborated; deeper individual design and coordination remains first-person evidence.",
          "Do not claim sole operation, unaudited quantities, every later service date, or independent corroboration of the Indian Mound expansion.",
        ],
        decisionUse:
          "Supports an operating-systems claim about turning city disposal capacity into a recurring neighborhood service with intake, routing, field execution, tracking, and handoff points.",
      },
      {
        id: "PROP-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-MEMORY-2026",
        text: "Jamie recalls serving as a co-founding member of Historic East Neighborhoods Coalition's Cleveland Avenue Unify to Beautify program and supporting Pastor Lee's corridor concept through identity, logo, photography, social, listening-session maps, resident-reporting pathways, and pro bono print production.",
        status: "memory-lead",
        sourceIds: [kcTownHallPhaseOneSourceIds.firsthandAccount],
        sourceSupport: [
          "Jamie's first-person role and artifact account",
          "Pastor Lee's origin credit",
        ],
        boundaries: [
          "Retain Pastor Lee's authorship of the corridor concept and HENC's collective context.",
          "Do not claim a particular discretionary funding outcome or quantify print production until corroborated.",
        ],
        decisionUse:
          "Preserves a potentially strong corridor-scale civic communication and participatory-mapping accomplishment for future source development.",
        nextStep:
          "Locate program flyers, logo files, maps, social-account history, HENC or neighborhood minutes, city meeting records, funding documents, and a collaborator account from Pastor Lee or another participant.",
      },
      {
        id: "PROP-KCTH-PRO-BONO-NEIGHBORHOOD-DESIGN-STUDIO-MEMORY-2026",
        text: "Jamie recalls functioning as a pro bono design studio and print shop for several east Kansas City neighborhood groups, producing and circulating handbills while conducting tire pickup and connecting residents to surveys, meetings, and cleanup services.",
        status: "memory-lead",
        sourceIds: [kcTownHallPhaseOneSourceIds.firsthandAccount],
        sourceSupport: ["Jamie's first-person operating account"],
        boundaries: [
          "Do not quantify packets, recipients, service dates, or outcomes without artifact or collaborator evidence.",
          "Retain the neighborhood organizations and city staff as collaborators rather than treating the work as a solo campaign.",
        ],
        decisionUse:
          "Preserves a concrete cross-channel service-design practice that may connect field operations, public communication, and resident participation.",
        nextStep:
          "Recover dated handbills, print files, distribution notes, pickup spreadsheets, neighborhood newsletters, meeting packets, photographs, and collaborator confirmation.",
      },
    ],
    tensions: [],
    researchQuestions: [
      "Which permit, invoice, inspection, contractor, architect, engineer, photograph, or collaborator records can independently establish Jamie's Phase One general-contractor duties and completion chronology?",
      "Can the original survey card, response schema, aggregate output, or collaborator account define the survey workflow without exposing resident data?",
      "Which city or neighborhood records establish Jamie's TiredOfTires design and coordination role and the Indian Mound expansion?",
      "Which HENC, neighborhood, church, elected-official, or city records establish Cleveland Avenue Unify to Beautify's chronology, artifact authorship, participation, and capital-planning relationship?",
      "Which rights-cleared Phase One, survey, tire-pickup, or listening-session images can make the work materially legible without exposing residents or private records?",
    ],
    boundaries: [
      "Keep the 24-page PDF, its financial appendix, contact details, signatures, and unapproved photographs outside the public repository.",
      "Use first-person attribution where the proposal and public sources do not independently assign Jamie's role.",
      "Preserve Julia Fredenburg, Pastor Lee, Earl Brown, other named contractors and consultants, neighborhood associations, churches, residents, volunteers, and city staff as collaborators and institutional actors.",
      "Do not imply full adaptive-reuse completion, CCED disbursement or expenditure, sole causality, statistical survey representativeness, audited program totals, or current program status.",
      "Keep these claims in the public knowledge-bank reserve; do not add them to the hiring website or create a knowledge-bank route without a separate audience, purpose, citation, privacy, and credit decision.",
    ],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex archival-production and PDF close reading",
    ],
  },
] satisfies KnowledgeBank["intakeItems"];
