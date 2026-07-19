import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const googleDriveArchiveSources = [
  {
    id: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    title: "Google Drive Shared Drive archival-production inventory",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe inventory and bounded close reading of Jamie Burkart's Google Drive Shared Drives, July 2026.",
    publicNote:
      "The review inventoried 110 accessible Shared Drive roots, selected 15 professional roots across civic, cultural, technical, and collaborative work, and excluded personal, legal, wedding, bulk-photo, synchronization, and relationship archives from research.",
    protectedLocatorId: "ARCHIVE-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    supportsGenerally: [
      "110 Shared Drive roots were accessible during the review",
      "15 professional roots were selected for bounded close reading",
      "selection prioritized civic systems, public data, cultural infrastructure, technical work, and externally attributable collaboration",
      "personal, legal, wedding, bulk-photo, synchronization, and relationship archives were excluded",
      "a drive title, folder title, or file presence was not treated as proof of Jamie's role"
    ],
    doesNotEstablish: [
      "an exhaustive review of every Shared Drive or file",
      "that every accessible drive is current or complete",
      "that a drive title establishes authorship, delivery, or public permission",
      "permission to publish underlying Drive identifiers, links, names, media, or records",
      "that folder access and file access were identical for every item"
    ]
  },
  {
    id: "SRC-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026",
    title: "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
    organization: "Jamie Burkart",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-03-27",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's 2026 commercial-vacancy and lease-cost public-data brief.",
    publicNote:
      "The brief defines a smallest serious pilot for privacy-preserving, geography-aggregated indicators derived from city income-and-expense filings: an indicators table, a coverage and suppression table, and a plain-language methods note.",
    protectedLocatorId: "ARCHIVE-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026",
    supportsGenerally: [
      "Jamie authored the brief",
      "the brief proposes geography-aggregated commercial vacancy and lease-cost indicators",
      "the proposed release includes an indicators table, coverage and suppression table, and methods note",
      "the brief distinguishes a complementary income-and-expense lens from existing storefront reporting",
      "the brief excludes tenant identities, tax identifiers, parcel-level rent rows, unit-level lease records, and uploaded lease documents"
    ],
    doesNotEstablish: [
      "that a city agency adopted or implemented the proposal",
      "that the proposal was commissioned by government",
      "that the proposed dataset was released",
      "measured policy, business, or neighborhood outcomes",
      "independent validation of the proposed methods",
      "a publicly recovered event listing or formal presentation selection"
    ]
  },
  {
    id: "SRC-COMMERCIAL-VACANCY-MAP-PACKAGE-2026",
    title: "Commercial vacancy Council District map package",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-03-28",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe metadata review of a 2026 commercial-vacancy Council District map package.",
    publicNote:
      "A protected project folder contains three map exports labeled as New York City Council District business-vacancy views for 2025 Q4.",
    protectedLocatorId: "ARCHIVE-COMMERCIAL-VACANCY-MAP-PACKAGE-2026",
    supportsGenerally: [
      "a three-image Council District map package is preserved",
      "the package is labeled for 2025 Q4 business-vacancy comparison"
    ],
    doesNotEstablish: [
      "Jamie's authorship of the underlying data or maps",
      "the accuracy or completeness of the mapped data",
      "public presentation, agency use, or measured impact",
      "permission to publish the maps"
    ],
    media: {
      mediaKind: "graphic",
      rightsStatus: "unknown",
      consentStatus: "not-applicable",
      publicDisplayStatus: "metadata-only"
    }
  },
  {
    id: "SRC-FAIR-RENT-WEB-OPERATIONS-RECORD-2023",
    title: "Fair Rent NYC web operations record",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    author: "Jamie Burkart with collaborator edits",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023-01-20 through 2023-02-03",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of a collaborative Fair Rent NYC web operations record, January-February 2023.",
    publicNote:
      "The co-edited record marks the new website live on February 1 and tracks a concrete delivery queue spanning site administration, email restoration, letterhead, join and call-to-action flows, press, and campaign assets. Version history records twelve modifications by Jamie and four by a collaborator.",
    protectedLocatorId: "ARCHIVE-FAIR-RENT-WEB-OPERATIONS-RECORD-2023",
    supportsGenerally: [
      "Jamie created and maintained most recorded revisions of the web operations record",
      "a collaborator also edited the record",
      "the record marks the new website live on February 1, 2023",
      "the delivery queue included site administration, email restoration, letterhead, join and call-to-action flows, press, and campaign assets",
      "the work joined web implementation with campaign operations"
    ],
    doesNotEstablish: [
      "that Jamie authored every page, asset, message, or policy position",
      "that Jamie completed every listed task alone",
      "that the record is a complete project-management history",
      "sole ownership or leadership of Fair Rent NYC or NYC Artist Coalition",
      "permission to publish administration links, meeting details, collaborator notes, or underlying records"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
    title: "Sunday Dinner operations ledger",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2012-01-22 through 2021-03-07",
    accessedAt: "2026-07-16",
    publicCitation:
      "Public-safe structural review of the Sunday Dinner operations ledger, 2012-2021.",
    publicNote:
      "The protected ledger contains 345 event columns carrying numeric prefixes across January 2012 through March 2021. A full structural pass found 2,714 affirmative attendance marks in those columns; person-level coordination and attendance remain outside the public repository.",
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
    supportsGenerally: [
      "the ledger records 345 Sunday Dinner event columns carrying numeric prefixes",
      "the numbered entries span January 2012 through March 2021",
      "the structure supported recurring event coordination and continuity",
      "2,714 affirmative attendance marks appear in the prefixed event columns",
      "273 prefixed columns contain at least five affirmative attendance marks",
      "the archive materially supports the public-safe 300-plus gathering scale"
    ],
    doesNotEstablish: [
      "that every event column independently proves a completed gathering",
      "345 distinct sequence numbers; five numeric prefixes repeat or conflict",
      "unique people, externally audited attendance, or meals served",
      "a complete attendance total",
      "the 20-plus resident-artist aggregate",
      "permission to publish names, phone numbers, email addresses, notes, attendance detail, or preferences",
      "Jamie's sole production of every gathering"
    ]
  },
  {
    id: "SRC-SUNDAY-DINNER-DIGITAL-GATHERING-ARCHIVE",
    title: "Sunday Dinner digital gathering archive",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe metadata review of a protected Sunday Dinner digital-gathering archive.",
    publicNote:
      "The archive preserves multiple meeting recordings and packaged video exports from a digital continuity layer for Sunday Dinner.",
    protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-DIGITAL-GATHERING-RECORDS",
    supportsGenerally: [
      "a protected digital-gathering archive exists",
      "the archive contains multiple recording and export formats"
    ],
    doesNotEstablish: [
      "a complete gathering count",
      "the content or outcome of any gathering",
      "participant identity or consent for public reuse",
      "permission to publish recordings, transcripts, or still images"
    ],
    media: {
      mediaKind: "other",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  },
  {
    id: "SRC-196-RESIDENCY-ACCEPTANCE-TEMPLATE-2023",
    title: "196 Artists Residency acceptance and onboarding template",
    organization: "196 Artists Residency",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2023",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of a 2023 196 Artists Residency acceptance and onboarding template.",
    publicNote:
      "The template turns an artist invitation into a repeatable operating sequence: a defined residency window, a pre-arrival call, space configuration, and independent access.",
    protectedLocatorId: "ARCHIVE-196-RESIDENCY-ACCEPTANCE-TEMPLATE-2023",
    supportsGenerally: [
      "Jamie authored the acceptance template",
      "the template defines a residency window",
      "the template schedules a pre-arrival orientation call",
      "the template anticipates configuring the space around the artist's needs",
      "the template provides for independent access"
    ],
    doesNotEstablish: [
      "the 20-plus resident-artist aggregate",
      "the complete residency program history",
      "the resident's completed exhibition or outcome",
      "permission to publish the resident's identity, proposal, messages, access instructions, or media",
      "institutional ownership of a resident's creative work"
    ]
  },
  {
    id: "SRC-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE",
    title: "Chestnut Avenue Resource Center Dumpster Day communications package",
    organization: "Chestnut Avenue Resource Center",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe metadata review of a Chestnut Avenue Resource Center Dumpster Day communications package.",
    publicNote:
      "The protected package contains banner and flier source files, export variants, a distribution photograph, and nearby geospatial reference material.",
    protectedLocatorId: "ARCHIVE-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE",
    supportsGenerally: [
      "a multi-format neighborhood communications package exists",
      "the package includes design source files, exports, a distribution photograph, and geospatial reference material"
    ],
    doesNotEstablish: [
      "Jamie's authorship of a specific artifact",
      "printing or distribution quantities",
      "event attendance or outcomes",
      "permission to publish the files or photograph"
    ],
    media: {
      mediaKind: "document",
      rightsStatus: "unknown",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  },
  {
    id: "SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-PACKAGE-2026",
    title: "Save Jimmy's Corner photo package",
    organization: "NYC Artist Coalition",
    kind: "photo-metadata",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-05-14",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe metadata review of a 2026 Save Jimmy's Corner photo package associated with NYC Artist Coalition.",
    publicNote:
      "A protected folder preserves a dated photographic sequence and associates the package at folder level with Jamie Burkart and NYC Artist Coalition.",
    protectedLocatorId: "ARCHIVE-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-PACKAGE-2026",
    supportsGenerally: [
      "a dated Save Jimmy's Corner photographic package exists",
      "folder-level metadata associates the package with Jamie and NYC Artist Coalition"
    ],
    doesNotEstablish: [
      "the identities or consent of people depicted",
      "the event's complete context or outcome",
      "image-by-image authorship or rights",
      "permission to publish photographs or still images"
    ],
    media: {
      mediaKind: "photograph",
      rightsStatus: "unknown",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  },
  {
    id: "SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
    title: "What is WOW List? members meeting video",
    organization: "WOWList",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2015",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe metadata review of a preserved 2015 WOWList members-meeting video.",
    publicNote:
      "The Shared Drive preserves a members-meeting video artifact. Its content, speaker attribution, participant consent, and relationship to existing transcripts require alignment before claim promotion or media use.",
    protectedLocatorId: "ARCHIVE-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
    supportsGenerally: [
      "a 2015 WOWList members-meeting video artifact is preserved",
      "the artifact is a research lead for product explanation and community operations"
    ],
    doesNotEstablish: [
      "the content or speakers without content-level review",
      "Jamie's role in the meeting",
      "the platform's aggregate user, event, or city metrics",
      "participant consent or media rights",
      "permission to publish the video or stills"
    ],
    media: {
      mediaKind: "other",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  },
  {
    id: "SRC-SBU-BRAND-GUIDE-SEED-2026",
    title: "Small Business United brand-guide seed note",
    organization: "Small Business United",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-02-17",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's Small Business United brand-guide seed note, February 2026.",
    publicNote:
      "The note explicitly credits a collaborator for the identity system and proposes documenting it as teammate-ready guidance for cohesive use and refinement.",
    protectedLocatorId: "ARCHIVE-SBU-BRAND-GUIDE-SEED-2026",
    supportsGenerally: [
      "Jamie created the seed note",
      "the note credits a collaborator for the identity system",
      "the note proposes turning the identity system into teammate-ready guidance",
      "the proposed guide is framed as a shared refinement and consistency tool"
    ],
    doesNotEstablish: [
      "that Jamie created the identity system",
      "that a complete brand guide was delivered",
      "that the note was adopted by the team",
      "permission to publish collaborator identity or internal design material",
      "a measurable campaign or organizational outcome"
    ]
  }
] satisfies SourceRecord[];

export const googleDriveArchiveClaims = [
  {
    id: "CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie authored a 2026 public-interest data brief defining a smallest serious pilot for geography-aggregated commercial vacancy and lease-cost indicators: an indicators table, coverage and suppression table, plain-language methods note, and explicit exclusions for person-level, tax-identifier, parcel-level, unit-level, and uploaded-lease data.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Jamie translated a commercial-data gap into a smallest-serious-pilot brief: geography-aggregated vacancy and lease-cost indicators, a coverage and suppression table, a methods note, and explicit privacy exclusions.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"],
        rationale:
          "Select as concrete evidence that Jamie can turn a civic data question into a bounded implementation proposal while keeping agency adoption and delivery status explicit."
      },
      {
        key: "technical-operations",
        text:
          "Defined a smallest publishable pilot for geography-aggregated commercial vacancy and lease-cost indicators, including methods, coverage, suppression, and privacy requirements.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "Use the implementation-ready deliverables and constraints as compact proof of public-data scoping and risk definition."
      },
      {
        key: "archive-note",
        text:
          "Authored a privacy-preserving public-data proposal that complements storefront reporting with geography-aggregated commercial vacancy and lease-cost indicators.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/fair-rent-nyc"],
        rationale:
          "Retain the complete policy-neutral data-design contribution in the bank even when hiring surfaces use shorter wording."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026",
        relationship: "private-support",
        supports: [
          "Jamie's authorship",
          "the proposed geography-aggregated indicator layer",
          "the three-part pilot deliverable",
          "privacy exclusions",
          "the complementary relationship to existing storefront reporting"
        ],
        locator: "Signed March 2026 brief",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe this as Jamie's proposal, not a government commission, agency commitment, or implemented release.",
      "Do not imply that a city agency adopted, validated, or delivered the proposed dataset.",
      "Keep person-level, tax-identifier, parcel-level, unit-level, and lease-document exclusions explicit when describing the proposal in detail.",
      "No external event listing was recovered in this pass; do not claim formal presentation selection from the brief alone."
    ],
    antiClaims: [
      "Jamie built or released the proposed city dataset.",
      "A city agency commissioned or adopted the proposal.",
      "The proposal produced measured policy or neighborhood outcomes.",
      "The proposal requested confidential filing records for public release."
    ],
    researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive archival review"]
  },
  {
    id: "CLM-FAIR-RENT-WEB-OPERATIONS-2023",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie maintained a collaborative Fair Rent NYC web operations record during a January-February 2023 delivery cycle. The record marks the new site live and tracks site administration, restored email, letterhead, join and call-to-action flows, press, and campaign assets; version history records twelve modifications by Jamie and four by a collaborator.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "A January-February 2023 delivery record shows Jamie maintaining a collaborative FairRentNYC web-operations queue through site launch, restored email, letterhead, join and call-to-action flows, press, and campaign assets.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"],
        rationale:
          "Use a concrete delivery sequence to make Jamie's direct web and campaign-operations contribution legible without assigning him every task or campaign outcome."
      },
      {
        key: "archive-note",
        text:
          "Maintained a co-edited Fair Rent NYC web operations record spanning launch, email continuity, calls to action, press, signup, letterhead, and campaign assets.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/fair-rent-nyc"],
        rationale:
          "Preserve the working delivery model and collective edit history in the bank while public copy stays compressed."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-FAIR-RENT-WEB-OPERATIONS-RECORD-2023",
        relationship: "private-support",
        supports: [
          "Jamie's maintenance of most recorded revisions",
          "collaborator edits",
          "the February 1 live-site milestone",
          "the concrete web, email, content, and campaign-asset queue"
        ],
        locator: "January 20-February 3, 2023 record and revision history",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit the record as collaborative and do not assign every task, page, asset, message, or policy position to Jamie.",
      "Do not expose administration links, meeting details, collaborator notes, or underlying records.",
      "Campaign and policy outcomes remain collective.",
      "This record is direct evidence for one Fair Rent NYC delivery cycle, not the complete history of every NYC Artist Coalition campaign site."
    ],
    antiClaims: [
      "Jamie completed every listed task alone.",
      "Jamie authored every Fair Rent NYC page, message, asset, or policy position.",
      "Jamie solely led Fair Rent NYC or NYC Artist Coalition.",
      "The web operations record is a complete campaign history."
    ],
    researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive archival review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS",
    project: "196-sunday-dinner",
    internalClaim:
      "A protected Sunday Dinner ledger records 345 prefixed event columns from January 2012 through March 2021, materially supporting the public-safe 300-plus gathering scale. A separate Jamie-authored 2023 residency acceptance template defines a repeatable onboarding sequence with a residency window, pre-arrival call, space configuration, and independent access.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "A protected operations ledger records 345 Sunday Dinner event columns from 2012 through 2021. A separate 2023 acceptance template turns artist support into a repeatable onboarding sequence: a defined residency window, a pre-arrival call, space configuration, and independent access.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner"],
        rationale:
          "Give the summary-only page concrete operating evidence without publishing people-level data or the resident's identity."
      },
      {
        key: "technical-operations",
        text:
          "Maintained a ledger with 345 Sunday Dinner event columns and a reusable residency onboarding sequence covering preparation, space configuration, and independent access.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "Translate a broad participation claim into inspectable recurring-operations and onboarding evidence for hiring readers."
      },
      {
        key: "archive-note",
        text:
          "The reviewed archive includes a Sunday Dinner operating ledger with 345 prefixed event columns and a 2023 residency acceptance and onboarding template.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale:
          "Retain the precise artifact basis and date range in the bank while keeping the private rows and resident identity out of the repo."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
        relationship: "private-support",
        supports: [
          "345 prefixed event columns",
          "January 2012 through March 2021 date span",
          "recurring coordination structure",
          "the 300-plus gathering portion of the public-safe aggregate"
        ],
        locator: "Aggregate workbook structure only; person-level rows excluded",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-196-RESIDENCY-ACCEPTANCE-TEMPLATE-2023",
        relationship: "private-support",
        supports: [
          "Jamie's template authorship",
          "defined residency window",
          "pre-arrival orientation",
          "space configuration",
          "independent access"
        ],
        locator: "Public-safe structural review of 2023 template",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not publish person-level rows, names, contact details, notes, preferences, attendance detail, addresses, or access instructions.",
      "The ledger records 345 prefixed event columns; it does not independently prove that every column represents a completed gathering or a distinct sequence number.",
      "The reviewed Shared Drive records do not independently establish the 20-plus resident-artist aggregate.",
      "Do not identify the resident represented in the template without permission.",
      "Do not imply institutional ownership of participant or resident work."
    ],
    antiClaims: [
      "Every numbered event occurred exactly as planned.",
      "The ledger establishes a complete attendance total.",
      "The acceptance template proves 20 or more resident artists.",
      "Jamie owned participants' or residents' work.",
      "The underlying operations records are public."
    ],
    researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive archival review"]
  }
] satisfies ClaimRecord[];

export const googleDriveArchiveInquiries = [
  {
    id: "INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026",
    project: "portfolio-knowledge-bank",
    question:
      "Which Google Drive Shared Drive records can safely mature into professional accomplishment claims, and which should remain research leads?",
    methods: [
      "Inventoried 110 accessible Shared Drive roots without copying Drive identifiers or links into the public repository.",
      "Excluded personal, legal, wedding, bulk-photo, synchronization, and relationship archives before content review.",
      "Selected 15 professional roots across civic systems, public data, cultural infrastructure, technical work, and externally attributable collaboration.",
      "Opened 19 anchor folders and closely read seven high-signal documents or artifacts plus revision metadata where available.",
      "Separated drive inventory, readable folder, closely read record, source proposition, mature claim, and public projection as distinct states.",
      "Recorded every promoted source's negative boundaries and retained unresolved artifacts as inquiries rather than claims."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The commercial-vacancy brief supports a bounded public-data design claim.",
      "The Fair Rent NYC web record supports a bounded 2023 web-operations delivery claim with collective edit history.",
      "The Sunday Dinner ledger and 196 template support concrete recurring-operations and onboarding claims.",
      "A commercial-vacancy map package is preserved, but authorship, methodology, accuracy, context, and display rights remain unresolved.",
      "Chestnut Avenue communications artifacts are preserved, but file presence does not establish Jamie's authorship, distribution scale, or event outcome.",
      "A Save Jimmy's Corner photo package is preserved with folder-level attribution, but image-level authorship, consent, context, and rights remain unresolved.",
      "Sunday Dinner digital-gathering recordings are preserved, but their existence does not establish content, outcomes, participant permission, or gathering totals.",
      "A WOWList members-meeting video is preserved but requires content, speaker, consent, and rights alignment before promotion.",
      "A Small Business United note is a useful design-system lead but does not establish a completed guide.",
      "Several cultural documentation drives preserve photos, animation, and video, but drive titles and media presence do not establish Jamie's role or republication rights.",
      "The direct Shared Drive copy of the Commercial Rent Stabilization running minutes corroborates Jamie's existing source-backed campaign-memory claim and collective edit history."
    ],
    limitations: [
      "This was a bounded professional sample, not an exhaustive review of 110 drives.",
      "Some dated folders were empty or inaccessible even when their Shared Drive root remained visible.",
      "The connector could not verify public sharing status for the reviewed records, so underlying links remain excluded.",
      "Folder and file titles were treated as discovery metadata, not accomplishment evidence.",
      "Media content, participant consent, and rights were not inferred from file presence.",
      "The pass did not reconcile every record against email, source repositories, collaborator testimony, or public coverage."
    ],
    sourceIds: [
      "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
      "SRC-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026",
      "SRC-COMMERCIAL-VACANCY-MAP-PACKAGE-2026",
      "SRC-FAIR-RENT-WEB-OPERATIONS-RECORD-2023",
      "SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
      "SRC-SUNDAY-DINNER-DIGITAL-GATHERING-ARCHIVE",
      "SRC-196-RESIDENCY-ACCEPTANCE-TEMPLATE-2023",
      "SRC-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE",
      "SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-PACKAGE-2026",
      "SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
      "SRC-SBU-BRAND-GUIDE-SEED-2026"
    ],
    publicSummary:
      "A bounded July 2026 Shared Drive review promoted three public-safe professional claims, retained six artifact leads as inquiries, and excluded personal and sensitive archives from research.",
    protectedLocatorId: "RESEARCH-GDRIVE-SHARED-DRIVE-TRIAGE-2026"
  },
  {
    id: "INQ-COMMERCIAL-VACANCY-MAPS-REVIEW",
    project: "fair-rent-nyc",
    question:
      "Who created the commercial-vacancy Council District maps, what methods and source data do they use, and can any image be responsibly published?",
    methods: [
      "Confirmed a three-image map package and its labeled Council District and 2025 Q4 context.",
      "Kept package metadata separate from authorship, accuracy, methodology, presentation, and rights claims.",
      "Deferred visual publication and claim promotion pending artifact-level review."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A three-image Council District business-vacancy map package is preserved.",
      "The package may become useful public-data design evidence after authorship and methods review.",
      "No accomplishment or display claim was promoted from the package title."
    ],
    limitations: [
      "Map authorship and underlying data authorship were not established.",
      "Accuracy, methodology, public use, and agency use were not established.",
      "Publication rights remain unresolved."
    ],
    sourceIds: ["SRC-COMMERCIAL-VACANCY-MAP-PACKAGE-2026"],
    publicSummary:
      "A commercial-vacancy map package remains a methods, authorship, accuracy, and rights inquiry rather than a portfolio artifact.",
    protectedLocatorId: "RESEARCH-COMMERCIAL-VACANCY-MAPS-REVIEW"
  },
  {
    id: "INQ-CHESTNUT-COMMUNICATIONS-AUTHORSHIP",
    project: "kansas-city-neighborhood-operations",
    question:
      "Which Chestnut Avenue Resource Center Dumpster Day communications artifacts did Jamie create or distribute, and what public benefit can be corroborated?",
    methods: [
      "Confirmed a multi-format communications package containing design sources, exports, a distribution photograph, and geospatial reference material.",
      "Kept file custody separate from artifact authorship, distribution, event outcome, and publication permission.",
      "Deferred claim promotion pending artifact metadata and partner corroboration."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A neighborhood communications package is preserved.",
      "The package may help test Jamie's reported pro bono design-studio and print-shop role.",
      "No individual authorship, quantity, or outcome claim was promoted."
    ],
    limitations: [
      "The reviewed metadata does not assign individual artifact authorship.",
      "Printing, distribution, participation, and event outcomes were not established.",
      "Media and source-file rights remain unresolved."
    ],
    sourceIds: ["SRC-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE"],
    publicSummary:
      "A Chestnut Avenue communications package remains an authorship, distribution, outcome, and rights inquiry.",
    protectedLocatorId: "RESEARCH-CHESTNUT-COMMUNICATIONS-AUTHORSHIP"
  },
  {
    id: "INQ-NYCAC-SAVE-JIMMYS-CORNER-MEDIA",
    project: "nyc-artist-coalition",
    question:
      "What event context, image-level authorship, participant consent, and publication rights can be established for the Save Jimmy's Corner photo package?",
    methods: [
      "Confirmed a dated photographic package with folder-level association to Jamie and NYC Artist Coalition.",
      "Did not infer image-level authorship, participant identity, consent, or rights from the folder title.",
      "Deferred photo selection and claim promotion pending contextual and rights review."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A dated Save Jimmy's Corner photo package is preserved.",
      "The package may become a future campaign or public-assembly artifact after review.",
      "No photograph, participant detail, or event-outcome claim was promoted."
    ],
    limitations: [
      "Folder-level association does not resolve image-level authorship.",
      "People depicted and their consent were not established.",
      "Event context, outcomes, and publication rights remain unresolved."
    ],
    sourceIds: ["SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-PACKAGE-2026"],
    publicSummary:
      "A Save Jimmy's Corner photo package remains held pending event-context, authorship, consent, and rights review.",
    protectedLocatorId: "RESEARCH-NYCAC-SAVE-JIMMYS-CORNER-MEDIA"
  },
  {
    id: "INQ-SUNDAY-DINNER-DIGITAL-GATHERING-MEDIA",
    project: "196-sunday-dinner",
    question:
      "What continuity practice, participant permissions, and reusable public evidence can be established from the Sunday Dinner digital-gathering archive?",
    methods: [
      "Confirmed multiple meeting recordings and packaged video exports.",
      "Kept recording volume separate from gathering count, content, outcome, consent, and publication permission.",
      "Deferred transcription, participant identification, and media selection."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A digital-gathering archive is preserved.",
      "The archive may help document continuity practice after participant-safe content review.",
      "No meeting-content, participant, outcome, count, or media claim was promoted."
    ],
    limitations: [
      "The recordings were not transcribed or content-reviewed in this pass.",
      "Participant identity and consent remain protected and unresolved.",
      "Recording counts cannot be used as gathering counts."
    ],
    sourceIds: ["SRC-SUNDAY-DINNER-DIGITAL-GATHERING-ARCHIVE"],
    publicSummary:
      "A Sunday Dinner digital-gathering archive remains held pending content, participant-permission, and media-rights review.",
    protectedLocatorId: "RESEARCH-SUNDAY-DINNER-DIGITAL-GATHERING-MEDIA"
  },
  {
    id: "INQ-WOWLIST-MEMBERS-MEETING-REVIEW",
    project: "wowlist",
    question:
      "What content, speaker attribution, product-operation evidence, consent state, and media rights can be established for the preserved 2015 WOWList members-meeting video?",
    methods: [
      "Confirmed the video artifact and its 2015 title in the WOWList Shared Drive.",
      "Kept metadata presence separate from content-level claims.",
      "Deferred transcription alignment, speaker attribution, consent review, and media-rights review."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A members-meeting video artifact is preserved.",
      "The artifact may provide direct product-explanation and community-operations evidence after review.",
      "No content-level accomplishment claim was promoted from the title alone."
    ],
    limitations: [
      "The video was not transcribed or aligned to an existing transcript in this pass.",
      "Speaker identity and Jamie's role were not established from metadata.",
      "Participant consent and republication rights remain unknown."
    ],
    sourceIds: ["SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015"],
    publicSummary:
      "A 2015 WOWList members-meeting video is preserved as a research lead; no content-level claim or media use is approved.",
    protectedLocatorId: "RESEARCH-WOWLIST-MEMBERS-MEETING-VIDEO-2015"
  },
  {
    id: "INQ-SBU-BRAND-GUIDE-COMPLETION",
    project: "fair-rent-nyc",
    question:
      "Did the Small Business United brand-guide seed become a completed, adopted teammate system, and what was Jamie's implementation role?",
    methods: [
      "Read the seed note and reviewed its revision attribution.",
      "Preserved the note's explicit collaborator credit.",
      "Searched the reviewed Shared Drive root for a completed guide before deciding not to promote an accomplishment claim."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie created a seed note proposing teammate-ready documentation of an existing identity system.",
      "The note credits the identity-system creator rather than assigning that work to Jamie.",
      "No completed brand guide was recovered in the reviewed root."
    ],
    limitations: [
      "The reviewed root may not contain every later design artifact.",
      "No collaborator confirmation or public project record was reviewed.",
      "The note alone does not establish completion, adoption, or outcome."
    ],
    sourceIds: ["SRC-SBU-BRAND-GUIDE-SEED-2026"],
    publicSummary:
      "A brand-guide seed note remains a credited design-systems research lead, not a completed accomplishment claim.",
    protectedLocatorId: "RESEARCH-SBU-BRAND-GUIDE-COMPLETION"
  }
] satisfies ResearchInquiry[];

export const googleDriveArchiveIntake = [
  {
    id: "INT-GDRIVE-SHARED-DRIVE-TRIAGE-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Google Drive Shared Drive archival-production pass",
    description:
      "A bounded review inventoried the accessible Shared Drive corpus, excluded sensitive archive classes, and selected a professional sample for close reading.",
    whyItMatters:
      "Creates a repeatable bridge from collaborative working archives to defensible claims without treating access as permission or folder titles as evidence.",
    projectIds: ["portfolio-knowledge-bank"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Recorded the selection method, promoted only qualified sources, and kept the corpus-level review open rather than implying exhaustive coverage.",
    sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026"],
    inquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    artifactPaths: [
      "docs/knowledge-bank/projects/google-drive-archive-production.md"
    ],
    boundaries: [
      "Do not publish Drive identifiers, links, person-level data, raw documents, media, or access details.",
      "Do not research personal, legal, wedding, bulk-photo, synchronization, or relationship archives merely because they are accessible.",
      "Treat inventory, readability, close reading, source qualification, claim maturity, and public projection as separate decisions."
    ]
  },
  {
    id: "INT-GDRIVE-PROTECTED-MEDIA-LEADS-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "photo-lead",
    visibility: "protected-summary",
    title: "Protected maps, communications, photographs, and gathering recordings",
    description:
      "Shared Drive review preserved four bounded leads: commercial-vacancy maps, Chestnut Avenue communications, Save Jimmy's Corner photographs, and Sunday Dinner digital-gathering recordings.",
    whyItMatters:
      "Keeps potentially useful visual and operating evidence discoverable while requiring authorship, methodology, context, consent, rights, and impact review before claim or media promotion.",
    projectIds: [
      "fair-rent-nyc",
      "kansas-city-neighborhood-operations",
      "nyc-artist-coalition",
      "196-sunday-dinner"
    ],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Opened four project-specific inquiries; no accomplishment claim, image, recording, or public-site projection was created.",
    sourceIds: [
      "SRC-COMMERCIAL-VACANCY-MAP-PACKAGE-2026",
      "SRC-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE",
      "SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-PACKAGE-2026",
      "SRC-SUNDAY-DINNER-DIGITAL-GATHERING-ARCHIVE"
    ],
    inquiryIds: [
      "INQ-COMMERCIAL-VACANCY-MAPS-REVIEW",
      "INQ-CHESTNUT-COMMUNICATIONS-AUTHORSHIP",
      "INQ-NYCAC-SAVE-JIMMYS-CORNER-MEDIA",
      "INQ-SUNDAY-DINNER-DIGITAL-GATHERING-MEDIA"
    ],
    boundaries: [
      "Do not infer authorship, accuracy, context, consent, rights, scale, or impact from folder titles or file presence.",
      "Do not publish the underlying maps, source files, photographs, recordings, transcripts, stills, or participant details.",
      "Treat each artifact family as a separate research and publication decision."
    ]
  },
  {
    id: "INT-GDRIVE-COMMERCIAL-VACANCY-BRIEF-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Commercial vacancy public-baseline brief",
    description:
      "Close reading recovered Jamie's bounded design for a privacy-preserving, geography-aggregated vacancy and lease-cost data pilot.",
    whyItMatters:
      "Adds concrete evidence of public-data scoping, minimum viable release design, methods definition, suppression planning, and privacy risk management.",
    projectIds: ["fair-rent-nyc", "commercial-vacancy"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured a proposal-level claim and projected it to the Fair Rent NYC case study and Technical Operations page without implying agency adoption or implementation.",
    sourceIds: ["SRC-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026"],
    claimIds: ["CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026"],
    inquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    boundaries: [
      "Describe a proposal, not an adopted or delivered city dataset.",
      "Keep privacy exclusions explicit.",
      "Do not claim formal event selection without an external listing."
    ]
  },
  {
    id: "INT-GDRIVE-FAIR-RENT-WEB-OPERATIONS-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Fair Rent NYC web operations record",
    description:
      "A co-edited 2023 record and its revision history document a concrete website, email, campaign-asset, and call-to-action delivery cycle.",
    whyItMatters:
      "Makes Jamie's web implementation and campaign-operations contribution specific while preserving collaborator edits and collective outcomes.",
    projectIds: ["fair-rent-nyc", "nyc-artist-coalition"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured a bounded Fair Rent NYC web-operations claim; retained broader multi-site authorship as careful proof rather than overextending one record.",
    sourceIds: ["SRC-FAIR-RENT-WEB-OPERATIONS-RECORD-2023"],
    claimIds: ["CLM-FAIR-RENT-WEB-OPERATIONS-2023"],
    inquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    boundaries: [
      "Credit collaborator edits and collective campaign outcomes.",
      "Do not expose administration links or underlying working notes.",
      "Do not assign every listed task, page, asset, message, or policy position to Jamie."
    ]
  },
  {
    id: "INT-GDRIVE-SUNDAY-DINNER-196-OPERATIONS-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Sunday Dinner and 196 operating records",
    description:
      "Structural review of a ledger with 345 prefixed event columns and a 2023 residency acceptance template strengthened the recurring-operations and onboarding evidence behind the public summary.",
    whyItMatters:
      "Turns a broad participation claim into concrete evidence of scale, preparation, space configuration, access, and continuity without exposing people-level records.",
    projectIds: ["196-sunday-dinner"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured a bounded operating-records claim; the 20-plus resident-artist aggregate remains careful because these sources do not independently establish it.",
    sourceIds: [
      "SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021",
      "SRC-196-RESIDENCY-ACCEPTANCE-TEMPLATE-2023"
    ],
    claimIds: ["CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS"],
    inquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"],
    boundaries: [
      "Do not publish people-level rows, contact details, notes, preferences, attendance detail, addresses, access instructions, or resident identity.",
      "Do not treat an event column as independent proof that every gathering occurred exactly as planned.",
      "Do not treat the 345 prefixed columns as 345 distinct sequence numbers, unique people, audited attendance, or meals served.",
      "Do not claim that these records independently prove the 20-plus resident-artist aggregate."
    ]
  },
  {
    id: "INT-GDRIVE-WOWLIST-MEMBERS-MEETING-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "WOWList members-meeting video lead",
    description:
      "A 2015 members-meeting video artifact was recovered as a possible product-explanation and community-operations source.",
    whyItMatters:
      "Could provide direct evidence of how Jamie explained the platform and supported organizers after content, attribution, consent, and rights review.",
    projectIds: ["wowlist"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Recorded the artifact but promoted no claim or media because title-level metadata does not establish content, Jamie's role, consent, or rights.",
    sourceIds: ["SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015"],
    inquiryIds: ["INQ-WOWLIST-MEMBERS-MEETING-REVIEW"],
    boundaries: [
      "Do not publish the video or stills before consent and rights review.",
      "Do not infer speakers, content, or Jamie's role from the title alone.",
      "Align any future transcription with the existing WOWList source corpus before claim promotion."
    ]
  },
  {
    id: "INT-GDRIVE-SBU-BRAND-GUIDE-SEED-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Small Business United brand-guide seed",
    description:
      "A Jamie-authored seed note proposes turning a collaborator-created identity system into teammate-ready guidelines.",
    whyItMatters:
      "Shows a promising design-systems and handoff pattern while preserving collaborator credit and refusing to call an early note a completed deliverable.",
    projectIds: ["fair-rent-nyc", "small-business-united"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Opened completion and adoption research; no accomplishment claim or public-site projection was created.",
    sourceIds: ["SRC-SBU-BRAND-GUIDE-SEED-2026"],
    inquiryIds: ["INQ-SBU-BRAND-GUIDE-COMPLETION"],
    boundaries: [
      "Preserve collaborator credit for the identity system.",
      "Do not describe the guide as completed or adopted without a recovered deliverable or collaborator confirmation.",
      "Do not publish collaborator identity or internal design material from the protected source."
    ]
  }
] satisfies IntakeRecordInput[];
