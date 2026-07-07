export type ProofSupportLevel =
  | "approved"
  | "public-source"
  | "resume-supported"
  | "private-source-summary"
  | "practice-supported"
  | "needs-review"
  | "do-not-publish";

export type ProofApprovalState =
  | "approved"
  | "needs-jamie-review"
  | "needs-citation"
  | "protected"
  | "do-not-publish";

export type ProofSurface =
  | "home"
  | "resume"
  | "technical-operations"
  | "work-index"
  | "case-study"
  | "lab";

export type Proof = {
  id: string;
  safeWording: string;
  strongerWording?: string;
  supportLevel: ProofSupportLevel;
  approvalState: ProofApprovalState;
  mayAppear: ProofSurface[];
  doNotSay: string[];
  protectedMaterial?: string[];
  lastReviewed: string;
};

export const proofs: Proof[] = [
  {
    id: "operating-structure-14-years",
    safeWording:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
    supportLevel: "resume-supported",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations"],
    doNotSay: ["14+ years in one single formal title"],
    lastReviewed: "2026-07-07"
  },
  {
    id: "hje-revenue-growth",
    safeWording:
      "Contributed to a period of e-commerce revenue growth for a legacy business.",
    strongerWording:
      "Contributed to 2x revenue growth for a legacy e-commerce business.",
    supportLevel: "resume-supported",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations", "case-study"],
    doNotSay: [
      "Caused revenue growth alone",
      "Single-handedly doubled revenue",
      "Private dashboards or detailed revenue numbers"
    ],
    protectedMaterial: [
      "analytics dashboards",
      "customer data",
      "internal revenue detail",
      "credentials",
      "vendor terms"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "nac-campaign-web-infrastructure",
    safeWording:
      "Built public campaign websites and civic campaign-memory systems.",
    strongerWording:
      "Built or materially shaped public campaign web infrastructure for NYC Artist Coalition, FairRentNYC, Let NYC Dance, Save NYC Spaces, and Talks Not Raids.",
    supportLevel: "public-source",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations", "case-study"],
    doNotSay: [
      "Jamie alone led the coalition",
      "Jamie alone won policy outcomes",
      "Jamie owns partner organizations or all site content"
    ],
    protectedMaterial: [
      "private draft history",
      "backend/admin materials",
      "contact lists",
      "analytics",
      "unapproved partner materials"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "crs-campaign-memory",
    safeWording:
      "Built and stewarded shared civic campaign-memory infrastructure.",
    strongerWording:
      "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory infrastructure.",
    supportLevel: "private-source-summary",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations", "case-study"],
    doNotSay: [
      "Owned the bill",
      "Provided legal advice",
      "Spoke for every coalition collaborator"
    ],
    protectedMaterial: [
      "private coalition notes",
      "legal-review materials",
      "stakeholder lists",
      "raw strategy context",
      "private emails",
      "unapproved quotes"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "callnyc-archived-civic-prototype",
    safeWording:
      "Built an archived civic-data prototype translating constituent-services open data into resident-facing issue pathways and next-step guidance.",
    supportLevel: "public-source",
    approvalState: "approved",
    mayAppear: ["work-index", "case-study", "resume", "technical-operations"],
    doNotSay: [
      "Official City Council service",
      "Current service",
      "Legal guidance",
      "Emergency guidance"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "wowlist-community-platform",
    safeWording:
      "Co-built a community-calendar platform used by DIY arts and music organizers across multiple city ecosystems.",
    strongerWording:
      "Co-built a Django / Ember community-calendar platform with 1,800+ users, 16,000+ event posts, and 35+ active city or region scenes by 2017.",
    supportLevel: "private-source-summary",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations", "case-study"],
    doNotSay: [
      "Current active service",
      "Official city chapters",
      "Complete public archive",
      "Raw user or organizer records"
    ],
    protectedMaterial: [
      "user data",
      "organizer contact lists",
      "password hashes",
      "calendar identifiers",
      "private media",
      "raw archive exports"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "sunday-dinner-196-participation",
    safeWording:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems for long-running community and artist-support work.",
    strongerWording:
      "Created repeatable participation infrastructure across 300+ gatherings and 20+ resident artists.",
    supportLevel: "resume-supported",
    approvalState: "approved",
    mayAppear: ["home", "resume", "technical-operations", "case-study"],
    doNotSay: [
      "Publish guest lists",
      "Name participants without approval",
      "Publish addresses, attendance records, private stories, or unapproved photos"
    ],
    protectedMaterial: [
      "guest lists",
      "attendance records",
      "addresses",
      "private stories",
      "unapproved photos"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "kc-town-hall-public-benefit",
    safeWording:
      "Supported adaptive-reuse planning and public-benefit documentation for a long-vacant historic building.",
    strongerWording:
      "Supported adaptive-reuse planning and public-benefit documentation for a project tied to a $490,539 public-funding recommendation.",
    supportLevel: "resume-supported",
    approvalState: "approved",
    mayAppear: ["case-study", "technical-operations"],
    doNotSay: [
      "Jamie solely secured funding",
      "Funding was fully disbursed",
      "Redevelopment was completed unless separately verified"
    ],
    protectedMaterial: [
      "private financial detail",
      "legal detail",
      "property records not approved for publication",
      "banking detail",
      "stakeholder detail"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "source-backed-team-memory",
    safeWording:
      "Early method for turning meetings, decisions, open questions, and source materials into human-reviewable operating memory.",
    supportLevel: "practice-supported",
    approvalState: "approved",
    mayAppear: ["lab", "technical-operations"],
    doNotSay: [
      "Finished SaaS",
      "AI replacement for judgment",
      "Legal or medical advice system",
      "Private archive browser"
    ],
    lastReviewed: "2026-07-07"
  },
  {
    id: "ai-evals-professional-development",
    safeWording:
      "Completed AI Evals for Engineers & PMs in 2026, with practice in error analysis, traces, annotation workflows, retrieval quality, and human review.",
    supportLevel: "approved",
    approvalState: "approved",
    mayAppear: ["resume", "technical-operations", "lab"],
    doNotSay: [
      "Formal degree",
      "Academic research leadership",
      "Production AI deployment claim by itself"
    ],
    lastReviewed: "2026-07-07"
  }
];

function requireProof(id: string) {
  const proof = proofs.find((item) => item.id === id);

  if (!proof) {
    throw new Error(`Missing proof: ${id}`);
  }

  return proof;
}

function wordingFor(id: string, stronger = false) {
  const proof = requireProof(id);
  return stronger && proof.strongerWording ? proof.strongerWording : proof.safeWording;
}

export const homeProofItems = [
  wordingFor("operating-structure-14-years"),
  wordingFor("hje-revenue-growth", true),
  wordingFor("nac-campaign-web-infrastructure"),
  wordingFor("wowlist-community-platform", true),
  wordingFor("sunday-dinner-196-participation", true)
];

export const resumeHighlights = [
  wordingFor("operating-structure-14-years"),
  wordingFor("hje-revenue-growth", true),
  wordingFor("crs-campaign-memory", true),
  wordingFor("wowlist-community-platform", true),
  wordingFor("sunday-dinner-196-participation", true),
  wordingFor("ai-evals-professional-development")
];

export const technicalOperationsProofItems = [
  wordingFor("operating-structure-14-years"),
  wordingFor("hje-revenue-growth", true),
  wordingFor("nac-campaign-web-infrastructure", true),
  wordingFor("crs-campaign-memory", true),
  wordingFor("callnyc-archived-civic-prototype"),
  wordingFor("wowlist-community-platform", true),
  wordingFor("sunday-dinner-196-participation", true),
  wordingFor("kc-town-hall-public-benefit", true),
  wordingFor("source-backed-team-memory")
];
