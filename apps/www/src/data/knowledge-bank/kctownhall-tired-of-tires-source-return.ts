const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex public-safe source return"];

export const kcTownHallTiredOfTiresSourceReturn = {
  intakeItems: [
    {
      id: "INTAKE-KCTH-TIRES-WAYBACK-RETURN-2026",
      kind: "public-url",
      title: "Tired of Tires archived resident-service page",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-web review",
      projectIds: ["kc-town-hall", "tired-of-tires"],
      reason: "Recover the public resident promise, service cadence, participation routes, shared authorship label, and collective program identity from the archived KC Town Hall page.",
      sourceUrl: "https://web.archive.org/web/20210806195823/https://kctownhall.com/tires/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-KCTH-TIRES-WAYBACK-2021"],
      observationIds: ["OBS-KCTH-TIRES-ARCHIVED-SERVICE-PROMISE"],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      boundaries: [
        "The archived page establishes a shared KC Town Hall and Oak Park service, not sole individual authorship or operation.",
        "Historical phone and email details are not reproduced or reactivated.",
        "A public service promise and project-reported savings figure are not an audited completion ledger."
      ]
    },
    {
      id: "INTAKE-KCTH-TIRES-DRIVE-RETURN-2026",
      kind: "analysis-note",
      title: "Tired of Tires tracker, coordination, design, and participant-account source return",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated Drive review",
      projectIds: ["kc-town-hall", "tired-of-tires"],
      reason: "Return protected operating records and exact design artifacts to the Knowledge Wiki while projecting only bounded aggregates, shared credit, and public-safe derivatives.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [
        "SRC-KCTH-TIRES-TRACKER-2019-2022",
        "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
        "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
        "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021",
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019"
      ],
      observationIds: [
        "OBS-KCTH-TIRES-PROJECT-TRACKER-AGGREGATE",
        "OBS-KCTH-TIRES-LAUNCH-DRIVER-AND-CITY-HANDOFF",
        "OBS-KCTH-TIRES-DESIGN-ARTIFACTS",
        "OBS-KCTH-TIRES-SURVEY-TO-PROGRAM-LEAD"
      ],
      researchInquiryIds: [
        "INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE",
        "INQ-KCTH-TIRES-SURVEY-TO-FACILITY-REQUIREMENTS"
      ],
      boundaries: [
        "Resident names, addresses, phone numbers, email addresses, request notes, and row-level service records remain protected.",
        "The tracker is a project-maintained operating record, not audited City data or proof of unique residents served.",
        "First-party authorship and operating claims are identified as such and combined with contemporaneous records without converting them into sole credit.",
        "Portfolio display authorization applies only to the two exact public-safe handbill derivatives recorded here, not the surrounding Drive corpus."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-KCTH-TIRES-ARCHIVED-SERVICE-PROMISE",
      intakeId: "INTAKE-KCTH-TIRES-WAYBACK-RETURN-2026",
      sourceId: "SRC-KCTH-TIRES-WAYBACK-2021",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "The archived Tired of Tires page offered homes in historic East Kansas City a recurring free curbside pickup through KC Town Hall and Oak Park Neighborhood Association, supplied request and volunteer routes plus published pickup dates, and displayed the author label 'Julia and Jamie.'",
      locator: "Archived article metadata, introduction, request section, date list, and author card.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN"],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      limitations: [
        "The shared author label does not identify who wrote each line, made each design decision, drove each route, or completed each pickup.",
        "The page's 2021 savings figure is project-reported and is not used as the final aggregate in this source return."
      ]
    },
    {
      id: "OBS-KCTH-TIRES-PROJECT-TRACKER-AGGREGATE",
      intakeId: "INTAKE-KCTH-TIRES-DRIVE-RETURN-2026",
      sourceId: "SRC-KCTH-TIRES-TRACKER-2019-2022",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "The project-maintained calculator records 1,970 tires across monthly entries from May 2019 through September 2022 and estimates $44,890 in avoided disposal fees under its stated per-tire assumptions.",
      locator: "Protected calculator sheet aggregate cells and dated monthly columns; row-level resident data excluded.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT"],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      limitations: [
        "The workbook is a project operating record, not an audited City dataset or independent outcome study.",
        "The aggregate does not establish unique residents, complete lifetime pickups, exact route coverage, or who entered every cell."
      ]
    },
    {
      id: "OBS-KCTH-TIRES-LAUNCH-DRIVER-AND-CITY-HANDOFF",
      intakeId: "INTAKE-KCTH-TIRES-DRIVE-RETURN-2026",
      sourceId: "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "A contemporaneous April-May 2019 coordination thread records a City fee waiver for the May 4 neighborhood pickup, identifies James Burkart as the driver, and describes the first-Saturday tire-recycling handoff.",
      locator: "Protected coordination thread; launch logistics and named-driver passages only.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN"],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      limitations: [
        "This establishes Jamie's driving responsibility for the launch pickup, not every later route or every operating role.",
        "The thread contains private correspondence and contact data that are deliberately excluded."
      ]
    },
    {
      id: "OBS-KCTH-TIRES-DESIGN-ARTIFACTS",
      intakeId: "INTAKE-KCTH-TIRES-DRIVE-RETURN-2026",
      sourceId: "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021",
      comparisonSourceIds: ["SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026"],
      project: "tired-of-tires",
      kind: "bounded-inference",
      text: "The authenticated KC Town Hall 4x6 archive contains dated Tired of Tires and neighborhood-survey handbill files; Jamie identifies himself as their designer and authorizes two exact public-safe portfolio derivatives with obsolete contact details excluded.",
      locator: "Protected 4x6 design folder, file metadata, pixel review, and participant authorization.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN"],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      limitations: [
        "Project custody and file dates do not independently prove every component-level authorship decision.",
        "Authorization is limited to the exact crops and captions reviewed for this portfolio; it does not clear the full Drive or photo archive."
      ]
    },
    {
      id: "OBS-KCTH-TIRES-SURVEY-TO-PROGRAM-LEAD",
      intakeId: "INTAKE-KCTH-TIRES-DRIVE-RETURN-2026",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      comparisonSourceIds: ["SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026"],
      project: "kc-town-hall",
      kind: "research-lead",
      text: "The 2019 proposal reproduces the neighborhood survey, says its results shaped the proposal, and includes a restaurant and kitchen-incubator concept; Jamie reports that survey conversations during field service surfaced home-catering ambitions and licensed-kitchen requirements.",
      locator: "Proposal survey and program pages compared with the participant account of tire-route conversations.",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-KCTH-TIRES-SURVEY-TO-FACILITY-REQUIREMENTS"],
      limitations: [
        "The proposal establishes the survey, its stated influence, and the incubator concept, but not the precise causal chain Jamie remembers.",
        "No resident response, home-business identity, architectural decision log, or health-department record is published."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-TIRES-WAYBACK-2021",
      title: "Tired of Tires? Free Tire Pickup",
      organization: "KC Town Hall",
      author: "Julia and Jamie",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2019-05-02",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kctownhall.com/tires/",
      archiveUrl: "https://web.archive.org/web/20210806195823/https://kctownhall.com/tires/",
      preferredPublicUrl: "archive",
      publicCitation: "KC Town Hall, 'Tired of Tires? Free Tire Pickup,' published May 2, 2019, archived August 6, 2021.",
      publicNote: "The capture preserves the resident promise, partners, household eligibility, request and volunteer routes, 2021 dates, and the shared author label without reusing historical contact details.",
      supportsGenerally: [
        "a recurring free household tire-pickup service offered by KC Town Hall and Oak Park Neighborhood Association",
        "published service dates and resident request or volunteer routes",
        "the page-level author label Julia and Jamie"
      ],
      doesNotEstablish: [
        "individual authorship of each page element",
        "Jamie's responsibility for every pickup",
        "an audited service total or unique-resident count",
        "City endorsement of the broader KC Town Hall project"
      ]
    },
    {
      id: "SRC-KCTH-TIRES-TRACKER-2019-2022",
      title: "KC Town Hall Tired of Tires project tracker",
      organization: "KC Town Hall",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2019-04-27",
      accessedAt: reviewedAt,
      publicCitation: "KC Town Hall project-maintained Tired of Tires tracker, monthly entries May 2019-September 2022; public-safe aggregate review.",
      publicNote: "Only the aggregate tire count, date range, formula-derived avoided-fee estimate, and measurement boundary are public; resident-level rows remain protected.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRES-TRACKER-2019-2022-001",
      supportsGenerally: [
        "1,970 tires across recorded monthly entries from May 2019 through September 2022",
        "$44,890 estimated avoided disposal fees under the tracker's stated per-tire assumptions",
        "monthly project measurement and service continuity"
      ],
      doesNotEstablish: [
        "audited City data",
        "unique residents or households served",
        "complete lifetime pickups or exact route coverage",
        "individual authorship of every cell",
        "independent economic-impact analysis"
      ]
    },
    {
      id: "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
      title: "Tired of Tires launch coordination thread",
      organization: "KC Town Hall, Oak Park Neighborhood Association, and City staff",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2019-05-01",
      accessedAt: reviewedAt,
      publicCitation: "Tired of Tires launch coordination record, April-May 2019; public-safe proposition review.",
      publicNote: "The record identifies the launch driver and municipal recycling handoff. Correspondence and contact details remain private.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRES-CITY-COORDINATION-2019-001",
      supportsGenerally: [
        "a May 4, 2019 launch pickup with City fee waiver",
        "James Burkart identified as the driver for the launch pickup",
        "City first-Saturday tire-recycling handoff"
      ],
      doesNotEstablish: [
        "Jamie's responsibility for every later pickup",
        "sole service design or operation",
        "a permanent City contract",
        "audited service outcomes"
      ]
    },
    {
      id: "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
      title: "Jamie Burkart first-party Tired of Tires design and operations account",
      author: "Jamie Burkart",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation: "Jamie Burkart first-party professional account of Tired of Tires service design, field operation, measurement, and linked neighborhood-survey work, August 14, 2026.",
      publicNote: "This is an authorized first-party professional account, not an independent audit or collaborator testimonial.",
      protectedLocatorId: "RESEARCH-KCTH-TIRES-DESIGN-AUTHORIZATION-2026-001",
      supportsGenerally: [
        "Jamie's first-party professional account of designing the service, web page, and 4 by 6 handbills",
        "Jamie's first-party account of recurring route, pickup, and measurement work",
        "authorization to publish exact public-safe portfolio derivatives of the two handbills"
      ],
      doesNotEstablish: [
        "independent verification of every recurring route",
        "sole credit for the collective service",
        "audited tracker totals",
        "the exact causal path from each resident conversation to a facility requirement"
      ]
    },
    {
      id: "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021",
      title: "KC Town Hall 4x6 handbill design archive",
      organization: "KC Town Hall",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2019-04-20 to 2021-03-03",
      accessedAt: reviewedAt,
      publicCitation: "KC Town Hall Tired of Tires and neighborhood-survey 4x6 handbill files, 2019-2021; public-safe derivative review.",
      publicNote: "Two exact portfolio derivatives preserve the service and survey compositions while excluding obsolete contact details and response data.",
      protectedLocatorId: "ARCHIVE-KCTH-TIRES-DESIGN-2019-2021-001",
      supportsGenerally: [
        "dated 4 by 6 tire and neighborhood-survey handbill files in the KC Town Hall project archive",
        "the exact graphic compositions used for two public-safe portfolio crops",
        "project custody of the design files"
      ],
      doesNotEstablish: [
        "independent component-level authorship",
        "permission to expose the surrounding Drive corpus",
        "current accuracy of historical dates or contact routes",
        "resident response data or service outcomes"
      ],
      media: {
        mediaKind: "graphic",
        rightsHolder: "Jamie Burkart / KC Town Hall",
        rightsStatus: "cleared",
        consentStatus: "not-applicable",
        publicDisplayStatus: "cleared",
        visibleText: [
          "Tired of Tires? Free Tire Pickup",
          "What would YOU like to have at 36th and Indiana?"
        ]
      }
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN",
      project: "tired-of-tires",
      internalClaim: "Jamie provides an authorized first-party account of designing and operating parts of Tired of Tires. The archived page establishes a recurring shared KC Town Hall and Oak Park household service, a contemporaneous coordination record identifies him as the May 2019 launch driver, and the project archive preserves the service handbills. The combined record supports a bounded 'helped design and operate' claim, not sole credit or responsibility for every pickup.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie helped design and operate Tired of Tires, a recurring free household pickup service built with KC Town Hall, Oak Park Neighborhood Association, residents, and City partners. Contemporaneous records identify him as the driver for the May 2019 launch pickup.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-TIRES-WAYBACK-2021",
          relationship: "direct-support",
          supports: [
            "a recurring free household tire-pickup service offered by KC Town Hall and Oak Park Neighborhood Association",
            "published service dates and resident request or volunteer routes",
            "the page-level author label Julia and Jamie"
          ],
          locator: "Archived article metadata, service description, request route, and author card.",
          publicNote: "The public page establishes shared service identity and a co-authored surface.",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
          relationship: "private-support",
          supports: [
            "a May 4, 2019 launch pickup with City fee waiver",
            "James Burkart identified as the driver for the launch pickup",
            "City first-Saturday tire-recycling handoff"
          ],
          locator: "Protected launch coordination passages.",
          publicNote: "The contemporaneous record establishes Jamie's launch-driving role and municipal handoff without exposing correspondence.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
          relationship: "private-support",
          supports: [
            "Jamie's first-party professional account of designing the service, web page, and 4 by 6 handbills",
            "Jamie's first-party account of recurring route, pickup, and measurement work"
          ],
          locator: "Authorized participant account; service-design and operating-role passages.",
          publicNote: "First-party professional account used with explicit attribution and collective-credit limits.",
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021",
          relationship: "corroborating",
          supports: [
            "dated 4 by 6 tire and neighborhood-survey handbill files in the KC Town Hall project archive",
            "the exact graphic compositions used for two public-safe portfolio crops"
          ],
          locator: "Protected 4x6 file metadata and pixel review.",
          publicNote: "The archive corroborates the designed service surfaces and exact portfolio artifacts, not every authorship decision.",
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "The claim says 'helped' because KC Town Hall, Oak Park Neighborhood Association, residents, City staff, and other collaborators each held part of the service.",
        "The contemporaneous record identifies Jamie as launch driver, not driver for every month.",
        "First-party design and recurring-operation evidence is not an independent audit or collaborator testimonial.",
        "Resident requests, addresses, contact details, and row-level logs remain private."
      ],
      antiClaims: [
        "Jamie alone designed or operated Tired of Tires",
        "Jamie personally completed every pickup",
        "The City operated or endorsed every part of KC Town Hall",
        "Every public report became a completed service unit",
        "The archive proves complete block-by-block coverage every month"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT",
      project: "tired-of-tires",
      internalClaim: "The project-maintained Tired of Tires calculator records 1,970 tires across monthly entries from May 2019 through September 2022 and estimates $44,890 in avoided disposal fees using its own stated per-tire assumptions. The aggregate is a project operating record, not audited City data, an independent economic-impact study, a unique-resident count, or proof of complete lifetime service coverage.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "A project-maintained tracker records 1,970 tires across monthly entries from May 2019 through September 2022 and estimates $44,890 in avoided disposal fees under its stated assumptions.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-TIRES-TRACKER-2019-2022",
          relationship: "private-support",
          supports: [
            "1,970 tires across recorded monthly entries from May 2019 through September 2022",
            "$44,890 estimated avoided disposal fees under the tracker's stated per-tire assumptions",
            "monthly project measurement and service continuity"
          ],
          locator: "Protected calculator aggregate cells and monthly columns.",
          publicNote: "Only the public-safe aggregate and methodology boundary are projected.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-TIRES-WAYBACK-2021",
          relationship: "corroborating",
          supports: [
            "a recurring free household tire-pickup service offered by KC Town Hall and Oak Park Neighborhood Association",
            "published service dates and resident request or volunteer routes"
          ],
          locator: "Archived 2021 service page.",
          publicNote: "The public page corroborates program continuity, not the final tracker aggregate.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Always retain 'project-maintained' and the May 2019-September 2022 recorded date range.",
        "Always identify $44,890 as a tracker estimate under stated assumptions.",
        "Do not translate tires into unique residents, households, completed requests, exact walkshed coverage, or City-verified impact.",
        "The resident-level workbook remains protected."
      ],
      antiClaims: [
        "The City audited 1,970 completed pickups",
        "1,970 unique residents were served",
        "$44,890 is an independently verified economic impact",
        "The tracker contains every tire collected over the program's lifetime",
        "Every recorded month had complete ten-minute-walk coverage"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE"],
      reviewedAt,
      reviewedBy
    }
  ],
  entities: [
    {
      id: "ENT-KC-TOWN-HALL-LLC",
      name: "KC Town Hall LLC",
      kind: "organization",
      aliases: ["KC Town Hall"],
      publicSafe: true
    },
    {
      id: "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION",
      name: "Oak Park Neighborhood Association",
      kind: "organization",
      aliases: [],
      publicSafe: true
    },
    {
      id: "ENT-KANSAS-CITY-MISSOURI",
      name: "City of Kansas City, Missouri",
      kind: "public-body",
      aliases: ["KCMO"],
      publicSafe: true
    },
    {
      id: "ENT-TIRED-OF-TIRES",
      name: "Tired of Tires",
      kind: "program",
      aliases: ["Tired of Tires free tire pickup"],
      publicSafe: true
    }
  ],
  agencyRelations: [
    {
      id: "REL-JAMIE-KCTH-OAK-PARK-TIRED-OF-TIRES",
      project: "tired-of-tires",
      actorIds: [
        "ENT-JAMIE-BURKART",
        "ENT-KC-TOWN-HALL-LLC",
        "ENT-OAK-PARK-NEIGHBORHOOD-ASSOCIATION"
      ],
      action: "co-created",
      objectId: "ENT-TIRED-OF-TIRES",
      purpose: "Give neighborhood households a recurring, legible, no-fee route for removing dumped or unwanted tires.",
      result: "The shared service combined public handbills and request routes, field pickup, a municipal recycling handoff, and project-maintained measurement.",
      creditScope: "shared",
      status: "use-with-care",
      claimIds: [
        "CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN",
        "CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT"
      ],
      sourceIds: [
        "SRC-KCTH-TIRES-WAYBACK-2021",
        "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
        "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
        "SRC-KCTH-TIRES-TRACKER-2019-2022"
      ],
      sourceSupportKeys: [
        "a recurring free household tire-pickup service offered by KC Town Hall and Oak Park Neighborhood Association",
        "James Burkart identified as the driver for the launch pickup",
        "Jamie's first-party professional account of designing the service, web page, and 4 by 6 handbills",
        "1,970 tires across recorded monthly entries from May 2019 through September 2022"
      ],
      boundaries: [
        "The relation records shared creation and operation; it does not assign sole credit to Jamie, KC Town Hall, or Oak Park Neighborhood Association.",
        "The launch-driving record and first-party recurring-route account do not establish Jamie as the driver for every pickup.",
        "The tracker is project-maintained rather than City-audited."
      ],
      reviewedAt,
      reviewedBy
    },
    {
      id: "REL-KCMO-TIRED-OF-TIRES-HANDOFF",
      project: "tired-of-tires",
      actorIds: ["ENT-KANSAS-CITY-MISSOURI"],
      action: "coordinated-with",
      objectId: "ENT-TIRED-OF-TIRES",
      purpose: "Make neighborhood-collected tires eligible for a no-fee municipal recycling handoff.",
      result: "The launch coordination record documents a City fee waiver and first-Saturday recycling route for the May 2019 pickup.",
      creditScope: "institutional",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN"],
      sourceIds: ["SRC-KCTH-TIRES-CITY-COORDINATION-2019"],
      sourceSupportKeys: [
        "a May 4, 2019 launch pickup with City fee waiver",
        "City first-Saturday tire-recycling handoff"
      ],
      boundaries: [
        "The record establishes the launch handoff, not a permanent contract or City operation of the broader service.",
        "A fee waiver is not endorsement of KC Town Hall's full redevelopment project."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-TIRES-ROLE-ROUTE-AND-COVERAGE",
      project: "tired-of-tires",
      question: "What can establish Jamie's month-by-month route, pickup, transport, unloading, logging, design, and exact geographic coverage beyond the launch role and authorized first-party account?",
      methods: [
        "Compare the tracker calendar with City disposal receipts, route logs, dated photos, vehicle records, and collaborator notes.",
        "Separate service design, launch-driving evidence, recurring participant memory, shared-account communication, and tracker stewardship.",
        "Test the reported ten-minute-walk coverage without exposing resident addresses or row-level reports."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The archived page establishes recurring shared service and published resident routes.",
        "The launch coordination record identifies Jamie as the May 2019 driver and records the municipal handoff.",
        "The project tracker supplies a 1,970-tire aggregate and estimated avoided-fee methodology across monthly entries through September 2022.",
        "Jamie authorizes a first-party design and recurring-operation account, and the exact handbill files are recovered."
      ],
      limitations: [
        "No independent month-by-month driver log or complete disposal-receipt series was normalized.",
        "The tracker does not establish who performed each pickup or complete block-by-block coverage.",
        "The ten-minute-walk route account remains first-party except for partial geographic fields in the protected workbook.",
        "Resident-level evidence cannot be published."
      ],
      sourceIds: [
        "SRC-KCTH-TIRES-WAYBACK-2021",
        "SRC-KCTH-TIRES-TRACKER-2019-2022",
        "SRC-KCTH-TIRES-CITY-COORDINATION-2019",
        "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
        "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021",
        "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026"
      ],
      publicSummary: "The source return now supports a bounded helped-design-and-operate claim, Jamie's launch-driving role, exact project-maintained aggregates, and two governed design artifacts; every-month route responsibility and exact walkshed coverage remain open.",
      protectedLocatorId: "RESEARCH-KCTH-TIRES-ROLE-ROUTE-2026-001"
    },
    {
      id: "INQ-KCTH-TIRES-SURVEY-TO-FACILITY-REQUIREMENTS",
      project: "kc-town-hall",
      question: "How did recurring tire-service contact and paired neighborhood surveys translate resident needs into proposed programs and architectural requirements?",
      methods: [
        "Compare the exact tire and survey handbills with the proposal's program and architectural pages.",
        "Seek de-identified survey aggregates, dated design iterations, meeting notes, health-department guidance, and architect or collaborator proof notes.",
        "Preserve home-business and resident identities while testing the licensed-kitchen and fire-suppression pathway."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The proposal reproduces the survey and states that its results shaped the proposal.",
        "The proposal includes a restaurant and kitchen-incubator concept.",
        "Jamie reports carrying the survey alongside tire-service outreach and learning about home-catering ambitions and licensed-kitchen needs through those conversations."
      ],
      limitations: [
        "The precise causal chain from resident conversation to architectural requirement is not independently documented in the present source return.",
        "No resident identity, response row, home-business detail, or private meeting note is published.",
        "The proposal does not attribute every program or architectural decision to Jamie."
      ],
      sourceIds: [
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
        "SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026",
        "SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021"
      ],
      publicSummary: "The proposal verifies that the neighborhood survey shaped the program and included a kitchen-incubator concept; Jamie's account of the service-contact-to-licensed-kitchen pathway remains a promising, protected research lead.",
      protectedLocatorId: "RESEARCH-KCTH-TIRES-SURVEY-FACILITY-2026-001"
    }
  ]
} as const;
