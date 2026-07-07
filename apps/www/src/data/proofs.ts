export type SiteProof = {
  id: string;
  publicClaim: string;
  evidenceBasis: string;
  guardrail: string;
};

export const proofStripItems = [
  "Operating structure across public-facing teams",
  "NYC Artist Coalition civic systems and policy communications",
  "Catalog, search, checkout, content, analytics, and handoffs",
  "Organizer publishing and event-discovery workflows",
  "Repeatable hosting and continuity systems"
];

export const resumeProofs: SiteProof[] = [
  {
    id: "core-operating-structure",
    publicClaim:
      "Jamie turns under-structured work into usable systems for complex public-facing teams.",
    evidenceBasis: "Knowledge Bank CORE-002; approved resume candidate",
    guardrail:
      "Define through concrete examples; do not leave as generic strategy language."
  },
  {
    id: "nac-civic-systems-role",
    publicClaim:
      "Co-founder and civic systems, documentation, and policy communications lead for NYC Artist Coalition / FairRentNYC.",
    evidenceBasis: "Knowledge Bank NAC-001; public-safe archive summary",
    guardrail:
      "Use role/function language; do not imply sole ownership of coalition outcomes."
  },
  {
    id: "hje-systems-scope",
    publicClaim:
      "Helped a legacy industrial tool business turn catalog knowledge, product voice, and operating routines into maintainable e-commerce workflows.",
    evidenceBasis: "Knowledge Bank HJE-001; public sources and resume-backed role",
    guardrail:
      "Do not publish private dashboards, revenue detail, customer data, vendor terms, or sole-causation language."
  },
  {
    id: "crs-campaign-memory",
    publicClaim:
      "Helped build and steward shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    evidenceBasis: "Knowledge Bank CRS-001; public-safe civic summary",
    guardrail:
      "Do not publish private coalition notes, legal-review material, raw strategy context, private emails, stakeholder lists, or unapproved quotes."
  },
  {
    id: "wowlist-workflows",
    publicClaim:
      "Co-built community web systems for organizer publishing, keyword-based discovery, digest emails, and embeddable calendars.",
    evidenceBasis: "Knowledge Bank WOW-001; public-safe archive summary",
    guardrail:
      "Do not publish private user data, organizer contact lists, database exports, or unapproved community records."
  },
  {
    id: "sunday-dinner-continuity",
    publicClaim:
      "Helped create repeatable hosting, onboarding, facilitation, documentation, and continuity systems across recurring gatherings and resident-artist support.",
    evidenceBasis: "Knowledge Bank SD-001; public-safe archive summary",
    guardrail:
      "Do not publish guest lists, attendance records, addresses, private stories, or unapproved photos."
  },
  {
    id: "ai-evals-completion",
    publicClaim:
      "Completed AI Evals for Engineers & PMs, taught by Hamel Husain and Shreya Shankar.",
    evidenceBasis: "Knowledge Bank AI-001; certificate image provided by Jamie",
    guardrail:
      "Do not imply certification beyond completion of the named course."
  }
];
