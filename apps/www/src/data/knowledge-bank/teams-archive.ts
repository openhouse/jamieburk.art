import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const crsOperatingClaimId = "CLM-CRS-COALITION-OPERATING-SYSTEM";
const crsDataClaimId = "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN";
const raftClaimId = "CLM-WATERWAYS-RAFT-EXPEDITION-SCALE";
const wikipediaClaimId = "CLM-NYCAC-ARCHIVAL-PUBLICATION-WORKFLOW";
const discoveryClaimId = "CLM-SOURCE-BACKED-MEMORY-DISCOVERY-PROCESS";

export const teamsArchiveCaptures = [
  {
    id: "CAP-TEAMS-CRS-OPERATING-SYSTEM-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Commercial Rent Stabilization working records documenting a six-part coalition operating plan and a consent-aware shared memory system.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: [
      "coalition operating system",
      "shared campaign memory",
      "consent-aware documentation",
    ],
    sourceIds: [
      "SRC-CRS-90-DAY-ACTION-PLAN-2026",
      "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    ],
    observationIds: [
      "OBS-CRS-PLAN-SHARED-PUBLIC-GOODS",
      "OBS-CRS-PLAN-ROLE-BOUNDARIES",
      "OBS-CRS-MINUTES-MEMORY-STRUCTURE",
      "OBS-CRS-MINUTES-CONSENT-MODEL",
      "OBS-CRS-MINUTES-JAMIE-OWNERSHIP",
    ],
    researchTaskIds: [],
    disposition:
      "Extracted public-safe operating-system observations while keeping raw coalition records, contact details, strategy, and vulnerable business information outside the repository.",
  },
  {
    id: "CAP-TEAMS-CRS-OPEN-DATA-PILOT-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Two implementation documents specifying privacy-preserving, machine-readable commercial vacancy and lease-cost indicators for public use.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: [
      "public-data product requirements",
      "privacy-preserving release design",
      "implementation readiness",
    ],
    sourceIds: [
      "SRC-CRS-OPEN-DATA-FOUNDATION-2025-11-26",
      "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
    ],
    observationIds: [
      "OBS-CRS-DATA-OPEN-INDICATOR-ASK",
      "OBS-CRS-DATA-CONFIDENTIALITY-BOUNDARY",
      "OBS-CRS-DATA-COMPLEMENTARY-LENSES",
      "OBS-CRS-DATA-MINIMUM-PILOT",
      "OBS-CRS-DATA-MINIMUM-FIELDS",
    ],
    researchTaskIds: [],
    disposition:
      "Promoted the implementation-design work, not adoption or agency action, and omitted private outreach details.",
  },
  {
    id: "CAP-TEAMS-JPH-RAFT-EXPEDITION-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Contemporaneous reporting on the collaborative recycled-material raft expedition from Kansas City down the Missouri and Mississippi Rivers.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["waterways"],
    potentialClaimFamilies: [
      "expedition scale",
      "participatory waterways practice",
      "collective construction",
    ],
    sourceIds: [
      "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
      "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
      "SRC-WATERWAYS-9NEWS-VICKSBURG-2007-09-25",
    ],
    observationIds: [
      "OBS-WATERWAYS-PITCH-PART-III-ROUTE",
      "OBS-WATERWAYS-PITCH-PART-III-DISTANCE",
      "OBS-WATERWAYS-SOUNDINGS-RESUMPTION",
      "OBS-WATERWAYS-SOUNDINGS-CONSTRUCTION",
      "OBS-WATERWAYS-SOUNDINGS-PARTICIPATION",
      "OBS-WATERWAYS-9NEWS-CREW",
    ],
    researchTaskIds: ["RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION"],
    disposition:
      "Confirmed more than 1,000 miles, collaborative construction, public participation, and resumption after repair; kept arrival at the Gulf unconfirmed.",
  },
  {
    id: "CAP-TEAMS-JPH-NYCAC-ARCHIVAL-COLLABORATION-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A source-backed Wikipedia production record linking Jamie's archival assembly and sandbox draft to collaborative review and mainspace publication.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["nyc-artist-coalition"],
    potentialClaimFamilies: [
      "archival production",
      "source-backed public knowledge",
      "collaborative editorial workflow",
    ],
    sourceIds: [
      "SRC-JPH-NYCAC-WIKIPEDIA-COLLABORATION-2025",
      "SRC-NYCAC-WIKIPEDIA-REVISION-HISTORY-2025",
    ],
    observationIds: [
      "OBS-NYCAC-WIKIPEDIA-ARCHIVE-ASSEMBLY",
      "OBS-NYCAC-WIKIPEDIA-EDITORIAL-REVIEW",
      "OBS-NYCAC-WIKIPEDIA-INITIAL-REVISION",
      "OBS-NYCAC-WIKIPEDIA-MAINSPACE-MOVE",
    ],
    researchTaskIds: [],
    disposition:
      "Combined a protected working record with public revision history, credited Dorothy Howard's editorial work, and did not treat Wikipedia as proof of every article proposition.",
  },
  {
    id: "CAP-TEAMS-JOBHUNT-DISCOVERY-CALLS-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "Two private product-discovery conversations in which Jamie pressure-tested a personal and team knowledge-system concept with a longtime engineering collaborator.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["source-backed-team-memory"],
    potentialClaimFamilies: [
      "product discovery",
      "knowledge-system requirements",
      "privacy and user control",
    ],
    sourceIds: ["SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025"],
    observationIds: [
      "OBS-JOBHUNT-DISCOVERY-USE-QUESTION",
      "OBS-JOBHUNT-DISCOVERY-PROBLEM-FIRST",
      "OBS-JOBHUNT-DISCOVERY-LEGIBILITY-CONTROL",
    ],
    researchTaskIds: [],
    disposition:
      "Recorded only product-learning observations and excluded personal history, third-party details, pricing, and private company information.",
  },
  {
    id: "CAP-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "High-value June 2026 job-hunt and source-backed-memory packet directories awaiting complete iCloud materialization.",
    status: "researching",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["source-backed-team-memory", "portfolio-system"],
    potentialClaimFamilies: [
      "pilot development",
      "offer evolution",
      "collaborator validation",
    ],
    sourceIds: [],
    observationIds: [],
    researchTaskIds: ["RT-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION"],
    disposition:
      "Requested iCloud materialization and preserved the unread packet as a retrieval task; no source content was inferred from filenames or prior copies.",
  },
] satisfies CaptureRecord[];

export const teamsArchiveSources = [
  {
    id: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
    title: "Jamie Burkart 90-Day Action Plan for Fair Rent NYC and Commercial Rent Stabilization",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-04-06",
    publicCitation:
      "Jamie Burkart, public-safe summary of a 90-day Fair Rent NYC and Commercial Rent Stabilization action plan, April 6, 2026.",
    publicNote:
      "The underlying working document remains private; only its professional operating-design content is represented here.",
    protectedLocatorId: "ARCHIVE-CRS-OPERATING-PLAN-2026-001",
    supportsGenerally: [
      "Jamie defined six shared public goods for the collaboration",
      "Jamie explicitly bounded his role against sole movement ownership",
      "the plan specified deliverables, priority order, and success conditions",
    ],
    doesNotEstablish: [
      "completion of every planned deliverable",
      "sole leadership of the coalition",
      "agreement by every collaborator with every proposed structure",
      "policy adoption or legislative causality",
    ],
  },
  {
    id: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    title: "Commercial Rent Stabilization Collaboration running minutes, public-safe metadata",
    organization: "Commercial Rent Stabilization collaboration",
    author: "Jamie Burkart and collaborators",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-05-15",
    publicCitation:
      "Public-safe summary of Commercial Rent Stabilization collaboration running minutes maintained through May 15, 2026.",
    publicNote:
      "Raw meeting notes, contact details, legal-review context, vulnerable business information, and private strategy remain outside the repository.",
    protectedLocatorId: "ARCHIVE-CRS-RUNNING-MINUTES-2026-001",
    supportsGenerally: [
      "the document functioned as shared meeting and decision memory",
      "the document tracked actions, decisions, open questions, and source context",
      "the document encoded consent levels and information-handling rules",
      "Jamie was listed as owner for keeping the record current",
    ],
    doesNotEstablish: [
      "sole authorship of every entry",
      "agreement on every open question",
      "completion of every listed action",
      "permission to publish underlying participant or business information",
    ],
  },
  {
    id: "SRC-CRS-OPEN-DATA-FOUNDATION-2025-11-26",
    title: "Open Data Foundation for a Future Commercial Rent Guidelines Board",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2025-11-26",
    publicCitation:
      "NYC Artist Coalition, public-safe summary of 'Open Data Foundation for a Future Commercial Rent Guidelines Board,' November 26, 2025.",
    publicNote:
      "The document is represented as a proposal and implementation artifact, not as an adopted City program.",
    protectedLocatorId: "ARCHIVE-CRS-OPEN-DATA-FOUNDATION-2025-001",
    supportsGenerally: [
      "a request for machine-readable aggregate commercial real-estate indicators",
      "a request for a short technical note defining a minimum public data suite",
      "explicit confidentiality, suppression, and licensing boundaries",
    ],
    doesNotEstablish: [
      "agency acceptance or implementation",
      "availability of confidential microdata",
      "sole authorship of coalition policy positions",
      "a future Commercial Rent Guidelines Board",
    ],
  },
  {
    id: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
    title: "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-03-27",
    publicCitation:
      "Jamie Burkart, public-safe summary of 'Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC,' March 27, 2026.",
    publicNote:
      "The source specifies a proposed privacy-preserving pilot and does not claim that an agency implemented it.",
    protectedLocatorId: "ARCHIVE-CRS-PUBLIC-BASELINE-2026-001",
    supportsGenerally: [
      "a complementary RPIE-derived aggregate indicator layer",
      "a three-part minimum pilot of indicators, coverage and suppression, and methods",
      "field-level product requirements for a reusable public dataset",
    ],
    doesNotEstablish: [
      "agency adoption",
      "publication of the requested dataset",
      "access to raw confidential filings",
      "measured policy impact",
    ],
  },
  {
    id: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
    title: "Artists Turned Huck Finn, Part III",
    organization: "The Pitch",
    author: "Eric Barton",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-11-12",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Eric Barton, 'Artists Turned Huck Finn, Part III,' The Pitch, November 12, 2007.",
    publicNote:
      "Contemporaneous reporting on the expedition's construction, route, distance, interruption, repair period, and collective crew.",
    supportsGenerally: [
      "the expedition left Kansas City from Kaw Point",
      "the group built a raft from recycled materials",
      "the expedition traveled more than 1,000 miles",
      "the group worked with local support to resume after a Coast Guard interruption",
    ],
    doesNotEstablish: [
      "arrival at the Gulf of Mexico",
      "sole authorship or construction by Jamie",
      "a complete participant roster",
      "the full post-Vicksburg route",
    ],
  },
  {
    id: "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
    title: "Rollin' on the river ... again",
    organization: "Soundings",
    author: "Soundings Editors",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://soundingsonline.com/news/rollin-on-the-river-again",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Soundings Editors, 'Rollin' on the river ... again,' Soundings, 2007.",
    publicNote:
      "Reporting on the crew's 1,100-mile progress, repairs, Coast Guard approval, collaborative construction, and participatory purpose.",
    supportsGenerally: [
      "the crew had traveled 1,100 miles",
      "the crew resumed after repair and Coast Guard inspection",
      "Jamie and five other participants built the recycled-material raft",
      "the expedition invited people to join and experience river communities",
    ],
    doesNotEstablish: [
      "arrival at the Gulf of Mexico",
      "sole project ownership",
      "the identity of every person who joined",
      "measured environmental or cultural impact",
    ],
  },
  {
    id: "SRC-WATERWAYS-9NEWS-VICKSBURG-2007-09-25",
    title: "3 modern-day Huck Finn rafters stuck on Mississippi River",
    organization: "9NEWS",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-09-25",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.9news.com/article/news/weird/3-modern-day-huck-finn-rafters-stuck-on-mississippi-river/73-343541719",
    preferredPublicUrl: "canonical",
    publicCitation:
      "9NEWS, '3 modern-day Huck Finn rafters stuck on Mississippi River,' September 25, 2007.",
    publicNote:
      "Contemporaneous identification of Jamie Burkart, Libby Hendon, and Laura Mattingly during the Vicksburg interruption.",
    supportsGenerally: [
      "Jamie Burkart was part of the three-person crew reported in Vicksburg",
      "the raft used a bicycle-driven paddlewheel",
      "the group sought assistance while contesting the safety order",
    ],
    doesNotEstablish: [
      "arrival at the Gulf of Mexico",
      "the full project history",
      "sole authorship",
      "a final legal determination",
    ],
  },
  {
    id: "SRC-JPH-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    title: "NYC Artist Coalition Wikipedia archival-production working record",
    author: "Jamie Burkart and Dorothy Howard",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2025-12-20",
    publicCitation:
      "Public-safe summary of Jamie Burkart and Dorothy Howard's NYC Artist Coalition Wikipedia working session, December 20, 2025.",
    publicNote:
      "The underlying correspondence, transcript, and working files remain private; the public revision history independently records the page edits and mainspace move.",
    protectedLocatorId: "ARCHIVE-NYCAC-WIKIPEDIA-COLLAB-2025-001",
    supportsGenerally: [
      "Jamie assembled a press and public-record source corpus",
      "Jamie drafted the article and moved it into a Wikipedia sandbox",
      "Dorothy Howard reviewed source fit, structure, encyclopedic voice, and media licensing",
    ],
    doesNotEstablish: [
      "that Jamie independently authored the final article",
      "that every draft statement survived review",
      "that Wikipedia verifies every underlying proposition",
      "permission to publish the private working conversation",
    ],
  },
  {
    id: "SRC-NYCAC-WIKIPEDIA-REVISION-HISTORY-2025",
    title: "NYC Artist Coalition Wikipedia revision history",
    organization: "Wikimedia Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2025-12-20",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://en.wikipedia.org/w/index.php?title=NYC_Artist_Coalition&action=history",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Wikipedia revision history for 'NYC Artist Coalition,' beginning December 20, 2025.",
    publicNote:
      "The history records initial revisions by James Bernard Burkart, collaborative edits by Hexatekin, and Hexatekin's December 27, 2025, move from Jamie's sandbox to mainspace as 'ready for review.'",
    supportsGenerally: [
      "James Bernard Burkart created the initial page revision",
      "Hexatekin made multiple collaborative revisions",
      "Hexatekin moved the page from Jamie's sandbox into mainspace on December 27, 2025",
      "later editors continued to maintain the article",
    ],
    doesNotEstablish: [
      "the truth of every article statement",
      "sole authorship by Jamie or Dorothy Howard",
      "formal Wikimedia endorsement of the coalition",
      "ownership of cited reporting",
    ],
  },
  {
    id: "SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025",
    title: "Two private knowledge-system product-discovery conversations",
    author: "Jamie Burkart and a longtime engineering collaborator",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2025-12-08",
    publicCitation:
      "Public-safe summary of two private product-discovery conversations in December 2025.",
    publicNote:
      "Only product questions and design constraints are represented; personal material, third-party details, pricing, and private company information remain excluded.",
    protectedLocatorId: "ARCHIVE-JOBHUNT-DISCOVERY-CALLS-2025-001",
    supportsGenerally: [
      "Jamie pressure-tested a personal and team knowledge-system concept",
      "the collaborator asked who would use it and what problem it solved",
      "the conversation surfaced context compression, legibility, user control, and privacy as requirements",
      "the collaborator recommended problem-first discovery with specific users",
    ],
    doesNotEstablish: [
      "market demand",
      "a product purchase commitment",
      "a public testimonial",
      "the later pilot's exact scope or completion",
      "permission to publish the private conversations",
    ],
  },
] satisfies SourceRecord[];

export const teamsArchiveObservations = [
  {
    id: "OBS-CRS-PLAN-SHARED-PUBLIC-GOODS",
    sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
    project: "fair-rent-nyc",
    statement:
      "Jamie's plan defines six shared public goods: a clear front door, a recurring room, a shared public line, a stewarded story bank, an implementation-readiness packet, and a durable source-of-truth spine.",
    observationType: "explicit",
    locator: "Core role, numbered list 1-6.",
    confidence: "high",
    limitations: [
      "The source is a plan and supports design intent, not completion of every component.",
    ],
    supportsClaimIds: [crsOperatingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-PLAN-ROLE-BOUNDARIES",
    sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
    project: "fair-rent-nyc",
    statement:
      "The plan defines Jamie's functions as architecture, editing and synthesis, memory keeping, digital infrastructure, and bridging organizing, policy, data, and institutional knowledge, while rejecting sole movement ownership.",
    observationType: "explicit",
    locator: "Core role, 'I am serving primarily as' and 'I am not serving as.'",
    confidence: "high",
    limitations: [
      "This is Jamie's authored role definition and does not substitute for collaborator accounts of every division of work.",
    ],
    supportsClaimIds: [crsOperatingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-MINUTES-MEMORY-STRUCTURE",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "The running minutes are organized as a shared memory system for meetings, decisions, actions, open questions, shared language, coalition structure, data, and story leads rather than as a verbatim record.",
    observationType: "explicit",
    locator: "Document purpose, table of contents, and 'How to use this document.'",
    confidence: "high",
    limitations: [
      "The document is collaborative and does not make Jamie the author of every underlying event or statement.",
    ],
    supportsClaimIds: [crsOperatingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-MINUTES-CONSENT-MODEL",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "The minutes instruct collaborators to keep sensitive source materials elsewhere and classify business stories as public, anonymized, confidential, or requiring follow-up before sharing.",
    observationType: "explicit",
    locator: "How to use this document, information-handling and consent-level instructions.",
    confidence: "high",
    limitations: [
      "The source documents a governance rule, not perfect compliance in every later use.",
    ],
    supportsClaimIds: [crsOperatingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-MINUTES-JAMIE-OWNERSHIP",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
    project: "fair-rent-nyc",
    statement:
      "The live action list names Jamie as owner for keeping the running-minutes document current and assigns him roles in legal-source preparation, data-ask drafting, media sharing, and coordination follow-up.",
    observationType: "explicit",
    locator: "Live action list, owner and next-step columns.",
    confidence: "high",
    limitations: [
      "An assignment is evidence of owned work, not proof that every listed next step was completed.",
    ],
    supportsClaimIds: [crsOperatingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-DATA-OPEN-INDICATOR-ASK",
    sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-2025-11-26",
    project: "fair-rent-nyc",
    statement:
      "The proposal asks for machine-readable aggregate indicator tables behind key commercial real-estate reports and a short technical note defining a minimum public data suite.",
    observationType: "explicit",
    locator: "Two numbered requests.",
    confidence: "high",
    limitations: [
      "The source records a proposal, not acceptance or implementation by the Comptroller's office.",
    ],
    supportsClaimIds: [crsDataClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-DATA-CONFIDENTIALITY-BOUNDARY",
    sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-2025-11-26",
    project: "fair-rent-nyc",
    statement:
      "The proposal limits its ask to legally publishable aggregated series and explicitly excludes confidential or vendor-restricted microdata.",
    observationType: "explicit",
    locator: "Request 1, confidentiality and licensing paragraph.",
    confidence: "high",
    limitations: [
      "The source does not establish which requested series an agency could legally release.",
    ],
    supportsClaimIds: [crsDataClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-DATA-COMPLEMENTARY-LENSES",
    sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
    project: "fair-rent-nyc",
    statement:
      "Jamie's handoff distinguishes existing storefront reporting from a complementary RPIE-derived aggregate layer with broader square-foot coverage, longer history, and rent-vacancy analysis in one administrative universe.",
    observationType: "explicit",
    locator: "Two public lenses and 'Why add the RPIE lens?'",
    confidence: "high",
    limitations: [
      "The source states the proposed analytic value and does not report results from an implemented dataset.",
    ],
    supportsClaimIds: [crsDataClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-DATA-MINIMUM-PILOT",
    sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
    project: "fair-rent-nyc",
    statement:
      "The handoff specifies a three-part minimum pilot: an indicators table, a coverage and suppression table, and a plain-language methods note.",
    observationType: "explicit",
    locator: "The smallest serious pilot, numbered items 1-3.",
    confidence: "high",
    limitations: [
      "The pilot is a product specification, not a released City dataset.",
    ],
    supportsClaimIds: [crsDataClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-CRS-DATA-MINIMUM-FIELDS",
    sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
    project: "fair-rent-nyc",
    statement:
      "The handoff defines minimum fields including year, geography, contributing count, occupied and vacant square footage, rent-per-square-foot statistics, suppression flag, and release version.",
    observationType: "explicit",
    locator: "Minimum useful fields.",
    confidence: "high",
    limitations: [
      "The fields describe requirements and do not establish data availability or quality.",
    ],
    supportsClaimIds: [crsDataClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-PITCH-PART-III-ROUTE",
    sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
    project: "waterways",
    statement:
      "The Pitch reports that Jamie Burkart, Libby Hendon, and other participating artists left Kaw Point on a recycled-material raft intended to travel from Kansas City toward the Gulf of Mexico.",
    observationType: "attributed",
    locator: "Paragraphs 2-3.",
    confidence: "high",
    limitations: [
      "The source reports the intended destination and does not establish arrival at the Gulf.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-PITCH-PART-III-DISTANCE",
    sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
    project: "waterways",
    statement:
      "The Pitch reports that the expedition traveled more than 1,000 miles before the Coast Guard interruption near Vicksburg.",
    observationType: "attributed",
    locator: "Paragraph 4.",
    confidence: "high",
    limitations: [
      "The article does not provide a route log or independently measured mileage table.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-SOUNDINGS-RESUMPTION",
    sourceId: "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
    project: "waterways",
    statement:
      "Soundings reports that the three-person crew resumed the voyage after repairs, added steering equipment, and a Coast Guard inspection.",
    observationType: "attributed",
    locator: "Opening and Coast Guard sequence.",
    confidence: "high",
    limitations: [
      "Resumption does not establish the expedition's final endpoint.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-SOUNDINGS-CONSTRUCTION",
    sourceId: "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
    project: "waterways",
    statement:
      "Soundings reports that Jamie and five friends built the raft from materials recovered from abandoned riverfront buildings.",
    observationType: "attributed",
    locator: "Construction paragraph beginning 'Burkart says they and three other friends.'",
    confidence: "high",
    limitations: [
      "The article does not itemize each participant's division of labor.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-SOUNDINGS-PARTICIPATION",
    sourceId: "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
    project: "waterways",
    statement:
      "Soundings quotes Jamie describing invitations for people to join the raft and experience the Midwest from a river perspective.",
    observationType: "attributed",
    locator: "Participation paragraph beginning 'Burkart says they have been inviting people.'",
    confidence: "high",
    limitations: [
      "The article does not enumerate participants or measure the program's effects.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-WATERWAYS-9NEWS-CREW",
    sourceId: "SRC-WATERWAYS-9NEWS-VICKSBURG-2007-09-25",
    project: "waterways",
    statement:
      "9NEWS identifies Jamie Burkart, Libby Hendon, and Laura Mattingly as the three rafters stranded near Vicksburg in September 2007.",
    observationType: "attributed",
    locator: "Body paragraphs identifying the crew.",
    confidence: "high",
    limitations: [
      "The report covers one moment and not the full participant history.",
    ],
    supportsClaimIds: [raftClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-NYCAC-WIKIPEDIA-ARCHIVE-ASSEMBLY",
    sourceId: "SRC-JPH-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    project: "nyc-artist-coalition",
    statement:
      "The working record documents Jamie assembling a press and public-record corpus, drafting an article, and learning to translate advocacy language into an encyclopedic register.",
    observationType: "explicit",
    locator: "December 20 working session, archive and draft discussion.",
    confidence: "high",
    limitations: [
      "The private working record is not a public testimonial and is represented only through approved metadata.",
    ],
    supportsClaimIds: [wikipediaClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-NYCAC-WIKIPEDIA-EDITORIAL-REVIEW",
    sourceId: "SRC-JPH-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    project: "nyc-artist-coalition",
    statement:
      "The working record documents Dorothy Howard reviewing source fit, article structure, encyclopedic voice, Wikipedia workflow, and image licensing with Jamie.",
    observationType: "explicit",
    locator: "December 20 working session, source, structure, publication, and licensing discussion.",
    confidence: "high",
    limitations: [
      "This observation credits process and does not assign either collaborator sole authorship of the final page.",
    ],
    supportsClaimIds: [wikipediaClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-NYCAC-WIKIPEDIA-INITIAL-REVISION",
    sourceId: "SRC-NYCAC-WIKIPEDIA-REVISION-HISTORY-2025",
    project: "nyc-artist-coalition",
    statement:
      "Wikipedia's revision history records the first retained revision under James Bernard Burkart's account on December 20, 2025.",
    observationType: "metadata",
    locator: "Revision 1328600888, December 20, 2025.",
    confidence: "high",
    limitations: [
      "Revision metadata records contribution history, not the truth of every submitted statement.",
    ],
    supportsClaimIds: [wikipediaClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-NYCAC-WIKIPEDIA-MAINSPACE-MOVE",
    sourceId: "SRC-NYCAC-WIKIPEDIA-REVISION-HISTORY-2025",
    project: "nyc-artist-coalition",
    statement:
      "The revision history records multiple Hexatekin edits and Hexatekin's December 27, 2025, move of the article from Jamie's sandbox to NYC Artist Coalition mainspace as ready for review.",
    observationType: "metadata",
    locator: "Revisions 1328603770-1329730302; move comment on revision 1329730302.",
    confidence: "high",
    limitations: [
      "The move establishes publication workflow and collaborative editing, not institutional endorsement.",
    ],
    supportsClaimIds: [wikipediaClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-JOBHUNT-DISCOVERY-USE-QUESTION",
    sourceId: "SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025",
    project: "source-backed-team-memory",
    statement:
      "The collaborator repeatedly asked Jamie to define what the proposed knowledge system was, how someone would use it, and how it differed from a generic summary.",
    observationType: "attributed",
    locator: "December 8 and December 11 product-definition exchanges.",
    confidence: "high",
    limitations: [
      "The conversation was exploratory and does not prove a validated product requirement.",
    ],
    supportsClaimIds: [discoveryClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-JOBHUNT-DISCOVERY-PROBLEM-FIRST",
    sourceId: "SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025",
    project: "source-backed-team-memory",
    statement:
      "The collaborator recommended a listening tour and a product focused on a specific user's valuable problem rather than continuing with a solution in search of a problem.",
    observationType: "attributed",
    locator: "December 11, 39:22-43:21.",
    confidence: "high",
    limitations: [
      "This is product advice, not evidence of market demand or later implementation.",
    ],
    supportsClaimIds: [discoveryClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-JOBHUNT-DISCOVERY-LEGIBILITY-CONTROL",
    sourceId: "SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025",
    project: "source-backed-team-memory",
    statement:
      "The conversation identifies context compression, visible system knowledge, user correction and control, local processing, and privacy as design concerns for a personal or team knowledge surface.",
    observationType: "attributed",
    locator: "December 11, 28:36-39:22.",
    confidence: "high",
    limitations: [
      "The source records an exploratory design conversation and not a completed technical architecture.",
    ],
    supportsClaimIds: [discoveryClaimId],
    reviewedAt: "2026-07-14",
  },
] satisfies ObservationRecord[];

export const teamsArchiveClaims = [
  {
    id: crsOperatingClaimId,
    project: "fair-rent-nyc",
    claimType: "method",
    internalClaim:
      "Jamie designed a six-part coalition operating system and maintained consent-aware running memory for Commercial Rent Stabilization collaboration.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-CRS-PLAN-SHARED-PUBLIC-GOODS",
      "OBS-CRS-PLAN-ROLE-BOUNDARIES",
      "OBS-CRS-MINUTES-MEMORY-STRUCTURE",
      "OBS-CRS-MINUTES-CONSENT-MODEL",
      "OBS-CRS-MINUTES-JAMIE-OWNERSHIP",
    ],
    projections: [
      {
        key: "case-study",
        text: "Jamie designed a coalition operating system around six shared public goods: a clear front door, a recurring room, a shared public line, a stewarded story bank, an implementation-readiness packet, and a durable source-of-truth spine. He maintained running minutes that separated shared memory from raw source material, tracked decisions and next steps, and encoded consent levels for public stories.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "work-card",
        text: "Jamie designed a six-part coalition operating system and maintained consent-aware running memory for the 2026 collaboration.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/fair-rent-nyc"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
        relationship: "direct-support",
        supports: ["the six-part operating design", "Jamie's stated role boundaries"],
        locator: "Core role and five non-negotiable deliverables.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-CRS-RUNNING-MINUTES-2026-05-15",
        relationship: "direct-support",
        supports: [
          "the running-memory structure",
          "consent and information-handling rules",
          "Jamie's maintenance ownership",
        ],
        locator: "Purpose, how-to, live action list, and meeting-note structure.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe the six-part structure as Jamie's designed operating plan, not as proof that every component was fully implemented.",
      "Credit the running minutes as collaborative memory maintained by Jamie, not sole authorship of every entry or underlying action.",
      "Keep raw notes, private strategy, legal-review context, contacts, and vulnerable business information outside public Git.",
    ],
    antiClaims: [
      "Jamie was the whole movement",
      "Jamie completed every planned deliverable",
      "Every collaborator agreed with every proposed governance structure",
      "The documentation caused a legislative outcome",
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: crsDataClaimId,
    project: "fair-rent-nyc",
    claimType: "action",
    internalClaim:
      "Jamie developed implementation-ready requirements for a privacy-preserving public pilot of aggregate commercial vacancy and lease-cost indicators.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-CRS-DATA-OPEN-INDICATOR-ASK",
      "OBS-CRS-DATA-CONFIDENTIALITY-BOUNDARY",
      "OBS-CRS-DATA-COMPLEMENTARY-LENSES",
      "OBS-CRS-DATA-MINIMUM-PILOT",
      "OBS-CRS-DATA-MINIMUM-FIELDS",
    ],
    projections: [
      {
        key: "case-study",
        text: "Jamie translated a policy idea into data-product requirements for a privacy-preserving public pilot: aggregate vacancy and lease-cost indicators, a coverage and suppression table, a methods note, and field-level release requirements. The proposal complements existing storefront data and excludes confidential filings, tenant identities, and parcel-level rent records.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"],
      },
      {
        key: "technical-operations",
        text: "Specified a privacy-preserving public-data pilot with indicator, suppression, methods, and release-version requirements.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-2025-11-26",
        relationship: "direct-support",
        supports: [
          "the aggregate indicator and technical-note ask",
          "the confidentiality boundary",
        ],
        locator: "Two numbered requests and confidentiality paragraph.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026-03-27",
        relationship: "direct-support",
        supports: [
          "the complementary-data rationale",
          "the three-part pilot",
          "field-level requirements",
        ],
        locator: "Two public lenses, smallest serious pilot, and minimum fields.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "State that Jamie developed requirements and proposals, not that an agency adopted or implemented them.",
      "Do not imply access to confidential filings or proprietary microdata.",
      "Treat coalition positions and government decisions as collective and institutional work.",
    ],
    antiClaims: [
      "The City implemented Jamie's pilot",
      "Jamie released confidential RPIE records",
      "The proposal created a Commercial Rent Guidelines Board",
      "The data design proves a policy outcome",
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: raftClaimId,
    project: "waterways",
    claimType: "scale",
    internalClaim:
      "Jamie co-created and traveled on a participatory recycled-material raft expedition that covered more than 1,000 miles from Kansas City down the Missouri and Mississippi Rivers.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-WATERWAYS-PITCH-PART-III-ROUTE",
      "OBS-WATERWAYS-PITCH-PART-III-DISTANCE",
      "OBS-WATERWAYS-SOUNDINGS-RESUMPTION",
      "OBS-WATERWAYS-SOUNDINGS-CONSTRUCTION",
      "OBS-WATERWAYS-SOUNDINGS-PARTICIPATION",
      "OBS-WATERWAYS-9NEWS-CREW",
    ],
    projections: [
      {
        key: "archive-note",
        text: "Jamie co-created and traveled on a participatory recycled-material raft expedition that covered more than 1,000 miles from Kansas City down the Missouri and Mississippi Rivers. Contemporary reporting documents collaborative construction, invitations for people to join, a Coast Guard interruption near Vicksburg, and resumption after repair and inspection; arrival at the Gulf has not yet been recovered from the reviewed sources.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/teams-archive-production"],
      },
      {
        key: "case-study",
        text: "Co-created a participatory recycled-material raft expedition that traveled more than 1,000 miles from Kansas City down the Missouri and Mississippi Rivers.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
        relationship: "direct-support",
        supports: ["route", "distance", "collaborative construction"],
        locator: "Paragraphs 2-4.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
        relationship: "corroborating",
        supports: [
          "1,100-mile progress",
          "resumption",
          "collective construction",
          "participatory invitations",
        ],
        locator: "Opening, construction, and participation paragraphs.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-WATERWAYS-9NEWS-VICKSBURG-2007-09-25",
        relationship: "corroborating",
        supports: ["Jamie's participation", "Vicksburg crew context"],
        locator: "Crew-identification paragraphs.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Credit Libby Hendon, Laura Mattingly, the other builders and travelers, Vicksburg supporters, and the wider participant network.",
      "Say the expedition traveled toward the Gulf; the reviewed sources do not establish arrival at the Gulf of Mexico.",
      "Do not convert reported mileage into a precise route log or measured impact claim.",
    ],
    antiClaims: [
      "Jamie alone built or completed the expedition",
      "The reviewed sources confirm arrival at the Gulf of Mexico",
      "Every participant is identified",
      "The expedition's cultural or environmental impact was measured",
    ],
    researchTaskIds: ["RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: wikipediaClaimId,
    project: "nyc-artist-coalition",
    claimType: "method",
    internalClaim:
      "Jamie assembled a source corpus and initiated a Wikipedia draft that Dorothy Howard collaboratively reviewed and moved into mainspace.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NYCAC-WIKIPEDIA-ARCHIVE-ASSEMBLY",
      "OBS-NYCAC-WIKIPEDIA-EDITORIAL-REVIEW",
      "OBS-NYCAC-WIKIPEDIA-INITIAL-REVISION",
      "OBS-NYCAC-WIKIPEDIA-MAINSPACE-MOVE",
    ],
    projections: [
      {
        key: "archive-note",
        text: "Jamie assembled a press and public-record source corpus and initiated the NYC Artist Coalition article in his Wikipedia sandbox. Wikimedia NYC editor Dorothy Howard reviewed and revised the draft, and her Hexatekin account moved it into mainspace as ready for review on December 27, 2025. Later editors continued maintaining the article.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/teams-archive-production"],
      },
      {
        key: "case-study",
        text: "Turned a project archive into a collaboratively reviewed public-knowledge article with an auditable revision history.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-JPH-NYCAC-WIKIPEDIA-COLLABORATION-2025",
        relationship: "direct-support",
        supports: [
          "source assembly",
          "drafting process",
          "Dorothy Howard's editorial review",
        ],
        locator: "December 20 working record.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-NYCAC-WIKIPEDIA-REVISION-HISTORY-2025",
        relationship: "corroborating",
        supports: [
          "initial revision",
          "collaborative edits",
          "mainspace move",
          "later maintenance",
        ],
        locator: "Revisions 1328600888-1339701732.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Credit Dorothy Howard's editorial review and mainspace move and later editors' maintenance.",
      "Treat Wikipedia as a public knowledge artifact and revision trail, not as independent proof of every article proposition.",
      "Keep the private correspondence and working transcript outside the repository.",
    ],
    antiClaims: [
      "Jamie independently authored and published the final article",
      "Wikipedia endorsed NYC Artist Coalition",
      "The article proves every coalition accomplishment",
      "Private working correspondence is publicly available",
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: discoveryClaimId,
    project: "source-backed-team-memory",
    claimType: "method",
    internalClaim:
      "Jamie used two product-discovery conversations to pressure-test a personal and team knowledge-system concept and surface requirements around users, problems, context compression, legibility, control, and privacy.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-JOBHUNT-DISCOVERY-USE-QUESTION",
      "OBS-JOBHUNT-DISCOVERY-PROBLEM-FIRST",
      "OBS-JOBHUNT-DISCOVERY-LEGIBILITY-CONTROL",
    ],
    projections: [
      {
        key: "archive-note",
        text: "Two private discovery conversations pressure-tested Jamie's knowledge-system concept against product questions: who uses it, what problem it solves, how source context is compressed, what the system knows, what the user can correct, and what must remain private. The conversations support a discovery process, not market validation.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/teams-archive-production"],
      },
      {
        key: "case-study",
        text: "Used product-discovery conversations to turn a personal knowledge-system concept toward specific users, inspectable context, user control, and privacy.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025",
        relationship: "direct-support",
        supports: [
          "product-definition questions",
          "problem-first guidance",
          "legibility, control, compression, and privacy concerns",
        ],
        locator: "Two December 2025 discovery conversations.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Do not identify the collaborator or expose private company, personal, pricing, or third-party details without explicit approval.",
      "Do not treat exploratory feedback as market validation, a purchase commitment, or a public testimonial.",
      "Do not claim a direct lineage into the June 2026 pilot packet until that packet is materialized and compared.",
    ],
    antiClaims: [
      "The conversations proved product-market fit",
      "The collaborator bought or endorsed the product publicly",
      "The December concept and June pilot are identical",
      "The private transcripts may be published",
    ],
    researchInquiryIds: ["INQ-TEAMS-JOBHUNT-ICLOUD-HYDRATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
] satisfies ClaimRecord[];

export const teamsArchiveResearchTasks = [
  {
    id: "RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION",
    project: "waterways",
    question:
      "Can a contemporaneous source establish the raft expedition's endpoint after the documented November 2007 resumption?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-TEAMS-JPH-RAFT-EXPEDITION-2026"],
    sourceIds: [
      "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
      "SRC-WATERWAYS-SOUNDINGS-RAFT-2007",
    ],
    claimIds: [raftClaimId],
    successCriteria: [
      "Recover a dated contemporaneous report, route log, or participant artifact that states the final endpoint.",
      "Distinguish intended destination, resumed travel, reached salt water, and arrival at the Gulf.",
      "Retain collective crew credit and any safety or route limitations.",
    ],
    nextActions: [
      "Review later Vicksburg Post, regional television, participant, and Coast Guard records after November 5, 2007.",
      "Do not promote Gulf-arrival wording unless the endpoint is explicit.",
    ],
    publicNote:
      "Reviewed reporting confirms more than 1,000 miles and resumption after repair, but not arrival at the Gulf.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
  {
    id: "RT-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION",
    project: "source-backed-team-memory",
    question:
      "What public-safe evidence and product lineage are contained in the June 2026 source-backed-memory and job-hunt packet once iCloud materialization completes?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION-2026"],
    sourceIds: [],
    claimIds: [discoveryClaimId],
    successCriteria: [
      "Materialize and close-read the June 18, June 26, and June 30 packet directories.",
      "Normalize only recovered source metadata and decompose each selected source into bounded observations.",
      "Compare the June offer with the December discovery questions without assuming direct lineage.",
      "Keep collaborator identity, pricing, transcripts, and private business context outside public Git unless separately approved.",
    ],
    nextActions: [
      "Retry bounded directory enumeration after iCloud reports local availability.",
      "Prefer current proposal, brief, and handoff artifacts over verbatim conversation records when both are available.",
      "Record not-yet-materialized files as retrieval state, not absence.",
    ],
    publicNote:
      "Later June 2026 packet directories were requested from iCloud but had not materialized during this archival pass.",
    owner: "Jamie Burkart / archival review",
    reviewedAt: "2026-07-14",
  },
] satisfies ResearchTask[];

export const teamsArchiveInquiries = [
  {
    id: "INQ-TEAMS-JOBHUNT-ICLOUD-HYDRATION-2026",
    project: "source-backed-team-memory",
    question:
      "Which high-value job-hunt materials were locally available during the Teams archival-production pass?",
    methods: [
      "Performed bounded shallow enumeration rather than a full cloud-backed tree walk.",
      "Close-read the materialized job-hunt overview, current resume, and two dated product-discovery transcripts.",
      "Requested iCloud download for the high-value June packet directories and retried enumeration after waiting.",
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The current June resume and the two December 2025 discovery conversations were materialized and readable.",
      "The later June 2026 packet directories remained present but non-enumerable after the download request during this pass.",
      "The unread packet was routed to a high-priority retrieval task and supports no new observation yet.",
    ],
    limitations: [
      "Cloud materialization can complete after the research run.",
      "Non-enumerability is not evidence that a file is absent or empty.",
      "The inquiry does not infer content from folder dates or prior copies elsewhere.",
    ],
    sourceIds: ["SRC-JOBHUNT-KNOWLEDGE-DISCOVERY-CALLS-2025"],
    publicSummary:
      "A bounded iCloud pass recovered materialized job-hunt anchors and routed the still-cloud-only June packet to a retryable research task.",
    protectedLocatorId: "RESEARCH-JOBHUNT-ICLOUD-HYDRATION-2026-001",
  },
] satisfies ResearchInquiry[];
