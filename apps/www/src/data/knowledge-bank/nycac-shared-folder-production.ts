import census from "./fixtures/nycac-shared-folder-public-census.json" with { type: "json" };
import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const participationClaimId = "CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM";
const townHallRoleClaimId =
  "CLM-NYCAC-TOWN-HALL-PRODUCTION-ROLE-CANDIDATE";
const fairRentWebClaimId =
  "CLM-NYCAC-FAIRRENT-WEB-IMPLEMENTATION-CANDIDATE";
const machineReadableClaimId = "CLM-NYCAC-MACHINE-READABLE-CIVIC-DESIGN";

export const nycacSharedFolderPublicCensus = census;

export const nycacSharedFolderCaptures = [
  {
    id: "CAP-NYCAC-SHARED-FOLDER-CENSUS-2026",
    receivedAt: "2026-07-19",
    submittedBy: "Jamie Burkart / authenticated archival review",
    kind: "artifact",
    summary:
      "A complete, public-safe census and disposition summary for the accessible NYC Artist Coalition shared-folder population.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["nyc-artist-coalition"],
    potentialClaimFamilies: [
      "coalition operating infrastructure",
      "participation systems",
      "campaign implementation",
      "government interface",
    ],
    sourceIds: ["SRC-NYCAC-SHARED-FOLDER-CENSUS-2026"],
    observationIds: [
      "OBS-NYCAC-SHARED-FOLDER-POPULATION-CLOSURE",
      "OBS-NYCAC-SHARED-FOLDER-PROTECTED-DEFAULT",
    ],
    researchTaskIds: ["RT-NYCAC-SHARED-FOLDER-RIGHTS-QUEUE"],
    disposition:
      "Integrated aggregate counts, method, limitations, and a private-manifest digest; kept exact identifiers, paths, ownership displays, raw content, and protected locators outside Git.",
  },
  {
    id: "CAP-NYCAC-SHARED-FOLDER-CLOSE-READING-2026",
    receivedAt: "2026-07-19",
    submittedBy: "Jamie Burkart / authenticated archival review",
    kind: "artifact",
    summary:
      "A protected close-reading pass across 36 priority coalition records spanning facilitation, campaigns, public events, civic data, testimony, and web implementation.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["nyc-artist-coalition", "talks-not-raids", "fair-rent-nyc"],
    potentialClaimFamilies: [
      "participation-to-action system",
      "town-hall production",
      "web implementation",
      "machine-readable civic design",
    ],
    sourceIds: [
      "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
      "SRC-NYCAC-ARCHIVE-CAMPAIGN-IMPLEMENTATION-2017-2019",
      "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017",
      "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
      "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18",
    ],
    observationIds: [
      "OBS-NYCAC-ARCHIVE-MUTUAL-SUPPORT-PURPOSE",
      "OBS-NYCAC-ARCHIVE-PARTICIPATION-GUIDE",
      "OBS-NYCAC-ARCHIVE-TOWN-HALL-PRODUCTION",
      "OBS-NYCAC-ARCHIVE-FAIRRENT-WEB-TASKS",
      "OBS-NYCAC-COUNCIL-MACHINE-READABLE-TESTIMONY",
      "OBS-NYCAC-ARCHIVE-MARCH-ANALYSIS-BOUNDARY",
    ],
    researchTaskIds: [
      "RT-NYCAC-SHARED-FOLDER-TOWN-HALL-ROLE",
      "RT-NYCAC-SHARED-FOLDER-FAIRRENT-WEB-LINEAGE",
      "RT-NYCAC-SHARED-FOLDER-MARCH-ANALYSIS-VALIDATION",
    ],
    disposition:
      "Promoted two bounded, source-backed operating claims; preserved consequential role, authorship, metric, visual, and causal questions as held research.",
  },
] satisfies CaptureRecord[];

export const nycacSharedFolderSources = [
  {
    id: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
    title: "NYC Artist Coalition shared-folder recursive census",
    author: "Codex archival review with Jamie Burkart",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19T04:05:28.743Z",
    publicCitation:
      "Public-safe aggregate from a read-only authenticated census of the NYC Artist Coalition shared folder, July 2026.",
    publicNote:
      "The exact private manifest is bound by a published SHA-256 digest; identifiers, paths, ownership displays, and item-level records remain outside Git.",
    protectedLocatorId: "RESEARCH-NYCAC-SHARED-FOLDER-CENSUS-2026-001",
    supportsGenerally: [
      "2,078 accessible items received inventory, classification, and one primary disposition",
      "253 folders were reconciled, including 18 empty folders and two recovered traversal exceptions",
      "36 priority records received close reading without publishing their raw text",
    ],
    doesNotEstablish: [
      "coverage of deleted, unshared, revision-history, comment, or external-reference populations",
      "authorship or ownership of every item",
      "publication permission",
      "that every item received content review or rights review",
    ],
  },
  {
    id: "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
    title: "Protected coalition formation and facilitation working records",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017 records close-read in July 2026",
    publicCitation:
      "Public-safe summary of protected 2017 NYC Artist Coalition formation, facilitation, and participation-system records.",
    publicNote:
      "Raw notes, private locations, participant details, and working text remain outside Git.",
    protectedLocatorId: "ARCHIVE-NYCAC-COALITION-OPERATIONS-2017-001",
    supportsGenerally: [
      "the shared folder was framed as a mutual-support and resource-sharing space",
      "facilitation materials asked members to develop mission language, working groups, decision structures, and meeting formats",
      "a 2017 working guide identifies Jamie as a co-writer while documenting a participation-to-action method",
    ],
    doesNotEstablish: [
      "that Jamie solely designed the coalition or every meeting",
      "that every proposed working group operated",
      "attendance, adoption, or policy impact",
      "permission to publish raw working records",
    ],
  },
  {
    id: "SRC-NYCAC-ARCHIVE-CAMPAIGN-IMPLEMENTATION-2017-2019",
    title: "Protected coalition campaign-implementation working records",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017-2019 records close-read in July 2026",
    publicCitation:
      "Public-safe summary of protected NYC Artist Coalition campaign-implementation records, 2017-2019.",
    publicNote:
      "The cluster preserves working guides, campaign drafts, hearing notes, factsheets, data-analysis drafts, and outcome celebrations; public claims use official or independent corroboration where required.",
    protectedLocatorId: "ARCHIVE-NYCAC-CAMPAIGN-IMPLEMENTATION-2017-2019-001",
    supportsGenerally: [
      "campaign work connected public education, calls, official meetings, events, hearings, data work, and follow-through",
      "MARCH materials moved among public-record research, hearing preparation, fact-checking, web explanation, and legislative advocacy",
      "the archive distinguishes campaign activity from official outcomes",
    ],
    doesNotEstablish: [
      "individual authorship of every artifact",
      "independent validity of every internal calculation",
      "individual causality for legislation or institutional change",
      "that campaign drafts were always published unchanged",
    ],
  },
  {
    id: "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017",
    title: "Protected Office of Nightlife town-hall production records",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2017 records close-read in July 2026",
    publicCitation:
      "Public-safe summary of protected NYC Artist Coalition Office of Nightlife town-hall production records, 2017.",
    publicNote:
      "The summary omits private feedback, contact details, unpublished speaker material, and raw production notes.",
    protectedLocatorId: "ARCHIVE-NYCAC-NIGHTLIFE-TOWN-HALL-2017-001",
    supportsGenerally: [
      "a run of show identifies Jamie and Olympia Kazi as organizers opening the town hall",
      "the production plan coordinated officials, cultural speakers, questions, projection, sound, seating, volunteers, and documentation",
      "a Jamie-and-Olympia speech record connects community testimony to specific Office of Nightlife priorities",
    ],
    doesNotEstablish: [
      "that Jamie or Olympia solely produced the event",
      "complete division of labor",
      "attendance or audience impact",
      "adoption of every recommendation",
    ],
  },
  {
    id: "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
    title: "Protected civic-data and FairRentNYC implementation records",
    organization: "NYC Artist Coalition / FairRentNYC",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2019 records close-read in July 2026",
    publicCitation:
      "Public-safe summary of protected 2019 NYC Artist Coalition civic-data and FairRentNYC web-implementation records.",
    publicNote:
      "Task labels support bounded contribution leads; code history and collaborator review remain required for a complete web-implementation lineage.",
    protectedLocatorId: "ARCHIVE-NYCAC-CIVIC-DATA-WEB-2019-001",
    supportsGenerally: [
      "a working implementation record assigns Jamie specific completed FairRentNYC website tasks",
      "Jamie-attributed civic testimony drafts translate compliance questions into proposed machine-readable fields",
      "the archive preserves separate collaborator task sections rather than absorbing shared work into Jamie's role",
    ],
    doesNotEstablish: [
      "sole authorship of FairRentNYC",
      "that every listed task shipped exactly as drafted",
      "City adoption of the proposed datasets or tools",
      "individual causality for campaign or legislative outcomes",
    ],
  },
  {
    id: "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18",
    title: "Committee on Small Business hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-03-18",
    accessedAt: "2026-07-19",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?M=F&ID=7230194&GUID=A217E78A-034D-4EE7-ACF4-F4A8DC1F9B16",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Committee on Small Business hearing transcript, March 18, 2019, printed pages 142-144.",
    publicNote:
      "The official transcript records Jamie's testimony; it does not establish adoption or implementation of his recommendations.",
    supportsGenerally: [
      "Jamie testified as an NYC Artist Coalition member",
      "he asked the Council to expand Intros 1466 and 1467 with machine-readable Open Data requirements",
      "he proposed fields covering requirements, cost, time, permits, and certificates for small-business compliance tools",
    ],
    doesNotEstablish: [
      "that the Council adopted the recommendations",
      "that the proposed datasets or tools were built",
      "individual authorship of every coalition policy position",
      "causality for later small-business legislation",
    ],
  },
] satisfies SourceRecord[];

export const nycacSharedFolderObservations = [
  {
    id: "OBS-NYCAC-SHARED-FOLDER-POPULATION-CLOSURE",
    sourceId: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
    project: "nyc-artist-coalition",
    statement:
      "The recursive census reconciled 2,078 accessible items across 253 folders; all 2,078 received inventory, classification, and one primary disposition.",
    observationType: "metadata",
    locator: "Protected census manifest, coverage and population blocks.",
    confidence: "high",
    limitations: [
      "The defined population excludes deleted, no-longer-shared, revision-history, resolved-comment, and external-reference populations.",
    ],
    supportsClaimIds: [],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-SHARED-FOLDER-PROTECTED-DEFAULT",
    sourceId: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
    project: "nyc-artist-coalition",
    statement:
      "All 2,078 Drive items remain protected source material; 1,221 media or design records await rights, consent, attribution, or Jamie review, and no raw Drive item entered Git.",
    observationType: "metadata",
    locator: "Protected census manifest, disposition block.",
    confidence: "high",
    limitations: [
      "Protected status does not mean an item can never support a public-safe summary or later approved artifact.",
    ],
    supportsClaimIds: [],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-ARCHIVE-MUTUAL-SUPPORT-PURPOSE",
    sourceId: "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
    project: "nyc-artist-coalition",
    statement:
      "A coalition-purpose record describes the shared folder as a mutual-support and resource-sharing space where members could contribute useful material and continue an evolving resource.",
    observationType: "explicit",
    locator: "Protected close-reading batch, coalition-purpose record.",
    confidence: "high",
    limitations: [
      "The record states intended use, not complete membership, participation levels, or universal adoption.",
    ],
    supportsClaimIds: [participationClaimId],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-ARCHIVE-PARTICIPATION-GUIDE",
    sourceId: "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
    project: "nyc-artist-coalition",
    statement:
      "A 2017 working guide identifies Jamie as a co-writer and documents a repeatable sequence from recurring meetings and issue prioritization to collaborative letters, small-format calls to action, official meetings, public events, phone calls, and hearings.",
    observationType: "explicit",
    locator: "Protected close-reading batch, co-written organizing-guide record.",
    confidence: "high",
    limitations: [
      "The guide documents and teaches a collective method; it does not establish that Jamie solely designed every component or that every instance followed the sequence exactly.",
    ],
    supportsClaimIds: [participationClaimId],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-ARCHIVE-TOWN-HALL-PRODUCTION",
    sourceId: "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017",
    project: "nyc-artist-coalition",
    statement:
      "A town-hall run of show identifies Jamie and Olympia Kazi as organizers opening the program and records production work spanning officials, speakers, questions, projection, sound, seating, volunteers, documentation, and follow-up.",
    observationType: "explicit",
    locator: "Protected close-reading batch, town-hall run-of-show record.",
    confidence: "high",
    limitations: [
      "The record is a working plan, not a complete division-of-labor ledger or independent completion report.",
    ],
    supportsClaimIds: [townHallRoleClaimId],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-ARCHIVE-FAIRRENT-WEB-TASKS",
    sourceId: "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
    project: "fair-rent-nyc",
    statement:
      "A working implementation record assigns Jamie completed FairRentNYC tasks involving testimonial and image-grid loading, responsive map text, active-organization controls, social imagery, coalition and press modules, and data refreshes while preserving a separate collaborator task section.",
    observationType: "explicit",
    locator: "Protected close-reading batch, FairRentNYC implementation record.",
    confidence: "high",
    limitations: [
      "Task labels are strong contribution evidence but require code history or collaborator review before becoming a complete implementation lineage.",
    ],
    supportsClaimIds: [fairRentWebClaimId],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-COUNCIL-MACHINE-READABLE-TESTIMONY",
    sourceId: "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18",
    project: "nyc-artist-coalition",
    statement:
      "The official transcript records Jamie asking the Council to expand Intros 1466 and 1467 into machine-readable Open Data records that City agencies and others could use to build tools helping small businesses navigate permits, certificates, cost, time, requirements, legality, safety, and compliance.",
    observationType: "explicit",
    locator: "Printed transcript pages 142-144.",
    confidence: "high",
    limitations: [
      "The testimony establishes Jamie's proposal, not Council adoption, dataset publication, tool delivery, or policy impact.",
    ],
    supportsClaimIds: [machineReadableClaimId],
    reviewedAt: "2026-07-19",
  },
  {
    id: "OBS-NYCAC-ARCHIVE-MARCH-ANALYSIS-BOUNDARY",
    sourceId: "SRC-NYCAC-ARCHIVE-CAMPAIGN-IMPLEMENTATION-2017-2019",
    project: "talks-not-raids",
    statement:
      "MARCH working records connect hearing notes, public-record research, fact-checking, data analysis, campaign explanation, and legislative advocacy while also preserving unresolved calculations and an explicit concern about the risks of predictive alerts.",
    observationType: "explicit",
    locator: "Protected close-reading batch, MARCH analysis and talking-points cluster.",
    confidence: "high",
    limitations: [
      "Internal calculations, classifications, and causal interpretations remain campaign research until independently or officially validated.",
    ],
    supportsClaimIds: ["CLM-NYCAC-POLICY-DATA-COMMUNICATIONS"],
    reviewedAt: "2026-07-19",
  },
] satisfies ObservationRecord[];

export const nycacSharedFolderClaims = [
  {
    id: participationClaimId,
    project: "nyc-artist-coalition",
    claimType: "method",
    internalClaim:
      "Jamie co-wrote a 2017 organizing guide that documented how NYC Artist Coalition moved from recurring meetings and issue prioritization to shared letters, handbills, calls, official meetings, public events, and hearings.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-ARCHIVE-MUTUAL-SUPPORT-PURPOSE",
      "OBS-NYCAC-ARCHIVE-PARTICIPATION-GUIDE",
      "OBS-NYCAC-CREATENYC-TOWN-HALL",
      "OBS-NYCAC-CREATENYC-AGENDA",
      "OBS-NYCAC-COUNCIL-CABARET-HEARING-RECORD",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "A 2017 organizing guide co-written by Jamie documents a repeatable participation-to-action system: recurring meetings surfaced and prioritized issues; shared letters and pocket-size calls to action translated them into concrete asks; meetings with officials, public events, calls, and hearings carried those asks into government.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "archive-note",
        text:
          "The protected working guide identifies Jamie as a co-writer; public sources corroborate the coalition's town halls, policy agenda, and Council participation.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
        relationship: "private-support",
        supports: ["Jamie's co-writer attribution", "the documented operating sequence"],
        locator: "Protected close-reading batch, co-written organizing-guide record.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "corroborating",
        supports: ["coalition town hall", "multi-part public policy agenda"],
        locator: "PDF pages 10-11.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "corroborating",
        supports: ["coalition-affiliated Council testimony", "Council receipt of witness stories and testimony"],
        locator: "Printed transcript pages 71-74 and 112.",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The guide documents and teaches a collective system; it does not make Jamie the sole designer, facilitator, author, or decision-maker for every component.",
      "Public records corroborate use of several channels but do not establish universal adoption, attendance, conversion, or individual policy causality.",
    ],
    antiClaims: [
      "Jamie alone designed NYC Artist Coalition's participation system",
      "Every coalition event or campaign followed one fixed process",
      "The operating guide caused legislation to pass",
    ],
    researchTaskIds: [],
    researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-PRODUCTION-2026"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Jamie Burkart authorization", "Codex archival review"],
  },
  {
    id: townHallRoleClaimId,
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim:
      "Protected production records identify Jamie and Olympia Kazi as organizers of the 2017 Office of Nightlife town hall and place Jamie inside program, speaker, technical, volunteer, and documentation coordination.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "use-with-care",
    observationIds: ["OBS-NYCAC-ARCHIVE-TOWN-HALL-PRODUCTION"],
    projections: [
      {
        key: "archive-note",
        text:
          "Working production records identify Jamie and Olympia Kazi as town-hall organizers and show a broad event-production system; hold individual-role projection pending collaborator review.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017",
        relationship: "private-support",
        supports: ["organizer labels", "production scope", "Jamie's speaking role"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-NYCAC-NIGHT-MAYOR-LETTER-2017-09-08",
        relationship: "context",
        supports: ["coalition recommendations surrounding the new Office of Nightlife"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The working record is not a complete production-credit ledger or independent completion report.",
      "Olympia Kazi, venue and production collaborators, speakers, volunteers, officials, and partner groups retain their distinct roles.",
    ],
    antiClaims: [
      "Jamie solely produced the town hall",
      "The town hall alone created or determined the Office of Nightlife",
      "Every planned program element occurred exactly as drafted",
    ],
    researchTaskIds: ["RT-NYCAC-SHARED-FOLDER-TOWN-HALL-ROLE"],
    researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-PRODUCTION-2026"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex archival review"],
  },
  {
    id: fairRentWebClaimId,
    project: "fair-rent-nyc",
    claimType: "action",
    internalClaim:
      "A FairRentNYC implementation record assigns Jamie completed work across media loading, responsive map copy, organization controls, social imagery, coalition and press modules, and data refreshes.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "use-with-care",
    observationIds: ["OBS-NYCAC-ARCHIVE-FAIRRENT-WEB-TASKS"],
    projections: [
      {
        key: "archive-note",
        text:
          "A task-level implementation record gives Jamie specific FairRentNYC web credits while preserving a collaborator's separate work; hold detailed projection until code lineage is recovered.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
        relationship: "private-support",
        supports: ["task-level Jamie attribution", "separate collaborator task section"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Task labels require code history or collaborator confirmation before becoming a complete implementation lineage.",
      "The record does not make Jamie the sole creator of FairRentNYC or its policy content.",
    ],
    antiClaims: [
      "Jamie solely built FairRentNYC",
      "Every listed task shipped exactly as drafted",
      "Web implementation caused legislative or campaign outcomes",
    ],
    researchTaskIds: ["RT-NYCAC-SHARED-FOLDER-FAIRRENT-WEB-LINEAGE"],
    researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-PRODUCTION-2026"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex archival review"],
  },
  {
    id: machineReadableClaimId,
    project: "nyc-artist-coalition",
    claimType: "action",
    internalClaim:
      "In March 2019 Council testimony, Jamie translated cultural-space compliance problems into a machine-readable civic-data requirement for tools helping small businesses navigate city permits, certificates, requirements, cost, time, safety, and legality.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-NYCAC-COUNCIL-MACHINE-READABLE-TESTIMONY"],
    projections: [
      {
        key: "case-study",
        text:
          "In March 2019 Council testimony, Jamie translated cultural-space operators' compliance problems into a civic data product requirement: machine-readable Open Data records for permit and certificate cost, timing, requirements, and agency pathways that could support tools for small businesses navigating city government.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "technical-operations",
        text:
          "In 2019 City Council testimony, Jamie translated a fragmented compliance journey into a machine-readable Open Data requirement for tools helping small businesses navigate permits, certificates, cost, timing, and agency processes.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/technical-operations"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18",
        relationship: "direct-support",
        supports: [
          "Jamie's testimony and coalition role",
          "the proposed machine-readable Open Data requirement",
          "the proposed compliance fields and tool purpose",
        ],
        locator: "Printed transcript pages 142-144.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
        relationship: "private-support",
        supports: ["draft specificity and preparation context"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The evidence establishes Jamie's public proposal, not Council adoption, dataset publication, tool delivery, or policy impact.",
      "Intros 1466 and 1467 were separate Council bills and the transcript does not make Jamie their sponsor or author.",
    ],
    antiClaims: [
      "Jamie built the City datasets or compliance tools",
      "The Council adopted Jamie's recommendations",
      "Jamie authored or sponsored Intros 1466 and 1467",
    ],
    researchTaskIds: [],
    researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-PRODUCTION-2026"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex official-record review"],
  },
] satisfies ClaimRecord[];

export const nycacSharedFolderResearchTasks = [
  {
    id: "RT-NYCAC-SHARED-FOLDER-TOWN-HALL-ROLE",
    project: "nyc-artist-coalition",
    question:
      "Can public event records, documentation, and collaborator proof notes establish a complete, collectively credited division of labor for the 2017 Office of Nightlife town hall?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-NYCAC-SHARED-FOLDER-CLOSE-READING-2026"],
    sourceIds: ["SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017"],
    claimIds: [townHallRoleClaimId],
    successCriteria: [
      "Recover public event and media records confirming the program occurred.",
      "Record collaborator-aware roles for Jamie, Olympia Kazi, venue and production collaborators, speakers, and volunteers.",
      "Separate planned tasks from completed work and audience outcomes.",
    ],
    nextActions: [
      "Match the run of show to the public event, press, photographs, and video records.",
      "Invite bounded collaborator proof notes before activating detailed individual-role wording.",
    ],
    publicNote:
      "The protected run of show is strong role evidence; a full public production credit remains held for collective review.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-19",
  },
  {
    id: "RT-NYCAC-SHARED-FOLDER-FAIRRENT-WEB-LINEAGE",
    project: "fair-rent-nyc",
    question:
      "Can repository history, deployment records, and collaborator confirmation corroborate the FairRentNYC task-level implementation record?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-NYCAC-SHARED-FOLDER-CLOSE-READING-2026"],
    sourceIds: ["SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019"],
    claimIds: [fairRentWebClaimId],
    successCriteria: [
      "Recover commit or deployment evidence for the attributed Jamie tasks.",
      "Preserve collaborator design, content, data, and campaign roles separately.",
      "Promote only completed behavior that can be observed in code or a public surface.",
    ],
    nextActions: [
      "Inspect the campaign repository and deployment history for task-level matches.",
      "Ask collaborators to correct or confirm the bounded division of labor.",
    ],
    publicNote:
      "The task record is preserved as a strong implementation lead; detailed role wording remains held pending lineage review.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-19",
  },
  {
    id: "RT-NYCAC-SHARED-FOLDER-MARCH-ANALYSIS-VALIDATION",
    project: "talks-not-raids",
    question:
      "Which internal MARCH calculations and analytic interpretations can be reproduced against the original FOIL dataset, official testimony, and enacted reporting requirements?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-NYCAC-SHARED-FOLDER-CLOSE-READING-2026"],
    sourceIds: [
      "SRC-NYCAC-ARCHIVE-CAMPAIGN-IMPLEMENTATION-2017-2019",
      "SRC-NYCAC-COUNCIL-MARCH-HEARING-2019-02-11",
    ],
    claimIds: ["CLM-NYCAC-POLICY-DATA-COMMUNICATIONS"],
    successCriteria: [
      "Recover the original dataset, transformations, denominator, code, and output definitions.",
      "Reconcile disputed figures with the official transcript and source records.",
      "Preserve the archive's explicit ethical concern about predictive-alert harms.",
    ],
    nextActions: [
      "Run a reproducible data audit in a protected workspace.",
      "Promote no internal metric until the calculation and denominator reproduce.",
    ],
    publicNote:
      "The archive establishes an evidence workflow and its uncertainties; internal metrics remain held until reproduction.",
    owner: "Jamie Burkart / data reviewer",
    reviewedAt: "2026-07-19",
  },
  {
    id: "RT-NYCAC-SHARED-FOLDER-RIGHTS-QUEUE",
    project: "nyc-artist-coalition",
    question:
      "Which visual, audio, video, design, map, and document artifacts can receive rights, consent, attribution, and editorial approval for bounded public use?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-NYCAC-SHARED-FOLDER-CENSUS-2026"],
    sourceIds: ["SRC-NYCAC-SHARED-FOLDER-CENSUS-2026"],
    claimIds: [],
    successCriteria: [
      "Every proposed artifact has creator, subjects, rights, consent, sensitivity, caption, credit, and public-use decisions.",
      "No proprietary font, private media, or identifiable participant material enters Git without approval.",
      "A no-image decision remains an acceptable editorial outcome.",
    ],
    nextActions: [
      "Prioritize public event graphics, public handbills, public maps, and Jamie-created implementation screenshots.",
      "Keep all raw candidates in the protected custody layer during review.",
    ],
    publicNote:
      "The census routes 1,221 media and design records to rights-aware review; none is automatically approved by folder access.",
    owner: "Jamie Burkart / photo editor / rights reviewer",
    reviewedAt: "2026-07-19",
  },
] satisfies ResearchTask[];

export const nycacSharedFolderInquiries = [
  {
    id: "INQ-NYCAC-SHARED-FOLDER-PRODUCTION-2026",
    project: "nyc-artist-coalition",
    question:
      "What complete, governed, public-safe professional knowledge can be recovered from the accessible NYC Artist Coalition shared-folder population?",
    methods: [
      "Established a named authenticated snapshot and reconciled the 61-item root population.",
      "Traversed all disclosed folders recursively until the queue reached zero.",
      "Adjudicated 20 traversal exceptions as 18 empty folders and two recovered folders.",
      "Assigned every one of 2,078 items a format, sensitivity posture, and exactly one primary disposition in a protected private manifest.",
      "Close-read 36 priority Google Docs across formation, facilitation, Cabaret Law repeal, MARCH, Office of Nightlife, FairRentNYC, civic data, and web implementation.",
      "Corroborated selected public claims with official Council and existing public-source records while holding raw text, exact locators, metrics, media, and incomplete role claims.",
      "Bound the protected manifest to the public census through a SHA-256 digest.",
    ],
    runAt: "2026-07-19",
    resultStatus: "recovered",
    findings: [
      "The defined accessible population contains 2,078 items: 253 folders and 1,825 non-folder records.",
      "Inventory, classification, disposition, and population totals reconcile exactly at 2,078.",
      "The archive makes a repeatable participation-to-action system legible and identifies Jamie as a co-writer of one 2017 operating guide.",
      "The official March 2019 Council transcript confirms Jamie proposed machine-readable Open Data requirements for small-business compliance tools.",
      "Town-hall production and FairRentNYC task records create strong individual-role leads while preserving collaborator credit and requiring further corroboration.",
      "No raw Drive content, exact identifier, private locator, participant data, or unapproved media entered Git.",
    ],
    limitations: [
      "Access is not publication permission or proof of ownership, authorship, adoption, or impact.",
      "Only 36 priority text records received close reading; 100 percent refers to accounting and disposition of the accessible population.",
      "The pass excludes deleted items, revision histories, resolved comments, no-longer-shared material, and external referenced systems.",
      "Rights review remains open for all 1,221 visual, audio, video, and design candidates.",
      "Internal calculations and consequential role claims require claim-specific public, code, or collaborator corroboration.",
    ],
    sourceIds: [
      "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
      "SRC-NYCAC-ARCHIVE-COALITION-OPERATIONS-2017",
      "SRC-NYCAC-ARCHIVE-CAMPAIGN-IMPLEMENTATION-2017-2019",
      "SRC-NYCAC-ARCHIVE-NIGHTLIFE-TOWN-HALL-2017",
      "SRC-NYCAC-ARCHIVE-CIVIC-DATA-WEB-2019",
      "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18",
    ],
    publicSummary:
      "A complete July 2026 census accounted for and dispositioned all 2,078 accessible items, close-read 36 priority records, promoted two bounded operating claims, and routed role, metric, media, rights, and causal questions to explicit research gates.",
    protectedLocatorId: "RESEARCH-NYCAC-SHARED-FOLDER-PRODUCTION-2026-001",
  },
] satisfies ResearchInquiry[];
