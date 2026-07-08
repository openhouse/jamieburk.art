import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-8 py-10 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <h2 className="text-2xl font-semibold">Proof surface</h2>
          <p className="mt-3 leading-7 text-jb-paper/82">
            A compact view of work that joins delivery, documentation,
            public-facing systems, and careful source boundaries.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {homepageProofs.map((proof) => (
            <li className="border-t border-jb-paper/25 pt-4" key={proof.id}>
              <p className="font-semibold leading-6">
                {proof.shortWording ?? proof.publicWording}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
