import type { WorkEntry } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { VisibilityBadge } from "./VisibilityBadge";

type AtAGlanceProps = {
  entry?: WorkEntry;
  rows?: Array<{
    label: string;
    value?: string;
  }>;
};

export function AtAGlance({ entry, rows: providedRows }: AtAGlanceProps) {
  const rows = providedRows ?? (entry ? [
    { label: "Role", value: entry.role },
    { label: "Years", value: entry.years },
    { label: "System type", value: entry.systemType },
    { label: "Outcome", value: entry.outcome }
  ] : []);

  return (
    <aside className="paper-panel p-6">
      <p className="eyebrow">At a glance</p>
      {entry ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status={entry.status} />
          <VisibilityBadge visibility={entry.visibility} />
        </div>
      ) : null}
      <dl className="mt-5 grid gap-4 text-sm">
        {rows
          .filter((row) => row.value)
          .map((row) => (
            <div key={row.label}>
              <dt className="font-semibold">{row.label}</dt>
              <dd className="mt-1 text-[var(--color-muted)]">{row.value}</dd>
            </div>
          ))}
      </dl>
    </aside>
  );
}
