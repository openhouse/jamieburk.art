import type { MDXComponents } from "mdx/types";
import { Cite, Claim, References } from "@/components/citations";
import { ParticipationSequence } from "@/components/ParticipationSequence";
import { WorkflowSpecimen } from "@/components/WorkflowSpecimen";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold text-jb-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-jb-ink">{children}</h3>
    ),
    p: ({ children }) => <p className="leading-8 text-jb-ink/85">{children}</p>,
    ul: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-jb-ink/85">{children}</ul>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-jb-ink">{children}</strong>
    ),
    Cite,
    Claim,
    ParticipationSequence,
    References,
    WorkflowSpecimen,
    ...components
  };
}
