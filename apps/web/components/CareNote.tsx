export function CareNote({ note }: { note?: string }) {
  if (!note) {
    return null;
  }

  return (
    <aside className="system-card border-l-4 border-l-soft-rose p-5">
      <h2 className="text-lg font-semibold text-jamie-ink">Care note / limits</h2>
      <p className="mt-3 leading-7 text-jamie-muted">{note}</p>
    </aside>
  );
}
