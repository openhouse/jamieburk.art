import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold text-ink">{children}</h3>,
    p: ({ children }) => <p className="mt-4 leading-7 text-muted">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    ...components
  };
}
