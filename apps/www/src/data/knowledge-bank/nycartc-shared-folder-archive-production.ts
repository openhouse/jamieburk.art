import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycArtcSharedFolderIntakes = [
  {
    id: "INT-2026-07-19-NYCARTC-SHARED-FOLDER-CENSUS",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A complete, governed census of the NYC Artist Coalition shared folder's accessible descendant population.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-2021", "2026-07-19"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026"],
    claimIds: ["CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026"],
    inquiryIds: [
      "INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP",
      "INQ-NYCARTC-SHARED-FOLDER-RIGHTS"
    ],
    protectedLocatorId: "NACSF-16D0B59772B9D388"
  },
  {
    id: "INT-2026-07-19-NYCARTC-PUBLIC-MEETING-PLAYBOOK",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A protected coalition playbook for preparing public meetings across outreach, testimony, web, print, press, social media, video, and day-of follow-through.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2018"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018"],
    claimIds: ["CLM-NYCARTC-PUBLIC-MEETING-OPERATING-SYSTEM"],
    inquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    protectedLocatorId: "NACSF-A159AEC23A7F9D48"
  },
  {
    id: "INT-2026-07-19-NYCARTC-TESTIMONY-GUIDE",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A protected coalition guide that helped participants prepare short first-person Cabaret Law testimony and offered an alternate submission path.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition", "nyc-cabaret-law"],
    dateHints: ["2017"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017"],
    claimIds: ["CLM-NYCARTC-TESTIMONY-PARTICIPATION-DESIGN"],
    inquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    protectedLocatorId: "NACSF-A79A52F859953768"
  },
  {
    id: "INT-2026-07-19-NYCARTC-JAMIE-CABARET-TESTIMONY",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "Protected June and September 2017 testimony drafts naming Jamie as the witness and connecting Cabaret Law repeal with practical fire-safety work and public trust.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition", "nyc-cabaret-law"],
    dateHints: ["2017-06-19", "2017-09-14"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-JAMIE-CABARET-TESTIMONY-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-LAW-ADVOCACY"],
    inquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"],
    protectedLocatorId: "NACSF-C7CBA078940874A1"
  },
  {
    id: "INT-2026-07-19-NYCARTC-NIGHTLIFE-RECOMMENDATIONS",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A protected sequence of coalition recommendations, letters, testimony, and implementation-priority notes concerning cultural-space safety and the Office of Nightlife.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition", "nyc-office-of-nightlife"],
    dateHints: ["2017-01", "2019-03"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019"],
    claimIds: ["CLM-NYCARTC-NIGHTLIFE-RECOMMENDATION-CONTINUITY"],
    inquiryIds: [
      "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
      "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"
    ],
    protectedLocatorId: "NACSF-48554BB43E6DDA85"
  },
  {
    id: "INT-2026-07-19-NYCARTC-JAMIE-NIGHTLIFE-SPEECH",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A protected final speech script naming Jamie and Olympia Kazi as coalition speakers and articulating priorities for small cultural spaces and the Office of Nightlife.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition", "nyc-office-of-nightlife"],
    dateHints: ["2017-10"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-JAMIE-NIGHTLIFE-SPEECH-2017"],
    claimIds: ["CLM-NYCARTC-NIGHTLIFE-SPEECH-SCRIPT"],
    inquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    protectedLocatorId: "NACSF-32D4162B192DA510"
  },
  {
    id: "INT-2026-07-19-NYCARTC-MARCH-CAMPAIGN-GUIDES",
    kind: "artifact",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "Protected 2018-2019 Talks Not Raids production guides connecting hearings, partner outreach, public testimony, campaign sites, calls to action, live coverage, and post-event documentation.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2018-10-17", "2019-02-11"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019"],
    claimIds: ["CLM-NYCARTC-MARCH-CROSS-CHANNEL-IMPLEMENTATION"],
    inquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    protectedLocatorId: "NACSF-AFA8B4C724D08551"
  },
  {
    id: "INT-2026-07-19-NYCARTC-MARCH-DATA-DESIGN",
    kind: "lead",
    capturedAt: "2026-07-19",
    submittedBy: "Codex authenticated Google Drive archival production",
    publicSafeDescription: "A protected collaborative MARCH working document containing an open-data reporting and preventive-alert design lead alongside explicit concerns about selective or culturally biased alerting.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2019"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019"],
    claimIds: ["CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD"],
    inquiryIds: ["INQ-NYCARTC-MARCH-DATA-DESIGN-AUTHORSHIP"],
    protectedLocatorId: "NACSF-3B17D4C9B5DC35A1"
  }
] satisfies IntakeItem[];

export const nycArtcSharedFolderSources = [
  {
    id: "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026",
    title: "NYC Artist Coalition shared-folder governed census",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Authenticated recursive census of the NYC Artist Coalition shared folder, completed July 19, 2026.",
    publicNote: "The census accounts for 2,192 reachable descendants: 257 nested folders and 1,935 files. Every item received a sensitivity class and primary disposition in a protected manifest outside git.",
    locator: "Redacted aggregate census; exact Drive identifiers, paths, titles, and dispositions remain in the protected manifest.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-SHARED-FOLDER-CENSUS"],
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "2,192-descendant population closure",
      "257 nested folders and 1,935 files",
      "18 empty folders and no unresolved traversal errors",
      "one primary disposition for every descendant",
      "a protected close-reading, rights, and format-processing queue"
    ],
    doesNotEstablish: [
      "authorship from Drive ownership or modification metadata",
      "permission to publish underlying files",
      "content-level review of every file",
      "a complete history of deleted, unshared, or externally linked materials"
    ],
    protectedLocatorId: "NACSF-16D0B59772B9D388"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018",
    title: "NYC Artist Coalition public-meeting production playbook",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected NYC Artist Coalition public-meeting production playbook, reviewed July 19, 2026.",
    publicNote: "The playbook lays out a three-week sequence across partner, participant, elected-official, press, web, print, testimony, social, video, and day-of work.",
    locator: "Public-safe source synopsis only; raw workflow and private source coordinates remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-PUBLIC-MEETING-PLAYBOOK"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "three-week public-meeting preparation sequence",
      "partner and elected-official outreach",
      "testimony, print, web, press, social, and video coordination",
      "day-before and day-of follow-through"
    ],
    doesNotEstablish: [
      "Jamie as sole or original author",
      "completion of every listed task for every event",
      "individual task ownership",
      "attendance or policy impact"
    ],
    protectedLocatorId: "NACSF-A159AEC23A7F9D48"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017",
    title: "NYC Artist Coalition Cabaret Law testimony guide",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected NYC Artist Coalition testimony-preparation guide, reviewed July 19, 2026.",
    publicNote: "The guide helps participants prepare two-minute first-person testimony and offers email submission for people unable to testify in person.",
    locator: "Public-safe source synopsis only; raw document and contact details remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-TESTIMONY-GUIDE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "two-minute testimony preparation",
      "first-person story prompts",
      "an alternate submission route",
      "translation of campaign research into participant guidance"
    ],
    doesNotEstablish: [
      "Jamie as sole or original author",
      "the identity or number of participants who used the guide",
      "that every submitted testimony was read",
      "legislative causality"
    ],
    protectedLocatorId: "NACSF-A79A52F859953768"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-JAMIE-CABARET-TESTIMONY-2017",
    title: "Jamie Burkart Cabaret Law testimony drafts",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected June and September 2017 Cabaret Law testimony drafts naming Jamie Burkart as the witness, reviewed July 19, 2026.",
    publicNote: "The drafts connect Jamie's repeal advocacy with fire-safety walkthroughs, workshops, study groups, and the need for trust between cultural spaces and city agencies.",
    locator: "Public-safe source synopsis only; raw drafts remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-JAMIE-CABARET-TESTIMONY"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "Jamie's prepared City Council testimony",
      "fire-safety walkthroughs, workshops, and study groups",
      "Jamie's safety-and-trust argument for repeal",
      "NYC Artist Coalition affiliation"
    ],
    doesNotEstablish: [
      "that every draft sentence was delivered verbatim",
      "independent verification of the draft's pass-rate or license counts",
      "sole credit for safety work or repeal",
      "legislative causality"
    ],
    protectedLocatorId: "NACSF-C7CBA078940874A1"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019",
    title: "NYC Artist Coalition nightlife recommendation working sequence",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected NYC Artist Coalition recommendation, letter, testimony, and workshop-priority sequence from 2017-2019, reviewed July 19, 2026.",
    publicNote: "The sequence repeatedly translates cultural-space experience into implementable agency proposals concerning confidential support, regulatory navigation, MARCH transparency, affordability, and displacement.",
    locator: "Public-safe multi-document synopsis only; raw drafts, comments, and source coordinates remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-NIGHTLIFE-RECOMMENDATIONS"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "recommendation continuity from 2017 through 2019",
      "confidential cultural liaison or caseworker proposals",
      "MARCH transparency and regulatory-navigation proposals",
      "affordability, lease, zoning, and displacement proposals",
      "prioritization by what the Office of Nightlife could implement"
    ],
    doesNotEstablish: [
      "Jamie as author of every recommendation",
      "adoption of every proposal",
      "that every draft was delivered or published",
      "sole coalition or individual causality for institutional outcomes"
    ],
    protectedLocatorId: "NACSF-48554BB43E6DDA85"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-JAMIE-NIGHTLIFE-SPEECH-2017",
    title: "Final nightlife speech script naming Jamie Burkart and Olympia Kazi",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected final NYC Artist Coalition nightlife speech script naming Jamie Burkart and Olympia Kazi, reviewed July 19, 2026.",
    publicNote: "The script frames small cultural spaces as civic infrastructure and presents coalition priorities around safety, trust, support access, MARCH transparency, and displacement.",
    locator: "Public-safe source synopsis only; the raw script remains outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-JAMIE-NIGHTLIFE-SPEECH"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "a final script prepared for Jamie and Olympia",
      "NYC Artist Coalition speaker identification",
      "small-cultural-space framing",
      "coalition Office of Nightlife priorities"
    ],
    doesNotEstablish: [
      "the division of writing labor",
      "verbatim delivery",
      "the exact event without corroboration",
      "attendance, reception, or policy causality"
    ],
    protectedLocatorId: "NACSF-32D4162B192DA510"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019",
    title: "Talks Not Raids cross-channel campaign production guides",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected Talks Not Raids production guides from 2018-2019, reviewed July 19, 2026.",
    publicNote: "The guides connect partner outreach, Council hearings, testimony, campaign websites, calls to action, social and text messaging, live coverage, photography, and post-event source links.",
    locator: "Public-safe source synopsis only; raw guides, working quotations, and task notes remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-MARCH-CAMPAIGN-GUIDES"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "cross-channel campaign production",
      "partner and elected-official routing",
      "hearing and testimony mobilization",
      "live and post-event documentation",
      "reuse of a shared coalition identity across contributors"
    ],
    doesNotEstablish: [
      "Jamie's authorship of every message or task",
      "delivery of every planned post",
      "consent to republish working quotations or photographs",
      "audience reach, attendance, or legislative causality"
    ],
    protectedLocatorId: "NACSF-AFA8B4C724D08551"
  },
  {
    id: "SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019",
    title: "Collaborative MARCH open-data and preventive-alert design notes",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-19",
    publicCitation: "Protected collaborative MARCH data-design notes, reviewed July 19, 2026.",
    publicNote: "The working notes explore machine-readable reporting fields, links to frequently updated open data, possible preventive alerts, and the risk of selective or culturally biased alerting. A visible suggestion attributes to Jamie a narrow question about existing FOIL data and possible reporting legislation.",
    locator: "Public-safe source synopsis only; raw collaborative notes remain outside the repository.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-19-NYCARTC-MARCH-DATA-DESIGN"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated Google Docs close reading"],
    supportsGenerally: [
      "a campaign-adjacent open-data design exploration",
      "a visible Jamie-authored suggestion connecting existing FOIL data to possible reporting legislation",
      "machine-readable legislative reporting requirements",
      "mapping reported fields to frequently updated public data",
      "explicit ethical concern about selective or culturally biased alerts"
    ],
    doesNotEstablish: [
      "Jamie's authorship of the full design",
      "implementation of a predictive system",
      "accuracy or safety of a predictive model",
      "verification of campaign statistics in the same working document"
    ],
    protectedLocatorId: "NACSF-3B17D4C9B5DC35A1"
  }
] satisfies SourceRecord[];

export const nycArtcSharedFolderClaims = [
  {
    id: "CLM-NYCARTC-SHARED-FOLDER-CENSUS-2026",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim: "The July 2026 authenticated census accounts for 2,192 reachable NYC Artist Coalition shared-folder descendants: 257 nested folders and 1,935 files, each with one protected primary disposition.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026",
        relationship: "private-support",
        supports: ["population closure", "folder and file counts", "disposition coverage"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The census covers descendants reachable by Jamie's authorized account at the snapshot time; it excludes deleted, unshared, and externally held materials.",
      "Metadata review and disposition do not mean content, authorship, rights, or public-use review."
    ],
    antiClaims: [
      "All 2,192 descendants are public evidence or approved portfolio material.",
      "Every file body was close-read.",
      "Drive metadata proves authorship."
    ],
    researchInquiryIds: [
      "INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP",
      "INQ-NYCARTC-SHARED-FOLDER-RIGHTS"
    ],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-PUBLIC-MEETING-OPERATING-SYSTEM",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A surviving coalition playbook defines public meetings as a three-week operating system spanning partner, participant, elected-official, testimony, press, web, print, social, video, and day-of workflows.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [
      {
        key: "archive-note",
        text: "A surviving coalition playbook connects public meetings to three weeks of partner and elected-official outreach, testimony support, web and print production, press, social media, video, and day-of follow-through.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018",
        relationship: "private-support",
        supports: ["workflow stages", "channels", "timing", "day-of follow-through"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
        relationship: "corroborating",
        supports: ["recurring public event practice", "campaign and public-institution interfaces"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The playbook establishes a collective operating design, not Jamie's authorship or responsibility for every task.",
      "The event corpus corroborates public execution patterns but does not prove every playbook step occurred for every event."
    ],
    antiClaims: [
      "Jamie alone designed or executed every coalition public meeting.",
      "Every listed workflow occurred for every event.",
      "The playbook proves attendance or policy impact."
    ],
    researchInquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-TESTIMONY-PARTICIPATION-DESIGN",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "NYC Artist Coalition created a Cabaret Law testimony guide that helped participants translate lived experience into two-minute Council testimony and offered an email route for people unable to appear in person.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [
      {
        key: "archive-note",
        text: "The coalition paired hearing mobilization with a testimony guide that helped participants prepare short first-person accounts and offered an alternate submission path.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017",
        relationship: "private-support",
        supports: ["two-minute format", "first-person prompts", "alternate submission route"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-EVENT-790581997948463",
        relationship: "corroborating",
        supports: ["public-hearing participation pathway", "participant story invitation"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source establishes the guide and participation route, not its author, adoption rate, or the disposition of every submitted testimony."
    ],
    antiClaims: [
      "Jamie alone authored the guide.",
      "Every participant used the guide or every submitted account was read into the record.",
      "The guide caused repeal."
    ],
    researchInquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-NIGHTLIFE-RECOMMENDATION-CONTINUITY",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A protected 2017-2019 working sequence documents NYC Artist Coalition repeatedly translating cultural-space experience into agency-facing recommendations and prioritizing asks by what the Office of Nightlife could implement.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [
      {
        key: "archive-note",
        text: "From 2017 through 2019, coalition records repeatedly translate cultural-space experience into concrete agency proposals and prioritize asks by what the Office of Nightlife could implement.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019",
        relationship: "private-support",
        supports: ["recommendation continuity", "implementation-oriented prioritization", "agency-facing translation"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
        relationship: "corroborating",
        supports: ["DCLA's public account of DIY-community recommendations and continued engagement"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
        relationship: "corroborating",
        supports: ["public coalition recommendation surface", "Office of Nightlife framing"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Recommendation continuity does not establish adoption, authorship of every proposal, or sole causality for the Office's policies.",
      "Collective records support a coalition claim; Jamie's exact contribution remains bounded by separate evidence."
    ],
    antiClaims: [
      "Jamie authored every coalition recommendation.",
      "DCLA or the Office of Nightlife adopted every coalition proposal.",
      "NYC Artist Coalition alone created the Office of Nightlife."
    ],
    researchInquiryIds: [
      "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
      "INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"
    ],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-NIGHTLIFE-SPEECH-SCRIPT",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A final 2017 coalition speech script names Jamie Burkart and Olympia Kazi as speakers presenting small-cultural-space priorities for the emerging Office of Nightlife.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-JAMIE-NIGHTLIFE-SPEECH-2017",
        relationship: "private-support",
        supports: ["speaker names", "prepared address", "coalition priorities"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        relationship: "corroborating",
        supports: ["Market Hotel town hall", "coalition and public-institution context"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The script does not establish who wrote each passage, whether it was delivered verbatim, or the exact event without further corroboration."
    ],
    antiClaims: [
      "Jamie solely wrote or delivered the full script.",
      "The script alone proves the event date, attendance, reception, or policy effect."
    ],
    researchInquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-MARCH-CROSS-CHANNEL-IMPLEMENTATION",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Protected Talks Not Raids guides document a cross-channel implementation system connecting partners, Council hearings, testimony, campaign sites, calls to action, social and text messaging, live coverage, photography, and post-event sources.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [
      {
        key: "archive-note",
        text: "Talks Not Raids production guides connect partner outreach, Council hearings, testimony, campaign sites, calls to action, live coverage, photography, and post-event documentation.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019",
        relationship: "private-support",
        supports: ["channel plan", "partner routing", "hearing mobilization", "documentation workflow"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
        relationship: "corroborating",
        supports: ["public issue explainer", "Council-support tracker", "call script", "coalition credits"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The guides show collective campaign infrastructure, not authorship or delivery of every message and task.",
      "Planned coverage and outreach do not establish reach, attendance, or legislative causality."
    ],
    antiClaims: [
      "Jamie authored every Talks Not Raids message or operated every channel.",
      "Every planned post, photograph, or outreach task was completed.",
      "The production guide alone caused passage of Intro 1156."
    ],
    researchInquiryIds: ["INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-MARCH-DATA-DESIGN-LEAD",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A collaborative MARCH working document preserves an open-data design lead: require machine-readable reporting that maps to frequently updated public datasets, explore preventive alerts, and address selective or culturally biased alerting risk.",
    status: "inference",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019",
        relationship: "private-support",
        supports: ["data-design concept", "Jamie's narrow FOIL and reporting-legislation intervention", "legislative reporting requirements", "ethical risk recognition"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "A visible February 1, 2019 suggestion attributes a narrow FOIL and reporting-legislation intervention to Jamie, but the collaborative notes do not allocate the complete data-design passage to him.",
      "No predictive system is known to have been implemented."
    ],
    antiClaims: [
      "Jamie independently designed or shipped a MARCH prediction product.",
      "The proposed alert system was validated, safe, or used by venues.",
      "The working document's campaign statistics are independently verified."
    ],
    researchInquiryIds: ["INQ-NYCARTC-MARCH-DATA-DESIGN-AUTHORSHIP"],
    reviewedAt: "2026-07-19",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const nycArtcSharedFolderResearchInquiries = [
  {
    id: "INQ-NYCARTC-SHARED-FOLDER-AUTHORSHIP",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-19-NYCARTC-SHARED-FOLDER-CENSUS",
      "INT-2026-07-19-NYCARTC-PUBLIC-MEETING-PLAYBOOK",
      "INT-2026-07-19-NYCARTC-TESTIMONY-GUIDE",
      "INT-2026-07-19-NYCARTC-NIGHTLIFE-RECOMMENDATIONS",
      "INT-2026-07-19-NYCARTC-MARCH-CAMPAIGN-GUIDES"
    ],
    question: "Which coalition playbooks, guides, recommendation records, and campaign assets can be attributed to Jamie, collaborators, or shared authorship at an artifact-specific level?",
    methods: [
      "Completed an authenticated recursive metadata census and selected lower-risk, high-value documents for close reading.",
      "Separated Drive ownership and last-modifier metadata from authorship, implementation, coordination, maintenance, and approval roles.",
      "Queued revision-history review and collaborator proof notes as later, separately governed research."
    ],
    runAt: "2026-07-19",
    resultStatus: "partially-recovered",
    findings: [
      "Named Jamie testimony drafts directly support his witness role and prepared arguments.",
      "The wider playbooks and guides establish collective operating systems but do not allocate original authorship from current metadata.",
      "Task initials in working guides are useful leads, not conclusive role proof."
    ],
    limitations: [
      "Revision histories were outside the first-pass snapshot scope.",
      "Last-modifier and ownership labels do not prove original authorship or complete labor credit.",
      "Collaborator review remains necessary for consequential role allocation."
    ],
    sourceIds: [
      "SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026",
      "SRC-NYCARTC-ARCHIVE-PUBLIC-MEETING-PLAYBOOK-2018",
      "SRC-NYCARTC-ARCHIVE-TESTIMONY-GUIDE-2017",
      "SRC-NYCARTC-ARCHIVE-JAMIE-CABARET-TESTIMONY-2017",
      "SRC-NYCARTC-ARCHIVE-NIGHTLIFE-RECOMMENDATION-SEQUENCE-2017-2019",
      "SRC-NYCARTC-ARCHIVE-MARCH-CAMPAIGN-GUIDES-2018-2019"
    ],
    publicSummary: "The archive confirms collective operating systems and Jamie-specific testimony while leaving artifact-level authorship open where Drive metadata is insufficient.",
    protectedLocatorId: "NACSF-16D0B59772B9D388"
  },
  {
    id: "INQ-NYCARTC-MARCH-DATA-DESIGN-AUTHORSHIP",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-19-NYCARTC-MARCH-DATA-DESIGN"],
    question: "Can revision history or collaborator review attribute the MARCH open-data reporting and preventive-alert design passage to Jamie, and can its factual inputs be independently verified?",
    methods: [
      "Close-read the protected collaborative working document and re-opened it in the native Google Docs interface on July 19, 2026.",
      "Separated the design concept from adjacent campaign statistics and from implementation claims.",
      "Distinguished visible suggestion attribution from a complete revision-history analysis.",
      "Recorded full revision-history and collaborator review as the next attribution step."
    ],
    runAt: "2026-07-19",
    resultStatus: "partially-recovered",
    findings: [
      "The notes propose machine-readable reporting fields mapped to frequently updated open datasets.",
      "The notes consider preventive alerts and explicitly identify selective or culturally biased alerting as a risk.",
      "The native document visibly attributes to Jamie a February 1, 2019 suggestion asking whether existing FOIL data could support the proposed work and what a reporting bill would need to provide.",
      "That suggestion supports a narrow contribution, but the current pass cannot allocate the complete design passage."
    ],
    limitations: [
      "The full revision sequence was not reviewed beyond visible current suggestion metadata.",
      "No implementation artifact or validation record was recovered.",
      "Adjacent campaign statistics require independent source verification."
    ],
    sourceIds: ["SRC-NYCARTC-ARCHIVE-MARCH-DATA-DESIGN-NOTES-2019"],
    publicSummary: "A technically significant MARCH data-design lead was recovered, but individual authorship and factual inputs remain open.",
    protectedLocatorId: "NACSF-3B17D4C9B5DC35A1"
  },
  {
    id: "INQ-NYCARTC-SHARED-FOLDER-RIGHTS",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-19-NYCARTC-SHARED-FOLDER-CENSUS"],
    question: "Which visual, audiovisual, and layered production assets have sufficient creator credit, subject consent, licensing, and public-use permission for portfolio or application use?",
    methods: [
      "Classified every reachable descendant and routed visual, audiovisual, and layered design assets to a protected rights queue.",
      "Kept proprietary fonts, participant media, working graphics, and raw source files outside git.",
      "Separated evidentiary usefulness from publication permission."
    ],
    runAt: "2026-07-19",
    resultStatus: "partially-recovered",
    findings: [
      "The census routed 1,413 media or layered-production descendants to rights, consent, attribution, or Jamie review.",
      "The archive contains substantial visual evidence potential across campaigns and events.",
      "No queued asset was treated as public merely because Jamie could access it."
    ],
    limitations: [
      "Creator, subject, rights-holder, consent, and license review remain incomplete.",
      "File counts are asset counts, not unique events, people, or public-use approvals.",
      "The public repository contains no private media or protected coordinates."
    ],
    sourceIds: ["SRC-NYCARTC-SHARED-FOLDER-CENSUS-2026"],
    publicSummary: "The archive contains a large visual-production record, but publication remains blocked pending item-level rights and consent review.",
    protectedLocatorId: "NACSF-16D0B59772B9D388"
  }
] satisfies ResearchInquiry[];
