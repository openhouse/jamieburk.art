import Link from "next/link";
import type { Route } from "next";
import { homepageProofs } from "@/data/proofs";

function requireHomepageProof(id: string) {
  const proof = homepageProofs.find((candidate) => candidate.id === id);
  if (!proof) throw new Error(`Homepage proof is missing: ${id}`);
  return proof;
}

const flagshipProof = requireHomepageProof("hje-revenue-growth-contribution");

const supportingProofs = homepageProofs.filter(
  (proof) => proof.id !== flagshipProof.id
);

export function ProofStrip() {
  const flagshipProject = flagshipProof.relatedProjects[0];

  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
        <Link
          className="group min-h-36 bg-jb-green px-5 py-6 hover:bg-jb-ink focus-visible:bg-jb-ink sm:col-span-2 lg:col-span-1"
          href={(flagshipProject ? `/work/${flagshipProject}` : "/work/technical-operations") as Route}
        >
          <span className="block text-xs font-semibold uppercase text-jb-paper/72">
            Flagship proof / E-commerce & operations
          </span>
          <span className="mt-3 block text-lg font-semibold leading-7">
            {flagshipProof.homepageWording ?? flagshipProof.publicWording}
          </span>
          <span className="mt-3 block text-sm leading-6 text-jb-paper/76">
            Web systems, analytics, content, and operational workflow improvements.
          </span>
          <span className="mt-3 block text-sm font-semibold text-jb-paper/76 underline-offset-4 group-hover:underline group-focus-visible:underline">
            View evidence
          </span>
        </Link>
        {supportingProofs.map((proof) => {
          const project = proof.relatedProjects[0];
          const href = project
            ? `/work/${project}`
            : "/work/technical-operations";

          return (
            <Link
              className="group min-h-36 bg-jb-blue px-5 py-6 hover:bg-jb-ink focus-visible:bg-jb-ink"
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
