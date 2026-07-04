import type { WorkEntry } from "@/lib/content";

export function AtAGlance({ work }: { work: WorkEntry }) {
  const rows = [
    ["Role", work.role],
    ["Years", work.years],
    ["Status", work.status],
    ["Visibility", work.visibility],
    ["Primary artifacts", work.artifactTypes.join(", ")]
  ];

  return (
    <section className="system-card p-5" aria-labelledby="at-a-glance">
      <h2 id="at-a-glance" className="text-lg font-semibold text-jamie-ink">
        At a glance
      </h2>
      <dl className="mt-4 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-broadway-blue">
              {label}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-jamie-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
