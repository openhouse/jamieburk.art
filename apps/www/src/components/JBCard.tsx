import type { ReactNode } from "react";

type JBCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "section" | "div";
  id?: string;
};

export function JBCard({
  children,
  className = "",
  as: Component = "article",
  id
}: JBCardProps) {
  return (
    <Component
      className={`rounded border border-jb-ink/15 bg-jb-warm p-5 ${className}`}
      id={id}
    >
      {children}
    </Component>
  );
}
