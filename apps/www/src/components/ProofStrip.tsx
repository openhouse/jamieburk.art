import Link from "next/link";
import type { Route } from "next";
import { getProofHref, homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => {
          const href = getProofHref(proof);

          return (
            <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
              <p className="text-base font-semibold leading-6">
                {proof.detailedPublicWording ?? proof.publicWording}
              </p>
              {href ? (
                <Link
                  className="mt-4 inline-block text-sm font-semibold text-jb-paper underline decoration-jb-paper/55 underline-offset-4 hover:text-jb-lime"
                  href={href as Route}
                >
                  View evidence
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
