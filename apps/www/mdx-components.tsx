import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, className, ...props }) => (
      <h2 {...props} className={`mt-12 text-2xl font-semibold text-jb-ink ${className ?? ""}`}>
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3 {...props} className={`mt-8 text-xl font-semibold text-jb-ink ${className ?? ""}`}>
        {children}
      </h3>
    ),
    p: ({ children, className, ...props }) => (
      <p {...props} className={`leading-8 text-jb-ink/85 ${className ?? ""}`}>{children}</p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul {...props} className={`my-5 list-disc space-y-2 pl-6 text-jb-ink/85 ${className ?? ""}`}>
        {children}
      </ul>
    ),
    li: ({ children, className, ...props }) => (
      <li {...props} className={`pl-1 ${className ?? ""}`}>{children}</li>
    ),
    strong: ({ children, className, ...props }) => (
      <strong {...props} className={`font-semibold text-jb-ink ${className ?? ""}`}>
        {children}
      </strong>
    ),
    ...components
  };
}
