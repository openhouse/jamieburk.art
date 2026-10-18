import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const sourceId = "SRC-AUDIO-PRINT-APPROVED-ACCOUNT-2026";
const intakeId = "INTAKE-AUDIO-PRINT-APPROVED-ACCOUNT-2026";
const inquiryId = "INQ-AUDIO-PRINT-PHYSICAL-USE-2026";
const surface = "/work/technical-operations";

// Only the approved anonymous account enters this public module. Underlying
// correspondence, documents, identities, photographs and locators stay out.
const paragraphs = [
  {
    id: "CLM-AUDIO-PRINT-EDITIONS-2026",
    occurrence: "audio-editions",
    text: "For a portrait exhibition, I organized current audio editions for seven recorded sittings, keeping current files distinct from earlier versions. When the label proof contained unresolved identities and destinations, I asked three specific questions and incorporated the artist’s replies into a revised proof.",
    support: "Jamie's audio-edition organization and clarification work"
  },
  {
    id: "CLM-AUDIO-PRINT-PHYSICAL-USE-2026",
    occurrence: "print-production",
    text: "I then standardized the label layout so each sheet could be cut using the same measurements, preserving fifty label-to-audio links. On October 8, I printed and brought that version to the installation. Those labels were attached beneath the portraits. The work connected client clarification, versioned files and practical production support.",
    support: "Jamie's retrospective confirmation of printing, bringing and physical use"
  },
  {
    id: "CLM-AUDIO-PRINT-SHARED-CREDIT-2026",
    occurrence: "shared-credit",
    text: "The artist led the portrait project and supplied its identities, links and panel materials. My contribution was audio editing, delivery organization and print preparation, with tools assisting preparation and checking.",
    support: "Artist leadership and Jamie's bounded production contribution"
  }
];

const boundaries = [
  "Approved anonymous first-person account, not independent verification.",
  "Physical use was retrospectively confirmed by Jamie; it does not establish who attached the labels or that all fifty were installed.",
  "No claim of visitor use, live link performance or final client acceptance.",
  "Publication scope is this text only, not names, photographs or underlying records."
];

const sources: KnowledgeBank["sources"] = [{
  id: sourceId,
  title: "Approved first-person account of audio and print production",
  author: "Jamie Burkart",
  kind: "project-archive",
  visibility: "public",
  preservationStatus: "live",
  publishedAt: reviewedAt,
  accessedAt: reviewedAt,
  publicCitation: "Jamie Burkart, approved anonymous first-person account, October 18, 2026.",
  publicNote: "This first-person account is the approved public summary, not an independently audited record. Printing, bringing and physical use of the described labels were retrospectively confirmed by Jamie. No underlying correspondence, documents or photographs are published here.",
  supportsGenerally: paragraphs.map((paragraph) => paragraph.support),
  doesNotEstablish: [
    "an independent physical-use audit",
    "who attached the labels or that all fifty were installed",
    "visitor use, live link performance or final client acceptance",
    "permission to publish names or photographs"
  ]
}];

const intakeItems: KnowledgeBank["intakeItems"] = [{
  id: intakeId,
  kind: "memory-lead",
  title: "Approved anonymous account of audio and print production",
  submittedAt: reviewedAt,
  submittedBy: "Jamie Burkart",
  projectIds: ["audio-print-production"],
  reason: "Represent a recent production sequence with explicit individual and shared credit, using only the approved text.",
  visibility: "public-safe",
  disposition: "integrated",
  sourceIds: [sourceId],
  observationIds: paragraphs.map((paragraph) => paragraph.id.replace("CLM-", "OBS-")),
  researchInquiryIds: [inquiryId],
  boundaries
}];

const observations: KnowledgeBank["observations"] = paragraphs.map((paragraph) => ({
  id: paragraph.id.replace("CLM-", "OBS-"),
  intakeId,
  sourceId,
  comparisonSourceIds: [],
  project: "audio-print-production",
  kind: "participant-memory",
  text: paragraph.text,
  status: "extracted",
  publicSafe: true,
  claimIds: [paragraph.id],
  researchInquiryIds: [inquiryId],
  limitations: boundaries
}));

const claims: KnowledgeBank["claims"] = paragraphs.map((paragraph) => ({
  id: paragraph.id,
  project: "audio-print-production",
  internalClaim: paragraph.text,
  status: "confirmed-with-boundary",
  projections: [{ key: "case-study", text: paragraph.text, status: "active", citationRequired: true, surfaces: [surface] }],
  evidence: [{
    sourceId,
    relationship: "direct-support",
    supports: [paragraph.support],
    publicNote: "Approved first-person account; not independent verification.",
    confidence: "moderate",
    renderCitation: true
  }],
  boundaries,
  antiClaims: ["Jamie solely authored or led the portrait project.", "All fifty labels were independently verified as installed.", "The account authorizes publication of names or photographs."],
  researchInquiryIds: [inquiryId],
  reviewedAt,
  reviewedBy: ["Jamie Burkart, exact anonymous text approval"]
}));

const researchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: inquiryId,
  project: "audio-print-production",
  question: "Was the described uniform-cutting label edition printed, brought and used at the installation?",
  methods: ["Ask Jamie an explicit retrospective question about the described edition and its physical use."],
  runAt: reviewedAt,
  resultStatus: "partially-recovered",
  findings: ["Jamie confirmed printing and bringing the described edition on October 8 and that those labels were attached beneath the portraits."],
  limitations: ["A first-person confirmation is not an independent physical-use audit.", "Installer identity, a complete installed-label count, visitor use and final client acceptance are not established."],
  sourceIds: [sourceId],
  publicSummary: "Physical use is attributed to Jamie's retrospective confirmation; finer installation and audience outcomes remain unverified."
}];

const pages: KnowledgeBank["pages"] = [{
  id: "technical-operations",
  surface,
  sourceOrder: [sourceId],
  occurrences: paragraphs.map((paragraph) => ({ id: paragraph.occurrence, claimId: paragraph.id, projection: "case-study", sourceIds: [sourceId] }))
}];

export const audioPrintProductionOctober2026 = { intakeItems, observations, sources, claims, researchInquiries, pages };
