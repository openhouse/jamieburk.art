type ArtifactListProps = {
  artifacts: string[];
};

export function ArtifactList({ artifacts }: ArtifactListProps) {
  if (artifacts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">Artifacts</h2>
      <ul className="mt-4 grid gap-2">
        {artifacts.map((artifact) => (
          <li className="text-sm leading-6 text-base-content/75" key={artifact}>
            {artifact}
          </li>
        ))}
      </ul>
    </section>
  );
}
