const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

export const kcTownHallFieldPractice = {
  intakeItems: [
    {
      id: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      kind: "memory-lead",
      title: "KC Town Hall field implementation and neighborhood-practice account",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall", "tired-of-tires", "cleveland-avenue"],
      reason: "Preserve Jamie's account of Phase One construction coordination, on-site listening, survey design, recurring tire service, Cleveland Avenue coalition work, and pro bono neighborhood communications without prematurely converting first-person memory into verified public claims.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: ["SRC-KCTH-FIELD-PRACTICE-MEMORY-2026"],
      observationIds: [
        "OBS-KCTH-PHASE-ONE-GC-MEMORY",
        "OBS-KCTH-DAILY-SITE-COORDINATION-MEMORY",
        "OBS-KCTH-SITE-LISTENING-MEMORY",
        "OBS-KCTH-SURVEY-SYSTEM-MEMORY",
        "OBS-KCTH-TIRED-OF-TIRES-ROLE-MEMORY",
        "OBS-KCTH-CLEVELAND-ROLE-MEMORY",
        "OBS-KCTH-PRO-BONO-COMMUNICATIONS-MEMORY"
      ],
      researchInquiryIds: [
        "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
        "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE",
        "INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE",
        "INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"
      ],
      boundaries: [
        "Participant memory is valuable evidence of what to research, but it is not independent corroboration.",
        "Keep personal authorship, collective program identity, municipal action, and project outcomes separate.",
        "Do not publish private family context, resident contacts, addresses, financial records, credentials, or subscriber data."
      ]
    },
    {
      id: "INTAKE-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      kind: "analysis-note",
      title: "KC Town Hall 2019 CCED proposal and support-letter bundle",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Close-read the successful proposal bundle for public-safe evidence about Jamie's role, Phase One scope, the project team, neighborhood-survey practice, 2018 progress, and contemporaneous support.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019"],
      observationIds: [
        "OBS-KCTH-PROPOSAL-PROJECT-MANAGERS-AND-TEAM",
        "OBS-KCTH-PROPOSAL-PHASE-ONE-SCOPE",
        "OBS-KCTH-PROPOSAL-NEIGHBORHOOD-SURVEY",
        "OBS-KCTH-SUPPORT-LETTERS-NEIGHBORHOOD-PROCESS"
      ],
      researchInquiryIds: [
        "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
        "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"
      ],
      boundaries: [
        "The raw bundle is excluded because it contains financial, contact, credit, and other protected information.",
        "The March 2019 proposal is contemporaneous evidence of scope, progress, plans, and represented roles; it is not later independent proof that Phase One was completed.",
        "A project-level artifact does not by itself establish component-level authorship."
      ]
    },
    {
      id: "INTAKE-KCTH-WEB-ARCHIVE-2020",
      kind: "analysis-note",
      title: "KC Town Hall survey and Tired of Tires web-archive review",
      submittedAt: reviewedAt,
      submittedBy: "Codex public-safe archival review",
      projectIds: ["kc-town-hall", "tired-of-tires", "cleveland-avenue"],
      reason: "Preserve bounded web-archive evidence of the public survey and recurring tire-pickup program while protecting credentials, subscribers, resident records, and unrecovered source bodies.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [
        "SRC-KCTH-GHOST-ARCHIVE-2020",
        "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020"
      ],
      observationIds: [
        "OBS-KCTH-WEB-ARCHIVE-SURVEY-AND-TIRES",
        "OBS-CLEVELAND-AVE-KC-TIRES-CORROBORATION"
      ],
      researchInquiryIds: [
        "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE",
        "INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE",
        "INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"
      ],
      boundaries: [
        "The Ghost export is never published because it contains credentials, subscriber data, and other private fields.",
        "The Cleveland Avenue capture body was not materialized in this review; only previously preserved public-safe OCR was available.",
        "Shared-account and project-page evidence does not identify the author or operator of a specific workflow."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-KCTH-PHASE-ONE-GC-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie reports serving as general contractor for Phase One of the KC Town Hall restoration and coordinating historic masonry, roofing, carpentry, welding, engineering, architecture, and plumbing teams.",
      locator: "Participant-memory intake, Phase One role and trade-team passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The proposal corroborates a founder/project-manager role and multi-trade scope, but it does not use the title general contractor.",
        "No later certificate, permit history, invoice set, contractor statement, or completion record was normalized in this pass."
      ]
    },
    {
      id: "OBS-KCTH-DAILY-SITE-COORDINATION-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie reports being first on site each morning with measured drawings and survey cards, coordinating work from the basement through scaffolding and roof deck, including sequencing the roof membrane with restored parapet and ceramic caps.",
      locator: "Participant-memory intake, daily field-coordination passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "This is precise first-person recollection, not yet corroborated by a daily log, dated photograph sequence, subcontractor record, or collaborator note.",
        "The account should not be generalized into sole responsibility for collective construction work."
      ]
    },
    {
      id: "OBS-KCTH-SITE-LISTENING-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie remembers sustained site presence allowing neighborhood histories, appreciation, and residents' ideas for the long-vacant building to accumulate through everyday conversation.",
      locator: "Participant-memory intake, site-as-listening-surface passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE"],
      researchInquiryIds: ["INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"],
      limitations: [
        "The proposal and support letters corroborate a neighborhood-led process, not the frequency or content of these site conversations.",
        "Resident identities, individual stories, and contact details are not recorded here."
      ]
    },
    {
      id: "OBS-KCTH-SURVEY-SYSTEM-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie reports designing a 4-by-6-inch neighborhood survey handbill and backing data-collection system to gather priorities and contacts for a participatory vision of the site.",
      locator: "Participant-memory intake, neighborhood-survey system passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE"],
      researchInquiryIds: ["INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"],
      limitations: [
        "The proposal reproduces the survey and describes its use, but it does not assign design or data-system authorship to Jamie.",
        "The underlying resident responses and contact data remain private."
      ]
    },
    {
      id: "OBS-KCTH-TIRED-OF-TIRES-ROLE-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "tired-of-tires",
      kind: "participant-memory",
      text: "Jamie reports designing and coordinating Oak Park Neighborhood Association's monthly free Tired of Tires program with the City, personally collecting, transporting, unloading, and logging tires; he recalls the service later expanding to the historic Indian Mound neighborhood.",
      locator: "Participant-memory intake, Tired of Tires operations passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      limitations: [
        "The public archive corroborates a recurring KC Town Hall and Oak Park service but not Jamie's individual design, City-coordination, or physical-operations role.",
        "The Indian Mound expansion and monthly counts require independent public-safe evidence."
      ]
    },
    {
      id: "OBS-KCTH-CLEVELAND-ROLE-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "cleveland-avenue",
      kind: "participant-memory",
      text: "Jamie reports co-founding Cleveland Avenue Unify to Beautify within the Historic East Neighborhoods Coalition and contributing brand identity, logo, photography, social media, listening-session maps, and resident-reporting materials to Pastor Lee's corridor vision.",
      locator: "Participant-memory intake, Cleveland Avenue Unify to Beautify passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION"],
      researchInquiryIds: ["INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"],
      limitations: [
        "No independent source recovered in this pass establishes co-founder credit or assigns individual design components.",
        "The relationship between listening sessions and discretionary capital decisions remains an open causal question."
      ]
    },
    {
      id: "OBS-KCTH-PRO-BONO-COMMUNICATIONS-MEMORY",
      intakeId: "INTAKE-KCTH-FIELD-PRACTICE-MEMORY-2026",
      sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie reports functioning as a pro bono design studio and print shop for neighborhood groups, producing and distributing hundreds of handbills while connecting tire pickup, KC Town Hall surveying, dumpster days, and Cleveland Avenue meetings.",
      locator: "Participant-memory intake, neighborhood communications and distribution passage.",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION"],
      researchInquiryIds: ["INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"],
      limitations: [
        "The volume, distribution cadence, complete client-group list, and individual design authorship are not independently verified.",
        "This record does not expose resident contacts or private organizational materials."
      ]
    },
    {
      id: "OBS-KCTH-PROPOSAL-PROJECT-MANAGERS-AND-TEAM",
      intakeId: "INTAKE-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The 2019 proposal names Julia Fredenburg and Jamie Burkart as founders and project managers and presents a team covering historic masonry restoration, architecture, roofing, concrete, electrical work, and real-estate law.",
      locator: "Proposal bundle, PDF page 2, Project Narrative page 1.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The proposal does not use the title general contractor for Jamie.",
        "A team roster does not establish the exact work performed, contract relationship, duration, or completion status of every listed discipline."
      ]
    },
    {
      id: "OBS-KCTH-PROPOSAL-PHASE-ONE-SCOPE",
      intakeId: "INTAKE-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal defines Phase One as a cold-shell scope including roof structure and membrane, structural masonry, property acquisition, floor framing, water, storage, debris and tree removal, basement access, vehicles, safety and security, air quality, and soft costs; it reports substantial roof, masonry, debris-removal, and egress work completed by 2018.",
      locator: "Proposal bundle, PDF pages 11-12, Finance pages 10-11.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      limitations: [
        "The bundle was created in March 2019 and mixes completed work with planned 2019 work.",
        "Its 'completed 2019' table heading and stated 2019 completion plan are not later independent proof that Phase One was completed."
      ]
    },
    {
      id: "OBS-KCTH-PROPOSAL-NEIGHBORHOOD-SURVEY",
      intakeId: "INTAKE-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The proposal reproduces a compact 'What would YOU like to have at 36th and Indiana? Pick Three' survey and says KC Town Hall worked with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church to gather resident priorities that directly shaped the proposal.",
      locator: "Proposal bundle, PDF page 4, Project Narrative page 3.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE"],
      researchInquiryIds: ["INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"],
      limitations: [
        "The proposal supports the project-level survey process, not Jamie's individual authorship of the handbill or data system.",
        "No respondent-level data, response count, sampling method, or complete analysis is published here."
      ]
    },
    {
      id: "OBS-KCTH-SUPPORT-LETTERS-NEIGHBORHOOD-PROCESS",
      intakeId: "INTAKE-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Letters bundled with the proposal independently praise the neighborhood process; a January 2019 City Council support letter says the neighborhood survey directly influenced proposed retail uses and notes the project's commitment to local and minority-owned construction participation.",
      locator: "Proposal bundle, PDF pages 17-20, support letters; especially pages 18-19.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE", "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"],
      researchInquiryIds: [
        "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
        "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"
      ],
      limitations: [
        "Support letters are endorsements and contextual corroboration, not construction audits or authorship records.",
        "The letters do not use the title general contractor or establish final Phase One completion."
      ]
    },
    {
      id: "OBS-KCTH-WEB-ARCHIVE-SURVEY-AND-TIRES",
      intakeId: "INTAKE-KCTH-WEB-ARCHIVE-2020",
      sourceId: "SRC-KCTH-GHOST-ARCHIVE-2020",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The protected KC Town Hall web archive preserves a public survey page asking what residents wanted at 36th and Indiana and a Tired of Tires page describing a recurring free pickup service operated publicly by KC Town Hall and Oak Park Neighborhood Association.",
      locator: "Protected Ghost export, public page metadata and rendered public copy only.",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE",
        "CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"
      ],
      researchInquiryIds: [
        "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE",
        "INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"
      ],
      limitations: [
        "The shared author identity and project page do not establish Jamie's individual authorship or operating role.",
        "No credentials, subscriber fields, resident reports, or private form data are reproduced."
      ]
    },
    {
      id: "OBS-CLEVELAND-AVE-KC-TIRES-CORROBORATION",
      intakeId: "INTAKE-KCTH-WEB-ARCHIVE-2020",
      sourceId: "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020",
      project: "tired-of-tires",
      kind: "source-fact",
      text: "Previously preserved OCR of an August 2020 Cleveland Avenue KC post describes KC Town Hall and Oak Park Neighborhood Association as offering monthly free tire pickup for homes in historic East Kansas City neighborhoods.",
      locator: "Protected archive overview OCR of a 2020 social-page capture; source body not materialized in this review.",
      status: "extracted",
      publicSafe: true,
      claimIds: ["CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      researchInquiryIds: [
        "INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE",
        "INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"
      ],
      limitations: [
        "The source body was not recovered in this pass, so the OCR is preserved as protected context rather than a public quotation source.",
        "The post supports the joint program identity, not Jamie's individual role or an Indian Mound expansion."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
      title: "Jamie Burkart participant-memory intake on KC Town Hall field and neighborhood practice",
      author: "Jamie Burkart",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      publicCitation: "Jamie Burkart participant-memory intake, reviewed July 15, 2026.",
      publicNote: "The record preserves a public-safe account for research. It is first-person memory, not independent corroboration or a collaborator testimonial.",
      protectedLocatorId: "ARCHIVE-KCTH-FIELD-PRACTICE-MEMORY-2026-001",
      supportsGenerally: [
        "Jamie reported serving as Phase One general contractor and coordinating a multi-trade restoration",
        "Jamie reported daily site coordination and neighborhood listening",
        "Jamie reported designing the survey handbill and data system",
        "Jamie reported designing, coordinating, and operating the Tired of Tires workflow",
        "Jamie reported co-founding Cleveland Avenue Unify to Beautify and contributing its communications system",
        "Jamie reported providing pro bono design, printing, and distribution for neighborhood groups"
      ],
      doesNotEstablish: [
        "independent verification of the reported roles",
        "sole authorship or sole responsibility for collective work",
        "Phase One completion in 2019",
        "audited service totals or verified program outcomes",
        "a causal relationship to discretionary capital decisions"
      ]
    },
    {
      id: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
      title: "KC Town Hall Central City Economic Development proposal and support-letter bundle",
      organization: "KC Town Hall LLC",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2019-03-25",
      accessedAt: reviewedAt,
      publicCitation: "KC Town Hall LLC, Central City Economic Development proposal and support-letter bundle, March 2019; public-safe archival review.",
      publicNote: "Only bounded page-level propositions are recorded. The raw bundle remains outside the repository because it contains protected financial, contact, credit, and property information.",
      protectedLocatorId: "ARCHIVE-KCTH-CCED-PROPOSAL-2019-001",
      supportsGenerally: [
        "Jamie Burkart and Julia Fredenburg were identified as founders and project managers",
        "the proposal requested $490,539 in CCED support for Phase Two",
        "the proposal presented a multi-trade professional and construction team",
        "Phase One included roof, masonry, floor-framing, water, access, safety, environmental, and related cold-shell work",
        "the proposal reported substantial roof, masonry, debris-removal, and egress work by 2018",
        "the project used a neighborhood survey whose results shaped the proposal",
        "support letters praised the neighborhood process and local construction participation"
      ],
      doesNotEstablish: [
        "sole authorship of the proposal or presentation materials",
        "that Jamie held the title general contractor",
        "that Phase One was completed in 2019",
        "Jamie's individual authorship of the survey handbill or data system",
        "the exact work, contract relationship, or completion status of every listed team member",
        "audited project outcomes"
      ]
    },
    {
      id: "SRC-KCTH-GHOST-ARCHIVE-2020",
      title: "KC Town Hall public-site archive",
      organization: "KC Town Hall",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2020-12-11",
      accessedAt: reviewedAt,
      publicCitation: "KC Town Hall public-site archive, 2020; public-safe metadata review.",
      publicNote: "Public page metadata and bounded copy are represented here. The raw export is never published because it contains credentials, subscriber data, and other private fields.",
      protectedLocatorId: "ARCHIVE-KCTH-GHOST-2020-001",
      supportsGenerally: [
        "KC Town Hall published a neighborhood-survey page",
        "KC Town Hall and Oak Park Neighborhood Association publicly offered a recurring Tired of Tires pickup service"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship of a page or post",
        "Jamie's individual role in designing, coordinating, or operating the service",
        "completed pickup totals, household counts, or audited outcomes",
        "the Indian Mound expansion"
      ]
    },
    {
      id: "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020",
      title: "Cleveland Avenue KC Tired of Tires social-page capture",
      organization: "Cleveland Avenue KC",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2020-08-24",
      accessedAt: reviewedAt,
      publicCitation: "Cleveland Avenue KC, Tired of Tires social post, August 24, 2020; protected OCR record.",
      publicNote: "The source body was not materialized during this review. A prior archive overview preserves public-safe OCR, which is used only as bounded context.",
      protectedLocatorId: "ARCHIVE-CLEVELAND-AVE-KC-TIRES-2020-001",
      supportsGenerally: [
        "KC Town Hall and Oak Park Neighborhood Association publicly described a monthly free tire-pickup service for historic East Kansas City neighborhoods"
      ],
      doesNotEstablish: [
        "that the source body was recovered in this review",
        "Jamie as the individual designer, coordinator, driver, or recorder",
        "the Indian Mound expansion",
        "Cleveland Avenue Unify to Beautify co-founder or design credit",
        "audited service outcomes"
      ]
    },
    {
      id: "SRC-KCTH-FIELD-PRACTICE-REVIEW-2026",
      title: "KC Town Hall field implementation and neighborhood-practice evidence review",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/intake/2026-07-15-kcth-field-implementation-neighborhood-practice.md",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart portfolio knowledge bank, 'KC Town Hall field implementation and neighborhood-practice evidence review,' July 15, 2026.",
      publicNote: "This is an AI-assisted, public-safe synthesis of participant memory and protected project archives, not eyewitness testimony or independent corroboration.",
      supportsGenerally: [
        "the documented evidence posture and maturation status of KC Town Hall field-practice propositions",
        "the distinction between source-backed project facts and participant-memory leads",
        "the privacy and projection decisions applied in July 2026"
      ],
      doesNotEstablish: [
        "the underlying participant-memory propositions as independently verified facts",
        "general-contractor title or final Phase One completion",
        "individual authorship of collective neighborhood programs",
        "audited service or policy outcomes"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
      project: "kc-town-hall",
      internalClaim: "Jamie reports serving as general contractor and daily field coordinator for Phase One of the KC Town Hall restoration. The 2019 proposal independently identifies him as a founder and project manager, documents a multi-trade team and cold-shell scope, and reports substantial 2018 progress, but it does not establish the general-contractor title or final 2019 completion.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "A participant-memory account of Jamie's Phase One general-contractor and daily field-coordination role is partially corroborated by the proposal's project-manager attribution, trade roster, scope, and 2018 progress; title and final completion remain open.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [
        {
          sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
          relationship: "private-support",
          supports: ["Jamie reported serving as Phase One general contractor and coordinating a multi-trade restoration"],
          locator: "Participant-memory intake, Phase One field-delivery passages.",
          publicNote: "First-person account; independent corroboration remains open.",
          confidence: "limited",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
          relationship: "corroborating",
          supports: [
            "Jamie Burkart and Julia Fredenburg were identified as founders and project managers",
            "the proposal presented a multi-trade professional and construction team",
            "the proposal reported substantial roof, masonry, debris-removal, and egress work by 2018"
          ],
          locator: "PDF pages 2, 7, and 11-12.",
          publicNote: "Protected proposal metadata corroborates role context, team scope, and contemporaneous progress, not the claimed title or final completion.",
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "The proposal supports founder/project-manager attribution, multi-trade scope, and substantial 2018 work but does not independently establish general-contractor title or actual Phase One completion.",
        "Daily coordination details remain participant memory until a project log, dated photo sequence, contractor record, permit, invoice, or collaborator note is normalized.",
        "Keep collective trade work and Jamie's coordination contribution separate."
      ],
      antiClaims: [
        "The proposal proves Jamie was general contractor",
        "The proposal proves Phase One was completed in 2019",
        "Jamie alone performed or completed the restoration",
        "The 2019 CCED appropriation funded Phase One construction"
      ],
      researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE",
      project: "kc-town-hall",
      internalClaim: "KC Town Hall used a compact neighborhood survey and sustained neighborhood relationships to shape the proposed use of the site. Jamie reports designing the handbill and backing data system and using daily site presence as a listening practice; the project-level process is source-backed, while Jamie's component authorship and the everyday site conversations remain under research.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "The project used a neighborhood survey to shape proposed uses; Jamie's reported design of the handbill, data system, and site-based listening practice remains held for component-level corroboration.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
          relationship: "direct-support",
          supports: [
            "the project used a neighborhood survey whose results shaped the proposal",
            "support letters praised the neighborhood process and local construction participation"
          ],
          locator: "PDF pages 4 and 17-20.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
          relationship: "private-support",
          supports: [
            "Jamie reported daily site coordination and neighborhood listening",
            "Jamie reported designing the survey handbill and data system"
          ],
          locator: "Participant-memory intake, site-listening and survey passages.",
          publicNote: "First-person component-level account; independent corroboration remains open.",
          confidence: "limited",
          renderCitation: false
        }
      ],
      boundaries: [
        "Project-level survey use and influence on proposed uses are supported; individual design and data-system authorship are not yet independently assigned.",
        "Do not publish resident responses, identities, contact records, or unsupported counts.",
        "Do not turn support for a neighborhood process into proof of representative participation or measured impact."
      ],
      antiClaims: [
        "The proposal proves Jamie alone designed the survey system",
        "The survey was statistically representative",
        "Every resident supported the proposed uses",
        "Site conversations produced an audited community mandate"
      ],
      researchInquiryIds: ["INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE",
      project: "tired-of-tires",
      internalClaim: "Public archives establish a recurring free tire-pickup program operated in the names of KC Town Hall and Oak Park Neighborhood Association. Jamie reports designing the program, coordinating it with the City, carrying out monthly pickups and logging, and later extending service to Indian Mound; those individual-role and expansion details remain uncorroborated.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "A recurring KC Town Hall and Oak Park tire-pickup service is source-backed; Jamie's reported individual design, City-coordination, field-operations, logging, and Indian Mound expansion remain held.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [
        {
          sourceId: "SRC-KCTH-GHOST-ARCHIVE-2020",
          relationship: "direct-support",
          supports: ["KC Town Hall and Oak Park Neighborhood Association publicly offered a recurring Tired of Tires pickup service"],
          locator: "Protected public-page metadata and bounded copy.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020",
          relationship: "corroborating",
          supports: ["KC Town Hall and Oak Park Neighborhood Association publicly described a monthly free tire-pickup service for historic East Kansas City neighborhoods"],
          locator: "Protected archive-overview OCR; source body not materialized.",
          confidence: "limited",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
          relationship: "private-support",
          supports: ["Jamie reported designing, coordinating, and operating the Tired of Tires workflow"],
          locator: "Participant-memory intake, tire-service passage.",
          publicNote: "First-person individual-role account; independent corroboration remains open.",
          confidence: "limited",
          renderCitation: false
        }
      ],
      boundaries: [
        "Project and neighborhood-association program identity is corroborated; Jamie's individual role is not yet independently established.",
        "The Indian Mound expansion needs a dated public artifact or collaborator confirmation.",
        "Social workflow records are not completed service units, households served, or an audited outcomes ledger."
      ],
      antiClaims: [
        "Jamie alone created or operated Tired of Tires",
        "Every report became a completed pickup",
        "The public archive proves the Indian Mound expansion",
        "Project-reported tire counts are audited City totals"
      ],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION",
      project: "cleveland-avenue",
      internalClaim: "Jamie reports co-founding Cleveland Avenue Unify to Beautify and contributing its identity, photography, social media, listening-session maps, resident-reporting materials, printing, and distribution. The account is retained as a coherent participant-memory lead; individual credit and any relationship to public capital decisions require independent evidence.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Jamie's reported Cleveland Avenue coalition, design, mapping, printing, and distribution work is preserved as a participant-memory lead pending collaborator and public-record corroboration.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [{
        sourceId: "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
        relationship: "private-support",
        supports: [
          "Jamie reported co-founding Cleveland Avenue Unify to Beautify and contributing its communications system",
          "Jamie reported providing pro bono design, printing, and distribution for neighborhood groups"
        ],
        locator: "Participant-memory intake, Cleveland Avenue and neighborhood print-studio passages.",
        publicNote: "First-person account retained for research, not independent verification.",
        confidence: "limited",
        renderCitation: false
      }],
      boundaries: [
        "The co-founder title, component-level design credit, quantities printed, distribution practice, and coalition relationships need corroboration.",
        "Pastor Lee's corridor vision and the coalition's collective work should remain visibly credited.",
        "Do not infer that the program caused discretionary capital allocations without decision records and decision-maker attribution."
      ],
      antiClaims: [
        "Jamie alone created Cleveland Avenue Unify to Beautify",
        "Jamie originated Pastor Lee's corridor vision",
        "The program caused a specific capital allocation",
        "Hundreds of printed handbills are independently verified"
      ],
      researchInquiryIds: ["INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
      project: "kc-town-hall",
      question: "What public-safe evidence can establish Jamie's Phase One general-contractor and daily field-coordination role, the work actually completed, and the completion date?",
      methods: [
        "Separate contemporaneous proposal representations from later completion evidence.",
        "Seek permits, inspections, paid invoices, contracts, construction logs, dated photo sequences, architect or engineer records, and collaborator or contractor proof notes.",
        "Compare recovered evidence against the proposal's Phase One scope without publishing protected financial or property records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The proposal identifies Jamie and Julia as founders and project managers and presents a multi-trade team.",
        "The proposal defines the cold-shell scope and reports substantial roof, masonry, debris-removal, and egress work by 2018.",
        "Jamie's first-person account supplies the general-contractor title, daily sequencing detail, and 2019 completion proposition."
      ],
      limitations: [
        "The proposal does not call Jamie general contractor.",
        "Because the bundle was created in March 2019 and describes future completion, it does not independently prove final completion in 2019.",
        "No later completion, permit, inspection, contract, or collaborator record was normalized in this pass."
      ],
      sourceIds: [
        "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019"
      ],
      publicSummary: "The archive supports Jamie's project-manager role, multi-trade scope, and substantial 2018 work; general-contractor title, daily field practice, and final 2019 completion remain open for corroboration.",
      protectedLocatorId: "RESEARCH-KCTH-PHASE-ONE-2026-001"
    },
    {
      id: "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE",
      project: "kc-town-hall",
      question: "What can establish Jamie's individual survey, data-system, and site-listening contribution within KC Town Hall's source-backed neighborhood process?",
      methods: [
        "Preserve the project-level survey artifact and support-letter account.",
        "Seek editable design files, form ownership metadata, distribution records, dated photographs, analysis outputs, and collaborator proof notes.",
        "Keep resident responses and contact records private while testing only public-safe aggregate propositions."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The proposal reproduces the neighborhood survey and says its results directly shaped the proposal.",
        "A January 2019 support letter says the survey directly influenced proposed retail uses.",
        "Jamie reports designing the handbill and data system and using daily site presence as a listening practice."
      ],
      limitations: [
        "The project-level sources do not assign survey or data-system authorship to Jamie.",
        "No respondent count, sampling method, contact ledger, or complete survey analysis is published.",
        "The daily site-conversation account remains participant memory."
      ],
      sourceIds: [
        "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
        "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
        "SRC-KCTH-GHOST-ARCHIVE-2020"
      ],
      publicSummary: "KC Town Hall's survey-led neighborhood process is source-backed; Jamie's component-level design, data, and site-listening contribution remains under research.",
      protectedLocatorId: "RESEARCH-KCTH-SURVEY-PRACTICE-2026-001"
    },
    {
      id: "INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE",
      project: "tired-of-tires",
      question: "What can establish Jamie's individual design, City-coordination, pickup, transport, unloading, and logging work for Tired of Tires and the reported Indian Mound expansion?",
      methods: [
        "Use the complete public social corpus to establish program continuity without converting posts into service units.",
        "Seek City coordination records, Oak Park and Indian Mound minutes, route or disposal logs, dated handbills, photographs, and collaborator proof notes.",
        "Publish no addresses, resident reports, phone numbers, or private service records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The Ghost archive and protected Cleveland Avenue OCR corroborate a recurring joint KC Town Hall and Oak Park service.",
        "The complete social corpus independently preserves 100 tire-workflow records as workflow evidence, not completed service units.",
        "Jamie's individual operating role and the Indian Mound expansion come from participant memory in the present record."
      ],
      limitations: [
        "Shared pages and accounts do not establish individual authorship or operations.",
        "The Cleveland source body was not materialized during this pass.",
        "No independent evidence of the Indian Mound expansion or individual monthly route work was normalized."
      ],
      sourceIds: [
        "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
        "SRC-KCTH-GHOST-ARCHIVE-2020",
        "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020",
        "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026"
      ],
      publicSummary: "The recurring KC Town Hall and Oak Park tire service is source-backed; Jamie's individual operating role and Indian Mound expansion remain open for corroboration.",
      protectedLocatorId: "RESEARCH-KCTH-TIRED-OF-TIRES-ROLE-2026-001"
    },
    {
      id: "INQ-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY",
      project: "cleveland-avenue",
      question: "What public-safe sources can establish Cleveland Avenue Unify to Beautify's origin, collective structure, Jamie's specific contributions, listening-session practice, and any bounded relationship to public capital decisions?",
      methods: [
        "Seek Historic East Neighborhoods Coalition and neighborhood-association minutes, event notices, maps, design files, social-account records, public meeting records, capital-improvement documents, and collaborator proof notes.",
        "Credit Pastor Lee's corridor vision and every recoverable collaborator before assigning component-level work.",
        "Separate participation in public conversation from decision-maker causation and formal allocation outcomes."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "Jamie reports co-founding the program and contributing identity, photography, social media, maps, resident-reporting materials, printing, and distribution.",
        "A protected 2020 Cleveland Avenue page record corroborates the surrounding East-side neighborhood-service context, but not the Unify to Beautify role claims."
      ],
      limitations: [
        "No independent source recovered in this pass establishes co-founder credit or component-level authorship.",
        "No decision record connects the program to a specific discretionary capital allocation.",
        "Print quantities, distribution cadence, and the complete collaborator roster remain unverified."
      ],
      sourceIds: [
        "SRC-KCTH-FIELD-PRACTICE-MEMORY-2026",
        "SRC-CLEVELAND-AVE-KC-TIRES-CAPTURE-2020"
      ],
      publicSummary: "Jamie's Cleveland Avenue coalition and communications contribution is preserved as a participant-memory lead pending collaborator, program, and public-decision records.",
      protectedLocatorId: "RESEARCH-KCTH-CLEVELAND-AVENUE-2026-001"
    }
  ]
} as const;
