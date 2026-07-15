import type { KnowledgeBank } from "./schema.ts";

export const icloudTeamsIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-ICLOUD-JAMIE-PROJECTS-HISTORY",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "An anchor-first review of materialized records in Jamie Projects History recovered a neighborhood tire-service ledger and public documentation for three early creative-technology projects.",
    projectIds: [
      "kansas-city-neighborhood-programs",
      "creative-technology-and-media"
    ],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022",
      "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      "SRC-NTER-CHNG-PITCH-2010",
      "SRC-NTER-CHNG-VIMEO-2011",
      "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
      "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
    ],
    observationIds: [
      "OBS-KC-TIRE-PICKUP-LEDGER-TOTALS",
      "OBS-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO",
      "OBS-NTER-CHNG-PUBLIC-FUNCTION",
      "OBS-NTER-CHNG-COLLECTIVE-CREDITS",
      "OBS-HORSE-LORDS-TRUTHERS-CREDITS",
      "OBS-HORSE-LORDS-TRUTHERS-EDITORIAL-CONTEXT"
    ],
    claimIds: [
      "CLM-KC-TIRE-PICKUP-LEDGER",
      "CLM-MUSIC-HACKATHON-SORTED-AUDIO",
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO"
    ],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    nextActions: [
      "Seek city, association, recycling, or collaborator records that connect the spreadsheet totals to the public TiredOfTires program and Jamie's operating role.",
      "Preserve collective creative credits and avoid assigning programming, direction, or sole authorship beyond the public source record.",
      "Keep the creative-technology projects in the bank until a future portfolio composition has a clear need for them."
    ]
  },
  {
    id: "INTAKE-2026-07-15-ICLOUD-CRS",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "Close reading of Commercial Rent Stabilization working records recovered Jamie-authored operating architecture, shared campaign-memory, public-data, and legislative-provenance artifacts.",
    projectIds: ["commercial-rent-stabilization", "fair-rent-nyc"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-CRS-90-DAY-ACTION-PLAN-2026",
      "SRC-CRS-RUNNING-MINUTES-2026",
      "SRC-CRS-APRIL-15-TRANSCRIPT-2026",
      "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
      "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"
    ],
    observationIds: [
      "OBS-CRS-OPERATING-ARCHITECTURE-PLAN",
      "OBS-CRS-RUNNING-MINUTES-STRUCTURE",
      "OBS-CRS-RUNNING-MINUTES-CONSENT-TIERS",
      "OBS-CRS-TRANSCRIPT-MEMORY-COMMITMENT",
      "OBS-CRS-OPEN-DATA-MEMO",
      "OBS-CRS-LEGISLATIVE-PROVENANCE-REDLINE"
    ],
    claimIds: [
      "CLM-CRS-OPERATING-ARCHITECTURE-PLAN",
      "CLM-CRS-SHARED-MEMORY-SYSTEM",
      "CLM-CRS-OPEN-DATA-FOUNDATION-MEMO",
      "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"
    ],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    nextActions: [
      "Recover collaborator-approved evidence showing which planned operating deliverables were adopted and sustained.",
      "Continue to describe the open-data memo as a proposal and the provenance redline as unofficial discussion infrastructure.",
      "Keep private strategy, legal-review context, story leads, contact data, and verbatim meeting records outside the public repository."
    ]
  },
  {
    id: "INTAKE-2026-07-15-ICLOUD-JOB-HUNT",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "Close reading of the job-hunt archive recovered the protected two-page Source-Backed Team Memory Sprint proposal that underlies the public lab method.",
    projectIds: ["source-backed-team-memory"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: ["SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026"],
    observationIds: [
      "OBS-SOURCE-BACKED-MEMORY-BOUNDED-LOOP",
      "OBS-SOURCE-BACKED-MEMORY-DELIVERABLES"
    ],
    claimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD"],
    researchInquiryIds: ["INQ-SOURCE-BACKED-MEMORY-OUTCOMES-2026"],
    nextActions: [
      "Preserve the method as a bounded authored proposal rather than implying client adoption or a production platform.",
      "Keep the prospective client's identity, pricing, private correspondence, and company context outside the public repository.",
      "Only add outcome claims if an approved pilot, artifact, or collaborator account supports them."
    ]
  }
];

export const icloudTeamsSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022",
    title: "KCTH - Tire Pick Up - Calculator",
    organization: "KC Town Hall project archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Reviewed 2026-07-15",
    publicCitation: "KC Town Hall project archive, tire pickup calculator, May 2019-September 2022 (protected spreadsheet; reviewed July 15, 2026).",
    publicNote: "Applicant-maintained operating ledger with monthly tire counts and a modeled disposal-cost calculation.",
    supportsGenerally: [
      "a 1,970-tire aggregate across 25 nonzero monthly entries",
      "a May 2019 through September 2022 ledger span",
      "a modeled $44,890 disposal-cost figure"
    ],
    doesNotEstablish: [
      "independent audit of every entry",
      "Jamie's sole operation of the program",
      "the identity or address of any participant",
      "actual realized municipal or household savings",
      "the complete TiredOfTires chronology or service area"
    ],
    protectedLocatorId: "LOC-ICLOUD-KCTH-TIRE-LEDGER-2019-2022"
  },
  {
    id: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    title: "Jamie Burkart: Sorted audio",
    organization: "Monthly Music Hackathon NYC",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2013-02-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    preferredPublicUrl: "canonical",
    publicCitation: "Monthly Music Hackathon NYC, 'Jamie Burkart: Sorted audio,' February 27, 2013.",
    publicNote: "Event documentation identifying Jamie's Max/MSP audio-segmentation and pitch-sorting prototype.",
    supportsGenerally: [
      "Jamie made a Max/MSP prototype at the February 2013 hackathon",
      "the prototype segmented audio and sorted clips by pitch"
    ],
    doesNotEstablish: [
      "a production product",
      "long-term adoption",
      "commercial deployment",
      "performance quality beyond the documented demonstration"
    ]
  },
  {
    id: "SRC-NTER-CHNG-PITCH-2010",
    title: "NTR CHNG",
    organization: "The Pitch",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2010-01-07",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Pitch, 'NTR CHNG,' January 7, 2010.",
    publicNote: "Contemporaneous event listing describing the real-time texting installation and digital wall.",
    supportsGenerally: [
      "NTER CHNG combined software and an architectural installation",
      "participant cellphone messages moved through both faces of a digital wall",
      "messages accumulated into a public virtual dialogue"
    ],
    doesNotEstablish: [
      "creator credits",
      "Jamie's individual division of labor",
      "attendance or message totals",
      "long-term deployment"
    ]
  },
  {
    id: "SRC-NTER-CHNG-VIMEO-2011",
    title: "NTER CHNG",
    organization: "Vimeo",
    author: "Garrett Fuselier",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-03-23",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://vimeo.com/21395655",
    preferredPublicUrl: "canonical",
    publicCitation: "Garrett Fuselier, 'NTER CHNG,' Vimeo, March 23, 2011.",
    publicNote: "Project video and credits for the collective installation.",
    supportsGenerally: [
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier co-designed the installation",
      "Garrett Fuselier is credited as programmer",
      "Mary Nichols helped engineer and construct the wall"
    ],
    doesNotEstablish: [
      "Jamie as the sole designer",
      "Jamie as the programmer",
      "Mary Nichols as a background contributor rather than a credited collaborator",
      "attendance or engagement metrics"
    ]
  },
  {
    id: "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
    title: "Horse Lords - Truthers",
    organization: "Horse Lords",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.youtube.com/watch?v=Fiy0lsJLXTs",
    preferredPublicUrl: "canonical",
    publicCitation: "Horse Lords, 'Truthers,' YouTube, 2016.",
    publicNote: "Official video description crediting M.C. Schmidt and Jamie Burkart.",
    supportsGenerally: [
      "M.C. Schmidt and Jamie Burkart co-created the official Truthers video",
      "the video accompanied Horse Lords' Interventions album"
    ],
    doesNotEstablish: [
      "sole direction or authorship",
      "the complete division of production labor",
      "viewership or commercial-outcome claims"
    ]
  },
  {
    id: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR Illinois",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nprillinois.org/the-x/2016-04-29/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation: "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Illinois, April 29, 2016.",
    publicNote: "Independent editorial coverage attributing the video to M.C. Schmidt and Jamie and explaining its relationship to the music.",
    supportsGenerally: [
      "independent attribution to M.C. Schmidt and Jamie Burkart",
      "the band's view that the video's repetition and variation mirrored the music"
    ],
    doesNotEstablish: [
      "sole authorship by Jamie",
      "the complete production process",
      "commercial or audience outcomes"
    ]
  },
  {
    id: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
    title: "90-Day Action Plan for Fair Rent NYC and Commercial Rent Stabilization",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-04-06",
    publicCitation: "Jamie Burkart, '90-Day Action Plan for Fair Rent NYC and Commercial Rent Stabilization,' April 6, 2026 (protected project record).",
    publicNote: "Authored operating-architecture plan defining public goods, deliverables, responsibilities, and explicit collective-work boundaries.",
    supportsGenerally: [
      "Jamie authored a 90-day operating-architecture plan",
      "the plan defined six shared public goods and five non-negotiable deliverables",
      "the plan explicitly rejected sole-organizer and sole-spokesperson framing"
    ],
    doesNotEstablish: [
      "completion of every planned action",
      "adoption by every collaborator",
      "movement-wide authority",
      "policy enactment or campaign outcome"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-90-DAY-ACTION-PLAN-2026"
  },
  {
    id: "SRC-CRS-RUNNING-MINUTES-2026",
    title: "Commercial Rent Stabilization Collaboration - Running Minutes",
    organization: "Action Lab / SBU, Fair Rent NYC, and NYC Artist Coalition collaboration",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Reviewed through April 29, 2026",
    publicCitation: "Commercial Rent Stabilization collaboration, running minutes through April 29, 2026 (protected project record).",
    publicNote: "Shared operating record for decisions, owners, open questions, city/state lanes, consent levels, and continuity.",
    supportsGenerally: [
      "Jamie created and stewarded the running-minutes structure",
      "the record organizes decisions, actions, open questions, city/state lanes, and onboarding context",
      "the record defines public, anonymized, confidential, and follow-up-needed consent levels for stories"
    ],
    doesNotEstablish: [
      "Jamie as sole campaign leader",
      "independent completion of every action item",
      "permission to publish private strategy, story leads, participant names, or contact data",
      "movement-wide adoption outside the documented collaboration"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-RUNNING-MINUTES-2026"
  },
  {
    id: "SRC-CRS-APRIL-15-TRANSCRIPT-2026",
    title: "Commercial Rent Stabilization collaboration call transcript, April 15, 2026",
    organization: "Commercial Rent Stabilization collaboration",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-04-15",
    publicCitation: "Commercial Rent Stabilization collaboration call transcript, April 15, 2026 (private; not for publication).",
    publicNote: "Private corroboration for Jamie's stated commitment to movement infrastructure and a shared knowledge base.",
    supportsGenerally: [
      "Jamie described a commitment to movement infrastructure and digital continuity",
      "Jamie offered to preserve meeting knowledge and contacts in a shared campaign-memory structure"
    ],
    doesNotEstablish: [
      "permission to quote participants",
      "completion of every proposed system",
      "sole ownership of the collaboration",
      "public availability of the transcript"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-APRIL-15-TRANSCRIPT-2026"
  },
  {
    id: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
    title: "Open Data Foundation for a Future Commercial Rent Guidelines Board",
    organization: "NYC Artist Coalition",
    author: "James 'Jamie' Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2025-11-26",
    publicCitation: "James 'Jamie' Burkart for NYC Artist Coalition, 'Open Data Foundation for a Future Commercial Rent Guidelines Board,' November 26, 2025 (protected policy memo).",
    publicNote: "Policy-neutral proposal for privacy-conscious aggregate commercial-rent and vacancy data infrastructure.",
    supportsGenerally: [
      "Jamie authored and signed the memo for NYC Artist Coalition",
      "the memo proposed machine-readable aggregate indicator tables and a short technical note",
      "the memo explicitly excluded proprietary microdata from its request"
    ],
    doesNotEstablish: [
      "adoption by the Comptroller or another agency",
      "official government policy",
      "legal advice or legal authority",
      "sole coalition authorship beyond the signed memo"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-OPEN-DATA-MEMO-2025"
  },
  {
    id: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    title: "Commercial Rent Stabilization: Legislative Provenance Redline, 2019-2025",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-05-16",
    publicCitation: "Jamie Burkart, NYC Artist Coalition, 'Commercial Rent Stabilization: Legislative Provenance Redline, 2019-2025,' updated May 16, 2026 (protected working document).",
    publicNote: "Unofficial discussion redline tracing source layers from NYC Council Intro 93 through Fair Rent NYC, Small Business Survival Act, and Albany S8319 lineages.",
    supportsGenerally: [
      "Jamie prepared the legislative provenance redline",
      "the artifact traces successive policy source layers and revision paths",
      "the artifact explicitly labels itself unofficial and not legal advice"
    ],
    doesNotEstablish: [
      "authorship of the underlying legislation",
      "official legislative history",
      "legal advice",
      "individual drafting authorship for every source layer"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-PROVENANCE-REDLINE-2026"
  },
  {
    id: "SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026",
    title: "Source-Backed Team Memory Sprint",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-06-26",
    publicCitation: "Jamie Burkart, 'Source-Backed Team Memory Sprint,' June 26, 2026 (protected proposal).",
    publicNote: "Two-page authored proposal defining a bounded, human-reviewed source-to-memory loop and concrete sprint deliverables.",
    supportsGenerally: [
      "Jamie authored the bounded Source-Backed Team Memory method",
      "the method uses approved sources, structured records, source-linked drafts, trust and privacy checks, and human correction",
      "the proposal defines a narrow sprint and explicit continue, revise, or stop decision"
    ],
    doesNotEstablish: [
      "client adoption",
      "a completed paid engagement",
      "production software",
      "company-wide deployment",
      "permission to publish client identity, pricing, correspondence, or company context"
    ],
    protectedLocatorId: "LOC-ICLOUD-JOB-HUNT-SOURCE-BACKED-MEMORY-PROPOSAL-2026"
  }
];

export const icloudTeamsObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-KC-TIRE-PICKUP-LEDGER-TOTALS",
    sourceId: "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022",
    project: "kansas-city-neighborhood-programs",
    text: "The protected spreadsheet records 1,970 tires across 25 nonzero monthly entries from May 2019 through September 2022 and calculates a modeled disposal-cost figure of $44,890.",
    locator: "Monthly count columns, total-count row, and modeled-savings row",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-KC-TIRE-PICKUP-LEDGER", "CLM-KC-TIRED-OF-TIRES-OPERATIONS"],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured spreadsheet review"]
  },
  {
    id: "OBS-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO",
    sourceId: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    project: "creative-technology-and-media",
    text: "Monthly Music Hackathon NYC documented Jamie making a Max/MSP program that divided an audio work into small segments and reordered the clips by pitch at its February 2013 event.",
    locator: "Project description and Jamie's method note",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-MUSIC-HACKATHON-SORTED-AUDIO"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "OBS-NTER-CHNG-PUBLIC-FUNCTION",
    sourceId: "SRC-NTER-CHNG-PITCH-2010",
    project: "creative-technology-and-media",
    text: "The Pitch described NTER CHNG as a software and architectural installation in which participant cellphone messages passed through both faces of a digital wall and accumulated into a virtual dialogue.",
    locator: "Event description",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-INTERACTIVE-INSTALLATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "OBS-NTER-CHNG-COLLECTIVE-CREDITS",
    sourceId: "SRC-NTER-CHNG-VIMEO-2011",
    project: "creative-technology-and-media",
    text: "The project video credits Drew Bolton, Jamie Burkart, and Garrett Fuselier as designers, Garrett as programmer, and Mary Nichols as helping engineer and construct the wall.",
    locator: "Video description and credits",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-INTERACTIVE-INSTALLATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "OBS-HORSE-LORDS-TRUTHERS-CREDITS",
    sourceId: "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
    project: "creative-technology-and-media",
    text: "The official Horse Lords video description credits M.C. Schmidt and Jamie Burkart with the video for Truthers.",
    locator: "Official video description",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "OBS-HORSE-LORDS-TRUTHERS-EDITORIAL-CONTEXT",
    sourceId: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
    project: "creative-technology-and-media",
    text: "NPR editorial coverage independently attributed the video to M.C. Schmidt and Jamie and reported the band's view that its visual repetition and variation mirrored the music.",
    locator: "Opening video discussion and Andrew Bernstein context",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "OBS-CRS-OPERATING-ARCHITECTURE-PLAN",
    sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
    project: "commercial-rent-stabilization",
    text: "Jamie's 90-day plan defines six shared public goods, five non-negotiable deliverables, and seventeen actions for a clear front door, recurring room, shared public line, stewarded story bank, implementation-readiness packet, and durable source-of-truth spine.",
    locator: "Role definition, shared public goods, deliverables, and numbered action plan",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-OPERATING-ARCHITECTURE-PLAN"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-CRS-RUNNING-MINUTES-STRUCTURE",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
    project: "commercial-rent-stabilization",
    text: "The collaboration record assigns Jamie the running-minutes and shared-knowledge structure and organizes meetings, decisions, open questions, owners, action items, city/state lanes, participation guidance, and standing templates.",
    locator: "Purpose, live action list, April 8 and April 15 minutes, standing agenda, and participation ladder",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-SHARED-MEMORY-SYSTEM"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-CRS-RUNNING-MINUTES-CONSENT-TIERS",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
    project: "commercial-rent-stabilization",
    text: "The running minutes distinguish Public, Anonymized, Confidential/internal only, and Needs follow-up consent levels for business stories and participant context.",
    locator: "Business-story consent and confidentiality protocol",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-SHARED-MEMORY-SYSTEM"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-CRS-TRANSCRIPT-MEMORY-COMMITMENT",
    sourceId: "SRC-CRS-APRIL-15-TRANSCRIPT-2026",
    project: "commercial-rent-stabilization",
    text: "A private April 15 call transcript corroborates Jamie offering to preserve meeting knowledge, contacts, and continuity in a shared movement knowledge base.",
    locator: "Jamie's movement-infrastructure and knowledge-base discussion",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-SHARED-MEMORY-SYSTEM"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex private-transcript review"]
  },
  {
    id: "OBS-CRS-OPEN-DATA-MEMO",
    sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
    project: "commercial-rent-stabilization",
    text: "Jamie authored and signed a policy memo for NYC Artist Coalition requesting machine-readable aggregate commercial-real-estate indicator tables and a short technical note for a future Commercial Rent Guidelines Board while explicitly excluding proprietary microdata.",
    locator: "Memo requests, minimum data suite, safeguards, and signature",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-OPEN-DATA-FOUNDATION-MEMO"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
    sourceId: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    project: "commercial-rent-stabilization",
    text: "The redline identifies Jamie as preparer and traces source layers from NYC Council Intro 93 through Fair Rent NYC recommendations, Small Business Survival Act lineage, and Albany revisions leading to S8319 while labeling itself unofficial and not legal advice.",
    locator: "Title page, how-to-read note, source-layer description, and closing disclaimer",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-SOURCE-BACKED-MEMORY-BOUNDED-LOOP",
    sourceId: "SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026",
    project: "source-backed-team-memory",
    text: "The proposal defines a bounded source-to-memory loop: approved source, structured record, source-linked draft, ideas/decisions/open questions, trust and privacy check, and accepted team memory, with human correction feeding back into the record.",
    locator: "Page 1, source-to-memory loop",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD"],
    researchInquiryIds: ["INQ-SOURCE-BACKED-MEMORY-OUTCOMES-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual PDF review"]
  },
  {
    id: "OBS-SOURCE-BACKED-MEMORY-DELIVERABLES",
    sourceId: "SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026",
    project: "source-backed-team-memory",
    text: "The proposal limits the sprint to one approved non-sensitive or synthetic source and one narrow use case, with a knowledge-friction map, source/workflow inventory, decision and meeting templates, onboarding page, small prototype, privacy/access/retention notes, and a continue/revise/stop memo.",
    locator: "Pages 1-2, scope and deliverables",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD"],
    researchInquiryIds: ["INQ-SOURCE-BACKED-MEMORY-OUTCOMES-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual PDF review"]
  }
];

export const icloudTeamsClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-KC-TIRE-PICKUP-LEDGER",
    project: "kansas-city-neighborhood-programs",
    internalClaim: "A KC Town Hall project ledger records 1,970 tires across 25 nonzero monthly entries from May 2019 through September 2022 and models $44,890 in disposal costs.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A protected KC Town Hall project ledger records 1,970 tires across 25 nonzero monthly entries from May 2019 through September 2022 and models $44,890 in disposal costs.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/kansas-city-neighborhood-programs"]
    }],
    evidence: [{
      sourceId: "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022",
      relationship: "direct-support",
      supports: ["monthly date span", "1,970-tire total", "25 nonzero monthly entries", "modeled $44,890 figure"],
      locator: "Monthly count columns, total-count row, and modeled-savings row",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The spreadsheet is a project-maintained ledger, not an independent audit.",
      "The dollar figure is a model based on per-tire disposal assumptions, not independently verified realized savings.",
      "The ledger alone does not establish Jamie's sole operation, every pickup location, participant identities, or the complete program history."
    ],
    antiClaims: [
      "Jamie personally collected every tire in the ledger.",
      "The City independently certified the 1,970 total.",
      "$44,890 was paid, awarded, or independently verified as realized savings."
    ],
    researchInquiryIds: ["INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured spreadsheet review"]
  },
  {
    id: "CLM-MUSIC-HACKATHON-SORTED-AUDIO",
    project: "creative-technology-and-media",
    internalClaim: "At a February 2013 Monthly Music Hackathon NYC event, Jamie made a Max/MSP prototype that segmented audio and reordered clips by pitch.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "At a 2013 Monthly Music Hackathon NYC event, Jamie built a Max/MSP prototype that segmented audio and reordered clips by pitch.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
    }],
    evidence: [{
      sourceId: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      relationship: "direct-support",
      supports: ["Jamie attribution", "Max/MSP implementation", "audio segmentation", "pitch-based reordering"],
      locator: "Project description and Jamie's method note",
      publicNote: "Contemporaneous event documentation.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Describe this as a hackathon prototype, not a production product or commercial deployment.",
      "Do not infer adoption, performance quality, or long-term development from the event page."
    ],
    antiClaims: ["Jamie launched a production audio product.", "The prototype was adopted commercially."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
    project: "creative-technology-and-media",
    internalClaim: "Jamie co-designed NTER CHNG with Drew Bolton and Garrett Fuselier, a 2010 interactive installation that combined software, texting, and a two-sided digital wall; Mary Nichols helped engineer and construct the wall and Garrett is credited as programmer.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie co-designed NTER CHNG, a 2010 real-time texting installation combining software and a two-sided digital wall, with Drew Bolton and Garrett Fuselier; Mary Nichols helped engineer and construct the wall.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
    }],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-PITCH-2010",
        relationship: "direct-support",
        supports: ["2010 public presentation", "software and architectural form", "real-time participant messaging", "digital-wall interaction"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-VIMEO-2011",
        relationship: "direct-support",
        supports: ["collective designer credits", "Garrett's programmer credit", "Mary's engineering and construction credit"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve Drew Bolton, Garrett Fuselier, and Mary Nichols in the project credit.",
      "Do not transfer Garrett's programmer credit to Jamie.",
      "Attendance, message volume, and long-term deployment are not recovered."
    ],
    antiClaims: ["Jamie solely created NTER CHNG.", "Jamie programmed NTER CHNG.", "NTER CHNG reached a quantified audience."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
    project: "creative-technology-and-media",
    internalClaim: "Jamie co-created Horse Lords' Truthers video with M.C. Schmidt; the official credit and independent NPR coverage attribute the work to both collaborators.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie co-created Horse Lords' Truthers video with M.C. Schmidt; official credits and NPR reporting attribute the work to both collaborators.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
    }],
    evidence: [
      {
        sourceId: "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
        relationship: "direct-support",
        supports: ["official shared video credit", "relationship to Horse Lords' Truthers"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
        relationship: "corroborating",
        supports: ["independent shared attribution", "editorial context linking visual form and musical structure"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Always preserve M.C. Schmidt's co-creator credit.",
      "Do not infer sole direction, the complete labor division, viewership, or commercial outcomes."
    ],
    antiClaims: ["Jamie solely directed the Truthers video.", "The video achieved an unrecovered audience or sales outcome."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and archive review"]
  },
  {
    id: "CLM-CRS-OPERATING-ARCHITECTURE-PLAN",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie authored a 90-day operating-architecture plan for Fair Rent NYC and Commercial Rent Stabilization defining six shared public goods, five non-negotiable deliverables, seventeen actions, distributed ownership, and explicit collective-work boundaries.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie authored a 90-day operating plan around six shared public goods: a clear front door, recurring room, shared public line, stewarded story bank, implementation-readiness packet, and durable source-of-truth spine.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text: "Jamie authored a 90-day operating-architecture plan defining a clear front door, recurring room, shared public line, stewarded story bank, implementation-readiness packet, and durable source-of-truth spine.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory"]
      }
    ],
    evidence: [{
      sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
      relationship: "direct-support",
      supports: ["Jamie authorship", "six shared public goods", "five deliverables", "seventeen actions", "collective-work boundary"],
      locator: "Role definition, shared public goods, deliverables, and action plan",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "This claim establishes authorship of a plan, not completion of every action or adoption by every collaborator.",
      "Do not convert Jamie's internal role framing into movement-wide authority or sole-organizer status."
    ],
    antiClaims: ["Jamie completed all seventeen actions.", "Every collaborator adopted the plan.", "Jamie led or spoke for the entire movement."],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "CLM-CRS-SHARED-MEMORY-SYSTEM",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie created and stewarded a shared Commercial Rent Stabilization operating-memory structure spanning decisions, owners, action items, open questions, city/state lanes, consent levels, and participation and meeting templates.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie created and stewarded a shared campaign-memory system organizing decisions, owners, open questions, city/state lanes, consent levels, and next steps.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "work-card",
        text: "Shared campaign-memory architecture for decisions, ownership, consent, city/state strategy, and continuity.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work"]
      },
      {
        key: "archive-note",
        text: "Protected working records support Jamie's direct role creating and stewarding the collaboration's running-minutes and knowledge structure.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
        relationship: "direct-support",
        supports: ["Jamie assignment", "running-minutes structure", "decisions and action ownership", "city/state lanes", "consent levels", "participation templates"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-APRIL-15-TRANSCRIPT-2026",
        relationship: "private-support",
        supports: ["Jamie's stated movement-infrastructure intent", "shared knowledge-base commitment"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-90-DAY-ACTION-PLAN-2026",
        relationship: "corroborating",
        supports: ["operating architecture", "source-of-truth spine", "distributed ownership"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records are protected collaboration artifacts, not independent audits of every action or outcome.",
      "Do not publish private story leads, contact data, verbatim meeting records, strategy, legal-review context, or participant material.",
      "Use collective-work language and do not imply Jamie owned the campaign or spoke for every collaborator."
    ],
    antiClaims: ["Jamie alone led Commercial Rent Stabilization advocacy.", "The system made every campaign decision.", "All protected campaign records are public."],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document and private-transcript review"]
  },
  {
    id: "CLM-CRS-OPEN-DATA-FOUNDATION-MEMO",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie authored and signed a policy-neutral NYC Artist Coalition memo proposing a privacy-conscious, machine-readable aggregate commercial-rent and vacancy baseline and a short technical note for a future Commercial Rent Guidelines Board.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie authored a policy-neutral data memo proposing machine-readable aggregate rent and vacancy indicators for a future Commercial Rent Guidelines Board, with privacy and licensing safeguards.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text: "The protected memo establishes an authored public-data proposal, not government adoption.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory"]
      }
    ],
    evidence: [{
      sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
      relationship: "direct-support",
      supports: ["Jamie authorship and signature", "aggregate indicator-table proposal", "technical-note proposal", "privacy and licensing safeguards", "microdata exclusion"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Describe the artifact as a proposal, not adopted policy or an implemented data system.",
      "Preserve NYC Artist Coalition context and do not expose the protected memo's address, email, signature image, or correspondence.",
      "Do not imply legal authority or access to proprietary microdata."
    ],
    antiClaims: ["The Comptroller adopted Jamie's proposal.", "Jamie created an official Commercial Rent Guidelines Board data system.", "Jamie obtained proprietary commercial microdata."],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie prepared an unofficial legislative provenance redline tracing Commercial Rent Stabilization text across NYC Council Intro 93, Fair Rent NYC recommendations, Small Business Survival Act lineage, and Albany revisions leading to S8319.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie prepared an unofficial provenance redline making visible how Commercial Rent Stabilization language moved across city, campaign, and state legislative source layers.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text: "The artifact is an authored discussion tool, explicitly not official legislative history or legal advice.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory"]
      }
    ],
    evidence: [{
      sourceId: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      relationship: "direct-support",
      supports: ["Jamie preparer credit", "legislative source layers", "revision paths", "unofficial and not-legal-advice disclaimer"],
      locator: "Title page, how-to-read note, and closing disclaimer",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Always label the redline unofficial, for discussion, and not legal advice.",
      "Reviewer names identify source layers rather than individual drafting authorship.",
      "Do not claim Jamie authored the legislation or created an official legislative history."
    ],
    antiClaims: ["Jamie authored S8319.", "The redline is official legislative history.", "The document provides legal advice."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD",
    project: "source-backed-team-memory",
    internalClaim: "Jamie authored a bounded Source-Backed Team Memory Sprint method using approved sources, structured records, source-linked drafts, trust and privacy checks, human correction, and a continue/revise/stop decision.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie developed a bounded method for reviewable, human-correctable, source-linked operating memory using one approved source and one narrow use case.",
        status: "active",
        citationRequired: false,
        surfaces: ["/lab/source-backed-team-memory"]
      },
      {
        key: "technical-operations",
        text: "Bounded source-to-memory workflow design with explicit human review, privacy checks, and continue/revise/stop criteria.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      },
      {
        key: "archive-note",
        text: "A protected two-page proposal establishes the authored method and scope, not client adoption or production deployment.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/opportunities/source-backed-team-memory"]
      }
    ],
    evidence: [{
      sourceId: "SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026",
      relationship: "direct-support",
      supports: ["Jamie authorship", "bounded source-to-memory loop", "human correction", "privacy and trust checks", "sprint deliverables", "continue/revise/stop decision"],
      locator: "Two-page proposal",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "This is an authored method and proposal, not evidence of client adoption, a completed engagement, or production software.",
      "Do not name the prospective client, publish pricing, quote private correspondence, or reveal private company context.",
      "AI drafts remain subject to human review and correction."
    ],
    antiClaims: ["Jamie deployed a production AI memory platform for a client.", "The method automates trust.", "The system replaces human judgment."],
    researchInquiryIds: ["INQ-SOURCE-BACKED-MEMORY-OUTCOMES-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual PDF review"]
  }
];

export const icloudTeamsResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026",
    project: "commercial-rent-stabilization",
    question: "Which planned Commercial Rent Stabilization operating deliverables were completed, adopted, and sustained by collaborators, and what public-safe outcomes followed?",
    methods: [
      "Compare the April 2026 action plan with later running minutes, action trackers, published materials, and collaborator-approved accounts.",
      "Separate authored plans, completed artifacts, collaborator adoption, policy influence, and public outcomes.",
      "Protect private strategy, legal-review context, contact records, and unapproved participant material."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A 90-day plan establishes Jamie's operating architecture and intended deliverables.",
      "Running minutes through April 29 establish a live shared record with Jamie assigned to the minutes and knowledge structure.",
      "A policy-data memo and legislative provenance redline establish two completed authored artifacts."
    ],
    limitations: [
      "The reviewed records do not establish completion of every planned action or adoption by every collaborator.",
      "Protected collaboration records are not independent outcome audits.",
      "Policy adoption and causal influence require separate public or collaborator-approved evidence."
    ],
    sourceIds: [
      "SRC-CRS-90-DAY-ACTION-PLAN-2026",
      "SRC-CRS-RUNNING-MINUTES-2026",
      "SRC-CRS-APRIL-15-TRANSCRIPT-2026",
      "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
      "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"
    ],
    publicSummary: "The archive confirms Jamie's operating architecture, shared campaign-memory structure, policy-data memo, and legislative provenance redline; broader adoption and outcomes remain open.",
    protectedLocatorId: "RESEARCH-ICLOUD-CRS-IMPLEMENTATION-2026"
  },
  {
    id: "INQ-SOURCE-BACKED-MEMORY-OUTCOMES-2026",
    project: "source-backed-team-memory",
    question: "Did the Source-Backed Team Memory Sprint proposal advance to an approved pilot, completed artifacts, or collaborator-validated outcomes?",
    methods: [
      "Review only public-safe or explicitly approved engagement records and artifacts.",
      "Separate proposal authorship from acceptance, delivery, adoption, and outcome claims.",
      "Protect client identity, pricing, correspondence, and company context unless explicit publication permission exists."
    ],
    resultStatus: "queued",
    findings: [],
    limitations: [
      "The current source establishes the method and proposed scope, not client adoption or delivery.",
      "Private commercial context and correspondence remain outside the public repository."
    ],
    sourceIds: ["SRC-SOURCE-BACKED-TEAM-MEMORY-PROPOSAL-2026"],
    publicSummary: "The authored sprint method is confirmed; pilot adoption, delivery, and outcomes are not claimed."
  }
];
