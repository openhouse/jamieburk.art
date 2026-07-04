type SectionProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  ruled?: boolean;
};

export function Section({ eyebrow, title, children, ruled = false }: SectionProps) {
  return (
    <section className={`section-pad ${ruled ? "section-rule" : ""}`}>
      <div className="container-page">
        <div className="mb-8 max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
