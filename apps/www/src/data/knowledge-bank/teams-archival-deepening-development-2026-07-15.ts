import type { KnowledgeBank } from "./schema.ts";

type TeamsArchivalDeepeningDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const teamsArchivalDeepeningDevelopmentRecords: TeamsArchivalDeepeningDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-15-TEAMS-JAMIE-PROJECTS-HISTORY-DEEPENING",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Second high-signal archival-production pass through Jamie Projects History, emphasizing underrepresented technical and collaborative practice.",
      projectHints: ["creative-technology", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Added public and protected source records for Claudette's Theatre on Wheels, promoted a bounded augmented-reality collaboration claim, and retained solo technical authorship as unresolved.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-DEEPENING-2026",
        "SRC-CLAUDETTE-MICHAEL-REES-2022",
        "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
        "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
        "CND-CLAUDETTE-AR-COLLABORATION-2022",
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-JAMIE-PROJECTS-HISTORY-2026-002"
    },
    {
      id: "INT-2026-07-15-TEAMS-CRS-DEEPENING",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Close reading of a Jamie-authored 90-day Commercial Rent Stabilization operating plan and its shared-memory context.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Promoted a bounded planning and operating-structure claim while holding completion and coalition-adoption wording.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-DEEPENING-2026",
        "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
        "CND-CRS-90-DAY-OPERATING-PLAN",
        "CND-CRS-90-DAY-PLAN-COMPLETION"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-CRS-2026-002"
    },
    {
      id: "INT-2026-07-15-TEAMS-JOB-HUNT-PARITY",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Close reading of the current job-hunt context and byte-level comparison of the July 11 application resume with the website-served resume.",
      projectHints: ["portfolio", "job-hunt"],
      status: "processed",
      disposition:
        "Confirmed resume parity as a release control. The job-hunt folder remained an editorial routing layer rather than independent proof of accomplishment claims.",
      linkedRecordIds: [
        "INQ-TEAMS-ARCHIVAL-DEEPENING-2026",
        "SRC-JOB-HUNT-RESUME-PARITY-2026"
      ],
      protectedLocatorId: "ARCHIVE-TEAMS-JOB-HUNT-2026-002"
    }
  ],
  sourceReadings: [
    {
      id: "READ-CLAUDETTE-MICHAEL-REES-2022",
      sourceId: "SRC-CLAUDETTE-MICHAEL-REES-2022",
      readAt: "2026-07-15",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-CLAUDETTE-AR-COLLABORATION",
          statement:
            "Michael Rees credits himself and Jamie Burkart with collaborating to create the augmented-reality experience.",
          locator: "Collaborator paragraph",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CLAUDETTE-INTERACTION",
          statement:
            "The project page describes short clips appearing when a participant selects the tondos in the experience.",
          locator: "Project description",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CLAUDETTE-VIDEO-CREDIT",
          statement:
            "The page credits video production to Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg with Claudette.",
          locator: "Collaborator paragraph",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The collaborator page does not allocate individual 3D, code, hosting, or deployment responsibilities."
      ],
      entityIds: [
        "Jamie-Burkart",
        "Michael-Rees",
        "Claudettes-Theatre-On-Wheels",
        "Make-Us-Visible"
      ],
      themeIds: [
        "augmented-reality",
        "participatory-media",
        "collaborative-production"
      ],
      candidateClaimIds: [
        "CND-CLAUDETTE-AR-COLLABORATION-2022",
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"
      ]
    },
    {
      id: "READ-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
      sourceId: "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
      readAt: "2026-07-15",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-CLAUDETTE-MUNICH-LISTING",
          statement:
            "Make Us Visible's Munich city program lists Claudette's Theatre On Wheels.",
          locator: "Munich project listing",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CLAUDETTE-MUNICH-CREDIT",
          statement:
            "The institutional listing credits Michael Rees and Jamie Burkart.",
          locator: "Project byline",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The listing supplies public credit and program context but no individual technical-role breakdown."
      ],
      entityIds: [
        "Jamie-Burkart",
        "Michael-Rees",
        "Claudettes-Theatre-On-Wheels",
        "Make-Us-Visible"
      ],
      themeIds: ["public-presentation", "augmented-reality"],
      candidateClaimIds: ["CND-CLAUDETTE-AR-COLLABORATION-2022"]
    },
    {
      id: "READ-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
      sourceId: "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
      readAt: "2026-07-15",
      reader: "Codex protected-archive review",
      assertions: [
        {
          id: "ASSERT-CLAUDETTE-WORKING-IMPLEMENTATION",
          statement:
            "The handoff describes a working GLB asset and code triggering seven videos when tondos are selected.",
          locator: "Implementation status paragraph",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CLAUDETTE-EIGHTH-WALL-HANDOFF",
          statement:
            "The collaboration had the experience working in 8th Wall and requested guidance for integration into the receiving project.",
          locator: "Implementation handoff request",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Collective first-person wording does not identify the author of each code, 3D, video, hosting, or deployment contribution.",
        "The correspondence contains private contact details and an implementation URL that are excluded from the repository."
      ],
      entityIds: [
        "Jamie-Burkart",
        "Michael-Rees",
        "Claudettes-Theatre-On-Wheels"
      ],
      themeIds: ["implementation-handoff", "augmented-reality", "3d-assets"],
      candidateClaimIds: [
        "CND-CLAUDETTE-AR-COLLABORATION-2022",
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"
      ]
    },
    {
      id: "READ-CRS-90-DAY-OPERATING-PLAN-2026",
      sourceId: "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
      readAt: "2026-07-15",
      reader: "Codex protected-archive review",
      assertions: [
        {
          id: "ASSERT-CRS-PLAN-ROLE-BOUNDARY",
          statement:
            "Jamie defines his role as creating shared public goods while explicitly rejecting ownership of the whole movement.",
          locator: "Core role",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-PLAN-DELIVERABLES",
          statement:
            "The plan turns coalition needs into concrete deliverables spanning joining, meetings, messaging, story stewardship, implementation readiness, governance, action tracking, and durable memory.",
          locator: "Deliverables and phased plan",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CRS-PLAN-SUCCESS-CONDITIONS",
          statement:
            "The plan gives major deliverables an explicit priority order and observable success conditions.",
          locator: "Success conditions and actual priority order",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "An authored plan does not establish that every deliverable was completed or formally adopted.",
        "The working artifact contains stakeholder, strategy, outreach, and link context that is not public."
      ],
      entityIds: [
        "Jamie-Burkart",
        "Fair-Rent-NYC",
        "NYC-Artist-Coalition"
      ],
      themeIds: [
        "operating-model",
        "implementation-planning",
        "consent-aware-workflows",
        "durable-memory"
      ],
      candidateClaimIds: [
        "CND-CRS-90-DAY-OPERATING-PLAN",
        "CND-CRS-90-DAY-PLAN-COMPLETION"
      ]
    },
    {
      id: "READ-JOB-HUNT-RESUME-PARITY-2026",
      sourceId: "SRC-JOB-HUNT-RESUME-PARITY-2026",
      readAt: "2026-07-15",
      reader: "Codex release review",
      assertions: [
        {
          id: "ASSERT-JOB-HUNT-RESUME-BYTE-PARITY",
          statement:
            "The July 11 job-hunt resume and the website-served resume had identical SHA-256 values during the review.",
          locator: "Local SHA-256 comparison",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JOB-HUNT-RESUME-PHONE-PARITY",
          statement:
            "The approved phone-in-PDF application resume is the PDF currently served by the website.",
          locator: "PDF identity and extracted contact block",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The check is point-in-time and must be rerun after any resume replacement.",
        "File identity is not independent verification of every accomplishment claim in the resume."
      ],
      entityIds: ["Jamie-Burkart", "Portfolio-Resume"],
      themeIds: ["release-parity", "job-application-readiness"],
      candidateClaimIds: []
    }
  ],
  candidateClaims: [
    {
      id: "CND-CLAUDETTE-AR-COLLABORATION-2022",
      project: "claudette-theatre-on-wheels",
      text:
        "Jamie collaborated with Michael Rees on Claudette's Theatre on Wheels, an augmented-reality project presented through Make Us Visible Munich, with documented shared video-production credit and click-triggered clips.",
      status: "promoted",
      sourceIds: [
        "SRC-CLAUDETTE-MICHAEL-REES-2022",
        "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
        "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022"
      ],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      supportSummary:
        "A collaborator-authored public page and institutional listing establish shared credit and public presentation; protected handoff metadata corroborates the interaction and implementation state.",
      missingEvidence: [],
      boundaries: [
        "Retain collective credit and do not assign individual code or 3D authorship.",
        "Keep private correspondence, contact details, implementation URLs, and uncleared media out of the repository."
      ],
      promotedClaimId: "CLM-CLAUDETTE-AR-COLLABORATION-2022",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP",
      project: "claudette-theatre-on-wheels",
      text:
        "Jamie independently built the 3D asset, application code, hosting, and final deployment for Claudette's Theatre on Wheels.",
      status: "research-needed",
      sourceIds: [
        "SRC-CLAUDETTE-MICHAEL-REES-2022",
        "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022"
      ],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      supportSummary:
        "The surviving records establish collaboration and a working implementation but do not divide technical authorship.",
      missingEvidence: [
        "project repository or revision history",
        "final deployment records",
        "collaborator confirmation of individual technical responsibilities"
      ],
      boundaries: [
        "Do not convert collective first-person implementation language into solo authorship."
      ],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-CRS-90-DAY-OPERATING-PLAN",
      project: "fair-rent-nyc",
      text:
        "Jamie authored a sequenced 90-day coalition operating plan with concrete deliverables, success conditions, consent boundaries, and durable decision infrastructure.",
      status: "promoted",
      sourceIds: ["SRC-CRS-90-DAY-OPERATING-PLAN-2026"],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      supportSummary:
        "The authored artifact directly establishes the role boundary, operating model, deliverables, priority order, and success conditions.",
      missingEvidence: [],
      boundaries: [
        "Present it as a plan and requirements artifact, not a completion or coalition-adoption record.",
        "Keep stakeholder names, outreach lists, consent records, strategy detail, and working links private."
      ],
      promotedClaimId: "CLM-CRS-90-DAY-OPERATING-PLAN",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-CRS-90-DAY-PLAN-COMPLETION",
      project: "fair-rent-nyc",
      text:
        "Jamie completed every proposed deliverable in the 90-day plan and the coalition formally adopted the operating model.",
      status: "research-needed",
      sourceIds: ["SRC-CRS-90-DAY-OPERATING-PLAN-2026"],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-DEEPENING-2026"],
      supportSummary:
        "The plan establishes intent, sequencing, and success criteria, not completion or formal adoption.",
      missingEvidence: [
        "deliverable-by-deliverable completion review",
        "coalition approval or adoption record",
        "public-safe collaborator confirmation"
      ],
      boundaries: [
        "Do not use completion or adoption language without later outcome records."
      ],
      reviewedAt: "2026-07-15"
    }
  ],
  promotions: [
    {
      id: "PROM-CLAUDETTE-AR-COLLABORATION-2026",
      candidateClaimId: "CND-CLAUDETTE-AR-COLLABORATION-2022",
      claimId: "CLM-CLAUDETTE-AR-COLLABORATION-2022",
      decision: "promoted",
      reason:
        "Public collaborator and institutional records support a bounded shared-credit claim, while the private handoff corroborates implementation without changing authorship boundaries.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-CLAUDETTE-SOLO-TECH-HOLD-2026",
      candidateClaimId: "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP",
      decision: "held",
      reason:
        "No recovered source assigns the 3D asset, code, hosting, and final deployment solely to Jamie.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-CRS-90-DAY-PLAN-2026",
      candidateClaimId: "CND-CRS-90-DAY-OPERATING-PLAN",
      claimId: "CLM-CRS-90-DAY-OPERATING-PLAN",
      decision: "promoted",
      reason:
        "The authored artifact directly supports a hiring-relevant operating-plan claim with clear planning-versus-completion boundaries.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-CRS-90-DAY-COMPLETION-HOLD-2026",
      candidateClaimId: "CND-CRS-90-DAY-PLAN-COMPLETION",
      decision: "held",
      reason:
        "The source is a plan, not a deliverable-completion ledger or coalition-adoption record.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-TEAMS-ARCHIVAL-DEEPENING-2026",
      audience:
        "Hiring managers, public-interest technology teams, implementation leaders, and future portfolio editors",
      goal:
        "Strengthen Jamie's delivery and implementation record without duplicating existing proof or turning the public site into a project inventory.",
      argument:
        "Jamie can translate emerging collective work into sequenced operating infrastructure and can collaborate across physical media, 3D interaction, video, public presentation, and technical handoff.",
      selectedClaimIds: [
        "CLM-CRS-90-DAY-OPERATING-PLAN",
        "CLM-CLAUDETTE-AR-COLLABORATION-2022"
      ],
      heldCandidateClaimIds: [
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP",
        "CND-CRS-90-DAY-PLAN-COMPLETION"
      ],
      rationale: [
        "Project the operating plan because it makes requirements definition, prioritization, success conditions, and consent-aware implementation legible to hiring readers.",
        "Keep Claudette as reserve depth because it expands the knowledge bank's range without improving the current site's primary job argument enough to justify another public project surface.",
        "Use the job-hunt collection as a release and editorial control, not as independent evidence for accomplishment claims.",
        "Hold solo technical authorship and plan-completion language because the recovered sources do not establish either proposition."
      ],
      createdAt: "2026-07-15"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-CLAUDETTE-IMPLEMENTATION-RESEARCH-2026",
      kind: "archive-research",
      summary:
        "Seek a project repository, final deployment record, collaborator confirmation, and rights-cleared documentation before assigning individual technical responsibilities or publishing project media.",
      projectHints: ["claudette-theatre-on-wheels"],
      sourceIds: [
        "SRC-CLAUDETTE-MICHAEL-REES-2022",
        "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022"
      ],
      candidateClaimIds: ["CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"],
      rightsReviewRequired: true,
      status: "researching",
      createdAt: "2026-07-15"
    },
    {
      id: "DISC-CRS-90-DAY-OUTCOME-REVIEW-2026",
      kind: "archive-research",
      summary:
        "A later closeout can compare the 90-day plan's deliverables and success conditions against public-safe completion records without exposing coalition strategy or participant data.",
      projectHints: ["fair-rent-nyc"],
      sourceIds: ["SRC-CRS-90-DAY-OPERATING-PLAN-2026"],
      candidateClaimIds: ["CND-CRS-90-DAY-PLAN-COMPLETION"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-15"
    }
  ]
};
