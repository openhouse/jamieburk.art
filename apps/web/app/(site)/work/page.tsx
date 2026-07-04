import type { Metadata } from "next";
import { VisibilityNote } from "@/components/VisibilityNote";
import { WorkCard } from "@/components/WorkCard";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected public-safe case studies and proof pages for Jamie Burkart's technical project management and implementation work."
};

export default function WorkIndexPage() {
  const work = getAllWork();

  return (
    <section className="section">
      <div className="main-field">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="measure">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
              Work
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-jamie-ink">
              Selected systems and public-safe proof.
            </h1>
            <p className="mt-5 text-lg leading-8 text-jamie-muted">
              The V1 work index favors a small set of case studies and short proof pages over a
              sprawling archive.
            </p>
          </div>
          <VisibilityNote />
        </div>
        <div className="proof-grid mt-10">
          {work.map((entry) => (
            <WorkCard key={entry.slug} work={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
