import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const project = "nyc-artist-coalition";
const intakeId = "INTAKE-DCLA-ANIMATION-PUBLICATION-2026-10";
const articleId = "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03";
const reelId = "SRC-DCLA-INSTAGRAM-DENAV1HHOXC";
const inspectionId = "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18";
const screenshotsId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18";
const claimId = "CLM-DCLA-ANIMATION-PUBLISHED-CREDIT";
const inquiryId = "INQ-DCLA-ANIMATION-CREDITS-AND-WEBSITE-USE";

// This later encounter does not rewrite the August 29 plan or transcript review.
export const dclaPublicationReview = {
  reviewedAt,
  eventDate: "2026-08-26",
  article: { publishedAt: "2026-10-03", inspectedAt: reviewedAt, embedFirstPublishedAt: null },
  reel: { id: "DeNAv1HhOxC", publishedAt: "2026-10-07", dateBasis: "yt-dlp-upload-date", durationSeconds: 30 },
  inspection: {
    method: "one-frame-per-second-visual-sampling", sampledSecondBins: Array.from({ length: 30 }, (_, second) => second),
    derivativeSha256: "bc97a92809597e9a02bf72f443456c582ce31c60dbb4537b204ecba9790d530a",
    bytes: 4363226, width: 1080, height: 1920, framesPerSecond: 30,
    videoCodec: "VP9", audioCodec: "AAC", audioSampleRate: 44100, audioChannels: 2,
    humanAudioReviewed: false, verbatimCertified: false, fullSessionReviewed: false,
    widerCoalitionHistoryObserved: false
  },
  credit: { creditedPerson: "Jamie Burkart", creditedFor: "NYC Artist Coalition", role: "photo-animation", photographyEstablished: false, audioEditingEstablished: false, captionSelectionEstablished: false },
  collaborators: {
    basis: "user-supplied-screenshot-panel", accounts: ["651arts", "nyculture", "bkartscouncil", "lin.tyrpien", "jamieburkart", "nycartc"],
    endorsementEstablished: false, attendanceEstablished: false
  },
  websiteMediaUse: { authorized: false, displayStatus: "hold" },
  institutionalPolicyAdopted: false
};

const sources: KnowledgeBank["sources"] = [
  {
    id: articleId, title: "I Imagine a Brooklyn Where", author: "Lin Tyrpien", organization: "Creative New York",
    kind: "published-article", visibility: "public", preservationStatus: "live", publishedAt: "2026-10-03", accessedAt: reviewedAt,
    canonicalUrl: "https://www.creativenewyork.co/p/i-imagine-a-brooklyn-where", preferredPublicUrl: "canonical",
    publicCitation: "Lin Tyrpien, I Imagine a Brooklyn Where, Creative New York, October 3, 2026; inspected October 18, 2026.",
    publicNote: "The inspected article includes the animation and credits Jamie Burkart for NYC Artist Coalition. Its header date does not establish when the animation was added.",
    supportsGenerally: ["published photo-animation credit to Jamie Burkart for NYC Artist Coalition", "animation included in the article when inspected"],
    doesNotEstablish: ["first animation publication on the article date", "photography or audio-editing authorship", "caption-selection authorship", "paid commission", "agency endorsement", "website media-use permission"]
  },
  {
    id: reelId, title: "NYC Artist Coalition Brooklyn listening-session photo animation", organization: "NYC Artist Coalition",
    kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2026-10-07", accessedAt: reviewedAt,
    canonicalUrl: "https://www.instagram.com/reel/DeNAv1HhOxC/", preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, Brooklyn listening-session photo animation, Instagram reel DeNAv1HhOxC, October 7, 2026.",
    publicNote: "The upload date comes from retrieved public post metadata. A downloaded derivative supports inspection, not a new right to publish the media.",
    supportsGenerally: ["October 7 Instagram publication", "30-second published animation"],
    doesNotEstablish: ["first publication on any platform", "all creative roles", "institutional endorsement", "session-wide consensus", "adopted policy", "permission to republish video or audio"],
    media: { mediaKind: "other", rightsStatus: "permission-needed", consentStatus: "review-needed", publicDisplayStatus: "hold" }
  },
  {
    id: inspectionId, title: "DCLA animation visual inspection", kind: "research-run", visibility: "public-metadata-only", preservationStatus: "private", accessedAt: reviewedAt,
    publicCitation: "Visual inspection of a public reel derivative, October 18, 2026, sampled at one frame per second.",
    publicNote: "Thirty frames were sampled with ffmpeg fps=1 across the 30-second derivative. Bin numbers are not exact frame timestamps. These are on-screen caption observations, not a human audio review or a certified transcript.",
    supportsGenerally: ["on-screen caption sequence", "sampled frames contain no observed turn into wider coalition history"],
    doesNotEstablish: ["human audio review", "verbatim speech certification", "speaker identities", "full-session coverage", "a frame-complete motion review"],
    protectedLocatorId: "RESEARCH-DCLA-ANIMATION-VISUAL-2026-10"
  },
  {
    id: screenshotsId, title: "Supplied reel collaborator-panel screenshots", kind: "research-run", visibility: "public-metadata-only", preservationStatus: "private", accessedAt: reviewedAt,
    publicCitation: "Jamie-supplied screenshots of the reel and its collaborator panel, reviewed October 18, 2026.",
    publicNote: "The panel displays six accounts. This is a screenshot observation about co-publication context, not proof of each account's approval of each statement.",
    supportsGenerally: ["displayed collaborator accounts"],
    doesNotEstablish: ["institutional endorsement", "event attendance", "creative authorship", "hiring authority", "rights clearance"],
    protectedLocatorId: "RESEARCH-DCLA-REEL-SCREENSHOTS-2026-10"
  }
];

const observations: KnowledgeBank["observations"] = [
  { id: "OBS-DCLA-ANIMATION-ARTICLE-CREDIT", sourceId: articleId, locator: "Article caption adjacent to the embedded animation, inspected October 18, 2026.", kind: "source-fact", status: "verified", text: "The article credits Photo Animation by Jamie Burkart for NYC Artist Coalition.", claimIds: [claimId], limitations: ["This establishes the published animation credit, not every production role."] },
  { id: "OBS-DCLA-ANIMATION-ARTICLE-INCLUSION", sourceId: articleId, locator: "Article body below the follow-up paragraph: animation embed present on October 18, 2026; first embed date unknown.", kind: "source-fact", status: "verified", text: "The October 3 article includes the animation when inspected on October 18. The date it was first embedded is unknown.", claimIds: [], limitations: ["A publication header is not an edit history."] },
  { id: "OBS-DCLA-ANIMATION-REEL-PUBLICATION", sourceId: reelId, locator: "Retrieved metadata for reel DeNAv1HhOxC: upload_date and duration fields.", kind: "source-fact", status: "verified", text: "Retrieved post metadata records an October 7, 2026 upload date and a 30-second duration for reel DeNAv1HhOxC.", claimIds: [], limitations: ["This platform date does not establish the animation's first publication anywhere."] },
  { id: "OBS-DCLA-ANIMATION-CAPTION-SEQUENCE", sourceId: inspectionId, locator: "Visual inspection of one-frame-per-second bins 0–29 for request and response captions; full-resolution spot-check of bin 26. Bin numbers are not exact caption timestamps.", kind: "visual-observation", status: "verified", text: "The sampled captions move from a Brooklyn greeting, holding space, and artists' work to senior studio space, accountability, and cultural-space rent stabilization. The closing captions acknowledge accountability and name vacant storefronts, commercial rent stabilization, and public schools as discussion topics.", claimIds: [], limitations: ["On-screen captions are not certified spoken quotations. Distinct requests are not a consensus or a policy commitment.", "A pictured person is not automatically the speaker of an accompanying caption."] },
  { id: "OBS-DCLA-ANIMATION-HISTORY-BOUNDARY", sourceId: inspectionId, locator: "Bounded visual sample across one-frame-per-second bins 0–29 of the inspected derivative; not continuous or frame-complete motion review.", kind: "visual-observation", status: "extracted", text: "No turn into the Coalition's wider history was observed in the 30 sampled frames.", claimIds: [], limitations: ["One-frame-per-second sampling is not a frame-complete motion review; earlier draft intentions are not observations of this release."] },
  { id: "OBS-DCLA-ANIMATION-COLLABORATORS", sourceId: screenshotsId, locator: "Collaborators panel in the fifth supplied screenshot, reviewed October 18, 2026.", kind: "visual-observation", status: "extracted", text: "The supplied collaborator panel displays 651arts, nyculture, bkartscouncil, lin.tyrpien, jamieburkart, and nycartc.", claimIds: [], limitations: ["Account-level co-publication context does not establish endorsement, attendance, individual production roles, or reuse rights."] }
].map(item => ({ ...item, intakeId, project, comparisonSourceIds: [], publicSafe: true, researchInquiryIds: [inquiryId] })) as KnowledgeBank["observations"];

const claims: KnowledgeBank["claims"] = [{
  id: claimId, project, internalClaim: "Lin Tyrpien's article credits Jamie Burkart for NYC Artist Coalition's photo animation of the Brooklyn listening session.",
  status: "confirmed-with-boundary",
  projections: [{ key: "case-study", text: "Lin Tyrpien's article credits Jamie Burkart for NYC Artist Coalition's photo animation of the Brooklyn listening session.", status: "hold", citationRequired: true, surfaces: [] }],
  evidence: [{ sourceId: articleId, relationship: "direct-support", supports: ["published photo-animation credit to Jamie Burkart for NYC Artist Coalition"], confidence: "high", renderCitation: true, locator: "Caption adjacent to the embedded animation", publicNote: "Article inspected October 18; embed first-publication date remains unknown." }],
  boundaries: ["The credit establishes animation attribution, not photography, audio editing, caption selection, or a paid commission.", "Collaborator accounts do not establish endorsement, attendance, policy adoption, or media-use permission.", "No website placement or media release is selected by this claim."],
  antiClaims: ["Every listed institution endorsed the animation's requests.", "Jamie performed every production role.", "The article header proves the animation was published on October 3."],
  researchInquiryIds: [inquiryId], reviewedAt, reviewedBy: ["Source review; not a human release approval"]
}];

export const dclaAnimationPublication = {
  sources, observations, claims,
  intakeItems: [{ id: intakeId, kind: "public-url", title: "Published DCLA animation and article credit", submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: [project], reason: "Add the later public outcome without changing the earlier plan or unresolved transcript review.", sourceUrl: "https://www.instagram.com/reel/DeNAv1HhOxC/", visibility: "public-safe", disposition: "integrated", sourceIds: sources.map(item => item.id), observationIds: observations.map(item => item.id), researchInquiryIds: [inquiryId], boundaries: ["Only public-safe metadata and bounded visual observations are retained. No media payload, private locator, transcript, or new website placement is included."] }] satisfies KnowledgeBank["intakeItems"],
  researchInquiries: [{ id: inquiryId, project, question: "Which production roles and exact website media uses are supported for this published animation?", methods: ["Read the current article credit and public reel metadata.", "Inspect the derivative through one-frame-per-second sampling and the supplied collaborator-panel screenshots.", "Seek explicit role attribution and applicable media-use permission before selecting website placement."], runAt: reviewedAt, resultStatus: "partially-recovered", findings: ["Published photo-animation credit is established. Photography, audio editing, caption selection, and website media-use authorization are not established by this encounter."], limitations: ["No human audio review or certified transcript is claimed.", "Public availability and collaborator accounts do not clear reuse rights or certify endorsement.", "Earlier portrait permissions and the separate social-preview hold are not changed."], sourceIds: sources.map(item => item.id) }] satisfies KnowledgeBank["researchInquiries"]
};
