import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item.claimId}>
            <p className="jb-meta-label text-xs text-jb-paper/60">{item.claimId}</p>
            <p className="mt-3 text-base font-semibold leading-6">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
