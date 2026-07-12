import Link from "next/link";
import type { Route } from "next";
import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => {
          const project = proof.relatedProjects[0];
          const content = (
            <>
              <p className="text-base font-semibold leading-6">
                {proof.shortWording ?? proof.publicWording}
              </p>
              {project ? <span className="mt-3 block text-sm underline">View proof</span> : null}
            </>
          );

          return project ? (
            <Link
              className="min-h-32 bg-jb-blue px-5 py-6 hover:bg-jb-green"
              href={`/work/${project}` as Route}
              key={proof.id}
            >
              {content}
            </Link>
          ) : (
            <div className="min-h-32 bg-jb-blue px-5 py-6" key={proof.id}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
