import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-10 text-2xl font-bold text-ink" {...props} />,
    h3: (props) => <h3 className="mt-6 text-xl font-semibold text-ink" {...props} />,
    p: (props) => <p className="mt-4 leading-7 text-ink/90" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
    ...components
  };
}
