import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-29";
const project = "nyc-artist-coalition";
const eventIntake = "INTAKE-DCLA-BROOKLYN-2026-08-26";
const photoIntake = "INTAKE-DCLA-PORTRAITS-2026-08-26";
const followupIntake = "INTAKE-DCLA-FOLLOWUP-2026-08-28";
const contextSource = "SRC-DCLA-JAMIE-CONTEXT-2026-08-29";
const repairSource = "SRC-DCLA-REPAIR-REVIEW-2026-08-29";
const followupSource = "SRC-DCLA-FOLLOWUP-STATE-2026-08-28";
const transcriptInquiry = "INQ-DCLA-FULL-REPAIRED-READING";
const photoInquiry = "INQ-DCLA-PORTRAIT-CATALOG-ASSOCIATION";

// A review snapshot, not a substitute for the protected transcript or photo catalog.
// New evidence must advance its own verification state before any public claim.
export const dclaReview = {
  reviewedAt,
  eventDate: "2026-08-26",
  transcript: {
    edition: "audio-compared-repaired",
    access: "icloud-placeholder-no-readable-body",
    fullTextReviewed: false,
    localBytesVerified: false,
    humanAudioReviewed: false,
    verbatimCertified: false,
    publicationAuthorized: false,
    verificationReceipt: null,
    reportedTurnCount: 314,
    reportedAudioComparedTurns: 276,
    reportedRetainedSourceTurns: 38
  },
  correspondence: {
    pastedCopies: 3,
    uniqueExchanges: 1,
    membershipCompleted: false,
    animationDelivered: false,
    commissionAccepted: false,
    endorsementEstablished: false,
    enactmentEstablished: false,
    publicationAuthorized: false
  },
  photos: [
    {
      sourceId: "SRC-DCLA-PORTRAIT-01-2026-08-26",
      sha256: "7dc6b03c33cfb12ec69f3c3d406ad6709d1ef4978c962d59c284c69782a24e90",
      bytes: 146592,
      portfolioPermission: true,
      permissionBasis: "Jamie explicitly cleared the supplied photograph for portfolio use on 2026-08-29.",
      destination: "portfolio",
      credit: "Photo courtesy of NYC Artist Coalition.",
      applePhotosBindingVerified: false,
      selection: "preferred-candidate"
    },
    {
      sourceId: "SRC-DCLA-PORTRAIT-02-2026-08-26",
      sha256: "3be89848957d4cd522d7ebe9c0242380eb4664538d34c98b4f699e4131bf6f3d",
      bytes: 164808,
      portfolioPermission: true,
      permissionBasis: "Jamie explicitly cleared the supplied photograph for portfolio use on 2026-08-29.",
      destination: "portfolio",
      credit: "Photo courtesy of NYC Artist Coalition.",
      applePhotosBindingVerified: false,
      selection: "alternate-candidate"
    }
  ]
};

const sources: KnowledgeBank["sources"] = [
  {
    id: contextSource, title: "Jamie's DCLA listening-session context and permission",
    kind: "research-run", visibility: "private", preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation: "Jamie Burkart's August 2026 listening-session account and portfolio permission.",
    publicNote: "Participant-supplied context and explicit image-use permission are retained as separate evidence relationships.",
    supportsGenerally: ["Jamie's identification of the event and himself in the supplied portraits", "portfolio permission for both supplied photographs"],
    doesNotEstablish: ["photographer identity", "exact spoken words", "agency endorsement"],
    protectedLocatorId: "CONTEXT-DCLA-AUGUST-2026"
  },
  {
    id: repairSource, title: "DCLA listening-session repair and event-summary review",
    kind: "research-run", visibility: "private", preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation: "Governed review of event-summary and transcript-repair records, August 29, 2026.",
    publicNote: "The repair records and event summary were read. The complete audio-compared edition was unavailable for this review; reported counts do not independently verify custody of its text.",
    supportsGenerally: ["event date and venue in upstream records", "source-edition selection", "research leads about session themes and Jamie's participation"],
    doesNotEstablish: ["full-transcript close reading", "human audio review", "certified verbatim quotations", "publication permission", "adopted DCLA policy"],
    protectedLocatorId: "RESEARCH-DCLA-REPAIR-AUGUST-2026"
  },
  {
    id: followupSource, title: "Protected listening-session follow-up state",
    kind: "research-run", visibility: "private", preservationStatus: "private",
    accessedAt: reviewedAt, capturedAt: "2026-08-27/2026-08-28",
    publicCitation: "Redacted state summary of one August 27–28, 2026 listening-session follow-up exchange.",
    publicNote: "Three pasted copies describe one exchange. Retain state distinctions, not identities, message bodies, contact details, or a testimonial.",
    supportsGenerally: ["interest in joining", "Jamie's planned organizing and animation", "an offer to help with photo selection"],
    doesNotEstablish: ["completed membership", "delivered animation", "accepted commission", "endorsement", "legislative enactment"],
    protectedLocatorId: "COMM-DCLA-FOLLOWUP-AUGUST-2026"
  },
  ...dclaReview.photos.map((photo, index): KnowledgeBank["sources"][number] => ({
    id: photo.sourceId,
    title: `DCLA listening-session portrait candidate ${index + 1}`,
    kind: "participant-photograph", visibility: "public-metadata-only", preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation: "Jamie Burkart at a DCLA listening session. Photo courtesy of NYC Artist Coalition.",
    publicNote: "Jamie supplied and cleared this photograph for his portfolio. Event association is participant-supplied; the Apple Photos association and photographer remain unverified. No placement has been made.",
    supportsGenerally: ["visual portrait of Jamie among event participants", "approved portfolio image candidate"],
    doesNotEstablish: ["who took the photograph", "what was said", "host or agency endorsement", "speaker identities of other participants"],
    protectedLocatorId: `MEDIA-DCLA-PORTRAIT-${index + 1}`,
    media: { mediaKind: "photograph", rightsStatus: "cleared", consentStatus: "cleared", publicDisplayStatus: "metadata-only" }
  }))
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-DCLA-EVENT-CONTEXT-2026-08-26", intakeId: eventIntake, sourceId: repairSource,
    comparisonSourceIds: [contextSource], project, kind: "source-fact",
    text: "The upstream event summary identifies the August 26, 2026 DCLA Brooklyn artist listening session at 651 ARTS. Jamie identifies the supplied portraits as photographs of himself at that session.",
    status: "extracted", publicSafe: true, claimIds: [], researchInquiryIds: [transcriptInquiry],
    limitations: ["This records what the reviewed summary and participant account establish; it is not a first-hand reading of the full transcript."]
  },
  {
    id: "OBS-DCLA-PARTICIPATION-RESEARCH-2026-08-26", intakeId: eventIntake, sourceId: repairSource,
    comparisonSourceIds: [contextSource], project, kind: "research-lead",
    text: "The event summary records Jamie speaking as an NYC Artist Coalition member and raising commercial rent stabilization for cultural spaces. Verify his full intervention, its sequence, and responses against the complete audio-compared edition before composing new public copy.",
    status: "captured", publicSafe: true, claimIds: [], researchInquiryIds: [transcriptInquiry],
    limitations: ["Participation and advocacy are not institutional authority, policy adoption, or sole causation."]
  },
  {
    id: "OBS-DCLA-THEMES-RESEARCH-2026-08-26", intakeId: eventIntake, sourceId: repairSource,
    comparisonSourceIds: [], project, kind: "research-lead",
    text: "The upstream summary groups concerns around affordable space, accessibility, grant administration, compensation, cultural continuity, and artists' participation in policymaking. These are leads for a full reading, not adopted agency findings.",
    status: "captured", publicSafe: true, claimIds: [], researchInquiryIds: [transcriptInquiry],
    limitations: ["Do not flatten different speakers into consensus or assign these themes to Jamie without passage-level evidence."]
  },
  {
    id: "OBS-DCLA-PORTRAIT-COMPOSITION-2026-08-26", intakeId: photoIntake, sourceId: dclaReview.photos[0].sourceId,
    comparisonSourceIds: [dclaReview.photos[1].sourceId], project, kind: "visual-observation",
    text: "Both portraits show Jamie in a blue jacket, tie and cap amid other participants. The first frame's slightly tighter composition is the preferred candidate; the second remains an alternative. Neither image shows the content of his spoken intervention.",
    status: "verified", publicSafe: true, claimIds: [], researchInquiryIds: [photoInquiry],
    limitations: ["Preference is a curatorial judgment. Do not infer other participants' identities or roles from appearance."]
  },
  {
    id: "OBS-DCLA-PORTRAIT-PERMISSION-2026-08-29", intakeId: eventIntake, sourceId: contextSource,
    comparisonSourceIds: dclaReview.photos.map(photo => photo.sourceId), project, kind: "source-fact",
    text: "Jamie explicitly authorizes both supplied photographs for his portfolio. Credit the project because the photographer is unverified: Photo courtesy of NYC Artist Coalition.",
    status: "verified", publicSafe: true, claimIds: [], researchInquiryIds: [photoInquiry],
    limitations: ["Image clearance does not authorize private correspondence, transcript publication, or uses outside the portfolio. Catalog association remains a separate research task, not a reason to forget the granted permission."]
  },
  {
    id: "OBS-DCLA-FOLLOWUP-INTEREST-2026-08-28", intakeId: followupIntake, sourceId: followupSource,
    comparisonSourceIds: [], project, kind: "source-fact",
    text: "One post-session correspondent expressed interest in joining NYC Artist Coalition and seeing a possible event animation. This is an interest state, not completed onboarding or an endorsement.",
    status: "extracted", publicSafe: true, claimIds: [], researchInquiryIds: [],
    limitations: ["Private identity and correspondence remain withheld. Repeated pasted text is not independent corroboration."]
  },
  {
    id: "OBS-DCLA-FOLLOWUP-PLANS-2026-08-28", intakeId: followupIntake, sourceId: followupSource,
    comparisonSourceIds: [], project, kind: "source-fact",
    text: "Jamie described coalition-meeting preparation ahead of a future Council resolution hearing, a planned animation, and willingness to help with photo selects. Record organizing in progress, a plan, and an offer separately.",
    status: "extracted", publicSafe: true, claimIds: [], researchInquiryIds: [],
    limitations: ["Do not infer a held meeting, delivered animation, commissioned assignment, confirmed hearing schedule, or enacted rent stabilization."]
  },
  {
    id: "OBS-DCLA-PORTFOLIO-RELEVANCE-2026-08-29", intakeId: eventIntake, sourceId: contextSource,
    comparisonSourceIds: [repairSource, followupSource], project, kind: "bounded-inference",
    text: "The portfolio research opportunity is to connect situated participation with practical follow-through: translating cultural-space needs into advocacy, relationships, and useful materials. A portrait can make that work tangible; it cannot substitute for evidence of the work's outcomes.",
    status: "captured", publicSafe: true, claimIds: [], researchInquiryIds: [transcriptInquiry],
    limitations: ["This is editorial interpretation, not a hiring prediction or a new public accomplishment claim."]
  }
];

const intakeItems: KnowledgeBank["intakeItems"] = [
  ...[
    { id: eventIntake, kind: "analysis-note" as const, title: "DCLA session context, permission and full-reading inquiry", disposition: "researching" as const, sourceIds: [contextSource, repairSource], researchInquiryIds: [transcriptInquiry, photoInquiry] },
    { id: photoIntake, kind: "photo-lead" as const, title: "Two cleared DCLA portrait candidates", disposition: "triaged" as const, sourceIds: [contextSource, ...dclaReview.photos.map(photo => photo.sourceId)], researchInquiryIds: [photoInquiry] },
    { id: followupIntake, kind: "analysis-note" as const, title: "Redacted post-session follow-up states", disposition: "integrated" as const, sourceIds: [followupSource], researchInquiryIds: [] }
  ].map(item => ({
    ...item, submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: [project],
    reason: "Preserve a useful portfolio research fragment with its own evidence, permission, and completion state.",
    visibility: "protected" as const,
    observationIds: observations.filter(observation => observation.intakeId === item.id).map(observation => observation.id),
    boundaries: ["Public-safe summaries only; no raw messages, transcript body, private locators, or unverified attribution.", "No new public claim is promoted by this intake."]
  })),
  ...[2, 3].map(copy => ({
    id: `${followupIntake}-COPY-${copy}`, kind: "analysis-note" as const,
    title: `Repeated follow-up paste ${copy}`, submittedAt: reviewedAt, submittedBy: "Jamie Burkart",
    projectIds: [project], reason: "Account for repeated input without multiplying evidence.",
    visibility: "protected" as const, disposition: "duplicate" as const, duplicateOfIntakeId: followupIntake,
    sourceIds: [followupSource], observationIds: [], researchInquiryIds: [],
    boundaries: ["One unique exchange; no additional event, endorsement, or corroborating witness."]
  }))
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: transcriptInquiry, project,
    question: "What did Jamie and other participants actually say across the full latest repaired session transcript?",
    methods: ["Read upstream event-summary and repair records.", "Attempt scoped local access and iCloud download of the staged transcript; check for readable text."],
    runAt: reviewedAt, resultStatus: "partially-recovered",
    findings: ["The event date is August 26, 2026; the intended edition is audio-compared-repaired, not the older working repair.", "Upstream records report 314 turns: 276 audio-compared and 38 retained source turns.", "The inspected staged iCloud file returned no text; the full latest edition was not read."],
    limitations: ["Reported counts and repair metadata are not independent verification of transcript bytes.", "Machine audio comparison does not establish human review, speaker identity, verbatim certification, or publication clearance."],
    sourceIds: [contextSource, repairSource],
    publicSummary: "Full-transcript close reading remains open. Recover a readable latest edition, verify it privately, then review all turns before promoting passage-based claims.",
    protectedLocatorId: "RESEARCH-DCLA-FULL-READING-AUGUST-2026"
  },
  {
    id: photoInquiry, project,
    question: "Which Apple Photos items correspond to the supplied cleared portrait bytes, and is a photographer credit verifiable?",
    methods: ["Visually compare the two supplied portraits and compute exact attachment digests.", "Record Jamie's album/library assertion separately from an independently verified catalog join."],
    runAt: reviewedAt, resultStatus: "partially-recovered",
    findings: ["Two distinct attachments are registered as portfolio-cleared candidates.", "The first is the preferred composition; retain project courtesy credit unless photographer evidence is recovered."],
    limitations: ["No Apple Photos query or catalog association was completed in this intake.", "No EXIF capture date or third-party authorship was independently verified. Keep private library identifiers outside this repository."],
    sourceIds: [contextSource, ...dclaReview.photos.map(photo => photo.sourceId)],
    publicSummary: "Portfolio permission is recorded. Catalog association and photographer attribution remain open, separately from editorial placement.",
    protectedLocatorId: "RESEARCH-DCLA-PORTRAIT-ASSOCIATION"
  }
];

export const dclaListeningSession = {
  intakeItems, observations, sources, researchInquiries,
  claims: [] as KnowledgeBank["claims"]
};
