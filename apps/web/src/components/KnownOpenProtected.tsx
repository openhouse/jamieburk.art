import type { KnownOpenProtected as KnownOpenProtectedType } from "@/lib/types";

type KnownOpenProtectedProps = {
  items: KnownOpenProtectedType;
};

export function KnownOpenProtected({ items }: KnownOpenProtectedProps) {
  const groups = [
    ["Known", items.known, "bg-[color:var(--color-soft-green)]"],
    ["Open", items.open, "bg-[color:var(--color-soft-blue)]/45"],
    ["Protected", items.protected, "bg-[color:var(--color-caution)]/55"]
  ] as const;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Known / Open / Protected</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {groups.map(([title, list, tone]) => (
          <div className={`rounded-[0.382rem] p-5 ${tone}`} key={title}>
            <h3 className="font-bold">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
