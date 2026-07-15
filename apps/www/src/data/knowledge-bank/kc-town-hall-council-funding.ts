const reviewedAt = "2026-07-14";
const reviewedBy = ["Jamie Burkart", "Codex public-source review"];

export const kcTownHallCouncilFunding = {
  intakeItems: [
    {
      id: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      kind: "public-artifact",
      title: "KC Town Hall CCED recommendation and Council funding record",
      submittedAt: "2026-07-14",
      submittedBy: "Jamie Burkart and Codex public-source review",
      projectIds: ["kc-town-hall"],
      reason: "Replace recommendation-only wording with the complete public record of Board recommendation, Council acceptance and appropriation, non-disbursement, withdrawal, and return of the unused appropriation.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-KC-TOWN-HALL-RESOLUTION-190649",
        "SRC-KC-TOWN-HALL-ORDINANCE-190642",
        "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
        "SRC-KC-TOWN-HALL-ORDINANCE-240317"
      ],
      observationIds: [
        "OBS-KC-TOWN-HALL-BOARD-RECOMMENDATION-190649",
        "OBS-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-190649",
        "OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642",
        "OBS-KC-TOWN-HALL-NO-DISBURSEMENT-2022",
        "OBS-KC-TOWN-HALL-WITHDRAWAL-240317"
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      boundaries: [
        "Council acceptance and appropriation are not receipt, disbursement, expenditure, an executed funding agreement, construction, or completion.",
        "The legislative records do not establish Jamie's individual role in securing either Council action.",
        "Any public account of the appropriation must retain the later non-disbursement, withdrawal, and return of the unused amount."
      ]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-RESUME-CONTRIBUTION-2026",
      kind: "public-artifact",
      title: "KC Town Hall contribution in Jamie Burkart's approved resume",
      submittedAt: "2026-07-14",
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Keep Jamie's planning and documentation contribution distinct from the municipal records establishing institutional funding actions.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-JAMIE-RESUME-KC-TOWN-HALL-2026"],
      observationIds: ["OBS-KC-TOWN-HALL-JAMIE-PLANNING-RESUME"],
      researchInquiryIds: [],
      boundaries: [
        "The approved resume is Jamie's public professional account, not independent verification by the City or a collaborator.",
        "The resume does not establish that Jamie caused the Board recommendation or Council actions.",
        "Co-led does not mean sole ownership of the project or every planning, legal, financial, design, or construction decision."
      ]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026",
      kind: "memory-lead",
      title: "KC Town Hall stewardship transition",
      submittedAt: "2026-07-14",
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Preserve Jamie's first-party account that he transitioned project stewardship to a mission-aligned organization without prematurely projecting an uncorroborated transition history.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: [],
      observationIds: ["OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
      boundaries: [
        "Do not identify the receiving organization until Jamie approves the name and a public-safe source or collaborator note supports the transfer.",
        "Do not treat a participant memory as proof of legal transfer, organizational succession, municipal approval, or the later withdrawal sequence.",
        "Private reasons for the transition remain outside the public repository."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-KC-TOWN-HALL-BOARD-RECOMMENDATION-190649",
      intakeId: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Resolution 190649 recites that the Central City Economic Development Sales Tax Board voted at its July 16, 2019 meeting to recommend $490,539 in CCED funding for KC Town Hall project costs.",
      locator: "Authenticated resolution, p. 1, fourth recital",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      limitations: [
        "The Council resolution records the Board action but does not establish Jamie's individual role in obtaining the recommendation.",
        "A Board recommendation is not a Council appropriation or disbursement."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-190649",
      intakeId: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "On September 26, 2019, the Kansas City Council adopted Resolution 190649 as substituted, accepted the CCED Board's recommendation for an amount not to exceed $490,539, and authorized the City Manager to negotiate a funding agreement with specified eligible uses and conditions.",
      locator: "Legislative history; authenticated resolution, title and Sections 1-3",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      limitations: [
        "Authorization to negotiate does not establish that a funding agreement was executed.",
        "Council acceptance does not establish receipt or expenditure of funds."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642",
      intakeId: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "On September 26, 2019, the Kansas City Council passed Ordinance 190642 as substituted; Section 2 appropriated $490,539 to KC Town Hall in the Central City Sales Tax-Projects account.",
      locator: "Legislative history; authenticated ordinance, Section 2 project table on pp. 1-2",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      limitations: [
        "An appropriation authorizes and reserves a budget amount; it does not establish that funds were received, disbursed, or spent.",
        "The ordinance does not establish Jamie's individual role in the Council vote."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-NO-DISBURSEMENT-2022",
      intakeId: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      sourceId: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Kansas City's May 17, 2022 CCED project update listed a $490,539 KC Town Hall budget, no funds disbursed, and General Services negotiating the funding agreement.",
      locator: "Round 2 project-status table, KC Town Hall row",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      limitations: [
        "The update is a May 17, 2022 status snapshot and does not by itself establish what happened afterward.",
        "It does not identify responsibility for the negotiation timeline."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-WITHDRAWAL-240317",
      intakeId: "INTAKE-KC-TOWN-HALL-COUNCIL-FUNDING-2019",
      sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "In 2024, Ordinance 240317 recorded that KC Town Hall had withdrawn and reduced the full $490,539 project account so the unused appropriation could return to the Central City Sales Tax Fund.",
      locator: "Ordinance title, recitals, and Section 1",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      limitations: [
        "The ordinance does not state why KC Town Hall withdrew or assign individual responsibility.",
        "The withdrawal does not erase the Council's documented 2019 acceptance and appropriation."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-JAMIE-PLANNING-RESUME",
      intakeId: "INTAKE-KC-TOWN-HALL-RESUME-CONTRIBUTION-2026",
      sourceId: "SRC-JAMIE-RESUME-KC-TOWN-HALL-2026",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Jamie's approved public resume identifies him as KC Town Hall LLC co-founder and project manager and says he co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building.",
      locator: "Resume PDF, KC Town Hall LLC entry",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KC-TOWN-HALL-JAMIE-PLANNING-CONTRIBUTION"],
      researchInquiryIds: [],
      limitations: [
        "This is a first-party professional account and should be attributed to the approved resume.",
        "It does not independently establish municipal causation, project completion, or sole authorship."
      ]
    },
    {
      id: "OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY",
      intakeId: "INTAKE-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie recalls transitioning project stewardship to a mission-aligned organization during the conclusion of his role.",
      locator: "Jamie-provided participant-memory lead; transfer documentation or collaborator corroboration not yet normalized",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
      limitations: [
        "The receiving organization is intentionally unnamed pending public-safe source and consent review.",
        "The memory does not establish the legal form, effective date, scope, or acceptance of the transition.",
        "It does not establish the relationship between Jamie's transition and the City's later record of project withdrawal."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      title: "Second Committee Substitute for Resolution No. 190649",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Second Committee Substitute for Resolution No. 190649, adopted September 26, 2019.",
      publicNote: "The authenticated resolution's fourth recital records the July 16, 2019 Board recommendation; Sections 1-3 record Council acceptance and authority to negotiate a conditional funding agreement.",
      supportsGenerally: [
        "the CCED Board voted to recommend $490,539 for KC Town Hall",
        "the Council accepted the CCED Board recommendation",
        "the Council authorized negotiation of a funding agreement",
        "the Council adopted Resolution 190649 as substituted on September 26, 2019"
      ],
      doesNotEstablish: [
        "that a funding agreement was executed",
        "that funds were received, disbursed, or spent",
        "that the project was completed",
        "Jamie's individual role in securing the Board or Council actions"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      title: "Committee Substitute for Ordinance No. 190642",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Committee Substitute for Ordinance No. 190642, passed September 26, 2019.",
      publicNote: "The legislative history records passage as substituted; Section 2's project table on pages 1-2 appropriates $490,539 to KC Town Hall.",
      supportsGenerally: [
        "the Council passed Ordinance 190642 as substituted on September 26, 2019",
        "the Council appropriated $490,539 to KC Town Hall",
        "the appropriation followed Round Two recommendations from the Central City Sales Tax Board"
      ],
      doesNotEstablish: [
        "that appropriated funds were received, disbursed, or spent",
        "that a funding agreement was executed",
        "that the project was completed",
        "Jamie's individual role in securing the Council vote"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      title: "Central City Sales Tax Project Updates - May 17, 2022",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-05-17",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://clerk.kcmo.gov/View.ashx?GUID=C851CE5D-2041-4E27-9967-26DB1BFD1D4F&ID=10918035&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, 'Central City Sales Tax Project Updates,' May 17, 2022.",
      publicNote: "The KC Town Hall row in the official Round 2 status table lists a $490,539 budget, no disbursed amount, and a funding agreement still under negotiation.",
      supportsGenerally: [
        "the KC Town Hall CCED budget remained $490,539",
        "no KC Town Hall funds were reported as disbursed on May 17, 2022",
        "the KC Town Hall funding agreement remained under negotiation on May 17, 2022"
      ],
      doesNotEstablish: [
        "what occurred after May 17, 2022",
        "the reason for the negotiation timeline",
        "individual responsibility for the project's status",
        "the status of unrelated public or private funding"
      ]
    },
    {
      id: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      title: "Ordinance No. 240317",
      organization: "Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-03-28",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
      assetUrl: "https://clerk.kcmo.gov/View.ashx?M=F&ID=12810736&GUID=3A0D7DA0-D417-4A3B-A922-B9EA9A6EB862",
      preferredPublicUrl: "canonical",
      publicCitation: "Council of Kansas City, Missouri, Ordinance No. 240317, passed March 28, 2024.",
      publicNote: "The title, recitals, and Section 1 confirm the 2019 KC Town Hall appropriation, record project withdrawal, and reclaim the full unused amount.",
      supportsGenerally: [
        "retrospective confirmation of the 2019 $490,539 KC Town Hall appropriation",
        "KC Town Hall later withdrew from the project",
        "the Council reclaimed the full unused $490,539 project appropriation in 2024"
      ],
      doesNotEstablish: [
        "the reason for withdrawal",
        "individual responsibility for withdrawal",
        "that the 2019 Council appropriation did not occur",
        "the status of unrelated funding or property interests"
      ]
    },
    {
      id: "SRC-JAMIE-RESUME-KC-TOWN-HALL-2026",
      title: "Jamie Burkart - Resume - Technical Project Manager",
      organization: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-06-11",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, 'Resume - Technical Project Manager,' KC Town Hall LLC entry, June 11, 2026.",
      publicNote: "The KC Town Hall LLC entry identifies Jamie as co-founder and project manager and describes his planning and public-benefit documentation contribution.",
      supportsGenerally: [
        "Jamie served as a KC Town Hall LLC co-founder and project manager",
        "Jamie co-led redevelopment planning and public-benefit documentation for the proposed adaptive reuse"
      ],
      doesNotEstablish: [
        "independent third-party verification of Jamie's contribution",
        "Jamie's causal role in the Board recommendation or Council actions",
        "sole ownership of collective project work",
        "receipt or expenditure of the City appropriation",
        "construction or project completion"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION",
      project: "kc-town-hall",
      internalClaim: "After the CCED Board recommended KC Town Hall's proposal, the Kansas City Council accepted the recommendation, authorized funding-agreement negotiations, and separately appropriated $490,539 on September 26, 2019. A 2022 City update reported no disbursement and an agreement still under negotiation; after the project withdrew, the Council returned the full unused appropriation to the fund in 2024.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "After the CCED Board recommended KC Town Hall's proposal, the Kansas City Council accepted the recommendation, authorized funding-agreement negotiations, and separately appropriated $490,539 in 2019. City records reported no disbursement and an agreement still under negotiation in 2022; after the project withdrew, the Council returned the full unused appropriation to the fund in 2024.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        },
        {
          key: "archive-note",
          text: "The public record traces KC Town Hall from a $490,539 CCED Board recommendation through Council acceptance, negotiation authority, and appropriation, followed by non-disbursement, withdrawal, and return of the unused amount.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
          relationship: "direct-support",
          supports: [
            "the CCED Board voted to recommend $490,539 for KC Town Hall",
            "the Council accepted the CCED Board recommendation",
            "the Council authorized negotiation of a funding agreement"
          ],
          locator: "Authenticated resolution, title, recitals, and Sections 1-3",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
          relationship: "direct-support",
          supports: [
            "the Council passed Ordinance 190642 as substituted on September 26, 2019",
            "the Council appropriated $490,539 to KC Town Hall"
          ],
          locator: "Legislative history and authenticated ordinance, Section 2 project table",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
          relationship: "supports-boundary",
          supports: [
            "no KC Town Hall funds were reported as disbursed on May 17, 2022",
            "the KC Town Hall funding agreement remained under negotiation on May 17, 2022"
          ],
          locator: "Round 2 project-status table, KC Town Hall row",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
          relationship: "supports-boundary",
          supports: [
            "KC Town Hall later withdrew from the project",
            "the Council reclaimed the full unused $490,539 project appropriation in 2024"
          ],
          locator: "Title, recitals, and Section 1",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Appropriation is not receipt, disbursement, expenditure, an executed funding agreement, construction, or completion.",
        "The legislative record does not establish Jamie's individual role in securing the Board recommendation or Council actions.",
        "Any public account of the 2019 appropriation must retain the later non-disbursement, withdrawal, and return of the full unused amount."
      ],
      antiClaims: [
        "KC Town Hall received $490,539",
        "KC Town Hall spent $490,539",
        "A funding agreement was executed",
        "The City funded construction or project completion",
        "Jamie secured or caused the Board recommendation or Council appropriation",
        "The public record establishes why the project withdrew"
      ],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-KC-TOWN-HALL-JAMIE-PLANNING-CONTRIBUTION",
      project: "kc-town-hall",
      internalClaim: "Jamie's approved resume identifies him as KC Town Hall LLC co-founder and project manager and says he co-led redevelopment planning and public-benefit documentation for the proposed adaptive reuse.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Jamie co-founded KC Town Hall LLC and served as project manager, co-leading redevelopment planning and public-benefit documentation for the proposed adaptive reuse.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }],
      evidence: [{
        sourceId: "SRC-JAMIE-RESUME-KC-TOWN-HALL-2026",
        relationship: "direct-support",
        supports: [
          "Jamie served as a KC Town Hall LLC co-founder and project manager",
          "Jamie co-led redevelopment planning and public-benefit documentation for the proposed adaptive reuse"
        ],
        locator: "Resume PDF, KC Town Hall LLC entry",
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "This is Jamie's approved first-party professional account, not an independent municipal or collaborator attribution.",
        "Co-leadership does not imply sole ownership of collective project work.",
        "This claim is separate from the municipal records and does not establish that Jamie caused the Board or Council actions."
      ],
      antiClaims: [
        "Jamie alone created or controlled KC Town Hall LLC",
        "Jamie caused the CCED Board recommendation",
        "Jamie secured the Council appropriation",
        "Jamie's planning work establishes receipt, construction, or completion"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KC-TOWN-HALL-COUNCIL-FUNDING-2026",
      project: "kc-town-hall",
      question: "What did Kansas City formally approve after the CCED Board recommendation, and what happened to the appropriation afterward?",
      methods: [
        "Read the authenticated Second Committee Substitute for Resolution 190649 and its legislative history.",
        "Read the authenticated Committee Substitute for Ordinance 190642 and its legislative history.",
        "Compared the 2019 Council actions with the May 17, 2022 CCED project-status table.",
        "Read Ordinance 240317 and its legislative history for the later disposition of the full project account."
      ],
      runAt: "2026-07-14",
      resultStatus: "recovered",
      findings: [
        "The Council accepted the CCED Board recommendation and authorized negotiation of a conditional funding agreement.",
        "The Council separately appropriated $490,539 to KC Town Hall in the Central City Sales Tax-Projects account.",
        "The 2022 status table reported no funds disbursed and an agreement still under negotiation.",
        "The project later withdrew, and the Council returned the full unused appropriation to the fund in 2024."
      ],
      limitations: [
        "The records do not establish Jamie's individual causal role in the Board or Council actions.",
        "The records do not establish an executed funding agreement, receipt, expenditure, construction, or completion.",
        "The 2024 ordinance does not explain the reasons for withdrawal or assign individual responsibility."
      ],
      sourceIds: [
        "SRC-KC-TOWN-HALL-RESOLUTION-190649",
        "SRC-KC-TOWN-HALL-ORDINANCE-190642",
        "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
        "SRC-KC-TOWN-HALL-ORDINANCE-240317"
      ],
      publicSummary: "Official records establish Board recommendation, Council acceptance and appropriation, no reported disbursement in 2022, and return of the full unused amount after project withdrawal in 2024."
    },
    {
      id: "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
      project: "kc-town-hall",
      question: "What public-safe evidence can establish Jamie's transition of project stewardship to a mission-aligned organization, and how does that transition relate to the later municipal withdrawal record?",
      methods: [
        "Retain Jamie's account as a participant-memory lead rather than a projected claim.",
        "Seek a public-safe transfer record or collaborator note before identifying the receiving organization or promoting the account.",
        "Keep private personal context outside the research record."
      ],
      runAt: "2026-07-14",
      resultStatus: "inconclusive",
      findings: [
        "Jamie reports that he transitioned project stewardship to a mission-aligned organization during the conclusion of his role."
      ],
      limitations: [
        "No public-safe transfer document or collaborator corroboration has been normalized.",
        "The receiving organization, effective date, transfer scope, and acceptance remain unverified in this bank.",
        "The available evidence does not connect the transition causally or procedurally to the City's later withdrawal record."
      ],
      sourceIds: [],
      publicSummary: "A first-party transition memory is retained for research, with no public projection until the receiving organization, transfer scope, timing, and relationship to later records are supported and approved."
    }
  ],
  entities: [
    { id: "ENT-KC-CCED-BOARD", name: "Central City Economic Development Sales Tax Board", kind: "public-body", aliases: ["CCED Board"], publicSafe: true },
    { id: "ENT-KC-COUNCIL", name: "Council of Kansas City, Missouri", kind: "public-body", aliases: ["Kansas City Council"], publicSafe: true },
    { id: "ENT-KC-TOWN-HALL-LLC", name: "KC Town Hall LLC", kind: "organization", aliases: ["KC Town Hall"], publicSafe: true },
    { id: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION", name: "KC Town Hall CCED funding recommendation and appropriation", kind: "policy", aliases: ["KC Town Hall $490,539 CCED allocation"], publicSafe: true }
  ],
  agencyRelations: [
    {
      id: "REL-KC-CCED-BOARD-RECOMMENDED-TOWN-HALL",
      project: "kc-town-hall",
      actorIds: ["ENT-KC-CCED-BOARD"],
      action: "recommended-for-funding",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      purpose: "Advance the proposed KC Town Hall project to City Council for consideration of CCED sales-tax support.",
      result: "Resolution 190649 records that the Board voted to recommend $490,539 for KC Town Hall project costs.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      sourceIds: ["SRC-KC-TOWN-HALL-RESOLUTION-190649"],
      sourceSupportKeys: ["the CCED Board voted to recommend $490,539 for KC Town Hall"],
      boundaries: ["The Board recommendation is distinct from Council acceptance, appropriation, and any later disbursement."],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING",
      project: "kc-town-hall",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "co-led",
      objectId: "ENT-KC-TOWN-HALL-LLC",
      purpose: "Develop the proposed adaptive-reuse project through planning, project management, and public-benefit documentation.",
      result: "Jamie's approved resume records a co-founder and project-manager role and a shared planning and documentation contribution.",
      creditScope: "shared",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-JAMIE-PLANNING-CONTRIBUTION"],
      sourceIds: ["SRC-JAMIE-RESUME-KC-TOWN-HALL-2026"],
      sourceSupportKeys: [
        "Jamie served as a KC Town Hall LLC co-founder and project manager",
        "Jamie co-led redevelopment planning and public-benefit documentation for the proposed adaptive reuse"
      ],
      boundaries: ["This first-party resume attribution does not establish sole ownership or Jamie's causal role in municipal decisions."],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-KC-COUNCIL-ACCEPTED-TOWN-HALL-RECOMMENDATION",
      project: "kc-town-hall",
      actorIds: ["ENT-KC-COUNCIL"],
      action: "accepted-recommendation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      purpose: "Authorize conditional negotiation of CCED support for eligible KC Town Hall project costs.",
      result: "The Council adopted Resolution 190649 as substituted, accepted the Board recommendation, and authorized negotiation of a funding agreement for up to $490,539.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      sourceIds: ["SRC-KC-TOWN-HALL-RESOLUTION-190649"],
      sourceSupportKeys: ["the Council accepted the CCED Board recommendation", "the Council authorized negotiation of a funding agreement"],
      boundaries: ["Acceptance and negotiation authority do not establish an executed agreement, receipt, disbursement, or expenditure."],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-KC-COUNCIL-APPROPRIATED-TOWN-HALL-FUNDS",
      project: "kc-town-hall",
      actorIds: ["ENT-KC-COUNCIL"],
      action: "appropriated",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      purpose: "Reserve the Council-approved CCED budget amount for the KC Town Hall project subject to the City's funding process.",
      result: "The Council passed Ordinance 190642 as substituted, appropriating $490,539 to KC Town Hall in the Central City Sales Tax-Projects account.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-190642"],
      sourceSupportKeys: ["the Council appropriated $490,539 to KC Town Hall"],
      boundaries: ["Appropriation is not receipt, disbursement, expenditure, construction, or completion; later records show the full unused amount was returned."],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-KC-TOWN-HALL-WITHDREW-CCED-PROJECT",
      project: "kc-town-hall",
      actorIds: ["ENT-KC-TOWN-HALL-LLC"],
      action: "withdrew-from",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      purpose: "End KC Town Hall's participation in the CCED-funded project process.",
      result: "Ordinance 240317 records that KC Town Hall withdrew and would no longer proceed with the project.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-240317"],
      sourceSupportKeys: ["KC Town Hall later withdrew from the project"],
      boundaries: ["The ordinance does not explain why KC Town Hall withdrew or assign individual responsibility."],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-KC-COUNCIL-RECLAIMED-TOWN-HALL-APPROPRIATION",
      project: "kc-town-hall",
      actorIds: ["ENT-KC-COUNCIL"],
      action: "reclaimed-unused-appropriation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      purpose: "Return the unused KC Town Hall project amount to the Central City Sales Tax Fund for future public use.",
      result: "The Council passed Ordinance 240317, reducing the full $490,539 KC Town Hall project account as part of its recovery of unused CCED appropriations.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
      sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-240317"],
      sourceSupportKeys: ["the Council reclaimed the full unused $490,539 project appropriation in 2024"],
      boundaries: ["The 2024 recovery confirms non-use of this appropriation; it does not erase the documented 2019 Council action or explain the withdrawal."],
      reviewedAt,
      reviewedBy
    }
  ]
} as const;
