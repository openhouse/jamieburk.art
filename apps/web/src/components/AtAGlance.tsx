import type { AtAGlanceItem } from "@/lib/types";

type AtAGlanceProps = {
  items: AtAGlanceItem[];
};

export function AtAGlance({ items }: AtAGlanceProps) {
  return (
    <aside aria-label="At a glance" className="at-a-glance">
      <h2>At a glance</h2>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
