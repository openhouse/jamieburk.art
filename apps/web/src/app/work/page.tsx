import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "../../components";
import { workEntries } from "../../lib/work";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected public-safe work showing how Jamie turns under-structured work into usable systems."
};

export default function WorkPage() {
  return (
    <section className="section-band">
      <div className="section-inner">
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title">Proof table.</h1>
        <p className="lead">
          A selected proof system with living-room affordances: clear enough for a hiring manager,
          structured enough to hold deeper source files later.
        </p>
        <div className="action-row">
          <Link className="quiet-link" href="/work/technical-operations">
            View technical operations proof page
          </Link>
        </div>
        <div className="grid-3" style={{ marginTop: "2rem" }}>
          {workEntries.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
