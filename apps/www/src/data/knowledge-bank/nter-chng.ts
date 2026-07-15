import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nterChngSources = [
  {
    id: "SRC-NTER-CHNG-WAYBACK-2011",
    title: "NTER CHNG project website",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl:
      "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation:
      "NTER CHNG project website, January 28, 2011 Wayback capture.",
    publicNote:
      "The archived project page identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and places it at Arts Incubator's Cocoon Gallery in Kansas City.",
    supportsGenerally: [
      "NTER CHNG was an interactive texting installation",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier were credited as its creators",
      "the project was presented at Arts Incubator's Cocoon Gallery in Kansas City"
    ],
    doesNotEstablish: [
      "the contribution split among the three creators",
      "the installation's complete technical implementation",
      "a participant or message count",
      "inclusion in America: Now and Here",
      "current project operation"
    ]
  },
  {
    id: "SRC-NTER-CHNG-VIMEO-2011",
    title: "NTER CHNG project video",
    organization: "Garrett Fuselier / Vimeo",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-03-23",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://vimeo.com/21395655",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Garrett Fuselier, 'NTER CHNG,' project video, Vimeo, March 23, 2011.",
    publicNote:
      "The surviving video metadata credits the interactive texting installation to Drew Bolton, Jamie Burkart, and Garrett Fuselier; credits Mary Nichols with helping engineer and construct the wall; and names Megan Mantia and Elisha Stetson as actors.",
    supportsGenerally: [
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier created the interactive texting installation",
      "Mary Nichols helped engineer and construct the installation wall",
      "Megan Mantia and Elisha Stetson appeared as actors in the project video",
      "a 50-second project video was published in March 2011"
    ],
    doesNotEstablish: [
      "the contribution split among the three creators",
      "the full software, hardware, or messaging architecture",
      "the identity or consent status of exhibition participants",
      "inclusion in America: Now and Here",
      "rights to republish the video or thumbnail"
    ],
    media: {
      mediaKind: "other",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "metadata-only"
    }
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
    accessedAt: "2026-07-15",
    canonicalUrl:
      "http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
    archiveUrl:
      "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
    preferredPublicUrl: "archive",
    publicCitation:
      "BProffer, 'I Text, Therefore I Am,' America: Now and Here, June 22, 2011, archived October 17, 2012.",
    publicNote:
      "America: Now and Here's own Kansas City article documents NTER CHNG as a participant-facing installation: visitors sent text messages to a displayed number and saw them projected as moving thought clouds on a gauze screen.",
    supportsGenerally: [
      "NTER CHNG was presented within America: Now and Here's Kansas City program",
      "visitors submitted text messages to a displayed phone number",
      "submitted messages appeared as projected moving thought clouds",
      "the projection used an angled floor-to-ceiling gauze screen",
      "the installation made private messages public within a shared exhibition space"
    ],
    doesNotEstablish: [
      "the names or contribution split of NTER CHNG's creators",
      "the installation's exact America: Now and Here venue or dates",
      "the full software, hardware, or messaging architecture",
      "a participant or message count",
      "permission to republish participant messages or images"
    ]
  },
  {
    id: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art",
    author: "Alice Thorson",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Kansas City Star, republished by the Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote:
      "The institutional page documents America: Now and Here's Kansas City launch, its public-dialogue mission, its inclusion of Kansas City and national artists, and the Barbara Kruger truck's May 11-12 Nerman Museum stop.",
    supportsGenerally: [
      "America: Now and Here launched in Kansas City in May 2011",
      "the program used art to open public dialogue about America",
      "the program included Kansas City artists alongside national artists",
      "a Barbara Kruger exhibition truck stopped at the Nerman Museum on May 11 and 12, 2011"
    ],
    doesNotEstablish: [
      "that NTER CHNG appeared at the Nerman Museum stop",
      "NTER CHNG's creators or technical implementation",
      "the exact venue or dates of NTER CHNG's America: Now and Here presentation",
      "a complete roster of Kansas City program works"
    ]
  },
  {
    id: "SRC-NTER-CHNG-INSTALLATION-PLAN-2011",
    title: "NTER CHNG America: Now and Here installation plan",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-13",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of a contemporaneous NTER CHNG installation plan for America: Now and Here, April 2011.",
    publicNote:
      "The protected plan records a May 2011 restaging, identifies Leedy-Voulkos as the intended installation site, and inventories wall reconstruction, projectors, computers, wiring, displayed phone numbers, and server-side and wall-side software work.",
    protectedLocatorId: "ARCHIVE-NTER-CHNG-INSTALLATION-PLAN-2011",
    supportsGenerally: [
      "the collaborators planned to restage NTER CHNG for America: Now and Here in May 2011",
      "Leedy-Voulkos was the intended installation site in the contemporaneous plan",
      "the planned system combined a constructed wall, projectors, display computers, wiring, displayed phone numbers, and server-side and wall-side software",
      "the plan included reconstructing and installing the wall and tuning the gallery experience"
    ],
    doesNotEstablish: [
      "that every planned component was implemented as written",
      "that Leedy-Voulkos was the completed presentation venue",
      "the contribution split among the three creators",
      "the final software, hosting, hardware, or messaging architecture",
      "permission to publish personal, residential, travel, contact, or infrastructure details from the plan"
    ]
  },
  {
    id: "SRC-NTER-CHNG-EXHIBITION-TEXT-2010-2011",
    title: "NTER CHNG January 2010 exhibit text and 2011 working record",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-06",
    accessedAt: "2026-07-15",
    publicCitation:
      "Public-safe archival review of NTER CHNG's January 2010 exhibit text preserved in a 2011 working document.",
    publicNote:
      "The protected record describes the January 8-29, 2010 presentation as equal parts software application and architectural installation: visitors communicated in real time through both faces of a digital wall, turning one-to-one texting into a shared many-to-many exchange.",
    protectedLocatorId: "ARCHIVE-NTER-CHNG-EXHIBITION-TEXT-2010-2011",
    supportsGenerally: [
      "NTER CHNG's January 2010 exhibition dates were January 8 through 29",
      "the creators described the work as equal parts software application and architectural installation",
      "visitors communicated in real time through both faces of a digital wall",
      "the work transformed one-to-one text messaging into a public many-to-many exchange",
      "the project was described as the collective product of Drew Bolton, Jamie Burkart, and Garrett Fuselier"
    ],
    doesNotEstablish: [
      "independent critical assessment of the installation",
      "the contribution split among the three creators",
      "attendance, participant, or message counts",
      "consent to publish the preserved phone numbers or text-message material",
      "permission to publish direct quotations, personal biographies, or private working material"
    ]
  }
] satisfies SourceRecord[];

export const nterChngClaims = [
  {
    id: "CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION",
    project: "nter-chng",
    internalClaim:
      "Jamie Burkart co-created NTER CHNG with Drew Bolton and Garrett Fuselier, a January 2010 participatory work described by its creators as equal parts software application and architectural installation. Visitors communicated in real time through a digital wall, and a later presentation projected audience-submitted messages as moving thought clouds. The project site places the January presentation at Arts Incubator's Cocoon Gallery, and America: Now and Here's own archived site documents the work in its 2011 Kansas City program.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Co-created NTER CHNG with Drew Bolton and Garrett Fuselier, a January 2010 software-and-architecture installation that turned private, one-to-one texting into a shared gallery exchange. A 2011 presentation transformed audience text messages into moving projected thought clouds within America: Now and Here's Kansas City program.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"],
        rationale:
          "Retain as source-backed historical depth connecting participatory art, public interaction, and technical implementation while holding it from the current hiring-site composition."
      },
      {
        key: "about",
        text:
          "Co-created an interactive installation that translated audience text messages into a shared field of moving projections and was later presented through America: Now and Here.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Hold until the About page can connect this early participatory technology work to Jamie's current practice without adding excessive historical breadth."
      },
      {
        key: "photo-brief",
        text:
          "Look for the gauze projection wall, projected thought clouds, displayed text-message number, audience interaction, Cocoon Gallery installation, and America: Now and Here presentation.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
        rationale:
          "Use privately for photo research; image authorship, participant consent, message privacy, and display rights require review before publication."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-WAYBACK-2011",
        relationship: "direct-support",
        supports: [
          "NTER CHNG was an interactive texting installation",
          "Drew Bolton, Jamie Burkart, and Garrett Fuselier were credited as its creators",
          "the project was presented at Arts Incubator's Cocoon Gallery in Kansas City"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NTER-CHNG-VIMEO-2011",
        relationship: "corroborating",
        supports: [
          "Drew Bolton, Jamie Burkart, and Garrett Fuselier created the interactive texting installation",
          "Mary Nichols helped engineer and construct the installation wall",
          "Megan Mantia and Elisha Stetson appeared as actors in the project video"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        relationship: "direct-support",
        supports: [
          "NTER CHNG was presented within America: Now and Here's Kansas City program",
          "visitors submitted text messages to a displayed phone number",
          "submitted messages appeared as projected moving thought clouds",
          "the projection used an angled floor-to-ceiling gauze screen"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        relationship: "context",
        supports: [
          "America: Now and Here launched in Kansas City in May 2011",
          "the program used art to open public dialogue about America",
          "the program included Kansas City artists alongside national artists"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NTER-CHNG-INSTALLATION-PLAN-2011",
        relationship: "private-support",
        supports: [
          "the collaborators planned a May 2011 America: Now and Here restaging",
          "the planned installation combined wall construction, projectors, display computers, wiring, displayed phone numbers, and server-side and wall-side software",
          "Leedy-Voulkos was the intended installation site"
        ],
        locator: "April 2011 America: Now and Here installation plan",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-EXHIBITION-TEXT-2010-2011",
        relationship: "private-support",
        supports: [
          "the January 2010 exhibition ran January 8 through 29",
          "the creators described NTER CHNG as equal parts software application and architectural installation",
          "visitors communicated in real time through both faces of a digital wall",
          "the work changed one-to-one texting into a shared many-to-many exchange"
        ],
        locator: "January 2010 exhibit information preserved in a 2011 working record",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Always credit Drew Bolton and Garrett Fuselier as co-creators.",
      "Credit Mary Nichols for helping engineer and construct the wall and Megan Mantia and Elisha Stetson as actors when discussing the project video or fuller production record.",
      "The reviewed record does not establish each creator's contribution split or the complete as-built technical implementation.",
      "The protected installation plan identifies Leedy-Voulkos as the intended America: Now and Here site but does not independently establish the completed venue.",
      "America: Now and Here's article establishes inclusion in its Kansas City program but not the installation's exact venue or dates.",
      "The Nerman Museum page documents the wider program and truck stop; it does not establish that NTER CHNG appeared at the museum.",
      "Do not republish participant messages, phone numbers, private logistics, video, thumbnails, or installation images without privacy, rights, and consent review."
    ],
    antiClaims: [
      "Jamie created NTER CHNG alone.",
      "NTER CHNG was definitively installed at the Nerman Museum.",
      "The installation plan proves that the completed America: Now and Here presentation occurred at Leedy-Voulkos exactly as planned.",
      "The reviewed sources establish audience or message counts.",
      "The project is a current public messaging service."
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-IMPLEMENTATION-EXHIBITION-DETAILS"],
    reviewedAt: "2026-07-15",
    reviewedBy: [
      "Jamie Burkart",
      "Codex Wayback and public-source review",
      "Codex Google Drive archival review"
    ]
  }
] satisfies ClaimRecord[];

export const nterChngInquiries = [
  {
    id: "INQ-NTER-CHNG-IMPLEMENTATION-EXHIBITION-DETAILS",
    project: "nter-chng",
    question:
      "What public-safe records can recover NTER CHNG's contribution split, software and messaging architecture, exact America: Now and Here venue and dates, participation scale, and reusable media rights?",
    methods: [
      "Reviewed the January 2011 Wayback capture of the project website and its later 2013 capture.",
      "Reviewed surviving Vimeo metadata for the project video and fuller production credits.",
      "Queried the America: Now and Here Wayback corpus and recovered its June 2011 article about NTER CHNG.",
      "Reviewed the Nerman Museum's institutional record for the Kansas City launch and May 11-12 truck stop.",
      "Reviewed two contemporaneous Google Docs supplied by Jamie and converted only their public-safe propositions into protected source records."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The project archive identifies Drew Bolton, Jamie Burkart, and Garrett Fuselier as co-creators and places the installation at Cocoon Gallery.",
      "The Vimeo record adds Mary Nichols's wall-engineering and construction credit and names Megan Mantia and Elisha Stetson as actors.",
      "America: Now and Here's own Kansas City article confirms exhibition inclusion and describes the audience texting and projection interaction.",
      "The Nerman record confirms the wider Kansas City launch and May 11-12 museum truck stop but does not connect NTER CHNG to that specific location.",
      "A contemporaneous exhibit text recovers the January 8-29, 2010 dates and the creators' software-and-architecture, real-time, two-sided digital-wall, and many-to-many framing.",
      "A contemporaneous installation plan recovers the planned 2011 wall, projector, computer, wiring, displayed-number, and server-side and wall-side software components and identifies Leedy-Voulkos as the intended site."
    ],
    limitations: [
      "The archived press-release link was not captured by the Wayback corpus reviewed in this pass.",
      "The reviewed sources do not establish each creator's contribution split or the final as-built technical architecture.",
      "Leedy-Voulkos is identified as the intended site in a plan, not independently confirmed as the completed America: Now and Here venue.",
      "The exact America: Now and Here presentation dates, participant count, and message count remain unrecovered.",
      "The supplied working documents contain personal contact, text-message, residential, travel, and infrastructure details that remain excluded from the public repo.",
      "Media authorship, participant privacy, consent, and republication rights require separate review."
    ],
    sourceIds: [
      "SRC-NTER-CHNG-WAYBACK-2011",
      "SRC-NTER-CHNG-VIMEO-2011",
      "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
      "SRC-NERMAN-AMERICA-NOW-HERE-2011",
      "SRC-NTER-CHNG-INSTALLATION-PLAN-2011",
      "SRC-NTER-CHNG-EXHIBITION-TEXT-2010-2011"
    ],
    publicSummary:
      "Public and protected archival sources establish NTER CHNG's co-creators, January 2010 exhibition window, software-and-architecture framing, participatory texting-and-projection interaction, Cocoon Gallery presentation, and later inclusion in America: Now and Here's Kansas City program; contribution split, as-built implementation, and exact 2011 exhibition placement remain open."
  }
] satisfies ResearchInquiry[];

export const nterChngIntake = [
  {
    id: "INT-NTER-CHNG-WAYBACK-EXHIBITION-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-url",
    visibility: "public-safe",
    title: "NTER CHNG project and America: Now and Here exhibition record",
    description:
      "Jamie supplied the archived NTER CHNG project site and Nerman Museum exhibition page; follow-on Wayback research recovered America: Now and Here's own article documenting the installation, while Vimeo metadata preserved fuller production credits.",
    whyItMatters:
      "Establishes an early source-backed example of Jamie co-creating participatory technology that translated private audience input into a shared public visual environment and traveled into a national public-dialogue program.",
    projectIds: ["nter-chng", "participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Matured the co-creation, interaction, Cocoon Gallery, and America: Now and Here inclusion record while holding website projection and keeping technical, location, scale, and media-rights questions open.",
    sourceIds: [
      "SRC-NTER-CHNG-WAYBACK-2011",
      "SRC-NTER-CHNG-VIMEO-2011",
      "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
      "SRC-NERMAN-AMERICA-NOW-HERE-2011"
    ],
    claimIds: ["CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION"],
    inquiryIds: ["INQ-NTER-CHNG-IMPLEMENTATION-EXHIBITION-DETAILS"],
    boundaries: [
      "Preserve all collaborator and production credits.",
      "Do not use the Nerman page to claim that NTER CHNG appeared at the museum stop.",
      "Do not infer contribution split, technical architecture, participation scale, or current operation.",
      "Do not republish messages, video, thumbnails, or installation imagery without privacy, rights, and consent review."
    ]
  },
  {
    id: "INT-NTER-CHNG-GOOGLE-DOC-ARTIFACTS-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "NTER CHNG contemporaneous exhibit text and installation plan",
    description:
      "Jamie supplied two Google Docs preserving January 2010 exhibit information and an April 2011 America: Now and Here installation plan. Only public-safe propositions are retained here; document links, personal phone numbers, text-message material, residential details, travel timing, and infrastructure specifics remain outside the public repo.",
    whyItMatters:
      "Recovers the original exhibition window, the creators' software-and-architecture and many-to-many framing, and the planned components and intended venue of the 2011 restaging without publishing sensitive working material.",
    projectIds: ["nter-chng", "participatory-public-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Strengthened the existing NTER CHNG claim and partially recovered inquiry while preserving the documents as protected sources and keeping planned details distinct from completed outcomes.",
    sourceIds: [
      "SRC-NTER-CHNG-INSTALLATION-PLAN-2011",
      "SRC-NTER-CHNG-EXHIBITION-TEXT-2010-2011"
    ],
    claimIds: ["CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION"],
    inquiryIds: ["INQ-NTER-CHNG-IMPLEMENTATION-EXHIBITION-DETAILS"],
    relatedIntakeIds: ["INT-NTER-CHNG-WAYBACK-EXHIBITION-2026-07-15"],
    boundaries: [
      "Do not expose the source links or protected locators in public projections.",
      "Do not publish personal phone numbers, text-message material, residential or travel details, or infrastructure identifiers from the documents.",
      "Treat Leedy-Voulkos as the intended site in a contemporaneous plan, not an independently confirmed completed venue.",
      "Do not infer individual contribution split or final as-built architecture from collective working documents."
    ]
  }
] satisfies IntakeRecordInput[];
