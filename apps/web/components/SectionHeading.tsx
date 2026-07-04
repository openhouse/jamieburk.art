type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  children
}: SectionHeadingProps) {
  return (
    <div className="copy">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="h2">{title}</h2>
      {children ? <div className="lead mt-5">{children}</div> : null}
    </div>
  );
}
