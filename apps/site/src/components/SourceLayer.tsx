type SourceLayerProps = {
  sourceLayer?: string;
  credits?: string[];
};

export function SourceLayer({ sourceLayer, credits }: SourceLayerProps) {
  if (!sourceLayer && !credits?.length) {
    return null;
  }

  return (
    <section className="surface p-5">
      <h2 className="text-xl font-black">Source layer / credits</h2>
      {sourceLayer ? <p className="mt-3 leading-7 text-[color:var(--color-muted)]">{sourceLayer}</p> : null}
      {credits?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {credits.map((credit) => (
            <li className="badge badge-outline" key={credit}>
              {credit}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
