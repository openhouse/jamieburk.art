export function SourceLayer({ sourceLayer }: { sourceLayer?: string }) {
  if (!sourceLayer) {
    return null;
  }

  return (
    <section className="system-card p-5">
      <h2 className="text-lg font-semibold text-jamie-ink">Source layer</h2>
      <p className="mt-3 leading-7 text-jamie-muted">{sourceLayer}</p>
    </section>
  );
}
