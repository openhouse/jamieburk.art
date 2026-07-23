import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-labelledby="selected-proof" className="bg-jb-neutral text-white">
      <div className="jb-frame py-12">
        <div className="grid gap-8 lg:grid-cols-[0.25fr_0.75fr]">
          <div>
            <p className="jb-section-index" style={{ color: "var(--jb-paper)" }}>Evidence</p>
            <h2 className="mt-3 text-2xl font-semibold" id="selected-proof">
              A record of continuation
            </h2>
          </div>
          <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {homepageProofs.map((proof, index) => (
              <li
                className="border-t border-white/25 py-4 sm:px-4 lg:border-l lg:border-t-0 lg:py-0"
                key={proof.id}
              >
                <span className="jb-meta-label text-xs text-jb-orange">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/88">
                  {proof.shortWording ?? proof.publicWording}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
