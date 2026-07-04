import type { WorkItem } from "@/lib/types";

type AtAGlanceProps = {
  item: WorkItem;
};

export function AtAGlance({ item }: AtAGlanceProps) {
  const rows = [
    ["Role", item.role],
    ["Years", item.dates],
    ["Format", item.format],
    ["Status", item.contentState],
    ["Public safety", item.privacyLevel],
    ["Underlying system", item.underlyingSystem]
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <aside className="at-a-glance">
      <h2>At a glance</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
