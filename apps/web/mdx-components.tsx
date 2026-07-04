import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-12 text-2xl font-bold" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
    p: (props) => <p className="my-5 leading-8" {...props} />,
    ul: (props) => <ul className="my-5 list-disc pl-6" {...props} />,
    ...components
  };
}
