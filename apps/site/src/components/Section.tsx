import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function Section({ children, className = "", eyebrow, title, intro }: SectionProps) {
  return (
    <section className={`section-band ${className}`}>
      <div className="site-shell">
        {(eyebrow || title || intro) && (
          <div className="section-heading">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
            {intro ? <p>{intro}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
