import { proofPoints } from "@/data/proof";

export function ProofStrip() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <p className="eyebrow mb-5">Proof anchors</p>
        <div className="balanced-grid">
          {proofPoints.map((point) => (
            <div className="surface p-5" key={point}>
              <p className="text-lg font-black leading-snug">{point}</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                Public-safe wording; final language should stay careful about contribution,
                collective work, and protected details.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
