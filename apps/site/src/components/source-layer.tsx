type SourceLayerProps = {
  sourceLayer?: string;
};

export function SourceLayer({ sourceLayer }: SourceLayerProps) {
  if (!sourceLayer) {
    return null;
  }

  return (
    <section className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">Source layer</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/75">{sourceLayer}</p>
    </section>
  );
}
