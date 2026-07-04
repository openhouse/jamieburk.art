import type { WorkEntry } from "@/lib/content";

export function KnownOpenProtected({ work }: { work: WorkEntry }) {
  const groups = [
    ["Known", work.known ?? []],
    ["Open", work.open ?? []],
    ["Protected", work.protected ?? []]
  ];

  return (
    <section className="system-card p-5">
      <h2 className="text-lg font-semibold text-jamie-ink">Known / Open / Protected</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {groups.map(([label, items]) => (
          <div key={label as string}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-broadway-blue">
              {label as string}
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-jamie-muted">
              {(items as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
