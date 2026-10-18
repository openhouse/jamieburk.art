import type { KnowledgeBank } from "./schema.ts";

// Public-safe summaries only. Source-edition bindings remain in protected custody.
const reviewedAt = "2026-10-18";
const reviewedBy = ["AI-assisted source review; Jamie authorized bounded text summaries"];

const sources: KnowledgeBank["sources"] = [
  {
    id: "SRC-RECENT-WONDERVILLE-REVIEW",
    title: "October 2026 Wonderville production and post-event review",
    kind: "research-run", visibility: "protected", preservationStatus: "private",
    protectedLocatorId: "EVID-6F17B22A",
    accessedAt: reviewedAt,
    publicCitation: "Bounded review of the October 4 production handoff and October 7 post-event record.",
    supportsGenerally: ["production guide delivered", "October 5 meeting occurred", "shared organizing and venue responsibilities"],
    doesNotEstablish: ["every planned cue performed", "attendance total", "adopted policy", "permission to reproduce messages or the production PDF"]
  },
  {
    id: "SRC-RECENT-DCLA-ARTICLE",
    title: "I Imagine a Brooklyn Where", author: "Lin Tyrpien",
    organization: "Creative New York / Lyle Gallery",
    kind: "published-article", visibility: "public", preservationStatus: "live",
    accessedAt: "2026-10-03",
    canonicalUrl: "https://www.creativenewyork.co/p/i-imagine-a-brooklyn-where",
    preferredPublicUrl: "canonical",
    publicCitation: "Lin Tyrpien, I Imagine a Brooklyn Where, Creative New York; publication observed October 3, 2026.",
    publicNote: "Lin wrote the article. Its embedded photo animation is credited to Jamie Burkart for NYC Artist Coalition.",
    supportsGenerally: ["published animation credit", "Lin's article authorship"],
    doesNotEstablish: ["exact publication date", "current page availability", "exact media edition", "permission to reuse the article, photographs, voices or music", "policy impact"]
  },
  {
    id: "SRC-RECENT-RED-HOOK-REVIEW",
    title: "Red Hook audio return and print-proof review, October 7, 2026",
    kind: "research-run", visibility: "protected", preservationStatus: "private",
    protectedLocatorId: "EVID-A3C98D01",
    accessedAt: reviewedAt,
    publicCitation: "Bounded review of seven delivered audio editions and a fifty-label print proof; evidence as of October 7, 2026.",
    supportsGenerally: ["seven edited recordings delivered", "fifty QR destinations checked", "thirteen proof pages inspected"],
    doesNotEstablish: ["client acceptance", "printing or installation", "payment", "exact audio edition published", "permission to reproduce recordings, participant information or correspondence"]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: "CLM-RECENT-WONDERVILLE-2026-10", project: "fair-rent-nyc",
    internalClaim: "Jamie delivered a production guide before the October 5 meeting; the later post-event record establishes occurrence, not execution of every planned cue.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", status: "active", citationRequired: false, surfaces: ["/work/fair-rent-nyc"],
      text: "NYC Artist Coalition held its October 5, 2026 meeting at Wonderville. Jamie prepared and sent a two-page production guide to the venue and fellow organizers. It set out the proposed room layout, equipment needs, timing and questions for venue staff. The venue answered technical questions before the gathering. Organizing and day-of delivery remained shared work." }],
    evidence: [{ sourceId: "SRC-RECENT-WONDERVILLE-REVIEW", relationship: "private-support", confidence: "high", renderCitation: false,
      supports: ["production guide delivered", "October 5 meeting occurred", "shared organizing and venue responsibilities"] }],
    boundaries: ["A sent production plan does not establish that every cue or setup was performed.", "This text-only summary excludes private correspondence, participant identities and the original production guide."],
    antiClaims: ["Jamie alone produced the event.", "The meeting adopted a bill or established attendance figures."],
    researchInquiryIds: [], reviewedAt, reviewedBy
  },
  {
    id: "CLM-RECENT-DCLA-ANIMATION-2026-10", project: "fair-rent-nyc",
    internalClaim: "The October 3 article observation records a published animation credited to Jamie for NYC Artist Coalition; publication is no longer merely planned.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"],
      text: "Jamie made a photo animation for NYC Artist Coalition about the city’s August 26, 2026 arts listening session at 651 ARTS. By October 3, an article written by Lin Tyrpien included the animation and credited Jamie’s contribution." }],
    evidence: [{ sourceId: "SRC-RECENT-DCLA-ARTICLE", relationship: "direct-support", confidence: "moderate", renderCitation: true,
      supports: ["published animation credit", "Lin's article authorship"] },
      { sourceId: "SRC-DCLA-REPAIR-REVIEW-2026-08-29", relationship: "private-support", confidence: "moderate", renderCitation: false,
        supports: ["event date and venue in upstream records"] }],
    boundaries: ["October 3 is the publication-observation date, not an independently established publication date.", "Linking the article does not authorize embedding or copying the animation or its underlying media.", "The current public page could not be reopened during the October 18 review; the dated observation remains the evidence."],
    antiClaims: ["Jamie authored Lin's article.", "Publication proves campaign reach or policy change."],
    researchInquiryIds: [], reviewedAt, reviewedBy
  },
  {
    id: "CLM-RECENT-RED-HOOK-2026-10", project: "red-hook-portrait-project",
    internalClaim: "Seven current edited recordings were delivered and a later fifty-label proof was checked; neither state establishes client acceptance or installation.",
    status: "confirmed-with-boundary",
    projections: [{ key: "technical-operations", status: "active", citationRequired: false, surfaces: ["/work/technical-operations"],
      text: "By October 7, 2026, Jamie had edited and delivered seven oral-history recordings for Rusty Zimmerman’s Red Hook portrait project. He kept current files separate from earlier edits so the handoff was clear. He also prepared a 50-label QR-code proof, checked that each QR code matched its intended destination, and inspected all 13 pages. This work covered audio delivery and print preparation, not exhibition installation." }],
    evidence: [{ sourceId: "SRC-RECENT-RED-HOOK-REVIEW", relationship: "private-support", confidence: "high", renderCitation: false,
      supports: ["seven edited recordings delivered", "fifty QR destinations checked", "thirteen proof pages inspected"] }],
    boundaries: ["Jamie explicitly approved a limited text-only summary naming Rusty and the project on October 18; recordings, participant names and private messages remain excluded.", "Delivery and proof checks do not establish client acceptance, payment, physical printing or installation.", "Public track titles do not establish which delivered audio edition was published."],
    antiClaims: ["Rusty approved the final proof.", "Jamie installed the exhibition.", "The seven exact delivered audio editions were published."],
    researchInquiryIds: [], reviewedAt, reviewedBy
  }
];

export const recentDeliveryContracts = [
  { claimId: "CLM-RECENT-WONDERVILLE-2026-10", eventDate: "2026-10-05", evidenceAsOf: "2026-10-07", recordedAt: reviewedAt,
    observedStates: ["delivered", "occurred"], publicStates: ["delivered", "occurred"], creditScope: "shared", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-RECENT-WONDERVILLE-REVIEW"] },
  { claimId: "CLM-RECENT-DCLA-ANIMATION-2026-10", eventDate: null, evidenceAsOf: "2026-10-03", recordedAt: reviewedAt,
    observedStates: ["published"], publicStates: ["published"], creditScope: "jamie-contribution", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-RECENT-DCLA-ARTICLE", "SRC-DCLA-REPAIR-REVIEW-2026-08-29"] },
  { claimId: "CLM-RECENT-RED-HOOK-2026-10", eventDate: null, evidenceAsOf: "2026-10-07", recordedAt: reviewedAt,
    observedStates: ["delivered", "proof-checked"], publicStates: ["delivered", "proof-checked"], creditScope: "jamie-contribution", publicationScope: "text-only",
    allowedSurfaces: ["/work/technical-operations"], sourceIds: ["SRC-RECENT-RED-HOOK-REVIEW"] }
];

const intakeItems: KnowledgeBank["intakeItems"] = [{
  id: "INTAKE-RECENT-DELIVERY-2026-10", kind: "analysis-note", title: "Recent work: bounded portfolio summaries",
  submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: ["fair-rent-nyc", "red-hook-portrait-project"],
  reason: "Replace planning-only accounts with supported delivered, occurred and published states while preserving separate rights and credit.",
  visibility: "public-safe", disposition: "integrated",
  sourceIds: sources.map((source) => source.id), observationIds: ["OBS-RECENT-WONDERVILLE", "OBS-RECENT-DCLA", "OBS-RECENT-RED-HOOK"],
  researchInquiryIds: [], boundaries: ["Three limited text summaries only. Protected evidence and third-party testimony stay outside the public repository."]
}];
const observations: KnowledgeBank["observations"] = [
  { id: "OBS-RECENT-WONDERVILLE", intakeId: "INTAKE-RECENT-DELIVERY-2026-10", sourceId: sources[0].id, project: "fair-rent-nyc", kind: "source-fact",
    text: "An October 4 production handoff and October 7 post-event return distinguish the plan from the October 5 gathering that occurred.", status: "corroborated", publicSafe: true,
    claimIds: [claims[0].id], comparisonSourceIds: [], researchInquiryIds: [], limitations: ["The later record does not verify every cue or participant outcome."] },
  { id: "OBS-RECENT-DCLA", intakeId: "INTAKE-RECENT-DELIVERY-2026-10", sourceId: sources[1].id, project: "fair-rent-nyc", kind: "source-fact",
    text: "An October 3 publication observation identifies the animation credit separately from the article's authorship.", status: "corroborated", publicSafe: true,
    claimIds: [claims[1].id], comparisonSourceIds: [], researchInquiryIds: [], limitations: ["No exact publication timestamp or media-byte comparison is established."] },
  { id: "OBS-RECENT-RED-HOOK", intakeId: "INTAKE-RECENT-DELIVERY-2026-10", sourceId: sources[2].id, project: "red-hook-portrait-project", kind: "source-fact",
    text: "October 7 delivery metadata and proof checks support separate audio-return and print-preparation states.", status: "corroborated", publicSafe: true,
    claimIds: [claims[2].id], comparisonSourceIds: [], researchInquiryIds: [], limitations: ["No client acceptance, physical installation, payment or exact public audio edition is established."] }
];

const entities: KnowledgeBank["entities"] = [
  { id: "ENT-WONDERVILLE-MEETING-2026-10", name: "October 2026 Wonderville coalition meeting", kind: "event", aliases: [], publicSafe: true },
  { id: "ENT-LISTENING-SESSION-ANIMATION-2026", name: "651 ARTS listening-session photo animation", kind: "project", aliases: [], publicSafe: true },
  { id: "ENT-RED-HOOK-PRODUCTION-HANDOFF-2026", name: "Red Hook portrait-project audio and print preparation", kind: "project", aliases: [], publicSafe: true }
];
const agencyRelations: KnowledgeBank["agencyRelations"] = [
  { id: "REL-RECENT-WONDERVILLE-HANDOFF", project: "fair-rent-nyc", actorIds: ["ENT-JAMIE-BURKART", "ENT-NYC-ARTIST-COALITION"], action: "organized", objectId: entities[0].id,
    purpose: "Make venue requirements, timing and open technical questions usable before the gathering.", result: "A production guide was delivered; the gathering occurred with shared organizing and venue responsibilities.",
    creditScope: "shared", status: "confirmed-with-boundary", claimIds: [claims[0].id], sourceIds: [sources[0].id], sourceSupportKeys: ["production guide delivered"], boundaries: claims[0].boundaries, reviewedAt, reviewedBy },
  { id: "REL-RECENT-DCLA-ANIMATION", project: "fair-rent-nyc", actorIds: ["ENT-JAMIE-BURKART"], action: "created", objectId: entities[1].id,
    purpose: "Bring field documentation from the listening session into public communication.", result: "The animation was credited to Jamie for the Coalition in Lin Tyrpien's article; the article is Lin's work.",
    creditScope: "individual", status: "confirmed-with-boundary", claimIds: [claims[1].id], sourceIds: [sources[1].id], sourceSupportKeys: ["published animation credit"], boundaries: claims[1].boundaries, reviewedAt, reviewedBy },
  { id: "REL-RECENT-RED-HOOK-HANDOFF", project: "red-hook-portrait-project", actorIds: ["ENT-JAMIE-BURKART"], action: "delivered", objectId: entities[2].id,
    purpose: "Keep current audio editions clear and match exhibition labels to the intended destinations.", result: "Seven edited recordings were delivered and a fifty-label proof was checked for Rusty Zimmerman's Red Hook portrait project.",
    creditScope: "individual", status: "confirmed-with-boundary", claimIds: [claims[2].id], sourceIds: [sources[2].id], sourceSupportKeys: ["seven edited recordings delivered", "fifty QR destinations checked"], boundaries: claims[2].boundaries, reviewedAt, reviewedBy }
];

export const recentDeliveryOctober2026 = { intakeItems, observations, sources, claims, entities, agencyRelations, researchInquiries: [] };
