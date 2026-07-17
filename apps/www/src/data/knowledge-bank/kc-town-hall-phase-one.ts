const reviewedAt = "2026-07-15";

export const kcTownHallPhaseOne = {
  intakeItems: [
    {
      id: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      kind: "public-artifact",
      title: "KC Town Hall Phase One CCED proposal packet",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex archival production",
      projectIds: ["kc-town-hall"],
      reason: "Preserve the proposal's public-safe evidence of Jamie's documented project-manager role, the Phase One cold-shell scope, the neighborhood survey, and the multidisciplinary team without publishing private financial attachments or treating applicant-authored material as an independent audit.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
        "SRC-KCTH-JULIA-COLE-SUPPORT-LETTER-2019",
        "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29"
      ],
      observationIds: [
        "OBS-KCTH-PROPOSAL-FOUNDER-PROJECT-MANAGER",
        "OBS-KCTH-PHASE-ONE-MULTIDISCIPLINARY-SCOPE",
        "OBS-KCTH-PHASE-ONE-2018-PROGRESS",
        "OBS-KCTH-PHASE-ONE-BUDGET",
        "OBS-KCTH-NEIGHBORHOOD-SURVEY-CARD",
        "OBS-KCTH-LOCAL-HIRING-AND-MASONRY-TRAINING",
        "OBS-KCTH-LISTENING-DRIVEN-SUPPORT-LETTER",
        "OBS-KCTH-OFFICIAL-DEVELOPER-PRESENTER"
      ],
      researchInquiryIds: [
        "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
        "INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"
      ],
      boundaries: [
        "The proposal is a contemporaneous applicant-authored project record, not an independent construction audit or completion certificate.",
        "The raw packet remains outside the repository because it includes banking, personal-contact, signature, property, and other protected material.",
        "The proposal's Phase One total is a project budget representation, not an independently audited final cost.",
        "Phase One cold-shell completion must never be generalized into completion of the full redevelopment."
      ]
    },
    {
      id: "INTAKE-KCTH-PHASE-ONE-JAMIE-ACCOUNT-2026",
      kind: "collaborator-note",
      title: "Jamie Burkart first-person Phase One construction account",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Retain Jamie's direct account of serving as Phase One general contractor, coordinating specialist teams and construction sequencing, and building the neighborhood survey and contact workflow.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026"],
      observationIds: [
        "OBS-KCTH-JAMIE-GENERAL-CONTRACTOR-ACCOUNT",
        "OBS-KCTH-JAMIE-SURVEY-DATA-SYSTEM-ACCOUNT"
      ],
      researchInquiryIds: [
        "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
        "INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"
      ],
      boundaries: [
        "Attribute the general-contractor title and detailed daily sequencing to Jamie's first-person account unless further project records or collaborator testimony corroborate them.",
        "Do not convert construction coordination into sole credit for the specialist labor performed by contractors, consultants, neighbors, or collaborators.",
        "Retain the project-management signal while keeping private family, financial, legal, and later transition context out of the record."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-KCTH-PROPOSAL-FOUNDER-PROJECT-MANAGER",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal's team page names both Jamie Burkart and Julia Fredenburg as founders and project managers of KC Town Hall.",
      locator: "Project Narrative, page 1 of the proposal section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The page documents founder and project-manager roles; it does not use the title general contractor or assign sole responsibility for the work."
      ]
    },
    {
      id: "OBS-KCTH-PHASE-ONE-MULTIDISCIPLINARY-SCOPE",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal identifies a multidisciplinary project team and defines Phase One as cold-shell work spanning roof structure and membrane, structural masonry, floor framing, water service, access, site safety, and related construction logistics.",
      locator: "Project Narrative page 1; Summary of Budget and Financing page 10; Budget Detail page 11",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The proposal documents planned and reported scope, not who performed each trade task or the final as-built condition."
      ]
    },
    {
      id: "OBS-KCTH-PHASE-ONE-2018-PROGRESS",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal reports that work completed in 2018 included replacing the existing roof, repairing major structural masonry, removing several tons of debris, and reopening a long-shuttered point of egress; it describes Phase One as 66 percent complete and slated for completion in 2019.",
      locator: "Summary of Budget and Financing, page 10",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "This is applicant-authored progress reporting and a forward-looking 2019 completion statement, not an independent inspection or final completion record."
      ]
    },
    {
      id: "OBS-KCTH-PHASE-ONE-BUDGET",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal's Phase One cold-shell budget totals $189,629 and itemizes roof and TPO membrane work, masonry, floor framing, water service, access, safety, storage, debris removal, tools, and soft costs.",
      locator: "Budget Detail, Phase One: Cold Shell, page 11",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The total is the proposal's budget representation, not an independently audited final cost or proof that every line item was completed exactly as budgeted."
      ]
    },
    {
      id: "OBS-KCTH-NEIGHBORHOOD-SURVEY-CARD",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "visual-observation",
      text: "The proposal reproduces a KC Town Hall neighborhood survey card asking residents what they wanted at 36th and Indiana and states that an ongoing survey with neighborhood partners directly shaped the proposal.",
      locator: "Neighborhood Process, Project Narrative page 3",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      limitations: [
        "The reproduced blank card does not establish response count, representativeness, complete results, authorship, or the structure of the backing data system."
      ]
    },
    {
      id: "OBS-KCTH-LOCAL-HIRING-AND-MASONRY-TRAINING",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal reports a local and minority-owned contractor practice and describes masonry tuckpointing as a neighborhood skills-training focus facilitated by a restoration mason.",
      locator: "Progress: Local Industry, Project Narrative page 6",
      status: "extracted",
      publicSafe: true,
      claimIds: ["CLM-KCTH-LOCAL-WORKFORCE-PRACTICE"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The proposal's contractor count, ownership classifications, residences, training participation, and employment outcomes were not independently reconciled in this pass."
      ]
    },
    {
      id: "OBS-KCTH-LISTENING-DRIVEN-SUPPORT-LETTER",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-JULIA-COLE-SUPPORT-LETTER-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "A January 2019 support letter says Jamie and Julia were invested in a listening-driven process intended to center surrounding-neighborhood assets and needs and that the process was already underway.",
      locator: "Julia Cole support letter, second page",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      limitations: [
        "A support letter is an informed collaborator assessment, not a representative resident survey, outcome evaluation, or complete division-of-labor record."
      ]
    },
    {
      id: "OBS-KCTH-OFFICIAL-DEVELOPER-PRESENTER",
      intakeId: "INTAKE-KCTH-PHASE-ONE-PROPOSAL-PACKET-2019",
      sourceId: "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Official CCED Board minutes list Jamie Burkart as the developer/presenter for KC Town Hall's proposal and record three named public speakers supporting the project.",
      locator: "June 12, 2019 minutes, proposal table and public-comment list, pages 5 and 7 of the meeting packet",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The minutes do not use the title general contractor, enumerate Jamie's daily responsibilities, or establish the content of each supporter's remarks."
      ]
    },
    {
      id: "OBS-KCTH-JAMIE-GENERAL-CONTRACTOR-ACCOUNT",
      intakeId: "INTAKE-KCTH-PHASE-ONE-JAMIE-ACCOUNT-2026",
      sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie states that he served as general contractor for Phase One, completed in 2019, and was on site each morning coordinating masonry, roofing, carpentry, welding, engineering, architecture, plumbing, and the timing of the TPO membrane, restored parapet, and ceramic parapet caps.",
      locator: "Jamie first-person account, July 15, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: [
        "CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION",
        "CLM-KCTH-ONSITE-SEQUENCING-PRACTICE"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "This is direct participant testimony, not an independent inspection, contract set, invoice ledger, permit record, or collaborator testimonial.",
        "Coordination credit does not replace credit for the specialist labor of the project team."
      ]
    },
    {
      id: "OBS-KCTH-JAMIE-SURVEY-DATA-SYSTEM-ACCOUNT",
      intakeId: "INTAKE-KCTH-PHASE-ONE-JAMIE-ACCOUNT-2026",
      sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie states that he created the four-by-six-inch neighborhood survey handbill and its backing contact and data-collection system so daily site conversations could accumulate into participatory vision for the space.",
      locator: "Jamie first-person account, July 15, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      limitations: [
        "The proposal reproduces the handbill but does not independently establish Jamie's authorship, the backing system, response count, or representativeness."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
      title: "KC Town Hall CCED grant proposal and support-letter packet",
      organization: "KC Town Hall LLC",
      author: "Jamie Burkart and Julia Fredenburg",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Public-safe close reading of KC Town Hall's 2019 CCED grant proposal packet.",
      publicNote: "Only public-safe role, scope, budget, survey, and process observations are retained; the raw packet and sensitive attachments remain outside the repository.",
      supportsGenerally: [
        "Jamie and Julia named as founders and project managers",
        "multidisciplinary project-team structure",
        "Phase One cold-shell scope and 2018 progress report",
        "$189,629 Phase One proposal budget",
        "reproduced neighborhood survey card",
        "applicant-described local workforce and masonry-training practice"
      ],
      doesNotEstablish: [
        "independent verification of applicant-authored claims",
        "Jamie's general-contractor title",
        "actual completion of Phase One in 2019",
        "independently audited final construction cost",
        "completion of the full redevelopment",
        "executed City funding agreement or disbursement",
        "current property or project status"
      ],
      protectedLocatorId: "ARCHIVE-KCTH-CCED-PROPOSAL-PACKET-2019"
    },
    {
      id: "SRC-KCTH-JULIA-COLE-SUPPORT-LETTER-2019",
      title: "Julia Cole letter supporting the KC Town Hall CCED application",
      author: "Julia Cole",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2019-01-31",
      accessedAt: reviewedAt,
      publicCitation: "Julia Cole support letter for the KC Town Hall CCED application, January 31, 2019.",
      publicNote: "The bank retains only the letter's public-safe assessment of a listening-driven neighborhood process; signature and contact details remain protected.",
      supportsGenerally: [
        "collaborator assessment of Jamie's community-oriented practice",
        "listening-driven process already underway",
        "intention to center surrounding-neighborhood assets and needs"
      ],
      doesNotEstablish: [
        "representative resident opinion",
        "survey response count or results",
        "Jamie's sole authorship or labor",
        "construction completion",
        "measured neighborhood outcomes",
        "permission to publish the raw letter"
      ],
      protectedLocatorId: "ARCHIVE-KCTH-JULIA-COLE-LETTER-2019"
    },
    {
      id: "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29",
      title: "Central City Economic Development Sales Tax Board public meeting packet",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-07-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
      preferredPublicUrl: "canonical",
      publicCitation: "Central City Economic Development Sales Tax Board public meeting packet, July 29, 2019.",
      publicNote: "The packet's June 12 minutes list Jamie Burkart as KC Town Hall's developer/presenter and record public testimony in support; its July 16 minutes record the Board's later recommendation.",
      supportsGenerally: [
        "Jamie listed as KC Town Hall developer/presenter",
        "public CCED presentation context",
        "three named public speakers recorded in support of KC Town Hall",
        "Board recommendation chronology"
      ],
      doesNotEstablish: [
        "Jamie's general-contractor title",
        "Jamie's complete project responsibilities",
        "the content of each supporter's remarks",
        "Phase One completion",
        "Council appropriation or disbursement",
        "sole causation"
      ]
    },
    {
      id: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
      title: "Jamie Burkart first-person account of KC Town Hall Phase One",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Jamie Burkart first-person account of his KC Town Hall Phase One construction and neighborhood-process roles, July 2026.",
      publicNote: "Jamie's direct account supplies the general-contractor title, daily coordination practice, specialist-team scope, completion date, and survey-system authorship while remaining explicitly participant testimony.",
      supportsGenerally: [
        "Jamie's Phase One general-contractor role",
        "Phase One completion in 2019",
        "daily on-site construction coordination",
        "specialist-team and technical sequencing account",
        "four-by-six survey handbill and backing data-system authorship"
      ],
      doesNotEstablish: [
        "independent corroboration of Jamie's account",
        "sole performance of specialist trade labor",
        "complete division of labor",
        "independently audited final construction cost",
        "completion of the full redevelopment",
        "current property or project status"
      ],
      protectedLocatorId: "CONFIRMATION-KCTH-PHASE-ONE-JAMIE-2026"
    }
  ],

  claims: [
    {
      id: "CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER",
      project: "kc-town-hall",
      internalClaim: "Official June 2019 CCED Board minutes list Jamie Burkart as KC Town Hall's developer/presenter.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Official CCED Board minutes list Jamie as KC Town Hall's developer/presenter in the public funding process.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29",
          relationship: "direct-support",
          supports: ["Jamie listed as KC Town Hall developer/presenter"],
          locator: "June 12, 2019 minutes, proposal table",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Preserve the official record's developer/presenter wording.",
        "Use separate evidence for the general-contractor title and detailed construction duties."
      ],
      antiClaims: [
        "The minutes name Jamie as general contractor.",
        "The minutes establish Jamie's complete responsibilities.",
        "Jamie alone caused the Board or Council action."
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex official-record review"]
    },
    {
      id: "CLM-KCTH-PHASE-ONE-ROLE-AND-CONSTRUCTION",
      project: "kc-town-hall",
      internalClaim: "Jamie co-founded and project-managed KC Town Hall and states that he served as general contractor for the 2018-2019 Phase One cold-shell restoration, coordinating specialist teams across a proposal budget of $189,629.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "During the 2018-2019 Phase One cold-shell restoration, Jamie served as co-founder, project manager, and general contractor, coordinating specialist teams across a $189,629 proposal budget.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        },
        {
          key: "work-card",
          text: "Co-founded and project-managed a neighborhood-led restoration, serving as Phase One general contractor across a $189,629 cold-shell scope.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
          relationship: "direct-support",
          supports: [
            "Jamie's Phase One general-contractor role",
            "Phase One completion in 2019",
            "daily on-site construction coordination"
          ],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
          relationship: "corroborating",
          supports: [
            "Jamie named as founder and project manager",
            "multidisciplinary Phase One scope",
            "$189,629 Phase One proposal budget"
          ],
          locator: "Project Narrative page 1; Summary page 10; Budget Detail page 11",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29",
          relationship: "corroborating",
          supports: ["Jamie listed as KC Town Hall developer/presenter"],
          locator: "June 12, 2019 minutes, proposal table",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The general-contractor title and 2019 completion date are Jamie's first-person account; the proposal independently names him as founder and project manager and documents the Phase One scope.",
        "The $189,629 figure is the proposal's Phase One budget total, not an independently audited final cost.",
        "Phase One cold-shell completion is not completion of the full redevelopment.",
        "Construction coordination does not erase specialist, collaborator, contractor, or neighborhood labor."
      ],
      antiClaims: [
        "The proposal independently identifies Jamie as general contractor.",
        "Jamie personally performed every trade task.",
        "The full KC Town Hall redevelopment was completed in 2019.",
        "The $189,629 is an independently audited final construction cost.",
        "Jamie alone created or delivered KC Town Hall."
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex proposal and official-record review"]
    },
    {
      id: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      project: "kc-town-hall",
      internalClaim: "Jamie states that he created a four-by-six-inch neighborhood survey handbill and backing contact and data-collection system; the proposal reproduces the card, says an ongoing partner survey shaped the proposal, and includes collaborator support for the listening-driven process.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie created a four-by-six neighborhood survey handbill and backing contact and data-collection workflow so daily site conversations could inform a participatory vision for the space.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
          relationship: "direct-support",
          supports: ["four-by-six survey handbill and backing data-system authorship"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
          relationship: "corroborating",
          supports: ["reproduced neighborhood survey card", "proposal statement that the ongoing survey shaped the proposal"],
          locator: "Neighborhood Process, Project Narrative page 3",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-JULIA-COLE-SUPPORT-LETTER-2019",
          relationship: "corroborating",
          supports: ["listening-driven process already underway"],
          locator: "Second page",
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Attribute handbill and backing-system authorship to Jamie's first-person account; the proposal corroborates the artifact and process, not authorship.",
        "Do not infer response count, representativeness, participant consent, or completed implementation of every expressed preference.",
        "Keep all respondent names, contact details, response rows, and backing-system records protected."
      ],
      antiClaims: [
        "The survey was statistically representative.",
        "Every neighborhood resident participated.",
        "The proposal proves Jamie alone designed the survey.",
        "Every survey preference was implemented.",
        "The raw survey data may be published."
      ],
      researchInquiryIds: ["INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex proposal and collaborator-letter review"]
    },
    {
      id: "CLM-KCTH-LOCAL-WORKFORCE-PRACTICE",
      project: "kc-town-hall",
      internalClaim: "The proposal describes a local and minority-owned contractor practice and neighborhood masonry skills training during Phase One.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text: "The proposal describes local contractor participation and neighborhood masonry skills training during Phase One.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
          relationship: "private-support",
          supports: ["applicant-described local workforce and masonry-training practice"],
          locator: "Progress: Local Industry, Project Narrative page 6",
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Treat the proposal as applicant self-report until payroll, contract, certification, or participant evidence is reviewed.",
        "Do not publish contractor identities or neighborhood-residence assertions without separate review."
      ],
      antiClaims: [
        "The contractor count was independently audited.",
        "Every listed contractor met a verified ownership classification.",
        "The proposal proves employment or training outcomes.",
        "Jamie alone created the local workforce practice."
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex proposal review"]
    },
    {
      id: "CLM-KCTH-ONSITE-SEQUENCING-PRACTICE",
      project: "kc-town-hall",
      internalClaim: "Jamie recalls being first on site each morning with measured drawings and survey cards, coordinating work from basement to scaffolding to roof deck and sequencing the TPO membrane with parapet restoration and ceramic-cap installation.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text: "Jamie's first-person account describes daily field coordination across drawings, specialist teams, scaffolding, roof work, and preservation-sensitive construction sequencing.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026",
          relationship: "direct-support",
          supports: ["daily on-site construction coordination", "specialist-team and technical sequencing account"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
          relationship: "corroborating",
          supports: ["multidisciplinary project-team structure", "Phase One cold-shell scope and 2018 progress report"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Retain this precise field-practice account for future corroboration through measured drawings, contracts, invoices, photographs, permits, or collaborator proof notes.",
        "Do not convert coordination into sole authorship or performance of specialist trade work."
      ],
      antiClaims: [
        "The proposal independently proves Jamie was first on site every morning.",
        "Jamie personally installed every construction component.",
        "The exact construction sequence has been independently reconstructed.",
        "The detailed memory is a collaborator testimonial."
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex proposal review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
      project: "kc-town-hall",
      question: "What can be established about Jamie's Phase One construction role, the specialist scope, the 2019 completion, and the project budget without turning a proposal or first-person memory into an independent audit?",
      methods: [
        "Extracted the complete 24-page proposal packet and inspected all pages as rendered images.",
        "Close-read the team page, Phase One narrative, local-industry page, budget summary, budget detail, and support letters.",
        "Cross-checked the public CCED Board meeting packet for Jamie's official developer/presenter designation and the recorded support context.",
        "Separated Jamie's July 2026 first-person construction account from the propositions independently visible in the contemporaneous and official records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The proposal names Jamie and Julia as founders and project managers.",
        "Official CCED minutes list Jamie as KC Town Hall's developer/presenter.",
        "The proposal documents a multidisciplinary Phase One cold-shell scope and reports substantial 2018 work.",
        "The proposal's Phase One budget totals $189,629.",
        "Jamie directly confirms serving as Phase One general contractor and completing the phase in 2019.",
        "The precise daily construction-coordination and TPO/parapet sequence remain first-person testimony pending further corroboration."
      ],
      limitations: [
        "The proposal is applicant-authored and alternates between reporting 66 percent completion, planning 2019 completion, and labeling a budget column completed 2019; it is not a final inspection certificate.",
        "The official meeting packet establishes developer/presenter status, not the general-contractor title or complete daily duties.",
        "The review did not inspect contracts, invoices, payment records, permits, inspections, measured drawings, construction photographs, or collaborator testimony.",
        "The $189,629 total is a proposal budget representation rather than an independently audited final cost.",
        "Phase One cold-shell completion is not completion of the full redevelopment or evidence of later City-fund disbursement."
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
        "SRC-KCTH-CCED-MEETING-PACKET-2019-07-29",
        "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026"
      ],
      publicSummary: "Contemporaneous and official records establish Jamie as a founder, project manager, and developer/presenter and document the Phase One scope; Jamie's direct account supplies the general-contractor title, 2019 completion, and detailed field practice.",
      protectedLocatorId: "RESEARCH-KCTH-PHASE-ONE-2026"
    },
    {
      id: "INQ-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
      project: "kc-town-hall",
      question: "What can be established about KC Town Hall's neighborhood survey and Jamie's role in turning daily site conversations into a participatory planning and contact system?",
      methods: [
        "Visually inspected the proposal's Neighborhood Process page and reproduced survey card.",
        "Close-read the proposal's statement about the partner survey shaping the proposal.",
        "Separated Julia Cole's contemporaneous support-letter assessment from Jamie's first-person authorship account."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The proposal reproduces the neighborhood survey card and says an ongoing survey with neighborhood partners shaped the proposal.",
        "A contemporaneous support letter describes a listening-driven neighborhood process already underway.",
        "Jamie directly confirms creating the four-by-six handbill and its backing contact and data-collection workflow."
      ],
      limitations: [
        "The raw survey responses, backing system, contact ledger, and participant identities were not reviewed or retained.",
        "The proposal does not independently establish handbill authorship, response count, representativeness, or implementation of expressed preferences.",
        "The support letter is a collaborator assessment, not representative neighborhood testimony or an outcome evaluation."
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-PACKET-2019",
        "SRC-KCTH-JULIA-COLE-SUPPORT-LETTER-2019",
        "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026"
      ],
      publicSummary: "The proposal preserves the survey artifact and says neighborhood input shaped the project; Jamie's direct account supplies authorship of the handbill and backing workflow.",
      protectedLocatorId: "RESEARCH-KCTH-NEIGHBORHOOD-SURVEY-2026"
    }
  ],

  page: {
    sourceOrder: ["SRC-KCTH-CCED-MEETING-PACKET-2019-07-29"],
    occurrences: [
      {
        id: "official-developer-presenter",
        claimId: "CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER",
        projection: "case-study",
        sourceIds: ["SRC-KCTH-CCED-MEETING-PACKET-2019-07-29"]
      }
    ]
  }
} as const;
