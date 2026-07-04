import type { ReactNode } from "react";

export function CaveatBox({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-md border border-warning/40 bg-warning/15 p-5 text-sm leading-6 text-base-content">
      <p className="font-semibold">Public-safety note</p>
      <div className="mt-2 text-neutral">{children}</div>
    </aside>
  );
}
