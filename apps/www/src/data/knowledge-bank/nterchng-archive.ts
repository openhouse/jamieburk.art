const reviewedAt = "2026-07-15";

export const nterChngArchive = {
  intakeItems: [
    {
      id: "INTAKE-NTERCHNG-PROJECT-ARCHIVE-2026",
      kind: "public-url",
      title: "Archived NTER CHNG project site",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nterchng"],
      reason:
        "Preserve a collaborative interactive-installation project and its early integration of software, physical space, and public participation.",
      sourceUrl:
        "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-NTERCHNG-PROJECT-SITE-WAYBACK-2011-01-28",
        "SRC-NTERCHNG-PITCH-EVENT-2010-01-07"
      ],
      observationIds: [
        "OBS-NTERCHNG-THREE-PERSON-COLLABORATION",
        "OBS-NTERCHNG-2010-COCOON-EXHIBITION",
        "OBS-NTERCHNG-SOFTWARE-ARCHITECTURAL-FORM",
        "OBS-NTERCHNG-PUBLIC-MANY-TO-MANY-DIALOGUE"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      boundaries: [
        "Credit NTER CHNG jointly to Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
        "Do not infer individual division of labor, participation totals, or technical architecture beyond the recovered sources."
      ]
    },
    {
      id: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      kind: "public-url",
      title: "NTER CHNG in America: Now and Here Kansas City",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nterchng", "america-now-and-here"],
      reason:
        "Verify and preserve the later exhibition relationship through the event's own archived artist records and bounded institutional context.",
      sourceUrl:
        "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
        "SRC-ANH-KC-VISUAL-ARTISTS-2011-05-05",
        "SRC-ANH-KC-KCSTUDIO-2011-05-06",
        "SRC-ANH-NERMAN-2011-04-30",
        "SRC-ANH-SMITHSONIAN-COCOON-POSTER-2011"
      ],
      observationIds: [
        "OBS-ANH-KC-NTERCHNG-ARTIST-PAGE",
        "OBS-ANH-KC-VISUAL-ARTIST-INDEX",
        "OBS-ANH-KC-LAUNCH-CONTEXT",
        "OBS-ANH-NERMAN-CONTEXT",
        "OBS-NTERCHNG-CROSS-DISCIPLINARY-PRACTICE"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      boundaries: [
        "The official Kansas City artist page establishes the trio's inclusion; the Nerman Museum page supplies exhibition context but does not name NTER CHNG or Jamie.",
        "Do not describe the Kansas City inclusion as participation in every stop of the proposed national tour.",
        "Do not reproduce the historical phone numbers printed in the archived artist page."
      ]
    },
    {
      id: "INTAKE-NTERCHNG-INSTALLER-WORKING-DOC-2026",
      kind: "public-artifact",
      title: "NTER CHNG Installer working document",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nterchng", "america-now-and-here"],
      reason:
        "Preserve contemporaneous evidence of the installation-production system required to restage NTER CHNG for America: Now and Here in May 2011.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011"],
      observationIds: [
        "OBS-NTERCHNG-ANH-INSTALL-PRODUCTION-SYSTEM",
        "OBS-NTERCHNG-ANH-SOFTWARE-RELIABILITY-WORK",
        "OBS-NTERCHNG-ANH-RESTAGING-PLAN"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      boundaries: [
        "The working document is a production plan, not proof that every listed task was completed exactly as written.",
        "The checklist is collective and does not assign individual responsibility for software, fabrication, transport, installation, or teardown.",
        "Do not expose the shared-document URL, private staging location, travel details, server custody, or entry phone numbers."
      ]
    },
    {
      id: "INTAKE-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2026",
      kind: "public-artifact",
      title: "NTER CHNG 2011 prompt transcript and exhibit-information working document",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["nterchng", "america-now-and-here"],
      reason:
        "Retain the installation's prompt framework, a bounded sample of the exchange form, the 2010 exhibit description, collective credit, and research leads without republishing phone numbers or message text.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011"],
      observationIds: [
        "OBS-NTERCHNG-ANH-PROMPT-FRAMEWORK",
        "OBS-NTERCHNG-PROTECTED-MESSAGE-SAMPLE",
        "OBS-NTERCHNG-JAMIE-PRIOR-PRACTICE-LEADS"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      boundaries: [
        "Do not reproduce historical phone numbers, message text, or a sender-to-message crosswalk.",
        "Do not convert numbered sender lines into verified unique-person or participation counts.",
        "Treat the embedded artist biography as a project-authored research lead requiring independent source verification."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NTERCHNG-THREE-PERSON-COLLABORATION",
      intakeId: "INTAKE-NTERCHNG-PROJECT-ARCHIVE-2026",
      sourceId: "SRC-NTERCHNG-PROJECT-SITE-WAYBACK-2011-01-28",
      project: "nterchng",
      kind: "source-fact",
      text:
        "The archived project site identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
      locator: "Page title, metadata, and opening project description",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-COLLABORATIVE-INSTALLATION"],
      researchInquiryIds: [],
      limitations: ["The page does not assign individual responsibilities within the collaboration."]
    },
    {
      id: "OBS-NTERCHNG-2010-COCOON-EXHIBITION",
      intakeId: "INTAKE-NTERCHNG-PROJECT-ARCHIVE-2026",
      sourceId: "SRC-NTERCHNG-PITCH-EVENT-2010-01-07",
      project: "nterchng",
      kind: "source-fact",
      text:
        "A contemporaneous Pitch listing places the installation at the Arts Incubator's Cocoon Gallery in Kansas City, with an opening on January 8, 2010.",
      locator: "Event title, description, and date line",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-COLLABORATIVE-INSTALLATION"],
      researchInquiryIds: [],
      limitations: [
        "The listing establishes the opening event, not attendance or the complete exhibition run."
      ]
    },
    {
      id: "OBS-NTERCHNG-SOFTWARE-ARCHITECTURAL-FORM",
      intakeId: "INTAKE-NTERCHNG-PROJECT-ARCHIVE-2026",
      sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
      project: "nterchng",
      kind: "source-fact",
      text:
        "The recovered artist statement describes NTER CHNG as equal parts software application and architectural installation, organized around a two-sided digital wall in the gallery.",
      locator: "Artist's Statement, first paragraph",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION",
        "CLM-NTERCHNG-EARLY-PARTICIPATORY-SYSTEMS-PRACTICE"
      ],
      researchInquiryIds: [],
      limitations: [
        "The public description does not preserve the source code, system diagram, carrier, moderation workflow, or individual implementation roles."
      ]
    },
    {
      id: "OBS-NTERCHNG-PUBLIC-MANY-TO-MANY-DIALOGUE",
      intakeId: "INTAKE-NTERCHNG-PROJECT-ARCHIVE-2026",
      sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
      project: "nterchng",
      kind: "source-fact",
      text:
        "The artist statement says visitors used their phones to communicate through both faces of the wall, transforming private one-to-one texting into a public many-to-many exchange.",
      locator: "Artist's Statement, first through third paragraphs",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION",
        "CLM-NTERCHNG-EARLY-PARTICIPATORY-SYSTEMS-PRACTICE"
      ],
      researchInquiryIds: [],
      limitations: [
        "The statement describes design intent and interaction form, not independently measured participant behavior or impact."
      ]
    },
    {
      id: "OBS-ANH-KC-NTERCHNG-ARTIST-PAGE",
      intakeId: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
      project: "america-now-and-here",
      kind: "source-fact",
      text:
        "America: Now and Here's archived Kansas City site gives Drew Bolton, Jamie Burkart, and Garrett Fuselier a dedicated Visual Artists page and presents NTER CHNG as their work.",
      locator: "Page title, Visual Artists heading, and Artist's Statement",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "The page establishes Kansas City exhibition inclusion, not participation in every stop of a national tour."
      ]
    },
    {
      id: "OBS-ANH-KC-VISUAL-ARTIST-INDEX",
      intakeId: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      sourceId: "SRC-ANH-KC-VISUAL-ARTISTS-2011-05-05",
      project: "america-now-and-here",
      kind: "source-fact",
      text:
        "The exhibition's archived Visual Artists index separately lists Drew Bolton, Jamie Burkart, and Garrett Fuselier among the Kansas City artists.",
      locator: "Visual Artists list",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION"],
      researchInquiryIds: [],
      limitations: [
        "The index establishes artist inclusion but does not, by itself, identify the exhibited work or divide credit."
      ]
    },
    {
      id: "OBS-ANH-KC-LAUNCH-CONTEXT",
      intakeId: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      sourceId: "SRC-ANH-KC-KCSTUDIO-2011-05-06",
      project: "america-now-and-here",
      kind: "context",
      text:
        "A contemporaneous Kansas City announcement describes the May 6-28, 2011 launch as a multidisciplinary public art experience bringing national work together with more than 100 Kansas City-area artists.",
      locator: "Opening announcement and local-artist section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION"],
      researchInquiryIds: [],
      limitations: [
        "The announcement does not name Jamie, the trio, or NTER CHNG in its selected examples."
      ]
    },
    {
      id: "OBS-ANH-NERMAN-CONTEXT",
      intakeId: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      sourceId: "SRC-ANH-NERMAN-2011-04-30",
      project: "america-now-and-here",
      kind: "context",
      text:
        "The Nerman Museum's preserved exhibition page documents America: Now and Here's Kansas City launch and a Barbara Kruger truck stop at the museum on May 11-12, 2011.",
      locator: "Article body and exhibition dates",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: [],
      limitations: [
        "The page does not name NTER CHNG, Jamie, Drew Bolton, or Garrett Fuselier and is not direct evidence that their work appeared at the Nerman stop."
      ]
    },
    {
      id: "OBS-NTERCHNG-CROSS-DISCIPLINARY-PRACTICE",
      intakeId: "INTAKE-NTERCHNG-AMERICA-NOW-HERE-2026",
      sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
      project: "nterchng",
      kind: "context",
      text:
        "The official artist statement describes the trio as combining scenic design, computer programming, motion graphics, and experiential production to create a social information space.",
      locator: "Artist's Statement, final paragraph",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-EARLY-PARTICIPATORY-SYSTEMS-PRACTICE"],
      researchInquiryIds: [],
      limitations: [
        "The statement attributes this combined practice to the trio and does not assign each discipline to a named collaborator."
      ]
    },
    {
      id: "OBS-NTERCHNG-ANH-INSTALL-PRODUCTION-SYSTEM",
      intakeId: "INTAKE-NTERCHNG-INSTALLER-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
      project: "nterchng",
      kind: "source-fact",
      text:
        "A contemporaneous installation checklist treats the America: Now and Here restaging as an integrated production system spanning organizer coordination, venue permissions, material testing, wall fabrication, projectors, display computers, transport, network wiring, gallery tuning, and teardown.",
      locator: "Installation plan sections from pre-prep through teardown",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-ANH-INSTALL-PRODUCTION-SYSTEM"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "The checklist documents planned production work, not completion of every task or the person responsible for each task."
      ]
    },
    {
      id: "OBS-NTERCHNG-ANH-SOFTWARE-RELIABILITY-WORK",
      intakeId: "INTAKE-NTERCHNG-INSTALLER-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
      project: "nterchng",
      kind: "source-fact",
      text:
        "The checklist calls for revisiting server-side and wall-side software, addressing rapid-message back-queuing, arranging hosting, and connecting computers through the installation network.",
      locator: "Pre-prep software and remaining-installation tasks",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-ANH-INSTALL-PRODUCTION-SYSTEM"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "The document does not preserve source code, a complete architecture, executed test results, or individual software authorship."
      ]
    },
    {
      id: "OBS-NTERCHNG-ANH-RESTAGING-PLAN",
      intakeId: "INTAKE-NTERCHNG-INSTALLER-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
      project: "america-now-and-here",
      kind: "source-fact",
      text:
        "The document is titled NTER CHNG Installer, identifies itself as staging the installation for America: Now and Here in May 2011, and plans installation work at Leedy-Voulkos.",
      locator: "Document title, subtitle, and install heading",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "A working plan corroborates intended restaging and venue preparation; it is not an independent completion record or proof of display dates."
      ]
    },
    {
      id: "OBS-NTERCHNG-ANH-PROMPT-FRAMEWORK",
      intakeId: "INTAKE-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
      project: "nterchng",
      kind: "source-fact",
      text:
        "A contemporaneous working document preserves three prompt themes for the installation: the meaning of a great American journey, first encounters with art, and the moment or relationship through which a person defined themself as an artist.",
      locator: "Prompt headings preceding the protected response samples",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-PROMPTED-PARTICIPATION"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "The document does not establish who authored each prompt, how consistently prompts were used in the gallery, or how participants interpreted them."
      ]
    },
    {
      id: "OBS-NTERCHNG-PROTECTED-MESSAGE-SAMPLE",
      intakeId: "INTAKE-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
      project: "nterchng",
      kind: "limitation",
      text:
        "The working document contains a small April 2011 prompt-and-response sample associated with historical phone numbers; the knowledge bank retains only its existence and structure, not the numbers or message text.",
      locator: "Protected April 5-6, 2011 transcript section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NTERCHNG-PROMPTED-PARTICIPATION"],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "Numbered sender lines do not establish unique people, public participants, consent to republish, a complete message corpus, or installation-wide participation."
      ]
    },
    {
      id: "OBS-NTERCHNG-JAMIE-PRIOR-PRACTICE-LEADS",
      intakeId: "INTAKE-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2026",
      sourceId: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
      project: "nterchng",
      kind: "research-lead",
      text:
        "The embedded project-authored biography points toward earlier interactive-video exhibitions and a Charlotte Street Urban Culture Project installation addressing the Missouri River as a social network.",
      locator: "About the Artists, Jamie Burkart biography",
      status: "extracted",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      limitations: [
        "The biography is a project-authored lead, not independent proof of the named exhibitions, dates, venues, titles, or Jamie's exact role."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
      title: "NTER CHNG Installer working document",
      organization: "NTER CHNG",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "Google Drive metadata dates the document to April 13, 2011",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe close reading of a contemporaneous NTER CHNG installation-planning document for America: Now and Here, April 2011.",
      publicNote:
        "The record retains production-system findings while withholding the shared-document URL, private staging and travel details, server custody, and telephone-entry information.",
      supportsGenerally: [
        "May 2011 America: Now and Here restaging plan",
        "Leedy-Voulkos installation planning",
        "organizer and venue coordination",
        "software reliability and hosting work",
        "wall fabrication, projectors, display computers, wiring, transport, tuning, and teardown"
      ],
      doesNotEstablish: [
        "completion of every planned task",
        "individual division of labor",
        "source-code authorship or ownership",
        "complete technical architecture",
        "actual exhibition dates or attendance",
        "permission to publish the underlying working document"
      ],
      protectedLocatorId: "DRIVE-NTERCHNG-INSTALLER-2011"
    },
    {
      id: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
      title: "NTER CHNG 2011 prompt transcript and exhibit-information working document",
      organization: "NTER CHNG",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "Google Drive metadata dates the document to April 6, 2011",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe close reading of a contemporaneous NTER CHNG prompt, response-sample, and exhibit-information working document, April 2011.",
      publicNote:
        "The record retains prompt themes, collective project description, and research leads without reproducing historical phone numbers, message text, or the shared-document URL.",
      supportsGenerally: [
        "three installation prompt themes",
        "existence and structure of a small April 2011 response sample",
        "three-person collaborative credit",
        "2010 exhibit-information language",
        "research leads concerning Jamie's earlier interactive-media practice"
      ],
      doesNotEstablish: [
        "unique people or participation totals",
        "consent to republish phone numbers or message text",
        "complete message corpus",
        "individual prompt or message authorship",
        "independent verification of the embedded artist biographies",
        "permission to publish the underlying working document"
      ],
      protectedLocatorId: "DRIVE-NTERCHNG-PROMPT-TRANSCRIPT-2011"
    },
    {
      id: "SRC-NTERCHNG-PROJECT-SITE-WAYBACK-2011-01-28",
      title: "NTER CHNG project site",
      organization: "NTER CHNG",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-01-28T19:33:50Z",
      accessedAt: reviewedAt,
      archiveUrl:
        "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Archived NTER CHNG project site identifying the interactive texting installation and its three collaborators.",
      publicNote:
        "The single recovered HTML capture preserves the project identity, collaborators, venue, and link labels; its linked press release was not recovered.",
      supportsGenerally: [
        "NTER CHNG project identity",
        "Drew Bolton, Jamie Burkart, and Garrett Fuselier as collaborators",
        "interactive texting installation",
        "Arts Incubator Cocoon Gallery venue"
      ],
      doesNotEstablish: [
        "individual division of labor",
        "source-code ownership",
        "participation totals",
        "measured audience impact",
        "the complete 2010 exhibition chronology"
      ]
    },
    {
      id: "SRC-NTERCHNG-PITCH-EVENT-2010-01-07",
      title: "NTR CHNG",
      organization: "The Pitch",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2010-01-07",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
      preferredPublicUrl: "canonical",
      publicCitation: "The Pitch, 'NTR CHNG,' January 7, 2010.",
      publicNote:
        "Contemporaneous event listing for the January 8, 2010 opening at Arts Incubator's Cocoon Gallery.",
      supportsGenerally: [
        "January 8, 2010 opening",
        "Cocoon Gallery presentation",
        "software-and-architecture installation description",
        "digital-wall interaction"
      ],
      doesNotEstablish: [
        "complete exhibition dates",
        "attendance",
        "individual collaborator responsibilities",
        "later America: Now and Here inclusion"
      ]
    },
    {
      id: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
      title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      organization: "America: Now and Here Kansas City",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-05-18T07:16:26Z",
      accessedAt: reviewedAt,
      archiveUrl:
        "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
      preferredPublicUrl: "archive",
      publicCitation:
        "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived May 18, 2011.",
      publicNote:
        "The official artist page presents the trio as visual artists and preserves their NTER CHNG statement. It also contains historical participant phone numbers, which must not be reproduced in portfolio copy or documentation.",
      supportsGenerally: [
        "the trio's inclusion as visual artists",
        "NTER CHNG as their collaborative work",
        "software-and-architectural installation form",
        "public many-to-many texting interaction",
        "the trio's combined disciplinary practice"
      ],
      doesNotEstablish: [
        "individual division of labor",
        "participation totals",
        "measured impact",
        "inclusion at every America: Now and Here venue",
        "current consent to republish historical phone numbers"
      ]
    },
    {
      id: "SRC-ANH-KC-VISUAL-ARTISTS-2011-05-05",
      title: "The Visual Artists",
      organization: "America: Now and Here Kansas City",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-05-05T00:29:28Z",
      accessedAt: reviewedAt,
      archiveUrl:
        "https://web.archive.org/web/20110505002928/http://kansascity.americanowandhere.org/the-visual-artists/",
      preferredPublicUrl: "archive",
      publicCitation:
        "America: Now and Here Kansas City, 'The Visual Artists,' archived May 5, 2011.",
      publicNote:
        "The official index lists Drew Bolton, Jamie Burkart, and Garrett Fuselier among the Kansas City visual artists.",
      supportsGenerally: [
        "Drew Bolton listed as a visual artist",
        "Jamie Burkart listed as a visual artist",
        "Garrett Fuselier listed as a visual artist"
      ],
      doesNotEstablish: [
        "the work each artist exhibited",
        "individual responsibilities",
        "participation in every national-tour venue"
      ]
    },
    {
      id: "SRC-ANH-KC-KCSTUDIO-2011-05-06",
      title: "America: Now and Here",
      organization: "KC Studio",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-05-06",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kcstudio.org/america-now-and-here/",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Studio, 'America: Now and Here,' May 6, 2011.",
      publicNote:
        "Contemporaneous announcement of the Kansas City launch, its multidisciplinary public program, local-national structure, and official project site.",
      supportsGenerally: [
        "May 6-28, 2011 Kansas City launch",
        "multidisciplinary public programming",
        "participation by more than 100 Kansas City-area artists",
        "official Kansas City project-site domain"
      ],
      doesNotEstablish: [
        "Jamie's inclusion",
        "NTER CHNG's inclusion",
        "the trio's individual responsibilities",
        "attendance or audience impact"
      ]
    },
    {
      id: "SRC-ANH-NERMAN-2011-04-30",
      title: "America: Now and Here - Barbara Kruger",
      organization: "Nerman Museum of Contemporary Art",
      author: "Alice Thorson",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-04-30",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Kansas City Star, April 30, 2011, preserved by the Nerman Museum of Contemporary Art.",
      publicNote:
        "Institutional context for the Kansas City launch and the Barbara Kruger truck's May 11-12 Nerman stop; not direct evidence for NTER CHNG.",
      supportsGenerally: [
        "America: Now and Here Kansas City launch context",
        "multidisciplinary local-national exhibition model",
        "May 11-12, 2011 Barbara Kruger truck stop at Nerman Museum"
      ],
      doesNotEstablish: [
        "NTER CHNG's inclusion",
        "Jamie's inclusion",
        "NTER CHNG's display at the Nerman Museum",
        "the trio's roles"
      ]
    },
    {
      id: "SRC-ANH-SMITHSONIAN-COCOON-POSTER-2011",
      title: "America: Now and Here poster for AC:KC at Cocoon Gallery",
      organization: "Archives of American Art, Smithsonian Institution",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.aaa.si.edu/collections/items/detail/america-now-and-here-poster-ackc-its-kansas-city-exhibition-cocoon-gallery-17782",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Archives of American Art, Smithsonian Institution, 'America: Now and Here poster for AC:KC, its Kansas City exhibition at Cocoon Gallery,' 2011.",
      publicNote:
        "Institutional catalog record for the AC:KC poster and its May 6-29 Cocoon Gallery exhibition context.",
      supportsGenerally: [
        "AC:KC exhibition at Cocoon Gallery",
        "May 6-29, 2011 exhibition dates",
        "America: Now and Here archival context"
      ],
      doesNotEstablish: [
        "NTER CHNG's inclusion without inspecting the poster",
        "Jamie's individual role",
        "the trio's division of labor",
        "participation in every tour venue"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION",
      project: "nterchng",
      internalClaim:
        "Drew Bolton, Jamie Burkart, and Garrett Fuselier collaboratively created NTER CHNG, a 2010 Kansas City installation combining a software application with a two-sided architectural display that turned private texting into a public many-to-many gallery exchange.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Co-created NTER CHNG, an interactive software-and-space installation that invited gallery visitors into a public many-to-many text exchange.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTERCHNG-PROJECT-SITE-WAYBACK-2011-01-28",
          relationship: "direct-support",
          supports: ["project identity", "three-person collaboration", "interactive texting installation", "Cocoon Gallery venue"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTERCHNG-PITCH-EVENT-2010-01-07",
          relationship: "corroborating",
          supports: ["January 2010 opening", "software-and-architectural form", "digital-wall interaction"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
          relationship: "direct-support",
          supports: ["software-and-architectural form", "two-sided digital wall", "public many-to-many exchange", "collaborative authorship"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
          relationship: "private-support",
          supports: ["installation-production system", "software and physical components", "collective restaging plan"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
          relationship: "private-support",
          supports: ["three-person collaborative credit", "exhibit-information description", "prompted exchange form"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit the project jointly to Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
        "Describe the public exchange as the documented interaction design and artistic intent, not a measured social outcome."
      ],
      antiClaims: [
        "Jamie created NTER CHNG alone",
        "the recovered sources establish individual coding, design, or production responsibilities",
        "the installation reached a verified number of participants",
        "the surviving archive contains the software implementation"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION",
      project: "nterchng",
      internalClaim:
        "The official America: Now and Here Kansas City site listed Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and presented NTER CHNG as their collaborative work during the 2011 Kansas City launch.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "NTER CHNG was included in the 2011 Kansas City launch of America: Now and Here, whose official site listed Bolton, Burkart, and Fuselier as visual artists and presented the project statement.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
          relationship: "direct-support",
          supports: ["visual-artist status", "three-person credit", "NTER CHNG project statement", "Kansas City exhibition inclusion"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-ANH-KC-VISUAL-ARTISTS-2011-05-05",
          relationship: "corroborating",
          supports: ["Drew Bolton, Jamie Burkart, and Garrett Fuselier listed among visual artists"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-ANH-KC-KCSTUDIO-2011-05-06",
          relationship: "context",
          supports: ["May 2011 Kansas City launch", "local-national exhibition structure", "official Kansas City site domain"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
          relationship: "private-support",
          supports: ["contemporaneous May 2011 ANH restaging plan", "Leedy-Voulkos installation planning"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Limit the claim to the documented Kansas City launch.",
        "Use the Nerman Museum and Smithsonian records as context, not as direct proof of Jamie's inclusion."
      ],
      antiClaims: [
        "NTER CHNG toured nationally with America: Now and Here",
        "NTER CHNG was displayed at the Nerman Museum",
        "the Nerman Museum page names Jamie or NTER CHNG",
        "Jamie was the sole artist representing the project"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex Wayback and public-source review"]
    },
    {
      id: "CLM-NTERCHNG-EARLY-PARTICIPATORY-SYSTEMS-PRACTICE",
      project: "nterchng",
      internalClaim:
        "NTER CHNG is early evidence of Jamie's collaborative practice at the intersection of software, spatial design, public participation, and the social behavior of communication systems.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "An early collaborative example of Jamie's continuing interest in making technical systems legible and participatory in public space.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
          relationship: "direct-support",
          supports: ["combined software and spatial form", "public participatory interaction", "social-information-space framing", "Jamie's documented collaboration"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Present this as a professional throughline inferred from the documented project, not as the source's own career interpretation.",
        "Keep the project and its multidisciplinary practice collectively credited."
      ],
      antiClaims: [
        "NTER CHNG proves Jamie individually built every technical component",
        "the project had a verified civic outcome",
        "the work was a government technology product"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex editorial inference review"]
    },
    {
      id: "CLM-NTERCHNG-ANH-INSTALL-PRODUCTION-SYSTEM",
      project: "nterchng",
      internalClaim:
        "A contemporaneous working plan shows that restaging NTER CHNG for America: Now and Here required an integrated production system spanning organizer coordination, permissions, software reliability, hosting, physical fabrication, display hardware, transport, networking, gallery tuning, and teardown.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "A 2011 installation plan preserves the operational depth behind the collaborative work, from software reliability and hosting through fabrication, hardware, networking, installation, and teardown.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
          relationship: "private-support",
          supports: ["integrated installation plan", "software and hosting tasks", "fabrication and hardware tasks", "venue and teardown tasks"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe this as a contemporaneous working plan, not proof that every checklist item was completed exactly as written.",
        "Credit the installation system collectively unless contracts, commits, correspondence, or collaborator notes establish individual responsibilities.",
        "Keep private staging, travel, server, and telephone-entry details out of public projections."
      ],
      antiClaims: [
        "Jamie alone performed every software, fabrication, installation, and production task",
        "the checklist is an as-built technical specification",
        "every listed task was completed",
        "the underlying shared document is safe to publish"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex protected-artifact review"]
    },
    {
      id: "CLM-NTERCHNG-PROMPTED-PARTICIPATION",
      project: "nterchng",
      internalClaim:
        "A contemporaneous protected working document preserves NTER CHNG prompts about journey, encounters with art, and artistic identity, together with a small response sample that cannot be republished or treated as a participation census.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The installation used open-ended prompts about journey, encounters with art, and artistic identity to structure a public text exchange.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
          relationship: "private-support",
          supports: ["three prompt themes", "existence and structure of a bounded response sample"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Do not publish or paraphrase individual response text without separate consent and review.",
        "Do not reproduce phone numbers or a sender-to-message crosswalk.",
        "Do not treat numbered sender lines as verified unique people, public participants, or a complete corpus."
      ],
      antiClaims: [
        "the working sample establishes installation attendance or participation totals",
        "every sender was a public gallery visitor",
        "the surviving sample is the complete message corpus",
        "historical phone numbers or message text are cleared for publication"
      ],
      researchInquiryIds: ["INQ-NTERCHNG-ARCHIVE-RECOVERY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex protected-artifact review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NTERCHNG-ARCHIVE-RECOVERY-2026",
      project: "nterchng",
      question:
        "What can public archives establish about NTER CHNG's form, collaborators, 2010 presentation, and inclusion in America: Now and Here Kansas City?",
      methods: [
        "Close-read the supplied January 28, 2011 Wayback capture of nterchng.com and enumerate the bounded 2009-2012 successful-capture corpus for the domain.",
        "Search the live web for contemporaneous project and exhibition records.",
        "Enumerate the bounded 2011 Wayback corpus for kansascity.americanowandhere.org and inspect the recovered visual-artist index and dedicated trio page.",
        "Separate sources that establish NTER CHNG's inclusion from institutional pages that establish only the wider exhibition context.",
        "Close-read two contemporaneous Google Docs while retaining only public-safe findings and withholding their shared links, phone numbers, message text, and private operational details."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "The archived project site and a contemporaneous Pitch listing establish the three-person collaboration, 2010 Cocoon Gallery opening, and interactive texting-installation form.",
        "The official America: Now and Here Kansas City archive preserves both a visual-artist index naming all three collaborators and a dedicated page presenting NTER CHNG as their work.",
        "The Nerman Museum, KC Studio, and Smithsonian records establish the wider May 2011 Kansas City exhibition context but do not independently name NTER CHNG or Jamie.",
        "The bounded nterchng.com corpus recovered one HTML page and four supporting assets; the linked press release was not recovered.",
        "An April 2011 installation plan adds protected evidence of a May America: Now and Here restaging and an integrated software, hosting, fabrication, hardware, networking, venue, and teardown workflow.",
        "A second April 2011 working document preserves three prompt themes, a small protected response sample, collective exhibit-information language, and research leads concerning Jamie's earlier interactive-media practice."
      ],
      limitations: [
        "No source code, complete system diagram, complete message corpus, attendance count, participant-outcome study, or as-built installation record was recovered.",
        "The public records do not assign individual coding, scenic, motion-graphics, or production responsibilities among the three collaborators.",
        "The official artist page and protected working transcript contain historical phone numbers; the numbers and associated message text were not copied into the knowledge bank.",
        "The installation checklist is a plan and cannot prove completion of every listed task.",
        "The embedded artist biography is a project-authored research lead requiring independent verification.",
        "The evidence establishes Kansas City inclusion, not participation at every planned national-tour stop."
      ],
      sourceIds: [
        "SRC-NTERCHNG-INSTALLER-WORKING-DOC-2011",
        "SRC-NTERCHNG-PROMPT-TRANSCRIPT-WORKING-DOC-2011",
        "SRC-NTERCHNG-PROJECT-SITE-WAYBACK-2011-01-28",
        "SRC-NTERCHNG-PITCH-EVENT-2010-01-07",
        "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18",
        "SRC-ANH-KC-VISUAL-ARTISTS-2011-05-05",
        "SRC-ANH-KC-KCSTUDIO-2011-05-06",
        "SRC-ANH-NERMAN-2011-04-30",
        "SRC-ANH-SMITHSONIAN-COCOON-POSTER-2011"
      ],
      publicSummary:
        "Public archives establish NTER CHNG as a collaborative 2010 software-and-space texting installation and preserve its later inclusion in the 2011 Kansas City launch of America: Now and Here. Protected contemporaneous working documents add the installation-production system and prompt framework while individual responsibilities, completion of every planned task, participation totals, and national-tour reach remain open."
    }
  ]
};
