type ArtifactGalleryProps = {
  artifacts: string[];
};

export function ArtifactGallery({ artifacts }: ArtifactGalleryProps) {
  return (
    <section className="artifact-gallery">
      <h2>Artifacts and handoffs</h2>
      <div>
        {artifacts.map((artifact) => (
          <span key={artifact}>{artifact}</span>
        ))}
      </div>
    </section>
  );
}
