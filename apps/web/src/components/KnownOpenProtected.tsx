import type { WorkMeta } from '@/lib/types';

type KnownOpenProtectedProps = {
  items?: WorkMeta['knownOpenProtected'];
};

const groups = [
  ['Known', 'known'],
  ['Open', 'open'],
  ['Protected', 'protected']
] as const;

export function KnownOpenProtected({ items }: KnownOpenProtectedProps) {
  if (!items) {
    return null;
  }

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {groups.map(([label, key]) => (
        <div key={key} className="border border-base-content/10 bg-base-200 p-5">
          <h3 className="font-mono text-xs uppercase text-primary">{label}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-base-content/80">
            {items[key].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
