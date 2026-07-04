import { proofPoints } from "@/data/capabilities";

export function ProofStrip() {
  return (
    <section className="border-y border-base-300 bg-base-200">
      <div className="container-page grid gap-4 py-6 md:grid-cols-5">
        {proofPoints.map((point) => (
          <p
            className="text-balance text-sm font-semibold leading-6 text-base-content"
            key={point}
          >
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}
