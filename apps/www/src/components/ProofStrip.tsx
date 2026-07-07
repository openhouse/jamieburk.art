import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
            <p className="text-base font-semibold leading-6">
              {proof.homepageClaim ?? proof.claim}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
