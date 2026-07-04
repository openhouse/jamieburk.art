export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] bg-soft-rose/45 text-jamie-ink">
      {children}
    </span>
  );
}
