export type ClaimStatus = "defensible" | "use-with-care" | "open" | "protected";

export type ProofClaim = {
  id: string;
  status: ClaimStatus;
  claim: string;
  publicProjection: string;
  evidenceClass: string;
  boundaries: string;
  surfaces: string[];
};

export const proofClaims = [
  {
    id: "positioning-operating-structure",
    status: "defensible",
    claim: "Jamie creates operating structure for complex public-facing teams.",
    publicProjection: "I create operating structure for complex public-facing teams.",
    evidenceClass: "Resume-backed claim",
    boundaries: "Keep the professional frame first.",
    surfaces: ["homepage", "about", "resume"]
  },
  {
    id: "hje-long-term-web-ops",
    status: "defensible",
    claim:
      "Jamie helped an 80+ year-old industrial business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    publicProjection:
      "Long-term e-commerce and operations improvements for an 80+ year-old industrial business.",
    evidenceClass: "Public website; Resume-backed claim",
    boundaries:
      "Do not publish private dashboards, revenue details, customer data, passwords, vendor terms, or internal operating materials.",
    surfaces: ["homepage", "work-card", "case-study", "resume"]
  },
  {
    id: "fairrent-campaign-memory",
    status: "use-with-care",
    claim:
      "Jamie helped build and steward shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    publicProjection:
      "Helped structure shared civic campaign memory and public-data framing.",
    evidenceClass: "Public website; Private supporting material, not publishable",
    boundaries:
      "Use collective-work language. Do not publish private coalition notes, legal-review materials, stakeholder lists, or unapproved names.",
    surfaces: ["homepage", "work-card", "case-study", "resume"]
  },
  {
    id: "wowlist-community-calendar",
    status: "defensible",
    claim:
      "Jamie co-built a Python / Django and Ember.js community-calendar platform organized around keyword communities and public event distribution.",
    publicProjection:
      "Co-built a community-calendar platform for local arts, music, and event distribution.",
    evidenceClass: "Public website; Private supporting material, not publishable",
    boundaries:
      "Do not overstate current activity, official city chapters, or private user data.",
    surfaces: ["homepage", "work-card", "case-study", "resume"]
  },
  {
    id: "sunday-dinner-participation-infrastructure",
    status: "use-with-care",
    claim:
      "Jamie built participation systems for recurring gatherings and artist-residency work.",
    publicProjection:
      "Built participation systems for recurring gatherings and artist-residency work.",
    evidenceClass: "Private supporting material, not publishable",
    boundaries:
      "Summary-only unless participant names, photos, quotes, and artifacts are approved.",
    surfaces: ["homepage", "work-card", "case-study", "resume"]
  },
  {
    id: "source-backed-team-memory-method",
    status: "defensible",
    claim:
      "Jamie is developing a research and consulting method for keeping team answers tied to source material, decisions, context, and explicit uncertainty.",
    publicProjection:
      "Source-backed team memory method for decision trails, onboarding context, meeting synthesis, and human review.",
    evidenceClass: "Public website; Private supporting material, not publishable",
    boundaries:
      "Lab / method / consulting practice. Not a finished production SaaS, AI replacement for judgment, or private archive browser.",
    surfaces: ["lab", "technical-operations", "colophon"]
  }
] as const satisfies ProofClaim[];

export const homepageProofClaimIds = [
  "positioning-operating-structure",
  "hje-long-term-web-ops",
  "fairrent-campaign-memory",
  "wowlist-community-calendar",
  "sunday-dinner-participation-infrastructure"
];

export function getProofClaim(id: string) {
  const claim = proofClaims.find((item) => item.id === id);

  if (!claim) {
    throw new Error(`Unknown proof claim: ${id}`);
  }

  return claim;
}
