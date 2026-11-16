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
  },
  {
    id: "SRC-DCLA-INSTAGRAM-REEL-2026-10",
    title: "651 ARTS listening-session photo animation on Instagram",
    organization: "NYC Artist Coalition", kind: "institutional-social-post",
    visibility: "public", preservationStatus: "live", accessedAt: reviewedAt,
    publishedAt: "2026-10-07",
    canonicalUrl: "https://www.instagram.com/reel/DeNAv1HhOxC/", preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, listening-session photo animation; Instagram metadata reports October 7, 2026; inspected October 18, 2026.",
    publicNote: "A downloaded 30-second edition was inspected through sampled frames and container metadata. The caption points to Lin Tyrpien's article. The post date is platform-reported; the earlier article observation remains a separate source.",
    supportsGenerally: ["direct published reel destination", "30-second Instagram edition", "visible text about cultural space and accountability", "visible campaign message"],
    doesNotEstablish: ["identity with the article's embedded media bytes", "earliest publication date of the animation", "verified spoken transcript or music credit", "policy adoption or institutional endorsement", "permission to embed or rehost media"],
    media: { mediaKind: "other", rightsStatus: "permission-needed", consentStatus: "review-needed", publicDisplayStatus: "metadata-only" }
  },
  {
    id: "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10",
    title: "Instagram collaborator display for the listening-session reel",
    kind: "institutional-social-post", visibility: "public", preservationStatus: "live",
    accessedAt: reviewedAt, canonicalUrl: "https://www.instagram.com/reel/DeNAv1HhOxC/", preferredPublicUrl: "canonical",
    publicCitation: "Collaborator display for the NYC Artist Coalition reel, observed in a Jamie-supplied screenshot reviewed October 18, 2026; screenshot capture date unknown.",
    publicNote: "The screenshot lists six accounts. The roster was not independently extracted by the video downloader and is not a current membership or institutional-endorsement claim.",
    supportsGenerally: ["platform-listed collaborators"],
    doesNotEstablish: ["equal creative authorship", "a DCLA commission", "policy endorsement", "event-production responsibility", "current collaborator roster", "permission to reproduce screenshots or underlying media"]
  },
  {
    id: "SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18",
    title: "Jamie's assessment of the listening-session recap", author: "Jamie Burkart",
    kind: "research-run", visibility: "protected", preservationStatus: "private",
    protectedLocatorId: "EVID-DCLA-OUTCOME-20261018", accessedAt: reviewedAt,
    publicCitation: "Jamie Burkart's assessment of the recap's purpose and outcome, October 18, 2026; bounded text summary authorized.",
    supportsGenerally: ["creator assessment of campaign-message circulation"],
    doesNotEstablish: ["institutional policy endorsement", "formal partnership or commission", "measured audience reach", "legislative results", "permission to reproduce correspondence or media"]
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
      text: "Jamie created a photo-animation recap of the city’s August 26, 2026 arts listening session at 651 ARTS for NYC Artist Coalition. By October 3, Lin Tyrpien’s article included the animation and credited Jamie. The 30-second Instagram edition pairs event photographs with participants’ requests about cultural space and accountability." }],
    evidence: [{ sourceId: "SRC-RECENT-DCLA-ARTICLE", relationship: "direct-support", confidence: "moderate", renderCitation: true,
      supports: ["published animation credit", "Lin's article authorship"] },
      { sourceId: "SRC-DCLA-REPAIR-REVIEW-2026-08-29", relationship: "private-support", confidence: "moderate", renderCitation: false,
        supports: ["event date and venue in upstream records"] },
      { sourceId: "SRC-DCLA-INSTAGRAM-REEL-2026-10", relationship: "direct-support", confidence: "high", renderCitation: true,
        supports: ["direct published reel destination", "30-second Instagram edition", "visible text about cultural space and accountability"] }],
    boundaries: ["October 3 is the article publication-observation date, not an independently established publication date.", "October 7 is the Instagram metadata's post date, not the first publication date of the animation or proof of identical media editions.", "Linking the article or reel does not authorize embedding or copying the animation or its underlying media.", "The article could not be reopened during the October 18 review; its dated observation remains the evidence. The reel was downloaded separately that day."],
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
  },
  {
    id: "CLM-DCLA-REEL-COLLABORATORS-2026", project: "fair-rent-nyc",
    internalClaim: "A supplied screenshot records six accounts listed as collaborators on this specific Instagram post; it does not allocate creative labor or institutional authority.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"],
      text: "The recap became a public Instagram collaboration. The post lists NYC Department of Cultural Affairs (DCLA), Brooklyn Arts Council, 651 ARTS, Lin Tyrpien, NYC Artist Coalition and Jamie as collaborators." }],
    evidence: [{ sourceId: "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10", relationship: "direct-support", confidence: "moderate", renderCitation: true,
      supports: ["platform-listed collaborators"] }],
    boundaries: ["Platform listing is not equal creative authorship, commissioning, endorsement or event-production authority.", "Screenshot capture date is unknown; October 18 is the review date.", "Names and handles come from the collaborator display, not face recognition.", "Jamie authorized this bounded text projection of the public collaboration; no blanket policy endorsement is asserted."],
    antiClaims: ["DCLA commissioned Jamie's film.", "All listed accounts endorse commercial rent stabilization.", "The six collaborators co-created every element of the film."],
    researchInquiryIds: [], reviewedAt, reviewedBy
  },
  {
    id: "CLM-DCLA-RECAP-STRATEGIC-OUTCOME-2026", project: "fair-rent-nyc",
    internalClaim: "Jamie identifies adoption and shared public collaboration carrying the campaign message as the recap's success; this is his attributed assessment, supported by the visible message and separately documented collaborator roster.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"],
      text: "For Jamie, the success was a shared recap that carried Fair Rent NYC’s call for commercial rent stabilization. It made the coalition and his contribution publicly visible alongside the participating institutions. Collaboration on the recap does not establish institutional endorsement of the campaign’s legislative agenda." }],
    evidence: [
      { sourceId: "SRC-DCLA-INSTAGRAM-REEL-2026-10", relationship: "direct-support", confidence: "high", renderCitation: true, supports: ["visible campaign message"] },
      { sourceId: "SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18", relationship: "private-support", confidence: "high", renderCitation: false, supports: ["creator assessment of campaign-message circulation"] }
    ],
    boundaries: ["Success is Jamie's explicitly attributed assessment, not an independent impact evaluation.", "The visible rent-stabilization message and shared publication do not establish institutional endorsement, policy adoption, measured reach or a formal partnership.", "Text-only summary authorized; participant statements, photographs, audio and screenshots are not newly licensed for reuse."],
    antiClaims: ["DCLA endorsed Fair Rent NYC's legislative agenda.", "The recap caused a policy change.", "View counters prove campaign impact."],
    researchInquiryIds: [], reviewedAt, reviewedBy
  }
];

export const recentDeliveryContracts = [
  { claimId: "CLM-RECENT-WONDERVILLE-2026-10", eventDate: "2026-10-05", evidenceAsOf: "2026-10-07", recordedAt: reviewedAt,
    observedStates: ["delivered", "occurred"], publicStates: ["delivered", "occurred"], creditScope: "shared", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-RECENT-WONDERVILLE-REVIEW"] },
  { claimId: "CLM-RECENT-DCLA-ANIMATION-2026-10", eventDate: null, evidenceAsOf: reviewedAt, recordedAt: reviewedAt,
    observedStates: ["published"], publicStates: ["published"], creditScope: "jamie-contribution", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-RECENT-DCLA-ARTICLE", "SRC-DCLA-REPAIR-REVIEW-2026-08-29", "SRC-DCLA-INSTAGRAM-REEL-2026-10"] },
  { claimId: "CLM-RECENT-RED-HOOK-2026-10", eventDate: null, evidenceAsOf: "2026-10-07", recordedAt: reviewedAt,
    observedStates: ["delivered", "proof-checked"], publicStates: ["delivered", "proof-checked"], creditScope: "jamie-contribution", publicationScope: "text-only",
    allowedSurfaces: ["/work/technical-operations"], sourceIds: ["SRC-RECENT-RED-HOOK-REVIEW"] },
  { claimId: "CLM-DCLA-REEL-COLLABORATORS-2026", eventDate: null, evidenceAsOf: reviewedAt, recordedAt: reviewedAt,
    observedStates: ["published"], publicStates: ["published"], creditScope: "shared", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10"],
    platformCollaboration: { sourceId: "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10", relationId: "REL-DCLA-REEL-LISTED-COLLABORATORS",
      actorIds: ["ENT-651-ARTS", "ENT-NYC-DCLA", "ENT-BROOKLYN-ARTS-COUNCIL", "ENT-LIN-TYRPIEN", "ENT-JAMIE-BURKART", "ENT-NYC-ARTIST-COALITION"],
      objectId: "ENT-DCLA-INSTAGRAM-REEL-2026" } },
  { claimId: "CLM-DCLA-RECAP-STRATEGIC-OUTCOME-2026", eventDate: null, evidenceAsOf: reviewedAt, recordedAt: reviewedAt,
    observedStates: ["published"], publicStates: ["published"], creditScope: "jamie-contribution", publicationScope: "text-only",
    allowedSurfaces: ["/work/fair-rent-nyc"], sourceIds: ["SRC-DCLA-INSTAGRAM-REEL-2026-10", "SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18"],
    campaignMessageOutcome: { artifactSourceId: "SRC-DCLA-INSTAGRAM-REEL-2026-10", assessmentSourceId: "SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18", creatorId: "ENT-JAMIE-BURKART" } }
];

const intakeItems: KnowledgeBank["intakeItems"] = [{
  id: "INTAKE-RECENT-DELIVERY-2026-10", kind: "analysis-note", title: "Recent work: bounded portfolio summaries",
  submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: ["fair-rent-nyc", "red-hook-portrait-project"],
  reason: "Replace planning-only accounts with supported delivered, occurred and published states while preserving separate rights and credit.",
  visibility: "public-safe", disposition: "integrated",
  sourceIds: sources.slice(0, 3).map((source) => source.id), observationIds: ["OBS-RECENT-WONDERVILLE", "OBS-RECENT-DCLA", "OBS-RECENT-RED-HOOK"],
  researchInquiryIds: [], boundaries: ["Three limited text summaries only. Protected evidence and third-party testimony stay outside the public repository."]
}, {
  id: "INTAKE-DCLA-REEL-RETURN-2026-10-18", kind: "public-url", title: "Published DCLA animation: direct reel and collaborator display",
  submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: ["fair-rent-nyc"],
  sourceUrl: "https://www.instagram.com/reel/DeNAv1HhOxC/", reason: "Add a direct published artifact destination and bounded platform relationships to the existing animation record.",
  visibility: "public-safe", disposition: "integrated", sourceIds: ["SRC-DCLA-INSTAGRAM-REEL-2026-10", "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10"],
  observationIds: ["OBS-DCLA-REEL-EDITION", "OBS-DCLA-REEL-LISTED-COLLABORATORS"], researchInquiryIds: [],
  boundaries: ["Outbound link and text only; no media or screenshots copied to the site.", "Engagement counters are excluded from portfolio claims.", "The user authorized this bounded update after review; publication on Instagram does not itself confer reuse rights."]
}, {
  id: "INTAKE-DCLA-OUTCOME-CORRECTION-2026-10-18", kind: "analysis-note", title: "Creator clarification: adoption and public collaboration",
  submittedAt: reviewedAt, submittedBy: "Jamie Burkart", projectIds: ["fair-rent-nyc"],
  reason: "Correct an output-only account by retaining observed public collaboration and Jamie's account of its campaign purpose.",
  visibility: "public-safe", disposition: "integrated",
  sourceIds: ["SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18", "SRC-DCLA-INSTAGRAM-REEL-2026-10", "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10"],
  observationIds: ["OBS-DCLA-RECAP-STRATEGIC-OUTCOME"], researchInquiryIds: [],
  boundaries: ["Approved bounded text only; preserve first-person assessment separately from institutional positions and measured impact."]
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
    claimIds: [claims[2].id], comparisonSourceIds: [], researchInquiryIds: [], limitations: ["No client acceptance, physical installation, payment or exact public audio edition is established."] },
  { id: "OBS-DCLA-REEL-EDITION", intakeId: "INTAKE-DCLA-REEL-RETURN-2026-10-18", sourceId: "SRC-DCLA-INSTAGRAM-REEL-2026-10", project: "fair-rent-nyc", kind: "visual-observation",
    text: "The downloaded reel is 30 seconds, 1080 by 1920 pixels. Sampled frames across the sequence pair event photographs with requests concerning cultural space and accountability, followed by text acknowledging accountability and naming subjects for further conversation. Metadata reports October 7, 2026 at 18:36:55 UTC for this post.",
    locator: "Downloaded edition; sampled frames at two-second intervals and every second from 20 through 29 seconds; caption and container metadata.",
    status: "verified", publicSafe: true, claimIds: ["CLM-RECENT-DCLA-ANIMATION-2026-10"], comparisonSourceIds: ["SRC-RECENT-DCLA-ARTICLE"], researchInquiryIds: [],
    limitations: ["Visual sampling is not a full auditory review or certification of spoken quotations.", "The short caption does not supply complete photo, voice or music credits.", "No byte identity with the article's embedded version is established."] },
  { id: "OBS-DCLA-REEL-LISTED-COLLABORATORS", intakeId: "INTAKE-DCLA-REEL-RETURN-2026-10-18", sourceId: "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10", project: "fair-rent-nyc", kind: "visual-observation",
    text: "The supplied Collaborators sheet lists 651arts, nyculture, bkartscouncil, lin.tyrpien, jamieburkart and nycartc. Four other supplied screenshots show the reel and on-screen text; their counters are not used as outcome evidence.",
    locator: "User-supplied fifth screenshot, Collaborators sheet; other four screenshots provide visual context.",
    status: "extracted", publicSafe: true, claimIds: ["CLM-DCLA-REEL-COLLABORATORS-2026"], comparisonSourceIds: ["SRC-DCLA-INSTAGRAM-REEL-2026-10"], researchInquiryIds: [],
    limitations: ["Capture date unknown; roster not independently extracted by yt-dlp.", "Platform collaboration does not establish authorship allocation, commissioning, policy agreement or current account status."] },
  { id: "OBS-DCLA-RECAP-STRATEGIC-OUTCOME", intakeId: "INTAKE-DCLA-OUTCOME-CORRECTION-2026-10-18", sourceId: "SRC-DCLA-CREATOR-ASSESSMENT-2026-10-18", project: "fair-rent-nyc", kind: "participant-memory",
    text: "Jamie identifies adoption of the recap, public collaboration with the named organizations and journalist, and circulation of the commercial rent stabilization message as his criteria for success.",
    status: "captured", publicSafe: true, claimIds: ["CLM-DCLA-RECAP-STRATEGIC-OUTCOME-2026"], comparisonSourceIds: ["SRC-DCLA-INSTAGRAM-REEL-2026-10", "SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10"], researchInquiryIds: [],
    limitations: ["A creator's assessment is not independent evidence of collaborator motivations, institutional policy positions, quantified reach or legislative effect."] }
];

const entities: KnowledgeBank["entities"] = [
  { id: "ENT-WONDERVILLE-MEETING-2026-10", name: "October 2026 Wonderville coalition meeting", kind: "event", aliases: [], publicSafe: true },
  { id: "ENT-LISTENING-SESSION-ANIMATION-2026", name: "651 ARTS listening-session photo animation", kind: "project", aliases: [], publicSafe: true },
  { id: "ENT-RED-HOOK-PRODUCTION-HANDOFF-2026", name: "Red Hook portrait-project audio and print preparation", kind: "project", aliases: [], publicSafe: true },
  { id: "ENT-DCLA-INSTAGRAM-REEL-2026", name: "Published Instagram edition of the listening-session animation", kind: "project", aliases: ["DeNAv1HhOxC"], publicSafe: true },
  { id: "ENT-651-ARTS", name: "651 ARTS", kind: "organization", aliases: ["651arts"], publicSafe: true },
  { id: "ENT-BROOKLYN-ARTS-COUNCIL", name: "Brooklyn Arts Council", kind: "organization", aliases: ["bkartscouncil"], publicSafe: true },
  { id: "ENT-LIN-TYRPIEN", name: "Lin Tyrpien", kind: "person", aliases: ["lin.tyrpien"], publicSafe: true }
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
    creditScope: "individual", status: "confirmed-with-boundary", claimIds: [claims[2].id], sourceIds: [sources[2].id], sourceSupportKeys: ["seven edited recordings delivered", "fifty QR destinations checked"], boundaries: claims[2].boundaries, reviewedAt, reviewedBy },
  { id: "REL-DCLA-REEL-LISTED-COLLABORATORS", project: "fair-rent-nyc",
    actorIds: ["ENT-651-ARTS", "ENT-NYC-DCLA", "ENT-BROOKLYN-ARTS-COUNCIL", "ENT-LIN-TYRPIEN", "ENT-JAMIE-BURKART", "ENT-NYC-ARTIST-COALITION"],
    action: "listed-as-post-collaborator", objectId: "ENT-DCLA-INSTAGRAM-REEL-2026",
    purpose: "Record the platform's displayed publication relationship without assigning creative labor or institutional approval.",
    result: "Six accounts are listed on the supplied collaborator display for this reel edition of the listening-session animation.",
    creditScope: "shared", status: "confirmed-with-boundary", claimIds: ["CLM-DCLA-REEL-COLLABORATORS-2026"], sourceIds: ["SRC-DCLA-REEL-COLLABORATOR-DISPLAY-2026-10"],
    sourceSupportKeys: ["platform-listed collaborators"], boundaries: claims[3].boundaries, reviewedAt, reviewedBy }
];

export const recentDeliveryOctober2026 = { intakeItems, observations, sources, claims, entities, agencyRelations, researchInquiries: [] };
