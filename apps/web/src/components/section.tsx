type SectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, intro, children, className = "" }: SectionProps) {
  return (
    <section className={`section-y ${className}`}>
      <div className="page-shell">
        <div className="mb-8 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
          {intro ? <p className="mt-4 text-lg text-base-content/75">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
