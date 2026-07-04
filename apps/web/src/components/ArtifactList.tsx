type ArtifactListProps = {
  artifacts: string[];
};

export function ArtifactList({ artifacts }: ArtifactListProps) {
  if (!artifacts.length) {
    return null;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {artifacts.map((artifact) => (
        <li key={artifact} className="border border-base-content/10 bg-base-200 px-4 py-3 text-sm text-base-content/80">
          {artifact}
        </li>
      ))}
    </ul>
  );
}

