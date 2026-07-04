import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-12 text-2xl font-bold" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl font-bold" {...props} />,
    p: (props) => <p className="my-4 leading-relaxed" {...props} />,
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    li: (props) => <li className="my-2" {...props} />,
    ...components
  };
}
