import type {
  ClaimRecord,
  IntakeRecord,
  ProjectRecord,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcTownHallPhaseOneNeighborhoodSourceIds = [
  "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
  "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
  "SRC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019",
  "SRC-JULIA-COLE-KCTH-SUPPORT-2019"
] as const;

export const kcTownHallPhaseOneNeighborhoodClaimIds = [
  "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
  "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
  "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
  "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
] as const;

export const kcTownHallPhaseOneNeighborhoodIntake = [
  {
    id: "LEAD-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex protected-document review",
    kind: "document",
    title: "KC Town Hall Phase One and East Kansas City neighborhood practice",
    summary:
      "A public-safe archival production record joining Jamie's firsthand account of Phase One field delivery, the KC Town Hall survey system, Tired of Tires operations, and Cleveland Avenue design support with a close reading of the 2019 CCED proposal packet and existing public social records.",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["kc-town-hall", "east-kansas-city-neighborhood-practice"],
    sourceIds: [...kcTownHallPhaseOneNeighborhoodSourceIds],
    claimIds: [...kcTownHallPhaseOneNeighborhoodClaimIds],
    inquiryIds: [
      "INQ-KCTH-PHASE-ONE-COMPLETION-ROLE",
      "INQ-KCTH-SURVEY-RESPONSES",
      "INQ-EAST-KC-TIRED-OF-TIRES-ROLE-SCALE",
      "INQ-EAST-KC-CLEVELAND-AVE-OUTCOMES"
    ],
    notes: [
      "The source packet is mixed-sensitivity and remains outside the public repository; bank, credit, contact, property, and private financing details were excluded from the public-safe record.",
      "The packet directly names Jamie as founder and project manager, identifies specialist contractors, reproduces the neighborhood survey, documents 2018 cold-shell progress, and states a planned 2019 Phase One completion.",
      "The packet was assembled before the end of 2019, so Jamie's firsthand account, not the packet, is the present basis for saying Phase One was completed in 2019.",
      "General contractor describes Jamie's day-to-day coordinating function in this record; it is not evidence of licensure or a formal contractual title.",
      "Pastor Lee retains credit for the Cleveland Avenue corridor concept, and collective credit remains with HENC, neighborhood associations, residents, public officials, city staff, contractors, and other participants.",
      "No new public-site copy was selected in this pass. The claims remain reserve depth for later audience-specific composition."
    ]
  }
] satisfies IntakeRecord[];

export const kcTownHallPhaseOneNeighborhoodSources = [
  {
    id: "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
    title: "KC Town Hall CCED proposal packet with Phase One budget and support letters",
    organization: "KC Town Hall LLC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "KC Town Hall CCED proposal packet, 2019, protected archival review.",
    publicNote:
      "The packet names Jamie as founder and project manager, identifies the multidisciplinary project team, reproduces the 4-by-6 resident survey, documents 2018 cold-shell progress, and describes the planned 2019 Phase One scope and completion.",
    supportsGenerally: [
      "Jamie named as founder and project manager",
      "a multidisciplinary contractor and design team",
      "roof, structural masonry, floor-framing, water, debris-removal, access, safety, and related cold-shell scope",
      "a resident survey developed with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "ongoing survey results directly shaping the proposal",
      "2018 roof replacement and major structural-masonry progress",
      "planned Phase One completion in 2019"
    ],
    doesNotEstablish: [
      "a general-contractor license or formal contractual title for Jamie",
      "independent proof that all Phase One work was completed in 2019",
      "Jamie's sole performance of specialist work",
      "participant counts, survey consensus, or complete response data",
      "current property, financial, legal, occupancy, or operating status",
      "permission to publish the underlying packet or its private details"
    ],
    protectedLocatorId: "LOC-KCTH-CCED-PHASE-ONE-PACKET-2019"
  },
  {
    id: "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
    title: "Jamie Burkart firsthand Phase One and neighborhood-practice account",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart, firsthand role and scope confirmation for KC Town Hall Phase One and related East Kansas City neighborhood programs, July 15, 2026.",
    publicNote:
      "Jamie confirms that he served in the day-to-day general-contractor and project-management function for Phase One; designed the site's resident-survey handbill and data system; designed, coordinated, and personally operated the initial Tired of Tires pickups; and contributed design and communications systems to Cleveland Ave Unify to Beautify while crediting Pastor Lee with the corridor concept.",
    supportsGenerally: [
      "Jamie's day-to-day field coordination across specialist trades",
      "Phase One completion in 2019 and roof completion before the first snow",
      "survey-card and backing data-system authorship",
      "Tired of Tires program design, city coordination, pickup operations, print distribution, and count tracking",
      "later inclusion of Indian Mound in Tired of Tires service",
      "pro bono design and print support for neighborhood groups",
      "co-founding participation, identity, photography, social, and participatory mapping support for Cleveland Ave Unify to Beautify",
      "Pastor Lee's authorship of the Cleveland Avenue corridor idea"
    ],
    doesNotEstablish: [
      "independent corroboration of every remembered task, date, count, or outcome",
      "a general-contractor license or formal contractual title",
      "sole authorship or operation of collective neighborhood programs",
      "the effect of Cleveland Avenue meetings on any particular capital decision",
      "current project, property, or organizational status"
    ],
    protectedLocatorId: "LOC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026"
  },
  {
    id: "SRC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019",
    title: "Council Member Scott Taylor letter supporting KC Town Hall",
    organization: "City of Kansas City, Missouri, Sixth District at Large",
    author: "Scott Taylor",
    kind: "government-record",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2019-01-23",
    accessedAt: "2026-07-15",
    publicCitation:
      "Council Member Scott Taylor, letter supporting KC Town Hall's CCED application, January 23, 2019, protected archival review.",
    publicNote:
      "Taylor's letter describes KC Town Hall's neighborhood process as impressive, notes collaboration with Oak Park Neighborhood Association, says the resident survey directly influenced proposed retail uses, and records a commitment to local minority-owned contractors.",
    supportsGenerally: [
      "external government acknowledgment of the neighborhood process",
      "Oak Park Neighborhood Association collaboration",
      "survey influence on proposed retail uses",
      "a stated commitment to local minority-owned contractors"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship of every process component",
      "completion of Phase One",
      "survey response counts or consensus",
      "government endorsement of every project claim",
      "later funding, implementation, or operating outcomes"
    ],
    protectedLocatorId: "LOC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019"
  },
  {
    id: "SRC-JULIA-COLE-KCTH-SUPPORT-2019",
    title: "Julia Cole letter supporting KC Town Hall",
    author: "Julia Cole",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2019-01-21",
    accessedAt: "2026-07-15",
    publicCitation:
      "Julia Cole, letter supporting KC Town Hall, January 21, 2019, protected archival review.",
    publicNote:
      "Cole describes Jamie and Julia Fredenburg as actively engaging neighbors and organizations and as invested in a listening-driven process intended to inform renovation and respond to neighborhood assets and needs.",
    supportsGenerally: [
      "contemporaneous collaborator observation of active neighborhood engagement",
      "a listening-driven renovation process",
      "community-responsive uses, neighborhood-owned businesses, and local employment as stated goals",
      "a network of contractors and architects supporting the work"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship or causality",
      "completion of Phase One",
      "achievement of all proposed uses or employment outcomes",
      "permission to publish contact details or the underlying letter"
    ],
    protectedLocatorId: "LOC-JULIA-COLE-KCTH-SUPPORT-2019"
  }
] satisfies SourceRecord[];

export const kcTownHallPhaseOneNeighborhoodClaims = [
  {
    id: "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
    project: "kc-town-hall",
    internalClaim:
      "Jamie confirms that he served in KC Town Hall Phase One's day-to-day general-contractor and project-management function, coordinating specialist teams and linked field dependencies from the basement through the roof; the 2019 packet independently names him founder and project manager, identifies the multidisciplinary team, documents 2018 roof and structural-masonry progress, and describes the cold-shell scope and planned 2019 completion.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "For KC Town Hall Phase One, Jamie served in the day-to-day field-delivery and project-management function, coordinating specialist trades and interdependent cold-shell work; the project packet names him founder and project manager and documents the scope and team.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
        relationship: "direct-support",
        supports: [
          "day-to-day general-contractor and field-coordination function",
          "multidisciplinary trade coordination",
          "Phase One completion in 2019",
          "roof and parapet dependency detail"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
        relationship: "corroborating",
        supports: [
          "founder and project-manager title",
          "multidisciplinary team and cold-shell scope",
          "2018 roof and structural-masonry progress",
          "planned 2019 Phase One completion"
        ],
        locator: "pp. 2, 7, 11-12",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JULIA-COLE-KCTH-SUPPORT-2019",
        relationship: "corroborating",
        supports: ["contractor and architect network", "Jamie's active project involvement"],
        locator: "pp. 22-23 of proposal packet",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "General contractor describes the coordinating function Jamie confirms he performed; the current record does not establish licensure or a formal contractual title.",
      "The packet predates the end of 2019 and establishes planned completion, not independent proof of actual 2019 completion.",
      "Specialist contractors, architects, engineers, tradespeople, Julia Fredenburg, neighborhood partners, and other collaborators retain credit for their work.",
      "Do not infer current property, legal, financial, occupancy, or operating status."
    ],
    antiClaims: [
      "Jamie was a licensed general contractor",
      "The proposal packet independently proves Phase One completion in 2019",
      "Jamie personally performed every specialist trade",
      "Jamie solely delivered the restoration"
    ],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-COMPLETION-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  },
  {
    id: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    project: "kc-town-hall",
    internalClaim:
      "Jamie confirms that he designed KC Town Hall's 4-by-6 resident-survey handbill and backing data-collection system and used survey cards during site work; the proposal packet reproduces the instrument and says ongoing results directly shaped the proposal, while Council Member Scott Taylor's letter corroborates the process and its influence on proposed retail uses.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Jamie designed a 4-by-6 neighborhood survey and backing data system for KC Town Hall; the proposal packet reproduces the instrument and records that resident responses directly shaped the proposal.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
        relationship: "direct-support",
        supports: ["survey-card and data-system authorship", "daily field use"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
        relationship: "direct-support",
        supports: ["survey form", "partner organizations", "survey influence on the proposal"],
        locator: "p. 4",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019",
        relationship: "corroborating",
        supports: ["neighborhood-process value", "survey influence on proposed uses"],
        locator: "pp. 18-19 of proposal packet",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie's authorship is a firsthand claim; the packet and Taylor letter independently establish the instrument and process, not authorship.",
      "The record does not establish the response count, a statistically representative sample, community consensus, or implementation of every requested use.",
      "Oak Park Neighborhood Association, New Horizon Missionary Baptist Church, residents, and other participants retain collective credit."
    ],
    antiClaims: [
      "The survey statistically represented the neighborhood",
      "Every resident supported the proposal",
      "Every survey request was implemented",
      "The packet independently proves Jamie authored the survey"
    ],
    researchInquiryIds: ["INQ-KCTH-SURVEY-RESPONSES"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  },
  {
    id: "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
    project: "east-kansas-city-neighborhood-practice",
    internalClaim:
      "Jamie confirms that, through Oak Park Neighborhood Association, he designed and coordinated the initial monthly free Tired of Tires pickup with city services and personally handled pickup routing, printed outreach, tire collection and delivery, and monthly count tracking; he says the program later included Indian Mound. The surviving shared-account record independently establishes a recurring free program beginning with Oak Park and continuing across East Kansas City, but does not assign every later operation to Jamie.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Jamie designed, coordinated, and personally operated the initial Tired of Tires neighborhood pickups through Oak Park Neighborhood Association, combining city-service coordination, field logistics, print outreach, and count tracking; later operation remained collective.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
        relationship: "direct-support",
        supports: [
          "initial program design and coordination",
          "pickup, delivery, outreach, and tracking operations",
          "coordination with city services",
          "later Indian Mound inclusion"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
        relationship: "corroborating",
        supports: ["free residential pickup", "Oak Park collaboration", "May 2019 public launch"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
        relationship: "context",
        supports: ["recurring East Kansas City program record", "later shared-account continuity"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie's individual operational role is a firsthand claim; the public social record establishes the program but not operator identity.",
      "Do not assign all 99 surviving Tired of Tires records or every later pickup to Jamie.",
      "The Indian Mound expansion, exact pickup count, exact tire count, and complete operator timeline need additional public-safe corroboration.",
      "City coordination is not municipal ownership, funding, endorsement, or independent validation of project-reported savings."
    ],
    antiClaims: [
      "Jamie alone operated Tired of Tires from 2019 through 2022",
      "The program held 99 pickups",
      "Kansas City officially owned or endorsed the program",
      "The Indian Mound expansion is independently verified"
    ],
    researchInquiryIds: ["INQ-EAST-KC-TIRED-OF-TIRES-ROLE-SCALE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  },
  {
    id: "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
    project: "east-kansas-city-neighborhood-practice",
    internalClaim:
      "Jamie identifies himself as a co-founding contributor to HENC's Cleveland Ave Unify to Beautify program and credits Pastor Lee with the originating corridor concept; Jamie says he contributed the identity, logo, photography, social account, listening-session maps, resident-reporting surfaces, and pro bono print production used to help neighborhoods describe shared priorities along Cleveland Avenue.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Firsthand research lead: Jamie contributed identity, mapping, listening-session, social, photography, and print systems to HENC's Cleveland Ave Unify to Beautify program, crediting Pastor Lee with the corridor idea.",
        status: "active",
        citationRequired: false,
        surfaces: [
          "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
        ]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
        relationship: "direct-support",
        supports: [
          "co-founding participation",
          "Pastor Lee's originating corridor concept",
          "identity, map, photography, social, resident-reporting, and print contributions"
        ],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "This claim presently rests on Jamie's firsthand account and is retained as a research lead with bounded public-safe wording.",
      "Pastor Lee retains credit for the Cleveland Avenue corridor concept; HENC, neighborhood associations, residents, elected officials, and other contributors retain collective credit.",
      "The present record does not establish attendance, geographic coverage, implementation, or influence on any specific discretionary capital decision."
    ],
    antiClaims: [
      "Jamie originated the Cleveland Avenue corridor concept",
      "Jamie alone created or operated Unify to Beautify",
      "The program caused a specific capital allocation",
      "Every mapped resident priority was implemented"
    ],
    researchInquiryIds: ["INQ-EAST-KC-CLEVELAND-AVE-OUTCOMES"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected-document review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallPhaseOneNeighborhoodInquiries = [
  {
    id: "INQ-KCTH-PHASE-ONE-COMPLETION-ROLE",
    project: "kc-town-hall",
    question:
      "Which public-safe records corroborate Phase One's 2019 completion and Jamie's day-to-day field-delivery role without implying licensure, a formal general-contractor title, or sole performance of specialist work?",
    methods: [
      "Locate dated completion photographs, invoices or contractor records approved for aggregate use, permits, inspection records, correspondence, and collaborator confirmations.",
      "Build a task-and-dependency chronology for roof, parapet, masonry, carpentry, welding, plumbing, engineering, architecture, access, and other cold-shell work.",
      "Separate project management and general-contractor function from licensed trade work and formal titles."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The March 2019 packet documents 2018 progress and planned 2019 completion; the present completion and functional-role statements rely on Jamie's firsthand account."
    ],
    sourceIds: [
      "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
      "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
      "SRC-JULIA-COLE-KCTH-SUPPORT-2019"
    ]
  },
  {
    id: "INQ-KCTH-SURVEY-RESPONSES",
    project: "kc-town-hall",
    question:
      "What public-safe aggregate can be recovered from the KC Town Hall survey system, and which project decisions can be traced to resident input?",
    methods: [
      "Locate the backing data system, blank instrument, aggregate response counts, decision notes, and public presentations while withholding names and contact details.",
      "Document the sampling period, outreach routes, response floor, limitations, and the path from recurring themes to proposed uses.",
      "Seek collaborator or neighborhood-association confirmation of Jamie's design and operating role."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The packet reproduces the instrument and reports direct influence on the proposal, but the response population and backing data were not reviewed in this pass."
    ],
    sourceIds: [
      "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
      "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
      "SRC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019"
    ]
  },
  {
    id: "INQ-EAST-KC-TIRED-OF-TIRES-ROLE-SCALE",
    project: "east-kansas-city-neighborhood-practice",
    question:
      "Which records establish Jamie's Tired of Tires operating period, city-service coordination, Indian Mound expansion, pickup cadence, tire totals, and handoff to later operators?",
    methods: [
      "Reconcile Jamie's monthly spreadsheet with public posts, neighborhood-association records, city recycling records, print artifacts, and collaborator confirmations.",
      "Separate pickups, tires, addresses, households, social posts, and project-reported fee savings.",
      "Create only privacy-preserving aggregates and keep resident addresses and contact information protected."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "The public record establishes a recurring program and later East Kansas City continuity; Jamie's exact individual operating period and the Indian Mound expansion remain firsthand."
    ],
    sourceIds: [
      "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026"
    ]
  },
  {
    id: "INQ-EAST-KC-CLEVELAND-AVE-OUTCOMES",
    project: "east-kansas-city-neighborhood-practice",
    question:
      "What public record establishes Cleveland Ave Unify to Beautify's formation, collaborators, listening sessions, mapped priorities, public-official participation, and relationship to corridor capital decisions?",
    methods: [
      "Recover HENC and neighborhood-association records, event pages, social posts, maps, handbills, meeting notes, public budgets, and collaborator confirmations.",
      "Confirm Pastor Lee's originating role and the complete co-founding and operating team before strengthening individual-credit language.",
      "Trace any claimed funding influence proposition by proposition through public decision records rather than sequence alone."
    ],
    resultStatus: "open",
    findings: [],
    limitations: [
      "This pass records Jamie's firsthand account and preserves Pastor Lee's credit; it does not independently establish program outcomes or funding causality."
    ],
    sourceIds: ["SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026"]
  }
] satisfies ResearchInquiry[];

export const kcTownHallPhaseOneNeighborhoodProjects = [
  {
    id: "east-kansas-city-neighborhood-practice",
    title: "East Kansas City neighborhood operations",
    aliases: ["Tired of Tires", "Cleveland Ave Unify to Beautify", "HENC"],
    period: "2019-2022 public record",
    status: "historical",
    summary:
      "Collective neighborhood service, listening, communications, print, mapping, and field-logistics work connected to Oak Park, Indian Mound, HENC, and other East Kansas City partners.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["neighborhood operations", "participatory planning", "field logistics", "civic design"],
    sourceIds: [
      "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
      "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-LAUNCH-2019",
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026"
    ],
    claimIds: [
      "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
      "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
    ],
    inquiryIds: [
      "INQ-EAST-KC-TIRED-OF-TIRES-ROLE-SCALE",
      "INQ-EAST-KC-CLEVELAND-AVE-OUTCOMES"
    ],
    photoBrief: {
      status: "research-needed",
      selectionQuestion:
        "Which cleared images show Jamie's field logistics, print systems, participatory maps, or neighborhood collaboration without exposing resident addresses or collapsing collective credit?",
      evidenceNeeds: ["date and place", "Jamie visibly working", "collaborator credit", "rights and consent"],
      rightsNotes:
        "Keep resident addresses, survey identities, private-property details, and unapproved faces out of public view; preserve Pastor Lee, HENC, neighborhood-association, city-staff, and resident credit in captions."
    }
  }
] satisfies ProjectRecord[];

export const kcTownHallPhaseOneNeighborhoodPublicationDecisions = [
  {
    id: "PUB-KCTH-PHASE-ONE-FIELD-DELIVERY",
    claimId: "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
    decision: "reserve",
    audiences: ["future editors", "implementation leaders", "civic project managers"],
    surfaces: [
      "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
    ],
    rationale:
      "Strong role depth for future implementation narratives, held from the current site until the functional-title and 2019 completion boundaries receive additional corroboration.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    claimId: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    decision: "reserve",
    audiences: ["future editors", "service designers", "public-engagement leaders"],
    surfaces: [
      "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
    ],
    rationale:
      "Preserves a concrete participation-system proof while aggregate response evidence and implementation tracing remain open.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
    claimId: "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
    decision: "reserve",
    audiences: ["future editors", "community-operations peers", "civic-service teams"],
    surfaces: [
      "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
    ],
    rationale:
      "Adds bounded individual role evidence to the existing program record without assigning every later operation or social post to Jamie.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
    claimId: "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
    decision: "reserve",
    audiences: ["future editors", "participatory-design peers", "neighborhood advocates"],
    surfaces: [
      "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice"
    ],
    rationale:
      "Retains the design and listening-practice lead while public formation records, collaborator credits, and decision outcomes remain open research.",
    decidedAt: "2026-07-15"
  }
] satisfies PublicationDecision[];
