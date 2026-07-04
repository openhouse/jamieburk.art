import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="section-kicker" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-base-content" {...props} />,
  p: (props) => <p className="leading-relaxed text-base-content/85" {...props} />,
  ul: (props) => <ul className="prose-list" {...props} />,
  ol: (props) => <ol className="prose-list list-decimal" {...props} />,
  a: (props) => <a className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary" {...props} />,
  strong: (props) => <strong className="font-semibold text-base-content" {...props} />
};

