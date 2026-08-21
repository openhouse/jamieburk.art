const reviewedAt = "2026-08-03";

export const professionalRecordAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      kind: "analysis-note",
      title: "Professional record public-source pilot",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-source review",
      projectIds: ["professional-record"],
      reason: "Connect official institutional records and public event pages to a bounded account of Jamie's educational and public-intellectual practice.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-UCSC-WARREN-SACK-PROFILE-2026",
        "SRC-NYC-DIYA-VIJ-APPOINTMENT-2026",
        "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
        "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
        "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024"
      ],
      observationIds: [
        "OBS-PROFESSIONAL-RECORD-WARREN-PUBLIC-ROLE",
        "OBS-PROFESSIONAL-RECORD-DIYA-PUBLIC-ROLE",
        "OBS-PROFESSIONAL-RECORD-MIT-EVENT",
        "OBS-PROFESSIONAL-RECORD-STUDIO3-EVENT",
        "OBS-PROFESSIONAL-RECORD-WEIBEL-EVENT"
      ],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"],
      boundaries: [
        "An official biography establishes a public role, not a relationship with Jamie or willingness to recommend him.",
        "A public event page establishes the event, not Jamie's attendance, invitation status, speaking role, or private conversations."
      ]
    },
    {
      id: "INTAKE-PROFESSIONAL-RECORD-PROTECTED-RESEARCH-2026-08",
      kind: "analysis-note",
      title: "Protected recommendation-research promotion review",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex governed archival review",
      projectIds: ["professional-record"],
      reason: "Promote only public-safe findings from three exact private research candidates while retaining private communication and recommendation strategy outside the public repository.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [
        "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
        "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006"
      ],
      observationIds: [
        "OBS-PROFESSIONAL-RECORD-UCSC-EVALUATIONS",
        "OBS-PROFESSIONAL-RECORD-MIT-ATTENDANCE",
        "OBS-PROFESSIONAL-RECORD-AUSTRIA-ATTENDANCE"
      ],
      researchInquiryIds: [
        "INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION",
        "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"
      ],
      boundaries: [
        "No private email, message, transcript, contact route, recommendation strategy, communication count, or source-system locator is published.",
        "The review does not convert historical evaluation, institutional overlap, or continued contact into present endorsement."
      ]
    },
    {
      id: "INTAKE-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
      kind: "photo-lead",
      title: "Professional record governed photo field",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex governed photo review",
      projectIds: ["professional-record"],
      reason: "Retain metadata-only knowledge that relevant symposium photographs exist without publishing pixels, identities, or private archive locators.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08"],
      observationIds: ["OBS-PROFESSIONAL-RECORD-MIT-PHOTO-FIELD"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-PHOTO-RIGHTS"],
      boundaries: [
        "The photo field remains metadata-only and publication-review-required.",
        "Presence in a photograph does not establish endorsement, testimony, supervision, or consent to publish."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-PROFESSIONAL-RECORD-WARREN-PUBLIC-ROLE",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-UCSC-WARREN-SACK-PROFILE-2026",
      project: "professional-record",
      kind: "source-fact",
      text: "UC Santa Cruz identifies Warren Sack as a media theorist, software designer, artist, and professor whose work concerns online public space and public discussion.",
      locator: "Official UCSC directory profile",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION"],
      limitations: [
        "The current profile establishes Warren Sack's public role and expertise, not what he thinks about Jamie today."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-DIYA-PUBLIC-ROLE",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-NYC-DIYA-VIJ-APPOINTMENT-2026",
      project: "professional-record",
      kind: "source-fact",
      text: "The Mayor's Office announced Diya Vij as Commissioner of the New York City Department of Cultural Affairs in February 2026 and described her earlier DCLA work on PAIR, equity initiatives, and CreateNYC.",
      locator: "Official appointment announcement",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION"],
      limitations: [
        "The appointment record does not establish Jamie-specific knowledge, supervision, endorsement, recommendation willingness, or authority to speak for the City about Jamie."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-UCSC-EVALUATIONS",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PROTECTED-RESEARCH-2026-08",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "professional-record",
      kind: "source-fact",
      text: "A protected educational record contains dated instructor evaluations of Jamie's work in digital media, social software, media archaeology, performance, and installation practice from 2004 through 2006.",
      locator: "Metadata-only educational-record review",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-UCSC-COMPUTATIONAL-MEDIA-FOUNDATION"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION"],
      limitations: [
        "The raw evaluations and identifiers remain outside the repository.",
        "Dated instructor observations are not current endorsements or evidence of recent operational supervision."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-MIT-EVENT",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
      project: "professional-record",
      kind: "source-fact",
      text: "MIT's public calendar records the Interrogative Design Symposium at MIT Art, Culture and Technology on December 5 and 6, 2024.",
      locator: "MIT Events Calendar",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-MIT-INTERROGATIVE-DESIGN-ATTENDANCE-2024"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"],
      limitations: [
        "The public calendar does not identify every attendee or establish Jamie's attendance by itself."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-MIT-ATTENDANCE",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PROTECTED-RESEARCH-2026-08",
      sourceId: "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
      comparisonSourceIds: [
        "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
        "SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08"
      ],
      project: "professional-record",
      kind: "bounded-inference",
      text: "A governed private research package connects Jamie's contemporaneous correspondence and personal photographs to his attendance at the MIT Interrogative Design Symposium.",
      locator: "Protected research synthesis; no private payload exposed",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-MIT-INTERROGATIVE-DESIGN-ATTENDANCE-2024"],
      researchInquiryIds: [
        "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS",
        "INQ-PROFESSIONAL-RECORD-PHOTO-RIGHTS"
      ],
      limitations: [
        "The evidence supports attendance and photography, not an invited role, speaking credit, event production, or another participant's endorsement of Jamie.",
        "No symposium transcript was recovered in the bounded review."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-STUDIO3-EVENT",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
      project: "professional-record",
      kind: "source-fact",
      text: "The University of Innsbruck's Studio3 describes AI Made Me Do It as a 2024 symposium and exhibition about artificial intelligence in everyday life, architecture, spatial practice, data ethics, labor, and environmental impact.",
      locator: "Studio3 public event page",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-AUSTRIA-MEDIA-SYMPOSIA-2024"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"],
      limitations: [
        "The public program does not provide a complete audience roster or establish Jamie's attendance by itself."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-WEIBEL-EVENT",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024",
      project: "professional-record",
      kind: "source-fact",
      text: "The University of Applied Arts Vienna describes In Terms of Media as a 2024 Weibel Institute symposium on data materialism, techno-poetics, atmospheres of conflict, and planetary interfaces.",
      locator: "University of Applied Arts Vienna public event record",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-AUSTRIA-MEDIA-SYMPOSIA-2024"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"],
      limitations: [
        "The public program does not establish Jamie's attendance, invitation, contribution, or private conversations."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-AUSTRIA-ATTENDANCE",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PROTECTED-RESEARCH-2026-08",
      sourceId: "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
      comparisonSourceIds: [
        "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
        "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024"
      ],
      project: "professional-record",
      kind: "participant-memory",
      text: "Jamie's contemporaneous first-person record says he traveled to attend AI Made Me Do It in Innsbruck and In Terms of Media in Vienna in November 2024, bringing working materials about Compassion Software and continuing conversations afterward.",
      locator: "Public-safe first-person synthesis; protected correspondence withheld",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-AUSTRIA-MEDIA-SYMPOSIA-2024"],
      researchInquiryIds: [
        "INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION",
        "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"
      ],
      limitations: [
        "Attendance and Jamie's own working purpose are first-person claims; the public programs do not list every attendee.",
        "The record does not establish a formal invitation, presentation slot, institutional affiliation, transcript, or endorsement from anyone Jamie met."
      ]
    },
    {
      id: "OBS-PROFESSIONAL-RECORD-MIT-PHOTO-FIELD",
      intakeId: "INTAKE-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
      sourceId: "SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
      comparisonSourceIds: ["SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024"],
      project: "professional-record",
      kind: "visual-observation",
      text: "A governed, metadata-minimized review field includes symposium podium and panel views associated with the MIT Interrogative Design event.",
      locator: "Metadata-only photo-field record",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-JAMIE-MIT-INTERROGATIVE-DESIGN-ATTENDANCE-2024"],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-PHOTO-RIGHTS"],
      limitations: [
        "No image payload, Photos identifier, person label, GPS data, or private locator is committed.",
        "The images remain publication-review-required and cannot establish another person's view of Jamie."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
      title: "Governed professional-record research comparison, August 2026",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Governed private comparison of three recommendation-research candidates, August 2026.",
      publicNote: "Only public-safe synthesis and source fingerprints enter this repository; protected payloads remain outside Git.",
      protectedLocatorId: "RESEARCH-PROFESSIONAL-RECORD-2026-08",
      supportsGenerally: [
        "bounded source comparison",
        "first-person attendance context",
        "educational-record metadata",
        "promotion and withholding decisions"
      ],
      doesNotEstablish: [
        "publication permission",
        "recommendation willingness",
        "current endorsement",
        "complete communication coverage",
        "rights to reproduce private text or photographs"
      ]
    },
    {
      id: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      title: "UCSC narrative evaluations, 2004-2006",
      organization: "University of California, Santa Cruz",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Metadata-only record of Jamie Burkart's UCSC narrative evaluations, 2004-2006.",
      publicNote: "The protected educational record is paraphrased only; raw text and identifiers remain outside the public repository.",
      protectedLocatorId: "SOURCE-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      supportsGenerally: [
        "dated instructor evaluation",
        "early digital-media and social-software work",
        "media-archaeology and installation practice"
      ],
      doesNotEstablish: [
        "current endorsement",
        "recent operational supervision",
        "permission to reproduce instructor text",
        "individual authorship of every group-project component"
      ]
    },
    {
      id: "SRC-UCSC-WARREN-SACK-PROFILE-2026",
      title: "Warren Sack - Film and Digital Media Department",
      organization: "University of California, Santa Cruz",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://film.ucsc.edu/directory/wsack/",
      preferredPublicUrl: "canonical",
      publicCitation: "University of California, Santa Cruz, Film and Digital Media Department, Warren Sack directory profile, accessed August 3, 2026.",
      publicNote: "The official profile establishes Warren Sack's public role and subject-matter background.",
      supportsGenerally: [
        "media theory",
        "software design",
        "digital arts and studies",
        "online public space and public discussion"
      ],
      doesNotEstablish: [
        "current knowledge of Jamie's portfolio",
        "recommendation willingness",
        "present endorsement",
        "recent supervision of Jamie"
      ]
    },
    {
      id: "SRC-NYC-DIYA-VIJ-APPOINTMENT-2026",
      title: "Mayor appoints Diya Vij as Commissioner of the Department of Cultural Affairs",
      organization: "New York City Mayor's Office",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-02-28",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.nyc.gov/mayors-office/news/2026/02/mayor-zohran-mamdani-appoints-diya-vij-as-commissioner-of-the-de",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Mayor's Office, appointment of Diya Vij as Commissioner of the Department of Cultural Affairs, February 28, 2026.",
      publicNote: "The announcement also describes Vij's earlier DCLA work on PAIR, equity initiatives, and CreateNYC.",
      supportsGenerally: [
        "current DCLA commissioner role",
        "earlier DCLA service",
        "PAIR work",
        "CreateNYC contribution"
      ],
      doesNotEstablish: [
        "Jamie-specific knowledge",
        "supervision of Jamie",
        "recommendation willingness",
        "City endorsement of Jamie",
        "permission to characterize a private relationship"
      ]
    },
    {
      id: "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
      title: "Interrogative Design Symposium",
      organization: "Massachusetts Institute of Technology",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://calendar.mit.edu/event/interrogative-design-symposium",
      preferredPublicUrl: "canonical",
      publicCitation: "Massachusetts Institute of Technology Events Calendar, 'Interrogative Design Symposium,' December 5-6, 2024.",
      publicNote: "The public listing establishes the event, dates, MIT venue, and stated focus.",
      supportsGenerally: [
        "event title",
        "December 5-6, 2024 dates",
        "MIT Art, Culture and Technology context",
        "interrogative design and public-discourse focus"
      ],
      doesNotEstablish: [
        "complete attendee roster",
        "Jamie's invitation status",
        "Jamie's speaking role",
        "private conversations",
        "another participant's endorsement of Jamie"
      ]
    },
    {
      id: "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
      title: "AI Made Me Do It symposium and exhibition",
      organization: "Studio3, Department of Experimental Architecture, University of Innsbruck",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-10-18",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.studio3.me/studio3_event/symposiumexhibition-studio3/",
      preferredPublicUrl: "canonical",
      publicCitation: "Studio3, University of Innsbruck, 'AI Made Me Do It' symposium and exhibition, 2024.",
      publicNote: "The public program frames AI through everyday life, architecture, spatial practice, labor, data ethics, and environmental impact.",
      supportsGenerally: [
        "event title",
        "University of Innsbruck context",
        "architecture and spatial-practice focus",
        "AI, labor, data, and environmental themes"
      ],
      doesNotEstablish: [
        "complete audience roster",
        "Jamie's attendance by itself",
        "formal invitation or presentation credit",
        "private conversations",
        "institutional endorsement"
      ]
    },
    {
      id: "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024",
      title: "In Terms of Media symposium",
      organization: "Weibel Institute for Digital Cultures, University of Applied Arts Vienna",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.dieangewandte.at/en/news/detail?artikel_id=1729737738229",
      preferredPublicUrl: "canonical",
      publicCitation: "University of Applied Arts Vienna and the Weibel Institute for Digital Cultures, 'In Terms of Media,' 2024.",
      publicNote: "The institutional record identifies the symposium's four-part frame and its relationship to the Weibel Institute's study of digital cultures.",
      supportsGenerally: [
        "event title",
        "Weibel Institute and University of Applied Arts Vienna context",
        "data materialism",
        "techno-poetics",
        "atmospheres of conflict",
        "planetary interfaces"
      ],
      doesNotEstablish: [
        "complete audience roster",
        "Jamie's attendance by itself",
        "formal invitation or presentation credit",
        "private conversations",
        "institutional endorsement"
      ]
    },
    {
      id: "SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
      title: "Professional record governed photo field - metadata boundary",
      kind: "photo-metadata",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Metadata-only record of a governed professional-record photo review, August 2026.",
      publicNote: "No pixels, Photos identifiers, people metadata, GPS, or private archive paths enter the public repository.",
      protectedLocatorId: "PHOTO-FIELD-PROFESSIONAL-RECORD-2026-08",
      supportsGenerally: [
        "existence of a governed symposium photo field",
        "podium and panel visual context",
        "future photo-rights inquiry"
      ],
      doesNotEstablish: [
        "publication permission",
        "depicted-person consent",
        "endorsement",
        "speaker identity beyond separately verified context",
        "complete event meaning"
      ],
      media: {
        mediaKind: "photograph",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold"
      }
    }
  ],

  claims: [
    {
      id: "CLM-JAMIE-UCSC-COMPUTATIONAL-MEDIA-FOUNDATION",
      project: "professional-record",
      internalClaim: "Dated UCSC narrative evaluations document Jamie's early work across computational media, social software, media archaeology, performance, and installation practice from 2004 through 2006.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Protected UCSC educational records document an early practice spanning computational media, social software, media archaeology, performance, and installation.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
          relationship: "private-support",
          supports: ["dated educational evaluation", "named fields of early work"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use paraphrase only unless the instructors and rights decision owner approve quotation.",
        "Historical evaluation does not establish current endorsement, current portfolio knowledge, or recent supervision.",
        "Retain group-work boundaries and unresolved title details."
      ],
      antiClaims: [
        "Warren Sack or Margaret Morse currently endorses Jamie",
        "the evaluations prove current employment performance",
        "Jamie individually authored every group-project component"
      ],
      researchInquiryIds: ["INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "CLM-JAMIE-MIT-INTERROGATIVE-DESIGN-ATTENDANCE-2024",
      project: "professional-record",
      internalClaim: "A public MIT event record, contemporaneous private context, and governed personal photographs support that Jamie attended and photographed the December 2024 Interrogative Design Symposium.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Jamie attended and photographed MIT's 2024 Interrogative Design Symposium as part of his continuing inquiry into design, public space, media, and democratic participation.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
          relationship: "context",
          supports: ["event identity", "dates", "MIT context"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["Jamie's attendance", "contemporaneous event context"],
          confidence: "moderate",
          renderCitation: false
        },
        {
          sourceId: "SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
          relationship: "private-support",
          supports: ["Jamie's personal photographs from the event"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe Jamie as an attendee and photographer, not an invited speaker, organizer, institutional representative, or supervised participant.",
        "Do not publish photographs before rights, consent, credit, caption, crop, and destination review.",
        "The event does not establish another participant's endorsement of Jamie."
      ],
      antiClaims: [
        "Jamie presented at the Interrogative Design Symposium",
        "MIT invited Jamie as a featured participant",
        "Warren Sack's presence constitutes endorsement of Jamie"
      ],
      researchInquiryIds: [
        "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS",
        "INQ-PROFESSIONAL-RECORD-PHOTO-RIGHTS"
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "CLM-JAMIE-AUSTRIA-MEDIA-SYMPOSIA-2024",
      project: "professional-record",
      internalClaim: "Jamie's contemporaneous first-person record, read alongside public institutional programs, supports that he traveled to attend AI Made Me Do It in Innsbruck and In Terms of Media in Vienna in November 2024 while developing Compassion Software.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text: "In November 2024, Jamie traveled to public symposia in Innsbruck and Vienna while developing Compassion Software and testing how architectural and cultural-studies perspectives might change software practice.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
          relationship: "context",
          supports: ["Innsbruck event identity", "architectural and AI themes"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024",
          relationship: "context",
          supports: ["Vienna event identity", "media and digital-cultures themes"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["Jamie's first-person attendance account", "Compassion Software working purpose"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Attribute attendance and working purpose to Jamie's contemporaneous first-person record.",
        "Do not claim a formal invitation, speaking role, program credit, institutional affiliation, or another participant's endorsement.",
        "No symposium transcript was recovered in the bounded review."
      ],
      antiClaims: [
        "Jamie was a featured presenter at either symposium",
        "the institutions adopted Compassion Software",
        "private conversations constituted professional endorsement"
      ],
      researchInquiryIds: [
        "INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION",
        "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS"
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-PROFESSIONAL-RECORD-THIRD-PARTY-RECEPTION",
      project: "professional-record",
      question: "Which third-party descriptions of Jamie's work can be made public with accurate attribution, context, rights, consent, and a correction path?",
      methods: [
        "Separate public institutional records from protected educational records and private correspondence.",
        "Seek a public original or direct human permission before quotation.",
        "Ask each person to define the work they directly observed, preferred attribution, allowed surfaces, and correction or withdrawal route."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Official public sources establish institutional roles and some project context.",
        "Protected educational records support dated paraphrase with boundaries.",
        "Private correspondence and recommendation research do not authorize public quotation, relationship characterization, or endorsement claims."
      ],
      limitations: [
        "No current recommendation willingness, quotation permission, or universal public-use grant is inferred.",
        "A person's public role does not establish their relationship with Jamie."
      ],
      sourceIds: [
        "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
        "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        "SRC-UCSC-WARREN-SACK-PROFILE-2026",
        "SRC-NYC-DIYA-VIJ-APPOINTMENT-2026"
      ],
      publicSummary: "Public institutional records and protected educational metadata are usable within strict boundaries; private correspondence and recommendation strategy remain outside the public record.",
      protectedLocatorId: "INQUIRY-PROFESSIONAL-RECEPTION-2026-08"
    },
    {
      id: "INQ-PROFESSIONAL-RECORD-SYMPOSIUM-TRANSCRIPTS",
      project: "professional-record",
      question: "Can authoritative transcripts, participant records, or public documentation of Jamie's 2024 MIT, Innsbruck, and Vienna symposium encounters be recovered?",
      methods: [
        "Reviewed the three exact private research candidates for event-source references and transcript coverage.",
        "Verified current official event pages through public web access.",
        "Kept Jamie's first-person attendance account separate from official program facts and third-party reception."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Official public pages establish all three events and their institutional contexts.",
        "Protected context supports Jamie's attendance at the three events.",
        "No MIT, Studio3, or Weibel symposium transcript involving Jamie was recovered in the bounded package review."
      ],
      limitations: [
        "Not recovered does not mean no transcript, video, roster, or later public reference exists.",
        "Public event programs do not prove audience attendance or private conversation content."
      ],
      sourceIds: [
        "SRC-PROFESSIONAL-RECORD-RESEARCH-2026-08",
        "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024",
        "SRC-STUDIO3-AI-MADE-ME-DO-IT-2024",
        "SRC-WEIBEL-IN-TERMS-OF-MEDIA-2024"
      ],
      publicSummary: "Official pages establish the three 2024 symposia; Jamie's attendance remains bounded by first-person and protected evidence, and no Jamie-attributed symposium transcript has been recovered.",
      protectedLocatorId: "INQUIRY-PROFESSIONAL-SYMPOSIA-2026-08"
    },
    {
      id: "INQ-PROFESSIONAL-RECORD-PHOTO-RIGHTS",
      project: "professional-record",
      question: "Which symposium photographs can support future Knowledge Wiki or portfolio composition with rights, consent, credit, context, and accessibility intact?",
      methods: [
        "Retained only metadata-minimized photo-field knowledge in the public repository.",
        "Separated visual evidence from attendance, speaker identity, relationship, and endorsement claims.",
        "Deferred pixels and placement until Jamie, rights holders, depicted people where appropriate, and the destination editor review the exact candidate."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "A governed private review field includes MIT symposium podium and panel views.",
        "The photographs are useful research objects but remain publication-review-required."
      ],
      limitations: [
        "Rights holder, depicted-person review, caption, crop, accessibility, and destination approval remain open.",
        "No image payload or private photo-library identifier is committed."
      ],
      sourceIds: [
        "SRC-PROFESSIONAL-RECORD-PHOTO-FIELD-2026-08",
        "SRC-MIT-INTERROGATIVE-DESIGN-SYMPOSIUM-2024"
      ],
      publicSummary: "Relevant symposium photographs are retained as metadata-only research leads; no public image use is approved by this pass.",
      protectedLocatorId: "INQUIRY-PROFESSIONAL-PHOTOS-2026-08"
    }
  ]
};
