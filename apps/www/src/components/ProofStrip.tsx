import { featuredProofClaims } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {featuredProofClaims.map((item) => (
          <div
            className="min-h-24 bg-jb-blue px-5 py-5 sm:min-h-28 lg:min-h-32 lg:py-6"
            key={item.label}
          >
            <p className="text-xs font-semibold uppercase text-jb-paper/64">
              {item.label}
            </p>
            <p className="font-display text-sm font-semibold leading-6 sm:text-base">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
