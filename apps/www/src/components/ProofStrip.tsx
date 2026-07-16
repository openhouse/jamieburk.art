import Link from "next/link";
import type { Route } from "next";
import { homepageProofs } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofs.map((proof) => {
          const project = proof.relatedProjects[0];
          const href = project
            ? `/work/${project}`
            : "/work/technical-operations";

          return (
            <Link
              className="group min-h-32 bg-jb-blue px-5 py-6 hover:bg-jb-ink focus-visible:bg-jb-ink"
              href={href as Route}
              key={proof.id}
            >
              <span className="text-base font-semibold leading-6">
                {proof.homepageWording ?? proof.publicWording}
              </span>
              <span className="mt-3 block text-sm font-semibold text-jb-paper/76 underline-offset-4 group-hover:underline group-focus-visible:underline">
                View evidence
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
