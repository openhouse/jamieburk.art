type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="measure mb-8">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black leading-tight md:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-lg leading-8 text-[color:var(--jamie-muted)]">{children}</div> : null}
    </div>
  );
}
