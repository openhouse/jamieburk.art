const reviewedAt = "2026-07-19";
const reviewedBy = ["Jamie Burkart", "Codex authenticated archival review"];

const sourceIds = {
  census: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
  playbook: "SRC-NYCAC-ADVOCACY-OPERATING-GUIDE-2017",
  townHall: "SRC-NYCAC-NIGHTLIFE-TOWN-HALL-RUN-OF-SHOW-2017",
  fairRentWeb: "SRC-NYCAC-FAIRRENT-WEB-CHECKLIST-2019",
  governance: "SRC-NYCAC-MEETING-GOVERNANCE-ARTIFACTS-2017-2019"
} as const;
export const nycacSharedFolderProduction = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-SHARED-FOLDER-CENSUS-2026",
      kind: "analysis-note",
      title: "Protected NYC Artist Coalition shared-folder census",
      submittedAt: reviewedAt,
      submittedBy: "Authenticated Google Drive archival production",
      projectIds: ["nyc-artist-coalition"],
      reason: "Account for the complete accessible population while retaining exact locators, raw documents, collaborator records, and media in protected custody.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.census],
      observationIds: [
        "OBS-NYCAC-SHARED-FOLDER-POPULATION-2026",
        "OBS-NYCAC-SHARED-FOLDER-PRIORITY-REVIEW-2026"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      boundaries: [
        "Do not publish Drive identifiers, resource keys, authenticated links, exact private paths, filenames, owner labels, editor lists, raw exports, excerpts, participant data, or private media.",
        "Complete population accounting does not mean that every file was close-read or cleared for publication.",
        "Folder custody and item presence do not establish authorship, endorsement, role, rights, consent, or outcome."
      ]
    },
    {
      id: "INTAKE-NYCAC-ADVOCACY-OPERATING-GUIDE-2017",
      kind: "analysis-note",
      title: "Protected shared advocacy operating guide",
      submittedAt: reviewedAt,
      submittedBy: "Authenticated Google Drive archival production",
      projectIds: ["nyc-artist-coalition", "let-nyc-dance"],
      reason: "Preserve direct shared-authorship evidence for a repeatable participation and advocacy method without publishing the working document.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.playbook],
      observationIds: [
        "OBS-NYCAC-PLAYBOOK-SHARED-AUTHORSHIP",
        "OBS-NYCAC-PLAYBOOK-OPERATING-METHOD"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      boundaries: [
        "Credit Julia Fredenburg and Jamie together for the guide; do not convert shared writing into sole campaign authorship.",
        "The working guide describes a method and retrospective; it does not independently prove execution of every step or allocate causal weight for legislation."
      ]
    },
    {
      id: "INTAKE-NYCAC-NIGHTLIFE-TOWN-HALL-RUN-OF-SHOW-2017",
      kind: "analysis-note",
      title: "Protected Office of Nightlife town-hall production record",
      submittedAt: reviewedAt,
      submittedBy: "Authenticated Google Drive archival production",
      projectIds: ["nyc-artist-coalition", "office-of-nightlife"],
      reason: "Clarify Jamie's shared day-of and program role while preserving the event's collective production context.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.townHall],
      observationIds: ["OBS-NYCAC-NIGHTLIFE-TOWN-HALL-PRODUCTION-ROLE"],
      researchInquiryIds: [],
      boundaries: [
        "The record is a working run-of-show, not a complete production-credit roster or proof that every planned detail occurred.",
        "Keep Olympia Kazi, venue hosts, the MC, speakers, technical crew, coalition collaborators, public officials, and cultural organizations inside the event's collective context."
      ]
    },
    {
      id: "INTAKE-NYCAC-FAIRRENT-WEB-CHECKLIST-2019",
      kind: "analysis-note",
      title: "Protected Fair Rent NYC implementation checklist",
      submittedAt: reviewedAt,
      submittedBy: "Authenticated Google Drive archival production",
      projectIds: ["nyc-artist-coalition", "fair-rent-nyc"],
      reason: "Corroborate Jamie's campaign-site implementation responsibilities at the task level without publishing private working links or collaborator notes.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.fairRentWeb],
      observationIds: ["OBS-NYCAC-FAIRRENT-WEB-TASKS"],
      researchInquiryIds: ["INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP"],
      boundaries: [
        "Implementation tasks do not establish sole authorship of campaign policy, copy, data, photography, design, strategy, or outcomes.",
        "Do not expose development links, private data fields, working notes, or media-selection details."
      ]
    },
    {
      id: "INTAKE-NYCAC-MEETING-GOVERNANCE-ARTIFACTS-2017-2019",
      kind: "analysis-note",
      title: "Protected coalition meeting and priority-setting artifacts",
      submittedAt: reviewedAt,
      submittedBy: "Authenticated Google Drive archival production",
      projectIds: ["nyc-artist-coalition"],
      reason: "Preserve the public-safe operating pattern across agendas, ballots, priority votes, assignments, and follow-up while excluding names, contact details, raw quotations, and attendance records.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.governance],
      observationIds: ["OBS-NYCAC-PARTICIPATORY-GOVERNANCE-PATTERN"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      boundaries: [
        "Retain only the aggregate operating pattern; do not publish participant names, attendance, contact details, ballots, raw votes, unapproved quotations, or assignments to people other than Jamie.",
        "Meeting artifacts do not establish consensus, facilitation quality, participant experience, or Jamie's authorship of every record."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-SHARED-FOLDER-POPULATION-2026",
      intakeId: "INTAKE-NYCAC-SHARED-FOLDER-CENSUS-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The authenticated capture reconciled 61 root items and recursively inventoried 2,405 uniquely identified items across 257 captured folders, with every item classified and assigned one primary disposition and no inaccessible folder encountered.",
      locator: "Protected recursive manifest and public-safe aggregate census.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SHARED-FOLDER-ARCHIVAL-COVERAGE-2026"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      limitations: [
        "This is the accessible capture-time population, not proof that deleted, removed, inaccessible, or never-shared material does not exist.",
        "Population accounting does not establish authorship or publication permission."
      ]
    },
    {
      id: "OBS-NYCAC-SHARED-FOLDER-PRIORITY-REVIEW-2026",
      intakeId: "INTAKE-NYCAC-SHARED-FOLDER-CENSUS-2026",
      sourceId: sourceIds.census,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Sixty-three priority text documents totaling 351,532 characters were close-read across coalition operations, Cabaret Law repeal, Office of Nightlife, M.A.R.C.H., Commercial Rent Stabilization, CreateNYC, public-meeting production, and campaign-web implementation.",
      locator: "Protected export ledger and public-safe aggregate census.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SHARED-FOLDER-ARCHIVAL-COVERAGE-2026"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      limitations: [
        "Close reading did not make the documents public or clear collaborator quotations.",
        "The remaining population retains protected or deferred dispositions rather than being silently treated as reviewed."
      ]
    },
    {
      id: "OBS-NYCAC-PLAYBOOK-SHARED-AUTHORSHIP",
      intakeId: "INTAKE-NYCAC-ADVOCACY-OPERATING-GUIDE-2017",
      sourceId: sourceIds.playbook,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "A protected coalition working guide identifies Julia Fredenburg and Jamie as its writers and places both inside the NYC Artist Coalition and broader Let NYC Dance effort.",
      locator: "Protected guide, authorship and coalition-context section.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017", "CLM-NYCAC-PARTICIPATION-SYSTEM"],
      researchInquiryIds: [],
      limitations: [
        "Shared authorship of the guide is not sole authorship of the coalition's tactics, positions, events, or outcomes.",
        "The guide is a protected working artifact rather than an independently published assessment."
      ]
    },
    {
      id: "OBS-NYCAC-PLAYBOOK-OPERATING-METHOD",
      intakeId: "INTAKE-NYCAC-ADVOCACY-OPERATING-GUIDE-2017",
      sourceId: sourceIds.playbook,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The guide describes a repeatable operating method connecting facilitated community listening, focused priority-setting, citywide coalition building, concise recommendations and calls to action, meetings with representatives, public forums and hearings, and sustained follow-through across meetings, press, social media, and calls.",
      locator: "Protected guide, operating-method sections.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017", "CLM-NYCAC-PARTICIPATION-SYSTEM"],
      researchInquiryIds: [],
      limitations: [
        "The guide supports method and intent; public records remain necessary for event, legislative, and outcome claims.",
        "No conversion, reach, attendance, or causal metric is inferred from the guide."
      ]
    },
    {
      id: "OBS-NYCAC-NIGHTLIFE-TOWN-HALL-PRODUCTION-ROLE",
      intakeId: "INTAKE-NYCAC-NIGHTLIFE-TOWN-HALL-RUN-OF-SHOW-2017",
      sourceId: sourceIds.townHall,
      comparisonSourceIds: ["SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12"],
      project: "office-of-nightlife",
      kind: "source-fact",
      text: "A protected run-of-show documents Jamie and Olympia Kazi opening the Office of Nightlife town hall for NYC Artist Coalition and assigns Jamie presentation and documentation tasks within a larger shared production plan.",
      locator: "Protected run-of-show, opening sequence and production notes.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-NIGHTLIFE-TOWN-HALL-2017", "CLM-NYCAC-PARTICIPATION-SYSTEM"],
      researchInquiryIds: [],
      limitations: [
        "The run-of-show is a working plan and does not prove every detail occurred as written.",
        "Public reporting establishes that the coalition spearheaded the event and that Jamie spoke; neither source assigns every production responsibility."
      ]
    },
    {
      id: "OBS-NYCAC-FAIRRENT-WEB-TASKS",
      intakeId: "INTAKE-NYCAC-FAIRRENT-WEB-CHECKLIST-2019",
      sourceId: sourceIds.fairRentWeb,
      comparisonSourceIds: ["SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE", "SRC-FAIRRENTNYC-GITHUB-REPOSITORY"],
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "A protected checklist headed for Jamie records completed Fair Rent NYC implementation tasks involving responsive presentation, testimonial and image behavior, coalition and press modules, social sharing, data fixes, and campaign calls to action.",
      locator: "Protected implementation checklist, Jamie task section.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION"],
      researchInquiryIds: ["INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP"],
      limitations: [
        "The checklist corroborates task-level implementation rather than sole authorship of campaign policy, copy, data, media, design, or outcomes.",
        "Private working links and data-field notes remain excluded."
      ]
    },
    {
      id: "OBS-NYCAC-PARTICIPATORY-GOVERNANCE-PATTERN",
      intakeId: "INTAKE-NYCAC-MEETING-GOVERNANCE-ARTIFACTS-2017-2019",
      sourceId: sourceIds.governance,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "Across the reviewed meeting artifacts, the coalition repeatedly used agendas, issue framing, ballots, priority voting, next-step assignments, practical safety work, and campaign follow-through to translate participant concerns into collective action.",
      locator: "Protected meeting, ballot, and priority-setting artifact set; aggregate pattern only.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM", "CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017"],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      limitations: [
        "The aggregate pattern does not establish participant consensus, facilitation quality, or universal experience.",
        "Participant names, attendance, contact data, raw votes, unapproved quotations, and non-Jamie assignments remain excluded."
      ]
    }
  ],
  sources: [
    {
      id: sourceIds.census,
      title: "Protected NYC Artist Coalition shared-folder archival census",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Public-safe aggregate of an authenticated NYC Artist Coalition shared-folder archival review conducted July 19, 2026.",
      publicNote: "The repository stores only aggregate coverage, dispositions, findings, anti-claims, and a one-way private-manifest digest.",
      protectedLocatorId: "VAULT-NYCAC-SHARED-FOLDER-2026-001",
      supportsGenerally: [
        "61 root items reconciled",
        "2,405-item recursive accessible population",
        "257 captured folders",
        "one primary disposition per item",
        "63 priority documents close-read"
      ],
      doesNotEstablish: [
        "complete historical existence beyond the accessible population",
        "authorship from custody or owner labels",
        "publication rights or collaborator consent",
        "content review of all 2,405 items",
        "project outcomes or causal weight"
      ]
    },
    {
      id: sourceIds.playbook,
      title: "Protected shared advocacy operating guide",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Protected NYC Artist Coalition working guide co-authored by Julia Fredenburg and Jamie Burkart, reviewed July 19, 2026.",
      publicNote: "Only public-safe authorship, method, and boundary propositions are retained; the document, exact title, locator, links, and working material remain private.",
      protectedLocatorId: "VAULT-NYCAC-PLAYBOOK-2017-001",
      supportsGenerally: [
        "shared Julia Fredenburg and Jamie Burkart authorship",
        "repeatable listening-to-action method",
        "connection among meetings, priorities, coalition building, representative outreach, public events, and sustained follow-through"
      ],
      doesNotEstablish: [
        "sole authorship of coalition tactics or positions",
        "execution of every described step",
        "attendance, reach, conversion, or participant consensus",
        "legislative or policy causation"
      ]
    },
    {
      id: sourceIds.townHall,
      title: "Protected Office of Nightlife town-hall run-of-show",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Protected 2017 Office of Nightlife town-hall production record, reviewed July 19, 2026.",
      publicNote: "The public record retains only Jamie's bounded shared role and the collective-production boundary.",
      protectedLocatorId: "VAULT-NYCAC-NIGHTLIFE-TOWN-HALL-2017-001",
      supportsGenerally: [
        "Jamie and Olympia Kazi in the coalition opening sequence",
        "Jamie's presentation and documentation tasks",
        "multi-role shared event production"
      ],
      doesNotEstablish: [
        "sole production or facilitation by Jamie",
        "execution of every planned detail",
        "complete credit roster",
        "attendance, endorsement, or policy causation"
      ]
    },
    {
      id: sourceIds.fairRentWeb,
      title: "Protected Fair Rent NYC implementation checklist",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Protected Fair Rent NYC implementation checklist with a Jamie-assigned task section, reviewed July 19, 2026.",
      publicNote: "Task-level implementation is summarized without private links, fields, collaborator notes, or media details.",
      protectedLocatorId: "VAULT-NYCAC-FAIRRENT-WEB-2019-001",
      supportsGenerally: [
        "Jamie-assigned campaign web tasks",
        "responsive and data-backed presentation work",
        "testimonial, coalition, press, and social-sharing modules",
        "campaign call-to-action implementation"
      ],
      doesNotEstablish: [
        "sole policy, copy, data, photography, or design authorship",
        "ownership of collaborator tasks",
        "campaign reach, conversion, or policy causation"
      ]
    },
    {
      id: sourceIds.governance,
      title: "Protected coalition meeting and priority-setting artifact set",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Public-safe aggregate of protected NYC Artist Coalition meeting and priority-setting artifacts from 2017 through 2019.",
      publicNote: "Only the recurring operating pattern is retained; participant and record-level detail remains private.",
      protectedLocatorId: "VAULT-NYCAC-MEETING-GOVERNANCE-2017-2019-001",
      supportsGenerally: [
        "agendas and issue framing",
        "ballots and priority voting",
        "next-step assignments",
        "practical safety work",
        "campaign follow-through"
      ],
      doesNotEstablish: [
        "participant consensus or experience",
        "audited attendance",
        "Jamie's authorship of every artifact",
        "universal use of one process",
        "policy causation"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-SHARED-FOLDER-ARCHIVAL-COVERAGE-2026",
      project: "nyc-artist-coalition",
      internalClaim: "The July 19, 2026 authenticated archival pass completely accounted for the 2,405-item accessible NYC Artist Coalition shared-folder population and close-read a 63-document priority set without copying raw private content into the public repository.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "An authenticated archival pass reconciled the complete accessible shared-folder population, assigned every item a primary disposition, and close-read a bounded priority set while keeping private records outside the public repository.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [{
        sourceId: sourceIds.census,
        relationship: "private-support",
        supports: ["population reconciliation", "disposition equality", "priority-review coverage", "private-custody boundary"],
        locator: "Protected manifest and public-safe census",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "Use accessible capture-time population, not complete historical archive.",
        "Do not equate inventory and disposition with close reading or publication clearance."
      ],
      antiClaims: [
        "All 2,405 items were close-read",
        "The shared folder contains every NYC Artist Coalition record ever made",
        "Every item is safe or cleared to publish",
        "Drive custody proves Jamie's authorship"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie and Julia Fredenburg co-authored a working guide that made the coalition's listening-to-action practice explicit and reusable across meetings, priority-setting, public communication, representative outreach, and public forums.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie and Julia Fredenburg co-authored a working guide that connected community listening and priority-setting to coalition building, clear public actions, representative outreach, public forums, and sustained follow-through.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [
        {
          sourceId: sourceIds.playbook,
          relationship: "private-support",
          supports: ["shared authorship", "repeatable operating method"],
          locator: "Protected guide, authorship and method sections",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          relationship: "corroborating",
          supports: ["public event sequence", "recurring meetings", "civic and cultural interfaces"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-CABARET-CAMPAIGN-2017-08-01",
          relationship: "corroborating",
          supports: ["issue explanation", "Council contact pathway", "public-data and action surface"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Credit Julia and Jamie together for the guide.",
        "Use the artifact to establish method, not sole campaign authorship or policy causation.",
        "Keep the underlying guide and private working links out of the public repository."
      ],
      antiClaims: [
        "Jamie solely invented every coalition tactic",
        "Julia and Jamie alone produced every event or campaign artifact",
        "The guide proves every described step occurred",
        "The operating method caused Cabaret Law repeal or another policy outcome"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW"],
      reviewedAt,
      reviewedBy
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-SHARED-FOLDER-DEFERRED-REVIEW",
      project: "nyc-artist-coalition",
      question: "Which deferred, protected, technical, and visual records should receive the next close-reading, corroboration, collaborator-credit, or rights-review pass?",
      methods: [
        "Reconciled the complete accessible population through the authenticated Drive interface.",
        "Assigned every item one primary disposition before selecting content for review.",
        "Close-read 63 priority text documents across the main mission and implementation clusters.",
        "Promoted only public-safe propositions with explicit anti-claims and source boundaries."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The accessible population is fully inventoried, classified, and dispositioned.",
        "The priority review strengthened evidence for a shared advocacy playbook, town-hall production, campaign-web implementation, and participatory governance.",
        "Most visual and design records remain in rights review; many additional documents remain deferred or protected rather than silently treated as reviewed."
      ],
      limitations: [
        "The archive contains collaborator, participant, contact, strategy, legal, and media material that cannot be promoted automatically.",
        "Deleted, removed, inaccessible, or never-shared records may exist outside the captured population.",
        "The next pass should follow an audience need or explicit research question rather than maximizing publication volume."
      ],
      sourceIds: [sourceIds.census, sourceIds.playbook, sourceIds.townHall, sourceIds.fairRentWeb, sourceIds.governance],
      publicSummary: "The complete accessible population is governed; the next pass should target deferred records by claim need, collective-credit value, and rights readiness rather than treating publication volume as the objective.",
      protectedLocatorId: "VAULT-NYCAC-SHARED-FOLDER-2026-001"
    }
  ]
} as const;
