import type { KnownOpenProtected as KnownOpenProtectedType } from "@/lib/types";

type KnownOpenProtectedProps = {
  items?: KnownOpenProtectedType;
  known?: string[];
  open?: string[];
  protectedItems?: string[];
};

export function KnownOpenProtected({ items, known = [], open = [], protectedItems = [] }: KnownOpenProtectedProps) {
  const data = items ?? {
    known: known.join(" "),
    open: open.join(" "),
    protected: protectedItems.join(" ")
  };

  return (
    <section className="paper-panel mt-8 p-6">
      <h2 className="text-2xl font-semibold">Known / Open / Protected</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <p className="font-semibold">Known</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{data.known}</p>
        </div>
        <div>
          <p className="font-semibold">Open</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{data.open}</p>
        </div>
        <div>
          <p className="font-semibold">Protected</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{data.protected}</p>
        </div>
      </div>
    </section>
  );
}
