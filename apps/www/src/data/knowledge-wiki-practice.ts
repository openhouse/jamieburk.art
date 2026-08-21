export const knowledgeWikiPractice = {
  schemaVersion: 1,
  layers: [
    {
      id: "source",
      label: "Source graph",
      question: "What material exists, and under what authority may it be inspected?",
      description:
        "Original files remain with the systems and people responsible for them. Access, rights, consent, and retention stay explicit."
    },
    {
      id: "evidence",
      label: "Evidence graph",
      question: "What supports, complicates, or contradicts an interpretation?",
      description:
        "Sources, observations, media, provenance, corrections, gaps, and conflicting accounts remain traceable instead of being flattened."
    },
    {
      id: "semantic",
      label: "Semantic graph",
      question: "What does the material mean for the work?",
      description:
        "Projects, people, decisions, capabilities, claims, and open questions form a reviewable account that can keep changing."
    }
  ],
  transitions: [
    { from: "source", to: "evidence", automatic: false },
    { from: "evidence", to: "semantic", automatic: false },
    { from: "semantic", to: "projection", automatic: false }
  ],
  projection: {
    id: "projection",
    label: "Audience-specific projection",
    question: "What does this reader need in order to understand and act?",
    description:
      "A portfolio page, resume, research packet, and project site are different compositions drawn from reviewed knowledge. This portfolio is one such composition.",
    recipientSpecific: true,
    humanGates: ["rights", "consent", "credit", "editorial review"]
  },
  lineage: {
    predecessor: "Noting.us",
    relationship: "prototype-predecessor",
    productionAdoptionClaimed: false
  },
  publicSurfaces: ["/colophon", "/lab/source-backed-team-memory"]
} as const;

export type KnowledgeWikiPractice = typeof knowledgeWikiPractice;
