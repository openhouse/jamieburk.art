import { getProofClaim, homepageProofClaimIds } from "@/data/proofs";

export function ProofStrip() {
  const proofItems = homepageProofClaimIds.map((id) => getProofClaim(id));

  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item.id}>
            <p className="text-base font-semibold leading-6">{item.publicProjection}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
