import type {
  ClaimRecord,
  IntakeItem,
  ProjectRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const icloudArchiveProjects = [
  {
    id: "creative-technical-systems",
    title: "Creative Technical Systems",
    summary: "Early software, installation, sound, and moving-image collaborations that joined technical implementation with public or artistic experience.",
    status: "historical",
    period: { start: "2010", end: "2016" },
    entityIds: [],
    publicSurfaceCandidates: [],
    photoResearchPrompts: [
      "Interfaces, installation views, working sessions, projection tests, and credited public artifacts for NTER CHNG, the Monthly Music Hackathon prototype, and the Horse Lords video, with collaborator and participant rights reviewed."
    ]
  },
  {
    id: "commercial-rent-stabilization-operations",
    title: "Commercial Rent Stabilization Operations",
    summary: "Research, documentation architecture, policy-lineage work, and privacy-aware collaboration systems supporting Fair Rent NYC and related commercial-rent-stabilization work.",
    status: "ongoing",
    period: { start: "2019" },
    entityIds: ["fair-rent-nyc-campaign", "nyc-artist-coalition"],
    publicSurfaceCandidates: ["/work/fair-rent-nyc", "/work/technical-operations"],
    photoResearchPrompts: [
      "Public hearings, research sessions, source maps, facilitation, and approved document surfaces that demonstrate operational work without exposing live strategy, private participants, or protected records."
    ]
  },
  {
    id: "source-backed-team-memory",
    title: "Source-Backed Team Memory",
    summary: "A bounded method for making decisions, sources, open questions, and protected context easier for knowledge-heavy teams to review and transfer.",
    status: "active",
    period: { start: "2026" },
    entityIds: [],
    publicSurfaceCandidates: ["/lab/source-backed-team-memory", "/work/technical-operations"],
    photoResearchPrompts: [
      "Reviewable source maps, decision-memory templates, annotated prototypes, and facilitation moments that show human correction and privacy boundaries without displaying private source contents."
    ]
  }
] satisfies ProjectRecord[];

export const icloudArchiveIntakes = [
  {
    id: "INT-2026-07-14-ICLOUD-MONTHLY-MUSIC-HACKATHON",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "A public Monthly Music Hackathon page describing Jamie's February 2013 Max/MSP audio-sorting prototype.",
    submittedUrl: "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2013-02-27"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-MONTHLY-MUSIC-SORTED-AUDIO-2013"],
    claimIds: ["CLM-MONTHLY-MUSIC-AUDIO-SORTING-PROTOTYPE"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-ICLOUD-HORSE-LORDS-TRUTHERS",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "NPR Illinois publication and credit for the Horse Lords 'Truthers' video co-created by Jamie Burkart and M.C. Schmidt.",
    submittedUrl: "https://www.nprillinois.org/the-x/2016-04-29/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2016-04-29"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-NPR-ILLINOIS-HORSE-LORDS-TRUTHERS-2016"],
    claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO-CREDIT"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-ICLOUD-NTER-CHNG-PITCH",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "The Pitch's 2010 description of NTER CHNG as an interactive texting software and architectural installation.",
    submittedUrl: "https://www.thepitchkc.com/ntr-chng/",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2010-01-07"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-NTER-CHNG-PITCH-2010"],
    claimIds: ["CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-ICLOUD-NTER-CHNG-VIMEO",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "The public NTER CHNG Vimeo record naming Drew Bolton, Jamie Burkart, and Garrett Fuselier as the interactive installation's creators.",
    submittedUrl: "https://vimeo.com/21395655",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-03-23"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-NTER-CHNG-VIMEO-2011"],
    claimIds: ["CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-ICLOUD-CREATENYC-APPENDIX",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "A City-hosted CreateNYC appendix preserving NYC Artist Coalition's March 2017 collective recommendations for community-driven spaces.",
    submittedUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-03-06", "2017-03-30"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-CREATENYC-NYCARTC-COMMUNITY-SPACES-2017"],
    claimIds: ["CLM-NYCARTC-CREATENYC-COLLECTIVE-RECOMMENDATIONS"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-ICLOUD-CRS-90-DAY-PLAN",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Jamie's April 2026 private operating plan for shared Fair Rent NYC and commercial-rent-stabilization infrastructure.",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign", "nyc-artist-coalition"],
    dateHints: ["2026-04-06"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-CRS-90-DAY-OPERATING-PLAN-2026"],
    claimIds: ["CLM-CRS-90-DAY-OPERATING-PLAN"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-CRS-OPERATING-PLAN-2026-001"
  },
  {
    id: "INT-2026-07-14-ICLOUD-CRS-RUNNING-MINUTES",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "A private 2026 commercial-rent-stabilization running-minutes record with explicit consent, privacy, decision, and action-tracking rules.",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign", "nyc-artist-coalition"],
    dateHints: ["2026-04", "2026-05"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-CRS-PRIVACY-AWARE-RUNNING-MINUTES-2026"],
    claimIds: ["CLM-CRS-PRIVACY-AWARE-RUNNING-MINUTES"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-CRS-RUNNING-MINUTES-2026-001"
  },
  {
    id: "INT-2026-07-14-ICLOUD-CRS-PROVENANCE-REDLINE",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Jamie's May 2026 unofficial legislative-provenance redline tracing commercial-rent-stabilization policy lineages from 2019 through 2025.",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign", "nyc-artist-coalition"],
    dateHints: ["2019-2025", "2026-05-16"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"],
    claimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-CRS-PROVENANCE-REDLINE-2026-001"
  },
  {
    id: "INT-2026-07-14-ICLOUD-CRS-RPIE-BASELINE",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Jamie's March 2026 public-data brief proposing a privacy-preserving aggregate baseline for commercial vacancy and lease cost.",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign"],
    dateHints: ["2026-03-27"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-CRS-RPIE-PUBLIC-BASELINE-BRIEF-2026"],
    claimIds: ["CLM-CRS-RPIE-PUBLIC-BASELINE-PROPOSAL"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-CRS-RPIE-BASELINE-2026-001"
  },
  {
    id: "INT-2026-07-14-ICLOUD-SOURCE-MEMORY-SPRINT",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Jamie's June 2026 proposal translating source-backed team memory into a bounded discovery and prototype engagement.",
    projectIds: ["source-backed-team-memory"],
    entityIds: [],
    dateHints: ["2026-06-26"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-SOURCE-BACKED-TEAM-MEMORY-SPRINT-2026"],
    claimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-BOUNDED-SPRINT"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-SOURCE-MEMORY-SPRINT-2026-001"
  },
  {
    id: "INT-2026-07-14-ICLOUD-JOB-HUNT-CONTEXT-OUTLINE",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex archival production",
    publicSafeDescription: "A private job-search context outline used as a research map to project families, role framing, and candidate evidence locations.",
    projectIds: ["source-backed-team-memory"],
    entityIds: [],
    dateHints: ["2026"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    claimIds: [],
    inquiryIds: ["INQ-JOB-HUNT-OUTLINE-CLAIM-VERIFICATION"],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CONTEXT-OUTLINE-2026-001"
  }
] satisfies IntakeItem[];

export const icloudArchiveSources = [
  {
    id: "SRC-MONTHLY-MUSIC-SORTED-AUDIO-2013",
    title: "A Sorted Audio File",
    organization: "Monthly Music Hackathon NYC",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2013-02-27",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    preferredPublicUrl: "canonical",
    publicCitation: "Monthly Music Hackathon NYC, 'A Sorted Audio File,' February 27, 2013.",
    publicNote: "The project page credits Jamie with a Max/MSP prototype that segmented audio and sorted clips by pitch.",
    locator: "Opening project description and quoted explanation of sorting pieces by pitch.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-ICLOUD-MONTHLY-MUSIC-HACKATHON"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"],
    supportsGenerally: [
      "Jamie's participation in the February 2013 Music Hackathon NYC",
      "a Max/MSP program that segmented audio",
      "sorting audio clips by pitch"
    ],
    doesNotEstablish: [
      "a production software release",
      "hackathon organizer status",
      "a prize or award",
      "adoption beyond the documented experiment"
    ]
  },
  {
    id: "SRC-NPR-ILLINOIS-HORSE-LORDS-TRUTHERS-2016",
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR Illinois",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.nprillinois.org/the-x/2016-04-29/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation: "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Illinois, April 29, 2016.",
    publicNote: "The article publishes the Horse Lords video and attributes it jointly to M.C. Schmidt and Jamie Burkart.",
    locator: "Paragraph introducing Andrew Bernstein's description of the video and naming M.C. Schmidt and Jamie Burkart.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-ICLOUD-HORSE-LORDS-TRUTHERS"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"],
    supportsGenerally: [
      "joint video credit for Jamie Burkart and M.C. Schmidt",
      "publication of the Horse Lords 'Truthers' video in 2016",
      "the artists' attributed account of the video's visual method"
    ],
    doesNotEstablish: [
      "solo authorship by Jamie",
      "album production credit",
      "audience or sales outcomes",
      "ownership of every visual or musical element"
    ]
  },
  {
    id: "SRC-NTER-CHNG-PITCH-2010",
    title: "NTER CHNG",
    organization: "The Pitch",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2010-01-07",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Pitch, 'NTER CHNG,' January 7, 2010.",
    publicNote: "Contemporaneous coverage describes NTER CHNG as software and architectural installation through which visitors exchanged messages on a digital wall.",
    locator: "Article description of the installation, cell-phone interaction, digital wall, and participant dialogue.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-ICLOUD-NTER-CHNG-PITCH"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"],
    supportsGenerally: [
      "NTER CHNG as software and architectural installation",
      "real-time participant texting through a digital wall",
      "combining participant messages into a shared virtual dialogue"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "sole authorship",
      "visitor counts",
      "long-term public outcomes"
    ]
  },
  {
    id: "SRC-NTER-CHNG-VIMEO-2011",
    title: "NTER CHNG",
    organization: "Vimeo",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-03-23",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://vimeo.com/21395655",
    preferredPublicUrl: "canonical",
    publicCitation: "NTER CHNG project video, Vimeo, March 23, 2011.",
    publicNote: "The project record credits Drew Bolton, Jamie Burkart, and Garrett Fuselier with the interactive texting installation and separately credits Mary Nichols for wall engineering and construction help.",
    locator: "Public video description and creator credits.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-ICLOUD-NTER-CHNG-VIMEO"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"],
    supportsGenerally: [
      "joint installation credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "separate wall-engineering and construction credit for Mary Nichols",
      "the installation's interactive texting format"
    ],
    doesNotEstablish: [
      "sole authorship by Jamie",
      "the allocation of each collaborator's technical responsibilities",
      "visitor counts",
      "institutional adoption"
    ]
  },
  {
    id: "SRC-CREATENYC-NYCARTC-COMMUNITY-SPACES-2017",
    title: "Preserve Community-Driven Spaces - NYC Artist Coalition",
    organization: "CreateNYC / NYC Artist Coalition",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-06",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "CreateNYC appendix preserving NYC Artist Coalition's March 2017 community-driven-spaces recommendations.",
    publicNote: "The City-hosted appendix preserves the coalition's collective recommendations and a March 30 town-hall record.",
    locator: "Pages 5-8 for the letter and recommendations; pages 11-13 for the March 30 gathering notes.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-ICLOUD-CREATENYC-APPENDIX"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"],
    supportsGenerally: [
      "NYC Artist Coalition's collective CreateNYC recommendations",
      "three themes of criminalization, support, and affordability",
      "recommendations including Cabaret Law repeal and M.A.R.C.H. transparency",
      "a coalition-co-hosted March 30, 2017 gathering"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship of the recommendations",
      "Jamie's complete role in the March 30 gathering",
      "adoption of every recommendation",
      "sole coalition causality for later policy outcomes"
    ]
  },
  {
    id: "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
    title: "Fair Rent NYC and Commercial Rent Stabilization 90-Day Action Plan",
    organization: "Jamie Burkart working archive",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-04-06",
    publicCitation: "Private April 2026 operating-plan artifact; underlying document withheld.",
    publicNote: "The record is represented only by public-safe metadata and an opaque archive locator.",
    locator: "Role definition, six shared public goods, five deliverables, sequencing, and first fourteen-day work plan.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-14-ICLOUD-CRS-90-DAY-PLAN"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "Jamie's authorship of an operating plan",
      "shared infrastructure and deliverable design",
      "sequencing and ownership boundaries",
      "implementation-readiness planning"
    ],
    doesNotEstablish: [
      "completion of every planned deliverable",
      "sole campaign leadership",
      "partner endorsement of every proposal",
      "policy enactment or implementation outcomes"
    ],
    protectedLocatorId: "ARCHIVE-CRS-OPERATING-PLAN-2026-001"
  },
  {
    id: "SRC-CRS-PRIVACY-AWARE-RUNNING-MINUTES-2026",
    title: "Commercial Rent Stabilization Collaboration Running Minutes",
    organization: "Private collaboration archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publicCitation: "Protected 2026 collaboration record; underlying document withheld.",
    publicNote: "Only its information-design pattern is represented; participant, strategy, and source details remain protected.",
    locator: "Purpose, consent and privacy rules, shared-language section, action list, ownership, status, and next-step fields.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-14-ICLOUD-CRS-RUNNING-MINUTES"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "a privacy-aware collaboration-memory structure",
      "decision, action, ownership, and open-question tracking",
      "explicit consent levels and sensitive-information exclusions"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of every record entry",
      "completion of every action item",
      "partner endorsement for public quotation",
      "permission to expose participants or strategy"
    ],
    protectedLocatorId: "ARCHIVE-CRS-RUNNING-MINUTES-2026-001"
  },
  {
    id: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    title: "Commercial Rent Stabilization Legislative Provenance Redline, 2019-2025",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-05-16",
    publicCitation: "Private May 2026 legislative-provenance artifact; underlying document withheld.",
    publicNote: "The record is an unofficial discussion tool, not legal advice or a claim of individual legislative authorship.",
    locator: "Title and provenance note, source-layer explanation, and tracked lineage among Intro 93, Fair Rent NYC, SBJSA, and S8319.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-14-ICLOUD-CRS-PROVENANCE-REDLINE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "Jamie's authorship of the provenance redline",
      "mapping of legislative and recommendation lineages from 2019 through 2025",
      "explicit distinction between source layers and individual drafting credit"
    ],
    doesNotEstablish: [
      "legal advice",
      "Jamie's authorship of underlying legislative language",
      "legal review or legislative endorsement",
      "enactment of the mapped proposals"
    ],
    protectedLocatorId: "ARCHIVE-CRS-PROVENANCE-REDLINE-2026-001"
  },
  {
    id: "SRC-CRS-RPIE-PUBLIC-BASELINE-BRIEF-2026",
    title: "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-03-27",
    publicCitation: "Private March 2026 public-data proposal; underlying document withheld.",
    publicNote: "The artifact proposes a smallest-serious privacy-preserving pilot; it is not an agency commitment or released dataset.",
    locator: "Plain-language ask, minimum viable pilot, proposed fields, privacy exclusions, use cases, and next steps.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-14-ICLOUD-CRS-RPIE-BASELINE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "Jamie's authorship of a privacy-preserving open-data pilot brief",
      "translation of administrative filings into aggregate indicator requirements",
      "methods, coverage, suppression, and privacy boundaries",
      "a scoped minimum viable pilot"
    ],
    doesNotEstablish: [
      "agency adoption",
      "a released dataset",
      "access to or publication of raw filings",
      "measured vacancy or lease-cost outcomes"
    ],
    protectedLocatorId: "ARCHIVE-CRS-RPIE-BASELINE-2026-001"
  },
  {
    id: "SRC-SOURCE-BACKED-TEAM-MEMORY-SPRINT-2026",
    title: "Source-Backed Team Memory Sprint",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publishedAt: "2026-06-26",
    publicCitation: "Private June 2026 discovery and prototype proposal; underlying document withheld.",
    publicNote: "Commercial and collaborator details remain protected; only the bounded method and proposed deliverable pattern are represented.",
    locator: "Purpose, approved-source-bundle boundary, deliverables, human-review workflow, privacy and retention notes, and continue-revise-stop decision.",
    projectIds: ["source-backed-team-memory"],
    intakeIds: ["INT-2026-07-14-ICLOUD-SOURCE-MEMORY-SPRINT"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "Jamie's authorship of a bounded discovery and prototype engagement design",
      "an approved-source-bundle constraint",
      "knowledge-friction mapping and reusable memory structures",
      "human review and privacy, access, and retention boundaries",
      "a continue-revise-stop recommendation"
    ],
    doesNotEstablish: [
      "a completed client engagement",
      "a production software platform",
      "broad ingestion of private company archives",
      "client endorsement or measured outcome"
    ],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-SOURCE-MEMORY-SPRINT-2026-001"
  },
  {
    id: "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026",
    title: "Job-Hunt Context Outline",
    organization: "Jamie Burkart working archive",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    publicCitation: "Private 2026 research-orientation document; underlying document withheld.",
    publicNote: "The outline is a map to potential evidence, not independent proof of its summarized claims.",
    locator: "Role framing, project families, candidate claims, source locations, and verification cautions.",
    projectIds: ["source-backed-team-memory"],
    intakeIds: ["INT-2026-07-14-ICLOUD-JOB-HUNT-CONTEXT-OUTLINE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"],
    supportsGenerally: [
      "research orientation across project families",
      "candidate role framing",
      "locations where stronger primary or public evidence may be found",
      "explicit warnings against copying private material directly"
    ],
    doesNotEstablish: [
      "independent verification of summarized claims",
      "accuracy of every metric",
      "publication permission for private source material",
      "a substitute for close reading of underlying records"
    ],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CONTEXT-OUTLINE-2026-001"
  }
] satisfies SourceRecord[];

export const icloudArchiveClaims = [
  {
    id: "CLM-MONTHLY-MUSIC-AUDIO-SORTING-PROTOTYPE",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "A February 2013 Monthly Music Hackathon page credits Jamie with building a Max/MSP prototype that segmented audio and reordered clips by pitch.",
    status: "confirmed",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "At the February 2013 Music Hackathon NYC, Jamie built a Max/MSP prototype that segmented audio and reordered clips by pitch.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-MONTHLY-MUSIC-SORTED-AUDIO-2013",
      relationship: "direct-support",
      supports: ["Jamie attribution", "Max/MSP implementation", "audio segmentation", "pitch sorting"],
      locator: "Opening project description and Jamie's quoted explanation.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["This is a documented hackathon prototype, not a production release or adoption claim."],
    antiClaims: ["Jamie organized the hackathon or won an award for the prototype."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"]
  },
  {
    id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-CREDIT",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "NPR Illinois attributed the 2016 'Truthers' video for Horse Lords jointly to Jamie Burkart and M C Schmidt.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "Jamie co-created the 2016 'Truthers' video for Horse Lords with M.C. Schmidt, as credited by NPR Illinois.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NPR-ILLINOIS-HORSE-LORDS-TRUTHERS-2016",
      relationship: "direct-support",
      supports: ["joint video credit", "publication", "2016 chronology"],
      locator: "Paragraph naming M.C. Schmidt and Jamie Burkart as the video's creators.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["Always preserve M.C. Schmidt's co-credit and do not expand the claim to album production."],
    antiClaims: ["Jamie solely created the video or produced the Horse Lords album."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"]
  },
  {
    id: "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "NTER CHNG was an interactive texting installation created by Drew Bolton, Jamie Burkart, and Garrett Fuselier, with wall engineering and construction help from Mary Nichols.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "Jamie co-created NTER CHNG, an interactive texting software and architectural installation, with Drew Bolton and Garrett Fuselier; Mary Nichols helped engineer and construct the wall.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-PITCH-2010",
        relationship: "direct-support",
        supports: ["installation form", "participant interaction", "shared dialogue"],
        locator: "Article description of cell-phone input and the digital wall.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-VIMEO-2011",
        relationship: "direct-support",
        supports: ["creator credits", "Mary Nichols's separate contribution", "interactive texting format"],
        locator: "Public video description and credits.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Preserve the full collaborator credit and do not infer the division of technical labor."],
    antiClaims: ["Jamie solely authored NTER CHNG."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"]
  },
  {
    id: "CLM-NYCARTC-CREATENYC-COLLECTIVE-RECOMMENDATIONS",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A City-hosted CreateNYC appendix preserves NYC Artist Coalition's March 2017 collective recommendations on criminalization, support, and affordability for community-driven spaces.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "In March 2017, NYC Artist Coalition submitted collective CreateNYC recommendations addressing criminalization, support, and affordability for community-driven spaces.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-CREATENYC-NYCARTC-COMMUNITY-SPACES-2017",
      relationship: "direct-support",
      supports: ["collective recommendations", "three issue themes", "March 2017 chronology"],
      locator: "Pages 5-8 of the City-hosted appendix.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The document is signed collectively by NYC Artist Coalition and does not allocate individual authorship."],
    antiClaims: ["Jamie alone wrote the recommendations or caused their later adoption."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex archival close reading"]
  },
  {
    id: "CLM-CRS-90-DAY-OPERATING-PLAN",
    project: "commercial-rent-stabilization-operations",
    claimType: "activity",
    internalClaim: "Jamie authored an internal 90-day operating plan that defined shared campaign infrastructure, deliverables, sequencing, and role boundaries for Fair Rent NYC and commercial-rent-stabilization work.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [{
      key: "technical-operations",
      text: "Designed a 90-day operating plan for shared campaign infrastructure, deliverables, sequencing, and ownership boundaries.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
      relationship: "private-support",
      supports: ["authorship", "operating model", "deliverable design", "role boundaries"],
      locator: "Role definition, shared public goods, deliverables, and sequencing.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The plan records intended work, not completion, partner endorsement, or sole leadership."],
    antiClaims: ["Jamie completed every planned deliverable or directed the entire movement."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"]
  },
  {
    id: "CLM-CRS-PRIVACY-AWARE-RUNNING-MINUTES",
    project: "commercial-rent-stabilization-operations",
    claimType: "activity",
    internalClaim: "Jamie's private working archive documents his stewardship of a privacy-aware collaboration record organized around decisions, actions, open questions, ownership, and consent levels.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [{
      key: "technical-operations",
      text: "Stewarded a privacy-aware collaboration record for decisions, actions, open questions, ownership, and consent levels.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-CRS-PRIVACY-AWARE-RUNNING-MINUTES-2026",
      relationship: "private-support",
      supports: ["information architecture", "privacy rules", "decision and action tracking"],
      locator: "Purpose, privacy rules, shared language, action list, and ownership fields.",
      confidence: "moderate",
      renderCitation: false
    }],
    boundaries: ["The reviewed artifact demonstrates the system but does not independently establish sole authorship of every entry or permission to name participants."],
    antiClaims: ["Jamie made every collaboration decision or may publish the protected running record."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"]
  },
  {
    id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
    project: "commercial-rent-stabilization-operations",
    claimType: "activity",
    internalClaim: "Jamie prepared an unofficial 2019-2025 legislative-provenance redline tracing source layers among Intro 93, Fair Rent NYC recommendations, SBJSA, and S8319.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "technical-operations",
      text: "Prepared an unofficial legislative-provenance redline tracing commercial-rent-stabilization source layers from 2019 through 2025.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      relationship: "private-support",
      supports: ["Jamie's preparation of the provenance redline", "legislative lineage mapping", "source-layer boundaries"],
      locator: "Title, provenance note, source-layer explanation, and tracked lineage.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The artifact is an unofficial discussion tool, not legal advice or a claim that Jamie drafted the underlying laws."],
    antiClaims: ["Jamie authored the underlying legislation or provided legal advice."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"]
  },
  {
    id: "CLM-CRS-RPIE-PUBLIC-BASELINE-PROPOSAL",
    project: "commercial-rent-stabilization-operations",
    claimType: "activity",
    internalClaim: "Jamie authored a privacy-preserving open-data pilot brief translating RPIE administrative filings into scoped aggregate commercial-vacancy and lease-cost indicators.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "technical-operations",
      text: "Scoped a privacy-preserving open-data pilot for aggregate commercial-vacancy and lease-cost indicators derived from administrative filings.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-CRS-RPIE-PUBLIC-BASELINE-BRIEF-2026",
      relationship: "private-support",
      supports: ["Jamie's authorship", "pilot scope", "privacy boundary", "data and methods requirements"],
      locator: "Plain-language ask, minimum viable pilot, fields, exclusions, and next steps.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["This is a proposal, not an agency commitment, released dataset, or measured outcome."],
    antiClaims: ["New York City adopted the proposal or released the requested dataset."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"]
  },
  {
    id: "CLM-SOURCE-BACKED-TEAM-MEMORY-BOUNDED-SPRINT",
    project: "source-backed-team-memory",
    claimType: "activity",
    internalClaim: "Jamie translated source-backed team memory into a bounded discovery and prototype engagement with an approved source bundle, human review, privacy controls, and a continue-revise-stop decision.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "archive-note",
      text: "In June 2026, Jamie translated Source-Backed Team Memory into a bounded discovery and prototype sprint with an approved source bundle, human review, privacy controls, and a continue-revise-stop recommendation.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-SOURCE-BACKED-TEAM-MEMORY-SPRINT-2026",
      relationship: "private-support",
      supports: ["Jamie's authorship", "bounded engagement design", "proposed deliverables", "privacy and human-review boundaries"],
      locator: "Purpose, source-bundle boundary, deliverables, workflow, and thirty-day recommendation.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The proposal establishes method and engagement design, not completion, client adoption, or production deployment."],
    antiClaims: ["Jamie delivered a production AI memory platform for a client."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private archival close reading"]
  }
] satisfies ClaimRecord[];

export const icloudArchiveResearchInquiries = [
  {
    id: "INQ-JOB-HUNT-OUTLINE-CLAIM-VERIFICATION",
    project: "source-backed-team-memory",
    intakeIds: ["INT-2026-07-14-ICLOUD-JOB-HUNT-CONTEXT-OUTLINE"],
    question: "Which candidate claims in the private job-hunt context outline can be promoted after underlying public, approved, or primary records are closely read?",
    methods: [
      "Used the outline as a selective research map rather than factual evidence.",
      "Compared its project families with already recovered public records and separately reviewed private artifacts.",
      "Promoted only claims supported by the underlying records and left the outline itself as orientation."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The outline usefully organizes the portfolio around technical project management, product operations, civic technology, documentation architecture, and source-backed knowledge systems.",
      "Independent close reading recovered additional public creative-technical sources and private operating artifacts without treating the outline's summaries as proof."
    ],
    limitations: [
      "The outline synthesizes Jamie's own archive and is not independent verification.",
      "Metrics, outcomes, and third-party assessments still require their underlying records.",
      "Private source language must not be copied into public composition without a separate safety and editorial review."
    ],
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    publicSummary: "The job-hunt outline remains a research map; only claims verified against underlying records are eligible for promotion.",
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CONTEXT-OUTLINE-2026-001"
  }
] satisfies ResearchInquiry[];
