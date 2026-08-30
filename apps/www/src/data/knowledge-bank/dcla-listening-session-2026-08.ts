import type { KnowledgeBank, KnowledgeObservation } from "./schema.ts";

const reviewedAt = "2026-08-29";
const project = "nyc-artist-coalition";
const transcriptId = "SRC-DCLA-LISTENING-READING-2026-08-26";
const photoId = "SRC-DCLA-PORTRAIT-PERMISSION-2026-08-26";
const followupId = "SRC-DCLA-FOLLOWUP-STATE-2026-08-28";
const inquiryId = "RI-DCLA-PORTRAIT-ASSOCIATION-2026-08-26";

function observation(
  suffix: string,
  sourceId: string,
  intakeId: string,
  text: string,
  locator: string,
  kind: KnowledgeObservation["kind"] = "source-fact",
  limitations: string[] = []
): KnowledgeObservation {
  return {
    id: `OBS-DCLA-${suffix}-2026-08-26`,
    intakeId, sourceId, comparisonSourceIds: [], project, kind, text, locator,
    status: "extracted", publicSafe: true, claimIds: [], researchInquiryIds: [],
    limitations
  };
}

const transcriptIntake = "INTAKE-DCLA-LISTENING-READING-2026-08-26";
const photoIntake = "INTAKE-DCLA-PORTRAIT-2026-08-26";
const followupIntake = "INTAKE-DCLA-FOLLOWUP-2026-08-28";
const transcriptLimit = "Contextually repaired working transcript, not human audio-audited; paraphrase only, with mixed-speaker passages treated cautiously.";

const observations: KnowledgeBank["observations"] = [
  observation("EVENT-CONTEXT", transcriptId, transcriptIntake,
    "The August 26 Brooklyn artist listening session at 651 ARTS brought cultural workers into discussion with DCLA about usable, stable cultural space, funding access, accessibility, and accountable follow-through.",
    "Full contextual edition, 00:21:42–01:46:03.", "context", [transcriptLimit]),
  observation("POLICY-TRANSLATION", transcriptId, transcriptIntake,
    "Speaking as an NYC Artist Coalition member, Jamie asked who in the room depended on rented cultural space, connected that shared condition to commercial rent stabilization, and asked how cultural leadership could advance protections through government.",
    "Full contextual edition, 01:16:36–01:18:21; selected machine-edition cross-check.", "source-fact",
    [transcriptLimit, "Participation and advocacy do not establish event hosting, bill authorship, enactment, or sole causation."]),
  observation("INSTITUTIONAL-RESPONSE", transcriptId, transcriptIntake,
    "The contextual edition records commercial rent stabilization among ideas named in the commissioner's closing summary. The machine-compared edition differs in this passage; acknowledgment of a proposal cannot be treated as an endorsement or implementation commitment.",
    "Compare contextual and machine-compared editions at 01:38:44–01:40:59.", "research-lead",
    ["Do not publish a quotation or assert independently verified wording from this discrepancy; consult the original audio if that wording becomes consequential."]),
  observation("IMPLEMENTATION-FOLLOWTHROUGH", transcriptId, transcriptIntake,
    "After the formal program, Jamie returned to the practical question of making cultural-space protections work, connecting the policy discussion to the neighborhood relationships that cultural spaces sustain.",
    "Full contextual edition, 02:05:42–02:06:23.", "source-fact",
    [transcriptLimit, "A listening exchange is not a commissioned assignment or authorized role in government."]),
  observation("DATA-PRACTICE", transcriptId, transcriptIntake,
    "In follow-up conversations, Jamie engaged with cultural funding flows, the visibility of less-obvious cultural spaces, dataset completeness, organizational identifiers, and the accessibility of cultural records.",
    "Full contextual edition, 01:59:20–02:01:46 and 02:07:35–02:09:37.", "source-fact",
    [transcriptLimit, "Side-conversation speaker labels may merge turns; this is not evidence of a city data contract or a completed data product."]),
  observation("PRACTICE-SYNTHESIS", transcriptId, transcriptIntake,
    "The encounter connects Jamie's situated listening, problem framing, policy translation, and technical questions about usable information. This is a useful research example of carrying a shared concern toward practical follow-through.",
    "Close-reading synthesis across the formal intervention and subsequent exchanges.", "bounded-inference",
    ["This is an editorial interpretation of demonstrated activity, not a hiring judgment or proof of policy impact."]),
  {
    ...observation("PORTRAIT", photoId, photoIntake,
      "Jamie supplied two closely related portraits showing him among listening-session attendees, wearing a blue jacket and tie with writing tools in his pocket. He explicitly cleared their use on his portfolio and reports that the photograph is in Apple Photos.",
      "User-supplied portrait variants and explicit portfolio permission, reviewed August 29.", "visual-observation",
      ["The portrait establishes visible context, not who hosted or spoke. Other attendees are not identified. Apple Photos association and creator are not independently verified."]),
    researchInquiryIds: [inquiryId]
  },
  observation("FOLLOWUP-STATES", followupId, followupIntake,
    "One subsequent correspondence exchange records interest in joining the coalition, a planned event animation, and an offer of photo selects. Three pasted copies are the same exchange, not three independent signals.",
    "Body-free state summary of the August 27–28 exchange supplied by Jamie.", "source-fact",
    ["Interest is not completed enrollment; a plan is not delivery; an offer is not an accepted or completed assignment. No counterpart identity, message body, or contact details are retained."])
];

const sources: KnowledgeBank["sources"] = [
  {
    id: transcriptId, title: "DCLA Brooklyn listening session — repaired-edition close reading",
    kind: "research-run", visibility: "private", preservationStatus: "private",
    publishedAt: "2026-08-26", accessedAt: reviewedAt,
    publicCitation: "Governed reading of the August 26, 2026 Brooklyn artist listening session; underlying transcript withheld.",
    publicNote: "Full contextual edition read; selected comparison against a machine-aligned edition. Edition fingerprints and review scope are retained without private locators.",
    supportsGenerally: ["participation", "policy translation", "implementation questions", "cultural-data inquiry"],
    doesNotEstablish: ["human audio audit", "quotation clearance", "government endorsement", "event hosting by Jamie", "legislative enactment", "commissioned work"],
    protectedLocatorId: "protected-dcla-reading-2026-08-26"
  },
  {
    id: photoId, title: "DCLA listening-session portrait — supplied permission and visual review",
    kind: "participant-photograph", visibility: "public-metadata-only", preservationStatus: "private",
    publishedAt: "2026-08-26", accessedAt: reviewedAt,
    publicCitation: "Photo courtesy of NYC Artist Coalition.",
    publicNote: "Jamie explicitly permits portfolio use. The selected image is available for future composition; no new page placement is made by this intake.",
    supportsGenerally: ["visible event context", "explicit portfolio photo permission"],
    doesNotEstablish: ["exact Apple Photos binding", "photographer identity", "speaker role", "event hosting", "transcript publication permission"],
    protectedLocatorId: "protected-dcla-portrait-2026-08-26",
    media: { mediaKind: "photograph", rightsStatus: "cleared", consentStatus: "cleared", publicDisplayStatus: "metadata-only" }
  },
  {
    id: followupId, title: "Listening-session follow-up — minimal state summary",
    kind: "research-run", visibility: "private", preservationStatus: "private",
    capturedAt: "2026-08-28", accessedAt: reviewedAt,
    publicCitation: "Governed follow-up state summary; private correspondence withheld.",
    supportsGenerally: ["membership interest", "animation planned", "photo selects offered"],
    doesNotEstablish: ["completed enrollment", "animation delivered", "photo selects delivered", "endorsement", "hiring intent"],
    protectedLocatorId: "protected-dcla-followup-2026-08-28"
  }
];

const intakeItems: KnowledgeBank["intakeItems"] = [
  { id: transcriptIntake, kind: "analysis-note", title: "DCLA listening session — situated advocacy and implementation reading", sourceId: transcriptId },
  { id: photoIntake, kind: "photo-lead", title: "DCLA listening-session portrait with explicit portfolio permission", sourceId: photoId },
  { id: followupIntake, kind: "analysis-note", title: "Listening-session follow-up — interest, plans, and offers", sourceId: followupId }
].map(({ sourceId, ...item }) => ({
  ...item,
  kind: item.kind as KnowledgeBank["intakeItems"][number]["kind"],
  submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: [project],
  reason: "Deepen the coalition's source-backed practice record while keeping the portfolio selective and private evidence out of public surfaces.",
  visibility: "protected", disposition: "integrated", sourceIds: [sourceId],
  observationIds: observations.filter(o => o.sourceId === sourceId).map(o => o.id),
  researchInquiryIds: sourceId === photoId ? [inquiryId] : [],
  boundaries: [
    "Retain no full source text, correspondence body, private path, participant list, contact details, or account identifier.",
    "No new public claim or citation occurrence is authorized by this research intake.",
    "Photo permission is explicit; exact asset association and editorial placement are separate decisions."
  ]
}));

const researchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: inquiryId, project,
  question: "Which exact approved portrait derivative should be used, and can its Apple Photos association and photographer be verified?",
  methods: ["Review supplied variants and permission", "Use an authorized fresh Photo Fieldwork gateway receipt for any subsequent library query"],
  runAt: reviewedAt, resultStatus: "partially-recovered",
  findings: ["Two supplied variants reviewed as one event family; portfolio permission explicitly granted.", "Use project courtesy credit unless the exact asset's creator is verified."],
  limitations: ["A fresh live photo gateway check did not complete in this run; library presence remains user-attested, not an exact catalog match.", "The association inquiry is not a request to re-authorize already permitted portfolio use."],
  sourceIds: [photoId],
  publicSummary: "An approved contemporary event portrait is available for future composition; exact archive association remains a research step.",
  protectedLocatorId: "protected-dcla-portrait-2026-08-26"
}];

export const dclaListeningSessionAugust2026 = {
  intakeItems, observations, sources, researchInquiries,
  claims: [] as KnowledgeBank["claims"]
};
