import type { WorkMeta } from "@/lib/content";

type AtAGlanceProps = {
  work: WorkMeta;
};

export function AtAGlance({ work }: AtAGlanceProps) {
  const rows = [
    ["Role", work.role],
    ["Years", work.years],
    ["Status", work.status],
    ["Primary artifacts", work.artifactTypes.join(", ")],
    ["Visibility", work.visibility],
    ["Role fit", work.capabilities.join(", ")]
  ];

  return (
    <section className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">At a glance</h2>
      <dl className="mt-4 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-bold uppercase tracking-wide text-base-content/50">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-base-content/75">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
