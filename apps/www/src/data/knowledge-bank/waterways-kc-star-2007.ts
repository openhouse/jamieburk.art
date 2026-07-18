import type { KnowledgeBank } from "./schema.ts";

const projectId = "waterways-participatory-art";
const claimId = "CLM-WATERWAYS-RAFT-EXPEDITION";

export const waterwaysKcStarIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-16-KC-STAR-RAFT-ARTICLE",
    receivedAt: "2026-07-16",
    inputKind: "document",
    summary:
      "A two-page archival scan of The Kansas City Star's November 15, 2007, front-page report on Release Yourself onto the Water until it Tastes of Salt, supplemented by a public contemporaneous Pitch report recovered during source review.",
    projectIds: [projectId],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-WATERWAYS-KC-STAR-2007-11-15",
      "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"
    ],
    observationIds: [
      "OBS-WATERWAYS-KC-STAR-FRONT-PAGE",
      "OBS-WATERWAYS-KC-STAR-CREW",
      "OBS-WATERWAYS-KC-STAR-CRAFT",
      "OBS-WATERWAYS-KC-STAR-IN-PROGRESS",
      "OBS-WATERWAYS-KC-STAR-PARTICIPATORY-PURPOSE",
      "OBS-WATERWAYS-KC-STAR-INTERRUPTION-RECOVERY",
      "OBS-WATERWAYS-PITCH-PART-III-CORROBORATION"
    ],
    claimIds: [claimId],
    researchInquiryIds: [],
    nextActions: [
      "Keep the newspaper scan outside the public repository unless republication rights are cleared.",
      "Use the November 2007 article as in-progress evidence; rely on later sources for the expedition's eventual Gulf endpoint.",
      "Preserve Libby Hendon and Laura Mattingly's crew credit and avoid implying a complete participant roster for every stage of the journey.",
      "Seek publication permission before using the front page, article spread, or Vicksburg Post photographs as portfolio visuals."
    ]
  }
];

export const waterwaysKcStarSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    title: "In the name of art, go with the flow",
    organization: "The Kansas City Star",
    author: "Darryl Levings",
    kind: "published-article",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2007-11-15",
    accessedAt: "2026-07-16",
    capturedAt:
      "Two-page archival PDF scan of the Kansas City edition, pages A1 and A4; text extracted and both pages visually reviewed July 16, 2026",
    publicCitation:
      "Darryl Levings, 'In the name of art, go with the flow,' The Kansas City Star, November 15, 2007, pp. A1, A4.",
    publicNote:
      "Contemporaneous front-page reporting on the three-person crew then traveling, the bicycle-powered found-material raft, more than 1,000 river miles, participatory intent, and recovery from a Coast Guard interruption. The scan remains outside the public repository.",
    supportsGenerally: [
      "Jamie's originating idea for the expedition",
      "the in-progress crew of Jamie Burkart, Libby Hendon, and Laura Mattingly",
      "the bicycle-powered paddlewheel and found-material construction",
      "more than 1,000 miles traveled by November 2007",
      "the project's public-encounter and waterways inquiry",
      "the Coast Guard interruption and the crew's repair and recovery work"
    ],
    doesNotEstablish: [
      "the expedition's eventual Gulf endpoint",
      "a complete participant roster for every stage",
      "Jamie's sole authorship or execution of the expedition",
      "that every quoted or paraphrased interpretation was shared by the full crew",
      "permission to republish the scan or photographs"
    ],
    protectedLocatorId: "LOC-WATERWAYS-KC-STAR-2007-11-15",
    media: {
      mediaKind: "document",
      rightsHolder: "The Kansas City Star",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold",
      visibleText: [
        "In the name of art, go with the flow",
        "RIVER: Adventure of a lifetime takes three friends from KC to Louisiana"
      ],
      captureTimestamp: "2007-11-15",
      timestampConfidence: "high"
    }
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
    accessedAt: "2026-07-16",
    canonicalUrl:
      "https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Eric Barton, 'Artists Turned Huck Finn, Part III,' The Pitch, November 12, 2007.",
    publicNote:
      "Contemporaneous local reporting that corroborates the project's title, July departure, recycled-material construction, more than 1,000 miles traveled, Coast Guard interruption, Vicksburg repair period, and community assistance.",
    supportsGenerally: [
      "the project's title and Kansas City-to-Gulf intention",
      "the July 21 departure from Kaw Point",
      "more than 1,000 miles traveled before the Coast Guard interruption",
      "the recycled-material raft",
      "Libby Hendon and Laura Mattingly's roles in the traveling group",
      "local housing, repair, work, and legal assistance in Vicksburg"
    ],
    doesNotEstablish: [
      "the expedition's eventual Gulf endpoint",
      "a complete participant roster for every stage",
      "Jamie's sole authorship or execution",
      "that all Vicksburg residents participated or endorsed the project",
      "the accuracy of every fact attributed to another publication"
    ]
  }
];

export const waterwaysKcStarObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-WATERWAYS-KC-STAR-FRONT-PAGE",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The Kansas City Star placed its illustrated report on the lower half of the November 15, 2007, front page and continued it on page A4.",
    locator: "PDF pages 1-2, front-page article and A4 continuation",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-KC-STAR-CREW",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The report identifies the crew then traveling as Jamie Burkart, Libby Hendon, and Laura Mattingly and depicts all three together on the raft and in a Vicksburg Post photograph.",
    locator: "PDF page 1, article opening and raft caption; page 2, crew photograph and caption",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-KC-STAR-CRAFT",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The article describes an approximately 12-by-13-foot craft propelled by two bicycles linked to a paddlewheel and built in three weeks from discarded building remnants, civic refuse, and plastic syrup drums.",
    locator: "PDF page 2, opening columns",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-KC-STAR-IN-PROGRESS",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The report says the expedition left Kansas City's West Bottoms on July 21, had passed the 1,000-mile marker, and was south of Baton Rouge when the story appeared; it describes the journey as still in progress rather than confirming the eventual endpoint.",
    locator: "PDF page 1, article opening; page 2, route and propulsion sections",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-KC-STAR-PARTICIPATORY-PURPOSE",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The article frames the project as a lived experience of the rivers and encounters with people along them; it reports Jamie inviting people met during the journey to join the raft and relating the voyage to reconnecting Kansas City and Delta communities with the river.",
    locator: "PDF page 2, project-purpose section and closing voicemail account",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-KC-STAR-INTERRUPTION-RECOVERY",
    sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    project: projectId,
    text: "The report documents a Coast Guard safety intervention that beached the raft, followed by local legal assistance, retrieval, temporary work, repairs, and safety additions before the crew resumed the journey.",
    locator: "PDF page 2, Coast Guard, Vicksburg, repair, and relaunch sections",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  },
  {
    id: "OBS-WATERWAYS-PITCH-PART-III-CORROBORATION",
    sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
    project: projectId,
    text: "The Pitch separately preserves the project title, July 21 Kaw Point departure, recycled-material construction, more than 1,000 miles traveled, a nearly seven-week Coast Guard interruption, and community-supported repair work in Vicksburg.",
    locator: "Article body, paragraphs 1-6",
    status: "verified",
    confidence: "high",
    claimIds: [claimId],
    researchInquiryIds: [],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source review"]
  }
];
