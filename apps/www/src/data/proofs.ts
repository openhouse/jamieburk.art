export type ProofStatus = "ready" | "use-with-care" | "open" | "protected" | "do-not-publish";

export type ProofLevel =
  | "core-public-claim"
  | "proof-strip-claim"
  | "case-study-claim"
  | "technical-operations-claim"
  | "lab-claim"
  | "resume-support-claim";

export type ProofClaim = {
  id: string;
  status: ProofStatus;
  level: ProofLevel;
  publicWording: string;
  sourceClass: string;
  supportLevel: string;
  allowedSurfaces: string[];
  guardrail: string;
  relatedCapabilities: string[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "CORE-001",
    status: "ready",
    level: "core-public-claim",
    publicWording:
      "Jamie Burkart is a Technical Project Manager - Product Operations & Implementation lead who builds operating structure for complex public-facing teams.",
    sourceClass: "approved-resume; public-safe-summary",
    supportLevel: "strong",
    allowedSurfaces: ["homepage", "metadata", "resume-page", "work-index", "technical-operations"],
    guardrail:
      "Use as role framing. Do not make the reader decode Jamie through archive, art, or AI language before the professional category is clear.",
    relatedCapabilities: ["technical operations", "product operations", "implementation"]
  },
  {
    id: "CORE-002",
    status: "ready",
    level: "core-public-claim",
    publicWording:
      "Jamie turns under-structured work into usable systems: requirements, workflows, documentation, decision trails, launch support, onboarding, and durable handoffs.",
    sourceClass: "approved-resume; public-safe-summary",
    supportLevel: "strong",
    allowedSurfaces: ["homepage", "work-index", "technical-operations", "metadata"],
    guardrail:
      "Keep examples nearby so the line reads as a demonstrated pattern, not an abstract slogan.",
    relatedCapabilities: ["requirements", "workflows", "handoffs", "documentation architecture"]
  },
  {
    id: "CORE-003",
    status: "ready",
    level: "proof-strip-claim",
    publicWording:
      "14+ years creating operating structure across civic, cultural, small-business, and public-facing technical environments",
    sourceClass: "approved-resume; public-safe-summary",
    supportLevel: "strong",
    allowedSurfaces: ["homepage", "resume-page", "technical-operations"],
    guardrail:
      "Use as a career-span summary, not as a claim of one continuous formal title.",
    relatedCapabilities: ["seniority", "range", "operating structure"]
  },
  {
    id: "CAP-001",
    status: "ready",
    level: "technical-operations-claim",
    publicWording:
      "Jamie creates documentation architecture: source maps, meeting memory, action trackers, decision records, public guidance, reusable templates, and handoffs.",
    sourceClass: "public-safe-summary; approved-resume",
    supportLevel: "strong",
    allowedSurfaces: ["work-index", "case-study-fair-rent", "technical-operations", "lab-source-backed-team-memory"],
    guardrail:
      "Do not reduce this to note-taking or tracking. Name the operating function and public/private boundaries.",
    relatedCapabilities: ["documentation architecture", "operating memory", "handoffs"]
  },
  {
    id: "HJE-001",
    status: "ready",
    level: "case-study-claim",
    publicWording:
      "Helped an 80+ year-old legacy industrial business translate web, e-commerce, marketing, analytics, content, and operational workflow needs into more usable systems.",
    sourceClass: "approved-resume; approved-public-page; public-safe-summary",
    supportLevel: "strong public-safe summary with protected internal evidence",
    allowedSurfaces: ["homepage", "work-index", "case-study-hje", "technical-operations", "resume-page"],
    guardrail:
      "Use contribution language. Do not publish private dashboards, customer data, vendor terms, pricing rules, or internal operating procedures.",
    relatedCapabilities: [
      "e-commerce",
      "analytics",
      "stakeholder translation",
      "workflow mapping",
      "public-facing tools"
    ]
  },
  {
    id: "HJE-002",
    status: "use-with-care",
    level: "resume-support-claim",
    publicWording:
      "Contributed to online growth through web, e-commerce, analytics, marketing, and operations improvements.",
    sourceClass: "approved-resume; public-safe-summary; private-source-outside-repo",
    supportLevel: "supported but contribution-framed",
    allowedSurfaces: ["case-study-hje", "technical-operations", "resume-page"],
    guardrail:
      "Do not say Jamie solely caused revenue growth. Keep exact revenue metrics out of homepage copy until separately approved for that surface.",
    relatedCapabilities: ["business impact", "product operations", "marketing operations"]
  },
  {
    id: "NAC-001",
    status: "ready",
    level: "case-study-claim",
    publicWording:
      "NYC Artist Coalition / FairRentNYC systems work for cultural-space safety, nightlife support, anti-displacement, and Commercial Rent Stabilization.",
    sourceClass: "approved-public-page; public-safe-summary; Jamie approval confirmation",
    supportLevel: "strong public-safe role framing",
    allowedSurfaces: ["homepage", "work-index", "case-study-fair-rent", "technical-operations", "resume-page"],
    guardrail:
      "Use collective-work language. Do not imply Jamie alone led NYC Artist Coalition or won policy outcomes.",
    relatedCapabilities: [
      "coalition operations",
      "public guidance",
      "campaign infrastructure",
      "source mapping"
    ]
  },
  {
    id: "CRS-001",
    status: "use-with-care",
    level: "proof-strip-claim",
    publicWording:
      "30+ pages of Commercial Rent Stabilization campaign memory, source maps, action tracking, and public-data framing",
    sourceClass: "public-safe-summary; private-source-outside-repo",
    supportLevel: "supported by protected working records",
    allowedSurfaces: ["homepage", "case-study-fair-rent", "technical-operations", "resume-page"],
    guardrail:
      "Say campaign memory and public-data framing. Do not publish private strategy, contact lists, unapproved quotes, or review-sensitive material.",
    relatedCapabilities: ["meeting memory", "action tracking", "public data", "decision records"]
  },
  {
    id: "CALL-001",
    status: "ready",
    level: "case-study-claim",
    publicWording:
      "Archived civic-data prototype translating constituent-services open data into resident-facing issue pathways.",
    sourceClass: "public project artifact; approved-resume; public-safe-summary",
    supportLevel: "strong",
    allowedSurfaces: ["work-index", "case-study-callnyc", "technical-operations", "resume-page"],
    guardrail:
      "Always keep archived and unofficial status visible. Do not present CallNYC as current, official, legal, or emergency guidance.",
    relatedCapabilities: ["civic technology", "open data", "information architecture"]
  },
  {
    id: "CALL-002",
    status: "open",
    level: "case-study-claim",
    publicWording:
      "CallNYC public press citation, pending exact public-source confirmation.",
    sourceClass: "collaborator approval pending; public reporting pending",
    supportLevel: "open until citation is confirmed",
    allowedSurfaces: ["case-study-callnyc"],
    guardrail:
      "Do not publish a direct press claim or link until Jamie confirms the exact citation.",
    relatedCapabilities: ["public credibility", "civic technology"]
  },
  {
    id: "WOW-001",
    status: "use-with-care",
    level: "proof-strip-claim",
    publicWording:
      "WOWList archive: 1,800+ users, 16,000+ event posts, and 35+ active city/region scenes by 2017",
    sourceClass: "aggregate workbook review with no private rows; private-source-outside-repo",
    supportLevel: "supported aggregate archive summary",
    allowedSurfaces: ["homepage", "work-index", "case-study-wowlist", "technical-operations", "resume-page"],
    guardrail:
      "Use aggregate counts only. Do not publish user records, organizer contact details, private media, or raw archive exports.",
    relatedCapabilities: ["community platform", "product operations", "public web systems"]
  },
  {
    id: "SD-001",
    status: "use-with-care",
    level: "proof-strip-claim",
    publicWording:
      "300+ gatherings and 20+ resident artists supported through repeatable hosting, onboarding, facilitation, and continuity systems",
    sourceClass: "approved-resume; aggregate workbook review; private-source-outside-repo",
    supportLevel: "supported aggregate summary",
    allowedSurfaces: ["homepage", "work-index", "case-study-196", "technical-operations", "resume-page"],
    guardrail:
      "Use as participation-infrastructure proof. Do not publish names, addresses, attendance records, guest data, or unapproved photos.",
    relatedCapabilities: ["onboarding", "facilitation", "community operations", "continuity"]
  },
  {
    id: "KCTH-001",
    status: "use-with-care",
    level: "case-study-claim",
    publicWording:
      "Adaptive-reuse planning and public-benefit documentation tied to a $490,539 public-funding recommendation.",
    sourceClass: "public-safe-summary; public record; private-source-outside-repo",
    supportLevel: "supported public-safe summary",
    allowedSurfaces: ["case-study-kc-town-hall", "technical-operations"],
    guardrail:
      "Say recommendation unless final funding flow is separately verified. Do not publish private legal, property, banking, or finance-sensitive detail.",
    relatedCapabilities: ["project planning", "public-benefit documentation", "stakeholder context"]
  },
  {
    id: "SBTM-001",
    status: "ready",
    level: "lab-claim",
    publicWording:
      "Lab method for turning meetings, decisions, open questions, and source materials into human-reviewable operating memory.",
    sourceClass: "public-safe proposal; practice record",
    supportLevel: "moderate",
    allowedSurfaces: ["lab-source-backed-team-memory", "technical-operations"],
    guardrail:
      "Present as lab, method, proof-of-practice, or consulting practice. Not finished SaaS, private archive browsing, surveillance, or a replacement for judgment.",
    relatedCapabilities: ["source-backed memory", "AI evaluation", "decision records", "governance"]
  },
  {
    id: "AI-001",
    status: "ready",
    level: "resume-support-claim",
    publicWording:
      "Completed AI Evals for Engineers & PMs in 2026, strengthening evals, traces, annotation, retrieval quality, and human-review practice.",
    sourceClass: "certificate image; approved-resume",
    supportLevel: "strong",
    allowedSurfaces: ["resume-page", "technical-operations", "lab-source-backed-team-memory"],
    guardrail:
      "Use as professional-development support, not as a substitute for production AI track record.",
    relatedCapabilities: ["evals", "human review", "retrieval quality", "AI readiness"]
  }
];

const publicProjectionStatuses = new Set<ProofStatus>(["ready", "use-with-care"]);

function canProject(claim: ProofClaim, surface: string) {
  return publicProjectionStatuses.has(claim.status) && claim.allowedSurfaces.includes(surface);
}

function byId(id: string) {
  const claim = proofClaims.find((candidate) => candidate.id === id);
  if (!claim) throw new Error(`Missing proof claim ${id}`);
  return claim;
}

export const homeProofItems = ["CORE-003", "HJE-001", "NAC-001", "CRS-001", "WOW-001", "SD-001"]
  .map(byId)
  .filter((claim) => canProject(claim, "homepage"))
  .map((claim) => claim.publicWording);

export const resumeHighlights = proofClaims
  .filter((claim) => canProject(claim, "resume-page"))
  .map((claim) => claim.publicWording);

export const technicalOperationsProofItems = proofClaims
  .filter((claim) => canProject(claim, "technical-operations"))
  .map((claim) => ({
    label: claim.relatedCapabilities.slice(0, 2).join(" / "),
    text: claim.publicWording
  }));
