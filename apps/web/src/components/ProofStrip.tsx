import { proofStats } from "@/data/site";

export function ProofStrip() {
  return (
    <section aria-labelledby="proof-strip" className="section-block proof-strip">
      <h2 className="sr-only" id="proof-strip">
        Proof points
      </h2>
      <ul>
        {proofStats.map((stat) => (
          <li key={stat}>{stat}</li>
        ))}
      </ul>
    </section>
  );
}
