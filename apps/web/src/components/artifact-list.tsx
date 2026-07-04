type ArtifactListProps = {
  artifacts: string[];
};

export function ArtifactList({ artifacts }: ArtifactListProps) {
  if (!artifacts.length) {
    return null;
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {artifacts.map((artifact) => (
        <li className="rounded border border-base-300 bg-base-100 px-3 py-2 text-sm font-bold" key={artifact}>
          {artifact}
        </li>
      ))}
    </ul>
  );
}
