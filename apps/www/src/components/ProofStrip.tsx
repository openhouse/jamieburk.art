import { CitationNotes, CitationRef } from "@/components/citations";
import { homepageProofs } from "@/data/proofs";
import { getPageCitationIds } from "@/data/knowledge-bank";

const homepageCitationIds = getPageCitationIds("homepage");

export function ProofStrip() {
  return (
    <>
      <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
        <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
          {homepageProofs.map((proof, index) => (
            <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
              <p className="text-base font-semibold leading-6">
                {proof.shortWording ?? proof.publicWording}
                <CitationRef
                  citationIds={homepageCitationIds}
                  id={homepageCitationIds[index]}
                  pageKey="homepage"
                />
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="jb-frame">
        <CitationNotes citationIds={homepageCitationIds} pageKey="homepage" />
      </div>
    </>
  );
}
