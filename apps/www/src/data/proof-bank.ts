export type ProofArea =
  | "core"
  | "nac"
  | "hje"
  | "crs"
  | "wowlist"
  | "callnyc"
  | "sunday-dinner"
  | "kc-town-hall"
  | "source-backed-memory"
  | "ai-evals";

export type ProofItem = {
  id: string;
  area: ProofArea;
  shortLabel: string;
  publicClaim: string;
  supportLevel: string;
  siteUse: string;
  boundary: string;
};

export const proofBank: ProofItem[] = [
  {
    id: "core-operating-structure",
    area: "core",
    shortLabel: "Operating structure across public-facing teams",
    publicClaim:
      "Jamie turns under-structured work into usable systems for complex public-facing teams.",
    supportLevel: "resume-backed / archive-backed",
    siteUse: "Homepage, resume, work index",
    boundary:
      "Do not imply every project was formally titled technical project management."
  },
  {
    id: "nac-civic-systems-role",
    area: "nac",
    shortLabel: "NYC Artist Coalition civic systems and policy communications",
    publicClaim:
      "Jamie serves as a co-founder and civic systems, documentation, and policy communications lead for NYC Artist Coalition / FairRentNYC.",
    supportLevel: "resume-backed / archive-backed",
    siteUse: "Resume, NAC/FairRentNYC case, technical-operations page",
    boundary:
      "Use role/function language; do not imply sole ownership of coalition outcomes."
  },
  {
    id: "nac-operating-layer",
    area: "nac",
    shortLabel: "Coalition operating memory and follow-through systems",
    publicClaim:
      "Jamie helps build and steward coalition operating infrastructure: campaign sites, explainers, testimony support, share kits, call scripts, QR paths, running minutes, source maps, action trackers, public handouts, stakeholder follow-up, and report-back materials.",
    supportLevel: "resume-backed / archive-backed",
    siteUse: "NAC/FairRentNYC case and selected proof",
    boundary:
      "Keep private contact lists, internal records, strategy notes, and unapproved quotes out of the repo."
  },
  {
    id: "nac-current-workstreams",
    area: "nac",
    shortLabel: "CRS, cultural-space affordability, and public-data workstreams",
    publicClaim:
      "Current public-safe NAC / FairRentNYC work centers on Commercial Rent Stabilization, cultural-space affordability, storefront stability, public-data framing, legal/policy provenance, source-backed campaign memory, consent-aware base-building, and cultural-space insurance/member support.",
    supportLevel: "public-source / archive-backed / collaborator-review-needed",
    siteUse: "NAC/FairRentNYC case and technical-operations page",
    boundary:
      "Active work needs date/context discipline and collaborator review before naming private partners or meeting details."
  },
  {
    id: "hje-systems-scope",
    area: "hje",
    shortLabel: "Catalog, search, checkout, content, analytics, and handoffs",
    publicClaim:
      "Jamie supported catalog, search, checkout, content, analytics, and workflow improvements for a legacy e-commerce business.",
    supportLevel: "public-source / resume-backed / archive-backed",
    siteUse: "HJE case, technical-operations page, resume selected impact",
    boundary:
      "Keep exact revenue and private analytics offline until approved."
  },
  {
    id: "crs-campaign-memory",
    area: "crs",
    shortLabel: "Shared civic campaign-memory infrastructure",
    publicClaim:
      "Jamie helped build and steward shared civic campaign-memory infrastructure: running minutes, action tracking, source context, open questions, and public-data framing.",
    supportLevel: "archive-backed / collaborator-review-needed",
    siteUse: "CRS case summary and selected impact",
    boundary:
      "Use collective-work language; do not claim Jamie led the movement or owned the bill."
  },
  {
    id: "wowlist-workflows",
    area: "wowlist",
    shortLabel: "Organizer publishing and event-discovery workflows",
    publicClaim:
      "Jamie co-built community web systems for organizer publishing, keyword-based discovery, digest emails, and embeddable calendars.",
    supportLevel: "resume-backed / archive-backed",
    siteUse: "WOWList proof page, resume selected impact, proof strip",
    boundary:
      "Avoid precise adoption or usage metrics unless separately approved for public use."
  },
  {
    id: "sd-participation-infrastructure",
    area: "sunday-dinner",
    shortLabel: "Repeatable hosting and continuity systems",
    publicClaim:
      "Jamie helped create repeatable hosting, onboarding, facilitation, documentation, and continuity systems across recurring gatherings and resident-artist support.",
    supportLevel: "resume-backed / archive-backed",
    siteUse: "Sunday Dinner proof page and resume selected impact",
    boundary:
      "Do not publish guest lists, attendance records, addresses, private stories, or unapproved photos."
  },
  {
    id: "memory-lab-pattern",
    area: "source-backed-memory",
    shortLabel: "Known / Open / Protected source-backed memory",
    publicClaim:
      "Jamie uses source-backed, public-safe documentation practices that separate known material, open questions, and protected context.",
    supportLevel: "public-source / archive-backed",
    siteUse: "Lab page and case-study structure",
    boundary:
      "Do not present this as a compliance product, legal review system, or private archive browser."
  },
  {
    id: "ai-evals-certificate",
    area: "ai-evals",
    shortLabel: "AI Evals for Engineers & PMs completion",
    publicClaim:
      "Jamie completed AI Evals for Engineers & PMs, taught by Hamel Husain and Shreya Shankar.",
    supportLevel: "certificate image provided by Jamie",
    siteUse: "Resume page and source-backed memory context",
    boundary:
      "Do not imply certification beyond completion of the named course."
  }
];

export const proofStripItems = proofBank
  .filter((proof) =>
    [
      "core-operating-structure",
      "nac-civic-systems-role",
      "hje-systems-scope",
      "wowlist-workflows",
      "sd-participation-infrastructure"
    ].includes(proof.id)
  )
  .map((proof) => proof.shortLabel);

export const resumeProofs = proofBank.filter((proof) =>
  [
    "core-operating-structure",
    "nac-civic-systems-role",
    "nac-operating-layer",
    "hje-systems-scope",
    "crs-campaign-memory",
    "wowlist-workflows",
    "sd-participation-infrastructure",
    "ai-evals-certificate"
  ].includes(proof.id)
);
