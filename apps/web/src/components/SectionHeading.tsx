type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="measure">
      {eyebrow ? <p className="small-caps text-[color:var(--color-primary)]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-bold leading-tight text-[color:var(--color-ink)] md:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-lg leading-8 text-[color:var(--color-muted)]">{body}</p> : null}
    </div>
  );
}
