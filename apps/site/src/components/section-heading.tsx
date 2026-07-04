type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-lg leading-8 text-neutral">{body}</p>
      ) : null}
    </div>
  );
}
