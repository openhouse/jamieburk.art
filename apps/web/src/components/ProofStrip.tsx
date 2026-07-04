import { proofAnchors } from '@/data/capabilities';

export function ProofStrip() {
  return (
    <section className="border-y border-base-content/10 bg-base-200/70">
      <div className="golden-shell grid gap-px bg-base-content/10 py-px md:grid-cols-5">
        {proofAnchors.map((proof) => (
          <div key={proof} className="bg-base-200 p-4 text-sm leading-snug text-base-content/80">
            {proof}
          </div>
        ))}
      </div>
    </section>
  );
}

