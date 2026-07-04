import type { SourceTrailItem } from "@/lib/types";

type SourceTrailProps = {
  items: SourceTrailItem[];
};

export function SourceTrail({ items }: SourceTrailProps) {
  return (
    <section className="source-trail">
      <h2>Source trail</h2>
      <ol>
        {items.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
