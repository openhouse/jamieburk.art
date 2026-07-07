import Link from "next/link";
import type { Route } from "next";
import { homepageProofClaims } from "@/data/proofs";

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {homepageProofClaims.map((item) => (
          <Link
            className="min-h-32 bg-jb-blue px-5 py-6 transition-colors hover:bg-jb-green focus:bg-jb-green focus:outline-none focus:ring-4 focus:ring-jb-ochre"
            href={(item.href ?? "/work") as Route}
            key={item.id}
          >
            <p className="text-xs font-semibold uppercase text-jb-paper/72">
              {item.category}
            </p>
            <p className="mt-3 text-base font-semibold leading-6">{item.short}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
