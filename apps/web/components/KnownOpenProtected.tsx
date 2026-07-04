import type { KnownOpenProtected as KnownOpenProtectedType } from "@/lib/types";

type KnownOpenProtectedProps = {
  value: KnownOpenProtectedType;
};

export function KnownOpenProtected({ value }: KnownOpenProtectedProps) {
  const groups = [
    ["Known", value.known],
    ["Open", value.open],
    ["Protected", value.protected]
  ] as const;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {groups.map(([title, items]) => (
        <div className="card p-5" key={title}>
          <h2 className="text-lg font-black">{title}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
