import { homepageProofClaims } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofClaims.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item.id}>
            <p className="font-display text-xs font-bold uppercase text-jb-paper/64">
              {item.label}
            </p>
            <p className="mt-3 text-base font-semibold leading-6">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
