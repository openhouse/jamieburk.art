import type { WorkItem } from "@/lib/types";

type AtAGlanceProps = {
  item: WorkItem;
};

export function AtAGlance({ item }: AtAGlanceProps) {
  const rows = [
    ["Role", item.role],
    ["Years", item.dates],
    ["Format", item.format],
    ["Primary artifacts", item.selectedArtifacts.join("; ")],
    ["Status", item.status],
    ["Public-safety note", item.publicSafetyNote ?? item.caveat],
    ["Skills shown", item.skills?.join("; ")],
    ["Underlying system", item.underlyingSystem]
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <aside className="surface p-5">
      <h2 className="text-xl font-bold">At a glance</h2>
      <dl className="mt-5 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm font-bold text-[color:var(--color-primary)]">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
