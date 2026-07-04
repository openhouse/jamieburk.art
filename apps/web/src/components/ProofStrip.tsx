import { proofMetrics } from "@/data/capabilities";

export function ProofStrip() {
  return (
    <section className="bg-[color:var(--color-primary)] text-white">
      <div className="page-shell grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-5">
        {proofMetrics.map((metric) => (
          <p className="text-balance text-sm font-bold leading-6" key={metric}>
            {metric}
          </p>
        ))}
      </div>
    </section>
  );
}
