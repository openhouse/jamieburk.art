import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const project = "nyc-artist-coalition";
const intakeId = "INTAKE-DCLA-ANIMATION-OUTCOME-CLARIFICATION";
const assessmentId = "SRC-JAMIE-DCLA-ANIMATION-OUTCOME-2026-10-18";
const claimId = "CLM-DCLA-ANIMATION-COLLABORATIVE-PUBLICATION";
const inquiryId = "INQ-DCLA-ANIMATION-ADOPTION-PROCESS";
const articleId = "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03";
const reelId = "SRC-DCLA-INSTAGRAM-DENAV1HHOXC";
const panelId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18";
const visualId = "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18";
const sourceIds = [assessmentId, articleId, reelId, panelId, visualId];

// Success as assessed by the maker is distinct from the observed publication
// outcome, and both are distinct from an institutional policy decision.
export const dclaOutcomeReview = {
  reviewedAt,
  outcomeType: "communications-adoption",
  publicationScope: "one-reel-and-article-inclusion",
  creationEvidence: articleId,
  collaborationEvidence: panelId,
  messageEvidence: visualId,
  assessment: { sourceId: assessmentId, attributedTo: "Jamie Burkart", status: "first-person-assessment" },
  campaignConnection: { sourceId: assessmentId, status: "maker-attributed" },
  collaborators: ["651arts", "nyculture", "bkartscouncil", "lin.tyrpien", "jamieburkart", "nycartc"],
  policyEndorsementEstablished: false,
  policyAdoptionEstablished: false,
  formalPartnershipEstablished: false,
  audienceGrowthMeasured: false,
  adoptionProcessVerified: false,
  participantConsensusEstablished: false,
  websiteProjection: "text-only",
  mediaReuseAuthorized: false
};

const publicText = "I created a photo-animation recap of a Brooklyn cultural listening session in 2026. It appeared as an Instagram collaboration with NYC Artist Coalition, NYC’s Department of Cultural Affairs, Brooklyn Arts Council, 651 ARTS, and writer Lin Tyrpien. Tyrpien’s article also features the animation. The shared recap carried FairRentNYC’s call for commercial rent stabilization alongside other artists’ concerns.";

const sources: KnowledgeBank["sources"] = [{
  id: assessmentId, title: "Jamie’s assessment of the animation’s communications outcome", author: "Jamie Burkart",
  kind: "research-run", visibility: "public-metadata-only", preservationStatus: "private", accessedAt: reviewedAt,
  publicCitation: "Jamie Burkart, first-person account of the animation’s purpose and outcome, October 18, 2026.",
  publicNote: "Jamie identifies the recap’s adoption, public collaborative status, and carriage of the FairRentNYC message as the reasons he considers it a success. This is a summarized first-person assessment, not an institutional performance evaluation.",
  supportsGenerally: ["Jamie's assessment of communications success", "Jamie's connection of the recap to FairRentNYC's commercial rent stabilization campaign"],
  doesNotEstablish: ["institutional policy endorsement", "policy adoption", "formal partnership", "measured audience growth", "how collaboration invitations or approvals were secured", "component media rights"],
  protectedLocatorId: "RESEARCH-DCLA-OUTCOME-ACCOUNT-2026-10"
}];

const observations: KnowledgeBank["observations"] = [{
  id: "OBS-DCLA-ANIMATION-SUCCESS-ASSESSMENT", intakeId, sourceId: assessmentId, comparisonSourceIds: [articleId, panelId, visualId], project,
  kind: "participant-memory", status: "captured", publicSafe: true,
  text: "Jamie considers the recap successful because others adopted the work, the shared publication made Jamie and NYC Artist Coalition visible as collaborators, and the recap carried FairRentNYC's commercial rent stabilization message.",
  locator: "Maker's October 18 clarification of the outcome, supplied with three reel screenshots; summarized without reproducing the source message.",
  claimIds: [claimId], researchInquiryIds: [inquiryId],
  limitations: ["This records Jamie's assessment and campaign connection, not a policy decision or another participant's judgment."]
}, {
  id: "OBS-DCLA-ANIMATION-PUBLIC-COLLABORATION", intakeId, sourceId: panelId, comparisonSourceIds: [articleId, reelId], project,
  kind: "visual-observation", status: "corroborated", publicSafe: true,
  text: "The collaborator panel identifies Jamie and NYC Artist Coalition alongside 651 ARTS, NYC Department of Cultural Affairs, Brooklyn Arts Council, and Lin Tyrpien on this shared Instagram publication. The article separately includes and credits the animation.",
  locator: "Collaborators panel in the first screenshot accompanying the outcome clarification; compared with the earlier six-account panel and article inclusion observation.",
  claimIds: [claimId], researchInquiryIds: [inquiryId],
  limitations: ["The relationship is collaboration on this publication, not an ongoing formal partnership or endorsement of legislation."]
}, {
  id: "OBS-DCLA-ANIMATION-CAMPAIGN-CARRIAGE", intakeId, sourceId: visualId, comparisonSourceIds: [assessmentId], project,
  kind: "bounded-inference", status: "corroborated", publicSafe: true,
  text: "The shared recap carries a cultural-space rent-stabilization request alongside artists' work, senior studio space, and accountability. Jamie identifies this message with FairRentNYC's commercial rent stabilization campaign.",
  locator: "Previously inspected caption sequence, plus the third screenshot accompanying the maker's outcome clarification; campaign attribution comes from the maker's account.",
  claimIds: [claimId], researchInquiryIds: [inquiryId],
  limitations: ["Campaign connection is maker-attributed. Visible captions are not audio-certified quotations or evidence of participant consensus."]
}];

export const dclaAnimationOutcome = {
  sources, observations,
  intakeItems: [{ id: intakeId, kind: "memory-lead", title: "DCLA recap: maker's outcome clarification", submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: [project], reason: "Preserve communications adoption and public collaborative visibility as outcomes without equating them with policy adoption.", visibility: "public-safe", disposition: "integrated", sourceIds, observationIds: observations.map(item => item.id), researchInquiryIds: [inquiryId], boundaries: ["Additive interpretation of the same reel, not a duplicate publication source. Raw messages and screenshots remain outside the public repository. Text projection only; no new media rights or deployment approval follows from this record."] }] satisfies KnowledgeBank["intakeItems"],
  claims: [{
    id: claimId, project, internalClaim: publicText, status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: publicText, status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: articleId, relationship: "direct-support", supports: ["published photo-animation credit to Jamie Burkart for NYC Artist Coalition", "animation included in the article when inspected"], confidence: "high", renderCitation: true, locator: "Animation and credit in the article, inspected October 18; first embed date unknown." },
      { sourceId: panelId, relationship: "direct-support", supports: ["displayed collaborator accounts"], confidence: "high", renderCitation: false, locator: "Six-account Collaborators panel; the later supplied first screenshot corroborates the earlier panel." },
      { sourceId: visualId, relationship: "direct-support", supports: ["on-screen caption sequence"], confidence: "high", renderCitation: false, locator: "One-frame-per-second visual sample and the supplied rent-stabilization caption screenshot." },
      { sourceId: reelId, relationship: "corroborating", supports: ["October 7 Instagram publication", "30-second published animation"], confidence: "high", renderCitation: true, locator: "Public reel and its retrieved publication metadata." },
      { sourceId: assessmentId, relationship: "direct-support", supports: ["Jamie's connection of the recap to FairRentNYC's commercial rent stabilization campaign"], confidence: "high", renderCitation: false, locator: "Maker's October 18 outcome clarification; authority limited to his purpose and assessment." }
    ],
    boundaries: ["Adoption of the communication is a real outcome; it is not institutional endorsement or adoption of campaign policy.", "Collaboration is scoped to this public artifact, not a formal or continuing partnership.", "Jamie is credited for the animation, not sole authorship of the event, participants' words, or every media component.", "No audience-growth, policy-impact, or participant-consensus claim is made. No media embedding or rehosting is selected."],
    antiClaims: ["DCLA endorsed FairRentNYC's legislation.", "All participants agreed with the campaign.", "The publication established a permanent institutional partnership.", "Jamie alone produced every component or caused policy change."],
    researchInquiryIds: [inquiryId, "INQ-DCLA-ANIMATION-CREDITS-AND-WEBSITE-USE"], reviewedAt,
    reviewedBy: ["Jamie Burkart's outcome clarification", "Source-grounded editorial review; not institutional endorsement"]
  }] satisfies KnowledgeBank["claims"],
  researchInquiries: [{ id: inquiryId, project, question: "What work connected creation of the recap to its collaborative publication, and what follow-up can be evidenced?", methods: ["Compare the maker's assessment with the existing article credit, collaborator panel, and visual-caption observations.", "Keep creative choices, invitation handling, revisions, permissions, and subsequent conversations as questions until supported."], runAt: reviewedAt, resultStatus: "partially-recovered", findings: ["A shared public recap and article inclusion support a communications-adoption outcome. Jamie identifies carrying FairRentNYC's message as a success."], limitations: ["How adoption was secured is not established; do not invent outreach, negotiations, or approval steps.", "Institutional policy endorsement, lasting partnership, audience growth, and policy effects are not established.", "Artists' distinct concerns remain distinct; no consensus or speaker identification is inferred."], sourceIds }] satisfies KnowledgeBank["researchInquiries"],
  entities: [{ id: "ENT-DCLA-BROOKLYN-RECAP-2026", name: "Brooklyn cultural listening-session photo-animation recap", kind: "project", aliases: [], publicSafe: true }] satisfies KnowledgeBank["entities"],
  agencyRelations: [{ id: "REL-JAMIE-DCLA-RECAP-PUBLICATION", project, actorIds: ["ENT-JAMIE-BURKART"], action: "helped-produce", objectId: "ENT-DCLA-BROOKLYN-RECAP-2026", purpose: "Create a usable event recap that carries artists' concerns and the FairRentNYC campaign message.", result: "Jamie created the credited animation; the recap appeared as a shared Instagram publication and in Lin Tyrpien's article.", creditScope: "shared", status: "confirmed-with-boundary", claimIds: [claimId], sourceIds: [articleId, panelId, assessmentId], sourceSupportKeys: ["published photo-animation credit to Jamie Burkart for NYC Artist Coalition", "displayed collaborator accounts", "Jamie's connection of the recap to FairRentNYC's commercial rent stabilization campaign"], boundaries: ["Individual animation credit within collective event and publication work; no policy endorsement, sole production credit, or formal partnership is inferred."], reviewedAt, reviewedBy: ["Source-grounded outcome review"] }] satisfies KnowledgeBank["agencyRelations"]
};
