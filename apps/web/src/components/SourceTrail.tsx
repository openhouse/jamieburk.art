type SourceTrailProps = {
  items: string[];
};

export function SourceTrail({ items }: SourceTrailProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="border border-primary/20 bg-primary/5 p-5">
      <h2 className="section-kicker">Primary proof</h2>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-base-content/80">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

