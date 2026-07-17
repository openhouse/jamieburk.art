import Link from "next/link";
import type { Route } from "next";
import { homepageProofs } from "@/data/proofs";

function evidenceHref(proof: (typeof homepageProofs)[number]): Route {
  const project = proof.relatedProjects[0];
  return (project ? `/work/${project}` : "/about") as Route;
}

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
            <p className="text-base font-semibold leading-6">
              {proof.shortWording ?? proof.publicWording}
            </p>
            <Link
              className="mt-4 inline-flex text-sm font-semibold text-jb-mint underline decoration-1 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jb-paper"
              href={evidenceHref(proof)}
            >
              Project evidence
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
