import type { Capability } from "@/lib/types";

export const capabilities: Capability[] = [
  {
    title: "Clarify ambiguous goals",
    description:
      "Turn mixed stakeholder needs, rough ideas, and inherited constraints into usable scopes, requirements, and next steps.",
    examples: ["Discovery notes", "scope maps", "decision logs"]
  },
  {
    title: "Build operating structure",
    description:
      "Create workflows, documentation, launch checklists, onboarding materials, and handoffs that teams can keep using.",
    examples: ["process maps", "handoff docs", "source trails"]
  },
  {
    title: "Translate between teams",
    description:
      "Help technical and nontechnical collaborators share context, name risks, and make choices without losing the human stakes.",
    examples: ["stakeholder briefs", "issue framing", "implementation support"]
  },
  {
    title: "Ship public-facing tools",
    description:
      "Shape small websites, prototypes, and civic information surfaces so they are clear, public-safe, and useful to readers.",
    examples: ["content models", "public guidance", "launch QA"]
  }
];
