import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-10-18";
const surface = "/work/technical-operations";
const commonBoundaries = [
  "Approved anonymous first-person account, not independent verification.",
  "Publication scope is the approved text only, not identities, quotations, media or underlying records."
];

// The public source is the approved account itself. It contains no link or
// identifier that gives access to underlying correspondence or media.
const cases = [
  {
    key: "WRITTEN-PARTICIPATION",
    project: "written-participation",
    title: "Making room for written participation",
    text: "For an artist-coalition gathering, I brought the venue host and a co-organizer into one booking thread and prepared the venue's production sheet. I also worked on a written activity about places participants wanted to protect. Feedback about board legibility and the difficulty of taking notes live informed the proposed design. The gathering used activity sheets and a shared board, with handwritten responses on both. These materials gave the conversation a written record of places, concerns and suggestions for later review.",
    supports: ["Jamie's venue coordination and production preparation", "Shared written participation and its bounded record"],
    observations: [
      "Jamie brought the venue host and a co-organizer into one booking thread and prepared the venue's production sheet.",
      "Jamie worked on a written activity; feedback about legibility and live note-taking informed the proposed design.",
      "The account describes activity sheets and a shared board with handwritten responses, retaining places, concerns and suggestions for later review."
    ],
    boundaries: [
      "Preparation does not establish on-time delivery, host approval or use of every proposed cue.",
      "Written responses do not verify every proposed safeguard, exact print-master identity or a complete participant tally.",
      "Exact form edition and a completed return to members are not established.",
      "Shared participation does not establish Jamie's sole authorship, a vote, consensus or policy adoption."
    ],
    antiClaims: ["Jamie solely authored the gathering or participant contributions.", "Every proposed safeguard was implemented.", "A complete participant-approved feedback loop or policy vote was established."],
    question: "What can the approved account establish about written participation rather than only a proposed event plan?",
    findings: ["The approved account distinguishes Jamie's preparation, feedback on a proposed design and written responses on physical instruments.", "It is one organizing project, not separate booking, card and board projects."],
    publicSummary: "Written participation is described in the approved first-person account; exact tool editions, particular safeguards and a completed member return remain unverified."
  },
  {
    key: "EDITORIAL-ANIMATION",
    project: "editorial-animation",
    title: "Editing for a specific audience",
    text: "I worked with an editor to focus a coalition animation on the arts gathering her article covered. We separated that brief from the broader coalition story, and I delivered revised square and vertical cuts for review. The project reached two public surfaces: the article included an animation credited to me for the coalition, and an Instagram collaboration post linked readers to the article. The work connected editorial direction, media production and publication while keeping the writer's authorship and the coalition's contribution visible.",
    supports: ["Jamie's editorial scoping and revised media delivery", "Writer authorship and coalition contribution across two publication surfaces"],
    observations: [
      "Jamie worked with an editor to separate an article-focused animation brief from a broader coalition story.",
      "Jamie delivered revised square and vertical cuts for review.",
      "The account describes an article animation credited to Jamie for the coalition and a linked Instagram collaboration post, preserving writer authorship and coalition contribution."
    ],
    boundaries: [
      "The connected project records do not establish a verified binary match between delivered exports, the article embed and the collaboration post.",
      "Full playback, paid commission, an institutional client relationship, agency endorsement and audience impact are not established.",
      "Two publication surfaces remain one project, not independent projects or a reach metric.",
      "Shared work does not establish Jamie's sole authorship of the article, gathering or coalition contribution."
    ],
    antiClaims: ["Publication proves a paid commission or an institutional client relationship.", "The delivered exports are verified as the exact published files.", "Two surfaces establish audience reach, agency endorsement or two separate projects."],
    question: "What does the approved account establish about editorial direction, delivery and publication without conflating them?",
    findings: ["The approved account connects a scoped brief, revised cuts and two public surfaces at project level.", "Writer authorship and coalition contribution remain distinct from Jamie's media work."],
    publicSummary: "The account describes one editorial media project across two surfaces; file identity, audience impact and institutional client or endorsement claims are not established."
  }
];

const sources: KnowledgeBank["sources"] = cases.map((item) => ({
  id: `SRC-${item.key}-APPROVED-ACCOUNT-2026`,
  title: `Approved first-person account: ${item.title}`,
  author: "Jamie Burkart",
  kind: "project-archive",
  visibility: "public",
  preservationStatus: "live",
  publishedAt: reviewedAt,
  accessedAt: reviewedAt,
  publicCitation: `Jamie Burkart, approved anonymous first-person account, ${item.title}, October 18, 2026.`,
  publicNote: "This approved first-person account is not independent verification. It is the public summary; underlying correspondence, documents, identities and media are not published here.",
  supportsGenerally: item.supports,
  doesNotEstablish: [...commonBoundaries, ...item.boundaries]
}));

const intakeItems: KnowledgeBank["intakeItems"] = cases.map((item) => ({
  id: `INTAKE-${item.key}-APPROVED-ACCOUNT-2026`,
  kind: "memory-lead",
  title: `Approved anonymous account: ${item.title}`,
  submittedAt: reviewedAt,
  submittedBy: "Jamie Burkart",
  projectIds: [item.project],
  reason: "Represent one recent project through the exact approved account, with individual contribution and shared credit kept distinct.",
  visibility: "public-safe",
  disposition: "integrated",
  sourceIds: [`SRC-${item.key}-APPROVED-ACCOUNT-2026`],
  observationIds: item.observations.map((_, index) => `OBS-${item.key}-${index + 1}-2026`),
  researchInquiryIds: [`INQ-${item.key}-USE-2026`],
  boundaries: [...commonBoundaries, ...item.boundaries]
}));

const observations: KnowledgeBank["observations"] = cases.flatMap((item) => item.observations.map((text, index) => ({
  id: `OBS-${item.key}-${index + 1}-2026`,
  intakeId: `INTAKE-${item.key}-APPROVED-ACCOUNT-2026`,
  sourceId: `SRC-${item.key}-APPROVED-ACCOUNT-2026`,
  comparisonSourceIds: [],
  project: item.project,
  kind: "participant-memory",
  text,
  status: "extracted",
  publicSafe: true,
  claimIds: [`CLM-${item.key}-2026`],
  researchInquiryIds: [`INQ-${item.key}-USE-2026`],
  limitations: [...commonBoundaries, ...item.boundaries]
})));

const claims: KnowledgeBank["claims"] = cases.map((item) => ({
  id: `CLM-${item.key}-2026`,
  project: item.project,
  internalClaim: item.text,
  status: "confirmed-with-boundary",
  projections: [{ key: "case-study", text: item.text, status: "active", citationRequired: true, surfaces: [surface] }],
  evidence: [{
    sourceId: `SRC-${item.key}-APPROVED-ACCOUNT-2026`,
    relationship: "direct-support",
    supports: item.supports,
    publicNote: "Approved first-person account; not independent verification.",
    confidence: "moderate",
    renderCitation: true
  }],
  boundaries: [...commonBoundaries, ...item.boundaries],
  antiClaims: item.antiClaims,
  researchInquiryIds: [`INQ-${item.key}-USE-2026`],
  reviewedAt,
  reviewedBy: ["Jamie Burkart, exact anonymous text approval"]
}));

const researchInquiries: KnowledgeBank["researchInquiries"] = cases.map((item) => ({
  id: `INQ-${item.key}-USE-2026`,
  project: item.project,
  question: item.question,
  methods: ["Review the approved first-person account, keeping preparation, use and unverified outcomes distinct."],
  runAt: reviewedAt,
  resultStatus: "partially-recovered",
  findings: item.findings,
  limitations: [...commonBoundaries, ...item.boundaries],
  sourceIds: [`SRC-${item.key}-APPROVED-ACCOUNT-2026`],
  publicSummary: item.publicSummary
}));

const citationOccurrences: KnowledgeBank["pages"][number]["occurrences"] = cases.map((item) => ({
  id: item.project,
  claimId: `CLM-${item.key}-2026`,
  projection: "case-study",
  sourceIds: [`SRC-${item.key}-APPROVED-ACCOUNT-2026`]
}));

export const currentPracticeCasesOctober2026 = {
  intakeItems, observations, sources, claims, researchInquiries, citationOccurrences
};
