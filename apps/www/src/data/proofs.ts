export type HomepageProof = {
  label: string;
  claimId: string;
};

export type TechnicalOperationsProofRow = {
  title: string;
  text: string;
  claimIds: string[];
};

export const homepageProofs = [
  {
    label: "14+ years building operating structure",
    claimId: "PB-001"
  },
  {
    label: "Legacy e-commerce and operations modernization",
    claimId: "PB-003"
  },
  {
    label: "Civic campaign memory and cultural-space fieldwork",
    claimId: "PB-004"
  },
  {
    label: "35+ active city scenes in the WOWList archive",
    claimId: "PB-007"
  },
  {
    label: "300+ recurring gatherings and 20+ resident-artist contexts",
    claimId: "PB-008"
  }
] satisfies HomepageProof[];

export const resumeProofHighlights = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Helped modernize e-commerce, content, analytics, and operational workflows for an 80+ year-old industrial tool business",
  "Helped build shared civic operating memory for Commercial Rent Stabilization and cultural-space affordability work",
  "Co-built a Django / Ember community-calendar platform with 35+ active city scenes in the archive",
  "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ recurring gatherings and 20+ resident-artist contexts",
  "Completed AI Evals For Engineers & PMs through Maven"
] as const;

export const technicalOperationsProofRows = [
  {
    title: "Delivery coordination",
    text:
      "Coordinated web, civic, community, and documentation work across technical and nontechnical collaborators.",
    claimIds: ["PB-001", "PB-002"]
  },
  {
    title: "Decision records and action trackers",
    text:
      "Synthesized meetings into decisions, action items, open questions, source context, and stakeholder next steps.",
    claimIds: ["PB-002", "PB-004"]
  },
  {
    title: "Public-data and source mapping",
    text:
      "Translated open-data, policy, source, and provenance questions into public-safe materials that collaborators could review and use.",
    claimIds: ["PB-004", "PB-006"]
  },
  {
    title: "Onboarding and continuity systems",
    text:
      "Built reusable materials and repeatable practices for handoffs, participation, hosting, adoption, and long-running maintenance.",
    claimIds: ["PB-002", "PB-008"]
  },
  {
    title: "Public/private boundary management",
    text:
      "Used Known / Open / Protected boundaries so public-facing work can be useful without exposing private source layers.",
    claimIds: ["PB-004", "PB-010"]
  },
  {
    title: "AI-evaluation-informed documentation",
    text:
      "Applies AI-evaluation literacy to source-backed memory, review loops, error checking, and human-correctable documentation workflows.",
    claimIds: ["PB-010", "PB-011"]
  }
] satisfies TechnicalOperationsProofRow[];
