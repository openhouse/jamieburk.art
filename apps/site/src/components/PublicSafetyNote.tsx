export function PublicSafetyNote({ note }: { note: string }) {
  return (
    <aside className="mt-8 border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-5">
      <p className="font-semibold">Public-safety note</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{note}</p>
    </aside>
  );
}
