import { proofMetrics } from "@/data/proofMetrics";

export function ProofStrip() {
  return (
    <div className="proof-strip" aria-label="Public-safe proof points">
      {proofMetrics.map((metric) => (
        <div key={metric.label} className="proof-item">
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <small>{metric.note}</small>
        </div>
      ))}
    </div>
  );
}
