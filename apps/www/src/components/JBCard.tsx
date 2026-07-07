import type { ReactNode } from "react";

type JBCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "section" | "div";
};

export function JBCard({ children, className = "", as: Component = "article" }: JBCardProps) {
  return (
    <Component
      className={`min-w-0 rounded-lg border border-jb-ink/15 bg-jb-warm/86 p-5 shadow-sm ${className}`}
    >
      {children}
    </Component>
  );
}
