export function ArtifactGallery({ artifacts }: { artifacts: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Primary artifacts</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {artifacts.map((artifact) => (
          <li className="paper-panel p-4 text-sm font-semibold" key={artifact}>
            {artifact}
          </li>
        ))}
      </ul>
    </section>
  );
}
