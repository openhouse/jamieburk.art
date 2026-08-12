import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-ink py-10 text-white">
      <div className="jb-frame">
        <p className="jb-eyebrow text-white/60">Selected proof points</p>
        <ol className="mt-6 grid border-t border-white/25 sm:grid-cols-2 lg:grid-cols-5">
          {homepageProofs.map((proof, index) => (
            <li
              className="border-b border-white/25 py-5 sm:px-4 sm:first:pl-0 lg:border-r lg:last:border-r-0"
              key={proof.id}
            >
              <span className="font-label text-xs text-jb-sky">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold leading-6">
              {proof.shortWording ?? proof.publicWording}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
