import type { WorkItem } from "@/lib/types";

type AtAGlanceProps = {
  item: WorkItem;
};

const fields = [
  ["Role", "role"],
  ["Years", "dates"],
  ["Format", "format"],
  ["Status", "status"],
  ["Public-safety", "privacyLevel"],
  ["Underlying system", "underlyingSystem"]
] as const;

export function AtAGlance({ item }: AtAGlanceProps) {
  return (
    <section className="card p-5">
      <h2 className="text-xl font-black">At a glance</h2>
      <dl className="mt-5 grid gap-4 text-sm">
        {fields.map(([label, key]) => (
          <div key={label}>
            <dt className="font-black">{label}</dt>
            <dd className="mt-1 text-muted">{item[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
