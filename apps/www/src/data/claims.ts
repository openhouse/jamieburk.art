export type ClaimStatus =
  | "approved-public"
  | "approved-summary"
  | "candidate-needs-approval"
  | "private-source-not-committed"
  | "protected-do-not-publish";

export type RiskLevel = "low" | "medium" | "high";

export type PublicClaim = {
  id: string;
  status: ClaimStatus;
  publicWording: string;
  plainLanguageWording?: string;
  sourceClass: string;
  usedOn: string[];
  riskLevel: RiskLevel;
  chadLens?: string;
  notes?: string;
};

export const publicClaims = [
  {
    id: "positioning-operating-structure",
    status: "approved-public",
    publicWording: "I create operating structure for complex public-facing teams.",
    plainLanguageWording: "I turn ambiguous, loosely defined work into usable systems.",
    sourceClass: "public-safe-summary",
    usedOn: ["/", "/about", "/resume", "/work/technical-operations"],
    riskLevel: "low",
    chadLens: "Clear, role-relevant, and easy for hiring readers to understand.",
    notes: "Core positioning line. Do not weaken the role-specific frame."
  },
  {
    id: "experience-14-years-operating-structure",
    status: "approved-summary",
    publicWording: "14+ years building operating structure across public-facing work",
    plainLanguageWording: "More than 14 years turning public-facing work into usable systems.",
    sourceClass: "approved-resume",
    usedOn: ["/", "/resume"],
    riskLevel: "low",
    chadLens: "Useful proof-strip claim when tied to operating structure.",
    notes: "Do not imply 14+ years in one formal job title."
  },
  {
    id: "hje-homepage-safe-proof",
    status: "approved-summary",
    publicWording:
      "E-commerce, analytics, content, and operations work for a legacy industrial business",
    plainLanguageWording: "Legacy business operations made more usable online.",
    sourceClass: "public-safe-summary",
    usedOn: ["/"],
    riskLevel: "low",
    chadLens: "Strong enough for homepage proof without leaning on unapproved revenue metrics.",
    notes: "Use instead of exact 2x claim until production approval."
  },
  {
    id: "fairrent-homepage-safe-proof",
    status: "approved-summary",
    publicWording: "Helped structure shared civic campaign memory and public-data framing",
    plainLanguageWording: "Helped civic collaborators keep complex work usable and reviewable.",
    sourceClass: "public-safe-summary",
    usedOn: ["/"],
    riskLevel: "low",
    chadLens: "Safer homepage version of the active civic-work claim.",
    notes: "Does not expose active private coalition context."
  },
  {
    id: "wowlist-platform",
    status: "approved-summary",
    publicWording:
      "Co-built a community-calendar platform for local arts, music, and event distribution",
    plainLanguageWording:
      "Co-built a community calendar that helped local organizers publish and distribute events.",
    sourceClass: "public-safe-summary",
    usedOn: ["/", "/work/wowlist"],
    riskLevel: "medium",
    chadLens: "Connects technical implementation to community and product operations.",
    notes: "Avoid official city-chapter or active-today language."
  },
  {
    id: "sunday-dinner-systems",
    status: "approved-summary",
    publicWording: "Built participation systems for recurring gatherings and artist-residency work",
    plainLanguageWording:
      "Made a long-running community practice easier to host, document, and continue.",
    sourceClass: "public-safe-summary",
    usedOn: ["/", "/work/196-sunday-dinner"],
    riskLevel: "medium",
    chadLens:
      "Frames community work as operations, onboarding, and continuity without publishing private community records.",
    notes: "Keep exact metrics out of public proof modules until approved."
  }
] satisfies PublicClaim[];

const claimById = new Map(publicClaims.map((claim) => [claim.id, claim]));

export function getPublicClaim(id: string): PublicClaim {
  const claim = claimById.get(id);

  if (!claim) {
    throw new Error(`Unknown public claim: ${id}`);
  }

  return claim;
}

export const homepageProofClaimIds = [
  "experience-14-years-operating-structure",
  "hje-homepage-safe-proof",
  "fairrent-homepage-safe-proof",
  "wowlist-platform",
  "sunday-dinner-systems"
] as const;
