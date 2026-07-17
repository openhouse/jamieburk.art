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
    summary: "Software, installation, sound, moving-image, and augmented-reality collaborations that joined technical implementation with public or artistic experience.",
    status: "historical",
    period: { start: "2006", end: "2022" },
    entityIds: [],
    publicSurfaceCandidates: [],
    photoResearchPrompts: [
      "Interfaces, installation views, working sessions, projection tests, and credited public artifacts for NTER CHNG, the Monthly Music Hackathon prototype, and the Horse Lords video, with collaborator and participant rights reviewed.",
      "NTER CHNG's 2011 restaging process: software and display tests, wall reconstruction, projection setup, floor markings, wiring, collaborator work sessions, gallery installation, and teardown, with private communications and complete labor credit protected.",
      "Time is Long installation views showing the extended VHS loop, paired monitors, gallery path, and visitor interaction, with image rights and participant consent reviewed.",
      "Claudette's Theatre on Wheels production and augmented-reality views: clickable tondos, source-video sessions, app tests, and credited collaborators, with Claudette's dignity and the footage rights protected."
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
  },
  {
    id: "professional-positioning-and-evaluation",
    title: "Professional Positioning and Evaluation",
    summary: "Editorial review, role framing, and evaluation practice used to make Jamie's experience clear, concrete, and supportable for hiring audiences.",
    status: "active",
    period: { start: "2026" },
    entityIds: [],
    publicSurfaceCandidates: ["/resume", "/work/technical-operations"],
    photoResearchPrompts: [
      "Approved course and certificate artifacts, evaluation diagrams, and resume-review working sessions that show iterative professional development without exposing private correspondence or unapproved drafts."
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
    id: "INT-2026-07-14-NTER-CHNG-ARCHIVED-SITE",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "The January 2011 Wayback capture of NTER CHNG's own project site, preserving the installation format, creator credit, and original Kansas City venue.",
    submittedUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-01-28"],
    sensitivity: "public-safe",
    availability: "archived",
    status: "promoted",
    sourceIds: ["SRC-NTER-CHNG-PROJECT-SITE-2011"],
    claimIds: ["CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"],
    inquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK"]
  },
  {
    id: "INT-2026-07-14-AMERICA-NOW-HERE-NTER-CHNG",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "America: Now and Here's archived June 2011 Kansas City post documenting NTER CHNG as an installation used by exhibition participants.",
    submittedUrl: "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-06-22"],
    sensitivity: "public-safe",
    availability: "archived",
    status: "promoted",
    sourceIds: ["SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    inquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK"]
  },
  {
    id: "INT-2026-07-14-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "America: Now and Here's archived launch summary dating its Kansas City installation to May 5-30, 2011.",
    submittedUrl: "https://web.archive.org/web/20121017085303/http://americanowandhere.org/2011/06/america-now-and-here-launch-installations-and-next-steps/",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-05-05", "2011-05-30", "2011-06-21"],
    sensitivity: "public-safe",
    availability: "archived",
    status: "promoted",
    sourceIds: ["SRC-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    inquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK"]
  },
  {
    id: "INT-2026-07-14-NERMAN-AMERICA-NOW-HERE",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "Nerman Museum's publication of Alice Thorson's Kansas City Star preview of the 2011 America: Now and Here Kansas City launch.",
    submittedUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2011-04-30", "2011-05-11", "2011-05-12"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-NERMAN-AMERICA-NOW-HERE-KC-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    inquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK"]
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
  },
  {
    id: "INT-2026-07-15-ICLOUD-TIME-IS-LONG",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Cool Hunting's 2006 description of Jamie's participatory VHS installation Time is Long.",
    submittedUrl: "https://coolhunting.com/culture/bap-lab-part-1/",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2006-07-22", "2006-08-01"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-COOL-HUNTING-TIME-IS-LONG-2006"],
    claimIds: ["CLM-TIME-IS-LONG-VHS-INSTALLATION"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-15-ICLOUD-CLAUDETTE-AR-PUBLIC",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Michael Rees's public project page crediting Jamie and collaborators for Claudette's Theatre on Wheels augmented-reality work and source video.",
    submittedUrl: "https://michaelrees.org/claudette",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2017", "2022"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-MICHAEL-REES-CLAUDETTE-AR-2022"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-15-ICLOUD-CLAUDETTE-CORRESPONDENCE",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Protected 2022 production correspondence about the Claudette's Theatre on Wheels augmented-reality implementation.",
    projectIds: ["creative-technical-systems"],
    entityIds: [],
    dateHints: ["2022-07-29", "2022-08-22"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-ICLOUD-CLAUDETTE-IMPLEMENTATION-CORRESPONDENCE-2022"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-JPH-CLAUDETTE-CORRESPONDENCE-2022-001"
  },
  {
    id: "INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-HISTORY",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "The public revision history recording creation, editing, and mainspace publication of the NYC Artist Coalition Wikipedia article.",
    submittedUrl: "https://en.wikipedia.org/w/index.php?title=NYC_Artist_Coalition&action=history",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2025-12-20", "2025-12-27"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-WIKIPEDIA-NYCARTC-REVISION-HISTORY-2025"],
    claimIds: ["CLM-NYCARTC-WIKIPEDIA-ARCHIVAL-COLLABORATION"],
    inquiryIds: ["INQ-NYCARTC-WIKIPEDIA-PROVENANCE"]
  },
  {
    id: "INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Protected December 2025 working records for source compilation and collaborative editing of the NYC Artist Coalition Wikipedia draft.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2025-12-20", "2025-12-21", "2025-12-27"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE-2025"],
    claimIds: ["CLM-NYCARTC-WIKIPEDIA-ARCHIVAL-COLLABORATION"],
    inquiryIds: ["INQ-NYCARTC-WIKIPEDIA-PROVENANCE"],
    protectedLocatorId: "ARCHIVE-JPH-NYCARTC-WIKIPEDIA-COLLABORATION-2025-001"
  },
  {
    id: "INT-2026-07-15-ICLOUD-CRS-OPEN-DATA-WEEK-EVENT",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "The official Open Data Week listing for the March 26, 2026 NYC Council Data Team session Jamie attended.",
    submittedUrl: "https://opendataweek.nyc/event/from-data-to-policy-how-the-nyc-council-turns-city-data-into-action__trashed/",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign"],
    dateHints: ["2026-03-26"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-OPEN-DATA-WEEK-NYC-COUNCIL-DATA-SESSION-2026"],
    claimIds: ["CLM-CRS-RPIE-PROPOSAL-DELIVERY-2026"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-15-ICLOUD-CRS-RPIE-DELIVERY-RECORD",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Protected event transcript and print-preparation record documenting Jamie's delivery and discussion of commercial-vacancy and RPIE open-data materials.",
    projectIds: ["commercial-rent-stabilization-operations"],
    entityIds: ["fair-rent-nyc-campaign"],
    dateHints: ["2026-03-26"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-CRS-RPIE-DELIVERY-CONVERSATION-2026"],
    claimIds: ["CLM-CRS-RPIE-PROPOSAL-DELIVERY-2026"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-CRS-RPIE-DELIVERY-2026-001"
  },
  {
    id: "INT-2026-07-15-ICLOUD-JOB-HUNT-CHAD-REVIEW",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Protected March 2026 resume review underlying the portfolio's Chad-lens editorial criteria.",
    projectIds: ["professional-positioning-and-evaluation"],
    entityIds: [],
    dateHints: ["2026-03-01"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JOB-HUNT-CHAD-EDITORIAL-REVIEW-2026"],
    claimIds: ["CLM-CHAD-LENS-EDITORIAL-GUIDANCE"],
    inquiryIds: [],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CHAD-REVIEW-2026-001"
  },
  {
    id: "INT-2026-07-15-ICLOUD-JOB-HUNT-MAVEN-COURSE",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex archival production",
    publicSafeDescription: "Protected March 2026 Maven course-home capture documenting Jamie's enrollment and active course access.",
    projectIds: ["professional-positioning-and-evaluation"],
    entityIds: [],
    dateHints: ["2026-03-17"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JOB-HUNT-MAVEN-AI-EVALS-COURSE-2026"],
    claimIds: ["CLM-AI-EVALS-CERTIFICATE-COMPLETION-2026"],
    inquiryIds: ["INQ-AI-EVALS-COMPLETION-PROVENANCE"],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-MAVEN-COURSE-2026-001"
  },
  {
    id: "INT-2026-07-15-AI-EVALS-CERTIFICATE",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "Maven certificate documenting James Burkart's completion of AI Evals For Engineers & PMs.",
    projectIds: ["professional-positioning-and-evaluation"],
    entityIds: [],
    dateHints: ["2026"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-MAVEN-AI-EVALS-CERTIFICATE-2026"],
    claimIds: ["CLM-AI-EVALS-CERTIFICATE-COMPLETION-2026"],
    inquiryIds: ["INQ-AI-EVALS-COMPLETION-PROVENANCE"],
    protectedLocatorId: "ARCHIVE-AI-EVALS-CERTIFICATE-2026-001"
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
    id: "SRC-NTER-CHNG-PROJECT-SITE-2011",
    title: "NTER CHNG",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation: "NTER CHNG project site, archived January 28, 2011.",
    publicNote: "The project's own archived homepage calls NTER CHNG an interactive texting installation and credits Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
    locator: "Page title, description metadata, and the installation, creator, and Arts Incubator Cocoon Gallery lines.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-NTER-CHNG-ARCHIVED-SITE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Wayback close reading"],
    supportsGenerally: [
      "NTER CHNG as an interactive texting installation",
      "joint creator credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "presentation at the Arts Incubator Cocoon Gallery in Kansas City"
    ],
    doesNotEstablish: [
      "the division of technical labor among the creators",
      "Mary Nichols's separately documented wall contribution",
      "inclusion in America: Now and Here",
      "commissioning or acquisition by an institution"
    ]
  },
  {
    id: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
    title: "I Text, Therefore I Am",
    organization: "America: Now and Here",
    author: "BProffer",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2011-06-22",
    capturedAt: "2012-10-17T09:05:12Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
    preferredPublicUrl: "archive",
    publicCitation: "America: Now and Here, 'I Text, Therefore I Am,' June 22, 2011, archived October 17, 2012.",
    publicNote: "The exhibition's own Kansas City blog documents NTER CHNG in use by participants and describes text messages projected onto its floor-to-ceiling gauze display.",
    locator: "Post body paragraphs describing the America: Now and Here display, the named NTER CHNG installation, participant texting, and an opening-gala interaction.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-AMERICA-NOW-HERE-NTER-CHNG"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Wayback close reading"],
    supportsGenerally: [
      "NTER CHNG's inclusion in America: Now and Here's Kansas City exhibition",
      "participant use of the installation",
      "text-message projection onto a floor-to-ceiling white gauze display",
      "the installation's presence at the exhibition opening gala"
    ],
    doesNotEstablish: [
      "the installation's creator credits",
      "a commission by America: Now and Here",
      "ownership or acquisition by the exhibition",
      "visitor counts or measured audience outcomes"
    ]
  },
  {
    id: "SRC-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH-2011",
    title: "America: Now and Here Launch Installations and Next Steps",
    organization: "America: Now and Here",
    author: "DDunn",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2011-06-21",
    capturedAt: "2012-10-17T08:53:03Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20121017085303/http://americanowandhere.org/2011/06/america-now-and-here-launch-installations-and-next-steps/",
    preferredPublicUrl: "archive",
    publicCitation: "America: Now and Here, 'Launch Installations and Next Steps,' June 21, 2011, archived October 17, 2012.",
    publicNote: "The organizer's own summary dates the Kansas City installation to May 5-30, 2011 and describes the city as the project's launch.",
    locator: "Opening paragraph naming the Kansas City installation and its May 5-30 date range.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Wayback close reading"],
    supportsGenerally: [
      "America: Now and Here's Kansas City installation dates of May 5-30, 2011",
      "Kansas City as the project's launch",
      "collaboration with the Kansas City creative community"
    ],
    doesNotEstablish: [
      "NTER CHNG by name",
      "the installation's creator credits",
      "a complete exhibition roster",
      "specific attendance or participation totals"
    ]
  },
  {
    id: "SRC-NERMAN-AMERICA-NOW-HERE-KC-2011",
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art / The Kansas City Star",
    author: "Alice Thorson",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Alice Thorson, 'America: Now and Here - Barbara Kruger,' The Kansas City Star, April 30, 2011, republished by the Nerman Museum of Contemporary Art.",
    publicNote: "The preview describes America: Now and Here launching in Kansas City's Crossroads Arts District and situates the multidisciplinary national project alongside Kansas City artists.",
    locator: "Article opening and paragraphs describing the Kansas City launch, multidisciplinary program, visual-arts counts, and the Nerman stop for Barbara Kruger's truck.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-14-NERMAN-AMERICA-NOW-HERE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source close reading"],
    supportsGenerally: [
      "America: Now and Here's 2011 launch in Kansas City",
      "the project's multidisciplinary national and Kansas City context",
      "the May 11-12 Nerman Museum stop for Barbara Kruger's truck"
    ],
    doesNotEstablish: [
      "NTER CHNG by name",
      "that NTER CHNG was exhibited at the Nerman Museum",
      "NTER CHNG creator credits",
      "a complete roster across every program discipline"
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
  },
  {
    id: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
    title: "Cool Hunting Video Presents: BAP Lab Part 1: New Media Artists",
    organization: "Cool Hunting",
    author: "Cool Hunting Video",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-08-01",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://coolhunting.com/culture/bap-lab-part-1/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cool Hunting Video, 'BAP Lab Part 1: New Media Artists,' August 1, 2006.",
    publicNote: "The article names Jamie's Time is Long and describes its extended VHS loop and approximately twenty-minute delayed playback.",
    locator: "Article lines naming Time is Long and describing recording, tape path, paired monitor, and delayed playback.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-ICLOUD-TIME-IS-LONG"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source close reading"],
    supportsGenerally: [
      "Jamie Burkart's creator credit for Time is Long",
      "use of an extended VHS tape path through the gallery",
      "recording viewers and playing the image on another monitor about twenty minutes later",
      "presentation at the July 22, 2006 BAP Lab"
    ],
    doesNotEstablish: [
      "attendance or engagement specific to Jamie's installation",
      "commissioning, acquisition, or ownership",
      "sole authorship of the wider BAP Lab event",
      "technical specifications beyond the published description"
    ]
  },
  {
    id: "SRC-MICHAEL-REES-CLAUDETTE-AR-2022",
    title: "Claudette's Theatre on Wheels",
    organization: "Michael Rees / ad hoc",
    author: "Michael Rees",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://michaelrees.org/claudette",
    preferredPublicUrl: "canonical",
    publicCitation: "Michael Rees, 'Claudette's Theatre on Wheels,' ad hoc.",
    publicNote: "The project page credits Jamie Burkart and Michael Rees with the augmented-reality experience and credits Jamie, Anne Dufy Burkart, and Julia Fredenburg with the source video made with Claudette.",
    locator: "Project description of clickable tondos, MakeUsVisible Munich credit, video-production credit, and 2017 filming context.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-ICLOUD-CLAUDETTE-AR-PUBLIC"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source close reading"],
    supportsGenerally: [
      "joint augmented-reality credit for Jamie Burkart and Michael Rees",
      "presentation for MakeUsVisible Munich",
      "clickable tondos revealing short video clips",
      "video-production credit for Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg with Claudette",
      "2017 filming at John and Melody Walker's home"
    ],
    doesNotEstablish: [
      "sole authorship by Jamie",
      "the number of video clips or the implementation platform",
      "attendance, reception, or measured audience outcome",
      "public reuse rights for the source video"
    ]
  },
  {
    id: "SRC-ICLOUD-CLAUDETTE-IMPLEMENTATION-CORRESPONDENCE-2022",
    title: "Claudette's Theatre on Wheels implementation correspondence",
    organization: "Private project archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2022-08-22",
    publicCitation: "Protected 2022 implementation correspondence; underlying messages withheld.",
    publicNote: "Only public-safe implementation metadata is represented; contact details, private messages, and live prototype routes remain protected.",
    locator: "Correspondence describing a GLB asset, clickable video elements, implementation support, and a live augmented-reality prototype.",
    projectIds: ["creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-ICLOUD-CLAUDETTE-CORRESPONDENCE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"],
    supportsGenerally: [
      "Jamie's close technical collaboration on the augmented-reality implementation",
      "a 3D asset connected to clickable video elements",
      "a working prototype during the August 2022 production window"
    ],
    doesNotEstablish: [
      "sole authorship",
      "public permission to expose correspondence, contacts, or prototype routes",
      "final production behavior or long-term availability",
      "audience or exhibition outcomes"
    ],
    protectedLocatorId: "ARCHIVE-JPH-CLAUDETTE-CORRESPONDENCE-2022-001"
  },
  {
    id: "SRC-WIKIPEDIA-NYCARTC-REVISION-HISTORY-2025",
    title: "NYC Artist Coalition revision history",
    organization: "Wikipedia",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2025-12-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://en.wikipedia.org/w/index.php?title=NYC_Artist_Coalition&action=history",
    preferredPublicUrl: "canonical",
    publicCitation: "Wikipedia, 'NYC Artist Coalition: Revision history,' December 2025 onward.",
    publicNote: "The public history records James Bernard Burkart creating the draft and editor Hexatekin subsequently editing and moving it into article space.",
    locator: "December 20-27, 2025 revisions, including the initial draft and the move from user sandbox to NYC Artist Coalition.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-HISTORY"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public revision-history review"],
    supportsGenerally: [
      "James Bernard Burkart's initial draft creation",
      "subsequent editing by Hexatekin",
      "Hexatekin's December 27, 2025 move of the draft into article space",
      "a visible collaborative revision sequence"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the published article",
      "independent verification of every statement in the article",
      "the private editorial process behind each revision",
      "permanence or endorsement by the Wikimedia Foundation"
    ]
  },
  {
    id: "SRC-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE-2025",
    title: "NYC Artist Coalition Wikipedia working archive",
    organization: "Private archival-collaboration record",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2025-12-27",
    publicCitation: "Protected December 2025 archival and editorial working record; underlying materials withheld.",
    publicNote: "The source is represented by public-safe process metadata only; correspondence, call transcript, drafts, and raw source compilation remain protected.",
    locator: "Working correspondence, December 20 editing transcript, collaboratively edited draft, Legistar bibliography, and December 27 article capture.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"],
    supportsGenerally: [
      "Jamie's source compilation and initial drafting",
      "collaborative review of encyclopedic voice and source use",
      "a Legistar bibliography assembled as part of the research process",
      "a transition from unsuccessful draft to published article"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the published article",
      "that Wikipedia independently validates every coalition claim",
      "permission to publish correspondence, transcript, or drafts",
      "the accuracy of every automatically transcribed passage"
    ],
    protectedLocatorId: "ARCHIVE-JPH-NYCARTC-WIKIPEDIA-COLLABORATION-2025-001"
  },
  {
    id: "SRC-OPEN-DATA-WEEK-NYC-COUNCIL-DATA-SESSION-2026",
    title: "From Data to Policy: How the NYC Council Turns City Data Into Action",
    organization: "NYC Open Data Week / New York City Council Data Team",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-03-26",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://opendataweek.nyc/event/from-data-to-policy-how-the-nyc-council-turns-city-data-into-action__trashed/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Open Data Week, 'From Data to Policy: How the NYC Council Turns City Data Into Action,' March 26, 2026.",
    publicNote: "The official listing records a free March 26 session at 250 Broadway organized by the New York City Council Data Team.",
    locator: "Event title, March 26 date and 3-4 p.m. window, venue, organizer, and interactive-session description.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-15-ICLOUD-CRS-OPEN-DATA-WEEK-EVENT"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source close reading"],
    supportsGenerally: [
      "March 26, 2026 event date and 3-4 p.m. window",
      "New York City Council Data Team organizer",
      "250 Broadway venue",
      "an interactive presentation about open and administrative data in Council policymaking"
    ],
    doesNotEstablish: [
      "Jamie's attendance or contribution",
      "Council review, endorsement, or adoption of Jamie's proposal",
      "a follow-up commitment",
      "the content of attendee conversations"
    ]
  },
  {
    id: "SRC-CRS-RPIE-DELIVERY-CONVERSATION-2026",
    title: "RPIE proposal delivery and discussion record",
    organization: "Jamie Burkart working archive",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-03-26",
    publicCitation: "Protected March 2026 event and delivery record; underlying transcript and prints withheld.",
    publicNote: "The record supports delivery and discussion only; it does not support endorsement, adoption, or follow-up.",
    locator: "Transcript around 22:55-32:28 and associated print-preparation folder for the HUD-USPS map and RPIE open-data proposal.",
    projectIds: ["commercial-rent-stabilization-operations"],
    intakeIds: ["INT-2026-07-15-ICLOUD-CRS-RPIE-DELIVERY-RECORD"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"],
    supportsGenerally: [
      "Jamie's attendance and direct discussion with Council Data Team members",
      "delivery of printed HUD-USPS business-vacancy and RPIE open-data materials",
      "Jamie's explanation of a privacy-preserving geographically aggregated dataset",
      "a staff response offering to pass materials to a supervisor and colleague"
    ],
    doesNotEstablish: [
      "Council endorsement or adoption",
      "formal submission, commissioning, or agency partnership",
      "follow-up after the event",
      "accuracy of every spontaneous statement in the transcript"
    ],
    protectedLocatorId: "ARCHIVE-CRS-RPIE-DELIVERY-2026-001"
  },
  {
    id: "SRC-JOB-HUNT-CHAD-EDITORIAL-REVIEW-2026",
    title: "Chad resume editorial review",
    organization: "Private job-search archive",
    author: "Chad",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-03-01",
    publicCitation: "Protected March 2026 resume editorial review; underlying transcript withheld.",
    publicNote: "Only the resulting editorial criteria are represented; personal conversation and unrelated context remain protected.",
    locator: "Opening resume-review exchange, especially the discussion of agency verbs, acronym restraint, tailored framing, concrete examples, and portfolio links.",
    projectIds: ["professional-positioning-and-evaluation"],
    intakeIds: ["INT-2026-07-15-ICLOUD-JOB-HUNT-CHAD-REVIEW"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"],
    supportsGenerally: [
      "Chad's positive assessment of concise language, agency verbs, concrete examples, clarity, and portfolio links",
      "advice to remove unfamiliar acronyms",
      "advice to lead with a concise role-specific frame",
      "the public-safe editorial criteria summarized as the Chad lens"
    ],
    doesNotEstablish: [
      "independent verification of resume claims",
      "a universal hiring standard",
      "endorsement of every current portfolio sentence",
      "permission to publish the full conversation"
    ],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CHAD-REVIEW-2026-001"
  },
  {
    id: "SRC-JOB-HUNT-MAVEN-AI-EVALS-COURSE-2026",
    title: "AI Evals For Engineers & PMs course-home capture",
    organization: "Maven",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-03-17",
    publicCitation: "Protected March 2026 Maven course-home capture; underlying account page withheld.",
    publicNote: "The capture documents enrollment and course access, not completion.",
    locator: "Course title, 'Welcome back, Jamie,' March 17, 2026 date, Day 2 of 26, and visible syllabus modules.",
    projectIds: ["professional-positioning-and-evaluation"],
    intakeIds: ["INT-2026-07-15-ICLOUD-JOB-HUNT-MAVEN-COURSE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"],
    supportsGenerally: [
      "Jamie's enrollment and authenticated course access",
      "the AI Evals For Engineers & PMs course title",
      "participation during the March 2026 course window"
    ],
    doesNotEstablish: [
      "course completion",
      "a certificate or grade",
      "mastery of every course topic",
      "permission to expose account or cohort data"
    ],
    protectedLocatorId: "ARCHIVE-JOB-HUNT-MAVEN-COURSE-2026-001"
  },
  {
    id: "SRC-MAVEN-AI-EVALS-CERTIFICATE-2026",
    title: "AI Evals For Engineers & PMs certificate of completion",
    organization: "Maven",
    kind: "project-archive",
    visibility: "private",
    preservationStatus: "private",
    publicCitation: "Maven certificate of completion for AI Evals For Engineers & PMs; underlying image withheld.",
    publicNote: "The certificate names James Burkart and the instructors Hamel Husain and Shreya Shankar.",
    locator: "Certificate title, recipient name, completed-course title, instructor line, and Maven mark.",
    projectIds: ["professional-positioning-and-evaluation"],
    intakeIds: ["INT-2026-07-15-AI-EVALS-CERTIFICATE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual inspection"],
    supportsGenerally: [
      "James Burkart's completion of AI Evals For Engineers & PMs",
      "course instruction by Hamel Husain and Shreya Shankar",
      "Maven as the certificate issuer"
    ],
    doesNotEstablish: [
      "a completion date",
      "a grade or comparative performance",
      "mastery of every course topic",
      "credential expiration or professional licensure"
    ],
    protectedLocatorId: "ARCHIVE-AI-EVALS-CERTIFICATE-2026-001"
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
      },
      {
        sourceId: "SRC-NTER-CHNG-PROJECT-SITE-2011",
        relationship: "direct-support",
        supports: ["creator credits", "installation format", "original Kansas City venue"],
        locator: "Archived homepage description, creator line, and Cocoon Gallery line.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-NTER-OPENING-2010",
        relationship: "corroborating",
        supports: ["dated public opening trace", "three creator credits"],
        locator: "Public post text and linked opening album.",
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
    id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
    project: "creative-technical-systems",
    claimType: "chronology",
    internalClaim: "America: Now and Here's archived Kansas City blog documents NTER CHNG as an installation used by participants during the project's May 5-30, 2011 Kansas City launch.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "NTER CHNG was included in the May 2011 Kansas City launch of America: Now and Here, whose own archived blog documents visitors using the installation.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        relationship: "direct-support",
        supports: ["exhibition inclusion", "participant use", "installation behavior", "opening-gala presence"],
        locator: "Post body naming NTER CHNG as an installation at America: Now and Here and describing participant interaction.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH-2011",
        relationship: "corroborating",
        supports: ["May 5-30, 2011 date range", "Kansas City launch context"],
        locator: "Opening paragraph of the organizer's launch summary.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-KC-2011",
        relationship: "context",
        supports: ["Kansas City launch context", "multidisciplinary exhibition context"],
        locator: "Kansas City Star preview republished by the Nerman Museum.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The America: Now and Here post directly establishes inclusion and interaction, while the separate NTER CHNG site and Vimeo record establish creator credits.",
      "The Nerman Museum page supplies exhibition context but does not name NTER CHNG or place it at the Nerman stop."
    ],
    antiClaims: [
      "America: Now and Here commissioned or acquired NTER CHNG.",
      "NTER CHNG was exhibited at the Nerman Museum.",
      "The Nerman article independently identifies NTER CHNG or its creators.",
      "Exhibition inclusion establishes visitor counts or measured audience impact."
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex Wayback close reading"]
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
  },
  {
    id: "CLM-TIME-IS-LONG-VHS-INSTALLATION",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "Cool Hunting documented Jamie's 2006 installation Time is Long, which recorded viewers on an extended VHS loop and played their images on another monitor about twenty minutes later.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "In 2006, Jamie created Time is Long, a participatory VHS installation that returned visitors' recorded images on another monitor about twenty minutes later.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
      relationship: "direct-support",
      supports: ["Jamie creator credit", "installation behavior", "VHS implementation", "approximately twenty-minute delay"],
      locator: "Published description of Time is Long in the BAP Lab coverage.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The source describes the work and its behavior but does not measure participation or allocate credit for the wider event."],
    antiClaims: ["Jamie organized BAP Lab, engaged all event attendees, or received a commission or acquisition for Time is Long."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source close reading"]
  },
  {
    id: "CLM-CLAUDETTE-AR-COLLABORATION",
    project: "creative-technical-systems",
    claimType: "activity",
    internalClaim: "Jamie Burkart and Michael Rees collaborated on an augmented-reality experience for Claudette's Theatre on Wheels for MakeUsVisible Munich; Jamie, Anne Dufy Burkart, and Julia Fredenburg produced the source video with Claudette.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "Jamie co-created a Claudette's Theatre on Wheels augmented-reality experience with Michael Rees for MakeUsVisible Munich; Jamie, Anne Dufy Burkart, and Julia Fredenburg produced its source video with Claudette.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-MICHAEL-REES-CLAUDETTE-AR-2022",
        relationship: "direct-support",
        supports: ["joint AR credit", "MakeUsVisible Munich context", "clickable tondos", "video-production credits"],
        locator: "Public project description and credit lines.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ICLOUD-CLAUDETTE-IMPLEMENTATION-CORRESPONDENCE-2022",
        relationship: "private-support",
        supports: ["close technical collaboration", "3D and video implementation", "working prototype"],
        locator: "Protected July-August 2022 production correspondence.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Preserve Michael Rees's joint AR credit and Anne Dufy Burkart and Julia Fredenburg's video-production credit.",
      "Implementation specifics from private correspondence remain protected and do not establish final exhibition outcomes or footage rights."
    ],
    antiClaims: [
      "Jamie solely created the augmented-reality work or source video.",
      "The project page establishes attendance, reception, or public reuse rights for the footage."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public and protected-source close reading"]
  },
  {
    id: "CLM-NYCARTC-WIKIPEDIA-ARCHIVAL-COLLABORATION",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "In December 2025, Jamie assembled sources and created an NYC Artist Coalition Wikipedia draft; the public revision history records editor Hexatekin's subsequent edits and move of the draft into article space.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "In December 2025, Jamie assembled sources and initiated an NYC Artist Coalition Wikipedia draft that editor Hexatekin subsequently edited and moved into article space.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-WIKIPEDIA-NYCARTC-REVISION-HISTORY-2025",
        relationship: "direct-support",
        supports: ["initial draft creation", "subsequent editing", "move into article space", "revision chronology"],
        locator: "December 20-27, 2025 revision entries.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE-2025",
        relationship: "private-support",
        supports: ["source compilation", "collaborative editorial process", "Legistar bibliography", "draft development"],
        locator: "Protected December 2025 working archive.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The revision sequence is collaborative and does not support sole authorship by Jamie.",
      "A Wikipedia article is a public secondary reference surface, not independent validation of every claim it contains."
    ],
    antiClaims: [
      "Jamie alone wrote or published the final Wikipedia article.",
      "Wikipedia or the Wikimedia Foundation endorsed every NYC Artist Coalition claim."
    ],
    researchInquiryIds: ["INQ-NYCARTC-WIKIPEDIA-PROVENANCE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public history and protected-archive close reading"]
  },
  {
    id: "CLM-CRS-RPIE-PROPOSAL-DELIVERY-2026",
    project: "commercial-rent-stabilization-operations",
    claimType: "activity",
    internalClaim: "At a March 26, 2026 NYC Council Data Team Open Data Week session, Jamie delivered and discussed printed HUD-USPS business-vacancy and privacy-preserving RPIE open-data materials with team members.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "technical-operations",
      text: "Brought a HUD-USPS business-vacancy map and privacy-preserving RPIE open-data proposal to a March 2026 NYC Council Data Team session for direct discussion and handoff.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-OPEN-DATA-WEEK-NYC-COUNCIL-DATA-SESSION-2026",
        relationship: "context",
        supports: ["official event title", "date", "venue", "Council Data Team organizer"],
        locator: "Open Data Week event listing.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-RPIE-DELIVERY-CONVERSATION-2026",
        relationship: "private-support",
        supports: ["Jamie's attendance", "direct discussion", "printed-material handoff", "proposal framing"],
        locator: "Protected transcript and print-preparation record.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The record establishes delivery and discussion, not formal submission, endorsement, adoption, commissioning, partnership, or follow-up."],
    antiClaims: ["The New York City Council adopted, endorsed, commissioned, or implemented Jamie's RPIE proposal."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public and protected-source close reading"]
  },
  {
    id: "CLM-CHAD-LENS-EDITORIAL-GUIDANCE",
    project: "professional-positioning-and-evaluation",
    claimType: "attributed-description",
    internalClaim: "In a March 2026 resume review, Chad praised Jamie's use of agency verbs, concrete examples, clarity, and linked work, and advised stronger tailored framing and restraint with unfamiliar acronyms.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{
      sourceId: "SRC-JOB-HUNT-CHAD-EDITORIAL-REVIEW-2026",
      relationship: "private-support",
      supports: ["attributed assessment", "agency-verb criterion", "tailored framing criterion", "acronym-restraint criterion", "concrete-work criterion"],
      locator: "Protected opening resume-review exchange.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["This is attributed editorial guidance, not independent verification of the portfolio's factual claims or a universal hiring standard."],
    antiClaims: ["Chad verified every portfolio claim, approved every current sentence, or established a universal hiring rubric."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-source close reading"]
  },
  {
    id: "CLM-AI-EVALS-CERTIFICATE-COMPLETION-2026",
    project: "professional-positioning-and-evaluation",
    claimType: "activity",
    internalClaim: "A Maven certificate records James Burkart's completion of AI Evals For Engineers & PMs, taught by Hamel Husain and Shreya Shankar; a protected March 2026 course capture separately documents enrollment and active access.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{
      key: "resume-html",
      text: "Completed Maven's AI Evals For Engineers & PMs, taught by Hamel Husain and Shreya Shankar.",
      status: "hold",
      citationRequired: false,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-MAVEN-AI-EVALS-CERTIFICATE-2026",
        relationship: "private-support",
        supports: ["completion", "recipient identity", "course title", "instructor names", "Maven issuer"],
        locator: "Certificate title, recipient, completion line, instructors, and issuer mark.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-JOB-HUNT-MAVEN-AI-EVALS-COURSE-2026",
        relationship: "private-support",
        supports: ["enrollment", "course access", "March 2026 participation window"],
        locator: "Protected course-home capture.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The certificate establishes completion but does not state a date, grade, comparative performance, licensure, or mastery of every course topic."],
    antiClaims: ["The March 17 course page alone proves completion, or the certificate establishes a grade, professional license, or exhaustive AI-evaluation mastery."],
    researchInquiryIds: ["INQ-AI-EVALS-COMPLETION-PROVENANCE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual and protected-source close reading"]
  }
] satisfies ClaimRecord[];

export const icloudArchiveResearchInquiries = [
  {
    id: "INQ-NTER-CHNG-AMERICA-NOW-HERE-WAYBACK",
    project: "creative-technical-systems",
    intakeIds: [
      "INT-2026-07-14-NTER-CHNG-ARCHIVED-SITE",
      "INT-2026-07-14-AMERICA-NOW-HERE-NTER-CHNG",
      "INT-2026-07-14-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH",
      "INT-2026-07-14-NERMAN-AMERICA-NOW-HERE"
    ],
    question: "Can NTER CHNG's inclusion in the 2011 Kansas City launch of America: Now and Here be verified from the project's own archived web presence?",
    methods: [
      "Reviewed the January 28, 2011 capture of nterchng.com and its five-record CDX inventory.",
      "Queried 4,645 CDX records for americanowandhere.org from 2009-2013, representing 2,935 unique captured URLs and 933 unique HTML URLs after URL normalization.",
      "Searched organizer-site URLs and recovered pages for NTER CHNG, creator names, Kansas City, exhibition, installation, and texting terms.",
      "Closely read the recovered June 2011 NTER CHNG post, the organizer's Kansas City launch summary, and the Nerman Museum publication supplied by Jamie."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "The archived NTER CHNG homepage directly credits Drew Bolton, Jamie Burkart, and Garrett Fuselier and identifies the work as an interactive texting installation.",
      "America: Now and Here's own archived June 22, 2011 post names NTER CHNG as an installation used by exhibition participants and describes its projected-message interaction.",
      "The organizer's June 21 launch summary dates the Kansas City installation to May 5-30, 2011.",
      "The Nerman Museum page independently supplies the wider Kansas City launch and multidisciplinary exhibition context but does not name NTER CHNG."
    ],
    limitations: [
      "The recovered organizer post does not provide NTER CHNG's creator credits; those come from the project's own site and Vimeo record.",
      "No recovered source establishes that America: Now and Here commissioned or acquired NTER CHNG.",
      "The Nerman Museum page concerns the wider launch and Barbara Kruger truck stop; it does not establish that NTER CHNG appeared at the museum."
    ],
    sourceIds: [
      "SRC-NTER-CHNG-PROJECT-SITE-2011",
      "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
      "SRC-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH-2011",
      "SRC-NERMAN-AMERICA-NOW-HERE-KC-2011"
    ],
    publicSummary: "NTER CHNG's inclusion in America: Now and Here's May 2011 Kansas City launch is directly documented by the exhibition's own archived blog; separate project records preserve creator credit."
  },
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
  },
  {
    id: "INQ-NYCARTC-WIKIPEDIA-PROVENANCE",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-HISTORY",
      "INT-2026-07-15-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE"
    ],
    question: "What can the public revision history and protected working archive establish about Jamie's role in developing the NYC Artist Coalition Wikipedia article?",
    methods: [
      "Closely read the public article and revision history for the December 20-27, 2025 sequence.",
      "Compared the public revisions with protected correspondence, an editing-call transcript, the working draft, and the Legistar bibliography.",
      "Separated initial drafting and source assembly from subsequent editing and mainspace publication."
    ],
    runAt: "2026-07-15",
    resultStatus: "recovered",
    findings: [
      "The public history records James Bernard Burkart creating the initial draft on December 20, 2025.",
      "Editor Hexatekin made subsequent revisions and moved the draft into article space on December 27, 2025.",
      "The protected archive documents source compilation, collaborative editorial review, and a Legistar bibliography behind the public revision sequence."
    ],
    limitations: [
      "The public revision history does not expose the full private editorial process.",
      "The record does not support sole authorship by Jamie.",
      "Wikipedia's publication of the article does not independently validate every historical or causal claim it contains."
    ],
    sourceIds: [
      "SRC-WIKIPEDIA-NYCARTC-REVISION-HISTORY-2025",
      "SRC-ICLOUD-NYCARTC-WIKIPEDIA-WORKING-ARCHIVE-2025"
    ],
    publicSummary: "The public revision history records Jamie initiating the draft and Hexatekin subsequently editing and moving it into article space; protected working records preserve the collaborative research process.",
    protectedLocatorId: "ARCHIVE-JPH-NYCARTC-WIKIPEDIA-COLLABORATION-2025-001"
  },
  {
    id: "INQ-AI-EVALS-COMPLETION-PROVENANCE",
    project: "professional-positioning-and-evaluation",
    intakeIds: [
      "INT-2026-07-15-ICLOUD-JOB-HUNT-MAVEN-COURSE",
      "INT-2026-07-15-AI-EVALS-CERTIFICATE"
    ],
    question: "Which source establishes Jamie's enrollment in AI Evals For Engineers & PMs, and which source establishes completion?",
    methods: [
      "Closely read the protected March 17, 2026 Maven course-home capture.",
      "Visually inspected the Maven certificate supplied by Jamie.",
      "Separated enrollment and active access from completion."
    ],
    runAt: "2026-07-15",
    resultStatus: "recovered",
    findings: [
      "The course-home capture establishes Jamie's enrollment and authenticated access during the March 2026 course window.",
      "The certificate separately establishes James Burkart's completion and names Hamel Husain and Shreya Shankar as instructors."
    ],
    limitations: [
      "The certificate does not display a completion date or grade.",
      "Neither source establishes comparative performance, licensure, or mastery of every course topic.",
      "The private course page and certificate image remain outside the public repository."
    ],
    sourceIds: [
      "SRC-JOB-HUNT-MAVEN-AI-EVALS-COURSE-2026",
      "SRC-MAVEN-AI-EVALS-CERTIFICATE-2026"
    ],
    publicSummary: "The course capture establishes enrollment and active access; the separate Maven certificate establishes completion.",
    protectedLocatorId: "ARCHIVE-AI-EVALS-CERTIFICATE-2026-001"
  }
] satisfies ResearchInquiry[];
