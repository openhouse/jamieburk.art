import type { WorkMeta } from "@/lib/types";

type KnownOpenProtectedProps = {
  data?: WorkMeta["knownOpenProtected"];
};

const labels = ["known", "open", "protected"] as const;

export function KnownOpenProtected({ data }: KnownOpenProtectedProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="surface p-5">
      <h2 className="text-xl font-black">Known / Open / Protected</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {labels.map((label) => (
          <div key={label}>
            <h3 className="font-black capitalize">{label}</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[color:var(--color-muted)]">
              {data[label].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
