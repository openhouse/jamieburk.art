import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Small lab index for public-safe research, consulting methods, and early prototype practice."
};

export default function LabIndexPage() {
  return (
    <section className="section">
      <div className="main-field">
        <div className="measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Lab
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-jamie-ink">
            Small experiments, carefully framed.
          </h1>
          <p className="mt-5 text-lg leading-8 text-jamie-muted">
            The lab is for research, consulting methods, and early prototypes. It is not a private
            archive browser or production SaaS pitch.
          </p>
        </div>
        <article className="system-card mt-10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Research / consulting method / early prototype practice
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-jamie-ink">
            <Link className="text-jamie-ink no-underline hover:underline" href="/lab/source-backed-team-memory">
              Source-Backed Team Memory Lab
            </Link>
          </h2>
          <p className="mt-3 leading-7 text-jamie-muted">
            Human-reviewed workflows for turning meetings, documents, decisions, open questions,
            useful ideas, and source materials into inspectable shared records.
          </p>
        </article>
      </div>
    </section>
  );
}
