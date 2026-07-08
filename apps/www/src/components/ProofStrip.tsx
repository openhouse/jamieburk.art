import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-8 py-10 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <h2 className="text-2xl font-semibold">Claim ledger</h2>
          <p className="mt-3 leading-7 text-jb-paper/82">
            Strong claims, stated with the guardrails that make them defensible:
            contribution where the work was collective, direct authorship where
            the work was mine, and private details kept offline.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {homepageProofs.map((proof) => (
            <li className="border-t border-jb-paper/25 pt-4" key={proof.id}>
              <p className="text-lg font-semibold leading-7">
                {proof.publicWording}
              </p>
              <p className="mt-2 text-sm leading-6 text-jb-paper/72">
                {proof.guardrail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
