const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

const otiProductResume =
  "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.md";
const otiOperationsResume =
  "resumes/2026-08-14/nyc-oti-technical-operations-manager-782369/Jamie-Burkart-Resume-NYC-OTI-Technical-Operations-Manager-782369.md";

export const kcTownHallResidentServiceAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      kind: "memory-lead",
      title: "Tired of Tires resident-service oral-history addendum",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall", "tired-of-tires"],
      reason: "Preserve Jamie's detailed account of a recurring, in-person resident service; its route, print and web interfaces, municipal recycling handoff, neighborhood-survey pairing, and feedback-to-program-requirements loop without treating first-person memory as independent verification.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: ["SRC-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14"],
      observationIds: [
        "OBS-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-MEMORY",
        "OBS-KCTH-TIRED-OF-TIRES-RESEARCH-TO-REQUIREMENTS-MEMORY"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      boundaries: [
        "The recollection is a research lead and first-person professional account, not independent corroboration.",
        "Keep Jamie's contribution, shared project authorship, neighborhood-association partnership, municipal action, and resident participation distinct.",
        "Do not publish resident identities, service addresses, phone numbers, form identifiers, private logs, or raw response data."
      ]
    },
    {
      id: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      kind: "analysis-note",
      title: "Tired of Tires public service-model and participation review",
      submittedAt: reviewedAt,
      submittedBy: "Codex public-safe archival review",
      projectIds: ["kc-town-hall", "tired-of-tires"],
      reason: "Close-read the public Wayback capture alongside existing public participation records and the protected CCED proposal summary to distinguish the service model, Jamie's documented participation, shared authorship, first-party metrics, and unresolved individual ownership claims.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-REVIEW-2026-08-14",
        "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
        "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022",
        "SRC-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-ARCHIVE-2019-2022"
      ],
      observationIds: [
        "OBS-KCTH-WAYBACK-TIRED-OF-TIRES-SERVICE-MODEL",
        "OBS-KCTH-PUBLIC-TIRE-PICKUP-PARTICIPATION-SYNTHESIS",
        "OBS-KCTH-PROPOSAL-SURVEY-TO-BUILDING-REQUIREMENTS",
        "OBS-KCTH-TIRED-OF-TIRES-PROTECTED-OPERATING-WORKBOOK",
        "OBS-KCTH-TIRED-OF-TIRES-GOVERNED-VISUAL-BRIDGE"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      boundaries: [
        "A shared page byline establishes page credit, not individual program-design or field-operations authorship.",
        "Project-reported savings are retained as first-party reporting, not an independent audit or a substitute for the underlying service log.",
        "The proposal supports a survey-to-proposal relationship and specified kitchen buildout; it does not prove that one resident story caused a particular architectural requirement.",
        "Resident-level workbook rows and raw correspondence remain protected; no private-derived aggregate is projected without separate Jamie approval.",
        "The governed visual sequence documents project materials and one matched collection site; it does not establish component authorship, photographer identity, resident identity, an address, or a program total."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-MEMORY",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      sourceId: "SRC-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      project: "tired-of-tires",
      kind: "participant-memory",
      text: "Jamie reports designing and operating a recurring free tire-pickup service within KC Town Hall's ten-minute walkshed: driving every block in two directions, helping residents move tires, transporting the collected tires, coordinating the municipal recycling handoff, and using the service as a dependable in-person point of contact.",
      locator: "Participant-memory addendum, resident-service route and field-operations account.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "Public records establish Jamie's participation in pickup work but do not yet corroborate every route, shift, task, or the individual design-and-coordination account.",
        "The recollection does not establish audited monthly counts, complete geographic coverage, or outcomes for every resident."
      ]
    },
    {
      id: "OBS-KCTH-TIRED-OF-TIRES-RESEARCH-TO-REQUIREMENTS-MEMORY",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      sourceId: "SRC-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie reports pairing a 4-by-6-inch tire-schedule handbill with KC Town Hall's neighborhood survey during pickup rounds. He remembers resident conversations, including interest in formalizing home-based food businesses, becoming input to shared-kitchen and life-safety requirements for the building plan.",
      locator: "Participant-memory addendum, paired print interfaces and research-to-requirements account.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "The proposal independently shows the survey, says responses shaped proposed uses, and specifies a restaurant-incubator buildout; it does not assign Jamie handbill authorship or prove the exact causal path from a resident conversation to a requirement.",
        "Resident identities, responses, informal-business details, and contact data remain protected."
      ]
    },
    {
      id: "OBS-KCTH-WAYBACK-TIRED-OF-TIRES-SERVICE-MODEL",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      sourceId: "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "The October 2020 Wayback capture presents Tired of Tires as a recurring free service from KC Town Hall and Oak Park Neighborhood Association for homes in historic East Kansas City neighborhoods. It documents residential eligibility, a Friday-before-first-Saturday cadence, form and phone intake, a volunteer pathway, neighborhood collection followed by City recycling, a shared 'Julia and Jamie' page byline, and a first-party reported $17,768 in avoided disposal costs.",
      locator: "Wayback capture 20201030223311, public page title, byline, eligibility, schedule, intake, volunteer, City-handoff, and savings passages.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "The shared page byline supports page credit, not sole or component-level program authorship.",
        "The savings figure is first-party project reporting; the page is not an independent audit of tires, households, costs, or outcomes."
      ]
    },
    {
      id: "OBS-KCTH-PUBLIC-TIRE-PICKUP-PARTICIPATION-SYNTHESIS",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      comparisonSourceIds: [
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30"
      ],
      project: "tired-of-tires",
      kind: "source-fact",
      text: "A first-hand public account documents a dump-truck tire-pickup shift with Jamie, while a KC Town Hall operating update names Jamie among participants and the Wayback page documents the recurring service model.",
      locator: "Public posts dated June 2, 2019 and April 1, 2022, compared with Wayback capture 20201030223311.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "The records establish Jamie's participation, not sole program ownership, complete coordination, every shift, or authorship of every service component.",
        "The sources do not independently audit tire totals, resident savings, geographic coverage, or complete operating duration."
      ]
    },
    {
      id: "OBS-KCTH-PROPOSAL-SURVEY-TO-BUILDING-REQUIREMENTS",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The 2019 proposal reproduces KC Town Hall's compact neighborhood survey, says responses directly shaped the proposal, presents a bootstrapped restaurant and kitchen incubator, and budgets a commercial-kitchen hood and fire-suppression system.",
      locator: "Protected proposal bundle, public-safe review of Project Narrative pages 3-6 and Request for Funding and budget pages 8 and 12.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "The proposal supports a project-level listening-to-requirements pattern, not Jamie's individual authorship of the survey, analysis, restaurant concept, or architectural specifications.",
        "It does not prove that a specific resident story or tire-pickup conversation caused a particular program or building requirement."
      ]
    },
    {
      id: "OBS-KCTH-TIRED-OF-TIRES-PROTECTED-OPERATING-WORKBOOK",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      sourceId: "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "An authenticated protected workbook contains contemporaneous service intake, operating-log, and savings-calculator structure. Its resident-level rows, contact fields, service locations, and derived aggregates remain outside the public projection.",
      locator: "Protected archive review; opaque locator retained outside the public repository.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "Workbook custody and structure do not by themselves establish authorship for every row, formula, intake, pickup, or outcome.",
        "No resident-level record, private locator, or aggregate calculated from the protected workbook is published here."
      ]
    },
    {
      id: "OBS-KCTH-TIRED-OF-TIRES-GOVERNED-VISUAL-BRIDGE",
      intakeId: "INTAKE-KCTH-TIRED-OF-TIRES-PUBLIC-RECORD-2026-08-14",
      sourceId: "SRC-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-ARCHIVE-2019-2022",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "Authenticated project files include rendered outreach designs and a curated matched field-photograph pair showing one tire collection site before and after removal. Jamie authorized a narrowly cropped, metadata-stripped flyer derivative and the matched field pair for portfolio publication on August 14, 2026.",
      locator: "Protected project archive review; public derivatives registered in the governed photography catalog.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      limitations: [
        "The archive proves custody of the reviewed artifacts, not Jamie's individual authorship of each visual component or the identity of the photographer.",
        "The matched photographs establish one completed collection, not a resident identity, service address, program-wide total, or audited outcome."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      title: "Jamie Burkart oral-history addendum on Tired of Tires as a resident service",
      author: "Jamie Burkart",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Jamie Burkart participant-memory addendum, reviewed August 14, 2026.",
      publicNote: "A public-safe research lead preserving Jamie's account of the service's design, field delivery, print interfaces, neighborhood listening, and requirements feedback loop.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
      supportsGenerally: [
        "Jamie reported designing and operating the recurring block-by-block pickup route",
        "Jamie reported coordinating field collection with the municipal recycling handoff",
        "Jamie reported pairing tire-schedule and neighborhood-survey handbills",
        "Jamie reported using service conversations as input to KC Town Hall program and building requirements"
      ],
      doesNotEstablish: [
        "independent verification of Jamie's design, coordination, route, or complete operating role",
        "sole authorship of a collective neighborhood service",
        "audited tire totals, savings, coverage, or resident outcomes",
        "a representative survey sample or causal path from one resident story to one architectural requirement",
        "permission to publish resident identities, addresses, reports, or private logs"
      ]
    },
    {
      id: "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
      title: "Tired of Tires? Free Tire Pickup",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2019-05-02",
      capturedAt: "2020-10-30",
      accessedAt: reviewedAt,
      canonicalUrl: "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/",
      archiveUrl: "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/",
      preferredPublicUrl: "archive",
      publicCitation: "KC Town Hall, 'Tired of Tires? Free Tire Pickup,' shared byline 'Julia and Jamie,' archived October 30, 2020.",
      publicNote: "The public capture documents the resident-facing service model and first-party result reporting. Contact details, form identifiers, and embedded implementation data are not reproduced.",
      supportsGenerally: [
        "a recurring free household tire-pickup service jointly presented by KC Town Hall and Oak Park Neighborhood Association",
        "residential eligibility, recurring cadence, form and phone intake, a volunteer pathway, neighborhood collection, and City recycling handoff",
        "a shared Julia and Jamie page byline",
        "a first-party reported $17,768 in avoided disposal costs"
      ],
      doesNotEstablish: [
        "Jamie's sole or component-level authorship of the service",
        "Jamie's individual responsibility for every intake, route, pickup, transport, or log entry",
        "independently audited tire totals, household counts, savings, coverage, or outcomes",
        "a representative resident-research process",
        "the complete operating period or Indian Mound expansion"
      ]
    },
    {
      id: "SRC-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-REVIEW-2026-08-14",
      title: "Tired of Tires resident-service evidence review",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/intake/2026-08-14-kcth-tired-of-tires-resident-service.md",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart portfolio knowledge bank, 'Tired of Tires resident-service evidence review,' August 14, 2026.",
      publicNote: "AI-assisted public-safe synthesis of participant memory, public web archives, public participation records, and a protected proposal review.",
      supportsGenerally: [
        "the evidence-tier distinction between service design, Jamie's documented participation, and unresolved individual ownership details",
        "the bounded role-fit translation for current product, operations, and implementation opportunities",
        "the privacy and collective-credit decisions applied in August 2026"
      ],
      doesNotEstablish: [
        "actual participation or endorsement by any modeled hiring reader",
        "independent verification of every participant-memory detail",
        "sole authorship of a collective neighborhood service",
        "audited service totals or resident outcomes"
      ]
    },
    {
      id: "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022",
      title: "Tired of Tires protected operating workbook",
      organization: "KC Town Hall",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "KC Town Hall, Tired of Tires operating workbook, protected archive review, 2019-2022.",
      publicNote: "A summary-only record of a protected workbook containing service intake, operating-log, and calculator structure. Resident-level data and derived aggregates are not public.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022",
      supportsGenerally: [
        "the existence of contemporaneous structured service intake, operating-log, and calculation materials",
        "the project maintained more than a promotional web surface"
      ],
      doesNotEstablish: [
        "Jamie's authorship of every row, formula, intake, pickup, or operating decision",
        "independently audited totals, savings, coverage, or resident outcomes",
        "permission to publish resident identities, addresses, contact data, raw rows, private locators, or derived aggregates"
      ]
    },
    {
      id: "SRC-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-ARCHIVE-2019-2022",
      title: "Tired of Tires protected design and field archive",
      organization: "KC Town Hall",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "KC Town Hall, Tired of Tires design and field archive, protected review of 2019-2022 materials.",
      publicNote: "A summary-only custody record for rendered outreach designs and a curated matched field-photograph pair. Jamie authorized the exact public derivatives registered in the portfolio photography catalog on August 14, 2026.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-2019-2022",
      supportsGenerally: [
        "project custody of rendered outreach-design files",
        "a curated matched field-photograph pair documenting one site before and after tire removal",
        "Jamie's authorization of the exact cropped and metadata-stripped portfolio derivatives"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship of every visual component",
        "the photographer's identity",
        "a resident identity, service address, audited program total, or project-wide outcome",
        "blanket permission to publish other archive items"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM",
      project: "tired-of-tires",
      internalClaim: "Tired of Tires was a recurring resident-facing service jointly presented by KC Town Hall and Oak Park Neighborhood Association. The archived service page documents eligibility, recurring scheduling, form and phone intake, a volunteer path, neighborhood collection, City recycling coordination, and first-party result reporting; separate public records establish Jamie's named and direct participation in pickup work. The page's shared Julia and Jamie byline establishes page credit, not Jamie's sole or component-level program authorship.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "resume-html",
          text: "Helped deliver Tired of Tires, a recurring free resident service connecting household eligibility, form and phone intake, scheduled field collection, City recycling coordination, volunteer participation, and public result reporting; public records document Jamie's participation in pickup operations.",
          status: "active",
          citationRequired: false,
          surfaces: [otiProductResume]
        },
        {
          key: "technical-operations",
          text: "Helped operate Tired of Tires, a recurring free resident service connecting intake, field collection, volunteers, and a City recycling handoff; public records document Jamie's participation in pickup operations.",
          status: "active",
          citationRequired: false,
          surfaces: [otiOperationsResume]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
          relationship: "direct-support",
          supports: [
            "a recurring free household tire-pickup service jointly presented by KC Town Hall and Oak Park Neighborhood Association",
            "residential eligibility, recurring cadence, form and phone intake, a volunteer pathway, neighborhood collection, and City recycling handoff",
            "a shared Julia and Jamie page byline"
          ],
          locator: "Wayback capture 20201030223311.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
          relationship: "direct-support",
          supports: ["Jamie's direct participation in a neighborhood tire-pickup shift", "use of a dump truck"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
          relationship: "corroborating",
          supports: ["Jamie's named participation", "recurring public intake and disposal coordination"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The public records establish the service model and Jamie's participation, not sole program ownership, component-level design authorship, complete coordination, or every shift.",
        "The shared Julia and Jamie byline establishes page credit, not authorship of every graphic, form, workflow, or operating decision.",
        "The page's savings figure is first-party reporting; it is not an independent audit and is not used in the resume projections.",
        "Participant memory about the block-by-block route, paired handbills, logging, and research-to-requirements loop remains held pending artifact or collaborator corroboration."
      ],
      antiClaims: [
        "Jamie alone created or operated Tired of Tires",
        "Jamie performed every pickup or authored every service component",
        "The public page independently audits tire totals, household counts, savings, coverage, or resident outcomes",
        "The neighborhood survey was statistically representative",
        "One resident story caused a particular restaurant-incubator or fire-suppression requirement"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT",
      project: "tired-of-tires",
      question: "What public-safe artifacts can establish Jamie's component-level design and operating responsibilities, the service's month-by-month outputs, and the relationship between pickup conversations, the neighborhood survey, and KC Town Hall requirements?",
      methods: [
        "Seek the underlying tire log or spreadsheet, editable handbill and web files, form ownership metadata, City recycling records, route notes, dated photographs, and collaborator proof notes.",
        "Compare design-file authorship and operating records without publishing resident addresses, contact fields, form identifiers, phone numbers, or raw reports.",
        "Separate output counts, project-reported savings, independently audited outcomes, and qualitative resident learning.",
        "Treat the restaurant-incubator and fire-suppression connection as a participant-memory hypothesis unless a dated analysis or collaborator record establishes the causal chain."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The Wayback capture establishes the service model, shared page byline, and first-party savings report.",
        "Two public records establish Jamie's named and direct participation in pickup operations.",
        "The protected proposal review establishes a project-level survey-to-proposal relationship and specified restaurant-incubator and fire-suppression requirements.",
        "After Jamie shared relevant items into the authenticated research account, review recovered a protected operating workbook with intake, log, and calculator structure, rendered outreach designs, and a curated matched field-photograph pair.",
        "A public-safe visual sequence now places a cropped outreach artifact beside the matched before-and-after field evidence; every derivative is metadata-stripped, governed, and limited to the exact approved occurrence."
      ],
      limitations: [
        "Authenticated review used the items Jamie shared into the research account; it was not a complete audit of both Google accounts or every project file.",
        "The protected workbook is not independent corroboration of its formulas or derived figures, and no private-derived aggregate is authorized for public projection in this pass.",
        "No file-creator evidence, complete editable design history, City disposal record, or collaborator authorship note was normalized in this pass.",
        "No resident-level service or survey data is published."
      ],
      sourceIds: [
        "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
        "SRC-KCTH-TIRED-OF-TIRES-ORAL-HISTORY-2026-08-14",
        "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022",
        "SRC-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-ARCHIVE-2019-2022"
      ],
      publicSummary: "The public record supports the resident-service model and Jamie's direct participation. Protected review also recovered the operating-workbook structure, rendered outreach designs, and a matched before-and-after field pair. Component-level authorship, independently audited totals, complete operations, and the detailed research-to-requirements chain remain open.",
      protectedLocatorId: "RESEARCH-KCTH-TIRED-OF-TIRES-2026-08-14"
    }
  ]
};
