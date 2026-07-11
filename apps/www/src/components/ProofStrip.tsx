import { CitationMark } from "@/components/CitationMark";
import { References } from "@/components/References";
import { homepageProofs } from "@/data/proofs";
import { createCitationScope } from "@/lib/citation-scope";

export function ProofStrip() {
  const citations = createCitationScope(["hje-revenue-growth-contribution"]);

  return (
    <>
      <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
        <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
          {homepageProofs.map((proof) => (
            <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
              <p className="text-base font-semibold leading-6">
                {proof.shortWording ?? proof.publicWording}
                {proof.id === "hje-revenue-growth-contribution" ? (
                  <CitationMark
                    claimId={proof.id}
                    number={citations.numberFor(proof.id)}
                  />
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </section>
      <References claimIds={citations.ids} className="jb-frame" />
    </>
  );
}
