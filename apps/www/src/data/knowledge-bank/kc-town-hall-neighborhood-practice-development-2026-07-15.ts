import type { KnowledgeBank } from "./schema.ts";

type KcTownHallNeighborhoodPracticeDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const kcTownHallNeighborhoodPracticeDevelopmentRecords: KcTownHallNeighborhoodPracticeDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-15-EAST-KC-NEIGHBORHOOD-PRACTICE",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "memory",
      visibility: "public-safe",
      summary:
        "Document Jamie's Oak Park, Tired of Tires, HENC, Cleveland Ave Unify to Beautify, neighborhood print, and field-communications practice without overstating collective work or funding causality.",
      projectHints: ["kc-town-hall", "east-kc-neighborhood-practice"],
      status: "processed",
      disposition:
        "Promoted a bounded initial Tired of Tires operations claim for the KC Town Hall case study; retained field communications and Cleveland Avenue design as reserve claims; held Indian Mound expansion and capital-allocation influence for further research.",
      linkedRecordIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
        "SRC-HENC-STRATEGIC-PLAN-2024",
        "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
        "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021",
        "INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026",
        "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
        "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
        "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
        "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE",
        "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
        "CLM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
        "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-2026",
      sourceId: "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
      readAt: "2026-07-15",
      reader: "Codex public-safe claim decomposition",
      assertions: [
        {
          id: "ASSERT-JAMIE-TIRED-OF-TIRES-INITIAL-OPERATIONS",
          statement:
            "Jamie confirms that he designed, coordinated with the city, and ran the initial monthly Tired of Tires field operation through Oak Park Neighborhood Association.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-TIRED-OF-TIRES-OPERATING-LOOP",
          statement:
            "Jamie confirms that he routed requests, collected and delivered tires to the city recycling center, recorded monthly counts, and distributed neighborhood information on pickup routes.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-PRO-BONO-DESIGN-PRINT",
          statement:
            "Jamie confirms that he served related neighborhood groups as a pro bono design and print resource, producing identity, maps, photography, social, listening-session, resident-reporting, and handbill materials.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-CLEVELAND-AVE-COFOUNDING-CONTRIBUTION",
          statement:
            "Jamie identifies himself as a co-founding contributor to Cleveland Ave Unify to Beautify and credits Pastor Lee with the corridor concept.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-INDIAN-MOUND-RECOLLECTION",
          statement:
            "Jamie remembers the Tired of Tires service later expanding to include Indian Mound.",
          confidence: "moderate",
          publicSafe: true
        }
      ],
      limitations: [
        "This is a firsthand role confirmation, not independent corroboration of every task, date, count, handoff, or outcome.",
        "Collective credit remains with Julia, Pastor Lee, Oak Park, HENC, Chestnut, city staff, residents, later operators, and other contributors.",
        "The capital-allocation relationship and Indian Mound expansion need additional public records or collaborator confirmation."
      ],
      entityIds: [
        "Jamie-Burkart",
        "KC-Town-Hall",
        "Oak-Park-Neighborhood-Association",
        "Historic-East-Neighborhoods-Coalition"
      ],
      themeIds: [
        "field-operations",
        "resident-service",
        "civic-design",
        "print-production",
        "collective-credit"
      ],
      candidateClaimIds: [
        "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
        "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
        "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
        "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE"
      ]
    },
    {
      id: "READ-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
      sourceId: "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
      readAt: "2026-07-15",
      reader: "Codex authenticated Facebook review",
      assertions: [
        {
          id: "ASSERT-CLEVELAND-AVE-KC-MONTHLY-TIRE-SERVICE",
          statement:
            "The post describes a monthly free residential tire-pickup service in historic East Kansas City and credits KC Town Hall with Oak Park Neighborhood Association.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CLEVELAND-AVE-KC-TIRE-INTAKE",
          statement:
            "The post routes residents to request pickup and invites volunteers into the service workflow.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The post does not identify the individual operator, complete partner roster, service duration, or Indian Mound expansion.",
        "Any project-reported outcome figure remains unaudited."
      ],
      entityIds: ["KC-Town-Hall", "Oak-Park-Neighborhood-Association"],
      themeIds: ["resident-service", "intake", "volunteer-coordination"],
      candidateClaimIds: ["CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS"]
    },
    {
      id: "READ-HENC-STRATEGIC-PLAN-2024",
      sourceId: "SRC-HENC-STRATEGIC-PLAN-2024",
      readAt: "2026-07-15",
      reader: "Codex public PDF close reading",
      assertions: [
        {
          id: "ASSERT-HENC-COALITION-CONTEXT",
          statement:
            "HENC describes itself as a coalition of neighborhood associations and other stakeholders working to improve and empower Kansas City's East Side neighborhoods.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-HENC-OAK-PARK-MEMBERSHIP",
          statement: "The plan lists Oak Park among HENC's member neighborhoods.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-HENC-IMPLEMENTATION-METHODS",
          statement:
            "The plan names asset mapping, website development, stakeholder surveys, partnerships, and funding accountability among HENC's methods and goals.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The 2024 plan does not describe Cleveland Ave Unify to Beautify, Jamie's role, Pastor Lee's role, listening sessions, or a specific capital decision."
      ],
      entityIds: [
        "Historic-East-Neighborhoods-Coalition",
        "Oak-Park-Neighborhood-Association"
      ],
      themeIds: ["coalition-context", "asset-mapping", "stakeholder-surveys"],
      candidateClaimIds: ["CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"]
    },
    {
      id: "READ-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
      sourceId: "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
      readAt: "2026-07-15",
      reader: "Codex complete-account source review",
      assertions: [
        {
          id: "ASSERT-KCTH-OAK-PARK-CLEANUP-COMMUNICATION",
          statement:
            "KC Town Hall's public account carried Oak Park Neighborhood Association cleanup information and multiple disposal locations.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The post does not identify Jamie as its author or establish his print-production or distribution role."
      ],
      entityIds: ["KC-Town-Hall", "Oak-Park-Neighborhood-Association"],
      themeIds: ["neighborhood-information", "cleanup"],
      candidateClaimIds: ["CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE"]
    },
    {
      id: "READ-KCTH-CHESTNUT-TIRE-COLLECTION-2021",
      sourceId: "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021",
      readAt: "2026-07-15",
      reader: "Codex complete-account source review",
      assertions: [
        {
          id: "ASSERT-KCTH-CHESTNUT-COLLECTION-HANDOFF",
          statement:
            "KC Town Hall publicly thanked Chestnut Family Resource Center for collecting tires at its dumpster day, documenting a partner handoff into the recurring service workflow.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The post does not identify Jamie as its author or operator and does not independently audit the reported monthly total."
      ],
      entityIds: ["KC-Town-Hall", "Chestnut-Family-Resource-Center"],
      themeIds: ["partner-handoff", "resident-service", "public-follow-through"],
      candidateClaimIds: [
        "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
        "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
      project: "kc-town-hall",
      text:
        "Jamie designed and ran the initial monthly Tired of Tires field operation through Oak Park Neighborhood Association, combining city coordination, request routing, collection, recycling delivery, count tracking, and neighborhood information distribution.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
        "SRC-KCTH-FULL-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      supportSummary:
        "Jamie's direct confirmation establishes his initial field role; the archived page, public service post, and complete account independently establish the collective monthly workflow and continuity.",
      missingEvidence: [],
      boundaries: [
        "Preserve Julia-and-Jamie workflow authorship, collective program credit, later operators, and the distinction between city coordination and municipal ownership.",
        "Do not use unaudited tire or savings totals."
      ],
      promotedClaimId: "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
      project: "east-kc-neighborhood-practice",
      text:
        "Jamie paired direct neighborhood service with pro bono design and print production, survey intake, neighborhood-information distribution, and operational recordkeeping.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
        "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      supportSummary:
        "Jamie's direct confirmation establishes the integrated role; public posts establish the related cleanup, information, and partner-collection surfaces without assigning their authorship to Jamie.",
      missingEvidence: [],
      boundaries: [
        "Use as a bounded firsthand role account and preserve collective credit.",
        "Avoid an exact handbill count until production records are reconciled."
      ],
      promotedClaimId: "CLM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
      project: "east-kc-neighborhood-practice",
      text:
        "Jamie was a co-founding contributor to HENC's Cleveland Ave Unify to Beautify program, contributing identity, mapping, photography, social, listening-session, resident-reporting, and print systems while crediting Pastor Lee with the corridor concept.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-HENC-STRATEGIC-PLAN-2024"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      supportSummary:
        "Jamie's direct confirmation supports the bounded role and Pastor Lee credit; HENC's strategic plan supplies coalition and methods context but does not independently describe the program.",
      missingEvidence: [],
      boundaries: [
        "Retain as a reserve firsthand claim until program records and collaborator confirmations are recovered.",
        "Do not infer sole founding, representative authority, implementation, or funding causality."
      ],
      promotedClaimId: "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
      project: "east-kc-neighborhood-practice",
      text:
        "Jamie remembers Tired of Tires later expanding to include Indian Mound.",
      status: "research-needed",
      sourceIds: ["SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026"],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      supportSummary:
        "The expansion is preserved as Jamie's firsthand recollection, but no dated public trace, association record, city record, or collaborator confirmation was recovered in this pass.",
      missingEvidence: [
        "dated Oak Park or Indian Mound neighborhood-association record",
        "public post or service page naming Indian Mound",
        "city or recycling record",
        "collaborator confirmation"
      ],
      boundaries: ["Do not project the expansion as independently confirmed."],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE",
      project: "east-kc-neighborhood-practice",
      text:
        "Cleveland Ave Unify to Beautify listening and mapping contributed to discretionary capital-improvement decisions along the corridor.",
      status: "research-needed",
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-HENC-STRATEGIC-PLAN-2024"
      ],
      researchInquiryIds: ["INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"],
      supportSummary:
        "Jamie's account preserves the relationship as a research lead, and HENC's plan documents district-improvement and funding-accountability goals, but no proposition-level public decision record was recovered.",
      missingEvidence: [
        "dated listening-session packets and mapped priorities",
        "official attendance or meeting record",
        "PIAC or other capital request and recommendation records",
        "appropriation or project-selection record tracing a specific priority"
      ],
      boundaries: [
        "Do not convert sequence, official attendance, or HENC's general goals into funding causality."
      ],
      reviewedAt: "2026-07-15"
    }
  ],
  promotions: [
    {
      id: "PROM-EAST-KC-TIRED-OF-TIRES-OPERATIONS-2026",
      candidateClaimId: "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
      claimId: "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
      decision: "promoted",
      reason:
        "The firsthand role confirmation and independently documented collective program record support a precise initial-operations claim with clear credit and duration boundaries.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "PROM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE-2026",
      candidateClaimId: "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
      claimId: "CLM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
      decision: "promoted",
      reason:
        "Jamie's direct confirmation makes the integrated field, print, intake, and recordkeeping practice usable as reserve depth while public posts supply bounded program context.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "PROM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE-2026",
      candidateClaimId: "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
      claimId: "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
      decision: "promoted",
      reason:
        "The bounded firsthand role belongs in the bank now, with Pastor Lee and collective credit explicit and no active website projection.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "PROM-EAST-KC-INDIAN-MOUND-EXPANSION-2026",
      candidateClaimId: "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
      decision: "held",
      reason:
        "Jamie's recollection is preserved, but a dated public, neighborhood, city, operational, or collaborator source is still needed before promotion.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    },
    {
      id: "PROM-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE-2026",
      candidateClaimId: "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE",
      decision: "held",
      reason:
        "No official record recovered in this pass traces a mapped resident priority through recommendation, selection, and funding.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex public-safe archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-EAST-KC-NEIGHBORHOOD-PRACTICE-EDITORIAL-2026",
      audience:
        "Hiring managers and public-interest teams seeking field-tested implementation, service design, and community operations",
      goal:
        "Make Jamie's initial Tired of Tires operating role visible while keeping adjacent neighborhood design depth available without overloading the KC Town Hall case study.",
      argument:
        "Jamie did more than facilitate engagement: he designed an intake and service workflow, coordinated a city-facing operational handoff, performed recurring field logistics, tracked results, and used each route as a surface for neighborhood information and listening.",
      selectedClaimIds: ["CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS"],
      heldCandidateClaimIds: [
        "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE"
      ],
      rationale: [
        "Project the initial Tired of Tires operating loop because it is concrete, hiring-legible, and supported by both firsthand and public program records.",
        "Keep the cross-program field communications claim as reserve depth because it currently rests primarily on Jamie's direct account.",
        "Keep Cleveland Avenue work in reserve until public program records and collaborator credit can be expanded.",
        "Hold Indian Mound and capital influence rather than flattening a research lead into a fact."
      ],
      createdAt: "2026-07-15"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-EAST-KC-NEIGHBORHOOD-PRACTICE-RECORDS-2026",
      kind: "archive-research",
      summary:
        "Recover Tired of Tires route logs, city and recycling records, Oak Park and Indian Mound records, original handbills, HENC and Cleveland Avenue program materials, listening-session maps, collaborator confirmations, and proposition-level capital records.",
      projectHints: ["kc-town-hall", "east-kc-neighborhood-practice"],
      sourceIds: [
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-HENC-STRATEGIC-PLAN-2024",
        "SRC-KCTH-FULL-POPULATION-RUN-2026"
      ],
      candidateClaimIds: [
        "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE"
      ],
      rightsReviewRequired: true,
      status: "researching",
      createdAt: "2026-07-15"
    },
    {
      id: "DISC-EAST-KC-NEIGHBORHOOD-PRACTICE-PHOTOS-2026",
      kind: "photo-editor",
      summary:
        "Seek rights-cleared images of Jamie loading or unloading tires, working with route sheets or counts, distributing public handbills, photographing or mapping Cleveland Avenue, and supporting listening sessions without exposing addresses or unapproved participants.",
      projectHints: ["kc-town-hall", "east-kc-neighborhood-practice"],
      sourceIds: ["SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026"],
      candidateClaimIds: [
        "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
        "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
        "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
      ],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-15"
    }
  ]
};
