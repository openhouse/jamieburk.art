import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="jb-proof-band">
      <div className="jb-frame grid border-l border-white/15 sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => (
          <div
            className="min-h-32 border-b border-r border-white/15 px-5 py-6 lg:border-b-0"
            key={proof.id}
          >
            <p className="jb-label text-xs text-jb-sky">Selected proof</p>
            <p className="text-base font-semibold leading-6">
              {proof.shortWording ?? proof.publicWording}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
