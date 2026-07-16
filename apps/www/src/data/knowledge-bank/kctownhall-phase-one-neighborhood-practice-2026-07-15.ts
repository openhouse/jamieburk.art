import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";

export const kcTownHallPhaseOneEntities = [
  {
    id: "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
    kind: "organization",
    label: "Oak Park Neighborhood Association",
    publicSafeSummary:
      "A Kansas City neighborhood association that partnered with KC Town Hall on neighborhood listening and recurring free tire pickup.",
    aliases: ["Oak Park NA"],
    relatedEntityIds: ["ENT-KC-TOWN-HALL", "ENT-TIRED-OF-TIRES"],
    status: "historical"
  },
  {
    id: "ENT-INDIAN-MOUND-NEIGHBORHOOD-ASSOCIATION",
    kind: "organization",
    label: "Indian Mound Neighborhood Association",
    publicSafeSummary:
      "A historic east Kansas City neighborhood association that Jamie recalls later joining the tire-pickup service area.",
    aliases: ["Indian Mound"],
    relatedEntityIds: ["ENT-TIRED-OF-TIRES"],
    status: "historical"
  },
  {
    id: "ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION",
    kind: "organization",
    label: "Historic East Neighborhoods Coalition",
    publicSafeSummary:
      "A coalition of neighborhood associations and stakeholders organized around resident capacity, living conditions, and public priorities in historic east Kansas City.",
    aliases: ["HENC"],
    relatedEntityIds: [
      "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
      "ENT-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY"
    ],
    status: "active"
  },
  {
    id: "ENT-TIRED-OF-TIRES",
    kind: "program",
    label: "Tired of Tires",
    publicSafeSummary:
      "A recurring free resident tire-intake, pickup, transport, and disposal workflow operated with neighborhood partners in historic east Kansas City.",
    aliases: ["#TiredOfTires"],
    relatedEntityIds: [
      "ENT-KC-TOWN-HALL",
      "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
      "ENT-INDIAN-MOUND-NEIGHBORHOOD-ASSOCIATION"
    ],
    status: "historical"
  },
  {
    id: "ENT-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY",
    kind: "program",
    label: "Cleveland Ave KC: Unify to Beautify",
    publicSafeSummary:
      "A resident-facing corridor initiative that invited people connected by Cleveland Avenue to identify shared public-realm priorities and organize around them.",
    aliases: ["Cleveland Ave KC", "Unify to Beautify"],
    relatedEntityIds: [
      "ENT-KC-TOWN-HALL",
      "ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION"
    ],
    status: "historical"
  }
] satisfies EntityRecord[];

export const kcTownHallPhaseOneIntake = [
  {
    id: "INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
    receivedAt: reviewedAt,
    kind: "private-archive-pointer",
    publicSafeSummary:
      "March 2019 KC Town Hall proposal packet documenting neighborhood listening, work completed in 2018, the Phase One cold-shell scope, local contractor development, and a 2019 completion plan; financial and contact pages remain protected.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-KC-TOWN-HALL", "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION"],
    disposition: "source-created",
    sourceIds: ["SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019"],
    claimIds: [
      "CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019",
      "CLM-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE-2018-2019"
    ],
    researchTaskIds: [
      "TASK-KCTOWNHALL-PHASE-ONE-COMPLETION-CORROBORATION",
      "TASK-KCTOWNHALL-SURVEY-ARTIFACT-RECOVERY"
    ],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026",
    receivedAt: reviewedAt,
    kind: "public-memory",
    publicSafeSummary:
      "Jamie's first-person account of serving as general contractor and daily owner-side field coordinator for KC Town Hall Phase One, completing the phase in 2019, and joining construction sequencing to neighborhood listening.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-KC-TOWN-HALL", "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION"],
    disposition: "source-created",
    sourceIds: ["SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026"],
    claimIds: [
      "CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019",
      "CLM-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE-2018-2019"
    ],
    researchTaskIds: [
      "TASK-KCTOWNHALL-PHASE-ONE-COMPLETION-CORROBORATION",
      "TASK-KCTOWNHALL-SURVEY-ARTIFACT-RECOVERY"
    ],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TIRED-OF-TIRES-ROLE-MEMORY-2026",
    receivedAt: reviewedAt,
    kind: "public-memory",
    publicSafeSummary:
      "Jamie's first-person account of designing and coordinating the Tired of Tires workflow, performing recurring pickup and transport work, distributing neighborhood information, logging monthly activity, and later extending service to Indian Mound.",
    submittedBy: "Jamie Burkart",
    entityIds: [
      "ENT-TIRED-OF-TIRES",
      "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
      "ENT-INDIAN-MOUND-NEIGHBORHOOD-ASSOCIATION"
    ],
    disposition: "source-created",
    sourceIds: ["SRC-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026"],
    claimIds: ["CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021"],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CLEVELAND-AVE-ROLE-MEMORY-2026",
    receivedAt: reviewedAt,
    kind: "public-memory",
    publicSafeSummary:
      "Jamie's first-person account of helping Pastor Lee establish Cleveland Ave KC: Unify to Beautify through identity, photography, social media, corridor maps, listening-session materials, and pro bono neighborhood print production.",
    submittedBy: "Jamie Burkart",
    entityIds: [
      "ENT-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY",
      "ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION",
      "ENT-KC-TOWN-HALL"
    ],
    disposition: "source-created",
    sourceIds: ["SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026"],
    claimIds: [
      "CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019",
      "CLM-KCTOWNHALL-NEIGHBORHOOD-DESIGN-AND-PRINT-PRACTICE-2018-2021"
    ],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CLEVELAND-AVE-UNIFY-EVENT-2019",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public September 2019 Cleveland Ave KC: Unify to Beautify event page preserving the corridor purpose, resident priority prompts, date, venue, and four collective hosts.",
    submittedBy: "Codex authenticated public-source review",
    sourceUrl: "https://www.facebook.com/events/2334930036826492/",
    entityIds: [
      "ENT-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY",
      "ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION",
      "ENT-KC-TOWN-HALL"
    ],
    disposition: "source-created",
    sourceIds: ["SRC-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019"],
    claimIds: ["CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019"],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-CLEVELAND-AVE-TIRE-PICKUP-2020",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public Cleveland Ave KC post documenting KC Town Hall and Oak Park Neighborhood Association's recurring free tire-pickup offer and resident intake routes.",
    submittedBy: "Codex authenticated public-source review",
    sourceUrl: "https://www.facebook.com/ClevelandAveKC/posts/1633775000115273/",
    entityIds: [
      "ENT-TIRED-OF-TIRES",
      "ENT-KC-TOWN-HALL",
      "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION"
    ],
    disposition: "source-created",
    sourceIds: ["SRC-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020"],
    claimIds: ["CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021"],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-HENC-STRATEGIC-PLAN-2024",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public HENC strategic plan documenting the coalition's neighborhood-association structure, Oak Park membership, resident empowerment purpose, and cleanup, beautification, asset-mapping, and survey priorities.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
    entityIds: [
      "ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION",
      "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
      "ENT-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY"
    ],
    disposition: "source-created",
    sourceIds: ["SRC-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024"],
    claimIds: ["CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019"],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019",
    receivedAt: reviewedAt,
    kind: "public-url",
    publicSafeSummary:
      "Public institutional announcement documenting a separate 2019 HENC partnership addressing illegal dumping across eight neighborhoods; retained as coalition context rather than proof of Jamie's role.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://healthforward.org/news/health-forward-awards-269255-in-applicant-defined-grants/",
    entityIds: ["ENT-HISTORIC-EAST-NEIGHBORHOODS-COALITION", "ENT-TIRED-OF-TIRES"],
    disposition: "source-created",
    sourceIds: ["SRC-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019"],
    claimIds: [],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const kcTownHallPhaseOneSources = [
  {
    id: "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
    title: "KC Town Hall Central City proposal and support letters",
    author: "KC Town Hall and supporting organizations",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2019-03-25",
    publicCitation:
      "KC Town Hall Central City proposal and support letters, March 2019; public-safe archival description.",
    publicNote:
      "The packet documents neighborhood listening, roof and masonry work completed in 2018, the remaining Phase One cold-shell scope, local contractor development, and a plan to complete Phase One in 2019. Banking, contact, address, and other sensitive pages remain outside the repository.",
    intakeIds: ["INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019"],
    supportsGenerally: [
      "roof replacement, major structural masonry repair, debris removal, and reopened egress reported complete by 2018",
      "the planned Phase One cold-shell scope across roof, masonry, framing, water, access, safety, and soft costs",
      "a neighborhood survey conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "a 2018 local-industry account of more than fifteen minority-owned contractors and masonry skill development"
    ],
    doesNotEstablish: [
      "that every planned Phase One item was completed after the packet date",
      "Jamie's individual general-contractor role or any professional license",
      "the final division of responsibility among owners, contractors, architect, and engineer",
      "that later City Council funds paid for the documented Phase One work"
    ],
    protectedLocatorId: "ARCHIVE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019"
  },
  {
    id: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026",
    title: "Jamie Burkart first-person account of KC Town Hall Phase One",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person account of KC Town Hall Phase One field coordination and neighborhood listening, July 2026.",
    publicNote:
      "Jamie reports serving as general contractor and daily owner-side field coordinator, sequencing specialty teams from the basement through the roof, completing Phase One in 2019, and pairing construction presence with a neighborhood survey and contact workflow.",
    intakeIds: ["INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026"],
    supportsGenerally: [
      "Jamie's reported general-contractor and daily field-coordination role",
      "coordination across masonry, roofing, carpentry, welding, engineering, architecture, and plumbing",
      "Jamie's report that Phase One was completed in 2019",
      "Jamie's authorship and operational use of a four-by-six-inch survey card and supporting data workflow"
    ],
    doesNotEstablish: [
      "that Jamie held a general-contractor license",
      "independent verification of the 2019 completion date",
      "sole ownership, sole construction credit, or authorship of every decision",
      "exact contracts, costs, inspections, permits, or task completion dates"
    ],
    protectedLocatorId: "MEMORY-KCTOWNHALL-PHASE-ONE-ROLE-2026"
  },
  {
    id: "SRC-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026",
    title: "Jamie Burkart first-person account of Tired of Tires operations",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person account of Tired of Tires design, coordination, and hands-on operations, July 2026.",
    publicNote:
      "Jamie reports designing and coordinating the monthly neighborhood workflow, collecting and transporting tires, distributing neighborhood materials, logging activity, coordinating with city staff, and later extending service to Indian Mound.",
    intakeIds: ["INTAKE-TIRED-OF-TIRES-ROLE-MEMORY-2026"],
    supportsGenerally: [
      "Jamie's reported design and coordination of the recurring service workflow",
      "Jamie's reported hands-on pickup, transport, unloading, and count logging",
      "distribution of neighborhood information during the route",
      "a later reported expansion to Indian Mound"
    ],
    doesNotEstablish: [
      "audited tire, pickup, savings, participation, or neighborhood-outcome totals",
      "sole ownership of collective work with neighborhood and city partners",
      "the date, scope, or duration of Indian Mound expansion without corroboration"
    ],
    protectedLocatorId: "MEMORY-TIRED-OF-TIRES-ROLE-2026"
  },
  {
    id: "SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
    title: "Jamie Burkart first-person account of Cleveland Ave KC and neighborhood design support",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart first-person account of Cleveland Ave KC: Unify to Beautify and pro bono neighborhood design support, July 2026.",
    publicNote:
      "Jamie credits Pastor Lee with the corridor idea and reports helping establish the initiative through identity, logo, photography, social media, maps, listening-session materials, and print production for participating neighborhood groups.",
    intakeIds: ["INTAKE-CLEVELAND-AVE-ROLE-MEMORY-2026"],
    supportsGenerally: [
      "Jamie's reported co-founding implementation contribution",
      "Pastor Lee's authorship of the Cleveland Avenue corridor concept",
      "Jamie's reported identity, photography, social, mapping, meeting-material, and print work",
      "Jamie's reported pro bono design-studio and print-shop function for neighborhood groups"
    ],
    doesNotEstablish: [
      "sole creation or leadership of the initiative",
      "the identity or complete roster of every collaborator",
      "that resident priorities caused a particular capital allocation",
      "measured corridor or neighborhood outcomes"
    ],
    protectedLocatorId: "MEMORY-CLEVELAND-AVE-ROLE-2026"
  },
  {
    id: "SRC-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019",
    title: "Cleveland Ave KC: Unify to Beautify",
    organization: "KC Town Hall, Cleveland Ave KC, Central Christian Church, and HENC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-12",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/2334930036826492/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KC Town Hall, Cleveland Ave KC, Central Christian Church, and Historic East Neighborhoods Coalition, 'Cleveland Ave KC: Unify to Beautify,' public event, September 12, 2019.",
    publicNote:
      "The event invited people connected to Cleveland Avenue to name public-realm priorities and begin organizing strategies. It identifies four co-hosts and preserves the corridor purpose, not the individual division of labor.",
    intakeIds: ["INTAKE-CLEVELAND-AVE-UNIFY-EVENT-2019"],
    supportsGenerally: [
      "a public Cleveland Avenue corridor initiative",
      "resident priority prompts concerning sidewalks, streets, trash, trees, parks, landscaping, lighting, and signage",
      "KC Town Hall, Cleveland Ave KC, Central Christian Church, and HENC as co-hosts",
      "September 12, 2019 at Central Christian Church"
    ],
    doesNotEstablish: [
      "Jamie's individual role or attendance",
      "sole authorship by any one host",
      "a specific public funding or capital-improvement decision",
      "measured beautification or corridor outcomes"
    ]
  },
  {
    id: "SRC-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020",
    title: "Monthly free tire pickup in historic east Kansas City",
    organization: "Cleveland Ave KC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-06-03",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/ClevelandAveKC/posts/1633775000115273/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Cleveland Ave KC, public post documenting KC Town Hall and Oak Park Neighborhood Association's monthly free tire-pickup offer, 2020.",
    publicNote:
      "The post preserves the recurring service offer and resident intake routes. Its project-reported savings figure is not treated as audited impact.",
    intakeIds: ["INTAKE-CLEVELAND-AVE-TIRE-PICKUP-2020"],
    supportsGenerally: [
      "KC Town Hall and Oak Park Neighborhood Association as service partners",
      "a monthly free tire-pickup offer for historic east Kansas City homes",
      "resident intake through form and phone or text routes"
    ],
    doesNotEstablish: [
      "Jamie's individual design or coordination role",
      "the number of pickups, tires, residents, or neighborhoods served",
      "audited savings or measured environmental or health outcomes",
      "Indian Mound expansion"
    ]
  },
  {
    id: "SRC-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024",
    title: "Historic East Neighborhoods Coalition Strategic Plan 3.0",
    organization: "Historic East Neighborhoods Coalition / University of Missouri Extension",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-02-28",
    accessedAt: reviewedAt,
    canonicalUrl: "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Historic East Neighborhoods Coalition, 'Strategic Plan 3.0,' updated January 2024 and published by University of Missouri Extension.",
    publicNote:
      "The plan documents HENC's coalition structure, Oak Park membership, resident-empowerment purpose, and cleanup, beautification, asset-mapping, and stakeholder-survey priorities. It is retrospective context, not proof of Jamie's 2019 role.",
    intakeIds: ["INTAKE-HENC-STRATEGIC-PLAN-2024"],
    supportsGenerally: [
      "HENC as a coalition of neighborhood associations and stakeholders",
      "Oak Park as one of the represented neighborhoods",
      "resident empowerment and improved living conditions as coalition purposes",
      "cleanup, beautification, asset mapping, and stakeholder surveys as strategic practices"
    ],
    doesNotEstablish: [
      "Jamie's HENC membership or individual role",
      "the 2019 Cleveland Avenue program chronology",
      "a causal connection to any capital-improvement allocation",
      "completion of the plan's goals"
    ]
  },
  {
    id: "SRC-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019",
    title: "Health Forward awards $269,255 in applicant defined grants",
    organization: "Health Forward Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-10-02",
    accessedAt: reviewedAt,
    canonicalUrl: "https://healthforward.org/news/health-forward-awards-269255-in-applicant-defined-grants/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Health Forward Foundation, 'Health Forward awards $269,255 in applicant defined grants,' October 2, 2019.",
    publicNote:
      "The announcement records a separate $25,000 University of Missouri Extension and HENC partnership to address illegal dumping across eight neighborhoods. It supplies coalition context only.",
    intakeIds: ["INTAKE-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019"],
    supportsGenerally: [
      "a 2019 institutional partnership with HENC concerning illegal dumping",
      "an eight-neighborhood resident education, engagement, and mobilization frame"
    ],
    doesNotEstablish: [
      "Jamie's role",
      "a connection between the grant and Tired of Tires",
      "service totals, program expansion, or measured outcomes"
    ]
  }
] satisfies SourceRecord[];

export const kcTownHallPhaseOneReadings = [
  {
    id: "READ-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
    sourceId: "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-KCTOWNHALL-PHASE-ONE-WORK-COMPLETE-2018",
        text:
          "The March 2019 packet reports that by 2018 KC Town Hall had replaced the roof, repaired major structural masonry, removed debris, and reopened a long-shuttered egress.",
        relationToJamie: "collective-role",
        supportTags: ["kctownhall-phase-one-documented-2018-work"],
        confidence: "high",
        locator: "Progress and narrative pages"
      },
      {
        id: "PROP-KCTOWNHALL-PHASE-ONE-COLD-SHELL-SCOPE",
        text:
          "The packet defines a Phase One cold-shell scope spanning roof deck repair, insulation and TPO membrane, masonry, framing, water, storage, access, safety, air quality, and soft costs, with completion planned for 2019.",
        relationToJamie: "project-context",
        supportTags: ["kctownhall-phase-one-cold-shell-scope"],
        confidence: "high",
        locator: "Phase One budget table"
      },
      {
        id: "PROP-KCTOWNHALL-NEIGHBORHOOD-SURVEY-PROCESS",
        text:
          "The packet shows a neighborhood survey card, identifies Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as partners, and says results directly shaped the proposal.",
        relationToJamie: "collective-role",
        supportTags: ["kctownhall-neighborhood-survey-process"],
        confidence: "high",
        locator: "Neighborhood Process page"
      },
      {
        id: "PROP-KCTOWNHALL-LOCAL-INDUSTRY-PRACTICE-2018",
        text:
          "The packet reports that KC Town Hall hired more than fifteen minority-owned contractors in 2018 and describes masonry work as an opportunity for neighborhood skill development.",
        relationToJamie: "collective-role",
        supportTags: ["kctownhall-local-contractor-development"],
        confidence: "moderate",
        locator: "Progress: Local Industry page"
      }
    ],
    limitations: [
      "The packet was created in March 2019 and cannot independently prove completion later that year.",
      "It does not assign the general-contractor role or every specialty-team decision to Jamie.",
      "Contractor counts and completed-work descriptions are project-authored statements rather than independent audits.",
      "Sensitive financial, contact, address, and support-letter details remain outside the repository."
    ],
    researchTaskIds: [
      "TASK-KCTOWNHALL-PHASE-ONE-COMPLETION-CORROBORATION",
      "TASK-KCTOWNHALL-SURVEY-ARTIFACT-RECOVERY"
    ]
  },
  {
    id: "READ-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026",
    sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-JAMIE-KCTOWNHALL-GENERAL-CONTRACTOR-ROLE",
        text:
          "Jamie reports serving as general contractor and daily owner-side field coordinator for Phase One, sequencing specialty work from the basement through roof and parapet interfaces.",
        relationToJamie: "direct-role",
        supportTags: ["kctownhall-jamie-general-contractor-role"],
        confidence: "moderate",
        locator: "First-person account"
      },
      {
        id: "PROP-JAMIE-KCTOWNHALL-PHASE-ONE-COMPLETE-2019",
        text: "Jamie reports that Phase One was completed in 2019.",
        relationToJamie: "direct-role",
        supportTags: ["kctownhall-phase-one-completion-2019-first-party"],
        confidence: "moderate",
        locator: "First-person account"
      },
      {
        id: "PROP-JAMIE-KCTOWNHALL-SURVEY-SYSTEM",
        text:
          "Jamie reports designing a four-by-six-inch neighborhood survey handbill and supporting contact and data workflow, then using daily site presence to gather histories, priorities, and possibilities for the building.",
        relationToJamie: "direct-role",
        supportTags: ["kctownhall-jamie-survey-system"],
        confidence: "moderate",
        locator: "First-person account"
      }
    ],
    limitations: [
      "This is Jamie's first-person account rather than independent corroboration.",
      "The phrase general contractor describes the reported project function and does not establish a professional license.",
      "The account does not assign sole credit or establish exact contracts, inspections, costs, or completion dates."
    ],
    researchTaskIds: [
      "TASK-KCTOWNHALL-PHASE-ONE-COMPLETION-CORROBORATION",
      "TASK-KCTOWNHALL-SURVEY-ARTIFACT-RECOVERY"
    ]
  },
  {
    id: "READ-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026",
    sourceId: "SRC-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-JAMIE-TIRED-OF-TIRES-DESIGN-OPERATIONS",
        text:
          "Jamie reports designing and coordinating the recurring intake and pickup workflow and personally collecting, transporting, unloading, and logging tires while distributing neighborhood information.",
        relationToJamie: "direct-role",
        supportTags: ["tired-of-tires-jamie-design-operations"],
        confidence: "moderate",
        locator: "First-person account"
      },
      {
        id: "PROP-JAMIE-TIRED-OF-TIRES-INDIAN-MOUND",
        text: "Jamie reports that the program later expanded to include Indian Mound.",
        relationToJamie: "project-context",
        supportTags: ["tired-of-tires-indian-mound-expansion-first-party"],
        confidence: "limited",
        locator: "First-person account"
      }
    ],
    limitations: [
      "Jamie's design and coordination role and the Indian Mound expansion require additional artifact or collaborator corroboration.",
      "The account does not validate aggregate service, savings, health, environmental, or neighborhood-outcome figures.",
      "Neighborhood associations, residents, city staff, disposal partners, and other collaborators retain collective credit."
    ],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"]
  },
  {
    id: "READ-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
    sourceId: "SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-JAMIE-CLEVELAND-AVE-CONTRIBUTION",
        text:
          "Jamie credits Pastor Lee with the corridor concept and reports helping found and implement the initiative through identity, photography, social media, maps, listening-session materials, and print production.",
        relationToJamie: "collective-role",
        supportTags: ["cleveland-ave-jamie-contribution"],
        confidence: "moderate",
        locator: "First-person account"
      },
      {
        id: "PROP-JAMIE-NEIGHBORHOOD-DESIGN-PRINT-PRACTICE",
        text:
          "Jamie reports acting as a pro bono design studio and print shop for neighborhood groups, producing and distributing hundreds of handbills while connecting multiple neighborhood workflows.",
        relationToJamie: "direct-role",
        supportTags: ["jamie-neighborhood-design-print-practice"],
        confidence: "moderate",
        locator: "First-person account"
      }
    ],
    limitations: [
      "This is first-person evidence; surviving identity files, maps, print packets, meeting records, and collaborator proof notes remain to be recovered.",
      "The account does not establish sole creation, official representation, exact print counts, or a causal link to a particular capital allocation."
    ],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019",
    sourceId: "SRC-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-CLEVELAND-AVE-EVENT-PURPOSE-AND-HOSTS",
        text:
          "The public event invited people connected by Cleveland Avenue to identify public-realm priorities and begin organizing, and credits KC Town Hall, Cleveland Ave KC, Central Christian Church, and HENC as co-hosts.",
        relationToJamie: "project-context",
        supportTags: ["cleveland-ave-public-program-context"],
        confidence: "high",
        locator: "Event title, host line, and description"
      }
    ],
    limitations: [
      "The event page does not name Jamie, assign individual labor, or establish attendance.",
      "Priority collection does not establish official adoption, capital allocation, or measured corridor outcomes."
    ],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"]
  },
  {
    id: "READ-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020",
    sourceId: "SRC-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-CLEVELAND-AVE-TIRE-PICKUP-WORKFLOW",
        text:
          "The public post identifies KC Town Hall and Oak Park Neighborhood Association as partners offering monthly free tire pickup with resident form and phone or text intake.",
        relationToJamie: "project-context",
        supportTags: ["tired-of-tires-recurring-partner-workflow"],
        confidence: "high",
        locator: "Post body"
      }
    ],
    limitations: [
      "The post does not identify Jamie's individual role or validate the project-reported savings figure.",
      "The post does not establish completed pickups, unique residents, Indian Mound expansion, or measured outcomes."
    ],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"]
  },
  {
    id: "READ-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024",
    sourceId: "SRC-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-HENC-COALITION-PURPOSE-AND-PRACTICE",
        text:
          "HENC's strategic plan describes a neighborhood-association coalition working to empower residents and improve living conditions through practices including cleanup, beautification, asset mapping, and stakeholder surveys; Oak Park is among the represented neighborhoods.",
        relationToJamie: "project-context",
        supportTags: ["henc-coalition-purpose-and-practice"],
        confidence: "high",
        locator: "Organization overview and goals"
      }
    ],
    limitations: [
      "The 2024 plan is retrospective coalition context and does not establish Jamie's 2019 role.",
      "It does not prove completion of strategic goals or causation for any official funding decision."
    ],
    researchTaskIds: ["TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION"]
  },
  {
    id: "READ-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019",
    sourceId: "SRC-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019",
    status: "closely-read",
    readAt: reviewedAt,
    propositions: [
      {
        id: "PROP-HENC-ANTI-DUMPING-PARTNERSHIP-2019",
        text:
          "Health Forward documented a separate 2019 University of Missouri Extension and HENC partnership to address illegal dumping through resident engagement across eight neighborhoods.",
        relationToJamie: "project-context",
        supportTags: ["henc-anti-dumping-context"],
        confidence: "high",
        locator: "Grant listing"
      }
    ],
    limitations: [
      "The announcement does not name Jamie or Tired of Tires.",
      "It must remain contextual rather than evidence of Jamie's role, program funding, service delivery, or outcomes."
    ],
    researchTaskIds: ["TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION"]
  }
] satisfies SourceReading[];

export const kcTownHallPhaseOneClaims = [
  {
    id: "CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019",
    project: "kc-town-hall",
    internalClaim:
      "Jamie reports serving as general contractor and daily owner-side field coordinator for KC Town Hall Phase One, sequencing masonry, roofing, carpentry, welding, engineering, architecture, and plumbing work. A contemporaneous March 2019 packet documents substantial roof, structural masonry, debris-removal, and egress work already complete and the remaining cold-shell scope; Jamie reports that Phase One was completed later in 2019.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [
      "INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026"
    ],
    requiredSupportTags: [
      "kctownhall-phase-one-documented-2018-work",
      "kctownhall-phase-one-cold-shell-scope",
      "kctownhall-jamie-general-contractor-role",
      "kctownhall-phase-one-completion-2019-first-party"
    ],
    composition: {
      action:
        "Served in the reported general-contractor and daily field-coordination role, sequencing specialty teams from basement work through roof and parapet interfaces.",
      intendedEnd:
        "Stabilize a long-abandoned historic building as a usable cold shell while preparing a neighborhood-led next phase.",
      usableResult:
        "The contemporaneous packet records major roof, structural masonry, debris-removal, and egress work complete by 2018; Jamie reports completion of the full Phase One scope in 2019.",
      audience:
        "Hiring readers evaluating implementation, construction coordination, cross-disciplinary delivery, and field operations.",
      collectiveCredit:
        "Credit Julia Fredenburg, the architect, engineer, specialty contractors, tradespeople, neighborhood partners, and the workers whose coordinated labor made the phase possible.",
      causalBoundary:
        "Do not imply a professional license, sole construction credit, independent proof of the 2019 completion date, or that the later unused City allocation paid for Phase One."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
        relationship: "direct-support",
        supports: ["documented 2018 work and the Phase One cold-shell scope"],
        propositionIds: [
          "PROP-KCTOWNHALL-PHASE-ONE-WORK-COMPLETE-2018",
          "PROP-KCTOWNHALL-PHASE-ONE-COLD-SHELL-SCOPE"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Jamie's reported role and later 2019 completion"],
        propositionIds: [
          "PROP-JAMIE-KCTOWNHALL-GENERAL-CONTRACTOR-ROLE",
          "PROP-JAMIE-KCTOWNHALL-PHASE-ONE-COMPLETE-2019"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-WAYBACK-KCTOWNHALL-ABOUT-2019",
        relationship: "corroborating",
        supports: ["collective restoration role and neighborhood-process context"],
        propositionIds: ["PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-ROLE"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Attribute the 2019 completion date and general-contractor role to Jamie until after-the-fact project records or collaborators corroborate them.",
      "Use general contractor as a project function, never as evidence of a professional license.",
      "Keep Phase One implementation separate from the later CCED appropriation, which remained unused."
    ],
    antiClaims: [
      "Jamie was a licensed general contractor.",
      "Jamie alone constructed or owned KC Town Hall.",
      "The March 2019 proposal independently proves Phase One completion later in 2019.",
      "The $490,539 City Council appropriation funded Phase One construction."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE-2018-2019",
    project: "kc-town-hall",
    internalClaim:
      "Jamie reports designing a four-by-six-inch neighborhood survey handbill and supporting contact and data workflow, then using daily construction-site presence to gather neighborhood histories, priorities, and ideas. The March 2019 packet independently shows the survey, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as partners, and says results directly shaped the proposal.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [
      "INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026"
    ],
    requiredSupportTags: [
      "kctownhall-neighborhood-survey-process",
      "kctownhall-jamie-survey-system"
    ],
    composition: {
      action:
        "Designed a compact survey and supporting contact workflow, and made field presence an ongoing listening surface.",
      intendedEnd:
        "Let neighborhood knowledge shape the building program while making it easier for residents to remain connected to the work.",
      usableResult:
        "A repeatable survey-and-contact process whose results were incorporated into the 2019 proposal.",
      audience:
        "Hiring readers evaluating participatory research, service design, field operations, and evidence-backed planning.",
      collectiveCredit:
        "Credit Oak Park Neighborhood Association, New Horizon Missionary Baptist Church, Julia Fredenburg, participating residents, and the people who shared neighborhood history and priorities.",
      causalBoundary:
        "Do not claim that every resident was reached, every response survives, or the survey alone determined the full building program."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
        relationship: "direct-support",
        supports: ["the survey artifact, partners, and proposal-shaping function"],
        propositionIds: ["PROP-KCTOWNHALL-NEIGHBORHOOD-SURVEY-PROCESS"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Jamie's authorship, backend workflow, and daily field use"],
        propositionIds: ["PROP-JAMIE-KCTOWNHALL-SURVEY-SYSTEM"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The packet corroborates the survey process but does not attribute its design or data workflow to Jamie.",
      "Survey responses and contact data remain protected and are not reproduced in this repository."
    ],
    antiClaims: [
      "The survey reached or represented every neighborhood resident.",
      "Jamie alone determined the building program.",
      "The survey produced measured neighborhood outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021",
    project: "kc-town-hall",
    internalClaim:
      "Jamie performed hands-on tire collection with collaborators and reports designing and coordinating the recurring Tired of Tires workflow with Oak Park Neighborhood Association: resident intake, route operations, pickup, transport, unloading, information distribution, and count logging. Public project records document a recurring service and partner disposal; Jamie reports later expansion to Indian Mound.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [
      "INTAKE-TIRED-OF-TIRES-ROLE-MEMORY-2026",
      "INTAKE-CLEVELAND-AVE-TIRE-PICKUP-2020"
    ],
    requiredSupportTags: [
      "tired-of-tires-jamie-design-operations",
      "tired-of-tires-recurring-partner-workflow",
      "kc-town-hall-jamie-hands-on-tire-operations",
      "kctownhall-partner-corroboration"
    ],
    composition: {
      action:
        "Designed and coordinated a recurring resident-intake and field-service workflow and performed pickup, transport, unloading, communication, and tracking work.",
      intendedEnd:
        "Make legal tire disposal accessible to residents while connecting a visible neighborhood condition to a dependable operational response.",
      usableResult:
        "A recurring public intake and pickup service with documented partner participation and public collaborator corroboration of Jamie's hands-on work.",
      audience:
        "Hiring readers evaluating service operations, field logistics, community communications, and systems that bridge resident and municipal processes.",
      collectiveCredit:
        "Credit Oak Park Neighborhood Association, residents, Julia Fredenburg, Jimmy Fitzner, city staff, disposal partners including Bridging The Gap, and later neighborhood partners where corroborated.",
      causalBoundary:
        "Do not convert workflow records or project self-reports into audited pickup, tire, savings, health, environmental, or neighborhood-impact totals."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Jamie's reported workflow design, coordination, operations, and Indian Mound expansion"],
        propositionIds: [
          "PROP-JAMIE-TIRED-OF-TIRES-DESIGN-OPERATIONS",
          "PROP-JAMIE-TIRED-OF-TIRES-INDIAN-MOUND"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020",
        relationship: "direct-support",
        supports: ["recurring free service, Oak Park partnership, and resident intake routes"],
        propositionIds: ["PROP-CLEVELAND-AVE-TIRE-PICKUP-WORKFLOW"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
        relationship: "corroborating",
        supports: ["Jamie's hands-on collection with a collaborator"],
        propositionIds: ["PROP-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019",
        relationship: "corroborating",
        supports: ["a public partner acknowledgment of a KC Town Hall tire drop-off"],
        propositionIds: ["PROP-X-KCTOWNHALL-BTG-DROPOFF"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019",
        relationship: "context",
        supports: ["separate HENC illegal-dumping context"],
        propositionIds: ["PROP-HENC-ANTI-DUMPING-PARTNERSHIP-2019"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The core recurring workflow and Jamie's hands-on participation are corroborated; his design and coordination role remains first-party.",
      "Treat Indian Mound expansion as a research lead until neighborhood or project records corroborate it.",
      "The Health Forward grant is coalition context and is not evidence that it funded or resulted from Tired of Tires."
    ],
    antiClaims: [
      "Jamie alone operated Tired of Tires.",
      "One hundred social workflow records equal one hundred completed pickups.",
      "Project-reported tire or savings totals are audited.",
      "Tired of Tires received the separate Health Forward HENC grant.",
      "Indian Mound expansion is independently verified."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019",
    project: "kc-town-hall",
    internalClaim:
      "Jamie credits Pastor Lee with the Cleveland Avenue corridor idea and reports helping co-found and implement Cleveland Ave KC: Unify to Beautify through identity, photography, social media, corridor maps, listening-session materials, and print production. A public September 2019 event confirms the initiative, resident priority prompts, and collective hosts, but not Jamie's individual role or a causal link to later capital decisions.",
    status: "researching",
    maturity: "researching",
    intakeIds: [
      "INTAKE-CLEVELAND-AVE-ROLE-MEMORY-2026",
      "INTAKE-CLEVELAND-AVE-UNIFY-EVENT-2019",
      "INTAKE-HENC-STRATEGIC-PLAN-2024"
    ],
    requiredSupportTags: [
      "cleveland-ave-jamie-contribution",
      "cleveland-ave-public-program-context",
      "henc-coalition-purpose-and-practice"
    ],
    composition: {
      action:
        "Helped translate Pastor Lee's corridor idea into a public identity, maps, listening materials, communications, and print infrastructure.",
      intendedEnd:
        "Help residents and public officials perceive Cleveland Avenue as a shared corridor and route neighborhood priorities into a collective civic conversation.",
      usableResult:
        "A public corridor identity and listening event with eight named public-realm priority categories and four collective hosts.",
      audience:
        "Hiring readers evaluating participatory mapping, civic communications, coalition implementation, and place-based engagement.",
      collectiveCredit:
        "Credit Pastor Lee with the originating corridor vision and preserve KC Town Hall, Cleveland Ave KC, Central Christian Church, HENC, neighborhood associations, residents, and participating officials as collective actors.",
      causalBoundary:
        "Jamie's individual contribution remains first-party, and the evidence does not establish that the initiative caused a particular discretionary or capital-improvement allocation."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Pastor Lee origin credit and Jamie's reported implementation role"],
        propositionIds: ["PROP-JAMIE-CLEVELAND-AVE-CONTRIBUTION"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019",
        relationship: "direct-support",
        supports: ["the public initiative, resident priorities, and collective hosts"],
        propositionIds: ["PROP-CLEVELAND-AVE-EVENT-PURPOSE-AND-HOSTS"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024",
        relationship: "context",
        supports: ["HENC coalition purpose and neighborhood-practice context"],
        propositionIds: ["PROP-HENC-COALITION-PURPOSE-AND-PRACTICE"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat Jamie's co-founding and implementation role as first-party until identity artifacts, meeting records, or collaborators corroborate it.",
      "Preserve Pastor Lee's originating idea and the event's four co-hosts.",
      "Describe priority collection and civic routing, not capital-allocation causation."
    ],
    antiClaims: [
      "Jamie alone created or led Cleveland Ave KC.",
      "The public event page proves Jamie's individual role or attendance.",
      "The initiative caused a particular discretionary or capital-improvement allocation.",
      "The initiative completed all listed corridor improvements."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-NEIGHBORHOOD-DESIGN-AND-PRINT-PRACTICE-2018-2021",
    project: "kc-town-hall",
    internalClaim:
      "Jamie reports functioning as a pro bono design studio and print shop for several historic east Kansas City neighborhood groups, producing packets of handbills and carrying them through tire-pickup, survey, dumpster-day, and listening-session workflows.",
    status: "researching",
    maturity: "captured",
    intakeIds: ["INTAKE-CLEVELAND-AVE-ROLE-MEMORY-2026"],
    requiredSupportTags: ["jamie-neighborhood-design-print-practice"],
    composition: {
      action:
        "Designed, printed, bundled, and field-distributed neighborhood information across several related service and listening workflows.",
      intendedEnd:
        "Give neighborhood associations dependable, legible public materials and connect residents to multiple opportunities while Jamie was already moving through the service route.",
      usableResult:
        "A reported shared design-and-distribution practice connecting survey, cleanup, pickup, and public-meeting operations.",
      audience:
        "Hiring readers evaluating scrappy implementation, service communications, workflow integration, and hands-on delivery.",
      collectiveCredit:
        "Credit each neighborhood association, organizer, event, resident, and service partner whose information the materials carried.",
      causalBoundary:
        "This remains first-party and does not establish exact print counts, complete client scope, audience receipt, adoption, or measured outcomes."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
        relationship: "private-support",
        supports: ["Jamie's reported pro bono design, print, bundling, and field-distribution practice"],
        propositionIds: ["PROP-JAMIE-NEIGHBORHOOD-DESIGN-PRINT-PRACTICE"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Keep this as a claim seed until print artifacts, invoices or purchase records, distribution packets, or collaborator proof notes are recovered.",
      "Do not publish exact quantities from memory alone."
    ],
    antiClaims: [
      "Jamie was the exclusive designer for every neighborhood group.",
      "Hundreds of handbills were independently counted and verified.",
      "Distribution proves readership, participation, or impact."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallPhaseOneResearchTasks = [
  {
    id: "TASK-KCTOWNHALL-PHASE-ONE-COMPLETION-CORROBORATION",
    project: "kc-town-hall",
    question:
      "Which after-the-fact records or collaborators can corroborate Jamie's Phase One general-contractor function, specialty-team coordination, and completion in 2019?",
    status: "open",
    priority: "high",
    openedAt: reviewedAt,
    intakeIds: [
      "INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026"
    ],
    sourceIds: [
      "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026"
    ],
    claimIds: ["CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019"],
    nextActions: [
      "Recover dated completion photographs, inspection or permit records, invoices, contracts, schedules, punch lists, and final-payment evidence without publishing private financial details.",
      "Request short public-safe proof notes from Julia Fredenburg and the architect, engineer, roofer, mason, or other specialty contractors.",
      "Determine whether general contractor was a functional project role or a licensed title and preserve that distinction."
    ]
  },
  {
    id: "TASK-KCTOWNHALL-SURVEY-ARTIFACT-RECOVERY",
    project: "kc-town-hall",
    question:
      "Can the original survey card, data schema, aggregate responses, and collaborator confirmation establish Jamie's design and operating role without exposing resident data?",
    status: "open",
    priority: "medium",
    openedAt: reviewedAt,
    intakeIds: [
      "INTAKE-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "INTAKE-KCTOWNHALL-PHASE-ONE-ROLE-MEMORY-2026"
    ],
    sourceIds: [
      "SRC-KCTOWNHALL-PHASE-ONE-PROPOSAL-2019",
      "SRC-JAMIE-KCTOWNHALL-PHASE-ONE-ROLE-ACCOUNT-2026"
    ],
    claimIds: ["CLM-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE-2018-2019"],
    nextActions: [
      "Recover the blank four-by-six-inch card and public-safe data-model documentation.",
      "Create only aggregate, anonymized findings after privacy review; do not ingest names, addresses, phone numbers, or raw responses.",
      "Seek Oak Park or church collaborator confirmation of Jamie's design and field-operating role."
    ]
  },
  {
    id: "TASK-TIRED-OF-TIRES-ROLE-AND-EXPANSION-CORROBORATION",
    project: "kc-town-hall",
    question:
      "Can operating artifacts and partner records corroborate Jamie's workflow-design role, reconcile service totals, and establish the Indian Mound expansion?",
    status: "open",
    priority: "medium",
    openedAt: reviewedAt,
    intakeIds: [
      "INTAKE-TIRED-OF-TIRES-ROLE-MEMORY-2026",
      "INTAKE-CLEVELAND-AVE-TIRE-PICKUP-2020",
      "INTAKE-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019"
    ],
    sourceIds: [
      "SRC-JAMIE-TIRED-OF-TIRES-ROLE-ACCOUNT-2026",
      "SRC-FACEBOOK-CLEVELAND-AVE-TIRE-PICKUP-2020",
      "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
      "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019",
      "SRC-HEALTH-FORWARD-HENC-ANTI-DUMPING-2019"
    ],
    claimIds: ["CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021"],
    nextActions: [
      "Recover the public-safe workflow diagram, blank intake form, calculator schema, disposal receipts, route schedules, and city-partner correspondence.",
      "Reconcile social workflow records with disposal records without treating posts as completed pickups.",
      "Request public-safe Oak Park, Indian Mound, city-staff, and disposal-partner proof notes."
    ]
  },
  {
    id: "TASK-CLEVELAND-AVE-ROLE-AND-CIVIC-ROUTING-CORROBORATION",
    project: "kc-town-hall",
    question:
      "Can identity files, maps, meeting records, collaborator proof notes, and official budget records corroborate Jamie's Cleveland Avenue role while separating public-priority routing from capital-decision causation?",
    status: "open",
    priority: "medium",
    openedAt: reviewedAt,
    intakeIds: [
      "INTAKE-CLEVELAND-AVE-ROLE-MEMORY-2026",
      "INTAKE-CLEVELAND-AVE-UNIFY-EVENT-2019",
      "INTAKE-HENC-STRATEGIC-PLAN-2024"
    ],
    sourceIds: [
      "SRC-JAMIE-CLEVELAND-AVE-ROLE-ACCOUNT-2026",
      "SRC-FACEBOOK-CLEVELAND-AVE-UNIFY-EVENT-2019",
      "SRC-MU-EXTENSION-HENC-STRATEGIC-PLAN-2024"
    ],
    claimIds: [
      "CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019",
      "CLM-KCTOWNHALL-NEIGHBORHOOD-DESIGN-AND-PRINT-PRACTICE-2018-2021"
    ],
    nextActions: [
      "Recover the logo, photographs, maps, listening-session packets, social-account creation records, print files, and HENC or neighborhood minutes.",
      "Request a public-safe proof note from Pastor Lee and other co-hosts while preserving his originating corridor vision.",
      "Review official capital-budget and discretionary-funding records for traceable references; do not infer causation from participation alone."
    ]
  }
] satisfies ResearchTask[];

export const kcTownHallPhaseOneDecisions = [
  {
    id: "DEC-DEFER-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION",
    claimId: "CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale:
      "The work materially strengthens Jamie's implementation record, but public composition should wait for after-the-fact completion and role corroboration and must distinguish function from licensure.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE",
    claimId: "CLM-KCTOWNHALL-PARTICIPATORY-SITE-PRACTICE-2018-2019",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale:
      "Keep the survey-and-listening system as reserve depth until Jamie's design role and a public-safe aggregate of the workflow can be corroborated.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS",
    claimId: "CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale:
      "The hands-on operating role is corroborated and strong, but workflow-design attribution and Indian Mound expansion should be confirmed before website composition.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-CLEVELAND-AVE-CONTRIBUTION",
    claimId: "CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale:
      "The public initiative is recovered, but Jamie's implementation role remains first-party and capital-decision causation is unresolved.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-KCTOWNHALL-NEIGHBORHOOD-DESIGN-PRINT-PRACTICE",
    claimId: "CLM-KCTOWNHALL-NEIGHBORHOOD-DESIGN-AND-PRINT-PRACTICE-2018-2021",
    surface: "/work/kc-town-hall",
    decision: "defer",
    rationale:
      "Preserve the reported cross-workflow design and distribution practice in the bank while artifact recovery and collaborator corroboration remain open.",
    decidedAt: reviewedAt,
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
