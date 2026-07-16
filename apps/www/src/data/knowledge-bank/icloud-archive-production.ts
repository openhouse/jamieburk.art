import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const icloudArchiveSources = [
  {
    id: "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
    title: "Horse Lords - Truthers (Official Video)",
    organization: "Horse Lords / YouTube",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.youtube.com/watch?v=Fiy0lsJLXTs",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Horse Lords, 'Truthers (Official Video),' YouTube, April 29, 2016.",
    publicNote:
      "The official video description credits the video to M.C. Schmidt and Jamie Burkart.",
    supportsGenerally: [
      "the official video is for Horse Lords' song Truthers",
      "the video was published on April 29, 2016",
      "M.C. Schmidt and Jamie Burkart are credited for the video"
    ],
    doesNotEstablish: [
      "the contribution split between M.C. Schmidt and Jamie Burkart",
      "Jamie's authorship of the song or album",
      "the video's complete production method",
      "permission to republish the video, thumbnail, or stills",
      "a durable view or engagement count"
    ],
    media: {
      mediaKind: "other",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "metadata-only"
    }
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
    canonicalUrl:
      "https://www.nprillinois.org/the-x/2016-04-29/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Illinois, April 29, 2016.",
    publicNote:
      "The NPR feature attributes the video to M.C. Schmidt and Jamie Burkart and records Horse Lords saxophonist Andrew Bernstein's account of how its repetition, variation, color, and text mirrored the band's musical method.",
    supportsGenerally: [
      "M.C. Schmidt and Jamie Burkart created the Truthers video",
      "the video used repeating shapes, letters, color, and text",
      "a Horse Lords member described the video as mirroring the band's musical approach"
    ],
    doesNotEstablish: [
      "the contribution split between the two video creators",
      "Jamie's authorship of the song or album",
      "the video's complete production method",
      "permission to republish the article's media"
    ]
  },
  {
    id: "SRC-CRS-RUNNING-MINUTES-2026",
    title: "Commercial Rent Stabilization collaboration running minutes",
    organization: "Commercial Rent Stabilization collaboration",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-04-29 through 2026-05-29",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of evolving Commercial Rent Stabilization collaboration running minutes, April-May 2026.",
    publicNote:
      "The protected record establishes a shared, readable operating memory for decisions, open questions, actions, onboarding, and consent-aware story handling. A twelve-page April 29 snapshot, a later 6,532-word working version, and the current Shared Drive record through May 29 were inspected.",
    protectedLocatorId: "ARCHIVE-CRS-RUNNING-MINUTES-2026",
    supportsGenerally: [
      "Jamie created and maintained shared running minutes and knowledge infrastructure",
      "the record tracked decisions, open questions, actions, and campaign history",
      "the system supported onboarding and continuity across scattered conversations",
      "the record encoded public, anonymized, confidential, and follow-up consent states",
      "the artifact evolved from a twelve-page snapshot to a 6,532-word working record",
      "the Shared Drive revision history records sustained Jamie stewardship with collaborator edits through May 29"
    ],
    doesNotEstablish: [
      "that Jamie led or owned the collective campaign",
      "that the working record was an official legal document",
      "that every recorded proposal was adopted or completed",
      "permission to publish collaborator names, stories, strategy, or contact data",
      "a rendering-independent page count for the complete artifact suite"
    ]
  },
  {
    id: "SRC-CRS-NINETY-DAY-PLAN-2026",
    title: "Fair Rent NYC and Commercial Rent Stabilization 90-day action plan",
    organization: "Fair Rent NYC / Commercial Rent Stabilization collaboration",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-04-06",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's Fair Rent NYC and Commercial Rent Stabilization 90-day action plan, April 2026.",
    publicNote:
      "The protected plan defines Jamie's contribution as shared public-goods infrastructure: a clear front door, recurring room, public line, consent-aware story bank, implementation packet, action tracker, and source-of-truth spine with distributed ownership and no-surprises governance.",
    protectedLocatorId: "ARCHIVE-CRS-NINETY-DAY-PLAN-2026",
    supportsGenerally: [
      "Jamie designed operating infrastructure for a collective campaign",
      "the plan included communication, meeting, story, implementation, action-tracking, and movement-memory systems",
      "the plan emphasized distributed ownership and no-surprises governance",
      "the plan treated consent and public-private boundaries as operating requirements"
    ],
    doesNotEstablish: [
      "that Jamie led or owned the movement",
      "that every proposed output was completed",
      "permission to publish collaborator names, live strategy, or contact workflows",
      "legal authority or official bill ownership"
    ]
  },
  {
    id: "SRC-CRS-PROVENANCE-REDLINE-2026",
    title: "Commercial Rent Stabilization legislative provenance redline, 2019-2025",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-05-16",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's ten-page Commercial Rent Stabilization legislative provenance redline, updated May 2026.",
    publicNote:
      "The protected document uses tracked changes to visualize policy inheritance across New York City and State source layers. Its own disclaimer identifies it as an unofficial discussion document rather than legal advice.",
    protectedLocatorId: "ARCHIVE-CRS-PROVENANCE-REDLINE-2026",
    supportsGenerally: [
      "Jamie prepared a legislative provenance redline",
      "the document traces source layers from New York City legislation, campaign recommendations, prior small-business legislation, and state revisions",
      "tracked changes make policy inheritance and revision paths visible",
      "the reviewed render is ten pages",
      "the document expressly disclaims official or legal authority"
    ],
    doesNotEstablish: [
      "that Jamie authored the underlying legislation",
      "that the redline is an official government document",
      "that reviewer labels represent individual drafting authorship",
      "legal advice or a final interpretation of the bill",
      "permission to publish private review context"
    ],
    media: {
      mediaKind: "document",
      rightsStatus: "cleared",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  },
  {
    id: "SRC-SBTM-PROPOSAL-PREP-2026",
    title: "Source-Backed Team Memory pilot proposal and preparation record",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-06-22 through 2026-06-30",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's Source-Backed Team Memory pilot materials, June 2026.",
    publicNote:
      "The protected materials define a bounded source-to-memory loop in which approved source material becomes source-linked, human-reviewed operating memory with explicit Known, Open, and Protected states.",
    protectedLocatorId: "ARCHIVE-SBTM-PROPOSAL-PREP-2026",
    supportsGenerally: [
      "Jamie developed the Source-Backed Team Memory method",
      "the method begins with one approved, non-sensitive, redacted, or synthetic source surface",
      "the method produces a friction map, source inventory, reviewable memory artifact, templates, and a continue-revise-stop recommendation",
      "the method preserves decision lineage, onboarding context, open questions, and product reasoning",
      "the method keeps human review and source links in the loop"
    ],
    doesNotEstablish: [
      "a deployed production product",
      "a completed client engagement",
      "a chatbot or unrestricted archive browser",
      "permission to publish collaborator identity, pricing, transcripts, or company context",
      "replacement of human authority or judgment"
    ]
  },
  {
    id: "SRC-SBTM-LAB-PAGE-2026",
    title: "Source-Backed Team Memory lab page",
    organization: "Jamie Burkart",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://jamieburk.art/lab/source-backed-team-memory",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart, 'Source-Backed Team Memory,' public lab page.",
    publicNote:
      "The public lab page presents the bounded method without exposing private proposal, collaborator, pricing, or transcript context.",
    supportsGenerally: [
      "the method separates Known, Open, and Protected material",
      "the method is source-linked and human-correctable",
      "the work is presented as a developing lab method rather than a finished product"
    ],
    doesNotEstablish: [
      "independent validation of the method",
      "a production deployment",
      "a completed client engagement",
      "measured performance outcomes"
    ]
  },
  {
    id: "SRC-AI-EVALS-CERTIFICATE-2026",
    title: "AI Evals For Engineers & PMs certificate of completion",
    organization: "Maven",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe review of Jamie Burkart's Maven certificate of completion for AI Evals For Engineers & PMs, 2026.",
    publicNote:
      "The certificate records completion of AI Evals For Engineers & PMs, taught by Hamel Husain and Shreya Shankar.",
    protectedLocatorId: "ARCHIVE-AI-EVALS-CERTIFICATE-2026",
    supportsGenerally: [
      "Jamie completed AI Evals For Engineers & PMs in 2026",
      "Hamel Husain and Shreya Shankar taught the course",
      "Maven issued the certificate of completion"
    ],
    doesNotEstablish: [
      "instructor affiliation",
      "professional licensure",
      "professional certification authority",
      "permission to publish private coursework or cohort records"
    ],
    media: {
      mediaKind: "document",
      rightsStatus: "unknown",
      consentStatus: "not-applicable",
      publicDisplayStatus: "hold",
      visibleText: [
        "Certificate of Completion",
        "James Burkart",
        "AI Evals For Engineers & PMs",
        "Hamel Husain & Shreya Shankar",
        "Maven"
      ]
    }
  },
  {
    id: "SRC-AI-EVALS-MAVEN-COURSE-2026",
    title: "AI Evals For Engineers & PMs",
    organization: "Maven",
    author: "Hamel Husain and Shreya Shankar",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://maven.com/parlance-labs/evals",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Hamel Husain and Shreya Shankar, 'AI Evals For Engineers & PMs,' Maven.",
    publicNote:
      "The public course page identifies the instructors and describes practical work in error analysis, evaluators, traces, regression checks, safety, human review, and evidence-based improvement. The current syllabus may differ from Jamie's completed cohort.",
    supportsGenerally: [
      "the course title",
      "Hamel Husain and Shreya Shankar as instructors",
      "the course's applied evaluation and error-analysis focus",
      "the course includes a certificate of completion"
    ],
    doesNotEstablish: [
      "Jamie's enrollment or completion",
      "the exact syllabus of Jamie's cohort",
      "professional licensure",
      "instructor affiliation"
    ]
  },
  {
    id: "SRC-AI-EVALS-COURSE-PORTAL-2026",
    title: "AI Evals For Engineers & PMs cohort portal",
    organization: "Maven",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-03-16 through 2026-04-11",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's private Maven course portal for AI Evals For Engineers & PMs, Cohort 5, 2026.",
    publicNote:
      "The protected portal corroborates Jamie's cohort context and the period curriculum, including application-centric evals, systematic error analysis, automated evaluators, and complex AI architectures. Completion is established by the separate certificate.",
    protectedLocatorId: "ARCHIVE-AI-EVALS-COURSE-PORTAL-2026",
    supportsGenerally: [
      "Jamie was enrolled in Cohort 5",
      "the cohort ran from March 16 through April 11, 2026",
      "the period curriculum covered application-centric evals, error analysis, automated evaluators, and complex architectures"
    ],
    doesNotEstablish: [
      "course completion without the separate certificate",
      "permission to publish private course materials or participant information",
      "professional licensure",
      "the current course syllabus"
    ]
  },
  {
    id: "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    title: "A Sorted Audio File",
    organization: "Monthly Music Hackathon NYC / Music Community Lab",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2013-02-27",
    accessedAt: "2026-07-16",
    canonicalUrl:
      "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Monthly Music Hackathon NYC, 'A Sorted Audio File,' February 27, 2013.",
    publicNote:
      "The institutional project page records that Jamie made a Max/MSP program at the February 2013 Music Hackathon NYC that segmented an audio file and reordered the clips by pitch.",
    supportsGenerally: [
      "Jamie made a Max/MSP program at the February 2013 Music Hackathon NYC",
      "the program divided audio into small segments",
      "the demonstrated implementation sorted the segments by pitch"
    ],
    doesNotEstablish: [
      "the complete source code or implementation details",
      "Jamie's authorship or ownership of the source song",
      "permission to republish the linked audio",
      "a broader role in organizing Monthly Music Hackathon NYC"
    ]
  },
  {
    id: "SRC-CRS-POWER-MAP-MESSAGING-GRID-2026",
    title:
      "Commercial Rent Stabilization internal power map and functional messaging grid",
    organization: "NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-02-06",
    accessedAt: "2026-07-16",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's Commercial Rent Stabilization power map and functional messaging grid, February 2026.",
    publicNote:
      "The protected working artifact joins stakeholder mapping, audience-specific communication, testimony safety, coalition governance, and 30/60/90-day execution planning in one operational model.",
    protectedLocatorId: "ARCHIVE-CRS-POWER-MAP-MESSAGING-GRID-2026",
    supportsGenerally: [
      "Jamie created an operational stakeholder power map and audience-specific messaging grid",
      "the artifact linked targets to owners, next asks, message needs, and messengers",
      "the artifact included testimony safety and public-private boundaries",
      "the artifact included coalition governance and a 30/60/90-day execution structure"
    ],
    doesNotEstablish: [
      "that the working plan was collectively approved or fully executed",
      "that Jamie led or owned the coalition or campaign",
      "that every target, message, milestone, or recommendation remained current",
      "permission to publish internal strategy, names, assignments, or testimony leads"
    ]
  },
  {
    id: "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026",
    title: "Job-Hunt Context Outline",
    organization: "Jamie Burkart job-hunt archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-03",
    accessedAt: "2026-07-16",
    publicCitation:
      "Public-safe archival review of Jamie Burkart's private Job-Hunt Context Outline, July 2026.",
    publicNote:
      "The protected orientation record maps Jamie's current role positioning, candidate case studies, evidence locations, public-safety boundaries, and a verification queue for quantified claims. It is a research control record, not accomplishment evidence.",
    protectedLocatorId: "ARCHIVE-JOB-HUNT-CONTEXT-OUTLINE-2026",
    supportsGenerally: [
      "the job-hunt archive uses technical project management, product operations, civic technology, implementation, and documentation systems as its organizing role frame",
      "the outline distinguishes public collateral from private source material",
      "the outline identifies quantified claims that require source review before prominent external use"
    ],
    doesNotEstablish: [
      "any accomplishment claim by itself",
      "the accuracy of resume metrics without underlying evidence",
      "independent market validation of the role positioning",
      "permission to publish private transcripts, messages, legal records, or financial material"
    ]
  }
] satisfies SourceRecord[];

export const icloudArchiveClaims = [
  {
    id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
    project: "horse-lords-truthers",
    internalClaim:
      "Jamie Burkart co-created the official 2016 video for Horse Lords' Truthers with M.C. Schmidt. NPR's contemporaneous feature independently attributes the video to both creators and records the band's account of how its repetition, variation, color, and text mirrored the music.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Co-created the official 2016 video for Horse Lords' Truthers with M.C. Schmidt; NPR documented the work and the band's account of how its repetition, variation, color, and text mirrored the music.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale:
          "Preserve a strong externally attributed example of Jamie's visual and musical collaboration as historical depth without increasing the current hiring site's reading burden."
      },
      {
        key: "about",
        text:
          "Co-created the official video for Horse Lords' Truthers with M.C. Schmidt.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Hold until the About composition has room for music-video practice and the necessary media-rights review is complete."
      },
      {
        key: "photo-brief",
        text:
          "Look for production material or stills from Horse Lords' Truthers showing the progression from stark repeated shapes and letters into color and text.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
        rationale:
          "Use only as an archive-research lead; image and video rights require review before publication."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
        relationship: "direct-support",
        supports: [
          "official video status",
          "publication date",
          "M.C. Schmidt and Jamie Burkart video credit"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
        relationship: "corroborating",
        supports: [
          "independent attribution to M.C. Schmidt and Jamie Burkart",
          "contemporaneous description of the video's visual method",
          "Horse Lords' account of the relationship between the video and music"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
        relationship: "corroborating",
        supports: [
          "Jamie's contemporaneous naming of M.C. Schmidt as collaborator",
          "the NPR publication destination"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
        relationship: "corroborating",
        supports: ["independent public attribution to Jamie and M.C. Schmidt"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
        relationship: "corroborating",
        supports: ["a second public attribution to both video collaborators", "analog-media context"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Always credit M.C. Schmidt as co-creator.",
      "Do not imply Jamie authored Horse Lords' song, album, or musical performance.",
      "Do not infer the contribution split or complete production process.",
      "Do not publish video, thumbnails, or stills without rights review.",
      "Exclude mutable view and engagement counts from accomplishment wording."
    ],
    antiClaims: [
      "Jamie created the Truthers video alone.",
      "Jamie was a member of Horse Lords.",
      "Jamie composed or performed Truthers.",
      "Current view counts are durable accomplishment metrics."
    ],
    researchInquiryIds: ["INQ-HORSE-LORDS-TRUTHERS-PRODUCTION-RIGHTS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex iCloud, public-source, and social-archive review"]
  },
  {
    id: "CLM-MUSIC-HACKATHON-SORTED-AUDIO",
    project: "monthly-music-hackathon",
    internalClaim:
      "At the February 2013 Music Hackathon NYC, Jamie built a Max/MSP program that divided an audio file into small segments and reordered the clips by pitch.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Built a Max/MSP program at the February 2013 Music Hackathon NYC that segmented an audio file and reordered the clips by pitch.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale:
          "Retain a compact, externally attributed creative-technology example in the knowledge bank without adding another project to the current hiring-site composition."
      },
      {
        key: "about",
        text:
          "Built an experimental Max/MSP audio-sorting program at Music Hackathon NYC.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Hold until a broader creative-technology composition needs this evidence and the linked audio's publication rights are reviewed."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        relationship: "direct-support",
        supports: [
          "Jamie's authorship of the Max/MSP program",
          "February 2013 Music Hackathon NYC context",
          "audio segmentation and pitch-sorting behavior"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Describe the specific recorded program behavior rather than a generalized audio-engineering platform.",
      "Do not imply Jamie authored or owns Spencer Owen's source song.",
      "Do not republish the linked audio without a separate rights review.",
      "Do not infer an organizing role in Monthly Music Hackathon NYC from this participant project."
    ],
    antiClaims: [
      "Jamie organized Monthly Music Hackathon NYC.",
      "Jamie wrote the source song used in the demonstration.",
      "The archived page preserves the complete source code.",
      "The project was a production audio product."
    ],
    researchInquiryIds: ["INQ-MUSIC-HACKATHON-SORTED-AUDIO-IMPLEMENTATION"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex iCloud and public-source review"]
  },
  {
    id: "CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie built and stewarded a multi-document Commercial Rent Stabilization campaign-memory and coordination system spanning 30+ pages in the working artifact set, including running minutes, a 90-day operating plan, decision and action records, stakeholder power mapping, audience-specific messaging, consent-aware story handling, and public-private boundary management.",
    status: "use-with-care",
    projections: [
      {
        key: "resume-html",
        text:
          "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
        status: "active",
        citationRequired: false,
        surfaces: ["/resume"],
        rationale:
          "Retain the approved, concrete scale signal for hiring readers, with the canonical record defining it as a rendering-dependent aggregate across an evolving artifact suite."
      },
      {
        key: "technical-operations",
        text:
          "Built and stewarded 30+ pages of campaign memory, including decision records, source maps, stakeholder power mapping, action trackers, and public/private boundary management.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "Show documentation as operating infrastructure while keeping private coalition material out of the page."
      },
      {
        key: "archive-note",
        text:
          "Built a shared campaign operating system for Commercial Rent Stabilization, including evolving running minutes, a 90-day plan, stakeholder power mapping, an audience-specific messaging grid, action and decision records, consent states, and public-private governance.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/fair-rent-nyc"],
        rationale:
          "Preserve the richer operating model in the bank while public surfaces use compressed wording."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
        relationship: "private-support",
        supports: [
          "shared running-minutes authorship and stewardship",
          "decision, question, action, and campaign-history structure",
          "onboarding and continuity purpose",
          "consent-aware story states",
          "twelve-page snapshot and later 6,532-word version"
        ],
        locator: "April-May 2026 running-minutes artifact family",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-NINETY-DAY-PLAN-2026",
        relationship: "private-support",
        supports: [
          "Jamie's design of shared campaign infrastructure",
          "communication, meeting, story, implementation, action-tracking, and memory systems",
          "distributed ownership and no-surprises governance"
        ],
        locator: "April 2026 90-day action plan",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-PROVENANCE-REDLINE-2026",
        relationship: "private-support",
        supports: [
          "a ten-page source-lineage artifact within the broader documentation suite"
        ],
        locator: "May 2026 ten-page provenance redline",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-POWER-MAP-MESSAGING-GRID-2026",
        relationship: "private-support",
        supports: [
          "Jamie's creation of an operational stakeholder power map",
          "audience-specific message and messenger planning",
          "testimony safety and public-private boundaries",
          "coalition governance and 30/60/90-day execution structure"
        ],
        locator: "February 2026 internal operating-map artifact",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The 30+ figure is an approximate aggregate across an evolving multi-document suite, not the page count of one document.",
      "Page totals vary by version, export, and rendering; retain the number only with this measurement boundary in the canonical record.",
      "Use collective-work language and do not imply Jamie led or owned the movement.",
      "Do not imply that working plans, targets, messages, or milestones were collectively approved or completed.",
      "Do not publish raw minutes, names, assignments, testimony leads, stories, legal-review material, live strategy, or contact data."
    ],
    antiClaims: [
      "Jamie led the Commercial Rent Stabilization movement.",
      "Jamie single-handedly created the campaign or policy work.",
      "The 30+ pages are one official or legal document.",
      "Every action or proposal recorded in the working documents was adopted or completed."
    ],
    researchInquiryIds: ["INQ-CRS-ARTIFACT-SUITE-MEASUREMENT"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex iCloud archival follow-up"]
  },
  {
    id: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
    project: "fair-rent-nyc",
    internalClaim:
      "Jamie created a ten-page legislative provenance redline tracing Commercial Rent Stabilization language across New York City and State policy lineages and revision paths, using tracked changes to make policy inheritance visible.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "resume-html",
        text:
          "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization language across public policy lineages and revision paths.",
        status: "active",
        citationRequired: false,
        surfaces: ["/resume"],
        rationale:
          "Use the concise actor-action-artifact proof for hiring readers while the bank carries source-layer and legal-authority boundaries."
      },
      {
        key: "technical-operations",
        text:
          "Created a legislative source map and provenance redline so collaborators could inspect policy inheritance, revisions, and review lanes.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "Show source mapping and reviewability as technical-operations capabilities without presenting the artifact as legal authority."
      },
      {
        key: "archive-note",
        text:
          "Prepared a ten-page, unofficial legislative provenance redline using tracked changes to visualize Commercial Rent Stabilization policy inheritance across city and state source layers.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/fair-rent-nyc"],
        rationale:
          "Retain the strongest precise description, including length and unofficial status, in the research-facing record."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-PROVENANCE-REDLINE-2026",
        relationship: "private-support",
        supports: [
          "Jamie's authorship of the provenance redline",
          "ten-page rendered length",
          "city and state source layers",
          "tracked-change visualization of policy inheritance",
          "unofficial and not-legal-advice disclaimer"
        ],
        locator: "May 16, 2026 provenance redline and ten-page render",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The artifact is an unofficial provenance redline for discussion, not legal advice.",
      "Reviewer labels represent source layers rather than individual drafting authorship.",
      "Do not imply Jamie authored or owned the underlying legislation.",
      "Do not publish private review or strategy context."
    ],
    antiClaims: [
      "Jamie authored the Commercial Rent Stabilization legislation.",
      "The provenance redline is an official government document.",
      "The provenance redline provides legal advice.",
      "Every reviewer label identifies the author of the corresponding bill language."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex iCloud archival review"]
  },
  {
    id: "CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD",
    project: "source-backed-team-memory",
    internalClaim:
      "Jamie developed a bounded Source-Backed Team Memory method that starts with approved source material and produces source-linked, human-reviewed operating memory with explicit Known, Open, and Protected states, review workflows, and a continue-revise-stop decision.",
    status: "use-with-care",
    projections: [
      {
        key: "technical-operations",
        text:
          "Developing a bounded method for source-backed team memory: reviewable, human-correctable, source-linked operating memory for knowledge-heavy teams.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
        rationale:
          "Present a concrete developing method that demonstrates documentation architecture and human-review discipline without implying deployment."
      },
      {
        key: "case-study",
        text:
          "A bounded method for turning approved source material into reviewable operating memory while preserving Known, Open, and Protected states.",
        status: "active",
        citationRequired: false,
        surfaces: ["/lab/source-backed-team-memory"],
        rationale:
          "Keep the lab page focused on method and boundaries rather than private proposal context."
      },
      {
        key: "archive-note",
        text:
          "The pilot method yields a friction map, source and workflow inventory, one reviewable memory artifact, reusable templates, a human review loop, and a continue-revise-stop recommendation.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/source-backed-team-memory"],
        rationale:
          "Preserve the method's concrete outputs for future composition and evaluation."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-SBTM-PROPOSAL-PREP-2026",
        relationship: "private-support",
        supports: [
          "Jamie's development of the method",
          "bounded source-to-memory loop",
          "approved-source starting condition",
          "source-linked and human-reviewed outputs",
          "concrete pilot deliverables",
          "continue-revise-stop decision"
        ],
        locator: "June 2026 pilot proposal and follow-up preparation record",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-SBTM-LAB-PAGE-2026",
        relationship: "corroborating",
        supports: [
          "public Known, Open, and Protected model",
          "source-linked and human-correctable framing",
          "developing lab status"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Present the work as a developing method, not a finished SaaS product or production deployment.",
      "Do not identify private collaborators, organizations, pricing, transcripts, or proposal context.",
      "The method begins with bounded approved sources; it is not an unrestricted archive browser.",
      "Human review and source authority remain necessary."
    ],
    antiClaims: [
      "Jamie built and deployed a production AI memory platform for a client.",
      "Source-Backed Team Memory is a chatbot.",
      "The method makes private archives publicly browsable.",
      "The method automates trust or replaces human judgment."
    ],
    researchInquiryIds: ["INQ-SBTM-PILOT-VALIDATION"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex iCloud archival review"]
  },
  {
    id: "CLM-AI-EVALS-PROFESSIONAL-DEVELOPMENT",
    project: "professional-development",
    internalClaim:
      "Jamie completed the 2026 AI Evals For Engineers & PMs course taught by Hamel Husain and Shreya Shankar through Maven. The completed-cohort materials covered application-centric evals, systematic error analysis, automated evaluators, and complex AI architectures.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "resume-html",
        text:
          "Completed AI Evals For Engineers & PMs with Hamel Husain and Shreya Shankar through Maven in 2026.",
        status: "active",
        citationRequired: false,
        surfaces: ["/resume"],
        rationale:
          "Use the exact professional-development credential without implying instructor affiliation or licensure."
      },
      {
        key: "about",
        text:
          "Completed applied professional development in AI evaluation, error analysis, and human-review workflows in 2026.",
        status: "active",
        citationRequired: false,
        surfaces: ["/about"],
        rationale:
          "Connect the credential to Jamie's current evaluation practice without overloading the page with course detail."
      },
      {
        key: "archive-note",
        text:
          "Maven issued Jamie a certificate of completion for AI Evals For Engineers & PMs, taught by Hamel Husain and Shreya Shankar, after Cohort 5 in 2026.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/professional-development"],
        rationale:
          "Retain the exact credential, provider, instructors, and cohort context in the bank."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-AI-EVALS-CERTIFICATE-2026",
        relationship: "private-support",
        supports: [
          "course completion",
          "course title",
          "Hamel Husain and Shreya Shankar as instructors",
          "Maven as certificate issuer"
        ],
        locator: "2026 certificate of completion",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AI-EVALS-MAVEN-COURSE-2026",
        relationship: "context",
        supports: [
          "public course title",
          "public instructor identities",
          "applied evaluation and error-analysis focus",
          "certificate-of-completion format"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AI-EVALS-COURSE-PORTAL-2026",
        relationship: "private-support",
        supports: [
          "Cohort 5 context",
          "March-April 2026 dates",
          "completed-cohort curriculum topics"
        ],
        locator: "private Cohort 5 portal capture",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe this as professional development and a course certificate of completion.",
      "Do not imply Jamie teaches the course or is affiliated with the instructors.",
      "Do not describe the credential as professional licensure or certification authority beyond course completion.",
      "Do not publish private coursework, cohort records, or portal identifiers.",
      "Use the private portal for Jamie's completed-cohort curriculum; the public course syllabus continues to change."
    ],
    antiClaims: [
      "Jamie teaches AI Evals For Engineers & PMs.",
      "Jamie is professionally licensed by Maven as an AI evaluator.",
      "The current public syllabus is identical to Jamie's completed cohort.",
      "Course completion alone proves production AI-system outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex iCloud and certificate review"]
  }
] satisfies ClaimRecord[];

export const icloudArchiveInquiries = [
  {
    id: "INQ-HORSE-LORDS-TRUTHERS-PRODUCTION-RIGHTS",
    project: "horse-lords-truthers",
    question:
      "What public-safe production records, contribution details, and media permissions can strengthen the Truthers video claim?",
    methods: [
      "Reviewed the official YouTube page captured in Jamie Projects History.",
      "Reviewed the contemporaneous NPR feature and its attribution to both video creators.",
      "Separated durable authorship evidence from mutable YouTube engagement counts."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The official page credits the video to M.C. Schmidt and Jamie Burkart.",
      "NPR independently attributed the video to both creators and recorded a band member's account of its visual relationship to the music.",
      "The reviewed public record supports co-creation but not contribution split or republication rights."
    ],
    limitations: [
      "No production files or role split were recovered in this pass.",
      "Video, thumbnail, and still-image rights remain unreviewed.",
      "Mutable platform counts are excluded from durable accomplishment wording."
    ],
    sourceIds: [
      "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
      "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
    ],
    publicSummary:
      "The official video and contemporaneous NPR reporting establish M.C. Schmidt and Jamie Burkart's co-creation credit; production split and media rights remain open."
  },
  {
    id: "INQ-CRS-ARTIFACT-SUITE-MEASUREMENT",
    project: "fair-rent-nyc",
    question:
      "How should the evolving Commercial Rent Stabilization artifact suite's scale be measured without implying one fixed or official document?",
    methods: [
      "Close-read the April 2026 90-day action plan and April-May running-minutes records.",
      "Inspected the April 29 running-minutes PDF page count and the later working record's word count.",
      "Rendered and inspected the May 2026 legislative provenance redline.",
      "Compared the archive evidence to the existing approved 30+ page portfolio wording."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The artifact family includes a twelve-page running-minutes snapshot, a later 6,532-word running-minutes version, a 2,377-word 90-day plan, and a ten-page provenance redline.",
      "The archive strongly supports a substantial multi-document operating-memory suite and Jamie's authorship or stewardship of its named components.",
      "The approved 30+ page wording is retained as an approximate aggregate across the suite rather than a single-document count."
    ],
    limitations: [
      "Page totals vary by version, export, type size, tracked changes, and rendering environment.",
      "The evolving minutes versions overlap and should not be added together as independent documents.",
      "The raw documents contain private collaborator, strategy, story, and contact context that remains excluded from the repo."
    ],
    sourceIds: [
      "SRC-CRS-RUNNING-MINUTES-2026",
      "SRC-CRS-NINETY-DAY-PLAN-2026",
      "SRC-CRS-PROVENANCE-REDLINE-2026"
    ],
    publicSummary:
      "The archive supports a substantial multi-document campaign-memory suite; 30+ pages remains an approximate, rendering-dependent aggregate rather than the page count of one official document.",
    protectedLocatorId: "RESEARCH-CRS-ARTIFACT-SUITE-MEASUREMENT-2026"
  },
  {
    id: "INQ-SBTM-PILOT-VALIDATION",
    project: "source-backed-team-memory",
    question:
      "What evidence would move Source-Backed Team Memory from a bounded developing method to a validated implementation claim?",
    methods: [
      "Close-read the private pilot proposal and follow-up preparation record.",
      "Compared the protected method with the public lab page and current portfolio wording.",
      "Separated defined method outputs from uncompleted deployment and outcome claims."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The method, starting conditions, outputs, review loop, and safety boundaries are well defined.",
      "The public lab page accurately projects the protected method without exposing collaborator or proposal context.",
      "No completed production deployment or measured outcome was established in this pass."
    ],
    limitations: [
      "Private collaborator identity, pricing, transcripts, and company context remain excluded.",
      "Future validation requires an approved pilot, review evidence, and bounded outcome measures.",
      "A method specification is not itself evidence of production performance."
    ],
    sourceIds: [
      "SRC-SBTM-PROPOSAL-PREP-2026",
      "SRC-SBTM-LAB-PAGE-2026"
    ],
    publicSummary:
      "The method is concrete and publicly bounded; deployment evidence and measured outcomes remain open.",
    protectedLocatorId: "RESEARCH-SBTM-PILOT-VALIDATION-2026"
  },
  {
    id: "INQ-MUSIC-HACKATHON-SORTED-AUDIO-IMPLEMENTATION",
    project: "monthly-music-hackathon",
    question:
      "What source code, implementation notes, audio permissions, or collaborator records can further document Jamie's 2013 Max/MSP audio-sorting project?",
    methods: [
      "Close-read the captured Monthly Music Hackathon NYC project page.",
      "Verified the public institutional page in a live browser on July 16, 2026.",
      "Separated the documented program behavior from source-code, music-authorship, product, and organizer claims."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "The institutional page directly attributes the Max/MSP program to Jamie.",
      "The page documents audio segmentation and a pitch-sorted demonstration.",
      "The page links to an audio example but does not expose complete source code or publication permissions."
    ],
    limitations: [
      "No source code or implementation notes were recovered in this pass.",
      "The linked audio's current availability and republication rights were not established.",
      "The page does not establish a broader organizing role in Monthly Music Hackathon NYC."
    ],
    sourceIds: ["SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013"],
    publicSummary:
      "Monthly Music Hackathon NYC directly documents Jamie's 2013 Max/MSP audio-segmentation and pitch-sorting program; source code, implementation detail, and audio rights remain open."
  },
  {
    id: "INQ-JOB-HUNT-PROOF-COVERAGE-2026",
    project: "professional-positioning",
    question:
      "Which quantified claims flagged by the July 2026 job-hunt orientation now have canonical evidence, and which still require stronger support?",
    methods: [
      "Close-read the job-hunt context outline and its claim-verification queue.",
      "Compared each flagged metric with the current canonical claims, source records, measurement boundaries, and anti-claims.",
      "Kept the orientation record as research control rather than accomplishment evidence."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "WOW List's roughly 35 city ecosystems, KC Town Hall's public funding record, and the 30+ page Commercial Rent Stabilization artifact scale now have canonical evidence chains with explicit boundaries.",
      "The 300+ gathering scale has a protected ledger and measurement boundary.",
      "The 2x revenue contribution claim remains careful rather than independently verified, and the 20+ resident-artist aggregate remains only partially established."
    ],
    limitations: [
      "The job-hunt outline is a private synthesis and does not prove accomplishments by itself.",
      "Private financial evidence is not published and the 2x claim must retain contribution language.",
      "The reviewed residency records do not independently establish the complete 20+ resident-artist aggregate."
    ],
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    publicSummary:
      "A proof-coverage audit matured several once-open metrics while retaining careful language for the 2x revenue contribution and an explicit evidence gap for the 20+ resident-artist aggregate.",
    protectedLocatorId: "RESEARCH-JOB-HUNT-PROOF-COVERAGE-2026"
  }
] satisfies ResearchInquiry[];

export const icloudArchiveIntake = [
  {
    id: "INT-ICLOUD-JAMIE-PROJECTS-HISTORY-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Jamie Projects History archive production",
    description:
      "A close-reading pass through the Jamie Projects History overview and selected compact project captures surfaced the official Horse Lords Truthers video page and contemporaneous NPR coverage. Only public URLs and newspaper-safe propositions enter the repo.",
    whyItMatters:
      "Adds externally attributed historical breadth to Jamie's record while preserving collaborator credit and keeping mutable metrics and media outside publication.",
    projectIds: ["horse-lords-truthers", "participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured a bounded co-creation claim and opened production-detail and rights research; the website projection remains held.",
    sourceIds: [
      "SRC-HORSE-LORDS-TRUTHERS-YOUTUBE-2016",
      "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
    ],
    claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO"],
    inquiryIds: ["INQ-HORSE-LORDS-TRUTHERS-PRODUCTION-RIGHTS"],
    boundaries: [
      "Always credit M.C. Schmidt as co-creator.",
      "Do not publish video, thumbnails, or stills without rights review.",
      "Do not convert mutable platform counts into durable accomplishment metrics."
    ]
  },
  {
    id: "INT-ICLOUD-CRS-ARCHIVE-PRODUCTION-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Commercial Rent Stabilization archive production",
    description:
      "Close reading of selected CRS anchor records matured Jamie's campaign-memory infrastructure and legislative provenance work while retaining only protected locators and public-safe summaries.",
    whyItMatters:
      "Converts the archive's strongest operating artifacts into defensible evidence for Jamie's documentation architecture, policy translation, consent practice, and collective delivery role.",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured two bounded claims, preserved the 30+ page figure as a rendering-dependent multi-document aggregate, and kept private coalition records outside the repo.",
    sourceIds: [
      "SRC-CRS-RUNNING-MINUTES-2026",
      "SRC-CRS-NINETY-DAY-PLAN-2026",
      "SRC-CRS-PROVENANCE-REDLINE-2026"
    ],
    claimIds: [
      "CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE",
      "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"
    ],
    inquiryIds: ["INQ-CRS-ARTIFACT-SUITE-MEASUREMENT"],
    boundaries: [
      "Do not publish raw minutes, private names, stories, strategy, contact data, or legal-review context.",
      "Use collective-work language and do not imply movement ownership.",
      "Treat the provenance redline as unofficial and not legal advice.",
      "Treat 30+ pages as an approximate aggregate across evolving documents."
    ]
  },
  {
    id: "INT-ICLOUD-JOB-HUNT-SBTM-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "Source-Backed Team Memory method archive production",
    description:
      "Close reading of the job-hunt orientation and selected private proposal and preparation records matured the bounded Source-Backed Team Memory method without recording collaborator identity, pricing, transcripts, or private company context.",
    whyItMatters:
      "Establishes the concrete method, starting conditions, outputs, review loop, and boundaries behind a current technical-operations and lab projection.",
    projectIds: ["source-backed-team-memory", "technical-operations"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured the method claim and retained deployment and outcome validation as an open inquiry.",
    sourceIds: [
      "SRC-SBTM-PROPOSAL-PREP-2026",
      "SRC-SBTM-LAB-PAGE-2026"
    ],
    claimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD"],
    inquiryIds: ["INQ-SBTM-PILOT-VALIDATION"],
    boundaries: [
      "Do not expose collaborator identity, pricing, transcripts, or company context.",
      "Do not imply production deployment or measured outcomes.",
      "Keep approved-source bounds and human review explicit."
    ]
  },
  {
    id: "INT-ICLOUD-JOB-HUNT-AI-EVALS-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "AI Evals professional-development evidence",
    description:
      "The job-hunt archive's private course context, Jamie's certificate of completion, and Maven's public course page were reconciled into a precise professional-development claim.",
    whyItMatters:
      "Replaces resume-only assertion with a canonical evidence chain for a current capability signal relevant to evaluation-driven product and technical operations work.",
    projectIds: ["professional-development", "ai-evals"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Confirmed course completion and bounded the credential against instructor affiliation, licensure, changing syllabi, and private coursework.",
    sourceIds: [
      "SRC-AI-EVALS-CERTIFICATE-2026",
      "SRC-AI-EVALS-MAVEN-COURSE-2026",
      "SRC-AI-EVALS-COURSE-PORTAL-2026"
    ],
    claimIds: ["CLM-AI-EVALS-PROFESSIONAL-DEVELOPMENT"],
    boundaries: [
      "Describe the credential as course completion, not professional licensure.",
      "Do not imply instructor affiliation.",
      "Do not publish private coursework, cohort records, or portal identifiers.",
      "Keep Jamie's completed-cohort curriculum distinct from the changing public syllabus."
    ]
  },
  {
    id: "INT-ICLOUD-JAMIE-PROJECTS-HISTORY-MUSIC-HACKATHON-2026-07-16",
    receivedAt: "2026-07-16",
    kind: "public-url",
    visibility: "public-safe",
    title: "Monthly Music Hackathon audio-program evidence",
    description:
      "Close reading of a project-history capture and the live institutional page recovered a compact 2013 creative-technology credit: Jamie made a Max/MSP program that segmented audio and reordered the clips by pitch.",
    whyItMatters:
      "Adds a precise, externally attributed example of Jamie's longstanding practice across code, media, experimentation, and public creative communities.",
    projectIds: ["monthly-music-hackathon", "participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured a bounded archive claim, held it from the current website, and opened implementation and rights research.",
    sourceIds: ["SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013"],
    claimIds: ["CLM-MUSIC-HACKATHON-SORTED-AUDIO"],
    inquiryIds: ["INQ-MUSIC-HACKATHON-SORTED-AUDIO-IMPLEMENTATION"],
    boundaries: [
      "Do not imply authorship of the source song or an organizer role.",
      "Do not republish the linked audio without rights review.",
      "Keep the current website projection held unless a creative-technology composition needs it."
    ]
  },
  {
    id: "INT-ICLOUD-CRS-OPERATING-MAP-2026-07-16",
    receivedAt: "2026-07-16",
    kind: "public-safe-memory",
    visibility: "protected-summary",
    title: "Commercial Rent Stabilization operating-map evidence",
    description:
      "A protected February 2026 artifact strengthens Jamie's campaign-memory claim with direct evidence of stakeholder power mapping, audience-specific messaging, testimony safety, coalition governance, and 30/60/90-day execution planning.",
    whyItMatters:
      "Makes the delivery value of Jamie's documentation concrete for technical-operations and public-service readers without publishing live strategy or absorbing collective campaign credit.",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    status: "matured",
    disposition: "source-recorded",
    dispositionNote:
      "Added direct protected support to the existing campaign-memory claim and strengthened its approved Technical Operations projection.",
    sourceIds: ["SRC-CRS-POWER-MAP-MESSAGING-GRID-2026"],
    claimIds: ["CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE"],
    boundaries: [
      "Do not publish internal names, assignments, targets, messages, milestones, testimony leads, or strategy.",
      "Do not imply that a working plan was collectively adopted or fully executed.",
      "Use collective-work language and keep Jamie's direct artifact authorship distinct from campaign ownership."
    ]
  },
  {
    id: "INT-ICLOUD-JOB-HUNT-EVIDENCE-CONTROL-2026-07-16",
    receivedAt: "2026-07-16",
    kind: "claim-hypothesis",
    visibility: "protected-summary",
    title: "Job-hunt quantified-claim evidence control",
    description:
      "The private job-hunt context outline was used as a verification queue and compared with the current canonical claim graph; it was not treated as proof of the accomplishments it summarizes.",
    whyItMatters:
      "Keeps the public portfolio's strongest metrics ambitious and accurate by recording which claims matured, which remain careful, and which still need research.",
    projectIds: ["professional-positioning", "technical-operations"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Recorded the orientation source as protected research control and retained open evidence work for the 2x revenue contribution and 20+ resident-artist aggregate.",
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    inquiryIds: ["INQ-JOB-HUNT-PROOF-COVERAGE-2026"],
    boundaries: [
      "Do not use a resume or job-hunt synthesis as independent accomplishment evidence.",
      "Do not publish private messages, transcripts, financial records, legal materials, or archive paths.",
      "Retain contribution language and measurement boundaries until stronger evidence changes the claim status."
    ]
  }
] satisfies IntakeRecordInput[];
