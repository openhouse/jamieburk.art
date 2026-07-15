import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const projectId = "nterchng";
const installationClaimId = "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION";
const exhibitionClaimId = "CLM-NTERCHNG-AMERICA-NOW-HERE-EXHIBITION";

const homepageSourceId = "SRC-NTERCHNG-HOMEPAGE-2011-01-28";
const documentationSourceId = "SRC-NTERCHNG-HOMEPAGE-2013-06-15";
const pitchSourceId = "SRC-NTERCHNG-PITCH-2010-01-07";
const artistIndexSourceId = "SRC-NTERCHNG-ANH-ARTIST-INDEX-2011-05-16";
const artistDetailSourceId = "SRC-NTERCHNG-ANH-ARTIST-DETAIL-2011-05-18";
const kcStudioSourceId = "SRC-NTERCHNG-KC-STUDIO-ANH-2011-05-06";
const nermanSourceId = "SRC-NTERCHNG-NERMAN-ANH-2011-04-30";

export const nterchngCaptures = [
  {
    id: "CAP-NTERCHNG-WAYBACK-AND-ANH-2026",
    receivedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    kind: "url",
    summary:
      "Archived NTER CHNG project site and a lead that the project was later included in the 2011 Kansas City launch of America: Now and Here.",
    sourceUrl:
      "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "collaborative interactive installation",
      "software and spatial experience design",
      "participatory communication system",
      "America: Now and Here exhibition inclusion",
    ],
    sourceIds: [
      homepageSourceId,
      documentationSourceId,
      pitchSourceId,
      artistIndexSourceId,
      artistDetailSourceId,
      kcStudioSourceId,
      nermanSourceId,
    ],
    observationIds: [
      "OBS-NTERCHNG-HOMEPAGE-CREDIT-AND-VENUE",
      "OBS-NTERCHNG-DOCUMENTATION-VIDEO",
      "OBS-NTERCHNG-PITCH-INSTALLATION-FORM",
      "OBS-NTERCHNG-ANH-ARTIST-INDEX",
      "OBS-NTERCHNG-ANH-PARTICIPATORY-SYSTEM",
      "OBS-NTERCHNG-ANH-COLLABORATIVE-CAPABILITIES",
      "OBS-NTERCHNG-ANH-KANSAS-CITY-LAUNCH",
      "OBS-NTERCHNG-NERMAN-CONTEXT",
    ],
    researchTaskIds: ["RT-NTERCHNG-ARTIFACTS-AND-DIVISION-OF-WORK"],
    disposition:
      "Recovered the project site, independent contemporaneous coverage, the official America: Now and Here artist index and detail record, and exhibition context. Preserve collective credit and keep historical personal phone numbers out of the repository and citation layer.",
  },
] satisfies CaptureRecord[];

export const nterchngSources = [
  {
    id: homepageSourceId,
    title: "NTER CHNG project homepage",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "20110128193350",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl:
      "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation:
      "NTER CHNG project homepage, Internet Archive capture, January 28, 2011.",
    publicNote:
      "The archived site names Drew Bolton, Jamie Burkart, and Garrett Fuselier and describes an interactive texting installation at Arts Incubator Cocoon Gallery in Kansas City.",
    supportsGenerally: [
      "NTER CHNG was an interactive texting installation",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier were the named collaborators",
      "the project was shown at Arts Incubator Cocoon Gallery in Kansas City",
    ],
    doesNotEstablish: [
      "the collaborators' individual division of labor",
      "measured attendance or participation",
      "the content or rights status of every participant message",
      "later America: Now and Here inclusion",
    ],
  },
  {
    id: documentationSourceId,
    title: "NTER CHNG project homepage with documentation video",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "20130615202853",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl:
      "https://web.archive.org/web/20130615202853/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation:
      "NTER CHNG project homepage with embedded documentation video, Internet Archive capture, June 15, 2013.",
    publicNote:
      "The later distinct homepage capture retains the collaborator credit and embeds Vimeo video 21395655 as project documentation.",
    supportsGenerally: [
      "the same three-person collaborator credit remained on the project site",
      "the project site later embedded a documentation video",
    ],
    doesNotEstablish: [
      "that the embedded video remains playable",
      "the video's authorship, rights, or complete contents",
      "the collaborators' individual division of labor",
    ],
  },
  {
    id: pitchSourceId,
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
    publicNote:
      "Contemporaneous listing describing the installation before its January 8, 2010 opening.",
    supportsGenerally: [
      "NTER CHNG combined a software application and architectural installation",
      "visitors used cell phones to communicate through two faces of a digital gallery wall",
      "participant messages combined into a real-time virtual dialog",
    ],
    doesNotEstablish: [
      "the named collaborators",
      "the collaborators' individual division of labor",
      "attendance, message volume, or participant outcomes",
      "later exhibition inclusion",
    ],
  },
  {
    id: artistIndexSourceId,
    title: "America: Now and Here Kansas City - All Artists",
    organization: "America: Now and Here",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "20110516144827",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://kansascity.americanowandhere.org/artists/",
    archiveUrl:
      "https://web.archive.org/web/20110516144827/http://kansascity.americanowandhere.org/artists/",
    preferredPublicUrl: "archive",
    publicCitation:
      "America: Now and Here Kansas City, 'All Artists,' Internet Archive capture, May 16, 2011.",
    publicNote:
      "The official exhibition artist index lists Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and links each name to one shared artist page.",
    supportsGenerally: [
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier were listed as visual artists",
      "the three names shared one official artist-page destination",
      "their work was included in the Kansas City presentation of America: Now and Here",
    ],
    doesNotEstablish: [
      "a solo exhibition",
      "that Jamie was the sole artist or technical author",
      "the individual division of labor",
      "which physical venue displayed the work",
    ],
  },
  {
    id: artistDetailSourceId,
    title:
      "America: Now and Here artist page for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    organization: "America: Now and Here",
    kind: "archived-web-capture",
    visibility: "public-metadata-only",
    preservationStatus: "archived",
    capturedAt: "20110518071626",
    publicCitation:
      "America: Now and Here Kansas City, artist page for Drew Bolton, Jamie Burkart, and Garrett Fuselier, archived May 18, 2011.",
    publicNote:
      "The source was close-read and sanitized. Its underlying archived page reproduces historical personal phone numbers, so the URL and raw text are intentionally excluded from the public repository and citation layer.",
    protectedLocatorId: "PTR-NTERCHNG-ANH-ARTIST-DETAIL-2011-05-18",
    supportsGenerally: [
      "the three collaborators were presented together as visual artists",
      "NTER CHNG was described as equal parts software application and architectural installation",
      "participants communicated in real time through a two-sided digital wall",
      "the work transformed one-to-one texting into a many-to-many social information space",
      "the collaborators combined scenic design, computer programming, motion graphics, and experiential production",
    ],
    doesNotEstablish: [
      "which collaborator performed each technical or spatial task",
      "permission to republish historical phone numbers",
      "attendance, message volume, or measured audience effect",
      "sole authorship by Jamie",
    ],
  },
  {
    id: kcStudioSourceId,
    title: "America: Now and Here",
    organization: "KC Studio",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-05-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://kcstudio.org/america-now-and-here/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Studio, 'America: Now and Here,' May 6, 2011.",
    publicNote:
      "Contemporaneous overview of the Kansas City launch, its dates, disciplines, civic-dialogue purpose, and official Kansas City website.",
    supportsGenerally: [
      "America: Now and Here launched in Kansas City from May 6 to May 28, 2011",
      "the presentation combined national and Kansas City artists across multiple disciplines",
      "the initiative framed art as a means of public dialogue",
      "the article points to the official Kansas City exhibition website",
    ],
    doesNotEstablish: [
      "NTER CHNG inclusion by itself",
      "Jamie as a nationally selected artist rather than a Kansas City participant",
      "the venue or dates of NTER CHNG's display",
      "measured impact of the exhibition",
    ],
  },
  {
    id: nermanSourceId,
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art / The Kansas City Star",
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
      "Alice Thorson, 'America: Now and Here - Barbara Kruger,' The Kansas City Star, republished by the Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote:
      "Institutional context for the broader Kansas City launch and the Barbara Kruger truck's May 11-12 stop at the Nerman Museum; not direct evidence of NTER CHNG at that venue.",
    supportsGenerally: [
      "America: Now and Here launched in Kansas City",
      "the broader project joined national and Kansas City artists",
      "the Barbara Kruger truck stopped at the Nerman Museum on May 11-12, 2011",
    ],
    doesNotEstablish: [
      "that NTER CHNG was shown at the Nerman Museum",
      "NTER CHNG inclusion by itself",
      "the individual roles of NTER CHNG's collaborators",
      "a relationship between Jamie and Barbara Kruger",
    ],
  },
] satisfies SourceRecord[];

export const nterchngObservations = [
  {
    id: "OBS-NTERCHNG-HOMEPAGE-CREDIT-AND-VENUE",
    sourceId: homepageSourceId,
    project: projectId,
    statement:
      "The archived project homepage calls NTER CHNG an interactive texting installation, names Drew Bolton, Jamie Burkart, and Garrett Fuselier, and locates it at Arts Incubator Cocoon Gallery in Kansas City.",
    observationType: "explicit",
    locator: "Page metadata and body text beneath the NTER CHNG logo.",
    confidence: "high",
    limitations: [
      "The page establishes collective credit and venue, not the collaborators' individual division of labor or measured participation.",
    ],
    supportsClaimIds: [installationClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-DOCUMENTATION-VIDEO",
    sourceId: documentationSourceId,
    project: projectId,
    statement:
      "A later distinct homepage capture retains the three-person credit and embeds Vimeo video 21395655 as project documentation.",
    observationType: "metadata",
    locator: "Homepage body iframe and collaborator line.",
    confidence: "high",
    limitations: [
      "The capture establishes an embedded video identifier, not present playability, authorship, rights, or a complete description of the footage.",
    ],
    supportsClaimIds: [],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-PITCH-INSTALLATION-FORM",
    sourceId: pitchSourceId,
    project: projectId,
    statement:
      "The Pitch described NTER CHNG before its January 8, 2010 opening as equal parts software application and architectural installation, using cell phones and both faces of a digital gallery wall to combine participant messages into a real-time dialog.",
    observationType: "explicit",
    locator: "Article description and event date.",
    confidence: "high",
    limitations: [
      "The listing does not name the collaborators, define their individual responsibilities, or report attendance or message volume.",
    ],
    supportsClaimIds: [installationClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-ANH-ARTIST-INDEX",
    sourceId: artistIndexSourceId,
    project: projectId,
    statement:
      "The official America: Now and Here Kansas City artist index lists Drew Bolton, Jamie Burkart, and Garrett Fuselier in its Visual Artists section and links all three names to one shared artist page.",
    observationType: "explicit",
    locator: "All Artists page, Visual Artists list.",
    confidence: "high",
    limitations: [
      "The index establishes group inclusion, not a solo presentation, individual role split, physical display venue, or measured reception.",
    ],
    supportsClaimIds: [exhibitionClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-ANH-PARTICIPATORY-SYSTEM",
    sourceId: artistDetailSourceId,
    project: projectId,
    statement:
      "The sanitized official artist statement describes NTER CHNG as an interactive text-messaging experience in which visitors communicated in real time through a two-sided digital wall and their messages accumulated into a many-to-many public dialog.",
    observationType: "explicit",
    locator: "Artist's Statement section; raw contact details omitted.",
    confidence: "high",
    limitations: [
      "The observation paraphrases the public artist statement without reproducing historical phone numbers or assigning component authorship to one collaborator.",
    ],
    supportsClaimIds: [installationClaimId, exhibitionClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-ANH-COLLABORATIVE-CAPABILITIES",
    sourceId: artistDetailSourceId,
    project: projectId,
    statement:
      "The sanitized official artist statement says Bolton, Burkart, and Fuselier combined backgrounds in scenic design, computer programming, motion graphics, and experiential production to create a social information space.",
    observationType: "explicit",
    locator: "Final paragraph of the Artist's Statement; raw contact details omitted.",
    confidence: "high",
    limitations: [
      "The collective capability list does not map a discipline or deliverable to a specific collaborator.",
    ],
    supportsClaimIds: [installationClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-ANH-KANSAS-CITY-LAUNCH",
    sourceId: kcStudioSourceId,
    project: projectId,
    statement:
      "KC Studio described America: Now and Here as a multidisciplinary national project launching in Kansas City from May 6 to May 28, 2011 with national and Kansas City artists and a civic-dialogue purpose, and directed readers to the official Kansas City website.",
    observationType: "explicit",
    locator: "Opening exhibition overview through the project purpose and closing information link.",
    confidence: "high",
    limitations: [
      "The article supplies exhibition context but does not name NTER CHNG, Jamie, Bolton, or Fuselier.",
    ],
    supportsClaimIds: [exhibitionClaimId],
    reviewedAt: "2026-07-15",
  },
  {
    id: "OBS-NTERCHNG-NERMAN-CONTEXT",
    sourceId: nermanSourceId,
    project: projectId,
    statement:
      "The Nerman Museum page preserves Kansas City Star reporting on the Kansas City launch and documents the Barbara Kruger truck's separate May 11-12, 2011 museum stop.",
    observationType: "explicit",
    locator: "Article body and event details.",
    confidence: "high",
    limitations: [
      "This is context for the broader exhibition only; it does not establish that NTER CHNG was displayed at the Nerman Museum.",
    ],
    supportsClaimIds: [exhibitionClaimId],
    reviewedAt: "2026-07-15",
  },
] satisfies ObservationRecord[];

export const nterchngClaims = [
  {
    id: installationClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "Jamie Burkart co-created NTER CHNG with Drew Bolton and Garrett Fuselier, combining software, spatial installation, and participant text messaging in a two-sided digital wall that turned private one-to-one exchanges into a shared many-to-many gallery dialog.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NTERCHNG-HOMEPAGE-CREDIT-AND-VENUE",
      "OBS-NTERCHNG-PITCH-INSTALLATION-FORM",
      "OBS-NTERCHNG-ANH-PARTICIPATORY-SYSTEM",
      "OBS-NTERCHNG-ANH-COLLABORATIVE-CAPABILITIES",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Co-created NTER CHNG with Drew Bolton and Garrett Fuselier, an interactive installation combining software, a two-sided digital wall, and participant text messages into a shared real-time dialog.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nterchng"],
      },
    ],
    evidence: [
      {
        sourceId: homepageSourceId,
        relationship: "direct-support",
        supports: [
          "the project title and interactive-texting form",
          "the three-person collaborator credit",
          "the Cocoon Gallery venue",
        ],
        locator: "Page metadata and project description.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: pitchSourceId,
        relationship: "corroborating",
        supports: [
          "the software-and-architecture form",
          "real-time participant communication through the digital wall",
        ],
        locator: "Article description.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: artistDetailSourceId,
        relationship: "direct-support",
        supports: [
          "the participatory many-to-many communication method",
          "the collaborators' combined capability areas",
          "the social-information-space framing",
        ],
        locator: "Sanitized Artist's Statement observations.",
        publicNote:
          "Metadata-only evidence: the archived page contains historical personal phone numbers and must not render as a citation.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Always credit Drew Bolton and Garrett Fuselier alongside Jamie.",
      "The recovered sources describe combined capabilities but do not establish which collaborator wrote code, designed the wall, produced motion graphics, or led installation work.",
      "Do not publish participant messages, historical phone numbers, attendance, or engagement counts without separate rights-aware evidence.",
    ],
    antiClaims: [
      "Jamie solely created NTER CHNG",
      "Jamie alone programmed or designed every component",
      "The installation's participation or impact was measured",
      "Archived participant contact details are appropriate portfolio content",
    ],
    researchTaskIds: ["RT-NTERCHNG-ARTIFACTS-AND-DIVISION-OF-WORK"],
    researchInquiryIds: ["INQ-NTERCHNG-WAYBACK-ANH-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and Wayback review"],
  },
  {
    id: exhibitionClaimId,
    project: projectId,
    claimType: "context",
    internalClaim:
      "The official archived America: Now and Here Kansas City website lists Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists and presents NTER CHNG on their shared artist page within the project's May 2011 Kansas City launch.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-NTERCHNG-ANH-ARTIST-INDEX",
      "OBS-NTERCHNG-ANH-PARTICIPATORY-SYSTEM",
      "OBS-NTERCHNG-ANH-KANSAS-CITY-LAUNCH",
      "OBS-NTERCHNG-NERMAN-CONTEXT",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The official archived America: Now and Here Kansas City website listed Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and presented NTER CHNG on their shared artist page during the project's 2011 Kansas City launch.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/nterchng"],
      },
    ],
    evidence: [
      {
        sourceId: artistIndexSourceId,
        relationship: "direct-support",
        supports: [
          "the three collaborators' inclusion as visual artists",
          "their shared official artist-page destination",
        ],
        locator: "All Artists page, Visual Artists list.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: artistDetailSourceId,
        relationship: "direct-support",
        supports: [
          "the shared official artist page",
          "NTER CHNG as the work presented for the three collaborators",
        ],
        locator: "Sanitized page heading and Artist's Statement.",
        publicNote:
          "Metadata-only evidence: the archived page contains historical personal phone numbers and must not render as a citation.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcStudioSourceId,
        relationship: "context",
        supports: [
          "the May 6-28, 2011 Kansas City launch",
          "the national-and-local artist structure",
          "the official Kansas City website pointer",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: nermanSourceId,
        relationship: "supports-boundary",
        supports: [
          "broader Kansas City exhibition context",
          "the separate Barbara Kruger truck stop at Nerman",
        ],
        publicNote:
          "Context only; this source does not place NTER CHNG at the Nerman Museum.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Describe this as inclusion in a multidisciplinary group exhibition, not a solo exhibition or commission.",
      "Credit Drew Bolton and Garrett Fuselier equally with Jamie.",
      "The Nerman Museum page documents a separate Barbara Kruger component and must not be used to place NTER CHNG at Nerman.",
      "Do not imply a personal collaboration with every nationally known artist in the exhibition.",
    ],
    antiClaims: [
      "Jamie had a solo exhibition at America: Now and Here",
      "NTER CHNG was exhibited at the Nerman Museum",
      "Jamie collaborated directly with Barbara Kruger",
      "Jamie was the sole artist behind NTER CHNG",
    ],
    researchTaskIds: ["RT-NTERCHNG-ARTIFACTS-AND-DIVISION-OF-WORK"],
    researchInquiryIds: ["INQ-NTERCHNG-WAYBACK-ANH-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source and Wayback review"],
  },
] satisfies ClaimRecord[];

export const nterchngResearchTasks = [
  {
    id: "RT-NTERCHNG-ARTIFACTS-AND-DIVISION-OF-WORK",
    project: projectId,
    question:
      "What public-safe artifacts and collaborator evidence can document NTER CHNG's implementation and the individual division of work without exposing participant or historical contact data?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-NTERCHNG-WAYBACK-AND-ANH-2026"],
    sourceIds: [
      homepageSourceId,
      documentationSourceId,
      artistDetailSourceId,
    ],
    claimIds: [installationClaimId, exhibitionClaimId],
    successCriteria: [
      "Recover playable or downloadable installation documentation with rights metadata.",
      "Recover the original press release or equivalent contemporaneous production record.",
      "Document the collaborators' individual technical, spatial, motion, and production responsibilities through dated records or collaborator confirmation.",
      "Create a public-safe visual inventory that excludes participant messages, phone numbers, and unapproved identifiable people.",
    ],
    nextActions: [
      "Investigate the embedded Vimeo identifier and any archived media assets.",
      "Search Jamie's project archives and code repositories for NTER CHNG implementation records.",
      "Invite Drew Bolton and Garrett Fuselier to correct or expand the division-of-work account.",
      "Seek visual-use permission before considering a public portfolio projection.",
    ],
    publicNote:
      "The project and exhibition inclusion are source-backed. Implementation ownership, reusable media, participation measures, and individual division of work remain open research.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt: "2026-07-15",
  },
] satisfies ResearchTask[];

export const nterchngInquiries = [
  {
    id: "INQ-NTERCHNG-WAYBACK-ANH-2026-07-15",
    project: projectId,
    question:
      "Can the archived NTER CHNG project and its inclusion in America: Now and Here be established from public first-party and institutional sources?",
    methods: [
      "Close-read the supplied January 28, 2011 NTER CHNG homepage capture.",
      "Enumerate distinct archived homepage captures and inspect the later documentation state.",
      "Resolve the Kansas City America: Now and Here domain from contemporaneous exhibition coverage.",
      "Recover and close-read the official All Artists index and shared collaborator page.",
      "Compare the official exhibition record with independent and institutional context from The Pitch, KC Studio, and the Nerman Museum.",
      "Test the linked project press release and record its non-recovery without treating that as proof it never existed.",
    ],
    runAt: "2026-07-15",
    resultStatus: "recovered",
    findings: [
      "The archived NTER CHNG homepage names Drew Bolton, Jamie Burkart, and Garrett Fuselier and calls the work an interactive texting installation at Cocoon Gallery.",
      "The Pitch independently described the installation's software, architectural, cell-phone, digital-wall, and real-time dialog form before its January 8, 2010 opening.",
      "The official archived America: Now and Here Kansas City artist index lists all three collaborators as visual artists and routes them to one shared artist page.",
      "The shared official artist page identifies NTER CHNG as their work and describes the participatory system and collective capability areas.",
      "KC Studio establishes the May 6-28, 2011 Kansas City launch and directs readers to the recovered official exhibition site.",
    ],
    limitations: [
      "The original NTER CHNG press release was linked but no archived copy was recovered in this pass; non-recovery does not prove it never existed.",
      "The official detail page reproduces historical phone numbers, so its URL and raw text are not retained in the public repository or citation layer.",
      "The Nerman Museum page documents the broader exhibition and a separate Barbara Kruger truck stop, not NTER CHNG at Nerman.",
      "The recovered public sources do not define the collaborators' individual division of work or provide participation metrics.",
      "The embedded documentation video was identified but not established as presently playable or cleared for reuse.",
    ],
    sourceIds: [
      homepageSourceId,
      documentationSourceId,
      pitchSourceId,
      artistIndexSourceId,
      artistDetailSourceId,
      kcStudioSourceId,
      nermanSourceId,
    ],
    publicSummary:
      "Public archival sources establish NTER CHNG as a collaborative interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and establish the three collaborators' inclusion as visual artists in the 2011 Kansas City launch of America: Now and Here. The individual division of work and reusable media remain open.",
  },
] satisfies ResearchInquiry[];
