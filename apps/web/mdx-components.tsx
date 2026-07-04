import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="section-kicker" {...props} />,
    p: (props) => <p className="leading-relaxed" {...props} />,
    ul: (props) => <ul className="prose-list" {...props} />,
    ol: (props) => <ol className="prose-list list-decimal" {...props} />,
    a: (props) => <a className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary" {...props} />,
    ...components
  };
}

