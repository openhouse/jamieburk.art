import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold text-jamie-ink">{children}</h2>
    ),
    p: ({ children }) => <p className="mt-4 leading-7 text-jamie-ink">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
    ...components
  };
}
