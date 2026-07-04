import { formatStatus, formatVisibility } from "@/lib/content";
import type { WorkMeta } from "@/lib/types";

type MetadataPanelProps = {
  meta: WorkMeta;
};

export function MetadataPanel({ meta }: MetadataPanelProps) {
  const rows = [
    ["Role", meta.role],
    ["Years", meta.years],
    ["Status", formatStatus(meta.status)],
    ["Visibility", formatVisibility(meta.visibility)],
    ["Primary artifacts", meta.artifactTypes.join(", ")],
    ["Role fit", meta.capabilities.join(", ")]
  ] as const;

  return (
    <aside className="surface p-5">
      <h2 className="text-xl font-black">At a glance</h2>
      <dl className="mt-5 grid gap-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="font-black">{label}</dt>
            <dd className="mt-1 leading-6 text-[color:var(--color-muted)]">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
