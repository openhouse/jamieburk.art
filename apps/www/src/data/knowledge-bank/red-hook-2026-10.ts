import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const project = "red-hook-portraits";
const intakeId = "INTAKE-RED-HOOK-CONTRIBUTION-2026-10";
const sourceId = "SRC-RED-HOOK-JAMIE-CONFIRMATION-2026-10";
const photoInquiry = "INQ-RED-HOOK-PHOTO-PUBLIC-USE";
const audioClaim = "CLM-RED-HOOK-SEVEN-ORAL-HISTORIES";
const exhibitionClaim = "CLM-RED-HOOK-EXHIBITION-QR-SUPPORT";
const photoClaim = "CLM-RED-HOOK-PHOTO-AUTHORSHIP";
const surface = "/work/technical-operations";

// Contribution confirmation is not independent audit, media clearance or playback QA.
export const redHookReview = {
  reviewedAt,
  evidenceClass: "first-person-contribution-confirmation",
  supportLevel: "self-reported",
  audioRecordingCount: 7,
  exhibitionPortraitCount: 50,
  creditScope: "contributor",
  playbackVerified: false,
  photos: {
    photographer: "Jamie Burkart",
    authorshipConfirmed: true,
    artworkUseCleared: false,
    representedPeopleUseCleared: false,
    publicationAuthorized: false,
    publicDisplayStatus: "hold"
  }
};

const sources: KnowledgeBank["sources"] = [{
  id: sourceId,
  title: "Jamie Burkart's Red Hook contribution confirmation",
  author: "Jamie Burkart",
  kind: "research-run",
  visibility: "public-metadata-only",
  preservationStatus: "private",
  accessedAt: reviewedAt,
  publicCitation: "Jamie Burkart's first-person account of audio editing and exhibition support for the Free Portrait Project in Red Hook, reviewed October 2026.",
  publicNote: "A contribution account, not an independent audit of the exhibition or a grant of image-use rights.",
  supportsGenerally: ["seven oral histories edited", "help preparing printing and installing QR codes", "exhibition of 50 portraits", "Jamie's authorship of review photographs"],
  doesNotEstablish: ["sole exhibition production", "editing 50 recordings", "photograph publication permission", "verified QR playback", "audience outcomes"]
}];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-RED-HOOK-AUDIO-CONTRIBUTION", intakeId, sourceId, comparisonSourceIds: [], project,
    kind: "source-fact", status: "extracted", publicSafe: true,
    text: "Jamie confirms editing seven oral-history recordings to accompany painted portraits of their subjects.",
    claimIds: [audioClaim], researchInquiryIds: [],
    limitations: ["First-person confirmation does not establish sole editing responsibility for the project or a completed listening-path audit."]
  },
  {
    id: "OBS-RED-HOOK-QR-CONTRIBUTION", intakeId, sourceId, comparisonSourceIds: [], project,
    kind: "source-fact", status: "extracted", publicSafe: true,
    text: "Jamie confirms helping prepare, print and install QR codes for the exhibition.",
    claimIds: [exhibitionClaim], researchInquiryIds: [],
    limitations: ["Help is not sole production, label-design authorship, curatorial leadership or authorship of the portraits."]
  },
  {
    id: "OBS-RED-HOOK-EXHIBITION-SCOPE", intakeId, sourceId, comparisonSourceIds: [], project,
    kind: "source-fact", status: "extracted", publicSafe: true,
    text: "Jamie identifies the exhibition's scope as all 50 portraits.",
    claimIds: [exhibitionClaim], researchInquiryIds: [],
    limitations: ["The 50-portrait exhibition count is distinct from Jamie's seven-recording editing contribution."]
  },
  {
    id: "OBS-RED-HOOK-PHOTO-AUTHORSHIP", intakeId, sourceId, comparisonSourceIds: [], project,
    kind: "source-fact", status: "extracted", publicSafe: true,
    text: "Jamie confirms taking the photographs under review.",
    claimIds: [photoClaim], researchInquiryIds: [photoInquiry],
    limitations: ["Photographer identity does not clear artwork, represented-person or label use; no image is part of this text-only projection."]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: audioClaim, project,
    internalClaim: "Jamie reports editing seven oral-history recordings for Rusty Zimmerman's Free Portrait Project in Red Hook.",
    status: "confirmed-with-boundary",
    projections: [{ key: "technical-operations", text: "For Rusty Zimmerman's Free Portrait Project in Red Hook, I edited seven oral-history recordings to accompany painted portraits of their subjects.", status: "active", citationRequired: false, surfaces: [surface] }],
    evidence: [{ sourceId, relationship: "direct-support", supports: ["seven oral histories edited"], confidence: "moderate", renderCitation: false, publicNote: "First-person contribution confirmation; not independently audited." }],
    boundaries: ["Jamie is a contributor to a collaborative project, not the sole producer or sole audio editor of the exhibition.", "Seven edited recordings are not 50 recordings or 50 portraits authored by Jamie.", "No audience impact or playback verification is established."],
    antiClaims: ["Jamie edited all 50 oral histories.", "Jamie alone produced the exhibition."],
    researchInquiryIds: [], reviewedAt, reviewedBy: ["Jamie Burkart"]
  },
  {
    id: exhibitionClaim, project,
    internalClaim: "Jamie reports helping prepare, print and install QR codes for an exhibition of all 50 portraits.",
    status: "confirmed-with-boundary",
    projections: [{ key: "technical-operations", text: "I also helped prepare, print, and install QR codes for an exhibition of all 50 portraits.", status: "active", citationRequired: false, surfaces: [surface] }],
    evidence: [{ sourceId, relationship: "direct-support", supports: ["help preparing printing and installing QR codes", "exhibition of 50 portraits"], confidence: "moderate", renderCitation: false, publicNote: "First-person contribution confirmation; not independently audited." }],
    boundaries: ["The exhibition count is not a count of Jamie's edited recordings.", "Helping with production does not establish sole responsibility, QR design authorship, every code's playback result or exhibition leadership."],
    antiClaims: ["Jamie alone designed and installed every label.", "Every QR code was verified to play the correct recording."],
    researchInquiryIds: [], reviewedAt, reviewedBy: ["Jamie Burkart"]
  },
  {
    id: photoClaim, project,
    internalClaim: "Jamie confirms taking the review photographs; public image use remains unconfirmed.",
    status: "confirmed-with-boundary",
    projections: [{ key: "photo-caption", text: "Photograph by Jamie Burkart.", status: "hold", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId, relationship: "direct-support", supports: ["Jamie's authorship of review photographs"], confidence: "moderate", renderCitation: false }],
    boundaries: ["Authorship, a staging request and noindex settings are not artwork or represented-person clearance.", "No photograph, crop, identifier or image locator is released by this record."],
    antiClaims: ["Photographer confirmation clears all depicted material for publication."],
    researchInquiryIds: [photoInquiry], reviewedAt, reviewedBy: ["Jamie Burkart"]
  }
];

export const redHookKnowledge = {
  sources,
  observations,
  claims,
  intakeItems: [{
    id: intakeId, kind: "analysis-note", title: "Red Hook contribution and photo-authorship confirmation", submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart", projectIds: [project], reason: "Retain the first-person contribution with distinct recording and exhibition counts and separate media-use decisions.",
    visibility: "public-safe", disposition: "integrated", sourceIds: [sourceId], observationIds: observations.map(item => item.id), researchInquiryIds: [photoInquiry],
    boundaries: ["Only the two contribution claims are selected for a public text section; photo authorship remains a held projection."]
  }] satisfies KnowledgeBank["intakeItems"],
  researchInquiries: [{
    id: photoInquiry, project, question: "What exact artwork credit and image-use permissions cover the selected portfolio photographs?",
    methods: ["Obtain Jamie's explicit confirmation of the applicable artwork credit and existing permissions before selecting a public crop."],
    runAt: reviewedAt, resultStatus: "partially-recovered", findings: ["Jamie confirms photographer identity; public image-use clearance remains unresolved."],
    limitations: ["Authorship confirmation does not grant third-party rights or imply depicted-person consent."], sourceIds: [sourceId]
  }] satisfies KnowledgeBank["researchInquiries"],
  entities: [{ id: "ENT-RED-HOOK-PORTRAIT-EXHIBITION", name: "Free Portrait Project in Red Hook", kind: "project", aliases: [], publicSafe: true }] satisfies KnowledgeBank["entities"],
  agencyRelations: [
    { id: "REL-RED-HOOK-AUDIO-EDITING", project, actorIds: ["ENT-JAMIE-BURKART"], action: "edited", objectId: "ENT-RED-HOOK-PORTRAIT-EXHIBITION", purpose: "Prepare oral histories to accompany painted portraits.", result: "Jamie reports editing seven oral-history recordings.", creditScope: "shared", status: "confirmed-with-boundary", claimIds: [audioClaim], sourceIds: [sourceId], sourceSupportKeys: ["seven oral histories edited"], boundaries: claims[0].boundaries, reviewedAt, reviewedBy: ["Jamie Burkart"] },
    { id: "REL-RED-HOOK-QR-SUPPORT", project, actorIds: ["ENT-JAMIE-BURKART"], action: "helped-produce", objectId: "ENT-RED-HOOK-PORTRAIT-EXHIBITION", purpose: "Prepare QR-code materials for the exhibition.", result: "Jamie reports help preparing, printing and installing QR codes for the 50-portrait exhibition.", creditScope: "shared", status: "confirmed-with-boundary", claimIds: [exhibitionClaim], sourceIds: [sourceId], sourceSupportKeys: ["help preparing printing and installing QR codes", "exhibition of 50 portraits"], boundaries: claims[1].boundaries, reviewedAt, reviewedBy: ["Jamie Burkart"] }
  ] satisfies KnowledgeBank["agencyRelations"]
};
