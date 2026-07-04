export function SourceLayer({ source }: { source: string }) {
  return (
    <section className="paper-panel mt-8 p-6">
      <h2 className="text-2xl font-semibold">Source layer / artifacts</h2>
      <p className="mt-3 text-[var(--color-muted)]">{source}</p>
    </section>
  );
}
