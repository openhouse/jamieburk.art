import { homepageProofItems } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofItems.map((item) => (
          <div className="min-h-24 bg-jb-blue px-5 py-5 sm:min-h-28 lg:min-h-32 lg:py-6" key={item}>
            <p className="font-display text-base font-semibold leading-6">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
